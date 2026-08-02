"use client";

import { create } from "zustand";

interface SessionStore {
  userId: string | null;
  email: string | null;
  setSession: (session: { userId: string; email: string | null } | null) => void;
}

/** Just enough session state for UI (sign-in/out controls) -- not learner data, never persisted or synced. */
export const useSessionStore = create<SessionStore>((set) => ({
  userId: null,
  email: null,
  setSession: (session) => set({ userId: session?.userId ?? null, email: session?.email ?? null }),
}));
