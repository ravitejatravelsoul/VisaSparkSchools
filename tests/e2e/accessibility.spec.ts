import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/paths",
  "/courses",
  "/courses/html-css-fundamentals/html-document-structure",
  "/courses/javascript-fundamentals/js-variables-types",
  "/courses/python-fundamentals/py-syntax-types",
  "/courses/git-apis-sql/sql-select-filtering",
  "/courses/ai-foundations/ai-what-is-ai",
  "/dashboard",
  "/profile",
  "/courses/how-computing-works",
  "/projects/personal-portfolio-page",
  "/search",
  "/playground",
  "/sign-in",
  "/privacy",
  "/this-page-does-not-exist",
  "/learn",
  "/categories",
  "/categories/artificial-intelligence",
  "/technologies",
  "/technologies/python",
  "/technologies/angularjs",
  "/roadmaps",
  "/roadmaps/complete-beginner-to-web-developer",
];

for (const route of routes) {
  test(`no critical/serious axe violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();

    const seriousOrWorse = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    if (seriousOrWorse.length > 0) {
      console.log(
        `Accessibility violations on ${route}:`,
        JSON.stringify(
          seriousOrWorse.map((v) => ({ id: v.id, help: v.help, nodes: v.nodes.length })),
          null,
          2,
        ),
      );
    }
    expect(seriousOrWorse).toEqual([]);
  });
}
