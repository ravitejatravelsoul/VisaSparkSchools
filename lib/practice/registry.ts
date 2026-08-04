import { allLessons, getCourseBySlug } from "@/lib/content/registry";
import type { PracticeQuestion } from "./types";

/**
 * Builds a course's practice question bank by pulling every lesson's
 * existing, already-validated `quiz` array (see docs/CONTENT_AUTHORING.md
 * and `scripts/validate-content.ts`'s quiz-integrity checks) rather than
 * authoring a second, parallel question bank -- this is the "extend, don't
 * duplicate, the existing quiz architecture" decision from Phase 6's brief.
 * Ordering is stable: lessons in course order, questions in each lesson's
 * own quiz order -- callers that want a shuffled presentation order do that
 * themselves via `shuffleWithSeed` (see lib/practice/scoring.ts), keeping
 * this function itself deterministic and side-effect-free.
 */
export function getPracticeQuestionsForCourse(courseSlug: string): PracticeQuestion[] {
  const course = getCourseBySlug(courseSlug);
  if (!course) return [];

  const lessons = allLessons
    .filter((l) => l.courseSlug === courseSlug)
    .sort((a, b) => a.order - b.order);

  return lessons.flatMap((lesson) =>
    lesson.quiz.map((q) => ({
      ...q,
      // Namespaced: a lesson's own quiz ids ("q1", "q2", "q3") repeat across
      // lessons, so only "<lessonId>:<quizId>" is unique across the whole
      // course-wide bank.
      id: `${lesson.id}:${q.id}`,
      topic: lesson.title,
      courseSlug,
      lessonSlug: lesson.slug,
      lessonId: lesson.id,
      difficulty: lesson.difficulty,
      source: `Lesson quiz: ${lesson.title}`,
    })),
  );
}
