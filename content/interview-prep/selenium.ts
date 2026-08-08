import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Selenium WebDriver Automation interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics (W3C
 * WebDriver protocol, element location and synchronization/waits, complex
 * UI interaction, page objects and JUnit integration, parallel execution/
 * Grid, failure diagnosis, CI reporting, secrets handling).
 */
export const seleniumInterviewQuestions: InterviewQuestionInput[] = [
  // --- WebDriver Architecture & Setup (10) ---
  {
    id: "selenium-interview-arch-01",
    courseSlug: "selenium-webdriver-automation",
    question: "What is the W3C WebDriver protocol, at a conceptual level?",
    answer:
      "A standardized wire protocol defining how an automation client (your test code) communicates with a browser driver over HTTP, using a consistent set of commands (navigate, find element, click, etc.) -- standardization means the same client code can drive different browsers, each with their own compliant driver implementation.",
    category: "WebDriver Architecture & Setup",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-arch-02",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What is a browser driver (like ChromeDriver or GeckoDriver), and what role does it play?",
    answer:
      "A separate executable that translates WebDriver protocol commands into the specific browser's own native automation interface -- your Selenium test code talks to the driver, and the driver talks to the actual browser, acting as a translation layer between the standardized protocol and browser-specific internals.",
    category: "WebDriver Architecture & Setup",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-arch-03",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why must a ChromeDriver version generally be compatible with the installed Chrome browser version?",
    answer:
      "The driver's translation layer depends on internal APIs/behaviors of that specific browser version -- a significant version mismatch can cause the driver to fail to start the browser at all, or behave unpredictably, since it was built and tested against a different browser internals version.",
    category: "WebDriver Architecture & Setup",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-arch-04",
    courseSlug: "selenium-webdriver-automation",
    question: "What is the `WebDriver` object's role in a Selenium test, at the code level?",
    answer:
      "It's the main entry point representing a controlled browser session -- through it, you navigate to URLs, find elements, and manage the browser window; it's the object that ultimately sends every WebDriver protocol command for that session.",
    category: "WebDriver Architecture & Setup",
    difficulty: "beginner",
    codeExample: 'WebDriver driver = new ChromeDriver();\ndriver.get("https://example.com");',
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-arch-05",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why is it important to explicitly call `driver.quit()` (not just `close()`) at the end of a test?",
    answer:
      "`close()` only closes the current browser window/tab; `quit()` closes ALL windows associated with that session and properly ends the WebDriver session itself, releasing the underlying browser process and driver resources -- forgetting `quit()` can leak browser processes across a long-running test suite.",
    category: "WebDriver Architecture & Setup",
    difficulty: "intermediate",
    commonMistake:
      "Calling driver.close() instead of driver.quit() at the end of a test, leaving the browser process and driver session running.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-arch-06",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What is the difference between running tests in headless mode versus with a visible browser window?",
    answer:
      "Headless mode runs the browser without rendering a visible UI window, which is typically faster and more resource-efficient (important for CI environments running many tests) -- but occasionally headless and headed modes can behave subtly differently for things like screen dimensions or certain rendering-dependent behaviors, worth being aware of when debugging a headless-only failure.",
    category: "WebDriver Architecture & Setup",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-arch-07",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why might a team maintain Selenium test infrastructure even after adopting a newer tool like Playwright for new projects?",
    answer:
      "Selenium remains extremely common in existing, especially enterprise, Java-based test suites built up over many years -- rewriting a large, working existing suite purely to switch tools carries real cost and risk, so understanding Selenium remains a practically valuable skill for working with and maintaining that existing infrastructure.",
    category: "WebDriver Architecture & Setup",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-arch-08",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What does `driver.manage().window().maximize()` do, and why might a test explicitly set window size instead of relying on a default?",
    answer:
      "It maximizes the browser window -- explicitly setting a specific window size (rather than relying on an unpredictable default) makes layout-dependent tests (like verifying a responsive breakpoint) consistent and reproducible across different machines/environments.",
    category: "WebDriver Architecture & Setup",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-arch-09",
    courseSlug: "selenium-webdriver-automation",
    question: "What is the difference between `driver.get(url)` and `driver.navigate().to(url)`?",
    answer:
      "They're functionally nearly identical for basic navigation -- `navigate()` additionally provides browser history methods like `.back()`, `.forward()`, and `.refresh()`, useful when a test needs to simulate a user navigating back/forward rather than only ever navigating to fresh URLs.",
    category: "WebDriver Architecture & Setup",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-arch-10",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why is setting up Selenium tests to run against a real local browser and driver (rather than trusting a tutorial's steps blindly) an important early step?",
    answer:
      "Version mismatches, missing drivers, or environment-specific path issues are common early setup problems -- verifying the basic setup actually works with a trivial test before writing real test logic avoids wasting time debugging test logic when the real problem is environmental.",
    category: "WebDriver Architecture & Setup",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Locators & Synchronization (10) ---
  {
    id: "selenium-interview-locators-01",
    courseSlug: "selenium-webdriver-automation",
    question: "What locator strategies does Selenium support for finding elements?",
    answer:
      "ID, name, class name, tag name, CSS selector, XPath, link text, and partial link text -- each has different tradeoffs for stability, readability, and how precisely they can target a specific element.",
    category: "Locators & Synchronization",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-locators-02",
    courseSlug: "selenium-webdriver-automation",
    question: "Why are ID-based locators generally the most stable choice when available?",
    answer:
      "IDs are meant to be unique within a page and typically don't change for purely cosmetic/styling reasons the way class names might -- when a stable, meaningful ID exists on an element, it's usually the most resilient locator to a visual redesign.",
    category: "Locators & Synchronization",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-locators-03",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why might locating elements by CSS class name tied to visual styling be a fragile choice, similar to the same pitfall in other UI automation tools?",
    answer:
      "A class name used purely for styling can change during a visual redesign even though the element's actual function is unchanged -- a locator tied to styling rather than semantic meaning breaks on cosmetic changes that shouldn't have affected test behavior at all.",
    category: "Locators & Synchronization",
    difficulty: "intermediate",
    commonMistake:
      "Locating elements by a CSS class tied purely to visual styling, which breaks on a cosmetic redesign unrelated to the element's actual function.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-locators-04",
    courseSlug: "selenium-webdriver-automation",
    question: "What is the difference between an implicit wait and an explicit wait in Selenium?",
    answer:
      "An implicit wait sets a single global timeout applied automatically to every element-finding call for the whole driver session; an explicit wait targets a specific condition for a specific element/action at the point it's needed, giving finer control -- mixing implicit and explicit waits in the same test is generally discouraged, since their interaction can produce confusing, inconsistent timing behavior.",
    category: "Locators & Synchronization",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-locators-05",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why is a fixed `Thread.sleep(3000)` discouraged compared to an explicit wait for a specific condition?",
    answer:
      "A fixed sleep is either too short (still flaky if the page happens to be slower than usual) or too long (wastes time when the page is actually ready sooner) -- an explicit wait for the actual condition (element visible, clickable) is both faster on average and more reliable than guessing a fixed duration.",
    category: "Locators & Synchronization",
    difficulty: "intermediate",
    commonMistake:
      "Using Thread.sleep() as a substitute for an explicit wait, producing a test that's both slower than necessary and still occasionally flaky.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-locators-06",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What is a `WebDriverWait` combined with `ExpectedConditions`, and what does it let you express?",
    answer:
      "A mechanism for polling until a specific condition becomes true (or a timeout is reached) -- e.g. `wait.until(ExpectedConditions.elementToBeClickable(locator))` waits specifically until the element is both present AND interactable, rather than just present in the DOM.",
    category: "Locators & Synchronization",
    difficulty: "advanced",
    codeExample:
      'WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\nwait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));',
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-locators-07",
    courseSlug: "selenium-webdriver-automation",
    question: "What is a 'fluent wait,' and how does it differ from a standard explicit wait?",
    answer:
      "A fluent wait lets you additionally configure the polling interval and which specific exception types to ignore while waiting -- useful when you want more fine-grained control than a standard `WebDriverWait`'s default polling behavior, such as ignoring `StaleElementReferenceException` during the wait itself.",
    category: "Locators & Synchronization",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-locators-08",
    courseSlug: "selenium-webdriver-automation",
    question: "What does XPath let you express that a simple CSS selector cannot?",
    answer:
      "XPath can select elements based on their TEXT CONTENT (e.g. find a button containing the exact text 'Submit') and can traverse UP the DOM tree to a parent/ancestor, both of which standard CSS selectors cannot do -- at the cost of generally being more verbose and slightly slower to evaluate.",
    category: "Locators & Synchronization",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-locators-09",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why should locators generally be defined once and reused, rather than duplicated as string literals across multiple test methods?",
    answer:
      "If the page's markup changes and a locator needs updating, a duplicated locator requires finding and fixing every occurrence individually -- centralizing it (e.g. in a page object) means updating it once fixes every test that depends on it.",
    category: "Locators & Synchronization",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-locators-10",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why does using accessible, role-based locators where possible (similar to a `data-testid` or ARIA-role approach) tend to produce more stable Selenium tests?",
    answer:
      "Locators tied to an element's genuine semantic role/accessible name are far less likely to change during a purely visual redesign than locators tied to positional or styling-related details -- the same underlying principle that makes accessible markup more testable applies across automation tools, not just Selenium specifically.",
    category: "Locators & Synchronization",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Complex UI Interaction (10) ---
  {
    id: "selenium-interview-ui-01",
    courseSlug: "selenium-webdriver-automation",
    question: "How do you select an option from an HTML `<select>` dropdown in Selenium?",
    answer:
      "Wrap the located `<select>` element in a `Select` object, then use `selectByVisibleText()`, `selectByValue()`, or `selectByIndex()` to choose the desired option -- directly clicking dropdown options via raw element interaction is unreliable across browsers for native select elements.",
    category: "Complex UI Interaction",
    difficulty: "intermediate",
    codeExample:
      'Select dropdown = new Select(driver.findElement(By.id("country")));\ndropdown.selectByVisibleText("Canada");',
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-ui-02",
    courseSlug: "selenium-webdriver-automation",
    question: "How do you handle a native JavaScript `alert()`/`confirm()` dialog in Selenium?",
    answer:
      "Switch to the alert via `driver.switchTo().alert()`, then call `.accept()`, `.dismiss()`, or `.sendKeys()` (for a prompt requiring text input) as appropriate -- native browser dialogs can't be interacted with via normal element-finding, since they're outside the page's DOM.",
    category: "Complex UI Interaction",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-ui-03",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why must you explicitly `switchTo().frame(...)` before interacting with an element inside an `<iframe>`?",
    answer:
      "Elements inside an iframe live in a separate embedded document, not directly accessible from the main page's context -- Selenium needs to be told to focus its commands on that specific frame's context before it can find/interact with elements inside it, then switch back (`switchTo().defaultContent()`) to return to the main page.",
    category: "Complex UI Interaction",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-ui-04",
    courseSlug: "selenium-webdriver-automation",
    question: "How do you handle a scenario where clicking a link opens a new browser tab/window?",
    answer:
      "Capture the set of window handles before the click, click the link, then compare the new set of window handles to find the newly-opened one, and `switchTo().window(newHandle)` to direct subsequent commands at that new tab.",
    category: "Complex UI Interaction",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-ui-05",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What is the Actions API used for, and give an example interaction it enables that a simple `.click()` cannot?",
    answer:
      "It builds and performs complex, multi-step user gestures -- like drag-and-drop, hovering to reveal a menu, or a right-click context menu -- composed of low-level mouse/keyboard actions chained together, which a single `.click()` call can't represent.",
    category: "Complex UI Interaction",
    difficulty: "advanced",
    codeExample: "new Actions(driver).moveToElement(menuItem).click(subMenuItem).perform();",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-ui-06",
    courseSlug: "selenium-webdriver-automation",
    question: "How do you test a file-upload input in Selenium?",
    answer:
      "Call `.sendKeys(absoluteFilePath)` directly on the file input element -- this bypasses the OS-level native file picker dialog entirely (which Selenium can't interact with directly), setting the file input's value programmatically instead.",
    category: "Complex UI Interaction",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-ui-07",
    courseSlug: "selenium-webdriver-automation",
    question: "What is a `StaleElementReferenceException`, and why does it commonly occur?",
    answer:
      "It's thrown when a previously-located element reference is no longer valid, because the underlying DOM node it pointed to was removed or replaced (often due to a page re-render or navigation) -- re-locating the element fresh (rather than reusing an old reference) after any action that might trigger a DOM update is the typical fix.",
    category: "Complex UI Interaction",
    difficulty: "advanced",
    commonMistake:
      "Holding onto an old WebElement reference across a page action that re-renders the DOM, then hitting a StaleElementReferenceException.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-ui-08",
    courseSlug: "selenium-webdriver-automation",
    question:
      "How would you take a screenshot of the current page state in a Selenium test, and when is that most useful?",
    answer:
      "Cast the driver to `TakesScreenshot` and call `.getScreenshotAs(OutputType.FILE)` -- most useful attached automatically to a failing test's CI report, giving a visual snapshot of exactly what the page looked like at the moment of failure, without needing to reproduce the failure interactively.",
    category: "Complex UI Interaction",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-ui-09",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What does an 'element click intercepted' error typically mean, and what's a common cause?",
    answer:
      "The target element exists and appears clickable, but another element (often an overlay, a sticky header, or a loading spinner) is actually positioned on top of it at that point, intercepting the click -- a common cause is clicking too soon, before an overlay has finished disappearing.",
    category: "Complex UI Interaction",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-ui-10",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why might reading and asserting on browser cookies be useful in a test, beyond just interacting with visible UI elements?",
    answer:
      "Cookies can carry session/authentication state or feature-flag values not directly visible in the UI -- asserting on them directly (e.g. confirming a session cookie was correctly set after login) verifies backend behavior a purely visual check might miss.",
    category: "Complex UI Interaction",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Page Objects & JUnit Integration (10) ---
  {
    id: "selenium-interview-pageobj-01",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What is the Page Object Model, and what problem does it solve for a growing Selenium suite?",
    answer:
      "A design pattern encapsulating a specific page's (or component's) locators and interactions inside a dedicated class, so tests call semantic methods (`loginPage.login(user, pass)`) instead of repeating raw locators -- when the UI changes, only the page object needs updating, not every test using it.",
    category: "Page Objects & JUnit Integration",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-pageobj-02",
    courseSlug: "selenium-webdriver-automation",
    question: "Why should page object methods generally avoid containing test assertions?",
    answer:
      "Keeping assertions in the test file (not the page object) keeps the page object reusable purely as an interaction layer, and keeps a test's expected behavior visible and readable directly in the test file, rather than hidden inside a shared helper class.",
    category: "Page Objects & JUnit Integration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-pageobj-03",
    courseSlug: "selenium-webdriver-automation",
    question: "What is a component object, and how does it differ from a full page object?",
    answer:
      "A component object encapsulates a smaller, reusable piece of UI that appears across multiple pages (like a header navigation bar or a search widget), separate from a full page object representing an entire distinct page -- avoids duplicating the same locators/interactions across every page object that happens to include that shared component.",
    category: "Page Objects & JUnit Integration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-pageobj-04",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What does JUnit's `@ParameterizedTest` let you do, and how does it reduce duplicated test code?",
    answer:
      "It runs the SAME test logic repeatedly against a table/list of different input values, rather than writing a near-identical test method for each individual case -- useful for testing the same form-validation behavior across many different invalid input examples without duplicating the test structure.",
    category: "Page Objects & JUnit Integration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-pageobj-05",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What is the value of JUnit's `@BeforeEach`/`@AfterEach` for a Selenium test class, specifically for browser lifecycle management?",
    answer:
      "`@BeforeEach` can start a fresh browser session before every test, and `@AfterEach` can call `driver.quit()` after every test -- ensuring each test runs in a genuinely clean browser state, and that browser resources are always released even if a test fails partway through.",
    category: "Page Objects & JUnit Integration",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-pageobj-06",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why does starting a fresh browser session for every single test (rather than reusing one session across many tests) improve test reliability, despite being slower?",
    answer:
      "A fresh session guarantees no leftover cookies, local storage, or navigation state from a previous test can leak into and affect the next one -- reusing a session across tests risks subtle, hard-to-diagnose cross-test interference.",
    category: "Page Objects & JUnit Integration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-pageobj-07",
    courseSlug: "selenium-webdriver-automation",
    question:
      "How would a page object's constructor typically verify it's actually on the correct page before returning?",
    answer:
      "It might assert on a unique, page-identifying element (like a specific heading or URL pattern) being present, failing fast with a clear error if the expected page didn't actually load -- catching a navigation problem immediately at the page object's construction, rather than producing a confusing failure later when a specific element can't be found.",
    category: "Page Objects & JUnit Integration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-pageobj-08",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What is the `@FindBy` annotation (from PageFactory), and what does it let you avoid writing manually?",
    answer:
      "It declaratively binds a page object's field directly to a locator, letting `PageFactory.initElements()` populate those fields automatically -- avoids manually writing `driver.findElement(...)` calls inside every page object method, though many modern codebases prefer explicit lazy-lookup methods over `PageFactory` for more predictable behavior.",
    category: "Page Objects & JUnit Integration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-pageobj-09",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why should a page object method that submits a form and navigates to a new page return the NEXT page object, rather than void?",
    answer:
      "Returning the next page object lets tests chain method calls fluently (`loginPage.login(...).goToDashboard()...`) in a way that reads naturally and enforces, at compile time, that navigation actually happened before subsequent page-specific methods are called.",
    category: "Page Objects & JUnit Integration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-pageobj-10",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why might a large Selenium suite organize page objects into a package structure mirroring the application's own page/route structure?",
    answer:
      "It makes it intuitive to find the page object corresponding to a given application page, and keeps the test codebase's organization scaling predictably alongside the application itself as both grow, rather than becoming an unstructured pile of page object classes.",
    category: "Page Objects & JUnit Integration",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Parallel Execution, Diagnosis & Security (10) ---
  {
    id: "selenium-interview-parallel-01",
    courseSlug: "selenium-webdriver-automation",
    question: "What is Selenium Grid, and what problem does it solve?",
    answer:
      "A server that distributes WebDriver test execution across multiple machines/browsers/versions, letting a test suite run in parallel against a farm of browser instances rather than sequentially on one local machine -- solves both the speed problem (parallelism) and the cross-browser/version-coverage problem (testing against configurations you may not have installed locally).",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-parallel-02",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What is `RemoteWebDriver`, and how does it relate to running tests against Selenium Grid?",
    answer:
      "`RemoteWebDriver` connects to a remote Grid (or cloud browser-testing service) endpoint instead of launching a local browser directly -- your test code interacts with it exactly the same way as a local `WebDriver`, with the actual browser execution happening on a remote machine.",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-parallel-03",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why must tests running in parallel avoid sharing mutable state (like a single hardcoded test account)?",
    answer:
      "Two parallel tests both reading and writing the same shared resource can interleave unpredictably, causing intermittent, hard-to-reproduce failures -- each parallel test needs its own isolated data to be safely run concurrently.",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "advanced",
    commonMistake:
      "Sharing the same hardcoded test account across parallel-running tests, causing intermittent cross-test interference.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-parallel-04",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What is a flaky test, and why is automatically retrying it a mitigation rather than a real fix?",
    answer:
      "A flaky test passes and fails intermittently with no real code change -- automatically retrying can mask the underlying race condition/timing issue while the suite stays green, but the root cause (often a missing or wrong wait condition) remains unaddressed and can resurface later or under different conditions.",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-parallel-05",
    courseSlug: "selenium-webdriver-automation",
    question:
      "How would you diagnose a Selenium test that passes locally but fails consistently in CI?",
    answer:
      "Common culprits: CI running headless while local runs headed (different rendering/timing), CI's slower/differently-resourced machine exposing a race condition a faster local machine masks, or a different screen resolution affecting element visibility/position -- comparing environment differences systematically, rather than assuming it's 'just flaky,' usually reveals the actual cause.",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-parallel-06",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why is a CI-generated HTML report with embedded screenshots/logs on failure valuable, beyond a plain pass/fail console log?",
    answer:
      "It preserves the exact diagnostic state at the moment of failure for later review, since a CI environment usually can't be interactively re-run on demand the way a local machine can -- without it, investigating a CI-only failure after the fact has little more than a stack trace to work from.",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-parallel-07",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why should test credentials/secrets be sourced from environment variables or a secrets manager rather than hardcoded in test source files?",
    answer:
      "Test files are typically committed to version control -- hardcoded credentials become part of the repository's history, visible to anyone with repo access even if later 'removed' in a subsequent commit; environment-sourced secrets keep credentials out of the codebase entirely.",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "intermediate",
    commonMistake:
      "Hardcoding a test account's password directly in a test file, which then persists in git history indefinitely.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-parallel-08",
    courseSlug: "selenium-webdriver-automation",
    question:
      "What does it mean for a Selenium test suite to be 'maintainable' as the application grows, beyond just currently passing?",
    answer:
      "Reusable page objects instead of duplicated locators, resilient element-location strategies that don't break on cosmetic changes, properly isolated/independent tests, and clear failure diagnostics -- a suite that technically passes today but is expensive and fragile to keep updated isn't genuinely maintainable.",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-parallel-09",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why might a large Selenium suite need to carefully manage parallel thread count against available system/Grid resources?",
    answer:
      "Running too many browser instances simultaneously can exhaust available memory/CPU (or Grid node capacity), causing tests to slow down, time out, or fail for resource-contention reasons entirely unrelated to the actual application under test -- parallel execution needs tuning against real available capacity, not maximized blindly.",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "selenium-interview-parallel-10",
    courseSlug: "selenium-webdriver-automation",
    question:
      "Why is Selenium generally considered slower and more setup-heavy than newer tools like Playwright, and why might that tradeoff still be acceptable for an existing enterprise Java suite?",
    answer:
      "Selenium's WebDriver protocol involves more HTTP round-trips and manual wait management compared to Playwright's auto-waiting, purpose-built API -- but for an established, working, well-maintained enterprise suite, the migration cost/risk of a full rewrite to a different tool often outweighs the incremental performance/ergonomics benefit, especially if the existing suite is otherwise reliable.",
    category: "Parallel Execution, Diagnosis & Security",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
