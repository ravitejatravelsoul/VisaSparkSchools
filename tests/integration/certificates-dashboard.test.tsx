import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CertificatesDashboard } from "@/components/certificates/certificates-dashboard";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonsForCourse } from "@/lib/content/registry";

let supabaseEnabled = false;
vi.mock("@/lib/site-config", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-config")>();
  return {
    ...actual,
    get featureFlags() {
      return { ...actual.featureFlags, supabaseEnabled };
    },
  };
});

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
  useSessionStore.setState({ userId: null, email: null });
  supabaseEnabled = false;
});

describe("CertificatesDashboard", () => {
  it("shows the honest accreditation disclaimer", () => {
    render(<CertificatesDashboard />);
    expect(
      screen.getByText(/not an accredited degree, a professional certification/i),
    ).toBeInTheDocument();
  });

  it("shows the 'Supabase not configured' disclosure when Supabase isn't configured at all", () => {
    render(<CertificatesDashboard />);
    expect(screen.getByText(/only stored on this device/i)).toBeInTheDocument();
  });

  it("still shows the same disclosure signed in, when Supabase isn't configured (nothing to sign into)", () => {
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

describe("CertificatesDashboard: issuance requires sign-in when accounts exist (Supabase enabled)", () => {
  beforeEach(() => {
    supabaseEnabled = true;
  });

  function completeHowComputingWorks() {
    const lessons = getLessonsForCourse("how-computing-works");
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        lessonStatus: Object.fromEntries(lessons.map((l) => [l.id, "completed" as const])),
      },
    }));
  }

  it("shows a sign-in gate instead of the local-storage disclosure", () => {
    render(<CertificatesDashboard />);
    expect(screen.getByText(/sign in to issue a certificate/i)).toBeInTheDocument();
    expect(screen.queryByText(/only stored on this device/i)).not.toBeInTheDocument();
  });

  it("shows 'Sign in to issue' instead of an Issue certificate button for an eligible course while signed out", () => {
    completeHowComputingWorks();
    render(<CertificatesDashboard />);
    expect(screen.getAllByRole("link", { name: "Sign in to issue" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: "Issue certificate" })).not.toBeInTheDocument();
  });

  it("the sign-in link preserves a return path back to /certificates", () => {
    completeHowComputingWorks();
    render(<CertificatesDashboard />);
    expect(screen.getAllByRole("link", { name: "Sign in to issue" })[0]).toHaveAttribute(
      "href",
      "/sign-in?next=%2Fcertificates",
    );
  });

  it("shows a real Issue certificate button once signed in", () => {
    useSessionStore.setState({ userId: "user-1", email: "a@example.com" });
    completeHowComputingWorks();
    render(<CertificatesDashboard />);
    expect(screen.getAllByRole("button", { name: "Issue certificate" }).length).toBeGreaterThan(0);
    expect(screen.queryByText(/sign in to issue a certificate/i)).not.toBeInTheDocument();
  });

  it("does not gate a course that isn't eligible yet -- it still just says 'Not yet eligible', not a sign-in prompt", () => {
    render(<CertificatesDashboard />);
    expect(screen.getAllByText("Not yet eligible").length).toBeGreaterThan(0);
  });
});
