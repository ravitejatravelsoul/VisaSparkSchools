import type { LessonInput } from "@/lib/content/types";

export const htmlCssLessons: LessonInput[] = [
  {
    id: "html-document-structure",
    slug: "html-document-structure",
    title: "HTML Document Structure & Basic Elements",
    description:
      "Learn the anatomy of every HTML page — doctype, html, head, and body — plus everyday elements like headings, paragraphs, and comments.",
    trackSlug: "web-html-css",
    courseSlug: "html-css-fundamentals",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Explain the purpose of the doctype declaration and the html/head/body skeleton",
      "Identify what belongs inside <head> versus <body>",
      "Use common text elements: headings, paragraphs, div, span, and comments",
    ],
    skills: ["html", "html-basics"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Basic HTML syntax",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax",
      },
      {
        label: "MDN: HTML element reference",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
      },
    ],
    keywords: ["html", "doctype", "head", "body", "elements", "tags", "document structure"],
    explanation: `Every single web page you've ever visited — a search engine, a bank, a game — is built from the same handful of structural pieces arranged the same way. Once you can see that shape, HTML stops feeling like a giant list of tags to memorize and starts feeling like a small, predictable skeleton you dress up differently each time.

## The Skeleton: doctype, html, head, body

At the very top of an HTML file sits \`<!doctype html>\`. It isn't really a "tag" so much as an instruction to the browser: *render this using the modern HTML standard*, rather than guessing based on quirky old rules from the 1990s. Skipping it can cause a browser to render your page in "quirks mode," where spacing and sizing behave unpredictably.

Right below it comes a single \`<html>\` element, which wraps everything else on the page. Inside \`<html>\`, there are exactly two children:

- **\`<head>\`** holds information *about* the page that isn't drawn directly onto it — the browser tab title, the character encoding, links to stylesheets, and metadata search engines read. Nothing inside \`<head>\` shows up as visible page content.
- **\`<body>\`** holds everything a visitor actually sees and interacts with: text, images, buttons, forms, all of it.

A common beginner instinct is to put a heading or a paragraph inside \`<head>\` by mistake — it simply won't appear on the page, because \`<head>\` isn't meant for visible content at all.

## The Everyday Elements

Once you're inside \`<body>\`, a small set of elements covers most early pages:

- **Headings**, \`<h1>\` through \`<h6>\`, create a title hierarchy — \`<h1>\` is the single most important heading on a page, and levels should generally step down one at a time rather than skip.
- **Paragraphs**, \`<p>\`, wrap a block of running text.
- **\`<div>\`** is a generic block-level container with no built-in meaning — useful for grouping things together for styling, but not descriptive on its own (you'll meet more descriptive containers in the next lesson).
- **\`<span>\`** is the inline cousin of \`<div>\`: it wraps a small piece of text *within* a line, without starting a new line, useful for styling a single word differently.
- **\`<br>\`** forces a single line break inside text, and **\`<hr>\`** draws a horizontal rule to visually separate sections.
- **Comments**, written as \`<!-- like this -->\`, are completely ignored by the browser — handy for leaving yourself notes in the source code.

## Tags, Elements, and Nesting

A "tag" is the bracketed marker itself, like \`<p>\` or \`</p>\`; an "element" is the tag pair plus everything between them. Most elements need both an opening and closing tag, and elements can nest inside one another — but nesting has to be tidy. If you open a \`<div>\` and then a \`<p>\` inside it, you must close the \`<p>\` *before* closing the \`<div>\`, like closing parentheses in the reverse order you opened them. Getting this wrong doesn't always crash anything visibly, but it can quietly scramble how the browser interprets your structure.

None of this requires memorizing dozens of tags today. Get comfortable with the doctype-html-head-body skeleton and this small handful of everyday elements, and every additional tag you learn afterward will simply slot into a shape you already understand.`,
    example: {
      language: "html",
      description:
        "A minimal but complete HTML page showing the doctype, head metadata, and a few common body elements.",
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>About Me</title>
  </head>
  <body>
    <h1>Hi, I'm building my first page</h1>
    <p>This paragraph is regular <span>flowing</span> text.</p>
    <div>
      <p>This paragraph lives inside a div, a generic container.</p>
    </div>
    <!-- This is a comment; the browser ignores it entirely -->
    <hr />
    <p>A horizontal rule appeared above this line.</p>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description:
        "Change the heading and paragraph text, then add a second <p> below it, and press Run.",
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Edit me</title>
  </head>
  <body>
    <h1>Change this heading</h1>
    <p>Change this paragraph, then press Run.</p>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "html-document-structure-guided",
      kind: "guided",
      language: "html",
      prompt:
        "The page below is missing its <title>. Add a <title>My First Page</title> element inside <head> so the browser tab shows a real title.",
      starterCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- Add a <title> element here -->
  </head>
  <body>
    <h1>My First Page</h1>
    <p>Welcome to my very first web page.</p>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>My First Page</h1>
    <p>Welcome to my very first web page.</p>
  </body>
</html>`,
      harness: `
        const title = document.querySelector('title');
        window.__report('t1', !!title && title.textContent.trim().length > 0, 'Add a non-empty <title> element inside <head>.');
        window.__report('t2', document.querySelectorAll('h1').length === 1, 'Keep exactly one <h1>.');
        window.__report('t3', document.querySelectorAll('p').length >= 1, 'Keep at least one <p>.');
      `,
      tests: [
        { id: "t1", description: "Adds a non-empty <title> inside <head>", hidden: false },
        { id: "t2", description: "Still has exactly one <h1>", hidden: false },
        { id: "t3", description: "Still has at least one <p>", hidden: true },
      ],
      hints: [
        "Every HTML document has two main sections: <head> for metadata the browser needs but doesn't display directly, and <body> for what visitors actually see.",
        "Look inside the <head>...</head> section, right where the comment marks the missing piece.",
        "The element you need is <title>, which sets the text shown in the browser tab.",
        "Example shape: <title>My First Page</title>",
      ],
    },
    independentExercise: {
      id: "html-document-structure-independent",
      kind: "independent",
      language: "html",
      prompt:
        'Build a complete HTML page from scratch: keep the doctype, an <html lang="en"> element, a <head> with a <meta charset="utf-8"> and a non-empty <title>, and a <body> with exactly one <h1>, at least two <p> paragraphs, and a <div> that contains a <span>.',
      starterCode: `<!doctype html>
<html lang="en">
  <head>
    <!-- add meta charset and a title -->
  </head>
  <body>
    <!-- build your content here -->
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My Practice Page</title>
  </head>
  <body>
    <h1>Learning HTML structure</h1>
    <p>This is the first paragraph on my page.</p>
    <p>This is the second paragraph, just to practice.</p>
    <div>
      <span>A short inline note inside a div.</span>
    </div>
  </body>
</html>`,
      harness: `
        window.__report('t1', document.doctype !== null, 'Keep the <!doctype html> declaration.');
        const title = document.querySelector('title');
        window.__report('t2', !!title && title.textContent.trim().length > 0, 'Add a non-empty <title> inside <head>.');
        window.__report('t3', document.querySelectorAll('h1').length === 1, 'Include exactly one <h1>.');
        window.__report('t4', document.querySelectorAll('p').length >= 2, 'Include at least two <p> paragraphs.');
        window.__report('t5', document.querySelector('div span') !== null, 'Include a <div> that contains a <span> inside it.');
      `,
      tests: [
        { id: "t1", description: "Keeps the doctype declaration", hidden: false },
        { id: "t2", description: "Has a non-empty <title>", hidden: false },
        { id: "t3", description: "Has exactly one <h1>", hidden: false },
        { id: "t4", description: "Has at least two <p> paragraphs", hidden: false },
        { id: "t5", description: "Has a <div> containing a <span>", hidden: true },
      ],
      hints: [
        "Recall the four-part skeleton every page needs: doctype, <html>, <head> for metadata, and <body> for visible content.",
        "Start with the <head>: it needs a character-encoding meta tag and a title. Then move on to the <body> for visible elements.",
        'Use <meta charset="utf-8" /> and <title>...</title> in the head; use <h1>, two <p> elements, and a <div> wrapping a <span> in the body.',
        "Partial shape: <div><span>some inline text</span></div> placed anywhere inside <body>.",
      ],
    },
    commonMistakes: [
      "Forgetting the doctype, which can push unusual browsers into a legacy rendering mode instead of the modern standards mode.",
      "Putting visible text like headings or paragraphs inside <head> — nothing in <head> is rendered on the page itself.",
      "Nesting tags incorrectly, such as closing a <div> before closing a <p> that's still open inside it, which scrambles the element tree.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the purpose of <!doctype html>?",
        choices: [
          "It loads a CSS file",
          "It tells the browser to use standards-mode HTML5 rendering",
          "It defines the page title",
          "It creates a comment",
        ],
        correctIndex: 1,
        explanation:
          "The doctype declaration signals modern standards-mode rendering rather than a legacy quirks mode.",
      },
      {
        id: "q2",
        prompt:
          "Which section holds metadata like the title and character encoding, without displaying it directly on the page?",
        choices: ["<body>", "<head>", "<main>", "<footer>"],
        correctIndex: 1,
        explanation:
          "<head> contains metadata the browser needs; visible content belongs in <body>.",
      },
      {
        id: "q3",
        prompt: "What does a <span> element do?",
        choices: [
          "Starts a new paragraph",
          "Wraps inline content without adding a line break",
          "Always adds a horizontal line",
          "Creates a numbered list",
        ],
        correctIndex: 1,
        explanation: "<span> is an inline container, useful for styling part of a line of text.",
      },
      {
        id: "q4",
        prompt:
          "Which of these is a valid way to comment out text in HTML so the browser ignores it?",
        choices: ["// like this", "<!-- like this -->", "# like this", "/* like this */"],
        correctIndex: 1,
        explanation: "HTML comments use the <!-- ... --> syntax and are never rendered.",
      },
    ],
    takeaway:
      "Every HTML page begins with the same doctype + html/head/body skeleton — master that shape and everything else is just filling it with the right tags.",
    summary:
      "HTML documents share a predictable skeleton: a doctype declaration, a single <html> element containing a <head> for metadata and a <body> for visible content. Common elements like headings, paragraphs, div, span, and comments cover most of what an early page needs, as long as tags are closed and nested correctly.",
    nextLessonSlug: "html-semantic-elements",
  },
  {
    id: "html-semantic-elements",
    slug: "html-semantic-elements",
    title: "Semantic HTML: Links, Images, Lists & Tables",
    description:
      "Move beyond generic divs — structure pages with semantic landmarks, and add links, images, lists, and tables correctly.",
    trackSlug: "web-html-css",
    courseSlug: "html-css-fundamentals",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: ["html-document-structure"],
    objectives: [
      "Choose semantic landmark elements (header, nav, main, section, article, aside, footer) over generic divs where appropriate",
      "Create links with <a href> and images with <img src alt>",
      "Structure content with ordered/unordered lists and tables",
    ],
    skills: ["html", "semantic-html"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: HTML text fundamentals",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_text_fundamentals",
      },
      {
        label: "MDN: The table element",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table",
      },
    ],
    keywords: [
      "semantic html",
      "header",
      "nav",
      "main",
      "footer",
      "links",
      "images",
      "alt text",
      "lists",
      "tables",
    ],
    explanation: `You could build an entire website using only \`<div>\` elements, and the browser would happily render it. But a page made only of divs tells a screen reader, a search engine, and the next developer who opens the file absolutely nothing about *what* each part is for. Semantic HTML fixes that by choosing elements whose names describe their role.

## Landmark Elements

A handful of elements describe the major regions of a page:

- **\`<header>\`** — introductory content for a page or a section, often a logo and heading.
- **\`<nav>\`** — a block of primarily navigational links.
- **\`<main>\`** — the one region holding the page's unique, central content (only one per page).
- **\`<section>\`** — a thematic grouping of content, usually with its own heading.
- **\`<article>\`** — a self-contained piece of content that would still make sense if pulled out and syndicated elsewhere, like a blog post or product card.
- **\`<aside>\`** — content tangentially related to the main content, like a sidebar.
- **\`<footer>\`** — closing content for a page or section, like copyright or contact links.

These aren't just cosmetic labels. Screen readers expose them as "landmarks" that let a visitor jump straight to navigation or straight to the main content, instead of listening through everything from the top every single time. Use a plain \`<div>\` only when none of these more descriptive elements fit.

## Links and Images

A link is written \`<a href="destination">visible text</a>\`. The \`href\` attribute is what makes it a link at all — without one, an \`<a>\` isn't clickable. Destinations can be another page, a section on the same page (\`#some-id\`), or an external site.

Images use \`<img src="path" alt="description" />\` — note there's no closing tag, since an image has no content to wrap. The \`alt\` attribute is not optional decoration: it's the text a screen reader announces instead of the image, and the text a browser shows if the image fails to load. A purely decorative image (like a background flourish) can use \`alt=""\` to be explicitly skipped; anything meaningful needs a real description.

## Lists

- **\`<ul>\`** (unordered list) is for items with no inherent order — a set of features, ingredients, or links.
- **\`<ol>\`** (ordered list) is for items where sequence matters — steps in a recipe, rankings.
- Both wrap individual **\`<li>\`** (list item) elements, and lists can nest inside each other to represent sub-groups.

## Tables

Tables exist for *tabular data* — rows and columns of related values, like a pricing chart or a schedule — never for general page layout (that's what Flexbox and Grid, covered later in this course, are for). A table's shape is: \`<table>\` wraps optional \`<thead>\` (header row) and \`<tbody>\` (data rows); each row is a \`<tr>\`; header cells use \`<th>\`, data cells use \`<td>\`. Marking header cells with \`<th>\` instead of \`<td>\` isn't just visual — it tells assistive technology which cell labels which column or row.

Reaching for the semantically correct element over a generic \`<div>\` costs nothing extra to write, and pays off the moment anyone — human or machine — needs to understand your page's structure rather than just its appearance.`,
    example: {
      language: "html",
      description:
        "A full page using semantic landmarks, a navigation link list, an image with alt text, and a small table.",
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Semantic page</title>
  </head>
  <body>
    <header>
      <h1>Trail Guide</h1>
      <nav>
        <a href="#trails">Trails</a>
        <a href="#gear">Gear</a>
      </nav>
    </header>
    <main>
      <section id="trails">
        <h2>Featured trail</h2>
        <article>
          <h3>Ridge Loop</h3>
          <img src="ridge.jpg" alt="A rocky ridge trail above a pine forest" />
          <p>A 6-mile loop with steady climbing and wide views.</p>
        </article>
        <ul>
          <li>Distance: 6 miles</li>
          <li>Elevation gain: 1,200 ft</li>
        </ul>
      </section>
      <table>
        <thead>
          <tr>
            <th>Trail</th>
            <th>Length</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ridge Loop</td>
            <td>6 miles</td>
          </tr>
        </tbody>
      </table>
    </main>
    <footer>
      <p>&copy; 2026 Trail Guide</p>
    </footer>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description: "Add a third navigation link and a third <li> to the list, then press Run.",
      code: `<!doctype html>
<html lang="en">
  <body>
    <header>
      <nav>
        <a href="#one">One</a>
        <a href="#two">Two</a>
      </nav>
    </header>
    <main>
      <ul>
        <li>First item</li>
        <li>Second item</li>
      </ul>
    </main>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "html-semantic-elements-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Add a <nav> inside <header> containing at least two <a> links, and give the existing <img> a meaningful, non-empty alt attribute.",
      starterCode: `<!doctype html>
<html lang="en">
  <body>
    <header>
      <h1>My Site</h1>
      <!-- Add a <nav> with at least two links here -->
    </header>
    <main>
      <img src="photo.jpg" />
      <!-- give the img above a meaningful alt attribute -->
    </main>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html lang="en">
  <body>
    <header>
      <h1>My Site</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
      </nav>
    </header>
    <main>
      <img src="photo.jpg" alt="A scenic view from the summit" />
    </main>
  </body>
</html>`,
      harness: `
        window.__report('t1', document.querySelector('header nav') !== null, 'Add a <nav> element inside <header>.');
        window.__report('t2', document.querySelectorAll('header nav a').length >= 2, 'The <nav> should contain at least two <a> links.');
        const img = document.querySelector('img');
        window.__report('t3', !!img && !!img.getAttribute('alt') && img.getAttribute('alt').trim().length > 0, 'Give the <img> a non-empty alt attribute.');
      `,
      tests: [
        { id: "t1", description: "Adds a <nav> inside <header>", hidden: false },
        { id: "t2", description: "The <nav> has at least two links", hidden: false },
        { id: "t3", description: "The <img> has a meaningful alt attribute", hidden: true },
      ],
      hints: [
        "A <nav> element marks a block of navigational links, and alt text is what a screen reader announces in place of an image.",
        "Look inside <header> for the nav, and look at the <img> tag itself for the alt attribute.",
        'Wrap two or more <a href="...">...</a> links inside a <nav>, and add alt="..." describing the photo to the <img>.',
        'Shape: <nav><a href="#home">Home</a><a href="#about">About</a></nav> and alt="A short description"',
      ],
    },
    independentExercise: {
      id: "html-semantic-elements-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Build a semantic page: a <header> with a <nav> containing at least two links, a <main> containing one <article> and one <aside>, a <ul> with at least three <li> items somewhere on the page, and a <footer>.",
      starterCode: `<!doctype html>
<html lang="en">
  <body>
    <!-- build header, main, and footer here -->
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html lang="en">
  <body>
    <header>
      <h1>My Blog</h1>
      <nav>
        <a href="#posts">Posts</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
      <article>
        <h2>My first post</h2>
        <p>Some interesting thoughts.</p>
      </article>
      <aside>
        <h3>Related links</h3>
        <ul>
          <li>Link one</li>
          <li>Link two</li>
          <li>Link three</li>
        </ul>
      </aside>
    </main>
    <footer>
      <p>&copy; 2026 My Blog</p>
    </footer>
  </body>
</html>`,
      harness: `
        window.__report('t1', document.querySelectorAll('header nav a').length >= 2, 'The <header> needs a <nav> with at least two links.');
        window.__report('t2', document.querySelector('main article') !== null, 'The <main> needs an <article> inside it.');
        window.__report('t3', document.querySelector('main aside') !== null, 'The <main> needs an <aside> inside it.');
        window.__report('t4', document.querySelectorAll('ul li').length >= 3, 'Somewhere on the page, include a <ul> with at least three <li> items.');
        window.__report('t5', document.querySelector('footer') !== null, 'Include a <footer> element.');
      `,
      tests: [
        { id: "t1", description: "Header contains a nav with 2+ links", hidden: false },
        { id: "t2", description: "Main contains an article", hidden: false },
        { id: "t3", description: "Main contains an aside", hidden: false },
        { id: "t4", description: "A list with at least 3 items exists", hidden: false },
        { id: "t5", description: "A footer element exists", hidden: true },
      ],
      hints: [
        "Recall the landmark elements: header, nav, main, article, aside, and footer each describe a different role on the page.",
        "Structure the page top to bottom: header (with nav) first, then main (with article and aside inside it), then footer.",
        "Put your navigational links inside <nav>, your primary content inside <article>, and a related sidebar inside <aside>; add a <ul> with three <li> items anywhere sensible.",
        "Shape: <header><nav>...</nav></header><main><article>...</article><aside><ul>...</ul></aside></main><footer>...</footer>",
      ],
    },
    commonMistakes: [
      "Using <div> everywhere instead of header, nav, main, article, aside, or footer when a more descriptive element clearly fits.",
      "Leaving alt attributes empty or filled with unhelpful text like 'image123' on meaningful images, instead of a real description.",
      "Building a table without <th> header cells, so assistive technology has no way to know what each column or row represents.",
      'Using a link with no real href, or a <div> with a click handler, where a proper <a href="..."> would be both simpler and more accessible.',
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Which element should wrap a self-contained piece of content, like a single blog post?",
        choices: ["<aside>", "<article>", "<span>", "<footer>"],
        correctIndex: 1,
        explanation:
          "<article> is meant for content that would still make sense on its own if extracted, such as a blog post.",
      },
      {
        id: "q2",
        prompt: "What is the purpose of an <img>'s alt attribute?",
        choices: [
          "It sets the image's file size",
          "It provides text read by screen readers and shown if the image fails to load",
          "It makes the image clickable",
          "It is purely decorative and has no functional purpose",
        ],
        correctIndex: 1,
        explanation:
          "alt text is essential for accessibility and for graceful fallback when an image can't load.",
      },
      {
        id: "q3",
        prompt: "In a table, what is the difference between <th> and <td>?",
        choices: [
          "There is no difference, they render identically in every browser",
          "<th> marks a header cell (labeling a row or column), <td> marks a regular data cell",
          "<th> is for images, <td> is for text",
          "<th> can only appear once per table",
        ],
        correctIndex: 1,
        explanation:
          "<th> semantically marks header cells, which assistive technology relies on to describe data cells.",
      },
      {
        id: "q4",
        prompt: "Which element makes text into a clickable link?",
        choices: ["<link>", '<a href="...">', "<nav>", '<button type="link">'],
        correctIndex: 1,
        explanation:
          "The anchor element <a> with an href attribute is what creates a navigable link.",
      },
    ],
    takeaway:
      "Choosing the semantically correct element instead of a generic div costs nothing to write, but tells browsers, search engines, and assistive technology exactly what each part of your page means.",
    summary:
      "Semantic landmarks like header, nav, main, article, aside, and footer describe the role of each page region instead of relying on meaningless divs. Links need a real href, images need meaningful alt text, lists come in ordered and unordered flavors, and tables should be reserved for genuinely tabular data with properly marked header cells.",
    nextLessonSlug: "html-forms-accessibility",
  },
  {
    id: "html-forms-accessibility",
    slug: "html-forms-accessibility",
    title: "Forms, Validation & Accessibility Foundations",
    description:
      "Build usable forms with properly linked labels, built-in browser validation, and the accessibility basics every page needs.",
    trackSlug: "web-html-css",
    courseSlug: "html-css-fundamentals",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["html-document-structure", "html-semantic-elements"],
    objectives: [
      "Build a form using <form>, <label>, <input>, <select>, and <textarea>",
      "Associate every input with a label via matching id/for attributes",
      "Use HTML validation attributes like required and type to catch bad input before it's submitted",
      "Apply core accessibility practices, including landmark elements and meaningful alt text",
    ],
    skills: ["html", "forms", "accessibility"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Web forms",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms",
      },
      {
        label: "MDN: The label element",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
      },
    ],
    keywords: [
      "html forms",
      "labels",
      "accessibility",
      "validation",
      "required",
      "alt text",
      "landmarks",
      "input types",
    ],
    explanation: `Forms are how the web collects information from people — signing up, searching, checking out. A form that "looks fine" visually can still be nearly unusable for someone using a screen reader or only a keyboard, which is why labels and structure matter just as much as the input boxes themselves.

## The Building Blocks

A \`<form>\` element wraps a group of related controls. Inside it, you'll typically reach for:

- **\`<input>\`** — a single-line control whose behavior changes entirely based on its \`type\` attribute: \`text\`, \`email\`, \`password\`, \`checkbox\`, \`radio\`, \`number\`, and more. Browsers apply different keyboards on mobile and different built-in validation depending on the type.
- **\`<textarea>\`** — a multi-line text box, for longer input like a message or comment.
- **\`<select>\`** with nested **\`<option>\`** elements — a dropdown list of choices.
- **\`<button>\`** — commonly \`type="submit"\` to send the form.

## Labels Are Not Optional

Every input needs an associated \`<label>\`. The reliable way to connect them is matching attributes: give the input an \`id\`, and give the label a \`for\` attribute with that same value, e.g. \`<label for="email">Email</label>\` paired with \`<input id="email" ...>\`. This connection does two concrete things: a screen reader announces the label's text when the input receives focus, and clicking the label text itself moves focus into the input — genuinely helpful for small checkboxes and radio buttons that are otherwise fiddly to click precisely.

A **placeholder** is not a substitute for a label. Placeholder text disappears the moment someone starts typing, isn't reliably announced the same way a label is, and often has poor contrast — it's a hint, not a name for the field.

## Built-in Validation

Long before you write a single line of JavaScript, HTML itself can catch obviously invalid input:

- \`required\` prevents submission if the field is left empty.
- \`type="email"\` checks for a basic email shape.
- \`minlength\` / \`maxlength\` constrain text length.
- \`pattern\` accepts a custom regular expression for more specific formats.

These attributes don't replace server-side validation (never trust data from a browser alone), but they give people immediate, helpful feedback without a network round trip.

## Accessibility Foundations

Three habits go a long way toward an accessible page:

1. **Use landmark elements** (from the previous lesson) — header, nav, main, footer — so assistive technology users can jump directly to the section they need.
2. **Give every meaningful image real alt text**, and use \`alt=""\` explicitly for purely decorative images so screen readers skip them cleanly.
3. **Label everything interactive** — not just form inputs, but also icon-only buttons, which need something like \`aria-label="Close"\` when there's no visible text at all.

Accessibility isn't a separate feature you bolt on afterward — it's mostly just finishing the HTML properly: real labels, real alt text, and real semantic structure, all of which you were already halfway toward by using the right elements in the first place.`,
    example: {
      language: "html",
      description:
        "A labeled contact form with validation attributes, wrapped in semantic landmarks.",
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Contact us</title>
  </head>
  <body>
    <main>
      <h1>Contact us</h1>
      <form>
        <fieldset>
          <legend>Your details</legend>
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required minlength="2" />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label for="topic">Topic</label>
            <select id="topic" name="topic">
              <option value="support">Support</option>
              <option value="sales">Sales</option>
            </select>
          </div>
          <div>
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="4"></textarea>
          </div>
        </fieldset>
        <button type="submit">Send</button>
      </form>
    </main>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description:
        "Add a 'Phone' field with its own <label> and <input>, correctly linked by id/for, then press Run.",
      code: `<!doctype html>
<html lang="en">
  <body>
    <form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <!-- Add a Phone field here -->
      <button type="submit">Send</button>
    </form>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "html-forms-accessibility-guided",
      kind: "guided",
      language: "html",
      prompt:
        'Add a <label for="email">Email</label> correctly linked to the existing email input, and make that email input required.',
      starterCode: `<!doctype html>
<html lang="en">
  <body>
    <form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <!-- Add a label for the email input, linked via id/for -->
        <input type="email" id="email" name="email" />
      </div>
      <button type="submit">Send</button>
    </form>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html lang="en">
  <body>
    <form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <button type="submit">Send</button>
    </form>
  </body>
</html>`,
      harness: `
        window.__report('t1', document.querySelector('label[for="email"]') !== null, 'Add a <label for="email"> linked to the email input.');
        const email = document.getElementById('email');
        window.__report('t2', !!email && email.hasAttribute('required'), 'Mark the email input as required.');
        window.__report('t3', document.querySelectorAll('form').length === 1, 'Keep the form structure intact.');
      `,
      tests: [
        { id: "t1", description: 'A <label for="email"> exists', hidden: false },
        { id: "t2", description: "The email input has the required attribute", hidden: false },
        { id: "t3", description: "The form element is still present", hidden: true },
      ],
      hints: [
        "A <label>'s for attribute must match the input's id exactly for the two to be connected.",
        'Edit the comment\'s div — the input just below it already has id="email".',
        'Write <label for="email">Email</label> before the input, and add the required attribute to the input tag.',
        'Shape: <label for="email">Email</label><input type="email" id="email" name="email" required />',
      ],
    },
    independentExercise: {
      id: "html-forms-accessibility-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Build a signup form with: a required text input for username, a required password input, and a <select> with at least two <option> choices for country. Every input and select must have its own correctly linked <label>.",
      starterCode: `<!doctype html>
<html lang="en">
  <body>
    <form>
      <!-- build your signup fields here -->
      <button type="submit">Sign up</button>
    </form>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html lang="en">
  <body>
    <form>
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div>
        <label for="country">Country</label>
        <select id="country" name="country">
          <option value="us">United States</option>
          <option value="ca">Canada</option>
        </select>
      </div>
      <button type="submit">Sign up</button>
    </form>
  </body>
</html>`,
      harness: `
        const form = document.querySelector('form');
        window.__report('t1', !!form, 'Include a <form> element.');
        const inputs = document.querySelectorAll('input, select');
        let allLabeled = inputs.length > 0;
        inputs.forEach((el) => {
          const id = el.getAttribute('id');
          if (!id || !document.querySelector('label[for="' + id + '"]')) {
            allLabeled = false;
          }
        });
        window.__report('t2', allLabeled, 'Every input and select must have its own <label for="..."> matching its id.');
        const username = document.querySelector('input[name="username"]');
        window.__report('t3', !!username && username.hasAttribute('required'), 'The username input must be required.');
        const password = document.querySelector('input[type="password"]');
        window.__report('t4', !!password && password.hasAttribute('required'), 'Include a required password input (type="password").');
        const select = document.querySelector('select');
        window.__report('t5', !!select && select.querySelectorAll('option').length >= 2, 'The <select> needs at least two <option> elements.');
      `,
      tests: [
        { id: "t1", description: "Includes a <form>", hidden: false },
        { id: "t2", description: "Every input/select has a matching label", hidden: false },
        { id: "t3", description: "Username input is required", hidden: false },
        { id: "t4", description: "Password input exists and is required", hidden: false },
        { id: "t5", description: "The select has at least two options", hidden: true },
      ],
      hints: [
        "Every interactive form control needs its own <label>, connected by a matching id/for pair — no exceptions.",
        "You need three controls total: a text input, a password input, and a select — each wrapped with its own label.",
        'Use type="text" for username, type="password" for password, both required, and a <select> with two or more <option> children for country.',
        'Shape: <label for="username">Username</label><input type="text" id="username" required />',
      ],
    },
    commonMistakes: [
      "Using placeholder text instead of a real <label>, which disappears once typing starts and isn't reliably read by screen readers.",
      "Giving an input an id that doesn't exactly match its label's for attribute, silently breaking the label/input connection.",
      "Relying only on required and type validation for security — client-side validation helps usability, but the server must always re-validate.",
      "Building icon-only buttons with no visible text and no aria-label, leaving screen reader users with no idea what the button does.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What correctly connects a <label> to an <input>?",
        choices: [
          "Placing them next to each other in the HTML",
          "Matching the label's for attribute to the input's id attribute",
          "Giving them the same name attribute",
          "Wrapping both in a <span>",
        ],
        correctIndex: 1,
        explanation:
          "The for/id pair is what formally associates a label with its input for both clicking and screen readers.",
      },
      {
        id: "q2",
        prompt: "Why shouldn't placeholder text replace a <label>?",
        choices: [
          "Placeholders are not allowed in HTML5",
          "Placeholder text disappears once the user types and is not a reliable substitute for an accessible label",
          "Placeholders only work on <textarea>",
          "There is no difference between the two",
        ],
        correctIndex: 1,
        explanation:
          "Placeholders are a hint inside the field, not a persistent, accessible name for it.",
      },
      {
        id: "q3",
        prompt: "What does the required attribute do on an <input>?",
        choices: [
          "It hides the input until filled",
          "It prevents the form from submitting if that field is left empty",
          "It automatically fills in a default value",
          "It changes the input's type",
        ],
        correctIndex: 1,
        explanation:
          "required triggers the browser's built-in validation, blocking submission until the field has a value.",
      },
      {
        id: "q4",
        prompt: "Why might an icon-only button need an aria-label?",
        choices: [
          "Because icons cannot be clicked otherwise",
          "Because there's no visible text for a screen reader to announce, so aria-label supplies an accessible name",
          "Because aria-label changes the icon's color",
          "aria-label is only used on images",
        ],
        correctIndex: 1,
        explanation:
          "Without visible text, aria-label gives assistive technology something meaningful to announce.",
      },
    ],
    takeaway:
      "A form is only as good as its labels — get the id/for connection right on every field, and validation attributes and accessibility both come along almost for free.",
    summary:
      "Forms combine input, textarea, select, and button elements inside a <form>, but every control needs a correctly linked <label> to be genuinely usable. Built-in attributes like required, type, and minlength catch obvious mistakes before submission, and combining that with semantic landmarks and meaningful alt text covers the accessibility foundations every page needs.",
    nextLessonSlug: "css-selectors-cascade",
  },
  {
    id: "css-selectors-cascade",
    slug: "css-selectors-cascade",
    title: "CSS Selectors and the Cascade",
    description:
      "Learn how CSS selectors target elements, and how specificity and the cascade decide which rule wins when several match.",
    trackSlug: "web-html-css",
    courseSlug: "html-css-fundamentals",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: [
      "html-document-structure",
      "html-semantic-elements",
      "html-forms-accessibility",
    ],
    objectives: [
      "Write type, class, id, and descendant selectors",
      "Predict which rule wins when multiple selectors match the same element (specificity)",
      "Explain how inheritance passes some CSS properties from parent to child",
    ],
    skills: ["css", "selectors", "cascade"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: CSS selectors basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Basic_selectors",
      },
      {
        label: "MDN: Specificity",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity",
      },
    ],
    keywords: [
      "css selectors",
      "specificity",
      "cascade",
      "inheritance",
      "class selector",
      "id selector",
    ],
    explanation: `CSS stands for Cascading Style Sheets, and that first word is doing real work: when several rules could apply to the same element, the browser doesn't pick one at random or just use whichever you wrote most recently — it follows a precise, learnable algorithm called the **cascade**.

## Selectors: Choosing What to Style

A selector is the part of a rule before the curly braces, and it decides *which* elements the rule applies to:

- A **type selector**, like \`p\` or \`h1\`, matches every element of that kind.
- A **class selector**, like \`.warning\`, matches every element carrying \`class="warning"\` — an element can have several classes at once, separated by spaces.
- An **id selector**, like \`#header\`, matches the single element with \`id="header"\` (ids should be unique per page).
- A **descendant selector**, like \`nav a\`, matches any \`<a>\` nested anywhere inside a \`<nav>\`, no matter how deeply.

Classes are the workhorse of everyday CSS — reusable across as many elements as you like — while ids are better reserved for unique page landmarks or JavaScript hooks than for everyday styling.

## Specificity: Who Wins?

When two rules with *different* selectors both match the same element, CSS uses **specificity** to rank them. From lowest to highest:

1. Type selectors (\`p\`) and pseudo-elements — the least specific.
2. Class selectors (\`.warning\`), attribute selectors, and pseudo-classes.
3. Id selectors (\`#header\`) — more specific than any number of classes.
4. Inline \`style="..."\` attributes, and \`!important\`, which override almost everything and should be used sparingly, if ever.

A more specific selector wins regardless of where it's written in the file. Only when two selectors tie in specificity does source order become the tiebreaker — **the rule that appears later in the stylesheet wins**.

## The Cascade in Practice

This is why a class selector can feel like it "loses" to an id selector even if the class rule is written last: specificity, not position, decides first. It's also why relying on \`!important\` to force a rule to win tends to backfire later — it makes the *next* override even harder to write cleanly, since now you need something even stronger to beat it.

## Inheritance

Separately from the cascade, some CSS properties **inherit** from parent to child automatically, without any selector targeting the child at all. Text-related properties like \`color\`, \`font-family\`, and \`font-size\` inherit — set them once on \`<body>\`, and every nested paragraph and heading picks them up unless overridden. Box-model properties like \`margin\`, \`padding\`, \`border\`, and \`width\` do **not** inherit — a parent's border does not appear around its children.

Put together: selectors decide *what* a rule targets, specificity plus source order decide *which rule wins* when several match, and inheritance quietly hands a small set of text properties down the tree for free. Once these three ideas click, CSS output stops feeling mysterious.`,
    example: {
      language: "html",
      description:
        "A page showing type, class, and id selectors competing for the same paragraphs, demonstrating specificity.",
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Selectors and cascade</title>
    <style>
      body {
        color: black;
        font-family: sans-serif;
      }
      p {
        color: blue;
      }
      .warning {
        color: orange;
      }
      #critical {
        color: red;
      }
    </style>
  </head>
  <body>
    <p>Plain paragraph: styled blue by the type selector.</p>
    <p class="warning">Warning paragraph: the class selector beats the type selector, so this is orange.</p>
    <p id="critical" class="warning">Critical paragraph: even with the "warning" class, the id selector wins, so this is red.</p>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description:
        'Add a new .success rule with color: green, add class="success" to a paragraph, then press Run.',
      code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      p {
        color: blue;
      }
      /* Add a .success rule here */
    </style>
  </head>
  <body>
    <p>Plain paragraph</p>
    <p>Add class="success" to me</p>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "css-selectors-cascade-guided",
      kind: "guided",
      language: "html",
      prompt:
        'Add a class selector rule .highlight { color: green; } inside the <style> block so the paragraph with class="highlight" turns green, without touching the existing p rule.',
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      p {
        color: black;
      }
      /* Add a .highlight rule here that sets color to green */
    </style>
  </head>
  <body>
    <p>Normal paragraph</p>
    <p class="highlight">Highlighted paragraph</p>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      p {
        color: black;
      }
      .highlight {
        color: green;
      }
    </style>
  </head>
  <body>
    <p>Normal paragraph</p>
    <p class="highlight">Highlighted paragraph</p>
  </body>
</html>`,
      harness: `
        const normal = document.querySelectorAll('p')[0];
        const highlighted = document.querySelector('.highlight');
        window.__report('t1', !!highlighted && getComputedStyle(highlighted).color === 'rgb(0, 128, 0)', 'The .highlight paragraph should be green (rgb(0, 128, 0)).');
        window.__report('t2', !!normal && getComputedStyle(normal).color === 'rgb(0, 0, 0)', 'The plain paragraph should stay black — do not edit the p rule.');
      `,
      tests: [
        { id: "t1", description: "The .highlight paragraph renders green", hidden: false },
        { id: "t2", description: "The plain paragraph is unchanged (black)", hidden: true },
      ],
      hints: [
        "Selectors decide which elements a CSS rule applies to; a class selector starts with a dot and matches every element carrying that class.",
        "Look inside the <style> block, right where the comment tells you to add a rule.",
        'Write a rule targeting the class "highlight" and set its color property to green.',
        "Shape: .highlight { color: green; }",
      ],
    },
    independentExercise: {
      id: "css-selectors-cascade-independent",
      kind: "independent",
      language: "html",
      prompt:
        'Inside the <style> block, write three rules so that: all paragraphs are blue by default (type selector), paragraphs with class "note" are orange (class selector), and the paragraph with id="urgent" is red even though it also has class="note" (id selector beats class selector).',
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      /* Write your three selector rules here */
    </style>
  </head>
  <body>
    <p>Paragraph A</p>
    <p class="note">Paragraph B</p>
    <p id="urgent" class="note">Paragraph C</p>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      p {
        color: blue;
      }
      .note {
        color: orange;
      }
      #urgent {
        color: red;
      }
    </style>
  </head>
  <body>
    <p>Paragraph A</p>
    <p class="note">Paragraph B</p>
    <p id="urgent" class="note">Paragraph C</p>
  </body>
</html>`,
      harness: `
        const a = document.querySelectorAll('p')[0];
        const b = document.querySelectorAll('p')[1];
        const c = document.getElementById('urgent');
        window.__report('t1', getComputedStyle(a).color === 'rgb(0, 0, 255)', 'Paragraph A (plain <p>) should be blue.');
        window.__report('t2', getComputedStyle(b).color === 'rgb(255, 165, 0)', 'Paragraph B (.note) should be orange.');
        window.__report('t3', getComputedStyle(c).color === 'rgb(255, 0, 0)', 'Paragraph C (#urgent, also .note) should be red because the id selector wins.');
      `,
      tests: [
        { id: "t1", description: "Paragraph A is blue", hidden: false },
        { id: "t2", description: "Paragraph B is orange", hidden: false },
        { id: "t3", description: "Paragraph C is red (id beats class)", hidden: true },
      ],
      hints: [
        "Specificity ranks selector types: id selectors beat class selectors, which beat type selectors, regardless of the order rules are written in.",
        "You need exactly three rules in the <style> block: one for the tag, one for the class, one for the id.",
        "Target p for the base color, .note for the class color, and #urgent for the id color.",
        "Shape: p { color: blue; } .note { color: orange; } #urgent { color: red; }",
      ],
    },
    commonMistakes: [
      "Assuming the last rule in the file always wins — that's only true when competing selectors have equal specificity; a more specific selector wins regardless of order.",
      "Overusing #id selectors for everyday styling, which makes rules hard to reuse or override later — classes are usually the better default.",
      "Forgetting that properties like color and font-family inherit from parent to child, while box-model properties like margin and border do not.",
      "Reaching for !important to win a specificity fight instead of fixing the underlying selector, which makes future overrides much harder to write.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which selector generally has the highest specificity among these?",
        choices: [
          "A type selector like p",
          "A class selector like .note",
          "An id selector like #urgent",
          "A universal selector *",
        ],
        correctIndex: 2,
        explanation:
          "Id selectors are more specific than class selectors, which are more specific than type selectors.",
      },
      {
        id: "q2",
        prompt:
          "If two rules with equal specificity both apply to the same element, which one wins?",
        choices: [
          "The one written first",
          "The one written last, in source order",
          "Neither applies",
          "The shorter rule",
        ],
        correctIndex: 1,
        explanation:
          "When specificity ties, the cascade falls back to source order, and the later rule wins.",
      },
      {
        id: "q3",
        prompt:
          "Which of these CSS properties is inherited by default from a parent element to its children?",
        choices: ["margin", "border", "color", "padding"],
        correctIndex: 2,
        explanation:
          "Text-related properties like color inherit by default; box-model properties like margin, border, and padding do not.",
      },
      {
        id: "q4",
        prompt: "What does the selector .note target?",
        choices: [
          "Every <note> element",
          'Every element with class="note"',
          'Every element with id="note"',
          "Only the first paragraph on the page",
        ],
        correctIndex: 1,
        explanation:
          "A leading dot denotes a class selector, matching any element carrying that class.",
      },
    ],
    takeaway:
      "When several CSS rules could apply, the browser doesn't guess — it follows a precise specificity and source-order algorithm you can predict every time.",
    summary:
      "CSS selectors — type, class, id, and descendant — decide which elements a rule targets. When multiple rules match, specificity (id beats class beats type) decides the winner, with source order only as a tiebreaker between equally specific rules. Text properties like color inherit from parent to child automatically; box-model properties do not.",
    nextLessonSlug: "css-box-model",
  },
  {
    id: "css-box-model",
    slug: "css-box-model",
    title: "The CSS Box Model",
    description:
      "Understand content, padding, border, and margin — the four layers that determine every element's rendered size and spacing.",
    trackSlug: "web-html-css",
    courseSlug: "html-css-fundamentals",
    order: 4,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["css-selectors-cascade"],
    objectives: [
      "Identify the four layers of the box model: content, padding, border, and margin",
      "Predict an element's rendered size given its width, padding, and border",
      "Use box-sizing: border-box to keep declared widths predictable",
    ],
    skills: ["css", "box-model"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: The box model",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model",
      },
      {
        label: "MDN: box-sizing",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
      },
    ],
    keywords: [
      "box model",
      "padding",
      "border",
      "margin",
      "box-sizing",
      "content-box",
      "border-box",
    ],
    explanation: `Every single element on a web page is, underneath any visual styling, a rectangular box. Learning to see that box's four layers is the single most useful mental model for understanding why elements are the size and position they are.

## The Four Layers

From the inside out:

1. **Content** — the actual text, image, or other content, sized by \`width\` and \`height\`.
2. **Padding** — transparent space between the content and the border, pushing the border outward without affecting the content itself. Set with \`padding\`.
3. **Border** — a line (or nothing, if unset) drawn around the padding. Needs a width, a style like \`solid\`, and usually a color, e.g. \`border: 2px solid black;\`.
4. **Margin** — transparent space *outside* the border, separating this box from its neighbors. Unlike padding, margin is not part of the element's own visual box — it's the gap between boxes.

## Why "100px wide" Doesn't Always Mean 100px Wide

Here's the part that surprises almost everyone at first: by default, \`width\` and \`height\` only describe the **content** box. Padding and border get added *on top* of that. So an element with \`width: 100px; padding: 10px; border: 5px solid;\` actually renders at 100 + 10 + 10 + 5 + 5 = **130px** wide — the padding and border on both sides all add up.

This default behavior is called \`box-sizing: content-box\`. It's rarely what you actually want, because it means adding padding to a "100px" box makes it not be 100px anymore, breaking layouts built around exact sizes.

## box-sizing: border-box

Setting \`box-sizing: border-box;\` changes the meaning of \`width\` and \`height\` to include padding and border. With that same element now set to \`border-box\`, a declared \`width: 100px\` stays exactly 100px total — the browser shrinks the available content area to make room for padding and border instead of adding to the outside. This is so consistently useful that many developers apply it globally with a rule like \`* { box-sizing: border-box; }\` near the top of their stylesheet, so every element behaves predictably by default.

## Margin Collapsing

One more wrinkle worth knowing: when two block elements are stacked vertically and both have vertical margins facing each other (say, the first has \`margin-bottom: 20px\` and the next has \`margin-top: 30px\`), those margins don't simply add up to 50px of space. In many common cases they **collapse** into a single gap equal to the *larger* of the two — 30px, not 50px. This "margin collapsing" behavior only applies to vertical margins between certain block-level elements, never to padding or borders, and never to horizontal margins.

Once you can mentally add up content, padding, and border to predict a rendered size — and remember that \`border-box\` keeps that arithmetic simple — box-model surprises mostly disappear from your CSS debugging.`,
    visual: {
      kind: "diagram",
      title: "The box model layers",
      description:
        "Four nested rectangles, from innermost to outermost: content (the text or image itself), padding (space inside the border, around the content), border (a visible or invisible line), and margin (space outside the border, separating this box from its neighbors). With the default box-sizing: content-box, an element's declared width covers only the content layer, and padding plus border are added on top of it; with box-sizing: border-box, the declared width already includes padding and border.",
    },
    example: {
      language: "html",
      description:
        "A card whose declared width stays exactly 200px total because box-sizing: border-box folds padding and border inside it.",
      code: `<!doctype html>
<html>
  <head>
    <style>
      .card {
        width: 200px;
        padding: 20px;
        border: 5px solid #333;
        margin: 30px;
        box-sizing: border-box;
        background: #eee;
      }
    </style>
  </head>
  <body>
    <div class="card">
      This card is exactly 200px wide in total, because box-sizing: border-box folds padding and border inside the declared width.
    </div>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description:
        "Delete the box-sizing line and press Run — watch the card grow past 200px because padding and border now add to the width.",
      code: `<!doctype html>
<html>
  <head>
    <style>
      .card {
        width: 200px;
        padding: 20px;
        border: 5px solid #333;
        box-sizing: border-box;
        background: #eee;
      }
    </style>
  </head>
  <body>
    <div class="card">Try removing box-sizing: border-box above.</div>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "css-box-model-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Add box-sizing: border-box; to the .box rule so the element's rendered width stays exactly 200px, even with padding and a border.",
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      .box {
        width: 200px;
        padding: 20px;
        border: 5px solid black;
        /* Add box-sizing here so the total width stays 200px */
      }
    </style>
  </head>
  <body>
    <div class="box">Fixed-width box</div>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      .box {
        width: 200px;
        padding: 20px;
        border: 5px solid black;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <div class="box">Fixed-width box</div>
  </body>
</html>`,
      harness: `
        const box = document.querySelector('.box');
        window.__report('t1', !!box && box.offsetWidth === 200, 'The .box element should render at exactly 200px wide.');
        window.__report('t2', !!box && getComputedStyle(box).boxSizing === 'border-box', 'Set box-sizing to border-box on .box.');
      `,
      tests: [
        { id: "t1", description: ".box renders at exactly 200px wide", hidden: false },
        { id: "t2", description: ".box uses box-sizing: border-box", hidden: true },
      ],
      hints: [
        "By default, browsers use content-box sizing: padding and border are added on top of the width you declare, making the final box bigger than expected.",
        "Look inside the .box rule, at the line marked by the comment.",
        "The property you need is box-sizing, and the value that keeps declared width as the final rendered width is border-box.",
        "Shape: box-sizing: border-box;",
      ],
    },
    independentExercise: {
      id: "css-box-model-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Style #box-one to render at exactly 100px by 100px using box-sizing: border-box with 10px padding and a 5px border. Then give #box-two a margin-top of at least 30px so there is visible space between the two boxes.",
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      /* Style #box-one and #box-two here */
    </style>
  </head>
  <body>
    <div id="box-one">One</div>
    <div id="box-two">Two</div>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      #box-one {
        width: 100px;
        height: 100px;
        padding: 10px;
        border: 5px solid black;
        box-sizing: border-box;
      }
      #box-two {
        width: 100px;
        height: 60px;
        margin-top: 30px;
        background: #ddd;
      }
    </style>
  </head>
  <body>
    <div id="box-one">One</div>
    <div id="box-two">Two</div>
  </body>
</html>`,
      harness: `
        const one = document.getElementById('box-one');
        const two = document.getElementById('box-two');
        window.__report('t1', !!one && one.offsetWidth === 100, '#box-one should render at exactly 100px wide.');
        window.__report('t2', !!one && one.offsetHeight === 100, '#box-one should render at exactly 100px tall.');
        const gap = two.getBoundingClientRect().top - one.getBoundingClientRect().bottom;
        window.__report('t3', gap >= 30, 'Leave at least 30px of visible gap between #box-one and #box-two using margin.');
      `,
      tests: [
        { id: "t1", description: "#box-one is exactly 100px wide", hidden: false },
        { id: "t2", description: "#box-one is exactly 100px tall", hidden: false },
        { id: "t3", description: "At least 30px gap between the boxes", hidden: true },
      ],
      hints: [
        "Remember: content, padding, and border make up an element's own box; margin is the separate space between that box and its neighbors.",
        "Style #box-one so its content, padding, and border stay inside a 100px by 100px total footprint. Then give #box-two some breathing room above it.",
        "Use box-sizing: border-box on #box-one so its width/height already include padding and border. Use margin-top on #box-two to create the gap.",
        "Shape: #box-one { width: 100px; height: 100px; padding: 10px; border: 5px solid black; box-sizing: border-box; } #box-two { margin-top: 30px; }",
      ],
    },
    commonMistakes: [
      "Forgetting that the default box-sizing is content-box, so padding and border silently make elements bigger than the declared width.",
      "Confusing margin (space outside the border, between elements) with padding (space inside the border, around the content).",
      "Expecting two adjoining vertical margins between stacked elements to always add together — they often collapse into the larger single margin instead.",
      "Setting a border color but forgetting border-style — without a style like solid, dashed, or dotted, most browsers render no visible border at all.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Reading from the inside out, what is the correct order of the box model's layers?",
        choices: [
          "Margin, border, padding, content",
          "Content, padding, border, margin",
          "Padding, content, margin, border",
          "Border, content, padding, margin",
        ],
        correctIndex: 1,
        explanation:
          "From innermost to outermost: content, then padding, then border, then margin.",
      },
      {
        id: "q2",
        prompt:
          "With the default box-sizing: content-box, a div with width: 100px, padding: 10px, and border: 5px solid renders at what total width?",
        choices: ["100px", "110px", "130px", "150px"],
        correctIndex: 2,
        explanation: "100 + 10 + 10 (padding both sides) + 5 + 5 (border both sides) = 130px.",
      },
      {
        id: "q3",
        prompt: "What does box-sizing: border-box change?",
        choices: [
          "It removes margins entirely",
          "It makes declared width/height include padding and border, instead of adding to them",
          "It makes elements invisible",
          "It only affects text color",
        ],
        correctIndex: 1,
        explanation:
          "border-box folds padding and border inside the declared width and height, keeping sizes predictable.",
      },
      {
        id: "q4",
        prompt:
          "Which property creates space between an element's border and its neighboring elements?",
        choices: ["padding", "border", "margin", "content"],
        correctIndex: 2,
        explanation:
          "Margin is the transparent space outside an element's border, separating it from its neighbors.",
      },
    ],
    takeaway:
      "Once you can add up content, padding, and border in your head — and reach for box-sizing: border-box — no layout width will ever surprise you again.",
    summary:
      "Every element is a box made of four layers: content, padding, border, and margin. By default, width and height only cover the content layer, so padding and border add extra size on top — box-sizing: border-box changes that, folding padding and border inside the declared width so sizes stay predictable.",
    nextLessonSlug: "css-flexbox",
  },
  {
    id: "css-flexbox",
    slug: "css-flexbox",
    title: "Flexbox Layout",
    description:
      "Arrange elements along a row or column with Flexbox, controlling alignment, spacing, and wrapping with a handful of properties.",
    trackSlug: "web-html-css",
    courseSlug: "html-css-fundamentals",
    order: 5,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["css-box-model"],
    objectives: [
      "Turn a container into a flex container with display: flex",
      "Control alignment along the main and cross axes with justify-content and align-items",
      "Control wrapping and spacing with flex-wrap and gap",
    ],
    skills: ["css", "flexbox", "layout"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Flexbox",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox",
      },
      {
        label: "MDN: CSS flexible box layout",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
      },
    ],
    keywords: [
      "flexbox",
      "display flex",
      "justify-content",
      "align-items",
      "main axis",
      "cross axis",
      "flex-wrap",
    ],
    explanation: `Before Flexbox, centering a box vertically or evenly spacing a row of navigation links required a pile of workarounds. Flexbox turns those everyday layout problems into a small, learnable set of properties applied to a container and its direct children.

## Turning On Flex

Adding \`display: flex;\` to an element does two things at once: it becomes a **flex container**, and every one of its direct children instantly becomes a **flex item**, lined up along a single row by default — no floats, no manual positioning required.

## Two Axes

Flexbox thinks in terms of two perpendicular axes:

- The **main axis** runs in the direction items are laid out — a row, left to right, by default. Set \`flex-direction: column\` to make the main axis run top to bottom instead.
- The **cross axis** runs perpendicular to the main axis.

This distinction matters because two different properties control each axis:

- **\`justify-content\`** aligns items along the **main axis** — common values include \`flex-start\`, \`center\`, \`space-between\` (push items to the edges, evenly space the rest), and \`space-around\`.
- **\`align-items\`** aligns items along the **cross axis** — common values include \`flex-start\`, \`center\`, and \`stretch\` (the default, filling the full cross-axis size).

If you set \`flex-direction: column\`, the axes swap roles: \`justify-content\` now controls vertical spacing, and \`align-items\` controls horizontal alignment. Keeping "main axis = direction of flow" straight in your head makes both properties predictable regardless of direction.

## Spacing and Wrapping

- **\`gap\`** adds consistent space *between* flex items, without needing individual margins on each one — much simpler than the old margin-based tricks.
- **\`flex-wrap: wrap\`** allows items to drop onto a new line when they run out of room on the main axis; the default, \`nowrap\`, forces everything onto a single line, shrinking or overflowing instead.

## Sizing Individual Items

Beyond arranging items as a group, each flex item can be told how to share leftover space using the \`flex\` shorthand (commonly \`flex: 1\` to let an item grow and fill available space) or fixed with \`flex: none\`. Early on, you'll get a long way with just \`display: flex\`, \`justify-content\`, \`align-items\`, and \`gap\` on the container — those four cover the overwhelming majority of everyday layouts like navigation bars, button groups, and centered content.

Flexbox is deliberately **one-dimensional** — it's built for arranging items along a single row or column. When you need rows and columns to work together as a grid, that's a job for CSS Grid, covered next.`,
    visual: {
      kind: "diagram",
      title: "Flexbox's two axes",
      description:
        "A flex container has a main axis (a row by default, running left to right) controlled by justify-content, and a perpendicular cross axis (a column by default, running top to bottom) controlled by align-items. Setting flex-direction: column swaps which axis is which, so justify-content then controls vertical spacing and align-items controls horizontal alignment.",
    },
    example: {
      language: "html",
      description:
        "A navigation bar built with Flexbox: a logo and a link list spaced apart and vertically centered.",
      code: `<!doctype html>
<html>
  <head>
    <style>
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background: #222;
      }
      .navbar .logo {
        color: white;
        font-weight: bold;
      }
      .navbar ul {
        display: flex;
        gap: 16px;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .navbar a {
        color: white;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="navbar">
      <div class="logo">BrightPath</div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#courses">Courses</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description:
        "Change justify-content to center or flex-end and press Run to see the layout shift.",
      code: `<!doctype html>
<html>
  <head>
    <style>
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #222;
        padding: 10px;
      }
      .navbar div {
        color: white;
        padding: 4px 8px;
      }
    </style>
  </head>
  <body>
    <div class="navbar">
      <div>Logo</div>
      <div>Link One</div>
      <div>Link Two</div>
    </div>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "css-flexbox-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Turn #container into a flex container that centers its children horizontally: add display: flex; and justify-content: center;",
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      #container {
        /* Add display: flex and justify-content: center here */
        background: #eee;
      }
      #container div {
        width: 60px;
        height: 60px;
        background: steelblue;
        margin: 4px;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      #container {
        display: flex;
        justify-content: center;
        background: #eee;
      }
      #container div {
        width: 60px;
        height: 60px;
        background: steelblue;
        margin: 4px;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </body>
</html>`,
      harness: `
        const c = document.getElementById('container');
        const style = getComputedStyle(c);
        window.__report('t1', style.display === 'flex', '#container needs display: flex.');
        window.__report('t2', style.justifyContent === 'center', '#container needs justify-content: center.');
      `,
      tests: [
        { id: "t1", description: "#container has display: flex", hidden: false },
        { id: "t2", description: "#container has justify-content: center", hidden: true },
      ],
      hints: [
        "display: flex turns an element into a flex container, arranging its direct children along a main axis (a row, by default).",
        "The rule you need to edit is #container — right where the comment is.",
        "You need two declarations on #container: display and justify-content.",
        "Shape: display: flex; justify-content: center;",
      ],
    },
    independentExercise: {
      id: "css-flexbox-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Make #row a flex container whose three .item children lay out left to right, spaced apart with justify-content: space-between and vertically centered with align-items: center.",
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      #row {
        /* make this a flex container, spaced and centered */
        height: 100px;
        background: #eee;
      }
      .item {
        width: 50px;
        height: 50px;
        background: coral;
      }
    </style>
  </head>
  <body>
    <div id="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      #row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        background: #eee;
      }
      .item {
        width: 50px;
        height: 50px;
        background: coral;
      }
    </style>
  </head>
  <body>
    <div id="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </body>
</html>`,
      harness: `
        const row = document.getElementById('row');
        window.__report('t1', getComputedStyle(row).display === 'flex', '#row must be a flex container.');
        const items = document.querySelectorAll('.item');
        const rects = [...items].map((el) => el.getBoundingClientRect());
        window.__report('t2', rects[0].left < rects[1].left && rects[1].left < rects[2].left, 'The three .item boxes should sit in a left-to-right row (default flex-direction).');
        window.__report('t3', getComputedStyle(row).justifyContent === 'space-between', '#row should use justify-content: space-between.');
      `,
      tests: [
        { id: "t1", description: "#row is a flex container", hidden: false },
        { id: "t2", description: "Items are ordered left to right", hidden: true },
        { id: "t3", description: "#row uses justify-content: space-between", hidden: false },
      ],
      hints: [
        "A flex container's children line up along the main axis; justify-content controls spacing along that axis, and align-items controls alignment across the cross axis.",
        "You only need to edit the #row rule — its .item children are already styled.",
        "Add display: flex, justify-content: space-between, and align-items: center to #row.",
        "Shape: #row { display: flex; justify-content: space-between; align-items: center; }",
      ],
    },
    commonMistakes: [
      "Forgetting that justify-content works along the main axis and align-items works along the cross axis — flex-direction swaps which is which.",
      "Adding display: flex to the wrong element — it must go on the parent container, not the children you're trying to arrange.",
      "Expecting flex items to wrap onto a new line automatically — by default flex-wrap is nowrap, so items shrink or overflow instead of wrapping.",
      "Reaching for margin: auto tricks or manual positioning to center content, when a single justify-content/align-items pair on the container does it directly.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does display: flex do to an element?",
        choices: [
          "Hides its children",
          "Turns it into a flex container that lays out its direct children along a main axis",
          "Makes all text bold",
          "Adds scrollbars",
        ],
        correctIndex: 1,
        explanation:
          "display: flex creates a flex formatting context for the element's direct children.",
      },
      {
        id: "q2",
        prompt: "Which property controls spacing of flex items along the main axis?",
        choices: ["align-items", "justify-content", "flex-wrap", "box-sizing"],
        correctIndex: 1,
        explanation:
          "justify-content controls how items are spaced and aligned along the main axis.",
      },
      {
        id: "q3",
        prompt: "By default, what is the main axis direction of a flex container?",
        choices: [
          "Top to bottom (column)",
          "Left to right (row)",
          "Diagonal",
          "There is no default",
        ],
        correctIndex: 1,
        explanation:
          "The default flex-direction is row, so the main axis runs left to right by default.",
      },
      {
        id: "q4",
        prompt: "Which property aligns flex items along the cross axis?",
        choices: ["justify-content", "gap", "align-items", "flex-direction"],
        correctIndex: 2,
        explanation:
          "align-items controls alignment across the cross axis, perpendicular to the main axis.",
      },
    ],
    takeaway:
      "Flexbox turns 'please arrange these boxes in a row and space them nicely' from a pile of hacks into two or three clear CSS properties.",
    summary:
      "Setting display: flex on a container arranges its direct children along a main axis. justify-content controls spacing along that main axis, align-items controls alignment along the perpendicular cross axis, and gap plus flex-wrap handle spacing and wrapping — together covering most everyday one-dimensional layouts.",
    nextLessonSlug: "css-grid",
  },
  {
    id: "css-grid",
    slug: "css-grid",
    title: "CSS Grid Layout",
    description:
      "Lay out rows and columns together with CSS Grid, placing and spanning items across a two-dimensional track system.",
    trackSlug: "web-html-css",
    courseSlug: "html-css-fundamentals",
    order: 6,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["css-flexbox"],
    objectives: [
      "Create a grid container with grid-template-columns and grid-template-rows",
      "Place and span items across tracks using grid-column and grid-row",
      "Use the fr unit and gap to build flexible, evenly spaced layouts",
    ],
    skills: ["css", "grid", "layout"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Grids",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids",
      },
      {
        label: "MDN: CSS grid layout",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
      },
    ],
    keywords: ["css grid", "grid-template-columns", "fr unit", "grid-column", "grid-row", "gap"],
    explanation: `Flexbox is excellent at arranging items along a single row or column, but the moment you need rows *and* columns to line up together as one coherent system — think a page layout with a header, a sidebar, and a grid of cards — Flexbox starts to need workarounds. CSS Grid was built specifically for that two-dimensional case.

## Creating a Grid

Setting \`display: grid;\` on a container turns it into a grid, but by itself that grid has no defined columns yet. You describe the columns with \`grid-template-columns\`, and the rows with \`grid-template-rows\`. Each value in the list defines one track:

\`\`\`
grid-template-columns: 1fr 1fr 1fr;
\`\`\`

creates three column tracks. The **\`fr\`** unit means "a fraction of the remaining free space" — three equal \`1fr\` tracks split available width evenly, and you can mix them, e.g. \`1fr 2fr\` gives the second column twice the width of the first. Repeating the same track over and over is common enough that CSS provides a shortcut: \`repeat(3, 1fr)\` is identical to writing \`1fr 1fr 1fr\`.

## Gap

\`gap\` (previously written as \`grid-gap\`) adds consistent spacing between both rows and columns at once, without needing margins on individual items — the same property Flexbox uses, working the same way.

## Placing and Spanning Items

By default, grid items fill in tracks automatically, left to right, wrapping to the next row when a row fills up — much like text wrapping. But you can also explicitly place or stretch an item using **grid line numbers**. Grid lines are numbered starting at 1, counting the boundaries between (and around) your tracks — a three-column grid has four column lines: 1, 2, 3, and 4. \`grid-column: 1 / 3\` stretches an item from line 1 to line 3, spanning the first two column tracks. The special value \`-1\` always refers to the very last line, so \`grid-column: 1 / -1\` spans an item across every column, regardless of how many there are — a common pattern for a full-width header sitting above a multi-column layout beneath it.

## Grid vs. Flexbox

The core distinction to keep in your head: **Grid is two-dimensional** — you define both rows and columns together, and content is placed into that shared structure. **Flexbox is one-dimensional** — it only ever arranges items along a single line, wrapping onto new lines as an overflow behavior rather than a deliberate row-and-column plan. Neither replaces the other; a real page commonly uses Grid for its overall page layout, and Flexbox for arranging items *within* one of those grid areas, like a row of buttons inside a card.

Grid can do a great deal more — named grid areas, implicit tracks, \`minmax()\` for flexible sizing — but \`display: grid\`, \`grid-template-columns\` with \`fr\` units, \`gap\`, and \`grid-column\`/\`grid-row\` spans already cover a large share of real layout work.`,
    visual: {
      kind: "diagram",
      title: "Grid tracks and lines",
      description:
        "A grid container is divided by numbered grid lines into column tracks and row tracks — a three-column grid has four vertical grid lines, numbered 1 through 4. grid-template-columns: repeat(3, 1fr) creates three equal-width column tracks between those lines. An item can span multiple tracks using line numbers, e.g. grid-column: 1 / -1 stretches it from the first line to the last line, covering the full width regardless of how many columns exist.",
    },
    example: {
      language: "html",
      description:
        "A page layout using CSS Grid: a full-width header spanning three equal columns of cards beneath it.",
      code: `<!doctype html>
<html>
  <head>
    <style>
      .layout {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto 1fr;
        gap: 12px;
      }
      .header {
        grid-column: 1 / -1;
        background: #333;
        color: white;
        padding: 10px;
      }
      .card {
        background: #eee;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <div class="header">Site header spans all three columns</div>
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    </div>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description:
        "Change repeat(3, 1fr) to repeat(2, 1fr) and press Run to see the layout reflow into two columns.",
      code: `<!doctype html>
<html>
  <head>
    <style>
      .layout {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      .card {
        background: #eee;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <div class="card">1</div>
      <div class="card">2</div>
      <div class="card">3</div>
    </div>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "css-grid-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Turn #grid into a grid container with three equal-width columns: add display: grid; and grid-template-columns: repeat(3, 1fr);",
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      #grid {
        /* Add display: grid and three equal columns here */
        gap: 8px;
      }
      #grid div {
        background: lightblue;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div id="grid">
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </div>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      #grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }
      #grid div {
        background: lightblue;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div id="grid">
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </div>
  </body>
</html>`,
      harness: `
        const grid = document.getElementById('grid');
        const style = getComputedStyle(grid);
        window.__report('t1', style.display === 'grid', '#grid needs display: grid.');
        const cols = style.gridTemplateColumns.trim().split(/\\s+/);
        window.__report('t2', cols.length === 3, '#grid needs exactly three column tracks (try repeat(3, 1fr)).');
      `,
      tests: [
        { id: "t1", description: "#grid has display: grid", hidden: false },
        { id: "t2", description: "#grid has exactly three column tracks", hidden: true },
      ],
      hints: [
        "display: grid turns an element into a grid container, and grid-template-columns defines how many column tracks it has and how wide each one is.",
        "Edit the #grid rule where the comment is — its children don't need to change.",
        "Use the repeat() function to avoid typing 1fr three times: repeat(3, 1fr).",
        "Shape: display: grid; grid-template-columns: repeat(3, 1fr);",
      ],
    },
    independentExercise: {
      id: "css-grid-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Make #layout a grid with grid-template-columns: repeat(3, 1fr);. Make .header span the full width using grid-column: 1 / -1;. The three .card elements should sit together in the row below the header.",
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      #layout {
        /* make this a 3-column grid */
        gap: 10px;
      }
      .header {
        /* make this span all 3 columns */
        background: #333;
        color: white;
        padding: 10px;
      }
      .card {
        background: #eee;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div id="layout">
      <div class="header">Header</div>
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    </div>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      #layout {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      .header {
        grid-column: 1 / -1;
        background: #333;
        color: white;
        padding: 10px;
      }
      .card {
        background: #eee;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div id="layout">
      <div class="header">Header</div>
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    </div>
  </body>
</html>`,
      harness: `
        const layout = document.getElementById('layout');
        window.__report('t1', getComputedStyle(layout).display === 'grid', '#layout must be a grid container.');
        const header = document.querySelector('.header');
        window.__report('t2', Math.abs(header.offsetWidth - layout.offsetWidth) < 2, '.header should span the full width of #layout.');
        const cards = [...document.querySelectorAll('.card')];
        const tops = cards.map((c) => c.getBoundingClientRect().top);
        window.__report('t3', tops[0] === tops[1] && tops[1] === tops[2], 'All three .card elements should sit in the same row.');
        window.__report('t4', header.getBoundingClientRect().bottom <= cards[0].getBoundingClientRect().top, 'The header should sit above the row of cards.');
      `,
      tests: [
        { id: "t1", description: "#layout is a grid container", hidden: false },
        { id: "t2", description: ".header spans the full width", hidden: false },
        { id: "t3", description: "All three .card items share one row", hidden: true },
        { id: "t4", description: "The header sits above the cards", hidden: false },
      ],
      hints: [
        "A grid container's children can each span one or more column tracks; grid-column: 1 / -1 means from the first grid line to the very last, i.e. the full width.",
        "Three things need edits: #layout needs to become a grid, .header needs to span every column, and the .card row falls into place automatically once the grid exists.",
        "Use display: grid with grid-template-columns: repeat(3, 1fr) on #layout, and grid-column: 1 / -1 on .header.",
        "Shape: #layout { display: grid; grid-template-columns: repeat(3, 1fr); } .header { grid-column: 1 / -1; }",
      ],
    },
    commonMistakes: [
      "Confusing Grid's two-dimensional row-and-column placement with Flexbox's one-dimensional row-or-column layout — reach for Grid when rows and columns need to line up together.",
      "Forgetting that grid line numbers start at 1, not 0, and that -1 refers to the last line, not the last track.",
      "Writing grid-template-columns: 1fr 1fr 1fr and expecting gap to be part of that list — gap is a separate property, not a track value.",
      "Applying grid-column or grid-row to the container instead of to the child item that should span or move within it.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does grid-template-columns: repeat(3, 1fr); create?",
        choices: [
          "Three equal-width column tracks",
          "Three rows",
          "A single column three times wider",
          "Nothing without grid-template-rows too",
        ],
        correctIndex: 0,
        explanation:
          "repeat(3, 1fr) is shorthand for three equal fr-unit column tracks: 1fr 1fr 1fr.",
      },
      {
        id: "q2",
        prompt: "What does grid-column: 1 / -1 do to an item?",
        choices: [
          "Hides the item",
          "Spans it from the first grid line to the last, across the full width",
          "Moves it to row 1 only",
          "Deletes columns 1 through negative 1",
        ],
        correctIndex: 1,
        explanation:
          "-1 always refers to the final grid line, so 1 / -1 spans the item across every column.",
      },
      {
        id: "q3",
        prompt: "Which property turns a container into a grid?",
        choices: ["display: grid", "position: absolute", "flex-direction: row", "float: left"],
        correctIndex: 0,
        explanation:
          "display: grid establishes a grid formatting context for the container's direct children.",
      },
      {
        id: "q4",
        prompt: "What is the main practical difference between Grid and Flexbox?",
        choices: [
          "Grid is one-dimensional, Flexbox is two-dimensional",
          "Grid is two-dimensional (rows and columns together), Flexbox is one-dimensional (a single row or column)",
          "They behave identically in every case",
          "Flexbox cannot be used for navigation bars",
        ],
        correctIndex: 1,
        explanation:
          "Grid manages rows and columns as one system; Flexbox arranges items along a single axis at a time.",
      },
    ],
    takeaway:
      "CSS Grid lets you lay out rows and columns together as one system, instead of faking a grid with nested flex containers.",
    summary:
      "display: grid combined with grid-template-columns (often using the fr unit or repeat()) defines a two-dimensional track system. Items can span multiple tracks using grid-column and grid-row line numbers, with gap handling spacing — making Grid the right tool whenever rows and columns need to work together, unlike the single-axis layouts Flexbox handles.",
    nextLessonSlug: "css-responsive-design",
  },
  {
    id: "css-responsive-design",
    slug: "css-responsive-design",
    title: "Responsive Design: Media Queries & Mobile-First Layout",
    description:
      "Write CSS that adapts to any screen size using mobile-first thinking, min-width media queries, and relative units.",
    trackSlug: "web-html-css",
    courseSlug: "html-css-fundamentals",
    order: 7,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["css-grid"],
    objectives: [
      "Write a mobile-first stylesheet that adds complexity via min-width media queries",
      "Use relative units (%, em, rem) instead of fixed pixels where appropriate",
      "Explain why designing for small screens first tends to produce simpler, more robust CSS",
    ],
    skills: ["css", "responsive-design", "media-queries"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Responsive design",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_design",
      },
      {
        label: "MDN: Using media queries",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries",
      },
    ],
    keywords: [
      "responsive design",
      "media queries",
      "mobile-first",
      "rem",
      "viewport",
      "relative units",
      "breakpoints",
    ],
    explanation: `A page that looks great on a laptop can be genuinely unusable on a phone — text too small to read, layouts too wide to fit, buttons too close together to tap accurately. Responsive design is the practice of writing CSS that adapts to whatever screen it lands on, instead of assuming one fixed size.

## The Viewport Meta Tag

Before any CSS technique matters, mobile browsers need one line in \`<head>\`:

\`\`\`
<meta name="viewport" content="width=device-width, initial-scale=1" />
\`\`\`

Without it, many mobile browsers render the page at a fake desktop-like width (often around 980px) and then zoom out to fit the screen, making everything tiny and defeating any responsive CSS underneath. This tag tells the browser to use the device's actual width as the layout width instead.

## Mobile-First

**Mobile-first** means writing your base, un-wrapped CSS rules for the smallest, simplest case — a narrow screen, usually a single stacked column — and then layering in exceptions for larger screens as content genuinely needs them. The alternative, desktop-first, writes the complex layout first and then tries to unwind it back down for small screens, which tends to produce more overrides and messier CSS overall. Starting simple and adding complexity, rather than starting complex and subtracting it, is usually the easier direction to reason about.

## Media Queries

A **media query** wraps a block of CSS in a condition, applying it only when that condition is true:

\`\`\`
@media (min-width: 600px) {
  .stack {
    flex-direction: row;
  }
}
\`\`\`

\`min-width\` means "apply this when the viewport is at least this wide" — the natural fit for mobile-first, since your base rules already describe the narrow case, and each media query only ever adds behavior for wider viewports. The specific pixel value where a design changes is called a **breakpoint**. Good breakpoints are chosen by watching your own content — the point where a line of text gets awkwardly long, or a row of items starts feeling cramped — rather than by targeting specific phone or tablet models, which change constantly and vary widely even within a single "phone" category.

## Relative Units

Pixels (\`px\`) are a fixed, absolute unit. Several other units scale relative to something else, which is often exactly what responsive design wants:

- **\`%\`** — relative to the parent element's corresponding size.
- **\`em\`** — relative to the font size of the current element (or, for font-size itself, the parent's font size).
- **\`rem\`** — relative to the root (\`<html>\`) element's font size, regardless of nesting — often the most predictable of the three for consistent spacing and type scales.
- **\`vw\` / \`vh\`** — relative to 1% of the viewport's width or height.

Using \`rem\` for font sizes in particular respects a visitor's own browser font-size preference — something a fixed \`px\` value overrides and ignores, which matters for readability and accessibility.

Combine these ideas — a viewport meta tag, mobile-first base styles, \`min-width\` media queries at content-driven breakpoints, and relative units where they make sense — and a single stylesheet can comfortably serve a phone, a tablet, and a desktop monitor without three separate designs.`,
    example: {
      language: "html",
      description:
        "A mobile-first stacked layout that switches to a row once the viewport reaches 600px wide.",
      code: `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        font-size: 1rem;
        font-family: sans-serif;
      }
      .stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .stack > div {
        background: #eee;
        padding: 1em;
      }
      @media (min-width: 600px) {
        .stack {
          flex-direction: row;
        }
      }
    </style>
  </head>
  <body>
    <div class="stack">
      <div>Panel one</div>
      <div>Panel two</div>
      <div>Panel three</div>
    </div>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description:
        "Change min-width: 600px to min-width: 300px and press Run — imagine this rule now kicking in on much smaller screens.",
      code: `<!doctype html>
<html>
  <head>
    <style>
      .stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .stack > div {
        background: #eee;
        padding: 1em;
      }
      @media (min-width: 600px) {
        .stack {
          flex-direction: row;
        }
      }
    </style>
  </head>
  <body>
    <div class="stack">
      <div>One</div>
      <div>Two</div>
    </div>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "css-responsive-design-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Add a media query @media (min-width: 600px) { .stack { flex-direction: row; } } below the existing rule, so wider screens switch from a stacked column to a row.",
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      .stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      /* Add a min-width: 600px media query here that sets .stack's flex-direction to row */
    </style>
  </head>
  <body>
    <div class="stack">
      <div>One</div>
      <div>Two</div>
    </div>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      .stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      @media (min-width: 600px) {
        .stack {
          flex-direction: row;
        }
      }
    </style>
  </head>
  <body>
    <div class="stack">
      <div>One</div>
      <div>Two</div>
    </div>
  </body>
</html>`,
      harness: `
        function findMediaRule(minWidthPx, selectorText, prop, value) {
          for (const sheet of document.styleSheets) {
            let rules;
            try { rules = sheet.cssRules; } catch (e) { continue; }
            for (const rule of rules) {
              if (rule.media) {
                const text = rule.media.mediaText || '';
                if (text.includes('min-width') && text.includes(String(minWidthPx))) {
                  for (const inner of rule.cssRules) {
                    if (inner.selectorText && inner.selectorText.includes(selectorText) && inner.style[prop] === value) {
                      return true;
                    }
                  }
                }
              }
            }
          }
          return false;
        }
        window.__report('t1', findMediaRule(600, '.stack', 'flexDirection', 'row'), 'Add an @media (min-width: 600px) block that sets .stack { flex-direction: row; }.');
        window.__report('t2', getComputedStyle(document.querySelector('.stack')).display === 'flex', 'Keep .stack as a flex container.');
      `,
      tests: [
        {
          id: "t1",
          description: "A min-width: 600px media query sets .stack to row",
          hidden: false,
        },
        { id: "t2", description: ".stack is still a flex container", hidden: true },
      ],
      hints: [
        "Mobile-first CSS writes the simple, small-screen layout as the default, then uses @media (min-width: ...) to add complexity for larger screens.",
        "Add a new block after the existing .stack rule — don't modify the base rule itself.",
        "The media query condition is (min-width: 600px), and inside it you re-declare .stack with flex-direction: row.",
        "Shape: @media (min-width: 600px) { .stack { flex-direction: row; } }",
      ],
    },
    independentExercise: {
      id: "css-responsive-design-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Build a mobile-first nav: base .nav is display: flex; flex-direction: column; with a gap using a relative unit like rem. Add @media (min-width: 768px) { .nav { flex-direction: row; } } so it becomes a row on wider screens.",
      starterCode: `<!doctype html>
<html>
  <head>
    <style>
      /* Write your mobile-first .nav rule and the min-width: 768px media query here */
    </style>
  </head>
  <body>
    <div class="nav">
      <a href="#a">Link A</a>
      <a href="#b">Link B</a>
      <a href="#c">Link C</a>
    </div>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <head>
    <style>
      .nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      @media (min-width: 768px) {
        .nav {
          flex-direction: row;
        }
      }
    </style>
  </head>
  <body>
    <div class="nav">
      <a href="#a">Link A</a>
      <a href="#b">Link B</a>
      <a href="#c">Link C</a>
    </div>
  </body>
</html>`,
      harness: `
        function findMediaRule(minWidthPx, selectorText, prop, value) {
          for (const sheet of document.styleSheets) {
            let rules;
            try { rules = sheet.cssRules; } catch (e) { continue; }
            for (const rule of rules) {
              if (rule.media) {
                const text = rule.media.mediaText || '';
                if (text.includes('min-width') && text.includes(String(minWidthPx))) {
                  for (const inner of rule.cssRules) {
                    if (inner.selectorText && inner.selectorText.includes(selectorText) && inner.style[prop] === value) {
                      return true;
                    }
                  }
                }
              }
            }
          }
          return false;
        }
        const navStyle = getComputedStyle(document.querySelector('.nav'));
        window.__report('t1', navStyle.display === 'flex' && navStyle.flexDirection === 'column', 'The base .nav rule (outside any media query) should be a column flex container — mobile first.');
        window.__report('t2', findMediaRule(768, '.nav', 'flexDirection', 'row'), 'Add @media (min-width: 768px) { .nav { flex-direction: row; } }.');
        let usesRelativeUnit = false;
        for (const sheet of document.styleSheets) {
          let rules;
          try { rules = sheet.cssRules; } catch (e) { continue; }
          for (const rule of rules) {
            if (rule.cssText && /\\d+(rem|em|%)/.test(rule.cssText)) usesRelativeUnit = true;
          }
        }
        window.__report('t3', usesRelativeUnit, 'Use at least one relative unit (rem, em, or %) somewhere in your CSS.');
      `,
      tests: [
        { id: "t1", description: "Base .nav rule is a column flex container", hidden: false },
        {
          id: "t2",
          description: "A min-width: 768px media query switches .nav to row",
          hidden: true,
        },
        { id: "t3", description: "At least one relative unit is used", hidden: false },
      ],
      hints: [
        "Mobile-first means the un-wrapped, default rule describes the small screen; media queries only ever add exceptions for bigger screens.",
        "You need two pieces: a base .nav rule with no media query, and one @media (min-width: 768px) block.",
        "Base rule: display: flex; flex-direction: column; with a gap using rem. Media query: flip flex-direction to row.",
        "Shape: .nav { display: flex; flex-direction: column; gap: 0.5rem; } @media (min-width: 768px) { .nav { flex-direction: row; } }",
      ],
    },
    commonMistakes: [
      "Writing desktop-first CSS with max-width overrides for mobile, which tends to produce more overrides and a messier cascade than starting mobile-first with min-width.",
      'Forgetting the <meta name="viewport" content="width=device-width, initial-scale=1"> tag, which makes mobile browsers render at a fake, zoomed-out desktop width.',
      "Hardcoding pixel font sizes everywhere instead of using rem, which ignores a visitor's own browser font-size preference and hurts readability.",
      "Picking breakpoints based on specific device widths instead of the point where your own content actually starts to look cramped or awkward.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does 'mobile-first' mean in responsive CSS?",
        choices: [
          "Only mobile devices are supported",
          "The base styles target small screens, and media queries add changes for larger screens",
          "Desktop styles are written first, then overridden for mobile",
          "It means using only percentage units",
        ],
        correctIndex: 1,
        explanation:
          "Mobile-first writes the simple small-screen case as the default, adding complexity via min-width queries as screens grow.",
      },
      {
        id: "q2",
        prompt: "What does @media (min-width: 600px) { ... } do?",
        choices: [
          "Applies the enclosed rules only when the viewport is at least 600px wide",
          "Applies the enclosed rules only below 600px",
          "Sets a fixed width of 600px on the page",
          "Deletes rules when the screen is smaller than 600px",
        ],
        correctIndex: 0,
        explanation:
          "min-width media queries apply their rules once the viewport reaches at least that width.",
      },
      {
        id: "q3",
        prompt: "Why is rem often preferred over a fixed px value for font sizes?",
        choices: [
          "rem is faster to type",
          "rem scales relative to the root font size, respecting a visitor's font-size preferences",
          "rem only works inside media queries",
          "rem is required by every browser to render text",
        ],
        correctIndex: 1,
        explanation:
          "rem is relative to the root element's font size, so it respects user-level font-size preferences better than a fixed px value.",
      },
      {
        id: "q4",
        prompt: "What is the purpose of the viewport meta tag?",
        choices: [
          "It sets the page title",
          "It tells mobile browsers to use the device's actual width instead of a zoomed-out desktop-like width",
          "It loads a responsive CSS framework",
          "It disables media queries",
        ],
        correctIndex: 1,
        explanation:
          "The viewport meta tag makes the layout width match the device's real width, which responsive CSS depends on.",
      },
    ],
    takeaway:
      "Responsive design isn't a separate skill bolted onto CSS — it's writing simple mobile-first rules first, then layering in min-width media queries as the canvas grows.",
    summary:
      "Responsive pages start with a viewport meta tag and mobile-first base styles describing the small-screen case, then use min-width media queries to add layout changes at content-driven breakpoints. Relative units like rem, em, and percentages scale more gracefully than fixed pixels, especially for text sizing and accessibility.",
    nextLessonSlug: "js-variables-types",
  },
];
