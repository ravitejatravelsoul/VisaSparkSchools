"use client";

import { useSessionStore } from "@/lib/auth/session-store";
import { featureFlags } from "@/lib/site-config";
import { LinkButton } from "@/components/ui/button";

/**
 * Auth-aware call-to-action for the mobile header bar (hidden at `sm` and up,
 * where the full-width Dashboard button + AccountNav take over). Shows
 * exactly one action -- never both -- so a signed-in learner isn't shown a
 * stale "Sign in" button, and a guest isn't shown a Dashboard link that would
 * just bounce them to sign-in.
 */
export function MobileHeaderCta() {
  const userId = useSessionStore((s) => s.userId);
  const signedIn = featureFlags.supabaseEnabled && Boolean(userId);

  if (signedIn) {
    return (
      <LinkButton
        href="/dashboard"
        variant="secondary"
        size="sm"
        className="min-h-11 px-2.5 text-xs sm:hidden"
      >
        Dashboard
      </LinkButton>
    );
  }

  return (
    <LinkButton
      href="/sign-in"
      variant="primary"
      size="sm"
      className="min-h-11 px-2.5 text-xs sm:hidden"
    >
      Sign in
    </LinkButton>
  );
}
