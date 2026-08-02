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

  it("keeps the more recently edited note when both sides wrote the same lesson identically", () => {
    const local = createEmptyProgress();
    local.notes["lesson-a"] = { text: "same note", updatedAt: "2026-01-01T00:00:00.000Z" };
    const remote = createEmptyProgress();
    remote.notes["lesson-a"] = { text: "same note", updatedAt: "2026-01-02T00:00:00.000Z" };

    const merged = mergeProgress(local, remote);
    expect(merged.notes["lesson-a"]).toEqual({
      text: "same note",
      updatedAt: "2026-01-02T00:00:00.000Z",
    });
    expect(merged.notes["lesson-a"].conflict).toBeUndefined();
  });

  it("never silently discards a note: a genuine conflict keeps the newer text but preserves the older one", () => {
    const local = createEmptyProgress();
    local.notes["lesson-a"] = { text: "local note", updatedAt: "2026-01-02T00:00:00.000Z" };
    const remote = createEmptyProgress();
    remote.notes["lesson-a"] = { text: "remote note", updatedAt: "2026-01-01T00:00:00.000Z" };

    const merged = mergeProgress(local, remote);
    expect(merged.notes["lesson-a"].text).toBe("local note");
    expect(merged.notes["lesson-a"].conflict).toEqual({
      text: "remote note",
      updatedAt: "2026-01-01T00:00:00.000Z",
    });
  });

  it("keeps the higher streak between local and remote", () => {
    const local = createEmptyProgress();
    local.streak = { current: 3, lastActiveDate: "2026-01-05" };
    const remote = createEmptyProgress();
    remote.streak = { current: 10, lastActiveDate: "2026-01-01" };

    const merged = mergeProgress(local, remote);
    expect(merged.streak.current).toBe(10);
  });

  it("merges enrollments: earliest enrolledAt, latest lastAccessed wins", () => {
    const local = createEmptyProgress();
    local.enrollments["python-fundamentals"] = {
      enrolledAt: "2026-01-05T00:00:00.000Z",
      lastAccessedLessonId: "py-lists",
      lastAccessedAt: "2026-01-10T00:00:00.000Z",
    };
    const remote = createEmptyProgress();
    remote.enrollments["python-fundamentals"] = {
      enrolledAt: "2026-01-01T00:00:00.000Z",
      lastAccessedLessonId: "py-variables",
      lastAccessedAt: "2026-01-03T00:00:00.000Z",
    };

    const merged = mergeProgress(local, remote);
    expect(merged.enrollments["python-fundamentals"]).toEqual({
      enrolledAt: "2026-01-01T00:00:00.000Z",
      lastAccessedLessonId: "py-lists",
      lastAccessedAt: "2026-01-10T00:00:00.000Z",
    });
  });

  it("merges roadmap progress: unions completed steps, keeps earliest start and latest access", () => {
    const local = createEmptyProgress();
    local.roadmapProgress["backend-developer"] = {
      startedAt: "2026-01-05T00:00:00.000Z",
      lastAccessedAt: "2026-01-10T00:00:00.000Z",
      completedStepIds: ["step-1"],
    };
    const remote = createEmptyProgress();
    remote.roadmapProgress["backend-developer"] = {
      startedAt: "2026-01-01T00:00:00.000Z",
      lastAccessedAt: "2026-01-02T00:00:00.000Z",
      completedStepIds: ["step-2"],
    };

    const merged = mergeProgress(local, remote);
    expect(merged.roadmapProgress["backend-developer"]).toEqual({
      startedAt: "2026-01-01T00:00:00.000Z",
      lastAccessedAt: "2026-01-10T00:00:00.000Z",
      completedStepIds: expect.arrayContaining(["step-1", "step-2"]),
    });
  });

  it("merges activity by id, keeping the earliest occurrence and capping at 50", () => {
    const local = createEmptyProgress();
    local.activity = [
      {
        id: "lesson-completed:a",
        type: "lesson-completed",
        refId: "a",
        title: "A",
        at: "2026-01-02T00:00:00.000Z",
      },
    ];
    const remote = createEmptyProgress();
    remote.activity = [
      {
        id: "lesson-completed:a",
        type: "lesson-completed",
        refId: "a",
        title: "A",
        at: "2026-01-01T00:00:00.000Z",
      },
    ];

    const merged = mergeProgress(local, remote);
    expect(merged.activity).toHaveLength(1);
    expect(merged.activity[0].at).toBe("2026-01-01T00:00:00.000Z");
  });

  it("merges profile preferences as a whole using the most recent updatedAt (never stitches fields)", () => {
    const local = createEmptyProgress();
    local.profile = {
      displayName: "Local Name",
      learningGoal: null,
      currentRoadmapId: null,
      timezone: null,
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const remote = createEmptyProgress();
    remote.profile = {
      displayName: "Remote Name",
      learningGoal: "Get a job",
      currentRoadmapId: "backend-developer",
      timezone: "America/Chicago",
      updatedAt: "2026-01-05T00:00:00.000Z",
    };

    const merged = mergeProgress(local, remote);
    expect(merged.profile).toEqual(remote.profile);
  });

  it("never lets an empty auto-created remote profile row outrank real local preferences, even if it's timestamped later", () => {
    // Reproduces: a guest sets a learning goal at T1, then signs up at T2 >
    // T1. Supabase's handle_new_user trigger creates an empty profiles row
    // stamped ~T2. A naive updatedAt comparison would pick that empty row
    // and silently erase the guest's preference.
    const local = createEmptyProgress();
    local.profile = {
      displayName: null,
      learningGoal: "Get a job in frontend",
      currentRoadmapId: null,
      timezone: null,
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const remote = createEmptyProgress();
    remote.profile = {
      displayName: null,
      learningGoal: null,
      currentRoadmapId: null,
      timezone: null,
      updatedAt: "2026-01-05T00:00:00.000Z", // newer, but empty
    };

    const merged = mergeProgress(local, remote);
    expect(merged.profile.learningGoal).toBe("Get a job in frontend");
  });
});
