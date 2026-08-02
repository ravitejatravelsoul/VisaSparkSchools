import type { LessonInput } from "@/lib/content/types";

/**
 * TypeScript Foundations.
 *
 * Every exercise runs in the browser TypeScript lab: the learner's code is
 * type-checked by the real compiler, then the emitted JavaScript executes in
 * the same sandboxed iframe the JavaScript course uses. `harness` code
 * therefore sees the learner's top-level declarations exactly as it would in a
 * plain JavaScript exercise.
 *
 * Exercises deliberately stay inside the ambient surface declared by
 * lib/runners/typescript-lab-lib.ts; scripts/validate-snippets.ts fails the
 * build if a reference solution stops type-checking or stops passing its own
 * checks.
 */
export const typescriptLessons: LessonInput[] = [
  {
    id: "ts-why-types",
    slug: "ts-why-types",
    title: "Why Types? From JavaScript to TypeScript",
    description:
      "What a type system buys you, and how TypeScript catches a bug that JavaScript happily runs.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Explain what a static type system checks, and when it checks it",
      "Annotate a variable with an explicit type",
      "Predict whether a given assignment will be rejected by the compiler",
    ],
    skills: ["typescript", "type-annotations"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: The Basics",
        url: "https://www.typescriptlang.org/docs/handbook/2/basic-types.html",
      },
    ],
    keywords: ["typescript", "static typing", "compiler", "type annotation", "type error"],
    explanation: `JavaScript checks almost nothing before your code runs. This function looks fine:

\`\`\`js
function applyDiscount(price, percent) {
  return price - price * (percent / 100);
}
\`\`\`

Call it as \`applyDiscount("20", 10)\` and JavaScript does not complain. It converts, guesses, and hands back \`NaN\` — "not a number" — which then flows into a total, then into a receipt, and surfaces days later as a support ticket. The mistake happened at the call site; the symptom appeared somewhere else entirely. That distance is what makes these bugs expensive.

TypeScript is JavaScript plus a **static type system**. "Static" means the checking happens *before* the program runs — while you type, and again when you build. You describe what a value is allowed to be, and the compiler holds every line to that description.

\`\`\`ts
function applyDiscount(price: number, percent: number): number {
  return price - price * (percent / 100);
}
\`\`\`

Now \`applyDiscount("20", 10)\` is rejected with a specific complaint: *Argument of type 'string' is not assignable to parameter of type 'number'*. The error names the wrong value, the expected type, and the exact position. You fix it in seconds instead of hours.

**The annotation syntax is a colon after the name**: \`const total: number = 0\`. You will meet it on variables, parameters, and return types.

Two things worth understanding early, because they explain most of TypeScript's behaviour:

**TypeScript erases at runtime.** Types are checking instructions for the compiler, not values your program can inspect. The emitted JavaScript has every annotation stripped out. There is no type information left to consult while the program runs, which is why you cannot ask "what type is this variable?" the way you can ask \`typeof\` about a *value*.

**A type error does not necessarily stop the build.** By default TypeScript still emits JavaScript when it finds type errors, on the theory that you may want to run the parts that are fine while you fix the rest. In this lab you will see both: the error *and* the output. That is not the lab being lenient — it is the compiler's actual default.

Types are not paperwork you add at the end. They are a description of intent that the compiler enforces for you, forever, on every future edit.`,
    example: {
      language: "typescript",
      description:
        "The same calculation with annotations. Note the third call: the compiler objects before this ever runs.",
      code: `function applyDiscount(price: number, percent: number): number {
  return price - price * (percent / 100);
}

console.log(applyDiscount(200, 10));
console.log(applyDiscount(59.99, 25));

// Uncomment the next line to see the compiler reject it:
// console.log(applyDiscount("200", 10));`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        "Try it: uncomment the last line and press Run. Read the error, then fix it by passing a number.",
      code: `function applyDiscount(price: number, percent: number): number {
  return price - price * (percent / 100);
}

console.log(applyDiscount(200, 10));
// console.log(applyDiscount("200", 10));`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-1-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        "Declare a variable `courseTitle` explicitly typed as `string`, and a variable `lessonCount` explicitly typed as `number`. Give each a sensible value, then log both.",
      starterCode: `// Declare courseTitle (string) and lessonCount (number) below, then log them.
`,
      solutionCode: `const courseTitle: string = "TypeScript Foundations";
const lessonCount: number = 12;

console.log(courseTitle, lessonCount);`,
      harness: `
        try { window.__report('t1', typeof courseTitle === 'string' && courseTitle.length > 0, 'courseTitle should be a non-empty string.'); } catch (e) { window.__report('t1', false, 'courseTitle is not defined: ' + e.message); }
        try { window.__report('t2', typeof lessonCount === 'number' && !isNaN(lessonCount), 'lessonCount should be a number.'); } catch (e) { window.__report('t2', false, 'lessonCount is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "courseTitle is a non-empty string", hidden: false },
        { id: "t2", description: "lessonCount is a number", hidden: false },
      ],
      hints: [
        "An annotation goes after the variable name, separated by a colon: const name: string = ...",
        "Strings need quotes; numbers do not.",
        'Shape: const courseTitle: string = "..."; const lessonCount: number = 12;',
      ],
    },
    independentExercise: {
      id: "ts-1-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        "Write a function `secondsToMinutes(seconds: number): number` that converts seconds to whole minutes, rounded down. Annotate both the parameter and the return type. `secondsToMinutes(150)` should return 2.",
      starterCode: `// Write secondsToMinutes below, annotating the parameter and the return type.
`,
      solutionCode: `function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / 60);
}`,
      harness: `
        try {
          window.__report('t1', typeof secondsToMinutes === 'function', 'secondsToMinutes should be a function.');
          window.__report('t2', secondsToMinutes(150) === 2, 'secondsToMinutes(150) should be 2, got ' + secondsToMinutes(150));
          window.__report('t3', secondsToMinutes(59) === 0 && secondsToMinutes(600) === 10, 'Should round down: 59 -> 0 and 600 -> 10.');
        } catch (e) { window.__report('t1', false, 'secondsToMinutes is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "secondsToMinutes is defined", hidden: false },
        { id: "t2", description: "secondsToMinutes(150) returns 2", hidden: false },
        { id: "t3", description: "Rounds down for other inputs", hidden: true },
      ],
      hints: [
        "Annotate the parameter inside the parentheses, and the return type after them: function f(n: number): number { }",
        "Math.floor rounds down toward zero for positive numbers.",
        "60 seconds make a minute, so divide before rounding.",
      ],
    },
    commonMistakes: [
      "Believing types still exist at runtime. They are erased during compilation — you cannot check a variable's declared type while the program runs.",
      "Annotating everything, including values TypeScript could already infer. The next lesson covers when an annotation adds nothing.",
      "Assuming a type error blocks execution. Without `noEmitOnError`, TypeScript still emits JavaScript and the code still runs.",
    ],
    quiz: [
      {
        id: "ts-1-q1",
        prompt: "When does a static type system do its checking?",
        choices: [
          "Before the program runs, during compilation",
          "While the program runs, on every function call",
          "Only when an exception is thrown",
          "When the browser loads the page",
        ],
        correctIndex: 0,
        explanation:
          '"Static" means checked ahead of execution. That is precisely why the error can reach you while you are still editing, rather than after a user hits the bug.',
      },
      {
        id: "ts-1-q2",
        prompt: "What does the compiled JavaScript output of a TypeScript file contain?",
        choices: [
          "The same code with all type annotations removed",
          "The code plus runtime checks that enforce each annotation",
          "A type table the program consults as it runs",
          "Nothing — TypeScript runs directly in the browser",
        ],
        correctIndex: 0,
        explanation:
          "Types are erased. TypeScript emits ordinary JavaScript, which is why annotations cost nothing at runtime and why they cannot be inspected at runtime either.",
      },
      {
        id: "ts-1-q3",
        prompt:
          "Given `function total(a: number, b: number): number`, which call does the compiler reject?",
        choices: ['total("5", 10)', "total(5, 10)", "total(5.5, 10)", "total(-5, 10)"],
        correctIndex: 0,
        explanation:
          "Only the first passes a string where a number is declared. Decimals and negatives are still numbers — TypeScript's `number` covers both, so those calls are fine.",
      },
    ],
    takeaway:
      "TypeScript checks your intent before the code runs, then erases itself — you get the errors without paying anything at runtime.",
    summary:
      "TypeScript adds a static type system to JavaScript. You annotate values with `name: type`, the compiler rejects assignments that contradict those annotations, and the types disappear from the emitted JavaScript.",
    nextLessonSlug: "ts-inference-primitives",
  },

  {
    id: "ts-inference-primitives",
    slug: "ts-inference-primitives",
    title: "Inference and the Primitive Types",
    description:
      "Let the compiler work out types for you, and learn the handful of primitives you will annotate by hand.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: ["ts-why-types"],
    objectives: [
      "Predict the type TypeScript infers from an initial value",
      "Decide when an explicit annotation helps and when it is noise",
      "Explain why `let` and `const` infer differently",
    ],
    skills: ["typescript", "type-inference"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: Everyday Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
      },
    ],
    keywords: ["inference", "primitive types", "literal type", "widening", "any"],
    explanation: `Beginners often assume TypeScript means annotating everything. It does not. The compiler infers a type from the value you assign, and an annotation that merely repeats what it already worked out is noise:

\`\`\`ts
const title: string = "Intro"; // the ": string" adds nothing
const title = "Intro";         // already known to be a string
\`\`\`

**Inference is not a weaker form of typing.** Both lines above are equally protected — assigning a number to \`title\` is rejected either way. The difference is only how much you had to type.

### The primitives

\`string\`, \`number\`, and \`boolean\` cover the overwhelming majority of annotations. TypeScript has a single \`number\` for integers and decimals, exactly like JavaScript. There is no separate integer type.

Two more matter early:

- \`null\` and \`undefined\` are their own types. Under \`strict\` mode (which this lab uses, and which you should use) they are **not** silently allowed everywhere — a \`string\` cannot hold \`null\` unless you say so. Lesson 6 covers how to say so.
- \`any\` opts out of checking entirely. A value typed \`any\` accepts anything and permits anything, which means every guarantee stops at its boundary. Reach for it rarely and deliberately.

### Why \`let\` and \`const\` infer differently

This surprises people:

\`\`\`ts
let status = "active";    // inferred: string
const level = "active";   // inferred: "active"
\`\`\`

A \`const\` can never be reassigned, so the compiler knows its value will always be exactly \`"active"\` — it infers the **literal type** \`"active"\`, narrower than \`string\`. A \`let\` may be reassigned later, so TypeScript **widens** the inference to \`string\` to leave room.

That distinction looks academic now and becomes genuinely useful in lesson 10, where literal types are what make a set of allowed values enforceable.

### Where annotations earn their place

Annotate when there is no value to infer from, or when you want to constrain rather than describe:

\`\`\`ts
let attempts: number;        // no initial value — nothing to infer from
function f(count: number) {} // parameters are never inferred from the outside
\`\`\`

Function parameters always need annotations. TypeScript cannot see the call sites while checking the function body, so it has nothing to infer from.`,
    example: {
      language: "typescript",
      description:
        "Inference in action. Hover-free proof: reassigning to a contradicting type is rejected.",
      code: `const courseName = "TypeScript Foundations"; // inferred as the literal "TypeScript Foundations"
let enrolled = 0;                              // inferred as number
let isPublished = true;                        // inferred as boolean

enrolled = enrolled + 1;
isPublished = false;

console.log(courseName, enrolled, isPublished);

// Rejected by the compiler — uncomment to see the error:
// enrolled = "three";`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        "Uncomment the last line and Run. The error names both the type you supplied and the one expected.",
      code: `let enrolled = 0;
enrolled = enrolled + 1;
console.log(enrolled);

// enrolled = "three";`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-2-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        "Without writing any annotations, declare `siteName` as a const string, `visitorCount` as a let number, and `isLive` as a let boolean. Then increment `visitorCount` by 5 and log all three.",
      starterCode: `// Declare siteName, visitorCount, and isLive using inference only (no ": type" annotations).
`,
      solutionCode: `const siteName = "VisaSparkSchools";
let visitorCount = 10;
let isLive = true;

visitorCount = visitorCount + 5;

console.log(siteName, visitorCount, isLive);`,
      harness: `
        try {
          window.__report('t1', typeof siteName === 'string', 'siteName should be a string.');
          window.__report('t2', typeof visitorCount === 'number', 'visitorCount should be a number.');
          window.__report('t3', typeof isLive === 'boolean', 'isLive should be a boolean.');
        } catch (e) { window.__report('t1', false, 'A variable is missing: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "siteName is a string", hidden: false },
        { id: "t2", description: "visitorCount is a number", hidden: false },
        { id: "t3", description: "isLive is a boolean", hidden: false },
      ],
      hints: [
        "Leave the types off entirely — assign a value and let TypeScript work it out.",
        "Use const for the one that never changes, let for the two that might.",
        'Shape: const siteName = "..."; let visitorCount = 10; let isLive = true;',
      ],
    },
    independentExercise: {
      id: "ts-2-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        'Declare `maxRetries` with an explicit `number` annotation but no initial value, then assign it 3. Also write `describeAttempt(attempt: number): string` that returns `"Attempt 3 of 3"` style text using `maxRetries`.',
      starterCode: `// Declare maxRetries (annotated, unassigned), then assign it, then write describeAttempt.
`,
      solutionCode: `let maxRetries: number;
maxRetries = 3;

function describeAttempt(attempt: number): string {
  return "Attempt " + attempt + " of " + maxRetries;
}`,
      harness: `
        try {
          window.__report('t1', maxRetries === 3, 'maxRetries should be 3, got ' + maxRetries);
          window.__report('t2', typeof describeAttempt === 'function', 'describeAttempt should be a function.');
          window.__report('t3', describeAttempt(1) === 'Attempt 1 of 3', 'describeAttempt(1) should be "Attempt 1 of 3", got "' + describeAttempt(1) + '"');
        } catch (e) { window.__report('t1', false, 'Something is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "maxRetries is 3", hidden: false },
        { id: "t2", description: "describeAttempt is defined", hidden: false },
        { id: "t3", description: 'describeAttempt(1) returns "Attempt 1 of 3"', hidden: false },
      ],
      hints: [
        "A variable with no initial value has nothing to infer from, so it needs the annotation: let maxRetries: number;",
        "Build the string by concatenating with +, or use a template literal.",
        'The exact expected text for attempt 1 is "Attempt 1 of 3".',
      ],
    },
    commonMistakes: [
      "Annotating every variable out of habit. If the initial value already tells TypeScript the type, the annotation only adds maintenance.",
      'Expecting `const greeting = "hi"` to infer `string`. It infers the literal type `"hi"` — narrower, and useful later.',
      "Using `any` to silence an error. It does not fix the mismatch; it removes checking from that point onward.",
    ],
    quiz: [
      {
        id: "ts-2-q1",
        prompt: 'What type does TypeScript infer for `const mode = "dark"`?',
        choices: [
          'The literal type "dark"',
          "string",
          "any",
          "It infers nothing without an annotation",
        ],
        correctIndex: 0,
        explanation:
          'A `const` can never be reassigned, so the compiler narrows to the exact literal type `"dark"`. The same initializer under `let` would widen to `string`.',
      },
      {
        id: "ts-2-q2",
        prompt: "Which of these genuinely requires an explicit annotation?",
        choices: [
          "A function parameter",
          'A const initialized to "hello"',
          "A let initialized to 0",
          "A boolean initialized to true",
        ],
        correctIndex: 0,
        explanation:
          "TypeScript checks a function body without seeing its call sites, so there is nothing to infer a parameter type from. The other three all have initial values to infer from.",
      },
      {
        id: "ts-2-q3",
        prompt: "What is the practical effect of typing a value as `any`?",
        choices: [
          "Type checking stops applying to that value",
          "It becomes a string at runtime",
          "The compiler infers the correct type automatically",
          "It is the same as `unknown`",
        ],
        correctIndex: 0,
        explanation:
          "`any` disables checking for that value — it accepts anything and permits any operation. `unknown` is the safe counterpart, covered in lesson 11.",
      },
    ],
    takeaway:
      "Let inference do the work; annotate where there is nothing to infer from, especially function parameters.",
    summary:
      "TypeScript infers types from initial values, widening for `let` and narrowing to literal types for `const`. Annotations earn their place on parameters and on declarations with no initializer. `any` switches checking off and should be rare.",
    nextLessonSlug: "ts-arrays-objects",
  },

  {
    id: "ts-arrays-objects",
    slug: "ts-arrays-objects",
    title: "Typing Arrays and Objects",
    description:
      "Describe collections and structured values, the two shapes almost all data takes.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["ts-inference-primitives"],
    objectives: [
      "Type an array so its elements are checked",
      "Describe an object's shape inline",
      "Explain why an excess property is rejected in an object literal",
    ],
    skills: ["typescript", "arrays", "object-types"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: Object Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
      },
    ],
    keywords: ["array type", "object type", "excess property check", "nested types"],
    explanation: `Real data is rarely a lone string. It is a list of things, or a thing with fields — usually both.

### Arrays

Write the element type followed by \`[]\`:

\`\`\`ts
const scores: number[] = [90, 78, 100];
const names: string[] = ["Ada", "Grace"];
\`\`\`

Every element is now checked, and so is everything you push later. \`scores.push("100")\` is rejected. The payoff shows up in the methods: because TypeScript knows \`scores\` holds numbers, it knows \`scores.map(s => s * 2)\` is valid and that the result is \`number[]\`, while \`scores.map(s => s.toUpperCase())\` is not.

An empty array with no annotation is a trap. \`const items = []\` infers \`any[]\` — a list that accepts anything. Annotate empty arrays.

### Objects

Describe the shape inline, field by field:

\`\`\`ts
const lesson: { title: string; minutes: number } = {
  title: "Typing Arrays",
  minutes: 22,
};
\`\`\`

Missing a field is an error. Getting a field's type wrong is an error. And so is **adding a field that is not in the shape** — this one catches people out:

\`\`\`ts
const lesson: { title: string } = { title: "Intro", minutes: 22 };
//                                                  ^^^^^^^ rejected
\`\`\`

That is the **excess property check**. TypeScript's reasoning: you wrote this literal *here*, in a place with a declared shape, so an extra property is almost certainly a typo or a misunderstanding rather than an intention. It is a deliberate strictness that only applies to object literals assigned directly to a typed target.

### Nesting

Shapes compose, and arrays of objects are the everyday case:

\`\`\`ts
const modules: { id: string; lessons: string[] }[] = [
  { id: "basics", lessons: ["a", "b"] },
];
\`\`\`

Note the trailing \`[]\` — that is "array of that shape". Inline shapes get unreadable fast at this size, which is exactly the problem the next lesson solves with named types.`,
    example: {
      language: "typescript",
      description: "An array of typed objects, and the methods that stay type-safe over it.",
      code: `const lessons: { title: string; minutes: number }[] = [
  { title: "Why Types", minutes: 18 },
  { title: "Inference", minutes: 20 },
  { title: "Arrays and Objects", minutes: 22 },
];

const totalMinutes = lessons.reduce((sum, l) => sum + l.minutes, 0);
const titles = lessons.map((l) => l.title);

console.log(totalMinutes);
console.log(titles.join(" | "));`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        "Add a fourth lesson. Then try adding a property that is not in the shape, and read the error.",
      code: `const lessons: { title: string; minutes: number }[] = [
  { title: "Why Types", minutes: 18 },
];

console.log(lessons.length);`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-3-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        "Declare `temperatures` as a `number[]` holding 12, 15, and 9. Then create `warmDays` containing only the values above 10, and log its length.",
      starterCode: `// Declare temperatures (number[]), then build warmDays from it.
`,
      solutionCode: `const temperatures: number[] = [12, 15, 9];
const warmDays = temperatures.filter((t) => t > 10);

console.log(warmDays.length);`,
      harness: `
        try {
          window.__report('t1', Array.isArray(temperatures) && temperatures.length === 3, 'temperatures should be an array of 3 numbers.');
          window.__report('t2', Array.isArray(warmDays) && warmDays.length === 2, 'warmDays should contain 2 values, got ' + (warmDays && warmDays.length));
          window.__report('t3', warmDays.indexOf(9) === -1, 'warmDays should exclude values of 10 or below.');
        } catch (e) { window.__report('t1', false, 'Something is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "temperatures holds 3 numbers", hidden: false },
        { id: "t2", description: "warmDays holds 2 values", hidden: false },
        { id: "t3", description: "warmDays excludes 9", hidden: true },
      ],
      hints: [
        "An array type is the element type followed by []: number[].",
        "filter keeps every element for which the callback returns true.",
        "Above 10 means strictly greater than, so 9 is excluded.",
      ],
    },
    independentExercise: {
      id: "ts-3-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        "Declare `student` as an object typed inline with `name` (string) and `grades` (number[]). Then write `average(): number` that returns the mean of `student.grades`. With grades [80, 90, 100] the average is 90.",
      starterCode: `// Declare student with an inline object type, then write average().
`,
      solutionCode: `const student: { name: string; grades: number[] } = {
  name: "Ada",
  grades: [80, 90, 100],
};

function average(): number {
  const total = student.grades.reduce((sum, g) => sum + g, 0);
  return total / student.grades.length;
}`,
      harness: `
        try {
          window.__report('t1', typeof student === 'object' && typeof student.name === 'string', 'student should have a string name.');
          window.__report('t2', Array.isArray(student.grades) && student.grades.length === 3, 'student.grades should be an array of 3 numbers.');
          window.__report('t3', typeof average === 'function' && average() === 90, 'average() should return 90, got ' + (typeof average === 'function' ? average() : 'undefined'));
        } catch (e) { window.__report('t1', false, 'Something is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "student has a string name", hidden: false },
        { id: "t2", description: "student.grades holds 3 numbers", hidden: false },
        { id: "t3", description: "average() returns 90", hidden: false },
      ],
      hints: [
        "An inline object type lists each field with its type: { name: string; grades: number[] }.",
        "reduce with an initial value of 0 sums an array of numbers.",
        "Mean is the sum divided by how many values there are.",
      ],
    },
    commonMistakes: [
      "Leaving an empty array unannotated. `const items = []` infers `any[]`, which quietly accepts anything you push later.",
      "Being surprised that an extra property is rejected. The excess property check is deliberate, and it applies to object literals assigned to a declared shape.",
      "Writing `Array<number>` and `number[]` as though they differ. They are the same type in two syntaxes.",
    ],
    quiz: [
      {
        id: "ts-3-q1",
        prompt: "What does TypeScript infer for `const items = []`?",
        choices: ["any[]", "never[]", "unknown[]", "It is a compile error"],
        correctIndex: 0,
        explanation:
          "With no elements and no annotation there is nothing to infer from, so it becomes `any[]` — the array accepts anything later. Annotate empty arrays.",
      },
      {
        id: "ts-3-q2",
        prompt: 'Given `const u: { name: string } = { name: "Ada", age: 30 };`, what happens?',
        choices: [
          "Rejected: `age` is an excess property on the literal",
          "Accepted: extra properties are always allowed",
          "Accepted, and `age` is added to the type",
          "Rejected: `name` must also be optional",
        ],
        correctIndex: 0,
        explanation:
          "The excess property check fires because an object literal is assigned directly to a declared shape. TypeScript treats the extra field as a likely typo rather than an intention.",
      },
      {
        id: "ts-3-q3",
        prompt: "How do you type an array of objects that each have a `title` string?",
        choices: [
          "{ title: string }[]",
          "[{ title: string }]",
          "Array<title: string>",
          "{ title: string[] }",
        ],
        correctIndex: 0,
        explanation:
          "The trailing `[]` applies to the shape before it. Option 2 is a tuple of exactly one element, and option 4 is a single object whose `title` is an array of strings.",
      },
    ],
    takeaway:
      "`type[]` checks every element; an inline `{ field: type }` checks every field — including rejecting fields you did not declare.",
    summary:
      "Arrays are typed with a trailing `[]`, objects with an inline field list. Empty arrays need annotations, and object literals assigned to a declared shape are rejected if they carry extra properties.",
    nextLessonSlug: "ts-interfaces-aliases",
  },

  {
    id: "ts-interfaces-aliases",
    slug: "ts-interfaces-aliases",
    title: "Interfaces and Type Aliases",
    description: "Give a shape a name so it can be reused, extended, and referred to in one place.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["ts-arrays-objects"],
    objectives: [
      "Name an object shape with an interface or a type alias",
      "Extend one shape from another",
      "Choose between `interface` and `type` with a defensible reason",
    ],
    skills: ["typescript", "interfaces", "type-aliases"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: Type Aliases and Interfaces",
        url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases",
      },
    ],
    keywords: ["interface", "type alias", "extends", "reuse", "declaration merging"],
    explanation: `Repeating \`{ title: string; minutes: number }\` in five places means five places to edit when a field changes, and five chances to get it wrong. Name the shape once instead.

### Two ways to name a shape

\`\`\`ts
interface Lesson {
  title: string;
  minutes: number;
}

type LessonAlias = {
  title: string;
  minutes: number;
};
\`\`\`

For describing an object, these are interchangeable. Both are erased at runtime, both check identically, and you can use either wherever a type is expected.

### Where they differ

**\`interface\` can be extended, and reopened.**

\`\`\`ts
interface Content {
  title: string;
}
interface Lesson extends Content {
  minutes: number;
}
\`\`\`

\`Lesson\` now requires both fields. Interfaces also support *declaration merging*: declaring the same interface name twice merges the members rather than erroring. That is occasionally essential when augmenting types from a library, and occasionally a confusing accident in your own code.

**\`type\` can name things that are not objects.** A union, a primitive, a function signature:

\`\`\`ts
type Status = "draft" | "published";
type Minutes = number;
type Formatter = (value: string) => string;
\`\`\`

Interfaces cannot express those. \`type\` composes with \`&\` instead of \`extends\`:

\`\`\`ts
type Lesson = Content & { minutes: number };
\`\`\`

### Choosing

A defensible default: **\`interface\` for object shapes, \`type\` for everything else.** Interfaces produce slightly clearer error messages for objects and communicate "this is a thing with fields," while \`type\` is the only option for unions and function types — which you will meet in lessons 5 and 7.

What matters more than the choice is consistency within a codebase. Mixing both for object shapes with no rule behind it makes readers wonder what distinction you intended.

### Naming shapes is design work

An interface is documentation the compiler enforces. \`interface User { id: string; email: string }\` states that every user has both, everywhere, forever. When that stops being true the compiler tells you every place that assumed otherwise — which is precisely the leverage you are buying.`,
    example: {
      language: "typescript",
      description:
        "A base shape, an extended shape, and a type alias for something an interface could not express.",
      code: `interface Content {
  title: string;
  author: string;
}

interface Lesson extends Content {
  minutes: number;
}

type Status = "draft" | "published";

const lesson: Lesson = {
  title: "Interfaces and Type Aliases",
  author: "Curriculum Team",
  minutes: 22,
};

const status: Status = "published";

console.log(lesson.title + " by " + lesson.author + " (" + status + ")");`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        'Add a `level` field to Lesson. Then try setting status to "archived" and read the error.',
      code: `interface Lesson {
  title: string;
  minutes: number;
}

type Status = "draft" | "published";

const lesson: Lesson = { title: "Intro", minutes: 10 };
const status: Status = "draft";

console.log(lesson.title, status);`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-4-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        "Define an interface `Book` with `title` (string) and `pages` (number). Create a `Book` called `currentBook`, then write `isLong(): boolean` returning true when the book has more than 300 pages.",
      starterCode: `// Define the Book interface, create currentBook, then write isLong().
`,
      solutionCode: `interface Book {
  title: string;
  pages: number;
}

const currentBook: Book = {
  title: "The Pragmatic Programmer",
  pages: 352,
};

function isLong(): boolean {
  return currentBook.pages > 300;
}`,
      harness: `
        try {
          window.__report('t1', typeof currentBook === 'object' && typeof currentBook.title === 'string', 'currentBook needs a string title.');
          window.__report('t2', typeof currentBook.pages === 'number', 'currentBook needs a number pages.');
          window.__report('t3', typeof isLong === 'function' && isLong() === (currentBook.pages > 300), 'isLong() should reflect whether pages > 300.');
        } catch (e) { window.__report('t1', false, 'Something is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "currentBook has a string title", hidden: false },
        { id: "t2", description: "currentBook has a number pages", hidden: false },
        { id: "t3", description: "isLong() matches pages > 300", hidden: false },
      ],
      hints: [
        "An interface declares fields without assigning values: interface Book { title: string; pages: number; }",
        "Annotate the object with the interface name: const currentBook: Book = { ... }",
        "isLong returns a comparison directly — no if statement needed.",
      ],
    },
    independentExercise: {
      id: "ts-4-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        'Define `interface Person { name: string }` and `interface Employee extends Person { role: string }`. Create an `Employee` named `staffMember`, then write `describe(): string` returning `"Ada — Engineer"` style text (name, space, em dash, space, role).',
      starterCode: `// Define Person and Employee, create staffMember, then write describe().
`,
      solutionCode: `interface Person {
  name: string;
}

interface Employee extends Person {
  role: string;
}

const staffMember: Employee = {
  name: "Ada",
  role: "Engineer",
};

function describe(): string {
  return staffMember.name + " — " + staffMember.role;
}`,
      harness: `
        try {
          window.__report('t1', typeof staffMember.name === 'string' && typeof staffMember.role === 'string', 'staffMember needs both name and role as strings.');
          window.__report('t2', typeof describe === 'function', 'describe should be a function.');
          window.__report('t3', describe() === staffMember.name + ' — ' + staffMember.role, 'describe() should be name, space, em dash, space, role. Got: "' + describe() + '"');
        } catch (e) { window.__report('t1', false, 'Something is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "staffMember has name and role", hidden: false },
        { id: "t2", description: "describe is defined", hidden: false },
        { id: "t3", description: "describe() joins name and role with an em dash", hidden: false },
      ],
      hints: [
        "extends copies the parent's members into the child: interface Employee extends Person { role: string }",
        "An Employee must supply name as well as role, because it inherited name.",
        "The separator is an em dash (—) with a space on each side.",
      ],
    },
    commonMistakes: [
      'Trying to express a union with an interface. `interface Status = "a" | "b"` is not valid — unions need `type`.',
      "Assuming an interface exists at runtime. Like every other type, it is erased; you cannot check `instanceof` against it.",
      "Mixing `interface` and `type` for object shapes at random, leaving readers to guess whether the difference was meaningful.",
    ],
    quiz: [
      {
        id: "ts-4-q1",
        prompt: "Which can a `type` alias express that an `interface` cannot?",
        choices: [
          'A union such as "draft" | "published"',
          "An object with required fields",
          "An object with a nested object field",
          "An array of objects",
        ],
        correctIndex: 0,
        explanation:
          "Interfaces describe object shapes only. Unions, primitive aliases, and function signatures all require `type`. The other three options are object shapes an interface handles fine.",
      },
      {
        id: "ts-4-q2",
        prompt: "`interface Employee extends Person { role: string }` means an Employee must have:",
        choices: [
          "Every field of Person, plus role",
          "Only role",
          "Either Person's fields or role",
          "role, with Person's fields optional",
        ],
        correctIndex: 0,
        explanation:
          "`extends` adds to the parent's requirements rather than replacing them, so an Employee needs the full set. Option 3 describes a union, and option 4 would require explicit optional markers.",
      },
      {
        id: "ts-4-q3",
        prompt: "What is the runtime cost of an interface?",
        choices: [
          "None — it is erased during compilation",
          "One object allocation per instance",
          "A prototype lookup on each property access",
          "It is compiled into a runtime validation function",
        ],
        correctIndex: 0,
        explanation:
          "Interfaces are purely compile-time. Nothing about them survives into the emitted JavaScript, which is also why they cannot be used for runtime checks like `instanceof`.",
      },
    ],
    takeaway:
      "Name a shape once with `interface`, reach for `type` when the thing you are naming is not an object.",
    summary:
      "Interfaces and type aliases both name shapes. Interfaces extend and merge and read well for objects; type aliases are required for unions, primitives, and function signatures. Both vanish at runtime.",
    nextLessonSlug: "ts-unions-narrowing",
  },

  {
    id: "ts-unions-narrowing",
    slug: "ts-unions-narrowing",
    title: "Union Types and Narrowing",
    description:
      "Say a value may be one of several types, then prove which one it is before using it.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 24,
    prerequisites: ["ts-interfaces-aliases"],
    objectives: [
      "Declare a union type and explain what operations it permits",
      "Narrow a union with a typeof or equality check",
      "Recognise why the compiler rejects a member-specific operation on an un-narrowed union",
    ],
    skills: ["typescript", "unions", "narrowing"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: Narrowing",
        url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
      },
    ],
    keywords: ["union type", "narrowing", "typeof guard", "control flow analysis"],
    explanation: `Some values genuinely have more than one possible type. An id might arrive as a number from a database and a string from a URL. A union says so, with \`|\`:

\`\`\`ts
type Id = string | number;
\`\`\`

### A union permits only what all members permit

This is the rule that explains every union error you will hit:

\`\`\`ts
function printId(id: string | number) {
  console.log(id.toUpperCase()); // rejected
}
\`\`\`

\`toUpperCase\` exists on \`string\` but not on \`number\`, so TypeScript refuses. It cannot know which one arrived, and it will not let you gamble. The error is not the compiler being awkward — it is pointing at a real crash that would happen whenever a number is passed.

### Narrowing

You fix it by proving which member you have. TypeScript follows ordinary JavaScript checks and updates the type inside each branch — this is **control flow analysis**:

\`\`\`ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // here, id is string
  } else {
    console.log(id.toFixed(0));    // here, id is number
  }
}
\`\`\`

Nothing special was added. A plain \`typeof\` check is enough, because the compiler models what your code has already established. Inside the \`if\`, \`id\` is a \`string\`; in the \`else\`, the only remaining possibility is \`number\`, so that is what it becomes.

Several everyday checks narrow:

- \`typeof x === "string"\` for primitives
- \`x === "published"\` for literal unions
- \`Array.isArray(x)\` for arrays
- a truthiness check like \`if (x)\` for removing \`null\`/\`undefined\`

### Unions of literals

Unions are not limited to primitive types. A union of **literal** types is one of TypeScript's most useful patterns:

\`\`\`ts
type Status = "draft" | "review" | "published";
\`\`\`

Now \`"pubished"\` (typo) is a compile error rather than a value that silently fails a comparison forever. Lesson 10 goes further with this idea.

### Exhaustiveness

When you narrow a literal union across branches and handle every member, the final \`else\` receives a value of type \`never\` — the type with no possible values. That is TypeScript telling you "nothing can reach here", and it is how you get a compile error later if someone adds a fourth status and forgets a branch.`,
    example: {
      language: "typescript",
      description:
        "The same value, two types, two safe paths. Notice each branch permits different methods.",
      code: `type Id = string | number;

function formatId(id: Id): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return "#" + id.toFixed(0);
}

console.log(formatId("ab-42"));
console.log(formatId(7));

type Status = "draft" | "review" | "published";

function label(status: Status): string {
  if (status === "draft") return "Not ready";
  if (status === "review") return "Being checked";
  return "Live";
}

console.log(label("review"));`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        "Remove the typeof check and press Run — read how the compiler explains the problem.",
      code: `function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return String(id);
}

console.log(formatId("ab-42"), formatId(7));`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-5-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        'Write `describeValue(value: string | number): string`. For a string return its length as `"text of length N"`. For a number return `"number N"`. Use a typeof check to narrow.',
      starterCode: `// Write describeValue below, narrowing with typeof.
`,
      solutionCode: `function describeValue(value: string | number): string {
  if (typeof value === "string") {
    return "text of length " + value.length;
  }
  return "number " + value;
}`,
      harness: `
        try {
          window.__report('t1', typeof describeValue === 'function', 'describeValue should be a function.');
          window.__report('t2', describeValue("hello") === 'text of length 5', 'describeValue("hello") should be "text of length 5", got "' + describeValue("hello") + '"');
          window.__report('t3', describeValue(42) === 'number 42', 'describeValue(42) should be "number 42", got "' + describeValue(42) + '"');
        } catch (e) { window.__report('t1', false, 'describeValue is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "describeValue is defined", hidden: false },
        {
          id: "t2",
          description: 'describeValue("hello") returns "text of length 5"',
          hidden: false,
        },
        { id: "t3", description: 'describeValue(42) returns "number 42"', hidden: false },
      ],
      hints: [
        "Declare the parameter as a union: value: string | number.",
        'Inside if (typeof value === "string") the compiler treats value as a string, so .length is allowed.',
        "After the if returns, the only remaining possibility is number.",
      ],
    },
    independentExercise: {
      id: "ts-5-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        'Define `type Shape = "circle" | "square"`. Write `area(shape: Shape, size: number): number` returning the circle area (Math.PI * size * size, where size is the radius) or the square area (size * size). Round the result to 2 decimals with Math.round(x * 100) / 100.',
      starterCode: `// Define the Shape union, then write area().
`,
      solutionCode: `type Shape = "circle" | "square";

function area(shape: Shape, size: number): number {
  if (shape === "circle") {
    return Math.round(Math.PI * size * size * 100) / 100;
  }
  return Math.round(size * size * 100) / 100;
}`,
      harness: `
        try {
          window.__report('t1', typeof area === 'function', 'area should be a function.');
          window.__report('t2', area('square', 3) === 9, 'area("square", 3) should be 9, got ' + area('square', 3));
          window.__report('t3', Math.abs(area('circle', 2) - 12.57) < 0.01, 'area("circle", 2) should be about 12.57, got ' + area('circle', 2));
        } catch (e) { window.__report('t1', false, 'area is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "area is defined", hidden: false },
        { id: "t2", description: 'area("square", 3) returns 9', hidden: false },
        { id: "t3", description: 'area("circle", 2) returns about 12.57', hidden: false },
      ],
      hints: [
        'A literal union lists the exact allowed values: type Shape = "circle" | "square";',
        "Compare with === to narrow a literal union, the same way typeof narrows a primitive union.",
        "Round with Math.round(value * 100) / 100 to keep two decimals.",
      ],
    },
    commonMistakes: [
      "Calling a member-specific method before narrowing. A union only permits what every member supports.",
      "Assuming narrowing persists across a callback boundary. The compiler re-analyses inside a new function scope.",
      'Writing `string | number` when a literal union like `"draft" | "published"` would have caught typos too.',
    ],
    quiz: [
      {
        id: "ts-5-q1",
        prompt: "Why is `id.toUpperCase()` rejected when `id: string | number`?",
        choices: [
          "A union only permits operations valid for every member",
          "toUpperCase is deprecated in TypeScript",
          "Unions must be narrowed with a cast before any use",
          "Because `number` is checked before `string`",
        ],
        correctIndex: 0,
        explanation:
          "`toUpperCase` does not exist on `number`, so allowing it would permit a real runtime crash. Narrowing proves which member you have and unlocks its methods.",
      },
      {
        id: "ts-5-q2",
        prompt:
          'In `if (typeof v === "string") { … } else { … }` where `v: string | number`, what is `v` in the else branch?',
        choices: ["number", "string | number", "unknown", "never"],
        correctIndex: 0,
        explanation:
          "Control flow analysis removes `string` in the else branch, leaving `number` as the only remaining member of the union.",
      },
      {
        id: "ts-5-q3",
        prompt: 'What is the advantage of `"draft" | "published"` over `string`?',
        choices: [
          "Any value outside the listed set becomes a compile error",
          "It runs faster at runtime",
          "It allows extra properties to be added",
          "It removes the need for narrowing",
        ],
        correctIndex: 0,
        explanation:
          'A literal union turns a typo like `"pubished"` into a build failure. It has no runtime effect at all — like every type, it is erased.',
      },
    ],
    takeaway:
      "A union restricts you to what all members share; narrowing with ordinary JavaScript checks unlocks the rest.",
    summary:
      "Unions (`A | B`) describe values with several possible types and permit only shared operations. `typeof`, equality, `Array.isArray`, and truthiness checks narrow the type per branch through control flow analysis.",
    nextLessonSlug: "ts-optional-nullability",
  },

  {
    id: "ts-optional-nullability",
    slug: "ts-optional-nullability",
    title: "Optional Fields and Nullability",
    description:
      "Model values that might be missing, and let the compiler force you to handle that case.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["ts-unions-narrowing"],
    objectives: [
      "Mark a field optional and explain the type it actually receives",
      "Handle a possibly-undefined value before using it",
      "Use optional chaining and nullish coalescing correctly",
    ],
    skills: ["typescript", "optional", "null-safety"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: strictNullChecks",
        url: "https://www.typescriptlang.org/tsconfig/#strictNullChecks",
      },
    ],
    keywords: ["optional property", "undefined", "optional chaining", "nullish coalescing"],
    explanation: `"Cannot read properties of undefined" is the most common runtime error in JavaScript. Under \`strict\` mode, TypeScript exists largely to make it impossible.

### Optional fields

A \`?\` after a field name means the field may be absent:

\`\`\`ts
interface Profile {
  name: string;
  nickname?: string;
}
\`\`\`

\`nickname\` now has type \`string | undefined\`. That is the important part: optional is not a separate concept, it is a union with \`undefined\`. Which means everything you learned about unions applies — you must narrow before you use it.

\`\`\`ts
function greet(p: Profile): string {
  return "Hi " + p.nickname.toUpperCase(); // rejected: possibly undefined
}
\`\`\`

The compiler is describing a real crash for every profile without a nickname.

### Handling it

A plain check narrows, exactly like last lesson:

\`\`\`ts
if (p.nickname) {
  return "Hi " + p.nickname.toUpperCase(); // now string
}
return "Hi " + p.name;
\`\`\`

Two operators make this shorter.

**Optional chaining \`?.\`** stops and returns \`undefined\` instead of throwing:

\`\`\`ts
const upper = p.nickname?.toUpperCase(); // string | undefined
\`\`\`

**Nullish coalescing \`??\`** supplies a fallback when the left side is \`null\` or \`undefined\`:

\`\`\`ts
const display = p.nickname ?? p.name; // string
\`\`\`

Use \`??\` rather than \`||\` when the value could legitimately be \`0\` or \`""\`. \`||\` falls back on *any* falsy value, so \`count || 10\` gives 10 when count is 0 — usually a bug. \`count ?? 10\` gives 0, because 0 is not nullish.

### null versus undefined

Both exist and they are different types. A workable convention: \`undefined\` means "not provided", \`null\` means "explicitly empty". If you need to accept either, say so: \`string | null | undefined\`.

### Why this is worth the friction

Every one of these errors is a crash you would otherwise ship. The compiler is not adding work — it is moving work from your users' browsers to your editor.`,
    example: {
      language: "typescript",
      description:
        "An optional field handled three ways: an explicit check, optional chaining, and a fallback.",
      code: `interface Profile {
  name: string;
  nickname?: string;
  age?: number;
}

const withNick: Profile = { name: "Adaeze", nickname: "Ada" };
const withoutNick: Profile = { name: "Grace" };

function display(p: Profile): string {
  return p.nickname ?? p.name;
}

function shout(p: Profile): string {
  return p.nickname?.toUpperCase() ?? "NO NICKNAME";
}

console.log(display(withNick), display(withoutNick));
console.log(shout(withNick), shout(withoutNick));

// ?? only falls back on null/undefined, so a real 0 survives:
const age = withoutNick.age ?? 0;
console.log(age);`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        "Remove the ?? fallback in display and Run. The compiler explains exactly what could be undefined.",
      code: `interface Profile {
  name: string;
  nickname?: string;
}

function display(p: Profile): string {
  return p.nickname ?? p.name;
}

console.log(display({ name: "Grace" }));`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-6-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        "Define `interface Settings { theme: string; fontSize?: number }`. Write `resolveFontSize(s: Settings): number` returning the fontSize when present, otherwise 16. A fontSize of 0 must be respected, not replaced.",
      starterCode: `// Define Settings, then write resolveFontSize.
`,
      solutionCode: `interface Settings {
  theme: string;
  fontSize?: number;
}

function resolveFontSize(s: Settings): number {
  return s.fontSize ?? 16;
}`,
      harness: `
        try {
          window.__report('t1', typeof resolveFontSize === 'function', 'resolveFontSize should be a function.');
          window.__report('t2', resolveFontSize({ theme: 'dark', fontSize: 20 }) === 20, 'Should return the provided fontSize.');
          window.__report('t3', resolveFontSize({ theme: 'dark' }) === 16, 'Should default to 16 when fontSize is absent.');
          window.__report('t4', resolveFontSize({ theme: 'dark', fontSize: 0 }) === 0, 'A fontSize of 0 must be respected, not replaced by 16. Use ?? rather than ||.');
        } catch (e) { window.__report('t1', false, 'resolveFontSize is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "resolveFontSize is defined", hidden: false },
        { id: "t2", description: "Returns the provided fontSize", hidden: false },
        { id: "t3", description: "Defaults to 16 when absent", hidden: false },
        { id: "t4", description: "Respects a fontSize of 0", hidden: true },
      ],
      hints: [
        "A ? after the field name makes it optional: fontSize?: number.",
        "?? falls back only when the left side is null or undefined.",
        "|| would also replace 0, because 0 is falsy — that is the difference being tested here.",
      ],
    },
    independentExercise: {
      id: "ts-6-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        'Define `interface User { name: string; email?: string }`. Write `contactLine(u: User): string` returning `"Ada <ada@example.com>"` when an email exists, and `"Ada (no email)"` when it does not.',
      starterCode: `// Define User, then write contactLine.
`,
      solutionCode: `interface User {
  name: string;
  email?: string;
}

function contactLine(u: User): string {
  if (u.email) {
    return u.name + " <" + u.email + ">";
  }
  return u.name + " (no email)";
}`,
      harness: `
        try {
          window.__report('t1', typeof contactLine === 'function', 'contactLine should be a function.');
          window.__report('t2', contactLine({ name: 'Ada', email: 'ada@example.com' }) === 'Ada <ada@example.com>', 'With an email, expected "Ada <ada@example.com>", got "' + contactLine({ name: 'Ada', email: 'ada@example.com' }) + '"');
          window.__report('t3', contactLine({ name: 'Ada' }) === 'Ada (no email)', 'Without an email, expected "Ada (no email)", got "' + contactLine({ name: 'Ada' }) + '"');
        } catch (e) { window.__report('t1', false, 'contactLine is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "contactLine is defined", hidden: false },
        { id: "t2", description: "Formats a user with an email", hidden: false },
        { id: "t3", description: "Formats a user without an email", hidden: false },
      ],
      hints: [
        "An if on the optional value narrows it from string | undefined to string inside the branch.",
        "The angle brackets are literal characters in the output string.",
        'The no-email form is the name followed by a space and "(no email)".',
      ],
    },
    commonMistakes: [
      "Using `||` for defaults where 0 or an empty string is a legitimate value. `??` only falls back on null and undefined.",
      "Thinking `?.` makes an error disappear. It changes the result type to include `undefined`, which you still have to handle.",
      "Marking a field optional to silence an error when the field is genuinely always present — which pushes the check onto every consumer forever.",
    ],
    quiz: [
      {
        id: "ts-6-q1",
        prompt: "What is the type of `nickname` in `interface P { nickname?: string }`?",
        choices: ["string | undefined", "string", "string | null", "undefined"],
        correctIndex: 0,
        explanation:
          "`?` is shorthand for a union with `undefined`. That is why every rule about narrowing unions applies to optional fields.",
      },
      {
        id: "ts-6-q2",
        prompt: "Given `const n: number | undefined = 0`, what does `n ?? 10` produce?",
        choices: ["0", "10", "undefined", "A compile error"],
        correctIndex: 0,
        explanation:
          "`??` falls back only for `null` and `undefined`. `0` is neither, so it passes through. `n || 10` would have produced 10 — the classic bug this operator exists to prevent.",
      },
      {
        id: "ts-6-q3",
        prompt: "What does `user.profile?.city` evaluate to when `profile` is undefined?",
        choices: [
          "undefined, without throwing",
          "It throws a TypeError",
          "null",
          "An empty string",
        ],
        correctIndex: 0,
        explanation:
          "Optional chaining short-circuits and yields `undefined` rather than throwing. The resulting type includes `undefined`, so you still have to handle it.",
      },
    ],
    takeaway:
      "Optional means `| undefined`; the compiler will not let you use the value until you have dealt with that.",
    summary:
      "`field?: T` produces `T | undefined`. Narrow it with a check, reach into it safely with `?.`, and supply a fallback with `??` — not `||`, which also replaces legitimate falsy values like 0.",
    nextLessonSlug: "ts-function-types",
  },

  {
    id: "ts-function-types",
    slug: "ts-function-types",
    title: "Typing Functions",
    description:
      "Annotate parameters, returns, optional and default arguments, and functions passed as values.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["ts-optional-nullability"],
    objectives: [
      "Type optional and default parameters correctly",
      "Write a function type for a callback",
      "Explain when an explicit return type is worth writing",
    ],
    skills: ["typescript", "functions", "callbacks"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: More on Functions",
        url: "https://www.typescriptlang.org/docs/handbook/2/functions.html",
      },
    ],
    keywords: ["function type", "callback", "default parameter", "void", "return type"],
    explanation: `Functions are where types pay off most, because a function is a contract between code written at different times by different people.

### Parameters and returns

\`\`\`ts
function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

Parameters always need annotations. The return type is usually inferred, so \`: number\` here is optional — but writing it is often worth it. An explicit return type makes the compiler check the *function body* against your intention, so if you later add a branch that returns a string, the error appears inside the function you broke rather than at some distant call site.

### Optional and default parameters

\`\`\`ts
function greet(name: string, greeting?: string): string {
  return (greeting ?? "Hello") + ", " + name;
}

function greetWithDefault(name: string, greeting = "Hello"): string {
  return greeting + ", " + name;
}
\`\`\`

A \`?\` parameter is \`string | undefined\` and must be handled. A **default** parameter is different: the type is inferred from the default and the parameter is never \`undefined\` inside the body, because the default fills in. Prefer defaults when a sensible one exists — it removes a branch.

Optional parameters must come after required ones. There is no way to skip an earlier argument.

### Functions as values

To pass a function around, you need a type for it. The syntax is an arrow between parameters and return type:

\`\`\`ts
type Formatter = (value: string) => string;

function applyTwice(value: string, f: Formatter): string {
  return f(f(value));
}
\`\`\`

Parameter *names* in a function type are documentation only — \`(value: string) => string\` and \`(input: string) => string\` are the same type. What matters is position, type, and count.

Callbacks are where this shows up constantly, and where inference helps: in \`items.map(x => x.length)\`, TypeScript already knows \`x\` is a string because it knows \`items\` is \`string[]\`. You rarely annotate callback parameters inline.

### void

\`void\` is the return type of a function that returns nothing useful:

\`\`\`ts
function log(message: string): void {
  console.log(message);
}
\`\`\`

It means "do not rely on the return value", not "returns undefined and I promise nothing else ever will".`,
    example: {
      language: "typescript",
      description:
        "A default parameter, a named function type, and a callback whose parameter is inferred.",
      code: `type Transform = (value: string) => string;

function shout(value: string): string {
  return value.toUpperCase() + "!";
}

function applyTwice(value: string, transform: Transform): string {
  return transform(transform(value));
}

function joinNames(names: string[], separator = ", "): string {
  return names.join(separator);
}

console.log(applyTwice("hey", shout));
console.log(joinNames(["Ada", "Grace", "Alan"]));
console.log(joinNames(["Ada", "Grace"], " & "));

// The callback parameter's type is inferred from the array's type:
const lengths = ["one", "three"].map((word) => word.length);
console.log(lengths.join("/"));`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        "Change applyTwice's callback to one returning a number and Run — the mismatch is caught at the call site.",
      code: `type Transform = (value: string) => string;

function applyTwice(value: string, transform: Transform): string {
  return transform(transform(value));
}

console.log(applyTwice("hi", (v) => v + "!"));`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-7-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        'Write `buildTag(content: string, tag = "p"): string` returning `"<p>hello</p>"` style markup, using a default parameter so `buildTag("hello")` works.',
      starterCode: `// Write buildTag with a default parameter for tag.
`,
      solutionCode: `function buildTag(content: string, tag = "p"): string {
  return "<" + tag + ">" + content + "</" + tag + ">";
}`,
      harness: `
        try {
          window.__report('t1', typeof buildTag === 'function', 'buildTag should be a function.');
          window.__report('t2', buildTag('hello') === '<p>hello</p>', 'buildTag("hello") should be "<p>hello</p>", got "' + buildTag('hello') + '"');
          window.__report('t3', buildTag('hi', 'h1') === '<h1>hi</h1>', 'buildTag("hi","h1") should be "<h1>hi</h1>", got "' + buildTag('hi','h1') + '"');
        } catch (e) { window.__report('t1', false, 'buildTag is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "buildTag is defined", hidden: false },
        { id: "t2", description: 'buildTag("hello") uses the default p tag', hidden: false },
        { id: "t3", description: "An explicit tag overrides the default", hidden: false },
      ],
      hints: [
        'A default parameter is written with =: function buildTag(content: string, tag = "p")',
        "The type of tag is inferred from its default, so you do not need to annotate it.",
        "Build the string with concatenation: opening tag, content, closing tag.",
      ],
    },
    independentExercise: {
      id: "ts-7-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        "Define `type NumberTransform = (n: number) => number`. Write `applyAll(values: number[], f: NumberTransform): number[]` that returns a new array with `f` applied to each value.",
      starterCode: `// Define NumberTransform, then write applyAll.
`,
      solutionCode: `type NumberTransform = (n: number) => number;

function applyAll(values: number[], f: NumberTransform): number[] {
  return values.map((v) => f(v));
}`,
      harness: `
        try {
          window.__report('t1', typeof applyAll === 'function', 'applyAll should be a function.');
          var doubled = applyAll([1, 2, 3], function (n) { return n * 2; });
          window.__report('t2', Array.isArray(doubled) && doubled.join(',') === '2,4,6', 'Doubling [1,2,3] should give [2,4,6], got [' + doubled + ']');
          var original = [1, 2, 3];
          applyAll(original, function (n) { return n * 2; });
          window.__report('t3', original.join(',') === '1,2,3', 'applyAll must not mutate the input array.');
        } catch (e) { window.__report('t1', false, 'applyAll is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "applyAll is defined", hidden: false },
        { id: "t2", description: "Applies the transform to every value", hidden: false },
        { id: "t3", description: "Does not mutate the input array", hidden: true },
      ],
      hints: [
        "A function type puts an arrow between the parameter list and the return type: (n: number) => number.",
        "map already returns a new array, so it satisfies the no-mutation requirement.",
        "You can pass f straight to map, or wrap it in an arrow function.",
      ],
    },
    commonMistakes: [
      "Putting an optional parameter before a required one. Arguments are positional, so there is no way to skip one.",
      "Annotating callback parameters that TypeScript already infers from the array being mapped.",
      "Treating `void` as 'returns undefined'. It means the return value is not meant to be used.",
    ],
    quiz: [
      {
        id: "ts-7-q1",
        prompt: "In `function f(a: string, b = 2)`, what is the type of `b` inside the body?",
        choices: ["number", "number | undefined", "any", "unknown"],
        correctIndex: 0,
        explanation:
          "A default parameter is inferred from its default and can never be undefined inside the body, because the default fills in. An *optional* parameter (`b?: number`) would be `number | undefined`.",
      },
      {
        id: "ts-7-q2",
        prompt: "Are `(value: string) => string` and `(input: string) => string` the same type?",
        choices: [
          "Yes — parameter names in a function type are documentation only",
          "No — the names must match",
          "Only if both are declared with `type`",
          "Only inside the same module",
        ],
        correctIndex: 0,
        explanation:
          "Compatibility depends on parameter position, type, and count. Names exist purely to help the reader.",
      },
      {
        id: "ts-7-q3",
        prompt: "Why write an explicit return type when it can be inferred?",
        choices: [
          "So a mistake is reported inside the function rather than at its call sites",
          "Because inference does not work for functions",
          "It makes the compiled JavaScript faster",
          "It is required under strict mode",
        ],
        correctIndex: 0,
        explanation:
          "An explicit return type checks the body against your stated intent, so the error surfaces where the bug is. Inference would instead propagate the wrong type outward.",
      },
    ],
    takeaway:
      "Parameters always need types; explicit return types localise errors to the function you actually broke.",
    summary:
      "Annotate parameters, prefer default values over optional parameters where a sensible default exists, and describe callbacks with `(params) => return` function types. Return types are inferred but often worth stating.",
    nextLessonSlug: "ts-generics",
  },

  {
    id: "ts-generics",
    slug: "ts-generics",
    title: "Generics",
    description: "Write one function or type that works for many types without giving up checking.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 26,
    prerequisites: ["ts-function-types"],
    objectives: [
      "Write a generic function whose return type depends on its argument",
      "Explain why a generic beats `any` for reusable code",
      "Constrain a type parameter with `extends`",
    ],
    skills: ["typescript", "generics", "constraints"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: Generics",
        url: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
      },
    ],
    keywords: ["generics", "type parameter", "constraint", "extends", "reusable types"],
    explanation: `Suppose you want a function that returns the first item of an array. Typed for strings it only works for strings. Typed with \`any\` it works for everything and checks nothing:

\`\`\`ts
function firstAny(items: any[]): any { return items[0]; }

const n = firstAny([1, 2, 3]);
n.toUpperCase(); // no complaint — and a crash at runtime
\`\`\`

The information that the array held numbers was thrown away. A **generic** keeps it.

### A type parameter

\`\`\`ts
function first<T>(items: T[]): T {
  return items[0];
}
\`\`\`

\`<T>\` declares a *type parameter* — a placeholder filled in per call, the way a normal parameter is filled with a value. Read the signature as: "for whatever type T the array holds, this returns that same T."

\`\`\`ts
const a = first([1, 2, 3]);       // a: number
const b = first(["x", "y"]);      // b: string
\`\`\`

You did not write \`first<number>(...)\`. TypeScript **infers** the type argument from what you passed, which is why generics rarely feel heavy at the call site. You can pass it explicitly when inference cannot help: \`first<string>([])\`.

\`T\` is only a convention. \`<Item>\` is often clearer, and clarity wins over brevity in a signature others will read.

### Constraints

Sometimes a generic must not accept *literally anything*. If your function reads \`.length\`, say so:

\`\`\`ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("hello", "hi");       // fine — strings have length
longest([1, 2], [1, 2, 3]);   // fine — arrays have length
longest(10, 20);              // rejected — numbers have no length
\`\`\`

\`extends\` here means "T must be assignable to this shape". It narrows what callers may supply while still preserving the specific type they used — \`longest("a","bb")\` still returns \`string\`, not \`{ length: number }\`.

### Generic types, not just functions

Interfaces and aliases take type parameters too:

\`\`\`ts
interface Result<T> {
  data: T;
  error?: string;
}

const userResult: Result<{ name: string }> = { data: { name: "Ada" } };
\`\`\`

You have already used generic types without naming them: \`Array<T>\` is exactly this, and \`Promise<T>\` is why \`await\` gives back the right type.

### The rule of thumb

Reach for a generic when a function's **output type depends on its input type**. If it does not, a plain type is simpler and simpler is better.`,
    example: {
      language: "typescript",
      description:
        "An unconstrained generic, a constrained one, and a generic interface — with types flowing through all three.",
      code: `function first<T>(items: T[]): T {
  return items[0];
}

function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

interface Result<T> {
  data: T;
  error?: string;
}

const firstNumber = first([10, 20, 30]);
const firstWord = first(["alpha", "beta"]);

console.log(firstNumber + 1);
console.log(firstWord.toUpperCase());

console.log(longest("hello", "hi"));
console.log(longest([1, 2], [1, 2, 3]).length);

const wrapped: Result<string> = { data: "ok" };
console.log(wrapped.data.toUpperCase());`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        "Call longest(10, 20) and Run. The constraint explains precisely why numbers are not allowed.",
      code: `function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("hello", "hi"));
// console.log(longest(10, 20));`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-8-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        "Write a generic function `lastItem<T>(items: T[]): T` returning the final element of the array.",
      starterCode: `// Write the generic lastItem function below.
`,
      solutionCode: `function lastItem<T>(items: T[]): T {
  return items[items.length - 1];
}`,
      harness: `
        try {
          window.__report('t1', typeof lastItem === 'function', 'lastItem should be a function.');
          window.__report('t2', lastItem([1, 2, 3]) === 3, 'lastItem([1,2,3]) should be 3, got ' + lastItem([1,2,3]));
          window.__report('t3', lastItem(['a', 'b']) === 'b', 'lastItem(["a","b"]) should be "b", got ' + lastItem(['a','b']));
        } catch (e) { window.__report('t1', false, 'lastItem is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "lastItem is defined", hidden: false },
        { id: "t2", description: "Returns the last number", hidden: false },
        { id: "t3", description: "Returns the last string", hidden: false },
      ],
      hints: [
        "Declare the type parameter in angle brackets before the parameter list: function lastItem<T>(...)",
        "The parameter is an array of T, and the return type is a single T.",
        "The final index of an array is its length minus one.",
      ],
    },
    independentExercise: {
      id: "ts-8-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        'Write `describeLength<T extends { length: number }>(value: T): string` returning `"length 5"` for a value whose length is 5. It must accept strings and arrays but reject numbers.',
      starterCode: `// Write describeLength with a constrained type parameter.
`,
      solutionCode: `function describeLength<T extends { length: number }>(value: T): string {
  return "length " + value.length;
}`,
      harness: `
        try {
          window.__report('t1', typeof describeLength === 'function', 'describeLength should be a function.');
          window.__report('t2', describeLength('hello') === 'length 5', 'describeLength("hello") should be "length 5", got "' + describeLength('hello') + '"');
          window.__report('t3', describeLength([1, 2, 3]) === 'length 3', 'describeLength([1,2,3]) should be "length 3", got "' + describeLength([1,2,3]) + '"');
        } catch (e) { window.__report('t1', false, 'describeLength is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "describeLength is defined", hidden: false },
        { id: "t2", description: 'describeLength("hello") returns "length 5"', hidden: false },
        { id: "t3", description: 'describeLength([1,2,3]) returns "length 3"', hidden: false },
      ],
      hints: [
        "A constraint goes after the type parameter: <T extends { length: number }>.",
        "The constraint is what makes reading value.length legal inside the body.",
        'The returned text is the word "length", a space, then the number.',
      ],
    },
    commonMistakes: [
      "Using `any` where a generic belongs. `any` discards the caller's type; a generic carries it through to the return value.",
      "Adding type parameters a function never uses. If `T` appears only once in the signature, it is probably not needed.",
      "Forgetting a constraint, then being surprised that `.length` is rejected — an unconstrained `T` really could be anything.",
    ],
    quiz: [
      {
        id: "ts-8-q1",
        prompt:
          "What does `first` return in `const x = first([1, 2, 3])` where `first<T>(items: T[]): T`?",
        choices: ["number", "any", "number[]", "unknown"],
        correctIndex: 0,
        explanation:
          "TypeScript infers `T` as `number` from the argument, so the return type is `number`. Preserving that is exactly what a generic buys you over `any`.",
      },
      {
        id: "ts-8-q2",
        prompt: "What does `extends` do in `<T extends { length: number }>`?",
        choices: [
          "Restricts T to types that have a numeric length property",
          "Makes T inherit from a class",
          "Converts T into { length: number }",
          "Marks T as optional",
        ],
        correctIndex: 0,
        explanation:
          "It is a constraint, not class inheritance. Callers must supply something with a `length`, and the specific type they supplied is still preserved in the return type.",
      },
      {
        id: "ts-8-q3",
        prompt: "When is a generic the right tool?",
        choices: [
          "When the output type depends on the input type",
          "Whenever a function takes an object",
          "Whenever you want to avoid writing a return type",
          "Only for functions that work with arrays",
        ],
        correctIndex: 0,
        explanation:
          "That dependency is the whole point. If the return type is fixed regardless of input, a plain annotation is simpler and easier to read.",
      },
    ],
    takeaway:
      "A generic is a type the caller fills in, so a reusable function keeps the caller's specific type instead of erasing it to `any`.",
    summary:
      "Generics declare type parameters (`<T>`) that are usually inferred at the call site, letting one function serve many types with full checking. `extends` constrains what callers may supply while preserving their specific type.",
    nextLessonSlug: "ts-utility-types",
  },

  {
    id: "ts-utility-types",
    slug: "ts-utility-types",
    title: "Utility Types",
    description:
      "Derive new types from existing ones with Partial, Pick, Omit, Record, and Readonly.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["ts-generics"],
    objectives: [
      "Derive a type from another with Partial, Pick, and Omit",
      "Describe a lookup object with Record",
      "Explain why deriving beats duplicating a shape",
    ],
    skills: ["typescript", "utility-types"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: Utility Types",
        url: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
      },
    ],
    keywords: ["Partial", "Pick", "Omit", "Record", "Readonly", "derived types"],
    explanation: `Once you have a shape, you usually need variations of it: the same thing with every field optional for an update, or only two of its fields for a summary. Writing those out by hand means they drift apart the moment the original changes.

**Utility types** derive one type from another. They are ordinary generic types that ship with TypeScript.

### Partial<T> — every field optional

\`\`\`ts
interface User { id: string; name: string; email: string }

function updateUser(id: string, changes: Partial<User>) { /* … */ }

updateUser("u1", { name: "Ada" }); // fine — other fields not required
\`\`\`

Exactly right for a patch operation, where sending only what changed is the point.

### Pick<T, Keys> and Omit<T, Keys>

\`\`\`ts
type UserSummary = Pick<User, "id" | "name">;   // { id, name }
type UserWithoutId = Omit<User, "id">;          // { name, email }
\`\`\`

The keys are given as a union of literal types — which is the payoff from lesson 5. Misspelling a key is a compile error, and renaming a field on \`User\` immediately flags every derived type that referenced the old name.

Choosing between them is about intent and durability: \`Pick\` when the list is short and stable, \`Omit\` when you want everything *except* a couple of fields and expect new fields to be included automatically as they are added.

### Record<Keys, Value>

Describes an object used as a lookup:

\`\`\`ts
type Status = "draft" | "published";
const labels: Record<Status, string> = {
  draft: "Not ready",
  published: "Live",
};
\`\`\`

Because \`Status\` is a literal union, \`Record\` requires **every** key. Add \`"archived"\` to \`Status\` and this object immediately fails to compile until you handle it — a small example of making an illegal state unrepresentable.

### Readonly<T>

\`\`\`ts
const config: Readonly<User> = { id: "1", name: "Ada", email: "a@b.c" };
config.name = "Grace"; // rejected
\`\`\`

Compile-time only. Nothing stops mutation at runtime; the guarantee is that *your* code will not compile if it tries.

### The principle

Derive, do not duplicate. One source of truth means one place to change, and the compiler propagates the consequences everywhere.`,
    example: {
      language: "typescript",
      description: "One interface, four derived types, each still linked to the original.",
      code: `interface Article {
  id: string;
  title: string;
  body: string;
  published: boolean;
}

type ArticleSummary = Pick<Article, "id" | "title">;
type ArticleDraft = Omit<Article, "id">;
type ArticlePatch = Partial<Article>;

type Status = "draft" | "published";
const statusLabels: Record<Status, string> = {
  draft: "Not ready",
  published: "Live",
};

const summary: ArticleSummary = { id: "a1", title: "Utility Types" };
const patch: ArticlePatch = { published: true };

console.log(summary.title);
console.log(statusLabels.draft, statusLabels.published);
console.log(JSON.stringify(patch));`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        'Add "archived" to Status and Run. Record forces you to supply a label for it before the code compiles.',
      code: `type Status = "draft" | "published";

const labels: Record<Status, string> = {
  draft: "Not ready",
  published: "Live",
};

console.log(labels.draft);`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-9-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        "Define `interface Product { id: string; name: string; price: number }`. Derive `type ProductPatch = Partial<Product>`. Write `applyPatch(p: Product, patch: ProductPatch): Product` returning a new product with the patch applied.",
      starterCode: `// Define Product, derive ProductPatch, then write applyPatch.
`,
      solutionCode: `interface Product {
  id: string;
  name: string;
  price: number;
}

type ProductPatch = Partial<Product>;

function applyPatch(p: Product, patch: ProductPatch): Product {
  return {
    id: patch.id ?? p.id,
    name: patch.name ?? p.name,
    price: patch.price ?? p.price,
  };
}`,
      harness: `
        try {
          window.__report('t1', typeof applyPatch === 'function', 'applyPatch should be a function.');
          var base = { id: 'p1', name: 'Mug', price: 10 };
          var out = applyPatch(base, { price: 12 });
          window.__report('t2', out.price === 12 && out.name === 'Mug' && out.id === 'p1', 'Patching price should change only price. Got ' + JSON.stringify(out));
          window.__report('t3', base.price === 10, 'applyPatch must not mutate the original product.');
        } catch (e) { window.__report('t1', false, 'applyPatch is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "applyPatch is defined", hidden: false },
        { id: "t2", description: "Applies only the patched field", hidden: false },
        { id: "t3", description: "Does not mutate the original", hidden: true },
      ],
      hints: [
        "Partial<Product> makes every field of Product optional.",
        "?? picks the patch value when present and the original otherwise.",
        "Return a brand new object literal rather than assigning onto p.",
      ],
    },
    independentExercise: {
      id: "ts-9-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        'Define `type Level = "low" | "high"` and a `Record<Level, number>` called `thresholds` with low = 10 and high = 100. Then write `thresholdFor(level: Level): number` returning the matching number.',
      starterCode: `// Define Level, thresholds (a Record), and thresholdFor.
`,
      solutionCode: `type Level = "low" | "high";

const thresholds: Record<Level, number> = {
  low: 10,
  high: 100,
};

function thresholdFor(level: Level): number {
  return thresholds[level];
}`,
      harness: `
        try {
          window.__report('t1', typeof thresholds === 'object' && thresholds.low === 10 && thresholds.high === 100, 'thresholds should map low to 10 and high to 100.');
          window.__report('t2', typeof thresholdFor === 'function', 'thresholdFor should be a function.');
          window.__report('t3', thresholdFor('low') === 10 && thresholdFor('high') === 100, 'thresholdFor should return the matching threshold.');
        } catch (e) { window.__report('t1', false, 'Something is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "thresholds maps both levels", hidden: false },
        { id: "t2", description: "thresholdFor is defined", hidden: false },
        { id: "t3", description: "thresholdFor returns the matching value", hidden: false },
      ],
      hints: [
        "Record<Keys, Value> takes the key union first and the value type second.",
        "Because Level is a literal union, Record requires an entry for every member.",
        "Index the record with the level to get its value: thresholds[level].",
      ],
    },
    commonMistakes: [
      "Hand-writing a second interface that duplicates most of the first. It drifts the moment either changes.",
      "Expecting `Readonly<T>` to prevent mutation at runtime. It is erased like every other type.",
      "Using `Record<string, T>` where a literal union would force exhaustive keys and catch missing cases.",
    ],
    quiz: [
      {
        id: "ts-9-q1",
        prompt: "What does `Partial<User>` produce?",
        choices: [
          "User with every field optional",
          "User with every field readonly",
          "Only the required fields of User",
          "A union of User's field types",
        ],
        correctIndex: 0,
        explanation:
          "`Partial` marks each field optional, which is exactly the shape of an update payload where you send only what changed.",
      },
      {
        id: "ts-9-q2",
        prompt:
          'What happens if you add "archived" to `type Status` used in `Record<Status, string>`?',
        choices: [
          "The Record fails to compile until an archived entry is added",
          "The Record silently gains an optional archived key",
          "Nothing — Record does not check keys",
          "archived defaults to an empty string",
        ],
        correctIndex: 0,
        explanation:
          "`Record` requires an entry for every key in the union. That is what turns adding a status into a compile error rather than a silently missing label.",
      },
      {
        id: "ts-9-q3",
        prompt: "When is `Omit` preferable to `Pick`?",
        choices: [
          "When you want everything except a few fields, including fields added later",
          "When the source type has fewer than three fields",
          "When the fields are all optional",
          "They are interchangeable in every case",
        ],
        correctIndex: 0,
        explanation:
          "`Omit` keeps future fields automatically, while `Pick` lists exactly what to include and so ignores anything added later. Which you want depends on whether new fields should flow through.",
      },
    ],
    takeaway:
      "Derive types from one source of truth so a change in the original propagates everywhere instead of drifting.",
    summary:
      "`Partial`, `Pick`, `Omit`, `Record`, and `Readonly` build new types from existing ones. Combined with literal unions, `Record` enforces exhaustive keys — turning a forgotten case into a build error.",
    nextLessonSlug: "ts-literal-types",
  },

  {
    id: "ts-literal-types",
    slug: "ts-literal-types",
    title: "Literal Types and const Assertions",
    description:
      "Constrain a value to an exact set, and stop TypeScript widening the types you wanted narrow.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["ts-utility-types"],
    objectives: [
      "Use a literal union to restrict a value to an exact set",
      "Explain why an object property widens, and fix it with `as const`",
      "Derive a union type from an existing object with `keyof` and `typeof`",
    ],
    skills: ["typescript", "literal-types", "const-assertions"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: Literal Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types",
      },
    ],
    keywords: ["literal type", "as const", "keyof", "typeof", "widening"],
    explanation: `A literal type is a type with exactly one possible value: \`"draft"\` is a type, and the only value it accepts is the string \`"draft"\`. On its own that is useless. In a union it is one of TypeScript's sharpest tools:

\`\`\`ts
type Alignment = "left" | "center" | "right";
\`\`\`

\`"centre"\` is now a compile error rather than a silent no-op discovered by a user.

### The widening problem

Lesson 2 introduced widening. Here is where it bites:

\`\`\`ts
const config = { align: "center" };
// config.align is string, not "center"
\`\`\`

The \`const\` applies to \`config\`, not to its properties — \`config.align\` can be reassigned, so TypeScript widens it to \`string\`. Passing \`config.align\` to something expecting \`Alignment\` is then rejected, which feels wrong until you see why.

### as const

A **const assertion** freezes the whole structure into its narrowest form:

\`\`\`ts
const config = { align: "center" } as const;
// config.align is "center", and readonly
\`\`\`

Every property becomes \`readonly\` and every literal keeps its literal type. This is the standard fix, and it composes: \`as const\` on an array gives you a readonly tuple of literals rather than \`string[]\`.

### Deriving a union from data

Two operators let a type follow a value instead of being maintained alongside it.

- \`typeof x\` in *type position* gives the type of the value \`x\`.
- \`keyof T\` gives a union of \`T\`'s keys.

Together:

\`\`\`ts
const ROLES = { admin: 3, editor: 2, viewer: 1 } as const;

type Role = keyof typeof ROLES; // "admin" | "editor" | "viewer"
\`\`\`

Read it inside-out: \`typeof ROLES\` is the object's type, \`keyof\` extracts its keys. Add a role to the object and the type updates itself. There is no second list to forget.

The \`as const\` matters here: without it, the values widen to \`number\` and you lose the exact levels — though \`keyof\` would still work for the keys.

### as const is not a cast

\`as const\` narrows what a value *is understood to be*. It is not \`as SomeType\`, which asserts a type the compiler cannot verify and can be genuinely unsafe. Lesson 11 covers that distinction.`,
    example: {
      language: "typescript",
      description:
        "Widening, the const-assertion fix, and a union derived from an object so the two can never disagree.",
      code: `type Alignment = "left" | "center" | "right";

const widened = { align: "center" };
const narrowed = { align: "center" } as const;

function applyAlignment(a: Alignment): string {
  return "text-align: " + a;
}

// applyAlignment(widened.align); // rejected: string is not Alignment
console.log(applyAlignment(narrowed.align));

const ROLES = { admin: 3, editor: 2, viewer: 1 } as const;
type Role = keyof typeof ROLES;

function levelFor(role: Role): number {
  return ROLES[role];
}

console.log(levelFor("admin"), levelFor("viewer"));`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description: "Remove `as const` and Run. The error shows exactly what widening cost you.",
      code: `type Alignment = "left" | "center" | "right";

const config = { align: "center" } as const;

function applyAlignment(a: Alignment): string {
  return "text-align: " + a;
}

console.log(applyAlignment(config.align));`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-10-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        'Define `type Size = "small" | "medium" | "large"`. Write `sizeInPixels(size: Size): number` returning 12, 16, and 24 respectively.',
      starterCode: `// Define the Size union, then write sizeInPixels.
`,
      solutionCode: `type Size = "small" | "medium" | "large";

function sizeInPixels(size: Size): number {
  if (size === "small") return 12;
  if (size === "medium") return 16;
  return 24;
}`,
      harness: `
        try {
          window.__report('t1', typeof sizeInPixels === 'function', 'sizeInPixels should be a function.');
          window.__report('t2', sizeInPixels('small') === 12 && sizeInPixels('medium') === 16, 'small should be 12 and medium 16.');
          window.__report('t3', sizeInPixels('large') === 24, 'large should be 24, got ' + sizeInPixels('large'));
        } catch (e) { window.__report('t1', false, 'sizeInPixels is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "sizeInPixels is defined", hidden: false },
        { id: "t2", description: "small and medium map correctly", hidden: false },
        { id: "t3", description: "large maps to 24", hidden: false },
      ],
      hints: [
        "A literal union lists the exact allowed strings separated by |.",
        "Compare with === to narrow, as in lesson 5.",
        "The final case needs no check — it is the only possibility left.",
      ],
    },
    independentExercise: {
      id: "ts-10-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        'Create `const ICONS = { save: "💾", trash: "🗑" } as const`, derive `type IconName = keyof typeof ICONS`, then write `iconFor(name: IconName): string` returning the matching icon.',
      starterCode: `// Create ICONS with as const, derive IconName, then write iconFor.
`,
      solutionCode: `const ICONS = { save: "💾", trash: "🗑" } as const;

type IconName = keyof typeof ICONS;

function iconFor(name: IconName): string {
  return ICONS[name];
}`,
      harness: `
        try {
          window.__report('t1', typeof ICONS === 'object' && ICONS.save === '💾', 'ICONS should map save to the save icon.');
          window.__report('t2', typeof iconFor === 'function', 'iconFor should be a function.');
          window.__report('t3', iconFor('save') === ICONS.save && iconFor('trash') === ICONS.trash, 'iconFor should return the matching icon.');
        } catch (e) { window.__report('t1', false, 'Something is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "ICONS maps save correctly", hidden: false },
        { id: "t2", description: "iconFor is defined", hidden: false },
        { id: "t3", description: "iconFor returns the matching icon", hidden: false },
      ],
      hints: [
        "as const goes after the object literal, before the semicolon.",
        "keyof typeof ICONS reads inside-out: the type of ICONS, then its keys.",
        "Index the object with the name to return its value.",
      ],
    },
    commonMistakes: [
      'Expecting `const obj = { a: "x" }` to give `a` a literal type. `const` protects the binding, not the properties — that needs `as const`.',
      "Maintaining a union and an object separately, then letting them drift. `keyof typeof` derives one from the other.",
      "Confusing `as const` with `as SomeType`. The first narrows what is already there; the second asserts something the compiler cannot check.",
    ],
    quiz: [
      {
        id: "ts-10-q1",
        prompt: 'What type does `config.mode` have in `const config = { mode: "dark" }`?',
        choices: ["string", '"dark"', "readonly string", "any"],
        correctIndex: 0,
        explanation:
          'The property is mutable, so TypeScript widens it to `string`. Adding `as const` would keep it as the literal `"dark"` and mark it readonly.',
      },
      {
        id: "ts-10-q2",
        prompt:
          "What does `keyof typeof ROLES` produce for `const ROLES = { admin: 1, viewer: 2 }`?",
        choices: ['"admin" | "viewer"', "1 | 2", "string", "{ admin: number; viewer: number }"],
        correctIndex: 0,
        explanation:
          "`typeof ROLES` is the object's type and `keyof` extracts its keys as a union. Deriving it this way means the type cannot drift from the object.",
      },
      {
        id: "ts-10-q3",
        prompt: "What does `as const` do to an array literal?",
        choices: [
          "Makes it a readonly tuple of literal types",
          "Converts it to a plain mutable array",
          "Removes its element types",
          "Nothing — it only works on objects",
        ],
        correctIndex: 0,
        explanation:
          '`["a","b"] as const` becomes `readonly ["a", "b"]` rather than `string[]`, preserving both order and the exact literals.',
      },
    ],
    takeaway:
      "Literal unions make invalid values unrepresentable; `as const` stops TypeScript widening away the precision you wanted.",
    summary:
      "Literal types restrict a value to an exact set. Object properties widen by default, which `as const` prevents, and `keyof typeof` derives a union from an existing object so the two can never fall out of sync.",
    nextLessonSlug: "ts-unknown-guards",
  },

  {
    id: "ts-unknown-guards",
    slug: "ts-unknown-guards",
    title: "unknown, Type Guards, and Safe Assertions",
    description:
      "Handle data whose shape you cannot trust, and learn why `as` is the escape hatch of last resort.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 10,
    difficulty: "advanced",
    estimatedMinutes: 24,
    prerequisites: ["ts-literal-types"],
    objectives: [
      "Explain the difference between `any` and `unknown`",
      "Write a type predicate that narrows an unknown value",
      "Describe the risk a type assertion introduces",
    ],
    skills: ["typescript", "unknown", "type-guards", "assertions"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: Type Predicates",
        url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
      },
    ],
    keywords: ["unknown", "any", "type guard", "type predicate", "type assertion"],
    explanation: `Data from outside your program — a parsed JSON body, a message from another window — has no type the compiler can trust. TypeScript gives you two ways to describe it, and they are not equivalent.

### any versus unknown

\`any\` disables checking. Every operation is allowed, including ones that will crash:

\`\`\`ts
const data: any = JSON.parse(text);
data.user.name.toUpperCase(); // compiles; may crash three ways
\`\`\`

\`unknown\` is the honest version: it accepts any value but permits *nothing* until you prove what it is.

\`\`\`ts
const data: unknown = JSON.parse(text);
data.user; // rejected — you have not established that data has a user
\`\`\`

That rejection is the feature. \`unknown\` forces the check that \`any\` let you skip.

### Type predicates

Ordinary narrowing (\`typeof\`, \`Array.isArray\`) works on \`unknown\` too. For object shapes you write a **type guard** — a function whose return type is \`value is T\`:

\`\`\`ts
interface User { name: string }

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { name?: unknown }).name === "string"
  );
}
\`\`\`

\`value is User\` is a **type predicate**. It tells the compiler: if this returns true, treat the argument as a \`User\` from here on.

\`\`\`ts
if (isUser(data)) {
  console.log(data.name.toUpperCase()); // data is User
}
\`\`\`

The predicate is a promise *you* are making. TypeScript cannot verify that the body actually checks what the signature claims — a guard that returns \`true\` unconditionally would compile and would be a lie. Keep guards small and obviously correct.

Note the \`null\` check. \`typeof null === "object"\` in JavaScript, so omitting it is a classic bug.

### Type assertions

\`value as User\` tells the compiler to stop objecting. It performs **no runtime check**:

\`\`\`ts
const user = JSON.parse(text) as User;
console.log(user.name.toUpperCase()); // crashes if name is missing
\`\`\`

The type error disappears; the bug does not. An assertion is appropriate when you genuinely know something the compiler cannot — and it should be rare, narrow, and commented.

The order of preference: **narrow if you can, guard if you must, assert only when you truly know better.**`,
    example: {
      language: "typescript",
      description:
        "The same untrusted value handled safely with a guard, versus asserted away with no check at all.",
      code: `interface User {
  name: string;
  age: number;
}

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as { name?: unknown; age?: unknown };
  return typeof candidate.name === "string" && typeof candidate.age === "number";
}

function describe(value: unknown): string {
  if (isUser(value)) {
    return value.name + " is " + value.age;
  }
  return "Not a user";
}

console.log(describe({ name: "Ada", age: 36 }));
console.log(describe({ name: "Ada" }));
console.log(describe("nonsense"));
console.log(describe(null));`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        'Remove the `value === null` check, then call describe(null) — a reminder that typeof null is "object".',
      code: `function isNonNullObject(value: unknown): boolean {
  return typeof value === "object" && value !== null;
}

console.log(isNonNullObject({}), isNonNullObject(null));`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-11-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        "Write `isNonEmptyString(value: unknown): value is string` returning true only for strings with at least one character. Remember it must be a type predicate, not just a boolean.",
      starterCode: `// Write the isNonEmptyString type guard.
`,
      solutionCode: `function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}`,
      harness: `
        try {
          window.__report('t1', typeof isNonEmptyString === 'function', 'isNonEmptyString should be a function.');
          window.__report('t2', isNonEmptyString('hi') === true && isNonEmptyString('') === false, 'Should accept "hi" and reject the empty string.');
          window.__report('t3', isNonEmptyString(5) === false && isNonEmptyString(null) === false, 'Should reject non-strings including null.');
        } catch (e) { window.__report('t1', false, 'isNonEmptyString is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "isNonEmptyString is defined", hidden: false },
        { id: "t2", description: "Accepts non-empty, rejects empty", hidden: false },
        { id: "t3", description: "Rejects non-strings and null", hidden: true },
      ],
      hints: [
        "The return type is a predicate: value is string — not boolean.",
        "typeof narrows the unknown to string, which makes .length legal.",
        "Check both the type and that the length is greater than zero.",
      ],
    },
    independentExercise: {
      id: "ts-11-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        "Define `interface Point { x: number; y: number }` and write `isPoint(value: unknown): value is Point` that safely verifies both fields are numbers. It must return false for null.",
      starterCode: `// Define Point, then write the isPoint type guard.
`,
      solutionCode: `interface Point {
  x: number;
  y: number;
}

function isPoint(value: unknown): value is Point {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as { x?: unknown; y?: unknown };
  return typeof candidate.x === "number" && typeof candidate.y === "number";
}`,
      harness: `
        try {
          window.__report('t1', typeof isPoint === 'function', 'isPoint should be a function.');
          window.__report('t2', isPoint({ x: 1, y: 2 }) === true, 'isPoint({x:1,y:2}) should be true.');
          window.__report('t3', isPoint({ x: 1 }) === false && isPoint(null) === false && isPoint('a') === false, 'Should reject partial objects, null, and non-objects.');
        } catch (e) { window.__report('t1', false, 'isPoint is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "isPoint is defined", hidden: false },
        { id: "t2", description: "Accepts a valid point", hidden: false },
        { id: "t3", description: "Rejects partial objects, null, and non-objects", hidden: false },
      ],
      hints: [
        'Guard the null case first — typeof null is "object" in JavaScript.',
        "Narrow to an object with optional unknown fields before reading x and y.",
        "Both fields must be numbers for the guard to return true.",
      ],
    },
    commonMistakes: [
      "Reaching for `any` when `unknown` is meant. `any` removes checking; `unknown` defers it until you have proved the shape.",
      'Forgetting that `typeof null === "object"`, so an object check without a null check passes for null.',
      "Using `as` to silence an error. An assertion changes what the compiler believes, never what the value actually is.",
    ],
    quiz: [
      {
        id: "ts-11-q1",
        prompt: "What can you do with a value typed `unknown` before narrowing it?",
        choices: [
          "Almost nothing — you must narrow it first",
          "Anything, exactly like `any`",
          "Only call methods that exist on Object",
          "Only compare it with ===",
        ],
        correctIndex: 0,
        explanation:
          "`unknown` accepts any value but permits essentially no operations until narrowed. That is precisely what makes it the safe counterpart to `any`.",
      },
      {
        id: "ts-11-q2",
        prompt: "What does the return type `value is User` provide?",
        choices: [
          "A signal that lets the compiler narrow the argument when the function returns true",
          "A runtime validation generated by TypeScript",
          "A guarantee the object was created from the User interface",
          "A cast applied to every caller automatically",
        ],
        correctIndex: 0,
        explanation:
          "A type predicate informs control flow analysis. The runtime check is entirely yours to write correctly — the compiler cannot verify the body matches the claim.",
      },
      {
        id: "ts-11-q3",
        prompt: "What does `JSON.parse(text) as User` actually check at runtime?",
        choices: [
          "Nothing at all",
          "That every field of User is present",
          "That the JSON is syntactically valid only",
          "That field types match User",
        ],
        correctIndex: 0,
        explanation:
          "An assertion has no runtime component — it only changes what the compiler believes. `JSON.parse` still throws on malformed JSON, but nothing verifies the resulting shape.",
      },
    ],
    takeaway:
      "`unknown` makes you prove a shape before using it; `as` merely silences the compiler and proves nothing.",
    summary:
      "`unknown` accepts anything and permits nothing until narrowed, unlike `any`, which disables checking. Type predicates (`value is T`) let a function narrow for callers, and assertions (`as`) should be rare because they perform no runtime check.",
    nextLessonSlug: "ts-modeling-domain",
  },

  {
    id: "ts-modeling-domain",
    slug: "ts-modeling-domain",
    title: "Modelling a Domain So Wrong States Cannot Exist",
    description:
      "Bring the course together: use discriminated unions to make impossible states unrepresentable.",
    trackSlug: "typescript",
    courseSlug: "typescript-foundations",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 26,
    prerequisites: ["ts-unknown-guards"],
    objectives: [
      "Design a discriminated union for a state machine",
      "Narrow on a discriminant property to access variant-specific fields",
      "Use an exhaustiveness check so a new variant becomes a compile error",
    ],
    skills: ["typescript", "discriminated-unions", "domain-modelling"],
    tech: [{ name: "TypeScript", version: "5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "TypeScript Handbook: Discriminated Unions",
        url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
      },
    ],
    keywords: ["discriminated union", "tagged union", "exhaustiveness", "never", "state modelling"],
    explanation: `Here is a shape you have probably written:

\`\`\`ts
interface RequestState {
  loading: boolean;
  data?: string;
  error?: string;
}
\`\`\`

It permits states that make no sense: loading *and* holding an error; data *and* an error together; neither loading nor finished. Every consumer must then defend against combinations that should never occur — and eventually one forgets.

### The discriminated union

Describe the states that genuinely exist, each with a shared literal **discriminant**:

\`\`\`ts
type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };
\`\`\`

\`data\` now exists only on success, and \`message\` only on error. There is no way to construct a loading-with-an-error value: the illegal states are gone, not guarded against.

### Narrowing on the discriminant

Checking \`status\` narrows to one variant, unlocking its fields:

\`\`\`ts
function render(state: RequestState): string {
  switch (state.status) {
    case "idle":    return "Nothing yet";
    case "loading": return "Loading…";
    case "success": return state.data;      // only here does data exist
    case "error":   return state.message;   // only here does message exist
  }
}
\`\`\`

Accessing \`state.data\` in the \`loading\` branch is a compile error, because that variant genuinely has no such field.

### Exhaustiveness with never

The real payoff arrives months later, when someone adds a variant:

\`\`\`ts
default: {
  const exhaustive: never = state;
  return exhaustive;
}
\`\`\`

\`never\` is the type with no possible values. If every variant is handled, nothing reaches \`default\` and the assignment is fine. Add \`{ status: "cancelled" }\` and that variant *can* reach \`default\` — it is not assignable to \`never\`, so the build fails and points at the switch you forgot.

That is the whole idea: **push errors from runtime to compile time, and from "someone notices" to "the build stops."**

### Designing this way

When modelling, ask which combinations are actually possible, then write only those. Optional fields are frequently a hint that two or more distinct states have been flattened into one shape.

You now have the pieces: annotations and inference, arrays and objects, named shapes, unions and narrowing, optionality, functions, generics, derived types, literal types, and guards. Discriminated unions are where they combine into designs the compiler enforces for you.`,
    example: {
      language: "typescript",
      description:
        "A four-state union, narrowing per branch, and an exhaustiveness check that would fail if a variant were added.",
      code: `type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function render(state: RequestState): string {
  switch (state.status) {
    case "idle":
      return "Nothing requested yet";
    case "loading":
      return "Loading…";
    case "success":
      return "Got: " + state.data;
    case "error":
      return "Failed: " + state.message;
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}

console.log(render({ status: "idle" }));
console.log(render({ status: "loading" }));
console.log(render({ status: "success", data: "42 rows" }));
console.log(render({ status: "error", message: "timeout" }));`,
      editable: false,
    },
    editableExample: {
      language: "typescript",
      description:
        'Add `| { status: "cancelled" }` to the union and Run. The never assignment turns the missing case into a compile error.',
      code: `type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string };

function render(state: RequestState): string {
  switch (state.status) {
    case "loading":
      return "Loading…";
    case "success":
      return state.data;
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}

console.log(render({ status: "success", data: "ok" }));`,
      editable: true,
    },
    guidedExercise: {
      id: "ts-12-guided",
      kind: "guided",
      language: "typescript",
      prompt:
        'Define `type Payment = { kind: "cash" } | { kind: "card"; last4: string }`. Write `describePayment(p: Payment): string` returning "Paid in cash" or "Card ending 4242".',
      starterCode: `// Define the Payment union, then write describePayment.
`,
      solutionCode: `type Payment = { kind: "cash" } | { kind: "card"; last4: string };

function describePayment(p: Payment): string {
  if (p.kind === "cash") {
    return "Paid in cash";
  }
  return "Card ending " + p.last4;
}`,
      harness: `
        try {
          window.__report('t1', typeof describePayment === 'function', 'describePayment should be a function.');
          window.__report('t2', describePayment({ kind: 'cash' }) === 'Paid in cash', 'Cash should give "Paid in cash", got "' + describePayment({ kind: 'cash' }) + '"');
          window.__report('t3', describePayment({ kind: 'card', last4: '4242' }) === 'Card ending 4242', 'Card should give "Card ending 4242", got "' + describePayment({ kind: 'card', last4: '4242' }) + '"');
        } catch (e) { window.__report('t1', false, 'describePayment is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "describePayment is defined", hidden: false },
        { id: "t2", description: "Handles the cash variant", hidden: false },
        { id: "t3", description: "Handles the card variant", hidden: false },
      ],
      hints: [
        "Each variant is an object type, joined with |. They share the discriminant property kind.",
        'Checking p.kind === "cash" narrows to that variant; the other branch is the card variant.',
        "last4 only exists on the card variant, which is why you can only read it after narrowing.",
      ],
    },
    independentExercise: {
      id: "ts-12-independent",
      kind: "independent",
      language: "typescript",
      prompt:
        'Define `type Shape = { kind: "circle"; radius: number } | { kind: "rect"; width: number; height: number }`. Write `area(s: Shape): number` returning the correct area, rounded to 2 decimals with Math.round(x * 100) / 100.',
      starterCode: `// Define the Shape union, then write area().
`,
      solutionCode: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(s: Shape): number {
  if (s.kind === "circle") {
    return Math.round(Math.PI * s.radius * s.radius * 100) / 100;
  }
  return Math.round(s.width * s.height * 100) / 100;
}`,
      harness: `
        try {
          window.__report('t1', typeof area === 'function', 'area should be a function.');
          window.__report('t2', area({ kind: 'rect', width: 3, height: 4 }) === 12, 'A 3x4 rect should have area 12, got ' + area({ kind: 'rect', width: 3, height: 4 }));
          window.__report('t3', Math.abs(area({ kind: 'circle', radius: 2 }) - 12.57) < 0.01, 'A circle of radius 2 should be about 12.57, got ' + area({ kind: 'circle', radius: 2 }));
        } catch (e) { window.__report('t1', false, 'area is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "area is defined", hidden: false },
        { id: "t2", description: "Computes a rectangle's area", hidden: false },
        { id: "t3", description: "Computes a circle's area", hidden: false },
      ],
      hints: [
        "Each variant carries only the fields that variant genuinely needs.",
        "Narrow on s.kind before reading radius or width — they exist on different variants.",
        "Round with Math.round(value * 100) / 100.",
      ],
    },
    commonMistakes: [
      "Flattening several states into one shape with optional fields, which permits combinations that should be impossible.",
      "Using a boolean discriminant like `isError`. Two booleans already describe four states, most of which are nonsense.",
      "Omitting the `never` exhaustiveness check, so adding a variant silently falls through instead of failing the build.",
    ],
    quiz: [
      {
        id: "ts-12-q1",
        prompt: "Why is `{ loading: boolean; data?: string; error?: string }` a weaker model?",
        choices: [
          "It permits impossible combinations such as loading with an error",
          "Optional fields are slower at runtime",
          "TypeScript cannot type optional fields",
          "It requires a type assertion to read data",
        ],
        correctIndex: 0,
        explanation:
          "The shape allows states that cannot really occur, so every consumer must defend against them. A discriminated union removes those states entirely.",
      },
      {
        id: "ts-12-q2",
        prompt: "What makes a union *discriminated*?",
        choices: [
          "Every variant shares a property whose type is a distinct literal",
          "Every variant has the same fields",
          "It is declared with interface rather than type",
          "It contains exactly two variants",
        ],
        correctIndex: 0,
        explanation:
          "The shared literal property (the discriminant) is what lets the compiler pick the exact variant when you check it, unlocking that variant's fields.",
      },
      {
        id: "ts-12-q3",
        prompt:
          "What happens when you add a variant but forget its case, with a `never` check present?",
        choices: [
          "A compile error at the never assignment",
          "A runtime exception when that variant appears",
          "The default branch silently handles it",
          "The new variant is ignored by the compiler",
        ],
        correctIndex: 0,
        explanation:
          "The unhandled variant can now reach the default branch and is not assignable to `never`, so the build fails and points directly at the switch that needs updating.",
      },
    ],
    takeaway:
      "Model the states that can actually exist, and impossible states stop being a thing you defend against.",
    summary:
      "A discriminated union gives each variant a shared literal discriminant, so variant-specific fields exist only where they are valid. Narrowing on the discriminant unlocks those fields, and a `never` exhaustiveness check turns a forgotten variant into a build failure.",
  },
];
