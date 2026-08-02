import { describe, it, expect } from "vitest";
import { getNextLessonRecommendation } from "@/lib/learning/recommendation";
import { createEmptyProgress } from "@/lib/learning/types";
import { allLessons, getLessonsForCourse } from "@/lib/content/registry";

describe("getNextLessonRecommendation", () => {
  it("recommends the first lesson of the platform for a brand-new guest", () => {
    const state = createEmptyProgress();
    const rec = getNextLessonRecommendation(state);
    expect(rec?.lesson.id).toBe(allLessons[0].id);
    expect(rec?.reason).toBe("Start here");
  });

  it("priority 1: resumes an in-progress lesson over everything else", () => {
    const state = createEmptyProgress();
    const lessons = getLessonsForCourse("how-computing-works");
    state.lessonStatus[lessons[1].id] = "in-progress";
    // Also enrolled elsewhere and has a roadmap set -- in-progress still wins.
    state.enrollments["python-fundamentals"] = { enrolledAt: "2026-01-01T00:00:00.000Z" };
    state.profile.currentRoadmapId = "complete-beginner-to-web-developer";

    const rec = getNextLessonRecommendation(state);
    expect(rec?.lesson.id).toBe(lessons[1].id);
    expect(rec?.reason).toBe("Continue where you left off");
  });

  it("priority 1: resumes the MOST RECENTLY viewed in-progress lesson, not just the first one by object key order", () => {
    const state = createEmptyProgress();
    const [lessonA, lessonB] = getLessonsForCourse("how-computing-works");
    // Started A first (so it comes first in lessonStatus's insertion order),
    // then started B, then went back and looked at A again most recently.
    state.lessonStatus[lessonA.id] = "in-progress";
    state.lessonStatus[lessonB.id] = "in-progress";
    state.recentlyViewed = [lessonA.id, lessonB.id]; // A viewed most recently

    const rec = getNextLessonRecommendation(state);
    expect(rec?.lesson.id).toBe(lessonA.id);
  });

  it("priority 1: falls back to lessonStatus order if the in-progress lesson fell out of the recently-viewed window", () => {
    const state = createEmptyProgress();
    const lessons = getLessonsForCourse("how-computing-works");
    state.lessonStatus[lessons[0].id] = "in-progress";
    state.recentlyViewed = []; // simulates it scrolling out of the capped-at-10 list

    const rec = getNextLessonRecommendation(state);
    expect(rec?.lesson.id).toBe(lessons[0].id);
  });

  it("priority 2: continues the current roadmap's next incomplete required course step", () => {
    const state = createEmptyProgress();
    state.profile.currentRoadmapId = "complete-beginner-to-web-developer";
    // Complete the roadmap's first course step (how-computing-works) entirely.
    for (const lesson of getLessonsForCourse("how-computing-works")) {
      state.lessonStatus[lesson.id] = "completed";
    }

    const rec = getNextLessonRecommendation(state);
    // Next required course step in that roadmap is html-css-fundamentals.
    expect(rec?.lesson.courseSlug).toBe("html-css-fundamentals");
    expect(rec?.reason).toContain("Complete Beginner to Web Developer");
  });

  it("priority 3: falls back to the most recently accessed enrolled course", () => {
    const state = createEmptyProgress();
    state.enrollments["python-fundamentals"] = {
      enrolledAt: "2026-01-01T00:00:00.000Z",
      lastAccessedAt: "2026-01-05T00:00:00.000Z",
    };
    state.enrollments["javascript-fundamentals"] = {
      enrolledAt: "2026-01-01T00:00:00.000Z",
      lastAccessedAt: "2026-01-02T00:00:00.000Z",
    };

    const rec = getNextLessonRecommendation(state);
    expect(rec?.lesson.courseSlug).toBe("python-fundamentals");
    expect(rec?.reason).toBe("Continue Python Fundamentals");
  });

  it("priority 4: recommends the first not-yet-completed lesson overall as a last resort", () => {
    const state = createEmptyProgress();
    state.lessonStatus[allLessons[0].id] = "completed";
    const rec = getNextLessonRecommendation(state);
    expect(rec?.lesson.id).toBe(allLessons[1].id);
  });

  it("returns undefined once every lesson on the platform is completed", () => {
    const state = createEmptyProgress();
    for (const lesson of allLessons) state.lessonStatus[lesson.id] = "completed";
    expect(getNextLessonRecommendation(state)).toBeUndefined();
  });
});
