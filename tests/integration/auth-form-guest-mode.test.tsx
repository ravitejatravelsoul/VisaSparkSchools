import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthForm } from "@/components/auth/auth-form";
import { featureFlags } from "@/lib/site-config";

/**
 * Companion to auth-form.test.tsx: verifies the Supabase-disabled (guest)
 * branch, which that file's top-level `supabaseEnabled: true` mock can't
 * also exercise (vi.mock is hoisted and file-scoped). Deliberately does NOT
 * mock @/lib/site-config -- this test environment has no Supabase env vars
 * configured (see tests/setup.ts), so featureFlags.supabaseEnabled is
 * already false by default, the same as this platform's real guest-mode
 * deployments. Confirms no router navigation happens and no live form is
 * rendered when accounts aren't configured.
 */

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("AuthForm (Supabase disabled)", () => {
  it("this test environment genuinely has Supabase disabled by default", () => {
    expect(featureFlags.supabaseEnabled).toBe(false);
  });

  it("renders the guest-mode explanation instead of a live form, and never touches the router", () => {
    render(<AuthForm mode="sign-in" />);

    expect(screen.getByText(/accounts aren.t configured for this deployment/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue as a guest/i })).toHaveAttribute(
      "href",
      "/paths",
    );
    expect(push).not.toHaveBeenCalled();
  });
});
