# Project Status — VisaSparkSchools

Last updated: 2026-08-01. This is the durable checklist for the CodeWise → VisaSparkSchools
expansion — update it precisely as work progresses. Do not mark anything done that hasn't
actually been run and verified. Do not mark a later phase complete based only on scaffolding.

## Overall status: Phase 1 (audit) and Phase 2 (rebrand) complete and verified. Phases 3–9 not started.

This file replaces the previous CodeWise-era status document. That document's own numbering
("Phase 1–10") described the _original build_, not this expansion's 9-phase plan below — see
"Pre-expansion baseline" for what it recorded, preserved here for continuity.

## Starting state (recorded at the start of this expansion, 2026-08-01)

- Single git commit in the repo: `c9e1df0` ("Initial commit from Create Next App"). Every
  application file — all of `app/`, `components/`, `lib/`, `content/`, `docs/`, `tests/`,
  `supabase/`, `scripts/` — was untracked (`??` in `git status`), i.e. still uncommitted working
  tree, exactly as left by the prior CodeWise build-and-audit session. Nothing has ever been
  pushed, deployed, or provisioned.
- Framework: Next.js 16.2.12 (App Router, Turbopack), React 19, TypeScript strict, Tailwind CSS
  v4. Package manager: npm.
- Content system: typed TypeScript lesson/course modules under `content/`, validated by a Zod
  schema (`lib/content/types.ts`), with an input/output type split. 6 tracks, 6 courses, 50
  lessons, 8 projects (6 guided + 2 capstones), 172 knowledge-check questions, 100 exercises + 8
  SQL exercises, verified previously by executing every exercise's reference solution against its
  real runtime (Chromium for HTML/CSS/JS, Pyodide for Python, sql.js for SQL).
- Runners: sandboxed iframe (HTML/CSS/JS), Pyodide Web Worker (Python), sql.js Web Worker (SQL) —
  all three previously verified end-to-end.
- Auth/sync: Supabase migrations with RLS on every user-data table exist and were statically
  reviewed (no live Supabase project connected — see "Known limitations"). Guest progress
  persists to `localStorage`; the guest→account merge _algorithm_ exists and is unit-tested but
  is not wired into any UI flow yet — this was true before this expansion and remains true now.
- AI tutor: provider abstraction, keyword retrieval, prompt-injection defenses, citations,
  quota — implemented and unit/integration-tested with deterministic mocks; disabled by default,
  never exercised against a real paid API key.
- Testing baseline at the start of this expansion: 70 unit/integration tests (12 files), 58
  Playwright e2e tests (chromium + mobile-chromium projects), production build generating 94
  routes — all green.
- Branding surface identified before renaming anything: `lib/site-config.ts` (already the single
  source of truth for the product name — the earlier build had already centralized this, which
  made the rename tractable), two localStorage key families (`codewise:progress`,
  `codewise:code:<id>`), one internal-only postMessage protocol string
  (`codewise-run-result`), ~100 lesson `author`/`reviewer` metadata fields, one literal brand
  string inside an HTML/CSS lesson example, and scattered mentions across README/docs/
  `package.json`/`.env.example`/the initial Supabase migration's header comment. No prior logo or
  icon assets existed beyond the unmodified default Next.js starter files and favicon.

## Phase progress (this expansion's 9-phase plan)

- [x] **Phase 1 — Audit and specification.** Repository inspected (git status/log, AGENTS.md,
      directory structure, storage-key inventory, branding surface); starting state recorded
      above. `docs/PRD.md`/`docs/ARCHITECTURE.md` renamed in place (see Phase 2 — their substance
      was not rewritten in this pass beyond the name, since rewriting their _content_ to describe
      unbuilt Phase 3–9 features would misrepresent current capability).
- [x] **Phase 2 — Rebrand.** Complete. Details below.
- [ ] **Phase 3 — Navigation and technology architecture.** Not started. Needs: the 16-category
      taxonomy, a typed technology registry (~60 technologies with the full record shape
      specified in the brief), a technology directory UI, distinguishing "has a full course" from
      "has a guide only," learning-path catalog pages, search/filter UI for the new taxonomy.
      **Current nav is unchanged** (Learning Paths / Courses / Projects / Playground / Search) —
      deliberately not restructured yet, since restructuring navigation before the underlying
      category/registry data model exists would produce broken or empty destination pages, which
      the brief explicitly prohibits ("Do not add a public navigation link to a broken or
      placeholder experience").
- [ ] **Phase 4 — Learning and accounts.** Not started as new work in this expansion (the
      pre-existing course experience, dashboard, and guest progress from the CodeWise build carry
      forward unchanged and still work — see "What still works" below). Still needed: enrollment
      concept, course announcements architecture, downloadable owner resources, and (highest
      priority) actually wiring the existing `mergeProgress`/Supabase read-write path into the
      sign-in flow, which was already a known gap before this expansion.
- [ ] **Phase 5 — Aptitude and career.** Not started. Zero aptitude/reasoning/GD/career content
      exists yet. This is a large, content-heavy phase (26 aptitude topics + 20 reasoning topics +
      GD/career modules, each needing deterministic, seeded question generation) that has not been
      scaffolded, let alone built.
- [ ] **Phase 6 — Study Studio.** Not started. No workspace model, no upload handling, no
      extraction pipeline, no `docs/STUDY_STUDIO.md` content yet (the file does not exist).
- [ ] **Phase 7 — Tools Lab and Project Studio.** Not started as new work. The existing single-file
      Playground (HTML/CSS/JS, Python, SQL) carries forward unchanged and still works. None of the
      ~28 requested Tools Lab utilities exist yet. Project Studio (multi-file, ZIP import/export,
      IndexedDB, snapshots) does not exist — the nav still says "Playground," accurately, and was
      deliberately _not_ relabeled "Project Studio" since that capability doesn't exist yet (see
      Phase 2 notes below).
- [ ] **Phase 8 — Certificates.** Not started. No `docs/CERTIFICATES.md`, no certificate schema,
      no eligibility logic, no PDF generation, no verification route.
- [ ] **Phase 9 — Hardening.** Ongoing by nature (this expansion's Phase 2 work already included
      its own testing/a11y/visual-QA pass — see below), but the full-scope Phase 9 pass across
      Phases 3–8's eventual output has not happened because those phases don't exist yet.

## Phase 2 — Rebrand: what was actually done

**Original logo/brand system** (new — no logo existed before this expansion):

- `public/brand/logo-mark.svg` — hand-authored icon mark: a bold "V" that doubles as an open book
  viewed edge-on, with a code-cursor tick and a spark accent. Rendered and inspected at 512px,
  64px, 32px, and 16px (Playwright screenshots) before being adopted — legible as a clean V/badge
  down to 16px, full detail visible at larger sizes.
- `public/brand/logo.svg` / `logo-dark.svg` — full horizontal wordmark lockups for light/dark
  backgrounds, rendered and inspected; "Spark" is set in the accent color to visually separate the
  compound name.
- `public/brand/logo-monochrome.svg` — single-`currentColor` variant.
- `public/brand/og-source.svg` → rasterized to `public/og-default.png` (1200×630) via `sharp`,
  inspected.
- `public/favicon.svg`, `app/favicon.ico` (rebuilt as a real ICO container wrapping a rasterized
  32×32 PNG of the mark — replacing the default, unbranded Next.js favicon), `public/apple-touch-
icon.png` (180×180), `public/icon-192.png`, `public/icon-512.png`, `public/favicon-16.png`,
  `public/favicon-32.png` — all rasterized from the SVG source via `sharp` (already an installed
  dependency; no new package added).
- `components/brand/logo-mark.tsx` — a live, theme-aware React version of the mark used in the
  actual app header/footer (uses the app's existing CSS custom properties, so it adapts to
  light/dark automatically instead of needing a manual swap).
- All colors reuse the existing, previously WCAG-AA-contrast-verified `--color-brand`/
  `--color-brand-strong`/`--color-brand-contrast`/`--color-accent` tokens — no new palette was
  introduced, so no new contrast audit was required. Documented in full in `docs/BRANDING.md`,
  including the required "what to avoid" list (no passport/visa-card/graduation-cap/AI-brain/
  stock/emoji imagery).

**Brand configuration centralization** (`lib/site-config.ts`): name → "VisaSparkSchools", added
`shortName` ("VisaSpark"), tagline → "Learn. Build. Prove.", description rewritten to the broader
positioning while staying accurate to current scope, added `brand.*` asset paths, added
`certificateIssuer` field (for the not-yet-built Phase 8), `contactEmail` domain updated. Deferred
`developerName` field (added in an earlier session) preserved unchanged.
`social.github`/`social.twitter` were **left `undefined`** rather than pointed at a placeholder —
no official VisaSparkSchools social accounts exist, and linking to one that isn't real/owned would
be misleading.

**Navigation was deliberately left unchanged** (`navLinks`/`footerLinks` still say "Playground,"
not "Project Studio"; no "Study Studio," "Tools Lab," "Certificates," "Aptitude," or "Career" nav
entries were added) — none of those features exist yet, and the brief explicitly prohibits nav
links to placeholder experiences.

**Guest-data-preserving storage migration** (the brief's hardest constraint: "preserve existing
learner progress when storage keys or schemas change"):

- `lib/learning/storage.ts`: progress key renamed `codewise:progress` →
  `visasparkschools:progress`. `loadProgress()` now reads the new key first; if absent, reads the
  legacy key, migrates its contents through the existing version-migration logic, and writes the
  result under the new key — **without deleting the legacy key**, which is left in place as a
  recoverable backup. Covered by 6 new unit tests in `tests/unit/storage-migration.test.ts`
  (empty-state, new-key-present, legacy-only migration, migration-writes-forward, legacy-key-
  preserved, `saveProgress` always writes the new key).
- `lib/learning/use-persisted-code.ts`: per-exercise in-progress code key renamed
  `codewise:code:<id>` → `visasparkschools:code:<id>`, with the same read-new/fall-back-to-legacy/
  copy-forward/never-delete pattern.
- `codewise-run-result` (an internal-only `postMessage` protocol string between the sandboxed
  HTML/CSS/JS runner iframe and its parent, never persisted or exposed externally) renamed to
  `visasparkschools-run-result` in both `lib/runners/html-js-doc.ts` and
  `components/runners/html-js-runner.tsx` in the same change — no compatibility shim needed since
  both sides are updated atomically and nothing external depends on this string.
- Verified: no other localStorage keys, no custom `next-themes` storage key override, no custom
  Supabase client storage key override exist in the codebase (grepped) — so no other migration
  surface was missed.

**Full-repository "CodeWise" sweep**: every file-extension type was grepped case-insensitively.
Remaining hits after the sweep are exactly the five expected, intentional ones (the two storage
migration source files, their test file, `docs/BRANDING.md`'s migration-note section, and this
file's own history) — all documented migration-compatibility references, nothing missed. Fixed:
`package.json`/`package-lock.json` `name` field, README.md, `docs/ARCHITECTURE.md`,
`docs/DEPLOYMENT.md`, `docs/PRD.md` (name only — substantive content not rewritten in this pass,
see note above), `app/globals.css` token-file comment, `scripts/validate-content.ts` console
message, `supabase/migrations/0001_init.sql` header comment (safe to edit directly since this
migration has never been applied to any real database), `.env.example` header comment, and
~100 `author`/`reviewer: "CodeWise Curriculum Team"` fields across all 6 lesson content files
(→ "VisaSparkSchools Curriculum Team"). One literal in-lesson HTML example
(`content/lessons/html-css.ts`, a flexbox navbar exercise) that hardcoded `<div class="logo">
CodeWise</div>` was changed to a neutral example brand ("BrightPath") instead of the new product
name, since lesson examples shouldn't be coupled to the platform's own branding.

**Metadata/manifest/JSON-LD**: `app/layout.tsx` now declares the full icon set (SVG + PNG
fallbacks + apple-touch-icon) and Open Graph/Twitter `images` pointing at the new
`og-default.png` (previously no OG image was configured at all). `app/manifest.ts` uses the new
`shortName` and the new icon set. JSON-LD generation (`components/seo/json-ld.tsx` and its two
call sites) required **no changes** — it already read from `siteConfig.name`/`.url`/
`.description` rather than any hardcoded string, so it inherited the rebrand automatically.

**What still works, unmodified in substance** (only the name/branding around them changed):
all 50 lessons, all 100+8 exercises, all quizzes, all three runners, guest progress tracking
(bookmarks/notes/mastery/spaced-review), search, the AI tutor's disabled-safe state, the
Playground, dashboard, sign-in/sign-up forms (Supabase-disabled honest-state copy), Privacy/
Terms/Accessibility pages, sitemap/robots.

## Verified-green commands (run this session, after all Phase 2 changes)

```bash
npm run format:check     # Prettier — clean
npm run lint             # ESLint — 0 errors, 0 warnings
npm run typecheck        # tsc --noEmit — 0 errors
npm run content:validate # 6 tracks, 6 courses, 50 lessons, 8 projects — passed
npm run test             # Vitest — 13 files, 76 tests passed (70 prior + 6 new migration tests)
npm run build             # next build (Turbopack) — 94 routes generated successfully
npx playwright test      # 58 passed (chromium + mobile-chromium projects)
```

Visual QA: homepage, course catalog, and dashboard inspected via Playwright screenshots at
375px/1440px × light/dark after the rebrand (reusing the same screenshot methodology as the prior
CodeWise-era visual QA pass) — 0 console errors, 0 page errors, 0 failed network requests across
all captures. New mark/wordmark confirmed rendering correctly and theme-adaptively in both the
header and footer.

## Known limitations (carried forward from before this expansion, still true)

- **Supabase progress sync is still not wired up.** This was the single largest known gap before
  this expansion and remains so — `mergeProgress()`/the Supabase progress tables exist and are
  unit-tested/RLS-reviewed, but no application code calls them. Progress lives in `localStorage`
  only, even for signed-in users, exactly as before. Fixing this is scoped to Phase 4.
- **No live Supabase project, Vercel deployment, or AI provider key.** Everything AI/Supabase-
  related remains statically reviewed and mock-tested only, never executed against real
  infrastructure.
- Manual cross-browser testing remains Chromium-only (desktop + mobile viewport/UA profile via
  Playwright); Firefox/WebKit are not installed locally and were not downloaded.
- Two vendored build artifacts in `public/wasm/` remain excluded from lint/format, unchanged.
- `docs/PRD.md`/`docs/ARCHITECTURE.md`/`docs/DEPLOYMENT.md` had only their **name** updated in
  this pass, not their full content — they still describe the CodeWise-era 6-track curriculum
  architecture accurately (since that's still exactly what exists), but do not yet describe the
  Phase 3–9 vision from the expansion brief. Rewriting them to describe unbuilt systems would
  violate the "do not report unfinished features as complete" rule; they'll be extended
  incrementally as each phase actually ships.
- The homepage `<title>` currently renders as "VisaSparkSchools — Learn. Build. Prove. |
  VisaSparkSchools" (the name appears twice, once from the page's own title and once from the
  root layout's `%s | {name}` template). This is a pre-existing minor cosmetic duplication from
  before this expansion (it would have shown the same doubled-name pattern with "CodeWise"
  previously) — not introduced by this rebrand, not fixed in this pass since it's outside Phase
  2's scope; worth a one-line fix (either give the homepage no explicit title, or exempt it from
  the template) in a future pass.

## If you pick this up next

Start with **Phase 3** exactly as scoped above: design the typed technology registry schema first
(it's the foundation everything else in Phase 3 depends on — category taxonomy, technology
directory, learning-path catalog, course-availability rules all read from it), get it reviewed
against the ~60-technology list in the brief, then build the directory UI incrementally,
validating with `npm run content:validate`-style checks as you go. Do not add navigation entries
for any Phase 3–9 surface until its destination page is real and non-empty. Re-run the full
verified-green command list above before and after each coherent chunk of work, exactly as this
session did.

## Pre-expansion baseline (preserved for history — this is what the old status doc recorded)

The CodeWise build (prior to this expansion) reported: production build/typecheck/lint/format/
content-validation/unit-integration tests (56 at that time)/Playwright e2e (30 at that time)
all green; a list of 7 bugs found and fixed during that build (async `params` handling, color-
contrast, keyboard-focusable scroll regions, Monaco CDN stylesheet blocked by CSP, mobile header
duplicate-nav bug, a `useHint` naming collision with `react-hooks/rules-of-hooks`, and assorted
lint cleanups); and the same "no live Supabase/Vercel" limitation recorded above. A subsequent
pre-deployment audit session (also prior to this expansion) found and fixed: a `.gitignore` bug
silently excluding `.env.example`, several hardcoded-branding instances, a false claim about
guest-to-account merge, a missing `server-only` guard on two AI files, missing rate limiting on
`/api/feedback`, an incomplete-redaction bug in the prompt-injection sanitizer, a genuine RLS bug
allowing a user to reset their own AI-tutor quota directly via the Supabase REST API, a heading-
order accessibility bug in the Quiz/ExercisePanel components, and a CSP bug blocking `eval()` in
Next.js dev mode. All of those fixes are preserved in the current codebase — this expansion built
on top of them, not from scratch.
