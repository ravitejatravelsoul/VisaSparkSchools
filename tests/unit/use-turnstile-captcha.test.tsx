import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useTurnstileCaptcha } from "@/components/auth/use-turnstile-captcha";

/**
 * Regression tests for the shared CAPTCHA hook every Supabase Auth form
 * (sign-up, sign-in, reset, resend) now uses. Mocks the underlying
 * TurnstileWidget with a fully-controllable stub (rather than the
 * auto-resolving stub used in the form-level tests) so the token/expiry/
 * reset lifecycle can be exercised precisely, including the exact defects
 * this task fixes: stale-token reuse and missing reset-on-failure.
 *
 * `turnstileEnabled: true` is forced below because every test in this file
 * exercises the CAPTCHA-*enabled* lifecycle specifically -- the hook's
 * default-disabled behavior (no NEXT_PUBLIC_TURNSTILE_ENABLED set) has its
 * own dedicated coverage in use-turnstile-captcha-disabled.test.tsx.
 */

vi.mock("@/lib/site-config", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-config")>();
  return { ...actual, featureFlags: { ...actual.featureFlags, turnstileEnabled: true } };
});

let latestOnToken: ((token: string | null) => void) | undefined;
let latestOnStatusChange: ((status: string) => void) | undefined;
const widgetResetSpy = vi.fn();
let latestUnavailableMessage: string | undefined;

vi.mock("@/components/auth/turnstile-widget", () => ({
  TurnstileWidget: forwardRef(function StubTurnstileWidget(
    props: {
      onToken: (t: string | null) => void;
      onStatusChange?: (s: string) => void;
      unavailableMessage?: string;
    },
    ref,
  ) {
    useEffect(() => {
      latestOnToken = props.onToken;
      latestOnStatusChange = props.onStatusChange;
      latestUnavailableMessage = props.unavailableMessage;
    });
    useImperativeHandle(ref, () => ({ reset: widgetResetSpy }));
    return <div data-testid="turnstile-stub" />;
  }),
}));

function Harness({
  onRender,
}: {
  onRender: (captcha: ReturnType<typeof useTurnstileCaptcha>) => void;
}) {
  const captcha = useTurnstileCaptcha("Test flow is unavailable until it is.");
  onRender(captcha);
  return (
    <div>
      {captcha.widget}
      <span data-testid="token">{captcha.token ?? "null"}</span>
      <span data-testid="ready">{String(captcha.isReady)}</span>
      <span data-testid="status">{captcha.status}</span>
    </div>
  );
}

beforeEach(() => {
  latestOnToken = undefined;
  latestOnStatusChange = undefined;
  latestUnavailableMessage = undefined;
  widgetResetSpy.mockClear();
});

describe("useTurnstileCaptcha", () => {
  it("starts with no token and is not ready until the widget resolves one", () => {
    render(<Harness onRender={() => {}} />);
    expect(screen.getByTestId("token")).toHaveTextContent("null");
    expect(screen.getByTestId("ready")).toHaveTextContent("false");
  });

  it("becomes ready only once both a token AND a 'solved' status are reported", () => {
    render(<Harness onRender={() => {}} />);

    act(() => latestOnToken?.("real-token-abc"));
    // Token alone (without the matching "solved" status) must not flip isReady.
    expect(screen.getByTestId("ready")).toHaveTextContent("false");

    act(() => latestOnStatusChange?.("solved"));
    expect(screen.getByTestId("ready")).toHaveTextContent("true");
    expect(screen.getByTestId("token")).toHaveTextContent("real-token-abc");
  });

  it("expired tokens cannot be reused -- an expired status clears readiness even though reset() wasn't called", () => {
    render(<Harness onRender={() => {}} />);
    act(() => latestOnToken?.("real-token-abc"));
    act(() => latestOnStatusChange?.("solved"));
    expect(screen.getByTestId("ready")).toHaveTextContent("true");

    // TurnstileWidget itself calls onToken(null) alongside the
    // expired-callback in real usage -- simulate that exact sequence.
    act(() => {
      latestOnToken?.(null);
      latestOnStatusChange?.("expired");
    });

    expect(screen.getByTestId("token")).toHaveTextContent("null");
    expect(screen.getByTestId("ready")).toHaveTextContent("false");
  });

  it("reset() clears the token, preventing a stale/consumed token from being resubmitted", () => {
    let captured: ReturnType<typeof useTurnstileCaptcha> | undefined;
    render(<Harness onRender={(c) => (captured = c)} />);
    act(() => latestOnToken?.("consumed-token"));
    act(() => latestOnStatusChange?.("solved"));
    expect(screen.getByTestId("ready")).toHaveTextContent("true");

    act(() => captured?.reset());

    expect(widgetResetSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("token")).toHaveTextContent("null");
    expect(screen.getByTestId("ready")).toHaveTextContent("false");
  });

  it("reset() is safe to call even before any token was ever solved (e.g. unconfigured site key)", () => {
    let captured: ReturnType<typeof useTurnstileCaptcha> | undefined;
    render(<Harness onRender={(c) => (captured = c)} />);

    expect(() => act(() => captured?.reset())).not.toThrow();
    expect(screen.getByTestId("token")).toHaveTextContent("null");
    expect(screen.getByTestId("ready")).toHaveTextContent("false");
  });

  it("forwards a caller-supplied unavailableMessage through to the underlying widget", () => {
    render(<Harness onRender={() => {}} />);
    expect(latestUnavailableMessage).toBe("Test flow is unavailable until it is.");
  });
});
