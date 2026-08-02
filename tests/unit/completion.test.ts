import { describe, it, expect } from "vitest";
import {
  isCourseComplete,
  getCourseCompletionPercent,
  isProjectComplete,
  getProjectCompletionPercent,
  resolveStepStatus,
  isRoadmapComplete,
  getRoadmapCompletionPercent,
  isStepResolvable,
  getRoadmapBySlugSafe,
} from "@/lib/learning/completion";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonsForCourse } from "@/lib/content/registry";

const COURSE = "how-computing-works"; // 3 lessons -- small enough to exercise fully
const PROJECT = "personal-portfolio-page"; // milestones m1, m2, m3

describe("isCourseComplete / getCourseCompletionPercent", () => {
  it("is never complete with zero lessons touched", () => {
    const state = createEmptyProgress();
    expect(isCourseComplete(COURSE, state)).toBe(false);
    expect(getCourseCompletionPercent(COURSE, state)).toBe(0);
  });

  it("is not complete until every lesson in the course is completed", () => {
    const state = createEmptyProgress();
    const lessons = getLessonsForCourse(COURSE);
    state.lessonStatus[lessons[0].id] = "completed";
    state.lessonStatus[lessons[1].id] = "completed";
    expect(isCourseComplete(COURSE, state)).toBe(false);
    expect(getCourseCompletionPercent(COURSE, state)).toBe(67);
  });

  it("is complete once every lesson is completed -- derived, not a stored flag", () => {
    const state = createEmptyProgress();
    for (const lesson of getLessonsForCourse(COURSE)) {
      state.lessonStatus[lesson.id] = "completed";
    }
    expect(isCourseComplete(COURSE, state)).toBe(true);
    expect(getCourseCompletionPercent(COURSE, state)).toBe(100);
  });

  it("an unknown course slug is never complete", () => {
    expect(isCourseComplete("does-not-exist", createEmptyProgress())).toBe(false);
  });
});

describe("isProjectComplete / getProjectCompletionPercent", () => {
  it("is not complete with no milestones checked off", () => {
    const state = createEmptyProgress();
    expect(isProjectComplete(PROJECT, state)).toBe(false);
    expect(getProjectCompletionPercent(PROJECT, state)).toBe(0);
  });

  it("is complete once every milestone id is present, regardless of order", () => {
    const state = createEmptyProgress();
    state.projectProgress[PROJECT] = {
      startedAt: "2026-01-01T00:00:00.000Z",
      completedMilestoneIds: ["m3", "m1", "m2"],
    };
    expect(isProjectComplete(PROJECT, state)).toBe(true);
    expect(getProjectCompletionPercent(PROJECT, state)).toBe(100);
  });

  it("partial milestones give a partial (rounded) percentage", () => {
    const state = createEmptyProgress();
    state.projectProgress[PROJECT] = {
      startedAt: "2026-01-01T00:00:00.000Z",
      completedMilestoneIds: ["m1"],
    };
    expect(getProjectCompletionPercent(PROJECT, state)).toBe(33);
  });
});

describe("resolveStepStatus", () => {
  const path = getRoadmapBySlugSafe("complete-beginner-to-web-developer")!;

  it("resolves a course step from real lesson completion, never a stored flag", () => {
    const state = createEmptyProgress();
    const step = path.steps.find((s) => s.refId === "how-computing-works")!;
    expect(resolveStepStatus(step, path.slug, state)).toBe("not-started");

    const lessons = getLessonsForCourse("how-computing-works");
    state.lessonStatus[lessons[0].id] = "completed";
    expect(resolveStepStatus(step, path.slug, state)).toBe("in-progress");

    for (const lesson of lessons) state.lessonStatus[lesson.id] = "completed";
    expect(resolveStepStatus(step, path.slug, state)).toBe("completed");
  });

  it("resolves a project step from real milestone completion", () => {
    const state = createEmptyProgress();
    const step = path.steps.find((s) => s.refId === PROJECT)!;
    expect(resolveStepStatus(step, path.slug, state)).toBe("not-started");

    state.projectProgress[PROJECT] = {
      startedAt: "2026-01-01T00:00:00.000Z",
      completedMilestoneIds: ["m1"],
    };
    expect(resolveStepStatus(step, path.slug, state)).toBe("in-progress");

    state.projectProgress[PROJECT] = {
      startedAt: "2026-01-01T00:00:00.000Z",
      completedMilestoneIds: ["m1", "m2", "m3"],
    };
    expect(resolveStepStatus(step, path.slug, state)).toBe("completed");
  });

  it("resolves a technology-guide step only from a learner's own self-reported completion", () => {
    const state = createEmptyProgress();
    const step = path.steps.find((s) => s.type === "technology-guide")!;
    expect(resolveStepStatus(step, path.slug, state)).toBe("not-started");

    state.roadmapProgress[path.slug] = {
      startedAt: "2026-01-01T00:00:00.000Z",
      lastAccessedAt: "2026-01-01T00:00:00.000Z",
      completedStepIds: [step.id],
    };
    expect(resolveStepStatus(step, path.slug, state)).toBe("completed");
  });

  it("every step in every public roadmap resolves to a real registry entry", () => {
    const allResolvable = path.steps.every(isStepResolvable);
    expect(allResolvable).toBe(true);
  });

  it("never leaks self-reported completion across roadmaps that reuse the same step id", () => {
    // Step ids are short, roadmap-local strings ("s1", "s2", ...) reused by
    // nearly every public roadmap -- this is the regression test for a real
    // bug where resolveStepStatus searched every roadmap's completedStepIds
    // instead of only the one that owns the step, so marking "s1" complete
    // in one roadmap made every other roadmap's "s1" show complete too.
    const otherPath = getRoadmapBySlugSafe("java-developer")!;
    const thisFirstStep = path.steps[0];
    const otherFirstStep = otherPath.steps[0];
    expect(thisFirstStep.id).toBe("s1");
    expect(otherFirstStep.id).toBe("s1");
    expect(thisFirstStep.refId).not.toBe(otherFirstStep.refId); // genuinely different steps

    const state = createEmptyProgress();
    state.roadmapProgress[path.slug] = {
      startedAt: "2026-01-01T00:00:00.000Z",
      lastAccessedAt: "2026-01-01T00:00:00.000Z",
      completedStepIds: ["s1"],
    };

    expect(resolveStepStatus(thisFirstStep, path.slug, state)).toBe("completed");
    // The other roadmap was never started, so its own "s1" must stay not-started
    // even though *a* roadmap's completedStepIds contains the string "s1".
    expect(resolveStepStatus(otherFirstStep, otherPath.slug, state)).toBe("not-started");
  });
});

describe("isRoadmapComplete / getRoadmapCompletionPercent", () => {
  const path = getRoadmapBySlugSafe("complete-beginner-to-web-developer")!;

  it("is not complete until every required step resolves as completed", () => {
    const state = createEmptyProgress();
    expect(isRoadmapComplete(path, state)).toBe(false);
    expect(getRoadmapCompletionPercent(path, state)).toBe(0);
  });

  it("becomes complete once every required step (courses, project milestones, guides) is done", () => {
    const state = createEmptyProgress();
    for (const step of path.steps) {
      if (step.type === "course") {
        for (const lesson of getLessonsForCourse(step.refId))
          state.lessonStatus[lesson.id] = "completed";
      } else if (step.type === "project") {
        state.projectProgress[step.refId] = {
          startedAt: "2026-01-01T00:00:00.000Z",
          completedMilestoneIds: ["m1", "m2", "m3"],
        };
      } else {
        state.roadmapProgress[path.slug] = state.roadmapProgress[path.slug] ?? {
          startedAt: "2026-01-01T00:00:00.000Z",
          lastAccessedAt: "2026-01-01T00:00:00.000Z",
          completedStepIds: [],
        };
        state.roadmapProgress[path.slug].completedStepIds.push(step.id);
      }
    }
    expect(isRoadmapComplete(path, state)).toBe(true);
    expect(getRoadmapCompletionPercent(path, state)).toBe(100);
  });
});
