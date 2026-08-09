import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/components/auth/auth-form", () => ({
  AuthForm: () => <div data-testid="auth-form" />,
}));

/**
 * (site)/sign-in/page.tsx reads three independent query-param-driven
 * banners: the pre-existing signup-confirmation failure, and the two new
 * password-recovery ones (a failed/expired recovery link, and a completed
 * password update). Server Component -- invoked directly and rendered, same
 * technique as tests/unit/update-password-page.test.tsx.
 */
describe("SignInPage", () => {
  it("shows nothing extra with no query params", async () => {
    const { default: SignInPage } = await import("@/app/(site)/sign-in/page");
    render(await SignInPage({ searchParams: Promise.resolve({}) }));

    expect(screen.getByTestId("auth-form")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("still shows the existing signup-confirmation error banner (unchanged behavior)", async () => {
    const { default: SignInPage } = await import("@/app/(site)/sign-in/page");
    render(await SignInPage({ searchParams: Promise.resolve({ confirmation: "error" }) }));

    expect(screen.getByText(/that confirmation link is invalid/i)).toBeInTheDocument();
  });

  it("shows a recovery-specific error banner with a link to request a new reset link", async () => {
    const { default: SignInPage } = await import("@/app/(site)/sign-in/page");
    render(await SignInPage({ searchParams: Promise.resolve({ recovery: "error" }) }));

    expect(screen.getByText(/that password reset link is invalid/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /request a new one/i })).toHaveAttribute(
      "href",
      "/reset-password",
    );
  });

  it("shows a success banner after a completed password update", async () => {
    const { default: SignInPage } = await import("@/app/(site)/sign-in/page");
    render(await SignInPage({ searchParams: Promise.resolve({ passwordUpdated: "success" }) }));

    expect(screen.getByText(/your password has been updated/i)).toBeInTheDocument();
  });
});
