"use client";

import { useSessionStore } from "@/lib/auth/session-store";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { featureFlags } from "@/lib/site-config";
import { LinkButton, Button } from "@/components/ui/button";

/** Sign-in link for guests / not-configured deployments, Sign out for a signed-in session. */
export function AccountNav() {
  const userId = useSessionStore((s) => s.userId);

  if (!featureFlags.supabaseEnabled || !userId) {
    return (
      <LinkButton href="/sign-in" variant="primary" size="sm">
        Sign in
      </LinkButton>
    );
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={() => {
        getSupabaseBrowserClient()
          ?.auth.signOut()
          .then(() => {
            window.location.href = "/";
          });
      }}
    >
      Sign out
    </Button>
  );
}
