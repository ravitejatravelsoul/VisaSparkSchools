# Project Status — VisaSparkSchools

Last updated: 2026-08-02. This is the durable checklist for the CodeWise → VisaSparkSchools
expansion — update it precisely as work progresses. Do not mark anything done that hasn't
actually been run and verified. Do not mark a later phase complete based only on scaffolding.

## Baseline commit

`ba68107` — "feat: establish audited VisaSparkSchools platform baseline" — the entire CodeWise
build + the Phase 2 rebrand + the homepage duplicate-title fix, squashed into one locally
reviewed commit on top of the original `c9e1df0` scaffold commit. **Not pushed** (no remote is
configured for this repo).

## Phase 3 commit

`f85b1d8` — "feat: add audited technology directory and learning roadmaps" — the corrected
technology directory, categories, roadmaps, and `/learn` pages described below, committed locally
on top of `ba68107` after the full verification suite passed (format, lint, typecheck, content
validation, 137 unit tests, 110 e2e tests, production build). **Not pushed.** `ba68107` was not
amended or rewritten. **All Phase 4 work below is intentionally left uncommitted for review** —
do not commit it without the owner's explicit review.

## Phase 3 audit and corrections (before the Phase 3 commit)

The Phase 3 report above was treated as conditionally accepted, not proven, and independently
re-verified against source and executable tests before committing. Found and fixed:

- **Miscounted headline number.** The report's "9 technologies map to a real course" directly
  contradicted its own longer enumeration in the same document (which named more than 9). The real
  number, computed programmatically from the registry (not hand-counted): **17** map to a course,
  **6** to a runner, **11** to a project, **63** are guide-only, **12** have 2+ formats. A small
  script computing these from `getTechnologyAvailability()` was used and then deleted (not
  committed) — the numbers below are its output, not a manual retyping.
- **Two exaggerated course mappings, removed.** `intro-to-programming` claimed
  `how-computing-works` taught it; that course's actual lessons (verified by reading
  `content/lessons/foundations.ts` directly) cover computing/environment fundamentals (files,
  terminals, HTTP), not variables/loops/functions -- a real mismatch, not a close call. Fixed by
  removing the `courseId` and rewriting `whereItFits`/`practiceOptions` to state this honestly.
  `testing-fundamentals` claimed `python-fundamentals` as its course; that course devotes exactly
  1 of 8 lessons to testing, so a "Start course" button would have sent a learner looking for a
  testing course to a Python course. Fixed by removing the `courseId` (the guide still honestly
  mentions the one relevant lesson in `practiceOptions`, which was already accurate).
- **One exaggerated runner mapping, removed.** "Developer Tools" claimed `runnerSupport: "html"`,
  but the resulting "Open playground" button opened the plain, generic HTML/CSS/JS playground --
  no distinct Developer Tools activity exists. Removed; the guide's practice suggestion ("open
  your browser's DevTools alongside the playground") was already accurate and unaffected.
- **ai-foundations course mappings verified, not removed.** Checked each of the 9 mapped AI
  technologies (Artificial Intelligence, Generative AI, Machine Learning, Deep Learning, LLMs,
  Prompt Engineering, Embeddings, RAG, AI Agents) against the actual 14-lesson curriculum in
  `docs/CURRICULUM.md`/`content/lessons/ai-llm-rag.ts` -- every one has at least one dedicated
  lesson (RAG has five). These mappings were accurate and kept as-is.
- **Two real Lighthouse-caught bugs on `/technologies`, fixed**: a `heading-order` violation
  (`<h1>` followed directly by `<h3>` on each card, skipping `<h2>` -- changed to `<h2>`) and a
  severe CLS regression (0.928, caused by `<Suspense fallback={null}>` around the
  `useSearchParams()`-dependent filter/grid client component, which ships nothing in the static
  HTML and then pops in the entire 80-card grid after hydration). Fixed with a properly-sized
  skeleton fallback. Re-measured after the fix: performance 75→100, accessibility 98→100, CLS
  0.928→0.
- **A real, subtle text-rendering bug, found and fixed.** On the new `/learn` page, a JSX pattern
  of the form `{expr} literal text` on one source line rendered _without_ the space between them
  in the live DOM (verified via `document.body.innerText`, not just visual screenshot reading) --
  but only in specific cases; an identical-looking pattern on the pre-existing `/courses` page
  renders correctly. The trigger appears tied to `prettier --write` collapsing an explicit
  `{" "}` + line-break form (which does render correctly) back onto one line, silently
  reintroducing the missing space on the next format pass -- reproduced twice. Root-caused enough
  to fix confidently, not enough to explain the exact SWC/Turbopack JSX-whitespace mechanism.
  Fixed by switching every dynamic-count sentence on `/learn` to a single template-literal string
  per paragraph (immune to this class of bug, since Prettier can't rearrange string contents).
  Spot-checked (via the same DOM-text-extraction method, not screenshots) that `/categories`,
  `/roadmaps`, a category detail page, and a roadmap detail page do **not** exhibit the same
  issue today. **Not exhaustively re-verified across every pre-existing page in the codebase** --
  flagged here honestly as a real, only-partially-understood risk for a future pass, with a
  regression test (`tests/e2e/learn-page.spec.ts`) guarding the one confirmed instance.
- **Navigation simplified from 7 items back to 5.** Per instruction to prefer one clear "Learn"
  destination over separate top-level links: added `/learn` (links to Categories, Technology
  directory, Courses, Roadmaps, featured categories, and Playground/Search/Dashboard), removed
  the standalone "Categories" and "Technologies" primary-nav entries (still reachable from
  `/learn`, the footer, and cross-links everywhere), restoring the original 5-item nav
  (Learn/Courses/Projects/Playground/Search) and reverting the `md:`→`lg:` breakpoint change from
  the initial Phase 3 pass (no longer needed at 5 items).
- **Search-index clean-build verified, not just claimed.** Deleted `public/search-index.json`
  (gitignored, generated), ran `npm run build` from that clean state, confirmed it regenerated
  deterministically (172 documents, 0 draft leaks). Added `tests/unit/search-index-build.test.ts`
  (5 tests: determinism, type coverage, no-draft-leakage, no-oversized-documents, valid URLs) by
  exporting `buildIndex()` from the script (guarded with `require.main === module` so importing it
  for tests doesn't also write to disk as a side effect).
- **Roadmap and guide-quality audits**: automated checks (near-duplicate overview detection via
  Jaccard similarity, thin-core-concepts detection, duplicate-project-idea detection, reference-
  URL domain audit, placeholder-reviewer detection, identical-description detection) all came back
  clean -- 0 near-duplicates, 0 thin sections, 0 duplicate ideas, 0 invalid URLs, 0 placeholder
  reviewers, 0 identical descriptions across all 80 records. Manually spot-checked the
  Cybersecurity Foundations roadmap (the thinnest, at 1 core technology) for overclaiming -- its
  wording is already appropriately modest ("Foundations," not mastery). Not every one of the 80
  guides or 15 public roadmaps was individually re-read line-by-line in this pass; the mapping-
  layer audit above (course/runner references) was the highest-risk area and got full manual
  verification, while guide prose quality relied on the automated checks plus this session's
  original authoring care.

## Phase 4.5 commit

Committed locally on top of `c670ef1` as `feat: redesign the learner experience`, after the full
verification suite passed (format, lint, typecheck, content validation, 214 unit/integration
tests, the full Playwright suite including new focus-trap regression tests, production build,
axe accessibility sweep, and before/after Lighthouse). **Not pushed** (no remote configured).
`c670ef1` was not amended or rewritten.

## Overall status: Phase 1 (audit), Phase 2 (rebrand), Phase 3 (technology architecture), Phase 4 (learning and accounts), and Phase 4.5 (UI/UX redesign) complete, source-level audited, and verified. Phase 4 was independently reviewed against source (not the original report) before committing -- see "Phase 4 checkpoint audit" below for the 12 genuine defects found and fixed. Phase 4.5 is a presentation-only design-system pass on top of Phase 4 -- it changed no learning, account, sync, merge, privacy, enrollment, completion, roadmap, daily-goal, or recommendation behavior, and found/fixed 2 real pre-existing bugs plus a missing focus trap across 4 modal dialogs along the way (see "Phase 4.5 — UI/UX redesign" below). Each phase committed as its own local checkpoint commit; exact hashes recorded in `git log`. Phases 5–9 not started. Separately, a **Phase 5A — Interactive Curriculum Foundation** track (unrelated to the numbered "Phase 5" below, which is Aptitude/Reasoning/Career content) added a new TypeScript course and lab runner plus the schema/tooling/documentation foundation for future course batches — see "Phase 5A — Interactive Curriculum Foundation" below.

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
- [x] **Phase 3 — Navigation and technology architecture.** Complete. Details below. A 16-category
      taxonomy (13 public), an 80-technology directory across 13 data files, a centralized
      course/runner availability policy, 16 learning roadmaps (15 public), full navigation/search/
      SEO/sitemap integration, and comprehensive tests/visual QA — all implemented, not scaffolded.
- [x] **Phase 4 — Learning and accounts.** Complete. Details below (47-item report). Course
      enrollment/resume/derived completion, roadmap following with step-type-specific completion
      rules, project milestone tracking, a full guest-to-account sync lifecycle (merge/push/pull,
      sign-out and multi-account privacy, stale-response safety), a Supabase migration + RLS for
      the new tables (reviewed, not applied to any live project), a dashboard rebuilt around only
      real working systems, a non-punitive daily goal, a deterministic next-lesson recommendation,
      and a profile/preferences page — all implemented and tested, not scaffolded. Left
      intentionally uncommitted for review.
- [x] **Phase 4.5 — UI/UX redesign.** Complete. Details below. A cohesive "spark and pathway"
      visual design system (tokens, typography/spacing/motion rules, category- and track-accent
      colors, a reusable component set) applied across every route redesigned in Phases 1-4 —
      navigation, homepage, catalog, course/lesson pages, dashboard, roadmaps, profile/auth,
      technology directory/search/playground. Presentation and interaction only; no learning/
      account/sync behavior changed. Found and fixed 2 real pre-existing bugs (a mobile-nav
      containing-block/CSS bug, a Tailwind dynamic-class-generation bug silently dropping category
      accent colors) and added a missing keyboard focus trap to 4 modal dialogs that previously let
      Tab escape into the page behind them.
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

## Phase 3 — Navigation and technology architecture: what was actually done

Started by independently re-verifying the Phase 1–2 report rather than trusting it: re-read
PROJECT_STATUS.md/docs/PRD.md/ARCHITECTURE.md/BRANDING.md/SECURITY.md/CURRICULUM.md/AGENTS.md,
re-ran `git status --short`/`git diff --stat`/`git diff --check`/`git log`/
`git ls-files --others`, confirmed no secrets/env files/caches/test artifacts among the untracked
files, and manually re-verified the storage migration, logo rendering, and "remaining CodeWise
references are all intentional" claims rather than assuming them.

**Duplicate-title fix (before the baseline commit)**: `app/(site)/page.tsx`'s `metadata.title` was
a plain string, which the root layout's `%s | {name}` template then wrapped a second time. Fixed
by switching to `title: { absolute: ... }`, which Next.js documents as the exact mechanism for
opting a page out of an inherited title template. Covered by a new unit test
(`tests/unit/metadata-title.test.ts`, asserts the exact `metadata.title` shape) and a new e2e test
(`tests/e2e/navigation.spec.ts`, asserts the rendered `document.title` contains the product name
exactly once).

**Baseline commit**: after the fix, ran the complete verification suite (format/lint/typecheck/
content-validate/test/build/playwright — all green), reviewed the full untracked-file list before
staging (confirmed `public/search-index.json` is a generated artifact and added it to
`.gitignore` rather than committing it), staged everything else, and created `ba68107`. Git
identity was already configured (no blocker). Confirmed with `git status --short`/`git log` that
the working tree was clean immediately after and nothing was pushed (no remote configured).

**Category taxonomy** (`lib/directory/categories.ts`, `lib/directory/types.ts#categoryIdSchema`):
all 16 categories from the brief registered with the full record shape (id, slug, name,
descriptions, icon, order, searchKeywords, relatedCategoryIds, audience, publicVisibility,
featured). 13 are public; Quantitative Aptitude, Reasoning, and Career/GD Prep are registered
(so the type system and future Phase 5 content can reference stable ids) but kept
`publicVisibility: false` — `lib/directory/validate.ts` hard-fails the build if a public category
ever has zero public technologies, which is what keeps this honest rather than aspirational.

**Technology registry** (`lib/directory/data/*.ts`, 13 files by category): **80 technologies**,
covering every technology named in the brief (all 48 originally listed plus all 32 "modern
high-value" additions) plus "Developer Tools" itself as its own guide. Data Structures and
Algorithms is one canonical record (`dsa-field`), not duplicated per language. Every record has
genuine, original prose for every required field (what it is/why/where it fits, core concepts, an
original example with an explanation, use cases, project ideas, official references pointing at
each technology's actual authoritative source) — not a title-and-description placeholder. Legacy
technologies (AngularJS, jQuery) carry a `legacyNote` explaining both their legacy status and when
a learner will still encounter them; `content:validate` hard-fails if a `status: "legacy"` record
lacks one. W3.CSS's guide is 100% original prose but its one reference link correctly points at
W3Schools (its actual creator) — attributed, not claimed as this platform's own.

**Centralized availability policy** (`lib/directory/availability.ts`): a single function,
`getTechnologyAvailability()`, is the _only_ place that decides whether a guide may render "Start
course" or "Open playground" — it resolves a technology's `courseId`/`runnerSupport`/`projectIds`
_references_ against the live `lib/content/registry.ts` course/project data and the four actually-
implemented Playground runner modes (html/javascript/python/sql). Nothing else in the UI layer
makes this decision independently, so it can't contradict itself. Of the 80 technologies: **9 map
to a real existing course** (HTML, CSS, JavaScript, Python, SQL, Git, Intro to Programming, Intro
to HTML/CSS, and 9 AI/LLM/RAG-related technologies via the AI, LLMs & RAG course specifically —
see the exact list in `lib/directory/data/ai.ts`), **2 map to runner support without a full course**
(Developer Tools via the HTML/CSS/JS runner as a devtools-inspection sandbox), the rest are
honestly **guide-only**. Verified with a real e2e test that a guide-only technology (Kotlin) never
renders "Start course" or "Open playground," and that a course-backed technology (Python) and a
runner-backed technology (SQL, deep-linking to `/playground?lang=sql` via a small addition to
`playground-client.tsx`) do.

**Learning roadmaps** (`lib/directory/learning-paths.ts`): all 16 paths from the brief registered.
15 are public — every one of their required steps resolves to a real, existing guide/course/
project, enforced by `validate.ts`. `certificateEligible` and `finalAssessmentRequired` are
hard-failed to `false` on every path (public or draft) since neither a certificate nor assessment
system exists yet. Placement and Job Readiness is the one path kept internal, since its required
steps depend entirely on Aptitude/Reasoning/GD content that doesn't exist until Phase 5. Every
public roadmap page displays an explicit "this is a roadmap, not a certifiable, assessed course
path" notice.

**Pages** (`app/(site)/technologies/`, `/categories/`, `/roadmaps/`): directory listing with
client-side filters (category, difficulty, beginner-only, current/legacy/specialized/conceptual
status, has-course, has-runner, has-projects, alphabetical/recently-reviewed sort, free-text
search) serialized to the URL via `useSearchParams`/`router.replace` — filters derive directly
from the URL on every render (no local state to fall out of sync), so back/forward navigation and
page refresh reproduce the exact same filtered view for free, verified by a real e2e test. A
mobile filter drawer (focus-trapped, Escape-to-close) covers the same controls below the `sm:`
breakpoint. Technology guide, category, and roadmap detail pages are all server components with
`generateStaticParams`/`generateMetadata`, `notFound()` for any slug that doesn't resolve to a
public record (an internal-draft category/path 404s exactly like a nonexistent one).

**Navigation**: added "Categories" and "Technologies" to the primary nav (`lib/site-config.ts`);
"Roadmaps" added to the footer's Product column only, to avoid overloading the top nav. Since this
pushed primary nav to 7 items, the desktop-nav/mobile-nav breakpoint was moved from `md:` (768px)
to `lg:` (1024px) in both `header.tsx` and `mobile-nav.tsx` together, avoiding a wrap/overflow gap
at tablet widths that the original 5-item nav didn't have to account for. "Playground" was
deliberately **not** renamed to "Project Studio" (doesn't exist yet); no Study Studio/Certificates/
Aptitude/Reasoning/Career nav entries were added.

**Search**: `scripts/build-search-index.ts` now also indexes public technologies/categories/
roadmaps into the same `public/search-index.json` Fuse.js index (172 documents total, up from 64) — internal drafts are never included, since the script only calls the `getPublic*()`
accessors. Verified that the required abbreviations (JS, TS, DSA, AI, ML, LLM, RAG, CI/CD, QA) all
resolve to the right technology using the exact Fuse.js config the real search UI uses
(`tests/unit/directory-search-aliases.test.ts`), and end-to-end for JS/DSA specifically
(`tests/e2e/technology-directory.spec.ts`).

**SEO**: `app/sitemap.ts` includes every public category/technology/roadmap route and none of the
internal-draft ones. Technology guides use a `LearningResource` JSON-LD type (not `Course` — that
would be semantically wrong for a guide with no course behind it) with real, resolvable
`provider`/`url` fields.

**Real accessibility bug found and fixed**: the automated axe sweep (extended to cover
`/categories`, `/categories/artificial-intelligence`, `/technologies`, `/technologies/python`,
`/technologies/angularjs`, `/roadmaps`, `/roadmaps/complete-beginner-to-web-developer`) caught a
`link-in-text-block` violation on the category page's "Suggested starting point" link: styled
`hover:underline` only, with a 1.84:1 contrast ratio against surrounding body text (WCAG requires
3:1 for non-underlined inline links) — not distinguishable from plain text without hovering.
Fixed by switching every inline text link introduced in Phase 3 (8 occurrences across the
technology guide, category, and directory filter files, plus the new breadcrumbs component) to a
permanent `underline`, matching the pattern already established in `components/lesson/markdown.tsx`
for the original curriculum's inline prose links. Re-ran the full accessibility sweep afterward —
0 critical/serious violations across all 21 routes × 2 browser profiles (42 checks).

## Phase 4 — Learning and accounts: what was actually done

Status key used below, per the owner's instruction to distinguish these explicitly: **[tested]**
complete and execution-tested (unit/integration/e2e, actually run, actually green); **[mocked]**
complete, but the external integration (a live Supabase project) is mocked/faked in tests rather
than exercised for real, since no cloud project was provisioned; **[config]** complete but requires
migration/configuration before it does anything (e.g. a SQL migration that was written and
reviewed but not applied to any database); **[partial]** partially implemented; **[deferred]**
intentionally not built, with a stated reason; **[blocked]** could not be completed and why.

### Enrollment, resume, and derived completion (1-9)

1. **[tested]** Course enrollment is idempotent and works for guests and (once synced) signed-in
   accounts identically: `useProgressStore().enroll(courseId)` and the auto-enroll that fires from
   `viewLesson` both no-op on a course the learner is already enrolled in
   (`lib/learning/store.ts#ensureEnrolled`). Covered by
   `tests/unit/progress-store-phase4.test.ts` ("viewing a lesson idempotently enrolls...", "explicit
   enroll() is idempotent...") and `tests/e2e/phase4-learning-account.spec.ts` ("enrolling in a
   course via its overview page...").
2. **[tested]** Course resume: `EnrollmentState.lastAccessedLessonId`/`lastAccessedAt` update on
   every `viewLesson` call; `components/course/course-progress-actions.tsx` links "Continue this
   course" to that lesson, not always lesson 1.
3. **[tested]** Course completion is derived, never stored:
   `lib/learning/completion.ts#isCourseComplete` recomputes from `lessonStatus` on every call.
   Verified with a real, small course (`how-computing-works`, 3 lessons) in
   `tests/unit/completion.test.ts` and end-to-end in
   `tests/e2e/phase4-learning-account.spec.ts` ("completing every lesson in a course marks it
   Completed...").
4. **[tested]** Project milestone tracking: `toggleProjectMilestone` records/removes a milestone id
   in `projectProgress[projectId].completedMilestoneIds`; the project detail page's checklist
   (`components/project/project-milestone-checklist.tsx`) is a real interactive checkbox list, not
   static prose.
5. **[tested]** Project completion is likewise derived (`isProjectComplete` — every milestone id
   present), never a stored flag. E2E-verified with `personal-portfolio-page` (3 milestones).
6. **[tested]** Roadmap "starting": `startRoadmap(pathSlug)` is idempotent (first call only) and
   creates a `roadmapProgress` entry; also sets the roadmap as the learner's `currentRoadmapId`
   (used by the dashboard and next-lesson recommendation — item 33).
7. **[tested]** Roadmap `course`/`project` steps resolve their status live from real lesson/
   milestone data (`resolveStepStatus`) — never a separately-toggleable checkbox, so they can never
   contradict the underlying course/project. Verified end-to-end: completing every lesson of a
   roadmap's course step flips it to "Completed" with **no click involved**
   (`tests/e2e/phase4-learning-account.spec.ts`, "a roadmap's course step completes
   automatically...").
8. **[tested]** Roadmap `technology-guide`/`practice`/`assessment` steps have no other derivable
   signal, so they're self-reported via `toggleRoadmapStep` — the _only_ step types ever written to
   `completedStepIds`. A "Mark complete"/"Mark incomplete" button appears only for these types
   (`components/roadmap/roadmap-progress.tsx`); course/project steps never show one — verified
   explicitly in the same e2e test above (`expect(...getByRole("button", {name: /mark/i})).toHaveCount(0)`
   on a course step).
9. **[tested]** Roadmap completion (`isRoadmapComplete`, all _required_ steps completed) and a
   percent-complete figure (`getRoadmapCompletionPercent`) are both derived on demand from the same
   `resolveStepStatus` used per-step, so the whole-roadmap number can never disagree with what the
   step list shows.

### ProgressState v3, merge, and versioned conflicts (10-16)

10. **[tested]** `ProgressState` bumped from version 2 to 3 (`lib/learning/types.ts`), adding
    `enrollments`, `roadmapProgress`, `projectProgress`, `activity`, and `profile`, plus changing
    `notes` from `Record<string, string>` to a versioned `Record<string, NoteState>`. Migration
    (`lib/learning/storage.ts#migrate`) handles v1/v2 → v3 including converting old plain-string
    notes into the new shape; `tests/unit/storage-migration.test.ts` (unchanged, still green) plus
    new coverage in the merge tests confirm this.
11. **[tested]** `mergeProgress` extended for enrollments: earliest `enrolledAt` wins, latest
    `lastAccessedAt`/`lastAccessedLessonId` wins (a real "latest-timestamp for last-accessed" rule,
    not a placeholder).
12. **[tested]** `mergeProgress` extended for roadmap progress: earliest `startedAt`, latest
    `lastAccessedAt`, **union** of `completedStepIds` (a self-reported step marked complete on
    either device stays complete after merge — never silently un-marked).
13. **[tested]** `mergeProgress` extended for project progress: union of `completedMilestoneIds`,
    same reasoning as roadmap steps.
14. **[tested]** `mergeProgress` extended for the activity feed: merged by event id (idempotent —
    the same event logged on two devices collapses to one entry, keeping the earliest occurrence),
    re-sorted newest-first, capped at 50.
15. **[tested]** Notes get real versioning, not just a "prefer local" coin-flip like the pre-Phase-4
    stub: `NoteState { text, updatedAt, conflict? }`. A genuine conflict (both sides edited the same
    lesson's note to different text) keeps the more recently edited text as the primary value but
    preserves the other under `conflict` instead of discarding it — surfaced in
    `components/lesson/notes-panel.tsx` with "Restore this version instead" / "Discard it" actions.
    This is the concrete implementation of the "never silently overwrite" requirement for notes.
    Unit-tested for both the no-conflict (identical text, newer wins) and genuine-conflict cases.
16. **[tested]** Profile preferences merge as a whole object by `updatedAt` (last-write-wins), with
    one deliberate exception found and fixed during this work: an all-null profile (e.g. the empty
    row Supabase's `handle_new_user` trigger creates at sign-up, timestamped "now" regardless of
    whether the learner ever touched it) never outranks a side with real preferences set, no matter
    which timestamp is newer — otherwise signing up right after setting a guest learning goal would
    silently erase it. Regression-tested
    (`tests/unit/progress-merge.test.ts`, "never lets an empty auto-created remote profile row
    outrank real local preferences...").

### Guest-to-account sync lifecycle (17-24)

17. **[mocked]** Steps 1-2 (snapshot guest state, sign-in): `components/auth/auth-provider.tsx`
    snapshots `useProgressStore.getState().state` at the moment a `SIGNED_IN` auth event fires,
    before touching any storage key.
18. **[mocked]** Steps 3-5 (load remote / deterministic merge / persist remotely):
    `lib/sync/lifecycle.ts#syncGuestToAccount` — pull (`lib/sync/pull.ts`, reads all 15 Phase 3+4
    tables for the user), merge (`mergeProgress`), push (`lib/sync/push.ts`, all upserts). Proven
    with a fake in-memory Supabase client (`tests/unit/helpers/fake-supabase.ts`) exercising a full
    round trip, a second-device merge scenario, and idempotent-quiz-history behavior
    (`tests/unit/sync-lifecycle.test.ts`, 4 tests). **Not** run against a real Supabase project — no
    cloud resources were provisioned for this beta (explicitly out of scope per the owner's
    constraints).
19. **[tested]** Step 6 (update local cache only after a valid merge): the merged state is only
    written to the account's local cache key and applied to the in-memory store _after_
    `syncGuestToAccount` resolves successfully **and** the sign-in that started it is still current
    (see item 24) — never optimistically before that.
20. **[tested]** Step 7 (record sync completion): `lib/sync/sync-status-store.ts` tracks
    `idle`/`syncing`/`synced`/`error` plus `lastSyncedAt`, surfaced on the dashboard's "Sync status"
    card (only rendered when Supabase is enabled and a session exists).
21. **[tested]** Step 8 (retriable failures): a thrown pull/push error is caught, sets
    `status: "error"` with the message, and leaves the learner's in-memory state as their guest
    snapshot (nothing already on the device is lost) rather than a partial/corrupt merge. The
    dashboard's error state shows a "Retry sync" button wired to `retrySync()`
    (`components/auth/auth-provider.tsx`).
22. **[tested]** Step 9 (idempotent repeat sign-in): guaranteed by construction (merge is
    union/max/latest-wins, push is upsert-based) and directly tested —
    `tests/unit/sync-lifecycle.test.ts` calls `syncGuestToAccount` twice with the same state and
    asserts zero duplicate rows across every table, including the append-only `quiz_attempts`
    history table (which gets special "only insert if the result actually changed" handling in
    `lib/sync/push.ts#pushQuizResults` specifically to preserve this property).
23. **[tested]** Sign-out/multi-account privacy: signed-in progress is cached under a per-account
    key (`visasparkschools:progress:<userId>`, `lib/learning/storage.ts#perUserStorageKey`), never
    the shared guest key; the guest key is cleared once folded into an account at sign-in. Signing
    out switches persistence back to the guest key and reloads it — which, having been cleared, does
    not contain the just-signed-out account's data. Verified end-to-end against a mocked auth
    provider: `tests/integration/auth-provider.test.tsx`, "sign-out reverts to the guest key and
    clears the session -- the signed-in account's data never leaks through."
24. **[tested]** Stale-response safety: a `generation` counter in `AuthProvider` increments on every
    sign-in/sign-out; a sync response is only applied if its generation is still current. Two race
    conditions are explicitly tested in `tests/integration/auth-provider.test.tsx`: (a) account A
    signs in, account B signs in before A's sync resolves, A's late response is discarded and B's
    session is left intact; (b) a learner signs in then signs out before the sync resolves, the late
    response cannot resurrect a signed-in state.

### Supabase-optional behavior and schema (25-29)

25. **[tested]** The entire feature set above works identically with Supabase completely unset —
    `featureFlags.supabaseEnabled` is `false` by default (`lib/site-config.ts`), `AuthProvider`'s
    effect returns immediately, and every enrollment/roadmap/project/profile action operates purely
    on the guest localStorage key. This build's own dev environment has no Supabase env vars set, so
    every e2e test in `tests/e2e/phase4-learning-account.spec.ts` runs in exactly this mode already.
26. **[config]** New migration `supabase/migrations/0002_phase4_learning_accounts.sql`: `enrollments`,
    `roadmap_progress`, `roadmap_step_completions`, `project_progress`,
    `project_milestone_completions`, `activity_log` (all UUID PKs, FKs to `auth.users` with
    `on delete cascade`, explicit unique constraints matching the app's natural keys), plus `alter
table` additions to the existing `profiles` (`learning_goal`, `current_roadmap_id`, `timezone`)
    and `notes` (`conflict_text`, `conflict_updated_at`) tables rather than new 1:1 tables — reviewed
    and idempotent (`create table if not exists`, `add column if not exists`) but **not applied to
    any live project**, per the explicit constraint that this build provisions no cloud resources.
27. **[config]** RLS: every new table follows the same `auth.uid() = user_id` "owner: all" policy
    pattern as `0001_init.sql`'s tables — no new `security definer` functions were needed, since
    nothing here has an anti-abuse-quota concern like `tutor_usage` did. `docs/SECURITY.md`'s RLS
    verification procedure was updated to include the new tables.
28. **[config]** Deliberately did _not_ add a separate `preferences` table (a literal reading of
    "preferences" as one of the "genuinely needed" new tables would have produced a redundant 1:1
    table next to `profiles`) — extended `profiles` instead, documented as a deviation with reasoning
    in the migration file's header comment.
29. **[config]** Sync metadata (last-synced-at, sync status) was deliberately kept **client-side
    only** (`lib/sync/sync-status-store.ts`), not a server table — a server-side table would need its
    own per-device rows to mean anything for a multi-device learner, which is unneeded complexity for
    this phase; documented as a deviation in the same migration header.

### Dashboard, daily goal, recommendation, profile (30-38)

30. **[tested]** Dashboard rebuilt (`components/dashboard/dashboard-client.tsx`) to only ever render
    sections backed by real, working systems: sync status (signed-in + Supabase-enabled only),
    stat cards, continue-learning recommendation, current roadmap, enrolled courses, projects in
    progress, progress-by-skill, due-for-review, recent activity, recently viewed, bookmarks, notes,
    daily goal. **No** cards for Aptitude/Reasoning/Mock tests/GD/Study Studio/Project Studio/
    Certificates exist anywhere in this component or page — verified by reading the full file, not
    just by omission.
31. **[tested]** Sync status card shows `idle`/`syncing`/`synced`/`error` with a real retry action;
    only rendered when `featureFlags.supabaseEnabled && userId` — never a fake/static status.
32. **[tested]** Non-punitive daily goal: `lib/learning/daily-goal.ts#getDailyGoalStatus` computes
    "minutes learned today" as the **real** sum of `estimatedMinutes` for lessons whose
    `lesson-completed` activity event falls on today's local date (via `Intl.DateTimeFormat`,
    timezone-safe — falls back to UTC for an invalid/unsupported timezone string rather than
    throwing). Missing a day never erases anything: there is no reset/deletion of `lessonStatus` or
    `activity`, only a different "today" slice being read. Unit-tested including an explicit
    timezone-boundary case (the same instant falling on different local dates in UTC vs.
    `Europe/Paris`) and end-to-end (`tests/e2e/phase4-learning-account.spec.ts`, "the dashboard's
    daily goal reflects real minutes from lessons completed today, not a fake timer").
33. **[tested]** Deterministic next-lesson recommendation
    (`lib/learning/recommendation.ts#getNextLessonRecommendation`): an explicit, ordered, documented
    priority function — resume an in-progress lesson → continue the current roadmap's next required
    course step → continue the most recently accessed enrolled course → start the platform's first
    lesson — not AI, and its own docstring says so. All four priority tiers are individually unit-
    tested (`tests/unit/recommendation.test.ts`, 6 tests) plus an end-to-end check that the dashboard
    actually surfaces it.
34. **[tested]** `/profile` page (`app/(site)/profile/page.tsx` +
    `components/profile/profile-form.tsx`): display name, learning goal, timezone (free text, with
    the device's detected timezone shown as a placeholder/hint), and a current-roadmap dropdown
    sourced from the real public roadmap registry. Explicit guest-vs-signed-in messaging. The
    light/dark theme toggle is _not_ duplicated here — the form links to the existing header toggle
    instead, per the "reuse existing systems" instruction.
35. **[tested]** Sign-out UI: `components/auth/account-nav.tsx` (desktop header + mobile drawer)
    shows "Sign in" for guests/unconfigured deployments and a real "Sign out" button
    (`supabase.auth.signOut()`) for a signed-in session — there was previously no sign-out control
    anywhere in the app.
36. **[tested]** Activity feed: a small, explicit 9-type allowlist
    (`lib/learning/types.ts#ActivityEventType` — lesson-completed, course-enrolled,
    course-completed, roadmap-started, roadmap-step-completed, roadmap-completed,
    project-milestone-completed, project-completed, bookmark-added), each with a stable, idempotent
    id (e.g. `lesson-completed:${lessonId}`) so logging the same event twice never duplicates it —
    enforced by `logActivity`'s dedupe-by-id logic and covered in
    `tests/unit/progress-store-phase4.test.ts`.
37. **[tested]** Bookmarks and notes reuse the exact same `ProgressState` fields and store actions
    that existed before Phase 4 (`toggleBookmark`, `setNote`) — extended (notes versioning), never
    duplicated into a second system. `components/lesson/notes-panel.tsx` updated for the new
    `NoteState` shape and given a conflict-resolution UI (item 15); `components/lesson/bookmark-
button.tsx` untouched, since its existing behavior was already correct.
38. **[tested]** Course/roadmap/project pages wired to real interactive components instead of static
    prose: `CourseProgressActions` (course overview page), `RoadmapStartControls`/`RoadmapStepList`
    (roadmap detail page), `ProjectMilestoneChecklist` (project detail page) — all client components
    reading/writing the same `useProgressStore`.

### Explicitly deferred (39-40)

39. **[deferred]** Course reviews were not implemented, per the owner's explicit instruction: a
    review system needs a full moderation/abuse/ownership model to be trustworthy (who can post,
    edit, delete; spam/abuse handling; verifying the reviewer actually took the course), none of
    which exists or was in scope for this phase. Building reviews without that model would ship a
    feature this project's own honesty standard (see the Phase 3 "never overclaim" principle) would
    immediately flag as a liability.
40. **[deferred]** Per-exercise saved code (`lib/learning/use-persisted-code.ts`, the editor's
    "restore my last attempt" convenience) was **not** added to the Supabase sync layer. No Phase 4
    requirement named it explicitly among the tables to add, it has no existing Supabase table to
    extend, and promoting it would need its own migration, RLS policy, and merge rule (large diffs
    of saved code conflict very differently than short text notes do). Documented here rather than
    silently left out.

### Testing (41-43)

41. **[tested]** Unit tests: 6 new files —
    `tests/unit/completion.test.ts` (12 tests: course/project/roadmap-step/roadmap derivation),
    `tests/unit/daily-goal.test.ts` (6 tests, including the timezone-boundary case),
    `tests/unit/recommendation.test.ts` (6 tests, one per priority tier plus the "nothing left"
    case), `tests/unit/progress-store-phase4.test.ts` (12 tests, every new store action),
    `tests/unit/sync-lifecycle.test.ts` (4 tests, fake-Supabase-client round trip/idempotency/
    multi-device merge), and 9 new cases added to the existing `tests/unit/progress-merge.test.ts`.
    Full suite: **188 tests across 26 files, all passing** (`npm run test`).
42. **[tested]** Integration test: `tests/integration/auth-provider.test.tsx` (4 tests) — the sign-
    in/sign-out/stale-response privacy guarantees (items 23-24), run against a mocked Supabase
    client and a mocked `lib/sync/lifecycle` module with controllable, deferred promises so the race
    conditions are actually reproducible rather than asserted by inspection.
43. **[tested]** E2E: `tests/e2e/phase4-learning-account.spec.ts` (9 tests × 2 browser projects = 18
    runs) covering enrollment/resume, course/roadmap/project completion (including the
    "never a separate click" derived-step guarantee), the dashboard's courses/roadmap/daily-goal
    sections, and profile persistence. `tests/e2e/accessibility.spec.ts` extended with `/profile`,
    `/courses/how-computing-works`, `/projects/personal-portfolio-page`. Full e2e suite after all
    Phase 4 changes: **134 passed, 4 skipped (expected mobile-viewport skips), 0 failed**.

### Bugs found and fixed during this phase, and visual QA (44-47)

44. **A real bug found and fixed**: roadmap progress/`currentRoadmapId` were initially keyed by
    `LearningPath.id` (e.g. `"beginner-to-web-developer"`) in the new UI components, but
    `getRoadmapBySlugSafe`/`getLearningPathBySlug` (pre-existing, used everywhere else in the app)
    look up by `.slug` (e.g. `"complete-beginner-to-web-developer"`) — for this roadmap the two
    differ. This silently broke "set as current roadmap" and the dashboard's "Your current roadmap"
    section (the roadmap would start/track correctly, but never resolve back to a display name).
    Caught by the e2e test in item 43, not by unit tests alone (the unit tests happened to already
    use the slug correctly) — a concrete example of why the end-to-end pass matters. Fixed by
    standardizing on `.slug` as the roadmap identifier everywhere (`components/roadmap/roadmap-
progress.tsx`, `components/profile/profile-form.tsx`'s roadmap `<select>`, and the corresponding
    unit test in `tests/unit/completion.test.ts`), re-verified with the full suite afterward.
45. **A real accessibility bug found and fixed**: the automated axe sweep caught a `select-name`
    (critical impact) violation on `/profile` — the "Current roadmap" `<select>` had a visually
    adjacent `<h2>` label but no programmatic association. Fixed by converting it to a proper
    `<label htmlFor="current-roadmap">`/`<select id="current-roadmap">` pair, matching the pattern
    already used for the other profile fields. Re-ran the accessibility spec for `/profile` on both
    browser projects afterward — 0 violations.
46. **A real RSC serialization bug found and fixed**: the roadmap detail page's `stepHref` was
    originally a plain function passed as a prop from the (server) page component into the (client)
    `RoadmapStepList` — functions aren't serializable across the server/client boundary, and this
    broke `npm run build` outright (`Functions cannot be passed directly to Client Components`).
    Fixed by moving the (purely data-driven, side-effect-free) `stepHref` logic into the client
    component itself, since it only reads the same statically-bundled registries either way.
47. **[tested]** Visual QA: `/dashboard`, `/profile`, a course overview page, a roadmap detail page,
    and a project detail page were screenshotted at 375px and 1440px, light and dark (20 screenshots
    total, via a temporary Playwright spec deleted after use — not committed), and manually reviewed
    for layout/contrast/overflow issues. No issues found; the derived-step "no self-report button"
    behavior and the milestone checklist's progress bar were both visually confirmed, not just
    asserted in tests.

## Phase 4 checkpoint audit — source-level review before committing

The Phase 4 summary above (items 1-47) was treated as a claim, not proof, per explicit
instruction. Before committing, every uncommitted Phase 4 file was re-read from source (not
re-summarized from the report), including the storage/sync/store implementation, the migration
SQL line by line against `0001_init.sql`, every Phase 4 test file's actual assertions, and every
Phase 4 UI component. This found **12 genuine defects**, several serious, none of which the
original test suite caught (all now have regression tests). Fixed, in order of severity:

1. **Cross-roadmap step-id collision (the most serious finding).** Roadmap step ids are short,
   roadmap-local strings ("s1", "s2", ...) reused by nearly every one of the 16 roadmaps (verified:
   all 16 use "s1" as their first step). `resolveStepStatus()` searched **every** roadmap's
   `completedStepIds` instead of only the roadmap that owns the step, so marking a self-reported
   step complete in one roadmap made every other roadmap's same-numbered step show complete too —
   a real, everyday-use bug, not an edge case. Fixed by requiring the owning roadmap's slug as a
   parameter; regression test in `tests/unit/completion.test.ts` proves two different roadmaps'
   colliding "s1" steps stay independent.
2. **`retrySync` had no staleness guard at all**, and on success never switched the active storage
   key or cleared the guest key — meaning a successful retry silently kept writing the account's
   progress into the shared guest localStorage key, and a retry resolving after sign-out could
   silently re-establish a signed-in-looking state. Fixed by consolidating all sign-in/sign-out/
   retry orchestration into one module-scoped generation counter (`lib/sync/orchestrator.ts`,
   replacing logic that was split between `auth-provider.tsx`'s closure state and a standalone
   function with no way to share it). 4 new tests in `tests/integration/auth-provider.test.tsx`
   reproduce both bugs and prove the fix, including a stale-retry-after-signout race.
3. **A failed sync's error handler persisted the unmerged guest snapshot into the account's
   per-user cache key**, silently clobbering any real data already cached there from a previous
   successful sync on the same device. Fixed by leaving storage untouched on failure (the in-memory
   store already equals the pre-sync snapshot; there is nothing to write).
4. **Profile `updated_at` was never sent to Supabase** in `push.ts`'s upsert payload, so the DB
   column stayed frozen at the `handle_new_user` trigger's signup timestamp forever — silently
   breaking `mergeProgress`'s last-write-wins comparison for every profile edit after the first
   (an older edit could beat a newer one on the next merge). The existing fake-Supabase test client
   masked this by force-refreshing `updated_at` on every upsert regardless of payload, which is not
   how Postgres `ON CONFLICT DO UPDATE` behaves — fixed the fake too (only touches columns actually
   present in the payload) so it could catch this class of bug, then fixed `push.ts` to send it.
5. **`localDateKey` could throw an uncaught `RangeError`** on a malformed/invalid activity
   timestamp: both `Intl.DateTimeFormat.format()` and `Date.prototype.toISOString()` throw on an
   invalid `Date`, and the fallback path called the second inside the catch for the first. Fixed
   with an explicit `Number.isNaN(at.getTime())` guard before either is attempted.
6. **`setDailyGoal` had no validation** beyond the `<input min max>` HTML attribute (a UI hint
   only, trivially bypassed) — accepted `NaN`/negative/huge values, which also produced an invalid
   CSS width on the dashboard's progress bar. Clamped to `[5, 180]` in the store action itself.
7. **`setProfile`'s `timezone` accepted any string**, including invalid IANA zone names (silently
   handled at read time by falling back to UTC, but never rejected at write time as the spec
   required). Validated via `Intl.DateTimeFormat` construction (throws for an invalid zone) in the
   store action; a bad field no longer blocks other valid fields in the same patch.
8. **`startRoadmap`, `toggleRoadmapStep`, and `setProfile({ currentRoadmapId })` had no gate against
   an unknown or internal/draft roadmap id** — the one internal roadmap (Placement and Job
   Readiness) and any made-up id could be "started"/selected via a direct store call or hand-edited
   localStorage, even though the UI never exposes this (the page 404s first). Fixed by gating all
   three on `getRoadmapBySlugSafe`, and `toggleRoadmapStep` additionally on the step id actually
   belonging to that roadmap and being a self-reportable type (course/project steps rejected too,
   not just inert).
9. **`enroll`/`ensureEnrolled` and `toggleProjectMilestone` had the same gap** for unknown course
   ids and unknown project/milestone ids. Fixed the same way.
10. **`recommendation.ts`'s "resume where you left off" rule picked by `Object.entries` insertion
    order**, not actual recency, despite its own docstring's claim — starting lesson A then B then
    re-viewing A would still recommend B. Fixed to prefer `recentlyViewed` (already ordered
    most-recent-first), falling back to the old scan only if the in-progress lesson fell out of
    the capped-at-10 recently-viewed window.
11. **The dashboard's `!hydrated` loading state was a single line of text**, causing a real,
    Lighthouse-measured CLS of 0.588 (well into "poor") once the full page swapped in after
    client-side hydration — the same class of bug fixed on `/technologies` in Phase 3, reintroduced
    here. Fixed with a properly-sized skeleton; re-measured CLS 0.588 → 0, performance 63 → 85.
12. **`/profile` was missing from `robots.ts`'s disallow list** even though the equivalent private
    page `/dashboard` was already excluded — an inconsistency introduced by adding the page in
    Phase 4 without updating the pre-existing robots rule. Added `/profile` to the disallow list.

Additional hardening applied alongside the above, not bugs but explicit audit requirements:
dashboard note previews now truncate at 120 characters instead of rendering full private note text
inline; `supabase/migrations/0002_phase4_learning_accounts.sql` gained explicit length CHECK
constraints on `profiles.display_name`/`learning_goal`/`timezone` (an HTML `maxLength` is a UI hint
only, not a real constraint) plus a defensive truncation in `handle_new_user()` so an oversized
metadata value can never fail the trigger and block signup; `supabase/verify-rls.sql` is a new,
concrete, reproducible two-user RLS verification script (statically reviewed against both
migrations, **not executed** — no PostgreSQL-compatible local tooling was available, exactly as
`docs/SECURITY.md` already disclosed for the rest of the RLS story).

**Documentation accuracy correction**: `docs/ARCHITECTURE.md`, `README.md`, `docs/PRD.md`, and
`docs/DEPLOYMENT.md` all overclaimed continuous/ongoing sync ("keeps pushing local changes... from
then on", "kept in sync going forward"). The actual, correct behavior is: a sync runs once per
sign-in and again on a manual retry after a failure — **not** continuously or on every mutation.
Local changes made after a successful sign-in are cached to that account's local key immediately
but are only pushed to Supabase the next time a sync actually runs. All four docs corrected to
state this precisely, and `docs/ARCHITECTURE.md`'s sync section rewritten to describe the actual
`lib/sync/orchestrator.ts` architecture instead of the pre-refactor version.

**Verification after all fixes** (exact, re-run, not copied from the original report):
`npm run format:check`/`lint`/`typecheck`/`content:validate` all clean; `npm run test` — **214
tests across 26 files** (193 unit in 21 files + 21 integration in 5 files), all passing;
`npx playwright test --list` — **69 unique end-to-end scenarios across 10 files**, run against
**2 browser projects** for **138 total scheduled executions** (134 passed, 4 intentionally skipped
via `test.skip(isMobile, ...)` guards on desktop-only filter/nav tests, 0 failed — confirmed with a
full, untruncated `--reporter=line` run, since an earlier background-captured run's log was
truncated and could not be trusted); `npm run build` clean; a full accessibility sweep (25 routes
× 2 browser projects = 50 checks) is 0 critical/serious violations; Lighthouse (production build,
`localhost`, headless Chrome) on `/` (performance 86, accessibility 100, CLS 0), `/dashboard`
(performance 85 after the CLS fix, accessibility 100, CLS 0, SEO 63 — expected and correct, since
`/dashboard` is deliberately `noindex`), and a course overview page (performance 84, accessibility
100, CLS 0) — no runner/Monaco/Pyodide/sql.js/AI imports found anywhere in the Phase 4 dashboard/
profile/course/roadmap/project components (verified by grep, no bundle analyzer is configured in
this project). Manual console/network check across 8 key pages in Supabase-disabled mode: 0
console errors, 0 failed requests.

## Phase 4.5 — UI/UX redesign: what was actually done

Governing instruction: the application was functionally strong (Phases 1-4) but visually generic —
perform a complete UI/UX audit and cohesive, student-focused visual redesign, presentation and
interaction only, with an explicit "not authorized" list covering every learning/account/sync/
privacy/completion/recommendation behavior. Began by actually running the app and taking baseline
screenshots (light/dark, 375/1440px) of the homepage, catalog, a course overview, a lesson, the
dashboard, a roadmap, and the technology directory before writing any code — confirmed the premise
was accurate: a generic template-like homepage, zero visual differentiation between course/
technology cards of different subjects, and no trace of any "pathway" motif on the one page
(`/paths`) whose entire content is a literally ordered sequence of steps.

### Design system (tokens → primitives → pages)

**Tokens** (`app/globals.css`): a "spark and pathway" direction — the existing brand green kept as
primary, the existing amber reserved exclusively for the brand's own accent (never reused for
category color, so a category chip is never mistaken for a call-to-action); added 7 muted
category/track accent hues (blue/purple/teal/rose/indigo/cyan/lime), each with a light-mode and
dark-mode value plus a paired light-tint "contrast" value for chip backgrounds; added
`--color-surface-sunken`, `--color-brand-soft`, and dedicated success/warning/danger/info
"contrast" tokens (previously `success` badges reused the unrelated `brand-contrast` token — an
inconsistency fixed in passing); added three motion tokens (`--motion-fast`/`--motion-base`/
`--motion-ease`) so every transition in the app now shares one timing vocabulary instead of ad hoc
per-component durations; added a `.reading-column` (42rem) rule for comfortable lesson-prose width
and a `.path-track`/`.path-track-line` pair for the connecting-line pathway motif (its line
position is a CSS custom property, `--track-line-left`, set per call site so the same rule serves
both a centered vertical timeline and a left-aligned marker column). No existing token was renamed
or removed, and no default Tailwind color palette is used anywhere in this codebase (confirmed
unchanged) — every color in every component below resolves through one of these named tokens.

**Primitives** (`components/ui/`, `lib/ui/`): `ProgressBar` (consolidates 4 previously separate
hand-rolled `<div>`-with-inline-width progress bars — course overview, dashboard course rows,
dashboard skill mastery, dashboard daily goal, roadmap completion — into one component with real
`role="progressbar"` semantics; two of the four originals had no ARIA attributes at all before this
pass), `Alert` (a calm, left-border status banner — replaces one-off status boxes for sync status,
the roadmap "not a certifiable path" notice, the legacy-technology notice, and auth form messages;
`role="alert"` only for warning/danger tones, `role="status"` otherwise, so a routine sync hiccup
doesn't interrupt a screen reader the way a real error should), `EmptyState`, `PageHeader`/
`SectionHeader` (replace ad hoc `<h1 className="text-3xl font-bold">` pairs repeated near-
identically across ~15 pages), `Skeleton` (a single loading-placeholder primitive now used by all
three CLS-sensitive skeletons — dashboard, technology directory, and the newly-added playground
one, see below), `StepMarker` (the numbered/checked circular marker for the pathway motif, status-
driven — not-started/in-progress/completed — with a `current` ring variant; meaning is never
color-only, since the check glyph and the number both carry it independent of color), a small
hand-drawn icon set (`components/ui/icons.tsx`, same 24×24/`currentColor` convention as the
existing `CategoryIcon`, replacing unicode glyphs `»`/`«`/`☰`/`✓`/`→` that were scattered across the
app with inconsistent sizing), `lib/ui/category-accent.ts` (explicit category-id → hue map, plus a
`bar`/`chipBg`/`chipFg`/`border` class set per hue), `lib/ui/track-accent.ts` (the same idea for
the 6 learning tracks), and `lib/ui/difficulty.ts` (`beginner`/`intermediate`/`advanced` → badge
tone, so difficulty is visually differentiated everywhere it appears, not just labeled). `Button`
gained an `accent` variant and a `ref` prop (needed for the focus-trap work below — added as a
plain typed prop, not `forwardRef`, since this is React 19). `Card` gained an `interactive` prop
(hover lift + border/shadow transition, for any card that is itself a link/button target). `Badge`
gained `warning`/`danger`/`info` tones and an optional `dot` (a small colored dot before the label,
so status is never conveyed by badge color alone — the label text and, optionally, the dot both
carry it).

### Two real bugs found during this pass (not assumed from reading code — confirmed by rendering)

1. **A genuine CSS containing-block bug in the mobile navigation drawer**, found by actually
   opening it and screenshotting the result rather than trusting the markup: `Header`'s sticky bar
   has `backdrop-blur` (a `backdrop-filter`), which — like `filter` — creates a new containing
   block for `position: fixed` descendants per the CSS spec. `MobileNav`'s drawer, nested inside
   `<header>`, was a `fixed inset-0` panel; with a `backdrop-filter` ancestor, "fixed" resolved
   against the header's own small box instead of the viewport, so the drawer rendered squeezed into
   a 64px-tall strip with the rest of the page bleeding through underneath it — a real, pre-existing
   bug (present before this session), not something this redesign introduced, just never visually
   verified until now. Fixed by rendering the drawer through a React portal to `document.body`
   (`createPortal`), which is unaffected by any ancestor's `filter`/`backdrop-filter`/`transform`.
2. **A Tailwind v4 dynamic-class-generation bug**, found the same way: `lib/ui/category-accent.ts`'s
   first draft built class names via template-literal interpolation
   (`` `border-(--accent-${hue})` ``); Tailwind's build-time scanner only recognizes complete,
   literal class-name strings in source text, so every category/track accent color silently
   generated no CSS at all — every "colored" card rendered with the same neutral border, confirmed
   by screenshotting the catalog page and by reading the computed `border-top-color` directly (it
   matched the neutral token exactly, not the intended hue). Fixed by rewriting the module as an
   explicit per-hue literal map instead of computed strings — and, once real colors did render,
   found a second-order issue: any element that already carries a `border` (all four sides,
   including a card's own default border) cannot reliably have just one side recolored by a second,
   separately-generated `border-color` utility class, because two same-property utility classes
   resolve by their position in the _compiled_ stylesheet, not by their order in `className`. Fixed
   by using a small colored top `background-color` bar (a new `bar` field on the accent map) instead
   of a border-color override wherever a card needed a category/track accent alongside its existing
   border — this has no such collision risk and reads more clearly as an accent stripe besides.

### A pre-existing false marketing claim, corrected

`siteConfig.description` (and its copies in `docs/BRANDING.md`'s positioning statement) claimed
"honest completion certificates" as a current, delivered feature. Certificates are Phase 8, not
implemented — `README.md` already correctly said "No certificates... included in this beta," so the
two docs directly contradicted each other, and the homepage surfaced the false claim to every
visitor. Since this exact copy is what the homepage redesign put front and center, fixed it in
place: replaced with "real runnable code" (accurate, verifiable, already true today) in both
`lib/site-config.ts` and `docs/BRANDING.md`, and clarified `docs/BRANDING.md`'s voice/tone section
to state plainly that certificates aren't implemented yet and shouldn't be referenced in
learner-facing copy until they ship (the doc's own dangling reference to a `docs/CERTIFICATES.md`
file that doesn't exist was also removed).

### A missing keyboard focus trap, found and fixed across 4 dialogs

Confirmed by actually tabbing through the open mobile navigation drawer (not by reading the
`useEffect` and assuming it was complete): the existing dialog implementations focused an initial
element on open and (inconsistently) handled Escape, but none of them ever intercepted Tab —
tabbing through a dialog's last focusable element moved focus onto page content underneath, sitting
behind the same overlay in the DOM but still fully visible during the visual/keyboard-focus jump.
This affected 4 separate hand-rolled `fixed inset-0` dialogs (`MobileNav`, the lesson page's
`CourseNavMobile`, the technology directory's `FilterDrawer`, and `TutorLauncher`'s mobile panel) —
the exact "repeated bottom-sheet pattern across 4 components" cross-cutting inconsistency already
flagged for consolidation. Fixed with one shared hook, `lib/hooks/use-modal-a11y.ts`: focuses an
initial element on open, traps Tab/Shift+Tab within the dialog's container, closes on Escape,
restores focus to the trigger element on close, and locks body scroll — all 4 dialogs now use it
instead of their own separate (and previously incomplete) keyboard handling. Verified with real
keyboard-driven Playwright tests (not just code review) that tab through every focusable element in
each dialog plus two more and assert focus never leaves the dialog, then assert Escape returns
focus to the exact trigger element — new coverage in `tests/e2e/navigation.spec.ts`,
`tests/e2e/mobile-and-modes.spec.ts` (which also had its own test **renamed**, since its name
literally said "...without trapping focus" describing the bug as accepted behavior), and
`tests/e2e/technology-directory.spec.ts`.

### Per-page redesign summary

**Navigation** (`Header`/`MobileNav`/`PrimaryNav`): active-route underline + `aria-current="page"`
on the desktop nav (new, computed via a small client component so the rest of `Header` stays a
server component — no unnecessary server→client conversion); no auth-flash (already correct from
Phase 4, unchanged); mobile drawer fixed as above. **Homepage**: hero de-emphasized (no longer
dominates the first screen), the "path" card now uses the connecting-line motif with real track
data, category-accent top bars on the learning-path cards — all real registry-derived content, no
fake stats/testimonials added. **Learn page & catalog**: entry-point cards, category chips with
accent colors, course cards with track-accent bars and difficulty-toned badges. **Course overview**:
breadcrumbs, accent dot, `ProgressBar`-based pre/post-enrollment states (0% never implies done,
`Completed` only renders when `isCourseComplete()` is actually true), numbered lesson list.
**Lesson page**: comfortable `.reading-column` width for prose sections, full width preserved for
code/exercise sections (a docs-site-style split, not a blanket narrow column), `StepMarker` +
connecting line in the course-nav sidebar (now reflecting real per-lesson status from the existing
progress store — this is a presentation change over already-existing data, not new tracking
behavior). **Dashboard**: the "continue learning" recommendation promoted above the stat-card row
and given the strongest visual treatment (single dominant next-action, per the brief), sync status
migrated to `Alert`, `Recently viewed`/`Bookmarks` combined into a two-column layout to reduce
vertical density, all hand-rolled progress bars replaced with `ProgressBar` — **the CLS-0 skeleton
fix from Phase 4 was preserved by construction**: `DashboardSkeleton`'s block sizes were kept
matched to the reordered real layout (re-verified by Lighthouse below, still 0.000). **Roadmaps**:
the `/paths` and `/roadmaps/[slug]` step lists now use the actual connecting-line pathway motif
with `StepMarker`s — the single most literal opportunity for it in the app, previously plain
numbered circles with no line at all; the corrected cross-roadmap step-isolation behavior from the
Phase 4 audit is untouched (verified by e2e test, unchanged). **Profile/auth**: `Alert`-based guest/
signed-in status, no continuous-sync wording (already correct from the Phase 4 doc fix, preserved),
the "Supabase not configured" sign-in state remains a real explanatory page with a working
"Continue as a guest" link, not a dead form. **Technology directory/search/playground**: category-
accent bars and difficulty badges on technology cards; the `/playground` page's `Suspense
fallback={null}` (a real, previously-flagged CLS gap — the same class of bug already fixed on
`/technologies` and `/dashboard` in earlier phases, just never applied here) replaced with a
properly-dimensioned skeleton; Monaco/Pyodide/sql.js loading boundaries and the runner components
themselves were not touched.

### Responsive, motion, and accessibility verification

Checked 375/768/1024/1440px on every redesigned page via real rendered screenshots (not just
Tailwind breakpoint reasoning), plus a 200% zoom equivalent (a 640×480 layout viewport, the
standard way to approximate real browser zoom — an initial attempt using the CSS `zoom` property
produced a flexbox `gap` rendering artifact specific to that non-standard property, not a real bug,
confirmed by re-testing with an actual reduced viewport instead). A scripted sweep asserted zero
horizontal overflow (`document.documentElement.scrollWidth` ≤ `clientWidth`) across 17 routes × 4
widths (68 checks, all passing). `prefers-reduced-motion` is honored by a pre-existing global rule
(`animation-duration`/`transition-duration` forced to near-zero for every element) that already
covered everything added in this pass; the one new keyframe animation (`.animate-fade-up`, a subtle
entrance transition never gating navigation or reading) has its own explicit reduced-motion
override besides. No scroll-jacking, parallax, or looping decorative animation was added anywhere.
The existing automated accessibility suite (`tests/e2e/accessibility.spec.ts`, 25 routes × axe,
`wcag2a`/`wcag2aa`/`wcag22aa` tags) was re-run against the full redesign with zero changes needed —
**0 critical/serious violations**, same as before. Manual keyboard-only workflows verified end to
end via Playwright (`page.keyboard`, no mouse): enrolling in a course, marking a self-reported
roadmap step complete, and editing/saving profile preferences all work with keyboard alone.

### Performance verification (Lighthouse, production build, desktop preset, before vs. after)

Built and served the pre-Phase-4.5 code (`c670ef1`, in a separate `git worktree` so the working
tree with Phase 4.5's uncommitted changes was never touched) and the current code side by side on
different ports, then ran Lighthouse (`performance`+`accessibility` categories) against the same 3
pages on both:

| page            | performance (before→after) | accessibility (before→after) | CLS (before→after) | LCP ms (before→after) |
| --------------- | :------------------------: | :--------------------------: | :----------------: | :-------------------: |
| `/` (home)      |          99 → 99           |          100 → 100           |   0.000 → 0.000    |       850 → 850       |
| `/dashboard`    |          99 → 99           |          100 → 100           |   0.000 → 0.000    |       861 → 850       |
| course overview |          99 → 99           |          100 → 100           |   0.000 → 0.000    |       901 → 889       |

No material regression on any metric, on any page; CLS stayed at a perfect 0 throughout (confirming
the dashboard/technology-directory/playground skeleton work above didn't reintroduce the historical
CLS bugs), and LCP improved slightly on two of the three pages. No new runtime dependency was
added, no new font request, no heavy UI framework — only existing Tailwind utilities, hand-authored
SVG icons, and CSS custom properties.

### Testing

Preserved every Phase 1-4 test; updated only what the redesign's DOM/copy changes required, and
only by matching the new (still equivalent, still real) markup — never by weakening an assertion:
`tests/e2e/learn-page.spec.ts` (link accessible names changed because entry-point cards became
larger, whole-card link targets, and a "→" character became a decorative icon), `tests/e2e/
phase4-learning-account.spec.ts` (the daily-goal "goal met!" text and the profile "Saved." text
each split from one paragraph into a text node plus a separate `Badge`, so the tests now check both
pieces). Added new coverage: 4 focus-trap/restoration tests (one per dialog, described above). Full
suite after all changes: **214 unit/integration tests, all passing**; **73 unique Playwright
scenarios** (including the 4 new focus-trap tests), run across the `chromium` and `mobile-chromium`
projects, all passing (skips are the pre-existing, intentional `isMobile`-gated desktop-only
tests). Deleted the temporary, never-committed `tests/e2e/tmp-baseline.spec.ts` scratch file used
for this session's own before/after screenshot comparisons before finishing.

## Verified-green commands (run this session, after all Phase 2 and Phase 3 changes)

```bash
npm run format:check     # Prettier — clean
npm run lint             # ESLint — 0 errors, 0 warnings
npm run typecheck        # tsc --noEmit — 0 errors
npm run content:validate # 6 tracks/6 courses/50 lessons/8 projects + 16 categories/80 technologies/16 paths — passed
npm run test             # Vitest — 19 files, 131 tests passed
npm run build             # next build (Turbopack) — 205 routes generated successfully
npx playwright test      # 105 passed, 3 skipped (desktop-only filter tests, intentionally skipped on the mobile project)
```

Visual QA: 90 Playwright screenshots across 15 pages (technology directory, filtered directory,
no-results state, category index, 3 category detail pages, 4 technology guide variants
[current/legacy/course-backed/guide-only], roadmap index, roadmap detail, homepage, 404) × 3
viewports (375/768/1440) × 2 themes — 0 console errors, 0 page errors, 0 failed network requests
(the only logged "error" was the browser's own expected 404-status log when intentionally
navigating to the 404 test page). Manually reviewed representative samples across desktop/mobile/
light/dark. Phase 2's homepage/course-catalog/dashboard visual QA from the prior pass remains
valid (unaffected by Phase 3 changes) and was not redundantly recaptured.

## Known limitations

- **Guest-to-account sync is wired up and tested, but only against a mocked Supabase client.**
  `mergeProgress()`/pull/push/the full sign-in lifecycle are implemented and unit/integration-
  tested (`tests/unit/sync-lifecycle.test.ts`, `tests/integration/auth-provider.test.tsx`), but have
  never run against a real, live Supabase project — no cloud resources were provisioned for this
  beta (see "No live Supabase project..." below). Test the real end-to-end flow (sign up, sign in
  on a second device, observe a merge) against an actual project before trusting it with real user
  data.
- **No live Supabase project, Vercel deployment, or AI provider key.** Everything AI/Supabase-
  related remains statically reviewed and mock-tested only, never executed against real
  infrastructure.
- **Per-exercise saved code does not sync to Supabase.** It remains a local-only `localStorage`
  convenience feature (`lib/learning/use-persisted-code.ts`) — no requirement identified it as one
  of the Phase 4 tables to add, and promoting it would need its own migration and merge rule (see
  the Phase 4 report, item 40).
- **Course reviews were not built.** Deferred per explicit instruction until a full moderation/
  abuse/ownership model exists (see the Phase 4 report, item 39).
- Manual cross-browser testing remains Chromium-only (desktop + mobile viewport/UA profile via
  Playwright); Firefox/WebKit are not installed locally and were not downloaded.
- Two vendored build artifacts in `public/wasm/` remain excluded from lint/format, unchanged.
- `docs/PRD.md`/`docs/ARCHITECTURE.md`/`docs/CURRICULUM.md` now describe the Phase 3 technology
  directory alongside the original curriculum (see each doc's dedicated section); `docs/
DEPLOYMENT.md` still only has its name updated, since nothing about the deployment procedure
  changed in Phase 3 (the technology directory is static, version-controlled data like the rest of
  the content system — no new environment variables or services are required).
- Of the 80 registered technologies, only 9 map to a real course and 2 to runner support without
  one (see the Phase 3 section above for the exact list) — the other ~69 are genuinely guide-only
  today. This is by design, not an oversight: the brief explicitly required a guide to never
  overclaim course/runner availability, and building 69 additional full courses is out of scope
  for a single phase (and arguably for any single phase — see "recommended next phase" below).
- The technology directory's "recently reviewed" sort is meaningful but not very differentiated
  yet — every technology record was authored (and dated) in this same Phase 3 session, so
  `lastReviewed` dates are currently identical across all 80 records. The field and the sort UI
  are both real and will differentiate naturally as records are updated independently going
  forward.
- Cross-category technology placement involved judgment calls the brief didn't fully specify (e.g.
  Kotlin/Swift under Mobile Development rather than Programming Languages, Git under Developer
  Tools rather than Foundations, XML under Data Science and Analytics rather than Developer
  Tools) — each technology has exactly one `category`, by schema design, so every technology
  needed one primary home; see `lib/directory/data/*.ts` for where each landed and adjust via
  `docs/CONTENT_AUTHORING.md`'s process if a different placement is preferred.
- **Phase 4.5 is presentation and interaction only.** It did not touch, and was explicitly
  prohibited from touching, any learning/account/sync/merge/privacy/enrollment/completion/roadmap/
  daily-goal/recommendation behavior — the two known-limitations items above about the mocked
  Supabase sync and the unbuilt Phase 5-8 features are unchanged by this pass.
- **The category/track accent-color palette (7 hues) is necessarily approximate at 16 categories
  and 6 tracks** — a few visually adjacent categories share a hue (documented explicitly in
  `lib/ui/category-accent.ts`'s own comments, with a note on which pairs were kept apart
  deliberately) rather than expanding to enough uniquely distinguishable hues to risk a garish,
  low-contrast palette. Rebalancing individual category→hue assignments is a one-line change per
  category in that file if a specific collision becomes a real problem.
- **Firefox/WebKit visual verification was not performed** (same limitation as every prior phase —
  Playwright's Chromium + mobile-Chromium projects only). The redesign uses only standard CSS
  (flexbox, grid, custom properties, `backdrop-filter` with a `@supports` fallback already in place
  from Phase 2) with no Chromium-specific features knowingly introduced, but this claim is
  unverified outside Chromium.

## Phase 5A — Interactive Curriculum Foundation (2026-08-02)

A separate, orthogonal expansion track from the numbered Phase 1-9 plan above (that "Phase 5"
means Aptitude/Reasoning/Career content, still not started — see the checklist above). This
track responds to a different brief: the platform had ~6 complete courses against 80 short
technology guides, too few complete courses for a genuine self-learning platform. The brief named
12 candidate courses (HTML & CSS Foundations, JavaScript Foundations, TypeScript Foundations,
React, Node.js/Express, Java, Database Design and PostgreSQL, Software Testing Foundations, API
Testing and Automation, Playwright, Selenium, Test Automation Framework Engineering).

**What was found in a fresh audit of the runner architecture:** 8 of the 12 named courses need an
execution environment this platform's three browser-only runners (HTML/CSS/JS sandbox, Pyodide,
sql.js) cannot provide — React, Node.js/Express, Java, PostgreSQL, Playwright, Selenium, and Test
Automation Framework Engineering all require either real server/local execution (out of scope: no
server-side arbitrary code execution is permitted) or an explicit "guided local lab" content
format (setup steps, expected output, verification commands, never a fake Run button). HTML & CSS
Foundations already exists as `html-css-fundamentals`, a genuinely complete pre-existing course —
rebuilding it would have meant either duplicating good content or discarding it, so it was audited
against the new complete-course bar and strengthened (modules/outcomes/prerequisites backfilled)
instead of duplicated, per the brief's own "if an identical course already exists, audit and
strengthen" instruction.

**Scope, as explicitly re-scoped by the requester mid-task:** rather than publish 8 shallow,
non-interactive "courses" to hit a headline count, or silently under-deliver against the full
12-course ask, the requester was asked directly (via a scoping question) how to spend the
remaining session, and chose to formally re-scope Phase 5A down to a smaller batch that could be
delivered complete, end-to-end, and genuinely verified rather than partially started. A second
question about which new interactive capability to add (a new TypeScript compiler-based runner, a
new "guided local lab" content type, or neither) was answered with **TypeScript lab runner only**
— which, combined with the runner-architecture finding above, is what fixed this batch's final
scope: **one new course, TypeScript Foundations**, plus the schema/tooling/validation/
documentation foundation that Phase 5B's remaining 8 courses (React, Node.js/Express, Java,
PostgreSQL, Software Testing Foundations, API Testing and Automation, Playwright, Selenium) and
Phase 5C's much larger list (see `docs/CURRICULUM.md`'s "Master curriculum architecture" section)
will build on.

**What this batch actually shipped** (all verified — see the verification section below):

1. A new, real TypeScript execution runner (`lib/runners/typescript-compile.ts` +
   `components/runners/typescript-runner.tsx`) — a full `ts.Program` type-checker (not
   `ts.transpileModule`, which performs no type checking), dynamically imported only when a
   TypeScript exercise/example/Playground tab actually opens, reusing the existing audited
   HTML/JS sandbox to execute the emitted code rather than opening a new execution surface. See
   `docs/ARCHITECTURE.md`'s runner architecture section for the full design and
   `docs/SECURITY.md` for the isolation review.
2. An extended course-authoring schema (`lib/content/types.ts`): every course now carries
   `audience`, `learningOutcomes`, `prerequisiteCourseSlugs`, `nextCourseSlugs`,
   `relatedTechnologySlugs`, and `modules` (ordered groups of lessons). All 6 pre-existing courses
   were backfilled with real values (not placeholders) computed from their actual lesson content,
   and are now genuinely schema-validated on every registry load (previously the course array was
   cast, not parsed).
3. **TypeScript Foundations** (`typescript-foundations`), a new complete course: 5 modules, 12
   lessons (why-types through modeling-a-domain with discriminated unions), 36 quiz questions, a
   guided + independent exercise per lesson (every reference solution proven to compile and pass
   its own harness — see `scripts/validate-snippets.ts` below), and one guided project
   (`typed-study-tracker`, 4 milestones).
4. Extended `scripts/validate-content.ts`: course-level referential integrity (prerequisite/next-
   course/related-technology resolution, acyclic prerequisite graph), module↔lesson bijection
   checks, minimum-content-bar checks for any course published from this phase onward (with a
   narrow, documented exemption for 5 real pre-existing courses that predate the bar — see
   `EXEMPT_SHORT_COURSES` in that script), harness-presence checks for interactive exercises, and
   duplicate-quiz-question detection (including renamed-variable duplicates).
5. A new `scripts/validate-snippets.ts` (run via `npm run content:validate-snippets`): executes
   every HTML/JS/TypeScript exercise's reference solution against a real headless Chromium page,
   proving every exercise is actually solvable as authored, not merely schema-shaped.
6. `docs/CURRICULUM.md` rewritten with a complete-course definition, an 8-track long-term
   curriculum architecture, and a full 80-guide coverage matrix (every public technology mapped to
   its real course/runner/project availability, or an explicit reference-only reason, or its
   planned Phase 5B/5C batch) — see that file for the complete detail this summary omits.
7. Course overview and catalog pages updated to render the new structure: modules (not a flat
   lesson list), audience/learning-outcomes, prerequisite and next-course links, and a
   "Recommended first" line on catalog cards.

**Two real pre-existing bugs, unrelated to this batch's own new code, were found and fixed while
running this batch's required full accessibility/e2e verification sweep** (both predate Phase 5A
and are not caused by it — they surfaced because this sweep exercised routes/viewports more
thoroughly than prior verification runs happened to):

1. **Header logo link had no accessible name on mobile** (`components/layout/header.tsx`): the
   site-name text next to the logo is `hidden` below the `sm` breakpoint, and the logo SVG itself
   is `aria-hidden`, so on any mobile viewport the header's home link had zero accessible text —
   a serious `axe` `link-name` violation on every single page. Fixed with an explicit
   `aria-label={siteConfig.name}` on the link, which is correct at every viewport width.
2. **`tests/e2e/navigation.spec.ts`'s catalog-to-course-page test used an ambiguous link-name
   match** (`getByRole("link", { name: /HTML & CSS Fundamentals/ })`), which became a genuine
   strict-mode ambiguity once this batch added "Recommended first: &lt;course&gt;" text to catalog
   cards (Course B's card can now contain Course A's title as its prerequisite line, so a
   substring match on link name can hit the wrong card). Fixed by scoping the locator to the card
   whose own `<h2>` heading matches the course title, not the flattened link text.

**Explicitly not done in this batch, and not claimed as available anywhere in the public
catalog, search, or navigation:** the other 11 originally-named courses. React, Node.js/Express,
Java, Database Design and PostgreSQL, Software Testing Foundations, API Testing and Automation,
Playwright, and Selenium remain Phase 5B (documented, not built — see `docs/CURRICULUM.md`).
HTML & CSS Foundations was not rebuilt because `html-css-fundamentals` already met the bar after
being strengthened. Test Automation Framework Engineering is Phase 5C, since it presumes the
Phase 5B testing courses exist first. No "coming soon" card, empty filter state, or placeholder
course exists for any of these anywhere in the shipped UI.

## Phase 5A.2 — Application Development and Testing Core (2026-08-03, complete)

A follow-on batch, after Phase 5A's checkpoint (`c4b2d24`) was pushed to `origin/main`
(`https://github.com/ravitejatravelsoul/VisaSparkSchools.git`, first push of this repository's
history — a public-repository safety audit across the full commit history found no secrets,
credentials, or confidential content beforehand). The brief requested four new complete courses
(React Application Development, Node.js and Express Backend Development, Software Testing
Foundations, API Testing and Automation) and explicitly authorized a new **guided local lab**
content type for environments this platform's runners can't honestly execute in the browser. **All
four courses are complete, verified, and registered in this checkpoint.**

The batch was split across two sessions: Software Testing Foundations and API Testing and
Automation shipped first (see the initial partial report this section replaces), followed by React
Application Development and Node.js and Express Backend Development in this session, using the
same guided-local-lab infrastructure built for the first two.

**What shipped, genuinely complete and verified:**

1. **A reusable guided-local-lab content type** — `guidedLocalLabSchema` in
   `lib/content/types.ts` (id, title, scenario, required tools, setup steps, project structure,
   starter files, requirements, commands, expected behavior, verification steps, troubleshooting,
   hints, a reference solution, an extension challenge — all schema-enforced, non-empty) and
   `components/lesson/guided-local-lab-panel.tsx`, which renders a **fixed, non-author-editable**
   "Runs on your computer" banner (so no lesson's authoring can ever omit or soften the honest
   label), never renders a Run button, and never claims the site executed anything. Added as an
   optional field on lessons — additive only, so `lib/learning/store.ts`'s mastery/completion
   logic (which reads every lesson's `guidedExercise`/`independentExercise` unconditionally)
   needed zero changes. `scripts/validate-content.ts` extended with guided-local-lab checks:
   global id uniqueness, duplicate file-path detection, a reference solution that's suspiciously
   identical to the starter files, and a deny-list of phrases that would falsely claim the site
   ran/executed/verified local code. Now used by 6 lessons across React and Node.js/Express (3
   each), still unused by any other course.
2. **Software Testing Foundations** (14 lessons, 6 modules, no prerequisites): quality vs.
   testing, requirements analysis, test levels/types, the four structured test design techniques
   (each its own hands-on lab: equivalence partitioning, boundary-value analysis, decision
   tables, state transition testing), exploratory testing, risk-based testing, defect reporting,
   traceability/regression strategy, agile testing and accessibility/security awareness. Guided
   project: Test Strategy for a Learning Application.
3. **API Testing and Automation** (14 lessons, 6 modules, requires Software Testing
   Foundations): HTTP fundamentals, REST conventions, headers/auth, JSON schema validation (lab),
   positive/negative testing, API-specific boundary cases (lab), contract testing, data-driven
   testing, chained workflows (lab), error-response validation, idempotency/rate limiting, API
   security basics, and structuring a maintainable automation suite with CI reporting. Guided
   project: Validation Suite for a Sample Learning-Progress API. Both testing courses reuse the
   existing HTML/JS runner exclusively — every exercise represents a testing decision (which
   equivalence class, which boundary value, which decision-table row, a simulated API response
   fixture) as a small, deterministic JavaScript value the harness checks against the real
   technique's rules; no real HTTP request is ever made, and every API-testing lesson says so
   explicitly.
4. **React Application Development** (14 lessons, 6 modules, requires TypeScript Foundations):
   component thinking, JSX (via a real hand-written `createElement`), props, events, state (via a
   real closure-based `useState` re-implementation), conditional rendering and keys, controlled
   forms and validation (guided local lab), loading/error/empty/success states, effects and
   cleanup, race-condition-safe data fetching (guided local lab), composition and custom hooks,
   Context and state ownership, accessibility and testing, and performance/error
   boundaries/architecture (guided local lab). Every browser exercise is genuine, runnable
   JavaScript/TypeScript modeling the real underlying mechanism (several, like the dependency-array
   comparison and the request-token guard, are literally React's real algorithm, not a
   simplification) — no React runtime, JSX transform, or bundler was added to the browser sandbox.
   Guided project: Accessible Learning Dashboard.
5. **Node.js and Express Backend Development** (14 lessons, 6 modules, requires React
   Application Development): the event-loop model, CommonJS vs. ES modules and npm, async/await,
   Express routing and structure (guided local lab), middleware, request data, input validation and
   centralized error handling (guided local lab), REST resource design, structured/operational vs.
   programmer errors, safe configuration and logging, startup validation, authentication
   boundaries (without a hand-rolled, unsafe credential system), automated testing with graceful
   shutdown (guided local lab), and operational readiness. Guided project: Validated
   Learning-Progress REST API.
6. Two new tracks — `react` and `node-express` — inserted into the Web Development sequence
   (HTML/CSS → JavaScript → TypeScript → React → Node.js/Express), reciprocal prerequisite/next-
   course links set on both sides, and both technology guides (`react`, `nodejs`, `express`)
   updated to point at their real courses/projects.

**Verification for the full four-course batch:** `content:validate` passes cleanly across 10
tracks / 11 courses / 118 lessons / 13 projects; `content:validate-snippets` proved all 212
browser-executable reference solutions (156 pre-existing + 28 React + 28 Node.js/Express) genuinely
compile and pass their own harnesses. This run caught and fixed real authoring bugs before they
shipped: (a) an un-escaped inline-code backtick inside a template-literal `explanation` field that
silently truncated lesson content at build time, caught by `npm run typecheck`; (b) a test harness
fixture containing a literal `</script>` sequence that prematurely closed the runner's injected
`<script>` tag, caught only by actually running it in Chromium via `content:validate-snippets`; (c)
two harnesses using top-level `await` outside an async context, a real `SyntaxError` only the
snippet validator caught; (d) a keyword-mismatch in one exercise's own test data (a solution and
its test fixture disagreeing on what counted as "I/O-bound" phrasing). New tests: 8 schema tests
for `guidedLocalLabSchema`, 5 integration tests proving `GuidedLocalLabPanel` always shows the
fixed honesty banner, never renders a Run button, and reveals hints/solution progressively, plus 4
new registry-level tests (each new course has ≥3 guided local labs, every lab id is globally
unique, no lab's solution is byte-identical to its starter files, no lab text implies local
execution); 3 new e2e tests (independent enrollment for the testing courses, independent enrollment
for React/Node, and a dedicated check that the guided-local-lab section itself never renders a Run
button while the lesson's own browser exercises still do); 3 new architectural tests confirming no
React/Node-specific runner file exists and no server-side code-execution sandbox dependency was
added. **Accessibility**: this session's full sweep initially caught a real, previously-unknown
WCAG 2.1.1/2.1.3 violation — the guided-local-lab panel's scrollable `<pre>` code blocks
(horizontally overflowing on narrow content) were not keyboard-focusable, meaning a keyboard-only
user had no way to scroll them; fixed by adding `tabIndex={0}` and an accessible `role="region"`
label to both the "Project structure" block and every starter/solution file block. After the fix,
all 42 routes in the accessibility sweep (14 new: 2 course overviews, 4 lessons, 2 new-course
projects, plus the pre-existing 34) pass with zero critical/serious violations. Visually inspected
(screenshots actually opened and read, not just generated) at 375px/1440px, light/dark: the
11-course catalog, both new course overviews, a React lesson with its guided local lab (zoomed in
and read in full — honesty banner, all required sections, no Run button, code blocks readable), and
the Node.js overview all render cleanly with no horizontal overflow.

**Bundle isolation and security**: no new npm dependency was added (`git diff package.json` is
empty); `GuidedLocalLabPanel` imports only pre-existing UI primitives (`Alert`, `Badge`, `Button`)
and React's `useState` — no runner import, no code-execution path; `lib/runners/` still contains
exactly the same four runner implementations from before this batch (HTML/JS, Python, SQL,
TypeScript) with no React or Node-specific runner added.

## If you pick this up next

Recommended next step before any further feature phase: **provision a real Supabase project and
execution-test the guest-to-account sync lifecycle end to end** (sign up, complete some lessons as
a guest first, sign in, verify the merge; sign out and confirm nothing leaks; sign in as a second
account on the same device and confirm the same). Everything is implemented and mock-tested
(Phase 4 report, items 17-24), but "the mock behaves correctly" and "the real Postgres/RLS/auth
stack behaves correctly" are different claims, and only the first has been verified in this build.
Phase 4.5's redesign is visual/interaction-only and doesn't change this recommendation.

Recommended next _phase_: **Phase 5 (Aptitude, Reasoning, and career content)**, which would
finally let the three currently-internal categories and the one currently-draft learning roadmap
(Placement and Job Readiness) go public. Other options, not started, listed here only as
possibilities: mapping more of the ~63 guide-only technologies to real courses as those courses get
built; building out Study Studio (Phase 6) or Project Studio/Tools Lab (Phase 7), both large enough
to warrant their own from-scratch planning pass the way this session did for Phase 3 and Phase 4;
or building the course-reviews system deferred in Phase 4 (item 39), once a moderation/abuse/
ownership model is designed. Whichever is chosen, re-run the full verified-green command list above
before and after each coherent chunk of work, exactly as this session did, and do not add a
navigation entry for any surface until its destination page is real and non-empty.

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
