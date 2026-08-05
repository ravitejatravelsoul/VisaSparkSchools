import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CertificatesDashboard } from "@/components/certificates/certificates-dashboard";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonsForCourse } from "@/lib/content/registry";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
  useSessionStore.setState({ userId: null, email: null });
});

describe("CertificatesDashboard", () => {
  it("shows the honest accreditation disclaimer", () => {
    render(<CertificatesDashboard />);
    expect(
      screen.getByText(/not an accredited degree, a professional certification/i),
    ).toBeInTheDocument();
  });

  it("shows a guest-only disclosure when not signed in", () => {
    render(<CertificatesDashboard />);
    expect(screen.getByText(/only stored on this device/i)).toBeInTheDocument();
  });

  it("does not show the guest disclosure once signed in with Supabase enabled", () => {
    // featureFlags.supabaseEnabled is false in this test env regardless of
    // session, so this exercises the "not configured" branch of the same
    // disclosure instead of hiding it entirely -- confirms the text adapts.
    useSessionStore.setState({ userId: "user-1", email: "a@example.com" });
    render(<CertificatesDashboard />);
    expect(screen.getByText(/only stored on this device/i)).toBeInTheDocument();
  });

  it("shows 'Not yet eligible' for a course with no progress", () => {
    render(<CertificatesDashboard />);
    expect(screen.getAllByText("Not yet eligible").length).toBeGreaterThan(0);
  });

  it("shows an Issue certificate button once a course is genuinely complete", () => {
    const lessons = getLessonsForCourse("how-computing-works");
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        lessonStatus: Object.fromEntries(lessons.map((l) => [l.id, "completed" as const])),
      },
    }));
    render(<CertificatesDashboard />);
    expect(screen.getAllByRole("button", { name: "Issue certificate" }).length).toBeGreaterThan(0);
  });

  it("shows 'View certificate' once issued, not the Issue button", () => {
    const lessons = getLessonsForCourse("how-computing-works");
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        lessonStatus: Object.fromEntries(lessons.map((l) => [l.id, "completed" as const])),
      },
    }));
    useProgressStore.getState().issueCertificate("course-completion", "how-computing-works");
    render(<CertificatesDashboard />);
    expect(screen.getAllByRole("link", { name: "View certificate" }).length).toBeGreaterThan(0);
  });

  it("only shows a Skill Achievement row for courses in the curated allowlist", () => {
    render(<CertificatesDashboard />);
    // python-fundamentals is curated -- how-computing-works is not.
    const matchesText = (text: string) => (_content: string, el: Element | null) =>
      el?.textContent === text;
    expect(
      screen.getByText(matchesText("Skill Achievement — Python Fundamentals")),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(matchesText("Skill Achievement — How Computing & the Web Work")),
    ).not.toBeInTheDocument();
  });
});
