import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthForm } from "@/components/auth/auth-form";

/**
 * Coverage for sign-in/password-reset with CAPTCHA OFF (this release's
 * default) -- deliberately does NOT mock turnstileEnabled or the
 * TurnstileWidget module, to prove the real, unmocked default behaves
 * correctly: no widget, no captchaToken, no submission gating. The
 * CAPTCHA-enabled lifecycle has its own coverage in auth-form.test.tsx.
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

beforeEach(() => {
  push.mockClear();
  signInWithPassword.mockReset();
  resetPasswordForEmail.mockReset();
});

function fillAndSubmit(email: string, password: string) {
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: email } });
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: password } });
  fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
}

describe("AuthForm with CAPTCHA disabled", () => {
  it("renders no Turnstile widget and no configuration-error message", () => {
    render(<AuthForm mode="sign-in" />);
    expect(screen.queryByTestId("turnstile-stub")).not.toBeInTheDocument();
    expect(screen.queryByText(/security check/i)).not.toBeInTheDocument();
  });

  it("the sign-in submit button is enabled immediately, with no CAPTCHA gating", () => {
    render(<AuthForm mode="sign-in" />);
    expect(screen.getByRole("button", { name: "Sign in" })).not.toBeDisabled();
  });

  it("sign-in submits without a captchaToken field at all", async () => {
    signInWithPassword.mockResolvedValue({ error: null });
    render(<AuthForm mode="sign-in" />);

    fillAndSubmit("a@example.test", "password123");

    await waitFor(() => expect(signInWithPassword).toHaveBeenCalledTimes(1));
    expect(signInWithPassword).toHaveBeenCalledWith({
      email: "a@example.test",
      password: "password123",
      options: { captchaToken: undefined },
    });
    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard"));
  });

  it("password-reset request submits without a captchaToken field at all", async () => {
    resetPasswordForEmail.mockResolvedValue({ error: null });
    render(<AuthForm mode="reset" />);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@example.test" } });
    fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));

    await waitFor(() => expect(resetPasswordForEmail).toHaveBeenCalledTimes(1));
    expect(resetPasswordForEmail).toHaveBeenCalledWith("a@example.test", {
      captchaToken: undefined,
      redirectTo: `${window.location.origin}/auth/callback?next=%2Fupdate-password`,
    });
  });

  it("still blocks a duplicate submission while the first request is pending, independent of CAPTCHA", async () => {
    let resolveSignIn: (v: { error: null }) => void;
    signInWithPassword.mockReturnValue(
      new Promise((resolve) => {
        resolveSignIn = resolve;
      }),
    );
    render(<AuthForm mode="sign-in" />);

    fillAndSubmit("a@example.test", "password123");
    fireEvent.click(screen.getByRole("button", { name: "Please wait…" }));

    expect(signInWithPassword).toHaveBeenCalledTimes(1);
    resolveSignIn!({ error: null });
    await waitFor(() => expect(push).toHaveBeenCalled());
  });

  it("ordinary form validation still applies (empty email is rejected by the browser, not CAPTCHA)", () => {
    render(<AuthForm mode="sign-in" />);
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    expect(emailInput.required).toBe(true);
  });
});
