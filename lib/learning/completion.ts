import { getCourseBySlug, getLessonsForCourse, getProjectBySlug } from "@/lib/content/registry";
import { getLearningPathBySlug, getTechnologyById } from "@/lib/directory/registry";
import type { PathStep, LearningPath } from "@/lib/directory/types";
import type { ProgressState } from "@/lib/learning/types";

/**
 * Course completion is never a stored flag -- it's always computed fresh
 * from real lesson-completion data, so it can never go stale or contradict
 * the lessons a learner has actually finished.
 */
export function isCourseComplete(courseSlug: string, state: ProgressState): boolean {
  const lessons = getLessonsForCourse(courseSlug);
  if (lessons.length === 0) return false;
  return lessons.every((lesson) => state.lessonStatus[lesson.id] === "completed");
}

export function getCourseCompletionPercent(courseSlug: string, state: ProgressState): number {
  const lessons = getLessonsForCourse(courseSlug);
  if (lessons.length === 0) return 0;
  const completed = lessons.filter((l) => state.lessonStatus[l.id] === "completed").length;
  return Math.round((completed / lessons.length) * 100);
}

/** Project completion is derived from milestone checklist progress, the same way course completion is derived from lessons. */
export function isProjectComplete(projectId: string, state: ProgressState): boolean {
  const project = getProjectBySlug(projectId);
  if (!project || project.milestones.length === 0) return false;
  const completed = state.projectProgress[projectId]?.completedMilestoneIds ?? [];
  return project.milestones.every((m) => completed.includes(m.id));
}

export function getProjectCompletionPercent(projectId: string, state: ProgressState): number {
  const project = getProjectBySlug(projectId);
  if (!project || project.milestones.length === 0) return 0;
  const completed = state.projectProgress[projectId]?.completedMilestoneIds ?? [];
  const done = project.milestones.filter((m) => completed.includes(m.id)).length;
  return Math.round((done / project.milestones.length) * 100);
}

export type StepStatus = "not-started" | "in-progress" | "completed";

/** The only step types with no derivable completion signal -- the only ones a learner can self-report. */
export const SELF_REPORTED_STEP_TYPES: PathStep["type"][] = [
  "technology-guide",
  "practice",
  "assessment",
];

/**
 * Step-type-specific completion. `course` and `project` steps are always
 * derived from real underlying data (never trusted as a stored flag);
 * `technology-guide`, `practice`, and `assessment` steps have no
 * interactive signal to derive from, so they're self-reported by the
 * learner via `completedStepIds` (see `toggleRoadmapStep` in store.ts).
 *
 * `pathId` (the owning roadmap's slug) is required, not optional: step ids
 * are short, roadmap-local strings ("s1", "s2", ...) reused across almost
 * every roadmap, not globally unique. Looking up self-reported completion
 * without scoping to the specific roadmap would let marking "s1" complete
 * in one roadmap incorrectly show as complete in every other roadmap that
 * also happens to have a step "s1" -- which, given the authoring
 * convention, is effectively all of them. See tests/unit/completion.test.ts
 * for the regression coverage.
 */
export function resolveStepStatus(
  step: PathStep,
  pathId: string,
  state: ProgressState,
): StepStatus {
  if (step.type === "course") {
    const course = getCourseBySlug(step.refId);
    if (!course) return "not-started";
    if (isCourseComplete(course.slug, state)) return "completed";
    const lessons = getLessonsForCourse(course.slug);
    const anyStarted = lessons.some((l) => state.lessonStatus[l.id] !== undefined);
    return anyStarted ? "in-progress" : "not-started";
  }
  if (step.type === "project") {
    if (!getProjectBySlug(step.refId)) return "not-started";
    if (isProjectComplete(step.refId, state)) return "completed";
    const started = (state.projectProgress[step.refId]?.completedMilestoneIds.length ?? 0) > 0;
    return started ? "in-progress" : "not-started";
  }
  // technology-guide / practice / assessment: self-reported only, and only
  // within the roadmap that actually owns this step.
  const reported = state.roadmapProgress[pathId]?.completedStepIds.includes(step.id) ?? false;
  return reported ? "completed" : "not-started";
}

export function isStepResolvable(step: PathStep): boolean {
  if (step.type === "technology-guide") return Boolean(getTechnologyById(step.refId));
  if (step.type === "course") return Boolean(getCourseBySlug(step.refId));
  if (step.type === "project") return Boolean(getProjectBySlug(step.refId));
  // practice/assessment steps have no separate registry to resolve against.
  return true;
}

export function getRoadmapCompletionPercent(path: LearningPath, state: ProgressState): number {
  const requiredSteps = path.steps.filter((s) => s.required);
  if (requiredSteps.length === 0) return 0;
  const completed = requiredSteps.filter(
    (s) => resolveStepStatus(s, path.slug, state) === "completed",
  ).length;
  return Math.round((completed / requiredSteps.length) * 100);
}

export function isRoadmapComplete(path: LearningPath, state: ProgressState): boolean {
  return path.steps
    .filter((s) => s.required)
    .every((s) => resolveStepStatus(s, path.slug, state) === "completed");
}

export function getRoadmapBySlugSafe(slug: string): LearningPath | undefined {
  const path = getLearningPathBySlug(slug);
  return path?.publicVisibility ? path : undefined;
}
