import { describe, it, expect } from "vitest";
import {
  nextIntervalDays,
  addDays,
  isDue,
  REVIEW_INTERVALS_DAYS,
} from "@/lib/learning/review-schedule";

describe("nextIntervalDays", () => {
  it("resets to the first interval on 'again', regardless of current interval", () => {
    expect(nextIntervalDays(30, "again")).toBe(REVIEW_INTERVALS_DAYS[0]);
    expect(nextIntervalDays(1, "again")).toBe(REVIEW_INTERVALS_DAYS[0]);
  });

  it("advances to the next interval on 'good'", () => {
    expect(nextIntervalDays(1, "good")).toBe(3);
    expect(nextIntervalDays(3, "good")).toBe(7);
    expect(nextIntervalDays(7, "good")).toBe(14);
    expect(nextIntervalDays(14, "good")).toBe(30);
  });

  it("stays at the last interval once already at the maximum", () => {
    expect(nextIntervalDays(30, "good")).toBe(30);
  });

  it("treats an unrecognized interval (e.g. corrupted or legacy data) as index 0", () => {
    expect(nextIntervalDays(999, "good")).toBe(REVIEW_INTERVALS_DAYS[0]);
  });

  it("'hard' repeats the current interval instead of resetting or advancing (Phase 7)", () => {
    expect(nextIntervalDays(7, "hard")).toBe(7);
    expect(nextIntervalDays(1, "hard")).toBe(1);
    expect(nextIntervalDays(30, "hard")).toBe(30);
  });

  it("'hard' treats an unrecognized interval as index 0, same as 'good' (Phase 7)", () => {
    expect(nextIntervalDays(999, "hard")).toBe(REVIEW_INTERVALS_DAYS[0]);
  });

  it("'easy' skips ahead two steps instead of one (Phase 7)", () => {
    expect(nextIntervalDays(1, "easy")).toBe(7);
    expect(nextIntervalDays(3, "easy")).toBe(14);
  });

  it("'easy' stays capped at the last interval, never overflowing (Phase 7)", () => {
    expect(nextIntervalDays(14, "easy")).toBe(30);
    expect(nextIntervalDays(30, "easy")).toBe(30);
  });

  it("severity ordering holds for every interval: again <= hard <= good <= easy (Phase 7)", () => {
    for (const interval of REVIEW_INTERVALS_DAYS) {
      const again = nextIntervalDays(interval, "again");
      const hard = nextIntervalDays(interval, "hard");
      const good = nextIntervalDays(interval, "good");
      const easy = nextIntervalDays(interval, "easy");
      expect(again).toBeLessThanOrEqual(hard);
      expect(hard).toBeLessThanOrEqual(good);
      expect(good).toBeLessThanOrEqual(easy);
    }
  });
});

describe("addDays", () => {
  it("adds the given number of days to a date", () => {
    const start = new Date("2026-01-01T00:00:00.000Z");
    const result = addDays(start, 5);
    expect(result.toISOString().slice(0, 10)).toBe("2026-01-06");
  });
});

describe("isDue", () => {
  it("is due when the due date is in the past", () => {
    const past = new Date(Date.now() - 1000 * 60 * 60).toISOString();
    expect(isDue(past)).toBe(true);
  });

  it("is not due when the due date is in the future", () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
    expect(isDue(future)).toBe(false);
  });
});
