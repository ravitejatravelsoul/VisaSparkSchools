import { test, expect } from "./support/fixtures";

test("Learn page renders with correctly spaced dynamic text", async ({ page }) => {
  await page.goto("/learn");
  await expect(page.getByRole("heading", { level: 1, name: "Learn" })).toBeVisible();

  // Regression test: a JSX `{expr} text` adjacency on the same source line
  // was observed to lose its leading space after a `prettier --write` pass
  // collapsed an explicit `{" "}` line-break form back onto one line (see
  // PROJECT_STATUS.md's Phase 3 corrections) -- fixed by switching to
  // template-literal strings, which Prettier can't reformat internally.
  // This test guards against the bug recurring in either form.
  const bodyText = (await page.textContent("body")) ?? "";
  expect(bodyText).toContain("83 technology guides");
  expect(bodyText).not.toContain("83technology");
  expect(bodyText).toContain("16 categories");
  expect(bodyText).not.toContain("16categories");
});

test("Learn page links to categories, technologies, courses, and roadmaps", async ({ page }) => {
  await page.goto("/learn");
  // Each entry-point card is itself the link (a larger click target than
  // just the trailing call-to-action text), so its accessible name is the
  // whole card's text; match on the call-to-action phrase as a substring.
  // The trailing arrow is now a decorative (aria-hidden) icon, not text.
  await expect(page.getByRole("link", { name: "Explore categories" })).toHaveAttribute(
    "href",
    "/categories",
  );
  await expect(page.getByRole("link", { name: "Search technologies" })).toHaveAttribute(
    "href",
    "/technologies",
  );
  await expect(page.getByRole("link", { name: "Browse courses" })).toHaveAttribute(
    "href",
    "/courses",
  );
  await expect(page.getByRole("link", { name: "See roadmaps" })).toHaveAttribute(
    "href",
    "/roadmaps",
  );
});
