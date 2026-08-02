# Deployment Guide

This document describes how to deploy VisaSparkSchools. **No step in this document was executed as part of
building this beta** — no Supabase project was created, no Vercel project was deployed, and no DNS
was changed. Everything below is a guide for you to run.

## 1. Core app (no optional services)

The app builds and runs fully without Supabase or AI configured. This is the fastest path to a
working public beta.

1. Push this repository to GitHub (or your Git host of choice).
2. In Vercel, "Add New Project" → import the repository. Vercel auto-detects Next.js; no build
   command changes are needed (`npm run build` already runs content validation + the search-index
   build before `next build`).
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://your-domain.example`) in
   Vercel's Environment Variables.
4. Deploy. Every lesson, exercise, quiz, runner, and search works immediately.

## 2. Adding Supabase (accounts + progress sync)

**Current state, precisely:** enabling Supabase makes sign-up/sign-in/reset-password functional,
switches the AI tutor's quota to the atomic Postgres RPC, and turns on the guest-to-account sync
lifecycle (`lib/sync/orchestrator.ts`, driven by `components/auth/auth-provider.tsx`) — signing in
merges local guest progress into the account and pushes the merged result to Supabase once for
that sign-in (and again on a manual "Retry sync" after a failure) -- not continuously; local
changes made afterward are cached locally and included in the next sync (see
`docs/ARCHITECTURE.md`'s "Learning engine and account sync" section). This sync logic is
unit/integration-tested against a mocked
Supabase client (`tests/unit/sync-lifecycle.test.ts`, `tests/integration/auth-provider.test.tsx`)
but has **not** been execution-tested against a real, live Supabase project by this build — no
cloud resources were provisioned for this beta. Test it against a real project before trusting it
with real user data.

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor (or via the CLI: `supabase link` then `supabase db push`), run
   `supabase/migrations/0001_init.sql` followed by `supabase/migrations/0002_phase4_learning_accounts.sql`,
   in that order. Both are idempotent-safe to review before running (`create table if not exists`,
   `add column if not exists`, policies named explicitly) but have not been run against any real
   project by this build — read them before applying either to production data.
3. Copy the project's URL and anon key (Project Settings → API) into:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy. `featureFlags.supabaseEnabled` (see `lib/site-config.ts`) turns on automatically once
   both variables are present — sign-in/sign-up pages become functional, the tutor's quota switches
   from in-memory to the atomic Postgres RPC for authenticated users, and sign-in starts running the
   sync lifecycle described above.
5. **Never put the Supabase service-role key in any `NEXT_PUBLIC_*` variable or client code.** This
   app never needs it — all client/server access goes through the anon key plus RLS.
6. Run the RLS verification procedure in `docs/SECURITY.md` (now covering the Phase 4 tables too)
   before trusting the deployment with real user data.

### Auth configuration notes

- Email/password auth is used as written (`components/auth/auth-form.tsx`). If you enable email
  confirmation in Supabase Auth settings, tell users to check their inbox after sign-up (the form
  as written assumes confirmation is either off or handled by Supabase's default email templates).
- Password reset uses `supabase.auth.resetPasswordForEmail` — configure the redirect URL in
  Supabase Auth settings to point at your deployed `/reset-password` (or a dedicated confirmation
  route) once you're ready to test the full flow end-to-end.

## 3. Adding the AI tutor (optional)

1. Obtain an API key from any OpenAI-compatible provider.
2. Set:
   - `AI_TUTOR_ENABLED=true`
   - `NEXT_PUBLIC_AI_TUTOR_ENABLED=true`
   - `AI_API_KEY=<your key>`
   - `AI_API_BASE_URL`, `AI_CHAT_MODEL` (defaults to `https://api.openai.com/v1` /
     `gpt-4o-mini` if unset)
   - `AI_DAILY_TUTOR_ALLOWANCE` (default `30`)
3. Redeploy. The tutor panel on lesson pages switches from "not enabled" to a working, grounded chat
   backed by `app/api/tutor/route.ts`.
4. This beta's retrieval is keyword-based over lesson content chunked at request time — no vector
   database is provisioned or required. If you later add one, wire its results into
   `lib/ai/retrieval.ts#mergeHybridScores`, which already expects a vector score in the same shape.

## 4. Environment variable reference

See `.env.example` for the full, commented list. Summary:

| Variable                                                     | Required for                         | Notes                                            |
| ------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                                       | SEO metadata/sitemap                 | Defaults to `http://localhost:3000`              |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Accounts + progress sync (see above) | Both must be set together                        |
| `AI_TUTOR_ENABLED` / `NEXT_PUBLIC_AI_TUTOR_ENABLED`          | AI tutor                             | Keep both in sync                                |
| `AI_API_KEY` / `AI_API_BASE_URL` / `AI_CHAT_MODEL`           | AI tutor                             | Any OpenAI-compatible endpoint                   |
| `AI_EMBEDDING_MODEL` / `AI_EMBEDDING_DIMENSIONS`             | Future vector retrieval              | Not required for the current keyword-based tutor |
| `AI_DAILY_TUTOR_ALLOWANCE`                                   | AI tutor                             | Per-user daily question cap                      |

## 5. CI

`.github/workflows/ci.yml` runs on every PR and push to `main`: format check, lint, typecheck,
content validation, unit/integration tests, a production build (with no optional secrets — proving
the app builds in pure demo mode), and a Playwright end-to-end pass with Chromium. No production
secrets are required for CI to pass.

## 6. Rollback / safety notes

- This build never ran `supabase db push` or created any cloud resource — the first time you do so
  is on your own project, under your own control.
- Migrations are additive (`create table if not exists`, explicit named policies); review them
  against your project's existing schema before applying if you have prior tables with the same
  names.
- Nothing in this repository pushes to a remote, deploys, or modifies DNS on its own.
