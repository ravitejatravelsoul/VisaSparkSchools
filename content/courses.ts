import type { CourseInput } from "@/lib/content/types";

/**
 * Course registry.
 *
 * `modules`, `learningOutcomes`, `audience`, and the prerequisite/next/related
 * arrays were added in Phase 5A so the catalog can show a learner what a course
 * actually contains and where it sits in a sequence, rather than only a title
 * and an hour estimate. `scripts/validate-content.ts` enforces that every
 * lesson belongs to exactly one module and that every course slug referenced
 * here resolves to a real course.
 */
export const courses: CourseInput[] = [
  {
    id: "how-computing-works",
    slug: "how-computing-works",
    trackSlug: "foundations",
    title: "How Computing & the Web Work",
    description: "The mental model behind code, files, and the internet.",
    order: 0,
    difficulty: "beginner",
    estimatedHours: 2,
    audience:
      "Complete beginners who have never written code, and self-taught learners who can follow a tutorial but do not yet know what is happening underneath it.",
    learningOutcomes: [
      "Describe what happens between typing a line of code and seeing a result on screen",
      "Navigate a filesystem and run commands in a terminal with confidence",
      "Explain how a browser turns a URL into a rendered page, including DNS and HTTP",
    ],
    prerequisiteCourseSlugs: [],
    nextCourseSlugs: ["html-css-fundamentals"],
    relatedTechnologySlugs: ["how-to-guides", "introduction-to-programming"],
    modules: [
      {
        id: "computing-basics",
        title: "How code becomes behaviour",
        summary: "What a program actually is, and the tools you use to write one.",
        lessonSlugs: ["how-computers-run-code", "files-and-terminals"],
      },
      {
        id: "web-basics",
        title: "How the web delivers it",
        summary: "The request/response journey behind every page you open.",
        lessonSlugs: ["how-the-web-works"],
      },
    ],
  },
  {
    id: "html-css-fundamentals",
    slug: "html-css-fundamentals",
    trackSlug: "web-html-css",
    title: "HTML & CSS Fundamentals",
    description: "Build structured, styled, responsive, accessible pages from scratch.",
    order: 0,
    difficulty: "beginner",
    estimatedHours: 6,
    audience:
      "Learners who understand what a web page is and want to build one properly, including the accessibility and layout rules that separate a working page from a good one.",
    learningOutcomes: [
      "Write semantic HTML that describes meaning rather than appearance",
      "Build accessible forms with correctly associated labels and validation",
      "Control layout with the box model, Flexbox, and CSS Grid",
      "Make a page adapt to any screen size using mobile-first media queries",
    ],
    prerequisiteCourseSlugs: ["how-computing-works"],
    nextCourseSlugs: ["javascript-fundamentals"],
    relatedTechnologySlugs: ["html", "css", "introduction-to-html-and-css"],
    modules: [
      {
        id: "html-structure",
        title: "Structuring content with HTML",
        summary: "The elements that give a document meaning, not just shape.",
        lessonSlugs: [
          "html-document-structure",
          "html-semantic-elements",
          "html-forms-accessibility",
        ],
      },
      {
        id: "css-fundamentals",
        title: "Styling and the cascade",
        summary: "How selectors compete, and how an element's size is really calculated.",
        lessonSlugs: ["css-selectors-cascade", "css-box-model"],
      },
      {
        id: "css-layout",
        title: "Modern layout",
        summary: "One-dimensional and two-dimensional layout systems.",
        lessonSlugs: ["css-flexbox", "css-grid"],
      },
      {
        id: "css-responsive",
        title: "Responsive design",
        summary: "Making one page work on every screen.",
        lessonSlugs: ["css-responsive-design"],
      },
    ],
  },
  {
    id: "javascript-fundamentals",
    trackSlug: "javascript",
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Programming logic, the DOM, events, and asynchronous data in the browser.",
    order: 0,
    difficulty: "beginner",
    estimatedHours: 7,
    audience:
      "Learners comfortable with HTML and CSS who want to make pages respond to input and load real data.",
    learningOutcomes: [
      "Write functions, loops, and conditionals that solve a stated problem",
      "Model data with arrays and objects and transform it without mutating by accident",
      "Read and update the DOM in response to user events",
      "Fetch remote data and handle both success and failure paths",
    ],
    prerequisiteCourseSlugs: ["html-css-fundamentals"],
    nextCourseSlugs: ["typescript-foundations", "git-apis-sql"],
    relatedTechnologySlugs: ["javascript"],
    modules: [
      {
        id: "js-language-basics",
        title: "Language basics",
        summary: "Values, decisions, and repetition.",
        lessonSlugs: ["js-variables-types", "js-operators-conditions", "js-loops"],
      },
      {
        id: "js-structuring-code",
        title: "Structuring code and data",
        summary: "Reusable logic and the two collection types you will use constantly.",
        lessonSlugs: ["js-functions", "js-arrays-objects"],
      },
      {
        id: "js-browser",
        title: "Working with the browser",
        summary: "Reading, changing, and reacting to the page.",
        lessonSlugs: ["js-dom-selection", "js-events-forms"],
      },
      {
        id: "js-async",
        title: "Asynchronous JavaScript",
        summary: "Code that waits, and code that handles failure.",
        lessonSlugs: ["js-modules-async", "js-fetch-async"],
      },
    ],
  },
  {
    id: "typescript-foundations",
    slug: "typescript-foundations",
    trackSlug: "typescript",
    title: "TypeScript Foundations",
    description:
      "Add a type system to JavaScript: catch mistakes while you write, and model data so wrong states cannot be represented.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 5,
    audience:
      "Developers comfortable with JavaScript who keep hitting bugs that a type system would have caught, and anyone joining a codebase that already uses TypeScript.",
    learningOutcomes: [
      "Annotate variables, functions, arrays, and objects so the compiler checks your intent",
      "Model data with interfaces, unions, and literal types instead of loose strings",
      "Narrow a union safely and handle values that might be null or undefined",
      "Write reusable generic functions and apply built-in utility types",
    ],
    prerequisiteCourseSlugs: ["javascript-fundamentals"],
    nextCourseSlugs: ["react-application-development"],
    relatedTechnologySlugs: ["typescript"],
    modules: [
      {
        id: "ts-foundations-module",
        title: "From JavaScript to TypeScript",
        summary: "Why a type system pays for itself, and the syntax you will use constantly.",
        lessonSlugs: ["ts-why-types", "ts-inference-primitives"],
      },
      {
        id: "ts-shaping-data",
        title: "Describing data",
        summary: "Typing the two shapes almost all real data takes, then naming them.",
        lessonSlugs: ["ts-arrays-objects", "ts-interfaces-aliases"],
      },
      {
        id: "ts-handling-variation",
        title: "Handling variation and absence",
        summary: "Values that could be one of several types, or missing entirely.",
        lessonSlugs: ["ts-unions-narrowing", "ts-optional-nullability"],
      },
      {
        id: "ts-reusable-types",
        title: "Reusable types",
        summary: "Typing behaviour, then writing types that work for many shapes at once.",
        lessonSlugs: ["ts-function-types", "ts-generics", "ts-utility-types"],
      },
      {
        id: "ts-precision",
        title: "Precision and untrusted data",
        summary:
          "Narrowing types to exact values, and proving the shape of data you did not create.",
        lessonSlugs: ["ts-literal-types", "ts-unknown-guards", "ts-modeling-domain"],
      },
    ],
  },
  {
    id: "python-fundamentals",
    trackSlug: "python",
    slug: "python-fundamentals",
    title: "Python Fundamentals",
    description: "General-purpose programming with Python, from syntax to testing.",
    order: 0,
    difficulty: "beginner",
    estimatedHours: 7,
    audience:
      "Learners who want a general-purpose language for scripting, data work, or the backend of AI applications.",
    learningOutcomes: [
      "Write Python functions and control flow that solve a stated problem",
      "Choose the right built-in collection for a given data shape",
      "Read and write files and handle errors without crashing the program",
      "Model a problem with classes, and verify behaviour with automated tests",
    ],
    prerequisiteCourseSlugs: ["how-computing-works"],
    nextCourseSlugs: ["ai-foundations"],
    relatedTechnologySlugs: ["python"],
    modules: [
      {
        id: "py-basics",
        title: "Python basics",
        summary: "Syntax, values, and control flow.",
        lessonSlugs: ["py-syntax-types", "py-conditions-loops", "py-functions"],
      },
      {
        id: "py-data",
        title: "Data and structure",
        summary: "Collections and the module system that organises real programs.",
        lessonSlugs: ["py-collections", "py-modules-packages"],
      },
      {
        id: "py-robustness",
        title: "Robust programs",
        summary: "Persisting data, surviving errors, modelling with objects, and proving it works.",
        lessonSlugs: ["py-files-exceptions", "py-classes", "py-testing"],
      },
    ],
  },
  {
    id: "git-apis-sql",
    trackSlug: "git-api-sql",
    slug: "git-apis-sql",
    title: "Git, APIs & SQL",
    description: "Collaborate with version control, consume APIs, and query relational data.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 7,
    audience:
      "Learners who can already program and now need the three tools every development team expects: version control, HTTP APIs, and a database.",
    learningOutcomes: [
      "Track work with Git and collaborate through branches and pull requests",
      "Explain how JSON and HTTP carry data between a client and a server",
      "Consume a REST API, including authentication and error handling",
      "Query, modify, aggregate, and join relational data with SQL",
    ],
    prerequisiteCourseSlugs: ["javascript-fundamentals"],
    // No natural "next course" in the current catalog builds directly on
    // Git/APIs/SQL specifically -- API Testing and Automation uses REST/HTTP
    // concepts but doesn't require Git or SQL, so it isn't listed as a
    // continuation here. See docs/CURRICULUM.md's coverage matrix.
    nextCourseSlugs: [],
    relatedTechnologySlugs: ["git", "rest-apis", "sql"],
    modules: [
      {
        id: "git-module",
        title: "Version control with Git",
        summary: "History, branching, and team workflow.",
        lessonSlugs: ["git-basics", "git-branching-merging"],
      },
      {
        id: "api-module",
        title: "HTTP and REST APIs",
        summary: "The data format and protocol behind every integration.",
        lessonSlugs: ["json-http-basics", "api-rest-basics"],
      },
      {
        id: "sql-module",
        title: "Relational data with SQL",
        summary: "Reading, changing, and combining data across tables.",
        lessonSlugs: [
          "sql-tables-relationships",
          "sql-select-filtering",
          "sql-insert-update-delete",
          "sql-grouping-joins",
        ],
      },
    ],
  },
  {
    id: "ai-foundations",
    trackSlug: "ai-llm-rag",
    slug: "ai-foundations",
    title: "AI, LLMs & RAG",
    description:
      "From neural network intuition to production retrieval-augmented generation and agents.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 8,
    audience:
      "Developers who can program and want to build grounded, cited AI applications rather than only calling a chat API.",
    learningOutcomes: [
      "Distinguish AI, machine learning, deep learning, and generative AI precisely",
      "Explain how tokens, context windows, and embeddings shape what a model can do",
      "Build a retrieval-augmented generation pipeline with chunking, search, and citations",
      "Evaluate answer quality and defend against prompt injection and data leakage",
    ],
    prerequisiteCourseSlugs: ["python-fundamentals"],
    nextCourseSlugs: [],
    relatedTechnologySlugs: [
      "artificial-intelligence",
      "machine-learning",
      "deep-learning",
      "generative-ai",
      "large-language-models",
      "prompt-engineering",
      "embeddings",
      "retrieval-augmented-generation",
      "ai-agents",
    ],
    modules: [
      {
        id: "ai-concepts",
        title: "What these systems actually are",
        summary: "Separating the vocabulary, then building intuition for how models work.",
        lessonSlugs: [
          "ai-what-is-ai",
          "ai-neural-networks-intuition",
          "ai-transformers-tokens",
          "ai-prompt-design",
        ],
      },
      {
        id: "ai-retrieval",
        title: "Retrieval",
        summary: "Turning documents into something a model can search.",
        lessonSlugs: ["ai-embeddings", "ai-chunking-ingestion", "ai-semantic-search"],
      },
      {
        id: "ai-rag",
        title: "Retrieval-augmented generation",
        summary: "Grounding answers in real sources, and proving they are grounded.",
        lessonSlugs: ["ai-rag-pipeline", "ai-reranking-citations", "ai-hallucination-evaluation"],
      },
      {
        id: "ai-production",
        title: "Agents and production concerns",
        summary: "Letting a model act, safely, at acceptable cost.",
        lessonSlugs: [
          "ai-safety-injection",
          "ai-tool-calling",
          "ai-agents-workflows",
          "ai-production-safeguards",
        ],
      },
    ],
  },
  {
    id: "software-testing-foundations",
    trackSlug: "software-testing",
    slug: "software-testing-foundations",
    title: "Software Testing Foundations",
    description:
      "Think like a tester: structured test design techniques, risk-based planning, and defect reports engineers actually trust.",
    order: 0,
    difficulty: "beginner",
    estimatedHours: 5,
    audience:
      "Anyone starting in QA or software testing, and developers who want to design better test cases for their own code. No programming experience required, though the exercises use small JavaScript snippets to check your testing decisions.",
    learningOutcomes: [
      "Distinguish software quality from software testing, and testing's real limits",
      "Turn an ambiguous requirement into a precise, testable statement",
      "Apply equivalence partitioning, boundary-value analysis, decision tables, and state transition testing to design a small, defensible set of test cases",
      "Prioritize testing effort using risk (likelihood × impact) under real time constraints",
      "Write a defect report a developer can act on without asking follow-up questions",
      "Build a traceability matrix and choose what to automate versus test manually",
    ],
    prerequisiteCourseSlugs: [],
    nextCourseSlugs: ["api-testing-and-automation"],
    relatedTechnologySlugs: ["software-testing-fundamentals"],
    modules: [
      {
        id: "st-foundations-module",
        title: "Foundations of quality",
        summary: "What quality actually means, and why untestable requirements are a hidden cost.",
        lessonSlugs: ["st-quality-vs-testing", "st-requirements-analysis"],
      },
      {
        id: "st-levels-types-module",
        title: "Test levels and types",
        summary: "The vocabulary every real test plan uses: scope (levels) and question (types).",
        lessonSlugs: ["st-test-levels", "st-test-types"],
      },
      {
        id: "st-design-module",
        title: "Test design techniques",
        summary: "Four systematic techniques for choosing a small, defensible set of test cases.",
        lessonSlugs: [
          "st-test-design-overview",
          "st-equivalence-partitioning",
          "st-boundary-value-analysis",
          "st-decision-tables",
          "st-state-transition-testing",
        ],
      },
      {
        id: "st-exploration-risk-module",
        title: "Exploration and risk",
        summary: "Finding what a plan couldn't anticipate, and prioritizing finite testing time.",
        lessonSlugs: ["st-exploratory-testing", "st-risk-based-testing"],
      },
      {
        id: "st-reporting-module",
        title: "Reporting and process",
        summary: "Communicating defects clearly, and keeping coverage and regression sustainable.",
        lessonSlugs: ["st-defect-reporting", "st-traceability-regression"],
      },
      {
        id: "st-practice-module",
        title: "Testing in practice",
        summary: "How testing fits an agile team, and quality checks every tester can perform.",
        lessonSlugs: ["st-agile-a11y-security"],
      },
    ],
  },
  {
    id: "api-testing-and-automation",
    trackSlug: "software-testing",
    slug: "api-testing-and-automation",
    title: "API Testing and Automation",
    description:
      "Test REST APIs like a professional: HTTP fundamentals, schema and boundary validation, chained workflows, security basics, and a maintainable automation structure.",
    order: 1,
    difficulty: "intermediate",
    estimatedHours: 5,
    audience:
      "Testers who've completed Software Testing Foundations (or already know its core techniques) and want to apply them specifically to REST APIs, plus developers who want to test their own APIs more rigorously.",
    learningOutcomes: [
      "Explain HTTP status codes, REST conventions, and the difference between authentication and authorization",
      "Validate a JSON response's schema and design both positive and negative test cases",
      "Apply boundary-value analysis to API-specific shapes: field limits, empty collections, and pagination",
      "Test chained, multi-step workflows and validate error responses rigorously",
      "Check for baseline API security issues like broken object-level authorization and unsafe input handling",
      "Structure an isolated, maintainable test automation suite with useful CI reporting",
    ],
    prerequisiteCourseSlugs: ["software-testing-foundations"],
    nextCourseSlugs: [],
    relatedTechnologySlugs: ["api-testing", "postman", "rest-apis"],
    modules: [
      {
        id: "at-http-rest-module",
        title: "HTTP and REST foundations",
        summary: "The shape of every request and response, and the conventions real APIs follow.",
        lessonSlugs: ["at-http-fundamentals", "at-rest-conventions"],
      },
      {
        id: "at-auth-validation-module",
        title: "Requests, auth, and validation",
        summary: "Headers, authentication vs. authorization, and checking a response's full shape.",
        lessonSlugs: ["at-headers-auth", "at-json-schema-validation"],
      },
      {
        id: "at-designing-cases-module",
        title: "Designing test cases",
        summary:
          "Positive and negative testing, API-specific boundaries, and contract compatibility.",
        lessonSlugs: [
          "at-positive-negative-testing",
          "at-boundary-cases-apis",
          "at-contract-testing",
        ],
      },
      {
        id: "at-advanced-patterns-module",
        title: "Advanced testing patterns",
        summary:
          "Scaling test cases, testing multi-step workflows, and validating errors rigorously.",
        lessonSlugs: ["at-data-driven-testing", "at-chained-requests", "at-error-validation"],
      },
      {
        id: "at-reliability-security-module",
        title: "Reliability and security",
        summary: "Safe retries, rate limiting, and the security checks every tester can perform.",
        lessonSlugs: ["at-idempotency-rate-limits", "at-security-basics"],
      },
      {
        id: "at-automation-practice-module",
        title: "Automation in practice",
        summary: "Structuring a maintainable suite and making CI failures actually actionable.",
        lessonSlugs: ["at-automation-structure", "at-ci-reporting"],
      },
    ],
  },
  {
    id: "react-application-development",
    trackSlug: "react",
    slug: "react-application-development",
    title: "React Application Development",
    description:
      "Build real, componentized user interfaces with React: state, effects, data fetching, custom hooks, accessibility, and a maintainable project structure.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 8,
    audience:
      "Developers comfortable with JavaScript (and ideally TypeScript) who want to build real, interactive user interfaces rather than static pages, and understand what React is actually doing underneath its syntax.",
    learningOutcomes: [
      "Decompose a UI into well-scoped, reusable components and explain what JSX compiles to",
      "Manage interactive state correctly, including the functional-update form and stable list keys",
      "Build controlled, validated forms and handle loading/error/empty/success states explicitly",
      "Synchronize with external systems using effects, including cleanup and race-condition guards for data fetching",
      "Extract reusable logic into custom hooks and make deliberate state-ownership and Context decisions",
      "Apply accessibility, testing, memoization, and error-boundary practices to ship a maintainable component",
    ],
    prerequisiteCourseSlugs: ["typescript-foundations"],
    nextCourseSlugs: ["nodejs-express-backend-development"],
    relatedTechnologySlugs: ["react"],
    modules: [
      {
        id: "react-foundations-module",
        title: "React foundations",
        summary:
          "Component thinking, what JSX actually compiles to, and one-way data flow through props.",
        lessonSlugs: ["react-component-thinking", "react-jsx-rendering", "react-props"],
      },
      {
        id: "react-interaction-state-module",
        title: "Interaction and state",
        summary: "Giving components memory, responding to events, and rendering lists safely.",
        lessonSlugs: ["react-events", "react-state", "react-conditional-lists"],
      },
      {
        id: "react-forms-states-module",
        title: "Forms and UI states",
        summary:
          "Controlled, validated forms, and the four states real data-driven UI must handle.",
        lessonSlugs: ["react-forms-validation", "react-ui-states"],
      },
      {
        id: "react-effects-data-module",
        title: "Effects and data loading",
        summary: "Synchronizing with the outside world, and fetching data without race conditions.",
        lessonSlugs: ["react-effects-lifecycle", "react-data-fetching"],
      },
      {
        id: "react-reuse-module",
        title: "Reuse and maintainability",
        summary:
          "Composition versus custom hooks, and deciding where state and Context genuinely belong.",
        lessonSlugs: ["react-composition-hooks", "react-context-organization"],
      },
      {
        id: "react-production-module",
        title: "Production fundamentals",
        summary:
          "Accessibility, testing, memoization, error boundaries, and refactoring for maintainability.",
        lessonSlugs: ["react-accessibility-testing", "react-performance-error-architecture"],
      },
    ],
  },
  {
    id: "nodejs-express-backend-development",
    trackSlug: "node-express",
    slug: "nodejs-express-backend-development",
    title: "Node.js and Express Backend Development",
    description:
      "Build and operate a real backend REST API: the Node runtime model, Express routing and middleware, validation, structured error handling, security fundamentals, and automated testing.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 8,
    audience:
      "Developers comfortable with JavaScript (and ideally React) who want to build and operate a real backend API, not just consume one, and understand what actually happens between a request arriving and a response leaving.",
    learningOutcomes: [
      "Explain Node's event-loop model and convert between callback, Promise, and async/await styles safely",
      "Structure a real Express application with modular routing and a correct middleware pipeline",
      "Validate untrusted input and implement centralized, structured error handling",
      "Design REST resources and status codes, and manage configuration and logging safely",
      "Implement correct authorization boundaries without building an unsafe auth system from scratch",
      "Separate business logic into testable services and add a real automated test suite",
    ],
    prerequisiteCourseSlugs: ["react-application-development"],
    nextCourseSlugs: [],
    relatedTechnologySlugs: ["nodejs", "express"],
    modules: [
      {
        id: "node-runtime-module",
        title: "Node.js runtime foundations",
        summary:
          "The event loop, module systems, and the three faces of asynchronous JavaScript in Node.",
        lessonSlugs: ["node-runtime-model", "node-modules-npm", "node-async-programming"],
      },
      {
        id: "express-app-module",
        title: "Building an Express app",
        summary: "Route matching, the middleware pipeline, and the three sources of request data.",
        lessonSlugs: ["express-app-structure", "express-middleware", "express-request-data"],
      },
      {
        id: "api-design-module",
        title: "Designing a real API",
        summary:
          "Validating untrusted input and designing REST resources and status codes deliberately.",
        lessonSlugs: ["express-input-validation", "rest-resource-design"],
      },
      {
        id: "errors-config-module",
        title: "Errors, logging, and configuration",
        summary:
          "Structured errors, safe logging, and failing fast on broken configuration at startup.",
        lessonSlugs: [
          "express-error-handling",
          "node-config-logging",
          "node-config-validation-startup",
        ],
      },
      {
        id: "security-testing-module",
        title: "Security and testing",
        summary: "Correct authorization boundaries and a real, isolated automated test suite.",
        lessonSlugs: ["express-security-auth-boundaries", "express-automated-testing"],
      },
      {
        id: "operational-readiness-module",
        title: "Operational readiness",
        summary:
          "Graceful shutdown and health checks — what it takes to run a service, not just write one.",
        lessonSlugs: ["node-operational-readiness"],
      },
    ],
  },
];
