import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useTurnstileCaptcha } from "@/components/auth/use-turnstile-captcha";

/**
 * Coverage for the CAPTCHA-*disabled* path (this release's default): no
 * NEXT_PUBLIC_TURNSTILE_ENABLED is set in the test environment, so
 * featureFlags.turnstileEnabled is false without any mocking here -- this
 * file deliberately does NOT mock @/lib/site-config, to prove the hook's
 * real, unmocked default is disabled. The enabled lifecycle has its own
 * coverage in use-turnstile-captcha.test.tsx (which forces the flag on).
 *
 * If @/components/auth/turnstile-widget's module ever threw on import or on
 * render, these tests would still fail even with the widget short-circuited
 * away -- so this also proves the widget is never even mounted when
 * disabled, not just hidden.
 */

function Harness({
  onRender,
}: {
  onRender?: (captcha: ReturnType<typeof useTurnstileCaptcha>) => void;
}) {
  const captcha = useTurnstileCaptcha("Test flow is unavailable until it is.");
  onRender?.(captcha);
  return (
    <div>
      {captcha.widget}
      <span data-testid="token">{captcha.token ?? "null"}</span>
      <span data-testid="ready">{String(captcha.isReady)}</span>
      <span data-testid="status">{captcha.status}</span>
    </div>
  );
}

describe("useTurnstileCaptcha (disabled -- the default)", () => {
  it("reports an explicit 'disabled' status, not a fake 'solved' one", () => {
    render(<Harness />);
    expect(screen.getByTestId("status")).toHaveTextContent("disabled");
  });

  it("is ready immediately, with no token required, so callers never block submission on it", () => {
    render(<Harness />);
    expect(screen.getByTestId("ready")).toHaveTextContent("true");
    expect(screen.getByTestId("token")).toHaveTextContent("null");
  });

  it("renders no widget at all -- not the widget, not a configuration-error message", () => {
    render(<Harness />);
    expect(screen.queryByTestId("turnstile-stub")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByText(/security check/i)).not.toBeInTheDocument();
  });

  it("reset() is a safe no-op", () => {
    let captured: ReturnType<typeof useTurnstileCaptcha> | undefined;
    render(<Harness onRender={(c) => (captured = c)} />);
    expect(() => captured?.reset()).not.toThrow();
  });
});

describe("featureFlags.turnstileEnabled parsing", () => {
  const ORIGINAL = process.env.NEXT_PUBLIC_TURNSTILE_ENABLED;

  afterEach(() => {
    if (ORIGINAL === undefined) delete process.env.NEXT_PUBLIC_TURNSTILE_ENABLED;
    else process.env.NEXT_PUBLIC_TURNSTILE_ENABLED = ORIGINAL;
    vi.resetModules();
  });

  async function readFlag(value: string | undefined) {
    vi.resetModules();
    if (value === undefined) delete process.env.NEXT_PUBLIC_TURNSTILE_ENABLED;
    else process.env.NEXT_PUBLIC_TURNSTILE_ENABLED = value;
    const { featureFlags } = await import("@/lib/site-config");
    return featureFlags.turnstileEnabled;
  }

  it("is disabled when the variable is missing", async () => {
    expect(await readFlag(undefined)).toBe(false);
  });

  it("is disabled when the variable is the literal string 'false'", async () => {
    expect(await readFlag("false")).toBe(false);
  });

  it("is enabled only for the exact literal string 'true'", async () => {
    expect(await readFlag("true")).toBe(true);
  });

  it("does not accidentally enable for near-miss values", async () => {
    for (const value of ["1", "TRUE", "True", "yes", "on", ""]) {
      expect(await readFlag(value), `value ${JSON.stringify(value)} must not enable CAPTCHA`).toBe(
        false,
      );
    }
  });
});
