import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { forwardRef, useImperativeHandle } from "react";
import { AuthForm } from "@/components/auth/auth-form";

/**
 * Regression test for Phase 5F: a successful sign-in used to navigate via
 * `window.location.href = "/dashboard"` (a full page reload), which
 * ESLint's `@next/next/no-location-assign-relative-destination` rule
 * correctly flags for an internal Next.js destination. Fixed to use
 * `useRouter().push("/dashboard")` instead -- these tests assert the router
 * is called only on success, with the right destination, and never on a
 * failed attempt or in Supabase-disabled (guest) mode.
 *
 * Sign-up moved to a dedicated component (components/auth/sign-up-form.tsx,
 * see tests/integration/sign-up-form.test.tsx) as part of the expanded
 * onboarding flow -- AuthForm now only handles sign-in and password reset.
 *
 * Also covers the CAPTCHA release-blocker fix: sign-in and password-reset
 * previously called Supabase with no captchaToken at all. These tests use a
 * controllable Turnstile stub (rather than sign-up-form.test.tsx's
 * always-auto-resolving one) so both the "solved" and "not yet solved"
 * states can be exercised, plus the single-use reset() call.
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
const resetPasswordForEmail = vi.fn();
vi.mock("@/lib/supabase/browser", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      signInWithPassword: (...args: unknown[]) => signInWithPassword(...args),
      resetPasswordForEmail: (...args: unknown[]) => resetPasswordForEmail(...args),
    },
  }),
}));

// Controllable Turnstile stub: `autoResolve` decides whether mounting the
// widget immediately reports a solved token+status (matching a real solved
// challenge) or leaves it unsolved, letting tests exercise the "submission
// blocked without a token" path. `widgetResetSpy` proves reset() -- which
// the hook always pairs with clearing its own token state regardless of
// what the ref does -- was actually invoked after each single-use token is
// consumed.
let autoResolve = true;
const widgetResetSpy = vi.fn();
vi.mock("@/components/auth/turnstile-widget", () => ({
  TurnstileWidget: forwardRef(function StubTurnstileWidget(
    {
      onToken,
      onStatusChange,
    }: { onToken: (t: string | null) => void; onStatusChange?: (s: string) => void },
    ref,
  ) {
    useImperativeHandle(ref, () => ({ reset: widgetResetSpy }));
    if (autoResolve) {
      onToken("test-captcha-token");
      onStatusChange?.("solved");
    }
    return <div data-testid="turnstile-stub" />;
  }),
}));

beforeEach(() => {
  push.mockClear();
  signInWithPassword.mockReset();
  resetPasswordForEmail.mockReset();
  autoResolve = true;
  widgetResetSpy.mockClear();
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

  it("passes the current CAPTCHA token to signInWithPassword", async () => {
    signInWithPassword.mockResolvedValue({ error: null });
    render(<AuthForm mode="sign-in" />);

    fillAndSubmit("a@example.test", "password123");

    await waitFor(() => expect(signInWithPassword).toHaveBeenCalledTimes(1));
    expect(signInWithPassword).toHaveBeenCalledWith({
      email: "a@example.test",
      password: "password123",
      options: { captchaToken: "test-captcha-token" },
    });
  });

  it("does not navigate when sign-in fails, shows the error, and resets the challenge", async () => {
    signInWithPassword.mockResolvedValue({ error: { message: "Invalid credentials" } });
    render(<AuthForm mode="sign-in" />);

    fillAndSubmit("a@example.test", "wrong-password");

    await waitFor(() => expect(screen.getByText("Invalid credentials")).toBeInTheDocument());
    expect(push).not.toHaveBeenCalled();
    expect(widgetResetSpy).toHaveBeenCalledTimes(1);
  });

  it("disables the submit button until the security check resolves", () => {
    autoResolve = false;
    render(<AuthForm mode="sign-in" />);

    expect(screen.getByRole("button", { name: "Sign in" })).toBeDisabled();
  });

  it("blocks submission and never calls Supabase when the security check hasn't been solved", async () => {
    autoResolve = false;
    render(<AuthForm mode="sign-in" />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@example.test" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    // The submit button is disabled in this state, so a real click would
    // never reach the handler -- submit the form directly to prove the
    // internal fail-closed guard (not just the button's disabled attribute)
    // also blocks the request.
    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }).closest("form")!);

    expect(
      await screen.findByText(/complete the security check before continuing/i),
    ).toBeInTheDocument();
    expect(signInWithPassword).not.toHaveBeenCalled();
  });

  it("does not reset the challenge after a successful sign-in (the form unmounts on navigation)", async () => {
    signInWithPassword.mockResolvedValue({ error: null });
    render(<AuthForm mode="sign-in" />);

    fillAndSubmit("a@example.test", "password123");

    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard"));
    expect(widgetResetSpy).not.toHaveBeenCalled();
  });

  it("still protects the safe-redirect destination now that sign-in is CAPTCHA-gated", async () => {
    signInWithPassword.mockResolvedValue({ error: null });
    render(<AuthForm mode="sign-in" next="https://evil.example/phish" />);

    fillAndSubmit("a@example.test", "password123");

    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard"));
  });

  it("passes the current CAPTCHA token to resetPasswordForEmail and resets the challenge after it resolves", async () => {
    resetPasswordForEmail.mockResolvedValue({ error: null });
    render(<AuthForm mode="reset" />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@example.test" } });
    fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));

    await waitFor(() => expect(resetPasswordForEmail).toHaveBeenCalledTimes(1));
    expect(resetPasswordForEmail).toHaveBeenCalledWith("a@example.test", {
      captchaToken: "test-captcha-token",
    });
    expect(await screen.findByText(/check your email for a reset link/i)).toBeInTheDocument();
    expect(widgetResetSpy).toHaveBeenCalledTimes(1);
  });

  it("blocks a password-reset request when the security check hasn't been solved", async () => {
    autoResolve = false;
    render(<AuthForm mode="reset" />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@example.test" } });
    fireEvent.submit(screen.getByRole("button", { name: "Send reset link" }).closest("form")!);

    expect(
      await screen.findByText(/complete the security check before continuing/i),
    ).toBeInTheDocument();
    expect(resetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("resets the challenge after a failed password-reset request too", async () => {
    resetPasswordForEmail.mockResolvedValue({ error: { message: "Rate limited" } });
    render(<AuthForm mode="reset" />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@example.test" } });
    fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));

    await waitFor(() => expect(resetPasswordForEmail).toHaveBeenCalledTimes(1));
    expect(widgetResetSpy).toHaveBeenCalledTimes(1);
  });
});
