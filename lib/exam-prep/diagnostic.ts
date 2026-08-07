import type { PracticeQuestion } from "@/lib/practice/types";
import type { CourseModule } from "@/lib/content/types";

/** How many questions per section (course module) go into the diagnostic. */
const DIAGNOSTIC_PER_SECTION = 2;

/** Maps a lesson slug to the id of the module (section) that owns it. */
export function buildSectionMap(modules: readonly CourseModule[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const mod of modules) {
    for (const slug of mod.lessonSlugs) map.set(slug, mod.id);
  }
  return map;
}

/** All practice questions belonging to lessons in one module (section). */
export function questionsBySection(
  questions: readonly PracticeQuestion[],
  sectionMap: ReadonlyMap<string, string>,
  moduleId: string,
): PracticeQuestion[] {
  return questions.filter((q) => sectionMap.get(q.lessonSlug) === moduleId);
}

/**
 * A short baseline session covering every section: a fixed number of
 * questions from each module in course order, so a learner sees roughly
 * where they stand across the whole exam before diving into one section.
 */
export function buildDiagnostic(
  questions: readonly PracticeQuestion[],
  modules: readonly CourseModule[],
): PracticeQuestion[] {
  const sectionMap = buildSectionMap(modules);
  const result: PracticeQuestion[] = [];
  for (const mod of modules) {
    const pool = questionsBySection(questions, sectionMap, mod.id);
    result.push(...pool.slice(0, DIAGNOSTIC_PER_SECTION));
  }
  return result;
}
