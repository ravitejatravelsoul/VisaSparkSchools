/**
 * Validates the entire content registry at build time: schema conformance,
 * unique ids/slugs, resolvable prerequisites, sane course ordering, and a
 * few "no placeholder content" sanity checks. Run via `npm run content:validate`.
 * The production build (`npm run build`) runs this first and fails the build
 * on any error.
 */
import { lessonSchema, courseSchema, trackSchema, projectSchema } from "../lib/content/types";
import { allLessons, allTracks, allCourses, allProjects } from "../lib/content/registry";
import {
  allCategories,
  allTechnologies,
  allLearningPaths,
  getTechnologyBySlug,
} from "../lib/directory/registry";
import { validateDirectory } from "../lib/directory/validate";
import { countryRoadmaps } from "../lib/study-abroad/registry";

let errorCount = 0;

function fail(message: string) {
  errorCount += 1;
  console.error(`✗ ${message}`);
}

function ok(message: string) {
  console.log(`  ${message}`);
}

console.log("Validating VisaSparkSchools content…\n");

// --- Schema conformance ---
for (const track of allTracks) {
  const result = trackSchema.safeParse(track);
  if (!result.success) fail(`Track "${track.slug}" failed schema: ${result.error.message}`);
}
for (const course of allCourses) {
  const result = courseSchema.safeParse(course);
  if (!result.success) fail(`Course "${course.slug}" failed schema: ${result.error.message}`);
}
for (const project of allProjects) {
  const result = projectSchema.safeParse(project);
  if (!result.success) fail(`Project "${project.slug}" failed schema: ${result.error.message}`);
}
for (const lesson of allLessons) {
  const result = lessonSchema.safeParse(lesson);
  if (!result.success) {
    fail(
      `Lesson "${lesson.slug ?? lesson.id ?? "?"}" failed schema:\n${result.error.issues.map((i) => `    - ${i.path.join(".")}: ${i.message}`).join("\n")}`,
    );
  }
}
ok(
  `Schema-checked ${allTracks.length} tracks, ${allCourses.length} courses, ${allLessons.length} lessons, ${allProjects.length} projects.`,
);

// --- Uniqueness ---
function checkUnique<T>(items: T[], keyFn: (item: T) => string, label: string) {
  const seen = new Map<string, number>();
  for (const item of items) {
    const key = keyFn(item);
    seen.set(key, (seen.get(key) ?? 0) + 1);
  }
  for (const [key, count] of seen) {
    if (count > 1) fail(`Duplicate ${label}: "${key}" appears ${count} times.`);
  }
}
checkUnique(allLessons, (l) => l.id, "lesson id");
checkUnique(allLessons, (l) => l.slug, "lesson slug");
checkUnique(allTracks, (t) => t.slug, "track slug");
checkUnique(allCourses, (c) => c.slug, "course slug");
checkUnique(allProjects, (p) => p.slug, "project slug");

// --- Referential integrity ---
const trackSlugs = new Set(allTracks.map((t) => t.slug));
const courseSlugs = new Set(allCourses.map((c) => c.slug));
const lessonIds = new Set(allLessons.map((l) => l.id));
const lessonSlugs = new Set(allLessons.map((l) => l.slug));

for (const course of allCourses) {
  if (!trackSlugs.has(course.trackSlug)) {
    fail(`Course "${course.slug}" references unknown track "${course.trackSlug}".`);
  }
  for (const prereq of course.prerequisiteCourseSlugs) {
    if (!courseSlugs.has(prereq)) {
      fail(`Course "${course.slug}" references unresolvable prerequisite course "${prereq}".`);
    }
  }
  for (const next of course.nextCourseSlugs) {
    if (!courseSlugs.has(next)) {
      fail(`Course "${course.slug}" references unresolvable next course "${next}".`);
    }
  }
  for (const techSlug of course.relatedTechnologySlugs) {
    if (!getTechnologyBySlug(techSlug)) {
      fail(`Course "${course.slug}" references unresolvable technology slug "${techSlug}".`);
    }
  }
}

// --- Prerequisite courses must be acyclic (a real sequence, not a loop) ---
{
  const prereqGraph = new Map(allCourses.map((c) => [c.slug, c.prerequisiteCourseSlugs]));
  const state = new Map<string, "visiting" | "done">();
  function visit(slug: string, path: string[]): void {
    const status = state.get(slug);
    if (status === "done") return;
    if (status === "visiting") {
      fail(`Course prerequisite cycle detected: ${[...path, slug].join(" -> ")}.`);
      return;
    }
    state.set(slug, "visiting");
    for (const prereq of prereqGraph.get(slug) ?? []) {
      visit(prereq, [...path, slug]);
    }
    state.set(slug, "done");
  }
  for (const course of allCourses) visit(course.slug, []);
}

// --- Module <-> lesson integrity: every lesson belongs to exactly one module,
// every module lesson resolves to a real lesson in that course, and module
// order matches lesson order. ---
for (const course of allCourses) {
  const courseLessons = allLessons.filter((l) => l.courseSlug === course.slug);
  const courseLessonSlugs = new Set(courseLessons.map((l) => l.slug));
  const claimedByModule = new Map<string, string>();

  for (const mod of course.modules) {
    if (mod.lessonSlugs.length === 0) {
      fail(`Course "${course.slug}" module "${mod.id}" has no lessons.`);
    }
    for (const slug of mod.lessonSlugs) {
      if (!courseLessonSlugs.has(slug)) {
        fail(
          `Course "${course.slug}" module "${mod.id}" references lesson "${slug}", which is not a lesson of this course.`,
        );
        continue;
      }
      const existingModule = claimedByModule.get(slug);
      if (existingModule) {
        fail(
          `Course "${course.slug}" lesson "${slug}" is claimed by two modules: "${existingModule}" and "${mod.id}".`,
        );
      }
      claimedByModule.set(slug, mod.id);
    }
  }

  for (const lesson of courseLessons) {
    if (!claimedByModule.has(lesson.slug)) {
      fail(`Course "${course.slug}" lesson "${lesson.slug}" does not belong to any module.`);
    }
  }
}

// --- Complete-course definition (Phase 5A): every PUBLIC course must meet the
// minimum bar so the catalog never shows a shallow guide as a full course. A
// course under active authoring should be kept out of the registries entirely
// (not marked "draft" -- there is no such flag, by design: see
// docs/CONTENT_AUTHORING.md's "complete course" section).
//
// EXEMPT_SHORT_COURSES: the five pre-Phase-5A courses predate this bar.
// Each is real, complete, verified content (schema-checked, exercises
// snippet-validated, previously audited in Phase 3/4) -- not a shallow
// guide -- but ranges from 3 to 9 lessons, short of the 12-lesson minimum
// this phase sets for *new* courses. Retroactively enforcing that minimum
// against already-good material would mean either padding it with filler
// (explicitly forbidden by this phase's brief) or removing working courses
// from the public catalog (also forbidden). "How Computing & the Web Work"
// is additionally an intentional short primer by design, not a full course
// at all. Every course added from Phase 5A onward must meet the real
// minimum with no exemption; adding a slug here for a new course is not a
// valid way to skip the bar -- see docs/CONTENT_AUTHORING.md. ---
const EXEMPT_SHORT_COURSES = new Set<string>([
  "how-computing-works",
  "html-css-fundamentals",
  "javascript-fundamentals",
  "python-fundamentals",
  "git-apis-sql",
]);
const MIN_LESSONS_PER_COMPLETE_COURSE = 12;
const MIN_MODULES_PER_COMPLETE_COURSE = 4;
for (const course of allCourses) {
  if (EXEMPT_SHORT_COURSES.has(course.slug)) continue;
  const courseLessons = allLessons.filter((l) => l.courseSlug === course.slug);
  if (courseLessons.length < MIN_LESSONS_PER_COMPLETE_COURSE) {
    fail(
      `Course "${course.slug}" has ${courseLessons.length} lesson(s), below the ${MIN_LESSONS_PER_COMPLETE_COURSE}-lesson minimum for a published complete course.`,
    );
  }
  if (course.modules.length < MIN_MODULES_PER_COMPLETE_COURSE) {
    fail(
      `Course "${course.slug}" has ${course.modules.length} module(s), below the ${MIN_MODULES_PER_COMPLETE_COURSE}-module minimum for a published complete course.`,
    );
  }
  if (course.learningOutcomes.length < 3) {
    fail(`Course "${course.slug}" has fewer than 3 learning outcomes.`);
  }
}

for (const lesson of allLessons) {
  if (!trackSlugs.has(lesson.trackSlug)) {
    fail(`Lesson "${lesson.slug}" references unknown track "${lesson.trackSlug}".`);
  }
  if (!courseSlugs.has(lesson.courseSlug)) {
    fail(`Lesson "${lesson.slug}" references unknown course "${lesson.courseSlug}".`);
  }
  for (const prereqId of lesson.prerequisites) {
    if (!lessonIds.has(prereqId)) {
      fail(`Lesson "${lesson.slug}" has unresolvable prerequisite id "${prereqId}".`);
    }
  }
  if (lesson.nextLessonSlug && !lessonSlugs.has(lesson.nextLessonSlug)) {
    fail(`Lesson "${lesson.slug}" has unresolvable nextLessonSlug "${lesson.nextLessonSlug}".`);
  }
}

for (const project of allProjects) {
  for (const trackSlug of project.trackSlugs) {
    if (!trackSlugs.has(trackSlug)) {
      fail(`Project "${project.slug}" references unknown track "${trackSlug}".`);
    }
  }
  for (const prereqId of project.prerequisiteLessonIds) {
    if (!lessonIds.has(prereqId)) {
      fail(
        `Project "${project.slug}" references unresolvable prerequisite lesson id "${prereqId}".`,
      );
    }
  }
}

// --- Course ordering: no duplicate `order` within the same course ---
const orderByCourse = new Map<string, number[]>();
for (const lesson of allLessons) {
  const list = orderByCourse.get(lesson.courseSlug) ?? [];
  list.push(lesson.order);
  orderByCourse.set(lesson.courseSlug, list);
}
for (const [courseSlug, orders] of orderByCourse) {
  const seen = new Set<number>();
  for (const o of orders) {
    if (seen.has(o)) fail(`Course "${courseSlug}" has two lessons with the same order value ${o}.`);
    seen.add(o);
  }
}

// --- No placeholder / lorem ipsum content ---
// Note: "TODO:" and "placeholder" are intentionally excluded — they're legitimate
// in exercise starter-code scaffolding ("# TODO: implement...") and HTML forms
// (the placeholder="..." attribute), not signs of unfinished lesson content.
const placeholderPatterns = [/lorem ipsum/i, /coming soon/i, /\bTBD\b/, /\bxxx\b/i];
for (const lesson of allLessons) {
  const haystack = JSON.stringify(lesson);
  for (const pattern of placeholderPatterns) {
    if (pattern.test(haystack)) {
      fail(`Lesson "${lesson.slug}" appears to contain placeholder text matching ${pattern}.`);
    }
  }
}

// --- Lesson shape consistency (Phase 6): example/guidedExercise/
// independentExercise became optional on lessonSchema so exam-preparation
// lessons (reading/listening/writing, no meaningful code example) don't have
// to fabricate one. This is NOT a general relaxation of the quality bar --
// every course outside this explicit allow-list must still provide all
// three, and every exam-prep lesson must consistently omit all three rather
// than mixing shapes. ---
const EXAM_PREP_COURSE_SLUGS = new Set<string>([
  "ielts-preparation",
  "pte-academic-preparation",
  "toefl-ibt-preparation",
  "gre-general-test-preparation",
]);
for (const lesson of allLessons) {
  const isExamPrep = EXAM_PREP_COURSE_SLUGS.has(lesson.courseSlug);
  const hasAnyCodeFields = Boolean(
    lesson.example || lesson.guidedExercise || lesson.independentExercise,
  );
  const hasAllCodeFields = Boolean(
    lesson.example && lesson.guidedExercise && lesson.independentExercise,
  );
  if (isExamPrep && hasAnyCodeFields) {
    fail(
      `Lesson "${lesson.slug}" belongs to an exam-prep course but declares example/guidedExercise/independentExercise -- exam-prep lessons must omit all three, not mix content shapes.`,
    );
  }
  if (!isExamPrep && !hasAllCodeFields) {
    fail(
      `Lesson "${lesson.slug}" is missing example/guidedExercise/independentExercise -- only courses in EXAM_PREP_COURSE_SLUGS may omit these.`,
    );
  }
}

// --- Exercise sanity: guided/independent tests reference ids the harness actually reports ---
// Exam-prep lessons (Phase 6) legitimately have neither -- filtered out here
// rather than at the loop's callers, so this stays the one place that knows
// "no exercise" is valid for that course category.
for (const lesson of allLessons) {
  const exercises = [lesson.guidedExercise, lesson.independentExercise].filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );
  for (const exercise of exercises) {
    const testIds = new Set(exercise.tests.map((t) => t.id));
    if (testIds.size !== exercise.tests.length) {
      fail(`Lesson "${lesson.slug}" exercise "${exercise.id}" has duplicate test ids.`);
    }
    if (exercise.language === "sql" && !exercise.seedSql) {
      fail(`Lesson "${lesson.slug}" exercise "${exercise.id}" is SQL but missing seedSql.`);
    }
    // Every declared test id must actually be reported by the harness --
    // otherwise the test can never pass or fail, it simply never runs. Only
    // applies to html/javascript/typescript exercises: those run in the
    // sandboxed iframe and report via window.__report(id, ...) calls written
    // directly into `harness`. SQL exercises use a different model entirely
    // (components/runners/sql-runner.tsx compares the learner's query result
    // against the solution query's result and derives pass/fail by test
    // position, not by a harness string), so this check does not apply to
    // them -- checking for a literal id substring in SQL's harness field
    // would be meaningless and produced false positives here in review.
    if (
      exercise.language === "html" ||
      exercise.language === "javascript" ||
      exercise.language === "typescript"
    ) {
      for (const test of exercise.tests) {
        if (
          !exercise.harness.includes(`'${test.id}'`) &&
          !exercise.harness.includes(`"${test.id}"`)
        ) {
          fail(
            `Lesson "${lesson.slug}" exercise "${exercise.id}" declares test "${test.id}" but the harness never calls __report('${test.id}', ...).`,
          );
        }
      }
    }
  }
}

// --- Guided local labs (Phase 5A.2): most "required X" minimums are already
// enforced structurally by guidedLocalLabSchema's min(1)/min(2) constraints
// at parse time (lib/content/registry.ts) -- a lab with zero setup steps or
// zero verification steps never reaches this script at all. What's left here
// is what a single-object schema can't express: global id uniqueness, file-
// relationship sanity, and the "never claim the browser ran this" rule. ---
{
  const labIds = new Map<string, string>();
  const FALSE_EXECUTION_PHRASES = [
    /\bwe (ran|ran it|executed|verified|tested) (it|this|your code)\b/i,
    /\bautomatically verified\b/i,
    /\bclick run\b/i,
    /\bruns? in your browser\b/i,
    /\bthe browser (ran|executed)\b/i,
    /\bvisasparkschools (ran|executed|verified)\b/i,
  ];
  for (const lesson of allLessons) {
    const lab = lesson.guidedLocalLab;
    if (!lab) continue;

    const existing = labIds.get(lab.id);
    if (existing) {
      fail(`Guided local lab id "${lab.id}" is used by both "${existing}" and "${lesson.slug}".`);
    }
    labIds.set(lab.id, lesson.slug);

    const starterPaths = lab.starterFiles.map((f) => f.path);
    if (new Set(starterPaths).size !== starterPaths.length) {
      fail(`Lesson "${lesson.slug}" guided local lab has duplicate starter file paths.`);
    }
    const solutionPaths = lab.referenceSolution.files.map((f) => f.path);
    if (new Set(solutionPaths).size !== solutionPaths.length) {
      fail(`Lesson "${lesson.slug}" guided local lab has duplicate reference-solution file paths.`);
    }
    // A solution that is byte-identical to the starter teaches nothing --
    // catches a copy-pasted placeholder rather than a real worked answer.
    const starterByPath = new Map(lab.starterFiles.map((f) => [f.path, f.content]));
    const identicalToStarter = lab.referenceSolution.files.every(
      (f) => starterByPath.get(f.path) === f.content,
    );
    if (identicalToStarter && lab.starterFiles.length === lab.referenceSolution.files.length) {
      fail(
        `Lesson "${lesson.slug}" guided local lab's reference solution is identical to its starter files.`,
      );
    }

    const labText = JSON.stringify(lab);
    for (const pattern of FALSE_EXECUTION_PHRASES) {
      if (pattern.test(labText)) {
        fail(
          `Lesson "${lesson.slug}" guided local lab text matches a false-execution-claim pattern (${pattern}) -- a guided local lab must never imply VisaSparkSchools ran, executed, or verified local code.`,
        );
      }
    }
  }
}

// --- Guided output labs (Phase 8): languages with no safe browser
// execution path at all (see docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md).
// Structural minimums (>=1 step, >=1 hint) are already enforced by
// guidedOutputLabSchema at parse time -- this checks id uniqueness, fill-in-
// blank internal consistency, and the same "never claim this ran" rule
// guided local labs enforce, plus the fixed "Expected output" labeling
// promise (a lesson's own text must never call it "Your output"). ---
{
  const outputLabIds = new Map<string, string>();
  const FALSE_EXECUTION_PHRASES = [
    /\bwe (ran|ran it|executed|verified|tested) (it|this|your code)\b/i,
    /\bautomatically verified\b/i,
    /\bclick run\b/i,
    /\bruns? in your browser\b/i,
    /\bthe browser (ran|executed)\b/i,
    /\bvisasparkschools (ran|executed|verified)\b/i,
    /\byour output\b/i,
  ];
  for (const lesson of allLessons) {
    const lab = lesson.guidedOutputLab;
    if (!lab) continue;

    const existing = outputLabIds.get(lab.id);
    if (existing) {
      fail(`Guided output lab id "${lab.id}" is used by both "${existing}" and "${lesson.slug}".`);
    }
    outputLabIds.set(lab.id, lesson.slug);

    if (lab.mode === "fill-in-blank") {
      const step = lab.steps[0];
      if (lab.blankPlaceholder && !step.code.includes(lab.blankPlaceholder)) {
        fail(
          `Lesson "${lesson.slug}" guided output lab "${lab.id}" declares blankPlaceholder "${lab.blankPlaceholder}" but its step code never contains it.`,
        );
      }
    }

    if (lab.mode === "guided-editing") {
      for (const step of lab.steps) {
        if (!step.description) {
          fail(
            `Lesson "${lesson.slug}" guided output lab "${lab.id}": every guided-editing step needs a description.`,
          );
        }
      }
    }

    const labText = JSON.stringify(lab);
    for (const pattern of FALSE_EXECUTION_PHRASES) {
      if (pattern.test(labText)) {
        fail(
          `Lesson "${lesson.slug}" guided output lab text matches a false-execution-claim pattern (${pattern}) -- a guided output lab must never imply the code ran, or call the result "your output" instead of "Expected output".`,
        );
      }
    }
  }
}

// --- Quiz integrity: valid answer indexes, no duplicate questions within a
// lesson, and no two quiz questions across the same course that are
// identical apart from a renamed variable/value (a shallow-rewrite check). ---
function normalizeForDuplicateCheck(text: string): string {
  return text
    .toLowerCase()
    .replace(/[a-z_][a-z0-9_]*/gi, (word) => (/^[a-z]$/i.test(word) ? "X" : word))
    .replace(/\d+/g, "N")
    .replace(/\s+/g, " ")
    .trim();
}
// Scoped per course (not per lesson): Phase 6's practice sessions pool every
// lesson's quiz questions into one course-wide bank (see
// lib/practice/registry.ts), so a near-duplicate question sitting in two
// different lessons of the same course would surface twice in that pool --
// exactly what this check exists to catch, matching the comment above.
const promptsSeenByCourse = new Map<string, Map<string, string>>();
for (const lesson of allLessons) {
  const promptsSeen = promptsSeenByCourse.get(lesson.courseSlug) ?? new Map<string, string>();
  promptsSeenByCourse.set(lesson.courseSlug, promptsSeen);
  for (const q of lesson.quiz) {
    if (q.correctIndex < 0 || q.correctIndex >= q.choices.length) {
      fail(
        `Lesson "${lesson.slug}" quiz question "${q.id}" has correctIndex ${q.correctIndex} out of range for ${q.choices.length} choices.`,
      );
    }
    const choiceSet = new Set(q.choices.map((c) => c.trim().toLowerCase()));
    if (choiceSet.size !== q.choices.length) {
      fail(`Lesson "${lesson.slug}" quiz question "${q.id}" has duplicate choice text.`);
    }
    const normalized = normalizeForDuplicateCheck(q.prompt);
    const existing = promptsSeen.get(normalized);
    if (existing) {
      fail(
        `Course "${lesson.courseSlug}" quiz questions "${existing}" and "${lesson.slug}:${q.id}" appear to be the same question with only names/numbers changed.`,
      );
    }
    promptsSeen.set(normalized, `${lesson.slug}:${q.id}`);
  }
}

// --- Technology directory (Phase 3): categories, technologies, learning paths ---
// allCategories/allTechnologies/allLearningPaths already ran every record
// through its Zod schema at import time (lib/directory/registry.ts), so a
// malformed record throws before we even get here. This section covers the
// cross-reference/business-rule checks a schema alone can't express.
for (const issue of validateDirectory()) {
  fail(`[directory] ${issue.record} (${issue.field}): ${issue.message}`);
}
ok(
  `Directory-checked ${allCategories.length} categories, ${allTechnologies.length} technologies, ${allLearningPaths.length} learning paths.`,
);

// --- Study Abroad (Phase 5): countryRoadmaps already ran every record
// through countryRoadmapSchema at import time (lib/study-abroad/registry.ts
// parses eagerly, same precedent as the directory registry above), so a
// malformed roadmap or a missing/duplicate/misordered step throws before we
// get here. This section covers what a schema alone can't express: that
// "official sources" really are official, and that no country's content has
// drifted into a hardcoded fee/date or a guarantee/authority claim. ---
{
  // Exact hostnames (or their subdomains) verified as real government/
  // education-ministry sources when each country's content was written --
  // see docs/product-expansion/DECISIONS.md's "Study-abroad content
  // sourcing" note. Adding a country later means adding its verified
  // domain(s) here too, not just writing the content.
  const ALLOWED_OFFICIAL_HOSTS = [
    "studyinthestates.dhs.gov",
    "uscis.gov",
    "travel.state.gov",
    "canada.ca",
    "gov.uk",
    "homeaffairs.gov.au",
    "studyaustralia.gov.au",
    "study-in-germany.de",
    "auswaertiges-amt.de",
    "citizensinformation.ie",
    "irishimmigration.ie",
  ];
  const isAllowedHost = (url: string) => {
    let host: string;
    try {
      host = new URL(url).hostname.toLowerCase();
    } catch {
      return false;
    }
    return ALLOWED_OFFICIAL_HOSTS.some(
      (allowed) => host === allowed || host.endsWith(`.${allowed}`),
    );
  };

  const GUARANTEE_PHRASES = [
    /\bguarantee[sd]?\b/i,
    /\bwill be (admitted|approved|accepted)\b/i,
    /\b100% (chance|success)\b/i,
  ];
  const AUTHORITY_CLAIM_PHRASES = [
    /\bwe are (a |an )?(government|university|official|legal)\b/i,
    /\bvisasparkschools is (a |an )?(government|university|licensed (immigration|legal))\b/i,
  ];
  // A bare currency figure ($1,234 / £1,234 / €1,234) presented as fact --
  // every fee/amount in this content must be phrased generally instead
  // (e.g. "check the current official amount") since these change and the
  // content is dated by lastReviewed, not a live feed.
  const HARDCODED_CURRENCY = /[$£€]\s?\d[\d,]*/;

  const seenSlugs = new Set<string>();
  for (const country of countryRoadmaps) {
    if (seenSlugs.has(country.countrySlug)) {
      fail(`[study-abroad] Duplicate countrySlug "${country.countrySlug}".`);
    }
    seenSlugs.add(country.countrySlug);

    if (Number.isNaN(new Date(country.lastReviewed).getTime())) {
      fail(`[study-abroad] "${country.countryName}" has an unparseable lastReviewed date.`);
    }

    for (const source of country.officialSources) {
      if (!isAllowedHost(source.url)) {
        fail(
          `[study-abroad] "${country.countryName}" official source "${source.label}" (${source.url}) is not on the verified official-domain allow-list.`,
        );
      }
    }
    for (const step of country.steps) {
      for (const link of step.officialSourceLinks) {
        if (!isAllowedHost(link.url)) {
          fail(
            `[study-abroad] "${country.countryName}" step "${step.stepId}" source link "${link.label}" (${link.url}) is not on the verified official-domain allow-list.`,
          );
        }
      }
    }

    const countryText = JSON.stringify(country);
    for (const pattern of GUARANTEE_PHRASES) {
      if (pattern.test(countryText)) {
        fail(
          `[study-abroad] "${country.countryName}" content matches a guarantee-language pattern (${pattern}) -- admission/visa/scholarship outcomes must never be guaranteed.`,
        );
      }
    }
    for (const pattern of AUTHORITY_CLAIM_PHRASES) {
      if (pattern.test(countryText)) {
        fail(
          `[study-abroad] "${country.countryName}" content matches an authority-claim pattern (${pattern}) -- this platform must never claim to be a government, university, or licensed legal/immigration body.`,
        );
      }
    }
    if (HARDCODED_CURRENCY.test(countryText)) {
      fail(
        `[study-abroad] "${country.countryName}" content contains a hardcoded currency figure -- fees/amounts must be phrased generally (e.g. "check the current official amount") since they change and this content is dated, not live.`,
      );
    }
  }
  ok(`Study Abroad-checked ${countryRoadmaps.length} country roadmaps (23 steps each).`);
}

console.log("");
if (errorCount > 0) {
  console.error(`✗ Content validation failed with ${errorCount} error(s).\n`);
  process.exit(1);
} else {
  console.log("✓ Content validation passed.\n");
}
