/// <reference lib="webworker" />
/**
 * Python code runner worker. Loads Pyodide lazily from a CDN (only when a
 * Python lesson/exercise actually runs) and executes learner code plus an
 * optional test harness in one shared Python global namespace.
 *
 * Cancellation model: Pyodide has no clean "interrupt a running script" hook
 * in this simple setup, so the main thread cancels a run by terminating this
 * worker outright and spinning up a fresh one — see PythonRunnerClient.
 */

declare const self: DedicatedWorkerGlobalScope;
declare function importScripts(...urls: string[]): void;

const PYODIDE_VERSION = "0.28.3";
const PYODIDE_CDN_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

interface RunMessage {
  type: "run";
  requestId: number;
  code: string;
  harness?: string;
}

interface RunResultMessage {
  type: "result";
  requestId: number;
  ok: boolean;
  stdout: string[];
  stderr: string[];
  error?: string;
  testResults: { id: string; passed: boolean; message?: string }[];
}

/** Minimal surface of the Pyodide interface this worker actually uses. */
interface PyodideInterface {
  setStdout(options: { batched: (text: string) => void }): void;
  setStderr(options: { batched: (text: string) => void }): void;
  runPythonAsync(code: string): Promise<unknown>;
  globals: {
    get(name: string):
      | {
          toJs(options: { dict_converter: typeof Object.fromEntries }): unknown;
          destroy?: () => void;
        }
      | undefined;
  };
}

declare global {
  // Injected globally by the imported classic pyodide.js script.
  function loadPyodide(options: { indexURL: string }): Promise<PyodideInterface>;
}

let pyodideReadyPromise: Promise<PyodideInterface> | null = null;

function ensurePyodide(): Promise<PyodideInterface> {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = (async () => {
      importScripts(`${PYODIDE_CDN_BASE}pyodide.js`);
      return await loadPyodide({ indexURL: PYODIDE_CDN_BASE });
    })();
  }
  return pyodideReadyPromise;
}

self.onmessage = async (event: MessageEvent<RunMessage>) => {
  const message = event.data;
  if (message.type !== "run") return;

  const stdout: string[] = [];
  const stderr: string[] = [];

  try {
    const pyodide = await ensurePyodide();
    pyodide.setStdout({ batched: (text: string) => stdout.push(text) });
    pyodide.setStderr({ batched: (text: string) => stderr.push(text) });

    let runtimeError: string | undefined;
    try {
      await pyodide.runPythonAsync(message.code);
    } catch (err) {
      runtimeError = err instanceof Error ? err.message : String(err);
    }

    let testResults: RunResultMessage["testResults"] = [];
    if (message.harness) {
      try {
        await pyodide.runPythonAsync(message.harness);
        const raw = pyodide.globals.get("__test_results");
        if (raw) {
          testResults = raw.toJs({
            dict_converter: Object.fromEntries,
          }) as RunResultMessage["testResults"];
          raw.destroy?.();
        }
      } catch (err) {
        // Harness itself failed to run (e.g. referenced an undefined learner
        // function) -- surface as a runtime error rather than crashing.
        runtimeError = runtimeError ?? (err instanceof Error ? err.message : String(err));
      }
    }

    const response: RunResultMessage = {
      type: "result",
      requestId: message.requestId,
      ok: !runtimeError,
      stdout,
      stderr,
      error: runtimeError,
      testResults,
    };
    self.postMessage(response);
  } catch (err) {
    const response: RunResultMessage = {
      type: "result",
      requestId: message.requestId,
      ok: false,
      stdout,
      stderr,
      error: `Failed to start the Python runtime: ${err instanceof Error ? err.message : String(err)}`,
      testResults: [],
    };
    self.postMessage(response);
  }
};

export {};
