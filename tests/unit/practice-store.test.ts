import { describe, it, expect, beforeEach } from "vitest";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("recordPracticeAttempt", () => {
  it("records a first attempt as the best score", () => {
    useProgressStore.getState().recordPracticeAttempt("quantitative-aptitude", {
      score: 20,
      total: 36,
      topicsNeedingReview: ["Percentages"],
    });
    const attempt = useProgressStore.getState().state.practiceAttempts["quantitative-aptitude"];
    expect(attempt.bestScore).toBe(20);
    expect(attempt.bestTotal).toBe(36);
    expect(attempt.topicsNeedingReview).toEqual(["Percentages"]);
    expect(attempt.lastAttemptedAt).toBeTruthy();
  });

  it("keeps the best-accuracy score across attempts, never regressing on a weaker retry", () => {
    const { recordPracticeAttempt } = useProgressStore.getState();
    recordPracticeAttempt("quantitative-aptitude", {
      score: 30,
      total: 36,
      topicsNeedingReview: [],
    });
    recordPracticeAttempt("quantitative-aptitude", {
      score: 10,
      total: 36,
      topicsNeedingReview: ["Percentages", "Averages"],
    });
    const attempt = useProgressStore.getState().state.practiceAttempts["quantitative-aptitude"];
    // bestScore/bestTotal stay at the higher-accuracy attempt...
    expect(attempt.bestScore).toBe(30);
    expect(attempt.bestTotal).toBe(36);
    // ...but topicsNeedingReview always reflects the most recent attempt.
    expect(attempt.topicsNeedingReview).toEqual(["Percentages", "Averages"]);
  });

  it("updates the best score when a later attempt is genuinely better", () => {
    const { recordPracticeAttempt } = useProgressStore.getState();
    recordPracticeAttempt("quantitative-aptitude", {
      score: 10,
      total: 36,
      topicsNeedingReview: [],
    });
    recordPracticeAttempt("quantitative-aptitude", {
      score: 33,
      total: 36,
      topicsNeedingReview: [],
    });
    const attempt = useProgressStore.getState().state.practiceAttempts["quantitative-aptitude"];
    expect(attempt.bestScore).toBe(33);
  });

  it("tracks separate courses independently", () => {
    const { recordPracticeAttempt } = useProgressStore.getState();
    recordPracticeAttempt("quantitative-aptitude", {
      score: 10,
      total: 20,
      topicsNeedingReview: [],
    });
    recordPracticeAttempt("logical-analytical-reasoning", {
      score: 15,
      total: 20,
      topicsNeedingReview: [],
    });
    const state = useProgressStore.getState().state;
    expect(state.practiceAttempts["quantitative-aptitude"].bestScore).toBe(10);
    expect(state.practiceAttempts["logical-analytical-reasoning"].bestScore).toBe(15);
  });

  it("persists to localStorage under the active storage key", () => {
    useProgressStore.getState().recordPracticeAttempt("quantitative-aptitude", {
      score: 5,
      total: 10,
      topicsNeedingReview: [],
    });
    const raw = window.localStorage.getItem("visasparkschools:progress");
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!).practiceAttempts["quantitative-aptitude"].bestScore).toBe(5);
  });
});
