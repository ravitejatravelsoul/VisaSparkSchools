import { test, expect } from "@playwright/test";

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
  await expect(page.getByText(/result/i)).toBeVisible();
  const resultLink = page.getByRole("link", { name: /flexbox/i }).first();
  await expect(resultLink).toBeVisible();
  await resultLink.click();
  await expect(page).toHaveURL(/flexbox/);
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
