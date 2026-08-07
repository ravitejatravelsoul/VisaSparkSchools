"use client";

import { create } from "zustand";
import {
  createEmptyProgress,
  type ProgressState,
  type LessonStatus,
  type ActivityEvent,
  type StudyPlanState,
  type FocusSessionState,
  type CertificateState,
  type CertificateType,
} from "@/lib/learning/types";
import {
  buildCertificateId,
  getCourseCompletionEligibility,
  getSkillAchievementEligibility,
  ELIGIBILITY_RULESET_VERSION,
} from "@/lib/certificates/eligibility";
import {
  loadProgressFrom,
  saveProgressTo,
  STORAGE_KEY,
  pruneFocusMinutes,
  perUserStorageKey,
  getLastUserId,
} from "@/lib/learning/storage";
import { calculateLessonMasteryContribution, averageMastery } from "@/lib/learning/mastery";
import { addDays, nextIntervalDays, type ReviewResult } from "@/lib/learning/review-schedule";
import { localDateKey } from "@/lib/learning/daily-goal";
import { normalizeName } from "@/lib/profile/name";
import { isLearnerLevel } from "@/lib/profile/learner-level";
import { buildSchedule, type StudySchedule } from "@/lib/study-plan/planner";
import {
  allLessons,
  getCourseBySlug,
  getLessonById,
  getLessonsForCourse,
  getProjectBySlug,
} from "@/lib/content/registry";
import {
  getRoadmapBySlugSafe,
  isCourseComplete,
  isProjectComplete,
  isRoadmapComplete,
  SELF_REPORTED_STEP_TYPES,
} from "@/lib/learning/completion";
import type { Lesson } from "@/lib/content/types";

function generateId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const lessonMinutesById: Record<string, number> = Object.fromEntries(
  allLessons.map((l) => [l.id, l.estimatedMinutes]),
);

/**
 * Rebuilds a plan's schedule from `today` onward: every lesson already
 * completed on a past date keeps its real historical placement untouched,
 * and everything else -- overdue incomplete lessons, anything still
 * upcoming, and (if `plan.courseSlugs` changed) any newly-added course's
 * lessons -- is freshly packed starting today via the same deterministic
 * `buildSchedule` the initial plan creation uses. Shared by
 * `recalculateStudyPlan` (explicit user action) and `updateStudyPlan`
 * (whenever a scheduling-relevant field changes).
 */
function rebuildPlanSchedule(
  plan: StudyPlanState,
  lessonStatus: Record<string, LessonStatus>,
  today: string,
): StudySchedule {
  const keptHistory: StudySchedule = {};
  for (const [dateKey, lessonIds] of Object.entries(plan.schedule)) {
    if (dateKey >= today) continue;
    const completed = lessonIds.filter((id) => lessonStatus[id] === "completed");
    if (completed.length > 0) keptHistory[dateKey] = completed;
  }
  const alreadyPlacedHistorically = new Set(Object.values(keptHistory).flat());
  const freshLessonIds = plan.courseSlugs
    .flatMap((slug) => getLessonsForCourse(slug))
    .filter((l) => lessonStatus[l.id] !== "completed" && !alreadyPlacedHistorically.has(l.id))
    .map((l) => l.id);
  const rebuilt = buildSchedule(
    {
      lessonIds: freshLessonIds,
      startDate: today,
      preferredDaysOfWeek: plan.preferredDaysOfWeek,
      minutesPerSession: plan.minutesPerSession,
    },
    lessonMinutesById,
  );
  return { ...keptHistory, ...rebuilt };
}

/** Parses a Study Studio "Today" queue item id back into its owning plan/lesson (see lib/study-studio/today.ts). */
function parseTodayItemId(
  itemId: string,
):
  | { kind: "plan-lesson"; planId: string; lessonId: string }
  | { kind: "review"; lessonId: string }
  | null {
  if (itemId.startsWith("plan-lesson:")) {
    const [, planId, lessonId] = itemId.split(":");
    if (planId && lessonId) return { kind: "plan-lesson", planId, lessonId };
  }
  if (itemId.startsWith("review:")) {
    const lessonId = itemId.slice("review:".length);
    if (lessonId) return { kind: "review", lessonId };
  }
  return null;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

const MIN_DAILY_GOAL_MINUTES = 5;
const MAX_DAILY_GOAL_MINUTES = 180;

/** Clamps to a sane range and guards against NaN/non-finite input (e.g. a cleared or hand-edited number field). */
function clampDailyGoalMinutes(minutes: number): number {
  if (!Number.isFinite(minutes)) return MIN_DAILY_GOAL_MINUTES;
  return Math.min(MAX_DAILY_GOAL_MINUTES, Math.max(MIN_DAILY_GOAL_MINUTES, Math.round(minutes)));
}

/**
 * Validated the same way everywhere a timezone string could be set --
 * constructing a DateTimeFormat with an invalid IANA zone name throws,
 * which is a more portable check than the newer `Intl.supportedValuesOf`.
 */
function isValidTimezone(tz: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

function computeLessonContribution(state: ProgressState, lesson: Lesson): number {
  const guided = state.exerciseAttempts[lesson.guidedExercise.id];
  const independent = state.exerciseAttempts[lesson.independentExercise.id];
  const quiz = state.quizResults[lesson.id];
  return calculateLessonMasteryContribution({
    lessonCompleted: state.lessonStatus[lesson.id] === "completed",
    guidedExerciseSolved: Boolean(guided?.completed),
    independentExerciseSolved: Boolean(independent?.completed),
    quizCorrect: quiz?.correct ?? 0,
    quizTotal: quiz?.total ?? 0,
    hintsUsed: (guided?.hintsUsed ?? 0) + (independent?.hintsUsed ?? 0),
  });
}

function recomputeSkills(state: ProgressState, skills: string[]) {
  for (const skill of skills) {
    const touchedLessons = allLessons.filter(
      (l) => l.skills.includes(skill) && state.lessonStatus[l.id] !== undefined,
    );
    if (touchedLessons.length === 0) continue;
    const contributions = touchedLessons.map((l) => computeLessonContribution(state, l));
    state.skillMastery[skill] = averageMastery(contributions);
  }
}

function bumpStreak(state: ProgressState) {
  const today = todayIso();
  if (state.streak.lastActiveDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = state.streak.lastActiveDate === yesterday.toISOString().slice(0, 10);
  state.streak = {
    current: wasYesterday ? state.streak.current + 1 : 1,
    lastActiveDate: today,
  };
}

/** Idempotent: logging the same event id twice just refreshes its timestamp/position instead of duplicating it. */
function logActivity(state: ProgressState, event: Omit<ActivityEvent, "at"> & { at?: string }) {
  const at = event.at ?? new Date().toISOString();
  const withoutExisting = state.activity.filter((e) => e.id !== event.id);
  state.activity = [{ ...event, at }, ...withoutExisting].slice(0, 50);
}

/**
 * Idempotent: enrolling in a course you're already enrolled in is a no-op
 * for `enrolledAt`. Also the single gate against creating an enrollment for
 * an unknown/invalid course id -- every call site (viewLesson, the explicit
 * enroll() action) routes through here, so a fake or manipulated course id
 * (via a direct store call or hand-edited localStorage) can never produce a
 * phantom enrollment that then syncs to Supabase.
 */
function ensureEnrolled(state: ProgressState, courseId: string, now: string) {
  const course = getCourseBySlug(courseId);
  if (!course) return;
  if (!state.enrollments[courseId]) {
    state.enrollments[courseId] = { enrolledAt: now };
    logActivity(state, {
      id: `course-enrolled:${courseId}`,
      type: "course-enrolled",
      refId: courseId,
      title: course.title,
      at: now,
    });
  }
}

/** Idempotent (logActivity dedupes by id): logs course-completed once a course's every lesson is done. */
function checkCourseCompletion(state: ProgressState, courseSlug: string, now: string) {
  const course = getCourseBySlug(courseSlug);
  if (course && isCourseComplete(courseSlug, state)) {
    logActivity(state, {
      id: `course-completed:${courseSlug}`,
      type: "course-completed",
      refId: courseSlug,
      title: course.title,
      at: now,
    });
  }
}

/** Idempotent: logs roadmap-completed once for every roadmap the learner has started that's now fully done. */
function checkRoadmapCompletions(state: ProgressState, now: string) {
  for (const pathId of Object.keys(state.roadmapProgress)) {
    const path = getRoadmapBySlugSafe(pathId);
    if (path && isRoadmapComplete(path, state)) {
      logActivity(state, {
        id: `roadmap-completed:${pathId}`,
        type: "roadmap-completed",
        refId: pathId,
        title: path.name,
        at: now,
      });
    }
  }
}

interface ProgressStore {
  state: ProgressState;
  hydrated: boolean;
  hydrate: () => void;
  viewLesson: (lessonId: string) => void;
  startLesson: (lessonId: string) => void;
  completeLesson: (lessonId: string) => void;
  recordExerciseAttempt: (exerciseId: string, passed: boolean) => void;
  recordHintUsed: (exerciseId: string) => void;
  recordQuizResult: (lessonId: string, correct: number, total: number) => void;
  recordPracticeAttempt: (
    courseSlug: string,
    result: { score: number; total: number; topicsNeedingReview: string[] },
  ) => void;
  toggleBookmark: (lessonId: string) => void;
  setNote: (lessonId: string, text: string) => void;
  resolveNoteConflict: (lessonId: string, keep: "current" | "conflict") => void;
  reviewLesson: (lessonId: string, result: ReviewResult) => void;
  resetReviewSchedule: (lessonId: string) => void;
  createStudyPlan: (input: {
    title: string;
    courseSlugs: string[];
    targetDate: string | null;
    preferredDaysOfWeek: number[];
    minutesPerSession: number;
  }) => string;
  updateStudyPlan: (
    id: string,
    patch: Partial<
      Pick<
        StudyPlanState,
        "title" | "courseSlugs" | "targetDate" | "preferredDaysOfWeek" | "minutesPerSession"
      >
    >,
  ) => void;
  pauseStudyPlan: (id: string) => void;
  resumeStudyPlan: (id: string) => void;
  recalculateStudyPlan: (id: string) => void;
  deleteStudyPlan: (id: string) => void;
  startFocusSession: (opts: {
    mode: "untimed" | "countdown";
    countdownMinutes?: number;
    lessonId?: string;
    courseSlug?: string;
  }) => void;
  pauseFocusSession: () => void;
  resumeFocusSession: () => void;
  finishFocusSession: () => void;
  cancelFocusSession: () => void;
  dismissTodayItem: (itemId: string) => void;
  rescheduleTodayItem: (itemId: string, newDateKey: string) => void;
  removeTodayItem: (itemId: string) => void;
  setDailyGoal: (minutes: number) => void;
  enroll: (courseId: string) => void;
  startRoadmap: (pathId: string) => void;
  toggleRoadmapStep: (pathId: string, stepId: string) => void;
  toggleProjectMilestone: (projectId: string, milestoneId: string) => void;
  /** Deterministic, idempotent: returns the certificate id whether it was just issued or already existed, or null if the learner isn't eligible yet. */
  issueCertificate: (type: CertificateType, targetId: string) => string | null;
  setProfile: (
    patch: Partial<
      Pick<
        ProgressState["profile"],
        | "displayName"
        | "learningGoal"
        | "currentRoadmapId"
        | "timezone"
        | "firstName"
        | "lastName"
        | "phoneE164"
        | "learnerLevel"
      >
    >,
  ) => void;
  replaceState: (next: ProgressState) => void;
}

/**
 * Which localStorage key mutations persist to -- the shared guest key by
 * default, switched to a per-account key by components/auth/auth-provider.tsx
 * once a sync completes, and back to the guest key on sign-out. This is
 * what keeps a signed-in account's ongoing activity from ever being written
 * into the shared guest key (and therefore visible to a future guest
 * session or a different account) while they're signed in.
 */
function initialStorageKey(): string {
  const lastUserId = getLastUserId();
  return lastUserId ? perUserStorageKey(lastUserId) : STORAGE_KEY;
}

let activeStorageKey: string = initialStorageKey();

export function setActiveStorageKey(key: string) {
  activeStorageKey = key;
}

export function getActiveStorageKey(): string {
  return activeStorageKey;
}

function persist(state: ProgressState) {
  saveProgressTo(activeStorageKey, state);
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  state: createEmptyProgress(),
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    set({ state: loadProgressFrom(activeStorageKey), hydrated: true });
  },

  viewLesson: (lessonId) => {
    const lesson = getLessonById(lessonId);
    set((store) => {
      const now = new Date().toISOString();
      const next = {
        ...store.state,
        recentlyViewed: [
          lessonId,
          ...store.state.recentlyViewed.filter((id) => id !== lessonId),
        ].slice(0, 10),
      };
      if (lesson) {
        ensureEnrolled(next, lesson.courseSlug, now);
        next.enrollments = {
          ...next.enrollments,
          [lesson.courseSlug]: {
            ...next.enrollments[lesson.courseSlug],
            lastAccessedLessonId: lessonId,
            lastAccessedAt: now,
          },
        };
      }
      persist(next);
      return { state: next };
    });
  },

  startLesson: (lessonId) => {
    set((store) => {
      if (store.state.lessonStatus[lessonId] === "completed") return { state: store.state };
      const next = {
        ...store.state,
        lessonStatus: { ...store.state.lessonStatus, [lessonId]: "in-progress" as LessonStatus },
      };
      persist(next);
      return { state: next };
    });
  },

  completeLesson: (lessonId) => {
    const lesson = getLessonById(lessonId);
    set((store) => {
      const now = new Date().toISOString();
      const next: ProgressState = {
        ...store.state,
        lessonStatus: { ...store.state.lessonStatus, [lessonId]: "completed" },
        reviewQueue: {
          ...store.state.reviewQueue,
          [lessonId]: { dueAt: addDays(new Date(), 1).toISOString(), intervalDays: 1 },
        },
      };
      bumpStreak(next);
      if (lesson) {
        recomputeSkills(next, lesson.skills);
        logActivity(next, {
          id: `lesson-completed:${lessonId}`,
          type: "lesson-completed",
          refId: lessonId,
          title: lesson.title,
          at: now,
        });
        checkCourseCompletion(next, lesson.courseSlug, now);
        checkRoadmapCompletions(next, now);
      }
      persist(next);
      return { state: next };
    });
  },

  recordExerciseAttempt: (exerciseId, passed) => {
    set((store) => {
      const existing = store.state.exerciseAttempts[exerciseId] ?? {
        attempts: 0,
        completed: false,
        hintsUsed: 0,
      };
      const nextAttempts = {
        ...store.state.exerciseAttempts,
        [exerciseId]: {
          attempts: existing.attempts + 1,
          completed: existing.completed || passed,
          hintsUsed: existing.hintsUsed,
        },
      };
      const next = { ...store.state, exerciseAttempts: nextAttempts };
      const owningLesson = allLessons.find(
        (l) => l.guidedExercise.id === exerciseId || l.independentExercise.id === exerciseId,
      );
      if (owningLesson) recomputeSkills(next, owningLesson.skills);
      persist(next);
      return { state: next };
    });
  },

  recordHintUsed: (exerciseId) => {
    set((store) => {
      const existing = store.state.exerciseAttempts[exerciseId] ?? {
        attempts: 0,
        completed: false,
        hintsUsed: 0,
      };
      const next = {
        ...store.state,
        exerciseAttempts: {
          ...store.state.exerciseAttempts,
          [exerciseId]: { ...existing, hintsUsed: existing.hintsUsed + 1 },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  recordQuizResult: (lessonId, correct, total) => {
    const lesson = getLessonById(lessonId);
    set((store) => {
      const next = {
        ...store.state,
        quizResults: {
          ...store.state.quizResults,
          [lessonId]: { correct, total, lastAttemptAt: new Date().toISOString() },
        },
      };
      if (lesson) recomputeSkills(next, lesson.skills);
      persist(next);
      return { state: next };
    });
  },

  /**
   * Only overwrites bestScore/bestTotal when the new attempt's accuracy is
   * at least as good as the stored best -- a weaker retry (e.g. rushing
   * through a timed session) should never silently erase a genuinely better
   * earlier result. lastAttemptedAt and topicsNeedingReview always reflect
   * the most recent attempt regardless, since "when did I last practice"
   * and "what's currently weak" should track the latest session, not the
   * best-ever one.
   */
  recordPracticeAttempt: (courseSlug, result) => {
    set((store) => {
      const existing = store.state.practiceAttempts[courseSlug];
      const existingAccuracy =
        existing && existing.bestTotal > 0 ? existing.bestScore / existing.bestTotal : -1;
      const newAccuracy = result.total > 0 ? result.score / result.total : 0;
      const useNewAsBest = newAccuracy >= existingAccuracy;
      const next = {
        ...store.state,
        practiceAttempts: {
          ...store.state.practiceAttempts,
          [courseSlug]: {
            bestScore: useNewAsBest ? result.score : (existing?.bestScore ?? result.score),
            bestTotal: useNewAsBest ? result.total : (existing?.bestTotal ?? result.total),
            lastAttemptedAt: new Date().toISOString(),
            topicsNeedingReview: result.topicsNeedingReview,
          },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  toggleBookmark: (lessonId) => {
    const lesson = getLessonById(lessonId);
    set((store) => {
      const has = store.state.bookmarks.includes(lessonId);
      const next = {
        ...store.state,
        bookmarks: has
          ? store.state.bookmarks.filter((id) => id !== lessonId)
          : [...store.state.bookmarks, lessonId],
      };
      if (!has && lesson) {
        logActivity(next, {
          id: `bookmark-added:${lessonId}`,
          type: "bookmark-added",
          refId: lessonId,
          title: lesson.title,
        });
      }
      persist(next);
      return { state: next };
    });
  },

  setNote: (lessonId, text) => {
    set((store) => {
      const trimmed = text;
      const next = { ...store.state };
      if (trimmed.trim().length === 0) {
        next.notes = { ...store.state.notes };
        delete next.notes[lessonId];
      } else {
        next.notes = {
          ...store.state.notes,
          [lessonId]: { text: trimmed, updatedAt: new Date().toISOString() },
        };
      }
      persist(next);
      return { state: next };
    });
  },

  resolveNoteConflict: (lessonId, keep) => {
    set((store) => {
      const existing = store.state.notes[lessonId];
      if (!existing?.conflict) return { state: store.state };
      const next = { ...store.state, notes: { ...store.state.notes } };
      if (keep === "conflict") {
        next.notes[lessonId] = {
          text: existing.conflict.text,
          updatedAt: new Date().toISOString(),
        };
      } else {
        next.notes[lessonId] = { text: existing.text, updatedAt: existing.updatedAt };
      }
      persist(next);
      return { state: next };
    });
  },

  reviewLesson: (lessonId, result) => {
    set((store) => {
      const current = store.state.reviewQueue[lessonId];
      const currentInterval = current?.intervalDays ?? 1;
      const newInterval = nextIntervalDays(currentInterval, result);
      const next = {
        ...store.state,
        reviewQueue: {
          ...store.state.reviewQueue,
          [lessonId]: {
            dueAt: addDays(new Date(), newInterval).toISOString(),
            intervalDays: newInterval,
          },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  /** Resets a completed lesson's review schedule back to day 1, requiring a UI-level confirmation before calling this since it discards spaced-repetition progress. No-ops for a lesson that was never reviewed. */
  resetReviewSchedule: (lessonId) => {
    set((store) => {
      if (!store.state.reviewQueue[lessonId]) return { state: store.state };
      const next = {
        ...store.state,
        reviewQueue: {
          ...store.state.reviewQueue,
          [lessonId]: { dueAt: addDays(new Date(), 1).toISOString(), intervalDays: 1 },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  createStudyPlan: (input) => {
    const id = generateId("plan");
    set((store) => {
      const now = new Date().toISOString();
      const lessonIds = input.courseSlugs
        .flatMap((slug) => getLessonsForCourse(slug))
        .filter((l) => store.state.lessonStatus[l.id] !== "completed")
        .map((l) => l.id);
      const schedule = buildSchedule(
        {
          lessonIds,
          startDate: localDateKey(new Date(), store.state.profile.timezone),
          preferredDaysOfWeek: input.preferredDaysOfWeek,
          minutesPerSession: input.minutesPerSession,
        },
        lessonMinutesById,
      );
      const plan: StudyPlanState = {
        id,
        title: input.title,
        courseSlugs: input.courseSlugs,
        createdAt: now,
        updatedAt: now,
        targetDate: input.targetDate,
        preferredDaysOfWeek: input.preferredDaysOfWeek,
        minutesPerSession: input.minutesPerSession,
        status: "active",
        schedule,
      };
      const next = { ...store.state, studyPlans: { ...store.state.studyPlans, [id]: plan } };
      persist(next);
      return { state: next };
    });
    return id;
  },

  updateStudyPlan: (id, patch) => {
    set((store) => {
      const existing = store.state.studyPlans[id];
      if (!existing) return { state: store.state };
      const scheduleRelevantFieldChanged =
        ("courseSlugs" in patch &&
          JSON.stringify(patch.courseSlugs) !== JSON.stringify(existing.courseSlugs)) ||
        ("preferredDaysOfWeek" in patch &&
          JSON.stringify(patch.preferredDaysOfWeek) !==
            JSON.stringify(existing.preferredDaysOfWeek)) ||
        ("minutesPerSession" in patch && patch.minutesPerSession !== existing.minutesPerSession);
      const updated: StudyPlanState = {
        ...existing,
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      if (scheduleRelevantFieldChanged) {
        updated.schedule = rebuildPlanSchedule(
          updated,
          store.state.lessonStatus,
          localDateKey(new Date(), store.state.profile.timezone),
        );
      }
      const next = { ...store.state, studyPlans: { ...store.state.studyPlans, [id]: updated } };
      persist(next);
      return { state: next };
    });
  },

  pauseStudyPlan: (id) => {
    set((store) => {
      const existing = store.state.studyPlans[id];
      if (!existing || existing.status === "paused") return { state: store.state };
      const next = {
        ...store.state,
        studyPlans: {
          ...store.state.studyPlans,
          [id]: { ...existing, status: "paused" as const, updatedAt: new Date().toISOString() },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  resumeStudyPlan: (id) => {
    set((store) => {
      const existing = store.state.studyPlans[id];
      if (!existing || existing.status === "active") return { state: store.state };
      const next = {
        ...store.state,
        studyPlans: {
          ...store.state.studyPlans,
          [id]: { ...existing, status: "active" as const, updatedAt: new Date().toISOString() },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  /** Explicit "rebalance my missed work" action -- never marks any lesson complete, only moves un-done schedule entries forward. See rebuildPlanSchedule. */
  recalculateStudyPlan: (id) => {
    set((store) => {
      const existing = store.state.studyPlans[id];
      if (!existing) return { state: store.state };
      const schedule = rebuildPlanSchedule(
        existing,
        store.state.lessonStatus,
        localDateKey(new Date(), store.state.profile.timezone),
      );
      const next = {
        ...store.state,
        studyPlans: {
          ...store.state.studyPlans,
          [id]: { ...existing, schedule, updatedAt: new Date().toISOString() },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  deleteStudyPlan: (id) => {
    set((store) => {
      if (!store.state.studyPlans[id]) return { state: store.state };
      const studyPlans = { ...store.state.studyPlans };
      delete studyPlans[id];
      const next = { ...store.state, studyPlans };
      persist(next);
      return { state: next };
    });
  },

  startFocusSession: (opts) => {
    set((store) => {
      const now = new Date().toISOString();
      const session: FocusSessionState = {
        id: generateId("focus"),
        mode: opts.mode,
        countdownMinutes: opts.countdownMinutes,
        lessonId: opts.lessonId,
        courseSlug: opts.courseSlug,
        startedAt: now,
        accumulatedSeconds: 0,
        runningSince: now,
      };
      const next = { ...store.state, activeFocusSession: session };
      persist(next);
      return { state: next };
    });
  },

  pauseFocusSession: () => {
    set((store) => {
      const session = store.state.activeFocusSession;
      if (!session || !session.runningSince) return { state: store.state };
      const elapsedSinceResume = (Date.now() - new Date(session.runningSince).getTime()) / 1000;
      const next = {
        ...store.state,
        activeFocusSession: {
          ...session,
          accumulatedSeconds: session.accumulatedSeconds + elapsedSinceResume,
          runningSince: null,
        },
      };
      persist(next);
      return { state: next };
    });
  },

  resumeFocusSession: () => {
    set((store) => {
      const session = store.state.activeFocusSession;
      if (!session || session.runningSince) return { state: store.state };
      const next = {
        ...store.state,
        activeFocusSession: { ...session, runningSince: new Date().toISOString() },
      };
      persist(next);
      return { state: next };
    });
  },

  /**
   * Idempotent (safe to call twice, e.g. from two tabs both reacting to a
   * countdown reaching zero): a session that's already finished is simply
   * `null`, so a second call finds nothing to bank and no-ops. Elapsed time
   * is always computed from timestamps, never a shared counter, so both
   * tabs compute the same total independently.
   */
  finishFocusSession: () => {
    set((store) => {
      const session = store.state.activeFocusSession;
      if (!session) return { state: store.state };
      const now = new Date();
      const runningExtra = session.runningSince
        ? (now.getTime() - new Date(session.runningSince).getTime()) / 1000
        : 0;
      const totalMinutes = Math.round((session.accumulatedSeconds + runningExtra) / 60);
      const today = localDateKey(now, store.state.profile.timezone);
      // Only write a focusMinutesByDate entry when real time was actually
      // banked -- an unwritten day is what lets Insights' hasAnyFocusHistory
      // flag correctly mean "ever logged focus time," not "ever clicked
      // Finish," including on a near-instant start/finish.
      const next = {
        ...store.state,
        activeFocusSession: null,
        focusMinutesByDate:
          totalMinutes > 0
            ? pruneFocusMinutes(
                {
                  ...store.state.focusMinutesByDate,
                  [today]: (store.state.focusMinutesByDate[today] ?? 0) + totalMinutes,
                },
                now,
              )
            : store.state.focusMinutesByDate,
      };
      if (totalMinutes > 0) {
        logActivity(next, {
          id: `focus-session-completed:${session.id}`,
          type: "focus-session-completed",
          refId: session.id,
          title: `${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`,
          at: now.toISOString(),
        });
      }
      persist(next);
      return { state: next };
    });
  },

  /** Discards the active session without banking any time -- for a learner who started by mistake. */
  cancelFocusSession: () => {
    set((store) => {
      if (!store.state.activeFocusSession) return { state: store.state };
      const next = { ...store.state, activeFocusSession: null };
      persist(next);
      return { state: next };
    });
  },

  dismissTodayItem: (itemId) => {
    set((store) => {
      const today = localDateKey(new Date(), store.state.profile.timezone);
      const current =
        store.state.todayDismissed.date === today ? store.state.todayDismissed.itemIds : [];
      if (current.includes(itemId)) return { state: store.state };
      const next = {
        ...store.state,
        todayDismissed: { date: today, itemIds: [...current, itemId] },
      };
      persist(next);
      return { state: next };
    });
  },

  /** Only meaningful for plan-lesson and review items (see parseTodayItemId) -- silently no-ops for any other item kind, since a recommendation/weak-topic item has no single date to move. */
  rescheduleTodayItem: (itemId, newDateKey) => {
    set((store) => {
      const parsed = parseTodayItemId(itemId);
      if (!parsed) return { state: store.state };

      if (parsed.kind === "review") {
        if (!store.state.reviewQueue[parsed.lessonId]) return { state: store.state };
        const next = {
          ...store.state,
          reviewQueue: {
            ...store.state.reviewQueue,
            [parsed.lessonId]: {
              ...store.state.reviewQueue[parsed.lessonId],
              dueAt: new Date(`${newDateKey}T00:00:00.000Z`).toISOString(),
            },
          },
        };
        persist(next);
        return { state: next };
      }

      const plan = store.state.studyPlans[parsed.planId];
      if (!plan) return { state: store.state };
      const schedule: StudySchedule = {};
      for (const [dateKey, lessonIds] of Object.entries(plan.schedule)) {
        const filtered = lessonIds.filter((id) => id !== parsed.lessonId);
        if (filtered.length > 0) schedule[dateKey] = filtered;
      }
      schedule[newDateKey] = [...(schedule[newDateKey] ?? []), parsed.lessonId];
      const next = {
        ...store.state,
        studyPlans: {
          ...store.state.studyPlans,
          [parsed.planId]: { ...plan, schedule, updatedAt: new Date().toISOString() },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  /** Only meaningful for plan-lesson items -- permanently drops that lesson from its plan's schedule. Silently no-ops for any other item kind. */
  removeTodayItem: (itemId) => {
    set((store) => {
      const parsed = parseTodayItemId(itemId);
      if (!parsed || parsed.kind !== "plan-lesson") return { state: store.state };
      const plan = store.state.studyPlans[parsed.planId];
      if (!plan) return { state: store.state };
      const schedule: StudySchedule = {};
      for (const [dateKey, lessonIds] of Object.entries(plan.schedule)) {
        const filtered = lessonIds.filter((id) => id !== parsed.lessonId);
        if (filtered.length > 0) schedule[dateKey] = filtered;
      }
      const next = {
        ...store.state,
        studyPlans: {
          ...store.state.studyPlans,
          [parsed.planId]: { ...plan, schedule, updatedAt: new Date().toISOString() },
        },
      };
      persist(next);
      return { state: next };
    });
  },

  setDailyGoal: (minutes) => {
    set((store) => {
      const next = { ...store.state, dailyGoalMinutes: clampDailyGoalMinutes(minutes) };
      persist(next);
      return { state: next };
    });
  },

  enroll: (courseId) => {
    set((store) => {
      const next = { ...store.state };
      ensureEnrolled(next, courseId, new Date().toISOString());
      persist(next);
      return { state: next };
    });
  },

  startRoadmap: (pathId) => {
    // Gate on the roadmap actually existing and being public -- blocks
    // starting an unknown or internal/draft roadmap via a direct store call
    // or hand-edited localStorage, not just hiding the button in the UI.
    const path = getRoadmapBySlugSafe(pathId);
    if (!path) return;
    set((store) => {
      if (store.state.roadmapProgress[pathId]) return { state: store.state };
      const now = new Date().toISOString();
      const next = {
        ...store.state,
        roadmapProgress: {
          ...store.state.roadmapProgress,
          [pathId]: { startedAt: now, lastAccessedAt: now, completedStepIds: [] },
        },
      };
      logActivity(next, {
        id: `roadmap-started:${pathId}`,
        type: "roadmap-started",
        refId: pathId,
        title: path.name,
        at: now,
      });
      persist(next);
      return { state: next };
    });
  },

  toggleRoadmapStep: (pathId, stepId) => {
    // Only a real, public roadmap's own self-reportable step (technology-guide
    // / practice / assessment) can be toggled -- course/project steps are
    // always derived and rejected here too, not just inert at read time.
    const path = getRoadmapBySlugSafe(pathId);
    const step = path?.steps.find((s) => s.id === stepId);
    if (!path || !step || !SELF_REPORTED_STEP_TYPES.includes(step.type)) return;
    set((store) => {
      const now = new Date().toISOString();
      const existing = store.state.roadmapProgress[pathId] ?? {
        startedAt: now,
        lastAccessedAt: now,
        completedStepIds: [],
      };
      const has = existing.completedStepIds.includes(stepId);
      const updated = {
        startedAt: existing.startedAt,
        lastAccessedAt: now,
        completedStepIds: has
          ? existing.completedStepIds.filter((id) => id !== stepId)
          : [...existing.completedStepIds, stepId],
      };
      const next = {
        ...store.state,
        roadmapProgress: { ...store.state.roadmapProgress, [pathId]: updated },
      };
      if (!has) {
        logActivity(next, {
          id: `roadmap-step-completed:${pathId}:${stepId}`,
          type: "roadmap-step-completed",
          refId: stepId,
          title: step.title,
          at: now,
        });
        checkRoadmapCompletions(next, now);
      }
      persist(next);
      return { state: next };
    });
  },

  toggleProjectMilestone: (projectId, milestoneId) => {
    // Gate on the project and milestone both being real -- see startRoadmap
    // above for the same reasoning applied to roadmaps.
    const project = getProjectBySlug(projectId);
    const milestone = project?.milestones.find((m) => m.id === milestoneId);
    if (!project || !milestone) return;
    set((store) => {
      const now = new Date().toISOString();
      const existing = store.state.projectProgress[projectId] ?? {
        startedAt: now,
        completedMilestoneIds: [],
      };
      const has = existing.completedMilestoneIds.includes(milestoneId);
      const updated = {
        startedAt: existing.startedAt,
        completedMilestoneIds: has
          ? existing.completedMilestoneIds.filter((id) => id !== milestoneId)
          : [...existing.completedMilestoneIds, milestoneId],
      };
      const next = {
        ...store.state,
        projectProgress: { ...store.state.projectProgress, [projectId]: updated },
      };
      if (!has) {
        logActivity(next, {
          id: `project-milestone-completed:${projectId}:${milestoneId}`,
          type: "project-milestone-completed",
          refId: projectId,
          title: project.title,
          at: now,
        });
        if (isProjectComplete(projectId, next)) {
          logActivity(next, {
            id: `project-completed:${projectId}`,
            type: "project-completed",
            refId: projectId,
            title: project.title,
            at: now,
          });
        }
        checkRoadmapCompletions(next, now);
      }
      persist(next);
      return { state: next };
    });
  },

  issueCertificate: (type, targetId) => {
    let result: string | null = null;
    set((store) => {
      const id = buildCertificateId(type, targetId);
      // Idempotent: refresh, a second tab, or issuing again after the
      // requirements happen to still hold must never create a second
      // record for the same (type, target) pair -- just report the
      // existing one back.
      const existing = store.state.certificates[id];
      if (existing) {
        result = id;
        return { state: store.state };
      }

      const eligibility =
        type === "course-completion"
          ? getCourseCompletionEligibility(targetId, store.state)
          : getSkillAchievementEligibility(targetId, store.state);
      const course = getCourseBySlug(targetId);
      if (!eligibility.eligible || !course) {
        result = null;
        return { state: store.state };
      }

      const now = new Date().toISOString();
      // Snapshotted once, here, and never re-read afterward -- see
      // docs/product-expansion/DECISIONS.md ("Profile and certificate name
      // handling"). Prefers the real first+last name collected at sign-up
      // (required for every authenticated learner, who is now the only kind
      // of learner who can reach this action at all -- see Phase 4's
      // auth-gated issuance UI), falling back to the older free-text
      // displayName field for any pre-existing profile that predates it.
      const fullName = [store.state.profile.firstName, store.state.profile.lastName]
        .filter((part): part is string => Boolean(part?.trim()))
        .join(" ")
        .trim();
      const cert: CertificateState = {
        id,
        type,
        targetId,
        targetTitle: course.title,
        displayName:
          fullName || store.state.profile.displayName?.trim() || "VisaSparkSchools Learner",
        issuedAt: now,
        criteriaSnapshot: eligibility.met,
        contentVersionRef: ELIGIBILITY_RULESET_VERSION,
        verificationCode: generateId("vcode"),
      };
      const next = {
        ...store.state,
        certificates: { ...store.state.certificates, [id]: cert },
      };
      persist(next);
      result = id;
      return { state: next };
    });
    return result;
  },

  setProfile: (patch) => {
    // Silently drop fields that fail validation (keeping whatever value was
    // there before) rather than rejecting the whole patch -- a bad
    // timezone shouldn't also block a valid display name in the same save.
    const sanitized = { ...patch };
    if (
      "currentRoadmapId" in sanitized &&
      sanitized.currentRoadmapId !== null &&
      sanitized.currentRoadmapId !== undefined &&
      !getRoadmapBySlugSafe(sanitized.currentRoadmapId)
    ) {
      delete sanitized.currentRoadmapId;
    }
    if (
      "timezone" in sanitized &&
      sanitized.timezone !== null &&
      sanitized.timezone !== undefined &&
      !isValidTimezone(sanitized.timezone)
    ) {
      delete sanitized.timezone;
    }
    if (sanitized.firstName !== null && sanitized.firstName !== undefined) {
      const normalized = normalizeName(sanitized.firstName);
      if (normalized.length === 0) delete sanitized.firstName;
      else sanitized.firstName = normalized;
    }
    if (sanitized.lastName !== null && sanitized.lastName !== undefined) {
      const normalized = normalizeName(sanitized.lastName);
      if (normalized.length === 0) delete sanitized.lastName;
      else sanitized.lastName = normalized;
    }
    if (
      "phoneE164" in sanitized &&
      sanitized.phoneE164 !== null &&
      sanitized.phoneE164 !== undefined &&
      !/^\+[1-9]\d{1,14}$/.test(sanitized.phoneE164)
    ) {
      // Defensive re-check even though callers (the profile form) already
      // validate/normalize via lib/profile/phone.ts before calling this --
      // this action must never persist a malformed value regardless of caller.
      delete sanitized.phoneE164;
    }
    if (
      "learnerLevel" in sanitized &&
      sanitized.learnerLevel !== null &&
      sanitized.learnerLevel !== undefined &&
      !isLearnerLevel(sanitized.learnerLevel)
    ) {
      delete sanitized.learnerLevel;
    }
    set((store) => {
      const next = {
        ...store.state,
        profile: { ...store.state.profile, ...sanitized, updatedAt: new Date().toISOString() },
      };
      persist(next);
      return { state: next };
    });
  },

  replaceState: (nextState) => {
    persist(nextState);
    set({ state: nextState });
  },
}));
