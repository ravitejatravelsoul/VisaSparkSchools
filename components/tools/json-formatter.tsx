"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton, ToolField, TEXTAREA_CLASS, ErrorText } from "@/components/tools/tool-shell";

const MAX_INPUT_LENGTH = 200_000;
const EXAMPLE =
  '{\n  "name": "VisaSparkSchools",\n  "tags": ["learn", "build", "prove"],\n  "active": true\n}';

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const run = (mode: "format" | "minify", value: string) => {
    if (value.trim().length === 0) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const parsed: unknown = JSON.parse(value);
      setOutput(mode === "format" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Invalid JSON.");
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
    run("format", value);
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const loadExample = () => handleChange(EXAMPLE);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <ToolField label="JSON input" htmlFor="json-input">
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => handleChange(e.target.value.slice(0, MAX_INPUT_LENGTH))}
            maxLength={MAX_INPUT_LENGTH}
            rows={14}
            spellCheck={false}
            placeholder="Paste JSON here…"
            className={TEXTAREA_CLASS}
          />
        </ToolField>
        <p className="mt-1 text-xs text-(--color-ink-faint)">
          {input.length.toLocaleString()} / {MAX_INPUT_LENGTH.toLocaleString()} characters
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => run("format", input)}>
            Format
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={() => run("minify", input)}>
            Minify
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={loadExample}>
            Load example
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
        </div>
        {error && <ErrorText>{error}</ErrorText>}
      </div>

      <div>
        <ToolField label="Result" htmlFor="json-output">
          <textarea
            id="json-output"
            value={output}
            readOnly
            rows={14}
            spellCheck={false}
            placeholder="Valid, formatted JSON will appear here…"
            className={TEXTAREA_CLASS}
          />
        </ToolField>
        <div className="mt-3">
          <CopyButton text={output} label="Copy result" />
        </div>
      </div>
    </div>
  );
}
