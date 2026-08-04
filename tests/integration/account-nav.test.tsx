import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AccountNav } from "@/components/auth/account-nav";
import { useSessionStore } from "@/lib/auth/session-store";

/**
 * Regression test for Phase 5F: AccountNav's sign-out used to navigate via
 * `window.location.href = "/"` (a full page reload), which ESLint's
 * `@next/next/no-location-assign-relative-destination` rule correctly
 * flags for an internal Next.js destination. Fixed to use
 * `useRouter().push("/")` instead -- these tests assert the router is
 * actually called with the right destination, and that sign-out itself
 * still happens before navigating.
 */

vi.mock("@/lib/site-config", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-config")>();
  return { ...actual, featureFlags: { ...actual.featureFlags, supabaseEnabled: true } };
});

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const signOut = vi.fn(() => Promise.resolve({ error: null }));
vi.mock("@/lib/supabase/browser", () => ({
  getSupabaseBrowserClient: () => ({ auth: { signOut } }),
}));

beforeEach(() => {
  push.mockClear();
  signOut.mockClear();
  useSessionStore.setState({ userId: "user-1", email: "a@example.test" });
});

describe("AccountNav", () => {
  it("shows a Sign in link when signed out (or Supabase isn't configured)", () => {
    useSessionStore.setState({ userId: null, email: null });
    render(<AccountNav />);
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/sign-in");
  });

  it("signs out and navigates home via the router, not a hard page reload", async () => {
    render(<AccountNav />);
    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    await waitFor(() => expect(signOut).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/"));
  });

  it("calls signOut before navigating, not the other way around", async () => {
    const callOrder: string[] = [];
    signOut.mockImplementationOnce(() => {
      callOrder.push("signOut");
      return Promise.resolve({ error: null });
    });
    push.mockImplementationOnce((dest: string) => callOrder.push(`push:${dest}`));

    render(<AccountNav />);
    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    await waitFor(() => expect(push).toHaveBeenCalled());
    expect(callOrder).toEqual(["signOut", "push:/"]);
  });
});
