import { allLessons, getLessonById } from "@/lib/content/registry";
import type { Lesson } from "@/lib/content/types";
import { isDue, type ReviewResult } from "@/lib/learning/review-schedule";
import type { ProgressState } from "@/lib/learning/types";

/**
 * A flashcard is derived from a lesson's existing quiz -- reusing the exact
 * same content the practice engine (Phase 6, `lib/practice/registry.ts`)
 * already derives its questions from, never a separate authored bank.
 */
export interface ReviewFlashcard {
  id: string;
  lessonId: string;
  lessonTitle: string;
  courseSlug: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export function getDueReviewLessons(state: ProgressState, now: Date = new Date()): Lesson[] {
  return Object.entries(state.reviewQueue)
    .filter(([, review]) => isDue(review.dueAt, now))
    .map(([lessonId]) => getLessonById(lessonId))
    .filter((l): l is Lesson => Boolean(l));
}

/**
 * Lessons backing any course's currently weak practice topics (Phase 6's
 * `topicsNeedingReview`, which is itself a lesson title -- see
 * `lib/practice/registry.ts`). Reviewable on demand regardless of due date,
 * since a weak topic is worth revisiting sooner than its schedule says.
 */
export function getWeakTopicLessons(state: ProgressState): Lesson[] {
  const result: Lesson[] = [];
  const seen = new Set<string>();
  for (const [courseSlug, attempt] of Object.entries(state.practiceAttempts)) {
    if (attempt.topicsNeedingReview.length === 0) continue;
    const topics = new Set(attempt.topicsNeedingReview);
    for (const lesson of allLessons) {
      if (lesson.courseSlug !== courseSlug) continue;
      if (!topics.has(lesson.title)) continue;
      if (seen.has(lesson.id)) continue;
      seen.add(lesson.id);
      result.push(lesson);
    }
  }
  return result;
}

export function buildFlashcardsForLessons(lessons: Lesson[]): ReviewFlashcard[] {
  return lessons.flatMap((lesson) =>
    lesson.quiz.map((q) => ({
      id: `${lesson.id}:${q.id}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      courseSlug: lesson.courseSlug,
      prompt: q.prompt,
      choices: q.choices,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
  );
}

const RESULT_SEVERITY: Record<ReviewResult, number> = { again: 0, hard: 1, good: 2, easy: 3 };

/**
 * Anki-style aggregation: the worst rating given among a lesson's cards
 * decides that lesson's overall review outcome -- struggling on any one
 * question means the whole lesson is due again sooner, not just that card.
 * Defaults to "good" for an empty input so a caller can never pass an empty
 * rating list into `reviewLesson` by mistake and get "again" for free.
 */
export function worstReviewResult(results: ReviewResult[]): ReviewResult {
  if (results.length === 0) return "good";
  return results.reduce((worst, r) => (RESULT_SEVERITY[r] < RESULT_SEVERITY[worst] ? r : worst));
}
