# Curriculum Matrix

> **This document describes the lesson-based course curriculum** (`content/`, `lib/content/`) —
> full, structured courses with modules, exercises, quizzes, and projects. The platform also has a
> technology directory (83 technology guides across 16 public categories, `lib/directory/`) and 16
> public learning roadmaps — a different, complementary content system with its own documents: see
> `docs/ARCHITECTURE.md`'s "Technology directory" section and `docs/CONTENT_AUTHORING.md`. A
> technology guide is explicitly not the same thing as a course in this matrix. See
> "Master curriculum architecture (Phase 5A+)" below for the complete guide-to-course coverage
> matrix across all 83 guides, and "Complete-course definition" for what separates a course from a
> guide.

18 tracks, 21 courses, 252 lessons, 778 knowledge-check questions, 504 exercises (one guided plus
one independent per lesson), 24 guided local labs, 18 guided projects, and 5 capstones. Every lesson
includes: objectives, prerequisites, a plain-language explanation, a working example, an editable
example (where a runner applies), a guided exercise, an independent exercise, common mistakes, a
3+ question knowledge check, a takeaway, a summary, and references. See the "Totals" table below
for exact, live-computed counts.

Track order (each chains into the next via `nextLessonSlug` within a track, and
`prerequisiteCourseSlugs`/`nextCourseSlugs` across tracks):
Foundations → HTML & CSS → JavaScript → TypeScript → React → Node.js & Express → Java →
Data Structures & Algorithms → Python → Git, APIs & SQL → Database Design & PostgreSQL →
AI, LLMs, RAG & Agents → Software Testing & QA → Playwright → Selenium → Linux & Shell
Fundamentals → Test Automation Framework Engineering → Placement & Career Readiness. (Java, Data Structures & Algorithms, Python,
Database Design & PostgreSQL, and Software Testing & QA each build on an earlier JavaScript-chain
course independently — see the per-course prerequisite graph in "Master curriculum architecture"
below; none of them requires TypeScript, React, or Node.js/Express specifically, except Database
Design and PostgreSQL, which requires Git, APIs & SQL for its SQL foundation. Playwright requires
Software Testing Foundations; Selenium requires Java Programming Foundations; Linux & Shell
Fundamentals has no prerequisite; Test Automation Framework Engineering requires only Playwright,
never an impossible Selenium+Playwright combination.)

## Track 1 — Digital & Coding Foundations (3 lessons)

| Lesson                                           | Difficulty | Skills                                  |
| ------------------------------------------------ | ---------- | --------------------------------------- |
| How Computers Run Your Code                      | beginner   | computing-fundamentals                  |
| Files, Folders, Editors & Terminals              | beginner   | computing-fundamentals, developer-tools |
| How the Web Works: Browsers, Servers, DNS & HTTP | beginner   | computing-fundamentals, web-mechanics   |

## Track 2 — HTML & CSS (8 lessons)

| Lesson                                                 | Difficulty | Skills                     |
| ------------------------------------------------------ | ---------- | -------------------------- |
| HTML Document Structure & Basic Elements               | beginner   | html, html-basics          |
| Semantic HTML: Links, Images, Lists & Tables           | beginner   | html, semantic-html        |
| Forms, Validation & Accessibility Foundations          | beginner   | html, forms, accessibility |
| CSS Selectors and the Cascade                          | beginner   | css, selectors, cascade    |
| The CSS Box Model                                      | beginner   | css, box-model             |
| Flexbox Layout                                         | beginner   | css, flexbox, layout       |
| CSS Grid Layout                                        | beginner   | css, grid, layout          |
| Responsive Design: Media Queries & Mobile-First Layout | beginner   | css, responsive-design     |

**Guided project:** Personal Portfolio Page

## Track 3 — JavaScript (9 lessons)

| Lesson                                     | Difficulty | Skills                            |
| ------------------------------------------ | ---------- | --------------------------------- |
| Variables and Data Types                   | beginner   | javascript, variables             |
| Operators and Conditionals                 | beginner   | javascript, conditionals          |
| Loops                                      | beginner   | javascript, loops                 |
| Functions                                  | beginner   | javascript, functions             |
| Arrays and Objects                         | beginner   | javascript, arrays, objects       |
| DOM Selection and Updates                  | beginner   | javascript, dom                   |
| Events and Forms                           | beginner   | javascript, events, forms         |
| Modules and Async Programming Fundamentals | beginner   | javascript, modules, async        |
| Fetch and Error Handling                   | beginner   | javascript, fetch, error-handling |

**Guided project:** Interactive Quiz Application

## Track 4 — TypeScript (12 lessons)

Added in Phase 5A. Every exercise runs in a real, lazily-loaded TypeScript compiler (see
"TypeScript lab runner" in `docs/ARCHITECTURE.md`) — genuine type-checking, not a stripped-down
simulation, executing the emitted JavaScript in the same audited sandbox the JavaScript course
uses.

| Lesson                                          | Difficulty   | Skills                               |
| ----------------------------------------------- | ------------ | ------------------------------------ |
| Why Types? From JavaScript to TypeScript        | beginner     | typescript, type-annotations         |
| Inference and the Primitive Types               | beginner     | typescript, type-inference           |
| Typing Arrays and Objects                       | beginner     | typescript, arrays, object-types     |
| Interfaces and Type Aliases                     | beginner     | typescript, interfaces, type-aliases |
| Union Types and Narrowing                       | intermediate | typescript, unions, narrowing        |
| Optional Fields and Nullability                 | intermediate | typescript, optional, null-safety    |
| Typing Functions                                | intermediate | typescript, functions, callbacks     |
| Generics                                        | intermediate | typescript, generics, constraints    |
| Utility Types                                   | intermediate | typescript, utility-types            |
| Literal Types and const Assertions              | intermediate | typescript, literal-types            |
| unknown, Type Guards, and Safe Assertions       | advanced     | typescript, unknown, type-guards     |
| Modelling a Domain So Wrong States Cannot Exist | advanced     | typescript, discriminated-unions     |

**Guided project:** Typed Study Tracker

## Track 5 — React (14 lessons)

Added in Phase 5A.2. This platform has no React runner (no bundler, no JSX transform) in its
browser sandbox, and deliberately did not add one. Every lesson's browser exercises are genuine,
runnable plain JavaScript/TypeScript that model the underlying mechanism a React concept is built
on (a hand-written `createElement`, a closure-based `useState`, a dependency-array comparison, a
request-token race-condition guard) — several of these are not simplifications but literally the
real algorithm React itself uses. Three lessons additionally carry a **guided local lab** for the
real component work, which runs on the learner's own machine with a real Vite + React project —
never simulated in this browser sandbox. See "Guided local labs" below.

| Lesson                                                                        | Difficulty   | Skills                                |
| ----------------------------------------------------------------------------- | ------------ | ------------------------------------- |
| Component Thinking: Breaking a UI into Pieces                                 | beginner     | react, component-design               |
| JSX and Rendering: UI as an Expression                                        | beginner     | react, jsx                            |
| Props: Passing Data Down, One Way                                             | beginner     | react, props                          |
| Handling Events in React                                                      | beginner     | react, events                         |
| State: Giving Components Memory                                               | beginner     | react, state, usestate                |
| Conditional Rendering, Lists, and Stable Keys                                 | beginner     | react, conditional-rendering, lists   |
| Controlled Forms and Validation (Guided Local Lab)                            | intermediate | react, forms, validation              |
| Loading, Empty, Error, and Success States                                     | intermediate | react, ui-states                      |
| Effects: Synchronizing with the Outside World                                 | intermediate | react, effects, useeffect             |
| Fetching Data: Races, Stale Responses, and Cleanup (Guided Local Lab)         | advanced     | react, data-fetching, race-conditions |
| Composition and Custom Hooks                                                  | intermediate | react, composition, custom-hooks      |
| Context, State Ownership, and Project Organization                            | intermediate | react, context, state-ownership       |
| Accessibility and Testing React Components                                    | intermediate | react, accessibility, testing         |
| Performance, Error Handling, and Maintainable Architecture (Guided Local Lab) | advanced     | react, performance, error-boundaries  |

**Guided project:** Accessible Learning Dashboard

## Track 6 — Node.js & Express (14 lessons)

Added in Phase 5A.2. Same guided-local-lab pattern as React: browser exercises are genuine
JavaScript that model the underlying algorithm (an event-loop ordering predictor, a promisify
wrapper, a route-matcher, a middleware-pipeline runner, a redaction function, a graceful-shutdown
state machine) without depending on any Node or Express API; three lessons additionally carry a
guided local lab for the real server work (a genuine Express process, a real port, real npm
commands), which this platform's browser sandbox cannot and does not execute.

| Lesson                                                         | Difficulty   | Skills                             |
| -------------------------------------------------------------- | ------------ | ---------------------------------- |
| The Node.js Runtime Model: Event Loop and Non-Blocking I/O     | beginner     | nodejs, event-loop                 |
| CommonJS vs ES Modules, npm, and Dependency Management         | beginner     | nodejs, npm, modules               |
| Asynchronous Programming: Callbacks, Promises, and Async/Await | intermediate | nodejs, promises, async-await      |
| Express Application Structure and Routing (Guided Local Lab)   | intermediate | nodejs, express, routing           |
| Middleware: The Request Pipeline                               | intermediate | nodejs, express, middleware        |
| Request Parameters, Query Strings, and Bodies                  | intermediate | nodejs, express, request-data      |
| Input Validation and Rejecting Bad Requests (Guided Local Lab) | advanced     | nodejs, express, validation        |
| REST Resource Design and HTTP Status Behavior                  | intermediate | nodejs, express, rest-design       |
| Structured Errors: Operational vs. Programmer Errors           | advanced     | nodejs, express, structured-errors |
| Environment Configuration and Safe Logging                     | intermediate | nodejs, configuration, logging     |
| Configuration Validation and Startup Failures                  | intermediate | nodejs, startup-validation         |
| Security Fundamentals and Authentication Boundaries            | advanced     | nodejs, express, security          |
| Automated Testing for Routes and Services (Guided Local Lab)   | advanced     | nodejs, express, testing           |
| Graceful Shutdown and Operational Readiness                    | advanced     | nodejs, graceful-shutdown          |

**Guided project:** Validated Learning-Progress REST API

## Track 7 — Java (14 lessons)

Added in Phase 5B. This platform has no JVM and no in-browser or server-side Java execution.
Browser exercises are genuine JavaScript/TypeScript that model the underlying Java concept
(overload resolution, an equals/hashCode contract check, a Stream-style filter/map/reduce
pipeline that's a direct conceptual analogue of Java's Stream API); three lessons additionally
carry a guided local lab for real, local `javac`/`java`/JUnit work. Version assumption: Java 21
(LTS).

| Lesson                                                                  | Difficulty   | Skills                         |
| ----------------------------------------------------------------------- | ------------ | ------------------------------ |
| The JVM, the JDK, and How a Java Program Runs (Guided Local Lab)        | beginner     | java, jvm                      |
| Variables, Primitive Types, and Reference Types                         | beginner     | java, types                    |
| Operators, Expressions, and Working with Strings                        | beginner     | java, strings, operators       |
| Control Flow: Conditions, Loops, and Modern Switch                      | beginner     | java, control-flow             |
| Methods: Parameters, Return Values, and Overloading                     | beginner     | java, methods                  |
| Arrays: Fixed-Size, Typed, and Zero-Indexed                             | beginner     | java, arrays                   |
| Collections: List, Set, and Map                                         | beginner     | java, collections              |
| Classes, Objects, Constructors, and Encapsulation                       | intermediate | java, oop, encapsulation       |
| Inheritance vs. Composition, Packages, and Access Control               | intermediate | java, inheritance, composition |
| Interfaces, Abstract Classes, and Polymorphism (Guided Local Lab)       | intermediate | java, interfaces, polymorphism |
| Exceptions: Checked, Unchecked, and Handling Them Well                  | intermediate | java, exceptions               |
| Generics, Equality, hashCode, and Immutability                          | intermediate | java, generics, equality       |
| Lambdas and the Stream API                                              | intermediate | java, lambdas, streams         |
| Resource Safety, Unit Testing, and Maintainable Project Structure (GLL) | intermediate | java, testing, junit           |

**Guided project:** Course Enrollment and Progress Manager

## Track 8 — Data Structures & Algorithms (14 lessons)

Added in Phase 5B. Every exercise is genuine, browser-executable JavaScript — unlike Java or
Node.js/Express, this course needs no local runtime at all, so it has zero guided local labs.
Three lessons carry a substantially larger "lab-scale" exercise (a reusable linked-list structure
with edge-case tests, a same-tree/BST-validity check with edge-case tests, and a justified
insertion-sort-vs-merge-sort recommendation under stated constraints) to satisfy this course's lab
requirement inside the existing exercise schema.

| Lesson                                                         | Difficulty   | Skills                          |
| -------------------------------------------------------------- | ------------ | ------------------------------- |
| Problem Decomposition, Correctness, and Testing Algorithms     | beginner     | algorithms, problem-solving     |
| Time and Space Complexity: Big O, Ω, and Θ                     | beginner     | algorithms, complexity          |
| Arrays, Dynamic Arrays, and Strings as Sequential Data         | beginner     | algorithms, arrays              |
| Linked Lists: Nodes, Pointers, and When They Beat Arrays       | beginner     | algorithms, linked-lists        |
| Stacks, Queues, and Deques                                     | beginner     | algorithms, stacks, queues      |
| Hash Tables, Sets, and Maps: Average O(1) Lookup               | intermediate | algorithms, hash-tables         |
| Binary Trees and the Three Depth-First Traversals              | intermediate | algorithms, trees, traversal    |
| Binary Search Trees: Ordered Structure, O(log n) When Balanced | intermediate | algorithms, bst                 |
| Heaps and Priority Queues                                      | intermediate | algorithms, heaps               |
| Recursion and Divide-and-Conquer                               | intermediate | algorithms, recursion           |
| Linear Search and Binary Search                                | intermediate | algorithms, searching           |
| Sorting: Insertion Sort, Merge Sort, and Choosing Between Them | intermediate | algorithms, sorting             |
| Graphs: Representations, BFS, and DFS                          | advanced     | algorithms, graphs, bfs, dfs    |
| Backtracking, Greedy Reasoning, and Dynamic Programming        | advanced     | algorithms, dynamic-programming |

**Guided project:** Learning Path Recommendation Engine

## Track 9 — Python (8 lessons)

| Lesson                                      | Difficulty | Skills                           |
| ------------------------------------------- | ---------- | -------------------------------- |
| Python Syntax and Basic Types               | beginner   | python-syntax, python-types      |
| Conditionals and Loops                      | beginner   | python-control-flow              |
| Functions: Reusable Blocks of Logic         | beginner   | python-functions                 |
| Lists, Tuples, Sets, and Dictionaries       | beginner   | python-collections               |
| Modules, Packages, and Virtual Environments | beginner   | python-modules, python-tooling   |
| Files and Exceptions                        | beginner   | python-error-handling, python-io |
| Classes and Objects                         | beginner   | python-oop                       |
| Testing Fundamentals                        | beginner   | python-testing                   |

**Guided project:** Expense Tracker

## Track 10 — Git, APIs & SQL (8 lessons)

| Lesson                                            | Difficulty | Skills                                       |
| ------------------------------------------------- | ---------- | -------------------------------------------- |
| Git Basics: Repositories, Commits & History       | beginner   | version-control, git-fundamentals            |
| Branches, Merging & Pull Requests                 | beginner   | version-control, collaboration, github       |
| JSON and HTTP: The Language APIs Speak            | beginner   | apis, json, http                             |
| REST APIs and Authentication Basics               | beginner   | apis, rest, authentication                   |
| SQL Tables, Rows, Columns & Relationships         | beginner   | sql-fundamentals, data-modeling              |
| Filtering and Sorting Rows: WHERE and ORDER BY    | beginner   | sql-fundamentals, sql-querying               |
| Changing Data: INSERT, UPDATE, and DELETE         | beginner   | sql-fundamentals, sql-data-modification      |
| Aggregating and Combining Data: GROUP BY and JOIN | beginner   | sql-fundamentals, sql-aggregation, sql-joins |

All SQL lessons share one dataset (`content/fixtures/sql-seed.ts`, a bookstore schema: authors,
books, orders) so learners build on one consistent schema instead of a new one per lesson.

**Guided projects:** Git Branching & Collaboration Workflow; API-Powered Lookup App (spans
JavaScript + this track)

## Track 11 — Database Design & PostgreSQL (14 lessons)

Added in Phase 5B. Builds on this document's Git, APIs & SQL track, which already teaches
SELECT/JOIN/INSERT/UPDATE/DELETE/GROUP BY against this platform's browser SQL runner — SQLite
(sql.js), **not** PostgreSQL. Three lessons whose SQL is genuinely dialect-compatible with SQLite
(joins/aggregation, subqueries/CTEs, window functions) use that real runner, with an explicit,
in-lesson disclosure that the sandbox is SQLite, not PostgreSQL. Every lesson covering
PostgreSQL-specific behavior (data types, transactions, isolation, indexes/EXPLAIN, roles,
migrations) uses genuine browser-executable JS/TS-modeling exercises and static, non-executed
reference DDL instead — never silently running PostgreSQL-flavored SQL against SQLite. Three
lessons additionally carry a guided local lab for real, local PostgreSQL work. Version assumption:
PostgreSQL 16 (examples remain valid on 17+).

| Lesson                                                                  | Difficulty   | Skills                               |
| ----------------------------------------------------------------------- | ------------ | ------------------------------------ |
| Relational Modeling: Entities, Attributes, and Relationships            | intermediate | database-design, relational-modeling |
| Primary Keys, Foreign Keys, and Constraints                             | intermediate | database-design, keys                |
| Normalization: First and Second Normal Form                             | intermediate | database-design, normalization       |
| Third Normal Form and Denormalization Tradeoffs                         | intermediate | database-design, normalization       |
| PostgreSQL Data Types and DDL                                           | intermediate | postgresql, data-types               |
| Implementing a Normalized Schema in PostgreSQL (Guided Local Lab)       | intermediate | postgresql, ddl                      |
| Joins and Aggregation, Beyond the Basics                                | intermediate | postgresql, sql, joins               |
| Subqueries and Common Table Expressions                                 | intermediate | postgresql, sql, ctes                |
| Window Functions: Calculations Across Rows Without Collapsing Them      | advanced     | postgresql, sql, window-functions    |
| Transactions and ACID Guarantees                                        | advanced     | postgresql, transactions             |
| Concurrent-Update Problems and Isolation Levels (Guided Local Lab)      | advanced     | postgresql, concurrency              |
| Indexes, Composite Indexes, and Reading EXPLAIN                         | advanced     | postgresql, indexes                  |
| Views, Roles, and the Principle of Least Privilege                      | advanced     | postgresql, roles, security          |
| Migrations, Schema Evolution, and Operational Safety (Guided Local Lab) | advanced     | postgresql, migrations               |

**Guided project:** Learning Platform Database Layer

## Track 12 — AI, LLMs, RAG & Agents (14 lessons)

| Lesson                                                           | Difficulty   | Skills                           |
| ---------------------------------------------------------------- | ------------ | -------------------------------- |
| AI vs Machine Learning vs Deep Learning vs Generative AI         | beginner     | ai-fundamentals                  |
| Neural Network Intuition                                         | beginner     | ai-fundamentals, neural-networks |
| Transformer Intuition, Tokens, and Context Windows               | beginner     | transformers, tokens             |
| Prompt Design: Instructions and Structured Outputs               | beginner     | prompt-engineering               |
| Embeddings and Vector Similarity                                 | intermediate | embeddings, vector-search        |
| Chunking and Document Ingestion                                  | intermediate | rag, chunking, ingestion         |
| Semantic, Keyword, and Hybrid Search                             | intermediate | rag, semantic-search             |
| Retrieval-Augmented Generation: The Full Pipeline                | intermediate | rag                              |
| Reranking and Citations                                          | intermediate | rag, citations                   |
| Reducing Hallucination and Evaluating RAG Quality                | advanced     | rag, evaluation                  |
| Prompt Injection and Data Privacy                                | advanced     | ai-safety, prompt-injection      |
| Tool and Function Calling                                        | advanced     | tool-calling, agents             |
| AI Agents and Workflows                                          | advanced     | agents                           |
| Cost, Latency, Caching, Observability, and Production Safeguards | advanced     | ai-production, observability     |

Every exercise in this track is a hand-written, deterministic JavaScript simulation (cosine
similarity, chunking, mock retrieval ranking, mock tool dispatch, a bounded agent loop, a rate
limiter) — no real LLM/embedding API is called by any lesson exercise, and each explanation says so
explicitly, so learners understand the underlying mechanics before ever touching a vendor SDK.

**Guided project:** Semantic Search Mini-App
**Capstones:** Document Q&A RAG Capstone (with citations, spans this track + SQL); AI Support Agent
Capstone (tool-calling agent with guardrails)

## Track 13 — Software Testing & QA (28 lessons, 2 courses)

Two courses (Phase 5A.2). Both reuse the existing HTML/JS runner exclusively — no new runner was
added. Every exercise represents a testing _decision_ (which equivalence classes, which boundary
values, which combination from a decision table) as a small, deterministic JavaScript value the
harness checks against the real technique's rules — never a claim that real HTTP requests or a
real test-automation tool ran.

**Software Testing Foundations** (14 lessons, beginner, no prerequisites): quality vs. testing,
requirements analysis, test levels and types, the four structured test design techniques
(equivalence partitioning, boundary-value analysis, decision tables, state transition testing —
each its own hands-on lab), exploratory testing, risk-based testing, defect reporting,
traceability and regression strategy, and agile testing/accessibility/security awareness.
**Guided project:** Test Strategy for a Learning Application.

**API Testing and Automation** (14 lessons, intermediate, requires Software Testing Foundations):
HTTP fundamentals, REST conventions, headers/auth (401 vs. 403), JSON schema validation (lab),
positive/negative testing, API-specific boundary cases (lab), contract testing, data-driven
testing, chained/stateful workflows (lab), error-response validation, idempotency and rate
limiting, API security basics (broken object-level authorization, input sanitization),
and structuring a maintainable, isolated automation suite with useful CI reporting.
**Guided project:** Validation Suite for a Sample Learning-Progress API.

## Track 14 — Playwright Web Automation (14 lessons)

Added in Phase 5C. Requires Software Testing Foundations. This platform has no Playwright runtime
in its browser sandbox and adds none. Every browser exercise is genuine, runnable JavaScript
modeling the underlying decision (locator-stability scoring, a retry/backoff policy, fixture-
dependency resolution, trace-event classification) — never a claim that a real browser was
launched. Three lessons additionally carry a guided local lab for the real, local
`npx playwright install`/`npx playwright test` work. Version assumption: Playwright 1.62.x
(matching this repository's own `@playwright/test ^1.62.0`), Node.js 20.x/22.x LTS.

| Lesson                                                                    | Difficulty   | Skills                              |
| ------------------------------------------------------------------------- | ------------ | ----------------------------------- |
| Playwright Architecture, Setup, and the Test Lifecycle (Guided Local Lab) | beginner     | playwright, architecture            |
| Locators: Finding Elements the Way a User Would                           | beginner     | playwright, locators                |
| Auto-Waiting and Web-First Assertions                                     | intermediate | playwright, waiting, assertions     |
| Navigation and Form Interaction                                           | intermediate | playwright, navigation, forms       |
| Frames, Popups, Dialogs, and File Transfer                                | intermediate | playwright, frames, dialogs         |
| Network Observation and Mocking                                           | intermediate | playwright, network                 |
| APIRequestContext: API Calls Without a Browser                            | intermediate | playwright, api-testing             |
| Authentication State and Browser Projects (Guided Local Lab)              | intermediate | playwright, auth-state              |
| Fixtures, Hooks, and Parameterization                                     | advanced     | playwright, fixtures                |
| Page Objects, Alternatives, and Test-Data Design                          | advanced     | playwright, page-objects, test-data |
| Parallelism, Retries, and Timeouts                                        | advanced     | playwright, parallelism             |
| Trace Viewer, Screenshots, Video, and Debugging                           | advanced     | playwright, trace-viewer            |
| Reporting and CI Integration (Guided Local Lab)                           | advanced     | playwright, reporting, ci           |
| Flaky Tests, Accessibility, Security, and Architecture                    | advanced     | playwright, flaky-tests             |

**Guided project:** Build a Cross-Browser Learning Platform Test Suite

## Track 15 — Selenium WebDriver Automation (14 lessons)

Added in Phase 5C. Requires Java Programming Foundations (the preferred, Java-based path). This
platform has no JVM or Selenium runtime and adds none. Every browser exercise models the underlying
decision (wait selection, locator-quality scoring, page-object responsibility) in genuine
JavaScript, never claiming a real browser was opened. Three lessons additionally carry a guided
local lab for real, local `mvn`/JUnit/browser work. Version assumption: Java 21 LTS, Selenium
WebDriver 4.x, JUnit 5.10+, Maven 3.9+.

| Lesson                                                         | Difficulty   | Skills                    |
| -------------------------------------------------------------- | ------------ | ------------------------- |
| WebDriver Architecture and the W3C Protocol (Guided Local Lab) | beginner     | selenium, webdriver       |
| Driver Lifecycle and Navigation                                | beginner     | selenium, navigation      |
| Element Location Strategies                                    | intermediate | selenium, locators        |
| Synchronization: Implicit, Explicit, and Fluent Waits          | intermediate | selenium, waits           |
| Forms, Dropdowns, and Alerts                                   | intermediate | selenium, forms           |
| Frames, Windows, and the Actions API (Guided Local Lab)        | intermediate | selenium, actions         |
| Uploads, Cookies, and Screenshots                              | intermediate | selenium, uploads         |
| Page Objects and Component Objects                             | advanced     | selenium, page-objects    |
| JUnit Integration and Parameterized Tests                      | advanced     | selenium, junit           |
| Parallel Execution, Grid, and Remote WebDriver                 | advanced     | selenium, grid            |
| Failure Diagnosis                                              | advanced     | selenium, diagnostics     |
| Reporting and CI Integration (Guided Local Lab)                | advanced     | selenium, reporting, ci   |
| Maintainable Selenium Design                                   | advanced     | selenium, maintainability |
| Security and Secret Handling in Selenium Suites                | advanced     | selenium, security        |

**Guided project:** Build a Maintainable Learning Portal Selenium Suite

## Track 16 — Linux and Shell Fundamentals (14 lessons)

Added in Phase 5C. No prerequisite. Explicitly scoped to Linux user-space fundamentals,
Bash-compatible shell concepts, and safe, automation-oriented command-line usage — **not** a
system-administration certification course. This platform never executes a shell command anywhere
and adds no shell runner; every one of this course's 28 exercise prompts explicitly states it only
models argument parsing, pipeline transformations, exit-code decisions, or quoting/permission logic
(the strictest execution-honesty policy on the platform, enforced by a dedicated test). Three
lessons additionally carry a guided local lab for real, local terminal work. Version assumption:
Bash 5.x, a current Linux distribution (Ubuntu 22.04/24.04 LTS or equivalent).

| Lesson                                                               | Difficulty   | Skills                     |
| -------------------------------------------------------------------- | ------------ | -------------------------- |
| The Linux Filesystem Model and Navigation (Guided Local Lab)         | beginner     | linux, filesystem          |
| Globbing, Quoting, and Expansion                                     | beginner     | linux, shell, quoting      |
| Standard Streams, Pipes, Redirection, and Exit Codes                 | intermediate | linux, shell, pipes        |
| Text Search and Transformation: grep, sed, and awk Foundations       | intermediate | linux, text-processing     |
| sort, uniq, cut, head/tail, wc, and Archives                         | intermediate | linux, text-processing     |
| Environment Variables, PATH, and Executable Files                    | intermediate | linux, environment         |
| Processes, Signals, and Permissions                                  | intermediate | linux, processes           |
| Shell Scripting: Parameters, Conditions, Loops, and Functions        | advanced     | linux, bash, scripting     |
| Defensive Scripting: set -e, set -u, and pipefail (Guided Local Lab) | advanced     | linux, defensive-scripting |
| Temp Files, Cleanup Traps, and Logging                               | advanced     | linux, bash, logging       |
| Catching Bugs Early: ShellCheck and Portability                      | advanced     | linux, shellcheck          |
| Running Scripts Unattended: cron and CI Execution (Guided Local Lab) | advanced     | linux, cron, ci            |
| Networking Inspection and curl Fundamentals                          | advanced     | linux, curl, networking    |
| Secrets, Command History, and Destructive-Command Safety             | advanced     | linux, security            |

**Guided project:** Build a Safe Project Validation CLI

## Track 17 — Test Automation Framework Engineering (14 lessons)

Added in Phase 5C. An advanced integration course, not a duplicate of Playwright or Selenium —
requires only Playwright Web Automation (Selenium is recommended, non-mandatory parallel
background). Reference implementation: TypeScript and Playwright, reusing the learner's existing
Playwright knowledge with no new major runtime. Its guided project's DB-validation adapter is a
documented interface design plus an in-memory mock only — no real database connection, credential,
or Supabase integration anywhere in the course. Three lessons carry a guided local lab for real,
local TypeScript + Playwright + GitHub Actions work.

| Lesson                                                                | Difficulty | Skills                             |
| --------------------------------------------------------------------- | ---------- | ---------------------------------- |
| Framework Goals, Boundaries, and Test Architecture (Guided Local Lab) | advanced   | test-automation, architecture      |
| Repo Structure, Configuration Management, and Secret Handling         | advanced   | test-automation, configuration     |
| Test-Data Management and the Builder Pattern (Guided Local Lab)       | advanced   | test-automation, test-data         |
| Fixtures and Dependency Injection Concepts                            | advanced   | test-automation, fixtures          |
| Page Objects and Component Objects at Framework Scale                 | advanced   | test-automation, page-objects      |
| Service Clients and Database Validation Boundaries                    | advanced   | test-automation, api-testing       |
| Assertion Design and Building a Small Test DSL                        | advanced   | test-automation, assertions        |
| Tagging, Test Selection, Parallelism, and Isolation                   | advanced   | test-automation, isolation         |
| Retry and Timeout Policy, and Managing Flaky Tests                    | advanced   | test-automation, flaky-tests       |
| Structured Diagnostics and Reporting                                  | advanced   | test-automation, diagnostics       |
| CI Pipelines, Quality Gates, and Sharding (Guided Local Lab)          | advanced   | test-automation, ci, quality-gates |
| Failure Triage, Ownership, and Code Review Standards                  | advanced   | test-automation, triage            |
| Versioning, Extensibility, and Framework Anti-Patterns                | advanced   | test-automation, extensibility     |
| Migration Strategy, Framework Health Metrics, and Release Readiness   | advanced   | test-automation, framework-health  |

**Guided project:** Build a Production-Grade Learning Platform Automation Framework

## Track 18 — Placement & Career Readiness (36 lessons, 3 courses)

Added in Phase 6. All three courses reuse the existing HTML/JS runner exclusively — no new runner
was added. Every exercise (including the two "soft skill" courses) models its underlying technique
as a genuine, deterministic JavaScript function checking concrete, rule-based structural criteria —
never a claim that the platform judges a learner's real numerical ability, reasoning, or
communication skill. All three courses also feed the new, reusable **practice-session engine**
(`/courses/[courseSlug]/practice`, `lib/practice/`), which pools every lesson's quiz questions into
one course-wide, untimed-or-timed self-practice session with a topic breakdown — available on every
course on the platform, not just these three.

**Quantitative Aptitude** (12 lessons, beginner, no prerequisites): number systems and divisibility,
LCM/HCF, percentages, profit/loss/discount, simple and compound interest, ratio/proportion/
mixtures, time-speed-distance, time and work, averages, permutations/combinations/probability, data
interpretation, and mixed aptitude problem solving. **Guided project:** Quantitative Aptitude
Practice Portfolio.

**Logical and Analytical Reasoning** (12 lessons, beginner, no prerequisites): number/letter series,
coding-decoding, analogies and classification, blood relations, direction sense, syllogisms,
seating arrangements, puzzles and grouping, statements/assumptions/conclusions, non-verbal/pattern
reasoning, critical reasoning, and mixed reasoning practice. **Guided project:** Logical and
Analytical Reasoning Practice Portfolio.

**Career and Group Discussion Preparation** (12 lessons, beginner, no prerequisites): professional
communication basics, resume fundamentals, the elevator pitch, group discussion fundamentals,
structuring GD arguments, GD etiquette and active listening, interview fundamentals, the STAR
method, common interview questions, handling difficult questions, workplace professionalism, and a
mock career-readiness capstone. **Guided project:** Mock Career Readiness Capstone.

## Totals

| Metric                           | Count |
| -------------------------------- | ----- |
| Tracks                           | 18    |
| Courses                          | 21    |
| Lessons                          | 252   |
| Knowledge-check questions        | 778   |
| Exercises (guided + independent) | 504   |
| Guided local labs                | 24    |
| Guided projects                  | 18    |
| Capstones                        | 5     |

All counts above are computed from the live registry (query the registry's `allTracks`/
`allCourses`/`allLessons`/`allProjects` exports directly, or cross-check the lesson/course/project
totals in `npm run content:validate`'s summary line) — not hand-maintained, so this table cannot
silently drift from the real content the way a purely hand-typed count could.

## Content-authoring notes

- All lessons, examples, exercises, and explanations were written for this platform; none were
  copied from any tutorial site. Reference links point to primary sources (MDN, official language
  docs, OWASP, git-scm.com, OpenAI/Anthropic docs) for further reading.
- Exercises are checked deterministically by _running_ learner code and testing behavior (function
  return values, DOM state, SQL result rows compared against a reference query) — not by matching
  exact source text — so multiple correct implementations pass.
- `author`/`reviewer` fields and `lastReviewed` dates are present on every lesson per the content
  schema; in this beta both fields are populated by the curriculum team that authored the content
  rather than a separate external review pass — flagged here for transparency ahead of a
  production launch.

## Complete-course definition

A published course must have: a stable id/slug, accurate title/description/track/category,
difficulty, `prerequisiteCourseSlugs`/`nextCourseSlugs` (resolving to real courses, acyclic —
enforced by `scripts/validate-content.ts`), `audience`, at least 3 `learningOutcomes`, at least 4
`modules` covering every lesson in the course exactly once, at least 12 lessons, and a guided
project. Every lesson needs objectives, a plain-language explanation, a working example, at least
one practice activity (guided + independent exercise, each with deterministic checks a reference
solution is proven to pass — see `scripts/validate-snippets.ts`), a 3+ question knowledge check,
and a takeaway/summary. `scripts/validate-content.ts` enforces the structural rules (module/lesson
consistency, minimum counts, no duplicate/orphaned content, no unresolvable references) on every
course added from Phase 5A onward; five pre-Phase-5A courses are explicitly exempted from the
lesson/module _minimums_ only (not from any other rule) because they are complete, real, previously
audited courses that simply predate this bar — see `EXEMPT_SHORT_COURSES` in that script for the
exact list and reasoning. A technology **guide** has none of this structure — it is reference prose
(what it is, why it's used, core concepts, one example, use cases) with no modules, no lessons, no
graded exercises, and no completion tracking. The two are never conflated in the UI: a guide-only
technology's page never shows a "Start course" action (verified by
`tests/e2e/technology-directory.spec.ts`), and `lib/directory/availability.ts` is the single
function that decides whether a technology may claim course/runner/project availability, resolved
against the real registries rather than an independently-authored boolean.

## Master curriculum architecture (Phase 5A+)

The long-term curriculum is organized into 8 tracks, each an ordered sequence of courses. Only
courses that are actually implemented (this document's Tracks 1–17 above) are public; every other
course named below is a documented plan, not a claim of availability — none of them appear in
`content/courses.ts`, the public catalog, search, or any roadmap's required steps.

1. **Web Development** — HTML & CSS ✅ → JavaScript ✅ → TypeScript ✅ → React ✅ → Node.js and
   Express ✅
2. **Backend and Programming** — Node.js and Express ✅ (shared with track 1) → Java ✅ → Data
   Structures and Algorithms ✅ → Backend Architecture Fundamentals (5D) → Spring Boot (5D)
3. **Databases and Data** — SQL ✅ (part of Track 6) → Database Design and PostgreSQL ✅ → Data
   Analysis with Python and Pandas (5D) → Machine Learning Foundations (5D, distinct from the
   existing AI/LLM/RAG track's ML lesson, which teaches ML _concepts_, not applied model-building)
4. **Software Testing and QA Automation** — Software Testing Foundations ✅ → API Testing and
   Automation ✅ → Playwright Web Automation ✅ (5C) or Selenium WebDriver Automation ✅ (5C) →
   Test Automation Framework Engineering ✅ (5C) → Performance and Security Testing Foundations
   (5D)
5. **DevOps and Cloud** — Git ✅ (part of Track 6) → Linux and Shell Fundamentals ✅ (5C) → Docker
   (5D) → Continuous Integration and Delivery (5D) → Cloud Fundamentals (5D) → Kubernetes
   Fundamentals (5D)
6. **AI and Machine Learning** — Python ✅ → AI, LLMs, RAG & Agents ✅ → Prompt Engineering
   (already a lesson within the existing course; a dedicated deeper course is 5D) → Advanced RAG
   (5D) → Generative AI Application Engineering (5D) → LLM Evaluation, Safety, and Observability
   (5D)
7. **Placement and Career Preparation** ✅ (Phase 6) — Quantitative Aptitude → Logical and
   Analytical Reasoning → Career and Group Discussion Preparation, 12 lessons each (36 total), plus
   a reusable practice-session engine (untimed/timed, topic breakdown, retry-incorrect/retry-weak-
   topics) built once and available on every course, not just these three. This delivers the same
   ground the original speculative 5-course breakdown (Quantitative Aptitude / Logical Reasoning /
   Verbal Ability / Interview and GD Preparation / Timed Placement Mock Tests) named, consolidated
   into 3 complete courses rather than 5 thinner ones — verbal ability folded into the Reasoning
   course, and "timed mock tests" delivered as the practice engine's timed mode rather than a
   separate course, since a generic engine serving every course is more valuable than one more
   single-purpose course. The three categories (`quantitative-aptitude`, `reasoning`, `career-gd`)
   and the `placement-and-job-readiness` roadmap are now public. See `PROJECT_STATUS.md`'s Phase 6
   report for the full build, verification, and QA results.
8. **Programming and Computer Science foundations** — Digital & Coding Foundations ✅ → the
   Data Structures and Algorithms course above (shared with track 2).

**Phase 5A (implemented): TypeScript Foundations.** The original brief for this batch
named 12 candidate courses; after auditing the runner architecture (see
`docs/ARCHITECTURE.md`'s runner matrix) 8 of the 12 — React, Node.js/Express, Java, PostgreSQL,
Playwright, Selenium, and Test Automation Framework Engineering — could not execute in this
project's three-runner browser sandbox (HTML/CSS/JS, Python via Pyodide, SQL via sql.js) without
either a fake "Run" button or a new server-side execution capability, both explicitly
out of scope for that phase. Rather than publish those 8 as shallow, non-interactive
"courses" to hit a count, that batch scoped down to what could be built completely, end-to-end,
and verified: one new genuinely interactive course (TypeScript, via a new lazily-loaded real
compiler — see `docs/ARCHITECTURE.md`) plus the schema/tooling/documentation foundation later
courses need. All 7 of the deferred courses named above have since shipped (React and Node.js/
Express in Phase 5A.2; Java and PostgreSQL in Phase 5B; Playwright, Selenium, and Test Automation
Framework Engineering in Phase 5C), each using the **guided local lab** pattern designed in Phase
5A.2 specifically to solve this constraint honestly, without a fake Run button or a new execution
surface. See `PROJECT_STATUS.md`'s Phase 5A report for the full original reasoning and what was
verified at the time.

**Phase 5A.2 (implemented): Software Testing Foundations, API Testing and Automation, React
Application Development, Node.js and Express Backend Development — all four courses complete.**
This batch added a reusable **guided local lab** content type (`guidedLocalLabSchema` in
`lib/content/types.ts`, `components/lesson/guided-local-lab-panel.tsx`) for courses whose real work
genuinely cannot execute in a browser — instructional content with setup steps, starter files,
verification commands, and a reference solution, explicitly labeled "Runs on your computer" and
never rendered with a Run button. The two testing courses reuse the existing HTML/JS runner
exclusively (test-design decisions and API-behavior simulations represented as small, deterministic
JavaScript values) and needed no guided local labs at all. React and Node.js/Express each combine
both approaches: every lesson's browser exercises are genuine, runnable JavaScript/TypeScript
modeling the underlying mechanism of a React/Node concept (a hand-written `createElement`, a
closure-based `useState`, a route-matcher, a middleware-pipeline runner — several of these are the
real algorithm, not a simplification), and three lessons per course additionally carry a guided
local lab for the real component/server work — six guided local labs total across both courses, no
new runner or execution surface added. See `PROJECT_STATUS.md`'s Phase 5A.2 report for the full
build, verification, and QA results.

**Phase 5B (implemented): Java Programming Foundations, Data Structures and Algorithms, Database
Design and PostgreSQL — all three courses complete.** Java and PostgreSQL each use the
guided-local-lab content type built in Phase 5A.2 for their real compile/run and real-database
work (three labs each: setup steps, expected behavior, verification commands, no fake execution),
with every browser exercise still genuine, runnable JavaScript/TypeScript modeling the underlying
mechanism (Java's overload resolution, an equals/hashCode contract, a Stream-style pipeline;
PostgreSQL's relational-modeling and normalization reasoning, a transaction/isolation model, an
index/EXPLAIN classifier) — no JVM and no PostgreSQL server were added to the site. Data Structures
and Algorithms needs no guided local labs at all, since arrays, linked lists, trees, graphs, and
every algorithm in that course are equally real in browser-executable JavaScript/TypeScript;
three of its lessons instead carry a substantially larger, "lab-scale" exercise to satisfy this
course's lab requirement inside the existing exercise schema. Three PostgreSQL lessons
(joins/aggregation, subqueries/CTEs, window functions) use the real, existing browser SQL runner
— SQLite, not PostgreSQL — specifically because that subset of syntax is genuinely
dialect-compatible, with an explicit, in-lesson disclosure every time; every genuinely
PostgreSQL-specific lesson uses JS/TS-modeling exercises and static, non-executed reference DDL
instead. See `PROJECT_STATUS.md`'s Phase 5B report for the full build, verification, and QA
results.

**Phase 5C (implemented): Playwright Web Automation, Selenium WebDriver Automation, Linux and Shell
Fundamentals, Test Automation Framework Engineering — all four courses complete.** Playwright and
Selenium each use the guided-local-lab content type for their real, local browser-automation work
(three labs each: a real multi-browser/Java+JUnit project setup, a realistic multi-page workflow,
and CI integration), with every browser exercise still genuine, runnable JavaScript modeling the
underlying decision (locator-stability scoring, wait-strategy selection, fixture-dependency
resolution, trace-event classification) — no Playwright runtime and no JVM/Selenium runtime were
added to the site. Linux and Shell Fundamentals applies the platform's strictest execution-honesty
policy to date: this platform never executes a shell command anywhere, and every one of its 28
browser exercises' prompts explicitly states it only models shell behavior (argument parsing,
pipeline transformations, exit-code decisions, quoting/permission logic), verified by a dedicated
test; its three guided local labs (a contained sample workspace, a defensive log-analysis script, a
CI-friendly verification script) are real, local terminal work. Test Automation Framework
Engineering is an advanced integration course building on Playwright specifically (not an
impossible Playwright+Selenium combined prerequisite), teaching framework architecture rather than
duplicating either automation tool; its guided project's database-validation adapter is a
documented interface design plus an in-memory mock only, with no real database connection or
Supabase reference anywhere in the course, verified by a dedicated test. See `PROJECT_STATUS.md`'s
Phase 5C report for the full build, verification, and QA results.

**Phase 5D (documented plan, not built):** TypeScript Compiler React (deferred further), Backend
Architecture Fundamentals, Spring Boot, Data Analysis with Python and Pandas, Machine Learning
Foundations, Performance and Security Testing Foundations, Docker, Continuous Integration and
Delivery, Cloud Fundamentals, Kubernetes Fundamentals, Prompt Engineering (dedicated course),
Advanced RAG, Generative AI Application Engineering, LLM Evaluation/Safety/Observability. None of
these are published yet. (The Placement and Career Preparation track originally speculated here was
instead delivered, in a consolidated 3-course form, as Phase 6 — see track 7 above.)

## Complete guide-to-course coverage matrix

Every one of the 83 public technology guides, computed from the live registry (not retyped by
hand), mapped to its category, difficulty, and actual availability. "Course" means
`lib/directory/availability.ts#getTechnologyAvailability()` resolves a real course for it today;
"Runner" means a Playground language; "Project(s)" lists linked guided projects. Everything else is
guide-only, with its planned batch (or a documented reference-only reason) in the last column.

### Foundations (3)

| Technology                   | Difficulty | Course                | Runner | Project(s)              | Batch / reason                                                                                                                         |
| ---------------------------- | ---------- | --------------------- | ------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| How-To Guides                | beginner   | —                     | —      | —                       | Reference-only: a meta-guide about using the directory itself, not a technology                                                        |
| Introduction to HTML and CSS | beginner   | html-css-fundamentals | html   | personal-portfolio-page | ✅ available                                                                                                                           |
| Introduction to Programming  | beginner   | —                     | —      | —                       | Reference-only: an orientation guide preceding any language-specific course; see `how-computing-works` for the course-level equivalent |

### Frontend Development (11)

| Technology | Difficulty   | Course                        | Runner | Project(s)                    | Batch / reason                                                                                             |
| ---------- | ------------ | ----------------------------- | ------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Angular    | advanced     | —                             | —      | —                             | 5D (framework tier, after React)                                                                           |
| AngularJS  | intermediate | —                             | —      | —                             | Reference-only: legacy, `legacyNote` explains current status; no course planned                            |
| Bootstrap  | beginner     | —                             | —      | —                             | Reference-only: a CSS library, taught in context within HTML & CSS Fundamentals rather than its own course |
| CSS        | beginner     | html-css-fundamentals         | html   | personal-portfolio-page       | ✅ available                                                                                               |
| HTML       | beginner     | html-css-fundamentals         | html   | personal-portfolio-page       | ✅ available                                                                                               |
| jQuery     | beginner     | —                             | —      | —                             | Reference-only: legacy pattern, superseded by native DOM APIs taught in JavaScript Fundamentals            |
| Next.js    | intermediate | —                             | —      | —                             | 5D (after React)                                                                                           |
| React      | intermediate | react-application-development | —      | accessible-learning-dashboard | ✅ available (Phase 5A.2)                                                                                  |
| Sass       | intermediate | —                             | —      | —                             | Reference-only: a CSS preprocessor; core concepts already covered by CSS Fundamentals                      |
| Vue        | intermediate | —                             | —      | —                             | 5D (framework tier, after React)                                                                           |
| W3.CSS     | beginner     | —                             | —      | —                             | Reference-only: attributed to its creator (W3Schools), not a course candidate                              |

### Backend Development (10)

| Technology    | Difficulty   | Course                             | Runner | Project(s)                      | Batch / reason                               |
| ------------- | ------------ | ---------------------------------- | ------ | ------------------------------- | -------------------------------------------- |
| .NET          | intermediate | —                                  | —      | —                               | 5D or later (not yet scheduled)              |
| ASP.NET       | intermediate | —                                  | —      | —                               | 5D or later (after .NET)                     |
| Django        | intermediate | —                                  | —      | —                               | 5D or later (after a Python backend course)  |
| Express       | intermediate | nodejs-express-backend-development | —      | validated-learning-progress-api | ✅ available (Phase 5A.2)                    |
| GraphQL       | intermediate | —                                  | —      | —                               | 5D (after REST APIs)                         |
| Microservices | advanced     | —                                  | —      | —                               | 5D (after Backend Architecture Fundamentals) |
| Node.js       | intermediate | nodejs-express-backend-development | —      | validated-learning-progress-api | ✅ available (Phase 5A.2)                    |
| REST APIs     | beginner     | git-apis-sql                       | —      | api-powered-weather-app         | ✅ available                                 |
| Spring Boot   | advanced     | —                                  | —      | —                               | 5D (after Java)                              |
| System Design | advanced     | —                                  | —      | —                               | 5D (after Backend Architecture Fundamentals) |

### Programming Languages (10)

| Technology | Difficulty   | Course                       | Runner               | Project(s)                         | Batch / reason                                                                                                         |
| ---------- | ------------ | ---------------------------- | -------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| C          | intermediate | —                            | —                    | —                                  | Reference-only: no browser-executable runtime available; would need a guided-local-lab treatment not scoped this phase |
| C#         | intermediate | —                            | —                    | —                                  | 5D or later (after .NET)                                                                                               |
| C++        | advanced     | —                            | —                    | —                                  | Reference-only: same runtime constraint as C                                                                           |
| Go         | intermediate | —                            | —                    | —                                  | 5D or later (not yet scheduled)                                                                                        |
| Java       | intermediate | java-programming-foundations | — (guided local lab) | course-enrollment-progress-manager | ✅ available (Phase 5B)                                                                                                |
| JavaScript | beginner     | javascript-fundamentals      | javascript           | interactive-quiz-app               | ✅ available                                                                                                           |
| PHP        | beginner     | —                            | —                    | —                                  | 5D or later (not yet scheduled)                                                                                        |
| Python     | beginner     | python-fundamentals          | python               | expense-tracker-cli                | ✅ available                                                                                                           |
| Rust       | advanced     | —                            | —                    | —                                  | 5D or later (not yet scheduled)                                                                                        |
| TypeScript | intermediate | typescript-foundations       | typescript           | typed-study-tracker                | ✅ available (Phase 5A)                                                                                                |

### Mobile Development (4)

| Technology   | Difficulty   | Course | Runner | Project(s) | Batch / reason                                                                                           |
| ------------ | ------------ | ------ | ------ | ---------- | -------------------------------------------------------------------------------------------------------- |
| Flutter      | intermediate | —      | —      | —          | 5D or later — mobile courses need a guided-local-lab or simulator-based treatment, not scoped this phase |
| Kotlin       | intermediate | —      | —      | —          | 5D or later (after Java, if a native-Android course is planned)                                          |
| React Native | intermediate | —      | —      | —          | 5D or later (after React)                                                                                |
| Swift        | intermediate | —      | —      | —          | 5D or later — same constraint as Flutter                                                                 |

### Databases (5)

| Technology | Difficulty   | Course                         | Runner                                                   | Project(s)                 | Batch / reason                                                                                                                                                                                      |
| ---------- | ------------ | ------------------------------ | -------------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MongoDB    | beginner     | —                              | —                                                        | —                          | 5D or later (a document-database course, distinct from the SQL/relational track)                                                                                                                    |
| MySQL      | beginner     | —                              | —                                                        | —                          | Reference-only: SQL Tables/Filtering/Aggregation lessons in Git, APIs & SQL teach transferable relational-SQL skills; sql.js (SQLite dialect) is this platform's one browser-executable SQL runtime |
| PostgreSQL | beginner     | database-design-and-postgresql | sql (dialect-compatible lessons only) + guided local lab | learning-platform-database | ✅ available (Phase 5B) — sql.js/SQLite runs only the genuinely dialect-compatible lessons, always disclosed; PostgreSQL-specific behavior uses guided local labs                                   |
| Redis      | intermediate | —                              | —                                                        | —                          | 5D or later (not yet scheduled)                                                                                                                                                                     |
| SQL        | beginner     | git-apis-sql                   | sql                                                      | —                          | ✅ available                                                                                                                                                                                        |

### Data Science and Analytics (7)

| Technology   | Difficulty   | Course | Runner | Project(s) | Batch / reason                                                                                                                        |
| ------------ | ------------ | ------ | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Data Science | intermediate | —      | —      | —          | 5D (Data Analysis with Python and Pandas)                                                                                             |
| Excel        | beginner     | —      | —      | —          | Reference-only: proprietary desktop software, not browser-executable                                                                  |
| NumPy        | intermediate | —      | —      | —          | 5D (with Pandas)                                                                                                                      |
| Pandas       | intermediate | —      | —      | —          | 5D (Data Analysis with Python and Pandas) — Pyodide can load pandas as a package, making this a genuinely feasible interactive course |
| R            | intermediate | —      | —      | —          | 5D or later (no browser runtime; guided-local-lab candidate)                                                                          |
| SciPy        | advanced     | —      | —      | —          | 5D or later (with NumPy/Pandas)                                                                                                       |
| XML          | beginner     | —      | —      | —          | Reference-only: a data format, covered contextually where relevant (e.g. API responses) rather than its own course                    |

### Artificial Intelligence (11)

| Technology                     | Difficulty   | Course         | Project(s)                                         | Batch / reason                                               |
| ------------------------------ | ------------ | -------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| AI Agents                      | advanced     | ai-foundations | ai-support-agent-capstone                          | ✅ available                                                 |
| Artificial Intelligence        | beginner     | ai-foundations | semantic-search-mini-app                           | ✅ available                                                 |
| Deep Learning Foundations      | intermediate | ai-foundations | —                                                  | ✅ available                                                 |
| Embeddings                     | intermediate | ai-foundations | semantic-search-mini-app                           | ✅ available                                                 |
| Generative AI                  | beginner     | ai-foundations | —                                                  | ✅ available                                                 |
| Large Language Models          | intermediate | ai-foundations | —                                                  | ✅ available                                                 |
| Machine Learning               | beginner     | ai-foundations | —                                                  | ✅ available                                                 |
| MLOps                          | advanced     | —              | —                                                  | 5D or later (after applied ML)                               |
| Prompt Engineering             | beginner     | ai-foundations | —                                                  | ✅ available (lesson-level); a dedicated deeper course is 5D |
| Responsible AI                 | advanced     | —              | —                                                  | 5D (LLM Evaluation, Safety, and Observability)               |
| Retrieval-Augmented Generation | intermediate | ai-foundations | semantic-search-mini-app, document-qa-rag-capstone | ✅ available                                                 |

### Cloud and DevOps (8)

| Technology     | Difficulty   | Course | Runner | Project(s) | Batch / reason                           |
| -------------- | ------------ | ------ | ------ | ---------- | ---------------------------------------- |
| AWS            | intermediate | —      | —      | —          | 5D (Cloud Fundamentals)                  |
| Azure          | intermediate | —      | —      | —          | 5D (Cloud Fundamentals)                  |
| CI/CD          | intermediate | —      | —      | —          | 5D (Continuous Integration and Delivery) |
| Docker         | intermediate | —      | —      | —          | 5D                                       |
| GitHub Actions | intermediate | —      | —      | —          | 5D (with CI/CD)                          |
| Google Cloud   | intermediate | —      | —      | —          | 5D (Cloud Fundamentals)                  |
| Kubernetes     | advanced     | —      | —      | —          | 5D (after Docker)                        |
| Terraform      | advanced     | —      | —      | —          | 5D or later (after Cloud Fundamentals)   |

### Cybersecurity (1)

| Technology    | Difficulty   | Course | Runner | Project(s) | Batch / reason                                                                                                                |
| ------------- | ------------ | ------ | ------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Cybersecurity | intermediate | —      | —      | —          | 5D or later — needs a guided-exercise/scenario-based treatment (this platform never executes exploit code); not yet scheduled |

### Software Testing and QA (5)

| Technology                    | Difficulty   | Course                        | Runner | Project(s)                                  | Batch / reason                                                                                             |
| ----------------------------- | ------------ | ----------------------------- | ------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| API Testing                   | beginner     | api-testing-and-automation    | —      | sample-api-validation-suite                 | ✅ available (Phase 5A.2)                                                                                  |
| Playwright                    | intermediate | playwright-web-automation     | —      | cross-browser-learning-platform-test-suite  | ✅ available (Phase 5C) — guided-exercise/code-tracing format plus guided local labs, no new runner needed |
| Postman                       | beginner     | —                             | —      | —                                           | 5D (with API Testing and Automation)                                                                       |
| Selenium                      | intermediate | selenium-webdriver-automation | —      | maintainable-learning-portal-selenium-suite | ✅ available (Phase 5C)                                                                                    |
| Software Testing Fundamentals | beginner     | software-testing-foundations  | —      | learning-app-test-strategy                  | ✅ available (Phase 5A.2)                                                                                  |

### Data Structures and Algorithms (1)

| Technology                     | Difficulty   | Course                         | Runner                | Project(s)                          | Batch / reason                                                                         |
| ------------------------------ | ------------ | ------------------------------ | --------------------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| Data Structures and Algorithms | intermediate | data-structures-and-algorithms | javascript/typescript | learning-path-recommendation-engine | ✅ available (Phase 5B) — genuinely executable, no new runner or infrastructure needed |

### Developer Tools (4)

| Technology      | Difficulty   | Course                   | Runner               | Project(s)                  | Batch / reason                                                                                                     |
| --------------- | ------------ | ------------------------ | -------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Bash            | beginner     | linux-shell-fundamentals | — (guided local lab) | safe-project-validation-cli | ✅ available (Phase 5C) — a guided-local-lab treatment, since no in-browser shell exists                           |
| Developer Tools | beginner     | —                        | —                    | —                           | Reference-only: a guide to browser DevTools, already linked to the HTML/CSS/JS Playground as a practice suggestion |
| Git             | beginner     | git-apis-sql             | —                    | git-collaboration-workflow  | ✅ available                                                                                                       |
| Linux           | intermediate | linux-shell-fundamentals | — (guided local lab) | safe-project-validation-cli | ✅ available (Phase 5C)                                                                                            |

### Placement Preparation (3, Phase 6)

| Technology                              | Difficulty | Course                       | Runner | Project(s)                               | Batch / reason         |
| --------------------------------------- | ---------- | ---------------------------- | ------ | ---------------------------------------- | ---------------------- |
| Quantitative Aptitude                   | beginner   | quantitative-aptitude        | —      | quantitative-aptitude-practice-portfolio | ✅ available (Phase 6) |
| Logical and Analytical Reasoning        | beginner   | logical-analytical-reasoning | —      | reasoning-practice-portfolio             | ✅ available (Phase 6) |
| Career and Group Discussion Preparation | beginner   | career-and-gd-preparation    | —      | career-readiness-capstone                | ✅ available (Phase 6) |

**Summary:** 83 public technologies; 33 map to a real course (30 pre-Phase-6 + the 3 above); 5 more
map to a runner or project without a full course (unchanged from Phase 3/4, minus Bash/Linux which
are now courses); 8 have an explicit, documented reference-only reason (not a course candidate at
all); the remaining ~37 are genuinely planned for Phase 5D, listed above with their batch. (Test
Automation Framework Engineering, the fourth Phase 5C course, has no dedicated technology-directory
guide of its own — it teaches architecture built on Playwright, not a separate named technology.)
