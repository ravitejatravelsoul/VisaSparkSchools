-- Adds the profile fields collected by the expanded sign-up form
-- (docs/product-expansion/) so a certificate can record a learner's real
-- first/last name, and so learner_level is available for (non-authorization)
-- personalization. Does NOT edit 0001/0002 -- forward-only, same as every
-- other migration in this project.
--
-- NOT applied to the live project during this session -- see
-- docs/product-expansion/RELEASE_CONFIGURATION.md. This machine has no
-- Docker available, so this file has been reviewed carefully against the
-- proven 0001/0002 pattern (same additive-column shape, same idempotent
-- ON CONFLICT DO NOTHING trigger insert, same truncation discipline) but has
-- NOT been execution-tested against a real Postgres instance in this
-- session -- apply to a local/staging Supabase project and verify a real
-- sign-up before applying to production.

alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  -- E.164 (e.g. "+14155551234"): "+" plus up to 15 digits, so 16 characters
  -- covers every valid value with no slack for anything malformed to slip
  -- through the column type alone (the app also validates/normalizes before
  -- ever writing this column -- see lib/profile/phone.ts).
  add column if not exists phone_e164 text,
  add column if not exists learner_level text;

-- Defensive length caps, same reasoning as 0002's profiles_display_name_length:
-- this column can be reached by any caller of the Supabase Auth API directly
-- (not just this app's own sign-up form), so the constraint -- not just
-- client-side validation -- is what actually bounds it.
alter table public.profiles
  add constraint profiles_first_name_length check (char_length(first_name) <= 80),
  add constraint profiles_last_name_length check (char_length(last_name) <= 80),
  add constraint profiles_phone_e164_length check (char_length(phone_e164) <= 16),
  add constraint profiles_learner_level_check check (
    learner_level is null or learner_level in ('new', 'basics', 'small-projects', 'experienced')
  );

-- phone_e164 must never be reachable by anon/other users: profiles' existing
-- RLS (migration 0001) already restricts select/update/insert to
-- `auth.uid() = id`, and no view/function in this schema selects `profiles.*`
-- for a non-owner -- verify_certificate (0006) and handle_new_user (below)
-- both only ever touch the certificates/profiles tables they need to, never
-- expose phone_e164 anywhere. No RLS change is required here; this comment
-- documents that the property was checked, not assumed.

-- Extends handle_new_user (originally 0001, revised 0002) to also populate
-- the new columns from sign-up metadata, and tightens search_path from
-- 'public' to '' (empty) with fully-qualified `public.profiles` references,
-- the stricter of the two patterns Postgres/Supabase document -- prevents
-- any possible search_path-based object shadowing, not just the schema
-- this function happens to use today. Same truncation + ON CONFLICT DO
-- NOTHING idempotency as every prior version; only additive.
--
-- learner_level is defensively coerced to one of the allowed values (or
-- null) *inside the trigger*, not left to the table CHECK constraint above
-- to reject -- a stray/malformed value in caller-supplied metadata must
-- degrade to null, the same graceful-degradation philosophy 0002 already
-- established for display_name's length, never abort the signup transaction
-- this trigger runs inside.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, first_name, last_name, phone_e164, learner_level)
  values (
    new.id,
    left(new.raw_user_meta_data ->> 'display_name', 80),
    left(new.raw_user_meta_data ->> 'first_name', 80),
    left(new.raw_user_meta_data ->> 'last_name', 80),
    left(new.raw_user_meta_data ->> 'phone_e164', 16),
    case
      when new.raw_user_meta_data ->> 'learner_level'
        in ('new', 'basics', 'small-projects', 'experienced')
      then new.raw_user_meta_data ->> 'learner_level'
      else null
    end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;
