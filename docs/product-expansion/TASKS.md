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

| ID    | Description                                                 | Status    | Evidence                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1.1  | Audit auth/signup/session/callback                          | completed | see AUDIT NOTES below                                                                                                                                                                                                                                                                                                                                                                                    |
| P1.2  | Audit profile schema/RLS/trigger                            | completed | see AUDIT NOTES below                                                                                                                                                                                                                                                                                                                                                                                    |
| P1.3  | Audit guest-to-account sync                                 | completed | already audited prior session, this conversation                                                                                                                                                                                                                                                                                                                                                         |
| P1.4  | Audit dashboard/certificate access for guests               | completed | see Phase 3/4 audit notes                                                                                                                                                                                                                                                                                                                                                                                |
| P1.5  | Audit certificate issuance/storage/verification/eligibility | completed | already audited prior session, this conversation                                                                                                                                                                                                                                                                                                                                                         |
| P1.6  | Audit content registry/schemas                              | completed | see AUDIT NOTES below                                                                                                                                                                                                                                                                                                                                                                                    |
| P1.7  | Audit runners/Try It Yourself                               | completed | Found: 4 real runners (HTML/JS iframe, TS compiler+iframe, Python/Pyodide worker, SQL/sql.js worker) each hand-duplicated its own single-column layout (editor stacked above output, whole-page scroll to see results, no mobile tab pattern); no runner-capability decision existed yet for the 8 new Phase 7 languages. Addressed in Phase 8: see `docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md` |
| P1.8  | Audit nav/footer/chatbot                                    | completed | see AUDIT NOTES below                                                                                                                                                                                                                                                                                                                                                                                    |
| P1.9  | Audit search index/sitemap/metadata                         | pending   | to audit at start of Phase 5/9                                                                                                                                                                                                                                                                                                                                                                           |
| P1.10 | Audit CI/npm version/content validators                     | completed | pinned npm 10.9.9, verified this session                                                                                                                                                                                                                                                                                                                                                                 |
| P1.11 | grep sweep for all listed reference terms                   | completed | performed across Phase 1                                                                                                                                                                                                                                                                                                                                                                                 |

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

| ID    | Description                                     | Status    | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----- | ----------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P5.1  | Nav/footer "Study Abroad" entry                 | completed | `lib/site-config.ts`: added to `navLinks` (drives both `PrimaryNav` and `PrimaryNavMobile` -- same source array) and `footerLinks.product`. Verified in a real browser: `tests/e2e/study-abroad.spec.ts` clicks the header nav link end-to-end; `tests/integration/{primary-nav,footer}.test.tsx` cover both render paths                                                                                                              |
| P5.2  | Country content schema + validator              | completed | `lib/study-abroad/types.ts` (zod schema, canonical 23-step `STUDY_ABROAD_STEPS` list, `countryRoadmapSchema` enforcing exactly those 23 step ids in order); `scripts/validate-content.ts` adds a Study Abroad section: official-source domain allow-list, no-guarantee-language sweep, no-authority-claim sweep, no-hardcoded-currency sweep, duplicate-slug check, date-sanity check                                                  |
| P5.3  | Country data: US                                | completed | `content/study-abroad/united-states.ts` -- written directly this session as the reference implementation; 23/23 steps, 3 official sources (DHS/USCIS/State Dept)                                                                                                                                                                                                                                                                       |
| P5.4  | Country data: Canada                            | completed | `content/study-abroad/canada.ts` -- drafted by a background content agent against the schema + US reference + pre-verified `canada.ca` domain, then integrated/verified this session (schema parse, validator, domain allow-list, no-guarantee/no-currency sweeps all pass)                                                                                                                                                            |
| P5.5  | Country data: UK                                | completed | `content/study-abroad/united-kingdom.ts` -- same process, `gov.uk` domain                                                                                                                                                                                                                                                                                                                                                              |
| P5.6  | Country data: Australia                         | completed | `content/study-abroad/australia.ts` -- same process, `homeaffairs.gov.au` / `studyaustralia.gov.au` domains                                                                                                                                                                                                                                                                                                                            |
| P5.7  | Country data: Germany                           | completed | `content/study-abroad/germany.ts` -- same process, `study-in-germany.de` / `auswaertiges-amt.de` domains                                                                                                                                                                                                                                                                                                                               |
| P5.8  | Country data: Ireland                           | completed | `content/study-abroad/ireland.ts` -- same process, `citizensinformation.ie` / `irishimmigration.ie` domains                                                                                                                                                                                                                                                                                                                            |
| P5.9  | `/study-abroad` directory page                  | completed | `app/(site)/study-abroad/page.tsx` -- lists all 6 countries as cards (degree levels, last-reviewed date), fixed disclaimer, VisaSpark callout; statically generated (confirmed via `npm run build`)                                                                                                                                                                                                                                    |
| P5.10 | `/study-abroad/[countrySlug]` page + components | completed | `app/(site)/study-abroad/[countrySlug]/page.tsx` + `components/study-abroad/roadmap-step-list.tsx` (23-step accessible `<details>` accordion with Expand all/Collapse all, why-it-matters/what-to-do/degree-notes/documents/mistakes/checklist/official-source-links per step) + `components/study-abroad/disclaimer.tsx`; unknown slug correctly 404s (`notFound()`, verified in Playwright); all 6 country pages statically generate |
| P5.11 | VisaSpark CTA component + config                | completed | `components/study-abroad/visaspark-callout.tsx`, reusing the `visaSparkUrl`/`NEXT_PUBLIC_VISASPARK_URL` config already added in Phase 2 -- renders a real link when configured, a non-clickable "coming soon" state when not (verified unconfigured in a real Playwright run, since no URL is set in this environment)                                                                                                                 |
| P5.12 | Tests                                           | completed | `tests/unit/study-abroad-schema.test.ts` (7), `tests/integration/{visaspark-callout,roadmap-step-list,study-abroad-disclaimer,primary-nav}.test.tsx` (2+6+2+2), `footer.test.tsx` +1, `tests/e2e/study-abroad.spec.ts` (3, all passing against a real Chromium browser: nav journey + expand a step, VisaSpark coming-soon state, 404 for an unknown country)                                                                          |

## Phase 6 — Exam preparation

| ID   | Description                                      | Status    | Evidence                                                                                                                                                                                                                                                                                                                                                                                   |
| ---- | ------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P6.1 | IELTS course content (>=12 lessons)              | completed | `content/lessons/ielts.ts` -- 12 lessons across 5 modules (Overview & Strategy, Listening, Reading, Writing, Speaking); every Reading/Listening passage/transcript is original; content:validate passes                                                                                                                                                                                    |
| P6.2 | PTE course content (>=12 lessons)                | completed | `content/lessons/pte.ts` -- 12 lessons across 5 modules; drafted by a background content agent against the IELTS reference + schema, integrated and verified this session (content:validate, no-duplicate-question, real pearsonpte.com sources only)                                                                                                                                      |
| P6.3 | TOEFL iBT course content (>=12 lessons)          | completed | `content/lessons/toefl.ts` -- 12 lessons across 5 modules; the agent independently verified via WebFetch that ETS changed Speaking/Writing task _types_ (not just scoring) on Jan 21 2026, and wrote the course around the real current tasks (Listen and Repeat/Take an Interview; Build a Sentence/Write an Email/Write for an Academic Discussion) rather than the outdated ones        |
| P6.4 | GRE course content (>=12 lessons)                | completed | `content/lessons/gre.ts` -- 12 lessons across 4 modules; `speakingTasks: []` since the GRE has no speaking section (never fabricated); no "Analyze an Argument" task (correctly removed from the current test)                                                                                                                                                                             |
| P6.5 | Practice/mock-test experience (shared component) | completed | Reuses the existing `PracticeSession`/`scorePracticeSession` engine (untimed/timed/retry-incorrect/topic-breakdown/progress-persistence) rather than a parallel system -- `lib/exam-prep/diagnostic.ts` (section/diagnostic pooling) + `components/exam-prep/exam-practice-hub.tsx` (diagnostic + per-section tiles + link to the existing timed `/practice` route as the mixed mock test) |
| P6.6 | Speaking/writing self-review rubric UI           | completed | `components/exam-prep/writing-practice.tsx` and `speaking-practice.tsx` (local-only MediaRecorder with honest feature-detected fallback, rubric checklists); neither claims automated/AI scoring                                                                                                                                                                                           |
| P6.7 | Trademark/independence notices                   | completed | `components/exam-prep/trademark-notice.tsx`, fixed non-authorable text naming the real administering body per exam; validator bans false-scoring-claim phrases                                                                                                                                                                                                                             |
| P6.8 | Tests                                            | completed | `tests/unit/exam-prep-diagnostic.test.ts` + 5 integration test files (30 tests) + `tests/e2e/exam-practice.spec.ts` (11 tests, real Chromium run, all passing) covering all 4 exam courses end-to-end, including the GRE's correctly-hidden Speaking tab; full vitest suite (742 tests) and a production build (`npm run build`) both pass with all 4 courses wired in                     |

## Phase 7 — Technical course catalog expansion

| ID    | Description                            | Status      | Evidence                                                                                                                                                                                                                                                                                                                      |
| ----- | -------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P7.1  | Catalog audit for duplicates           | completed   | Audited both content systems: none of the 8 languages has a full course today; all 8 already have short technology-directory reference guides (no `courseId` set) -- the established repo pattern (confirmed via Python/Java/JS/TS) is exactly "directory guide + separate full course," so adding these 8 is not duplication |
| P7.2  | C Programming course                   | completed   | `content/lessons/c.ts` (12 lessons, 4 modules) + `c-contact-book` capstone; drafted by a background content agent (see note below), integrated and verified this session                                                                                                                                                      |
| P7.3  | C++ Programming course                 | completed   | `content/lessons/cpp.ts` (12 lessons, 4 modules) + `cpp-library-catalog` capstone; same agent/session process as C                                                                                                                                                                                                            |
| P7.4  | C#/.NET Fundamentals course            | completed   | `content/lessons/csharp.ts` (12 lessons, 4 modules) + `csharp-task-console-app` capstone; `relatedTechnologySlugs` links both the `csharp` and `dotnet` directory entries back via `courseId`                                                                                                                                 |
| P7.5  | Angular Application Development course | pending     | Not started -- the background agent assigned to this failed before writing any content (see note below)                                                                                                                                                                                                                       |
| P7.6  | AngularJS Legacy Maintenance course    | pending     | Not started -- same failed agent as Angular                                                                                                                                                                                                                                                                                   |
| P7.7  | PHP Web Development course             | completed   | `content/lessons/php.ts` (12 lessons, 4 modules) + `php-blog-crud-backend` capstone; one real bug found and fixed during integration (an unescaped backtick inside a template literal broke parsing past that point in the file -- content itself was intact once fixed)                                                      |
| P7.8  | Go Programming course                  | completed   | `content/lessons/go.ts` (12 lessons, 4 modules) + `go-cli-task-tracker` capstone; every lesson uses a `guidedOutputLab` (predict/fill-in-blank/guided-editing) since Go has no safe in-browser execution; `courseId` linked back from the `go` technology-directory entry; content:validate + real Chromium e2e both pass     |
| P7.9  | Kotlin Fundamentals course             | completed   | `content/lessons/kotlin.ts` (12 lessons, 4 modules) + `kotlin-note-taking-app` capstone; written directly (no agent) after the background-agent spend limit was hit; `courseId` linked back from the `kotlin` directory entry                                                                                                 |
| P7.10 | Tests/content validation               | in progress | Go/C/C++/C#/PHP/Kotlin all pass content:validate, full vitest suite (756 tests), and real-Chromium e2e (`tests/e2e/phase7-courses.spec.ts`, 5/5 courses); only Angular/AngularJS still needed                                                                                                                                 |

**Note on P7.2-P7.9**: four background content agents were launched in parallel for the 7 remaining languages (grouped C+C++, C#, Angular+AngularJS, PHP+Kotlin). All four hit the account's monthly API spend limit mid-task. Three had already written complete, valid lesson files before failing (during their own post-write verification/cleanup steps) -- C, C++, C#, and PHP were recovered, verified independently (schema validation, typecheck, content:validate, a real Playwright run), one real bug was found and fixed (an unescaped backtick in `php.ts`, see P7.7), and then integrated into `content/courses.ts`/`content/tracks.ts`/the registries by the main session. The Angular+AngularJS agent failed before writing anything, and the PHP+Kotlin agent failed before reaching Kotlin. Confirmed that only the Agent (subagent) tool is affected by the spend limit -- direct tool use in the main session is unaffected -- so Kotlin was written directly by the main session instead of retrying delegation. Angular and AngularJS remain pending, to be written directly as well.

## Phase 8 — Side-by-side runner UX

| ID   | Description                                                | Status                                                | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---- | ---------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P8.1 | Runner-capability matrix doc                               | completed                                             | `docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md` — full table of all 4 live-runner languages plus the 8 guided-lab languages, with mechanism + rationale per row; formalizes DECISIONS.md's table                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| P8.2 | Side-by-side desktop layout component                      | completed                                             | `components/runners/split-runner-layout.tsx` — `grid sm:grid-cols-2`, both panes always mounted, output pane independently scrollable (`sm:max-h-[32rem] sm:overflow-y-auto`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| P8.3 | Mobile Editor/Output tab component                         | completed                                             | Same file — `role="tablist"`/`tab`/`tabpanel` pair, CSS-only (`hidden`/`sm:block`) visibility toggling so neither pane ever unmounts; controlled `activeMobileTab` prop so a runner's `run()` can switch to Output without a `.focus()` call                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| P8.4 | Guided-lab component (expected output / predict / fill-in) | completed                                             | `components/runners/guided-output-panel.tsx` + `guidedOutputLabSchema`/`GuidedOutputLab` in `lib/content/types.ts` (optional additive `lessonSchema.guidedOutputLab` field, mirrors `guidedLocalLab`); 3 modes (predict / fill-in-blank / guided-editing), fixed "Not executed" banner, output always labeled "Expected output", never a Run button; validator block added to `scripts/validate-content.ts` (id uniqueness, fill-in-blank blank/placeholder consistency, banned false-execution phrases including "your output") for Phase 7 content to consume                                                                                                                                                                                                                               |
| P8.5 | Apply to existing runners (HTML/JS, Python, SQL, TS)       | completed                                             | `components/runners/{html-js,python,sql,typescript}-runner.tsx` all rewritten onto `SplitRunnerLayout`; execution logic (message listener, workers, timeouts, `buildRunnerDoc`, lazy TS-compiler import) left untouched — only JSX layout changed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| P8.6 | Apply to new guided-lab languages                          | completed (infrastructure); course content is Phase 7 | `GuidedOutputPanel` + schema/validator are ready for Phase 7 to author real C/C++/C#/Angular/AngularJS/PHP/Go/Kotlin lesson content against; no guided-lab lesson content exists yet since those courses don't exist until Phase 7 — tracked there, not hidden as done here                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| P8.7 | Tests                                                      | completed                                             | `tests/integration/split-runner-layout.test.tsx` (5 tests: both panes present, 2 accessible tabs, tab switch preserves editor content, tab switch doesn't move focus, controlled prop lets a parent switch tabs) and `tests/integration/guided-output-panel.test.tsx` (8 tests: no Run button/no "your output" in any mode, fixed banner, predict reveal flow, prediction field never graded, fill-in-blank reveal flow, guided-editing shows output without a reveal click, step navigation, progressive hints) — both 100% passing. Real-browser proof via Playwright (`tests/e2e/{runners,python-runner,typescript-runner}.spec.ts`, chromium + mobile-chromium, 14/14 passing) that Run auto-switches to the Output tab on a genuine mobile viewport and desktop side-by-side still works |

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

| ID    | Description                                   | Status    | Evidence                                                                                                                                                                                                     |
| ----- | --------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P10.1 | Audit existing chatbot                        | completed | no site-wide chatbot existed; the only related component is the lesson-scoped, LLM-backed, opt-in AI tutor (`components/ai/tutor-launcher.tsx`), left untouched -- this is a new, separate, global component |
| P10.2 | Deterministic option tree + routing           | completed | `lib/help/options.ts` (pure, no React, no external API), `components/help/help-navigator.tsx`                                                                                                                |
| P10.3 | Accessibility (dialog, focus, escape, mobile) | completed | reuses `useModalA11y` (the same hook already used by mobile nav/course-nav/tech-filter/AI tutor)                                                                                                             |
| P10.4 | Tests                                         | completed | `tests/unit/help-options.test.ts` (25), `tests/integration/help-navigator.test.tsx` (8)                                                                                                                      |

**Note**: two options (`exam-prep` -> `/exam-preparation`, `study-abroad` -> `/study-abroad`) point
at routes this phase itself doesn't build -- see Phases 5 and 6, planned later in this same
session. If either phase doesn't ship, update these two routes before considering this phase
release-ready (do not ship a dead link).

## Phase 11 — Footer attribution

| ID    | Description                   | Status    | Evidence                                         |
| ----- | ----------------------------- | --------- | ------------------------------------------------ |
| P11.1 | Add developer/CEO attribution | completed | `components/layout/footer.tsx`                   |
| P11.2 | Tests                         | completed | `tests/integration/footer.test.tsx`, 3/3 passing |

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
