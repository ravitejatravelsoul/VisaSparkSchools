import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * HTML & CSS Fundamentals interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (semantic HTML,
 * accessible forms, selectors/cascade, the box model, Flexbox, Grid,
 * responsive design).
 */
export const htmlCssInterviewQuestions: InterviewQuestionInput[] = [
  // --- Semantic HTML & Accessible Forms (10) ---
  {
    id: "htmlcss-interview-semantic-01",
    courseSlug: "html-css-fundamentals",
    question:
      "What does 'semantic HTML' mean, and why does it matter beyond just how a page looks?",
    answer:
      "Using elements that describe the actual meaning/role of their content (`<nav>`, `<article>`, `<button>`) instead of generic containers styled to look similar (`<div>` for everything) -- semantic elements give screen readers, search engines, and other tooling real structural information that a purely visual approach discards.",
    category: "Semantic HTML & Accessible Forms",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-semantic-02",
    courseSlug: "html-css-fundamentals",
    question:
      "Why is using a `<button>` element preferred over a styled `<div>` with a click handler for an interactive control?",
    answer:
      "A real `<button>` is automatically keyboard-focusable, activatable with Enter/Space, and announced as a button by screen readers -- a `<div>` gets none of this for free and requires manually reimplementing all of that accessible behavior, which is easy to get wrong or forget.",
    category: "Semantic HTML & Accessible Forms",
    difficulty: "intermediate",
    commonMistake:
      "Building an interactive control as a styled <div onClick> instead of a real <button>, losing keyboard operability and screen-reader semantics for free.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-semantic-03",
    courseSlug: "html-css-fundamentals",
    question: "What is the correct way to associate a `<label>` with its form input?",
    answer:
      "Either wrap the input inside the `<label>` element, or give the input an `id` and set the label's `for` attribute to that same `id` -- both let a screen reader announce the label when the input receives focus, and let clicking the label text focus/activate the input.",
    category: "Semantic HTML & Accessible Forms",
    difficulty: "beginner",
    codeExample: '<label for="email">Email</label>\n<input id="email" type="email" />',
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-semantic-04",
    courseSlug: "html-css-fundamentals",
    question:
      "What is the difference between `<h1>`-`<h6>` heading levels and just making text visually large/bold?",
    answer:
      "Heading elements create a real, navigable document outline that screen-reader users can jump through; text that's merely styled to look like a heading (e.g. a bold `<span>`) provides no such structure -- headings should also be used in order (not skipping levels) to keep that outline meaningful.",
    category: "Semantic HTML & Accessible Forms",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-semantic-05",
    courseSlug: "html-css-fundamentals",
    question: "What does the `alt` attribute on an `<img>` do, and what should it contain?",
    answer:
      'It provides alternative text describing the image for screen readers (and for when the image fails to load) -- it should concisely describe the image\'s actual content/purpose, or be left empty (`alt=""`) for purely decorative images so screen readers skip announcing them entirely.',
    category: "Semantic HTML & Accessible Forms",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-semantic-06",
    courseSlug: "html-css-fundamentals",
    question: "What is the difference between `<section>`, `<article>`, and a generic `<div>`?",
    answer:
      "`<article>` marks content that's independently distributable/reusable (a blog post, a comment); `<section>` groups thematically related content, typically with its own heading; `<div>` carries no semantic meaning at all and should be reached for only when no semantic element fits.",
    category: "Semantic HTML & Accessible Forms",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-semantic-07",
    courseSlug: "html-css-fundamentals",
    question:
      "Why should form validation error messages be programmatically associated with their field, not just placed visually nearby?",
    answer:
      "A sighted user can visually connect nearby text to a field, but a screen-reader user needs an explicit association (e.g. `aria-describedby` pointing at the error message's id) -- otherwise the error is announced (if at all) with no clear link to which field it belongs to.",
    category: "Semantic HTML & Accessible Forms",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-semantic-08",
    courseSlug: "html-css-fundamentals",
    question:
      "What is the purpose of the `required` attribute on a form input, and does it replace server-side validation?",
    answer:
      "It triggers built-in browser validation preventing submission until the field is filled, giving immediate client-side feedback -- it does not replace server-side validation, since a request can always be sent directly (bypassing the browser's form), so the server must independently enforce the same rule.",
    category: "Semantic HTML & Accessible Forms",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-semantic-09",
    courseSlug: "html-css-fundamentals",
    question:
      "What does choosing the correct `type` attribute on an `<input>` (e.g. `email`, `tel`, `number`) provide, beyond styling?",
    answer:
      'It triggers the appropriate on-screen keyboard on mobile devices, enables relevant built-in browser validation, and gives assistive technology more accurate information about the expected input -- purely cosmetic `type="text"` for everything loses all of this.',
    category: "Semantic HTML & Accessible Forms",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-semantic-10",
    courseSlug: "html-css-fundamentals",
    question:
      "Why does HTML document structure (correct nesting, one `<html>`/`<head>`/`<body>`) matter even though browsers often 'fix' malformed HTML silently?",
    answer:
      "Browsers' error-recovery behavior for malformed HTML is inconsistent across browsers and can silently produce a different DOM tree than intended, causing CSS/JS to target the wrong elements in some browsers but not others -- relying on error recovery trades a visible error for an invisible, hard-to-debug cross-browser inconsistency.",
    category: "Semantic HTML & Accessible Forms",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Selectors, the Cascade & the Box Model (10) ---
  {
    id: "htmlcss-interview-cascade-01",
    courseSlug: "html-css-fundamentals",
    question: "What does 'the cascade' in CSS refer to?",
    answer:
      "The algorithm the browser uses to resolve conflicting style rules that could apply to the same element -- based on specificity, source order, and origin (e.g. author styles vs. browser defaults vs. `!important`) -- to decide which single value ultimately wins for each property.",
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-cascade-02",
    courseSlug: "html-css-fundamentals",
    question: "How is CSS selector specificity generally ranked, from lowest to highest?",
    answer:
      'Roughly: element/type selectors (e.g. `p`) < class/attribute/pseudo-class selectors (e.g. `.card`, `[type="text"]`, `:hover`) < ID selectors (e.g. `#header`) < inline styles < `!important`. A more specific selector wins regardless of where it appears in the file.',
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-cascade-03",
    courseSlug: "html-css-fundamentals",
    question: "Why is reaching for `!important` generally discouraged?",
    answer:
      "It overrides the normal specificity/cascade resolution, making styles harder to predict and override later -- once one rule uses `!important`, overriding it requires either another `!important` (an escalating pattern) or increasing specificity elsewhere, both of which make the stylesheet harder to reason about over time.",
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "intermediate",
    commonMistake:
      "Reaching for !important to 'win' a specificity fight instead of understanding and fixing the actual selector conflict.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-cascade-04",
    courseSlug: "html-css-fundamentals",
    question: "What does the CSS box model consist of, from innermost to outermost?",
    answer:
      "Content, padding, border, and margin -- content is the element's actual content area, padding is space inside the border, the border itself, and margin is space outside the border separating the element from its neighbors.",
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-cascade-05",
    courseSlug: "html-css-fundamentals",
    question:
      "What is the difference between `box-sizing: content-box` (the default) and `box-sizing: border-box`?",
    answer:
      "With `content-box`, a set `width`/`height` applies only to the content area, and padding/border are added on top, making the element's rendered size larger than the declared width; with `border-box`, the declared `width`/`height` includes padding and border, so the element's total rendered size matches what you set.",
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "intermediate",
    commonMistake:
      "Setting width: 200px with default content-box sizing and being surprised the element renders wider than 200px once padding/border are added.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-cascade-06",
    courseSlug: "html-css-fundamentals",
    question:
      "What is the difference between `margin` collapsing between two vertically-adjacent block elements versus not collapsing?",
    answer:
      "Vertical margins between adjacent block-level elements (or a parent and its first/last child, under certain conditions) can collapse into a single margin equal to the larger of the two, rather than summing -- a frequently-surprising CSS behavior that doesn't apply to horizontal margins or to flex/grid children.",
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-cascade-07",
    courseSlug: "html-css-fundamentals",
    question:
      "What is the difference between `display: block`, `display: inline`, and `display: inline-block`?",
    answer:
      "`block` elements start on a new line and accept width/height/vertical margin; `inline` elements flow within surrounding text and ignore width/height/vertical margin; `inline-block` flows inline like text but does accept width/height/margin like a block.",
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-cascade-08",
    courseSlug: "html-css-fundamentals",
    question:
      "What does the CSS `:hover` pseudo-class do, and why doesn't it work well for touch-only devices?",
    answer:
      "It applies styles while the pointer is positioned over an element -- touch devices have no persistent pointer 'hovering,' so hover-dependent interactions (like a menu that only opens on hover) can be difficult or impossible to trigger on touchscreens, which is why hover shouldn't be the only way to reveal important content.",
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-cascade-09",
    courseSlug: "html-css-fundamentals",
    question: "What is the difference between a class selector and an attribute selector?",
    answer:
      'A class selector (`.card`) matches elements with that class in their `class` attribute; an attribute selector (`[type="email"]`) matches elements based on the presence or value of any HTML attribute, not just `class` -- useful for styling elements by a semantic attribute without adding an extra class.',
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-cascade-10",
    courseSlug: "html-css-fundamentals",
    question:
      "Why can two CSS rules with the exact same specificity produce different winning results depending on file order?",
    answer:
      "When specificity is tied, the cascade falls back to source order -- the rule that appears later in the stylesheet (or in a later-loaded stylesheet) wins, which is why load order of CSS files/rules matters even when specificity alone doesn't resolve a conflict.",
    category: "Selectors, the Cascade & the Box Model",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Flexbox (10) ---
  {
    id: "htmlcss-interview-flex-01",
    courseSlug: "html-css-fundamentals",
    question:
      "What problem does Flexbox solve that made older layout techniques (floats, inline-block hacks) painful?",
    answer:
      "Flexbox provides a real one-dimensional layout system with built-in alignment, spacing, and ordering controls -- centering an element vertically, evenly distributing space, or reordering visually without changing HTML source order all used to require fragile hacks, and are now single, purpose-built properties.",
    category: "Flexbox",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-flex-02",
    courseSlug: "html-css-fundamentals",
    question:
      "What is the difference between the main axis and the cross axis in a flex container?",
    answer:
      "The main axis runs in the direction set by `flex-direction` (row by default); the cross axis runs perpendicular to it. `justify-content` aligns items along the main axis; `align-items`/`align-content` align items along the cross axis.",
    category: "Flexbox",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-flex-03",
    courseSlug: "html-css-fundamentals",
    question:
      "What do the `flex-grow`, `flex-shrink`, and `flex-basis` properties (often shorthand as `flex`) control?",
    answer:
      "`flex-basis` sets an item's initial main-axis size before extra space is distributed; `flex-grow` controls how much of any extra available space that item should absorb relative to its siblings; `flex-shrink` controls how much it should shrink relative to siblings when there isn't enough space.",
    category: "Flexbox",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-flex-04",
    courseSlug: "html-css-fundamentals",
    question:
      "How do you center a single child both horizontally and vertically inside a flex container?",
    answer:
      "Set `display: flex` on the parent, then `justify-content: center` and `align-items: center` -- this handles centering in both directions without needing to know the child's exact dimensions.",
    category: "Flexbox",
    difficulty: "beginner",
    codeExample:
      ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-flex-05",
    courseSlug: "html-css-fundamentals",
    question: "What does `flex-wrap: wrap` change about a flex container's default behavior?",
    answer:
      "By default, flex items all try to fit on a single line, shrinking as needed; `flex-wrap: wrap` allows items to flow onto multiple lines instead of continuing to shrink indefinitely once they run out of room on the current line.",
    category: "Flexbox",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-flex-06",
    courseSlug: "html-css-fundamentals",
    question:
      "What is a common mistake when using `justify-content: space-between` for a navigation bar with a variable number of items?",
    answer:
      "With very few items, `space-between` can leave items pushed to the far edges with an unnaturally large gap in the middle -- for small/variable item counts, `gap` combined with `justify-content: flex-start` or `center` often produces more visually consistent spacing.",
    category: "Flexbox",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-flex-07",
    courseSlug: "html-css-fundamentals",
    question: "What does the `order` property do on a flex item, and what does it NOT change?",
    answer:
      "`order` changes an item's visual position within the flex container without changing its position in the actual HTML source (and therefore not its position in the DOM/tab order) -- this can create a real accessibility mismatch between visual and keyboard-navigation order if used carelessly.",
    category: "Flexbox",
    difficulty: "advanced",
    commonMistake:
      "Reordering items visually with the order property in a way that no longer matches keyboard tab order, confusing keyboard-only users.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-flex-08",
    courseSlug: "html-css-fundamentals",
    question:
      "What does the `gap` property do in a flex container, and why is it preferred over margins on individual items?",
    answer:
      "`gap` sets consistent spacing between flex items directly on the container, without needing to add and then carefully remove margins on first/last items to avoid extra edge spacing -- a single, simpler declaration than the older margin-based spacing hacks.",
    category: "Flexbox",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-flex-09",
    courseSlug: "html-css-fundamentals",
    question:
      "How would you build a simple 'sticky footer' layout (footer always at the bottom, even on short pages) using Flexbox?",
    answer:
      "Make the page's root container a flex column (`display: flex; flex-direction: column; min-height: 100vh`), then give the main content area `flex: 1` so it grows to fill available space, naturally pushing the footer to the bottom regardless of content height.",
    category: "Flexbox",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-flex-10",
    courseSlug: "html-css-fundamentals",
    question: "When is Flexbox the wrong tool, favoring CSS Grid instead?",
    answer:
      "When you need to control layout in two dimensions simultaneously (rows AND columns aligned together, like a dashboard or card grid) -- Flexbox is fundamentally one-dimensional, so achieving true two-dimensional alignment with it requires workarounds that Grid handles natively.",
    category: "Flexbox",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- CSS Grid (10) ---
  {
    id: "htmlcss-interview-grid-01",
    courseSlug: "html-css-fundamentals",
    question: "What makes CSS Grid fundamentally different from Flexbox?",
    answer:
      "Grid is a two-dimensional layout system -- you define both rows and columns explicitly and place items into that grid -- while Flexbox is one-dimensional, laying items out along a single main axis (with wrapping as a secondary, less-precise mechanism).",
    category: "CSS Grid",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-grid-02",
    courseSlug: "html-css-fundamentals",
    question: "What does `grid-template-columns: repeat(3, 1fr)` define?",
    answer:
      "Three equal-width columns, each taking one fractional unit (`fr`) of the available space -- `fr` distributes remaining space proportionally, similar in spirit to `flex-grow` but for grid tracks.",
    category: "CSS Grid",
    difficulty: "intermediate",
    codeExample:
      ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-grid-03",
    courseSlug: "html-css-fundamentals",
    question: "What is the difference between `fr` units and percentages for sizing grid columns?",
    answer:
      "`fr` distributes the space remaining *after* any fixed-size tracks and gaps are accounted for; percentages are based on the full container width regardless of fixed tracks -- mixing `fr` with a fixed-width column (e.g. `200px 1fr`) is a common, robust pattern that percentages can't replicate as cleanly.",
    category: "CSS Grid",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-grid-04",
    courseSlug: "html-css-fundamentals",
    question:
      "How does `grid-template-areas` improve layout readability compared to positioning items purely with row/column line numbers?",
    answer:
      'It lets you name layout regions (e.g. `"header header" "sidebar main" "footer footer"`) directly in the CSS as a visual ASCII-art-like map, then assign each item to a named area -- far easier to read and maintain than tracking numeric grid-line positions for every item.',
    category: "CSS Grid",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-grid-05",
    courseSlug: "html-css-fundamentals",
    question:
      "What does `auto-fit` combined with `minmax()` in `grid-template-columns` achieve for a responsive card grid?",
    answer:
      "`repeat(auto-fit, minmax(200px, 1fr))` automatically fits as many columns as will comfortably hold at least 200px each, wrapping to fewer columns on narrower screens -- a fully responsive grid with zero media queries needed for the column count itself.",
    category: "CSS Grid",
    difficulty: "advanced",
    codeExample: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-grid-06",
    courseSlug: "html-css-fundamentals",
    question:
      "What is the difference between `auto-fit` and `auto-fill` in a `repeat()` grid track definition?",
    answer:
      "`auto-fill` keeps empty tracks reserved (as if invisible extra columns exist) when there aren't enough items to fill a row, which can leave visible gaps; `auto-fit` collapses those empty tracks, letting the actual items stretch to fill the available space instead.",
    category: "CSS Grid",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-grid-07",
    courseSlug: "html-css-fundamentals",
    question: "How do you make a single grid item span multiple columns or rows?",
    answer:
      "Set `grid-column: span 2` (or explicit line numbers like `grid-column: 1 / 3`) to span columns, and similarly `grid-row` to span rows -- letting individual items occupy more than one cell of the grid.",
    category: "CSS Grid",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-grid-08",
    courseSlug: "html-css-fundamentals",
    question:
      "Can Flexbox and Grid be used together in the same layout, and when would you do that?",
    answer:
      "Yes -- a common pattern is Grid for the page's overall two-dimensional structure (header/sidebar/main/footer) and Flexbox for one-dimensional alignment within individual grid areas (e.g. centering a row of buttons inside the header cell).",
    category: "CSS Grid",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-grid-09",
    courseSlug: "html-css-fundamentals",
    question:
      "What does the `gap` property do in a Grid container, and does it work the same way as in Flexbox?",
    answer:
      "It sets spacing between rows and columns (or set separately via `row-gap`/`column-gap`) -- conceptually the same purpose as Flexbox's `gap`, spacing between tracks/items without needing manual margins, though it applies across two dimensions in Grid.",
    category: "CSS Grid",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-grid-10",
    courseSlug: "html-css-fundamentals",
    question: "What is a common mistake when nesting a flex or grid container inside a grid item?",
    answer:
      "Forgetting that a grid item's own content needs its own explicit `display` (e.g. `display: flex`) to lay out ITS children -- being inside a grid area doesn't automatically make an item's own children participate in flex/grid layout; that's a separate, independent layout context you have to declare.",
    category: "CSS Grid",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Responsive Design (10) ---
  {
    id: "htmlcss-interview-responsive-01",
    courseSlug: "html-css-fundamentals",
    question: "What does 'mobile-first' responsive design mean?",
    answer:
      "Writing your base CSS for the smallest/narrowest screen first, then using `min-width` media queries to progressively add complexity/columns for larger screens -- rather than starting from a desktop layout and using `max-width` queries to squeeze it down, which tends to produce more overrides and fights with the cascade.",
    category: "Responsive Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-responsive-02",
    courseSlug: "html-css-fundamentals",
    question: "What does a CSS media query do, and give a basic example?",
    answer:
      "It applies a block of CSS rules only when a specified condition (like viewport width) is true -- `@media (min-width: 768px) { .sidebar { display: block; } }` only applies that rule at 768px viewport width or wider.",
    category: "Responsive Design",
    difficulty: "beginner",
    codeExample: "@media (min-width: 768px) {\n  .sidebar { display: block; }\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-responsive-03",
    courseSlug: "html-css-fundamentals",
    question:
      'What does the viewport meta tag (`<meta name="viewport" content="width=device-width, initial-scale=1">`) do, and why is it required for responsive design to work on mobile?',
    answer:
      "Without it, mobile browsers render the page at a fixed desktop-width virtual viewport (typically ~980px) and then zoom out to fit the screen, meaning media queries never actually trigger as expected -- this tag tells the browser to use the device's real width, which is a prerequisite for responsive CSS to work at all on mobile.",
    category: "Responsive Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-responsive-04",
    courseSlug: "html-css-fundamentals",
    question:
      "What is the difference between `px`, `rem`, and `%` as CSS units, and when might `rem` be preferable to `px` for font sizes?",
    answer:
      "`px` is an absolute, fixed unit; `%` is relative to a parent's size; `rem` is relative to the root (`<html>`) element's font size. Using `rem` for font sizes lets a user's browser-level font-size preference (accessibility zoom) scale your entire site's text proportionally, which fixed `px` sizes don't respect.",
    category: "Responsive Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-responsive-05",
    courseSlug: "html-css-fundamentals",
    question: "Why should images generally have `max-width: 100%` in a responsive layout?",
    answer:
      "Without it, an image renders at its natural pixel dimensions regardless of its container's width, potentially overflowing a narrow mobile viewport and breaking the layout -- `max-width: 100%` (with `height: auto`) lets the image shrink to fit its container while keeping its aspect ratio.",
    category: "Responsive Design",
    difficulty: "intermediate",
    commonMistake:
      "Embedding a large fixed-dimension image without max-width constraints, causing horizontal overflow on narrow screens.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-responsive-06",
    courseSlug: "html-css-fundamentals",
    question: "What is the difference between a fluid layout and a fixed-breakpoint layout?",
    answer:
      "A fluid layout continuously adapts using relative units and flexible techniques (like `fr`/percentage-based Grid/Flexbox sizing) without hard jumps; a breakpoint-based layout changes distinctly at specific viewport widths (via media queries) -- most real responsive sites combine both, fluid within a breakpoint and distinct layout changes across breakpoints.",
    category: "Responsive Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-responsive-07",
    courseSlug: "html-css-fundamentals",
    question:
      "Why is testing a responsive layout only by resizing a desktop browser window an incomplete verification strategy?",
    answer:
      "Real mobile devices differ in more than just viewport width -- touch-target size requirements, actual device pixel density, and browser chrome behavior all differ from a resized desktop window -- so real-device or accurate device-emulation testing catches issues a simple browser resize won't.",
    category: "Responsive Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-responsive-08",
    courseSlug: "html-css-fundamentals",
    question:
      "What is a reasonable minimum touch-target size to keep interactive elements usable on a touchscreen?",
    answer:
      "A commonly cited accessibility guideline is roughly 44x44 CSS pixels -- smaller interactive targets become difficult to tap accurately, especially for users with limited dexterity, even if they look fine visually on a desktop mouse-driven layout.",
    category: "Responsive Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-responsive-09",
    courseSlug: "html-css-fundamentals",
    question:
      "How would you responsively hide a desktop-only navigation menu and show a mobile hamburger menu instead, at a conceptual level?",
    answer:
      "Use a media query to toggle `display` between the two versions based on viewport width (e.g. show the full nav and hide the hamburger button above a breakpoint, and vice versa below it) -- both markup structures typically exist in the DOM, with CSS controlling which is visible at a given width.",
    category: "Responsive Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "htmlcss-interview-responsive-10",
    courseSlug: "html-css-fundamentals",
    question:
      "Why might designing 'mobile-first' also produce a better desktop experience, not just a better mobile one?",
    answer:
      "Starting from the most space-constrained version forces prioritizing essential content and interactions first, which tends to produce clearer information hierarchy that then benefits from added space on larger screens -- rather than cramming an already-complex desktop design down until it barely fits mobile.",
    category: "Responsive Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
