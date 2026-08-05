"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolField, INPUT_CLASS, ErrorText } from "@/components/tools/tool-shell";
import { contrastRatio, evaluateWcag, parseHexColor } from "@/lib/tools/color-contrast";

const DEFAULT_FG = "#1a1a1a";
const DEFAULT_BG = "#ffffff";

function ResultBadge({ label, pass }: { label: string; pass: boolean }) {
  return (
    <Badge tone={pass ? "success" : "danger"} dot>
      {label}: {pass ? "Pass" : "Fail"}
    </Badge>
  );
}

export function ColorContrastCheckerTool() {
  const [fg, setFg] = useState(DEFAULT_FG);
  const [bg, setBg] = useState(DEFAULT_BG);

  const fgValid = parseHexColor(fg) !== null;
  const bgValid = parseHexColor(bg) !== null;
  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const result = ratio !== null ? evaluateWcag(ratio) : null;

  const reset = () => {
    setFg(DEFAULT_FG);
    setBg(DEFAULT_BG);
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ToolField label="Text color" htmlFor="fg-color">
          <div className="flex items-center gap-2">
            <input
              type="color"
              aria-label="Pick text color"
              value={fgValid ? fg : DEFAULT_FG}
              onChange={(e) => setFg(e.target.value)}
              className="h-10 w-12 shrink-0 cursor-pointer rounded border border-(--color-border-strong)"
            />
            <input
              id="fg-color"
              type="text"
              value={fg}
              onChange={(e) => setFg(e.target.value.slice(0, 7))}
              maxLength={7}
              spellCheck={false}
              className={`${INPUT_CLASS} font-mono`}
            />
          </div>
          {!fgValid && <ErrorText>Enter a valid hex color, e.g. #1a1a1a.</ErrorText>}
        </ToolField>
        <ToolField label="Background color" htmlFor="bg-color">
          <div className="flex items-center gap-2">
            <input
              type="color"
              aria-label="Pick background color"
              value={bgValid ? bg : DEFAULT_BG}
              onChange={(e) => setBg(e.target.value)}
              className="h-10 w-12 shrink-0 cursor-pointer rounded border border-(--color-border-strong)"
            />
            <input
              id="bg-color"
              type="text"
              value={bg}
              onChange={(e) => setBg(e.target.value.slice(0, 7))}
              maxLength={7}
              spellCheck={false}
              className={`${INPUT_CLASS} font-mono`}
            />
          </div>
          {!bgValid && <ErrorText>Enter a valid hex color, e.g. #ffffff.</ErrorText>}
        </ToolField>
      </div>

      <div>
        <Button type="button" variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      {fgValid && bgValid && (
        <div
          className="rounded-lg border border-(--color-border-strong) p-6"
          style={{ backgroundColor: bg, color: fg }}
        >
          <p className="text-base">The quick brown fox jumps over the lazy dog.</p>
          <p className="mt-2 text-2xl font-bold">Large text sample</p>
        </div>
      )}

      {result && (
        <div>
          <p className="mb-2 text-sm font-medium text-(--color-ink)">
            Contrast ratio: {result.ratio.toFixed(2)}:1
          </p>
          <div className="flex flex-wrap gap-2">
            <ResultBadge label="AA normal text" pass={result.aaNormal} />
            <ResultBadge label="AA large text" pass={result.aaLarge} />
            <ResultBadge label="AAA normal text" pass={result.aaaNormal} />
            <ResultBadge label="AAA large text" pass={result.aaaLarge} />
          </div>
        </div>
      )}
    </div>
  );
}
