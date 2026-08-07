import { test, expect } from "@playwright/test";

test("nav to Study Abroad directory to a country roadmap, then expand a step", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Primary").getByRole("link", { name: "Study Abroad" }).click();
  await expect(page).toHaveURL(/\/study-abroad$/);
  await expect(page.getByRole("heading", { name: "Study Abroad Roadmaps" })).toBeVisible();

  await page
    .getByRole("link")
    .filter({ has: page.getByRole("heading", { name: "United States" }) })
    .click();
  await expect(page).toHaveURL(/\/study-abroad\/united-states$/);
  await expect(page.getByRole("heading", { name: "Study in United States" })).toBeVisible();

  const firstStep = page.getByText("Clarify your goals and target degree level");
  await expect(firstStep).toBeVisible();
  await firstStep.click();
  await expect(page.getByText("Why it matters").first()).toBeVisible();
});

test("Study Abroad country page shows a VisaSpark callout that never links to a guessed URL", async ({
  page,
}) => {
  await page.goto("/study-abroad/canada");
  await expect(page.getByText("Planning the visa side too?")).toBeVisible();
  // No NEXT_PUBLIC_VISASPARK_URL is configured in this local/CI environment,
  // so the callout must render its disabled "coming soon" state, never a
  // clickable link to an invented address.
  await expect(page.getByText("VisaSpark website coming soon")).toBeVisible();
  await expect(page.getByRole("link", { name: /explore visaspark guidance/i })).toHaveCount(0);
});

test("an unknown country slug 404s instead of rendering an empty page", async ({ page }) => {
  const response = await page.goto("/study-abroad/narnia");
  expect(response?.status()).toBe(404);
});
