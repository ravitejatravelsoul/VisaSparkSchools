-- Phase 6: course-level practice session attempts (Quantitative Aptitude,
-- Logical and Analytical Reasoning, Career and GD Preparation). Same rules
-- as 0001_init.sql and 0002_phase4_learning_accounts.sql: private, per-user
-- data, RLS-enabled with auth.uid() = user_id. NOT applied to any live
-- project -- static review only (see PROJECT_STATUS.md).
--
-- Why a new table instead of extending quiz_attempts: quiz_attempts is
-- scoped to one lesson's fixed 3-question quiz (lesson_id, correct, total)
-- and is deliberately append-only history. A practice session is a
-- course-wide pool of questions drawn across every lesson's quiz (see
-- lib/practice/registry.ts), and per lib/learning/types.ts's
-- PracticeAttemptState this app only ever needs to keep a per-course
-- *summary* (best score, last attempted, topics needing review), not a full
-- attempt history -- so, unlike quiz_attempts, this table is a header row
-- per (user, course), upserted in place, matching the enrollments /
-- roadmap_progress pattern instead.
--
-- topics_needing_review deliberately stores topic tags (short labels like
-- "percentages"), never the learner's actual answers or any free-form text
-- -- every practice question is multiple-choice, so there is no free-form
-- input to store in the first place.

create table if not exists public.practice_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  best_score integer not null check (best_score >= 0),
  best_total integer not null check (best_total > 0),
  topics_needing_review text[] not null default '{}',
  last_attempted_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index if not exists practice_attempts_user_idx on public.practice_attempts (user_id);

alter table public.practice_attempts enable row level security;
create policy "practice_attempts: owner all" on public.practice_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
