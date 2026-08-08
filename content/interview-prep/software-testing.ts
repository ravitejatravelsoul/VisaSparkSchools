import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Software Testing Foundations interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics (quality
 * vs. testing, requirements analysis, test levels/types, the four design
 * techniques, exploratory/risk-based testing, defect reporting,
 * traceability, testing in an agile team).
 */
export const softwareTestingInterviewQuestions: InterviewQuestionInput[] = [
  // --- Quality vs. Testing & Requirements (10) ---
  {
    id: "st-interview-quality-01",
    courseSlug: "software-testing-foundations",
    question: "What is the difference between software quality and software testing?",
    answer:
      "Quality is a broader property of the whole product and process (meeting user needs, being maintainable, performing well); testing is one specific activity used to gather evidence about quality -- testing can reveal defects, but it doesn't itself build quality in, and passing tests doesn't guarantee a genuinely high-quality product.",
    category: "Quality vs. Testing & Requirements",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-quality-02",
    courseSlug: "software-testing-foundations",
    question: "Why can testing never prove software is completely free of defects?",
    answer:
      "Testing can only demonstrate the presence of defects (by finding them), not their absence -- the space of possible inputs and states for any non-trivial program is effectively too large to exhaustively test, so passing tests shows 'no defects found by these specific tests,' not 'no defects exist.'",
    category: "Quality vs. Testing & Requirements",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-quality-03",
    courseSlug: "software-testing-foundations",
    question:
      "What makes a requirement 'testable,' and why does an ambiguous requirement create a hidden cost later?",
    answer:
      "A testable requirement states a precise, verifiable expected outcome (e.g. 'the page loads within 2 seconds on a 3G connection') rather than a vague goal ('the page should be fast'). An ambiguous requirement forces testers to guess intent, producing test cases that may not match what stakeholders actually meant -- a cost that surfaces late, often as a dispute over whether a bug is really a bug.",
    category: "Quality vs. Testing & Requirements",
    difficulty: "intermediate",
    commonMistake:
      "Writing test cases against a vague requirement without first clarifying what specific, measurable outcome is actually expected.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-quality-04",
    courseSlug: "software-testing-foundations",
    question: "What is the difference between verification and validation in testing?",
    answer:
      "Verification asks 'are we building the product right?' (does it conform to its specification); validation asks 'are we building the right product?' (does it actually meet the user's real need) -- software can pass verification (match its spec exactly) while still failing validation (the spec itself was wrong).",
    category: "Quality vs. Testing & Requirements",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-quality-05",
    courseSlug: "software-testing-foundations",
    question:
      "Why is testing earlier in the development process (rather than only at the end) generally cheaper and more effective?",
    answer:
      "A defect found during requirements review or design costs far less to fix than the same underlying defect discovered after the feature is fully built and shipped -- by that point it may require reworking code, retesting, and potentially fixing data already affected in production.",
    category: "Quality vs. Testing & Requirements",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-quality-06",
    courseSlug: "software-testing-foundations",
    question: "What is the difference between a defect (bug) and a failure?",
    answer:
      "A defect (or fault) is a flaw in the code itself; a failure is the observable, incorrect behavior that results when that defect is actually triggered during execution -- a defect can exist in code for a long time without producing a failure, if the specific conditions that trigger it never occur.",
    category: "Quality vs. Testing & Requirements",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-quality-07",
    courseSlug: "software-testing-foundations",
    question:
      "Why is 'the developer already tested it' not sufficient assurance on its own for many real projects?",
    answer:
      "Developers testing their own code tend to (often unconsciously) test the paths they already had in mind while writing it, and can share the same misunderstanding of a requirement that caused the bug in the first place -- independent testing brings a different perspective more likely to catch what the original author overlooked.",
    category: "Quality vs. Testing & Requirements",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-quality-08",
    courseSlug: "software-testing-foundations",
    question: "What does 'requirements analysis' involve, from a tester's perspective?",
    answer:
      "Reading requirements critically to identify ambiguity, missing edge cases, and implicit assumptions before test design even begins -- a tester analyzing requirements often surfaces questions ('what should happen if the field is empty?') that improve the requirement itself, not just the eventual test cases.",
    category: "Quality vs. Testing & Requirements",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-quality-09",
    courseSlug: "software-testing-foundations",
    question:
      "What is the 'cost of quality' framing, and how does it justify investing in testing?",
    answer:
      "It frames quality-related spending as either prevention/appraisal costs (testing, reviews, training -- paid deliberately, up front) or failure costs (bugs found in production, customer support burden, reputational damage -- paid involuntarily, later, usually at a higher total cost) -- testing investment is justified by shifting cost from the more expensive failure category to the cheaper prevention category.",
    category: "Quality vs. Testing & Requirements",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-quality-10",
    courseSlug: "software-testing-foundations",
    question:
      "Why should a tester generally avoid saying 'this is broken' without further explanation, even when a defect is genuinely severe?",
    answer:
      "A vague description forces the developer to spend time reproducing the issue from scratch before they can even start diagnosing it -- effective testing communicates specifically what was expected, what actually happened, and how to reproduce it, treating the developer's time as a real constraint.",
    category: "Quality vs. Testing & Requirements",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Test Levels & Types (10) ---
  {
    id: "st-interview-levels-01",
    courseSlug: "software-testing-foundations",
    question:
      "What is the difference between unit testing, integration testing, and system testing, as test levels?",
    answer:
      "Unit testing verifies a single small piece of code (a function/method) in isolation; integration testing verifies that multiple units/components work correctly together; system testing verifies the entire integrated application against its overall requirements, end to end.",
    category: "Test Levels & Types",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-levels-02",
    courseSlug: "software-testing-foundations",
    question: "What is acceptance testing, and who typically performs it?",
    answer:
      "Testing conducted to determine whether the system satisfies the business/user's actual acceptance criteria, often performed by (or with) stakeholders or end users rather than only the technical team -- it answers 'is this actually ready to ship/accept,' distinct from earlier levels focused on technical correctness.",
    category: "Test Levels & Types",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-levels-03",
    courseSlug: "software-testing-foundations",
    question: "What is the difference between a 'test level' and a 'test type'?",
    answer:
      "A test level describes the SCOPE being tested (unit, integration, system, acceptance -- how much of the system is under test at once); a test type describes the QUESTION being asked about that scope (functional correctness, performance, security, usability) -- the two are independent dimensions that combine (e.g. system-level performance testing).",
    category: "Test Levels & Types",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-levels-04",
    courseSlug: "software-testing-foundations",
    question: "What is the difference between functional testing and non-functional testing?",
    answer:
      "Functional testing verifies WHAT the system does (does this feature produce the correct output for a given input); non-functional testing verifies HOW WELL it does it (performance, security, usability, reliability) -- a feature can be functionally correct while still failing a non-functional requirement like acceptable load time.",
    category: "Test Levels & Types",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-levels-05",
    courseSlug: "software-testing-foundations",
    question: "What is regression testing, and when is it typically run?",
    answer:
      "Re-running previously-passing tests after a code change to confirm the change didn't break existing functionality -- typically run after bug fixes, refactors, or new feature additions, since new changes can have unintended side effects on unrelated, already-working parts of the system.",
    category: "Test Levels & Types",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-levels-06",
    courseSlug: "software-testing-foundations",
    question:
      "What is smoke testing, and why is it typically fast and shallow rather than thorough?",
    answer:
      "A minimal set of tests confirming the most critical functionality works at all (e.g. 'does the app even launch, can a user log in') -- it's meant as a quick sanity gate to decide whether a build is stable enough for further, more thorough testing, not a substitute for that deeper testing.",
    category: "Test Levels & Types",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-levels-07",
    courseSlug: "software-testing-foundations",
    question: "What is the difference between black-box and white-box testing?",
    answer:
      "Black-box testing designs test cases based only on the system's specified behavior/inputs-outputs, without knowledge of its internal code; white-box testing designs test cases with knowledge of the internal code structure (e.g. ensuring every branch is executed) -- both are valid, complementary approaches at different levels.",
    category: "Test Levels & Types",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-levels-08",
    courseSlug: "software-testing-foundations",
    question:
      "Why might a test suite be described as an 'inverted pyramid' as a warning sign, referencing the standard testing pyramid concept?",
    answer:
      "The standard testing pyramid recommends many fast unit tests, fewer integration tests, and even fewer slow end-to-end tests; an 'inverted' suite (mostly slow, brittle end-to-end tests with few unit tests) tends to run slowly, be harder to debug when it fails, and give less precise localization of what actually broke.",
    category: "Test Levels & Types",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-levels-09",
    courseSlug: "software-testing-foundations",
    question:
      "What is usability testing, and how does it typically differ in method from functional testing?",
    answer:
      "Usability testing evaluates how easily real users can accomplish tasks with the system, often through observing actual users attempting realistic tasks and noting confusion/friction points -- functional testing checks 'does it work correctly against a spec,' while usability testing checks 'can a real person actually use it effectively.'",
    category: "Test Levels & Types",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-levels-10",
    courseSlug: "software-testing-foundations",
    question:
      "Why might a critical bug found only at the system-testing level, that unit tests should have caught, indicate a deeper process problem?",
    answer:
      "It suggests unit-level test coverage has a real gap for that code path -- relying on later, more expensive test levels to catch what earlier, cheaper levels should have caught is a symptom worth investigating, not just a one-off bug to patch and move past.",
    category: "Test Levels & Types",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Test Design Techniques (10) ---
  {
    id: "st-interview-design-01",
    courseSlug: "software-testing-foundations",
    question: "What is equivalence partitioning, and what problem does it solve?",
    answer:
      "Grouping an input space into partitions where every value in a partition is expected to be handled the same way by the system, then testing just one representative value per partition -- it solves the impossibility of testing every possible input by reducing an infinite input space to a small, defensible representative set.",
    category: "Test Design Techniques",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-design-02",
    courseSlug: "software-testing-foundations",
    question:
      "What is boundary-value analysis, and why do bugs disproportionately cluster at boundaries?",
    answer:
      "Testing values right at, just below, and just above a valid range's edges (e.g. for an age field accepting 18-65: test 17, 18, 65, 66) -- boundaries are where off-by-one errors in conditional logic (`<` vs `<=`) most commonly hide, since the 'interior' of a valid range is usually handled correctly by simpler logic.",
    category: "Test Design Techniques",
    difficulty: "intermediate",
    commonMistake:
      "Testing only comfortably-interior values of a valid range and missing the exact boundary values where off-by-one bugs most often hide.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-design-03",
    courseSlug: "software-testing-foundations",
    question:
      "How do equivalence partitioning and boundary-value analysis complement each other in practice?",
    answer:
      "Equivalence partitioning identifies the meaningful groups/ranges to test; boundary-value analysis then focuses extra attention on the edges of those specific partitions -- used together, they produce a small but high-value set of test cases rather than either technique alone.",
    category: "Test Design Techniques",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-design-04",
    courseSlug: "software-testing-foundations",
    question: "What is a decision table, and when is it especially useful for test design?",
    answer:
      "A structured table mapping every meaningful combination of input conditions to the corresponding expected outcome/action -- especially useful when a feature's behavior depends on the combination of several independent conditions (e.g. discount eligibility depending on membership tier AND order size AND promo code), where testing conditions individually would miss interaction effects.",
    category: "Test Design Techniques",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-design-05",
    courseSlug: "software-testing-foundations",
    question: "What is state transition testing, and what kind of system does it best apply to?",
    answer:
      "A technique modeling a system's valid states and the events that transition it between them, then testing both valid transitions and invalid ones (attempting a transition that shouldn't be allowed from a given state) -- best suited to systems with clearly-defined states, like an order's lifecycle (pending → shipped → delivered) or a login/session flow.",
    category: "Test Design Techniques",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-design-06",
    courseSlug: "software-testing-foundations",
    question:
      "Why is testing an INVALID state transition (e.g. trying to ship an already-cancelled order) just as important as testing valid ones?",
    answer:
      "A system that only correctly enforces valid transitions but silently allows an invalid one can end up in a genuinely inconsistent, hard-to-recover state -- verifying the system correctly REJECTS an illegal transition is often what catches a real bug that testing only the happy path would miss entirely.",
    category: "Test Design Techniques",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-design-07",
    courseSlug: "software-testing-foundations",
    question:
      "How would you apply equivalence partitioning to a password field that must be 8-20 characters long?",
    answer:
      "Partitions might be: too short (<8), valid length (8-20), too long (>20) -- one representative test case per partition, then boundary-value analysis adds specific edge tests at exactly 7, 8, 20, and 21 characters to catch off-by-one errors at the range's actual limits.",
    category: "Test Design Techniques",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-design-08",
    courseSlug: "software-testing-foundations",
    question:
      "Why are these systematic test design techniques described as producing a 'small, defensible' set of test cases, rather than just 'a set of test cases'?",
    answer:
      "'Defensible' means you can justify to a stakeholder exactly why each test case exists and what specific risk it covers -- as opposed to an arbitrarily large pile of tests with unclear purpose, or too few tests chosen without a systematic rationale, a defensible set demonstrates deliberate, explainable coverage decisions.",
    category: "Test Design Techniques",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-design-09",
    courseSlug: "software-testing-foundations",
    question:
      "What is a common mistake when applying equivalence partitioning to a field that accepts free-form text?",
    answer:
      "Treating 'any text' as a single partition and testing only one example -- free-form text fields often have hidden sub-partitions worth testing separately: empty string, extremely long input, special characters, and internationalized/non-ASCII text, each of which can expose different bugs.",
    category: "Test Design Techniques",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-design-10",
    courseSlug: "software-testing-foundations",
    question:
      "Why do these design techniques matter even for a tester who will ultimately automate the resulting test cases?",
    answer:
      "Automation tools execute whatever test cases you give them exactly as written -- they don't decide WHICH cases are worth testing. The design techniques are what determine the actual coverage and value of the automated suite; automating a poorly-designed set of test cases just runs bad coverage faster.",
    category: "Test Design Techniques",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Exploratory & Risk-Based Testing (10) ---
  {
    id: "st-interview-exploratory-01",
    courseSlug: "software-testing-foundations",
    question:
      "What is exploratory testing, and how does it differ from scripted test-case execution?",
    answer:
      "Simultaneous learning, test design, and test execution -- a tester actively investigates the application, using what they discover to inform their next test, rather than following a pre-written script step by step. It's especially good at finding unanticipated issues that a fixed test plan, designed before seeing the actual system, wouldn't have thought to check.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-exploratory-02",
    courseSlug: "software-testing-foundations",
    question:
      "Why is exploratory testing not the same thing as random, unstructured 'poking around'?",
    answer:
      "Effective exploratory testing is still purposeful -- often guided by a time-boxed 'charter' describing an area/risk to investigate -- with the tester actively taking notes on what was tried and found, so the session's coverage and results are still communicable and repeatable, not just an untracked ad hoc session.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-exploratory-03",
    courseSlug: "software-testing-foundations",
    question:
      "What is risk-based testing, and what two factors does it typically weigh to prioritize effort?",
    answer:
      "An approach to allocating limited testing time by prioritizing areas of highest risk -- typically assessed as likelihood (how probable is a defect in this area) multiplied by impact (how bad would the consequences be if it failed) -- so testing effort concentrates where it matters most, rather than spreading evenly regardless of actual risk.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-exploratory-04",
    courseSlug: "software-testing-foundations",
    question:
      "Why might a rarely-used but high-impact feature (like a data-export function used once a year for compliance) still warrant significant testing attention?",
    answer:
      "Risk-based prioritization weighs impact, not just likelihood of use -- a low-frequency feature whose failure would have severe consequences (a failed compliance export, a broken payment refund) can rank as high-risk overall even though most users rarely touch it.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-exploratory-05",
    courseSlug: "software-testing-foundations",
    question:
      "How would you decide what NOT to test, given a genuinely limited testing time budget?",
    answer:
      "Explicitly identify and document the lowest-risk areas being deliberately deprioritized (low likelihood of defect AND low impact if one occurs), and communicate that decision to stakeholders -- an unstated gap in coverage is a hidden risk; an explicitly acknowledged one is a managed tradeoff.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-exploratory-06",
    courseSlug: "software-testing-foundations",
    question:
      "Why is exploratory testing often particularly valuable right before a release, alongside already-completed scripted testing?",
    answer:
      "Scripted tests only check what was anticipated in advance; exploratory testing near release can catch integration issues, unexpected interactions between recently-changed features, or usability problems that a pre-written test plan (designed earlier, potentially before the final build existed) wouldn't have covered.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-exploratory-07",
    courseSlug: "software-testing-foundations",
    question: "What is a 'test charter' in session-based exploratory testing?",
    answer:
      "A brief, focused mission statement for an exploratory testing session -- e.g. 'explore the checkout flow's handling of expired discount codes for 30 minutes' -- giving the session a clear scope and purpose without pre-scripting every specific step to take.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-exploratory-08",
    courseSlug: "software-testing-foundations",
    question:
      "Why might risk assessments for the same feature change over time, even without any code changes?",
    answer:
      "Risk depends on context that can shift independently of the code -- e.g. a feature's usage growing significantly increases the impact of a defect in it, or new regulatory requirements increase the consequences of a compliance-related bug -- so risk-based prioritization needs periodic re-evaluation, not a one-time assessment.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-exploratory-09",
    courseSlug: "software-testing-foundations",
    question:
      "How does exploratory testing help validate whether scripted test cases themselves are actually good ones?",
    answer:
      "A tester exploring the application with fresh eyes may discover a scenario the scripted test cases never considered at all -- revealing not just a product bug, but a gap in the test design itself, prompting the scripted suite to be updated to cover that newly-discovered scenario going forward.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-exploratory-10",
    courseSlug: "software-testing-foundations",
    question:
      "Why is 'we don't have time to test everything' a legitimate starting point for a testing strategy, rather than a failure to plan properly?",
    answer:
      "Exhaustive testing is mathematically impossible for any non-trivial system (per the earlier point about testing only showing presence, not absence, of defects) -- acknowledging finite time honestly, then deliberately prioritizing by risk, is a more defensible strategy than pretending full coverage is achievable and then falling short unpredictably.",
    category: "Exploratory & Risk-Based Testing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Defect Reporting & Process (10) ---
  {
    id: "st-interview-reporting-01",
    courseSlug: "software-testing-foundations",
    question: "What are the essential components of a good defect report?",
    answer:
      "A clear title, exact steps to reproduce, the expected result, the actual result, environment details (browser/OS/version), severity/priority, and supporting evidence (screenshot, log, or video) -- enough detail that a developer can reproduce and diagnose the issue without needing to ask clarifying questions first.",
    category: "Defect Reporting & Process",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-reporting-02",
    courseSlug: "software-testing-foundations",
    question: "What is the difference between a defect's severity and its priority?",
    answer:
      "Severity measures the technical impact of the defect on the system (how badly it breaks functionality); priority measures how urgently it should be fixed relative to other work (a business/scheduling decision) -- a low-severity cosmetic bug on the homepage might still get high priority due to visibility, while a severe bug in a rarely-used admin tool might get lower priority.",
    category: "Defect Reporting & Process",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-reporting-03",
    courseSlug: "software-testing-foundations",
    question:
      "Why is it important to include the exact steps to reproduce a bug, in order, rather than a general description of the problem?",
    answer:
      "A developer who can't reliably reproduce a bug can't confidently verify their fix actually addresses it -- precise, ordered reproduction steps turn a vague 'sometimes this breaks' report into a concrete, actionable, and eventually re-testable scenario.",
    category: "Defect Reporting & Process",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-reporting-04",
    courseSlug: "software-testing-foundations",
    question: "What is a traceability matrix, and what problem does it help catch?",
    answer:
      "A matrix mapping requirements to the test cases that verify them (and often to their execution results) -- it helps catch requirements with zero test coverage, and conversely, test cases that don't map back to any actual requirement, both of which represent a real gap or waste worth investigating.",
    category: "Defect Reporting & Process",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-reporting-05",
    courseSlug: "software-testing-foundations",
    question: "How would you decide what to automate versus what to keep testing manually?",
    answer:
      "Automation pays off best for tests that are run repeatedly (regression suites), are stable/well-defined, and are tedious or error-prone to execute manually; manual testing (especially exploratory) remains valuable for scenarios needing human judgment, rarely-run one-off checks, or areas still actively changing where automation would need constant rewriting.",
    category: "Defect Reporting & Process",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-reporting-06",
    courseSlug: "software-testing-foundations",
    question:
      "Why can automating a still-rapidly-changing feature too early actually waste more time than it saves?",
    answer:
      "If the feature's UI/behavior is still in flux, the automated tests need constant rewriting to keep up with each change -- the maintenance cost of a premature automated suite can exceed the manual-testing time it was meant to save, until the feature stabilizes.",
    category: "Defect Reporting & Process",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-reporting-07",
    courseSlug: "software-testing-foundations",
    question:
      "How does testing typically fit into an agile team's sprint workflow, compared to a traditional 'test phase at the end' model?",
    answer:
      "In agile, testing happens continuously throughout the sprint alongside development (often the same sprint a feature is built in), with testers involved early in story refinement/acceptance-criteria discussions -- rather than testing being a separate, later phase that only begins once 'development is done.'",
    category: "Defect Reporting & Process",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-reporting-08",
    courseSlug: "software-testing-foundations",
    question:
      "What basic accessibility checks can a tester perform without specialized assistive-technology expertise?",
    answer:
      "Verifying keyboard-only navigation reaches every interactive element, checking that images have meaningful alt text, confirming visible focus indicators exist, and running an automated scanner (like axe) to catch common issues -- a genuinely thorough accessibility audit needs deeper expertise, but these basic checks catch real, common gaps.",
    category: "Defect Reporting & Process",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-reporting-09",
    courseSlug: "software-testing-foundations",
    question:
      "What basic security-adjacent checks can a functional tester perform, even without a dedicated security-testing background?",
    answer:
      "Trying obviously-invalid or malicious-looking input in form fields (extremely long strings, script tags, SQL-like syntax) to see if the application handles it gracefully rather than erroring or behaving unexpectedly, and verifying that access-restricted pages genuinely reject unauthorized access rather than just hiding a link to them.",
    category: "Defect Reporting & Process",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "st-interview-reporting-10",
    courseSlug: "software-testing-foundations",
    question:
      "Why is maintaining a regression suite over time (removing obsolete tests, updating changed expectations) an ongoing responsibility, not a one-time setup task?",
    answer:
      "As the application evolves, some tests become obsolete (testing removed features), some need updated expected values (behavior legitimately changed), and some become flaky -- a regression suite left unmaintained accumulates noise that erodes trust in its results, the same failure mode as a defect report nobody can act on.",
    category: "Defect Reporting & Process",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
