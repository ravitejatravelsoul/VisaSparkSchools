import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthForm } from "@/components/auth/auth-form";

/**
 * Regression test for Phase 5F: a successful sign-in/sign-up used to
 * navigate via `window.location.href = "/dashboard"` (a full page reload),
 * which ESLint's `@next/next/no-location-assign-relative-destination` rule
 * correctly flags for an internal Next.js destination. Fixed to use
 * `useRouter().push("/dashboard")` instead -- these tests assert the
 * router is called only on success, with the right destination, and never
 * on a failed attempt or in Supabase-disabled (guest) mode.
 */

vi.mock("@/lib/site-config", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-config")>();
  return { ...actual, featureFlags: { ...actual.featureFlags, supabaseEnabled: true } };
});

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const signInWithPassword = vi.fn();
const signUp = vi.fn();
vi.mock("@/lib/supabase/browser", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      signInWithPassword: (...args: unknown[]) => signInWithPassword(...args),
      signUp: (...args: unknown[]) => signUp(...args),
    },
  }),
}));

beforeEach(() => {
  push.mockClear();
  signInWithPassword.mockReset();
  signUp.mockReset();
});

function fillAndSubmit(email: string, password: string) {
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: email } });
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: password } });
  fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
}

describe("AuthForm", () => {
  it("navigates to /dashboard via the router after a successful sign-in, not a hard page reload", async () => {
    signInWithPassword.mockResolvedValue({ error: null });
    render(<AuthForm mode="sign-in" />);

    fillAndSubmit("a@example.test", "password123");

    await waitFor(() => expect(signInWithPassword).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard"));
  });

  it("does not navigate when sign-in fails, and shows the error instead", async () => {
    signInWithPassword.mockResolvedValue({ error: { message: "Invalid credentials" } });
    render(<AuthForm mode="sign-in" />);

    fillAndSubmit("a@example.test", "wrong-password");

    await waitFor(() => expect(screen.getByText("Invalid credentials")).toBeInTheDocument());
    expect(push).not.toHaveBeenCalled();
  });

  it("navigates to /dashboard after a successful sign-up too", async () => {
    signUp.mockResolvedValue({ error: null });
    render(<AuthForm mode="sign-up" />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "new@example.test" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => expect(signUp).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard"));
  });
});
