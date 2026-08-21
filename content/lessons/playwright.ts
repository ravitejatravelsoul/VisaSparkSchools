import type { LessonInput } from "@/lib/content/types";

/**
 * Playwright Web Automation.
 *
 * This platform has no Playwright runtime in its browser sandbox and does
 * not add one -- the site cannot honestly launch a real browser from
 * learner-submitted code. Every lesson's guidedExercise/independentExercise
 * is therefore a genuine, browser-executable JavaScript/TypeScript exercise
 * that models the underlying decision or algorithm behind a Playwright
 * concept (locator specificity scoring, a retry/backoff policy, fixture
 * composition order, trace-event parsing) -- never a claim that a real
 * browser was launched, navigated, or automated by this site. Three lessons
 * additionally carry a `guidedLocalLab` for real, local Playwright work
 * (a real npx playwright install, a real npx playwright test run), which
 * only makes sense on the learner's own machine.
 *
 * Version assumption: Playwright 1.62.x (this repository's own end-to-end
 * suite, tests/e2e/, is pinned to @playwright/test ^1.62.0 -- the exact
 * version genuinely verified in this environment), Node.js 20.x or 22.x LTS.
 */
export const playwrightLessons: LessonInput[] = [
  {
    id: "pw-architecture-and-setup",
    slug: "pw-architecture-and-setup",
    title: "Playwright Architecture, Setup, and the Test Lifecycle",
    description:
      "Browser, context, and page — the three-layer model Playwright is built on — and how a Playwright project discovers and runs a test from start to finish.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: [],
    objectives: [
      "Explain the relationship between a Browser, a BrowserContext, and a Page",
      "Set up a Playwright project and explain what npx playwright install actually does",
      "Describe the lifecycle of a single test file from discovery to teardown",
    ],
    skills: ["playwright", "browser-automation", "architecture"],
    tech: [
      { name: "Playwright", version: "1.62.x" },
      { name: "Node.js", version: "20.x or 22.x LTS" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Playwright docs: Test configuration",
        url: "https://playwright.dev/docs/test-configuration",
      },
      { label: "Playwright docs: Installation", url: "https://playwright.dev/docs/intro" },
    ],
    keywords: ["playwright", "browser", "context", "page", "architecture"],
    explanation: `Playwright's object model has three layers, and understanding the relationship between them explains most of Playwright's behavior. A **Browser** is one launched browser process (Chromium, Firefox, or WebKit) — expensive to start, so a test suite typically launches one per test *file* or *worker*, not one per test. A **BrowserContext** is an isolated, incognito-like session within that browser: its own cookies, storage, and cache, created cheaply and quickly, which is why Playwright's default test runner gives **every single test its own fresh BrowserContext** — no cookie or localStorage state leaks between tests, without needing to manually clear anything. A **Page** is one tab within a context; a context can hold multiple pages, which is exactly how Playwright models a real user opening a link in a new tab or handling a popup (covered later in this course).

\`npx playwright install\` downloads the actual browser binaries Playwright drives — Chromium, Firefox, and WebKit builds Playwright has tested against, kept separate from any browser already installed on your machine, so a test's behavior doesn't depend on whichever version of Chrome happens to be installed locally. This is a one-time (or per-Playwright-version) setup step, run once per machine or CI environment, distinct from \`npm install\`, which only installs the \`@playwright/test\` package itself.

A Playwright test file's lifecycle: the test runner **discovers** files matching a configured pattern (typically \`*.spec.ts\`), **loads** each file to find its \`test(...)\` calls, then **executes** each test — creating a fresh context/page via the built-in \`page\` fixture (fixtures are covered in depth in Module 4), running the test body, then automatically **tearing down** that context after the test finishes, regardless of whether it passed or failed. This automatic, guaranteed teardown — closing pages and contexts even after a failure or a thrown exception — is a large part of why Playwright test suites don't accumulate leaked browser processes over a long CI run the way hand-rolled automation scripts often do.`,
    example: {
      language: "javascript",
      description:
        "Modeling the Browser -> Context -> Page hierarchy and its isolation guarantee, without launching a real browser -- the real syntax and behavior are covered in this lesson's guided local lab.",
      code: `class FakeBrowser {
  newContext() {
    return new FakeContext();
  }
}
class FakeContext {
  constructor() { this.cookies = new Set(); this.pages = []; }
  newPage() {
    const page = new FakePage(this);
    this.pages.push(page);
    return page;
  }
}
class FakePage {
  constructor(context) { this.context = context; }
  setCookie(name) { this.context.cookies.add(name); }
}

const browser = new FakeBrowser();
const contextA = browser.newContext();
const contextB = browser.newContext();
contextA.newPage().setCookie("session=abc");

console.log(contextA.cookies.has("session=abc")); // true
console.log(contextB.cookies.has("session=abc")); // false -- contexts are isolated, exactly like real Playwright contexts`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a second page to contextA and confirm both pages within the SAME context share its cookies.",
      code: `class FakeContext {
  constructor() { this.cookies = new Set(); }
  newPage() { return { setCookie: (c) => this.cookies.add(c), hasCookie: (c) => this.cookies.has(c) }; }
}
const context = new FakeContext();
const page1 = context.newPage();
page1.setCookie("a=1");
console.log(context.cookies);`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isolatedContexts(actions) modeling context isolation: actions is an array of {contextId, cookie} objects. Return an object mapping each contextId to the Set of cookies set within it -- cookies set in one context must never appear in another.",
      starterCode: `function isolatedContexts(actions) {
  const contexts = {};
  // TODO: for each action, ensure contexts[action.contextId] exists as a Set, then add the cookie to it
  return contexts;
}
`,
      solutionCode: `function isolatedContexts(actions) {
  const contexts = {};
  for (const action of actions) {
    if (!contexts[action.contextId]) contexts[action.contextId] = new Set();
    contexts[action.contextId].add(action.cookie);
  }
  return contexts;
}`,
      harness: `
        try {
          const result = isolatedContexts([{contextId:"A",cookie:"x"},{contextId:"B",cookie:"y"}]);
          window.__report('t1', result.A.has("x") && !result.A.has("y") && result.B.has("y") && !result.B.has("x"), 'cookies should stay isolated per context');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = isolatedContexts([]);
          window.__report('t2', Object.keys(result).length === 0, 'no actions should produce no contexts');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "cookies set in different contexts remain isolated from each other",
        },
        { id: "t2", description: "handles an empty actions list" },
      ],
      hints: [
        "This models exactly the isolation guarantee a real BrowserContext provides -- no shared state unless you deliberately share a context.",
        "Initialize a context's Set lazily, the first time it's referenced.",
      ],
    },
    independentExercise: {
      id: "pw-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write countPagesPerContext(pageOpenEvents) where pageOpenEvents is an array of contextId strings (one entry per page opened in that context). Return an object mapping each contextId to how many pages were opened in it -- modeling how one context can hold multiple pages (tabs/popups).",
      starterCode: `function countPagesPerContext(pageOpenEvents) {
  // TODO
  return {};
}
`,
      solutionCode: `function countPagesPerContext(pageOpenEvents) {
  const counts = {};
  for (const contextId of pageOpenEvents) {
    counts[contextId] = (counts[contextId] ?? 0) + 1;
  }
  return counts;
}`,
      harness: `
        try {
          const result = countPagesPerContext(["A","A","B"]);
          window.__report('t1', result.A === 2 && result.B === 1, 'should count pages per context correctly');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = countPagesPerContext([]);
          window.__report('t2', Object.keys(result).length === 0, 'empty input should give an empty result');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "counts multiple pages within the same context correctly" },
        { id: "t2", description: "handles an empty event list" },
      ],
      hints: [
        "This is the same counting pattern from earlier courses' word-frequency exercises, applied to a new domain.",
        "A context legitimately holding multiple pages is exactly what makes popup/new-tab handling possible, covered later in this course.",
      ],
    },
    guidedLocalLab: {
      id: "pw-gll-project-setup",
      title: "Create and Run a Multi-Browser Playwright Project Locally",
      scenario:
        "Set up a real Playwright project from scratch, install real browser binaries, and run your first test across multiple real browser engines.",
      requiredTools: [
        { name: "Node.js", version: "20.x or 22.x LTS" },
        { name: "npm", version: "10.x or newer (bundled with Node.js)" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        "Create a project folder: `mkdir pw-learning-lab && cd pw-learning-lab`.",
        "Initialize it and install Playwright's test runner: `npm init -y && npm install -D @playwright/test`.",
        "Install real browser binaries for Chromium, Firefox, and WebKit: `npx playwright install`.",
      ],
      projectStructure: `pw-learning-lab/
  playwright.config.ts
  tests/
    homepage.spec.ts
  package.json`,
      starterFiles: [
        {
          path: "playwright.config.ts",
          content: `import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  projects: [
    // TODO: add a project for chromium, firefox, and webkit,
    // each using devices["Desktop Chrome"] / devices["Desktop Firefox"] / devices["Desktop Safari"]
  ],
});
`,
        },
        {
          path: "tests/homepage.spec.ts",
          content: `import { test, expect } from "@playwright/test";

test("a real public page loads and has a heading", async ({ page }) => {
  // TODO: navigate to a real, stable public URL of your choice (e.g. https://playwright.dev)
  // TODO: assert that at least one heading (role "heading") is visible on the page
});
`,
        },
      ],
      requirements: [
        "playwright.config.ts defines three projects: chromium, firefox, and webkit.",
        "tests/homepage.spec.ts navigates to a real URL and asserts a heading is visible.",
        "The test passes when run against all three configured browser projects.",
      ],
      commands: [
        {
          description: "Run the test suite across all configured browser projects",
          command: "npx playwright test",
        },
        {
          description: "Run only the Firefox project",
          command: "npx playwright test --project=firefox",
        },
        {
          description: "Run with the visible (headed) browser, useful while learning",
          command: "npx playwright test --headed",
        },
      ],
      expectedBehavior:
        "Running `npx playwright test` launches the test three times — once per configured browser project — and reports all three passing, each having genuinely loaded the page in a different real browser engine (Chromium, Firefox, WebKit).",
      verificationSteps: [
        {
          command: "npx playwright test",
          expectedResult: "3 passed (one per browser project), 0 failed",
        },
        {
          command: "npx playwright test --project=webkit",
          expectedResult: "1 passed — confirms WebKit specifically ran, not just Chromium",
        },
      ],
      troubleshooting: [
        {
          issue: "`browserType.launch: Executable doesn't exist`",
          fix: "`npx playwright install` was skipped or didn't finish — re-run it; it downloads real browser binaries and needs a working internet connection the first time.",
        },
        {
          issue: "Only one project's test runs, not three",
          fix: "Check playwright.config.ts's `projects` array actually lists all three entries — a missing entry silently means that browser is never tested.",
        },
        {
          issue: "Test times out waiting for the heading",
          fix: "Confirm the URL is real, publicly reachable, and that the page genuinely renders a heading element — try loading it manually in a browser first.",
        },
      ],
      hints: [
        "Each project entry needs a `name` and a `use: { ...devices['Desktop X'] }` — devices is imported from @playwright/test.",
        "page.getByRole('heading').first() combined with toBeVisible() is the idiomatic way to check a heading exists, without needing to know its exact text.",
      ],
      referenceSolution: {
        summary:
          "playwright.config.ts defines chromium/firefox/webkit projects using the devices presets. The test navigates to a real URL and asserts a heading is visible, passing identically across all three real browser engines.",
        files: [
          {
            path: "playwright.config.ts",
            content: `import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
`,
          },
          {
            path: "tests/homepage.spec.ts",
            content: `import { test, expect } from "@playwright/test";

test("a real public page loads and has a heading", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(page.getByRole("heading").first()).toBeVisible();
});
`,
          },
        ],
      },
      extensionChallenge:
        "Add a fourth, mobile-emulating project using devices['iPhone 13'], and confirm the same test passes there too, on a genuinely different viewport and user agent.",
    },
    commonMistakes: [
      "Launching one Browser per test instead of reusing one per worker/file and creating a fresh BrowserContext per test -- launching a full browser process per test is far slower than Playwright's default context-per-test isolation model.",
      "Confusing `npm install` (installs the @playwright/test package) with `npx playwright install` (downloads actual browser binaries) -- skipping the second step is the most common first-run setup failure.",
      "Assuming a Page and a BrowserContext are the same thing -- a context can hold multiple pages (tabs/popups), and cookies/storage belong to the context, not to any single page within it.",
    ],
    quiz: [
      {
        id: "pw-q1-1",
        prompt:
          "Why does Playwright's test runner give every single test its own fresh BrowserContext by default?",
        choices: [
          "To make tests run slower, deliberately, for safety",
          "So that cookies, storage, and cache from one test never leak into another, without requiring any manual cleanup",
          "Because a Browser can only ever have one context",
          "Contexts are not actually isolated from each other",
        ],
        correctIndex: 1,
        explanation:
          "A fresh BrowserContext per test is exactly what gives Playwright tests their default isolation — no test can accidentally depend on cookies or storage state left behind by a previous test, since each one starts from a genuinely clean context.",
      },
      {
        id: "pw-q1-2",
        prompt: "What does `npx playwright install` actually do?",
        choices: [
          "Installs the @playwright/test npm package",
          "Downloads the real browser binaries (Chromium, Firefox, WebKit) that Playwright has tested against, separate from any browser already on the machine",
          "Installs Node.js",
          "Nothing -- it's an alias for npm install",
        ],
        correctIndex: 1,
        explanation:
          "npm install (or npm ci) fetches the @playwright/test package itself; npx playwright install is a separate, necessary step that downloads the actual browser engines Playwright drives, pinned to versions Playwright has specifically tested against.",
      },
      {
        id: "pw-q1-3",
        prompt: "Can one BrowserContext hold more than one Page?",
        choices: [
          "No, a context can only ever have exactly one page",
          "Yes -- this is exactly the mechanism Playwright uses to model a user opening a new tab or a popup within the same session",
          "Only if two separate Browser instances are launched",
          "Only in headless mode",
        ],
        correctIndex: 1,
        explanation:
          "A context genuinely supports multiple pages, sharing the same cookies/storage — this directly models real multi-tab or popup scenarios within one logical browsing session, a pattern this course returns to in its module on frames and multiple pages.",
      },
    ],
    takeaway:
      "Browser is an expensive, shared process; BrowserContext is a cheap, isolated session (one per test by default); Page is a tab within a context — understanding this hierarchy explains both Playwright's default isolation and how it models multi-tab scenarios.",
    summary:
      "Playwright's Browser → BrowserContext → Page hierarchy gives every test a fresh, isolated context by default. npx playwright install downloads real browser binaries, separate from npm install. A test's lifecycle is discover → load → execute (with automatic context teardown) → report.",
    nextLessonSlug: "pw-locators",
  },
  {
    id: "pw-locators",
    slug: "pw-locators",
    title: "Locators: Finding Elements the Way a User Would",
    description:
      "Why accessible, role-based locators are Playwright's recommended default, and how to rank a set of candidate locators by real-world stability.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["pw-architecture-and-setup"],
    objectives: [
      "Use role-based, accessible locators as the default choice for finding elements",
      "Explain why a locator is a lazy, re-evaluated query rather than a one-time element reference",
      "Rank competing locator strategies by stability and honest user-facing intent",
    ],
    skills: ["playwright", "locators", "accessibility"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Locators", url: "https://playwright.dev/docs/locators" },
      {
        label: "Playwright docs: Best Practices — Use locators",
        url: "https://playwright.dev/docs/best-practices",
      },
    ],
    keywords: ["locators", "getByRole", "accessible locators", "playwright"],
    explanation: `A Playwright **locator** (\`page.getByRole("button", { name: "Submit" })\`) is not a reference to a specific DOM element captured at the moment you write the line — it's a **lazy, re-evaluated query**: every time an action or assertion uses that locator, Playwright re-runs the query against the current page. This is the mechanism behind auto-waiting (covered next lesson): the locator doesn't fail immediately if the element isn't there yet, it keeps re-querying until the element appears (or a timeout elapses), which is fundamentally different from most older automation tools' "find the element once, fail immediately if it isn't there yet" model.

Playwright's **recommended default** is a role-based, accessible locator: \`page.getByRole("button", { name: "Submit" })\`, \`page.getByLabel("Email address")\`, \`page.getByText("Welcome back")\`. These target the page the way a real user (or an assistive-technology user) actually perceives it — by role and visible/accessible label — rather than by internal implementation details like a CSS class name or a DOM structure. This has a genuine double benefit: the tests are more resilient to internal refactors (a CSS class renamed for styling reasons doesn't break a role-based locator), and writing tests this way tends to surface real accessibility gaps in the application under test, since an element with no discoverable role or accessible name is exactly as hard for \`getByRole\` to find as it is for a screen reader user to identify.

**Locator stability** is a genuine, orderable spectrum, worth reasoning about explicitly rather than reaching for whatever "just works" first: role/label/text-based locators (most stable — tied to what users actually perceive) > a dedicated \`data-testid\` attribute (stable, but requires deliberately adding test-only markup) > a specific, meaningful CSS selector (\`.submit-button\`, moderately stable — breaks if the class is renamed for styling reasons) > a deep, structural CSS or XPath selector (\`div > div:nth-child(3) > button\`, least stable — breaks on almost any layout change, and describes *where* an element sits rather than *what* it is). Reaching for the least-stable option first is a common, understandable mistake under time pressure that reliably produces the flakiest, most maintenance-heavy tests in a suite.`,
    example: {
      language: "javascript",
      description:
        "Ranking candidate locator strategies by stability -- the actual reasoning behind Playwright's recommended locator priority.",
      code: `function locatorStabilityScore(strategy) {
  const scores = {
    role: 4,       // page.getByRole(...) -- tied to user-perceivable semantics
    testId: 3,     // page.getByTestId(...) -- stable, but test-only markup
    cssClass: 2,   // page.locator(".submit-button") -- breaks on style refactors
    structural: 1, // page.locator("div > div:nth-child(3) > button") -- breaks on almost any layout change
  };
  return scores[strategy] ?? 0;
}

const candidates = ["structural", "role", "cssClass", "testId"];
const ranked = [...candidates].sort((a, b) => locatorStabilityScore(b) - locatorStabilityScore(a));
console.log(ranked); // ["role", "testId", "cssClass", "structural"] -- most to least stable`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a fifth strategy 'label' (page.getByLabel) with a score matching role's stability, and re-rank the list.",
      code: `function locatorStabilityScore(strategy) {
  const scores = { role: 4, testId: 3, cssClass: 2, structural: 1 };
  return scores[strategy] ?? 0;
}
const candidates = ["structural", "role", "cssClass"];
console.log([...candidates].sort((a, b) => locatorStabilityScore(b) - locatorStabilityScore(a)));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write rankLocators(candidates) that sorts an array of locator-strategy strings ('role','testId','cssClass','structural') from MOST to LEAST stable, using the stability scores from this lesson's explanation.",
      starterCode: `function rankLocators(candidates) {
  const scores = { role: 4, testId: 3, cssClass: 2, structural: 1 };
  // TODO: return a new array sorted most-stable-first
}
`,
      solutionCode: `function rankLocators(candidates) {
  const scores = { role: 4, testId: 3, cssClass: 2, structural: 1 };
  return [...candidates].sort((a, b) => scores[b] - scores[a]);
}`,
      harness: `
        try {
          const result = rankLocators(["structural", "role", "cssClass", "testId"]);
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["role","testId","cssClass","structural"]), 'should rank from most to least stable');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const input = ["role", "cssClass"];
          rankLocators(input);
          window.__report('t2', JSON.stringify(input) === JSON.stringify(["role","cssClass"]), 'the original array must not be mutated');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly ranks all four strategies by stability" },
        { id: "t2", description: "does not mutate the original input array" },
      ],
      hints: [
        "Copy the array first ([...candidates]) before sorting, to avoid mutating the caller's array.",
        "Sorting by scores[b] - scores[a] produces a descending (most-stable-first) order.",
      ],
    },
    independentExercise: {
      id: "pw-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isAccessibleLocatorStrategy(strategy) returning true only for 'role', 'label', or 'text' (Playwright's user-facing, accessible locator strategies), false for anything else (including 'testId', 'cssClass', 'structural', or any unrecognized string).",
      starterCode: `function isAccessibleLocatorStrategy(strategy) {
  // TODO
}
`,
      solutionCode: `function isAccessibleLocatorStrategy(strategy) {
  return ["role", "label", "text"].includes(strategy);
}`,
      harness: `
        try { window.__report('t1', isAccessibleLocatorStrategy("role") === true, 'role should be accessible'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isAccessibleLocatorStrategy("label") === true, 'label should be accessible'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isAccessibleLocatorStrategy("cssClass") === false, 'cssClass is not an accessible, user-facing strategy'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', isAccessibleLocatorStrategy("bogus") === false, 'an unrecognized strategy should be false'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "recognizes role as accessible" },
        { id: "t2", description: "recognizes label as accessible" },
        { id: "t3", description: "correctly rejects a non-accessible strategy" },
        { id: "t4", description: "correctly rejects an unrecognized strategy" },
      ],
      hints: [
        "Array.prototype.includes is a clean way to check membership in a small, fixed set.",
        "This models Playwright's own documented locator priority guidance: prefer getByRole/getByLabel/getByText first.",
      ],
    },
    commonMistakes: [
      "Reaching for a deep structural CSS or XPath selector first, because it 'just works' in the moment -- these are the most fragile locators and break on almost any unrelated layout change.",
      "Treating a locator as a one-time snapshot of an element rather than a re-evaluated query -- this misunderstanding is exactly what makes Playwright's auto-waiting (next lesson) seem confusing at first.",
      "Adding data-testid attributes everywhere by default instead of first checking whether a real accessible role/label already exists -- role-based locators are both more stable AND double as an accessibility check; testId is a reasonable fallback, not a default.",
    ],
    quiz: [
      {
        id: "pw-q2-1",
        prompt:
          'Why is `page.getByRole("button", { name: "Submit" })` Playwright\'s recommended default over a CSS class selector?',
        choices: [
          "It's faster to type",
          "It targets the page by user-perceivable role and label, which is both more stable across internal refactors and doubles as a check that the element is genuinely accessible",
          "CSS selectors are not supported by Playwright at all",
          "Role-based locators never re-query the page",
        ],
        correctIndex: 1,
        explanation:
          "Role-based locators describe what an element IS to a user (and to assistive technology), not how it happens to be implemented — a CSS class can be renamed for purely visual reasons without breaking a role-based locator, and an element with no discoverable role is a real accessibility gap the test surfaces.",
      },
      {
        id: "pw-q2-2",
        prompt:
          "Is a Playwright locator a reference to one specific element captured when the line is written?",
        choices: [
          "Yes, it's a fixed reference from that point forward",
          "No -- it's a lazy, re-evaluated query, re-run against the current page every time an action or assertion uses it",
          "Only role-based locators re-query; others are fixed",
          "It depends on the browser being used",
        ],
        correctIndex: 1,
        explanation:
          "This laziness is fundamental to how Playwright locators work: `page.getByRole(...)` describes a query, not a snapshot, and that query is re-run every time it's used — which is exactly the mechanism that makes auto-waiting possible.",
      },
      {
        id: "pw-q2-3",
        prompt:
          "Which locator strategy is generally the LEAST stable, most likely to break on an unrelated change?",
        choices: [
          "A role-based locator",
          "A dedicated data-testid attribute",
          "A deep, structural CSS or XPath selector describing the element's position in the DOM tree",
          "A label-based locator",
        ],
        correctIndex: 2,
        explanation:
          "A structural selector encodes exactly where an element sits in the current DOM structure — almost any layout change, even one unrelated to the element itself, can shift that structure and silently break the locator.",
      },
    ],
    takeaway:
      "A locator is a lazy, re-evaluated query, not a one-time reference — and role-based, accessible locators are Playwright's recommended default because they're both the most stable strategy across refactors and a genuine, incidental accessibility check.",
    summary:
      "Locators (getByRole, getByLabel, getByText, getByTestId, CSS/XPath) are re-evaluated every time they're used, not captured once. Role-based/accessible locators are the most stable and are Playwright's recommended default. Structural CSS/XPath selectors are the least stable, breaking on unrelated layout changes.",
    nextLessonSlug: "pw-waiting-and-assertions",
  },
  {
    id: "pw-waiting-and-assertions",
    slug: "pw-waiting-and-assertions",
    title: "Auto-Waiting and Web-First Assertions",
    description:
      "The specific set of checks Playwright runs before every action, and why an expect() assertion in Playwright is fundamentally different from a plain equality check.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["pw-locators"],
    objectives: [
      "List the actionability checks Playwright runs before performing an action",
      "Explain why a web-first assertion retries instead of failing immediately",
      "Distinguish a genuine flaky-timing bug from one auto-waiting already correctly handles",
    ],
    skills: ["playwright", "auto-waiting", "assertions"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Auto-waiting", url: "https://playwright.dev/docs/actionability" },
      { label: "Playwright docs: Assertions", url: "https://playwright.dev/docs/test-assertions" },
    ],
    keywords: ["auto-waiting", "actionability", "web-first assertions", "playwright"],
    explanation: `Before performing an action like \`.click()\`, Playwright runs a specific, documented set of **actionability checks** on the target element, retrying the whole check sequence until they all pass (or a timeout elapses): the element must be **attached** to the DOM, **visible** (has non-zero size, not \`display: none\`), **stable** (not still animating/moving between two consecutive frames), able to **receive events** (not obscured by another element on top of it), and **enabled** (not disabled). This is what "auto-waiting" concretely means — it is not a single generic sleep before every action, it's this specific sequence of real conditions, re-checked repeatedly until they hold or Playwright gives up.

A **web-first assertion** (\`await expect(locator).toBeVisible()\`, \`await expect(locator).toHaveText("Done")\`) is built on the same retrying mechanism: unlike a plain \`if (text === "Done")\` check, which evaluates once, immediately, \`expect(locator).toHaveText(...)\` **polls the locator repeatedly** until the condition becomes true or a timeout elapses. This is precisely why Playwright assertions must always be \`await\`ed — the \`expect\` call itself is asynchronous, actively retrying, not an instant true/false check — and forgetting the \`await\` is a genuine, common bug: without it, the assertion starts its retry loop but the test doesn't wait for the result, so a failure can be silently missed or reported in a confusing, disconnected way.

The practical consequence: **auto-waiting already correctly handles most "the button wasn't ready yet" timing issues** that would require an explicit manual wait in an older automation tool — you generally do not need to add your own sleep or wait call before a Playwright action or assertion. A test that's still flaky *despite* this should be treated as a real signal, not "just add another wait": the remaining common causes are a genuine race condition in the application itself (a request that hasn't resolved when the UI claims it has), a locator matching more than one element ambiguously, or a network response being asynchronous in a way the current assertion doesn't actually wait for (covered in this course's network module) — auto-waiting solves the "element not ready yet" class of problem, not every possible source of test flakiness.`,
    example: {
      language: "javascript",
      description:
        "Modeling the actionability-check retry loop -- the real mechanism behind auto-waiting, not a generic sleep.",
      code: `function isActionable(elementState) {
  return (
    elementState.attached &&
    elementState.visible &&
    elementState.stable &&
    elementState.receivesEvents &&
    elementState.enabled
  );
}

async function waitForActionable(getElementState, timeoutMs = 5000, intervalMs = 50) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (isActionable(getElementState())) return true;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return false; // timed out -- this is what a real Playwright timeout error models
}

// Simulating an element that becomes actionable after a short delay:
let becameReady = false;
setTimeout(() => { becameReady = true; }, 200);
waitForActionable(() => ({ attached: true, visible: becameReady, stable: true, receivesEvents: true, enabled: true }))
  .then((result) => console.log("actionable within timeout:", result)); // true`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change the element to never become visible, and observe waitForActionable correctly time out (false) instead of hanging forever.",
      code: `function isActionable(s) { return s.attached && s.visible && s.stable && s.receivesEvents && s.enabled; }
async function waitForActionable(getState, timeoutMs = 300, intervalMs = 50) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (isActionable(getState())) return true;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}
waitForActionable(() => ({ attached: true, visible: true, stable: true, receivesEvents: true, enabled: true }))
  .then((r) => console.log(r));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isActionable(state) implementing the five actionability checks from this lesson exactly (attached, visible, stable, receivesEvents, enabled -- all must be true).",
      starterCode: `function isActionable(state) {
  // TODO
}
`,
      solutionCode: `function isActionable(state) {
  return (
    state.attached &&
    state.visible &&
    state.stable &&
    state.receivesEvents &&
    state.enabled
  );
}`,
      harness: `
        try { window.__report('t1', isActionable({attached:true,visible:true,stable:true,receivesEvents:true,enabled:true}) === true, 'all conditions true should be actionable'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isActionable({attached:true,visible:false,stable:true,receivesEvents:true,enabled:true}) === false, 'not visible should not be actionable'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isActionable({attached:true,visible:true,stable:true,receivesEvents:true,enabled:false}) === false, 'disabled should not be actionable'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "all five conditions true means actionable" },
        { id: "t2", description: "not visible means not actionable" },
        { id: "t3", description: "disabled means not actionable" },
      ],
      hints: [
        "This is a direct, literal encoding of the five checks named in the explanation -- no shortcuts.",
        "Every single condition must hold; a single false anywhere makes the whole element not actionable.",
      ],
    },
    independentExercise: {
      id: "pw-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write pollUntilTrue(checkFn, maxAttempts) modeling a web-first assertion's retry loop: call checkFn() repeatedly (up to maxAttempts times), returning true as soon as it returns true, or false if it never does within maxAttempts calls. checkFn takes no arguments and may return a different result on each call (simulating a condition that becomes true over time).",
      starterCode: `function pollUntilTrue(checkFn, maxAttempts) {
  // TODO: call checkFn() up to maxAttempts times, returning true as soon as it does
  return false;
}
`,
      solutionCode: `function pollUntilTrue(checkFn, maxAttempts) {
  for (let i = 0; i < maxAttempts; i++) {
    if (checkFn()) return true;
  }
  return false;
}`,
      harness: `
        try {
          let calls = 0;
          const result = pollUntilTrue(() => { calls++; return calls >= 3; }, 5);
          window.__report('t1', result === true && calls === 3, 'should return true as soon as the condition becomes true, stopping further calls');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = pollUntilTrue(() => false, 3);
          window.__report('t2', result === false, 'a condition that never becomes true should return false after exhausting attempts');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const result = pollUntilTrue(() => true, 5);
          window.__report('t3', result === true, 'a condition true on the first call should return true immediately'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "stops polling as soon as the condition becomes true" },
        {
          id: "t2",
          description: "returns false after exhausting attempts on a never-true condition",
        },
        { id: "t3", description: "returns true immediately when the first check already passes" },
      ],
      hints: [
        "Return immediately inside the loop the moment checkFn() returns true -- don't keep calling it unnecessarily.",
        "This models exactly what expect(locator).toBeVisible() does internally: poll, don't just check once.",
      ],
    },
    commonMistakes: [
      "Forgetting `await` before an `expect(locator)...` assertion -- the assertion is asynchronous and actively retrying; without await, the test doesn't actually wait for its result, which can hide real failures or produce confusing, disconnected error reports.",
      "Adding a manual `await page.waitForTimeout(1000)` before every action 'just in case' -- auto-waiting already handles the 'element not ready yet' class of problem; an extra fixed sleep only slows the suite down without fixing genuine flakiness.",
      "Treating persistent flakiness as something a longer wait will eventually fix -- if auto-waiting isn't resolving it, the real cause is usually a genuine race condition, an ambiguous locator, or an async network response the current assertion doesn't actually account for.",
    ],
    quiz: [
      {
        id: "pw-q3-1",
        prompt:
          "What does Playwright's auto-waiting concretely check before performing an action like .click()?",
        choices: [
          "It just waits a fixed 1 second before every action",
          "A specific sequence of real conditions -- attached, visible, stable, able to receive events, and enabled -- retried until they all hold or a timeout elapses",
          "Only whether the element exists in the DOM at all",
          "Nothing; Playwright performs actions immediately with no checks",
        ],
        correctIndex: 1,
        explanation:
          "Auto-waiting is not a generic delay — it's a documented, specific set of actionability conditions Playwright genuinely re-checks in a retry loop before acting, which is exactly why it correctly handles animations, late-rendering elements, and temporarily-disabled buttons without any manual wait code.",
      },
      {
        id: "pw-q3-2",
        prompt: "Why must a Playwright web-first assertion always be awaited?",
        choices: [
          "It's just a style convention with no functional effect",
          "The assertion is actively polling/retrying asynchronously; without await, the test doesn't wait for that retry loop to resolve, which can hide a real failure",
          "Playwright assertions are always synchronous and awaiting them does nothing",
          "Only assertions on locators need await; other assertions don't",
        ],
        correctIndex: 1,
        explanation:
          "expect(locator).toHaveText(...) and similar web-first assertions are genuinely asynchronous — they poll the condition repeatedly. Omitting await means the test moves on before that polling resolves, which can silently miss a real, eventual failure.",
      },
      {
        id: "pw-q3-3",
        prompt:
          "A test remains flaky even though the element in question is genuinely visible and enabled well before the assertion runs. What does this most likely indicate?",
        choices: [
          "Auto-waiting is broken and needs a manual sleep added",
          "The flakiness has a different root cause -- a genuine race condition, an ambiguous locator matching multiple elements, or an async response the current assertion doesn't actually wait for",
          "The test should be deleted since flaky tests can never be fixed",
          "Playwright cannot handle this situation and a different tool is required",
        ],
        correctIndex: 1,
        explanation:
          "Since auto-waiting already handles the 'not ready yet' timing class of problem, persistent flakiness despite it is a genuine signal pointing to a different, real cause — not a hint to add more waiting, which wouldn't address the actual problem.",
      },
    ],
    takeaway:
      "Auto-waiting is a specific, retried set of actionability checks, not a generic sleep, and web-first assertions poll rather than check once — both must genuinely be awaited, and persistent flakiness despite them is a real signal pointing to an actual bug, not a cue to add more waiting.",
    summary:
      "Before an action, Playwright checks attached/visible/stable/receives-events/enabled, retrying until they hold or timeout. Web-first assertions (expect(locator)...) poll rather than check once, and must be awaited. Auto-waiting solves 'not ready yet' timing issues; other flakiness causes need real diagnosis.",
    nextLessonSlug: "pw-navigation-and-forms",
  },
  {
    id: "pw-navigation-and-forms",
    slug: "pw-navigation-and-forms",
    title: "Navigation and Form Interaction",
    description:
      "What page.goto actually waits for, and the fill/select/check vocabulary Playwright provides for real, form-specific interaction.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["pw-waiting-and-assertions"],
    objectives: [
      "Explain what load state page.goto waits for by default and when to wait for a different one",
      "Choose the correct form-interaction method (fill, selectOption, check) for a given input type",
      "Write an assertion sequence validating both a successful and a failed form submission",
    ],
    skills: ["playwright", "navigation", "forms"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Navigations", url: "https://playwright.dev/docs/navigations" },
      { label: "Playwright docs: Forms", url: "https://playwright.dev/docs/input" },
    ],
    keywords: ["navigation", "forms", "goto", "fill", "playwright"],
    explanation: `\`await page.goto(url)\` navigates and, by default, waits for the \`load\` event — every resource (images, stylesheets, scripts) has finished loading. That default is frequently *more* waiting than a test actually needs: for a page whose interactive content is ready well before every image finishes downloading, waiting for \`load\` needlessly slows the test down. \`page.goto(url, { waitUntil: "domcontentloaded" })\` waits only for the initial HTML to be parsed — faster, and usually sufficient, since Playwright's own auto-waiting (previous lesson) will separately wait for whatever specific element an action or assertion actually needs, regardless of which \`waitUntil\` option \`goto\` used.

Form interaction has a specific, honest vocabulary matched to each input's real behavior, and using the wrong method produces a working-looking test that doesn't actually simulate a real user: \`locator.fill(text)\` sets a text input's or textarea's value directly (fast, reliable, the right default for text entry); \`locator.selectOption(value)\` chooses an option in a \`<select>\` dropdown by value, label, or index; \`locator.check()\`/\`.uncheck()\` sets a checkbox or radio button to a specific state (idempotent — calling \`.check()\` on an already-checked box is a safe no-op, unlike \`.click()\`, which would toggle it); \`locator.click()\` remains correct for buttons and other genuinely click-driven elements, but is the wrong tool for setting a checkbox's state deliberately, precisely because a second accidental click would silently undo the first.

A **complete** form-interaction test validates more than just "the happy path submits" — it should assert the **failure path** too: submitting with invalid or missing data should produce the correct validation message, and the form should not silently succeed or navigate away when it shouldn't. \`await expect(page.getByText("Email is required")).toBeVisible()\` after submitting an empty required field is exactly as important a test as the successful-submission case, and skipping it is a common, easy-to-miss gap — a form's happy path passing tells you nothing about whether its validation actually works.`,
    example: {
      language: "javascript",
      description:
        "Modeling waitUntil options and the fill/selectOption/check vocabulary as data, matching real Playwright method choices to real input types.",
      code: `function waitUntilCost(option) {
  const relativeCost = { load: 3, domcontentloaded: 1, networkidle: 5 };
  return relativeCost[option] ?? 0;
}
console.log(waitUntilCost("domcontentloaded") < waitUntilCost("load")); // true -- generally faster

function chooseFormMethod(inputType) {
  const methodFor = {
    text: "fill",
    textarea: "fill",
    select: "selectOption",
    checkbox: "check",
    radio: "check",
    button: "click",
  };
  return methodFor[inputType] ?? "unknown";
}
console.log(chooseFormMethod("checkbox")); // "check" -- idempotent, not "click"
console.log(chooseFormMethod("text"));     // "fill"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a 'button' entry check and confirm chooseFormMethod correctly returns 'click' for it, not 'fill'.",
      code: `function chooseFormMethod(inputType) {
  const methodFor = { text: "fill", checkbox: "check", button: "click" };
  return methodFor[inputType] ?? "unknown";
}
console.log(chooseFormMethod("button"));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write chooseFormMethod(inputType) mapping 'text'/'textarea' -> 'fill', 'select' -> 'selectOption', 'checkbox'/'radio' -> 'check', 'button' -> 'click'. Return 'unknown' for anything else.",
      starterCode: `function chooseFormMethod(inputType) {
  // TODO
}
`,
      solutionCode: `function chooseFormMethod(inputType) {
  const methodFor = {
    text: "fill",
    textarea: "fill",
    select: "selectOption",
    checkbox: "check",
    radio: "check",
    button: "click",
  };
  return methodFor[inputType] ?? "unknown";
}`,
      harness: `
        try { window.__report('t1', chooseFormMethod("text") === "fill", 'text should use fill'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', chooseFormMethod("checkbox") === "check", 'checkbox should use check, not click'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', chooseFormMethod("select") === "selectOption", 'select should use selectOption'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', chooseFormMethod("bogus") === "unknown", 'an unrecognized type should return unknown'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "text inputs use fill" },
        { id: "t2", description: "checkboxes use check, not click" },
        { id: "t3", description: "select dropdowns use selectOption" },
        { id: "t4", description: "unrecognized types return unknown" },
      ],
      hints: [
        "A lookup object cleanly maps each input type to its correct method name.",
        "check() being idempotent (unlike click()) is exactly why checkboxes/radios get their own dedicated method.",
      ],
    },
    independentExercise: {
      id: "pw-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write validateFormSubmission(fields) where fields is an object like {email: '', password: 'abc'}. Return an array of field names that are EMPTY (falsy/empty-string), modeling which required-field validation messages a complete test should assert are visible after submitting incomplete data.",
      starterCode: `function validateFormSubmission(fields) {
  // TODO: return the names of every field whose value is empty/falsy
  return [];
}
`,
      solutionCode: `function validateFormSubmission(fields) {
  return Object.entries(fields)
    .filter(([, value]) => !value)
    .map(([name]) => name);
}`,
      harness: `
        try {
          const result = validateFormSubmission({ email: "", password: "abc", name: "" });
          window.__report('t1', JSON.stringify(result.sort()) === JSON.stringify(["email","name"]), 'should identify exactly the empty fields');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = validateFormSubmission({ email: "a@b.com", password: "abc" });
          window.__report('t2', result.length === 0, 'no empty fields should give an empty result'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies multiple empty fields" },
        { id: "t2", description: "correctly identifies no empty fields when all are filled" },
      ],
      hints: [
        "Object.entries gives [key, value] pairs you can filter directly.",
        "This models exactly the set of fields whose validation-message assertions a complete form test needs -- not just the happy path.",
      ],
    },
    commonMistakes: [
      "Using .click() to toggle a checkbox instead of .check()/.uncheck() -- a second accidental click silently undoes the first; check()/uncheck() are idempotent and state the intent explicitly.",
      "Always waiting for the default 'load' event when 'domcontentloaded' would be sufficient and faster -- unnecessary waiting adds up across a large suite with no correctness benefit.",
      "Testing only the successful form-submission path -- a form's validation logic is exactly as important to test as its happy path, and skipping it leaves real bugs (broken required-field checks, wrong error messages) completely uncovered.",
    ],
    quiz: [
      {
        id: "pw-q4-1",
        prompt: "What does page.goto(url) wait for by default?",
        choices: [
          "Nothing -- it returns immediately",
          "The load event -- every resource (images, stylesheets, scripts) has finished loading",
          "Only the initial HTML being parsed",
          "A fixed 5-second timeout",
        ],
        correctIndex: 1,
        explanation:
          "The default waitUntil option is 'load', which waits for the full load event, including all sub-resources — often more waiting than a test actually needs, which is why 'domcontentloaded' is available as a faster alternative when appropriate.",
      },
      {
        id: "pw-q4-2",
        prompt:
          "Why does Playwright provide .check() as a distinct method from .click() for checkboxes?",
        choices: [
          "There's no real difference; they behave identically",
          ".check() is idempotent -- calling it on an already-checked box is a safe no-op, while .click() would toggle it, risking an accidental double-toggle",
          ".click() cannot be used on checkboxes at all",
          ".check() is faster but functionally identical to .click()",
        ],
        correctIndex: 1,
        explanation:
          ".check() explicitly states the desired end state and is safe to call regardless of the checkbox's current state, while .click() only toggles — using .click() when you mean 'ensure this is checked' risks silently unchecking it if it was already checked.",
      },
      {
        id: "pw-q4-3",
        prompt: "A form test only verifies that valid data submits successfully. What's missing?",
        choices: [
          "Nothing -- the happy path is sufficient",
          "The failure/validation path -- submitting invalid or missing data should also be tested, confirming the correct validation messages appear and the form doesn't silently succeed",
          "A screenshot of the form",
          "A test for every possible browser",
        ],
        correctIndex: 1,
        explanation:
          "A form's validation logic is a real, separate piece of behavior from its happy path — a passing happy-path test says nothing about whether required-field checks or error messages actually work, which is exactly the gap a dedicated failure-path assertion closes.",
      },
    ],
    takeaway:
      "Choose the waitUntil option that matches what the test actually needs (domcontentloaded is often enough), use the form-interaction method matched to each input's real semantics (fill/selectOption/check, not a blanket click), and always test the failure/validation path alongside the happy path.",
    summary:
      "page.goto's default waitUntil ('load') waits for every resource; 'domcontentloaded' is often faster and sufficient. fill/selectOption/check/click each match a specific input type's real interaction model — check()/uncheck() are idempotent, unlike click(). A complete form test validates both successful submission and validation failures.",
    nextLessonSlug: "pw-frames-popups-dialogs",
  },
  {
    id: "pw-frames-popups-dialogs",
    slug: "pw-frames-popups-dialogs",
    title: "Frames, Popups, Dialogs, and File Transfer",
    description:
      "Handling content that isn't on the main page at all — an iframe's own document, a new tab, a native browser dialog, and a real file being uploaded or downloaded.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["pw-navigation-and-forms"],
    objectives: [
      "Explain why locating an element inside an iframe requires a frameLocator, not a plain page locator",
      "Capture a popup/new tab opened from an existing page",
      "Set up a listener for a native dialog and a file chooser before the action that triggers them",
    ],
    skills: ["playwright", "frames", "popups", "dialogs"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Frames", url: "https://playwright.dev/docs/frames" },
      { label: "Playwright docs: Dialogs", url: "https://playwright.dev/docs/dialogs" },
    ],
    keywords: ["frames", "iframes", "popups", "dialogs", "uploads", "downloads", "playwright"],
    explanation: `An \`<iframe>\` embeds an entirely separate document with its own DOM — a plain \`page.getByRole(...)\` locator only searches the **main page's** document and will never find an element that lives inside an iframe, no matter how correct the locator itself is. \`page.frameLocator("iframe#payment").getByRole("button", { name: "Pay" })\` explicitly scopes the search into that specific frame's document first. This is a genuinely common, easy-to-misdiagnose failure mode: a locator that looks completely correct fails simply because it's searching the wrong document — the fix is recognizing the element is inside a frame at all, not fixing the locator's own syntax.

A **popup** (a link with \`target="_blank"\`, or a \`window.open()\` call) opens in a *new* page within the same context — and Playwright requires you to explicitly **capture** it, because there's a genuine race: the popup's page object doesn't exist yet at the moment the triggering click happens. \`const [popup] = await Promise.all([context.waitForEvent("page"), page.getByRole("link", { name: "Open in new tab" }).click()])\` — starting the wait *and* the click together, in parallel, via \`Promise.all\`, is the correct, race-free pattern; waiting for the event *after* the click has already resolved risks missing it if the popup opens unusually fast.

**Native browser dialogs** (\`alert()\`, \`confirm()\`, \`prompt()\`) block the page's JavaScript execution in a real browser, and Playwright auto-dismisses them by default unless you register a handler *before* the action that triggers one: \`page.once("dialog", (dialog) => dialog.accept())\` (or \`.dismiss()\`, or \`.accept(text)\` for a prompt) must be set up **before** calling whatever action opens the dialog, for exactly the same "capture the listener before triggering the event" reason as popups. **File uploads** use \`locator.setInputFiles(path)\` directly on the \`<input type="file">\` element — no native OS file-picker dialog ever actually opens, since Playwright sets the file directly. **File downloads** are captured the same race-free way as popups: \`const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "Download" }).click()])\`, after which \`download.path()\` or \`download.saveAs(path)\` accesses the real downloaded file.`,
    example: {
      language: "javascript",
      description:
        "Modeling the 'capture the listener before triggering the event' pattern that popups, dialogs, and downloads all share -- the actual race-avoidance logic, not real browser events.",
      code: `// A simplified event emitter standing in for Playwright's page/context event system.
class FakeEmitter {
  constructor() { this.listeners = {}; }
  once(event, handler) { this.listeners[event] = handler; }
  emit(event, payload) {
    const handler = this.listeners[event];
    if (handler) handler(payload);
  }
}

function triggerActionThatOpensPopup(emitter) {
  emitter.emit("page", { url: "https://example.com/popup" }); // simulates the popup firing
}

async function captureRaceFree(emitter, eventName, triggerAction) {
  return new Promise((resolve) => {
    emitter.once(eventName, resolve); // registered BEFORE triggering -- this is the crucial order
    triggerAction();
  });
}

const emitter = new FakeEmitter();
captureRaceFree(emitter, "page", () => triggerActionThatOpensPopup(emitter))
  .then((popup) => console.log("captured popup:", popup.url));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Reverse the order (trigger the action, THEN register the listener) and observe the popup event being missed entirely.",
      code: `class FakeEmitter {
  constructor() { this.listeners = {}; }
  once(event, handler) { this.listeners[event] = handler; }
  emit(event, payload) { const h = this.listeners[event]; if (h) h(payload); else console.log("MISSED the event -- no listener was registered yet"); }
}
const emitter = new FakeEmitter();
emitter.emit("page", { url: "https://example.com/popup" }); // fired before any listener exists
emitter.once("page", (p) => console.log("captured:", p));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write frameLocatorPath(mainPageHasElement, iframeSelector, elementFoundInFrame) modeling why a plain page locator fails for an iframe element: return 'not found on main page' if !mainPageHasElement and no iframeSelector given; return 'found via frameLocator' if iframeSelector is given AND elementFoundInFrame is true; otherwise 'not found in frame either'.",
      starterCode: `function frameLocatorPath(mainPageHasElement, iframeSelector, elementFoundInFrame) {
  // TODO
}
`,
      solutionCode: `function frameLocatorPath(mainPageHasElement, iframeSelector, elementFoundInFrame) {
  if (mainPageHasElement) return "found on main page";
  if (!iframeSelector) return "not found on main page";
  if (elementFoundInFrame) return "found via frameLocator";
  return "not found in frame either";
}`,
      harness: `
        try { window.__report('t1', frameLocatorPath(false, null, false) === "not found on main page", 'no frame attempted should report not found on main page'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', frameLocatorPath(false, "iframe#payment", true) === "found via frameLocator", 'a correct frameLocator should find the element'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', frameLocatorPath(false, "iframe#wrong", false) === "not found in frame either", 'a wrong frame selector should still fail'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', frameLocatorPath(true, null, false) === "found on main page", 'an element genuinely on the main page should be found directly'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "reports not-found-on-main-page when no frame was tried" },
        { id: "t2", description: "reports found-via-frameLocator for a correct frame scope" },
        { id: "t3", description: "reports not-found-in-frame-either for a wrong frame selector" },
        { id: "t4", description: "reports found-on-main-page when the element is genuinely there" },
      ],
      hints: [
        "This models the diagnostic reasoning process: an element missing from the main page doesn't mean it doesn't exist -- it may just be inside a frame.",
        "Check the main-page case first, since that's the simplest, most direct success case.",
      ],
    },
    independentExercise: {
      id: "pw-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write captureRaceFree(registerListenerFirst) modeling the popup/dialog/download capture pattern: return true only if registerListenerFirst is true (the listener was registered BEFORE the triggering action), modeling that registering after the trigger risks missing the event. Then write dialogHandlerAction(dialogType, userChoice) returning 'accept', 'dismiss', or 'accept-with-text' based on: 'confirm'+'yes' -> 'accept', 'confirm'+'no' -> 'dismiss', 'prompt'+ any non-null userChoice -> 'accept-with-text', 'alert'+ anything -> 'accept' (alerts only have one button).",
      starterCode: `function captureRaceFree(registerListenerFirst) {
  // TODO
}
function dialogHandlerAction(dialogType, userChoice) {
  // TODO
}
`,
      solutionCode: `function captureRaceFree(registerListenerFirst) {
  return registerListenerFirst === true;
}
function dialogHandlerAction(dialogType, userChoice) {
  if (dialogType === "alert") return "accept";
  if (dialogType === "confirm") return userChoice === "yes" ? "accept" : "dismiss";
  if (dialogType === "prompt") return userChoice !== null ? "accept-with-text" : "dismiss";
  return "dismiss";
}`,
      harness: `
        try { window.__report('t1', captureRaceFree(true) === true, 'registering first should be race-free'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', captureRaceFree(false) === false, 'registering after the trigger risks missing the event'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', dialogHandlerAction("alert", null) === "accept", 'alerts should always be accepted'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', dialogHandlerAction("confirm", "yes") === "accept", 'confirming yes should accept'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try { window.__report('t5', dialogHandlerAction("confirm", "no") === "dismiss", 'confirming no should dismiss'); } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
        try { window.__report('t6', dialogHandlerAction("prompt", "some text") === "accept-with-text", 'a prompt with text should accept with text'); } catch (e) { window.__report('t6', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "recognizes registering the listener first as race-free" },
        { id: "t2", description: "recognizes registering after the trigger as not race-free" },
        { id: "t3", description: "always accepts an alert" },
        { id: "t4", description: "accepts a confirm dialog when the user chooses yes" },
        { id: "t5", description: "dismisses a confirm dialog when the user chooses no" },
        { id: "t6", description: "accepts a prompt with text when text is provided" },
      ],
      hints: [
        "This models the branching decision a real page.once('dialog', handler) callback would make based on dialog.type() and the desired response.",
        "The listener-before-trigger ordering is the single most important, easy-to-get-backwards detail for popups, dialogs, AND downloads alike.",
      ],
    },
    commonMistakes: [
      "Using a plain page locator for an element that's actually inside an iframe -- the locator's syntax can be perfectly correct and still never find the element, because it's searching the wrong document entirely.",
      "Registering a popup/dialog/download listener AFTER triggering the action that causes it -- this is a genuine race condition; the event can fire and be missed before the listener exists.",
      "Assuming file upload requires interacting with a native OS file-picker dialog -- Playwright's setInputFiles() sets the file directly on the input element, with no OS dialog ever actually opening.",
    ],
    quiz: [
      {
        id: "pw-q5-1",
        prompt:
          "Why does a correctly-written locator sometimes fail to find an element that's genuinely on the page?",
        choices: [
          "Playwright locators are unreliable by design",
          "If the element lives inside an iframe, a plain page locator searches only the main document and will never find it -- a frameLocator scoped to that iframe is required",
          "The locator syntax must always be wrong in this case",
          "Elements inside iframes cannot be located by Playwright at all",
        ],
        correctIndex: 1,
        explanation:
          "An iframe embeds a genuinely separate document. A plain page-level locator has no visibility into that document at all, regardless of how correct its selector logic is — recognizing that the element is inside a frame, and switching to frameLocator, is the actual fix.",
      },
      {
        id: "pw-q5-2",
        prompt:
          "Why must a popup/dialog/download listener be registered BEFORE the action that triggers it, using Promise.all rather than sequentially?",
        choices: [
          "It's only a style preference with no functional impact",
          "There's a genuine race: the triggering event can fire before a listener registered afterward exists, causing it to be missed entirely",
          "Playwright requires alphabetical ordering of statements",
          "Sequential code always runs slower than Promise.all",
        ],
        correctIndex: 1,
        explanation:
          "Playwright doesn't queue past events for a listener registered later — if the popup/dialog/download event has already fired before .once()/.waitForEvent() is set up, that specific occurrence is gone. Promise.all starts both the wait and the trigger together, closing that race.",
      },
      {
        id: "pw-q5-3",
        prompt:
          "How does Playwright's setInputFiles() handle file upload, compared to a real user?",
        choices: [
          "It opens the real OS file-picker dialog and selects a file automatically",
          'It sets the file directly on the <input type="file"> element, with no OS dialog ever opening at all',
          "It requires a special browser extension",
          "File upload cannot be automated in Playwright",
        ],
        correctIndex: 1,
        explanation:
          "setInputFiles() bypasses the OS-level file picker entirely by setting the input element's files property directly — a deliberate, honest simplification that makes upload testing fast and deterministic without needing to automate a native OS dialog.",
      },
    ],
    takeaway:
      "An iframe needs frameLocator, not a plain page locator, since it's a genuinely separate document; popups, dialogs, and downloads all require registering a listener before the triggering action, via Promise.all, to avoid a real race condition where the event fires before anything is listening for it.",
    summary:
      "frameLocator scopes a locator into a specific iframe's own document. Popups/downloads are captured via Promise.all pairing a waitForEvent with the triggering action, registered before that action to avoid a race. Dialogs need a page.once('dialog', ...) handler set up beforehand. File upload uses setInputFiles() directly, with no real OS dialog involved.",
    nextLessonSlug: "pw-network-observation-mocking",
  },
  {
    id: "pw-network-observation-mocking",
    slug: "pw-network-observation-mocking",
    title: "Network Observation and Mocking",
    description:
      "Watching real network traffic a page generates, and deliberately replacing part of it — the difference between observing and mocking, and when each is the right tool.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["pw-frames-popups-dialogs"],
    objectives: [
      "Wait for and assert against a specific network response triggered by a UI action",
      "Mock a network response to test a UI state that's hard to reach naturally (an error, an empty result)",
      "Explain the tradeoff between testing against a real backend and mocking network responses",
    ],
    skills: ["playwright", "network", "mocking"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Network", url: "https://playwright.dev/docs/network" },
      { label: "Playwright docs: Mock APIs", url: "https://playwright.dev/docs/mock" },
    ],
    keywords: ["network", "mocking", "route", "waitForResponse", "playwright"],
    explanation: `**Observing** network traffic means watching real requests/responses the application genuinely makes, without altering them: \`const responsePromise = page.waitForResponse(resp => resp.url().includes("/api/courses") && resp.status() === 200); await page.getByRole("button", { name: "Load courses" }).click(); const response = await responsePromise;\` — same race-avoidance pattern as popups and downloads (start waiting before the triggering click), letting a test assert against the real response's status, timing, or body without ever pretending the network call didn't happen.

**Mocking** deliberately replaces a network response with a fabricated one, via \`page.route(urlPattern, handler)\`: \`await page.route("**/api/courses", route => route.fulfill({ status: 500, body: JSON.stringify({ error: "Internal error" }) }))\`. This is the practical, honest way to test UI states that are difficult or impossible to reliably reach against a real backend — a server error, an empty result set, a specific edge-case response shape — without needing to actually break a real server or seed exact, fragile backend state for every single scenario. \`route.continue()\` lets a request through unmodified (useful for observing without altering); \`route.fulfill(...)\` replaces the response entirely; \`route.abort()\` simulates the request failing outright (a network error, not an HTTP error status).

The **honest tradeoff** worth stating explicitly: mocking makes a test fast, deterministic, and able to reach states a real backend can't reliably produce on demand — but a test built entirely on mocks only proves the frontend behaves correctly *given that exact mocked response shape*; it says nothing about whether the real backend actually returns that shape, or whether the real integration between frontend and backend genuinely works end to end. A mature test suite typically uses **both**: some tests genuinely exercise the real backend (proving real integration), and some use mocks specifically for hard-to-reach states (proving the frontend handles them correctly) — treating mocking as a replacement for *all* real-backend testing, rather than a complement to a smaller number of real ones, is a common design mistake that can let a real integration break while every mocked test keeps passing.`,
    example: {
      language: "javascript",
      description:
        "Modeling route interception's three outcomes (continue/fulfill/abort) and the observe-vs-mock distinction as data.",
      code: `function applyRouteHandler(request, mode, mockResponse) {
  if (mode === "continue") {
    return { type: "real-network-call", request };
  }
  if (mode === "fulfill") {
    return { type: "mocked-response", body: mockResponse };
  }
  if (mode === "abort") {
    return { type: "network-error", request };
  }
  throw new Error("unknown route mode: " + mode);
}

console.log(applyRouteHandler("/api/courses", "continue", null));
console.log(applyRouteHandler("/api/courses", "fulfill", { error: "Internal error" }));
console.log(applyRouteHandler("/api/courses", "abort", null));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call applyRouteHandler with mode 'bogus' and observe it correctly throws, rather than silently doing nothing.",
      code: `function applyRouteHandler(request, mode, mockResponse) {
  if (mode === "continue") return { type: "real-network-call", request };
  if (mode === "fulfill") return { type: "mocked-response", body: mockResponse };
  if (mode === "abort") return { type: "network-error", request };
  throw new Error("unknown route mode: " + mode);
}
console.log(applyRouteHandler("/api/x", "bogus", null));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write buildMockResponse(status, body) that returns an object { status, body: JSON.stringify(body) } -- modeling exactly what route.fulfill({...}) needs. Then write shouldMockOrObserve(scenario) returning 'mock' for 'server-error' or 'empty-results' (hard to reliably reach against a real backend), or 'observe' for 'happy-path' (should exercise the real integration).",
      starterCode: `function buildMockResponse(status, body) {
  // TODO
}
function shouldMockOrObserve(scenario) {
  // TODO
}
`,
      solutionCode: `function buildMockResponse(status, body) {
  return { status, body: JSON.stringify(body) };
}
function shouldMockOrObserve(scenario) {
  if (scenario === "server-error" || scenario === "empty-results") return "mock";
  return "observe";
}`,
      harness: `
        try {
          const r = buildMockResponse(500, { error: "boom" });
          window.__report('t1', r.status === 500 && r.body === JSON.stringify({error:"boom"}), 'should build a correct mock response shape');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldMockOrObserve("server-error") === "mock", 'a hard-to-reach error state should be mocked'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', shouldMockOrObserve("happy-path") === "observe", 'the happy path should exercise the real backend'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "builds a correct mock response object" },
        { id: "t2", description: "recommends mocking for a hard-to-reach state" },
        { id: "t3", description: "recommends observing (real backend) for the happy path" },
      ],
      hints: [
        "JSON.stringify(body) mirrors exactly what route.fulfill's body option expects -- a string, not a raw object.",
        "This models the deliberate mock-vs-real tradeoff decision, not a rule to mock everything.",
      ],
    },
    independentExercise: {
      id: "pw-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write matchesUrlPattern(url, pattern) implementing a SIMPLIFIED version of Playwright's glob-style route matching: pattern may contain '**' meaning 'match anything (including slashes)'. Split the pattern on '**' and check that url starts with the part before it and ends with the part after it (if either part is non-empty).",
      starterCode: `function matchesUrlPattern(url, pattern) {
  // TODO: split pattern on "**", check url starts with the prefix and ends with the suffix
  return false;
}
`,
      solutionCode: `function matchesUrlPattern(url, pattern) {
  const [prefix, suffix] = pattern.split("**");
  const startsOk = prefix ? url.startsWith(prefix) : true;
  const endsOk = suffix !== undefined && suffix ? url.endsWith(suffix) : true;
  return startsOk && endsOk;
}`,
      harness: `
        try { window.__report('t1', matchesUrlPattern("https://api.example.com/v1/courses", "**/api/courses") === false, 'a non-matching suffix should not match'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', matchesUrlPattern("https://api.example.com/api/courses", "**/api/courses") === true, 'a matching suffix pattern should match'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', matchesUrlPattern("https://api.example.com/api/courses/123", "**/api/courses") === false, 'extra trailing path should not match an exact suffix pattern'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly rejects a non-matching URL" },
        { id: "t2", description: "correctly matches a URL ending with the pattern's suffix" },
        {
          id: "t3",
          description:
            "correctly rejects a URL with extra trailing content past the expected suffix",
        },
      ],
      hints: [
        "This is a deliberately simplified model of glob matching -- real Playwright route patterns support more syntax, but the prefix/suffix idea captures the core '** means anything' behavior.",
        "String.prototype.endsWith and startsWith are the two checks needed once the pattern is split.",
      ],
    },
    commonMistakes: [
      "Mocking every single network call in a test suite -- this makes tests fast and deterministic, but a suite with no real-backend tests at all proves nothing about whether the actual integration works, only that the frontend handles fabricated responses correctly.",
      "Using route.abort() when route.fulfill() with an error status was intended, or vice versa -- abort() simulates a network-level failure (no response at all), while fulfill() with a 500 status simulates a real HTTP error response; these are genuinely different failure modes worth testing separately.",
      "Waiting for a network response AFTER triggering the action that causes it, instead of using the same before-the-trigger pattern from the previous lesson -- the exact same race condition applies to network responses as to popups and downloads.",
    ],
    quiz: [
      {
        id: "pw-q6-1",
        prompt:
          "What is the key difference between 'observing' and 'mocking' network traffic in a Playwright test?",
        choices: [
          "There is no real difference; both terms describe the same thing",
          "Observing watches real requests/responses without altering them; mocking deliberately replaces a response with a fabricated one via page.route",
          "Observing only works in Chromium; mocking works in all browsers",
          "Mocking is always slower than observing",
        ],
        correctIndex: 1,
        explanation:
          "Observing (waitForResponse) lets a test assert against genuine backend behavior without changing it. Mocking (page.route + fulfill) deliberately substitutes a fabricated response — a fundamentally different testing strategy with different tradeoffs, not just a faster version of the same thing.",
      },
      {
        id: "pw-q6-2",
        prompt:
          "Why is testing a UI's error-handling entirely through mocked network responses, with no real-backend tests at all, a genuine risk?",
        choices: [
          "It isn't a risk; mocking is always strictly better",
          "A fully-mocked suite only proves the frontend handles the EXACT mocked response shape correctly -- it says nothing about whether the real backend actually returns that shape, or whether the real integration works",
          "Mocked tests always run slower than real-backend tests",
          "Playwright does not actually support real-backend testing",
        ],
        correctIndex: 1,
        explanation:
          "Mocking is a genuine, useful tool for hard-to-reach states, but it tests the frontend in isolation against an assumption about the backend's shape — a real integration bug (the backend actually returning something different) can hide behind an entirely-passing mocked suite.",
      },
      {
        id: "pw-q6-3",
        prompt:
          "What does route.abort() simulate, as distinct from route.fulfill({ status: 500, ... })?",
        choices: [
          "They are identical in effect",
          "abort() simulates a network-level failure (no response received at all); fulfill() with a 500 status simulates a real HTTP error response actually being received",
          "abort() only works for GET requests",
          "fulfill() cannot return error status codes",
        ],
        correctIndex: 1,
        explanation:
          "These represent genuinely different failure modes a real application might need to handle differently — a request that never gets a response at all (network down, DNS failure) versus a request that gets a clear error response from a functioning server — and testing both separately is worthwhile.",
      },
    ],
    takeaway:
      "Observing watches real network traffic; mocking deliberately fabricates it via page.route — mocking is the honest way to reach hard-to-produce states like server errors, but a suite that mocks everything proves nothing about real integration, so a mature suite deliberately uses both.",
    summary:
      "waitForResponse observes real network traffic, using the same before-the-trigger race-avoidance pattern as popups/downloads. page.route intercepts requests: continue() passes through, fulfill() substitutes a fabricated response, abort() simulates a network-level failure. Mocking and real-backend testing are complementary, not interchangeable.",
    nextLessonSlug: "pw-api-request-context",
  },
  {
    id: "pw-api-request-context",
    slug: "pw-api-request-context",
    title: "APIRequestContext: API Calls Without a Browser",
    description:
      "Making real HTTP requests directly from a Playwright test — no browser, no page, no rendering — and why that's often the faster, more reliable way to set up test state.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["pw-network-observation-mocking"],
    objectives: [
      "Explain what APIRequestContext is and how it differs from browser-driven network traffic",
      "Use APIRequestContext to set up test data before a UI test runs",
      "Decide when a scenario is better tested purely at the API level than through the UI",
    ],
    skills: ["playwright", "api-testing", "apirequestcontext"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: API testing", url: "https://playwright.dev/docs/api-testing" },
    ],
    keywords: ["apirequestcontext", "api testing", "playwright"],
    explanation: `**\`APIRequestContext\`** (\`const api = await request.newContext(); await api.post("/api/courses", { data: {...} })\`) makes real HTTP requests directly, without launching a browser, opening a page, or rendering any HTML at all — it's Playwright's own built-in HTTP client, sharing the same library the browser-driven \`page\` object uses under the hood for its own network activity, but usable completely on its own. This is a genuinely different tool from everything covered so far in this course: no browser process, no page, no DOM, no rendering — just a request and a response.

The practical payoff is **test setup speed and reliability**: seeding the exact data a UI test needs (creating a course, enrolling a learner, marking a lesson complete) by clicking through the UI is slow and adds unrelated failure surface — if the UI's own enrollment flow has a bug, every single test that depends on "a learner is already enrolled" as a starting condition breaks too, even tests that have nothing to do with enrollment. Setting up that same state via a direct \`APIRequestContext\` call is faster and decouples a test's actual subject (what it's meant to verify) from unrelated parts of the application the test doesn't care about.

The **decision rule** for API-only versus UI testing: if a scenario's real value is verifying what a **user sees and can do** (does the enrolled-course badge render, can the learner click through to the lesson), it belongs in a browser-driven UI test. If a scenario's real value is verifying **backend behavior** (does the API reject an invalid payload, does a duplicate-enrollment attempt correctly return a 409, is the response shape correct) with no meaningful UI-rendering component to check, testing it purely through \`APIRequestContext\` is both faster and a more direct, honest test of the actual thing being verified — routing every scenario through the UI regardless of what it's actually testing is a common, needless source of slow, brittle test suites.`,
    example: {
      language: "javascript",
      description:
        "Modeling APIRequestContext's role as pure HTTP setup, decoupled from any UI, and the decision rule for choosing it.",
      code: `// A simplified stand-in for Playwright's real request.newContext() -- models the SHAPE
// of API-only requests, not real network calls.
class FakeApiRequestContext {
  constructor() { this.records = []; }
  post(path, options) {
    this.records.push({ method: "POST", path, body: options.data });
    return { status: 201, body: { id: this.records.length, ...options.data } };
  }
}

function shouldTestAtApiLevel(scenario) {
  const apiLevelReasons = ["invalid-payload-rejection", "duplicate-conflict-status", "response-shape"];
  return apiLevelReasons.includes(scenario);
}

const api = new FakeApiRequestContext();
const enrollment = api.post("/api/enrollments", { data: { learnerId: 1, courseId: 10 } });
console.log(enrollment); // { status: 201, body: { id: 1, learnerId: 1, courseId: 10 } } -- test setup, no browser involved

console.log(shouldTestAtApiLevel("invalid-payload-rejection")); // true -- backend behavior, no UI-rendering component
console.log(shouldTestAtApiLevel("enrolled-badge-renders"));    // false -- this is genuinely a UI concern`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call api.post twice and confirm each call gets a distinct, incrementing id in its response body.",
      code: `class FakeApiRequestContext {
  constructor() { this.records = []; }
  post(path, options) {
    this.records.push({ method: "POST", path, body: options.data });
    return { status: 201, body: { id: this.records.length, ...options.data } };
  }
}
const api = new FakeApiRequestContext();
console.log(api.post("/api/enrollments", { data: { learnerId: 1 } }));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write seedEnrollment(apiClient, learnerId, courseId) that calls apiClient.post('/api/enrollments', { data: { learnerId, courseId } }) and returns just the created enrollment's id from the response. Then write shouldTestAtApiLevel(scenario) returning true for 'invalid-payload-rejection', 'duplicate-conflict-status', or 'response-shape'; false otherwise.",
      starterCode: `function seedEnrollment(apiClient, learnerId, courseId) {
  // TODO: call apiClient.post and return response.body.id
}
function shouldTestAtApiLevel(scenario) {
  // TODO
}
`,
      solutionCode: `function seedEnrollment(apiClient, learnerId, courseId) {
  const response = apiClient.post("/api/enrollments", { data: { learnerId, courseId } });
  return response.body.id;
}
function shouldTestAtApiLevel(scenario) {
  return ["invalid-payload-rejection", "duplicate-conflict-status", "response-shape"].includes(scenario);
}`,
      harness: `
        function fakeApi() {
          let n = 0;
          return { post: (path, opts) => ({ status: 201, body: { id: ++n, ...opts.data } }) };
        }
        try {
          const id = seedEnrollment(fakeApi(), 1, 10);
          window.__report('t1', id === 1, 'should return the created enrollment id'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldTestAtApiLevel("invalid-payload-rejection") === true, 'backend validation belongs at the API level'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', shouldTestAtApiLevel("badge-renders-correctly") === false, 'a UI-rendering concern does not belong at the API level'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "seedEnrollment correctly extracts the created id" },
        { id: "t2", description: "recognizes backend validation as API-level testing" },
        { id: "t3", description: "recognizes a UI-rendering concern as NOT API-level testing" },
      ],
      hints: [
        "seedEnrollment models exactly the 'set up state fast, without the UI' pattern this lesson describes.",
        "The decision rule is about what the scenario's real value is verifying, not a blanket preference for one approach.",
      ],
    },
    independentExercise: {
      id: "pw-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write seedMultipleEnrollments(apiClient, pairs) where pairs is an array of [learnerId, courseId] tuples. Call apiClient.post once per pair, and return an array of all the created ids, IN ORDER. This models efficiently seeding several pieces of test state via API calls before a UI test runs.",
      starterCode: `function seedMultipleEnrollments(apiClient, pairs) {
  // TODO
  return [];
}
`,
      solutionCode: `function seedMultipleEnrollments(apiClient, pairs) {
  const ids = [];
  for (const [learnerId, courseId] of pairs) {
    const response = apiClient.post("/api/enrollments", { data: { learnerId, courseId } });
    ids.push(response.body.id);
  }
  return ids;
}`,
      harness: `
        function fakeApi() {
          let n = 0;
          return { post: (path, opts) => ({ status: 201, body: { id: ++n, ...opts.data } }) };
        }
        try {
          const ids = seedMultipleEnrollments(fakeApi(), [[1,10],[2,20],[3,30]]);
          window.__report('t1', JSON.stringify(ids) === JSON.stringify([1,2,3]), 'should return ids in the order seeded'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const ids = seedMultipleEnrollments(fakeApi(), []);
          window.__report('t2', ids.length === 0, 'empty pairs should give an empty result'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "seeds multiple enrollments in order and returns their ids" },
        { id: "t2", description: "handles an empty pairs list" },
      ],
      hints: [
        "This is a straightforward loop calling seedEnrollment's underlying logic once per pair.",
        "Order matters here since the harness checks the exact returned array, not just its contents.",
      ],
    },
    commonMistakes: [
      "Setting up all test data by clicking through the UI, even for tests whose actual subject has nothing to do with that setup flow -- this couples every test to the reliability of an unrelated UI flow, and is far slower than a direct API call.",
      "Testing backend-only concerns (input validation, status codes, response shape) exclusively through the UI when there's no meaningful rendering to actually verify -- this is slower and less direct than exercising the API surface itself.",
      "Assuming APIRequestContext requires a browser or page to be open -- it doesn't; it's a standalone HTTP client that can be used with no browser involved at all.",
    ],
    quiz: [
      {
        id: "pw-q7-1",
        prompt: "What does APIRequestContext let a Playwright test do?",
        choices: [
          "Make browser-driven network requests only, through a rendered page",
          "Make real HTTP requests directly, with no browser, page, or rendering involved at all",
          "Mock network responses without making real requests",
          "Only read cookies from an existing browser context",
        ],
        correctIndex: 1,
        explanation:
          "APIRequestContext is Playwright's standalone HTTP client — it makes genuine requests and receives genuine responses, entirely independent of any browser, page, or DOM, which is exactly what makes it fast for test setup unrelated to UI rendering.",
      },
      {
        id: "pw-q7-2",
        prompt:
          "Why is seeding test data via APIRequestContext often preferable to clicking through the UI to create it?",
        choices: [
          "It isn't preferable; UI-based setup is always more thorough",
          "It's faster and decouples the test's actual subject from unrelated UI flows -- a bug in an unrelated UI flow used only for setup shouldn't break tests that don't actually test that flow",
          "APIRequestContext is the only way to create test data at all",
          "UI-based setup is not supported by Playwright",
        ],
        correctIndex: 1,
        explanation:
          "If a test's real subject is, say, lesson completion, requiring it to first click through an unrelated enrollment UI flow just to reach a starting state means a bug in THAT flow breaks this unrelated test too — API-based setup avoids that coupling and is meaningfully faster.",
      },
      {
        id: "pw-q7-3",
        prompt:
          "A scenario verifies that the API returns a 409 status for a duplicate enrollment attempt, with no UI-rendering aspect being tested. Where does this scenario best belong?",
        choices: [
          "Exclusively as a UI test, clicking through the enrollment form",
          "As an API-level test using APIRequestContext directly -- the scenario's real value is backend behavior with nothing UI-specific to verify",
          "It cannot be tested at all",
          "Both a UI test AND an API test are always required for every scenario",
        ],
        correctIndex: 1,
        explanation:
          "Since the scenario's entire value is in verifying backend status-code behavior, not anything a user sees or interacts with, testing it directly via APIRequestContext is both more direct (tests the actual thing in question) and faster than routing it unnecessarily through the UI.",
      },
    ],
    takeaway:
      "APIRequestContext makes real HTTP requests with no browser or rendering involved — use it to seed test state fast and to test backend-only behavior directly, reserving browser-driven UI tests for scenarios whose real value is what a user actually sees and does.",
    summary:
      "APIRequestContext is Playwright's standalone HTTP client, usable with no browser or page. It's the right tool for fast test-data setup and for testing backend behavior (validation, status codes, response shape) that has no meaningful UI-rendering component to verify.",
    nextLessonSlug: "pw-auth-state-projects",
  },
  {
    id: "pw-auth-state-projects",
    slug: "pw-auth-state-projects",
    title: "Authentication State and Browser Projects",
    description:
      "Signing in once and reusing that session across every test — and running the exact same suite against multiple real browser engines through Playwright projects.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["pw-api-request-context"],
    objectives: [
      "Explain why signing in inside every single test is slow and how storageState avoids it",
      "Configure multiple browser projects and understand what each one actually verifies",
      "Build a locator-quality and fixture-composition exercise reflecting real Playwright authentication patterns",
    ],
    skills: ["playwright", "authentication", "projects"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Authentication", url: "https://playwright.dev/docs/auth" },
      {
        label: "Playwright docs: Test configuration — Projects",
        url: "https://playwright.dev/docs/test-projects",
      },
    ],
    keywords: ["authentication", "storageState", "projects", "playwright"],
    explanation: `Signing in through the UI inside **every single test** — filling a login form, submitting, waiting for redirect — is slow and repetitive, and it means a bug in the login flow itself breaks every other test in the suite, not just the ones actually testing login. Playwright's recommended pattern: sign in **once**, in a dedicated setup step, save the resulting cookies and storage via \`await context.storageState({ path: "auth.json" })\`, and have every other test start from a browser context that **loads** that saved state (\`test.use({ storageState: "auth.json" })\`) — instantly "already signed in," with zero login-form interaction needed in the tests that don't actually care about the login flow itself.

A **project** in \`playwright.config.ts\` is a named configuration — a browser engine, a viewport, a device emulation, or a specific \`storageState\` — and the *same* test files run once per configured project. This is exactly the mechanism from this course's first lesson's guided local lab (chromium/firefox/webkit projects), extended: a project can also specify \`storageState\` to pre-authenticate, or \`...devices["iPhone 13"]\` to run the identical suite against a mobile emulation, all without duplicating a single test file. A common, effective structure uses a **dependency**: a \`setup\` project that runs first and performs the real login, saving \`storageState\`, and other projects declared with \`dependencies: ["setup"]\` so Playwright's test runner automatically runs the login step before any test that needs it, exactly once per full run, not once per test.

The genuinely important limitation worth stating honestly: \`storageState\` only captures **cookies and localStorage/sessionStorage** — it does not capture server-side session state that might expire independently, nor does re-using a saved auth state prove the login flow itself still works (that's exactly why a small, separate, real test of the login flow itself remains worthwhile even once most other tests bypass it via \`storageState\`). Treating \`storageState\` as a total replacement for ever testing login again is a common, easy mistake — it's an optimization for *tests that aren't about login*, not a reason to stop testing login at all.`,
    example: {
      language: "javascript",
      description:
        "Modeling the sign-in-once, reuse-everywhere pattern and multi-project configuration as data.",
      code: `function buildProjectConfig(name, deviceOverrides, useStorageState) {
  return {
    name,
    use: {
      ...deviceOverrides,
      ...(useStorageState ? { storageState: "auth.json" } : {}),
    },
    ...(useStorageState ? {} : { dependencies: [] }),
  };
}

const setupProject = { name: "setup", testMatch: /.*\\.setup\\.ts/ };
const chromiumAuthed = { ...buildProjectConfig("chromium", { browserName: "chromium" }, true), dependencies: ["setup"] };
const chromiumAnonymous = buildProjectConfig("chromium-anonymous", { browserName: "chromium" }, false);

console.log(chromiumAuthed.use.storageState);   // "auth.json" -- starts pre-authenticated
console.log(chromiumAnonymous.use.storageState); // undefined -- starts with a clean, signed-out context, deliberately`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Build a webkit project with device overrides for 'Desktop Safari' and confirm its use object merges correctly.",
      code: `function buildProjectConfig(name, deviceOverrides, useStorageState) {
  return { name, use: { ...deviceOverrides, ...(useStorageState ? { storageState: "auth.json" } : {}) } };
}
console.log(buildProjectConfig("webkit", { browserName: "webkit" }, true));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write needsLoginSetup(testTags) modeling which tests need the storageState-providing setup dependency: return true unless testTags includes 'anonymous' or 'login-flow' (tests that deliberately start signed-out, including the login test itself, must NOT depend on a pre-authenticated setup).",
      starterCode: `function needsLoginSetup(testTags) {
  // TODO
}
`,
      solutionCode: `function needsLoginSetup(testTags) {
  return !testTags.includes("anonymous") && !testTags.includes("login-flow");
}`,
      harness: `
        try { window.__report('t1', needsLoginSetup(["dashboard"]) === true, 'a normal authenticated-feature test should need setup'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', needsLoginSetup(["login-flow"]) === false, 'the login flow test itself must not depend on being pre-authenticated'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', needsLoginSetup(["anonymous", "pricing-page"]) === false, 'a deliberately signed-out test should not use the setup dependency'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a normal feature test needs the login setup" },
        {
          id: "t2",
          description: "the login flow test itself does not depend on pre-authentication",
        },
        {
          id: "t3",
          description: "a deliberately anonymous test does not use the setup dependency",
        },
      ],
      hints: [
        "The login test itself is the one genuine exception -- it MUST start signed-out to test signing in at all.",
        "This models exactly why storageState is an optimization for tests NOT about login, not a total replacement for testing login.",
      ],
    },
    independentExercise: {
      id: "pw-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write buildBrowserProjectMatrix(browserNames, includeMobile) returning an array of project name strings: one per browser name in browserNames, plus (if includeMobile is true) one additional 'mobile-chromium' entry. This models composing a real playwright.config.ts projects array from a small set of choices.",
      starterCode: `function buildBrowserProjectMatrix(browserNames, includeMobile) {
  // TODO
  return [];
}
`,
      solutionCode: `function buildBrowserProjectMatrix(browserNames, includeMobile) {
  const projects = [...browserNames];
  if (includeMobile) projects.push("mobile-chromium");
  return projects;
}`,
      harness: `
        try {
          const result = buildBrowserProjectMatrix(["chromium","firefox","webkit"], true);
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["chromium","firefox","webkit","mobile-chromium"]), 'should append mobile-chromium when requested'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = buildBrowserProjectMatrix(["chromium"], false);
          window.__report('t2', JSON.stringify(result) === JSON.stringify(["chromium"]), 'should not append mobile when not requested'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "includes a mobile project when requested" },
        { id: "t2", description: "excludes the mobile project when not requested" },
      ],
      hints: [
        "Copy the input array first, then conditionally push -- avoid mutating the caller's array.",
        "This mirrors the real config-building decision from this lesson's guided local lab.",
      ],
    },
    guidedLocalLab: {
      id: "pw-gll-locators-fixtures-auth",
      title: "Build Reliable Tests with Locators, Fixtures, and Authentication State",
      scenario:
        "Extend your Playwright project from Module 1 with a real sign-in-once setup, a shared fixture, and role-based locators — the combination that makes a real test suite both fast and reliable.",
      requiredTools: [
        { name: "Node.js", version: "20.x or 22.x LTS" },
        { name: "@playwright/test", version: "1.62.x" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        "Continue from the pw-learning-lab project created in this course's first guided local lab (or recreate it if starting fresh).",
        "Add a tests-setup/ folder for the authentication setup project.",
        "Pick any real, publicly-accessible site with a login form you're comfortable using for practice (or use a local test app if you have one) — this lab's file structure assumes a generic login form.",
      ],
      projectStructure: `pw-learning-lab/
  playwright.config.ts
  tests-setup/
    auth.setup.ts
  tests/
    dashboard.spec.ts
  playwright/.auth/
    user.json (generated, not committed)`,
      starterFiles: [
        {
          path: "tests-setup/auth.setup.ts",
          content: `import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate once", async ({ page }) => {
  // TODO: navigate to your chosen site's login page
  // TODO: fill in credentials using environment variables (process.env.TEST_USER / process.env.TEST_PASS),
  //       never hard-coded real credentials
  // TODO: submit and assert something confirming a successful sign-in
  // TODO: await page.context().storageState({ path: authFile });
});
`,
        },
        {
          path: "tests/dashboard.spec.ts",
          content: `import { test, expect } from "@playwright/test";

test("an already-authenticated page shows signed-in content", async ({ page }) => {
  // TODO: navigate directly to a page that requires authentication --
  // this test should start ALREADY signed in, via the project's storageState
  // TODO: assert something that only appears when signed in
});
`,
        },
      ],
      requirements: [
        "auth.setup.ts reads credentials from environment variables, never hard-coded literals.",
        "auth.setup.ts saves storageState to playwright/.auth/user.json after a real, successful sign-in.",
        "playwright.config.ts defines a 'setup' project and at least one other project with `dependencies: ['setup']` and `use: { storageState: 'playwright/.auth/user.json' }`.",
        "dashboard.spec.ts uses only role-based locators (getByRole/getByLabel/getByText), no structural CSS/XPath selectors.",
        "playwright/.auth/ is added to .gitignore so the saved session is never committed.",
      ],
      commands: [
        {
          description: "Set credentials for this session only (not committed anywhere)",
          command: "export TEST_USER=your-test-username TEST_PASS=your-test-password",
        },
        {
          description: "Run the full suite (setup runs automatically first, via dependencies)",
          command: "npx playwright test",
        },
      ],
      expectedBehavior:
        "Running `npx playwright test` runs the setup project first (a real sign-in, producing playwright/.auth/user.json), then runs dashboard.spec.ts already signed in, with no login-form interaction inside that test at all.",
      verificationSteps: [
        {
          command: "npx playwright test",
          expectedResult:
            "The setup project passes, then dashboard.spec.ts passes without ever visiting the login page",
        },
        {
          command: "cat playwright/.auth/user.json",
          expectedResult: "A real JSON file containing cookies/storage state now exists locally",
        },
        {
          command: "git status",
          expectedResult:
            "playwright/.auth/ does NOT appear as untracked — confirms .gitignore is working",
        },
      ],
      troubleshooting: [
        {
          issue: "dashboard.spec.ts still shows signed-out content",
          fix: "Confirm the project running dashboard.spec.ts actually declares `dependencies: ['setup']` and `use: { storageState: ... }` pointing at the same path auth.setup.ts wrote to.",
        },
        {
          issue: "`Error: TEST_USER is not defined`",
          fix: "Export the environment variables in the same terminal session before running the tests — they are never hard-coded in the committed files.",
        },
        {
          issue: "storageState file is empty or missing expected cookies",
          fix: "Confirm auth.setup.ts's assertion after submitting genuinely confirms a signed-in state BEFORE calling storageState() — capturing state before sign-in actually completes saves a signed-out session.",
        },
      ],
      hints: [
        "The dependencies field on a project is what makes Playwright automatically run 'setup' before that project's own tests, exactly once per full test run.",
        "Never commit real credentials, even test ones -- environment variables plus a .env file excluded via .gitignore is the standard, safe pattern.",
        "Role-based locators (getByRole, getByLabel) in dashboard.spec.ts double as a check that the authenticated page is genuinely accessible, not just visually correct.",
      ],
      referenceSolution: {
        summary:
          "auth.setup.ts reads TEST_USER/TEST_PASS from environment variables, signs in for real, and saves storageState. playwright.config.ts's 'authenticated' project depends on 'setup' and loads that storageState. dashboard.spec.ts uses only role-based locators and starts already signed in.",
        files: [
          {
            path: "tests-setup/auth.setup.ts",
            content: `import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate once", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill(process.env.TEST_USER ?? "");
  await page.getByLabel("Password").fill(process.env.TEST_PASS ?? "");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
`,
          },
          {
            path: "tests/dashboard.spec.ts",
            content: `import { test, expect } from "@playwright/test";

test("an already-authenticated page shows signed-in content", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in" })).toHaveCount(0);
});
`,
          },
        ],
      },
      extensionChallenge:
        "Add a second, deliberately anonymous project (no storageState) running a dedicated login.spec.ts that tests the sign-in flow itself for real — confirming the pattern from this lesson: storageState is an optimization for tests that aren't about login, not a replacement for testing login at all.",
    },
    commonMistakes: [
      "Signing in through the UI inside every single test -- this is slow, repetitive, and means a bug in the login flow breaks tests that have nothing to do with login.",
      "Hard-coding real or realistic-looking credentials directly in a committed test file -- credentials belong in environment variables, read via process.env, never committed even for a 'throwaway' test account.",
      "Treating storageState as a total replacement for ever testing the login flow again -- it's an optimization for tests NOT about login; a dedicated, real login test should still exist and run.",
    ],
    quiz: [
      {
        id: "pw-q8-1",
        prompt: "What does context.storageState({ path: 'auth.json' }) actually save?",
        choices: [
          "A screenshot of the signed-in page",
          "Cookies and localStorage/sessionStorage from the current browser context",
          "The server's session database",
          "Nothing persists; it's only used for debugging",
        ],
        correctIndex: 1,
        explanation:
          "storageState captures exactly the client-side state a browser holds after signing in — cookies and web storage — which is precisely what a fresh context needs to load to appear already authenticated, without needing server-side session data captured at all.",
      },
      {
        id: "pw-q8-2",
        prompt: "What does declaring `dependencies: ['setup']` on a Playwright project accomplish?",
        choices: [
          "It installs an npm dependency automatically",
          "It makes Playwright automatically run the 'setup' project's tests first, exactly once per full run, before this project's own tests execute",
          "It has no functional effect; it's purely documentation",
          "It skips this project's tests entirely",
        ],
        correctIndex: 1,
        explanation:
          "dependencies is what wires a setup project (performing a one-time real sign-in and saving storageState) into the run order automatically, so every dependent project's tests can rely on that state already existing by the time they run.",
      },
      {
        id: "pw-q8-3",
        prompt:
          "Why should a real login-flow test still exist even after most other tests adopt storageState?",
        choices: [
          "It shouldn't; storageState makes further login testing unnecessary",
          "storageState only proves a PREVIOUSLY-saved session works; it doesn't verify the login flow itself still functions, which only a real, dedicated login test actually checks",
          "Login tests are required by Playwright's license",
          "storageState cannot be used unless a login test also exists",
        ],
        correctIndex: 1,
        explanation:
          "storageState is purely a reuse mechanism for state already captured — if the login form itself breaks, a suite relying entirely on a stale, previously-saved storageState would never notice, which is exactly why a real, separate login test remains genuinely necessary.",
      },
    ],
    takeaway:
      "Sign in once via a setup project, save storageState, and have other projects depend on it and load that state — this makes most tests fast and decoupled from the login flow, but a real, dedicated login test must still exist, since storageState only proves a previously-saved session works, not that signing in still does.",
    summary:
      "storageState captures cookies/web storage from a real sign-in, reusable across tests via test.use({ storageState }). A setup project with dependencies wires this in automatically. Playwright projects also configure different browsers/devices, running the same test files against each. storageState is an optimization for non-login tests, not a replacement for testing login itself.",
    nextLessonSlug: "pw-fixtures-and-hooks",
  },
  {
    id: "pw-fixtures-and-hooks",
    slug: "pw-fixtures-and-hooks",
    title: "Fixtures, Hooks, and Parameterization",
    description:
      "Playwright's fixture system as dependency injection for tests, how it composes cleanly where hooks don't, and running the same test logic across many data variations.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 8,
    difficulty: "advanced",
    estimatedMinutes: 21,
    prerequisites: ["pw-auth-state-projects"],
    objectives: [
      "Explain what a fixture provides that a beforeEach hook does not",
      "Define a custom fixture with proper setup and teardown",
      "Parameterize a test across a set of input values without duplicating test logic",
    ],
    skills: ["playwright", "fixtures", "hooks", "parameterization"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Fixtures", url: "https://playwright.dev/docs/test-fixtures" },
    ],
    keywords: ["fixtures", "hooks", "parameterization", "playwright"],
    explanation: `A Playwright **fixture** is a named, reusable piece of test setup (and teardown) that a test declares it needs by naming it as a parameter: \`test("...", async ({ page, myFixture }) => { ... })\`. \`page\` itself is a **built-in fixture** — every test gets a fresh one automatically, without ever writing setup code for it. A **custom fixture** is defined once (\`test.extend({ apiClient: async ({ request }, use) => { const client = await request.newContext(); await use(client); await client.dispose(); } })\`) and can then be requested by name in any test, with Playwright automatically running its setup before the test body and its teardown after — even if the test fails or throws.

This is genuinely **dependency injection**, and it composes in a way \`beforeEach\`/\`afterEach\` hooks structurally cannot: a fixture can itself depend on other fixtures (an \`authenticatedPage\` fixture built from the base \`page\` fixture plus a sign-in step), and only the specific tests that actually request a given fixture pay its setup cost — a \`beforeEach\` hook, by contrast, runs unconditionally for **every** test in its scope, whether or not that particular test needs whatever it sets up. A test suite with many hooks accumulated over time, each added for one specific test's needs but now running before every test in the file, is a common, real source of slow, hard-to-reason-about suites — fixtures avoid this by making each test's actual dependencies explicit and opt-in.

**Parameterization** — running the same test logic across many input values — avoids copy-pasting a test body with only the input changed: a loop over \`["learner", "instructor", "admin"]\` calling \`test(\` + role + \` sees the correct dashboard, async ({ page }) => { ... })\` for each one generates one distinct, individually-reportable test per role, sharing one body. This is the same principle as a data-driven test in any testing framework — a real bug found in the "admin" case shows up as a failure specifically labeled "admin," not as one generic failure requiring you to guess which of three cases actually broke.`,
    example: {
      language: "javascript",
      description:
        "Modeling fixture composition (a fixture built from another fixture) and the opt-in-per-test cost this gives you over a blanket beforeEach.",
      code: `// A simplified fixture system: each fixture is a function that sets up, yields a value, then tears down.
async function pageFixture(use) {
  const page = { closed: false };
  await use(page);
  page.closed = true; // teardown, always runs after the test body, even on failure
}

async function authenticatedPageFixture(use) {
  await pageFixture(async (page) => {
    page.signedIn = true; // setup built ON TOP of the base page fixture
    await use(page);
  });
}

async function runTest(name, fixture, testBody) {
  await fixture(async (resource) => {
    console.log("running:", name);
    await testBody(resource);
  });
}

runTest("uses base page fixture", pageFixture, async (page) => console.log("signedIn:", page.signedIn));
runTest("uses authenticated fixture", authenticatedPageFixture, async (page) => console.log("signedIn:", page.signedIn));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a third layer -- an adminPageFixture built on top of authenticatedPageFixture -- and confirm the composition still works.",
      code: `async function pageFixture(use) {
  const page = {};
  await use(page);
}
async function authenticatedPageFixture(use) {
  await pageFixture(async (page) => { page.signedIn = true; await use(page); });
}
authenticatedPageFixture(async (page) => console.log(page));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write runWithFixture(setup, teardown, testBody) modeling a fixture's lifecycle: call setup() to get a resource, run testBody(resource), then ALWAYS call teardown(resource) afterward -- even if testBody throws (use try/finally). Return whatever testBody returned, or re-throw its error after teardown still ran.",
      starterCode: `function runWithFixture(setup, teardown, testBody) {
  const resource = setup();
  // TODO: run testBody(resource) inside try/finally, always calling teardown(resource) in finally
}
`,
      solutionCode: `function runWithFixture(setup, teardown, testBody) {
  const resource = setup();
  try {
    return testBody(resource);
  } finally {
    teardown(resource);
  }
}`,
      harness: `
        try {
          let torn = false;
          const result = runWithFixture(() => ({ id: 1 }), () => { torn = true; }, (r) => r.id * 10);
          window.__report('t1', result === 10 && torn === true, 'should run the test body and tear down afterward on success'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          let torn = false;
          let threw = false;
          try { runWithFixture(() => ({}), () => { torn = true; }, () => { throw new Error("boom"); }); } catch (e) { threw = true; }
          window.__report('t2', torn === true && threw === true, 'teardown must run even when the test body throws, and the error must still propagate');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "runs the test body and tears down on success, returning the result",
        },
        {
          id: "t2",
          description: "tears down even when the test body throws, and still propagates the error",
        },
      ],
      hints: [
        "try/finally is exactly the right tool: finally runs whether try succeeds, returns, or throws.",
        "This models a real Playwright fixture's guaranteed-teardown behavior, which is why fixtures are safer than manual setup/cleanup code.",
      ],
    },
    independentExercise: {
      id: "pw-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write parameterizedTestNames(baseName, values) returning an array of test-name strings, one per value, in the form `${baseName} - ${value}` -- modeling how a parameterized loop generates distinct, individually-reportable test names instead of one generic test covering every case silently.",
      starterCode: `function parameterizedTestNames(baseName, values) {
  // TODO
  return [];
}
`,
      solutionCode: `function parameterizedTestNames(baseName, values) {
  return values.map((v) => \`\${baseName} - \${v}\`);
}`,
      harness: `
        try {
          const result = parameterizedTestNames("sees correct dashboard", ["learner","instructor","admin"]);
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["sees correct dashboard - learner","sees correct dashboard - instructor","sees correct dashboard - admin"]), 'should generate one distinct name per value');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = parameterizedTestNames("x", []);
          window.__report('t2', result.length === 0, 'no values should give no test names'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "generates a distinct, correctly-labeled name per value" },
        { id: "t2", description: "handles an empty values array" },
      ],
      hints: [
        "Array.prototype.map is the natural tool for a one-to-one transformation like this.",
        "This is exactly why a real failure in the 'admin' case is reported as its own named failure, not folded into one ambiguous test.",
      ],
    },
    commonMistakes: [
      "Using beforeEach for setup that only a few specific tests actually need -- it runs unconditionally for every test in scope, paying its cost even for tests that don't use it; a fixture makes the dependency explicit and opt-in.",
      "Writing setup logic without matching teardown logic, or without using try/finally -- a fixture (or manual code) that doesn't guarantee cleanup on failure can leak resources across a long test run.",
      "Copy-pasting a test body three times with only one value changed, instead of parameterizing -- this triples the maintenance burden for any future change to the shared logic, and often lets the three copies quietly drift out of sync.",
    ],
    quiz: [
      {
        id: "pw-q9-1",
        prompt: "What does a fixture provide that a blanket beforeEach hook does not?",
        choices: [
          "Fixtures run slower than beforeEach hooks",
          "A test only pays a fixture's setup cost if it actually requests that fixture by name; beforeEach runs unconditionally for every test in its scope regardless of need",
          "beforeEach hooks cannot run any setup code at all",
          "There is no real difference between the two",
        ],
        correctIndex: 1,
        explanation:
          "Fixtures make a test's actual dependencies explicit and opt-in — only tests that name a given fixture as a parameter incur its setup/teardown cost, unlike beforeEach, which runs for every test in its scope whether or not that specific test needs it.",
      },
      {
        id: "pw-q9-2",
        prompt:
          "Why can a fixture be built on top of another fixture (like an authenticatedPage fixture built from the base page fixture), in a way hooks can't cleanly express?",
        choices: [
          "Fixtures cannot actually depend on other fixtures",
          "Fixture composition lets one fixture's setup/teardown wrap another's, layering dependencies explicitly, while beforeEach hooks are just a flat, unconditional sequence with no dependency structure",
          "hooks and fixtures are functionally identical in every way",
          "Only built-in fixtures like `page` can be composed",
        ],
        correctIndex: 1,
        explanation:
          "A fixture is a function that itself can request other fixtures — this layered dependency structure is exactly what lets a complex setup (like an already-authenticated page) be built cleanly from simpler pieces, something a flat sequence of beforeEach hooks has no natural way to express.",
      },
      {
        id: "pw-q9-3",
        prompt:
          "Why is parameterizing a test across several values preferable to copy-pasting the test body once per value?",
        choices: [
          "It isn't; copy-pasting is always clearer",
          "Parameterization keeps the shared logic in one place (avoiding drift between copies) while still reporting each case as its own distinctly-named, individually-failing test",
          "Parameterized tests always run faster than copy-pasted ones",
          "Copy-pasted tests cannot be run in CI",
        ],
        correctIndex: 1,
        explanation:
          "Parameterization gets both benefits at once: a single source of truth for the shared test logic (no risk of copies silently diverging), and distinct, individually-reportable results per value — a failure in one case is clearly labeled, not buried in one ambiguous, multi-case test.",
      },
    ],
    takeaway:
      "Fixtures are dependency injection for tests — opt-in, composable, and guaranteed to tear down even on failure — while beforeEach runs unconditionally for every test in scope; parameterization keeps shared test logic in one place while still reporting each input case as its own distinct, individually-failing test.",
    summary:
      "A fixture provides named setup/teardown a test explicitly requests as a parameter, composing cleanly (fixtures can depend on other fixtures) and guaranteeing teardown even on failure. beforeEach runs for every test in scope unconditionally. Parameterizing a test loop generates one distinct, individually-reportable test per input value instead of duplicating test bodies.",
    nextLessonSlug: "pw-page-objects-test-data",
  },
  {
    id: "pw-page-objects-test-data",
    slug: "pw-page-objects-test-data",
    title: "Page Objects, Alternatives, and Test-Data Design",
    description:
      "Encapsulating a page's locators and actions behind a class, the honest limits of that pattern, and designing test data that's independent between tests.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["pw-fixtures-and-hooks"],
    objectives: [
      "Design a page object that encapsulates locators and actions for one page or component",
      "Explain when a page object adds real value versus when it's unnecessary ceremony",
      "Design test data that guarantees isolation between parallel or repeated test runs",
    ],
    skills: ["playwright", "page-objects", "test-data"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Page Object Models", url: "https://playwright.dev/docs/pom" },
    ],
    keywords: ["page objects", "test data", "playwright"],
    explanation: `A **page object** is a class that encapsulates a page's (or a reusable component's) locators and the actions available on it, so a test reads in terms of user intent rather than raw locator calls: \`class LoginPage { constructor(page) { this.page = page; } async signIn(user, pass) { await this.page.getByLabel("Username").fill(user); await this.page.getByLabel("Password").fill(pass); await this.page.getByRole("button", { name: "Sign in" }).click(); } }\` — a test then calls \`await loginPage.signIn(user, pass)\`, reading as *what the test is doing*, not *how the page's DOM happens to be structured*. If the login form's markup changes later, the fix lives in exactly one place (the page object), not in every test that signs in.

The **honest limit** worth stating plainly: a page object is genuinely valuable specifically when a page or component's locators/actions are reused across **multiple tests** — the encapsulation pays for itself through that reuse. Wrapping a page object around a single locator used in exactly one test adds a layer of indirection with no real benefit, purely ceremony for its own sake. **Alternatives** exist for good reason: small, composable helper functions (\`async function fillAndSubmitLoginForm(page, user, pass) { ... }\`) achieve the same reuse without the class-based ceremony when a page object's full structure isn't warranted, and Playwright's fixture system (previous lesson) can itself provide a ready-to-use page object as a fixture, combining both patterns.

**Test-data design** for isolation means each test — especially when tests run in **parallel**, Playwright's default — must generate or use data that cannot collide with what another concurrently-running test is doing: a hard-coded email like \`"test@example.com"\` used by two parallel tests both trying to register a new account will race and one will fail with a "user already exists" error that has nothing to do with either test's actual subject. The fix is **generating unique data per test run** — combining the current timestamp with a random suffix to build an email like \`test-<timestamp>-<random>@example.com\`, or using a UUID — so every test's data is guaranteed distinct, regardless of how many tests run concurrently or how many times the suite has run before.`,
    example: {
      language: "javascript",
      description:
        "A minimal page-object pattern and unique-test-data generation, modeled without a real browser.",
      code: `class LoginPageModel {
  constructor(actions) { this.actions = actions; } // actions stands in for real Playwright locators
  signIn(username, password) {
    this.actions.push({ action: "fill", field: "username", value: username });
    this.actions.push({ action: "fill", field: "password", value: password });
    this.actions.push({ action: "click", target: "Sign in button" });
    return "signed in as " + username;
  }
}

const actions = [];
const loginPage = new LoginPageModel(actions);
console.log(loginPage.signIn("alice", "secret"));
console.log(actions.length); // 3 -- fill, fill, click, all recorded through ONE method call

function uniqueTestEmail(prefix) {
  return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "@example.com";
}
console.log(uniqueTestEmail("test") !== uniqueTestEmail("test")); // true -- two calls never collide`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call uniqueTestEmail 3 times in a loop and confirm all 3 results are distinct (use a Set to check).",
      code: `function uniqueTestEmail(prefix) {
  return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "@example.com";
}
console.log(uniqueTestEmail("a"));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Model a page object: write class SearchBarModel with a constructor(actions) storing the actions array, and a method search(query) that pushes {action:'fill', field:'search', value: query} then {action:'click', target:'Search button'} onto actions, and returns the string 'searched for ' + query.",
      starterCode: `class SearchBarModel {
  constructor(actions) {
    this.actions = actions;
  }
  search(query) {
    // TODO: push the two action objects described in the prompt, then return the result string
  }
}
`,
      solutionCode: `class SearchBarModel {
  constructor(actions) {
    this.actions = actions;
  }
  search(query) {
    this.actions.push({ action: "fill", field: "search", value: query });
    this.actions.push({ action: "click", target: "Search button" });
    return "searched for " + query;
  }
}`,
      harness: `
        try {
          const actions = [];
          const bar = new SearchBarModel(actions);
          const result = bar.search("playwright");
          window.__report('t1', result === "searched for playwright" && actions.length === 2, 'should record both actions and return the correct result string');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const actions = [];
          new SearchBarModel(actions).search("x");
          window.__report('t2', actions[0].field === "search" && actions[1].target === "Search button", 'the recorded actions should have the correct field/target values');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "search() records both actions and returns the correct summary" },
        { id: "t2", description: "the recorded actions have the correct field and target values" },
      ],
      hints: [
        "This models the exact page-object pattern: one method call encapsulates multiple underlying locator actions.",
        "A test using this page object would just call bar.search('playwright'), reading as intent, not raw steps.",
      ],
    },
    independentExercise: {
      id: "pw-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write generateUniqueEmails(prefix, count) returning an array of `count` email strings, each combining prefix with a distinct counter value (e.g. prefix + '-' + i + '@example.com' for i from 0 to count-1) -- ALL must be distinct from each other, modeling deterministic (not random-timing-dependent) unique test-data generation.",
      starterCode: `function generateUniqueEmails(prefix, count) {
  // TODO
  return [];
}
`,
      solutionCode: `function generateUniqueEmails(prefix, count) {
  const emails = [];
  for (let i = 0; i < count; i++) {
    emails.push(prefix + "-" + i + "@example.com");
  }
  return emails;
}`,
      harness: `
        try {
          const result = generateUniqueEmails("test", 3);
          window.__report('t1', new Set(result).size === 3, 'all generated emails should be distinct'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = generateUniqueEmails("test", 3);
          window.__report('t2', result[0] === "test-0@example.com" && result[2] === "test-2@example.com", 'emails should follow the prefix-counter pattern'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const result = generateUniqueEmails("x", 0);
          window.__report('t3', result.length === 0, 'a count of 0 should give an empty array'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "generates entirely distinct emails" },
        { id: "t2", description: "follows the correct prefix-counter naming pattern" },
        { id: "t3", description: "handles a count of 0" },
      ],
      hints: [
        "A simple counter loop guarantees distinctness deterministically, unlike relying purely on timing.",
        "This models the SAME goal as the timestamp+random approach in the explanation -- guaranteed-unique test data -- with a simpler, fully deterministic mechanism.",
      ],
    },
    commonMistakes: [
      "Wrapping a page object class around a locator used in exactly one test -- this adds indirection with no reuse benefit; a page object earns its complexity through genuine reuse across multiple tests.",
      "Hard-coding the same test data (like a fixed email) across multiple tests that might run in parallel -- concurrently-running tests both trying to use that identical, colliding data produce failures unrelated to what either test actually verifies.",
      "Letting a page object's methods leak raw Playwright locator objects back to the test -- a well-designed page object exposes actions and outcomes (signIn, search), not its internal locators, keeping the encapsulation genuine.",
    ],
    quiz: [
      {
        id: "pw-q10-1",
        prompt: "When does a page object genuinely pay for its added structure?",
        choices: [
          "Always, for every single locator in a test suite",
          "When its locators and actions are reused across multiple tests -- the encapsulation's value comes specifically from that reuse",
          "Only when a test suite has fewer than 10 tests",
          "Page objects never add real value and should be avoided entirely",
        ],
        correctIndex: 1,
        explanation:
          "A page object's whole benefit is having one place to update when a page's structure changes, which only matters if multiple tests actually depend on that page — wrapping one around a single-use locator adds a layer of indirection with nothing to show for it.",
      },
      {
        id: "pw-q10-2",
        prompt:
          'Why does a hard-coded test email like "test@example.com" cause problems specifically when tests run in parallel?',
        choices: [
          "It doesn't cause any problems",
          "Two concurrently-running tests both trying to use that identical data can collide (e.g. both trying to register the same account), causing a failure unrelated to what either test is actually meant to verify",
          "Parallel tests cannot use email addresses at all",
          "Playwright automatically renames colliding test data",
        ],
        correctIndex: 1,
        explanation:
          "Parallel execution means two tests can genuinely be running the exact same registration flow at the same moment — shared, non-unique test data creates a real race condition between unrelated tests, producing a confusing failure that has nothing to do with either test's actual subject.",
      },
      {
        id: "pw-q10-3",
        prompt:
          "What is a lightweight alternative to a full page-object class when reuse is needed but a class's structure isn't warranted?",
        choices: [
          "There is no alternative; page objects are the only reuse mechanism",
          "A small, composable helper function performing the same actions, optionally combined with Playwright's fixture system to provide it ready-made to tests",
          "Copy-pasting the locator calls into every test",
          "Using only CSS selectors instead of role-based locators",
        ],
        correctIndex: 1,
        explanation:
          "A plain helper function can achieve the same reuse and single-source-of-truth benefit as a page object without class-based ceremony, and can itself be exposed as a fixture — the two patterns (fixtures and page objects/helpers) are complementary, not competing.",
      },
    ],
    takeaway:
      "A page object earns its structure through genuine reuse across multiple tests, not by default for every locator; test data must be generated to guarantee uniqueness per test run, since Playwright's default parallel execution means colliding shared data causes failures unrelated to what either test actually verifies.",
    summary:
      "A page object encapsulates a page's locators and actions behind methods reading as user intent — valuable specifically when reused across multiple tests, with helper functions or fixtures as lighter alternatives. Test data must be generated uniquely per test (timestamp+random, a UUID, or a deterministic counter) to avoid collisions between parallel or repeated test runs.",
    nextLessonSlug: "pw-parallelism-retries-timeouts",
  },
  {
    id: "pw-parallelism-retries-timeouts",
    slug: "pw-parallelism-retries-timeouts",
    title: "Parallelism, Retries, and Timeouts",
    description:
      "How Playwright runs many tests at once safely, when a retry genuinely helps versus when it just hides a real bug, and the layered timeout settings that actually control a test's patience.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 10,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["pw-page-objects-test-data"],
    objectives: [
      "Explain what Playwright's worker-based parallelism model isolates and what it doesn't",
      "Distinguish a legitimate use of test retries from retries masking a real bug",
      "Identify which of Playwright's several timeout settings actually governs a given failure",
    ],
    skills: ["playwright", "parallelism", "retries", "timeouts"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Parallelism", url: "https://playwright.dev/docs/test-parallel" },
      { label: "Playwright docs: Timeouts", url: "https://playwright.dev/docs/test-timeouts" },
      { label: "Playwright docs: Retries", url: "https://playwright.dev/docs/test-retries" },
    ],
    keywords: ["parallelism", "retries", "timeouts", "playwright"],
    explanation: `Playwright runs tests in parallel using multiple **workers** — separate OS processes, each running test files one at a time within itself, with several workers running concurrently. This is what makes Playwright's context-per-test isolation (from this course's first lesson) load-bearing at scale: since each test gets a fresh context regardless of which worker or file it runs in, tests genuinely don't interfere with each other's browser state even when running simultaneously. What parallelism does **not** isolate on its own is anything **external** to the browser — a shared database, a shared file the test writes to, a fixed port a local server binds to — which is exactly why the test-data isolation from the previous lesson (unique data per test) remains necessary even with Playwright's own context isolation already in place.

**Retries** (\`retries: 2\` in config, or \`--retries=2\` on the command line) re-run a failed test up to the configured number of additional times before reporting it as truly failed. This is a genuine, useful tool for a specific, narrow purpose: absorbing rare, environmental flakiness (a CI runner under momentary load, a truly transient network blip) that isn't a bug in the application or the test. It is **not** a substitute for fixing a real, reproducible bug or a genuinely flaky test — a test that only passes 7 times out of 10 because of a real race condition in the application will often *still* fail intermittently even with retries, just less visibly and less often, which can let a real bug quietly ship while the suite reports green more often than it should. Retries should reduce noise from genuine environmental randomness, not paper over an actual defect.

Playwright layers **several distinct timeouts**, and diagnosing a timeout failure correctly means knowing which one actually applies: the **test timeout** (default 30s) bounds an entire test's total runtime; the **expect timeout** (default 5s) bounds how long a single web-first assertion polls before giving up; **action timeouts** bound how long a single action (like \`.click()\`) waits for actionability; and the **global timeout** bounds the entire test run. A test failing with "Timeout 5000ms exceeded" while the test itself has 20 more seconds of budget left is very likely an assertion timeout, not a test timeout — misreading which layer actually fired, and blindly increasing the wrong one (or all of them, "just in case"), is a common mistake that hides the real diagnostic signal a specific timeout's failure was actually giving you.`,
    example: {
      language: "javascript",
      description:
        "Modeling worker-based parallelism's isolation boundary, and the layered-timeout diagnostic reasoning, as data.",
      code: `function isIsolatedByPlaywrightContext(resourceType) {
  // Playwright's per-test context isolates browser-side state; it does NOT
  // isolate anything external to the browser on its own.
  const browserIsolated = ["cookies", "localStorage", "sessionStorage", "page-dom"];
  return browserIsolated.includes(resourceType);
}
console.log(isIsolatedByPlaywrightContext("cookies"));         // true
console.log(isIsolatedByPlaywrightContext("shared-database"));  // false -- needs its own isolation strategy (unique test data)

function diagnoseTimeout(errorMessage, testElapsedMs, testTimeoutMs) {
  if (errorMessage.includes("Timeout") && errorMessage.includes("exceeded") && testElapsedMs < testTimeoutMs) {
    return "likely an assertion or action timeout, not the overall test timeout";
  }
  if (testElapsedMs >= testTimeoutMs) {
    return "the overall test timeout was reached";
  }
  return "not a timeout-related failure";
}
console.log(diagnoseTimeout("Timeout 5000ms exceeded", 8000, 30000)); // assertion/action timeout, not test timeout`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call diagnoseTimeout with testElapsedMs equal to testTimeoutMs, and confirm it correctly reports the overall test timeout instead.",
      code: `function diagnoseTimeout(errorMessage, testElapsedMs, testTimeoutMs) {
  if (errorMessage.includes("Timeout") && testElapsedMs < testTimeoutMs) return "assertion/action timeout";
  if (testElapsedMs >= testTimeoutMs) return "overall test timeout";
  return "not timeout-related";
}
console.log(diagnoseTimeout("Timeout exceeded", 30000, 30000));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write needsIndependentIsolationStrategy(resourceType) modeling which resources Playwright's per-test context does NOT isolate on its own -- return true for 'shared-database', 'shared-file', or 'fixed-port'; false for 'cookies', 'localStorage', or 'page-dom' (which Playwright's context isolation already handles).",
      starterCode: `function needsIndependentIsolationStrategy(resourceType) {
  // TODO
}
`,
      solutionCode: `function needsIndependentIsolationStrategy(resourceType) {
  return ["shared-database", "shared-file", "fixed-port"].includes(resourceType);
}`,
      harness: `
        try { window.__report('t1', needsIndependentIsolationStrategy("shared-database") === true, 'a shared database needs its own isolation strategy'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', needsIndependentIsolationStrategy("cookies") === false, 'cookies are already isolated by Playwright context'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', needsIndependentIsolationStrategy("fixed-port") === true, 'a fixed port is external to the browser and needs its own strategy'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "identifies a shared database as needing independent isolation" },
        { id: "t2", description: "correctly recognizes cookies as already isolated" },
        { id: "t3", description: "identifies a fixed port as needing independent isolation" },
      ],
      hints: [
        "Playwright's context isolation only covers browser-side state -- anything external to the browser is a separate concern.",
        "This is exactly why unique test data (previous lesson) remains necessary even with context isolation already in place.",
      ],
    },
    independentExercise: {
      id: "pw-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write shouldRelyOnRetries(failureReason) returning true ONLY for 'transient-ci-load' or 'momentary-network-blip' (genuine environmental flakiness) -- false for 'race-condition-in-app', 'flaky-locator-matches-multiple', or any other reason (these are real bugs retries would only mask, not fix).",
      starterCode: `function shouldRelyOnRetries(failureReason) {
  // TODO
}
`,
      solutionCode: `function shouldRelyOnRetries(failureReason) {
  return ["transient-ci-load", "momentary-network-blip"].includes(failureReason);
}`,
      harness: `
        try { window.__report('t1', shouldRelyOnRetries("transient-ci-load") === true, 'genuine environmental flakiness is a legitimate use of retries'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldRelyOnRetries("race-condition-in-app") === false, 'a real application bug should not be masked by retries'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', shouldRelyOnRetries("flaky-locator-matches-multiple") === false, 'an ambiguous locator is a real test bug, not something retries should hide'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies genuine environmental flakiness" },
        { id: "t2", description: "correctly rejects masking a real application bug with retries" },
        {
          id: "t3",
          description: "correctly rejects masking a real test-authoring bug with retries",
        },
      ],
      hints: [
        "This models the honest, narrow purpose retries actually serve -- absorbing genuine environmental noise, never fixing a real, reproducible defect.",
        "A test failing for the SAME underlying reason repeatedly, just intermittently, is a strong signal retries are hiding something real.",
      ],
    },
    commonMistakes: [
      "Assuming Playwright's per-test context isolation covers everything a test touches -- it only isolates browser-side state (cookies, storage, DOM); a shared database, file, or port needs its own, separate isolation strategy.",
      "Adding retries to make a genuinely flaky (buggy) test 'pass reliably' instead of diagnosing and fixing the real race condition or ambiguous locator causing it -- this hides the bug rather than fixing it, and it can still fail intermittently, just less visibly.",
      "Increasing every timeout setting 'just in case' when one specific timeout (often the 5-second expect timeout) is actually the one firing -- this treats the symptom without understanding which layer's failure was the real diagnostic signal.",
    ],
    quiz: [
      {
        id: "pw-q11-1",
        prompt:
          "Does Playwright's per-test context isolation protect against two parallel tests colliding on a SHARED DATABASE row?",
        choices: [
          "Yes, context isolation covers all state a test touches",
          "No -- context isolation only covers browser-side state (cookies, storage, DOM); external resources like a shared database need their own, separate isolation strategy (like unique test data)",
          "Only if the tests run in the same worker",
          "Databases are automatically isolated per Playwright worker",
        ],
        correctIndex: 1,
        explanation:
          "Playwright's context-per-test isolation is specifically a browser-state guarantee. Anything external to the browser — a database, a shared file, a fixed port — is entirely outside that guarantee's scope and needs a deliberate isolation strategy of its own, like the unique test-data generation from the previous lesson.",
      },
      {
        id: "pw-q11-2",
        prompt: "What is the legitimate purpose of test retries?",
        choices: [
          "To make any failing test eventually report as passing",
          "To absorb rare, genuine environmental flakiness (a momentary CI load spike, a transient network blip) that isn't a real bug in the application or the test",
          "To replace the need for fixing real, reproducible bugs",
          "Retries have no legitimate use and should never be configured",
        ],
        correctIndex: 1,
        explanation:
          "Retries exist for a narrow, honest purpose: genuine environmental noise outside the application's or test's control. Using them to paper over a real, reproducible bug just makes that bug less visible and less frequent in reports, not actually fixed.",
      },
      {
        id: "pw-q11-3",
        prompt:
          "A test fails with 'Timeout 5000ms exceeded' after only 8 seconds of a 30-second test timeout budget. What does this most likely indicate?",
        choices: [
          "The overall test timeout (30s) was reached",
          "A different, more specific timeout fired -- most likely the 5-second expect (assertion) timeout, not the overall test timeout",
          "This error is impossible and indicates a Playwright bug",
          "The global timeout for the entire run was exceeded",
        ],
        correctIndex: 1,
        explanation:
          "Playwright layers several distinct timeouts, and the 5000ms figure matching the default expect timeout, well before the 30-second test timeout budget is exhausted, is a strong signal that a specific web-first assertion's polling — not the overall test — is what actually timed out.",
      },
    ],
    takeaway:
      "Playwright's context-per-test isolation only covers browser-side state, not external resources like a shared database — those still need unique test data; retries exist to absorb genuine environmental flakiness, not to mask a real bug; and diagnosing a timeout correctly means identifying which of several layered timeout settings actually fired.",
    summary:
      "Workers run tests in parallel with context-per-test browser isolation, but external resources (databases, files, ports) need their own isolation strategy. Retries should absorb genuine environmental flakiness only, never mask a real, reproducible bug. Playwright has distinct test, expect, action, and global timeouts — diagnosing a failure means identifying which one actually fired.",
    nextLessonSlug: "pw-trace-debugging",
  },
  {
    id: "pw-trace-debugging",
    slug: "pw-trace-debugging",
    title: "Trace Viewer, Screenshots, Video, and Debugging",
    description:
      "The diagnostic artifacts Playwright can capture around a failure, and Playwright Inspector's step-through debugging — reconstructing exactly what happened without re-running blind.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["pw-parallelism-retries-timeouts"],
    objectives: [
      "Explain what a Playwright trace captures that a screenshot alone does not",
      "Choose the correct artifact-capture setting (screenshot, video, trace) for a given diagnostic need",
      "Use Playwright Inspector's step-through mode to diagnose a failing test locally",
    ],
    skills: ["playwright", "trace-viewer", "debugging"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Trace viewer", url: "https://playwright.dev/docs/trace-viewer" },
      { label: "Playwright docs: Debugging tests", url: "https://playwright.dev/docs/debug" },
    ],
    keywords: ["trace viewer", "screenshots", "video", "debugging", "playwright"],
    explanation: `A **screenshot** captures one still frame — the page's appearance at one instant, either on failure (\`screenshot: "only-on-failure"\`) or at every step. A **video** captures continuous playback of the whole test. A **trace** (\`trace: "on-first-retry"\` or \`"retain-on-failure"\`) captures something categorically richer than either: a full, replayable timeline of the test — every action, every network request/response, DOM snapshots at each step, and console output — viewable afterward in **Trace Viewer**, a tool that lets you scrub through the test's exact execution step by step, inspecting the real DOM state and real network activity at any point, long after the run finished. A trace answers "what actually happened, in what order, with what data" in a way a single still image or a video (which shows appearance but not the underlying DOM/network state) cannot.

The practical **capture-setting decision**: screenshots are cheap and always worth keeping on failure at minimum; video adds real value for genuinely visual, timing-sensitive issues (an animation, a layout shift) where seeing continuous motion matters; trace is the most expensive to store but by far the most diagnostically complete, which is why the common, sensible default is \`trace: "on-first-retry"\` — capture a trace only when a test has already failed once and is being retried, so the (relatively expensive) trace exists specifically for the runs that actually need deep diagnosis, not for every single passing test.

**Playwright Inspector** (\`npx playwright test --debug\`, or \`await page.pause()\` inside a test) opens a real, interactive browser window alongside a step-through control panel: you can step through actions one at a time, inspect the live page, and even generate a locator by clicking an element directly in the paused browser. This is fundamentally different from "add a bunch of \`console.log\` calls and re-run repeatedly" — Inspector lets you pause at the *exact* moment something is wrong and interact with the *real, live* page state at that instant, rather than reconstructing what must have happened from scattered log output after the fact.`,
    example: {
      language: "javascript",
      description:
        "Modeling the capture-setting decision (screenshot vs video vs trace) and Trace Viewer's step-by-step replay concept as data.",
      code: `function recommendCaptureSetting(diagnosticNeed) {
  const recommendations = {
    "quick-visual-check": "screenshot",
    "animation-or-layout-shift": "video",
    "full-reconstruction-of-what-happened": "trace",
  };
  return recommendations[diagnosticNeed] ?? "screenshot"; // screenshot is the safe, cheap default
}
console.log(recommendCaptureSetting("full-reconstruction-of-what-happened")); // "trace"

// A simplified model of Trace Viewer's step-through concept: a recorded list of steps
// you can move through independently, inspecting state at any point.
class FakeTrace {
  constructor(steps) { this.steps = steps; this.index = 0; }
  stepForward() { if (this.index < this.steps.length - 1) this.index++; return this.steps[this.index]; }
  stepBackward() { if (this.index > 0) this.index--; return this.steps[this.index]; }
  current() { return this.steps[this.index]; }
}
const trace = new FakeTrace(["goto /login", "fill username", "click Sign in", "assertion failed"]);
trace.stepForward(); trace.stepForward();
console.log(trace.current()); // "click Sign in" -- you can inspect state at THIS exact step, not just the final failure`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Step the trace forward one more time to reach 'assertion failed', then step backward twice and confirm you land back on 'fill username'.",
      code: `class FakeTrace {
  constructor(steps) { this.steps = steps; this.index = 0; }
  stepForward() { if (this.index < this.steps.length - 1) this.index++; return this.steps[this.index]; }
  stepBackward() { if (this.index > 0) this.index--; return this.steps[this.index]; }
  current() { return this.steps[this.index]; }
}
const trace = new FakeTrace(["goto", "fill", "click", "assert-failed"]);
console.log(trace.current());`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write recommendCaptureSetting(diagnosticNeed) mapping 'quick-visual-check' -> 'screenshot', 'animation-or-layout-shift' -> 'video', 'full-reconstruction-of-what-happened' -> 'trace'. Default to 'screenshot' for anything unrecognized.",
      starterCode: `function recommendCaptureSetting(diagnosticNeed) {
  // TODO
}
`,
      solutionCode: `function recommendCaptureSetting(diagnosticNeed) {
  const recommendations = {
    "quick-visual-check": "screenshot",
    "animation-or-layout-shift": "video",
    "full-reconstruction-of-what-happened": "trace",
  };
  return recommendations[diagnosticNeed] ?? "screenshot";
}`,
      harness: `
        try { window.__report('t1', recommendCaptureSetting("full-reconstruction-of-what-happened") === "trace", 'a full reconstruction need should recommend trace'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', recommendCaptureSetting("animation-or-layout-shift") === "video", 'a visual timing issue should recommend video'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', recommendCaptureSetting("bogus") === "screenshot", 'an unrecognized need should default to the cheap, safe screenshot option'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "recommends trace for full reconstruction needs" },
        { id: "t2", description: "recommends video for animation/timing issues" },
        { id: "t3", description: "defaults to screenshot for an unrecognized need" },
      ],
      hints: [
        "A lookup object with a nullish-coalescing default cleanly handles both known and unknown cases.",
        "Screenshot is deliberately the safe default here -- it's the cheapest artifact, always reasonable to keep at minimum.",
      ],
    },
    independentExercise: {
      id: "pw-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write findStepBeforeFailure(steps, failureStepName) that returns the step immediately BEFORE the named failure step in the steps array (or null if the failure step is first, or not found at all) -- modeling exactly the Trace Viewer workflow of stepping backward from a failure to see what state led to it.",
      starterCode: `function findStepBeforeFailure(steps, failureStepName) {
  // TODO
  return null;
}
`,
      solutionCode: `function findStepBeforeFailure(steps, failureStepName) {
  const index = steps.indexOf(failureStepName);
  if (index <= 0) return null;
  return steps[index - 1];
}`,
      harness: `
        try { window.__report('t1', findStepBeforeFailure(["goto","fill","click","assert-failed"], "assert-failed") === "click", 'should find the step immediately before the failure'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', findStepBeforeFailure(["assert-failed","fill"], "assert-failed") === null, 'a failure as the first step has no preceding step'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', findStepBeforeFailure(["goto","fill"], "not-found") === null, 'a failure step not present at all should return null'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds the step immediately preceding the named failure" },
        { id: "t2", description: "returns null when the failure is the first step" },
        { id: "t3", description: "returns null when the failure step isn't found at all" },
      ],
      hints: [
        "Array.prototype.indexOf returns -1 for 'not found', which combined with index <= 0 correctly covers both edge cases in one check.",
        "This models exactly why Trace Viewer's step-backward capability is diagnostically valuable -- seeing the state right before things went wrong.",
      ],
    },
    commonMistakes: [
      "Enabling full trace capture on every single test run, including passing ones -- traces are the most storage-expensive artifact; 'on-first-retry' captures them specifically for runs that actually need deep diagnosis.",
      "Relying only on a single failure screenshot when the actual question is 'what led up to this,' not just 'what did it look like at the end' -- a screenshot alone can't show the sequence of actions or network activity that produced that final state; a trace can.",
      "Debugging purely by adding console.log statements and re-running repeatedly, instead of using Playwright Inspector to pause at the exact failure point and interact with the real, live page state directly.",
    ],
    quiz: [
      {
        id: "pw-q12-1",
        prompt: "What does a Playwright trace capture that a single failure screenshot does not?",
        choices: [
          "Nothing additional; they're equivalent",
          "A full, replayable timeline: every action, network request/response, DOM snapshots at each step, and console output, viewable step-by-step afterward",
          "Only audio from the page",
          "A trace is just a higher-resolution screenshot",
        ],
        correctIndex: 1,
        explanation:
          "A trace is categorically richer than a still image — it's a complete, replayable record of the test's execution that Trace Viewer lets you scrub through step by step, inspecting real DOM and network state at any point, not just the final moment of failure.",
      },
      {
        id: "pw-q12-2",
        prompt:
          'Why is `trace: "on-first-retry"` a sensible common default, rather than capturing a trace on every test run?',
        choices: [
          "Traces provide no diagnostic value, so it doesn't matter either way",
          "Traces are relatively expensive to store; capturing them specifically when a test has already failed once and is being retried targets that cost at the runs that actually need deep diagnosis",
          "Playwright does not support capturing traces on every run",
          "on-first-retry captures LESS information than always capturing",
        ],
        correctIndex: 1,
        explanation:
          "This setting is a deliberate cost/value tradeoff: since most test runs pass and never need deep diagnosis, capturing the expensive, complete trace only for retried (likely-failing) runs gets the diagnostic value where it's actually needed without paying the storage cost everywhere.",
      },
      {
        id: "pw-q12-3",
        prompt:
          "How does debugging with Playwright Inspector (--debug or page.pause()) fundamentally differ from adding console.log statements and re-running?",
        choices: [
          "There is no real difference between the two approaches",
          "Inspector pauses at the exact failure point and lets you interact with the real, live page state directly, rather than reconstructing what happened from scattered log output after the fact",
          "console.log is always more reliable than Inspector",
          "Inspector can only be used in CI, never locally",
        ],
        correctIndex: 1,
        explanation:
          "Inspector gives you a genuinely live, paused browser at the moment of interest, letting you inspect real state directly and step forward/backward through actions — a fundamentally more direct diagnostic tool than piecing together behavior from log lines printed during an already-finished, non-interactive run.",
      },
    ],
    takeaway:
      "A trace is a complete, replayable execution record — richer than a screenshot or video — and capturing it selectively (on-first-retry) targets its real cost at the runs that need deep diagnosis; Playwright Inspector lets you pause and interact with the real, live page at the moment of failure, a fundamentally more direct tool than scattered logging.",
    summary:
      "Screenshots capture one moment; video captures continuous playback; a trace captures a full, replayable timeline (actions, network, DOM snapshots, console) viewable in Trace Viewer. trace: 'on-first-retry' targets this expensive artifact at runs that need it. Playwright Inspector (--debug, page.pause()) enables live, step-through debugging against the real page.",
    nextLessonSlug: "pw-reporting-ci",
  },
  {
    id: "pw-reporting-ci",
    slug: "pw-reporting-ci",
    title: "Reporting, CI Execution, and Environment Configuration",
    description:
      "Turning a test run's results into something a team can actually act on, and the specific settings that make a suite behave correctly and safely in CI rather than just on a laptop.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 12,
    difficulty: "advanced",
    estimatedMinutes: 21,
    prerequisites: ["pw-trace-debugging"],
    objectives: [
      "Configure Playwright's HTML reporter and explain what it adds over raw console output",
      "Identify CI-specific configuration a local-only setup doesn't need",
      "Design environment-variable-based configuration that keeps secrets out of committed files",
    ],
    skills: ["playwright", "reporting", "ci"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright docs: Reporters", url: "https://playwright.dev/docs/test-reporters" },
      { label: "Playwright docs: Continuous Integration", url: "https://playwright.dev/docs/ci" },
    ],
    keywords: ["reporting", "ci", "environment configuration", "playwright"],
    explanation: `Playwright's **HTML reporter** (\`reporter: "html"\`) produces a browsable report linking every test to its captured screenshots, videos, and traces directly — genuinely more useful than raw console output for anyone besides the person who happened to be watching the terminal when the run finished, since it survives the run and can be shared, reviewed later, or attached as a CI artifact. Other reporters (\`"list"\`, \`"dot"\`, \`"json"\`, \`"junit"\`) suit different needs: \`"junit"\` produces XML output many CI platforms and dashboards can natively parse and display, independent of Playwright's own HTML report; \`"json"\` is the right choice when a separate tool needs to programmatically process results. Configuring **multiple reporters at once** (\`reporter: [["html"], ["junit", { outputFile: "results.xml" }]]\`) is common and reasonable — a human-browsable report and a machine-parseable one serve genuinely different audiences from the same run.

**CI-specific configuration** exists because a CI runner's environment differs from a developer's laptop in ways that matter: \`process.env.CI\` is the conventional signal most CI platforms set automatically, letting \`playwright.config.ts\` branch its own behavior — \`retries: process.env.CI ? 2 : 0\` (retry more readily in CI, where transient infrastructure noise is more common, but fail immediately and loudly on a local run, where the developer wants to see the real failure right away) and \`workers: process.env.CI ? 4 : undefined\` (explicitly bound parallelism to a CI runner's actual, often more limited, resources, rather than Playwright's local default of using most available cores) are two of the most common, load-bearing examples of this branch.

**Environment-variable-based configuration** (\`baseURL: process.env.BASE_URL\`, \`use: { httpCredentials: { username: process.env.HTTP_USER, password: process.env.HTTP_PASS } }\`) is what keeps secrets and environment-specific values out of committed config files entirely — the committed \`playwright.config.ts\` references the *names* of environment variables, never their actual values, and a \`.env.example\` file (committed, containing only variable names with placeholder or empty values) documents what a real \`.env\` (never committed, listed in \`.gitignore\`) needs to provide. This is the same discipline this platform's own \`.env.example\`/\`.env\` split follows, and getting it right is what prevents a real credential from ever ending up in version-controlled history.`,
    example: {
      language: "javascript",
      description:
        "Modeling CI-vs-local config branching and the env-var-name-not-value discipline, as data.",
      code: `function buildConfig(isCi) {
  return {
    retries: isCi ? 2 : 0,          // retry more readily in CI's noisier environment
    workers: isCi ? 4 : undefined,  // explicitly bound to the CI runner's known resources
    reporter: isCi ? [["html"], ["junit", { outputFile: "results.xml" }]] : [["list"]],
  };
}
console.log(buildConfig(true));  // CI config: retries, bounded workers, dual reporters
console.log(buildConfig(false)); // local config: no retries, default workers, simple list reporter

function referencesSecretSafely(configValue) {
  // A safe config value NAMES an env var; it never contains a literal-looking secret itself.
  return typeof configValue === "string" && configValue.startsWith("process.env.");
}
console.log(referencesSecretSafely("process.env.HTTP_PASS")); // true -- safe: a reference, not a value
console.log(referencesSecretSafely("sk-abc123real"));           // false -- a literal secret should never appear here`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call buildConfig(true) and confirm the reporter array includes both 'html' and 'junit' entries.",
      code: `function buildConfig(isCi) {
  return { reporter: isCi ? [["html"], ["junit", { outputFile: "results.xml" }]] : [["list"]] };
}
console.log(buildConfig(true));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write ciAwareRetries(isCi) returning 2 if isCi is true, otherwise 0. Then write ciAwareWorkers(isCi) returning 4 if isCi is true, otherwise null (modeling Playwright's local default of 'use most available cores', represented here as null meaning 'no explicit limit').",
      starterCode: `function ciAwareRetries(isCi) {
  // TODO
}
function ciAwareWorkers(isCi) {
  // TODO
}
`,
      solutionCode: `function ciAwareRetries(isCi) {
  return isCi ? 2 : 0;
}
function ciAwareWorkers(isCi) {
  return isCi ? 4 : null;
}`,
      harness: `
        try { window.__report('t1', ciAwareRetries(true) === 2, 'CI should retry twice'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', ciAwareRetries(false) === 0, 'local runs should not retry, so real failures are seen immediately'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', ciAwareWorkers(true) === 4, 'CI should bound workers to a known, explicit count'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', ciAwareWorkers(false) === null, 'local runs should use no explicit worker limit'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "CI retries twice" },
        { id: "t2", description: "local runs do not retry" },
        { id: "t3", description: "CI bounds workers explicitly" },
        { id: "t4", description: "local runs use no explicit worker bound" },
      ],
      hints: [
        "This directly encodes the CI-vs-local branching from this lesson's explanation.",
        "Zero retries locally is deliberate: a developer wants to see a real failure immediately, not after silent retries.",
      ],
    },
    independentExercise: {
      id: "pw-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write auditConfigForSecrets(configValues) where configValues is an array of strings. Return an array of every value that looks like a LITERAL secret rather than an env-var reference -- a value is safe if it starts with 'process.env.'; otherwise, if it's a non-empty string, flag it as suspicious.",
      starterCode: `function auditConfigForSecrets(configValues) {
  // TODO: return the values that do NOT start with "process.env." (and are non-empty)
  return [];
}
`,
      solutionCode: `function auditConfigForSecrets(configValues) {
  return configValues.filter((v) => v && !v.startsWith("process.env."));
}`,
      harness: `
        try {
          const result = auditConfigForSecrets(["process.env.HTTP_PASS", "sk-abc123", "process.env.BASE_URL", ""]);
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["sk-abc123"]), 'should flag exactly the literal-looking value, not env references or empty strings');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = auditConfigForSecrets(["process.env.A", "process.env.B"]);
          window.__report('t2', result.length === 0, 'a fully env-reference-based config should flag nothing'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description:
            "correctly flags a literal-looking value while ignoring env references and empty strings",
        },
        { id: "t2", description: "flags nothing when every value is a safe env-var reference" },
      ],
      hints: [
        "Array.prototype.filter with a condition checking startsWith('process.env.') does the core work.",
        "This models exactly the audit discipline this lesson describes: committed config should only ever NAME environment variables, never contain real values.",
      ],
    },
    guidedLocalLab: {
      id: "pw-gll-diagnostics-ci-artifacts",
      title: "Diagnose Failures Using Traces, Reports, Screenshots, and CI Artifacts",
      scenario:
        "Configure full diagnostic artifact capture on your Playwright project, deliberately break a test to generate real failure artifacts, and wire up a CI-ready configuration — the capstone of this course's debugging and operational work.",
      requiredTools: [
        { name: "Node.js", version: "20.x or 22.x LTS" },
        { name: "@playwright/test", version: "1.62.x" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        "Continue from the pw-learning-lab project used in this course's earlier guided local labs.",
        "Add a deliberately failing test file to generate real diagnostic artifacts to inspect.",
      ],
      projectStructure: `pw-learning-lab/
  playwright.config.ts
  tests/
    homepage.spec.ts
    intentional-failure.spec.ts
  .env.example`,
      starterFiles: [
        {
          path: "tests/intentional-failure.spec.ts",
          content: `import { test, expect } from "@playwright/test";

test("a deliberately wrong assertion, to generate real failure artifacts", async ({ page }) => {
  await page.goto("https://playwright.dev");
  // TODO: assert something that is DELIBERATELY FALSE (e.g. a heading with text that
  // does not actually exist on the page) -- this is intentional, to produce real
  // screenshot/trace/video artifacts you'll inspect in the verification steps below.
});
`,
        },
        {
          path: ".env.example",
          content: `# TODO: list the environment variable NAMES this project would need in a real CI setup
# (e.g. BASE_URL=), with no real values -- this file is committed; a real .env is not.
`,
        },
      ],
      requirements: [
        "playwright.config.ts sets trace: 'on-first-retry', screenshot: 'only-on-failure', and video: 'retain-on-failure'.",
        "playwright.config.ts branches retries and workers based on process.env.CI.",
        "playwright.config.ts configures both the html reporter and the junit reporter.",
        "intentional-failure.spec.ts contains a genuinely failing assertion that produces a real trace, screenshot, and video.",
        ".env.example documents required environment variable names with no real values, and a real .env is excluded via .gitignore.",
      ],
      commands: [
        {
          description:
            "Run the suite once locally (the intentional failure will retry and produce artifacts)",
          command: "npx playwright test",
        },
        { description: "Open the generated HTML report", command: "npx playwright show-report" },
        {
          description: "Open a captured trace file directly",
          command: "npx playwright show-trace test-results/*/trace.zip",
        },
      ],
      expectedBehavior:
        "The intentional failure test fails, retries once (producing a trace on that retry), and the HTML report shows the failure linked to a real screenshot, video, and trace you can open and step through — confirming you can go from 'a test failed' to 'here is exactly what happened' using only the generated artifacts.",
      verificationSteps: [
        {
          command: "npx playwright test",
          expectedResult:
            "intentional-failure.spec.ts fails (as designed); homepage.spec.ts still passes",
        },
        {
          command: "npx playwright show-report",
          expectedResult:
            "Opens a browsable HTML report; the failing test links to a screenshot, a video, and a trace",
        },
        {
          command: "npx playwright show-trace <path-to-trace.zip>",
          expectedResult:
            "Opens Trace Viewer, showing the step-by-step timeline, network activity, and DOM snapshots leading to the failure",
        },
      ],
      troubleshooting: [
        {
          issue: "No trace file was generated",
          fix: "Confirm trace is set to 'on-first-retry' (or 'on') in playwright.config.ts, and that retries is greater than 0 for this to trigger on the first retry specifically.",
        },
        {
          issue: "The HTML report doesn't open automatically",
          fix: "Run `npx playwright show-report` explicitly — it serves the report from the test-results output folder.",
        },
        {
          issue: "A real secret ends up in a committed file",
          fix: "Move it to a local, uncommitted .env file immediately, confirm .env is listed in .gitignore, and replace the committed reference with process.env.YOUR_VAR_NAME.",
        },
      ],
      hints: [
        "trace: 'on-first-retry' needs retries > 0 to ever actually trigger -- with 0 retries configured, a first failure IS the only attempt, so no retry-triggered trace would be captured.",
        "The junit reporter's outputFile option controls where its XML output is written, typically consumed by a CI platform's test-results dashboard.",
        "Never put a real password or API key in .env.example -- it exists purely to document variable NAMES for whoever sets up a real .env.",
      ],
      referenceSolution: {
        summary:
          "playwright.config.ts captures traces on first retry, screenshots on failure, and video on failure, with CI-aware retries/workers and dual html+junit reporters. intentional-failure.spec.ts fails deliberately, producing real artifacts inspectable via show-report and show-trace. .env.example documents variable names only.",
        files: [
          {
            path: "playwright.config.ts",
            content: `import { defineConfig, devices } from "@playwright/test";

const isCi = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  retries: isCi ? 2 : 0,
  workers: isCi ? 4 : undefined,
  reporter: [["html"], ["junit", { outputFile: "results.xml" }]],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: process.env.BASE_URL,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
`,
          },
          {
            path: "tests/intentional-failure.spec.ts",
            content: `import { test, expect } from "@playwright/test";

test("a deliberately wrong assertion, to generate real failure artifacts", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(page.getByRole("heading", { name: "This Text Does Not Exist On The Page" })).toBeVisible();
});
`,
          },
          {
            path: ".env.example",
            content: `BASE_URL=
TEST_USER=
TEST_PASS=
`,
          },
        ],
      },
      extensionChallenge:
        "Delete the intentional-failure.spec.ts file (its job is done), and instead configure retries: 1 with trace: 'on-first-retry' on the REAL homepage.spec.ts, verifying that a genuinely passing test produces no unnecessary trace overhead, confirming the setting correctly targets only actual failures.",
    },
    commonMistakes: [
      "Setting trace to 'on-first-retry' but leaving retries at 0 -- with no retry ever happening, that specific trigger condition never fires, and no trace is captured despite the setting being present.",
      "Relying only on raw terminal output in CI instead of configuring the html reporter (or an equivalent) as an uploaded CI artifact -- terminal output disappears once the CI job's log is no longer easily accessible; a saved report survives and can be reviewed later.",
      "Committing a .env file (rather than only .env.example) or hard-coding a real value directly into playwright.config.ts -- both leak the actual secret into version-controlled history, which .gitignore-ing the real file and referencing only process.env.VAR_NAME in committed config prevents.",
    ],
    quiz: [
      {
        id: "pw-q13-1",
        prompt: "Why configure both an html reporter AND a junit reporter for the same test run?",
        choices: [
          "Only one reporter can ever be configured at a time, so this is invalid",
          "They serve different audiences from the same run: html gives a human-browsable report with linked artifacts; junit produces XML many CI platforms and dashboards can natively parse and display",
          "junit is deprecated and should never be used",
          "html and junit produce identical output in different file formats",
        ],
        correctIndex: 1,
        explanation:
          "Playwright supports multiple reporters simultaneously, and using more than one to serve genuinely different consumers — a human reviewing results directly, and a CI platform's dashboard parsing structured XML — is a common, reasonable configuration, not a conflict.",
      },
      {
        id: "pw-q13-2",
        prompt: "Why does `retries: process.env.CI ? 2 : 0` make sense as a common pattern?",
        choices: [
          "Retries should always be identical locally and in CI",
          "CI environments are more prone to genuine transient infrastructure noise, worth absorbing with retries; locally, a developer wants to see a real failure immediately, not after silent retries",
          "process.env.CI is never actually set by real CI platforms",
          "This pattern has no practical benefit",
        ],
        correctIndex: 1,
        explanation:
          "This branch reflects a genuine difference in what's useful where: CI's shared, more variable infrastructure benefits from absorbing rare transient noise via retries, while a developer actively debugging locally benefits from seeing a failure immediately and clearly, without a retry delaying or obscuring it.",
      },
      {
        id: "pw-q13-3",
        prompt:
          "What should a committed playwright.config.ts contain when referencing a secret like an HTTP password?",
        choices: [
          "The real password value directly, for convenience",
          "A reference to an environment variable name (process.env.HTTP_PASS), never the actual value itself",
          "A comment explaining where to find the password",
          "Secrets should never be referenced in config at all, under any circumstances",
        ],
        correctIndex: 1,
        explanation:
          "The committed file should only ever name which environment variable supplies a secret at runtime — the actual value lives in an uncommitted, gitignored .env file (or a CI platform's own secret store), never in version-controlled history.",
      },
    ],
    takeaway:
      "A saved, shareable report (html plus a CI-parseable format like junit) survives past the moment a run finishes; CI-aware config branches (retries, workers) target genuine differences between environments; and committed configuration should only ever name environment variables, never contain the real secret values themselves.",
    summary:
      "The html reporter produces a browsable report linking every test to its artifacts; junit/json serve CI dashboards and tooling. process.env.CI lets config branch retries/workers appropriately per environment. Environment-variable-referenced configuration (never literal secrets) plus a committed .env.example keeps real credentials out of version control.",
    nextLessonSlug: "pw-flaky-tests-a11y-security-architecture",
  },
  {
    id: "pw-flaky-tests-a11y-security-architecture",
    slug: "pw-flaky-tests-a11y-security-architecture",
    title: "Flaky-Test Diagnosis, Accessibility-Aware Testing, and Maintainable Architecture",
    description:
      "Bringing this course's tools together: a real diagnostic process for flakiness, accessibility as a natural side effect of Playwright's own locator philosophy, and the structural choices that keep a growing suite maintainable.",
    trackSlug: "playwright",
    courseSlug: "playwright-web-automation",
    order: 13,
    difficulty: "advanced",
    estimatedMinutes: 23,
    prerequisites: ["pw-reporting-ci"],
    objectives: [
      "Apply a systematic process for diagnosing a specific flaky test, rather than guessing",
      "Explain why role-based locators and axe-core-driven accessibility checks are naturally complementary in Playwright",
      "Identify the structural choices (folder layout, shared config, avoiding test interdependence) that keep a growing suite maintainable",
    ],
    skills: ["playwright", "flaky-tests", "accessibility", "architecture"],
    tech: [{ name: "Playwright", version: "1.62.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Playwright docs: Accessibility testing",
        url: "https://playwright.dev/docs/accessibility-testing",
      },
      {
        label: "Playwright docs: Best Practices",
        url: "https://playwright.dev/docs/best-practices",
      },
    ],
    keywords: ["flaky tests", "accessibility", "test architecture", "playwright"],
    explanation: `**Diagnosing a specific flaky test** systematically, rather than guessing, means gathering real evidence in order: first, reproduce it — run the specific test repeatedly, ideally with \`--repeat-each\` locally, to confirm it's genuinely intermittent and not a one-off environmental fluke; second, capture a trace on the failing runs and read it — does the failure happen at a consistent step, or a different one each time (a consistent step points to a specific race condition; a varying step suggests broader timing sensitivity or test-data collision); third, check for the well-known usual suspects covered throughout this course — an ambiguous locator matching more than one element depending on timing, unawaited async work, colliding test data between parallel runs, or a genuine race condition in the application itself. Reaching for "just add a retry" or "just add a wait" *before* this diagnostic process, rather than after it's actually pointed at a specific cause, is treating the symptom without knowing what's actually wrong.

**Accessibility-aware testing** in Playwright isn't a separate, bolted-on feature — it emerges naturally from the locator philosophy this course opened with: a suite built on \`getByRole\`/\`getByLabel\` locators already exercises the accessibility tree on every single run, since those locators only find elements that expose a real, discoverable role and accessible name in the first place. \`@axe-core/playwright\` (used by this platform's own \`tests/e2e/accessibility.spec.ts\` suite) adds a complementary, distinct layer: an automated scan for a broader set of WCAG violations (color contrast, missing landmarks, invalid ARIA usage) that role-based locators alone don't check for — \`await new AxeBuilder({ page }).analyze()\` — the two approaches genuinely reinforce each other rather than duplicating effort.

**Maintainable test architecture**, drawing together every tool this course has covered: a clear folder structure separating page objects/helpers from test files; **shared, centralized configuration** (one \`playwright.config.ts\`, not scattered per-file settings) so a change applies consistently everywhere; and critically, **no test depending on another test's side effects or execution order** — each test must be independently runnable, in any order, in isolation, which is precisely what this course's context-per-test isolation, unique test-data generation, and API-based setup were all building toward from the very first lesson. A suite where tests secretly depend on running in a specific sequence isn't really taking advantage of Playwright's actual isolation guarantees — it's fighting against them, and it will eventually fail in confusing, hard-to-reproduce ways the moment execution order changes for any reason (parallelism, test filtering, retries).`,
    example: {
      language: "javascript",
      description:
        "Modeling the systematic flaky-test diagnostic process as a decision function, and the role-locator/axe-scan complementary relationship.",
      code: `function diagnoseFlaky(observations) {
  // observations: { reproduced, failureStepConsistent, ambiguousLocator, uncontrolledTestData }
  if (!observations.reproduced) return "not confirmed flaky yet -- reproduce first";
  if (observations.ambiguousLocator) return "likely cause: ambiguous locator matching multiple elements";
  if (observations.uncontrolledTestData) return "likely cause: colliding test data between parallel runs";
  if (observations.failureStepConsistent) return "likely cause: a specific race condition at a consistent step";
  return "inconsistent failure step -- broader timing sensitivity, needs deeper trace analysis";
}

console.log(diagnoseFlaky({ reproduced: true, failureStepConsistent: true, ambiguousLocator: true, uncontrolledTestData: false }));
// "likely cause: ambiguous locator matching multiple elements" -- checked before the vaguer "consistent step" conclusion

function coverageLayers(usesRoleLocators, usesAxeScan) {
  const layers = [];
  if (usesRoleLocators) layers.push("accessible-by-construction (getByRole/getByLabel require a real role/name)");
  if (usesAxeScan) layers.push("automated WCAG scan (contrast, landmarks, ARIA validity)");
  return layers;
}
console.log(coverageLayers(true, true)); // both layers -- genuinely complementary, not redundant`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call diagnoseFlaky with reproduced:false and confirm it correctly refuses to guess a cause before reproduction is confirmed.",
      code: `function diagnoseFlaky(observations) {
  if (!observations.reproduced) return "not confirmed flaky yet -- reproduce first";
  if (observations.ambiguousLocator) return "likely cause: ambiguous locator";
  return "needs deeper analysis";
}
console.log(diagnoseFlaky({ reproduced: false, ambiguousLocator: true }));`,
      editable: true,
    },
    guidedExercise: {
      id: "pw-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write diagnoseFlaky(observations) implementing the exact priority order from this lesson: not reproduced -> 'reproduce first'; ambiguous locator -> that cause; uncontrolled test data -> that cause; consistent failure step -> race condition at that step; otherwise -> 'needs deeper trace analysis'.",
      starterCode: `function diagnoseFlaky(observations) {
  // TODO: implement the priority order described in the prompt
}
`,
      solutionCode: `function diagnoseFlaky(observations) {
  if (!observations.reproduced) return "not confirmed flaky yet -- reproduce first";
  if (observations.ambiguousLocator) return "likely cause: ambiguous locator matching multiple elements";
  if (observations.uncontrolledTestData) return "likely cause: colliding test data between parallel runs";
  if (observations.failureStepConsistent) return "likely cause: a specific race condition at a consistent step";
  return "needs deeper trace analysis";
}`,
      harness: `
        try { window.__report('t1', diagnoseFlaky({reproduced:false}) === "not confirmed flaky yet -- reproduce first", 'should require reproduction first'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', diagnoseFlaky({reproduced:true, ambiguousLocator:true}).includes("ambiguous"), 'should identify an ambiguous locator when present'); window.__report('t2', diagnoseFlaky({reproduced:true, ambiguousLocator:true}).includes("ambiguous")); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', diagnoseFlaky({reproduced:true, uncontrolledTestData:true}).includes("colliding"), 'should identify colliding test data when locator is not the issue'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', diagnoseFlaky({reproduced:true}) === "needs deeper trace analysis", 'no specific cause identified should ask for deeper analysis'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "requires reproduction before diagnosing" },
        { id: "t2", description: "identifies an ambiguous locator as the cause when present" },
        { id: "t3", description: "identifies colliding test data when it's the relevant cause" },
        {
          id: "t4",
          description:
            "falls back to requesting deeper analysis when nothing specific is identified",
        },
      ],
      hints: [
        "The priority order matters -- check for the most common, most specific causes first, before falling back to a vaguer conclusion.",
        "This models a real, disciplined diagnostic process, not a guess -- reproduce, then check specific known causes in order.",
      ],
    },
    independentExercise: {
      id: "pw-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write hasTestInterdependence(tests) where tests is an array of {name, dependsOnTestName} objects (dependsOnTestName is null if independent). Return true if ANY test has a non-null dependsOnTestName -- modeling a maintainability check that would flag a suite secretly relying on execution order.",
      starterCode: `function hasTestInterdependence(tests) {
  // TODO
  return false;
}
`,
      solutionCode: `function hasTestInterdependence(tests) {
  return tests.some((t) => t.dependsOnTestName !== null);
}`,
      harness: `
        try {
          const result = hasTestInterdependence([{name:"a",dependsOnTestName:null},{name:"b",dependsOnTestName:"a"}]);
          window.__report('t1', result === true, 'should detect a test depending on another test'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = hasTestInterdependence([{name:"a",dependsOnTestName:null},{name:"b",dependsOnTestName:null}]);
          window.__report('t2', result === false, 'fully independent tests should report no interdependence'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const result = hasTestInterdependence([]);
          window.__report('t3', result === false, 'an empty test list has no interdependence'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "detects a genuine test dependency" },
        { id: "t2", description: "confirms fully independent tests as safe" },
        { id: "t3", description: "handles an empty test list" },
      ],
      hints: [
        "Array.prototype.some checks whether ANY element matches a condition.",
        "This models exactly the architectural principle this lesson closes on: no test should secretly depend on another test's side effects or execution order.",
      ],
    },
    commonMistakes: [
      "Adding a retry or a wait to a flaky test before actually diagnosing its cause -- this can mask the real problem (a race condition, an ambiguous locator, colliding test data) instead of fixing it, and the underlying bug can still surface in production.",
      "Treating axe-core scans and role-based locators as redundant with each other -- they check genuinely different things (a broader automated WCAG scan versus locators that only find elements with real accessible roles/names in the first place); a mature suite uses both.",
      "Letting a later test rely on state left behind by an earlier one (a shared, uncleaned fixture, a specific execution order) -- this fights against Playwright's actual isolation guarantees and produces confusing failures the moment execution order changes for any reason.",
    ],
    quiz: [
      {
        id: "pw-q14-1",
        prompt:
          "What should be the FIRST step in systematically diagnosing a flaky test, before checking specific known causes?",
        choices: [
          "Immediately add a retry to make it pass more often",
          "Reproduce it — confirm the test is genuinely, repeatedly intermittent, not a one-off environmental fluke",
          "Delete the test",
          "Increase every timeout setting",
        ],
        correctIndex: 1,
        explanation:
          "Diagnosing anything starts with confirming what you're actually diagnosing — without first reproducing the flakiness reliably, you can't tell whether a subsequent 'fix' actually addressed the real cause or just coincided with the flakiness not showing up that particular run.",
      },
      {
        id: "pw-q14-2",
        prompt:
          "Why are role-based locators and an axe-core accessibility scan described as complementary rather than redundant?",
        choices: [
          "They check exactly the same things, so using both is wasteful",
          "Role-based locators only exercise elements with a discoverable role/name as a side effect of finding them; an axe-core scan additionally checks a broader set of WCAG concerns (contrast, landmarks, ARIA validity) that locators alone don't verify",
          "axe-core cannot be used alongside Playwright at all",
          "Role-based locators replace the need for any accessibility testing entirely",
        ],
        correctIndex: 1,
        explanation:
          "A role-based locator finding an element is incidental proof that element has a real accessible role and name — but it says nothing about contrast, landmark structure, or ARIA correctness, which is exactly the additional, distinct layer an automated axe-core scan checks for.",
      },
      {
        id: "pw-q14-3",
        prompt:
          "Why is a test that secretly depends on another test running first considered an architectural problem, even if it currently passes?",
        choices: [
          "It isn't a problem as long as it currently passes",
          "It fights against Playwright's actual isolation guarantees, and will eventually fail in confusing ways the moment execution order changes -- from parallelism, filtering, or retries",
          "Playwright physically prevents tests from ever depending on each other",
          "Test interdependence always causes an immediate, obvious failure",
        ],
        correctIndex: 1,
        explanation:
          "Playwright is specifically designed to isolate tests so they can run independently, in any order, in parallel — a suite with hidden ordering dependencies is working against that design, and the failure mode when order eventually does change (which it will) tends to be confusing precisely because the real cause (an unstated dependency) isn't visible anywhere in the failing test itself.",
      },
    ],
    takeaway:
      "Diagnose flakiness by reproducing it and checking known causes in order, not by reflexively adding retries or waits; treat role-based locators and automated accessibility scans as complementary, not redundant; and keep every test genuinely independent of execution order, which is what all of this course's isolation techniques were building toward.",
    summary:
      "Flaky-test diagnosis: reproduce, capture and read a trace, check known causes (ambiguous locators, colliding test data, race conditions) in order — before reaching for retries or waits. Role-based locators and axe-core scans check different, complementary accessibility concerns. Maintainable architecture means centralized config, clear structure, and zero test interdependence on execution order.",
  },
];
