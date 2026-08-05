import { getCourseBySlug, getLessonById } from "@/lib/content/registry";
import { getNextLessonRecommendation } from "@/lib/learning/recommendation";
import { isDue } from "@/lib/learning/review-schedule";
import type { ProgressState } from "@/lib/learning/types";

export type TodayItemKind = "plan-lesson" | "review" | "weak-topic" | "recommendation";

export interface TodayQueueItem {
  /** Stable, deterministic id -- also what dismiss/reschedule/remove target. */
  id: string;
  kind: TodayItemKind;
  title: string;
  description?: string;
  href: string;
  lessonId?: string;
  planId?: string;
  courseSlug?: string;
}

/**
 * Builds today's deterministic queue from real, existing progress data --
 * never a stored or fabricated list. `todayKey` (yyyy-mm-dd) is supplied by
 * the caller (see `lib/learning/daily-goal.ts#localDateKey`) so this stays a
 * pure function of its inputs, directly testable without faking the clock
 * or a timezone.
 *
 * Priority order: (1) today's study-plan lessons, (2) due reviews, (3) weak
 * practice topics, and only if none of those produced anything, (4) the
 * existing dashboard recommendation as a fallback so the queue is never
 * emptily unhelpful. Items dismissed for today (`state.todayDismissed`) are
 * filtered out last.
 */
export function buildTodayQueue(state: ProgressState, todayKey: string): TodayQueueItem[] {
  const items: TodayQueueItem[] = [];
  const seenLessonIds = new Set<string>();

  for (const plan of Object.values(state.studyPlans)) {
    if (plan.status !== "active") continue;
    for (const lessonId of plan.schedule[todayKey] ?? []) {
      if (state.lessonStatus[lessonId] === "completed") continue;
      if (seenLessonIds.has(lessonId)) continue;
      const lesson = getLessonById(lessonId);
      if (!lesson) continue;
      seenLessonIds.add(lessonId);
      items.push({
        id: `plan-lesson:${plan.id}:${lessonId}`,
        kind: "plan-lesson",
        title: lesson.title,
        description: `From your plan "${plan.title}"`,
        href: `/courses/${lesson.courseSlug}/${lesson.slug}`,
        lessonId,
        planId: plan.id,
        courseSlug: lesson.courseSlug,
      });
    }
  }

  for (const [lessonId, review] of Object.entries(state.reviewQueue)) {
    if (!isDue(review.dueAt)) continue;
    const lesson = getLessonById(lessonId);
    if (!lesson) continue;
    items.push({
      id: `review:${lessonId}`,
      kind: "review",
      title: lesson.title,
      description: "Due for review",
      href: "/study-studio?tab=review",
      lessonId,
      courseSlug: lesson.courseSlug,
    });
  }

  for (const [courseSlug, attempt] of Object.entries(state.practiceAttempts)) {
    if (attempt.topicsNeedingReview.length === 0) continue;
    const course = getCourseBySlug(courseSlug);
    if (!course) continue;
    items.push({
      id: `weak-topic:${courseSlug}`,
      kind: "weak-topic",
      title: `${attempt.topicsNeedingReview.length} weak topic${attempt.topicsNeedingReview.length === 1 ? "" : "s"} in ${course.title}`,
      description: attempt.topicsNeedingReview.join(", "),
      href: `/courses/${courseSlug}/practice`,
      courseSlug,
    });
  }

  if (items.length === 0) {
    const recommendation = getNextLessonRecommendation(state);
    if (recommendation) {
      items.push({
        id: `recommendation:${recommendation.lesson.id}`,
        kind: "recommendation",
        title: recommendation.lesson.title,
        description: recommendation.reason,
        href: `/courses/${recommendation.lesson.courseSlug}/${recommendation.lesson.slug}`,
        lessonId: recommendation.lesson.id,
        courseSlug: recommendation.lesson.courseSlug,
      });
    }
  }

  const dismissed =
    state.todayDismissed.date === todayKey
      ? new Set(state.todayDismissed.itemIds)
      : new Set<string>();
  return items.filter((item) => !dismissed.has(item.id));
}
