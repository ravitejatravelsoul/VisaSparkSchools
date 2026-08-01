import { describe, it, expect } from "vitest";
import { mergeProgress } from "@/lib/learning/storage";
import { createEmptyProgress } from "@/lib/learning/types";

describe("mergeProgress (guest -> account merge)", () => {
  it("keeps the more advanced lesson status per lesson, from either side", () => {
    const local = createEmptyProgress();
    local.lessonStatus["lesson-a"] = "completed";
    local.lessonStatus["lesson-b"] = "in-progress";

    const remote = createEmptyProgress();
    remote.lessonStatus["lesson-a"] = "in-progress";
    remote.lessonStatus["lesson-b"] = "completed";
    remote.lessonStatus["lesson-c"] = "not-started";

    const merged = mergeProgress(local, remote);
    expect(merged.lessonStatus["lesson-a"]).toBe("completed");
    expect(merged.lessonStatus["lesson-b"]).toBe("completed");
    expect(merged.lessonStatus["lesson-c"]).toBe("not-started");
  });

  it("never discards a bookmark that exists on only one side", () => {
    const local = createEmptyProgress();
    local.bookmarks = ["lesson-a"];
    const remote = createEmptyProgress();
    remote.bookmarks = ["lesson-b"];

    const merged = mergeProgress(local, remote);
    expect(merged.bookmarks).toEqual(expect.arrayContaining(["lesson-a", "lesson-b"]));
    expect(merged.bookmarks).toHaveLength(2);
  });

  it("takes the maximum exercise attempts and OR's completion across both sides", () => {
    const local = createEmptyProgress();
    local.exerciseAttempts["ex-1"] = { attempts: 2, completed: false, hintsUsed: 1 };
    const remote = createEmptyProgress();
    remote.exerciseAttempts["ex-1"] = { attempts: 5, completed: true, hintsUsed: 0 };

    const merged = mergeProgress(local, remote);
    expect(merged.exerciseAttempts["ex-1"]).toEqual({ attempts: 5, completed: true, hintsUsed: 1 });
  });

  it("keeps the better quiz result (by accuracy) between local and remote", () => {
    const local = createEmptyProgress();
    local.quizResults["lesson-a"] = { correct: 1, total: 4, lastAttemptAt: "2026-01-01" };
    const remote = createEmptyProgress();
    remote.quizResults["lesson-a"] = { correct: 4, total: 4, lastAttemptAt: "2026-01-02" };

    const merged = mergeProgress(local, remote);
    expect(merged.quizResults["lesson-a"].correct).toBe(4);
  });

  it("keeps the earlier (soonest) review due date between local and remote", () => {
    const local = createEmptyProgress();
    local.reviewQueue["lesson-a"] = { dueAt: "2026-03-01T00:00:00.000Z", intervalDays: 7 };
    const remote = createEmptyProgress();
    remote.reviewQueue["lesson-a"] = { dueAt: "2026-02-01T00:00:00.000Z", intervalDays: 3 };

    const merged = mergeProgress(local, remote);
    expect(merged.reviewQueue["lesson-a"].dueAt).toBe("2026-02-01T00:00:00.000Z");
  });

  it("prefers local notes when both sides have a note for the same lesson", () => {
    const local = createEmptyProgress();
    local.notes["lesson-a"] = "local note";
    const remote = createEmptyProgress();
    remote.notes["lesson-a"] = "remote note";

    const merged = mergeProgress(local, remote);
    expect(merged.notes["lesson-a"]).toBe("local note");
  });

  it("keeps the higher streak between local and remote", () => {
    const local = createEmptyProgress();
    local.streak = { current: 3, lastActiveDate: "2026-01-05" };
    const remote = createEmptyProgress();
    remote.streak = { current: 10, lastActiveDate: "2026-01-01" };

    const merged = mergeProgress(local, remote);
    expect(merged.streak.current).toBe(10);
  });
});
