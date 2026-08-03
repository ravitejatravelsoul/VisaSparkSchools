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
  "/courses/typescript-foundations",
  "/courses/typescript-foundations/ts-why-types",
  "/projects/typed-study-tracker",
  "/courses/software-testing-foundations",
  "/courses/software-testing-foundations/st-equivalence-partitioning",
  "/projects/learning-app-test-strategy",
  "/courses/api-testing-and-automation",
  "/courses/api-testing-and-automation/at-json-schema-validation",
  "/projects/sample-api-validation-suite",
  "/courses/react-application-development",
  "/courses/react-application-development/react-component-thinking",
  "/courses/react-application-development/react-forms-validation",
  "/projects/accessible-learning-dashboard",
  "/courses/nodejs-express-backend-development",
  "/courses/nodejs-express-backend-development/node-runtime-model",
  "/courses/nodejs-express-backend-development/express-app-structure",
  "/projects/validated-learning-progress-api",
  "/courses/java-programming-foundations",
  "/courses/java-programming-foundations/java-jvm-and-execution",
  "/courses/java-programming-foundations/java-interfaces-and-polymorphism",
  "/projects/course-enrollment-progress-manager",
  "/courses/data-structures-and-algorithms",
  "/courses/data-structures-and-algorithms/dsa-complexity-and-big-o",
  "/courses/data-structures-and-algorithms/dsa-sorting",
  "/projects/learning-path-recommendation-engine",
  "/courses/database-design-and-postgresql",
  "/courses/database-design-and-postgresql/pg-schema-implementation",
  "/courses/database-design-and-postgresql/pg-window-functions",
  "/projects/learning-platform-database",
  "/paths/java",
  "/paths/algorithms",
  "/paths/databases",
  "/courses/playwright-web-automation",
  "/courses/playwright-web-automation/pw-architecture-and-setup",
  "/courses/playwright-web-automation/pw-locators",
  "/courses/playwright-web-automation/pw-flaky-tests-a11y-security-architecture",
  "/projects/cross-browser-learning-platform-test-suite",
  "/courses/selenium-webdriver-automation",
  "/courses/selenium-webdriver-automation/sel-webdriver-architecture",
  "/courses/selenium-webdriver-automation/sel-element-location",
  "/projects/maintainable-learning-portal-selenium-suite",
  "/courses/linux-shell-fundamentals",
  "/courses/linux-shell-fundamentals/sh-filesystem-and-navigation",
  "/courses/linux-shell-fundamentals/sh-defensive-scripting",
  "/projects/safe-project-validation-cli",
  "/courses/test-automation-framework-engineering",
  "/courses/test-automation-framework-engineering/tafe-framework-goals-boundaries",
  "/courses/test-automation-framework-engineering/tafe-ci-quality-gates",
  "/projects/production-grade-learning-platform-automation-framework",
  "/paths/playwright",
  "/paths/selenium",
  "/paths/linux-shell",
  "/paths/test-automation-framework",
  "/roadmaps/software-testing-and-automation",
  "/roadmaps/cloud-and-devops-engineer",
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
