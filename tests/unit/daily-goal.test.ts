import { describe, it, expect } from "vitest";
import { getDailyGoalStatus, localDateKey } from "@/lib/learning/daily-goal";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonById } from "@/lib/content/registry";

const LESSON_ID = "found-how-computers-run-code"; // real lesson, real estimatedMinutes

describe("getDailyGoalStatus", () => {
  it("is unmet with zero minutes logged today", () => {
    const state = createEmptyProgress();
    const status = getDailyGoalStatus(state, new Date("2026-01-15T12:00:00.000Z"), "UTC");
    expect(status.minutesToday).toBe(0);
    expect(status.met).toBe(false);
    expect(status.targetMinutes).toBe(state.dailyGoalMinutes);
  });

  it("sums estimatedMinutes for lessons actually completed today, from real activity data", () => {
    const state = createEmptyProgress();
    const lesson = getLessonById(LESSON_ID)!;
    state.activity.push({
      id: `lesson-completed:${LESSON_ID}`,
      type: "lesson-completed",
      refId: LESSON_ID,
      title: lesson.title,
      at: "2026-01-15T10:00:00.000Z",
    });
    const status = getDailyGoalStatus(state, new Date("2026-01-15T23:00:00.000Z"), "UTC");
    expect(status.minutesToday).toBe(lesson.estimatedMinutes);
  });

  it("does not count a completion from a different day", () => {
    const state = createEmptyProgress();
    state.activity.push({
      id: `lesson-completed:${LESSON_ID}`,
      type: "lesson-completed",
      refId: LESSON_ID,
      title: "x",
      at: "2026-01-14T23:59:00.000Z",
    });
    const status = getDailyGoalStatus(state, new Date("2026-01-15T00:01:00.000Z"), "UTC");
    expect(status.minutesToday).toBe(0);
  });

  it("is timezone-safe: the same instant can fall on different local dates", () => {
    // 2026-01-15T23:30 UTC is still 2026-01-15 in UTC but already 2026-01-16 in a UTC+1 zone.
    const utcKey = localDateKey(new Date("2026-01-15T23:30:00.000Z"), "UTC");
    const parisKey = localDateKey(new Date("2026-01-15T23:30:00.000Z"), "Europe/Paris");
    expect(utcKey).toBe("2026-01-15");
    expect(parisKey).toBe("2026-01-16");
  });

  it("missing a day never erases history: past completions stay in the activity log", () => {
    const state = createEmptyProgress();
    state.activity.push({
      id: `lesson-completed:${LESSON_ID}`,
      type: "lesson-completed",
      refId: LESSON_ID,
      title: "x",
      at: "2026-01-10T00:00:00.000Z",
    });
    // Three days with no activity in between -- goal status for "today" is
    // simply unmet, not retroactively deleting the earlier completion.
    getDailyGoalStatus(state, new Date("2026-01-13T00:00:00.000Z"), "UTC");
    expect(state.activity).toHaveLength(1);
    expect(state.lessonStatus).toEqual({});
  });

  it("falls back to UTC for an invalid/unsupported timezone instead of throwing", () => {
    expect(() => localDateKey(new Date(), "Not/A_Real_Zone")).not.toThrow();
  });

  it("does not throw for a malformed/invalid timestamp -- returns a sentinel instead", () => {
    const invalid = new Date("not-a-real-timestamp");
    expect(invalid.getTime()).toBeNaN();
    expect(() => localDateKey(invalid, "UTC")).not.toThrow();
    expect(localDateKey(invalid, "UTC")).toBe("invalid-date");
  });

  it("a malformed activity timestamp is safely ignored, not counted and not crashing the goal calculation", () => {
    const state = createEmptyProgress();
    state.activity.push({
      id: "lesson-completed:bad",
      type: "lesson-completed",
      refId: LESSON_ID,
      title: "x",
      at: "not-a-real-timestamp",
    });
    expect(() =>
      getDailyGoalStatus(state, new Date("2026-01-15T12:00:00.000Z"), "UTC"),
    ).not.toThrow();
    expect(
      getDailyGoalStatus(state, new Date("2026-01-15T12:00:00.000Z"), "UTC").minutesToday,
    ).toBe(0);
  });

  it("correctly separates days across a US DST transition (2026-03-08, spring forward)", () => {
    // 2026-03-08 07:30 UTC is 2026-03-08 01:30 in America/Chicago (still CST,
    // UTC-6, before the 2am local jump to CDT) -- and 2026-03-08 07:59 UTC is
    // still 01:59 local, one minute before the transition. Both must report
    // the same local calendar day despite the DST boundary sitting between
    // other nearby instants.
    const beforeJump = localDateKey(new Date("2026-03-08T07:30:00.000Z"), "America/Chicago");
    const rightBeforeJump = localDateKey(new Date("2026-03-08T07:59:00.000Z"), "America/Chicago");
    expect(beforeJump).toBe("2026-03-08");
    expect(rightBeforeJump).toBe("2026-03-08");

    // The following UTC day is still the following local day -- no drift
    // introduced by the DST transition in between.
    const nextDay = localDateKey(new Date("2026-03-09T07:30:00.000Z"), "America/Chicago");
    expect(nextDay).toBe("2026-03-09");
  });
});
