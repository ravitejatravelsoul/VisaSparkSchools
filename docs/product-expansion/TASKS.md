# Product Expansion — Task Tracker

Resumable checkpoint file. Status values: `pending`, `in progress`, `blocked`, `completed`.
Update this file after every phase/major task. Do not claim `completed` for an item whose
verification evidence is missing.

**Session start**: commit `d065c4a`, clean tree, CI green, production at `d065c4a`.
**Current HEAD at last update of this file**: see bottom of file.

---

## Phase 0 — Requirements & task system

| ID   | Description                     | Status    | Evidence                          |
| ---- | ------------------------------- | --------- | --------------------------------- |
| P0.1 | Create REQUIREMENTS.md          | completed | file exists, covers all 15 phases |
| P0.2 | Create TASKS.md                 | completed | this file                         |
| P0.3 | Create DECISIONS.md             | completed | file exists                       |
| P0.4 | Create RELEASE_CONFIGURATION.md | completed | file exists                       |

## Phase 1 — Repository audit

| ID    | Description                                                 | Status    | Evidence                                         |
| ----- | ----------------------------------------------------------- | --------- | ------------------------------------------------ |
| P1.1  | Audit auth/signup/session/callback                          | completed | see AUDIT NOTES below                            |
| P1.2  | Audit profile schema/RLS/trigger                            | completed | see AUDIT NOTES below                            |
| P1.3  | Audit guest-to-account sync                                 | completed | already audited prior session, this conversation |
| P1.4  | Audit dashboard/certificate access for guests               | completed | see Phase 3/4 audit notes                        |
| P1.5  | Audit certificate issuance/storage/verification/eligibility | completed | already audited prior session, this conversation |
| P1.6  | Audit content registry/schemas                              | completed | see AUDIT NOTES below                            |
| P1.7  | Audit runners/Try It Yourself                               | pending   | to audit at start of Phase 8                     |
| P1.8  | Audit nav/footer/chatbot                                    | completed | see AUDIT NOTES below                            |
| P1.9  | Audit search index/sitemap/metadata                         | pending   | to audit at start of Phase 5/9                   |
| P1.10 | Audit CI/npm version/content validators                     | completed | pinned npm 10.9.9, verified this session         |
| P1.11 | grep sweep for all listed reference terms                   | completed | performed across Phase 1                         |

## Phase 2 — Signup, profile, CAPTCHA, email

| ID    | Description                                       | Status    | Dependencies | Acceptance       | Evidence                                                               |
| ----- | ------------------------------------------------- | --------- | ------------ | ---------------- | ---------------------------------------------------------------------- |
| P2.1  | Migration 0007: profile columns                   | completed | P1.2         | R2.23-R2.28      | `supabase/migrations/0007_profile_signup_fields.sql` (not applied)     |
| P2.2  | Turnstile widget component                        | completed | P0           | R2.11-R2.14      | `components/auth/turnstile-widget.tsx`                                 |
| P2.3  | Signup form fields (name/phone/level/terms)       | completed | P2.1         | R2.1-R2.10       | `components/auth/sign-up-form.tsx`                                     |
| P2.4  | Name/phone normalization + validation lib         | completed |              | R2.3, R2.4, R2.7 | `lib/profile/*`, `tests/unit/profile-validation.test.ts`               |
| P2.5  | Check-your-email confirmation state               | completed |              | R2.15, R2.16     | `sign-up-form.tsx` check-email step                                    |
| P2.6  | Auth callback: expired/invalid/used link handling | completed |              | R2.17            | `app/auth/callback/route.ts`, `tests/unit/auth-callback-route.test.ts` |
| P2.7  | Post-verification success + merge-once + routing  | completed | P2.6         | R2.18            | `app/(site)/welcome/*`                                                 |
| P2.8  | Branded email HTML+text templates                 | completed |              | R2.19            | `emails/confirm-signup.{html,txt}`                                     |
| P2.9  | Profile/Account Settings page                     | completed | P2.1         | R2.21, R2.22     | `components/profile/profile-form.tsx` extended                         |
| P2.10 | Unit/integration/e2e tests for Phase 2            | completed | P2.1-P2.9    |                  | 622/622 Vitest passing; no dedicated Playwright e2e yet (limitation)   |

## Phase 3 — Dashboard guest/auth split

| ID   | Description                            | Status    | Evidence                                                                                                                                               |
| ---- | -------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P3.1 | Signed-out dashboard gate              | completed | `components/dashboard/dashboard-auth-gate.tsx`                                                                                                         |
| P3.2 | Signed-in dashboard behavior audit/fix | completed | already correct (per-user data, real "Continue learning", refresh-safe sync fixed in a prior session this conversation); no further code change needed |
| P3.3 | Tests                                  | completed | `tests/integration/dashboard-auth-gate.test.tsx`, 3/3 passing                                                                                          |

**Note**: the gate only applies when `featureFlags.supabaseEnabled` is true (accounts actually
exist for this deployment). When Supabase isn't configured, the dashboard remains the existing
guest/local-only experience, matching every other Supabase-disabled surface in this app being
honest local/demo mode rather than an unsatisfiable gate.

## Phase 4 — Certificates

| ID   | Description                                            | Status    | Evidence                                                                                                                                                                                               |
| ---- | ------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P4.1 | Guest certificate-page gate copy                       | completed | `certificates-dashboard.tsx` sign-in gate, `certificate-presentation.tsx` "not yet verifiable"                                                                                                         |
| P4.2 | Require auth for issue/download                        | completed | issue button gated on `signedIn`; PDF route requires a real session (401 otherwise)                                                                                                                    |
| P4.3 | Eligibility progress display ("8 of 12")               | completed | `RequirementRow` shows "`N` of `M` required lessons completed"                                                                                                                                         |
| P4.4 | Certificate visual redesign (issuer/signatory/QR/note) | completed | `certificate-presentation.tsx`, `lib/certificates/pdf.ts`                                                                                                                                              |
| P4.5 | QR generation + verification URL only                  | completed | `lib/certificates/qr.ts`; decode-tested, see P4.8                                                                                                                                                      |
| P4.6 | PDF generation route (server-rendered, trusted data)   | completed | `app/api/certificates/[type]/[targetId]/pdf/route.ts`, RLS-scoped, no service-role key                                                                                                                 |
| P4.7 | Legacy local-certificate handling                      | completed | `mergeCertificates` now re-validates any local-only certificate against real merged progress before trusting it (a genuine, previously-unhandled gap found while implementing this phase -- see below) |
| P4.8 | Tests (QR decode, PDF, eligibility, duplicate)         | completed | `tests/unit/certificate-{qr,pdf,pdf-route}.test.ts`, `tests/integration/certificate*.test.tsx`, `tests/unit/progress-merge.test.ts`                                                                    |

**Security fix found and made during this phase (not in the original scope list, but required by
"No local certificate can be promoted without server eligibility validation")**: `mergeCertificates`
in `lib/learning/storage.ts` previously took an unconditional union of local and remote
certificates -- a certificate that existed only in a guest's `localStorage` (hand-edited, or a
pre-existing local certificate from before sign-in was required to issue one) would have been
pushed to the server as a trusted, permanent record on the next sync, with no re-validation at
all. Fixed: a local-only certificate is now re-validated against the fully-merged real progress
before being trusted; a remote-confirmed certificate is always trusted unconditionally (it already
passed this check once, on a previous sync, and re-checking it against a possibly-incomplete
freshly-syncing device's local view could wrongly _drop_ a genuine, permanent certificate). Full
before/after regression coverage in `tests/unit/progress-merge.test.ts`.

## Phase 5 — Study Abroad

| ID    | Description                                     | Status  | Evidence |
| ----- | ----------------------------------------------- | ------- | -------- |
| P5.1  | Nav/footer "Study Abroad" entry                 | pending |          |
| P5.2  | Country content schema + validator              | pending |          |
| P5.3  | Country data: US                                | pending |          |
| P5.4  | Country data: Canada                            | pending |          |
| P5.5  | Country data: UK                                | pending |          |
| P5.6  | Country data: Australia                         | pending |          |
| P5.7  | Country data: Germany                           | pending |          |
| P5.8  | Country data: Ireland                           | pending |          |
| P5.9  | `/study-abroad` directory page                  | pending |          |
| P5.10 | `/study-abroad/[countrySlug]` page + components | pending |          |
| P5.11 | VisaSpark CTA component + config                | pending |          |
| P5.12 | Tests                                           | pending |          |

## Phase 6 — Exam preparation

| ID   | Description                                      | Status  | Evidence |
| ---- | ------------------------------------------------ | ------- | -------- |
| P6.1 | IELTS course content (>=12 lessons)              | pending |          |
| P6.2 | PTE course content (>=12 lessons)                | pending |          |
| P6.3 | TOEFL iBT course content (>=12 lessons)          | pending |          |
| P6.4 | GRE course content (>=12 lessons)                | pending |          |
| P6.5 | Practice/mock-test experience (shared component) | pending |          |
| P6.6 | Speaking/writing self-review rubric UI           | pending |          |
| P6.7 | Trademark/independence notices                   | pending |          |
| P6.8 | Tests                                            | pending |          |

## Phase 7 — Technical course catalog expansion

| ID    | Description                            | Status  | Evidence |
| ----- | -------------------------------------- | ------- | -------- |
| P7.1  | Catalog audit for duplicates           | pending |          |
| P7.2  | C Programming course                   | pending |          |
| P7.3  | C++ Programming course                 | pending |          |
| P7.4  | C#/.NET Fundamentals course            | pending |          |
| P7.5  | Angular Application Development course | pending |          |
| P7.6  | AngularJS Legacy Maintenance course    | pending |          |
| P7.7  | PHP Web Development course             | pending |          |
| P7.8  | Go Programming course                  | pending |          |
| P7.9  | Kotlin Fundamentals course             | pending |          |
| P7.10 | Tests/content validation               | pending |          |

## Phase 8 — Side-by-side runner UX

| ID   | Description                                                | Status  | Evidence |
| ---- | ---------------------------------------------------------- | ------- | -------- |
| P8.1 | Runner-capability matrix doc                               | pending |          |
| P8.2 | Side-by-side desktop layout component                      | pending |          |
| P8.3 | Mobile Editor/Output tab component                         | pending |          |
| P8.4 | Guided-lab component (expected output / predict / fill-in) | pending |          |
| P8.5 | Apply to existing runners (HTML/JS, Python, SQL, TS)       | pending |          |
| P8.6 | Apply to new guided-lab languages                          | pending |          |
| P8.7 | Tests                                                      | pending |          |

## Phase 9 — Interview questions

| ID   | Description                                                 | Status  | Evidence |
| ---- | ----------------------------------------------------------- | ------- | -------- |
| P9.1 | Question content schema + validator (>=50/course)           | pending |          |
| P9.2 | UI: `/courses/[slug]/interview-questions`                   | pending |          |
| P9.3 | Question content per applicable course (all existing + new) | pending |          |
| P9.4 | Exam-prep "Preparation Questions" variant                   | pending |          |
| P9.5 | Search index/lazy-load integration                          | pending |          |
| P9.6 | Tests                                                       | pending |          |

## Phase 10 — Guided chatbot navigator

| ID    | Description                                   | Status  | Evidence |
| ----- | --------------------------------------------- | ------- | -------- |
| P10.1 | Audit existing chatbot                        | pending |          |
| P10.2 | Deterministic option tree + routing           | pending |          |
| P10.3 | Accessibility (dialog, focus, escape, mobile) | pending |          |
| P10.4 | Tests                                         | pending |          |

## Phase 11 — Footer attribution

| ID    | Description                   | Status  | Evidence |
| ----- | ----------------------------- | ------- | -------- |
| P11.1 | Add developer/CEO attribution | pending |          |
| P11.2 | Tests                         | pending |          |

## Phase 12 — Global audit

| ID    | Description                                      | Status  | Evidence |
| ----- | ------------------------------------------------ | ------- | -------- |
| P12.1 | Stale-phrase sweep                               | pending |          |
| P12.2 | Nav/SEO/metadata/empty/loading/error consistency | pending |          |
| P12.3 | PROJECT_STATUS.md inventory update               | pending |          |

## Phase 13 — Security/privacy review

| ID    | Description                               | Status  | Evidence |
| ----- | ----------------------------------------- | ------- | -------- |
| P13.1 | RLS/isolation tests (local/isolated only) | pending |          |
| P13.2 | Secret/log/PII sweep                      | pending |          |
| P13.3 | CSP updated for Turnstile                 | pending |          |

## Phase 14 — Full verification

| ID    | Description                                | Status  | Evidence |
| ----- | ------------------------------------------ | ------- | -------- |
| P14.1 | Clean npm ci + full command list           | pending |          |
| P14.2 | Deterministic-generation re-run diff check | pending |          |

## Phase 15 — Final audit, local commits, pre-push report

| ID    | Description                       | Status  | Evidence |
| ----- | --------------------------------- | ------- | -------- |
| P15.1 | Requirements/tasks reconciliation | pending |          |
| P15.2 | Diff audit                        | pending |          |
| P15.3 | Local commits (no push)           | pending |          |
| P15.4 | Final report                      | pending |          |

---

## AUDIT NOTES (Phase 1, filled in as audited)

**Auth/signup (`components/auth/auth-form.tsx`)**: single shared form for sign-in/sign-up/reset,
email+password only. **Confirmed real defect**: on any successful `signUp()`/`signInWithPassword()`
call it unconditionally does `router.push("/dashboard")` -- when email confirmation is required,
`signUp()` returns `session: null` with no error, so an unconfirmed signup is sent straight to
`/dashboard` with no session. This is fixed as part of Phase 2 (R2.15/R2.16), not a separate
regression fix, since Phase 2 replaces this flow entirely.

**Session refresh (`middleware.ts`)**: cookie-based via `@supabase/ssr` + `createServerClient`,
touches `supabase.auth.getUser()` on every non-static request to force a refresh. No dedicated
`/auth/callback` route exists today -- `lib/supabase/browser.ts` uses `createBrowserClient` with
default (implicit-friendly) options, so confirmation currently relies on the browser SDK
auto-detecting session tokens in the URL wherever the confirmation link lands, with no explicit
callback route, no "verified!" state, and no `next=`-param return-to-protected-page support. Phase
2 adds a proper `/auth/callback` route (PKCE `code` exchange, the current `@supabase/ssr`-recommended
pattern) to fix this properly instead of continuing to rely on implicit-flow auto-detection.

**Profile (`app/(site)/profile/page.tsx`, `components/profile/profile-form.tsx`)**: page and form
already exist, but only edit local-first `ProgressState.profile` fields (`displayName`,
`learningGoal`, `currentRoadmapId`, `timezone`), synced to the existing `public.profiles` columns
of the same names. No `first_name`/`last_name`/`phone_e164`/`learner_level` exist yet in the type,
the sync layer, or the Supabase schema.

**Supabase `profiles` table / `handle_new_user` (migrations 0001, 0002)**: `id uuid pk references
auth.users`, `display_name text`, `created_at`, `updated_at`; RLS = owner-only select/update/insert
(`auth.uid() = id`), already correct. `handle_new_user()` is `SECURITY DEFINER`, `search_path =
public` (not empty-string), inserts `(id, display_name)` from `new.raw_user_meta_data ->>
'display_name'` with `left(..., 80)` truncation and `on conflict (id) do nothing` (idempotent).
Fully-qualified `public.profiles` already. Migration 0007 (Phase 2) extends this function
additively (new columns + same truncation/idempotency pattern) and tightens `search_path` to `''`
per the brief's explicit request -- see `DECISIONS.md`. **Limitation**: this machine has no Docker,
so `supabase start` (local Postgres) cannot run here -- the trigger change is reviewed very
conservatively (minimal diff against the proven 0002 version) but not execution-tested against a
real Postgres instance in this session. Documented as a real, disclosed gap, not hidden.

**Certificates** (`lib/certificates/eligibility.ts`, `lib/learning/store.ts#issueCertificate`,
`app/(site)/certificates/*`): already audited in depth in prior sessions this conversation --
`getCourseCompletionEligibility`/`getSkillAchievementEligibility` are per-course-only with no
cross-course read; `issueCertificate` snapshots `displayName` into the certificate row once at
issuance and never re-reads it. `CertificatesDashboard` currently lets a **guest** issue a
certificate (stored only in `localStorage`) with whatever free-text `displayName` they typed on
`/profile` -- this is exactly the behavior Phase 4 replaces with an auth gate.

**Chatbot**: no site-wide chatbot exists. The only related component is
`components/ai/tutor-launcher.tsx`, a lesson-scoped, feature-flagged, real-LLM-backed "AI tutor"
(`/api/tutor`). Phase 10's deterministic navigator is a new, separate, global component -- the AI
tutor is untouched.

**Nav/footer** (`lib/site-config.ts`): `navLinks` = Learn/Courses/Projects/Playground/Search;
`footerLinks.product` includes Learn/Categories/Technologies/Roadmaps/Topics/Courses/Projects/
Playground/Tools/Project Studio/Certificates. Phase 5 adds "Study Abroad" to both; Phase 11 adds
a developer/CEO attribution row to the footer.

**Content registry/schema** (`lib/content/types.ts`, `lib/content/registry.ts`): course/lesson/
project/track all Zod-validated, aggregated in `registry.ts`. New courses (Phase 6, 7) and new
content types (Phase 5 country roadmaps, Phase 9 interview questions) follow the same
validated-schema-in-`lib/`, authored-content-in-`content/`, aggregated-in-`registry.ts` pattern
already established for courses/technologies/learning-paths.

**CI/npm**: pinned at npm 10.9.9 via `package.json#packageManager` (this session's own prior fix).
No lockfile regeneration is needed unless a new dependency is added -- if one is, it will be added
via `npx npm@10 install <pkg>` to preserve npm-10 lockfile compatibility, not plain `npm install`.
