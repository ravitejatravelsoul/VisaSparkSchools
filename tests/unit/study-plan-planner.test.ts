import { describe, it, expect } from "vitest";
import {
  buildSchedule,
  estimateCompletionDate,
  isTargetRealistic,
  rebalanceSchedule,
  scheduledLessonIds,
  parseDateKey,
  toDateKey,
} from "@/lib/study-plan/planner";

const MINUTES = { l1: 20, l2: 20, l3: 20, l4: 20, l5: 20 };

describe("parseDateKey / toDateKey", () => {
  it("round-trips a date key", () => {
    expect(toDateKey(parseDateKey("2026-08-10"))).toBe("2026-08-10");
  });
});

describe("buildSchedule", () => {
  it("is deterministic: the same input always produces the same schedule", () => {
    const input = {
      lessonIds: ["l1", "l2", "l3"],
      startDate: "2026-08-10", // a Monday
      preferredDaysOfWeek: [1, 3, 5],
      minutesPerSession: 30,
    };
    expect(buildSchedule(input, MINUTES)).toEqual(buildSchedule(input, MINUTES));
  });

  it("only schedules on preferred days of the week", () => {
    const schedule = buildSchedule(
      {
        lessonIds: ["l1", "l2"],
        startDate: "2026-08-10", // Monday
        preferredDaysOfWeek: [3], // Wednesday only
        minutesPerSession: 100,
      },
      MINUTES,
    );
    for (const dateKey of Object.keys(schedule)) {
      expect(parseDateKey(dateKey).getUTCDay()).toBe(3);
    }
  });

  it("packs multiple lessons into one day while under the minutes budget", () => {
    const schedule = buildSchedule(
      {
        lessonIds: ["l1", "l2", "l3"],
        startDate: "2026-08-10",
        preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
        minutesPerSession: 45, // fits 2 lessons (40 min) but not 3 (60 min)
      },
      MINUTES,
    );
    const firstDay = Object.keys(schedule).sort()[0];
    expect(schedule[firstDay]).toEqual(["l1", "l2"]);
  });

  it("always places at least one lesson per active day, even if it alone exceeds the budget", () => {
    const schedule = buildSchedule(
      {
        lessonIds: ["l1"],
        startDate: "2026-08-10",
        preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
        minutesPerSession: 5, // l1 alone (20 min) exceeds this
      },
      MINUTES,
    );
    expect(scheduledLessonIds(schedule)).toEqual(["l1"]);
  });

  it("schedules every lesson exactly once, in order", () => {
    const lessonIds = ["l1", "l2", "l3", "l4", "l5"];
    const schedule = buildSchedule(
      { lessonIds, startDate: "2026-08-10", preferredDaysOfWeek: [1], minutesPerSession: 20 },
      MINUTES,
    );
    expect(scheduledLessonIds(schedule)).toEqual(lessonIds);
  });

  it("returns an empty schedule for no lessons", () => {
    expect(
      buildSchedule(
        { lessonIds: [], startDate: "2026-08-10", preferredDaysOfWeek: [1], minutesPerSession: 30 },
        MINUTES,
      ),
    ).toEqual({});
  });

  it("returns an empty schedule when no days of the week are preferred", () => {
    expect(
      buildSchedule(
        {
          lessonIds: ["l1"],
          startDate: "2026-08-10",
          preferredDaysOfWeek: [],
          minutesPerSession: 30,
        },
        MINUTES,
      ),
    ).toEqual({});
  });

  it("treats an unknown lesson duration as 0 minutes rather than crashing", () => {
    const schedule = buildSchedule(
      {
        lessonIds: ["unknown-lesson"],
        startDate: "2026-08-10",
        preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
        minutesPerSession: 30,
      },
      {},
    );
    expect(scheduledLessonIds(schedule)).toEqual(["unknown-lesson"]);
  });

  it("starts scheduling on startDate itself if it's a preferred day", () => {
    const schedule = buildSchedule(
      {
        lessonIds: ["l1"],
        startDate: "2026-08-10", // Monday
        preferredDaysOfWeek: [1],
        minutesPerSession: 30,
      },
      MINUTES,
    );
    expect(Object.keys(schedule)).toEqual(["2026-08-10"]);
  });
});

describe("estimateCompletionDate", () => {
  it("returns null for an empty schedule", () => {
    expect(estimateCompletionDate({})).toBeNull();
  });

  it("returns the latest scheduled date", () => {
    expect(
      estimateCompletionDate({ "2026-08-10": ["l1"], "2026-08-17": ["l2"], "2026-08-12": ["l3"] }),
    ).toBe("2026-08-17");
  });
});

describe("isTargetRealistic", () => {
  it("is always realistic for an open-ended plan (no target)", () => {
    expect(isTargetRealistic("2026-12-31", null)).toBe(true);
  });

  it("is realistic when the schedule is empty (nothing left to do)", () => {
    expect(isTargetRealistic(null, "2026-08-01")).toBe(true);
  });

  it("is realistic when the estimated completion is on or before the target", () => {
    expect(isTargetRealistic("2026-08-10", "2026-08-10")).toBe(true);
    expect(isTargetRealistic("2026-08-05", "2026-08-10")).toBe(true);
  });

  it("is unrealistic when the estimated completion is after the target", () => {
    expect(isTargetRealistic("2026-08-15", "2026-08-10")).toBe(false);
  });
});

describe("rebalanceSchedule", () => {
  const preferredDaysOfWeek = [1, 2, 3, 4, 5, 6, 0]; // every day, to keep math simple

  it("never marks anything complete -- lessonStatus is untouched by rebalancing", () => {
    const schedule = { "2026-08-01": ["l1"] };
    const lessonStatus = { l1: "not-started" as const };
    rebalanceSchedule(schedule, lessonStatus, "2026-08-10", preferredDaysOfWeek, 60, MINUTES);
    expect(lessonStatus.l1).toBe("not-started");
  });

  it("preserves a completed lesson's original historical date", () => {
    const schedule = { "2026-08-01": ["l1"] };
    const lessonStatus = { l1: "completed" as const };
    const result = rebalanceSchedule(
      schedule,
      lessonStatus,
      "2026-08-10",
      preferredDaysOfWeek,
      60,
      MINUTES,
    );
    expect(result["2026-08-01"]).toEqual(["l1"]);
  });

  it("moves an overdue incomplete lesson forward to today or later", () => {
    const schedule = { "2026-08-01": ["l1"] };
    const lessonStatus = { l1: "in-progress" as const };
    const result = rebalanceSchedule(
      schedule,
      lessonStatus,
      "2026-08-10",
      preferredDaysOfWeek,
      60,
      MINUTES,
    );
    expect(result["2026-08-01"]).toBeUndefined();
    expect(scheduledLessonIds(result)).toContain("l1");
    for (const dateKey of Object.keys(result)) {
      expect(dateKey >= "2026-08-10").toBe(true);
    }
  });

  it("leaves a schedule with nothing overdue unchanged", () => {
    const schedule = { "2026-08-15": ["l1"] };
    const lessonStatus = {};
    const result = rebalanceSchedule(
      schedule,
      lessonStatus,
      "2026-08-10",
      preferredDaysOfWeek,
      60,
      MINUTES,
    );
    expect(scheduledLessonIds(result)).toEqual(["l1"]);
  });

  it("combines multiple overdue lessons with already-upcoming ones into one consistent rebuild", () => {
    const schedule = {
      "2026-08-01": ["l1", "l2"], // both overdue, incomplete
      "2026-08-15": ["l3"], // upcoming
    };
    const lessonStatus = {};
    const result = rebalanceSchedule(
      schedule,
      lessonStatus,
      "2026-08-10",
      preferredDaysOfWeek,
      20, // 1 lesson (20 min) per day
      MINUTES,
    );
    expect(scheduledLessonIds(result)).toEqual(["l1", "l2", "l3"]);
    for (const dateKey of Object.keys(result)) {
      expect(dateKey >= "2026-08-10").toBe(true);
    }
  });

  it("is idempotent: rebalancing an already-rebalanced schedule with the same 'today' changes nothing further", () => {
    const schedule = { "2026-08-01": ["l1"] };
    const lessonStatus = {};
    const first = rebalanceSchedule(
      schedule,
      lessonStatus,
      "2026-08-10",
      preferredDaysOfWeek,
      60,
      MINUTES,
    );
    const second = rebalanceSchedule(
      first,
      lessonStatus,
      "2026-08-10",
      preferredDaysOfWeek,
      60,
      MINUTES,
    );
    expect(second).toEqual(first);
  });
});
