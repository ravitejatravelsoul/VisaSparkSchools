import type { TechnologyInput } from "@/lib/directory/types";

export const databaseTechnologies: TechnologyInput[] = [
  {
    id: "sql",
    slug: "sql",
    name: "SQL",
    category: "databases",
    description: "The standard language for querying and modifying relational databases.",
    overview:
      "SQL (Structured Query Language) is the standard language for defining, querying, and modifying data in relational databases -- tables of rows and columns connected by keys. Every major relational database (PostgreSQL, MySQL, SQL Server, SQLite) speaks a dialect of SQL, so the core skills transfer directly.",
    whatItIs: "A declarative language for querying and modifying data stored in tables.",
    whyItsUsed:
      "It's the near-universal interface to relational databases -- learning it once transfers across PostgreSQL, MySQL, SQL Server, and more.",
    whereItFits:
      "Wherever an application stores structured, related data -- covered directly in this platform's Git, APIs & SQL course.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["postgresql", "mysql"],
    coreConcepts: [
      "Tables, rows, and columns",
      "SELECT, WHERE, ORDER BY",
      "JOINs across tables",
      "INSERT, UPDATE, DELETE",
      "GROUP BY and aggregation",
    ],
    example: {
      language: "sql",
      code: `SELECT title, price\nFROM books\nWHERE price < 15\nORDER BY price DESC;`,
      explanation:
        "SQL is declarative: you describe what data you want (books under $15, most expensive first), and the database figures out how to retrieve it efficiently.",
    },
    useCases: ["Any application storing structured, related data", "Data analysis and reporting"],
    practiceOptions: [
      "Take the Git, APIs & SQL course",
      "Try the Playground's SQL tab (runs via sql.js, in-browser)",
    ],
    projectIdeas: [
      "Write queries against a small bookstore dataset: filtering, sorting, and joining authors to books",
    ],
    references: [
      {
        label: "MDN: Databases and SQL basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Django/Introduction",
      },
    ],
    searchKeywords: ["structured query language", "relational database", "queries"],
    status: "current",
    versionPolicy: "not-applicable",
    versionNotes:
      "SQL is standardized (ISO/IEC 9075) but every database adds its own extensions -- the core SELECT/WHERE/JOIN vocabulary is portable, advanced features often aren't.",
    lastReviewed: "2026-08-01",
    courseId: "git-apis-sql",
    runnerSupport: "sql",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "mysql",
    slug: "mysql",
    name: "MySQL",
    category: "databases",
    description: "One of the most widely deployed open-source relational databases.",
    overview:
      "MySQL is a widely used open-source relational database, historically paired with PHP (the 'M' in the LAMP stack) and still extremely common in web hosting and WordPress deployments. It implements standard SQL with some of its own extensions and defaults.",
    whatItIs: "An open-source relational database management system (RDBMS).",
    whyItsUsed:
      "Wide hosting support, a mature ecosystem, and long-standing popularity in the PHP/WordPress world.",
    whereItFits:
      "One of several concrete SQL database engines -- the SQL you learn transfers here directly.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["sql"],
    relatedIds: ["sql", "postgresql", "php"],
    coreConcepts: [
      "Storage engines (InnoDB)",
      "Indexes",
      "User privileges",
      "Standard SQL with MySQL-specific extensions",
    ],
    example: {
      language: "sql",
      code: `CREATE TABLE books (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  title VARCHAR(200) NOT NULL\n);`,
      explanation:
        "AUTO_INCREMENT is a MySQL-specific way to generate sequential IDs -- PostgreSQL uses a different mechanism (SERIAL or IDENTITY) for the same idea, illustrating how SQL dialects diverge on specifics.",
    },
    useCases: [
      "WordPress and PHP-based web applications",
      "General-purpose relational data storage",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Set up a local MySQL database and recreate the bookstore schema used in this platform's SQL lessons",
    ],
    references: [
      { label: "MySQL official reference manual", url: "https://dev.mysql.com/doc/refman/en/" },
    ],
    searchKeywords: ["relational database", "rdbms", "lamp stack"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "8.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "postgresql",
    slug: "postgresql",
    name: "PostgreSQL",
    category: "databases",
    description: "A powerful, standards-compliant open-source relational database.",
    overview:
      "PostgreSQL is an open-source relational database known for strict SQL standards compliance, advanced features (JSON columns, full-text search, extensibility), and reliability -- a common default choice for new production applications.",
    whatItIs: "An open-source, standards-compliant relational database management system.",
    whyItsUsed:
      "For its correctness, advanced feature set (JSONB columns, window functions, extensions), and strong reputation for reliability.",
    whereItFits:
      "One of several concrete SQL database engines; this platform's own Supabase integration (when configured) is built on PostgreSQL.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["sql"],
    relatedIds: ["sql", "mysql"],
    coreConcepts: [
      "Standard SQL plus extensions (JSONB, arrays)",
      "Indexes",
      "Row Level Security",
      "Transactions",
    ],
    example: {
      language: "sql",
      code: `CREATE TABLE books (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  title TEXT NOT NULL\n);`,
      explanation:
        "gen_random_uuid() generates a non-sequential unique ID -- a common PostgreSQL pattern (used throughout this platform's own database schema) for IDs that shouldn't reveal creation order.",
    },
    useCases: [
      "Production application databases",
      "Analytical workloads needing advanced SQL features",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Recreate the bookstore schema from this platform's SQL lessons in a local PostgreSQL instance",
    ],
    references: [
      { label: "PostgreSQL official documentation", url: "https://www.postgresql.org/docs/" },
    ],
    searchKeywords: ["relational database", "rdbms", "postgres"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "16.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "mongodb",
    slug: "mongodb",
    name: "MongoDB",
    category: "databases",
    description: "A document-oriented NoSQL database storing flexible, JSON-like records.",
    overview:
      "MongoDB stores data as flexible, JSON-like documents rather than rows in fixed-schema tables, trading some of relational SQL's structure and join capability for schema flexibility -- useful when a data model varies significantly between records or evolves quickly.",
    whatItIs: "A document-oriented NoSQL database storing data as BSON (binary JSON) documents.",
    whyItsUsed:
      "For flexible or rapidly evolving data models, or data that's naturally document-shaped (nested, variable fields) rather than tabular.",
    whereItFits:
      "An alternative to a relational database when the data model doesn't fit neatly into fixed tables and relationships.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["sql", "nodejs"],
    coreConcepts: [
      "Documents and collections",
      "BSON/JSON-like structure",
      "Querying with a query object, not SQL",
      "Indexes",
    ],
    example: {
      language: "javascript",
      code: `db.books.insertOne({ title: "Example", price: 12.99, tags: ["fiction"] });\ndb.books.find({ price: { $lt: 15 } });`,
      explanation:
        "Documents can have nested arrays/objects (tags here) without a fixed schema -- unlike a SQL table, two documents in the same collection can have different fields.",
    },
    useCases: [
      "Content management systems with varying content shapes",
      "Rapidly-prototyped applications",
      "Catalogs with variable per-item attributes",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Model the same bookstore data as SQL tables versus MongoDB documents, and compare how each handles a book with optional/variable fields",
    ],
    references: [
      { label: "MongoDB official documentation", url: "https://www.mongodb.com/docs/manual/" },
    ],
    searchKeywords: ["nosql", "document database", "bson"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "7.x/8.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "redis",
    slug: "redis",
    name: "Redis",
    category: "databases",
    subcategory: "cache",
    description: "An in-memory key-value store used for caching, sessions, and queues.",
    overview:
      "Redis is an in-memory data store (with optional persistence to disk) used primarily for caching, session storage, rate limiting, and simple message queues -- valued for its speed since data lives in RAM rather than on disk.",
    whatItIs:
      "An in-memory key-value data store, supporting strings, lists, sets, hashes, and more.",
    whyItsUsed:
      "For very fast reads/writes (caching a database query result, storing a user session, rate-limiting counters).",
    whereItFits:
      "Usually alongside a primary database, not replacing it -- Redis typically holds transient or derived data, not the system of record.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["sql"],
    relatedIds: ["sql", "postgresql"],
    coreConcepts: [
      "Key-value storage",
      "Data structures (lists, sets, hashes, sorted sets)",
      "Expiring keys (TTL)",
      "Pub/sub messaging",
    ],
    example: {
      language: "javascript",
      code: `SET session:abc123 "user-42" EX 3600\nGET session:abc123`,
      explanation:
        "EX 3600 sets a 60-minute expiration on the key -- a common pattern for session storage or rate-limiting counters where data should automatically disappear.",
    },
    useCases: [
      "Caching expensive database queries",
      "Session storage",
      "Rate limiting",
      "Simple job queues",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Design a caching layer (on paper) for an expensive database query, including how to invalidate the cache when the underlying data changes",
    ],
    references: [{ label: "Redis official documentation", url: "https://redis.io/docs/latest/" }],
    searchKeywords: ["cache", "in-memory database", "key-value store"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "7.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
