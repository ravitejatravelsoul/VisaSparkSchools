import type { LessonInput } from "@/lib/content/types";

export const javascriptLessons: LessonInput[] = [
  {
    id: "js-variables-types",
    slug: "js-variables-types",
    title: "Variables and Data Types",
    description: "Store and label values with let and const, and meet JavaScript's basic types.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: [],
    objectives: [
      "Declare variables with let and const and explain when to use each",
      "Identify JavaScript's basic primitive types",
      "Use typeof to inspect a value's type",
    ],
    skills: ["javascript", "variables"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: let",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
      },
      {
        label: "MDN: JavaScript data types",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
      },
    ],
    keywords: ["variables", "let", "const", "typeof", "string", "number", "boolean"],
    explanation: `A variable is a named box that holds a value. In modern JavaScript you create one with **let** (for a value that may change later) or **const** (for a value that should never be reassigned). Avoid the older \`var\` keyword — it has confusing scoping rules that \`let\`/\`const\` were introduced to fix.

\`\`\`js
let score = 0;
score = score + 10; // fine — let allows reassignment

const name = "Ada";
// name = "Grace"; // error — const cannot be reassigned
\`\`\`

**const doesn't mean "unchangeable data"** — it means "this variable name can't be pointed at a new value." An array or object stored in a \`const\` can still have its contents modified; only the variable binding itself is frozen.

JavaScript has a handful of basic (primitive) types you'll use constantly:

- **string** — text, written in quotes: \`"hello"\`
- **number** — both integers and decimals share one type: \`42\`, \`3.14\`
- **boolean** — exactly \`true\` or \`false\`
- **undefined** — a variable that has been declared but never given a value
- **null** — an intentional "no value," set explicitly by your code

You can check a value's type at runtime with the \`typeof\` operator, which returns a string like \`"string"\` or \`"number"\`. This is useful when debugging unexpected behavior — a shockingly large number of JavaScript bugs come down to a value being a different type than you assumed (famously, \`typeof null\` returns \`"object"\`, a long-standing quirk worth just memorizing).

Naming variables well is a skill in itself: prefer descriptive names like \`itemCount\` over vague ones like \`x\`, since you and other readers will meet that name again far from where it was declared.`,
    example: {
      language: "javascript",
      description: "Declaring variables of different types and inspecting them with typeof.",
      code: `let itemCount = 3;
const storeName = "Corner Bookshop";
let isOpen = true;
let discount; // undefined until assigned

console.log(typeof itemCount);
console.log(typeof storeName);
console.log(typeof isOpen);
console.log(typeof discount);`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Add your own variable of each type, then log its typeof.",
      code: `let itemCount = 3;
const storeName = "Corner Bookshop";

console.log(itemCount, storeName);
// Add a boolean variable and log its typeof below.`,
      editable: true,
    },
    guidedExercise: {
      id: "js-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Declare a const named `city` set to any city name, and a let named `population` set to any number. Then log both variables.",
      starterCode: `// Declare city and population below, then log them.
`,
      solutionCode: `const city = "Nairobi";
let population = 4400000;

console.log(city, population);`,
      harness: `
        try { window.__report('t1', typeof city === 'string', 'city should be a string.'); } catch (e) { window.__report('t1', false, 'city is not defined: ' + e.message); }
        try { window.__report('t2', typeof population === 'number', 'population should be a number.'); } catch (e) { window.__report('t2', false, 'population is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "city is a string", hidden: false },
        { id: "t2", description: "population is a number", hidden: false },
      ],
      hints: [
        "Use const for a value that won't be reassigned, and let for one that might change.",
        "Declare each variable on its own line: const city = ...; let population = ...;",
        "A string needs quotes around it; a number does not.",
        `Example shape: const city = "Tokyo"; let population = 13900000;`,
      ],
    },
    independentExercise: {
      id: "js-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Declare four variables named exactly `title` (string), `price` (number), `inStock` (boolean), and `notes` (left as undefined, i.e. declared with let but never assigned).",
      starterCode: `// Declare title, price, inStock, and notes below.
`,
      solutionCode: `const title = "The Pragmatic Programmer";
let price = 34.99;
let inStock = true;
let notes;`,
      harness: `
        try { window.__report('t1', typeof title === 'string', 'title should be a string.'); } catch (e) { window.__report('t1', false, e.message); }
        try { window.__report('t2', typeof price === 'number', 'price should be a number.'); } catch (e) { window.__report('t2', false, e.message); }
        try { window.__report('t3', typeof inStock === 'boolean', 'inStock should be a boolean.'); } catch (e) { window.__report('t3', false, e.message); }
        try { window.__report('t4', typeof notes === 'undefined', 'notes should be undefined (declared but not assigned).'); } catch (e) { window.__report('t4', false, e.message); }
      `,
      tests: [
        { id: "t1", description: "title is a string", hidden: false },
        { id: "t2", description: "price is a number", hidden: false },
        { id: "t3", description: "inStock is a boolean", hidden: false },
        { id: "t4", description: "notes is undefined", hidden: true },
      ],
      hints: [
        "Each of the four variables needs a distinct type: string, number, boolean, and undefined.",
        "Use let for notes and don't assign it anything at all.",
        "Booleans are only ever exactly true or false, without quotes.",
        `Example: const title = "..."; let price = 10; let inStock = false; let notes;`,
      ],
    },
    commonMistakes: [
      "Using var out of old habit — it can silently leak variables outside the block you intended.",
      'Wrapping numbers in quotes (making them strings) by accident, e.g. `let price = "9.99"`.',
      "Assuming const freezes an object's contents — it only prevents reassigning the variable itself.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which declaration should you use for a variable you will never reassign?",
        choices: ["var", "let", "const", "static"],
        correctIndex: 2,
        explanation:
          "const signals — and enforces — that the variable binding won't be reassigned.",
      },
      {
        id: "q2",
        prompt: 'What does `typeof "hello"` return?',
        choices: ['"text"', '"string"', '"str"', '"word"'],
        correctIndex: 1,
        explanation: 'JavaScript\'s typeof operator returns the string "string" for text values.',
      },
      {
        id: "q3",
        prompt: "What is the value of a variable declared with `let x;` and never assigned?",
        choices: ["null", "0", "undefined", "an error is thrown"],
        correctIndex: 2,
        explanation: "A declared-but-unassigned variable automatically holds the value undefined.",
      },
    ],
    takeaway:
      "let and const name your data; typeof lets you check what kind of data you actually have.",
    summary:
      "Variables are declared with let (reassignable) or const (fixed binding). JavaScript's basic types include string, number, boolean, undefined, and null, and typeof reports which one a value currently is.",
    nextLessonSlug: "js-operators-conditions",
  },
  {
    id: "js-operators-conditions",
    slug: "js-operators-conditions",
    title: "Operators and Conditionals",
    description: "Compare values and branch your program's logic with if/else.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["js-variables-types"],
    objectives: [
      "Use comparison and logical operators to build boolean expressions",
      "Write if/else if/else chains to branch program logic",
      "Explain truthy and falsy values",
    ],
    skills: ["javascript", "conditionals"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: if...else",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
      },
      {
        label: "MDN: Equality comparisons",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness",
      },
    ],
    keywords: ["operators", "if", "else", "truthy", "falsy", "comparison", "logical"],
    explanation: `Operators combine or compare values into a new result. You already know arithmetic operators (\`+\`, \`-\`, \`*\`, \`/\`). Two other families matter just as much:

**Comparison operators** produce a boolean: \`===\` (strictly equal), \`!==\` (strictly not equal), \`<\`, \`>\`, \`<=\`, \`>=\`. Always prefer \`===\`/\`!==\` over \`==\`/\`!=\` — the loose versions silently convert types before comparing (\`"5" == 5\` is true), which causes subtle bugs. The strict versions require both type and value to match.

**Logical operators** combine booleans: \`&&\` (and — both sides must be true), \`||\` (or — at least one side must be true), \`!\` (not — flips a boolean).

\`\`\`js
const age = 20;
const hasTicket = true;
const canEnter = age >= 18 && hasTicket;
\`\`\`

**Conditionals** let your program take different paths depending on a condition:

\`\`\`js
if (age >= 18) {
  console.log("Adult");
} else if (age >= 13) {
  console.log("Teenager");
} else {
  console.log("Child");
}
\`\`\`

Only the first matching branch runs. \`else if\` chains are checked top to bottom, and \`else\` catches everything else.

JavaScript also has the idea of **truthy** and **falsy** values: outside of actual booleans, values are automatically treated as true or false in a boolean context (like an \`if\` condition). Exactly these values are falsy: \`false\`, \`0\`, \`""\` (empty string), \`null\`, \`undefined\`, and \`NaN\`. Everything else — including \`"0"\` (a non-empty string!) and empty arrays/objects — is truthy. This is why \`if (username)\` is a common, convenient way to check "is this non-empty," but it can also trip you up if a legitimate value like the number \`0\` is falsy in a context where you meant something else.`,
    example: {
      language: "javascript",
      description: "A branching decision using comparison and logical operators.",
      code: `const temperature = 15;
const isRaining = false;

if (temperature > 25 && !isRaining) {
  console.log("Great day for a walk.");
} else if (isRaining) {
  console.log("Bring an umbrella.");
} else {
  console.log("A bit chilly, grab a jacket.");
}`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Change the temperature and isRaining values and see which branch runs.",
      code: `const temperature = 30;
const isRaining = true;

if (temperature > 25 && !isRaining) {
  console.log("Great day for a walk.");
} else if (isRaining) {
  console.log("Bring an umbrella.");
} else {
  console.log("A bit chilly, grab a jacket.");
}`,
      editable: true,
    },
    guidedExercise: {
      id: "js-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        'Write a function `classify(score)` that returns "pass" if score is 60 or above, otherwise returns "fail".',
      starterCode: `function classify(score) {
  // your code here
}`,
      solutionCode: `function classify(score) {
  if (score >= 60) {
    return "pass";
  }
  return "fail";
}`,
      harness: `
        try { window.__report('t1', classify(75) === 'pass', 'classify(75) should return "pass".'); } catch (e) { window.__report('t1', false, e.message); }
        try { window.__report('t2', classify(40) === 'fail', 'classify(40) should return "fail".'); } catch (e) { window.__report('t2', false, e.message); }
        try { window.__report('t3', classify(60) === 'pass', 'classify(60) (the boundary) should return "pass".'); } catch (e) { window.__report('t3', false, e.message); }
      `,
      tests: [
        { id: "t1", description: 'classify(75) returns "pass"', hidden: false },
        { id: "t2", description: 'classify(40) returns "fail"', hidden: false },
        { id: "t3", description: 'classify(60) returns "pass" (boundary)', hidden: true },
      ],
      hints: [
        "You need one condition comparing score to 60.",
        "Use the >= operator so the boundary value 60 counts as a pass.",
        "return immediately inside the if block when the condition is true.",
        `Shape: if (score >= 60) { return "pass"; } return "fail";`,
      ],
    },
    independentExercise: {
      id: "js-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function `ticketPrice(age, isStudent)` that returns 0 for age under 5, 8 for a student of any other age, and 12 otherwise.",
      starterCode: `function ticketPrice(age, isStudent) {
  // your code here
}`,
      solutionCode: `function ticketPrice(age, isStudent) {
  if (age < 5) {
    return 0;
  }
  if (isStudent) {
    return 8;
  }
  return 12;
}`,
      harness: `
        try { window.__report('t1', ticketPrice(3, false) === 0, 'A 3-year-old should pay 0.'); } catch (e) { window.__report('t1', false, e.message); }
        try { window.__report('t2', ticketPrice(20, true) === 8, 'A 20-year-old student should pay 8.'); } catch (e) { window.__report('t2', false, e.message); }
        try { window.__report('t3', ticketPrice(30, false) === 12, 'A 30-year-old non-student should pay 12.'); } catch (e) { window.__report('t3', false, e.message); }
        try { window.__report('t4', ticketPrice(4, true) === 0, 'Age under 5 always pays 0, even if a student.'); } catch (e) { window.__report('t4', false, e.message); }
      `,
      tests: [
        { id: "t1", description: "Under-5 pays 0", hidden: false },
        { id: "t2", description: "Student pays 8", hidden: false },
        { id: "t3", description: "Adult non-student pays 12", hidden: false },
        { id: "t4", description: "Under-5 overrides student discount", hidden: true },
      ],
      hints: [
        "Check the age-under-5 case first, since it should win regardless of student status.",
        "After the age check, branch again on isStudent.",
        "You need three return statements, one per price tier.",
        `Shape: if (age < 5) return 0; if (isStudent) return 8; return 12;`,
      ],
    },
    commonMistakes: [
      "Using = (assignment) instead of === (comparison) inside an if condition.",
      'Relying on == and getting surprised by type coercion, e.g. `0 == ""` being true.',
      "Forgetting that only the first matching branch in an if/else if chain runs — order matters.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Why is === generally preferred over == in JavaScript?",
        choices: [
          "It runs faster in every browser",
          "It compares without converting types first, avoiding surprising coercion bugs",
          "It is the only operator that works with numbers",
          "There is no difference",
        ],
        correctIndex: 1,
        explanation:
          "=== requires matching types and values, while == silently coerces types before comparing.",
      },
      {
        id: "q2",
        prompt: "Which of these values is falsy in JavaScript?",
        choices: [
          '"0" (a string containing zero)',
          "[] (an empty array)",
          "0 (the number zero)",
          "{} (an empty object)",
        ],
        correctIndex: 2,
        explanation:
          'The number 0 is one of JavaScript\'s falsy values; empty arrays, empty objects, and the string "0" are all truthy.',
      },
      {
        id: "q3",
        prompt: "In an if/else if/else chain, how many branches can run?",
        choices: [
          "All matching branches run",
          "Only the first matching branch runs",
          "Only the last branch always runs",
          "None unless explicitly called",
        ],
        correctIndex: 1,
        explanation: "Once a branch's condition matches, the rest of the chain is skipped.",
      },
    ],
    takeaway:
      "Comparisons build booleans, and if/else chains use those booleans to choose exactly one path.",
    summary:
      'Strict comparison operators (===, !==) avoid type-coercion bugs, logical operators (&&, ||, !) combine conditions, and if/else if/else chains run exactly one matching branch. Falsy values (false, 0, "", null, undefined, NaN) matter when a condition isn\'t an explicit boolean.',
    nextLessonSlug: "js-loops",
  },
  {
    id: "js-loops",
    slug: "js-loops",
    title: "Loops",
    description: "Repeat work with for and while loops, and control them with break and continue.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["js-operators-conditions"],
    objectives: [
      "Write a for loop to repeat an action a known number of times",
      "Write a while loop to repeat while a condition holds",
      "Use break and continue to control loop flow",
    ],
    skills: ["javascript", "loops"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: for statement",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
      },
      {
        label: "MDN: while statement",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while",
      },
    ],
    keywords: ["for loop", "while loop", "break", "continue", "iteration"],
    explanation: `Loops repeat a block of code so you don't have to write it out by hand. The **for** loop is the workhorse when you know roughly how many times you want to repeat something:

\`\`\`js
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
\`\`\`

A \`for\` loop has three parts separated by semicolons: an initializer (\`let i = 0\`), a condition checked before each pass (\`i < 5\`), and an update that runs after each pass (\`i++\`). The loop keeps running as long as the condition is true.

The **while** loop is simpler and better when you don't know the number of repetitions in advance — you just keep going while a condition holds:

\`\`\`js
let attempts = 0;
while (attempts < 3) {
  attempts = attempts + 1;
}
\`\`\`

Be careful: if the condition in a \`while\` loop never becomes false, you've written an **infinite loop**, which will freeze whatever is running it. Always make sure something inside the loop moves you toward the exit condition.

Two keywords change a loop's flow mid-iteration:

- **break** exits the loop entirely, right away.
- **continue** skips the rest of the current iteration and jumps to the next one.

\`\`\`js
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 6) break;    // stop entirely at 6
  console.log(i);
}
// logs 0, 1, 2, 4, 5
\`\`\`

You'll also loop over arrays constantly — \`for (const item of someArray)\` reads naturally as "for each item of this array," and is usually clearer than tracking an index manually when you don't need the index itself.`,
    example: {
      language: "javascript",
      description: "Summing numbers 1 through 5 with a for loop, then the same with a while loop.",
      code: `let total = 0;
for (let i = 1; i <= 5; i++) {
  total += i;
}
console.log("for loop total:", total);

let n = 1;
let whileTotal = 0;
while (n <= 5) {
  whileTotal += n;
  n++;
}
console.log("while loop total:", whileTotal);`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Change the loop bound and see the total change.",
      code: `let total = 0;
for (let i = 1; i <= 10; i++) {
  total += i;
}
console.log("Total:", total);`,
      editable: true,
    },
    guidedExercise: {
      id: "js-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write a function `sumUpTo(n)` that returns the sum of all whole numbers from 1 up to and including n, using a for loop.",
      starterCode: `function sumUpTo(n) {
  let total = 0;
  // your loop here
  return total;
}`,
      solutionCode: `function sumUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}`,
      harness: `
        try { window.__report('t1', sumUpTo(5) === 15, 'sumUpTo(5) should be 15.'); } catch (e) { window.__report('t1', false, e.message); }
        try { window.__report('t2', sumUpTo(1) === 1, 'sumUpTo(1) should be 1.'); } catch (e) { window.__report('t2', false, e.message); }
        try { window.__report('t3', sumUpTo(10) === 55, 'sumUpTo(10) should be 55.'); } catch (e) { window.__report('t3', false, e.message); }
      `,
      tests: [
        { id: "t1", description: "sumUpTo(5) is 15", hidden: false },
        { id: "t2", description: "sumUpTo(1) is 1", hidden: false },
        { id: "t3", description: "sumUpTo(10) is 55", hidden: true },
      ],
      hints: [
        "You need a loop that runs once for every whole number from 1 to n.",
        "Start your loop variable at 1, not 0, since you're summing from 1.",
        "Add the loop variable to total on every iteration.",
        `Shape: for (let i = 1; i <= n; i++) { total += i; }`,
      ],
    },
    independentExercise: {
      id: "js-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function `countEvens(limit)` that returns how many even numbers exist from 1 up to and including limit, using continue to skip odd numbers.",
      starterCode: `function countEvens(limit) {
  let count = 0;
  // your loop here
  return count;
}`,
      solutionCode: `function countEvens(limit) {
  let count = 0;
  for (let i = 1; i <= limit; i++) {
    if (i % 2 !== 0) {
      continue;
    }
    count++;
  }
  return count;
}`,
      harness: `
        try { window.__report('t1', countEvens(10) === 5, 'countEvens(10) should be 5 (2,4,6,8,10).'); } catch (e) { window.__report('t1', false, e.message); }
        try { window.__report('t2', countEvens(1) === 0, 'countEvens(1) should be 0.'); } catch (e) { window.__report('t2', false, e.message); }
        try { window.__report('t3', countEvens(7) === 3, 'countEvens(7) should be 3 (2,4,6).'); } catch (e) { window.__report('t3', false, e.message); }
      `,
      tests: [
        { id: "t1", description: "countEvens(10) is 5", hidden: false },
        { id: "t2", description: "countEvens(1) is 0", hidden: false },
        { id: "t3", description: "countEvens(7) is 3", hidden: true },
      ],
      hints: [
        "The remainder operator % tells you if a number is even: i % 2 === 0.",
        "Loop from 1 to limit, checking each number's remainder.",
        "You can either skip odd numbers with continue, or only increment count when the number is even.",
        `Shape: for (let i = 1; i <= limit; i++) { if (i % 2 === 0) count++; }`,
      ],
    },
    commonMistakes: [
      "Writing a while loop whose condition never becomes false, freezing the program.",
      "Off-by-one errors from using < instead of <= (or vice versa) in the loop condition.",
      "Forgetting to update the loop variable, causing an infinite for loop even though it looks correct.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What are the three parts of a for loop's header?",
        choices: [
          "Initializer, condition, update",
          "Start, middle, end",
          "Variable, function, return",
          "Break, continue, return",
        ],
        correctIndex: 0,
        explanation:
          "for (initializer; condition; update) — each part is separated by a semicolon.",
      },
      {
        id: "q2",
        prompt: "What does `continue` do inside a loop?",
        choices: [
          "Exits the loop immediately",
          "Skips the rest of the current iteration and moves to the next one",
          "Restarts the loop from the beginning",
          "Pauses the loop until manually resumed",
        ],
        correctIndex: 1,
        explanation:
          "continue jumps straight to the next iteration, skipping any remaining code in the current one.",
      },
      {
        id: "q3",
        prompt: "What is most likely to cause an infinite loop?",
        choices: [
          "Using a for loop instead of while",
          "A while loop whose condition never becomes false",
          "Using break inside a loop",
          "Looping over an empty array",
        ],
        correctIndex: 1,
        explanation:
          "If nothing inside a while loop ever makes its condition false, it will never stop.",
      },
    ],
    takeaway:
      "for loops suit a known repeat count; while loops suit an unknown one — both need a clear path to stopping.",
    summary:
      "for loops combine an initializer, condition, and update in one line; while loops repeat purely based on a condition. break exits a loop entirely, and continue skips to the next iteration.",
    nextLessonSlug: "js-functions",
  },
  {
    id: "js-functions",
    slug: "js-functions",
    title: "Functions",
    description: "Package reusable logic into named functions with parameters and return values.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 24,
    prerequisites: ["js-loops"],
    objectives: [
      "Define functions using function declarations and arrow functions",
      "Use parameters, default values, and return statements",
      "Explain the basics of variable scope inside a function",
    ],
    skills: ["javascript", "functions"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Functions",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
      },
      {
        label: "MDN: Arrow function expressions",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
      },
    ],
    keywords: ["functions", "arrow functions", "parameters", "return", "scope"],
    explanation: `A function packages a piece of logic under a name so you can run it again without retyping it. There are two common ways to write one:

\`\`\`js
function double(n) {
  return n * 2;
}

const triple = (n) => n * 3;
\`\`\`

The first is a **function declaration**. The second is an **arrow function** stored in a const — a shorter syntax that's especially popular for small helper functions and callbacks. When an arrow function's body is a single expression, you can even skip the \`return\` keyword and the curly braces, as shown above (that's called an "implicit return").

**Parameters** are the named inputs a function expects (\`n\` above); **arguments** are the actual values you pass in when calling it (\`double(5)\`). A parameter can have a **default value**, used only when the caller doesn't supply that argument:

\`\`\`js
function greet(name = "friend") {
  return "Hello, " + name + "!";
}
greet();          // "Hello, friend!"
greet("Priya");   // "Hello, Priya!"
\`\`\`

The **return** statement sends a value back to wherever the function was called, and immediately ends the function — any code after a return inside the same block never runs. A function with no return statement implicitly returns \`undefined\`.

Variables declared inside a function (including its parameters) exist only inside that function — this is called **scope**. A variable declared inside one function is invisible outside it, which is exactly what lets two different functions safely use a variable with the same name without conflicting.`,
    example: {
      language: "javascript",
      description: "A function declaration and an equivalent arrow function.",
      code: `function area(width, height) {
  return width * height;
}

const perimeter = (width, height) => 2 * (width + height);

console.log(area(4, 5));
console.log(perimeter(4, 5));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Add a default value to height and call area() with only one argument.",
      code: `function area(width, height) {
  return width * height;
}

console.log(area(4, 5));
// Try calling area(4) with only one argument — what happens?`,
      editable: true,
    },
    guidedExercise: {
      id: "js-4-guided",
      kind: "guided",
      language: "javascript",
      prompt: "Write a function `square(n)` that returns n multiplied by itself.",
      starterCode: `function square(n) {
  // your code here
}`,
      solutionCode: `function square(n) {
  return n * n;
}`,
      harness: `
        try { window.__report('t1', square(4) === 16, 'square(4) should be 16.'); } catch (e) { window.__report('t1', false, e.message); }
        try { window.__report('t2', square(0) === 0, 'square(0) should be 0.'); } catch (e) { window.__report('t2', false, e.message); }
        try { window.__report('t3', square(-3) === 9, 'square(-3) should be 9.'); } catch (e) { window.__report('t3', false, e.message); }
      `,
      tests: [
        { id: "t1", description: "square(4) is 16", hidden: false },
        { id: "t2", description: "square(0) is 0", hidden: false },
        { id: "t3", description: "square(-3) is 9", hidden: true },
      ],
      hints: [
        "Squaring a number means multiplying it by itself.",
        "You only need one parameter and one return statement.",
        "n * n is all the logic this function needs.",
        `Shape: function square(n) { return n * n; }`,
      ],
    },
    independentExercise: {
      id: "js-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function `applyDiscount(price, percent = 10)` that returns the price after subtracting percent% (defaulting to 10 if not given).",
      starterCode: `function applyDiscount(price, percent) {
  // your code here
}`,
      solutionCode: `function applyDiscount(price, percent = 10) {
  return price - (price * percent) / 100;
}`,
      harness: `
        try { window.__report('t1', Math.abs(applyDiscount(100, 20) - 80) < 0.001, 'applyDiscount(100, 20) should be 80.'); } catch (e) { window.__report('t1', false, e.message); }
        try { window.__report('t2', Math.abs(applyDiscount(200, 50) - 100) < 0.001, 'applyDiscount(200, 50) should be 100.'); } catch (e) { window.__report('t2', false, e.message); }
        try { window.__report('t3', Math.abs(applyDiscount(100) - 90) < 0.001, 'applyDiscount(100) with no percent should default to a 10% discount (90).'); } catch (e) { window.__report('t3', false, e.message); }
      `,
      tests: [
        { id: "t1", description: "20% discount on 100 is 80", hidden: false },
        { id: "t2", description: "50% discount on 200 is 100", hidden: false },
        { id: "t3", description: "Default percent (10) applies when omitted", hidden: true },
      ],
      hints: [
        "The discount amount is price times percent divided by 100.",
        "Subtract that discount amount from the original price.",
        "Give percent a default value of 10 in the parameter list.",
        `Shape: function applyDiscount(price, percent = 10) { return price - (price * percent) / 100; }`,
      ],
    },
    commonMistakes: [
      "Forgetting the return statement, so the function always produces undefined.",
      "Confusing parameters (the placeholders in the definition) with arguments (the real values passed in).",
      "Assuming a default parameter value applies even when a caller explicitly passes undefined for a different reason than 'omitted'.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What happens to code written after a return statement in the same block?",
        choices: [
          "It runs normally",
          "It never runs",
          "It runs only if there's an error",
          "It throws a syntax error",
        ],
        correctIndex: 1,
        explanation:
          "return immediately exits the function, so later code in that block is unreachable.",
      },
      {
        id: "q2",
        prompt: "What does a function return if it has no return statement at all?",
        choices: ["null", "0", "undefined", "an empty string"],
        correctIndex: 2,
        explanation: "A function without an explicit return implicitly returns undefined.",
      },
      {
        id: "q3",
        prompt: "When is a parameter's default value used?",
        choices: [
          "Always, regardless of arguments passed",
          "Only when the corresponding argument is omitted (or explicitly undefined)",
          "Only inside arrow functions",
          "Only when the function has no other parameters",
        ],
        correctIndex: 1,
        explanation:
          "Default values kick in only when no argument (or an undefined one) is supplied for that parameter.",
      },
    ],
    takeaway:
      "Functions turn repeated logic into a single reusable, well-named tool you call instead of retype.",
    summary:
      "Functions can be written as declarations or arrow functions, accept parameters (optionally with defaults), and send a result back with return. Variables inside a function are scoped to it and invisible outside.",
    nextLessonSlug: "js-arrays-objects",
  },
  {
    id: "js-arrays-objects",
    slug: "js-arrays-objects",
    title: "Arrays and Objects",
    description:
      "Group related values in arrays and objects, and transform them with array methods.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 4,
    difficulty: "beginner",
    estimatedMinutes: 26,
    prerequisites: ["js-functions"],
    objectives: [
      "Create and access arrays and objects",
      "Use map, filter, and find to transform and search arrays",
      "Use destructuring to pull values out of arrays and objects",
    ],
    skills: ["javascript", "arrays", "objects"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Array",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      },
      {
        label: "MDN: Destructuring assignment",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
      },
    ],
    keywords: ["arrays", "objects", "map", "filter", "find", "destructuring"],
    explanation: `An **array** is an ordered list of values, indexed from 0:

\`\`\`js
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // "apple"
console.log(fruits.length); // 3
\`\`\`

An **object** is a collection of named properties — think of it as a labeled record instead of a numbered list:

\`\`\`js
const book = { title: "Dune", year: 1965, pages: 412 };
console.log(book.title); // "Dune"
\`\`\`

Arrays come with powerful built-in methods that avoid writing manual loops for common transformations:

- **map** builds a new array by transforming every item: \`[1,2,3].map(n => n * 2)\` → \`[2,4,6]\`
- **filter** builds a new array keeping only items that pass a test: \`[1,2,3,4].filter(n => n % 2 === 0)\` → \`[2,4]\`
- **find** returns the first item that passes a test, or undefined if none do: \`[1,2,3].find(n => n > 1)\` → \`2\`

All three take a function as an argument and never modify the original array — they return a new value instead, which makes your code easier to reason about.

**Destructuring** is a shorthand for pulling values out of arrays or objects into their own variables:

\`\`\`js
const [first, second] = fruits;         // first = "apple", second = "banana"
const { title, year } = book;           // title = "Dune", year = 1965
\`\`\`

This is especially common when working with function parameters that are objects, e.g. \`function printBook({ title, year }) { ... }\`, since it avoids repeatedly writing \`book.title\`, \`book.year\`.`,
    example: {
      language: "javascript",
      description: "Using map and filter together, plus object property access.",
      code: `const prices = [10, 25, 5, 40];

const withTax = prices.map((p) => p * 1.08);
const affordable = prices.filter((p) => p < 30);

console.log(withTax);
console.log(affordable);

const product = { name: "Notebook", price: 5 };
console.log(product.name, product.price);`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Add a fourth price and adjust the affordability threshold.",
      code: `const prices = [10, 25, 5, 40];
const affordable = prices.filter((p) => p < 30);
console.log(affordable);`,
      editable: true,
    },
    guidedExercise: {
      id: "js-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write a function `doubleAll(numbers)` that returns a new array with every number doubled, using map.",
      starterCode: `function doubleAll(numbers) {
  // your code here
}`,
      solutionCode: `function doubleAll(numbers) {
  return numbers.map((n) => n * 2);
}`,
      harness: `
        try {
          const r = doubleAll([1,2,3]);
          window.__report('t1', Array.isArray(r) && r.length === 3 && r[0] === 2 && r[1] === 4 && r[2] === 6, 'doubleAll([1,2,3]) should be [2,4,6].');
        } catch (e) { window.__report('t1', false, e.message); }
        try {
          const r2 = doubleAll([]);
          window.__report('t2', Array.isArray(r2) && r2.length === 0, 'doubleAll([]) should be an empty array.');
        } catch (e) { window.__report('t2', false, e.message); }
      `,
      tests: [
        { id: "t1", description: "doubleAll([1,2,3]) returns [2,4,6]", hidden: false },
        { id: "t2", description: "doubleAll([]) returns []", hidden: true },
      ],
      hints: [
        "map builds a new array by transforming every item.",
        "The transform function for this task multiplies each number by 2.",
        "You don't need a manual loop — map handles the iteration.",
        `Shape: return numbers.map((n) => n * 2);`,
      ],
    },
    independentExercise: {
      id: "js-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function `findCheapest(products)` where each product is `{ name, price }`. Return the name of the product with the lowest price, using filter/find/reduce or any correct approach.",
      starterCode: `function findCheapest(products) {
  // your code here
}`,
      solutionCode: `function findCheapest(products) {
  let cheapest = products[0];
  for (const product of products) {
    if (product.price < cheapest.price) {
      cheapest = product;
    }
  }
  return cheapest.name;
}`,
      harness: `
        try {
          const r = findCheapest([{name:'Pen', price: 2}, {name:'Notebook', price: 5}, {name:'Eraser', price: 1}]);
          window.__report('t1', r === 'Eraser', 'The cheapest of Pen(2)/Notebook(5)/Eraser(1) should be "Eraser".');
        } catch (e) { window.__report('t1', false, e.message); }
        try {
          const r2 = findCheapest([{name:'Only', price: 9}]);
          window.__report('t2', r2 === 'Only', 'A single-item list should return that item.');
        } catch (e) { window.__report('t2', false, e.message); }
      `,
      tests: [
        { id: "t1", description: "Finds the cheapest of three products", hidden: false },
        { id: "t2", description: "Works with a single-item array", hidden: true },
      ],
      hints: [
        "You need to compare every product's price against the lowest one found so far.",
        "Start by assuming the first product is the cheapest, then check the rest.",
        "Return the name property of the winning product, not the whole object.",
        "You can solve this with a for...of loop tracking the current cheapest product.",
      ],
    },
    commonMistakes: [
      "Trying to access an object property that doesn't exist and being surprised by undefined instead of an error.",
      "Forgetting that map/filter return a brand-new array rather than modifying the original.",
      "Mixing up array index access (fruits[0]) with object property access (book.title).",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `[1,2,3,4].filter(n => n % 2 === 0)` return?",
        choices: ["[1,3]", "[2,4]", "4", "[true, false, true, false]"],
        correctIndex: 1,
        explanation:
          "filter keeps only the items for which the test function returns true — here, the even numbers.",
      },
      {
        id: "q2",
        prompt: "What is the key difference between map and filter?",
        choices: [
          "map transforms every item into a new value; filter keeps only items that pass a test",
          "They are exactly the same",
          "filter can only be used on objects",
          "map removes items from the array",
        ],
        correctIndex: 0,
        explanation:
          "map always returns an array of the same length with transformed values; filter returns a subset.",
      },
      {
        id: "q3",
        prompt: "What does `const { title } = book;` do?",
        choices: [
          "Creates a new object called title",
          "Deletes the title property from book",
          "Declares a variable title holding book.title's value",
          "Renames book to title",
        ],
        correctIndex: 2,
        explanation:
          "This is object destructuring: it pulls the title property out into its own variable.",
      },
    ],
    takeaway:
      "Arrays hold ordered lists, objects hold named fields, and map/filter/find replace most manual loops over them.",
    summary:
      "Arrays are ordered, index-based lists; objects are named-property records. map, filter, and find transform or search arrays without mutating them, and destructuring shortens pulling values out of either structure.",
    nextLessonSlug: "js-dom-selection",
  },
  {
    id: "js-dom-selection",
    slug: "js-dom-selection",
    title: "DOM Selection and Updates",
    description: "Find elements on a page with JavaScript and change what they show.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 5,
    difficulty: "beginner",
    estimatedMinutes: 24,
    prerequisites: ["js-arrays-objects"],
    objectives: [
      "Select elements with querySelector and querySelectorAll",
      "Read and update an element's text content and classes",
      "Create and insert new elements into the page",
    ],
    skills: ["javascript", "dom"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Document.querySelector()",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
      },
      {
        label: "MDN: Element.classList",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
      },
    ],
    keywords: ["dom", "queryselector", "classlist", "createElement", "textContent"],
    explanation: `As covered in the foundations track, the browser builds an in-memory tree of your page called the **DOM**. JavaScript can read and change that tree after the page loads — that's what makes a page interactive instead of static.

The most common way to find an element is **querySelector**, which takes a CSS selector (the same kind you write in a stylesheet) and returns the first match:

\`\`\`js
const heading = document.querySelector("h1");
const firstButton = document.querySelector(".card button");
\`\`\`

**querySelectorAll** returns every match, as a static list you can loop over with \`for...of\` or convert to an array.

Once you have an element, you can read or change it:

- **textContent** gets/sets the plain text inside an element
- **classList.add/remove/toggle** adds, removes, or flips a CSS class
- **style** lets you set individual inline CSS properties directly (used sparingly — a CSS class is usually cleaner)

\`\`\`js
heading.textContent = "Updated heading";
heading.classList.add("highlighted");
\`\`\`

You can also build brand-new elements and insert them:

\`\`\`js
const item = document.createElement("li");
item.textContent = "New item";
document.querySelector("ul").appendChild(item);
\`\`\`

This pattern — select or create, then modify, then insert — is the foundation of every dynamic web page, from a to-do list to a live dashboard.`,
    example: {
      language: "html",
      description: "Selecting a heading and a list, then updating and adding to them.",
      code: `<!doctype html>
<html>
  <body>
    <h1 id="title">Original title</h1>
    <ul id="list">
      <li>First item</li>
    </ul>
    <script>
      document.querySelector("#title").textContent = "Updated by JavaScript";

      const newItem = document.createElement("li");
      newItem.textContent = "Second item";
      document.querySelector("#list").appendChild(newItem);
    </script>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description: "Add a third list item using createElement and appendChild.",
      code: `<!doctype html>
<html>
  <body>
    <ul id="list">
      <li>First item</li>
      <li>Second item</li>
    </ul>
    <script>
      // Add a third <li> to #list below.
    </script>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "js-6-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Select the element with id 'message' and set its textContent to 'Loaded!'. Then add the CSS class 'ready' to it using classList.",
      starterCode: `<!doctype html>
<html>
  <body>
    <p id="message">Loading...</p>
    <script>
      // your code here
    </script>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <p id="message">Loading...</p>
    <script>
      const message = document.querySelector("#message");
      message.textContent = "Loaded!";
      message.classList.add("ready");
    </script>
  </body>
</html>`,
      harness: `
        const el = document.querySelector('#message');
        window.__report('t1', !!el && el.textContent === 'Loaded!', 'The #message element should say "Loaded!".');
        window.__report('t2', !!el && el.classList.contains('ready'), 'The #message element should have the class "ready".');
      `,
      tests: [
        { id: "t1", description: "#message text updated to 'Loaded!'", hidden: false },
        { id: "t2", description: "#message has the 'ready' class", hidden: false },
      ],
      hints: [
        "Use document.querySelector('#message') to find the element by its id.",
        "Set its .textContent property directly to change the visible text.",
        "classList.add('ready') adds a CSS class without removing any existing ones.",
        `Shape: const el = document.querySelector('#message'); el.textContent = 'Loaded!'; el.classList.add('ready');`,
      ],
    },
    independentExercise: {
      id: "js-6-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Given an empty <ul id='items'>, use JavaScript to add exactly three <li> elements to it with the text 'One', 'Two', and 'Three', in that order.",
      starterCode: `<!doctype html>
<html>
  <body>
    <ul id="items"></ul>
    <script>
      // your code here
    </script>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <ul id="items"></ul>
    <script>
      const list = document.querySelector("#items");
      ["One", "Two", "Three"].forEach((label) => {
        const li = document.createElement("li");
        li.textContent = label;
        list.appendChild(li);
      });
    </script>
  </body>
</html>`,
      harness: `
        const items = document.querySelectorAll('#items li');
        window.__report('t1', items.length === 3, '#items should contain exactly three <li> elements.');
        window.__report('t2', items.length === 3 && items[0].textContent === 'One' && items[1].textContent === 'Two' && items[2].textContent === 'Three', 'The three items should read One, Two, Three in order.');
      `,
      tests: [
        { id: "t1", description: "Exactly three <li> elements added", hidden: false },
        { id: "t2", description: "Items read One, Two, Three in order", hidden: true },
      ],
      hints: [
        "Select the <ul> once, then create three separate <li> elements.",
        "createElement('li') makes a new element that isn't part of the page until you insert it.",
        "appendChild adds an element as the last child of its parent, so calling it three times in order preserves One/Two/Three.",
        `Shape: const list = document.querySelector('#items'); const li = document.createElement('li'); li.textContent = 'One'; list.appendChild(li); (repeat for Two, Three)`,
      ],
    },
    commonMistakes: [
      "Running a script before the elements it selects exist in the page, resulting in null.",
      "Forgetting that querySelector returns only the first match, while querySelectorAll returns all of them.",
      "Using innerHTML with untrusted text, which can introduce injected markup — textContent is safer for plain text.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does document.querySelector('.card') return if no element has that class?",
        choices: ["An empty string", "undefined", "null", "It throws an error"],
        correctIndex: 2,
        explanation:
          "querySelector returns null when nothing matches, so always check before using the result.",
      },
      {
        id: "q2",
        prompt: "Which method adds a CSS class to an element without removing existing ones?",
        choices: [
          "element.class = 'x'",
          "element.classList.add('x')",
          "element.style = 'x'",
          "element.className.set('x')",
        ],
        correctIndex: 1,
        explanation:
          "classList.add appends a class while leaving any other classes on the element untouched.",
      },
      {
        id: "q3",
        prompt: "What is the correct order to insert a brand-new element into the page?",
        choices: [
          "Insert it, then create it, then set its content",
          "Create it, set its content, then insert it into a parent",
          "Set its content before it exists",
          "It inserts itself automatically once created",
        ],
        correctIndex: 1,
        explanation:
          "createElement makes a detached element; you configure it, then explicitly attach it with something like appendChild.",
      },
    ],
    takeaway:
      "querySelector finds elements, and textContent/classList/createElement let you change or grow the page from there.",
    summary:
      "querySelector/querySelectorAll locate elements using CSS selectors. textContent and classList update what an element shows and how it's styled, and createElement plus appendChild build and insert brand-new elements.",
    nextLessonSlug: "js-events-forms",
  },
  {
    id: "js-events-forms",
    slug: "js-events-forms",
    title: "Events and Forms",
    description: "Respond to clicks and form submissions, and read what a user typed.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 6,
    difficulty: "beginner",
    estimatedMinutes: 24,
    prerequisites: ["js-dom-selection"],
    objectives: [
      "Attach event listeners with addEventListener",
      "Read values from form inputs",
      "Prevent a form's default submission behavior when handling it in JavaScript",
    ],
    skills: ["javascript", "events", "forms"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: EventTarget.addEventListener()",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
      },
      {
        label: "MDN: Event.preventDefault()",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault",
      },
    ],
    keywords: ["events", "addEventListener", "forms", "preventDefault", "input value"],
    explanation: `An **event** is something that happens in the browser: a click, a key press, a form submission, a page finishing loading. You react to events with **addEventListener**, which takes an event name and a function to run when it fires:

\`\`\`js
const button = document.querySelector("#save");
button.addEventListener("click", () => {
  console.log("Button was clicked!");
});
\`\`\`

The function you pass is called an **event handler**. It automatically receives an event object as its argument, which carries details about what happened — including, for forms, a way to stop the browser's default behavior.

**Forms** fire a \`submit\` event when the user presses Enter in a field or clicks a submit button. By default, submitting a form reloads the page — almost never what you want in an interactive app. Call \`event.preventDefault()\` at the start of your handler to stop that:

\`\`\`js
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#name");
  console.log("You typed:", nameInput.value);
});
\`\`\`

Every text input, textarea, and select element exposes its current content through its **.value** property — that's how you read what a user has typed at the moment your handler runs. For a checkbox, you'd read \`.checked\` instead of \`.value\`.

A common beginner pattern is validating input before acting on it — e.g. checking that a text field isn't empty before adding it to a list — which combines everything from this lesson: an event listener, reading \`.value\`, and a conditional.`,
    example: {
      language: "html",
      description:
        "Handling a form submission, reading an input's value, and preventing the page reload.",
      code: `<!doctype html>
<html>
  <body>
    <form id="greet-form">
      <input id="name-input" type="text" />
      <button type="submit">Greet</button>
    </form>
    <p id="output"></p>
    <script>
      document.querySelector("#greet-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.querySelector("#name-input").value;
        document.querySelector("#output").textContent = "Hello, " + name + "!";
      });
    </script>
  </body>
</html>`,
      editable: false,
    },
    editableExample: {
      language: "html",
      description: "Change the greeting text or add a check for an empty name.",
      code: `<!doctype html>
<html>
  <body>
    <form id="greet-form">
      <input id="name-input" type="text" />
      <button type="submit">Greet</button>
    </form>
    <p id="output"></p>
    <script>
      document.querySelector("#greet-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.querySelector("#name-input").value;
        document.querySelector("#output").textContent = "Hello, " + name + "!";
      });
    </script>
  </body>
</html>`,
      editable: true,
    },
    guidedExercise: {
      id: "js-7-guided",
      kind: "guided",
      language: "html",
      prompt:
        "Add a click handler to the button with id 'increment' that increases the number shown in the element with id 'count' by 1 each time it's clicked.",
      starterCode: `<!doctype html>
<html>
  <body>
    <p id="count">0</p>
    <button id="increment">+1</button>
    <script>
      let count = 0;
      // your event listener here
    </script>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <p id="count">0</p>
    <button id="increment">+1</button>
    <script>
      let count = 0;
      document.querySelector("#increment").addEventListener("click", () => {
        count++;
        document.querySelector("#count").textContent = String(count);
      });
    </script>
  </body>
</html>`,
      harness: `
        const button = document.querySelector('#increment');
        button.click();
        button.click();
        button.click();
        window.__report('t1', document.querySelector('#count').textContent === '3', 'After three clicks, #count should show 3.');
      `,
      tests: [{ id: "t1", description: "Clicking the button three times shows 3", hidden: false }],
      hints: [
        "You need a click event listener on the #increment button.",
        "Keep a variable outside the listener so it remembers the count between clicks.",
        "Update both the variable and the #count element's textContent inside the handler.",
        `Shape: document.querySelector('#increment').addEventListener('click', () => { count++; document.querySelector('#count').textContent = String(count); });`,
      ],
    },
    independentExercise: {
      id: "js-7-independent",
      kind: "independent",
      language: "html",
      prompt:
        "Handle the form's submit event: prevent the default reload, read the #task-input value, and if it is not empty, append it as a new <li> to #task-list.",
      starterCode: `<!doctype html>
<html>
  <body>
    <form id="task-form">
      <input id="task-input" type="text" />
      <button type="submit">Add</button>
    </form>
    <ul id="task-list"></ul>
    <script>
      // your code here
    </script>
  </body>
</html>`,
      solutionCode: `<!doctype html>
<html>
  <body>
    <form id="task-form">
      <input id="task-input" type="text" />
      <button type="submit">Add</button>
    </form>
    <ul id="task-list"></ul>
    <script>
      document.querySelector("#task-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const input = document.querySelector("#task-input");
        const value = input.value.trim();
        if (value !== "") {
          const li = document.createElement("li");
          li.textContent = value;
          document.querySelector("#task-list").appendChild(li);
          input.value = "";
        }
      });
    </script>
  </body>
</html>`,
      harness: `
        const input = document.querySelector('#task-input');
        const form = document.querySelector('#task-form');
        input.value = 'Buy milk';
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        const items = document.querySelectorAll('#task-list li');
        window.__report('t1', items.length === 1 && items[0].textContent === 'Buy milk', 'Submitting "Buy milk" should add it as a list item.');
        input.value = '';
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        const itemsAfterEmpty = document.querySelectorAll('#task-list li');
        window.__report('t2', itemsAfterEmpty.length === 1, 'Submitting an empty value should not add a new item.');
      `,
      tests: [
        { id: "t1", description: "Adds a non-empty task as a list item", hidden: false },
        { id: "t2", description: "Ignores an empty submission", hidden: true },
      ],
      hints: [
        "Start with event.preventDefault() so the page doesn't reload on submit.",
        "Read the input's .value and check it isn't just whitespace (input.value.trim() !== '').",
        "Only create and append the <li> when the trimmed value is non-empty.",
        `Shape: form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value.trim(); if (v) { /* create li, append, clear input */ } });`,
      ],
    },
    commonMistakes: [
      "Forgetting event.preventDefault(), causing the page to reload and lose all JavaScript state.",
      "Reading .textContent instead of .value when trying to get what a user typed into an input.",
      "Attaching the event listener before the element exists in the DOM, so it silently does nothing.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does event.preventDefault() do when called inside a form's submit handler?",
        choices: [
          "Cancels the event listener permanently",
          "Stops the browser's default action, like reloading the page",
          "Deletes the form from the page",
          "Prevents the handler function from running",
        ],
        correctIndex: 1,
        explanation:
          "It suppresses the browser's built-in behavior for that event while still letting your handler run.",
      },
      {
        id: "q2",
        prompt: "How do you read the current text a user typed into an <input>?",
        choices: ["input.textContent", "input.value", "input.data", "input.text"],
        correctIndex: 1,
        explanation: "Form controls expose their current content via the .value property.",
      },
      {
        id: "q3",
        prompt: "What is the first argument to addEventListener?",
        choices: [
          "The function to run",
          "A string naming the event, like 'click' or 'submit'",
          "The element itself",
          "A CSS selector",
        ],
        correctIndex: 1,
        explanation: "addEventListener(eventName, handlerFunction) — the event name comes first.",
      },
    ],
    takeaway:
      "addEventListener plus preventDefault turns a static form into logic you fully control.",
    summary:
      "addEventListener attaches a handler function to react to events like click and submit. preventDefault stops a form's default page reload, and .value reads the current content of an input so your handler can act on it.",
    nextLessonSlug: "js-modules-async",
  },
  {
    id: "js-modules-async",
    slug: "js-modules-async",
    title: "Modules and Async Programming Fundamentals",
    description:
      "Organize code across files with import/export, and handle time-delayed work with Promises.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 7,
    difficulty: "beginner",
    estimatedMinutes: 26,
    prerequisites: ["js-functions"],
    objectives: [
      "Explain what import/export are for at a conceptual level",
      "Explain why asynchronous operations exist and how callbacks led to Promises",
      "Use async/await to write asynchronous code that reads top to bottom",
    ],
    skills: ["javascript", "modules", "async"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: JavaScript modules",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
      },
      {
        label: "MDN: Using promises",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
      },
    ],
    keywords: ["modules", "import", "export", "promises", "async", "await"],
    explanation: `As programs grow, you split code across multiple files instead of one giant script. JavaScript **modules** let one file share code with another using **export** (to make something available) and **import** (to pull it in elsewhere):

\`\`\`js
// math.js
export function add(a, b) { return a + b; }

// app.js
import { add } from "./math.js";
console.log(add(2, 3));
\`\`\`

This keeps related logic together, avoids naming collisions between files, and makes large codebases navigable. (This sandboxed lesson runs everything in one file, so you won't write real import/export here — but you'll use exactly this pattern once you work with real project files.)

Separately, some operations don't finish instantly — fetching data from a server, reading a large file, waiting on a timer. JavaScript handles these **asynchronously**: instead of freezing the whole program until the slow thing finishes, it keeps running and gets notified later.

The old way to handle this was **callbacks** (a function passed in to run "when done"), which becomes hard to read once you chain several async steps ("callback hell"). Modern JavaScript uses **Promises** instead — an object representing a value that will exist eventually, either successfully (\`resolved\`) or with an error (\`rejected\`):

\`\`\`js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

wait(100).then(() => console.log("100ms passed"));
\`\`\`

**async/await** is syntax sugar over Promises that lets asynchronous code read like ordinary top-to-bottom code:

\`\`\`js
async function run() {
  console.log("start");
  await wait(100);
  console.log("100ms later");
}
\`\`\`

Any function marked \`async\` automatically returns a Promise, and \`await\` pauses that function (without freezing the rest of the page) until the awaited Promise settles. You'll use this constantly once you start fetching real data in the next lesson.`,
    example: {
      language: "javascript",
      description: "A Promise-returning helper used with async/await.",
      code: `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("start");
  await wait(50);
  console.log("finished waiting");
}

run();`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Add a second console.log after another await wait(...) call.",
      code: `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("step 1");
  await wait(50);
  console.log("step 2");
}

run();`,
      editable: true,
    },
    guidedExercise: {
      id: "js-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write an async function `delayedDouble(n)` that waits 10ms (using the provided wait helper) and then returns n * 2.",
      starterCode: `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayedDouble(n) {
  // your code here
}`,
      solutionCode: `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayedDouble(n) {
  await wait(10);
  return n * 2;
}`,
      harness: `
        delayedDouble(4).then((r) => {
          window.__report('t1', r === 8, 'delayedDouble(4) should resolve to 8.');
        }).catch((e) => window.__report('t1', false, e.message));
      `,
      tests: [{ id: "t1", description: "delayedDouble(4) resolves to 8", hidden: false }],
      hints: [
        "Mark the function async so you can use await inside it.",
        "await the provided wait(10) helper before computing the result.",
        "After awaiting, return n * 2 like any normal function return.",
        `Shape: async function delayedDouble(n) { await wait(10); return n * 2; }`,
      ],
    },
    independentExercise: {
      id: "js-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write an async function `fetchThenAdd(a, b)` that awaits the provided mockFetchNumber() helper (which resolves to 100) and returns a + b + that resolved number.",
      starterCode: `function mockFetchNumber() {
  return new Promise((resolve) => setTimeout(() => resolve(100), 10));
}

async function fetchThenAdd(a, b) {
  // your code here
}`,
      solutionCode: `function mockFetchNumber() {
  return new Promise((resolve) => setTimeout(() => resolve(100), 10));
}

async function fetchThenAdd(a, b) {
  const extra = await mockFetchNumber();
  return a + b + extra;
}`,
      harness: `
        fetchThenAdd(1, 2).then((r) => {
          window.__report('t1', r === 103, 'fetchThenAdd(1, 2) should resolve to 103 (1 + 2 + 100).');
        }).catch((e) => window.__report('t1', false, e.message));
        fetchThenAdd(0, 0).then((r) => {
          window.__report('t2', r === 100, 'fetchThenAdd(0, 0) should resolve to 100.');
        }).catch((e) => window.__report('t2', false, e.message));
      `,
      tests: [
        { id: "t1", description: "fetchThenAdd(1, 2) resolves to 103", hidden: false },
        { id: "t2", description: "fetchThenAdd(0, 0) resolves to 100", hidden: true },
      ],
      hints: [
        "await mockFetchNumber() to get its resolved value before using it.",
        "Store the awaited value in a variable so you can add it to a and b.",
        "The final return combines all three numbers with +.",
        `Shape: async function fetchThenAdd(a, b) { const extra = await mockFetchNumber(); return a + b + extra; }`,
      ],
    },
    commonMistakes: [
      "Forgetting the async keyword on a function that uses await inside it.",
      "Not awaiting (or .then-ing) a Promise, then being confused why you have a Promise object instead of the actual value.",
      "Assuming await pauses the entire page — it only pauses the async function it's written in.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does an async function always return?",
        choices: ["A plain value", "A Promise", "undefined, always", "A callback"],
        correctIndex: 1,
        explanation: "Every async function implicitly wraps its return value in a Promise.",
      },
      {
        id: "q2",
        prompt: "What problem did Promises mainly solve compared to plain callbacks?",
        choices: [
          "They made code run faster",
          "They made deeply nested, hard-to-read chains of async callbacks easier to write and reason about",
          "They removed the need for functions",
          "They made all code synchronous",
        ],
        correctIndex: 1,
        explanation:
          "Promises (and async/await on top of them) replaced 'callback hell' with flatter, more readable async code.",
      },
      {
        id: "q3",
        prompt: "What does export let another file do?",
        choices: [
          "Delete a function",
          "Import and use something defined in the exporting file",
          "Run a function automatically",
          "Convert a function to be asynchronous",
        ],
        correctIndex: 1,
        explanation:
          "export marks a value/function as available for another module to import and use.",
      },
    ],
    takeaway:
      "Modules organize code across files; async/await lets time-delayed work read like ordinary sequential code.",
    summary:
      "import/export split code across files. Asynchronous operations don't block the rest of the program; Promises represent their eventual result, and async/await lets you write that logic in a readable, top-to-bottom style.",
    nextLessonSlug: "js-fetch-async",
  },
  {
    id: "js-fetch-async",
    slug: "js-fetch-async",
    title: "Fetch and Error Handling",
    description: "Request data with the Fetch API and handle both success and failure paths.",
    trackSlug: "javascript",
    courseSlug: "javascript-fundamentals",
    order: 8,
    difficulty: "beginner",
    estimatedMinutes: 26,
    prerequisites: ["js-modules-async"],
    objectives: [
      "Explain what the fetch function does and what it returns",
      "Handle a fetch response's JSON body with await",
      "Use try/catch to handle a failed request without crashing the program",
    ],
    skills: ["javascript", "fetch", "error-handling"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "MDN: Using the Fetch API",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
      },
      {
        label: "MDN: try...catch",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
      },
    ],
    keywords: ["fetch", "json", "try catch", "error handling", "async"],
    explanation: `**fetch** is the browser's built-in function for making HTTP requests — the same request/response mechanics from the foundations track, but triggered by your own code instead of typing a URL. It returns a Promise that resolves to a **Response** object once the server replies:

\`\`\`js
const response = await fetch("/api/books");
const data = await response.json(); // parses the JSON body
\`\`\`

Note the two awaits: the first waits for the response to arrive, the second waits for its body to be read and parsed as JSON (reading a body is itself asynchronous).

Because network requests can fail in many ways — no connection, a slow server, a bad URL, a server-side error — production code always needs a plan for failure. **try/catch** is how JavaScript handles that:

\`\`\`js
async function loadBooks() {
  try {
    const response = await fetch("/api/books");
    if (!response.ok) {
      throw new Error("Server responded with status " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load books:", error.message);
    return [];
  }
}
\`\`\`

Two details matter here. First, \`fetch\` only rejects (triggers \`catch\`) for network-level failures — a 404 or 500 response is still a "successful" fetch from JavaScript's point of view, which is why you must check \`response.ok\` (true for 2xx statuses) yourself and throw explicitly if it's false. Second, an **unhandled rejected Promise** (an async error nobody catches) is a real production bug — it can silently break a feature or spam error logs, so always wrap awaited calls that can fail in try/catch, and give the user a clear fallback state instead of a frozen or blank UI.

This sandbox has no real network access, so exercises here use a small mock fetch-like function that behaves the same way (returning a Promise, sometimes rejecting) so you can practice the exact same handling patterns you'll use with a real API.`,
    example: {
      language: "javascript",
      description: "A mock fetch-like function handled with async/await and try/catch.",
      code: `function mockFetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: "Ada" });
      } else {
        reject(new Error("User not found"));
      }
    }, 10);
  });
}

async function loadUser(id) {
  try {
    const user = await mockFetchUser(id);
    console.log("Loaded:", user.name);
  } catch (error) {
    console.error("Could not load user:", error.message);
  }
}

loadUser(1);
loadUser(99);`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Try calling loadUser with a different id and see the error path run.",
      code: `function mockFetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: "Ada" });
      } else {
        reject(new Error("User not found"));
      }
    }, 10);
  });
}

async function loadUser(id) {
  try {
    const user = await mockFetchUser(id);
    console.log("Loaded:", user.name);
  } catch (error) {
    console.error("Could not load user:", error.message);
  }
}

loadUser(1);`,
      editable: true,
    },
    guidedExercise: {
      id: "js-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using the provided mockFetchNumber(shouldFail) helper, write an async function `safeDouble(shouldFail)` that returns the doubled resolved number on success, or the string 'error' if the call rejects.",
      starterCode: `function mockFetchNumber(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("failed"));
      else resolve(21);
    }, 10);
  });
}

async function safeDouble(shouldFail) {
  // your code here
}`,
      solutionCode: `function mockFetchNumber(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("failed"));
      else resolve(21);
    }, 10);
  });
}

async function safeDouble(shouldFail) {
  try {
    const n = await mockFetchNumber(shouldFail);
    return n * 2;
  } catch (error) {
    return "error";
  }
}`,
      harness: `
        safeDouble(false).then((r) => {
          window.__report('t1', r === 42, 'safeDouble(false) should resolve to 42.');
        }).catch((e) => window.__report('t1', false, e.message));
        safeDouble(true).then((r) => {
          window.__report('t2', r === 'error', 'safeDouble(true) should resolve to the string "error", not reject.');
        }).catch((e) => window.__report('t2', false, 'safeDouble should never itself reject: ' + e.message));
      `,
      tests: [
        { id: "t1", description: "Success path doubles the resolved number", hidden: false },
        {
          id: "t2",
          description: "Failure path returns 'error' instead of rejecting",
          hidden: false,
        },
      ],
      hints: [
        "Wrap the await call in a try/catch block.",
        "On success, multiply the awaited value by 2 and return it.",
        "In the catch block, return the string 'error' instead of letting the rejection propagate.",
        `Shape: try { const n = await mockFetchNumber(shouldFail); return n * 2; } catch (e) { return "error"; }`,
      ],
    },
    independentExercise: {
      id: "js-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Using the provided mockFetchBook(id) helper (rejects for id !== 1), write an async function `loadBookTitle(id)` that returns the book's title on success, or the string 'Book not found' on failure — without ever throwing an uncaught error.",
      starterCode: `function mockFetchBook(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) resolve({ id: 1, title: "Sapiens" });
      else reject(new Error("404"));
    }, 10);
  });
}

async function loadBookTitle(id) {
  // your code here
}`,
      solutionCode: `function mockFetchBook(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) resolve({ id: 1, title: "Sapiens" });
      else reject(new Error("404"));
    }, 10);
  });
}

async function loadBookTitle(id) {
  try {
    const book = await mockFetchBook(id);
    return book.title;
  } catch (error) {
    return "Book not found";
  }
}`,
      harness: `
        loadBookTitle(1).then((r) => {
          window.__report('t1', r === 'Sapiens', 'loadBookTitle(1) should resolve to "Sapiens".');
        }).catch((e) => window.__report('t1', false, e.message));
        loadBookTitle(2).then((r) => {
          window.__report('t2', r === 'Book not found', 'loadBookTitle(2) should resolve to "Book not found", not reject.');
        }).catch((e) => window.__report('t2', false, 'loadBookTitle must not itself reject: ' + e.message));
      `,
      tests: [
        { id: "t1", description: "Existing book resolves with its title", hidden: false },
        {
          id: "t2",
          description: "Missing book resolves with a friendly fallback string",
          hidden: true,
        },
      ],
      hints: [
        "Await mockFetchBook(id) inside a try block.",
        "On success, return book.title from the resolved object.",
        "In the catch block, return the exact string 'Book not found' rather than re-throwing.",
        `Shape: try { const book = await mockFetchBook(id); return book.title; } catch (e) { return "Book not found"; }`,
      ],
    },
    commonMistakes: [
      "Not checking response.ok, so a 404 or 500 response is treated as if it succeeded.",
      "Leaving an awaited call outside of any try/catch, letting a real network failure crash the whole feature.",
      "Showing a blank or frozen UI on error instead of a clear, honest message to the user.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Does fetch's returned Promise reject for a 404 response?",
        choices: [
          "Yes, always",
          "No — you must check response.ok yourself and throw if needed",
          "Only in Chrome",
          "Only if the server sends a special header",
        ],
        correctIndex: 1,
        explanation:
          "fetch only rejects on network-level failures; HTTP error statuses are still a 'successful' fetch that you must check.",
      },
      {
        id: "q2",
        prompt: "What is the risk of an unhandled rejected Promise in production?",
        choices: [
          "Nothing, JavaScript handles it automatically",
          "It can silently break a feature or spam error logs with no user-facing explanation",
          "It automatically retries the request",
          "It only matters in Node.js, not browsers",
        ],
        correctIndex: 1,
        explanation:
          "An uncaught rejection means your code has no defined behavior for that failure — it should always be handled deliberately.",
      },
      {
        id: "q3",
        prompt:
          "Where should you put code that might throw or reject, so a failure doesn't crash your program?",
        choices: [
          "Inside a for loop",
          "Inside a try block, with handling in the matching catch",
          "Inside a console.log",
          "It doesn't matter",
        ],
        correctIndex: 1,
        explanation:
          "try/catch is exactly the mechanism for containing and responding to a failure at the point it can occur.",
      },
    ],
    takeaway:
      "fetch gets you data over the network; try/catch and response.ok make sure failure has a real plan, not a crash.",
    summary:
      "fetch returns a Promise resolving to a Response; awaiting response.json() parses its body. Because fetch only rejects on network failure, you must check response.ok yourself, and try/catch keeps both network errors and bad statuses from crashing your program.",
  },
];
