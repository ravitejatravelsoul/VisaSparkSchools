import type { Project } from "@/lib/content/types";

export const projects: Project[] = [
  {
    id: "personal-portfolio-page",
    slug: "personal-portfolio-page",
    title: "Personal Portfolio Page",
    description:
      "Design and build a responsive, semantic, accessible one-page portfolio using only HTML and CSS.",
    difficulty: "beginner",
    estimatedHours: 4,
    isCapstone: false,
    trackSlugs: ["web-html-css"],
    prerequisiteLessonIds: [
      "html-document-structure",
      "html-semantic-elements",
      "css-box-model",
      "css-flexbox",
      "css-responsive-design",
    ],
    objectives: [
      "Structure a page with semantic HTML landmarks",
      "Style a layout with the box model and Flexbox",
      "Make the page responsive across mobile, tablet, and desktop widths",
      "Meet basic accessibility requirements (headings, alt text, contrast, focus states)",
    ],
    milestones: [
      {
        id: "m1",
        title: "Semantic structure",
        description: "Lay out header, nav, main sections, and footer with semantic elements.",
        checklist: [
          "Uses <header>, <nav>, <main>, and <footer>",
          "Exactly one <h1>, with <h2> for each section",
          "All images have meaningful alt text",
        ],
      },
      {
        id: "m2",
        title: "Styling and layout",
        description: "Apply a cohesive visual style using the box model and Flexbox.",
        checklist: [
          "A Flexbox-based navigation bar",
          "Consistent spacing using margin/padding",
          "A defined color palette with sufficient contrast",
        ],
      },
      {
        id: "m3",
        title: "Responsive behavior",
        description: "Ensure the page reads well at 375px, 768px, and 1440px.",
        checklist: [
          "No horizontal scrolling at 375px width",
          "Navigation remains usable on mobile",
          "Text remains readable without zooming",
        ],
      },
    ],
    references: [
      {
        label: "MDN: Semantic HTML",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
      },
    ],
  },
  {
    id: "interactive-quiz-app",
    slug: "interactive-quiz-app",
    title: "Interactive Quiz Application",
    description:
      "Build a multi-question quiz app in vanilla JavaScript: render questions, track score, and show a results screen.",
    difficulty: "beginner",
    estimatedHours: 5,
    isCapstone: false,
    trackSlugs: ["javascript"],
    prerequisiteLessonIds: [
      "js-functions",
      "js-arrays-objects",
      "js-dom-selection",
      "js-events-forms",
    ],
    objectives: [
      "Model quiz data as an array of objects",
      "Render dynamic content into the DOM from data",
      "Handle click and form events to capture answers",
      "Track and display a final score",
    ],
    milestones: [
      {
        id: "m1",
        title: "Data model and rendering",
        description: "Represent questions as data and render the current question to the page.",
        checklist: [
          "Quiz questions stored as an array of objects",
          "Current question renders into the DOM",
          "Answer options are clickable elements",
        ],
      },
      {
        id: "m2",
        title: "Scoring and navigation",
        description: "Track the learner's answers and move between questions.",
        checklist: [
          "Selecting an answer advances to the next question",
          "A running score updates as questions are answered",
          "A 'Next' state disables re-answering the same question",
        ],
      },
      {
        id: "m3",
        title: "Results screen",
        description: "Show a final summary when the quiz ends.",
        checklist: [
          "Displays the final score out of total questions",
          "Offers a way to restart the quiz",
          "No leftover question content is shown alongside the results",
        ],
      },
    ],
    references: [
      {
        label: "MDN: Document Object Model",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
      },
    ],
  },
  {
    id: "expense-tracker-cli",
    slug: "expense-tracker-cli",
    title: "Expense Tracker",
    description:
      "Write a Python program that records expenses, categorizes them, and reports totals — using functions, lists/dicts, and file persistence.",
    difficulty: "beginner",
    estimatedHours: 5,
    isCapstone: false,
    trackSlugs: ["python"],
    prerequisiteLessonIds: ["py-functions", "py-collections", "py-files-exceptions", "py-classes"],
    objectives: [
      "Model each expense as a data structure (dict or class)",
      "Implement functions to add, remove, and summarize expenses",
      "Persist expenses between runs using file I/O",
      "Handle invalid input with exceptions instead of crashing",
    ],
    milestones: [
      {
        id: "m1",
        title: "Core data model",
        description: "Represent expenses and implement add/list operations.",
        checklist: [
          "An Expense class or dict shape with amount, category, and date",
          "A function to add a new expense to an in-memory list",
          "A function to list all expenses",
        ],
      },
      {
        id: "m2",
        title: "Summaries and validation",
        description: "Add category totals and defend against bad input.",
        checklist: [
          "A function that totals expenses per category",
          "Invalid amounts raise or are caught as exceptions, not silent failures",
          "A function returns the overall total",
        ],
      },
      {
        id: "m3",
        title: "Persistence",
        description: "Save and reload expenses from a file.",
        checklist: [
          "Expenses are written to a file",
          "Expenses can be reloaded from that file on the next run",
          "Malformed file lines do not crash the program",
        ],
      },
    ],
    references: [
      {
        label: "Python docs: Reading and Writing Files",
        url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files",
      },
    ],
  },
  {
    id: "git-collaboration-workflow",
    slug: "git-collaboration-workflow",
    title: "Git Branching & Collaboration Workflow",
    description:
      "Practice the branch → commit → pull request workflow professional teams use, on a small shared-style project.",
    difficulty: "beginner",
    estimatedHours: 3,
    isCapstone: false,
    trackSlugs: ["git-api-sql"],
    prerequisiteLessonIds: ["git-basics", "git-branching-merging"],
    objectives: [
      "Create and switch between branches",
      "Make atomic, well-described commits",
      "Resolve a merge conflict",
      "Describe a typical GitHub pull-request workflow",
    ],
    milestones: [
      {
        id: "m1",
        title: "Branch and commit",
        description: "Create a feature branch and commit incremental changes.",
        checklist: [
          "A new branch created off main",
          "At least three commits with clear messages",
          "No unrelated changes bundled into a single commit",
        ],
      },
      {
        id: "m2",
        title: "Merge conflict resolution",
        description: "Simulate and resolve a conflict between two branches.",
        checklist: [
          "Two branches edit the same lines of a file",
          "The conflict markers are resolved correctly",
          "The merged file makes logical sense",
        ],
      },
      {
        id: "m3",
        title: "Pull request narrative",
        description: "Write a pull request description for the change.",
        checklist: [
          "Summarizes what changed and why",
          "Lists how the change was tested",
          "Notes any follow-up work",
        ],
      },
    ],
    references: [
      {
        label: "GitHub Docs: About pull requests",
        url: "https://docs.github.com/en/pull-requests",
      },
    ],
  },
  {
    id: "api-powered-weather-app",
    slug: "api-powered-weather-app",
    title: "API-Powered Lookup App",
    description:
      "Combine JavaScript's fetch API with REST concepts and JSON handling to build a small app that queries a mock weather API.",
    difficulty: "intermediate",
    estimatedHours: 5,
    isCapstone: false,
    trackSlugs: ["git-api-sql", "javascript"],
    prerequisiteLessonIds: ["api-rest-basics", "js-fetch-async"],
    objectives: [
      "Send a fetch request and handle the JSON response",
      "Design a small REST-style request/response contract",
      "Handle loading, success, and error states in the UI",
      "Avoid unhandled promise rejections",
    ],
    milestones: [
      {
        id: "m1",
        title: "Fetch and render",
        description: "Call a mock API and render the JSON result.",
        checklist: [
          "A fetch call retrieves JSON data",
          "The result renders into the DOM",
          "A loading state shows while the request is pending",
        ],
      },
      {
        id: "m2",
        title: "Error handling",
        description: "Handle failed requests and bad input gracefully.",
        checklist: [
          "Network/API errors show a clear message, not a blank page",
          "Invalid input is validated before a request is sent",
          "No unhandled promise rejection appears in the console",
        ],
      },
      {
        id: "m3",
        title: "REST contract",
        description: "Document the request/response shape you designed.",
        checklist: [
          "States the HTTP method and path used",
          "Documents the JSON response shape",
          "Lists possible status codes and their meaning",
        ],
      },
    ],
    references: [
      {
        label: "MDN: Using the Fetch API",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
      },
    ],
  },
  {
    id: "semantic-search-mini-app",
    slug: "semantic-search-mini-app",
    title: "Semantic Search Mini-App",
    description:
      "Chunk a small set of documents, embed them, and build a similarity search over the results — the foundation of retrieval-augmented generation.",
    difficulty: "intermediate",
    estimatedHours: 5,
    isCapstone: false,
    trackSlugs: ["ai-llm-rag"],
    prerequisiteLessonIds: ["ai-embeddings", "ai-chunking-ingestion", "ai-semantic-search"],
    objectives: [
      "Split documents into retrieval-sized chunks",
      "Represent chunks and queries as vectors",
      "Rank chunks by cosine similarity to a query",
      "Explain the limits of pure semantic search versus hybrid search",
    ],
    milestones: [
      {
        id: "m1",
        title: "Chunking",
        description: "Split a handful of short documents into overlapping chunks.",
        checklist: [
          "Documents are split by paragraph or fixed size, not arbitrarily",
          "Each chunk keeps a reference back to its source document",
          "Chunk size choice is documented with a reason",
        ],
      },
      {
        id: "m2",
        title: "Embedding and similarity",
        description: "Represent chunks as vectors and rank them against a query.",
        checklist: [
          "Each chunk has an associated vector",
          "A cosine similarity function ranks chunks against a query vector",
          "Top-k results are returned in similarity order",
        ],
      },
      {
        id: "m3",
        title: "Evaluation",
        description: "Sanity-check the search quality.",
        checklist: [
          "At least 3 test queries with an expected top result",
          "A written note on one query where semantic search alone under-performs keyword search",
        ],
      },
    ],
    references: [
      {
        label: "OpenAI: Embeddings guide",
        url: "https://platform.openai.com/docs/guides/embeddings",
      },
    ],
  },
  {
    id: "document-qa-rag-capstone",
    slug: "document-qa-rag-capstone",
    title: "Document Q&A RAG Capstone",
    description:
      "Build a complete retrieval-augmented generation pipeline that answers questions about a document set with citations, and knows when it doesn't know.",
    difficulty: "advanced",
    estimatedHours: 10,
    isCapstone: true,
    trackSlugs: ["ai-llm-rag", "git-api-sql"],
    prerequisiteLessonIds: [
      "ai-rag-pipeline",
      "ai-reranking-citations",
      "ai-hallucination-evaluation",
      "ai-safety-injection",
    ],
    objectives: [
      "Assemble ingestion, retrieval, and generation into one pipeline",
      "Attach citations to every generated claim",
      "Return a 'not enough evidence' response when retrieval confidence is low",
      "Defend the pipeline against prompt injection in retrieved content",
    ],
    milestones: [
      {
        id: "m1",
        title: "Ingestion pipeline",
        description: "Chunk, embed, and index a small document collection.",
        checklist: [
          "Documents are chunked with stable chunk IDs",
          "Chunks are embedded and stored with metadata",
          "Re-running ingestion does not duplicate unchanged chunks",
        ],
      },
      {
        id: "m2",
        title: "Grounded generation with citations",
        description: "Retrieve relevant chunks and generate an answer that cites them.",
        checklist: [
          "Retrieval returns a ranked, deduplicated set of chunks",
          "The generated answer references specific source chunks",
          "A minimum relevance threshold gates whether generation proceeds",
        ],
      },
      {
        id: "m3",
        title: "Safety and honesty",
        description: "Handle low-evidence and adversarial cases correctly.",
        checklist: [
          "A query with no supporting content returns an honest 'not enough evidence' answer",
          "Instructions embedded inside a retrieved document are not obeyed",
          "The pipeline never claims an exercise passed without deterministic validation",
        ],
      },
    ],
    references: [
      {
        label: "OWASP: LLM Prompt Injection",
        url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      },
    ],
  },
  {
    id: "ai-support-agent-capstone",
    slug: "ai-support-agent-capstone",
    title: "AI Support Agent Capstone",
    description:
      "Design a tool-calling agent that can look up information and take constrained actions through explicit function calls, with guardrails.",
    difficulty: "advanced",
    estimatedHours: 8,
    isCapstone: true,
    trackSlugs: ["ai-llm-rag"],
    prerequisiteLessonIds: ["ai-tool-calling", "ai-agents-workflows", "ai-production-safeguards"],
    objectives: [
      "Define a small set of typed tools/functions an agent can call",
      "Implement an agent loop that plans, calls tools, and observes results",
      "Add guardrails: input limits, allowed actions, and human-readable audit logging",
      "Reason about cost, latency, and failure modes in production",
    ],
    milestones: [
      {
        id: "m1",
        title: "Tool design",
        description: "Define 2-3 tools with clear typed inputs/outputs.",
        checklist: [
          "Each tool has a name, description, and typed parameters",
          "Tools only perform safe, constrained actions (e.g. read-only lookups)",
          "Tool errors return structured failure information, not crashes",
        ],
      },
      {
        id: "m2",
        title: "Agent loop",
        description: "Implement plan → act → observe → respond.",
        checklist: [
          "The agent selects a tool based on the user's request",
          "Tool results are incorporated into the final answer",
          "The loop terminates within a bounded number of steps",
        ],
      },
      {
        id: "m3",
        title: "Guardrails and observability",
        description: "Add safety limits and basic observability.",
        checklist: [
          "Input length and request-rate limits are enforced",
          "Every tool call is logged in an auditable way",
          "The agent refuses actions outside its defined tool set",
        ],
      },
    ],
    references: [
      {
        label: "Anthropic: Tool use overview",
        url: "https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview",
      },
    ],
  },
  {
    id: "typed-study-tracker",
    slug: "typed-study-tracker",
    title: "Typed Study Tracker",
    description:
      "Model a small study-tracking domain with TypeScript's type system: discriminated unions for lesson state, derived types for updates, and a type guard for data loaded from storage.",
    difficulty: "intermediate",
    estimatedHours: 4,
    isCapstone: false,
    trackSlugs: ["typescript"],
    prerequisiteLessonIds: [
      "ts-interfaces-aliases",
      "ts-unions-narrowing",
      "ts-utility-types",
      "ts-unknown-guards",
      "ts-modeling-domain",
    ],
    objectives: [
      "Design a discriminated union that makes an impossible lesson state unrepresentable",
      "Derive an update type with Partial rather than duplicating a shape",
      "Write a type guard that safely validates data of type unknown",
      "Use a generic function to operate on the tracker without losing type information",
    ],
    milestones: [
      {
        id: "m1",
        title: "Model the domain",
        description:
          "Define a Lesson type where status is a discriminated union, so a lesson cannot be both 'not started' and carry a completion date, and cannot be 'completed' without one.",
        checklist: [
          "A LessonStatus union has at least not-started, in-progress, and completed variants",
          "Only the completed variant's shape includes a completedAt field",
          "A function that switches on status has an exhaustiveness check using never",
        ],
      },
      {
        id: "m2",
        title: "Update without duplicating the shape",
        description:
          "Write an update function using a derived type instead of a second hand-written interface.",
        checklist: [
          "A LessonUpdate type is derived from Lesson with Partial or Pick, not retyped by hand",
          "updateLesson(lesson, patch) returns a new object and does not mutate the original",
          "Passing an unrelated field in the patch is rejected by the compiler",
        ],
      },
      {
        id: "m3",
        title: "Validate untrusted data",
        description:
          "Data loaded from storage arrives as unknown. Write a type guard that proves it is really a Lesson array before the tracker trusts it.",
        checklist: [
          "The loader's return type is unknown, not any",
          "A type predicate function (value is Lesson[]) validates the shape at runtime",
          "Malformed input (missing fields, wrong types) is rejected rather than crashing later",
        ],
      },
      {
        id: "m4",
        title: "A generic summary function",
        description:
          "Write at least one generic function operating on the tracker's data without narrowing it to a specific shape unnecessarily.",
        checklist: [
          "A generic function (for example, groupBy or countBy) works on the lesson list",
          "Its return type reflects the input type rather than widening to any",
          "The project's own automated checks (quiz-style assertions in the lesson pattern, or your own test harness) pass",
        ],
      },
    ],
    references: [
      {
        label: "TypeScript Handbook: Discriminated Unions",
        url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
      },
      {
        label: "TypeScript Handbook: Utility Types",
        url: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
      },
    ],
  },
  {
    id: "learning-app-test-strategy",
    slug: "learning-app-test-strategy",
    title: "Test Strategy for a Learning Application",
    description:
      "Design a complete, realistic test strategy and test suite for a feature of a learning application — the discount-code checkout flow — applying every technique from Software Testing Foundations to one coherent scenario.",
    difficulty: "beginner",
    estimatedHours: 5,
    isCapstone: false,
    trackSlugs: ["software-testing"],
    prerequisiteLessonIds: [
      "st-requirements-analysis",
      "st-equivalence-partitioning",
      "st-boundary-value-analysis",
      "st-decision-tables",
      "st-risk-based-testing",
      "st-defect-reporting",
    ],
    objectives: [
      "Analyze a realistic feature requirement and identify its ambiguities before designing tests",
      "Apply equivalence partitioning, boundary-value analysis, and a decision table to the same feature",
      "Prioritize the resulting test cases using a risk score",
      "Write one complete, actionable defect report for a planted bug",
      "Build a small traceability matrix linking requirements to your test cases",
    ],
    milestones: [
      {
        id: "m1",
        title: "Analyze the requirement",
        description:
          "The scenario: \"A discount code field accepts a 6-character alphanumeric code. Codes starting with 'SAVE' apply a 20% discount; codes starting with 'FREE' apply free shipping; any other valid-format code is rejected as unrecognized. Orders under $10 cannot use any discount code.\" Identify at least three ambiguities or missing details in this requirement, and rewrite it as a precise, testable specification.",
        checklist: [
          "At least three real ambiguities or gaps are identified (e.g. case sensitivity, what happens with a code that's both a 'SAVE' prefix and under $10, expired-code handling)",
          "A rewritten, precise version of the requirement is produced that resolves each identified gap with an explicit decision",
          "The rewritten requirement is specific enough that a stranger could design test cases from it without asking follow-up questions",
        ],
      },
      {
        id: "m2",
        title: "Design test cases with equivalence partitioning and boundary-value analysis",
        description:
          "Using your precise requirement from Milestone 1, identify the equivalence classes for the discount-code field's length/format, and the boundary values for the $10 order-total threshold.",
        checklist: [
          "At least four equivalence classes are identified for the code field (e.g. too short, too long, right length with invalid characters, valid SAVE code, valid FREE code, valid but unrecognized code)",
          "One representative test case is documented for each class, with expected result",
          "The three boundary values around the $10 threshold ($9, $10, $11) are tested with documented expected results",
        ],
      },
      {
        id: "m3",
        title: "Build a decision table for the combined discount logic",
        description:
          "The discount actually depends on two combined conditions: whether the code is a recognized SAVE/FREE prefix, and whether the order total is at least $10. Build a complete decision table covering all combinations and derive one test case per row.",
        checklist: [
          "The decision table has all combinations of the two binary conditions (recognized-code: yes/no, order-total-at-least-10: yes/no)",
          "Each row has a documented, justified expected outcome",
          "Each row is translated into one specific, concrete test case (exact code value, exact order total, exact expected result)",
        ],
      },
      {
        id: "m4",
        title: "Prioritize with risk, then report one defect",
        description:
          "Score each test case group from Milestones 2 and 3 with a likelihood/impact risk score, rank them, and then write one complete, actionable defect report for a planted bug: a 'FREE10' code (a FREE-prefixed code that also happens to look like it references a threshold) incorrectly applies a 20% discount instead of free shipping.",
        checklist: [
          "Every test case group has a documented likelihood and impact score (1-5 each) and a resulting risk score",
          "The groups are ranked, with a brief justification for the top-ranked group",
          "The defect report includes exact steps to reproduce, expected result, actual result, environment, and a severity/priority judgment with reasoning for each",
        ],
      },
      {
        id: "m5",
        title: "Traceability matrix and final review",
        description:
          "Build a small traceability matrix linking each part of the rewritten requirement (from Milestone 1) to the specific test cases that verify it (from Milestones 2-3), and identify any requirement with weak or missing coverage.",
        checklist: [
          "Every distinct rule in the rewritten requirement has at least one linked test case in the matrix",
          "Any requirement with zero or only one linked test case is explicitly flagged as a coverage gap, with a proposed additional test case",
          "The finished strategy document (requirement analysis, test cases, risk ranking, defect report, traceability matrix) is organized so a new team member could follow it without additional context",
        ],
      },
    ],
    references: [
      { label: "ISTQB Glossary", url: "https://glossary.istqb.org/en_US/search" },
      {
        label: "ISO/IEC/IEEE 29119 Software Testing Standard (overview)",
        url: "https://www.iso.org/standard/81291.html",
      },
    ],
  },
  {
    id: "sample-api-validation-suite",
    slug: "sample-api-validation-suite",
    title: "Validation Suite for a Sample Learning-Progress API",
    description:
      "Build a maintainable, isolated test suite validating a documented sample API's schema, positive/negative behavior, chained workflow, and error handling — applying every technique from API Testing and Automation to one coherent target.",
    difficulty: "intermediate",
    estimatedHours: 6,
    isCapstone: false,
    trackSlugs: ["software-testing"],
    prerequisiteLessonIds: [
      "at-json-schema-validation",
      "at-positive-negative-testing",
      "at-boundary-cases-apis",
      "at-chained-requests",
      "at-error-validation",
      "at-automation-structure",
    ],
    objectives: [
      "Write a schema validator for a documented API resource shape",
      "Design and implement positive and negative test cases for a create endpoint",
      "Test a realistic chained workflow using data extracted from prior responses",
      "Structure the resulting suite with proper test isolation and a useful summary report",
    ],
    milestones: [
      {
        id: "m1",
        title: "Document the API and write a schema validator",
        description:
          'The target: a simulated learning-progress API with one resource, an \'enrollment\' — { id: number, courseSlug: string, status: "active" | "completed", progressPercent: number }. Write a schema-validation function checking all four fields\' presence and type, and a fifth check that progressPercent is between 0 and 100.',
        checklist: [
          "The schema validator checks all four required fields for presence and correct type",
          "The validator separately reports a progressPercent outside the 0-100 range as its own distinct error, not lumped in with a type error",
          "The validator is tested against at least one fully valid fixture and at least two broken fixtures (one missing a field, one with an out-of-range value)",
        ],
      },
      {
        id: "m2",
        title: "Positive and negative tests for creating an enrollment",
        description:
          "Design a simulated createEnrollment(payload) function's test cases: one positive case with fully valid input, and at least four negative cases (missing courseSlug, wrong type for progressPercent, an invalid status value not in the allowed set, and progressPercent above 100).",
        checklist: [
          "One positive test case exists and expects success",
          "At least four distinct negative test cases exist, each targeting a different validation rule",
          "Every negative test case explicitly asserts that a success response was NOT returned — per this course's key lesson, that would indicate a real defect, not a passing test",
        ],
      },
      {
        id: "m3",
        title: "Apply boundary-value analysis to progressPercent",
        description:
          "progressPercent must be between 0 and 100 inclusive. Design and test the six standard boundary values: -1, 0, 1, 99, 100, 101.",
        checklist: [
          "All six boundary values are tested with documented expected results",
          "The two in-range boundary values (0 and 100) are confirmed to be accepted, not rejected off-by-one",
          "The test suite clearly documents which values are the boundaries being tested and why, not just a numbered list",
        ],
      },
      {
        id: "m4",
        title: "Test a chained workflow",
        description:
          "Chain three steps: create an enrollment (extract its id from the response), update its progressPercent using that extracted id, then fetch the enrollment again and confirm the update is reflected. Include a test for what happens if the update step uses an id that was never actually created.",
        checklist: [
          "The id used in steps 2 and 3 is extracted from step 1's response, never hardcoded",
          "The final fetch confirms the updated progressPercent value is actually reflected, not just that the update call itself returned success",
          "A test using a nonexistent enrollment id in the update step expects a 404, not a silent success or a crash",
        ],
      },
      {
        id: "m5",
        title: "Isolate the suite and write a summary report",
        description:
          "Restructure the tests so each one creates its own enrollment during setup and does not depend on another test's leftover data. Write a summarizeRun-style function producing a short, actionable report string for the whole suite.",
        checklist: [
          "Every test creates whatever enrollment data it needs itself, rather than assuming another test already created it",
          "Running any single test alone (in isolation) still passes or fails correctly on its own",
          "The summary report names the specific failing test(s) when there are failures, not just an aggregate pass/fail count",
        ],
      },
    ],
    references: [
      { label: "JSON Schema", url: "https://json-schema.org/understanding-json-schema/" },
      { label: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/" },
    ],
  },
  {
    id: "accessible-learning-dashboard",
    slug: "accessible-learning-dashboard",
    title: "Accessible Learning Dashboard",
    description:
      "Build a real local React project: a learning dashboard with searchable/filterable course cards, progress indicators, and complete loading/empty/error/success states — reusing every technique from React Application Development. Set up and run entirely on your own machine; this platform does not execute it for you.",
    difficulty: "intermediate",
    estimatedHours: 8,
    isCapstone: false,
    trackSlugs: ["react"],
    prerequisiteLessonIds: [
      "react-props",
      "react-state",
      "react-conditional-lists",
      "react-forms-validation",
      "react-ui-states",
      "react-data-fetching",
      "react-composition-hooks",
      "react-accessibility-testing",
    ],
    objectives: [
      "Compose a dashboard from small, single-responsibility components with correctly-typed props",
      "Fetch and filter course data with a race-condition-safe custom hook, showing all four UI states",
      "Build an accessible search/filter control and accessible, keyboard-operable course cards",
      "Write component tests using React Testing Library's role/label-based queries",
    ],
    milestones: [
      {
        id: "m1",
        title: "Project setup and file structure",
        description:
          "Scenario: you are building the dashboard a learner sees after signing in — a searchable, filterable grid of course cards with real progress data. Set up a Vite + React project locally (npm create vite@latest learning-dashboard -- --template react) organized by feature, not by file type: a src/dashboard/ folder containing CourseCard.jsx, CourseGrid.jsx, SearchFilterBar.jsx, useCourseData.js, and App.jsx. Add a small mockApi.js exporting a fetchCourses(query) function that returns a Promise resolving after a random delay (150-600ms), simulating a real network call, matching the pattern from this course's data-fetching lesson.",
        checklist: [
          "The project runs locally with `npm run dev` and shows a placeholder page before any dashboard code is added",
          "Files are organized under src/dashboard/ by feature, not scattered into generic components/ and hooks/ folders",
          "mockApi.js's fetchCourses returns a real Promise with a randomized delay, not an instantly-resolved one",
        ],
      },
      {
        id: "m2",
        title: "CourseCard and CourseGrid components",
        description:
          "Build CourseCard as a single-responsibility, reusable component accepting props for title, difficulty, progressPercent, and an onSelect callback (following the one-way-data-flow and callback-prop patterns from this course). It must render a visible progress indicator (not just a number — a filled bar or equivalent, with an accessible text alternative such as an aria-valuenow-bearing progressbar role or visually-hidden text stating the percentage). Build CourseGrid to render a list of CourseCard components with stable, id-based keys (never array index), and its own empty-state message when the filtered list has zero items.",
        checklist: [
          "CourseCard is a single, reusable component with no dashboard-specific data fetching inside it",
          "The progress indicator has a real accessible representation, not just a visual bar with no text alternative",
          "CourseGrid keys every card by the course's real id, never by array index",
          "CourseGrid shows a distinct, clearly-worded empty-state message when filtering produces zero results",
        ],
      },
      {
        id: "m3",
        title: "Data fetching with all four UI states",
        description:
          "Extract fetching and filtering into a custom hook, useCourseData(query), that owns items/isLoading/error/filtered state and guards against race conditions exactly as in this course's data-fetching lab (an ignore flag or request-token check in the effect's cleanup). App.jsx should derive a single uiState value ('loading' | 'error' | 'empty' | 'success') from the hook's returned data, per this course's UI-states lesson, and render distinctly different markup for each of the four states.",
        checklist: [
          "useCourseData guards against race conditions using the ignore-flag or request-token pattern from the course",
          "All four UI states are reachable and visually distinct: loading (a real loading indicator), error (a retry-oriented message), empty (a helpful message distinct from the error state), success (the real grid)",
          "Typing quickly in the search field never leaves the dashboard showing results for an earlier, outdated query",
        ],
      },
      {
        id: "m4",
        title: "Accessible search and filter controls",
        description:
          "Build SearchFilterBar with a labeled search input (a real <label>, not just a placeholder) and a difficulty filter (a real <select> or a set of accessible toggle buttons with aria-pressed). Every control must be reachable and operable via keyboard alone, and the currently active filter must be understandable without relying on color alone.",
        checklist: [
          "The search input has a real, programmatically associated label, not only a placeholder attribute",
          "The difficulty filter is fully keyboard-operable (tab to it, change it without a mouse)",
          "The active filter state is conveyed by more than color alone (e.g. also by text, an icon, or aria-pressed)",
        ],
      },
      {
        id: "m5",
        title: "Component tests",
        description:
          "Using React Testing Library (add @testing-library/react and @testing-library/jest-dom to the project via npm), write tests that query by role/label/text per this course's testing lesson: confirm the search input has an accessible name, confirm typing an unmatched query shows the empty state (not the error state), and confirm a CourseCard with 0% progress and one with 100% progress both render an accessible progress representation.",
        checklist: [
          "At least one test queries the search input by its accessible role/label, not by CSS selector",
          "At least one test confirms the empty state (not the error state) appears for a non-matching query",
          "At least one test confirms CourseCard's progress indicator is accessible at both boundary values (0% and 100%)",
          "`npm test` (or your configured test command) runs all tests successfully with no failures",
        ],
      },
    ],
    references: [
      { label: "React docs: Thinking in React", url: "https://react.dev/learn/thinking-in-react" },
      {
        label: "Testing Library: Guiding Principles",
        url: "https://testing-library.com/docs/guiding-principles/",
      },
      {
        label: "WAI-ARIA: progressbar role",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/meter/",
      },
    ],
  },
  {
    id: "validated-learning-progress-api",
    slug: "validated-learning-progress-api",
    title: "Validated Learning-Progress REST API",
    description:
      "Build a complete, real backend REST API on your own machine: courses and progress resources, validation, structured errors, safe configuration, and automated tests — reusing every technique from Node.js and Express Backend Development. This platform does not execute it for you.",
    difficulty: "advanced",
    estimatedHours: 10,
    isCapstone: false,
    trackSlugs: ["node-express"],
    prerequisiteLessonIds: [
      "express-app-structure",
      "express-middleware",
      "express-input-validation",
      "rest-resource-design",
      "node-config-validation-startup",
      "express-security-auth-boundaries",
      "express-automated-testing",
      "node-operational-readiness",
    ],
    objectives: [
      "Structure a real Express API with modular routes, a service layer, and centralized error handling",
      "Validate every write endpoint's input and design a consistent REST resource and status-code contract",
      "Validate configuration at startup and log safely with sensitive fields redacted",
      "Add an automated test suite covering both service logic and HTTP routes",
      "Implement graceful shutdown and a meaningful health-check endpoint",
    ],
    milestones: [
      {
        id: "m1",
        title: "Project setup and API contract",
        description:
          'Scenario: build the real backend behind a learning platform\'s course and progress tracking. Set up a fresh Express project (npm init -y, npm install express, "type": "module") with a feature-organized structure: src/routes/, src/services/, src/middleware/, src/config.js, src/errors.js, src/server.js. Document your planned API contract before writing routes: GET/POST /courses, GET/PATCH/DELETE /courses/:id, GET/POST /progress, GET/PATCH /progress/:id, GET /health — with the exact request/response shape for each.',
        checklist: [
          "The project structure separates routes, services, middleware, and configuration into their own files/folders",
          "A written API contract exists (even as a comment or README) documenting every endpoint's method, path, request shape, and success response shape before implementation begins",
          'package.json has "type": "module" and express installed as a real dependency',
        ],
      },
      {
        id: "m2",
        title: "Resources, validation, and structured errors",
        description:
          "Implement the courses and progress resources with their full CRUD-appropriate routes, following this course's REST design lesson (correct status codes: 201 for create, 204 for delete, 404 for missing resources). Extract business logic into a service layer per resource. Add real validation for every write endpoint (POST/PATCH), collecting all errors per request, and a centralized error-handling middleware using a shared AppError class distinguishing operational from programmer errors.",
        checklist: [
          "Every write endpoint validates its input and returns 400 with a structured, field-specific error body for invalid data",
          "GET requests for a nonexistent resource id return 404, not a generic error or a 200 with null data",
          "A single centralized error-handling middleware (4 parameters, registered last) handles every error, hiding programmer-error details behind a generic message",
          "Route handlers call service functions rather than embedding business logic directly in the route",
        ],
      },
      {
        id: "m3",
        title: "Configuration, logging, and security boundaries",
        description:
          "Add startup configuration validation (required environment variables checked before the server starts, failing fast with a clear message naming every missing value) and a safe logging utility that redacts sensitive fields before writing anything out. Add an authorization-check middleware for at least one endpoint that should be restricted, correctly distinguishing 401 (no valid identity) from 403 (valid identity, insufficient permission) using a simulated/mocked identity for this project's purposes (not a real credential system).",
        checklist: [
          "The server refuses to start with a clear, specific error if required configuration is missing",
          "A logging utility redacts at least password/token-style fields before anything is logged, and is used consistently rather than ad hoc console.log calls",
          "At least one endpoint has an authorization check that correctly returns 401 for no identity and 403 for a valid-but-unauthorized identity",
        ],
      },
      {
        id: "m4",
        title: "Automated tests",
        description:
          "Add an automated test suite (using the test runner from this course's testing lesson) covering: at least three service-level tests (including at least one rejection/error case), at least three HTTP-level tests using supertest against the exported Express app (including at least one validation-failure case expecting 400), and confirm the full suite is properly isolated (each test sets up its own fresh state).",
        checklist: [
          "At least three service-level tests exist, including a case that should fail/reject",
          "At least three HTTP-level tests exist using supertest, including a validation-failure case",
          "Every test creates its own fresh state rather than depending on another test's leftover data",
          "The full test command runs successfully with zero failures",
        ],
      },
      {
        id: "m5",
        title: "Operational readiness",
        description:
          "Add a GET /health endpoint reporting real readiness (not just 'the process is running'), and implement graceful shutdown: on SIGTERM, stop accepting new connections, let in-flight requests finish, then exit — following this course's operational-readiness lesson.",
        checklist: [
          "GET /health returns a meaningful status distinct from simply 'the process didn't crash'",
          "The server calls server.close() (or equivalent) on SIGTERM rather than exiting immediately",
          "Manually verified: starting the server, sending a slow request, then triggering shutdown does not abruptly cut off that in-flight request",
        ],
      },
    ],
    references: [
      {
        label: "Express docs: Error Handling",
        url: "https://expressjs.com/en/guide/error-handling.html",
      },
      { label: "The Twelve-Factor App: Config", url: "https://12factor.net/config" },
      { label: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/" },
    ],
  },
];
