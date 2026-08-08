import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { PGlite, Transaction } from "@electric-sql/pglite";
import { asAnon, asUser, createTestDatabase, createUser } from "./setup";

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
