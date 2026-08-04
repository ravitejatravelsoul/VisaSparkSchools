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
    // Database Design and PostgreSQL (Phase 5B) builds directly on this
    // course's SQL module and is its natural continuation. API Testing and
    // Automation uses REST/HTTP concepts but doesn't require Git or SQL, so
    // it isn't listed here. See docs/CURRICULUM.md's coverage matrix.
    nextCourseSlugs: ["database-design-and-postgresql"],
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
    nextCourseSlugs: ["api-testing-and-automation", "playwright-web-automation"],
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
    // Java Programming Foundations (Phase 5B) continues the "Programming and
    // Backend" direction as a recommended next step -- it does not require
    // Node/Express knowledge itself (its own prerequisite is JavaScript
    // Fundamentals), so this is a suggested continuation, not a strict gate.
    nextCourseSlugs: ["java-programming-foundations"],
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
  {
    id: "java-programming-foundations",
    trackSlug: "java",
    slug: "java-programming-foundations",
    title: "Java Programming Foundations",
    description:
      "The JVM execution model, core language syntax, object-oriented design, exceptions, generics, modern streams, and real automated testing with JUnit.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 8,
    audience:
      "Developers who already know one programming language's fundamentals (variables, functions, conditionals, loops, basic collections) and want a statically-typed, object-oriented language behind much of the enterprise and Android world.",
    learningOutcomes: [
      "Explain the JDK/JVM/bytecode model and compile and run a real multi-class Java program",
      "Use Java's primitive and reference types, control flow, and methods correctly, including overload resolution",
      "Design a small domain using encapsulation, composition, interfaces, and polymorphism",
      "Handle failure with checked and unchecked exceptions, and implement equals/hashCode correctly",
      "Use lambdas and the Stream API to express filter/map/reduce pipelines",
      "Add JUnit tests and use try-with-resources for guaranteed resource cleanup",
    ],
    prerequisiteCourseSlugs: ["javascript-fundamentals"],
    nextCourseSlugs: ["data-structures-and-algorithms", "selenium-webdriver-automation"],
    relatedTechnologySlugs: ["java"],
    modules: [
      {
        id: "java-execution-fundamentals-module",
        title: "Java execution and language fundamentals",
        summary:
          "The JDK/JVM/bytecode mental model, program structure, types, operators, and strings.",
        lessonSlugs: [
          "java-jvm-and-execution",
          "java-variables-and-types",
          "java-operators-and-strings",
        ],
      },
      {
        id: "java-control-and-methods-module",
        title: "Decisions, repetition, and methods",
        summary: "Conditions and loops, then method design, parameters, returns, and overloading.",
        lessonSlugs: ["java-control-flow", "java-methods-and-overloading"],
      },
      {
        id: "java-data-and-collections-module",
        title: "Data and collections",
        summary: "Fixed-size arrays, then List, Set, and Map — and when to reach for each.",
        lessonSlugs: ["java-arrays", "java-collections"],
      },
      {
        id: "java-oop-module",
        title: "Object-oriented design",
        summary:
          "Classes, constructors, encapsulation, inheritance vs. composition, interfaces, and polymorphism.",
        lessonSlugs: [
          "java-classes-and-objects",
          "java-inheritance-and-composition",
          "java-interfaces-and-polymorphism",
        ],
      },
      {
        id: "java-reliability-module",
        title: "Reliable Java programs",
        summary:
          "Checked and unchecked exceptions, generics, and the equals/hashCode/immutability contract.",
        lessonSlugs: ["java-exceptions", "java-generics-equality-immutability"],
      },
      {
        id: "java-modern-and-testing-module",
        title: "Modern Java and testing",
        summary:
          "Lambdas and Streams, then try-with-resources, JUnit, debugging, and project structure.",
        lessonSlugs: ["java-lambdas-and-streams", "java-resource-safety-and-testing"],
      },
    ],
  },
  {
    id: "data-structures-and-algorithms",
    trackSlug: "algorithms",
    slug: "data-structures-and-algorithms",
    title: "Data Structures and Algorithms",
    description:
      "How to reason about correctness and complexity, the core data structures every efficient program relies on, and the algorithmic strategies (search, sort, recursion, graphs, dynamic programming) built from them.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 9,
    audience:
      "Developers comfortable with variables, functions, conditionals, loops, and basic collections in JavaScript or TypeScript who want to reason rigorously about performance and choose the right structure deliberately, not by habit.",
    learningOutcomes: [
      "Analyze an algorithm's time and space complexity using Big O, and distinguish best/average/worst case",
      "Implement and choose between arrays, linked lists, stacks, queues, hash tables, trees, and heaps based on actual access patterns",
      "Implement binary search, insertion sort, and merge sort, and justify which sort fits given constraints",
      "Implement BFS and DFS over a graph, including cycle detection with a visited set",
      "Implement a memoized recursive solution, and explain when backtracking, greedy, or dynamic programming actually applies",
    ],
    prerequisiteCourseSlugs: ["javascript-fundamentals"],
    nextCourseSlugs: [],
    relatedTechnologySlugs: ["data-structures-and-algorithms"],
    modules: [
      {
        id: "dsa-analysis-module",
        title: "Algorithm analysis and problem solving",
        summary: "Decomposition, correctness, testing, and the language of time/space complexity.",
        lessonSlugs: ["dsa-problem-solving-and-correctness", "dsa-complexity-and-big-o"],
      },
      {
        id: "dsa-sequential-module",
        title: "Sequential structures",
        summary: "Arrays, dynamic arrays, strings, and linked lists — and their real tradeoffs.",
        lessonSlugs: ["dsa-arrays-and-dynamic-arrays", "dsa-linked-lists"],
      },
      {
        id: "dsa-access-module",
        title: "Access and lookup structures",
        summary: "Stacks, queues, deques, and hash-table-backed Sets and Maps.",
        lessonSlugs: ["dsa-stacks-queues-deques", "dsa-hash-tables-sets-maps"],
      },
      {
        id: "dsa-hierarchical-module",
        title: "Hierarchical structures",
        summary: "Binary trees and traversals, binary search trees, heaps, and priority queues.",
        lessonSlugs: [
          "dsa-binary-trees-and-traversals",
          "dsa-binary-search-trees",
          "dsa-heaps-and-priority-queues",
        ],
      },
      {
        id: "dsa-search-order-module",
        title: "Recursion, search, and ordering",
        summary: "Divide-and-conquer, linear and binary search, insertion sort, and merge sort.",
        lessonSlugs: ["dsa-recursion-and-divide-and-conquer", "dsa-searching", "dsa-sorting"],
      },
      {
        id: "dsa-graphs-strategies-module",
        title: "Graphs and algorithmic strategies",
        summary:
          "Graph representations, BFS/DFS, backtracking, greedy reasoning, and dynamic programming.",
        lessonSlugs: ["dsa-graphs-and-traversal", "dsa-backtracking-greedy-dynamic-programming"],
      },
    ],
  },
  {
    id: "database-design-and-postgresql",
    trackSlug: "databases",
    slug: "database-design-and-postgresql",
    title: "Database Design and PostgreSQL",
    description:
      "Beyond basic SELECT: relational modeling, normalization, real PostgreSQL data types and schema implementation, advanced querying, transactions and concurrency, indexing, and operational safety.",
    order: 0,
    difficulty: "advanced",
    estimatedHours: 9,
    audience:
      "Developers who already know basic SQL (SELECT, JOIN, INSERT/UPDATE/DELETE, GROUP BY) and want to design real schemas, understand PostgreSQL-specific behavior, and operate a production database safely.",
    learningOutcomes: [
      "Model a domain into entities, relationships, cardinality, and optionality before writing any SQL",
      "Normalize a schema to Third Normal Form, and justify a deliberate denormalization tradeoff",
      "Implement a normalized PostgreSQL schema with correct types, constraints, and dependency-ordered DDL",
      "Write joins, subqueries, CTEs, and window functions, and explain PostgreSQL's transaction and isolation guarantees",
      "Add useful indexes, read EXPLAIN output, and design least-privileged roles",
      "Write ordered, safe schema migrations and describe a real backup/recovery plan",
    ],
    prerequisiteCourseSlugs: ["git-apis-sql"],
    nextCourseSlugs: [],
    relatedTechnologySlugs: ["postgresql"],
    modules: [
      {
        id: "pg-relational-modeling-module",
        title: "Relational modeling",
        summary: "Entities, attributes, relationships, keys, and constraints.",
        lessonSlugs: ["pg-relational-modeling", "pg-keys-and-constraints"],
      },
      {
        id: "pg-normalization-module",
        title: "Normalized schema design",
        summary:
          "Functional dependencies, First through Third Normal Form, and denormalization tradeoffs.",
        lessonSlugs: ["pg-normalization-1nf-2nf", "pg-normalization-3nf-and-denormalization"],
      },
      {
        id: "pg-implementation-module",
        title: "PostgreSQL schema implementation",
        summary:
          "Real PostgreSQL data types, DDL, and dependency-ordered table creation and seed data.",
        lessonSlugs: ["pg-data-types-and-tables", "pg-schema-implementation"],
      },
      {
        id: "pg-advanced-querying-module",
        title: "Advanced querying",
        summary: "Multi-table joins and aggregation, subqueries and CTEs, and window functions.",
        lessonSlugs: ["pg-joins-and-aggregation", "pg-subqueries-and-ctes", "pg-window-functions"],
      },
      {
        id: "pg-transactions-performance-module",
        title: "Transactions and performance",
        summary:
          "ACID guarantees, concurrent-update anomalies and isolation levels, and indexes and query plans.",
        lessonSlugs: [
          "pg-transactions-and-acid",
          "pg-concurrency-and-isolation",
          "pg-indexes-and-query-plans",
        ],
      },
      {
        id: "pg-security-evolution-module",
        title: "Security and evolution",
        summary: "Views, roles and least privilege, and safe, ordered schema migrations.",
        lessonSlugs: ["pg-views-and-roles", "pg-migrations-and-operations"],
      },
    ],
  },
  {
    id: "playwright-web-automation",
    trackSlug: "playwright",
    slug: "playwright-web-automation",
    title: "Playwright Web Automation",
    description:
      "Automate real browsers with Playwright's modern, reliable API: locators, auto-waiting, fixtures, network mocking, authentication state, parallel execution, and CI-ready diagnostics.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 9,
    audience:
      "Developers or testers comfortable with JavaScript/TypeScript fundamentals and the vocabulary of Software Testing Foundations who want to automate real, cross-browser end-to-end tests. Familiarity with REST APIs (as covered in API Testing and Automation) helps with the network-related lessons but isn't required.",
    learningOutcomes: [
      "Explain Playwright's Browser/Context/Page model and set up a real, local multi-browser project",
      "Write reliable tests using role-based locators, web-first assertions, and Playwright's auto-waiting, without fixed sleeps",
      "Handle navigation, forms, frames, popups, dialogs, and file uploads/downloads",
      "Observe and mock network requests, and use APIRequestContext and stored authentication state",
      "Compose fixtures, design page objects and test data, and configure parallel execution with sensible retries and timeouts",
      "Diagnose a failing test using the trace viewer, screenshots, and CI-produced reports",
    ],
    prerequisiteCourseSlugs: ["software-testing-foundations"],
    nextCourseSlugs: ["test-automation-framework-engineering"],
    relatedTechnologySlugs: ["playwright"],
    modules: [
      {
        id: "pw-architecture-locators-module",
        title: "Architecture and locators",
        summary: "The Browser/Context/Page model, real local setup, and finding elements reliably.",
        lessonSlugs: ["pw-architecture-and-setup", "pw-locators"],
      },
      {
        id: "pw-waiting-navigation-module",
        title: "Waiting, assertions, and navigation",
        summary: "Auto-waiting and web-first assertions, then navigation and form interaction.",
        lessonSlugs: ["pw-waiting-and-assertions", "pw-navigation-and-forms"],
      },
      {
        id: "pw-multipage-network-module",
        title: "Multi-page flows and network control",
        summary:
          "Frames, popups, and dialogs, then observing/mocking network calls and APIRequestContext.",
        lessonSlugs: [
          "pw-frames-popups-dialogs",
          "pw-network-observation-mocking",
          "pw-api-request-context",
        ],
      },
      {
        id: "pw-auth-structure-module",
        title: "Authentication, fixtures, and structure",
        summary:
          "Reusable authentication state, custom fixtures and hooks, page objects and test data.",
        lessonSlugs: [
          "pw-auth-state-projects",
          "pw-fixtures-and-hooks",
          "pw-page-objects-test-data",
        ],
      },
      {
        id: "pw-execution-diagnostics-module",
        title: "Execution and diagnostics",
        summary: "Parallelism, retries, and timeouts, then the trace viewer and CI reporting.",
        lessonSlugs: ["pw-parallelism-retries-timeouts", "pw-trace-debugging", "pw-reporting-ci"],
      },
      {
        id: "pw-reliability-module",
        title: "Reliability and architecture",
        summary:
          "Diagnosing flaky tests, accessibility-aware testing, and secure, maintainable suite design.",
        lessonSlugs: ["pw-flaky-tests-a11y-security-architecture"],
      },
    ],
  },
  {
    id: "selenium-webdriver-automation",
    trackSlug: "selenium",
    slug: "selenium-webdriver-automation",
    title: "Selenium WebDriver Automation",
    description:
      "The long-established browser automation standard, in Java: the W3C WebDriver protocol, robust element location and synchronization, page objects, JUnit integration, Grid concepts, and CI execution.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 9,
    audience:
      "Developers who've completed Java Programming Foundations (or have equivalent Java comfort) and want to automate browser-based tests using Selenium WebDriver, the tool most common in existing, especially enterprise, Java test suites.",
    learningOutcomes: [
      "Explain the W3C WebDriver protocol and set up a real, local Java + Selenium + JUnit project",
      "Choose stable, accessible element-location strategies and use explicit/fluent waits instead of unreliable fixed sleeps",
      "Automate forms, dropdowns, alerts, frames, windows, and file uploads with the Actions API",
      "Structure a suite with page objects, component objects, and JUnit parameterized tests",
      "Configure parallel execution and understand Grid/remote WebDriver concepts",
      "Diagnose common failures (stale elements, intercepted clicks, timing issues) and integrate a suite into CI reporting",
    ],
    prerequisiteCourseSlugs: ["java-programming-foundations"],
    nextCourseSlugs: ["test-automation-framework-engineering"],
    relatedTechnologySlugs: ["selenium"],
    modules: [
      {
        id: "sel-webdriver-fundamentals-module",
        title: "WebDriver fundamentals",
        summary:
          "The W3C WebDriver protocol, real local setup, and the driver lifecycle and navigation.",
        lessonSlugs: ["sel-webdriver-architecture", "sel-driver-lifecycle-navigation"],
      },
      {
        id: "sel-locating-synchronizing-module",
        title: "Locating elements and synchronizing",
        summary:
          "Stable, accessible location strategies, then implicit, explicit, and fluent waits.",
        lessonSlugs: ["sel-element-location", "sel-synchronization-waits"],
      },
      {
        id: "sel-interacting-ui-module",
        title: "Interacting with complex UI",
        summary:
          "Forms, dropdowns, and alerts; frames, windows, and the Actions API; uploads, cookies, and screenshots.",
        lessonSlugs: [
          "sel-forms-dropdowns-alerts",
          "sel-frames-windows-actions",
          "sel-uploads-cookies-screenshots",
        ],
      },
      {
        id: "sel-structuring-suites-module",
        title: "Structuring test suites",
        summary:
          "Page objects and component objects, then JUnit integration and parameterized tests.",
        lessonSlugs: ["sel-page-objects", "sel-junit-integration"],
      },
      {
        id: "sel-execution-scale-module",
        title: "Execution at scale",
        summary:
          "Parallel execution and Grid/remote WebDriver, failure diagnosis, and CI reporting.",
        lessonSlugs: ["sel-parallel-grid-remote", "sel-failure-diagnosis", "sel-reporting-ci"],
      },
      {
        id: "sel-maintainability-security-module",
        title: "Maintainability and security",
        summary:
          "Designing a maintainable suite as it grows, and handling secrets and credentials safely.",
        lessonSlugs: ["sel-maintainable-design", "sel-security-secrets"],
      },
    ],
  },
  {
    id: "linux-shell-fundamentals",
    trackSlug: "linux-shell",
    slug: "linux-shell-fundamentals",
    title: "Linux and Shell Fundamentals",
    description:
      "Linux user-space fundamentals and safe, automation-oriented Bash scripting: the filesystem, pipes and redirection, text processing, processes and permissions, defensive scripting, and CI/cron execution.",
    order: 0,
    difficulty: "intermediate",
    estimatedHours: 8,
    audience:
      "Developers who want real command-line literacy for testing, automation, CI, and backend workflows — Linux user-space fundamentals and safe shell scripting, not a system-administration certification course.",
    learningOutcomes: [
      "Navigate and safely manipulate files using Linux's single, rooted filesystem model",
      "Use globbing, quoting, expansion, pipes, and redirection correctly, and read exit codes",
      "Process text with grep, sed, awk, sort, uniq, cut, and related utilities",
      "Manage environment variables, PATH, processes, signals, and file permissions",
      "Write defensive Bash scripts using set -euo pipefail, safe temp files, cleanup traps, and useful logging",
      "Explain why unattended execution (cron, CI) differs from interactive use, and design scripts with distinct, meaningful exit codes",
    ],
    prerequisiteCourseSlugs: [],
    nextCourseSlugs: [],
    relatedTechnologySlugs: ["bash", "linux"],
    modules: [
      {
        id: "sh-filesystem-basics-module",
        title: "Filesystem and shell basics",
        summary:
          "Navigation and safe file manipulation, then globbing/quoting/expansion and I/O redirection.",
        lessonSlugs: [
          "sh-filesystem-and-navigation",
          "sh-globbing-quoting-expansion",
          "sh-io-streams-redirection",
        ],
      },
      {
        id: "sh-text-processing-module",
        title: "Text processing",
        summary: "grep/sed/awk foundations, then sort/uniq/cut/head/tail/wc and archives.",
        lessonSlugs: ["sh-text-processing-search", "sh-text-processing-utilities"],
      },
      {
        id: "sh-environment-processes-module",
        title: "Environment and processes",
        summary: "Environment variables and PATH, then processes, signals, and permissions.",
        lessonSlugs: ["sh-env-vars-path", "sh-processes-signals-permissions"],
      },
      {
        id: "sh-scripting-module",
        title: "Shell scripting",
        summary:
          "Positional parameters, conditionals, loops, and functions, then defensive scripting.",
        lessonSlugs: ["sh-scripting-basics", "sh-defensive-scripting"],
      },
      {
        id: "sh-robust-scripts-module",
        title: "Robust, portable scripts",
        summary:
          "Temp files, cleanup traps, and logging; ShellCheck and portability; cron/CI execution.",
        lessonSlugs: [
          "sh-temp-files-cleanup-logging",
          "sh-shellcheck-portability",
          "sh-cron-ci-execution",
        ],
      },
      {
        id: "sh-networking-safety-module",
        title: "Networking and safety",
        summary:
          "curl fundamentals, then secrets, command-history, and destructive-command safety.",
        lessonSlugs: ["sh-networking-curl", "sh-secrets-destructive-safety"],
      },
    ],
  },
  {
    id: "test-automation-framework-engineering",
    trackSlug: "test-automation-framework",
    slug: "test-automation-framework-engineering",
    title: "Test Automation Framework Engineering",
    description:
      "An advanced integration course on the architecture behind a maintainable automation suite: layering, configuration, fixtures, test data, page/component/service objects, CI quality gates, and framework health at scale.",
    order: 0,
    difficulty: "advanced",
    estimatedHours: 10,
    audience:
      "Developers or testers who've completed Playwright Web Automation (Selenium WebDriver Automation is valuable parallel background) and want to design the surrounding architecture that turns individual tests into a maintainable, scalable framework, using TypeScript and Playwright as the reference implementation.",
    learningOutcomes: [
      "Explain what distinguishes a genuine test automation framework from a folder of tests, and choose the right assertion layer (unit/API/UI)",
      "Design environment-aware configuration, safe secret handling, and reusable test-data builders",
      "Compose fixtures as dependency injection, and design page, component, and service-client objects at framework scale",
      "Write domain-level assertions, design a tagging scheme, and achieve genuine test isolation for safe parallel execution",
      "Design retry/timeout policy, structured diagnostics and reporting, and CI quality gates with sharding",
      "Apply failure triage, plan an incremental migration, and track framework health beyond a bare pass/fail count",
    ],
    prerequisiteCourseSlugs: ["playwright-web-automation"],
    nextCourseSlugs: [],
    relatedTechnologySlugs: ["playwright"],
    modules: [
      {
        id: "tafe-architecture-module",
        title: "Framework architecture",
        summary:
          "Framework goals and boundaries, the test pyramid, then repo structure and configuration.",
        lessonSlugs: ["tafe-framework-goals-boundaries", "tafe-repo-structure-config"],
      },
      {
        id: "tafe-data-fixtures-module",
        title: "Test data and fixtures",
        summary:
          "The data-builder pattern and test-isolation strategy, then fixtures as dependency injection.",
        lessonSlugs: ["tafe-test-data-builders", "tafe-fixtures-di"],
      },
      {
        id: "tafe-layered-architecture-module",
        title: "Layered test architecture",
        summary:
          "Page and component objects, service clients and DB-validation boundaries, and assertion design.",
        lessonSlugs: [
          "tafe-page-component-models",
          "tafe-service-clients",
          "tafe-assertion-design-dsl",
        ],
      },
      {
        id: "tafe-organization-execution-module",
        title: "Test organization and execution",
        summary:
          "Tagging, selection, and genuine isolation, then retry/timeout policy and flaky-test management.",
        lessonSlugs: ["tafe-tagging-test-selection", "tafe-retry-timeout-flake"],
      },
      {
        id: "tafe-diagnostics-ci-module",
        title: "Diagnostics and CI",
        summary:
          "Structured diagnostics and reporting, CI quality gates and sharding, and failure triage.",
        lessonSlugs: [
          "tafe-diagnostics-reporting",
          "tafe-ci-quality-gates",
          "tafe-failure-triage-ownership",
        ],
      },
      {
        id: "tafe-maturity-module",
        title: "Framework maturity",
        summary:
          "Versioning, extensibility, and anti-patterns, then migration strategy and framework health.",
        lessonSlugs: ["tafe-versioning-extensibility", "tafe-migration-health-docs"],
      },
    ],
  },
  {
    id: "quantitative-aptitude",
    slug: "quantitative-aptitude",
    trackSlug: "placement-prep",
    title: "Quantitative Aptitude",
    description:
      "Numerical reasoning for placement tests: number systems, percentages, interest, time/speed/distance, and data interpretation.",
    order: 0,
    difficulty: "beginner",
    estimatedHours: 5,
    audience:
      "Students and recent graduates preparing for campus placement and entrance aptitude tests.",
    learningOutcomes: [
      "Solve number system, percentage, profit/loss, and interest problems accurately and quickly",
      "Apply ratio, proportion, time/speed/distance, and time/work techniques to multi-step word problems",
      "Read and compute from tabular and chart-style data without common interpretation mistakes",
      "Combine multiple aptitude techniques to solve mixed, realistic placement-test-style problems",
    ],
    prerequisiteCourseSlugs: [],
    nextCourseSlugs: ["logical-analytical-reasoning"],
    relatedTechnologySlugs: ["quantitative-aptitude-guide"],
    modules: [
      {
        id: "qa-number-foundations",
        title: "Number foundations",
        summary: "Number systems and divisibility, LCM/HCF, and percentages.",
        lessonSlugs: ["number-systems-divisibility", "lcm-hcf", "percentages"],
      },
      {
        id: "qa-applied-arithmetic",
        title: "Applied arithmetic",
        summary: "Profit/loss/discount, simple and compound interest, ratio and mixtures.",
        lessonSlugs: [
          "profit-loss-discount",
          "simple-compound-interest",
          "ratio-proportion-mixtures",
        ],
      },
      {
        id: "qa-time-speed-work",
        title: "Time, speed & work",
        summary: "Time/speed/distance, time and work, and averages.",
        lessonSlugs: ["time-speed-distance", "time-and-work", "averages"],
      },
      {
        id: "qa-data-and-mixed-practice",
        title: "Data and mixed practice",
        summary: "Permutations/combinations/probability, data interpretation, and mixed practice.",
        lessonSlugs: [
          "permutations-combinations-probability",
          "data-interpretation",
          "mixed-aptitude-practice",
        ],
      },
    ],
  },
  {
    id: "logical-analytical-reasoning",
    slug: "logical-analytical-reasoning",
    trackSlug: "placement-prep",
    title: "Logical and Analytical Reasoning",
    description:
      "Pattern recognition and structured logical reasoning for placement tests: series, coding-decoding, arrangements, and critical reasoning.",
    order: 0,
    difficulty: "beginner",
    estimatedHours: 5,
    audience:
      "Students and recent graduates preparing for campus placement and entrance reasoning tests.",
    learningOutcomes: [
      "Identify patterns in number, letter, and coded series and continue them correctly",
      "Solve blood relation, direction sense, and syllogism problems using a systematic method rather than intuition",
      "Work through seating arrangement and grouping puzzles by eliminating possibilities from clues",
      "Distinguish stated facts, unstated assumptions, and valid conclusions in an argument",
    ],
    prerequisiteCourseSlugs: [],
    nextCourseSlugs: ["career-and-gd-preparation"],
    relatedTechnologySlugs: ["reasoning-guide"],
    modules: [
      {
        id: "lr-patterns-and-sequences",
        title: "Patterns and sequences",
        summary: "Number/letter series, coding-decoding, and analogies/classification.",
        lessonSlugs: ["number-letter-series", "coding-decoding", "analogies-classification"],
      },
      {
        id: "lr-logical-structures",
        title: "Logical structures",
        summary: "Blood relations, direction sense, and syllogisms.",
        lessonSlugs: ["blood-relations", "direction-sense", "syllogisms"],
      },
      {
        id: "lr-puzzles-and-arrangements",
        title: "Puzzles and arrangements",
        summary: "Seating arrangements, puzzles/grouping, and statements/conclusions.",
        lessonSlugs: ["seating-arrangements", "puzzles-grouping", "statement-conclusions"],
      },
      {
        id: "lr-visual-and-mixed-reasoning",
        title: "Visual and mixed reasoning",
        summary: "Non-verbal reasoning, critical reasoning, and mixed practice.",
        lessonSlugs: ["non-verbal-reasoning", "critical-reasoning", "mixed-reasoning-practice"],
      },
    ],
  },
  {
    id: "career-and-gd-preparation",
    slug: "career-and-gd-preparation",
    trackSlug: "placement-prep",
    title: "Career and Group Discussion Preparation",
    description:
      "Professional communication, group discussion technique, and interview preparation for campus placements.",
    order: 0,
    difficulty: "beginner",
    estimatedHours: 5,
    audience:
      "Students and recent graduates preparing for campus placement group discussions and interviews.",
    learningOutcomes: [
      "Write achievement-oriented resume bullets and a concise personal introduction",
      "Structure and deliver a group discussion contribution, and build on others' points respectfully",
      "Answer behavioral interview questions using the complete STAR structure",
      "Prepare composed, specific responses to common and difficult interview questions",
    ],
    prerequisiteCourseSlugs: [],
    nextCourseSlugs: [],
    relatedTechnologySlugs: ["career-gd-guide"],
    modules: [
      {
        id: "cgd-professional-communication-foundations",
        title: "Professional communication foundations",
        summary: "Professional communication basics, resume fundamentals, and the elevator pitch.",
        lessonSlugs: ["professional-communication-basics", "resume-fundamentals", "elevator-pitch"],
      },
      {
        id: "cgd-group-discussion-skills",
        title: "Group discussion skills",
        summary: "GD fundamentals, structuring arguments, and etiquette/active listening.",
        lessonSlugs: ["gd-fundamentals", "gd-structuring-arguments", "gd-etiquette-listening"],
      },
      {
        id: "cgd-interview-preparation",
        title: "Interview preparation",
        summary: "Interview fundamentals, the STAR method, and common interview questions.",
        lessonSlugs: ["interview-fundamentals", "star-method", "common-interview-questions"],
      },
      {
        id: "cgd-applied-career-readiness",
        title: "Applied career readiness",
        summary: "Handling difficult questions, workplace professionalism, and mock practice.",
        lessonSlugs: [
          "handling-difficult-questions",
          "workplace-professionalism",
          "mock-career-readiness-practice",
        ],
      },
    ],
  },
];
