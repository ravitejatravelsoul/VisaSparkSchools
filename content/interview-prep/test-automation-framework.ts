import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Test Automation Framework Engineering interview-prep questions -- 50
 * common technical interview questions covering the course's own
 * advanced, architecture-level topics (framework boundaries, config/
 * secrets, test-data builders, fixtures as dependency injection, layered
 * page/component/service objects, assertion design, tagging/isolation,
 * retry/timeout/flake policy, diagnostics/reporting, CI quality gates,
 * failure triage, framework health).
 */
export const testAutomationFrameworkInterviewQuestions: InterviewQuestionInput[] = [
  // --- Framework Architecture & Configuration (10) ---
  {
    id: "tafe-interview-arch-01",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What genuinely distinguishes a 'test automation framework' from just a folder of individual test scripts?",
    answer:
      "A framework provides reusable, shared architecture -- configuration management, fixtures, page/component abstractions, reporting, CI integration -- that every test builds on consistently; a folder of independent scripts each reinvents (or worse, inconsistently half-reinvents) these concerns, making the whole suite harder to maintain as it grows.",
    category: "Framework Architecture & Configuration",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-arch-02",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is the testing pyramid, and why does it matter when designing a framework's overall test strategy?",
    answer:
      "It recommends many fast, cheap unit tests, fewer integration/API tests, and even fewer slow, expensive end-to-end UI tests -- a framework should make it EASY to write tests at the appropriate, cheapest layer for a given concern, rather than defaulting every check to a slow, brittle full UI test just because the framework only makes that layer convenient.",
    category: "Framework Architecture & Configuration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-arch-03",
    courseSlug: "test-automation-framework-engineering",
    question:
      "How would you decide whether a given check belongs at the unit, API, or UI assertion layer?",
    answer:
      "Ask what's actually being verified: pure logic with no external dependencies belongs at the unit layer (fastest, most isolated); backend behavior/contract belongs at the API layer (fast, doesn't need a rendered UI); only genuine end-to-end user-facing flows that depend on the full rendered UI belong at the UI layer -- each layer down the pyramid should only test what the layers below it genuinely cannot.",
    category: "Framework Architecture & Configuration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-arch-04",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why does a framework need environment-aware configuration (dev/staging/production-like test environments), rather than one hardcoded set of URLs/credentials?",
    answer:
      "The same test suite typically needs to run against different environments at different stages (local development, CI, staging validation) -- environment-aware configuration (read from environment variables or config files selected per environment) lets the same test code run correctly everywhere without manual editing before each run.",
    category: "Framework Architecture & Configuration",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-arch-05",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why should a framework's secret-handling strategy (API keys, test credentials) be a deliberate architectural decision, not an afterthought?",
    answer:
      "Secrets threaded ad hoc through a growing framework (hardcoded here, an environment variable there, a config file somewhere else) become genuinely hard to audit and rotate safely -- a deliberate, consistent strategy (e.g. one centralized secrets-loading module) makes it possible to reason about where every sensitive value actually comes from.",
    category: "Framework Architecture & Configuration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-arch-06",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why does a growing framework benefit from an explicit, documented repository structure convention (where do page objects, fixtures, test data live)?",
    answer:
      "Without a clear, enforced convention, different contributors place similar code in inconsistent locations over time, making the codebase progressively harder to navigate -- an explicit structure (documented and ideally enforced by linting/review) keeps a large, multi-contributor framework navigable as it scales.",
    category: "Framework Architecture & Configuration",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-arch-07",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What does it mean for a framework to have clear 'boundaries,' and why does scope creep hurt a test automation framework specifically?",
    answer:
      "A framework should have a clearly defined responsibility (enabling reliable, maintainable test execution) and resist absorbing unrelated concerns (like becoming a general-purpose internal tooling library) -- scope creep dilutes focus and makes the actual testing-specific parts harder to find and reason about amid unrelated code.",
    category: "Framework Architecture & Configuration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-arch-08",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why might a framework provide a single, centralized HTTP client/API-request wrapper rather than letting every test file construct its own requests independently?",
    answer:
      "A centralized wrapper can consistently handle cross-cutting concerns (auth headers, base URL configuration, standard error handling/retries) in one place -- individual tests constructing raw requests independently would duplicate this logic and drift inconsistent over time as the API evolves.",
    category: "Framework Architecture & Configuration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-arch-09",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why is choosing TypeScript (or another statically-typed language) for a large test automation framework often worth the extra setup, compared to plain JavaScript?",
    answer:
      "Type checking catches a real class of framework-code mistakes (a page object method called with the wrong argument shape, a typo'd config key) at compile time rather than as a confusing runtime failure deep in a test run -- valuable specifically because a framework's shared code is used across potentially hundreds of tests, so a bug in it has outsized blast radius.",
    category: "Framework Architecture & Configuration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-arch-10",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why should a framework's design be reviewed periodically against its ORIGINAL goals, rather than assumed to remain correct indefinitely?",
    answer:
      "A framework's actual needs evolve as the application and team grow -- an architecture that made sense for 50 tests can become a bottleneck at 5,000; periodic review catches architectural decisions that no longer serve the framework's current scale/needs before they become deeply entrenched and costly to change.",
    category: "Framework Architecture & Configuration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Test Data, Fixtures & Dependency Injection (10) ---
  {
    id: "tafe-interview-data-01",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is the test-data builder pattern, and what problem does it solve compared to hardcoded test data objects?",
    answer:
      'A builder provides sensible defaults for every field of a test data object, letting a specific test override only the fields it actually cares about (`userBuilder().withRole("admin").build()`) -- avoids every test needing to specify every field explicitly, and avoids tests breaking when an unrelated new required field is added to the underlying schema.',
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "advanced",
    codeExample: 'const admin = userBuilder().withRole("admin").build();',
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-data-02",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why should test data generally be created fresh/unique per test run, rather than relying on shared, pre-existing seed data?",
    answer:
      "Shared seed data can be modified or deleted by another test (or a concurrently-running parallel test), causing failures unrelated to the actual code being tested -- freshly-generated, uniquely-identified data per test keeps each test run genuinely independent and repeatable.",
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-data-03",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What does 'fixtures as dependency injection' mean, using Playwright's fixture model as a reference?",
    answer:
      "A fixture provides a dependency (an authenticated page, seeded test data, a configured API client) that a test declares as a parameter, and the framework automatically constructs and injects before the test runs -- conceptually the same idea as dependency injection in application code, letting tests declare what they need without manually wiring up that setup themselves.",
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-data-04",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why is composing several small, focused fixtures (one for auth, one for seeded data) generally better architecture than one large fixture that does everything?",
    answer:
      "Small, focused fixtures can be mixed and matched per test (a test needing auth but not seeded data only declares the auth fixture), and are individually easier to understand, test, and reuse than one large fixture bundling many unrelated setup responsibilities together.",
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-data-05",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What does fixture 'scope' (per-test vs. per-worker) control, and what's a real tradeoff between them?",
    answer:
      "A per-test-scoped fixture is freshly created for every individual test (maximum isolation, but repeated setup cost); a per-worker-scoped fixture is created once and reused across every test running in that worker process (much cheaper setup, but risks state leaking between tests sharing it if not designed carefully).",
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-data-06",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why might a framework prefer seeding test data via a direct API/database call over driving the UI to create it?",
    answer:
      "Driving the UI to create prerequisite data is slower and more failure-prone than a direct API/database call, and couples every test's setup to unrelated UI flows that could themselves be flaky or change -- reserving UI interaction for what the test is actually meant to verify.",
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-data-07",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is the value of automatic fixture teardown (cleanup that runs after a test, even if it fails), and how does this relate to test isolation?",
    answer:
      "Guaranteed cleanup ensures data created by one test doesn't leak into and affect the next -- without reliable teardown (especially on failure, when manual cleanup code might be skipped by an early return/exception), test data accumulates over repeated runs and can eventually cause unrelated tests to start failing.",
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-data-08",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why is 'test isolation' a framework-level architectural concern, not just something each individual test author has to remember?",
    answer:
      "If the framework's fixtures/data-builders don't inherently produce isolated data by default, EVERY test author has to remember to manually ensure isolation themselves -- a framework that bakes isolation into its defaults (unique data generation, automatic cleanup) makes the safe path the easy, default path, rather than relying on discipline alone.",
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-data-09",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is a common mistake when building test-data builders that gradually accumulate many optional fields over time?",
    answer:
      "Letting the builder's defaults drift out of sync with the real system's actual required/valid data shapes (e.g. a default value that used to be valid but the underlying schema changed) -- builders need to be kept in sync with the real data model, or they start producing test data that no longer represents realistic, valid input.",
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-data-10",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why might a framework need a distinct strategy for read-only reference data (like a fixed list of countries) versus test-specific generated data?",
    answer:
      "Read-only reference data can often be safely shared across tests (nobody's mutating it), while test-specific data (an order, a user account) needs isolation per test -- treating both the same way either wastes effort re-generating stable reference data unnecessarily, or risks unsafe sharing of data that actually needs isolation.",
    category: "Test Data, Fixtures & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Layered Architecture: Page/Component/Service Objects & Assertions (10) ---
  {
    id: "tafe-interview-layers-01",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is the difference between a page object, a component object, and a service client in a layered framework architecture?",
    answer:
      "A page object encapsulates a full distinct page's locators/interactions; a component object encapsulates a smaller, reusable piece of UI shared across pages (like a nav bar); a service client encapsulates direct API/backend interactions (not UI-driven) -- each layer has a distinct, non-overlapping responsibility.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-layers-02",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why might a test need a 'DB-validation boundary,' and what does that concept guard against?",
    answer:
      "A DB-validation boundary explicitly scopes and limits what a test is allowed to directly query/assert against the database, rather than every test having unrestricted direct DB access -- guards against tests becoming tightly coupled to internal schema details that should be free to change, as long as the actual application behavior stays correct.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-layers-03",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What does 'domain-level assertions' mean, and how does `expect(order).toBeShipped()` (a custom matcher) differ from asserting on raw individual fields?",
    answer:
      "A domain-level assertion expresses the check in terms meaningful to the business domain, hiding the underlying implementation details (which specific fields/values indicate 'shipped') behind a clear, reusable, self-documenting check -- if the underlying data shape changes, only the custom matcher needs updating, not every test asserting on that concept.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-layers-04",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is an assertion DSL (domain-specific language), and why might a mature framework build one rather than using only the testing library's built-in assertions directly?",
    answer:
      "A small, purpose-built set of assertion helpers tailored to the application's own domain concepts -- built on top of (not replacing) the underlying testing library's assertions, it lets tests read more like domain statements ('the cart total reflects the applied discount') than low-level technical checks, improving both readability and consistency across the suite.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-layers-05",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why should page objects avoid embedding test assertions directly, keeping that in the test file instead?",
    answer:
      "Keeping assertions in the test file keeps the page object reusable purely as an interaction layer across many different tests with different expectations, and keeps a test's actual expected behavior visible and readable directly in the test, rather than hidden inside a shared class other test authors might not think to check.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-layers-06",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why might a framework need BOTH a service client (for API-level test setup) and page objects (for UI-level verification), rather than choosing just one?",
    answer:
      "Different concerns need different tools -- fast, reliable test-data setup benefits from bypassing the UI via a direct API call, while the actual thing being tested (does the UI correctly display/behave given that data) genuinely needs UI-level interaction; a mature framework supports both, used for their respective appropriate purposes.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-layers-07",
    courseSlug: "test-automation-framework-engineering",
    question:
      "How does composing component objects inside page objects (rather than duplicating locators) help a framework scale as the application grows?",
    answer:
      "If a shared component (like a header nav) appears on many pages, defining it once as a component object and composing it into every relevant page object means a UI change to that component only requires updating one class, not every page object that happens to include it.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-layers-08",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why is designing clear, well-defined interfaces between these layers (page objects, service clients, assertion helpers) important for a multi-contributor team?",
    answer:
      "Clear interfaces let different contributors work on different layers independently without needing to understand every other layer's internals -- someone adding a new test doesn't need to know how a page object's locators are implemented, only its public interface, which is what makes the layered separation actually pay off at team scale.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-layers-09",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is a risk of over-abstracting a framework's layers before the actual patterns of reuse are clear?",
    answer:
      "Premature abstraction based on guessed-at future needs can produce an awkward, overly-generic interface that doesn't actually fit how the framework ends up being used in practice -- it's often better to let a genuine pattern of duplication emerge across a few real tests before extracting a shared abstraction, rather than designing the 'perfect' layer up front.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-layers-10",
    courseSlug: "test-automation-framework-engineering",
    question:
      "How would you evaluate whether a framework's current layering is actually working well in practice?",
    answer:
      "Look at how often the same locator/logic gets duplicated across tests despite the layering (suggesting a missing abstraction), how often a small UI change requires touching many test files (suggesting insufficient encapsulation), and how quickly new contributors can write a correct new test using the existing layers without needing deep framework-internals knowledge.",
    category: "Layered Architecture: Page/Component/Service Objects & Assertions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Tagging, Isolation, Retry & Flake Management (10) ---
  {
    id: "tafe-interview-tagging-01",
    courseSlug: "test-automation-framework-engineering",
    question: "What is a test tagging scheme, and what practical problem does it solve?",
    answer:
      "A convention for labeling tests by characteristic (e.g. `@smoke`, `@regression`, `@slow`), letting a CI pipeline or a developer selectively run a relevant subset rather than the entire suite every time -- e.g. running only `@smoke` tests on every commit, and the full suite only nightly.",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-tagging-02",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why does true test isolation matter specifically for SAFE parallel execution, beyond general good practice?",
    answer:
      "Parallel execution runs many tests concurrently, potentially against the same shared environment/database -- if tests aren't genuinely isolated (unique data, no shared mutable state), concurrent execution surfaces race conditions and cross-test interference that wouldn't be visible running the same tests sequentially.",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-tagging-03",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is a flaky test, and why does a framework-level policy for handling flakiness matter more than an ad hoc, per-test approach?",
    answer:
      "A flaky test passes/fails intermittently without a real code change -- a framework-level policy (e.g. automatic quarantine of newly-flaky tests, mandatory root-cause investigation before re-enabling) ensures flakiness is tracked and addressed systematically, rather than each team member independently deciding whether to ignore, retry, or investigate a given flaky test.",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-tagging-04",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why is a blanket 'retry every failed test automatically' policy risky at the framework level, despite being simple to configure?",
    answer:
      "It can mask real, non-flaky bugs by giving them a second (or third) chance to pass by luck, and it hides the actual flake rate from visibility -- a more disciplined approach tracks and reports on retried tests distinctly, so genuine flakiness (vs. real, consistent failures) stays visible and gets investigated rather than permanently hidden behind auto-retry.",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-tagging-05",
    courseSlug: "test-automation-framework-engineering",
    question:
      "How would you design a timeout policy that balances 'tests fail fast on real problems' against 'tests don't flake on normal, brief slowness'?",
    answer:
      "Set timeouts based on realistic, measured expectations for each specific operation (a quick UI interaction vs. a genuinely slow report-generation call), rather than one arbitrary global timeout applied uniformly -- too-short timeouts on legitimately slower operations create false-flaky failures; too-long timeouts on genuinely stuck operations waste CI time before failing.",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-tagging-06",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why might a framework track a 'flake rate' metric over time, rather than treating each flaky failure as an isolated incident?",
    answer:
      "A trending flake rate reveals whether the suite's overall reliability is improving or degrading over time, and can surface a systemic issue (a specific shared fixture, a specific environment) responsible for many DIFFERENT tests' flakiness, which investigating flaky tests one at a time in isolation might never connect.",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-tagging-07",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is 'test quarantine,' and why is it a useful intermediate step between 'a test is flaky' and 'the test is fixed'?",
    answer:
      "Quarantining moves a known-flaky test out of the main CI gate (so it no longer blocks merges) while still running it and tracking its results separately -- preserves the flaky test's diagnostic value without letting its unreliability erode trust in the main suite's pass/fail signal for everyone else.",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-tagging-08",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why should a good tagging scheme be intentional and limited, rather than adding an unbounded number of ad hoc tags over time?",
    answer:
      "An unbounded, unmanaged tag list becomes inconsistent (different contributors invent overlapping or redundant tags) and loses its practical value for CI test selection -- a deliberately limited, documented tag vocabulary stays meaningful and consistently applied across the whole suite.",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-tagging-09",
    courseSlug: "test-automation-framework-engineering",
    question:
      "How does test SELECTION (running only a relevant subset) differ from test PARALLELIZATION (running many tests concurrently), and why does a mature framework need both?",
    answer:
      "Selection reduces how many tests run at all for a given trigger (e.g. only smoke tests on every push); parallelization reduces how long the SELECTED tests take by running them concurrently -- both independently reduce total feedback time, and a mature framework typically combines them (parallelizing whatever subset was selected).",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-tagging-10",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why might 'zero flaky tests' be an unrealistic target for a large, mature test suite, and what's a more practical goal instead?",
    answer:
      "At sufficient scale, some small rate of environmental/timing-related flakiness is difficult to eliminate entirely -- a more practical goal is keeping the flake rate low, visible, and actively managed (tracked, triaged, quarantined when needed) rather than pretending a large suite can be permanently, perfectly flake-free.",
    category: "Tagging, Isolation, Retry & Flake Management",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Diagnostics, CI & Framework Health ---
  {
    id: "tafe-interview-ci-01",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What does 'structured diagnostics' mean for a test framework's failure output, compared to a plain stack trace?",
    answer:
      "Structured diagnostics capture consistent, machine-readable context for every failure (screenshots, network logs, the specific fixture/data state at the time of failure) in a predictable format -- lets tooling aggregate and analyze failures across many runs, not just help a human read one failure at a time.",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-ci-02",
    courseSlug: "test-automation-framework-engineering",
    question: "What is CI test sharding, and what problem does it solve for a large suite?",
    answer:
      "Splitting the full test suite across multiple parallel CI machines/workers (shards), each running a portion of the total tests -- solves the problem of a large suite's total runtime becoming impractically slow if run entirely sequentially or even in parallel on just one machine's limited cores.",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-ci-03",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is a CI quality gate, and why should a framework's quality gate be deliberately configured rather than left as CI's raw default?",
    answer:
      "A quality gate is the specific, enforced condition (which tests must pass, what coverage threshold, what performance budget) that blocks a merge/deploy if not met -- a deliberately configured gate reflects an actual, agreed-upon quality bar for the project, rather than an arbitrary default that might be too strict (blocking on flaky tests) or too lenient (letting real regressions through).",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-ci-04",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What is failure triage, and why does a framework benefit from an explicit ownership model for investigating failures?",
    answer:
      "Triage is the process of quickly classifying a new failure (real regression, flaky test, environment issue, outdated test) to route it to the right next step -- without clear ownership (who's responsible for investigating a given failure), failures can linger unaddressed, with everyone assuming someone else will look into it.",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-ci-05",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why is tracking framework health with metrics BEYOND a bare pass/fail count important (e.g. flake rate, average runtime, time-to-fix)?",
    answer:
      "A bare pass/fail count says nothing about trends that matter for a framework's long-term sustainability -- a suite that always eventually passes but takes progressively longer, or has a creeping flake rate, is degrading even while technically 'green,' and richer metrics are what actually surface that degradation early.",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-ci-06",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What does 'framework versioning and extensibility' mean in the context of a shared internal test framework used by multiple teams/projects?",
    answer:
      "Treating the framework itself somewhat like a real software library (with intentional versioning, documented breaking-change policy, and clear extension points) -- important once multiple teams/projects depend on it, since an uncoordinated breaking change to shared framework code can simultaneously break every consuming test suite.",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-ci-07",
    courseSlug: "test-automation-framework-engineering",
    question:
      "What are some common test automation framework anti-patterns to watch for as a suite matures?",
    answer:
      "Overly-generic 'god' page objects trying to represent the entire application; tests with hidden interdependencies (execution-order-dependent); assertions buried deep inside shared helper functions (obscuring what a given test is actually checking); and excessive, unexplained use of fixed sleeps instead of proper waiting -- all of which erode the suite's reliability and readability over time.",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-ci-08",
    courseSlug: "test-automation-framework-engineering",
    question:
      "How would you plan an incremental migration of an existing, large test suite onto a new/redesigned framework architecture, rather than a risky full rewrite?",
    answer:
      "Run the old and new frameworks side by side, migrating tests in small, independently-verifiable batches (e.g. one feature area at a time), keeping both suites passing throughout -- avoids the high risk of a 'big bang' rewrite where nothing is verified working again until the entire migration is complete.",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-ci-09",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why does a mature test automation framework need real documentation (beyond just readable code), and what should it prioritize covering?",
    answer:
      "Even well-written code doesn't explain WHY architectural decisions were made, or how a new contributor should approach writing their first test using the framework's specific patterns -- documentation should prioritize onboarding a new contributor efficiently and explaining the reasoning behind non-obvious architectural choices, not just restating what the code does.",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "tafe-interview-ci-10",
    courseSlug: "test-automation-framework-engineering",
    question:
      "Why is 'the suite currently passes' an insufficient measure of whether a test automation framework is actually succeeding at its job long-term?",
    answer:
      "A framework's real purpose is catching genuine regressions reliably while staying maintainable and fast enough that the team actually keeps investing in it -- a suite that passes today but is slow, flaky, hard to extend, or increasingly avoided/ignored by the team isn't succeeding, even while technically green; framework health has to be evaluated holistically, not just by its current pass/fail state.",
    category: "Diagnostics, CI & Framework Health",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
