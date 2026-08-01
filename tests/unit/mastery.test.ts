import { describe, it, expect } from "vitest";
import { calculateLessonMasteryContribution, averageMastery } from "@/lib/learning/mastery";

describe("calculateLessonMasteryContribution", () => {
  it("returns 0 for completely untouched lesson", () => {
    const score = calculateLessonMasteryContribution({
      lessonCompleted: false,
      guidedExerciseSolved: false,
      independentExerciseSolved: false,
      quizCorrect: 0,
      quizTotal: 0,
      hintsUsed: 0,
    });
    expect(score).toBe(0);
  });

  it("returns 100 for a fully perfect lesson with no hints", () => {
    const score = calculateLessonMasteryContribution({
      lessonCompleted: true,
      guidedExerciseSolved: true,
      independentExerciseSolved: true,
      quizCorrect: 4,
      quizTotal: 4,
      hintsUsed: 0,
    });
    expect(score).toBe(100);
  });

  it("applies partial quiz accuracy proportionally", () => {
    const score = calculateLessonMasteryContribution({
      lessonCompleted: true,
      guidedExerciseSolved: false,
      independentExerciseSolved: false,
      quizCorrect: 2,
      quizTotal: 4,
      hintsUsed: 0,
    });
    // 40 (completed) + 25 * 0.5 (half quiz accuracy) = 52.5 -> rounds to 53
    expect(score).toBe(53);
  });

  it("caps the hint penalty at 10 points regardless of how many hints were used", () => {
    const fewHints = calculateLessonMasteryContribution({
      lessonCompleted: true,
      guidedExerciseSolved: false,
      independentExerciseSolved: false,
      quizCorrect: 0,
      quizTotal: 0,
      hintsUsed: 5,
    });
    const manyHints = calculateLessonMasteryContribution({
      lessonCompleted: true,
      guidedExerciseSolved: false,
      independentExerciseSolved: false,
      quizCorrect: 0,
      quizTotal: 0,
      hintsUsed: 50,
    });
    expect(fewHints).toBe(30); // 40 - 10 (capped)
    expect(manyHints).toBe(30);
  });

  it("never returns a negative score", () => {
    const score = calculateLessonMasteryContribution({
      lessonCompleted: false,
      guidedExerciseSolved: false,
      independentExerciseSolved: false,
      quizCorrect: 0,
      quizTotal: 4,
      hintsUsed: 20,
    });
    expect(score).toBeGreaterThanOrEqual(0);
  });
});

describe("averageMastery", () => {
  it("returns 0 for an empty list", () => {
    expect(averageMastery([])).toBe(0);
  });

  it("averages multiple contributions", () => {
    expect(averageMastery([80, 60, 100])).toBe(80);
  });
});
