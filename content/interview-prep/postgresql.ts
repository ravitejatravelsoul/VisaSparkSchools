import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Database Design and PostgreSQL interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics
 * (relational modeling, normalization, PostgreSQL types/DDL, joins,
 * subqueries/CTEs, window functions, transactions/isolation, indexing,
 * roles, migrations) at the "beyond basic SELECT" level the course
 * assumes.
 */
export const postgresqlInterviewQuestions: InterviewQuestionInput[] = [
  // --- Relational Modeling & Normalization (10) ---
  {
    id: "pg-interview-modeling-01",
    courseSlug: "database-design-and-postgresql",
    question: "What is a primary key, and why must it be both unique and non-null?",
    answer:
      "A primary key uniquely identifies each row in a table. It must be unique so no two rows are ambiguous, and non-null because a missing identifier can't reliably distinguish or reference that row from elsewhere.",
    category: "Relational Modeling & Normalization",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-modeling-02",
    courseSlug: "database-design-and-postgresql",
    question: "What is a foreign key, and what does it enforce?",
    answer:
      "A column (or set of columns) referencing another table's primary/unique key -- it enforces referential integrity, preventing a row from pointing to a parent row that doesn't exist (or, depending on the configured action, controlling what happens if that parent row is deleted).",
    category: "Relational Modeling & Normalization",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-modeling-03",
    courseSlug: "database-design-and-postgresql",
    question: "What is a functional dependency, and why does it matter for normalization?",
    answer:
      "A functional dependency exists when one column's value determines another's (e.g. `zip_code` determines `city`). Normalization rules are defined in terms of eliminating dependencies that don't rely on the whole primary key, to avoid redundant, inconsistency-prone data.",
    category: "Relational Modeling & Normalization",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-modeling-04",
    courseSlug: "database-design-and-postgresql",
    question: "What does First Normal Form (1NF) require?",
    answer:
      "Every column must hold a single, atomic value (no repeating groups or comma-separated lists stuffed into one column), and each row must be uniquely identifiable.",
    category: "Relational Modeling & Normalization",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-modeling-05",
    courseSlug: "database-design-and-postgresql",
    question: "What does Second Normal Form (2NF) eliminate, and when is it only relevant?",
    answer:
      "2NF eliminates partial dependencies, where a non-key column depends on only part of a composite primary key rather than the whole key -- it's only a meaningful concern for tables with a composite (multi-column) primary key.",
    category: "Relational Modeling & Normalization",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-modeling-06",
    courseSlug: "database-design-and-postgresql",
    question: "What does Third Normal Form (3NF) eliminate?",
    answer:
      "Transitive dependencies, where a non-key column depends on another non-key column rather than directly on the primary key -- e.g. storing both `employee.department_id` and `employee.department_name` when `department_name` really depends on `department_id`, not on the employee.",
    category: "Relational Modeling & Normalization",
    difficulty: "advanced",
    commonMistake:
      "Storing a derived/dependent attribute (like department_name) directly on a row instead of looking it up through its proper foreign key relationship.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-modeling-07",
    courseSlug: "database-design-and-postgresql",
    question: "What is denormalization, and when might it be a deliberate, justified tradeoff?",
    answer:
      "Intentionally introducing redundancy (duplicating or precomputing data) that a fully normalized schema wouldn't have, typically to avoid expensive joins/aggregations on frequently-read, rarely-changed data -- a justified tradeoff when read performance genuinely matters more than the added complexity of keeping the duplicate in sync.",
    category: "Relational Modeling & Normalization",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-modeling-08",
    courseSlug: "database-design-and-postgresql",
    question:
      "What is the difference between cardinality and optionality in an entity relationship?",
    answer:
      "Cardinality describes how many of one entity relate to how many of another (one-to-one, one-to-many, many-to-many); optionality describes whether that relationship is required or may be absent (e.g. must every order have a customer, or can it be null).",
    category: "Relational Modeling & Normalization",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-modeling-09",
    courseSlug: "database-design-and-postgresql",
    question: "How do you model a many-to-many relationship in a relational schema?",
    answer:
      "With a junction (join) table containing foreign keys referencing both related tables' primary keys -- e.g. a `students` and `courses` many-to-many relationship needs an `enrollments` table with `student_id` and `course_id` foreign keys.",
    category: "Relational Modeling & Normalization",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-modeling-10",
    courseSlug: "database-design-and-postgresql",
    question:
      "Why is modeling entities and relationships on paper (or a diagram) before writing any SQL considered good practice?",
    answer:
      "It surfaces cardinality, optionality, and normalization questions early, when they're cheap to change -- discovering a modeling mistake after a schema is populated with real data and referenced by application code is far more expensive to fix.",
    category: "Relational Modeling & Normalization",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Data Types, Constraints & DDL (10) ---
  {
    id: "pg-interview-ddl-01",
    courseSlug: "database-design-and-postgresql",
    question: "What is the difference between `VARCHAR(n)`, `TEXT`, and `CHAR(n)` in PostgreSQL?",
    answer:
      "`VARCHAR(n)` limits length to n characters; `TEXT` has no length limit; `CHAR(n)` is fixed-length, padding shorter values with spaces. In PostgreSQL specifically, `TEXT` and unconstrained `VARCHAR` have essentially identical performance, so `TEXT` is commonly preferred unless a specific length constraint is meaningful.",
    category: "Data Types, Constraints & DDL",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ddl-02",
    courseSlug: "database-design-and-postgresql",
    question:
      "What is the difference between `NUMERIC`/`DECIMAL` and `FLOAT`/`DOUBLE PRECISION`, and when does it matter?",
    answer:
      "`NUMERIC` stores exact decimal values with no rounding error, at some performance cost; `FLOAT`/`DOUBLE PRECISION` use approximate binary floating-point representation, which can introduce small rounding errors. Money and other exact-precision values should use `NUMERIC`, not floating-point types.",
    category: "Data Types, Constraints & DDL",
    difficulty: "advanced",
    commonMistake:
      "Storing monetary amounts as FLOAT/DOUBLE PRECISION, introducing rounding errors that accumulate over calculations.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ddl-03",
    courseSlug: "database-design-and-postgresql",
    question:
      "What does a `NOT NULL` constraint enforce, and what happens to an `INSERT` that omits a required column with no default?",
    answer:
      "It rejects any row where that column's value would be `NULL`. If a column is `NOT NULL` with no `DEFAULT` and the `INSERT` doesn't provide a value, the statement fails with a constraint violation.",
    category: "Data Types, Constraints & DDL",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ddl-04",
    courseSlug: "database-design-and-postgresql",
    question: "What is the difference between a `UNIQUE` constraint and a `PRIMARY KEY`?",
    answer:
      "Both enforce uniqueness, but a table can have only one primary key (which also implies `NOT NULL`), while it can have multiple `UNIQUE` constraints, and a `UNIQUE` column can generally still allow `NULL` values (with `NULL` not considered equal to another `NULL` for uniqueness purposes).",
    category: "Data Types, Constraints & DDL",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ddl-05",
    courseSlug: "database-design-and-postgresql",
    question: "What does a `CHECK` constraint let you enforce that `NOT NULL`/`UNIQUE` cannot?",
    answer:
      "An arbitrary boolean expression a row must satisfy -- e.g. `CHECK (price >= 0)` -- enforcing domain-specific business rules directly at the database level, not just presence or uniqueness.",
    category: "Data Types, Constraints & DDL",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ddl-06",
    courseSlug: "database-design-and-postgresql",
    question:
      "Why must dependency-ordered DDL be used when creating multiple related tables (e.g. creating `orders` before `order_items`)?",
    answer:
      "A table with a foreign key referencing another table can't be created until the referenced table (and its referenced key) already exists -- creating tables out of dependency order causes the foreign key constraint definition to fail.",
    category: "Data Types, Constraints & DDL",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ddl-07",
    courseSlug: "database-design-and-postgresql",
    question:
      "What is the difference between `ON DELETE CASCADE` and `ON DELETE RESTRICT` on a foreign key?",
    answer:
      "`CASCADE` automatically deletes dependent child rows when the referenced parent row is deleted; `RESTRICT` (the typical default-like behavior) instead blocks the deletion of the parent row entirely while dependent child rows still exist.",
    category: "Data Types, Constraints & DDL",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ddl-08",
    courseSlug: "database-design-and-postgresql",
    question: "What is a `SERIAL` (or `GENERATED ... AS IDENTITY`) column used for?",
    answer:
      "An auto-incrementing integer column, commonly used for surrogate primary keys, where PostgreSQL automatically assigns the next sequential value on insert if none is explicitly provided.",
    category: "Data Types, Constraints & DDL",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ddl-09",
    courseSlug: "database-design-and-postgresql",
    question: "What is the difference between `TIMESTAMP` and `TIMESTAMPTZ` in PostgreSQL?",
    answer:
      "`TIMESTAMPTZ` stores the value normalized to UTC internally and converts to the session's time zone on display; plain `TIMESTAMP` stores the literal value with no time zone awareness at all, which can cause subtle bugs when data spans multiple time zones.",
    category: "Data Types, Constraints & DDL",
    difficulty: "advanced",
    commonMistake:
      "Using plain TIMESTAMP for data accessed across multiple time zones, causing values to be misinterpreted depending on the reading session's local time zone assumptions.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ddl-10",
    courseSlug: "database-design-and-postgresql",
    question:
      "What is PostgreSQL's `JSONB` type useful for, and how does it differ from plain `JSON`?",
    answer:
      "`JSONB` stores JSON in a decomposed binary format that supports indexing and efficient querying of nested fields; plain `JSON` stores the exact input text and re-parses it on every read, with no indexing support -- `JSONB` is generally preferred unless preserving exact original formatting/key order matters.",
    category: "Data Types, Constraints & DDL",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Querying: Joins, Subqueries & Window Functions (10) ---
  {
    id: "pg-interview-querying-01",
    courseSlug: "database-design-and-postgresql",
    question: "What is the difference between an `INNER JOIN` and a `LEFT JOIN`?",
    answer:
      "`INNER JOIN` returns only rows with a match in both tables; `LEFT JOIN` returns every row from the left table, with `NULL`s filled in for unmatched right-table columns when no match exists.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-querying-02",
    courseSlug: "database-design-and-postgresql",
    question:
      "What is a Common Table Expression (CTE), and what advantage does it offer over a nested subquery?",
    answer:
      "A `WITH name AS (SELECT ...)` block that names a query result for reuse later in the same statement -- it can improve readability of complex queries by breaking them into named, sequential steps, compared to deeply nested subqueries.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "intermediate",
    codeExample:
      "WITH recent_orders AS (\n  SELECT * FROM orders WHERE created_at > NOW() - INTERVAL '30 days'\n)\nSELECT customer_id, COUNT(*) FROM recent_orders GROUP BY customer_id;",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-querying-03",
    courseSlug: "database-design-and-postgresql",
    question: "What is a correlated subquery, and why can it be slower than an equivalent join?",
    answer:
      "A subquery that references a column from the outer query, meaning it's conceptually re-evaluated once per outer row -- an equivalent join often lets the query planner process the data in a single set-based pass instead.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-querying-04",
    courseSlug: "database-design-and-postgresql",
    question: "What does a window function let you do that `GROUP BY` cannot?",
    answer:
      "A window function (`OVER (...)`) computes an aggregate or ranking across a set of related rows while still returning one row per original row -- `GROUP BY` collapses rows into one row per group, losing the individual row detail.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "advanced",
    codeExample:
      "SELECT name, salary, AVG(salary) OVER (PARTITION BY department) AS dept_avg FROM employees;",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-querying-05",
    courseSlug: "database-design-and-postgresql",
    question: "What is the difference between `RANK()` and `ROW_NUMBER()` window functions?",
    answer:
      "`ROW_NUMBER()` always assigns a unique, strictly sequential number to every row; `RANK()` assigns the same rank to tied rows (by the `ORDER BY` in the window) and then skips subsequent rank numbers accordingly.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-querying-06",
    courseSlug: "database-design-and-postgresql",
    question: "What is the difference between `WHERE` and `HAVING`?",
    answer:
      "`WHERE` filters individual rows before grouping/aggregation happens; `HAVING` filters groups after aggregation, so it's the correct clause to use when filtering on an aggregate result like `COUNT(*) > 5`.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "intermediate",
    commonMistake:
      "Trying to filter on an aggregate result (like COUNT(*)) using WHERE instead of HAVING.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-querying-07",
    courseSlug: "database-design-and-postgresql",
    question: "What is a self-join, and give a scenario where it's needed?",
    answer:
      "A join of a table with itself, used when rows in the same table relate to each other -- e.g. an `employees` table with a `manager_id` column referencing another row's `id`, requiring a self-join to list each employee alongside their manager's name.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-querying-08",
    courseSlug: "database-design-and-postgresql",
    question: "What is the difference between `UNION` and `UNION ALL`?",
    answer:
      "`UNION` combines two result sets and removes duplicate rows (requiring an implicit sort/dedup pass); `UNION ALL` combines them without deduplication, which is faster when duplicates are known not to occur or are acceptable.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-querying-09",
    courseSlug: "database-design-and-postgresql",
    question:
      "Why can `SELECT *` in application code be a maintainability risk, even though it works?",
    answer:
      "It implicitly depends on the table's exact current column set and order; adding, removing, or reordering columns later can silently break application code relying on positional access or an unexpectedly-included new column, whereas naming columns explicitly makes the query's real dependency clear.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-querying-10",
    courseSlug: "database-design-and-postgresql",
    question: "What does `EXPLAIN` show you about a query, and what does `EXPLAIN ANALYZE` add?",
    answer:
      "`EXPLAIN` shows the query planner's chosen execution plan (which scans, joins, and estimated costs it will use) without running the query; `EXPLAIN ANALYZE` actually executes the query and adds real timing and row-count data alongside the plan, letting you compare estimated vs. actual behavior.",
    category: "Querying: Joins, Subqueries & Window Functions",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Transactions, Concurrency & Indexing (10) ---
  {
    id: "pg-interview-transactions-01",
    courseSlug: "database-design-and-postgresql",
    question: "What does ACID stand for, and briefly, what does each guarantee?",
    answer:
      "Atomicity (a transaction's operations all succeed or all roll back together), Consistency (a transaction moves the database from one valid state to another), Isolation (concurrent transactions don't see each other's uncommitted changes, per the chosen isolation level), Durability (once committed, a transaction's changes survive a crash).",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-transactions-02",
    courseSlug: "database-design-and-postgresql",
    question: "What is a 'dirty read,' and does PostgreSQL's default isolation level allow it?",
    answer:
      "A dirty read occurs when a transaction reads another transaction's uncommitted (and possibly later rolled-back) changes. PostgreSQL's default isolation level, Read Committed, never allows dirty reads -- that anomaly is prevented even at the lowest isolation level PostgreSQL supports.",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-transactions-03",
    courseSlug: "database-design-and-postgresql",
    question: "What is a 'non-repeatable read,' and which isolation level(s) prevent it?",
    answer:
      "When a transaction reads the same row twice and gets different values because another transaction committed a change to that row in between -- PostgreSQL's Repeatable Read and Serializable isolation levels prevent this; Read Committed does not.",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-transactions-04",
    courseSlug: "database-design-and-postgresql",
    question: "What is a lost update, and how does `SELECT ... FOR UPDATE` help prevent it?",
    answer:
      "A lost update happens when two transactions both read the same row, then both write back an update based on that stale read, and the second write silently overwrites the first's change. `SELECT ... FOR UPDATE` locks the selected row(s), blocking a second transaction from reading (for update purposes) or updating them until the first transaction commits or rolls back.",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "advanced",
    commonMistake:
      "Reading a row's current value, computing a new value in application code, then writing it back without any locking, allowing a concurrent update to be silently overwritten.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-transactions-05",
    courseSlug: "database-design-and-postgresql",
    question:
      "What does `ROLLBACK` do, and why is wrapping multiple related writes in a single transaction important?",
    answer:
      "`ROLLBACK` undoes every change made since the transaction began, restoring the database as if none of them happened. Wrapping related writes in one transaction ensures they succeed or fail together, so a partial failure (e.g. crash mid-way) can never leave data in an inconsistent, half-applied state.",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-transactions-06",
    courseSlug: "database-design-and-postgresql",
    question: "What is an index, and what tradeoff does adding one introduce?",
    answer:
      "A separate data structure (commonly a B-tree) that lets PostgreSQL find matching rows without scanning the whole table -- it speeds up reads on the indexed column(s) but adds storage overhead and slows down writes, since every insert/update/delete must also maintain the index.",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-transactions-07",
    courseSlug: "database-design-and-postgresql",
    question:
      "Why might adding an index to every column 'just in case' actually hurt overall performance?",
    answer:
      "Every additional index adds write overhead (each insert/update/delete must update every relevant index) and storage cost, without necessarily being used by any real query -- indexes should be added deliberately based on actual query patterns, not preemptively on everything.",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "advanced",
    commonMistake:
      "Adding an index to every column speculatively, adding write overhead without a corresponding read benefit for columns that are never actually filtered or joined on.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-transactions-08",
    courseSlug: "database-design-and-postgresql",
    question: "What is a database view, and how does it differ from a materialized view?",
    answer:
      "A regular view is a stored, named query that re-executes against live data every time it's queried; a materialized view stores its result set physically on disk at creation/refresh time, serving stale-but-fast results until explicitly refreshed.",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-transactions-09",
    courseSlug: "database-design-and-postgresql",
    question: "What is the principle of least privilege as applied to database roles?",
    answer:
      "Grant each application role (or user) only the specific permissions it actually needs (e.g. `SELECT`/`INSERT` on certain tables) rather than broad admin/superuser access, limiting the damage a compromised credential or a buggy query can cause.",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-transactions-10",
    courseSlug: "database-design-and-postgresql",
    question:
      "Why should schema migrations be written as small, ordered, reversible steps rather than one large ad hoc script run manually against production?",
    answer:
      "Ordered, version-controlled migrations can be applied consistently and repeatably across environments (dev, staging, production), reviewed before running, and rolled back if a step fails -- an ad hoc manual script run once against production leaves no reliable record of what changed or how to undo it.",
    category: "Transactions, Concurrency & Indexing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Operations, Backup & Recovery (10) ---
  {
    id: "pg-interview-ops-01",
    courseSlug: "database-design-and-postgresql",
    question: "What is the difference between a logical backup (`pg_dump`) and a physical backup?",
    answer:
      "A logical backup (`pg_dump`) exports the database's data and schema as portable SQL/archive output, restorable even to a different PostgreSQL version; a physical backup copies the actual on-disk data files, faster for very large databases but generally tied to the same major version and configuration.",
    category: "Operations, Backup & Recovery",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ops-02",
    courseSlug: "database-design-and-postgresql",
    question: "Why is 'we have backups' alone not a complete disaster-recovery plan?",
    answer:
      "A real recovery plan also needs a tested, documented restore procedure and a known recovery time -- backups that have never actually been restored in practice can turn out to be corrupted, incomplete, or too slow to restore within an acceptable downtime window when actually needed.",
    category: "Operations, Backup & Recovery",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ops-03",
    courseSlug: "database-design-and-postgresql",
    question: "What is Recovery Point Objective (RPO), and how does backup frequency relate to it?",
    answer:
      'RPO is the maximum acceptable amount of data loss, measured in time (e.g. "at most 1 hour of data") -- more frequent backups (or continuous write-ahead-log archiving) reduce the RPO by shrinking the gap between the last backup and a failure.',
    category: "Operations, Backup & Recovery",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ops-04",
    courseSlug: "database-design-and-postgresql",
    question: "What is a database migration tool typically responsible for tracking?",
    answer:
      "Which migrations have already been applied to a given database, usually via a dedicated metadata table -- this lets the tool apply only the new, not-yet-run migrations when deploying to an environment, rather than re-running everything.",
    category: "Operations, Backup & Recovery",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ops-05",
    courseSlug: "database-design-and-postgresql",
    question:
      "Why is adding a `NOT NULL` column with no default to a large, already-populated table a risky migration?",
    answer:
      "The migration must decide what value existing rows get -- without a default, it fails outright; even with a default, rewriting every existing row to add the new column can lock the table for a long time on a large table, blocking application traffic during the migration.",
    category: "Operations, Backup & Recovery",
    difficulty: "advanced",
    commonMistake:
      "Adding a NOT NULL column with no default to a large production table during business hours, causing a long table lock that blocks application queries.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ops-06",
    courseSlug: "database-design-and-postgresql",
    question:
      "What is connection pooling, and why does a typical PostgreSQL deployment need it under load?",
    answer:
      "A connection pooler (e.g. PgBouncer) reuses a limited set of actual database connections across many application requests, since each raw PostgreSQL connection has real memory/process overhead -- without pooling, a high-traffic application can exhaust the database's maximum connection limit.",
    category: "Operations, Backup & Recovery",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ops-07",
    courseSlug: "database-design-and-postgresql",
    question: "What does `VACUUM` do in PostgreSQL, and why is it necessary?",
    answer:
      "PostgreSQL's MVCC (multi-version concurrency control) model leaves old row versions behind after updates/deletes; `VACUUM` reclaims that space and updates statistics the query planner relies on -- without it, table bloat grows and query planning can become less accurate over time.",
    category: "Operations, Backup & Recovery",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ops-08",
    courseSlug: "database-design-and-postgresql",
    question:
      "Why should application database credentials avoid using a superuser role for everyday reads/writes?",
    answer:
      "A superuser role can bypass row-level security, alter any schema, and access any data -- if application credentials are compromised (e.g. via a SQL injection or leaked secret), a scoped least-privilege role limits the resulting damage far more than a superuser role would.",
    category: "Operations, Backup & Recovery",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ops-09",
    courseSlug: "database-design-and-postgresql",
    question: "What is a replica (standby) database, and what is it typically used for?",
    answer:
      "A copy of the database kept continuously synchronized with the primary via streaming replication -- typically used for read scaling (routing read-only queries to replicas) and/or failover (promoting a replica to primary if the original fails).",
    category: "Operations, Backup & Recovery",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pg-interview-ops-10",
    courseSlug: "database-design-and-postgresql",
    question:
      "Why is testing a schema migration against a staging environment with production-like data volume important, rather than only testing it against an empty or tiny local database?",
    answer:
      "A migration that runs instantly on a near-empty local table can lock or take an unacceptably long time on a table with millions of rows in production -- data-volume-dependent behavior (locking duration, index build time) often only surfaces at realistic scale.",
    category: "Operations, Backup & Recovery",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
