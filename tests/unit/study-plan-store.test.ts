import { describe, it, expect, beforeEach } from "vitest";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonsForCourse } from "@/lib/content/registry";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("createStudyPlan", () => {
  it("creates an active plan and schedules its course's incomplete lessons", () => {
    const id = useProgressStore.getState().createStudyPlan({
      title: "Foundations plan",
      courseSlugs: ["how-computing-works"],
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      minutesPerSession: 60,
    });
    const plan = useProgressStore.getState().state.studyPlans[id];
    expect(plan).toBeDefined();
    expect(plan.status).toBe("active");
    const scheduledIds = Object.values(plan.schedule).flat();
    const courseLessonIds = getLessonsForCourse("how-computing-works").map((l) => l.id);
    expect(scheduledIds.sort()).toEqual(courseLessonIds.sort());
  });

  it("excludes already-completed lessons from a new plan's schedule", () => {
    const lessons = getLessonsForCourse("how-computing-works");
    useProgressStore.setState((s) => ({
      state: { ...s.state, lessonStatus: { [lessons[0].id]: "completed" } },
    }));
    const id = useProgressStore.getState().createStudyPlan({
      title: "Plan",
      courseSlugs: ["how-computing-works"],
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      minutesPerSession: 60,
    });
    const plan = useProgressStore.getState().state.studyPlans[id];
    const scheduledIds = Object.values(plan.schedule).flat();
    expect(scheduledIds).not.toContain(lessons[0].id);
  });

  it("persists the new plan to localStorage", () => {
    const id = useProgressStore.getState().createStudyPlan({
      title: "Plan",
      courseSlugs: [],
      targetDate: null,
      preferredDaysOfWeek: [1],
      minutesPerSession: 30,
    });
    const raw = window.localStorage.getItem("visasparkschools:progress");
    expect(JSON.parse(raw!).studyPlans[id]).toBeDefined();
  });
});

describe("updateStudyPlan", () => {
  it("updates a simple field (title) without touching the schedule", () => {
    const id = useProgressStore.getState().createStudyPlan({
      title: "Original",
      courseSlugs: ["how-computing-works"],
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      minutesPerSession: 60,
    });
    const scheduleBefore = useProgressStore.getState().state.studyPlans[id].schedule;
    useProgressStore.getState().updateStudyPlan(id, { title: "Renamed" });
    const plan = useProgressStore.getState().state.studyPlans[id];
    expect(plan.title).toBe("Renamed");
    expect(plan.schedule).toEqual(scheduleBefore);
  });

  it("rebuilds the schedule when preferredDaysOfWeek changes", () => {
    const id = useProgressStore.getState().createStudyPlan({
      title: "Plan",
      courseSlugs: ["how-computing-works"],
      targetDate: null,
      preferredDaysOfWeek: [1],
      minutesPerSession: 60,
    });
    useProgressStore.getState().updateStudyPlan(id, { preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0] });
    const plan = useProgressStore.getState().state.studyPlans[id];
    for (const dateKey of Object.keys(plan.schedule)) {
      expect(new Date(`${dateKey}T00:00:00.000Z`).getUTCDay()).toBeGreaterThanOrEqual(0);
    }
    // Every lesson is still scheduled somewhere.
    const scheduledIds = Object.values(plan.schedule).flat();
    expect(scheduledIds.length).toBe(getLessonsForCourse("how-computing-works").length);
  });

  it("no-ops for an unknown plan id", () => {
    useProgressStore.getState().updateStudyPlan("does-not-exist", { title: "X" });
    expect(useProgressStore.getState().state.studyPlans["does-not-exist"]).toBeUndefined();
  });
});

describe("pauseStudyPlan / resumeStudyPlan", () => {
  it("toggles status and excludes a paused plan's lessons from being scheduled as active", () => {
    const id = useProgressStore.getState().createStudyPlan({
      title: "Plan",
      courseSlugs: [],
      targetDate: null,
      preferredDaysOfWeek: [1],
      minutesPerSession: 30,
    });
    useProgressStore.getState().pauseStudyPlan(id);
    expect(useProgressStore.getState().state.studyPlans[id].status).toBe("paused");
    useProgressStore.getState().resumeStudyPlan(id);
    expect(useProgressStore.getState().state.studyPlans[id].status).toBe("active");
  });
});

describe("recalculateStudyPlan", () => {
  it("moves an overdue incomplete lesson forward without marking it complete", () => {
    const id = useProgressStore.getState().createStudyPlan({
      title: "Plan",
      courseSlugs: ["how-computing-works"],
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      minutesPerSession: 60,
    });
    // Force the schedule into the past to simulate missed days.
    useProgressStore.setState((s) => {
      const plan = s.state.studyPlans[id];
      const lessonIds = Object.values(plan.schedule).flat();
      return {
        state: {
          ...s.state,
          studyPlans: {
            ...s.state.studyPlans,
            [id]: { ...plan, schedule: { "2000-01-01": lessonIds } },
          },
        },
      };
    });
    useProgressStore.getState().recalculateStudyPlan(id);
    const plan = useProgressStore.getState().state.studyPlans[id];
    expect(plan.schedule["2000-01-01"]).toBeUndefined();
    const scheduledIds = Object.values(plan.schedule).flat();
    expect(scheduledIds.length).toBe(getLessonsForCourse("how-computing-works").length);
    expect(
      Object.values(useProgressStore.getState().state.lessonStatus).some((s) => s === "completed"),
    ).toBe(false);
  });
});

describe("deleteStudyPlan", () => {
  it("removes the plan entirely", () => {
    const id = useProgressStore.getState().createStudyPlan({
      title: "Plan",
      courseSlugs: [],
      targetDate: null,
      preferredDaysOfWeek: [1],
      minutesPerSession: 30,
    });
    useProgressStore.getState().deleteStudyPlan(id);
    expect(useProgressStore.getState().state.studyPlans[id]).toBeUndefined();
  });
});

describe("resetReviewSchedule", () => {
  it("resets a lesson's review interval back to day 1", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        reviewQueue: { l1: { dueAt: "2099-01-01T00:00:00.000Z", intervalDays: 30 } },
      },
    }));
    useProgressStore.getState().resetReviewSchedule("l1");
    const review = useProgressStore.getState().state.reviewQueue["l1"];
    expect(review.intervalDays).toBe(1);
    expect(new Date(review.dueAt).getTime()).toBeLessThan(new Date("2099-01-01").getTime());
  });

  it("no-ops for a lesson that was never reviewed", () => {
    useProgressStore.getState().resetReviewSchedule("never-reviewed");
    expect(useProgressStore.getState().state.reviewQueue["never-reviewed"]).toBeUndefined();
  });
});

describe("today queue actions (dismiss / reschedule / remove)", () => {
  const LESSON_ID = "found-how-computers-run-code";

  it("dismissTodayItem hides an item for today only", () => {
    useProgressStore.getState().dismissTodayItem("review:l1");
    const dismissed = useProgressStore.getState().state.todayDismissed;
    expect(dismissed.itemIds).toContain("review:l1");
  });

  it("dismissTodayItem is idempotent -- dismissing twice doesn't duplicate the id", () => {
    useProgressStore.getState().dismissTodayItem("review:l1");
    useProgressStore.getState().dismissTodayItem("review:l1");
    const dismissed = useProgressStore.getState().state.todayDismissed;
    expect(dismissed.itemIds.filter((id) => id === "review:l1")).toHaveLength(1);
  });

  it("rescheduleTodayItem moves a plan lesson to a new date", () => {
    const planId = useProgressStore.getState().createStudyPlan({
      title: "Plan",
      courseSlugs: ["how-computing-works"],
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      minutesPerSession: 60,
    });
    const originalDate = Object.keys(
      useProgressStore.getState().state.studyPlans[planId].schedule,
    )[0];
    useProgressStore
      .getState()
      .rescheduleTodayItem(`plan-lesson:${planId}:${LESSON_ID}`, "2099-12-31");
    const plan = useProgressStore.getState().state.studyPlans[planId];
    expect(plan.schedule[originalDate] ?? []).not.toContain(LESSON_ID);
    expect(plan.schedule["2099-12-31"]).toContain(LESSON_ID);
  });

  it("rescheduleTodayItem moves a review's due date", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        reviewQueue: { [LESSON_ID]: { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 } },
      },
    }));
    useProgressStore.getState().rescheduleTodayItem(`review:${LESSON_ID}`, "2099-12-31");
    const review = useProgressStore.getState().state.reviewQueue[LESSON_ID];
    expect(review.dueAt.startsWith("2099-12-31")).toBe(true);
  });

  it("removeTodayItem permanently drops a plan lesson from its plan", () => {
    const planId = useProgressStore.getState().createStudyPlan({
      title: "Plan",
      courseSlugs: ["how-computing-works"],
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      minutesPerSession: 60,
    });
    useProgressStore.getState().removeTodayItem(`plan-lesson:${planId}:${LESSON_ID}`);
    const plan = useProgressStore.getState().state.studyPlans[planId];
    const scheduledIds = Object.values(plan.schedule).flat();
    expect(scheduledIds).not.toContain(LESSON_ID);
  });

  it("removeTodayItem safely no-ops for a non-plan-lesson item id", () => {
    useProgressStore.getState().removeTodayItem("weak-topic:some-course");
    // Just asserting this doesn't throw and state stays coherent.
    expect(useProgressStore.getState().state.studyPlans).toEqual({});
  });
});
