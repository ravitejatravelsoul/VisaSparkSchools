# Content authoring guide

How to safely extend the two content systems in this repo: the original lesson/course curriculum
(`content/`, `lib/content/`) and the Phase 3 technology directory (`lib/directory/`). This
document describes what actually exists and how to extend it correctly — it does not describe
planned features as though they're implemented.

## The two content systems, and how they relate

- **`content/` + `lib/content/`** — the course curriculum: 7 tracks, 7 courses, 62 lessons,
  quizzes, exercises, projects (see `docs/CURRICULUM.md` for exact, live-computed counts).
  Unchanged by Phase 3; extended by Phase 5A (see "How to add a full course" below).
- **`lib/directory/`** — the Phase 3 technology directory: categories, technologies, and learning
  roadmaps. This system **references** the course/project system (a technology can point at a real
  `courseId`/`projectIds`) but never duplicates or modifies it. If you're adding a full new course
  with lessons, that's the `content/` system — see "How to add a full course" below.
  If you're adding a technology guide, category, or roadmap, that's `lib/directory/` — this doc.

## How to add a technology safely

1. Pick the right category (`lib/directory/types.ts#categoryIdSchema` lists all 16 valid ids —
   don't invent a new one without also adding it to `lib/directory/categories.ts`).
2. Add a `TechnologyInput` object to the matching file in `lib/directory/data/` (grouped by
   category — e.g. new AI-related technologies go in `data/ai.ts`, not scattered across files).
3. Fill in every required field genuinely — see "What counts as a real guide" below. Do not leave
   a field technically present but empty/generic; `content:validate` checks structural validity
   (non-empty strings, valid enum values) but cannot catch content that's technically non-empty
   and still a placeholder — that's a human review responsibility.
4. Set `id` and `slug` to something stable and unique — check `lib/directory/registry.ts`'s
   `allTechnologies` export (or just run `npm run content:validate`, which fails loudly on
   duplicates) before picking one.
5. Leave `courseId`, `runnerSupport`, and `projectIds` **unset** unless a real course/runner/
   project genuinely exists for this technology — see "How to map a real course" and "How to
   expose runner support" below. An unset field renders as "guide-only," which is an honest,
   completely normal state, not a failure.
6. Run `npm run content:validate`. It will catch: duplicate ids/slugs, an unknown `category`,
   dangling `prerequisiteIds`/`relatedIds` (referencing a technology that doesn't exist), a
   `courseId`/`projectIds` entry that doesn't resolve to a real course/project, a missing
   `legacyNote` on a `status: "legacy"` record, and a malformed `lastReviewed` date.
7. Add the new technology to any category page it should surface on — this happens automatically
   via `category` (category pages call `getTechnologiesByCategory`), so no extra wiring is needed.

### What counts as a real guide (not a placeholder)

Every technology record must genuinely answer, in the author's own words (never copied from
MDN/W3Schools/official docs/any other source): what it is, why it's used, where it fits, its core
concepts (a real list, not one vague bullet), a small original code example with a real
explanation, common use cases, and at least one project idea. `content:validate` cannot verify
that prose is genuinely useful rather than technically-present-but-thin — that's a human editorial
judgment call before merging. If you can't honestly fill in one of these fields for a technology,
that's a signal it may need more research before publishing, not a field to fill with filler text.

### How to add an official reference

`references` must point at the _authoritative_ source for that specific technology — the
project's own docs (e.g. `react.dev`, `docs.python.org`) or a standards body (MDN for web
standards, W3C, OWASP). Never link a third-party tutorial site. The one deliberate exception is
W3.CSS, whose only authoritative source is W3Schools (its actual creator) — see that record's
`references` field and note in `lib/directory/data/frontend.ts` for how that's handled honestly
(the guide's own prose is 100% original; only the reference link points at the framework's real
home).

## How to map a real course

Set `courseId` to a real `content/courses.ts` course `id` (which is also its `slug` — every
existing course has `id === slug`). Do this **only** when the course substantively covers this
specific technology — not just adjacently. `lib/directory/availability.ts#getTechnologyAvailability`
resolves this reference against the live course registry at render time; if the id doesn't
resolve, `content:validate` fails the build. This is deliberately a hard, code-enforced guarantee,
not a convention: a technology guide can never claim "Start course" for a course that doesn't
exist.

## How to expose runner support

Set `runnerSupport` to one of `"html" | "javascript" | "typescript" | "python" | "sql"` — the five
modes the existing Playground (`components/playground/playground-client.tsx`) actually implements.
Do not set this for any other technology (e.g. React, Node.js) even though they're
JavaScript-adjacent — the Playground has no React/Node runtime, and claiming otherwise would be
exactly the "Open playground" false claim the product brief explicitly prohibits. Once set, the
technology guide links to `/playground?lang=<value>`, which deep-links directly to that tab
(`useInitialLanguage()` in `playground-client.tsx`). `typescript` genuinely type-checks (a real
`ts.Program`, not a stripped-down simulation) — see `docs/ARCHITECTURE.md`'s runner architecture
section — but is still limited to a curated ambient lib rather than the full TypeScript standard
library; don't set it for a technology whose guide would need DOM lib types, Node types, or a
third-party `@types` package, none of which the lab runner loads.

## How to add a full course (not a guide)

A course lives in `content/` — `content/courses.ts` (the course record and its `modules`) and
`content/lessons/<track>.ts` (the lesson bodies) — validated by `courseSchema`/`lessonSchema` in
`lib/content/types.ts`. See `docs/CURRICULUM.md`'s "Complete-course definition" section for the
full bar a course must clear (module/lesson/outcome minimums, prerequisite/next-course/
related-technology referential integrity, per-lesson practice and knowledge-check requirements)
before it may set `status: "public"` — `scripts/validate-content.ts` enforces the structural half
of that bar automatically; the content-quality half (original writing, no padding, terminology
introduced before use, realistic examples) is still a human editorial judgment call the same way
guide quality is. Two extra tools exist specifically for course content:

- `npm run content:validate-snippets` executes every exercise's reference `solutionCode` against
  its real runtime (Chromium for `html`/`javascript`/`typescript`, via Playwright; `python`/`sql`
  are covered by the existing Playwright e2e runner specs instead) — run this after authoring any
  new exercise, since `content:validate` only checks the exercise is schema-shaped, not that the
  reference solution actually solves it.
- If a course predates the Phase 5A module/lesson-count minimums and is already good, complete
  content, add its id to `EXEMPT_SHORT_COURSES` in `scripts/validate-content.ts` rather than
  padding it with low-value lessons to hit a number — but never add a _new_ course to that list;
  the exemption exists only for content that predates the bar.

Once a course exists, decide whether any technology guide should point at it (`courseId` — see
above) and whether it belongs in `docs/CURRICULUM.md`'s track tables and 80-guide coverage matrix.
Never add a course to `content/courses.ts` in a state that wouldn't pass `content:validate` "just
to reserve the slug" — an unfinished course must not exist in the content system at all until it's
genuinely complete; track it as a documented plan in `docs/CURRICULUM.md` instead (see that file's
"Master curriculum architecture" section for the Phase 5B/5C course list format to follow).

## How to create and publish a learning path (roadmap)

1. Add a `LearningPathInput` to `lib/directory/learning-paths.ts`.
2. List its `steps` in the order a learner should follow them, each referencing a real
   `technology-guide` (a technology id), `course` (a course id), or `project` (a project id) —
   `practice`/`assessment` step types exist in the schema for future phases but currently cannot
   be used on any `publicVisibility: true` path (see below).
3. Mark non-essential steps `required: false` — required steps are what
   `lib/directory/validate.ts` checks resolve to real content before allowing the path to be
   public.
4. Leave `certificateEligible` and `finalAssessmentRequired` as `false`. Setting either to `true`
   is a hard validation failure today — no certificate or assessment system exists yet (Phase 8),
   and a path claiming otherwise would be a false promise.
5. Set `publicVisibility: true` only once every required step resolves to something real
   (`npm run content:validate` enforces this — a public path with one unresolvable required step
   fails the build, by design). Until then, leave it `false`; it stays a fully-typed internal
   draft that doesn't render or appear in the sitemap/search index.
6. `roadmapOnly` should stay `true` for every path in this phase — it's what the roadmap detail
   page's "this is a roadmap, not a certifiable course path" notice is keyed off of.

## Validation rules (enforced by `npm run content:validate`)

Run via `lib/directory/validate.ts#validateDirectory()`, called from `scripts/validate-content.ts`
alongside the original lesson/course validation:

- No duplicate category/technology/learning-path ids or slugs.
- Every category's `relatedCategoryIds` resolves to a real category.
- Every public category has at least one public technology (no empty public category pages).
- Every technology's `category` resolves to a real category.
- Every technology's `prerequisiteIds`/`relatedIds` resolve to real technologies, and a
  technology can't reference itself.
- No circular prerequisite chains (A requires B requires A).
- Every technology's `courseId` (if set) resolves to a real course; every `projectIds` entry (if
  set) resolves to a real project.
- Every `status: "legacy"` technology has a non-empty `legacyNote`.
- Every `lastReviewed` is a valid `YYYY-MM-DD` date.
- No learning path is ever `certificateEligible` or `finalAssessmentRequired` (both are hard
  failures regardless of `publicVisibility` — even an internal draft shouldn't carry a false
  promise forward for whoever eventually publishes it).
- Every **public** learning path's every **required** step resolves to real, available content.
  Internal drafts are exempt from this specific check (that's precisely what makes them drafts).
- A sanity cross-check that `getTechnologyAvailability()` never disagrees with a technology's own
  `publicVisibility`/`courseId` fields (guards against the availability-derivation logic itself
  drifting from the schema's guarantees).

## Legacy-technology policy

Mark a technology `status: "legacy"` when it's no longer recommended for new work, and write a
`legacyNote` that does two things: state plainly that it's legacy, and explain _when a learner will
still encounter it_ (maintaining existing code, a specific ecosystem, etc.) so the guide stays
useful rather than dismissive. See `angularjs` (`lib/directory/data/frontend.ts`) for the
reference example — it explains AngularJS is a _different framework_ from modern Angular, not a
version behind it, which is the single most common point of confusion.

`jquery` uses `status: "legacy"` too but is written to explain its _continuing relevance_ in
existing/WordPress codebases rather than presenting it as simply obsolete — legacy status describes
"not recommended for new projects," not "never useful to know."

## Content review expectations

Every technology/category/path record ships with an `lastReviewed` date (or `lastReviewed` on
learning paths). There is currently no separate reviewer identity system for the directory beyond
what `content:owner` on a technology optionally records (only set when a real, named reviewer
exists — never a placeholder name). Treat `lastReviewed` as an honesty commitment: update it when
you materially change a record's factual claims (a version number, a status change, a new
official reference), not on every cosmetic edit.
