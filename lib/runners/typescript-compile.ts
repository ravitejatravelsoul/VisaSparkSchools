/**
 * TypeScript lab support: type-checks and compiles learner TypeScript to
 * JavaScript in the browser, then hands the emitted JS to the existing audited
 * HTML/JS sandbox (see lib/runners/html-js-doc.ts) rather than introducing a
 * second execution path with its own security surface.
 *
 * Why a full Program instead of `ts.transpileModule`: `transpileModule` does
 * no type checking at all -- it reports syntax errors only. A "TypeScript lab"
 * that cannot catch `const n: number = "text"` would fail to demonstrate the
 * one thing TypeScript exists to do, so this builds a real Program with a
 * checker over an in-memory file system (see lib/runners/typescript-lab-lib.ts
 * for why the ambient lib is curated rather than the shipped lib.es2020.d.ts).
 *
 * Loading: `typescript` is imported dynamically (see loadCompiler below), never
 * via a top-level `import ... from "typescript"` -- that's what lets a bundler
 * code-split it into a chunk fetched only when a TypeScript lab actually runs,
 * kept out of the homepage/dashboard/catalog/profile bundles. The absence of
 * any static import of "typescript" outside this runner's own files is
 * asserted by tests/unit/typescript-runner-lazy-load.test.ts, and
 * tests/e2e/typescript-runner.spec.ts exercises the real dynamic-import path
 * end to end in a browser. The chunk is large (the compiler is ~8.7 MB
 * unminified); that cost is documented in docs/ARCHITECTURE.md's runner
 * matrix and is paid only on TypeScript lab lessons. No remote service is
 * involved -- unlike Pyodide, which this project loads from a CDN.
 */
import { TYPESCRIPT_LAB_LIB } from "@/lib/runners/typescript-lab-lib";

export interface TsDiagnostic {
  /** 1-based line number in the learner's source, when the compiler reports a position. */
  line?: number;
  /** TypeScript error code, e.g. 2322. */
  code: number;
  message: string;
  category: "error" | "warning" | "suggestion" | "message";
}

export interface TsCompileResult {
  /** Emitted JavaScript. Present even when there are type errors, because a lab shows both. */
  js: string;
  diagnostics: TsDiagnostic[];
  /** True when at least one diagnostic is a genuine error. */
  hasErrors: boolean;
}

const LIB_FILENAME = "lib.lab.d.ts";
const SOURCE_FILENAME = "lab.ts";

/** Cached compiler module so a lab with several runs only pays the import once. */
let compilerPromise: Promise<typeof import("typescript")> | null = null;

function loadCompiler(): Promise<typeof import("typescript")> {
  compilerPromise ??= import("typescript");
  return compilerPromise;
}

/**
 * Compiler options chosen for teaching rather than for building an app:
 * - `strict` on, because a TypeScript course that silently allows implicit
 *   `any` teaches exactly the habit the language exists to prevent.
 * - `module: None` + ES2020 so the emitted code is a plain script the sandbox
 *   can run via a <script> tag, leaving the learner's declarations visible to
 *   the test harness instead of trapped in module scope.
 */
function compilerOptionsFor(ts: typeof import("typescript")): import("typescript").CompilerOptions {
  return {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.None,
    strict: true,
    noEmitOnError: false,
    removeComments: false,
    lib: [LIB_FILENAME],
  };
}

function mapCategory(
  ts: typeof import("typescript"),
  category: import("typescript").DiagnosticCategory,
): TsDiagnostic["category"] {
  switch (category) {
    case ts.DiagnosticCategory.Error:
      return "error";
    case ts.DiagnosticCategory.Warning:
      return "warning";
    case ts.DiagnosticCategory.Suggestion:
      return "suggestion";
    default:
      return "message";
  }
}

/**
 * Type-checks and compiles TypeScript source.
 *
 * Emits JavaScript even when type errors exist, so a lab can show the learner
 * both "here is your type error" and "here is what it would have done" —
 * which is how TypeScript itself behaves without `noEmitOnError`.
 */
export async function compileTypeScript(source: string): Promise<TsCompileResult> {
  const ts = await loadCompiler();

  const files: Record<string, string> = {
    [LIB_FILENAME]: TYPESCRIPT_LAB_LIB,
    [SOURCE_FILENAME]: source,
  };

  let emitted = "";
  const host: import("typescript").CompilerHost = {
    getSourceFile: (name) =>
      files[name] !== undefined
        ? ts.createSourceFile(name, files[name], ts.ScriptTarget.ES2020, true)
        : undefined,
    writeFile: (name, text) => {
      if (name.endsWith(".js")) emitted = text;
    },
    getDefaultLibFileName: () => LIB_FILENAME,
    useCaseSensitiveFileNames: () => true,
    getCanonicalFileName: (name) => name,
    getCurrentDirectory: () => "",
    getNewLine: () => "\n",
    fileExists: (name) => files[name] !== undefined,
    readFile: (name) => files[name],
  };

  const program = ts.createProgram([SOURCE_FILENAME], compilerOptionsFor(ts), host);
  const emitResult = program.emit();

  const raw = [
    ...program.getSyntacticDiagnostics(),
    ...program.getSemanticDiagnostics(),
    ...emitResult.diagnostics,
  ];

  const diagnostics: TsDiagnostic[] = raw.map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, " ");
    let line: number | undefined;
    if (d.file && typeof d.start === "number") {
      line = d.file.getLineAndCharacterOfPosition(d.start).line + 1;
    }
    return { line, code: d.code, message, category: mapCategory(ts, d.category) };
  });

  return {
    js: emitted,
    diagnostics,
    hasErrors: diagnostics.some((d) => d.category === "error"),
  };
}

/** Test seam: lets unit tests assert the compiler module is only imported once. */
export function __resetCompilerCacheForTests(): void {
  compilerPromise = null;
}
