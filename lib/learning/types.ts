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
  | "bookmark-added"
  | "focus-session-completed";

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

/**
 * A learner-authored study plan (Phase 7). Stores only a *schedule* --
 * which real lesson id lands on which calendar day -- never a duplicate
 * completion flag. "Done" is always read live from `lessonStatus`, exactly
 * like course/roadmap completion elsewhere in this file; a plan can never
 * fall out of sync with real progress because it never stores progress of
 * its own.
 */
export interface StudyPlanState {
  id: string;
  title: string;
  /** Real course slugs this plan covers -- a learning-path selection is expanded to its course steps at creation time. */
  courseSlugs: string[];
  createdAt: string;
  updatedAt: string;
  /** yyyy-mm-dd; null means open-ended (no target). */
  targetDate: string | null;
  /** 0 (Sunday) - 6 (Saturday), at least one day. */
  preferredDaysOfWeek: number[];
  minutesPerSession: number;
  status: "active" | "paused";
  /** yyyy-mm-dd -> lesson ids scheduled that day, in order. */
  schedule: Record<string, string[]>;
}

/**
 * The learner's one current/paused focus timer (Phase 7) -- not a history
 * list. Elapsed time is always *computed* from these timestamps
 * (`accumulatedSeconds` plus, if running, `now - runningSince`), never
 * incremented by a client-side counter -- so two tabs open on the same
 * session compute the identical elapsed time from the same persisted
 * numbers instead of racing to update a shared counter.
 */
export interface FocusSessionState {
  id: string;
  mode: "untimed" | "countdown";
  countdownMinutes?: number;
  lessonId?: string;
  courseSlug?: string;
  startedAt: string;
  accumulatedSeconds: number;
  /** ISO timestamp the current run segment resumed at; null while paused. */
  runningSince: string | null;
}

export interface ProfileState {
  displayName: string | null;
  learningGoal: string | null;
  currentRoadmapId: string | null;
  /** IANA timezone (e.g. "America/Los_Angeles"); null means "use the browser's timezone". */
  timezone: string | null;
  updatedAt: string;
}

export type CertificateType = "course-completion" | "skill-achievement";

/**
 * A learner-issued certificate record (Phase 9). Immutable once issued --
 * see lib/certificates/eligibility.ts for the eligibility rules and
 * lib/learning/store.ts#issueCertificate for the deterministic, idempotent
 * issuance action that creates these. Every descriptive field is a snapshot
 * taken at issuance time and never re-read live, so a later course rename,
 * requirement change, or profile display-name edit can never silently
 * rewrite an already-issued certificate.
 */
export interface CertificateState {
  /** Deterministic: `${type}:${targetId}` -- the same (type, course) pair can never issue a second, separate record. */
  id: string;
  type: CertificateType;
  /** The course slug this certificate recognizes. */
  targetId: string;
  /** Snapshot of the course's title at issuance. */
  targetTitle: string;
  /** Snapshot of the learner's chosen display name at issuance ("Guest Learner" if none was set). */
  displayName: string;
  issuedAt: string;
  /** Human-readable snapshot of the specific criteria that were true at issuance -- never recomputed later. */
  criteriaSnapshot: string[];
  /** A fixed marker for the eligibility ruleset version used at issuance, so a future change to the rules doesn't retroactively reinterpret an already-issued certificate. */
  contentVersionRef: string;
  /** Random, non-enumerable id used only for public verification lookups -- never derived from account data, never sequential. */
  verificationCode: string;
}

/** The full shape persisted to localStorage (guest mode) or Supabase (signed in). */
export interface ProgressState {
  version: 6;
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
  /** plan id -> study plan (Phase 7) */
  studyPlans: Record<string, StudyPlanState>;
  /** The one current/paused focus timer, if any (Phase 7). */
  activeFocusSession: FocusSessionState | null;
  /** yyyy-mm-dd -> minutes of active (unpaused) focus time that day. Pruned to the most recent 90 days on every write -- bounded, never unbounded history. */
  focusMinutesByDate: Record<string, number>;
  /** Today's dismissed Study Studio queue item ids -- reset (treated as empty) whenever `date` isn't today, so this can never grow unbounded either. */
  todayDismissed: { date: string; itemIds: string[] };
  /** newest first, capped at 50 */
  activity: ActivityEvent[];
  profile: ProfileState;
  /** certificate id -> issued certificate record (Phase 9) */
  certificates: Record<string, CertificateState>;
}

export function createEmptyProgress(): ProgressState {
  return {
    version: 6,
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
    studyPlans: {},
    activeFocusSession: null,
    focusMinutesByDate: {},
    todayDismissed: { date: "", itemIds: [] },
    activity: [],
    profile: {
      displayName: null,
      learningGoal: null,
      currentRoadmapId: null,
      timezone: null,
      updatedAt: new Date(0).toISOString(),
    },
    certificates: {},
  };
}
