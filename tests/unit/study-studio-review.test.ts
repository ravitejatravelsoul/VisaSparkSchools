import { describe, it, expect } from "vitest";
import {
  getDueReviewLessons,
  getWeakTopicLessons,
  buildFlashcardsForLessons,
  worstReviewResult,
} from "@/lib/study-studio/review";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonById, getLessonsForCourse } from "@/lib/content/registry";

const LESSON_ID = "found-how-computers-run-code";

describe("getDueReviewLessons", () => {
  it("returns only lessons whose review is due", () => {
    const state = createEmptyProgress();
    state.reviewQueue[LESSON_ID] = { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 };
    state.reviewQueue["found-files-and-terminals"] = {
      dueAt: "2099-01-01T00:00:00.000Z",
      intervalDays: 30,
    };
    const due = getDueReviewLessons(state, new Date("2026-08-10T00:00:00.000Z"));
    expect(due.map((l) => l.id)).toEqual([LESSON_ID]);
  });

  it("returns an empty array when nothing is due", () => {
    const state = createEmptyProgress();
    expect(getDueReviewLessons(state)).toEqual([]);
  });
});

describe("getWeakTopicLessons", () => {
  it("resolves a weak topic tag to its real backing lesson", () => {
    const state = createEmptyProgress();
    state.practiceAttempts["quantitative-aptitude"] = {
      bestScore: 10,
      bestTotal: 36,
      lastAttemptedAt: "2026-08-01T00:00:00.000Z",
      topicsNeedingReview: ["Percentages and Percentage Change"],
    };
    const lessons = getWeakTopicLessons(state);
    expect(lessons).toHaveLength(1);
    expect(lessons[0].slug).toBe("percentages");
    expect(lessons[0].courseSlug).toBe("quantitative-aptitude");
  });

  it("returns nothing when no course has weak topics", () => {
    const state = createEmptyProgress();
    expect(getWeakTopicLessons(state)).toEqual([]);
  });

  it("never returns duplicates across courses", () => {
    const state = createEmptyProgress();
    state.practiceAttempts["quantitative-aptitude"] = {
      bestScore: 10,
      bestTotal: 36,
      lastAttemptedAt: "2026-08-01T00:00:00.000Z",
      topicsNeedingReview: [
        "Percentages and Percentage Change",
        "Percentages and Percentage Change",
      ],
    };
    expect(getWeakTopicLessons(state)).toHaveLength(1);
  });
});

describe("buildFlashcardsForLessons", () => {
  it("derives one flashcard per quiz question, namespaced by lesson id", () => {
    const lesson = getLessonById(LESSON_ID)!;
    const cards = buildFlashcardsForLessons([lesson]);
    expect(cards).toHaveLength(lesson.quiz.length);
    for (const card of cards) {
      expect(card.id.startsWith(`${LESSON_ID}:`)).toBe(true);
      expect(card.lessonId).toBe(LESSON_ID);
    }
  });

  it("preserves the original quiz content unchanged", () => {
    const lesson = getLessonById(LESSON_ID)!;
    const cards = buildFlashcardsForLessons([lesson]);
    const original = lesson.quiz[0];
    const card = cards.find((c) => c.id === `${LESSON_ID}:${original.id}`)!;
    expect(card.prompt).toBe(original.prompt);
    expect(card.choices).toEqual(original.choices);
    expect(card.correctIndex).toBe(original.correctIndex);
    expect(card.explanation).toBe(original.explanation);
  });

  it("returns an empty array for an empty lesson list", () => {
    expect(buildFlashcardsForLessons([])).toEqual([]);
  });

  it("flattens multiple lessons in order", () => {
    const lessons = getLessonsForCourse("how-computing-works");
    const cards = buildFlashcardsForLessons(lessons);
    const expectedCount = lessons.reduce((sum, l) => sum + l.quiz.length, 0);
    expect(cards).toHaveLength(expectedCount);
  });
});

describe("worstReviewResult", () => {
  it("returns 'good' for an empty rating list (never defaults to the harshest option)", () => {
    expect(worstReviewResult([])).toBe("good");
  });

  it("picks 'again' over any other rating present", () => {
    expect(worstReviewResult(["easy", "good", "again", "hard"])).toBe("again");
  });

  it("picks 'hard' when it's the worst present", () => {
    expect(worstReviewResult(["easy", "good", "hard"])).toBe("hard");
  });

  it("returns the single rating given when there's only one", () => {
    expect(worstReviewResult(["easy"])).toBe("easy");
  });

  it("is order-independent", () => {
    expect(worstReviewResult(["good", "again", "easy"])).toBe(
      worstReviewResult(["again", "easy", "good"]),
    );
  });
});
