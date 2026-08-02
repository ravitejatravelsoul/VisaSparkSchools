# Architecture

## Overview

VisaSparkSchools is a Next.js 16 App Router application. Course content is version-controlled TypeScript
(not a database), validated by a Zod schema at build time. Learning progress lives client-side
(localStorage) for every learner, guest or signed-in — **Supabase progress sync is schema-ready
but not yet wired into the app** (see "Learning engine" below and `PROJECT_STATUS.md`). Code
execution (HTML/CSS/JS, Python, SQL) happens entirely in the learner's browser — a sandboxed
iframe and two Web Workers — never on the server, so there is no server-side arbitrary code
execution surface.

```
Browser
├─ Next.js app (Server Components for content/SEO, Client Components for interactivity)
├─ Sandboxed <iframe srcdoc> — HTML/CSS/JS runner (no allow-same-origin)
├─ Web Worker — Pyodide (Python), lazy-loaded from CDN
├─ Web Worker — sql.js (SQLite/WASM), self-hosted in /public/wasm
└─ Zustand store <-> localStorage (progress, for guests AND signed-in users today)

Server (Next.js route handlers)
├─ /api/tutor — optional AI tutor: keyword retrieval over lesson content -> chat completion
└─ /api/feedback — contact form -> Supabase (if configured) or server log (demo mode)

Supabase (optional, not provisioned in this beta)
├─ Auth (email/password) — wired up and functional when configured
└─ Postgres: per-user progress tables, all with Row Level Security — schema exists;
   no application code reads/writes these tables yet (see Learning engine)
```

## Folder layout

```
app/                      Routes (App Router), grouped under (site) for the shared header/footer
components/
  ui/                      Design-system primitives (Button, Card, Badge, Container)
  layout/                  Header, footer, theme provider/toggle, mobile nav, skip link
  lesson/                  Lesson-reader building blocks (markdown, exercise panel, quiz, course nav,
                           bookmarks, notes, completion actions)
  runners/                 Code editor + the three runner UIs (HTML/JS, Python, SQL)
  ai/                      Tutor launcher (client)
  auth/, contact/, dashboard/, playground/, search/, seo/
content/
  tracks.ts, courses.ts, projects.ts, lessons/*.ts   Authored course content (typed, validated)
  fixtures/sql-seed.ts     Shared SQL dataset used by every SQL lesson/exercise
lib/
  content/                 Zod schema (types.ts) + registry (aggregation/query helpers)
  directory/               Phase 3 technology directory: types, categories.ts, data/*.ts (~80
                           technologies by category), learning-paths.ts, registry.ts, validate.ts,
                           availability.ts (see "Technology directory" below)
  learning/                Mastery formula, review schedule, guest progress store + storage/merge
  runners/                 Runner doc-builder (HTML/JS) and the two Web Worker scripts
  ai/                      Provider abstraction, chunking, retrieval, prompt building, safety, quota
  supabase/                Browser/server client factories + hand-maintained typed schema
  search/                  Search document type shared by the index-builder script and the UI
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
   unresolvable `nextLessonSlug`, duplicate `order` within a course, and placeholder text.
4. `scripts/build-search-index.ts` flattens the registry into `public/search-index.json`, consumed
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

## Learning engine

`lib/learning/store.ts` is a Zustand store wrapping a single `ProgressState` object
(`lib/learning/types.ts`), persisted to `localStorage` (`lib/learning/storage.ts`) on every
mutation, regardless of whether the learner is a guest or signed in. `mergeProgress`
(`lib/learning/storage.ts`) implements the _algorithm_ for a future guest→account merge: per
field, whichever side represents more progress wins (higher lesson status, more attempts, better
quiz score, earlier review due date, union of bookmarks) — nothing is ever silently dropped. It is
unit-tested (`tests/unit/progress-merge.test.ts`) but **not currently called from anywhere in the
app** — there is no code path that fetches a signed-in user's remote progress from Supabase, calls
`mergeProgress`, or writes progress back to Supabase. Wiring this up (an auth-state-change hook
that reads the Supabase tables, merges, writes back, and keeps the two in sync going forward) is
the largest remaining gap between the current Supabase integration and a "real" synced-accounts
feature. `lib/learning/mastery.ts` and `review-schedule.ts` are pure, unit-tested functions with no
framework dependency.

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

## Why params/searchParams are awaited

Next.js 16 makes route `params` an async value. Every dynamic route in this app
(`app/(site)/courses/[courseSlug]/...`, `paths/[trackSlug]`, `projects/[projectSlug]`) awaits
`params` before use — omitting this silently resolves to `undefined` and made every dynamic page
404 in early development (caught by the Playwright navigation test, see PROJECT_STATUS.md).
