# Curriculum Matrix

> **This document describes the original six-track lesson curriculum only.** As of Phase 3, the
> platform also has a technology directory (~80 technology guides across 13 public categories) and
> 15 public learning roadmaps — a different, complementary content system with its own documents:
> see `docs/ARCHITECTURE.md`'s "Technology directory" section and `docs/CONTENT_AUTHORING.md`. A
> technology guide is explicitly not the same thing as a course in this matrix — most technologies
> below (HTML, CSS, JavaScript, Python, SQL, Git, AI/LLMs/RAG) now also have a directory guide
> page, honestly cross-linked to the real course described here; most technologies in the
> directory (React, Docker, Rust, etc.) have a guide only, with no course below.

One connected path, six tracks, 50 lessons, 172 knowledge-check questions, 100 exercises (one
guided + one independent per lesson), 6 guided projects, and 2 capstones. Every lesson includes:
objectives, prerequisites, a plain-language explanation, a working example, an editable example
(where a runner applies), a guided exercise, an independent exercise, common mistakes, a 3+
question knowledge check, a takeaway, a summary, and references.

Track order (each chains into the next via `nextLessonSlug`):
Foundations → HTML & CSS → JavaScript → Python → Git, APIs & SQL → AI, LLMs, RAG & Agents.

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

## Track 4 — Python (8 lessons)

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

## Track 5 — Git, APIs & SQL (8 lessons)

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

## Track 6 — AI, LLMs, RAG & Agents (14 lessons)

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
| Tracks                           | 6     |
| Courses                          | 6     |
| Lessons                          | 50    |
| Knowledge-check questions        | 172   |
| Exercises (guided + independent) | 100   |
| Guided projects                  | 6     |
| Capstones                        | 2     |

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
