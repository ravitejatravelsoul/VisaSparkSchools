"use client";

import { useEffect, useState } from "react";

/** Persists a learner's in-progress code per exercise/example id across reloads. */
export function usePersistedCode(id: string, starterCode: string) {
  const storageKey = `visasparkschools:code:${id}`;
  // Pre-rename key (see lib/learning/storage.ts for the same pattern applied
  // to overall progress) -- read as a fallback so in-progress exercise code
  // typed before the CodeWise -> VisaSparkSchools rename isn't lost.
  const legacyStorageKey = `codewise:code:${id}`;
  const [code, setCode] = useState(starterCode);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Deliberately setting state from an effect: localStorage is
    // client-only, so the server/first-client render must use starterCode
    // (avoiding a hydration mismatch), then this effect corrects it from
    // whatever the learner had saved, once, after mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved !== null) {
        setCode(saved);
      } else {
        const legacy = window.localStorage.getItem(legacyStorageKey);
        if (legacy !== null) {
          setCode(legacy);
          window.localStorage.setItem(storageKey, legacy);
        } else {
          setCode(starterCode);
        }
      }
    } catch {
      setCode(starterCode);
    }
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, legacyStorageKey]);

  const update = (next: string) => {
    setCode(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Non-fatal: the editor still works for this session even if persistence fails.
    }
  };

  return { code, setCode: update, loaded };
}
