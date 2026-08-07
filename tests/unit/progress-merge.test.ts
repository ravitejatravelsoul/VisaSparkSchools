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
      firstName: null,
      lastName: null,
      phoneE164: null,
      learnerLevel: null,
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const remote = createEmptyProgress();
    remote.profile = {
      displayName: "Remote Name",
      learningGoal: "Get a job",
      currentRoadmapId: "backend-developer",
      timezone: "America/Chicago",
      firstName: null,
      lastName: null,
      phoneE164: null,
      learnerLevel: null,
      updatedAt: "2026-01-05T00:00:00.000Z",
    };

    const merged = mergeProgress(local, remote);
    expect(merged.profile).toEqual(remote.profile);
  });

  it("merges practice attempts: keeps the best-accuracy score, latest attempt time, and unions topics needing review", () => {
    const local = createEmptyProgress();
    local.practiceAttempts["quantitative-aptitude"] = {
      bestScore: 20,
      bestTotal: 36,
      lastAttemptedAt: "2026-01-01T00:00:00.000Z",
      topicsNeedingReview: ["Percentages"],
    };
    const remote = createEmptyProgress();
    remote.practiceAttempts["quantitative-aptitude"] = {
      bestScore: 30,
      bestTotal: 36,
      lastAttemptedAt: "2026-01-05T00:00:00.000Z",
      topicsNeedingReview: ["Averages"],
    };

    const merged = mergeProgress(local, remote);
    const result = merged.practiceAttempts["quantitative-aptitude"];
    expect(result.bestScore).toBe(30);
    expect(result.bestTotal).toBe(36);
    expect(result.lastAttemptedAt).toBe("2026-01-05T00:00:00.000Z");
    expect(result.topicsNeedingReview).toEqual(expect.arrayContaining(["Percentages", "Averages"]));
  });

  it("merges study plans by plan id, last-write-wins whole-object on updatedAt", () => {
    const local = createEmptyProgress();
    local.studyPlans["plan-1"] = {
      id: "plan-1",
      title: "Old title",
      courseSlugs: ["how-computing-works"],
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
      targetDate: null,
      preferredDaysOfWeek: [1],
      minutesPerSession: 30,
      status: "active",
      schedule: {},
    };
    const remote = createEmptyProgress();
    remote.studyPlans["plan-1"] = {
      ...local.studyPlans["plan-1"],
      title: "New title",
      updatedAt: "2026-01-05T00:00:00.000Z",
    };

    const merged = mergeProgress(local, remote);
    expect(merged.studyPlans["plan-1"].title).toBe("New title");
  });

  it("never drops a study plan that exists on only one side", () => {
    const local = createEmptyProgress();
    local.studyPlans["plan-a"] = {
      id: "plan-a",
      title: "A",
      courseSlugs: [],
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
      targetDate: null,
      preferredDaysOfWeek: [1],
      minutesPerSession: 30,
      status: "active",
      schedule: {},
    };
    const remote = createEmptyProgress();
    remote.studyPlans["plan-b"] = { ...local.studyPlans["plan-a"], id: "plan-b", title: "B" };

    const merged = mergeProgress(local, remote);
    expect(Object.keys(merged.studyPlans).sort()).toEqual(["plan-a", "plan-b"]);
  });

  it("resolves an active-focus-session conflict by keeping whichever started more recently", () => {
    const local = createEmptyProgress();
    local.activeFocusSession = {
      id: "focus-old",
      mode: "untimed",
      startedAt: "2026-01-01T00:00:00.000Z",
      accumulatedSeconds: 0,
      runningSince: "2026-01-01T00:00:00.000Z",
    };
    const remote = createEmptyProgress();
    remote.activeFocusSession = {
      id: "focus-new",
      mode: "untimed",
      startedAt: "2026-01-05T00:00:00.000Z",
      accumulatedSeconds: 0,
      runningSince: "2026-01-05T00:00:00.000Z",
    };

    const merged = mergeProgress(local, remote);
    expect(merged.activeFocusSession?.id).toBe("focus-new");
  });

  it("merges focus minutes by MAX per date, never sum -- staying safe under a repeated merge", () => {
    const local = createEmptyProgress();
    local.focusMinutesByDate = { "2026-08-01": 20 };
    const remote = createEmptyProgress();
    remote.focusMinutesByDate = { "2026-08-01": 35, "2026-08-02": 10 };

    const merged = mergeProgress(local, remote);
    expect(merged.focusMinutesByDate["2026-08-01"]).toBe(35);
    expect(merged.focusMinutesByDate["2026-08-02"]).toBe(10);

    // Re-running the merge with the already-merged result must not inflate further.
    const mergedAgain = mergeProgress(merged, remote);
    expect(mergedAgain.focusMinutesByDate["2026-08-01"]).toBe(35);
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
      firstName: null,
      lastName: null,
      phoneE164: null,
      learnerLevel: null,
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const remote = createEmptyProgress();
    remote.profile = {
      displayName: null,
      learningGoal: null,
      currentRoadmapId: null,
      timezone: null,
      firstName: null,
      lastName: null,
      phoneE164: null,
      learnerLevel: null,
      updatedAt: "2026-01-05T00:00:00.000Z", // newer, but empty
    };

    const merged = mergeProgress(local, remote);
    expect(merged.profile.learningGoal).toBe("Get a job in frontend");
  });

  it("certificates: union by id -- a certificate issued on only one side survives the merge", () => {
    const local = createEmptyProgress();
    local.certificates["course-completion:how-computing-works"] = {
      id: "course-completion:how-computing-works",
      type: "course-completion",
      targetId: "how-computing-works",
      targetTitle: "How Computing & the Web Work",
      displayName: "Ada",
      issuedAt: "2026-08-01T00:00:00.000Z",
      criteriaSnapshot: ["All required lessons in this course are completed."],
      contentVersionRef: "v1",
      verificationCode: "local-code",
    };
    const remote = createEmptyProgress();
    remote.certificates["skill-achievement:python-fundamentals"] = {
      id: "skill-achievement:python-fundamentals",
      type: "skill-achievement",
      targetId: "python-fundamentals",
      targetTitle: "Python Fundamentals",
      displayName: "Ada",
      issuedAt: "2026-08-02T00:00:00.000Z",
      criteriaSnapshot: ["All required lessons in this course are completed."],
      contentVersionRef: "v1",
      verificationCode: "remote-code",
    };

    const merged = mergeProgress(local, remote);
    expect(Object.keys(merged.certificates)).toHaveLength(2);
    expect(merged.certificates["course-completion:how-computing-works"]).toBeDefined();
    expect(merged.certificates["skill-achievement:python-fundamentals"]).toBeDefined();
  });

  it("certificates: the same id issued independently on both sides before ever syncing keeps whichever was issued first, never both and never a coin-flip", () => {
    const id = "course-completion:how-computing-works";
    const earlier = {
      id,
      type: "course-completion" as const,
      targetId: "how-computing-works",
      targetTitle: "How Computing & the Web Work",
      displayName: "Ada",
      issuedAt: "2026-08-01T00:00:00.000Z",
      criteriaSnapshot: ["All required lessons in this course are completed."],
      contentVersionRef: "v1",
      verificationCode: "device-a-code",
    };
    const later = {
      ...earlier,
      issuedAt: "2026-08-05T00:00:00.000Z",
      verificationCode: "device-b-code",
    };

    const local = createEmptyProgress();
    local.certificates[id] = later;
    const remote = createEmptyProgress();
    remote.certificates[id] = earlier;

    const merged = mergeProgress(local, remote);
    expect(Object.keys(merged.certificates)).toHaveLength(1);
    expect(merged.certificates[id].verificationCode).toBe("device-a-code");

    // Re-running the merge with the already-merged result must stay stable (idempotent).
    const mergedAgain = mergeProgress(merged, remote);
    expect(mergedAgain.certificates[id].verificationCode).toBe("device-a-code");
  });
});
