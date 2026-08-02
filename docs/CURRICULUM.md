# Curriculum Matrix

> **This document describes the lesson-based course curriculum** (`content/`, `lib/content/`) —
> full, structured courses with modules, exercises, quizzes, and projects. The platform also has a
> technology directory (80 technology guides across 13 public categories, `lib/directory/`) and 16
> public learning roadmaps — a different, complementary content system with its own documents: see
> `docs/ARCHITECTURE.md`'s "Technology directory" section and `docs/CONTENT_AUTHORING.md`. A
> technology guide is explicitly not the same thing as a course in this matrix. See
> "Master curriculum architecture (Phase 5A+)" below for the complete guide-to-course coverage
> matrix across all 80 guides, and "Complete-course definition" for what separates a course from a
> guide.

One connected path, 7 tracks, 62 lessons, 208 knowledge-check questions, 124 exercises (one guided

- one independent per lesson), 9 guided projects, and 2 capstones. Every lesson includes:
  objectives, prerequisites, a plain-language explanation, a working example, an editable example
  (where a runner applies), a guided exercise, an independent exercise, common mistakes, a 3+
  question knowledge check, a takeaway, a summary, and references.

Track order (each chains into the next via `nextLessonSlug` within a track, and
`prerequisiteCourseSlugs`/`nextCourseSlugs` across tracks):
Foundations → HTML & CSS → JavaScript → TypeScript → Python → Git, APIs & SQL →
AI, LLMs, RAG & Agents. (TypeScript and Python both build on JavaScript/Foundations independently —
see the per-course prerequisite graph in "Master curriculum architecture" below; TypeScript is not
required before Python.)

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

## Track 5 — Python (8 lessons)

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

## Track 6 — Git, APIs & SQL (8 lessons)

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

## Track 7 — AI, LLMs, RAG & Agents (14 lessons)

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

## Totals

| Metric                           | Count |
| -------------------------------- | ----- |
| Tracks                           | 7     |
| Courses                          | 7     |
| Lessons                          | 62    |
| Knowledge-check questions        | 208   |
| Exercises (guided + independent) | 124   |
| Guided projects                  | 7     |
| Capstones                        | 2     |

All counts above are computed from the live registry by `npm run content:validate`'s summary line
(`Schema-checked N tracks, N courses, N lessons, N projects`) — not hand-maintained, so this table
cannot silently drift from the real content the way a purely hand-typed count could.

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
courses that are actually implemented (this document's Tracks 1–7 above) are public; every other
course named below is a documented plan, not a claim of availability — none of them appear in
`content/courses.ts`, the public catalog, search, or any roadmap's required steps.

1. **Web Development** — HTML & CSS ✅ → JavaScript ✅ → TypeScript ✅ → React (5B) → Node.js and
   Express (5B)
2. **Backend and Programming** — Java (5B) → Data Structures and Algorithms (5B) → Backend
   Architecture Fundamentals (5C) → Spring Boot (5C)
3. **Databases and Data** — SQL ✅ (part of Track 6) → Database Design and PostgreSQL (5B) → Data
   Analysis with Python and Pandas (5C) → Machine Learning Foundations (5C, distinct from the
   existing AI/LLM/RAG track's ML lesson, which teaches ML _concepts_, not applied model-building)
4. **Software Testing and QA Automation** — Software Testing Foundations (5B) → API Testing and
   Automation (5B) → Playwright Web Automation (5B) or Selenium Web Automation (5B) → Test
   Automation Framework Engineering (5C) → Performance and Security Testing Foundations (5C)
5. **DevOps and Cloud** — Git ✅ (part of Track 6) → Linux and Shell Fundamentals (5C) → Docker
   (5C) → Continuous Integration and Delivery (5C) → Cloud Fundamentals (5C) → Kubernetes
   Fundamentals (5C)
6. **AI and Machine Learning** — Python ✅ → AI, LLMs, RAG & Agents ✅ → Prompt Engineering
   (already a lesson within the existing course; a dedicated deeper course is 5C) → Advanced RAG
   (5C) → Generative AI Application Engineering (5C) → LLM Evaluation, Safety, and Observability
   (5C)
7. **Placement and Career Preparation** — Quantitative Aptitude (5C) → Logical Reasoning (5C) →
   Verbal Ability (5C) → Interview and Group Discussion Preparation (5C) → Timed Placement Mock
   Tests (5C). This track corresponds to the three categories (`quantitative-aptitude`,
   `reasoning`, `career-gd`) and the one learning roadmap (`placement-and-job-readiness`) that
   already exist in the registries as internal/draft, per Phase 3 — see `docs/PRD.md`'s Phase 5
   section. None of this content exists yet.
8. **Programming and Computer Science foundations** — Digital & Coding Foundations ✅ → the
   Data Structures and Algorithms course above (shared with track 2).

**Phase 5A (implemented, this batch): TypeScript Foundations.** The original brief for this batch
named 12 candidate courses; after auditing the runner architecture (see
`docs/ARCHITECTURE.md`'s runner matrix) 8 of the 12 — React, Node.js/Express, Java, PostgreSQL,
Playwright, Selenium, and Test Automation Framework Engineering — cannot execute in this
project's three-runner browser sandbox (HTML/CSS/JS, Python via Pyodide, SQL via sql.js) without
either a fake "Run" button or a new server-side execution capability, both explicitly
out of scope for this phase. Rather than publish those 8 as shallow, non-interactive
"courses" to hit a count, this batch scoped down to what could be built completely, end-to-end,
and verified: one new genuinely interactive course (TypeScript, via a new lazily-loaded real
compiler — see `docs/ARCHITECTURE.md`) plus the schema/tooling/documentation foundation the
remaining 11 need. See `PROJECT_STATUS.md`'s Phase 5A report for the full reasoning and what was
verified.

**Phase 5B (documented plan, not built):** React, Node.js and Express, Java, Data Structures and
Algorithms, Database Design and PostgreSQL, Software Testing Foundations, API Testing and
Automation, Playwright Web Automation, Selenium Web Automation. These are the courses closest to
buildable today — React/Node need either a guided-local-lab presentation (setup steps, expected
behavior, verification commands, no fake execution) or a real bundler-based in-browser sandbox
(a larger infrastructure decision, not made in this phase); Java needs the same guided-local-lab
treatment; the testing/QA courses are largely guided-exercise and code-tracing courses that don't
need a new runner at all.

**Phase 5C (documented plan, not built):** TypeScript Compiler React (deferred further), Backend
Architecture Fundamentals, Spring Boot, Data Analysis with Python and Pandas, Machine Learning
Foundations, Test Automation Framework Engineering, Performance and Security Testing Foundations,
Linux and Shell Fundamentals, Docker, Continuous Integration and Delivery, Cloud Fundamentals,
Kubernetes Fundamentals, Prompt Engineering (dedicated course), Advanced RAG, Generative AI
Application Engineering, LLM Evaluation/Safety/Observability, and the full Placement and Career
Preparation track (Quantitative Aptitude, Logical Reasoning, Verbal Ability, Interview/GD
Preparation, Timed Placement Mock Tests).

## Complete guide-to-course coverage matrix

Every one of the 80 public technology guides, computed from the live registry (not retyped by
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

| Technology | Difficulty   | Course                | Runner | Project(s)              | Batch / reason                                                                                             |
| ---------- | ------------ | --------------------- | ------ | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| Angular    | advanced     | —                     | —      | —                       | 5C (framework tier, after React)                                                                           |
| AngularJS  | intermediate | —                     | —      | —                       | Reference-only: legacy, `legacyNote` explains current status; no course planned                            |
| Bootstrap  | beginner     | —                     | —      | —                       | Reference-only: a CSS library, taught in context within HTML & CSS Fundamentals rather than its own course |
| CSS        | beginner     | html-css-fundamentals | html   | personal-portfolio-page | ✅ available                                                                                               |
| HTML       | beginner     | html-css-fundamentals | html   | personal-portfolio-page | ✅ available                                                                                               |
| jQuery     | beginner     | —                     | —      | —                       | Reference-only: legacy pattern, superseded by native DOM APIs taught in JavaScript Fundamentals            |
| Next.js    | intermediate | —                     | —      | —                       | 5C (after React)                                                                                           |
| React      | intermediate | —                     | —      | —                       | 5B                                                                                                         |
| Sass       | intermediate | —                     | —      | —                       | Reference-only: a CSS preprocessor; core concepts already covered by CSS Fundamentals                      |
| Vue        | intermediate | —                     | —      | —                       | 5C (framework tier, after React)                                                                           |
| W3.CSS     | beginner     | —                     | —      | —                       | Reference-only: attributed to its creator (W3Schools), not a course candidate                              |

### Backend Development (10)

| Technology    | Difficulty   | Course       | Runner | Project(s)              | Batch / reason                               |
| ------------- | ------------ | ------------ | ------ | ----------------------- | -------------------------------------------- |
| .NET          | intermediate | —            | —      | —                       | 5C or later (not yet scheduled)              |
| ASP.NET       | intermediate | —            | —      | —                       | 5C or later (after .NET)                     |
| Django        | intermediate | —            | —      | —                       | 5C or later (after a Python backend course)  |
| Express       | intermediate | —            | —      | —                       | 5B (with Node.js)                            |
| GraphQL       | intermediate | —            | —      | —                       | 5C (after REST APIs)                         |
| Microservices | advanced     | —            | —      | —                       | 5C (after Backend Architecture Fundamentals) |
| Node.js       | intermediate | —            | —      | —                       | 5B                                           |
| REST APIs     | beginner     | git-apis-sql | —      | api-powered-weather-app | ✅ available                                 |
| Spring Boot   | advanced     | —            | —      | —                       | 5C (after Java)                              |
| System Design | advanced     | —            | —      | —                       | 5C (after Backend Architecture Fundamentals) |

### Programming Languages (10)

| Technology | Difficulty   | Course                  | Runner     | Project(s)           | Batch / reason                                                                                                         |
| ---------- | ------------ | ----------------------- | ---------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| C          | intermediate | —                       | —          | —                    | Reference-only: no browser-executable runtime available; would need a guided-local-lab treatment not scoped this phase |
| C#         | intermediate | —                       | —          | —                    | 5C or later (after .NET)                                                                                               |
| C++        | advanced     | —                       | —          | —                    | Reference-only: same runtime constraint as C                                                                           |
| Go         | intermediate | —                       | —          | —                    | 5C or later (not yet scheduled)                                                                                        |
| Java       | intermediate | —                       | —          | —                    | 5B                                                                                                                     |
| JavaScript | beginner     | javascript-fundamentals | javascript | interactive-quiz-app | ✅ available                                                                                                           |
| PHP        | beginner     | —                       | —          | —                    | 5C or later (not yet scheduled)                                                                                        |
| Python     | beginner     | python-fundamentals     | python     | expense-tracker-cli  | ✅ available                                                                                                           |
| Rust       | advanced     | —                       | —          | —                    | 5C or later (not yet scheduled)                                                                                        |
| TypeScript | intermediate | typescript-foundations  | typescript | typed-study-tracker  | ✅ available (Phase 5A)                                                                                                |

### Mobile Development (4)

| Technology   | Difficulty   | Course | Runner | Project(s) | Batch / reason                                                                                           |
| ------------ | ------------ | ------ | ------ | ---------- | -------------------------------------------------------------------------------------------------------- |
| Flutter      | intermediate | —      | —      | —          | 5C or later — mobile courses need a guided-local-lab or simulator-based treatment, not scoped this phase |
| Kotlin       | intermediate | —      | —      | —          | 5C or later (after Java, if a native-Android course is planned)                                          |
| React Native | intermediate | —      | —      | —          | 5C or later (after React)                                                                                |
| Swift        | intermediate | —      | —      | —          | 5C or later — same constraint as Flutter                                                                 |

### Databases (5)

| Technology | Difficulty   | Course       | Runner | Project(s) | Batch / reason                                                                                                                                                                                      |
| ---------- | ------------ | ------------ | ------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MongoDB    | beginner     | —            | —      | —          | 5C or later (a document-database course, distinct from the SQL/relational track)                                                                                                                    |
| MySQL      | beginner     | —            | —      | —          | Reference-only: SQL Tables/Filtering/Aggregation lessons in Git, APIs & SQL teach transferable relational-SQL skills; sql.js (SQLite dialect) is this platform's one browser-executable SQL runtime |
| PostgreSQL | beginner     | —            | —      | —          | 5B (Database Design and PostgreSQL) — needs a guided-local-lab treatment, since sql.js cannot execute Postgres-specific syntax                                                                      |
| Redis      | intermediate | —            | —      | —          | 5C or later (not yet scheduled)                                                                                                                                                                     |
| SQL        | beginner     | git-apis-sql | sql    | —          | ✅ available                                                                                                                                                                                        |

### Data Science and Analytics (7)

| Technology   | Difficulty   | Course | Runner | Project(s) | Batch / reason                                                                                                                        |
| ------------ | ------------ | ------ | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Data Science | intermediate | —      | —      | —          | 5C (Data Analysis with Python and Pandas)                                                                                             |
| Excel        | beginner     | —      | —      | —          | Reference-only: proprietary desktop software, not browser-executable                                                                  |
| NumPy        | intermediate | —      | —      | —          | 5C (with Pandas)                                                                                                                      |
| Pandas       | intermediate | —      | —      | —          | 5C (Data Analysis with Python and Pandas) — Pyodide can load pandas as a package, making this a genuinely feasible interactive course |
| R            | intermediate | —      | —      | —          | 5C or later (no browser runtime; guided-local-lab candidate)                                                                          |
| SciPy        | advanced     | —      | —      | —          | 5C or later (with NumPy/Pandas)                                                                                                       |
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
| MLOps                          | advanced     | —              | —                                                  | 5C or later (after applied ML)                               |
| Prompt Engineering             | beginner     | ai-foundations | —                                                  | ✅ available (lesson-level); a dedicated deeper course is 5C |
| Responsible AI                 | advanced     | —              | —                                                  | 5C (LLM Evaluation, Safety, and Observability)               |
| Retrieval-Augmented Generation | intermediate | ai-foundations | semantic-search-mini-app, document-qa-rag-capstone | ✅ available                                                 |

### Cloud and DevOps (8)

| Technology     | Difficulty   | Course | Runner | Project(s) | Batch / reason                           |
| -------------- | ------------ | ------ | ------ | ---------- | ---------------------------------------- |
| AWS            | intermediate | —      | —      | —          | 5C (Cloud Fundamentals)                  |
| Azure          | intermediate | —      | —      | —          | 5C (Cloud Fundamentals)                  |
| CI/CD          | intermediate | —      | —      | —          | 5C (Continuous Integration and Delivery) |
| Docker         | intermediate | —      | —      | —          | 5C                                       |
| GitHub Actions | intermediate | —      | —      | —          | 5C (with CI/CD)                          |
| Google Cloud   | intermediate | —      | —      | —          | 5C (Cloud Fundamentals)                  |
| Kubernetes     | advanced     | —      | —      | —          | 5C (after Docker)                        |
| Terraform      | advanced     | —      | —      | —          | 5C or later (after Cloud Fundamentals)   |

### Cybersecurity (1)

| Technology    | Difficulty   | Course | Runner | Project(s) | Batch / reason                                                                                                                |
| ------------- | ------------ | ------ | ------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Cybersecurity | intermediate | —      | —      | —          | 5C or later — needs a guided-exercise/scenario-based treatment (this platform never executes exploit code); not yet scheduled |

### Software Testing and QA (5)

| Technology                    | Difficulty   | Course | Runner | Project(s) | Batch / reason                                                                             |
| ----------------------------- | ------------ | ------ | ------ | ---------- | ------------------------------------------------------------------------------------------ |
| API Testing                   | beginner     | —      | —      | —          | 5B (API Testing and Automation)                                                            |
| Playwright                    | intermediate | —      | —      | —          | 5B (Playwright Web Automation) — guided-exercise/code-tracing format, no new runner needed |
| Postman                       | beginner     | —      | —      | —          | 5B (with API Testing and Automation)                                                       |
| Selenium                      | intermediate | —      | —      | —          | 5B (Selenium Web Automation)                                                               |
| Software Testing Fundamentals | beginner     | —      | —      | —          | 5B (Software Testing Foundations)                                                          |

### Data Structures and Algorithms (1)

| Technology                     | Difficulty   | Course | Runner | Project(s) | Batch / reason                                                                                                |
| ------------------------------ | ------------ | ------ | ------ | ---------- | ------------------------------------------------------------------------------------------------------------- |
| Data Structures and Algorithms | intermediate | —      | —      | —          | 5B — genuinely executable today (JavaScript or Python runner, algorithm exercises need no new infrastructure) |

### Developer Tools (4)

| Technology      | Difficulty   | Course       | Runner | Project(s)                 | Batch / reason                                                                                                     |
| --------------- | ------------ | ------------ | ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Bash            | beginner     | —            | —      | —                          | 5C (Linux and Shell Fundamentals) — needs a guided-local-lab treatment, no in-browser shell exists                 |
| Developer Tools | beginner     | —            | —      | —                          | Reference-only: a guide to browser DevTools, already linked to the HTML/CSS/JS Playground as a practice suggestion |
| Git             | beginner     | git-apis-sql | —      | git-collaboration-workflow | ✅ available                                                                                                       |
| Linux           | intermediate | —            | —      | —                          | 5C (Linux and Shell Fundamentals)                                                                                  |

**Summary:** 80 public technologies; 18 map to a real course (17 pre-Phase-5A + TypeScript);
7 more map to a runner or project without a full course (unchanged from Phase 3/4); 8 have an
explicit, documented reference-only reason (not a course candidate at all); the remaining ~47 are
genuinely planned for Phase 5B/5C, listed above with their batch.
