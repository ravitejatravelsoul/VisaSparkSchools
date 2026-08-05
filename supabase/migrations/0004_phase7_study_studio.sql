-- Phase 7: Study Studio -- study plans and cross-device focus-minutes
-- aggregation. Same rules as every prior migration: private, per-user data,
-- RLS-enabled with auth.uid() = user_id. NOT applied to any live project --
-- static review only (see PROJECT_STATUS.md). Does NOT edit migration 0003.
--
-- Deliberately does NOT add tables for the learner's active/paused focus
-- session or today's dismissed queue items: both are single-device,
-- ephemeral working state (see lib/learning/types.ts's FocusSessionState
-- and ProgressState.todayDismissed doc comments) with no real cross-device
-- sync value, so they stay local-only (localStorage / the per-account local
-- cache) and are never pushed to or pulled from Supabase.
-- lib/learning/storage.ts's mergeProgress still merges them correctly
-- during a guest-to-account merge: a remote pull simply never populates
-- them, so local's real value always wins over the empty default.

-- ---------------------------------------------------------------------------
-- study_plans: one row per plan. `schedule` is a bounded structured
-- reference (a JSON object mapping date -> an array of real lesson ids),
-- never a duplicate of any lesson's actual content. `plan_id` is the
-- client-generated id (see lib/learning/store.ts's generateId), so upserts
-- are idempotent per plan -- the same pattern every other client-id-keyed
-- table in this schema already uses (event_id, exercise_id, ...).
-- ---------------------------------------------------------------------------
create table if not exists public.study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  plan_id text not null,
  title text not null check (char_length(title) <= 200),
  course_slugs text[] not null default '{}',
  target_date date,
  preferred_days_of_week smallint[] not null default '{}',
  minutes_per_session integer not null check (minutes_per_session > 0),
  status text not null check (status in ('active', 'paused')),
  schedule jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, plan_id)
);

create index if not exists study_plans_user_idx on public.study_plans (user_id);

alter table public.study_plans enable row level security;
create policy "study_plans: owner all" on public.study_plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- focus_minutes: per-date aggregate of active (unpaused) focus-session time,
-- mirroring the client's own bounded, 90-day-pruned focusMinutesByDate map
-- -- never a full per-session history, never raw session events.
-- ---------------------------------------------------------------------------
create table if not exists public.focus_minutes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  minutes integer not null check (minutes >= 0),
  unique (user_id, date)
);

create index if not exists focus_minutes_user_idx on public.focus_minutes (user_id);

alter table public.focus_minutes enable row level security;
create policy "focus_minutes: owner all" on public.focus_minutes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
