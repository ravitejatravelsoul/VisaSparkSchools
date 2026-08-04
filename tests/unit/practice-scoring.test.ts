import { describe, it, expect } from "vitest";
import {
  mulberry32,
  scorePracticeSession,
  selectQuestionsByIds,
  shuffleWithSeed,
} from "@/lib/practice/scoring";
import type { PracticeQuestion } from "@/lib/practice/types";

function question(
  overrides: Partial<PracticeQuestion> & { id: string; topic: string },
): PracticeQuestion {
  return {
    prompt: "Prompt",
    choices: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "Because.",
    courseSlug: "quantitative-aptitude",
    lessonSlug: "lesson",
    lessonId: "lesson-id",
    difficulty: "beginner",
    source: "Lesson quiz: Lesson",
    ...overrides,
  };
}

describe("mulberry32 / shuffleWithSeed", () => {
  it("is a pure function of its seed: the same seed always produces the same sequence", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const seqA = Array.from({ length: 5 }, () => a());
    const seqB = Array.from({ length: 5 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  it("shuffleWithSeed is deterministic: same input + same seed -> same order every time", () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    const first = shuffleWithSeed(items, 1234);
    const second = shuffleWithSeed(items, 1234);
    expect(first).toEqual(second);
  });

  it("shuffleWithSeed never mutates the input array", () => {
    const items = [1, 2, 3, 4, 5];
    const copy = [...items];
    shuffleWithSeed(items, 99);
    expect(items).toEqual(copy);
  });

  it("shuffleWithSeed returns a permutation (same elements, same length)", () => {
    const items = ["a", "b", "c", "d", "e"];
    const shuffled = shuffleWithSeed(items, 7);
    expect(shuffled).toHaveLength(items.length);
    expect(shuffled.sort()).toEqual([...items].sort());
  });

  it("different seeds can produce different orders (sanity check, not a hard guarantee for every seed pair)", () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const a = shuffleWithSeed(items, 1);
    const b = shuffleWithSeed(items, 2);
    expect(a).not.toEqual(b);
  });
});

describe("scorePracticeSession", () => {
  it("is a pure function: the same inputs always produce the same result", () => {
    const questions = [question({ id: "q1", topic: "Topic A", correctIndex: 0 })];
    const answers = { q1: 0 };
    expect(scorePracticeSession(questions, answers)).toEqual(
      scorePracticeSession(questions, answers),
    );
  });

  it("counts correct and incorrect answers accurately", () => {
    const questions = [
      question({ id: "q1", topic: "Topic A", correctIndex: 0 }),
      question({ id: "q2", topic: "Topic A", correctIndex: 1 }),
      question({ id: "q3", topic: "Topic B", correctIndex: 2 }),
    ];
    const answers = { q1: 0, q2: 0, q3: 2 };
    const result = scorePracticeSession(questions, answers);
    expect(result.correct).toBe(2);
    expect(result.total).toBe(3);
    expect(result.incorrectQuestionIds).toEqual(["q2"]);
  });

  it("treats a skipped (unanswered) question as incorrect, never crashing", () => {
    const questions = [question({ id: "q1", topic: "Topic A", correctIndex: 0 })];
    const result = scorePracticeSession(questions, {});
    expect(result.correct).toBe(0);
    expect(result.incorrectQuestionIds).toEqual(["q1"]);
  });

  it("builds a per-topic breakdown", () => {
    const questions = [
      question({ id: "q1", topic: "Percentages", correctIndex: 0 }),
      question({ id: "q2", topic: "Percentages", correctIndex: 0 }),
      question({ id: "q3", topic: "Averages", correctIndex: 0 }),
    ];
    const answers = { q1: 0, q2: 1, q3: 0 };
    const result = scorePracticeSession(questions, answers);
    expect(result.topicBreakdown).toEqual(
      expect.arrayContaining([
        { topic: "Percentages", correct: 1, total: 2 },
        { topic: "Averages", correct: 1, total: 1 },
      ]),
    );
  });

  it("flags a topic for review only when its accuracy is below the review threshold", () => {
    const questions = [
      question({ id: "q1", topic: "Weak Topic", correctIndex: 0 }),
      question({ id: "q2", topic: "Weak Topic", correctIndex: 0 }),
      question({ id: "q3", topic: "Weak Topic", correctIndex: 0 }),
      question({ id: "q4", topic: "Strong Topic", correctIndex: 0 }),
    ];
    // Weak Topic: 1/3 correct (below 0.7). Strong Topic: 1/1 correct.
    const answers = { q1: 0, q2: 1, q3: 1, q4: 0 };
    const result = scorePracticeSession(questions, answers);
    expect(result.topicsNeedingReview).toEqual(["Weak Topic"]);
  });

  it("returns an empty result for zero questions without dividing by zero", () => {
    const result = scorePracticeSession([], {});
    expect(result).toEqual({
      correct: 0,
      total: 0,
      incorrectQuestionIds: [],
      topicBreakdown: [],
      topicsNeedingReview: [],
    });
  });
});

describe("selectQuestionsByIds", () => {
  it("selects only the requested ids, preserving the requested order", () => {
    const bank = [
      question({ id: "q1", topic: "A" }),
      question({ id: "q2", topic: "B" }),
      question({ id: "q3", topic: "C" }),
    ];
    const selected = selectQuestionsByIds(bank, ["q3", "q1"]);
    expect(selected.map((q) => q.id)).toEqual(["q3", "q1"]);
  });

  it("silently drops any id that no longer resolves to a bank question", () => {
    const bank = [question({ id: "q1", topic: "A" })];
    const selected = selectQuestionsByIds(bank, ["q1", "does-not-exist"]);
    expect(selected.map((q) => q.id)).toEqual(["q1"]);
  });
});
