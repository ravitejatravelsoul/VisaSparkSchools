"use client";

import { useCallback, useRef, useState } from "react";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
  type TurnstileStatus,
} from "@/components/auth/turnstile-widget";
import { featureFlags } from "@/lib/site-config";

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

  // Hooks above run unconditionally on every render (featureFlags.turnstileEnabled
  // is a build-time constant, so this branch never changes between renders,
  // and the Rules of Hooks are satisfied regardless). When the feature is
  // off, this is an explicit disabled state, not a fake "solved" CAPTCHA:
  // no script loads, no widget renders, no token is ever produced, and
  // `isReady` is unconditionally true so callers never block submission on
  // a challenge this deployment isn't running. `token` stays null, so every
  // call site's `captchaToken: captcha.token ?? undefined` naturally omits
  // the field entirely -- never a fake or empty token sent to Supabase.
  if (!featureFlags.turnstileEnabled) {
    return {
      token: null,
      status: "disabled",
      isReady: true,
      widget: null,
      reset: () => {},
    };
  }

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
