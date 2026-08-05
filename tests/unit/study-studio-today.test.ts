import { describe, it, expect } from "vitest";
import { buildTodayQueue } from "@/lib/study-studio/today";
import { createEmptyProgress } from "@/lib/learning/types";

const LESSON_ID = "found-how-computers-run-code"; // course: how-computing-works
const LESSON_HREF = "/courses/how-computing-works/how-computers-run-code";
const TODAY = "2026-08-10";

describe("buildTodayQueue", () => {
  it("returns nothing but a fallback recommendation when there is no progress at all", () => {
    const state = createEmptyProgress();
    const items = buildTodayQueue(state, TODAY);
    expect(items.every((i) => i.kind === "recommendation")).toBe(true);
  });

  it("surfaces a study-plan lesson scheduled for today", () => {
    const state = createEmptyProgress();
    state.studyPlans["plan-1"] = {
      id: "plan-1",
      title: "My Plan",
      courseSlugs: ["how-computing-works"],
      createdAt: "2026-08-01T00:00:00.000Z",
      updatedAt: "2026-08-01T00:00:00.000Z",
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5],
      minutesPerSession: 30,
      status: "active",
      schedule: { [TODAY]: [LESSON_ID] },
    };
    const items = buildTodayQueue(state, TODAY);
    const planItem = items.find((i) => i.kind === "plan-lesson");
    expect(planItem).toBeDefined();
    expect(planItem!.href).toBe(LESSON_HREF);
    expect(planItem!.id).toBe(`plan-lesson:plan-1:${LESSON_ID}`);
  });

  it("never surfaces a plan lesson already marked completed", () => {
    const state = createEmptyProgress();
    state.lessonStatus[LESSON_ID] = "completed";
    state.studyPlans["plan-1"] = {
      id: "plan-1",
      title: "My Plan",
      courseSlugs: ["how-computing-works"],
      createdAt: "2026-08-01T00:00:00.000Z",
      updatedAt: "2026-08-01T00:00:00.000Z",
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5],
      minutesPerSession: 30,
      status: "active",
      schedule: { [TODAY]: [LESSON_ID] },
    };
    const items = buildTodayQueue(state, TODAY);
    expect(items.some((i) => i.kind === "plan-lesson")).toBe(false);
  });

  it("never surfaces lessons from a paused plan", () => {
    const state = createEmptyProgress();
    state.studyPlans["plan-1"] = {
      id: "plan-1",
      title: "My Plan",
      courseSlugs: ["how-computing-works"],
      createdAt: "2026-08-01T00:00:00.000Z",
      updatedAt: "2026-08-01T00:00:00.000Z",
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5],
      minutesPerSession: 30,
      status: "paused",
      schedule: { [TODAY]: [LESSON_ID] },
    };
    const items = buildTodayQueue(state, TODAY);
    expect(items.some((i) => i.kind === "plan-lesson")).toBe(false);
  });

  it("surfaces a due review", () => {
    const state = createEmptyProgress();
    state.reviewQueue[LESSON_ID] = { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 };
    const items = buildTodayQueue(state, TODAY);
    const reviewItem = items.find((i) => i.kind === "review");
    expect(reviewItem).toBeDefined();
    expect(reviewItem!.id).toBe(`review:${LESSON_ID}`);
  });

  it("never surfaces a review that isn't due yet", () => {
    const state = createEmptyProgress();
    state.reviewQueue[LESSON_ID] = { dueAt: "2099-01-01T00:00:00.000Z", intervalDays: 30 };
    const items = buildTodayQueue(state, TODAY);
    expect(items.some((i) => i.kind === "review")).toBe(false);
  });

  it("surfaces a weak-topic item for a course with topics needing review", () => {
    const state = createEmptyProgress();
    state.practiceAttempts["quantitative-aptitude"] = {
      bestScore: 20,
      bestTotal: 36,
      lastAttemptedAt: "2026-08-05T00:00:00.000Z",
      topicsNeedingReview: ["Percentages and Percentage Change"],
    };
    const items = buildTodayQueue(state, TODAY);
    const weakItem = items.find((i) => i.kind === "weak-topic");
    expect(weakItem).toBeDefined();
    expect(weakItem!.href).toBe("/courses/quantitative-aptitude/practice");
  });

  it("falls back to the dashboard recommendation only when nothing else is queued", () => {
    const state = createEmptyProgress();
    state.studyPlans["plan-1"] = {
      id: "plan-1",
      title: "My Plan",
      courseSlugs: ["how-computing-works"],
      createdAt: "2026-08-01T00:00:00.000Z",
      updatedAt: "2026-08-01T00:00:00.000Z",
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5],
      minutesPerSession: 30,
      status: "active",
      schedule: { [TODAY]: [LESSON_ID] },
    };
    const items = buildTodayQueue(state, TODAY);
    expect(items.some((i) => i.kind === "recommendation")).toBe(false);
  });

  it("filters out an item dismissed today, but not one dismissed on a different day", () => {
    const state = createEmptyProgress();
    state.reviewQueue[LESSON_ID] = { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 };
    const itemId = `review:${LESSON_ID}`;

    state.todayDismissed = { date: TODAY, itemIds: [itemId] };
    expect(buildTodayQueue(state, TODAY).some((i) => i.id === itemId)).toBe(false);

    state.todayDismissed = { date: "2026-08-09", itemIds: [itemId] };
    expect(buildTodayQueue(state, TODAY).some((i) => i.id === itemId)).toBe(true);
  });

  it("is deterministic: the same state always produces the same queue", () => {
    const state = createEmptyProgress();
    state.reviewQueue[LESSON_ID] = { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 };
    expect(buildTodayQueue(state, TODAY)).toEqual(buildTodayQueue(state, TODAY));
  });
});
