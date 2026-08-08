import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Playwright Web Automation interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics
 * (Browser/Context/Page model, locators, auto-waiting, network
 * mocking, auth state, fixtures, page objects, parallelism, trace
 * viewer, flaky-test diagnosis) at the level real QA/SDET interviews
 * probe.
 */
export const playwrightInterviewQuestions: InterviewQuestionInput[] = [
  // --- Architecture & Locators (10) ---
  {
    id: "pw-interview-arch-01",
    courseSlug: "playwright-web-automation",
    question:
      "What is the relationship between a Browser, a BrowserContext, and a Page in Playwright?",
    answer:
      "A Browser is one launched browser process; a BrowserContext is an isolated session within it (its own cookies/storage, like an incognito profile); a Page is a single tab within a context. Multiple contexts can run in parallel from one browser instance without sharing state.",
    category: "Architecture & Locators",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-arch-02",
    courseSlug: "playwright-web-automation",
    question:
      "Why is creating a fresh BrowserContext per test (rather than reusing one context across all tests) generally recommended?",
    answer:
      "Each context has isolated cookies, local storage, and session state, so tests don't leak state between each other -- reusing one context risks one test's login/session affecting another test's starting conditions.",
    category: "Architecture & Locators",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-arch-03",
    courseSlug: "playwright-web-automation",
    question:
      "Why are role-based locators (`getByRole`) generally preferred over CSS selectors targeting implementation details like class names?",
    answer:
      "Role-based locators target how a real user and assistive technology perceive the page (button, link, heading, by accessible name), which is far more stable across styling/markup refactors than a CSS class name that might change for purely visual reasons unrelated to the element's actual function.",
    category: "Architecture & Locators",
    difficulty: "intermediate",
    codeExample: 'await page.getByRole("button", { name: "Submit" }).click();',
    commonMistake:
      "Locating elements by CSS class names tied to styling, which break whenever the page's visual design is refactored even if the element's function hasn't changed.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-arch-04",
    courseSlug: "playwright-web-automation",
    question:
      "What is the difference between `getByText` and `getByTestId`, and when might `getByTestId` still be justified?",
    answer:
      "`getByText` locates by visible text content; `getByTestId` locates by a dedicated `data-testid` attribute, independent of visible text or styling. `getByTestId` is justified when no accessible role/label/text reliably identifies the element (e.g. a purely decorative or dynamically-generated element with no stable accessible name).",
    category: "Architecture & Locators",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-arch-05",
    courseSlug: "playwright-web-automation",
    question:
      "What does a Playwright locator actually represent -- is it a reference to a specific DOM element at the moment it's created?",
    answer:
      "No -- a locator is a lazy, re-evaluated query. It doesn't resolve to an actual DOM element until an action is performed on it, and re-resolves fresh each time, which is part of why locators handle dynamically-changing pages well.",
    category: "Architecture & Locators",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-arch-06",
    courseSlug: "playwright-web-automation",
    question:
      "How do you scope a locator to search only within a specific container, rather than the whole page?",
    answer:
      'Chain locators -- e.g. `page.getByRole("listitem").filter({ hasText: "Milk" }).getByRole("button")` -- or call `.locator()`/`getByRole()` on an existing locator to narrow the search to its descendants.',
    category: "Architecture & Locators",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-arch-07",
    courseSlug: "playwright-web-automation",
    question:
      "What happens if a locator matches more than one element when you call `.click()` on it?",
    answer:
      "Playwright throws a strict-mode violation error rather than silently clicking the first match -- ambiguous locators must be narrowed (with `.first()`, `.nth()`, or a more specific selector) before an action can proceed.",
    category: "Architecture & Locators",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-arch-08",
    courseSlug: "playwright-web-automation",
    question: "What is the accessible name of an element, and why does it matter for `getByRole`?",
    answer:
      "The accessible name is the text a screen reader announces for an element -- derived from its visible text, an `aria-label`, or an associated `<label>`. `getByRole(role, { name })` matches against this computed accessible name, not just raw inner text.",
    category: "Architecture & Locators",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-arch-09",
    courseSlug: "playwright-web-automation",
    question:
      "Why does testing with role-based locators indirectly improve an application's accessibility over time?",
    answer:
      "Writing tests with `getByRole`/accessible names forces the underlying markup to actually expose correct roles and labels for elements to be locatable at all -- an inaccessible element (no role, no label) becomes hard to test, surfacing accessibility gaps as a natural side effect of writing tests.",
    category: "Architecture & Locators",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-arch-10",
    courseSlug: "playwright-web-automation",
    question: 'What does `page.locator("iframe").contentFrame()` let you do?',
    answer:
      "It gives you a Frame object scoped to that iframe's own document, letting you locate and interact with elements inside the iframe -- locators on the main page cannot directly reach into an iframe's separate document.",
    category: "Architecture & Locators",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Waiting, Assertions & Navigation (10) ---
  {
    id: "pw-interview-waiting-01",
    courseSlug: "playwright-web-automation",
    question:
      "What is 'auto-waiting' in Playwright, and what problem does it solve compared to older automation tools?",
    answer:
      "Before performing an action (click, fill, etc.), Playwright automatically waits for the target element to be visible, stable, and enabled -- eliminating the need for manually-tuned fixed `sleep()` calls that older tools relied on, which were either too short (flaky) or too long (slow).",
    category: "Waiting, Assertions & Navigation",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-waiting-02",
    courseSlug: "playwright-web-automation",
    question:
      "Why is a fixed `page.waitForTimeout(2000)` generally discouraged in a real test suite?",
    answer:
      "It's either wasteful (waiting longer than necessary when the app responds quickly) or still flaky (too short when the app is briefly slower than usual) -- a web-first assertion that waits for the actual expected condition is both faster on average and more reliable.",
    category: "Waiting, Assertions & Navigation",
    difficulty: "intermediate",
    commonMistake:
      "Using page.waitForTimeout() as a substitute for a proper web-first assertion, producing a test that's both slower than necessary and still occasionally flaky.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-waiting-03",
    courseSlug: "playwright-web-automation",
    question:
      "What is a 'web-first assertion,' and how does `expect(locator).toBeVisible()` differ from checking `.isVisible()` once?",
    answer:
      "A web-first assertion (like `expect(locator).toBeVisible()`) automatically retries until the condition is true or a timeout is reached; a one-time `.isVisible()` check returns the current state immediately with no retrying, so it can report false negatives on elements that just haven't rendered yet.",
    category: "Waiting, Assertions & Navigation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-waiting-04",
    courseSlug: "playwright-web-automation",
    question:
      "What does `page.waitForURL()` (or navigation auto-waiting) prevent when clicking a link that triggers navigation?",
    answer:
      "It prevents the test from proceeding to interact with the old page's elements or asserting on stale content before the navigation actually completes, avoiding a race between the click's navigation and the next test step.",
    category: "Waiting, Assertions & Navigation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-waiting-05",
    courseSlug: "playwright-web-automation",
    question:
      "How do you fill out and submit a form reliably with Playwright, handling client-side validation errors?",
    answer:
      "Fill each field with `.fill()` (which waits for the field to be actionable), click the submit control, then assert on the expected post-submit state -- either a success indicator or, if validation should fail, an assertion that the expected error message becomes visible.",
    category: "Waiting, Assertions & Navigation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-waiting-06",
    courseSlug: "playwright-web-automation",
    question:
      "What is the difference between `.fill()` and `.type()` (formerly `.pressSequentially()`)?",
    answer:
      "`.fill()` sets an input's value directly and fires the relevant events, which is fast and reliable for most cases; `.type()`/`.pressSequentially()` simulates individual keystrokes, which is slower but necessary when testing behavior that specifically reacts to each keypress (like a live-search autocomplete).",
    category: "Waiting, Assertions & Navigation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-waiting-07",
    courseSlug: "playwright-web-automation",
    question:
      "How do you handle a native browser `confirm()`/`alert()` dialog in a Playwright test?",
    answer:
      'Register a `page.on("dialog", handler)` listener before the action that triggers the dialog, and call `dialog.accept()` or `dialog.dismiss()` inside the handler -- Playwright otherwise auto-dismisses unhandled dialogs by default, which can silently change test behavior if not accounted for.',
    category: "Waiting, Assertions & Navigation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-waiting-08",
    courseSlug: "playwright-web-automation",
    question: "How do you test a file upload with Playwright?",
    answer:
      "Use `locator.setInputFiles(path)` on the file input element (or the element that opens a native file chooser), which programmatically supplies the file without needing to interact with the OS-level file picker dialog.",
    category: "Waiting, Assertions & Navigation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-waiting-09",
    courseSlug: "playwright-web-automation",
    question: "How do you capture and verify a file download triggered by a button click?",
    answer:
      'Wrap the triggering action in `page.waitForEvent("download")` (or the equivalent `expect` helper), which resolves with a Download object once the browser starts the download, letting you assert on its suggested filename or save it for inspection.',
    category: "Waiting, Assertions & Navigation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-waiting-10",
    courseSlug: "playwright-web-automation",
    question:
      "What is a popup window in the context of Playwright testing, and how do you get a handle to it?",
    answer:
      'A new tab/window opened by the page under test (e.g. via `target="_blank"` or `window.open()`) -- you capture it with `page.waitForEvent("popup")` around the triggering action, which returns a new Page object you can then interact with independently.',
    category: "Waiting, Assertions & Navigation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Network & Multi-page Flows (10) ---
  {
    id: "pw-interview-network-01",
    courseSlug: "playwright-web-automation",
    question:
      "What is network mocking in Playwright, and why is it useful for testing error states?",
    answer:
      "`page.route()` intercepts requests matching a pattern and lets you fulfill them with a custom response -- useful for reliably testing hard-to-reproduce states like a 500 server error or a slow/timed-out response, without needing the real backend to actually fail on demand.",
    category: "Network & Multi-page Flows",
    difficulty: "intermediate",
    codeExample:
      'await page.route("**/api/orders", (route) =>\n  route.fulfill({ status: 500, body: "Server error" }),\n);',
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-network-02",
    courseSlug: "playwright-web-automation",
    question: "What is the difference between `page.route()` and `page.waitForResponse()`?",
    answer:
      "`page.route()` actively intercepts and can modify/mock a matching request before it's sent; `page.waitForResponse()` passively observes and waits for a real network response matching a pattern, used to assert that a real request completed as expected without altering it.",
    category: "Network & Multi-page Flows",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-network-03",
    courseSlug: "playwright-web-automation",
    question:
      "What is APIRequestContext used for, and how does it differ from testing through the UI?",
    answer:
      "It lets a test send real HTTP requests directly (like a lightweight API client), without driving a browser page -- useful for fast test setup/teardown (e.g. creating test data via an API call) or for testing an API's behavior directly rather than only through UI interactions.",
    category: "Network & Multi-page Flows",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-network-04",
    courseSlug: "playwright-web-automation",
    question:
      "Why might using APIRequestContext to seed test data be faster and more reliable than doing it through the UI in every test?",
    answer:
      "Driving the UI to create prerequisite data (e.g. signing up a user, creating an order) is slower and more failure-prone than a direct API call, and couples every test's setup to unrelated UI flows that could themselves be flaky or change.",
    category: "Network & Multi-page Flows",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-network-05",
    courseSlug: "playwright-web-automation",
    question:
      "How do you save a logged-in session's authentication state so multiple tests don't each need to log in through the UI?",
    answer:
      'Perform the login once (typically in a setup project/step), then call `context.storageState({ path: "auth.json" })` to save cookies/local storage, and reuse that file via the `storageState` option in later test projects to start already authenticated.',
    category: "Network & Multi-page Flows",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-network-06",
    courseSlug: "playwright-web-automation",
    question:
      "What is a Playwright 'project,' and how is it used to configure different browsers or setups?",
    answer:
      "A named test configuration (in `playwright.config.ts`) with its own browser, viewport, or `use` options -- letting the same test files run across multiple projects (e.g. chromium, firefox, webkit, or an authenticated vs. unauthenticated setup) without duplicating test code.",
    category: "Network & Multi-page Flows",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-network-07",
    courseSlug: "playwright-web-automation",
    question:
      "What is a common mistake when mocking a network response for a request that the app makes more than once?",
    answer:
      "A single `page.route()` handler with a generic pattern applies to every matching request by default, so if different calls to the same endpoint need different mock responses, the handler must inspect the request (e.g. query params) to return the right response for each call.",
    category: "Network & Multi-page Flows",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-network-08",
    courseSlug: "playwright-web-automation",
    question:
      "How would you test that a page correctly shows a loading spinner while a slow API call is in flight?",
    answer:
      "Use `page.route()` to intentionally delay the mocked response (or add an artificial delay before calling `route.continue()`/`route.fulfill()`), then assert the spinner is visible during that window and disappears once the (mocked) response resolves.",
    category: "Network & Multi-page Flows",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-network-09",
    courseSlug: "playwright-web-automation",
    question:
      "Why should test data used across parallel test runs generally be unique per test rather than shared/hardcoded?",
    answer:
      "Parallel tests running against a shared environment can conflict if they operate on the same hardcoded record (e.g. two tests both editing 'user123') -- generating unique data per test run avoids cross-test interference and flakiness caused by shared state.",
    category: "Network & Multi-page Flows",
    difficulty: "advanced",
    commonMistake:
      "Hardcoding the same test-data identifiers across tests that run in parallel, causing tests to interfere with each other's state.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-network-10",
    courseSlug: "playwright-web-automation",
    question: "What does `route.continue()` do differently from `route.fulfill()`?",
    answer:
      "`route.continue()` lets the intercepted request proceed to the real network (optionally with modified headers/method/postData), while `route.fulfill()` short-circuits it entirely and returns a custom response without the request ever reaching the real server.",
    category: "Network & Multi-page Flows",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Fixtures, Structure & Test Design (10) ---
  {
    id: "pw-interview-structure-01",
    courseSlug: "playwright-web-automation",
    question:
      "What is a Playwright fixture, and why is it preferred over shared setup code copy-pasted in every test?",
    answer:
      "A fixture provides a reusable piece of test setup/teardown (like a logged-in page, or seeded test data) that Playwright injects into any test that declares it as a parameter -- it avoids duplicated setup logic and automatically handles teardown, unlike manually copy-pasted `beforeEach` code repeated across files.",
    category: "Fixtures, Structure & Test Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-structure-02",
    courseSlug: "playwright-web-automation",
    question:
      "What is the Page Object Model (POM), and what problem does it solve in a growing test suite?",
    answer:
      "A design pattern where each page/component's locators and interactions are encapsulated in a dedicated class, so tests call semantic methods (`loginPage.login(user, pass)`) instead of repeating raw locators -- when the UI changes, only the page object needs updating, not every test that uses it.",
    category: "Fixtures, Structure & Test Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-structure-03",
    courseSlug: "playwright-web-automation",
    question:
      "Why should test data be generated dynamically (e.g. with a unique suffix or a data-factory function) rather than hardcoded?",
    answer:
      "Hardcoded data can collide with existing records, leftover data from failed previous runs, or other parallel tests -- generated unique values (like a timestamp-based email) keep each test run self-contained and independent of the environment's prior state.",
    category: "Fixtures, Structure & Test Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-structure-04",
    courseSlug: "playwright-web-automation",
    question:
      "What is the difference between a `beforeEach` hook and a custom fixture for shared setup?",
    answer:
      "A `beforeEach` hook runs before every test in a file/describe block, always doing the same setup regardless of whether a given test needs it; a fixture is only instantiated when a test actually declares it as a dependency, and can be composed/scoped more flexibly (e.g. worker-scoped vs. test-scoped).",
    category: "Fixtures, Structure & Test Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-structure-05",
    courseSlug: "playwright-web-automation",
    question:
      "Why is hardcoding credentials or secrets directly in a test file a security concern, even for a test-only account?",
    answer:
      "Test files are typically committed to version control, so hardcoded secrets become part of the repository's history and visible to anyone with repo access -- credentials should come from environment variables or a secrets manager instead, kept out of the codebase.",
    category: "Fixtures, Structure & Test Design",
    difficulty: "advanced",
    commonMistake:
      "Hardcoding a test account's password directly in a spec file, which then persists in git history indefinitely even if later removed.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-structure-06",
    courseSlug: "playwright-web-automation",
    question:
      "What does it mean for tests to be independent, and why does test order matter if they aren't?",
    answer:
      "Independent tests don't rely on side effects from a previous test having run first -- if tests depend on order (e.g. test B assumes test A already created a record), running them in isolation, in a different order, or in parallel can cause unexplained failures.",
    category: "Fixtures, Structure & Test Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-structure-07",
    courseSlug: "playwright-web-automation",
    question:
      "What is the benefit of composing multiple small, focused fixtures (e.g. one for auth, one for seeded data) rather than one large fixture that does everything?",
    answer:
      "Small, focused fixtures can be mixed and matched per test (a test needing auth but not seeded data only declares the auth fixture), and are individually easier to understand, test, and reuse than one large fixture with many unrelated responsibilities baked in.",
    category: "Fixtures, Structure & Test Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-structure-08",
    courseSlug: "playwright-web-automation",
    question: "Why shouldn't a page object's methods contain test assertions?",
    answer:
      "Keeping assertions in the test file (not the page object) keeps the page object reusable purely as an interaction layer, and keeps the test's actual expected behavior visible and readable directly in the test, rather than hidden inside a helper class.",
    category: "Fixtures, Structure & Test Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-structure-09",
    courseSlug: "playwright-web-automation",
    question:
      "What is a smoke test, and how does it differ in scope from a full end-to-end regression suite?",
    answer:
      'A smoke test is a small, fast subset of critical-path checks (e.g. "can a user log in and see the dashboard") run frequently to catch major breakage quickly; a full regression suite covers edge cases and secondary flows more thoroughly but takes longer to run.',
    category: "Fixtures, Structure & Test Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-structure-10",
    courseSlug: "playwright-web-automation",
    question:
      "Why is it good practice for an automated test to clean up any data it created, even if the test passed?",
    answer:
      "Leftover test data accumulates over repeated runs, can slow down or pollute a shared test environment, and may eventually collide with future test data or make debugging failures harder by mixing old and new state.",
    category: "Fixtures, Structure & Test Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Execution, Diagnostics & Reliability (10) ---
  {
    id: "pw-interview-diagnostics-01",
    courseSlug: "playwright-web-automation",
    question: "What is a flaky test, and why is it worse than a test that fails consistently?",
    answer:
      "A flaky test passes and fails intermittently without any real code change, usually due to a race condition or unreliable wait -- it's worse than a consistently-failing test because it erodes trust in the whole suite, since a real failure can be dismissed as 'probably just flaky' and ignored.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-diagnostics-02",
    courseSlug: "playwright-web-automation",
    question:
      "What is Playwright's trace viewer, and what does it let you inspect after a test failure?",
    answer:
      "A recorded, step-by-step timeline of a test run (DOM snapshots, network requests, console logs, screenshots) that you can replay visually -- letting you see exactly what the page looked like and what happened at the moment of failure, without needing to reproduce it live.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-diagnostics-03",
    courseSlug: "playwright-web-automation",
    question:
      "Why is retrying a flaky test automatically (e.g. `retries: 2` in CI config) a mitigation, not a fix?",
    answer:
      "Retries can mask the underlying race condition or timing issue causing the flakiness, letting the suite stay green while the root cause remains unaddressed -- the flakiness can resurface later or under different conditions (e.g. a slower CI runner) unless actually diagnosed and fixed.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "advanced",
    commonMistake:
      "Treating automatic retries as a permanent fix for a flaky test instead of a temporary mitigation while the root cause is investigated.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-diagnostics-04",
    courseSlug: "playwright-web-automation",
    question:
      "How does Playwright run tests in parallel by default, and what does 'worker' mean in this context?",
    answer:
      "Playwright distributes test files across multiple worker processes, each an isolated Node.js process running a subset of the suite concurrently -- by default, tests within one file run in order on one worker, while different files can run in parallel across workers.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-diagnostics-05",
    courseSlug: "playwright-web-automation",
    question:
      "Why must tests running in parallel avoid depending on a shared, mutable piece of environment state (like a single fixed database row)?",
    answer:
      "If two parallel tests read and write the same shared record simultaneously, their operations can interleave unpredictably, causing either test to see unexpected state -- each test needs its own isolated data to be safely parallelizable.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-diagnostics-06",
    courseSlug: "playwright-web-automation",
    question:
      "What is the difference between a test timeout and an individual assertion's timeout?",
    answer:
      "The overall test timeout bounds how long the entire test is allowed to run before being forcibly failed; a web-first assertion's own timeout bounds how long that specific assertion will keep retrying before failing -- a slow assertion can still fail on its own timeout well before the overall test timeout is reached.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-diagnostics-07",
    courseSlug: "playwright-web-automation",
    question: "Why might a test pass locally but fail consistently in CI?",
    answer:
      "CI environments often run slower/differently-resourced machines, different network latency, different screen/viewport defaults, or headless-vs-headed rendering differences -- any of these can expose timing assumptions or environment-specific behavior that a developer's faster local machine masked.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-diagnostics-08",
    courseSlug: "playwright-web-automation",
    question:
      "What is the value of a CI-produced HTML report with embedded screenshots/videos on failure, beyond a plain pass/fail console log?",
    answer:
      "It preserves the exact visual and diagnostic state at the moment of failure for later review, since the CI environment (unlike a developer's local machine) usually can't be re-run interactively on demand -- without it, a failure investigated after the fact has little more than a stack trace to go on.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-diagnostics-09",
    courseSlug: "playwright-web-automation",
    question:
      "Why is testing keyboard navigation and focus order (not just visual appearance) part of accessibility-aware end-to-end testing?",
    answer:
      "Many real users navigate exclusively via keyboard (screen-reader users, motor-impairment users); a page can look correct visually while being completely unusable by keyboard alone if focus order is broken or an interactive element isn't keyboard-reachable -- automated checks that only look at visual rendering miss this entirely.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pw-interview-diagnostics-10",
    courseSlug: "playwright-web-automation",
    question:
      "What does designing a test suite for 'maintainability' mean in practice, beyond just having tests that currently pass?",
    answer:
      "It means the suite stays cheap to update as the app evolves -- reusable page objects/fixtures instead of duplicated locators, resilient selectors that don't break on cosmetic changes, independent tests, and clear failure diagnostics -- rather than a suite that technically passes today but is expensive and fragile to keep passing over time.",
    category: "Execution, Diagnostics & Reliability",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
