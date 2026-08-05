import { getCourseBySlug } from "@/lib/content/registry";
import { getCourseCompletionPercent } from "@/lib/learning/completion";
import { localDateKey } from "@/lib/learning/daily-goal";
import { isDue } from "@/lib/learning/review-schedule";
import type { ProgressState } from "@/lib/learning/types";

function inRange(key: string, startKey: string, endKey: string): boolean {
  return key >= startKey && key <= endKey;
}

export interface InsightsRange {
  startKey: string;
  endKey: string;
}

export interface CourseProgressSummary {
  courseSlug: string;
  courseTitle: string;
  percent: number;
}

export interface WeakTopicSummary {
  courseSlug: string;
  courseTitle: string;
  topics: string[];
}

export interface StudyInsights {
  range: InsightsRange;
  lessonsCompleted: number;
  activeStudyMinutes: number;
  /** True once the learner has ever logged focus time -- distinguishes "never used Focus" from "used it, 0 minutes this range." */
  hasAnyFocusHistory: boolean;
  plannedLessons: number;
  completedPlannedLessons: number;
  hasActivePlan: boolean;
  coursesPracticedInRange: number;
  dueReviewsNow: number;
  weakTopics: WeakTopicSummary[];
  courseProgress: CourseProgressSummary[];
}

/**
 * Aggregates only real, already-stored data -- no fabricated numbers, no
 * productivity score, no employability claim. `now`/`timezone` are passed
 * in explicitly (matching `getDailyGoalStatus`'s convention) so this stays a
 * pure, directly testable function of its inputs.
 */
export function buildInsights(
  state: ProgressState,
  now: Date,
  timezone: string | null,
  rangeDays: number,
): StudyInsights {
  const endKey = localDateKey(now, timezone);
  const startDate = new Date(now.getTime());
  startDate.setDate(startDate.getDate() - (rangeDays - 1));
  const startKey = localDateKey(startDate, timezone);

  const lessonsCompleted = state.activity.filter(
    (e) =>
      e.type === "lesson-completed" &&
      inRange(localDateKey(new Date(e.at), timezone), startKey, endKey),
  ).length;

  const focusDatesInRange = Object.keys(state.focusMinutesByDate).filter((d) =>
    inRange(d, startKey, endKey),
  );
  const activeStudyMinutes = focusDatesInRange.reduce(
    (sum, d) => sum + state.focusMinutesByDate[d],
    0,
  );
  const hasAnyFocusHistory = Object.keys(state.focusMinutesByDate).length > 0;

  let plannedLessons = 0;
  let completedPlannedLessons = 0;
  let hasActivePlan = false;
  for (const plan of Object.values(state.studyPlans)) {
    if (plan.status === "active") hasActivePlan = true;
    for (const [dateKey, lessonIds] of Object.entries(plan.schedule)) {
      if (!inRange(dateKey, startKey, endKey)) continue;
      plannedLessons += lessonIds.length;
      completedPlannedLessons += lessonIds.filter(
        (id) => state.lessonStatus[id] === "completed",
      ).length;
    }
  }

  const coursesPracticedInRange = Object.values(state.practiceAttempts).filter((a) =>
    inRange(localDateKey(new Date(a.lastAttemptedAt), timezone), startKey, endKey),
  ).length;

  const dueReviewsNow = Object.values(state.reviewQueue).filter((r) => isDue(r.dueAt, now)).length;

  const weakTopics: WeakTopicSummary[] = Object.entries(state.practiceAttempts)
    .filter(([, a]) => a.topicsNeedingReview.length > 0)
    .map(([courseSlug, a]) => ({
      courseSlug,
      courseTitle: getCourseBySlug(courseSlug)?.title ?? courseSlug,
      topics: a.topicsNeedingReview,
    }));

  const courseProgress: CourseProgressSummary[] = Object.keys(state.enrollments)
    .map((courseSlug) => {
      const course = getCourseBySlug(courseSlug);
      if (!course) return null;
      return {
        courseSlug,
        courseTitle: course.title,
        percent: getCourseCompletionPercent(courseSlug, state),
      };
    })
    .filter((x): x is CourseProgressSummary => Boolean(x));

  return {
    range: { startKey, endKey },
    lessonsCompleted,
    activeStudyMinutes,
    hasAnyFocusHistory,
    plannedLessons,
    completedPlannedLessons,
    hasActivePlan,
    coursesPracticedInRange,
    dueReviewsNow,
    weakTopics,
    courseProgress,
  };
}
