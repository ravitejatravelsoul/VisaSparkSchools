import { test, expect } from "@playwright/test";

// The TypeScript runner executes the compiled JS inside a *hidden* iframe
// (unlike the HTML/JS runner's visible one) -- output is relayed back via
// postMessage and rendered in a "Console" panel in the page itself, not
// inside the iframe's own document. See components/runners/typescript-runner.tsx.
//
// Phase 5D investigated a reported intermittent mobile-chromium timeout on
// this file's second test. Two real, distinct issues were found:
//
// 1. (Primary cause) The test targeted "the editable example's editor" via
//    `monaco.editor.getEditors()[0]` -- Monaco's GLOBAL registration order,
//    which is not guaranteed to match the page's DOM/visual order. Under
//    real, reproduced heavy load, a later-in-DOM editor registered with
//    Monaco before an earlier one did, so `editors[0]` silently pointed at
//    the wrong editor: the injected type-error code landed somewhere else,
//    the editable example's "Run" button ran its original, error-free
//    starter code, and the expected TS2322 diagnostic never appeared --
//    not because anything was slow, but because the wrong code had run.
//    Fixed in this file by locating the intended editor through its
//    accessible name instead of registration order (see below), and in
//    components/runners/code-editor.tsx by giving Monaco's real editor
//    instance the same `aria-label` its plain-textarea fallback already
//    had -- a genuine accessibility gap on its own (a screen reader user
//    previously had no way to distinguish this lesson's several editors by
//    name once Monaco loaded), which is also what makes this reliable,
//    non-index-based targeting possible.
// 2. (Secondary, real but smaller) The TypeScript compiler chunk itself is
//    large (~3.3 MB minified -- see lib/runners/typescript-compile.ts) and
//    requires a genuine, synchronous compile pass on the main thread.
//    Reproduced under `npx playwright test --workers=16` (this machine's
//    logical core count): unrelated tests that normally finish in ~1-2s
//    took 7-10s, and this file's tests finished within Playwright's default
//    5000ms expect() timeout, but only barely (~4.1s). TS_COMPILE_TIMEOUT_MS
//    gives exactly the assertions that wait on that one expensive operation
//    real, evidence-based margin -- not a global or per-test timeout change.
const TS_COMPILE_TIMEOUT_MS = 15_000;

test("TypeScript playground tab compiles and runs the starter example", async ({ page }) => {
  await page.goto("/playground");
  await page.getByRole("tab", { name: "TypeScript" }).click();
  await page.getByRole("button", { name: "Run" }).click();
  await expect(page.getByText("Console", { exact: true })).toBeVisible({
    timeout: TS_COMPILE_TIMEOUT_MS,
  });
  await expect(page.getByText("Hello, world!")).toBeVisible();
});

test("a TypeScript lesson's editable example reports a genuine type error, not a fake pass", async ({
  page,
}) => {
  await page.goto("/courses/typescript-foundations/ts-why-types");
  // The lesson page renders several Monaco editors (a non-editable example,
  // an editable example, a guided exercise, an independent exercise); typing
  // via keyboard simulation fights Monaco's own autocomplete/bracket-closing,
  // so set the editable example's content directly through Monaco's API.
  //
  // Phase 5D root-caused a real bug in how this test used to do that:
  // `monaco.editor.getEditors()[0]` indexes into Monaco's GLOBAL editor
  // registry in *registration* order, which is not guaranteed to match the
  // page's visual/DOM order -- under heavy load (several editors mounting
  // concurrently), a later-in-DOM editor (e.g. the independent exercise's)
  // was observed registering with Monaco before the editable example's did,
  // so `editors[0]` silently pointed at the WRONG editor. The injected code
  // landed in that wrong editor while the editable example kept its
  // original starter code, so its "Run" button produced no type error at
  // all -- correctly proving nothing, since the wrong code had actually run.
  // Fixed by locating the specific editor via its accessible name (now set
  // on the real Monaco instance too, not just CodeEditor's plain-textarea
  // fallback -- see components/runners/code-editor.tsx) and confirming the
  // Monaco editor instance whose own DOM node contains that exact element,
  // rather than trusting registration order at all.
  const editableExampleValue =
    'let count: number = 1;\ncount = "not a number";\nconsole.log(count);';
  const editableExampleEditor = page.getByRole("textbox", {
    name: "TypeScript editor",
    exact: true,
  });
  await editableExampleEditor.waitFor();
  // CodeEditor genuinely falls back to a plain <textarea> if Monaco itself
  // hasn't mounted within 6s (components/runners/code-editor.tsx) -- real
  // behavior a learner could see under a slow connection, not just a test
  // artifact. Handle both real cases rather than assuming Monaco loaded.
  const usesMonaco = await editableExampleEditor.evaluate(
    (el) => el.closest(".monaco-editor") !== null,
  );
  if (usesMonaco) {
    await editableExampleEditor.evaluate((el, code) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const editors = (window as any).monaco.editor.getEditors();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const editor = editors.find((e: any) => e.getDomNode()?.contains(el));
      if (!editor) throw new Error("No Monaco editor instance found for the located element");
      editor.setValue(code);
    }, editableExampleValue);
  } else {
    await editableExampleEditor.fill(editableExampleValue);
  }

  const runButtons = page.getByRole("button", { name: "Run", exact: true });
  await runButtons.first().click();

  // A real type-checker reports the assignment error with its TS code... (see
  // TS_COMPILE_TIMEOUT_MS above for why this specific assertion gets extra margin)
  await expect(page.getByText(/TS2322/)).toBeVisible({ timeout: TS_COMPILE_TIMEOUT_MS });
  // ...while still emitting and running the (untyped-at-runtime) JS: TypeScript
  // erases types, so the reassignment actually succeeds at runtime and the
  // console genuinely logs the reassigned string -- proving this is a real
  // compiler doing both type-checking and emission, not a fake pass/fail
  // simulation that would simply refuse to run on a type error. The page has
  // several other TypeScript editors (other exercises) with their own
  // "Console" labels, so this asserts presence via .first() rather than
  // strict-mode uniqueness.
  await expect(page.getByText("Console", { exact: true }).first()).toBeVisible();
  await expect(page.locator("li").filter({ hasText: "not a number" }).first()).toBeVisible();
});

test("the TypeScript compiler chunk is not requested on the homepage", async ({ page }) => {
  const tsChunkRequested: string[] = [];
  page.on("request", (req) => {
    const url = req.url();
    if (url.includes("typescript") && (url.endsWith(".js") || url.includes("/_next/"))) {
      tsChunkRequested.push(url);
    }
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(tsChunkRequested).toEqual([]);
});
