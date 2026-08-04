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

/**
 * A note on a lesson. Versioned so a guest-to-account merge never silently
 * drops one side's writing: if both sides edited the same lesson's note to
 * different text, the more recently edited one becomes `text` and the other
 * is preserved under `conflict` for the learner to review and restore
 * instead of being discarded (see `mergeProgress` in storage.ts).
 */
export interface NoteState {
  text: string;
  updatedAt: string;
  conflict?: { text: string; updatedAt: string };
}

/** One row per course the learner has started. Enrolling is idempotent. */
export interface EnrollmentState {
  enrolledAt: string;
  lastAccessedLessonId?: string;
  lastAccessedAt?: string;
}

/**
 * Progress following a public learning roadmap. `completedStepIds` only ever
 * holds *self-reported* step ids -- steps whose completion can be derived
 * from real data (a `course` step from lesson completion, a `project` step
 * from milestone completion) are never stored here, to avoid a stored flag
 * silently going stale and contradicting the derived truth. See
 * `lib/learning/completion.ts#resolveStepStatus`.
 */
export interface RoadmapProgressState {
  startedAt: string;
  lastAccessedAt: string;
  completedStepIds: string[];
}

/** Per-project milestone checklist progress. Project completion is derived (all milestone ids present). */
export interface ProjectProgressState {
  startedAt: string;
  completedMilestoneIds: string[];
}

/**
 * Small, explicit allowlist of event types -- kept short on purpose so the
 * activity feed stays meaningful instead of becoming a raw interaction log.
 */
export type ActivityEventType =
  | "lesson-completed"
  | "course-enrolled"
  | "course-completed"
  | "roadmap-started"
  | "roadmap-step-completed"
  | "roadmap-completed"
  | "project-milestone-completed"
  | "project-completed"
  | "bookmark-added";

export interface ActivityEvent {
  /** Stable, idempotent id (e.g. "lesson-completed:js-variables") -- logging the same event twice never duplicates it. */
  id: string;
  type: ActivityEventType;
  refId: string;
  title: string;
  at: string;
}

/**
 * Summary of a learner's practice-session attempts for one course (Phase 6).
 * Deliberately a *summary*, not a full attempt history or raw answers: only
 * the best score achieved, when the course was last practiced, and which
 * topics are still weak enough to need review. No free-form learner input is
 * ever stored here (every practice question is multiple-choice).
 */
export interface PracticeAttemptState {
  bestScore: number;
  bestTotal: number;
  lastAttemptedAt: string;
  /** Topic tags (see lib/practice/types.ts) below the review threshold on the most recent attempt. */
  topicsNeedingReview: string[];
}

export interface ProfileState {
  displayName: string | null;
  learningGoal: string | null;
  currentRoadmapId: string | null;
  /** IANA timezone (e.g. "America/Los_Angeles"); null means "use the browser's timezone". */
  timezone: string | null;
  updatedAt: string;
}

/** The full shape persisted to localStorage (guest mode) or Supabase (signed in). */
export interface ProgressState {
  version: 4;
  lessonStatus: Record<string, LessonStatus>;
  exerciseAttempts: Record<string, ExerciseAttemptState>;
  quizResults: Record<string, QuizResultState>;
  /** skill tag -> 0-100 mastery score */
  skillMastery: Record<string, number>;
  /** lesson id -> review scheduling state; only present once a lesson is completed */
  reviewQueue: Record<string, ReviewState>;
  bookmarks: string[];
  notes: Record<string, NoteState>;
  streak: StreakState;
  dailyGoalMinutes: number;
  /** lesson ids, most recently viewed first, capped at 10 */
  recentlyViewed: string[];
  /** course id -> enrollment state */
  enrollments: Record<string, EnrollmentState>;
  /** learning path id -> roadmap progress state */
  roadmapProgress: Record<string, RoadmapProgressState>;
  /** project id -> milestone checklist progress */
  projectProgress: Record<string, ProjectProgressState>;
  /** course slug -> practice session summary (Phase 6) */
  practiceAttempts: Record<string, PracticeAttemptState>;
  /** newest first, capped at 50 */
  activity: ActivityEvent[];
  profile: ProfileState;
}

export function createEmptyProgress(): ProgressState {
  return {
    version: 4,
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
    enrollments: {},
    roadmapProgress: {},
    projectProgress: {},
    practiceAttempts: {},
    activity: [],
    profile: {
      displayName: null,
      learningGoal: null,
      currentRoadmapId: null,
      timezone: null,
      updatedAt: new Date(0).toISOString(),
    },
  };
}
