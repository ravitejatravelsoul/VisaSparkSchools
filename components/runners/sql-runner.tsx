"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CodeEditor } from "@/components/runners/code-editor";
import { Button } from "@/components/ui/button";
import type { ExerciseTest } from "@/lib/content/types";
import type { RunnerStatus } from "@/lib/runners/types";

const RUN_TIMEOUT_MS = 15000;

interface WorkerResultMessage {
  type: "result";
  requestId: number;
  columns: string[];
  rows: unknown[][];
  error?: string;
  matchesUnordered: boolean;
  matchesOrdered: boolean;
}

export function SqlRunner({
  code,
  onCodeChange,
  starterCode,
  seedSql,
  solutionQuery,
  tests,
  orderSensitive = false,
  onResult,
}: {
  code: string;
  onCodeChange: (code: string) => void;
  starterCode: string;
  seedSql: string;
  solutionQuery?: string;
  tests?: ExerciseTest[];
  orderSensitive?: boolean;
  onResult?: (result: { ok: boolean; testResults?: { id: string; passed: boolean }[] }) => void;
}) {
  const [status, setStatus] = useState<RunnerStatus>("idle");
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<unknown[][]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean }[] | undefined>();

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
      workerRef.current = new Worker(new URL("../../lib/runners/sql.worker.ts", import.meta.url));
    }
    return workerRef.current;
  }, []);

  const run = useCallback(() => {
    const worker = ensureWorker();
    const requestId = ++requestIdRef.current;

    setStatus("running");
    setError(undefined);
    setTestResults(undefined);

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setStatus((current) => (current === "running" ? "timeout" : current));
    }, RUN_TIMEOUT_MS);

    const handleMessage = (event: MessageEvent<WorkerResultMessage>) => {
      if (event.data?.type !== "result" || event.data.requestId !== requestId) return;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setColumns(event.data.columns);
      setRows(event.data.rows);
      setError(event.data.error);

      if (solutionQuery && tests && tests.length > 0) {
        const results = [{ id: tests[0].id, passed: event.data.matchesUnordered }];
        if (orderSensitive && tests[1]) {
          results.push({ id: tests[1].id, passed: event.data.matchesOrdered });
        }
        setTestResults(results);
        onResult?.({ ok: !event.data.error, testResults: results });
      } else {
        onResult?.({ ok: !event.data.error });
      }
      setStatus(event.data.error ? "error" : "done");
      worker.removeEventListener("message", handleMessage);
    };
    worker.addEventListener("message", handleMessage);
    worker.postMessage({
      type: "run",
      requestId,
      seedSql,
      learnerQuery: code,
      solutionQuery: solutionQuery ?? code,
      orderSensitive,
    });
  }, [code, seedSql, solutionQuery, orderSensitive, tests, ensureWorker, onResult]);

  const stop = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    teardownWorker();
    requestIdRef.current += 1;
    setStatus("idle");
  }, [teardownWorker]);

  const restoreStarter = useCallback(() => {
    if (
      window.confirm(
        "Replace your current query with the original starter query? This can't be undone.",
      )
    ) {
      onCodeChange(starterCode);
    }
  }, [onCodeChange, starterCode]);

  return (
    <div className="flex flex-col gap-3">
      <CodeEditor
        value={code}
        onChange={onCodeChange}
        language="sql"
        ariaLabel="SQL query editor"
        height={160}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={run} disabled={status === "running"}>
          {status === "running" ? "Running…" : "Run query"}
        </Button>
        <Button type="button" variant="secondary" onClick={stop} disabled={status === "idle"}>
          Stop
        </Button>
        <Button type="button" variant="ghost" onClick={restoreStarter}>
          Restore starter query
        </Button>
      </div>

      <div aria-live="polite" className="text-sm">
        {status === "running" && <p className="text-(--color-ink-muted)">Running your query…</p>}
        {status === "timeout" && (
          <p className="text-(--color-warning)">
            This is taking a long time. Click Stop, check your query, and try again.
          </p>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-(--color-danger) bg-(--color-surface) p-3 text-sm text-(--color-danger)"
        >
          Query error: {error}
        </p>
      )}

      {!error && rows.length > 0 && (
        <div
          tabIndex={0}
          role="region"
          aria-label="Query results"
          className="overflow-x-auto rounded-lg border border-(--color-border)"
        >
          <table className="w-full min-w-max text-left text-sm">
            <caption className="sr-only">Query results, {rows.length} rows</caption>
            <thead className="bg-(--color-canvas)">
              <tr>
                {columns.map((col) => (
                  <th key={col} scope="col" className="px-3 py-2 font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-(--color-border)">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 font-mono">
                      {String(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!error && status === "done" && rows.length === 0 && (
        <p className="text-sm text-(--color-ink-faint)">
          Query ran successfully and returned no rows.
        </p>
      )}
    </div>
  );
}
