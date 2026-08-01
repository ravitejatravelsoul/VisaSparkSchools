import { test, expect } from "@playwright/test";

test("homepage title states the product name exactly once", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  const occurrences = title.split("VisaSparkSchools").length - 1;
  expect(occurrences).toBe(1);
});

test("homepage to course to lesson navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByRole("link", { name: "Browse all courses" }).click();
  await expect(page).toHaveURL(/\/courses$/);
  await expect(page.getByRole("heading", { name: "Course catalog" })).toBeVisible();

  await page.getByRole("link", { name: /HTML & CSS Fundamentals/ }).click();
  await expect(page).toHaveURL(/\/courses\/html-css-fundamentals$/);

  await page.getByRole("link", { name: "Start this course" }).click();
  await expect(page).toHaveURL(/\/courses\/html-css-fundamentals\/.+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("404 page renders for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("Page not found")).toBeVisible();
});
