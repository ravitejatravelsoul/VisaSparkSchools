# VisaSparkSchools

A self-paced learning and practice platform for programming, AI, data, cloud, and career-ready
skills. Its original six-track curriculum takes learners from zero coding knowledge through web
development, Python, APIs, SQL, and modern AI systems (LLMs, embeddings, RAG, and agents); a
technology directory of ~80 guides across 13 categories plus 15 learning roadmaps (Phase 3) helps
learners orient across a much broader set of technologies, honestly distinguishing a guide from a
full course.

> **Product promise:** Learn. Build. Prove.

This is a public beta. Core learning — lessons, interactive exercises, quizzes, progress tracking,
the technology directory, and search — works fully in the browser with **no account and no paid
service required**. Accounts (Supabase) and the AI tutor are optional, feature-flagged additions.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. That's it — no environment variables are required for the full
learning experience (lessons, runners, exercises, quizzes, search, guest progress).

## Tech stack

- **Next.js 16** (App Router), **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** for styling
- Course content authored as **typed TypeScript modules**, validated by a **Zod** schema
- **Zustand** for the client-side learning-progress store (guest mode via `localStorage`)
- **Monaco Editor** (dynamically loaded) for code editing
- Sandboxed **iframe** for HTML/CSS/JS; **Pyodide** (Web Worker) for Python; **sql.js** (Web
  Worker, WebAssembly SQLite) for SQL
- **Fuse.js** for local, AI-free fuzzy search
- **Supabase** (Postgres + Auth) — optional; when configured, accounts sync guest progress on
  sign-in and keep syncing afterward (see "Guest mode vs. accounts" below)
- **Vitest** + **React Testing Library** for unit/integration tests; **Playwright** +
  **@axe-core/playwright** for end-to-end and accessibility tests

## Scripts

| Command                           | What it does                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`                     | Start the dev server                                                             |
| `npm run build`                   | Validate content, build the search index, and build for production               |
| `npm run start`                   | Start the production server (after `build`)                                      |
| `npm run lint`                    | ESLint                                                                           |
| `npm run typecheck`               | `tsc --noEmit`                                                                   |
| `npm run format` / `format:check` | Prettier                                                                         |
| `npm run test`                    | Vitest unit + integration tests                                                  |
| `npm run e2e`                     | Playwright end-to-end tests (`npx playwright install` first)                     |
| `npm run content:validate`        | Schema/uniqueness/prerequisite/placeholder checks over all course content        |
| `npm run content:search-index`    | Regenerate `public/search-index.json`                                            |
| `npm run content:ai-index`        | Preview the AI tutor's retrieval chunking over course content (no network calls) |

## Documentation

- [`docs/PRD.md`](docs/PRD.md) — product requirements and scope
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system design, folder layout, data flow
- [`docs/CURRICULUM.md`](docs/CURRICULUM.md) — curriculum matrix (tracks → courses → lessons → skills)
- [`docs/CONTENT_AUTHORING.md`](docs/CONTENT_AUTHORING.md) — how to safely add a technology,
  category, or learning roadmap to the Phase 3 directory
- [`docs/BRANDING.md`](docs/BRANDING.md) — logo system, brand voice, naming
- [`docs/SECURITY.md`](docs/SECURITY.md) — threat model and safeguards
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — Supabase and Vercel setup, step by step
- [`PROJECT_STATUS.md`](PROJECT_STATUS.md) — durable, up-to-date implementation checklist

## Technology directory (Phase 3)

Alongside the original curriculum, `/technologies`, `/categories`, and `/roadmaps` provide a
browsable, filterable, searchable directory of ~80 technology guides across 13 public categories,
plus 15 public learning roadmaps. Every guide honestly labels itself as guide-only,
course-available, or runner-available — a guide never claims a course or interactive playground
exists when it doesn't; see `docs/CONTENT_AUTHORING.md` for exactly how that's enforced.

## Guest mode vs. accounts

Every learner starts as a **guest**: progress, exercise attempts, quiz results, bookmarks, notes,
mastery, spaced-review schedule, enrollments, roadmap/project progress, and preferences are stored
in `localStorage` (see `lib/learning/`). This works with zero configuration and zero backend cost.

If you configure Supabase (see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)), learners can create an
account and sign in — guest progress is automatically merged into that account (non-destructive,
per-field union/max/latest-wins, `lib/learning/storage.ts#mergeProgress`) once per sign-in, and
again on a manual retry after a failure. This is **not** a continuous background sync: local
changes made after signing in are cached to that account's local key immediately and pushed to
Supabase the next time a sync actually runs. Signing out, or a different account signing in on the
same device, never surfaces another account's data — see `docs/ARCHITECTURE.md`'s "Learning engine
and account sync" section for exactly how.

## The optional AI tutor

The AI tutor is off by default. When `AI_TUTOR_ENABLED`/`NEXT_PUBLIC_AI_TUTOR_ENABLED` and an API
key are configured, it answers grounded in this repo's own lesson content (keyword-retrieval today,
hybrid-ready), cites the lesson/section it used, and honestly says "not enough evidence" rather than
guessing. See [`docs/SECURITY.md`](docs/SECURITY.md) for its prompt-injection and quota defenses.

## Known limitations (beta)

- **The guest-to-account sync lifecycle is unit- and integration-tested against a mocked Supabase
  client, not execution-tested against a live project** — this beta doesn't provision any cloud
  services, so the real end-to-end browser flow (sign up, sign in on a second device, observe a
  merge) has not been run against an actual Postgres instance. `tests/unit/sync-lifecycle.test.ts`
  and `tests/integration/auth-provider.test.tsx` cover the merge/push/pull logic and the
  sign-out/multi-account privacy guarantees with a fake client instead.
- Per-exercise saved code (the editor's "restore my last attempt" convenience) stays a local-only
  `localStorage` feature — it is not part of the Supabase sync layer, since no requirement was
  identified for syncing it and doing so would need its own migration and merge rule.
- Search is keyword/fuzzy (Fuse.js) by design — no vector/embedding search is required for basic
  discovery, per the "search must work without AI" requirement. The AI tutor's retrieval layer
  additionally supports merging in vector scores once an embedding provider is configured, but no
  vector store is wired up in this beta.
- The AI tutor's retrieval is keyword-based over lesson content chunked at build/request time
  (`lib/ai/chunking.ts`); it is not backed by a persisted vector index.
- Privacy and Terms pages are clearly labeled beta templates requiring legal review before any
  commercial launch.
- No certificates, payments, or production deployment are included in this beta (by design — see
  `docs/PRD.md`).

## License

Proprietary — all rights reserved (update this if you intend to open-source).
