import { test, expect } from "./support/fixtures";

test("completing a quiz shows a score", async ({ page }) => {
  await page.goto("/courses/javascript-fundamentals/js-variables-types");
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

test("search finds a lesson by keyword and links to it", async ({ page }) => {
  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("flexbox");
  // Not `getByText(/result/i)`: that regex also matches any lesson card
  // whose own description happens to contain the word "result" (e.g. "...
  // seeing a result on screen"), a strict-mode violation once more than one
  // card is present. Waiting directly for the specific expected result link
  // is both more precise and already implies filtering completed.
  const resultLink = page.getByRole("link", { name: /flexbox/i }).first();
  await expect(resultLink).toBeVisible();
  await resultLink.click();
  await expect(page).toHaveURL(/flexbox/);
});

test("a shared/bookmarked search URL (?q=) reproduces the same filtered result set, not a blank search box", async ({
  page,
}) => {
  await page.goto("/search?q=flexbox");
  await expect(page.getByPlaceholder(/search lessons, courses, projects/i)).toHaveValue("flexbox");
  await expect(page.getByRole("link", { name: /flexbox/i }).first()).toBeVisible();

  // Typing further updates the URL too, so the address bar always matches
  // what's on screen and stays shareable.
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("css grid");
  await expect(page).toHaveURL(/[?&]q=css(\+|%20)grid/);
});

test("search finds Phase 5B content by keyword across Java, DSA, and PostgreSQL courses", async ({
  page,
}) => {
  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("polymorphism");
  await expect(page.getByRole("link", { name: /polymorphism/i }).first()).toBeVisible();

  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("normalization");
  await expect(
    page.getByRole("link", { name: /normal form|normalization/i }).first(),
  ).toBeVisible();
});

test("a Java lesson's quiz shows a score", async ({ page }) => {
  await page.goto("/courses/java-programming-foundations/java-jvm-and-execution");
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

test("search finds Phase 5C content by keyword across Playwright, Selenium, Linux/Shell, and Test Automation Framework Engineering", async ({
  page,
}) => {
  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("trace viewer");
  await expect(page.getByRole("link", { name: /trace viewer/i }).first()).toBeVisible();

  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("fluent wait");
  await expect(page.getByRole("link", { name: /fluent wait/i }).first()).toBeVisible();

  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("pipefail");
  await expect(page.getByRole("link", { name: /pipefail/i }).first()).toBeVisible();

  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("quality gates");
  await expect(page.getByRole("link", { name: /quality gates/i }).first()).toBeVisible();
});

test("a Playwright lesson's quiz shows a score", async ({ page }) => {
  await page.goto("/courses/playwright-web-automation/pw-architecture-and-setup");
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

test("a Test Automation Framework Engineering lesson's quiz shows a score", async ({ page }) => {
  await page.goto("/courses/test-automation-framework-engineering/tafe-framework-goals-boundaries");
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

test("search shows a helpful empty state for a nonsense query", async ({ page }) => {
  await page.goto("/search");
  await page
    .getByPlaceholder(/search lessons, courses, projects/i)
    .fill("zzzzznonexistentqueryxyz");
  await expect(page.getByText(/no results for/i)).toBeVisible();
});
