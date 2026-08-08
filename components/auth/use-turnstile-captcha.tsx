"use client";

import { useCallback, useRef, useState } from "react";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
  type TurnstileStatus,
} from "@/components/auth/turnstile-widget";

export interface UseTurnstileCaptchaResult {
  /** The current, unconsumed Turnstile token -- null until solved, and null again after `reset()`. */
  token: string | null;
  /** The widget's current status (loading/ready/solved/expired/error). */
  status: TurnstileStatus;
  /** True only once a token has been solved and not yet reset/consumed -- the gate for enabling submission. */
  isReady: boolean;
  /** Render this wherever the challenge should appear in the form. */
  widget: React.ReactNode;
  /**
   * Resets the widget and clears the current token. Call this after every
   * completed Auth request that consumed the token (success or failure) if
   * the form stays mounted and could be submitted again -- a Turnstile
   * token is single-use, so failing to reset risks a stale-token resubmit
   * that Supabase will reject anyway, with a confusing error for the user.
   * Safe to call even if the widget isn't mounted (unconfigured site key).
   */
  reset: () => void;
}

/**
 * Shared Turnstile-backed CAPTCHA state for every Supabase Auth form that
 * needs one (sign-up, sign-in, password reset, resend) -- see
 * docs/product-expansion/DECISIONS.md ("CAPTCHA choice") and
 * components/auth/turnstile-widget.tsx for the underlying widget. Centralizing
 * this avoids re-deriving the same token/reset/fail-closed wiring per form.
 */
export function useTurnstileCaptcha(unavailableMessage?: string): UseTurnstileCaptchaResult {
  const widgetRef = useRef<TurnstileWidgetHandle>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<TurnstileStatus>("loading");

  const reset = useCallback(() => {
    widgetRef.current?.reset();
    // TurnstileWidget's own reset() already clears the token via onToken(null)
    // when the widget is actually mounted and rendered -- this is a
    // deliberate, redundant guarantee so callers can always call reset()
    // unconditionally (including when the site key is unconfigured, or the
    // Cloudflare script hasn't finished loading, and the ref's guarded
    // reset() is a no-op) without needing to check the widget's state first.
    setToken(null);
  }, []);

  return {
    token,
    status,
    isReady: status === "solved" && token !== null,
    widget: (
      <TurnstileWidget
        ref={widgetRef}
        onToken={setToken}
        onStatusChange={setStatus}
        unavailableMessage={unavailableMessage}
      />
    ),
    reset,
  };
}
