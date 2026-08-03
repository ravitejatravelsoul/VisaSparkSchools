import type { LessonInput } from "@/lib/content/types";

/**
 * Selenium WebDriver Automation.
 *
 * This platform has no JVM and no Selenium runtime in its browser sandbox,
 * and does not add either -- the site cannot honestly launch a real browser
 * driven by Selenium from learner-submitted code. Every lesson's
 * guidedExercise/independentExercise is therefore a genuine, browser-
 * executable JavaScript/TypeScript exercise that models the underlying
 * decision behind a Selenium concept (wait-strategy selection, locator
 * stability, a page-object's responsibility boundary, stale-element
 * detection) -- never a claim that a real browser was launched or
 * controlled by this site. Three lessons additionally carry a
 * `guidedLocalLab` for real, local Java + Selenium + JUnit work.
 *
 * Version assumptions: Java 21 (LTS, matching Java Programming Foundations),
 * Selenium WebDriver 4.x, JUnit 5.10+ (Jupiter), Maven 3.9+.
 */
export const seleniumLessons: LessonInput[] = [
  {
    id: "sel-webdriver-architecture",
    slug: "sel-webdriver-architecture",
    title: "WebDriver Architecture, the W3C Protocol, and Project Setup",
    description:
      "What actually happens between a line of Selenium code and a real browser responding — the W3C WebDriver protocol, driver management, and setting up a real Java + Selenium project.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: [],
    objectives: [
      "Explain the W3C WebDriver protocol's role as the standard connecting Selenium code to a real browser",
      "Explain what a browser driver is and why version mismatches between it and the browser cause real failures",
      "Set up a Java, Selenium, and Maven project and run a first real WebDriver session",
    ],
    skills: ["selenium", "webdriver", "architecture"],
    tech: [
      { name: "Java (JDK)", version: "21 LTS" },
      { name: "Selenium WebDriver", version: "4.x" },
      { name: "Maven", version: "3.9+" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: WebDriver",
        url: "https://www.selenium.dev/documentation/webdriver/",
      },
      { label: "W3C WebDriver Specification", url: "https://www.w3.org/TR/webdriver2/" },
    ],
    keywords: ["selenium", "webdriver", "w3c", "architecture"],
    explanation: `Selenium WebDriver is built on the **W3C WebDriver protocol** — a standardized, browser-vendor-agreed HTTP API for remotely controlling a browser: "navigate to this URL," "find this element," "click this element" are all real HTTP requests sent to a **driver** process, which translates them into whatever that specific browser actually understands internally. This is a genuinely different architecture from Playwright's (previous course, if you've taken it): Selenium talks to browsers through this standardized *external* protocol implemented separately by each browser vendor, while Playwright communicates through each browser's own internal automation protocol directly. Neither is "faster" as a blanket claim — they're different architectural choices with different tradeoffs, and understanding Selenium's protocol-based design explains several of its practical behaviors covered later in this course.

A **browser driver** (\`chromedriver\` for Chrome, \`geckodriver\` for Firefox) is a separate executable that sits between your Selenium code and the actual browser, translating W3C WebDriver protocol calls into that specific browser's real automation interface. **Driver-to-browser version mismatches are a genuine, common source of real failures** — a chromedriver built for Chrome 120 may not work correctly (or at all) against a Chrome 130 installation. Modern Selenium (4.6+) includes **Selenium Manager**, which automatically detects your installed browser version and downloads a matching driver, removing what used to be a very common manual-setup failure point — but understanding that this matching *has* to happen, automatically or manually, is what makes a driver-related setup error diagnosable rather than mysterious.

A Java Selenium project is typically set up with **Maven** (or Gradle) managing dependencies: a \`pom.xml\` declaring the \`selenium-java\` and \`junit-jupiter\` artifacts, source code under \`src/main/java\`, and tests under \`src/test/java\` — the exact same conventional structure this platform's Java Programming Foundations course already established. \`WebDriver driver = new ChromeDriver();\` creates a real driver session and launches a real, visible browser window by default; \`driver.quit()\` closes it and ends the session — forgetting to call this reliably (especially on a failed test, where the code path that would call it might be skipped) is a common source of leaked browser processes accumulating across a long-running suite, which is exactly why this course later covers a structured, guaranteed-cleanup pattern via JUnit lifecycle annotations.`,
    example: {
      language: "javascript",
      description:
        "Modeling the WebDriver protocol as a request/response translation layer -- the real Java syntax and a real browser launch are covered in this lesson's guided local lab.",
      code: `// A simplified model of the W3C WebDriver protocol: a command sent to a driver,
// translated into a browser-specific action, returning a standardized response.
function sendWebDriverCommand(driverVersion, browserVersion, command) {
  if (driverVersion !== browserVersion) {
    return { status: "error", message: "driver/browser version mismatch" };
  }
  return { status: "ok", result: "executed: " + command };
}

console.log(sendWebDriverCommand(120, 120, "navigate to https://example.com")); // ok
console.log(sendWebDriverCommand(120, 130, "navigate to https://example.com")); // error -- version mismatch, a real, common failure mode`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change the browserVersion to match driverVersion and confirm the command now succeeds.",
      code: `function sendWebDriverCommand(driverVersion, browserVersion, command) {
  if (driverVersion !== browserVersion) return { status: "error", message: "version mismatch" };
  return { status: "ok", result: "executed: " + command };
}
console.log(sendWebDriverCommand(120, 130, "click #submit"));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isDriverCompatible(driverVersion, browserVersion) modeling Selenium Manager's real job: return true if the versions match exactly. Then write resolveDriverVersion(browserVersion, autoManaged) returning browserVersion if autoManaged is true (Selenium Manager handles it automatically), or null if autoManaged is false (manual setup required, no automatic resolution).",
      starterCode: `function isDriverCompatible(driverVersion, browserVersion) {
  // TODO
}
function resolveDriverVersion(browserVersion, autoManaged) {
  // TODO
}
`,
      solutionCode: `function isDriverCompatible(driverVersion, browserVersion) {
  return driverVersion === browserVersion;
}
function resolveDriverVersion(browserVersion, autoManaged) {
  return autoManaged ? browserVersion : null;
}`,
      harness: `
        try { window.__report('t1', isDriverCompatible(120, 120) === true, 'matching versions should be compatible'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isDriverCompatible(120, 130) === false, 'mismatched versions should not be compatible'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', resolveDriverVersion(130, true) === 130, 'auto-managed should resolve to a matching driver version'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', resolveDriverVersion(130, false) === null, 'manual setup should not auto-resolve'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "matching driver/browser versions are compatible" },
        { id: "t2", description: "mismatched versions are not compatible" },
        { id: "t3", description: "auto-managed resolution matches the browser version" },
        { id: "t4", description: "manual (non-auto-managed) setup does not auto-resolve" },
      ],
      hints: [
        "This models exactly what Selenium Manager automates: matching a driver version to the installed browser version.",
        "Before Selenium Manager, this matching had to be done manually -- a common, real source of setup failures.",
      ],
    },
    independentExercise: {
      id: "sel-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write classifySeleniumCall(command) modeling the W3C protocol translation layer: return 'navigation' for commands starting with 'navigate', 'interaction' for commands starting with 'click' or 'sendKeys', 'query' for commands starting with 'find' or 'get', or 'unknown' otherwise.",
      starterCode: `function classifySeleniumCall(command) {
  // TODO
}
`,
      solutionCode: `function classifySeleniumCall(command) {
  if (command.startsWith("navigate")) return "navigation";
  if (command.startsWith("click") || command.startsWith("sendKeys")) return "interaction";
  if (command.startsWith("find") || command.startsWith("get")) return "query";
  return "unknown";
}`,
      harness: `
        try { window.__report('t1', classifySeleniumCall("navigate to /login") === "navigation", 'navigate commands should classify as navigation'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', classifySeleniumCall("click #submit") === "interaction", 'click commands should classify as interaction'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', classifySeleniumCall("findElement #email") === "query", 'find commands should classify as query'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', classifySeleniumCall("bogus") === "unknown", 'an unrecognized command should classify as unknown'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "classifies navigation commands correctly" },
        { id: "t2", description: "classifies interaction commands correctly" },
        { id: "t3", description: "classifies query commands correctly" },
        { id: "t4", description: "classifies an unrecognized command as unknown" },
      ],
      hints: [
        "String.prototype.startsWith is the right tool for prefix-based classification.",
        "This models the real categories of operation the W3C WebDriver protocol actually defines.",
      ],
    },
    guidedLocalLab: {
      id: "sel-gll-project-setup",
      title: "Create a Java, Selenium, and JUnit Test Project Locally",
      scenario:
        "Set up a real Maven project with Selenium WebDriver and JUnit 5, and run your first genuine browser automation, launching and controlling a real browser window.",
      requiredTools: [
        { name: "JDK", version: "21 LTS or newer" },
        { name: "Apache Maven", version: "3.9+" },
        { name: "A real browser (Chrome or Firefox)", version: "any current version" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        "Confirm Java and Maven are installed: `java -version` and `mvn -version`.",
        "Generate a Maven project: `mvn archetype:generate -DgroupId=com.visaspark.selenium -DartifactId=selenium-learning-lab -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`.",
        "Add the selenium-java and junit-jupiter dependencies to pom.xml.",
      ],
      projectStructure: `selenium-learning-lab/
  pom.xml
  src/
    test/java/com/visaspark/selenium/
      FirstSeleniumTest.java`,
      starterFiles: [
        {
          path: "pom.xml",
          content: `<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.visaspark.selenium</groupId>
    <artifactId>selenium-learning-lab</artifactId>
    <version>1.0</version>
    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
    </properties>
    <dependencies>
        <!-- TODO: add org.seleniumhq.selenium:selenium-java (4.x) -->
        <!-- TODO: add org.junit.jupiter:junit-jupiter (5.10+), scope test -->
    </dependencies>
</project>
`,
        },
        {
          path: "src/test/java/com/visaspark/selenium/FirstSeleniumTest.java",
          content: `package com.visaspark.selenium;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import static org.junit.jupiter.api.Assertions.*;

class FirstSeleniumTest {
    @Test
    void aRealPageLoadsWithTheExpectedTitle() {
        // TODO: create a new ChromeDriver()
        // TODO: navigate to a real, stable public URL
        // TODO: assert something about the real page title using driver.getTitle()
        // TODO: call driver.quit() -- ALWAYS, even if the assertion above fails
        //       (hint: try/finally is the right tool here)
    }
}
`,
        },
      ],
      requirements: [
        "pom.xml declares real selenium-java (4.x) and junit-jupiter (5.10+) dependencies.",
        "FirstSeleniumTest.java creates a real ChromeDriver, navigates to a real URL, and asserts against the real page title.",
        "driver.quit() is called in a finally block, guaranteeing the browser closes even if the assertion fails.",
      ],
      commands: [
        { description: "Run the test", command: "mvn test" },
        {
          description: "Run a single test class directly",
          command: "mvn test -Dtest=FirstSeleniumTest",
        },
      ],
      expectedBehavior:
        "Running `mvn test` launches a real, visible Chrome window, navigates to the chosen URL, and reports the test passing (BUILD SUCCESS) with the browser window closing automatically afterward.",
      verificationSteps: [
        {
          command: "mvn test",
          expectedResult:
            "BUILD SUCCESS; a real Chrome window was observed opening and closing during the run",
        },
        {
          command: "(temporarily break the assertion, e.g. expect the wrong title)",
          expectedResult:
            "The test fails, but the browser window STILL closes -- confirming the finally block works",
        },
      ],
      troubleshooting: [
        {
          issue:
            "`SessionNotCreatedException: This version of ChromeDriver only supports Chrome version X`",
          fix: "A driver/browser version mismatch — with Selenium 4.6+, Selenium Manager should resolve this automatically; confirm you're not manually specifying an old chromedriver path that overrides it.",
        },
        {
          issue: "The browser window never closes, even after the test finishes",
          fix: "Confirm driver.quit() is inside a finally block, not just at the end of the try block — a failing assertion skips code after it unless that code is in finally.",
        },
        {
          issue: "`mvn: command not found`",
          fix: "Maven isn't installed or isn't on your PATH — install it and confirm with `mvn -version` before continuing.",
        },
      ],
      hints: [
        "new ChromeDriver() with no arguments uses Selenium Manager automatically in modern Selenium -- no manual driver download needed.",
        "try { ...assertions... } finally { driver.quit(); } is the pattern that guarantees cleanup regardless of test outcome.",
        "driver.getTitle() returns the real, current page title as a String.",
      ],
      referenceSolution: {
        summary:
          "pom.xml declares selenium-java and junit-jupiter. FirstSeleniumTest creates a real ChromeDriver, navigates to a real URL, asserts on the real title, and guarantees driver.quit() via try/finally.",
        files: [
          {
            path: "pom.xml",
            content: `<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.visaspark.selenium</groupId>
    <artifactId>selenium-learning-lab</artifactId>
    <version>1.0</version>
    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>4.25.0</version>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.3</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
`,
          },
          {
            path: "src/test/java/com/visaspark/selenium/FirstSeleniumTest.java",
            content: `package com.visaspark.selenium;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import static org.junit.jupiter.api.Assertions.*;

class FirstSeleniumTest {
    @Test
    void aRealPageLoadsWithTheExpectedTitle() {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://www.selenium.dev");
            assertTrue(driver.getTitle().contains("Selenium"));
        } finally {
            driver.quit();
        }
    }
}
`,
          },
        ],
      },
      extensionChallenge:
        "Add a second @Test method that launches Firefox instead (using FirefoxDriver), navigating to the same URL, confirming the same test logic works against a genuinely different real browser engine.",
    },
    commonMistakes: [
      "Assuming Selenium and Playwright use the same underlying architecture -- Selenium goes through the standardized, external W3C WebDriver protocol via a separate driver process; understanding this explains several of Selenium's specific behaviors and failure modes.",
      "Manually downloading and pinning a driver version without keeping it in sync with browser updates -- Selenium Manager (4.6+) automates this exact matching, removing what used to be a frequent, confusing setup failure.",
      "Putting driver.quit() as the last line of a test method instead of inside a finally block -- a failing assertion skips any code after it unless that code is guaranteed to run via finally, leaking a real browser process on every failure.",
    ],
    quiz: [
      {
        id: "sel-q1-1",
        prompt: "What is the W3C WebDriver protocol's role in Selenium's architecture?",
        choices: [
          "It's an optional feature most Selenium users never encounter",
          "It's the standardized HTTP API through which Selenium code communicates with a browser driver, which then translates commands for the actual browser",
          "It only applies to Firefox, not Chrome",
          "It replaces the need for a separate driver executable entirely",
        ],
        correctIndex: 1,
        explanation:
          "Selenium's commands (navigate, find, click) are sent as standardized W3C WebDriver protocol requests to a driver process (chromedriver, geckodriver), which is what actually translates them into browser-specific automation calls — this external, protocol-based design is a defining architectural characteristic of Selenium.",
      },
      {
        id: "sel-q1-2",
        prompt: "What problem does Selenium Manager (4.6+) solve?",
        choices: [
          "It makes tests run faster",
          "It automatically detects the installed browser version and downloads a matching driver, removing a common, previously manual and error-prone setup step",
          "It replaces JUnit for running tests",
          "It eliminates the need for a real browser to be installed",
        ],
        correctIndex: 1,
        explanation:
          "Driver-to-browser version mismatches were a frequent source of confusing setup failures before Selenium Manager — it automates exactly that matching, so `new ChromeDriver()` typically works without any manual driver download or version-pinning.",
      },
      {
        id: "sel-q1-3",
        prompt:
          "Why must driver.quit() be called inside a finally block rather than as the last line of a test method?",
        choices: [
          "It doesn't matter where quit() is called",
          "A failing assertion (or any exception) skips subsequent code in the same try block, so quit() placed after it would never run on failure -- only finally guarantees it always executes",
          "finally is required by JUnit's syntax rules",
          "quit() only works inside a finally block",
        ],
        correctIndex: 1,
        explanation:
          "An assertion failure throws, which immediately exits the current try block, skipping any code after it. Only a finally block (or an equivalent guaranteed-cleanup mechanism) runs regardless of whether the code above it succeeded, threw, or returned — which is exactly what's needed to reliably close the browser on both success and failure.",
      },
    ],
    takeaway:
      "Selenium communicates with browsers through the standardized, external W3C WebDriver protocol via a separate driver process — a genuinely different architecture from tools that talk to a browser's own internal protocol directly — and understanding this explains driver-version mismatches and why guaranteed cleanup (finally) matters so much for avoiding leaked browser processes.",
    summary:
      "The W3C WebDriver protocol standardizes how Selenium code commands a browser driver, which translates those commands for the real browser. Driver/browser version mismatches are a real, common failure Selenium Manager (4.6+) now automates away. A Java Selenium project uses Maven/Gradle with selenium-java and junit-jupiter; driver.quit() belongs in a finally block to guarantee cleanup.",
    nextLessonSlug: "sel-driver-lifecycle-navigation",
  },
  {
    id: "sel-driver-lifecycle-navigation",
    slug: "sel-driver-lifecycle-navigation",
    title: "Driver Lifecycle and Navigation",
    description:
      "What a WebDriver instance actually represents, structuring its lifecycle with JUnit annotations, and the navigation methods beyond a simple get().",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["sel-webdriver-architecture"],
    objectives: [
      "Structure driver creation and teardown using JUnit's @BeforeEach/@AfterEach lifecycle",
      "Use WebDriver's navigation methods (get, back, forward, refresh) correctly",
      "Explain why a shared driver instance across tests risks state leaking between them",
    ],
    skills: ["selenium", "driver-lifecycle", "navigation"],
    tech: [
      { name: "Selenium WebDriver", version: "4.x" },
      { name: "JUnit", version: "5.10+" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Navigation",
        url: "https://www.selenium.dev/documentation/webdriver/browser/",
      },
      {
        label: "JUnit 5 User Guide: Test lifecycle",
        url: "https://junit.org/junit5/docs/current/user-guide/#writing-tests-classes-and-methods",
      },
    ],
    keywords: ["driver lifecycle", "navigation", "junit", "selenium"],
    explanation: `A \`WebDriver\` instance represents one real, running browser session — created (\`new ChromeDriver()\`), used for a series of commands, then closed (\`driver.quit()\`). The previous lesson's guided local lab used a manual \`try\`/\`finally\` inside one test method; a real, multi-test suite structures this with **JUnit lifecycle annotations** instead: \`@BeforeEach void setup() { driver = new ChromeDriver(); }\` creates a **fresh driver before every single test method**, and \`@AfterEach void teardown() { driver.quit(); }\` guarantees cleanup after every one, regardless of that test's outcome — JUnit runs \`@AfterEach\` even when a test method throws, giving you the same guaranteed-cleanup property as \`finally\`, but applied automatically across an entire test class rather than written by hand in each method.

This **per-test fresh driver** pattern matters for the same fundamental reason Playwright's per-test context isolation matters (if you've taken that course): a shared driver instance reused across multiple tests can leak state — cookies, browser history, whatever page the previous test happened to leave the browser on — silently affecting a later test's starting conditions in ways that make failures hard to reproduce and diagnose. The cost is real (launching a fresh browser per test is slower than reusing one), but the reliability and diagnosability payoff is why it's the standard, recommended default for correctness-focused test suites, not merely a performance-agnostic style preference.

**Navigation** goes beyond \`driver.get(url)\` (load a URL, waiting for the \`document.readyState\` to reach "complete" by default): \`driver.navigate().to(url)\` is functionally equivalent to \`get()\`; \`driver.navigate().back()\` and \`.forward()\` move through the browser's real history stack, exactly like clicking a real back/forward button; \`driver.navigate().refresh()\` reloads the current page. These matter specifically for testing workflows that depend on real browser history behavior — confirming a "back" button correctly returns a user to a previous, valid state, rather than an error page or a broken partial render, is a genuine, common test scenario these methods exist to support.`,
    example: {
      language: "javascript",
      description:
        "Modeling the per-test-fresh-driver lifecycle and navigation-history stack, without a real browser.",
      code: `class FakeDriverSession {
  constructor() { this.history = []; this.historyIndex = -1; this.cookies = new Set(); }
  get(url) {
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(url);
    this.historyIndex++;
  }
  back() { if (this.historyIndex > 0) this.historyIndex--; }
  forward() { if (this.historyIndex < this.history.length - 1) this.historyIndex++; }
  currentUrl() { return this.history[this.historyIndex]; }
}

// beforeEach: a FRESH session per test -- no leaked cookies/history from a previous test.
function runTest(testBody) {
  const driver = new FakeDriverSession(); // fresh every time
  testBody(driver);
  // afterEach equivalent: driver discarded here, nothing carries over
}

runTest((driver) => {
  driver.get("/page-a");
  driver.get("/page-b");
  driver.back();
  console.log(driver.currentUrl()); // "/page-a" -- real history navigation
});`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call driver.forward() after the back() call above and confirm it returns to /page-b.",
      code: `class FakeDriverSession {
  constructor() { this.history = []; this.historyIndex = -1; }
  get(url) { this.history = this.history.slice(0, this.historyIndex + 1); this.history.push(url); this.historyIndex++; }
  back() { if (this.historyIndex > 0) this.historyIndex--; }
  forward() { if (this.historyIndex < this.history.length - 1) this.historyIndex++; }
  currentUrl() { return this.history[this.historyIndex]; }
}
const driver = new FakeDriverSession();
driver.get("/a"); driver.get("/b"); driver.back();
console.log(driver.currentUrl());`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write freshDriverPerTest(testNames, runTest) modeling JUnit's @BeforeEach/@AfterEach: for EACH name in testNames, create a fresh 'driver' object ({cookies: new Set()}), call runTest(driver, name), then discard it. Return an array of booleans: true if that test's driver had ZERO cookies at the start (proving no leakage from a previous test).",
      starterCode: `function freshDriverPerTest(testNames, runTest) {
  const results = [];
  // TODO: for each name, create a FRESH driver, check it starts with 0 cookies, run the test, discard the driver
  return results;
}
`,
      solutionCode: `function freshDriverPerTest(testNames, runTest) {
  const results = [];
  for (const name of testNames) {
    const driver = { cookies: new Set() };
    results.push(driver.cookies.size === 0);
    runTest(driver, name);
    // driver discarded here -- next iteration creates a genuinely new one
  }
  return results;
}`,
      harness: `
        try {
          const results = freshDriverPerTest(["t1","t2","t3"], (driver) => { driver.cookies.add("session=abc"); });
          window.__report('t1', results.every(r => r === true), 'every test should start with a driver that has zero cookies, regardless of what a previous test added');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const results = freshDriverPerTest([], () => {});
          window.__report('t2', results.length === 0, 'no test names should give no results'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "every test starts with a genuinely fresh, cookie-free driver" },
        { id: "t2", description: "handles an empty test-names list" },
      ],
      hints: [
        "Creating a NEW driver object inside the loop, every iteration, is what guarantees no leakage -- reusing one object across iterations would fail this check.",
        "This models exactly what @BeforeEach does: fresh setup before every single test method.",
      ],
    },
    independentExercise: {
      id: "sel-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write navigationHistory(actions) where actions is an array of {type: 'get'|'back'|'forward', url?} objects. Simulate them in order against a history stack (starting empty, index -1) and return the final current URL (or null if history is empty).",
      starterCode: `function navigationHistory(actions) {
  let history = [];
  let index = -1;
  // TODO: process each action: 'get' pushes a new url (truncating any forward history first),
  // 'back' decrements index (not below 0), 'forward' increments index (not past the end)
  return index >= 0 ? history[index] : null;
}
`,
      solutionCode: `function navigationHistory(actions) {
  let history = [];
  let index = -1;
  for (const action of actions) {
    if (action.type === "get") {
      history = history.slice(0, index + 1);
      history.push(action.url);
      index++;
    } else if (action.type === "back") {
      if (index > 0) index--;
    } else if (action.type === "forward") {
      if (index < history.length - 1) index++;
    }
  }
  return index >= 0 ? history[index] : null;
}`,
      harness: `
        try {
          const result = navigationHistory([{type:"get",url:"/a"},{type:"get",url:"/b"},{type:"back"}]);
          window.__report('t1', result === "/a", 'back after two gets should return to the first page'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = navigationHistory([{type:"get",url:"/a"},{type:"get",url:"/b"},{type:"back"},{type:"forward"}]);
          window.__report('t2', result === "/b", 'forward after back should return to where it was'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const result = navigationHistory([]);
          window.__report('t3', result === null, 'no actions should give a null current url'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try {
          const result = navigationHistory([{type:"get",url:"/a"},{type:"get",url:"/b"},{type:"back"},{type:"get",url:"/c"}]);
          window.__report('t4', result === "/c", 'a new get after going back should truncate the forward history, exactly like a real browser'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "back correctly returns to a previous page" },
        { id: "t2", description: "forward correctly returns to a page navigated back from" },
        { id: "t3", description: "handles no actions at all" },
        {
          id: "t4",
          description: "a new navigation after going back truncates any forward history",
        },
      ],
      hints: [
        "This models a real browser's history stack exactly -- get() after going back discards the 'forward' branch, just like a real browser tab.",
        "Bound both back and forward so they never move the index out of the valid range.",
      ],
    },
    commonMistakes: [
      "Sharing one WebDriver instance across multiple tests to save time -- this risks leaked cookies, history, or page state silently affecting a later test's starting conditions, making failures hard to reproduce.",
      "Putting driver.quit() inside @Test methods individually instead of a shared @AfterEach -- this duplicates cleanup logic across every test and risks a missed cleanup if any single test forgets it.",
      "Assuming driver.navigate().back() is purely cosmetic -- it exercises the browser's REAL history mechanism, which is exactly what makes it useful for testing that a back button leads to a valid, correctly-rendered state, not an error.",
    ],
    quiz: [
      {
        id: "sel-q2-1",
        prompt:
          "Why does JUnit's @AfterEach guarantee driver.quit() runs even when a test method throws an exception?",
        choices: [
          "It doesn't guarantee this; @AfterEach is skipped on failure",
          "JUnit's lifecycle is specifically designed to run @AfterEach after every test method regardless of outcome, giving the same guaranteed-cleanup property as a try/finally, but applied automatically across the whole test class",
          "@AfterEach only runs if @BeforeEach also throws",
          "This behavior requires a special JUnit plugin not included by default",
        ],
        correctIndex: 1,
        explanation:
          "JUnit's test lifecycle runs @AfterEach methods after every single test, success or failure, exactly analogous to a finally block — this is what makes it the standard, safe place for driver.quit() in a real multi-test class.",
      },
      {
        id: "sel-q2-2",
        prompt:
          "What is the main risk of reusing one WebDriver instance across multiple tests instead of creating a fresh one per test?",
        choices: [
          "There is no real risk; it's purely a performance optimization",
          "State (cookies, history, current page) can leak from one test into the next, silently affecting a later test's starting conditions and making failures hard to reproduce",
          "A shared driver instance cannot navigate to more than one URL",
          "JUnit does not allow sharing driver instances under any circumstances",
        ],
        correctIndex: 1,
        explanation:
          "Without a fresh driver per test, whatever state the previous test left the browser in (cookies set, history, current page) becomes an unintended, unstated starting condition for the next test — exactly the kind of hidden coupling that produces confusing, hard-to-reproduce failures.",
      },
      {
        id: "sel-q2-3",
        prompt: "What does driver.navigate().back() actually exercise?",
        choices: [
          "It just re-runs the previous driver.get() call with the same URL",
          "The browser's real navigation history stack, exactly as if a user clicked the real back button",
          "It has no effect unless combined with refresh()",
          "It only works in Chrome, not other browsers",
        ],
        correctIndex: 1,
        explanation:
          "navigate().back() drives the browser's genuine history mechanism, not a simulated re-fetch — which is exactly why it's the right tool for testing that a real back-button interaction leads to a correct, valid page state.",
      },
    ],
    takeaway:
      "Structure driver creation/teardown with JUnit's @BeforeEach/@AfterEach for guaranteed, automatic cleanup across every test in a class — a fresh driver per test avoids state leaking between tests, and navigation methods beyond get() exercise the browser's real history mechanism.",
    summary:
      "@BeforeEach creates a fresh WebDriver before every test; @AfterEach guarantees driver.quit() runs after every test regardless of outcome. A shared driver across tests risks leaked state affecting later tests. navigate().back()/forward()/refresh() exercise the browser's real history stack, not a simulated re-fetch.",
    nextLessonSlug: "sel-element-location",
  },
  {
    id: "sel-element-location",
    slug: "sel-element-location",
    title: "Element Location: By Strategies and WebElement Behavior",
    description:
      "The full menu of Selenium's By locator strategies, which ones actually hold up over time, and what a WebElement reference really represents.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: ["sel-driver-lifecycle-navigation"],
    objectives: [
      "Choose the correct By locator strategy (id, css, xpath, and others) for a given situation",
      "Rank locator strategies by real-world stability, and explain the reasoning",
      "Explain why a WebElement reference can become invalid without the code visibly changing",
    ],
    skills: ["selenium", "locators", "webelement"],
    tech: [{ name: "Selenium WebDriver", version: "4.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Finding elements",
        url: "https://www.selenium.dev/documentation/webdriver/elements/finders/",
      },
      {
        label: "Selenium docs: Locator strategies",
        url: "https://www.selenium.dev/documentation/webdriver/elements/locators/",
      },
    ],
    keywords: ["by locators", "css selectors", "xpath", "webelement", "selenium"],
    explanation: `Selenium's \`By\` class offers several distinct locator strategies: \`By.id("submit-button")\` (fastest, most direct — but only usable when a stable \`id\` attribute genuinely exists), \`By.name("email")\`, \`By.className("btn-primary")\`, \`By.tagName("button")\`, \`By.linkText("Sign in")\`/\`By.partialLinkText("Sign")\` (for \`<a>\` elements specifically, matched by their visible text), \`By.cssSelector("#login-form input[type='email']")\` (flexible, generally fast, familiar to anyone who's written CSS), and \`By.xpath("//button[contains(text(), 'Submit')]")\` (the most powerful and flexible — XPath can navigate *up* the DOM tree to a parent or ancestor, something CSS selectors cannot do at all, but that power comes with a real, honest cost: XPath expressions are frequently the hardest of any strategy to read, write correctly, and keep working as markup evolves).

**Locator stability** is a genuine, explicit spectrum worth reasoning about, similar in spirit to (though with different specific tools than) the locator-priority reasoning from browser-automation tools built around accessible-first locating: a stable \`id\` or a well-chosen \`data-testid\`-style attribute is the most resilient to unrelated changes; a CSS selector targeting a meaningful, purpose-specific class is next; and a deep, structural CSS selector or XPath expression describing exact DOM position (\`div > div:nth-child(3) > button\`, \`//div[3]/div[2]/button\`) is the least stable, breaking on almost any layout change unrelated to the element itself. Selenium doesn't have Playwright's built-in \`getByRole\`, but the same underlying principle — locate by something meaningful and stable, not by brittle structural position — applies just as strongly, and choosing a \`data-testid\` or a well-named class deliberately, specifically to support reliable test automation, is a common, worthwhile practice in real Selenium suites.

A \`WebElement\` returned by \`driver.findElement(...)\` is a **live reference into the current DOM**, not a snapshot of a value — and it can become **stale** (invalid) the moment the DOM it pointed into changes: a page navigation, a re-render triggered by JavaScript, or even the element being removed and an *visually identical* one added back in its place. Attempting to interact with a stale \`WebElement\` throws \`StaleElementReferenceException\` — a genuinely common, real error whose fix is almost never "wrap it in a try/catch and ignore it," but re-locating the element fresh (calling \`findElement\` again) after whatever DOM change occurred, since the old reference is permanently, unrecoverably invalid once the DOM it pointed to has changed underneath it.`,
    example: {
      language: "javascript",
      description:
        "Modeling By-strategy stability ranking and WebElement staleness as data, mirroring the real reasoning behind both.",
      code: `function locatorStabilityScore(strategy) {
  const scores = { id: 4, cssMeaningful: 3, cssStructural: 1, xpathStructural: 1 };
  return scores[strategy] ?? 2; // most other strategies land in a reasonable middle
}
console.log(locatorStabilityScore("id") > locatorStabilityScore("cssStructural")); // true

class FakeWebElement {
  constructor(domVersion) { this.domVersionAtCreation = domVersion; }
  isStale(currentDomVersion) { return this.domVersionAtCreation !== currentDomVersion; }
}

let domVersion = 1;
const element = new FakeWebElement(domVersion);
console.log(element.isStale(domVersion)); // false -- DOM hasn't changed since this reference was created

domVersion = 2; // simulates a re-render / navigation changing the DOM
console.log(element.isStale(domVersion)); // true -- this exact reference is now permanently invalid`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Create a NEW FakeWebElement after the DOM version changes, and confirm the fresh reference is not stale.",
      code: `class FakeWebElement {
  constructor(domVersion) { this.domVersionAtCreation = domVersion; }
  isStale(currentDomVersion) { return this.domVersionAtCreation !== currentDomVersion; }
}
let domVersion = 1;
const oldElement = new FakeWebElement(domVersion);
domVersion = 2;
console.log(oldElement.isStale(domVersion));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write chooseByStrategy(elementDescription) modeling locator-strategy selection: return 'id' if elementDescription.hasStableId is true; else 'cssSelector' if elementDescription.hasMeaningfulClass is true; else 'xpath' if elementDescription.needsParentTraversal is true; else 'cssSelector' as a reasonable fallback.",
      starterCode: `function chooseByStrategy(elementDescription) {
  // TODO
}
`,
      solutionCode: `function chooseByStrategy(elementDescription) {
  if (elementDescription.hasStableId) return "id";
  if (elementDescription.hasMeaningfulClass) return "cssSelector";
  if (elementDescription.needsParentTraversal) return "xpath";
  return "cssSelector";
}`,
      harness: `
        try { window.__report('t1', chooseByStrategy({hasStableId:true}) === "id", 'a stable id should be preferred first'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', chooseByStrategy({hasStableId:false, hasMeaningfulClass:true}) === "cssSelector", 'a meaningful class should use cssSelector when no id exists'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', chooseByStrategy({hasStableId:false, hasMeaningfulClass:false, needsParentTraversal:true}) === "xpath", 'parent traversal needs XPath, since CSS cannot select upward'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "prefers a stable id first" },
        { id: "t2", description: "falls back to cssSelector for a meaningful class" },
        { id: "t3", description: "chooses xpath specifically when parent traversal is needed" },
      ],
      hints: [
        "This models a real, deliberate priority order -- not a random choice among equally-valid options.",
        "XPath's unique power (navigating upward) is exactly when it's genuinely the right, necessary tool, not just a fallback for convenience.",
      ],
    },
    independentExercise: {
      id: "sel-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write rankByStability(strategies) sorting an array of strategy strings ('id','cssMeaningful','cssStructural','xpathStructural') from MOST to LEAST stable using this lesson's scores (id:4, cssMeaningful:3, cssStructural:1, xpathStructural:1 -- unrecognized strategies score 2).",
      starterCode: `function rankByStability(strategies) {
  // TODO
  return [];
}
`,
      solutionCode: `function rankByStability(strategies) {
  const scores = { id: 4, cssMeaningful: 3, cssStructural: 1, xpathStructural: 1 };
  const scoreOf = (s) => scores[s] ?? 2;
  return [...strategies].sort((a, b) => scoreOf(b) - scoreOf(a));
}`,
      harness: `
        try {
          const result = rankByStability(["cssStructural","id","cssMeaningful"]);
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["id","cssMeaningful","cssStructural"]), 'should rank from most to least stable'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const input = ["id","cssStructural"];
          rankByStability(input);
          window.__report('t2', JSON.stringify(input) === JSON.stringify(["id","cssStructural"]), 'the original array must not be mutated'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "ranks strategies correctly by stability" },
        { id: "t2", description: "does not mutate the input array" },
      ],
      hints: [
        "Copy the array before sorting to avoid mutating the caller's array.",
        "This is the same ranking logic as the guided exercise, applied to a list instead of a single choice.",
      ],
    },
    commonMistakes: [
      "Reaching for a deep structural XPath expression (`/html/body/div[2]/div[1]/button`) as a first choice -- this is the least stable possible locator, breaking on almost any unrelated layout change.",
      "Storing a WebElement reference and reusing it across a page navigation or a significant DOM update -- the old reference becomes stale (invalid) the instant the DOM it pointed into changes, and interacting with it throws StaleElementReferenceException.",
      "Catching StaleElementReferenceException and silently ignoring it, rather than re-locating the element fresh -- the old reference can never become valid again; the correct fix is always calling findElement again to get a current reference.",
    ],
    quiz: [
      {
        id: "sel-q3-1",
        prompt: "What can XPath do that a CSS selector fundamentally cannot?",
        choices: [
          "XPath cannot select any elements CSS can also select",
          "XPath can navigate UPWARD in the DOM tree (to a parent or ancestor), which CSS selectors have no way to express at all",
          "There is no real difference between the two",
          "CSS selectors are always faster and more powerful than XPath",
        ],
        correctIndex: 1,
        explanation:
          "This is XPath's genuinely unique capability among Selenium's locator strategies: selecting an ancestor or parent based on a descendant's characteristics — CSS selectors, by design, can only select downward/sideways relative to a starting point, never upward.",
      },
      {
        id: "sel-q3-2",
        prompt: "What does it mean for a WebElement reference to become 'stale'?",
        choices: [
          "The element's text content changed",
          "The DOM the reference pointed into has changed (navigation, re-render, removal) since the reference was obtained, making that specific reference permanently invalid",
          "The element is simply not currently visible on screen",
          "Stale elements automatically re-locate themselves",
        ],
        correctIndex: 1,
        explanation:
          "A WebElement is a live pointer into a specific DOM state, not a value — once that underlying DOM changes in a way that invalidates the reference (even if a visually-identical element is added back), the old reference is permanently stale and throws StaleElementReferenceException if used.",
      },
      {
        id: "sel-q3-3",
        prompt: "What is the correct fix when code encounters StaleElementReferenceException?",
        choices: [
          "Catch the exception and ignore it silently",
          "Re-locate the element fresh by calling findElement again -- the old reference can never become valid again",
          "Restart the entire WebDriver session",
          "Add a fixed sleep before every element interaction, permanently",
        ],
        correctIndex: 1,
        explanation:
          "A stale reference is permanently invalid — there's no way to 'refresh' it in place. The only correct fix is obtaining a brand-new reference via a fresh findElement call against the current DOM state.",
      },
    ],
    takeaway:
      "Prefer stable, meaningful locators (id, a purpose-specific class or test attribute) over brittle structural CSS/XPath, reserving XPath specifically for when its unique upward-traversal capability is actually needed — and treat a WebElement as a live, DOM-state-bound reference that must be re-located, never reused, after the DOM it pointed into changes.",
    summary:
      "Selenium's By strategies (id, cssSelector, xpath, and others) trade off stability and power differently — id/meaningful-class locators are most resilient; structural CSS/XPath are least. XPath uniquely supports upward DOM traversal. A WebElement is a live DOM reference that becomes permanently stale after the underlying DOM changes, requiring a fresh findElement call, never a retry of the same reference.",
    nextLessonSlug: "sel-synchronization-waits",
  },
  {
    id: "sel-synchronization-waits",
    slug: "sel-synchronization-waits",
    title: "Synchronization: Implicit, Explicit, and Fluent Waits",
    description:
      "Why Selenium has no automatic auto-waiting the way some newer tools do, and the three deliberate waiting strategies that fill that gap — plus why a fixed Thread.sleep is the wrong tool for all of them.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["sel-element-location"],
    objectives: [
      "Explain why Selenium requires explicit synchronization strategies rather than providing automatic auto-waiting",
      "Use WebDriverWait with ExpectedConditions correctly for a dynamic element",
      "Explain the specific problem with Thread.sleep as a waiting strategy, precisely, not just 'it's bad'",
    ],
    skills: ["selenium", "waits", "synchronization"],
    tech: [{ name: "Selenium WebDriver", version: "4.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Waiting strategies",
        url: "https://www.selenium.dev/documentation/webdriver/waits/",
      },
    ],
    keywords: ["waits", "webdriverwait", "synchronization", "selenium"],
    explanation: `Selenium, unlike some newer browser-automation tools, does **not** automatically retry an action until an element is ready by default — this is a real, honest architectural difference (not a defect), and it's exactly why Selenium's own documentation treats synchronization as a topic you must deliberately handle, not something that happens for free. \`driver.findElement(...)\` looks for an element **once**, immediately — if it's not there yet (a common situation on any page with JavaScript-driven, asynchronous rendering), it throws \`NoSuchElementException\` right away, with no retrying at all.

**Implicit waits** (\`driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10))\`) configure \`findElement\` to poll for up to a set duration before giving up, applied globally for the entire driver session. **Explicit waits** (\`WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));\`) wait for a *specific, named condition* on a *specific* element, and are Selenium's officially recommended approach for anything beyond the simplest cases, precisely because they let each wait state exactly what it's actually waiting for (visible? clickable? text present?) rather than a generic "does it exist yet." **Fluent waits** are explicit waits with additional configuration — a custom polling interval, and specific exceptions to ignore while polling (\`Wait<WebDriver> wait = new FluentWait<>(driver).withTimeout(...).pollingEvery(...).ignoring(NoSuchElementException.class);\`) — useful when you need finer control than a plain explicit wait's defaults provide.

**Mixing implicit and explicit waits in the same test is a genuinely documented, real anti-pattern** — Selenium's own documentation specifically warns against it, because the two can interact in confusing, hard-to-predict ways (an implicit wait can cause an explicit wait's own polling to behave inconsistently). The precise, correct diagnosis of why \`Thread.sleep(5000)\` is the wrong tool, stated exactly rather than vaguely: it **always waits the full fixed duration**, no matter what actually happens — if the element is ready after 200ms, the test still wastes 4.8 unnecessary seconds; if the element genuinely needs 6 seconds, the test fails anyway, having waited the "wrong" fixed amount either way. A wait strategy that polls a real condition (implicit, explicit, or fluent) is both faster on average *and* more reliable, since it reacts to the actual state of the page rather than guessing a fixed duration that's either too short or wastefully too long.`,
    example: {
      language: "javascript",
      description:
        "Modeling the fixed-sleep problem versus a polling wait, quantifying exactly why a fixed sleep is worse in both directions.",
      code: `function fixedSleepCost(actualReadyAtMs, sleepDurationMs) {
  if (actualReadyAtMs > sleepDurationMs) {
    return { outcome: "FAILS", wastedMs: 0, reason: "element wasn't ready before the fixed sleep ended" };
  }
  return { outcome: "passes, but wastefully", wastedMs: sleepDurationMs - actualReadyAtMs };
}

console.log(fixedSleepCost(200, 5000));  // passes, but wastes 4800ms doing nothing
console.log(fixedSleepCost(6000, 5000)); // FAILS -- the element needed more time than the fixed guess allowed

function pollingWaitCost(actualReadyAtMs, pollIntervalMs, timeoutMs) {
  if (actualReadyAtMs > timeoutMs) return { outcome: "FAILS", wastedMs: 0 };
  // rounds up to the next poll interval -- much closer to the real ready time than a fixed guess
  const detectedAtMs = Math.ceil(actualReadyAtMs / pollIntervalMs) * pollIntervalMs;
  return { outcome: "passes", wastedMs: detectedAtMs - actualReadyAtMs };
}
console.log(pollingWaitCost(200, 250, 5000)); // passes, wastes at most ~250ms, not 4800ms`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call fixedSleepCost with actualReadyAtMs exactly equal to sleepDurationMs, and see which branch it takes at the boundary.",
      code: `function fixedSleepCost(actualReadyAtMs, sleepDurationMs) {
  if (actualReadyAtMs > sleepDurationMs) return { outcome: "FAILS" };
  return { outcome: "passes, but wastefully", wastedMs: sleepDurationMs - actualReadyAtMs };
}
console.log(fixedSleepCost(5000, 5000));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write fixedSleepCost(actualReadyAtMs, sleepDurationMs) exactly as modeled: return {outcome:'FAILS'} if actualReadyAtMs > sleepDurationMs, otherwise {outcome:'passes, but wastefully', wastedMs: sleepDurationMs - actualReadyAtMs}.",
      starterCode: `function fixedSleepCost(actualReadyAtMs, sleepDurationMs) {
  // TODO
}
`,
      solutionCode: `function fixedSleepCost(actualReadyAtMs, sleepDurationMs) {
  if (actualReadyAtMs > sleepDurationMs) {
    return { outcome: "FAILS" };
  }
  return { outcome: "passes, but wastefully", wastedMs: sleepDurationMs - actualReadyAtMs };
}`,
      harness: `
        try { window.__report('t1', fixedSleepCost(200, 5000).outcome === "passes, but wastefully" && fixedSleepCost(200, 5000).wastedMs === 4800, 'should compute wasted time correctly when ready early'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', fixedSleepCost(6000, 5000).outcome === "FAILS", 'should fail when the element needs more time than the fixed sleep allows'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "computes wasted time correctly for an early-ready element" },
        { id: "t2", description: "reports failure when the fixed sleep is too short" },
      ],
      hints: [
        "A fixed sleep is wrong in BOTH directions -- too short fails, too long wastes time -- this exercise quantifies both.",
        "This is exactly why a polling-based wait is strictly better: it adapts to the real, actual timing instead of guessing.",
      ],
    },
    independentExercise: {
      id: "sel-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write explicitWaitOutcome(actualReadyAtMs, timeoutMs, pollIntervalMs) modeling WebDriverWait's real polling behavior: if actualReadyAtMs > timeoutMs, return 'TimeoutException'. Otherwise, return the DETECTED time -- the smallest multiple of pollIntervalMs that is >= actualReadyAtMs (modeling that a poll only checks at fixed intervals, so detection can't happen the instant readiness occurs, only at the next poll).",
      starterCode: `function explicitWaitOutcome(actualReadyAtMs, timeoutMs, pollIntervalMs) {
  // TODO
  return null;
}
`,
      solutionCode: `function explicitWaitOutcome(actualReadyAtMs, timeoutMs, pollIntervalMs) {
  if (actualReadyAtMs > timeoutMs) return "TimeoutException";
  return Math.ceil(actualReadyAtMs / pollIntervalMs) * pollIntervalMs;
}`,
      harness: `
        try { window.__report('t1', explicitWaitOutcome(200, 5000, 250) === 250, 'should detect at the next poll interval after readiness'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', explicitWaitOutcome(6000, 5000, 250) === "TimeoutException", 'should time out if the element is never ready within the timeout'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', explicitWaitOutcome(500, 5000, 500) === 500, 'exact multiples of the poll interval should detect at that exact time'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "detects readiness at the next poll interval after the actual ready time",
        },
        {
          id: "t2",
          description: "reports TimeoutException when readiness never occurs within the timeout",
        },
        { id: "t3", description: "handles an exact poll-interval boundary correctly" },
      ],
      hints: [
        "Math.ceil(x / interval) * interval rounds UP to the next multiple -- exactly how polling detection works, since you only find out at the next scheduled check.",
        "This models a real, honest limitation of explicit waits too: detection isn't instantaneous, just far closer to real readiness than a fixed guess.",
      ],
    },
    commonMistakes: [
      "Using Thread.sleep(fixedMs) as a general waiting strategy -- it's wrong in both directions: wastefully slow when the element is ready early, and still fails outright when the element genuinely needs longer than the fixed guess.",
      "Mixing implicit waits and explicit waits in the same test -- Selenium's own documentation specifically warns against this combination, since the two can interact in confusing, hard-to-predict ways.",
      "Using an implicit wait (or a generic explicit wait) when a SPECIFIC condition like elementToBeClickable is what's actually needed -- an element can exist in the DOM (satisfying a generic presence check) while still being genuinely unclickable (covered by an overlay, disabled), and a generic wait won't catch that distinction.",
    ],
    quiz: [
      {
        id: "sel-q4-1",
        prompt:
          "Why does Selenium require deliberate synchronization strategies rather than providing automatic retrying by default?",
        choices: [
          "It's a bug that will eventually be fixed",
          "This is a genuine, documented architectural characteristic: findElement looks once, immediately, with no built-in retry -- explicit synchronization is deliberately the developer's responsibility",
          "Selenium cannot support waiting at all",
          "Only XPath locators require waits; other strategies don't",
        ],
        correctIndex: 1,
        explanation:
          "This is an honest, real architectural difference from some newer automation tools, not an oversight — Selenium's findElement is a one-shot lookup, and the various wait strategies (implicit, explicit, fluent) exist specifically because handling this is left to the test author.",
      },
      {
        id: "sel-q4-2",
        prompt: "Precisely, what is wrong with Thread.sleep(5000) as a waiting strategy?",
        choices: [
          "Nothing; it's a perfectly reliable approach",
          "It always waits the full fixed duration regardless of actual readiness -- wastefully slow if the element is ready early, and it still fails outright if the element genuinely needs longer than the guessed duration",
          "Thread.sleep only works in Java, not other languages",
          "It's too fast, not too slow",
        ],
        correctIndex: 1,
        explanation:
          "A fixed sleep is wrong in both directions simultaneously: it can't adapt to the real, actual timing of the page, so it either wastes time waiting past when the element was genuinely ready, or fails outright if the real wait needed was longer than the fixed guess — a polling-based wait avoids both failure modes.",
      },
      {
        id: "sel-q4-3",
        prompt:
          "Why does Selenium's documentation specifically warn against mixing implicit and explicit waits in the same test?",
        choices: [
          "Mixing them is actually recommended and encouraged",
          "The two can interact in confusing, hard-to-predict ways -- an implicit wait's global polling can interfere with an explicit wait's own timeout behavior",
          "Implicit waits are deprecated and no longer functional",
          "Explicit waits cannot coexist with any other Selenium feature",
        ],
        correctIndex: 1,
        explanation:
          "This is a real, documented gotcha: since an implicit wait applies globally to every findElement call, combining it with an explicit wait's own separate polling can produce unpredictable total wait times that are hard to reason about — sticking to one strategy consistently avoids this.",
      },
    ],
    takeaway:
      "Selenium requires deliberate synchronization since findElement has no built-in retry — explicit waits with specific ExpectedConditions are the recommended default, a fixed Thread.sleep is wrong in both directions (wastefully slow or still-fails), and mixing implicit with explicit waits is a real, documented anti-pattern to avoid.",
    summary:
      "Implicit waits configure a global findElement polling duration; explicit waits (WebDriverWait + ExpectedConditions) wait for a specific, named condition on a specific element and are Selenium's recommended default; fluent waits add custom polling/ignored-exceptions configuration. Thread.sleep is strictly worse than any of these. Mixing implicit and explicit waits is a documented anti-pattern.",
    nextLessonSlug: "sel-forms-dropdowns-alerts",
  },
  {
    id: "sel-forms-dropdowns-alerts",
    slug: "sel-forms-dropdowns-alerts",
    title: "Forms, Dropdowns, and Alerts",
    description:
      "Selenium's Select class for real dropdown semantics, and switching context to handle a native browser alert — both requiring more deliberate handling than a plain click.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["sel-synchronization-waits"],
    objectives: [
      "Use the Select class correctly for a <select> dropdown, choosing the right selection method",
      "Handle a native browser alert/confirm/prompt by switching WebDriver's target",
      "Explain why clicking a dropdown's visible option directly is a fragile alternative to Select",
    ],
    skills: ["selenium", "forms", "dropdowns", "alerts"],
    tech: [{ name: "Selenium WebDriver", version: "4.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Select element",
        url: "https://www.selenium.dev/documentation/webdriver/support_features/select_lists/",
      },
      {
        label: "Selenium docs: Alerts",
        url: "https://www.selenium.dev/documentation/webdriver/interactions/alerts/",
      },
    ],
    keywords: ["forms", "select", "dropdowns", "alerts", "selenium"],
    explanation: `A standard HTML \`<select>\` dropdown has real, specific semantics Selenium models with a dedicated \`Select\` class, not plain \`WebElement\` clicks: \`new Select(driver.findElement(By.id("country"))).selectByVisibleText("Canada")\` selects by the option's displayed text; \`.selectByValue("CA")\` selects by the option's underlying \`value\` attribute (often more stable than display text, which might change for localization or copy reasons while the underlying value stays the same); \`.selectByIndex(2)\` selects positionally. \`Select\` also correctly handles **multi-select** dropdowns (\`isMultiple()\`, and \`selectByVisibleText\` called multiple times adds to the selection rather than replacing it) — behavior that clicking individual \`<option>\` elements directly does not correctly replicate, especially for multi-select.

Interacting with a dropdown by finding and clicking its visible \`<option>\` elements directly (bypassing \`Select\`) is a fragile alternative for a specific, concrete reason: some browsers render a native \`<select>\`'s open dropdown list using OS-level UI that isn't part of the page's regular DOM rendering in the way Selenium can reliably interact with — \`Select\` works around this entirely by manipulating the underlying \`<select>\` element's state directly, through the same DOM API mechanism regardless of how any particular browser happens to render the open dropdown visually.

A native browser **alert**, **confirm**, or **prompt** dialog is not part of the page's DOM at all — it's rendered by the browser itself, outside the page — so \`driver.findElement(...)\` can never find or interact with it; attempting to interact with the page while a native dialog is open typically throws \`UnhandledAlertException\`. Handling one requires **switching WebDriver's target**: \`Alert alert = driver.switchTo().alert();\` gives you a handle specifically to the open dialog, with \`alert.accept()\` (OK), \`alert.dismiss()\` (Cancel), \`alert.getText()\` (read its message), and — for a \`prompt()\` specifically — \`alert.sendKeys(text)\` before \`accept()\` to fill in the response. After handling it, WebDriver's context automatically returns to the main page — there's no explicit "switch back" call needed for alerts specifically, unlike frames (covered later in this course), which do require an explicit switch back.`,
    example: {
      language: "javascript",
      description:
        "Modeling Select's value-vs-text distinction and the alert switchTo() pattern as data, mirroring the real API's structure.",
      code: `class FakeSelectElement {
  constructor(options) { this.options = options; this.selected = null; } // options: [{value, text}]
  selectByValue(value) {
    const match = this.options.find((o) => o.value === value);
    if (!match) throw new Error("no option with value " + value);
    this.selected = match;
  }
  selectByVisibleText(text) {
    const match = this.options.find((o) => o.text === text);
    if (!match) throw new Error("no option with text " + text);
    this.selected = match;
  }
}

const countryDropdown = new FakeSelectElement([{ value: "CA", text: "Canada" }, { value: "US", text: "United States" }]);
countryDropdown.selectByValue("CA");
console.log(countryDropdown.selected); // { value: "CA", text: "Canada" } -- selected by the STABLE value, not display text

function handleAlert(alertPresent, action) {
  if (!alertPresent) throw new Error("no alert is currently open -- switchTo().alert() would fail here");
  return action === "accept" ? "OK clicked" : "Cancel clicked";
}
console.log(handleAlert(true, "accept")); // "OK clicked"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call handleAlert with alertPresent set to false and observe it correctly throw instead of silently doing nothing.",
      code: `function handleAlert(alertPresent, action) {
  if (!alertPresent) throw new Error("no alert is currently open");
  return action === "accept" ? "OK clicked" : "Cancel clicked";
}
console.log(handleAlert(false, "accept"));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Model Select: write class SelectModel with a constructor(options) (options: [{value,text}]) storing options and selected=null, and a method selectByValue(value) that finds the matching option and sets this.selected to it, or throws if no match exists.",
      starterCode: `class SelectModel {
  constructor(options) {
    this.options = options;
    this.selected = null;
  }
  selectByValue(value) {
    // TODO: find the option with this value; set this.selected to it, or throw if not found
  }
}
`,
      solutionCode: `class SelectModel {
  constructor(options) {
    this.options = options;
    this.selected = null;
  }
  selectByValue(value) {
    const match = this.options.find((o) => o.value === value);
    if (!match) throw new Error("no option with value " + value);
    this.selected = match;
  }
}`,
      harness: `
        try {
          const s = new SelectModel([{value:"CA",text:"Canada"},{value:"US",text:"United States"}]);
          s.selectByValue("US");
          window.__report('t1', s.selected.text === "United States", 'should select the correct option by value'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const s = new SelectModel([{value:"CA",text:"Canada"}]);
          let threw = false;
          try { s.selectByValue("FR"); } catch (e) { threw = true; }
          window.__report('t2', threw, 'selecting a non-existent value should throw'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "selects the correct option by value" },
        { id: "t2", description: "throws when selecting a non-existent value" },
      ],
      hints: [
        "Array.prototype.find locates the matching option object directly.",
        "This models exactly why selectByValue is often preferred over selecting by display text -- the value is more likely to stay stable across UI copy changes.",
      ],
    },
    independentExercise: {
      id: "sel-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write selectMultiple(selectModel, values) that calls selectModel.selectByValue for EACH value in values, and ALSO tracks every selection in a NEW array selectModel.allSelected (initialize it if it doesn't exist) -- modeling how a real multi-select adds to the selection rather than replacing it on each call.",
      starterCode: `function selectMultiple(selectModel, values) {
  if (!selectModel.allSelected) selectModel.allSelected = [];
  // TODO: for each value, call selectModel.selectByValue(value), then push selectModel.selected onto allSelected
  return selectModel.allSelected;
}
`,
      solutionCode: `function selectMultiple(selectModel, values) {
  if (!selectModel.allSelected) selectModel.allSelected = [];
  for (const value of values) {
    selectModel.selectByValue(value);
    selectModel.allSelected.push(selectModel.selected);
  }
  return selectModel.allSelected;
}`,
      harness: `
        function makeSelect() {
          const options = [{value:"a",text:"A"},{value:"b",text:"B"},{value:"c",text:"C"}];
          return { options, selected: null, selectByValue(v) { this.selected = this.options.find(o=>o.value===v); } };
        }
        try {
          const s = makeSelect();
          const result = selectMultiple(s, ["a","c"]);
          window.__report('t1', result.length === 2 && result[0].value === "a" && result[1].value === "c", 'should accumulate multiple selections instead of replacing');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const s = makeSelect();
          const result = selectMultiple(s, []);
          window.__report('t2', result.length === 0, 'no values should give no selections'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description:
            "accumulates multiple selections correctly, matching real multi-select behavior",
        },
        { id: "t2", description: "handles an empty values list" },
      ],
      hints: [
        "The key insight: calling selectByValue multiple times must ADD to allSelected, not overwrite it -- this is exactly what distinguishes real multi-select behavior.",
        "Initialize allSelected only if it doesn't already exist, so repeated calls to selectMultiple don't lose previous accumulation.",
      ],
    },
    commonMistakes: [
      "Finding and clicking a dropdown's <option> elements directly instead of using the Select class -- some browsers render an open native dropdown using OS-level UI Selenium can't reliably interact with this way; Select works around this by manipulating the underlying element's state directly.",
      "Selecting by visible text when the underlying value is what's actually stable -- display text can change for localization or copy reasons while the value attribute stays the same; selectByValue is often the more resilient choice.",
      "Trying to findElement() while a native alert is open -- this throws UnhandledAlertException; the alert must be switched to and handled (accepted or dismissed) before any other page interaction can proceed.",
    ],
    quiz: [
      {
        id: "sel-q5-1",
        prompt:
          "Why does Selenium provide a dedicated Select class instead of just clicking a dropdown's visible <option> elements?",
        choices: [
          "Select is purely a convenience wrapper with no functional difference",
          "Some browsers render an open native <select> dropdown using OS-level UI that isn't reliably clickable the normal way; Select manipulates the underlying element's state directly, working correctly regardless of how any browser visually renders the open list",
          "Clicking <option> elements is actually the recommended approach",
          "Select only works for single-choice dropdowns, never multi-select",
        ],
        correctIndex: 1,
        explanation:
          "Native <select> dropdowns can be rendered by the browser using platform-level UI outside the page's normal DOM rendering — Select sidesteps this entirely by working through the underlying element's real state, which is exactly why it's reliable across browsers where direct option-clicking may not be.",
      },
      {
        id: "sel-q5-2",
        prompt:
          "Why might selectByValue be preferred over selectByVisibleText for a country dropdown?",
        choices: [
          "selectByValue is always faster",
          "The underlying value (e.g. a country code) is often more stable across UI/localization changes than the displayed text, which might change for copy or translation reasons while the value stays the same",
          "selectByVisibleText does not actually work in Selenium",
          "There's no meaningful difference between the two",
        ],
        correctIndex: 1,
        explanation:
          "Display text is more likely to change for reasons unrelated to the underlying data (rewording, translation, formatting), while a value attribute like a country code tends to remain a stable identifier — selecting by value ties the test to the more durable piece of information.",
      },
      {
        id: "sel-q5-3",
        prompt:
          "What happens if code calls driver.findElement(...) while a native browser alert is currently open?",
        choices: [
          "It works normally, ignoring the alert",
          "It throws UnhandledAlertException -- the alert isn't part of the page's DOM and must be handled via switchTo().alert() before other page interaction can proceed",
          "It automatically dismisses the alert first",
          "Native alerts do not block any other WebDriver commands",
        ],
        correctIndex: 1,
        explanation:
          "A native alert/confirm/prompt is rendered by the browser itself, outside the page's DOM entirely, and typically blocks other interaction with the page until it's addressed — attempting to find elements while it's open throws UnhandledAlertException, requiring switchTo().alert() to handle it first.",
      },
    ],
    takeaway:
      "Use the Select class for real <select> dropdown semantics rather than clicking options directly, prefer selectByValue when the underlying value is more stable than display text, and handle native alerts by explicitly switching WebDriver's target to them before any other page interaction can proceed.",
    summary:
      "Select's selectByValue/selectByVisibleText/selectByIndex correctly handle single and multi-select dropdowns through the underlying element's state, avoiding browser-specific rendering issues with direct option-clicking. Native alerts aren't part of the page DOM; driver.switchTo().alert() is required to accept(), dismiss(), getText(), or sendKeys() to a prompt before other page interaction can resume.",
    nextLessonSlug: "sel-frames-windows-actions",
  },
  {
    id: "sel-frames-windows-actions",
    slug: "sel-frames-windows-actions",
    title: "Frames, Windows and Tabs, and the Actions API",
    description:
      "Explicitly switching WebDriver's focus between frames and windows — unlike a browser tab a human just looks at — plus the Actions API for interactions a plain click can't express.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["sel-forms-dropdowns-alerts"],
    objectives: [
      "Switch WebDriver's focus into and out of an iframe correctly",
      "Handle a new window or tab opened from an existing one, including switching back",
      "Use the Actions API to build a multi-step interaction like hover-then-click or drag-and-drop",
    ],
    skills: ["selenium", "frames", "windows", "actions-api"],
    tech: [{ name: "Selenium WebDriver", version: "4.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Working with frames",
        url: "https://www.selenium.dev/documentation/webdriver/interactions/frames/",
      },
      {
        label: "Selenium docs: Windows and tabs",
        url: "https://www.selenium.dev/documentation/webdriver/interactions/windows/",
      },
      {
        label: "Selenium docs: The Actions API",
        url: "https://www.selenium.dev/documentation/webdriver/actions_api/",
      },
    ],
    keywords: ["frames", "windows", "tabs", "actions api", "selenium"],
    explanation: `WebDriver has a single, explicit **focus** at any moment — the main page, or one specific frame — and \`findElement\` only ever searches within whatever currently has focus. \`driver.switchTo().frame("payment-frame")\` (by name, index, or a located \`WebElement\`) moves focus into that iframe's own document; elements inside it become findable only after this switch. **Critically, unlike a native alert (previous lesson), switching into a frame requires an explicit switch back**: \`driver.switchTo().defaultContent()\` returns focus to the main page — forgetting this is a common, real bug where code that should target the main page silently fails to find anything, because WebDriver's focus is still inside the frame from an earlier interaction.

A new **window or tab** (opened by a link with \`target="_blank"\` or a \`window.open()\` call) does not automatically become WebDriver's focus — the original window remains focused until you explicitly switch: \`String originalWindow = driver.getWindowHandle(); // ... trigger the action that opens a new window ... for (String handle : driver.getWindowHandles()) { if (!handle.equals(originalWindow)) driver.switchTo().window(handle); }\` is the standard pattern — capture the original handle *before* triggering the new window, then iterate \`getWindowHandles()\` (a \`Set<String>\`, unordered) to find the one that's new. This has a genuine race-condition risk similar to popup-capture in other automation tools: the new window may not exist yet at the instant \`getWindowHandles()\` is first called, which is exactly why this pattern is often combined with a wait for the handle count to actually increase before searching for the new one.

The **Actions API** (\`new Actions(driver).moveToElement(menuItem).click(subMenuItem).perform()\`) builds a sequence of low-level input events — mouse moves, clicks, key presses — composed together and executed as one coordinated interaction via a single \`.perform()\` call. This is the correct, honest tool for interactions a plain \`.click()\` genuinely cannot express: hovering to reveal a dropdown menu before clicking an item inside it, drag-and-drop (\`.dragAndDrop(source, target)\`), or a multi-key combination (\`.keyDown(Keys.SHIFT).click(element).keyUp(Keys.SHIFT)\`). Calling \`.perform()\` is what actually executes the whole built-up sequence — building an \`Actions\` chain without eventually calling \`.perform()\` does nothing at all, a real, easy-to-miss mistake.`,
    example: {
      language: "javascript",
      description:
        "Modeling the explicit-focus model for frames/windows and an Actions-style chained sequence, as data.",
      code: `class FakeDriverFocus {
  constructor() { this.focus = "main"; this.windowHandles = new Set(["main"]); }
  switchToFrame(frameId) { this.focus = "frame:" + frameId; }
  switchToDefaultContent() { this.focus = "main"; }
  openNewWindow(handle) { this.windowHandles.add(handle); } // does NOT change focus automatically
  switchToWindow(handle) { this.focus = handle; }
}

const driver = new FakeDriverFocus();
driver.switchToFrame("payment");
console.log(driver.focus); // "frame:payment"
driver.switchToDefaultContent(); // MUST switch back explicitly
console.log(driver.focus); // "main"

driver.openNewWindow("popup-1");
console.log(driver.focus); // still "main" -- opening a window does not switch focus automatically
driver.switchToWindow("popup-1");
console.log(driver.focus); // "popup-1" -- now genuinely focused there

// Actions-style: a sequence of steps, only executed together when "performed."
function buildAndPerform(steps) {
  return steps.map((s) => "executed: " + s).join(" -> "); // models .perform() running the whole chain
}
console.log(buildAndPerform(["moveTo(menu)", "click(subMenuItem)"]));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Open a second new window without switching to it, and confirm focus correctly stays on 'main'.",
      code: `class FakeDriverFocus {
  constructor() { this.focus = "main"; this.windowHandles = new Set(["main"]); }
  openNewWindow(handle) { this.windowHandles.add(handle); }
}
const driver = new FakeDriverFocus();
driver.openNewWindow("popup-1");
console.log(driver.focus);`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write findNewWindowHandle(handlesBefore, handlesAfter) modeling the real 'find the new window' pattern: handlesBefore and handlesAfter are arrays of handle strings. Return the handle present in handlesAfter but NOT in handlesBefore, or null if none (or more than one -- an ambiguous case) is found.",
      starterCode: `function findNewWindowHandle(handlesBefore, handlesAfter) {
  // TODO: find handles in 'after' that are not in 'before'; return the single new one, or null if 0 or 2+
  return null;
}
`,
      solutionCode: `function findNewWindowHandle(handlesBefore, handlesAfter) {
  const beforeSet = new Set(handlesBefore);
  const newHandles = handlesAfter.filter((h) => !beforeSet.has(h));
  return newHandles.length === 1 ? newHandles[0] : null;
}`,
      harness: `
        try { window.__report('t1', findNewWindowHandle(["main"], ["main","popup-1"]) === "popup-1", 'should find the single new window handle'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', findNewWindowHandle(["main"], ["main"]) === null, 'no new window should return null'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', findNewWindowHandle(["main"], ["main","p1","p2"]) === null, 'more than one new window is ambiguous and should return null'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds the single new window handle" },
        { id: "t2", description: "returns null when no new window appeared" },
        {
          id: "t3",
          description: "returns null when the result is ambiguous (multiple new handles)",
        },
      ],
      hints: [
        "A Set makes membership checks O(1) instead of scanning the array repeatedly.",
        "This models the real, standard pattern: capture handles before, trigger the action, capture handles after, diff them.",
      ],
    },
    independentExercise: {
      id: "sel-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write buildActionsChain(steps) that returns steps joined with ' -> ' ONLY if the last step is 'perform' (modeling that a chain does nothing until .perform() is actually called); otherwise return 'NOT EXECUTED (missing perform())'.",
      starterCode: `function buildActionsChain(steps) {
  // TODO
}
`,
      solutionCode: `function buildActionsChain(steps) {
  if (steps[steps.length - 1] !== "perform") {
    return "NOT EXECUTED (missing perform())";
  }
  return steps.join(" -> ");
}`,
      harness: `
        try { window.__report('t1', buildActionsChain(["moveToElement(menu)","click(item)","perform"]) === "moveToElement(menu) -> click(item) -> perform", 'a chain ending in perform should execute'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', buildActionsChain(["moveToElement(menu)","click(item)"]) === "NOT EXECUTED (missing perform())", 'a chain missing perform() should not execute'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a chain ending in perform() executes correctly" },
        {
          id: "t2",
          description:
            "a chain missing perform() does not execute, modeling the real bug this causes",
        },
      ],
      hints: [
        "This models a genuinely common, real mistake: building an Actions sequence but forgetting to call .perform() at the end.",
        "Checking the last element of the array is enough to model this correctly.",
      ],
    },
    guidedLocalLab: {
      id: "sel-gll-multipage-workflow",
      title: "Automate a Realistic Multi-Page Workflow Using Explicit Waits",
      scenario:
        "Build a real Selenium test automating a multi-step workflow across at least two real pages, combining explicit waits, stable locators, and correct window/frame handling if applicable to your chosen site.",
      requiredTools: [
        { name: "JDK", version: "21 LTS or newer" },
        { name: "Apache Maven", version: "3.9+" },
        { name: "Selenium WebDriver", version: "4.x" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        "Continue from the selenium-learning-lab project created in this course's first guided local lab.",
        "Pick a real, publicly-accessible site with at least a two-step flow you're comfortable automating for practice (a search-then-click-a-result flow works well and is broadly available).",
      ],
      projectStructure: `selenium-learning-lab/
  pom.xml
  src/
    test/java/com/visaspark/selenium/
      MultiPageWorkflowTest.java`,
      starterFiles: [
        {
          path: "src/test/java/com/visaspark/selenium/MultiPageWorkflowTest.java",
          content: `package com.visaspark.selenium;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.*;

class MultiPageWorkflowTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setup() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterEach
    void teardown() {
        driver.quit();
    }

    @Test
    void searchThenNavigateToAResult() {
        // TODO: navigate to your chosen site's starting page
        // TODO: use an EXPLICIT wait (wait.until(ExpectedConditions...)) before interacting
        //       with the search input -- do not use Thread.sleep
        // TODO: perform a search action
        // TODO: wait for and click a real result link
        // TODO: assert something about the resulting second page (title, a visible heading, or the URL)
    }
}
`,
        },
      ],
      requirements: [
        "The test uses at least one explicit WebDriverWait with a specific ExpectedConditions call — no Thread.sleep anywhere.",
        "The test genuinely navigates across at least two distinct real pages/URLs.",
        "Locators use id, name, or cssSelector targeting meaningful attributes — no deep structural XPath.",
        "@BeforeEach/@AfterEach correctly create and tear down a fresh driver per test.",
        "The final assertion verifies something real and specific about the second page reached.",
      ],
      commands: [
        { description: "Run the workflow test", command: "mvn test -Dtest=MultiPageWorkflowTest" },
      ],
      expectedBehavior:
        "Running the test launches a real browser, performs the multi-step workflow with each step correctly waiting for real readiness (never a fixed sleep), navigates across at least two real pages, and passes with a specific, correct final assertion.",
      verificationSteps: [
        {
          command: "mvn test -Dtest=MultiPageWorkflowTest",
          expectedResult:
            "BUILD SUCCESS; the browser is observed navigating across at least two distinct real pages during the run",
        },
        {
          command:
            "grep -n Thread.sleep src/test/java/com/visaspark/selenium/MultiPageWorkflowTest.java",
          expectedResult: "No output — confirms no fixed sleep was used anywhere in the test",
        },
      ],
      troubleshooting: [
        {
          issue: "`TimeoutException: Expected condition failed`",
          fix: "Confirm the ExpectedConditions call matches an element that genuinely appears on the real page you're testing against — inspect the real page's HTML to confirm your locator strategy is correct.",
        },
        {
          issue: "The test clicks the wrong result or a stale element",
          fix: "Re-locate elements freshly after any page transition rather than reusing a WebElement reference obtained on the previous page — see this course's element-location lesson on staleness.",
        },
        {
          issue: "Test passes locally but is flaky in repeated runs",
          fix: "Confirm every interaction is preceded by an appropriate explicit wait (elementToBeClickable for things you click, visibilityOfElementLocated for things you just need to see) — a passing-but-flaky test often has one un-waited-for interaction.",
        },
      ],
      hints: [
        'wait.until(ExpectedConditions.elementToBeClickable(By.id("search"))) is the correct explicit-wait pattern before clicking or typing into an element.',
        "Capturing driver.getCurrentUrl() or driver.getTitle() after the final navigation gives you a concrete, specific thing to assert against.",
        "This lab deliberately reuses the @BeforeEach/@AfterEach lifecycle pattern from an earlier lesson -- notice how it removes the need for manual try/finally in the test body itself.",
      ],
      referenceSolution: {
        summary:
          "The test navigates to a starting page, waits explicitly for a search input to be clickable, performs a search, waits for and clicks a result link, and asserts a specific fact about the resulting second page — with zero Thread.sleep calls anywhere.",
        files: [
          {
            path: "src/test/java/com/visaspark/selenium/MultiPageWorkflowTest.java",
            content: `package com.visaspark.selenium;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.*;

class MultiPageWorkflowTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setup() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterEach
    void teardown() {
        driver.quit();
    }

    @Test
    void searchThenNavigateToAResult() {
        driver.get("https://www.selenium.dev");
        WebElement searchLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.cssSelector("a[href*='documentation']")));
        searchLink.click();

        wait.until(ExpectedConditions.urlContains("documentation"));
        assertTrue(driver.getCurrentUrl().contains("documentation"));
    }
}
`,
          },
        ],
      },
      extensionChallenge:
        'Extend the test to open a link that opens in a new tab (target="_blank"), switch WebDriver\'s focus to that new window using the getWindowHandles() diffing pattern from this lesson, assert something on it, then explicitly switch back to the original window handle.',
    },
    commonMistakes: [
      "Forgetting to switch back to default content after finishing work inside a frame -- subsequent findElement calls intended for the main page silently fail to find anything, because WebDriver's focus is still inside the frame.",
      "Assuming a newly-opened window automatically becomes WebDriver's focus -- it doesn't; the original window stays focused until you explicitly call switchTo().window(handle) with the new handle.",
      "Building an Actions chain (moveToElement/click/keyDown/etc.) and forgetting the final .perform() call -- without it, none of the built-up sequence actually executes at all.",
    ],
    quiz: [
      {
        id: "sel-q6-1",
        prompt:
          "After finishing an interaction inside an iframe via switchTo().frame(...), what must happen before interacting with the main page again?",
        choices: [
          "Nothing -- WebDriver automatically returns focus to the main page",
          "An explicit driver.switchTo().defaultContent() call is required to return focus to the main page",
          "The driver must be restarted entirely",
          "Frames automatically expire after one interaction",
        ],
        correctIndex: 1,
        explanation:
          "Unlike native alerts (which return focus automatically after being handled), a frame switch persists until explicitly undone — forgetting switchTo().defaultContent() is a real, common bug where main-page findElement calls silently fail because focus never left the frame.",
      },
      {
        id: "sel-q6-2",
        prompt:
          "Does WebDriver automatically switch focus to a newly-opened browser window or tab?",
        choices: [
          "Yes, automatically",
          "No -- the original window remains focused until you explicitly find the new window's handle and call switchTo().window(handle)",
          "Only if the new window is opened via window.open(), not a link",
          "Only in headless mode",
        ],
        correctIndex: 1,
        explanation:
          "Opening a new window or tab does not change WebDriver's focus on its own — the standard pattern captures the set of window handles before the action, triggers it, then diffs the handle sets afterward to find and explicitly switch to the new one.",
      },
      {
        id: "sel-q6-3",
        prompt:
          "What happens if an Actions chain is built (moveToElement, click, etc.) but .perform() is never called?",
        choices: [
          "The actions execute automatically after a short delay",
          "Nothing executes at all -- .perform() is what actually runs the entire built-up sequence",
          "Only the first action in the chain executes",
          "This throws a compile error",
        ],
        correctIndex: 1,
        explanation:
          "Building an Actions chain only constructs a description of the intended sequence — none of it actually happens in the real browser until .perform() is called, making a missing .perform() a genuine, silent, easy-to-miss bug.",
      },
    ],
    takeaway:
      "WebDriver's focus is explicit and singular — switching into a frame or a new window requires an explicit switch, and (unlike alerts) switching out of a frame requires an explicit switch back too; the Actions API builds a sequence that does nothing at all until .perform() actually executes it.",
    summary:
      "switchTo().frame(...) moves focus into an iframe; switchTo().defaultContent() must explicitly return it. A new window/tab doesn't auto-focus; find its handle via getWindowHandles() diffing and switchTo().window(handle). The Actions API chains low-level interactions (hover, drag-and-drop, key combinations) that only execute when .perform() is called.",
    nextLessonSlug: "sel-uploads-cookies-screenshots",
  },
  {
    id: "sel-uploads-cookies-screenshots",
    slug: "sel-uploads-cookies-screenshots",
    title: "File Upload, Cookies, and Screenshots",
    description:
      "Uploading a real local file without a native OS dialog, reading and setting cookies directly, and capturing a screenshot for evidence — plus JavaScript execution's honest limits.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["sel-frames-windows-actions"],
    objectives: [
      "Upload a file to a standard <input type='file'> without any OS-level file picker",
      "Read and set cookies directly through WebDriver's cookie management API",
      "Explain the honest limitation of driver.executeScript for verifying real user-facing behavior",
    ],
    skills: ["selenium", "file-upload", "cookies", "screenshots"],
    tech: [{ name: "Selenium WebDriver", version: "4.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: File upload",
        url: "https://www.selenium.dev/documentation/webdriver/interactions/#file-upload",
      },
      {
        label: "Selenium docs: Cookies",
        url: "https://www.selenium.dev/documentation/webdriver/interactions/cookies/",
      },
    ],
    keywords: ["file upload", "cookies", "screenshots", "javascript execution", "selenium"],
    explanation: `Uploading a file with Selenium does **not** involve automating a native OS file-picker dialog at all — that dialog exists entirely outside the browser's DOM, in OS-level UI Selenium (and browser automation generally) cannot reach. Instead, \`driver.findElement(By.cssSelector("input[type='file']")).sendKeys("/absolute/path/to/file.txt")\` sets the file input's value **directly**, exactly as if a real file had been chosen — the browser handles the rest identically either way. This requires an **absolute path** to a real, existing local file (a relative path or a non-existent file silently fails or behaves unpredictably depending on the browser), which is worth stating precisely rather than leaving as a vague gotcha.

**Cookies** are readable and settable directly through WebDriver's cookie API, independent of any UI interaction: \`driver.manage().getCookies()\` returns every cookie for the current domain; \`driver.manage().addCookie(new Cookie("session", "abc123"))\` sets one directly; \`driver.manage().deleteAllCookies()\` clears them. This is genuinely useful for **fast test setup** — establishing a signed-in-looking state by setting a session cookie directly, when the application's cookie-based session mechanism allows it, is dramatically faster than clicking through a real login form for every single test, the same principle behind Playwright's \`storageState\` if you've encountered that pattern elsewhere, expressed through Selenium's own direct cookie API instead.

**Screenshots** (\`((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE)\`) capture the current viewport (or, with some driver/browser combinations, the full scrollable page) as evidence — most valuable captured automatically on test failure via a JUnit extension or \`@AfterEach\` hook checking the test's outcome, exactly the same principle as this course's earlier lesson on driver lifecycle. \`driver.executeScript(...)\` runs arbitrary JavaScript directly in the browser's page context, and it's a genuinely powerful escape hatch — but it comes with an **honest limitation** worth stating clearly: a value read via \`executeScript\` (checking a JavaScript variable, or reading \`element.value\` directly from the DOM) can diverge from what a **real user actually experiences**, since \`executeScript\` bypasses the same actionability/visibility checks a genuine click or keystroke goes through — a script-based check can report an element's value as "set" even if that element is actually hidden, disabled, or covered by an overlay a real user could never have interacted with. Using \`executeScript\` as a *shortcut* to skip real interaction, rather than for its legitimate, narrower use (scrolling, reading page-level state not reachable through the standard API) is a common way to accidentally test something other than genuine user-facing behavior.`,
    example: {
      language: "javascript",
      description:
        "Modeling direct file-input assignment (no OS dialog) and the executeScript honesty gap, as data.",
      code: `function uploadViaSendKeys(inputElement, absolutePath) {
  const looksAbsolute = absolutePath.startsWith("/") || /^[A-Za-z]:/.test(absolutePath);
  if (!looksAbsolute) {
    throw new Error("an absolute path is required -- relative paths behave unpredictably");
  }
  inputElement.value = absolutePath; // sets the file input directly -- no native OS dialog involved
  return "uploaded: " + absolutePath;
}
console.log(uploadViaSendKeys({}, "/home/user/resume.pdf")); // "uploaded: /home/user/resume.pdf"

function checksRealUserVisibility(method) {
  // executeScript bypasses the same actionability checks a real click/keystroke goes through.
  return method !== "executeScript";
}
console.log(checksRealUserVisibility("click"));         // true -- a real click checks visibility/enabled/etc.
console.log(checksRealUserVisibility("executeScript"));  // false -- can report state a real user could never have set`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call uploadViaSendKeys with a RELATIVE path (e.g. 'resume.pdf') and confirm it correctly throws.",
      code: `function uploadViaSendKeys(inputElement, absolutePath) {
  const looksAbsolute = absolutePath.startsWith("/") || /^[A-Za-z]:/.test(absolutePath);
  if (!looksAbsolute) {
    throw new Error("an absolute path is required");
  }
  inputElement.value = absolutePath;
  return "uploaded: " + absolutePath;
}
console.log(uploadViaSendKeys({}, "resume.pdf"));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write buildCookie(name, value, domain) returning an object {name, value, domain} -- modeling new Cookie(name, value) with a domain set. Then write hasSessionCookie(cookies, cookieName) returning true if any cookie in the array has that exact name.",
      starterCode: `function buildCookie(name, value, domain) {
  // TODO
}
function hasSessionCookie(cookies, cookieName) {
  // TODO
}
`,
      solutionCode: `function buildCookie(name, value, domain) {
  return { name, value, domain };
}
function hasSessionCookie(cookies, cookieName) {
  return cookies.some((c) => c.name === cookieName);
}`,
      harness: `
        try {
          const c = buildCookie("session", "abc123", "example.com");
          window.__report('t1', c.name === "session" && c.value === "abc123" && c.domain === "example.com", 'should build a correct cookie object'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const cookies = [buildCookie("session", "abc", "x.com"), buildCookie("theme", "dark", "x.com")];
          window.__report('t2', hasSessionCookie(cookies, "session") === true, 'should find an existing cookie by name'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          window.__report('t3', hasSessionCookie([], "session") === false, 'an empty cookie list should not have any named cookie'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "builds a correct cookie object" },
        { id: "t2", description: "finds an existing cookie by name" },
        { id: "t3", description: "correctly reports no match for an empty cookie list" },
      ],
      hints: [
        "This directly mirrors new Cookie(name, value) plus WebDriver's cookie domain handling.",
        "Array.prototype.some is the right tool for an existence check.",
      ],
    },
    independentExercise: {
      id: "sel-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isTrustworthyCheck(method) modeling this lesson's honesty distinction: return true for 'click', 'sendKeys', or 'isDisplayed' (real interaction/visibility checks going through actionability), false for 'executeScript' (bypasses those checks -- can report state a real user could never have produced).",
      starterCode: `function isTrustworthyCheck(method) {
  // TODO
}
`,
      solutionCode: `function isTrustworthyCheck(method) {
  return ["click", "sendKeys", "isDisplayed"].includes(method);
}`,
      harness: `
        try { window.__report('t1', isTrustworthyCheck("click") === true, 'a real click should be trustworthy'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isTrustworthyCheck("isDisplayed") === true, 'a real visibility check should be trustworthy'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isTrustworthyCheck("executeScript") === false, 'executeScript bypasses real actionability checks and should not be treated as equally trustworthy'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "recognizes a real click as trustworthy" },
        { id: "t2", description: "recognizes a real visibility check as trustworthy" },
        {
          id: "t3",
          description:
            "recognizes executeScript as not equally trustworthy for user-facing verification",
        },
      ],
      hints: [
        "This models the honest limitation from the explanation: executeScript can report state a real user interaction could never have produced.",
        "Array.prototype.includes on a small, fixed set is the cleanest way to express this.",
      ],
    },
    commonMistakes: [
      "Trying to automate a native OS file-picker dialog -- Selenium cannot reach OS-level UI at all; sendKeys(absolutePath) on the file input directly is the correct, and only, approach.",
      "Using a relative file path with sendKeys for file upload -- this behaves unpredictably across browsers/OSes; always use a real, absolute path to a file that genuinely exists.",
      "Using executeScript to check or set a value as a shortcut, then treating that as proof a real user could achieve the same result -- executeScript bypasses the same actionability checks a real click or keystroke goes through, so it can report state a real user interaction could never have produced.",
    ],
    quiz: [
      {
        id: "sel-q7-1",
        prompt: "How does sendKeys(absolutePath) on an <input type='file'> element actually work?",
        choices: [
          "It opens and automates the real native OS file-picker dialog",
          "It sets the file input's value directly, exactly as if a file had been chosen -- no native OS dialog is ever opened or involved",
          "It requires a special browser extension to function",
          "File upload cannot be automated with Selenium at all",
        ],
        correctIndex: 1,
        explanation:
          "Selenium (like browser automation generally) cannot reach OS-level UI such as a native file picker — sendKeys works around this entirely by setting the file input element's value directly, which the browser treats identically to a real file selection.",
      },
      {
        id: "sel-q7-2",
        prompt:
          "Why is directly setting a session cookie via driver.manage().addCookie(...) often faster than logging in through the UI for every test?",
        choices: [
          "It isn't faster; both approaches take the same amount of time",
          "It skips the entire login form interaction, establishing a signed-in-looking state directly through the cookie mechanism the application already uses, when that's a valid substitute for the test's actual purpose",
          "Cookies cannot be set any other way",
          "This approach only works in Firefox",
        ],
        correctIndex: 1,
        explanation:
          "When a test's actual subject has nothing to do with the login flow itself, setting the relevant session cookie directly reaches the same starting state as a full UI login, without paying the cost (and added failure surface) of clicking through the login form every single time.",
      },
      {
        id: "sel-q7-3",
        prompt:
          "What is the honest limitation of using driver.executeScript(...) to verify an element's value or visibility?",
        choices: [
          "executeScript is always slower than a normal check",
          "It bypasses the same actionability/visibility checks a real click or keystroke goes through, so it can report a value as 'set' or an element as 'fine' even if a real user could never actually have interacted with it (hidden, disabled, covered by an overlay)",
          "executeScript cannot read any values from the page",
          "There is no real limitation; executeScript is equally trustworthy as any other check",
        ],
        correctIndex: 1,
        explanation:
          "executeScript runs arbitrary JavaScript directly, with no actionability checks at all — a script can read or set a DOM value regardless of whether that element is genuinely visible, enabled, or reachable by a real user, which is exactly why using it as a shortcut for real interaction can silently test something other than actual user-facing behavior.",
      },
    ],
    takeaway:
      "File upload sets the file input directly with no native OS dialog involved, requiring a real absolute path; cookies can be read/set directly for fast test setup; and executeScript, while a powerful escape hatch, bypasses real actionability checks, so using it as a shortcut for genuine interaction can report success a real user could never actually achieve.",
    summary:
      "sendKeys(absolutePath) on a file input uploads directly, no OS dialog involved -- the path must be absolute and real. Cookies are readable/settable directly via driver.manage(), useful for fast test setup. Screenshots capture evidence, ideally automatically on failure. executeScript bypasses real actionability checks, making it an honest but limited tool for verifying genuine user-facing behavior.",
    nextLessonSlug: "sel-page-objects",
  },
  {
    id: "sel-page-objects",
    slug: "sel-page-objects",
    title: "Page Objects, Component Objects, and Test Data",
    description:
      "Structuring a growing Selenium suite around page objects and smaller component objects, and designing test data with the same isolation discipline every real automation tool needs.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 7,
    difficulty: "advanced",
    estimatedMinutes: 21,
    prerequisites: ["sel-uploads-cookies-screenshots"],
    objectives: [
      "Design a page object class encapsulating one page's locators and actions",
      "Extract a repeated UI fragment into a component object shared across multiple page objects",
      "Design test data that avoids collisions between tests",
    ],
    skills: ["selenium", "page-objects", "test-data"],
    tech: [{ name: "Selenium WebDriver", version: "4.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Page Object Models",
        url: "https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/",
      },
    ],
    keywords: ["page objects", "component objects", "test data", "selenium"],
    explanation: `A **page object** in Selenium follows the same core principle as in any browser-automation tool: a class encapsulating one page's locators and the actions available on it, so tests read as intent rather than raw Selenium calls. \`class LoginPage { private WebDriver driver; private By usernameField = By.id("username"); public LoginPage(WebDriver driver) { this.driver = driver; } public DashboardPage signIn(String user, String pass) { driver.findElement(usernameField).sendKeys(user); ... return new DashboardPage(driver); } }\` — note the **return type**: a well-designed Selenium page object's action methods often return the *next* page object the action navigates to, letting a test chain calls in a way that mirrors the real navigation flow: \`DashboardPage dashboard = new LoginPage(driver).signIn(user, pass);\`.

A **component object** applies the identical principle to a UI fragment that's **reused across multiple, different pages** — a navigation header, a search bar, a modal dialog — rather than one whole page: \`class SearchBarComponent { private WebElement root; ... public SearchBarComponent(WebElement root) { this.root = root; } public void search(String query) { root.findElement(By.cssSelector("input")).sendKeys(query); ... } }\`, constructed from a \`WebElement\` representing that fragment's root, and usable from any page object that contains it, without duplicating the search bar's locators and interaction logic in every page that happens to include it. This is exactly the same "genuine reuse earns the structure" principle covered for browser-automation page objects generally: a component object pays for itself specifically because multiple page objects share it, not automatically for any repeated element.

**Test data design** for Selenium suites needs the identical discipline covered for browser-automation tools generally, for the identical underlying reason: tests running in parallel (JUnit supports this too, covered later in this course) or repeatedly over time must not collide on shared, hard-coded data. Generating a unique value per test run — combining a timestamp with a random or incrementing suffix for a test account's email, or using \`UUID.randomUUID()\` — avoids two tests both trying to register the exact same account and one failing with an unrelated "already exists" error. This isn't a Playwright-specific or a Selenium-specific concern; it's a fundamental property of test-data design that applies to essentially any automation tool capable of running tests in parallel or repeatedly.`,
    example: {
      language: "javascript",
      description:
        "Modeling a page object returning the next page object, and a component object reused across multiple pages, as data.",
      code: `class DashboardPageModel {
  constructor(driver) { this.driver = driver; }
  describe() { return "on the dashboard"; }
}
class LoginPageModel {
  constructor(driver) { this.driver = driver; }
  signIn(user, pass) {
    this.driver.actions.push({ action: "sendKeys", field: "username", value: user });
    this.driver.actions.push({ action: "sendKeys", field: "password", value: pass });
    this.driver.actions.push({ action: "click", target: "Sign in" });
    return new DashboardPageModel(this.driver); // returns the NEXT page -- enables chaining
  }
}

const driver = { actions: [] };
const dashboard = new LoginPageModel(driver).signIn("alice", "secret");
console.log(dashboard.describe()); // "on the dashboard" -- chained directly from signIn's return value
console.log(driver.actions.length); // 3

class SearchBarComponent {
  constructor(root) { this.root = root; }
  search(query) { this.root.actions.push({ action: "search", query }); }
}
// Reused identically from TWO different page objects that both contain a search bar:
const headerSearchBar = new SearchBarComponent(driver);
const sidebarSearchBar = new SearchBarComponent(driver);
headerSearchBar.search("playwright");
sidebarSearchBar.search("selenium");
console.log(driver.actions.length); // 5 -- both component instances shared the same underlying locator/interaction logic`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Chain a second action after signIn: call dashboard.describe() to confirm the returned object is genuinely usable.",
      code: `class DashboardPageModel {
  describe() { return "on the dashboard"; }
}
class LoginPageModel {
  signIn(user, pass) { return new DashboardPageModel(); }
}
const dashboard = new LoginPageModel().signIn("alice", "secret");
console.log(dashboard.describe());`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Model a page object returning the next page: write class SearchResultsPage with a method openFirstResult() that returns a new DetailPage instance. Write class DetailPage with a method title() returning 'detail page'.",
      starterCode: `class DetailPage {
  title() {
    return "detail page";
  }
}
class SearchResultsPage {
  openFirstResult() {
    // TODO: return a new DetailPage
  }
}
`,
      solutionCode: `class DetailPage {
  title() {
    return "detail page";
  }
}
class SearchResultsPage {
  openFirstResult() {
    return new DetailPage();
  }
}`,
      harness: `
        try {
          const results = new SearchResultsPage();
          const detail = results.openFirstResult();
          window.__report('t1', detail instanceof DetailPage && detail.title() === "detail page", 'openFirstResult should return a usable DetailPage instance, enabling chaining');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "openFirstResult returns a real, chainable DetailPage instance" },
      ],
      hints: [
        "Returning the next page object is what enables a test to write results.openFirstResult().title() directly, mirroring the real navigation flow.",
        "This is the same pattern as LoginPage.signIn() returning a DashboardPage in the explanation.",
      ],
    },
    independentExercise: {
      id: "sel-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write generateUniqueTestData(prefix, counter) returning prefix + '-' + counter + '@example.com' -- a simple, deterministic unique-data generator. Then write allUnique(emails) returning true only if every email in the array is distinct from every other (use a Set to check).",
      starterCode: `function generateUniqueTestData(prefix, counter) {
  // TODO
}
function allUnique(emails) {
  // TODO
}
`,
      solutionCode: `function generateUniqueTestData(prefix, counter) {
  return prefix + "-" + counter + "@example.com";
}
function allUnique(emails) {
  return new Set(emails).size === emails.length;
}`,
      harness: `
        try { window.__report('t1', generateUniqueTestData("test", 5) === "test-5@example.com", 'should build the correct email string'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const emails = [0,1,2].map(i => generateUniqueTestData("test", i));
          window.__report('t2', allUnique(emails) === true, 'generated emails from distinct counters should all be unique'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', allUnique(["a@x.com","a@x.com"]) === false, 'duplicate emails should be detected'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "generates the correct email format" },
        {
          id: "t2",
          description: "confirms generated emails from distinct counters are all unique",
        },
        { id: "t3", description: "detects a genuine duplicate" },
      ],
      hints: [
        "A Set's size compared to the original array's length is a clean way to detect duplicates.",
        "This models the exact same test-data isolation discipline needed across any automation tool, applied here via Selenium's own test setup.",
      ],
    },
    commonMistakes: [
      "Writing a page object action method that returns void when the action genuinely navigates to a new page -- returning the next page object instead enables chaining that mirrors the real navigation flow and catches a mismatched return type as a compile error if the wrong page is returned.",
      "Duplicating a repeated UI fragment's locators and logic across every page object that contains it, instead of extracting a component object -- this means a change to that fragment now requires updating every page object separately, and copies can drift out of sync.",
      "Hard-coding identical test data across tests that might run in parallel or repeatedly -- the exact same collision risk this course has covered in the context of browser sessions applies to any shared, non-unique test data.",
    ],
    quiz: [
      {
        id: "sel-q8-1",
        prompt:
          "Why does a well-designed Selenium page object's navigation action often return the NEXT page object, rather than void?",
        choices: [
          "It's required by JUnit",
          "It lets a test chain calls in a way that mirrors the real navigation flow, and a mismatched return type surfaces as a compile error if the wrong page object is returned",
          "Returning void is always preferred instead",
          "This pattern only works for the very first page object in a test",
        ],
        correctIndex: 1,
        explanation:
          "Returning the destination page object (loginPage.signIn(...) returning a DashboardPage) lets test code read as a natural sequence of real navigation steps, and Java's static typing catches a genuine mismatch (returning the wrong page type) at compile time rather than leaving it as a runtime surprise.",
      },
      {
        id: "sel-q8-2",
        prompt:
          "When does a component object (as opposed to a full page object) earn its structure?",
        choices: [
          "For every single UI element, regardless of reuse",
          "When a UI fragment (a header, a search bar, a modal) is genuinely reused across multiple different page objects -- the encapsulation pays for itself through that shared reuse",
          "Component objects should never be used in Selenium",
          "Only when a fragment appears on a single page",
        ],
        correctIndex: 1,
        explanation:
          "The exact same 'reuse earns the structure' principle that applies to page objects applies to component objects — extracting one is worthwhile specifically because multiple page objects can share it, avoiding duplicated locators and logic that would otherwise need to be kept in sync by hand.",
      },
      {
        id: "sel-q8-3",
        prompt:
          "Why does test-data collision risk apply to Selenium suites just as much as any other automation tool?",
        choices: [
          "It doesn't; Selenium automatically isolates test data",
          "Parallel or repeated test execution can cause two tests relying on identical, hard-coded data to collide, regardless of which specific automation tool or language is driving the browser",
          "Only Selenium has this problem; other tools handle it automatically",
          "Test data collisions can only happen with file uploads",
        ],
        correctIndex: 1,
        explanation:
          "Data-collision risk is a property of running tests in parallel or repeatedly against shared, non-unique data — it's not specific to any one automation tool's browser-driving mechanism, which is why the same unique-data-generation discipline applies regardless of whether the suite is built on Selenium, Playwright, or anything else.",
      },
    ],
    takeaway:
      "A Selenium page object's navigation methods should return the destination page object to enable safe, chainable test code; component objects earn their structure through genuine reuse across multiple pages, just like page objects do; and test-data collision risk under parallel or repeated execution is a universal concern, not specific to any one automation tool.",
    summary:
      "Page objects encapsulate a page's locators/actions, with navigation methods returning the next page object to enable chaining and catch mismatches at compile time. Component objects extract a UI fragment reused across multiple page objects. Unique, generated test data (not hard-coded values) avoids collisions under parallel or repeated test execution.",
    nextLessonSlug: "sel-junit-integration",
  },
  {
    id: "sel-junit-integration",
    slug: "sel-junit-integration",
    title: "JUnit Integration and Parameterized Tests",
    description:
      "Structuring a Selenium suite with JUnit 5's assertions and lifecycle properly, and running the same test logic across many inputs with @ParameterizedTest.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 8,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["sel-page-objects"],
    objectives: [
      "Use JUnit 5 assertions correctly to verify Selenium-driven browser state",
      "Write a @ParameterizedTest covering several input values with one shared test body",
      "Explain why parameterized tests report failures more usefully than a hand-written loop inside one test",
    ],
    skills: ["selenium", "junit", "parameterized-tests"],
    tech: [
      { name: "JUnit", version: "5.10+" },
      { name: "Selenium WebDriver", version: "4.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "JUnit 5 User Guide: Parameterized Tests",
        url: "https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests",
      },
    ],
    keywords: ["junit", "parameterized tests", "selenium"],
    explanation: `A Selenium test class built on JUnit 5 (Jupiter) combines this course's driver-lifecycle pattern (\`@BeforeEach\`/\`@AfterEach\`) with JUnit's standard assertions: \`assertEquals(expected, actual)\`, \`assertTrue(condition)\`, \`assertThrows(SomeException.class, () -> ...)\`. Applied to Selenium specifically, a genuinely useful assertion checks something a **real user would actually perceive** — \`assertTrue(driver.findElement(By.id("welcome")).isDisplayed())\`, \`assertEquals("Dashboard", driver.getTitle())\` — rather than an internal implementation detail that happens to be technically true but doesn't reflect real user-facing correctness.

**\`@ParameterizedTest\`** runs the same test body once per supplied value, exactly the same principle behind parameterized testing in any framework: \`@ParameterizedTest @ValueSource(strings = {"learner", "instructor", "admin"}) void dashboardShowsCorrectRoleLabel(String role) { ... }\` generates three distinct, individually-reportable test executions from one method body — a real failure specifically in the "admin" case is reported as \`dashboardShowsCorrectRoleLabel[3]\` (or with the actual value shown, depending on configuration), not folded into one ambiguous failure covering all three roles at once. \`@CsvSource\`, \`@MethodSource\`, and \`@EnumSource\` provide richer parameter shapes — multiple parameters per invocation, values computed by a method, or every value of an enum — for cases a plain \`@ValueSource\` string/int list can't express.

The concrete, honest reason a **hand-written loop inside one test method** (\`for (String role : roles) { ... assertEquals(...) ... }\`) is worse than \`@ParameterizedTest\`, stated precisely: a loop's first failing assertion **stops the entire test method immediately** (an assertion failure throws), so if the "learner" case fails, you never learn whether "instructor" or "admin" would have passed or failed too — you have to fix the first failure and re-run just to find out about the rest. \`@ParameterizedTest\` runs and reports **every** value's test independently, regardless of whether an earlier one failed, giving you the complete picture — every case's actual pass/fail status — from a single run, not one piece of it at a time across repeated fix-and-rerun cycles.`,
    example: {
      language: "javascript",
      description:
        "Modeling the loop-stops-at-first-failure problem versus independently-reported parameterized results, as data.",
      code: `function runAsLoop(values, checkFn) {
  for (const v of values) {
    const result = checkFn(v);
    if (!result.passed) {
      return { stoppedAt: v, remainingUnknown: values.slice(values.indexOf(v) + 1) };
    }
  }
  return { allPassed: true };
}

function runAsParameterized(values, checkFn) {
  return values.map((v) => ({ value: v, ...checkFn(v) })); // every value's result, independently
}

function check(role) {
  return { passed: role !== "instructor" }; // simulate "instructor" being the one broken case
}

console.log(runAsLoop(["learner", "instructor", "admin"], check));
// { stoppedAt: "instructor", remainingUnknown: ["admin"] } -- "admin" was NEVER actually checked

console.log(runAsParameterized(["learner", "instructor", "admin"], check));
// full, independent results for ALL THREE -- including confirming "admin" genuinely passed`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change check() so 'admin' is the broken case instead, and compare what runAsLoop reveals about 'instructor' in each scenario.",
      code: `function runAsLoop(values, checkFn) {
  for (const v of values) {
    const result = checkFn(v);
    if (!result.passed) return { stoppedAt: v, remainingUnknown: values.slice(values.indexOf(v) + 1) };
  }
  return { allPassed: true };
}
function check(role) { return { passed: role !== "instructor" }; }
console.log(runAsLoop(["learner", "instructor", "admin"], check));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write runAsParameterized(values, checkFn) that returns an array with ONE result object per value ({value, passed}), regardless of whether earlier values failed -- modeling @ParameterizedTest's independent-reporting behavior.",
      starterCode: `function runAsParameterized(values, checkFn) {
  // TODO: return one {value, passed} object per value, checking ALL of them independently
  return [];
}
`,
      solutionCode: `function runAsParameterized(values, checkFn) {
  return values.map((v) => ({ value: v, passed: checkFn(v) }));
}`,
      harness: `
        try {
          const results = runAsParameterized(["learner","instructor","admin"], (v) => v !== "instructor");
          window.__report('t1', results.length === 3, 'should report a result for every value, even after a failure');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const results = runAsParameterized(["learner","instructor","admin"], (v) => v !== "instructor");
          window.__report('t2', results[2].value === "admin" && results[2].passed === true, 'admin should be independently confirmed as passing, even though instructor failed');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "reports a result for every value regardless of earlier failures",
        },
        {
          id: "t2",
          description: "confirms a later value's genuine pass/fail status independently",
        },
      ],
      hints: [
        "Array.prototype.map naturally processes every element independently, unlike a loop that can exit early.",
        "This is exactly what makes @ParameterizedTest strictly more informative than a hand-written loop with an early-exiting assertion.",
      ],
    },
    independentExercise: {
      id: "sel-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write summarizeParameterizedResults(results) where results is an array of {value, passed} objects. Return {passedCount, failedValues} -- the count of passing results, and an array of just the VALUES (not the whole objects) that failed.",
      starterCode: `function summarizeParameterizedResults(results) {
  // TODO
  return { passedCount: 0, failedValues: [] };
}
`,
      solutionCode: `function summarizeParameterizedResults(results) {
  const passedCount = results.filter((r) => r.passed).length;
  const failedValues = results.filter((r) => !r.passed).map((r) => r.value);
  return { passedCount, failedValues };
}`,
      harness: `
        try {
          const results = [{value:"a",passed:true},{value:"b",passed:false},{value:"c",passed:true}];
          const summary = summarizeParameterizedResults(results);
          window.__report('t1', summary.passedCount === 2 && JSON.stringify(summary.failedValues) === JSON.stringify(["b"]), 'should correctly summarize pass count and failed values');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const summary = summarizeParameterizedResults([]);
          window.__report('t2', summary.passedCount === 0 && summary.failedValues.length === 0, 'empty results should summarize to zero/empty'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly summarizes a mix of passing and failing results" },
        { id: "t2", description: "handles an empty results array" },
      ],
      hints: [
        "Array.prototype.filter combined with .map builds the failedValues list in two clear steps.",
        "This models the kind of summary a real CI report gives you after a parameterized test run: exactly which specific values failed, not just 'something failed.'",
      ],
    },
    commonMistakes: [
      "Writing a hand-rolled for-loop with assertions inside one test method instead of using @ParameterizedTest -- the loop stops at the FIRST failing assertion, hiding whether later values would have passed or failed too, requiring repeated fix-and-rerun cycles to find out.",
      "Asserting on an internal implementation detail (a hidden attribute value, an internal state flag) instead of something a real user would actually perceive (visible text, an element's displayed state) -- this can pass while the actual user-facing behavior is broken.",
      "Using @ValueSource for parameter shapes it can't express (multiple related parameters per case) instead of reaching for @CsvSource or @MethodSource when the data genuinely needs more structure.",
    ],
    quiz: [
      {
        id: "sel-q9-1",
        prompt:
          "A hand-written loop asserts on three values inside one test method; the first value fails. What happens to the other two?",
        choices: [
          "They are still checked and reported independently",
          "The test method stops immediately at the first failing assertion -- the remaining two values are never actually checked in that run",
          "JUnit automatically continues checking them in a background thread",
          "The loop silently skips the failure and continues",
        ],
        correctIndex: 1,
        explanation:
          "An assertion failure throws, which immediately exits the current method — any loop iterations after that point simply never execute, meaning you learn nothing about the remaining values until you fix the first failure and re-run.",
      },
      {
        id: "sel-q9-2",
        prompt:
          "How does @ParameterizedTest handle a failure in one of several supplied values, compared to a hand-written loop?",
        choices: [
          "Identically -- it also stops entirely at the first failure",
          "Each value runs as its own independent test execution; a failure in one value doesn't prevent the others from running and being reported on their own",
          "@ParameterizedTest cannot detect failures at all",
          "It requires manually catching exceptions to continue past a failure",
        ],
        correctIndex: 1,
        explanation:
          "JUnit generates a genuinely separate test execution per parameterized value, each independently run and reported — a failure in one has no effect on whether the others run, giving you the complete picture (every value's actual pass/fail status) from a single test run.",
      },
      {
        id: "sel-q9-3",
        prompt:
          'Why is `assertTrue(driver.findElement(By.id("welcome")).isDisplayed())` a better assertion than checking an internal, non-user-facing implementation detail?',
        choices: [
          "It isn't better; both are equally valid",
          "isDisplayed() reflects what a real user would actually perceive on the page, while an internal detail could be technically 'correct' while the real, visible behavior is actually broken",
          "isDisplayed() is faster to execute",
          "Internal implementation details cannot be checked with JUnit at all",
        ],
        correctIndex: 1,
        explanation:
          "A test's real value comes from verifying genuine, user-facing correctness — an assertion on something a real user would never see or interact with can pass even while the actual, perceivable behavior is broken, which defeats much of the point of an end-to-end test in the first place.",
      },
    ],
    takeaway:
      "@ParameterizedTest runs and reports every supplied value's test independently, unlike a hand-written loop that stops entirely at the first failing assertion — and a Selenium assertion is most valuable when it checks something a real user would actually perceive, not an internal implementation detail.",
    summary:
      "JUnit 5 assertions (assertEquals, assertTrue, assertThrows) should verify real, user-perceivable state through Selenium. @ParameterizedTest (with @ValueSource, @CsvSource, or @MethodSource) generates independent, individually-reported test executions per value, unlike a hand-written loop that stops at the first failure and hides the status of remaining cases.",
    nextLessonSlug: "sel-parallel-grid-remote",
  },
  {
    id: "sel-parallel-grid-remote",
    slug: "sel-parallel-grid-remote",
    title: "Parallel Execution, Selenium Grid, and Remote WebDriver",
    description:
      "Running many Selenium tests at once safely, and the Grid/RemoteWebDriver architecture that lets tests run against browsers on entirely different machines.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["sel-junit-integration"],
    objectives: [
      "Configure JUnit 5 parallel execution safely for a Selenium suite",
      "Explain what Selenium Grid's hub/node architecture actually coordinates",
      "Explain what RemoteWebDriver changes about how test code addresses the browser",
    ],
    skills: ["selenium", "parallel-execution", "grid", "remote-webdriver"],
    tech: [
      { name: "Selenium WebDriver", version: "4.x" },
      { name: "JUnit", version: "5.10+" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Selenium Grid",
        url: "https://www.selenium.dev/documentation/grid/",
      },
      {
        label: "JUnit 5 User Guide: Parallel Execution",
        url: "https://junit.org/junit5/docs/current/user-guide/#writing-tests-parallel-execution",
      },
    ],
    keywords: ["parallel execution", "selenium grid", "remotewebdriver", "selenium"],
    explanation: `**JUnit 5's parallel execution** (enabled via a \`junit-platform.properties\` file setting \`junit.jupiter.execution.parallel.enabled=true\`) is **opt-in**, unlike some testing frameworks where it's the default — a deliberate design choice, since Selenium tests each drive a genuinely expensive resource (a real browser process), and running many simultaneously without a per-test-fresh-driver discipline (this course's earlier lesson) would immediately reproduce exactly the state-leaking problems that discipline exists to prevent. Selenium tests are only safe to parallelize once each test genuinely creates and tears down its own driver instance — parallelizing a suite that shares driver instances across tests doesn't just risk flakiness, it actively breaks, since multiple threads would be issuing commands to the exact same browser session simultaneously.

**Selenium Grid** solves a different, related problem: running tests against **many browser instances distributed across multiple machines**, not just multiple threads on one machine. A Grid deployment has a **hub** (accepts incoming test session requests and routes them) and one or more **nodes** (each actually running browser instances) — a hub might route a Chrome-requesting session to a node that has Chrome available, and a Firefox-requesting session to a different node. This is the mechanism that lets a large organization run thousands of tests across a fleet of machines rather than being limited to whatever a single machine's CPU/memory can support running concurrently.

**\`RemoteWebDriver\`** (\`new RemoteWebDriver(new URL("http://grid-hub:4444"), new ChromeOptions())\`) is what test code uses to talk to a Grid hub instead of launching a browser locally — the crucial thing that **does not change** is everything else this course has covered: locators, waits, page objects, assertions all work completely identically, because \`RemoteWebDriver\` implements the exact same \`WebDriver\` interface as a local \`ChromeDriver\`. This is a genuinely important, honest point: writing tests that work correctly locally, then pointing them at a Grid by swapping only the driver-construction line, requires no other code changes at all, *provided* the tests were already written correctly against the standard \`WebDriver\` interface rather than accidentally depending on some local-machine-specific detail (a hard-coded local file path for upload, for instance, which would need to exist on whichever remote node actually runs that test).`,
    example: {
      language: "javascript",
      description:
        "Modeling Grid's hub-routes-to-node architecture and RemoteWebDriver's interface-compatibility guarantee, as data.",
      code: `function routeToNode(requestedBrowser, availableNodes) {
  const match = availableNodes.find((node) => node.browsers.includes(requestedBrowser));
  if (!match) throw new Error("no node available for " + requestedBrowser);
  return match.nodeId;
}

const nodes = [
  { nodeId: "node-1", browsers: ["chrome"] },
  { nodeId: "node-2", browsers: ["firefox", "webkit"] },
];
console.log(routeToNode("firefox", nodes)); // "node-2" -- the hub routes based on what's actually available

// The SAME test logic works identically whether "driver" is local or remote --
// this models WebDriver's shared interface across ChromeDriver and RemoteWebDriver.
function runTestLogic(driver) {
  driver.get("/login");
  driver.findElement("#username").sendKeys("alice");
  return "test logic ran identically, regardless of where the browser actually lives";
}
console.log(runTestLogic({ get: () => {}, findElement: () => ({ sendKeys: () => {} }) }));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call routeToNode for a browser ('safari') that no node supports, and confirm it correctly throws.",
      code: `function routeToNode(requestedBrowser, availableNodes) {
  const match = availableNodes.find((node) => node.browsers.includes(requestedBrowser));
  if (!match) throw new Error("no node available for " + requestedBrowser);
  return match.nodeId;
}
const nodes = [{ nodeId: "node-1", browsers: ["chrome"] }];
console.log(routeToNode("safari", nodes));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write routeToNode(requestedBrowser, availableNodes) modeling Grid's hub routing: find the first node whose 'browsers' array includes requestedBrowser, and return its nodeId; throw an Error if no node supports it.",
      starterCode: `function routeToNode(requestedBrowser, availableNodes) {
  // TODO
}
`,
      solutionCode: `function routeToNode(requestedBrowser, availableNodes) {
  const match = availableNodes.find((node) => node.browsers.includes(requestedBrowser));
  if (!match) throw new Error("no node available for " + requestedBrowser);
  return match.nodeId;
}`,
      harness: `
        const nodes = [{nodeId:"node-1",browsers:["chrome"]},{nodeId:"node-2",browsers:["firefox"]}];
        try { window.__report('t1', routeToNode("firefox", nodes) === "node-2", 'should route to the node supporting the requested browser'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { let threw = false; try { routeToNode("safari", nodes); } catch (e) { threw = true; } window.__report('t2', threw, 'requesting an unsupported browser should throw'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "routes to the correct node for a supported browser" },
        { id: "t2", description: "throws when no node supports the requested browser" },
      ],
      hints: [
        "Array.prototype.find locates the first matching node directly.",
        "This models exactly what a Grid hub does: match an incoming session request to a node that can actually fulfill it.",
      ],
    },
    independentExercise: {
      id: "sel-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isSafeToParallelize(testDesign) returning true only if testDesign.freshDriverPerTest is true AND testDesign.usesUniqueTestData is true AND testDesign.noSharedMutableState is true -- modeling the real preconditions a Selenium suite needs before parallel execution is actually safe, not just fast.",
      starterCode: `function isSafeToParallelize(testDesign) {
  // TODO
}
`,
      solutionCode: `function isSafeToParallelize(testDesign) {
  return (
    testDesign.freshDriverPerTest === true &&
    testDesign.usesUniqueTestData === true &&
    testDesign.noSharedMutableState === true
  );
}`,
      harness: `
        try { window.__report('t1', isSafeToParallelize({freshDriverPerTest:true, usesUniqueTestData:true, noSharedMutableState:true}) === true, 'meeting all three preconditions should be safe'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isSafeToParallelize({freshDriverPerTest:false, usesUniqueTestData:true, noSharedMutableState:true}) === false, 'sharing a driver instance should make parallelization unsafe'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isSafeToParallelize({freshDriverPerTest:true, usesUniqueTestData:false, noSharedMutableState:true}) === false, 'non-unique test data should make parallelization unsafe'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "all three preconditions met is safe" },
        { id: "t2", description: "a shared driver instance makes it unsafe" },
        { id: "t3", description: "non-unique test data makes it unsafe" },
      ],
      hints: [
        "ALL three conditions must hold simultaneously -- this models that parallel execution isn't safe by default, it requires deliberate design choices already covered earlier in this course.",
        "Every one of these three preconditions was covered in a previous lesson -- this exercise ties them together.",
      ],
    },
    commonMistakes: [
      "Enabling JUnit parallel execution on a suite that shares WebDriver instances across tests -- multiple threads issuing commands to the same browser session simultaneously doesn't just risk flakiness, it actively breaks in confusing ways.",
      "Assuming Selenium Grid and parallel execution solve the same problem -- parallel execution runs multiple tests concurrently on ONE machine's resources; Grid distributes tests across MULTIPLE machines, and they're often used together, not as alternatives to each other.",
      "Writing a test that depends on a local-machine-specific detail (a hard-coded local file path, a locally-installed certificate) and expecting it to work unchanged against RemoteWebDriver -- the remote node running that test may not have that same local resource available at all.",
    ],
    quiz: [
      {
        id: "sel-q10-1",
        prompt:
          "Why is JUnit parallel execution opt-in rather than a default for Selenium test suites?",
        choices: [
          "JUnit does not actually support parallel execution",
          "Selenium tests each drive a genuinely expensive resource (a real browser process), and safe parallelization requires a per-test-fresh-driver discipline that must be deliberately in place first",
          "Parallel execution is always slower for browser tests",
          "It's enabled by default; there's no opt-in step",
        ],
        correctIndex: 1,
        explanation:
          "Parallelizing Selenium tests safely depends on each test genuinely owning its own driver instance — making this opt-in reflects that real precondition, rather than silently enabling something that would actively break a suite that shares driver instances across tests.",
      },
      {
        id: "sel-q10-2",
        prompt: "What does Selenium Grid's hub actually coordinate?",
        choices: [
          "It runs all tests directly itself",
          "It accepts incoming test session requests and routes each one to a node that has the requested browser available, distributing sessions across multiple machines",
          "It only works with a single node, never multiple",
          "The hub replaces the need for WebDriver entirely",
        ],
        correctIndex: 1,
        explanation:
          "The hub is a routing/coordination layer, not where browsers actually run — it matches each incoming session request to an appropriate node (a separate machine or process actually hosting browser instances), which is what lets a Grid deployment scale across many machines.",
      },
      {
        id: "sel-q10-3",
        prompt:
          "What must change in test code to point already-working tests at a Selenium Grid via RemoteWebDriver?",
        choices: [
          "Every locator, wait, and assertion must be rewritten",
          "In principle, only the driver-construction line, since RemoteWebDriver implements the same WebDriver interface as a local driver -- provided the tests don't depend on some local-machine-specific detail",
          "The entire test suite must be rewritten in a different language",
          "RemoteWebDriver cannot be used with page objects",
        ],
        correctIndex: 1,
        explanation:
          "Because RemoteWebDriver honors the same WebDriver interface, code written correctly against that interface (locators, waits, page objects, assertions) needs no changes — the one honest caveat is that any hidden dependency on the LOCAL machine specifically (a local file path, a locally-installed resource) would need to be addressed, since a remote node running the test may not have it.",
      },
    ],
    takeaway:
      "Parallel execution is only safe once each test genuinely owns a fresh driver instance, no shared mutable state, and unique test data; Grid distributes browser sessions across multiple machines via a hub/node architecture; and RemoteWebDriver requires no test-code changes beyond driver construction, since it implements the identical WebDriver interface.",
    summary:
      "JUnit parallel execution is opt-in and only safe with a fresh-driver-per-test, unique-data, no-shared-state design. Selenium Grid's hub routes incoming session requests to nodes hosting the requested browser, distributing load across machines. RemoteWebDriver implements the same WebDriver interface as a local driver, so tests work unchanged beyond the driver-construction line.",
    nextLessonSlug: "sel-failure-diagnosis",
  },
  {
    id: "sel-failure-diagnosis",
    slug: "sel-failure-diagnosis",
    title: "Failure Diagnosis: Stale Elements, Intercepted Clicks, and Timing",
    description:
      "Selenium's three most common real exceptions — what each one actually, precisely means, and the correct fix for each, not a generic 'add a wait and hope.'",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 10,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["sel-parallel-grid-remote"],
    objectives: [
      "Diagnose StaleElementReferenceException precisely and apply the correct fix",
      "Diagnose ElementClickInterceptedException and identify what's actually covering the target element",
      "Distinguish a genuine timing failure from a masked, different root cause",
    ],
    skills: ["selenium", "failure-diagnosis", "exceptions"],
    tech: [{ name: "Selenium WebDriver", version: "4.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Exceptions",
        url: "https://www.selenium.dev/documentation/webdriver/troubleshooting/errors/",
      },
    ],
    keywords: ["stale element", "intercepted click", "timing failures", "selenium"],
    explanation: `\`StaleElementReferenceException\` (this course's element-location lesson) means the specific \`WebElement\` reference you're using points into a DOM state that no longer exists — the fix is **always** re-locating the element fresh via \`findElement\` again, never retrying the exact same stale reference, since it can never become valid again no matter how many times you retry it.

\`ElementClickInterceptedException\` means Selenium found the target element, confirmed it's genuinely visible and enabled, but **something else is currently on top of it at the exact click coordinates** — a fixed header that overlaps content while scrolling, a cookie-consent banner not yet dismissed, a loading spinner overlay that hasn't finished disappearing, or a modal dialog. The message itself typically names the actual intercepting element, which is the fastest way to diagnose it — reading that message tells you *exactly* what's covering the target, rather than guessing. The fix is addressing the **real cause**: dismiss the cookie banner first, wait for the loading overlay to genuinely disappear (an explicit wait on that overlay's absence, not the target element's presence), or scroll the target element into view away from a fixed header — never simply retrying the same click blindly and hoping the obstruction happens to be gone by chance.

A genuine **timing failure** — the element truly wasn't ready in time, with no other cause — is real, but it's also the class of failure most often **mis-diagnosed**, because it's the easiest explanation to reach for without actually checking. Before concluding "this is just a timing issue," rule out the more specific, more common causes first: is the wait actually targeting the *specific condition* needed (\`elementToBeClickable\`, not just \`presenceOfElementLocated\`, if the interaction is a click)? Is the locator ambiguous, matching more than one element depending on page state? Is the failure actually \`ElementClickInterceptedException\` or \`StaleElementReferenceException\` in disguise, misread as a generic timeout because the exact exception type wasn't read carefully? **Reading the exact exception type and message is the single highest-value diagnostic step**, and skipping straight to "just increase the wait" without reading it first is treating a specific, informative error as a generic, uninformative one.`,
    example: {
      language: "javascript",
      description:
        "Modeling exception-type-driven diagnosis: reading the SPECIFIC exception type determines the correct fix, not a generic guess.",
      code: `function diagnoseSeleniumFailure(exceptionType, interceptingElement) {
  if (exceptionType === "StaleElementReferenceException") {
    return "fix: re-locate the element fresh via findElement -- the old reference can never become valid again";
  }
  if (exceptionType === "ElementClickInterceptedException") {
    return "fix: address the real obstruction (" + interceptingElement + ") -- dismiss it, wait for it to disappear, or scroll around it";
  }
  if (exceptionType === "TimeoutException") {
    return "fix: verify the wait targets the SPECIFIC condition needed, and rule out an ambiguous locator, before assuming pure timing";
  }
  return "unrecognized exception type -- read the full message before guessing a fix";
}

console.log(diagnoseSeleniumFailure("ElementClickInterceptedException", "cookie-consent-banner"));
console.log(diagnoseSeleniumFailure("StaleElementReferenceException", null));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call diagnoseSeleniumFailure with an exception type this function doesn't specifically recognize, and observe the honest fallback response.",
      code: `function diagnoseSeleniumFailure(exceptionType, interceptingElement) {
  if (exceptionType === "StaleElementReferenceException") return "re-locate fresh";
  if (exceptionType === "ElementClickInterceptedException") return "address: " + interceptingElement;
  return "unrecognized -- read the full message before guessing";
}
console.log(diagnoseSeleniumFailure("SomeOtherException", null));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write diagnoseSeleniumFailure(exceptionType, interceptingElement) implementing exactly the three specific cases from this lesson (StaleElementReferenceException, ElementClickInterceptedException, TimeoutException) plus an honest fallback for anything unrecognized.",
      starterCode: `function diagnoseSeleniumFailure(exceptionType, interceptingElement) {
  // TODO
}
`,
      solutionCode: `function diagnoseSeleniumFailure(exceptionType, interceptingElement) {
  if (exceptionType === "StaleElementReferenceException") {
    return "fix: re-locate the element fresh via findElement";
  }
  if (exceptionType === "ElementClickInterceptedException") {
    return "fix: address the real obstruction (" + interceptingElement + ")";
  }
  if (exceptionType === "TimeoutException") {
    return "fix: verify the wait condition and locator before assuming pure timing";
  }
  return "unrecognized exception type -- read the full message before guessing a fix";
}`,
      harness: `
        try { window.__report('t1', diagnoseSeleniumFailure("StaleElementReferenceException", null).includes("re-locate"), 'stale element should recommend re-locating'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', diagnoseSeleniumFailure("ElementClickInterceptedException", "modal-overlay").includes("modal-overlay"), 'intercepted click should name the actual obstruction'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', diagnoseSeleniumFailure("SomeUnknownError", null).includes("unrecognized"), 'an unrecognized exception should give an honest fallback, not a guess'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly diagnoses a stale element" },
        {
          id: "t2",
          description: "correctly names the actual obstruction for an intercepted click",
        },
        {
          id: "t3",
          description:
            "gives an honest fallback for an unrecognized exception, rather than guessing",
        },
      ],
      hints: [
        "Each exception type has a SPECIFIC, correct fix -- not a generic 'add a wait' catch-all.",
        "The fallback case matters: an unrecognized exception should prompt reading the actual message, not a blind guess.",
      ],
    },
    independentExercise: {
      id: "sel-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write shouldSuspectMisdiagnosis(waitConditionUsed, requiredCondition) modeling a real, common mistake: return true if waitConditionUsed does NOT match requiredCondition (e.g. waited for 'presenceOfElementLocated' when 'elementToBeClickable' was actually needed for a click interaction) -- this flags exactly the case where a 'timing failure' might actually be a wrong-condition bug in disguise.",
      starterCode: `function shouldSuspectMisdiagnosis(waitConditionUsed, requiredCondition) {
  // TODO
}
`,
      solutionCode: `function shouldSuspectMisdiagnosis(waitConditionUsed, requiredCondition) {
  return waitConditionUsed !== requiredCondition;
}`,
      harness: `
        try { window.__report('t1', shouldSuspectMisdiagnosis("presenceOfElementLocated", "elementToBeClickable") === true, 'a mismatched wait condition should raise suspicion of misdiagnosis'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldSuspectMisdiagnosis("elementToBeClickable", "elementToBeClickable") === false, 'a correctly matched wait condition should not raise suspicion'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "flags a mismatched wait condition as suspicious" },
        { id: "t2", description: "does not flag a correctly matched wait condition" },
      ],
      hints: [
        "An element can be 'present' in the DOM while still being genuinely unclickable -- these are different, specific conditions.",
        "This models exactly the diagnostic check this lesson recommends BEFORE concluding a failure is 'just' a timing issue.",
      ],
    },
    commonMistakes: [
      "Retrying the exact same stale WebElement reference, expecting it to eventually work -- it can never become valid again; only a fresh findElement call produces a usable reference.",
      "Blindly retrying a click after ElementClickInterceptedException without reading which element is actually intercepting it -- the exception message typically names the real obstruction directly, making a blind retry strictly worse than actually reading the message.",
      "Concluding 'this is just flaky timing' as a first explanation, before ruling out a wrong wait condition, an ambiguous locator, or a misread exception type -- timing failures are real, but they're also the easiest wrong explanation to reach for without actually checking.",
    ],
    quiz: [
      {
        id: "sel-q11-1",
        prompt:
          "What does ElementClickInterceptedException's error message typically provide that makes it faster to diagnose than guessing?",
        choices: [
          "Nothing useful; the message is always generic",
          "It typically names the actual element currently intercepting the click, telling you exactly what's in the way rather than requiring you to guess",
          "It only indicates a network problem",
          "The message is identical to StaleElementReferenceException's",
        ],
        correctIndex: 1,
        explanation:
          "Selenium's ElementClickInterceptedException is specifically designed to be diagnostic — it identifies the real obstructing element directly in its message, which is exactly the information needed to fix the actual cause instead of blindly retrying.",
      },
      {
        id: "sel-q11-2",
        prompt:
          "Before concluding a failure is 'just a timing issue,' what should be ruled out first?",
        choices: [
          "Nothing; timing issues require no further investigation",
          "Whether the wait actually targets the specific condition needed (not just presence), whether the locator is ambiguous, and whether the exception is actually a different, more specific type",
          "Only whether the internet connection is working",
          "Whether the test was written in the correct programming language",
        ],
        correctIndex: 1,
        explanation:
          "Timing failures are real, but they're also the easiest, least specific explanation to reach for — checking the actual wait condition, locator specificity, and exact exception type first often reveals a different, more specific, more fixable root cause.",
      },
      {
        id: "sel-q11-3",
        prompt: "Why can't a stale WebElement reference simply be retried until it 'works'?",
        choices: [
          "It can be retried; this is the correct fix",
          "A stale reference points into a DOM state that no longer exists, and this can never become valid again -- only a fresh findElement call against the CURRENT DOM produces a usable reference",
          "Stale references become valid again after exactly one retry",
          "Retrying a stale reference only fails on the first attempt",
        ],
        correctIndex: 1,
        explanation:
          "Staleness isn't a transient condition that resolves on its own — the reference is permanently tied to a DOM snapshot that's gone. No amount of retrying the same reference changes that; a genuinely fresh reference from a new findElement call is the only fix.",
      },
    ],
    takeaway:
      "Selenium's most common real exceptions each have a specific, correct fix — re-locate fresh for stale elements, address the actual named obstruction for intercepted clicks, and verify the wait condition and locator before accepting 'timing issue' as the diagnosis — reading the exact exception type and message is the highest-value diagnostic step, not an afterthought.",
    summary:
      "StaleElementReferenceException requires re-locating the element fresh, never retrying the same reference. ElementClickInterceptedException's message names the real obstructing element — address that directly. A genuine timing failure should be the LAST conclusion reached, only after ruling out a wrong wait condition, an ambiguous locator, or a misread, more specific exception type.",
    nextLessonSlug: "sel-reporting-ci",
  },
  {
    id: "sel-reporting-ci",
    slug: "sel-reporting-ci",
    title: "Reporting and CI Integration",
    description:
      "Turning a Maven-run Selenium suite's results into something a team can act on, running it headlessly in CI, and capturing failure screenshots automatically.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 22,
    prerequisites: ["sel-failure-diagnosis"],
    objectives: [
      "Configure Maven Surefire to produce CI-consumable test reports",
      "Explain what headless mode changes and why CI environments typically require it",
      "Capture a screenshot automatically on test failure using JUnit's TestWatcher extension",
    ],
    skills: ["selenium", "reporting", "ci", "headless"],
    tech: [
      { name: "Selenium WebDriver", version: "4.x" },
      { name: "Maven", version: "3.9+" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Continuous integration",
        url: "https://www.selenium.dev/documentation/test_practices/continuous_integration/",
      },
    ],
    keywords: ["reporting", "ci", "headless", "maven surefire", "selenium"],
    explanation: `**Maven Surefire** (the plugin that actually runs \`mvn test\`) produces XML reports under \`target/surefire-reports/\` by default — machine-parseable output many CI platforms consume natively to display pass/fail counts and individual test results in their own dashboards, independent of any custom reporting you add. This is the direct Maven-ecosystem equivalent of the reporter configuration covered for other automation tools: a CI-consumable, structured result format that survives past the raw console output of a single run.

**Headless mode** (\`ChromeOptions options = new ChromeOptions(); options.addArguments("--headless=new"); WebDriver driver = new ChromeDriver(options);\`) runs a real, fully-functional browser with no visible window rendered — CI environments typically require this, since most CI runners have no display server available at all (\`Xvfb\`, a virtual framebuffer, is one common workaround for tools that genuinely require a display; running headless avoids needing it entirely for browsers that support true headless operation). It's worth stating precisely: headless is **not** a simulation or a reduced-fidelity mode — it's the exact same real browser engine, actually rendering and executing the exact same page, just without displaying that rendering in a visible window. Test behavior should be identical between headed and headless runs for a correctly-written test; a test that only passes in one mode specifically often reveals a genuine bug (a race condition sensitive to rendering timing, or code that accidentally depends on window focus) rather than a limitation of headless mode itself.

**Capturing a failure screenshot automatically** — rather than relying on a developer to notice a failure and manually screenshot it before the browser closes — uses a JUnit 5 extension implementing \`TestWatcher\`: \`public class ScreenshotOnFailureExtension implements TestWatcher { public void testFailed(ExtensionContext context, Throwable cause) { WebDriver driver = ...; File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE); Files.copy(screenshot.toPath(), Paths.get("failure-" + context.getDisplayName() + ".png")); } }\`, registered on a test class via \`@ExtendWith(ScreenshotOnFailureExtension.class)\`. This is the same underlying principle as this course's earlier driver-lifecycle lesson — automate what would otherwise depend on a human remembering to do it manually, every single time, under exactly the pressure (an unexpected failure) when they're least likely to remember.`,
    example: {
      language: "javascript",
      description:
        "Modeling headless-mode's 'same engine, no visible window' property and automatic failure-screenshot capture, as data.",
      code: `function browserBehavior(headless) {
  // The KEY point: headless changes only whether a window is rendered visibly --
  // NOT which engine runs, or what the page actually does.
  return { engine: "real-chromium", rendersPage: true, showsVisibleWindow: !headless };
}
console.log(browserBehavior(true));  // { engine: "real-chromium", rendersPage: true, showsVisibleWindow: false }
console.log(browserBehavior(false)); // { engine: "real-chromium", rendersPage: true, showsVisibleWindow: true }
// Same engine, same real rendering, in both cases -- only visibility differs.

function onTestFailure(testName, captureScreenshot) {
  const path = "failure-" + testName + ".png";
  captureScreenshot(path); // automated -- no human needs to remember to do this manually
  return path;
}
console.log(onTestFailure("loginTest", (path) => console.log("saved to", path)));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call browserBehavior(false) and confirm showsVisibleWindow is true while engine and rendersPage stay identical to the headless case.",
      code: `function browserBehavior(headless) {
  return { engine: "real-chromium", rendersPage: true, showsVisibleWindow: !headless };
}
console.log(browserBehavior(false));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write browserBehavior(headless) exactly as modeled: return {engine: 'real-chromium', rendersPage: true, showsVisibleWindow: !headless}.",
      starterCode: `function browserBehavior(headless) {
  // TODO
}
`,
      solutionCode: `function browserBehavior(headless) {
  return { engine: "real-chromium", rendersPage: true, showsVisibleWindow: !headless };
}`,
      harness: `
        try { const r = browserBehavior(true); window.__report('t1', r.engine === "real-chromium" && r.rendersPage === true && r.showsVisibleWindow === false, 'headless should still be a real engine that renders, just with no visible window'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = browserBehavior(false); window.__report('t2', r.showsVisibleWindow === true, 'non-headless should show a visible window'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "headless mode is a real, rendering engine with no visible window",
        },
        { id: "t2", description: "non-headless mode shows a visible window" },
      ],
      hints: [
        "The key insight this exercise reinforces: engine and rendersPage stay IDENTICAL between the two modes -- only visibility differs.",
        "This is exactly why a correctly-written test should behave identically in both modes.",
      ],
    },
    independentExercise: {
      id: "sel-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write buildFailureScreenshotPath(testDisplayName, timestamp) returning 'failure-' + testDisplayName + '-' + timestamp + '.png', with any spaces in testDisplayName replaced with underscores (a real filename constraint). Then write shouldCaptureScreenshot(testOutcome) returning true only for 'failed' or 'aborted', false for 'passed' or 'skipped'.",
      starterCode: `function buildFailureScreenshotPath(testDisplayName, timestamp) {
  // TODO
}
function shouldCaptureScreenshot(testOutcome) {
  // TODO
}
`,
      solutionCode: `function buildFailureScreenshotPath(testDisplayName, timestamp) {
  const safeName = testDisplayName.replace(/ /g, "_");
  return "failure-" + safeName + "-" + timestamp + ".png";
}
function shouldCaptureScreenshot(testOutcome) {
  return testOutcome === "failed" || testOutcome === "aborted";
}`,
      harness: `
        try { window.__report('t1', buildFailureScreenshotPath("login test", 123) === "failure-login_test-123.png", 'should build a safe, correctly-formatted filename'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldCaptureScreenshot("failed") === true, 'a failed test should trigger a screenshot'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', shouldCaptureScreenshot("passed") === false, 'a passed test should not trigger a screenshot'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "builds a correctly-formatted, filesystem-safe path" },
        { id: "t2", description: "correctly triggers a screenshot on failure" },
        { id: "t3", description: "correctly skips screenshot capture for a passing test" },
      ],
      hints: [
        "A regex with the global flag (/ /g) replaces every space, not just the first one.",
        "This models exactly the TestWatcher pattern's decision logic: capture specifically on failure/abort, not on every test.",
      ],
    },
    guidedLocalLab: {
      id: "sel-gll-maintainable-suite-ci",
      title: "Refactor Tests into Maintainable Components and Execute Them in CI",
      scenario:
        "Refactor your Selenium tests into page objects, add automatic failure screenshots via a JUnit extension, configure headless execution, and produce a CI-consumable report — the capstone of this course's execution and reliability work.",
      requiredTools: [
        { name: "JDK", version: "21 LTS or newer" },
        { name: "Apache Maven", version: "3.9+" },
        { name: "Selenium WebDriver", version: "4.x" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        "Continue from the selenium-learning-lab project used in this course's earlier guided local labs.",
        "Add a page-object package and a JUnit extension class for automatic failure screenshots.",
      ],
      projectStructure: `selenium-learning-lab/
  pom.xml
  src/
    main/java/com/visaspark/selenium/pages/
      SearchPage.java
    test/java/com/visaspark/selenium/
      ScreenshotOnFailureExtension.java
      RefactoredWorkflowTest.java`,
      starterFiles: [
        {
          path: "src/test/java/com/visaspark/selenium/ScreenshotOnFailureExtension.java",
          content: `package com.visaspark.selenium;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestWatcher;
import org.openqa.selenium.*;
import java.io.File;
import java.nio.file.*;

public class ScreenshotOnFailureExtension implements TestWatcher {
    @Override
    public void testFailed(ExtensionContext context, Throwable cause) {
        // TODO: retrieve the WebDriver instance for this test (e.g. from a static field
        // or the test instance itself), call getScreenshotAs, and copy it to a real file
        // named using context.getDisplayName()
    }
}
`,
        },
        {
          path: "src/test/java/com/visaspark/selenium/RefactoredWorkflowTest.java",
          content: `package com.visaspark.selenium;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

@ExtendWith(ScreenshotOnFailureExtension.class)
class RefactoredWorkflowTest {
    static WebDriver driver;

    @BeforeEach
    void setup() {
        ChromeOptions options = new ChromeOptions();
        // TODO: add "--headless=new" when running in CI (check an env var like CI)
        driver = new ChromeDriver(options);
    }

    @AfterEach
    void teardown() {
        driver.quit();
    }

    @Test
    void refactoredWorkflowUsesPageObjects() {
        // TODO: use a page object (create one under src/main/java) instead of raw
        // findElement calls directly in this test method
    }
}
`,
        },
      ],
      requirements: [
        "At least one page object class exists under src/main/java, used by the test instead of raw findElement calls.",
        "ScreenshotOnFailureExtension genuinely captures and saves a screenshot when a test fails.",
        "ChromeOptions conditionally adds '--headless=new' based on an environment variable (e.g. CI), matching the CI-vs-local branching pattern.",
        "`mvn test` produces a Surefire XML report under target/surefire-reports/.",
      ],
      commands: [
        { description: "Run the suite locally (headed, visible browser)", command: "mvn test" },
        { description: "Run the suite as CI would (headless)", command: "CI=true mvn test" },
        {
          description: "Inspect the Surefire report",
          command: "cat target/surefire-reports/*.xml",
        },
      ],
      expectedBehavior:
        "The refactored test passes identically in both headed and headless (CI=true) modes, using a page object rather than raw locator calls directly in the test. Deliberately breaking the test (temporarily) produces a real screenshot file via the extension. A Surefire XML report exists after every run.",
      verificationSteps: [
        {
          command: "mvn test",
          expectedResult: "BUILD SUCCESS; a real, visible Chrome window is observed",
        },
        {
          command: "CI=true mvn test",
          expectedResult:
            "BUILD SUCCESS; no visible browser window appears, but the test still passes identically",
        },
        {
          command: "ls target/surefire-reports/",
          expectedResult: "At least one .xml report file exists",
        },
        {
          command: "(temporarily break the test's assertion) mvn test",
          expectedResult:
            "The test fails, AND a real failure-*.png screenshot file is created by the extension",
        },
      ],
      troubleshooting: [
        {
          issue: "Headless mode fails but headed mode passes",
          fix: "This is a real signal worth investigating, not dismissing — check for code that accidentally depends on window focus or a rendering-timing-sensitive race condition, rather than assuming headless mode itself is broken.",
        },
        {
          issue: "ScreenshotOnFailureExtension doesn't produce a file",
          fix: "Confirm the extension can actually access the same WebDriver instance the failing test used — a common approach is a static field or a JUnit store, since the extension and the test method aren't otherwise directly connected.",
        },
        {
          issue: "No surefire-reports directory after running",
          fix: "Confirm you're running via `mvn test` (which invokes Surefire) rather than running the test class directly through an IDE, which may not produce the same Maven-managed report output.",
        },
      ],
      hints: [
        'System.getenv("CI") != null is a standard way to detect a CI environment and branch ChromeOptions accordingly.',
        "A static WebDriver field on the test class is a simple way for a JUnit extension to access the same driver instance the failing test was using.",
        "Extracting the page object doesn't change what the test verifies -- only how the interaction logic is organized, which is exactly the point of this refactor.",
      ],
      referenceSolution: {
        summary:
          "SearchPage encapsulates the search interaction. ScreenshotOnFailureExtension retrieves the static driver field and saves a real screenshot on failure. RefactoredWorkflowTest conditionally adds --headless=new based on the CI environment variable and uses the page object instead of raw locators.",
        files: [
          {
            path: "src/main/java/com/visaspark/selenium/pages/SearchPage.java",
            content: `package com.visaspark.selenium.pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class SearchPage {
    private final WebDriver driver;
    private final WebDriverWait wait;
    private final By searchLink = By.cssSelector("a[href*='documentation']");

    public SearchPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void open() {
        driver.get("https://www.selenium.dev");
    }

    public void goToDocumentation() {
        wait.until(ExpectedConditions.elementToBeClickable(searchLink)).click();
    }
}
`,
          },
          {
            path: "src/test/java/com/visaspark/selenium/ScreenshotOnFailureExtension.java",
            content: `package com.visaspark.selenium;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestWatcher;
import org.openqa.selenium.*;
import java.io.File;
import java.nio.file.*;

public class ScreenshotOnFailureExtension implements TestWatcher {
    @Override
    public void testFailed(ExtensionContext context, Throwable cause) {
        WebDriver driver = RefactoredWorkflowTest.driver;
        if (driver == null) return;
        File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        try {
            Files.copy(screenshot.toPath(),
                Paths.get("failure-" + context.getDisplayName().replace(" ", "_") + ".png"));
        } catch (Exception e) {
            System.err.println("could not save screenshot: " + e.getMessage());
        }
    }
}
`,
          },
          {
            path: "src/test/java/com/visaspark/selenium/RefactoredWorkflowTest.java",
            content: `package com.visaspark.selenium;

import com.visaspark.selenium.pages.SearchPage;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(ScreenshotOnFailureExtension.class)
class RefactoredWorkflowTest {
    static WebDriver driver;

    @BeforeEach
    void setup() {
        ChromeOptions options = new ChromeOptions();
        if (System.getenv("CI") != null) {
            options.addArguments("--headless=new");
        }
        driver = new ChromeDriver(options);
    }

    @AfterEach
    void teardown() {
        driver.quit();
    }

    @Test
    void refactoredWorkflowUsesPageObjects() {
        SearchPage searchPage = new SearchPage(driver);
        searchPage.open();
        searchPage.goToDocumentation();
        assertTrue(driver.getCurrentUrl().contains("documentation"));
    }
}
`,
          },
        ],
      },
      extensionChallenge:
        "Configure a GitHub Actions (or equivalent) workflow file that runs `CI=true mvn test` on every push, uploading target/surefire-reports/ and any failure-*.png files as CI artifacts, so a failure's screenshot is genuinely retrievable from the CI run itself, not just from a local machine.",
    },
    commonMistakes: [
      "Leaving raw findElement calls scattered directly in test methods instead of extracting a page object, especially once the same locators are needed across more than one test -- this is exactly the reuse-earns-the-structure principle from earlier in this course, applied at the point it starts to matter.",
      "Assuming a test failing only in headless mode means headless mode itself is broken, rather than investigating a real, hidden bug (a focus-dependent interaction, a rendering-timing race) the headed run happened to mask.",
      "Relying on a human to notice a failure and manually screenshot it before the browser window closes -- this depends on someone watching at exactly the right moment; an automated TestWatcher-based capture removes that dependency entirely.",
    ],
    quiz: [
      {
        id: "sel-q12-1",
        prompt: "What does headless mode actually change about how a browser runs?",
        choices: [
          "It uses a simplified, lower-fidelity rendering engine",
          "It runs the exact same real browser engine, genuinely rendering and executing the same page, just without displaying a visible window",
          "It disables JavaScript execution on the page",
          "It only works with Firefox, not Chrome",
        ],
        correctIndex: 1,
        explanation:
          "Headless mode is not a reduced-fidelity simulation — it's the same real engine doing the same real rendering and execution; the only difference is that no window is displayed, which is exactly why a correctly-written test should behave identically in both modes.",
      },
      {
        id: "sel-q12-2",
        prompt:
          "If a test passes headed but fails specifically in headless mode, what should be suspected first?",
        choices: [
          "Headless mode is inherently broken and should be avoided",
          "A real, hidden bug the headed run happened to mask -- such as code depending on window focus or a rendering-timing-sensitive race condition",
          "This scenario cannot actually happen",
          "The test file must be rewritten in a different language",
        ],
        correctIndex: 1,
        explanation:
          "Since headless runs the same real engine, a genuine behavior difference between modes usually points to a real, previously-hidden issue in the test or application (something depending on visible-window focus, or timing that happened to work out differently) rather than headless mode itself being at fault.",
      },
      {
        id: "sel-q12-3",
        prompt:
          "Why use a JUnit TestWatcher extension to capture failure screenshots instead of relying on a developer to do it manually?",
        choices: [
          "TestWatcher is required by JUnit for all tests",
          "It automates something that otherwise depends on a human noticing a failure and acting on it at exactly the right moment -- exactly when they're least likely to remember, under the pressure of an unexpected failure",
          "Manual screenshots are always more accurate",
          "TestWatcher only works with Selenium, not other libraries",
        ],
        correctIndex: 1,
        explanation:
          "This is the same automation-over-manual-discipline principle behind guaranteed driver cleanup: relying on a human to remember to act correctly, every time, under exactly the conditions (an unexpected failure) that make remembering hardest, is far less reliable than an automated hook that runs unconditionally.",
      },
    ],
    takeaway:
      "Maven Surefire produces CI-consumable XML reports automatically; headless mode is the same real browser engine with no visible window, so behavior differences between headed and headless runs are a real signal worth investigating, not a headless-mode limitation; and automating failure-screenshot capture via TestWatcher removes the dependency on a human noticing and acting at the right moment.",
    summary:
      "Maven Surefire's XML reports under target/surefire-reports/ are natively consumable by most CI platforms. Headless mode runs the identical real browser engine with no visible window — a test that only passes in one mode usually reveals a real bug. A JUnit TestWatcher extension automates failure-screenshot capture, removing reliance on manual, human-timed intervention.",
    nextLessonSlug: "sel-maintainable-design",
  },
  {
    id: "sel-maintainable-design",
    slug: "sel-maintainable-design",
    title: "Maintainable Selenium Design",
    description:
      "Bringing this course's tools together into structural habits that keep a growing Selenium suite navigable — and the anti-patterns that quietly turn a suite into a maintenance burden.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 12,
    difficulty: "advanced",
    estimatedMinutes: 21,
    prerequisites: ["sel-reporting-ci"],
    objectives: [
      "Identify the structural choices that keep a growing Selenium suite maintainable",
      "Recognize the specific anti-patterns this course has covered when they reappear together",
      "Design a locator and wait strategy that stays consistent across an entire suite, not just one test",
    ],
    skills: ["selenium", "maintainable-design", "architecture"],
    tech: [{ name: "Selenium WebDriver", version: "4.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Selenium docs: Best practices",
        url: "https://www.selenium.dev/documentation/test_practices/encouraged/",
      },
    ],
    keywords: ["maintainable design", "anti-patterns", "selenium"],
    explanation: `A maintainable Selenium suite draws together nearly every tool this course has covered into consistent, deliberate habits, applied **suite-wide**, not just in the one test currently being written: **page and component objects** for every page/fragment genuinely reused across multiple tests; **explicit waits with specific conditions** as the default synchronization strategy, never mixed with implicit waits; **stable locators** (id, meaningful attributes, or a deliberately-added \`data-testid\`-style hook) chosen consistently, not a different strategy per test depending on what happened to work first; **fresh driver per test** via JUnit lifecycle, always; and **unique, generated test data**, always, regardless of whether the suite currently runs in parallel.

The genuinely valuable skill at this point isn't learning any *one* of these in isolation — this course has already covered each — it's recognizing when **several of this course's specific anti-patterns show up together** in a real, messy suite, since they compound: a suite mixing implicit and explicit waits, using structural XPath locators, sharing driver instances across tests, and hard-coding test data isn't four independent, minor issues — it's one suite where almost every failure is genuinely hard to diagnose, because any given failure could plausibly be caused by any of the four, and they can interact to produce failures none of them would cause alone.

**Consistency across the whole suite**, not just correctness in any one test, is what actually keeps a Selenium codebase navigable as it grows past a handful of tests: a new team member reading any test should be able to predict, correctly, how locators are chosen, how waits are structured, and how test data is generated — because those choices were made deliberately once, documented or made obvious by consistent practice, and applied everywhere, rather than reinvented slightly differently in every new test file. A suite where every test "does it a little differently" imposes a real, compounding cost: understanding any one test stops being enough to predict how the next one works.`,
    example: {
      language: "javascript",
      description:
        "Modeling how this course's specific anti-patterns compound when several appear together in the same suite.",
      code: `function suiteRiskScore(antiPatterns) {
  // Each individual anti-pattern is a real, known problem on its own --
  // but they compound: a suite exhibiting several is harder to diagnose
  // than the sum of each issue in isolation would suggest.
  const knownAntiPatterns = [
    "mixedImplicitExplicitWaits",
    "structuralLocators",
    "sharedDriverAcrossTests",
    "hardCodedTestData",
  ];
  const present = antiPatterns.filter((p) => knownAntiPatterns.includes(p));
  return { count: present.length, compoundingRisk: present.length >= 2 };
}

console.log(suiteRiskScore(["structuralLocators"]));
// { count: 1, compoundingRisk: false } -- one issue, still diagnosable in isolation

console.log(suiteRiskScore(["structuralLocators", "sharedDriverAcrossTests", "hardCodedTestData"]));
// { count: 3, compoundingRisk: true } -- ANY failure could plausibly stem from any of the three`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call suiteRiskScore with all four known anti-patterns present, and confirm it correctly flags maximum compounding risk.",
      code: `function suiteRiskScore(antiPatterns) {
  const knownAntiPatterns = ["mixedImplicitExplicitWaits", "structuralLocators", "sharedDriverAcrossTests", "hardCodedTestData"];
  const present = antiPatterns.filter((p) => knownAntiPatterns.includes(p));
  return { count: present.length, compoundingRisk: present.length >= 2 };
}
console.log(suiteRiskScore(["mixedImplicitExplicitWaits", "structuralLocators", "sharedDriverAcrossTests", "hardCodedTestData"]));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write suiteRiskScore(antiPatterns) exactly as modeled: filter antiPatterns down to only the four known ones ('mixedImplicitExplicitWaits','structuralLocators','sharedDriverAcrossTests','hardCodedTestData'), and return {count, compoundingRisk: count >= 2}.",
      starterCode: `function suiteRiskScore(antiPatterns) {
  // TODO
}
`,
      solutionCode: `function suiteRiskScore(antiPatterns) {
  const knownAntiPatterns = ["mixedImplicitExplicitWaits", "structuralLocators", "sharedDriverAcrossTests", "hardCodedTestData"];
  const present = antiPatterns.filter((p) => knownAntiPatterns.includes(p));
  return { count: present.length, compoundingRisk: present.length >= 2 };
}`,
      harness: `
        try { const r = suiteRiskScore(["structuralLocators"]); window.__report('t1', r.count === 1 && r.compoundingRisk === false, 'a single anti-pattern should not be flagged as compounding'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = suiteRiskScore(["structuralLocators","hardCodedTestData"]); window.__report('t2', r.count === 2 && r.compoundingRisk === true, 'two anti-patterns together should be flagged as compounding'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = suiteRiskScore(["somethingUnrelated"]); window.__report('t3', r.count === 0, 'an unrecognized issue should not count toward the known anti-pattern list'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a single anti-pattern is not flagged as compounding" },
        { id: "t2", description: "two anti-patterns together are flagged as compounding" },
        { id: "t3", description: "an unrecognized issue is correctly excluded from the count" },
      ],
      hints: [
        "This ties together the four SPECIFIC anti-patterns this course has covered across its lessons, not a generic list.",
        "Array.prototype.filter with includes() narrows down to only the recognized set.",
      ],
    },
    independentExercise: {
      id: "sel-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write predictLocatorStrategy(suiteConvention, elementHasId) modeling suite-wide CONSISTENCY: if suiteConvention is 'id-first' and elementHasId is true, return 'id'; if suiteConvention is 'id-first' and elementHasId is false, return 'cssSelector' (the documented fallback); if suiteConvention is anything else, return 'inconsistent-suite -- cannot predict'.",
      starterCode: `function predictLocatorStrategy(suiteConvention, elementHasId) {
  // TODO
}
`,
      solutionCode: `function predictLocatorStrategy(suiteConvention, elementHasId) {
  if (suiteConvention === "id-first") {
    return elementHasId ? "id" : "cssSelector";
  }
  return "inconsistent-suite -- cannot predict";
}`,
      harness: `
        try { window.__report('t1', predictLocatorStrategy("id-first", true) === "id", 'a consistent suite convention should make the strategy predictable'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', predictLocatorStrategy("id-first", false) === "cssSelector", 'the documented fallback should apply when no id exists'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', predictLocatorStrategy("random", true) === "inconsistent-suite -- cannot predict", 'an inconsistent suite convention should be honestly unpredictable'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "predicts the correct strategy under a consistent convention" },
        { id: "t2", description: "correctly applies the documented fallback" },
        { id: "t3", description: "honestly reports unpredictability for an inconsistent suite" },
      ],
      hints: [
        "This models exactly why suite-WIDE consistency matters: a new team member should be able to predict locator choices, not guess per-test.",
        "The 'inconsistent-suite' case is deliberately honest -- there's no way to predict behavior a suite hasn't actually committed to consistently.",
      ],
    },
    commonMistakes: [
      "Treating each of this course's anti-patterns as an independent, isolated concern rather than recognizing they compound when several appear together in the same real suite, making diagnosis significantly harder than any one issue alone would suggest.",
      "Letting every new test file 'do it a little differently' (a different wait strategy, a different locator convention) instead of committing to one consistent approach suite-wide -- this means understanding one test never helps predict how the next one works.",
      "Prioritizing getting one test passing quickly over the suite-wide consistency that keeps the whole codebase navigable as it grows -- a shortcut in one test becomes a real inconsistency the next person has to reconcile.",
    ],
    quiz: [
      {
        id: "sel-q13-1",
        prompt:
          "Why is a suite exhibiting several of this course's anti-patterns together worse than the sum of each issue considered separately?",
        choices: [
          "It isn't; each anti-pattern's cost is purely additive",
          "The anti-patterns compound and interact -- any given failure could plausibly stem from any of them, or from an interaction between them, making diagnosis significantly harder than any single issue alone",
          "Multiple anti-patterns automatically cancel each other out",
          "Selenium specifically prevents more than one anti-pattern from being present at once",
        ],
        correctIndex: 1,
        explanation:
          "When several specific, real issues (mixed waits, fragile locators, shared driver state, colliding test data) are present simultaneously, a given failure's root cause becomes genuinely ambiguous among several plausible explanations — the diagnostic cost is not simply additive, it compounds.",
      },
      {
        id: "sel-q13-2",
        prompt:
          "What does suite-wide consistency in locator strategy, wait strategy, and test-data generation actually provide?",
        choices: [
          "Nothing beyond aesthetic preference",
          "It lets anyone reading a new test correctly predict how it's structured, based on established, consistent conventions, rather than needing to learn each test's idiosyncratic choices individually",
          "Consistency only matters for very large suites, never smaller ones",
          "It guarantees zero test failures",
        ],
        correctIndex: 1,
        explanation:
          "The real, practical value of suite-wide consistency is predictability: a team member's understanding of one test's conventions genuinely transfers to the next test, rather than every file requiring its own separate learning — this is what keeps a growing suite navigable rather than accumulating unique, undocumented quirks per file.",
      },
      {
        id: "sel-q13-3",
        prompt:
          "What is the real, compounding cost of a suite where 'every test does it a little differently'?",
        choices: [
          "There is no real cost; variety keeps a suite interesting",
          "Understanding any one test stops being sufficient to predict how the next one works, since conventions were reinvented per-file rather than established once and applied consistently",
          "This only affects suite performance, not maintainability",
          "Selenium automatically normalizes inconsistent conventions",
        ],
        correctIndex: 1,
        explanation:
          "The whole value of a consistent convention is that it transfers — once broken by per-file reinvention, every new test requires learning its own specific choices from scratch, which is exactly the compounding maintenance cost this lesson is warning against.",
      },
    ],
    takeaway:
      "This course's individual tools (page objects, explicit waits, stable locators, fresh drivers, unique test data) matter most when applied consistently across an entire suite — several of the anti-patterns compounding together in one real suite is a genuinely harder diagnostic problem than any single issue in isolation, and suite-wide consistency is what actually keeps a growing codebase predictable and navigable.",
    summary:
      "A maintainable Selenium suite applies this course's tools (page/component objects, explicit waits, stable locators, fresh driver per test, unique test data) consistently, suite-wide, not per-test. This course's specific anti-patterns compound when several appear together in the same real suite, making diagnosis genuinely harder. Suite-wide consistency, not just per-test correctness, is what keeps a growing codebase predictable.",
    nextLessonSlug: "sel-security-secrets",
  },
  {
    id: "sel-security-secrets",
    slug: "sel-security-secrets",
    title: "Security and Secret Handling in Selenium Suites",
    description:
      "Keeping real credentials out of a Selenium suite's committed code entirely, and the specific risks a real, credential-driven browser automation suite needs to manage deliberately.",
    trackSlug: "selenium",
    courseSlug: "selenium-webdriver-automation",
    order: 13,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["sel-maintainable-design"],
    objectives: [
      "Design test credential handling that never commits a real secret to version control",
      "Explain the specific risk a captured screenshot or trace can pose if taken carelessly",
      "Identify what a test-only account should and shouldn't be able to do",
    ],
    skills: ["selenium", "security", "secrets"],
    tech: [{ name: "Selenium WebDriver", version: "4.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "OWASP: Secrets Management Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      },
    ],
    keywords: ["security", "secrets", "credentials", "selenium"],
    explanation: `A Selenium suite that logs in as part of its normal operation genuinely needs credentials **somewhere** — the discipline this course has referenced throughout (environment variables, never literal values in committed files) applies here with the same force as anywhere else: \`String username = System.getenv("TEST_USER");\`, never \`String username = "realuser@company.com";\` hard-coded directly in a committed \`.java\` file. A committed \`.env.example\` (listing variable *names* only, with no real values) documents what a real, local, gitignored \`.env\` needs to supply, and a CI platform's own secret-store mechanism supplies the same variables in that environment — the committed code never contains, or needs to contain, the actual secret value at any point.

**Captured artifacts carry a real, specific, easy-to-overlook risk**: a screenshot or a trace taken during a real, credentialed test run can genuinely contain sensitive data visible on the page at that moment — a real (if test-only) account's email, a password briefly visible in an unmasked field, session tokens embedded in a URL, or personally-identifiable data if the test environment happens to contain any. Before treating "capture screenshots on every failure" as an unconditionally safe default, it's worth confirming a test environment's data is genuinely synthetic (dummy accounts, dummy content) — capturing evidence from a test suite that happens to run against a copy of real production data is a genuinely different, higher-risk situation than capturing evidence from data specifically created for testing.

A **test-only account** should be provisioned with the **least privilege actually needed** for the scenarios it drives, the same principle covered for database roles in an entirely different context (if you've taken this platform's PostgreSQL course) — a test account used only to verify a learner-facing dashboard has no legitimate reason to also hold administrative privileges, and giving it more access than its actual test scenarios require expands the blast radius if that test account's credentials are ever compromised, for zero real benefit to what the tests actually need to verify. Rotating test credentials periodically, and immediately if a leak is ever suspected, applies the same operational discipline used for any other credential — a test account is a real account with real access, not somehow exempt from the security practices that apply to every other credential in a system.`,
    example: {
      language: "javascript",
      description:
        "Modeling the env-var-name-not-value discipline and least-privilege test-account provisioning, as data.",
      code: `function isSafeCredentialReference(codeValue) {
  // A safe committed reference NAMES an environment variable; it never
  // contains a literal-looking real value.
  return typeof codeValue === "string" && codeValue.startsWith("System.getenv(");
}
console.log(isSafeCredentialReference('System.getenv("TEST_USER")')); // true -- safe reference
console.log(isSafeCredentialReference("realuser@company.com"));         // false -- a literal value should never appear here

function isLeastPrivilege(testAccountRole, scenariosNeeded) {
  const rolePrivileges = { learner: ["view-dashboard", "complete-lesson"], admin: ["view-dashboard", "complete-lesson", "delete-users", "manage-billing"] };
  const granted = rolePrivileges[testAccountRole] ?? [];
  const unnecessary = granted.filter((p) => !scenariosNeeded.includes(p));
  return unnecessary.length === 0;
}
console.log(isLeastPrivilege("learner", ["view-dashboard", "complete-lesson"])); // true -- exactly what's needed
console.log(isLeastPrivilege("admin", ["view-dashboard", "complete-lesson"]));    // false -- admin grants far more than these scenarios need`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call isSafeCredentialReference with a value that LOOKS like an env-var call but has a real value concatenated in, and consider whether this simple check would actually catch that.",
      code: `function isSafeCredentialReference(codeValue) {
  return typeof codeValue === "string" && codeValue.startsWith("System.getenv(");
}
console.log(isSafeCredentialReference('System.getenv("TEST_USER") + "-realsuffix@company.com"'));`,
      editable: true,
    },
    guidedExercise: {
      id: "sel-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isSafeCredentialReference(codeValue) returning true only if codeValue is a string starting with 'System.getenv(' (a safe environment-variable reference), false otherwise.",
      starterCode: `function isSafeCredentialReference(codeValue) {
  // TODO
}
`,
      solutionCode: `function isSafeCredentialReference(codeValue) {
  return typeof codeValue === "string" && codeValue.startsWith("System.getenv(");
}`,
      harness: `
        try { window.__report('t1', isSafeCredentialReference('System.getenv("TEST_USER")') === true, 'an env-var reference should be safe'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isSafeCredentialReference("hardcoded@company.com") === false, 'a literal-looking value should not be considered safe'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isSafeCredentialReference(12345) === false, 'a non-string value should not be considered safe'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "recognizes a genuine env-var reference as safe" },
        { id: "t2", description: "rejects a literal-looking hard-coded value" },
        { id: "t3", description: "rejects a non-string value" },
      ],
      hints: [
        "String.prototype.startsWith is a simple, direct way to check this pattern.",
        "This models exactly the discipline this course has referenced throughout: reference the variable name, never the real value, in committed code.",
      ],
    },
    independentExercise: {
      id: "sel-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isLeastPrivilege(grantedPrivileges, scenariosNeeded) returning true only if EVERY privilege in grantedPrivileges is actually present in scenariosNeeded (no unnecessary extra access granted). Then write blastRadius(grantedPrivileges) returning grantedPrivileges.length as a simple, concrete proxy for how much damage a compromised account's credentials could do.",
      starterCode: `function isLeastPrivilege(grantedPrivileges, scenariosNeeded) {
  // TODO
}
function blastRadius(grantedPrivileges) {
  // TODO
}
`,
      solutionCode: `function isLeastPrivilege(grantedPrivileges, scenariosNeeded) {
  return grantedPrivileges.every((p) => scenariosNeeded.includes(p));
}
function blastRadius(grantedPrivileges) {
  return grantedPrivileges.length;
}`,
      harness: `
        try { window.__report('t1', isLeastPrivilege(["view-dashboard"], ["view-dashboard","complete-lesson"]) === true, 'granting only what a subset of needed scenarios use should be least-privilege'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isLeastPrivilege(["view-dashboard","delete-users"], ["view-dashboard"]) === false, 'granting an unnecessary privilege should fail the least-privilege check'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', blastRadius(["view-dashboard","complete-lesson","delete-users","manage-billing"]) === 4, 'blast radius should count every granted privilege'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly confirms a least-privilege grant" },
        { id: "t2", description: "correctly flags an over-privileged grant" },
        { id: "t3", description: "computes blast radius as a simple count of granted privileges" },
      ],
      hints: [
        "Array.prototype.every checks that ALL granted privileges are justified by actual need.",
        "This mirrors the exact same least-privilege reasoning covered for database roles elsewhere on this platform, applied here to a test account's access.",
      ],
    },
    commonMistakes: [
      "Hard-coding a real (even if 'just a test account') credential directly in a committed test file -- credentials belong in environment variables, referenced by name only, regardless of how disposable the account seems.",
      "Enabling automatic screenshot/trace capture on every failure without confirming the test environment's data is genuinely synthetic -- captured evidence from a suite running against real or real-derived data carries genuine sensitive-data exposure risk.",
      "Provisioning a test account with more privilege than its actual test scenarios need, 'just in case a future test needs it' -- this expands the real blast radius of a credential leak for no benefit to the tests that actually exist today.",
    ],
    quiz: [
      {
        id: "sel-q14-1",
        prompt:
          'Why should a Selenium test\'s credentials be referenced via System.getenv("TEST_USER") rather than a literal string, even for a disposable test account?',
        choices: [
          "Test account credentials don't need any protection since they're 'just for testing'",
          "Committed code is version-controlled history; a literal credential value, once committed, remains recoverable from that history even if later removed -- referencing an environment variable name never exposes the actual value at all",
          "System.getenv() is required by Java syntax rules",
          "This only matters for production credentials, never test ones",
        ],
        correctIndex: 1,
        explanation:
          "A test account is still a real account with real access — and more fundamentally, once a literal secret is committed, it typically remains recoverable from version-control history even after being 'removed' in a later commit, which is exactly why the discipline of referencing only variable names, never real values, in committed code matters regardless of how disposable the account seems.",
      },
      {
        id: "sel-q14-2",
        prompt: "What real risk can an automatically-captured failure screenshot or trace pose?",
        choices: [
          "None; captured artifacts are always safe to store and share freely",
          "It can genuinely contain sensitive data visible on the page at that moment -- account details, a briefly-visible password, session tokens in a URL, or real/real-derived data if the test environment isn't genuinely synthetic",
          "Screenshots can never contain any text-based information",
          "This risk only applies to video captures, never still screenshots",
        ],
        correctIndex: 1,
        explanation:
          "A screenshot or trace is a genuine, literal capture of whatever was visible on the page at that instant — if the test environment's data isn't confirmed to be synthetic, or if a field happened to display sensitive information unmasked, that risk carries directly into the captured artifact.",
      },
      {
        id: "sel-q14-3",
        prompt:
          "Why shouldn't a test account be granted more privilege than its actual test scenarios require?",
        choices: [
          "Extra privilege makes tests run faster",
          "Unnecessary extra access expands the real blast radius if that account's credentials are ever compromised, with no benefit to the test scenarios that actually exist",
          "Selenium technically cannot support accounts with limited privilege",
          "This only matters for production accounts, not test accounts",
        ],
        correctIndex: 1,
        explanation:
          "The same least-privilege reasoning that applies to any account applies here: a test account is real access to a real system, and granting it more than its actual, current test scenarios need only increases what a compromised credential could do, without making any existing test more capable or useful.",
      },
    ],
    takeaway:
      "Test credentials belong in environment variables, referenced by name only, never as literal values in committed code, regardless of how disposable the account seems; captured failure artifacts can genuinely expose sensitive data if the test environment isn't confirmed synthetic; and a test account should hold only the privilege its actual scenarios need, to limit the real blast radius of a potential credential leak.",
    summary:
      "Reference test credentials via environment variables (System.getenv), never literal values, in committed code — a committed .env.example documents variable names only. Captured screenshots/traces can expose real sensitive data if the test environment isn't genuinely synthetic. Provision test accounts with least privilege, matching only their actual test scenarios' real needs.",
  },
];
