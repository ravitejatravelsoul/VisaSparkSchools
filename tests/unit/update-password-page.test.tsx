import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const getUser = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: () =>
    Promise.resolve({ auth: { getUser: (...a: unknown[]) => getUser(...a) } }),
}));

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

vi.mock("@/components/auth/update-password-form", () => ({
  UpdatePasswordForm: () => <div data-testid="update-password-form" />,
}));

beforeEach(() => {
  getUser.mockReset();
  supabaseEnabled = true;
});

/**
 * This is a Server Component (app/(site)/update-password/page.tsx) -- its
 * whole purpose is deciding, server-side, whether a valid recovery session
 * exists *before* the password form is ever sent to the browser. Invoking
 * the async component function directly and rendering its resolved output
 * (the same technique tests/unit/canonical-urls.test.ts uses for other
 * (site) pages) exercises that real gating logic, unlike an e2e test stuck
 * mocking the whole verifyOtp/cookie round trip just to reach this page.
 */
describe("UpdatePasswordPage", () => {
  it("renders the password form when a valid recovery session exists", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    const { default: UpdatePasswordPage } = await import("@/app/(site)/update-password/page");
    render(await UpdatePasswordPage());

    expect(screen.getByTestId("update-password-form")).toBeInTheDocument();
  });

  it("never renders the password form when no session exists -- shows a safe invalid-link message instead", async () => {
    getUser.mockResolvedValue({ data: { user: null } });
    const { default: UpdatePasswordPage } = await import("@/app/(site)/update-password/page");
    render(await UpdatePasswordPage());

    expect(screen.queryByTestId("update-password-form")).not.toBeInTheDocument();
    expect(screen.getByText(/invalid or has expired/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /request a new reset link/i })).toHaveAttribute(
      "href",
      "/reset-password",
    );
  });

  it("shows the guest-mode message and never calls Supabase when it isn't configured", async () => {
    supabaseEnabled = false;
    const { default: UpdatePasswordPage } = await import("@/app/(site)/update-password/page");
    render(await UpdatePasswordPage());

    expect(screen.queryByTestId("update-password-form")).not.toBeInTheDocument();
    expect(screen.getByText(/aren.?t configured for this deployment/i)).toBeInTheDocument();
    expect(getUser).not.toHaveBeenCalled();
  });
});
