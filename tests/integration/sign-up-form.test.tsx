import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignUpForm } from "@/components/auth/sign-up-form";

vi.mock("@/lib/site-config", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-config")>();
  return { ...actual, featureFlags: { ...actual.featureFlags, supabaseEnabled: true } };
});

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

// Simulates a solved Turnstile challenge without needing the real script --
// see components/auth/turnstile-widget.tsx, which is exercised separately.
// The sign-up form mounts a *second*, independent widget instance for the
// resend action (tokens are single-use), so mounts are tracked in order:
// the first mount (the main sign-up widget) always auto-resolves; later
// mounts (the resend widget) only auto-resolve unless a test opts out via
// `blockResendAutoResolve`, letting a test exercise the "not solved yet"
// state for resend specifically.
let turnstileMountCount = 0;
let blockResendAutoResolve = false;
vi.mock("@/components/auth/turnstile-widget", () => ({
  TurnstileWidget: ({
    onToken,
    onStatusChange,
  }: {
    onToken: (t: string) => void;
    onStatusChange?: (s: string) => void;
  }) => {
    turnstileMountCount += 1;
    const isResendInstance = turnstileMountCount > 1;
    if (!(isResendInstance && blockResendAutoResolve)) {
      onToken("test-captcha-token");
      onStatusChange?.("solved");
    }
    return <div data-testid="turnstile-stub" />;
  },
}));

const signUp = vi.fn();
const resend = vi.fn();
vi.mock("@/lib/supabase/browser", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      signUp: (...args: unknown[]) => signUp(...args),
      resend: (...args: unknown[]) => resend(...args),
    },
  }),
}));

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Ada" } });
  fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Lovelace" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.test" } });
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: "correct-horse-1" } });
  fireEvent.change(screen.getByLabelText("Confirm password"), {
    target: { value: "correct-horse-1" },
  });
  fireEvent.click(screen.getByLabelText("I'm learning the basics"));
  fireEvent.click(screen.getByLabelText(/I agree to the/, { selector: 'input[type="checkbox"]' }));
}

beforeEach(() => {
  push.mockClear();
  signUp.mockReset();
  resend.mockReset();
  turnstileMountCount = 0;
  blockResendAutoResolve = false;
});

describe("SignUpForm", () => {
  it("blocks submission and shows an error summary when required fields are missing", async () => {
    render(<SignUpForm />);
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(await screen.findByText(/please fix the following/i)).toBeInTheDocument();
    expect(signUp).not.toHaveBeenCalled();
  });

  it("submits with normalized names and metadata, then shows the check-your-email state instead of navigating", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null });
    render(<SignUpForm />);
    fillRequiredFields();

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => expect(signUp).toHaveBeenCalledTimes(1));
    const call = signUp.mock.calls[0][0];
    expect(call.email).toBe("ada@example.test");
    expect(call.options.captchaToken).toBe("test-captcha-token");
    expect(call.options.data.first_name).toBe("Ada");
    expect(call.options.data.last_name).toBe("Lovelace");
    expect(call.options.data.learner_level).toBe("basics");

    expect(
      await screen.findByText(/check your email to finish creating your account/i),
    ).toBeInTheDocument();
    // Never navigates to a protected page before confirmation.
    expect(push).not.toHaveBeenCalled();
  });

  it("navigates directly only if Supabase already returned a real session (confirmation disabled)", async () => {
    signUp.mockResolvedValue({ data: { session: { access_token: "x" } }, error: null });
    render(<SignUpForm />);
    fillRequiredFields();

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard"));
  });

  it("shows a generic, enumeration-safe error message on failure, never the raw provider message", async () => {
    signUp.mockResolvedValue({
      data: { session: null },
      error: { message: "User already registered" },
    });
    render(<SignUpForm />);
    fillRequiredFields();

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => expect(signUp).toHaveBeenCalledTimes(1));
    expect(screen.queryByText(/already registered/i)).not.toBeInTheDocument();
    expect(await screen.findByText(/couldn't complete sign-up/i)).toBeInTheDocument();
  });

  it("guards against double submission while a request is in flight", async () => {
    let resolveSignUp: (v: unknown) => void = () => {};
    signUp.mockReturnValue(
      new Promise((resolve) => {
        resolveSignUp = resolve;
      }),
    );
    render(<SignUpForm />);
    fillRequiredFields();

    const button = screen.getByRole("button", { name: "Sign up" });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    resolveSignUp({ data: { session: null }, error: null });
    await waitFor(() => expect(signUp).toHaveBeenCalledTimes(1));
  });

  it("the resend button has a cooldown and calls Supabase's resend endpoint", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null });
    resend.mockResolvedValue({ error: null });
    render(<SignUpForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
    await screen.findByText(/check your email/i);

    const resendButton = screen.getByRole("button", { name: "Resend email" });
    fireEvent.click(resendButton);

    await waitFor(() =>
      expect(resend).toHaveBeenCalledWith({
        type: "signup",
        email: "ada@example.test",
        options: { captchaToken: "test-captcha-token" },
      }),
    );
    expect(await screen.findByRole("button", { name: /Resend in \d+s/ })).toBeDisabled();
  });

  it("resend is blocked until its own captcha challenge is solved", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null });
    blockResendAutoResolve = true;
    render(<SignUpForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
    await screen.findByText(/check your email/i);

    // The resend button is hard-disabled until its own captcha resolves --
    // a real click on a disabled button never reaches the handler, so this
    // proves submission is blocked without needing to invoke resend().
    expect(screen.getByRole("button", { name: "Resend email" })).toBeDisabled();
    expect(resend).not.toHaveBeenCalled();
  });

  it("'use a different email' returns to the form", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null });
    render(<SignUpForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
    await screen.findByText(/check your email/i);

    fireEvent.click(screen.getByRole("button", { name: "Use a different email" }));

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
});
