import { test, expect, devices } from "@playwright/test";

test.describe("mobile lesson navigation", () => {
  test.use({ viewport: devices["iPhone 13"].viewport, hasTouch: true, isMobile: true });

  test("mobile course-contents drawer opens, traps focus, and navigates", async ({ page }) => {
    await page.goto("/courses/html-css-fundamentals/html-document-structure");
    const trigger = page.getByRole("button", { name: "Course contents" });
    await trigger.click();
    const dialog = page.getByRole("dialog", {
      name: /html-css-fundamentals|HTML & CSS Fundamentals/i,
    });
    await expect(dialog).toBeVisible();

    // Tabbing past the last focusable element inside the drawer must wrap
    // back to the first one, not escape to the (still visually covered)
    // page behind it -- see lib/hooks/use-modal-a11y.ts.
    const focusableCount = await dialog.locator("a[href], button:not([disabled])").count();
    for (let i = 0; i < focusableCount + 2; i++) {
      await page.keyboard.press("Tab");
      const stillInDialog = await dialog.evaluate(
        (el, active) => el.contains(active),
        await page.evaluateHandle(() => document.activeElement),
      );
      expect(stillInDialog).toBe(true);
    }

    const secondLesson = dialog.getByRole("link").nth(1);
    await secondLesson.click();
    await expect(dialog).not.toBeVisible();
  });

  test("mobile course-contents drawer restores focus to its trigger on Escape", async ({
    page,
  }) => {
    await page.goto("/courses/html-css-fundamentals/html-document-structure");
    const trigger = page.getByRole("button", { name: "Course contents" });
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  });
});

test("AI tutor panel is honest when the optional feature is disabled", async ({
  page,
  isMobile,
}) => {
  await page.goto("/courses/html-css-fundamentals/html-document-structure");
  if (isMobile) {
    // On narrow viewports the tutor lives behind a floating trigger button
    // instead of an always-visible sidebar panel; the disabled notice is
    // also present (but hidden) in the desktop-only panel's markup, so
    // scope the assertion to the opened dialog to avoid ambiguity.
    await page.getByRole("button", { name: "AI tutor" }).click();
    await expect(
      page.getByRole("dialog", { name: "AI tutor" }).getByText(/isn't enabled in this deployment/i),
    ).toBeVisible();
  } else {
    await expect(page.getByText(/isn't enabled in this deployment/i)).toBeVisible();
  }
});

test("AI tutor dialog traps Tab focus and restores it to the trigger on Escape", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "the AI tutor only renders as a dialog below the xl breakpoint");
  await page.goto("/courses/html-css-fundamentals/html-document-structure");
  const trigger = page.getByRole("button", { name: "AI tutor" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "AI tutor" });
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

test("sign-in page explains accounts aren't configured, and guest mode still works", async ({
  page,
}) => {
  await page.goto("/sign-in");
  await expect(page.getByText(/aren't configured for this deployment/i)).toBeVisible();
  await page.getByRole("link", { name: /continue as a guest/i }).click();
  await expect(page).toHaveURL(/\/paths$/);
});

test("keyboard-only user can tab to and activate the skip link", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.locator(".skip-link");
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeVisible();
});
