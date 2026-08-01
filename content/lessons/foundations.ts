import type { LessonInput } from "@/lib/content/types";

export const foundationsLessons: LessonInput[] = [
  {
    id: "found-how-computers-run-code",
    slug: "how-computers-run-code",
    title: "How Computers Run Your Code",
    description:
      "What actually happens between typing a line of code and seeing a result on screen.",
    trackSlug: "foundations",
    courseSlug: "how-computing-works",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: [],
    objectives: [
      "Describe the path from source code to a running program",
      "Explain the difference between an interpreted language and a compiled one",
      "Explain what a browser's rendering engine does with HTML",
    ],
    skills: ["computing-fundamentals"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: What is a web server?",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server",
      },
    ],
    keywords: ["cpu", "compiler", "interpreter", "rendering engine", "how code runs"],
    explanation: `Every app you have ever used, from a calculator to a chat app, boils down to the same basic loop: a device reads instructions, and its processor carries them out one step at a time, extremely fast.

**Source code is a to-do list for a machine.** You write it in a language designed for humans to read — like JavaScript, Python, or HTML. Computers don't understand that text directly. Something has to translate it.

There are two common translation strategies:

- **Compiled languages** (like C++ or Go) are translated *entirely* into machine code ahead of time, producing a program the CPU can run directly.
- **Interpreted languages** (like Python and JavaScript) are translated *line by line, while the program runs*, by another program called an interpreter (or a "runtime").

Your browser contains a JavaScript interpreter (for logic) and a **rendering engine** (for HTML and CSS). The rendering engine reads HTML and builds a tree of objects called the **DOM** (Document Object Model), reads CSS and figures out how each object should look, and then paints pixels to your screen. JavaScript can change the DOM after the fact — that's what makes a page interactive instead of just a static document.

You do not need to memorize CPU architecture to build software. You do need this mental model: **text you write → translated by a runtime → instructions a machine executes → visible result.** Every bug you'll ever debug lives somewhere in that pipeline.`,
    visual: {
      kind: "diagram",
      title: "From source code to screen",
      description:
        "Source code → Interpreter/Compiler → Machine instructions → CPU executes → (for web pages) Rendering engine paints the DOM to pixels on screen.",
    },
    example: {
      language: "html",
      description:
        "A minimal HTML page. The browser's rendering engine turns this text into a heading and a paragraph on screen.",
      code: `<!doctype html>
<html>
  <head>
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, browser!</h1>
    <p>This paragraph exists because the rendering engine read this text.</p>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description: "Change the heading text or add a second paragraph, then press Run.",
      code: `<!doctype html>
<html>
  <body>
    <h1>Hello, browser!</h1>
    <p>Edit me and press Run.</p>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "found-1-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Add a second heading `<h2>How I run code</h2>` and a paragraph describing one program you use daily, inside the `<body>`.",
      starterCode: `<!doctype html>
<html>
  <body>
    <h1>My computing notes</h1>
    <!-- Add an <h2> and a <p> below -->
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>My computing notes</h1>
    <h2>How I run code</h2>
    <p>I use a web browser every day, which runs a JavaScript interpreter and a rendering engine.</p>
  </body>
</html>`,
      harness: `
        window.__report('t1', document.querySelectorAll('h1').length === 1, 'Keep exactly one <h1>.');
        window.__report('t2', document.querySelectorAll('h2').length >= 1, 'Add at least one <h2>.');
        window.__report('t3', document.querySelectorAll('p').length >= 1, 'Add at least one <p>.');
      `,
      tests: [
        { id: "t1", description: "Page still has exactly one <h1>", hidden: false },
        { id: "t2", description: "Page has at least one <h2>", hidden: false },
        { id: "t3", description: "Page has at least one <p>", hidden: false },
      ],
      hints: [
        "HTML elements are opened with a tag like <h2> and closed with </h2>.",
        "Place your new elements between <body> and </body>, after the existing <h1>.",
        "An <h2> is a heading one level below <h1>; a <p> wraps a paragraph of text.",
        "Example shape: <h2>How I run code</h2><p>Some sentence here.</p>",
      ],
    },
    independentExercise: {
      id: "found-1-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Build a small page with one <h1>, exactly three <p> paragraphs, and one <ul> unordered list containing at least two <li> items describing steps code takes to run.",
      starterCode: `<!doctype html>
<html>
  <body>
    <!-- Build your page here -->
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>How code runs</h1>
    <p>Step one: I write source code.</p>
    <p>Step two: a runtime translates it.</p>
    <p>Step three: the CPU executes instructions.</p>
    <ul>
      <li>Write code</li>
      <li>Translate it</li>
      <li>Execute it</li>
    </ul>
  </body>
</html>`,
      harness: `
        window.__report('t1', document.querySelectorAll('h1').length === 1, 'Exactly one <h1> required.');
        window.__report('t2', document.querySelectorAll('p').length === 3, 'Exactly three <p> elements required.');
        window.__report('t3', document.querySelectorAll('ul').length === 1, 'Exactly one <ul> required.');
        window.__report('t4', document.querySelectorAll('ul li').length >= 2, 'The <ul> needs at least two <li> items.');
      `,
      tests: [
        { id: "t1", description: "Exactly one <h1>", hidden: false },
        { id: "t2", description: "Exactly three <p> paragraphs", hidden: false },
        { id: "t3", description: "Exactly one <ul>", hidden: false },
        { id: "t4", description: "The list has at least two items", hidden: true },
      ],
      hints: [
        "Start with one <h1> for the page title.",
        "Write three separate <p>...</p> paragraphs, each a full sentence.",
        "An unordered list is <ul> with one <li>...</li> per item inside it.",
        "You need at least two <li> elements inside the <ul>.",
      ],
    },
    commonMistakes: [
      "Assuming Python and JavaScript run the same way just because both are 'interpreted' — their runtimes, standard libraries, and execution environments differ completely.",
      "Forgetting to close HTML tags, which can make a rendering engine guess your structure incorrectly.",
      "Confusing the DOM (a live, in-memory tree) with the original HTML text (a static file).",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What translates JavaScript source code into something a CPU can execute, line by line, as the program runs?",
        choices: ["A compiler", "An interpreter/runtime", "The DOM", "A rendering engine"],
        correctIndex: 1,
        explanation:
          "Interpreted languages like JavaScript and Python are translated on the fly by a runtime, not compiled entirely ahead of time.",
      },
      {
        id: "q2",
        prompt: "What is the DOM?",
        choices: [
          "The original HTML text file on disk",
          "A live, in-memory tree of objects representing the page, built by the rendering engine",
          "A programming language",
          "A type of CPU instruction",
        ],
        correctIndex: 1,
        explanation:
          "The DOM is an in-memory representation the browser builds from HTML so JavaScript can read and change the page.",
      },
      {
        id: "q3",
        prompt: "Which best describes a compiled language?",
        choices: [
          "Its source code is translated entirely into machine code before the program runs",
          "It can only run inside a web browser",
          "It has no translation step at all",
          "It is always slower than an interpreted language",
        ],
        correctIndex: 0,
        explanation:
          "Compilation happens ahead of time, producing a standalone machine-code program.",
      },
    ],
    takeaway:
      "Every program you write is text that a runtime translates into machine instructions — keeping that pipeline in mind makes debugging far less mysterious.",
    summary:
      "Source code is translated by an interpreter or compiler into instructions a CPU executes. In browsers, a rendering engine turns HTML and CSS into the DOM and pixels on screen, and JavaScript can change that DOM afterward.",
    nextLessonSlug: "files-and-terminals",
  },
  {
    id: "found-files-and-terminals",
    slug: "files-and-terminals",
    title: "Files, Folders, Editors & Terminals",
    description: "The everyday tools developers use to organize and run their code.",
    trackSlug: "foundations",
    courseSlug: "how-computing-works",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["found-how-computers-run-code"],
    objectives: [
      "Explain how files and folders form a hierarchical structure",
      "Identify the role of a code editor versus a terminal",
      "Recognize common terminal commands for navigating folders",
    ],
    skills: ["computing-fundamentals", "developer-tools"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Command line crash course",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line",
      },
    ],
    keywords: ["terminal", "command line", "file system", "editor", "folders", "path"],
    explanation: `Almost everything a computer stores lives inside a **file system**: a hierarchy of folders (directories) containing files, starting from a root folder and branching downward — much like the outline of this course, where a track contains courses, and courses contain lessons.

A **path** describes where a file lives in that hierarchy, such as \`projects/portfolio/index.html\`. Paths can be **absolute** (starting from the root of the drive) or **relative** (starting from wherever you currently are).

Two tools you'll use constantly:

- A **code editor** (like VS Code) is a specialized text editor for writing and reading source code, with features like syntax highlighting and error checking.
- A **terminal** (also called a command line or shell) lets you type text commands instead of clicking — to move between folders, create files, run programs, and install tools. It looks intimidating at first, but it's just a very fast, precise way to tell your computer what to do.

Common terminal commands you'll meet early: listing what's in a folder, moving into a folder, creating a new folder, and running a program. Every operating system's terminal has its own dialect (PowerShell on Windows, bash/zsh on macOS and Linux), but the underlying ideas — current folder, paths, commands, arguments — are universal.`,
    example: {
      language: "html",
      description:
        "A tiny page representing a project's file listing as structured HTML — the same hierarchical idea as folders on disk.",
      code: `<!doctype html>
<html>
  <body>
    <h1>project-portfolio/</h1>
    <ul>
      <li>index.html</li>
      <li>styles.css</li>
      <li>images/
        <ul><li>avatar.png</li></ul>
      </li>
    </ul>
  </body>
</html>`,
      editable: false,
    },
    guidedExercise: {
      id: "found-2-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Represent a project folder named 'my-app' containing 'index.html' and a nested folder 'scripts' with 'app.js' inside it, using nested <ul>/<li> elements.",
      starterCode: `<!doctype html>
<html>
  <body>
    <h1>my-app/</h1>
    <ul>
      <li>index.html</li>
      <!-- add a nested folder item for scripts/app.js -->
    </ul>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>my-app/</h1>
    <ul>
      <li>index.html</li>
      <li>scripts/
        <ul><li>app.js</li></ul>
      </li>
    </ul>
  </body>
</html>`,
      harness: `
        window.__report('t1', document.querySelectorAll('ul').length >= 2, 'You need a nested <ul> inside an <li> for the folder.');
        window.__report('t2', document.body.textContent.includes('app.js'), 'The nested list must mention app.js.');
      `,
      tests: [
        { id: "t1", description: "Contains a nested <ul> representing a subfolder", hidden: false },
        { id: "t2", description: "Mentions app.js inside the nested list", hidden: false },
      ],
      hints: [
        "A folder can be shown as an <li> whose text is the folder name, containing another <ul> inside it.",
        "Nesting looks like: <li>folder-name/<ul><li>file-inside</li></ul></li>",
        "Put 'scripts/' as the outer <li> text, and 'app.js' as the inner <li>.",
      ],
    },
    independentExercise: {
      id: "found-2-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Model a two-level folder tree for a project called 'blog' with at least 3 files total spread across at least 2 folders, using nested lists.",
      starterCode: `<!doctype html>
<html>
  <body>
    <h1>blog/</h1>
    <ul>
      <!-- build your tree here -->
    </ul>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>blog/</h1>
    <ul>
      <li>posts/
        <ul><li>hello-world.md</li><li>second-post.md</li></ul>
      </li>
      <li>assets/
        <ul><li>logo.png</li></ul>
      </li>
    </ul>
  </body>
</html>`,
      harness: `
        const nestedLists = document.querySelectorAll('ul ul');
        window.__report('t1', nestedLists.length >= 2, 'Represent at least two folders (each as a nested <ul>).');
        const allItems = document.querySelectorAll('li');
        window.__report('t2', allItems.length >= 5, 'Represent at least 3 files plus 2 folder entries (5+ <li> total).');
      `,
      tests: [
        { id: "t1", description: "At least two nested folders", hidden: false },
        { id: "t2", description: "At least 5 total list items across the tree", hidden: true },
      ],
      hints: [
        "Plan the tree on paper first: which items are folders (have children) and which are files (no children)?",
        "Each folder is an <li> containing its own <ul>.",
        "You need two separate folder <li> items, each with a nested <ul>, and at least three file <li> items combined.",
      ],
    },
    commonMistakes: [
      "Typing a relative path from the wrong current folder — always check where you are before running a command.",
      "Confusing a code editor's file explorer with the actual on-disk file system; they should stay in sync, but the editor is just a view.",
      "Being afraid of the terminal — it cannot do anything you didn't type; commands are just text with well-defined meaning.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is a 'relative path'?",
        choices: [
          "A path that always starts from the drive root",
          "A path measured from your current folder",
          "A path that only works on Windows",
          "A file that has been moved",
        ],
        correctIndex: 1,
        explanation:
          "Relative paths are interpreted starting from wherever you currently are, unlike absolute paths.",
      },
      {
        id: "q2",
        prompt: "What is a terminal primarily used for?",
        choices: [
          "Only editing text files",
          "Typing text commands to navigate folders and run programs",
          "Browsing the web",
          "Designing user interfaces",
        ],
        correctIndex: 1,
        explanation:
          "A terminal is a text-based interface for issuing commands to the operating system.",
      },
      {
        id: "q3",
        prompt: "In the nested-list analogy used in this lesson, what represents a subfolder?",
        choices: [
          "An <li> containing a nested <ul>",
          "A <p> element",
          "An <img> element",
          "A second <html> tag",
        ],
        correctIndex: 0,
        explanation:
          "Nesting a <ul> inside an <li> mirrors a folder that contains more files or folders.",
      },
    ],
    takeaway:
      "Files live in a hierarchy you navigate with paths; editors let you write code, terminals let you command your machine directly.",
    summary:
      "File systems organize files into nested folders reachable via absolute or relative paths. Code editors are for writing code; terminals are for issuing precise, fast commands to navigate and run things.",
    nextLessonSlug: "how-the-web-works",
  },
  {
    id: "found-how-the-web-works",
    slug: "how-the-web-works",
    title: "How the Web Works: Browsers, Servers, DNS & HTTP",
    description: "What happens between typing a URL and seeing a page.",
    trackSlug: "foundations",
    courseSlug: "how-computing-works",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["found-how-computers-run-code"],
    objectives: [
      "Describe the request/response cycle between a browser and a server",
      "Explain what DNS does",
      "Identify the parts of an HTTP request and response",
    ],
    skills: ["computing-fundamentals", "web-mechanics"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: How the web works",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works",
      },
    ],
    keywords: ["dns", "http", "server", "browser", "request", "response", "url"],
    explanation: `When you type \`example.com\` into a browser, several distinct steps happen very quickly:

1. **DNS lookup.** Computers address each other with numbers (IP addresses), not names. The **Domain Name System (DNS)** translates \`example.com\` into an IP address, the way a phone contact list translates a name into a number.
2. **Connection.** Your browser opens a connection to the server at that address, usually secured with TLS (the "s" in "https").
3. **HTTP request.** The browser sends an **HTTP request**: a method (like \`GET\` to fetch something, or \`POST\` to send data), a path (like \`/about\`), and headers (metadata like what content types the browser accepts).
4. **Server processing.** A **server** — just another program, often running far away in a data center — reads the request, does whatever work is needed (reading a file, querying a database), and builds a response.
5. **HTTP response.** The server replies with a **status code** (like \`200 OK\`, \`404 Not Found\`, or \`500 Server Error\`), headers, and a body — often HTML, JSON, or another file.
6. **Rendering.** The browser receives the response and, if it's HTML, builds the DOM and paints the page, potentially requesting more resources (CSS, JavaScript, images) along the way.

This request/response cycle is the foundation for everything from loading a page to calling an API from JavaScript (which you'll do later in the JavaScript track) — the mechanics are the same.`,
    visual: {
      kind: "diagram",
      title: "The request/response cycle",
      description:
        "Browser → DNS lookup (name → IP address) → HTTP request to server → server processes request → HTTP response (status + headers + body) → browser renders the result.",
    },
    example: {
      language: "html",
      description: "A page that describes an example request/response pair as readable text.",
      code: `<!doctype html>
<html>
  <body>
    <h1>Example exchange</h1>
    <p><strong>Request:</strong> GET /about HTTP/1.1</p>
    <p><strong>Response:</strong> 200 OK, Content-Type: text/html</p>
  </body>
</html>`,
      editable: false,
    },
    guidedExercise: {
      id: "found-3-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Add two paragraphs describing a request for a missing page: one line for the request method+path, one for the response status code and its meaning.",
      starterCode: `<!doctype html>
<html>
  <body>
    <h1>A missing page</h1>
    <!-- Describe the request and the response -->
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>A missing page</h1>
    <p>Request: GET /old-page</p>
    <p>Response: 404 Not Found — the server has nothing at that path.</p>
  </body>
</html>`,
      harness: `
        const text = document.body.textContent;
        window.__report('t1', /GET|POST/.test(text), 'Mention an HTTP method such as GET.');
        window.__report('t2', /404/.test(text), 'Mention the 404 status code for a missing page.');
      `,
      tests: [
        { id: "t1", description: "Mentions an HTTP method", hidden: false },
        { id: "t2", description: "Mentions status code 404", hidden: false },
      ],
      hints: [
        "HTTP methods include GET, POST, PUT, and DELETE.",
        "A missing page is signaled with a specific 4xx status code.",
        "That status code is 404, conventionally called 'Not Found'.",
      ],
    },
    independentExercise: {
      id: "found-3-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Build a short 'How this page loaded' explainer with a numbered list (<ol>) of at least 4 steps, mentioning DNS, HTTP, and rendering at least once each.",
      starterCode: `<!doctype html>
<html>
  <body>
    <h1>How this page loaded</h1>
    <ol>
      <!-- your steps -->
    </ol>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>How this page loaded</h1>
    <ol>
      <li>DNS translated the domain name into an IP address.</li>
      <li>The browser opened a connection to the server.</li>
      <li>The browser sent an HTTP GET request.</li>
      <li>The server sent back an HTTP response with HTML.</li>
      <li>The browser began rendering the page.</li>
    </ol>
  </body>
</html>`,
      harness: `
        const items = document.querySelectorAll('ol li');
        window.__report('t1', items.length >= 4, 'Use at least 4 <li> steps inside the <ol>.');
        const text = document.body.textContent.toLowerCase();
        window.__report('t2', text.includes('dns'), 'Mention DNS.');
        window.__report('t3', text.includes('http'), 'Mention HTTP.');
        window.__report('t4', text.includes('render'), 'Mention rendering.');
      `,
      tests: [
        { id: "t1", description: "At least 4 ordered steps", hidden: false },
        { id: "t2", description: "Mentions DNS", hidden: false },
        { id: "t3", description: "Mentions HTTP", hidden: false },
        { id: "t4", description: "Mentions rendering", hidden: true },
      ],
      hints: [
        "Use <ol><li>...</li></ol> for a numbered sequence.",
        "Your steps should roughly follow: DNS lookup, connect, send HTTP request, receive HTTP response, render.",
        "Make sure the words 'DNS', 'HTTP', and 'render' each appear somewhere in your text.",
      ],
    },
    commonMistakes: [
      "Thinking DNS transmits the actual page content — it only resolves a name to an address.",
      "Assuming every request returns HTML; APIs commonly return JSON instead (covered in the Git, APIs & SQL track).",
      "Confusing a 4xx (client error, like a typo'd URL) with a 5xx (server-side failure) status code.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does DNS do?",
        choices: [
          "Encrypts HTTP traffic",
          "Translates a domain name into an IP address",
          "Renders HTML into pixels",
          "Stores cookies",
        ],
        correctIndex: 1,
        explanation: "DNS is essentially the internet's phone book: names in, addresses out.",
      },
      {
        id: "q2",
        prompt: "Which status code indicates the requested resource does not exist?",
        choices: ["200", "301", "404", "500"],
        correctIndex: 2,
        explanation: "404 Not Found means the server has nothing at the requested path.",
      },
      {
        id: "q3",
        prompt: "What three things does an HTTP response typically include?",
        choices: [
          "A status code, headers, and a body",
          "A domain name, a password, and a cookie",
          "A CPU, a compiler, and a DOM",
          "A file system, a terminal, and an editor",
        ],
        correctIndex: 0,
        explanation:
          "A response carries a status code, metadata headers, and often a body such as HTML or JSON.",
      },
    ],
    takeaway:
      "Loading any page is a request/response conversation: DNS finds an address, HTTP carries the message, and the browser renders what comes back.",
    summary:
      "Visiting a URL triggers a DNS lookup, an HTTP request to a server, an HTTP response with a status code and body, and finally browser rendering. The same request/response mechanics power APIs you'll call directly later.",
    nextLessonSlug: "html-document-structure",
  },
];
