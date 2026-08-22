import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignUpForm } from "@/components/auth/sign-up-form";

/**
 * Coverage for sign-up/resend with CAPTCHA OFF (this release's default) --
 * deliberately does NOT mock turnstileEnabled or the TurnstileWidget module,
 * to prove the real, unmocked default behaves correctly: no widget, no
 * captchaToken, no submission gating. The CAPTCHA-enabled lifecycle has its
 * own coverage in sign-up-form.test.tsx.
 */

vi.mock("@/lib/site-config", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-config")>();
  return { ...actual, featureFlags: { ...actual.featureFlags, supabaseEnabled: true } };
});

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
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
});

describe("SignUpForm with CAPTCHA disabled", () => {
  it("renders no Turnstile widget anywhere in the form", () => {
    render(<SignUpForm />);
    expect(screen.queryByTestId("turnstile-stub")).not.toBeInTheDocument();
    expect(screen.queryByText(/security check/i)).not.toBeInTheDocument();
  });

  it("sign-up submits without a captchaToken field, gated only by ordinary field validation", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null });
    render(<SignUpForm />);
    fillRequiredFields();

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => expect(signUp).toHaveBeenCalledTimes(1));
    const call = signUp.mock.calls[0][0];
    expect(call.email).toBe("ada@example.test");
    expect(call.options.captchaToken).toBeUndefined();
    expect(call.options.data.first_name).toBe("Ada");

    expect(
      await screen.findByText(/check your email to finish creating your account/i),
    ).toBeInTheDocument();
  });

  it("still blocks submission when required fields are missing -- ordinary validation, not CAPTCHA", async () => {
    render(<SignUpForm />);
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(await screen.findByText(/please fix the following/i)).toBeInTheDocument();
    expect(signUp).not.toHaveBeenCalled();
    // No CAPTCHA-specific validation message should appear among the errors.
    expect(screen.queryByText(/complete the security check/i)).not.toBeInTheDocument();
  });

  it("resend submits without a captchaToken field", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null });
    resend.mockResolvedValue({ error: null });
    render(<SignUpForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
    await screen.findByText(/check your email/i);

    fireEvent.click(screen.getByRole("button", { name: "Resend email" }));

    await waitFor(() => expect(resend).toHaveBeenCalledTimes(1));
    expect(resend).toHaveBeenCalledWith({
      type: "signup",
      email: "ada@example.test",
      options: { captchaToken: undefined },
    });
  });

  it("the resend button is not disabled by any CAPTCHA-readiness gate", async () => {
    signUp.mockResolvedValue({ data: { session: null }, error: null });
    render(<SignUpForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
    await screen.findByText(/check your email/i);

    expect(screen.getByRole("button", { name: "Resend email" })).not.toBeDisabled();
  });
});
