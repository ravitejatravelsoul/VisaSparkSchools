# Architecture

## Overview

VisaSparkSchools is a Next.js 16 App Router application. Course content is version-controlled TypeScript
(not a database), validated by a Zod schema at build time. Learning progress (lessons, exercises,
quizzes, bookmarks, notes, enrollments, roadmap/project progress, activity, preferences) lives
client-side (localStorage) as the source of truth for guests; signed-in learners get the same
local-first behavior plus a Supabase-backed sync layer that folds guest progress into their
account and pushes the merged result to Postgres once per sign-in (and again on a manual retry
after a failure) -- not continuously in real time on every mutation; see "Learning engine and
account sync" below for exactly when a push happens. Code execution (HTML/CSS/JS, Python, SQL)
happens entirely in the learner's browser — a sandboxed iframe and two Web Workers — never on the
server, so there is no server-side arbitrary code execution surface.

```
Browser
├─ Next.js app (Server Components for content/SEO, Client Components for interactivity)
├─ Sandboxed <iframe srcdoc> — HTML/CSS/JS runner (no allow-same-origin)
├─ Web Worker — Pyodide (Python), lazy-loaded from CDN
├─ Web Worker — sql.js (SQLite/WASM), self-hosted in /public/wasm
├─ Zustand progress store <-> localStorage (guest key, or a per-account cache key once signed in)
└─ AuthProvider — listens for Supabase auth events, runs the guest-to-account sync lifecycle

Server (Next.js route handlers)
├─ /api/tutor — optional AI tutor: keyword retrieval over lesson content -> chat completion
└─ /api/feedback — contact form -> Supabase (if configured) or server log (demo mode)

Supabase (optional, not provisioned in this beta)
├─ Auth (email/password) — wired up and functional when configured
└─ Postgres: per-user progress/enrollment/roadmap/activity/preference tables, all with Row Level
   Security — read/written by the browser client directly (lib/sync/pull.ts, lib/sync/push.ts),
   never a service-role key
```

## Folder layout

```
app/                      Routes (App Router), grouped under (site) for the shared header/footer
components/
  ui/                      Design-system primitives (Button, Card, Badge, Container, Alert,
                           EmptyState, PageHeader/SectionHeader, Skeleton, ProgressBar, StepMarker,
                           Breadcrumbs, icons.tsx — see docs/DESIGN_SYSTEM.md)
  layout/                  Header, footer, theme provider/toggle, mobile nav, skip link
  lesson/                  Lesson-reader building blocks (markdown, exercise panel, quiz, course nav,
                           bookmarks, notes, completion actions)
  runners/                 Code editor + the three runner UIs (HTML/JS, Python, SQL)
  ai/                      Tutor launcher (client)
  auth/                    AuthForm, AuthProvider (sync lifecycle), AccountNav (sign in/out)
  course/                  CourseProgressActions (enroll/resume/derived completion)
  roadmap/                 RoadmapStartControls, RoadmapStepList (derived + self-reported steps)
  project/                 ProjectMilestoneChecklist (derived project completion)
  profile/                 ProfileForm (display name, learning goal, current roadmap, timezone)
  contact/, dashboard/, playground/, search/, seo/
content/
  tracks.ts, courses.ts, projects.ts, lessons/*.ts   Authored course content (typed, validated)
  fixtures/sql-seed.ts     Shared SQL dataset used by every SQL lesson/exercise
lib/
  content/                 Zod schema (types.ts) + registry (aggregation/query helpers)
  directory/               Phase 3 technology directory: types, categories.ts, data/*.ts (~80
                           technologies by category), learning-paths.ts, registry.ts, validate.ts,
                           availability.ts (see "Technology directory" below)
  learning/                ProgressState (types.ts), store.ts (Zustand actions), storage.ts
                           (localStorage persistence + mergeProgress), completion.ts (derived
                           course/project/roadmap-step completion), recommendation.ts (next-lesson
                           priority function), daily-goal.ts, mastery.ts, review-schedule.ts
  sync/                    pull.ts/push.ts (Supabase <-> ProgressState), lifecycle.ts
                           (syncGuestToAccount), sync-status-store.ts (see "Learning engine and
                           account sync" below)
  auth/                    session-store.ts (signed-in user id/email for UI, not persisted)
  runners/                 Runner doc-builder (HTML/JS) and the two Web Worker scripts
  ai/                      Provider abstraction, chunking, retrieval, prompt building, safety, quota
  supabase/                Browser/server client factories + hand-maintained typed schema
  search/                  Search document type shared by the index-builder script and the UI
  ui/                      category-accent.ts/track-accent.ts (id -> accent hue maps), difficulty.ts
                           (difficulty -> badge tone) — presentation-only helpers, no business logic
  hooks/                   use-modal-a11y.ts (shared focus-trap/restore dialog behavior)
  site-config.ts           Single source of truth for branding, nav, and feature flags
supabase/migrations/       SQL migrations (schema + RLS), never applied to a live project by this build
scripts/                   content:validate, content:search-index, content:ai-index (ai-ingest preview)
tests/                     unit/, integration/, e2e/
docs/                      This documentation set
```

## Content pipeline

1. Content is authored in `content/lessons/*.ts` as the schema's _input_ shape (`LessonInput` —
   defaulted fields like `sqlOrderSensitive` may be omitted).
2. `lib/content/registry.ts` parses every lesson/project through its Zod schema, producing fully
   typed, defaulted `Lesson`/`Project` objects for the rest of the app — one place where "authored
   shape" becomes "validated shape."
3. `scripts/validate-content.ts` (run by `npm run build` and CI) additionally checks cross-cutting
   invariants a single-object schema can't: duplicate ids/slugs, unresolvable prerequisites,
   unresolvable `nextLessonSlug`, duplicate `order` within a course, and placeholder text. As of
   Phase 5A it also checks course-level structure: `prerequisiteCourseSlugs`/`nextCourseSlugs`/
   `relatedTechnologySlugs` resolve to real records, the prerequisite graph is acyclic, every
   `modules[].lessonSlugs` entry resolves to a real lesson of that course with no lesson claimed by
   two modules and none left out, minimum lesson/module/learning-outcome counts for any course
   published from Phase 5A onward (see `EXEMPT_SHORT_COURSES` for the narrow, documented exemption
   covering five pre-Phase-5A courses), harness-report presence for `html`/`javascript`/
   `typescript` exercises, and duplicate quiz questions (including "same question, renamed
   variables" duplicates, via a normalizer that folds single-letter identifiers and digit runs).
4. `scripts/validate-snippets.ts` (Phase 5A, run on demand via
   `npm run content:validate-snippets`, not part of the default build) executes every exercise's
   reference `solutionCode` against its real runtime in headless Chromium (via Playwright) or,
   for TypeScript, through the real compiler first — proving every exercise is actually solvable,
   not just schema-valid. `python`/`sql` solutions are intentionally left to the existing
   Playwright e2e runner specs instead, since exercising Pyodide/sql.js from a standalone script
   would duplicate that coverage without the real browser context those specs already provide.
5. `scripts/build-search-index.ts` flattens the registry into `public/search-index.json`, consumed
   client-side by Fuse.js — search needs no server and no AI.

## Runner architecture

All three runners share the same contract: learner code + an optional test harness, run in an
isolated execution context, reporting `{ logs, error, testResults }` back to a React component
(`lib/runners/types.ts`).

- **HTML/CSS/JS** (`lib/runners/html-js-doc.ts` + `components/runners/html-js-runner.tsx`): builds
  an `srcdoc` document with an injected shim (console capture, `window.__report`, disabled
  `fetch`/`XMLHttpRequest`/`WebSocket`), loaded into an `<iframe sandbox="allow-scripts
allow-forms">` — deliberately without `allow-same-origin`, so the frame always has an opaque
  origin and can't reach the parent page, cookies, or localStorage. "Stop" discards and recreates
  the iframe (there is no way to preempt synchronous JS otherwise — see SECURITY.md).
- **Python** (`lib/runners/python.worker.ts` + `python-runner.tsx`): lazy-loads Pyodide from
  `cdn.jsdelivr.net` inside a dedicated Worker only when a Python runner mounts. Learner code and
  the harness run in the same Python global namespace; `Stop` terminates and respawns the worker.
- **SQL** (`lib/runners/sql.worker.ts` + `sql-runner.tsx`): loads sql.js (self-hosted
  `/public/wasm`) inside a Worker. Every run creates a _fresh_ in-memory database from the shared
  seed SQL, executes the learner's query, and separately executes the lesson's reference solution
  query against an identically fresh database — then diffs the resulting rows. This is what lets
  multiple correct SQL phrasings all pass instead of only one exact string.
- **TypeScript** (`lib/runners/typescript-compile.ts` + `components/runners/typescript-runner.tsx`,
  Phase 5A): the only runner that does real static analysis before execution. `run()` dynamically
  imports the `typescript` package (`compilerPromise ??= import("typescript")`, cached after the
  first call) — this keeps the ~8.7 MB compiler out of every bundle except the one that actually
  opens a TypeScript exercise; nothing on the homepage, dashboard, catalog, or a non-TS lesson ever
  references it. `compileTypeScript(source)` builds a real `ts.Program` (not
  `ts.transpileModule`, which performs _no_ type checking at all) against an in-memory
  `CompilerHost` and a curated ambient lib (`typescript-lab-lib.ts` — a hand-picked subset of
  lib.es2020.d.ts covering the built-ins these lessons actually use, not the full ~1 MB file),
  collecting syntactic + semantic + emit diagnostics. The emitted JavaScript is then handed to the
  _existing_ HTML/JS sandbox (`buildRunnerDoc`) to actually execute — a TypeScript exercise reuses
  the same iframe/sandbox security boundary as HTML/CSS/JS, it does not open a new execution
  surface. Type errors render in a `role="status"` (not `role="alert"`) banner, since a type error
  is frequently the exercise's own expected, correct outcome rather than a failure.

## Learning engine and account sync (Phase 4)

`lib/learning/store.ts` is a Zustand store wrapping a single `ProgressState` object
(`lib/learning/types.ts`, currently version 3): lesson status, exercise attempts, quiz results,
skill mastery, review queue, bookmarks, versioned notes, streak, daily goal, recently viewed,
**enrollments**, **roadmap progress**, **project progress**, a capped **activity** feed, and
**profile** preferences. Every mutator persists to `localStorage` on every call
(`lib/learning/storage.ts`), under one of two keys:

- `visasparkschools:progress` — the shared **guest** key, used whenever nobody is signed in.
- `visasparkschools:progress:<userId>` — a **per-account** cache key, used only while that
  specific user is signed in.

`lib/learning/store.ts#setActiveStorageKey()` switches which key `persist()` writes to; nothing
else in the store needs to know whether a session exists. This separation — not a single shared
key — is what makes sign-out and account-switching safe: signing out (or a different account
signing in) always re-points persistence at a key the previous session never wrote learner-visible
data into after the switch.

**Derived, never stored, completion**: `lib/learning/completion.ts` computes course completion
(every lesson in the course is `"completed"`), project completion (every milestone id is in
`completedMilestoneIds`), and roadmap-step completion — `course`/`project` steps are always
derived from real lesson/milestone data; `technology-guide`/`practice`/`assessment` steps (which
have no other signal to derive from) are self-reported via `toggleRoadmapStep`, and _only_ those
step types are ever written to `roadmapProgress[...].completedStepIds`. Nothing in this system
independently declares a course/project/roadmap "complete" as a boolean that could go stale.

**Guest-to-account sync lifecycle** (`lib/sync/orchestrator.ts`, driven by
`components/auth/auth-provider.tsx`, a no-render component mounted once in
`app/(site)/layout.tsx` that subscribes to `supabase.auth.onAuthStateChange` and forwards each
event to the orchestrator). **A sync runs exactly twice in the ordinary case: once on sign-in, and
never again automatically** -- it is not a continuous or periodic background sync, and a local
mutation made after a successful sign-in (completing a lesson, editing the profile, ...) is saved
to that account's local cache key immediately but is only pushed to Supabase the _next_ time a
sync runs (the next sign-in in a fresh session, or a manual retry). A retry is only ever
learner-triggered, from the dashboard's "Sync status" card, and only appears after a failure --
there is no automatic retry loop. On sign-in, the orchestrator snapshots the current in-memory
`ProgressState` (guest data, or nothing new if this account is already active), calls
`lib/sync/lifecycle.ts#syncGuestToAccount` -- which pulls the account's remote state
(`lib/sync/pull.ts`), merges it with the snapshot via `mergeProgress` (`lib/learning/storage.ts`),
and pushes the merged result back (`lib/sync/push.ts`, all upserts, so retries are safe) -- then,
only if the sign-in (or retry) that started the sync is still the current one, writes the merged
state to that account's local cache key, clears the shared guest key (so it can never be folded
into a _different_ account later), and switches the store's active key. On sign-out it switches
back to the guest key and reloads whatever's there (which does not include anything from the
just-signed-out account, since that account's activity was never written to the guest key). A
module-scoped `generation` counter (not component state, so it's shared between the auth-event
listener and the dashboard's manual retry button) discards any sync response that resolves after a
_later_ sign-in/sign-out/retry already happened, so a slow network response can never land after
the learner has moved on to a different account, back to guest, or a newer retry attempt -- this is
unit-tested end-to-end with a fake Supabase client (`tests/integration/auth-provider.test.tsx`)
simulating those races, including a stale retry response.

`mergeProgress` (`lib/learning/storage.ts`) is per-field: whichever side represents more progress
wins (higher lesson status, more exercise attempts, better quiz score, earliest review due date,
union of bookmarks/enrollments/roadmap steps, max skill mastery). Two fields get special handling
beyond simple union/max: **notes** are versioned (`NoteState { text, updatedAt, conflict? }`) — a
genuine conflict (both sides edited the same lesson's note differently) keeps the more recent text
as `text` but preserves the other under `conflict` rather than silently discarding it, surfaced in
`components/lesson/notes-panel.tsx` with a restore/discard choice. **Profile preferences** are
last-write-wins as a whole object by `updatedAt`, with one exception: an all-null profile (e.g. the
empty row `handle_new_user` creates at sign-up) never outranks a side with real preferences set,
regardless of timestamp — otherwise signing up right after setting a guest preference would erase
it (`tests/unit/progress-merge.test.ts`).

`lib/learning/mastery.ts`, `review-schedule.ts`, `recommendation.ts`, and `daily-goal.ts` are pure,
unit-tested functions with no framework dependency. `recommendation.ts#getNextLessonRecommendation`
is a small, explicit, ordered priority function (resume an in-progress lesson → continue the
current roadmap's next required course step → continue the most recently accessed enrolled course
→ start the platform's first lesson) — not AI, and documented as such in its own docstring.
`daily-goal.ts#getDailyGoalStatus` computes "minutes learned today" from the activity log's real
`lesson-completed` events (summed `estimatedMinutes`) in the learner's timezone, not a running
timer; missing a day never deletes anything, since it only ever reads today's slice of a permanent
log.

## AI tutor (optional)

`lib/ai/` is a small, provider-agnostic pipeline: `chunking.ts` splits lesson content by heading;
`retrieval.ts` does keyword/TF-style scoring (no embedding call required) with a
`mergeHybridScores` hook ready for a vector score once an embedding provider is configured;
`safety.ts` screens both learner questions and retrieved content for prompt-injection patterns;
`prompt.ts` builds a system+user message pair that treats retrieved content as data, not
instructions; `provider.ts` calls any OpenAI-compatible `/chat/completions` endpoint. `quota.ts`
(in-memory) and `quota-supabase.ts` (atomic Postgres RPC, used when Supabase + an authenticated
user are both present) enforce a daily allowance. `app/api/tutor/route.ts` wires all of this
together and returns a "not enough evidence" response when nothing retrieved clears
`MIN_RELEVANCE_THRESHOLD`, rather than letting the model guess.

## Feature flags

`lib/site-config.ts` exports `featureFlags.supabaseEnabled` and `featureFlags.aiTutorEnabled`,
both computed from environment variables and `false` by default. Every optional-feature UI branch
checks these flags and renders an honest "not available" state rather than a broken or fake one.

## Technology directory (Phase 3)

A second, independent content system alongside the original six-track curriculum, added in Phase
3 and never modifying it. Lives in `lib/directory/` and mirrors the original content system's
architecture deliberately: `types.ts` (Zod schemas, `Input`/output type split, same pattern as
`lib/content/types.ts`), per-category data files under `data/`, `registry.ts` (aggregation/query
helpers — `allCategories`/`allTechnologies`/`allLearningPaths`, each parsed through its schema at
module load), and `validate.ts` (cross-reference checks a single-object schema can't express, run
by `scripts/validate-content.ts` alongside the original content validation).

**Categories** (`categories.ts`): 16 canonical taxonomy entries; 13 `publicVisibility: true`
today, 3 (Quantitative Aptitude, Reasoning, Career/GD Prep) registered but not public until Phase
5 builds real content for them.

**Technologies** (`data/*.ts`, one file per category): ~80 records, each a genuine guide (what it
is/why/where it fits, core concepts, an original example, use cases, project ideas, official
references). A technology never claims a course, runner, or project exists directly via a
boolean — instead it stores _references_ (`courseId`, `runnerSupport`, `projectIds`), and
`availability.ts#getTechnologyAvailability()` is the single function that resolves those
references against the live `lib/content/registry.ts` course/project registry to decide what a
guide page may actually render. This is a deliberate design choice mirroring how
`lib/learning/mastery.ts` centralizes progress-scoring logic: one function, not scattered
booleans that could disagree with each other.

**Learning roadmaps** (`learning-paths.ts`): 16 records, 15 public. Each `LearningPath` is an
ordered list of `steps` (`technology-guide` | `course` | `project` | `practice` | `assessment`
step types — the last two exist in the schema for future phases but cannot currently appear as a
_required_ step on any public path, since neither a practice-assessment nor certificate system
exists yet). `certificateEligible` and `finalAssessmentRequired` are hard-validated to `false` on
every path, public or draft — `validate.ts` fails the build if either is ever `true`, so a future
contributor can't accidentally ship a false promise ahead of Phase 8. A path only becomes public
once every one of its `required` steps resolves to real content; the one path that currently can't
meet that bar (Placement and Job Readiness, which needs Aptitude/Reasoning/GD content that doesn't
exist yet) stays an internal draft — fully typed and validated, just not rendered or included in
the sitemap/search index.

**Routes**: `/technologies` (filterable directory, client-side filter state serialized to the URL
via `components/directory/technology-directory-client.tsx`), `/technologies/[techSlug]` (guide),
`/categories`, `/categories/[categorySlug]`, `/roadmaps`, `/roadmaps/[pathSlug]` — all under
`app/(site)/`, all server components except the directory's filter UI. `notFound()` is called for
any slug that doesn't resolve to a public record, so an internal-draft category/path 404s exactly
like a nonexistent one — there's no separate "coming soon" state to accidentally leak.

**Search**: `scripts/build-search-index.ts` adds public technologies/categories/roadmaps to the
same `public/search-index.json` Fuse.js index used for lessons/courses/projects — internal drafts
are never included, since the script only ever calls `getPublic*()`. Common abbreviations (JS, TS,
DSA, AI, ML, LLM, RAG, CI/CD, QA) resolve correctly because they're present in the relevant
technology's own `searchKeywords` field, verified in `tests/unit/directory-search-aliases.test.ts`
using the exact same Fuse.js configuration as the real search UI.

## UI design system (Phase 4.5)

A token → primitive → page architecture, added in Phase 4.5 as a presentation-only pass over every
existing route (no learning/account/sync behavior changed). Full design direction, token
inventory, primitive catalog, and conventions are in `docs/DESIGN_SYSTEM.md`; the summary here is
just the architectural shape.

- **Tokens** (`app/globals.css`): every color in the app is a CSS custom property (no Tailwind
  default palette in use anywhere), declared for light/dark/forced-theme once each.
- **Primitives** (`components/ui/*`): `Button`, `Card`, `Badge`, `Alert`, `EmptyState`,
  `PageHeader`/`SectionHeader`, `Skeleton`, `ProgressBar`, `StepMarker`, `Breadcrumbs`, and a
  hand-drawn icon set — pages compose these instead of repeating raw Tailwind strings.
- **Category/track accent mapping** (`lib/ui/category-accent.ts`, `lib/ui/track-accent.ts`):
  explicit, literal (not computed/interpolated — see the design doc for why interpolation silently
  breaks Tailwind's class scanner) per-id → hue maps, consumed by course/technology/roadmap cards.
- **Shared modal accessibility** (`lib/hooks/use-modal-a11y.ts`): one hook used by all 4
  drawer-style dialogs in the app (header mobile nav, lesson course-contents drawer, technology
  filter drawer, AI tutor panel) for focus-trap/restore/Escape/scroll-lock behavior, replacing four
  separate hand-rolled (and, before Phase 4.5, incomplete) implementations.

## Why params/searchParams are awaited

Next.js 16 makes route `params` an async value. Every dynamic route in this app
(`app/(site)/courses/[courseSlug]/...`, `paths/[trackSlug]`, `projects/[projectSlug]`) awaits
`params` before use — omitting this silently resolves to `undefined` and made every dynamic page
404 in early development (caught by the Playwright navigation test, see PROJECT_STATUS.md).
