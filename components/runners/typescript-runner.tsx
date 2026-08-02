"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CodeEditor } from "@/components/runners/code-editor";
import { buildRunnerDoc } from "@/lib/runners/html-js-doc";
import type { RunResult, RunnerStatus } from "@/lib/runners/types";
import type { TsDiagnostic } from "@/lib/runners/typescript-compile";
import { Button } from "@/components/ui/button";

const RUN_TIMEOUT_MS = 6000;

/**
 * TypeScript lab runner.
 *
 * Two-stage: type-check + compile with the real TypeScript compiler (loaded
 * lazily, see lib/runners/typescript-compile.ts), then execute the emitted
 * JavaScript in the same sandboxed iframe the HTML/JS runner already uses.
 * Reusing that iframe means TypeScript labs inherit the audited security model
 * (opaque origin, no allow-same-origin, network shimmed off) rather than
 * getting a second, separately-reasoned execution path.
 *
 * Type errors do not block running. TypeScript itself emits JavaScript when
 * type errors exist unless `noEmitOnError` is set, and a learner who has just
 * written their first type error learns more from seeing both the error and
 * the (still-running) behaviour than from a blocked button.
 */
export function TypeScriptRunner({
  code,
  onCodeChange,
  starterCode,
  harness,
  onResult,
  editorHeight = 280,
  editorLabel = "TypeScript editor",
}: {
  code: string;
  onCodeChange: (code: string) => void;
  starterCode: string;
  harness?: string;
  onResult?: (result: RunResult) => void;
  editorHeight?: number;
  editorLabel?: string;
}) {
  const [status, setStatus] = useState<RunnerStatus>("idle");
  const [doc, setDoc] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [diagnostics, setDiagnostics] = useState<TsDiagnostic[]>([]);
  const [compiling, setCompiling] = useState(false);
  const [runToken, setRunToken] = useState(0);
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

  const run = useCallback(async () => {
    clearRunTimeout();
    setStatus("running");
    setResult(null);
    setDiagnostics([]);
    setCompiling(true);

    // Dynamic import keeps the ~8.7 MB compiler out of every other route's
    // bundle; it is fetched the first time a learner runs a TypeScript lab.
    const { compileTypeScript } = await import("@/lib/runners/typescript-compile");
    const compiled = await compileTypeScript(code);
    setCompiling(false);
    setDiagnostics(compiled.diagnostics);

    setRunToken((t) => t + 1);
    setDoc(buildRunnerDoc({ language: "javascript", code: compiled.js, harness }));
    timeoutRef.current = window.setTimeout(() => {
      setStatus((current) => (current === "running" ? "timeout" : current));
    }, RUN_TIMEOUT_MS);
  }, [code, harness]);

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
      setDiagnostics([]);
    }
  }, [onCodeChange, starterCode]);

  const errors = diagnostics.filter((d) => d.category === "error");

  return (
    <div className="flex flex-col gap-3">
      <CodeEditor
        value={code}
        onChange={onCodeChange}
        language="typescript"
        ariaLabel={editorLabel}
        height={editorHeight}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={run} disabled={status === "running"}>
          {status === "running" ? (compiling ? "Type-checking…" : "Running…") : "Run"}
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

      <div aria-live="polite" className="text-sm">
        {compiling && <p className="text-(--color-ink-muted)">Type-checking your TypeScript…</p>}
        {status === "running" && !compiling && (
          <p className="text-(--color-ink-muted)">Running the compiled JavaScript…</p>
        )}
        {status === "timeout" && (
          <p className="text-(--color-warning)">
            This is taking a long time — your code may have an infinite loop. Click Stop, fix the
            code, and try again.
          </p>
        )}
      </div>

      {/*
        Type errors are reported as a status region rather than role="alert":
        in a TypeScript lesson a type error is frequently the expected outcome
        of the exercise, not a failure the learner needs interrupting for.
      */}
      {errors.length > 0 && (
        <div
          role="status"
          className="rounded-lg border-l-4 border-(--color-danger) bg-(--color-danger-contrast) p-3 text-sm"
        >
          <p className="mb-1 font-semibold text-(--color-ink)">
            {errors.length === 1 ? "1 type error" : `${errors.length} type errors`}
          </p>
          <ul className="flex flex-col gap-1 text-(--color-ink-muted)">
            {errors.map((d, i) => (
              <li key={i} className="font-mono text-xs">
                {d.line !== undefined && (
                  <span className="text-(--color-ink-faint)">Line {d.line}: </span>
                )}
                <span>{d.message}</span>
                <span className="text-(--color-ink-faint)"> (TS{d.code})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {doc && (
        <iframe
          key={runToken}
          ref={iframeRef}
          title="Hidden TypeScript execution frame"
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
  );
}
