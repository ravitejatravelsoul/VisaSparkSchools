"use client";

import { useEffect } from "react";
import { useProgressStore } from "@/lib/learning/store";

/** Loads guest progress from localStorage once, on the client, after mount. */
export function ProgressHydrator() {
  useEffect(() => {
    useProgressStore.getState().hydrate();
  }, []);
  return null;
}
