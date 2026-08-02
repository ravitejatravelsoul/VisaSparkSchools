"use client";

import { create } from "zustand";

export type SyncStatus = "idle" | "syncing" | "synced" | "error";

interface SyncStatusStore {
  status: SyncStatus;
  lastSyncedAt: string | null;
  lastError: string | null;
  setSyncing: () => void;
  setSynced: (at: string) => void;
  setError: (message: string) => void;
  reset: () => void;
}

/**
 * Small, separate store (not part of ProgressState) so sync status can be
 * shown in the UI (see the dashboard's "Sync status" section) without it
 * ever being something that gets persisted or merged itself -- it's a
 * description of *this device's* current sync attempt, not learner data.
 */
export const useSyncStatusStore = create<SyncStatusStore>((set) => ({
  status: "idle",
  lastSyncedAt: null,
  lastError: null,
  setSyncing: () => set({ status: "syncing", lastError: null }),
  setSynced: (at) => set({ status: "synced", lastSyncedAt: at, lastError: null }),
  setError: (message) => set({ status: "error", lastError: message }),
  reset: () => set({ status: "idle", lastSyncedAt: null, lastError: null }),
}));
