import { PGlite, type Transaction } from "@electric-sql/pglite";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/**
 * Executable Row Level Security verification harness.
 *
 * This runs the project's REAL, unmodified migration files
 * (supabase/migrations/*.sql) against PGlite -- a real Postgres engine
 * (compiled to WASM, via @electric-sql/pglite) running fully in-process,
 * with no Docker, no network connection, and no relationship whatsoever to
 * the live Supabase project. It exists because this development machine has
 * no Docker/psql/Supabase CLI available (confirmed: `which docker`,
 * `which psql`, `which supabase` all fail), and a static SQL read-through
 * (supabase/verify-rls.sql) is not the same thing as proof that the
 * policies actually behave as written -- this harness provides that proof.
 *
 * It stubs the minimum slice of Supabase's own `auth` schema the
 * migrations actually reference: an `auth.users` table (for the foreign
 * keys and the `on_auth_user_created` trigger) and an `auth.uid()`
 * function. Supabase's real `auth.uid()` is implemented as
 * `select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid`
 * (reading the sub claim Supabase's PostgREST layer sets per-request from
 * the caller's JWT) -- this stub is byte-for-byte the same implementation,
 * not a simplified stand-in, so `auth.uid()` behaves identically to the
 * real one for every policy under test.
 */

const MIGRATIONS_DIR = path.resolve(__dirname, "../../supabase/migrations");

export async function createTestDatabase(): Promise<PGlite> {
  const db = new PGlite({ extensions: { pgcrypto } });

  await db.exec(`
    create schema if not exists auth;
    create table auth.users (
      id uuid primary key default gen_random_uuid(),
      raw_user_meta_data jsonb not null default '{}'::jsonb
    );
    create or replace function auth.uid() returns uuid
      language sql stable
      as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;

    create role anon;
    create role authenticated;
    grant usage on schema public to anon, authenticated;
  `);

  const migrationFiles = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of migrationFiles) {
    const sql = readFileSync(path.join(MIGRATIONS_DIR, file), "utf-8");
    try {
      await db.exec(sql);
    } catch (err) {
      throw new Error(
        `Migration ${file} failed against the RLS test database: ${(err as Error).message}`,
      );
    }
  }

  // Supabase provisions every fresh project with broad table/function-level
  // grants to `anon`/`authenticated` up front -- RLS, not the absence of a
  // GRANT, is the real access-control layer in production. None of this
  // project's migrations re-state those grants (they only add RLS
  // policies), so this harness replicates Supabase's own default here;
  // without it, every query below would fail on a missing privilege before
  // RLS is ever evaluated, which would not be testing the thing this suite
  // exists to test.
  await db.exec(`
    grant all on all tables in schema public to anon, authenticated;
    grant all on all sequences in schema public to anon, authenticated;
    grant execute on all functions in schema public to anon, authenticated;
  `);

  return db;
}

export async function createUser(
  db: PGlite,
  id: string,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  await db.query(`insert into auth.users (id, raw_user_meta_data) values ($1, $2::jsonb)`, [
    id,
    JSON.stringify(metadata),
  ]);
}

/**
 * Runs `fn` inside a transaction with `auth.uid()` and the Postgres role
 * set exactly as Supabase's PostgREST layer sets them for an authenticated
 * request -- the same two session settings a real API call to Supabase
 * would carry (`request.jwt.claim.sub` and the `authenticated` role), so
 * every RLS policy under test evaluates identically to production.
 */
export async function asUser<T>(
  db: PGlite,
  userId: string,
  fn: (tx: Transaction) => Promise<T>,
): Promise<T> {
  return db.transaction(async (tx) => {
    await tx.query(`select set_config('request.jwt.claim.sub', $1, true)`, [userId]);
    await tx.exec(`set local role authenticated`);
    return fn(tx);
  });
}

/** Same as {@link asUser}, but as an unauthenticated (anon) caller -- no JWT, `auth.uid()` is null. */
export async function asAnon<T>(db: PGlite, fn: (tx: Transaction) => Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    await tx.exec(`select set_config('request.jwt.claim.sub', '', true)`);
    await tx.exec(`set local role anon`);
    return fn(tx);
  });
}
