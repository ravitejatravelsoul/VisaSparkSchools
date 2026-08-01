"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Deliberate: next-themes can't know the resolved theme until after
    // hydration, so this mirrors the library's documented pattern for
    // avoiding a server/client mismatch on the very first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--color-border-strong) text-(--color-ink) hover:bg-(--color-canvas)"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      title="Toggle light / dark theme"
    >
      {!mounted ? (
        <span className="h-4 w-4" aria-hidden="true" />
      ) : isDark ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4.22 4.22a1 1 0 0 1 1.42 0l.7.71a1 1 0 1 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42Zm14.36 14.36a1 1 0 0 1 1.42 0l.7.71a1 1 0 1 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42ZM1 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 19.78a1 1 0 0 1 0-1.42l.71-.7a1 1 0 1 1 1.41 1.41l-.7.71a1 1 0 0 1-1.42 0ZM18.58 5.63a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.42l-.7.7a1 1 0 0 1-1.42 0Z" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-4.508 0-8.16-3.653-8.16-8.16 0-1.22.27-2.378.753-3.416a.75.75 0 0 0-.918-1.021A10.5 10.5 0 1 0 21.86 13.93a.75.75 0 0 0-1.118-.884Z" />
        </svg>
      )}
    </button>
  );
}
