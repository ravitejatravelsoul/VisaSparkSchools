import { test, expect } from "./support/fixtures";

// Pyodide is a multi-MB WebAssembly runtime fetched from a CDN on first use;
// give it a generous timeout so this isn't flaky on a slow connection.
test("Python playground loads Pyodide and executes code", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/playground");
  await page.getByRole("tab", { name: "Python" }).click();
  await page.getByRole("button", { name: "Run" }).click();
  await expect(page.getByText("Hello, world!")).toBeVisible({ timeout: 45_000 });
});
