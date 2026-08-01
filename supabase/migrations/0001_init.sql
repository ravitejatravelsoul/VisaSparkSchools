-- VisaSparkSchools initial schema: user-owned learning data only.
-- Course content (tracks/courses/lessons) stays version-controlled in the
-- repo (content/), not in the database, per the architecture doc.
--
-- Every table here holds private, per-user data and MUST have Row Level
-- Security enabled with a policy restricting access to auth.uid() = user_id.
-- See docs/SECURITY.md for the verification procedure.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles: one row per authenticated user, created idempotently on first
-- sign-in via the trigger below.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles: insert own" on public.profiles
  for insert with check (auth.uid() = id);

-- Idempotent profile creation: fires once per new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- lesson_progress
-- ---------------------------------------------------------------------------
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  status text not null check (status in ('not_started', 'in_progress', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists lesson_progress_user_idx on public.lesson_progress (user_id);

alter table public.lesson_progress enable row level security;
create policy "lesson_progress: owner all" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- exercise_attempts
-- ---------------------------------------------------------------------------
create table if not exists public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  exercise_id text not null,
  attempts integer not null default 0 check (attempts >= 0),
  completed boolean not null default false,
  hints_used integer not null default 0 check (hints_used >= 0),
  updated_at timestamptz not null default now(),
  unique (user_id, exercise_id)
);

create index if not exists exercise_attempts_user_idx on public.exercise_attempts (user_id);

alter table public.exercise_attempts enable row level security;
create policy "exercise_attempts: owner all" on public.exercise_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- quiz_attempts
-- ---------------------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  correct integer not null check (correct >= 0),
  total integer not null check (total > 0),
  created_at timestamptz not null default now()
);

create index if not exists quiz_attempts_user_idx on public.quiz_attempts (user_id);

alter table public.quiz_attempts enable row level security;
create policy "quiz_attempts: owner all" on public.quiz_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- skill_mastery
-- ---------------------------------------------------------------------------
create table if not exists public.skill_mastery (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  skill text not null,
  score integer not null check (score >= 0 and score <= 100),
  updated_at timestamptz not null default now(),
  unique (user_id, skill)
);

create index if not exists skill_mastery_user_idx on public.skill_mastery (user_id);

alter table public.skill_mastery enable row level security;
create policy "skill_mastery: owner all" on public.skill_mastery
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- review_queue (spaced repetition schedule)
-- ---------------------------------------------------------------------------
create table if not exists public.review_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  due_at timestamptz not null,
  interval_days integer not null check (interval_days > 0),
  unique (user_id, lesson_id)
);

create index if not exists review_queue_user_due_idx on public.review_queue (user_id, due_at);

alter table public.review_queue enable row level security;
create policy "review_queue: owner all" on public.review_queue
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- bookmarks
-- ---------------------------------------------------------------------------
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists bookmarks_user_idx on public.bookmarks (user_id);

alter table public.bookmarks enable row level security;
create policy "bookmarks: owner all" on public.bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- notes (private, per lesson)
-- ---------------------------------------------------------------------------
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  body text not null default '',
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists notes_user_idx on public.notes (user_id);

alter table public.notes enable row level security;
create policy "notes: owner all" on public.notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- daily_goals
-- ---------------------------------------------------------------------------
create table if not exists public.daily_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  minutes integer not null default 20 check (minutes > 0),
  updated_at timestamptz not null default now()
);

alter table public.daily_goals enable row level security;
create policy "daily_goals: owner all" on public.daily_goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- tutor_usage: atomic daily quota counter for the optional AI tutor.
-- ---------------------------------------------------------------------------
create table if not exists public.tutor_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default current_date,
  count integer not null default 0 check (count >= 0),
  unique (user_id, day)
);

alter table public.tutor_usage enable row level security;

-- Read-only for the owner. Deliberately NO client-facing insert/update/delete
-- policy: every write goes through increment_tutor_usage() below, which is
-- `security definer` and so bypasses RLS internally. If this table instead
-- granted "for all" (as every other owner-scoped table in this file does),
-- an authenticated user could call the Supabase REST API directly with their
-- own session to UPDATE/reset their own tutor_usage row and bypass the daily
-- quota entirely -- the quota is an anti-abuse control, not user data the
-- user is entitled to edit, unlike lesson_progress/notes/bookmarks/etc.
create policy "tutor_usage: owner read" on public.tutor_usage
  for select using (auth.uid() = user_id);

-- Atomically checks and increments today's tutor usage in one round trip,
-- so concurrent serverless invocations can't race past the daily allowance.
create or replace function public.increment_tutor_usage(p_user_id uuid, p_allowance integer)
returns table (allowed boolean, remaining integer)
language plpgsql
security definer set search_path = public
as $$
declare
  current_count integer;
begin
  insert into public.tutor_usage (user_id, day, count)
  values (p_user_id, current_date, 0)
  on conflict (user_id, day) do nothing;

  update public.tutor_usage
    set count = count + 1
    where user_id = p_user_id and day = current_date and count < p_allowance
    returning count into current_count;

  if current_count is null then
    select count into current_count from public.tutor_usage
      where user_id = p_user_id and day = current_date;
    return query select false, greatest(p_allowance - current_count, 0);
  else
    return query select true, greatest(p_allowance - current_count, 0);
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- user_feedback: contact/feedback form submissions. Anonymous (guest)
-- submissions are allowed (user_id null); authenticated submissions are
-- tagged with the user. Inserts only -- nobody can read others' feedback,
-- including the submitter (read access is intentionally admin/service-role
-- only, via the Supabase dashboard or a service key, never the browser).
-- ---------------------------------------------------------------------------
create table if not exists public.user_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  email text,
  message text not null check (char_length(message) between 1 and 4000),
  created_at timestamptz not null default now()
);

alter table public.user_feedback enable row level security;
create policy "user_feedback: anyone can submit" on public.user_feedback
  for insert with check (true);
