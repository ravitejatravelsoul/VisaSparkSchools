import type { TechnologyInput } from "@/lib/directory/types";

export const testingQaTechnologies: TechnologyInput[] = [
  {
    id: "testing-fundamentals",
    slug: "software-testing-fundamentals",
    name: "Software Testing Fundamentals",
    category: "testing-qa",
    description: "Proving code works correctly, automatically and repeatably.",
    overview:
      "Software testing fundamentals covers the vocabulary and levels of testing -- unit, integration, end-to-end -- and why automated tests matter: they prove behavior once and keep proving it on every future change, unlike manual re-checking. This platform's own test suite (unit, integration, and Playwright end-to-end tests, all listed in PROJECT_STATUS.md) is a real, inspectable example.",
    whatItIs:
      "The practice and vocabulary of proving software behaves correctly through automated checks.",
    whyItsUsed:
      "Manual re-testing doesn't scale; automated tests catch regressions immediately and let you change code with confidence.",
    whereItFits:
      "Woven throughout development, not a separate phase at the end. There's no dedicated testing course on this platform yet, but the Python Fundamentals course includes one lesson on it in context.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["api-testing", "selenium", "playwright-testing"],
    coreConcepts: [
      "Unit tests",
      "Integration tests",
      "End-to-end tests",
      "The testing pyramid",
      "Deterministic assertions vs. flaky tests",
    ],
    example: {
      language: "python",
      code: `def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0`,
      explanation:
        "A unit test asserts a specific, deterministic outcome for a specific input -- this exact test can be re-run forever, catching any future change that breaks add().",
    },
    useCases: [
      "Preventing regressions",
      "Documenting expected behavior through executable examples",
      "Enabling confident refactoring",
    ],
    practiceOptions: ["Take the Python Fundamentals course's Testing Fundamentals lesson"],
    projectIdeas: [
      "Write unit tests for a small function you've already written, covering typical and edge-case inputs",
    ],
    references: [
      {
        label: "MDN: Testing client-side JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing",
      },
    ],
    searchKeywords: ["qa", "unit testing", "test automation"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "api-testing",
    slug: "api-testing",
    name: "API Testing",
    category: "testing-qa",
    description: "Verifying an API's behavior directly, without going through a UI.",
    overview:
      "API testing verifies a backend's behavior (status codes, response shape, error handling) by calling it directly, without a browser or UI in the loop -- faster and more stable than UI tests for verifying backend logic specifically.",
    whatItIs: "Testing an API's requests and responses directly, independent of any UI.",
    whyItsUsed:
      "It's faster and less brittle than testing the same logic through a UI, and catches backend bugs closer to their source.",
    whereItFits:
      "Complements UI-level testing (Selenium/Playwright); often the majority of a backend team's automated test suite.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["rest-apis"],
    relatedIds: ["rest-apis", "postman"],
    coreConcepts: [
      "Asserting status codes",
      "Asserting response body shape",
      "Testing error cases, not just the happy path",
      "Test data setup and teardown",
    ],
    example: {
      language: "javascript",
      code: `const res = await fetch("/api/books/999"); // a nonexistent book\nconsole.assert(res.status === 404, "Expected 404 for missing book");`,
      explanation:
        "Testing the error path (a 404 for a nonexistent resource) matters as much as testing the success path -- a common gap in under-tested APIs.",
    },
    useCases: [
      "Verifying backend behavior independent of any frontend",
      "Catching regressions in API contracts",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Write a handful of assertions against a small REST API's endpoints, covering both success and error cases",
    ],
    references: [
      {
        label: "Postman: API testing guide",
        url: "https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/",
      },
    ],
    searchKeywords: ["api testing", "backend testing", "integration testing"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "selenium",
    slug: "selenium",
    name: "Selenium",
    category: "testing-qa",
    description: "The original, still-widely-used browser automation framework.",
    overview:
      "Selenium automates real browsers for testing, supporting many languages and browsers via the WebDriver protocol. It's the longest-established browser automation tool and remains common in existing test suites, though newer tools like Playwright have gained ground for new projects with faster, more reliable APIs.",
    whatItIs:
      "A browser automation framework for driving real browsers programmatically, primarily for testing.",
    whyItsUsed:
      "Broad language and browser support, and a very large existing ecosystem of tests and tutorials built on it.",
    whereItFits:
      "An alternative to Playwright for browser-based end-to-end testing; commonly found in existing (especially Java-based) enterprise test suites.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["testing-fundamentals"],
    relatedIds: ["playwright-testing", "testing-fundamentals"],
    coreConcepts: [
      "WebDriver",
      "Locating elements",
      "Waits (avoiding flaky tests)",
      "Page object pattern",
    ],
    example: {
      language: "javascript",
      code: `WebDriver driver = new ChromeDriver();\ndriver.get("https://example.com");\ndriver.findElement(By.id("submit")).click();`,
      explanation:
        "Selenium drives a real browser through the WebDriver protocol -- the same approach (real browser automation, not a simulated DOM) that this platform's own end-to-end tests use, via Playwright instead.",
    },
    useCases: ["Automated browser testing", "Maintaining existing Selenium-based test suites"],
    practiceOptions: [],
    projectIdeas: ["Automate a simple form submission and assertion on a test page"],
    references: [
      { label: "Selenium official documentation", url: "https://www.selenium.dev/documentation/" },
    ],
    searchKeywords: ["browser automation", "webdriver", "e2e testing"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "4.x",
    versionNotes:
      "Selenium remains actively maintained and widely used, though many new projects choose Playwright for its more modern, less flaky API.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "playwright-testing",
    slug: "playwright",
    name: "Playwright",
    category: "testing-qa",
    description: "A modern browser automation framework built for reliable end-to-end tests.",
    overview:
      "Playwright automates Chromium, Firefox, and WebKit with a modern API designed to avoid the flakiness common in older browser-testing tools -- built-in auto-waiting, network interception, and reliable selectors. This platform's own end-to-end test suite is built entirely on Playwright.",
    whatItIs: "A browser automation framework for reliable, cross-browser end-to-end testing.",
    whyItsUsed:
      "Its auto-waiting and modern API reduce the flaky, intermittently-failing tests common with older tools.",
    whereItFits:
      "An alternative to Selenium; this platform's own test suite (tests/e2e/) is a real, inspectable Playwright example, including accessibility sweeps via @axe-core/playwright.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["testing-fundamentals"],
    relatedIds: ["selenium", "testing-fundamentals"],
    coreConcepts: [
      "Locators and auto-waiting",
      "Assertions (expect)",
      "Fixtures and test isolation",
      "Running across multiple browsers",
    ],
    example: {
      language: "javascript",
      code: `test("homepage loads", async ({ page }) => {\n  await page.goto("/");\n  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();\n});`,
      explanation:
        "This is genuinely close to how this platform's own tests/e2e/navigation.spec.ts file is written -- Playwright's getByRole locator matches accessible roles, encouraging accessible markup as a side effect of testable markup.",
    },
    useCases: [
      "Automated end-to-end testing",
      "Cross-browser testing",
      "Automated accessibility sweeps",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Write a Playwright test that navigates a simple site and asserts a heading is visible",
    ],
    references: [
      { label: "Playwright official documentation", url: "https://playwright.dev/docs/intro" },
    ],
    searchKeywords: ["e2e testing", "browser automation", "test automation"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "1.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "postman",
    slug: "postman",
    name: "Postman",
    category: "testing-qa",
    description: "A GUI tool for manually and programmatically testing APIs.",
    overview:
      "Postman provides a graphical interface for constructing and sending HTTP requests, organizing them into collections, and writing test assertions against responses -- widely used for manual API exploration and lightweight automated API testing.",
    whatItIs: "A GUI application for constructing, sending, and testing HTTP API requests.",
    whyItsUsed:
      "It's faster than writing code for exploratory API testing, and collections can be shared across a team as living documentation.",
    whereItFits:
      "A common first tool for exploring an unfamiliar API before writing any client code against it.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["rest-apis"],
    relatedIds: ["rest-apis", "api-testing"],
    coreConcepts: [
      "Requests and collections",
      "Environments and variables",
      "Test scripts (assertions)",
      "Collection runners",
    ],
    example: {
      language: "javascript",
      code: `pm.test("Status is 200", function () {\n  pm.response.to.have.status(200);\n});`,
      explanation:
        "Postman's test scripts are plain JavaScript, run after a request completes -- letting you assert on status codes, response bodies, or headers without leaving the GUI.",
    },
    useCases: [
      "Exploring and documenting an unfamiliar API",
      "Lightweight automated API test collections",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Build a Postman collection for a small REST API, with a few requests and passing test assertions on each",
    ],
    references: [
      {
        label: "Postman official documentation",
        url: "https://learning.postman.com/docs/introduction/overview/",
      },
    ],
    searchKeywords: ["api client", "api exploration", "request collections"],
    status: "current",
    versionPolicy: "evergreen",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
