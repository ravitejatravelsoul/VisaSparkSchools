# Release Configuration — Owner Actions Required

None of the values below are secrets committed to this repository. This file lists **what the
project owner must configure in Vercel/Supabase/Cloudflare dashboards before or during production
release** of this expansion. No item here was performed during any implementation session — this
file is documentation only; every dashboard/DNS/deployment action listed remains an owner action.

**Local implementation status (as of this file's last update)**: content is complete (33 catalog
courses; 26 technical + 4 exam-prep = 30 applicable courses each with a full 50-question
interview/preparation bank; 3 justified exemptions) and `npm run test:rls` proves the Row Level
Security policies in every migration file (0001-0007) execute correctly against a real local
Postgres engine (PGlite/WASM), 148/148 passing. **Migration 0007 has since been applied to and
verified against the live, hosted Supabase project** — see the migration preflight/execution
reports for the full backup, rehearsal, and post-migration verification record.

**CAPTCHA status**: shipping this release **behind an explicit, off-by-default feature flag**
(`NEXT_PUBLIC_TURNSTILE_ENABLED`) rather than as an unresolved release blocker — see §1 and §8. The
frontend already covers every credential-submitting flow (sign-up, sign-in, password-reset
request, confirmation-email resend) whenever the flag is turned on; turning it on is deferred to a
future release, not required for this one. Custom SMTP + sending-domain configuration (§2) is
confirmed live and working (a real user's confirmation email was successfully delivered and
confirmed in production).

## 1. Cloudflare Turnstile — **deferred, OFF by default for this release**

CAPTCHA is intentionally **disabled** for this release, behind an explicit feature flag,
`NEXT_PUBLIC_TURNSTILE_ENABLED` (`lib/site-config.ts`'s `featureFlags.turnstileEnabled`). While
that flag is unset or `false`: no Cloudflare account is required, no site key or secret is needed,
no Turnstile script ever loads, and sign-in/sign-up/password-reset/resend all work through their
normal non-CAPTCHA paths. This is a real disabled state, not a stubbed-out or fake-passing CAPTCHA
-- see `docs/product-expansion/DECISIONS.md`'s "CAPTCHA choice" for the exact gating logic.

**To activate in a future release**, in this order:

1. Create a Turnstile site at the Cloudflare dashboard for the exact production hostname and every
   preview hostname that will run this app (Turnstile validates against the hostname the widget is
   served from — a site configured for one hostname will fail on another).
2. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (the public site key only) to Vercel Production + Preview
   environment variables.
3. The **Turnstile secret key** goes only into **Supabase Authentication → Bot and Abuse
   Protection** — never into Vercel, never into this repo, never into any client-reachable code.
   `npm run security:scan-client-secrets` statically verifies no `"use client"` file references a
   non-`NEXT_PUBLIC_` environment variable, and — after `npm run build` — greps the built client
   bundles for known secret-shaped literals.
4. **Do not enable enforcement in Supabase until** the deployed build actually sends
   `captchaToken` on every protected flow (sign-up, sign-in, password-reset request,
   confirmation-email resend — see the CAPTCHA coverage matrix in the preflight report) **and**
   `NEXT_PUBLIC_TURNSTILE_ENABLED=true` is set in Vercel and the app has been redeployed with it.
   §8 covers the full safe order.
5. Only once 1–4 are done and verified, set `NEXT_PUBLIC_TURNSTILE_ENABLED=true` in Vercel,
   redeploy, and test every protected flow against the real widget before enabling Supabase-side
   enforcement.

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

| Variable                         | Required for                                      | Notes                                                    |
| -------------------------------- | ------------------------------------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_TURNSTILE_ENABLED`  | Turning CAPTCHA on at all                         | Not set for this release -- defaults to disabled         |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | CAPTCHA widgets (sign-up, sign-in, reset, resend) | Public key only; only read when the flag above is `true` |
| `NEXT_PUBLIC_VISASPARK_URL`      | Study Abroad CTA                                  | Optional; safe fallback if unset                         |

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
This must be resolved before applying migration 0007 or otherwise changing hosted schema/Auth
configuration — not as part of this local implementation task. Do not proceed past step 1 in §8
while this status is `BLOCKED`. Required to clear this blocker (any one path is sufficient, but it
must be a _tested_ one):

1. Owner confirms the actual Supabase plan in the dashboard billing page.
2. If that plan includes automatic daily backups: wait until a real, completed, restorable backup
   actually appears in **Database → Backups**, and record its exact timestamp here.
3. If automatic backups aren't available (or as a second, independent method): from a real
   machine with Docker and/or `psql`/`pg_dump` available (not this one), create a manual logical
   backup, then **restore it into a separate, isolated environment** and confirm the restore
   actually succeeds and produces the expected schema/data before trusting it as a recovery path.
   An untested dump file is not a verified recovery method regardless of how it was produced.
4. PITR remains optional — enabling it is the owner's choice — but at least one of the two methods
   above must be genuinely tested before this gate can clear, not merely configured.

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

**Status: migration 0007 is applied and verified in production. CAPTCHA is shipping OFF (behind
`NEXT_PUBLIC_TURNSTILE_ENABLED`, unset) in this release — none of the Cloudflare/Supabase
CAPTCHA-configuration steps below are required for this release to go out.** They're kept here as
the ordered procedure for the _future_ release that turns CAPTCHA on. Steps are labeled
**[prepare]** — safe to do in advance, does not change live Auth behavior — or **[live]** —
changes what currently-deployed production Auth actually does.

1. ~~**[live]** Apply migration 0007~~ — **done**, applied and verified against production.
2. ~~**[live]** Push this release's local commits~~ — this release ships the CAPTCHA _toggle_,
   defaulted off; no Cloudflare/Supabase configuration is a prerequisite for it.
3. **[prepare]** _(future CAPTCHA-activation release)_ Verify backup/recovery readiness (§6) is
   still current before that release, independent of this one.
4. **[prepare]** Create/configure the Turnstile widget for the exact production and preview
   hostnames (§1).
5. **[prepare]** Configure the public Turnstile site key (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`) for
   Vercel Preview and Production. The flag (`NEXT_PUBLIC_TURNSTILE_ENABLED`) stays `false` at this
   point — a configured key with the flag still off changes nothing live (see §1).
6. **[prepare]** Save the Turnstile secret key in Supabase's Bot and Abuse Protection settings,
   leaving enforcement itself disabled if the dashboard allows saving the two separately.
7. **[live]** Set `NEXT_PUBLIC_TURNSTILE_ENABLED=true` in Vercel and redeploy — only once the
   deployed frontend already sends `captchaToken` on every protected flow (sign-up, sign-in,
   password-reset request, resend), which this release's code already does whenever the flag is on.
8. **[prepare]** Create a non-production Vercel preview deployment and manually test every affected
   Auth form (sign-up, sign-in, reset, resend) against it, including the real CAPTCHA widget.
9. **[live]** Enable Supabase CAPTCHA enforcement — only now, after step 7 is confirmed live and
   step 8 passed.
10. **[prepare]** Record the exact currently-aliased production deployment ID/URL as the rollback
    target before promoting anything new — see the rollback-target verification procedure in the
    preflight release report. (Step 7 above already covers deploying the flag-flip itself.)
11. **[live]** Immediately test sign-up, sign-in, password recovery, resend, and a deliberate
    CAPTCHA failure/expiration case against production.
12. **[live]** If CAPTCHA validation fails unexpectedly in production, disable enforcement first
    (or set `NEXT_PUBLIC_TURNSTILE_ENABLED` back to `false` and redeploy) to restore Auth
    availability, then diagnose as appropriate — restoring availability takes priority over
    root-causing in the moment.

Steps 1-2 are done, as of this release. Steps 3-12 (the actual Cloudflare/Supabase configuration)
were not performed by any implementation session and remain a future, separate release. Steps
marked `[live]` require explicit, in-the-moment owner authorization even when this document is
otherwise followed exactly.
