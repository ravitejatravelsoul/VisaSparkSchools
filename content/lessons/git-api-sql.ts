import type { LessonInput } from "@/lib/content/types";
import { BOOKSTORE_SEED_SQL } from "@/content/fixtures/sql-seed";

export const gitApiSqlLessons: LessonInput[] = [
  {
    id: "git-basics",
    slug: "git-basics",
    title: "Git Basics: Repositories, Commits & History",
    description:
      "What a Git repository actually is, and how the stage-then-commit workflow builds a project's history.",
    trackSlug: "git-api-sql",
    courseSlug: "git-apis-sql",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: [],
    objectives: [
      "Explain what a Git repository is and what 'git init' creates",
      "Describe the stage-then-commit workflow (git add, git commit)",
      "Read a commit history log and explain what each entry represents",
      "Explain what a diff shows between two versions of a file",
    ],
    skills: ["version-control", "git-fundamentals"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "Git: Getting Started - Git Basics",
        url: "https://git-scm.com/book/en/v2/Getting-Started-Git-Basics",
      },
      { label: "Git: git-commit documentation", url: "https://git-scm.com/docs/git-commit" },
    ],
    keywords: ["git", "repository", "commit", "staging area", "version control", "log", "diff"],
    explanation: `A **Git repository** is just a regular folder with one extra thing hiding inside it: a hidden \`.git\` directory that records every snapshot you have ever asked Git to save. Running \`git init\` in a folder is the moment that folder becomes a repository — nothing about your files changes, Git simply starts paying attention.

**Git does not save every keystroke.** It saves snapshots, and only when you tell it to, through a two-step ritual:

1. **Staging (\`git add\`).** You choose exactly which changed files should be part of the *next* snapshot. Think of the staging area as a shopping cart: you can add and remove items before checking out.
2. **Committing (\`git commit\`).** You "check out" the cart. Git bundles everything staged into a permanent snapshot, tagged with a message, an author, and a timestamp. That snapshot gets a unique identifier called a **hash** (a string like \`a1b2c3d\`).

Because commits are snapshots layered on top of each other, they naturally form a **history** — a timeline of every checkpoint your project has passed through. The \`git log\` command prints that timeline, newest commit first, showing each commit's hash and message. It's the project's memory: you can always look back and see exactly what existed at any point in time, and why it changed (a good commit message answers "why," not just "what").

**Why stage separately from committing?** Because real work is messy. You might fix a bug and also start an unrelated cleanup in the same sitting. Staging lets you group only the bug fix into one commit and the cleanup into another, so the history stays readable — one logical change per commit, rather than one giant, unexplainable commit.

**Diffs** are how Git shows you *what changed* between two snapshots (or between your working files and the last commit). A diff highlights added lines and removed lines, line by line, so a reviewer — or future you — can see precisely what was touched without re-reading the entire file. \`git diff\` shows unstaged changes; once something is staged, Git can diff that too.

There's no real terminal in this lesson's exercises, so instead you'll represent commit histories as structured lists — the same idea \`git log\` shows you, just rendered as HTML instead of terminal text. The mental model is identical: a repository is a folder Git watches, changes get staged and committed as snapshots, and those snapshots stack up into a history you can read, diff, and trust.`,
    example: {
      language: "html",
      description:
        "A repository's commit history rendered as a simple ordered list, newest commit first — the same information `git log` would print, one entry per commit hash and message.",
      code: `<!doctype html>
<html>
  <body>
    <h1>my-project/ — commit history</h1>
    <ol>
      <li><strong>i7j8k9l</strong> — Fix typo in homepage heading</li>
      <li><strong>e4f5g6h</strong> — Add styles.css</li>
      <li><strong>a1b2c3d</strong> — Initial commit: add index.html</li>
    </ol>
  </body>
</html>`,
      editable: false,
    },
    guidedExercise: {
      id: "git-basics-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Add three commits to the history below, in order: 'Initial commit', 'Add README', and 'Fix homepage bug'. Represent each as an <li> with a short fake hash followed by a dash and the message.",
      starterCode: `<!doctype html>
<html>
  <body>
    <h1>practice-repo/ — commit history</h1>
    <ol>
      <!-- add three <li> commits here -->
    </ol>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>practice-repo/ — commit history</h1>
    <ol>
      <li>abc1234 — Initial commit</li>
      <li>def5678 — Add README</li>
      <li>ghi9012 — Fix homepage bug</li>
    </ol>
  </body>
</html>`,
      harness: `
        window.__report('t1', document.querySelectorAll('ol li').length === 3, 'The <ol> should contain exactly three <li> commit entries.');
        window.__report('t2', document.body.textContent.includes('Initial commit'), 'Include a commit message for the initial commit.');
        window.__report('t3', /README/i.test(document.body.textContent), 'Include a commit message that mentions README.');
      `,
      tests: [
        { id: "t1", description: "The <ol> has exactly three <li> commits", hidden: false },
        { id: "t2", description: "One commit message mentions the initial commit", hidden: false },
        { id: "t3", description: "One commit message mentions README", hidden: true },
      ],
      hints: [
        "Remember: a commit is a saved snapshot, and `git log` lists commits from newest to oldest.",
        "Add your three commits as <li> items inside the existing <ol>, keeping the newest-first convention if you like.",
        "Each <li> should read like a hash followed by a dash and the message, e.g. 'abc1234 — Initial commit'.",
        "Example line: <li>abc1234 — Initial commit</li>",
      ],
    },
    independentExercise: {
      id: "git-basics-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Build a five-commit history for a project called 'todo-app'. Use an <ol> with one <li> per commit, include at least one message containing the word 'Add' and one containing the word 'Fix'.",
      starterCode: `<!doctype html>
<html>
  <body>
    <h1>todo-app/ — commit history</h1>
    <ol>
      <!-- build five commits here -->
    </ol>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>todo-app/ — commit history</h1>
    <ol>
      <li>1a2b3c4 — Fix crash when list is empty</li>
      <li>5d6e7f8 — Add due-date field to tasks</li>
      <li>9g0h1i2 — Add checkbox styling</li>
      <li>3j4k5l6 — Fix typo in button label</li>
      <li>7m8n9o0 — Initial commit: project skeleton</li>
    </ol>
  </body>
</html>`,
      harness: `
        const items = document.querySelectorAll('ol li');
        window.__report('t1', items.length >= 5, 'Add at least five <li> commit entries.');
        const text = document.body.textContent;
        window.__report('t2', /add/i.test(text), 'Include at least one commit message containing the word "Add".');
        window.__report('t3', /fix/i.test(text), 'Include at least one commit message containing the word "Fix".');
      `,
      tests: [
        { id: "t1", description: "At least five commits are listed", hidden: false },
        { id: "t2", description: "At least one commit message contains 'Add'", hidden: false },
        { id: "t3", description: "At least one commit message contains 'Fix'", hidden: true },
      ],
      hints: [
        "Plan five short, distinct changes to a fictional to-do app before you start writing markup.",
        "Each commit is one <li> inside the <ol>; keep messages short and specific, like a real commit message would be.",
        "You need the literal words 'Add' and 'Fix' to appear (capitalization doesn't matter) inside at least one message each.",
        "Example pair: <li>...— Add due-date field</li> and <li>...— Fix crash when list is empty</li>",
      ],
    },
    commonMistakes: [
      "Thinking `git add` uploads or shares code with anyone — it only stages changes locally for the next commit.",
      "Writing vague commit messages like 'stuff' or 'updates' instead of describing what changed and why.",
      "Confusing the working folder, the staging area, and the committed history as if they were one single place.",
      "Assuming Git stores only line-by-line diffs — it actually stores full snapshots, and computes diffs on demand for readability.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does running `git init` do?",
        choices: [
          "Uploads your folder to a remote server",
          "Turns the current folder into a Git repository by creating a hidden .git directory",
          "Deletes all uncommitted changes",
          "Creates a new branch automatically",
        ],
        correctIndex: 1,
        explanation:
          "`git init` starts tracking a folder locally by creating the hidden .git directory; it does not touch any remote server.",
      },
      {
        id: "q2",
        prompt: "What is the purpose of the staging area (used by `git add`)?",
        choices: [
          "It permanently deletes files",
          "It lets you choose exactly which changes will be included in the next commit",
          "It automatically writes your commit message",
          "It uploads files to GitHub",
        ],
        correctIndex: 1,
        explanation:
          "Staging lets you group related changes into one commit, keeping history readable, before you finalize a snapshot.",
      },
      {
        id: "q3",
        prompt: "What does `git log` show?",
        choices: [
          "A live preview of your rendered web page",
          "A list of installed programs",
          "The project's commit history, newest first, with each commit's hash and message",
          "The contents of the staging area only",
        ],
        correctIndex: 2,
        explanation:
          "`git log` prints the sequence of commits that make up a repository's history.",
      },
      {
        id: "q4",
        prompt: "What does a diff show?",
        choices: [
          "The added and removed lines between two versions of a file",
          "The total number of commits ever made",
          "A list of every contributor's email address",
          "The size of the .git folder on disk",
        ],
        correctIndex: 0,
        explanation:
          "A diff highlights exactly which lines changed between two snapshots, making review fast and precise.",
      },
    ],
    takeaway:
      "A Git repository remembers your project as a series of deliberate, staged snapshots called commits — and that history is always yours to read back.",
    summary:
      "Git turns a folder into a repository with `git init`, tracks changes through a stage-then-commit workflow (`git add`, `git commit`), and lets you review that history with `git log` and inspect exact changes with `git diff`.",
    nextLessonSlug: "git-branching-merging",
  },
  {
    id: "git-branching-merging",
    slug: "git-branching-merging",
    title: "Branches, Merging & Pull Requests",
    description:
      "How Git branches let you work in parallel, and how GitHub pull requests turn a merge into a reviewed conversation.",
    trackSlug: "git-api-sql",
    courseSlug: "git-apis-sql",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["git-basics"],
    objectives: [
      "Explain what a branch is and why teams use them",
      "Describe what happens when two branches are merged",
      "Walk through the GitHub pull-request workflow from branch to merge",
      "Recognize what causes a merge conflict",
    ],
    skills: ["version-control", "collaboration", "github"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "Git: Branches in a Nutshell",
        url: "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell",
      },
      {
        label: "GitHub Docs: About pull requests",
        url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
      },
    ],
    keywords: [
      "branch",
      "merge",
      "pull request",
      "github",
      "merge conflict",
      "main branch",
      "collaboration",
    ],
    explanation: `A **branch** is a movable pointer to a commit. Every repository starts with one branch (conventionally called \`main\`), but nothing stops you from creating another pointer that starts at the same commit and then diverges as you make new commits on it — while \`main\` stays untouched. This is how one project supports many people (or one person juggling many ideas) working at the same time without stepping on each other.

**Why branch instead of always committing to main?** Because \`main\` usually represents "the version that works." A feature branch, like \`feature/login-page\`, is a safe sandbox: you can commit half-finished, experimental work there, and \`main\` never sees it until you're ready.

**Merging** is how work travels back. When you merge a feature branch into \`main\`, Git combines the two histories: every commit made on the feature branch becomes part of \`main\`'s history too. If nothing on \`main\` changed while you were away, Git can often just move the \`main\` pointer forward (a "fast-forward"). If both branches changed *different* things, Git creates a new **merge commit** that has two parents, weaving the histories together automatically.

**Merge conflicts** happen when both branches changed the *same lines* of the *same file* in different ways. Git can't guess which version you want, so it pauses and asks a human to pick (or combine) the correct result. A conflict is not a sign anything is broken — it's Git correctly refusing to guess.

**The GitHub pull request (PR) workflow** builds a review conversation on top of branching:

1. You create a branch and push commits to it on GitHub.
2. You open a **pull request**, which compares your branch against \`main\` and shows the exact diff.
3. Teammates read the diff, leave comments, and request changes if needed.
4. Once approved, someone clicks **Merge** — GitHub performs the actual Git merge for you.
5. The feature branch is typically deleted afterward, since its work now lives on \`main\`.

A pull request itself is not a Git concept — Git only knows about branches, commits, and merges. The "pull request" is a feature GitHub (and similar platforms) layers on top, giving teams a structured place to discuss a change before it becomes permanent.`,
    visual: {
      kind: "diagram",
      title: "A feature branch merging back into main",
      description:
        "main: commit 1 → commit 2 → commit 3 → (merge commit 6). feature/login-page branches off commit 2, adds commit 4 → commit 5, then a pull request merges commits 4 and 5 into main as merge commit 6, after which main contains all six commits' work.",
    },
    example: {
      language: "html",
      description:
        "Two branches represented as separate commit lists, followed by a note describing the merge that reunited them.",
      code: `<!doctype html>
<html>
  <body>
    <h1>main</h1>
    <ol>
      <li>3f3f3f3 — Set up project skeleton</li>
      <li>2e2e2e2 — Add landing page</li>
    </ol>
    <h2>feature/login-page</h2>
    <ol>
      <li>5d5d5d5 — Add login form styling</li>
      <li>4c4c4c4 — Add login form markup</li>
    </ol>
    <p>Merged pull request #4: feature/login-page into main.</p>
  </body>
</html>`,
      editable: false,
    },
    guidedExercise: {
      id: "git-branching-merging-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Below is the 'main' branch history. Add a heading <h2>feature/nav-bar</h2>, an <ol> with two commits on that branch, and a closing <p> noting it was merged into main.",
      starterCode: `<!doctype html>
<html>
  <body>
    <h1>main</h1>
    <ol>
      <li>aaa1111 — Initial commit</li>
    </ol>
    <!-- add the feature/nav-bar branch and a merge note below -->
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>main</h1>
    <ol>
      <li>aaa1111 — Initial commit</li>
    </ol>
    <h2>feature/nav-bar</h2>
    <ol>
      <li>bbb2222 — Add nav-bar markup</li>
      <li>ccc3333 — Style nav-bar links</li>
    </ol>
    <p>Merged pull request #2: feature/nav-bar into main.</p>
  </body>
</html>`,
      harness: `
        window.__report('t1', /feature\\/nav-bar/.test(document.body.textContent), 'Add a heading naming the feature/nav-bar branch.');
        window.__report('t2', document.querySelectorAll('h2 ~ ol li, ol li').length >= 3, 'The feature branch needs its own <ol> with two commits, in addition to main\\'s commit.');
        window.__report('t3', /merged/i.test(document.body.textContent), 'Add a closing paragraph noting the branch was merged.');
      `,
      tests: [
        { id: "t1", description: "Names the feature/nav-bar branch in a heading", hidden: false },
        { id: "t2", description: "Feature branch has its own two-commit list", hidden: false },
        { id: "t3", description: "A paragraph notes the merge happened", hidden: true },
      ],
      hints: [
        "A branch is just a separate line of commits that started from an existing one — represent it as its own heading and list.",
        "Add <h2>feature/nav-bar</h2> after the existing main history, followed by its own <ol>.",
        "The feature branch's <ol> needs exactly two <li> commits describing nav-bar work.",
        "Finish with something like: <p>Merged pull request #2: feature/nav-bar into main.</p>",
      ],
    },
    independentExercise: {
      id: "git-branching-merging-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Model a full pull request page: a heading naming a branch, at least three commits for that branch in an <ol>, and a paragraph stating 'Merged pull request' together with a PR number such as #7.",
      starterCode: `<!doctype html>
<html>
  <body>
    <!-- build the branch history and merge note here -->
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <h1>main</h1>
    <ol>
      <li>0a0a0a0 — Initial commit</li>
    </ol>
    <h2>feature/search-box</h2>
    <ol>
      <li>1b1b1b1 — Add search input</li>
      <li>2c2c2c2 — Wire up search results list</li>
      <li>3d3d3d3 — Add empty-results message</li>
    </ol>
    <p>Merged pull request #7: feature/search-box into main.</p>
  </body>
</html>`,
      harness: `
        const text = document.body.textContent;
        window.__report('t1', /feature\\//.test(text), 'Name a feature branch (e.g. feature/search-box) in a heading.');
        const listItems = document.querySelectorAll('ol li');
        window.__report('t2', listItems.length >= 3, 'List at least three commits for the feature branch (main\\'s own commits may add more).');
        window.__report('t3', /merged pull request/i.test(text), 'Include the phrase "Merged pull request".');
        window.__report('t4', /#\\d+/.test(text), 'Include a PR number written like #7.');
      `,
      tests: [
        { id: "t1", description: "Names a feature branch", hidden: false },
        {
          id: "t2",
          description: "At least three commits are listed for the branch",
          hidden: false,
        },
        { id: "t3", description: "Mentions 'Merged pull request'", hidden: false },
        { id: "t4", description: "Includes a PR number like #7", hidden: true },
      ],
      hints: [
        "Think of a small feature (like a search box) and imagine three separate commits that built it up.",
        "Use a heading for the branch name and an <ol> with three <li> commits underneath it.",
        "The closing paragraph needs the exact phrase 'Merged pull request' plus a number written with a hash, like #7.",
        "Example ending: <p>Merged pull request #7: feature/search-box into main.</p>",
      ],
    },
    commonMistakes: [
      "Believing that merging automatically deletes the original branch — it doesn't, unless you delete it yourself afterward.",
      "Assuming a pull request is a core Git feature — it's a workflow built by platforms like GitHub on top of Git branches.",
      "Panicking at a merge conflict — it only means Git needs a human decision about conflicting lines, not that something broke.",
      "Committing directly to main on a team project instead of opening a feature branch and a pull request.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is a Git branch, technically?",
        choices: [
          "A copy of the entire repository on a different computer",
          "A movable pointer to a commit, allowing separate lines of work",
          "A backup file created automatically every hour",
          "A folder inside .git that stores deleted files",
        ],
        correctIndex: 1,
        explanation:
          "A branch is a lightweight, movable pointer to a commit; new commits on that branch move the pointer forward.",
      },
      {
        id: "q2",
        prompt: "What causes a merge conflict?",
        choices: [
          "Two branches were created from different repositories",
          "Both branches changed the same lines of the same file in different ways",
          "A commit message was left empty",
          "The repository ran out of storage space",
        ],
        correctIndex: 1,
        explanation:
          "Git can automatically combine changes unless both branches edited the same lines differently, in which case a human must decide.",
      },
      {
        id: "q3",
        prompt: "What is a GitHub pull request?",
        choices: [
          "A core Git command for merging branches",
          "A request to download someone else's repository",
          "A GitHub feature that proposes merging one branch into another, with room for review and comments",
          "A way to permanently delete a branch",
        ],
        correctIndex: 2,
        explanation:
          "Pull requests are a collaboration feature layered on top of Git's branching and merging by platforms like GitHub.",
      },
      {
        id: "q4",
        prompt: "After a pull request is merged, what commonly happens to the feature branch?",
        choices: [
          "It becomes the new main branch",
          "It is often deleted, since its commits now live on main",
          "It is automatically converted into a tag",
          "Nothing — it must be merged again for every future change",
        ],
        correctIndex: 1,
        explanation:
          "Once merged, the feature branch has served its purpose and is typically deleted to keep the repository tidy.",
      },
    ],
    takeaway:
      "Branches let work happen in parallel without disturbing main, and pull requests turn the act of merging into a reviewed, collaborative conversation.",
    summary:
      "A branch is a pointer to a commit that lets you diverge from main safely; merging reunites two histories, occasionally producing a conflict a human must resolve. GitHub's pull-request workflow layers review and discussion on top of that merge.",
    nextLessonSlug: "json-http-basics",
  },
  {
    id: "json-http-basics",
    slug: "json-http-basics",
    title: "JSON and HTTP: The Language APIs Speak",
    description:
      "The data format (JSON) and vocabulary (HTTP methods and status codes) almost every web API uses to exchange information.",
    trackSlug: "git-api-sql",
    courseSlug: "git-apis-sql",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: ["git-branching-merging"],
    objectives: [
      "Read and write valid JSON, including nested objects and arrays",
      "Explain what GET, POST, PUT, and DELETE requests are typically used for",
      "Interpret common HTTP status codes and which category they belong to",
    ],
    skills: ["apis", "json", "http"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Working with JSON",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON",
      },
      {
        label: "MDN: HTTP response status codes",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
      },
    ],
    keywords: ["json", "http", "get", "post", "put", "delete", "status code", "api response"],
    explanation: `You already know that browsers and servers talk using HTTP requests and responses. APIs use the same request/response cycle, but instead of a full HTML page, the response body is usually **JSON** (JavaScript Object Notation) — a lightweight, text-based format for representing structured data.

**JSON's building blocks** are the same as JavaScript's: objects (\`{ }\`), arrays (\`[ ]\`), strings, numbers, booleans, and \`null\`. The catch is that JSON is stricter than a JavaScript object literal:

- Every key must be a **double-quoted string** — \`{"title": "Sapiens"}\`, never \`{title: "Sapiens"}\` or single quotes.
- There are **no trailing commas**, no comments, and no functions — JSON is pure data, nothing executable.

Because both browsers and servers have built-in JSON support, converting between JSON text and real objects is one line: \`JSON.stringify(value)\` turns a JavaScript value into JSON text, and \`JSON.parse(text)\` turns JSON text back into a usable value.

**HTTP methods** tell a server *what kind of action* a request wants, independent of the URL it targets:

- **GET** — read/fetch data, without changing anything on the server.
- **POST** — create something new (like submitting a new order).
- **PUT** — replace/update an existing resource with a full new version.
- **DELETE** — remove a resource.

(You may also encounter **PATCH**, for partially updating a resource, but GET/POST/PUT/DELETE cover the vast majority of everyday API work.)

**HTTP status codes** tell you how the request went, and they're grouped into ranges you can reason about even before checking the exact number:

- **2xx** — success (\`200 OK\`, \`201 Created\`, \`204 No Content\`).
- **3xx** — redirection (the resource moved elsewhere).
- **4xx** — client error (your request was the problem — \`400 Bad Request\`, \`401 Unauthorized\`, \`404 Not Found\`).
- **5xx** — server error (the server failed while handling an otherwise valid request — \`500 Internal Server Error\`).

Put together, calling an API is exactly the request/response cycle you already know, specialized: you choose a **method** to describe your intent, send it to a **path**, and get back a **status code** plus a **JSON body** describing what happened. Every example in this lesson runs entirely inside a small mock function — no real network call leaves your browser — so you can focus on the shape of the data and the vocabulary, safely and offline.`,
    example: {
      language: "javascript",
      description:
        "A mock API response object, plus JSON.stringify/JSON.parse round-tripping its body — no real network request is made.",
      code: `// A tiny mock API response - entirely local, no network involved.
const bookApiResponse = {
  status: 200,
  method: "GET",
  path: "/books/3",
  body: {
    id: 3,
    title: "Norwegian Wood",
    price: 14.99,
    inStock: true,
  },
};

const asJsonText = JSON.stringify(bookApiResponse.body);
const parsedBack = JSON.parse(asJsonText);

console.log(asJsonText);
console.log(parsedBack.title, parsedBack.price);`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change the method, path, or body fields, then press Run to see the JSON text change.",
      code: `const apiResponse = {
  status: 201,
  method: "POST",
  path: "/books",
  body: {
    title: "Dune",
    price: 12.5,
    inStock: true,
  },
};

console.log(JSON.stringify(apiResponse.body));`,
      editable: true,
    },
    guidedExercise: {
      id: "json-http-basics-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Complete the mockFetch function so that calling mockFetch('/books/7', 'GET') returns { status: 200, body: { id: 7, title: 'Sapiens' } }, and any other path/method combination returns { status: 404, body: null }.",
      starterCode: `function mockFetch(path, method) {
  if (path === '/books/7' && method === 'GET') {
    return { status: ___, body: { id: 7, title: ___ } };
  }
  return { status: 404, body: null };
}`,
      solutionCode: `function mockFetch(path, method) {
  if (path === '/books/7' && method === 'GET') {
    return { status: 200, body: { id: 7, title: 'Sapiens' } };
  }
  return { status: 404, body: null };
}`,
      harness: `
        try {
          const res = mockFetch('/books/7', 'GET');
          window.__report('t1', !!res && res.status === 200, 'mockFetch("/books/7","GET") should return status 200.');
        } catch (e) {
          window.__report('t1', false, 'mockFetch threw an error: ' + e.message);
        }
        try {
          const res = mockFetch('/books/7', 'GET');
          window.__report('t2', !!res && !!res.body && res.body.title === 'Sapiens', 'The body should include title "Sapiens".');
        } catch (e) {
          window.__report('t2', false, 'mockFetch threw an error: ' + e.message);
        }
        try {
          const res = mockFetch('/unknown-path', 'GET');
          window.__report('t3', !!res && res.status === 404, 'An unrecognized path should return status 404.');
        } catch (e) {
          window.__report('t3', false, 'mockFetch threw an error: ' + e.message);
        }
      `,
      tests: [
        { id: "t1", description: "Returns status 200 for GET /books/7", hidden: false },
        { id: "t2", description: "Returns a body with title 'Sapiens'", hidden: false },
        { id: "t3", description: "Returns status 404 for an unknown path", hidden: true },
      ],
      hints: [
        "GET requests are for reading data without changing anything — a successful read typically reports status 200.",
        "Fill in the status number for a successful response, and the title string for book id 7.",
        "The status code for success is 200; the title you need is the string 'Sapiens'.",
        "Example: return { status: 200, body: { id: 7, title: 'Sapiens' } };",
      ],
    },
    independentExercise: {
      id: "json-http-basics-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function mockFetch(path, method) from scratch: GET '/books' returns { status: 200, body: <an array> }; POST '/books' returns { status: 201, body: { created: true } }; anything else returns { status: 404, body: null }.",
      starterCode: `function mockFetch(path, method) {
  // your implementation here
}`,
      solutionCode: `function mockFetch(path, method) {
  if (path === '/books' && method === 'GET') {
    return { status: 200, body: ['Norwegian Wood', 'Sapiens', 'Americanah'] };
  }
  if (path === '/books' && method === 'POST') {
    return { status: 201, body: { created: true } };
  }
  return { status: 404, body: null };
}`,
      harness: `
        try {
          const res = mockFetch('/books', 'GET');
          window.__report('t1', !!res && res.status === 200 && Array.isArray(res.body), 'GET /books should return status 200 with an array body.');
        } catch (e) {
          window.__report('t1', false, 'mockFetch threw an error: ' + e.message);
        }
        try {
          const res = mockFetch('/books', 'POST');
          window.__report('t2', !!res && res.status === 201 && !!res.body && res.body.created === true, 'POST /books should return status 201 with body { created: true }.');
        } catch (e) {
          window.__report('t2', false, 'mockFetch threw an error: ' + e.message);
        }
        try {
          const res = mockFetch('/authors', 'GET');
          window.__report('t3', !!res && res.status === 404, 'An unhandled path should return status 404.');
        } catch (e) {
          window.__report('t3', false, 'mockFetch threw an error: ' + e.message);
        }
      `,
      tests: [
        { id: "t1", description: "GET /books returns 200 with an array body", hidden: false },
        { id: "t2", description: "POST /books returns 201 with { created: true }", hidden: false },
        { id: "t3", description: "Unhandled path/method returns 404", hidden: true },
      ],
      hints: [
        "You'll need to branch on both the path and the method — the same path can behave differently for GET versus POST.",
        "GET usually means 'read and return data'; POST usually means 'create something and confirm it happened'.",
        "The success codes you need are 200 for the GET and 201 for the POST; anything unmatched falls through to 404.",
        "Skeleton: if (path === '/books' && method === 'GET') { return { status: 200, body: [...] }; }",
      ],
    },
    commonMistakes: [
      "Using single quotes or trailing commas in real JSON text — valid JSON requires double-quoted keys and strings, and no trailing commas, even though JavaScript object literals are more forgiving.",
      "Assuming every API response is JSON — always check the documentation or the Content-Type header.",
      "Treating PUT and POST as interchangeable — POST typically creates a new resource, PUT typically replaces an existing one at a known location.",
      "Assuming a 4xx status means the server is broken — 4xx means the client's request was the problem; 5xx means the server failed.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which of these is valid JSON?",
        choices: [
          "{title: 'Sapiens', price: 20}",
          '{"title": "Sapiens", "price": 20}',
          '{"title": "Sapiens", "price": 20,}',
          "{'title': 'Sapiens'}",
        ],
        correctIndex: 1,
        explanation:
          "Valid JSON requires double-quoted keys and string values, and forbids trailing commas.",
      },
      {
        id: "q2",
        prompt:
          "Which HTTP method is meant for fetching data without changing anything on the server?",
        choices: ["POST", "DELETE", "GET", "PUT"],
        correctIndex: 2,
        explanation:
          "GET requests are for reading/fetching data; they should not modify server-side state.",
      },
      {
        id: "q3",
        prompt: "A response comes back with status 201. What does that tell you?",
        choices: [
          "The server crashed",
          "The request succeeded and a new resource was created",
          "The client sent a malformed request",
          "The resource was permanently moved",
        ],
        correctIndex: 1,
        explanation:
          "201 Created is a 2xx success code specifically indicating a new resource was created.",
      },
      {
        id: "q4",
        prompt:
          "A response comes back with status 404. Whose 'fault' does that generally indicate?",
        choices: [
          "The server's — something crashed while processing a valid request",
          "The client's — it asked for something that doesn't exist at that path",
          "Neither — 404 always means a network outage",
          "It means the request is still pending",
        ],
        correctIndex: 1,
        explanation:
          "404 Not Found is a 4xx client error: the requested resource doesn't exist at that path.",
      },
    ],
    takeaway:
      "APIs run on the same request/response cycle as the web, specialized: an HTTP method expresses intent, a status code reports the outcome, and JSON carries the data.",
    summary:
      "JSON is a strict, text-based data format built from objects, arrays, and primitive values, easily converted to and from real values with JSON.stringify/JSON.parse. HTTP methods (GET, POST, PUT, DELETE) express what a request wants to do, and status codes (2xx, 3xx, 4xx, 5xx) report what happened.",
    nextLessonSlug: "api-rest-basics",
  },
  {
    id: "api-rest-basics",
    slug: "api-rest-basics",
    title: "REST APIs and Authentication Basics",
    description:
      "How REST APIs organize functionality around resources and URLs, and how API keys and tokens prove who's calling.",
    trackSlug: "git-api-sql",
    courseSlug: "git-apis-sql",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["json-http-basics"],
    objectives: [
      "Describe the core ideas behind REST: resources, URLs, and stateless requests",
      "Explain the conceptual difference between an API key and an auth token",
      "Explain why secrets should never be hardcoded into client-side code",
    ],
    skills: ["apis", "rest", "authentication"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: An overview of HTTP",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
      },
      {
        label: "MDN: HTTP request methods",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
      },
    ],
    keywords: [
      "rest",
      "api",
      "endpoint",
      "resource",
      "authentication",
      "api key",
      "token",
      "stateless",
    ],
    explanation: `**REST** (Representational State Transfer) is less a technology than a set of conventions for designing APIs so they're predictable. The central idea: everything an API manages is a **resource**, named by a noun, and reachable at a URL — like \`/books\` for the collection of all books, or \`/books/3\` for one specific book. You already know the verbs that act on a resource, because they're just the HTTP methods from the previous lesson: GET \`/books/3\` reads it, PUT \`/books/3\` replaces it, DELETE \`/books/3\` removes it, and POST \`/books\` creates a new one inside the collection.

**Stateless** is the other pillar of REST: each request must carry everything the server needs to understand it — the server does not remember anything about your previous requests just because they came from the same browser. This makes APIs easier to scale (any server instance can handle any request) and easier to reason about (nothing "invisible" affects the response). The one thing that looks like an exception is authentication: you resend proof of who you are with *every* request, rather than relying on the server to remember you from before.

**Authentication** answers "who is calling?" Two common mechanisms you'll meet constantly:

- **API keys** — a single, long-lived secret string identifying an application or account, usually sent in a header like \`X-API-Key\`. Simple, but anyone holding the key can use it exactly as you can.
- **Auth tokens** (often "Bearer tokens") — typically issued after a login step, often short-lived, and tied to a specific user or session rather than an entire application. Sent in a header like \`Authorization: Bearer <token>\`.

Both prove identity by attaching a secret to the request rather than by the server remembering you — consistent with statelessness.

It's worth separating two ideas that sound similar: **authentication** ("who are you?") versus **authorization** ("what are you allowed to do, now that we know who you are?"). A valid API key might authenticate you successfully but still be authorized only for read access, for example.

**Never hardcode secrets into client-side code.** Any JavaScript that ships to a browser can be viewed by anyone who opens developer tools — there is no way to hide a string inside code the browser executes. Real secrets belong on a server, loaded from environment variables or a secrets manager, never bundled into a public app. Everything in this lesson's examples uses obviously fake placeholder keys for exactly that reason — you'll never see a real secret written directly into example code on this platform, and neither should your own client-side code.`,
    example: {
      language: "javascript",
      description:
        "A mock authenticated API call — entirely local, using an obviously fake placeholder key to demonstrate the shape of the check.",
      code: `// A mock REST endpoint that checks a fake API key before responding.
function callApi(path, apiKey) {
  const VALID_KEY = "demo-key-123"; // placeholder only, never a real secret

  if (apiKey !== VALID_KEY) {
    return { status: 401, body: { error: "Unauthorized" } };
  }
  if (path === "/me") {
    return { status: 200, body: { user: "ada", role: "admin" } };
  }
  return { status: 404, body: null };
}

console.log(callApi("/me", "wrong-key"));
console.log(callApi("/me", "demo-key-123"));`,
      editable: false,
    },
    guidedExercise: {
      id: "api-rest-basics-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Complete callApi so it returns { status: 200, body: { user: 'ada' } } when apiKey equals 'valid-key-999', and { status: 401, body: null } for any other key.",
      starterCode: `function callApi(path, apiKey) {
  if (apiKey === 'valid-key-999') {
    return { status: ___, body: { user: ___ } };
  }
  return { status: 401, body: null };
}`,
      solutionCode: `function callApi(path, apiKey) {
  if (apiKey === 'valid-key-999') {
    return { status: 200, body: { user: 'ada' } };
  }
  return { status: 401, body: null };
}`,
      harness: `
        try {
          const res = callApi('/profile', 'valid-key-999');
          window.__report('t1', !!res && res.status === 200, 'A valid key should return status 200.');
        } catch (e) {
          window.__report('t1', false, 'callApi threw an error: ' + e.message);
        }
        try {
          const res = callApi('/profile', 'valid-key-999');
          window.__report('t2', !!res && !!res.body && res.body.user === 'ada', 'The body should include user "ada".');
        } catch (e) {
          window.__report('t2', false, 'callApi threw an error: ' + e.message);
        }
        try {
          const res = callApi('/profile', 'guessed-key');
          window.__report('t3', !!res && res.status === 401, 'An incorrect key should return status 401.');
        } catch (e) {
          window.__report('t3', false, 'callApi threw an error: ' + e.message);
        }
      `,
      tests: [
        { id: "t1", description: "A valid key returns status 200", hidden: false },
        { id: "t2", description: "The body includes user 'ada'", hidden: false },
        { id: "t3", description: "An invalid key returns status 401", hidden: true },
      ],
      hints: [
        "Authentication answers 'who is calling?' — a correct key should be treated as a successful identity check.",
        "Fill in the success status and the username value for the matching-key branch.",
        "The success status code for a normal, successful response is 200; the username is the string 'ada'.",
        "Example: return { status: 200, body: { user: 'ada' } };",
      ],
    },
    independentExercise: {
      id: "api-rest-basics-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write callApi(path, apiKey) from scratch: with apiKey 'valid-key-999', GET '/profile' returns { status: 200, body: { role: 'admin' } }; with the same key, any other path returns { status: 404, body: null }; any wrong key, on any path, returns { status: 401, body: null }.",
      starterCode: `function callApi(path, apiKey) {
  // your implementation here
}`,
      solutionCode: `function callApi(path, apiKey) {
  if (apiKey !== 'valid-key-999') {
    return { status: 401, body: null };
  }
  if (path === '/profile') {
    return { status: 200, body: { role: 'admin' } };
  }
  return { status: 404, body: null };
}`,
      harness: `
        try {
          const res = callApi('/profile', 'valid-key-999');
          window.__report('t1', !!res && res.status === 200 && !!res.body && res.body.role === 'admin', 'A valid key on /profile should return status 200 with role admin.');
        } catch (e) {
          window.__report('t1', false, 'callApi threw an error: ' + e.message);
        }
        try {
          const res = callApi('/unknown', 'valid-key-999');
          window.__report('t2', !!res && res.status === 404, 'A valid key on an unknown path should return status 404.');
        } catch (e) {
          window.__report('t2', false, 'callApi threw an error: ' + e.message);
        }
        try {
          const res = callApi('/profile', 'wrong-key');
          window.__report('t3', !!res && res.status === 401, 'Any wrong key should return status 401, regardless of path.');
        } catch (e) {
          window.__report('t3', false, 'callApi threw an error: ' + e.message);
        }
      `,
      tests: [
        {
          id: "t1",
          description: "Valid key + /profile returns 200 with role admin",
          hidden: false,
        },
        { id: "t2", description: "Valid key + unknown path returns 404", hidden: false },
        { id: "t3", description: "Wrong key on any path returns 401", hidden: true },
      ],
      hints: [
        "Check identity first: an authentication failure should short-circuit before you even look at the path.",
        "Once the key is confirmed valid, branch on the path to decide between a known resource and a 404.",
        "Order matters: check the key first (401 if wrong), then check the path (200 for /profile, 404 otherwise).",
        "Skeleton: if (apiKey !== 'valid-key-999') { return { status: 401, body: null }; } then check path === '/profile'.",
      ],
    },
    commonMistakes: [
      "Storing API secrets directly in front-end JavaScript that ships to every visitor's browser.",
      "Assuming REST requires JSON specifically — REST is about resource-oriented URLs and HTTP semantics; JSON is just the overwhelmingly common data format choice.",
      "Confusing authentication (who are you) with authorization (what are you allowed to do).",
      "Reusing the exact same API key across development, staging, and production instead of separate keys per environment.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "In REST, how is a specific book most likely addressed?",
        choices: [
          "As a query parameter only, like ?action=getBook",
          "As a noun-based URL such as /books/3",
          "As a function call embedded in the URL, like /getBook(3)",
          "REST does not address individual resources",
        ],
        correctIndex: 1,
        explanation:
          "REST models resources as nouns reachable via predictable URLs, such as /books/3 for one specific book.",
      },
      {
        id: "q2",
        prompt: "What does 'stateless' mean in the context of REST APIs?",
        choices: [
          "The server remembers your last five requests automatically",
          "Each request must carry everything the server needs to understand it, with no memory of prior requests",
          "The API has no data at all",
          "Requests never fail",
        ],
        correctIndex: 1,
        explanation:
          "Statelessness means the server doesn't rely on remembered context between requests; each request stands alone.",
      },
      {
        id: "q3",
        prompt: "What is the key difference between authentication and authorization?",
        choices: [
          "They are two names for the exact same check",
          "Authentication confirms who you are; authorization determines what you're allowed to do",
          "Authorization happens before authentication",
          "Authentication only applies to admins",
        ],
        correctIndex: 1,
        explanation:
          "Authentication establishes identity; authorization decides what that identity is permitted to access or change.",
      },
      {
        id: "q4",
        prompt: "Why should a real API secret never be hardcoded into client-side JavaScript?",
        choices: [
          "It would make the app run slower",
          "Client-side JavaScript is invisible to end users, so this is actually safe",
          "Anyone can view the source of code that runs in their own browser, exposing the secret",
          "Browsers refuse to run code containing secrets",
        ],
        correctIndex: 2,
        explanation:
          "Code that executes in a browser can always be inspected by whoever is running it, so embedded secrets are effectively public.",
      },
    ],
    takeaway:
      "REST organizes an API around resources and HTTP verbs, and every request proves identity on its own — never by leaning on secrets baked into client-side code.",
    summary:
      "REST APIs address resources with noun-based URLs and use HTTP methods to act on them, remaining stateless so each request is self-contained. Authentication (API keys, tokens) proves identity on every request, distinct from authorization, and real secrets must live server-side, never in client-side code.",
    nextLessonSlug: "sql-tables-relationships",
  },
  {
    id: "sql-tables-relationships",
    slug: "sql-tables-relationships",
    title: "SQL Tables, Rows, Columns & Relationships",
    description:
      "How relational databases organize data into tables, and how foreign keys connect those tables to each other.",
    trackSlug: "git-api-sql",
    courseSlug: "git-apis-sql",
    order: 4,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["api-rest-basics"],
    objectives: [
      "Describe what a table, row, and column represent in a relational database",
      "Explain what a primary key is and why every table needs one",
      "Explain how a foreign key models a relationship between two tables",
    ],
    skills: ["sql-fundamentals", "data-modeling"],
    tech: [{ name: "SQLite", version: "3" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      { label: "SQLite: CREATE TABLE", url: "https://sqlite.org/lang_createtable.html" },
      { label: "SQLite: Foreign Key Support", url: "https://sqlite.org/foreignkeys.html" },
    ],
    keywords: [
      "sql",
      "table",
      "row",
      "column",
      "primary key",
      "foreign key",
      "relationship",
      "sqlite",
    ],
    explanation: `A relational database organizes data into **tables** — think of each table as a labeled spreadsheet. Every table has **columns** (the fields, like \`title\` or \`price\`, each with a fixed data type) and **rows** (individual records, like one specific book). Throughout this track you'll work with a small bookstore database made of three connected tables: \`authors\`, \`books\`, and \`orders\`.

**Every table needs a primary key** — a column (or set of columns) guaranteed to uniquely identify each row, usually named \`id\`. No two rows in \`authors\` share the same \`id\`; that guarantee is what lets other tables refer back to a specific author reliably, no matter how many authors share the same name.

That's exactly what a **foreign key** is for. Look at the \`books\` table: alongside its own \`title\`, \`price\`, and so on, it has an \`author_id\` column. That column doesn't describe the book itself — it stores the \`id\` of the row in \`authors\` that wrote it. \`author_id\` is a foreign key: a pointer from one table into another table's primary key.

This is how relational databases model **relationships** without duplicating data. Instead of writing "Haruki Murakami, Japan" inside every single one of his book rows, each book just stores \`author_id = 3\`, and any question about that author is answered by looking up row \`3\` in \`authors\` once. The relationship between \`authors\` and \`books\` here is called **one-to-many**: one author can be linked to many books, but each book links back to exactly one author. The same pattern connects \`books\` to \`orders\`: each order references one \`book_id\`, while a single book can appear in many orders.

Keeping data this way — one fact stored in exactly one place, connected by keys instead of copied everywhere — is the core idea behind relational design. It avoids the mess of updating the same fact in ten different rows if it ever changes, and it's why SQL (Structured Query Language) is built around *joining* tables back together through these key relationships, which you'll practice hands-on starting in the next lesson.

Every SQL exercise in this track runs against the exact same bookstore schema, so the shapes of \`authors\`, \`books\`, and \`orders\` you learn here will keep showing up, lesson after lesson.`,
    example: {
      language: "sql",
      description:
        "Every row in `authors` has a unique `id` — its primary key. Reading the whole table shows all five authors and their `id` values.",
      code: `SELECT id, name, country FROM authors;`,
      editable: false,
    },
    editableExample: {
      language: "sql",
      description:
        "The `books` table stores an `author_id` column pointing back to `authors.id`. Try adding a WHERE clause, like WHERE author_id = 3, then press Run.",
      code: `SELECT id, title, author_id FROM books;`,
      editable: true,
    },
    guidedExercise: {
      id: "sql-tables-relationships-guided",
      kind: "guided",
      language: "sql",
      prompt:
        "Complete the query to look up the single author row for Haruki Murakami, whose id is 3.",
      starterCode: `SELECT id, name, country
FROM authors
WHERE id = ___;`,
      solutionCode: `SELECT id, name, country FROM authors WHERE id = 3;`,
      seedSql: BOOKSTORE_SEED_SQL,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description: "Returns exactly the row for author id 3 (Haruki Murakami, Japan)",
          hidden: false,
        },
      ],
      hints: [
        "A primary key like `authors.id` uniquely identifies exactly one row — filtering on it returns at most one result.",
        "You need a WHERE clause comparing the id column to a specific number.",
        "The id you're looking for belongs to Haruki Murakami: it's 3.",
        "Example: SELECT id, name, country FROM authors WHERE id = 3;",
      ],
    },
    independentExercise: {
      id: "sql-tables-relationships-independent",
      kind: "independent",
      language: "sql",
      prompt:
        "Write a query that returns the title, author_id, and price of every book written by author_id 4 (Chimamanda Ngozi Adichie), demonstrating how the foreign key connects books back to their author.",
      starterCode: `-- Select title, author_id, and price from books
-- for the author whose id is 4`,
      solutionCode: `SELECT title, author_id, price FROM books WHERE author_id = 4;`,
      seedSql: BOOKSTORE_SEED_SQL,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description: "Returns all three books where author_id equals 4",
          hidden: false,
        },
      ],
      hints: [
        "The `books` table doesn't store an author's name — it stores a foreign key, author_id, pointing at the authors table.",
        "Filter the books table directly on that foreign key column.",
        "You're looking for rows where author_id = 4.",
        "Example shape: SELECT title, author_id, price FROM books WHERE author_id = 4;",
      ],
    },
    commonMistakes: [
      "Assuming a foreign key column (like author_id) stores a name or text — it stores a number pointing at another table's primary key.",
      "Forgetting that a primary key must be unique per row, and using a non-unique column (like a name, which two people could share) as if it were one.",
      "Thinking every relationship is one-to-one — most real relationships, like authors to books, are one-to-many.",
      "Expecting a table to 'know' related data from another table automatically, without writing a query that connects them through their keys.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does a primary key guarantee about a table?",
        choices: [
          "That every column has a default value",
          "That every row can be uniquely identified by that key's value",
          "That the table can never be modified",
          "That the table has at most 10 rows",
        ],
        correctIndex: 1,
        explanation:
          "A primary key uniquely identifies each row, which is what lets other tables reference a specific row reliably.",
      },
      {
        id: "q2",
        prompt: "What does the `author_id` column inside the `books` table represent?",
        choices: [
          "The author's full name, duplicated for convenience",
          "A foreign key: the id of the matching row in the authors table",
          "A random number with no meaning",
          "The number of books that author has written",
        ],
        correctIndex: 1,
        explanation:
          "author_id is a foreign key pointing back to authors.id, connecting each book to exactly one author row.",
      },
      {
        id: "q3",
        prompt: "How would you describe the relationship between authors and books in this schema?",
        choices: [
          "One-to-one: each author writes exactly one book",
          "Many-to-many: any book can have many authors and vice versa",
          "One-to-many: one author can be linked to many books, but each book links to exactly one author",
          "There is no relationship between the two tables",
        ],
        correctIndex: 2,
        explanation:
          "Each book stores a single author_id, while a given author_id can appear on many book rows — a one-to-many relationship.",
      },
    ],
    takeaway:
      "Tables store facts once, and foreign keys connect them by pointing at another table's primary key, instead of copying data everywhere.",
    summary:
      "Relational databases organize data into tables of rows and columns, each table anchored by a unique primary key. Foreign keys, like books.author_id, model relationships between tables by referencing another table's primary key, forming patterns like one-to-many.",
    nextLessonSlug: "sql-select-filtering",
  },
  {
    id: "sql-select-filtering",
    slug: "sql-select-filtering",
    title: "Filtering and Sorting Rows: WHERE and ORDER BY",
    description:
      "Narrowing down a table to just the rows you want with WHERE, and controlling their order with ORDER BY.",
    trackSlug: "git-api-sql",
    courseSlug: "git-apis-sql",
    order: 5,
    difficulty: "beginner",
    estimatedMinutes: 24,
    prerequisites: ["sql-tables-relationships"],
    objectives: [
      "Write SELECT queries that choose specific columns",
      "Filter rows using WHERE with comparison operators",
      "Sort query results with ORDER BY, ascending or descending",
    ],
    skills: ["sql-fundamentals", "sql-querying"],
    tech: [{ name: "SQLite", version: "3" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [{ label: "SQLite: SELECT statement", url: "https://sqlite.org/lang_select.html" }],
    keywords: ["sql", "select", "where", "order by", "filtering", "sorting"],
    explanation: `A \`SELECT\` statement always answers two questions: *which columns* do you want, and *which rows*? So far you've selected every row of a table. In real use, you almost always want a subset.

**WHERE narrows the rows.** \`SELECT title, price FROM books WHERE genre = 'Fiction';\` only returns rows where that condition is true. WHERE supports the comparisons you'd expect: \`=\`, \`!=\` (or \`<>\`), \`<\`, \`>\`, \`<=\`, \`>=\`, and you can combine conditions with \`AND\` / \`OR\`. Text values are wrapped in single quotes (\`'Fiction'\`); numbers are not.

**ORDER BY controls the sequence of results.** By default, SQL makes no promise about what order rows come back in — even if it looks consistent while you're testing. If order matters to your result (a leaderboard, "newest first", "cheapest first"), you must say so explicitly: \`ORDER BY price ASC\` sorts cheapest-to-most-expensive, \`ORDER BY price DESC\` sorts the opposite way. \`ASC\` (ascending) is the default if you omit the direction.

You can combine both freely: filter first, then sort what's left. \`SELECT title, price FROM books WHERE genre = 'Nonfiction' ORDER BY price DESC;\` finds every nonfiction book, then lists them most expensive first.

One subtlety worth internalizing early: when several rows tie on your ORDER BY column, SQL doesn't guarantee which one comes first between them unless you add a second sorting column as a tiebreaker (for example, \`ORDER BY published_year DESC, title ASC\`). For the exercises in this lesson, the data has been chosen so ties don't come up — but it's a habit worth having once your own sort columns aren't guaranteed unique.

WHERE and ORDER BY together are the two tools you'll reach for constantly: WHERE decides *what counts*, ORDER BY decides *what order you see it in*.`,
    example: {
      language: "sql",
      description: "Filter to Nonfiction books, then sort them most expensive first.",
      code: `SELECT title, price
FROM books
WHERE genre = 'Nonfiction'
ORDER BY price DESC;`,
      editable: false,
    },
    editableExample: {
      language: "sql",
      description:
        "Try changing the genre or flipping ASC/DESC, then press Run to see the order change.",
      code: `SELECT title, price
FROM books
WHERE genre = 'Fiction'
ORDER BY price ASC;`,
      editable: true,
    },
    guidedExercise: {
      id: "sql-select-filtering-guided",
      kind: "guided",
      language: "sql",
      prompt:
        "Complete the query so it returns the title and price of every book with a price under 15.00.",
      starterCode: `SELECT title, price
FROM books
WHERE price < ___;`,
      solutionCode: `SELECT title, price FROM books WHERE price < 15.00;`,
      seedSql: BOOKSTORE_SEED_SQL,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        { id: "t1", description: "Returns exactly the books priced under $15.00", hidden: false },
      ],
      hints: [
        "WHERE narrows down which rows come back, based on a condition you write.",
        "You need a numeric comparison on the price column using the < operator.",
        "The cutoff price mentioned in the prompt is 15.00 — books strictly less than that.",
        "Example: SELECT title, price FROM books WHERE price < 15.00;",
      ],
    },
    independentExercise: {
      id: "sql-select-filtering-independent",
      kind: "independent",
      language: "sql",
      prompt:
        "Write a query that returns the title and published_year of every Fiction book, sorted from newest to oldest (order matters for this check).",
      starterCode: `-- Select title and published_year for Fiction books,
-- sorted newest first`,
      solutionCode: `SELECT title, published_year FROM books WHERE genre = 'Fiction' ORDER BY published_year DESC;`,
      seedSql: BOOKSTORE_SEED_SQL,
      sqlOrderSensitive: true,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description: "Returns Fiction books ordered from newest to oldest (row order matters)",
          hidden: false,
        },
      ],
      hints: [
        "You'll need both a WHERE clause (to pick Fiction only) and an ORDER BY clause (to control the sequence).",
        "Filter on the genre column, and sort on the published_year column.",
        "'Newest to oldest' means the largest year first, which is the DESC direction.",
        "Example shape: SELECT title, published_year FROM books WHERE genre = 'Fiction' ORDER BY published_year DESC;",
      ],
    },
    commonMistakes: [
      "Forgetting single quotes around text values in WHERE, e.g. writing WHERE genre = Fiction instead of WHERE genre = 'Fiction'.",
      "Assuming row order is guaranteed without an explicit ORDER BY — SQL makes no such promise on its own.",
      "Mixing up ASC and DESC, ending up with the smallest or oldest value first when the largest or newest was wanted.",
      "Using = to compare against a range of values instead of operators like < or BETWEEN.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does the WHERE clause do in a SELECT statement?",
        choices: [
          "Chooses which columns appear in the result",
          "Filters which rows are included in the result, based on a condition",
          "Sorts the result rows",
          "Creates a new table",
        ],
        correctIndex: 1,
        explanation: "WHERE evaluates a condition per row and only keeps rows where it's true.",
      },
      {
        id: "q2",
        prompt: "Without an ORDER BY clause, what can you assume about the order of returned rows?",
        choices: [
          "They will always come back in the order they were inserted",
          "They will always come back sorted alphabetically",
          "No particular order is guaranteed",
          "They will always come back reverse-sorted by id",
        ],
        correctIndex: 2,
        explanation: "SQL does not guarantee row order unless you specify ORDER BY explicitly.",
      },
      {
        id: "q3",
        prompt: "Which clause sorts books from most expensive to least expensive?",
        choices: [
          "ORDER BY price ASC",
          "ORDER BY price DESC",
          "WHERE price DESC",
          "GROUP BY price DESC",
        ],
        correctIndex: 1,
        explanation: "DESC sorts in descending order, so the highest price comes first.",
      },
      {
        id: "q4",
        prompt: "In `WHERE price < 15.00`, what kind of rows are kept?",
        choices: [
          "Rows where price is exactly 15.00",
          "Rows where price is strictly less than 15.00",
          "Rows where price is greater than or equal to 15.00",
          "All rows, regardless of price",
        ],
        correctIndex: 1,
        explanation: "The < operator keeps only rows whose price is strictly below 15.00.",
      },
    ],
    takeaway:
      "WHERE decides which rows make the cut, and ORDER BY decides the sequence you see them in — neither is assumed unless you write it.",
    summary:
      "SELECT queries narrow rows with WHERE using comparison operators, and control result ordering with ORDER BY (ASC or DESC). Row order is never guaranteed without an explicit ORDER BY, which matters whenever a query's meaning depends on sequence.",
    nextLessonSlug: "sql-insert-update-delete",
  },
  {
    id: "sql-insert-update-delete",
    slug: "sql-insert-update-delete",
    title: "Changing Data: INSERT, UPDATE, and DELETE",
    description: "Adding new rows, modifying existing ones, and removing rows you no longer need.",
    trackSlug: "git-api-sql",
    courseSlug: "git-apis-sql",
    order: 6,
    difficulty: "beginner",
    estimatedMinutes: 26,
    prerequisites: ["sql-select-filtering"],
    objectives: [
      "Add new rows to a table using INSERT",
      "Modify existing rows using UPDATE, scoped with WHERE",
      "Remove rows using DELETE, scoped with WHERE",
    ],
    skills: ["sql-fundamentals", "sql-data-modification"],
    tech: [{ name: "SQLite", version: "3" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      { label: "SQLite: INSERT statement", url: "https://sqlite.org/lang_insert.html" },
      { label: "SQLite: UPDATE statement", url: "https://sqlite.org/lang_update.html" },
    ],
    keywords: ["sql", "insert", "update", "delete", "data modification", "where clause"],
    explanation: `SELECT only reads data. Three other statements actually change what's stored:

**INSERT adds a new row.** You name the table, list which columns you're providing, and supply matching values:

\`\`\`
INSERT INTO books (id, title, author_id, genre, price, published_year, in_stock)
VALUES (11, 'The Left Hand of Darkness', 3, 'Fiction', 17.25, 1969, 6);
\`\`\`

Column order in the parentheses must match the value order — the database matches them positionally, not by column name.

**UPDATE modifies existing rows**, and it is almost always paired with WHERE:

\`\`\`
UPDATE books SET price = 18.99 WHERE id = 8;
\`\`\`

This is the single most important habit in this lesson: **an UPDATE (or DELETE) without a WHERE clause applies to every row in the table.** \`UPDATE books SET price = 0;\` with no WHERE would zero out every book's price, not just one. Always ask "which rows am I targeting?" before running either statement, and double check your WHERE condition actually matches only the rows you intend.

**DELETE removes rows**, following the same pattern:

\`\`\`
DELETE FROM orders WHERE id = 5;
\`\`\`

Again, DELETE without a WHERE clause empties the entire table.

Because INSERT, UPDATE, and DELETE don't return rows the way SELECT does, the exercises in this lesson ask you to follow up each change with a SELECT that shows the result — proving to yourself (and to anyone checking your work) exactly what changed. That combination — modify, then verify with a SELECT — is a habit that generalizes well beyond this lesson: after any change to data, it's worth confirming the database now reflects what you expect.`,
    example: {
      language: "sql",
      description:
        "A new shipment arrives — increase Compiling the Future's stock count by 10, then confirm the new value.",
      code: `UPDATE books
SET in_stock = in_stock + 10
WHERE id = 2;

SELECT title, in_stock FROM books WHERE id = 2;`,
      editable: false,
    },
    editableExample: {
      language: "sql",
      description:
        "Try changing the id or the quantity added, then press Run to see the updated stock count.",
      code: `UPDATE books
SET in_stock = in_stock + 5
WHERE id = 6;

SELECT title, in_stock FROM books WHERE id = 6;`,
      editable: true,
    },
    guidedExercise: {
      id: "sql-insert-update-delete-guided",
      kind: "guided",
      language: "sql",
      prompt:
        "Insert a new book: id 11, title 'The Left Hand of Darkness', author_id 3, genre 'Fiction', price 17.25, published_year 1969, in_stock 6. Then write a SELECT that returns its title and price to confirm it was added.",
      starterCode: `INSERT INTO books (id, title, author_id, genre, price, published_year, in_stock)
VALUES (11, 'The Left Hand of Darkness', 3, 'Fiction', 17.25, 1969, 6);

-- Now SELECT the title and price of book id 11`,
      solutionCode: `INSERT INTO books (id, title, author_id, genre, price, published_year, in_stock)
VALUES (11, 'The Left Hand of Darkness', 3, 'Fiction', 17.25, 1969, 6);

SELECT title, price FROM books WHERE id = 11;`,
      seedSql: BOOKSTORE_SEED_SQL,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description: "Confirms the new book was inserted with the correct title and price",
          hidden: false,
        },
      ],
      hints: [
        "INSERT adds a brand-new row; the columns you list must line up positionally with the values you provide.",
        "After the INSERT statement, add a second statement that reads the new row back out.",
        "Your SELECT should filter WHERE id = 11 and choose the title and price columns.",
        "Example ending: SELECT title, price FROM books WHERE id = 11;",
      ],
    },
    independentExercise: {
      id: "sql-insert-update-delete-independent",
      kind: "independent",
      language: "sql",
      prompt:
        "Sam accidentally ordered '1Q84' three times (order id 5). Delete that order, then write a SELECT returning the id and customer_name of every remaining order, ordered by id ascending, to confirm it's gone (order matters for this check).",
      starterCode: `-- Step 1: delete the order with id 5
-- Step 2: SELECT id and customer_name from orders, ordered by id ascending`,
      solutionCode: `DELETE FROM orders WHERE id = 5;

SELECT id, customer_name FROM orders ORDER BY id ASC;`,
      seedSql: BOOKSTORE_SEED_SQL,
      sqlOrderSensitive: true,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description:
            "Order id 5 is deleted and the remaining orders are listed in ascending id order",
          hidden: false,
        },
      ],
      hints: [
        "DELETE removes rows matching a WHERE condition — without WHERE, it would remove everything in the table.",
        "Delete the one order you were asked to remove, then follow it with a SELECT that shows what's left.",
        "Your DELETE should target WHERE id = 5, and your SELECT should sort ORDER BY id ASC.",
        "Example shape: DELETE FROM orders WHERE id = 5; then SELECT id, customer_name FROM orders ORDER BY id ASC;",
      ],
    },
    commonMistakes: [
      "Running UPDATE or DELETE without a WHERE clause, accidentally applying the change to every row in the table.",
      "Listing INSERT columns and values in mismatched order — values are matched to columns positionally, not by name.",
      "Forgetting to quote text values in an INSERT, such as writing a genre without surrounding single quotes.",
      "Not verifying the result — running a data-changing statement and assuming it worked without a follow-up SELECT.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What happens if you run `UPDATE books SET price = 0;` with no WHERE clause?",
        choices: [
          "Nothing changes until you add a WHERE clause",
          "Only the first row's price becomes 0",
          "Every row in the books table has its price set to 0",
          "SQLite refuses to run the statement",
        ],
        correctIndex: 2,
        explanation:
          "Without a WHERE clause, UPDATE (like DELETE) applies to every row in the table.",
      },
      {
        id: "q2",
        prompt: "In an INSERT statement, how are listed values matched to listed columns?",
        choices: [
          "By matching names automatically, regardless of order",
          "By position — the first value fills the first listed column, and so on",
          "Randomly",
          "Only the first value is used; the rest are ignored",
        ],
        correctIndex: 1,
        explanation:
          "INSERT matches values to columns positionally, so the order in both lists must correspond.",
      },
      {
        id: "q3",
        prompt: "Which statement permanently removes rows from a table?",
        choices: ["SELECT", "UPDATE", "DELETE", "ORDER BY"],
        correctIndex: 2,
        explanation:
          "DELETE removes rows matching its WHERE condition (or all rows, if WHERE is omitted).",
      },
    ],
    takeaway:
      "INSERT adds rows, UPDATE and DELETE change or remove existing ones — and both of the latter should almost always be scoped with a WHERE clause you've double-checked.",
    summary:
      "INSERT adds new rows by matching values to columns positionally. UPDATE and DELETE modify or remove existing rows, and without a WHERE clause they act on the entire table, making that clause the most important habit to get right.",
    nextLessonSlug: "sql-grouping-joins",
  },
  {
    id: "sql-grouping-joins",
    slug: "sql-grouping-joins",
    title: "Aggregating and Combining Data: GROUP BY and JOIN",
    description:
      "Summarizing rows into totals and counts with GROUP BY, and pulling related data together across tables with JOIN.",
    trackSlug: "git-api-sql",
    courseSlug: "git-apis-sql",
    order: 7,
    difficulty: "beginner",
    estimatedMinutes: 28,
    prerequisites: ["sql-insert-update-delete"],
    objectives: [
      "Combine rows from two related tables using JOIN",
      "Summarize groups of rows using GROUP BY with aggregate functions like COUNT and SUM",
      "Use LEFT JOIN to include rows that have no match in the related table",
    ],
    skills: ["sql-fundamentals", "sql-aggregation", "sql-joins"],
    tech: [{ name: "SQLite", version: "3" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      { label: "SQLite: JOIN and SELECT clauses", url: "https://sqlite.org/lang_select.html" },
    ],
    keywords: ["sql", "join", "left join", "group by", "aggregate", "count", "sum"],
    explanation: `Two ideas finish off the core SQL toolkit: pulling related tables together, and summarizing many rows into fewer, more meaningful ones.

**JOIN combines rows from two tables using a matching key.** You already know \`books.author_id\` points at \`authors.id\` — a JOIN uses exactly that relationship to stitch a book together with its author's details in one result row:

\`\`\`
SELECT books.title, authors.name AS author, authors.country
FROM books
JOIN authors ON books.author_id = authors.id;
\`\`\`

This is called an **inner join**: it only returns books that *do* have a matching author (which, given the foreign key, is every book). Picture two overlapping circles — one for \`books\`, one for \`authors\` — and a plain JOIN keeps only the overlap.

**LEFT JOIN keeps every row from the first table, even without a match.** If you wanted every book listed alongside its total quantity ordered, an ordinary JOIN would silently drop any book that has never been ordered, because there's no matching \`orders\` row to pair it with. \`LEFT JOIN\` fixes that: it keeps every \`books\` row regardless, filling in \`NULL\` for any \`orders\` columns when there's no match.

**GROUP BY collapses many rows into one row per group**, almost always paired with an **aggregate function** that summarizes each group:

- \`COUNT(...)\` — how many rows are in the group
- \`SUM(...)\` — the total of a numeric column across the group
- \`AVG(...)\`, \`MIN(...)\`, \`MAX(...)\` — average, smallest, and largest values

For example, counting how many books each author has written groups the joined rows by author:

\`\`\`
SELECT authors.name AS author_name, COUNT(books.id) AS book_count
FROM authors
JOIN books ON books.author_id = authors.id
GROUP BY authors.id;
\`\`\`

Combining LEFT JOIN with GROUP BY and SUM is how you answer "total quantity ordered per book, including books with zero orders" — the LEFT JOIN keeps books with no orders in the result at all, and \`COALESCE(SUM(orders.quantity), 0)\` turns their otherwise-NULL total into a plain \`0\`.

JOIN and GROUP BY are where SQL stops feeling like a filter and starts feeling like a reporting tool — the same two ideas power almost every dashboard, summary, and analytics query you'll ever write.`,
    visual: {
      kind: "diagram",
      title: "Inner join vs. left join, as overlapping sets",
      description:
        "Picture two circles: 'books' and 'authors', overlapping wherever books.author_id matches authors.id. A plain JOIN keeps only the overlapping region. A LEFT JOIN keeps the entire 'books' circle, filling in NULL for author columns on any book that (hypothetically) had no matching author.",
    },
    example: {
      language: "sql",
      description: "Join books to authors to find every book written by an author from Japan.",
      code: `SELECT books.title, authors.name AS author, authors.country
FROM books
JOIN authors ON books.author_id = authors.id
WHERE authors.country = 'Japan';`,
      editable: false,
    },
    editableExample: {
      language: "sql",
      description:
        "Change the country to another value, like 'Nigeria', then press Run to see a different author's books.",
      code: `SELECT books.title, authors.name AS author, authors.country
FROM books
JOIN authors ON books.author_id = authors.id
WHERE authors.country = 'Nigeria';`,
      editable: true,
    },
    guidedExercise: {
      id: "sql-grouping-joins-guided",
      kind: "guided",
      language: "sql",
      prompt:
        "Complete the query to return each author's name along with how many books they have written, by joining authors to books and grouping by author.",
      starterCode: `SELECT authors.name AS author_name, COUNT(___) AS book_count
FROM authors
JOIN books ON books.author_id = authors.id
GROUP BY ___;`,
      solutionCode: `SELECT authors.name AS author_name, COUNT(books.id) AS book_count
FROM authors
JOIN books ON books.author_id = authors.id
GROUP BY authors.id;`,
      seedSql: BOOKSTORE_SEED_SQL,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description: "Returns each author's name with their correct book count",
          hidden: false,
        },
      ],
      hints: [
        "COUNT(...) counts how many rows fall into each group after GROUP BY collapses them.",
        "You want to count books, and group the joined rows by author, so each author gets exactly one summary row.",
        "Count books.id (one per book row), and GROUP BY authors.id (one group per author).",
        "Example: SELECT authors.name AS author_name, COUNT(books.id) AS book_count FROM authors JOIN books ON books.author_id = authors.id GROUP BY authors.id;",
      ],
    },
    independentExercise: {
      id: "sql-grouping-joins-independent",
      kind: "independent",
      language: "sql",
      prompt:
        "Write a query that returns every book's title along with the total quantity ordered (0 for books with no orders), using a LEFT JOIN and GROUP BY, sorted by total quantity descending and then by book id ascending as a tiebreaker (order matters for this check).",
      starterCode: `-- Select books.title and the total ordered quantity (0 if none),
-- using LEFT JOIN so books with no orders are still included`,
      solutionCode: `SELECT books.title AS title, COALESCE(SUM(orders.quantity), 0) AS total_ordered
FROM books
LEFT JOIN orders ON orders.book_id = books.id
GROUP BY books.id
ORDER BY total_ordered DESC, books.id ASC;`,
      seedSql: BOOKSTORE_SEED_SQL,
      sqlOrderSensitive: true,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description:
            "Returns every book with its total ordered quantity, including zeros, correctly sorted",
          hidden: false,
        },
      ],
      hints: [
        "A plain JOIN would drop books that have never been ordered — you need LEFT JOIN to keep them in the result.",
        "SUM(orders.quantity) totals quantity per group, but will be NULL for books with no matching orders; wrap it so it shows 0 instead.",
        "COALESCE(SUM(orders.quantity), 0) converts a NULL total into 0, and GROUP BY books.id creates one row per book.",
        "Example: ... LEFT JOIN orders ON orders.book_id = books.id GROUP BY books.id ORDER BY total_ordered DESC, books.id ASC;",
      ],
    },
    commonMistakes: [
      "Using a plain JOIN when rows without a match need to be included — silently dropping unmatched rows instead of using LEFT JOIN.",
      "Selecting a column that isn't part of an aggregate or the GROUP BY key, expecting SQL to somehow guess which row's value to show.",
      "Forgetting COALESCE (or similar) around SUM/AVG when some groups may have no matching rows at all, leaving NULL where 0 was expected.",
      "Not adding a tiebreaker column to ORDER BY when several groups share the same aggregate value, leaving the order among ties unpredictable.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does JOIN do?",
        choices: [
          "Deletes rows from one of the two tables",
          "Combines rows from two tables based on a matching key",
          "Creates a brand-new table permanently",
          "Sorts a single table's rows",
        ],
        correctIndex: 1,
        explanation:
          "JOIN pairs rows from two tables together wherever a specified key matches, like books.author_id to authors.id.",
      },
      {
        id: "q2",
        prompt: "Why would you use LEFT JOIN instead of a plain JOIN?",
        choices: [
          "To make the query run faster in every case",
          "To keep every row from the first table even when there's no match in the second table",
          "To reverse the order of the two tables",
          "To automatically remove duplicate rows",
        ],
        correctIndex: 1,
        explanation:
          "LEFT JOIN preserves every row of the left-hand table, filling unmatched columns with NULL instead of dropping the row.",
      },
      {
        id: "q3",
        prompt: "What does GROUP BY do when paired with COUNT(...)?",
        choices: [
          "It filters rows before any grouping happens",
          "It collapses rows sharing the same grouping value into one row, with COUNT reporting how many rows were in each group",
          "It sorts rows without changing how many there are",
          "It deletes duplicate rows from the table permanently",
        ],
        correctIndex: 1,
        explanation:
          "GROUP BY collapses matching rows into one summary row per group, and aggregate functions like COUNT summarize each group.",
      },
      {
        id: "q4",
        prompt: "Why might COALESCE(SUM(orders.quantity), 0) be necessary after a LEFT JOIN?",
        choices: [
          "SUM always returns a string that needs converting",
          "A book with no matching orders would otherwise show NULL instead of 0 for its total",
          "COALESCE is required syntax for every SUM, regardless of context",
          "It sorts the results in ascending order",
        ],
        correctIndex: 1,
        explanation:
          "Summing zero matched rows produces NULL, not 0; COALESCE substitutes a fallback value when the aggregate is NULL.",
      },
    ],
    takeaway:
      "JOIN stitches related tables together through their keys, and GROUP BY with an aggregate function turns many rows into one meaningful summary row per group.",
    summary:
      "JOIN combines rows across tables using a matching key, while LEFT JOIN preserves unmatched rows from the first table instead of dropping them. GROUP BY collapses rows into groups, summarized with aggregate functions like COUNT and SUM, forming the basis of most reporting-style queries.",
    nextLessonSlug: "ai-what-is-ai",
  },
];
