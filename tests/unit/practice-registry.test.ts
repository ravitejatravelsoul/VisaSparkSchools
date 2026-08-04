import { describe, it, expect } from "vitest";
import { getPracticeQuestionsForCourse } from "@/lib/practice/registry";
import { getLessonsForCourse } from "@/lib/content/registry";

describe("getPracticeQuestionsForCourse", () => {
  it("returns an empty array for an unknown course slug", () => {
    expect(getPracticeQuestionsForCourse("this-course-does-not-exist")).toEqual([]);
  });

  it("pulls exactly every quiz question from every lesson of a real course (Quantitative Aptitude)", () => {
    const lessons = getLessonsForCourse("quantitative-aptitude");
    const expectedCount = lessons.reduce((sum, l) => sum + l.quiz.length, 0);
    const questions = getPracticeQuestionsForCourse("quantitative-aptitude");
    expect(questions).toHaveLength(expectedCount);
    expect(expectedCount).toBeGreaterThanOrEqual(36); // 12 lessons x 3 quiz questions minimum
  });

  it("every question id is unique and namespaced by its owning lesson id", () => {
    const questions = getPracticeQuestionsForCourse("quantitative-aptitude");
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of questions) {
      expect(q.id).toBe(`${q.lessonId}:${q.id.split(":")[1]}`);
      expect(q.id.startsWith(`${q.lessonId}:`)).toBe(true);
    }
  });

  it("every question carries a real course/lesson association, difficulty, topic, and attribution", () => {
    const questions = getPracticeQuestionsForCourse("quantitative-aptitude");
    const lessonSlugs = new Set(getLessonsForCourse("quantitative-aptitude").map((l) => l.slug));
    for (const q of questions) {
      expect(q.courseSlug).toBe("quantitative-aptitude");
      expect(lessonSlugs.has(q.lessonSlug)).toBe(true);
      expect(q.topic.length).toBeGreaterThan(0);
      expect(["beginner", "intermediate", "advanced"]).toContain(q.difficulty);
      expect(q.source.length).toBeGreaterThan(0);
      expect(q.source).not.toMatch(/proprietary|copyright/i);
    }
  });

  it("preserves each lesson's own quiz content (prompt, choices, correctIndex, explanation) unchanged", () => {
    const lessons = getLessonsForCourse("quantitative-aptitude");
    const firstLesson = lessons[0];
    const questions = getPracticeQuestionsForCourse("quantitative-aptitude");
    for (const original of firstLesson.quiz) {
      const derived = questions.find((q) => q.id === `${firstLesson.id}:${original.id}`);
      expect(derived).toBeDefined();
      expect(derived!.prompt).toBe(original.prompt);
      expect(derived!.choices).toEqual(original.choices);
      expect(derived!.correctIndex).toBe(original.correctIndex);
      expect(derived!.explanation).toBe(original.explanation);
    }
  });

  it("is deterministic and ordered by course lesson order, then quiz order", () => {
    const first = getPracticeQuestionsForCourse("quantitative-aptitude");
    const second = getPracticeQuestionsForCourse("quantitative-aptitude");
    expect(first).toEqual(second);

    const lessons = getLessonsForCourse("quantitative-aptitude");
    const expectedOrder = lessons.flatMap((l) => l.quiz.map((q) => `${l.id}:${q.id}`));
    expect(first.map((q) => q.id)).toEqual(expectedOrder);
  });
});
