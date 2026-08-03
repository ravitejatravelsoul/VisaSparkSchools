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

// --- Exercise sanity: guided/independent tests reference ids the harness actually reports ---
for (const lesson of allLessons) {
  for (const exercise of [lesson.guidedExercise, lesson.independentExercise]) {
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
for (const lesson of allLessons) {
  const promptsSeen = new Map<string, string>();
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
        `Lesson "${lesson.slug}" quiz questions "${existing}" and "${q.id}" appear to be the same question with only names/numbers changed.`,
      );
    }
    promptsSeen.set(normalized, q.id);
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

console.log("");
if (errorCount > 0) {
  console.error(`✗ Content validation failed with ${errorCount} error(s).\n`);
  process.exit(1);
} else {
  console.log("✓ Content validation passed.\n");
}
