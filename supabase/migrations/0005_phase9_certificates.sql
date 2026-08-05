-- Phase 9: honest completion/skill-achievement certificates. Same rules as
-- every prior migration: NOT applied to any live project -- static review
-- only (see PROJECT_STATUS.md). Does NOT edit migrations 0001-0004.
--
-- Certificates are immutable once issued: every descriptive column is a
-- snapshot taken at issuance (see lib/learning/types.ts's CertificateState
-- doc comment), never re-derived from live course content or the learner's
-- current profile. There is deliberately no UPDATE policy below -- once a
-- row exists, the app has no way to modify it, only insert a new one or
-- delete it. `cert_id` (the deterministic `${type}:${targetId}` id computed
-- in lib/certificates/eligibility.ts) is unique per user, so a duplicate
-- issuance attempt (refresh, a second tab, two devices before they've
-- synced) can never create a second row -- enforced here at the database
-- level too, not just by the app's own idempotency check.

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  cert_id text not null,
  cert_type text not null check (cert_type in ('course-completion', 'skill-achievement')),
  target_id text not null,
  target_title text not null check (char_length(target_title) <= 200),
  display_name text not null check (char_length(display_name) <= 200),
  issued_at timestamptz not null,
  criteria_snapshot text[] not null default '{}',
  content_version_ref text not null,
  -- Random, non-enumerable, unique across every learner -- the only key the
  -- public verification view below is ever looked up by. Never derived from
  -- user_id/cert_id/email, so it can't be guessed or enumerated from a
  -- learner's other identifiers.
  verification_code text not null unique,
  unique (user_id, cert_id)
);

create index if not exists certificates_user_idx on public.certificates (user_id);

alter table public.certificates enable row level security;

-- Owner can read and issue (insert) their own certificates. Deliberately no
-- UPDATE policy (immutability, see header comment). A DELETE policy is
-- included so a learner can remove a certificate they no longer want
-- stored, same as they can delete a study plan or a note elsewhere in this
-- schema -- deleting is not the same as silently changing one in place.
create policy "certificates: owner select" on public.certificates
  for select using (auth.uid() = user_id);
create policy "certificates: owner insert" on public.certificates
  for insert with check (auth.uid() = user_id);
create policy "certificates: owner delete" on public.certificates
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Public verification (optional feature -- see docs/CERTIFICATES.md).
-- A narrow, column-restricted view: only the fields safe to show a third
-- party verifying a certificate someone shared with them (never user_id,
-- the internal certificates.id, or cert_id, which is derivable from a
-- learner's own course activity and therefore not something to expose
-- keyed only by course/type). Postgres views default to
-- security_invoker = false (the view runs with its owner's privileges),
-- which is what lets this view read across every row despite the owner-only
-- RLS policies above -- the view's own column list is what keeps this safe,
-- not RLS. Lookups are always by verification_code, a random unique value,
-- so it never allows enumerating a learner's certificates from their course
-- slug or user id.
-- ---------------------------------------------------------------------------
create or replace view public.certificates_public as
select
  cert_type,
  target_title,
  display_name,
  issued_at,
  criteria_snapshot,
  content_version_ref,
  verification_code
from public.certificates;

grant select on public.certificates_public to anon, authenticated;
