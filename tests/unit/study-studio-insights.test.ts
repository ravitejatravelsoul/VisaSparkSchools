import { describe, it, expect } from "vitest";
import { buildInsights } from "@/lib/study-studio/insights";
import { createEmptyProgress } from "@/lib/learning/types";
import { localDateKey } from "@/lib/learning/daily-goal";

const NOW = new Date("2026-08-10T12:00:00.000Z");
// range.endKey/startKey are computed internally via localDateKey (local
// timezone, not UTC) -- derive the expected keys the same way instead of
// hardcoding UTC-derived strings, so this test is correct on any machine.
// Mirrors buildInsights' own startDate computation (setDate, not ms
// subtraction) so this stays correct across DST boundaries too.
const START_DATE = new Date(NOW.getTime());
START_DATE.setDate(START_DATE.getDate() - 6);
const END_KEY = localDateKey(NOW, null);
const START_KEY = localDateKey(START_DATE, null);

describe("buildInsights", () => {
  it("reports zero/empty for a learner with no data, and distinguishes that from having used a feature", () => {
    const state = createEmptyProgress();
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.lessonsCompleted).toBe(0);
    expect(insights.activeStudyMinutes).toBe(0);
    expect(insights.hasAnyFocusHistory).toBe(false);
    expect(insights.hasActivePlan).toBe(false);
    expect(insights.dueReviewsNow).toBe(0);
    expect(insights.weakTopics).toEqual([]);
  });

  it("counts lesson-completed activity events within range, not outside it", () => {
    const state = createEmptyProgress();
    state.activity = [
      {
        id: "a",
        type: "lesson-completed",
        refId: "l1",
        title: "L1",
        at: "2026-08-09T00:00:00.000Z",
      },
      {
        id: "b",
        type: "lesson-completed",
        refId: "l2",
        title: "L2",
        at: "2026-07-01T00:00:00.000Z",
      },
      { id: "c", type: "bookmark-added", refId: "l3", title: "L3", at: "2026-08-09T00:00:00.000Z" },
    ];
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.lessonsCompleted).toBe(1);
  });

  it("sums focus minutes only within range, and reports hasAnyFocusHistory once any exists", () => {
    const state = createEmptyProgress();
    state.focusMinutesByDate = { "2026-08-09": 20, "2026-08-08": 10, "2026-01-01": 999 };
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.activeStudyMinutes).toBe(30);
    expect(insights.hasAnyFocusHistory).toBe(true);
  });

  it("reports zero active study minutes but hasAnyFocusHistory true when history exists outside the range", () => {
    const state = createEmptyProgress();
    state.focusMinutesByDate = { "2026-01-01": 45 };
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.activeStudyMinutes).toBe(0);
    expect(insights.hasAnyFocusHistory).toBe(true);
  });

  it("counts planned vs completed lessons from active plan schedules within range", () => {
    const state = createEmptyProgress();
    state.lessonStatus["l1"] = "completed";
    state.studyPlans["p1"] = {
      id: "p1",
      title: "Plan",
      courseSlugs: [],
      createdAt: NOW.toISOString(),
      updatedAt: NOW.toISOString(),
      targetDate: null,
      preferredDaysOfWeek: [1],
      minutesPerSession: 30,
      status: "active",
      schedule: { "2026-08-09": ["l1", "l2"], "2026-01-01": ["l3"] },
    };
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.plannedLessons).toBe(2);
    expect(insights.completedPlannedLessons).toBe(1);
    expect(insights.hasActivePlan).toBe(true);
  });

  it("never counts a paused plan's schedule toward hasActivePlan", () => {
    const state = createEmptyProgress();
    state.studyPlans["p1"] = {
      id: "p1",
      title: "Plan",
      courseSlugs: [],
      createdAt: NOW.toISOString(),
      updatedAt: NOW.toISOString(),
      targetDate: null,
      preferredDaysOfWeek: [1],
      minutesPerSession: 30,
      status: "paused",
      schedule: {},
    };
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.hasActivePlan).toBe(false);
  });

  it("reports due reviews as a live snapshot regardless of range", () => {
    const state = createEmptyProgress();
    state.reviewQueue["l1"] = { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 };
    state.reviewQueue["l2"] = { dueAt: "2099-01-01T00:00:00.000Z", intervalDays: 30 };
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.dueReviewsNow).toBe(1);
  });

  it("surfaces weak topics per course", () => {
    const state = createEmptyProgress();
    state.practiceAttempts["quantitative-aptitude"] = {
      bestScore: 10,
      bestTotal: 36,
      lastAttemptedAt: NOW.toISOString(),
      topicsNeedingReview: ["Percentages and Percentage Change"],
    };
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.weakTopics).toHaveLength(1);
    expect(insights.weakTopics[0].courseSlug).toBe("quantitative-aptitude");
  });

  it("counts courses practiced within range by lastAttemptedAt", () => {
    const state = createEmptyProgress();
    state.practiceAttempts["quantitative-aptitude"] = {
      bestScore: 30,
      bestTotal: 36,
      lastAttemptedAt: "2026-08-09T00:00:00.000Z",
      topicsNeedingReview: [],
    };
    state.practiceAttempts["logical-analytical-reasoning"] = {
      bestScore: 30,
      bestTotal: 36,
      lastAttemptedAt: "2026-01-01T00:00:00.000Z",
      topicsNeedingReview: [],
    };
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.coursesPracticedInRange).toBe(1);
  });

  it("is deterministic: the same inputs always produce the same result", () => {
    const state = createEmptyProgress();
    expect(buildInsights(state, NOW, null, 7)).toEqual(buildInsights(state, NOW, null, 7));
  });

  it("range keys are inclusive and span exactly rangeDays", () => {
    const state = createEmptyProgress();
    const insights = buildInsights(state, NOW, null, 7);
    expect(insights.range.endKey).toBe(END_KEY);
    expect(insights.range.startKey).toBe(START_KEY);
  });
});
