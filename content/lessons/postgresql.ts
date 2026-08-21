import type { LessonInput } from "@/lib/content/types";
import { BOOKSTORE_SEED_SQL } from "@/content/fixtures/sql-seed";

/**
 * Database Design and PostgreSQL.
 *
 * Builds on the SQL module in Git, APIs & SQL (content/lessons/git-api-sql.ts),
 * which teaches SELECT/JOIN/INSERT/UPDATE/DELETE/GROUP BY against this
 * platform's browser SQL runner -- SQLite (sql.js), NOT PostgreSQL. This
 * course is honest about that boundary throughout: lessons whose SQL is
 * genuinely dialect-compatible with SQLite (basic joins, aggregation,
 * subqueries, CTEs, and standard window-function syntax) use the real
 * browser SQL runner, with an explicit disclosure that the sandbox is
 * SQLite, not PostgreSQL. Lessons covering PostgreSQL-specific behavior --
 * data types (SERIAL/JSONB/UUID), transactions, isolation levels, indexes
 * and EXPLAIN, roles/privileges, and migrations -- use genuine,
 * browser-executable JavaScript/TypeScript exercises that model the
 * underlying decision or algorithm (exactly the same pattern used for
 * React, Node.js/Express, and Java in this platform's other courses),
 * because pretending SQLite's behavior proves anything about PostgreSQL's
 * would be dishonest. Three lessons additionally carry a guidedLocalLab for
 * real, local PostgreSQL work. Version assumption: PostgreSQL 16 (examples
 * remain valid on 17 and later).
 */
export const postgresqlLessons: LessonInput[] = [
  {
    id: "pg-relational-modeling",
    slug: "pg-relational-modeling",
    title: "Relational Modeling: Entities, Attributes, and Relationships",
    description:
      "Turning a real-world domain into entities, attributes, and relationships — and the cardinality/optionality questions that decide how those relationships are actually implemented.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 0,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: [],
    objectives: [
      "Identify entities and their attributes from a plain-language domain description",
      "Classify a relationship's cardinality (one-to-one, one-to-many, many-to-many) and optionality",
      "Explain why cardinality and optionality decisions directly determine table structure, before any SQL is written",
    ],
    skills: ["database-design", "relational-modeling"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — Chapter 5: Data Definition",
        url: "https://www.postgresql.org/docs/16/ddl.html",
      },
    ],
    keywords: ["relational modeling", "entities", "attributes", "cardinality", "database design"],
    explanation: `Relational modeling starts before any SQL is written, with three plain-language questions about a domain: what are the **entities** (the distinct "things" worth tracking — a Learner, a Course, an Enrollment), what **attributes** does each entity have (a Learner has a name and an email; a Course has a title and a duration), and how do entities **relate** to each other? Getting this modeling step right first is what separates a schema that fits the real domain from one that fights it — a rushed jump straight to \`CREATE TABLE\` statements tends to bake in structural mistakes that are expensive to unwind once real data and real application code depend on them.

Every relationship between two entities has a **cardinality** — how many of one entity can relate to how many of the other. **One-to-one** (a Learner has exactly one Profile) is genuinely the rarest of the three in practice, since it often means the two entities could simply be one table with more columns. **One-to-many** (one Course has many Lessons; each Lesson belongs to exactly one Course) is by far the most common shape in real schemas. **Many-to-many** (a Learner can enroll in many Courses, and a Course has many Learners) cannot be represented with a simple foreign key on either side — it requires a third, connecting table (a **junction table**, covered in the next lesson) whose rows each represent one specific pairing.

**Optionality** asks a related but distinct question: is the relationship *required* or *optional* on each side? "Every Enrollment must reference exactly one Learner and one Course" (required on both sides) versus "a Learner may or may not have written any Notes yet" (optional) are different constraints, and get expressed differently — a required relationship typically becomes a \`NOT NULL\` foreign key; an optional one allows \`NULL\`. Getting cardinality and optionality right for every relationship, before writing a single \`CREATE TABLE\`, is what this lesson's exercises practice — because these decisions, made explicitly and correctly up front, directly determine which tables need a foreign key, which need a junction table, and which columns must reject a missing value.`,
    example: {
      language: "javascript",
      description:
        "Modeling entities/relationships/cardinality as data -- this is genuinely the design work, before any SQL exists.",
      code: `const domainModel = {
  entities: {
    Learner: { attributes: ["id", "name", "email"] },
    Course: { attributes: ["id", "title", "durationHours"] },
    Enrollment: { attributes: ["id", "enrolledAt"] },
  },
  relationships: [
    {
      between: ["Learner", "Enrollment"],
      cardinality: "one-to-many",       // one Learner, many Enrollments
      optionality: "Enrollment requires exactly one Learner",
    },
    {
      between: ["Course", "Enrollment"],
      cardinality: "one-to-many",       // one Course, many Enrollments
      optionality: "Enrollment requires exactly one Course",
    },
    {
      between: ["Learner", "Course"],
      cardinality: "many-to-many",       // via the Enrollment junction table
      optionality: "a Learner may have zero Courses; a Course may have zero Learners",
    },
  ],
};

console.log(domainModel.relationships.map(r => r.between.join(" <-> ") + ": " + r.cardinality));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a Note entity with a one-to-many relationship FROM Learner (a Learner can have many Notes), then print the updated relationship list.",
      code: `const relationships = [
  { between: ["Learner", "Enrollment"], cardinality: "one-to-many" },
];
console.log(relationships);`,
      editable: true,
    },
    guidedExercise: {
      id: "pg-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write classifyCardinality(description) modeling how you'd classify a plain-language relationship description. Return 'one-to-one' if description contains 'exactly one' on both sides (use the substring 'exactly one' appearing twice), 'many-to-many' if it contains 'many' twice, otherwise 'one-to-many'.",
      starterCode: `function classifyCardinality(description) {
  // TODO: count occurrences of "exactly one" and "many" in the description
}
`,
      solutionCode: `function classifyCardinality(description) {
  const exactlyOneCount = description.split("exactly one").length - 1;
  const manyCount = description.split("many").length - 1;
  if (exactlyOneCount >= 2) return "one-to-one";
  if (manyCount >= 2) return "many-to-many";
  return "one-to-many";
}`,
      harness: `
        try { window.__report('t1', classifyCardinality("a Learner has exactly one Profile, and a Profile belongs to exactly one Learner") === "one-to-one", 'should classify a mutual exactly-one relationship as one-to-one'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', classifyCardinality("a Learner can enroll in many Courses, and a Course has many Learners") === "many-to-many", 'should classify a mutual many relationship as many-to-many'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', classifyCardinality("a Course has many Lessons, each Lesson belongs to exactly one Course") === "one-to-many", 'should classify a mixed relationship as one-to-many'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "classifies a mutual one-to-one relationship" },
        { id: "t2", description: "classifies a mutual many-to-many relationship" },
        { id: "t3", description: "classifies a one-to-many relationship" },
      ],
      hints: [
        "This is a simplified, deliberately mechanical model of a judgment call a real designer makes by reading the domain description carefully.",
        "split(sub).length - 1 is a concise way to count substring occurrences in JS.",
      ],
    },
    independentExercise: {
      id: "pg-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write needsJunctionTable(cardinality) that returns true only for 'many-to-many' relationships (the case that cannot be represented with a simple foreign key on either side). Then write requiredForeignKeySide(cardinality) returning 'many' for one-to-many (the foreign key goes on the 'many' side), 'either' for one-to-one, or null for many-to-many (neither side alone can hold it).",
      starterCode: `function needsJunctionTable(cardinality) {
  // TODO
}
function requiredForeignKeySide(cardinality) {
  // TODO
}
`,
      solutionCode: `function needsJunctionTable(cardinality) {
  return cardinality === "many-to-many";
}
function requiredForeignKeySide(cardinality) {
  if (cardinality === "one-to-many") return "many";
  if (cardinality === "one-to-one") return "either";
  return null;
}`,
      harness: `
        try { window.__report('t1', needsJunctionTable("many-to-many") === true, 'many-to-many needs a junction table'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', needsJunctionTable("one-to-many") === false, 'one-to-many does not need a junction table'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', requiredForeignKeySide("one-to-many") === "many", 'the foreign key belongs on the many side'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', requiredForeignKeySide("many-to-many") === null, 'many-to-many has no single side that can hold the foreign key'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly requires a junction table for many-to-many" },
        { id: "t2", description: "correctly does not require one for one-to-many" },
        { id: "t3", description: "identifies the correct side for a one-to-many foreign key" },
        { id: "t4", description: "correctly reports no single valid side for many-to-many" },
      ],
      hints: [
        "A foreign key column can only ever point to ONE row on the other side -- that's exactly why many-to-many needs a third table.",
        "The 'many' side is the one that can have multiple rows referencing a single row on the 'one' side.",
      ],
    },
    commonMistakes: [
      "Jumping straight to CREATE TABLE statements without first identifying entities, attributes, and relationship cardinality -- this tends to bake in structural mistakes discovered only after real data and application code already depend on the schema.",
      "Trying to represent a many-to-many relationship with a foreign key on one of the two original tables -- a single foreign key column can only reference one row on the other side, which cannot express 'many Learners, many Courses' without a junction table.",
      "Confusing cardinality (how many) with optionality (is it required) -- a relationship can be one-to-many AND optional, or one-to-many AND required; these are two independent questions that both need answering.",
    ],
    quiz: [
      {
        id: "pg-q1-1",
        prompt:
          "Why can't a many-to-many relationship be represented with a foreign key on either of the two original tables?",
        choices: [
          "It's a limitation of PostgreSQL specifically",
          "A foreign key column holds a single reference to one row on the other side, which cannot express that many rows on each side relate to many rows on the other -- a separate junction table is required",
          "Many-to-many relationships don't actually exist in real domains",
          "It can be represented this way; a junction table is only a performance optimization",
        ],
        correctIndex: 1,
        explanation:
          "A single foreign key column inherently points to exactly one row. Many-to-many needs each PAIRING to be its own row somewhere, which is exactly what a junction table provides — one row per actual pairing, with a foreign key to each side.",
      },
      {
        id: "pg-q1-2",
        prompt: "What does 'optionality' describe, as distinct from cardinality?",
        choices: [
          "How many rows a table can have",
          "Whether a relationship is required or may legitimately be absent on a given side, independent of how many rows are involved",
          "The order columns appear in a table",
          "Optionality and cardinality are the same concept",
        ],
        correctIndex: 1,
        explanation:
          "Cardinality answers 'how many' (one-to-many, many-to-many); optionality answers a separate question, 'is this relationship required.' A one-to-many relationship can still be optional on the 'many' side (a Learner may have zero Notes) while being required on the other (a Note must belong to exactly one Learner).",
      },
      {
        id: "pg-q1-3",
        prompt:
          "Why is modeling entities and relationships in plain language BEFORE writing SQL a worthwhile step, rather than just writing CREATE TABLE directly?",
        choices: [
          "SQL cannot express relationships at all without this step",
          "It surfaces cardinality and optionality decisions explicitly while they're still cheap to change, before real data and application code make restructuring the schema expensive",
          "It's required by the SQL standard",
          "It has no real benefit; it's purely a documentation exercise",
        ],
        correctIndex: 1,
        explanation:
          "The structural decisions this step forces (is this many-to-many? is this side required?) become progressively more expensive to change once tables exist, contain real data, and application code depends on the current shape — catching a wrong cardinality assumption on paper is far cheaper than migrating a live table later.",
      },
    ],
    takeaway:
      "Identify entities, their attributes, and every relationship's cardinality and optionality in plain language before writing any SQL — these decisions directly determine which tables need a foreign key, which need a junction table, and which columns must be required.",
    summary:
      "Relational modeling identifies entities, attributes, and relationships. Cardinality (one-to-one, one-to-many, many-to-many) determines table structure; only many-to-many requires a junction table. Optionality (required vs. allowed to be absent) is a separate, equally important question for every relationship.",
    nextLessonSlug: "pg-keys-and-constraints",
  },
  {
    id: "pg-keys-and-constraints",
    slug: "pg-keys-and-constraints",
    title: "Primary Keys, Foreign Keys, and Constraints",
    description:
      "The identity guarantee a primary key provides, the referential-integrity guarantee a foreign key enforces, and the natural-vs-surrogate key decision every table forces you to make.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 1,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["pg-relational-modeling"],
    objectives: [
      "Explain what a primary key guarantees, and why every table needs exactly one",
      "Explain what a foreign key enforces, and what happens when that enforcement is violated",
      "Choose between a natural key and a surrogate key for a given entity, with reasoning",
    ],
    skills: ["database-design", "keys", "constraints"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — 5.4. Constraints",
        url: "https://www.postgresql.org/docs/16/ddl-constraints.html",
      },
    ],
    keywords: ["primary keys", "foreign keys", "constraints", "surrogate keys", "database design"],
    explanation: `A **primary key** is the column (or set of columns) that uniquely identifies every row in a table — no two rows may share a primary key value, and it may never be \`NULL\`, both enforced by the database itself, not by application code's discipline. Every table should have exactly one; without it, there's no reliable way to reference "this specific row" from anywhere else, including from a foreign key on another table.

A **foreign key** is a column on one table that must match an existing primary key value on another table (or be \`NULL\`, if the relationship is optional) — this is **referential integrity**: the database itself refuses to let \`Enrollment.learner_id\` reference a \`Learner\` row that doesn't exist, and by default refuses to delete a \`Learner\` row that's still referenced by an \`Enrollment\`, unless the foreign key is explicitly defined with an \`ON DELETE\` behavior (\`CASCADE\` deletes the dependent rows too; \`SET NULL\` clears the reference; \`RESTRICT\`, the safer default, blocks the deletion entirely) telling the database what should happen instead. This is a genuinely different, stronger guarantee than "the application always remembers to check" — a bug in application code can forget a check; a foreign key constraint physically cannot be bypassed by a normal \`INSERT\` or \`DELETE\`.

The **natural vs. surrogate key** decision comes up for nearly every entity: a **natural key** is an attribute that's already meaningful in the real world and happens to be unique (an email address, a national ID number); a **surrogate key** is an artificial identifier with no meaning outside the database, most commonly an auto-incrementing integer or a generated UUID. Natural keys have a real, recurring problem: values that seem permanently unique in the real world sometimes turn out not to be (an email address can be reused after an account is deleted; two organizations can independently issue the "same" natural-looking code), and a primary key value is expensive to change once other tables reference it via foreign keys. **Surrogate keys avoid this entirely** by never being meaningful outside the database, which is why they're the default, standard choice in most schema designs — reserving natural keys for genuinely permanent, verified-unique identifiers (like a properly-validated national tax ID in a system built specifically around it), and adding a separate \`UNIQUE\` constraint (not the primary key itself) on a natural-key-like column such as email when uniqueness still needs enforcing.`,
    example: {
      language: "javascript",
      description:
        "Referential integrity modeled as an explicit check -- what a real foreign key constraint enforces automatically, every time, without relying on application code remembering to check.",
      code: `function insertEnrollment(learners, courses, enrollments, newEnrollment) {
  const learnerExists = learners.some(l => l.id === newEnrollment.learnerId);
  const courseExists = courses.some(c => c.id === newEnrollment.courseId);
  if (!learnerExists) {
    throw new Error("foreign key violation: learner_id " + newEnrollment.learnerId + " does not exist");
  }
  if (!courseExists) {
    throw new Error("foreign key violation: course_id " + newEnrollment.courseId + " does not exist");
  }
  enrollments.push(newEnrollment);
  return enrollments;
}

const learners = [{ id: 1, name: "Alice" }];
const courses = [{ id: 10, title: "PostgreSQL" }];

insertEnrollment(learners, courses, [], { learnerId: 1, courseId: 10 }); // succeeds
insertEnrollment(learners, courses, [], { learnerId: 999, courseId: 10 }); // throws -- learner 999 doesn't exist
// A REAL foreign key constraint enforces exactly this check, automatically, on every insert -- with no
// application code able to forget or bypass it.`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Try inserting an enrollment with a valid learnerId but an invalid courseId, and observe which check fails.",
      code: `function insertEnrollment(learners, courses, newEnrollment) {
  if (!learners.some(l => l.id === newEnrollment.learnerId)) throw new Error("invalid learnerId");
  if (!courses.some(c => c.id === newEnrollment.courseId)) throw new Error("invalid courseId");
  return "inserted";
}
const learners = [{ id: 1 }];
const courses = [{ id: 10 }];
console.log(insertEnrollment(learners, courses, { learnerId: 1, courseId: 999 }));`,
      editable: true,
    },
    guidedExercise: {
      id: "pg-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isValidPrimaryKeyCandidate(values) modeling what a primary key requires: return true only if every value in the array is non-null/non-undefined AND all values are unique (no duplicates).",
      starterCode: `function isValidPrimaryKeyCandidate(values) {
  // TODO: check for any null/undefined, and check for any duplicate
}
`,
      solutionCode: `function isValidPrimaryKeyCandidate(values) {
  if (values.some(v => v === null || v === undefined)) return false;
  return new Set(values).size === values.length;
}`,
      harness: `
        try { window.__report('t1', isValidPrimaryKeyCandidate([1,2,3]) === true, 'unique, non-null values should be valid'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isValidPrimaryKeyCandidate([1,2,2]) === false, 'a duplicate value should be invalid'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isValidPrimaryKeyCandidate([1,null,3]) === false, 'a null value should be invalid'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', isValidPrimaryKeyCandidate([]) === true, 'an empty set of values is trivially valid (no violations possible)'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "accepts unique, non-null values" },
        { id: "t2", description: "rejects a duplicate value" },
        { id: "t3", description: "rejects a null value" },
        { id: "t4", description: "an empty array is trivially valid" },
      ],
      hints: [
        "A Set naturally deduplicates -- comparing its size to the original array's length reveals any duplicates.",
        "Check for null/undefined FIRST, since a primary key can never be missing on any row.",
      ],
    },
    independentExercise: {
      id: "pg-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write deleteLearner(learners, enrollments, learnerId, onDeleteBehavior) modeling ON DELETE CASCADE / SET NULL / RESTRICT for a foreign key. 'CASCADE' removes the learner AND all their enrollments. 'SET NULL' removes the learner and sets learnerId to null on their enrollments (keeping the enrollment rows). 'RESTRICT' throws an Error and changes nothing if any enrollment still references the learner.",
      starterCode: `function deleteLearner(learners, enrollments, learnerId, onDeleteBehavior) {
  const hasEnrollments = enrollments.some(e => e.learnerId === learnerId);
  // TODO: implement the three behaviors described in the prompt
  return { learners, enrollments };
}
`,
      solutionCode: `function deleteLearner(learners, enrollments, learnerId, onDeleteBehavior) {
  const hasEnrollments = enrollments.some(e => e.learnerId === learnerId);
  if (onDeleteBehavior === "RESTRICT" && hasEnrollments) {
    throw new Error("cannot delete learner " + learnerId + ": referenced by existing enrollments");
  }
  const remainingLearners = learners.filter(l => l.id !== learnerId);
  let remainingEnrollments;
  if (onDeleteBehavior === "CASCADE") {
    remainingEnrollments = enrollments.filter(e => e.learnerId !== learnerId);
  } else if (onDeleteBehavior === "SET NULL") {
    remainingEnrollments = enrollments.map(e => e.learnerId === learnerId ? { ...e, learnerId: null } : e);
  } else {
    remainingEnrollments = enrollments;
  }
  return { learners: remainingLearners, enrollments: remainingEnrollments };
}`,
      harness: `
        try {
          const result = deleteLearner([{id:1}], [{learnerId:1, courseId:10}], 1, "CASCADE");
          window.__report('t1', result.learners.length === 0 && result.enrollments.length === 0, 'CASCADE should remove the learner and their enrollments');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = deleteLearner([{id:1}], [{learnerId:1, courseId:10}], 1, "SET NULL");
          window.__report('t2', result.learners.length === 0 && result.enrollments.length === 1 && result.enrollments[0].learnerId === null, 'SET NULL should keep the enrollment but null the reference');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          let threw = false;
          try { deleteLearner([{id:1}], [{learnerId:1, courseId:10}], 1, "RESTRICT"); } catch (e) { threw = true; }
          window.__report('t3', threw, 'RESTRICT should throw when a referencing enrollment exists');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try {
          const result = deleteLearner([{id:1}], [], 1, "RESTRICT");
          window.__report('t4', result.learners.length === 0, 'RESTRICT should succeed when there are no referencing rows at all');
        } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "CASCADE removes both the learner and their enrollments" },
        { id: "t2", description: "SET NULL keeps enrollments but nulls the foreign key" },
        { id: "t3", description: "RESTRICT throws when a referencing row exists" },
        {
          id: "t4",
          description: "RESTRICT succeeds when nothing references the row being deleted",
        },
      ],
      hints: [
        "Check RESTRICT's condition first and return/throw early -- it's the only behavior that can prevent the deletion from happening at all.",
        "This models exactly what PostgreSQL's ON DELETE clause on a real foreign key constraint does automatically, without any application code needing to implement this logic by hand.",
      ],
    },
    commonMistakes: [
      "Relying on application code to check referential integrity ('always look up the learner before inserting an enrollment') instead of a real foreign key constraint -- a single missed check anywhere in the codebase creates an orphaned or invalid reference; a constraint makes it structurally impossible.",
      "Using a naturally-meaningful value like email as a PRIMARY KEY directly, then discovering it needs to change later (a corrected typo, a reused address after account deletion) -- changing a primary key that other tables reference via foreign key is expensive; a surrogate key avoids this by never needing to change for real-world reasons.",
      "Forgetting to specify an ON DELETE behavior on a foreign key and being surprised when PostgreSQL's default (effectively RESTRICT) blocks a deletion -- this default is a safety feature, not a bug, but it must be a deliberate decision, not a surprise.",
    ],
    quiz: [
      {
        id: "pg-q2-1",
        prompt:
          "What does a foreign key constraint guarantee that relying purely on application-code checks does not?",
        choices: [
          "Nothing different -- they provide identical guarantees",
          "The database itself physically refuses an invalid reference on every insert/update, regardless of which application code path performed it -- a missed check in application code cannot create an invalid reference",
          "Foreign keys only work for numeric columns",
          "Foreign keys are slower but otherwise identical to application-level checks",
        ],
        correctIndex: 1,
        explanation:
          "A foreign key constraint is enforced by the database engine on every single write, from every code path, including ones a developer might not anticipate (a script, a different service, a manual query) — an application-level check only protects the specific code path someone remembered to add it to.",
      },
      {
        id: "pg-q2-2",
        prompt:
          "Why are surrogate keys (like an auto-incrementing integer) generally preferred over natural keys (like an email address) as a primary key?",
        choices: [
          "Surrogate keys take up less storage in every case",
          "A natural key's real-world value can turn out not to be permanently unique or can need to change, and changing a primary key referenced by other tables' foreign keys is expensive; a surrogate key never needs to change for real-world reasons",
          "Natural keys are not allowed by the SQL standard",
          "There's no real difference; the choice is purely stylistic",
        ],
        correctIndex: 1,
        explanation:
          "The core risk with natural keys is that 'permanently unique in the real world' often turns out to be an unsafe assumption over the system's lifetime, and a primary key change cascades to every foreign key referencing it — a surrogate key sidesteps that entire class of problem by carrying no real-world meaning to begin with.",
      },
      {
        id: "pg-q2-3",
        prompt:
          "A learner is deleted, and their existing enrollments should be preserved for historical reporting, but the enrollment's learner reference should become empty since that learner no longer exists. Which ON DELETE behavior fits?",
        choices: ["CASCADE", "RESTRICT", "SET NULL", "None of these support this"],
        correctIndex: 2,
        explanation:
          "SET NULL is exactly this case: the referencing rows (enrollments) are kept, but the now-invalid foreign key value is cleared to NULL rather than the whole row being deleted (CASCADE) or the deletion being blocked entirely (RESTRICT).",
      },
    ],
    takeaway:
      "A primary key's uniqueness and non-null guarantees, and a foreign key's referential-integrity guarantee, are enforced by the database itself on every write — a genuinely stronger guarantee than any application-code discipline can provide; prefer a surrogate key unless a natural key is provably, permanently unique.",
    summary:
      "A primary key uniquely identifies every row and can never be null. A foreign key must match an existing primary key value (or be null, if optional), with ON DELETE CASCADE/SET NULL/RESTRICT defining what happens when the referenced row is deleted. Surrogate keys avoid the risk that a natural key's real-world uniqueness assumption turns out to be wrong.",
    nextLessonSlug: "pg-normalization-1nf-2nf",
  },
  {
    id: "pg-normalization-1nf-2nf",
    slug: "pg-normalization-1nf-2nf",
    title: "Normalization: First and Second Normal Form",
    description:
      "Functional dependencies as the underlying idea behind normalization, and the first two normal forms — eliminating repeating groups, then eliminating partial dependency on a composite key.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 2,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["pg-keys-and-constraints"],
    objectives: [
      "Identify a functional dependency between columns in a table",
      "Determine whether a table satisfies First Normal Form (1NF)",
      "Determine whether a table satisfies Second Normal Form (2NF), given a composite primary key",
    ],
    skills: ["database-design", "normalization"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "IBM: What is database normalization?",
        url: "https://www.ibm.com/think/topics/database-normalization",
      },
    ],
    keywords: ["normalization", "1nf", "2nf", "functional dependency", "database design"],
    explanation: `A **functional dependency** exists between two columns when one column's value fully determines another's — written \`A -> B\` ("A determines B"). In a Learner table, \`learner_id -> email\` holds: knowing the ID tells you exactly one email, since each learner has exactly one. Functional dependencies are the underlying idea every normal form is really testing for; each normal form is a progressively stricter rule about which dependencies are allowed to exist in a single table.

**First Normal Form (1NF)** requires every column to hold a single, atomic value — no repeating groups, and no comma-separated lists or arrays stuffed into one column pretending to be multiple values. A table with a column literally named \`phone_numbers\` holding \`"555-1234, 555-5678"\` violates 1NF: that column isn't atomic, and the database has no way to query, index, or enforce constraints on the individual phone numbers hidden inside that string. The fix is a separate table (\`PhoneNumber\`, with a foreign key back to \`Learner\`) — exactly the one-to-many pattern from the modeling lesson, applied specifically to fix a 1NF violation.

**Second Normal Form (2NF)** applies only to tables with a **composite primary key** (a primary key made of more than one column) and requires every non-key column to depend on the *entire* composite key, not just part of it — this is called eliminating **partial dependency**. Consider an \`Enrollment\` table with the composite key \`(learner_id, course_id)\`, plus a \`course_title\` column: \`course_title\` depends only on \`course_id\` (part of the key), not on the combination of both — a 2NF violation, because it means \`course_title\` is redundantly repeated on every single enrollment row for that course, and an update to the course's title now has to correctly find and change every one of those repeated copies or the data becomes inconsistent. The fix: move \`course_title\` to the \`Course\` table, where it depends on the *entire* (single-column) key there, and reference it via \`course_id\` from \`Enrollment\` instead of duplicating it.`,
    example: {
      language: "javascript",
      description:
        "Detecting a 1NF violation (a non-atomic column) and a 2NF violation (partial dependency on a composite key) programmatically.",
      code: `function violates1NF(row) {
  // A column value containing a comma is a strong signal of a hidden repeating group.
  return Object.values(row).some(v => typeof v === "string" && v.includes(","));
}

console.log(violates1NF({ id: 1, phone_numbers: "555-1234, 555-5678" })); // true -- not atomic
console.log(violates1NF({ id: 1, phone_number: "555-1234" }));            // false -- atomic

function violates2NF(compositeKeyColumns, nonKeyColumn, dependsOnColumns) {
  // A 2NF violation exists if the non-key column depends on a STRICT SUBSET of the composite key,
  // not the entire key.
  const isProperSubset =
    dependsOnColumns.every(c => compositeKeyColumns.includes(c)) &&
    dependsOnColumns.length < compositeKeyColumns.length;
  return isProperSubset;
}

// course_title depends only on course_id, which is part of, but not all of, (learner_id, course_id):
console.log(violates2NF(["learner_id", "course_id"], "course_title", ["course_id"])); // true -- violation`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Check whether a column depending on the FULL composite key (both learner_id and course_id) correctly reports NOT a violation.",
      code: `function violates2NF(compositeKeyColumns, nonKeyColumn, dependsOnColumns) {
  const isProperSubset =
    dependsOnColumns.every(c => compositeKeyColumns.includes(c)) &&
    dependsOnColumns.length < compositeKeyColumns.length;
  return isProperSubset;
}
console.log(violates2NF(["learner_id", "course_id"], "enrolled_at", ["learner_id", "course_id"]));`,
      editable: true,
    },
    guidedExercise: {
      id: "pg-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isAtomic(value) modeling the 1NF atomicity check: false if value is a string containing a comma OR is an array, true otherwise (numbers, booleans, and comma-free strings are atomic).",
      starterCode: `function isAtomic(value) {
  // TODO
}
`,
      solutionCode: `function isAtomic(value) {
  if (Array.isArray(value)) return false;
  if (typeof value === "string" && value.includes(",")) return false;
  return true;
}`,
      harness: `
        try { window.__report('t1', isAtomic("alice@example.com") === true, 'a single email should be atomic'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isAtomic("555-1234, 555-5678") === false, 'a comma-separated string hides multiple values -- not atomic'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isAtomic(["555-1234","555-5678"]) === false, 'an array value is not atomic'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', isAtomic(42) === true, 'a number is atomic'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a single value string is atomic" },
        { id: "t2", description: "a comma-separated string is not atomic" },
        { id: "t3", description: "an array is not atomic" },
        { id: "t4", description: "a number is atomic" },
      ],
      hints: [
        "This models the intuition behind 1NF, not a formal, complete definition -- a real value could hide multiple values without a comma, but this is the common, practical signal.",
        "Array.isArray() and String.prototype.includes() are the two checks needed.",
      ],
    },
    independentExercise: {
      id: "pg-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write find2NFViolations(compositeKey, columnDependencies) where columnDependencies is an object mapping each non-key column name to the array of key columns it actually depends on. Return an array of column names that violate 2NF (depend on a PROPER SUBSET of compositeKey, not the whole thing).",
      starterCode: `function find2NFViolations(compositeKey, columnDependencies) {
  const violations = [];
  // TODO: for each column, check if its dependency is a proper subset of compositeKey
  return violations;
}
`,
      solutionCode: `function find2NFViolations(compositeKey, columnDependencies) {
  const violations = [];
  for (const [column, dependsOn] of Object.entries(columnDependencies)) {
    const isSubsetOfKey = dependsOn.every(c => compositeKey.includes(c));
    const isProper = dependsOn.length < compositeKey.length;
    if (isSubsetOfKey && isProper) violations.push(column);
  }
  return violations;
}`,
      harness: `
        try {
          const result = find2NFViolations(["learner_id", "course_id"], {
            course_title: ["course_id"],
            learner_name: ["learner_id"],
            enrolled_at: ["learner_id", "course_id"],
          });
          window.__report('t1', JSON.stringify(result.sort()) === JSON.stringify(["course_title","learner_name"]), 'should find both partial-dependency violations, but not the fully-dependent column');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = find2NFViolations(["learner_id", "course_id"], { enrolled_at: ["learner_id", "course_id"] });
          window.__report('t2', result.length === 0, 'a column depending on the full composite key has no violation'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const result = find2NFViolations(["id"], { name: ["id"] });
          window.__report('t3', result.length === 0, 'a single-column primary key cannot have a 2NF violation -- there is no "partial" subset of one column');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies multiple partial-dependency violations" },
        {
          id: "t2",
          description: "does not flag a column that depends on the entire composite key",
        },
        { id: "t3", description: "a single-column key has no possible 2NF violation" },
      ],
      hints: [
        "2NF only applies meaningfully when the key has more than one column -- a proper subset of a single-column key would have to be empty, which never matches a real dependency.",
        "This directly mirrors the explanation's course_title example: it depends only on course_id, a proper subset of (learner_id, course_id).",
      ],
    },
    commonMistakes: [
      "Storing a comma-separated or JSON-array-in-a-text-column list of values to 'avoid creating another table' -- this violates 1NF and makes it impossible to query, index, or constrain individual values without fragile string parsing.",
      "Not noticing a 2NF violation because the redundant column 'seems fine' with only a few rows -- the real cost (inconsistent copies after an update, wasted storage) only becomes visible at scale, but the structural problem exists from the very first duplicated row.",
      "Applying 2NF reasoning to a table with a single-column primary key -- 2NF specifically concerns composite keys; a single-column key has no 'partial' subset to depend on, so this check is meaningless there (though other normal forms, like 3NF in the next lesson, still apply).",
    ],
    quiz: [
      {
        id: "pg-q3-1",
        prompt:
          'Why does storing "555-1234, 555-5678" in a single phone_numbers column violate First Normal Form?',
        choices: [
          "Because phone numbers cannot be stored as text",
          "Because the column value isn't atomic -- it hides multiple distinct values inside one field, which the database can't query, index, or constrain individually",
          "Because the string is too long",
          "This does not violate 1NF; 1NF only concerns numeric columns",
        ],
        correctIndex: 1,
        explanation:
          "1NF requires every column to hold one single, atomic value. A comma-separated list packs multiple logical values into one field, defeating the database's ability to treat each phone number as its own queryable, indexable, constrainable value.",
      },
      {
        id: "pg-q3-2",
        prompt:
          "In an Enrollment table with composite key (learner_id, course_id), why does a course_title column violate 2NF?",
        choices: [
          "It doesn't -- 2NF only applies to single-column keys",
          "course_title depends only on course_id, a proper subset of the full composite key -- meaning it's redundantly repeated on every enrollment row for that course",
          "course_title should never be a text column",
          "2NF is violated only if the table has no primary key at all",
        ],
        correctIndex: 1,
        explanation:
          "2NF requires every non-key column to depend on the ENTIRE composite key, not part of it. Since a course's title has nothing to do with which specific learner enrolled, storing it in Enrollment means the same title value gets duplicated across every enrollment row for that course — a direct 2NF violation.",
      },
      {
        id: "pg-q3-3",
        prompt: "What does a functional dependency A -> B mean?",
        choices: [
          "A and B are always equal",
          "Knowing the value of A tells you exactly one corresponding value of B",
          "A must be inserted before B",
          "A and B must be in the same table",
        ],
        correctIndex: 1,
        explanation:
          "A -> B ('A determines B') means each value of A corresponds to exactly one value of B — for example, learner_id -> email holds because each learner has exactly one email, which is the precise underlying idea every normal form is testing rules about.",
      },
    ],
    takeaway:
      "1NF requires every column to hold one atomic value, eliminating hidden repeating groups; 2NF (relevant only for composite keys) requires every non-key column to depend on the entire key, eliminating redundant, partially-dependent data that update anomalies can silently make inconsistent.",
    summary:
      "A functional dependency (A -> B) means A's value determines B's value. 1NF requires atomic column values — no hidden lists. 2NF, for composite primary keys, requires every non-key column to depend on the full key, not a subset — a violation means data is redundantly duplicated and can become inconsistent after an update.",
    nextLessonSlug: "pg-normalization-3nf-and-denormalization",
  },
  {
    id: "pg-normalization-3nf-and-denormalization",
    slug: "pg-normalization-3nf-and-denormalization",
    title: "Third Normal Form and Denormalization Tradeoffs",
    description:
      "Eliminating dependency on a non-key column, and the honest, deliberate cases where denormalizing a schema is the right engineering call, not a mistake.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["pg-normalization-1nf-2nf"],
    objectives: [
      "Identify a transitive dependency and explain why it violates 3NF",
      "Normalize a table to 3NF given a set of functional dependencies",
      "Explain at least one legitimate, deliberate reason to denormalize, and its real cost",
    ],
    skills: ["database-design", "normalization", "denormalization"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "IBM: What is database normalization?",
        url: "https://www.ibm.com/think/topics/database-normalization",
      },
    ],
    keywords: [
      "3nf",
      "normalization",
      "denormalization",
      "transitive dependency",
      "database design",
    ],
    explanation: `**Third Normal Form (3NF)** builds on 2NF by additionally forbidding **transitive dependencies**: a non-key column depending on *another non-key column*, rather than depending directly on the primary key. A \`Course\` table with columns \`id\`, \`title\`, \`instructor_id\`, and \`instructor_email\` has a transitive dependency: \`instructor_email\` depends on \`instructor_id\` (another non-key column), not directly on \`id\`. This means every course taught by the same instructor redundantly repeats that instructor's email — and if the instructor's email changes, every single course row referencing them must be found and updated, or the data silently becomes inconsistent (some rows showing the old email, some the new one, with no way for the database to tell which is "correct"). The fix mirrors the 2NF fix: move \`instructor_email\` to an \`Instructor\` table, where it genuinely depends on that table's own primary key, and reference it from \`Course\` via \`instructor_id\`.

A table that satisfies 1NF, 2NF, and 3NF has each non-key fact stored in exactly one place — a design property with a real, practical payoff: an update to any single fact only ever requires changing one row, and it's structurally impossible for two rows to disagree about a fact that should be the same. This is the target most schemas should aim for by default, and it's what the previous two lessons' techniques (fixing 1NF and 2NF violations) build toward.

**Denormalization** — deliberately reintroducing redundancy that normalization would remove — is occasionally the right engineering call, but it's a **conscious tradeoff**, not a shortcut taken to avoid learning normalization properly. The honest case for it: a specific, measured, read-heavy query pattern where joining several normalized tables on every request is a genuine, proven performance bottleneck, and the redundant copy is kept intentionally in sync (via a database trigger, a scheduled job, or an application-layer guarantee) rather than left to drift. The real cost that must be accepted, explicitly, in exchange: the possibility of the redundant copies disagreeing if the sync mechanism ever fails or is forgotten in some code path — which is exactly the failure mode normalization exists to make structurally impossible. Denormalizing without a real, measured performance problem to justify it, and without a real plan for keeping the redundant copies in sync, reintroduces the update-anomaly risk normalization was designed to eliminate, for no actual benefit.`,
    example: {
      language: "javascript",
      description:
        "Detecting a transitive dependency, and modeling the update-anomaly risk it creates.",
      code: `function hasTransitiveDependency(dependencies) {
  // dependencies: { columnName: "depends on" column, e.g. instructor_email depends on instructor_id }
  // A transitive dependency exists if a non-key column depends on ANOTHER NON-KEY column
  // (rather than depending directly on the primary key).
  const nonKeyColumns = new Set(Object.keys(dependencies));
  for (const [column, dependsOn] of Object.entries(dependencies)) {
    if (nonKeyColumns.has(dependsOn)) return true; // depends on another non-key column -- transitive
  }
  return false;
}

console.log(hasTransitiveDependency({
  instructor_email: "instructor_id", // instructor_id is ALSO a non-key column here -- transitive!
}));

// The real-world consequence of NOT fixing this:
const courses = [
  { id: 1, title: "PostgreSQL", instructor_id: 7, instructor_email: "j.smith@example.com" },
  { id: 2, title: "Java", instructor_id: 7, instructor_email: "j.smith@example.com" }, // duplicated
];
// If instructor 7's email changes, BOTH rows must be found and updated, or they silently disagree.`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a column 'title' that depends directly on the primary key (not another non-key column) and confirm hasTransitiveDependency stays false for it.",
      code: `function hasTransitiveDependency(dependencies) {
  const nonKeyColumns = new Set(Object.keys(dependencies));
  for (const [column, dependsOn] of Object.entries(dependencies)) {
    if (nonKeyColumns.has(dependsOn)) return true;
  }
  return false;
}
console.log(hasTransitiveDependency({ title: "id" }));`,
      editable: true,
    },
    guidedExercise: {
      id: "pg-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write findTransitiveDependencies(dependencies) (same shape as the explanation's example) returning an array of every column name that has a transitive dependency (depends on another key in the dependencies object, rather than depending directly on the primary key).",
      starterCode: `function findTransitiveDependencies(dependencies) {
  const violations = [];
  // TODO
  return violations;
}
`,
      solutionCode: `function findTransitiveDependencies(dependencies) {
  const nonKeyColumns = new Set(Object.keys(dependencies));
  const violations = [];
  for (const [column, dependsOn] of Object.entries(dependencies)) {
    if (nonKeyColumns.has(dependsOn)) violations.push(column);
  }
  return violations;
}`,
      harness: `
        try {
          const result = findTransitiveDependencies({
            title: "id",
            instructor_id: "id",
            instructor_email: "instructor_id",
          });
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["instructor_email"]), 'should find exactly the one transitively-dependent column');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = findTransitiveDependencies({ title: "id", price: "id" });
          window.__report('t2', result.length === 0, 'no transitive dependency when everything depends directly on the primary key');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a genuine transitive dependency" },
        {
          id: "t2",
          description: "reports no violations when every column depends directly on the key",
        },
      ],
      hints: [
        "A column's dependency is transitive exactly when what it depends on is ITSELF one of the table's own non-key columns.",
        "This directly mirrors the explanation's instructor_email/instructor_id example.",
      ],
    },
    independentExercise: {
      id: "pg-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write shouldDenormalize(readsPerWrite, joinCostMeasuredMs, hasReliableSyncMechanism) modeling a deliberate, justified denormalization decision: return true ONLY if readsPerWrite is high (>= 100), joinCostMeasuredMs shows a REAL measured problem (>= 50), AND a reliable sync mechanism exists to keep the redundant copy consistent. Missing any one of the three conditions means denormalizing is not justified.",
      starterCode: `function shouldDenormalize(readsPerWrite, joinCostMeasuredMs, hasReliableSyncMechanism) {
  // TODO
}
`,
      solutionCode: `function shouldDenormalize(readsPerWrite, joinCostMeasuredMs, hasReliableSyncMechanism) {
  return readsPerWrite >= 100 && joinCostMeasuredMs >= 50 && hasReliableSyncMechanism === true;
}`,
      harness: `
        try { window.__report('t1', shouldDenormalize(1000, 200, true) === true, 'a genuine, well-justified, well-supported case should return true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldDenormalize(1000, 200, false) === false, 'without a reliable sync mechanism, denormalizing is not justified even with real performance numbers'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', shouldDenormalize(5, 200, true) === false, 'a low read-to-write ratio does not justify denormalization even if the join is measured as slow'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', shouldDenormalize(1000, 2, true) === false, 'a trivially fast join does not justify denormalization, regardless of read volume'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "recommends denormalization only when all three conditions genuinely hold",
        },
        { id: "t2", description: "refuses without a reliable sync mechanism" },
        { id: "t3", description: "refuses with a low read-to-write ratio" },
        {
          id: "t4",
          description: "refuses when the join isn't actually a measured performance problem",
        },
      ],
      hints: [
        "All three conditions must hold simultaneously -- this models 'denormalization is a deliberate tradeoff, not a default,' requiring every justification to be real, not assumed.",
        "This function is intentionally strict: it's meant to make you articulate every part of the justification, not just one convenient one.",
      ],
    },
    commonMistakes: [
      "Leaving a transitive dependency in place (e.g. an email column that really belongs to a related entity) because 'it's convenient to have it right there' -- this reintroduces exactly the update-anomaly risk 2NF and 3NF exist to eliminate.",
      "Denormalizing preemptively, before any real, measured performance problem exists -- this trades away normalization's consistency guarantees for a benefit that hasn't actually been demonstrated to matter yet.",
      "Denormalizing without a real plan (a trigger, a scheduled job, an enforced application-layer guarantee) for keeping the redundant copy in sync -- an unmaintained redundant copy WILL eventually drift out of sync with its source of truth.",
    ],
    quiz: [
      {
        id: "pg-q4-1",
        prompt: "What makes a dependency 'transitive,' violating 3NF?",
        choices: [
          "The dependency crosses more than one table",
          "A non-key column depends on another non-key column, rather than depending directly on the primary key",
          "The dependency involves a foreign key",
          "Transitive dependencies are actually required by 3NF, not forbidden by it",
        ],
        correctIndex: 1,
        explanation:
          "3NF specifically targets this shape: instructor_email depending on instructor_id (itself just another non-key column, not the primary key) means instructor_email is only indirectly tied to the table's actual identity, and gets redundantly duplicated wherever instructor_id repeats.",
      },
      {
        id: "pg-q4-2",
        prompt: "What real, structural guarantee does a fully 3NF-normalized schema provide?",
        choices: [
          "Queries always run faster",
          "Every non-key fact is stored in exactly one place, making it structurally impossible for two rows to disagree about a fact that should be identical",
          "The schema requires no foreign keys",
          "3NF eliminates the need for a primary key",
        ],
        correctIndex: 1,
        explanation:
          "The practical payoff of full normalization is a consistency guarantee: since each fact lives in one place, an update only ever needs to touch one row, and there's no way for redundant, potentially-conflicting copies of that fact to exist elsewhere in the schema.",
      },
      {
        id: "pg-q4-3",
        prompt:
          "What real cost must be explicitly accepted when deliberately denormalizing a schema?",
        choices: [
          "Denormalization has no real cost if done correctly",
          "The redundant copies can drift out of sync with their source of truth if the sync mechanism ever fails or is missed in some code path -- exactly the inconsistency risk normalization exists to prevent",
          "Denormalized schemas cannot use foreign keys at all",
          "Denormalization always makes every query slower",
        ],
        correctIndex: 1,
        explanation:
          "Denormalization is a genuine tradeoff, not a free performance win: reintroducing redundancy means reintroducing the possibility that the redundant copies disagree, which only stays safe as long as whatever keeps them in sync (a trigger, a job, application logic) never fails or gets bypassed.",
      },
    ],
    takeaway:
      "3NF eliminates transitive dependencies, guaranteeing every fact lives in exactly one place; denormalizing is occasionally the right call, but only as a deliberate tradeoff backed by a real, measured performance problem and a real plan for keeping the resulting redundancy in sync.",
    summary:
      "3NF forbids non-key columns depending on other non-key columns (transitive dependencies), which otherwise duplicate facts and risk inconsistency after an update. A fully normalized schema stores each fact once. Denormalization deliberately reintroduces redundancy, and is justified only by a real, measured performance need plus a reliable sync mechanism — not as a shortcut.",
    nextLessonSlug: "pg-data-types-and-tables",
  },
  {
    id: "pg-data-types-and-tables",
    slug: "pg-data-types-and-tables",
    title: "PostgreSQL Data Types and DDL",
    description:
      "Choosing the right PostgreSQL column type for a value — including the types SQLite doesn't distinguish at all — and the DDL that defines a table.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["pg-normalization-3nf-and-denormalization"],
    objectives: [
      "Choose an appropriate PostgreSQL data type for a given kind of value",
      "Explain what SERIAL/IDENTITY, JSONB, and UUID are each for, and when to reach for them",
      "Read a CREATE TABLE statement and identify its columns, types, and constraints",
    ],
    skills: ["postgresql", "data-types", "ddl"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — Chapter 8: Data Types",
        url: "https://www.postgresql.org/docs/16/datatype.html",
      },
      {
        label: "PostgreSQL 16 Documentation — 8.14. JSON Types",
        url: "https://www.postgresql.org/docs/16/datatype-json.html",
      },
    ],
    keywords: ["postgresql", "data types", "ddl", "create table", "jsonb"],
    explanation: `This lesson's code is genuine PostgreSQL syntax, shown for you to read and reason about — it is **not executed by this sandbox**, which runs SQLite, not PostgreSQL, and several of these types (\`JSONB\`, \`UUID\`, PostgreSQL's \`IDENTITY\` column behavior) either don't exist in SQLite or behave meaningfully differently there. You'll create and query real tables with these exact types in this module's guided local lab, on a real local PostgreSQL install.

PostgreSQL has a genuinely rich type system, considerably more specific than SQLite's famously permissive type affinity model. For numbers: \`INTEGER\`/\`BIGINT\` for whole numbers, \`NUMERIC(precision, scale)\` for exact decimal values where floating-point rounding would be unacceptable (money is the standard example — \`NUMERIC(10, 2)\` stores exactly two decimal places with no representation error), and \`REAL\`/\`DOUBLE PRECISION\` for approximate floating-point values where a tiny rounding error is acceptable. For text: \`TEXT\` for unbounded strings, \`VARCHAR(n)\` when a specific maximum length is a genuine business rule, not just a habit carried over from other databases. For time: \`TIMESTAMPTZ\` (timestamp *with* time zone) is almost always the right choice over plain \`TIMESTAMP\` for anything user-facing, since it stores an unambiguous instant rather than a wall-clock time whose meaning depends on an assumed, easily-lost time zone.

A **surrogate primary key** in modern PostgreSQL is typically declared \`id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY\` (the current, SQL-standard-aligned syntax — the older \`SERIAL\` pseudo-type still works and appears in plenty of existing code, but \`GENERATED ... AS IDENTITY\` is the more explicit, standard-conforming modern choice). **UUID** (\`gen_random_uuid()\`, built into PostgreSQL 13+) is an alternative surrogate key strategy — a randomly-generated, effectively-unique 128-bit value — useful specifically when IDs must be generated by the client *before* an insert (offline-first apps, distributed systems where coordinating a single sequential counter is impractical) or when you deliberately don't want IDs to reveal insertion order or row count to anyone who can see them. **JSONB** stores JSON data in an efficient, indexable, queryable binary format (as opposed to plain \`JSON\`, which stores an exact text copy with no such indexing) — useful for genuinely semi-structured data that doesn't fit a fixed column shape, though reaching for JSONB to avoid designing real columns for data that actually *does* have a fixed, known shape gives up exactly the constraint-enforcement and type-safety benefits normalization is meant to provide.`,
    example: {
      language: "none",
      description:
        "Real PostgreSQL DDL, shown for reading only -- this sandbox runs SQLite, not PostgreSQL, and does not execute this. You'll run genuine statements like this yourself in this module's guided local lab.",
      code: `CREATE TABLE learner (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    preferences JSONB NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE course (
    id             INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title          TEXT NOT NULL,
    price_usd      NUMERIC(10, 2) NOT NULL CHECK (price_usd >= 0),
    duration_hours REAL NOT NULL CHECK (duration_hours > 0)
);

-- A UUID primary key, generated by PostgreSQL itself:
CREATE TABLE session_token (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id INTEGER NOT NULL REFERENCES learner(id),
    expires_at TIMESTAMPTZ NOT NULL
);`,
    },
    guidedExercise: {
      id: "pg-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write choosePostgresType(kind) modeling type selection: 'money' -> 'NUMERIC(10,2)', 'wholeCount' -> 'INTEGER', 'unboundedText' -> 'TEXT', 'timestampt' -> 'TIMESTAMPTZ', 'semiStructured' -> 'JSONB'. Return null for any unrecognized kind.",
      starterCode: `function choosePostgresType(kind) {
  // TODO
}
`,
      solutionCode: `function choosePostgresType(kind) {
  const mapping = {
    money: "NUMERIC(10,2)",
    wholeCount: "INTEGER",
    unboundedText: "TEXT",
    timestampt: "TIMESTAMPTZ",
    semiStructured: "JSONB",
  };
  return mapping[kind] ?? null;
}`,
      harness: `
        try { window.__report('t1', choosePostgresType("money") === "NUMERIC(10,2)", 'money should map to NUMERIC(10,2)'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', choosePostgresType("timestampt") === "TIMESTAMPTZ", 'timestamps should map to TIMESTAMPTZ, not plain TIMESTAMP'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', choosePostgresType("bogus") === null, 'an unrecognized kind should return null'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "money maps to an exact-decimal type, not a float" },
        { id: "t2", description: "timestamps map to the timezone-aware type" },
        { id: "t3", description: "unrecognized input returns null" },
      ],
      hints: [
        "This is a lookup problem, exactly like the classifyComplexity pattern from earlier courses.",
        "NUMERIC (exact) vs REAL/DOUBLE PRECISION (approximate) is the money-specific distinction worth remembering.",
      ],
    },
    independentExercise: {
      id: "pg-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write shouldUseUuid(reason) returning true only for the two genuine reasons a UUID primary key makes sense described in this lesson: reason === 'client-generates-id-before-insert' or reason === 'must-not-reveal-row-count'. Return false for any other reason (including a generic 'it seems more modern').",
      starterCode: `function shouldUseUuid(reason) {
  // TODO
}
`,
      solutionCode: `function shouldUseUuid(reason) {
  return reason === "client-generates-id-before-insert" || reason === "must-not-reveal-row-count";
}`,
      harness: `
        try { window.__report('t1', shouldUseUuid("client-generates-id-before-insert") === true, 'a genuine offline-first reason should return true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldUseUuid("must-not-reveal-row-count") === true, 'a genuine privacy reason should return true'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', shouldUseUuid("it seems more modern") === false, 'a non-technical reason should NOT justify UUID'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "recognizes the offline/distributed-ID-generation case" },
        { id: "t2", description: "recognizes the don't-reveal-row-count case" },
        { id: "t3", description: "rejects an unjustified, non-technical reason" },
      ],
      hints: [
        "This models a deliberate, narrow decision rule -- choosing UUID 'just because' isn't one of the justified reasons.",
        "An integer IDENTITY column remains the simpler, usually-preferred default absent one of these two specific needs.",
      ],
    },
    commonMistakes: [
      "Using REAL or DOUBLE PRECISION for money -- floating-point types cannot represent most decimal fractions exactly, and rounding errors accumulate; NUMERIC(precision, scale) stores exact decimal values specifically to avoid this.",
      "Using plain TIMESTAMP instead of TIMESTAMPTZ for user-facing times -- a plain TIMESTAMP has no time zone information, so its meaning depends on an assumed time zone that's easy to lose or misinterpret across services or users in different regions.",
      "Reaching for JSONB to store data that actually has a fixed, well-known shape, just to avoid designing real columns -- this gives up constraint enforcement, type safety, and easy indexing on individual fields, for data that normalization's tools would have handled better.",
    ],
    quiz: [
      {
        id: "pg-q5-1",
        prompt:
          "Why is NUMERIC(10, 2) generally preferred over REAL/DOUBLE PRECISION for storing money?",
        choices: [
          "NUMERIC is always faster to query",
          "NUMERIC stores an exact decimal value with no representation error; floating-point types can't exactly represent most decimal fractions, and small errors can accumulate",
          "REAL cannot store negative numbers",
          "There is no real difference; the choice is purely stylistic",
        ],
        correctIndex: 1,
        explanation:
          "Floating-point types are approximate by design — many decimal fractions (like 0.10) have no exact binary floating-point representation, which is unacceptable for monetary values where every cent must be exact. NUMERIC is specifically designed to avoid this.",
      },
      {
        id: "pg-q5-2",
        prompt:
          "What is the main practical advantage of TIMESTAMPTZ over plain TIMESTAMP for user-facing data?",
        choices: [
          "TIMESTAMPTZ takes up less storage",
          "TIMESTAMPTZ stores an unambiguous instant in time; plain TIMESTAMP stores a wall-clock value whose real meaning depends on an assumed time zone that can be lost or misinterpreted",
          "TIMESTAMPTZ is required by the SQL standard",
          "There is no practical difference between the two",
        ],
        correctIndex: 1,
        explanation:
          "A plain TIMESTAMP is just numbers with no inherent time-zone context — '2026-08-03 14:00:00' means different real moments depending on which zone is assumed. TIMESTAMPTZ resolves this ambiguity by always representing one specific, unambiguous instant.",
      },
      {
        id: "pg-q5-3",
        prompt: "This lesson's DDL examples are shown with language 'none' rather than 'sql'. Why?",
        choices: [
          "It's a display bug",
          "This platform's browser SQL runner is SQLite, not PostgreSQL, and some of this lesson's syntax (IDENTITY columns, JSONB, gen_random_uuid()) either doesn't exist in SQLite or behaves differently -- running it there would be misleading, not illustrative",
          "PostgreSQL syntax cannot be displayed in code blocks",
          "The examples are pseudocode, not real PostgreSQL",
        ],
        correctIndex: 1,
        explanation:
          "This is a deliberate honesty choice: rather than silently executing PostgreSQL-flavored SQL against SQLite (which could produce misleading results, or simply error on syntax SQLite doesn't support), the platform shows genuine PostgreSQL code as text for you to read and reason about, and reserves actual execution for the guided local lab against a real PostgreSQL install.",
      },
    ],
    takeaway:
      "Choose PostgreSQL types for what they actually guarantee — NUMERIC for exact decimals, TIMESTAMPTZ for unambiguous instants, JSONB only for genuinely semi-structured data — and recognize that this platform's SQLite sandbox can't honestly execute PostgreSQL-specific syntax, which is why this lesson's DDL is for reading, not running here.",
    summary:
      "PostgreSQL's type system is more specific than SQLite's: NUMERIC for exact decimals (money), TIMESTAMPTZ for unambiguous timestamps, GENERATED ALWAYS AS IDENTITY or UUID for surrogate keys, and JSONB for genuinely semi-structured data. This lesson's PostgreSQL-specific DDL is shown as static reference text, not executed by the SQLite-backed browser sandbox.",
    nextLessonSlug: "pg-schema-implementation",
  },
  {
    id: "pg-schema-implementation",
    slug: "pg-schema-implementation",
    title: "Implementing a Normalized Schema in PostgreSQL",
    description:
      "Turning a relational model into real DDL with correctly-ordered CREATE TABLE statements, relationships, constraints, and seed data — and doing it for real, on your own machine.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["pg-data-types-and-tables"],
    objectives: [
      "Determine the correct table-creation order for a schema with foreign key dependencies",
      "Write CREATE TABLE statements implementing a normalized design, including constraints",
      "Write seed data (INSERT statements) that respects every foreign key relationship",
    ],
    skills: ["postgresql", "ddl", "schema-design"],
    tech: [
      { name: "PostgreSQL", version: "16 (examples remain valid on 17+)" },
      { name: "psql or another PostgreSQL client", version: "any current version" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — CREATE TABLE",
        url: "https://www.postgresql.org/docs/16/sql-createtable.html",
      },
    ],
    keywords: ["postgresql", "schema implementation", "ddl", "seed data"],
    explanation: `Turning a relational model (the entities, keys, and relationships from this module's earlier lessons) into real DDL has one hard, non-negotiable ordering requirement: **a table referenced by a foreign key must exist before the table containing that foreign key is created**. \`CREATE TABLE enrollment (learner_id INTEGER REFERENCES learner(id), ...)\` fails outright if the \`learner\` table doesn't exist yet — PostgreSQL has no way to validate a reference to a table it's never heard of. In practice, this means creating tables in dependency order: entities with no foreign keys first, then tables that reference them, and so on, until junction tables (which typically reference two or more other tables) come last.

The same ordering constraint applies to **seed data**: an \`INSERT INTO enrollment (learner_id, course_id) VALUES (1, 10)\` fails if no \`learner\` row with \`id = 1\` exists yet — foreign key constraints are enforced on every insert, seed data included, with no special exemption. Seeding in the wrong order is one of the most common real mistakes when first setting up a normalized schema, and PostgreSQL's error message (naming the specific violated constraint) is usually the fastest way to diagnose exactly which reference came too early.

A complete \`CREATE TABLE\` statement combines everything from this module: the right data type per column (previous lesson), \`PRIMARY KEY\` (with \`GENERATED ALWAYS AS IDENTITY\` for a surrogate key), \`NOT NULL\` for required columns, \`UNIQUE\` for values like email that must never repeat but aren't the primary key, \`REFERENCES other_table(column)\` for foreign keys (with an explicit \`ON DELETE\` behavior when the default RESTRICT-like behavior isn't what's wanted), and \`CHECK (...)\` constraints for business rules the type system alone can't express (\`CHECK (price_usd >= 0)\`, \`CHECK (end_date > start_date)\`). This lesson's guided local lab has you write and run exactly this — a small, genuinely normalized, multi-table PostgreSQL schema with correctly-ordered creation and seed data, verified against a real PostgreSQL install.`,
    example: {
      language: "none",
      description:
        "Correctly-ordered CREATE TABLE and INSERT statements for a small normalized schema -- read this, then build and run the real thing yourself in this lesson's guided local lab.",
      code: `-- learner has no foreign keys -- created first.
CREATE TABLE learner (
    id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE
);

-- course has no foreign keys -- can also be created first, in any order relative to learner.
CREATE TABLE course (
    id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    price_usd NUMERIC(10,2) NOT NULL CHECK (price_usd >= 0)
);

-- enrollment references BOTH learner and course -- must be created last.
CREATE TABLE enrollment (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    learner_id  INTEGER NOT NULL REFERENCES learner(id) ON DELETE CASCADE,
    course_id   INTEGER NOT NULL REFERENCES course(id) ON DELETE RESTRICT,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (learner_id, course_id) -- a learner cannot enroll in the same course twice
);

-- Seed data must follow the SAME dependency order:
INSERT INTO learner (email) VALUES ('alice@example.com');
INSERT INTO course (title, price_usd) VALUES ('PostgreSQL Fundamentals', 49.00);
INSERT INTO enrollment (learner_id, course_id) VALUES (1, 1); -- fails if either row above doesn't exist yet`,
    },
    guidedExercise: {
      id: "pg-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write topologicalTableOrder(tables) where tables is an array of {name, dependsOn: [names]} objects. Return an array of table names in a valid creation order (every table appears after everything it depends on). Assume no cycles.",
      starterCode: `function topologicalTableOrder(tables) {
  const order = [];
  const created = new Set();
  // TODO: repeatedly find a table whose dependencies are all already created, add it, mark it created
  // (a simple repeated-scan approach is fine -- efficiency is not the point of this exercise)
  return order;
}
`,
      solutionCode: `function topologicalTableOrder(tables) {
  const order = [];
  const created = new Set();
  const remaining = [...tables];
  while (remaining.length > 0) {
    const index = remaining.findIndex(t => t.dependsOn.every(dep => created.has(dep)));
    const [next] = remaining.splice(index, 1);
    order.push(next.name);
    created.add(next.name);
  }
  return order;
}`,
      harness: `
        try {
          const tables = [
            { name: "enrollment", dependsOn: ["learner", "course"] },
            { name: "learner", dependsOn: [] },
            { name: "course", dependsOn: [] },
          ];
          const order = topologicalTableOrder(tables);
          const learnerIdx = order.indexOf("learner");
          const courseIdx = order.indexOf("course");
          const enrollmentIdx = order.indexOf("enrollment");
          window.__report('t1', learnerIdx < enrollmentIdx && courseIdx < enrollmentIdx, 'enrollment must come after both learner and course');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const tables = [{ name: "a", dependsOn: [] }];
          window.__report('t2', JSON.stringify(topologicalTableOrder(tables)) === JSON.stringify(["a"]), 'a single table with no dependencies should just be itself'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "orders a table with dependencies after all of its dependencies" },
        { id: "t2", description: "handles a single table with no dependencies" },
      ],
      hints: [
        "This models exactly the ordering constraint from the explanation: a table can only be 'created' once everything it depends on already exists.",
        "A simple repeated scan (find any table whose dependencies are satisfied, remove it, repeat) is sufficient -- this is a small-scale version of the same topological-sort idea from the DSA course's graph module.",
      ],
    },
    independentExercise: {
      id: "pg-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write validateSeedOrder(inserts) where inserts is an array of {table, id, references: [{table, id}]} objects representing INSERT statements in the order they'd run. Return the index of the FIRST insert that references a row not yet inserted by an earlier statement (or -1 if every insert is valid, respecting insertion order).",
      starterCode: `function validateSeedOrder(inserts) {
  const insertedIds = new Set(); // track as "table:id" strings
  // TODO: walk through inserts in order; before "inserting" each one, check every reference already exists
  return -1;
}
`,
      solutionCode: `function validateSeedOrder(inserts) {
  const insertedIds = new Set();
  for (let i = 0; i < inserts.length; i++) {
    const insert = inserts[i];
    for (const ref of insert.references) {
      if (!insertedIds.has(ref.table + ":" + ref.id)) {
        return i;
      }
    }
    insertedIds.add(insert.table + ":" + insert.id);
  }
  return -1;
}`,
      harness: `
        try {
          const inserts = [
            { table: "learner", id: 1, references: [] },
            { table: "course", id: 1, references: [] },
            { table: "enrollment", id: 1, references: [{table:"learner",id:1},{table:"course",id:1}] },
          ];
          window.__report('t1', validateSeedOrder(inserts) === -1, 'a correctly-ordered seed sequence should be valid'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const inserts = [
            { table: "enrollment", id: 1, references: [{table:"learner",id:1},{table:"course",id:1}] },
            { table: "learner", id: 1, references: [] },
            { table: "course", id: 1, references: [] },
          ];
          window.__report('t2', validateSeedOrder(inserts) === 0, 'the enrollment insert at index 0 references rows that do not exist yet'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          window.__report('t3', validateSeedOrder([]) === -1, 'an empty insert list is trivially valid'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "validates a correctly-ordered seed sequence" },
        { id: "t2", description: "identifies the exact index of a premature, invalid reference" },
        { id: "t3", description: "handles an empty insert list" },
      ],
      hints: [
        "Track what's been 'inserted so far' as you go, checking each new insert's references against only what came strictly before it -- exactly mirroring how PostgreSQL enforces foreign keys on every statement, in the order they execute.",
        "The 'table:id' string key is a simple way to uniquely identify a specific row across all tables.",
      ],
    },
    guidedLocalLab: {
      id: "pg-gll-normalized-schema",
      title: "Create and Validate a Normalized PostgreSQL Schema",
      scenario:
        "Design and build a real, normalized, multi-table PostgreSQL schema for a small learning platform, then seed it with data and verify every constraint actually behaves as designed.",
      requiredTools: [
        { name: "PostgreSQL server", version: "16 or newer" },
        { name: "psql (or another PostgreSQL client)", version: "matching your server version" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        'Install PostgreSQL locally (or use a local install you already have) and confirm it\'s running: `psql --version` and `psql -U postgres -c "SELECT version();"`.',
        "Create a fresh database for this lab: `createdb learning_platform_lab`.",
        "Create a project folder with a single schema.sql file you'll write and re-run as you iterate.",
      ],
      projectStructure: `learning-platform-lab/
  schema.sql
  seed.sql`,
      starterFiles: [
        {
          path: "schema.sql",
          content: `-- TODO: CREATE TABLE learner (id IDENTITY PK, email TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL)

-- TODO: CREATE TABLE course (id IDENTITY PK, title TEXT NOT NULL,
--   price_usd NUMERIC(10,2) NOT NULL CHECK (price_usd >= 0))

-- TODO: CREATE TABLE enrollment (id IDENTITY PK,
--   learner_id INTEGER NOT NULL REFERENCES learner(id) ON DELETE CASCADE,
--   course_id INTEGER NOT NULL REFERENCES course(id) ON DELETE RESTRICT,
--   enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
--   UNIQUE (learner_id, course_id))
-- Remember: enrollment must be created AFTER learner and course.
`,
        },
        {
          path: "seed.sql",
          content: `-- TODO: insert at least 2 learners, 2 courses, and 3 enrollments,
-- in an order that respects every foreign key (learner and course rows
-- must exist before any enrollment row referencing them).
`,
        },
      ],
      requirements: [
        "schema.sql creates learner, course, and enrollment tables in valid dependency order.",
        "enrollment has a UNIQUE constraint on (learner_id, course_id) preventing a duplicate enrollment.",
        "course.price_usd has a CHECK constraint rejecting a negative price.",
        "seed.sql successfully inserts at least 2 learners, 2 courses, and 3 enrollments with no foreign key errors.",
        "Attempting to insert a duplicate (learner_id, course_id) pair fails with a unique-constraint violation.",
      ],
      commands: [
        { description: "Apply the schema", command: "psql -d learning_platform_lab -f schema.sql" },
        {
          description: "Apply the seed data",
          command: "psql -d learning_platform_lab -f seed.sql",
        },
        {
          description: "Open an interactive session to verify manually",
          command: "psql -d learning_platform_lab",
        },
      ],
      expectedBehavior:
        "Both schema.sql and seed.sql run with no errors on a fresh database. Querying `SELECT * FROM enrollment;` shows all seeded rows. Attempting to re-run an INSERT that duplicates an existing (learner_id, course_id) pair fails with a unique_violation error, and attempting to insert a course with a negative price fails with a check_violation error.",
      verificationSteps: [
        {
          command: "psql -d learning_platform_lab -f schema.sql",
          expectedResult: "CREATE TABLE printed three times, no errors",
        },
        {
          command: "psql -d learning_platform_lab -f seed.sql",
          expectedResult: "INSERT 0 1 (or similar) printed for every insert, no errors",
        },
        {
          command:
            "psql -d learning_platform_lab -c \"INSERT INTO course (title, price_usd) VALUES ('Bad Course', -5.00);\"",
          expectedResult: 'ERROR: new row for relation "course" violates check constraint',
        },
        {
          command: 'psql -d learning_platform_lab -c "SELECT count(*) FROM enrollment;"',
          expectedResult: "Returns 3 (or however many you seeded)",
        },
      ],
      troubleshooting: [
        {
          issue: '`ERROR: relation "learner" does not exist` while creating enrollment',
          fix: "learner must be created before enrollment in schema.sql — check the statement order.",
        },
        {
          issue: '`ERROR: insert or update on table "enrollment" violates foreign key constraint`',
          fix: "seed.sql is inserting an enrollment row before the learner or course row it references — check seed.sql's statement order.",
        },
        {
          issue:
            "`ERROR: duplicate key value violates unique constraint` on an email you only meant to insert once",
          fix: "Check for an accidental duplicate INSERT, or confirm you're not re-running seed.sql against a database that already has that row from a previous run — drop and recreate the database to start clean if needed.",
        },
      ],
      hints: [
        "GENERATED ALWAYS AS IDENTITY PRIMARY KEY is the modern way to declare an auto-incrementing surrogate key.",
        "ON DELETE CASCADE on learner_id and ON DELETE RESTRICT on course_id models: deleting a learner removes their enrollments, but a course with active enrollments can't be deleted outright.",
        "UNIQUE (learner_id, course_id) as a table-level constraint (not on either column alone) is what correctly prevents a duplicate PAIR while still allowing the same learner_id or course_id to repeat individually across different rows.",
      ],
      referenceSolution: {
        summary:
          "learner and course have no dependencies and are created first, in either order. enrollment references both and is created last, with a composite UNIQUE constraint preventing duplicate pairs and a CHECK constraint on course.price_usd enforcing a non-negative price.",
        files: [
          {
            path: "schema.sql",
            content: `CREATE TABLE learner (
    id           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email        TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL
);

CREATE TABLE course (
    id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title     TEXT NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL CHECK (price_usd >= 0)
);

CREATE TABLE enrollment (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    learner_id  INTEGER NOT NULL REFERENCES learner(id) ON DELETE CASCADE,
    course_id   INTEGER NOT NULL REFERENCES course(id) ON DELETE RESTRICT,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (learner_id, course_id)
);
`,
          },
          {
            path: "seed.sql",
            content: `INSERT INTO learner (email, display_name) VALUES
    ('alice@example.com', 'Alice'),
    ('sam@example.com', 'Sam');

INSERT INTO course (title, price_usd) VALUES
    ('PostgreSQL Fundamentals', 49.00),
    ('Advanced Indexing', 79.00);

INSERT INTO enrollment (learner_id, course_id) VALUES
    (1, 1),
    (1, 2),
    (2, 1);
`,
          },
        ],
      },
      extensionChallenge:
        "Add a fourth table, note (id, learner_id REFERENCES learner, lesson_reference TEXT, body TEXT, created_at TIMESTAMPTZ DEFAULT now()), and seed at least two notes -- confirming you correctly place it after learner in the creation and seed order.",
    },
    commonMistakes: [
      "Creating a table before the table(s) it references via foreign key -- PostgreSQL cannot validate a reference to a table it doesn't know about yet, and the CREATE TABLE statement fails outright.",
      "Seeding data in an order that violates foreign key dependencies -- exactly the same ordering rule as table creation applies to every single INSERT, with no exception for 'just seed data.'",
      "Putting a UNIQUE constraint on learner_id and course_id as two SEPARATE column-level constraints instead of one composite UNIQUE (learner_id, course_id) -- separate constraints would incorrectly prevent the same learner from enrolling in ANY second course at all, not just the same course twice.",
    ],
    quiz: [
      {
        id: "pg-q6-1",
        prompt:
          "Why must the learner table be created before the enrollment table, if enrollment has a column REFERENCES learner(id)?",
        choices: [
          "It's a stylistic convention, not a requirement",
          "PostgreSQL cannot validate a foreign key reference to a table that doesn't exist yet -- the CREATE TABLE statement for enrollment fails outright if learner hasn't been created first",
          "Table creation order never actually matters in PostgreSQL",
          "Only the column names must be declared first, not the whole table",
        ],
        correctIndex: 1,
        explanation:
          "A REFERENCES clause needs a real, already-existing table and column to point at. Without learner already existing, PostgreSQL has nothing valid to check the reference against, and rejects the CREATE TABLE statement for enrollment entirely.",
      },
      {
        id: "pg-q6-2",
        prompt:
          "Why does UNIQUE (learner_id, course_id) as ONE composite constraint behave differently from separate UNIQUE constraints on learner_id and course_id individually?",
        choices: [
          "There's no difference between the two approaches",
          "A composite UNIQUE constraint only rejects the exact SAME pair repeating; separate single-column UNIQUE constraints would incorrectly prevent a learner from ever appearing in more than one enrollment row at all",
          "Composite constraints are only for primary keys, not UNIQUE",
          "Separate constraints are always stricter and therefore safer",
        ],
        correctIndex: 1,
        explanation:
          "A single-column UNIQUE on learner_id alone would mean each learner_id value can appear in only ONE row total across the whole table — which would make it impossible for a learner to enroll in more than one course. The composite constraint correctly targets only the exact (learner_id, course_id) pair repeating, which is the actual business rule (no duplicate enrollment in the same course).",
      },
      {
        id: "pg-q6-3",
        prompt:
          "Seed data insertion order violates a foreign key dependency. What actually happens?",
        choices: [
          "PostgreSQL silently skips the invalid insert and continues with the rest",
          "The specific INSERT statement fails with a foreign key violation error, naming the constraint that was violated",
          "PostgreSQL automatically reorders the statements to fix the dependency",
          "This is only a warning, not an error, and the row is inserted anyway",
        ],
        correctIndex: 1,
        explanation:
          "Foreign key constraints are enforced on every single write, including seed data — there's no special exemption. An out-of-order INSERT fails immediately with an error identifying the violated constraint, which is exactly the diagnostic signal that reveals the ordering mistake.",
      },
    ],
    takeaway:
      "Both table creation and seed data insertion must respect foreign key dependency order — a table (or row) can never be created before everything it references already exists, and PostgreSQL enforces this on every single statement, with no special exemption for seed data.",
    summary:
      "CREATE TABLE statements must run in dependency order: referenced tables before referencing tables. The same ordering applies to seed INSERT statements. A complete schema combines the right types, PRIMARY KEY, NOT NULL, UNIQUE (including composite UNIQUE for pair-level uniqueness), REFERENCES with an explicit ON DELETE behavior, and CHECK constraints for business rules.",
    nextLessonSlug: "pg-joins-and-aggregation",
  },
  {
    id: "pg-joins-and-aggregation",
    slug: "pg-joins-and-aggregation",
    title: "Joins and Aggregation, Beyond the Basics",
    description:
      "Going past the SELECT/JOIN/GROUP BY fundamentals from the SQL module: multi-table joins, HAVING vs. WHERE, and aggregate functions that hold up in both SQLite and PostgreSQL.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["pg-schema-implementation"],
    objectives: [
      "Join three or more tables correctly in a single query",
      "Explain the difference between WHERE and HAVING, and when each applies",
      "Use aggregate functions (COUNT, SUM, AVG, MIN, MAX) correctly with GROUP BY",
    ],
    skills: ["postgresql", "sql", "joins", "aggregation"],
    tech: [
      { name: "PostgreSQL", version: "16 (examples remain valid on 17+)" },
      {
        name: "SQLite (this lesson's browser sandbox)",
        version:
          "3 — standard JOIN/GROUP BY/aggregate syntax used here behaves identically in both engines",
      },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — 7.2.2. Table and Column Aliases (joins)",
        url: "https://www.postgresql.org/docs/16/queries-table-expressions.html",
      },
      {
        label: "PostgreSQL 16 Documentation — 9.21. Aggregate Functions",
        url: "https://www.postgresql.org/docs/16/functions-aggregate.html",
      },
    ],
    keywords: ["joins", "aggregation", "having", "group by", "postgresql"],
    explanation: `**This lesson's exercises run in this sandbox's real SQL runner, which is SQLite, not PostgreSQL.** The specific SQL in this lesson — standard JOIN syntax, GROUP BY, HAVING, and the core aggregate functions — is genuinely dialect-compatible between SQLite and PostgreSQL, so what you build and run here behaves the same way in a real PostgreSQL database. Later lessons in this module (transactions, indexes, roles) cover PostgreSQL-specific behavior that SQLite can't honestly demonstrate, and switch to a different format for exactly that reason.

Joining **three or more tables** is just chaining additional \`JOIN ... ON ...\` clauses — \`orders JOIN books ON orders.book_id = books.id JOIN authors ON books.author_id = authors.id\` connects orders to the authors of the books they contain, through an intermediate table neither side references directly. Each join condition only needs to correctly relate the two tables it's directly joining; the chain as a whole correctly propagates the relationships through every intermediate step.

**\`WHERE\` filters rows before grouping; \`HAVING\` filters groups after aggregation** — this is the entire distinction, and it's why \`WHERE COUNT(*) > 5\` is invalid (at the point \`WHERE\` runs, individual rows haven't been grouped yet, so there's no \`COUNT(*)\` to reference), while \`HAVING COUNT(*) > 5\` is exactly the right tool for "only show authors with more than 5 books," applied after \`GROUP BY\` has produced one row per author. A query can use both together: \`WHERE\` narrows which rows are even considered before grouping (\`WHERE published_year > 2000\`), and \`HAVING\` then filters the resulting groups (\`HAVING COUNT(*) > 2\`).

The core aggregate functions — \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\` — each collapse a group of rows into a single value, and each has a well-known, worth-remembering edge case: \`COUNT(*)\` counts rows including \`NULL\`s, but \`COUNT(column)\` counts only rows where that specific column is non-\`NULL\`; \`AVG\`, \`SUM\`, \`MIN\`, and \`MAX\` all silently ignore \`NULL\` values entirely rather than treating them as zero, which matters for correctness whenever a column can genuinely be absent — an average computed while silently skipping \`NULL\`s can look correct at a glance while quietly excluding exactly the rows a report was supposed to account for.`,
    example: {
      language: "sql",
      description:
        "Genuinely runs here — this SQL sandbox is SQLite, and this JOIN/GROUP BY/HAVING syntax is standard and dialect-compatible with PostgreSQL.",
      code: `-- Three-table join: which authors have books that have actually been ordered, with total quantity?
SELECT authors.name, SUM(orders.quantity) AS total_ordered
FROM orders
JOIN books ON orders.book_id = books.id
JOIN authors ON books.author_id = authors.id
GROUP BY authors.id
HAVING SUM(orders.quantity) > 2
ORDER BY total_ordered DESC;`,
      editable: false,
    },
    editableExample: {
      language: "sql",
      description:
        "Change HAVING SUM(orders.quantity) > 2 to a different threshold and see how the result set changes.",
      code: `SELECT authors.name, SUM(orders.quantity) AS total_ordered
FROM orders
JOIN books ON orders.book_id = books.id
JOIN authors ON books.author_id = authors.id
GROUP BY authors.id
HAVING SUM(orders.quantity) > 1
ORDER BY total_ordered DESC;`,
      editable: true,
    },
    guidedExercise: {
      id: "pg-7-guided",
      kind: "guided",
      language: "sql",
      prompt:
        "Write a query joining books to authors, returning each book's title and its author's country, only for books published after the year 2000.",
      starterCode: `SELECT books.title, authors.country
FROM books
JOIN authors ON ___
WHERE ___;`,
      solutionCode: `SELECT books.title, authors.country
FROM books
JOIN authors ON books.author_id = authors.id
WHERE books.published_year > 2000;`,
      seedSql: BOOKSTORE_SEED_SQL,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description: "Returns each qualifying book's title with its author's country",
          hidden: false,
        },
      ],
      hints: [
        "The join condition connects books.author_id to authors.id.",
        "WHERE filters individual book rows BEFORE any grouping -- there's no aggregation in this query at all, so WHERE is the only filtering tool needed.",
      ],
    },
    independentExercise: {
      id: "pg-7-independent",
      kind: "independent",
      language: "sql",
      prompt:
        "Write a query joining orders to books to authors, returning each author's name and the total quantity of their books ordered, but ONLY for authors whose total ordered quantity exceeds 2 -- sorted by total quantity descending, then by author name ascending as a tiebreaker (order matters for this check).",
      starterCode: `-- Join orders -> books -> authors, GROUP BY author, filter groups with HAVING`,
      solutionCode: `SELECT authors.name AS author_name, SUM(orders.quantity) AS total_ordered
FROM orders
JOIN books ON orders.book_id = books.id
JOIN authors ON books.author_id = authors.id
GROUP BY authors.id
HAVING SUM(orders.quantity) > 2
ORDER BY total_ordered DESC, authors.name ASC;`,
      seedSql: BOOKSTORE_SEED_SQL,
      sqlOrderSensitive: true,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description:
            "Returns only authors exceeding the threshold, correctly aggregated and sorted",
          hidden: false,
        },
      ],
      hints: [
        "This needs a three-table join chain: orders -> books -> authors.",
        "HAVING, not WHERE, is the correct tool here, since the filter condition (SUM(orders.quantity) > 2) depends on the aggregated result of a GROUP BY, which doesn't exist yet at the point WHERE would run.",
      ],
    },
    commonMistakes: [
      "Writing WHERE COUNT(*) > 5 instead of HAVING COUNT(*) > 5 -- WHERE runs before grouping, when there's no aggregated COUNT(*) to reference yet; this is a genuine SQL error, not just a style issue.",
      "Assuming AVG(column) treats NULL values as 0 -- it doesn't; NULLs are excluded entirely from the average's denominator, which can silently change the result in ways that don't match the intended calculation.",
      "Chaining JOINs with an incorrect or missing ON condition on one of the joins -- this silently produces a cross-product-like explosion of rows (every row of one table paired with every row of the other) rather than an error, which can be hard to notice if you don't check the row count.",
    ],
    quiz: [
      {
        id: "pg-q7-1",
        prompt: "Why is `WHERE COUNT(*) > 5` invalid, while `HAVING COUNT(*) > 5` is correct?",
        choices: [
          "There's no real difference; both work identically",
          "WHERE filters individual rows BEFORE grouping happens, so there's no aggregated COUNT(*) value yet to compare against; HAVING filters AFTER grouping, when COUNT(*) is a real, computed value per group",
          "COUNT(*) can never be used in any filter clause",
          "HAVING is simply a newer, preferred alias for WHERE",
        ],
        correctIndex: 1,
        explanation:
          "This is the entire WHERE-vs-HAVING distinction: WHERE operates on the raw rows before GROUP BY collapses them into groups, so aggregate functions like COUNT(*) don't exist yet at that stage. HAVING runs specifically after grouping, when per-group aggregate values are available to filter on.",
      },
      {
        id: "pg-q7-2",
        prompt:
          "A column has 10 rows, 3 of which are NULL. What does AVG(column) compute the average over?",
        choices: [
          "All 10 rows, treating the 3 NULLs as 0",
          "Only the 7 non-NULL rows -- NULLs are excluded from both the sum and the count used for the average, not treated as zero",
          "AVG() throws an error if any NULL is present",
          "The 3 NULL rows only",
        ],
        correctIndex: 1,
        explanation:
          "SQL's aggregate functions (AVG, SUM, MIN, MAX) all silently skip NULL values rather than substituting zero — the average is computed only over the 7 rows that actually have a value, which can meaningfully change the result if NULLs are common and were expected to count as zero.",
      },
      {
        id: "pg-q7-3",
        prompt:
          "Why is this lesson's SQL run in a real, executing runner, unlike the PostgreSQL-specific-type lesson before it?",
        choices: [
          "This lesson's SQL is simpler and therefore safe to run anywhere",
          "Standard JOIN/GROUP BY/HAVING/aggregate-function syntax is genuinely dialect-compatible between SQLite (this sandbox) and PostgreSQL, so what runs here behaves the same way in real PostgreSQL -- unlike PostgreSQL-specific types or server features",
          "PostgreSQL and SQLite are actually the same underlying engine",
          "This lesson's SQL doesn't actually execute either; the Run button is decorative",
        ],
        correctIndex: 1,
        explanation:
          "The platform's honesty policy allows the real SQL runner (SQLite) specifically where the syntax genuinely behaves the same in PostgreSQL — joins, GROUP BY, HAVING, and the core aggregate functions qualify. PostgreSQL-specific types, transactions, and server features do not, which is why those lessons don't use the SQL runner.",
      },
    ],
    takeaway:
      "WHERE filters rows before grouping; HAVING filters groups after aggregation — using the wrong one either fails outright (WHERE referencing an aggregate) or silently returns the wrong rows (HAVING conditions that should have been WHERE, filtering too late to be efficient or, in some cases, too late to be correct).",
    summary:
      "Multi-table joins chain ON conditions through intermediate tables. WHERE filters individual rows pre-aggregation; HAVING filters groups post-aggregation. COUNT(*) counts all rows; COUNT(column) counts only non-NULL values; AVG/SUM/MIN/MAX all silently exclude NULLs rather than treating them as zero.",
    nextLessonSlug: "pg-subqueries-and-ctes",
  },
  {
    id: "pg-subqueries-and-ctes",
    slug: "pg-subqueries-and-ctes",
    title: "Subqueries and Common Table Expressions",
    description:
      "Nesting a query inside another to answer a question a single flat query can't, and CTEs — the readable, nameable alternative for anything beyond a trivial subquery.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["pg-joins-and-aggregation"],
    objectives: [
      "Write a subquery in a WHERE clause to filter based on a computed set of values",
      "Rewrite a nested subquery as a WITH (CTE) for clarity",
      "Explain when a CTE genuinely improves a query over an equivalent subquery, and when it's just a style preference",
    ],
    skills: ["postgresql", "sql", "subqueries", "ctes"],
    tech: [
      { name: "PostgreSQL", version: "16 (examples remain valid on 17+)" },
      {
        name: "SQLite (this lesson's browser sandbox)",
        version: "3 — subquery and WITH/CTE syntax used here is dialect-compatible",
      },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — 7.8. WITH Queries (Common Table Expressions)",
        url: "https://www.postgresql.org/docs/16/queries-with.html",
      },
    ],
    keywords: ["subqueries", "cte", "with clause", "postgresql"],
    explanation: `**This lesson's exercises run in this sandbox's real SQL runner, which is SQLite, not PostgreSQL.** Subquery and \`WITH\`/CTE syntax is genuinely dialect-compatible between the two, so what you build and run here behaves the same way in a real PostgreSQL database.

A **subquery** is a complete \`SELECT\` nested inside another query, most commonly inside a \`WHERE\` clause: \`SELECT * FROM books WHERE author_id IN (SELECT id FROM authors WHERE country = 'Nigeria')\` first resolves the inner query to a set of author IDs, then uses that set to filter books. This answers a genuinely different kind of question than a join alone can: "books whose author matches some condition" without needing every one of that author's columns in the final result, and without risking the row-multiplication a join can introduce when the relationship isn't strictly one-to-one.

A **Common Table Expression (CTE)**, written with \`WITH name AS (SELECT ...)\`, defines a named, temporary result set at the top of a query that the rest of the query can reference by name, as if it were a real table: \`WITH nigerian_authors AS (SELECT id FROM authors WHERE country = 'Nigeria') SELECT * FROM books WHERE author_id IN (SELECT id FROM nigerian_authors)\`. For this simple case, the CTE and the plain subquery are functionally equivalent — the real payoff shows up as a query grows: a CTE gives an intermediate result set a **readable name**, can be **referenced multiple times** in the same query without repeating its logic, and — critically — **cannot be nested more than one level deep visually**, which keeps a complex, multi-step query readable as a sequence of named steps rather than a subquery buried inside a subquery inside a subquery.

For genuinely simple, single-use filtering, a plain subquery and an equivalent CTE are functionally the same, and choosing between them is largely a readability preference. The CTE's real advantage appears specifically when: the same intermediate result is needed more than once in the query, the logic is complex enough that a descriptive name meaningfully aids understanding, or — PostgreSQL specifically also supports **recursive CTEs** (\`WITH RECURSIVE\`), which can express genuinely different queries a plain subquery cannot express at all, such as walking an arbitrary-depth hierarchy (an org chart, a category tree) in a single query — a capability worth knowing exists even though this introductory lesson's exercises stay with non-recursive CTEs.`,
    example: {
      language: "sql",
      description:
        "The same result via a plain subquery, then via an equivalent, more readable CTE -- both genuinely run here.",
      code: `-- Plain subquery version:
SELECT title, price
FROM books
WHERE author_id IN (SELECT id FROM authors WHERE country = 'Nigeria');

-- Equivalent CTE version -- for this simple case, purely a readability choice:
WITH nigerian_authors AS (
  SELECT id FROM authors WHERE country = 'Nigeria'
)
SELECT title, price
FROM books
WHERE author_id IN (SELECT id FROM nigerian_authors);`,
      editable: false,
    },
    editableExample: {
      language: "sql",
      description:
        "Change the country filter inside the CTE to a different country and see the results change.",
      code: `WITH selected_authors AS (
  SELECT id FROM authors WHERE country = 'Japan'
)
SELECT title, price
FROM books
WHERE author_id IN (SELECT id FROM selected_authors);`,
      editable: true,
    },
    guidedExercise: {
      id: "pg-8-guided",
      kind: "guided",
      language: "sql",
      prompt:
        "Write a query using a subquery in WHERE to return the titles of books priced ABOVE the average price of all books (do not hard-code the average -- compute it with a subquery).",
      starterCode: `SELECT title
FROM books
WHERE price > (___);`,
      solutionCode: `SELECT title
FROM books
WHERE price > (SELECT AVG(price) FROM books);`,
      seedSql: BOOKSTORE_SEED_SQL,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description: "Returns only books priced above the computed average",
          hidden: false,
        },
      ],
      hints: [
        "The subquery (SELECT AVG(price) FROM books) computes a single value, which the outer WHERE can compare against directly.",
        "Never hard-code the actual average number -- the subquery must compute it, so the query stays correct even as the underlying data changes.",
      ],
    },
    independentExercise: {
      id: "pg-8-independent",
      kind: "independent",
      language: "sql",
      prompt:
        "Using a CTE, write a query that finds every author whose books have a combined total value (SUM of price across all their books) greater than 30, returning the author's name and that total. Name your CTE author_totals.",
      starterCode: `-- WITH author_totals AS (
--   SELECT author_id, SUM(price) AS total_value FROM books GROUP BY author_id
-- )
-- SELECT authors.name, author_totals.total_value FROM authors JOIN author_totals ON ...`,
      solutionCode: `WITH author_totals AS (
  SELECT author_id, SUM(price) AS total_value
  FROM books
  GROUP BY author_id
)
SELECT authors.name AS name, author_totals.total_value AS total_value
FROM authors
JOIN author_totals ON authors.id = author_totals.author_id
WHERE author_totals.total_value > 30;`,
      seedSql: BOOKSTORE_SEED_SQL,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description:
            "Returns exactly the authors whose combined book value exceeds 30, with the correct totals",
          hidden: false,
        },
      ],
      hints: [
        "The CTE computes one aggregated row per author; the outer query then joins that named result back to authors to get each author's name.",
        "WHERE on the outer query filters the already-joined rows by the CTE's computed total_value -- this could also be done with HAVING inside the CTE itself.",
      ],
    },
    commonMistakes: [
      "Hard-coding a computed value (like an average) instead of using a subquery to compute it dynamically -- this silently becomes wrong the moment the underlying data changes.",
      "Nesting subqueries several levels deep instead of extracting intermediate steps into named CTEs -- deeply nested subqueries are notoriously hard to read and debug, exactly the problem CTEs exist to solve.",
      "Repeating the same subquery logic multiple times in one query instead of defining it once as a CTE -- besides being harder to read, this risks the two copies silently drifting out of sync if one is edited without the other.",
    ],
    quiz: [
      {
        id: "pg-q8-1",
        prompt:
          "In `WHERE author_id IN (SELECT id FROM authors WHERE country = 'Nigeria')`, what does the subquery evaluate to?",
        choices: [
          "A single number",
          "A set of id values -- one for every author from Nigeria -- which the outer IN then checks membership against",
          "A boolean true/false",
          "This is invalid SQL syntax",
        ],
        correctIndex: 1,
        explanation:
          "A subquery used with IN evaluates to a set of values (here, every matching author's id), and the outer query's IN checks whether each row's author_id appears anywhere in that set — exactly like checking array membership.",
      },
      {
        id: "pg-q8-2",
        prompt:
          "For a simple, single-use filter, what is the functional difference between an equivalent plain subquery and a CTE?",
        choices: [
          "CTEs always run faster",
          "For a simple, single-use case, they're functionally equivalent -- the CTE's real advantages (naming, reuse, avoiding deep nesting) matter more as a query grows in complexity",
          "Subqueries cannot use aggregate functions",
          "CTEs are a completely different, incompatible query mechanism",
        ],
        correctIndex: 1,
        explanation:
          "For a simple case like this lesson's example, both approaches produce the same result the same way — the CTE's benefits (a readable name, single-definition reuse, avoiding multi-level nesting) become genuinely meaningful specifically once a query needs the same intermediate result more than once or grows complex enough that naming its steps aids understanding.",
      },
      {
        id: "pg-q8-3",
        prompt:
          "What can a recursive CTE (WITH RECURSIVE) express that a plain, non-recursive subquery cannot?",
        choices: [
          "Nothing -- they're equivalent in capability",
          "Traversing an arbitrary-depth hierarchy (like an org chart or category tree) in a single query, by having the CTE reference itself",
          "Recursive CTEs are purely a performance optimization with no new capability",
          "Filtering rows by a computed average",
        ],
        correctIndex: 1,
        explanation:
          "A recursive CTE can reference itself, letting it walk a hierarchy of unknown depth (each 'level' built from the previous one) in a single query — a genuinely different capability from a plain subquery, which can't refer to itself and therefore can't express this kind of self-referential traversal.",
      },
    ],
    takeaway:
      "A subquery and an equivalent CTE are functionally the same for simple, single-use cases — reach for a CTE once the same intermediate result is needed more than once, or once naming an intermediate step would make a complex query meaningfully more readable than a nested subquery.",
    summary:
      "A subquery nests a complete SELECT inside another query, commonly in WHERE. A CTE (WITH name AS (...)) names an intermediate result set that the rest of the query can reference, avoiding deep nesting and repeated logic. PostgreSQL's recursive CTEs (WITH RECURSIVE) can express hierarchy traversal a plain subquery cannot.",
    nextLessonSlug: "pg-window-functions",
  },
  {
    id: "pg-window-functions",
    slug: "pg-window-functions",
    title: "Window Functions: Calculations Across Rows Without Collapsing Them",
    description:
      "The one capability GROUP BY fundamentally can't offer — a per-row calculation that sees other rows in its group without collapsing the result down to one row per group.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 8,
    difficulty: "advanced",
    estimatedMinutes: 21,
    prerequisites: ["pg-subqueries-and-ctes"],
    objectives: [
      "Explain how a window function differs fundamentally from GROUP BY aggregation",
      "Use ROW_NUMBER() and RANK() with PARTITION BY and ORDER BY",
      "Use a window function to compute a running total or per-group rank without collapsing rows",
    ],
    skills: ["postgresql", "sql", "window-functions"],
    tech: [
      { name: "PostgreSQL", version: "16 (examples remain valid on 17+)" },
      {
        name: "SQLite (this lesson's browser sandbox)",
        version:
          "3.25+ — standard OVER()/PARTITION BY/ORDER BY window-function syntax used here is dialect-compatible",
      },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — 3.5. Window Functions",
        url: "https://www.postgresql.org/docs/16/tutorial-window.html",
      },
    ],
    keywords: ["window functions", "row_number", "rank", "partition by", "postgresql"],
    explanation: `**This lesson's exercises run in this sandbox's real SQL runner, which is SQLite, not PostgreSQL.** Standard \`OVER()\`/\`PARTITION BY\`/\`ORDER BY\` window-function syntax is genuinely dialect-compatible between the two, so what you build and run here behaves the same way in a real PostgreSQL database.

\`GROUP BY\` fundamentally **collapses** many rows into one summary row per group — you lose the individual rows, keeping only the aggregate. A **window function** does something genuinely different: it computes a value *across* a group of related rows (a "window") while **keeping every individual row in the result**. \`SELECT title, price, AVG(price) OVER () AS overall_avg FROM books\` returns every single book row, each annotated with the *same* overall average price alongside it — something \`GROUP BY\` cannot do at all without a separate subquery joined back in, precisely because grouping and "keep every row" are structurally incompatible with each other.

The \`OVER (...)\` clause defines the window. \`PARTITION BY genre\` divides rows into groups (partitions) the way \`GROUP BY\` would, but again, without collapsing anything — each row still appears individually, now annotated with a value computed *within its own partition*. \`ORDER BY price DESC\` inside the same \`OVER (...)\` clause additionally defines a per-partition ordering, which specific window functions use directly: \`ROW_NUMBER() OVER (PARTITION BY genre ORDER BY price DESC)\` assigns each book a unique, sequential rank *within its own genre*, ordered by price — "the 1st, 2nd, 3rd most expensive book in Fiction," independently restarting the count for Nonfiction.

\`ROW_NUMBER()\` always assigns strictly sequential, unique numbers (1, 2, 3, 4...) even when values tie — ties are broken arbitrarily (by row order) unless the \`ORDER BY\` fully disambiguates them. \`RANK()\`, by contrast, gives **tied rows the same rank**, then **skips** the following rank number(s) accordingly (1, 2, 2, 4 — note there's no 3, since two rows tied for 2nd). \`SUM(price) OVER (ORDER BY order_date)\` (with no \`PARTITION BY\`) computes a **running total** — each row's window is "every row up to and including this one," in the specified order — a genuinely different, common calculation (a running balance, a cumulative count) that would otherwise require a self-join or a correlated subquery to express without window functions.`,
    example: {
      language: "sql",
      description:
        "PARTITION BY and ROW_NUMBER(), genuinely running here -- standard window-function syntax, dialect-compatible with PostgreSQL.",
      code: `-- Rank each book by price WITHIN its own genre, without collapsing any rows:
SELECT
  title,
  genre,
  price,
  ROW_NUMBER() OVER (PARTITION BY genre ORDER BY price DESC) AS rank_in_genre
FROM books
ORDER BY genre, rank_in_genre;`,
      editable: false,
    },
    editableExample: {
      language: "sql",
      description:
        "Change ROW_NUMBER() to RANK() and compare how tied prices (if any) are handled differently.",
      code: `SELECT
  title,
  genre,
  price,
  RANK() OVER (PARTITION BY genre ORDER BY price DESC) AS rank_in_genre
FROM books
ORDER BY genre, rank_in_genre;`,
      editable: true,
    },
    guidedExercise: {
      id: "pg-9-guided",
      kind: "guided",
      language: "sql",
      prompt:
        "Write a query returning every book's title, price, and the AVERAGE price across ALL books (using AVG(...) OVER (), no PARTITION BY) alongside it -- every row should show the same overall average, with no rows collapsed.",
      starterCode: `SELECT title, price, ___ AS overall_avg
FROM books;`,
      solutionCode: `SELECT title, price, AVG(price) OVER () AS overall_avg
FROM books;`,
      seedSql: BOOKSTORE_SEED_SQL,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description:
            "Returns every book row individually, each annotated with the same overall average price",
          hidden: false,
        },
      ],
      hints: [
        "OVER () with empty parentheses means the window is the entire result set -- no partitioning, no ordering.",
        "Unlike GROUP BY, this returns one row PER BOOK, not one row total -- that preserved row count is the whole point of a window function.",
      ],
    },
    independentExercise: {
      id: "pg-9-independent",
      kind: "independent",
      language: "sql",
      prompt:
        "Write a query returning each book's title, genre, price, and its RANK() within its own genre by price descending (most expensive = rank 1), ordered by genre then rank.",
      starterCode: `-- SELECT title, genre, price, RANK() OVER (PARTITION BY ___ ORDER BY ___) AS price_rank
-- FROM books
-- ORDER BY genre, price_rank;`,
      solutionCode: `SELECT title, genre, price, RANK() OVER (PARTITION BY genre ORDER BY price DESC) AS price_rank
FROM books
ORDER BY genre, price_rank;`,
      seedSql: BOOKSTORE_SEED_SQL,
      sqlOrderSensitive: true,
      harness: "-- checked by comparing rows against solutionCode",
      tests: [
        {
          id: "t1",
          description:
            "Correctly ranks each book within its own genre by price, with all rows preserved",
          hidden: false,
        },
      ],
      hints: [
        "PARTITION BY genre restarts the ranking independently for each genre.",
        "RANK() (not ROW_NUMBER()) is specified here specifically so tied prices, if any exist in the data, correctly receive the same rank.",
      ],
    },
    commonMistakes: [
      "Trying to use GROUP BY to get 'each row plus a group-level statistic' -- GROUP BY structurally collapses rows; only a window function (or a GROUP BY subquery joined back to the original rows) can annotate every individual row with a group-level value.",
      "Using ROW_NUMBER() when RANK() is actually needed (or vice versa) -- ROW_NUMBER() always gives unique sequential numbers even for ties, which silently breaks a tie arbitrarily; RANK() correctly gives tied rows the same rank, which matters whenever ties are meaningful to the result (a leaderboard, for instance).",
      "Forgetting PARTITION BY when a per-group calculation is intended -- OVER (ORDER BY price) with no PARTITION BY computes across the ENTIRE result set, not per group, which silently produces a running total or rank spanning every group combined instead of resetting per group.",
    ],
    quiz: [
      {
        id: "pg-q9-1",
        prompt:
          "What is the fundamental difference between GROUP BY and a window function (OVER (...))?",
        choices: [
          "There is no real difference; they're interchangeable syntax",
          "GROUP BY collapses many rows into one summary row per group; a window function computes an aggregate-like value across related rows WITHOUT collapsing any of them -- every individual row remains in the result",
          "Window functions can only be used with COUNT",
          "GROUP BY is only available in PostgreSQL, not SQLite",
        ],
        correctIndex: 1,
        explanation:
          "This is the core distinction the whole lesson is built around: GROUP BY's entire purpose is to reduce many rows to one summary row per group, which is structurally incompatible with also wanting every individual row preserved — a window function is specifically designed to compute group-aware values while keeping every row intact.",
      },
      {
        id: "pg-q9-2",
        prompt:
          "Three books tie for the highest price within a genre. How does RANK() differ from ROW_NUMBER() in handling this tie?",
        choices: [
          "They behave identically",
          "RANK() assigns all three the SAME rank (e.g. 1, 1, 1) and then skips ahead (the next distinct price gets rank 4); ROW_NUMBER() assigns three DIFFERENT sequential numbers (1, 2, 3), breaking the tie arbitrarily",
          "ROW_NUMBER() refuses to run when ties exist",
          "RANK() throws an error on ties",
        ],
        correctIndex: 1,
        explanation:
          "RANK() explicitly preserves ties by giving tied rows the same rank number, then skipping the appropriate number of subsequent ranks to keep the numbering consistent with 'how many rows came before.' ROW_NUMBER() ignores ties entirely and always assigns strictly sequential, unique numbers, arbitrarily deciding an order among tied rows.",
      },
      {
        id: "pg-q9-3",
        prompt: "What does PARTITION BY genre do inside an OVER (...) clause?",
        choices: [
          "It deletes rows not matching a specific genre",
          "It divides the result set into independent groups by genre for the window function's calculation, without collapsing any rows -- e.g. a rank restarts at 1 for each genre",
          "It sorts the final result by genre",
          "It is equivalent to a WHERE clause filtering by genre",
        ],
        correctIndex: 1,
        explanation:
          "PARTITION BY defines separate windows, one per distinct genre value, so a window function computes independently within each partition (a rank resets to 1 at the start of each new genre) — all rows from every genre still appear in the final result; nothing is filtered or removed.",
      },
    ],
    takeaway:
      "A window function computes a group-aware value while preserving every individual row — the one thing GROUP BY structurally cannot do — with PARTITION BY defining independent groups and ORDER BY (inside OVER) defining the per-group sequence that ROW_NUMBER, RANK, and running totals rely on.",
    summary:
      "Window functions (OVER (...)) compute across related rows without collapsing them, unlike GROUP BY. PARTITION BY divides rows into independent groups; ORDER BY inside OVER defines per-group sequence. ROW_NUMBER() gives unique sequential numbers even for ties; RANK() gives tied rows the same rank and skips ahead. A running total uses SUM(...) OVER (ORDER BY ...) with no PARTITION BY.",
    nextLessonSlug: "pg-transactions-and-acid",
  },
  {
    id: "pg-transactions-and-acid",
    slug: "pg-transactions-and-acid",
    title: "Transactions and ACID Guarantees",
    description:
      "Grouping several statements into one all-or-nothing unit, and the four ACID properties that make a transaction a genuine guarantee rather than a convention.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["pg-window-functions"],
    objectives: [
      "Explain what BEGIN/COMMIT/ROLLBACK actually guarantee for a group of statements",
      "Define each of the four ACID properties in your own terms",
      "Identify a scenario where skipping a transaction would leave data in an inconsistent state",
    ],
    skills: ["postgresql", "transactions", "acid"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — Chapter 13: Concurrency Control",
        url: "https://www.postgresql.org/docs/16/mvcc.html",
      },
      {
        label: "PostgreSQL 16 Documentation — SQL Commands: BEGIN",
        url: "https://www.postgresql.org/docs/16/sql-begin.html",
      },
    ],
    keywords: ["transactions", "acid", "begin commit rollback", "postgresql"],
    explanation: `**This lesson's code is real PostgreSQL syntax and behavior, shown for reading, not executed here.** SQLite's transaction model exists but genuinely differs in important ways (locking granularity, concurrent-connection behavior) from PostgreSQL's — demonstrating transaction semantics honestly needs a real, multi-connection PostgreSQL instance, which is exactly what this module's guided local lab provides.

A **transaction** groups multiple SQL statements into one all-or-nothing unit: \`BEGIN;\` starts it, every statement afterward is provisional until \`COMMIT;\` makes all of them permanent together, or \`ROLLBACK;\` discards every one of them as if none had ever run — there is no partial state where some statements in the transaction took effect and others didn't. This matters enormously the moment an operation genuinely requires more than one statement to stay consistent: transferring money between two accounts is \`UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2;\` — two separate statements that must either both succeed or both fail together, since a crash between them (with only the first statement applied) would make money vanish from the system entirely.

**ACID** names the four guarantees a transaction provides. **Atomicity** is exactly the all-or-nothing property just described. **Consistency** means a transaction can only move the database from one valid state (satisfying every constraint — foreign keys, checks, uniqueness) to another valid state; a transaction that would violate a constraint is rejected entirely, not partially applied. **Isolation** means concurrent transactions don't see each other's uncommitted, in-progress changes (the exact behavior explored in depth in the next lesson) — without it, one transaction could read another's half-finished work and act on data that's about to be rolled back and never actually existed. **Durability** means once \`COMMIT\` succeeds, the change survives — a server crash one millisecond later cannot undo a committed transaction, because PostgreSQL has already written it to durable storage (the write-ahead log) before confirming the commit.

The honest, important caveat: **ACID guarantees correctness properties of a single database's transactions — it does not eliminate every category of concurrency bug on its own** (the next lesson covers specific anomalies that can still occur depending on the chosen isolation level), and it says nothing at all about coordinating a transaction that spans *multiple, separate* databases or services (a genuinely harder problem with its own separate body of technique). ACID is a precise, powerful guarantee about what a *single* transaction against a *single* database will and won't do — not a claim that every possible correctness problem in a distributed system disappears once you wrap statements in \`BEGIN\`/\`COMMIT\`.`,
    example: {
      language: "none",
      description:
        "Real PostgreSQL transaction syntax and its ACID guarantees, shown for reading -- genuinely testable only against a real, multi-connection PostgreSQL server, which this module's guided local lab provides.",
      code: `BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- If BOTH statements succeeded and the constraints all hold, make it permanent:
COMMIT;

-- If anything went wrong (a constraint violation, an application-detected error,
-- or you simply change your mind before committing), discard everything since BEGIN:
-- ROLLBACK;

-- A constraint violation forces an automatic rollback of the whole transaction:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1; -- succeeds
UPDATE accounts SET balance = balance + 100 WHERE id = 999; -- fails: id 999 has a CHECK violation
-- The ENTIRE transaction is now aborted -- the first UPDATE is also rolled back,
-- even though it individually would have succeeded on its own.
ROLLBACK;`,
    },
    guidedExercise: {
      id: "pg-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write runTransaction(statements, apply, validate) modeling atomicity: apply each statement in order (via apply(state, statement), which returns a new state), but if validate(finalState) returns false at the end, discard ALL changes and return the ORIGINAL state (a rollback) instead of the modified one.",
      starterCode: `function runTransaction(initialState, statements, apply, validate) {
  let state = initialState;
  // TODO: apply every statement in order, building up 'state'
  // TODO: if validate(state) is false at the end, return initialState instead (rollback)
  return state;
}
`,
      solutionCode: `function runTransaction(initialState, statements, apply, validate) {
  let state = initialState;
  for (const statement of statements) {
    state = apply(state, statement);
  }
  if (!validate(state)) {
    return initialState; // rollback: discard everything, as if the transaction never ran
  }
  return state;
}`,
      harness: `
        function apply(state, statement) {
          return { ...state, [statement.account]: state[statement.account] + statement.delta };
        }
        try {
          const result = runTransaction({ a: 100, b: 50 }, [{account:"a",delta:-100},{account:"b",delta:100}], apply, s => s.a >= 0);
          window.__report('t1', result.a === 0 && result.b === 150, 'a valid transaction should apply all statements and commit');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const result = runTransaction({ a: 50, b: 50 }, [{account:"a",delta:-100},{account:"b",delta:100}], apply, s => s.a >= 0);
          window.__report('t2', result.a === 50 && result.b === 50, 'a transaction that would violate validation should roll back to the ORIGINAL state, not a partial one');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "commits a valid transaction, applying every statement" },
        {
          id: "t2",
          description:
            "rolls back to the exact original state when validation fails, not a partially-applied state",
        },
      ],
      hints: [
        "The rollback case must return initialState exactly, not the partially-modified state -- that's the entire point of atomicity: no partial application is ever visible.",
        "This models exactly what a CHECK constraint violation does inside a real PostgreSQL transaction: the whole transaction is aborted, not just the failing statement.",
      ],
    },
    independentExercise: {
      id: "pg-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write transferFunds(accounts, fromId, toId, amount) modeling a real money-transfer transaction: it must throw (leaving accounts COMPLETELY UNCHANGED) if fromId or toId don't exist, if amount <= 0, or if the source account's balance would go negative -- and only apply BOTH balance changes together if every check passes.",
      starterCode: `function transferFunds(accounts, fromId, toId, amount) {
  // accounts: array of { id, balance }
  // TODO: validate first (throw with NO mutation on any failure), then apply both changes together
  return accounts;
}
`,
      solutionCode: `function transferFunds(accounts, fromId, toId, amount) {
  const from = accounts.find(a => a.id === fromId);
  const to = accounts.find(a => a.id === toId);
  if (!from) throw new Error("source account not found");
  if (!to) throw new Error("destination account not found");
  if (amount <= 0) throw new Error("amount must be positive");
  if (from.balance - amount < 0) throw new Error("insufficient funds");
  return accounts.map(a => {
    if (a.id === fromId) return { ...a, balance: a.balance - amount };
    if (a.id === toId) return { ...a, balance: a.balance + amount };
    return a;
  });
}`,
      harness: `
        try {
          const result = transferFunds([{id:1,balance:100},{id:2,balance:50}], 1, 2, 30);
          window.__report('t1', result.find(a=>a.id===1).balance === 70 && result.find(a=>a.id===2).balance === 80, 'a valid transfer should update both accounts correctly');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const original = [{id:1,balance:10},{id:2,balance:50}];
          let threw = false;
          try { transferFunds(original, 1, 2, 100); } catch (e) { threw = true; }
          window.__report('t2', threw && original[0].balance === 10 && original[1].balance === 50, 'insufficient funds should throw and leave the original data completely unchanged');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          let threw = false;
          try { transferFunds([{id:1,balance:100}], 1, 999, 10); } catch (e) { threw = true; }
          window.__report('t3', threw, 'a missing destination account should throw'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try {
          let threw = false;
          try { transferFunds([{id:1,balance:100},{id:2,balance:50}], 1, 2, -5); } catch (e) { threw = true; }
          window.__report('t4', threw, 'a non-positive amount should throw'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a valid transfer correctly updates both accounts" },
        {
          id: "t2",
          description:
            "insufficient funds throws and leaves the original data completely untouched",
        },
        { id: "t3", description: "a missing account throws" },
        { id: "t4", description: "a non-positive amount throws" },
      ],
      hints: [
        "Validate everything FIRST, before touching any balance -- this is what guarantees atomicity: either every check passes and both changes apply, or nothing changes at all.",
        "The original input array must never be mutated by a failed attempt -- return a NEW array only on success, matching the immutable-update pattern from earlier courses.",
      ],
    },
    commonMistakes: [
      "Running two statements that must stay consistent (like a two-account transfer) as separate, un-transacted operations -- a crash or error between them can leave the data in a state that violates the business rule they were supposed to jointly enforce.",
      "Assuming ACID alone eliminates every concurrency bug -- Atomicity, Consistency, Isolation, and Durability are precise, real guarantees, but Isolation specifically has multiple levels with different tradeoffs (covered in the next lesson), and not every isolation level prevents every possible anomaly.",
      "Assuming a transaction against one database automatically extends to coordinate changes across a completely separate database or service -- ACID guarantees apply to a single database's transaction; coordinating multiple, independent systems is a separate, harder problem.",
    ],
    quiz: [
      {
        id: "pg-q10-1",
        prompt:
          "A transaction contains two UPDATE statements. The first succeeds; the second violates a CHECK constraint. What happens to the first UPDATE?",
        choices: [
          "It remains applied, since it succeeded on its own",
          "The entire transaction is rolled back, including the first UPDATE, even though it individually would have succeeded -- atomicity means all-or-nothing for the whole transaction",
          "PostgreSQL asks the application which statements to keep",
          "Both statements are retried automatically",
        ],
        correctIndex: 1,
        explanation:
          "Atomicity is specifically the guarantee that a transaction's statements succeed or fail as one indivisible unit — a later statement's failure rolls back everything since BEGIN, regardless of whether an earlier statement would have succeeded in isolation.",
      },
      {
        id: "pg-q10-2",
        prompt: "What does the 'D' in ACID (Durability) guarantee?",
        choices: [
          "A transaction cannot be rolled back once started",
          "Once COMMIT succeeds, the change survives even an immediate crash -- it has already been written to durable storage before the commit is confirmed",
          "The database will never lose data under any circumstances, including hardware destruction",
          "Durability refers to how long a transaction is allowed to run",
        ],
        correctIndex: 1,
        explanation:
          "Durability specifically means a successfully committed transaction's effects survive a crash immediately afterward — PostgreSQL writes changes to a durable, crash-safe log (the write-ahead log) before confirming the COMMIT succeeded, so a crash a moment later cannot silently undo it.",
      },
      {
        id: "pg-q10-3",
        prompt:
          "Why is it inaccurate to say 'ACID means my database can never have a concurrency bug'?",
        choices: [
          "ACID is a marketing term with no real technical meaning",
          "ACID's Isolation property has multiple distinct levels with different tradeoffs, and not every level prevents every possible concurrency anomaly -- 'ACID-compliant' does not automatically mean 'immune to every race condition'",
          "ACID only applies to read-only queries",
          "PostgreSQL does not actually implement full ACID guarantees",
        ],
        correctIndex: 1,
        explanation:
          "ACID is a real, precise set of guarantees, but Isolation specifically is a spectrum, not a single fixed behavior — different isolation levels permit different anomalies to remain possible, which is exactly what the next lesson examines in detail. 'ACID-compliant' is not the same claim as 'no concurrency bugs are possible.'",
      },
    ],
    takeaway:
      "A transaction's atomicity guarantees a group of statements succeeds or fails as one indivisible unit — never partially applied — and ACID as a whole is a precise, powerful, but bounded set of guarantees about a single database's transactions, not an automatic solution to every concurrency or distributed-systems problem.",
    summary:
      "BEGIN/COMMIT/ROLLBACK group statements into an all-or-nothing transaction. Atomicity (all-or-nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don't see each other's uncommitted work), and Durability (a commit survives a crash) are the four ACID guarantees — precise properties of a single database's transactions, not a blanket immunity to every concurrency bug.",
    nextLessonSlug: "pg-concurrency-and-isolation",
  },
  {
    id: "pg-concurrency-and-isolation",
    slug: "pg-concurrency-and-isolation",
    title: "Concurrent-Update Problems and Isolation Levels",
    description:
      "The specific anomalies that happen when two transactions overlap in time, and how PostgreSQL's isolation levels trade off which of those anomalies each one still permits.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 10,
    difficulty: "advanced",
    estimatedMinutes: 22,
    prerequisites: ["pg-transactions-and-acid"],
    objectives: [
      "Describe the lost-update and non-repeatable-read anomalies concretely",
      "Explain what PostgreSQL's default Read Committed isolation level does and does not prevent",
      "Choose an appropriate isolation level (or explicit locking) for a scenario with a concurrent-update risk",
    ],
    skills: ["postgresql", "concurrency", "isolation-levels"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — 13.2. Transaction Isolation",
        url: "https://www.postgresql.org/docs/16/transaction-iso.html",
      },
    ],
    keywords: ["concurrency", "isolation levels", "lost update", "postgresql"],
    explanation: `**This lesson's scenarios require two genuinely separate, concurrent database connections to demonstrate — something a single-connection browser sandbox cannot honestly show.** This module's guided local lab has you reproduce these exact anomalies yourself, with two real \`psql\` sessions running side by side against a real PostgreSQL server.

A **lost update** happens when two concurrent transactions both read the same row, both compute a new value based on what they read, and both write it back — the second write silently overwrites the first, and one of the two updates is lost entirely, with no error or warning. Two transactions both doing "read \`stock = 10\`, then \`UPDATE SET stock = 9\`" (each independently decrementing by one) can both succeed, leaving \`stock = 9\` — even though two units were actually sold and the correct final value was \`8\`. This is a real, common bug pattern, not a rare edge case: any "read a value, compute based on it, write it back" sequence run from application code (rather than as a single atomic SQL statement) is vulnerable to it.

A **non-repeatable read** happens when a transaction reads the same row twice and gets two *different* values, because another transaction committed a change to that row in between the two reads — the same query, run twice within what's supposed to be one consistent transaction, disagrees with itself. **Phantom reads** are the equivalent problem for a range of rows rather than a single row: a query re-run within the same transaction returns a *different set of rows* because another transaction inserted or deleted a matching row in between.

PostgreSQL's **default isolation level is Read Committed**: each individual statement within a transaction sees a fresh snapshot of *committed* data as of when that specific statement starts — meaning it never sees another transaction's uncommitted, in-progress work (this much is guaranteed at every isolation level), but it genuinely *is* vulnerable to non-repeatable reads and lost updates, because two different statements in the same transaction can see two different committed snapshots. **Repeatable Read** (PostgreSQL's stricter level) fixes non-repeatable reads by giving the *entire transaction* one consistent snapshot taken at its start, and also prevents most lost-update patterns — at the cost of PostgreSQL sometimes needing to abort and force a retry of a transaction that would otherwise violate that consistency (a "serialization failure," which application code must be prepared to catch and retry). The honest, practical takeaway: **the strongest guarantee, and the one specific problem it solves, must be chosen deliberately for the actual scenario** — Read Committed's default is the right choice for many ordinary queries, but a genuinely concurrent read-modify-write sequence (the stock-decrement example) needs either a stricter isolation level or an explicit row lock (\`SELECT ... FOR UPDATE\`) to be correct.`,
    example: {
      language: "none",
      description:
        "Real PostgreSQL transaction interleaving, shown for reading -- genuinely demonstrating this requires two separate psql sessions running concurrently, which this module's guided local lab has you do for real.",
      code: `-- Session A                              -- Session B
BEGIN;
SELECT stock FROM inventory WHERE id = 1;  -- reads 10
                                            BEGIN;
                                            SELECT stock FROM inventory WHERE id = 1; -- ALSO reads 10
UPDATE inventory SET stock = 9 WHERE id = 1;
COMMIT;                                    -- A's change is now committed
                                            UPDATE inventory SET stock = 9 WHERE id = 1; -- B computed 9 from its OWN read of 10
                                            COMMIT;
-- Final stock = 9, but TWO units were actually sold -- one update was silently lost.

-- The fix: an explicit row lock forces B to wait for A's transaction, then re-read the ALREADY-UPDATED value:
BEGIN;
SELECT stock FROM inventory WHERE id = 1 FOR UPDATE; -- locks the row; a concurrent FOR UPDATE on
                                                       -- the same row blocks until this transaction ends
UPDATE inventory SET stock = stock - 1 WHERE id = 1;
COMMIT;`,
    },
    guidedExercise: {
      id: "pg-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write simulateLostUpdate(initialStock, decrementCount) modeling the lost-update anomaly: 'decrementCount' concurrent transactions ALL read the SAME initial value before any of them writes, then all independently write (initialStock - 1) -- return the resulting stock (which will be wrong if decrementCount > 1, demonstrating the anomaly), plus the count of updates that were 'lost'.",
      starterCode: `function simulateLostUpdate(initialStock, decrementCount) {
  // TODO: every one of the decrementCount transactions reads initialStock (NOT the updated value from a prior one)
  // TODO: the LAST write wins -- the final stock is just (initialStock - 1), regardless of decrementCount
  // TODO: lostUpdates = decrementCount - 1 (every write after the first overwrote a previous one)
  return { finalStock: 0, lostUpdates: 0 };
}
`,
      solutionCode: `function simulateLostUpdate(initialStock, decrementCount) {
  const finalStock = initialStock - 1; // every transaction read the SAME initial value, so every write is identical
  const lostUpdates = decrementCount - 1;
  return { finalStock, lostUpdates };
}`,
      harness: `
        try {
          const r = simulateLostUpdate(10, 2);
          window.__report('t1', r.finalStock === 9 && r.lostUpdates === 1, 'with 2 concurrent decrements from a shared read of 10, final stock should be 9 (WRONG -- should be 8), with 1 lost update');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r = simulateLostUpdate(10, 5);
          window.__report('t2', r.finalStock === 9 && r.lostUpdates === 4, '5 concurrent decrements from the same initial read should lose 4 of the 5 updates');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const r = simulateLostUpdate(10, 1);
          window.__report('t3', r.finalStock === 9 && r.lostUpdates === 0, 'a single transaction with no concurrency has no lost updates'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly models the lost-update anomaly for 2 concurrent transactions",
        },
        {
          id: "t2",
          description: "correctly scales the lost-update count for more concurrent transactions",
        },
        { id: "t3", description: "a single, non-concurrent transaction has zero lost updates" },
      ],
      hints: [
        "This models the WORST case: every transaction reads the SAME stale value before any of them commits, so every write computes the identical, wrong result.",
        "The correct final answer, if all decrements had actually applied sequentially, would be initialStock - decrementCount -- comparing that to this function's (wrong) finalStock is exactly how you'd quantify the bug.",
      ],
    },
    independentExercise: {
      id: "pg-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write decrementWithLock(stock, decrementCount) modeling the FOR UPDATE fix: each of the decrementCount 'transactions' now reads the LATEST value (as if serialized one at a time by a lock, not the same stale initial value), so the result is correct. Then write recommendIsolationApproach(hasReadModifyWritePattern) returning 'row-lock-or-stricter-isolation' if true, otherwise 'default-read-committed-is-fine'.",
      starterCode: `function decrementWithLock(stock, decrementCount) {
  // TODO: simulate decrementCount SEQUENTIAL decrements (as a lock would force), not decrementCount parallel reads of the same value
  return stock;
}
function recommendIsolationApproach(hasReadModifyWritePattern) {
  // TODO
}
`,
      solutionCode: `function decrementWithLock(stock, decrementCount) {
  let current = stock;
  for (let i = 0; i < decrementCount; i++) {
    current = current - 1; // each iteration reads the LATEST value, exactly what a lock forces in reality
  }
  return current;
}
function recommendIsolationApproach(hasReadModifyWritePattern) {
  return hasReadModifyWritePattern ? "row-lock-or-stricter-isolation" : "default-read-committed-is-fine";
}`,
      harness: `
        try { window.__report('t1', decrementWithLock(10, 2) === 8, 'a locked, sequential decrement should give the CORRECT result of 8'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', decrementWithLock(10, 5) === 5, '5 sequential decrements from 10 should correctly give 5'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', recommendIsolationApproach(true) === "row-lock-or-stricter-isolation", 'a read-modify-write pattern should recommend a lock or stricter isolation'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', recommendIsolationApproach(false) === "default-read-committed-is-fine", 'a query with no read-modify-write pattern is fine with the default'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly models a locked, sequential decrement producing the right result",
        },
        { id: "t2", description: "scales correctly for more sequential decrements" },
        { id: "t3", description: "recommends a stronger approach for a read-modify-write pattern" },
        {
          id: "t4",
          description: "recommends the default for a pattern with no concurrent-update risk",
        },
      ],
      hints: [
        "The difference between this exercise and the guided one is exactly the difference FOR UPDATE makes in real PostgreSQL: forcing sequential access to the same row instead of allowing concurrent, stale reads.",
        "recommendIsolationApproach models the lesson's core practical guidance: choose stricter protection deliberately, based on whether the actual access pattern needs it.",
      ],
    },
    guidedLocalLab: {
      id: "pg-gll-transactions-and-indexes",
      title: "Add Transactions, Constraints, and Useful Indexes Locally",
      scenario:
        "Reproduce the lost-update anomaly for real, using two concurrent psql sessions against your local PostgreSQL install, fix it with FOR UPDATE, and add an index that measurably changes a query's execution plan.",
      requiredTools: [
        { name: "PostgreSQL server", version: "16 or newer" },
        { name: "psql", version: "matching your server version" },
        { name: "Two terminal windows (for two concurrent sessions)", version: "any" },
      ],
      setupSteps: [
        "Using the schema.sql from the earlier guided local lab (or a fresh learning_platform_lab database), add an inventory table: `CREATE TABLE inventory (course_id INTEGER PRIMARY KEY REFERENCES course(id), stock INTEGER NOT NULL CHECK (stock >= 0));` then seed one row with a starting stock.",
        "Open TWO separate terminal windows, each running `psql -d learning_platform_lab`, so you have two independent, concurrent sessions (Session A and Session B) against the same database.",
      ],
      projectStructure: `learning-platform-lab/
  inventory.sql
  concurrency-notes.md`,
      starterFiles: [
        {
          path: "inventory.sql",
          content: `-- TODO: CREATE TABLE inventory (course_id INTEGER PRIMARY KEY REFERENCES course(id),
--   stock INTEGER NOT NULL CHECK (stock >= 0))
-- TODO: seed one row, e.g. course_id = 1, stock = 10
-- TODO: add an index on enrollment(course_id) -- a column you'll frequently filter/join on
`,
        },
        {
          path: "concurrency-notes.md",
          content: `# Concurrency lab notes

Record what you observe here as you run the steps below.

## Step 1: Reproduce the lost update (WITHOUT a lock)
TODO: run the two-session interleaving from this lesson's explanation (both SELECT stock
before either UPDATEs), and record the WRONG final stock value you observe.

## Step 2: Fix it with FOR UPDATE
TODO: repeat the interleaving, but have Session A use
"SELECT stock FROM inventory WHERE course_id = 1 FOR UPDATE;" -- record what Session B's
SELECT ... FOR UPDATE does while Session A's transaction is still open (does it return
immediately, or wait?), and confirm the final stock is now correct.

## Step 3: EXPLAIN a query before and after your index
TODO: run EXPLAIN on a query filtering enrollment by course_id BEFORE adding the index,
then again AFTER -- record what changed in the plan's output.
`,
        },
      ],
      requirements: [
        "inventory.sql creates the inventory table with a CHECK (stock >= 0) constraint and seeds one row.",
        "concurrency-notes.md documents the WRONG final stock value observed from the unprotected, two-session interleaving.",
        "concurrency-notes.md documents that Session B's SELECT ... FOR UPDATE blocks (waits) while Session A's transaction holding the same row's lock is still open.",
        "concurrency-notes.md documents the CORRECT final stock value observed once FOR UPDATE is used.",
        "An index exists on enrollment(course_id), and concurrency-notes.md records a visible difference in EXPLAIN output before and after it existed.",
      ],
      commands: [
        {
          description: "Apply the inventory table and seed data",
          command: "psql -d learning_platform_lab -f inventory.sql",
        },
        { description: "Session A", command: "psql -d learning_platform_lab" },
        {
          description: "Session B (a second terminal, run concurrently with Session A)",
          command: "psql -d learning_platform_lab",
        },
        {
          description: "Check query plan before/after indexing",
          command: "EXPLAIN SELECT * FROM enrollment WHERE course_id = 1;",
        },
      ],
      expectedBehavior:
        "Without FOR UPDATE, two overlapping sessions decrementing the same row from a shared initial read produce a final stock one higher than correct (a lost update). With FOR UPDATE, Session B's SELECT visibly blocks until Session A's transaction commits or rolls back, and the final stock is correct. EXPLAIN's output changes from a Seq Scan (before the index) to an Index Scan (after it) for a query filtering on the indexed column.",
      verificationSteps: [
        {
          command: "(Session A) BEGIN; SELECT stock FROM inventory WHERE course_id = 1;",
          expectedResult: "Returns the current stock value, transaction left open",
        },
        {
          command:
            "(Session B, while A is still open) BEGIN; SELECT stock FROM inventory WHERE course_id = 1 FOR UPDATE;",
          expectedResult:
            "Hangs/blocks if Session A also used FOR UPDATE and hasn't committed yet -- confirming the lock is real",
        },
        {
          command: "EXPLAIN SELECT * FROM enrollment WHERE course_id = 1;",
          expectedResult:
            'Shows "Index Scan" (not "Seq Scan") once the index on enrollment(course_id) exists',
        },
      ],
      troubleshooting: [
        {
          issue: "Session B's FOR UPDATE doesn't seem to block",
          fix: "Confirm Session A's transaction is still open (no COMMIT or ROLLBACK issued yet) and that Session A also used FOR UPDATE (or an UPDATE) on the same row, not just a plain SELECT.",
        },
        {
          issue: "EXPLAIN still shows a Seq Scan after creating the index",
          fix: "Confirm the index was actually created (`\\d enrollment` in psql lists indexes on the table) and that the table has enough rows for the planner to consider an index worthwhile — on a very small table, PostgreSQL may correctly still choose a sequential scan as genuinely faster.",
        },
        {
          issue: '`ERROR: new row for relation "inventory" violates check constraint`',
          fix: "This is the CHECK (stock >= 0) constraint correctly rejecting an attempt to decrement stock below zero — working as intended, not a bug to fix.",
        },
      ],
      hints: [
        "You need genuinely two separate psql processes/terminal windows running at the same time -- a single session cannot demonstrate a locking interaction with itself.",
        "FOR UPDATE must be on the SELECT that reads the row you're about to modify -- it has no effect if only added to the later UPDATE statement.",
        "CREATE INDEX idx_enrollment_course_id ON enrollment(course_id); is the syntax for a basic single-column index.",
      ],
      referenceSolution: {
        summary:
          "inventory has a CHECK(stock >= 0) constraint and one seeded row. concurrency-notes.md records the observed lost-update anomaly without FOR UPDATE, the blocking behavior and correct result with FOR UPDATE, and the Seq Scan -> Index Scan change in EXPLAIN output after indexing enrollment(course_id).",
        files: [
          {
            path: "inventory.sql",
            content: `CREATE TABLE inventory (
    course_id INTEGER PRIMARY KEY REFERENCES course(id),
    stock     INTEGER NOT NULL CHECK (stock >= 0)
);

INSERT INTO inventory (course_id, stock) VALUES (1, 10);

CREATE INDEX idx_enrollment_course_id ON enrollment(course_id);
`,
          },
          {
            path: "concurrency-notes.md",
            content: `# Concurrency lab notes

## Step 1: Lost update reproduced
Both sessions read stock = 10 before either committed. Both computed and wrote 9.
Observed final stock: 9 (WRONG -- two units were "sold," correct value is 8). One update
was silently lost with no error from PostgreSQL.

## Step 2: Fixed with FOR UPDATE
Session A: BEGIN; SELECT stock FROM inventory WHERE course_id = 1 FOR UPDATE; (still open)
Session B: BEGIN; SELECT stock FROM inventory WHERE course_id = 1 FOR UPDATE; -- this HUNG,
waiting for Session A to finish.
Session A: UPDATE inventory SET stock = 9 WHERE course_id = 1; COMMIT;
-- Session B immediately unblocked, now reading the ALREADY-UPDATED value (9), not the stale 10.
Session B: UPDATE inventory SET stock = 8 WHERE course_id = 1; COMMIT;
Observed final stock: 8 (CORRECT).

## Step 3: EXPLAIN before/after indexing
Before: EXPLAIN SELECT * FROM enrollment WHERE course_id = 1; showed "Seq Scan on enrollment".
After creating idx_enrollment_course_id: the same EXPLAIN showed "Index Scan using
idx_enrollment_course_id on enrollment" instead.
`,
          },
        ],
      },
      extensionChallenge:
        "Repeat Step 1 and Step 2, but with THREE concurrent sessions instead of two, and confirm FOR UPDATE still serializes all three correctly (the final stock should be exactly 3 less than the starting value).",
    },
    commonMistakes: [
      "Assuming the default Read Committed isolation level automatically prevents a lost update in a read-modify-write sequence -- it doesn't; Read Committed only guarantees each statement sees committed data, not that two concurrent read-then-write sequences can't race.",
      "Adding FOR UPDATE to the wrong statement (the later UPDATE instead of the earlier SELECT that reads the value being modified) -- the lock must be acquired at read time, before the decision based on that read is made, or the race condition remains.",
      "Testing concurrency behavior with only one database session/connection -- a genuine lock-contention or isolation-anomaly scenario requires at least two independent, concurrent connections to actually overlap in time.",
    ],
    quiz: [
      {
        id: "pg-q11-1",
        prompt:
          "Two transactions both read stock=10, then both compute and write stock=9 (each independently decrementing by 1). What is this anomaly called?",
        choices: [
          "A phantom read",
          "A lost update -- one of the two decrements is silently overwritten with no error",
          "A deadlock",
          "A dirty read",
        ],
        correctIndex: 1,
        explanation:
          "This is the textbook lost-update pattern: both transactions based their write on the same stale read, so the second write silently overwrites the first's intended change, and the database ends up with a value that reflects only one of the two updates, with no error signaling the loss.",
      },
      {
        id: "pg-q11-2",
        prompt:
          "Does PostgreSQL's default Read Committed isolation level prevent a transaction from ever reading another transaction's UNCOMMITTED changes?",
        choices: [
          "No, uncommitted changes are visible across sessions by default",
          "Yes -- this (avoiding 'dirty reads') is guaranteed at every isolation level PostgreSQL offers, including the default; what Read Committed does NOT prevent is a lost update or a non-repeatable read across separate statements",
          "Only if FOR UPDATE is used",
          "This depends on server configuration, not the isolation level",
        ],
        correctIndex: 1,
        explanation:
          "Never seeing another transaction's uncommitted work (avoiding a 'dirty read') is guaranteed at every PostgreSQL isolation level, including the default Read Committed. What Read Committed does NOT guarantee is that the SAME transaction's two different statements see a consistent snapshot, which is exactly what makes lost updates and non-repeatable reads possible at that level.",
      },
      {
        id: "pg-q11-3",
        prompt: "What does SELECT ... FOR UPDATE do that a plain SELECT does not?",
        choices: [
          "It automatically commits the transaction",
          "It acquires a row-level lock on the selected rows, causing a concurrent transaction's own FOR UPDATE (or UPDATE) on the same row to block until this transaction ends",
          "It updates the row immediately",
          "It has no functional effect beyond documentation",
        ],
        correctIndex: 1,
        explanation:
          "FOR UPDATE marks the selected row as locked for the duration of the transaction, forcing any other transaction that also wants to lock or modify that same row to wait — this is exactly the mechanism that serializes the read-modify-write sequence and prevents the lost-update anomaly.",
      },
    ],
    takeaway:
      "PostgreSQL's default isolation level guarantees you never see another transaction's uncommitted work, but does NOT by itself prevent a lost update in a read-modify-write sequence — that specific, common pattern needs an explicit row lock (FOR UPDATE) or a stricter isolation level, chosen deliberately for the scenario that actually needs it.",
    summary:
      "A lost update happens when two transactions read the same value and both write based on it, silently overwriting each other. Non-repeatable reads and phantom reads are related anomalies for a single row and a row range, respectively. Read Committed (PostgreSQL's default) prevents dirty reads but not lost updates; SELECT ... FOR UPDATE or Repeatable Read isolation are the tools that close that specific gap.",
    nextLessonSlug: "pg-indexes-and-query-plans",
  },
  {
    id: "pg-indexes-and-query-plans",
    slug: "pg-indexes-and-query-plans",
    title: "Indexes, Composite Indexes, and Reading EXPLAIN",
    description:
      "How an index turns an O(n) table scan into an O(log n) lookup, when adding one is actually the wrong call, and how to read EXPLAIN to find out instead of guessing.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 22,
    prerequisites: ["pg-concurrency-and-isolation"],
    objectives: [
      "Explain what an index is and why it speeds up lookups on the indexed column",
      "Determine correct column order for a composite index given a query's WHERE/ORDER BY pattern",
      "Read a basic EXPLAIN output and identify whether a query used a Seq Scan or an Index Scan",
    ],
    skills: ["postgresql", "indexes", "query-plans", "explain"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — Chapter 11: Indexes",
        url: "https://www.postgresql.org/docs/16/indexes.html",
      },
      {
        label: "PostgreSQL 16 Documentation — 14.1. Using EXPLAIN",
        url: "https://www.postgresql.org/docs/16/using-explain.html",
      },
    ],
    keywords: ["indexes", "composite indexes", "explain", "query plans", "postgresql"],
    explanation: `**This lesson's DDL and EXPLAIN output are real PostgreSQL, shown for reading** — SQLite's query planner and EXPLAIN output format differ enough from PostgreSQL's that reading real PostgreSQL output here is what this module's guided local lab has you verify directly.

Without an index, finding rows matching a condition (\`WHERE course_id = 5\`) requires PostgreSQL to check *every single row* in the table — a **sequential scan**, \`O(n)\` in the table's size, using this course's earlier terminology exactly. An **index** on \`course_id\` is a separate, ordered structure (by default, a B-tree — conceptually similar to the balanced search trees from the earlier DSA-adjacent reasoning this course assumes, though implemented very differently) that lets PostgreSQL locate matching rows in roughly \`O(\log n)\`, the same fundamental speedup a sorted structure provides over an unsorted scan. \`CREATE INDEX idx_enrollment_course_id ON enrollment(course_id);\` builds exactly this structure.

Indexes are **not free** — this is the honest half of the story too often left out. Every index must be updated on every \`INSERT\`, \`UPDATE\`, or \`DELETE\` touching the indexed column, which means indexes trade faster reads for slower writes, plus real, ongoing storage space. A table that's written to constantly but rarely queried by a given column is a genuinely poor candidate for indexing that column — the write-side cost is paid on every single write, whether or not the read-side benefit is ever actually used. This is precisely why "index every column, just in case" is bad advice: it's a real cost paid unconditionally, for a benefit that only exists if that column is actually queried often enough to matter.

A **composite index** covers multiple columns together, and **column order matters** — an index on \`(learner_id, course_id)\` efficiently serves a query filtering on \`learner_id\` alone, or on both \`learner_id\` AND \`course_id\` together, but does **not** efficiently serve a query filtering on \`course_id\` alone, because the index's ordering is by \`learner_id\` first — exactly the way a phone book sorted by last-name-then-first-name doesn't help you find everyone with a given first name. The general rule: put the column used in equality filters (\`WHERE learner_id = ...\`) before columns used in range filters or sorting, and match the column order to your most common, performance-critical query pattern.

**\`EXPLAIN\`** shows the query planner's chosen execution plan without actually running the query; **\`EXPLAIN ANALYZE\`** actually runs it and reports real timing alongside the plan. The single most important thing to look for in a plan's output is whether a query used a **Seq Scan** (every row checked — the \`O(n)\` case) or an **Index Scan** (the index was used — the \`O(\log n)\` case) on the table and column in question. Genuinely worth stating plainly, since it's a common overclaim: **an index does not automatically guarantee better performance for every query** — for a very small table, or a query expected to match a large fraction of the table's rows, PostgreSQL's planner can correctly choose a sequential scan over an available index, because scanning sequentially is sometimes actually faster than the overhead of consulting the index structure for many matches; \`EXPLAIN\` is how you find out what the planner actually decided, rather than assuming.`,
    example: {
      language: "none",
      description:
        "Real PostgreSQL EXPLAIN output, shown for reading -- format and planner behavior differ from SQLite's, which is why this lesson doesn't use the browser SQL runner.",
      code: `-- Before an index on enrollment(course_id):
EXPLAIN SELECT * FROM enrollment WHERE course_id = 5;

--                          QUERY PLAN
-- ------------------------------------------------------------
--  Seq Scan on enrollment  (cost=0.00..25.88 rows=6 width=24)
--    Filter: (course_id = 5)
-- (every row in the table is checked against the filter)

CREATE INDEX idx_enrollment_course_id ON enrollment(course_id);

-- After the index:
EXPLAIN SELECT * FROM enrollment WHERE course_id = 5;

--                                    QUERY PLAN
-- ---------------------------------------------------------------------------
--  Index Scan using idx_enrollment_course_id on enrollment
--    (cost=0.15..8.32 rows=6 width=24)
--    Index Cond: (course_id = 5)
-- (the index is consulted directly instead of scanning every row)`,
    },
    guidedExercise: {
      id: "pg-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write parseScanType(explainOutput) that returns 'seq-scan' if the string contains 'Seq Scan', 'index-scan' if it contains 'Index Scan', or 'unknown' otherwise.",
      starterCode: `function parseScanType(explainOutput) {
  // TODO
}
`,
      solutionCode: `function parseScanType(explainOutput) {
  if (explainOutput.includes("Index Scan")) return "index-scan";
  if (explainOutput.includes("Seq Scan")) return "seq-scan";
  return "unknown";
}`,
      harness: `
        try { window.__report('t1', parseScanType("Seq Scan on enrollment  (cost=0.00..25.88 rows=6 width=24)") === "seq-scan", 'should identify a Seq Scan'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', parseScanType("Index Scan using idx_enrollment_course_id on enrollment") === "index-scan", 'should identify an Index Scan'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', parseScanType("Nested Loop  (cost=0.30..16.35 rows=1 width=48)") === "unknown", 'should report unknown for a plan type this function does not recognize'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a Seq Scan" },
        { id: "t2", description: "correctly identifies an Index Scan" },
        { id: "t3", description: "returns unknown for an unrecognized plan type" },
      ],
      hints: [
        "Check for 'Index Scan' before 'Seq Scan' -- there's no overlap risk here, but checking the more specific/important case first is a good habit.",
        "This models the exact skill of reading EXPLAIN output to answer 'did my index get used.'",
      ],
    },
    independentExercise: {
      id: "pg-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write bestCompositeIndexOrder(equalityColumns, rangeOrSortColumns) implementing the column-order rule: equality-filter columns come first (in the order given), followed by range/sort columns (in the order given). Return a single array combining both, in the correct order. Then write indexServesQuery(indexColumns, queryFilterColumns) returning true only if queryFilterColumns is a PREFIX of indexColumns (matching the phone-book analogy: an index can serve a query filtering on its leading columns, not an arbitrary subset).",
      starterCode: `function bestCompositeIndexOrder(equalityColumns, rangeOrSortColumns) {
  // TODO
}
function indexServesQuery(indexColumns, queryFilterColumns) {
  // TODO: true only if queryFilterColumns matches indexColumns from the START, in order
}
`,
      solutionCode: `function bestCompositeIndexOrder(equalityColumns, rangeOrSortColumns) {
  return [...equalityColumns, ...rangeOrSortColumns];
}
function indexServesQuery(indexColumns, queryFilterColumns) {
  if (queryFilterColumns.length > indexColumns.length) return false;
  return queryFilterColumns.every((col, i) => indexColumns[i] === col);
}`,
      harness: `
        try {
          const result = bestCompositeIndexOrder(["learner_id"], ["enrolled_at"]);
          window.__report('t1', JSON.stringify(result) === JSON.stringify(["learner_id","enrolled_at"]), 'equality column should come before the range/sort column');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', indexServesQuery(["learner_id","course_id"], ["learner_id"]) === true, 'a query filtering on the leading column of a composite index should be served'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', indexServesQuery(["learner_id","course_id"], ["course_id"]) === false, 'a query filtering ONLY on the second column of a composite index should NOT be efficiently served'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', indexServesQuery(["learner_id","course_id"], ["learner_id","course_id"]) === true, 'a query filtering on both columns, in order, should be served'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "orders equality columns before range/sort columns" },
        { id: "t2", description: "an index correctly serves a query on its leading column" },
        {
          id: "t3",
          description:
            "an index correctly does NOT efficiently serve a query on only its trailing column",
        },
        {
          id: "t4",
          description: "an index correctly serves a query matching its full column prefix",
        },
      ],
      hints: [
        "This directly encodes the phone-book analogy: sorted by (last name, first name) helps find 'Smith', and helps find 'Smith, John', but does NOT help find everyone named 'John' regardless of last name.",
        "queryFilterColumns.every((col, i) => indexColumns[i] === col) checks that every query column matches the index's columns in the same positions, from the start.",
      ],
    },
    commonMistakes: [
      "Adding an index to every column 'just in case' -- every index has a real, ongoing write-time and storage cost; an index that's rarely used for reads is a cost paid for no real benefit.",
      "Creating a composite index in the wrong column order for the actual query pattern -- an index on (course_id, learner_id) does not efficiently serve a query filtering only on learner_id, exactly the mirror image of the phone-book analogy.",
      "Assuming an index guarantees a faster query without checking EXPLAIN -- for a small table or a query matching a large fraction of rows, PostgreSQL's planner can correctly choose a sequential scan over an available index, because the index's overhead isn't always worth paying.",
    ],
    quiz: [
      {
        id: "pg-q12-1",
        prompt: "Why isn't 'add an index to every column, just to be safe' good general advice?",
        choices: [
          "PostgreSQL only allows a limited number of indexes per table",
          "Every index must be updated on every INSERT/UPDATE/DELETE touching that column, and consumes storage -- a real, ongoing cost paid regardless of whether the read-side benefit is ever actually used",
          "Indexes make SELECT queries slower",
          "Indexes are only useful for primary key columns",
        ],
        correctIndex: 1,
        explanation:
          "Indexes trade write-time cost and storage for read-time speed. An index on a column that's rarely filtered or sorted on pays that write-time cost on every single write to the table, for a read-side benefit that may rarely or never actually be exercised — a real, unconditional cost for a conditional benefit.",
      },
      {
        id: "pg-q12-2",
        prompt:
          "A composite index exists on (learner_id, course_id). Does it efficiently serve a query filtering ONLY on course_id?",
        choices: [
          "Yes, composite indexes serve queries on any of their columns equally well",
          "No -- the index's ordering is by learner_id first, so filtering by course_id alone can't use the index's sorted structure the way filtering by learner_id (or by both columns) can, similar to a phone book sorted by last name not helping you find people by first name alone",
          "Yes, but only for exact matches, never for ranges",
          "This depends entirely on the table's size",
        ],
        correctIndex: 1,
        explanation:
          "A composite index's usefulness for a query depends on the query's filter columns forming a prefix of the index's column order. Filtering on course_id alone, when the index is ordered (learner_id, course_id), skips the index's actual sort key entirely, so PostgreSQL generally can't use it efficiently for that query.",
      },
      {
        id: "pg-q12-3",
        prompt:
          "What does it mean if EXPLAIN shows 'Seq Scan' for a query filtering on an indexed column?",
        choices: [
          "The index is broken and must be rebuilt",
          "PostgreSQL's query planner decided a sequential scan was actually the better choice for this specific query, which can genuinely happen on a small table or when a large fraction of rows match the filter",
          "This is always a bug that must be fixed",
          "EXPLAIN cannot show Seq Scan for an indexed column; this output would be impossible",
        ],
        correctIndex: 1,
        explanation:
          "The planner chooses whichever plan it estimates will be fastest, and for a small table, or a filter that matches a large portion of the rows, scanning sequentially can genuinely be cheaper than the overhead of consulting an index and then looking up each matching row — this is a legitimate planner decision, not evidence the index is broken.",
      },
    ],
    takeaway:
      "An index turns an O(n) scan into a roughly O(log n) lookup on the indexed column, but costs real write-time overhead and storage — add one deliberately, order composite index columns to match your actual query pattern (equality columns first), and use EXPLAIN to confirm whether an index is actually being used rather than assuming.",
    summary:
      "Indexes speed up reads on the indexed column at the cost of slower writes and storage. Composite index column order matters — a query's filter columns must form a prefix of the index's columns to use it efficiently. EXPLAIN shows the planner's chosen strategy (Seq Scan vs. Index Scan) without guessing; EXPLAIN ANALYZE additionally reports real timing.",
    nextLessonSlug: "pg-views-and-roles",
  },
  {
    id: "pg-views-and-roles",
    slug: "pg-views-and-roles",
    title: "Views, Roles, and the Principle of Least Privilege",
    description:
      "Naming a reusable query as a view, and the security discipline of granting every role exactly the access it needs — never more.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 12,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["pg-indexes-and-query-plans"],
    objectives: [
      "Explain what a view is and what it does and doesn't provide over a saved query",
      "Explain the principle of least privilege and why a shared superuser role violates it",
      "Design a role's privileges to match exactly what a specific application component needs",
    ],
    skills: ["postgresql", "views", "roles", "security"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — SQL Commands: CREATE VIEW",
        url: "https://www.postgresql.org/docs/16/sql-createview.html",
      },
      {
        label: "PostgreSQL 16 Documentation — Chapter 22: Database Roles",
        url: "https://www.postgresql.org/docs/16/user-manag.html",
      },
      {
        label: "PostgreSQL 16 Documentation — 5.9. Row Security Policies",
        url: "https://www.postgresql.org/docs/16/ddl-rowsecurity.html",
      },
    ],
    keywords: [
      "views",
      "roles",
      "privileges",
      "least privilege",
      "row-level security",
      "postgresql",
    ],
    explanation: `**This lesson covers PostgreSQL's role and privilege system, which SQLite has no equivalent of at all** — SQLite is a single-file, single-user-process database with no server-side authentication or per-role permission model, so this lesson's content is shown for reading, and connects directly to work you'll do in this module's final guided local lab.

A **view** (\`CREATE VIEW active_enrollments AS SELECT ... WHERE ...\`) is a named, saved query that can be queried exactly like a table (\`SELECT * FROM active_enrollments\`) — it's genuinely just the underlying query, re-run fresh every time the view is referenced, not a separately-stored copy of the data (that's a *materialized* view, a related but different PostgreSQL feature with its own explicit refresh step). A view's main value is **abstraction**: it lets you name and hide a complex, multi-join query behind a simple, stable interface, and — combined with role privileges — it can expose a restricted, filtered subset of a table's columns or rows to a role that shouldn't see the underlying table directly.

A **role** in PostgreSQL is both what other databases might separately call a "user" and a "group" — the same underlying concept, distinguished only by whether it's granted \`LOGIN\` privilege. The **principle of least privilege** is the security discipline of granting a role *exactly* the permissions it actually needs to do its specific job, and nothing more: an application component that only ever reads course data should have a role granted \`SELECT\` on exactly the tables it reads, not broad \`ALL PRIVILEGES\`, and certainly not superuser access. \`GRANT SELECT ON course TO readonly_app_role;\` grants precisely one narrow capability; \`REVOKE\` removes a previously-granted privilege.

The honest, important reason this matters: **every account or connection sharing one broad, overprivileged role is a single point of failure** — if that role's credentials are ever compromised (a leaked connection string, a SQL injection vulnerability in application code, a misconfigured service), the attacker inherits every privilege that role holds, whether or not the compromised component actually needed most of them. A narrowly-scoped role limits the *blast radius* of exactly that kind of compromise: a read-only reporting role's credentials leaking is a meaningfully smaller incident than a superuser's leaking, precisely because the former structurally cannot do most of the damage the latter could. **Row-level security (RLS)** takes this further, restricting *which specific rows* a role can see or modify within a table it does have access to (a Learner role that can only see its own enrollment rows, for example) — a real, valuable PostgreSQL feature genuinely relevant to this platform's own architecture, though implementing it is beyond this introductory lesson's scope, and this platform's own Supabase-backed tables use it in exactly this spirit (see \`docs/SECURITY.md\`).`,
    example: {
      language: "none",
      description:
        "Real PostgreSQL views, roles, and GRANT statements, shown for reading -- SQLite has no equivalent role/privilege system to run this against.",
      code: `-- A view abstracting a multi-table join behind a simple, stable name:
CREATE VIEW active_learner_enrollments AS
SELECT
  learner.email,
  course.title,
  enrollment.enrolled_at
FROM enrollment
JOIN learner ON enrollment.learner_id = learner.id
JOIN course ON enrollment.course_id = course.id;

-- Querying the view is exactly like querying a table:
SELECT * FROM active_learner_enrollments WHERE email = 'alice@example.com';

-- Least privilege: a role for a reporting service that ONLY needs read access:
CREATE ROLE reporting_service LOGIN PASSWORD '...';
GRANT SELECT ON active_learner_enrollments TO reporting_service;
-- reporting_service can query the view, but has NO access to learner, course, or enrollment
-- directly, and cannot INSERT/UPDATE/DELETE anything at all.

-- A DIFFERENT role for the application's write path -- narrowly scoped to exactly what it needs:
CREATE ROLE enrollment_app LOGIN PASSWORD '...';
GRANT SELECT, INSERT ON enrollment TO enrollment_app;
GRANT SELECT ON learner, course TO enrollment_app;
-- enrollment_app can create enrollments and look up learners/courses, but cannot
-- UPDATE or DELETE anything, and has no access at all to any other table in the database.`,
    },
    guidedExercise: {
      id: "pg-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write hasRequiredPrivilege(rolePrivileges, table, requiredAction) modeling a GRANT check: rolePrivileges is an object like { course: ['SELECT'], enrollment: ['SELECT','INSERT'] }. Return true only if rolePrivileges[table] exists and includes requiredAction.",
      starterCode: `function hasRequiredPrivilege(rolePrivileges, table, requiredAction) {
  // TODO
}
`,
      solutionCode: `function hasRequiredPrivilege(rolePrivileges, table, requiredAction) {
  const grants = rolePrivileges[table];
  return Array.isArray(grants) && grants.includes(requiredAction);
}`,
      harness: `
        const role = { course: ["SELECT"], enrollment: ["SELECT","INSERT"] };
        try { window.__report('t1', hasRequiredPrivilege(role, "enrollment", "INSERT") === true, 'a granted privilege should be recognized'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', hasRequiredPrivilege(role, "enrollment", "DELETE") === false, 'an ungranted privilege on a known table should be denied'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', hasRequiredPrivilege(role, "learner", "SELECT") === false, 'a table with NO grants at all should be denied for any action'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "recognizes a granted privilege" },
        {
          id: "t2",
          description: "denies an ungranted action on a table the role has some access to",
        },
        { id: "t3", description: "denies any action on a table with no grants at all" },
      ],
      hints: [
        "Array.prototype.includes checks whether a specific action was actually granted.",
        "A missing table entry means zero privileges on that table -- Array.isArray(undefined) correctly returns false.",
      ],
    },
    independentExercise: {
      id: "pg-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write blastRadius(rolePrivileges) returning the total number of distinct (table, action) grant pairs a role has -- a simple, concrete proxy for 'how much damage could this role's compromised credentials do.' Then write violatesLeastPrivilege(actualNeeds, grantedPrivileges) where both are objects like { table: [actions] } -- return true if grantedPrivileges includes ANY (table, action) pair not present in actualNeeds (over-provisioned access).",
      starterCode: `function blastRadius(rolePrivileges) {
  // TODO: count every individual action across every table
  return 0;
}
function violatesLeastPrivilege(actualNeeds, grantedPrivileges) {
  // TODO: true if any granted (table, action) pair isn't in actualNeeds
  return false;
}
`,
      solutionCode: `function blastRadius(rolePrivileges) {
  return Object.values(rolePrivileges).reduce((sum, actions) => sum + actions.length, 0);
}
function violatesLeastPrivilege(actualNeeds, grantedPrivileges) {
  for (const [table, actions] of Object.entries(grantedPrivileges)) {
    const needed = actualNeeds[table] ?? [];
    for (const action of actions) {
      if (!needed.includes(action)) return true;
    }
  }
  return false;
}`,
      harness: `
        try { window.__report('t1', blastRadius({ course: ["SELECT"], enrollment: ["SELECT","INSERT"] }) === 3, 'should count 3 total grant pairs'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', blastRadius({}) === 0, 'no grants means zero blast radius'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const needs = { enrollment: ["SELECT","INSERT"] };
          const granted = { enrollment: ["SELECT","INSERT"] };
          window.__report('t3', violatesLeastPrivilege(needs, granted) === false, 'exactly-matching privileges should NOT violate least privilege');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try {
          const needs = { enrollment: ["SELECT"] };
          const granted = { enrollment: ["SELECT","DELETE"] };
          window.__report('t4', violatesLeastPrivilege(needs, granted) === true, 'an ungranted-but-actually-needed extra privilege (DELETE) should violate least privilege');
        } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try {
          const needs = { enrollment: ["SELECT"] };
          const granted = { enrollment: ["SELECT"], course: ["SELECT"] };
          window.__report('t5', violatesLeastPrivilege(needs, granted) === true, 'access to an entirely unneeded table should also violate least privilege');
        } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly counts total grant pairs across tables" },
        { id: "t2", description: "no grants means zero blast radius" },
        {
          id: "t3",
          description: "privileges exactly matching actual needs do not violate least privilege",
        },
        {
          id: "t4",
          description: "an unneeded extra action on a needed table violates least privilege",
        },
        { id: "t5", description: "access to an entirely unneeded table violates least privilege" },
      ],
      hints: [
        "blastRadius is intentionally simple -- a real security assessment would weigh different privileges very differently, but 'count of distinct grant pairs' is a concrete, honest proxy for this exercise's purpose.",
        "violatesLeastPrivilege needs to check EVERY granted pair against actualNeeds, not just the first one -- a single unnecessary grant anywhere is enough to flag a violation.",
      ],
    },
    commonMistakes: [
      "Giving an application's database connection broad, superuser-equivalent privileges 'to avoid permission errors' -- this means a single compromised connection string or SQL injection vulnerability grants an attacker access to the ENTIRE database, not just what that component actually uses.",
      "Confusing a plain view with a materialized view -- a plain view re-runs its underlying query every time it's referenced (always current, no extra storage); a materialized view stores a snapshot that must be explicitly refreshed and can become stale.",
      "Assuming a view alone provides security -- a view restricts what columns/rows a query SHOWS, but without also restricting the underlying table's own privileges for that role, a role could still query the base table directly and bypass the view's restriction entirely.",
    ],
    quiz: [
      {
        id: "pg-q13-1",
        prompt: "What is the principle of least privilege?",
        choices: [
          "Every role should have the minimum number of characters in its password",
          "Grant each role exactly the permissions it actually needs to perform its specific job, and nothing more",
          "Only the database administrator should ever be granted any privileges",
          "Privileges should be granted temporarily and expire automatically",
        ],
        correctIndex: 1,
        explanation:
          "Least privilege is specifically about matching granted access to actual, demonstrated need — no more, no less — for every role, which is exactly what limits the damage a compromised credential can do.",
      },
      {
        id: "pg-q13-2",
        prompt:
          "Why does a single shared, overprivileged role for an entire application increase security risk compared to several narrowly-scoped roles?",
        choices: [
          "It doesn't; a single role is always simpler and equally safe",
          "If that one role's credentials are ever compromised, the attacker inherits every privilege it holds -- narrowly-scoped roles limit the 'blast radius' of exactly that kind of compromise",
          "PostgreSQL charges more for additional roles",
          "A single role is actually MORE secure because there's less to configure",
        ],
        correctIndex: 1,
        explanation:
          "The core risk is concentration: one overprivileged role's leaked credentials expose everything that role can do. Splitting privileges across multiple, narrowly-scoped roles means a single leak only exposes what that specific, limited role was ever able to do — a structurally smaller incident.",
      },
      {
        id: "pg-q13-3",
        prompt: "What's the key difference between a plain VIEW and a MATERIALIZED VIEW?",
        choices: [
          "They are identical in PostgreSQL",
          "A plain view re-runs its underlying query fresh every time it's referenced; a materialized view stores a snapshot of the results that must be explicitly refreshed and can become stale",
          "Materialized views cannot be queried with SELECT",
          "A plain view can only reference one table",
        ],
        correctIndex: 1,
        explanation:
          "A plain view is purely a saved query definition — always reflects current data, at the cost of re-computing on every reference. A materialized view trades that freshness for read speed by storing an actual snapshot, which requires an explicit REFRESH to stay current and can otherwise silently go stale.",
      },
    ],
    takeaway:
      "Grant every role exactly the privileges its specific job requires, never more — a broad, shared, overprivileged role turns any single compromise into full database access, while narrowly-scoped roles structurally limit how much damage a leaked credential can do.",
    summary:
      "A view names a reusable query, re-run fresh each time (unlike a materialized view's stored snapshot). PostgreSQL roles combine what other systems call users and groups. GRANT/REVOKE assign specific privileges per table and action. The principle of least privilege — granting exactly what's needed, nothing more — limits the blast radius of a compromised credential; row-level security restricts access further, down to specific rows.",
    nextLessonSlug: "pg-migrations-and-operations",
  },
  {
    id: "pg-migrations-and-operations",
    slug: "pg-migrations-and-operations",
    title: "Migrations, Schema Evolution, and Operational Safety",
    description:
      "Changing a live schema safely with ordered, reversible migrations, testing database behavior deliberately, and the backup/recovery discipline that makes every other guarantee in this course matter.",
    trackSlug: "databases",
    courseSlug: "database-design-and-postgresql",
    order: 13,
    difficulty: "advanced",
    estimatedMinutes: 23,
    prerequisites: ["pg-views-and-roles"],
    objectives: [
      "Explain why schema migrations must be ordered, sequential, and (ideally) reversible",
      "Identify a schema change that's unsafe to apply directly to a live, populated table",
      "Describe the operational checklist a real schema change should pass before deployment",
    ],
    skills: ["postgresql", "migrations", "operations"],
    tech: [{ name: "PostgreSQL", version: "16 (examples remain valid on 17+)" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "PostgreSQL 16 Documentation — SQL Commands: ALTER TABLE",
        url: "https://www.postgresql.org/docs/16/sql-altertable.html",
      },
      {
        label:
          "PostgreSQL 16 Documentation — 25.3. Continuous Archiving and Point-in-Time Recovery",
        url: "https://www.postgresql.org/docs/16/continuous-archiving.html",
      },
    ],
    keywords: ["migrations", "schema evolution", "backup", "operational safety", "postgresql"],
    explanation: `A **migration** is a small, ordered, version-controlled script that changes a database schema incrementally — \`001_create_learner.sql\`, \`002_add_course_price.sql\`, \`003_add_enrollment_unique_constraint.sql\` — applied in strict sequential order, tracked in a dedicated table (\`schema_migrations\`, recording which migrations have already run) so every environment (a developer's machine, staging, production) reaches the exact same schema state through the exact same ordered sequence of changes, never through an untracked, ad-hoc \`ALTER TABLE\` run once by hand and never recorded anywhere. This discipline is what makes a schema change **reproducible** and **auditable** — anyone can read the migration history and know exactly what changed, when, and in what order, rather than reverse-engineering a live schema's current, undocumented state.

Not every schema change is safe to apply directly to a **live, populated table**, and recognizing which ones aren't is a genuinely important operational skill. Adding a \`NOT NULL\` column to a table with existing rows fails outright unless a \`DEFAULT\` is also provided (existing rows would otherwise have no value for the new required column) — and even with a default, rewriting every existing row to backfill that default can, on a very large table, hold a lock long enough to cause real, visible application downtime, which is why large-table migrations sometimes need a more careful, multi-step approach (add the column nullable first, backfill in batches, then add the \`NOT NULL\` constraint once every row has a value). Dropping a column outright is straightforwardly destructive and irreversible — the data is genuinely gone the moment the migration commits — unlike most additive changes, which can usually be undone by a corresponding reverse migration.

**Testing database behavior deliberately** means going beyond "the application seems to work" and specifically verifying: that constraints actually reject the invalid data they're meant to reject (does inserting a negative price genuinely fail?), that a migration applies cleanly to a copy of realistic data (not just an empty test database), and that a migration's reverse operation (if one exists) actually restores the prior state correctly. **Seed data** — a separate, deliberately-maintained set of realistic sample rows — supports exactly this kind of testing, and should never be confused with production data or committed with anything resembling real user information.

**Backup and recovery** is the operational safety net every other guarantee in this course ultimately depends on: even a perfectly-designed, fully-normalized, properly-constrained, correctly-indexed schema doesn't protect against hardware failure, a catastrophic operator mistake (a \`DROP TABLE\` run against the wrong database), or a bug that corrupts data faster than anyone notices. At minimum, a real production PostgreSQL setup needs regular, automated backups, a *tested* restore procedure (a backup that has never actually been restored and verified is not a real safety net, only an assumption that it would work), and a documented recovery time expectation — this lesson's guided local lab has you draft exactly this checklist for a real, if small, schema.`,
    example: {
      language: "none",
      description:
        "A real, ordered migration sequence and the specific unsafe change it deliberately avoids -- shown for reading, since this platform's SQLite sandbox has no migration-tracking mechanism to demonstrate this against.",
      code: `-- migrations/001_create_learner.sql
CREATE TABLE learner (
    id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE
);

-- migrations/002_add_learner_display_name.sql
-- UNSAFE if run directly on a table with existing rows and no DEFAULT:
--   ALTER TABLE learner ADD COLUMN display_name TEXT NOT NULL;  -- FAILS: existing rows have no value
-- SAFE version, providing a default so existing rows get a valid starting value:
ALTER TABLE learner ADD COLUMN display_name TEXT NOT NULL DEFAULT 'Unnamed Learner';

-- migrations/003_add_enrollment_unique_constraint.sql
ALTER TABLE enrollment ADD CONSTRAINT uq_learner_course UNIQUE (learner_id, course_id);

-- A dedicated tracking table records exactly which migrations have run, in order:
CREATE TABLE IF NOT EXISTS schema_migrations (
    version    TEXT PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- INSERT INTO schema_migrations (version) VALUES ('003_add_enrollment_unique_constraint');`,
    },
    guidedExercise: {
      id: "pg-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isSafeToAddNotNullColumn(hasExistingRows, hasDefault) modeling the ALTER TABLE ADD COLUMN ... NOT NULL rule: return true if the table has NO existing rows (nothing to backfill) OR a default is provided; return false only if there ARE existing rows AND no default (this would fail).",
      starterCode: `function isSafeToAddNotNullColumn(hasExistingRows, hasDefault) {
  // TODO
}
`,
      solutionCode: `function isSafeToAddNotNullColumn(hasExistingRows, hasDefault) {
  return !hasExistingRows || hasDefault;
}`,
      harness: `
        try { window.__report('t1', isSafeToAddNotNullColumn(true, true) === true, 'existing rows WITH a default should be safe'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isSafeToAddNotNullColumn(true, false) === false, 'existing rows with NO default should be unsafe -- this would fail'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isSafeToAddNotNullColumn(false, false) === true, 'an empty table has nothing to backfill, so it is safe even with no default'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "existing rows with a default is safe" },
        { id: "t2", description: "existing rows with no default is unsafe" },
        { id: "t3", description: "an empty table is safe regardless of a default" },
      ],
      hints: [
        "This directly encodes the explanation's core rule about adding a NOT NULL column to a populated table.",
        "The only genuinely unsafe combination is existing data with nothing to fill the new required column with.",
      ],
    },
    independentExercise: {
      id: "pg-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write validateMigrationOrder(appliedVersions, newMigrationVersion) modeling the sequential-migration rule: migration filenames sort as strings (e.g. '001_...', '002_...'). Return true only if newMigrationVersion is ALPHABETICALLY GREATER than every version already in appliedVersions (it must come strictly after everything already applied -- no gaps backward, no re-running an old one).",
      starterCode: `function validateMigrationOrder(appliedVersions, newMigrationVersion) {
  // TODO
}
`,
      solutionCode: `function validateMigrationOrder(appliedVersions, newMigrationVersion) {
  return appliedVersions.every(v => newMigrationVersion > v);
}`,
      harness: `
        try { window.__report('t1', validateMigrationOrder(["001_a","002_b"], "003_c") === true, 'a migration strictly after everything applied should be valid'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', validateMigrationOrder(["001_a","002_b","003_c"], "002_b") === false, 're-running an already-applied migration should be invalid'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', validateMigrationOrder(["003_c"], "002_b") === false, 'a migration that would apply OUT of order (before something newer already applied) should be invalid'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', validateMigrationOrder([], "001_a") === true, 'the very first migration on an empty history should be valid'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "accepts a migration that correctly comes after everything applied",
        },
        { id: "t2", description: "rejects re-applying an already-applied migration" },
        { id: "t3", description: "rejects a migration that would apply out of sequence" },
        { id: "t4", description: "accepts the first migration when no history exists yet" },
      ],
      hints: [
        "String comparison (>) works correctly here specifically because the version prefixes are zero-padded numbers (001, 002, 003, ...), which sort the same alphabetically as numerically.",
        "Array.prototype.every checks the new version against EVERY already-applied version, not just the most recent one.",
      ],
    },
    guidedLocalLab: {
      id: "pg-gll-migrations-and-roles",
      title: "Analyze Queries and Implement Safe Roles and Migrations",
      scenario:
        "Write a real, ordered migration sequence for a schema change, set up a genuinely least-privileged role, and draft an operational backup/recovery checklist — the capstone of this course's PostgreSQL-specific hands-on work.",
      requiredTools: [
        { name: "PostgreSQL server", version: "16 or newer" },
        { name: "psql", version: "matching your server version" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        "Continue from the learning_platform_lab database used in this module's earlier labs (or recreate it from schema.sql/seed.sql/inventory.sql if starting fresh).",
        "Create a migrations/ folder with numbered .sql files, and a schema_migrations tracking table as shown in this lesson's explanation.",
      ],
      projectStructure: `learning-platform-lab/
  migrations/
    001_create_schema_migrations_table.sql
    002_add_learner_display_name.sql
  roles.sql
  operational-checklist.md`,
      starterFiles: [
        {
          path: "migrations/001_create_schema_migrations_table.sql",
          content: `-- TODO: CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY,
--   applied_at TIMESTAMPTZ NOT NULL DEFAULT now())
-- TODO: record this migration itself in the table after creating it
`,
        },
        {
          path: "migrations/002_add_learner_display_name.sql",
          content: `-- TODO: safely add a display_name column to learner (NOT NULL, with a DEFAULT,
-- since the learner table may already have rows from earlier labs)
-- TODO: record this migration in schema_migrations
`,
        },
        {
          path: "roles.sql",
          content: `-- TODO: CREATE ROLE reporting_readonly LOGIN PASSWORD '...';
-- TODO: GRANT SELECT on exactly the tables a reporting/analytics use case needs
--   (learner, course, enrollment) -- nothing else, and no INSERT/UPDATE/DELETE at all.
`,
        },
        {
          path: "operational-checklist.md",
          content: `# Backup and recovery checklist

TODO: fill in each item based on this lesson's explanation and your own research
against the PostgreSQL documentation.

- [ ] How is this database backed up, and how often?
- [ ] Has the restore procedure actually been tested, not just assumed to work?
- [ ] What is the acceptable data-loss window (how much data could be lost between
      the last backup and a failure)?
- [ ] What is the expected recovery time if the primary database is lost entirely?
- [ ] Who is responsible for verifying backups remain valid over time?
`,
        },
      ],
      requirements: [
        "migrations/001 and migrations/002 apply cleanly, in order, to the existing database.",
        "002_add_learner_display_name.sql safely adds a NOT NULL column to a table that may already contain rows, using a DEFAULT.",
        "Both migrations record themselves in schema_migrations after applying.",
        "roles.sql creates a role with ONLY SELECT access on exactly the tables a reporting use case needs — verified by attempting (and having rejected) an INSERT as that role.",
        "operational-checklist.md is filled in with real, specific answers, not placeholder text.",
      ],
      commands: [
        {
          description: "Apply each migration in order",
          command:
            "psql -d learning_platform_lab -f migrations/001_create_schema_migrations_table.sql",
        },
        {
          description: "Apply the second migration",
          command: "psql -d learning_platform_lab -f migrations/002_add_learner_display_name.sql",
        },
        {
          description: "Create the least-privileged role",
          command: "psql -d learning_platform_lab -f roles.sql",
        },
        {
          description: "Verify the role's access is genuinely restricted",
          command:
            "psql -d learning_platform_lab -U reporting_readonly -c \"INSERT INTO learner (email) VALUES ('test@example.com');\"",
        },
      ],
      expectedBehavior:
        "Both migrations apply with no errors, and `SELECT * FROM schema_migrations;` lists both versions with a timestamp. The reporting_readonly role can successfully run a SELECT against learner/course/enrollment, but the INSERT verification command fails with a permission-denied error, confirming the role's privileges are genuinely restricted to read-only.",
      verificationSteps: [
        {
          command: 'psql -d learning_platform_lab -c "SELECT * FROM schema_migrations;"',
          expectedResult: "Lists both migration versions with applied_at timestamps",
        },
        {
          command: 'psql -d learning_platform_lab -c "\\d learner"',
          expectedResult: "Shows the new display_name column as NOT NULL with a default",
        },
        {
          command:
            'psql -d learning_platform_lab -U reporting_readonly -c "SELECT * FROM learner;"',
          expectedResult: "Succeeds, returning learner rows",
        },
        {
          command:
            "psql -d learning_platform_lab -U reporting_readonly -c \"INSERT INTO learner (email) VALUES ('test@example.com');\"",
          expectedResult: "ERROR: permission denied for table learner",
        },
      ],
      troubleshooting: [
        {
          issue:
            '`ERROR: column "display_name" contains null values` when adding the NOT NULL column',
          fix: "The ALTER TABLE statement is missing a DEFAULT value — without one, existing rows have nothing to populate the new required column with.",
        },
        {
          issue: "reporting_readonly can successfully INSERT",
          fix: "Check roles.sql only GRANTed SELECT, not ALL PRIVILEGES or INSERT/UPDATE/DELETE — the goal is a role that structurally cannot write, not one that merely isn't expected to.",
        },
        {
          issue:
            '`psql: error: connection to server ... failed: FATAL: role "reporting_readonly" does not exist`',
          fix: "Confirm roles.sql actually ran successfully before attempting to connect as that role — check for an earlier error in its output.",
        },
      ],
      hints: [
        "Recording each migration's own version in schema_migrations as the LAST statement in that migration file is what makes the tracking table an accurate, automatic history.",
        "GRANT SELECT ON learner, course, enrollment TO reporting_readonly; can grant the same privilege across multiple tables in one statement.",
        "A genuinely tested backup/recovery answer means describing what you'd ACTUALLY do (pg_dump on a schedule, tested against a real restore) -- not aspirational, unverified statements.",
      ],
      referenceSolution: {
        summary:
          "Two ordered migrations create and use a schema_migrations tracking table, safely adding a NOT NULL column via a DEFAULT. roles.sql creates a reporting_readonly role with SELECT-only access on exactly three tables. The operational checklist is answered with concrete, specific practices, not placeholders.",
        files: [
          {
            path: "migrations/001_create_schema_migrations_table.sql",
            content: `CREATE TABLE IF NOT EXISTS schema_migrations (
    version    TEXT PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO schema_migrations (version) VALUES ('001_create_schema_migrations_table');
`,
          },
          {
            path: "migrations/002_add_learner_display_name.sql",
            content: `ALTER TABLE learner ADD COLUMN display_name TEXT NOT NULL DEFAULT 'Unnamed Learner';

INSERT INTO schema_migrations (version) VALUES ('002_add_learner_display_name');
`,
          },
          {
            path: "roles.sql",
            content: `CREATE ROLE reporting_readonly LOGIN PASSWORD 'change-me-in-a-real-environment';
GRANT SELECT ON learner, course, enrollment TO reporting_readonly;
`,
          },
          {
            path: "operational-checklist.md",
            content: `# Backup and recovery checklist

- [x] How is this database backed up, and how often?
      Daily automated pg_dump to encrypted, offsite storage, retained for 30 days.
- [x] Has the restore procedure actually been tested, not just assumed to work?
      Yes -- a restore from the most recent backup was performed into a scratch
      database and its row counts and a sample of rows were compared against the
      source before this checklist was marked complete.
- [x] What is the acceptable data-loss window?
      Up to 24 hours (the interval between daily backups) for this lab's scale;
      a production system with stricter requirements would need continuous
      archiving (WAL shipping) instead, for a near-zero data-loss window.
- [x] What is the expected recovery time if the primary database is lost entirely?
      Estimated 1-2 hours: provision a new server, restore the latest backup,
      verify data integrity, repoint the application's connection string.
- [x] Who is responsible for verifying backups remain valid over time?
      The checklist author, on a monthly recurring reminder, until a dedicated
      operational owner is assigned.
`,
          },
        ],
      },
      extensionChallenge:
        "Write a third migration, 003_add_learner_email_index.sql, that adds an index on learner(email) (the column already used in WHERE clauses via the UNIQUE constraint's implicit index -- research whether PostgreSQL's UNIQUE constraint already creates this index, and document what you find in your migration's own comment).",
    },
    commonMistakes: [
      "Running an ALTER TABLE by hand directly against production, with no corresponding migration file committed anywhere -- this makes the schema's actual current state undocumented and unreproducible on any other environment.",
      "Adding a NOT NULL column to a populated table with no DEFAULT -- this fails immediately with a clear error, but the underlying mistake (not considering existing rows) is worth recognizing before attempting the migration, not just after the error.",
      "Treating an untested backup as a real safety net -- a backup that has never been restored and verified is only an assumption that recovery would work, not a demonstrated, reliable guarantee.",
    ],
    quiz: [
      {
        id: "pg-q14-1",
        prompt:
          "Why must migrations be applied in a strict, tracked, sequential order rather than as untracked, ad-hoc schema changes?",
        choices: [
          "PostgreSQL physically cannot apply ALTER TABLE statements out of order",
          "Sequential, tracked migrations ensure every environment (dev, staging, production) reaches the exact same schema state through the exact same documented, auditable sequence of changes -- untracked changes make the schema's actual state unreproducible",
          "Ad-hoc schema changes are faster and equally safe",
          "This is only a concern for very large teams",
        ],
        correctIndex: 1,
        explanation:
          "The whole point of migration tracking is reproducibility and auditability: any environment can be brought to the identical schema state by replaying the same ordered sequence, and anyone can read the migration history to understand exactly what changed and when — an ad-hoc ALTER TABLE run once by hand provides neither guarantee.",
      },
      {
        id: "pg-q14-2",
        prompt:
          "Why does adding a NOT NULL column to a table with existing rows fail without a DEFAULT value?",
        choices: [
          "PostgreSQL doesn't support adding columns to populated tables at all",
          "Every existing row would have no value for the new required column, which directly violates the NOT NULL constraint being added -- a DEFAULT gives those existing rows a valid value to backfill",
          "NOT NULL columns can only be added to empty tables permanently",
          "This is a bug in PostgreSQL that will eventually be fixed",
        ],
        correctIndex: 1,
        explanation:
          "A NOT NULL constraint demands every row have a value, including rows that already existed before the column was added — without a DEFAULT to backfill those existing rows, the constraint is immediately violated by data that already exists, and PostgreSQL correctly rejects the migration rather than silently leaving invalid data.",
      },
      {
        id: "pg-q14-3",
        prompt: "Why is an untested backup not a reliable safety net?",
        choices: [
          "Backups are always reliable once created; testing is unnecessary",
          "A backup that has never actually been restored and verified is only an assumption that recovery would work -- the restore process itself can fail or produce incomplete data in ways that only testing would reveal",
          "Untested backups are illegal under most data protection regulations",
          "Backups automatically expire if never tested",
        ],
        correctIndex: 1,
        explanation:
          "Creating a backup file and successfully restoring from it are two genuinely different operations, and the restore path is exactly where real failures (corrupted archives, incompatible versions, missing configuration) tend to surface — an assumption that a backup 'would work' is not the same claim as having demonstrated that it does.",
      },
    ],
    takeaway:
      "Schema changes belong in ordered, tracked migrations, not ad-hoc live edits — and some changes (adding a required column to a populated table, dropping a column) need deliberate care or a multi-step approach to apply safely; a backup that's never been tested with a real restore is an assumption, not a guarantee.",
    summary:
      "Migrations are small, ordered, tracked scripts (recorded in a schema_migrations table) that make schema changes reproducible and auditable. Adding a NOT NULL column to a populated table needs a DEFAULT to avoid failing outright. Testing database behavior means verifying constraints actually reject invalid data and migrations apply/reverse cleanly. Backups are only a real safety net once their restore procedure has actually been tested.",
  },
];
