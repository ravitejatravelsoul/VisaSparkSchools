import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Git, APIs & SQL interview-prep questions -- 50 common technical interview
 * questions covering the course's own topics (Git basics and branching/
 * merging, HTTP/JSON basics, REST API basics, and foundational SQL:
 * tables/relationships, SELECT/filtering, INSERT/UPDATE/DELETE,
 * grouping/joins).
 */
export const gitApisSqlInterviewQuestions: InterviewQuestionInput[] = [
  // --- Git Basics (10) ---
  {
    id: "gitsql-interview-git-basics-01",
    courseSlug: "git-apis-sql",
    question: "What is the difference between Git and GitHub?",
    answer:
      "Git is the version-control software itself, running locally on your machine, tracking changes to files over time -- GitHub is a hosted service for storing Git repositories remotely and adding collaboration features (pull requests, issues, code review) on top of Git.",
    category: "Git Basics",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-basics-02",
    courseSlug: "git-apis-sql",
    question: "What is the difference between `git add` and `git commit`?",
    answer:
      "`git add` stages changes -- marking specific file changes to be included in the next commit; `git commit` actually records those staged changes as a new permanent snapshot in the repository's history, with a message describing the change.",
    category: "Git Basics",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-basics-03",
    courseSlug: "git-apis-sql",
    question:
      "What does the staging area (the 'index') let you do that committing every changed file directly wouldn't?",
    answer:
      "It lets you selectively choose exactly which changes go into the next commit, even if you've modified several unrelated files -- enabling focused, logically-grouped commits instead of one giant commit mixing unrelated changes together.",
    category: "Git Basics",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-basics-04",
    courseSlug: "git-apis-sql",
    question: "What is a commit, conceptually, in Git's data model?",
    answer:
      "A commit is a snapshot of the entire repository's file tree at a point in time, plus metadata (author, timestamp, message) and a reference to its parent commit(s) -- the chain of parent references is what forms the project's history.",
    category: "Git Basics",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-basics-05",
    courseSlug: "git-apis-sql",
    question:
      "What does `git status` tell you, and why is it a good habit to check before committing?",
    answer:
      "It shows which files are staged, unstaged, or untracked in the current working directory -- checking it before committing prevents accidentally committing unintended files (like a debug log) or missing files you meant to include.",
    category: "Git Basics",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-basics-06",
    courseSlug: "git-apis-sql",
    question: "What is a `.gitignore` file for?",
    answer:
      "It lists file/directory patterns that Git should never track or stage, even if they exist in the working directory -- used for things like build output, dependency folders, and local secret files that shouldn't be part of the repository's history.",
    category: "Git Basics",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-basics-07",
    courseSlug: "git-apis-sql",
    question: "What is the difference between `git pull` and `git fetch`?",
    answer:
      "`git fetch` downloads the latest changes from a remote without merging them into your current branch, letting you inspect them first; `git pull` is effectively `fetch` followed immediately by a `merge` (or `rebase`, depending on configuration) into your current branch.",
    category: "Git Basics",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-basics-08",
    courseSlug: "git-apis-sql",
    question:
      "Why is writing a clear, descriptive commit message considered important, beyond just documentation?",
    answer:
      "Commit messages are what makes `git log`, `git blame`, and history searches actually useful later -- a vague message like 'fix stuff' gives future readers (including your future self) no way to understand why a change was made without re-reading the entire diff.",
    category: "Git Basics",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-basics-09",
    courseSlug: "git-apis-sql",
    question:
      "What does `git diff` show you, and how does its output differ before versus after staging a change?",
    answer:
      "`git diff` shows the difference between your working directory and what's staged (or the last commit); `git diff --staged` (or `--cached`) shows the difference between what's staged and the last commit -- distinguishing 'what have I changed' from 'what am I about to commit.'",
    category: "Git Basics",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-basics-10",
    courseSlug: "git-apis-sql",
    question:
      "What is a common beginner mistake when first learning Git that leads to accidentally committing secrets or credentials?",
    answer:
      "Committing a `.env` file or a credentials file before adding it to `.gitignore` -- once committed, that secret exists in the repository's history permanently (even if later deleted in a new commit), typically requiring history rewriting or key rotation to truly remediate.",
    category: "Git Basics",
    difficulty: "intermediate",
    commonMistake:
      "Adding a real API key or password to a config file and committing it before ever adding that file to .gitignore.",
    lastReviewed: "2026-08-07",
  },

  // --- Branching, Merging & Collaboration (10) ---
  {
    id: "gitsql-interview-git-branch-01",
    courseSlug: "git-apis-sql",
    question: "What is a Git branch, conceptually?",
    answer:
      "A lightweight, movable pointer to a specific commit -- creating a branch doesn't copy any files, it just creates a new named reference that can advance independently as you make new commits on it, without affecting other branches.",
    category: "Branching, Merging & Collaboration",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-branch-02",
    courseSlug: "git-apis-sql",
    question:
      "Why do teams typically develop features on separate branches instead of committing directly to the main branch?",
    answer:
      "It isolates in-progress, potentially-broken work from the stable main branch, allows code review before merging, and lets multiple people work on different features simultaneously without their incomplete changes interfering with each other.",
    category: "Branching, Merging & Collaboration",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-branch-03",
    courseSlug: "git-apis-sql",
    question: "What is a merge conflict, and why does it happen?",
    answer:
      "It occurs when Git can't automatically combine two branches' changes because they modified the same lines of the same file differently -- Git pauses the merge and requires a human to manually decide which changes (or what combination) should be kept.",
    category: "Branching, Merging & Collaboration",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-branch-04",
    courseSlug: "git-apis-sql",
    question:
      "What is the difference between a 'fast-forward' merge and a merge that creates a new merge commit?",
    answer:
      "A fast-forward merge happens when the target branch has no new commits since the source branch diverged -- Git simply moves the pointer forward, no new commit needed. If both branches have diverged with independent commits, Git creates a new merge commit with two parents to combine the histories.",
    category: "Branching, Merging & Collaboration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-branch-05",
    courseSlug: "git-apis-sql",
    question:
      "What is a pull request (or merge request), and what purpose does it serve beyond just merging code?",
    answer:
      "A pull request proposes merging one branch into another and provides a dedicated place for code review, automated CI checks, and discussion before the merge actually happens -- it's a collaboration/quality gate, not just a mechanical merge operation.",
    category: "Branching, Merging & Collaboration",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-branch-06",
    courseSlug: "git-apis-sql",
    question:
      "What is the difference between merging and rebasing a feature branch onto the latest main?",
    answer:
      "Merging creates a new commit combining both histories, preserving exactly how they actually diverged; rebasing rewrites the feature branch's commits to appear as if they were made starting from the latest main, producing a linear history but changing the feature branch's commit hashes in the process.",
    category: "Branching, Merging & Collaboration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-branch-07",
    courseSlug: "git-apis-sql",
    question:
      "Why is rewriting (rebasing/force-pushing) a branch that others have already pulled generally discouraged?",
    answer:
      "Rewriting history changes commit hashes on that branch, so anyone who already pulled the old version now has a diverged, conflicting history -- their next pull will encounter unexpected conflicts or duplicate commits unless they specifically know to reset to the rewritten branch.",
    category: "Branching, Merging & Collaboration",
    difficulty: "advanced",
    commonMistake:
      "Force-pushing a rewritten shared branch that teammates have already based their own work on, breaking their local history.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-branch-08",
    courseSlug: "git-apis-sql",
    question: "What is the difference between `git merge` and `git cherry-pick`?",
    answer:
      "`git merge` combines an entire branch's history (all its commits) into the current branch; `git cherry-pick` applies just one specific commit from elsewhere onto the current branch, without bringing along the rest of that commit's branch history.",
    category: "Branching, Merging & Collaboration",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-branch-09",
    courseSlug: "git-apis-sql",
    question: "How would you resolve a merge conflict in a text file, at a high level?",
    answer:
      "Open the conflicted file, look for Git's conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) delimiting the two competing versions, manually edit the file to keep the correct combined content, remove the markers, then stage and commit the resolved file.",
    category: "Branching, Merging & Collaboration",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-git-branch-10",
    courseSlug: "git-apis-sql",
    question:
      "Why might a team enforce a rule like 'no direct pushes to main, only merges via reviewed pull requests'?",
    answer:
      "It guarantees every change to the main branch has gone through review and passed CI checks before landing, reducing the chance of an untested or unreviewed change breaking the shared codebase that everyone builds on.",
    category: "Branching, Merging & Collaboration",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- HTTP, JSON & REST APIs (10) ---
  {
    id: "gitsql-interview-api-01",
    courseSlug: "git-apis-sql",
    question: "What is JSON, and why is it so commonly used for APIs?",
    answer:
      "JavaScript Object Notation -- a lightweight, human-readable text format for representing structured data (objects, arrays, strings, numbers, booleans, null). It's popular for APIs because it maps naturally onto common programming-language data structures and is easy for both humans and machines to parse.",
    category: "HTTP, JSON & REST APIs",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-api-02",
    courseSlug: "git-apis-sql",
    question: "What does 'REST' stand for, and what is a core idea behind a RESTful API design?",
    answer:
      "Representational State Transfer -- a core idea is modeling the API around resources (nouns, like `/users` or `/orders`) accessed via standard HTTP methods (GET, POST, PUT, DELETE) that indicate the action, rather than encoding the action into the URL itself (like `/getUser`).",
    category: "HTTP, JSON & REST APIs",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-api-03",
    courseSlug: "git-apis-sql",
    question:
      "What is the difference between the HTTP methods PUT and PATCH, both used for updating a resource?",
    answer:
      "PUT conventionally means replacing the entire resource with the provided representation; PATCH means applying a partial update, modifying only the specific fields included in the request while leaving the rest of the resource unchanged.",
    category: "HTTP, JSON & REST APIs",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-api-04",
    courseSlug: "git-apis-sql",
    question:
      "What HTTP status code should a REST API return after successfully creating a new resource via POST, and what's a common convention alongside it?",
    answer:
      "201 Created -- commonly paired with a `Location` header pointing at the newly-created resource's URL, and a response body containing the created resource's data (including its newly-assigned id).",
    category: "HTTP, JSON & REST APIs",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-api-05",
    courseSlug: "git-apis-sql",
    question:
      "What is the `Content-Type` header for, and what value would a JSON API request/response typically use?",
    answer:
      "It tells the receiver how to interpret the body's format -- a JSON request or response body typically sets `Content-Type: application/json`, letting the receiving side know to parse the body as JSON rather than plain text or form data.",
    category: "HTTP, JSON & REST APIs",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-api-06",
    courseSlug: "git-apis-sql",
    question:
      "Why should a well-designed API validate and sanitize incoming request data server-side, even if the client already validates it?",
    answer:
      "Client-side validation is a UX convenience, not a security boundary -- any client-side check can be bypassed by sending a request directly (via a script, curl, or a modified client), so the server must independently enforce every validation rule that actually matters.",
    category: "HTTP, JSON & REST APIs",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-api-07",
    courseSlug: "git-apis-sql",
    question:
      "What is API pagination, and why does a real API need it for endpoints that could return many results?",
    answer:
      "Pagination splits a large result set into smaller pages (e.g. via `?page=2&limit=20` or cursor-based tokens), returned across multiple requests rather than one huge response -- without it, an endpoint returning millions of rows could produce enormous, slow responses that overwhelm both server and client.",
    category: "HTTP, JSON & REST APIs",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-api-08",
    courseSlug: "git-apis-sql",
    question:
      "What is the difference between authentication and authorization in the context of an API request?",
    answer:
      "Authentication verifies WHO is making the request (proving identity, e.g. via a valid token/credentials); authorization determines WHAT that authenticated identity is actually allowed to do (e.g. can this user delete this specific resource) -- a request can be authenticated but still unauthorized for a given action.",
    category: "HTTP, JSON & REST APIs",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-api-09",
    courseSlug: "git-apis-sql",
    question:
      "What does it mean for an API endpoint to be idempotent, and which common HTTP methods are conventionally expected to be idempotent?",
    answer:
      "An idempotent operation produces the same end result no matter how many times it's repeated with the same input -- GET, PUT, and DELETE are conventionally expected to be idempotent (calling DELETE on an already-deleted resource still leaves it deleted), while POST typically is not (repeating it can create duplicate resources).",
    category: "HTTP, JSON & REST APIs",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-api-10",
    courseSlug: "git-apis-sql",
    question:
      "Why is returning a generic, vague error message (rather than a specific one) sometimes a deliberate API design choice, not an oversight?",
    answer:
      "For security-sensitive endpoints (like login), a generic 'invalid credentials' error prevents an attacker from distinguishing 'wrong password' from 'account doesn't exist,' which would otherwise let them enumerate valid usernames/emails by observing which error message comes back.",
    category: "HTTP, JSON & REST APIs",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Foundational SQL (10) ---
  {
    id: "gitsql-interview-sql-01",
    courseSlug: "git-apis-sql",
    question: "What is a primary key, and why does nearly every table need one?",
    answer:
      "A column (or combination of columns) that uniquely identifies each row in a table -- without one, there's no reliable way to reference, update, or delete a single specific row, especially once duplicate-looking data exists.",
    category: "Foundational SQL",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-sql-02",
    courseSlug: "git-apis-sql",
    question: "What does a `WHERE` clause do in a `SELECT` query?",
    answer:
      "It filters which rows are included in the result, based on a condition -- `SELECT * FROM users WHERE age >= 18` returns only rows where the `age` column's value is 18 or greater.",
    category: "Foundational SQL",
    difficulty: "beginner",
    codeExample: "SELECT * FROM users WHERE age >= 18;",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-sql-03",
    courseSlug: "git-apis-sql",
    question: "What is the difference between `INSERT`, `UPDATE`, and `DELETE`?",
    answer:
      "`INSERT` adds new rows to a table; `UPDATE` modifies the values of existing rows matching a condition; `DELETE` removes existing rows matching a condition -- all three, unlike `SELECT`, actually change the data stored in the table.",
    category: "Foundational SQL",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-sql-04",
    courseSlug: "git-apis-sql",
    question: "Why is running `UPDATE` or `DELETE` without a `WHERE` clause extremely dangerous?",
    answer:
      "Without a `WHERE` clause, the statement applies to every single row in the table -- a missing `WHERE` on a `DELETE` deletes the entire table's contents, and on an `UPDATE` overwrites every row's values, both usually with no automatic undo.",
    category: "Foundational SQL",
    difficulty: "intermediate",
    commonMistake:
      "Running an UPDATE or DELETE statement while forgetting the WHERE clause, applying the change to every row in the table.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-sql-05",
    courseSlug: "git-apis-sql",
    question: "What is a foreign key, and what relationship does it represent?",
    answer:
      "A column in one table that references another table's primary key -- it represents a relationship between the two tables (e.g. an `orders.customer_id` column referencing `customers.id` means each order belongs to a specific customer).",
    category: "Foundational SQL",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-sql-06",
    courseSlug: "git-apis-sql",
    question: "What does a `JOIN` let you do that querying a single table alone cannot?",
    answer:
      "It combines rows from two or more tables based on a related column between them (typically a foreign key relationship), letting a single query pull together data that's spread across normalized tables -- e.g. combining `orders` with `customers` to show each order alongside its customer's name.",
    category: "Foundational SQL",
    difficulty: "intermediate",
    codeExample:
      "SELECT orders.id, customers.name\nFROM orders\nJOIN customers ON orders.customer_id = customers.id;",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-sql-07",
    courseSlug: "git-apis-sql",
    question:
      "What does `GROUP BY` do, and why is it typically paired with an aggregate function like `COUNT()` or `SUM()`?",
    answer:
      "`GROUP BY` collapses rows sharing the same value in a specified column into groups; an aggregate function then computes a single summary value per group (e.g. `SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id` counts each customer's orders) -- without an aggregate, grouping alone doesn't produce a meaningful summarized result.",
    category: "Foundational SQL",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-sql-08",
    courseSlug: "git-apis-sql",
    question:
      "Why is storing related but distinct data (like customers and orders) in separate tables instead of one giant combined table generally better design?",
    answer:
      "Separating tables avoids duplicating a customer's information across every one of their orders, which would waste storage and create an update-consistency risk (updating the customer's address in one row but not others) -- a normalized structure keeps each fact stored exactly once.",
    category: "Foundational SQL",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-sql-09",
    courseSlug: "git-apis-sql",
    question: "What does the `ORDER BY` clause do, and what happens if you omit it?",
    answer:
      "It sorts the result set by one or more specified columns (ascending by default, or `DESC` for descending); without it, SQL makes no guarantee about the order rows will be returned in -- relying on an implicit, unspecified order is a common source of flaky-seeming query results.",
    category: "Foundational SQL",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-sql-10",
    courseSlug: "git-apis-sql",
    question:
      "Why should application code build SQL queries with parameterized placeholders rather than directly concatenating user input into the query string?",
    answer:
      "Directly concatenating untrusted user input into a SQL string opens a SQL injection vulnerability, where crafted input can alter the query's actual logic (e.g. bypassing a login check or reading unintended data); parameterized queries keep the query structure fixed and treat user input strictly as data, never as executable SQL syntax.",
    category: "Foundational SQL",
    difficulty: "advanced",
    commonMistake:
      "Building a SQL query by concatenating raw user input directly into the query string instead of using parameterized placeholders, opening a SQL injection vulnerability.",
    lastReviewed: "2026-08-07",
  },

  // --- Practical API & SQL Debugging (10) ---
  {
    id: "gitsql-interview-practical-01",
    courseSlug: "git-apis-sql",
    question:
      "How does SQL represent 'no value' for a column, and why can't you compare it with `= NULL`?",
    answer:
      "SQL uses `NULL` to represent an unknown or missing value. `NULL` is never equal to anything, including another `NULL`, under standard SQL comparison semantics -- `column = NULL` always evaluates to unknown/false, so checking for it requires the special `IS NULL` (or `IS NOT NULL`) syntax instead.",
    category: "Practical API & SQL Debugging",
    difficulty: "advanced",
    commonMistake:
      "Writing WHERE column = NULL instead of WHERE column IS NULL, which silently matches zero rows.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-practical-02",
    courseSlug: "git-apis-sql",
    question:
      "What does the SQL `LIKE` operator let you do, and what do the `%` and `_` wildcards mean?",
    answer:
      "`LIKE` performs pattern-based text matching -- `%` matches any sequence of zero or more characters, and `_` matches exactly one character. `WHERE name LIKE 'A%'` matches any name starting with 'A'.",
    category: "Practical API & SQL Debugging",
    difficulty: "intermediate",
    codeExample: "SELECT * FROM users WHERE email LIKE '%@example.com';",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-practical-03",
    courseSlug: "git-apis-sql",
    question: "What does `DISTINCT` do in a `SELECT` query?",
    answer:
      "It removes duplicate rows from the result set, based on the selected columns -- `SELECT DISTINCT country FROM customers` returns each unique country value once, regardless of how many customer rows share that country.",
    category: "Practical API & SQL Debugging",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-practical-04",
    courseSlug: "git-apis-sql",
    question:
      "What does `LIMIT` do in a query, and why is it useful when exploring an unfamiliar table?",
    answer:
      "`LIMIT` caps the number of rows returned -- when exploring a table you don't know well, `SELECT * FROM orders LIMIT 10` lets you preview a sample of the data without accidentally pulling back millions of rows.",
    category: "Practical API & SQL Debugging",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-practical-05",
    courseSlug: "git-apis-sql",
    question:
      "What is a database index, at a basic conceptual level, and why does it speed up queries?",
    answer:
      "An index is a separate data structure that lets the database find matching rows for a specific column's value quickly, similar to a book's index letting you find a topic without reading every page -- without an index on a filtered column, the database may have to scan every row in the table to find matches.",
    category: "Practical API & SQL Debugging",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-practical-06",
    courseSlug: "git-apis-sql",
    question: "What does API rate limiting mean, and why might a real API impose it?",
    answer:
      "Restricting how many requests a single client can make within a given time window -- it protects the API's backend from being overwhelmed (accidentally or maliciously) and ensures fair usage across all clients sharing the same service.",
    category: "Practical API & SQL Debugging",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-practical-07",
    courseSlug: "git-apis-sql",
    question:
      "What is API versioning, and why might an API include a version in its URL (e.g. `/api/v2/users`)?",
    answer:
      "Versioning lets an API introduce breaking changes to its shape/behavior in a new version while existing clients keep using the older, still-supported version -- without it, any breaking change would immediately break every existing client with no migration window.",
    category: "Practical API & SQL Debugging",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-practical-08",
    courseSlug: "git-apis-sql",
    question:
      "How would you manually test a GET endpoint's response without writing any application code?",
    answer:
      "Use a command-line tool like `curl`, or a GUI tool like Postman/Insomnia, to send a real HTTP request directly to the endpoint's URL and inspect the raw response (status code, headers, body) -- useful for confirming an API behaves as expected before writing code that depends on it.",
    category: "Practical API & SQL Debugging",
    difficulty: "beginner",
    codeExample: "curl -i https://api.example.com/users/42",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-practical-09",
    courseSlug: "git-apis-sql",
    question:
      "Why is it useful to check an API's response status code programmatically, rather than assuming a request 'worked' just because it didn't throw a network error?",
    answer:
      "A request can complete successfully at the network level while the server still returns an error status (like 404 or 500) in the response -- code that only checks for a network-level failure, without also checking the status code, can silently treat a failed request as if it succeeded.",
    category: "Practical API & SQL Debugging",
    difficulty: "advanced",
    commonMistake:
      "Treating any HTTP response that arrives without a network error as successful, without checking whether its status code actually indicates success.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gitsql-interview-practical-10",
    courseSlug: "git-apis-sql",
    question:
      "Why is it good practice to keep database credentials and API keys out of source code, using environment variables or a secrets manager instead?",
    answer:
      "Credentials committed directly into source code end up in the repository's history (readable by anyone with repo access, and hard to fully remove later) and can't easily differ between environments (local/staging/production) -- environment variables or a dedicated secrets manager keep sensitive values out of version control entirely.",
    category: "Practical API & SQL Debugging",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
