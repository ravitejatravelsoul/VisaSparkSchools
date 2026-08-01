/// <reference lib="webworker" />
/**
 * SQL runner worker. Loads sql.js (SQLite compiled to WebAssembly) from this
 * app's own /public/wasm assets (no external CDN dependency), resets a fresh
 * in-memory database from the lesson's seed SQL on every run, executes the
 * learner's query, and compares its result rows against a fresh run of the
 * lesson's reference solution query -- so multiple correct SQL phrasings all
 * pass, not just one exact string.
 */

declare const self: DedicatedWorkerGlobalScope;
declare function importScripts(...urls: string[]): void;

interface RunMessage {
  type: "run";
  requestId: number;
  seedSql: string;
  learnerQuery: string;
  solutionQuery: string;
  orderSensitive: boolean;
}

interface QueryOutcome {
  columns: string[];
  rows: unknown[][];
  error?: string;
}

/** Minimal surface of the sql.js module this worker actually uses. */
interface SqlJsStatic {
  Database: new () => SqlJsDatabase;
}
interface SqlJsDatabase {
  run(sql: string): void;
  exec(sql: string): { columns: string[]; values: unknown[][] }[];
  close(): void;
}

declare global {
  function initSqlJs(options: { locateFile: (file: string) => string }): Promise<SqlJsStatic>;
}

let sqlJsReadyPromise: Promise<SqlJsStatic> | null = null;

function loadSqlJs(): Promise<SqlJsStatic> {
  if (!sqlJsReadyPromise) {
    sqlJsReadyPromise = (async () => {
      importScripts("/wasm/sql-wasm.js");
      return await initSqlJs({ locateFile: () => "/wasm/sql-wasm.wasm" });
    })();
  }
  return sqlJsReadyPromise;
}

function runQuery(SQL: SqlJsStatic, seedSql: string, query: string): QueryOutcome {
  const db = new SQL.Database();
  try {
    db.run(seedSql);
    const results = db.exec(query);
    if (results.length === 0) {
      return { columns: [], rows: [] };
    }
    return { columns: results[0].columns, rows: results[0].values };
  } catch (err) {
    return { columns: [], rows: [], error: err instanceof Error ? err.message : String(err) };
  } finally {
    db.close();
  }
}

function rowsEqual(a: unknown[][], b: unknown[][], ignoreOrder: boolean): boolean {
  if (a.length !== b.length) return false;
  const normalize = (rows: unknown[][]) => {
    const asStrings = rows.map((row) => JSON.stringify(row));
    return ignoreOrder ? asStrings.slice().sort() : asStrings;
  };
  const na = normalize(a);
  const nb = normalize(b);
  return na.every((val, i) => val === nb[i]);
}

self.onmessage = async (event: MessageEvent<RunMessage>) => {
  const message = event.data;
  if (message.type !== "run") return;

  try {
    const SQL = await loadSqlJs();
    const learnerResult = runQuery(SQL, message.seedSql, message.learnerQuery);
    const solutionResult = runQuery(SQL, message.seedSql, message.solutionQuery);

    const matchesUnordered =
      !learnerResult.error && rowsEqual(learnerResult.rows, solutionResult.rows, true);
    const matchesOrdered =
      !learnerResult.error && rowsEqual(learnerResult.rows, solutionResult.rows, false);

    self.postMessage({
      type: "result",
      requestId: message.requestId,
      columns: learnerResult.columns,
      rows: learnerResult.rows,
      error: learnerResult.error,
      matchesUnordered,
      matchesOrdered: message.orderSensitive ? matchesOrdered : matchesUnordered,
    });
  } catch (err) {
    self.postMessage({
      type: "result",
      requestId: message.requestId,
      columns: [],
      rows: [],
      error: `Failed to start the SQL runtime: ${err instanceof Error ? err.message : String(err)}`,
      matchesUnordered: false,
      matchesOrdered: false,
    });
  }
};

export {};
