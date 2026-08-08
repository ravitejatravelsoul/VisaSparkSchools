import { test, expect } from "./support/fixtures";

test("HTML/CSS/JS playground example runs and shows output", async ({ page }) => {
  await page.goto("/playground");
  await page.getByRole("button", { name: "Run" }).click();
  const frame = page.frameLocator('iframe[title="Code output"]');
  await expect(frame.getByRole("heading", { name: "Hello, world!" })).toBeVisible();
});

test("SQL playground query runs and shows a results table", async ({ page }) => {
  await page.goto("/playground");
  await page.getByRole("tab", { name: "SQL" }).click();
  await page.getByRole("button", { name: "Run query" }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "Norwegian Wood" })).toBeVisible();
});

test("an exercise gives progressive hints without revealing the solution immediately", async ({
  page,
}) => {
  await page.goto("/courses/javascript-fundamentals/js-variables-types");
  const hintButton = page.getByRole("button", { name: "Show a hint" }).first();
  await hintButton.scrollIntoViewIfNeeded();
  await hintButton.click();
  await expect(page.getByText("Hint 1:")).toBeVisible();
  await expect(page.getByText("Hint 2:")).not.toBeVisible();
});
