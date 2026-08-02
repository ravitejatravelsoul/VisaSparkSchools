import { describe, it, expect, beforeEach } from "vitest";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonsForCourse } from "@/lib/content/registry";

const LESSON_ID = "found-how-computers-run-code"; // course: how-computing-works

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("enrollment", () => {
  it("viewing a lesson idempotently enrolls the learner in its course", () => {
    useProgressStore.getState().viewLesson(LESSON_ID);
    const first = useProgressStore.getState().state.enrollments["how-computing-works"];
    expect(first).toBeDefined();
    expect(first.lastAccessedLessonId).toBe(LESSON_ID);

    const enrolledAt = first.enrolledAt;
    useProgressStore.getState().viewLesson(LESSON_ID);
    expect(useProgressStore.getState().state.enrollments["how-computing-works"].enrolledAt).toBe(
      enrolledAt,
    );
  });

  it("explicit enroll() is idempotent and does not clobber lastAccessed fields", () => {
    useProgressStore.getState().viewLesson(LESSON_ID);
    const before = useProgressStore.getState().state.enrollments["how-computing-works"];
    useProgressStore.getState().enroll("how-computing-works");
    const after = useProgressStore.getState().state.enrollments["how-computing-works"];
    expect(after).toEqual(before);
  });

  it("logs a single idempotent course-enrolled activity event", () => {
    useProgressStore.getState().viewLesson(LESSON_ID);
    useProgressStore.getState().viewLesson(LESSON_ID);
    const events = useProgressStore
      .getState()
      .state.activity.filter(
        (e) => e.type === "course-enrolled" && e.refId === "how-computing-works",
      );
    expect(events).toHaveLength(1);
  });
});

describe("course completion via completeLesson", () => {
  it("logs course-completed once every lesson in the course is done", () => {
    const lessons = getLessonsForCourse("how-computing-works");
    for (const lesson of lessons.slice(0, -1)) {
      useProgressStore.getState().completeLesson(lesson.id);
    }
    let events = useProgressStore
      .getState()
      .state.activity.filter((e) => e.type === "course-completed");
    expect(events).toHaveLength(0);

    useProgressStore.getState().completeLesson(lessons[lessons.length - 1].id);
    events = useProgressStore
      .getState()
      .state.activity.filter((e) => e.type === "course-completed");
    expect(events).toHaveLength(1);
    expect(events[0].refId).toBe("how-computing-works");
  });
});

describe("roadmap step tracking", () => {
  const PATH = "complete-beginner-to-web-developer";

  it("startRoadmap is idempotent and records a single activity event", () => {
    useProgressStore.getState().startRoadmap(PATH);
    const firstStartedAt = useProgressStore.getState().state.roadmapProgress[PATH].startedAt;
    useProgressStore.getState().startRoadmap(PATH);
    expect(useProgressStore.getState().state.roadmapProgress[PATH].startedAt).toBe(firstStartedAt);
    expect(
      useProgressStore.getState().state.activity.filter((e) => e.type === "roadmap-started"),
    ).toHaveLength(1);
  });

  it("toggleRoadmapStep marks a self-reported step complete and can undo it", () => {
    useProgressStore.getState().toggleRoadmapStep(PATH, "s1");
    expect(useProgressStore.getState().state.roadmapProgress[PATH].completedStepIds).toContain(
      "s1",
    );

    useProgressStore.getState().toggleRoadmapStep(PATH, "s1");
    expect(useProgressStore.getState().state.roadmapProgress[PATH].completedStepIds).not.toContain(
      "s1",
    );
  });
});

describe("project milestone tracking", () => {
  const PROJECT = "personal-portfolio-page";

  it("toggling every milestone logs a single project-completed event", () => {
    for (const id of ["m1", "m2", "m3"]) {
      useProgressStore.getState().toggleProjectMilestone(PROJECT, id);
    }
    const events = useProgressStore
      .getState()
      .state.activity.filter((e) => e.type === "project-completed");
    expect(events).toHaveLength(1);
  });

  it("un-toggling a milestone removes it without affecting the others", () => {
    useProgressStore.getState().toggleProjectMilestone(PROJECT, "m1");
    useProgressStore.getState().toggleProjectMilestone(PROJECT, "m2");
    useProgressStore.getState().toggleProjectMilestone(PROJECT, "m1");
    const ids = useProgressStore.getState().state.projectProgress[PROJECT].completedMilestoneIds;
    expect(ids).toEqual(["m2"]);
  });
});

describe("notes: setNote and resolveNoteConflict", () => {
  it("setNote stamps updatedAt and clears the note entirely when text is blank", () => {
    useProgressStore.getState().setNote("lesson-a", "hello");
    expect(useProgressStore.getState().state.notes["lesson-a"].text).toBe("hello");
    useProgressStore.getState().setNote("lesson-a", "   ");
    expect(useProgressStore.getState().state.notes["lesson-a"]).toBeUndefined();
  });

  it("resolveNoteConflict('conflict') restores the older text and clears the conflict marker", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        notes: {
          "lesson-a": {
            text: "current text",
            updatedAt: "2026-01-02T00:00:00.000Z",
            conflict: { text: "older text", updatedAt: "2026-01-01T00:00:00.000Z" },
          },
        },
      },
    }));
    useProgressStore.getState().resolveNoteConflict("lesson-a", "conflict");
    const note = useProgressStore.getState().state.notes["lesson-a"];
    expect(note.text).toBe("older text");
    expect(note.conflict).toBeUndefined();
  });

  it("resolveNoteConflict('current') keeps the current text and clears the conflict marker", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        notes: {
          "lesson-a": {
            text: "current text",
            updatedAt: "2026-01-02T00:00:00.000Z",
            conflict: { text: "older text", updatedAt: "2026-01-01T00:00:00.000Z" },
          },
        },
      },
    }));
    useProgressStore.getState().resolveNoteConflict("lesson-a", "current");
    const note = useProgressStore.getState().state.notes["lesson-a"];
    expect(note.text).toBe("current text");
    expect(note.conflict).toBeUndefined();
  });
});

describe("setProfile", () => {
  it("patches only the given fields and always bumps updatedAt", () => {
    useProgressStore.getState().setProfile({ displayName: "Ravi" });
    const afterFirst = useProgressStore.getState().state.profile;
    expect(afterFirst.displayName).toBe("Ravi");
    expect(afterFirst.learningGoal).toBeNull();

    useProgressStore.getState().setProfile({ learningGoal: "Get a job" });
    const afterSecond = useProgressStore.getState().state.profile;
    expect(afterSecond.displayName).toBe("Ravi");
    expect(afterSecond.learningGoal).toBe("Get a job");
    expect(afterSecond.updatedAt >= afterFirst.updatedAt).toBe(true);
  });

  it("rejects an unknown or internal roadmap id for currentRoadmapId, keeping the previous value", () => {
    useProgressStore
      .getState()
      .setProfile({ currentRoadmapId: "complete-beginner-to-web-developer" });
    useProgressStore.getState().setProfile({ currentRoadmapId: "this-roadmap-does-not-exist" });
    expect(useProgressStore.getState().state.profile.currentRoadmapId).toBe(
      "complete-beginner-to-web-developer",
    );

    // The one real, registered-but-internal roadmap must also be rejected --
    // not just unknown strings.
    useProgressStore.getState().setProfile({ currentRoadmapId: "placement-and-job-readiness" });
    expect(useProgressStore.getState().state.profile.currentRoadmapId).toBe(
      "complete-beginner-to-web-developer",
    );
  });

  it("allows clearing currentRoadmapId to null", () => {
    useProgressStore
      .getState()
      .setProfile({ currentRoadmapId: "complete-beginner-to-web-developer" });
    useProgressStore.getState().setProfile({ currentRoadmapId: null });
    expect(useProgressStore.getState().state.profile.currentRoadmapId).toBeNull();
  });

  it("rejects an invalid timezone string, keeping the previous value", () => {
    useProgressStore.getState().setProfile({ timezone: "America/Chicago" });
    useProgressStore.getState().setProfile({ timezone: "Not/A_Real_Zone" });
    expect(useProgressStore.getState().state.profile.timezone).toBe("America/Chicago");
  });

  it("a bad field in a patch doesn't block a valid field in the same call", () => {
    useProgressStore.getState().setProfile({ displayName: "Ravi", timezone: "not-a-zone" });
    const profile = useProgressStore.getState().state.profile;
    expect(profile.displayName).toBe("Ravi");
    expect(profile.timezone).toBeNull();
  });
});

describe("validation gates against unknown/internal ids (direct store calls, not just UI)", () => {
  it("startRoadmap silently no-ops for an unknown roadmap id", () => {
    useProgressStore.getState().startRoadmap("this-roadmap-does-not-exist");
    expect(useProgressStore.getState().state.roadmapProgress).toEqual({});
  });

  it("startRoadmap silently no-ops for the one internal/draft roadmap", () => {
    useProgressStore.getState().startRoadmap("placement-and-job-readiness");
    expect(useProgressStore.getState().state.roadmapProgress).toEqual({});
  });

  it("toggleRoadmapStep silently no-ops for an unknown roadmap id", () => {
    useProgressStore.getState().toggleRoadmapStep("this-roadmap-does-not-exist", "s1");
    expect(useProgressStore.getState().state.roadmapProgress).toEqual({});
  });

  it("toggleRoadmapStep silently no-ops for a step id that isn't part of the roadmap", () => {
    useProgressStore
      .getState()
      .toggleRoadmapStep("complete-beginner-to-web-developer", "not-a-real-step-id");
    expect(useProgressStore.getState().state.roadmapProgress).toEqual({});
  });

  it("toggleRoadmapStep silently no-ops for a real course-type step (derived, never self-reportable)", () => {
    // s2 in complete-beginner-to-web-developer is a course step.
    useProgressStore.getState().toggleRoadmapStep("complete-beginner-to-web-developer", "s2");
    expect(useProgressStore.getState().state.roadmapProgress).toEqual({});
  });

  it("enroll silently no-ops for an unknown course id", () => {
    useProgressStore.getState().enroll("this-course-does-not-exist");
    expect(useProgressStore.getState().state.enrollments).toEqual({});
  });

  it("toggleProjectMilestone silently no-ops for an unknown project id", () => {
    useProgressStore.getState().toggleProjectMilestone("this-project-does-not-exist", "m1");
    expect(useProgressStore.getState().state.projectProgress).toEqual({});
  });

  it("toggleProjectMilestone silently no-ops for an unknown milestone id on a real project", () => {
    useProgressStore
      .getState()
      .toggleProjectMilestone("personal-portfolio-page", "not-a-real-milestone");
    expect(useProgressStore.getState().state.projectProgress).toEqual({});
  });
});

describe("setDailyGoal validation", () => {
  it("clamps to the documented [5, 180] range", () => {
    useProgressStore.getState().setDailyGoal(999999);
    expect(useProgressStore.getState().state.dailyGoalMinutes).toBe(180);

    useProgressStore.getState().setDailyGoal(-50);
    expect(useProgressStore.getState().state.dailyGoalMinutes).toBe(5);
  });

  it("falls back to a safe minimum for NaN (e.g. a cleared number input)", () => {
    useProgressStore.getState().setDailyGoal(Number("not-a-number"));
    expect(useProgressStore.getState().state.dailyGoalMinutes).toBe(5);
  });

  it("rounds a fractional value", () => {
    useProgressStore.getState().setDailyGoal(22.7);
    expect(useProgressStore.getState().state.dailyGoalMinutes).toBe(23);
  });
});
