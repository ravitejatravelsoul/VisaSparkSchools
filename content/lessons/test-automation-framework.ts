import type { LessonInput } from "@/lib/content/types";

/**
 * Test Automation Framework Engineering.
 *
 * An advanced integration course, not a duplicate of Playwright Web
 * Automation or Selenium WebDriver Automation -- it teaches how to design
 * the surrounding ARCHITECTURE that turns individual tests into a
 * maintainable, scalable automation framework. The reference implementation
 * is TypeScript and Playwright (reusing the learner's existing Playwright
 * knowledge, adding no new major runtime). This platform has no Playwright
 * runtime in its browser sandbox and does not add one -- every lesson's
 * guidedExercise/independentExercise is a genuine, browser-executable
 * JavaScript/TypeScript exercise that models the underlying architectural
 * decision (layering, fixture composition, retry policy, quality-gate
 * logic, failure-triage classification) -- never a claim that a real
 * browser, CI pipeline, or database was actually used. Three lessons
 * additionally carry a `guidedLocalLab` for real, local framework-building
 * work on the learner's own machine.
 *
 * Version assumption: TypeScript (this repository's own), Playwright
 * 1.62.x (matching the Playwright Web Automation course and this
 * repository's own tests/e2e/ suite, pinned to @playwright/test ^1.62.0),
 * Node.js 20.x or 22.x LTS.
 */
export const testAutomationFrameworkLessons: LessonInput[] = [
  {
    id: "tafe-framework-goals-boundaries",
    slug: "tafe-framework-goals-boundaries",
    title: "Framework Goals, Boundaries, and Test Architecture",
    description:
      "What a test automation FRAMEWORK actually is (beyond a folder of tests), the test pyramid and its practical alternatives, and how to decide what belongs in UI, API, and database validation layers.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 1,
    difficulty: "advanced",
    estimatedMinutes: 22,
    prerequisites: [],
    objectives: [
      "Explain the difference between 'a folder of Playwright tests' and a genuine test automation framework",
      "Explain the test pyramid's intent and at least one practical, honest alternative shape for a real project",
      "Decide, for a given scenario, whether UI, API, or direct data validation is the appropriate layer to assert against",
    ],
    skills: ["test-automation", "framework-architecture", "typescript"],
    tech: [
      { name: "TypeScript", version: "5.x" },
      { name: "Playwright", version: "1.62.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Playwright Docs: Best Practices",
        url: "https://playwright.dev/docs/best-practices",
      },
      {
        label: "Martin Fowler: TestPyramid",
        url: "https://martinfowler.com/bliki/TestPyramid.html",
      },
    ],
    keywords: [
      "test automation framework",
      "test pyramid",
      "architecture",
      "playwright",
      "typescript",
    ],
    explanation: `**No real browser, CI pipeline, or database is used by this lesson's exercises -- they model architectural decisions as data, using the same genuine JavaScript/TypeScript execution as this platform's other browser-executable exercises.**

A **test automation framework** is meaningfully different from "a folder that has some Playwright tests in it." A framework is the surrounding architecture that makes writing the *next* test cheap, makes a failing test's cause fast to diagnose, and keeps the whole suite maintainable as it grows to hundreds or thousands of tests: shared configuration, reusable fixtures, a consistent way to build test data, a layering strategy for what each test is actually allowed to touch, and CI integration that produces useful, actionable output. Without this architecture, a test suite tends to grow into what's sometimes called a "test swamp" — each test independently reinventing setup, duplicating locators or API calls, and becoming individually fragile and collectively expensive to maintain, even though every individual test might look reasonable in isolation.

The **test pyramid** is a widely known model: many fast, cheap unit tests at the base, fewer, slower integration tests in the middle, and a small number of expensive, slow, sometimes-flaky end-to-end UI tests at the top — the intent being that a UI test should be reserved for verifying something that genuinely requires the full, real system (a real user-facing flow), not for re-verifying business logic a unit test could check far more cheaply and reliably. In practice, this course focuses on the automation layer this shape implies for END-TO-END/UI-level testing specifically — and honestly, real projects often deviate from a perfect pyramid (a "testing trophy" shape with more integration tests, for example, is a well-known, legitimate alternative) — the point isn't to worship one exact shape, but to be deliberate about *why* each test exists at the layer it's written at, rather than defaulting to a slow UI test for everything simply because it's the most obviously "real."

Deciding **which layer** to assert against for a given check is a genuinely practical, recurring framework decision: if you're verifying that a form correctly disables its submit button while a field is invalid, that's inherently a UI-layer check (there's no other way to observe it). If you're verifying that submitting that form actually created the right record, asserting via a direct API call (or a database read, where the architecture allows it) is typically faster, more reliable, and more specific than clicking through the UI again to re-observe the same outcome the UI test already exercised the creation path for.`,
    example: {
      language: "javascript",
      description:
        "Modeling the 'framework vs. folder of tests' distinction and a simple UI-vs-API layer decision, as data.",
      code: `function isGenuineFramework(project) {
  const requiredCapabilities = ["sharedConfig", "reusableFixtures", "testDataStrategy", "ciIntegration"];
  return requiredCapabilities.every((cap) => project.capabilities.includes(cap));
}
console.log(isGenuineFramework({ capabilities: ["sharedConfig", "reusableFixtures", "testDataStrategy", "ciIntegration"] })); // true
console.log(isGenuineFramework({ capabilities: ["sharedConfig"] })); // false -- just a folder with some shared config, not yet a framework

function chooseAssertionLayer(whatIsBeingVerified) {
  // A check that can ONLY be observed through the UI belongs at the UI layer.
  if (whatIsBeingVerified === "submit-button-disabled-state") return "ui";
  // A check about whether a record was actually created is typically faster and more specific via API.
  if (whatIsBeingVerified === "record-was-created") return "api";
  return "unit"; // pure business logic, no UI or network involvement needed
}
console.log(chooseAssertionLayer("submit-button-disabled-state")); // "ui"
console.log(chooseAssertionLayer("record-was-created"));           // "api" -- faster and more specific than re-observing via UI`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call chooseAssertionLayer with 'discount-calculation-is-correct', and confirm pure business logic correctly routes to the unit layer.",
      code: `function chooseAssertionLayer(whatIsBeingVerified) {
  if (whatIsBeingVerified === "submit-button-disabled-state") return "ui";
  if (whatIsBeingVerified === "record-was-created") return "api";
  return "unit";
}
console.log(chooseAssertionLayer("discount-calculation-is-correct"));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models scoring a project's framework-readiness only -- no real project is scanned. Write frameworkReadinessScore(capabilities), returning the count of these four present in capabilities: 'sharedConfig', 'reusableFixtures', 'testDataStrategy', 'ciIntegration'.",
      starterCode: `function frameworkReadinessScore(capabilities) {
  // TODO
}
`,
      solutionCode: `function frameworkReadinessScore(capabilities) {
  const required = ["sharedConfig", "reusableFixtures", "testDataStrategy", "ciIntegration"];
  return required.filter((cap) => capabilities.includes(cap)).length;
}`,
      harness: `
        try { window.__report('t1', frameworkReadinessScore([]) === 0, 'no capabilities should score 0'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', frameworkReadinessScore(["sharedConfig", "ciIntegration"]) === 2, 'should count only the recognized, required capabilities present'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', frameworkReadinessScore(["sharedConfig", "reusableFixtures", "testDataStrategy", "ciIntegration", "extraThing"]) === 4, 'should score the full 4 even with an unrelated extra capability present'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "scores an empty capability list as 0" },
        { id: "t2", description: "correctly counts a partial set of recognized capabilities" },
        {
          id: "t3",
          description: "correctly scores a full, complete set, ignoring unrelated extras",
        },
      ],
      hints: [
        "Array.prototype.filter over the required list, checking includes() against the input, mirrors a simple readiness checklist.",
        "This models the real distinction this lesson draws: a genuine framework has ALL of these, not just one or two.",
      ],
    },
    independentExercise: {
      id: "tafe-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models the UI-vs-API-vs-unit layer decision only -- no real assertion runs. Write bestAssertionLayer(canObserveWithoutUI, involvesNetworkOrPersistence): if !canObserveWithoutUI, return 'ui'. Else if involvesNetworkOrPersistence, return 'api'. Else return 'unit'.",
      starterCode: `function bestAssertionLayer(canObserveWithoutUI, involvesNetworkOrPersistence) {
  // TODO
}
`,
      solutionCode: `function bestAssertionLayer(canObserveWithoutUI, involvesNetworkOrPersistence) {
  if (!canObserveWithoutUI) return "ui";
  if (involvesNetworkOrPersistence) return "api";
  return "unit";
}`,
      harness: `
        try { window.__report('t1', bestAssertionLayer(false, false) === "ui", 'something only observable through the UI should route to ui'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', bestAssertionLayer(true, true) === "api", 'a network/persistence check observable without the UI should route to api'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', bestAssertionLayer(true, false) === "unit", 'pure logic needing neither UI nor network should route to unit'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly routes a UI-only-observable check to the UI layer" },
        { id: "t2", description: "correctly routes a network/persistence check to the API layer" },
        { id: "t3", description: "correctly routes pure logic to the unit layer" },
      ],
      hints: [
        "The UI check comes first because it's the only layer capable of observing that specific kind of outcome at all -- no shortcut is possible there.",
        "This models the practical, recurring framework decision of picking the FASTEST layer capable of genuinely verifying a given outcome.",
      ],
    },
    guidedLocalLab: {
      id: "tafe-gll-scaffold-framework",
      title: "Scaffold a Layered TypeScript Automation Framework",
      scenario:
        "Set up a real, local TypeScript + Playwright project with a deliberate layered folder structure -- the architectural foundation the rest of this course builds on. Every command below runs in YOUR terminal; this platform does not execute any of them.",
      requiredTools: [
        { name: "Node.js", version: "20.x or 22.x LTS" },
        { name: "npm", version: "bundled with Node.js" },
        { name: "Playwright", version: "1.62.x" },
      ],
      setupSteps: [
        "Create a project folder: `mkdir automation-framework && cd automation-framework`.",
        "Initialize it: `npm init -y`.",
        "Install Playwright's test runner: `npm install -D @playwright/test@1.62.0 typescript`.",
        "Install browsers: `npx playwright install`.",
      ],
      projectStructure: `automation-framework/
  src/
    config/
      env.ts
    pages/
      (page objects go here -- Module 3)
    fixtures/
      (custom fixtures go here -- Module 2)
    data/
      (test-data builders go here -- Module 2)
  tests/
    smoke.spec.ts
  playwright.config.ts
  tsconfig.json
  package.json`,
      starterFiles: [
        {
          path: "src/config/env.ts",
          content: `export interface FrameworkConfig {
  baseUrl: string;
  environment: "local" | "staging" | "production";
}

export function loadConfig(): FrameworkConfig {
  const environment = (process.env.TEST_ENV as FrameworkConfig["environment"]) ?? "local";
  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
  return { baseUrl, environment };
}
`,
        },
        {
          path: "tests/smoke.spec.ts",
          content: `import { test, expect } from "@playwright/test";
import { loadConfig } from "../src/config/env";

test("framework configuration loads with sensible defaults", () => {
  const config = loadConfig();
  expect(config.environment).toBeTruthy();
  expect(config.baseUrl).toContain("http");
});
`,
        },
        {
          path: "playwright.config.ts",
          content: `import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
});
`,
        },
      ],
      requirements: [
        "The src/ folder has separate config/, pages/, fixtures/, and data/ subfolders (even if some are still empty) -- the layering this course builds on module by module.",
        "src/config/env.ts loads configuration from environment variables with sensible, working defaults, rather than hardcoding a single environment.",
        "tests/smoke.spec.ts passes when run with npx playwright test.",
        "playwright.config.ts points testDir at the tests/ folder and enables fullyParallel.",
      ],
      commands: [
        { description: "Run the smoke test", command: "npx playwright test" },
        {
          description:
            "Run with a different environment variable to confirm config actually changes",
          command: "BASE_URL=http://staging.example.test npx playwright test",
        },
      ],
      expectedBehavior:
        "npx playwright test passes, confirming the config loader produces a truthy environment and a base URL containing 'http'. Re-running with BASE_URL set to a different value and confirming (via a temporary console.log, removed afterward) that loadConfig() picks it up demonstrates the config layer genuinely reads from the environment rather than being hardcoded.",
      verificationSteps: [
        { command: "npx playwright test", expectedResult: "1 passed" },
        { command: "ls src", expectedResult: "shows config, pages, fixtures, and data subfolders" },
      ],
      troubleshooting: [
        {
          issue: "`Cannot find module '@playwright/test'`",
          fix: "Confirm `npm install -D @playwright/test@1.62.0 typescript` completed successfully and node_modules/ exists.",
        },
        {
          issue: "`browserType.launch: Executable doesn't exist`",
          fix: "Run `npx playwright install` to download the actual browser binaries -- installing the npm package alone does not include them.",
        },
        {
          issue: "The smoke test passes even after breaking loadConfig() intentionally",
          fix: "Confirm the assertions in smoke.spec.ts are actually checking something meaningful (a truthy environment, a URL containing 'http') and aren't accidentally tautological.",
        },
      ],
      hints: [
        "Keeping config/, pages/, fixtures/, and data/ as separate folders from the start (even nearly empty) makes each later module's additions land in an obvious, predictable place.",
        "process.env.VAR_NAME ?? 'default' is the standard TypeScript pattern for an environment variable with a safe fallback.",
        "fullyParallel: true in playwright.config.ts is a deliberate choice this course revisits in Module 4 (test organization and execution).",
      ],
      referenceSolution: {
        summary:
          "The scaffold separates concerns into config/, pages/, fixtures/, and data/ folders from the start. env.ts reads TEST_ENV and BASE_URL from process.env with working defaults, so the same test suite can target different environments without code changes. playwright.config.ts establishes fullyParallel execution as the framework's baseline.",
        files: [
          {
            path: "src/config/env.ts",
            content: `export interface FrameworkConfig {
  baseUrl: string;
  environment: "local" | "staging" | "production";
}

export function loadConfig(): FrameworkConfig {
  const environment = (process.env.TEST_ENV as FrameworkConfig["environment"]) ?? "local";
  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
  return { baseUrl, environment };
}
`,
          },
        ],
      },
      extensionChallenge:
        "Add a validateConfig(config) function that throws a clear error if baseUrl doesn't start with 'http', and add a test confirming it rejects an invalid config -- an early, explicit validation step is cheaper than a confusing failure much later in a real test run.",
    },
    commonMistakes: [
      "Treating any folder containing Playwright test files as automatically 'a framework' -- without shared config, reusable fixtures, a test-data strategy, and CI integration, it's still just a collection of individually fragile tests.",
      "Defaulting to a slow, UI-level assertion for every check, even ones that could be verified faster and more specifically via a direct API call or unit-level logic check.",
      "Treating the test pyramid as a rigid, universal rule rather than a starting intent -- real projects legitimately deviate from a perfect pyramid shape, and the goal is being deliberate about WHY a test exists at its layer, not matching an exact diagram.",
    ],
    quiz: [
      {
        id: "tafe-q1-1",
        prompt:
          "What meaningfully distinguishes a genuine test automation FRAMEWORK from just a folder containing some test files?",
        choices: [
          "Nothing; the two terms mean exactly the same thing",
          "A framework provides shared, reusable architecture -- configuration, fixtures, a test-data strategy, and CI integration -- that makes writing and maintaining many tests cheap and consistent",
          "A framework requires at least 1,000 individual test files",
          "A framework must use a specific, particular testing tool",
        ],
        correctIndex: 1,
        explanation:
          "The distinguishing factor is architecture, not sheer test count or a specific tool -- shared configuration, reusable fixtures, a consistent test-data strategy, and CI integration are what keep a growing test suite maintainable, rather than each test independently reinventing its own setup.",
      },
      {
        id: "tafe-q1-2",
        prompt:
          "According to the test pyramid's intent, when should a slow, expensive UI-level end-to-end test be used?",
        choices: [
          "For every possible check, since it's the most 'real' form of testing",
          "Specifically for verifying something that genuinely requires the full, real system -- not for re-verifying business logic a cheaper unit or integration test could check just as reliably",
          "Only on Fridays",
          "Never; UI tests should always be avoided entirely",
        ],
        correctIndex: 1,
        explanation:
          "The pyramid's intent is to reserve the expensive, slower UI layer for what genuinely requires the full real system -- using it to re-verify logic a cheap, fast unit test could check just as reliably is a common, costly anti-pattern this course explicitly steers away from.",
      },
      {
        id: "tafe-q1-3",
        prompt:
          "When deciding which layer to assert against, why might a direct API call be preferred over a UI check for verifying 'a record was created'?",
        choices: [
          "API calls are always impossible to fail, so they're inherently more trustworthy",
          "An API check is typically faster and more specific than re-observing the same outcome through the UI, when the UI isn't the only way to observe it",
          "UI checks are illegal in professional test suites",
          "There is never a reason to prefer one over the other",
        ],
        correctIndex: 1,
        explanation:
          "When an outcome can be verified without the UI, doing so is typically faster and more precisely targeted at the actual thing being checked -- reserving the UI layer specifically for what can only be observed there is the practical layering decision this lesson focuses on.",
      },
    ],
    takeaway:
      "A genuine test automation framework is architecture -- shared config, reusable fixtures, a test-data strategy, and CI integration -- not just a folder of test files. Use the test pyramid as a deliberate starting intent, not a rigid rule, and pick the fastest layer (unit, API, or UI) actually capable of verifying a given outcome.",
    summary:
      "A framework provides reusable architecture that makes writing and maintaining many tests cheap and consistent -- distinct from simply having some test files. The test pyramid favors cheap, fast tests at the base and reserves slow, expensive UI tests for what genuinely requires the full real system; real projects legitimately deviate from its exact shape. Choosing the fastest layer (unit, API, UI) capable of verifying a given outcome is a core, recurring framework-architecture decision.",
    nextLessonSlug: "tafe-repo-structure-config",
  },
  {
    id: "tafe-repo-structure-config",
    slug: "tafe-repo-structure-config",
    title: "Repo Structure, Configuration Management, and Secret Handling",
    description:
      "Organizing a framework's folders so its layers stay honest, designing configuration that adapts across environments without code changes, and handling secrets in test configuration safely.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 2,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["tafe-framework-goals-boundaries"],
    objectives: [
      "Explain why a framework's folder structure should reflect its architectural layers, not just group files by file type",
      "Design an environment-aware configuration strategy that avoids hardcoding a single target environment",
      "Explain why real secrets must never appear in a test framework's source or version-controlled config",
    ],
    skills: ["test-automation", "configuration", "typescript"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "The Twelve-Factor App: Config", url: "https://12factor.net/config" },
      {
        label: "Playwright Docs: Environment Variables",
        url: "https://playwright.dev/docs/test-parameterize",
      },
    ],
    keywords: [
      "configuration",
      "environment variables",
      "secrets",
      "repo structure",
      "test automation",
    ],
    explanation: `**No real environment, secret, or CI system is used by this lesson's exercises -- they model configuration decisions as data, using genuine JavaScript/TypeScript execution.**

A framework's folder structure is itself an architectural decision, not just organizational tidiness — structuring folders around what a file's *layer/role* is (config/, pages/, fixtures/, data/, services/) rather than only its file type keeps the layering from Lesson 1 honest and visible: a new contributor can tell, just from where a file lives, roughly what it's allowed to depend on and what depends on it. A flat folder of hundreds of similarly named \`.spec.ts\` files with no deeper structure makes this layering invisible, and invisible architecture tends to erode over time as more people touch the codebase without a clear convention to follow.

**Environment-aware configuration** means the exact same test suite can run against a local dev server, a staging environment, or (carefully, deliberately) production-adjacent environments, without editing code — only by changing which configuration values are supplied, typically via environment variables read at startup. This matters because a framework that hardcodes a single base URL or set of credentials directly in source code cannot be safely or easily pointed at a different environment, and worse, actively invites exactly the secret-handling problem below if those hardcoded values happen to be real credentials.

**Secrets never belong in source code or version-controlled configuration files** — not because of an abstract rule, but because a git repository's history is effectively permanent and often far more widely readable than the live system the secret protects: a committed secret remains recoverable from history even after being "removed" in a later commit, and a public or semi-public repository can expose it to far more people than were ever meant to have it. The correct pattern for test configuration mirrors general application secret handling: secrets are supplied to the test run via environment variables (typically injected by the CI system from a secrets manager, never checked into files) or a git-ignored local \`.env\` file for individual local development — and test code and configuration are written to consume them at runtime, never to contain a real secret value directly.`,
    example: {
      language: "javascript",
      description:
        "Modeling why layered folder structure matters and a safe vs. unsafe way to obtain a config value, as data.",
      code: `function layerFromPath(filePath) {
  // Models inferring a file's architectural layer from where it lives, not just its extension.
  if (filePath.startsWith("src/pages/")) return "page-object";
  if (filePath.startsWith("src/fixtures/")) return "fixture";
  if (filePath.startsWith("src/data/")) return "test-data";
  if (filePath.startsWith("src/config/")) return "config";
  return "unknown";
}
console.log(layerFromPath("src/pages/login-page.ts"));   // "page-object" -- clear from location alone
console.log(layerFromPath("tests/random-file-42.ts"));   // "unknown" -- a flat, undifferentiated structure gives no such signal

function isSafeConfigSource(source) {
  // Models the safe-vs-unsafe secret-sourcing distinction.
  const safeSources = ["environment-variable", "gitignored-local-env-file", "ci-secrets-manager"];
  return safeSources.includes(source);
}
console.log(isSafeConfigSource("environment-variable"));       // true
console.log(isSafeConfigSource("hardcoded-in-source-file"));   // false -- a real, committed secret`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call isSafeConfigSource with 'committed-config-json', and confirm a secret baked into a version-controlled JSON file is correctly rejected as unsafe.",
      code: `function isSafeConfigSource(source) {
  const safeSources = ["environment-variable", "gitignored-local-env-file", "ci-secrets-manager"];
  return safeSources.includes(source);
}
console.log(isSafeConfigSource("committed-config-json"));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models inferring an architectural layer from a file path only -- no real project is scanned. Write layerFromPath(filePath): 'src/pages/' -> 'page-object', 'src/fixtures/' -> 'fixture', 'src/data/' -> 'test-data', 'src/config/' -> 'config', anything else -> 'unknown'. Use startsWith checks.",
      starterCode: `function layerFromPath(filePath) {
  // TODO
}
`,
      solutionCode: `function layerFromPath(filePath) {
  if (filePath.startsWith("src/pages/")) return "page-object";
  if (filePath.startsWith("src/fixtures/")) return "fixture";
  if (filePath.startsWith("src/data/")) return "test-data";
  if (filePath.startsWith("src/config/")) return "config";
  return "unknown";
}`,
      harness: `
        try { window.__report('t1', layerFromPath("src/pages/checkout-page.ts") === "page-object", 'a src/pages/ file should be identified as a page-object'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', layerFromPath("src/config/env.ts") === "config", 'a src/config/ file should be identified as config'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', layerFromPath("tests/misc.ts") === "unknown", 'a file outside any recognized layer folder should be unknown'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a page-object file by its folder" },
        { id: "t2", description: "correctly identifies a config file by its folder" },
        { id: "t3", description: "correctly falls back to unknown for an unrecognized location" },
      ],
      hints: [
        "This models exactly the value a layered folder structure provides -- a file's role is inferable from WHERE it lives, without opening it.",
        "Checking each known prefix in order, falling back to 'unknown', mirrors a simple, honest classification.",
      ],
    },
    independentExercise: {
      id: "tafe-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models resolving a config value with an environment-variable-first, safe-default-fallback strategy only -- no real environment variable is read. Write resolveBaseUrl(envVars, environment): if envVars.BASE_URL is set, return it. Else return a built-in default based on environment: 'staging' -> 'https://staging.example.test', anything else -> 'http://localhost:3000'.",
      starterCode: `function resolveBaseUrl(envVars, environment) {
  // TODO
}
`,
      solutionCode: `function resolveBaseUrl(envVars, environment) {
  if (envVars.BASE_URL) return envVars.BASE_URL;
  if (environment === "staging") return "https://staging.example.test";
  return "http://localhost:3000";
}`,
      harness: `
        try { window.__report('t1', resolveBaseUrl({ BASE_URL: "https://custom.test" }, "local") === "https://custom.test", 'an explicit BASE_URL should always take priority'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', resolveBaseUrl({}, "staging") === "https://staging.example.test", 'without an explicit override, staging should use its own sensible default'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', resolveBaseUrl({}, "local") === "http://localhost:3000", 'without an explicit override, local should default to localhost'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly prioritizes an explicit override over any default" },
        { id: "t2", description: "correctly falls back to a staging-specific default" },
        { id: "t3", description: "correctly falls back to a local-specific default" },
      ],
      hints: [
        "Checking envVars.BASE_URL first models letting CI or a developer override the target for a specific run, without ever editing code.",
        "This is exactly the pattern that lets the SAME test suite target multiple environments -- only the supplied configuration changes.",
      ],
    },
    commonMistakes: [
      "Organizing test files only by file type (all .spec.ts files in one flat folder) instead of by architectural layer -- this makes the layering decisions from Lesson 1 invisible and easy to erode over time.",
      "Hardcoding a single base URL or credential set directly in source code -- this makes the suite unable to safely target a different environment, and risks accidentally committing a real secret.",
      "Committing a secret to version control and assuming deleting it in a later commit removes it -- git history is effectively permanent; a committed secret should be treated as compromised and rotated, not just 'removed.'",
    ],
    quiz: [
      {
        id: "tafe-q2-1",
        prompt:
          "Why structure a framework's folders around architectural LAYER (config/, pages/, fixtures/, data/) rather than only by file type?",
        choices: [
          "There is no practical benefit; any structure is equally good",
          "A layer-based structure keeps a file's role and allowed dependencies visible just from its location, which a flat, undifferentiated structure does not provide",
          "File-type-based structure is always faster for the test runner to execute",
          "Layer-based folders are required by TypeScript",
        ],
        correctIndex: 1,
        explanation:
          "A structure organized around architectural layer makes a file's role (and what it should or shouldn't depend on) visible just from where it lives -- this keeps the layering decisions from eroding as more contributors touch the codebase over time.",
      },
      {
        id: "tafe-q2-2",
        prompt: "What does environment-aware configuration allow a test suite to do?",
        choices: [
          "Run only against production",
          "Target different environments (local, staging, etc.) using the SAME test code, by changing only the supplied configuration values, typically via environment variables",
          "Automatically detect and fix bugs in the application under test",
          "Skip writing any configuration at all",
        ],
        correctIndex: 1,
        explanation:
          "Environment-aware configuration means the exact same test code can run against different targets without being edited -- only the configuration values supplied (usually via environment variables) change between runs.",
      },
      {
        id: "tafe-q2-3",
        prompt:
          "Why is a secret committed to version control considered compromised, even if it's removed in a later commit?",
        choices: [
          "It isn't; removing it in a later commit is completely sufficient",
          "Git history is effectively permanent and often widely readable -- the secret remains recoverable from history regardless of later commits, so it should be rotated, not just removed",
          "Git automatically encrypts all committed content",
          "Removing a file from git also removes it from every clone of the repository",
        ],
        correctIndex: 1,
        explanation:
          "A later commit that removes a secret does not erase it from history -- anyone with access to the repository's history (or a clone made before the removal) can still recover it, which is why the correct response to a committed secret is rotating it, not just deleting it going forward.",
      },
    ],
    takeaway:
      "Organize a framework's folders around architectural layer, not just file type, to keep its design visible and durable. Design configuration to read from the environment with sensible defaults, so the same suite can target multiple environments without code changes. Never commit a real secret -- source it from environment variables, a git-ignored local file, or a CI secrets manager, and rotate anything that was ever committed.",
    summary:
      "A layer-based folder structure (config/, pages/, fixtures/, data/) keeps a framework's architecture visible and resistant to erosion, unlike a flat, file-type-only structure. Environment-aware configuration, read from environment variables with sensible defaults, lets the same test suite target multiple environments without editing code. Secrets must never appear in source or version-controlled config -- they belong in environment variables, a git-ignored local file, or a CI secrets manager, and a committed secret should be treated as compromised and rotated.",
    nextLessonSlug: "tafe-test-data-builders",
  },
  {
    id: "tafe-test-data-builders",
    slug: "tafe-test-data-builders",
    title: "Test-Data Management and the Builder Pattern",
    description:
      "Why hardcoded test data quietly makes a suite fragile, and how a builder with sensible defaults lets each test declare only the specific data it actually cares about.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 3,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["tafe-repo-structure-config"],
    objectives: [
      "Explain why hardcoded, shared test data creates fragile, order-dependent tests",
      "Design a data builder that provides sensible defaults while letting a test override only what it cares about",
      "Explain the difference between test-data isolation strategies (unique-per-test data vs. shared fixtures) and when each is appropriate",
    ],
    skills: ["test-automation", "test-data", "typescript"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Martin Fowler: ObjectMother",
        url: "https://martinfowler.com/bliki/ObjectMother.html",
      },
      {
        label: "Playwright Docs: Test Isolation",
        url: "https://playwright.dev/docs/browser-contexts",
      },
    ],
    keywords: ["test data", "builder pattern", "test isolation", "typescript"],
    explanation: `**No real test data is created against a real system by this lesson's exercises -- they model builder logic as data, using genuine JavaScript/TypeScript execution.**

Hardcoded test data — a literal object with every field spelled out, copy-pasted across many tests — creates a specific, common, and genuinely costly problem: when the underlying schema changes (a new required field is added), every one of those copy-pasted literals has to be updated individually, and it's easy to miss some. Worse, tests that happen to reuse the exact same hardcoded values (the same email address, the same username) can silently collide with each other when run in parallel or in a shared environment, producing confusing, intermittent failures that have nothing to do with the actual feature being tested.

A **data builder** solves this by providing one, centralized function that returns a fully valid object with sensible, working defaults for every field — and accepts an optional partial override for only the specific fields a given test actually cares about. A test that's specifically verifying "an invalid email is rejected" can call \`buildUser({ email: "not-an-email" })\` and get back a fully valid user in every other respect, with just that one field deliberately overridden — this makes the test's *intent* immediately readable (the override IS the thing being tested) and makes the builder itself the single place that needs updating when the underlying schema changes, rather than dozens of scattered literals.

**Test-data isolation** is a related, separate decision: should each test get its own **freshly generated, unique** data (a randomized or timestamped email, for example), or should tests deliberately **share** a common fixture (a pre-seeded "test admin" account)? Unique-per-test data is the safer default for anything a test *creates* or *mutates*, since it eliminates cross-test collisions entirely — two tests creating "their own" user can never interfere with each other, even running in parallel. Shared fixtures make sense specifically for read-only, stable reference data that many tests need but none of them modify — reusing it avoids needless duplication without introducing any collision risk, precisely because nothing is being mutated.`,
    example: {
      language: "javascript",
      description:
        "Modeling a data builder with defaults-plus-override and a simple, deterministic unique-value generator, as data.",
      code: `function buildUser(overrides = {}) {
  const defaults = { email: "default-user@example.test", role: "learner", isActive: true };
  return { ...defaults, ...overrides };
}
console.log(buildUser()); // { email: "default-user@example.test", role: "learner", isActive: true }
console.log(buildUser({ email: "not-an-email" })); // only email overridden -- everything else stays valid, showing the test's intent clearly

function uniqueEmail(seed) {
  // A deterministic stand-in for what a real builder would randomize/timestamp.
  return "user-" + seed + "@example.test";
}
const emailForTestA = uniqueEmail("test-a");
const emailForTestB = uniqueEmail("test-b");
console.log(emailForTestA !== emailForTestB); // true -- no collision risk between the two tests' own data`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call buildUser overriding both role and isActive, and confirm email still falls back to the builder's default.",
      code: `function buildUser(overrides = {}) {
  const defaults = { email: "default-user@example.test", role: "learner", isActive: true };
  return { ...defaults, ...overrides };
}
console.log(buildUser({ role: "instructor", isActive: false }));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models a data builder with defaults-plus-override only -- no real object is persisted. Write buildCourseEnrollment(overrides), merging overrides onto defaults { courseId: 'course-101', status: 'active', progressPercent: 0 } using object spread, with overrides taking priority.",
      starterCode: `function buildCourseEnrollment(overrides) {
  // TODO
}
`,
      solutionCode: `function buildCourseEnrollment(overrides = {}) {
  const defaults = { courseId: "course-101", status: "active", progressPercent: 0 };
  return { ...defaults, ...overrides };
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(buildCourseEnrollment()) === JSON.stringify({courseId:"course-101",status:"active",progressPercent:0}), 'with no overrides, should return exactly the defaults'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = buildCourseEnrollment({ status: "completed" }); window.__report('t2', r.status === "completed" && r.courseId === "course-101", 'overriding one field should leave the others at their defaults'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = buildCourseEnrollment({ progressPercent: 100, status: "completed" }); window.__report('t3', r.progressPercent === 100 && r.status === "completed", 'overriding multiple fields should apply all of them'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "returns exactly the sensible defaults when no override is given",
        },
        { id: "t2", description: "applies a single override while preserving other defaults" },
        { id: "t3", description: "applies multiple overrides correctly together" },
      ],
      hints: [
        "Object spread with overrides LAST ({...defaults, ...overrides}) is what makes overrides win -- reversing the order would silently make overrides do nothing.",
        "This models exactly why a test overriding only 'status' makes its intent immediately readable -- everything else is known-good, default data.",
      ],
    },
    independentExercise: {
      id: "tafe-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models choosing unique-per-test data vs. a shared fixture only -- no real data store is involved. Write dataStrategyFor(willBeMutated): if willBeMutated, return 'unique-per-test'. Else return 'shared-fixture'.",
      starterCode: `function dataStrategyFor(willBeMutated) {
  // TODO
}
`,
      solutionCode: `function dataStrategyFor(willBeMutated) {
  return willBeMutated ? "unique-per-test" : "shared-fixture";
}`,
      harness: `
        try { window.__report('t1', dataStrategyFor(true) === "unique-per-test", 'data a test creates or mutates should use unique-per-test data'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', dataStrategyFor(false) === "shared-fixture", 'stable, read-only reference data can safely use a shared fixture'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly chooses unique-per-test data for anything that will be mutated",
        },
        {
          id: "t2",
          description: "correctly chooses a shared fixture for stable, unmutated reference data",
        },
      ],
      hints: [
        "This models the core decision from this lesson: mutation risk is what determines whether sharing data is safe.",
        "Read-only reference data has no collision risk to begin with, since nothing about it ever changes between tests.",
      ],
    },
    guidedLocalLab: {
      id: "tafe-gll-config-fixtures-data-diagnostics",
      title: "Add Configuration, Fixtures, Test-Data Builders, and Diagnostics",
      scenario:
        "Extend the framework scaffold from Lesson 1's guided local lab with a real, working test-data builder, a custom fixture that uses it, and a basic diagnostic log -- real, local TypeScript work in your own project. Every command below runs in YOUR terminal; this platform does not execute any of them.",
      requiredTools: [
        { name: "Node.js", version: "20.x or 22.x LTS" },
        { name: "Playwright", version: "1.62.x" },
      ],
      setupSteps: [
        "Continue in the automation-framework project from Lesson 1's guided local lab (or recreate it if needed).",
        "Confirm `npx playwright test` still passes before making changes.",
      ],
      projectStructure: `automation-framework/
  src/
    config/
      env.ts
    data/
      user-builder.ts
    fixtures/
      test-with-user.ts
  tests/
    smoke.spec.ts
    user-builder.spec.ts`,
      starterFiles: [
        {
          path: "src/data/user-builder.ts",
          content: `export interface TestUser {
  email: string;
  role: "learner" | "instructor";
  isActive: boolean;
}

let counter = 0;

export function buildUser(overrides: Partial<TestUser> = {}): TestUser {
  counter += 1;
  const defaults: TestUser = {
    email: \`test-user-\${Date.now()}-\${counter}@example.test\`,
    role: "learner",
    isActive: true,
  };
  return { ...defaults, ...overrides };
}
`,
        },
        {
          path: "src/fixtures/test-with-user.ts",
          content: `import { test as base } from "@playwright/test";
import { buildUser, TestUser } from "../data/user-builder";

export const test = base.extend<{ testUser: TestUser }>({
  testUser: async ({}, use) => {
    const user = buildUser();
    console.log(\`[diagnostic] fixture created test user: \${user.email}\`);
    await use(user);
    console.log(\`[diagnostic] fixture teardown for: \${user.email}\`);
  },
});
export { expect } from "@playwright/test";
`,
        },
        {
          path: "tests/user-builder.spec.ts",
          content: `import { test, expect } from "../src/fixtures/test-with-user";

test("the testUser fixture provides a valid, unique user for this test", async ({ testUser }) => {
  expect(testUser.email).toContain("@example.test");
  expect(testUser.role).toBe("learner");
});

test("a second test gets its own, different user (no collision)", async ({ testUser }) => {
  expect(testUser.email).toContain("@example.test");
});
`,
        },
      ],
      requirements: [
        "buildUser() returns a fully valid TestUser with sensible defaults, and correctly applies any partial override passed to it.",
        "Two separate calls to buildUser() (or two separate test runs using the testUser fixture) never produce the exact same email.",
        "The testUser fixture logs a diagnostic message when it creates the user and another when it tears down, visible in the test runner's output.",
        "Both tests in tests/user-builder.spec.ts pass with npx playwright test.",
      ],
      commands: [
        {
          description: "Run the new test file specifically, with output visible",
          command: "npx playwright test user-builder.spec.ts --reporter=list",
        },
        {
          description: "Run the full suite to confirm nothing else broke",
          command: "npx playwright test",
        },
      ],
      expectedBehavior:
        "Both tests in user-builder.spec.ts pass. The console output includes a '[diagnostic] fixture created test user: ...' line before each test's body runs and a '[diagnostic] fixture teardown for: ...' line after -- confirming the fixture's setup/teardown lifecycle actually runs around each test, and that the two tests received two different generated email addresses.",
      verificationSteps: [
        {
          command: "npx playwright test user-builder.spec.ts --reporter=list",
          expectedResult: "2 passed",
        },
        {
          command:
            "npx playwright test user-builder.spec.ts --reporter=list 2>&1 | grep diagnostic",
          expectedResult:
            "shows a created and a teardown diagnostic line for each of the two tests, with two different email addresses",
        },
      ],
      troubleshooting: [
        {
          issue: "Both tests appear to get the same email address",
          fix: "Confirm the counter variable in user-builder.ts is actually incrementing, and that Date.now() plus the counter are both included in the generated email -- two calls in the same millisecond still need the counter to differ.",
        },
        {
          issue: "The diagnostic teardown line never appears",
          fix: "Confirm `await use(user)` is called before the teardown console.log -- code after use() in a Playwright fixture runs during teardown, but only if use() is actually awaited.",
        },
        {
          issue: "TypeScript error about TestUser not being exported",
          fix: "Confirm `export interface TestUser` is present in user-builder.ts and correctly imported in test-with-user.ts.",
        },
      ],
      hints: [
        "A fixture's code after `await use(...)` is exactly where teardown diagnostics belong -- it runs once the test using the fixture has finished.",
        "Combining Date.now() with an in-module counter is a simple, genuinely reliable way to guarantee uniqueness even across rapid, near-simultaneous calls.",
        "Keep the diagnostic logs simple for now -- Module 5 of this course goes much deeper into structured diagnostics and reporting.",
      ],
      referenceSolution: {
        summary:
          "buildUser() combines Date.now() with a module-level counter to guarantee a unique email on every call, applying any override last so it always wins. The testUser fixture wraps buildUser() and logs a diagnostic message on both setup (before use()) and teardown (after use()), demonstrating the fixture lifecycle and giving each test its own isolated, unique data.",
        files: [
          {
            path: "src/data/user-builder.ts",
            content: `export interface TestUser {
  email: string;
  role: "learner" | "instructor";
  isActive: boolean;
}

let counter = 0;

export function buildUser(overrides: Partial<TestUser> = {}): TestUser {
  counter += 1;
  const defaults: TestUser = {
    email: \`test-user-\${Date.now()}-\${counter}@example.test\`,
    role: "learner",
    isActive: true,
  };
  return { ...defaults, ...overrides };
}
`,
          },
        ],
      },
      extensionChallenge:
        "Add a second fixture, adminUser, that calls buildUser({ role: 'instructor' }), and add a test that uses BOTH testUser and adminUser in the same test, confirming they receive two independently unique users.",
    },
    commonMistakes: [
      "Copy-pasting a full, hardcoded literal test-data object across many tests -- a schema change then requires updating every copy individually, and it's easy to miss some, leaving stale, invalid data behind.",
      "Reusing the exact same hardcoded value (email, username) across multiple tests that each create or mutate data -- this risks silent collisions when tests run in parallel or share an environment.",
      "Using a shared fixture for data a test actually mutates -- shared fixtures are only safe for stable, read-only reference data; sharing mutated data reintroduces the exact collision risk builders and unique data are meant to prevent.",
    ],
    quiz: [
      {
        id: "tafe-q3-1",
        prompt:
          "What real problem does a hardcoded, copy-pasted test-data literal (repeated across many tests) create?",
        choices: [
          "No real problem; hardcoded literals are always the simplest, safest choice",
          "When the underlying schema changes, every copy-pasted literal has to be updated individually, and it's easy to miss some, leaving invalid or stale data behind",
          "Hardcoded literals run slower than a builder function",
          "TypeScript does not allow object literals in test files",
        ],
        correctIndex: 1,
        explanation:
          "A schema change means every scattered, hardcoded copy needs updating -- a data builder centralizes this into one place, so a schema change only requires one update, not dozens of easy-to-miss ones.",
      },
      {
        id: "tafe-q3-2",
        prompt:
          "Why does a test data builder that accepts a partial override make a test's INTENT more readable?",
        choices: [
          "It doesn't affect readability at all",
          "The override IS the thing actually being tested -- everything else stays at a known-good default, so what's different about this specific test is immediately visible",
          "Builders always produce shorter code regardless of what's overridden",
          "Overrides are required by the TypeScript compiler",
        ],
        correctIndex: 1,
        explanation:
          "When a test calls buildUser({ email: 'not-an-email' }), the single overridden field IS the point of the test -- a reader doesn't have to compare a full hardcoded literal against defaults to figure out what's actually being verified.",
      },
      {
        id: "tafe-q3-3",
        prompt:
          "When is a shared test-data fixture (reused across multiple tests) an appropriate, safe choice?",
        choices: [
          "Always -- shared fixtures should be used for all test data",
          "Specifically for stable, read-only reference data that no test mutates -- sharing data that IS mutated reintroduces cross-test collision risk",
          "Only for data involving a real credential",
          "Never; all test data must always be unique per test",
        ],
        correctIndex: 1,
        explanation:
          "Shared fixtures are safe precisely because nothing about the shared data changes -- the moment a test mutates shared data, that safety disappears, and unique-per-test data becomes necessary again to avoid collisions.",
      },
    ],
    takeaway:
      "Use a data builder with sensible defaults and partial overrides instead of hardcoded literals -- it centralizes schema changes and makes each test's actual intent readable. Generate unique data for anything a test creates or mutates; reserve shared fixtures for stable, read-only reference data.",
    summary:
      "A data builder returning defaults with an overridable partial input avoids the maintenance and collision risks of hardcoded, copy-pasted test data, while making a test's specific intent immediately visible in what it overrides. Unique-per-test data (via randomization or a counter/timestamp) is the safe default for anything mutated; shared fixtures are appropriate only for stable, unmutated reference data.",
    nextLessonSlug: "tafe-fixtures-di",
  },
  {
    id: "tafe-fixtures-di",
    slug: "tafe-fixtures-di",
    title: "Fixtures and Dependency Injection Concepts",
    description:
      "How Playwright's fixture system is really a dependency-injection mechanism, why fixture composition avoids duplicated setup logic, and how to design fixtures that stay independently testable and understandable.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 4,
    difficulty: "advanced",
    estimatedMinutes: 21,
    prerequisites: ["tafe-test-data-builders"],
    objectives: [
      "Explain how a fixture is a form of dependency injection -- a test declares what it needs, without knowing how it's constructed",
      "Design a fixture that depends on another fixture, avoiding duplicated setup logic across the framework",
      "Explain the tradeoff between fixture depth (many small, composed fixtures) and fixture complexity (fewer, larger fixtures)",
    ],
    skills: ["test-automation", "fixtures", "dependency-injection", "typescript"],
    tech: [
      { name: "TypeScript", version: "5.x" },
      { name: "Playwright", version: "1.62.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright Docs: Fixtures", url: "https://playwright.dev/docs/test-fixtures" },
    ],
    keywords: ["fixtures", "dependency injection", "playwright", "typescript"],
    explanation: `**No real fixture executes against a real browser in this lesson's exercises -- they model fixture composition and dependency graphs as data, using genuine JavaScript/TypeScript execution.**

A Playwright fixture is, conceptually, a form of **dependency injection**: a test function declares, as a parameter, WHAT it needs (\`{ loggedInPage }\`), without the test itself containing the logic for HOW that thing gets constructed (navigating to a login page, filling credentials, waiting for redirect). The fixture definition owns that construction logic in exactly one place, and every test that needs a logged-in page simply declares the dependency and receives an already-built one — this is the same core idea dependency injection provides in application code: callers declare what they depend on, and a separate mechanism is responsible for actually providing it.

Fixtures can **depend on other fixtures**, forming a composition chain — a \`loggedInPage\` fixture might itself depend on a lower-level \`testUser\` fixture (from Lesson 3) to know which credentials to log in with, which might itself depend on a \`config\` fixture for the base URL to navigate to. This composition is what avoids duplicating setup logic: without it, every test (or every fixture) that needs a logged-in page would need to re-implement the same login flow directly, and a change to the login flow would require updating every one of those copies instead of just the one fixture that owns it.

There's a genuine, honest **tradeoff** in how deep to make this composition: many small, single-purpose fixtures (a \`config\` fixture, a \`testUser\` fixture, a \`loggedInPage\` fixture built from both) keep each piece simple, independently understandable, and reusable in different combinations — but a very deep chain can make it harder to trace, for a given test, exactly what setup work is actually happening before it runs. Fewer, larger fixtures are more immediately readable in isolation but risk duplicating logic across them and being harder to reuse partially (a test that needs *only* the user, not the full logged-in page, can't easily get just that piece). There's no single universally correct depth — the goal is composing fixtures deliberately around genuine, reusable units of setup, not mechanically extracting everything into a fixture, or refusing to extract anything at all.`,
    example: {
      language: "javascript",
      description:
        "Modeling a fixture dependency chain and detecting duplicated setup logic that composition would avoid, as data.",
      code: `function resolveFixtureChain(fixtureName, fixtureGraph) {
  // Models resolving a fixture's full dependency chain, base-first.
  const deps = fixtureGraph[fixtureName] ?? [];
  const resolved = deps.flatMap((dep) => resolveFixtureChain(dep, fixtureGraph));
  return [...resolved, fixtureName];
}
const graph = { config: [], testUser: ["config"], loggedInPage: ["testUser"] };
console.log(resolveFixtureChain("loggedInPage", graph)); // ["config","testUser","loggedInPage"] -- built in dependency order

function wouldDuplicateSetupLogic(testsNeedingLoggedInState, hasSharedFixture) {
  if (hasSharedFixture) return false; // one fixture, reused by every test that needs it
  return testsNeedingLoggedInState > 1; // without composition, each test reimplements the same login flow
}
console.log(wouldDuplicateSetupLogic(5, false)); // true -- 5 separate, duplicated login implementations
console.log(wouldDuplicateSetupLogic(5, true));  // false -- one shared, composed fixture instead`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call resolveFixtureChain with 'testUser' instead of 'loggedInPage', and confirm it resolves a shorter chain (config, then testUser).",
      code: `function resolveFixtureChain(fixtureName, fixtureGraph) {
  const deps = fixtureGraph[fixtureName] ?? [];
  const resolved = deps.flatMap((dep) => resolveFixtureChain(dep, fixtureGraph));
  return [...resolved, fixtureName];
}
const graph = { config: [], testUser: ["config"], loggedInPage: ["testUser"] };
console.log(resolveFixtureChain("testUser", graph));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models detecting a circular fixture dependency only -- no real fixture graph is used. Write hasCircularDependency(fixtureGraph, start), returning true if starting from start and following dependencies, you can reach start again. Use a visited Set and recursion.",
      starterCode: `function hasCircularDependency(fixtureGraph, start) {
  // TODO
}
`,
      solutionCode: `function hasCircularDependency(fixtureGraph, start) {
  function visit(node, visited) {
    const deps = fixtureGraph[node] ?? [];
    for (const dep of deps) {
      if (dep === start) return true;
      if (visited.has(dep)) continue;
      visited.add(dep);
      if (visit(dep, visited)) return true;
    }
    return false;
  }
  return visit(start, new Set());
}`,
      harness: `
        try { window.__report('t1', hasCircularDependency({ a: ["b"], b: ["a"] }, "a") === true, 'a directly circular pair should be detected'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', hasCircularDependency({ a: ["b"], b: ["c"], c: [] }, "a") === false, 'a valid, non-circular chain should not be flagged'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', hasCircularDependency({ a: ["b"], b: ["c"], c: ["a"] }, "a") === true, 'an indirect cycle through multiple fixtures should be detected'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "detects a direct, two-fixture circular dependency" },
        { id: "t2", description: "does not flag a valid, non-circular dependency chain" },
        { id: "t3", description: "detects an indirect cycle spanning multiple fixtures" },
      ],
      hints: [
        "This models a real, practical framework-design hazard -- a fixture that (directly or indirectly) depends on itself can never actually be constructed.",
        "A visited Set prevents infinite recursion while still correctly finding a cycle that leads back to the original start node.",
      ],
    },
    independentExercise: {
      id: "tafe-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models choosing fixture depth based on genuine reuse only -- no real fixture is created. Write shouldExtractSeparateFixture(usedByMultipleTests, isIndependentlyMeaningful): return true only if BOTH are true.",
      starterCode: `function shouldExtractSeparateFixture(usedByMultipleTests, isIndependentlyMeaningful) {
  // TODO
}
`,
      solutionCode: `function shouldExtractSeparateFixture(usedByMultipleTests, isIndependentlyMeaningful) {
  return usedByMultipleTests && isIndependentlyMeaningful;
}`,
      harness: `
        try { window.__report('t1', shouldExtractSeparateFixture(true, true) === true, 'genuinely reused, independently meaningful setup should be extracted'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldExtractSeparateFixture(false, true) === false, 'setup used by only one test is not worth extracting yet, even if meaningful'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', shouldExtractSeparateFixture(true, false) === false, 'setup with no independent meaning should stay inline even if repeated'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description:
            "extracts a fixture when both genuine reuse and independent meaning are present",
        },
        { id: "t2", description: "does not extract for single-use setup" },
        { id: "t3", description: "does not extract setup with no independent meaning" },
      ],
      hints: [
        "This models the honest tradeoff this lesson discusses -- extraction should be deliberate, not mechanical.",
        "Requiring BOTH conditions models avoiding two opposite mistakes: over-extracting trivial setup, and under-extracting genuinely reusable logic.",
      ],
    },
    commonMistakes: [
      "Reimplementing the same setup logic (like a login flow) directly inside multiple tests instead of extracting it into a shared, composable fixture -- a later change to that setup then requires updating every duplicated copy.",
      "Building fixture dependency chains so deep that it becomes hard to trace what setup work actually happens before a given test runs -- composition should serve clarity, not obscure it.",
      "Mechanically extracting every small piece of setup into its own fixture regardless of whether it's genuinely reused or independently meaningful -- this adds indirection without adding real value.",
    ],
    quiz: [
      {
        id: "tafe-q4-1",
        prompt: "In what sense is a Playwright fixture a form of dependency injection?",
        choices: [
          "It isn't; the term doesn't apply to test fixtures at all",
          "A test declares WHAT it needs as a parameter, without containing the logic for HOW that thing is actually constructed -- the fixture definition owns construction in one place",
          "Fixtures inject actual network dependencies into a test",
          "Dependency injection only applies to backend application code, never to tests",
        ],
        correctIndex: 1,
        explanation:
          "A test that declares { loggedInPage } as a parameter is depending on that value without knowing or repeating how it's built -- the fixture owns that construction logic in exactly one place, which is the same core idea dependency injection provides in application code.",
      },
      {
        id: "tafe-q4-2",
        prompt:
          "Why does composing fixtures (one fixture depending on another) help avoid duplicated setup logic?",
        choices: [
          "It doesn't; composition has no effect on duplication",
          "A higher-level fixture (like loggedInPage) can reuse a lower-level fixture (like testUser) instead of every test reimplementing the full setup chain independently",
          "Composed fixtures always run faster than standalone ones",
          "Fixture composition is only relevant for API testing, not UI testing",
        ],
        correctIndex: 1,
        explanation:
          "Without composition, every test (or fixture) needing a logged-in page would need to reimplement the login flow itself -- composing loggedInPage from a lower-level testUser fixture means that logic exists in exactly one reusable place.",
      },
      {
        id: "tafe-q4-3",
        prompt:
          "What's the honest tradeoff between many small, composed fixtures and fewer, larger ones?",
        choices: [
          "There is no real tradeoff; more fixtures is always strictly better",
          "Many small fixtures are simpler and more reusable individually, but a very deep chain can be harder to trace; fewer, larger fixtures are more immediately readable but risk duplication and are harder to reuse partially",
          "Fixture count has no effect on readability or reuse",
          "Fewer, larger fixtures always run faster",
        ],
        correctIndex: 1,
        explanation:
          "Both extremes have real costs -- excessive fixture depth can obscure what setup actually runs before a test, while overly large, monolithic fixtures risk duplicated logic and can't be reused partially; the goal is deliberate composition around genuine, reusable units.",
      },
    ],
    takeaway:
      "Treat fixtures as dependency injection -- tests declare what they need, fixtures own how it's constructed. Compose fixtures from smaller, genuinely reusable pieces to avoid duplicated setup logic, but stay deliberate about depth -- extract a fixture when it's both reused and independently meaningful, not mechanically.",
    summary:
      "A fixture lets a test declare a dependency without containing the logic to construct it, mirroring dependency injection in application code. Composing fixtures from other fixtures (like loggedInPage depending on testUser) avoids duplicating setup logic across many tests. Fixture depth is a genuine, honest tradeoff between simplicity/reusability and traceability -- extraction should be deliberate, based on genuine reuse and independent meaning, not mechanical.",
    nextLessonSlug: "tafe-page-component-models",
  },
  {
    id: "tafe-page-component-models",
    slug: "tafe-page-component-models",
    title: "Page Objects and Component Objects at Framework Scale",
    description:
      "Extending the page-object idea from a single page to reusable component objects for UI pieces that appear across many pages, and deciding when a full page object is actually justified.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 5,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["tafe-fixtures-di"],
    objectives: [
      "Explain why a component object (for a UI piece reused across many pages) is a distinct, useful idea from a page object",
      "Design a component object's responsibilities so it stays reusable across the pages that embed it",
      "Decide when a full page object is justified vs. when it's unnecessary overhead for a framework",
    ],
    skills: ["test-automation", "page-objects", "typescript"],
    tech: [
      { name: "TypeScript", version: "5.x" },
      { name: "Playwright", version: "1.62.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright Docs: Page Object Models", url: "https://playwright.dev/docs/pom" },
    ],
    keywords: ["page objects", "component objects", "typescript", "playwright"],
    explanation: `**No real page or component executes in this lesson's exercises -- they model page-object and component-object responsibility decisions as data, using genuine JavaScript/TypeScript execution.**

A **page object** wraps one specific page's locators and actions behind a small, meaningful API — this idea should already be familiar from a foundational Playwright course. At framework scale, a genuinely common situation arises: some UI pieces (a navigation bar, a course-card component, a confirmation modal) appear on **many different pages**, not just one. Encoding that shared UI's locators and interactions separately inside every page object that happens to embed it duplicates the exact same logic across all of them, and a change to that shared piece then requires updating every duplicated copy — precisely the same maintenance problem this course has already covered for setup logic and test data.

A **component object** solves this the same way a fixture solves duplicated setup: it's a small, focused class or object representing one reusable UI piece, owning that piece's locators and interactions in exactly one place — and any page object whose page happens to embed that component simply holds an instance of it, rather than re-declaring its locators. A \`NavigationBar\` component object, for example, can be instantiated by a \`DashboardPage\`, a \`CourseOverviewPage\`, and a \`ProfilePage\` alike, each just delegating navigation-related actions to the same shared component instance — a change to the nav bar's markup or behavior is then a one-place fix, not a scattered one.

Not every piece of UI justifies a dedicated page or component object — this is a genuine, honest tradeoff worth naming explicitly: a page or component visited or interacted with by only a single test, with simple, one-off locators, may not be worth the abstraction overhead of a dedicated class at all — a plain, inline locator inside that one test can be perfectly appropriate. The decision mirrors the fixture-depth tradeoff from the previous lesson: extract a page or component object when it's genuinely reused or meaningfully complex, not mechanically for every page or UI element a framework happens to touch.`,
    example: {
      language: "javascript",
      description:
        "Modeling detecting shared-component duplication across page objects, and a page-object-worthiness decision, as data.",
      code: `function findDuplicatedComponentUsage(pageObjectDefinitions) {
  // Models detecting the SAME component's locators declared inside multiple page objects independently.
  const componentLocatorCounts = {};
  for (const page of pageObjectDefinitions) {
    for (const component of page.inlineComponents) {
      componentLocatorCounts[component] = (componentLocatorCounts[component] ?? 0) + 1;
    }
  }
  return Object.entries(componentLocatorCounts).filter(([, count]) => count > 1).map(([name]) => name);
}
const pages = [
  { name: "DashboardPage", inlineComponents: ["navBar"] },
  { name: "ProfilePage", inlineComponents: ["navBar"] },
  { name: "LoginPage", inlineComponents: [] },
];
console.log(findDuplicatedComponentUsage(pages)); // ["navBar"] -- duplicated across 2 page objects, a real extraction candidate

function isPageObjectJustified(usedByMultipleTests, hasNonTrivialInteractions) {
  return usedByMultipleTests || hasNonTrivialInteractions;
}
console.log(isPageObjectJustified(false, false)); // false -- a single, simple, one-off locator doesn't need a dedicated class`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call findDuplicatedComponentUsage against a list where NO component repeats across page objects, and confirm it correctly returns an empty array.",
      code: `function findDuplicatedComponentUsage(pageObjectDefinitions) {
  const componentLocatorCounts = {};
  for (const page of pageObjectDefinitions) {
    for (const component of page.inlineComponents) {
      componentLocatorCounts[component] = (componentLocatorCounts[component] ?? 0) + 1;
    }
  }
  return Object.entries(componentLocatorCounts).filter(([, count]) => count > 1).map(([name]) => name);
}
console.log(findDuplicatedComponentUsage([{ name: "A", inlineComponents: ["footer"] }, { name: "B", inlineComponents: ["sidebar"] }]));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models finding which components are genuinely worth extracting only -- no real page object is scanned. Write componentsWorthExtracting(pageObjectDefinitions), returning an array of component names used by MORE than one page object, sorted alphabetically.",
      starterCode: `function componentsWorthExtracting(pageObjectDefinitions) {
  // TODO
}
`,
      solutionCode: `function componentsWorthExtracting(pageObjectDefinitions) {
  const counts = {};
  for (const page of pageObjectDefinitions) {
    for (const component of page.inlineComponents) {
      counts[component] = (counts[component] ?? 0) + 1;
    }
  }
  return Object.entries(counts).filter(([, count]) => count > 1).map(([name]) => name).sort();
}`,
      harness: `
        const pages = [
          { name: "A", inlineComponents: ["navBar", "footer"] },
          { name: "B", inlineComponents: ["navBar"] },
          { name: "C", inlineComponents: ["footer"] },
        ];
        try { window.__report('t1', JSON.stringify(componentsWorthExtracting(pages)) === JSON.stringify(["footer","navBar"]), 'should find both navBar and footer, alphabetically sorted'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', componentsWorthExtracting([{ name: "X", inlineComponents: ["onlyHere"] }]).length === 0, 'a component used by only one page should not be flagged'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', componentsWorthExtracting([]).length === 0, 'an empty list of page objects should return an empty result'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly identifies multiple genuinely shared components, sorted",
        },
        { id: "t2", description: "correctly excludes a component used by only one page" },
        { id: "t3", description: "correctly handles an empty input" },
      ],
      hints: [
        "Counting occurrences per component name across ALL page objects, then filtering for count > 1, mirrors finding genuine, cross-page duplication.",
        "This models exactly the signal that should drive extracting a component object: real reuse across more than one page, not hypothetical future reuse.",
      ],
    },
    independentExercise: {
      id: "tafe-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models the page-object-worthiness decision only -- no real page is analyzed. Write isPageObjectJustified(usedByMultipleTests, interactionCount): return true if usedByMultipleTests is true, OR interactionCount is greater than 3 (a simple threshold modeling non-trivial complexity).",
      starterCode: `function isPageObjectJustified(usedByMultipleTests, interactionCount) {
  // TODO
}
`,
      solutionCode: `function isPageObjectJustified(usedByMultipleTests, interactionCount) {
  return usedByMultipleTests || interactionCount > 3;
}`,
      harness: `
        try { window.__report('t1', isPageObjectJustified(true, 1) === true, 'reuse across multiple tests alone should justify a page object'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isPageObjectJustified(false, 5) === true, 'sufficient complexity alone should justify a page object, even with only one test'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isPageObjectJustified(false, 1) === false, 'a single test with minimal interactions should not require a dedicated page object'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "justifies extraction based on reuse alone" },
        {
          id: "t2",
          description: "justifies extraction based on complexity alone, even without reuse",
        },
        {
          id: "t3",
          description:
            "correctly avoids unnecessary extraction for simple, single-use interactions",
        },
      ],
      hints: [
        "This models the honest tradeoff this lesson names explicitly -- either genuine reuse OR meaningful complexity is enough to justify the abstraction, but neither alone is a hard requirement for every single page.",
        "A plain, inline locator remains perfectly appropriate for a simple, single-use interaction.",
      ],
    },
    commonMistakes: [
      "Duplicating a shared UI piece's locators (like a navigation bar) separately inside every page object that embeds it, instead of extracting one reusable component object -- a later markup change then requires updating every duplicated copy.",
      "Mechanically creating a dedicated page object class for every single page a framework touches, even ones visited by exactly one simple test -- this adds real overhead without a corresponding real benefit.",
      "Giving a component object responsibilities beyond the UI piece it represents (like unrelated page-level navigation logic) -- this couples it to a specific page's context and undermines its reusability across the pages that embed it.",
    ],
    quiz: [
      {
        id: "tafe-q5-1",
        prompt:
          "Why introduce a separate COMPONENT object (distinct from a page object) for something like a navigation bar that appears on many pages?",
        choices: [
          "Component objects are required by Playwright's API",
          "Without one, every page object embedding that shared UI piece would duplicate its locators and interactions independently, requiring every copy to be updated on any change",
          "Component objects make tests run faster",
          "There's no real reason; page objects alone are always sufficient",
        ],
        correctIndex: 1,
        explanation:
          "A component object centralizes a shared UI piece's locators and interactions in one place, reused by every page object that embeds it -- avoiding the same duplicated-logic maintenance problem this course has already covered for setup and test data.",
      },
      {
        id: "tafe-q5-2",
        prompt: "How does a page object embedding a shared component typically use it?",
        choices: [
          "It re-declares the component's locators independently, for consistency",
          "It holds an instance of the component object and delegates related actions to it, rather than duplicating its locators",
          "Component objects cannot be used inside page objects",
          "It ignores the component object and always interacts with the page directly",
        ],
        correctIndex: 1,
        explanation:
          "A page object that embeds a shared component simply holds and delegates to that component instance -- this is exactly what keeps the component's locators and behavior defined in one reusable place.",
      },
      {
        id: "tafe-q5-3",
        prompt: "When might a dedicated page object NOT be justified for a given page?",
        choices: [
          "Never; every page always needs its own dedicated page object",
          "When the page is visited by only a single, simple test with minimal, one-off interactions -- a plain, inline locator can be perfectly appropriate there",
          "Only if the page has zero interactive elements at all",
          "Page objects are always justified regardless of usage",
        ],
        correctIndex: 1,
        explanation:
          "This lesson names the tradeoff explicitly: a page or component visited by only one test with simple, one-off interactions may not be worth the abstraction overhead -- extraction should track genuine reuse or complexity, not be applied mechanically everywhere.",
      },
    ],
    takeaway:
      "Extract a component object for UI pieces genuinely reused across multiple pages, to avoid duplicating their locators and interactions. Reserve a dedicated page object for pages that are either reused across multiple tests or meaningfully complex -- a simple, single-use page doesn't require the abstraction.",
    summary:
      "A component object centralizes a shared UI piece's (like a nav bar's) locators and interactions in one reusable place, avoiding duplication across every page object that embeds it -- page objects hold and delegate to component instances rather than re-declaring their locators. Both page and component objects are worth their overhead specifically when there's genuine reuse or meaningful complexity, not mechanically for every page a framework touches.",
    nextLessonSlug: "tafe-service-clients",
  },
  {
    id: "tafe-service-clients",
    slug: "tafe-service-clients",
    title: "Service Clients and Database Validation Boundaries",
    description:
      "Wrapping raw API calls behind a typed service-client layer instead of scattering request-building logic across tests, and deciding honestly where a database-validation boundary belongs in a framework that has no real database access.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 6,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["tafe-page-component-models"],
    objectives: [
      "Explain why a service-client layer is preferable to scattering raw API request logic across individual tests",
      "Design a service client's method signatures around business intent, not raw HTTP mechanics",
      "Explain how to design a DB-validation adapter's INTERFACE honestly, without ever embedding real database credentials in a learning framework",
    ],
    skills: ["test-automation", "api-testing", "typescript"],
    tech: [
      { name: "TypeScript", version: "5.x" },
      { name: "Playwright", version: "1.62.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright Docs: API Testing", url: "https://playwright.dev/docs/api-testing" },
    ],
    keywords: ["service clients", "api testing", "database validation", "typescript"],
    explanation: `**No real API call or database connection is made by this lesson's exercises -- they model service-client design decisions as data, using genuine JavaScript/TypeScript execution.**

Just as a page object wraps a page's raw locators behind a meaningful API, a **service client** wraps a set of related API calls (say, everything related to course enrollment) behind a small, typed class or module with methods named for **business intent** — \`enrollmentClient.enrollInCourse(userId, courseId)\` rather than a raw \`request.post('/api/v1/enrollments', { body: JSON.stringify({...}) })\` scattered inline inside a test. This matters for the exact same reason a page object matters: when the underlying API's URL structure, headers, or payload shape changes, there's exactly one place to update — the service client — instead of hunting down every test that happened to construct that request inline.

A well-designed service client's methods are named and shaped around **what the caller is trying to accomplish**, not around HTTP mechanics — a test calling \`enrollmentClient.enrollInCourse(...)\` doesn't need to know or care whether that's implemented as a POST to \`/enrollments\` or a POST to \`/users/{id}/enrollments\`; that's exactly the kind of implementation detail the service client is meant to hide. This also makes tests significantly more resilient to a pure API-shape refactor that doesn't change the actual behavior — the service client absorbs that change, and every test using it keeps working unmodified.

**Direct database validation** — reading a database directly to confirm a test's side effect, bypassing the API entirely — can be a legitimately valuable technique in a real production framework, for verifying something the API genuinely doesn't expose. This course's guided project designs the **interface** such an adapter would have (what methods it would expose, what it would return, how a test would use it) honestly and completely — but this platform has no real database connection available to it, and never will pretend to have one: any DB-validation adapter built in this course's exercises or guided project is deliberately a documented, honestly-labeled interface design and/or an in-memory mock implementation, never a connection to a real, live database, and never containing a real credential of any kind.`,
    example: {
      language: "javascript",
      description:
        "Modeling a service-client method wrapping raw request construction, and a DB-adapter interface's honest-mock boundary, as data.",
      code: `function buildEnrollmentRequest(userId, courseId) {
  // This is what the SERVICE CLIENT owns internally -- callers never see this shape directly.
  return { method: "POST", path: "/api/v1/enrollments", body: { userId, courseId } };
}
function enrollInCourse(userId, courseId) {
  // The service client's PUBLIC method -- named for business intent, not HTTP mechanics.
  const request = buildEnrollmentRequest(userId, courseId);
  return { intent: "enroll-in-course", request }; // (a real client would actually send this; this models the shape only)
}
console.log(enrollInCourse("user-1", "course-101").request.path); // "/api/v1/enrollments" -- an implementation detail, hidden from callers

function dbValidationMode(hasRealDbConnection) {
  // This platform NEVER has a real DB connection -- this always resolves to the honest, mock mode.
  return hasRealDbConnection ? "real-connection" : "documented-interface-or-mock";
}
console.log(dbValidationMode(false)); // "documented-interface-or-mock" -- the only honest mode available here`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call enrollInCourse with a different userId and courseId, and confirm the returned request body reflects the new values.",
      code: `function buildEnrollmentRequest(userId, courseId) {
  return { method: "POST", path: "/api/v1/enrollments", body: { userId, courseId } };
}
function enrollInCourse(userId, courseId) {
  const request = buildEnrollmentRequest(userId, courseId);
  return { intent: "enroll-in-course", request };
}
console.log(enrollInCourse("user-42", "course-202").request.body);`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models a service-client method hiding raw request construction only -- no real request is sent. Write markLessonComplete(userId, lessonId), returning { intent: 'mark-lesson-complete', request: { method: 'PATCH', path: '/api/v1/progress/' + userId + '/' + lessonId, body: { completed: true } } }.",
      starterCode: `function markLessonComplete(userId, lessonId) {
  // TODO
}
`,
      solutionCode: `function markLessonComplete(userId, lessonId) {
  return {
    intent: "mark-lesson-complete",
    request: { method: "PATCH", path: "/api/v1/progress/" + userId + "/" + lessonId, body: { completed: true } },
  };
}`,
      harness: `
        try { const r = markLessonComplete("user-1", "lesson-9"); window.__report('t1', r.request.method === "PATCH", 'should use PATCH for a completion update'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = markLessonComplete("user-1", "lesson-9"); window.__report('t2', r.request.path === "/api/v1/progress/user-1/lesson-9", 'should build the correct, specific path from both ids'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = markLessonComplete("user-1", "lesson-9"); window.__report('t3', r.intent === "mark-lesson-complete", 'the method\\'s intent should reflect the business action, not the HTTP verb'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "constructs the request with the correct HTTP method" },
        { id: "t2", description: "constructs the correct, specific request path from both ids" },
        { id: "t3", description: "exposes a business-intent name, not a raw HTTP description" },
      ],
      hints: [
        "This models exactly what a service-client method hides -- a caller only ever sees markLessonComplete(userId, lessonId), never the raw PATCH request shape.",
        "Building the path by concatenating both ids mirrors a real REST-style resource path.",
      ],
    },
    independentExercise: {
      id: "tafe-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models designing a DB-validation adapter's method signature honestly, without a real connection -- no real database is touched. Write describeDbValidationCall(entity, id): return { method: 'find' + entity, arguments: [id], mode: 'documented-interface-or-mock', note: 'No real database connection exists in this learning environment.' }.",
      starterCode: `function describeDbValidationCall(entity, id) {
  // TODO
}
`,
      solutionCode: `function describeDbValidationCall(entity, id) {
  return {
    method: "find" + entity,
    arguments: [id],
    mode: "documented-interface-or-mock",
    note: "No real database connection exists in this learning environment.",
  };
}`,
      harness: `
        try { const r = describeDbValidationCall("Enrollment", "enr-1"); window.__report('t1', r.method === "findEnrollment", 'should build a correctly named method from the entity'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = describeDbValidationCall("Enrollment", "enr-1"); window.__report('t2', r.mode === "documented-interface-or-mock", 'mode should always be the honest, non-real-connection value in this environment'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = describeDbValidationCall("User", "user-1"); window.__report('t3', r.arguments[0] === "user-1", 'should pass the id through as an argument correctly'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "builds a correctly named method from the entity name" },
        { id: "t2", description: "always reports the honest, mock-only mode" },
        { id: "t3", description: "passes the id argument through correctly" },
      ],
      hints: [
        "This models designing an INTERFACE honestly -- the method exists and is correctly shaped, but it always, explicitly reports that no real connection backs it in this environment.",
        "A DB-validation adapter's real value in a production framework is its interface design; the actual backing connection is an environment-specific detail this course never fakes.",
      ],
    },
    commonMistakes: [
      "Constructing raw API requests (URL, headers, body) inline inside individual tests instead of behind a service-client method -- an API-shape change then requires hunting down and updating every test that built that request directly.",
      "Naming service-client methods after HTTP mechanics (like postToEnrollmentsEndpoint) instead of business intent (like enrollInCourse) -- this leaks an implementation detail into every caller and makes a pure API refactor visible to tests that shouldn't need to care.",
      "Ever attempting to embed a real database connection or real credentials into this platform's learner-facing code to make a DB-validation exercise feel more 'real' -- this platform has no real database access and must never pretend to.",
    ],
    quiz: [
      {
        id: "tafe-q6-1",
        prompt:
          "Why wrap raw API request construction inside a service-client method instead of building requests inline inside tests?",
        choices: [
          "There is no real benefit; inline requests are equally maintainable",
          "When the API's URL structure, headers, or payload shape changes, there's exactly one place (the service client) to update, instead of hunting down every test that constructed that request inline",
          "Service clients are required by the Playwright API testing feature",
          "Inline requests are always slower to execute",
        ],
        correctIndex: 1,
        explanation:
          "This mirrors why page objects matter for the UI layer -- centralizing request construction in one service-client method means an API-shape change is a single update, not a scattered hunt across every test that built that request directly.",
      },
      {
        id: "tafe-q6-2",
        prompt:
          "Why should a service-client method like enrollInCourse(userId, courseId) be named around business intent rather than HTTP mechanics?",
        choices: [
          "Business-intent names are just a stylistic preference with no functional effect",
          "A caller doesn't need to know or care about the underlying HTTP verb or path -- naming around intent hides that implementation detail, so a pure API-shape refactor doesn't ripple out to every calling test",
          "HTTP-mechanics names are not allowed by TypeScript",
          "Business-intent names make requests execute faster",
        ],
        correctIndex: 1,
        explanation:
          "Naming around business intent hides the HTTP implementation detail from callers -- a test calling enrollInCourse(...) keeps working unmodified even if the underlying request's URL or method changes, as long as the business outcome stays the same.",
      },
      {
        id: "tafe-q6-3",
        prompt:
          "How does this course honestly handle direct database validation, given the platform has no real database access?",
        choices: [
          "It adds a real database connection with test credentials to make the exercise feel authentic",
          "It designs and documents the adapter's INTERFACE (method names, arguments, return shape) honestly, using an in-memory mock or documented design -- never a real connection or real credentials",
          "It skips database validation entirely, with no discussion of it at all",
          "It asks the learner to supply their own production database credentials",
        ],
        correctIndex: 1,
        explanation:
          "The course teaches the DESIGN of a DB-validation adapter's interface honestly and completely, while being explicit that no real connection or credential is ever involved in this learning environment -- exactly the same execution-honesty standard this course applies everywhere else.",
      },
    ],
    takeaway:
      "Wrap related API calls behind a typed service client with business-intent-named methods, so an API-shape change requires updating one place, not every test that built a request inline. Design a DB-validation adapter's interface honestly and completely, while never embedding a real database connection or real credentials into this learning platform.",
    summary:
      "A service client centralizes API request construction behind methods named for business intent (enrollInCourse) rather than HTTP mechanics (postToEnrollments) -- this absorbs pure API-shape changes without rippling out to every calling test. Direct database validation is a legitimate real-framework technique, but this course designs its interface honestly, using documented designs or in-memory mocks, since this platform has no real database connection and never pretends to.",
    nextLessonSlug: "tafe-assertion-design-dsl",
  },
  {
    id: "tafe-assertion-design-dsl",
    slug: "tafe-assertion-design-dsl",
    title: "Assertion Design and Building a Small Test DSL",
    description:
      "Writing custom domain-level assertions that read like the business language of the product, and when a small, purpose-built DSL genuinely earns its complexity in a test framework.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 7,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["tafe-service-clients"],
    objectives: [
      "Design a custom, domain-level assertion that communicates intent more clearly than a generic assertion would",
      "Explain the failure-message-quality difference between a generic assertion and a well-designed custom one",
      "Explain when a small internal DSL (domain-specific language) is genuinely justified in a test framework, and when it's needless complexity",
    ],
    skills: ["test-automation", "assertions", "typescript"],
    tech: [
      { name: "TypeScript", version: "5.x" },
      { name: "Playwright", version: "1.62.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Playwright Docs: Extending Expect",
        url: "https://playwright.dev/docs/test-assertions#custom-expect-message",
      },
    ],
    keywords: ["assertions", "dsl", "test design", "typescript"],
    explanation: `**No real assertion runs against a real system in this lesson's exercises -- they model assertion-design decisions as data, using genuine JavaScript/TypeScript execution.**

A **generic assertion** (\`expect(enrollment.status).toBe("active")\`) is functionally correct but communicates relatively little when it fails — the failure message reports that one field didn't match one expected value, with no framing of *why* that field or that value matters in the business domain. A **custom, domain-level assertion** (\`expectEnrollmentToBeActive(enrollment)\`) wraps the same underlying check but gives it a name and a purpose-built failure message that speaks the product's actual language — "expected the enrollment to be active, but it was 'cancelled'" is immediately meaningful to anyone reading a failed test report, including someone unfamiliar with the raw data shape being checked.

This isn't purely cosmetic — a custom assertion is a genuine, reusable **unit of domain knowledge**: the logic for "what does it actually mean for an enrollment to be considered active" (maybe it requires \`status === "active"\` AND a non-expired \`expiresAt\`) lives in exactly one place, rather than being reconstructed, and potentially reconstructed slightly differently or incompletely, inside every test that needs to check it. A change to that business rule (a new condition added to what counts as "active") then requires updating one assertion function, not every test that independently checked the same thing.

Building a small internal **DSL** — a set of purpose-built helper functions or a fluent chain that reads close to natural, domain language (\`await enrollAndComplete(user, course)\`, or a fluent \`given(user).enrolledIn(course).shouldSee(...)\`) is a genuine, further step past individual custom assertions, and it's a real, honest tradeoff, not an automatic win: a well-designed DSL can make tests dramatically more readable and can encode common workflows in one place — but a DSL is also a small language of its own that every contributor has to learn, and an over-engineered or inconsistent one can end up **harder** to understand than the plain, explicit code it replaced. A DSL earns its complexity specifically when a workflow or a check recurs constantly across the suite and the plain version has become genuinely repetitive and noisy — not merely because a DSL feels more sophisticated.`,
    example: {
      language: "javascript",
      description:
        "Modeling a custom assertion's more meaningful failure message and a DSL-worthiness decision, as data.",
      code: `function genericAssertionMessage(field, actual, expected) {
  return "Expected " + field + " to be " + JSON.stringify(expected) + " but got " + JSON.stringify(actual);
}
function domainAssertionMessage(enrollment) {
  if (enrollment.status !== "active") {
    return "Expected the enrollment to be active, but it was '" + enrollment.status + "'";
  }
  return null; // passes
}
console.log(genericAssertionMessage("status", "cancelled", "active")); // technically correct, but generic
console.log(domainAssertionMessage({ status: "cancelled" }));           // speaks the product's own language directly

function isDslJustified(workflowRepeatsAcrossManyTests, plainVersionIsNoisy) {
  return workflowRepeatsAcrossManyTests && plainVersionIsNoisy;
}
console.log(isDslJustified(true, true));   // true -- a genuinely recurring, noisy workflow
console.log(isDslJustified(false, false)); // false -- a DSL here would just be needless complexity`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call domainAssertionMessage with a genuinely active enrollment, and confirm it correctly returns null (no failure).",
      code: `function domainAssertionMessage(enrollment) {
  if (enrollment.status !== "active") {
    return "Expected the enrollment to be active, but it was '" + enrollment.status + "'";
  }
  return null;
}
console.log(domainAssertionMessage({ status: "active" }));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models a custom domain assertion combining two conditions only -- no real assertion runs. Write expectEnrollmentActive(enrollment, nowTimestamp): return null if status is 'active' AND expiresAt > nowTimestamp. Otherwise, return a specific message naming which condition failed ('status was ...' or 'expired at ...').",
      starterCode: `function expectEnrollmentActive(enrollment, nowTimestamp) {
  // TODO
}
`,
      solutionCode: `function expectEnrollmentActive(enrollment, nowTimestamp) {
  if (enrollment.status !== "active") {
    return "Expected active status, but status was '" + enrollment.status + "'";
  }
  if (enrollment.expiresAt <= nowTimestamp) {
    return "Expected a non-expired enrollment, but it expired at " + enrollment.expiresAt;
  }
  return null;
}`,
      harness: `
        try { window.__report('t1', expectEnrollmentActive({ status: "cancelled", expiresAt: 9999999999 }, 1000) !== null, 'a non-active status should fail with a message'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', expectEnrollmentActive({ status: "active", expiresAt: 500 }, 1000) !== null, 'an active but expired enrollment should still fail'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', expectEnrollmentActive({ status: "active", expiresAt: 9999999999 }, 1000) === null, 'a genuinely active, non-expired enrollment should pass (null)'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly fails a non-active enrollment with a specific message",
        },
        { id: "t2", description: "correctly fails an active-but-expired enrollment" },
        { id: "t3", description: "correctly passes a genuinely active, non-expired enrollment" },
      ],
      hints: [
        "Checking status first, then expiresAt, lets the failure message name EXACTLY which of the two conditions was the actual problem.",
        "This models the real value of a domain assertion: 'active' turned out to mean two separate conditions combined, encoded correctly in exactly one place.",
      ],
    },
    independentExercise: {
      id: "tafe-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models the DSL-worthiness decision with a third factor only -- no real DSL is built. Write isDslJustified(workflowRepeatsAcrossManyTests, plainVersionIsNoisy, teamIsSmallAndUnfamiliar): return true only if the workflow repeats AND the plain version is noisy AND NOT teamIsSmallAndUnfamiliar (a DSL has a real learning-curve cost a small, unfamiliar team may not be ready to pay).",
      starterCode: `function isDslJustified(workflowRepeatsAcrossManyTests, plainVersionIsNoisy, teamIsSmallAndUnfamiliar) {
  // TODO
}
`,
      solutionCode: `function isDslJustified(workflowRepeatsAcrossManyTests, plainVersionIsNoisy, teamIsSmallAndUnfamiliar) {
  return workflowRepeatsAcrossManyTests && plainVersionIsNoisy && !teamIsSmallAndUnfamiliar;
}`,
      harness: `
        try { window.__report('t1', isDslJustified(true, true, false) === true, 'a recurring, noisy workflow with a ready team should justify a DSL'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isDslJustified(true, true, true) === false, 'even a recurring, noisy workflow should be reconsidered if the team is small and unfamiliar with the DSL approach'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isDslJustified(false, false, false) === false, 'a non-recurring, non-noisy workflow should never justify a DSL'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "justifies a DSL when all favorable conditions hold" },
        {
          id: "t2",
          description:
            "correctly withholds justification when the team factor is unfavorable, even with a recurring workflow",
        },
        {
          id: "t3",
          description: "correctly withholds justification for a non-recurring, non-noisy workflow",
        },
      ],
      hints: [
        "This models an honest, additional real-world factor: a DSL has a genuine learning-curve cost, which matters most for a small or unfamiliar team.",
        "All three conditions must point the same direction for the DSL to be genuinely justified -- this models avoiding an isolated, feel-good decision that ignores real team context.",
      ],
    },
    commonMistakes: [
      "Relying only on generic assertions (expect(x).toBe(y)) for a check that has real domain meaning -- a failed generic assertion communicates far less than a purpose-built domain assertion would to whoever reads the failure later.",
      "Reconstructing the same business rule (like 'what counts as an active enrollment') slightly differently across multiple tests, instead of encoding it once in a single, reusable domain assertion.",
      "Building an elaborate internal DSL before a workflow has actually proven itself to be genuinely recurring and noisy in its plain form -- a DSL built too early adds a real learning-curve cost without yet having earned it.",
    ],
    quiz: [
      {
        id: "tafe-q7-1",
        prompt:
          "Why does a custom, domain-level assertion (like expectEnrollmentToBeActive) communicate more on failure than a generic one (expect(x).toBe(y))?",
        choices: [
          "There is no real difference; both produce identical failure information",
          "A custom assertion's failure message can speak the product's own business language and name exactly which domain condition failed, rather than reporting a raw field-vs-value mismatch",
          "Generic assertions cannot report a failure at all",
          "Custom assertions always run faster",
        ],
        correctIndex: 1,
        explanation:
          "A well-designed domain assertion's failure message is framed around what actually matters in the business domain -- 'expected the enrollment to be active, but it was cancelled' is immediately meaningful in a way a raw field-value mismatch report is not.",
      },
      {
        id: "tafe-q7-2",
        prompt: "Why is a custom assertion considered a reusable 'unit of domain knowledge'?",
        choices: [
          "It isn't; assertions have no relationship to domain knowledge",
          "The logic for what a business rule actually means (like what counts as 'active') lives in exactly one place, instead of being reconstructed, possibly inconsistently, inside every test that checks it",
          "Domain knowledge cannot be expressed in TypeScript",
          "Custom assertions automatically update themselves when business rules change",
        ],
        correctIndex: 1,
        explanation:
          "Encoding a business rule once, inside a shared assertion function, means a later change to that rule requires updating one place -- avoiding both duplication and the risk of different tests checking the same rule slightly inconsistently.",
      },
      {
        id: "tafe-q7-3",
        prompt: "What's the honest tradeoff in building a small internal test DSL?",
        choices: [
          "There is no tradeoff; a DSL is always strictly better than plain code",
          "A well-designed DSL can make recurring workflows dramatically more readable, but it's also a small language every contributor has to learn -- an over-engineered or premature one can end up harder to understand than the plain code it replaced",
          "DSLs are only usable in non-TypeScript projects",
          "A DSL always makes tests run faster, with no downside",
        ],
        correctIndex: 1,
        explanation:
          "A DSL is a genuine, honest tradeoff -- real readability gains for a recurring, noisy workflow, against a real learning-curve cost for every contributor -- which is why this lesson frames DSL adoption as something that should be earned, not assumed.",
      },
    ],
    takeaway:
      "Write custom, domain-level assertions for checks with real business meaning -- they communicate far more on failure and centralize business-rule logic in one place. Build a small internal DSL only once a workflow has proven itself genuinely recurring and noisy in its plain form, and only when the team is positioned to absorb its real learning-curve cost.",
    summary:
      "A custom, domain-level assertion (like expectEnrollmentToBeActive) produces a far more meaningful failure message than a generic one, and centralizes a business rule's logic in one reusable place instead of scattering slightly-inconsistent reimplementations across tests. A small internal DSL is a genuine, honest tradeoff between real readability gains and a real learning-curve cost -- it's justified specifically by a workflow that's genuinely recurring and noisy in its plain form, not by DSLs simply feeling more sophisticated.",
    nextLessonSlug: "tafe-tagging-test-selection",
  },
  {
    id: "tafe-tagging-test-selection",
    slug: "tafe-tagging-test-selection",
    title: "Tagging, Test Selection, Parallelism, and Isolation",
    description:
      "Designing a tagging scheme that lets a suite be sliced into meaningful subsets on demand, and what genuine test isolation requires to make safe, correct parallel execution possible.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 8,
    difficulty: "advanced",
    estimatedMinutes: 21,
    prerequisites: ["tafe-assertion-design-dsl"],
    objectives: [
      "Design a tagging scheme that lets a suite be selectively run by concern (smoke, regression, a feature area) without duplicating test files",
      "Explain what genuine test isolation requires, beyond simply not sharing obvious global state",
      "Explain why parallel execution amplifies the cost of a test-isolation bug that might otherwise go unnoticed",
    ],
    skills: ["test-automation", "test-organization", "parallelism", "typescript"],
    tech: [
      { name: "TypeScript", version: "5.x" },
      { name: "Playwright", version: "1.62.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Playwright Docs: Annotations and Tags",
        url: "https://playwright.dev/docs/test-annotations",
      },
      {
        label: "Playwright Docs: Parallelism and Sharding",
        url: "https://playwright.dev/docs/test-parallel",
      },
    ],
    keywords: ["tags", "test selection", "parallelism", "isolation", "playwright"],
    explanation: `**No real test suite is executed in this lesson's exercises -- they model tag-based selection and isolation-risk decisions as data, using genuine JavaScript/TypeScript execution.**

A useful **tagging scheme** lets one shared test suite be sliced into meaningful, run-on-demand subsets by concern — a fast \`@smoke\` subset for a pre-merge check, a broader \`@regression\` subset for a nightly run, or a \`@checkout\` subset scoped to one feature area for a targeted investigation — without maintaining separate, duplicated test files for each purpose. The same underlying test can carry multiple tags at once (a checkout test can be both \`@smoke\` and \`@checkout\`), and a genuinely useful scheme keeps tags meaningful and non-overlapping in purpose — a handful of well-defined, consistently applied tags is far more useful long-term than dozens of ad-hoc, inconsistently used ones that no one remembers the exact meaning of.

**Test isolation** means one test's execution cannot affect another test's outcome, regardless of execution order or whether they run in parallel — and this requires more discipline than simply "don't use a literal global variable." A test that creates a user with a hardcoded email, or that queries "the first item in a list" instead of a specifically-identified item it created itself, or that depends on a previous test having already run and left the system in a particular state, is **not genuinely isolated**, even though it may never touch an explicit shared variable — this course's earlier lessons on unique test data (Lesson 3) and fixture-scoped setup (Lesson 4) are, in large part, specifically in service of achieving real isolation.

**Parallel execution** doesn't create isolation bugs — it **amplifies** ones that already existed. A genuine isolation bug (two tests colliding on the same hardcoded data, or one test depending on another's leftover state) might pass reliably when a suite happens to run tests sequentially, in a fixed, familiar order, purely by accident — and then fail intermittently, confusingly, and non-deterministically the moment the exact same suite runs in parallel or in a different order, since the accidental ordering that was silently hiding the bug is no longer guaranteed. This is precisely why isolation should be designed in from the start, not treated as a problem to solve only once parallel execution is introduced.`,
    example: {
      language: "javascript",
      description:
        "Modeling filtering tests by tag and detecting a non-isolated test relying on shared, order-dependent state, as data.",
      code: `function testsMatchingTag(tests, tag) {
  return tests.filter((t) => t.tags.includes(tag));
}
const suite = [
  { name: "login works", tags: ["smoke", "auth"] },
  { name: "checkout completes", tags: ["smoke", "checkout"] },
  { name: "detailed refund flow", tags: ["regression", "checkout"] },
];
console.log(testsMatchingTag(suite, "smoke").length);    // 2 -- a fast, targeted subset
console.log(testsMatchingTag(suite, "checkout").length); // 2 -- a feature-scoped subset, independent of the smoke/regression split

function isGenuinelyIsolated(usesUniqueOwnData, dependsOnPriorTestState) {
  return usesUniqueOwnData && !dependsOnPriorTestState;
}
console.log(isGenuinelyIsolated(true, false));  // true -- creates and uses its own uniquely identified data
console.log(isGenuinelyIsolated(false, true));  // false -- a real isolation bug, likely to surface only under parallel/reordered execution`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call testsMatchingTag with 'regression', and confirm it correctly returns only the one regression-tagged test.",
      code: `function testsMatchingTag(tests, tag) {
  return tests.filter((t) => t.tags.includes(tag));
}
const suite = [
  { name: "login works", tags: ["smoke", "auth"] },
  { name: "checkout completes", tags: ["smoke", "checkout"] },
  { name: "detailed refund flow", tags: ["regression", "checkout"] },
];
console.log(testsMatchingTag(suite, "regression"));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models selecting tests matching ALL of several tags (an intersection, not just any match) only -- no real suite runs. Write testsMatchingAllTags(tests, requiredTags), returning tests whose tags array includes EVERY tag in requiredTags.",
      starterCode: `function testsMatchingAllTags(tests, requiredTags) {
  // TODO
}
`,
      solutionCode: `function testsMatchingAllTags(tests, requiredTags) {
  return tests.filter((t) => requiredTags.every((tag) => t.tags.includes(tag)));
}`,
      harness: `
        const suite = [
          { name: "a", tags: ["smoke", "checkout"] },
          { name: "b", tags: ["smoke", "auth"] },
          { name: "c", tags: ["regression", "checkout"] },
        ];
        try { window.__report('t1', testsMatchingAllTags(suite, ["smoke","checkout"]).length === 1, 'should find exactly the one test matching BOTH required tags'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', testsMatchingAllTags(suite, ["smoke"]).length === 2, 'a single required tag should match every test carrying it'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', testsMatchingAllTags(suite, ["smoke","regression"]).length === 0, 'no test should match two mutually exclusive tags'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly finds a test matching an intersection of two required tags",
        },
        { id: "t2", description: "correctly matches multiple tests for a single required tag" },
        { id: "t3", description: "correctly returns none for an impossible tag combination" },
      ],
      hints: [
        "Array.prototype.every over requiredTags, checking includes() against each test's own tags array, models requiring ALL of the given tags, not just one.",
        "This models a genuinely useful, targeted selection: 'give me exactly the smoke tests that also touch checkout.'",
      ],
    },
    independentExercise: {
      id: "tafe-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models detecting a genuine isolation risk only -- no real test suite runs. Write isolationRisk(usesHardcodedIdentifier, readsFirstMatchingRecord, dependsOnExecutionOrder): return the array of risk names (in this exact order) among 'hardcoded-identifier-collision', 'ambiguous-record-selection', 'order-dependency' that apply, based on the three boolean inputs respectively.",
      starterCode: `function isolationRisk(usesHardcodedIdentifier, readsFirstMatchingRecord, dependsOnExecutionOrder) {
  // TODO
}
`,
      solutionCode: `function isolationRisk(usesHardcodedIdentifier, readsFirstMatchingRecord, dependsOnExecutionOrder) {
  const risks = [];
  if (usesHardcodedIdentifier) risks.push("hardcoded-identifier-collision");
  if (readsFirstMatchingRecord) risks.push("ambiguous-record-selection");
  if (dependsOnExecutionOrder) risks.push("order-dependency");
  return risks;
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(isolationRisk(true, false, false)) === JSON.stringify(["hardcoded-identifier-collision"]), 'should flag only the hardcoded-identifier risk'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isolationRisk(false, false, false).length === 0, 'a test with none of these risk factors should report none'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isolationRisk(true, true, true).length === 3, 'a test with all three risk factors should report all three, in order'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a single, specific isolation risk" },
        { id: "t2", description: "correctly identifies no risk for a genuinely isolated test" },
        {
          id: "t3",
          description: "correctly identifies all three risks together, in the specified order",
        },
      ],
      hints: [
        "This models the practical checklist from this lesson: isolation bugs come from specific, nameable causes, not just 'not being careful enough' in the abstract.",
        "Each risk is independent -- a test can exhibit any combination of the three.",
      ],
    },
    commonMistakes: [
      "Using dozens of ad-hoc, inconsistently applied tags with no shared, understood meaning -- this makes tag-based selection unreliable, since no one can be confident what a given tag actually guarantees about the tests carrying it.",
      "Assuming a test is isolated simply because it doesn't use an explicit global variable -- hardcoded shared data, reading 'the first matching record' instead of a specifically-created one, and depending on a previous test's leftover state are all real isolation bugs that don't involve a literal global.",
      "Only discovering an isolation bug once parallel execution is introduced, and treating it as a new, parallelism-specific problem -- the bug existed before parallelism; parallel execution just removed the accidental ordering that had been hiding it.",
    ],
    quiz: [
      {
        id: "tafe-q8-1",
        prompt:
          "What makes a tagging scheme genuinely useful for test selection, as opposed to a source of confusion?",
        choices: [
          "Using as many different tags as possible, applied inconsistently across the suite",
          "A handful of well-defined, consistently applied tags that let the suite be sliced into meaningful, run-on-demand subsets by concern (smoke, regression, a feature area)",
          "Tags have no practical effect on how a suite can be run",
          "Every test must carry exactly one tag, never more",
        ],
        correctIndex: 1,
        explanation:
          "A small, consistently applied, well-understood set of tags is what makes selective execution reliable -- a large, inconsistent set of ad-hoc tags undermines confidence in what running 'the @smoke tests' actually guarantees.",
      },
      {
        id: "tafe-q8-2",
        prompt:
          "Why can a test be genuinely NOT isolated even if it never touches an explicit global variable?",
        choices: [
          "This is impossible; avoiding global variables always guarantees isolation",
          "Isolation bugs also come from hardcoded shared data, reading an ambiguous 'first matching record' instead of a specifically-created one, or depending on a previous test's leftover state -- none of which require a literal global variable",
          "Isolation only applies to database-backed tests",
          "A test without global variables is always automatically parallel-safe",
        ],
        correctIndex: 1,
        explanation:
          "Genuine isolation requires more discipline than avoiding an explicit global -- hardcoded shared identifiers, ambiguous record selection, and order-dependency are all real, common isolation bugs that involve no literal global variable at all.",
      },
      {
        id: "tafe-q8-3",
        prompt:
          "Why does parallel execution tend to expose isolation bugs that a sequential run didn't reveal?",
        choices: [
          "Parallel execution creates new bugs that don't exist in sequential runs",
          "The bug already existed; sequential execution's fixed, familiar order was accidentally hiding it, and parallel execution removes that accidental protection",
          "Parallel execution always runs slower, which is unrelated to isolation",
          "Isolation bugs are impossible to detect under any execution mode",
        ],
        correctIndex: 1,
        explanation:
          "Parallel execution doesn't introduce a new class of bug -- it removes the accidental, familiar ordering that had been silently preventing a pre-existing isolation bug from actually colliding, which is exactly why isolation should be designed in from the start.",
      },
    ],
    takeaway:
      "Design a small, consistent, well-understood tagging scheme so a suite can be selectively run by concern without duplicating test files. Pursue genuine test isolation deliberately -- unique, self-created data and independence from execution order -- since parallel execution amplifies, rather than causes, any isolation bug that already exists.",
    summary:
      "A useful tagging scheme is small, consistent, and meaningful, letting a shared suite be sliced into subsets (smoke, regression, a feature area) on demand. Genuine test isolation requires more than avoiding explicit global variables -- hardcoded shared data, ambiguous record selection, and order-dependency are all real isolation bugs. Parallel execution amplifies a pre-existing isolation bug by removing the accidental sequential ordering that had been hiding it, rather than introducing a new category of bug.",
    nextLessonSlug: "tafe-retry-timeout-flake",
  },
  {
    id: "tafe-retry-timeout-flake",
    slug: "tafe-retry-timeout-flake",
    title: "Retry and Timeout Policy, and Managing Flaky Tests",
    description:
      "Designing a framework-wide retry and timeout policy deliberately, and the honest, disciplined process for actually managing a flaky test instead of just silencing it.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["tafe-tagging-test-selection"],
    objectives: [
      "Explain the real risk of a retry policy that's too generous, and the real cost of one that's too strict",
      "Design a timeout policy that distinguishes reasonable waiting from a genuinely stuck operation",
      "Apply a disciplined process for investigating a flaky test rather than reflexively retrying or skipping it",
    ],
    skills: ["test-automation", "flaky-tests", "reliability", "typescript"],
    tech: [
      { name: "TypeScript", version: "5.x" },
      { name: "Playwright", version: "1.62.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright Docs: Retries", url: "https://playwright.dev/docs/test-retries" },
      { label: "Playwright Docs: Timeouts", url: "https://playwright.dev/docs/test-timeouts" },
    ],
    keywords: ["retries", "timeouts", "flaky tests", "reliability", "playwright"],
    explanation: `**No real test retry or timeout executes in this lesson's exercises -- they model retry/timeout policy decisions and flaky-test triage as data, using genuine JavaScript/TypeScript execution.**

A **retry policy** (rerunning a failed test automatically, a set number of times, before reporting it as truly failed) is a genuine, honest tradeoff, not a free safety net: retries can absorb truly transient, environment-level hiccups (a momentary network blip unrelated to the code under test) — but a retry policy that's too generous becomes a way to **quietly hide a genuine, reproducible bug** behind noise, since a test that fails 1 time in 3 but is retried 3 times will usually eventually "pass," reported as green despite a real, underlying problem. A well-designed policy keeps retries few (commonly just one or two) and, critically, treats every retry as **signal worth investigating**, not something to be silently absorbed and ignored — a framework that reports retry counts prominently (not just final pass/fail) preserves that signal for triage instead of discarding it.

A **timeout policy** needs to distinguish reasonable waiting (a page genuinely taking a few extra seconds to load under real, variable load) from a genuinely stuck operation that will never complete on its own. Too short a timeout produces false failures on entirely legitimate slow-but-working operations; too long a timeout means a genuinely stuck test wastes significant CI time before finally failing, and a whole suite's runtime can balloon if this happens across many tests. A framework-wide default timeout, with a small number of deliberate, justified per-test overrides for operations known to be legitimately slower, is the practical middle ground.

**Flaky-test management** is a disciplined process, not "add \`test.retry()\` and move on." A genuinely rigorous approach treats a flaky test the same way a real bug report is treated: reproduce it (run it repeatedly, ideally with tracing/screenshots enabled, until it fails again), form a specific hypothesis about the actual cause (an isolation bug from Lesson 8? a race condition the test's waiting strategy doesn't correctly handle? a genuine, intermittent bug in the application itself?), and fix the actual root cause — rather than reflexively adding a retry (which hides the symptom) or a \`.skip\` (which discards the test's coverage entirely). A retry or a skip can be a legitimate, temporary, explicitly time-boxed measure while a root cause is actively being investigated — but treating either as a permanent solution lets real flakiness accumulate silently across a growing suite.`,
    example: {
      language: "javascript",
      description:
        "Modeling why a generous retry policy hides real failure signal, and a timeout-vs-legitimate-delay decision, as data.",
      code: `function wouldReportAsPassing(failureRate, retryAttempts) {
  // Models the probability a genuinely flaky test (given its real failure rate) eventually passes within N attempts.
  const probabilityAllFail = Math.pow(failureRate, retryAttempts);
  return 1 - probabilityAllFail; // probability of at least one pass among the attempts
}
console.log(wouldReportAsPassing(0.3, 1).toFixed(2)); // 0.70 -- with NO retries, this genuine 30%-failure-rate bug is visible 30% of the time
console.log(wouldReportAsPassing(0.3, 3).toFixed(2)); // 0.97 -- with 3 retries, it's reported as passing almost every time -- hiding the real bug

function timeoutIsAppropriate(observedP95Ms, configuredTimeoutMs) {
  // A reasonable timeout should comfortably exceed normal, legitimate variance (p95), not be right at its edge.
  return configuredTimeoutMs >= observedP95Ms * 1.5;
}
console.log(timeoutIsAppropriate(4000, 5000)); // false -- too close to normal p95 variance, risking false failures
console.log(timeoutIsAppropriate(4000, 8000)); // true -- comfortable margin above normal, legitimate variance`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call wouldReportAsPassing with failureRate 0.1 (a much rarer, genuine flake) and retryAttempts 2, and observe how even a low real failure rate gets substantially masked by retries.",
      code: `function wouldReportAsPassing(failureRate, retryAttempts) {
  const probabilityAllFail = Math.pow(failureRate, retryAttempts);
  return 1 - probabilityAllFail;
}
console.log(wouldReportAsPassing(0.1, 2).toFixed(3));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models flagging a retry policy as too generous only -- no real retries occur. Write isRetryPolicyTooGenerous(maxRetries), returning true if maxRetries is greater than 2 (this course's practical, deliberate ceiling for keeping retries as signal, not noise-absorption).",
      starterCode: `function isRetryPolicyTooGenerous(maxRetries) {
  // TODO
}
`,
      solutionCode: `function isRetryPolicyTooGenerous(maxRetries) {
  return maxRetries > 2;
}`,
      harness: `
        try { window.__report('t1', isRetryPolicyTooGenerous(1) === false, '1 retry should not be flagged as too generous'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isRetryPolicyTooGenerous(2) === false, '2 retries, the practical ceiling, should not itself be flagged'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isRetryPolicyTooGenerous(5) === true, '5 retries should be flagged as too generous, risking hidden real failures'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "does not flag a minimal, deliberate retry count" },
        { id: "t2", description: "does not flag the practical retry ceiling itself" },
        { id: "t3", description: "flags an excessive retry count as too generous" },
      ],
      hints: [
        "This models the specific, practical guidance from this lesson: keep retries few and deliberate, not generous.",
        "A generous retry count risks quietly absorbing a real, reproducible bug's failure signal.",
      ],
    },
    independentExercise: {
      id: "tafe-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models choosing the correct flaky-test response given available evidence only -- no real investigation occurs. Write flakyTestResponse(rootCauseIdentified, hasTimeBoxedPlan): if rootCauseIdentified, return 'fix-root-cause'. Else if hasTimeBoxedPlan, return 'temporary-time-boxed-retry-or-skip'. Else return 'investigate-before-any-action'.",
      starterCode: `function flakyTestResponse(rootCauseIdentified, hasTimeBoxedPlan) {
  // TODO
}
`,
      solutionCode: `function flakyTestResponse(rootCauseIdentified, hasTimeBoxedPlan) {
  if (rootCauseIdentified) return "fix-root-cause";
  if (hasTimeBoxedPlan) return "temporary-time-boxed-retry-or-skip";
  return "investigate-before-any-action";
}`,
      harness: `
        try { window.__report('t1', flakyTestResponse(true, false) === "fix-root-cause", 'a known root cause should always be fixed directly, regardless of any temporary plan'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', flakyTestResponse(false, true) === "temporary-time-boxed-retry-or-skip", 'an unidentified cause with a genuine, time-boxed plan may use a temporary measure'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', flakyTestResponse(false, false) === "investigate-before-any-action", 'with neither a known cause nor a time-boxed plan, investigation should come before any retry or skip'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "prioritizes fixing a known root cause over any temporary measure",
        },
        {
          id: "t2",
          description: "allows a temporary, time-boxed measure only when a real plan exists",
        },
        {
          id: "t3",
          description: "defaults to investigation when neither a cause nor a plan exists",
        },
      ],
      hints: [
        "This models the disciplined process this lesson describes -- a retry or skip is only a legitimate STOPGAP with an actual plan behind it, never a default first response.",
        "Reflexively adding a retry or a .skip without either a known cause or a real plan is exactly the anti-pattern this lesson warns against.",
      ],
    },
    commonMistakes: [
      "Setting a generous retry count (more than 1-2) as a default 'safety net' -- this quietly absorbs a real, reproducible bug's failure signal, reporting it as passing more often than not.",
      "Setting a timeout right at the edge of normal, legitimate operation latency instead of with a comfortable margin -- this produces false failures on entirely legitimate, if slightly slower, operations.",
      "Reflexively adding test.retry() or .skip to a flaky test as a permanent fix, instead of a genuine, time-boxed stopgap while the actual root cause is being investigated -- this lets real flakiness accumulate silently across a growing suite.",
    ],
    quiz: [
      {
        id: "tafe-q9-1",
        prompt:
          "Why can a generous retry policy be actively harmful, rather than simply a helpful safety net?",
        choices: [
          "It isn't; more retries are always strictly better",
          "A test with a genuine, reproducible failure rate will often eventually pass within several retries, causing the framework to report it as passing and hiding the real underlying bug",
          "Retries always slow down the entire CI pipeline to an unusable degree",
          "Retries are not supported by any real test framework",
        ],
        correctIndex: 1,
        explanation:
          "A genuinely flaky or buggy test that fails, say, 30% of the time will very often pass within 2-3 retries purely by chance -- a generous retry policy can systematically mask this real signal, reporting the suite as healthier than it actually is.",
      },
      {
        id: "tafe-q9-2",
        prompt:
          "Why should a timeout be set with a comfortable margin above normal, observed latency (like 1.5x the p95), rather than right at that edge?",
        choices: [
          "Timeouts have no relationship to observed latency",
          "A timeout right at the edge of normal variance produces false failures on entirely legitimate, if slightly slower, operations -- a comfortable margin distinguishes reasonable waiting from a genuinely stuck operation",
          "A larger timeout always makes tests run faster",
          "Timeouts should always be set to the smallest possible value regardless of observed latency",
        ],
        correctIndex: 1,
        explanation:
          "Normal operations have real, legitimate variance in how long they take -- a timeout set right at that edge will frequently and falsely fail perfectly working operations that happen to land on the slower end of normal.",
      },
      {
        id: "tafe-q9-3",
        prompt:
          "What's the disciplined, honest process this lesson recommends for handling a flaky test?",
        choices: [
          "Immediately add test.retry() or .skip and move on to other work",
          "Reproduce the failure, form a specific hypothesis about the actual root cause, and fix that root cause -- treating a temporary retry or skip as a genuine, time-boxed stopgap only, not a permanent solution",
          "Delete the flaky test entirely, since it clearly cannot be trusted",
          "Ignore flaky tests, since flakiness is an unavoidable and unfixable part of test automation",
        ],
        correctIndex: 1,
        explanation:
          "This lesson treats a flaky test like a real bug report -- reproduce it, hypothesize a specific cause, and fix that cause -- with a retry or skip acceptable only as an explicitly temporary, time-boxed measure while the real investigation is actively underway.",
      },
    ],
    takeaway:
      "Keep retries few and deliberate, and always visible as signal, not silently absorbed -- a generous retry policy can hide a real, reproducible bug. Set timeouts with a comfortable margin above normal, observed latency. Treat a flaky test like a real bug: reproduce it, find its actual root cause, and fix that -- using a retry or skip only as an explicit, time-boxed stopgap, never a permanent solution.",
    summary:
      "A generous retry policy can systematically hide a genuine, reproducible bug's failure signal by letting it eventually pass within several attempts -- retries should stay few and remain visible for triage. A timeout should sit comfortably above normal, observed latency to avoid false failures on legitimately slower operations. Flaky-test management is a disciplined process of reproduction, root-cause hypothesis, and an actual fix -- a retry or .skip is a legitimate, temporary, explicitly time-boxed stopgap, never a default or permanent response.",
    nextLessonSlug: "tafe-diagnostics-reporting",
  },
  {
    id: "tafe-diagnostics-reporting",
    slug: "tafe-diagnostics-reporting",
    title: "Structured Diagnostics and Reporting",
    description:
      "Designing what a framework captures on failure -- logs, screenshots, traces -- as structured, queryable diagnostic data, not just raw text, and what a genuinely useful test report communicates beyond pass/fail counts.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 10,
    difficulty: "advanced",
    estimatedMinutes: 21,
    prerequisites: ["tafe-retry-timeout-flake"],
    objectives: [
      "Design a structured failure record that captures enough context to begin diagnosing a failure without re-running it",
      "Explain why capturing diagnostics only on failure (not on every run) is the practical default for CI performance",
      "Explain what a genuinely useful test report communicates beyond a simple pass/fail count",
    ],
    skills: ["test-automation", "diagnostics", "reporting", "typescript"],
    tech: [
      { name: "TypeScript", version: "5.x" },
      { name: "Playwright", version: "1.62.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright Docs: Trace Viewer", url: "https://playwright.dev/docs/trace-viewer" },
      { label: "Playwright Docs: Reporters", url: "https://playwright.dev/docs/test-reporters" },
    ],
    keywords: ["diagnostics", "reporting", "traces", "screenshots", "playwright"],
    explanation: `**No real trace, screenshot, or CI report is generated by this lesson's exercises -- they model structured-diagnostic-record design as data, using genuine JavaScript/TypeScript execution.**

Capturing "some logs" on a test failure is a start, but a genuinely useful framework designs its failure output as **structured, queryable data**, not a wall of unstructured text — a failure record with clearly separated fields (test name, tags, the specific assertion that failed, the environment/browser it ran against, a timestamp, and a link or path to the trace/screenshot/video captured) can be filtered, searched, and aggregated across many CI runs — "show me every failure of this specific assertion across the last 20 runs" is a query a structured record supports, and unstructured console output effectively does not.

The practical default, matching what Playwright itself does, is to capture the **expensive** diagnostics — traces, screenshots, video — only **on failure** (or on the first retry), not on every single successful run: capturing a full trace for every passing test would meaningfully slow down CI and consume storage for artifacts that are, by definition, never actually needed for a test that passed. This is a deliberate performance/completeness tradeoff, not an oversight — the cases where those artifacts matter are overwhelmingly the failing ones.

A genuinely useful **test report** communicates meaningfully more than a bare pass/fail count. At minimum: which SPECIFIC tests failed (not just "12 failed"), the failure trend across recent runs (is this test newly broken, or has it been reliably failing for a week?), retry counts per test (a test that "passed" only after 2 retries is a very different signal from one that passed immediately, even though both show as green), and direct links to each failure's captured diagnostics, so investigating a failure doesn't require re-running the suite locally just to reproduce and capture the same information the CI run already had.`,
    example: {
      language: "javascript",
      description:
        "Modeling a structured failure record's shape and the failure-only diagnostic-capture decision, as data.",
      code: `function buildFailureRecord(test, error, tracePath) {
  return {
    testName: test.name,
    tags: test.tags,
    failedAssertion: error.assertionDescription,
    environment: test.environment,
    timestamp: test.timestamp,
    tracePath, // a link/path to the captured artifact, not the raw trace data itself
  };
}
const record = buildFailureRecord(
  { name: "checkout completes", tags: ["smoke", "checkout"], environment: "chromium", timestamp: "2026-08-03T10:00:00Z" },
  { assertionDescription: "expected order total to be $42.00" },
  "traces/checkout-completes-run482.zip"
);
console.log(record.failedAssertion); // "expected order total to be $42.00" -- immediately queryable/searchable, not buried in prose

function shouldCaptureExpensiveDiagnostics(testOutcome) {
  return testOutcome === "failed" || testOutcome === "flaky-retry";
}
console.log(shouldCaptureExpensiveDiagnostics("passed")); // false -- capturing a trace here would be pure, unneeded overhead
console.log(shouldCaptureExpensiveDiagnostics("failed"));  // true -- exactly where the diagnostic artifact actually matters`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call shouldCaptureExpensiveDiagnostics with 'flaky-retry', and confirm a retried-then-passed test is still correctly treated as worth capturing diagnostics for.",
      code: `function shouldCaptureExpensiveDiagnostics(testOutcome) {
  return testOutcome === "failed" || testOutcome === "flaky-retry";
}
console.log(shouldCaptureExpensiveDiagnostics("flaky-retry"));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models building a structured failure record only -- no real trace or screenshot is captured. Write buildFailureRecord(testName, tags, failedAssertion, tracePath), returning an object with exactly those four fields, named testName, tags, failedAssertion, tracePath.",
      starterCode: `function buildFailureRecord(testName, tags, failedAssertion, tracePath) {
  // TODO
}
`,
      solutionCode: `function buildFailureRecord(testName, tags, failedAssertion, tracePath) {
  return { testName, tags, failedAssertion, tracePath };
}`,
      harness: `
        try { const r = buildFailureRecord("checkout completes", ["smoke"], "expected total $42", "traces/run1.zip"); window.__report('t1', r.testName === "checkout completes", 'should preserve the test name field'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = buildFailureRecord("checkout completes", ["smoke","checkout"], "expected total $42", "traces/run1.zip"); window.__report('t2', JSON.stringify(r.tags) === JSON.stringify(["smoke","checkout"]), 'should preserve the full tags array'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = buildFailureRecord("a", [], "b", "c"); window.__report('t3', r.tracePath === "c", 'should preserve the tracePath field'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly preserves the test name" },
        { id: "t2", description: "correctly preserves the full tags array" },
        { id: "t3", description: "correctly preserves the trace path" },
      ],
      hints: [
        "This models exactly why STRUCTURED data matters -- each field is independently accessible, filterable, and searchable, unlike a single unstructured log string.",
        "Object shorthand ({ testName, tags, ... }) is a clean way to build an object from matching-named parameters.",
      ],
    },
    independentExercise: {
      id: "tafe-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models a report's per-test signal beyond bare pass/fail only -- no real report is generated. Write reportSignal(outcome, retryCount): if outcome is 'failed', return 'needs-investigation'. Else if retryCount > 0, return 'passed-but-flaky'. Else return 'genuinely-stable-pass'.",
      starterCode: `function reportSignal(outcome, retryCount) {
  // TODO
}
`,
      solutionCode: `function reportSignal(outcome, retryCount) {
  if (outcome === "failed") return "needs-investigation";
  if (retryCount > 0) return "passed-but-flaky";
  return "genuinely-stable-pass";
}`,
      harness: `
        try { window.__report('t1', reportSignal("failed", 0) === "needs-investigation", 'a failed outcome should always need investigation'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', reportSignal("passed", 2) === "passed-but-flaky", 'a pass that required retries is a meaningfully different signal from an immediate pass'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', reportSignal("passed", 0) === "genuinely-stable-pass", 'an immediate, no-retry pass is the genuinely healthy signal'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly flags a failure for investigation" },
        {
          id: "t2",
          description: "correctly distinguishes a retried pass from a genuinely stable one",
        },
        { id: "t3", description: "correctly identifies a genuinely stable, immediate pass" },
      ],
      hints: [
        "This models exactly why a bare pass/fail count hides real information -- 'passed after 2 retries' and 'passed immediately' are both reported as 'passed' but represent very different reliability signals.",
        "Checking outcome first, then retryCount, mirrors the correct real-world priority.",
      ],
    },
    commonMistakes: [
      "Capturing failure information as unstructured console text instead of a structured record with clearly separated fields -- this makes it effectively impossible to query, filter, or aggregate failures across many CI runs.",
      "Capturing full traces, screenshots, and video for every single test run, including passing ones -- this meaningfully slows down CI and wastes storage on artifacts that are never actually needed for a passing test.",
      "Reporting only a bare pass/fail count without retry counts or failure trends -- this hides the meaningful difference between a genuinely stable pass and one that only succeeded after retries, and between a newly broken test and a chronically flaky one.",
    ],
    quiz: [
      {
        id: "tafe-q10-1",
        prompt:
          "Why is a structured failure record (with clearly separated fields) preferable to a wall of unstructured console text?",
        choices: [
          "There is no real difference; both convey identical information",
          "A structured record can be filtered, searched, and aggregated across many CI runs -- a query like 'every failure of this specific assertion in the last 20 runs' is supported by structured data and effectively impossible with unstructured text",
          "Structured records take up less disk space",
          "Unstructured text is always faster for a human to read",
        ],
        correctIndex: 1,
        explanation:
          "Structured fields (test name, failed assertion, environment, timestamp, trace path) make a failure record queryable and aggregable across runs -- exactly the kind of analysis unstructured console text does not practically support.",
      },
      {
        id: "tafe-q10-2",
        prompt:
          "Why does a framework typically capture expensive diagnostics (traces, screenshots, video) only on failure, not on every run?",
        choices: [
          "It's technically impossible to capture them on a passing run",
          "Capturing them on every run, including passing ones, would meaningfully slow CI and consume storage for artifacts that are never actually needed for a test that passed",
          "Diagnostics are legally required to be deleted after a passing run",
          "There is no meaningful cost difference between capturing on every run vs. only on failure",
        ],
        correctIndex: 1,
        explanation:
          "This is a deliberate, practical performance/completeness tradeoff -- the cases where diagnostic artifacts genuinely matter are overwhelmingly the failing ones, so capturing them only there avoids real, unnecessary CI slowdown and storage cost.",
      },
      {
        id: "tafe-q10-3",
        prompt:
          "Why does a per-test retry count matter in a report, beyond the final pass/fail result?",
        choices: [
          "It doesn't matter; only the final outcome is meaningful",
          "A test that passed only after retries is a meaningfully different, less healthy signal than one that passed immediately, even though both are reported as 'passed'",
          "Retry counts are only relevant for failed tests, never passed ones",
          "Retry counts determine how long a test is allowed to run",
        ],
        correctIndex: 1,
        explanation:
          "Two tests that both show 'passed' in a bare pass/fail count can represent very different reliability -- one that needed 2 retries is showing real, if hidden, instability that a report ignoring retry counts would completely miss.",
      },
    ],
    takeaway:
      "Design failure output as structured, queryable data with clearly separated fields, not unstructured text. Capture expensive diagnostics (traces, screenshots, video) only on failure, as a deliberate performance tradeoff. Report retry counts and failure trends, not just a bare pass/fail count -- a retried pass is a meaningfully different signal from an immediate one.",
    summary:
      "A structured failure record (test name, tags, failed assertion, environment, timestamp, trace path) supports filtering and aggregation across CI runs in a way unstructured console text does not. Capturing expensive diagnostics only on failure is a deliberate, practical performance tradeoff, since those artifacts are needed almost exclusively for failing tests. A genuinely useful report surfaces retry counts and failure trends, not just a bare pass/fail count, since a retried pass is a meaningfully different reliability signal from an immediate one.",
    nextLessonSlug: "tafe-ci-quality-gates",
  },
  {
    id: "tafe-ci-quality-gates",
    slug: "tafe-ci-quality-gates",
    title: "CI Pipelines, Quality Gates, and Sharding",
    description:
      "Wiring a framework into a real CI pipeline as an actual quality gate (not just an informational report), and splitting a growing suite across shards to keep CI runtime reasonable as it scales.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 22,
    prerequisites: ["tafe-diagnostics-reporting"],
    objectives: [
      "Explain the difference between a CI check that's genuinely a quality gate and one that's purely informational",
      "Design a sharding strategy that splits a test suite for parallel CI execution without breaking suite-level assumptions",
      "Explain what caching in a CI pipeline should and shouldn't be relied on for",
    ],
    skills: ["test-automation", "ci-cd", "sharding", "typescript"],
    tech: [
      { name: "TypeScript", version: "5.x" },
      { name: "Playwright", version: "1.62.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright Docs: Sharding", url: "https://playwright.dev/docs/test-sharding" },
      {
        label: "GitHub Docs: About required status checks",
        url: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
      },
    ],
    keywords: ["ci", "quality gates", "sharding", "playwright"],
    explanation: `**No real CI pipeline runs in this lesson's exercises -- they model quality-gate and sharding decisions as data, using genuine JavaScript/TypeScript execution. This platform runs its OWN real CI, including a real Playwright suite, in its own repository infrastructure -- entirely separate from anything in a learner's browser exercise.**

A CI check is only a genuine **quality gate** if it can actually **block** something from happening — merging a pull request, deploying a build — when it fails. A test suite that runs in CI and reports its result somewhere, but where a failure doesn't prevent a merge or a deploy, is purely **informational**: useful for visibility, but it provides none of the actual protection a quality gate is meant to provide, since a failing check that nobody is required to act on can be, and eventually will be, silently ignored. Turning a check into a genuine gate is typically a repository/CI-platform configuration decision (a required status check on a branch protection rule, for example) — but designing the underlying test suite to be honest and stable enough to safely gate on (not flaky, not slow enough to be routinely skipped under deadline pressure) is squarely a framework-engineering responsibility.

**Sharding** splits one large test suite across multiple parallel CI workers/machines, each running a subset of the full suite — this is what keeps a growing suite's total CI wall-clock time reasonable as the number of tests increases, since 4 shards running in parallel can finish in roughly a quarter of the time one worker running everything sequentially would take. Sharding does require the suite to already be genuinely isolated (Lesson 8) — tests assigned to different shards may run on completely different machines, at different times, with zero shared state whatsoever, so any test that secretly depended on another test's leftover state (even if that dependency happened to "work" when both ran on the same single worker) will break unpredictably once sharding is introduced, depending on which shard each ends up assigned to.

CI **caching** (of installed dependencies, browser binaries, build outputs) is a genuine, valuable way to reduce redundant, repeated work across runs — but it should be relied on specifically as a **performance optimization**, never as a substitute for correctness. A cache that's stale, corrupted, or keyed incorrectly should, at worst, produce a slower run (falling back to a full, uncached install) — a well-designed CI pipeline should never depend on a cache being present or valid for CORRECT results, only for a faster ones; this is exactly why CI pipelines typically also run correctly, if more slowly, on a fully clean cache-miss run.`,
    example: {
      language: "javascript",
      description:
        "Modeling the gate-vs-informational distinction and estimating a sharded suite's parallel runtime, as data.",
      code: `function isGenuineQualityGate(checkBlocksMerge, checkBlocksDeploy) {
  return checkBlocksMerge || checkBlocksDeploy;
}
console.log(isGenuineQualityGate(true, false));  // true -- a failure here actually prevents something
console.log(isGenuineQualityGate(false, false)); // false -- purely informational, easy to silently ignore over time

function estimatedShardedRuntimeMinutes(totalSequentialMinutes, shardCount) {
  // A simplified model -- real sharding overhead exists, but the core benefit is this rough division.
  return Math.ceil(totalSequentialMinutes / shardCount);
}
console.log(estimatedShardedRuntimeMinutes(40, 1)); // 40 -- one worker running the whole suite
console.log(estimatedShardedRuntimeMinutes(40, 4)); // 10 -- roughly a quarter of the time, run in parallel across 4 shards`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call estimatedShardedRuntimeMinutes with totalSequentialMinutes 90 and shardCount 6, and observe the estimated parallel runtime.",
      code: `function estimatedShardedRuntimeMinutes(totalSequentialMinutes, shardCount) {
  return Math.ceil(totalSequentialMinutes / shardCount);
}
console.log(estimatedShardedRuntimeMinutes(90, 6));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models classifying a CI check's real gating strength only -- no real CI runs. Write gateStrength(blocksMerge, blocksDeploy, isFlaky): if isFlaky, return 'unreliable-gate' (a flaky gate is dangerous even if configured to block). Else if blocksMerge || blocksDeploy, return 'genuine-gate'. Else return 'informational-only'.",
      starterCode: `function gateStrength(blocksMerge, blocksDeploy, isFlaky) {
  // TODO
}
`,
      solutionCode: `function gateStrength(blocksMerge, blocksDeploy, isFlaky) {
  if (isFlaky) return "unreliable-gate";
  if (blocksMerge || blocksDeploy) return "genuine-gate";
  return "informational-only";
}`,
      harness: `
        try { window.__report('t1', gateStrength(true, false, false) === "genuine-gate", 'a stable check that blocks merge should be a genuine gate'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', gateStrength(true, false, true) === "unreliable-gate", 'a flaky check should be flagged as unreliable even though it is configured to block'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', gateStrength(false, false, false) === "informational-only", 'a check that blocks nothing should be informational-only'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a genuine, stable gate" },
        {
          id: "t2",
          description: "correctly flags a flaky check as unreliable, even if configured to block",
        },
        { id: "t3", description: "correctly identifies a purely informational check" },
      ],
      hints: [
        "This models a real, honest addition to the gate-vs-informational distinction: a FLAKY gate that blocks merges is arguably worse than a purely informational check, since it blocks work for the wrong reason.",
        "Checking isFlaky first reflects that reliability is a prerequisite for a check to safely function as a gate at all.",
      ],
    },
    independentExercise: {
      id: "tafe-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models deciding whether a CI pipeline correctly treats caching as a performance-only optimization -- no real CI cache is used. Write cachingIsSafe(pipelineWorksOnCacheMiss, resultsChangeBasedOnCacheHit): return pipelineWorksOnCacheMiss && !resultsChangeBasedOnCacheHit.",
      starterCode: `function cachingIsSafe(pipelineWorksOnCacheMiss, resultsChangeBasedOnCacheHit) {
  // TODO
}
`,
      solutionCode: `function cachingIsSafe(pipelineWorksOnCacheMiss, resultsChangeBasedOnCacheHit) {
  return pipelineWorksOnCacheMiss && !resultsChangeBasedOnCacheHit;
}`,
      harness: `
        try { window.__report('t1', cachingIsSafe(true, false) === true, 'a pipeline that works correctly on a cache miss and produces identical results should be considered safe'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', cachingIsSafe(false, false) === false, 'a pipeline that CANNOT run correctly without the cache is not safe -- caching has become a correctness dependency, not just a performance one'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', cachingIsSafe(true, true) === false, 'a pipeline whose test RESULTS differ based on cache hit/miss is not safe -- correctness should not depend on caching'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies safe, performance-only caching" },
        {
          id: "t2",
          description: "correctly rejects a pipeline that cannot function on a cache miss",
        },
        {
          id: "t3",
          description: "correctly rejects a pipeline whose results depend on cache state",
        },
      ],
      hints: [
        "This models the core rule from this lesson: caching should only ever affect SPEED, never correctness.",
        "Both conditions must hold -- a pipeline could pass one check and still fail the other.",
      ],
    },
    guidedLocalLab: {
      id: "tafe-gll-ci-quality-gates",
      title: "Add CI Quality Gates, Reporting, Sharding Guidance, and Failure Triage",
      scenario:
        "Extend the framework from earlier guided local labs with a real GitHub Actions workflow that runs the test suite, reports results clearly, and would genuinely gate a pull request -- real, local (and GitHub-hosted) CI configuration work. Every command below runs in YOUR terminal and your own GitHub repository; this platform does not execute any of them.",
      requiredTools: [
        { name: "Node.js", version: "20.x or 22.x LTS" },
        { name: "Playwright", version: "1.62.x" },
        { name: "Git", version: "any current version" },
        { name: "A GitHub account (for the CI portion)", version: "free tier is sufficient" },
      ],
      setupSteps: [
        "Continue in the automation-framework project from earlier guided local labs (or recreate its basic structure if needed).",
        "Initialize git if not already done: `git init` (if this is a fresh project).",
        "Create the workflow folder: `mkdir -p .github/workflows`.",
      ],
      projectStructure: `automation-framework/
  .github/
    workflows/
      ci.yml
  src/
    ... (from earlier labs)
  tests/
    ... (from earlier labs)
  playwright.config.ts
  package.json`,
      starterFiles: [
        {
          path: ".github/workflows/ci.yml",
          content: `name: CI

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    # TODO: add a strategy.matrix block with at least 2 shardIndex values and a matching shardTotal
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run tests
        # TODO: pass --shard=\${{ matrix.shardIndex }}/\${{ matrix.shardTotal }} to npx playwright test
        run: npx playwright test
      # TODO: add an "Upload failure diagnostics" step using actions/upload-artifact@v4,
      # gated on if: failure(), uploading the playwright-report/ folder
`,
        },
      ],
      requirements: [
        "ci.yml triggers on pull requests targeting main.",
        "The workflow uses a shard matrix (at least 2 shards) so the suite genuinely runs split across parallel jobs.",
        "npx playwright install --with-deps runs before the test step, so the CI runner actually has real browsers available.",
        "On failure, the workflow uploads the Playwright HTML report as an artifact, so a failure's diagnostics are retrievable without re-running locally.",
        "The workflow is pushed to a real GitHub repository, and a test pull request confirms it actually runs (this specific step is done in your own GitHub account, not on this platform).",
      ],
      commands: [
        {
          description: "Confirm the suite passes locally before pushing",
          command: "npx playwright test",
        },
        {
          description: "Commit and push the workflow file",
          command:
            'git add .github/workflows/ci.yml && git commit -m "Add CI workflow with sharding" && git push',
        },
        {
          description:
            "Open a pull request on GitHub and observe the workflow run in the Actions tab",
          command: "gh pr create --fill",
        },
      ],
      expectedBehavior:
        "Opening a real pull request on GitHub triggers the workflow, which runs two shard jobs in parallel, each executing roughly half the suite. Both shards report their results in the PR's checks. Intentionally breaking a test and pushing again demonstrates the failure being clearly visible in the PR checks, with the Playwright HTML report available as a downloadable artifact from the failed run.",
      verificationSteps: [
        {
          command: "(in the GitHub PR's Checks tab) confirm 2 shard jobs ran",
          expectedResult: "both shardIndex 1/2 and shardIndex 2/2 jobs appear and complete",
        },
        {
          command:
            "(after intentionally breaking one test and pushing) check the PR's Checks tab again",
          expectedResult:
            "the relevant shard job shows as failed, and a playwright-report artifact is available for download",
        },
      ],
      troubleshooting: [
        {
          issue: "The workflow doesn't trigger at all on a new pull request",
          fix: "Confirm ci.yml is on the branch the PR is FROM (not just main) and that the `on: pull_request: branches: [main]` target matches your actual default branch name.",
        },
        {
          issue: "`npx playwright install --with-deps` fails on the CI runner",
          fix: "ubuntu-latest should have the required system dependencies with --with-deps -- confirm the runs-on value is exactly ubuntu-latest and the Playwright version matches package.json.",
        },
        {
          issue: "Only one shard appears to run",
          fix: "Confirm the strategy.matrix block correctly lists both shardIndex values (1 and 2) and shardTotal is 2, matching the --shard=\${{ matrix.shardIndex }}/\${{ matrix.shardTotal }} flag.",
        },
      ],
      hints: [
        "The --shard=N/TOTAL flag is Playwright's own built-in sharding mechanism -- no custom test-splitting logic is needed.",
        "if: failure() on the artifact-upload step ensures the report is only uploaded when genuinely needed, matching this lesson's failure-only diagnostic-capture principle.",
        "Making this check REQUIRED (via the GitHub repository's branch protection settings) is what turns it from informational into a genuine quality gate -- that configuration step happens in your repository's settings, not in this YAML file.",
      ],
      referenceSolution: {
        summary:
          "The workflow triggers on pull requests, splits the suite across 2 parallel shard jobs using Playwright's built-in --shard flag, installs real browsers with system dependencies via --with-deps, and uploads the HTML report as a retrievable artifact only when a shard actually fails -- matching this lesson's failure-only diagnostic-capture principle from the previous lesson.",
        files: [
          {
            path: ".github/workflows/ci.yml",
            content: `name: CI

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shardIndex: [1, 2]
        shardTotal: [2]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run tests (shard \${{ matrix.shardIndex }}/\${{ matrix.shardTotal }})
        run: npx playwright test --shard=\${{ matrix.shardIndex }}/\${{ matrix.shardTotal }}
      - name: Upload failure diagnostics
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-shard-\${{ matrix.shardIndex }}
          path: playwright-report/
          retention-days: 7
`,
          },
        ],
      },
      extensionChallenge:
        "In your GitHub repository's branch protection settings, mark both shard jobs as required status checks for main, then confirm (by intentionally breaking a test in a new PR) that GitHub now actually blocks the merge button -- turning this from an informational check into a genuine quality gate.",
    },
    commonMistakes: [
      "Treating a CI check as a safety measure without ever configuring it as a required, merge-blocking status check -- an informational-only check that nobody is required to act on will eventually be silently ignored.",
      "Introducing sharding before the suite is genuinely isolated (Lesson 8) -- tests that secretly depended on another test's leftover state can break unpredictably once they're split across different shards/machines with no shared execution context.",
      "Designing a pipeline that only works correctly when a cache hits, rather than treating caching as a pure performance optimization -- this turns an infrastructure convenience into a hidden correctness dependency.",
    ],
    quiz: [
      {
        id: "tafe-q11-1",
        prompt: "What makes a CI check a genuine quality GATE, as opposed to purely informational?",
        choices: [
          "Simply running in CI at all",
          "Its failure actually BLOCKS something -- a merge or a deploy -- rather than just being visible somewhere that nobody is required to act on",
          "Having a green checkmark in the UI",
          "Running faster than 5 minutes",
        ],
        correctIndex: 1,
        explanation:
          "A check only provides real protection if its failure can actually block a merge or deploy -- a check that merely reports its result, with nothing requiring action on failure, tends to be silently ignored over time.",
      },
      {
        id: "tafe-q11-2",
        prompt: "Why does sharding require the test suite to already be genuinely isolated?",
        choices: [
          "Sharding has no relationship to test isolation",
          "Shards may run on completely different machines with zero shared state -- a test that secretly depended on another test's leftover state (even if it 'worked' on one worker) can break unpredictably once split across shards",
          "Sharding automatically fixes any existing isolation bugs",
          "Isolation is only relevant for single-worker execution",
        ],
        correctIndex: 1,
        explanation:
          "Sharding removes any shared execution context between tests that end up in different shards -- a pre-existing isolation bug that happened to be masked by both tests running on the same worker will surface unpredictably once sharding is introduced.",
      },
      {
        id: "tafe-q11-3",
        prompt:
          "What should CI caching be relied on for, and what should it never be relied on for?",
        choices: [
          "Caching should be relied on for both performance and correctness equally",
          "Caching should only ever affect SPEED (a faster run on a cache hit); a pipeline should still produce correct results on a cache miss, never depend on the cache being present or valid for correctness",
          "Caching should never be used in any CI pipeline",
          "Caching only matters for deployment, never for test execution",
        ],
        correctIndex: 1,
        explanation:
          "Caching is a genuine performance optimization -- a cache miss should, at worst, produce a slower run, never an incorrect one. A pipeline that only works correctly when its cache happens to hit has turned an infrastructure convenience into a hidden, fragile correctness dependency.",
      },
    ],
    takeaway:
      "Configure a genuinely stable, reliable check as a required, merge-blocking status check to make it a real quality gate, not just informational visibility. Only introduce sharding once the suite is genuinely isolated. Treat CI caching strictly as a performance optimization -- a pipeline must still produce correct results on a cache miss.",
    summary:
      "A CI check is a genuine quality gate only when its failure actually blocks a merge or deploy -- a check with no such consequence tends to be silently ignored. Sharding splits a suite across parallel workers with zero shared state, which requires genuine test isolation to have already been achieved, or pre-existing isolation bugs will surface unpredictably. CI caching should be relied on strictly for speed -- a pipeline should always produce correct results on a cache miss, never depend on a cache hit for correctness.",
    nextLessonSlug: "tafe-failure-triage-ownership",
  },
  {
    id: "tafe-failure-triage-ownership",
    slug: "tafe-failure-triage-ownership",
    title: "Failure Triage, Ownership, and Code Review Standards",
    description:
      "A repeatable process for classifying a CI failure quickly and correctly, why every part of a framework needs a clear owner, and what a code review checklist for test code should specifically look for.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 12,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["tafe-ci-quality-gates"],
    objectives: [
      "Apply a repeatable triage classification to a CI failure (real regression vs. flaky test vs. environment issue vs. test bug)",
      "Explain why an unowned framework component tends to decay, even if it was well-built initially",
      "Identify what a code review checklist for TEST code should specifically check, beyond what an application-code review checks",
    ],
    skills: ["test-automation", "triage", "code-review", "typescript"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Playwright Docs: Debugging Tests", url: "https://playwright.dev/docs/debug" },
    ],
    keywords: ["failure triage", "ownership", "code review", "test automation"],
    explanation: `**No real CI failure is triaged in this lesson's exercises -- they model failure classification and code-review-checklist logic as data, using genuine JavaScript/TypeScript execution.**

**Failure triage** is the first, fast classification step before deep investigation begins — and a repeatable classification scheme makes this fast and consistent rather than ad hoc: is this a **real regression** (the application genuinely broke, and the test correctly caught it)? A **known flaky test** (already identified, being tracked, not a new signal)? An **environment issue** (the CI runner itself had a problem unrelated to the code or the test, like a network blip reaching an external dependency)? Or a **test bug** (the application behaves correctly, but the test itself has an incorrect assertion or a genuine isolation/timing bug)? Getting this classification right quickly matters because each category has a completely different correct next action — a real regression blocks a merge and needs a code fix; a test bug needs the test fixed, not the application; and misclassifying one as another wastes real time and can mean a genuine regression gets waved through as "probably just flaky."

**Ownership** matters because an unowned piece of a framework — a fixture, a service client, a page object nobody feels responsible for maintaining — tends to **decay** even if it was well-designed and correctly built initially: as the underlying application changes, that piece's assumptions can quietly go stale, and with no clear owner, no one is specifically prompted to notice or update it, so it silently becomes less reliable until a confusing, hard-to-diagnose failure finally surfaces the drift. Clear ownership (even informal — "this fixture's changes get reviewed by whoever owns the login flow") is what keeps a framework's pieces current as the underlying system evolves, rather than accumulating quiet rot.

A code review checklist for **test code** should check for things an application-code review checklist typically doesn't emphasize: does this test have genuine, deterministic assertions (not merely "it didn't throw")? Does it use unique, self-created test data rather than a hardcoded or shared value (Lesson 3/8)? Does it avoid a fixed \`sleep\`/timeout in favor of a proper wait condition? Does a new fixture or page object avoid duplicating something that already exists elsewhere in the framework? Is a new guided/independent-style exercise (in this platform's own specific context) honestly labeled about what it does and doesn't actually execute? A reviewer applying only generic code-quality standards to test code can miss exactly the class of problem — flakiness, isolation bugs, hidden duplication — that's specific to test automation.`,
    example: {
      language: "javascript",
      description:
        "Modeling a fast failure-triage classification and detecting an unowned, decaying framework component, as data.",
      code: `function classifyFailure(applicationBehaviorChanged, isKnownFlaky, isEnvironmentIssue) {
  if (isEnvironmentIssue) return "environment-issue";
  if (isKnownFlaky) return "known-flaky-test";
  if (applicationBehaviorChanged) return "real-regression";
  return "test-bug"; // application is fine, but the test itself is wrong
}
console.log(classifyFailure(true, false, false));  // "real-regression" -- blocks merge, needs an application fix
console.log(classifyFailure(false, false, false)); // "test-bug" -- needs the TEST fixed, not the application

function ownershipRisk(hasNamedOwner, timeSinceLastReview) {
  if (hasNamedOwner) return "low"; // someone is specifically prompted to keep it current
  if (timeSinceLastReview > 180) return "high"; // unowned AND stale -- a real decay risk
  return "moderate";
}
console.log(ownershipRisk(false, 200)); // "high" -- unowned and stale, a genuine decay risk`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call classifyFailure with applicationBehaviorChanged=false and isKnownFlaky=true, and confirm a known flaky test is correctly classified even though the application didn't change.",
      code: `function classifyFailure(applicationBehaviorChanged, isKnownFlaky, isEnvironmentIssue) {
  if (isEnvironmentIssue) return "environment-issue";
  if (isKnownFlaky) return "known-flaky-test";
  if (applicationBehaviorChanged) return "real-regression";
  return "test-bug";
}
console.log(classifyFailure(false, true, false));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models the fast failure-triage classification only -- no real failure is investigated. Write triageFailure(applicationBehaviorChanged, isKnownFlaky, isEnvironmentIssue), matching the priority order: environment-issue first, then known-flaky-test, then real-regression, then test-bug as the fallback.",
      starterCode: `function triageFailure(applicationBehaviorChanged, isKnownFlaky, isEnvironmentIssue) {
  // TODO
}
`,
      solutionCode: `function triageFailure(applicationBehaviorChanged, isKnownFlaky, isEnvironmentIssue) {
  if (isEnvironmentIssue) return "environment-issue";
  if (isKnownFlaky) return "known-flaky-test";
  if (applicationBehaviorChanged) return "real-regression";
  return "test-bug";
}`,
      harness: `
        try { window.__report('t1', triageFailure(false, false, true) === "environment-issue", 'an environment issue should take priority over other classifications'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', triageFailure(true, false, false) === "real-regression", 'a genuine application behavior change should be classified as a real regression'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', triageFailure(false, false, false) === "test-bug", 'with no other explanation, the fallback should be a test bug, not an unexplained mystery'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly prioritizes an environment issue" },
        { id: "t2", description: "correctly identifies a real regression" },
        {
          id: "t3",
          description: "correctly falls back to a test bug when nothing else explains the failure",
        },
      ],
      hints: [
        "This models a REPEATABLE classification process -- checking in a consistent, deliberate order, rather than guessing case by case.",
        "Each of the four categories implies a completely different correct next action -- getting the classification right quickly is what this lesson emphasizes.",
      ],
    },
    independentExercise: {
      id: "tafe-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models a test-code-specific review checklist item only -- no real code review occurs. Write testCodeReviewIssues(usesFixedSleep, usesHardcodedTestData, hasGenuineAssertion): return an array of issue names (in this order) among 'fixed-sleep-instead-of-wait-condition', 'hardcoded-non-unique-test-data', 'no-genuine-assertion' that apply, based on the three inputs (the third input inverted: hasGenuineAssertion false means the issue applies).",
      starterCode: `function testCodeReviewIssues(usesFixedSleep, usesHardcodedTestData, hasGenuineAssertion) {
  // TODO
}
`,
      solutionCode: `function testCodeReviewIssues(usesFixedSleep, usesHardcodedTestData, hasGenuineAssertion) {
  const issues = [];
  if (usesFixedSleep) issues.push("fixed-sleep-instead-of-wait-condition");
  if (usesHardcodedTestData) issues.push("hardcoded-non-unique-test-data");
  if (!hasGenuineAssertion) issues.push("no-genuine-assertion");
  return issues;
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(testCodeReviewIssues(true, false, true)) === JSON.stringify(["fixed-sleep-instead-of-wait-condition"]), 'should flag only the fixed-sleep issue'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', testCodeReviewIssues(false, false, true).length === 0, 'test code with none of these issues should pass review cleanly'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', testCodeReviewIssues(true, true, false).length === 3, 'test code with all three issues should be flagged for all of them'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a single, specific test-code review issue" },
        { id: "t2", description: "correctly identifies clean test code with no issues" },
        { id: "t3", description: "correctly identifies all three issues together" },
      ],
      hints: [
        "This models the test-code-specific checklist this lesson describes -- issues a generic application-code review would likely miss.",
        "The third check inverts the input, since a MISSING genuine assertion is the actual problem, not its presence.",
      ],
    },
    commonMistakes: [
      "Investigating every CI failure from scratch without a repeatable triage classification -- this wastes time and risks misclassifying a real regression as 'probably just flaky,' letting it merge unaddressed.",
      "Leaving a fixture, service client, or page object with no clear owner -- even well-built framework pieces quietly decay as the underlying application changes, with no one specifically prompted to notice or update them.",
      "Reviewing test code using only generic application-code standards -- this misses test-specific problems like fixed sleeps instead of proper waits, hardcoded non-unique test data, and assertions that don't actually verify anything meaningful.",
    ],
    quiz: [
      {
        id: "tafe-q12-1",
        prompt: "Why does getting a failure's triage classification right QUICKLY matter?",
        choices: [
          "It doesn't matter; every failure should be investigated identically regardless of classification",
          "Each category (real regression, known flaky, environment issue, test bug) implies a completely different correct next action, and misclassifying one as another can mean a genuine regression gets waved through as 'probably just flaky'",
          "Fast classification is only relevant for performance metrics, not correctness",
          "Triage classification has no effect on what happens next",
        ],
        correctIndex: 1,
        explanation:
          "A real regression needs to block a merge and get an application fix; a test bug needs the test fixed instead -- getting this classification wrong risks letting an actual regression through unaddressed, or wasting time fixing the wrong thing.",
      },
      {
        id: "tafe-q12-2",
        prompt:
          "Why does an unowned framework component tend to decay over time, even if it was well-built initially?",
        choices: [
          "Code inherently degrades on its own, regardless of ownership",
          "As the underlying application changes, an unowned component's assumptions can quietly go stale, and with no one specifically prompted to notice or update it, the drift accumulates silently until a confusing failure finally surfaces it",
          "Ownership has no real effect on a framework component's reliability over time",
          "Only components without any tests decay",
        ],
        correctIndex: 1,
        explanation:
          "Clear ownership is what specifically prompts someone to notice and update a component as the surrounding application evolves -- without it, drift between the component's assumptions and reality can accumulate quietly and go unnoticed until it finally causes a confusing failure.",
      },
      {
        id: "tafe-q12-3",
        prompt:
          "What kind of issue should a code review checklist for TEST code specifically check for, that a generic application-code review might miss?",
        choices: [
          "Whether the code compiles",
          "Test-specific problems like a fixed sleep instead of a proper wait condition, hardcoded non-unique test data, or an assertion that doesn't genuinely verify anything meaningful",
          "Whether the code uses semicolons consistently",
          "Whether the code has any comments at all",
        ],
        correctIndex: 1,
        explanation:
          "Generic code-quality review misses problems specific to test automation -- flakiness sources like fixed sleeps, isolation risks like hardcoded shared data, and assertions that technically run but don't actually check anything meaningful all need test-specific review attention.",
      },
    ],
    takeaway:
      "Use a repeatable, fast triage classification (real regression, known flaky, environment issue, test bug) for CI failures, since each implies a different correct action. Assign clear ownership to every framework component to prevent quiet decay as the application evolves. Review test code against test-specific standards -- wait conditions vs. fixed sleeps, unique vs. hardcoded data, genuine vs. hollow assertions.",
    summary:
      "A repeatable, fast failure-triage classification (real regression, known flaky, environment issue, test bug) prevents wasted investigation time and the risk of misclassifying a real regression as harmless flakiness. Unowned framework components tend to quietly decay as the underlying application changes, since no one is specifically prompted to keep their assumptions current. A test-code review checklist should specifically check for fixed sleeps, hardcoded non-unique test data, and hollow assertions -- problems a generic application-code review standard tends to miss.",
    nextLessonSlug: "tafe-versioning-extensibility",
  },
  {
    id: "tafe-versioning-extensibility",
    slug: "tafe-versioning-extensibility",
    title: "Versioning, Extensibility, and Framework Anti-Patterns",
    description:
      "Managing a framework's own internal changes (like breaking a shared fixture's signature) responsibly, designing genuine extension points, and recognizing well-known framework anti-patterns before they take hold.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 13,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["tafe-failure-triage-ownership"],
    objectives: [
      "Explain why a breaking change to a widely used framework component needs a deliberate rollout process, not a single instant change",
      "Design a genuine extension point that lets new test types be added without modifying the framework's core",
      "Recognize at least three well-known test-framework anti-patterns and why each one is costly",
    ],
    skills: ["test-automation", "extensibility", "anti-patterns", "typescript"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Playwright Docs: Fixtures (parameterized and worker-scoped)",
        url: "https://playwright.dev/docs/test-fixtures",
      },
    ],
    keywords: ["versioning", "extensibility", "anti-patterns", "test automation"],
    explanation: `**No real framework rollout or extension mechanism executes in this lesson's exercises -- they model versioning and anti-pattern-detection decisions as data, using genuine JavaScript/TypeScript execution.**

A framework's own internal components change over time, and a **breaking change** to something widely used (changing a shared fixture's signature, renaming a heavily used service-client method) is genuinely risky if rolled out as a single, instant, all-at-once change across a large suite — every test using the old signature breaks simultaneously, all at once, often discovered only when CI runs. A more deliberate rollout — introducing the new version alongside the old one (even temporarily, clearly marked as deprecated), migrating call sites incrementally, and only removing the old version once nothing depends on it — spreads the real risk out and keeps the suite in a working state throughout the transition, rather than concentrating it into one risky moment.

A genuine **extension point** is a place in the framework's design specifically intended for new capability to be added without modifying the framework's own core code — a plugin-style reporter interface that a new report format can implement, or a fixture composition pattern (Lesson 4) that lets a new test category compose existing fixtures rather than requiring a change to the fixture system itself. Designing for extensibility is a genuine, honest tradeoff, similar to the DSL tradeoff from Lesson 7: over-engineering broad, speculative extension points for capabilities nobody has actually needed yet adds real complexity for a hypothetical future that may never arrive — the practical discipline is designing an extension point once a second, genuine, concrete need for one has actually appeared, not preemptively for every conceivable future possibility.

Several **anti-patterns** recur across real test automation frameworks, and recognizing them is worth being explicit about: the **"God fixture"** (one enormous fixture doing far too much, that most tests depend on and nobody fully understands, making any change to it high-risk); **test interdependency** (tests written to only work when run in a specific order, silently reintroducing the isolation problems from Lesson 8); **assertion-free "smoke tests"** (a test that visits a page and does nothing more than confirm the page didn't throw, providing far less real coverage than its name and green checkmark imply); and **copy-paste test authoring** (starting a new test by copying an existing large one and modifying pieces, which spreads inconsistency and duplicated logic rather than reusing the framework's actual shared components).`,
    example: {
      language: "javascript",
      description:
        "Modeling a deliberate, staged breaking-change rollout vs. an instant one, and detecting an assertion-free 'smoke test' anti-pattern, as data.",
      code: `function rolloutRisk(strategy) {
  const risk = { "instant-single-change": "high", "deprecate-then-migrate-then-remove": "low" };
  return risk[strategy] ?? "unknown";
}
console.log(rolloutRisk("instant-single-change"));             // "high" -- every caller breaks simultaneously
console.log(rolloutRisk("deprecate-then-migrate-then-remove")); // "low" -- risk is spread across a deliberate transition

function isAssertionFreeSmokeTest(testBody) {
  // Models detecting a test with NO real expect(...) call -- just navigation with no actual verification.
  return testBody.includes("goto(") && !testBody.includes("expect(");
}
console.log(isAssertionFreeSmokeTest('await page.goto("/dashboard");')); // true -- visits a page, verifies NOTHING
console.log(isAssertionFreeSmokeTest('await page.goto("/dashboard"); await expect(page.getByRole("heading")).toBeVisible();')); // false -- a genuine check`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call rolloutRisk with an unrecognized strategy name, and confirm it correctly falls back to 'unknown' rather than silently guessing a risk level.",
      code: `function rolloutRisk(strategy) {
  const risk = { "instant-single-change": "high", "deprecate-then-migrate-then-remove": "low" };
  return risk[strategy] ?? "unknown";
}
console.log(rolloutRisk("some-other-approach"));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models deciding whether a breaking framework change needs a staged rollout only -- no real change is deployed. Write needsStagedRollout(callSiteCount, isBreakingChange): return true only if isBreakingChange AND callSiteCount is greater than 1 (a single call site can safely be updated directly, in one atomic change).",
      starterCode: `function needsStagedRollout(callSiteCount, isBreakingChange) {
  // TODO
}
`,
      solutionCode: `function needsStagedRollout(callSiteCount, isBreakingChange) {
  return isBreakingChange && callSiteCount > 1;
}`,
      harness: `
        try { window.__report('t1', needsStagedRollout(15, true) === true, 'a breaking change with many call sites should need a staged rollout'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', needsStagedRollout(1, true) === false, 'a breaking change with only one call site can be updated directly, atomically'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', needsStagedRollout(15, false) === false, 'a non-breaking change never needs a staged rollout, regardless of call site count'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly requires a staged rollout for a widely used breaking change",
        },
        { id: "t2", description: "correctly allows a direct change for a single call site" },
        { id: "t3", description: "correctly never requires staging for a non-breaking change" },
      ],
      hints: [
        "This models the real, practical risk driver this lesson names: the number of call sites that would break simultaneously.",
        "A non-breaking change (like adding an optional parameter) never needs this treatment, regardless of how widely used the component is.",
      ],
    },
    independentExercise: {
      id: "tafe-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models detecting the 'God fixture' anti-pattern only -- no real fixture is scanned. Write isGodFixture(dependentTestCount, responsibilityCount): return true if dependentTestCount is greater than 20 AND responsibilityCount is greater than 3 (a fixture that's both heavily depended on AND doing too many unrelated things).",
      starterCode: `function isGodFixture(dependentTestCount, responsibilityCount) {
  // TODO
}
`,
      solutionCode: `function isGodFixture(dependentTestCount, responsibilityCount) {
  return dependentTestCount > 20 && responsibilityCount > 3;
}`,
      harness: `
        try { window.__report('t1', isGodFixture(50, 6) === true, 'a heavily depended-on fixture with many unrelated responsibilities should be flagged'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isGodFixture(50, 1) === false, 'a heavily depended-on but focused, single-responsibility fixture should NOT be flagged'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isGodFixture(3, 6) === false, 'a fixture with many responsibilities but very few dependents is a lower-risk, more localized concern'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a genuine God fixture" },
        { id: "t2", description: "correctly avoids flagging a widely used but focused fixture" },
        {
          id: "t3",
          description: "correctly avoids flagging an unfocused fixture with very limited reach",
        },
      ],
      hints: [
        "This models the two DIMENSIONS of the God-fixture anti-pattern together -- being widely depended on is not itself the problem; combined with doing too many unrelated things, it becomes genuinely risky.",
        "A fixture with many responsibilities but almost no dependents is a more contained, lower-priority concern than one that's both.",
      ],
    },
    commonMistakes: [
      "Rolling out a breaking change to a widely used fixture or service-client method as one instant, all-at-once change -- every dependent test breaks simultaneously, typically discovered only when CI runs, rather than being spread across a deliberate, safer transition.",
      "Building broad, speculative extension points for capabilities nobody has actually needed yet -- this adds real complexity for a hypothetical future that may never arrive, rather than waiting for a second, genuine, concrete need to appear.",
      "Writing an assertion-free 'smoke test' that only confirms a page didn't throw -- its green checkmark and reassuring name imply far more real coverage than it actually provides.",
    ],
    quiz: [
      {
        id: "tafe-q13-1",
        prompt:
          "Why is an instant, all-at-once breaking change to a widely used fixture risky, compared to a deliberate, staged rollout?",
        choices: [
          "There is no real difference in risk between the two approaches",
          "An instant change breaks every dependent test simultaneously, typically discovered only when CI runs -- a staged rollout (deprecate, migrate incrementally, then remove) spreads that risk across a deliberate transition instead",
          "Staged rollouts are always slower and therefore worse",
          "Breaking changes are never actually risky in a test framework",
        ],
        correctIndex: 1,
        explanation:
          "Concentrating a breaking change into one instant moment means every dependent test fails simultaneously, often surfacing all at once in CI -- a staged rollout keeps the suite working throughout the transition instead of concentrating that risk.",
      },
      {
        id: "tafe-q13-2",
        prompt:
          "What's the practical discipline this lesson recommends for deciding when to build a genuine extension point?",
        choices: [
          "Build broad extension points preemptively for every conceivable future capability",
          "Design an extension point once a second, genuine, concrete need for one has actually appeared -- not preemptively for a hypothetical future that may never arrive",
          "Never build extension points under any circumstances",
          "Extension points should only be built by the framework's original author",
        ],
        correctIndex: 1,
        explanation:
          "This mirrors the DSL tradeoff from an earlier lesson -- extensibility has a real complexity cost, so it's earned by an actual, concrete second need appearing, not built speculatively for capabilities that may never actually be required.",
      },
      {
        id: "tafe-q13-3",
        prompt:
          "Why is an assertion-free 'smoke test' (one that only visits a page and confirms it didn't throw) considered an anti-pattern?",
        choices: [
          "It isn't; visiting a page without error is sufficient real coverage",
          "Its name and green checkmark imply meaningfully more real coverage than it actually provides, since it never verifies anything specific about the page's actual, correct behavior",
          "Smoke tests are always slower than other test types",
          "Assertion-free tests are technically impossible to write",
        ],
        correctIndex: 1,
        explanation:
          "A test that passes as long as nothing throws provides a false sense of security -- its reassuring name and green result imply real verification happened, when in fact nothing about the page's actual correctness was ever checked.",
      },
    ],
    takeaway:
      "Roll out a breaking change to a widely used framework component through a deliberate deprecate-migrate-remove process, not an instant, all-at-once change. Build a genuine extension point once a real, concrete second need has appeared, not speculatively. Watch for recurring anti-patterns -- God fixtures, test interdependency, assertion-free smoke tests, copy-paste authoring -- since each is individually costly and easy to slide into gradually.",
    summary:
      "A breaking change to a widely used fixture or service-client method is safer rolled out through a deliberate deprecate-then-migrate-then-remove process than as one instant, all-at-once change that breaks every dependent test simultaneously. A genuine extension point is earned by an actual, concrete second need, not built speculatively for a hypothetical future. Recognized anti-patterns worth watching for include the God fixture, test interdependency, assertion-free smoke tests, and copy-paste test authoring -- each undermines the framework's maintainability in a distinct, well-documented way.",
    nextLessonSlug: "tafe-migration-health-docs",
  },
  {
    id: "tafe-migration-health-docs",
    slug: "tafe-migration-health-docs",
    title: "Migration Strategy, Framework Health Metrics, and Release Readiness",
    description:
      "Planning a realistic migration when a framework needs a fundamental architectural change, measuring a framework's actual health beyond pass/fail counts, and what genuinely 'release-ready' documentation for a framework includes.",
    trackSlug: "test-automation-framework",
    courseSlug: "test-automation-framework-engineering",
    order: 14,
    difficulty: "advanced",
    estimatedMinutes: 22,
    prerequisites: ["tafe-versioning-extensibility"],
    objectives: [
      "Design a realistic, incremental migration plan for a framework-wide architectural change, rather than a risky big-bang rewrite",
      "Identify at least four framework health metrics beyond a simple pass/fail count",
      "Explain what documentation a framework needs to be genuinely usable and maintainable by someone other than its original author",
    ],
    skills: ["test-automation", "migration", "framework-health", "documentation"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Playwright Docs: Best Practices",
        url: "https://playwright.dev/docs/best-practices",
      },
    ],
    keywords: ["migration", "framework health", "documentation", "test automation"],
    explanation: `**No real migration, metrics dashboard, or documentation site is generated by this lesson's exercises -- they model migration-planning and health-metric decisions as data, using genuine JavaScript/TypeScript execution.**

A fundamental architectural change to an established framework — switching test-data strategies, restructuring the fixture composition graph, adopting a new reporting system — is genuinely risky to attempt as a **big-bang rewrite**: freezing most other framework work for an extended period while the whole suite is migrated at once concentrates risk into one large, high-stakes change with a long feedback loop before anything is confirmed working again. A realistic **incremental migration** plan instead identifies a natural boundary (migrate one module or feature area at a time), keeps both the old and new approaches working side by side during the transition, and validates each increment before moving to the next — trading a longer overall timeline for dramatically lower risk at any single point, and for the ability to stop, pause, or adjust the plan based on what's actually being learned partway through.

**Framework health** is meaningfully more than a pass/fail count on the latest run — a genuinely informative set of health metrics includes: the suite's **flaky-test rate** (what fraction of tests have needed a retry recently, even if all currently pass), **total CI runtime trend** (is the suite getting slower over time as it grows, and is that growth outpacing the team's tolerance for it), **test-to-code coverage alignment** (are new application features consistently getting new test coverage, or is that ratio quietly drifting), and **mean time to triage** (how long, on average, does it actually take from a CI failure to a correct classification, per Lesson 12) — each of these surfaces a different, real kind of decay that a simple "233 passed, 5 skipped, 0 failed" summary, on its own, completely hides.

**Release-ready documentation** for a framework means someone other than its original author can actually use and extend it without that author's direct involvement: a clear README covering setup and how to run the suite locally, the framework's own architecture (mirroring this course's layering — config, fixtures, data, pages, services), how to add a new test following the established patterns, the tagging scheme and what each tag actually means, the CI pipeline's structure and what makes a check a genuine gate versus informational, and known limitations or deliberately deferred work — documentation that's accurate and complete enough that a new contributor's first real contribution doesn't require a live walkthrough from someone who already has the whole design in their head.`,
    example: {
      language: "javascript",
      description:
        "Modeling comparing big-bang vs. incremental migration risk, and a simple framework-health scorecard, as data.",
      code: `function migrationRisk(strategy, moduleCount) {
  if (strategy === "big-bang") return "high -- all " + moduleCount + " modules change at once, with one long feedback loop";
  return "lower -- each of the " + moduleCount + " modules is migrated and validated independently";
}
console.log(migrationRisk("big-bang", 12));    // high risk, one long feedback loop
console.log(migrationRisk("incremental", 12)); // lower risk, validated one module at a time

function healthSummary(flakyRatePercent, runtimeTrendPercent) {
  const concerns = [];
  if (flakyRatePercent > 5) concerns.push("flaky-rate-elevated");
  if (runtimeTrendPercent > 20) concerns.push("runtime-growing-faster-than-suite-size");
  return concerns.length === 0 ? "healthy" : concerns;
}
console.log(healthSummary(2, 5));   // "healthy" -- both metrics within a reasonable range
console.log(healthSummary(8, 30));  // ["flaky-rate-elevated","runtime-growing-faster-than-suite-size"] -- real, actionable signals a bare pass/fail count would hide`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call healthSummary with flakyRatePercent 3 and runtimeTrendPercent 25, and observe which single concern (if any) is flagged.",
      code: `function healthSummary(flakyRatePercent, runtimeTrendPercent) {
  const concerns = [];
  if (flakyRatePercent > 5) concerns.push("flaky-rate-elevated");
  if (runtimeTrendPercent > 20) concerns.push("runtime-growing-faster-than-suite-size");
  return concerns.length === 0 ? "healthy" : concerns;
}
console.log(healthSummary(3, 25));`,
      editable: true,
    },
    guidedExercise: {
      id: "tafe-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "This models planning an incremental migration's step order only -- no real migration runs. Write nextModuleToMigrate(modules), returning the name of the first module (in array order) whose status is 'not-started'. If none remain, return null.",
      starterCode: `function nextModuleToMigrate(modules) {
  // TODO -- modules is an array of { name, status } objects
}
`,
      solutionCode: `function nextModuleToMigrate(modules) {
  const next = modules.find((m) => m.status === "not-started");
  return next ? next.name : null;
}`,
      harness: `
        try { window.__report('t1', nextModuleToMigrate([{name:"auth",status:"done"},{name:"checkout",status:"not-started"}]) === "checkout", 'should find the first not-started module'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', nextModuleToMigrate([{name:"auth",status:"done"},{name:"checkout",status:"done"}]) === null, 'with everything migrated, should return null'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', nextModuleToMigrate([{name:"auth",status:"in-progress"},{name:"checkout",status:"not-started"}]) === "checkout", 'an in-progress module should not be re-selected as the next one to START'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly finds the next module still needing migration" },
        { id: "t2", description: "correctly returns null once every module is migrated" },
        { id: "t3", description: "correctly distinguishes in-progress from not-started" },
      ],
      hints: [
        "This models exactly the incremental migration approach this lesson recommends -- one deliberate module at a time, not all at once.",
        "Array.prototype.find stops at the FIRST match, mirroring working through modules in a defined, deliberate order.",
      ],
    },
    independentExercise: {
      id: "tafe-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "This models a simple, multi-metric framework-health scorecard only -- no real metrics are collected. Write healthConcerns(flakyRatePercent, meanTriageMinutes): return an array of concern names (in this order) among 'flaky-rate-elevated' (if flakyRatePercent > 5), 'triage-too-slow' (if meanTriageMinutes > 60) that apply.",
      starterCode: `function healthConcerns(flakyRatePercent, meanTriageMinutes) {
  // TODO
}
`,
      solutionCode: `function healthConcerns(flakyRatePercent, meanTriageMinutes) {
  const concerns = [];
  if (flakyRatePercent > 5) concerns.push("flaky-rate-elevated");
  if (meanTriageMinutes > 60) concerns.push("triage-too-slow");
  return concerns;
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(healthConcerns(8, 30)) === JSON.stringify(["flaky-rate-elevated"]), 'should flag only the elevated flaky rate'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', healthConcerns(2, 20).length === 0, 'healthy metrics on both dimensions should report no concerns'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', JSON.stringify(healthConcerns(10, 90)) === JSON.stringify(["flaky-rate-elevated","triage-too-slow"]), 'should flag both concerns together, in order, when both thresholds are exceeded'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly flags a single elevated metric" },
        { id: "t2", description: "correctly reports no concerns for healthy metrics" },
        { id: "t3", description: "correctly flags both concerns together" },
      ],
      hints: [
        "This models exactly why this lesson argues framework health needs MULTIPLE metrics -- a bare pass/fail count would show neither of these real, actionable signals at all.",
        "Each concern is evaluated independently against its own threshold.",
      ],
    },
    commonMistakes: [
      "Attempting a fundamental framework architecture change as a single, big-bang rewrite -- this concentrates risk into one large, high-stakes change with a long feedback loop, instead of validating smaller increments along the way.",
      "Judging a framework's health purely by its latest pass/fail count -- this completely hides real decay signals like a rising flaky-test rate, a growing CI runtime trend, or a widening gap between new features and new test coverage.",
      "Leaving a framework's documentation incomplete or only in the original author's head -- this means every new contribution requires a live walkthrough from that specific person, rather than the framework being genuinely usable and extensible by anyone.",
    ],
    quiz: [
      {
        id: "tafe-q14-1",
        prompt:
          "Why is an incremental migration generally preferred over a big-bang rewrite for a fundamental framework architecture change?",
        choices: [
          "There is no real difference in risk between the two approaches",
          "A big-bang rewrite concentrates risk into one large, high-stakes change with a long feedback loop; an incremental migration validates smaller, natural boundaries one at a time, trading a longer timeline for meaningfully lower risk",
          "Incremental migrations always take exactly the same amount of time as a big-bang rewrite",
          "Big-bang rewrites are always technically impossible",
        ],
        correctIndex: 1,
        explanation:
          "An incremental migration validates each smaller piece before moving to the next, keeping both old and new approaches working side by side during the transition -- this trades a longer overall timeline for dramatically lower risk at any single point, compared to one large, all-at-once change.",
      },
      {
        id: "tafe-q14-2",
        prompt:
          "Why does a bare pass/fail count on the latest run fail to capture a framework's real health?",
        choices: [
          "A pass/fail count is always a complete and sufficient health signal on its own",
          "It hides real, actionable decay signals like a rising flaky-test rate, a growing CI runtime trend, or a widening test-coverage gap -- a suite can show '233 passed, 0 failed' while genuinely decaying on other dimensions",
          "Pass/fail counts are technically impossible to compute accurately",
          "Framework health has no meaningful relationship to test results at all",
        ],
        correctIndex: 1,
        explanation:
          "A healthy-looking pass/fail count can coexist with real decay on other dimensions -- a rising flaky rate, a growing runtime trend, or a widening coverage gap all represent genuine, actionable problems a simple pass/fail summary completely hides.",
      },
      {
        id: "tafe-q14-3",
        prompt: "What makes a framework's documentation genuinely 'release-ready'?",
        choices: [
          "Having at least one comment in every file",
          "Being accurate and complete enough that someone other than the original author can set up, use, and extend the framework without requiring a live walkthrough from that specific person",
          "Being written in a specific documentation tool",
          "Documentation quality has no bearing on release readiness",
        ],
        correctIndex: 1,
        explanation:
          "Release-ready documentation specifically means a new contributor can actually use and extend the framework independently -- covering setup, architecture, how to add a new test, the tagging scheme, the CI pipeline, and known limitations -- without needing the original author's direct, ongoing involvement.",
      },
    ],
    takeaway:
      "Plan a fundamental framework architecture change as a deliberate, incremental migration, not a risky big-bang rewrite. Track framework health across multiple real metrics -- flaky rate, CI runtime trend, coverage alignment, mean time to triage -- not just the latest pass/fail count. Write documentation complete enough that a new contributor can genuinely use and extend the framework without the original author's direct involvement.",
    summary:
      "An incremental migration validates a fundamental framework change one natural boundary at a time, trading a longer timeline for meaningfully lower risk compared to a big-bang rewrite. Framework health requires multiple real metrics -- flaky-test rate, CI runtime trend, test-coverage alignment, and mean time to triage -- since a bare pass/fail count can look perfectly healthy while genuine decay accumulates elsewhere. Release-ready documentation covers setup, architecture, how to add a new test, the tagging scheme, and the CI pipeline, so the framework is genuinely usable and extensible by someone other than its original author.",
  },
];
