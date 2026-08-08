# Release Configuration — Owner Actions Required

None of the values below are secrets committed to this repository. This file lists **what the
project owner must configure in Vercel/Supabase/Cloudflare dashboards before or during production
release** of this expansion. No item here was performed during any implementation session — this
file is documentation only; every dashboard/DNS/deployment action listed remains an owner action.

**Local implementation status (as of this file's last update)**: content is complete (33 catalog
courses; 26 technical + 4 exam-prep = 30 applicable courses each with a full 50-question
interview/preparation bank; 3 justified exemptions) and `npm run test:rls` proves the Row Level
Security policies in every migration file (0001-0007) execute correctly against a real local
Postgres engine (PGlite/WASM), 148/148 passing. **This is local, pre-migration evidence only** — it
does not prove migration 0007 has been correctly applied to the live, hosted Supabase project.

**Release-blocker status as of the CAPTCHA preflight review**: a controlled-release preflight found
that Supabase CAPTCHA protection can apply to more than just sign-up (sign-in, password-reset
request, and confirmation-email resend all support it too), and the frontend previously only
covered sign-up. That gap has been fixed locally (see the CAPTCHA coverage matrix in the release
report) but **enabling Supabase CAPTCHA enforcement is still not safe until the fixed frontend is
actually deployed** — see the cutover order in §8. Separately, missing custom SMTP is corrected
below from a cosmetic/branding concern to a **functional release blocker**.

## 1. Cloudflare Turnstile

- Create a Turnstile site at the Cloudflare dashboard for the exact production hostname and every
  preview hostname that will run this app (Turnstile validates against the hostname the widget is
  served from — a site configured for one hostname will fail on another).
- Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (the public site key only) to Vercel Production + Preview
  environment variables.
- The **Turnstile secret key** goes only into **Supabase Authentication → Bot and Abuse
  Protection** — never into Vercel, never into this repo, never into any client-reachable code.
  `npm run security:scan-client-secrets` (added as part of the CAPTCHA fix) statically verifies no
  `"use client"` file references a non-`NEXT_PUBLIC_` environment variable, and — after `npm run
build` — greps the built client bundles for known secret-shaped literals.
- CAPTCHA is now wired into every credential-submitting Supabase Auth flow this app implements:
  sign-up, sign-in, password-reset request, and confirmation-email resend. See the CAPTCHA coverage
  matrix in the preflight report for the full per-flow audit. **Do not enable enforcement in
  Supabase until the build containing that fix is the one actually running in production** — §8
  covers the safe order.

## 2. Custom SMTP + sending domain — **functional release blocker, not a branding nicety**

Supabase's built-in/default mailer is explicitly rate-limited and documented by Supabase as **not
intended for production use** — it exists for local development and early testing only. Shipping a
public release on the default mailer risks confirmation and password-recovery emails being
delayed, throttled, or dropped for real users, independent of what the sender name/branding shows.
Treat this as a functional blocker on the same level as the migration or the CAPTCHA cutover, not
as cosmetic polish that can slip to a follow-up release.

Required before this project can be considered ready for public production release:

- [ ] Custom SMTP provider chosen and configured (host, port, username, password, sender address,
      sender name) in **Supabase Authentication → SMTP Settings**.
- [ ] Sending domain verified with the SMTP provider.
- [ ] SPF record checked and passing for the sending domain.
- [ ] DKIM record checked and passing for the sending domain.
- [ ] DMARC record checked (a `p=none` monitoring policy is an acceptable starting point; absence
      of any DMARC record is not).
- [ ] Sender address and sender name confirmed to render as intended (e.g. `VS Schools
<no-reply@<verified-domain>>`), not the Supabase default.
- [ ] Branded confirmation-email template installed (`emails/confirm-signup.html` /
      `emails/confirm-signup.txt` in this repo) in **Supabase Authentication → Email Templates →
      Confirm signup**.
- [ ] Password-recovery email template reviewed and, if a branded version exists, installed the
      same way (**Supabase Authentication → Email Templates → Reset password**).
- [ ] Confirmation email successfully delivered to at least one **external, non-team** test
      address (not an inbox belonging to anyone who worked on this project) and rendering checked
      per `docs/product-expansion/EMAIL_TESTING_CHECKLIST.md`.
- [ ] Password-recovery email successfully delivered to at least one external, non-team test
      address.
- [ ] Supabase Auth email rate limits reviewed for the chosen SMTP provider/plan and confirmed
      adequate for expected signup volume.
- [ ] Site URL and the Auth redirect allowlist (**Supabase Authentication → URL Configuration**)
      verified to contain exactly the intended production and preview origins — a stale or missing
      entry here breaks confirmation/reset links or, if too permissive, becomes an open-redirect
      risk.

None of these SMTP/DNS/template items were configured during any implementation session — they
require access to a live DNS zone and the hosted Supabase dashboard, which local implementation
work does not have and must not attempt.

## 3. Supabase migration 0007

- `supabase/migrations/0007_profile_signup_fields.sql` adds `first_name`, `last_name`,
  `phone_e164`, `learner_level` to `public.profiles` plus supporting `CHECK` constraints and an
  updated `handle_new_user()` trigger function. `lib/sync/push.ts` already upserts these columns by
  name, so **this migration must be applied before the new application code is deployed** — the new
  code depends on columns migration 0007 creates.
- See §7 for the required dry-run/verification procedure before running this against the hosted
  project, and §8 for where this fits in the overall cutover order.

## 4. VisaSpark URL

- Provide the real VisaSpark website URL. Add it as `NEXT_PUBLIC_VISASPARK_URL` in Vercel
  Production + Preview. Until set, the Study Abroad pages show a non-clickable "coming soon" state
  instead of a guessed link.

## 5. New environment variables summary (names only, no values)

| Variable                         | Required for                                      | Notes                            |
| -------------------------------- | ------------------------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | CAPTCHA widgets (sign-up, sign-in, reset, resend) | Public key only                  |
| `NEXT_PUBLIC_VISASPARK_URL`      | Study Abroad CTA                                  | Optional; safe fallback if unset |

Existing variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`NEXT_PUBLIC_SITE_URL`) are unchanged and already configured per the prior deployment session.

## 6. Backup / recovery readiness gate — currently `BLOCKED`

Recovery readiness must be **proven**, not assumed, before any step that changes hosted schema or
Auth configuration (migration 0007, CAPTCHA enforcement). Read-only checks against the linked
project (`supabase backups list --project-ref <ref>`, `supabase projects list`) found:

- **Restorable daily backup**: **none.** The physical-backups list for this project returns an
  empty `backups` array — there is currently no completed backup this project could be restored
  from.
- **PITR (point-in-time recovery)**: **disabled** (`pitr_enabled: false`). Point-in-time restore is
  not available for this project as currently configured.
- **Latest valid recovery point**: **none exists** — there is nothing to restore to.
- **Plan tier**: not directly exposed by the Supabase CLI for this project; not confirmed. The
  empty backup list and disabled PITR are each independently consistent with either a Free-tier
  project (no automated backups at all) or a very young paid project that hasn't completed its
  first backup cycle yet — this project was created 2026-08-05, only days before this review, which
  is old enough that an absent first backup is itself notable but not fully conclusive on plan tier
  alone. The owner should confirm the actual plan in the Supabase dashboard billing page directly.
- **Manual logical export (`supabase db dump`) as a substitute**: **not verified, and not
  recommended as an available solution.** This machine has no Docker, `psql`, or `pg_dump`
  installed. Whether the Supabase CLI's own dump path can run without those (some recent CLI
  versions bundle dump logic that doesn't shell out to a system `pg_dump`) was not tested here,
  because doing so would require opening a connection to the live hosted database beyond the
  read-only Management-API status calls above, which this task deliberately did not do. An
  unverified capability must not be relied on as a recovery plan.

**Verdict: `BLOCKED`.** No tested, restorable recovery method currently exists for this project.
This must be resolved (enable PITR and/or confirm a completed daily backup exists, or separately
verify a manual export actually works from a real machine) before applying migration 0007 or
otherwise changing hosted schema/Auth configuration — not as part of this local implementation
task. Do not proceed past step 1 in §8 while this status is `BLOCKED`.

## 7. Migration execution safety procedure (documentation only — do not run outside a real cutover)

Applying migration 0007 to the hosted project must use exactly this sequence, run by whoever owns
the Supabase credentials, not as part of any local implementation task:

1. `npx supabase migration list --linked` — confirm the linked project's applied-migration history
   matches expectations (0001-0006 applied, 0007 not yet applied) before touching anything.
2. `npx supabase db push --linked --dry-run` — review the exact SQL/plan Supabase intends to run.
3. Verify the dry-run plan applies **exactly migration 0007 and no other, unexpected migration**.
   If the dry-run shows anything else queued, stop and investigate before proceeding — do not push
   through an unexplained extra migration.
4. Get a separate, explicit go-ahead from the project owner for the real `db push`, distinct from
   whatever approval covered the dry run — the dry run is read-only against the hosted project;
   the real push is not.
5. Run the real `npx supabase db push --linked`.
6. Immediately re-run `npx supabase migration list --linked` and confirm 0007 now shows as applied,
   with no other unexpected entries.
7. Verify the new columns exist on `public.profiles` with the expected types/constraints (e.g. via
   the Supabase SQL editor or dashboard schema browser) before moving on to deployment.

## 8. Safe CAPTCHA cutover order

The previous release plan enabled Supabase CAPTCHA enforcement before the compatible frontend was
deployed. If the currently-deployed production app doesn't send a `captchaToken` on every
CAPTCHA-protected flow, enabling enforcement first would break Auth for real users immediately.
Steps below are labeled **[prepare]** — safe to do in advance, does not change live Auth behavior —
or **[live]** — changes what currently-deployed production Auth actually does.

1. **[prepare]** Verify backup/recovery readiness (§6). Do not proceed past this step while that
   status is `BLOCKED`.
2. **[prepare]** Verify SMTP, sending-domain DNS, templates, and Auth redirect configuration (§2).
3. **[prepare]** Create/configure the Turnstile widget for the exact production and preview
   hostnames (§1).
4. **[prepare]** Configure the public Turnstile site key (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`) for
   Vercel Preview and Production.
5. **[prepare]** Determine whether Supabase allows the Turnstile secret key to be saved while
   CAPTCHA enforcement itself remains disabled (i.e. whether "configured" and "enforced" are
   separable in the Supabase dashboard for this project). If they are separable, saving the secret
   ahead of time is a `[prepare]` step; if not, saving the secret and enabling enforcement happen
   together and step 12 below is when it actually happens.
6. **[prepare]** Keep global CAPTCHA enforcement **disabled** in Supabase until every
   CAPTCHA-protected frontend Auth flow (sign-up, sign-in, password reset, resend) is actually the
   version running in production — unless the currently-deployed production build is independently
   verified to already send `captchaToken` on all of them (it is not, as of this review; the
   sign-in, reset, and resend flows were the defects this review found and fixed locally).
7. **[live]** Apply migration 0007 (§7) before deploying the new application build — the new
   profile-upsert code requires the columns it adds, so deploying the new code first would break
   sign-up/profile sync against the old schema.
8. **[live]** Push the reviewed local commits and let CI (`quality` + `e2e`) pass.
9. **[prepare]** Create a non-production Vercel preview deployment and manually test every affected
   Auth form (sign-up, sign-in, reset, resend) against it, including the CAPTCHA widget itself.
10. **[prepare]** Record the exact currently-aliased production deployment ID/URL as the rollback
    target before promoting anything new — see the rollback-target verification procedure in the
    preflight release report.
11. **[live]** Deploy/promote the verified build to production.
12. **[live]** Enable Supabase CAPTCHA enforcement — only at this point, only after step 11 is
    confirmed live.
13. **[live]** Immediately test sign-up, sign-in, password recovery, resend, and a deliberate
    CAPTCHA failure/expiration case against production.
14. **[live]** If CAPTCHA validation fails unexpectedly in production, disable enforcement first to
    restore Auth availability, then diagnose or roll back the application build as appropriate —
    restoring availability takes priority over root-causing in the moment.

None of steps 1-14 were performed by any implementation session. Steps marked `[live]` require
explicit, in-the-moment owner authorization even when this document is otherwise followed exactly.
