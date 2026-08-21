import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileHeaderCta } from "@/components/layout/mobile-header-cta";
import { useSessionStore } from "@/lib/auth/session-store";

/**
 * Issue 3 (mobile header audit): the mobile top-bar CTA must show exactly
 * one auth-aware action -- Sign in for guests, Dashboard for a signed-in
 * learner -- never both, never neither.
 */

vi.mock("@/lib/site-config", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-config")>();
  return { ...actual, featureFlags: { ...actual.featureFlags, supabaseEnabled: true } };
});

beforeEach(() => {
  useSessionStore.setState({ userId: null, email: null });
});

describe("MobileHeaderCta", () => {
  it("shows a Sign in link when signed out", () => {
    render(<MobileHeaderCta />);
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/sign-in");
    expect(screen.queryByRole("link", { name: "Dashboard" })).not.toBeInTheDocument();
  });

  it("shows a Dashboard link when signed in", () => {
    useSessionStore.setState({ userId: "user-1", email: "a@example.test" });
    render(<MobileHeaderCta />);
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard");
    expect(screen.queryByRole("link", { name: "Sign in" })).not.toBeInTheDocument();
  });
});
