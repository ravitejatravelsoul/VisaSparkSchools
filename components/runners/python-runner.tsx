"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CodeEditor } from "@/components/runners/code-editor";
import { SplitRunnerLayout } from "@/components/runners/split-runner-layout";
import { Button } from "@/components/ui/button";
import type { RunnerStatus, TestOutcome } from "@/lib/runners/types";

const RUN_TIMEOUT_MS = 25000;

interface WorkerResultMessage {
  type: "result";
  requestId: number;
  ok: boolean;
  stdout: string[];
  stderr: string[];
  error?: string;
  testResults: TestOutcome[];
}

export function PythonRunner({
  code,
  onCodeChange,
  starterCode,
  harness,
  onResult,
}: {
  code: string;
  onCodeChange: (code: string) => void;
  starterCode: string;
  harness?: string;
  onResult?: (result: { ok: boolean; testResults?: TestOutcome[] }) => void;
}) {
  const [status, setStatus] = useState<RunnerStatus>("idle");
  const [stdout, setStdout] = useState<string[]>([]);
  const [stderr, setStderr] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [testResults, setTestResults] = useState<TestOutcome[] | undefined>(undefined);
  const [mobileTab, setMobileTab] = useState<"editor" | "output">("editor");

  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const timeoutRef = useRef<number | undefined>(undefined);

  const teardownWorker = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
  }, []);

  useEffect(() => teardownWorker, [teardownWorker]);

  const ensureWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../../lib/runners/python.worker.ts", import.meta.url),
      );
    }
    return workerRef.current;
  }, []);

  const run = useCallback(() => {
    if (typeof Worker === "undefined") {
      setStatus("error");
      setError("Your browser does not support the technology needed to run Python here.");
      return;
    }

    const worker = ensureWorker();
    const requestId = ++requestIdRef.current;

    setStatus("running");
    setStdout([]);
    setStderr([]);
    setError(undefined);
    setTestResults(undefined);
    setMobileTab("output");

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setStatus((current) => (current === "running" ? "timeout" : current));
    }, RUN_TIMEOUT_MS);

    const handleMessage = (event: MessageEvent<WorkerResultMessage>) => {
      if (event.data?.type !== "result" || event.data.requestId !== requestId) return;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setStdout(event.data.stdout);
      setStderr(event.data.stderr);
      setError(event.data.error);
      setTestResults(event.data.testResults);
      setStatus(event.data.ok ? "done" : "error");
      onResult?.({ ok: event.data.ok, testResults: event.data.testResults });
      worker.removeEventListener("message", handleMessage);
    };
    worker.addEventListener("message", handleMessage);
    worker.postMessage({ type: "run", requestId, code, harness });
  }, [code, harness, ensureWorker, onResult]);

  const stop = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    teardownWorker();
    requestIdRef.current += 1; // invalidate any in-flight response
    setStatus("idle");
  }, [teardownWorker]);

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
      editorLabel="Python code editor"
      outputLabel="Output"
      activeMobileTab={mobileTab}
      onActiveMobileTabChange={setMobileTab}
      toolbar={
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={run} disabled={status === "running"}>
            {status === "running" ? "Running…" : "Run"}
          </Button>
          <Button type="button" variant="secondary" onClick={stop} disabled={status === "idle"}>
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
          language="python"
          ariaLabel="Python code editor"
          height={280}
        />
      }
      output={
        <div className="flex flex-col gap-3">
          <div aria-live="polite" className="text-sm">
            {status === "running" && (
              <p className="text-(--color-ink-muted)">
                Running your code… the first run on this page loads the Python runtime and can take
                a few seconds.
              </p>
            )}
            {status === "timeout" && (
              <p className="text-(--color-warning)">
                This is taking a long time — your code may have an infinite loop, or the Python
                runtime is slow to load on this connection. Click Stop, then try again.
              </p>
            )}
          </div>

          {(stdout.length > 0 || stderr.length > 0) && (
            <div className="rounded-lg border border-(--color-border) bg-(--color-code-bg) p-3">
              <p className="mb-1 text-xs font-medium text-(--color-ink-muted)">Output</p>
              <pre className="font-mono text-xs whitespace-pre-wrap text-(--color-ink)">
                {stdout.join("")}
              </pre>
              {stderr.length > 0 && (
                <pre className="font-mono text-xs whitespace-pre-wrap text-(--color-danger)">
                  {stderr.join("")}
                </pre>
              )}
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-(--color-danger) bg-(--color-surface) p-3 text-sm text-(--color-danger)"
            >
              Error: {error}
            </p>
          )}

          {testResults && (
            <ul className="flex flex-col gap-1">
              {testResults.map((t) => (
                <li
                  key={t.id}
                  className={t.passed ? "text-(--color-success)" : "text-(--color-danger)"}
                >
                  {t.passed ? "✓" : "✗"} {t.message || t.id}
                </li>
              ))}
            </ul>
          )}
        </div>
      }
    />
  );
}
