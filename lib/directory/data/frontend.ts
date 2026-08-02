import type { TechnologyInput } from "@/lib/directory/types";

export const frontendTechnologies: TechnologyInput[] = [
  {
    id: "html",
    slug: "html",
    name: "HTML",
    category: "frontend",
    description: "The markup language that structures every web page.",
    overview:
      "HTML (HyperText Markup Language) describes the structure and meaning of content on the web: headings, paragraphs, links, images, forms. Every browser, screen reader, and search engine reads HTML first -- it's the layer everything else builds on.",
    whatItIs: "A markup language of nested elements (tags) that describe content and structure.",
    whyItsUsed:
      "It's the only structural language browsers natively understand -- there is no alternative.",
    whereItFits:
      "The first layer of any web page, before CSS (appearance) or JavaScript (behavior) are added.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["css", "javascript", "intro-to-html-css"],
    coreConcepts: [
      "Elements and attributes",
      "Semantic tags (nav, main, article, section)",
      "Forms and input types",
      "Accessibility: alt text, labels, headings order",
      "The DOM tree",
    ],
    example: {
      language: "html",
      code: `<article>\n  <h2>Post title</h2>\n  <p>Body text.</p>\n  <a href="/next">Read more</a>\n</article>`,
      explanation:
        "Semantic tags like <article> and <h2> describe meaning, not just appearance -- this matters for accessibility and SEO alike.",
    },
    useCases: ["Every web page", "Email templates", "Server-rendered app output"],
    practiceOptions: ["Take the HTML & CSS Fundamentals course", "Try the HTML/CSS/JS playground"],
    projectIdeas: [
      "A semantic single-page resume",
      "A form with proper labels and validation attributes",
    ],
    references: [{ label: "MDN: HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }],
    searchKeywords: ["markup", "tags", "elements", "web page structure"],
    status: "current",
    versionPolicy: "evergreen",
    versionNotes:
      "HTML is a continuously-updated living standard (WHATWG); there is no versioned release to track.",
    lastReviewed: "2026-08-01",
    courseId: "html-css-fundamentals",
    runnerSupport: "html",
    projectIds: ["personal-portfolio-page"],
    publicVisibility: true,
  },
  {
    id: "css",
    slug: "css",
    name: "CSS",
    category: "frontend",
    description: "The styling language that controls layout, color, and responsiveness.",
    overview:
      "CSS (Cascading Style Sheets) controls how HTML content looks and is laid out: color, spacing, typography, and responsive behavior across screen sizes. Modern CSS (Flexbox, Grid) handles layout that once required JavaScript or table hacks.",
    whatItIs:
      "A rule-based styling language that selects elements and applies visual properties to them.",
    whyItsUsed:
      "It's the only native way to style web content -- and modern CSS is powerful enough to replace most layout JavaScript.",
    whereItFits:
      "Applied to HTML; often loaded via a framework (Bootstrap, Sass) or written directly.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["html"],
    relatedIds: ["html", "sass", "bootstrap", "w3css"],
    coreConcepts: [
      "Selectors and specificity",
      "The box model",
      "Flexbox",
      "Grid",
      "Media queries / responsive design",
    ],
    example: {
      language: "html",
      code: `.card {\n  display: flex;\n  gap: 12px;\n  padding: 16px;\n  border-radius: 8px;\n}`,
      explanation:
        "Flexbox (display: flex) arranges children in a row or column with consistent spacing (gap) -- one of two modern CSS layout systems, alongside Grid.",
    },
    useCases: [
      "Styling any web page",
      "Responsive layouts",
      "Design systems and component libraries",
    ],
    practiceOptions: ["Take the HTML & CSS Fundamentals course", "Try the HTML/CSS/JS playground"],
    projectIdeas: [
      "A responsive card grid using Flexbox or Grid",
      "A dark/light theme toggle using CSS custom properties",
    ],
    references: [{ label: "MDN: CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }],
    searchKeywords: ["styling", "flexbox", "grid", "responsive design"],
    status: "current",
    versionPolicy: "evergreen",
    versionNotes:
      "CSS is a living standard made of many independent modules (Flexbox, Grid, etc.), each versioned separately.",
    lastReviewed: "2026-08-01",
    courseId: "html-css-fundamentals",
    runnerSupport: "html",
    projectIds: ["personal-portfolio-page"],
    publicVisibility: true,
  },
  {
    id: "w3css",
    slug: "w3css",
    name: "W3.CSS",
    category: "frontend",
    subcategory: "css-framework",
    description: "A small, dependency-free CSS framework created by W3Schools.",
    overview:
      "W3.CSS is a lightweight CSS framework created and maintained by W3Schools (not VisaSparkSchools), designed to be smaller and simpler than Bootstrap with no JavaScript dependency. It's a reasonable choice for very small projects that want pre-built responsive classes without a build step.",
    whatItIs:
      "A single stylesheet of pre-built utility and component classes -- grids, cards, buttons, colors.",
    whyItsUsed:
      "For quick, no-build-tooling projects that want responsive defaults without writing custom CSS.",
    whereItFits:
      "An alternative to Bootstrap/Sass for small projects; less commonly used in professional production codebases than Bootstrap or a utility framework.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["css"],
    relatedIds: ["css", "bootstrap"],
    coreConcepts: [
      "Prebuilt utility classes",
      "Responsive grid via classes, not media queries you write",
      "No JavaScript dependency (unlike Bootstrap's components)",
    ],
    example: {
      language: "html",
      code: `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">\n<div class="w3-container w3-blue">\n  <h2>Hello</h2>\n</div>`,
      explanation:
        "Like most CSS frameworks, styling comes from applying pre-defined class names (w3-container, w3-blue) rather than writing custom rules.",
    },
    useCases: ["Small static sites", "Quick prototypes without a build step"],
    practiceOptions: ["Try applying W3.CSS classes in the HTML/CSS/JS playground"],
    projectIdeas: ["Rebuild a simple landing page's layout using only W3.CSS utility classes"],
    references: [
      { label: "W3.CSS official reference (W3Schools)", url: "https://www.w3schools.com/w3css/" },
    ],
    searchKeywords: ["css framework", "w3.css", "lightweight css"],
    status: "specialized",
    versionPolicy: "evergreen",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "bootstrap",
    slug: "bootstrap",
    name: "Bootstrap",
    category: "frontend",
    subcategory: "css-framework",
    description: "The most widely used CSS component framework.",
    overview:
      "Bootstrap is a CSS (and optional JavaScript) framework providing a responsive grid system and a large set of pre-styled components (navbars, modals, forms, buttons). It remains extremely common in existing production codebases and quick prototyping, even as utility-first approaches have gained ground.",
    whatItIs: "A CSS framework offering a 12-column responsive grid and ready-made UI components.",
    whyItsUsed:
      "It lets a team ship a consistent, responsive UI fast without designing every component from scratch.",
    whereItFits:
      "Directly in server-rendered or lightly-interactive sites; less common (but not absent) in modern component-framework (React/Vue) codebases that prefer utility CSS or their own design system.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["css"],
    relatedIds: ["css", "w3css", "sass"],
    coreConcepts: [
      "The 12-column grid",
      "Component classes (navbar, card, modal)",
      "Responsive breakpoint utilities",
      "Customizing via Sass variables",
    ],
    example: {
      language: "html",
      code: `<div class="container">\n  <div class="row">\n    <div class="col-md-6">Left</div>\n    <div class="col-md-6">Right</div>\n  </div>\n</div>`,
      explanation:
        "The row/col-md-6 pattern is Bootstrap's grid: two equal-width columns on medium screens and up, stacking on smaller screens automatically.",
    },
    useCases: [
      "Admin dashboards",
      "Rapid prototypes",
      "Marketing sites that need a consistent look fast",
    ],
    practiceOptions: ["Try Bootstrap's grid classes in the HTML/CSS/JS playground"],
    projectIdeas: ["A responsive dashboard layout using Bootstrap's grid and card components"],
    references: [
      { label: "Bootstrap official documentation", url: "https://getbootstrap.com/docs/" },
    ],
    searchKeywords: ["css framework", "grid system", "ui components"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "5.x",
    versionNotes:
      "Bootstrap 5 dropped the jQuery dependency that Bootstrap 3/4 required -- worth knowing when reading older code.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "sass",
    slug: "sass",
    name: "Sass",
    category: "frontend",
    subcategory: "css-preprocessor",
    description: "A CSS preprocessor adding variables, nesting, and reusable logic.",
    overview:
      "Sass compiles a superset of CSS (with variables, nesting, mixins, and functions) down to plain CSS. It solves problems plain CSS didn't have good native answers for until custom properties and nesting arrived -- and many teams still prefer its more powerful tooling.",
    whatItIs: "A CSS preprocessor language that compiles to standard CSS at build time.",
    whyItsUsed:
      "For variables, nested selectors, reusable mixins, and splitting styles across files -- before native CSS covered most of this.",
    whereItFits:
      "In a build pipeline, before the CSS reaches the browser; commonly paired with Bootstrap for customization.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["css"],
    relatedIds: ["css", "bootstrap"],
    coreConcepts: [
      "Variables ($variable)",
      "Nesting selectors",
      "Mixins and functions",
      "Partials and @use/@import",
      "Compiling to CSS",
    ],
    example: {
      language: "html",
      code: `$primary: #14532d;\n\n.button {\n  background: $primary;\n  &:hover { background: darken($primary, 10%); }\n}`,
      explanation:
        "The & refers to the parent selector (.button:hover), and darken() is a Sass color function -- neither exists in plain CSS.",
    },
    useCases: [
      "Large stylesheets needing organization",
      "Design systems with themeable variables",
      "Customizing Bootstrap",
    ],
    practiceOptions: [],
    projectIdeas: ["Convert a plain CSS stylesheet to Sass using variables and nesting"],
    references: [
      { label: "Sass official documentation", url: "https://sass-lang.com/documentation/" },
    ],
    searchKeywords: ["scss", "css preprocessor", "css variables"],
    status: "current",
    versionPolicy: "evergreen",
    versionNotes:
      "Modern Sass uses the @use module system; the older global @import is being phased out.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "jquery",
    slug: "jquery",
    name: "jQuery",
    category: "frontend",
    subcategory: "dom-library",
    description: "A DOM manipulation library that predates most modern browser APIs.",
    overview:
      "jQuery simplified DOM manipulation, event handling, and AJAX requests at a time when browser APIs were inconsistent across vendors. Modern browsers have since standardized most of what jQuery solved (querySelector, fetch, addEventListener), so new projects rarely add it -- but it remains extremely common in existing production systems, WordPress plugins, and legacy enterprise code.",
    whatItIs:
      "A JavaScript library wrapping DOM selection, manipulation, and events in a concise API.",
    whyItsUsed:
      "Historically: to paper over cross-browser inconsistencies. Today: mainly to maintain existing codebases already built on it.",
    whereItFits:
      "You will encounter it maintaining older sites, WordPress themes/plugins, and some enterprise intranets. For new projects, native JavaScript (querySelector, fetch) or a modern framework covers the same ground without the added dependency.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["javascript"],
    relatedIds: ["javascript", "html"],
    coreConcepts: [
      "Selecting elements with $()",
      "Chaining methods",
      "Event binding (.on())",
      "AJAX helpers",
    ],
    example: {
      language: "javascript",
      code: `$("#save-btn").on("click", function () {\n  $("#status").text("Saved!");\n});`,
      explanation:
        "The same thing in native JavaScript: document.querySelector('#save-btn').addEventListener('click', () => { ... }) -- jQuery's value was mostly making this shorter and browser-consistent, a gap native JS has since closed.",
    },
    useCases: ["Maintaining existing jQuery-based codebases", "WordPress plugin development"],
    practiceOptions: [],
    projectIdeas: [
      "Take a small jQuery snippet and rewrite it using only native DOM APIs, to see the equivalence directly",
    ],
    references: [{ label: "jQuery official API documentation", url: "https://api.jquery.com/" }],
    searchKeywords: ["dom manipulation", "legacy javascript", "$"],
    status: "legacy",
    legacyNote:
      "Not recommended for new projects -- native browser APIs (querySelector, fetch, addEventListener) now cover what jQuery was built to solve. Still essential for maintaining the large amount of existing production code built on it.",
    versionPolicy: "pinned",
    currentVersion: "3.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "react",
    slug: "react",
    name: "React",
    category: "frontend",
    subcategory: "ui-framework",
    description: "A component-based library for building interactive user interfaces.",
    overview:
      "React structures UIs as a tree of reusable components, each describing what the UI should look like for a given state, and re-rendering automatically when that state changes. It's the most widely adopted UI library in the industry and the foundation for frameworks like Next.js.",
    whatItIs: "A JavaScript library for building UIs out of composable, stateful components.",
    whyItsUsed:
      "It scales well from a small widget to a large application, has a huge ecosystem, and its component model matches how designers already think about interfaces.",
    whereItFits:
      "After solid JavaScript fundamentals (especially functions, arrays/objects, and the DOM) -- React is JavaScript, not a replacement for it.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["javascript"],
    relatedIds: ["javascript", "typescript", "nextjs", "vue"],
    coreConcepts: [
      "Components and JSX",
      "Props",
      "State (useState)",
      "Effects (useEffect)",
      "The virtual DOM and re-rendering",
    ],
    example: {
      language: "javascript",
      code: `function Counter() {\n  const [count, setCount] = React.useState(0);\n  return React.createElement(\n    "button",\n    { onClick: () => setCount(count + 1) },\n    "Clicked " + count + " times"\n  );\n}`,
      explanation:
        "State (useState) holds a value across re-renders; calling setCount schedules a re-render with the new value -- the core loop of every React component.",
    },
    useCases: [
      "Single-page applications",
      "Interactive dashboards",
      "Any UI with significant client-side state",
    ],
    practiceOptions: [],
    projectIdeas: [
      "A todo list with add/remove/complete, using only useState",
      "A component that fetches and displays data from an API",
    ],
    references: [{ label: "React official documentation", url: "https://react.dev/" }],
    searchKeywords: ["jsx", "components", "hooks", "spa", "frontend framework"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "19.x",
    versionNotes:
      "React 16.8+ introduced Hooks (useState, useEffect); modern React code is almost entirely function components, not the older class-component style.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "vue",
    slug: "vue",
    name: "Vue",
    category: "frontend",
    subcategory: "ui-framework",
    description: "An approachable component framework with built-in reactivity.",
    overview:
      "Vue is a component-based framework similar in goals to React, but with a more batteries-included approach (built-in state reactivity, templating syntax closer to HTML) that many developers find gentler to start with.",
    whatItIs:
      "A progressive JavaScript framework for building UIs from reactive, reusable components.",
    whyItsUsed:
      "For its approachable learning curve, clear separation of template/script/style, and strong built-in tooling.",
    whereItFits:
      "An alternative to React for new frontend projects, especially where a team values Vue's more structured, HTML-like template syntax.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["javascript"],
    relatedIds: ["javascript", "react", "angular"],
    coreConcepts: [
      "Single-file components (.vue)",
      "Reactive data (ref/reactive)",
      "Template directives (v-if, v-for)",
      "Computed properties",
    ],
    example: {
      language: "javascript",
      code: `const { createApp, ref } = Vue;\ncreateApp({\n  setup() {\n    const count = ref(0);\n    return { count };\n  },\n}).mount("#app");\n// template: <button @click="count++">{{ count }}</button>`,
      explanation:
        "ref() creates a reactive value; the template automatically re-renders whenever count changes -- Vue's reactivity system tracks the dependency for you.",
    },
    useCases: [
      "Single-page applications",
      "Progressively enhancing an existing server-rendered page",
    ],
    practiceOptions: [],
    projectIdeas: ["A small reactive form with live validation feedback"],
    references: [
      { label: "Vue.js official documentation", url: "https://vuejs.org/guide/introduction.html" },
    ],
    searchKeywords: ["frontend framework", "reactivity", "single-file components"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "3.x",
    versionNotes:
      "Vue 3's Composition API (as in the example) is now preferred over Vue 2's Options API for new code.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "angular",
    slug: "angular",
    name: "Angular",
    category: "frontend",
    subcategory: "ui-framework",
    description: "A full, opinionated application framework built on TypeScript.",
    overview:
      "Angular is a complete application framework -- routing, forms, HTTP client, dependency injection, and testing tools all included -- built on TypeScript from the ground up. It favors convention and structure over the more do-it-yourself approach of React.",
    whatItIs:
      "A comprehensive, TypeScript-based framework for building large single-page applications.",
    whyItsUsed:
      "For large teams and applications that benefit from Angular's built-in structure, dependency injection, and strict typing, reducing architectural decisions each team would otherwise make independently.",
    whereItFits:
      "Common in enterprise applications; requires comfort with TypeScript and object-oriented patterns (classes, decorators) more than React or Vue do.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["typescript"],
    relatedIds: ["typescript", "react", "vue", "angularjs"],
    coreConcepts: [
      "Components and templates",
      "Dependency injection",
      "Services",
      "RxJS observables",
      "Modules and routing",
    ],
    example: {
      language: "javascript",
      code: `@Component({\n  selector: "app-counter",\n  template: \`<button (click)="count = count + 1">{{count}}</button>\`,\n})\nclass CounterComponent {\n  count = 0;\n}`,
      explanation:
        "The @Component decorator attaches metadata (a template, a selector) to a plain class -- Angular's structure leans heavily on TypeScript classes and decorators, unlike React's plain functions.",
    },
    useCases: [
      "Large enterprise single-page applications",
      "Teams that want strong architectural conventions built in",
    ],
    practiceOptions: [],
    projectIdeas: ["A small service-backed component using Angular's dependency injection"],
    references: [{ label: "Angular official documentation", url: "https://angular.dev/" }],
    searchKeywords: ["typescript framework", "enterprise frontend", "spa framework"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: '18.x+ (the modern, post-"AngularJS" Angular)',
    versionNotes:
      '"Angular" (this entry) is the complete TypeScript rewrite released in 2016 onward -- a different framework from the older "AngularJS" (1.x), not just a version bump.',
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "angularjs",
    slug: "angularjs",
    name: "AngularJS",
    category: "frontend",
    subcategory: "ui-framework",
    description: "The original 1.x Angular framework -- legacy, superseded by Angular.",
    overview:
      "AngularJS (versions 1.x) was Google's original JavaScript MVC framework, popular in the early-to-mid 2010s. It was fully superseded by a ground-up TypeScript rewrite, released simply as 'Angular' (2+) -- a different framework, not a version upgrade path. AngularJS itself reached end-of-life and no longer receives official updates.",
    whatItIs:
      "The original (1.x) Angular framework, using two-way data binding and directives on plain JavaScript.",
    whyItsUsed:
      "Historically, for its two-way binding and testability. Today, almost never chosen for new projects.",
    whereItFits:
      "You'll only encounter this maintaining an older codebase. New projects should use Angular (2+), React, or Vue instead -- migrating an AngularJS app forward usually means a rewrite, not an upgrade.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["javascript"],
    relatedIds: ["angular", "javascript"],
    coreConcepts: [
      "Two-way data binding (ng-model)",
      "Directives (ng-if, ng-repeat)",
      "Controllers and $scope",
      "Dependency injection",
    ],
    example: {
      language: "html",
      code: `<div ng-app ng-init="count = 0">\n  <button ng-click="count = count + 1">{{count}}</button>\n</div>`,
      explanation:
        "ng-click and {{count}} are AngularJS directives/interpolation living directly in HTML attributes -- a template style that later frameworks (including Angular 2+) moved away from.",
    },
    useCases: ["Maintaining legacy AngularJS applications only"],
    practiceOptions: [],
    projectIdeas: [
      "Identify which parts of an AngularJS app's logic (services, controllers) would map to which parts of a modern framework, as a migration-planning exercise",
    ],
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    searchKeywords: ["angular 1", "legacy frontend framework", "ng-model"],
    status: "legacy",
    legacyNote:
      "AngularJS (1.x) is end-of-life and unmaintained. It is not the same framework as modern Angular (2+) -- there is no direct upgrade path, only a rewrite. Learn this only to maintain an existing AngularJS codebase, never for new projects.",
    versionPolicy: "pinned",
    currentVersion: "1.8.x (final release; unmaintained)",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "nextjs",
    slug: "nextjs",
    name: "Next.js",
    category: "frontend",
    subcategory: "meta-framework",
    description: "A React framework adding routing, server rendering, and app structure.",
    overview:
      "Next.js builds on React by adding file-based routing, server-side rendering/static generation, and a defined project structure, solving problems (routing, data fetching, SEO) that plain React leaves to the developer. This platform itself is built with Next.js.",
    whatItIs:
      "A production-oriented framework built on top of React, adding routing and rendering strategy.",
    whyItsUsed:
      "Plain React handles UI but not routing, server rendering, or SEO-friendly output on its own -- Next.js adds those without leaving the React component model.",
    whereItFits:
      "After React fundamentals -- Next.js assumes you already know components, props, and state.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["react"],
    relatedIds: ["react", "typescript", "nodejs"],
    coreConcepts: [
      "File-based routing",
      "Server and Client Components",
      "Static vs. server rendering",
      "API routes",
    ],
    example: {
      language: "javascript",
      code: `// app/about/page.tsx\nexport default function AboutPage() {\n  return <h1>About</h1>;\n}\n// Automatically served at /about -- no router config needed.`,
      explanation:
        "A file's location in the app/ directory determines its URL -- routing is structural, not configured in a separate routes file.",
    },
    useCases: [
      "Production web applications needing SEO-friendly rendering",
      "Full-stack apps combining frontend and API routes in one project",
    ],
    practiceOptions: [],
    projectIdeas: [
      "A two-page site (home + about) using file-based routing",
      "A page that fetches data on the server before rendering",
    ],
    references: [{ label: "Next.js official documentation", url: "https://nextjs.org/docs" }],
    searchKeywords: ["react framework", "ssr", "file-based routing", "app router"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "16.x",
    versionNotes:
      "The App Router (app/ directory) is the current recommended approach, superseding the older Pages Router (pages/ directory) used in Next.js 12 and earlier.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
