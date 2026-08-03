# VisaSparkSchools — Product Requirements Document (Public Beta)

## 1. Product vision

> Learn. Build. Prove.

VisaSparkSchools is a self-paced learning and practice platform for programming, AI, data, cloud,
and career-ready skills. Its original curriculum combines short lessons, editable/runnable code
examples, deterministic exercises, quizzes, and transparent progress tracking, culminating in a
cited, retrieval-augmented AI application capstone. As of Phase 3, it also includes a technology
directory spanning ~80 technologies across 13 public categories, so learners can find a useful
guide for a technology even before (or instead of) a full course exists for it — see section 9.
The design is original and does not copy the branding, wording, or visual design of any existing
tutorial site.

## 2. Target users

Adult beginners, college students, job seekers, working professionals, and developers moving into
AI engineering. Not designed for children; no school-age social features, ads, payments, or
certificates in this release.

## 3. Definition of "complete" for this beta

A fresh visitor can, with zero configuration:

1. Understand the product from the homepage.
2. Explore learning paths and the course catalog.
3. Open and complete lessons.
4. Edit and execute HTML/CSS/JS, Python, and SQL safely in the browser.
5. Complete exercises (guided + independent) and quizzes with deterministic, hint-scaffolded
   feedback.
6. Track progress as a guest (localStorage) with mastery scoring and a spaced-review schedule.
7. Search lessons/courses/projects without any AI dependency.
8. Bookmark lessons and take private notes.
9. See due spaced-review items on a dashboard.
10. Use the platform on mobile (375px), tablet (768px), and desktop (1440px).
11. Complete guided projects and two capstones spanning every track.
12. Browse technologies by category, filter/search the technology directory, and read a genuine
    guide for any of ~80 technologies — honestly labeled as guide-only, course-available, or
    runner-available, never overclaiming.
13. Follow a public learning roadmap's ordered steps toward a stated outcome, tracking real
    progress on it (see section 10).
14. Enroll in a course, resume where they left off, and see real, derived completion percentages
    for courses, projects, and roadmaps — never a stored flag that could disagree with the
    underlying lessons/milestones.
15. See a dashboard built only from sections backed by real, working systems: continue-learning
    recommendation, enrolled courses, current roadmap, due reviews, recent activity, bookmarks,
    notes, and a non-punitive daily goal — no placeholder cards for features that don't exist yet.

With Supabase configured, a visitor can additionally create an account, sign in, and have their
guest progress merged into that account automatically, then kept in sync going forward (see
section 10 and `docs/ARCHITECTURE.md`). Signing out never leaves that account's data visible to a
guest or a different account signing in afterward. Without Supabase configured, every one of the
above still works exactly the same way, entirely on localStorage. With AI credentials configured, a
visitor can additionally use a grounded, cited tutor. All of this remains fully optional; the
absence of any of it never breaks the core product.

## 4. In scope (this beta)

Public learning platform; the full six-track curriculum; a technology directory (categories,
technology guides, learning roadmaps — see section 9); course enrollment, roadmap/project progress
tracking, and guest-to-account sync (see section 10); guest progress; optional accounts;
interactive runners (HTML/CSS/JS, Python, SQL); local search (extended to cover technologies,
categories, and roadmaps); quizzes/exercises; mastery and spaced review; optional grounded tutor;
accessibility (WCAG 2.2 AA target); security hardening; SEO; automated tests; documentation;
deployment preparation.

## 5. Explicitly out of scope (this beta)

Payments/subscriptions, advertising, public forums/DMs, an instructor marketplace, live video,
native mobile apps, unrestricted file uploads, server-side arbitrary code execution,
multi-tenant school dashboards, certificates (a certificate _system_ — see section 9 for the
honest-completion-certificate architecture planned for Phase 8), quantitative aptitude/reasoning/
group-discussion practice content (registered in the category taxonomy but intentionally kept
internal/non-public until Phase 5 builds real content for them), course reviews (deferred until a
full moderation/abuse/ownership model ships), Study Studio, a multi-file Project Studio, a broader
Tools Lab, deep-learning-based personalization, automatic publication of AI-generated content, and
production deployment (nothing in this beta was deployed, and no cloud resources were
provisioned).

## 9. Technology directory, categories, and learning roadmaps (Phase 3)

Added in Phase 3, on top of the original six-track curriculum (which is unchanged):

- **Categories** (`lib/directory/categories.ts`): a 16-item canonical taxonomy. 13 are public
  today (Foundations, Frontend, Backend, Programming Languages, Mobile, Databases, Data Science
  and Analytics, Artificial Intelligence, Cloud and DevOps, Cybersecurity, Software Testing and
  QA, Data Structures and Algorithms, Developer Tools); Quantitative Aptitude, Logical/Verbal
  Reasoning, and Career/GD Prep are registered but kept non-public until Phase 5 builds real
  content for them.
- **Technology guides** (`lib/directory/data/`): ~80 technologies, each a genuine guide (what it
  is, why it's used, where it fits, core concepts, an original example, use cases, project ideas,
  official references) — not a thin placeholder page, and explicitly not the same thing as a full
  course. A centralized availability policy (`lib/directory/availability.ts`) is the single source
  of truth for whether a guide may show a "Start course" or "Open playground" action; both require
  a real, resolvable reference to the existing course/runner system, enforced by
  `npm run content:validate`.
- **Learning roadmaps** (`lib/directory/learning-paths.ts`): 15 public, ordered sequences of real
  guides/courses/projects toward a goal (e.g. "Frontend Developer," "AI and Generative AI
  Engineer"), explicitly labeled as roadmaps, not certifiable assessed course paths — no path may
  claim certificate eligibility or a required final assessment, since neither system exists yet.
  One path (Placement and Job Readiness) is kept internal since it depends entirely on the not-yet-
  built Aptitude/Reasoning/GD content.

See `docs/CONTENT_AUTHORING.md` for exactly how to extend any of this safely, and
`docs/ARCHITECTURE.md` for how it's implemented.

## 10. Learning and account foundation (Phase 4)

Added on top of Phases 1-3, without duplicating any existing state:

- **Enrollment**: visiting any lesson in a course idempotently enrolls the learner in it (no
  separate "enroll" click required, though the course overview page's primary action does it
  explicitly too); the dashboard's "Your courses" section and a course's overview page both show a
  real, derived completion percentage.
- **Roadmap tracking**: a learner can start a public roadmap and mark it their "current" one (used
  by the dashboard's next-lesson recommendation). Each step's completion is either derived from
  real data (`course`/`project` steps) or self-reported (`technology-guide`/`practice` steps, which
  have no other signal) — never a stored flag for a step type that could be computed.
- **Project progress**: a project's milestone checklist is interactive; project completion is
  derived from which milestones are checked, the same way course completion is derived from
  lessons.
- **Guest-to-account sync**: signing in merges a guest's local progress into their account
  (union/max/latest-wins per field, versioned notes so neither side's writing is silently
  discarded) and pushes the merged result to Supabase once for that sign-in, and again on a manual
  retry if it failed -- not a continuous background sync; local changes made afterward are cached
  locally and pushed the next time a sync runs. Signing out — or a different account signing in on
  the same device — never surfaces another account's data; see `docs/ARCHITECTURE.md`'s "Learning
  engine and account sync" section and `docs/SECURITY.md` for exactly how.
- **Dashboard and profile**: the dashboard only ever renders sections backed by real, working
  systems (continue-learning recommendation, enrolled courses, current roadmap, due reviews,
  recent activity, bookmarks, notes, non-punitive daily goal, and — when signed in — a sync status
  indicator with a retry action). A `/profile` page holds display name, learning goal, current
  roadmap, and timezone preferences; the light/dark theme toggle already existed and isn't
  duplicated here.
- **Deferred**: course reviews (needs a moderation/abuse/ownership model this phase doesn't build);
  per-exercise saved-code sync to Supabase (stays a local-only convenience feature — no requirement
  identified for it beyond that, and promoting it would need its own migration and merge rule).

## 6. Curriculum shape

Thirteen tracks: Digital & Coding Foundations → HTML & CSS → JavaScript → TypeScript → React →
Node.js & Express → Java → Data Structures & Algorithms → Python → Git, APIs & SQL → Database
Design & PostgreSQL → AI, LLMs, RAG & Agents → Software Testing & QA (Java, Data Structures &
Algorithms, Python, Database Design & PostgreSQL, and Software Testing & QA are independent
branches with their own specific prerequisites, not strictly sequential links in the
web-development chain). See [`CURRICULUM.md`](./CURRICULUM.md) for the full lesson-by-lesson
matrix, the complete-course definition, the 13-track long-term curriculum architecture, and the
full guide-to-course coverage matrix across all 80 technology guides.

## 11. Phase 5A — interactive curriculum foundation

Added on top of Phases 1-4.5: a course-authoring schema extension (`audience`, `learningOutcomes`,
`prerequisiteCourseSlugs`, `nextCourseSlugs`, `relatedTechnologySlugs`, ordered `modules`), a real
lazy-loaded TypeScript compiler runner reusing the existing HTML/JS sandbox (see
`docs/ARCHITECTURE.md`), one new complete course (TypeScript Foundations), and an automated
snippet-validation tool (`scripts/validate-snippets.ts`) that runs every exercise's reference
solution against its real runtime before content ships. A course now requires 4+ modules, 12+
lessons, 3+ learning outcomes, and a guided project to be considered complete and eligible for the
public catalog — enforced by `scripts/validate-content.ts`, with a narrow, documented exemption
for 5 pre-existing courses that predate this bar. See `PROJECT_STATUS.md`'s "Phase 5A" section for
the full report, including which of the originally-scoped courses could not be built this batch
(and why) and remain a documented Phase 5B/5C plan rather than a public claim.

## 12. Phase 5A.2 — application development and testing core (complete)

Added a **guided local lab** activity type for lessons whose real work can't execute in a browser
(React, Node, Express, and later Java, PostgreSQL, Playwright, Selenium) — static, read-only
instructional content (setup steps, starter files, verification commands, a reference solution),
never a fake Run button, never implying the site executed anything, additive to a lesson's
existing browser-executable exercises rather than a replacement. Added four new complete courses:
Software Testing Foundations and API Testing and Automation (reusing the existing HTML/JS runner
with no new execution surface), and React Application Development and Node.js and Express Backend
Development (using the new guided-local-lab type for their hands-on component/server work, with
every browser exercise still genuine runnable JS/TS modeling the real underlying mechanism — no
React or Node runtime was added to the browser sandbox). All four courses, two new tracks (React,
Node.js & Express), and reciprocal prerequisite/next-course links are live in the public catalog,
search, and navigation. See `PROJECT_STATUS.md`'s "Phase 5A.2" section for the full report.

## 13. Phase 5B — programming, algorithms, and database engineering (complete)

Added three new complete courses, pushing the public catalog to 14 courses across 13 tracks. Java
Programming Foundations and Database Design and PostgreSQL both use the guided-local-lab type for
their real compile/run and real-database work (three labs each), with every browser exercise still
genuine, runnable JavaScript/TypeScript modeling the underlying mechanism — no JVM and no
PostgreSQL server were added to the site. Data Structures and Algorithms needs no guided local labs
at all, since every data structure and algorithm in that course is equally real when implemented in
browser-executable JavaScript/TypeScript. Three PostgreSQL lessons (joins/aggregation,
subqueries/CTEs, window functions) use the real, existing browser SQL runner — which is SQLite, not
PostgreSQL — specifically because that subset of syntax is genuinely dialect-compatible; every
lesson using it discloses this honestly, and every genuinely PostgreSQL-specific lesson (data
types, transactions, indexes/EXPLAIN, roles, migrations) uses JS/TS-modeling exercises and static,
non-executed reference DDL instead of silently running PostgreSQL-flavored SQL against SQLite. See
`PROJECT_STATUS.md`'s "Phase 5B" section for the full report.

## 7. Learning engine (transparent, not a black box)

Mastery per skill tag is a documented point formula (lesson completion, guided/independent
exercise success, quiz accuracy, hint-use penalty), not a machine-learned model with no data to
learn from. Spaced review uses fixed intervals (1/3/7/14/30 days), resetting to the first
interval on a missed review without erasing completion or mastery. See
`lib/learning/mastery.ts` and `lib/learning/review-schedule.ts`. Course/project/roadmap-step
completion is likewise always derived from real underlying data, never an independently-settable
flag (`lib/learning/completion.ts`); the dashboard's next-lesson recommendation is a documented,
ordered priority function, not a model (`lib/learning/recommendation.ts`).

## 8. Acceptance criteria (see also PROJECT_STATUS.md)

Production build succeeds; typecheck/lint succeed; content validation succeeds; unit/integration
tests succeed; critical Playwright end-to-end paths succeed (including an accessibility sweep);
no known broken navigation; no placeholder content in launch routes; guest progress survives a
refresh; code runners function safely and deterministically; mobile navigation works; light/dark
themes are readable and pass automated contrast checks; search works without AI; the AI-disabled
tutor state is honest; Supabase migrations and RLS policies exist (not deployed); no secrets are
present in the repository; enrollment/roadmap/project progress survive a refresh as a guest; the
guest-to-account sync lifecycle is unit-tested including stale-response and multi-account-privacy
scenarios (mocked Supabase client, since no live project is provisioned); signing out never
surfaces a previous account's data.
