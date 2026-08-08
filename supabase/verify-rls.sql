-- Row Level Security verification script for VisaSparkSchools.
--
-- The same properties this script documents are now proven by EXECUTION,
-- automatically, with no Docker/psql/Supabase CLI required -- see
-- `npm run test:rls` (tests/rls/policies.test.ts), which runs every one of
-- this project's real migration files against a real Postgres engine
-- (PGlite, WASM, fully local/in-process) and asserts on the actual query
-- results. That suite is the routine, CI-suitable verification path; run it
-- on every change to supabase/migrations/. See docs/SECURITY.md's "RLS
-- verification procedure" section for the full picture.
--
-- This .sql file remains as a human-readable reference for exercising the
-- same properties directly against a real linked Supabase project (a
-- one-off sanity check against a *specific deployed* project, distinct from
-- the repo-level guarantee `npm run test:rls` gives). NOT executed as part
-- of this repository's build, tests, or CI, and NOT run against any
-- live/shared project by any automated process -- for a human to run
-- manually against a local, disposable Supabase instance, never against
-- production data. It has been statically reviewed (matched column-by-column
-- and policy-by-policy against every migration through
-- 0007_profile_signup_fields.sql) but not itself executed in this form;
-- treat it as a documented manual procedure, not a proof -- for the
-- executed proof, see `npm run test:rls` above.
--
-- Usage:
--   1. supabase start                     (local, disposable instance only)
--   2. supabase db push                   (applies 0001 + 0002)
--   3. Create two real auth users (e.g. via the Supabase Studio UI or
--      `supabase auth ...`) and note their UUIDs as :user_a and :user_b.
--   4. Run this script's statements from `psql` (or the Supabase SQL
--      editor) once authenticated AS EACH TEST USER in turn -- RLS is only
--      meaningful when evaluated under `auth.uid()` from a real session,
--      not as the Postgres superuser, which bypasses RLS entirely.
--   5. Every "expect 0 rows" below must actually return 0 rows. Any row
--      returned is an RLS policy failure and must be fixed before this
--      migration is ever applied to a real project.

-- ---------------------------------------------------------------------------
-- Step 1 -- as user A: insert one row into every Phase 3 + Phase 4 private
-- table. Expect all inserts to succeed (owner-insert is allowed).
-- ---------------------------------------------------------------------------
insert into public.lesson_progress (user_id, lesson_id, status) values (auth.uid(), 'rls-check', 'completed');
insert into public.exercise_attempts (user_id, exercise_id, attempts, completed) values (auth.uid(), 'rls-check', 1, true);
insert into public.quiz_attempts (user_id, lesson_id, correct, total) values (auth.uid(), 'rls-check', 1, 1);
insert into public.skill_mastery (user_id, skill, score) values (auth.uid(), 'rls-check', 100);
insert into public.review_queue (user_id, lesson_id, due_at, interval_days) values (auth.uid(), 'rls-check', now(), 1);
insert into public.bookmarks (user_id, lesson_id) values (auth.uid(), 'rls-check');
insert into public.notes (user_id, lesson_id, body) values (auth.uid(), 'rls-check', 'test note');
insert into public.daily_goals (user_id, minutes) values (auth.uid(), 20) on conflict (user_id) do update set minutes = 20;
insert into public.enrollments (user_id, course_id) values (auth.uid(), 'rls-check');
insert into public.roadmap_progress (user_id, path_id) values (auth.uid(), 'rls-check');
insert into public.roadmap_step_completions (user_id, path_id, step_id) values (auth.uid(), 'rls-check', 's1');
insert into public.project_progress (user_id, project_id) values (auth.uid(), 'rls-check');
insert into public.project_milestone_completions (user_id, project_id, milestone_id) values (auth.uid(), 'rls-check', 'm1');
insert into public.activity_log (user_id, event_id, type, ref_id, title) values (auth.uid(), 'rls-check', 'bookmark-added', 'rls-check', 'RLS check');

-- ---------------------------------------------------------------------------
-- Step 2 -- as user B: attempt to read/update/delete user A's rows by their
-- known id. Every query below must return 0 rows / affect 0 rows.
-- ---------------------------------------------------------------------------
select * from public.lesson_progress where lesson_id = 'rls-check' and user_id = :'user_a';        -- expect 0 rows
select * from public.notes where lesson_id = 'rls-check' and user_id = :'user_a';                    -- expect 0 rows
select * from public.enrollments where course_id = 'rls-check' and user_id = :'user_a';              -- expect 0 rows
select * from public.roadmap_progress where path_id = 'rls-check' and user_id = :'user_a';           -- expect 0 rows
select * from public.activity_log where event_id = 'rls-check' and user_id = :'user_a';              -- expect 0 rows

update public.notes set body = 'overwritten by B' where user_id = :'user_a' and lesson_id = 'rls-check'; -- expect 0 rows affected
delete from public.enrollments where user_id = :'user_a' and course_id = 'rls-check';                 -- expect 0 rows affected

-- ---------------------------------------------------------------------------
-- Step 3 -- as an unauthenticated (anon) client: repeat the same reads.
-- Every query must also return 0 rows (RLS denies anon, not just other users).
-- ---------------------------------------------------------------------------
-- (run with the anon key, no session -- auth.uid() is null, which never
-- equals a real user_id, so every owner-scoped policy denies by construction)
select * from public.lesson_progress where lesson_id = 'rls-check';                                   -- expect 0 rows

-- ---------------------------------------------------------------------------
-- Step 4 -- profiles: confirm the trigger-created row is readable by its
-- owner and only its owner.
-- ---------------------------------------------------------------------------
select * from public.profiles where id = auth.uid();                                                   -- as A: expect 1 row
select * from public.profiles where id = :'user_a';                                                    -- as B: expect 0 rows

-- ---------------------------------------------------------------------------
-- Step 5 -- tutor_usage: confirm the owner can SELECT but a direct
-- INSERT/UPDATE/DELETE as the owning user (not via increment_tutor_usage())
-- is denied -- this is the one table with no owner "for all" policy,
-- deliberately, to stop the AI tutor's daily quota being resettable by the
-- user it limits.
-- ---------------------------------------------------------------------------
update public.tutor_usage set count = 0 where user_id = auth.uid();                                    -- as A, direct: expect 0 rows affected (no policy grants this)
select public.increment_tutor_usage(auth.uid(), 30);                                                    -- as A, via RPC: expect a real (allowed, remaining) row

-- ---------------------------------------------------------------------------
-- Cleanup (run as each user for their own rows, or as service role).
-- ---------------------------------------------------------------------------
-- delete from public.lesson_progress where lesson_id = 'rls-check';
-- ... (repeat for every table touched above)
