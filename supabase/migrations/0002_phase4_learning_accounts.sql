-- Phase 4: course enrollment, roadmap/project progress tracking, activity
-- feed, and expanded preferences. Same rules as 0001_init.sql: every table
-- here is private, per-user data, RLS-enabled with auth.uid() = user_id.
-- NOT applied to any live project -- static review only (see PROJECT_STATUS.md).
--
-- Deliberately does NOT add a separate "preferences" table: `profiles`
-- already exists as the one-row-per-user table for account-level fields
-- (display_name), so the new preference fields (learning_goal,
-- current_roadmap_id, timezone) are added to it via ALTER instead of
-- creating a second 1:1 table that would just duplicate its primary key.
-- Sync metadata (last synced at, sync status) is deliberately NOT stored
-- server-side either -- it's a per-device concern, kept in the browser's
-- local cache (see lib/sync/lifecycle.ts); a server-side table would need
-- its own per-device rows to mean anything, which isn't worth the
-- complexity in this phase.

-- ---------------------------------------------------------------------------
-- profiles: add Phase 4 preference fields. Length-bounded to match the
-- application's own input limits (components/profile/profile-form.tsx) --
-- an HTML maxLength attribute is a UI hint only and is trivially bypassed
-- via a direct API call with the user's own (legitimately authenticated)
-- session, so the real constraint has to live here. display_name predates
-- Phase 4 (0001_init.sql) but only became editable through the app in this
-- phase, so it gets the same treatment now rather than staying unbounded.
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists learning_goal text;
alter table public.profiles add column if not exists current_roadmap_id text;
alter table public.profiles add column if not exists timezone text;

alter table public.profiles drop constraint if exists profiles_display_name_length;
alter table public.profiles add constraint profiles_display_name_length
  check (char_length(display_name) <= 80);

alter table public.profiles drop constraint if exists profiles_learning_goal_length;
alter table public.profiles add constraint profiles_learning_goal_length
  check (char_length(learning_goal) <= 200);

alter table public.profiles drop constraint if exists profiles_timezone_length;
alter table public.profiles add constraint profiles_timezone_length
  check (char_length(timezone) <= 100);

-- 0001_init.sql's handle_new_user() trigger writes display_name straight
-- from auth.users.raw_user_meta_data, which this app's own sign-up form
-- never populates (so this never fires in practice through the app's UI)
-- but is otherwise attacker/caller-supplied metadata on the auth.users
-- insert. Without truncation, a display_name longer than 80 characters
-- supplied through any other path (a direct Supabase Auth API call, a
-- future sign-up flow that does collect one, etc.) would violate the new
-- profiles_display_name_length constraint above from inside an AFTER
-- INSERT trigger on auth.users -- which rolls back the entire signup, not
-- just the profile row. Truncating defensively here means a too-long name
-- degrades gracefully instead of silently breaking account creation.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(new.raw_user_meta_data ->> 'display_name', 80))
  on conflict (id) do nothing;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- notes: add versioned-conflict columns so a guest-to-account merge never
-- silently overwrites one side's writing (see lib/learning/storage.ts#mergeNote).
-- ---------------------------------------------------------------------------
alter table public.notes add column if not exists conflict_text text;
alter table public.notes add column if not exists conflict_updated_at timestamptz;

-- ---------------------------------------------------------------------------
-- enrollments
-- ---------------------------------------------------------------------------
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  enrolled_at timestamptz not null default now(),
  last_accessed_lesson_id text,
  last_accessed_at timestamptz,
  unique (user_id, course_id)
);

create index if not exists enrollments_user_idx on public.enrollments (user_id);

alter table public.enrollments enable row level security;
create policy "enrollments: owner all" on public.enrollments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- roadmap_progress (one header row per roadmap the learner has started)
-- ---------------------------------------------------------------------------
create table if not exists public.roadmap_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  path_id text not null,
  started_at timestamptz not null default now(),
  last_accessed_at timestamptz not null default now(),
  unique (user_id, path_id)
);

create index if not exists roadmap_progress_user_idx on public.roadmap_progress (user_id);

alter table public.roadmap_progress enable row level security;
create policy "roadmap_progress: owner all" on public.roadmap_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- roadmap_step_completions: self-reported completion for roadmap steps that
-- have no other derivable signal (technology-guide / practice / assessment
-- steps). Course and project steps are intentionally NEVER written here --
-- their completion is always derived live from lesson_progress /
-- project_milestone_completions, never trusted as a stored flag.
-- ---------------------------------------------------------------------------
create table if not exists public.roadmap_step_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  path_id text not null,
  step_id text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, path_id, step_id)
);

create index if not exists roadmap_step_completions_user_idx on public.roadmap_step_completions (user_id);

alter table public.roadmap_step_completions enable row level security;
create policy "roadmap_step_completions: owner all" on public.roadmap_step_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- project_progress (one header row per project the learner has started)
-- ---------------------------------------------------------------------------
create table if not exists public.project_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  project_id text not null,
  started_at timestamptz not null default now(),
  unique (user_id, project_id)
);

create index if not exists project_progress_user_idx on public.project_progress (user_id);

alter table public.project_progress enable row level security;
create policy "project_progress: owner all" on public.project_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- project_milestone_completions: project completion is derived from these,
-- the same way course completion is derived from lesson_progress.
-- ---------------------------------------------------------------------------
create table if not exists public.project_milestone_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  project_id text not null,
  milestone_id text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, project_id, milestone_id)
);

create index if not exists project_milestone_completions_user_idx on public.project_milestone_completions (user_id);

alter table public.project_milestone_completions enable row level security;
create policy "project_milestone_completions: owner all" on public.project_milestone_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- activity_log: small, explicit allowlist of event types (enforced at the
-- application layer via ActivityEventType in lib/learning/types.ts, and
-- redundantly here via a check constraint so a bad row can't be inserted by
-- any other client either). `event_id` is the client-generated stable,
-- idempotent id (e.g. "lesson-completed:js-variables") -- logging the same
-- event twice is a harmless upsert, never a duplicate row.
-- ---------------------------------------------------------------------------
create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  event_id text not null,
  type text not null check (type in (
    'lesson-completed', 'course-enrolled', 'course-completed', 'roadmap-started',
    'roadmap-step-completed', 'roadmap-completed', 'project-milestone-completed',
    'project-completed', 'bookmark-added'
  )),
  ref_id text not null,
  title text not null,
  occurred_at timestamptz not null default now(),
  unique (user_id, event_id)
);

create index if not exists activity_log_user_occurred_idx on public.activity_log (user_id, occurred_at desc);

alter table public.activity_log enable row level security;
create policy "activity_log: owner all" on public.activity_log
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
