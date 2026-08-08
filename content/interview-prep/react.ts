import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * React Application Development interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics
 * (components/JSX, state/events, forms/UI states, effects/data fetching,
 * hooks/context/performance/testing) plus React staples that regularly
 * come up in real interviews (reconciliation, keys, controlled inputs).
 */
export const reactInterviewQuestions: InterviewQuestionInput[] = [
  // --- Components & JSX (10) ---
  {
    id: "react-interview-jsx-01",
    courseSlug: "react-application-development",
    question: "What does JSX actually compile to?",
    answer:
      'JSX compiles to plain JavaScript function calls -- `<div className="a">Hi</div>` becomes something like `React.createElement("div", { className: "a" }, "Hi")` (or a `jsx()` call with the modern transform). JSX is syntax sugar, not a separate templating language.',
    category: "Components & JSX",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-jsx-02",
    courseSlug: "react-application-development",
    question: "What is the difference between a React element and a React component?",
    answer:
      "An element is a plain, immutable description of what to render (the object JSX compiles to); a component is a function (or class) that returns elements -- React calls your component functions to produce the elements it then renders.",
    category: "Components & JSX",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-jsx-03",
    courseSlug: "react-application-development",
    question: "What are props, and can a component modify its own props?",
    answer:
      "Props are read-only inputs passed from a parent to a child component. A component must never mutate its own props -- one-way data flow means data flows down through props, and changes flow back up through callbacks the parent provides.",
    category: "Components & JSX",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-jsx-04",
    courseSlug: "react-application-development",
    question: "Why does React require a unique `key` prop when rendering a list of elements?",
    answer:
      "Keys let React's reconciliation algorithm match elements across renders to determine which items were added, removed, or reordered, rather than re-rendering the entire list from scratch.",
    category: "Components & JSX",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-jsx-05",
    courseSlug: "react-application-development",
    question:
      "Why is using an array index as a list `key` risky when the list can be reordered or filtered?",
    answer:
      "If items are reordered, inserted, or removed, the index-to-item mapping shifts, so React can incorrectly reuse a DOM node (and its internal state) for a different logical item than before -- a stable, unique identifier from the data itself is safer.",
    category: "Components & JSX",
    difficulty: "advanced",
    commonMistake:
      "Using the array index as `key` for a reorderable or filterable list, causing component state to attach to the wrong item after a reorder.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-jsx-06",
    courseSlug: "react-application-development",
    question: "What is a fragment (`<>...</>`) and why is it useful?",
    answer:
      "A fragment lets a component return multiple sibling elements without wrapping them in an extra DOM node like a `<div>`, avoiding unnecessary markup in the rendered output.",
    category: "Components & JSX",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-jsx-07",
    courseSlug: "react-application-development",
    question:
      "What is 'composition' in React, and why is it generally preferred over deep prop drilling?",
    answer:
      "Composition means building complex UI by nesting and combining smaller components (often via the `children` prop) rather than passing every piece of data or behavior down through many prop layers -- it keeps intermediate components decoupled from data they don't use directly.",
    category: "Components & JSX",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-jsx-08",
    courseSlug: "react-application-development",
    question: "What is 'prop drilling,' and what are two ways to avoid it?",
    answer:
      "Passing a prop through several intermediate components that don't use it themselves, just to reach a deeply nested child. It can be avoided with composition (passing the component itself down as `children`/a prop) or with Context for genuinely widely-needed data.",
    category: "Components & JSX",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-jsx-09",
    courseSlug: "react-application-development",
    question: "Why must a custom component's name start with a capital letter in JSX?",
    answer:
      "JSX uses capitalization to distinguish a custom component (`<MyButton />`, compiled as a component reference) from a built-in host element (`<button />`, compiled as a string tag name) -- a lowercase custom component name would be misinterpreted as an HTML tag.",
    category: "Components & JSX",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-jsx-10",
    courseSlug: "react-application-development",
    question:
      "What does 'component thinking' mean when decomposing a UI mockup into React components?",
    answer:
      "Breaking a UI into well-scoped pieces where each component has a single clear responsibility and owns only the state it genuinely needs -- rather than one giant component handling everything, or components split so finely that data has to be threaded awkwardly between them.",
    category: "Components & JSX",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- State & Events (10) ---
  {
    id: "react-interview-state-01",
    courseSlug: "react-application-development",
    question: "What does calling a `useState` setter function actually do?",
    answer:
      "It schedules a re-render with the new state value; it does not mutate the existing state variable synchronously in place, and the update may be batched together with other state updates before React actually re-renders.",
    category: "State & Events",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-state-02",
    courseSlug: "react-application-development",
    question:
      "Why does using the functional update form (`setCount(c => c + 1)`) matter when updating state based on its previous value?",
    answer:
      "State updates can be batched, so `count` inside a closure might be stale by the time an update actually applies. The functional form receives the true latest value at update time, avoiding lost updates when multiple updates are scheduled close together.",
    category: "State & Events",
    difficulty: "advanced",
    commonMistake:
      "Calling setCount(count + 1) multiple times in the same handler expecting each call to add one, when they all read the same stale `count` closure value.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-state-03",
    courseSlug: "react-application-development",
    question:
      "Why shouldn't you directly mutate a state array (e.g. `state.push(item)`) instead of creating a new array?",
    answer:
      "React compares state by reference to decide whether to re-render; mutating the existing array in place doesn't create a new reference, so React may not detect the change and skip re-rendering.",
    category: "State & Events",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-state-04",
    courseSlug: "react-application-development",
    question: "What is the difference between a controlled and an uncontrolled form input?",
    answer:
      "A controlled input's value is driven entirely by React state (`value={state}` + `onChange`); an uncontrolled input manages its own value internally in the DOM, read via a ref only when needed rather than tracked in state on every keystroke.",
    category: "State & Events",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-state-05",
    courseSlug: "react-application-development",
    question: "What is a synthetic event in React?",
    answer:
      "A cross-browser wrapper object around the native DOM event that React passes to event handlers, normalizing behavior across browsers while still exposing the underlying native event when needed.",
    category: "State & Events",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-state-06",
    courseSlug: "react-application-development",
    question: "When should state be lifted to a common parent component?",
    answer:
      "When two or more sibling components need to share or stay synchronized on the same piece of state -- lifting it to their nearest common ancestor and passing it down (with a callback to update it) keeps a single source of truth instead of duplicated, potentially inconsistent local state.",
    category: "State & Events",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-state-07",
    courseSlug: "react-application-development",
    question:
      "Why is deciding what actually needs to be React state (versus a plain derived value computed during render) an important design choice?",
    answer:
      "Storing a value in state that could instead be computed from existing state/props on every render risks the two falling out of sync and adds unnecessary re-render triggers -- deriving it during render keeps a single source of truth.",
    category: "State & Events",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-state-08",
    courseSlug: "react-application-development",
    question:
      "What is the difference between rendering `list.length === 0 && <Empty />` and a full explicit conditional with `if`/`else`-style branches?",
    answer:
      "Both can render conditionally, but `&&` short-circuit rendering has a known pitfall: if the left side evaluates to `0` (a falsy but renderable number) rather than `false`, React renders the literal `0` on the page instead of nothing.",
    category: "State & Events",
    difficulty: "advanced",
    commonMistake:
      'Writing `{count && <Badge count={count} />}`, which renders a stray "0" on the page when count is 0.',
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-state-09",
    courseSlug: "react-application-development",
    question: "How do you pass data from a child component back up to its parent?",
    answer:
      "The parent passes a callback function down as a prop; the child calls that function (often with an argument) when something happens, letting the parent update its own state in response -- data itself still only flows down through props.",
    category: "State & Events",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-state-10",
    courseSlug: "react-application-development",
    question:
      "What are the four states a real, data-driven UI typically needs to handle explicitly?",
    answer:
      "Loading, error, empty (successfully loaded but no data), and success/populated -- a component that only handles the success case will show a confusing blank or broken UI in the other three situations.",
    category: "State & Events",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Effects & Data Fetching (10) ---
  {
    id: "react-interview-effects-01",
    courseSlug: "react-application-development",
    question: "What is `useEffect` used for?",
    answer:
      "Synchronizing a component with something outside React's own rendering -- e.g. fetching data, subscribing to an external event source, or manually manipulating a DOM node not managed by React.",
    category: "Effects & Data Fetching",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-effects-02",
    courseSlug: "react-application-development",
    question: "What does the dependency array passed to `useEffect` control?",
    answer:
      "It tells React when to re-run the effect: an empty array (`[]`) means run once after the first render only; omitting the array means run after every render; a list of values means re-run whenever any of those values changes between renders.",
    category: "Effects & Data Fetching",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-effects-03",
    courseSlug: "react-application-development",
    question: "What is a cleanup function in `useEffect`, and when does it run?",
    answer:
      "An optional function returned from the effect callback; React runs it before the effect re-runs on a later render, and once more when the component unmounts -- used to cancel subscriptions, timers, or in-flight requests started by the effect.",
    category: "Effects & Data Fetching",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-effects-04",
    courseSlug: "react-application-development",
    question:
      "What is a race condition in a data-fetching `useEffect`, and how is it typically avoided?",
    answer:
      "If the effect re-runs (e.g. an id prop changes) before a previous fetch finishes, the older, now-stale response could resolve after the newer one and incorrectly overwrite it. It's typically avoided with a cleanup flag or an `AbortController` that ignores/cancels the outdated request.",
    category: "Effects & Data Fetching",
    difficulty: "advanced",
    codeExample:
      "useEffect(() => {\n  let cancelled = false;\n  fetchUser(id).then((data) => {\n    if (!cancelled) setUser(data);\n  });\n  return () => {\n    cancelled = true;\n  };\n}, [id]);",
    commonMistake:
      "Fetching data on prop change without a cancellation guard, so a slow earlier request can overwrite a faster, more recent one.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-effects-05",
    courseSlug: "react-application-development",
    question:
      "Why shouldn't `fetch()` calls generally go directly in the component body during render?",
    answer:
      "Rendering must stay a pure, predictable calculation of UI from state/props -- triggering a network request as a side effect of render can fire duplicate requests on every re-render and makes the component's behavior unpredictable; side effects belong in `useEffect` (or an event handler) instead.",
    category: "Effects & Data Fetching",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-effects-06",
    courseSlug: "react-application-development",
    question:
      "What is a common mistake with an object or array literal in a `useEffect` dependency array?",
    answer:
      "A new object/array literal (e.g. `{ id }`) is a different reference on every render, even with identical contents -- putting it directly in the dependency array causes the effect to re-run on every render, defeating the purpose of the dependency array.",
    category: "Effects & Data Fetching",
    difficulty: "advanced",
    commonMistake:
      "Passing a freshly-created object or array literal as a dependency, causing the effect to re-run on every render regardless of the actual data.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-effects-07",
    courseSlug: "react-application-development",
    question: "What is a custom hook, and what naming convention must it follow?",
    answer:
      "A reusable function that itself calls other hooks (`useState`, `useEffect`, etc.) to encapsulate reusable stateful logic across components -- its name must start with `use` so React's linter and runtime rules-of-hooks checks can recognize it as a hook.",
    category: "Effects & Data Fetching",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-effects-08",
    courseSlug: "react-application-development",
    question:
      "What are the 'Rules of Hooks,' and why must hooks always be called in the same order?",
    answer:
      "Hooks must only be called at the top level of a component or custom hook (never inside loops, conditions, or nested functions), because React tracks each hook's state by the order it was called in during render -- conditionally skipping a hook call shifts that order and corrupts state tracking for subsequent hooks.",
    category: "Effects & Data Fetching",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-effects-09",
    courseSlug: "react-application-development",
    question: "What is the difference between `useEffect` and `useLayoutEffect`?",
    answer:
      "`useEffect` runs asynchronously after the browser has painted the screen; `useLayoutEffect` runs synchronously after DOM mutations but before the browser paints, useful when you need to measure or adjust the DOM before the user sees a visual flicker.",
    category: "Effects & Data Fetching",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-effects-10",
    courseSlug: "react-application-development",
    question:
      "Why is it usually better to fetch data based on a prop/state dependency inside `useEffect` rather than fetching once in a parent and passing everything down?",
    answer:
      "It keeps a component self-sufficient and re-usable, and lets it automatically refetch when the relevant dependency (like an id) changes, without requiring the parent to know about or coordinate every child's data needs.",
    category: "Effects & Data Fetching",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Context, Performance & Testing (10) ---
  {
    id: "react-interview-advanced-01",
    courseSlug: "react-application-development",
    question: "What is React Context used for, and when should it be avoided?",
    answer:
      "Context lets you share a value across a component tree without manually threading it through every intermediate component's props -- appropriate for genuinely global-ish data (theme, current user, locale). It should be avoided for state that only a couple of nearby components need, where prop passing or composition is simpler and keeps components more independently testable.",
    category: "Context, Performance & Testing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-advanced-02",
    courseSlug: "react-application-development",
    question:
      "What is a common performance pitfall with Context, particularly with frequently-changing values?",
    answer:
      "Every component consuming a Context re-renders whenever the Context's value changes, even if that component only cares about part of the value -- putting fast-changing data in a broad Context can cause much more re-rendering than passing that specific data as a targeted prop.",
    category: "Context, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-advanced-03",
    courseSlug: "react-application-development",
    question: "What does `React.memo` do, and when is it actually worth applying?",
    answer:
      "It skips a component's re-render if its props are shallowly equal to the previous render's props. It's worth applying to components that render often with unchanged props and are expensive to re-render -- applying it everywhere by default adds comparison overhead without necessarily helping.",
    category: "Context, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-advanced-04",
    courseSlug: "react-application-development",
    question: "What is the difference between `useMemo` and `useCallback`?",
    answer:
      "`useMemo` memoizes a computed value between renders (recomputing only when its dependencies change); `useCallback` memoizes a function reference itself (returning the same function identity across renders unless dependencies change) -- `useCallback(fn, deps)` is roughly equivalent to `useMemo(() => fn, deps)`.",
    category: "Context, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-advanced-05",
    courseSlug: "react-application-development",
    question: "What is an error boundary, and what kinds of errors does it NOT catch?",
    answer:
      "A component (implemented with a class component's `componentDidCatch`/`getDerivedStateFromError`, or a library helper) that catches rendering errors in its child tree and shows a fallback UI instead of crashing the whole app. It does not catch errors in event handlers, async code, or errors thrown during server rendering outside its own render.",
    category: "Context, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-advanced-06",
    courseSlug: "react-application-development",
    question:
      "Why do accessible components need visible focus states and correct semantic HTML elements, rather than relying purely on visual styling and `<div>`s with click handlers?",
    answer:
      "Keyboard and screen-reader users rely on semantic elements (`<button>`, `<label>`, headings in order) and visible focus indicators to navigate and understand the page -- a clickable `<div>` with no semantic role or focus handling is invisible to assistive technology and unusable via keyboard alone.",
    category: "Context, Performance & Testing",
    difficulty: "intermediate",
    commonMistake:
      "Building an interactive control as a styled <div onClick> instead of a real <button>, making it unreachable and unusable by keyboard and screen-reader users.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-advanced-07",
    courseSlug: "react-application-development",
    question:
      "What is the philosophy behind testing components by 'what the user sees and does' (e.g. with React Testing Library) rather than testing internal component implementation details?",
    answer:
      "Tests that query the rendered DOM by visible text/roles and simulate real user interactions stay valid even if a component's internal implementation (state shape, hooks used) is refactored -- tests that reach into internal state or instance methods break on refactors that don't actually change user-facing behavior.",
    category: "Context, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-advanced-08",
    courseSlug: "react-application-development",
    question: "What is the virtual DOM, and how does it relate to reconciliation?",
    answer:
      "The virtual DOM is React's lightweight in-memory representation of the UI tree; reconciliation is the process of comparing (diffing) the new virtual DOM tree against the previous one to compute the minimal set of real DOM updates needed, rather than re-rendering the entire page.",
    category: "Context, Performance & Testing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-advanced-09",
    courseSlug: "react-application-development",
    question:
      "Why might over-fetching data in a top-level parent and passing it down through many layers of unrelated components be a maintainability problem, even if it 'works'?",
    answer:
      "It couples unrelated components to data-fetching concerns they don't otherwise need, makes each intermediate component harder to reuse or test in isolation, and often means a small UI change requires threading new props through several layers that shouldn't need to know about it.",
    category: "Context, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-advanced-10",
    courseSlug: "react-application-development",
    question:
      "When deciding where state should live in a component tree, what question should you ask first?",
    answer:
      "Which component(s) actually need this state to render correctly, and is it the single source of truth or does it duplicate/derive from state that already exists elsewhere -- state should generally live in the lowest common ancestor of every component that reads or writes it, and nowhere higher than necessary.",
    category: "Context, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Architecture & Patterns (10) ---
  {
    id: "react-interview-arch-01",
    courseSlug: "react-application-development",
    question:
      "What is the `children` prop, and how does it enable a reusable layout/wrapper component?",
    answer:
      "`children` is the special prop containing whatever JSX is nested between a component's opening and closing tags -- a component like `<Card>{...}</Card>` can render a consistent wrapper around arbitrary content without knowing what that content is in advance.",
    category: "Architecture & Patterns",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-arch-02",
    courseSlug: "react-application-development",
    question:
      "What is a higher-order component (HOC), and why have custom hooks largely replaced this pattern?",
    answer:
      "An HOC is a function that takes a component and returns a new, enhanced component (e.g. `withAuth(Component)`). Custom hooks generally achieve the same reuse of stateful logic with less indirection (no wrapper component, no prop-name collisions), which is why hooks are now the more common pattern.",
    category: "Architecture & Patterns",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-arch-03",
    courseSlug: "react-application-development",
    question: "What is `React.lazy` used for?",
    answer:
      "It lets you code-split a component into a separate bundle chunk, loaded only when that component is actually rendered -- typically paired with `<Suspense>` to show a fallback while the chunk downloads, reducing the app's initial bundle size.",
    category: "Architecture & Patterns",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-arch-04",
    courseSlug: "react-application-development",
    question: "What is a React portal, and what is a typical use case?",
    answer:
      "`createPortal` renders a component's output into a DOM node outside its normal parent hierarchy in the tree, while it still behaves as a child in React's component tree (for context, event bubbling) -- commonly used for modals/tooltips that need to escape a parent's `overflow: hidden` or `z-index` stacking context.",
    category: "Architecture & Patterns",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-arch-05",
    courseSlug: "react-application-development",
    question:
      "How does client-side routing (e.g. with a router library) avoid a full page reload when navigating between views?",
    answer:
      "The router intercepts navigation, updates the browser's URL via the History API, and swaps which components are rendered based on the current path -- all without the browser issuing a new full-page request to the server.",
    category: "Architecture & Patterns",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-arch-06",
    courseSlug: "react-application-development",
    question:
      "Why might a large single component that both fetches data and renders complex UI be harder to test and maintain than splitting it into a data-fetching hook plus a presentational component?",
    answer:
      "Splitting separates two different concerns (data-fetching logic and rendering logic) that change for different reasons -- the presentational half can be tested and reused with mock data alone, without needing to mock network calls just to verify rendering.",
    category: "Architecture & Patterns",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-arch-07",
    courseSlug: "react-application-development",
    question:
      "What is the difference between client-side rendering (CSR) and server-side rendering (SSR) in a React app?",
    answer:
      "CSR ships a mostly-empty HTML shell and renders everything in the browser via JavaScript after it loads; SSR renders the initial HTML on the server per request, so the browser receives already-populated markup, generally improving perceived load time and SEO before client-side JavaScript takes over ('hydrates') the page.",
    category: "Architecture & Patterns",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-arch-08",
    courseSlug: "react-application-development",
    question: "What does 'hydration' mean in the context of server-rendered React?",
    answer:
      "The process where React attaches event listeners and internal state to the already-rendered server HTML in the browser, making the static markup interactive, without re-rendering the DOM from scratch if the server and client output match.",
    category: "Architecture & Patterns",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-arch-09",
    courseSlug: "react-application-development",
    question:
      "Why is putting a `key` prop only on the outermost element of a mapped list (not on inner elements) the correct approach?",
    answer:
      "React only reads `key` on the direct children of the element performing the mapping/reconciliation for that list -- putting it deeper inside each list item's own children has no effect on how React tracks and diffs the list items themselves.",
    category: "Architecture & Patterns",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "react-interview-arch-10",
    courseSlug: "react-application-development",
    question:
      "Why is designing a component's prop interface (what it accepts, and what it deliberately doesn't) an architectural decision, not just a typing exercise?",
    answer:
      "A narrow, well-considered prop interface keeps a component's responsibilities clear and prevents callers from coupling to internal implementation details it wasn't designed to expose -- an overly permissive interface (e.g. accepting a raw style object or an arbitrary render callback for everything) tends to make future refactors riskier.",
    category: "Architecture & Patterns",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
