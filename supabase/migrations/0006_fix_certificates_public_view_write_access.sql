-- Permanently fixes migration 0005's certificates_public view. Does NOT
-- edit 0005 -- this is a forward fix, same as every other migration in this
-- project. See PROJECT_STATUS.md for the full incident writeup.
--
-- Two problems, found in this order while live-verifying migration 0005 for
-- the first time against a real project:
--
-- 1. (Fixed immediately on the live project via a direct REVOKE, now made
--    permanent here.) certificates_public is `security definer` (the
--    Postgres default for views -- it runs with its owner's privileges,
--    bypassing the underlying certificates table's owner-only RLS). Because
--    it's also a simple, single-table view, Postgres auto-detects it as
--    updatable, and Supabase's default schema grants gave `anon`/
--    `authenticated` INSERT/UPDATE/DELETE on it. Proven exploitable: an
--    unauthenticated caller could UPDATE an *existing* certificate's
--    exposed fields (target_title, display_name, criteria_snapshot,
--    content_version_ref) for any row, by verification_code alone -- a real
--    defacement path against a certificate meant to be immutable once
--    issued. (INSERT was separately blocked by certificates.user_id's NOT
--    NULL constraint, not exposed by the view -- but UPDATE/DELETE had no
--    such incidental protection.)
--
-- 2. (Found while designing this permanent fix, not previously reported.)
--    Even with write access revoked, the view itself allows an
--    unauthenticated `select * from certificates_public` with no filter,
--    returning *every* issued certificate's display_name/target_title/
--    issued_at in one call -- a bulk-enumeration/scraping vector the
--    intended "look up one certificate you were given a link to" feature
--    never needed. Supabase's own security advisor separately flags any
--    `security definer` view as an ERROR-level finding
--    (0010_security_definer_view) regardless of its grants, because the
--    property itself (bypassing RLS for whoever can reach it) is the risk,
--    not just whichever privileges happen to be granted at the time.
--
-- Fix for both: drop the view entirely and replace it with a narrow,
-- single-purpose SECURITY DEFINER function that takes exactly one
-- verification_code and returns at most one row of the same seven safe
-- fields the view exposed -- never user_id/id/cert_id, never a bulk
-- listing, never writable (a function has no INSERT/UPDATE/DELETE surface
-- the way an auto-updatable view does). This is the same, Supabase-
-- documented pattern this schema already uses for `handle_new_user`/
-- `increment_tutor_usage` (both SECURITY DEFINER functions with explicit,
-- narrow grants) -- not a new pattern introduced for this fix.
--
-- certificates' own owner-only RLS policies (select/insert/delete, no
-- update -- see migration 0005) are completely untouched by this file.

drop view if exists public.certificates_public;

create or replace function public.verify_certificate(p_verification_code text)
returns table (
  cert_type text,
  target_title text,
  display_name text,
  issued_at timestamptz,
  criteria_snapshot text[],
  content_version_ref text,
  verification_code text
)
language sql
security definer
set search_path = 'public'
stable
as $$
  select
    c.cert_type,
    c.target_title,
    c.display_name,
    c.issued_at,
    c.criteria_snapshot,
    c.content_version_ref,
    c.verification_code
  from public.certificates c
  where c.verification_code = p_verification_code;
$$;

-- Explicit least privilege: Postgres grants EXECUTE to PUBLIC by default on
-- every newly created function -- revoke that default, then grant only to
-- the two roles that need it. No role, including PUBLIC, gets anything
-- beyond EXECUTE on this one function; nothing is granted on the
-- certificates table itself here (its existing RLS already governs that).
revoke all on function public.verify_certificate(text) from public;
grant execute on function public.verify_certificate(text) to anon, authenticated;
