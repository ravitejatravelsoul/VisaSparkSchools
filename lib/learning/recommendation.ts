import { allLessons, getCourseBySlug, getLessonsForCourse } from "@/lib/content/registry";
import { getRoadmapBySlugSafe } from "@/lib/learning/completion";
import type { Lesson } from "@/lib/content/types";
import type { ProgressState } from "@/lib/learning/types";

export interface LessonRecommendation {
  lesson: Lesson;
  reason: string;
}

/**
 * Deterministic "what should I do next" priority function -- no AI, no
 * hidden weighting, just an ordered list of rules a learner could read and
 * predict themselves:
 *
 *   1. Resume the lesson you most recently left in progress.
 *   2. Otherwise, continue the course backing the next incomplete required
 *      step of your current roadmap (if you've set one).
 *   3. Otherwise, continue the course you most recently opened.
 *   4. Otherwise, start the first lesson of the platform's first course.
 *
 * Each rule only fires if the previous ones found nothing.
 */
export function getNextLessonRecommendation(
  state: ProgressState,
): LessonRecommendation | undefined {
  // `recentlyViewed` is already ordered most-recent-first, so it's the
  // correct source for "most recently left off" -- a plain object-key scan
  // over `lessonStatus` would reflect insertion order (essentially "first
  // ever started"), not recency, and could produce a different answer than
  // this docstring promises depending on unrelated iteration order.
  const inProgressId =
    state.recentlyViewed.find((id) => state.lessonStatus[id] === "in-progress") ??
    Object.entries(state.lessonStatus).find(([, status]) => status === "in-progress")?.[0];
  if (inProgressId) {
    const lesson = allLessons.find((l) => l.id === inProgressId);
    if (lesson) return { lesson, reason: "Continue where you left off" };
  }

  const currentRoadmap = state.profile.currentRoadmapId
    ? getRoadmapBySlugSafe(state.profile.currentRoadmapId)
    : undefined;
  if (currentRoadmap) {
    for (const step of currentRoadmap.steps) {
      if (step.type !== "course" || !step.required) continue;
      const course = getCourseBySlug(step.refId);
      if (!course) continue;
      const nextLesson = getLessonsForCourse(course.slug).find(
        (l) => state.lessonStatus[l.id] !== "completed",
      );
      if (nextLesson) {
        return { lesson: nextLesson, reason: `Next step in ${currentRoadmap.name}` };
      }
    }
  }

  const enrollmentEntries = Object.entries(state.enrollments).sort(
    (a, b) =>
      (b[1].lastAccessedAt ?? "").localeCompare(a[1].lastAccessedAt ?? "") ||
      a[0].localeCompare(b[0]), // stable, deterministic tie-break for equal/absent timestamps
  );
  for (const [courseId] of enrollmentEntries) {
    const course = getCourseBySlug(courseId);
    if (!course) continue;
    const nextLesson = getLessonsForCourse(course.slug).find(
      (l) => state.lessonStatus[l.id] !== "completed",
    );
    if (nextLesson) return { lesson: nextLesson, reason: `Continue ${course.title}` };
  }

  const firstIncomplete = allLessons.find((l) => state.lessonStatus[l.id] !== "completed");
  if (firstIncomplete) return { lesson: firstIncomplete, reason: "Start here" };

  return undefined;
}
