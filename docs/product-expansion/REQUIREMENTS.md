# Product Expansion — Requirements & Acceptance Criteria

Source: single large user request, session starting at commit `d065c4a`. Each requirement below
is translated into a measurable, testable acceptance criterion. IDs are referenced from
`TASKS.md`. This file is the durable spec; `TASKS.md` is the durable status tracker.

Do not weaken the independent-course model established in earlier sessions: no requirement below
may introduce a mandatory platform-wide sequential path.

## Phase 0 — Requirements & task system

- R0.1: `docs/product-expansion/{REQUIREMENTS,TASKS,DECISIONS,RELEASE_CONFIGURATION}.md` exist and
  are kept current after every phase.

## Phase 1 — Repository audit

- R1.1: Current behavior of auth, profile, sync, dashboard, certificates, content registry,
  runners, nav, chatbot, search/sitemap, CI is documented in `TASKS.md`'s audit notes before any
  code changes in that area.

## Phase 2 — Signup & onboarding

- R2.1: Signup form collects first name (required), last name (required), email (required),
  phone (optional), password (required), confirm password (required), self-described level
  (required single choice from the 4 listed options), a human-verification challenge, and a
  required Terms/Privacy checkbox.
- R2.2: Name field guidance text is shown verbatim (or materially equivalent) near the name
  fields, and never uses the word "legal name."
- R2.3: Names accept Unicode letters, spaces, hyphens, apostrophes; are trimmed and
  whitespace-normalized; are not restricted to the English alphabet.
- R2.4: Practical max length enforced on name/email/phone fields (documented in code + tests).
- R2.5: Password field has show/hide toggle, a strength hint, and confirm-password matching
  validation, all before submission.
- R2.6: No password, CAPTCHA token, phone number, or auth token is ever passed to
  `console.log`/logging in the signup code path (grep-verified + tested).
- R2.7: Phone is optional; leaving it blank never blocks submission. When provided, it is
  normalized toward E.164 and the form explains it is not used for SMS auth.
- R2.8: Error messaging never reveals whether a specific email is already registered
  (account-enumeration safe).
- R2.9: Field errors are associated via `aria-describedby`/`aria-invalid`; an error summary is
  focus-managed on submit failure.
- R2.10: Learner level is stored for personalization only; no course/lesson/certificate gating
  reads it as an authorization signal (grep + test verified).
- R2.11: CAPTCHA is Cloudflare Turnstile via Supabase Auth's `options.captchaToken`; no
  alternate/parallel CAPTCHA implementation exists.
- R2.12: Turnstile widget resets after a failed submit; the submit button is disabled/guarded
  against double-submit while a request is in flight.
- R2.13: Turnstile expiry and network failure states show clear, accessible messaging.
- R2.14: If `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is unset in a context where CAPTCHA is required for
  production correctness, the form fails closed (blocks submission with an explanit configuration
  message) rather than silently skipping verification -- except in the explicit test/dev profile
  documented in `DECISIONS.md`.
- R2.15: After a successful signup call, the user is shown a dedicated check-your-email state
  (not a toast, not the bare form) with: masked destination email, spam/junk reminder, resend
  button with cooldown, "use a different email," and a link back to sign in.
- R2.16: No authenticated dashboard session exists before email confirmation when confirmation is
  required.
- R2.17: The auth callback route handles expired/invalid/already-used confirmation links with a
  clear, distinct message and recovery action.
- R2.18: On successful confirmation, an explicit "verified" success state is shown, guest progress
  is merged at most once (idempotent), and the user is routed to onboarding/profile confirmation
  or the original protected destination.
- R2.19: A branded HTML+text Supabase confirmation email template exists in the repo with the
  specified subject/content, using only supported Supabase template variables, no tracking
  pixels/external scripts/secrets.
- R2.20: `RELEASE_CONFIGURATION.md` documents custom-SMTP/DNS/sender-name requirements accurately
  -- no code-only claim that the sender name can be changed without SMTP.
- R2.21: A signed-in Profile/Account Settings page allows reviewing/updating first/last name,
  phone, and learner level.
- R2.22: Updating a profile name never mutates an already-issued certificate's stored name
  (snapshot-at-issuance, tested).

## Phase 2 — Supabase profile schema

- R2.23: A new migration `0007_*.sql` (only if genuinely needed) adds profile columns without
  editing `0001`-`0006`.
- R2.24: Profile rows are readable/writable only by their owner (RLS tested).
- R2.25: Phone numbers are never exposed via any public/anon-accessible path, including the
  certificate verification RPC.
- R2.26: `handle_new_user` (if modified) remains `SECURITY DEFINER` with an explicit empty
  `search_path` and fully-qualified object names.
- R2.27: A signup-time trigger failure does not silently block all signups undetected -- covered
  by a local test against an isolated/local Postgres instance, not production.
- R2.28: Cascade delete behavior for the profile table on `auth.users` deletion is preserved.

## Phase 3 — Dashboard guest vs authenticated

- R3.1: A signed-out visit to `/dashboard` shows an auth gate (no fake progress/certificates/stats),
  explains sync/resume/notes/certificate benefits, offers sign-in/create-account actions, and
  preserves the intended destination through auth.
- R3.2: A signed-in visit to `/dashboard` shows only that user's own data; "Continue learning"
  resumes their real recent course; refresh never reverts newer progress; sign-out clears
  in-memory authenticated state so the next signed-out visitor sees the gate, not stale data.

## Phase 4 — Certificates

- R4.1: A guest on a certificate-eligible page sees a sign-in/signup gate explaining that
  progress will be merged and certificates become independently verifiable after
  authentication -- not the old "stored only on this device" framing.
- R4.2: Certificate issuance/download requires an authenticated, email-confirmed session.
- R4.3: Eligibility is recomputed from synchronized server progress after auth, not trusted from
  local/legacy state.
- R4.4: Eligibility UI shows exact fractional progress ("8 of 12 required lessons completed") and
  remaining items.
- R4.5: Course Completion eligibility depends only on the target course's own required lessons;
  Skill Achievement keeps its existing evidence (lessons + practice threshold + project) model,
  limited to its curated allowlist.
- R4.6: A rendered/printable certificate includes: "VS Schools" issuer brand, credential type,
  full first+last name as recorded at issuance, course/skill title, issue date, a unique
  verification code, a high-contrast QR code, the verification URL as visible text, the typed
  signatory line "Naga Malleswararao Boddu — CEO, VS Schools", and an honest non-accreditation
  note.
- R4.7: The QR code encodes only the public verification URL (no PII), is decodable by an
  automated test, and resolves to the correct certificate.
- R4.8: An authenticated certificate owner can download a PDF generated from trusted persisted
  data (not editable client text), with a safe/meaningful filename, matching the on-screen
  presentation, with no service-role key exposed client-side.
- R4.9: Public verification remains unauthenticated, returns only the previously-approved safe
  field set, and duplicate issuance stays blocked.

## Phase 5 — Study Abroad

- R5.1: Primary nav (desktop + mobile) and footer include a "Study Abroad" entry linking to
  `/study-abroad`, styled with the existing design system, clearly distinct from `/courses`.
- R5.2: A validated, schema-driven country content model backs at least 6 country roadmap pages
  (US, Canada, UK, Australia, Germany, Ireland) -- no one-off page components per country.
- R5.3: Each country page distinguishes Bachelor's/Master's/PhD guidance where the process
  differs, without implying one universal process.
- R5.4: Each roadmap covers the 23 listed steps, each with why-it-matters, what-to-do, common
  documents, common mistakes, a checklist, official source links, and typical timing relative to
  intake.
- R5.5: A reusable, adaptable document-checklist component covers the listed common document
  types, each labeled "commonly requested" unless confirmed mandatory for that exact
  country/level.
- R5.6: Every country page shows a real "Last reviewed" date and structured official source URLs;
  a content-freshness validator/report exists.
- R5.7: No hardcoded, undated visa fee/processing-time/bank-balance figures; no
  guaranteed-outcome wording anywhere in this content; an educational-information disclaimer is
  present; VisaSparkSchools is never described as a government/university/legal body.
- R5.8: A VisaSpark callout appears on the directory and every country page, using a centralized
  `NEXT_PUBLIC_VISASPARK_URL`-style config value with a safe non-broken fallback state when
  unset.

## Phase 6 — Exam preparation

- R6.1: Four independently-accessible courses exist: IELTS Preparation, PTE Academic Preparation,
  TOEFL iBT Preparation (correct spelling), GRE General Test Preparation -- each with >= 12
  substantial, non-duplicated lessons covering the listed topic areas.
- R6.2: Each course provides diagnostic practice, lesson-level questions, section practice, timed
  mini tests, >= 1 mixed mini mock, answer review with explanations for objective items, and
  progress tracking consistent with the existing architecture.
- R6.3: Speaking/Writing sections provide structured response input and a self-review rubric;
  the UI explicitly distinguishes objective auto-scoring from self-assessed responses; no claimed
  AI grading or manufactured official score.
- R6.4: All practice questions are original; trademark/independence notices are present; no
  affiliation with IELTS/Pearson/ETS is claimed; earned certificates state completion of the VS
  Schools preparation course only, never an official test outcome.
- R6.5: Content carries source-metadata/last-reviewed fields per the same freshness discipline as
  Study Abroad.

## Phase 7 — Technical course catalog expansion

- R7.1: Catalog audited first; no duplicate of an existing course under a new title.
- R7.2: C, C++, C#/.NET, Angular, AngularJS (labeled legacy-maintenance), PHP, Go, Kotlin each
  added/completed with >= 12 substantial lessons, objectives, examples, knowledge checks,
  exercises, quizzes with explanations, >= 1 capstone/project, optional-only prerequisites,
  direct start action, independent progress/eligibility, search+topic integration, metadata,
  mobile/desktop support, and an interview-questions set (Phase 9).
- R7.3: Angular vs AngularJS categorized correctly as frameworks, not languages; AngularJS
  content explains its legacy-maintenance framing and a modernization path.

## Phase 8 — Side-by-side runner UX

- R8.1: On supported desktop widths, editor/input and output/result render side by side in one
  viewport, with Run/Reset/Copy, pane headings, internal scroll, no page overflow, keyboard
  operability, and screen-reader status announcements.
- R8.2: On mobile/tablet, an accessible Editor/Output tab or segmented control replaces forced
  narrow columns; running code surfaces the result without stealing keyboard focus unexpectedly;
  code is preserved across tab switches.
- R8.3: A runner-capability matrix documents safety properties per language/course type; no new
  unauthenticated arbitrary-code-execution server endpoint; no paid execution API; infinite loops
  are bounded by worker/timeout where applicable.
- R8.4: For languages without a safe local runner, the UI honestly labels "Expected output" (not
  "Your output") and offers reading/prediction/fill-in/guided labs instead of a fake Run button.

## Phase 9 — Interview questions

- R9.1: Every applicable technical/programming/framework/database/testing/automation/cloud/AI
  course has >= 50 unique, validated, non-placeholder Q&A items (schema-checked for duplicate
  IDs/questions).
- R9.2: Exam-prep courses get an analogous "Preparation Questions and Answers" set instead of
  irrelevant job-interview content.
- R9.3: A discoverable, searchable/filterable, accessible UI exists per course
  (`/courses/[slug]/interview-questions` or an equivalent for exam prep), without bundling the
  entire bank into the base course page payload.
- R9.4: An automated validator proves every applicable course meets the minimum item count.

## Phase 10 — Guided chatbot navigator

- R10.1: A deterministic (non-LLM, no external API call) navigator opens with "How can I help
  you?" and the listed option set, each producing one concise response plus a working navigation
  action.
- R10.2: Guest-only options (dashboard/certificates) explain the sign-in requirement instead of
  pretending access; "Continue learning" only reflects real authenticated progress.
- R10.3: No personal data collection, no transcript storage, no simulated human agent, no
  free-text input box.
- R10.4: Back/Start Over exist; no dead-end state; dialog semantics, focus management, Escape,
  and mobile placement meet accessibility requirements.

## Phase 11 — Footer attribution

- R11.1: Footer includes "Developed by Raviteja Vemulapelli" and "CEO: Naga Malleswararao Boddu"
  in a professional secondary section, spelled exactly as given, without implying the developer
  is the CEO, preserving existing legal/nav links, responsive and accessible.

## Phase 12-15 — Audit, security, testing, pre-push stop

- R12.1: A global text/behavior sweep removes the listed stale phrases and confirms consistent
  nav/SEO/metadata/empty/loading/error states across old and new surfaces.
- R12.2: `PROJECT_STATUS.md` gets an exact new content inventory.
- R13.1: The listed security/RLS properties are verified by local tests against isolated/local
  Postgres where relevant; no production Supabase access.
- R14.1: The full verification command list passes from a clean `npm ci` using the pinned npm
  version; deterministic-generation commands are re-run and diffed.
- R15.1: Nothing is pushed; Vercel and live Supabase remain untouched; `TASKS.md` accurately
  reflects final status with no coding item hidden as "future enhancement" -- genuine
  external-owner-only items are the sole exception, listed in `RELEASE_CONFIGURATION.md`.
