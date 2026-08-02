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
];
