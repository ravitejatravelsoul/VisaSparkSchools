import type { LessonInput } from "@/lib/content/types";

/**
 * React Application Development.
 *
 * This platform has no React runner (no bundler, no JSX transform, no
 * React runtime shipped to the browser sandbox) and Phase 5A.2 deliberately
 * did not add one -- see docs/ARCHITECTURE.md's "Guided local labs" section
 * for why. Every lesson's guidedExercise/independentExercise is therefore a
 * genuine, browser-executable plain JavaScript/TypeScript exercise that
 * reinforces the *underlying mechanism* a React concept is built on --
 * several of them (createElement, a closure-based useState, a dependency-
 * array comparison, a stale-response guard) are not simplifications for
 * teaching purposes but literally the real algorithm React itself uses.
 * Three lessons additionally carry a `guidedLocalLab` for the actual
 * component/JSX work, which only makes sense running on the learner's own
 * machine with real tooling -- never in this browser sandbox.
 */
export const reactLessons: LessonInput[] = [
  {
    id: "react-component-thinking",
    slug: "react-component-thinking",
    title: "Component Thinking: Breaking a UI into Pieces",
    description:
      "Before any JSX or syntax, the actual skill React rewards: decomposing an interface into small, single-purpose, reusable pieces.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Decompose a UI description into a hierarchy of named components",
      "Apply single-responsibility thinking to decide where one component ends and another begins",
      "Distinguish a reusable component from an accidental one-off copy of markup",
    ],
    skills: ["react", "component-design"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Your First Component",
        url: "https://react.dev/learn/your-first-component",
      },
      { label: "React docs: Thinking in React", url: "https://react.dev/learn/thinking-in-react" },
    ],
    keywords: ["react", "component thinking", "ui decomposition", "single responsibility"],
    explanation: `Before you write a line of JSX, React rewards a specific habit of mind: looking at a finished screen and seeing it as a tree of small, independently understandable pieces, rather than one large block of markup. A course catalog page is not "one big thing" — it's a page containing a search bar, containing a grid, containing cards, each card containing a title, a badge, and a progress bar. Each of those is a candidate component.

The practical test for "should this be its own component" is close to single-responsibility: **does this piece have one clear job, and could it plausibly be reused or tested on its own?** A "CourseCard" that renders one course's title, difficulty badge, and progress bar has one job. A giant "CoursesPage" component that also renders the individual title/badge/progress-bar markup inline, repeated for every course, has smuggled three jobs into one place — and the moment the badge's styling needs to change, you're hunting through a much larger file to find every copy.

A second, easily-missed distinction: **a genuinely reusable component versus an accidental one-off.** If "UserAvatar" and "CourseThumbnail" are really the same shape (an image, a fallback, a size prop) copy-pasted with different class names, that's an accidental duplicate hiding a real, reusable "Avatar" component. If they're superficially similar but actually serve different purposes with different future requirements, forcing them into one shared component too early creates awkward conditional logic that's worse than the duplication it replaced. **Premature abstraction is a real cost, not a free win** — the skill is recognizing genuine repetition, not eliminating every visual similarity.

This lesson's exercises are deliberately about the *decomposition decision itself*, in plain JavaScript, before any JSX syntax — component thinking is a design skill independent of any particular framework's syntax, and it's the skill that determines whether a codebase stays maintainable as it grows.`,
    example: {
      language: "javascript",
      description:
        "Modeling a component tree as plain data (before any JSX) — a decomposition of a course-catalog page into named, single-purpose pieces.",
      code: `const componentTree = {
  name: "CoursesPage",
  children: [
    { name: "SearchBar", children: [] },
    {
      name: "CourseGrid",
      children: [
        { name: "CourseCard", children: ["DifficultyBadge", "ProgressBar"] },
      ],
    },
  ],
};

function countComponents(node) {
  const childCount = node.children.reduce(
    (sum, child) => sum + (typeof child === "string" ? 1 : countComponents(child)),
    0,
  );
  return 1 + childCount;
}

console.log(countComponents(componentTree)); // 6`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a 'Pagination' sibling to CourseGrid inside CoursesPage's children, then re-run to see the count change.",
      code: `const componentTree = {
  name: "CoursesPage",
  children: [
    { name: "SearchBar", children: [] },
    { name: "CourseGrid", children: [] },
  ],
};

function countComponents(node) {
  const childCount = node.children.reduce(
    (sum, child) => sum + (typeof child === "string" ? 1 : countComponents(child)),
    0,
  );
  return 1 + childCount;
}

console.log(countComponents(componentTree));`,
      editable: true,
    },
    guidedExercise: {
      id: "react-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A component renders a user's name, avatar, AND independently fetches and renders that user's five most recent orders inline. Set hasSingleResponsibility to whether this obeys single-responsibility, and set suggestedSplit to an array of two suggested component names it should be split into.",
      starterCode: `let hasSingleResponsibility = null; // TODO
let suggestedSplit = []; // TODO: e.g. ["UserProfile", "RecentOrdersList"]
`,
      solutionCode: `let hasSingleResponsibility = false;
let suggestedSplit = ["UserProfile", "RecentOrdersList"];`,
      harness: `
        try { window.__report('t1', hasSingleResponsibility === false, 'Rendering profile info AND independently fetching/rendering orders is two separate jobs, not one.'); } catch (e) { window.__report('t1', false, 'hasSingleResponsibility is not defined: ' + e.message); }
        try { window.__report('t2', Array.isArray(suggestedSplit) && suggestedSplit.length === 2, 'Suggest exactly two component names, one per responsibility.'); } catch (e) { window.__report('t2', false, 'suggestedSplit is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly identifies the responsibility violation",
          hidden: false,
        },
        { id: "t2", description: "suggests two component names", hidden: false },
      ],
      hints: [
        "Ask: is fetching a completely different resource the same job as displaying profile info?",
        "Two independent data sources rendered together is a strong signal for two components.",
      ],
    },
    independentExercise: {
      id: "react-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function hasAccidentalDuplicate(componentA, componentB) that returns true if two component descriptions (each an object with a `props` array) have identical prop lists (same props, any order) but different names — a sign they should probably be merged into one reusable component.",
      starterCode: `function hasAccidentalDuplicate(componentA, componentB) {
  // TODO
}
`,
      solutionCode: `function hasAccidentalDuplicate(componentA, componentB) {
  if (componentA.name === componentB.name) return false;
  const a = [...componentA.props].sort();
  const b = [...componentB.props].sort();
  return a.length === b.length && a.every((p, i) => p === b[i]);
}`,
      harness: `
        try {
          const r1 = hasAccidentalDuplicate(
            { name: "UserAvatar", props: ["src", "alt", "size"] },
            { name: "CourseThumbnail", props: ["size", "alt", "src"] },
          );
          window.__report('t1', r1 === true, 'Same prop set, different names, is a likely accidental duplicate.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const r2 = hasAccidentalDuplicate(
            { name: "UserAvatar", props: ["src", "alt"] },
            { name: "CourseCard", props: ["title", "progress"] },
          );
          window.__report('t2', r2 === false, 'Different prop sets are genuinely different components, not duplicates.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "detects a real accidental duplicate", hidden: false },
        { id: "t2", description: "does not flag genuinely different components", hidden: false },
      ],
      hints: [
        "Compare the prop lists regardless of order — sort both before comparing.",
        "Two components with the same name aren't a 'duplicate' in the sense this function checks for.",
      ],
    },
    commonMistakes: [
      "Building one large component that does everything, deferring decomposition until it becomes painful to work in.",
      "Merging two components that look visually similar today but serve genuinely different purposes, creating awkward conditional logic later.",
      'Naming components after their visual position ("LeftBox") instead of their responsibility ("CourseFilterPanel"), making the codebase harder to navigate as it grows.',
    ],
    quiz: [
      {
        id: "react-1-q1",
        prompt: "What is the practical test for whether a piece of UI should be its own component?",
        choices: [
          "Whether it has more than 10 lines of markup",
          "Whether it has one clear job and could plausibly be reused or tested on its own",
          "Whether a designer gave it a name",
          "Every visual element should always be its own component",
        ],
        correctIndex: 1,
        explanation:
          "Single-responsibility and reusability are the practical signals — not line count or arbitrary rules.",
      },
      {
        id: "react-1-q2",
        prompt: "Why can merging two superficially similar components too early be a real cost?",
        choices: [
          "It never is a cost — always merge similar-looking components",
          "If they actually serve different, evolving purposes, the merged component accumulates awkward conditional logic",
          "Merged components always run slower",
          "Merging components is illegal in React",
        ],
        correctIndex: 1,
        explanation:
          "Premature abstraction based on surface similarity often costs more in accumulated special-case logic than the duplication it was meant to remove.",
      },
      {
        id: "react-1-q3",
        prompt:
          "Two components have identical prop lists but different names. What does this suggest?",
        choices: [
          "Nothing — this is normal and expected",
          "They may be an accidental duplicate that should be merged into one reusable component",
          "One of them has a bug",
          "They must be renamed immediately regardless of context",
        ],
        correctIndex: 1,
        explanation:
          "An identical prop shape under two different names is a common early sign of an unrecognized reusable component.",
      },
    ],
    takeaway:
      "Component thinking — deciding where one component's responsibility ends and another begins — is a design skill independent of JSX syntax, and it's what keeps a growing UI maintainable.",
    summary:
      "This lesson covered single-responsibility component decomposition and the difference between genuine reuse and premature abstraction, using plain JavaScript to model the decisions before any JSX syntax is introduced.",
    nextLessonSlug: "react-jsx-rendering",
  },
  {
    id: "react-jsx-rendering",
    slug: "react-jsx-rendering",
    title: "JSX and Rendering: UI as an Expression",
    description:
      "JSX is not magic markup — it's syntax sugar for plain function calls. Understanding the function calls it compiles to demystifies almost everything that confuses beginners about it.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: ["react-component-thinking"],
    objectives: [
      "Explain what JSX compiles to and why that explains its rules",
      "Predict what a piece of JSX would compile to as nested function calls",
      "Identify why JSX requires a single root element and camelCase attributes",
    ],
    skills: ["react", "jsx"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Writing Markup with JSX",
        url: "https://react.dev/learn/writing-markup-with-jsx",
      },
      {
        label: "React docs: JavaScript in JSX with Curly Braces",
        url: "https://react.dev/learn/javascript-in-jsx-with-curly-braces",
      },
    ],
    keywords: ["jsx", "createElement", "react rendering", "virtual dom"],
    explanation: `JSX looks like HTML living inside JavaScript, and that resemblance is exactly what makes its rules feel arbitrary until you know the one fact that explains all of them: **JSX is not HTML. It's syntax sugar that compiles down to plain function calls.**

Write this JSX:

\`\`\`jsx
<h1 className="title">Hello, {name}</h1>
\`\`\`

It compiles to something equivalent to this ordinary JavaScript function call:

\`\`\`js
createElement("h1", { className: "title" }, "Hello, ", name)
\`\`\`

That single fact explains nearly every "weird" JSX rule beginners hit:

**Why attributes use camelCase (\`className\`, not \`class\`).** They're not HTML attributes at all — they're keys in a plain JavaScript object (the second argument), and \`class\` is a reserved word in JavaScript, so it can't be used as an identifier-like property the way HTML uses it.

**Why JSX needs a single root element** (or a Fragment). A function call returns exactly one value. \`createElement(...)\` returns one object describing one element — there's no way for a single function call to "return two things," so two sibling elements at the top level have nowhere to go without a wrapper.

**Why \`{expression}\` works but \`{if (...) {...}}\` doesn't.** The curly braces drop you into a JavaScript *expression* context — an argument being passed into that \`createElement\` call — and \`if\` is a *statement*, not an expression that produces a value. This is also why conditional rendering in JSX leans on expressions like the ternary operator or \`&&\`, covered in a later lesson, rather than \`if\` statements.

Rendering itself follows from this too: a component is a function that returns a description of UI (that tree of \`createElement\` calls, often called elements) — not the real DOM directly. React takes that description, compares it to what was there before, and updates only what actually changed. You never manually mutate the DOM in ordinary React code; you return what it should look like, and React handles turning that into real changes.`,
    example: {
      language: "javascript",
      description:
        "A tiny, real implementation of createElement — exactly the function JSX compiles calls to, minus React's actual rendering logic.",
      code: `function createElement(type, props, ...children) {
  return { type, props: props || {}, children };
}

// Equivalent to the JSX: <h1 className="title">Hello, {name}</h1>
const name = "Ada";
const element = createElement("h1", { className: "title" }, "Hello, ", name);

console.log(JSON.stringify(element));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: 'Add a second attribute (e.g. id: "greeting") to the props object and re-run.',
      code: `function createElement(type, props, ...children) {
  return { type, props: props || {}, children };
}

const element = createElement("h1", { className: "title" }, "Hello, world");
console.log(JSON.stringify(element));`,
      editable: true,
    },
    guidedExercise: {
      id: "react-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        'Using the createElement function already defined, build the element that JSX `<p className="note">Total: {total}</p>` would compile to (with total = 42), and store it in noteElement.',
      starterCode: `function createElement(type, props, ...children) {
  return { type, props: props || {}, children };
}

const total = 42;
let noteElement = null; // TODO: build it with createElement
`,
      solutionCode: `function createElement(type, props, ...children) {
  return { type, props: props || {}, children };
}

const total = 42;
let noteElement = createElement("p", { className: "note" }, "Total: ", total);`,
      harness: `
        try {
          window.__report('t1', noteElement.type === 'p', 'The element type should be "p".');
          window.__report('t2', noteElement.props.className === 'note', 'The className prop should be "note".');
          window.__report('t3', JSON.stringify(noteElement.children) === JSON.stringify(['Total: ', 42]), 'The children should be ["Total: ", 42], in that order.');
        } catch (e) { window.__report('t1', false, 'noteElement is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correct element type", hidden: false },
        { id: "t2", description: "correct className prop", hidden: false },
        { id: "t3", description: "correct children in order", hidden: false },
      ],
      hints: [
        "The first argument is the tag name string, the second is the props object.",
        "Everything after the props object becomes a child, in the order given.",
      ],
    },
    independentExercise: {
      id: "react-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function countRootChildren(jsxLikeArray) that takes an array meant to represent JSX top-level siblings and returns its length. Then write hasSingleRoot(jsxLikeArray) that returns true only if the array has exactly one element (a valid single JSX root), false otherwise -- modeling why JSX requires exactly one root element.",
      starterCode: `function countRootChildren(jsxLikeArray) {
  // TODO
}
function hasSingleRoot(jsxLikeArray) {
  // TODO
}
`,
      solutionCode: `function countRootChildren(jsxLikeArray) {
  return jsxLikeArray.length;
}
function hasSingleRoot(jsxLikeArray) {
  return countRootChildren(jsxLikeArray) === 1;
}`,
      harness: `
        try { window.__report('t1', countRootChildren(["a", "b"]) === 2, 'countRootChildren should return the array length.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', hasSingleRoot(["a"]) === true, 'A single-element array represents a valid single JSX root.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', hasSingleRoot(["a", "b"]) === false, 'Two top-level siblings would not compile as valid JSX without a wrapper.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "countRootChildren counts correctly", hidden: false },
        { id: "t2", description: "a single element is recognized as a valid root", hidden: false },
        {
          id: "t3",
          description: "two elements are recognized as invalid without a wrapper",
          hidden: false,
        },
      ],
      hints: [
        "This is directly modeling the rule: a function call (createElement) can only return one value.",
        "hasSingleRoot should just check that countRootChildren returns exactly 1.",
      ],
    },
    commonMistakes: [
      "Trying to write an `if` statement directly inside JSX curly braces, not realizing the braces only accept expressions.",
      "Forgetting a wrapping element (or Fragment) around two sibling elements at a component's top level.",
      "Using `class` instead of `className`, not realizing JSX attributes are JavaScript object keys, where `class` is a reserved word.",
    ],
    quiz: [
      {
        id: "react-2-q1",
        prompt: "What does JSX actually compile to?",
        choices: [
          "Real HTML sent directly to the browser",
          "Plain JavaScript function calls (conventionally createElement-style) that describe UI as data",
          "A separate templating language interpreted at runtime",
          "CSS-in-JS style objects",
        ],
        correctIndex: 1,
        explanation:
          "JSX is syntax sugar over ordinary function calls that build a description of the UI — understanding this explains most of its rules.",
      },
      {
        id: "react-2-q2",
        prompt: "Why must a component's JSX have a single root element (or a Fragment)?",
        choices: [
          "It's an arbitrary style rule with no real reason",
          "A function call can only return one value, and JSX compiles to one function call describing one element",
          "HTML requires exactly one root tag",
          "Browsers reject multiple root elements",
        ],
        correctIndex: 1,
        explanation:
          "Since JSX compiles to a single function call, that call can only return one value — hence one root element (or an array/Fragment representing multiple).",
      },
      {
        id: "react-2-q3",
        prompt: "Why does `{if (x) { ... }}` not work inside JSX, while `{x ? a : b}` does?",
        choices: [
          "JSX curly braces only accept expressions, and `if` is a statement, not an expression",
          "JSX doesn't support conditions at all",
          "This is a bug in React",
          "`if` statements are too slow for JSX",
        ],
        correctIndex: 0,
        explanation:
          "Curly braces in JSX drop into an expression context (an argument being passed into the underlying function call) — `if` is a statement and produces no value, while a ternary is an expression that does.",
      },
    ],
    takeaway:
      "JSX compiles to plain function calls that describe UI as data — knowing this explains camelCase props, the single-root-element rule, and why only expressions (not statements) work inside curly braces.",
    summary:
      "This lesson demystified JSX by implementing the createElement function it compiles calls to, and used that to explain JSX's core syntax rules from first principles.",
    nextLessonSlug: "react-props",
  },
  {
    id: "react-props",
    slug: "react-props",
    title: "Props: Passing Data Down, One Way",
    description:
      "Props are how a parent configures a child — read-only, one direction, always. Understanding why that constraint exists prevents an entire category of confusing bugs.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["react-jsx-rendering"],
    objectives: [
      "Explain why props flow in one direction, parent to child",
      "Identify a prop-mutation bug and explain why it breaks React's assumptions",
      "Design a default-value strategy for optional props",
    ],
    skills: ["react", "props"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Passing Props to a Component",
        url: "https://react.dev/learn/passing-props-to-a-component",
      },
    ],
    keywords: ["react", "props", "one-way data flow", "read-only"],
    explanation: `A component is, at its core, a function. Props are its arguments. \`<CourseCard title="TypeScript" progress={40} />\` is really just calling a function with an object: \`CourseCard({ title: "TypeScript", progress: 40 })\`. That framing explains the two rules that confuse beginners most.

**Props are read-only.** A JavaScript function that reassigns its own parameter doesn't change what the caller passed in — the caller's original value is untouched. React leans on this same guarantee deliberately: a child component must never mutate the props object it receives. If \`CourseCard\` could reach into its \`progress\` prop and change it, the parent's own state — the actual source of truth — would silently disagree with what's on screen, and there would be no way to reason locally about where a value actually comes from.

**Data flows one way: parent to child.** A parent can pass data down as props. A child cannot reach up and hand data back the same way — there is no equivalent of a prop flowing upward. When a child genuinely needs to communicate something to its parent (a button click, a form submission), the parent passes a *function* down as a prop, and the child calls that function. The data still only flows one direction (a function reference, passed down); it's the *invocation* of that function, not a return value flowing back up through props, that lets a child trigger a parent's behavior. This pattern — "lifting state up" and passing callbacks down — is covered in depth once state is introduced in the next lesson.

**Default values matter for optional props.** A \`Badge\` component that expects a \`tone\` prop but sometimes doesn't receive one needs an explicit fallback (\`tone = "neutral"\`) rather than silently rendering \`undefined\`-driven styling. Deciding sensible defaults up front is part of designing a component's actual public interface — the same care you'd put into designing any function's parameters.`,
    example: {
      language: "javascript",
      description:
        'Modeling a component as a plain function taking a props object — exactly what <CourseCard title="..." progress={40} /> becomes underneath JSX.',
      code: `function CourseCard(props) {
  const tone = props.tone || "neutral"; // default for an optional prop
  return { title: props.title, progress: props.progress, tone };
}

console.log(CourseCard({ title: "TypeScript", progress: 40 }));
console.log(CourseCard({ title: "React", progress: 10, tone: "warning" }));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a default value for a new optional 'showBadge' prop (default it to true), then use it below.",
      code: `function CourseCard(props) {
  const tone = props.tone || "neutral";
  return { title: props.title, progress: props.progress, tone };
}

console.log(CourseCard({ title: "TypeScript", progress: 40 }));`,
      editable: true,
    },
    guidedExercise: {
      id: "react-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Here is a buggy component function that mutates its props object directly. Fix it (without mutating props) by writing a corrected version as fixedClampProgress, which returns a NEW object with progress clamped between 0 and 100, leaving the input props object untouched.",
      starterCode: `function buggyClampProgress(props) {
  if (props.progress > 100) props.progress = 100; // mutates the caller's object!
  return props;
}

function fixedClampProgress(props) {
  // TODO: return a new object, do not mutate props
}
`,
      solutionCode: `function buggyClampProgress(props) {
  if (props.progress > 100) props.progress = 100;
  return props;
}

function fixedClampProgress(props) {
  const clamped = Math.min(100, Math.max(0, props.progress));
  return { ...props, progress: clamped };
}`,
      harness: `
        try {
          const original = { title: "Test", progress: 150 };
          const result = fixedClampProgress(original);
          window.__report('t1', result.progress === 100, 'The returned object should have progress clamped to 100.');
          window.__report('t2', original.progress === 150, 'The original props object must NOT be mutated -- it should still read 150.');
        } catch (e) { window.__report('t1', false, 'fixedClampProgress is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "returns a correctly clamped value", hidden: false },
        { id: "t2", description: "does not mutate the original props object", hidden: false },
      ],
      hints: [
        "Use the spread operator to copy props into a new object before changing anything.",
        "Math.min(100, Math.max(0, value)) clamps a number between 0 and 100.",
      ],
    },
    independentExercise: {
      id: "react-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function withDefaults(props, defaults) that returns a new object where any key present in `defaults` but missing (or undefined) in `props` is filled in from `defaults`, without mutating either input object. Keys already present and defined in `props` should win.",
      starterCode: `function withDefaults(props, defaults) {
  // TODO
}
`,
      solutionCode: `function withDefaults(props, defaults) {
  return { ...defaults, ...props };
}`,
      harness: `
        try {
          const props = { title: "React", tone: undefined };
          const defaults = { tone: "neutral", size: "md" };
          const result = withDefaults(props, defaults);
          window.__report('t1', result.title === 'React', 'An existing prop value should be preserved.');
          window.__report('t2', result.size === 'md', 'A missing prop should be filled in from defaults.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const props = { tone: "warning" };
          const defaults = { tone: "neutral" };
          const result = withDefaults(props, defaults);
          window.__report('t3', result.tone === 'warning', 'A prop explicitly provided should win over the default.');
        } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "preserves existing props", hidden: false },
        { id: "t2", description: "fills in missing props from defaults", hidden: false },
        { id: "t3", description: "an explicit prop wins over its default", hidden: false },
      ],
      hints: [
        "Spreading defaults first, then props, lets later keys override earlier ones.",
        "Object spread naturally handles 'props wins if present' when ordered correctly.",
      ],
    },
    commonMistakes: [
      "Mutating a props object directly inside a component instead of deriving a new value.",
      "Trying to have a child component change a value and have that change magically reflect in the parent, without passing a callback function down for the child to call.",
      "Forgetting sensible defaults for optional props, so a missing prop silently produces `undefined`-driven behavior instead of a clear fallback.",
    ],
    quiz: [
      {
        id: "react-3-q1",
        prompt: "Why should a component never mutate the props object it receives?",
        choices: [
          "It's slightly slower to mutate objects",
          "The parent's state is the real source of truth, and mutating props would let the UI silently disagree with it",
          "JavaScript doesn't allow object mutation",
          "It only matters for TypeScript projects",
        ],
        correctIndex: 1,
        explanation:
          "Treating props as read-only preserves a single, traceable source of truth (the parent's state) — mutating them breaks that guarantee.",
      },
      {
        id: "react-3-q2",
        prompt: "How does a child component communicate something back up to its parent?",
        choices: [
          "By directly modifying its own props",
          "By calling a function that the parent passed down as a prop",
          "Data can flow upward through props automatically",
          "It cannot — children are permanently isolated",
        ],
        correctIndex: 1,
        explanation:
          "The parent passes a callback function down as a prop; the child calls it. Data still only flows down (the function reference) — it's the invocation that lets the child trigger parent behavior.",
      },
      {
        id: "react-3-q3",
        prompt:
          "Why does a component like Badge benefit from an explicit default value for an optional `tone` prop?",
        choices: [
          "It doesn't — defaults are unnecessary",
          "Without one, a missing prop silently produces undefined-driven behavior instead of a predictable fallback",
          "Defaults are required by the JSX compiler",
          "Only numeric props can have defaults",
        ],
        correctIndex: 1,
        explanation:
          "Deciding a sensible default is part of designing a component's real interface, the same way you'd choose defaults for any function's parameters.",
      },
    ],
    takeaway:
      "Props are read-only, one-directional function arguments — a child changes its parent's behavior only by calling a callback the parent passed down, never by mutating props directly.",
    summary:
      "This lesson covered why props are read-only and flow one direction, how to fix a prop-mutation bug, and how to design sensible defaults for optional props.",
    nextLessonSlug: "react-events",
  },
  {
    id: "react-events",
    slug: "react-events",
    title: "Handling Events in React",
    description:
      "How a click becomes a function call: passing handler functions as props, and the difference between calling a function and passing a reference to one.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 17,
    prerequisites: ["react-props"],
    objectives: [
      "Explain how a JSX event prop connects to a handler function",
      "Identify the difference between passing a function reference and accidentally calling it during render",
      "Pass data from an event handler back up to a parent via a callback prop",
    ],
    skills: ["react", "events"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Responding to Events",
        url: "https://react.dev/learn/responding-to-events",
      },
    ],
    keywords: ["react", "events", "event handlers", "onClick"],
    explanation: `\`<button onClick={handleClick}>\` is, underneath the JSX, exactly what you'd expect from the previous lessons: a prop named \`onClick\` whose value is a function. React attaches its own event system and calls that function when the button is actually clicked. There's no special magic beyond "a prop that happens to hold a function, which gets called later."

That framing explains the single most common beginner mistake in this area: **\`onClick={handleClick}\` passes a reference to the function — \`onClick={handleClick()}\` calls it immediately, during render, and passes whatever it returns (often \`undefined\`) as the prop instead.** The parentheses are the entire difference between "call this later, when clicked" and "call this right now, while rendering." A component that appears to do nothing when clicked, but does something weird immediately on every render, almost always has this exact bug.

When a handler needs to pass along extra information — which course was clicked, which item in a list — you wrap it in an inline arrow function: \`onClick={() => handleSelect(course.id)}\`. That outer arrow function *is* the reference passed to \`onClick\`; it just happens to call \`handleSelect\` with a specific argument when it eventually runs.

This is also the concrete mechanism behind "a child communicates up to its parent," introduced in the props lesson: the parent defines a handler function and passes it down as a prop (\`onSelect\`); the child attaches it (or a wrapper around it) to a real DOM event like \`onClick\`; when the user interacts, the child calls that function, optionally passing along data specific to what happened. The data still only ever moved down as a function reference — it's the *timing* of the call, triggered by the user's action, that makes it feel like information flowing upward.`,
    example: {
      language: "javascript",
      description:
        "Modeling the difference between passing a function reference and calling it immediately — the single most common event-handler bug.",
      code: `function handleClick() {
  return "clicked!";
}

// Correct: pass the reference. React calls it later, on click.
const correctProp = handleClick;
console.log(typeof correctProp); // "function" -- ready to be called later

// Buggy: calling it immediately assigns its RETURN VALUE as the prop.
const buggyProp = handleClick();
console.log(typeof buggyProp); // "string" -- already ran, nothing left to call on click`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Fix the buggy line below (remove the parentheses) and re-run to see the type change.",
      code: `function handleClick() {
  return "clicked!";
}

const buggyProp = handleClick();
console.log(typeof buggyProp);`,
      editable: true,
    },
    guidedExercise: {
      id: "react-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A list needs each button's handler to know which item it belongs to. Write makeClickHandler(itemId, onSelect) that returns a new function taking no arguments, which calls onSelect(itemId) when invoked -- modeling the `() => handleSelect(item.id)` inline-arrow pattern.",
      starterCode: `function makeClickHandler(itemId, onSelect) {
  // TODO: return a function that calls onSelect(itemId) when called
}
`,
      solutionCode: `function makeClickHandler(itemId, onSelect) {
  return function () {
    onSelect(itemId);
  };
}`,
      harness: `
        try {
          let selectedId = null;
          const onSelect = (id) => { selectedId = id; };
          const handler = makeClickHandler(42, onSelect);
          window.__report('t1', typeof handler === 'function', 'makeClickHandler should return a function, not call onSelect immediately.');
          window.__report('t2', selectedId === null, 'onSelect should NOT have been called yet -- only when the returned handler is invoked.');
          handler();
          window.__report('t3', selectedId === 42, 'Calling the returned handler should call onSelect with itemId (42).');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "returns a function, doesn't call onSelect immediately",
          hidden: false,
        },
        { id: "t2", description: "onSelect not called before the handler runs", hidden: false },
        {
          id: "t3",
          description: "calling the returned handler calls onSelect with the right id",
          hidden: false,
        },
      ],
      hints: [
        "The outer function should return an inner function, not execute onSelect directly.",
        "This models exactly what `() => handleSelect(item.id)` does in JSX.",
      ],
    },
    independentExercise: {
      id: "react-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function isLikelyCalledDuringRender(propValue) that returns true if propValue is NOT a function (suggesting someone wrote onClick={handleClick()} instead of onClick={handleClick}), false if it IS a function (correctly passed as a reference).",
      starterCode: `function isLikelyCalledDuringRender(propValue) {
  // TODO
}
`,
      solutionCode: `function isLikelyCalledDuringRender(propValue) {
  return typeof propValue !== "function";
}`,
      harness: `
        try { window.__report('t1', isLikelyCalledDuringRender(function () {}) === false, 'A real function reference should not be flagged.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', isLikelyCalledDuringRender("clicked!") === true, 'A string (the likely result of calling the handler too early) should be flagged.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', isLikelyCalledDuringRender(undefined) === true, 'undefined (another common result of an early call) should be flagged.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "does not flag a real function", hidden: false },
        { id: "t2", description: "flags a string value", hidden: false },
        { id: "t3", description: "flags an undefined value", hidden: false },
      ],
      hints: [
        "typeof a function is exactly the string 'function'.",
        "Anything that isn't a function is suspicious for an event-handler prop.",
      ],
    },
    commonMistakes: [
      "Writing `onClick={handleClick()}` instead of `onClick={handleClick}`, accidentally calling the handler during render instead of passing it as a reference.",
      "Forgetting to wrap a parameterized call in an inline arrow function, e.g. writing `onClick={handleSelect(item.id)}` instead of `onClick={() => handleSelect(item.id)}`.",
      "Assuming a child can somehow read a value back out of a parent without the parent explicitly passing a callback prop down.",
    ],
    quiz: [
      {
        id: "react-4-q1",
        prompt:
          "What is the difference between `onClick={handleClick}` and `onClick={handleClick()}`?",
        choices: [
          "There is no difference",
          "The first passes a reference to call later; the second calls it immediately during render and passes its return value instead",
          "The second is faster",
          "The first only works with arrow functions",
        ],
        correctIndex: 1,
        explanation:
          "This is the single most common event-handler bug — the parentheses determine whether the function runs now (during render) or later (on the actual event).",
      },
      {
        id: "react-4-q2",
        prompt:
          "Why is `onClick={() => handleSelect(item.id)}` used instead of `onClick={handleSelect}` when extra data is needed?",
        choices: [
          "It isn't necessary — they're equivalent",
          "The outer arrow function is itself the reference passed to onClick, and it calls handleSelect with a specific argument only once actually invoked",
          "Arrow functions are required for all event handlers",
          "This pattern is deprecated",
        ],
        correctIndex: 1,
        explanation:
          "Wrapping in an arrow function lets you pass along extra information at call time while still only handing React a function reference, not an immediate call.",
      },
      {
        id: "react-4-q3",
        prompt:
          'How does a child component\'s event ultimately let a parent "know" something happened?',
        choices: [
          "The child mutates the parent's state directly",
          "The parent passes a callback prop down; the child calls it (usually from within its own event handler), often passing along relevant data",
          "React automatically syncs state between parent and child",
          "It's not possible in React",
        ],
        correctIndex: 1,
        explanation:
          "This is the concrete mechanism behind the one-way-data-flow-with-callbacks pattern from the props lesson, now tied to a real user interaction.",
      },
    ],
    takeaway:
      "Event props hold function references, called later by React when the event actually happens — calling a handler immediately (missing the parentheses distinction) is the most common beginner event bug.",
    summary:
      "This lesson covered how JSX event props connect to handler functions, the reference-vs-call distinction that causes most handler bugs, and passing data up via callback props triggered by real events.",
    nextLessonSlug: "react-state",
  },
  {
    id: "react-state",
    slug: "react-state",
    title: "State: Giving Components Memory",
    description:
      "Why a plain variable doesn't survive a re-render, and what useState actually does underneath — built by hand, once, so it stops feeling like magic.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 4,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["react-events"],
    objectives: [
      "Explain why a plain local variable can't hold state across renders",
      "Explain what useState conceptually does using a closure-based re-implementation",
      "Use the functional-update form of a state setter correctly when the new value depends on the old one",
    ],
    skills: ["react", "state", "usestate"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: State: A Component's Memory",
        url: "https://react.dev/learn/state-a-components-memory",
      },
    ],
    keywords: ["react", "state", "usestate", "closures"],
    explanation: `A component is a function, and every re-render is React calling that function again from scratch. A plain \`let count = 0;\` declared inside a component gets reset to \`0\` on every single call — it cannot remember anything between renders, because nothing about calling a function again preserves its local variables from the previous call. This is exactly the problem \`useState\` exists to solve: **it gives a component memory that survives across its own re-invocations**, stored by React outside the function itself.

You don't need to take that on faith. A closure-based re-implementation makes it concrete: React (conceptually) keeps an array of "state slots" per component instance, and each call to \`useState\` claims the next slot in that array, in the same order every render — which is exactly why the Rules of Hooks forbid calling \`useState\` conditionally: if a hook call is sometimes skipped, every subsequent hook call shifts to the wrong slot, silently reading and writing the wrong piece of state.

**Calling the setter doesn't mutate the current render's variable — it schedules a re-render with the new value for next time.** \`const [count, setCount] = useState(0); setCount(count + 1);\` reads \`count\` as it was *at the start of this render* and schedules the next render with the new value; \`count\` itself, in the render that just ran, never changes.

This distinction matters most when a new state value depends on the previous one, especially across multiple updates queued close together. \`setCount(count + 1)\` twice in a row, in the same event handler, both read the *same* \`count\` from that render's closure — you get \`+1\`, not \`+2\`. The fix is the **functional update form**: \`setCount(prev => prev + 1)\`, which always receives the truly-latest value React has, regardless of how many updates are queued. This is not a minor style preference; it's the difference between a correct counter and a subtly, intermittently broken one.`,
    example: {
      language: "javascript",
      description:
        "A real, closure-based re-implementation of useState's core idea -- state stored outside the component function, surviving each new call.",
      code: `function createStateSlot(initialValue) {
  let value = initialValue;
  function get() {
    return value;
  }
  function set(newValueOrUpdater) {
    value = typeof newValueOrUpdater === "function" ? newValueOrUpdater(value) : newValueOrUpdater;
  }
  return [get, set];
}

const [getCount, setCount] = createStateSlot(0);
console.log(getCount()); // 0 -- survives because it lives outside the "component" call
setCount(getCount() + 1);
console.log(getCount()); // 1`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call setCount twice in a row using the DIRECT (non-functional) form, then check the final count -- is it what you expected?",
      code: `function createStateSlot(initialValue) {
  let value = initialValue;
  function get() { return value; }
  function set(v) { value = typeof v === "function" ? v(value) : v; }
  return [get, set];
}

const [getCount, setCount] = createStateSlot(0);
setCount(getCount() + 1);
setCount(getCount() + 1);
console.log(getCount());`,
      editable: true,
    },
    guidedExercise: {
      id: "react-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using createStateSlot already defined, fix the double-increment bug from the example by using the FUNCTIONAL update form both times, storing the final value in finalCount (should be 2).",
      starterCode: `function createStateSlot(initialValue) {
  let value = initialValue;
  function get() { return value; }
  function set(v) { value = typeof v === "function" ? v(value) : v; }
  return [get, set];
}

const [getCount, setCount] = createStateSlot(0);
// TODO: call setCount twice using the functional update form: prev => prev + 1
let finalCount = getCount();
`,
      solutionCode: `function createStateSlot(initialValue) {
  let value = initialValue;
  function get() { return value; }
  function set(v) { value = typeof v === "function" ? v(value) : v; }
  return [get, set];
}

const [getCount, setCount] = createStateSlot(0);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
let finalCount = getCount();`,
      harness: `
        try { window.__report('t1', finalCount === 2, 'Using the functional update form twice should correctly reach 2, unlike the direct form which would get stuck at 1.'); } catch (e) { window.__report('t1', false, 'finalCount is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "reaches the correct final count using functional updates",
          hidden: false,
        },
      ],
      hints: [
        "setCount((prev) => prev + 1) always reads the true latest value, not a possibly-stale closed-over one.",
        "Call setCount twice, both times with the functional form, before reading getCount().",
      ],
    },
    independentExercise: {
      id: "react-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function claimNextSlot(slotIndexRef) that models the Rules of Hooks: it takes an object { current: number } representing 'the next slot index for this render', returns the current value, and increments slotIndexRef.current by 1 -- modeling how each useState call claims the next sequential slot.",
      starterCode: `function claimNextSlot(slotIndexRef) {
  // TODO
}
`,
      solutionCode: `function claimNextSlot(slotIndexRef) {
  const claimed = slotIndexRef.current;
  slotIndexRef.current += 1;
  return claimed;
}`,
      harness: `
        try {
          const ref = { current: 0 };
          const first = claimNextSlot(ref);
          const second = claimNextSlot(ref);
          const third = claimNextSlot(ref);
          window.__report('t1', first === 0 && second === 1 && third === 2, 'Each call should claim the next sequential slot: 0, then 1, then 2.');
          window.__report('t2', ref.current === 3, 'After three calls, the ref should point at slot 3 for the next call.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "claims sequential slots in order", hidden: false },
        { id: "t2", description: "advances the counter correctly", hidden: false },
      ],
      hints: [
        "Return the value BEFORE incrementing, so the first call returns 0.",
        "This models exactly why calling useState conditionally breaks: a skipped call means every later call shifts to the wrong slot.",
      ],
    },
    commonMistakes: [
      "Using a plain `let` variable for something that needs to survive a re-render, then being confused when it keeps resetting.",
      "Calling the state setter with a direct value that depends on the current state (`setCount(count + 1)`) more than once in the same handler, expecting each call to see the previous call's update.",
      "Calling useState conditionally (inside an `if`), which shifts every subsequent hook call to the wrong slot in React's real implementation.",
    ],
    quiz: [
      {
        id: "react-5-q1",
        prompt: "Why can't a plain `let` variable inside a component hold state across renders?",
        choices: [
          "JavaScript doesn't support `let` inside functions",
          "Every render is a fresh call to the component function, which resets all of its local variables",
          "`let` variables are read-only",
          "This is a limitation only in older React versions",
        ],
        correctIndex: 1,
        explanation:
          "A component re-rendering means React calling that function again — local variables declared inside don't persist between separate calls, which is exactly why state needs to live outside the function.",
      },
      {
        id: "react-5-q2",
        prompt:
          "Why does calling `setCount(count + 1)` twice in the same handler often not produce +2?",
        choices: [
          "It's a bug in React",
          "Both calls read the same `count` value captured from that render, so both compute the same +1",
          "State setters can only be called once per handler",
          "This always works correctly, no exceptions",
        ],
        correctIndex: 1,
        explanation:
          "The direct-value form closes over the render's `count`; using it twice in a row calculates from the same stale value both times, unlike the functional update form.",
      },
      {
        id: "react-5-q3",
        prompt: "Why do the Rules of Hooks forbid calling useState conditionally?",
        choices: [
          "It's just a style preference with no real consequence",
          "Hooks are matched to state by call order; skipping a call shifts every subsequent hook to the wrong slot",
          "Conditional code is always slower",
          "useState can only be called at the very top of a file",
        ],
        correctIndex: 1,
        explanation:
          "Since state slots are claimed in call order, a hook call that sometimes doesn't happen desynchronizes every hook call after it from its intended slot.",
      },
    ],
    takeaway:
      "useState gives a component memory that survives its own re-invocation by storing state outside the function — and the functional update form exists specifically to avoid reading a stale value when an update depends on the previous state.",
    summary:
      "This lesson built a closure-based re-implementation of useState's core idea to explain why plain variables can't hold state, why hook call order matters, and when the functional update form is required.",
    nextLessonSlug: "react-conditional-lists",
  },
  {
    id: "react-conditional-lists",
    slug: "react-conditional-lists",
    title: "Conditional Rendering, Lists, and Stable Keys",
    description:
      "Rendering different UI based on a condition, rendering a list from an array, and the one rule about list keys that prevents real, hard-to-diagnose bugs.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 5,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["react-state"],
    objectives: [
      "Render different UI conditionally using expressions, not statements",
      "Explain why array index is an unsafe key for a reorderable or filterable list",
      "Design a stable, unique key extraction strategy for real data",
    ],
    skills: ["react", "conditional-rendering", "lists", "keys"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Conditional Rendering",
        url: "https://react.dev/learn/conditional-rendering",
      },
      { label: "React docs: Rendering Lists", url: "https://react.dev/learn/rendering-lists" },
    ],
    keywords: ["react", "conditional rendering", "lists", "keys"],
    explanation: `From the JSX lesson: curly braces only accept expressions, not statements, because they're arguments to a function call. That's why conditional rendering in JSX leans on expressions — the ternary operator (\`condition ? <A /> : <B />\`) for either/or, and the \`&&\` operator (\`condition && <A />\`) for render-this-or-render-nothing — rather than an \`if\` statement, which produces no value at all.

Rendering a list from an array is the array's own \`.map()\`, nothing React-specific: \`items.map(item => <ItemRow key={item.id} {...item} />)\` transforms an array of data into an array of elements, exactly the way \`.map()\` transforms any array. What *is* React-specific is the \`key\` prop, and it's not optional decoration — it's how React matches each element in a new render to the corresponding element from the previous render, so it can correctly preserve, update, or remove exactly the right one.

**Array index as a key looks fine until the list reorders, filters, or has an item inserted/removed from the middle — then it silently breaks.** If a list of \`[A, B, C]\` (keyed 0, 1, 2) has \`A\` removed, the new list \`[B, C]\` is keyed 0, 1 — meaning React sees "key 0's content changed from A to B" and "key 1's content changed from B to C," not "the first item was removed." For static, decorative content this rarely matters. For a list with per-item local state (a controlled input inside each row, an expanded/collapsed toggle) it's a real, confusing bug: after removing item A, item B's row can end up displaying *A's* leftover local state, because React matched the wrong slot to the wrong data.

**The fix is a stable identity that travels with the data itself** — a database id, a UUID generated once when the item was created, anything that uniquely and permanently identifies that specific item regardless of its position in the array. If your data genuinely has no natural id, generating and storing one when the item is created (not deriving one from its current array position) is the correct fix — not reaching for \`index\` as a shortcut.`,
    example: {
      language: "javascript",
      description:
        "Modeling why index-based keys break identity tracking when a list changes shape — before, after removing the first item.",
      code: `const before = ["Alice", "Bob", "Carol"];
const beforeKeyed = before.map((name, index) => ({ key: index, name })); // BUGGY: index as key

const after = ["Bob", "Carol"]; // Alice removed
const afterKeyed = after.map((name, index) => ({ key: index, name }));

console.log(beforeKeyed[0]); // { key: 0, name: "Alice" }
console.log(afterKeyed[0]);  // { key: 0, name: "Bob" } -- SAME key, different person!`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Fix the keying by using each person's actual id instead of the array index, then re-run.",
      code: `const people = [
  { id: "u1", name: "Alice" },
  { id: "u2", name: "Bob" },
  { id: "u3", name: "Carol" },
];

const keyed = people.map((person, index) => ({ key: index, name: person.name }));
console.log(keyed);`,
      editable: true,
    },
    guidedExercise: {
      id: "react-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write a function findUnsafeIndexKeys(list) that returns true if `list` (an array of objects) has NO stable id field (no `id` property on its items, meaning index-based keying would be the only option), false if every item has a usable `id`.",
      starterCode: `function findUnsafeIndexKeys(list) {
  // TODO
}
`,
      solutionCode: `function findUnsafeIndexKeys(list) {
  return !list.every((item) => item && typeof item.id !== "undefined");
}`,
      harness: `
        try { window.__report('t1', findUnsafeIndexKeys([{ id: 1 }, { id: 2 }]) === false, 'Every item has an id -- safe to key by id, not flagged.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', findUnsafeIndexKeys([{ name: 'a' }, { name: 'b' }]) === true, 'No item has an id -- this list would be forced into unsafe index-based keying.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "does not flag a list with stable ids", hidden: false },
        { id: "t2", description: "flags a list with no stable ids", hidden: false },
      ],
      hints: [
        "Check whether every item in the list has a defined `id` property.",
        "`Array.prototype.every` returns true only if every element satisfies the check.",
      ],
    },
    independentExercise: {
      id: "react-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function keyExtractor(list) that returns an array of stable keys: use each item's `id` if present, otherwise generate one as `'generated-' + index` (a documented, deliberate fallback — not a silent unsafe default) as a last resort.",
      starterCode: `function keyExtractor(list) {
  // TODO
}
`,
      solutionCode: `function keyExtractor(list) {
  return list.map((item, index) => (item && item.id !== undefined ? item.id : "generated-" + index));
}`,
      harness: `
        try {
          const result = keyExtractor([{ id: "a1" }, { id: "a2" }]);
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["a1", "a2"]), 'Items with ids should use their real id as the key.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const result = keyExtractor([{ name: "x" }, { name: "y" }]);
          window.__report('t2', JSON.stringify(result) === JSON.stringify(["generated-0", "generated-1"]), 'Items with no id should fall back to a clearly-labeled generated key.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "uses real ids when present", hidden: false },
        {
          id: "t2",
          description: "falls back to a labeled generated key when no id exists",
          hidden: false,
        },
      ],
      hints: [
        "Map each item to item.id if it exists, otherwise to a fallback string built from the index.",
        "The fallback should be clearly distinguishable from a real id, not silently identical to a plain index.",
      ],
    },
    commonMistakes: [
      "Using `if` statements inline in JSX instead of a ternary or `&&` expression, since curly braces only accept expressions.",
      "Using the array index as a key for any list that can reorder, filter, or have items inserted/removed from the middle.",
      'Assuming index-based keys are "fine for now" without checking whether the list items carry any per-item local state that could get silently mismatched.',
    ],
    quiz: [
      {
        id: "react-6-q1",
        prompt:
          "Why does `condition && <Component />` work in JSX but `if (condition) { <Component /> }` does not?",
        choices: [
          "They both work identically",
          "JSX curly braces only accept expressions, and `&&` is an expression while `if` is a statement",
          "`if` is deprecated in modern JavaScript",
          "`&&` is faster to execute",
        ],
        correctIndex: 1,
        explanation:
          "This follows directly from JSX compiling to function-call arguments — only expressions (things that produce a value) can go inside curly braces.",
      },
      {
        id: "react-6-q2",
        prompt:
          "What specifically breaks when array index is used as a key and an item is removed from the middle of the list?",
        choices: [
          "Nothing breaks, this is always safe",
          "React can misattribute which rendered element (and its local state) corresponds to which piece of data, since indexes shift",
          "The list stops rendering entirely",
          "This only matters for lists longer than 100 items",
        ],
        correctIndex: 1,
        explanation:
          "Because the index-to-data mapping shifts when an item is removed, React can match the wrong previously-rendered element (and any state it held) to the wrong new data.",
      },
      {
        id: "react-6-q3",
        prompt: 'What makes a key genuinely "stable" for a list item?',
        choices: [
          "It changes every time the list re-renders",
          "It's tied to the item's identity itself (like a database id), not to its current position in the array",
          "It must always be a number",
          "Any unique string works, including ones derived from position",
        ],
        correctIndex: 1,
        explanation:
          "A stable key travels with the data's actual identity, so it stays correct even if the item's position in the array changes.",
      },
    ],
    takeaway:
      "Conditional rendering uses expressions because JSX curly braces only accept values, not statements — and list keys must be tied to an item's identity, not its position, or React can silently misattribute state to the wrong element.",
    summary:
      "This lesson covered expression-based conditional rendering and demonstrated concretely why array-index keys break when a list's shape changes, and how to design a stable key-extraction strategy.",
    nextLessonSlug: "react-forms-validation",
  },
  {
    id: "react-forms-validation",
    slug: "react-forms-validation",
    title: "Controlled Forms and Validation",
    description:
      "A controlled input keeps React's state as the single source of truth for form data. Build a real, validated signup form locally, with a genuine React project running on your own machine.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 30,
    prerequisites: ["react-conditional-lists"],
    objectives: [
      "Explain what makes an input 'controlled' versus uncontrolled",
      "Design a validation strategy that gives useful, specific feedback",
      "Build and run a real controlled form component using Vite and React on your own machine",
    ],
    skills: ["react", "forms", "validation"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Reacting to Input with State",
        url: "https://react.dev/learn/reacting-to-input-with-state",
      },
      {
        label: "MDN: Client-side form validation",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation",
      },
    ],
    keywords: ["react", "controlled inputs", "forms", "validation"],
    explanation: `An HTML \`<input>\` normally keeps its own internal value, independent of your JavaScript — you only find out what's in it when you ask (e.g. on submit). A **controlled input** inverts that: its \`value\` is set from React state, and every keystroke updates that state via \`onChange\`, so React state is always the single, authoritative source of truth for what the input currently holds — never the DOM element itself.

\`\`\`jsx
const [email, setEmail] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />
\`\`\`

This costs a re-render per keystroke, which sounds expensive but isn't in practice for ordinary forms — and it buys you something valuable: the value is available everywhere in the component (for live validation, for a character counter, for enabling/disabling the submit button) without ever reaching into the DOM to ask for it.

**Good validation feedback is specific, not just present.** "Invalid input" tells a user nothing actionable. "Password must be at least 8 characters" tells them exactly what to fix. Deciding *when* to validate matters too: validating on every keystroke from the first character typed produces an aggressively red, discouraging form before the user has even finished typing; a common, learner-friendly middle ground is validating on blur (when the user leaves the field) for the first pass, then live on every keystroke once an error has already been shown for that field — so corrections get immediate positive feedback, but a field isn't judged before the user's even done with it.

This lesson's guided local lab is where the real component work happens: you'll set up a small Vite + React project on your own machine and build a genuinely controlled, validated form — nothing here in the browser can substitute for actually running JSX through a real build tool.`,
    example: {
      language: "javascript",
      description:
        "The validation LOGIC behind a controlled form field, kept separate from React so it's independently testable — exactly the function the guided local lab's real component will call.",
      code: `function validatePassword(password) {
  if (password.length === 0) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/\\d/.test(password)) return "Password must include at least one digit.";
  return null; // null means valid
}

console.log(validatePassword(""));          // "Password is required."
console.log(validatePassword("short1"));    // "Password must be at least 8 characters."
console.log(validatePassword("longenough")); // "Password must include at least one digit."
console.log(validatePassword("longenough1")); // null`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a rule requiring at least one uppercase letter, then test it against a password missing one.",
      code: `function validatePassword(password) {
  if (password.length === 0) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/\\d/.test(password)) return "Password must include at least one digit.";
  return null;
}

console.log(validatePassword("longenough1"));`,
      editable: true,
    },
    guidedExercise: {
      id: "react-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write validateEmail(email) returning a specific error string, or null if valid. Rules: required (non-empty), must contain exactly one '@', and must have at least one character after the last '.'.",
      starterCode: `function validateEmail(email) {
  // TODO: implement the three rules described above, returning a specific message or null
}
`,
      solutionCode: `function validateEmail(email) {
  if (email.length === 0) return "Email is required.";
  const atCount = (email.match(/@/g) || []).length;
  if (atCount !== 1) return "Email must contain exactly one @ symbol.";
  const afterLastDot = email.slice(email.lastIndexOf(".") + 1);
  if (email.lastIndexOf(".") === -1 || afterLastDot.length === 0) {
    return "Email must have a valid domain ending.";
  }
  return null;
}`,
      harness: `
        try { window.__report('t1', validateEmail("") === "Email is required.", 'Empty email should require a value.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', typeof validateEmail("noatsign.com") === 'string', 'An email with no @ should return an error string.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', typeof validateEmail("a@b@c.com") === 'string', 'An email with two @ symbols should return an error string.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', validateEmail("ada@example.com") === null, 'A well-formed email should return null (valid).'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "requires a non-empty email", hidden: false },
        { id: "t2", description: "rejects a missing @ symbol", hidden: false },
        { id: "t3", description: "rejects more than one @ symbol", hidden: false },
        { id: "t4", description: "accepts a well-formed email", hidden: false },
      ],
      hints: [
        "Count the @ symbols with a regex match, and check the count is exactly 1.",
        "Use lastIndexOf('.') to find the domain ending, and check there's at least one character after it.",
      ],
    },
    independentExercise: {
      id: "react-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write validateForm(values) that takes an object like { email, password } and returns an object mapping each invalid field name to its error message, omitting any field that's valid. Reuse the pattern from the example (empty errors object means the whole form is valid).",
      starterCode: `function validatePassword(password) {
  if (password.length === 0) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}
function validateEmail(email) {
  if (email.length === 0) return "Email is required.";
  if (!email.includes("@")) return "Email must contain an @ symbol.";
  return null;
}

function validateForm(values) {
  // TODO: return { email: "...", password: "..." } for only the invalid fields
}
`,
      solutionCode: `function validatePassword(password) {
  if (password.length === 0) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}
function validateEmail(email) {
  if (email.length === 0) return "Email is required.";
  if (!email.includes("@")) return "Email must contain an @ symbol.";
  return null;
}

function validateForm(values) {
  const errors = {};
  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}`,
      harness: `
        try {
          const errors = validateForm({ email: "", password: "short" });
          window.__report('t1', typeof errors.email === 'string' && typeof errors.password === 'string', 'Both fields are invalid and should both appear in the errors object.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const errors = validateForm({ email: "ada@example.com", password: "longenough" });
          window.__report('t2', Object.keys(errors).length === 0, 'A fully valid form should produce an empty errors object.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try {
          const errors = validateForm({ email: "ada@example.com", password: "short" });
          window.__report('t3', !('email' in errors) && 'password' in errors, 'Only the invalid field (password) should appear -- email is valid and should be omitted.');
        } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "reports both fields when both are invalid", hidden: false },
        {
          id: "t2",
          description: "returns an empty object when the form is fully valid",
          hidden: false,
        },
        { id: "t3", description: "omits valid fields from the errors object", hidden: false },
      ],
      hints: [
        "Only add a key to the errors object if that field's validator returned a non-null message.",
        "An empty errors object is exactly how a component decides whether it's safe to submit.",
      ],
    },
    guidedLocalLab: {
      id: "react-forms-lab",
      title: "Build a Validated Signup Form Locally",
      scenario:
        "Set up a real Vite + React project on your own machine and build a controlled signup form (name, email, password) with live validation, reusing the validateEmail/validatePassword logic style from this lesson's browser exercises inside a real component.",
      requiredTools: [
        { name: "Node.js", version: "20.x LTS or newer" },
        { name: "npm", version: "10.x (bundled with Node.js)" },
      ],
      setupSteps: [
        "Run `npm create vite@latest signup-form -- --template react` in a terminal.",
        "Run `cd signup-form && npm install`.",
        "Replace the contents of `src/App.jsx` with the starter file below.",
        "Run `npm run dev` and open the printed local URL in your browser.",
      ],
      projectStructure: "signup-form/\n  src/\n    App.jsx\n    main.jsx\n  package.json",
      starterFiles: [
        {
          path: "src/App.jsx",
          content: `import { useState } from "react";

function validateEmail(email) {
  if (email.length === 0) return "Email is required.";
  if (!email.includes("@")) return "Email must contain an @ symbol.";
  return null;
}

function validatePassword(password) {
  if (password.length === 0) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

export default function App() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(field) {
    return (e) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      if (touched[field]) {
        validateField(field, next[field]);
      }
    };
  }

  function validateField(field, value) {
    // TODO: call validateEmail/validatePassword for the right field,
    // update the errors state for just this field.
  }

  function handleBlur(field) {
    return () => {
      setTouched({ ...touched, [field]: true });
      validateField(field, values[field]);
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: validate every field, and only proceed if there are no errors.
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input value={values.name} onChange={handleChange("name")} onBlur={handleBlur("name")} />
      </label>
      <label>
        Email
        <input value={values.email} onChange={handleChange("email")} onBlur={handleBlur("email")} />
        {errors.email && <p role="alert">{errors.email}</p>}
      </label>
      <label>
        Password
        <input
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
        />
        {errors.password && <p role="alert">{errors.password}</p>}
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
}`,
        },
      ],
      requirements: [
        "Every input is controlled (its value comes from state, never read directly from the DOM)",
        "Each field validates on blur the first time, then live on every keystroke once it has shown an error",
        "The submit handler validates all fields and does not proceed if any field is invalid",
        "Error messages are specific (state what's wrong), not a generic 'invalid' message",
      ],
      commands: [
        { description: "Start the dev server", command: "npm run dev" },
        {
          description: "Build for production (sanity check only, not required to complete the lab)",
          command: "npm run build",
        },
      ],
      expectedBehavior:
        "Typing in the email field and leaving it (blur) with an invalid value shows a specific error message beneath the field. Fixing the value and typing further updates the error live. Submitting with any invalid field does not proceed and shows all relevant errors.",
      verificationSteps: [
        {
          command:
            "In the running app, leave the email field empty and click into the password field",
          expectedResult: "An 'Email is required.' message appears beneath the email field",
        },
        {
          command:
            "Type a valid email and a password shorter than 8 characters, then click Sign up",
          expectedResult:
            "The form does not submit, and the password field shows its specific length error",
        },
        {
          command:
            "Fill in a valid name, email, and an 8+ character password with a digit, then click Sign up",
          expectedResult:
            "No error messages are shown (you can confirm submission by adding a temporary console.log inside handleSubmit)",
        },
      ],
      troubleshooting: [
        {
          issue: "Typing in a field doesn't update what's displayed",
          fix: "Confirm the input's value prop is bound to state and onChange calls setValues — an uncontrolled input (no value prop bound to state) won't reflect keystrokes back through React.",
        },
        {
          issue: "`npm run dev` fails immediately with a module error",
          fix: "Delete the node_modules folder and package-lock.json, then run npm install again — a partial or interrupted install is the most common cause.",
        },
        {
          issue: "Errors never appear even with invalid input",
          fix: "Check that validateField is actually being called from both handleBlur and handleChange (once touched), and that it calls setErrors with the new message.",
        },
      ],
      hints: [
        "validateField should call validateEmail or validatePassword based on which field name it receives, then update errors with setErrors({ ...errors, [field]: message }).",
        "handleSubmit should run validateField for every field (not just the ones already touched), then check whether any error exists before proceeding.",
      ],
      referenceSolution: {
        summary:
          "The two TODOs are filled in: validateField dispatches to the right validator by field name and updates just that field's error; handleSubmit validates every field unconditionally, marks all fields touched (so newly-revealed errors show immediately), and only proceeds when the resulting errors object is empty.",
        files: [
          {
            path: "src/App.jsx (relevant excerpt)",
            content: `function validateField(field, value) {
  const message =
    field === "email" ? validateEmail(value) :
    field === "password" ? validatePassword(value) :
    null;
  setErrors((prev) => {
    const next = { ...prev };
    if (message) next[field] = message;
    else delete next[field];
    return next;
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const allTouched = { name: true, email: true, password: true };
  setTouched(allTouched);
  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);
  const nextErrors = {};
  if (emailError) nextErrors.email = emailError;
  if (passwordError) nextErrors.password = passwordError;
  setErrors(nextErrors);
  if (Object.keys(nextErrors).length === 0) {
    console.log("Submitting:", values);
  }
}`,
          },
        ],
      },
      extensionChallenge:
        "Add a fourth field, 'confirmPassword', that must match 'password' exactly, with its own specific error message when it doesn't.",
    },
    commonMistakes: [
      "Setting an input's initial value with `defaultValue` instead of `value`, accidentally making it uncontrolled while still trying to read/write it through state elsewhere.",
      "Validating every field on every keystroke from the very first character, producing an aggressively red, discouraging form before the user has finished typing anything.",
      "Showing a generic 'invalid' message instead of stating specifically what's wrong and how to fix it.",
    ],
    quiz: [
      {
        id: "react-7-q1",
        prompt: "What makes an input 'controlled' in React?",
        choices: [
          "It has an onClick handler",
          "Its value is driven by React state, updated via onChange, so state is the single source of truth",
          "It uses the required HTML attribute",
          "It is rendered inside a <form> element",
        ],
        correctIndex: 1,
        explanation:
          "A controlled input's displayed value always comes from state — the DOM element itself is never the authoritative source of what it currently holds.",
      },
      {
        id: "react-7-q2",
        prompt:
          "Why is 'Invalid input' considered weak validation feedback compared to 'Password must be at least 8 characters'?",
        choices: [
          "There is no meaningful difference",
          "The specific message tells the user exactly what to fix; the generic one gives no actionable information",
          "Generic messages are faster to render",
          "Specific messages are required by HTML5 validation",
        ],
        correctIndex: 1,
        explanation:
          "Specific, actionable error messages are a real usability requirement, not a nice-to-have — a generic message forces the user to guess.",
      },
      {
        id: "react-7-q3",
        prompt:
          "Why does this lesson use a guided local lab instead of a browser Run button for the actual form component?",
        choices: [
          "The site can execute React components but chooses not to",
          "This platform has no React runtime/JSX compiler in its browser sandbox, so real component work must run in a genuine local project",
          "Forms are too complex to run in any browser",
          "Guided local labs are faster than a real Run button",
        ],
        correctIndex: 1,
        explanation:
          "The platform's browser runners don't include a React/JSX build pipeline — a guided local lab is the honest way to have learners build a real component without a fake or misleading in-browser simulation.",
      },
    ],
    takeaway:
      "Controlled inputs keep React state as the single source of truth for form data, and good validation gives specific, timed-appropriately feedback — this lesson's real component work happens on your own machine, in a real Vite + React project.",
    summary:
      "This lesson covered controlled inputs and validation-message design through browser exercises, then built a genuinely controlled, validated signup form in a real local React project via the guided local lab.",
    nextLessonSlug: "react-ui-states",
  },
  {
    id: "react-ui-states",
    slug: "react-ui-states",
    title: "Loading, Empty, Error, and Success States",
    description:
      "Every piece of asynchronous UI has at least four states. Designing for all four from the start — not just the happy path — is what separates a real component from a demo.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["react-forms-validation"],
    objectives: [
      "Name the four states any data-driven UI needs to handle explicitly",
      "Derive the current UI state from raw data rather than tracking it separately",
      "Explain why an empty state is not the same as an error state",
    ],
    skills: ["react", "ui-states"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: You Might Not Need an Effect",
        url: "https://react.dev/learn/you-might-not-need-an-effect",
      },
    ],
    keywords: ["react", "loading state", "empty state", "error state", "ui states"],
    explanation: `A tutorial's version of a course list renders the courses. A real one has to answer at least four questions before it can render anything at all: **is the data still loading? did loading fail? did loading succeed but return nothing? or did it succeed with real data to show?** Skipping any of the first three means real users hit a blank screen, a frozen spinner, or a wall of undefined values — not hypothetically, but the very first time their network is slow or a filter matches nothing.

The tempting-but-wrong approach is tracking each of these as its own separate boolean: \`isLoading\`, \`isError\`, \`isEmpty\`, \`hasData\` — four independent flags that can drift out of sync with each other (what does the UI do if \`isLoading\` and \`isError\` are somehow both true at once? That state shouldn't exist, but nothing prevents it). The more robust approach **derives the current state from the actual data**, computed fresh every render, so an invalid combination is structurally impossible rather than merely unlikely:

\`\`\`js
function deriveUiState({ isLoading, error, items }) {
  if (isLoading) return "loading";
  if (error) return "error";
  if (items.length === 0) return "empty";
  return "success";
}
\`\`\`

One value, always consistent with the underlying data, checked in one place, rendered with one \`switch\` or chain of conditionals. **An empty state and an error state are not the same thing and should never share UI.** "No courses match your filters — try clearing them" is helpful and expected. "Something went wrong loading courses — try again" is a failure. Showing the error UI for a legitimately empty result (or the empty-state UI when the request actually failed) both mislead the user about what's actually true and what they should do about it.`,
    example: {
      language: "javascript",
      description:
        "Deriving one clean state value from raw data, instead of juggling independent booleans that could contradict each other.",
      code: `function deriveUiState({ isLoading, error, items }) {
  if (isLoading) return "loading";
  if (error) return "error";
  if (items.length === 0) return "empty";
  return "success";
}

console.log(deriveUiState({ isLoading: true, error: null, items: [] }));   // "loading"
console.log(deriveUiState({ isLoading: false, error: "Network error", items: [] })); // "error"
console.log(deriveUiState({ isLoading: false, error: null, items: [] }));  // "empty"
console.log(deriveUiState({ isLoading: false, error: null, items: [1, 2] })); // "success"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call deriveUiState with isLoading AND error both truthy — which one should 'win'? Check the function's actual order of checks.",
      code: `function deriveUiState({ isLoading, error, items }) {
  if (isLoading) return "loading";
  if (error) return "error";
  if (items.length === 0) return "empty";
  return "success";
}

console.log(deriveUiState({ isLoading: true, error: "oops", items: [] }));`,
      editable: true,
    },
    guidedExercise: {
      id: "react-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using deriveUiState already defined, classify three scenarios by calling it: scenarioA (a search that legitimately matched zero results, not loading, no error), scenarioB (the request is still in flight), scenarioC (the request failed with a network error). Store each result.",
      starterCode: `function deriveUiState({ isLoading, error, items }) {
  if (isLoading) return "loading";
  if (error) return "error";
  if (items.length === 0) return "empty";
  return "success";
}

let scenarioA = ""; // TODO
let scenarioB = ""; // TODO
let scenarioC = ""; // TODO
`,
      solutionCode: `function deriveUiState({ isLoading, error, items }) {
  if (isLoading) return "loading";
  if (error) return "error";
  if (items.length === 0) return "empty";
  return "success";
}

let scenarioA = deriveUiState({ isLoading: false, error: null, items: [] });
let scenarioB = deriveUiState({ isLoading: true, error: null, items: [] });
let scenarioC = deriveUiState({ isLoading: false, error: "Network error", items: [] });`,
      harness: `
        try { window.__report('t1', scenarioA === 'empty', 'Zero results with no error and not loading is the empty state.'); } catch (e) { window.__report('t1', false, 'scenarioA is not defined: ' + e.message); }
        try { window.__report('t2', scenarioB === 'loading', 'A request still in flight is the loading state.'); } catch (e) { window.__report('t2', false, 'scenarioB is not defined: ' + e.message); }
        try { window.__report('t3', scenarioC === 'error', 'A failed request is the error state.'); } catch (e) { window.__report('t3', false, 'scenarioC is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly derives the empty state", hidden: false },
        { id: "t2", description: "correctly derives the loading state", hidden: false },
        { id: "t3", description: "correctly derives the error state", hidden: false },
      ],
      hints: [
        "Call deriveUiState with an object literal matching each scenario's description.",
        "A legitimately empty result is not an error — no error was thrown, the request just returned nothing.",
      ],
    },
    independentExercise: {
      id: "react-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function stateMessage(state) that maps each of the four states ('loading', 'error', 'empty', 'success') to a distinct, user-facing message string. Any other input should return 'Unknown state'.",
      starterCode: `function stateMessage(state) {
  // TODO
}
`,
      solutionCode: `function stateMessage(state) {
  switch (state) {
    case "loading": return "Loading courses...";
    case "error": return "Something went wrong loading courses. Try again.";
    case "empty": return "No courses match your filters. Try clearing them.";
    case "success": return "Courses loaded.";
    default: return "Unknown state";
  }
}`,
      harness: `
        try { window.__report('t1', typeof stateMessage('loading') === 'string' && stateMessage('loading').length > 0, 'loading should have a real message.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const messages = ['loading', 'error', 'empty', 'success'].map(stateMessage);
          window.__report('t2', new Set(messages).size === 4, 'All four states should have distinct messages.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', stateMessage('bogus') === 'Unknown state', 'An unrecognized state should return the fallback message.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "loading has a real message", hidden: false },
        { id: "t2", description: "all four states have distinct messages", hidden: false },
        { id: "t3", description: "an unknown state falls back correctly", hidden: false },
      ],
      hints: [
        "Each of the four cases needs its own distinct, specific message — not a shared generic one.",
        "Don't forget the default case for anything unrecognized.",
      ],
    },
    commonMistakes: [
      "Tracking isLoading, isError, and isEmpty as independent booleans instead of deriving one consistent state value, allowing impossible combinations to accidentally occur.",
      "Rendering the error UI for a legitimately empty result, or the empty-state UI when the request actually failed — misleading the user about what's actually true.",
      "Forgetting the loading state entirely and letting the UI flash blank or stale content while a request is in flight.",
    ],
    quiz: [
      {
        id: "react-8-q1",
        prompt: "What are the four states most data-driven UI needs to handle?",
        choices: [
          "Open, closed, hovered, focused",
          "Loading, error, empty, and success",
          "Mounted, unmounted, updating, idle",
          "Draft, published, archived, deleted",
        ],
        correctIndex: 1,
        explanation:
          "These four cover the realistic outcomes of any asynchronous data operation — a component that only handles success is incomplete.",
      },
      {
        id: "react-8-q2",
        prompt:
          "Why is deriving a single UI state value from data preferred over tracking isLoading/isError/isEmpty as separate booleans?",
        choices: [
          "It's not preferred — separate booleans are always better",
          "Independent booleans can contradict each other (e.g. both isLoading and isError true), while a derived value is always consistent with the actual data",
          "Separate booleans use less memory",
          "Derived values can't be used in JSX",
        ],
        correctIndex: 1,
        explanation:
          "Deriving state makes invalid combinations structurally impossible instead of merely unlikely, since the value is recomputed from the real data every time.",
      },
      {
        id: "react-8-q3",
        prompt: "Why must the empty state and the error state use different UI?",
        choices: [
          "They don't need to differ — one generic message covers both",
          "They communicate genuinely different situations, and showing the wrong one misleads the user about what happened and what to do next",
          "Empty states are only relevant for search features",
          "Error states should never be shown to users",
        ],
        correctIndex: 1,
        explanation:
          'A legitimately empty result ("no matches, try adjusting filters") and a failure ("something went wrong, try again") call for different messaging and different next actions.',
      },
    ],
    takeaway:
      "Real data-driven UI handles four states — loading, error, empty, success — derived from the actual data in one place, rather than tracked as independent booleans that can silently contradict each other.",
    summary:
      "This lesson covered deriving a single consistent UI state from raw data and explained why the empty and error states specifically must never share UI, since they mean genuinely different things to the user.",
    nextLessonSlug: "react-effects-lifecycle",
  },
  {
    id: "react-effects-lifecycle",
    slug: "react-effects-lifecycle",
    title: "Effects: Synchronizing with the Outside World",
    description:
      'useEffect exists to synchronize a component with something outside React — not as a general-purpose "run this after render" hook. The dependency array is the exact algorithm behind when it re-runs.',
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["react-ui-states"],
    objectives: [
      "Explain what kind of work belongs in an effect versus in an event handler",
      "Implement the shallow-equality check that decides whether an effect re-runs",
      "Explain when and why an effect needs a cleanup function",
    ],
    skills: ["react", "effects", "useeffect"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Synchronizing with Effects",
        url: "https://react.dev/learn/synchronizing-with-effects",
      },
      {
        label: "React docs: Lifecycle of Reactive Effects",
        url: "https://react.dev/learn/lifecycle-of-reactive-effects",
      },
    ],
    keywords: ["react", "useeffect", "effects", "dependency array", "cleanup"],
    explanation: `\`useEffect\` is not a generic "run some code after render" escape hatch — it exists specifically to **synchronize a component with a system outside React's own rendering**: a browser API (setting \`document.title\`, subscribing to \`window.resize\`), a network request, a WebSocket connection, a third-party widget. If the code you're writing doesn't reach outside React — it's just deriving one value from another, or responding to a user action — it almost certainly belongs directly in the render body (for derived values) or an event handler (for user-triggered work), not an effect. This distinction avoids a huge share of effect-related bugs, because most of them come from using an effect where an event handler or a plain derived value would have been simpler and correct.

**The dependency array is a literal algorithm, not a hint.** After every render, React compares each value in the new dependency array to the corresponding value from the previous render, using the same kind of shallow \`Object.is\`-style comparison you could implement yourself. If every dependency is unchanged, the effect is skipped entirely; if even one changed, the effect re-runs. An empty array (\`[]\`) means "no dependencies, so nothing can ever differ — run once, after the first render, and never again." Omitting the array entirely means "run after every single render," rarely what's actually intended.

**Cleanup exists because "starting" something and "stopping" it are a pair, not a one-time action.** A subscription needs to unsubscribe; an interval needs to be cleared; an in-flight request's *result* needs to be ignored if the component using it is no longer around to receive it. The function an effect optionally returns runs before the effect re-runs (cleaning up the previous run's setup) and once more when the component unmounts entirely — the same cleanup function handles both cases, because they're the same underlying situation: "this effect's setup is no longer valid, undo it before doing anything else."`,
    example: {
      language: "javascript",
      description:
        "A real implementation of the shallow comparison React's dependency-array check is conceptually built on.",
      code: `function dependenciesChanged(prevDeps, nextDeps) {
  if (prevDeps === null) return true; // first render: always "changed"
  if (prevDeps.length !== nextDeps.length) return true;
  return prevDeps.some((dep, i) => !Object.is(dep, nextDeps[i]));
}

console.log(dependenciesChanged(null, [1, "a"]));        // true -- first render
console.log(dependenciesChanged([1, "a"], [1, "a"]));    // false -- nothing changed, skip the effect
console.log(dependenciesChanged([1, "a"], [2, "a"]));    // true -- first dependency changed`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Try comparing two arrays containing objects with the same shape but different references -- what happens, and why?",
      code: `function dependenciesChanged(prevDeps, nextDeps) {
  if (prevDeps === null) return true;
  if (prevDeps.length !== nextDeps.length) return true;
  return prevDeps.some((dep, i) => !Object.is(dep, nextDeps[i]));
}

console.log(dependenciesChanged([{ id: 1 }], [{ id: 1 }]));`,
      editable: true,
    },
    guidedExercise: {
      id: "react-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using dependenciesChanged already defined, determine whether an effect with dependency array [userId, sortOrder] would re-run given prevDeps = [42, 'asc'] and nextDeps = [42, 'desc']. Store the result in willRerun.",
      starterCode: `function dependenciesChanged(prevDeps, nextDeps) {
  if (prevDeps === null) return true;
  if (prevDeps.length !== nextDeps.length) return true;
  return prevDeps.some((dep, i) => !Object.is(dep, nextDeps[i]));
}

const prevDeps = [42, "asc"];
const nextDeps = [42, "desc"];
let willRerun = null; // TODO
`,
      solutionCode: `function dependenciesChanged(prevDeps, nextDeps) {
  if (prevDeps === null) return true;
  if (prevDeps.length !== nextDeps.length) return true;
  return prevDeps.some((dep, i) => !Object.is(dep, nextDeps[i]));
}

const prevDeps = [42, "asc"];
const nextDeps = [42, "desc"];
let willRerun = dependenciesChanged(prevDeps, nextDeps);`,
      harness: `
        try { window.__report('t1', willRerun === true, 'sortOrder changed from "asc" to "desc", so the effect should re-run.'); } catch (e) { window.__report('t1', false, 'willRerun is not defined: ' + e.message); }
      `,
      tests: [{ id: "t1", description: "correctly determines the effect re-runs", hidden: false }],
      hints: [
        "Call dependenciesChanged with the two arrays given.",
        "userId is unchanged, but sortOrder differs -- even one changed dependency is enough to re-run.",
      ],
    },
    independentExercise: {
      id: "react-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Model an effect's setup/cleanup pair as an object. Write createSubscriptionEffect() returning { isActive: boolean, start(), stop() } where start() sets isActive to true, and stop() (the cleanup) sets isActive to false. Then write runEffectCycle(effect) that calls start(), then immediately calls stop() (simulating a re-run or unmount), and returns the final isActive value.",
      starterCode: `function createSubscriptionEffect() {
  // TODO: return { isActive, start, stop }
}

function runEffectCycle(effect) {
  // TODO: call start(), then stop(), and return the final isActive value
}
`,
      solutionCode: `function createSubscriptionEffect() {
  const state = { isActive: false };
  return {
    get isActive() { return state.isActive; },
    start() { state.isActive = true; },
    stop() { state.isActive = false; },
  };
}

function runEffectCycle(effect) {
  effect.start();
  effect.stop();
  return effect.isActive;
}`,
      harness: `
        try {
          const effect = createSubscriptionEffect();
          window.__report('t1', effect.isActive === false, 'A fresh effect should start inactive.');
          const finalState = runEffectCycle(effect);
          window.__report('t2', finalState === false, 'After start() then stop() (cleanup), the effect should be inactive again.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "starts inactive", hidden: false },
        {
          id: "t2",
          description: "cleanup correctly deactivates after a start/stop cycle",
          hidden: false,
        },
      ],
      hints: [
        "start() and stop() are a genuine pair -- this models exactly what an effect's setup and its returned cleanup function do.",
        "runEffectCycle should call both in order and report the state after both have run.",
      ],
    },
    commonMistakes: [
      "Using an effect to compute a value that could be calculated directly during render instead, adding an unnecessary extra render cycle.",
      "Omitting the dependency array entirely, causing the effect to run after every single render instead of only when something relevant changed.",
      "Starting a subscription, timer, or request in an effect without returning a cleanup function, leaking it every time the effect re-runs or the component unmounts.",
    ],
    quiz: [
      {
        id: "react-9-q1",
        prompt: "What kind of work does useEffect exist for?",
        choices: [
          "Any code that should run after render, for any reason",
          "Synchronizing a component with something outside React's own rendering, like a browser API or a network request",
          "Deriving one value from another",
          "Handling button clicks",
        ],
        correctIndex: 1,
        explanation:
          "Effects are specifically for reaching outside React's rendering system — derived values belong in the render body, and user actions belong in event handlers.",
      },
      {
        id: "react-9-q2",
        prompt: "What does an empty dependency array (`[]`) mean for an effect?",
        choices: [
          "The effect never runs at all",
          "The effect runs once after the first render and never again, since nothing in an empty list can ever differ",
          "The effect runs after every render",
          "This is a syntax error",
        ],
        correctIndex: 1,
        explanation:
          'With no dependencies to compare, there\'s nothing that can ever be "different" between renders, so the effect only runs on mount.',
      },
      {
        id: "react-9-q3",
        prompt:
          "Why does an effect's cleanup function run before the effect re-runs, not just on unmount?",
        choices: [
          "It doesn't — cleanup only ever runs on unmount",
          "The previous run's setup is no longer valid once the effect is about to re-run, so it must be undone first, the same as it would be on unmount",
          "This is a performance optimization with no functional purpose",
          "Cleanup functions are optional and rarely needed",
        ],
        correctIndex: 1,
        explanation:
          'Re-running and unmounting are the same underlying situation from the previous setup\'s perspective — "this setup is no longer valid" — so the same cleanup handles both.',
      },
    ],
    takeaway:
      "useEffect synchronizes with the outside world, not a general after-render hook — the dependency array is a real shallow-comparison algorithm, and cleanup exists because starting and stopping something are always a pair.",
    summary:
      "This lesson implemented the shallow-comparison algorithm behind the dependency array and explained why effects need cleanup functions, distinguishing effect-appropriate work from what belongs in render or an event handler.",
    nextLessonSlug: "react-data-fetching",
  },
  {
    id: "react-data-fetching",
    slug: "react-data-fetching",
    title: "Fetching Data: Races, Stale Responses, and Cleanup",
    description:
      "The most common real bug in data-fetching components: a slower, earlier request's response arriving after a faster, later one, silently overwriting the correct data. Build a real fetch-driven component locally.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 32,
    prerequisites: ["react-effects-lifecycle"],
    objectives: [
      "Explain how a race condition between two requests can overwrite correct data with stale data",
      "Implement a request-token guard that ignores out-of-order responses",
      "Build a real component with proper data-fetching, loading, and cleanup behavior on your own machine",
    ],
    skills: ["react", "data-fetching", "race-conditions"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Synchronizing with Effects — Fetching data",
        url: "https://react.dev/learn/synchronizing-with-effects#fetching-data",
      },
    ],
    keywords: ["react", "data fetching", "race condition", "stale response", "useeffect cleanup"],
    explanation: `A search box triggers a fetch on every keystroke. The user types "re", then quickly "react". Two requests are now in flight: one for "re", one for "react". There's no guarantee they resolve in the order they were sent — if the network happens to return the "re" response *after* the "react" response, the UI ends up showing results for "re" even though the input clearly reads "react". This is a **race condition**, and it is one of the single most common real bugs in data-fetching components — not an exotic edge case, but a routine consequence of fast typing on an ordinary connection.

**The fix is a request-token guard**: before starting a new request, record a token unique to that specific request (a simple incrementing counter is enough). When the request resolves, only apply its result if that token still matches "the latest request that was started." A response from a request that's no longer the latest one is, by definition, stale — its result is real data, correctly fetched, and *still wrong to display*, because something newer superseded it before it arrived.

\`\`\`js
let latestRequestId = 0;
function fetchResults(query) {
  const thisRequestId = ++latestRequestId;
  fetchFromServer(query).then((data) => {
    if (thisRequestId === latestRequestId) {
      setResults(data); // only apply if nothing newer has started since
    }
  });
}
\`\`\`

This is exactly what an effect's **cleanup function** is for in a data-fetching effect: mark the previous request as stale before starting a new one. Every real production data-fetching hook (React Query, SWR, and the pattern React's own docs recommend by hand) implements some version of this guard — it is not an advanced-only concern, it's the baseline correctness requirement for fetching data driven by anything that can change quickly, like a search input or a fast-clicking filter.

This lesson's guided local lab builds a real, race-condition-safe course list component that fetches and filters data locally, on your own machine.`,
    example: {
      language: "javascript",
      description:
        "A simulated race condition between two requests, and the request-token guard that correctly resolves it -- deterministic, no real network call.",
      code: `let latestRequestId = 0;
let lastAppliedResult = null;

function simulateFetch(query, resolveOrder) {
  const thisRequestId = ++latestRequestId;
  // "resolveOrder" simulates network timing: lower numbers resolve first.
  return { thisRequestId, query, resolveOrder };
}

function applyIfStillLatest(response) {
  if (response.thisRequestId === latestRequestId) {
    lastAppliedResult = response.query;
  }
}

const reqA = simulateFetch("re", 1);   // started first
const reqB = simulateFetch("react", 2); // started second, becomes "latest"

// Simulate B's response arriving first, then A's arriving late:
applyIfStillLatest(reqB);
applyIfStillLatest(reqA); // stale -- ignored, because latestRequestId has moved on

console.log(lastAppliedResult); // "react" -- correct, even though A's response arrived last`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Remove the applyIfStillLatest guard (call the assignment directly instead) and see the wrong, stale result win.",
      code: `let latestRequestId = 0;
let lastAppliedResult = null;

function simulateFetch(query) {
  const thisRequestId = ++latestRequestId;
  return { thisRequestId, query };
}

function applyIfStillLatest(response) {
  if (response.thisRequestId === latestRequestId) {
    lastAppliedResult = response.query;
  }
}

const reqA = simulateFetch("re");
const reqB = simulateFetch("react");
applyIfStillLatest(reqB);
applyIfStillLatest(reqA);
console.log(lastAppliedResult);`,
      editable: true,
    },
    guidedExercise: {
      id: "react-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isStaleResponse(responseRequestId, latestRequestId) that returns true if a response's request id no longer matches the latest request id (meaning it should be ignored), false if it's still current.",
      starterCode: `function isStaleResponse(responseRequestId, latestRequestId) {
  // TODO
}
`,
      solutionCode: `function isStaleResponse(responseRequestId, latestRequestId) {
  return responseRequestId !== latestRequestId;
}`,
      harness: `
        try { window.__report('t1', isStaleResponse(1, 2) === true, 'Request 1 response arriving when request 2 is latest is stale.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', isStaleResponse(2, 2) === false, 'Request 2 own response, when 2 is still latest, is current, not stale.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a stale response", hidden: false },
        { id: "t2", description: "correctly identifies a current response", hidden: false },
      ],
      hints: [
        "A response is stale precisely when its own request id no longer matches the latest one.",
        "This is the entire guard, in one line.",
      ],
    },
    independentExercise: {
      id: "react-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function createRequestGuard() returning { start(), isCurrent(id) }: start() increments and returns a new request id (the 'latest'), and isCurrent(id) returns whether the given id still matches the latest one started.",
      starterCode: `function createRequestGuard() {
  // TODO: return { start, isCurrent }
}
`,
      solutionCode: `function createRequestGuard() {
  let latest = 0;
  return {
    start() {
      latest += 1;
      return latest;
    },
    isCurrent(id) {
      return id === latest;
    },
  };
}`,
      harness: `
        try {
          const guard = createRequestGuard();
          const idA = guard.start();
          const idB = guard.start();
          window.__report('t1', guard.isCurrent(idB) === true, 'The most recently started request id should be current.');
          window.__report('t2', guard.isCurrent(idA) === false, 'An earlier request id should no longer be current once a newer one started.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "the latest request id is current", hidden: false },
        { id: "t2", description: "an earlier request id is correctly stale", hidden: false },
      ],
      hints: [
        "start() should increment an internal counter and return the new value as the request's id.",
        "isCurrent should compare the given id against whatever the internal counter currently holds.",
      ],
    },
    guidedLocalLab: {
      id: "react-fetching-lab",
      title: "Build a Race-Condition-Safe Course List Locally",
      scenario:
        "Extend a real local React project with a component that fetches a mock course list based on a search input, correctly guarding against race conditions and cleaning up on unmount, using the four UI states from the previous lesson.",
      requiredTools: [
        { name: "Node.js", version: "20.x LTS or newer" },
        { name: "npm", version: "10.x (bundled with Node.js)" },
      ],
      setupSteps: [
        "Reuse the Vite + React project from the previous lesson's lab (or run `npm create vite@latest course-search -- --template react` for a fresh one).",
        "Add the mock API file below as `src/mockApi.js`.",
        "Replace `src/App.jsx` with the starter file below.",
        "Run `npm run dev` and open the printed local URL.",
      ],
      projectStructure:
        "course-search/\n  src/\n    App.jsx\n    mockApi.js\n    main.jsx\n  package.json",
      starterFiles: [
        {
          path: "src/mockApi.js",
          content: `const ALL_COURSES = [
  { id: 1, title: "HTML & CSS Fundamentals" },
  { id: 2, title: "JavaScript Fundamentals" },
  { id: 3, title: "TypeScript Foundations" },
  { id: 4, title: "React Application Development" },
];

// Simulates a real network call with a random delay, so responses can
// genuinely arrive out of order -- deliberately, to make the race condition
// this lab guards against reproducible.
export function searchCourses(query) {
  const delayMs = Math.random() * 800;
  const results = ALL_COURSES.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()),
  );
  return new Promise((resolve) => setTimeout(() => resolve(results), delayMs));
}`,
        },
        {
          path: "src/App.jsx",
          content: `import { useEffect, useState } from "react";
import { searchCourses } from "./mockApi";

export default function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: guard against race conditions using a request-token or an
    // "ignore" flag set by the cleanup function, so a slow, stale response
    // can never overwrite a newer, faster one.
    setIsLoading(true);
    searchCourses(query)
      .then((results) => {
        setItems(results);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setIsLoading(false);
      });
  }, [query]);

  const uiState = isLoading ? "loading" : error ? "error" : items.length === 0 ? "empty" : "success";

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses..."
        aria-label="Search courses"
      />
      {uiState === "loading" && <p>Loading...</p>}
      {uiState === "error" && <p role="alert">Something went wrong.</p>}
      {uiState === "empty" && <p>No courses match your search.</p>}
      {uiState === "success" && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
        },
      ],
      requirements: [
        "Typing quickly never leaves the list showing results for an earlier, now-outdated query",
        "The effect's cleanup function marks the in-flight request as no longer relevant before the next one starts",
        "The four UI states (loading, error, empty, success) are all reachable and visually distinct",
        "No console errors or warnings appear, including no 'state update on an unmounted component' warning",
      ],
      commands: [{ description: "Start the dev server", command: "npm run dev" }],
      expectedBehavior:
        "Typing a query quickly (e.g. 'r' then 'rea' then 'react' within under a second) always ends up showing results for 'react' specifically, never briefly or permanently showing results for 'r' or 'rea', regardless of the random simulated network delay.",
      verificationSteps: [
        {
          command:
            "Type quickly into the search box: r, then rea, then react, within about a second",
          expectedResult:
            "The final displayed list always matches 'react' -- open the console and confirm no stray state updates after the component would be considered stale",
        },
        {
          command: "Clear the search box entirely",
          expectedResult:
            "All four courses are shown (an empty query matches everything via includes(''))",
        },
        {
          command: "Type a query that matches nothing, like 'zzz'",
          expectedResult: "The empty state message appears, not the error state",
        },
      ],
      troubleshooting: [
        {
          issue: "Occasionally the wrong, outdated results flash on screen",
          fix: "Confirm the effect's cleanup function actually sets an 'ignore' flag (or checks a request id) that the .then() callback reads before calling setItems -- without it, every in-flight promise still resolves and unconditionally overwrites state.",
        },
        {
          issue: "React warns about updating state on an unmounted component",
          fix: "The same ignore-flag/request-id guard that fixes race conditions also fixes this -- the cleanup function should prevent the stale .then() callback from calling setState at all once it's no longer relevant.",
        },
      ],
      hints: [
        "A boolean 'ignore' flag set to true inside the cleanup function, checked before each setState call in .then(), is the simplest version of this guard.",
        "The cleanup function runs both when the effect re-runs (a new query was typed) and when the component unmounts -- both cases need the guard.",
      ],
      referenceSolution: {
        summary:
          "The effect declares a local ignore flag, checks it before each setState call inside the .then()/.catch() handlers, and returns a cleanup function that sets ignore to true -- so a request that's no longer the latest (or whose component unmounted) can resolve without ever touching state.",
        files: [
          {
            path: "src/App.jsx (relevant excerpt)",
            content: `useEffect(() => {
  let ignore = false;
  setIsLoading(true);
  setError(null);
  searchCourses(query)
    .then((results) => {
      if (!ignore) {
        setItems(results);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      if (!ignore) {
        setError(String(err));
        setIsLoading(false);
      }
    });
  return () => {
    ignore = true;
  };
}, [query]);`,
          },
        ],
      },
      extensionChallenge:
        "Add a 300ms debounce so a fetch only starts after the user pauses typing, rather than on every keystroke -- measure how much it reduces the number of in-flight requests during fast typing.",
    },
    commonMistakes: [
      "Fetching on every keystroke with no guard against out-of-order responses, letting a slow early request silently overwrite a fast later one.",
      "Forgetting the cleanup function entirely in a data-fetching effect, causing both race conditions and 'update on unmounted component' warnings.",
      "Assuming race conditions are rare -- on a real network with variable latency, they are a routine, frequent occurrence for any fast-changing input.",
    ],
    quiz: [
      {
        id: "react-10-q1",
        prompt: "What causes a race condition in a search-as-you-type component?",
        choices: [
          "The browser rendering too slowly",
          "An earlier request's response can arrive after a later request's response, since network timing has no guaranteed order",
          "React batches state updates incorrectly",
          "This can only happen with a broken server",
        ],
        correctIndex: 1,
        explanation:
          "Multiple in-flight requests have no guaranteed resolution order -- a later request can easily resolve before an earlier one, and without a guard, whichever resolves last simply overwrites state.",
      },
      {
        id: "react-10-q2",
        prompt: "How does a request-token (or ignore-flag) guard fix this?",
        choices: [
          "It cancels the actual network request",
          "It lets the effect ignore a response that's no longer associated with the latest request, even though the response itself arrived successfully",
          "It slows down all requests to the same speed",
          "It prevents the user from typing quickly",
        ],
        correctIndex: 1,
        explanation:
          "The guard doesn't prevent the stale response from arriving -- it prevents that response's data from being applied to state once something newer has superseded it.",
      },
      {
        id: "react-10-q3",
        prompt:
          "Why does the SAME cleanup function handle both 're-run' and 'unmount' cases for a data-fetching effect?",
        choices: [
          "It doesn't -- two separate functions are required",
          "Both situations mean the same thing from the in-flight request's perspective: it's no longer relevant and its result should be ignored",
          "Unmount cleanup is optional and can be skipped",
          "This only applies to class components",
        ],
        correctIndex: 1,
        explanation:
          "Whether the effect is about to re-run with a new query or the component is going away entirely, the outstanding request is equally stale from that point forward.",
      },
    ],
    takeaway:
      "Race conditions between out-of-order responses are a routine, frequent bug in real data-fetching components, not an edge case -- a request-token or ignore-flag guard, set by the effect's cleanup function, is the baseline fix.",
    summary:
      "This lesson implemented a request-token guard against race conditions in browser exercises, then built a real, race-condition-safe search-driven component with all four UI states in a local React project via the guided local lab.",
    nextLessonSlug: "react-composition-hooks",
  },
  {
    id: "react-composition-hooks",
    slug: "react-composition-hooks",
    title: "Composition and Custom Hooks",
    description:
      "Two ways to reuse logic in React: composing components together, and extracting stateful logic into a custom hook. Knowing which tool fits which problem.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["react-data-fetching"],
    objectives: [
      "Distinguish component composition from custom hooks as two different reuse mechanisms",
      "Extract a piece of stateful logic into a reusable custom hook shape",
      "Explain the naming convention and rule that makes a function a valid hook",
    ],
    skills: ["react", "composition", "custom-hooks"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Reusing Logic with Custom Hooks",
        url: "https://react.dev/learn/reusing-logic-with-custom-hooks",
      },
    ],
    keywords: ["react", "composition", "custom hooks", "reuse"],
    explanation: `React gives you two genuinely different tools for reuse, and reaching for the wrong one produces awkward code even when it technically works. **Component composition** reuses *markup structure* -- a Card component that renders a consistent border/padding/shadow around whatever children it's given is reused by wrapping different content in it each time. **Custom hooks** reuse *stateful behavior* -- the actual logic of managing some piece of state and the operations on it, with no markup involved at all.

A custom hook is not a special React construct with new syntax -- it's an ordinary JavaScript function that happens to call other hooks (useState, useEffect, or other custom hooks) internally, and by convention starts with "use" so React's tooling (and the Rules of Hooks linter) can recognize it and enforce the same call-order rules from the state lesson. A component that repeats the exact same useState-plus-toggle-function pattern in three different places has found a real custom hook waiting to be extracted:

\`\`\`js
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}
\`\`\`

Now \`const [isOpen, toggleOpen] = useToggle(false);\` replaces three lines of repeated boilerplate with one, in every component that needs the same on/off behavior -- a mobile nav drawer, an accordion section, a modal's visibility, all sharing the identical underlying logic without sharing any markup at all.

The naming convention isn't cosmetic. React's hook rules (call hooks only at the top level, only from React functions, always in the same order) apply transitively to anything that calls a hook internally -- a function named "use..." signals to both humans and linting tools that those rules apply to it too, the same way they'd apply to useState directly.`,
    example: {
      language: "javascript",
      description:
        "The useToggle custom hook pattern, modeled with a plain closure so its shape and behavior are inspectable without a React runtime.",
      code: `function useToggle(initialValue) {
  let value = initialValue;
  const listeners = [];
  function get() { return value; }
  function toggle() {
    value = !value;
    listeners.forEach((fn) => fn(value));
  }
  function subscribe(fn) { listeners.push(fn); }
  return { get, toggle, subscribe };
}

const nav = useToggle(false);
nav.subscribe((v) => console.log("nav is now:", v));
nav.toggle(); // "nav is now: true"
nav.toggle(); // "nav is now: false"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Create a second, independent toggle for a modal and confirm toggling one doesn't affect the other.",
      code: `function useToggle(initialValue) {
  let value = initialValue;
  function get() { return value; }
  function toggle() { value = !value; }
  return { get, toggle };
}

const nav = useToggle(false);
const modal = useToggle(false);
nav.toggle();
console.log("nav:", nav.get(), "modal:", modal.get());`,
      editable: true,
    },
    guidedExercise: {
      id: "react-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write useCounter(initialValue) modeled as a closure returning { get, increment, decrement, reset } -- reset should restore the count to its ORIGINAL initialValue, not to 0.",
      starterCode: `function useCounter(initialValue) {
  // TODO: return { get, increment, decrement, reset }
}
`,
      solutionCode: `function useCounter(initialValue) {
  let value = initialValue;
  return {
    get() { return value; },
    increment() { value += 1; },
    decrement() { value -= 1; },
    reset() { value = initialValue; },
  };
}`,
      harness: `
        try {
          const counter = useCounter(5);
          counter.increment();
          counter.increment();
          window.__report('t1', counter.get() === 7, 'Two increments from 5 should reach 7.');
          counter.decrement();
          window.__report('t2', counter.get() === 6, 'One decrement from 7 should reach 6.');
          counter.reset();
          window.__report('t3', counter.get() === 5, 'reset() should restore the original initialValue (5), not 0.');
        } catch (e) { window.__report('t1', false, 'useCounter is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "increment works correctly", hidden: false },
        { id: "t2", description: "decrement works correctly", hidden: false },
        { id: "t3", description: "reset restores the original initial value", hidden: false },
      ],
      hints: [
        "Keep the original initialValue in a separate reference so reset() can restore it, since value itself changes.",
        "All four returned functions should close over the same `value` variable.",
      ],
    },
    independentExercise: {
      id: "react-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isValidHookName(name) that returns true only if the string starts with 'use' followed immediately by an uppercase letter (the real convention: useState, useToggle, useCounter -- not 'user', 'usage', or 'use_counter').",
      starterCode: `function isValidHookName(name) {
  // TODO
}
`,
      solutionCode: `function isValidHookName(name) {
  return /^use[A-Z]/.test(name);
}`,
      harness: `
        try { window.__report('t1', isValidHookName('useCounter') === true, 'useCounter follows the convention.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', isValidHookName('useState') === true, 'useState follows the convention.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', isValidHookName('user') === false, '"user" is not a hook name, just a word that happens to start with "use".'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', isValidHookName('use_counter') === false, 'A lowercase/underscore continuation does not follow the useXxx convention.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "recognizes a valid hook name", hidden: false },
        { id: "t2", description: "recognizes useState as valid", hidden: false },
        { id: "t3", description: "rejects a word that merely starts with 'use'", hidden: false },
        { id: "t4", description: "rejects an incorrectly-cased continuation", hidden: false },
      ],
      hints: [
        "The real convention is 'use' immediately followed by an uppercase letter, camelCase style.",
        "A regular expression anchored at the start (^use[A-Z]) checks exactly this.",
      ],
    },
    commonMistakes: [
      "Reaching for a custom hook when the actual need is markup reuse (a wrapper component), or vice versa -- reusing the wrong kind of thing produces awkward code.",
      "Copy-pasting the same useState-plus-handler pattern into multiple components instead of recognizing it as a custom hook waiting to be extracted.",
      "Naming a helper function with hook-like internals something that doesn't start with 'use', hiding from tooling (and other developers) that the Rules of Hooks apply to it.",
    ],
    quiz: [
      {
        id: "react-11-q1",
        prompt:
          "What is the key difference between component composition and a custom hook as reuse mechanisms?",
        choices: [
          "They are the same thing with different names",
          "Composition reuses markup structure; a custom hook reuses stateful logic, with no markup involved",
          "Custom hooks can only be used once per app",
          "Composition is deprecated in modern React",
        ],
        correctIndex: 1,
        explanation:
          "Composition (e.g. a Card wrapping different children) reuses layout/structure; a custom hook reuses the underlying state-management logic itself.",
      },
      {
        id: "react-11-q2",
        prompt: "What actually makes a function a valid custom hook, beyond naming convention?",
        choices: [
          "Nothing — any function named with 'use' is automatically a hook",
          "It's an ordinary function that calls other hooks internally; the 'use' prefix signals that the Rules of Hooks apply to it",
          "It must be defined in a file named hooks.js",
          "It must return exactly one value",
        ],
        correctIndex: 1,
        explanation:
          "A custom hook is plain JavaScript underneath — what matters functionally is that it calls hooks internally, and the naming convention exists so tooling and humans both recognize the same call-order rules apply.",
      },
      {
        id: "react-11-q3",
        prompt:
          "A component repeats the identical useState-plus-toggle-function pattern in three places. What does this suggest?",
        choices: [
          "Nothing needs to change",
          "This is a strong candidate for extraction into a reusable custom hook",
          "The component should be split into three separate components instead",
          "useState should never be called more than once per component",
        ],
        correctIndex: 1,
        explanation:
          "Identical stateful logic repeated across multiple places is exactly the signal that a custom hook would eliminate the duplication.",
      },
    ],
    takeaway:
      "Composition reuses markup structure; custom hooks reuse stateful logic — a custom hook is just a plain function calling other hooks, with the 'use' prefix signaling that the same call-order rules apply.",
    summary:
      "This lesson distinguished component composition from custom hooks as two different reuse mechanisms and built a closure-based useCounter to make a custom hook's shape and behavior concrete.",
    nextLessonSlug: "react-context-organization",
  },
  {
    id: "react-context-organization",
    slug: "react-context-organization",
    title: "Context, State Ownership, and Project Organization",
    description:
      "Where should a piece of state live? Context solves prop drilling for genuinely shared state — but reaching for it as a default answer creates its own maintenance problems.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["react-composition-hooks"],
    objectives: [
      "Explain the state-ownership question: which component should own a given piece of state",
      "Identify when Context is the right tool versus when it's overreach",
      "Organize a small React project's files by responsibility rather than by file type",
    ],
    skills: ["react", "context", "state-ownership", "project-organization"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Passing Data Deeply with Context",
        url: "https://react.dev/learn/passing-data-deeply-with-context",
      },
      { label: "React docs: Managing State", url: "https://react.dev/learn/managing-state" },
    ],
    keywords: ["react", "context", "state ownership", "project structure", "prop drilling"],
    explanation: `Every piece of state has an implicit question attached: **which component should own it?** The answer is usually "the closest common ancestor of every component that needs to read or change it" — no higher, no lower. State that's needed by three sibling components should live in their shared parent, not scattered across each sibling redundantly, and not hoisted all the way to the app's root "just in case" something far away might need it eventually.

**Prop drilling** — passing a prop down through several layers of components that don't themselves use it, purely to reach a distant descendant that does — is a real symptom worth naming, but it's not automatically a problem requiring a fix. Two or three layers of drilling for a value that's genuinely scoped to that part of the tree is often perfectly reasonable and easy to trace. **Context** solves drilling for state that's truly global to a meaningful subtree — the current theme, the signed-in user, a feature flag — letting deeply nested components read a value without every intermediate layer having to know about or forward it.

The overreach is real, though: putting *everything* in Context to avoid ever thinking about prop drilling creates a different problem — any component consuming that context re-renders whenever *any* value in it changes, even values that component doesn't use, and the actual data flow becomes harder to trace than an explicit prop chain would have been. The state-ownership question ("who actually needs this, and how far does it really need to travel?") should come first; Context is the answer for state that's genuinely wide in scope, not a default reach for anything inconvenient to pass down two levels.

**Project organization** follows the same "group by what actually changes together" logic as component decomposition. Grouping files by *type* (\`components/\`, \`hooks/\`, \`utils/\`) scales poorly as a project grows — working on one feature means jumping between five unrelated folders. Grouping by *feature* (\`features/courses/\` containing that feature's components, hooks, and utils together) keeps related code physically close, which is what actually gets edited together when a feature changes.`,
    example: {
      language: "javascript",
      description:
        "Modeling a Context-like subscription mechanism -- any 'consumer' can read the current value without it being threaded through every intermediate layer as a prop.",
      code: `function createContext(defaultValue) {
  let currentValue = defaultValue;
  const subscribers = [];
  return {
    read() { return currentValue; },
    provide(value) {
      currentValue = value;
      subscribers.forEach((fn) => fn(value));
    },
    subscribe(fn) { subscribers.push(fn); },
  };
}

const ThemeContext = createContext("light");
ThemeContext.subscribe((theme) => console.log("A deeply nested component sees:", theme));
ThemeContext.provide("dark"); // "A deeply nested component sees: dark"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a second subscriber (a different deeply-nested component) and confirm both receive the same update.",
      code: `function createContext(defaultValue) {
  let currentValue = defaultValue;
  const subscribers = [];
  return {
    read() { return currentValue; },
    provide(value) {
      currentValue = value;
      subscribers.forEach((fn) => fn(value));
    },
    subscribe(fn) { subscribers.push(fn); },
  };
}

const ThemeContext = createContext("light");
ThemeContext.subscribe((theme) => console.log("Component A sees:", theme));
ThemeContext.provide("dark");`,
      editable: true,
    },
    guidedExercise: {
      id: "react-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Three sibling components (SearchBar, FilterPanel, ResultsList) all need the current search query. Set correctOwner to the name of the component that should own this state (their shared parent).",
      starterCode: `// Component tree: CoursesPage > [SearchBar, FilterPanel, ResultsList]
let correctOwner = ""; // TODO
`,
      solutionCode: `let correctOwner = "CoursesPage";`,
      harness: `
        try { window.__report('t1', correctOwner === 'CoursesPage', 'The closest common ancestor of all three siblings that need the state is CoursesPage.'); } catch (e) { window.__report('t1', false, 'correctOwner is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly identifies the shared parent as the state owner",
          hidden: false,
        },
      ],
      hints: [
        "State should live in the closest common ancestor of every component that needs it.",
        "None of the three siblings can own state that the other two also need — it has to live above all three.",
      ],
    },
    independentExercise: {
      id: "react-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function shouldUseContext(numberOfLevelsDrilled, isGenuinelyGlobalConcern) that returns true (Context is likely justified) only if BOTH the value is drilled through more than 3 levels AND it's a genuinely global-to-a-subtree concern (like theme or current user) -- otherwise return false (plain props are probably fine).",
      starterCode: `function shouldUseContext(numberOfLevelsDrilled, isGenuinelyGlobalConcern) {
  // TODO
}
`,
      solutionCode: `function shouldUseContext(numberOfLevelsDrilled, isGenuinelyGlobalConcern) {
  return numberOfLevelsDrilled > 3 && isGenuinelyGlobalConcern;
}`,
      harness: `
        try { window.__report('t1', shouldUseContext(5, true) === true, 'Deep drilling of a genuinely global concern justifies Context.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', shouldUseContext(2, true) === false, 'Only 2 levels of drilling is usually fine with plain props, even for a global-ish concern.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', shouldUseContext(5, false) === false, 'Deep drilling of a narrowly-scoped, non-global value does not automatically justify Context.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "recommends Context for deep, genuinely global state",
          hidden: false,
        },
        { id: "t2", description: "does not recommend Context for shallow drilling", hidden: false },
        {
          id: "t3",
          description: "does not recommend Context for a narrowly-scoped value regardless of depth",
          hidden: false,
        },
      ],
      hints: [
        "Both conditions need to be true — depth alone, or global-ness alone, isn't sufficient justification by itself in this exercise's rule.",
        "This mirrors the lesson's point: Context is for state that is BOTH widely needed AND genuinely broad in scope.",
      ],
    },
    commonMistakes: [
      "Hoisting state to the app's root 'just in case' something distant might need it eventually, instead of keeping it at the closest common ancestor that actually needs it today.",
      "Reaching for Context as a default solution to any prop drilling, even for values that are only genuinely relevant to a small, localized part of the tree.",
      "Organizing files by type (all components together, all hooks together) in a way that scatters a single feature's related code across many unrelated folders.",
    ],
    quiz: [
      {
        id: "react-12-q1",
        prompt:
          "What is the general rule for deciding which component should own a piece of state?",
        choices: [
          "State should always live in the root component",
          "The closest common ancestor of every component that needs to read or change it",
          "Whichever component was written first",
          "State should be duplicated in every component that needs it",
        ],
        correctIndex: 1,
        explanation:
          "This keeps state as local as possible while still being reachable by everything that genuinely needs it — no higher, no lower than necessary.",
      },
      {
        id: "react-12-q2",
        prompt: "Why isn't prop drilling automatically a problem that needs fixing?",
        choices: [
          "Prop drilling is always fine, no matter how deep",
          "A shallow, easily-traced chain of a few levels for a locally-scoped value is often simpler and clearer than introducing Context",
          "Prop drilling is a React error that must be resolved",
          "Context should be used for every single prop",
        ],
        correctIndex: 1,
        explanation:
          "Reaching for Context by default, rather than when state is genuinely wide-scoped, trades an easy-to-trace prop chain for a less traceable subscription with its own re-render costs.",
      },
      {
        id: "react-12-q3",
        prompt:
          "Why does organizing files by feature scale better than organizing by file type as a project grows?",
        choices: [
          "It doesn't — file-type organization always scales better",
          "Code that changes together (a feature's components, hooks, and utils) stays physically close, instead of scattered across unrelated folders",
          "Feature-based organization is required by React",
          "File-type organization is faster to navigate for any project size",
        ],
        correctIndex: 1,
        explanation:
          "Working on one feature under type-based organization means jumping between several unrelated top-level folders — feature-based organization keeps what changes together located together.",
      },
    ],
    takeaway:
      "State should live at the closest common ancestor that actually needs it, Context is for genuinely wide-scoped state rather than a default fix for any prop drilling, and organizing files by feature keeps related code physically close as a project grows.",
    summary:
      "This lesson covered the state-ownership question, when Context is the right tool versus overreach, and why feature-based project organization scales better than organizing files by type.",
    nextLessonSlug: "react-accessibility-testing",
  },
  {
    id: "react-accessibility-testing",
    slug: "react-accessibility-testing",
    title: "Accessibility and Testing React Components",
    description:
      "Two disciplines every production component needs: making sure everyone can actually use it, and proving it works with more than a manual click-through.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 12,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["react-context-organization"],
    objectives: [
      "Identify a component missing an accessible name and how to fix it",
      "Explain what React Testing Library's query-by-role philosophy encourages",
      "Write a deterministic assertion for a piece of component logic without a full test runner",
    ],
    skills: ["react", "accessibility", "testing"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "React docs: Accessibility",
        url: "https://react.dev/reference/react-dom/components/common#accessibility-attributes",
      },
      {
        label: "Testing Library: Guiding Principles",
        url: "https://testing-library.com/docs/guiding-principles/",
      },
    ],
    keywords: ["react", "accessibility", "testing", "react testing library"],
    explanation: `A button that's just a \`<div onClick={...}>\` looks identical to a real \`<button>\` visually, but is invisible to keyboard users (no Tab focus, no Enter/Space activation) and to screen readers (no announced role). React doesn't automatically make anything accessible — every accessibility guarantee comes from using the right semantic element (\`<button>\`, not a styled \`<div>\`) and the right ARIA attributes when semantic HTML alone can't express something (\`aria-label\` on an icon-only button, \`aria-live\` on a region that updates asynchronously). The single most common, cheapest fix: **every interactive element needs an accessible name** — either its own text content, an \`aria-label\`, or an associated \`<label>\` for a form field. An icon-only close button with no \`aria-label\` announces as just "button" to a screen reader, with no indication of what it does.

**React Testing Library's core philosophy is querying the way a real user would perceive the page** — by visible text, by ARIA role, by label — rather than by internal implementation details like a CSS class name or a component's internal variable names. \`getByRole("button", { name: "Sign up" })\` finds the element the way a screen reader announces it and the way a sighted user reads it; a test written this way breaks only when the actual user-facing behavior breaks, not when an unrelated internal refactor changes a class name. This is a deliberate design choice, not an arbitrary convention — tests coupled to implementation details are exactly the tests that need constant, unhelpful rewriting every time the code is refactored without any real behavior change.

A full test runner isn't required to practice the underlying discipline of writing a clear, deterministic assertion. This lesson's exercises write plain assertion functions — the same "given this input, assert this specific output" shape that \`expect(...).toBe(...)\` uses underneath — to build the habit of testing behavior precisely, which is exactly the skill that transfers directly to real React Testing Library assertions once you're working in a real project.`,
    example: {
      language: "javascript",
      description:
        "A minimal, real assertion helper -- the same underlying shape as expect().toBe(), used to check a component's derived output deterministically.",
      code: `function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message + " -- expected " + JSON.stringify(expected) + " but got " + JSON.stringify(actual));
  }
  return true;
}

function getButtonAccessibleName(button) {
  return button.ariaLabel || button.textContent || null;
}

const iconOnlyButton = { ariaLabel: null, textContent: "" };
try {
  assertEqual(getButtonAccessibleName(iconOnlyButton), null, "icon-only button should have an accessible name, but doesn't");
} catch (e) {
  console.log(e.message);
}`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add an ariaLabel to iconOnlyButton (e.g. 'Close') and re-run -- the assertion should now need updating to expect that label.",
      code: `function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message + " -- expected " + JSON.stringify(expected) + " but got " + JSON.stringify(actual));
  }
  return true;
}

function getButtonAccessibleName(button) {
  return button.ariaLabel || button.textContent || null;
}

const iconOnlyButton = { ariaLabel: null, textContent: "" };
console.log(getButtonAccessibleName(iconOnlyButton));`,
      editable: true,
    },
    guidedExercise: {
      id: "react-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using getButtonAccessibleName already defined, check three buttons and store whether each has a real accessible name: hasNameA (textContent: 'Sign up', no ariaLabel), hasNameB (icon-only, ariaLabel: 'Close menu'), hasNameC (icon-only, no ariaLabel, no textContent).",
      starterCode: `function getButtonAccessibleName(button) {
  return button.ariaLabel || button.textContent || null;
}

const buttonA = { ariaLabel: null, textContent: "Sign up" };
const buttonB = { ariaLabel: "Close menu", textContent: "" };
const buttonC = { ariaLabel: null, textContent: "" };

let hasNameA = null; // TODO
let hasNameB = null; // TODO
let hasNameC = null; // TODO
`,
      solutionCode: `function getButtonAccessibleName(button) {
  return button.ariaLabel || button.textContent || null;
}

const buttonA = { ariaLabel: null, textContent: "Sign up" };
const buttonB = { ariaLabel: "Close menu", textContent: "" };
const buttonC = { ariaLabel: null, textContent: "" };

let hasNameA = getButtonAccessibleName(buttonA) !== null;
let hasNameB = getButtonAccessibleName(buttonB) !== null;
let hasNameC = getButtonAccessibleName(buttonC) !== null;`,
      harness: `
        try { window.__report('t1', hasNameA === true, 'Button A has visible text -- it has an accessible name.'); } catch (e) { window.__report('t1', false, 'hasNameA is not defined: ' + e.message); }
        try { window.__report('t2', hasNameB === true, 'Button B has an aria-label -- it has an accessible name even with no visible text.'); } catch (e) { window.__report('t2', false, 'hasNameB is not defined: ' + e.message); }
        try { window.__report('t3', hasNameC === false, 'Button C has neither -- it has NO accessible name, a real accessibility bug.'); } catch (e) { window.__report('t3', false, 'hasNameC is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "button with text content has a name", hidden: false },
        { id: "t2", description: "icon-only button with aria-label has a name", hidden: false },
        {
          id: "t3",
          description: "icon-only button with neither is correctly flagged",
          hidden: false,
        },
      ],
      hints: [
        "Call getButtonAccessibleName on each button and check whether the result is not null.",
        "Button C is the real bug case: no visible text and no aria-label means no accessible name at all.",
      ],
    },
    independentExercise: {
      id: "react-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write assertContainsText(renderedOutput, expectedText) that throws an Error with a clear message if expectedText is not found within renderedOutput (a string), and returns true if it is found -- modeling the shape of a React Testing Library text assertion.",
      starterCode: `function assertContainsText(renderedOutput, expectedText) {
  // TODO: throw a clear Error if not found, otherwise return true
}
`,
      solutionCode: `function assertContainsText(renderedOutput, expectedText) {
  if (!renderedOutput.includes(expectedText)) {
    throw new Error('Expected to find "' + expectedText + '" in rendered output, but it was not present.');
  }
  return true;
}`,
      harness: `
        try {
          const result = assertContainsText("Welcome, Ada! You have 3 courses in progress.", "3 courses");
          window.__report('t1', result === true, 'Should return true when the text is found.');
        } catch (e) { window.__report('t1', false, 'Unexpected throw: ' + e.message); }
        try {
          assertContainsText("Welcome, Ada!", "5 courses");
          window.__report('t2', false, 'Should have thrown -- "5 courses" is not present in the output.');
        } catch (e) {
          window.__report('t2', e.message.includes("5 courses"), 'The thrown error message should mention the missing text.');
        }
      `,
      tests: [
        { id: "t1", description: "returns true when the text is present", hidden: false },
        { id: "t2", description: "throws a clear error when the text is missing", hidden: false },
      ],
      hints: [
        "Use String.prototype.includes to check for the substring.",
        "The error message should name exactly what was expected, so a failure is immediately understandable.",
      ],
    },
    commonMistakes: [
      "Using a styled `<div onClick={...}>` instead of a real `<button>`, losing keyboard focus and activation for free.",
      "Leaving an icon-only button with no `aria-label`, so it announces as an unlabeled, meaningless control to screen reader users.",
      "Writing tests that query by CSS class name or internal component structure instead of by role/label/text, making them break on unrelated refactors.",
    ],
    quiz: [
      {
        id: "react-13-q1",
        prompt:
          "Why does a `<div onClick={...}>` styled to look like a button fail accessibility even though it looks identical?",
        choices: [
          "It doesn't fail — visual appearance is all that matters",
          "It has no keyboard focus, no Enter/Space activation, and no announced role, none of which a div provides automatically",
          "Divs cannot have onClick handlers",
          "This only matters for screen readers, not keyboard users",
        ],
        correctIndex: 1,
        explanation:
          "Semantic HTML elements like `<button>` provide keyboard interactivity and an announced role for free — a div styled to look the same provides neither automatically.",
      },
      {
        id: "react-13-q2",
        prompt:
          "Why does React Testing Library encourage querying by role, label, or visible text instead of CSS class or internal structure?",
        choices: [
          "It's arbitrary — any query method works equally well",
          "Those queries match how a real user (including assistive technology) actually perceives the page, so tests break only on real behavior changes",
          "Class-name queries are always slower",
          "Role-based queries are required by JavaScript",
        ],
        correctIndex: 1,
        explanation:
          "Querying the way a user perceives the page keeps tests coupled to actual behavior rather than implementation details that can change without any real user-facing difference.",
      },
      {
        id: "react-13-q3",
        prompt:
          "What is the single cheapest, most common accessibility fix mentioned in this lesson?",
        choices: [
          "Adding animations to every interaction",
          "Ensuring every interactive element has an accessible name — its own text, an aria-label, or an associated label",
          "Removing all icons from the interface",
          "Using only red and green colors for status",
        ],
        correctIndex: 1,
        explanation:
          "A missing accessible name on an interactive element is one of the most common and easiest-to-fix real accessibility bugs — often just adding one aria-label attribute.",
      },
    ],
    takeaway:
      "Accessibility comes from real semantic elements and explicit accessible names, not automatically from React — and testing by role/label/text (the way a real user perceives the page) keeps tests coupled to behavior, not implementation details.",
    summary:
      "This lesson covered identifying missing accessible names, the philosophy behind React Testing Library's role-based queries, and practiced writing clear, deterministic assertions.",
    nextLessonSlug: "react-performance-error-architecture",
  },
  {
    id: "react-performance-error-architecture",
    slug: "react-performance-error-architecture",
    title: "Performance, Error Handling, and Maintainable Architecture",
    description:
      "Memoization, error boundaries, and refactoring an oversized component into a maintainable structure — brought together in a real local refactor of a growing project.",
    trackSlug: "react",
    courseSlug: "react-application-development",
    order: 13,
    difficulty: "advanced",
    estimatedMinutes: 32,
    prerequisites: ["react-accessibility-testing"],
    objectives: [
      "Explain what memoization actually trades away, and when that trade is worth it",
      "Explain what an error boundary catches and what it deliberately does not catch",
      "Refactor an oversized component into a maintainable structure on your own machine",
    ],
    skills: ["react", "performance", "error-boundaries", "architecture"],
    tech: [{ name: "React", version: "18.x or 19.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "React docs: useMemo", url: "https://react.dev/reference/react/useMemo" },
      {
        label: "React docs: Catching Rendering Errors with an Error Boundary",
        url: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
      },
    ],
    keywords: ["react", "performance", "memoization", "error boundaries", "refactoring"],
    explanation: `**Memoization trades memory and comparison cost for avoided recomputation.** \`useMemo(() => expensiveFilter(items, query), [items, query])\` skips re-running \`expensiveFilter\` on a render where neither \`items\` nor \`query\` changed, returning the previously cached result instead — but React still has to store that cached value and compare the dependency array every render, which is itself not free. For a genuinely expensive computation (filtering or sorting thousands of items) or to preserve a stable reference for a child that's specifically optimized to skip re-rendering when its props are unchanged, this is a real, worthwhile trade. **Memoizing every value "just in case" is not a worthwhile trade** — for a cheap computation, the bookkeeping cost of memoization can exceed the cost of simply redoing the work, and the practical guidance holds: measure first (React's DevTools Profiler shows real render costs), then memoize the specific, proven bottleneck, not everything preemptively.

**An error boundary catches rendering errors in its child tree and shows a fallback UI instead of the entire app crashing to a blank white screen.** It's a class component (the one place React still requires one) implementing \`static getDerivedStateFromError\` or \`componentDidCatch\`. Critically, **it does not catch errors in event handlers, asynchronous code, or errors during its own rendering** — those need their own explicit \`try\`/\`catch\` or \`.catch()\` handling, exactly as they would in plain JavaScript. An error boundary's job is narrow and specific: prevent one broken subtree's rendering error from taking down everything around it.

**An oversized component is a maintainability problem the same way an oversized function is anywhere else**: too many responsibilities crammed into one place, too much local state to reason about together, too much to hold in your head to make a safe change. The fix follows directly from the very first lesson's component-thinking skill, now applied under real pressure — recognizing which pieces of a 300-line component are actually independent responsibilities, and extracting each into its own component or custom hook, exactly the two reuse tools from earlier in this course.

This lesson's guided local lab is a real refactor: take a deliberately oversized component and break it apart using everything from this course — composition, custom hooks, an error boundary, and a measured (not guessed) performance fix.`,
    example: {
      language: "javascript",
      description:
        "Modeling the cost/benefit of memoization directly -- counting how many times an expensive function actually runs, with and without a memoization guard.",
      code: `function expensiveFilter(items, query) {
  return items.filter((i) => i.includes(query));
}

function withoutMemo(items, query, renderCount) {
  let calls = 0;
  for (let i = 0; i < renderCount; i++) {
    expensiveFilter(items, query); // recomputes every single render
    calls++;
  }
  return calls;
}

function withMemo(items, query, renderCount) {
  let calls = 0;
  let cache = null;
  let cachedItems = null;
  let cachedQuery = null;
  for (let i = 0; i < renderCount; i++) {
    if (items !== cachedItems || query !== cachedQuery) {
      expensiveFilter(items, query);
      calls++;
      cachedItems = items;
      cachedQuery = query;
    }
  }
  return calls;
}

const items = ["react", "redux", "remix"];
console.log(withoutMemo(items, "re", 5)); // 5 -- recomputed every render
console.log(withMemo(items, "re", 5));    // 1 -- computed once, reused for the other 4`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change the query between renders (simulate a user typing) and see how many times withMemo actually recomputes.",
      code: `function expensiveFilter(items, query) {
  return items.filter((i) => i.includes(query));
}

function withMemo(items, queries) {
  let calls = 0;
  let cachedItems = null;
  let cachedQuery = null;
  for (const query of queries) {
    if (items !== cachedItems || query !== cachedQuery) {
      expensiveFilter(items, query);
      calls++;
      cachedItems = items;
      cachedQuery = query;
    }
  }
  return calls;
}

const items = ["react", "redux", "remix"];
console.log(withMemo(items, ["r", "r", "re", "re", "rea"]));`,
      editable: true,
    },
    guidedExercise: {
      id: "react-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write catchesThisError(errorSource) that returns true only for 'render' (what an error boundary catches), and false for 'event-handler', 'async-callback', and 'own-render' (an error boundary's OWN rendering, which it cannot catch for itself) -- modeling exactly what an error boundary does and does not catch.",
      starterCode: `function catchesThisError(errorSource) {
  // TODO
}
`,
      solutionCode: `function catchesThisError(errorSource) {
  return errorSource === "render";
}`,
      harness: `
        try { window.__report('t1', catchesThisError('render') === true, 'An error boundary catches errors thrown during a child\\'s render.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', catchesThisError('event-handler') === false, 'Event handler errors are NOT caught by an error boundary -- they need their own try/catch.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', catchesThisError('async-callback') === false, 'Errors in async code (e.g. inside a .then()) are NOT caught by an error boundary.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies render errors as caught", hidden: false },
        {
          id: "t2",
          description: "correctly identifies event-handler errors as not caught",
          hidden: false,
        },
        { id: "t3", description: "correctly identifies async errors as not caught", hidden: false },
      ],
      hints: [
        "An error boundary's job is deliberately narrow: only errors thrown while a descendant is rendering.",
        "Event handlers and async code need their own explicit error handling, exactly as in plain JavaScript.",
      ],
    },
    independentExercise: {
      id: "react-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write identifyExtractableResponsibilities(componentDescription) where componentDescription is an object like { manages: ['form state', 'fetch logic', 'modal visibility'] }. Return the array of responsibilities EXCLUDING the first one (assume the first is the component's own core purpose, and the rest are candidates for extraction into separate components/hooks).",
      starterCode: `function identifyExtractableResponsibilities(componentDescription) {
  // TODO
}
`,
      solutionCode: `function identifyExtractableResponsibilities(componentDescription) {
  return componentDescription.manages.slice(1);
}`,
      harness: `
        try {
          const result = identifyExtractableResponsibilities({ manages: ["dashboard layout", "course fetch logic", "search filtering", "modal visibility"] });
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["course fetch logic", "search filtering", "modal visibility"]), 'Should return everything except the first (core) responsibility.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const result = identifyExtractableResponsibilities({ manages: ["one thing"] });
          window.__report('t2', result.length === 0, 'A component with only one responsibility has nothing left to extract.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly identifies extractable responsibilities",
          hidden: false,
        },
        {
          id: "t2",
          description: "returns empty for a single-responsibility component",
          hidden: false,
        },
      ],
      hints: [
        "Array.prototype.slice(1) returns everything after the first element.",
        "This models the real refactoring judgment call from the lesson: one core purpose stays, everything else is a candidate to extract.",
      ],
    },
    guidedLocalLab: {
      id: "react-refactor-lab",
      title: "Refactor an Oversized Component Locally",
      scenario:
        "You've inherited a single 'Dashboard' component that has grown to handle course fetching, search filtering, and error display all in one place. Refactor it into a maintainable structure using composition, a custom hook, and an error boundary — all techniques from this course.",
      requiredTools: [
        { name: "Node.js", version: "20.x LTS or newer" },
        { name: "npm", version: "10.x (bundled with Node.js)" },
      ],
      setupSteps: [
        "Reuse the Vite + React project from an earlier lesson's lab, or run `npm create vite@latest dashboard-refactor -- --template react` for a fresh one.",
        "Replace `src/App.jsx` with the oversized starter file below.",
        "Run `npm run dev` and confirm the dashboard renders and searches correctly before refactoring anything.",
      ],
      projectStructure:
        "dashboard-refactor/\n  src/\n    App.jsx (oversized, to be split apart)\n    ErrorBoundary.jsx (new)\n    useCourseSearch.js (new, extracted hook)\n    CourseList.jsx (new, extracted component)\n    main.jsx",
      starterFiles: [
        {
          path: "src/App.jsx",
          content: `import { useEffect, useState } from "react";

const ALL_COURSES = [
  { id: 1, title: "HTML & CSS Fundamentals" },
  { id: 2, title: "JavaScript Fundamentals" },
  { id: 3, title: "TypeScript Foundations" },
];

// Everything lives in one component: fetching, filtering, error handling,
// AND rendering -- a realistic "grew too large over time" starting point.
export default function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setTimeout(() => {
      if (!ignore) {
        setItems(ALL_COURSES);
        setIsLoading(false);
      }
    }, 300);
    return () => { ignore = true; };
  }, []);

  const filtered = items.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p role="alert">Something went wrong.</p>;

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search courses" />
      <ul>
        {filtered.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  );
}`,
        },
      ],
      requirements: [
        "Fetch-and-filter logic is extracted into a custom hook (e.g. useCourseSearch), not left inline in the top-level component",
        "The list-rendering markup is extracted into its own component (e.g. CourseList), accepting the filtered items as a prop",
        "An ErrorBoundary class component wraps the dashboard, with a fallback UI distinct from the existing loading/error states",
        "The refactored App.jsx is substantially shorter and reads as an assembly of pieces, not a single block handling every concern",
      ],
      commands: [
        {
          description: "Start the dev server after each refactor step to confirm nothing broke",
          command: "npm run dev",
        },
      ],
      expectedBehavior:
        "After refactoring, the app behaves identically from the user's perspective (search still filters correctly, loading still shows briefly) — the refactor changes internal structure only, never behavior.",
      verificationSteps: [
        {
          command: "Load the app and confirm the course list appears after the brief loading state",
          expectedResult: "Behavior matches the pre-refactor version exactly",
        },
        {
          command: "Type a search query and confirm filtering still works",
          expectedResult: "The list narrows to matching courses, same as before the refactor",
        },
        {
          command:
            "Temporarily throw an error inside CourseList's render (e.g. `throw new Error('test')`) to confirm the ErrorBoundary catches it",
          expectedResult:
            "The ErrorBoundary's fallback UI appears instead of a blank white screen or an unhandled crash; remove the test throw afterward",
        },
      ],
      troubleshooting: [
        {
          issue: "The ErrorBoundary doesn't catch a thrown error",
          fix: "Confirm the error is thrown during RENDER (not inside a useEffect or an event handler) — error boundaries only catch rendering errors in their child tree, by design.",
        },
        {
          issue: "After extracting useCourseSearch, the search input stops updating",
          fix: "Confirm the hook returns both the current query value AND a setter function, and that App.jsx's input is still wired to both.",
        },
      ],
      hints: [
        "useCourseSearch should own query, items, isLoading, error, and the fetch effect, returning { query, setQuery, filtered, isLoading, error }.",
        "ErrorBoundary needs a constructor, static getDerivedStateFromError, and a render method that shows either children or a fallback based on its own state.",
      ],
      referenceSolution: {
        summary:
          "The fetch/filter logic moves into useCourseSearch.js as a custom hook; CourseList.jsx becomes a small, focused presentational component; ErrorBoundary.jsx is a standard class-based error boundary wrapping the dashboard's content in App.jsx, which shrinks to mostly composition of the three pieces.",
        files: [
          {
            path: "src/useCourseSearch.js",
            content: `import { useEffect, useState } from "react";

const ALL_COURSES = [
  { id: 1, title: "HTML & CSS Fundamentals" },
  { id: 2, title: "JavaScript Fundamentals" },
  { id: 3, title: "TypeScript Foundations" },
];

export function useCourseSearch() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setTimeout(() => {
      if (!ignore) {
        setItems(ALL_COURSES);
        setIsLoading(false);
      }
    }, 300);
    return () => { ignore = true; };
  }, []);

  const filtered = items.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));
  return { query, setQuery, filtered, isLoading, error };
}`,
          },
          {
            path: "src/ErrorBoundary.jsx",
            content: `import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p role="alert">Something went wrong displaying this section.</p>;
    }
    return this.props.children;
  }
}`,
          },
        ],
      },
      extensionChallenge:
        "Add a componentDidCatch method to ErrorBoundary that logs the error to the console with additional context, and add a 'Try again' button to its fallback UI that resets hasError back to false.",
    },
    commonMistakes: [
      "Memoizing every value in a component 'just in case,' adding bookkeeping overhead that can exceed the cost of the cheap computation it was protecting.",
      "Expecting an error boundary to catch an error thrown inside an event handler or an async callback, when it only catches errors during rendering.",
      "Letting a component keep growing indefinitely instead of recognizing independent responsibilities and extracting them into separate components or hooks.",
    ],
    quiz: [
      {
        id: "react-14-q1",
        prompt: "What does memoization actually trade away in exchange for avoiding recomputation?",
        choices: [
          "Nothing — it is always strictly free",
          "Memory to store the cached value and the cost of comparing dependencies every render",
          "The ability to update the value ever again",
          "Component reusability",
        ],
        correctIndex: 1,
        explanation:
          "Memoization is a real trade-off, not a free win — for a cheap computation, the bookkeeping cost can exceed the savings, which is why measuring before memoizing matters.",
      },
      {
        id: "react-14-q2",
        prompt: "Which of these does an error boundary NOT catch?",
        choices: [
          "An error thrown while a child component renders",
          "An error thrown inside an async .then() callback",
          "Both are caught equally",
          "Error boundaries catch nothing at all",
        ],
        correctIndex: 1,
        explanation:
          "Error boundaries only catch errors during rendering of their child tree — event handlers and async code need their own explicit error handling.",
      },
      {
        id: "react-14-q3",
        prompt:
          "What is the underlying skill being applied when refactoring an oversized component into smaller pieces?",
        choices: [
          "A brand new skill unrelated to anything else in this course",
          "The same component-decomposition thinking from the first lesson, now applied to an existing, grown component instead of a blank page",
          "Randomly splitting the file in half",
          "Converting everything to class components",
        ],
        correctIndex: 1,
        explanation:
          "Recognizing independent responsibilities and giving each its own component or hook is exactly the component-thinking skill from the start of the course, applied under the real pressure of an existing codebase.",
      },
    ],
    takeaway:
      "Memoization and error boundaries are both narrow, deliberate tools — memoize a measured bottleneck, not everything; an error boundary catches only rendering errors, not events or async code — and refactoring an oversized component is component-thinking applied to existing code.",
    summary:
      "This lesson covered the real trade-offs of memoization and the precise scope of error boundaries, then applied composition, custom hooks, and an error boundary together to refactor a genuinely oversized component in a real local project.",
  },
];
