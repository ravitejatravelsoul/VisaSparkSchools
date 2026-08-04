import type { QuizQuestion, Difficulty } from "@/lib/content/types";

/**
 * A single practice question, derived from a lesson's existing quiz (see
 * `getPracticeQuestionsForCourse` in `lib/practice/registry.ts`) rather than
 * authored separately -- Phase 6's brief asked to extend, not duplicate, the
 * existing quiz architecture. `id` is namespaced (`<lessonId>:<quizId>`)
 * because lesson quiz ids like "q1"/"q2"/"q3" repeat across lessons and are
 * only unique within one lesson's own `quiz` array; namespacing here is what
 * makes every question in a course-wide practice bank have one stable,
 * globally-unique identifier.
 */
export interface PracticeQuestion extends QuizQuestion {
  /** Human-readable grouping for the topic/score breakdown -- currently the owning lesson's title. */
  topic: string;
  courseSlug: string;
  lessonSlug: string;
  lessonId: string;
  difficulty: Difficulty;
  /** Always an internal attribution (never a claim of external/proprietary sourcing) -- see docs/CONTENT_AUTHORING.md. */
  source: string;
}

export type PracticeMode = "untimed" | "timed";

/** Selectable total time budgets for a timed session, in minutes. */
export const TIMED_MODE_MINUTES = [10, 20, 30] as const;
export type TimedModeMinutes = (typeof TIMED_MODE_MINUTES)[number];

export interface TopicBreakdownEntry {
  topic: string;
  correct: number;
  total: number;
}

export interface PracticeScoreResult {
  correct: number;
  total: number;
  /** Practice question ids (namespaced, see PracticeQuestion.id) the learner answered incorrectly. */
  incorrectQuestionIds: string[];
  topicBreakdown: TopicBreakdownEntry[];
  /** Topics scoring below the review threshold on this attempt. */
  topicsNeedingReview: string[];
}
