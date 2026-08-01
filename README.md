# VisaSparkSchools

A self-paced learning platform that takes learners from zero coding knowledge through web
development, Python, APIs, SQL, and modern AI systems (LLMs, embeddings, RAG, and agents).

> **Product promise:** Start with zero coding knowledge. Finish by building and understanding real
> AI applications.

This is a public beta. Core learning — lessons, interactive exercises, quizzes, progress tracking,
and search — works fully in the browser with **no account and no paid service required**. Accounts
(Supabase) and the AI tutor are optional, feature-flagged additions.

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
- **Supabase** (Postgres + Auth) — optional, for accounts (progress sync is schema-ready but not
  yet wired up — see "Known limitations" below)
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
- [`docs/SECURITY.md`](docs/SECURITY.md) — threat model and safeguards
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — Supabase and Vercel setup, step by step
- [`PROJECT_STATUS.md`](PROJECT_STATUS.md) — durable, up-to-date implementation checklist

## Guest mode vs. accounts

Every learner starts as a **guest**: progress, exercise attempts, quiz results, bookmarks, notes,
mastery, and the spaced-review schedule are stored in `localStorage` (see `lib/learning/`). This
works with zero configuration and zero backend cost.

If you configure Supabase (see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)), learners can create an
account and sign in. **Progress currently still lives only in `localStorage`, even when signed
in** — the Supabase migration, RLS policies, and a non-destructive merge algorithm
(`lib/learning/storage.ts#mergeProgress`, unit-tested) all exist, but no code yet calls it on
sign-in or reads/writes the Supabase progress tables. Wiring that up is the largest remaining gap
before accounts are more than an authentication shell — see `PROJECT_STATUS.md`.

## The optional AI tutor

The AI tutor is off by default. When `AI_TUTOR_ENABLED`/`NEXT_PUBLIC_AI_TUTOR_ENABLED` and an API
key are configured, it answers grounded in this repo's own lesson content (keyword-retrieval today,
hybrid-ready), cites the lesson/section it used, and honestly says "not enough evidence" rather than
guessing. See [`docs/SECURITY.md`](docs/SECURITY.md) for its prompt-injection and quota defenses.

## Known limitations (beta)

- **Supabase progress sync is not wired up.** Accounts (sign-up/sign-in/reset) work end to end
  once Supabase is configured, but lesson/exercise/quiz/mastery/review/bookmark/note data is only
  ever read from and written to `localStorage` — no code currently calls Supabase for any of the
  `lesson_progress`/`exercise_attempts`/`quiz_attempts`/`skill_mastery`/`review_queue`/`bookmarks`/`notes`
  tables. The merge algorithm and schema are ready (see `lib/learning/storage.ts#mergeProgress`
  and `supabase/migrations/0001_init.sql`); the sync integration itself still needs to be built.
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
