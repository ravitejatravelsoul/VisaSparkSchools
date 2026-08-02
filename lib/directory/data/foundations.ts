import type { TechnologyInput } from "@/lib/directory/types";

export const foundationsTechnologies: TechnologyInput[] = [
  {
    id: "intro-to-programming",
    slug: "introduction-to-programming",
    name: "Introduction to Programming",
    category: "foundations",
    description: "The ideas behind every programming language, before picking one.",
    overview:
      "Introduction to Programming is the mental model underneath every language: what a variable, a function, and a loop actually are, and how a computer executes instructions one step at a time. Learning this first makes any specific language easier, because you're translating a concept you already understand rather than learning to think from scratch.",
    whatItIs:
      "A set of universal concepts -- variables, control flow, functions, data -- that show up in nearly identical form in every programming language.",
    whyItsUsed:
      "Because jumping straight into a language's syntax without this model means memorizing patterns instead of understanding why they work.",
    whereItFits:
      "Before any specific language course -- these concepts aren't taught as their own standalone course here (they're concrete in the JavaScript Fundamentals and Python Fundamentals courses instead), but understanding them first makes either easier.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["intro-to-html-css", "javascript", "python"],
    coreConcepts: [
      "Variables and values",
      "Control flow (conditionals, loops)",
      "Functions and reuse",
      "Data structures (lists, key-value pairs)",
      "Reading error messages",
    ],
    example: {
      language: "javascript",
      code: `let count = 0;\nwhile (count < 3) {\n  console.log("Step " + count);\n  count = count + 1;\n}`,
      explanation:
        "A variable (count) tracks state, a loop repeats while a condition holds, and each pass changes the variable so the loop eventually ends -- the same shape exists in every language, just with different syntax.",
    },
    useCases: [
      "Deciding which language to learn first",
      "Understanding error messages in any language",
      "Recognizing the same pattern (a loop, a conditional) across different codebases",
    ],
    practiceOptions: [
      "Take the How Computing & the Web Work course for the surrounding environment (files, terminals, HTTP) this builds on",
      "Try the Playground",
    ],
    projectIdeas: [
      "Trace through a short program on paper before running it, predicting the output",
      "Rewrite the same small program (e.g. a number-guessing loop) and identify which parts are 'the same idea' across two different languages",
    ],
    references: [
      {
        label: "MDN: Programming basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics",
      },
    ],
    searchKeywords: ["beginner", "learn to code", "programming basics", "intro"],
    status: "conceptual",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "intro-to-html-css",
    slug: "introduction-to-html-and-css",
    name: "Introduction to HTML and CSS",
    category: "foundations",
    description: "The two languages every web page is built from.",
    overview:
      "HTML describes what's on a page (structure and content); CSS describes how it looks (presentation). This entry is the on-ramp before the dedicated HTML and CSS guides/course -- what the split between the two languages actually means and why it matters.",
    whatItIs:
      "A short orientation to the two foundational web languages and how they divide responsibility: structure versus presentation.",
    whyItsUsed:
      "Every browser-rendered page, no matter what framework built it, ultimately compiles down to HTML and CSS.",
    whereItFits:
      "Right after general programming basics, before the full HTML & CSS Fundamentals course.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["html", "css", "intro-to-programming"],
    coreConcepts: [
      "Elements and tags",
      "The document tree (parents, children, siblings)",
      "Separating structure from presentation",
      "The browser as a renderer, not just a viewer",
    ],
    example: {
      language: "html",
      code: `<!doctype html>\n<html>\n  <body>\n    <h1>Hello</h1>\n    <p style="color: teal;">A paragraph.</p>\n  </body>\n</html>`,
      explanation:
        "The <h1> and <p> tags describe structure and meaning (this is a heading, this is a paragraph); the style attribute is CSS, describing appearance -- the same paragraph could be restyled without touching its meaning.",
    },
    useCases: [
      "Building any web page, regardless of framework",
      "Reading and modifying an existing site's markup",
      "Understanding what a framework like React ultimately renders to",
    ],
    practiceOptions: ["Take the HTML & CSS Fundamentals course", "Try the HTML/CSS/JS playground"],
    projectIdeas: [
      "Build a single page with a heading, a paragraph, and one styled element, with no CSS framework",
    ],
    references: [
      {
        label: "MDN: HTML basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML",
      },
      {
        label: "MDN: CSS basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps",
      },
    ],
    searchKeywords: ["html basics", "css basics", "web development intro"],
    status: "conceptual",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "html-css-fundamentals",
    runnerSupport: "html",
    projectIds: ["personal-portfolio-page"],
    publicVisibility: true,
  },
  {
    id: "how-to-guides",
    slug: "how-to-guides",
    name: "How-To Guides",
    category: "foundations",
    description: "Short, task-focused answers to a single specific question.",
    overview:
      "Not every question needs a full course. A how-to guide answers one narrow, practical question -- 'how do I center a div,' 'how do I read a file in Python' -- as directly as possible, with a working example and nothing else. VisaSparkSchools' technology guides (this directory) are written in that spirit: task-oriented, not exhaustive.",
    whatItIs:
      "A content format: a short, focused answer to one specific practical question, as distinct from a full lesson or course.",
    whyItsUsed:
      "Because most real-world coding questions are narrow ('how do I...'), and a 20-minute course chapter is the wrong shape for a 30-second answer.",
    whereItFits:
      "Alongside full courses and technology guides -- use search to find a specific how-to answer inside any lesson's explanation or a technology guide's core concepts and example.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["intro-to-programming"],
    coreConcepts: [
      "One question, one answer",
      "A minimal working example over a complete explanation",
      "Task-oriented search (search for what you want to do, not the concept's formal name)",
    ],
    example: {
      language: "javascript",
      code: `// "How do I check if an array includes a value?"\nconst fruits = ["apple", "pear"];\nconsole.log(fruits.includes("pear")); // true`,
      explanation:
        "A how-to answer is exactly this size: the question, the minimal code that answers it, and nothing extra.",
    },
    useCases: [
      "Quickly resolving one specific coding question",
      "Getting unstuck mid-exercise without reading an entire unrelated lesson",
    ],
    practiceOptions: ["Use Search to find task-specific answers across every lesson and guide"],
    projectIdeas: [
      "Keep a personal running list of 'how do I...' questions you resolve, as a study reference",
    ],
    references: [
      {
        label: "MDN Web Docs (task-oriented reference)",
        url: "https://developer.mozilla.org/en-US/docs/Web",
      },
    ],
    searchKeywords: ["how to", "quick answer", "reference", "snippet"],
    status: "conceptual",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
