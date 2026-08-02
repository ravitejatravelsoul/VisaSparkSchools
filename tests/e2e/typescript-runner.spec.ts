import { test, expect } from "@playwright/test";

// The TypeScript runner executes the compiled JS inside a *hidden* iframe
// (unlike the HTML/JS runner's visible one) -- output is relayed back via
// postMessage and rendered in a "Console" panel in the page itself, not
// inside the iframe's own document. See components/runners/typescript-runner.tsx.
test("TypeScript playground tab compiles and runs the starter example", async ({ page }) => {
  await page.goto("/playground");
  await page.getByRole("tab", { name: "TypeScript" }).click();
  await page.getByRole("button", { name: "Run" }).click();
  await expect(page.getByText("Console", { exact: true })).toBeVisible();
  await expect(page.getByText("Hello, world!")).toBeVisible();
});

test("a TypeScript lesson's editable example reports a genuine type error, not a fake pass", async ({
  page,
}) => {
  await page.goto("/courses/typescript-foundations/ts-why-types");
  // The lesson page renders several Monaco editors (a non-editable example,
  // an editable example, a guided exercise, an independent exercise); typing
  // via keyboard simulation fights Monaco's own autocomplete/bracket-closing,
  // so set the editable example's content directly through Monaco's API --
  // the same approach used to reliably drive it in manual verification.
  await page.waitForSelector(".monaco-editor");
  const editableExampleValue =
    'let count: number = 1;\ncount = "not a number";\nconsole.log(count);';
  await page.evaluate((code) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editors = (window as any).monaco.editor.getEditors();
    editors[0].setValue(code);
  }, editableExampleValue);

  const runButtons = page.getByRole("button", { name: "Run", exact: true });
  await runButtons.first().click();

  // A real type-checker reports the assignment error with its TS code...
  await expect(page.getByText(/TS2322/)).toBeVisible();
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
