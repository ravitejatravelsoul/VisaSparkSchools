import type { LessonInput } from "@/lib/content/types";

/**
 * Software Testing Foundations.
 *
 * There is no dedicated "test execution" runner in this platform, and this
 * course does not need one: testing is a design and analysis discipline, not
 * a programming language. Every guided/independent exercise represents the
 * learner's testing *decisions* (which partitions, which boundary values,
 * which decision-table rows) as small, deterministic JavaScript values, then
 * checks those decisions against the real technique's rules via the existing
 * HTML/JS sandbox's harness -- exactly the same execution model the
 * JavaScript course uses, just applied to test-design correctness instead of
 * general programming. This keeps every exercise genuinely checkable without
 * pretending to execute a real test suite (see docs/ARCHITECTURE.md).
 */
export const softwareTestingLessons: LessonInput[] = [
  {
    id: "st-quality-vs-testing",
    slug: "st-quality-vs-testing",
    title: "Quality Is Everyone's Job, Testing Is a Discipline",
    description:
      'What "quality" actually means for software, and how testing — one specific, learnable discipline — supports it without being solely responsible for it.',
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 16,
    prerequisites: [],
    objectives: [
      "Distinguish software quality from software testing",
      'Name at least four quality characteristics beyond "it works"',
      "Explain why testing can show the presence of defects but never their absence",
    ],
    skills: ["software-testing", "quality-engineering"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISO/IEC 25010:2011 System and Software Quality Models (official standard)",
        url: "https://www.iso.org/standard/35733.html",
      },
    ],
    keywords: ["software testing", "quality", "QA", "quality assurance", "defects"],
    explanation: `A team ships a login form. It logs users in correctly every time. Is it "quality" software?

Maybe not. It might be slow on a phone. It might be unreadable to someone using a screen reader. It might expose a stack trace when the password field is left empty. It might be impossible for a new engineer to safely modify six months from now. **Correctness is one quality characteristic among several** — functionality, reliability, performance, usability, security, compatibility, and maintainability are all part of the widely used ISO/IEC 25010 model. "It works" only covers the first of these.

**Quality is a property of the product, built in by everyone who touches it** — the person who writes the requirement, the person who designs the screen, the person who writes the code, and the person who tests it. **Testing is one specific discipline within that effort**: the deliberate, structured activity of executing a system (or reasoning about it) to find information about its quality, usually by looking for ways it disagrees with what it's supposed to do.

That distinction matters practically. A team that treats "testing" as the only quality activity — write the code, then throw it over a wall to testers — will keep shipping defects that testing catches too late to fix cheaply, because the requirement was already ambiguous or the design already made a state impossible to represent correctly. A team that treats quality as everyone's job, with testing as the specialist activity that provides evidence, catches problems earlier and cheaper.

There's a famous, precise limitation worth internalizing early: **testing can show that defects are present. It can never prove that they are absent.** Running a hundred passing tests against a function does not prove the function is correct for every possible input — it proves those hundred inputs behaved as expected. This is why test *design* (choosing which cases actually matter) is the real skill this course teaches, not just running checks.`,
    example: {
      language: "javascript",
      description:
        'A simple age-validation function. It "works" for the cases the author thought of — testing exists to find the ones they didn\'t.',
      code: `function isAdult(age) {
  return age >= 18;
}

console.log(isAdult(25)); // true
console.log(isAdult(10)); // false
console.log(isAdult(18)); // true — but did the author mean 18 or older, or over 18?
// console.log(isAdult(-5));   // negative age: what should happen?
// console.log(isAdult("18")); // a string instead of a number: what happens?`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Uncomment each commented line one at a time and press Run. Neither crashes — but do either return the *right* answer for a real system?",
      code: `function isAdult(age) {
  return age >= 18;
}

console.log(isAdult(18));
// console.log(isAdult(-5));
// console.log(isAdult("18"));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        'A product owner says a page must "load quickly and work for everyone." List which ISO 25010-style quality characteristics that sentence actually touches by setting each flag to true or false: touchesPerformance, touchesUsability, touchesFunctionality.',
      starterCode: `// Set each flag to true or false.
const touchesPerformance = null; // TODO
const touchesUsability = null; // TODO
const touchesFunctionality = null; // TODO
`,
      solutionCode: `const touchesPerformance = true;
const touchesUsability = true;
const touchesFunctionality = false;`,
      harness: `
        try { window.__report('t1', touchesPerformance === true, '"load quickly" is a performance characteristic.'); } catch (e) { window.__report('t1', false, 'touchesPerformance is not defined: ' + e.message); }
        try { window.__report('t2', touchesUsability === true, '"work for everyone" is a usability/accessibility characteristic.'); } catch (e) { window.__report('t2', false, 'touchesUsability is not defined: ' + e.message); }
        try { window.__report('t3', touchesFunctionality === false, 'Neither phrase specifies a functional behavior — it says nothing about *what* the page must do.'); } catch (e) { window.__report('t3', false, 'touchesFunctionality is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly flags performance", hidden: false },
        { id: "t2", description: "correctly flags usability", hidden: false },
        { id: "t3", description: "correctly flags functionality", hidden: false },
      ],
      hints: [
        '"Quickly" is about time and responsiveness, not about whether the feature is present.',
        '"For everyone" is about who can use it, including people using assistive technology.',
        "The sentence never says what the page actually does when used — so it says nothing functional.",
      ],
    },
    independentExercise: {
      id: "st-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        'A bug report says: "The checkout button is on-screen in the correct place, uses correct colors, and the click handler correctly charges the card — but it takes 9 seconds to respond." Set isFunctionalDefect and isPerformanceDefect to reflect which characteristic(s) this report is actually about.',
      starterCode: `const isFunctionalDefect = null; // TODO
const isPerformanceDefect = null; // TODO
`,
      solutionCode: `const isFunctionalDefect = false;
const isPerformanceDefect = true;`,
      harness: `
        try { window.__report('t1', isFunctionalDefect === false, 'The button does everything it is supposed to do correctly — nothing functional is wrong.'); } catch (e) { window.__report('t1', false, 'isFunctionalDefect is not defined: ' + e.message); }
        try { window.__report('t2', isPerformanceDefect === true, 'A 9-second response time is a performance problem.'); } catch (e) { window.__report('t2', false, 'isPerformanceDefect is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly identifies it is not a functional defect",
          hidden: false,
        },
        { id: "t2", description: "correctly identifies it is a performance defect", hidden: false },
      ],
      hints: [
        "Ask: does the feature do the wrong thing, or does it do the right thing too slowly?",
        "Correct placement, correct colors, and a correctly-working charge are all functional successes.",
      ],
    },
    commonMistakes: [
      'Treating "testing" and "quality assurance" as synonyms — testing produces evidence about quality; it does not by itself assure quality exists.',
      'Assuming a passing test suite means the software has no bugs, rather than "no bugs in the cases we thought to check."',
      "Reducing quality to functional correctness and ignoring performance, usability, security, and maintainability.",
    ],
    quiz: [
      {
        id: "st-1-q1",
        prompt: "What is the most accurate relationship between testing and quality?",
        choices: [
          "Testing and quality are the same activity",
          "Testing is one discipline that provides evidence to support quality, which is a shared responsibility",
          "Quality is only the tester's responsibility",
          "Testing guarantees quality once it passes",
        ],
        correctIndex: 1,
        explanation:
          "Quality is built in by everyone across the process; testing is the specific discipline of finding information about how well the product meets expectations.",
      },
      {
        id: "st-1-q2",
        prompt: "Which statement about testing's limits is correct?",
        choices: [
          "Testing can prove software has zero defects if enough tests pass",
          "Testing can show the presence of defects but never prove their absence",
          "Testing is unnecessary if the code review was thorough",
          "Testing only applies to user interfaces",
        ],
        correctIndex: 1,
        explanation:
          "This is a foundational limitation of testing: passing tests are evidence, not proof of a defect-free system, since untested inputs and paths always remain possible.",
      },
      {
        id: "st-1-q3",
        prompt:
          "A feature works correctly but is unusable by screen-reader users. Which quality characteristic is failing?",
        choices: ["Functionality", "Usability/accessibility", "Portability", "Maintainability"],
        correctIndex: 1,
        explanation:
          "The feature's logic (functionality) is fine — the failure is in whether the intended range of users can actually use it, which is a usability/accessibility concern.",
      },
    ],
    takeaway:
      "Quality is a broad, shared property of software; testing is the specific, learnable discipline of generating evidence about it — and even a perfect test run is evidence, not proof.",
    summary:
      "This lesson separated software quality (a multi-dimensional product property) from software testing (one discipline that investigates it), and introduced the core limitation that testing shows the presence, not the absence, of defects.",
    nextLessonSlug: "st-requirements-analysis",
  },
  {
    id: "st-requirements-analysis",
    slug: "st-requirements-analysis",
    title: "Turning Requirements Into Testable Statements",
    description:
      "Why vague requirements produce vague tests, and how to rewrite an ambiguous requirement into something you can actually design test cases against.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["st-quality-vs-testing"],
    objectives: [
      "Identify ambiguity, missing information, and untestable phrasing in a requirement",
      "Rewrite an ambiguous requirement as a precise, testable statement",
      "Generate clarifying questions a requirement's ambiguity should raise",
    ],
    skills: ["software-testing", "requirements-analysis"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Requirement",
        url: "https://glossary.istqb.org/en_US/term/requirement",
      },
    ],
    keywords: ["requirements analysis", "ambiguity", "acceptance criteria", "testability"],
    explanation: `"The system should respond quickly." A tester handed this requirement has nothing to test against — quickly compared to what? Under what load? Measured where? **A requirement that cannot be tested is not really a requirement yet; it is a hope.**

Requirements analysis, for a tester, means reading a requirement the way a skeptical reader reads a contract: what does this actually commit to, and what is left dangerously open? Three failure patterns show up constantly:

**Ambiguity** — a word admits more than one reasonable interpretation. "The user should be logged out after a period of inactivity" — five minutes? An hour? Does moving the mouse count as activity, or only clicks?

**Missing information** — the requirement is silent about a case that will definitely occur. "Users can upload a profile photo" says nothing about file size limits, allowed formats, or what happens when the upload fails partway through. Silence is not a specification; it's a gap a real user will eventually fall into.

**Untestable phrasing** — a requirement uses subjective or unmeasurable language. "The interface should be intuitive" cannot be verified by any concrete test — there is no observable pass/fail condition. It needs to become something like "a new user can complete checkout without external help in under 3 minutes, verified via a usability session."

The fix is always the same move: **turn a vague sentence into a precise, measurable, falsifiable one**, then write down the questions the ambiguity raises so a real stakeholder can answer them before code gets written — not after a defect report is filed. This is cheaper for everyone: a clarifying question costs a Slack message; a defect found in production costs a support ticket, a hotfix, and a customer's trust.`,
    example: {
      language: "javascript",
      description:
        "A vague requirement rewritten as a precise one, and a small function that encodes the precise version so it can actually be checked.",
      code: `// Vague: "Passwords must be strong."
// Precise: "A password is valid only if it is at least 8 characters
// AND contains at least one digit."

function isValidPassword(password) {
  return password.length >= 8 && /\\d/.test(password);
}

console.log(isValidPassword("short1"));       // false — too short
console.log(isValidPassword("longenough"));   // false — no digit
console.log(isValidPassword("longenough1"));  // true`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change the precise requirement's rule below (e.g. require 10 characters instead of 8), then re-run to see which examples change verdict.",
      code: `function isValidPassword(password) {
  return password.length >= 8 && /\\d/.test(password);
}

console.log(isValidPassword("short1"));
console.log(isValidPassword("longenough"));
console.log(isValidPassword("longenough1"));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        'Requirement: "The search box should return results fast." Identify its problem by setting isAmbiguous, hasMissingInfo, and isUntestable to true or false (more than one may be true).',
      starterCode: `const isAmbiguous = null; // TODO
const hasMissingInfo = null; // TODO
const isUntestable = null; // TODO
`,
      solutionCode: `const isAmbiguous = true;
const hasMissingInfo = true;
const isUntestable = true;`,
      harness: `
        try { window.__report('t1', isAmbiguous === true, '"fast" is ambiguous — fast compared to what baseline?'); } catch (e) { window.__report('t1', false, 'isAmbiguous is not defined: ' + e.message); }
        try { window.__report('t2', hasMissingInfo === true, 'It is silent on data volume, network conditions, and device — all of which affect speed.'); } catch (e) { window.__report('t2', false, 'hasMissingInfo is not defined: ' + e.message); }
        try { window.__report('t3', isUntestable === true, 'As written, there is no measurable pass/fail threshold, so it cannot be tested yet.'); } catch (e) { window.__report('t3', false, 'isUntestable is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "recognizes ambiguity", hidden: false },
        { id: "t2", description: "recognizes missing information", hidden: false },
        { id: "t3", description: "recognizes it is currently untestable", hidden: false },
      ],
      hints: [
        "A requirement can have more than one problem at once — check all three.",
        '"Fast" has no number attached to it anywhere in the sentence.',
        "Without a number and a measurement condition, no test could ever fail this requirement — which means it isn't really testable yet.",
      ],
    },
    independentExercise: {
      id: "st-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        'Rewrite the vague requirement "the search box should return results fast" as a precise, testable one by writing it as a string in preciseRequirement. It must include a concrete time limit and a measurement condition (e.g. under what load or on what connection).',
      starterCode: `let preciseRequirement = ""; // TODO: write a precise, testable requirement
`,
      solutionCode: `let preciseRequirement =
  "For a catalog of up to 10,000 items on a standard broadband connection, search results must render within 500ms of the last keystroke.";`,
      harness: `
        try {
          const r = preciseRequirement.toLowerCase();
          const hasNumber = /\\d/.test(r);
          const hasTimeUnit = /(ms|millisecond|second|sec)\\b/.test(r);
          window.__report('t1', hasNumber && hasTimeUnit, 'Include a concrete number and a time unit (e.g. "500ms" or "2 seconds").');
        } catch (e) { window.__report('t1', false, 'preciseRequirement is not defined: ' + e.message); }
        try {
          const r = preciseRequirement.toLowerCase();
          window.__report('t2', r.length > 40, 'Add enough detail to describe the condition under which the time limit applies (data size, connection, etc.).');
        } catch (e) { window.__report('t2', false, 'preciseRequirement is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "includes a concrete, measurable time limit", hidden: false },
        { id: "t2", description: "describes the condition the limit applies under", hidden: false },
      ],
      hints: [
        'A testable performance requirement always has a number and a unit: "under 500ms", "within 2 seconds".',
        "Also state the condition: what data volume, connection speed, or device is assumed?",
      ],
    },
    commonMistakes: [
      'Accepting a vague requirement as-is and deferring the ambiguity to "we\'ll figure it out during testing" — that just moves the cost later and makes it more expensive.',
      'Treating silence in a requirement as "anything is acceptable" instead of a genuine gap that needs an explicit decision.',
      "Rewriting a requirement to be precise but choosing an arbitrary number nobody agreed to, instead of raising it as a question for the actual stakeholder.",
    ],
    quiz: [
      {
        id: "st-2-q1",
        prompt:
          'Why is "the interface should be intuitive" a problematic requirement for a tester?',
        choices: [
          "It is too short to be a real requirement",
          "It has no measurable, observable pass/fail condition",
          "It only applies to mobile apps",
          "It requires a security review",
        ],
        correctIndex: 1,
        explanation:
          "Untestable requirements use subjective language with no concrete condition a test could verify or fail against.",
      },
      {
        id: "st-2-q2",
        prompt:
          'A requirement says "users can upload a profile photo" and says nothing about file size limits. What kind of problem is this?',
        choices: ["Ambiguity", "Missing information", "Untestable phrasing", "Not a problem"],
        correctIndex: 1,
        explanation:
          "The requirement is silent about a case that will definitely occur (large or invalid files) — that silence is a gap, not a specification.",
      },
      {
        id: "st-2-q3",
        prompt: "What is the cheapest point in the process to resolve a requirement's ambiguity?",
        choices: [
          "After the defect is reported by a customer in production",
          "During a late-stage regression test cycle",
          "Before code is written, by asking a clarifying question",
          "It doesn't matter when it's resolved",
        ],
        correctIndex: 2,
        explanation:
          "A clarifying question before implementation costs a conversation; the same ambiguity discovered as a production defect costs a support ticket, a hotfix, and lost trust.",
      },
    ],
    takeaway:
      "A requirement you cannot design a concrete test case against is not finished — turning it into a precise, measurable statement is a testing skill, not busywork.",
    summary:
      "This lesson covered the three common requirement failure patterns — ambiguity, missing information, and untestable phrasing — and practiced rewriting a vague requirement into a precise, testable one.",
    nextLessonSlug: "st-test-levels",
  },
  {
    id: "st-test-levels",
    slug: "st-test-levels",
    title: "Test Levels: Unit, Integration, System, Acceptance",
    description:
      "The four traditional test levels, what each one actually catches, and why relying on only one of them leaves real gaps.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["st-requirements-analysis"],
    objectives: [
      "Name the four traditional test levels and what scope each one covers",
      "Classify a given test scenario by the level it belongs to",
      "Explain why a defect can pass unit tests but fail at integration or system level",
    ],
    skills: ["software-testing", "test-levels"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Test Level",
        url: "https://glossary.istqb.org/en_US/term/test-level",
      },
    ],
    keywords: [
      "unit testing",
      "integration testing",
      "system testing",
      "acceptance testing",
      "test levels",
    ],
    explanation: `Two functions can each work perfectly alone and still break the moment they're connected. A payment function correctly calculates a total. A checkout function correctly calls "whatever calculates the total." Plugged together, one expects cents and the other passes dollars — both individually correct, both wrong together. This is exactly why testing happens at more than one **level**, each with a different scope and a different kind of defect it's positioned to catch.

**Unit testing** exercises the smallest testable piece of code in isolation — a single function or method — usually by the developer who wrote it, often with dependencies replaced by simple stand-ins. It answers: "does this one piece do what it claims, for the inputs I can enumerate?" It's fast and cheap to run, which is exactly why it's the wrong place to catch a problem that only exists *between* two pieces.

**Integration testing** exercises two or more units together, deliberately targeting the seams: does the payment function receive the total in the unit the checkout function actually sends it in? Integration defects are often the most surprising, because each side individually looks correct — the bug lives in the disagreement between them, not inside either piece.

**System testing** exercises the complete, integrated application against its end-to-end requirements, usually in an environment resembling production. It's the first level where a full user journey — browse, add to cart, pay, receive confirmation — gets exercised as a whole, and where cross-cutting concerns like performance under realistic load first show up meaningfully.

**Acceptance testing** asks a different question entirely: not "does it work" but "is this what the business actually needed?" It's typically performed by or with stakeholders, checking the system against real-world usage and business requirements before a release decision. A system can pass every unit, integration, and system test and still fail acceptance testing, if it was built precisely to the wrong specification.

The levels are not a strict sequence you complete once and never revisit — in an agile team, all four happen continuously, often for the same feature within the same day. What matters is understanding that **each level has a scope, and defects that live outside that scope will simply not be caught there**, no matter how thoroughly you test within it.`,
    example: {
      language: "javascript",
      description:
        "Each function passes in isolation (unit level) — the mismatch only appears once they're called together (integration level).",
      code: `// Unit level: each function is correct on its own.
function calculateTotalCents(items) {
  return items.reduce((sum, item) => sum + item.priceCents, 0);
}
function chargeCard(amountDollars) {
  return \`Charging $\${amountDollars.toFixed(2)}\`;
}

// Integration level: wiring them together reveals the real bug.
const items = [{ priceCents: 500 }, { priceCents: 250 }];
const total = calculateTotalCents(items); // 750 (cents)
console.log(chargeCard(total));           // "Charging $750.00" -- should be $7.50!`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Fix the integration bug by converting cents to dollars before calling chargeCard, then re-run.",
      code: `function calculateTotalCents(items) {
  return items.reduce((sum, item) => sum + item.priceCents, 0);
}
function chargeCard(amountDollars) {
  return \`Charging $\${amountDollars.toFixed(2)}\`;
}

const items = [{ priceCents: 500 }, { priceCents: 250 }];
const total = calculateTotalCents(items);
console.log(chargeCard(total));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Classify each scenario by test level using the strings 'unit', 'integration', 'system', or 'acceptance': scenarioA = testing a single validateEmail() function with 10 sample emails. scenarioB = a product manager checks the finished app against the original business goals before sign-off.",
      starterCode: `let scenarioA = ""; // TODO
let scenarioB = ""; // TODO
`,
      solutionCode: `let scenarioA = "unit";
let scenarioB = "acceptance";`,
      harness: `
        try { window.__report('t1', scenarioA === 'unit', 'Testing one isolated function is unit-level testing.'); } catch (e) { window.__report('t1', false, 'scenarioA is not defined: ' + e.message); }
        try { window.__report('t2', scenarioB === 'acceptance', 'Checking against real business goals before sign-off is acceptance testing.'); } catch (e) { window.__report('t2', false, 'scenarioB is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly classifies scenario A as unit", hidden: false },
        { id: "t2", description: "correctly classifies scenario B as acceptance", hidden: false },
      ],
      hints: [
        "One isolated function, tested alone, is the smallest scope: unit.",
        '"Is this what the business needed?" is the defining question of acceptance testing.',
      ],
    },
    independentExercise: {
      id: "st-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Classify two more scenarios the same way: scenarioC = verifying the checkout module correctly calls the shipping module with the right address format. scenarioD = running the full purchase flow (browse, cart, pay, confirmation email) in a staging environment.",
      starterCode: `let scenarioC = ""; // TODO
let scenarioD = ""; // TODO
`,
      solutionCode: `let scenarioC = "integration";
let scenarioD = "system";`,
      harness: `
        try { window.__report('t1', scenarioC === 'integration', 'Verifying how two modules interact at a seam is integration-level testing.'); } catch (e) { window.__report('t1', false, 'scenarioC is not defined: ' + e.message); }
        try { window.__report('t2', scenarioD === 'system', 'Exercising a full end-to-end journey in a production-like environment is system-level testing.'); } catch (e) { window.__report('t2', false, 'scenarioD is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly classifies scenario C as integration", hidden: false },
        { id: "t2", description: "correctly classifies scenario D as system", hidden: false },
      ],
      hints: [
        "Two modules, checking how they connect: that's the seam integration testing targets.",
        "A complete end-to-end journey across the whole app is broader than integration — it's system level.",
      ],
    },
    commonMistakes: [
      "Assuming a feature with 100% unit test coverage has no risk left — coverage only measures the unit level's scope.",
      'Skipping integration testing because "each piece already has unit tests," which is exactly the gap integration testing exists to close.',
      "Confusing system testing (does the whole app work) with acceptance testing (is the whole app what was actually needed) — a system can pass one and fail the other.",
    ],
    quiz: [
      {
        id: "st-3-q1",
        prompt:
          "Two functions each pass their own unit tests, but fail when connected together. What does this demonstrate?",
        choices: [
          "The unit tests were written incorrectly",
          "Integration-level defects live in the seam between components, not inside either one",
          "Unit testing is unnecessary",
          "The bug must be in the acceptance criteria",
        ],
        correctIndex: 1,
        explanation:
          "This is the classic reason integration testing exists: correctness within each unit does not guarantee correctness in how units communicate.",
      },
      {
        id: "st-3-q2",
        prompt:
          "Which question is most specific to acceptance testing, as opposed to system testing?",
        choices: [
          "Does the full application run without crashing?",
          "Does a single function return the right value?",
          "Is this what the business actually needed?",
          "Do two modules pass data in a compatible format?",
        ],
        correctIndex: 2,
        explanation:
          "System testing asks whether the built system works end-to-end; acceptance testing asks whether the built system is the right thing to have built.",
      },
      {
        id: "st-3-q3",
        prompt:
          "In a modern agile team, how do the four test levels typically relate to each other?",
        choices: [
          "They must happen in strict sequence, once each, per release",
          "Only one level is used at a time, chosen by the team lead",
          "They commonly happen continuously and in parallel for the same feature",
          "Acceptance testing replaces the need for the other three levels",
        ],
        correctIndex: 2,
        explanation:
          "Rather than a rigid waterfall sequence, agile teams typically run all four levels continuously as features are built, not as isolated one-time gates.",
      },
    ],
    takeaway:
      "Each test level has a distinct scope, and a defect outside that scope will not be caught there — real coverage means using multiple levels deliberately, not relying on one.",
    summary:
      "This lesson introduced the four traditional test levels — unit, integration, system, and acceptance — what each catches, and why a defect can survive one level and only surface at another.",
    nextLessonSlug: "st-test-types",
  },
  {
    id: "st-test-types",
    slug: "st-test-types",
    title: "Test Types: Functional, Non-Functional, Regression, and More",
    description:
      'Test levels answer "how much of the system," test types answer "what kind of question." Learn the vocabulary that shows up in every real test plan.',
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 17,
    prerequisites: ["st-test-levels"],
    objectives: [
      "Distinguish functional from non-functional testing",
      "Explain the specific purpose of regression, smoke, and sanity testing",
      "Choose the correct test type for a given testing goal",
    ],
    skills: ["software-testing", "test-types"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Test Type",
        url: "https://glossary.istqb.org/en_US/term/test-type",
      },
    ],
    keywords: [
      "functional testing",
      "non-functional testing",
      "regression testing",
      "smoke testing",
      "sanity testing",
    ],
    explanation: `Test *levels* (the previous lesson) describe **how much of the system** you're exercising — one function, several connected, or the whole thing. Test *types* describe **what kind of question you're asking**, and that question can be asked at almost any level.

**Functional testing** asks: does the system do what it's supposed to do? Given this input, is this the correct output? It's checked directly against requirements and is usually what people picture first when they hear "testing."

**Non-functional testing** asks a different family of questions entirely: not "is the answer correct" but "is the *way* it answers acceptable." Performance (how fast, under how much load), security (can it be misused to leak data or bypass controls), usability (can real people actually use it), and compatibility (does it work across browsers, devices, screen readers) are all non-functional — the feature can be functionally perfect and still fail every one of these.

Three more test types matter constantly in day-to-day work, and they're often confused with each other:

**Regression testing** re-runs previously passing tests after a change, to confirm the change didn't break something that used to work. It's not about the new feature at all — it's about protecting everything that already existed. This is the type of testing that automation earns back the most time on, because the same checks repeat every release.

**Smoke testing** is a quick, shallow pass across the most critical paths — does the app even start, can a user log in, does the homepage load — run immediately after a new build, before investing time in deeper testing. It answers "is this build stable enough to bother testing further?" A failed smoke test means: stop, don't proceed to detailed testing yet.

**Sanity testing** is narrower still: a focused check that a *specific* recent fix or small change works as intended and hasn't broken the immediately related area, without the broader scope of a full regression pass. If a bug fix for the search box just shipped, a sanity test checks the search box; it does not re-check the entire application the way regression testing would.

Knowing these distinctions matters because they imply different scope and different cost: skipping regression testing to save time on a "small" change is exactly how old bugs come back, and running a full regression suite when a five-minute smoke test would answer the real question wastes everyone's time.`,
    example: {
      language: "javascript",
      description:
        "A function's correctness (functional) versus how long it takes to run (non-functional) are two separate questions about the same code.",
      code: `function sortLargeList(list) {
  return [...list].sort((a, b) => a - b);
}

const result = sortLargeList([5, 3, 1, 4, 2]);
console.log(result); // functional question: is this correctly sorted?

const start = performance.now();
sortLargeList(new Array(100000).fill(0).map(() => Math.random()));
const elapsedMs = performance.now() - start;
console.log("Elapsed ms:", elapsedMs); // non-functional question: is this fast enough?`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change the list size below and re-run — notice the functional correctness never changes, only the performance question does.",
      code: `function sortLargeList(list) {
  return [...list].sort((a, b) => a - b);
}

console.log(sortLargeList([5, 3, 1, 4, 2]));

const start = performance.now();
sortLargeList(new Array(10000).fill(0).map(() => Math.random()));
console.log("Elapsed ms:", performance.now() - start);`,
      editable: true,
    },
    guidedExercise: {
      id: "st-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Classify two testing goals using the strings 'functional' or 'non-functional': goalA = 'confirm the discount calculation returns the correct total'. goalB = 'confirm the checkout page loads within 2 seconds on 3G'.",
      starterCode: `let goalA = ""; // TODO
let goalB = ""; // TODO
`,
      solutionCode: `let goalA = "functional";
let goalB = "non-functional";`,
      harness: `
        try { window.__report('t1', goalA === 'functional', 'Checking that a calculation is correct is a functional question.'); } catch (e) { window.__report('t1', false, 'goalA is not defined: ' + e.message); }
        try { window.__report('t2', goalB === 'non-functional', 'A page-load time constraint is a performance concern, which is non-functional.'); } catch (e) { window.__report('t2', false, 'goalB is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly classifies goal A as functional", hidden: false },
        { id: "t2", description: "correctly classifies goal B as non-functional", hidden: false },
      ],
      hints: [
        "Is a specific output value correct? That's functional.",
        "Is it fast, secure, or usable enough? Those are non-functional.",
      ],
    },
    independentExercise: {
      id: "st-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Classify three testing situations using the strings 'regression', 'smoke', or 'sanity': situationA = 'right after deploying a new build, quickly confirm login and homepage both still work before deeper testing'. situationB = 'a bug fix just shipped for the password-reset email; confirm just that flow still works'. situationC = 'before a major release, re-run the full suite of previously passing tests across the whole app'.",
      starterCode: `let situationA = ""; // TODO
let situationB = ""; // TODO
let situationC = ""; // TODO
`,
      solutionCode: `let situationA = "smoke";
let situationB = "sanity";
let situationC = "regression";`,
      harness: `
        try { window.__report('t1', situationA === 'smoke', 'A quick, shallow pass across critical paths right after a new build is smoke testing.'); } catch (e) { window.__report('t1', false, 'situationA is not defined: ' + e.message); }
        try { window.__report('t2', situationB === 'sanity', 'A narrow check of one specific recent fix, without broader scope, is sanity testing.'); } catch (e) { window.__report('t2', false, 'situationB is not defined: ' + e.message); }
        try { window.__report('t3', situationC === 'regression', 'Re-running the full set of previously passing tests to catch breakage is regression testing.'); } catch (e) { window.__report('t3', false, 'situationC is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly classifies situation A as smoke", hidden: false },
        { id: "t2", description: "correctly classifies situation B as sanity", hidden: false },
        { id: "t3", description: "correctly classifies situation C as regression", hidden: false },
      ],
      hints: [
        "Shallow and broad, right after a build, before deeper testing: smoke.",
        "Narrow and deep, focused on one recent change: sanity.",
        "Broad, re-running old tests to catch new breakage: regression.",
      ],
    },
    commonMistakes: [
      'Using "regression testing" and "sanity testing" interchangeably — regression is broad and re-checks old behavior; sanity is narrow and checks one recent change.',
      "Skipping smoke testing and going straight to deep testing on an unstable build, wasting detailed-testing time on a build that was never going to survive basic use.",
      'Treating non-functional requirements as optional "nice to haves" rather than testable requirements with their own pass/fail criteria.',
    ],
    quiz: [
      {
        id: "st-4-q1",
        prompt: "What distinguishes a non-functional test from a functional test?",
        choices: [
          "Non-functional tests don't require any code",
          "Functional tests check correctness of behavior; non-functional tests check qualities like speed, security, or usability",
          "Non-functional tests are always slower to run",
          "There is no real difference",
        ],
        correctIndex: 1,
        explanation:
          "Functional testing checks whether the system does the right thing; non-functional testing checks the qualities of how it does it.",
      },
      {
        id: "st-4-q2",
        prompt:
          "A build just finished deploying. What is the fastest way to check if it's even worth testing further?",
        choices: ["A full regression suite", "A smoke test", "An acceptance test", "A sanity test"],
        correctIndex: 1,
        explanation:
          "Smoke testing is a quick, shallow pass across the most critical paths specifically meant to answer this question before investing in deeper testing.",
      },
      {
        id: "st-4-q3",
        prompt:
          "Why does regression testing matter even when a change seems small and unrelated to other features?",
        choices: [
          "It doesn't — small changes never need regression testing",
          "Small changes can still break previously working functionality elsewhere, and regression testing is what catches that",
          "Regression testing only applies to the login page",
          "It's a replacement for functional testing",
        ],
        correctIndex: 1,
        explanation:
          "Regression testing exists precisely because changes can have unexpected side effects on unrelated, previously working parts of the system.",
      },
    ],
    takeaway:
      'Test levels answer "how much of the system"; test types answer "what kind of question" — and mixing up regression, smoke, and sanity testing leads to either wasted time or missed defects.',
    summary:
      "This lesson distinguished functional from non-functional testing and clarified the specific, non-interchangeable purposes of regression, smoke, and sanity testing.",
    nextLessonSlug: "st-test-design-overview",
  },
  {
    id: "st-test-design-overview",
    slug: "st-test-design-overview",
    title: "Test Design Techniques: An Overview",
    description:
      "Why picking test cases at random wastes effort, and the systematic approach the next several lessons will each teach in depth.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 4,
    difficulty: "beginner",
    estimatedMinutes: 15,
    prerequisites: ["st-test-types"],
    objectives: [
      "Explain why systematic test design finds more defects per test case than ad hoc guessing",
      "Name the four structured test design techniques this course covers",
      "Identify which technique fits a given kind of input or logic",
    ],
    skills: ["software-testing", "test-design"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Test Design Technique",
        url: "https://glossary.istqb.org/en_US/term/test-design-technique",
      },
    ],
    keywords: [
      "test design",
      "equivalence partitioning",
      "boundary value analysis",
      "decision table",
      "state transition",
    ],
    explanation: `Given a field that accepts an integer from 1 to 100, how many test cases do you need? A tester without a technique might type in five or six numbers that feel reasonable and call it done — 50, 25, 75, maybe 1 and 100 if they're careful. A tester with a technique can explain, precisely, *why* a specific small set of numbers gives strong confidence, and can defend that choice to a skeptical reviewer.

That's the entire point of **test design techniques**: they are systematic methods for choosing a small, defensible set of test cases out of what is often an effectively infinite space of possible inputs, while still catching the defects most likely to occur. Testing every possible integer from 1 to 100 individually would take 100 tests and mostly duplicate effort — most of those numbers behave identically. A technique tells you *which few* numbers actually matter and why.

This course covers four structured techniques, each suited to a different shape of problem:

**Equivalence partitioning** groups inputs into classes that should all be treated the same way by the system, then tests one representative from each class instead of every possible value.

**Boundary-value analysis** focuses specifically on the edges of those classes — the values right at, just below, and just above a limit — because off-by-one errors cluster at boundaries far more than they cluster in the middle of a range.

**Decision tables** handle logic driven by multiple independent conditions combining together (a discount that depends on both loyalty status *and* order size *and* a promo code), where partitioning one input at a time would miss the combinations.

**State transition testing** handles systems that behave differently depending on what already happened — an order that can be "pending," "paid," "shipped," or "cancelled," where the same action (like "cancel") is valid in some states and invalid in others.

None of these techniques is universally "best" — the skill is recognizing which shape of problem you're facing and reaching for the technique built for it, which is exactly what the next four lessons practice one at a time.`,
    example: {
      language: "javascript",
      description:
        "Two very different-looking approaches to testing the same range — one ad hoc, one systematic. Both run; only one scales and explains itself.",
      code: `function isValidAge(age) {
  return Number.isInteger(age) && age >= 1 && age <= 100;
}

// Ad hoc: "feels" reasonable, hard to defend as complete.
console.log(isValidAge(42));

// Systematic: one value from each meaningful region, chosen deliberately.
console.log(isValidAge(0));   // just below the valid range
console.log(isValidAge(1));   // the lower edge
console.log(isValidAge(50));  // comfortably inside
console.log(isValidAge(100)); // the upper edge
console.log(isValidAge(101)); // just above the valid range`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add one more systematic test case below (e.g. a non-integer like 50.5) and predict the result before running.",
      code: `function isValidAge(age) {
  return Number.isInteger(age) && age >= 1 && age <= 100;
}

console.log(isValidAge(0));
console.log(isValidAge(1));
console.log(isValidAge(100));
console.log(isValidAge(101));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "For each scenario, choose which technique from 'equivalence-partitioning', 'boundary-value-analysis', 'decision-table', or 'state-transition' fits best: scenarioA = 'testing a coupon field that groups inputs into valid-format vs invalid-format codes'. scenarioB = 'testing an order object that can only move from pending to shipped, never the reverse'.",
      starterCode: `let scenarioA = ""; // TODO
let scenarioB = ""; // TODO
`,
      solutionCode: `let scenarioA = "equivalence-partitioning";
let scenarioB = "state-transition";`,
      harness: `
        try { window.__report('t1', scenarioA === 'equivalence-partitioning', 'Grouping inputs into classes that should behave the same way is equivalence partitioning.'); } catch (e) { window.__report('t1', false, 'scenarioA is not defined: ' + e.message); }
        try { window.__report('t2', scenarioB === 'state-transition', 'Behavior that depends on what state an object is currently in is state transition testing.'); } catch (e) { window.__report('t2', false, 'scenarioB is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly matches scenario A", hidden: false },
        { id: "t2", description: "correctly matches scenario B", hidden: false },
      ],
      hints: [
        '"Groups" and "classes" of input are the signature vocabulary of equivalence partitioning.',
        '"Can only move from one state to another" is the signature vocabulary of state transition testing.',
      ],
    },
    independentExercise: {
      id: "st-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Choose the right technique for two more scenarios: scenarioC = 'testing the exact edges of an age field that accepts 18 to 65'. scenarioD = 'testing a discount that depends on three independent yes/no conditions combined together'.",
      starterCode: `let scenarioC = ""; // TODO
let scenarioD = ""; // TODO
`,
      solutionCode: `let scenarioC = "boundary-value-analysis";
let scenarioD = "decision-table";`,
      harness: `
        try { window.__report('t1', scenarioC === 'boundary-value-analysis', 'Testing exact edges/limits is boundary-value analysis.'); } catch (e) { window.__report('t1', false, 'scenarioC is not defined: ' + e.message); }
        try { window.__report('t2', scenarioD === 'decision-table', 'Multiple independent conditions combining together is exactly what decision tables handle.'); } catch (e) { window.__report('t2', false, 'scenarioD is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly matches scenario C", hidden: false },
        { id: "t2", description: "correctly matches scenario D", hidden: false },
      ],
      hints: [
        '"Exact edges" and "limits" point directly at boundary-value analysis.',
        "Multiple independent conditions combining is the decision table's specialty.",
      ],
    },
    commonMistakes: [
      'Picking test values that "feel" representative without being able to explain which equivalence class each one represents.',
      "Applying only one technique to every problem out of habit, rather than matching the technique to the shape of the input or logic.",
      "Believing more test cases always means better coverage — a systematic small set often finds more real defects than a large unsystematic one.",
    ],
    quiz: [
      {
        id: "st-5-q1",
        prompt:
          "What is the core benefit of a systematic test design technique over ad hoc test case selection?",
        choices: [
          "It always produces more test cases",
          "It produces a small, defensible set of cases chosen for a specific reason, rather than guesses",
          "It removes the need for requirements",
          "It only applies to numeric inputs",
        ],
        correctIndex: 1,
        explanation:
          "The point of a technique is a defensible, explainable selection — not maximum volume, and not guesswork.",
      },
      {
        id: "st-5-q2",
        prompt:
          "Which technique specifically targets the edges of an input range, where off-by-one errors cluster?",
        choices: [
          "Equivalence partitioning",
          "Boundary-value analysis",
          "Decision tables",
          "State transition testing",
        ],
        correctIndex: 1,
        explanation:
          "Boundary-value analysis is built specifically around testing values at, just below, and just above a limit.",
      },
      {
        id: "st-5-q3",
        prompt:
          "A feature behaves differently depending on multiple independent yes/no conditions combined together. Which technique fits?",
        choices: [
          "Equivalence partitioning",
          "Boundary-value analysis",
          "Decision tables",
          "State transition testing",
        ],
        correctIndex: 2,
        explanation:
          "Decision tables are designed exactly for logic driven by multiple independent conditions combining, where testing one condition at a time would miss important combinations.",
      },
    ],
    takeaway:
      "Structured test design techniques replace guesswork with a small, explainable set of test cases — the skill is recognizing which technique fits the shape of the problem in front of you.",
    summary:
      "This lesson previewed the four structured test design techniques covered next — equivalence partitioning, boundary-value analysis, decision tables, and state transition testing — and how to recognize which fits a given scenario.",
    nextLessonSlug: "st-equivalence-partitioning",
  },
  {
    id: "st-equivalence-partitioning",
    slug: "st-equivalence-partitioning",
    title: "Equivalence Partitioning (Lab)",
    description:
      "A hands-on lab: split an input space into classes the system should treat identically, then test one representative from each class instead of every possible value.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 24,
    prerequisites: ["st-test-design-overview"],
    objectives: [
      "Partition an input space into valid and invalid equivalence classes",
      "Choose one representative test value per class",
      "Explain why testing every value in a class adds cost without adding confidence",
    ],
    skills: ["software-testing", "equivalence-partitioning"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Equivalence Partitioning",
        url: "https://glossary.istqb.org/en_US/term/equivalence-partitioning",
      },
    ],
    keywords: ["equivalence partitioning", "equivalence class", "test design"],
    explanation: `**Equivalence partitioning** rests on one assumption, and it's worth stating explicitly because the whole technique depends on it: if the system treats one value in a group correctly, it will very likely treat every other value in that same group the same way. Testing a shipping-cost calculator with an order of $50 and $51 separately, when both fall in the same "standard shipping" bracket, tells you almost nothing that testing $50 alone didn't already tell you. The two inputs are *equivalent* from the system's point of view.

The technique has two steps. **First, partition**: divide the entire space of possible inputs into classes where every member of a class should be handled identically. For a discount code field that requires exactly 6 alphanumeric characters, the classes might be: too short, too long, right length but contains an invalid character, and right length with all valid characters. Notice there are usually multiple **invalid** classes, not just one big "invalid" bucket — "too short" and "contains a symbol" are different kinds of invalid and might be handled by different code paths, so they deserve separate test cases.

**Second, select one representative per class.** Testing "abc123" as the one valid-class representative and "ab1" (too short) and "abcdef!" (invalid character) as invalid-class representatives gives you meaningful coverage of the whole space with just three test cases — instead of testing hundreds of individual six-character strings that would all exercise the exact same code path.

The most common mistake is forgetting the invalid classes entirely and only testing "happy path" valid inputs. A discount-code field that correctly accepts "abc123" but crashes on a 3-character input hasn't been tested at all on its most realistic failure mode — real users mistype far more often than they type perfectly.`,
    example: {
      language: "javascript",
      description:
        "A shipping-cost rule with three price bands, tested with one representative value from each equivalence class rather than every possible price.",
      code: `function shippingCost(orderTotal) {
  if (orderTotal < 25) return 9.99;   // class: below free-shipping threshold
  if (orderTotal <= 100) return 4.99; // class: standard reduced shipping
  return 0;                            // class: free shipping
}

console.log(shippingCost(10));  // representative of "below threshold"
console.log(shippingCost(50));  // representative of "standard band"
console.log(shippingCost(150)); // representative of "free shipping"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a fourth class the function doesn't currently handle explicitly (negative totals) and predict what happens before running.",
      code: `function shippingCost(orderTotal) {
  if (orderTotal < 25) return 9.99;
  if (orderTotal <= 100) return 4.99;
  return 0;
}

console.log(shippingCost(10));
console.log(shippingCost(50));
console.log(shippingCost(150));
// console.log(shippingCost(-5));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A username field requires 3 to 12 characters. Choose one representative value (a string) for each class: tooShort (fewer than 3 chars), validLength (3 to 12 chars), tooLong (more than 12 chars).",
      starterCode: `let tooShort = ""; // TODO
let validLength = ""; // TODO
let tooLong = ""; // TODO
`,
      solutionCode: `let tooShort = "ab";
let validLength = "alice2026";
let tooLong = "this_username_is_way_too_long";`,
      harness: `
        try { window.__report('t1', tooShort.length < 3, 'tooShort should have fewer than 3 characters.'); } catch (e) { window.__report('t1', false, 'tooShort is not defined: ' + e.message); }
        try { window.__report('t2', validLength.length >= 3 && validLength.length <= 12, 'validLength should be between 3 and 12 characters.'); } catch (e) { window.__report('t2', false, 'validLength is not defined: ' + e.message); }
        try { window.__report('t3', tooLong.length > 12, 'tooLong should have more than 12 characters.'); } catch (e) { window.__report('t3', false, 'tooLong is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "tooShort is a valid representative of the too-short class",
          hidden: false,
        },
        {
          id: "t2",
          description: "validLength is a valid representative of the valid class",
          hidden: false,
        },
        {
          id: "t3",
          description: "tooLong is a valid representative of the too-long class",
          hidden: false,
        },
      ],
      hints: [
        "You only need one example per class — pick any string whose length lands in that range.",
        "Count characters carefully: the boundary is 3 and 12 inclusive for the valid class.",
      ],
    },
    independentExercise: {
      id: "st-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "A discount code must be exactly 6 characters, using only letters and digits (no symbols). Design representatives for FOUR classes: tooShort, tooLong, rightLengthWithSymbol (6 chars but includes a symbol like ! or -), and valid (6 alphanumeric chars).",
      starterCode: `let tooShort = ""; // TODO
let tooLong = ""; // TODO
let rightLengthWithSymbol = ""; // TODO
let valid = ""; // TODO
`,
      solutionCode: `let tooShort = "ab12";
let tooLong = "abcdefgh12";
let rightLengthWithSymbol = "ab12!c";
let valid = "ab12cd";`,
      harness: `
        function isAlnum(s) { return /^[a-zA-Z0-9]+$/.test(s); }
        try { window.__report('t1', tooShort.length < 6, 'tooShort should have fewer than 6 characters.'); } catch (e) { window.__report('t1', false, 'tooShort is not defined: ' + e.message); }
        try { window.__report('t2', tooLong.length > 6, 'tooLong should have more than 6 characters.'); } catch (e) { window.__report('t2', false, 'tooLong is not defined: ' + e.message); }
        try { window.__report('t3', rightLengthWithSymbol.length === 6 && !isAlnum(rightLengthWithSymbol), 'rightLengthWithSymbol should be exactly 6 characters but contain a non-alphanumeric symbol.'); } catch (e) { window.__report('t3', false, 'rightLengthWithSymbol is not defined: ' + e.message); }
        try { window.__report('t4', valid.length === 6 && isAlnum(valid), 'valid should be exactly 6 alphanumeric characters.'); } catch (e) { window.__report('t4', false, 'valid is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "tooShort represents the too-short class", hidden: false },
        { id: "t2", description: "tooLong represents the too-long class", hidden: false },
        {
          id: "t3",
          description:
            "rightLengthWithSymbol represents the right-length-but-invalid-character class",
          hidden: false,
        },
        { id: "t4", description: "valid represents the valid class", hidden: false },
      ],
      hints: [
        'Notice "invalid" splits into two separate classes here: wrong length, and right length but wrong characters. Each needs its own representative.',
        "For rightLengthWithSymbol, count exactly 6 characters and include at least one character that isn't a letter or digit.",
      ],
    },
    commonMistakes: [
      "Lumping all invalid inputs into one test case instead of recognizing that different kinds of invalid input often exercise different code paths.",
      "Choosing multiple representatives from the same class (e.g. testing three different valid lengths) instead of moving on to test a different class.",
      "Forgetting that equivalence partitioning covers valid classes as thoroughly as invalid ones — a system that handles bad input well but mishandles some valid input is just as broken.",
    ],
    quiz: [
      {
        id: "st-6-q1",
        prompt: "What core assumption does equivalence partitioning rely on?",
        choices: [
          "Every possible input must be tested individually",
          "If the system handles one value in a class correctly, it will likely handle every value in that class the same way",
          "Only invalid inputs need to be tested",
          "Test cases should be chosen randomly for best coverage",
        ],
        correctIndex: 1,
        explanation:
          "This assumption is what justifies testing one representative instead of every value — without it, the technique wouldn't be valid.",
      },
      {
        id: "st-6-q2",
        prompt: "Why might a field have more than one invalid equivalence class?",
        choices: [
          "It never does — there is always exactly one invalid class",
          "Different kinds of invalid input (too short vs. wrong characters) can be handled by different code paths and deserve separate test cases",
          "Invalid classes don't need to be tested at all",
          "Because valid classes are always more important",
        ],
        correctIndex: 1,
        explanation:
          "Different failure modes often hit different validation logic, so treating all invalid input as one class can hide real defects.",
      },
      {
        id: "st-6-q3",
        prompt:
          "Testing a valid-length username of 5 characters and another valid-length username of 8 characters is an example of:",
        choices: [
          "Correct equivalence partitioning practice",
          "Redundant testing within the same equivalence class, adding cost without meaningfully adding confidence",
          "Boundary-value analysis",
          "A decision table",
        ],
        correctIndex: 1,
        explanation:
          "Both values fall in the same valid-length class and should be handled identically — testing both doesn't add real coverage, it just repeats the same class.",
      },
    ],
    takeaway:
      "Equivalence partitioning turns an unmanageable input space into a small set of classes, each needing just one representative test — with invalid input deserving as much careful classification as valid input.",
    summary:
      "This lab practiced dividing input spaces into valid and invalid equivalence classes and choosing one deliberate representative test value per class, rather than testing exhaustively or guessing.",
    nextLessonSlug: "st-boundary-value-analysis",
  },
  {
    id: "st-boundary-value-analysis",
    slug: "st-boundary-value-analysis",
    title: "Boundary-Value Analysis (Lab)",
    description:
      "A hands-on lab: target the exact edges of a valid range, where off-by-one errors overwhelmingly cluster in real systems.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 24,
    prerequisites: ["st-equivalence-partitioning"],
    objectives: [
      "Identify the boundary values of a given valid range",
      "Design test cases at, just below, and just above each boundary",
      "Explain why boundaries are disproportionately likely to contain defects",
    ],
    skills: ["software-testing", "boundary-value-analysis"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Boundary Value Analysis",
        url: "https://glossary.istqb.org/en_US/term/boundary-value-analysis",
      },
    ],
    keywords: ["boundary value analysis", "off-by-one", "test design"],
    explanation: `Equivalence partitioning tells you which classes exist and to test one representative from each. **Boundary-value analysis is a refinement of exactly where within a class to place that representative** — and it makes one sharp, well-evidenced claim: defects cluster overwhelmingly at the edges of a range, not in the comfortable middle.

The reason is almost always the same programming mistake: a comparison operator that's one character off. \`age >= 18\` and \`age > 18\` look nearly identical and produce completely different behavior for exactly one input: 18 itself. A test suite that only checks age 25 and age 10 will never notice this bug. A test suite that checks age 17, 18, and 19 will catch it immediately, because 18 is the boundary and 17/19 are the values immediately adjacent to it.

For a range with a minimum and maximum — say, a discount code length of 6 to 10 characters — boundary-value analysis produces test values at **both** ends: just below the minimum (5), at the minimum (6), just above the minimum (7), just below the maximum (9), at the maximum (10), and just above the maximum (11). That's six values total for one range, chosen not by feel but by a rule: for every boundary, test the boundary itself and its immediate neighbor on each side.

In practice, testers often combine the two techniques rather than using six separate values: the boundary value **is** the representative chosen for its equivalence class, and the "just outside" value **is** the representative for the neighboring invalid class. This is efficient and is exactly what real test plans do — equivalence partitioning decides *which* classes need a representative, boundary-value analysis decides *which specific value* makes the strongest representative.`,
    example: {
      language: "javascript",
      description:
        "A voting-eligibility check with an off-by-one bug that only boundary testing reveals.",
      code: `// Bug: should be >= 18, but uses > 18
function canVote(age) {
  return age > 18;
}

console.log(canVote(10)); // false -- looks fine
console.log(canVote(30)); // true -- looks fine
console.log(canVote(18)); // false -- WRONG. An 18-year-old should be able to vote.`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Fix the off-by-one bug (change > to >=) and re-run to confirm all three boundary cases now behave correctly.",
      code: `function canVote(age) {
  return age > 18;
}

console.log(canVote(17)); // just below the boundary
console.log(canVote(18)); // the boundary itself
console.log(canVote(19)); // just above the boundary`,
      editable: true,
    },
    guidedExercise: {
      id: "st-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A field accepts an integer quantity from 1 to 10. List the six boundary-value test numbers as belowMin, atMin, justAboveMin, justBelowMax, atMax, aboveMax.",
      starterCode: `let belowMin = 0; // TODO
let atMin = 0; // TODO
let justAboveMin = 0; // TODO
let justBelowMax = 0; // TODO
let atMax = 0; // TODO
let aboveMax = 0; // TODO
`,
      solutionCode: `let belowMin = 0;
let atMin = 1;
let justAboveMin = 2;
let justBelowMax = 9;
let atMax = 10;
let aboveMax = 11;`,
      harness: `
        try { window.__report('t1', belowMin === 0, 'belowMin should be exactly 0 (one below the minimum of 1).'); } catch (e) { window.__report('t1', false, 'belowMin is not defined: ' + e.message); }
        try { window.__report('t2', atMin === 1, 'atMin should be exactly 1.'); } catch (e) { window.__report('t2', false, 'atMin is not defined: ' + e.message); }
        try { window.__report('t3', justAboveMin === 2, 'justAboveMin should be exactly 2.'); } catch (e) { window.__report('t3', false, 'justAboveMin is not defined: ' + e.message); }
        try { window.__report('t4', justBelowMax === 9, 'justBelowMax should be exactly 9.'); } catch (e) { window.__report('t4', false, 'justBelowMax is not defined: ' + e.message); }
        try { window.__report('t5', atMax === 10, 'atMax should be exactly 10.'); } catch (e) { window.__report('t5', false, 'atMax is not defined: ' + e.message); }
        try { window.__report('t6', aboveMax === 11, 'aboveMax should be exactly 11 (one above the maximum of 10).'); } catch (e) { window.__report('t6', false, 'aboveMax is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "belowMin is correct", hidden: false },
        { id: "t2", description: "atMin is correct", hidden: false },
        { id: "t3", description: "justAboveMin is correct", hidden: false },
        { id: "t4", description: "justBelowMax is correct", hidden: false },
        { id: "t5", description: "atMax is correct", hidden: false },
        { id: "t6", description: "aboveMax is correct", hidden: false },
      ],
      hints: [
        "Each boundary produces three values: one below it, the boundary itself, and one above it.",
        "The minimum boundary is 1; the maximum boundary is 10. Work outward by exactly 1 in each direction.",
      ],
    },
    independentExercise: {
      id: "st-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "A password field requires a length from 8 to 20 characters. Write a function boundaryLengths() that returns an array of the six boundary-value lengths in ascending order: [7, 8, 9, 19, 20, 21].",
      starterCode: `function boundaryLengths() {
  // TODO: return the six boundary lengths in ascending order
}
`,
      solutionCode: `function boundaryLengths() {
  return [7, 8, 9, 19, 20, 21];
}`,
      harness: `
        try {
          const result = boundaryLengths();
          const expected = [7, 8, 9, 19, 20, 21];
          const matches = Array.isArray(result) && result.length === 6 && expected.every((v, i) => result[i] === v);
          window.__report('t1', matches, 'boundaryLengths() should return [7, 8, 9, 19, 20, 21] in that order.');
        } catch (e) { window.__report('t1', false, 'boundaryLengths threw an error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "returns the correct six boundary lengths in order",
          hidden: false,
        },
      ],
      hints: [
        "The lower boundary is 8; produce 7, 8, 9 around it.",
        "The upper boundary is 20; produce 19, 20, 21 around it.",
      ],
    },
    commonMistakes: [
      "Only testing the exact minimum and maximum, forgetting the values one step outside each boundary — those are what actually catch off-by-one errors like `>` versus `>=`.",
      "Testing far-outside values (like -1000 or 1000000) instead of the immediately adjacent value, which misses the specific comparison-operator bugs boundary analysis targets.",
      "Applying boundary-value analysis only to numbers, when it applies equally to string lengths, array sizes, dates, and any other bounded range.",
    ],
    quiz: [
      {
        id: "st-7-q1",
        prompt: "Why do defects cluster at boundaries more than in the middle of a valid range?",
        choices: [
          "Boundaries are tested less often by users",
          "Off-by-one mistakes in comparison operators (like > instead of >=) only produce incorrect behavior exactly at the boundary",
          "Boundaries always involve larger numbers",
          "This is a myth with no real basis",
        ],
        correctIndex: 1,
        explanation:
          "A single-character comparison-operator mistake produces wrong behavior only at the specific boundary value, which is exactly why boundary testing is so effective at finding it.",
      },
      {
        id: "st-7-q2",
        prompt:
          "For a range with a minimum of 5 and a maximum of 50, how many boundary-value test cases does the technique typically produce?",
        choices: ["2", "3", "6", "45"],
        correctIndex: 2,
        explanation:
          "Each boundary (minimum and maximum) produces three values — just below, at, and just above — for a total of six across both boundaries.",
      },
      {
        id: "st-7-q3",
        prompt:
          "How do equivalence partitioning and boundary-value analysis typically work together in practice?",
        choices: [
          "They are mutually exclusive and never used together",
          "Boundary values are often chosen as the specific representative for a class identified by equivalence partitioning",
          "Boundary-value analysis replaces the need for equivalence partitioning entirely",
          "They only apply to different types of software",
        ],
        correctIndex: 1,
        explanation:
          "In practice, boundary values often serve double duty as the deliberately chosen representative for the class right at the edge, combining both techniques efficiently.",
      },
    ],
    takeaway:
      "Boundary-value analysis targets the specific values where off-by-one comparison bugs live — the boundary itself and its immediate neighbors on each side, not the comfortable middle of a range.",
    summary:
      "This lab practiced identifying the six boundary-value test cases (below, at, and above each of a range's minimum and maximum) and explained why comparison-operator bugs specifically cluster there.",
    nextLessonSlug: "st-decision-tables",
  },
  {
    id: "st-decision-tables",
    slug: "st-decision-tables",
    title: "Decision Tables for Combined Conditions (Lab)",
    description:
      "A hands-on lab: when a result depends on several independent conditions combined together, a decision table finds the combinations one-input-at-a-time testing misses.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 26,
    prerequisites: ["st-boundary-value-analysis"],
    objectives: [
      "Build a decision table for logic driven by multiple independent conditions",
      "Derive one test case per row (rule) of a decision table",
      "Explain why testing conditions one at a time can miss combination-specific defects",
    ],
    skills: ["software-testing", "decision-tables"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Decision Table Testing",
        url: "https://glossary.istqb.org/en_US/term/decision-table-testing",
      },
    ],
    keywords: ["decision table", "combined conditions", "test design"],
    explanation: `A discount rule: "loyalty members get 10% off; orders over $100 get 5% off; if both apply, take the larger discount, not both stacked." Testing "is the customer a loyalty member" and "is the order over $100" as two *separate* one-at-a-time checks will never exercise the specific rule about what happens when *both* are true at once — and that combined case is exactly where the interesting bug usually lives (a developer who forgot the "not both stacked" rule and simply added the two discounts together).

A **decision table** makes every combination of conditions explicit instead of leaving them implicit. You list every condition as a row, list every meaningful combination of true/false values as a column, and write the correct expected outcome for each column. Each column is one test case — deterministic, unambiguous, and traceable directly back to a specific business rule.

For two conditions (loyalty member: yes/no, order over $100: yes/no), there are four combinations, so a complete table has four columns:

| Loyalty member? | Order > $100? | Expected discount |
| --- | --- | --- |
| No | No | 0% |
| No | Yes | 5% |
| Yes | No | 10% |
| Yes | Yes | 10% (the larger of the two, not stacked) |

That fourth column — both conditions true — is the one an ad hoc tester is most likely to skip, and it's the one that actually encodes the business rule that makes this feature non-trivial ("take the larger, don't stack"). With three independent yes/no conditions, a *full* table has eight combinations (2×2×2); with four conditions, sixteen. In practice, testers often simplify by collapsing combinations that provably produce the same rule (a technique called "don't-care" reduction), but the discipline of listing every combination first — and only then simplifying with a clear justification — is what prevents accidentally dropping a real case.`,
    example: {
      language: "javascript",
      description:
        "The loyalty/order-size discount rule implemented, with each of the four decision-table combinations run as its own check.",
      code: `function discountPercent(isLoyaltyMember, orderOverHundred) {
  if (isLoyaltyMember && orderOverHundred) return 10; // larger of the two, not stacked
  if (isLoyaltyMember) return 10;
  if (orderOverHundred) return 5;
  return 0;
}

console.log(discountPercent(false, false)); // 0
console.log(discountPercent(false, true));  // 5
console.log(discountPercent(true, false));  // 10
console.log(discountPercent(true, true));   // 10 -- the combination row that matters most`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        'Break the "not stacked" rule on purpose (change the first return to `return 15`) and re-run — notice only the combined-conditions test case would catch this.',
      code: `function discountPercent(isLoyaltyMember, orderOverHundred) {
  if (isLoyaltyMember && orderOverHundred) return 10;
  if (isLoyaltyMember) return 10;
  if (orderOverHundred) return 5;
  return 0;
}

console.log(discountPercent(true, true));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A shipping rule: free shipping if (isPremiumMember OR orderOver75). Build the decision table's four expected outcomes as booleans: caseNeitherTrue, caseOnlyPremium, caseOnlyOrderSize, caseBothTrue (true means free shipping).",
      starterCode: `let caseNeitherTrue = null; // TODO
let caseOnlyPremium = null; // TODO
let caseOnlyOrderSize = null; // TODO
let caseBothTrue = null; // TODO
`,
      solutionCode: `let caseNeitherTrue = false;
let caseOnlyPremium = true;
let caseOnlyOrderSize = true;
let caseBothTrue = true;`,
      harness: `
        try { window.__report('t1', caseNeitherTrue === false, 'Neither condition true means no free shipping under an OR rule.'); } catch (e) { window.__report('t1', false, 'caseNeitherTrue is not defined: ' + e.message); }
        try { window.__report('t2', caseOnlyPremium === true, 'An OR rule is satisfied if at least one condition is true.'); } catch (e) { window.__report('t2', false, 'caseOnlyPremium is not defined: ' + e.message); }
        try { window.__report('t3', caseOnlyOrderSize === true, 'An OR rule is satisfied if at least one condition is true.'); } catch (e) { window.__report('t3', false, 'caseOnlyOrderSize is not defined: ' + e.message); }
        try { window.__report('t4', caseBothTrue === true, 'Both conditions true still satisfies an OR rule.'); } catch (e) { window.__report('t4', false, 'caseBothTrue is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly derives the neither-true case", hidden: false },
        { id: "t2", description: "correctly derives the only-premium case", hidden: false },
        { id: "t3", description: "correctly derives the only-order-size case", hidden: false },
        { id: "t4", description: "correctly derives the both-true case", hidden: false },
      ],
      hints: [
        "An OR rule is true whenever at least one of its two conditions is true.",
        "Only one combination (neither condition true) should produce false.",
      ],
    },
    independentExercise: {
      id: "st-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Implement approvalDecision(hasGoodCredit, hasCosigner) following this rule: approved only if hasGoodCredit is true, OR if hasCosigner is true (a cosigner alone is enough even with bad credit). Return the string 'approved' or 'denied'.",
      starterCode: `function approvalDecision(hasGoodCredit, hasCosigner) {
  // TODO: implement the rule described above
}
`,
      solutionCode: `function approvalDecision(hasGoodCredit, hasCosigner) {
  return (hasGoodCredit || hasCosigner) ? "approved" : "denied";
}`,
      harness: `
        try { window.__report('t1', approvalDecision(false, false) === 'denied', 'Neither good credit nor a cosigner should be denied.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', approvalDecision(true, false) === 'approved', 'Good credit alone should be approved.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', approvalDecision(false, true) === 'approved', 'A cosigner alone should be approved, even with bad credit.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', approvalDecision(true, true) === 'approved', 'Both conditions true should still be approved.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "neither condition true is denied", hidden: false },
        { id: "t2", description: "good credit alone is approved", hidden: false },
        { id: "t3", description: "cosigner alone is approved", hidden: false },
        { id: "t4", description: "both conditions true is approved", hidden: false },
      ],
      hints: [
        "This is an OR relationship between the two conditions.",
        'Test all four combinations from the decision table, not just the two "obvious" ones.',
      ],
    },
    commonMistakes: [
      'Testing each condition independently ("what if hasGoodCredit is true" and separately "what if hasCosigner is true") without ever testing the combination where both are true or both are false.',
      "Building an incomplete decision table that silently skips a combination, which then ships as an unhandled edge case.",
      "Confusing an AND relationship between conditions with an OR relationship — they produce different tables and different bugs when mixed up.",
    ],
    quiz: [
      {
        id: "st-8-q1",
        prompt:
          "Why is testing conditions one at a time insufficient for logic involving multiple combined conditions?",
        choices: [
          "It's not insufficient — it's always enough",
          "The rule for when multiple conditions are true simultaneously is often different from either condition alone, and one-at-a-time testing never exercises that combination",
          "One-at-a-time testing takes too long",
          "Decision tables can only have two conditions",
        ],
        correctIndex: 1,
        explanation:
          'The whole reason decision tables exist is that combined-condition behavior (like "take the larger discount, don\'t stack") is often a distinct rule that isolated single-condition tests never reach.',
      },
      {
        id: "st-8-q2",
        prompt:
          "A decision table has 3 independent yes/no conditions. How many columns does a complete table have?",
        choices: ["3", "6", "8", "9"],
        correctIndex: 2,
        explanation:
          "Each condition doubles the number of combinations: 2 × 2 × 2 = 8 for three independent binary conditions.",
      },
      {
        id: "st-8-q3",
        prompt: "In a decision table, what does each column represent?",
        choices: [
          "A different tester",
          "One specific combination of condition values and its expected outcome — one test case",
          "A different requirement document",
          "A performance benchmark",
        ],
        correctIndex: 1,
        explanation:
          "Each column is a complete, specific combination of the conditions with a defined expected result, directly translating into one deterministic test case.",
      },
    ],
    takeaway:
      'Decision tables make every combination of conditions explicit, so the specific rule for "what happens when multiple conditions are true together" gets its own deliberate test case instead of being silently skipped.',
    summary:
      "This lab practiced building a decision table for combined-condition logic and deriving one test case per row, specifically targeting the combinations that one-condition-at-a-time testing misses.",
    nextLessonSlug: "st-state-transition-testing",
  },
  {
    id: "st-state-transition-testing",
    slug: "st-state-transition-testing",
    title: "State Transition Testing",
    description:
      "For systems that behave differently depending on what already happened, test the transitions between states — including the ones that should be rejected.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["st-decision-tables"],
    objectives: [
      "Model a feature's valid states and the transitions allowed between them",
      "Design test cases for both valid and invalid transitions",
      "Explain why testing only valid transitions leaves a system's guardrails unverified",
    ],
    skills: ["software-testing", "state-transition-testing"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: State Transition Testing",
        url: "https://glossary.istqb.org/en_US/term/state-transition-testing",
      },
    ],
    keywords: ["state transition testing", "finite state machine", "test design"],
    explanation: `An order can be \`pending\`, \`paid\`, \`shipped\`, or \`cancelled\`. The action "cancel" should succeed from \`pending\` or \`paid\`, but must be rejected from \`shipped\` — you cannot cancel an order that's already on a truck. The *same action* is correct in some states and a bug (or a real-world impossibility) in others. This is exactly the shape of problem the earlier techniques don't cover: equivalence partitioning and boundary-value analysis reason about a single input in isolation; they say nothing about *what already happened before* this input arrived.

**State transition testing** starts by explicitly modeling the system as a set of states and the transitions allowed between them — often drawn as a diagram, but just as usefully written as a simple table: current state, action taken, resulting state (or "rejected"). For the order example:

| Current state | Action | Result |
| --- | --- | --- |
| pending | pay | paid |
| pending | cancel | cancelled |
| paid | ship | shipped |
| paid | cancel | cancelled |
| shipped | cancel | **rejected** — cannot cancel a shipped order |
| cancelled | pay | **rejected** — cannot pay a cancelled order |

Two categories of test case come out of this table, and both matter: **valid transitions** (does "pay" correctly move a pending order to paid?) and, just as important, **invalid transitions** (does the system correctly *reject* cancelling a shipped order, rather than silently allowing it or crashing?). A system that only ever gets tested on the "happy path" sequence of valid transitions has never had its guardrails — the rules about what must *not* be allowed to happen — verified at all. Those guardrails are frequently where the most damaging real-world bugs live, because an incorrectly-allowed transition (cancelling a shipped, already-charged order) has business and financial consequences, not just a cosmetic glitch.`,
    example: {
      language: "javascript",
      description:
        "A minimal order state machine. Notice the function explicitly rejects an invalid transition rather than silently allowing it.",
      code: `function transition(currentState, action) {
  const rules = {
    "pending:pay": "paid",
    "pending:cancel": "cancelled",
    "paid:ship": "shipped",
    "paid:cancel": "cancelled",
  };
  const key = currentState + ":" + action;
  return rules[key] ?? "rejected";
}

console.log(transition("pending", "pay"));    // "paid" -- valid transition
console.log(transition("shipped", "cancel")); // "rejected" -- invalid transition, correctly blocked`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Try one more valid transition and one more invalid one before running.",
      code: `function transition(currentState, action) {
  const rules = {
    "pending:pay": "paid",
    "pending:cancel": "cancelled",
    "paid:ship": "shipped",
    "paid:cancel": "cancelled",
  };
  const key = currentState + ":" + action;
  return rules[key] ?? "rejected";
}

console.log(transition("paid", "ship"));
console.log(transition("cancelled", "pay"));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A document can be 'draft', 'submitted', or 'approved'. 'submit' moves draft to submitted. 'approve' moves submitted to approved. Set expectedA = the result of submitting a draft, and expectedB = the result of trying to approve a draft directly (should be rejected).",
      starterCode: `function transition(state, action) {
  const rules = { "draft:submit": "submitted", "submitted:approve": "approved" };
  return rules[state + ":" + action] ?? "rejected";
}

let expectedA = ""; // TODO: what should transition("draft", "submit") return?
let expectedB = ""; // TODO: what should transition("draft", "approve") return?
`,
      solutionCode: `function transition(state, action) {
  const rules = { "draft:submit": "submitted", "submitted:approve": "approved" };
  return rules[state + ":" + action] ?? "rejected";
}

let expectedA = "submitted";
let expectedB = "rejected";`,
      harness: `
        try { window.__report('t1', transition('draft', 'submit') === expectedA && expectedA === 'submitted', 'expectedA should be "submitted" — a valid transition.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', transition('draft', 'approve') === expectedB && expectedB === 'rejected', 'expectedB should be "rejected" — you cannot approve a draft directly, it must be submitted first.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly identifies the valid draft-to-submitted transition",
          hidden: false,
        },
        {
          id: "t2",
          description: "correctly identifies the invalid draft-to-approved transition",
          hidden: false,
        },
      ],
      hints: [
        'Check the rules table: is "draft:submit" a key in it?',
        'Is "draft:approve" a key in the rules table? If not, the function falls back to "rejected".',
      ],
    },
    independentExercise: {
      id: "st-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "A subscription can be 'trial', 'active', or 'expired'. Implement subscriptionTransition(state, action) where: 'activate' moves trial to active; 'cancel' moves active to expired; any other combination should return 'rejected'. Also handle 'expired' having no valid outgoing actions at all.",
      starterCode: `function subscriptionTransition(state, action) {
  // TODO: implement the rules described above, returning 'rejected' for anything not explicitly allowed
}
`,
      solutionCode: `function subscriptionTransition(state, action) {
  const rules = {
    "trial:activate": "active",
    "active:cancel": "expired",
  };
  return rules[state + ":" + action] ?? "rejected";
}`,
      harness: `
        try { window.__report('t1', subscriptionTransition('trial', 'activate') === 'active', 'trial + activate should move to active.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', subscriptionTransition('active', 'cancel') === 'expired', 'active + cancel should move to expired.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', subscriptionTransition('expired', 'activate') === 'rejected', 'expired should have no valid outgoing actions — this should be rejected.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', subscriptionTransition('trial', 'cancel') === 'rejected', 'trial + cancel is not a defined transition and should be rejected.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "trial + activate is handled correctly", hidden: false },
        { id: "t2", description: "active + cancel is handled correctly", hidden: false },
        { id: "t3", description: "expired has no valid outgoing transitions", hidden: false },
        {
          id: "t4",
          description: "an undefined transition (trial + cancel) is rejected",
          hidden: false,
        },
      ],
      hints: [
        "Only two transitions are explicitly allowed — everything else should fall through to 'rejected'.",
        "A state with no listed outgoing rules (expired) naturally rejects everything, since no key will match.",
      ],
    },
    commonMistakes: [
      'Testing only the "happy path" sequence of valid state transitions and never verifying that invalid transitions are correctly rejected.',
      'Forgetting that a state can have zero valid outgoing transitions (a true "dead end" state like cancelled or expired), and failing to test that nothing can move out of it.',
      "Modeling states informally in your head instead of writing them down as an explicit table — informal models are where transitions silently get forgotten.",
    ],
    quiz: [
      {
        id: "st-9-q1",
        prompt:
          "What makes state transition testing different from equivalence partitioning or boundary-value analysis?",
        choices: [
          "It only applies to numeric inputs",
          "It accounts for how a system's current state, based on prior actions, changes what a given input should do",
          "It is a faster technique that requires no test design",
          "It replaces the need for functional testing",
        ],
        correctIndex: 1,
        explanation:
          "State transition testing specifically reasons about behavior that depends on history — what already happened — which single-input techniques don't model.",
      },
      {
        id: "st-9-q2",
        prompt: "Why is testing invalid transitions (not just valid ones) important?",
        choices: [
          "It isn't important — only valid transitions matter",
          "Invalid transitions verify the system's guardrails, which prevent real-world-impossible or damaging actions",
          "Invalid transitions are only relevant for security testing",
          "Invalid transitions always represent the same bug",
        ],
        correctIndex: 1,
        explanation:
          "A system that never verifies rejected transitions has never confirmed its guardrails actually work — and an incorrectly-allowed transition (like cancelling a shipped order) can have real business consequences.",
      },
      {
        id: "st-9-q3",
        prompt:
          "A subscription is in the 'expired' state with no defined outgoing transitions. What should a good test suite verify?",
        choices: [
          "Nothing — dead-end states don't need testing",
          "That every possible action from 'expired' is correctly rejected, not silently allowed or crashing",
          "That 'expired' can transition to any other state",
          "Only that the state name is spelled correctly",
        ],
        correctIndex: 1,
        explanation:
          "A dead-end state's entire contract is that nothing can move out of it — that needs explicit verification, not an assumption.",
      },
    ],
    takeaway:
      "State transition testing models a system's states and allowed transitions explicitly, then deliberately tests both what should succeed and — just as importantly — what should be correctly rejected.",
    summary:
      "This lesson covered modeling a feature as states and transitions, and designing test cases for both valid transitions and the guardrail-verifying invalid transitions that are easy to skip.",
    nextLessonSlug: "st-exploratory-testing",
  },
  {
    id: "st-exploratory-testing",
    slug: "st-exploratory-testing",
    title: "Exploratory Testing With Structure",
    description:
      "Structured techniques find the defects you already knew to look for. Exploratory testing, done with discipline, finds the ones nobody anticipated.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 17,
    prerequisites: ["st-state-transition-testing"],
    objectives: [
      "Explain how exploratory testing differs from scripted test-case execution",
      "Write a testing charter that gives exploration a clear, bounded goal",
      "Identify what makes exploratory testing notes useful to someone else later",
    ],
    skills: ["software-testing", "exploratory-testing"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Exploratory Testing",
        url: "https://glossary.istqb.org/en_US/term/exploratory-testing",
      },
    ],
    keywords: ["exploratory testing", "testing charter", "session-based testing"],
    explanation: `Every technique in this course so far starts with a plan: decide the test cases in advance, then execute them. That's essential — but it has a blind spot. A pre-written test plan can only test for problems the person writing it thought to imagine. **Exploratory testing** is simultaneous test design, execution, and learning: you interact with the system, watch what actually happens, and let what you observe inform the very next thing you try — rather than following a script decided yesterday.

This is not the same as "just clicking around aimlessly," even though it can look similar from the outside. Undirected poking around is inefficient and hard to repeat or report on. **Disciplined exploratory testing uses a charter**: a short, written statement of what to explore and why, with a time box. A charter might read: "Explore the checkout flow's coupon-code field for 30 minutes, focusing on how it behaves when combined with an already-discounted item, to find interactions the coupon feature's original test cases didn't anticipate." That's specific enough to focus the session, open-ended enough to let real discovery happen.

Good exploratory testing takes notes as it goes — not a full script, but enough that the exact sequence that revealed a bug can be reproduced later: what was clicked, in what order, with what data, and what happened that was unexpected. A tester who finds a real bug during exploration but can't reconstruct the steps has found something valuable and then made it nearly worthless, because a developer can't fix what they can't reproduce.

Exploratory testing is not a replacement for the structured techniques in this course — it's a complement. Structured techniques systematically cover what you already know needs checking; exploratory testing, done with a charter and good notes, is how teams find the defects that a plan written in advance could never have anticipated.`,
    example: {
      language: "javascript",
      description:
        "A structured test charter as a plain object — specific enough to focus a session, still open-ended enough to allow real discovery.",
      code: `const charter = {
  area: "Checkout coupon-code field",
  goal: "Find interactions between a coupon code and an already-discounted item",
  timeboxMinutes: 30,
  outOfScope: "Payment processing itself",
};

function isWellFormedCharter(c) {
  return Boolean(c.area && c.goal && c.timeboxMinutes > 0);
}

console.log(isWellFormedCharter(charter)); // true`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Write your own charter for exploring a search feature, then check it against the same well-formedness rule.",
      code: `const charter = {
  area: "",
  goal: "",
  timeboxMinutes: 0,
};

function isWellFormedCharter(c) {
  return Boolean(c.area && c.goal && c.timeboxMinutes > 0);
}

console.log(isWellFormedCharter(charter));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Given the string sessionNote below, decide if it is reproducible by setting isReproducible: sessionNote = 'Clicked around the settings page for a while, something looked broken.' — is that enough for someone else to reproduce the bug?",
      starterCode: `const sessionNote = "Clicked around the settings page for a while, something looked broken.";
let isReproducible = null; // TODO: true or false
`,
      solutionCode: `const sessionNote = "Clicked around the settings page for a while, something looked broken.";
let isReproducible = false;`,
      harness: `
        try { window.__report('t1', isReproducible === false, 'This note has no specific steps, data, or exact observation — another person could not follow it to see the same bug.'); } catch (e) { window.__report('t1', false, 'isReproducible is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly identifies the note as not reproducible",
          hidden: false,
        },
      ],
      hints: [
        "Ask: could a different person follow this note and land on the exact same unexpected result?",
        'Vague phrases like "for a while" and "something looked broken" give no concrete steps to repeat.',
      ],
    },
    independentExercise: {
      id: "st-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a testing charter object with properties area, goal, and timeboxMinutes (a positive number) for exploring a file-upload feature. Make it specific enough that isWellFormedCharter(charter) returns true.",
      starterCode: `function isWellFormedCharter(c) {
  return Boolean(c && c.area && c.goal && typeof c.timeboxMinutes === "number" && c.timeboxMinutes > 0);
}

const charter = {}; // TODO: fill in area, goal, timeboxMinutes
`,
      solutionCode: `function isWellFormedCharter(c) {
  return Boolean(c && c.area && c.goal && typeof c.timeboxMinutes === "number" && c.timeboxMinutes > 0);
}

const charter = {
  area: "File-upload feature",
  goal: "Find how the uploader behaves with unusual file types and sizes near its stated limit",
  timeboxMinutes: 30,
};`,
      harness: `
        try { window.__report('t1', isWellFormedCharter(charter), 'The charter should have a non-empty area, goal, and a positive timeboxMinutes.'); } catch (e) { window.__report('t1', false, 'charter is not defined: ' + e.message); }
      `,
      tests: [{ id: "t1", description: "the charter is well-formed", hidden: false }],
      hints: [
        "area: what part of the system. goal: what you're specifically trying to learn or find.",
        "timeboxMinutes must be a number greater than 0.",
      ],
    },
    commonMistakes: [
      "Treating exploratory testing as an excuse to skip planning entirely, rather than a disciplined technique with its own structure (a charter and a time box).",
      "Taking notes too sparse to reproduce a discovered bug later, wasting the value of the discovery.",
      "Assuming exploratory testing replaces structured techniques, when the two are complementary — structured techniques cover the known, exploration finds the unanticipated.",
    ],
    quiz: [
      {
        id: "st-10-q1",
        prompt:
          "What is the key difference between exploratory testing and scripted test-case execution?",
        choices: [
          "Exploratory testing requires no skill",
          "In exploratory testing, design, execution, and learning happen simultaneously, with each observation informing the next step",
          "Scripted testing is always faster",
          "There is no meaningful difference",
        ],
        correctIndex: 1,
        explanation:
          "Exploratory testing's defining trait is that what you observe while testing directly shapes what you try next, unlike a script decided entirely in advance.",
      },
      {
        id: "st-10-q2",
        prompt: 'What does a testing charter provide that unstructured "clicking around" does not?',
        choices: [
          "A guarantee of finding all bugs",
          "A specific, bounded goal and scope that focuses the session while still allowing real discovery",
          "A complete list of every test case to execute",
          "Automated test execution",
        ],
        correctIndex: 1,
        explanation:
          "A charter focuses exploration on a specific area and goal within a time box, without pre-deciding every step — that's what makes it disciplined rather than aimless.",
      },
      {
        id: "st-10-q3",
        prompt:
          "A tester finds a real bug during exploratory testing but writes no notes on how they got there. What is the practical consequence?",
        choices: [
          "None — the bug report speaks for itself",
          "The bug is likely to be difficult or impossible for a developer to reproduce and fix",
          "The bug becomes a regression test automatically",
          "This is standard, acceptable practice",
        ],
        correctIndex: 1,
        explanation:
          "A bug that can't be reliably reproduced from the notes taken during discovery is much harder to diagnose and fix, undermining the value of having found it at all.",
      },
    ],
    takeaway:
      "Exploratory testing is a disciplined, complementary technique — not a replacement for planning — that uses a bounded charter and careful notes to find the defects a pre-written plan couldn't anticipate.",
    summary:
      "This lesson introduced exploratory testing as simultaneous design-execution-learning, guided by a testing charter, and explained why reproducible notes are essential to its value.",
    nextLessonSlug: "st-risk-based-testing",
  },
  {
    id: "st-risk-based-testing",
    slug: "st-risk-based-testing",
    title: "Risk-Based Testing and Test Planning",
    description:
      "You can never test everything. Risk-based testing gives you a principled way to decide what gets tested first and hardest.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["st-exploratory-testing"],
    objectives: [
      "Score a feature's testing priority using likelihood and impact",
      "Explain why risk-based prioritization matters more as available time shrinks",
      "Distinguish risk-based planning from testing everything equally",
    ],
    skills: ["software-testing", "risk-based-testing", "test-planning"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Risk-Based Testing",
        url: "https://glossary.istqb.org/en_US/term/risk-based-testing",
      },
    ],
    keywords: ["risk-based testing", "test planning", "test prioritization"],
    explanation: `A release is two days away, and there's a full week's worth of testing left to do. Something will not get tested as thoroughly as planned. The question is not *whether* to cut scope — it's *which* scope to cut, and **risk-based testing** answers that with a repeatable formula instead of a guess: for each area, estimate **likelihood** (how probable is a defect here?) and **impact** (how bad would it be if one slipped through?), and prioritize testing effort toward the areas where both are high.

A payment-processing change has high impact almost by definition — get it wrong and customers are charged incorrectly, a serious, trust-destroying, possibly legal problem. If it's also a complex change touching code that's historically been buggy, its likelihood is high too: this area gets tested first, most thoroughly, with the widest range of techniques from this course. A cosmetic tooltip color change has low impact (nobody's charged wrong, nobody's data is at risk) and usually low likelihood (simple, isolated change) — it can reasonably get a much lighter pass, or be deferred first if time runs out.

Likelihood is informed by real signals: how complex is the change, how much of the codebase does it touch, has this area had bugs before, how experienced is the team with this kind of code. Impact is informed by different signals: how many users are affected, is money or personal data involved, is there a legal or safety consequence, how visible is the failure.

Risk-based testing is not an excuse to skip testing low-risk areas entirely — it's a principled way to allocate *finite* time, which is always finite in a real project. Teams that test every feature with equal intensity regardless of risk often end up over-testing trivial areas and under-testing the ones where a defect would actually hurt.`,
    example: {
      language: "javascript",
      description:
        "A simple risk score: likelihood times impact, both on a 1-5 scale, used to rank features by testing priority.",
      code: `function riskScore(likelihood, impact) {
  return likelihood * impact; // both on a 1 (low) to 5 (high) scale
}

const features = [
  { name: "Payment processing", likelihood: 4, impact: 5 },
  { name: "Tooltip color", likelihood: 1, impact: 1 },
  { name: "Password reset", likelihood: 3, impact: 4 },
];

const ranked = features
  .map((f) => ({ ...f, score: riskScore(f.likelihood, f.impact) }))
  .sort((a, b) => b.score - a.score);

console.log(ranked.map((f) => \`\${f.name}: \${f.score}\`));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a fourth feature to the array with your own likelihood/impact scores, then re-run and see where it ranks.",
      code: `function riskScore(likelihood, impact) {
  return likelihood * impact;
}

const features = [
  { name: "Payment processing", likelihood: 4, impact: 5 },
  { name: "Tooltip color", likelihood: 1, impact: 1 },
];

const ranked = features
  .map((f) => ({ ...f, score: riskScore(f.likelihood, f.impact) }))
  .sort((a, b) => b.score - a.score);

console.log(ranked.map((f) => \`\${f.name}: \${f.score}\`));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Score two features on a 1-5 scale for likelihood and impact, then compute their risk scores: loginLikelihood, loginImpact, footerLikelihood, footerImpact (a security-sensitive login change vs. a static footer text update). Then set loginScore and footerScore as likelihood times impact.",
      starterCode: `let loginLikelihood = 0; // TODO 1-5
let loginImpact = 0; // TODO 1-5
let footerLikelihood = 0; // TODO 1-5
let footerImpact = 0; // TODO 1-5

let loginScore = 0; // TODO: loginLikelihood * loginImpact
let footerScore = 0; // TODO: footerLikelihood * footerImpact
`,
      solutionCode: `let loginLikelihood = 4;
let loginImpact = 5;
let footerLikelihood = 1;
let footerImpact = 1;

let loginScore = loginLikelihood * loginImpact;
let footerScore = footerLikelihood * footerImpact;`,
      harness: `
        try { window.__report('t1', loginScore > footerScore, 'A security-sensitive login change should score meaningfully higher risk than a static footer text update.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', loginScore === loginLikelihood * loginImpact, 'loginScore should equal loginLikelihood times loginImpact.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', footerScore <= 5, 'A trivial footer text change should have a low overall risk score.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "login scores higher risk than the footer change", hidden: false },
        { id: "t2", description: "loginScore is correctly computed", hidden: false },
        { id: "t3", description: "footerScore reflects a low-risk change", hidden: false },
      ],
      hints: [
        "A security-sensitive area affecting all users should score high on both likelihood and impact.",
        "A cosmetic, isolated text change should score low on both.",
      ],
    },
    independentExercise: {
      id: "st-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function testingPriority(likelihood, impact) that returns 'high' if likelihood*impact >= 15, 'medium' if it's 6 to 14, and 'low' if it's 5 or below (both scales are 1-5).",
      starterCode: `function testingPriority(likelihood, impact) {
  // TODO: implement using the thresholds described above
}
`,
      solutionCode: `function testingPriority(likelihood, impact) {
  const score = likelihood * impact;
  if (score >= 15) return "high";
  if (score >= 6) return "medium";
  return "low";
}`,
      harness: `
        try { window.__report('t1', testingPriority(5, 5) === 'high', 'A 5x5 score (25) should be high priority.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', testingPriority(3, 3) === 'medium', 'A 3x3 score (9) should be medium priority.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', testingPriority(1, 1) === 'low', 'A 1x1 score (1) should be low priority.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', testingPriority(5, 3) === 'high', 'A 5x3 score (15) is exactly at the high threshold — the boundary matters here.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "high-risk combination returns 'high'", hidden: false },
        { id: "t2", description: "medium-risk combination returns 'medium'", hidden: false },
        { id: "t3", description: "low-risk combination returns 'low'", hidden: false },
        { id: "t4", description: "exactly-at-boundary score (15) returns 'high'", hidden: false },
      ],
      hints: [
        "Compute the product first, then compare it against the two thresholds in order.",
        "Remember what you learned about boundaries: check >= 15 first, since 15 itself belongs to 'high'.",
      ],
    },
    commonMistakes: [
      "Skipping testing on a low-risk area entirely instead of giving it a lighter, proportionate pass — risk-based testing prioritizes, it doesn't eliminate.",
      "Estimating likelihood or impact from gut feeling alone instead of real signals (code complexity, past defect history, number of users affected, financial/legal consequences).",
      "Treating the risk score as a one-time calculation instead of revisiting it as a feature's complexity or blast radius changes during development.",
    ],
    quiz: [
      {
        id: "st-11-q1",
        prompt: "What two factors does risk-based testing combine to prioritize testing effort?",
        choices: [
          "Cost and deadline",
          "Likelihood of a defect and the impact if one occurs",
          "Number of lines of code and number of developers",
          "Popularity of the feature with the marketing team",
        ],
        correctIndex: 1,
        explanation:
          "Risk-based testing scores each area by how likely a defect is and how severe the consequences would be, then prioritizes the combination of both.",
      },
      {
        id: "st-11-q2",
        prompt:
          "A cosmetic, isolated change has low likelihood and low impact. What does risk-based testing suggest?",
        choices: [
          "Skip all testing forever",
          "Give it a lighter, proportionate testing pass compared to high-risk areas",
          "Test it with exactly the same intensity as payment processing",
          "It should be tested before anything else",
        ],
        correctIndex: 1,
        explanation:
          "Risk-based testing allocates finite time proportionally — low-risk areas still get attention, just less relative to high-risk ones.",
      },
      {
        id: "st-11-q3",
        prompt:
          "What real signal would most reasonably raise a feature's estimated likelihood of containing a defect?",
        choices: [
          "The feature is visually appealing",
          "The change is complex and touches an area with a history of past bugs",
          "The feature was requested by a senior stakeholder",
          "The feature has a short name",
        ],
        correctIndex: 1,
        explanation:
          "Complexity and a history of defects in the same area are concrete, evidence-based signals for likelihood — unlike subjective factors like visual appeal or naming.",
      },
    ],
    takeaway:
      'Risk-based testing turns "we don\'t have time to test everything equally" from an uncomfortable reality into a principled decision, using likelihood and impact to decide where finite testing time goes first.',
    summary:
      "This lesson covered scoring testing priority by combining likelihood and impact, and explained why proportional, risk-informed allocation beats testing every area with equal intensity.",
    nextLessonSlug: "st-defect-reporting",
  },
  {
    id: "st-defect-reporting",
    slug: "st-defect-reporting",
    title: "Writing Defect Reports Testers Trust",
    description:
      "A bug a developer can't reproduce is a bug that doesn't get fixed. Learn the anatomy of a defect report that actually gets acted on.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 11,
    difficulty: "beginner",
    estimatedMinutes: 17,
    prerequisites: ["st-risk-based-testing"],
    objectives: [
      "Identify the essential elements every defect report needs",
      "Rewrite a vague defect report into a reproducible, actionable one",
      "Explain why severity and priority are different judgments, not synonyms",
    ],
    skills: ["software-testing", "defect-reporting"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Defect Report",
        url: "https://glossary.istqb.org/en_US/term/defect-report",
      },
    ],
    keywords: ["defect report", "bug report", "severity", "priority"],
    explanation: `"Search is broken" is a sentence, not a defect report. A developer who receives it can't reproduce it, can't judge how bad it is, and can't confirm when it's fixed — so it sits, unactioned, until someone eventually asks the reporter for the details that should have been there from the start. A defect report is a piece of technical communication with a specific job: **let someone who wasn't there reproduce the problem, understand its impact, and verify the fix**, without needing to ask the reporter anything else.

A trustworthy defect report has, at minimum: **steps to reproduce** (numbered, specific, in order — not "click around the search page"), **expected result** (what should have happened), **actual result** (what happened instead — with the exact error message or screenshot, not a paraphrase), and **environment** (browser, OS, account type, or whatever context could plausibly matter). Steps that are vague ("go to the site, search for something") are functionally useless — "go to /search, type 'wireless mouse' with a trailing space, press Enter" is reproducible by a stranger.

Two more fields are commonly confused with each other and shouldn't be: **severity** is a technical judgment about how bad the defect is on its own terms — does it crash the app, corrupt data, or just misalign a button by two pixels? **Priority** is a business judgment about how soon it needs fixing relative to everything else in the queue — a low-severity typo on the homepage might get high priority right before a major launch, while a high-severity crash in a rarely-used admin tool might get lower priority than a release-blocking issue. A report that conflates the two ("this is critical!" for a cosmetic issue) trains reviewers to stop trusting the reporter's judgment, which makes the *next* genuinely critical report harder to get taken seriously.`,
    example: {
      language: "javascript",
      description:
        "A structured defect report as an object, checked against the fields it needs to actually be useful.",
      code: `const report = {
  title: "Search returns no results for a query with a trailing space",
  stepsToReproduce: [
    "Go to /search",
    "Type 'wireless mouse ' (note the trailing space)",
    "Press Enter",
  ],
  expectedResult: "Results for 'wireless mouse' appear, ignoring the trailing space",
  actualResult: "\\"No results found\\" is shown, even though the product exists",
  environment: "Chrome 128, macOS, guest account",
  severity: "medium",
  priority: "medium",
};

function hasRequiredFields(r) {
  return Boolean(
    r.stepsToReproduce?.length && r.expectedResult && r.actualResult && r.environment,
  );
}
console.log(hasRequiredFields(report)); // true`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Remove the stepsToReproduce array (set it to []) and re-run — see how the check reacts to a report missing its most important field.",
      code: `const report = {
  title: "Search returns no results for a query with a trailing space",
  stepsToReproduce: ["Go to /search", "Type 'wireless mouse '", "Press Enter"],
  expectedResult: "Results appear",
  actualResult: "No results found",
  environment: "Chrome 128, macOS",
};

function hasRequiredFields(r) {
  return Boolean(
    r.stepsToReproduce?.length && r.expectedResult && r.actualResult && r.environment,
  );
}
console.log(hasRequiredFields(report));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Given vagueReport below, decide whether it's actionable by setting isActionable, and explain why in oneReasonMissing (a short string naming one missing element).",
      starterCode: `const vagueReport = { title: "Checkout is broken", notes: "tried it a few times, didn't work" };
let isActionable = null; // TODO
let oneReasonMissing = ""; // TODO
`,
      solutionCode: `const vagueReport = { title: "Checkout is broken", notes: "tried it a few times, didn't work" };
let isActionable = false;
let oneReasonMissing = "steps to reproduce";`,
      harness: `
        try { window.__report('t1', isActionable === false, 'This report has no steps, expected result, actual result, or environment — it is not actionable as written.'); } catch (e) { window.__report('t1', false, 'isActionable is not defined: ' + e.message); }
        try { window.__report('t2', typeof oneReasonMissing === 'string' && oneReasonMissing.length > 3, 'Name one specific missing element (e.g. "steps to reproduce", "expected result").'); } catch (e) { window.__report('t2', false, 'oneReasonMissing is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly identifies the report as not actionable",
          hidden: false,
        },
        { id: "t2", description: "names a real missing element", hidden: false },
      ],
      hints: [
        '"Didn\'t work" and "tried it a few times" contain no reproducible steps at all.',
        "Any of steps-to-reproduce, expected result, actual result, or environment would be a valid answer.",
      ],
    },
    independentExercise: {
      id: "st-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function classifySeverityPriority(crashesApp, isHomepageRightBeforeLaunch) that returns an object { severity, priority } using strings 'high' or 'low'. A crash is always high severity. A cosmetic issue on the homepage right before launch is low severity but high priority (business urgency despite low technical severity).",
      starterCode: `function classifySeverityPriority(crashesApp, isHomepageRightBeforeLaunch) {
  // TODO: return { severity, priority } following the rule described above
}
`,
      solutionCode: `function classifySeverityPriority(crashesApp, isHomepageRightBeforeLaunch) {
  if (crashesApp) {
    return { severity: "high", priority: "high" };
  }
  if (isHomepageRightBeforeLaunch) {
    return { severity: "low", priority: "high" };
  }
  return { severity: "low", priority: "low" };
}`,
      harness: `
        try {
          const r1 = classifySeverityPriority(true, false);
          window.__report('t1', r1.severity === 'high' && r1.priority === 'high', 'A crash should be high severity and high priority.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const r2 = classifySeverityPriority(false, true);
          window.__report('t2', r2.severity === 'low' && r2.priority === 'high', 'A cosmetic homepage issue right before launch should be low severity but high priority — this is the key distinction the lesson teaches.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try {
          const r3 = classifySeverityPriority(false, false);
          window.__report('t3', r3.severity === 'low' && r3.priority === 'low', 'An ordinary cosmetic issue with no launch urgency should be low severity and low priority.');
        } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a crash is high severity and high priority", hidden: false },
        { id: "t2", description: "a low-severity issue can still be high priority", hidden: false },
        {
          id: "t3",
          description: "an ordinary low-severity issue is low priority too",
          hidden: false,
        },
      ],
      hints: [
        "Severity is about technical damage; priority is about business urgency — they can disagree.",
        "The homepage-before-launch case is exactly where severity and priority diverge: low severity, high priority.",
      ],
    },
    commonMistakes: [
      "Writing steps to reproduce vaguely enough that a stranger following them exactly would not land on the same bug.",
      "Pasting a paraphrase of an error instead of the exact error message or a screenshot, losing details that matter for diagnosis.",
      "Using severity and priority interchangeably, which erodes trust in future reports once someone notices the mismatch.",
    ],
    quiz: [
      {
        id: "st-12-q1",
        prompt:
          "What is the single most important test of whether a defect report's steps to reproduce are good enough?",
        choices: [
          "Whether they are written in complete sentences",
          "Whether a stranger who wasn't there could follow them and land on the same unexpected result",
          "Whether they include a screenshot",
          "Whether they are under 100 words",
        ],
        correctIndex: 1,
        explanation:
          "The entire purpose of steps to reproduce is enabling someone else to independently reach the same failure — anything less defeats the report's purpose.",
      },
      {
        id: "st-12-q2",
        prompt: "How do severity and priority differ?",
        choices: [
          "They are two words for the same thing",
          "Severity is a technical judgment of how bad the defect is; priority is a business judgment of how soon it needs fixing",
          "Severity is set by developers and priority is set by testers, with no other difference",
          "Priority only applies to security bugs",
        ],
        correctIndex: 1,
        explanation:
          "Severity measures the defect's technical impact on its own terms; priority measures urgency relative to everything else competing for the team's time.",
      },
      {
        id: "st-12-q3",
        prompt:
          "A cosmetic typo appears on the homepage the day before a major public launch. What is the most accurate classification?",
        choices: [
          "High severity, high priority",
          "Low severity, high priority",
          "High severity, low priority",
          "It cannot be classified without more information",
        ],
        correctIndex: 1,
        explanation:
          "The typo does no technical damage (low severity) but the launch timing makes it urgent to fix regardless (high priority) — exactly the divergence severity and priority are meant to capture.",
      },
    ],
    takeaway:
      "A defect report's job is to let someone else reproduce, understand, and verify the fix for a problem without asking the reporter anything else — and severity and priority answer two genuinely different questions.",
    summary:
      "This lesson covered the essential elements of an actionable defect report and the distinction between severity (technical impact) and priority (business urgency).",
    nextLessonSlug: "st-traceability-regression",
  },
  {
    id: "st-traceability-regression",
    slug: "st-traceability-regression",
    title: "Traceability and Regression Strategy",
    description:
      "Prove every requirement has a test, and build a regression strategy that catches old bugs coming back without re-testing everything by hand every release.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 12,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["st-defect-reporting"],
    objectives: [
      "Build a traceability matrix linking requirements to test cases",
      "Identify a requirement with no test coverage using a traceability matrix",
      "Explain how automation changes what a sustainable regression strategy looks like",
    ],
    skills: ["software-testing", "traceability", "regression-strategy"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Traceability",
        url: "https://glossary.istqb.org/en_US/term/traceability",
      },
    ],
    keywords: ["traceability matrix", "regression testing", "test coverage"],
    explanation: `A project has 40 requirements and 120 test cases. Is every requirement actually covered? Nobody can answer that by eyeballing two separate lists — you need a **traceability matrix**: a mapping that links each requirement to the test case(s) that verify it. Read one way, it answers "which tests cover requirement R12?" Read the other way, it answers the more dangerous question: "which requirements have *zero* test cases pointing at them?" A requirement with no linked test case isn't just under-tested — as far as testing evidence goes, it's completely unverified, and that's the exact kind of gap that ships silently because nobody wrote it down anywhere obvious.

Traceability also matters when a requirement changes. If requirement R12 changes and the matrix says test cases 45, 46, and 52 verify it, you know exactly which tests need review — without traceability, a changed requirement leaves you guessing which of 120 test cases might now be stale.

The other half of this lesson is **regression strategy**: as a product grows, the number of previously-passing behaviors that a new change could accidentally break grows with it. Re-running every test manually before every release does not scale — a suite that takes a day to run manually becomes a suite nobody actually runs before a Friday release. This is exactly where **automation** earns its keep: a regression suite that runs in minutes, unattended, on every code change, catches old bugs coming back without costing a human day of repetitive manual clicking every single time.

A sustainable regression strategy is deliberate about what gets automated and what stays manual: **stable, frequently-repeated checks** (does login still work, does checkout still complete) are ideal automation candidates — they change rarely and run constantly. **Areas still actively changing, or requiring human judgment** (does this new design actually feel right, is this error message actually clear to a real user) are often better left to manual and exploratory testing, at least until they stabilize. Automating a test for a feature that's still being redesigned weekly just means rewriting the automation every week, which usually costs more than it saves.`,
    example: {
      language: "javascript",
      description:
        "A tiny traceability matrix, and a function that finds requirements with zero linked test cases — exactly the gap that matters most.",
      code: `const requirements = ["R1", "R2", "R3"];
const traceability = {
  R1: ["T1", "T2"],
  R2: [],
  R3: ["T3"],
};

function findUncoveredRequirements(reqs, matrix) {
  return reqs.filter((r) => !matrix[r] || matrix[r].length === 0);
}

console.log(findUncoveredRequirements(requirements, traceability)); // ["R2"]`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Add a test case to R2's array so it's no longer uncovered, then re-run.",
      code: `const requirements = ["R1", "R2", "R3"];
const traceability = {
  R1: ["T1", "T2"],
  R2: [],
  R3: ["T3"],
};

function findUncoveredRequirements(reqs, matrix) {
  return reqs.filter((r) => !matrix[r] || matrix[r].length === 0);
}

console.log(findUncoveredRequirements(requirements, traceability));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Given the matrix below, set uncovered to the array of requirement names with zero linked test cases, using the findUncoveredRequirements function already defined.",
      starterCode: `function findUncoveredRequirements(reqs, matrix) {
  return reqs.filter((r) => !matrix[r] || matrix[r].length === 0);
}

const requirements = ["R1", "R2", "R3", "R4"];
const matrix = { R1: ["T1"], R2: [], R3: ["T2", "T3"], R4: [] };

let uncovered = []; // TODO: use findUncoveredRequirements
`,
      solutionCode: `function findUncoveredRequirements(reqs, matrix) {
  return reqs.filter((r) => !matrix[r] || matrix[r].length === 0);
}

const requirements = ["R1", "R2", "R3", "R4"];
const matrix = { R1: ["T1"], R2: [], R3: ["T2", "T3"], R4: [] };

let uncovered = findUncoveredRequirements(requirements, matrix);`,
      harness: `
        try {
          const expected = ['R2', 'R4'];
          const matches = Array.isArray(uncovered) && uncovered.length === 2 && expected.every((r) => uncovered.includes(r));
          window.__report('t1', matches, 'uncovered should contain exactly R2 and R4, the two requirements with empty test-case arrays.');
        } catch (e) { window.__report('t1', false, 'uncovered is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly finds the uncovered requirements", hidden: false },
      ],
      hints: [
        "Call the provided findUncoveredRequirements function with requirements and matrix.",
        "R2 and R4 both map to empty arrays in the matrix — those are the uncovered ones.",
      ],
    },
    independentExercise: {
      id: "st-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function recommendedApproach(isStableAndRepeated, isStillActivelyChanging) that returns 'automate' if the check is stable and repeated, 'manual' if the area is still actively changing, and 'manual' as a safe default otherwise.",
      starterCode: `function recommendedApproach(isStableAndRepeated, isStillActivelyChanging) {
  // TODO: implement the rule described above
}
`,
      solutionCode: `function recommendedApproach(isStableAndRepeated, isStillActivelyChanging) {
  if (isStillActivelyChanging) return "manual";
  if (isStableAndRepeated) return "automate";
  return "manual";
}`,
      harness: `
        try { window.__report('t1', recommendedApproach(true, false) === 'automate', 'A stable, repeated check with no active change should be recommended for automation.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', recommendedApproach(true, true) === 'manual', 'Even a stable-looking check in an actively-changing area should stay manual until it stabilizes.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', recommendedApproach(false, false) === 'manual', 'A check that is neither stable/repeated nor actively changing should default to manual.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "a stable, repeated check is recommended for automation",
          hidden: false,
        },
        { id: "t2", description: "an actively-changing area stays manual", hidden: false },
        { id: "t3", description: "the safe default is manual", hidden: false },
      ],
      hints: [
        "Active change should override everything else and force a manual recommendation.",
        "Only recommend automation when the area is both stable and repeated, and not actively changing.",
      ],
    },
    commonMistakes: [
      "Building a traceability matrix once at project kickoff and never updating it as requirements change, so it silently becomes inaccurate.",
      "Automating a regression test for a feature that's still being redesigned weekly, spending more time maintaining the automation than it saves.",
      'Treating "no test case is linked to this requirement" as a minor gap instead of what it actually is: zero testing evidence for that requirement.',
    ],
    quiz: [
      {
        id: "st-13-q1",
        prompt: "What is the primary purpose of a traceability matrix?",
        choices: [
          "To track how many hours each tester worked",
          "To link requirements to the test cases that verify them, revealing coverage gaps",
          "To replace the need for a test plan",
          "To measure code performance",
        ],
        correctIndex: 1,
        explanation:
          "A traceability matrix's core value is making coverage gaps visible — a requirement with zero linked tests has zero testing evidence behind it.",
      },
      {
        id: "st-13-q2",
        prompt:
          "Why doesn't manually re-running every test before every release scale as a product grows?",
        choices: [
          "Manual testing is always inaccurate",
          "The time cost grows with the product, and a suite that takes too long tends to get skipped under release pressure",
          "Manual testing is illegal for large products",
          "It scales fine indefinitely",
        ],
        correctIndex: 1,
        explanation:
          "As the regression surface grows, a manual-only approach becomes slower and slower until time pressure causes it to be skipped — exactly the risk automation addresses.",
      },
      {
        id: "st-13-q3",
        prompt: "Which kind of check is the best candidate for test automation?",
        choices: [
          "A feature currently being redesigned every week",
          "A stable, frequently-repeated check like login or checkout completing successfully",
          "A one-time visual design review",
          "Any check, regardless of stability",
        ],
        correctIndex: 1,
        explanation:
          "Automation pays off most on stable checks that run constantly — automating something still changing weekly means rewriting the automation constantly, often costing more than it saves.",
      },
    ],
    takeaway:
      'A traceability matrix turns "is everything tested?" from a guess into a checkable fact, and a sustainable regression strategy automates the stable, repeated checks while keeping still-changing areas manual.',
    summary:
      "This lesson covered building a traceability matrix to find requirements with no test coverage, and choosing what to automate versus test manually as a product grows.",
    nextLessonSlug: "st-agile-a11y-security",
  },
  {
    id: "st-agile-a11y-security",
    slug: "st-agile-a11y-security",
    title: "Agile Testing, Accessibility, and Security Awareness",
    description:
      "How testing changes shape in an agile team, and two categories of quality — accessibility and security — every tester should know to watch for even without being a specialist.",
    trackSlug: "software-testing",
    courseSlug: "software-testing-foundations",
    order: 13,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["st-traceability-regression"],
    objectives: [
      "Explain how testing responsibilities shift in an agile, whole-team-owns-quality model",
      "Identify at least three common accessibility issues a tester can catch without specialist tools",
      "Identify at least three common security awareness checks a non-specialist tester can perform",
    ],
    skills: ["software-testing", "agile-testing", "accessibility", "security-awareness"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      { label: "W3C Web Accessibility Initiative", url: "https://www.w3.org/WAI/fundamentals/" },
      { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
    ],
    keywords: ["agile testing", "accessibility testing", "security testing", "quality awareness"],
    explanation: `In a traditional, phase-gated process, testing happens in its own dedicated phase after development is "done." In an **agile team**, that separation mostly disappears: testing happens continuously, alongside development, within the same short iteration — a tester (or a developer wearing a testing hat) is involved from the moment a story is written, not handed a finished feature days later. This shift changes what testing skill looks like day to day: less "execute a large pre-written test plan against a finished build," more "ask sharp questions about a requirement before it's built, write a few tight automated checks as the feature takes shape, and explore the result quickly once it's ready." The techniques from this entire course — equivalence partitioning, boundary analysis, decision tables, risk-based prioritization — still apply; they just get applied continuously in small increments instead of as one large event at the end.

Two categories of quality deserve specific attention from every tester, not just specialists, because they're easy to overlook and expensive to fix late.

**Accessibility.** A tester without specialized tools can still catch real, common problems: is every interactive element reachable and operable using only the keyboard (try tabbing through a form without touching the mouse)? Does every image have meaningful alt text, or is it missing/empty on something that conveys real information? Is color the *only* way a status is communicated (a red vs. green dot with no text or icon fails for anyone with certain forms of color blindness)? Is there enough contrast between text and its background to actually read comfortably? These are concrete, checkable questions any tester can ask on every feature, not a separate specialist review bolted on at the end.

**Security awareness.** A non-specialist tester isn't expected to perform a full security audit, but should reflexively try a few things: does a form field accept and safely handle unexpected input (a very long string, HTML tags, a single quote character) without breaking or executing it? Are error messages revealing more than they should (a stack trace, an internal file path, confirmation of whether a specific username exists)? Is sensitive data (passwords, tokens) ever visible in a URL, browser console, or network tab where it shouldn't be? Catching these early, even informally, is far cheaper than a real vulnerability discovered after release.`,
    example: {
      language: "javascript",
      description:
        "A small accessibility/security awareness checklist encoded as checkable data, rather than a vague mental note.",
      code: `const checklist = {
  keyboardOperable: true,
  imagesHaveAltText: false,   // found a missing alt attribute
  colorIsNotOnlySignal: true,
  sufficientContrast: true,
  formRejectsUnsafeInput: true,
  errorMessagesAreGeneric: false, // found a stack trace exposed to the user
};

function findFailingChecks(c) {
  return Object.entries(c)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
}

console.log(findFailingChecks(checklist));
// ["imagesHaveAltText", "errorMessagesAreGeneric"]`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Fix one of the two failing checks below (set it to true) and re-run to see the list shrink.",
      code: `const checklist = {
  keyboardOperable: true,
  imagesHaveAltText: false,
  errorMessagesAreGeneric: false,
};

function findFailingChecks(c) {
  return Object.entries(c)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
}

console.log(findFailingChecks(checklist));`,
      editable: true,
    },
    guidedExercise: {
      id: "st-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A status indicator uses only a red or green dot with no text or icon to show 'failed' vs 'passed'. Set isAccessibilityIssue and explain briefly in reason.",
      starterCode: `let isAccessibilityIssue = null; // TODO
let reason = ""; // TODO: a short explanation
`,
      solutionCode: `let isAccessibilityIssue = true;
let reason = "Color alone conveys the status, which fails for users with certain forms of color blindness.";`,
      harness: `
        try { window.__report('t1', isAccessibilityIssue === true, 'Using color as the only signal is a well-known accessibility issue.'); } catch (e) { window.__report('t1', false, 'isAccessibilityIssue is not defined: ' + e.message); }
        try { window.__report('t2', typeof reason === 'string' && reason.length > 10, 'Write a brief real explanation, not an empty string.'); } catch (e) { window.__report('t2', false, 'reason is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly identifies this as an accessibility issue",
          hidden: false,
        },
        { id: "t2", description: "gives a real explanation", hidden: false },
      ],
      hints: [
        "Ask: could someone who can't distinguish red from green tell the status apart here?",
        "Color-only status indicators are one of the most common, easiest-to-catch accessibility issues.",
      ],
    },
    independentExercise: {
      id: "st-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function classifyErrorMessage(message) that returns 'unsafe' if the message contains the words 'stack trace', a file path pattern like '/usr/' or 'C:\\\\', or the word 'SELECT' (suggesting a leaked SQL query) — case-insensitively — and 'safe' otherwise.",
      starterCode: `function classifyErrorMessage(message) {
  // TODO: return 'unsafe' if the message leaks internal details, 'safe' otherwise
}
`,
      solutionCode: `function classifyErrorMessage(message) {
  const lower = message.toLowerCase();
  const leaksDetails =
    lower.includes("stack trace") ||
    lower.includes("/usr/") ||
    lower.includes("c:\\\\") ||
    lower.includes("select");
  return leaksDetails ? "unsafe" : "safe";
}`,
      harness: `
        try { window.__report('t1', classifyErrorMessage("Something went wrong. Please try again.") === 'safe', 'A generic message with no internal details is safe.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', classifyErrorMessage("Error: SELECT * FROM users WHERE id=5 failed") === 'unsafe', 'Leaking a raw SQL query is unsafe.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', classifyErrorMessage("TypeError at /usr/app/server.js:42, stack trace follows") === 'unsafe', 'Leaking a file path and stack trace is unsafe.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a generic message is classified as safe", hidden: false },
        { id: "t2", description: "a leaked SQL query is classified as unsafe", hidden: false },
        {
          id: "t3",
          description: "a leaked stack trace/path is classified as unsafe",
          hidden: false,
        },
      ],
      hints: [
        "Normalize to lowercase first so the check isn't case-sensitive.",
        "Check for any of the three telltale patterns: 'stack trace', a file path, or a SQL keyword like 'select'.",
      ],
    },
    commonMistakes: [
      "Treating accessibility and security as specialist-only concerns instead of things every tester can catch with simple, repeatable checks.",
      "Testing only with a mouse and never verifying keyboard-only operability, which silently excludes real users.",
      'Assuming agile means "less testing" rather than "testing continuously, in smaller increments, throughout development."',
    ],
    quiz: [
      {
        id: "st-14-q1",
        prompt:
          "How does testing typically change in an agile, whole-team-owns-quality model compared to a phase-gated process?",
        choices: [
          "Testing disappears entirely",
          "Testing happens continuously alongside development in small increments, rather than as one large phase after development is finished",
          "Only automated tests are allowed",
          "Testers no longer need any test design skills",
        ],
        correctIndex: 1,
        explanation:
          "Agile testing is woven throughout development in small increments rather than concentrated into a separate final phase — the test design skills from this course still apply, just applied continuously.",
      },
      {
        id: "st-14-q2",
        prompt:
          "A status is shown only as a red or green dot with no text or icon. What quality concern does this raise?",
        choices: [
          "Performance",
          "Accessibility — color alone excludes users who can't distinguish those colors",
          "Regression risk",
          "None — this is a normal, acceptable pattern",
        ],
        correctIndex: 1,
        explanation:
          "Relying on color alone to convey information is a well-documented accessibility failure for users with certain forms of color blindness.",
      },
      {
        id: "st-14-q3",
        prompt:
          "An error message shown to a user includes a full stack trace and an internal file path. What is the concern?",
        choices: [
          "None — detailed errors always help users",
          "It may leak internal implementation details that could help an attacker, and provides a poor experience for a normal user",
          "This is required by law",
          "It only matters for mobile apps",
        ],
        correctIndex: 1,
        explanation:
          "Overly detailed error messages can reveal internal system details useful to an attacker, which is exactly the kind of thing a non-specialist tester should flag.",
      },
    ],
    takeaway:
      "Agile testing spreads the discipline across every iteration instead of one final phase, and accessibility and security awareness are concrete, checkable skills every tester can practice — not specialist-only concerns.",
    summary:
      "This final lesson covered how agile development reshapes testing into a continuous activity, and introduced concrete, non-specialist accessibility and security checks every tester should reflexively perform.",
  },
];
