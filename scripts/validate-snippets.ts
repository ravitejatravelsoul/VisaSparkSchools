/**
 * Executes every course exercise's reference solution against the real runtime
 * it claims to use, and fails the build if a solution does not pass its own
 * harness.
 *
 * This exists because an exercise is a promise: "write code that satisfies
 * these checks." If the author's own `solutionCode` cannot satisfy `harness`,
 * the exercise is unsolvable and the learner has no way to know that. Reading
 * the snippet is not enough to catch this -- only running it is.
 *
 * Coverage by language:
 * - `javascript` / `typescript` / `html`: executed in a real Chromium page via
 *   Playwright, using the exact same `buildRunnerDoc` sandbox the app ships.
 *   TypeScript is compiled first with the same compiler the lab uses.
 * - `python` / `sql`: not executed here. Pyodide is fetched from a CDN and
 *   sql.js needs its wasm binary; both are already exercised end-to-end by
 *   tests/e2e/python-runner.spec.ts and tests/e2e/runners.spec.ts. Rather than
 *   claim coverage this script does not provide, those languages are reported
 *   as skipped with a reason.
 *
 * Usage: npm run content:validate-snippets
 */
import { chromium, type Browser } from "playwright";
import { allLessons } from "@/lib/content/registry";
import { buildRunnerDoc } from "@/lib/runners/html-js-doc";
import { compileTypeScript } from "@/lib/runners/typescript-compile";
import type { Exercise } from "@/lib/content/types";

interface HarnessResult {
  id: string;
  passed: boolean;
  message: string;
}

const BROWSER_LANGUAGES = new Set(["javascript", "typescript", "html"]);
const SKIPPED_LANGUAGES = new Set(["python", "sql", "none"]);

/**
 * The result listener is embedded in the host page's own markup rather than
 * registered via `page.evaluate` beforehand: `setContent` replaces the
 * document, which would discard any previously-registered listener and hang
 * forever waiting for a message that can no longer be received.
 */
async function runInBrowser(
  browser: Browser,
  doc: string,
): Promise<{ results: HarnessResult[]; error?: string }> {
  const page = await browser.newPage();
  try {
    const encodedDoc = Buffer.from(doc, "utf8").toString("base64");
    await page.setContent(
      `<!doctype html><html><body>
<script>
  window.__runOutcome = undefined;
  window.addEventListener("message", function (event) {
    if (!event.data || event.data.type !== "visasparkschools-run-result") return;
    window.__runOutcome = {
      results: event.data.testResults || [],
      error: event.data.error,
    };
  });
  var frame = document.createElement("iframe");
  frame.setAttribute("sandbox", "allow-scripts allow-forms");
  frame.srcdoc = decodeURIComponent(escape(atob("${encodedDoc}")));
  document.body.appendChild(frame);
</script>
</body></html>`,
    );

    try {
      await page.waitForFunction("window.__runOutcome !== undefined", undefined, {
        timeout: 8000,
      });
    } catch {
      return { results: [], error: "timed out waiting for run result" };
    }

    return (await page.evaluate("window.__runOutcome")) as {
      results: HarnessResult[];
      error?: string;
    };
  } finally {
    await page.close();
  }
}

async function checkExercise(
  browser: Browser,
  lessonId: string,
  exercise: Exercise,
): Promise<string[]> {
  const failures: string[] = [];
  const label = `${lessonId} / ${exercise.id} (${exercise.language})`;

  let code = exercise.solutionCode;

  if (exercise.language === "typescript") {
    const compiled = await compileTypeScript(code);
    const errors = compiled.diagnostics.filter((d) => d.category === "error");
    if (errors.length > 0) {
      failures.push(
        `${label}: solutionCode does not type-check — ${errors
          .map((e) => `TS${e.code} ${e.message}`)
          .join("; ")}`,
      );
      return failures;
    }
    code = compiled.js;
  }

  const doc = buildRunnerDoc({
    language: exercise.language === "html" ? "html" : "javascript",
    code,
    harness: exercise.harness,
  });

  const { results, error } = await runInBrowser(browser, doc);
  if (error) {
    failures.push(`${label}: runtime error while running solutionCode — ${error}`);
    return failures;
  }

  // Every declared test must have actually reported, and reported a pass.
  for (const test of exercise.tests) {
    const reported = results.find((r) => r.id === test.id);
    if (!reported) {
      failures.push(
        `${label}: harness never reported test "${test.id}" (${test.description}) — the test id in \`tests\` does not match any __report() call.`,
      );
    } else if (!reported.passed) {
      failures.push(
        `${label}: reference solution FAILS its own check "${test.id}" (${test.description}) — ${reported.message}`,
      );
    }
  }
  return failures;
}

async function main() {
  const exercises: { lessonId: string; exercise: Exercise }[] = [];
  for (const lesson of allLessons) {
    exercises.push({ lessonId: lesson.id, exercise: lesson.guidedExercise });
    exercises.push({ lessonId: lesson.id, exercise: lesson.independentExercise });
  }

  const runnable = exercises.filter((e) => BROWSER_LANGUAGES.has(e.exercise.language));
  const skipped = exercises.filter((e) => SKIPPED_LANGUAGES.has(e.exercise.language));

  console.log("Validating exercise reference solutions against real runtimes…\n");
  console.log(`  ${runnable.length} browser-executable exercise(s) to run.`);
  console.log(
    `  ${skipped.length} python/sql exercise(s) skipped here (covered by Playwright e2e runner specs).\n`,
  );

  const browser = await chromium.launch();
  const allFailures: string[] = [];
  try {
    for (const { lessonId, exercise } of runnable) {
      const failures = await checkExercise(browser, lessonId, exercise);
      if (failures.length > 0) {
        allFailures.push(...failures);
        process.stdout.write("x");
      } else {
        process.stdout.write(".");
      }
    }
  } finally {
    await browser.close();
  }
  console.log("\n");

  if (allFailures.length > 0) {
    console.error(`✗ ${allFailures.length} snippet validation failure(s):\n`);
    for (const f of allFailures) console.error(`  - ${f}`);
    process.exit(1);
  }

  console.log(`✓ All ${runnable.length} browser-executable reference solutions pass their checks.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
