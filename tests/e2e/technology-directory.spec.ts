import { test, expect } from "@playwright/test";

test("homepage to Learn to categories to technology directory to a technology guide", async ({
  page,
  isMobile,
}) => {
  // The primary nav (including "Learn") is hidden below the `md:` breakpoint
  // in favor of the mobile drawer -- general mobile nav behavior (opens,
  // navigates, doesn't trap focus) is already covered by
  // tests/e2e/mobile-and-modes.spec.ts; this test exercises the desktop nav specifically.
  test.skip(isMobile, "desktop nav is hidden on mobile; see mobile-and-modes.spec.ts");
  await page.goto("/");
  await page.getByRole("link", { name: "Learn" }).first().click();
  await expect(page).toHaveURL(/\/learn$/);
  await expect(page.getByRole("heading", { level: 1, name: "Learn" })).toBeVisible();

  await page.getByRole("link", { name: "Browse by category" }).click();
  await expect(page).toHaveURL(/\/categories$/);
  await expect(page.getByRole("heading", { name: "Explore by category" })).toBeVisible();

  await page.getByRole("link", { name: /Artificial Intelligence/ }).click();
  await expect(page).toHaveURL(/\/categories\/artificial-intelligence$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Artificial Intelligence" }),
  ).toBeVisible();
});

test("category page links to a real technology guide with genuine content", async ({ page }) => {
  await page.goto("/categories/programming-languages");
  await page.getByRole("heading", { level: 3, name: "Rust" }).click();
  await expect(page).toHaveURL(/\/technologies\/rust$/);
  await expect(page.getByRole("heading", { level: 1, name: "Rust" })).toBeVisible();
  await expect(page.getByText("Core concepts")).toBeVisible();
  await expect(page.getByText("Official references")).toBeVisible();
});

test("search for 'JS' finds JavaScript", async ({ page }) => {
  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("JS");
  await expect(page.getByRole("link", { name: /JavaScript/ }).first()).toBeVisible();
});

test("search for 'DSA' finds Data Structures and Algorithms", async ({ page }) => {
  await page.goto("/search");
  await page.getByPlaceholder(/search lessons, courses, projects/i).fill("DSA");
  await expect(
    page.getByRole("link", { name: /Data Structures and Algorithms/ }).first(),
  ).toBeVisible();
});

test("technology directory: filter by category updates the URL and result count", async ({
  page,
  isMobile,
}) => {
  // The desktop filter row is intentionally hidden below the `sm:` breakpoint
  // in favor of the mobile filter drawer -- covered separately below.
  test.skip(isMobile, "desktop filter controls are hidden on mobile; see the drawer test");
  await page.goto("/technologies");
  const resultCount = page.locator('p[aria-live="polite"]');
  const initialCount = parseInt((await resultCount.textContent()) ?? "0", 10);

  await page.getByLabel("Filter by category").selectOption("cybersecurity");
  await expect(page).toHaveURL(/category=cybersecurity/);
  const filteredCount = parseInt((await resultCount.textContent()) ?? "0", 10);
  expect(filteredCount).toBeLessThan(initialCount);
});

test("technology directory: filter by course availability then reset filters", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "desktop filter controls are hidden on mobile; see the drawer test");
  await page.goto("/technologies");
  await page.getByLabel("Filter by category").selectOption("frontend");
  await expect(page).toHaveURL(/category=frontend/);

  await page.getByText("Reset filters").click();
  await expect(page).not.toHaveURL(/category=frontend/);
});

test("technology directory: no-results state for a nonsense search", async ({ page }) => {
  await page.goto("/technologies");
  await page.getByPlaceholder(/search technologies/i).fill("zzzznonexistentzzzz");
  await expect(page.getByText(/no technologies match these filters/i)).toBeVisible();
});

test("guide-only technology never shows a fake 'Start course' action", async ({ page }) => {
  // Kotlin got a real course (courseId: "kotlin-fundamentals") once the Phase 7
  // technical-course expansion shipped, so it's no longer a guide-only example --
  // use "rust", which stays outside that expansion's scope and has no courseId
  // and no runnerSupport in the registry.
  await page.goto("/technologies/rust");
  await expect(page.getByRole("link", { name: /start course/i })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /open playground/i })).toHaveCount(0);
  await expect(page.getByText(/guide only/i)).toBeVisible();
});

test("a technology with a real course shows a real, working 'Start course' action", async ({
  page,
}) => {
  await page.goto("/technologies/python");
  const startCourse = page.getByRole("link", { name: /start course/i });
  await expect(startCourse).toBeVisible();
  await startCourse.click();
  await expect(page).toHaveURL(/\/courses\/python-fundamentals$/);
});

test("the Java technology guide (previously guide-only) now shows a real, working 'Start course' action (Phase 5B)", async ({
  page,
}) => {
  await page.goto("/technologies/java");
  const startCourse = page.getByRole("link", { name: /start course/i });
  await expect(startCourse).toBeVisible();
  await startCourse.click();
  await expect(page).toHaveURL(/\/courses\/java-programming-foundations$/);
});

test("the PostgreSQL technology guide (previously guide-only) now shows a real, working 'Start course' action (Phase 5B)", async ({
  page,
}) => {
  await page.goto("/technologies/postgresql");
  const startCourse = page.getByRole("link", { name: /start course/i });
  await expect(startCourse).toBeVisible();
  await startCourse.click();
  await expect(page).toHaveURL(/\/courses\/database-design-and-postgresql$/);
});

test("the Playwright technology guide (previously guide-only) now shows a real, working 'Start course' action (Phase 5C)", async ({
  page,
}) => {
  await page.goto("/technologies/playwright");
  const startCourse = page.getByRole("link", { name: /start course/i });
  await expect(startCourse).toBeVisible();
  await startCourse.click();
  await expect(page).toHaveURL(/\/courses\/playwright-web-automation$/);
});

test("the Selenium technology guide (previously guide-only) now shows a real, working 'Start course' action (Phase 5C)", async ({
  page,
}) => {
  await page.goto("/technologies/selenium");
  const startCourse = page.getByRole("link", { name: /start course/i });
  await expect(startCourse).toBeVisible();
  await startCourse.click();
  await expect(page).toHaveURL(/\/courses\/selenium-webdriver-automation$/);
});

test("the Bash and Linux technology guides (previously guide-only) now show a real, working 'Start course' action (Phase 5C)", async ({
  page,
}) => {
  await page.goto("/technologies/bash");
  const startCourseBash = page.getByRole("link", { name: /start course/i });
  await expect(startCourseBash).toBeVisible();
  await startCourseBash.click();
  await expect(page).toHaveURL(/\/courses\/linux-shell-fundamentals$/);

  await page.goto("/technologies/linux");
  const startCourseLinux = page.getByRole("link", { name: /start course/i });
  await expect(startCourseLinux).toBeVisible();
  await startCourseLinux.click();
  await expect(page).toHaveURL(/\/courses\/linux-shell-fundamentals$/);
});

test("a technology with runner support shows a working 'Open playground' action", async ({
  page,
}) => {
  await page.goto("/technologies/sql");
  const openPlayground = page.getByRole("link", { name: /open playground/i });
  await expect(openPlayground).toBeVisible();
  await openPlayground.click();
  await expect(page).toHaveURL(/\/playground\?lang=sql/);
  // The SQL tab should be pre-selected via the query param. `exact: true`
  // disambiguates from the split-runner's own mobile-only editor/output
  // toggle tab (components/runners/split-runner-layout.tsx), whose SQL
  // runner instance is labeled "SQL query editor" -- a substring match on
  // "SQL" would otherwise also match that unrelated tab on mobile viewports.
  await expect(page.getByRole("tab", { name: "SQL", exact: true, selected: true })).toBeVisible();
});

test("a legacy technology clearly explains its legacy status", async ({ page }) => {
  await page.goto("/technologies/angularjs");
  await expect(page.getByText("Legacy technology")).toBeVisible();
  await expect(page.getByText(/unmaintained/i).first()).toBeVisible();
});

test("a valid public learning roadmap renders its steps", async ({ page }) => {
  await page.goto("/roadmaps/complete-beginner-to-web-developer");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Complete Beginner to Web Developer",
  );
  await expect(page.getByText("not a certifiable, assessed course path")).toBeVisible();
  await expect(page.getByText("Steps")).toBeVisible();
});

test("an invalid technology slug returns 404", async ({ page }) => {
  const response = await page.goto("/technologies/this-technology-does-not-exist");
  expect(response?.status()).toBe(404);
});

test("an invalid category slug returns 404", async ({ page }) => {
  const response = await page.goto("/categories/this-category-does-not-exist");
  expect(response?.status()).toBe(404);
});

test("Quantitative Aptitude is publicly reachable (Phase 6: no longer an internal draft)", async ({
  page,
}) => {
  const response = await page.goto("/categories/quantitative-aptitude");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: "Quantitative Aptitude" }),
  ).toBeVisible();
});

test("filter state survives a full page refresh via the URL", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop filter controls are hidden on mobile; see the drawer test");
  await page.goto("/technologies?category=databases&difficulty=beginner");
  await expect(page.getByLabel("Filter by category")).toHaveValue("databases");
  await page.reload();
  await expect(page.getByLabel("Filter by category")).toHaveValue("databases");
  await expect(page.getByLabel("Filter by difficulty")).toHaveValue("beginner");
});

test("mobile: technology directory filter drawer opens, applies a filter, and closes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/technologies");
  await page.getByRole("button", { name: /^Filters/ }).click();
  await expect(page.getByRole("dialog", { name: "Filter technologies" })).toBeVisible();

  await page.getByRole("dialog").getByLabel("Filter by category").selectOption("databases");
  await page.getByRole("dialog").getByRole("button", { name: /show/i }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/category=databases/);
});

test("mobile: filter drawer traps Tab focus and restores it to the trigger on Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/technologies");
  const trigger = page.getByRole("button", { name: /^Filters/ });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Filter technologies" });
  await expect(dialog).toBeVisible();

  const focusableCount = await dialog
    .locator("a[href], button:not([disabled]), select, input")
    .count();
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
