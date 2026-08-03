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
  {
    id: "course-enrollment-progress-manager",
    slug: "course-enrollment-progress-manager",
    title: "Course Enrollment and Progress Manager",
    description:
      "Build a real, local, console-based Java application modeling courses, learners, enrollments, and lesson-completion progress — using encapsulation, composition, interfaces, polymorphism, structured exceptions, and a real JUnit test suite. Compiled and run entirely on your own machine; this platform does not execute Java.",
    difficulty: "intermediate",
    estimatedHours: 8,
    isCapstone: false,
    trackSlugs: ["java"],
    prerequisiteLessonIds: [
      "java-classes-and-objects",
      "java-inheritance-and-composition",
      "java-interfaces-and-polymorphism",
      "java-exceptions",
      "java-generics-equality-immutability",
      "java-collections",
      "java-lambdas-and-streams",
      "java-resource-safety-and-testing",
    ],
    objectives: [
      "Model a small domain (courses, learners, enrollments) with encapsulated classes, composition, and at least one interface with multiple implementations",
      "Validate input and signal failure with a custom, structured exception hierarchy",
      "Implement equals/hashCode correctly for at least one value-like class",
      "Compute derived progress data using Streams, and verify all of it with a real JUnit test suite",
    ],
    milestones: [
      {
        id: "m1",
        title: "Project setup and domain model",
        description:
          "Scenario: you are building the backend logic behind a learning platform's enrollment system — entirely as a local, Maven-based Java console application (no database, no network). Set up a Maven project (mvn archetype:generate) organized into packages by feature: com.visaspark.enrollment.model (Course, Learner, Enrollment), com.visaspark.enrollment.exceptions, and com.visaspark.enrollment.app (the Main entry point). Define Course and Learner as encapsulated classes (private final fields, constructors validating their inputs, and only the getters that are actually needed).",
        checklist: [
          "The project builds with `mvn compile` and has the three-package structure described above",
          "Course and Learner have private, final fields with no public setters for identity-like fields (id, title/name)",
          "Constructors validate their inputs (e.g. reject a blank title or name) and throw a specific, custom exception on invalid input",
        ],
      },
      {
        id: "m2",
        title: "Enrollment, composition, and an interface with two implementations",
        description:
          "Implement an Enrollment class that composes a Learner and a Course (a field, not inheritance) plus a mutable set of completed lesson IDs and a completion-percentage calculation. Define a Progressable interface (e.g. a method like double completionPercentage()) and implement it on at least two genuinely different classes (Enrollment itself, and a second, distinct type such as a Milestone or Certification that also tracks a percentage a different way) so a single polymorphic method can report progress across both without branching on type.",
        checklist: [
          "Enrollment composes a Learner and Course by reference, not by extending either class",
          "A Progressable interface exists and is implemented by at least two structurally different classes",
          "A method exists that computes/reports progress across a mixed List<Progressable> using only the interface, with no instanceof checks",
        ],
      },
      {
        id: "m3",
        title: "Structured exceptions and validation",
        description:
          "Define a small exception hierarchy (e.g. an abstract EnrollmentException extends RuntimeException, with concrete subclasses like DuplicateEnrollmentException and InvalidLessonReferenceException) and use it to reject invalid operations: enrolling the same learner in the same course twice, or marking a lesson complete that doesn't belong to the enrolled course. Every validation failure must throw the specific, correct exception subtype — never a generic RuntimeException or IllegalArgumentException standing in for a case that has its own named type.",
        checklist: [
          "At least two distinct, purpose-specific exception subclasses exist, both extending a shared base exception",
          "Enrolling a learner in a course they're already enrolled in throws the specific DuplicateEnrollmentException",
          "Marking a lesson complete for a lesson not belonging to the enrolled course throws the specific InvalidLessonReferenceException",
        ],
      },
      {
        id: "m4",
        title: "Equality, hashing, and a Stream-based summary",
        description:
          "Implement equals() and hashCode() correctly and consistently for Enrollment (two Enrollments should be equal if they reference the same learner and course, regardless of completed-lesson state) — and add at least one HashSet or HashMap operation in the application that depends on this being correct (e.g. deduplicating a list of Enrollments). Then use the Stream API to compute at least one derived summary across a List<Enrollment> — for example, the average completion percentage across all of one learner's enrollments, or the count of fully-completed enrollments.",
        checklist: [
          "equals()/hashCode() are both overridden on Enrollment, consistently, based on learner + course identity",
          "At least one HashSet or HashMap operation in the app demonstrably relies on this equals()/hashCode() pair being correct",
          "At least one Stream pipeline (filter/map/reduce or a collector) computes a real derived summary from a List<Enrollment>",
        ],
      },
      {
        id: "m5",
        title: "JUnit tests and a console entry point",
        description:
          "Add a JUnit 5 test suite (src/test/java, mirroring your main package structure) covering: successful enrollment, the duplicate-enrollment rejection, the invalid-lesson-reference rejection, correct completion-percentage computation, and the equals()/hashCode() contract. Finish Main.java as a deterministic console entry point that builds a small, fixed set of courses/learners/enrollments, performs a few operations (including at least one that intentionally triggers and catches a custom exception), and prints a human-readable summary.",
        checklist: [
          "At least 6 JUnit tests exist, covering both success and failure/rejection cases",
          "`mvn test` runs the full suite successfully with zero failures",
          "Main.java runs deterministically end to end via `mvn exec:java`, printing a real summary and demonstrating at least one caught, handled custom exception",
        ],
      },
    ],
    references: [
      {
        label: "Oracle: The Java Tutorials — Custom Exceptions",
        url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/creating.html",
      },
      { label: "JUnit 5 User Guide", url: "https://junit.org/junit5/docs/current/user-guide/" },
      {
        label: "Oracle Java SE 21 API — Object.equals",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)",
      },
    ],
  },
  {
    id: "learning-path-recommendation-engine",
    slug: "learning-path-recommendation-engine",
    title: "Learning Path Recommendation Engine",
    description:
      "Build a real, browser-executable TypeScript engine that models courses as a prerequisite graph, validates it, detects cycles, computes a valid learning order, and recommends a priority-ordered path — with deterministic tests for every edge case.",
    difficulty: "advanced",
    estimatedHours: 7,
    isCapstone: false,
    trackSlugs: ["algorithms"],
    prerequisiteLessonIds: [
      "dsa-graphs-and-traversal",
      "dsa-recursion-and-divide-and-conquer",
      "dsa-heaps-and-priority-queues",
      "dsa-complexity-and-big-o",
    ],
    objectives: [
      "Model courses and prerequisites as a directed graph using an adjacency list",
      "Detect cycles and reject invalid prerequisite data before computing anything from it",
      "Compute a valid learning order (a topological sort) using either BFS or DFS",
      "Use a priority queue to break ties in a stated, deliberate way, and justify the approach's complexity",
    ],
    milestones: [
      {
        id: "m1",
        title: "Graph model and invalid-data validation",
        description:
          "Scenario: you're building the algorithm behind a 'what should I learn next' recommendation feature. Model courses as graph nodes and prerequisites as directed edges, using an adjacency list (Map<string, string[]>). Write validateGraph(courses, prerequisites) that rejects (returns a specific error, does not throw an uncaught exception) invalid input: a prerequisite referencing a course ID that doesn't exist in courses, and a course listed as its own prerequisite (a trivial self-cycle).",
        checklist: [
          "Courses and prerequisites are modeled as an adjacency-list graph, not an adjacency matrix",
          "validateGraph correctly rejects a prerequisite referencing an unknown course ID",
          "validateGraph correctly rejects a course listed as its own direct prerequisite",
        ],
      },
      {
        id: "m2",
        title: "Cycle detection",
        description:
          "Implement hasCycle(graph) using DFS with a visited set AND an in-progress ('currently on this path') set, correctly distinguishing a genuine cycle from simply revisiting an already-fully-processed node through a different path (which is normal and NOT a cycle in a DAG). Test it against a genuinely cyclic prerequisite chain (A requires B, B requires C, C requires A) and a non-cyclic graph where two different courses share a common prerequisite (which must NOT be flagged as a cycle).",
        checklist: [
          "hasCycle correctly detects a genuine multi-step cycle (A -> B -> C -> A)",
          "hasCycle does NOT falsely flag a diamond-shaped dependency (two courses sharing one common prerequisite) as a cycle",
          "hasCycle correctly reports false for a graph with no edges at all",
        ],
      },
      {
        id: "m3",
        title: "Valid learning order (topological sort)",
        description:
          "Implement computeLearningOrder(graph) returning an array of course IDs in an order where every prerequisite appears before the course that depends on it. Use either a BFS-based approach (repeatedly removing nodes with no remaining unmet prerequisites) or a DFS-based approach (postorder, then reverse) — document which you chose and why in a code comment. The function must throw a clear, specific error if the graph contains a cycle (reuse hasCycle from milestone 2), since no valid order exists in that case.",
        checklist: [
          "computeLearningOrder returns an order where every prerequisite precedes every course that depends on it, verified across at least 3 different graph shapes",
          "computeLearningOrder throws a clear, specific error for a cyclic graph rather than returning an incomplete or incorrect order",
          "A code comment explains and justifies the BFS-or-DFS choice actually made",
        ],
      },
      {
        id: "m4",
        title: "Priority-based recommendation",
        description:
          "Using a min-heap (or an equivalent priority-queue implementation from this course's heaps lesson), implement recommendNext(graph, completedCourseIds, priorities) returning the single highest-priority course whose prerequisites are ALL already in completedCourseIds — i.e. among every course that's currently eligible to start, pick the one with the best (lowest) priority number. Document this function's time complexity in a comment, in terms of the number of courses and edges.",
        checklist: [
          "recommendNext correctly identifies the set of currently-eligible courses (every prerequisite already completed)",
          "Among eligible courses, recommendNext correctly returns the one with the best priority using a heap-based selection, not a linear scan re-sorted from scratch on every call",
          "A code comment states the function's time complexity and the reasoning behind it",
        ],
      },
      {
        id: "m5",
        title: "Deterministic tests for every required edge case",
        description:
          "Write a deterministic test suite (reusing this course's runner-based exercise pattern) covering: a valid multi-course graph, a graph with an invalid prerequisite reference, a self-cycle, a multi-step cycle, a diamond dependency (correctly NOT flagged as a cycle), an empty graph, and at least one recommendNext call where multiple courses are simultaneously eligible (verifying the priority tie-break is genuinely being used, not just the first eligible course found).",
        checklist: [
          "At least 8 deterministic test cases exist, covering every scenario listed above",
          "Every test asserts a specific, exact expected result — not just 'it didn't throw'",
          "All tests pass when run",
        ],
      },
    ],
    references: [
      {
        label: "MDN: Map",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
      },
    ],
  },
  {
    id: "learning-platform-database",
    slug: "learning-platform-database",
    title: "Learning Platform Database Layer",
    description:
      "Design and build the real PostgreSQL database layer for a learning platform — normalized schema, keys, constraints, indexes, transactions, ordered migrations, least-privileged roles, reporting queries, and a genuine backup/recovery checklist. Built and run entirely on your own local PostgreSQL install.",
    difficulty: "advanced",
    estimatedHours: 8,
    isCapstone: false,
    trackSlugs: ["databases"],
    prerequisiteLessonIds: [
      "pg-schema-implementation",
      "pg-joins-and-aggregation",
      "pg-transactions-and-acid",
      "pg-indexes-and-query-plans",
      "pg-views-and-roles",
      "pg-migrations-and-operations",
    ],
    objectives: [
      "Design and implement a normalized, dependency-ordered PostgreSQL schema for a real multi-entity domain",
      "Write reporting queries using joins, aggregation, and window functions",
      "Add indexes justified by real query patterns, and verify them with EXPLAIN",
      "Implement least-privileged roles and a real, ordered migration sequence",
    ],
    milestones: [
      {
        id: "m1",
        title: "Entity relationships and schema design",
        description:
          "Scenario: you are building the real database layer behind a learning platform, covering learners, courses, modules, lessons, enrollments, lesson-level progress, and notes/bookmarks. Model every entity and relationship (including cardinality and optionality) in a short design document before writing DDL, explicitly noting which relationships are one-to-many and which (if any) are many-to-many and need a junction table.",
        checklist: [
          "A design document lists every entity, its key attributes, and every relationship's cardinality and optionality",
          "At least one one-to-many relationship (e.g. course to lessons) and one many-to-many-via-junction relationship (e.g. learner to course, via enrollment) are both correctly identified",
          "The design is normalized to at least Third Normal Form, with any deliberate denormalization explicitly justified in the document",
        ],
      },
      {
        id: "m2",
        title: "Schema implementation, constraints, and seed data",
        description:
          "Implement the full schema as ordered migration files (learner, course, module, lesson, enrollment, lesson_progress, note — created in valid dependency order), with appropriate PostgreSQL types, PRIMARY KEY/NOT NULL/UNIQUE/CHECK constraints, and REFERENCES with explicit ON DELETE behavior for every foreign key. Seed the schema with realistic sample data (at least 3 learners, 3 courses with modules and lessons, and a mix of enrollment/progress states) in an order that respects every foreign key.",
        checklist: [
          "All tables are created via ordered migration files, applying cleanly with no foreign key errors",
          "Every foreign key has an explicit, deliberately-chosen ON DELETE behavior (not left to the default without consideration)",
          "Seed data includes realistic, varied enrollment and lesson-progress states across at least 3 learners and 3 courses",
        ],
      },
      {
        id: "m3",
        title: "Reporting queries",
        description:
          "Write at least four reporting queries against the schema: (1) each learner's overall completion percentage across all their enrollments, using a join and aggregation; (2) the most-recently-active learners, using a subquery or CTE; (3) each course's popularity ranked using a window function (RANK() or ROW_NUMBER()); (4) a query using a CTE to avoid repeating a non-trivial intermediate calculation used more than once in the same query.",
        checklist: [
          "All four reporting queries run successfully and return sensible, verifiable results against the seed data",
          "At least one query uses a window function (PARTITION BY and/or ORDER BY inside OVER)",
          "At least one query uses a CTE, with a comment explaining why a CTE was chosen over a plain subquery for that specific case",
        ],
      },
      {
        id: "m4",
        title: "Indexes, transactions, and roles",
        description:
          "Add at least two indexes justified by the reporting queries from milestone 3 (verify each one changes a query's EXPLAIN output from a Seq Scan to an Index Scan). Write a genuine multi-statement transaction (e.g. enrolling a learner AND creating their initial lesson_progress rows together) that correctly rolls back entirely if any part fails. Create at least two roles with different, deliberately narrow privilege sets (e.g. a read-only reporting role, and an application role limited to exactly the tables/actions it needs).",
        checklist: [
          "At least two indexes exist, each with a documented EXPLAIN before/after showing a Seq Scan to Index Scan change",
          "A multi-statement transaction exists and is verified to roll back completely on a simulated failure partway through",
          "At least two roles exist with genuinely different, narrowly-scoped privilege sets, verified by attempting (and having rejected) an out-of-scope operation as each role",
        ],
      },
      {
        id: "m5",
        title: "Verification and operational checklist",
        description:
          "Write a set of verification queries confirming the schema's constraints actually work (attempting and observing the rejection of: a duplicate enrollment, a negative value where a CHECK forbids it, an orphaned foreign key reference). Complete a real backup/recovery checklist for this schema, following this course's operational-safety lesson — with specific, concrete answers, not placeholders.",
        checklist: [
          "At least 3 verification queries exist, each demonstrating a specific constraint correctly rejecting invalid data",
          "The backup/recovery checklist has specific, concrete answers for backup frequency, a tested restore procedure, acceptable data-loss window, and recovery time expectation",
          "Every migration file applies cleanly, in order, to a completely fresh database",
        ],
      },
    ],
    references: [
      {
        label: "PostgreSQL 16 Documentation — Chapter 5: Data Definition",
        url: "https://www.postgresql.org/docs/16/ddl.html",
      },
      {
        label: "PostgreSQL 16 Documentation — 14.1. Using EXPLAIN",
        url: "https://www.postgresql.org/docs/16/using-explain.html",
      },
      {
        label: "PostgreSQL 16 Documentation — Chapter 22: Database Roles",
        url: "https://www.postgresql.org/docs/16/user-manag.html",
      },
    ],
  },
  {
    id: "cross-browser-learning-platform-test-suite",
    slug: "cross-browser-learning-platform-test-suite",
    title: "Build a Cross-Browser Learning Platform Test Suite",
    description:
      "Build a real, local Playwright + TypeScript test suite modeling a learning platform's key flows — locators, fixtures, authentication state, page objects, parallel execution, and trace-based diagnostics — running against multiple real browsers. Runs entirely on your own machine; this platform does not execute Playwright.",
    difficulty: "intermediate",
    estimatedHours: 9,
    isCapstone: false,
    trackSlugs: ["playwright"],
    prerequisiteLessonIds: [
      "pw-architecture-and-setup",
      "pw-locators",
      "pw-waiting-and-assertions",
      "pw-navigation-and-forms",
      "pw-auth-state-projects",
      "pw-fixtures-and-hooks",
      "pw-page-objects-test-data",
      "pw-parallelism-retries-timeouts",
      "pw-trace-debugging",
      "pw-reporting-ci",
    ],
    objectives: [
      "Configure a real, local Playwright project that runs the same suite against at least two browser engines",
      "Write reliable tests using role-based locators and web-first assertions, with zero fixed sleeps",
      "Compose fixtures for reusable authentication state and design at least two page objects",
      "Configure parallel execution with a deliberate retry and timeout policy",
      "Diagnose a failing test using the trace viewer, and wire the suite into a CI workflow that uploads diagnostics on failure",
    ],
    milestones: [
      {
        id: "m1",
        title: "Multi-browser project setup and first tests",
        description:
          "Scenario: you are building a real, local automated test suite for a small demo web app (any simple static site or local dev server you control, including a few pages of this very platform if you run it locally) — entirely on your own machine. Initialize a Playwright + TypeScript project (npm init playwright@latest), configure playwright.config.ts to run against at least Chromium and Firefox, and write a first smoke test that navigates to a page and asserts a heading is visible using a role-based locator.",
        checklist: [
          "npx playwright test runs the suite against at least two real, distinct browser engines",
          "The first test uses a role-based locator (getByRole) and a web-first assertion, not a fixed sleep",
          "playwright.config.ts defines at least two named projects, one per browser engine",
        ],
      },
      {
        id: "m2",
        title: "Reliable locators and multi-page navigation",
        description:
          "Add tests covering at least two more real user flows across multiple pages of your demo app — using only role-based or accessible locators, Playwright's auto-waiting, and web-first assertions (expect(locator).toBeVisible(), .toHaveText(), etc.). Include at least one test verifying an error or edge-case state (an invalid form submission, a not-found page), not just the happy path.",
        checklist: [
          "At least 2 additional tests cover distinct, multi-page user flows",
          "Every locator is role-based or otherwise accessible-attribute-based -- no brittle CSS-position or XPath-index selectors",
          "At least one test verifies an error or edge-case state, not only a success path",
        ],
      },
      {
        id: "m3",
        title: "Fixtures, authentication state, and page objects",
        description:
          "Build a custom fixture that establishes and reuses authentication state (a real storageState setup project, or a mocked login flow appropriate to your demo app) so authenticated tests don't each re-perform login from scratch. Introduce at least two page objects for the most-used pages, and refactor at least 3 existing tests to use them instead of inline locators.",
        checklist: [
          "A dedicated setup project or fixture establishes authentication state once and reuses it via storageState",
          "At least 2 page objects exist, each wrapping one page's locators and actions behind a small, meaningful API",
          "At least 3 tests use the page objects instead of constructing locators inline",
        ],
      },
      {
        id: "m4",
        title: "Test data, parallel execution, and retry/timeout policy",
        description:
          "Add a small test-data builder function (with sensible defaults and an overridable partial input) for any test data your suite creates. Configure fullyParallel: true and a deliberate, small retry count (1-2) with a documented, comfortable timeout margin above your app's normal response times. Confirm the full suite still passes running in parallel, with genuinely isolated tests (no shared, hardcoded test data).",
        checklist: [
          "At least one test-data builder function exists and is used by at least 2 tests with different overrides",
          "playwright.config.ts sets fullyParallel: true and a small, documented retry count",
          "The full suite passes when run in parallel, with no test depending on another test's data or execution order",
        ],
      },
      {
        id: "m5",
        title: "Diagnostics and CI reporting",
        description:
          "Intentionally break one test (change an assertion to a wrong expected value), run the suite, and use the trace viewer (npx playwright show-trace) to diagnose exactly what happened -- then fix the test. Add a GitHub Actions workflow (.github/workflows/playwright.yml) that installs Playwright's browsers, runs the suite, and uploads the HTML report as an artifact on failure.",
        checklist: [
          "A real trace was captured for a genuinely failing test and inspected in the trace viewer to identify the cause",
          "The suite is restored to a fully passing state after the diagnosis",
          "A CI workflow file exists that installs browsers, runs the suite, and uploads the report artifact on failure",
        ],
      },
    ],
    references: [
      { label: "Playwright Docs: Getting Started", url: "https://playwright.dev/docs/intro" },
      { label: "Playwright Docs: Authentication", url: "https://playwright.dev/docs/auth" },
      { label: "Playwright Docs: Trace Viewer", url: "https://playwright.dev/docs/trace-viewer" },
    ],
  },
  {
    id: "maintainable-learning-portal-selenium-suite",
    slug: "maintainable-learning-portal-selenium-suite",
    title: "Build a Maintainable Learning Portal Selenium Suite",
    description:
      "Build a real, local Java + Selenium WebDriver + JUnit test suite modeling a learning platform's key flows — explicit waits, page objects, component objects, and CI execution. Compiled and run entirely on your own machine; this platform does not execute Selenium or Java.",
    difficulty: "intermediate",
    estimatedHours: 9,
    isCapstone: false,
    trackSlugs: ["selenium"],
    prerequisiteLessonIds: [
      "sel-webdriver-architecture",
      "sel-driver-lifecycle-navigation",
      "sel-element-location",
      "sel-synchronization-waits",
      "sel-forms-dropdowns-alerts",
      "sel-frames-windows-actions",
      "sel-page-objects",
      "sel-junit-integration",
      "sel-failure-diagnosis",
      "sel-reporting-ci",
    ],
    objectives: [
      "Set up a real, local Maven project with Selenium WebDriver and JUnit 5",
      "Automate a realistic multi-page workflow using only explicit or fluent waits, with zero fixed sleeps",
      "Structure the suite with page objects and at least one reusable component object",
      "Write JUnit parameterized tests covering multiple input scenarios",
      "Diagnose a real failure (a stale element or timing issue) and integrate the suite into CI",
    ],
    milestones: [
      {
        id: "m1",
        title: "Maven project setup and first test",
        description:
          "Scenario: you are building a real, local automated test suite for a small demo web app (any simple static site or local dev server you control) -- entirely on your own machine. Initialize a Maven project with selenium-java and junit-jupiter dependencies, configure WebDriverManager (or manually manage a matching driver), and write a first JUnit test that opens a real browser, navigates to a page, and asserts an element's text using an explicit wait.",
        checklist: [
          "mvn test runs a real Selenium test that launches an actual browser",
          "The test uses WebDriverWait with an explicit ExpectedCondition, not Thread.sleep",
          "The driver is properly quit in an @AfterEach (or equivalent) so no browser process is left running",
        ],
      },
      {
        id: "m2",
        title: "A realistic multi-page workflow",
        description:
          "Automate a multi-step workflow spanning at least 3 pages of your demo app (for example: search, view a result, submit a form) using accessible, stable locator strategies (id, name, or a stable data attribute over a brittle absolute XPath) and explicit waits at every step where content loads asynchronously. Include at least one assertion on an error or validation state.",
        checklist: [
          "The workflow spans at least 3 distinct pages/states in a single test",
          "Every wait is explicit or fluent, never a fixed Thread.sleep",
          "At least one assertion covers an error or validation state, not only the happy path",
        ],
      },
      {
        id: "m3",
        title: "Page objects and a reusable component object",
        description:
          "Refactor the workflow from Milestone 2 into page object classes (one per page, encapsulating that page's locators and actions behind clearly named methods) and extract at least one UI piece that appears on multiple pages (like a navigation bar) into a separate, reusable component object that the page objects hold an instance of.",
        checklist: [
          "At least 3 page object classes exist, each owning only its own page's locators and actions",
          "At least 1 component object exists for a UI piece reused across multiple pages, held by the page objects that embed it",
          "The test from Milestone 2 is rewritten to use only page/component objects, with no locators inline in the test itself",
        ],
      },
      {
        id: "m4",
        title: "JUnit parameterized tests and the Actions API",
        description:
          "Convert at least one test into a JUnit 5 @ParameterizedTest covering at least 3 distinct input scenarios (for example, 3 different search terms or form inputs, including at least one invalid one). Add a test using the Actions API for a non-trivial interaction (a hover-triggered menu, a drag action, or a right-click, depending on your demo app).",
        checklist: [
          "At least one @ParameterizedTest exists, covering 3 or more distinct scenarios via @ValueSource, @CsvSource, or @MethodSource",
          "At least one test uses the Actions API for an interaction plain click()/sendKeys() can't express",
          "All parameterized scenarios pass",
        ],
      },
      {
        id: "m5",
        title: "Failure diagnosis and CI execution",
        description:
          "Intentionally introduce a timing issue (remove an explicit wait) to reproduce a real stale-element or timing failure, capture a screenshot at the point of failure, diagnose and fix the root cause, and confirm the suite passes reliably across several consecutive runs. Add a GitHub Actions workflow that installs a JDK, runs mvn test with a headless browser, and publishes the test report.",
        checklist: [
          "A real, intentionally reproduced failure was diagnosed to its actual root cause (not just retried until it passed)",
          "The suite passes reliably across at least 3 consecutive local runs after the fix",
          "A CI workflow file exists that sets up Java, runs the suite headlessly, and publishes the test results",
        ],
      },
    ],
    references: [
      {
        label: "Selenium Docs: WebDriver",
        url: "https://www.selenium.dev/documentation/webdriver/",
      },
      {
        label: "Selenium Docs: Waits",
        url: "https://www.selenium.dev/documentation/webdriver/waits/",
      },
      {
        label: "JUnit 5 User Guide: Parameterized Tests",
        url: "https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests",
      },
    ],
  },
  {
    id: "safe-project-validation-cli",
    slug: "safe-project-validation-cli",
    title: "Build a Safe Project Validation CLI",
    description:
      "Build a real, local Bash CLI tool that validates a project folder's structure and content — defensive scripting (set -euo pipefail), text-processing checks, cleanup traps, and distinct, meaningful exit codes. Runs entirely on your own machine; this platform does not execute shell commands.",
    difficulty: "intermediate",
    estimatedHours: 7,
    isCapstone: false,
    trackSlugs: ["linux-shell"],
    prerequisiteLessonIds: [
      "sh-filesystem-and-navigation",
      "sh-io-streams-redirection",
      "sh-text-processing-search",
      "sh-env-vars-path",
      "sh-scripting-basics",
      "sh-defensive-scripting",
      "sh-temp-files-cleanup-logging",
      "sh-shellcheck-portability",
      "sh-cron-ci-execution",
    ],
    objectives: [
      "Write a Bash CLI that parses arguments and prints clear usage/help output",
      "Implement at least 4 distinct, safe (non-destructive) validation checks against a real project folder",
      "Use set -euo pipefail, a safe temp file via mktemp, and a cleanup trap registered on EXIT",
      "Use grep/sed/awk-based text-processing checks against real file content",
      "Design distinct, documented exit codes and a clean ShellCheck run, suitable for CI use",
    ],
    milestones: [
      {
        id: "m1",
        title: "Argument parsing and usage output",
        description:
          "Scenario: you are building a real, local CLI tool a team could run before every commit to catch basic project-structure problems -- entirely on your own machine. Create validate.sh, starting with set -euo pipefail. Accept a project directory as $1, print a clear usage message and exit with a specific code if no argument is given, and print a specific error and exit with a different code if the given path doesn't exist or isn't a directory.",
        checklist: [
          "validate.sh begins with set -euo pipefail",
          "Running it with no arguments prints a clear usage message to stderr and exits non-zero",
          "Running it against a nonexistent path prints a clear, specific error and exits with a distinct, documented code",
        ],
      },
      {
        id: "m2",
        title: "Real, non-destructive validation checks",
        description:
          "Implement at least 4 distinct checks against the given project directory: for example, a README.md exists, a specific required subdirectory exists, no file larger than a chosen size threshold exists, and no filename contains a space (a common source of downstream scripting bugs). Every check must be read-only -- this script must never create, modify, or delete anything in the directory being validated.",
        checklist: [
          "At least 4 distinct, independent checks are implemented",
          "Every check is genuinely read-only against the target directory (find, test, grep -- never rm, mv, or > into the target)",
          "Each check prints a clear PASS or FAIL line naming exactly what it checked",
        ],
      },
      {
        id: "m3",
        title: "Cleanup traps and text-processing checks",
        description:
          "Create a temp file with mktemp to accumulate a results summary, and register a trap 'rm -f \"$tmpfile\"' EXIT immediately after creating it, so it's always removed. Add at least one check using grep, sed, or awk against real file content (for example: no file contains a hardcoded TODO older than a threshold, or a config file has a required key set).",
        checklist: [
          "A temp file is created with mktemp and cleaned up via a trap registered on EXIT, confirmed by checking it doesn't survive an intentionally forced early failure",
          "At least one check uses grep, sed, or awk against real file content, not just filename/existence checks",
          "The results summary temp file is genuinely used (written to and read from) during the run, not just created and discarded",
        ],
      },
      {
        id: "m4",
        title: "Distinct exit codes and CI-friendly design",
        description:
          "Assign a distinct, documented exit code to each category of failure (for example: 1 = usage error, 2 = missing required file, 3 = a text-content check failed, 4 = a size/naming check failed), with 0 reserved for a fully passing run. Ensure the script never assumes a particular working directory (only ever uses the passed-in path or absolute paths) and never relies on any environment variable being pre-set without an explicit default.",
        checklist: [
          "At least 4 distinct exit codes are used and documented in a comment at the top of the script",
          "The script produces identical, correct results regardless of the working directory it's invoked from",
          "set -u is active and the script runs correctly with no pre-set custom environment variables",
        ],
      },
      {
        id: "m5",
        title: "ShellCheck and a CI workflow",
        description:
          "Run ShellCheck against validate.sh and resolve every reported issue (or document, with a comment, the specific, deliberate reason a particular warning is a false positive in this case). Add a GitHub Actions workflow that runs validate.sh against the repository itself as a real quality check, uploading the results summary as an artifact.",
        checklist: [
          "shellcheck validate.sh reports zero unaddressed warnings",
          "A CI workflow file exists that runs validate.sh against a real target directory and reflects its exit code in the job's result",
          "The results summary is uploaded as a CI artifact on the workflow run",
        ],
      },
    ],
    references: [
      {
        label: "GNU Bash Manual: The Set Builtin",
        url: "https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin",
      },
      { label: "ShellCheck", url: "https://www.shellcheck.net/" },
      {
        label: "GNU Coreutils Manual: mktemp invocation",
        url: "https://www.gnu.org/software/coreutils/manual/html_node/mktemp-invocation.html",
      },
    ],
  },
  {
    id: "production-grade-learning-platform-automation-framework",
    slug: "production-grade-learning-platform-automation-framework",
    title: "Build a Production-Grade Learning Platform Automation Framework",
    description:
      "Build a real, local, layered TypeScript + Playwright automation framework — configuration, fixtures, test-data builders, page/component/service objects, domain assertions, tagging, diagnostics, and a CI pipeline with quality gates. Runs entirely on your own machine; this platform does not execute Playwright, and no real database credentials are ever used.",
    difficulty: "advanced",
    estimatedHours: 11,
    isCapstone: false,
    trackSlugs: ["test-automation-framework"],
    prerequisiteLessonIds: [
      "tafe-framework-goals-boundaries",
      "tafe-repo-structure-config",
      "tafe-test-data-builders",
      "tafe-fixtures-di",
      "tafe-page-component-models",
      "tafe-service-clients",
      "tafe-assertion-design-dsl",
      "tafe-tagging-test-selection",
      "tafe-diagnostics-reporting",
      "tafe-ci-quality-gates",
    ],
    objectives: [
      "Scaffold a layered TypeScript + Playwright framework (config, fixtures, data, pages, services)",
      "Implement environment-aware configuration, safe secret handling, and reusable test-data builders",
      "Design at least one service client and a documented DB-validation adapter interface, without any real database connection or credential",
      "Write at least one custom domain assertion and apply a consistent tagging scheme",
      "Wire the framework into a sharded CI pipeline with a genuine quality gate and a framework-health summary in the README",
    ],
    milestones: [
      {
        id: "m1",
        title: "Layered scaffold and configuration",
        description:
          "Scenario: you are building a real, local, reusable automation framework intended to back a growing test suite for a demo web app -- entirely on your own machine. Scaffold a TypeScript + Playwright project with separate src/config, src/fixtures, src/data, src/pages, and src/services folders. Implement environment-aware configuration (reading BASE_URL and TEST_ENV from process.env with sensible defaults) and confirm no secret or credential is hardcoded anywhere in the repository.",
        checklist: [
          "The project has the five separate, layer-based folders described above",
          "Configuration reads from environment variables with working defaults, confirmed by running the suite with two different BASE_URL values",
          "A repository-wide search confirms no hardcoded secret, password, or API key exists anywhere in the project",
        ],
      },
      {
        id: "m2",
        title: "Test-data builders, fixtures, and page/component objects",
        description:
          "Implement at least 2 test-data builder functions with sensible defaults and overridable inputs, each generating genuinely unique data per call. Compose at least one fixture that depends on another fixture (for example, an authenticated-page fixture built from a test-user fixture). Implement at least 2 page objects and 1 component object for a UI piece reused across multiple pages.",
        checklist: [
          "At least 2 data builders exist, each guaranteeing unique output per call and supporting partial overrides",
          "At least one fixture composes another fixture (a real dependency chain, not two independent, unrelated fixtures)",
          "At least 2 page objects and 1 genuinely reused component object exist",
        ],
      },
      {
        id: "m3",
        title: "Service clients and a DB-validation adapter interface",
        description:
          "Implement at least one service client wrapping related API calls behind business-intent-named methods (not raw HTTP verbs). Design (but do not implement against a real database) a DbValidationAdapter interface -- method signatures, argument types, and return shapes only -- documented with comments explaining what each method would verify in a real deployment, and provide an in-memory mock implementation for use in the framework's own tests. This adapter must never contain a real connection string or credential.",
        checklist: [
          "At least one service-client method exists, named for business intent, wrapping a raw request internally",
          "A DbValidationAdapter interface is fully designed and documented, with an in-memory mock implementation -- no real database connection exists anywhere in the project",
          "A repository-wide search confirms no real database credential, connection string, or Supabase reference exists anywhere in the project",
        ],
      },
      {
        id: "m4",
        title: "Domain assertions, tagging, and reliability policy",
        description:
          "Write at least one custom, domain-level assertion function with a purpose-built failure message. Apply a consistent tag scheme (at minimum @smoke and one feature-area tag) across the suite's tests. Configure a deliberate retry count (1-2, documented) and a timeout set with a comfortable margin above observed run times, and confirm the full suite passes reliably in parallel.",
        checklist: [
          "At least one custom domain assertion exists, with a failure message naming the actual business condition checked",
          "Every test carries at least one tag from a documented, consistent tag scheme",
          "The suite passes reliably, in parallel, with a documented retry count of at most 2",
        ],
      },
      {
        id: "m5",
        title: "CI quality gates, sharding, and framework health",
        description:
          "Add a GitHub Actions workflow that shards the suite across at least 2 parallel jobs, uploads the HTML report and trace artifacts on failure, and would genuinely block a merge if configured as a required status check (documented in the README, since the branch-protection setting itself lives in repository settings, not this file). Write a README section covering setup, architecture (mirroring the five-layer structure), the tagging scheme, and a framework-health checklist (flaky-rate tracking, CI runtime trend, documentation currency).",
        checklist: [
          "The CI workflow shards the suite across at least 2 parallel jobs using Playwright's --shard flag",
          "The workflow uploads the HTML report as an artifact specifically on failure",
          "The README documents setup, the five-layer architecture, the tagging scheme, and a framework-health checklist",
        ],
      },
    ],
    references: [
      {
        label: "Playwright Docs: Best Practices",
        url: "https://playwright.dev/docs/best-practices",
      },
      { label: "Playwright Docs: Sharding", url: "https://playwright.dev/docs/test-sharding" },
      { label: "Playwright Docs: Fixtures", url: "https://playwright.dev/docs/test-fixtures" },
    ],
  },
];
