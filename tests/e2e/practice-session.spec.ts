import { test, expect } from "./support/fixtures";

test("a Quantitative Aptitude lesson's quiz shows a score", async ({ page }) => {
  await page.goto("/courses/quantitative-aptitude/percentages");
  const quiz = page.locator("form", { hasText: "Knowledge check" });
  await quiz.scrollIntoViewIfNeeded();

  const fieldsets = quiz.locator("fieldset");
  const count = await fieldsets.count();
  for (let i = 0; i < count; i++) {
    await fieldsets.nth(i).locator('input[type="radio"]').first().check();
  }

  await quiz.getByRole("button", { name: "Check answers" }).click();
  await expect(quiz.getByText(/you scored \d out of \d/i)).toBeVisible();
});

test("search finds Phase 6 content across Aptitude, Reasoning, and Career/GD preparation", async ({
  page,
}) => {
  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("syllogisms");
  await expect(page.getByRole("link", { name: /syllogisms/i }).first()).toBeVisible();

  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("STAR method");
  await expect(page.getByRole("link", { name: /star method/i }).first()).toBeVisible();
});

test("a full untimed practice session: start, answer every question, finish, and see a score", async ({
  page,
}) => {
  await page.goto("/courses/quantitative-aptitude/practice");
  await expect(page.getByText(/not a proctored or officially scored exam/i)).toBeVisible();

  await page.getByRole("button", { name: "Start practice" }).click();

  const fieldsets = page.locator("fieldset");
  const count = await fieldsets.count();
  expect(count).toBeGreaterThanOrEqual(36);
  for (let i = 0; i < count; i++) {
    await fieldsets.nth(i).locator('input[type="radio"]').first().check();
  }

  await page.getByRole("button", { name: "Finish practice session" }).click();
  await expect(page.getByText(/you scored \d+ out of \d+/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Start a new session" })).toBeVisible();
});

test("a practice attempt's best score persists as a guest across a refresh", async ({ page }) => {
  await page.goto("/courses/quantitative-aptitude/practice");
  await page.getByRole("button", { name: "Start practice" }).click();

  const fieldsets = page.locator("fieldset");
  const count = await fieldsets.count();
  for (let i = 0; i < count; i++) {
    await fieldsets.nth(i).locator('input[type="radio"]').first().check();
  }
  await page.getByRole("button", { name: "Finish practice session" }).click();
  await expect(page.getByText(/you scored \d+ out of \d+/i)).toBeVisible();

  await page.getByRole("button", { name: "Start a new session" }).click();
  await expect(page.getByText(/Best score:/)).toBeVisible();

  await page.reload();
  await expect(page.getByText(/Best score:/)).toBeVisible();
});

test("timed mode offers a time limit choice and shows a countdown once started", async ({
  page,
}) => {
  await page.goto("/courses/logical-analytical-reasoning/practice");
  await page.getByLabel(/timed \(explanations shown at the end\)/i).check();
  await expect(page.getByLabel(/time limit/i)).toBeVisible();

  await page.getByRole("button", { name: "Start practice" }).click();
  await expect(page.getByText(/time remaining:/i)).toBeVisible();
});

test("the practice-session bundle is not requested on the homepage or an unrelated lesson page", async ({
  page,
}) => {
  // Distinctive strings that only appear in the practice engine's own code
  // (lib/practice/scoring.ts, components/practice/practice-session.tsx) --
  // not in any other page's markup or lesson content -- so finding either
  // in a script response means the practice bundle leaked into a page that
  // never renders it.
  const markers = ["scorePracticeSession", "PracticeSession"];
  const leaked: string[] = [];

  page.on("response", async (res) => {
    const url = res.url();
    if (!url.includes("/_next/static/chunks/")) return;
    try {
      const body = await res.text();
      if (markers.some((m) => body.includes(m))) leaked.push(url);
    } catch {
      // Response body may not be available for every request; not a test failure.
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.goto("/courses/javascript-fundamentals/js-variables-types");
  await page.waitForLoadState("networkidle");

  expect(leaked).toEqual([]);
});

test("practice page has correct breadcrumbs and canonical structure", async ({ page }) => {
  await page.goto("/courses/career-and-gd-preparation/practice");
  const breadcrumb = page.getByLabel("Breadcrumb");
  await expect(breadcrumb.getByRole("link", { name: "Courses" })).toBeVisible();
  await expect(breadcrumb.getByText("Practice")).toBeVisible();
  await expect(page.getByRole("heading", { name: /practice:/i })).toBeVisible();
});
