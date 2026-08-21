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

test("mobile header shows the full brand name, an auth CTA, and a >=44px menu button, with no horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 360, 375, 390, 412, 430]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");

    // Never icon-only: some form of the brand name is always visible.
    const brandLink = page.locator("header a[aria-label]").first();
    await expect(brandLink).toContainText(/VisaSpark/);

    // Exactly one auth CTA, and it meets the 44px touch-target minimum.
    const signIn = page.getByRole("link", { name: "Sign in" });
    await expect(signIn).toBeVisible();
    const signInBox = await signIn.boundingBox();
    expect(signInBox?.height).toBeGreaterThanOrEqual(44);

    const menuButton = page.getByRole("button", { name: "Open navigation menu" });
    const menuBox = await menuButton.boundingBox();
    expect(menuBox?.width).toBeGreaterThanOrEqual(44);
    expect(menuBox?.height).toBeGreaterThanOrEqual(44);

    const overflowX = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflowX, `horizontal overflow at ${width}px`).toBe(false);
  }
});

test("tablet/small-laptop widths (768-1279) use the mobile drawer, not a cramped full nav", async ({
  page,
}) => {
  for (const width of [768, 1024, 1152]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();

    // The full, untruncated brand name has room now that the link list is
    // deferred to the drawer -- this is the specific regression a previous
    // version of this layout had at these exact widths.
    await expect(page.getByRole("link", { name: "VisaSparkSchools" }).first()).toBeVisible();

    const overflowX = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflowX, `horizontal overflow at ${width}px`).toBe(false);
  }
});

test("desktop widths (1280+) show the full primary nav without wrapping or truncation", async ({
  page,
}) => {
  for (const width of [1280, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeHidden();
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav).toBeVisible();
    await expect(page.getByRole("link", { name: "VisaSparkSchools" }).first()).toBeVisible();

    // Every nav link and header button stays on a single line -- text
    // wrapping onto a second line was the concrete symptom of the
    // container-too-narrow regression this test guards against.
    const singleLineTargets = await page
      .locator('header a[href], header button:not([aria-label="Toggle theme"])')
      .all();
    for (const el of singleLineTargets) {
      if (!(await el.isVisible())) continue;
      const box = await el.boundingBox();
      expect(box?.height ?? 0, `${await el.textContent()} wrapped at ${width}px`).toBeLessThan(48);
    }

    const overflowX = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflowX, `horizontal overflow at ${width}px`).toBe(false);
  }
});
