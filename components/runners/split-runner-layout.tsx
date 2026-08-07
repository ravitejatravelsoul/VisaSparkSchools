"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Shared editor/output shell for every runner (HTML/JS, Python, SQL,
 * TypeScript) and every guided-lab exercise/expected-output pair -- see
 * docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md. One implementation
 * instead of four hand-duplicated layouts:
 *
 * - Desktop (`sm:` and up): editor and output render side by side in a
 *   two-column grid, each independently scrollable, so running code never
 *   requires scrolling the whole page to see the result.
 * - Mobile: an accessible tab pair replaces the two columns -- both panes
 *   stay mounted (`hidden` via CSS, not unmounted), so switching tabs never
 *   loses editor content or output/scroll state.
 *
 * `activeMobileTab`/`onActiveMobileTabChange` are controlled by the caller
 * so a runner's own `run()` can switch to the Output tab the moment a run
 * starts, without ever moving keyboard focus (a CSS visibility change, not
 * a focus() call) -- see each runner's `run` callback.
 */
export function SplitRunnerLayout({
  editor,
  editorLabel = "Editor",
  output,
  outputLabel = "Output",
  toolbar,
  activeMobileTab,
  onActiveMobileTabChange,
  tabGroupLabel = "Editor and output",
}: {
  editor: ReactNode;
  editorLabel?: string;
  output: ReactNode;
  outputLabel?: string;
  toolbar?: ReactNode;
  activeMobileTab: "editor" | "output";
  onActiveMobileTabChange: (tab: "editor" | "output") => void;
  tabGroupLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {toolbar}

      <div role="tablist" aria-label={tabGroupLabel} className="flex gap-1 sm:hidden">
        <button
          type="button"
          role="tab"
          id="split-runner-tab-editor"
          aria-selected={activeMobileTab === "editor"}
          aria-controls="split-runner-panel-editor"
          onClick={() => onActiveMobileTabChange("editor")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium",
            activeMobileTab === "editor"
              ? "bg-(--color-brand-soft) text-(--color-brand-strong)"
              : "text-(--color-ink-muted) hover:bg-(--color-surface-sunken)",
          )}
        >
          {editorLabel}
        </button>
        <button
          type="button"
          role="tab"
          id="split-runner-tab-output"
          aria-selected={activeMobileTab === "output"}
          aria-controls="split-runner-panel-output"
          onClick={() => onActiveMobileTabChange("output")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium",
            activeMobileTab === "output"
              ? "bg-(--color-brand-soft) text-(--color-brand-strong)"
              : "text-(--color-ink-muted) hover:bg-(--color-surface-sunken)",
          )}
        >
          {outputLabel}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:items-start">
        <div
          id="split-runner-panel-editor"
          role="tabpanel"
          aria-labelledby="split-runner-tab-editor"
          className={cn("min-w-0", activeMobileTab === "editor" ? "block" : "hidden", "sm:block")}
        >
          <p className="mb-1 hidden text-xs font-medium text-(--color-ink-muted) sm:block">
            {editorLabel}
          </p>
          {editor}
        </div>
        <div
          id="split-runner-panel-output"
          role="tabpanel"
          aria-labelledby="split-runner-tab-output"
          className={cn(
            "min-w-0 sm:max-h-[32rem] sm:overflow-y-auto",
            activeMobileTab === "output" ? "block" : "hidden",
            "sm:block",
          )}
        >
          <p className="mb-1 hidden text-xs font-medium text-(--color-ink-muted) sm:block">
            {outputLabel}
          </p>
          {output}
        </div>
      </div>
    </div>
  );
}
