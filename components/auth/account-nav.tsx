"use client";

import { useRouter } from "next/navigation";
import { useSessionStore } from "@/lib/auth/session-store";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { featureFlags } from "@/lib/site-config";
import { LinkButton, Button } from "@/components/ui/button";

/** Sign-in link for guests / not-configured deployments, Sign out for a signed-in session. */
export function AccountNav() {
  const router = useRouter();
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
        // The actual sign-out cleanup (session/store reset, storage-key
        // switch back to guest, generation bump) is driven entirely by
        // AuthProvider's onAuthStateChange listener, not by this
        // navigation -- see lib/sync/orchestrator.ts's handleSignOut and
        // tests/integration/auth-provider.test.tsx. This push is only
        // about moving the learner off whatever page they were on (e.g.
        // /dashboard or /profile) back to the homepage; a full reload was
        // never required for correctness.
        getSupabaseBrowserClient()
          ?.auth.signOut()
          .then(() => {
            router.push("/");
          });
      }}
    >
      Sign out
    </Button>
  );
}
