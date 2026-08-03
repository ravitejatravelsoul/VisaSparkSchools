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

test("search shows a helpful empty state for a nonsense query", async ({ page }) => {
  await page.goto("/search");
  await page
    .getByPlaceholder(/search lessons, courses, projects/i)
    .fill("zzzzznonexistentqueryxyz");
  await expect(page.getByText(/no results for/i)).toBeVisible();
});
