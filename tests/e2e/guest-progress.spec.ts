import { test, expect } from "@playwright/test";

test("guest learner can complete a lesson and progress survives a refresh", async ({ page }) => {
  await page.goto("/courses/html-css-fundamentals/html-document-structure");

  const completeButton = page.getByRole("button", { name: "Mark lesson complete" });
  await expect(completeButton).toBeVisible();
  await completeButton.click();

  await expect(page.getByText("Lesson completed")).toBeVisible();

  await page.reload();
  await expect(page.getByText("Lesson completed")).toBeVisible();
});

test("bookmarking a lesson persists across a refresh", async ({ page }) => {
  await page.goto("/courses/html-css-fundamentals/html-document-structure");

  const bookmarkButton = page.getByRole("button", { name: /bookmark/i });
  await bookmarkButton.click();
  await expect(bookmarkButton).toHaveAttribute("aria-pressed", "true");

  await page.reload();
  await expect(page.getByRole("button", { name: /bookmarked/i })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
