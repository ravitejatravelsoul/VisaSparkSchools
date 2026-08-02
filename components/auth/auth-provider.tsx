"use client";

import { useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { featureFlags } from "@/lib/site-config";
import { handleSignedIn, handleSignOut } from "@/lib/sync/orchestrator";

/**
 * Drives the guest-to-account sync lifecycle from Supabase auth state
 * changes. No visual output -- mounted once in app/(site)/layout.tsx,
 * alongside <ProgressHydrator />, which must run first so a guest snapshot
 * is available by the time an auth event fires (see that component).
 *
 * All of the actual orchestration (generation-guarded staleness checks,
 * storage-key switching, guest-key disposal, retry) lives in
 * lib/sync/orchestrator.ts, shared with the dashboard's manual "Retry sync"
 * button -- this component is just the event source.
 */
export function AuthProvider() {
  useEffect(() => {
    if (!featureFlags.supabaseEnabled) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      if (!user) {
        handleSignOut();
        return;
      }
      handleSignedIn(supabase, user.id, user.email ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  return null;
}
