import { test, expect } from "@playwright/test";

test("Tools Hub is reachable from the footer and lists real tools", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("link", { name: "Tools" }).click();
  await expect(page).toHaveURL(/\/tools$/);
  await expect(page.getByRole("heading", { level: 1, name: "Tools" })).toBeVisible();
  await expect(page.getByRole("link", { name: /JSON Formatter/i })).toBeVisible();
});

test("search filters the tools directory to a matching subset", async ({ page }) => {
  await page.goto("/tools");
  await page.getByLabel("Search tools").fill("regex");
  await expect(page.getByRole("link", { name: /Regex Tester/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /JSON Formatter/i })).not.toBeVisible();
});

test("category filter narrows the tools directory", async ({ page }) => {
  await page.goto("/tools");
  await page.getByRole("button", { name: "Design" }).click();
  await expect(page.getByRole("link", { name: /Color Contrast Checker/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /JSON Formatter/i })).not.toBeVisible();
});

test("JSON Formatter formats valid JSON and reports an error for invalid JSON", async ({
  page,
}) => {
  await page.goto("/tools/json-formatter");
  await expect(page.getByRole("heading", { level: 1, name: "JSON Formatter" })).toBeVisible();

  await page.getByLabel("JSON input").fill('{"a":1}');
  await expect(page.getByLabel("Result")).toHaveValue('{\n  "a": 1\n}');

  await page.getByLabel("JSON input").fill("{not valid");
  // The page also has a route-announcer live region with role="alert" --
  // assert on the specific error text rather than the ambiguous role alone.
  await expect(page.getByText(/Expected property name/)).toBeVisible();
});

test("Color Contrast Checker shows a real WCAG ratio and pass/fail badges", async ({ page }) => {
  await page.goto("/tools/color-contrast-checker");
  await page.getByLabel("Text color", { exact: true }).fill("#000000");
  await page.getByLabel("Background color", { exact: true }).fill("#ffffff");
  await expect(page.getByText(/Contrast ratio: 21\.00:1/)).toBeVisible();
  await expect(page.getByText("AA normal text: Pass", { exact: true })).toBeVisible();
});

test("timestamp converter converts a known Unix timestamp to its real UTC date", async ({
  page,
}) => {
  await page.goto("/tools/timestamp-converter");
  await page.getByLabel(/Unix timestamp/).fill("0");
  await expect(page.getByText(/01 Jan 1970/)).toBeVisible();
});

test("a related course link on a tool page resolves to a real course page", async ({ page }) => {
  await page.goto("/tools/color-contrast-checker");
  const link = page.getByRole("link", { name: "HTML & CSS Fundamentals" });
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/courses\/html-css-fundamentals$/);
});

test("an unknown tool slug 404s", async ({ page }) => {
  const response = await page.goto("/tools/not-a-real-tool");
  expect(response?.status()).toBe(404);
});

test("the tools directory page never ships an individual tool's own implementation code", async ({
  page,
}) => {
  // Distinctive helper function names that only exist in specific tools'
  // own implementation files -- not component display names, since Next's
  // dynamic-import loader legitimately references chunk/component *names*
  // in the landing bundle without including their actual code (see the
  // identical pattern in tests/e2e/study-studio.spec.ts). If any of these
  // show up in a script response on the directory page, that tool's logic
  // leaked into the initial bundle instead of being lazy-loaded per-route.
  const markers = ["encodeBase64", "decodeBase64", "diffLines", "evaluateWcag"];
  const leaked: string[] = [];

  page.on("response", async (res) => {
    const url = res.url();
    if (!url.includes("/_next/static/chunks/")) return;
    try {
      const body = await res.text();
      if (markers.some((m) => body.includes(m))) leaked.push(url);
    } catch {
      // Response body may not always be available; not itself a failure.
    }
  });

  await page.goto("/tools");
  await page.waitForLoadState("networkidle");

  expect(leaked).toEqual([]);
});
