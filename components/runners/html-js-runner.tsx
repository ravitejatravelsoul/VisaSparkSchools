"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CodeEditor } from "@/components/runners/code-editor";
import { SplitRunnerLayout } from "@/components/runners/split-runner-layout";
import { buildRunnerDoc } from "@/lib/runners/html-js-doc";
import type { RunResult, RunnerStatus } from "@/lib/runners/types";
import { Button } from "@/components/ui/button";

const RUN_TIMEOUT_MS = 6000;

export function HtmlJsRunner({
  language,
  code,
  onCodeChange,
  starterCode,
  harness,
  onResult,
  showOutputFrame = true,
  editorHeight = 280,
  editorLabel = "Code editor",
}: {
  language: "html" | "javascript";
  code: string;
  onCodeChange: (code: string) => void;
  starterCode: string;
  harness?: string;
  onResult?: (result: RunResult) => void;
  showOutputFrame?: boolean;
  editorHeight?: number;
  editorLabel?: string;
}) {
  const [status, setStatus] = useState<RunnerStatus>("idle");
  const [doc, setDoc] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [runToken, setRunToken] = useState(0);
  const [mobileTab, setMobileTab] = useState<"editor" | "output">("editor");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const clearRunTimeout = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  };

  useEffect(() => clearRunTimeout, []);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.data?.type !== "visasparkschools-run-result") return;
      if (iframeRef.current && event.source !== iframeRef.current.contentWindow) return;
      clearRunTimeout();
      const runResult: RunResult = {
        ok: !event.data.error,
        logs: event.data.logs ?? [],
        error: event.data.error,
        testResults: event.data.testResults,
      };
      setResult(runResult);
      setStatus(event.data.error ? "error" : "done");
      onResult?.(runResult);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runToken]);

  const run = useCallback(() => {
    clearRunTimeout();
    setStatus("running");
    setResult(null);
    setRunToken((t) => t + 1);
    setDoc(buildRunnerDoc({ language, code, harness }));
    // Make the result reachable on mobile without stealing keyboard focus --
    // this only changes which pane is visible (a CSS toggle), never calls
    // .focus() on anything. See components/runners/split-runner-layout.tsx.
    setMobileTab("output");
    timeoutRef.current = window.setTimeout(() => {
      setStatus((current) => (current === "running" ? "timeout" : current));
    }, RUN_TIMEOUT_MS);
  }, [language, code, harness]);

  const stop = useCallback(() => {
    clearRunTimeout();
    setDoc(null);
    setStatus("idle");
    setRunToken((t) => t + 1);
  }, []);

  const restoreStarter = useCallback(() => {
    if (
      window.confirm(
        "Replace your current code with the original starter code? This can't be undone.",
      )
    ) {
      onCodeChange(starterCode);
    }
  }, [onCodeChange, starterCode]);

  return (
    <SplitRunnerLayout
      editorLabel={editorLabel}
      outputLabel="Output"
      activeMobileTab={mobileTab}
      onActiveMobileTabChange={setMobileTab}
      toolbar={
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={run} disabled={status === "running"}>
            {status === "running" ? "Running…" : "Run"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={stop}
            disabled={status === "idle" && !doc}
          >
            Stop
          </Button>
          <Button type="button" variant="ghost" onClick={restoreStarter}>
            Restore starter code
          </Button>
        </div>
      }
      editor={
        <CodeEditor
          value={code}
          onChange={onCodeChange}
          language={language}
          ariaLabel={editorLabel}
          height={editorHeight}
        />
      }
      output={
        <div className="flex flex-col gap-3">
          <div aria-live="polite" className="text-sm">
            {status === "running" && <p className="text-(--color-ink-muted)">Running your code…</p>}
            {status === "timeout" && (
              <p className="text-(--color-warning)">
                This is taking a long time — your code may have an infinite loop. Click Stop, fix
                the code, and try again.
              </p>
            )}
          </div>

          {showOutputFrame && (
            <div className="overflow-hidden rounded-lg border border-(--color-border)">
              <p className="border-b border-(--color-border) bg-(--color-canvas) px-3 py-1.5 text-xs font-medium text-(--color-ink-muted)">
                Output
              </p>
              {doc ? (
                <iframe
                  key={runToken}
                  ref={iframeRef}
                  title="Code output"
                  srcDoc={doc}
                  sandbox="allow-scripts allow-forms"
                  className="h-64 w-full bg-white"
                />
              ) : (
                <p className="p-4 text-sm text-(--color-ink-faint)">Click Run to see the output.</p>
              )}
            </div>
          )}

          {!showOutputFrame && doc && (
            <iframe
              key={runToken}
              ref={iframeRef}
              title="Hidden code execution frame"
              srcDoc={doc}
              sandbox="allow-scripts allow-forms"
              className="hidden"
            />
          )}

          {result?.logs && result.logs.length > 0 && (
            <div className="rounded-lg border border-(--color-border) bg-(--color-code-bg) p-3">
              <p className="mb-1 text-xs font-medium text-(--color-ink-muted)">Console</p>
              <ul className="font-mono text-xs">
                {result.logs.map((line, i) => (
                  <li
                    key={i}
                    className={
                      line.level === "error"
                        ? "text-(--color-danger)"
                        : line.level === "warn"
                          ? "text-(--color-warning)"
                          : "text-(--color-ink)"
                    }
                  >
                    {line.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result?.error && (
            <p
              role="alert"
              className="rounded-lg border border-(--color-danger) bg-(--color-surface) p-3 text-sm text-(--color-danger)"
            >
              Runtime error: {result.error}
            </p>
          )}
        </div>
      }
    />
  );
}
