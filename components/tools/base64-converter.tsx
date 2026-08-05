"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton, ToolField, TEXTAREA_CLASS, ErrorText } from "@/components/tools/tool-shell";

const MAX_INPUT_LENGTH = 50_000;
const EXAMPLE = "VisaSparkSchools";

/** UTF-8 safe: btoa/atob only handle Latin1, so encode/decode through TextEncoder/Decoder. */
function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function decodeBase64(text: string): string {
  const binary = atob(text);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder(undefined, { fatal: true }).decode(bytes);
}

export function Base64ConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const run = (nextMode: "encode" | "decode", value: string) => {
    if (value.length === 0) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      setOutput(nextMode === "encode" ? encodeBase64(value) : decodeBase64(value));
      setError(null);
    } catch {
      setOutput("");
      setError(
        nextMode === "encode" ? "Couldn't encode that text." : "That isn't valid Base64 text.",
      );
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
    run(mode, value);
  };

  const switchMode = (nextMode: "encode" | "decode") => {
    setMode(nextMode);
    run(nextMode, input);
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError(null);
    setMode("encode");
  };

  const loadExample = () => {
    setMode("encode");
    handleChange(EXAMPLE);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div role="group" aria-label="Mode" className="mb-3 flex gap-2">
          <Button
            type="button"
            variant={mode === "encode" ? "primary" : "secondary"}
            size="sm"
            aria-pressed={mode === "encode"}
            onClick={() => switchMode("encode")}
          >
            Encode
          </Button>
          <Button
            type="button"
            variant={mode === "decode" ? "primary" : "secondary"}
            size="sm"
            aria-pressed={mode === "decode"}
            onClick={() => switchMode("decode")}
          >
            Decode
          </Button>
        </div>
        <ToolField
          label={mode === "encode" ? "Text to encode" : "Base64 to decode"}
          htmlFor="b64-input"
        >
          <textarea
            id="b64-input"
            value={input}
            onChange={(e) => handleChange(e.target.value.slice(0, MAX_INPUT_LENGTH))}
            maxLength={MAX_INPUT_LENGTH}
            rows={10}
            spellCheck={false}
            className={TEXTAREA_CLASS}
          />
        </ToolField>
        <div className="mt-3 flex flex-wrap gap-2">
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
        <ToolField label="Result" htmlFor="b64-output">
          <textarea
            id="b64-output"
            value={output}
            readOnly
            rows={10}
            spellCheck={false}
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
