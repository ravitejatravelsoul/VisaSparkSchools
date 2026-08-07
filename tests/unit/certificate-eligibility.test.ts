import { describe, it, expect } from "vitest";
import {
  SKILL_ACHIEVEMENT_COURSES,
  getCourseCompletionEligibility,
  getSkillAchievementEligibility,
  buildCertificateId,
  SKILL_PRACTICE_THRESHOLD,
} from "@/lib/certificates/eligibility";
import { allCourses, allProjects, getLessonsForCourse } from "@/lib/content/registry";
import { createEmptyProgress } from "@/lib/learning/types";

describe("SKILL_ACHIEVEMENT_COURSES (curated allowlist)", () => {
  it("every key is a real course slug", () => {
    for (const slug of Object.keys(SKILL_ACHIEVEMENT_COURSES)) {
      expect(
        allCourses.some((c) => c.slug === slug),
        `"${slug}" is not a real course slug`,
      ).toBe(true);
    }
  });

  it("every mapped projectId is a real project", () => {
    for (const [slug, mapping] of Object.entries(SKILL_ACHIEVEMENT_COURSES)) {
      expect(
        allProjects.some((p) => p.id === mapping.projectId),
        `${slug} maps to unknown project "${mapping.projectId}"`,
      ).toBe(true);
    }
  });

  it("every mapped project's trackSlugs includes the course's own trackSlug -- a genuine correspondence, not an arbitrary pairing", () => {
    for (const [slug, mapping] of Object.entries(SKILL_ACHIEVEMENT_COURSES)) {
      const course = allCourses.find((c) => c.slug === slug)!;
      const project = allProjects.find((p) => p.id === mapping.projectId)!;
      expect(
        project.trackSlugs.includes(course.trackSlug),
        `${slug} (track "${course.trackSlug}") is mapped to project "${project.id}" (tracks: ${project.trackSlugs.join(",")}), which doesn't share its track`,
      ).toBe(true);
    }
  });

  it("no project id is reused across two different courses (each mapping is genuinely 1:1)", () => {
    const projectIds = Object.values(SKILL_ACHIEVEMENT_COURSES).map((m) => m.projectId);
    expect(new Set(projectIds).size).toBe(projectIds.length);
  });

  it("does not include every course -- some are deliberately excluded for lacking an unambiguous capstone", () => {
    expect(Object.keys(SKILL_ACHIEVEMENT_COURSES).length).toBeLessThan(allCourses.length);
    expect(SKILL_ACHIEVEMENT_COURSES["how-computing-works"]).toBeUndefined();
    expect(SKILL_ACHIEVEMENT_COURSES["ai-foundations"]).toBeUndefined();
  });
});

describe("buildCertificateId", () => {
  it("is deterministic and distinguishes type and target", () => {
    expect(buildCertificateId("course-completion", "python-fundamentals")).toBe(
      "course-completion:python-fundamentals",
    );
    expect(buildCertificateId("skill-achievement", "python-fundamentals")).toBe(
      "skill-achievement:python-fundamentals",
    );
  });
});

describe("getCourseCompletionEligibility", () => {
  it("is not eligible for an unknown course", () => {
    const result = getCourseCompletionEligibility("not-a-real-course", createEmptyProgress());
    expect(result.eligible).toBe(false);
  });

  it("is not eligible when no lessons are completed", () => {
    const result = getCourseCompletionEligibility("how-computing-works", createEmptyProgress());
    expect(result.eligible).toBe(false);
    expect(result.unmet.length).toBeGreaterThan(0);
  });

  it("is eligible once every required lesson is completed, and only then", () => {
    const state = createEmptyProgress();
    const lessons = getLessonsForCourse("how-computing-works");
    expect(lessons.length).toBeGreaterThan(0);

    for (let i = 0; i < lessons.length - 1; i++) {
      state.lessonStatus[lessons[i].id] = "completed";
    }
    expect(getCourseCompletionEligibility("how-computing-works", state).eligible).toBe(false);

    state.lessonStatus[lessons[lessons.length - 1].id] = "completed";
    const result = getCourseCompletionEligibility("how-computing-works", state);
    expect(result.eligible).toBe(true);
    expect(result.met.length).toBeGreaterThan(0);
    expect(result.unmet).toEqual([]);
  });

  /**
   * Product-model regression: courses are independently learnable, so a
   * course's own Course Completion certificate must depend only on that
   * course's own required lessons -- never on any other course's progress,
   * even a course listed as a "recommended" prerequisite. Picks a course
   * that genuinely has a prerequisiteCourseSlugs entry so this isn't
   * vacuously true.
   */
  it("a course with a recommended prerequisite is fully eligible on its own, with the prerequisite course untouched", () => {
    const course = allCourses.find((c) => c.prerequisiteCourseSlugs.length > 0);
    expect(course, "expected at least one course with a prerequisite for this test").toBeDefined();

    const state = createEmptyProgress();
    // The "recommended" prerequisite course(s) have zero progress -- not
    // started, not even enrolled.
    for (const prereqSlug of course!.prerequisiteCourseSlugs) {
      expect(state.lessonStatus).not.toHaveProperty(prereqSlug);
    }

    for (const lesson of getLessonsForCourse(course!.slug)) {
      state.lessonStatus[lesson.id] = "completed";
    }

    const result = getCourseCompletionEligibility(course!.slug, state);
    expect(result.eligible).toBe(true);
    expect(result.unmet).toEqual([]);
  });

  it("every course independently qualifies for its own Course Completion certificate once its own lessons are done", () => {
    for (const course of allCourses) {
      const state = createEmptyProgress();
      for (const lesson of getLessonsForCourse(course.slug)) {
        state.lessonStatus[lesson.id] = "completed";
      }
      expect(
        getCourseCompletionEligibility(course.slug, state).eligible,
        `${course.slug} should be eligible once only its own lessons are complete`,
      ).toBe(true);
    }
  });
});

describe("getSkillAchievementEligibility", () => {
  it("is not eligible for a course with no defined skill-achievement path", () => {
    const result = getSkillAchievementEligibility("how-computing-works", createEmptyProgress());
    expect(result.eligible).toBe(false);
  });

  it("requires all three signals: lessons complete, practice threshold met, project complete", () => {
    const state = createEmptyProgress();
    const lessons = getLessonsForCourse("python-fundamentals");
    for (const lesson of lessons) state.lessonStatus[lesson.id] = "completed";

    // Lessons alone are not enough.
    expect(getSkillAchievementEligibility("python-fundamentals", state).eligible).toBe(false);

    // Add a passing practice score -- still not enough without the project.
    state.practiceAttempts["python-fundamentals"] = {
      bestScore: 8,
      bestTotal: 10,
      lastAttemptedAt: "2026-08-01T00:00:00.000Z",
      topicsNeedingReview: [],
    };
    expect(getSkillAchievementEligibility("python-fundamentals", state).eligible).toBe(false);

    // Complete the mapped project's milestones -- now eligible.
    const project = allProjects.find((p) => p.id === "expense-tracker-cli")!;
    state.projectProgress["expense-tracker-cli"] = {
      startedAt: "2026-08-01T00:00:00.000Z",
      completedMilestoneIds: project.milestones.map((m) => m.id),
    };
    const result = getSkillAchievementEligibility("python-fundamentals", state);
    expect(result.eligible).toBe(true);
    expect(result.unmet).toEqual([]);
  });

  it("rejects a practice score below the threshold", () => {
    const state = createEmptyProgress();
    const lessons = getLessonsForCourse("python-fundamentals");
    for (const lesson of lessons) state.lessonStatus[lesson.id] = "completed";
    const project = allProjects.find((p) => p.id === "expense-tracker-cli")!;
    state.projectProgress["expense-tracker-cli"] = {
      startedAt: "2026-08-01T00:00:00.000Z",
      completedMilestoneIds: project.milestones.map((m) => m.id),
    };
    // Just below the threshold.
    state.practiceAttempts["python-fundamentals"] = {
      bestScore: Math.floor(SKILL_PRACTICE_THRESHOLD * 10) - 1,
      bestTotal: 10,
      lastAttemptedAt: "2026-08-01T00:00:00.000Z",
      topicsNeedingReview: [],
    };
    expect(getSkillAchievementEligibility("python-fundamentals", state).eligible).toBe(false);
  });

  it("accepts a practice score exactly at the threshold", () => {
    const state = createEmptyProgress();
    const lessons = getLessonsForCourse("python-fundamentals");
    for (const lesson of lessons) state.lessonStatus[lesson.id] = "completed";
    const project = allProjects.find((p) => p.id === "expense-tracker-cli")!;
    state.projectProgress["expense-tracker-cli"] = {
      startedAt: "2026-08-01T00:00:00.000Z",
      completedMilestoneIds: project.milestones.map((m) => m.id),
    };
    state.practiceAttempts["python-fundamentals"] = {
      bestScore: SKILL_PRACTICE_THRESHOLD * 10,
      bestTotal: 10,
      lastAttemptedAt: "2026-08-01T00:00:00.000Z",
      topicsNeedingReview: [],
    };
    expect(getSkillAchievementEligibility("python-fundamentals", state).eligible).toBe(true);
  });
});
