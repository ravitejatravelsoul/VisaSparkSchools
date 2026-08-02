import { test, expect } from "@playwright/test";

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
  expect(bodyText).toContain("80 technology guides");
  expect(bodyText).not.toContain("80technology");
  expect(bodyText).toContain("13 categories");
  expect(bodyText).not.toContain("13categories");
});

test("Learn page links to categories, technologies, courses, and roadmaps", async ({ page }) => {
  await page.goto("/learn");
  await expect(page.getByRole("link", { name: "Explore categories →" })).toHaveAttribute(
    "href",
    "/categories",
  );
  await expect(page.getByRole("link", { name: "Search technologies →" })).toHaveAttribute(
    "href",
    "/technologies",
  );
  await expect(page.getByRole("link", { name: "Browse courses →" })).toHaveAttribute(
    "href",
    "/courses",
  );
  await expect(page.getByRole("link", { name: "See roadmaps →" })).toHaveAttribute(
    "href",
    "/roadmaps",
  );
});
