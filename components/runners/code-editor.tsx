"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-(--color-ink-faint)">
      Loading editor…
    </div>
  ),
});

const languageMap: Record<string, string> = {
  html: "html",
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  sql: "sql",
};

export function CodeEditor({
  value,
  onChange,
  language,
  ariaLabel,
  height = 320,
}: {
  value: string;
  onChange: (value: string) => void;
  language: string;
  ariaLabel: string;
  height?: number;
}) {
  const [timedOut, setTimedOut] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const timer = window.setTimeout(() => setTimedOut(true), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  if (timedOut) {
    return (
      <div style={{ height }} className="flex flex-col">
        <p className="mb-1 text-xs text-(--color-ink-faint)">
          Using a plain-text editor (the visual code editor didn&apos;t load).
        </p>
        <textarea
          aria-label={ariaLabel}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="min-h-0 flex-1 resize-none rounded-lg border border-(--color-border-strong) bg-(--color-code-bg) p-3 font-mono text-sm text-(--color-ink)"
        />
      </div>
    );
  }

  return (
    <div>
      <p className="sr-only">
        Code editor. Press Escape then Tab to leave the editor if keyboard focus becomes trapped.
        Press Control+Shift+M inside the editor to toggle Tab-key focus trapping.
      </p>
      <div
        style={{ height }}
        className="overflow-hidden rounded-lg border border-(--color-border-strong)"
      >
        <MonacoEditor
          height="100%"
          language={languageMap[language] ?? "plaintext"}
          value={value}
          onChange={(v) => onChange(v ?? "")}
          theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
          onMount={() => setTimedOut(false)}
          loading={
            <div className="flex h-full items-center justify-center text-sm text-(--color-ink-faint)">
              Loading editor…
            </div>
          }
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 2,
            scrollBeyondLastLine: false,
            renderLineHighlight: "none",
            // Without this, Monaco's hidden input keeps its own generic
            // default accessible name -- indistinguishable to a screen
            // reader user when several editors exist on one lesson page
            // (an example, a guided exercise, an independent exercise).
            // The fallback <textarea> below already receives `ariaLabel`;
            // this makes the real Monaco editor consistent with it.
            ariaLabel,
          }}
        />
      </div>
    </div>
  );
}
