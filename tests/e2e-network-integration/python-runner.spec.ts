import { test, expect } from "./support/fixtures";

// Moved here from tests/e2e/ -- Pyodide is a multi-MB WebAssembly runtime
// fetched from cdn.jsdelivr.net on first use, which the default guest/
// offline profile no longer permits (see support/fixtures.ts in this
// directory for why: vendoring Pyodide locally would mean shipping a large,
// separately-licensed runtime, and faking its execution would stop this
// test from testing anything real). Run via `npm run e2e:network-integration`
// -- not part of `npm run e2e` or CI. Give it a generous timeout so this
// isn't flaky on a slow connection.
test("Python playground loads Pyodide and executes code", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/playground");
  await page.getByRole("tab", { name: "Python" }).click();
  await page.getByRole("button", { name: "Run" }).click();
  await expect(page.getByText("Hello, world!")).toBeVisible({ timeout: 45_000 });
});
