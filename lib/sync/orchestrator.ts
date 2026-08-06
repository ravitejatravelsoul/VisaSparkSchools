"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { setActiveStorageKey, useProgressStore } from "@/lib/learning/store";
import {
  loadProgressFrom,
  saveProgressTo,
  clearProgressAt,
  mergeProgress,
  STORAGE_KEY,
  perUserStorageKey,
  setLastUserId,
} from "@/lib/learning/storage";
import { useSessionStore } from "@/lib/auth/session-store";
import { useSyncStatusStore } from "@/lib/sync/sync-status-store";
import { syncGuestToAccount } from "@/lib/sync/lifecycle";
import type { ProgressState } from "@/lib/learning/types";

type Client = SupabaseClient<Database>;

/**
 * Single source of truth for "which sign-in attempt is current." Every
 * sign-out or new sign-in bumps this; any async sync response whose token
 * no longer matches the current generation is discarded before it can touch
 * storage, the progress store, or sync status (see `runSync` below).
 *
 * Deliberately module-scoped, not component state: `AuthProvider`'s
 * auth-state-change listener and the dashboard's manual "Retry sync" button
 * are two independent call sites that both need to agree on whether a given
 * sync attempt is still relevant. A React ref local to `AuthProvider` can't
 * be reached from a plain exported `retrySync(userId)` function, which is
 * exactly the gap that let a stale retry silently re-apply an old account's
 * data after sign-out in an earlier version of this file -- see
 * tests/integration/auth-provider.test.tsx and PROJECT_STATUS.md's Phase 4
 * checkpoint audit.
 */
let generation = 0;
let activeUserId: string | null = null;

function bumpGeneration(): number {
  generation += 1;
  return generation;
}

/** Test-only: reset module state between test cases (module-level state otherwise persists across tests in the same file). */
export function __resetSyncOrchestratorForTests() {
  generation = 0;
  activeUserId = null;
}

/** Handles a SIGNED_OUT (or no-session) auth event. Always safe to call repeatedly. */
export function handleSignOut() {
  bumpGeneration();
  activeUserId = null;
  useSessionStore.getState().setSession(null);
  useSyncStatusStore.getState().reset();
  setActiveStorageKey(STORAGE_KEY);
  setLastUserId(null);
  useProgressStore.getState().replaceState(loadProgressFrom(STORAGE_KEY));
}

/**
 * Handles a SIGNED_IN (or equivalent) auth event for `userId`. No-ops if
 * this account is already the active one in this tab (e.g. a token refresh
 * firing another auth event) -- only a genuinely new sign-in re-runs the
 * guest-to-account merge lifecycle.
 */
export function handleSignedIn(supabase: Client, userId: string, email: string | null) {
  useSessionStore.getState().setSession({ userId, email });
  if (activeUserId === userId) return;

  activeUserId = userId;
  const token = bumpGeneration();
  useSyncStatusStore.getState().setSyncing();

  // Step 1 of the guest-to-account sync lifecycle: snapshot whatever is
  // currently active (guest data, or a previous account's cache if this
  // fires again mid-session) BEFORE touching any storage key.
  const snapshot = useProgressStore.getState().state;

  runSync(supabase, userId, snapshot, token);
}

/**
 * Re-runs the sync lifecycle for the currently signed-in user; shares the
 * same generation guard and the same success/failure handling as
 * `handleSignedIn`, so a successful retry can never skip the "switch to the
 * per-user cache key and clear the guest key" step, and a retry that
 * resolves after the learner has since signed out (or switched accounts)
 * can never apply its result.
 */
export function retrySync(userId: string) {
  if (activeUserId !== userId) return; // no longer the active account -- nothing to retry
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;
  const token = bumpGeneration();
  useSyncStatusStore.getState().setSyncing();
  const snapshot = useProgressStore.getState().state;
  runSync(supabase, userId, snapshot, token);
}

function runSync(supabase: Client, userId: string, snapshot: ProgressState, token: number) {
  syncGuestToAccount(supabase, userId, snapshot)
    .then((merged) => {
      if (generation !== token) return; // stale: a sign-out/switch happened meanwhile
      const key = perUserStorageKey(userId);
      setActiveStorageKey(key);
      // Remember this device's active account so the *next* page load's
      // very first (synchronous, pre-auth-check) hydration reads this
      // per-account cache instead of defaulting to the shared guest key --
      // see getLastUserId's doc comment in lib/learning/storage.ts. Only set
      // after a successful sync, mirroring setActiveStorageKey above: before
      // the first successful sync, a reload must still see the guest key
      // (there's nothing else to see yet).
      setLastUserId(userId);
      // This sync's own pull/merge/push round trip can take long enough for
      // the learner to keep working in the meantime (e.g. completing another
      // lesson right after a page load re-kicks this cycle -- see
      // handleSignedIn's doc comment on why this reruns every mount). The
      // live store may already hold newer local mutations than the
      // `snapshot` this chain started from, so fold the current live state
      // in with the same monotonic merge rather than blindly overwriting it
      // -- otherwise a slow sync silently rolls back progress made during
      // its own request. See tests/unit/sync-lifecycle.test.ts.
      const finalState = mergeProgress(useProgressStore.getState().state, merged);
      saveProgressTo(key, finalState);
      // The guest key's contents are now safely folded into this account --
      // clear it so they can never be folded into a *different* account
      // that signs in later on this device.
      clearProgressAt(STORAGE_KEY);
      useProgressStore.getState().replaceState(finalState);
      useSyncStatusStore.getState().setSynced(new Date().toISOString());
    })
    .catch((error: unknown) => {
      if (generation !== token) return; // stale
      useSyncStatusStore
        .getState()
        .setError(error instanceof Error ? error.message : "Sync failed");
      // Deliberately do NOT touch the active storage key or call
      // replaceState here: the in-memory store already IS `snapshot` (it
      // was read before this attempt started and nothing has changed it
      // since), so there's nothing to restore -- and persisting `snapshot`
      // to the account's per-user cache key would silently clobber any
      // real, previously-synced data already cached there from an earlier
      // successful sync on this device.
    });
}
