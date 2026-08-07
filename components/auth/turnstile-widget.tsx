"use client";

import { useEffect, useId, useImperativeHandle, useRef, useState, forwardRef } from "react";
import Script from "next/script";
import { turnstileSiteKey } from "@/lib/site-config";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export type TurnstileStatus = "loading" | "ready" | "solved" | "expired" | "error";

export interface TurnstileWidgetHandle {
  reset: () => void;
}

/**
 * Cloudflare Turnstile via explicit rendering (not the implicit
 * `cf-turnstile` div-attribute form) so the caller gets a real token
 * callback plus expiry/error callbacks to drive accessible status text --
 * see docs/product-expansion/DECISIONS.md ("CAPTCHA choice"). The secret key
 * lives only in the Supabase Auth dashboard; this component only ever
 * touches the public site key.
 */
export const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  { onToken: (token: string | null) => void; onStatusChange?: (status: TurnstileStatus) => void }
>(function TurnstileWidget({ onToken, onStatusChange }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatusState] = useState<TurnstileStatus>("loading");
  const domId = useId();

  const setStatus = (next: TurnstileStatus) => {
    setStatusState(next);
    onStatusChange?.(next);
  };

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
        onToken(null);
        setStatus("ready");
      }
    },
  }));

  useEffect(() => {
    if (!scriptReady || !containerRef.current || !turnstileSiteKey) return;
    // Guard against StrictMode/re-render double-invoking render() on the same container.
    if (widgetIdRef.current) return;
    if (!window.turnstile) return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: turnstileSiteKey,
      callback: (token) => {
        onToken(token);
        setStatus("solved");
      },
      "expired-callback": () => {
        onToken(null);
        setStatus("expired");
      },
      "error-callback": () => {
        onToken(null);
        setStatus("error");
      },
      theme: "auto",
    });
    setStatus("ready");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptReady]);

  if (!turnstileSiteKey) {
    return (
      <p role="alert" className="text-sm text-(--color-danger)">
        Security check is not configured for this deployment. Sign-up is unavailable until it is.
      </p>
    );
  }

  return (
    <div>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <p className="mb-2 text-xs text-(--color-ink-faint)">
        Security check — please confirm you&apos;re human.
      </p>
      <div id={`turnstile-${domId}`} ref={containerRef} />
      <p aria-live="polite" className="sr-only">
        {status === "loading" && "Loading security check…"}
        {status === "solved" && "Security check passed."}
        {status === "expired" && "Security check expired, please try again."}
        {status === "error" && "Security check failed to load, please try again."}
      </p>
      {status === "expired" && (
        <p className="mt-1 text-sm text-(--color-danger)">
          The security check expired — please complete it again.
        </p>
      )}
      {status === "error" && (
        <p className="mt-1 text-sm text-(--color-danger)">
          The security check couldn&apos;t load. Check your connection and try again.
        </p>
      )}
    </div>
  );
});
