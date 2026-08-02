import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { AuthProvider } from "@/components/auth/auth-provider";
import { retrySync, __resetSyncOrchestratorForTests } from "@/lib/sync/orchestrator";
import { useProgressStore, getActiveStorageKey } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { useSyncStatusStore } from "@/lib/sync/sync-status-store";
import { createEmptyProgress, type ProgressState } from "@/lib/learning/types";
import { STORAGE_KEY, perUserStorageKey } from "@/lib/learning/storage";

vi.mock("@/lib/site-config", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-config")>();
  return { ...actual, featureFlags: { ...actual.featureFlags, supabaseEnabled: true } };
});

type AuthCallback = (
  event: string,
  session: { user: { id: string; email: string | null } } | null,
) => void;

let authCallback: AuthCallback | undefined;
const unsubscribe = vi.fn();

vi.mock("@/lib/supabase/browser", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      onAuthStateChange: (cb: AuthCallback) => {
        authCallback = cb;
        return { data: { subscription: { unsubscribe } } };
      },
    },
  }),
}));

// Deferred, controllable sync so tests can simulate slow network responses,
// out-of-order resolution, and failures -- exactly the scenarios the
// generation guard and retry path in lib/sync/orchestrator.ts exist to
// handle correctly.
const pending = new Map<
  string,
  { resolve: (v: ProgressState) => void; reject: (e: Error) => void }
>();
vi.mock("@/lib/sync/lifecycle", () => ({
  syncGuestToAccount: vi.fn(
    (_client: unknown, userId: string, guestState: ProgressState) =>
      new Promise<ProgressState>((resolve, reject) => {
        pending.set(userId, { resolve: () => resolve(guestState), reject });
      }),
  ),
}));

function resolveSync(userId: string) {
  pending.get(userId)?.resolve(createEmptyProgress());
  pending.delete(userId);
}

function rejectSync(userId: string, message = "network error") {
  pending.get(userId)?.reject(new Error(message));
  pending.delete(userId);
}

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
  useSessionStore.setState({ userId: null, email: null });
  useSyncStatusStore.getState().reset();
  __resetSyncOrchestratorForTests();
  authCallback = undefined;
  pending.clear();
  vi.clearAllMocks();
});

describe("AuthProvider / sync orchestrator", () => {
  it("sign-in switches persistence to the per-user cache and clears the shared guest key", async () => {
    useProgressStore.setState((s) => ({
      state: { ...s.state, lessonStatus: { "lesson-a": "completed" } },
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(useProgressStore.getState().state));

    render(<AuthProvider />);
    authCallback!("SIGNED_IN", { user: { id: "user-1", email: "a@example.com" } });
    resolveSync("user-1");
    await vi.waitFor(() => expect(useSyncStatusStore.getState().status).toBe("synced"));

    expect(useSessionStore.getState().userId).toBe("user-1");
    expect(getActiveStorageKey()).toBe(perUserStorageKey("user-1"));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem(perUserStorageKey("user-1"))).not.toBeNull();
  });

  it("sign-out reverts to the guest key and clears the session -- the signed-in account's data never leaks through", async () => {
    render(<AuthProvider />);
    authCallback!("SIGNED_IN", { user: { id: "user-1", email: null } });
    resolveSync("user-1");
    await vi.waitFor(() => expect(useSyncStatusStore.getState().status).toBe("synced"));

    // Simulate account-specific activity while signed in.
    useProgressStore.getState().setDailyGoal(99);
    expect(useProgressStore.getState().state.dailyGoalMinutes).toBe(99);

    authCallback!("SIGNED_OUT", null);

    expect(useSessionStore.getState().userId).toBeNull();
    expect(getActiveStorageKey()).toBe(STORAGE_KEY);
    // Guest key was never written to during the signed-in session (it was
    // cleared at sign-in), so post-signout state is a fresh guest state --
    // account A's dailyGoalMinutes: 99 must not be visible here.
    expect(useProgressStore.getState().state.dailyGoalMinutes).toBe(20);
  });

  it("a stale sync response from a previous sign-in is discarded if a different account signs in first", async () => {
    render(<AuthProvider />);

    authCallback!("SIGNED_IN", { user: { id: "user-A", email: null } });
    // user-A's sync is still in flight (not resolved) when user-B signs in.
    authCallback!("SIGNED_IN", { user: { id: "user-B", email: null } });
    resolveSync("user-B");
    await vi.waitFor(() => expect(useSyncStatusStore.getState().status).toBe("synced"));
    expect(getActiveStorageKey()).toBe(perUserStorageKey("user-B"));

    // Now the stale user-A promise resolves late -- it must be ignored.
    resolveSync("user-A");
    await new Promise((r) => setTimeout(r, 10));

    expect(getActiveStorageKey()).toBe(perUserStorageKey("user-B"));
    expect(useSessionStore.getState().userId).toBe("user-B");
  });

  it("a stale sync response is discarded if the user signs out before it resolves", async () => {
    render(<AuthProvider />);
    authCallback!("SIGNED_IN", { user: { id: "user-1", email: null } });
    authCallback!("SIGNED_OUT", null);

    resolveSync("user-1");
    await new Promise((r) => setTimeout(r, 10));

    // The late resolution must not re-establish a signed-in state or
    // per-user storage key after the learner already signed out.
    expect(useSessionStore.getState().userId).toBeNull();
    expect(getActiveStorageKey()).toBe(STORAGE_KEY);
  });

  it("a failed sign-in sync does not persist the guest snapshot into the account's per-user cache key", async () => {
    // Regression test: an earlier version of the failure handler switched
    // the active storage key to the per-user key AND called replaceState()
    // with the (unmerged) guest snapshot, which silently overwrote any
    // real, previously-synced data already cached there. The fix leaves the
    // active key untouched on failure -- there is nothing to persist, since
    // the in-memory store already IS the pre-sync snapshot.
    window.localStorage.setItem(
      perUserStorageKey("user-1"),
      JSON.stringify({ ...createEmptyProgress(), dailyGoalMinutes: 77 }),
    );

    render(<AuthProvider />);
    authCallback!("SIGNED_IN", { user: { id: "user-1", email: null } });
    rejectSync("user-1");
    await vi.waitFor(() => expect(useSyncStatusStore.getState().status).toBe("error"));

    const cached = JSON.parse(window.localStorage.getItem(perUserStorageKey("user-1"))!);
    expect(cached.dailyGoalMinutes).toBe(77);
  });

  it("retrySync no-ops once the account is no longer the active signed-in session", async () => {
    render(<AuthProvider />);
    authCallback!("SIGNED_IN", { user: { id: "user-1", email: null } });
    rejectSync("user-1");
    await vi.waitFor(() => expect(useSyncStatusStore.getState().status).toBe("error"));

    authCallback!("SIGNED_OUT", null);
    expect(useSyncStatusStore.getState().status).toBe("idle");

    retrySync("user-1"); // stale call from an unmounted/leftover component instance
    await new Promise((r) => setTimeout(r, 10));

    // Must not flip back to "syncing"/"synced" or re-establish a session
    // after the learner already signed out.
    expect(useSyncStatusStore.getState().status).toBe("idle");
    expect(useSessionStore.getState().userId).toBeNull();
    expect(getActiveStorageKey()).toBe(STORAGE_KEY);
  });

  it("a successful retry switches the storage key and clears the guest key, exactly like a successful initial sync", async () => {
    // Regression test: an earlier version of retrySync's success handler
    // never called setActiveStorageKey/clearProgressAt, so a successful
    // retry silently kept writing the account's merged progress into the
    // shared guest localStorage key on every subsequent mutation.
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(createEmptyProgress()));

    render(<AuthProvider />);
    authCallback!("SIGNED_IN", { user: { id: "user-1", email: null } });
    rejectSync("user-1");
    await vi.waitFor(() => expect(useSyncStatusStore.getState().status).toBe("error"));

    retrySync("user-1");
    resolveSync("user-1");
    await vi.waitFor(() => expect(useSyncStatusStore.getState().status).toBe("synced"));

    expect(getActiveStorageKey()).toBe(perUserStorageKey("user-1"));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem(perUserStorageKey("user-1"))).not.toBeNull();
  });

  it("a stale retry response is discarded if the user signs out before it resolves", async () => {
    render(<AuthProvider />);
    authCallback!("SIGNED_IN", { user: { id: "user-1", email: null } });
    rejectSync("user-1");
    await vi.waitFor(() => expect(useSyncStatusStore.getState().status).toBe("error"));

    retrySync("user-1");
    authCallback!("SIGNED_OUT", null);
    resolveSync("user-1"); // resolves after sign-out already happened

    await new Promise((r) => setTimeout(r, 10));

    expect(useSessionStore.getState().userId).toBeNull();
    expect(getActiveStorageKey()).toBe(STORAGE_KEY);
  });
});
