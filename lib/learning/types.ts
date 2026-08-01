export type LessonStatus = "not-started" | "in-progress" | "completed";

export interface ExerciseAttemptState {
  attempts: number;
  completed: boolean;
  hintsUsed: number;
}

export interface QuizResultState {
  correct: number;
  total: number;
  lastAttemptAt: string;
}

export interface ReviewState {
  /** ISO date string; the lesson is "due" once now >= dueAt. */
  dueAt: string;
  intervalDays: number;
}

export interface StreakState {
  current: number;
  /** ISO date (yyyy-mm-dd) of the last day the learner did anything counted. */
  lastActiveDate: string | null;
}

/** The full shape persisted to localStorage (guest mode) or Supabase (signed in). */
export interface ProgressState {
  version: 2;
  lessonStatus: Record<string, LessonStatus>;
  exerciseAttempts: Record<string, ExerciseAttemptState>;
  quizResults: Record<string, QuizResultState>;
  /** skill tag -> 0-100 mastery score */
  skillMastery: Record<string, number>;
  /** lesson id -> review scheduling state; only present once a lesson is completed */
  reviewQueue: Record<string, ReviewState>;
  bookmarks: string[];
  notes: Record<string, string>;
  streak: StreakState;
  dailyGoalMinutes: number;
  /** lesson ids, most recently viewed first, capped at 10 */
  recentlyViewed: string[];
}

export function createEmptyProgress(): ProgressState {
  return {
    version: 2,
    lessonStatus: {},
    exerciseAttempts: {},
    quizResults: {},
    skillMastery: {},
    reviewQueue: {},
    bookmarks: [],
    notes: {},
    streak: { current: 0, lastActiveDate: null },
    dailyGoalMinutes: 20,
    recentlyViewed: [],
  };
}
