# Project Status — VisaSparkSchools

Last updated: 2026-08-01. This is the durable checklist for the CodeWise → VisaSparkSchools
expansion — update it precisely as work progresses. Do not mark anything done that hasn't
actually been run and verified. Do not mark a later phase complete based only on scaffolding.

## Baseline commit

`ba68107` — "feat: establish audited VisaSparkSchools platform baseline" — the entire CodeWise
build + the Phase 2 rebrand + the homepage duplicate-title fix, squashed into one locally
reviewed commit on top of the original `c9e1df0` scaffold commit. **Not pushed** (no remote is
configured for this repo). **All Phase 3 work below is intentionally left uncommitted for
review**, exactly as instructed — do not commit it without the owner's explicit review.

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

## Overall status: Phase 1 (audit), Phase 2 (rebrand), and Phase 3 (technology architecture) complete and verified. Phases 4–9 not started.

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

## If you pick this up next

Recommended next phase: **Phase 4 (Learning and accounts)**, specifically wiring up the existing,
already-built-but-unused `mergeProgress()`/Supabase progress tables — this is the single highest-
leverage gap remaining from _before_ this expansion, not something Phase 3 introduced. Concretely:
an auth-state-change hook that, on sign-in, reads the signed-in user's Supabase progress tables,
calls the existing (unit-tested) `mergeProgress()` against local `localStorage` state, writes the
merged result back to both, and keeps them in sync on subsequent mutations.

If instead continuing the technology-directory line of work, natural next steps (not started, not
scoped as "Phase 3.5" by the brief, listed here only as options): mapping more of the ~69 guide-
only technologies to real courses as those courses get built; building out Study Studio (Phase 6)
or Project Studio/Tools Lab (Phase 7), both of which are large enough to warrant their own
from-scratch planning pass the way this session did for Phase 3; or Phase 5 (Aptitude/Reasoning/
GD), which would finally let the three currently-internal categories and the one currently-draft
learning roadmap (Placement and Job Readiness) go public. Whichever is chosen, re-run the full
verified-green command list above before and after each coherent chunk of work, exactly as this
session did, and do not add a navigation entry for any surface until its destination page is real
and non-empty.

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
