import { describe, it, expect, beforeEach } from "vitest";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonsForCourse, getProjectBySlug } from "@/lib/content/registry";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

function completeCourse(courseSlug: string) {
  const lessons = getLessonsForCourse(courseSlug);
  useProgressStore.setState((s) => ({
    state: {
      ...s.state,
      lessonStatus: Object.fromEntries(lessons.map((l) => [l.id, "completed" as const])),
    },
  }));
}

describe("issueCertificate: course-completion", () => {
  it("returns null and issues nothing when the course isn't complete", () => {
    const result = useProgressStore
      .getState()
      .issueCertificate("course-completion", "how-computing-works");
    expect(result).toBeNull();
    expect(useProgressStore.getState().state.certificates).toEqual({});
  });

  it("issues a certificate once the course is genuinely complete", () => {
    completeCourse("how-computing-works");
    const id = useProgressStore
      .getState()
      .issueCertificate("course-completion", "how-computing-works");
    expect(id).toBe("course-completion:how-computing-works");
    const cert = useProgressStore.getState().state.certificates[id!];
    expect(cert).toBeDefined();
    expect(cert.type).toBe("course-completion");
    expect(cert.targetId).toBe("how-computing-works");
    expect(cert.targetTitle.length).toBeGreaterThan(0);
    expect(cert.criteriaSnapshot.length).toBeGreaterThan(0);
    expect(cert.verificationCode.length).toBeGreaterThan(0);
  });

  it("is idempotent -- issuing twice never creates a second record or changes the first", () => {
    completeCourse("how-computing-works");
    const first = useProgressStore
      .getState()
      .issueCertificate("course-completion", "how-computing-works");
    const firstRecord = useProgressStore.getState().state.certificates[first!];
    const second = useProgressStore
      .getState()
      .issueCertificate("course-completion", "how-computing-works");
    expect(second).toBe(first);
    expect(Object.keys(useProgressStore.getState().state.certificates)).toHaveLength(1);
    expect(useProgressStore.getState().state.certificates[first!]).toEqual(firstRecord);
  });

  it("stores the learner's display name at issuance, falling back to a generic label when unset", () => {
    completeCourse("how-computing-works");
    const id = useProgressStore
      .getState()
      .issueCertificate("course-completion", "how-computing-works");
    expect(useProgressStore.getState().state.certificates[id!].displayName).toBe(
      "VisaSparkSchools Learner",
    );
  });

  it("uses the learner's chosen display name when one is set", () => {
    useProgressStore.getState().setProfile({ displayName: "Ada Lovelace" });
    completeCourse("how-computing-works");
    const id = useProgressStore
      .getState()
      .issueCertificate("course-completion", "how-computing-works");
    expect(useProgressStore.getState().state.certificates[id!].displayName).toBe("Ada Lovelace");
  });

  it("never marks a course complete just by issuing -- issuance reads existing progress, it doesn't create it", () => {
    const result = useProgressStore
      .getState()
      .issueCertificate("course-completion", "python-fundamentals");
    expect(result).toBeNull();
    expect(useProgressStore.getState().state.lessonStatus).toEqual({});
  });
});

describe("issueCertificate: skill-achievement", () => {
  it("returns null for a course with no defined skill-achievement path", () => {
    completeCourse("how-computing-works");
    const result = useProgressStore
      .getState()
      .issueCertificate("skill-achievement", "how-computing-works");
    expect(result).toBeNull();
  });

  it("issues once lessons, practice threshold, and the project are all genuinely met", () => {
    completeCourse("python-fundamentals");
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        practiceAttempts: {
          "python-fundamentals": {
            bestScore: 9,
            bestTotal: 10,
            lastAttemptedAt: "2026-08-01T00:00:00.000Z",
            topicsNeedingReview: [],
          },
        },
      },
    }));
    const project = getProjectBySlug("expense-tracker-cli")!;
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        projectProgress: {
          "expense-tracker-cli": {
            startedAt: "2026-08-01T00:00:00.000Z",
            completedMilestoneIds: project.milestones.map((m) => m.id),
          },
        },
      },
    }));

    const id = useProgressStore
      .getState()
      .issueCertificate("skill-achievement", "python-fundamentals");
    expect(id).toBe("skill-achievement:python-fundamentals");
    expect(useProgressStore.getState().state.certificates[id!].type).toBe("skill-achievement");
  });
});

describe("issueCertificate: course-completion and skill-achievement are independent records", () => {
  it("issuing both for the same course produces two distinct certificate ids", () => {
    completeCourse("python-fundamentals");
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        practiceAttempts: {
          "python-fundamentals": {
            bestScore: 10,
            bestTotal: 10,
            lastAttemptedAt: "2026-08-01T00:00:00.000Z",
            topicsNeedingReview: [],
          },
        },
      },
    }));
    const project = getProjectBySlug("expense-tracker-cli")!;
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        projectProgress: {
          "expense-tracker-cli": {
            startedAt: "2026-08-01T00:00:00.000Z",
            completedMilestoneIds: project.milestones.map((m) => m.id),
          },
        },
      },
    }));

    const completionId = useProgressStore
      .getState()
      .issueCertificate("course-completion", "python-fundamentals");
    const skillId = useProgressStore
      .getState()
      .issueCertificate("skill-achievement", "python-fundamentals");
    expect(completionId).not.toBe(skillId);
    expect(Object.keys(useProgressStore.getState().state.certificates)).toHaveLength(2);
  });
});
