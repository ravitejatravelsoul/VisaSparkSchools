import { test, expect } from "./support/fixtures";

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

  // Scope to the card whose *heading* (course title) is this course, not just
  // any link whose flattened accessible name happens to contain the string --
  // catalog cards also show a "Helpful before you begin (optional): <course>"
  // line, so a plain substring/regex match on link name can hit a different
  // card that merely recommends this course as an (advisory) prerequisite.
  await page
    .getByRole("link")
    .filter({ has: page.getByRole("heading", { name: "HTML & CSS Fundamentals" }) })
    .click();
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

test("mobile: header nav drawer traps Tab focus and restores it to the trigger on Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/courses");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();

  const focusableCount = await dialog.locator("a[href], button:not([disabled])").count();
  for (let i = 0; i < focusableCount + 2; i++) {
    await page.keyboard.press("Tab");
    const activeInDialog = await dialog.evaluate(
      (el, active) => el.contains(active),
      await page.evaluateHandle(() => document.activeElement),
    );
    expect(activeInDialog).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
