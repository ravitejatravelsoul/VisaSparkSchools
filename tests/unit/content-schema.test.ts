import { describe, it, expect } from "vitest";
import { lessonSchema } from "@/lib/content/types";
import {
  allLessons,
  allTracks,
  allCourses,
  getLessonBySlug,
  getAdjacentLessons,
} from "@/lib/content/registry";

function validLessonInput() {
  return {
    id: "test-lesson-one",
    slug: "test-lesson-one",
    title: "Test Lesson",
    description: "A lesson used only in tests.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 10,
    prerequisites: [],
    objectives: ["Learn a thing"],
    skills: ["testing"],
    author: "Test Author",
    reviewer: "Test Reviewer",
    lastReviewed: "2026-01-01",
    explanation: "Some explanation text.",
    example: { language: "javascript", code: "console.log(1);", description: "example" },
    guidedExercise: {
      id: "test-guided",
      kind: "guided",
      language: "javascript",
      prompt: "Do a thing",
      starterCode: "// code",
      solutionCode: "// solution",
      harness: "window.__report('t1', true, 'ok');",
      tests: [{ id: "t1", description: "passes" }],
      hints: ["hint one", "hint two"],
    },
    independentExercise: {
      id: "test-independent",
      kind: "independent",
      language: "javascript",
      prompt: "Do another thing",
      starterCode: "// code",
      solutionCode: "// solution",
      harness: "window.__report('t1', true, 'ok');",
      tests: [{ id: "t1", description: "passes" }],
      hints: ["hint one", "hint two"],
    },
    commonMistakes: ["A mistake"],
    quiz: [
      { id: "q1", prompt: "?", choices: ["a", "b"], correctIndex: 0, explanation: "because" },
      { id: "q2", prompt: "?", choices: ["a", "b"], correctIndex: 0, explanation: "because" },
      { id: "q3", prompt: "?", choices: ["a", "b"], correctIndex: 0, explanation: "because" },
    ],
    takeaway: "A takeaway.",
    summary: "A summary.",
  };
}

describe("lessonSchema", () => {
  it("accepts a minimal, well-formed lesson", () => {
    const result = lessonSchema.safeParse(validLessonInput());
    expect(result.success).toBe(true);
  });

  it("fills in defaulted fields like sqlOrderSensitive", () => {
    const result = lessonSchema.parse(validLessonInput());
    expect(result.guidedExercise.sqlOrderSensitive).toBe(false);
    expect(result.prerequisites).toEqual([]);
  });

  it("rejects a lesson with fewer than 3 quiz questions", () => {
    const input = validLessonInput();
    input.quiz = input.quiz.slice(0, 2);
    const result = lessonSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a lesson with an uppercase slug (must be kebab-case)", () => {
    const input = validLessonInput();
    input.slug = "Not-Kebab-Case";
    const result = lessonSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects an exercise with fewer than 2 hints", () => {
    const input = validLessonInput();
    input.guidedExercise.hints = ["only one hint"];
    const result = lessonSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a sql-language exercise with no seedSql", () => {
    const input = validLessonInput();
    input.guidedExercise.language = "sql";
    const result = lessonSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("the real content registry", () => {
  it("has no duplicate lesson ids or slugs", () => {
    const ids = allLessons.map((l) => l.id);
    const slugs = allLessons.map((l) => l.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every prerequisite to a real lesson id", () => {
    const ids = new Set(allLessons.map((l) => l.id));
    for (const lesson of allLessons) {
      for (const prereq of lesson.prerequisites) {
        expect(ids.has(prereq)).toBe(true);
      }
    }
  });

  it("resolves every lesson's track and course to a real track/course", () => {
    const trackSlugs = new Set(allTracks.map((t) => t.slug));
    const courseSlugs = new Set(allCourses.map((c) => c.slug));
    for (const lesson of allLessons) {
      expect(trackSlugs.has(lesson.trackSlug)).toBe(true);
      expect(courseSlugs.has(lesson.courseSlug)).toBe(true);
    }
  });

  it("covers all 6 tracks with at least one lesson each", () => {
    for (const track of allTracks) {
      const count = allLessons.filter((l) => l.trackSlug === track.slug).length;
      expect(count).toBeGreaterThan(0);
    }
  });

  it("getAdjacentLessons returns siblings within the same course, in order", () => {
    const lesson = getLessonBySlug("js-loops");
    expect(lesson).toBeDefined();
    if (!lesson) return;
    const { prev, next } = getAdjacentLessons(lesson);
    expect(prev?.courseSlug).toBe(lesson.courseSlug);
    expect(next?.courseSlug).toBe(lesson.courseSlug);
    expect(prev!.order).toBeLessThan(lesson.order);
    expect(next!.order).toBeGreaterThan(lesson.order);
  });
});
