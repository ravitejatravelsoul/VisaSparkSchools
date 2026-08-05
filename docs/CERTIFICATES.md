# Certificates (Phase 9)

VisaSparkSchools issues two kinds of certificate, both gated on genuine, already-existing
progress data -- never a stored flag that can drift from reality, and never awarded just for
visiting a page.

## What a certificate is, and is not

Every certificate says exactly "**VisaSparkSchools Certificate of Completion**" or
"**VisaSparkSchools Skill Achievement**," and carries a fixed disclaimer: it is a
platform-issued learning record, **not** an accredited degree, a professional certification, a
license, or the result of an independently proctored or invigilated exam. This wording is fixed
in `components/certificates/certificate-presentation.tsx` and is not something a specific
course/skill can override.

## Certificate types and eligibility

Both types are evaluated by `lib/certificates/eligibility.ts`, reusing existing derived-completion
logic (`isCourseComplete`/`isProjectComplete` from `lib/learning/completion.ts`) rather than any
new completion concept.

### Course Completion

Eligible for **every course** once every one of its required lessons is genuinely completed.
Nothing else is required -- this type intentionally has the lowest bar, matching what "completion"
already means everywhere else in this codebase.

### Skill Achievement

Eligible **only** for a small, hand-curated allowlist of courses
(`SKILL_ACHIEVEMENT_COURSES` in `lib/certificates/eligibility.ts`) that have a genuine,
unambiguous 1:1 mapped capstone/guided project. All three signals must be true:

1. Every required lesson in the course is completed.
2. The course's practice session (Phase 6, available on every course) has a best score of at
   least 70% (`SKILL_PRACTICE_THRESHOLD`).
3. The mapped project's milestone checklist is fully completed.

**16 of 21 courses** are enabled: html-css-fundamentals, javascript-fundamentals,
python-fundamentals, typescript-foundations, react-application-development,
nodejs-express-backend-development, java-programming-foundations, data-structures-and-algorithms,
database-design-and-postgresql, playwright-web-automation, selenium-webdriver-automation,
linux-shell-fundamentals, test-automation-framework-engineering, quantitative-aptitude,
logical-analytical-reasoning, career-and-gd-preparation.

**5 courses are deliberately excluded**, not guessed at:

- `how-computing-works` -- no project maps to the "foundations" track at all.
- `ai-foundations` -- two capstones (`document-qa-rag-capstone`, `ai-support-agent-capstone`)
  share the "ai-llm-rag" track with no single unambiguous "the" capstone, and both genuinely
  depend on generation quality this platform cannot itself verify.
- `git-apis-sql` -- three projects reference the "git-api-sql" track; ambiguous.
- `software-testing-foundations` / `api-testing-and-automation` -- both share the
  "software-testing" track with two projects; ambiguous which course each belongs to.

`tests/unit/certificate-eligibility.test.ts` verifies every entry in the allowlist
programmatically (real course, real project, genuine track correspondence, no project reused
across two courses) rather than trusting the hand-authored list on faith.

## Issuance: deterministic and idempotent

A certificate's id is always `${type}:${targetId}` (e.g. `course-completion:python-fundamentals`).
`useProgressStore().issueCertificate(type, targetId)`:

- Returns the existing id, unchanged, if that id already exists -- refresh, a second tab, or
  calling it again after the same requirements still hold can never create a duplicate or alter
  the original record.
- Otherwise re-checks eligibility live and only writes a new record if genuinely eligible.

Every descriptive field on a `CertificateState` (`targetTitle`, `displayName`, `criteriaSnapshot`,
`contentVersionRef`) is a **snapshot taken at issuance**, never re-read live -- a later course
rename, requirement change, or profile display-name edit cannot silently alter an
already-issued certificate. `displayName` falls back to "VisaSparkSchools Learner" if the learner
never set one.

## Storage and sync

`ProgressState` version 5 -> 6 (`lib/learning/storage.ts`), adding `certificates: Record<string,
CertificateState>`. Migration branches exist for v3/v4/v5 -> v6, all defaulting `certificates` to
`{}` and preserving every other field untouched (`tests/unit/storage-migration.test.ts`).

`mergeProgress`'s `mergeCertificates` unions by id; if the _same_ id was independently issued on
two devices before they ever synced (each with a different random `verificationCode`), the merge
deterministically keeps whichever has the earlier `issuedAt` -- never both, never a coin-flip, and
stable under repeated merges (`tests/unit/progress-merge.test.ts`).

Supabase migration `0005_phase9_certificates.sql` (reviewed, **not applied to any live
project** -- same as every prior migration) adds a `certificates` table, owner-only RLS
(select/insert/delete; deliberately no update policy -- see "immutability" above), a unique
`(user_id, cert_id)` constraint backing the app-level idempotency check, and a column-restricted
`certificates_public` view (only `cert_type`/`target_title`/`display_name`/`issued_at`/
`criteria_snapshot`/`content_version_ref`/`verification_code` -- never `user_id`/`id`/`cert_id`)
granted to `anon` for public verification lookups.

## Guest vs. synced, and public verification

A guest (or any deployment without Supabase configured) sees an explicit disclosure that their
certificate is stored only in this browser and is **not independently verifiable**
(`components/certificates/certificate-presentation.tsx`). Once signed in with Supabase enabled,
the same certificate page shows a `/certificates/verify/[code]` link using a random,
non-enumerable `verificationCode` (never derived from user id, course slug, or cert id).

`/certificates/verify/[code]` (`app/(site)/certificates/verify/[code]/page.tsx`) is a real, working
route -- never a fabricated URL. If Supabase isn't configured it says so honestly ("Verification
isn't available") rather than faking a result either way. If configured, it queries
`certificates_public` with the anon-key server client and shows only the safe fields, or an honest
"No certificate found" if the code doesn't match anything.

**Not execution-tested against a live database** -- same outstanding item as every other Supabase
table in this codebase (see PROJECT_STATUS.md's "Known limitations"). The RLS policies and the
`certificates_public` view's column-restriction have been reviewed but not run against a real
Postgres/Supabase instance.

`/certificates`, `/certificates/[type]/[targetId]`, and `/certificates/verify/[code]` are all
excluded from the sitemap and disallowed in `robots.txt` (personalized/privacy-sensitive, matching
the precedent already set for `/dashboard`, `/profile`, and `/study-studio`).

## What certificates deliberately do not do

- No PDF generation library -- "Print / Save as PDF" uses the browser's own print dialog against a
  print-styled certificate layout (`print:` Tailwind variants; site header/footer are hidden via
  `app/(site)/layout.tsx`'s `print:hidden` wrapper).
- No new completion/eligibility concept -- every signal is read from existing
  `lessonStatus`/`practiceAttempts`/`projectProgress` state.
- No certificate is ever awarded automatically; `issueCertificate` only ever runs from an explicit
  learner click on "Issue certificate."
- Final assessments remain untouched and disabled everywhere -- this phase never touched
  `certificateEligible`/`finalAssessmentRequired` on any learning-path record.
