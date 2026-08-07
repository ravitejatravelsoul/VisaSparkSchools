import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { createEmptyProgress } from "@/lib/learning/types";

let supabaseEnabled = true;
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
  supabaseEnabled = true;
});

describe("Dashboard: guest vs authenticated (Supabase enabled)", () => {
  it("shows a sign-in gate, not any progress data, when signed out", () => {
    render(<DashboardClient />);
    expect(
      screen.getByRole("heading", { name: /sign in to see your dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/sign-in?next=%2Fdashboard",
    );
    expect(screen.getByRole("link", { name: "Create free account" })).toHaveAttribute(
      "href",
      "/sign-up",
    );
    // None of the real dashboard's data sections render behind the gate.
    expect(screen.queryByText("Lessons completed")).not.toBeInTheDocument();
    expect(screen.queryByText("Current streak")).not.toBeInTheDocument();
  });

  it("shows the real dashboard once signed in", () => {
    useSessionStore.setState({ userId: "user-1", email: "a@example.com" });
    render(<DashboardClient />);
    expect(
      screen.queryByRole("heading", { name: /sign in to see your dashboard/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Lessons completed")).toBeInTheDocument();
  });
});

describe("Dashboard: Supabase not configured (local/demo mode)", () => {
  it("shows the guest dashboard directly -- there is no sign-in concept to gate behind", () => {
    supabaseEnabled = false;
    render(<DashboardClient />);
    expect(
      screen.queryByRole("heading", { name: /sign in to see your dashboard/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Lessons completed")).toBeInTheDocument();
  });
});
