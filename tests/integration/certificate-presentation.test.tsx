import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CertificatePresentation } from "@/components/certificates/certificate-presentation";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonsForCourse, getProjectBySlug } from "@/lib/content/registry";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
  useSessionStore.setState({ userId: null, email: null });
});

function issue(courseSlug: string) {
  const lessons = getLessonsForCourse(courseSlug);
  useProgressStore.setState((s) => ({
    state: {
      ...s.state,
      lessonStatus: Object.fromEntries(lessons.map((l) => [l.id, "completed" as const])),
    },
  }));
  return useProgressStore.getState().issueCertificate("course-completion", courseSlug);
}

describe("CertificatePresentation", () => {
  it("shows a not-found message when no certificate has been issued yet", () => {
    render(<CertificatePresentation type="course-completion" targetId="how-computing-works" />);
    expect(screen.getByText(/No certificate found/i)).toBeInTheDocument();
  });

  it("renders the certificate's real course title, display name, and criteria once issued", () => {
    useProgressStore.getState().setProfile({ displayName: "Grace Hopper" });
    issue("how-computing-works");
    render(<CertificatePresentation type="course-completion" targetId="how-computing-works" />);
    expect(screen.getByText("Grace Hopper")).toBeInTheDocument();
    expect(screen.getByText("How Computing & the Web Work")).toBeInTheDocument();
    expect(
      screen.getByText("All required lessons in this course are completed."),
    ).toBeInTheDocument();
  });

  it("always shows the non-accreditation disclaimer with VS Schools issuer wording", () => {
    issue("how-computing-works");
    render(<CertificatePresentation type="course-completion" targetId="how-computing-works" />);
    expect(
      screen.getByText(/is not a university degree or vendor certification/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/completion within/i)).toBeInTheDocument();
  });

  it("shows the CEO signatory line", () => {
    issue("how-computing-works");
    render(<CertificatePresentation type="course-completion" targetId="how-computing-works" />);
    expect(screen.getByText("Naga Malleswararao Boddu")).toBeInTheDocument();
    expect(screen.getByText("CEO, VS Schools")).toBeInTheDocument();
  });

  it("discloses local-only, unverifiable storage for a guest, with a sign-in path to fix it", () => {
    issue("how-computing-works");
    render(<CertificatePresentation type="course-completion" targetId="how-computing-works" />);
    expect(screen.getByText(/not yet independently verifiable/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public verification link/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in to download a pdf/i })).toBeInTheDocument();
  });

  it("shows the correct certificate type label for skill-achievement", () => {
    const lessons = getLessonsForCourse("python-fundamentals");
    const project = getProjectBySlug("expense-tracker-cli")!;
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        lessonStatus: Object.fromEntries(lessons.map((l) => [l.id, "completed" as const])),
        practiceAttempts: {
          "python-fundamentals": {
            bestScore: 10,
            bestTotal: 10,
            lastAttemptedAt: "2026-08-01T00:00:00.000Z",
            topicsNeedingReview: [],
          },
        },
        projectProgress: {
          "expense-tracker-cli": {
            startedAt: "2026-08-01T00:00:00.000Z",
            completedMilestoneIds: project.milestones.map((m) => m.id),
          },
        },
      },
    }));
    useProgressStore.getState().issueCertificate("skill-achievement", "python-fundamentals");
    render(<CertificatePresentation type="skill-achievement" targetId="python-fundamentals" />);
    expect(screen.getByText("Skill Achievement Certificate")).toBeInTheDocument();
  });
});
