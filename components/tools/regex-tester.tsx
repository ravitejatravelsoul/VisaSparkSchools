"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToolField, TEXTAREA_CLASS, INPUT_CLASS, ErrorText } from "@/components/tools/tool-shell";

// Small, deliberate limits: this runs the browser's own RegExp engine
// synchronously on the main thread with no worker/timeout available, so a
// short pattern/text ceiling is the only practical guard against a
// catastrophic-backtracking pattern freezing the tab.
const MAX_PATTERN_LENGTH = 200;
const MAX_TEXT_LENGTH = 20_000;
const MAX_MATCHES = 1000;

const EXAMPLE_PATTERN = "\\b[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}\\b";
const EXAMPLE_TEXT = "Contact us at hello@visasparkschools.example or support@example.com.";

interface MatchInfo {
  match: string;
  index: number;
  groups: string[];
}

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const { matches, error } = useMemo(() => {
    if (pattern.trim().length === 0) return { matches: [] as MatchInfo[], error: null };
    let re: RegExp;
    try {
      // A global flag is required internally to iterate every match safely
      // (bounded by MAX_MATCHES below); the learner's own flags still apply.
      const effectiveFlags = flags.includes("g") ? flags : `${flags}g`;
      re = new RegExp(pattern, effectiveFlags);
    } catch (e) {
      return {
        matches: [] as MatchInfo[],
        error: e instanceof Error ? e.message : "Invalid pattern.",
      };
    }
    const results: MatchInfo[] = [];
    let m: RegExpExecArray | null;
    let lastIndex = -1;
    while (results.length < MAX_MATCHES && (m = re.exec(text)) !== null) {
      // Guard against a zero-width match not advancing lastIndex (infinite loop).
      if (re.lastIndex === lastIndex) {
        re.lastIndex += 1;
        if (re.lastIndex > text.length) break;
        continue;
      }
      lastIndex = re.lastIndex;
      results.push({ match: m[0], index: m.index, groups: m.slice(1).map((g) => g ?? "") });
      if (m[0].length === 0) re.lastIndex += 1;
    }
    return { matches: results, error: null };
  }, [pattern, flags, text]);

  const reset = () => {
    setPattern("");
    setFlags("g");
    setText("");
  };

  const loadExample = () => {
    setPattern(EXAMPLE_PATTERN);
    setFlags("g");
    setText(EXAMPLE_TEXT);
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <ToolField label="Pattern" htmlFor="regex-pattern">
          <input
            id="regex-pattern"
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value.slice(0, MAX_PATTERN_LENGTH))}
            maxLength={MAX_PATTERN_LENGTH}
            spellCheck={false}
            placeholder="e.g. \\d+"
            className={`${INPUT_CLASS} font-mono`}
          />
        </ToolField>
        <ToolField label="Flags" htmlFor="regex-flags">
          <input
            id="regex-flags"
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value.replace(/[^dgimsuy]/g, "").slice(0, 6))}
            placeholder="g"
            className={`${INPUT_CLASS} w-24 font-mono`}
          />
        </ToolField>
      </div>
      {error && <ErrorText>{error}</ErrorText>}

      <ToolField label="Test text" htmlFor="regex-text">
        <textarea
          id="regex-text"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_TEXT_LENGTH))}
          maxLength={MAX_TEXT_LENGTH}
          rows={8}
          spellCheck={false}
          placeholder="Paste text to test against…"
          className={TEXTAREA_CLASS}
        />
      </ToolField>
      <p className="text-xs text-(--color-ink-faint)">
        {text.length.toLocaleString()} / {MAX_TEXT_LENGTH.toLocaleString()} characters
      </p>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={loadExample}>
          Load example
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-(--color-ink)">
          {matches.length} match{matches.length === 1 ? "" : "es"}
          {matches.length === MAX_MATCHES ? ` (showing first ${MAX_MATCHES})` : ""}
        </h3>
        {matches.length > 0 && (
          <ul className="max-h-72 space-y-1 overflow-y-auto rounded-lg border border-(--color-border) p-2 font-mono text-sm">
            {matches.map((m, i) => (
              <li
                key={`${m.index}-${i}`}
                className="rounded px-2 py-1 odd:bg-(--color-surface-sunken)"
              >
                <span className="text-(--color-ink-faint)">[{m.index}]</span>{" "}
                <span className="text-(--color-brand-strong)">{m.match || "(empty match)"}</span>
                {m.groups.length > 0 && (
                  <span className="text-(--color-ink-faint)"> — groups: {m.groups.join(", ")}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
