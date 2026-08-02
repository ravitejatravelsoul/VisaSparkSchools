/**
 * Validates the entire content registry at build time: schema conformance,
 * unique ids/slugs, resolvable prerequisites, sane course ordering, and a
 * few "no placeholder content" sanity checks. Run via `npm run content:validate`.
 * The production build (`npm run build`) runs this first and fails the build
 * on any error.
 */
import { lessonSchema, courseSchema, trackSchema, projectSchema } from "../lib/content/types";
import { allLessons, allTracks, allCourses, allProjects } from "../lib/content/registry";
import { allCategories, allTechnologies, allLearningPaths } from "../lib/directory/registry";
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
