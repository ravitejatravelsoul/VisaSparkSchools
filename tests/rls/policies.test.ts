import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { PGlite, Transaction } from "@electric-sql/pglite";
import { readdirSync } from "node:fs";
import path from "node:path";
import { asAnon, asUser, createTestDatabase, createUser } from "./setup";

const MIGRATIONS_DIR = path.resolve(__dirname, "../../supabase/migrations");

/**
 * Executable RLS verification for every table in supabase/migrations/*.sql,
 * run against the project's real, unmodified migration files via PGlite
 * (see ./setup.ts for why and how). This is the executable counterpart to
 * supabase/verify-rls.sql's documented manual procedure -- covering every
 * table across all 7 migrations (verify-rls.sql predates 0003-0007), run
 * automatically instead of requiring a human with a local Supabase instance.
 *
 * Never connects to, or has any relationship with, the live Supabase
 * project -- this is a from-scratch, in-memory (WASM) database created
 * fresh for this test run and discarded afterward.
 */

const USER_A = "11111111-1111-1111-1111-111111111111";
const USER_B = "22222222-2222-2222-2222-222222222222";

let db: PGlite;

beforeAll(async () => {
  db = await createTestDatabase();
  await createUser(db, USER_A);
  await createUser(db, USER_B);
}, 120_000);

afterAll(async () => {
  await db.close();
});

type Row = Record<string, unknown>;

async function insertOwnerRow(
  tx: Transaction,
  userId: string,
  table: string,
  columns: string[],
  values: unknown[],
): Promise<void> {
  const placeholders = values.map((_, i) => `$${i + 2}`).join(", ");
  await tx.query(
    `insert into public.${table} (user_id, ${columns.join(", ")}) values ($1, ${placeholders})`,
    [userId, ...values],
  );
}

// ---------------------------------------------------------------------------
// Execution-role proof: every other test in this file trusts that asUser()/
// asAnon() actually put the session into a real, non-privileged Postgres
// role subject to RLS. This block proves that trust is warranted, rather
// than asserting it in a comment -- a superuser or BYPASSRLS role would
// make every "denies access" test in this file pass vacuously (nothing to
// deny), so this is checked explicitly, not assumed.
// ---------------------------------------------------------------------------
describe("RLS execution-role proof (is the harness actually testing anything?)", () => {
  it("defines anon/authenticated as real, non-superuser, non-BYPASSRLS, NOLOGIN roles -- matching Supabase's own role model", async () => {
    const result = await db.query<{
      rolname: string;
      rolsuper: boolean;
      rolbypassrls: boolean;
      rolcanlogin: boolean;
    }>(
      `select rolname, rolsuper, rolbypassrls, rolcanlogin from pg_roles where rolname in ('anon', 'authenticated') order by rolname`,
    );
    expect(result.rows).toHaveLength(2);
    for (const role of result.rows) {
      expect(role.rolsuper, `${role.rolname} must not be a superuser`).toBe(false);
      expect(role.rolbypassrls, `${role.rolname} must not have BYPASSRLS`).toBe(false);
      // Matches real Supabase: PostgREST authenticates as its own service
      // role and switches into anon/authenticated via `SET ROLE`, per
      // request -- neither role is ever logged into directly.
      expect(
        role.rolcanlogin,
        `${role.rolname} should be NOLOGIN, switched into via SET ROLE`,
      ).toBe(false);
    }
  });

  it("actually runs queries as the 'authenticated' role inside asUser(), not the bootstrap superuser", async () => {
    const result = await asUser(db, USER_A, (tx) =>
      tx.query<{ current_user: string; is_super: boolean; bypassrls: boolean }>(
        `select current_user,
                (select rolsuper from pg_roles where rolname = current_user) as is_super,
                (select rolbypassrls from pg_roles where rolname = current_user) as bypassrls`,
      ),
    );
    expect(result.rows[0].current_user).toBe("authenticated");
    expect(result.rows[0].is_super).toBe(false);
    expect(result.rows[0].bypassrls).toBe(false);
  });

  it("actually runs queries as the 'anon' role inside asAnon(), not the bootstrap superuser", async () => {
    const result = await asAnon(db, (tx) =>
      tx.query<{ current_user: string; is_super: boolean; bypassrls: boolean }>(
        `select current_user,
                (select rolsuper from pg_roles where rolname = current_user) as is_super,
                (select rolbypassrls from pg_roles where rolname = current_user) as bypassrls`,
      ),
    );
    expect(result.rows[0].current_user).toBe("anon");
    expect(result.rows[0].is_super).toBe(false);
    expect(result.rows[0].bypassrls).toBe(false);
  });

  it("has the row_security session GUC enabled (on) for both authenticated and anon sessions", async () => {
    const asAuthenticated = await asUser(db, USER_A, (tx) =>
      tx.query<{ row_security: string }>("show row_security"),
    );
    expect(asAuthenticated.rows[0].row_security).toBe("on");

    const asAnonymous = await asAnon(db, (tx) =>
      tx.query<{ row_security: string }>("show row_security"),
    );
    expect(asAnonymous.rows[0].row_security).toBe("on");
  });

  it("does not own the tables it queries -- postgres (the migration-running bootstrap role) is the table owner, not authenticated/anon", async () => {
    const result = await db.query<{ tablename: string; tableowner: string }>(
      `select tablename, tableowner from pg_tables where schemaname = 'public' and tablename = 'profiles'`,
    );
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].tableowner).not.toBe("authenticated");
    expect(result.rows[0].tableowner).not.toBe("anon");
  });

  it("applied migrations in the correct numeric order (0001 through 0007), so later migrations' ALTERs land on the schema earlier migrations actually created", async () => {
    const files = readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith(".sql"))
      .sort();
    expect(files).toEqual([
      "0001_init.sql",
      "0002_phase4_learning_accounts.sql",
      "0003_phase6_practice_attempts.sql",
      "0004_phase7_study_studio.sql",
      "0005_phase9_certificates.sql",
      "0006_fix_certificates_public_view_write_access.sql",
      "0007_profile_signup_fields.sql",
    ]);
    // Direct evidence the order was actually respected, not just the file
    // list: 0007's columns exist on the table 0001 created, and 0006's
    // verify_certificate() function (which replaces 0005's view) is the
    // one actually present -- neither would be true if 0007 or 0006 had
    // run before the migration they depend on.
    const columns = await db.query<{ column_name: string }>(
      `select column_name from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'phone_e164'`,
    );
    expect(columns.rows).toHaveLength(1);
    const certView = await db.query<{ count: string }>(
      `select count(*)::text from information_schema.tables where table_schema = 'public' and table_name = 'certificates_public'`,
    );
    expect(certView.rows[0].count).toBe("0"); // dropped by 0006, must not exist
  });

  it("proves RLS -- not a missing GRANT, not table ownership, not a WHERE clause -- is specifically what denies cross-user access", async () => {
    // An isolated scratch table, deliberately NOT one of the app's real
    // tables, so this proof is self-contained and not coupled to any
    // specific migration's policy wording. The same query, same role, same
    // data -- toggling only `enable/disable row level security` on the
    // table -- is what should flip the result, isolating RLS itself (not
    // some other access-control layer) as the causal mechanism.
    await db.exec(`
      create table public.rls_mechanism_check (
        id uuid primary key default gen_random_uuid(),
        owner_id uuid not null,
        secret text not null
      );
      grant all on public.rls_mechanism_check to authenticated;
      insert into public.rls_mechanism_check (owner_id, secret) values ('${USER_A}', 'only-a-should-see-this');
    `);

    // Before RLS is even enabled on this table: authenticated as a
    // DIFFERENT user, the row is fully visible -- proving the base grant
    // alone does not restrict access (RLS is doing nothing yet).
    const beforeRls = await asUser(db, USER_B, (tx) =>
      tx.query<Row>("select * from public.rls_mechanism_check"),
    );
    expect(beforeRls.rows).toHaveLength(1);

    await db.exec(`
      alter table public.rls_mechanism_check enable row level security;
      create policy "owner only" on public.rls_mechanism_check
        for select using (auth.uid() = owner_id);
    `);

    // Same query, same role, same underlying row -- now denied, purely
    // because RLS is enabled with a policy restricting it.
    const afterRlsOtherUser = await asUser(db, USER_B, (tx) =>
      tx.query<Row>("select * from public.rls_mechanism_check"),
    );
    expect(afterRlsOtherUser.rows).toHaveLength(0);

    // The actual owner still sees it -- confirms the denial above was the
    // policy condition being false for user B, not the table having
    // somehow become universally unreadable.
    const afterRlsOwner = await asUser(db, USER_A, (tx) =>
      tx.query<Row>("select * from public.rls_mechanism_check"),
    );
    expect(afterRlsOwner.rows).toHaveLength(1);

    await db.exec(`drop table public.rls_mechanism_check`);
  });
});

// ---------------------------------------------------------------------------
// profiles (migrations 0001, 0002, 0007)
// ---------------------------------------------------------------------------
describe("public.profiles", () => {
  it("auto-creates a profile row via the on_auth_user_created trigger", async () => {
    const result = await asUser(db, USER_A, (tx) =>
      tx.query<Row>("select * from public.profiles where id = $1", [USER_A]),
    );
    expect(result.rows).toHaveLength(1);
  });

  it("lets a user read only their own profile", async () => {
    const asA = await asUser(db, USER_A, (tx) => tx.query<Row>("select * from public.profiles"));
    expect(asA.rows).toHaveLength(1);
    expect(asA.rows[0].id).toBe(USER_A);
  });

  it("denies anon read access to profiles", async () => {
    const result = await asAnon(db, (tx) => tx.query<Row>("select * from public.profiles"));
    expect(result.rows).toHaveLength(0);
  });

  it("denies a user from updating another user's profile", async () => {
    const result = await asUser(db, USER_B, (tx) =>
      tx.query("update public.profiles set display_name = 'hacked' where id = $1", [USER_A]),
    );
    expect(result.affectedRows).toBe(0);
  });

  it("lets the owner update their own profile, respecting the length/enum constraints added in 0002/0007", async () => {
    const result = await asUser(db, USER_A, (tx) =>
      tx.query(
        "update public.profiles set display_name = 'Asha', learner_level = 'basics' where id = $1",
        [USER_A],
      ),
    );
    expect(result.affectedRows).toBe(1);
  });

  it("keeps phone_e164 (a migration 0007 column) private to its owner -- denied to a different user and to anon", async () => {
    await asUser(db, USER_A, (tx) =>
      tx.query("update public.profiles set phone_e164 = $1 where id = $2", [
        "+14155551234",
        USER_A,
      ]),
    );

    const asOwner = await asUser(db, USER_A, (tx) =>
      tx.query<Row>("select phone_e164 from public.profiles where id = $1", [USER_A]),
    );
    expect(asOwner.rows).toHaveLength(1);
    expect(asOwner.rows[0].phone_e164).toBe("+14155551234");

    const asOtherUser = await asUser(db, USER_B, (tx) =>
      tx.query<Row>("select phone_e164 from public.profiles where id = $1", [USER_A]),
    );
    expect(asOtherUser.rows).toHaveLength(0);

    const asAnonymous = await asAnon(db, (tx) =>
      tx.query<Row>("select phone_e164 from public.profiles where id = $1", [USER_A]),
    );
    expect(asAnonymous.rows).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Every plain "owner all" table (migrations 0001-0004): identical policy
// shape (`for all using (auth.uid() = user_id) with check (auth.uid() = user_id)`)
// applied to 17 different tables -- verified generically rather than
// duplicating the same six assertions by hand 17 times.
// ---------------------------------------------------------------------------
interface OwnerTableCase {
  table: string;
  columns: string[];
  values: unknown[];
  updateColumn: string;
  updateValue: unknown;
}

const OWNER_TABLES: OwnerTableCase[] = [
  {
    table: "lesson_progress",
    columns: ["lesson_id", "status"],
    values: ["rls-check", "completed"],
    updateColumn: "status",
    updateValue: "in_progress",
  },
  {
    table: "exercise_attempts",
    columns: ["exercise_id", "attempts", "completed"],
    values: ["rls-check", 1, true],
    updateColumn: "attempts",
    updateValue: 5,
  },
  {
    table: "quiz_attempts",
    columns: ["lesson_id", "correct", "total"],
    values: ["rls-check", 1, 1],
    updateColumn: "correct",
    updateValue: 0,
  },
  {
    table: "skill_mastery",
    columns: ["skill", "score"],
    values: ["rls-check", 50],
    updateColumn: "score",
    updateValue: 60,
  },
  {
    table: "review_queue",
    columns: ["lesson_id", "due_at", "interval_days"],
    values: ["rls-check", new Date().toISOString(), 1],
    updateColumn: "interval_days",
    updateValue: 5,
  },
  {
    table: "bookmarks",
    columns: ["lesson_id"],
    values: ["rls-check"],
    updateColumn: "lesson_id",
    updateValue: "rls-check-updated",
  },
  {
    table: "notes",
    columns: ["lesson_id", "body"],
    values: ["rls-check", "original note"],
    updateColumn: "body",
    updateValue: "updated note",
  },
  {
    table: "daily_goals",
    columns: ["minutes"],
    values: [20],
    updateColumn: "minutes",
    updateValue: 30,
  },
  {
    table: "enrollments",
    columns: ["course_id"],
    values: ["rls-check"],
    updateColumn: "last_accessed_lesson_id",
    updateValue: "rls-check-lesson",
  },
  {
    table: "roadmap_progress",
    columns: ["path_id"],
    values: ["rls-check"],
    updateColumn: "last_accessed_at",
    updateValue: new Date().toISOString(),
  },
  {
    table: "roadmap_step_completions",
    columns: ["path_id", "step_id"],
    values: ["rls-check", "s1"],
    updateColumn: "completed_at",
    updateValue: new Date().toISOString(),
  },
  {
    table: "project_progress",
    columns: ["project_id"],
    values: ["rls-check"],
    updateColumn: "started_at",
    updateValue: new Date().toISOString(),
  },
  {
    table: "project_milestone_completions",
    columns: ["project_id", "milestone_id"],
    values: ["rls-check", "m1"],
    updateColumn: "completed_at",
    updateValue: new Date().toISOString(),
  },
  {
    table: "activity_log",
    columns: ["event_id", "type", "ref_id", "title"],
    values: ["rls-check", "bookmark-added", "rls-check", "RLS check"],
    updateColumn: "title",
    updateValue: "updated title",
  },
  {
    table: "practice_attempts",
    columns: ["course_id", "best_score", "best_total"],
    values: ["rls-check", 5, 10],
    updateColumn: "best_score",
    updateValue: 8,
  },
  {
    table: "study_plans",
    columns: ["plan_id", "title", "minutes_per_session", "status"],
    values: ["rls-check", "RLS check plan", 20, "active"],
    updateColumn: "title",
    updateValue: "updated plan title",
  },
  {
    table: "focus_minutes",
    columns: ["date", "minutes"],
    values: ["2026-01-15", 10],
    updateColumn: "minutes",
    updateValue: 25,
  },
];

describe.each(OWNER_TABLES)(
  "public.$table (owner-scoped RLS)",
  ({ table, columns, values, updateColumn, updateValue }) => {
    beforeAll(async () => {
      await asUser(db, USER_A, (tx) => insertOwnerRow(tx, USER_A, table, columns, values));
    });

    it("lets the owner see their own row(s)", async () => {
      const result = await asUser(db, USER_A, (tx) =>
        tx.query<Row>(`select * from public.${table}`),
      );
      expect(result.rows.length).toBeGreaterThan(0);
      for (const row of result.rows) {
        expect(row.user_id).toBe(USER_A);
      }
    });

    it("denies a different authenticated user any read access", async () => {
      const result = await asUser(db, USER_B, (tx) =>
        tx.query<Row>(`select * from public.${table}`),
      );
      expect(result.rows).toHaveLength(0);
    });

    it("denies anon read access", async () => {
      const result = await asAnon(db, (tx) => tx.query<Row>(`select * from public.${table}`));
      expect(result.rows).toHaveLength(0);
    });

    it("denies a different user from updating the owner's row", async () => {
      const result = await asUser(db, USER_B, (tx) =>
        tx.query(`update public.${table} set ${updateColumn} = $1`, [updateValue]),
      );
      expect(result.affectedRows).toBe(0);
    });

    it("denies a different user from deleting the owner's row", async () => {
      const result = await asUser(db, USER_B, (tx) => tx.query(`delete from public.${table}`));
      expect(result.affectedRows).toBe(0);
    });

    it("lets the owner update their own row", async () => {
      const result = await asUser(db, USER_A, (tx) =>
        tx.query(`update public.${table} set ${updateColumn} = $1`, [updateValue]),
      );
      expect(result.affectedRows).toBeGreaterThan(0);
    });

    it("lets the owner delete their own row", async () => {
      const result = await asUser(db, USER_A, (tx) => tx.query(`delete from public.${table}`));
      expect(result.affectedRows).toBeGreaterThan(0);
    });
  },
);

// ---------------------------------------------------------------------------
// tutor_usage (migration 0001): the one table with NO owner "for all"
// policy, deliberately -- a direct write must be denied even for the owner,
// with every write instead required to go through the SECURITY DEFINER
// increment_tutor_usage() RPC.
// ---------------------------------------------------------------------------
describe("public.tutor_usage (read-only for owner; writes only via RPC)", () => {
  it("denies a direct owner UPDATE (no update policy exists)", async () => {
    const result = await asUser(db, USER_A, (tx) =>
      tx.query("update public.tutor_usage set count = 0 where user_id = $1", [USER_A]),
    );
    expect(result.affectedRows).toBe(0);
  });

  it("enforces the daily allowance atomically via increment_tutor_usage()", async () => {
    const allowance = 3;
    for (let i = 1; i <= allowance; i++) {
      const result = await asUser(db, USER_A, (tx) =>
        tx.query<{ allowed: boolean; remaining: number }>(
          "select * from public.increment_tutor_usage($1, $2)",
          [USER_A, allowance],
        ),
      );
      expect(result.rows[0].allowed).toBe(true);
      expect(result.rows[0].remaining).toBe(allowance - i);
    }

    const overLimit = await asUser(db, USER_A, (tx) =>
      tx.query<{ allowed: boolean; remaining: number }>(
        "select * from public.increment_tutor_usage($1, $2)",
        [USER_A, allowance],
      ),
    );
    expect(overLimit.rows[0].allowed).toBe(false);
    expect(overLimit.rows[0].remaining).toBe(0);
  });

  it("lets the owner read their own usage row but denies a different user", async () => {
    const asA = await asUser(db, USER_A, (tx) => tx.query<Row>("select * from public.tutor_usage"));
    expect(asA.rows.length).toBeGreaterThan(0);

    const asB = await asUser(db, USER_B, (tx) => tx.query<Row>("select * from public.tutor_usage"));
    expect(asB.rows).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// user_feedback (migration 0001): anonymous inserts allowed; nobody
// (including the submitter) can read it back through the client role.
// ---------------------------------------------------------------------------
describe("public.user_feedback (insert-only, no client-facing read)", () => {
  it("allows an anonymous (guest) submission", async () => {
    const result = await asAnon(db, (tx) =>
      tx.query("insert into public.user_feedback (message) values ('anonymous feedback')"),
    );
    expect(result.affectedRows).toBe(1);
  });

  it("allows an authenticated submission tagged with the submitter's user_id", async () => {
    const result = await asUser(db, USER_A, (tx) =>
      tx.query(
        "insert into public.user_feedback (user_id, message) values ($1, 'authenticated feedback')",
        [USER_A],
      ),
    );
    expect(result.affectedRows).toBe(1);
  });

  it("denies the submitter (or anyone else) from reading feedback back -- no select policy exists", async () => {
    const asSubmitter = await asUser(db, USER_A, (tx) =>
      tx.query<Row>("select * from public.user_feedback"),
    );
    expect(asSubmitter.rows).toHaveLength(0);

    const asAnonReader = await asAnon(db, (tx) =>
      tx.query<Row>("select * from public.user_feedback"),
    );
    expect(asAnonReader.rows).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// certificates (migration 0005) + verify_certificate() (migration 0006's
// fix for the exploitable auto-updatable view described in that file).
// ---------------------------------------------------------------------------
describe("public.certificates + public.verify_certificate()", () => {
  const verificationCode = "rls-check-verification-code";

  beforeAll(async () => {
    await asUser(db, USER_A, (tx) =>
      tx.query(
        `insert into public.certificates
          (user_id, cert_id, cert_type, target_id, target_title, display_name, issued_at, content_version_ref, verification_code)
         values ($1, 'rls-check-cert', 'course-completion', 'rls-check-course', 'RLS Check Course', 'Asha Test', now(), 'v1', $2)`,
        [USER_A, verificationCode],
      ),
    );
  });

  it("lets the owner read their own certificate", async () => {
    const result = await asUser(db, USER_A, (tx) =>
      tx.query<Row>("select * from public.certificates"),
    );
    expect(result.rows).toHaveLength(1);
  });

  it("blocks duplicate issuance of the same certificate for the same user (unique(user_id, cert_id))", async () => {
    await expect(
      asUser(db, USER_A, (tx) =>
        tx.query(
          `insert into public.certificates
            (user_id, cert_id, cert_type, target_id, target_title, display_name, issued_at, content_version_ref, verification_code)
           values ($1, 'rls-check-cert', 'course-completion', 'rls-check-course', 'RLS Check Course', 'Asha Test', now(), 'v1', 'a-different-verification-code')`,
          [USER_A],
        ),
      ),
    ).rejects.toThrow();
  });

  it("blocks unauthorized certificate issuance -- a user cannot issue a certificate on another user's behalf", async () => {
    await expect(
      asUser(db, USER_B, (tx) =>
        tx.query(
          `insert into public.certificates
            (user_id, cert_id, cert_type, target_id, target_title, display_name, issued_at, content_version_ref, verification_code)
           values ($1, 'rls-check-cert-for-a', 'course-completion', 'rls-check-course', 'RLS Check Course', 'Forged', now(), 'v1', 'forged-verification-code')`,
          [USER_A],
        ),
      ),
    ).rejects.toThrow();
  });

  it("denies a different user from reading the certificate", async () => {
    const result = await asUser(db, USER_B, (tx) =>
      tx.query<Row>("select * from public.certificates"),
    );
    expect(result.rows).toHaveLength(0);
  });

  it("denies anon from reading the raw certificates table directly", async () => {
    const result = await asAnon(db, (tx) => tx.query<Row>("select * from public.certificates"));
    expect(result.rows).toHaveLength(0);
  });

  it("denies updating a certificate at all -- even for the owner, since 0005 deliberately has no update policy (immutability)", async () => {
    const result = await asUser(db, USER_A, (tx) =>
      tx.query("update public.certificates set target_title = 'tampered' where user_id = $1", [
        USER_A,
      ]),
    );
    expect(result.affectedRows).toBe(0);
  });

  it("lets anon look up a certificate by its verification_code via verify_certificate(), returning only the safe columns", async () => {
    const result = await asAnon(db, (tx) =>
      tx.query<Row>("select * from public.verify_certificate($1)", [verificationCode]),
    );
    expect(result.rows).toHaveLength(1);
    const row = result.rows[0];
    expect(row.target_title).toBe("RLS Check Course");
    expect(row.display_name).toBe("Asha Test");
    // The seven safe columns only -- never the internal id, user_id, or cert_id
    // (see migration 0006's header comment on why those must never be exposed).
    expect(row).not.toHaveProperty("user_id");
    expect(row).not.toHaveProperty("id");
    expect(row).not.toHaveProperty("cert_id");
  });

  it("returns no row from verify_certificate() for an unknown verification_code", async () => {
    const result = await asAnon(db, (tx) =>
      tx.query<Row>("select * from public.verify_certificate($1)", ["not-a-real-code"]),
    );
    expect(result.rows).toHaveLength(0);
  });

  it("lets the owner delete their own certificate", async () => {
    const result = await asUser(db, USER_A, (tx) =>
      tx.query("delete from public.certificates where user_id = $1", [USER_A]),
    );
    expect(result.affectedRows).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Catch-all: every public table with a user_id column must have RLS
// actually enabled at the Postgres level, independent of whether this
// suite happens to have a dedicated test for it -- guards against a future
// migration adding a new per-user table and forgetting
// `enable row level security` entirely.
// ---------------------------------------------------------------------------
describe("row level security is enabled on every user-owned table", () => {
  it("has relrowsecurity = true for every public table with a user_id column", async () => {
    const result = await db.query<{ relname: string; relrowsecurity: boolean }>(`
      select c.relname, c.relrowsecurity
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public'
        and c.relkind = 'r'
        and exists (
          select 1 from information_schema.columns col
          where col.table_schema = 'public'
            and col.table_name = c.relname
            and col.column_name = 'user_id'
        )
    `);

    expect(result.rows.length).toBeGreaterThanOrEqual(OWNER_TABLES.length + 2); // + tutor_usage + certificates
    for (const row of result.rows) {
      expect(row.relrowsecurity, `${row.relname} must have RLS enabled`).toBe(true);
    }
  });
});
