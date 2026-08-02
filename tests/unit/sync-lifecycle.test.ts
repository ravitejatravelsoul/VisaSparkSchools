import { describe, it, expect } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import { syncGuestToAccount } from "@/lib/sync/lifecycle";
import { pullProgress } from "@/lib/sync/pull";
import { FakeSupabase } from "./helpers/fake-supabase";
import { createEmptyProgress } from "@/lib/learning/types";

function client(fake: FakeSupabase) {
  return fake as unknown as SupabaseClient<Database>;
}

const USER_ID = "user-1";

describe("syncGuestToAccount (guest -> account sync lifecycle)", () => {
  it("round-trips a full guest state through push then pull with no data loss", async () => {
    const fake = new FakeSupabase();
    const guest = createEmptyProgress();
    guest.lessonStatus["lesson-a"] = "completed";
    guest.lessonStatus["lesson-b"] = "in-progress";
    guest.bookmarks = ["lesson-a"];
    guest.notes["lesson-a"] = { text: "my note", updatedAt: "2026-01-01T00:00:00.000Z" };
    guest.enrollments["python-fundamentals"] = { enrolledAt: "2026-01-01T00:00:00.000Z" };
    guest.roadmapProgress["some-path"] = {
      startedAt: "2026-01-01T00:00:00.000Z",
      lastAccessedAt: "2026-01-01T00:00:00.000Z",
      completedStepIds: ["s1"],
    };
    guest.projectProgress["some-project"] = {
      startedAt: "2026-01-01T00:00:00.000Z",
      completedMilestoneIds: ["m1"],
    };
    guest.activity = [
      {
        id: "lesson-completed:lesson-a",
        type: "lesson-completed",
        refId: "lesson-a",
        title: "Lesson A",
        at: "2026-01-01T00:00:00.000Z",
      },
    ];
    guest.profile = {
      displayName: "Ravi",
      learningGoal: "Get a job",
      currentRoadmapId: "some-path",
      timezone: "America/Chicago",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };

    const merged = await syncGuestToAccount(client(fake), USER_ID, guest);
    expect(merged.lessonStatus).toEqual(guest.lessonStatus);

    const pulledBack = await pullProgress(client(fake), USER_ID);
    expect(pulledBack.lessonStatus).toEqual(guest.lessonStatus);
    expect(pulledBack.bookmarks).toEqual(guest.bookmarks);
    expect(pulledBack.notes["lesson-a"].text).toBe("my note");
    expect(pulledBack.enrollments["python-fundamentals"].enrolledAt).toBe(
      "2026-01-01T00:00:00.000Z",
    );
    expect(pulledBack.roadmapProgress["some-path"].completedStepIds).toEqual(["s1"]);
    expect(pulledBack.projectProgress["some-project"].completedMilestoneIds).toEqual(["m1"]);
    expect(pulledBack.activity).toHaveLength(1);
    expect(pulledBack.profile.displayName).toBe("Ravi");
    expect(pulledBack.profile.learningGoal).toBe("Get a job");
  });

  it("is idempotent: syncing the same guest state twice produces no duplicate rows", async () => {
    const fake = new FakeSupabase();
    const guest = createEmptyProgress();
    guest.lessonStatus["lesson-a"] = "completed";
    guest.bookmarks = ["lesson-a", "lesson-b"];
    guest.quizResults["lesson-a"] = {
      correct: 3,
      total: 4,
      lastAttemptAt: "2026-01-01T00:00:00.000Z",
    };
    guest.activity = [
      {
        id: "lesson-completed:lesson-a",
        type: "lesson-completed",
        refId: "lesson-a",
        title: "Lesson A",
        at: "2026-01-01T00:00:00.000Z",
      },
    ];

    await syncGuestToAccount(client(fake), USER_ID, guest);
    await syncGuestToAccount(client(fake), USER_ID, guest);

    expect(fake.tables["bookmarks"]).toHaveLength(2);
    expect(fake.tables["lesson_progress"]).toHaveLength(1);
    expect(fake.tables["quiz_attempts"]).toHaveLength(1); // same result both times -- no new history row
    expect(fake.tables["activity_log"]).toHaveLength(1);
  });

  it("a second sign-in merges new remote progress (made on another device) into the local snapshot", async () => {
    const fake = new FakeSupabase();
    const deviceA = createEmptyProgress();
    deviceA.lessonStatus["lesson-a"] = "completed";
    await syncGuestToAccount(client(fake), USER_ID, deviceA);

    // Simulate progress made on a second device that already synced remotely.
    fake.tables["lesson_progress"].push({
      id: "extra",
      user_id: USER_ID,
      lesson_id: "lesson-b",
      status: "completed",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // Device A signs in again with only its own (older) local snapshot.
    const merged = await syncGuestToAccount(client(fake), USER_ID, deviceA);
    expect(merged.lessonStatus["lesson-a"]).toBe("completed");
    expect(merged.lessonStatus["lesson-b"]).toBe("completed");

    const pulledBack = await pullProgress(client(fake), USER_ID);
    expect(pulledBack.lessonStatus["lesson-a"]).toBe("completed");
    expect(pulledBack.lessonStatus["lesson-b"]).toBe("completed");
  });

  it("a profile edit's updatedAt is actually persisted to the DB row, not left frozen at signup time", async () => {
    // Regression test: push.ts's profile upsert originally omitted
    // updated_at, so the DB column stayed frozen at whatever the very first
    // insert set it to -- silently breaking mergeProgress's last-write-wins
    // comparison for every profile edit after the first, since a pull would
    // always return the same stale timestamp no matter how many real edits
    // had been pushed.
    const fake = new FakeSupabase();

    // First sync: simulates the empty row Supabase's handle_new_user
    // trigger creates at signup (real data starts empty, so the frozen
    // "signup timestamp" bug isn't observable yet).
    const signup = createEmptyProgress();
    await syncGuestToAccount(client(fake), USER_ID, signup);
    const rowAfterSignup = fake.tables["profiles"].find((r) => r.id === USER_ID)!;
    const signupTimestamp = rowAfterSignup.updated_at;

    // A real profile edit, pushed later with a distinctly newer updatedAt.
    const edited = createEmptyProgress();
    edited.profile = {
      displayName: "Ravi",
      learningGoal: "Get a job",
      currentRoadmapId: null,
      timezone: null,
      updatedAt: "2030-01-01T00:00:00.000Z",
    };
    await syncGuestToAccount(client(fake), USER_ID, edited);

    const rowAfterEdit = fake.tables["profiles"].find((r) => r.id === USER_ID)!;
    expect(rowAfterEdit.updated_at).toBe("2030-01-01T00:00:00.000Z");
    expect(rowAfterEdit.updated_at).not.toBe(signupTimestamp);

    const pulledBack = await pullProgress(client(fake), USER_ID);
    expect(pulledBack.profile.updatedAt).toBe("2030-01-01T00:00:00.000Z");
  });

  it("records a quiz result as new history only when the result actually changed", async () => {
    const fake = new FakeSupabase();
    const state = createEmptyProgress();
    state.quizResults["lesson-a"] = {
      correct: 2,
      total: 4,
      lastAttemptAt: "2026-01-01T00:00:00.000Z",
    };
    await syncGuestToAccount(client(fake), USER_ID, state);
    expect(fake.tables["quiz_attempts"]).toHaveLength(1);

    const improved = {
      ...state,
      quizResults: {
        "lesson-a": { correct: 4, total: 4, lastAttemptAt: "2026-01-02T00:00:00.000Z" },
      },
    };
    await syncGuestToAccount(client(fake), USER_ID, improved);
    expect(fake.tables["quiz_attempts"]).toHaveLength(2);
  });
});
