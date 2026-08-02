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
    nextCourseSlugs: [],
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
    // Software Testing Foundations is a documented Phase 5B plan
    // (docs/CURRICULUM.md), not yet built -- no forward reference to an
    // unavailable course. See docs/CURRICULUM.md's coverage matrix for the
    // intended sequencing once it exists.
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
];
