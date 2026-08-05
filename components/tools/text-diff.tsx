"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToolField, TEXTAREA_CLASS } from "@/components/tools/tool-shell";
import { diffLines, MAX_DIFF_LINES } from "@/lib/tools/text-diff";

const MAX_INPUT_LENGTH = 100_000;
const EXAMPLE_A = "function greet(name) {\n  return 'Hello ' + name;\n}";
const EXAMPLE_B = "function greet(name) {\n  return `Hello, ${name}!`;\n}";

export function TextDiffTool() {
  const [original, setOriginal] = useState("");
  const [changed, setChanged] = useState("");

  const lines = useMemo(() => diffLines(original, changed), [original, changed]);
  const truncated =
    original.split("\n").length > MAX_DIFF_LINES || changed.split("\n").length > MAX_DIFF_LINES;

  const added = lines.filter((l) => l.kind === "added").length;
  const removed = lines.filter((l) => l.kind === "removed").length;

  const reset = () => {
    setOriginal("");
    setChanged("");
  };

  const loadExample = () => {
    setOriginal(EXAMPLE_A);
    setChanged(EXAMPLE_B);
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <ToolField label="Original" htmlFor="diff-original">
          <textarea
            id="diff-original"
            value={original}
            onChange={(e) => setOriginal(e.target.value.slice(0, MAX_INPUT_LENGTH))}
            maxLength={MAX_INPUT_LENGTH}
            rows={10}
            spellCheck={false}
            placeholder="Paste the original text…"
            className={TEXTAREA_CLASS}
          />
        </ToolField>
        <ToolField label="Changed" htmlFor="diff-changed">
          <textarea
            id="diff-changed"
            value={changed}
            onChange={(e) => setChanged(e.target.value.slice(0, MAX_INPUT_LENGTH))}
            maxLength={MAX_INPUT_LENGTH}
            rows={10}
            spellCheck={false}
            placeholder="Paste the changed text…"
            className={TEXTAREA_CLASS}
          />
        </ToolField>
      </div>

      {truncated && (
        <p role="alert" className="text-sm text-(--color-danger)">
          Only the first {MAX_DIFF_LINES.toLocaleString()} lines of each side are compared.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={loadExample}>
          Load example
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      {(original || changed) && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-(--color-ink)">
            {added} added, {removed} removed
          </h3>
          <pre className="max-h-96 overflow-auto rounded-lg border border-(--color-border) p-3 font-mono text-sm">
            {lines.map((l, i) => (
              <div
                key={i}
                className={
                  l.kind === "added"
                    ? "bg-(--color-success-contrast) text-(--color-success)"
                    : l.kind === "removed"
                      ? "bg-(--color-danger-contrast) text-(--color-danger)"
                      : ""
                }
              >
                {l.kind === "added" ? "+ " : l.kind === "removed" ? "- " : "  "}
                {l.text || " "}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
