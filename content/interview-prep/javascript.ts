import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * JavaScript Fundamentals interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (variables/types,
 * functions, arrays/objects, DOM/events, async/fetch) plus JS staples that
 * regularly come up in real interviews (closures, hoisting, equality,
 * event loop). Answers explain the underlying concept, not just recite a
 * definition.
 */
export const javascriptInterviewQuestions: InterviewQuestionInput[] = [
  // --- Fundamentals & Syntax (10) ---
  {
    id: "js-interview-fundamentals-01",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between `var`, `let`, and `const`?",
    answer:
      "`var` is function-scoped and hoisted with an initial value of `undefined`; `let` and `const` are block-scoped and hoisted into a 'temporal dead zone' where accessing them before their declaration throws. `const` additionally prevents reassigning the binding (though the value it points to, like an object's properties, can still be mutated).",
    category: "Fundamentals & Syntax",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-fundamentals-02",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between `==` and `===`?",
    answer:
      '`==` performs type coercion before comparing (so `"5" == 5` is `true`); `===` compares both value and type without coercion (so `"5" === 5` is `false`). Using `===` by default avoids coercion surprises.',
    category: "Fundamentals & Syntax",
    difficulty: "beginner",
    codeExample: 'console.log("5" == 5);   // true\nconsole.log("5" === 5);  // false',
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-fundamentals-03",
    courseSlug: "javascript-fundamentals",
    question: "What are JavaScript's primitive types?",
    answer:
      "`string`, `number`, `boolean`, `undefined`, `null`, `bigint`, and `symbol`. Everything else (objects, arrays, functions) is a non-primitive `object` type.",
    category: "Fundamentals & Syntax",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-fundamentals-04",
    courseSlug: "javascript-fundamentals",
    question: "What is 'truthy' and 'falsy' in JavaScript?",
    answer:
      'Values that coerce to `false` in a boolean context (`0`, `""`, `null`, `undefined`, `NaN`, `false`) are falsy; everything else, including `"0"` and `[]`, is truthy.',
    category: "Fundamentals & Syntax",
    difficulty: "beginner",
    commonMistake: 'Assuming an empty array `[]` or the string `"0"` is falsy -- both are truthy.',
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-fundamentals-05",
    courseSlug: "javascript-fundamentals",
    question: "What does 'hoisting' mean in JavaScript?",
    answer:
      "Variable and function declarations are conceptually moved to the top of their scope during compilation. `function` declarations are hoisted with their full body (callable before their line); `var` is hoisted as `undefined`; `let`/`const` are hoisted but unusable until their declaration line (the temporal dead zone).",
    category: "Fundamentals & Syntax",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-fundamentals-06",
    courseSlug: "javascript-fundamentals",
    question: "What is `NaN`, and why does `NaN === NaN` evaluate to `false`?",
    answer:
      "`NaN` ('Not a Number') represents an invalid numeric result. By the IEEE 754 spec it is defined as not equal to itself, so checking for it requires `Number.isNaN(x)` rather than `x === NaN`.",
    category: "Fundamentals & Syntax",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-fundamentals-07",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between `null` and `undefined`?",
    answer:
      "`undefined` means a variable has been declared but has no assigned value yet; `null` is an explicit assignment meaning 'intentionally no value.'",
    category: "Fundamentals & Syntax",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-fundamentals-08",
    courseSlug: "javascript-fundamentals",
    question:
      "What is template literal syntax, and what does it offer beyond string concatenation?",
    answer:
      "Backtick-delimited strings (`` `Hello ${name}` ``) that support embedded expression interpolation and multi-line strings without explicit `+` concatenation or `\\n` escapes.",
    category: "Fundamentals & Syntax",
    difficulty: "beginner",
    codeExample: 'const name = "Asha";\nconsole.log(`Hello, ${name}!`);',
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-fundamentals-09",
    courseSlug: "javascript-fundamentals",
    question: "What is destructuring, and why is it useful?",
    answer:
      "A syntax for unpacking values from arrays or properties from objects into distinct variables in one statement, reducing repetitive `obj.prop` access -- e.g. `const { name, age } = user;`.",
    category: "Fundamentals & Syntax",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-fundamentals-10",
    courseSlug: "javascript-fundamentals",
    question: "What is 'strict mode' and what does it change?",
    answer:
      'Enabled via `"use strict";`, it disallows several error-prone patterns (like assigning to an undeclared variable) by throwing errors instead of silently failing, and disables some legacy syntax.',
    category: "Fundamentals & Syntax",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Functions & Scope (10) ---
  {
    id: "js-interview-functions-01",
    courseSlug: "javascript-fundamentals",
    question: "What is a closure?",
    answer:
      "A function that retains access to variables from its enclosing scope even after that outer function has returned. Closures are how JavaScript implements private state and factory functions.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    codeExample:
      "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = makeCounter();\ncounter(); // 1\ncounter(); // 2",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-functions-02",
    courseSlug: "javascript-fundamentals",
    question:
      "What is the difference between an arrow function and a regular function declaration?",
    answer:
      "Arrow functions don't have their own `this` (they inherit it from the enclosing scope), can't be used as constructors, and don't have an `arguments` object -- regular functions have all three.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-functions-03",
    courseSlug: "javascript-fundamentals",
    question:
      "How does `this` behave differently in a regular function versus an arrow function used as an object method?",
    answer:
      "A regular function's `this` is determined by how it's called (the object before the dot); an arrow function has no own `this`, so as an object method it inherits `this` from the surrounding lexical scope, often not the object at all.",
    category: "Functions & Scope",
    difficulty: "advanced",
    commonMistake:
      "Defining an object method as an arrow function and expecting `this` to refer to the object.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-functions-04",
    courseSlug: "javascript-fundamentals",
    question: "What are default parameters, and when are they evaluated?",
    answer:
      'A way to specify a fallback value for a parameter when the caller omits it or passes `undefined` -- `function greet(name = "friend") {}`. The default expression is evaluated fresh on each call where it\'s needed, not once at definition time.',
    category: "Functions & Scope",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-functions-05",
    courseSlug: "javascript-fundamentals",
    question: "What is a higher-order function?",
    answer:
      "A function that takes another function as an argument, returns a function, or both -- e.g. `Array.prototype.map`, which takes a callback and returns a new transformed array.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-functions-06",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between function scope and block scope?",
    answer:
      "A function-scoped variable (`var`) is visible throughout the entire function it's declared in, regardless of nested blocks; a block-scoped variable (`let`/`const`) is only visible within the nearest enclosing `{}` block.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-functions-07",
    courseSlug: "javascript-fundamentals",
    question: "What does the rest parameter syntax (`...args`) do in a function signature?",
    answer:
      "It collects any remaining arguments passed to the function into a real array, letting you write functions that accept a variable number of arguments -- e.g. `function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }`.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-functions-08",
    courseSlug: "javascript-fundamentals",
    question:
      "What is an Immediately Invoked Function Expression (IIFE), and why was it historically used?",
    answer:
      "A function defined and called immediately, `(function () { ... })();`, historically used to create a private scope and avoid polluting the global namespace before `let`/`const`/ES modules existed.",
    category: "Functions & Scope",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-functions-09",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between a pure function and an impure function?",
    answer:
      "A pure function always returns the same output for the same input and has no observable side effects (no mutating outside state, no I/O); an impure function can depend on or modify state outside its own scope.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-functions-10",
    courseSlug: "javascript-fundamentals",
    question:
      "Why does a loop using `var` in a `setTimeout` callback commonly produce a bug that `let` fixes?",
    answer:
      "`var` is function-scoped, so all callbacks share the same single variable, which has finished looping by the time any callback runs. `let` creates a fresh binding per loop iteration, so each callback captures its own value.",
    category: "Functions & Scope",
    difficulty: "advanced",
    codeExample:
      "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n} // logs 3, 3, 3\n\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 0);\n} // logs 0, 1, 2",
    commonMistake:
      "Using `var` in a loop that schedules async callbacks, then being surprised every callback sees the final loop value.",
    lastReviewed: "2026-08-07",
  },

  // --- Arrays & Objects (10) ---
  {
    id: "js-interview-arrays-01",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between `map` and `forEach`?",
    answer:
      "`map` returns a new array built from the callback's return values; `forEach` returns `undefined` and is used purely for side effects, not for building a new array.",
    category: "Arrays & Objects",
    difficulty: "beginner",
    commonMistake:
      "Using `forEach` and expecting it to return a transformed array like `map` does.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-arrays-02",
    courseSlug: "javascript-fundamentals",
    question:
      "What does `Array.prototype.reduce` do, and when would you use it over `map`/`filter`?",
    answer:
      "`reduce` folds an array down into a single accumulated value (a number, object, or even a new array) by applying a callback across every element -- use it when the result isn't simply a same-length transformed array or a filtered subset.",
    category: "Arrays & Objects",
    difficulty: "intermediate",
    codeExample: "const total = [10, 20, 30].reduce((sum, n) => sum + n, 0); // 60",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-arrays-03",
    courseSlug: "javascript-fundamentals",
    question: "What is the spread operator, and how is it used to copy an array or object?",
    answer:
      "`...` expands an iterable's elements (or an object's own enumerable properties) in place -- `const copy = [...original];` or `const copy = { ...original };` create shallow copies without mutating the source.",
    category: "Arrays & Objects",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-arrays-04",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between a shallow copy and a deep copy?",
    answer:
      "A shallow copy duplicates the top-level structure but nested objects/arrays still reference the same underlying objects; a deep copy recursively duplicates every nested level so no references are shared with the original.",
    category: "Arrays & Objects",
    difficulty: "advanced",
    commonMistake:
      "Using `{ ...obj }` to copy an object with nested objects, then mutating a nested property and being surprised the original changed too.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-arrays-05",
    courseSlug: "javascript-fundamentals",
    question:
      "Why should you avoid mutating an array or object you received as a function parameter?",
    answer:
      "Objects and arrays are passed by reference, so mutating a parameter changes the original value the caller holds too, creating hard-to-trace bugs -- returning a new copy instead keeps the function's effects predictable and local.",
    category: "Arrays & Objects",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-arrays-06",
    courseSlug: "javascript-fundamentals",
    question:
      "What is the difference between `Object.keys`, `Object.values`, and `Object.entries`?",
    answer:
      "`Object.keys` returns an array of the object's own enumerable property names; `Object.values` returns their corresponding values; `Object.entries` returns `[key, value]` pairs, useful for iterating with `for...of` or converting to a `Map`.",
    category: "Arrays & Objects",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-arrays-07",
    courseSlug: "javascript-fundamentals",
    question:
      "What does `Array.prototype.find` return if no element matches, and how does that differ from `filter`?",
    answer:
      "`find` returns `undefined` if nothing matches (or the first matching element otherwise); `filter` always returns an array, which is empty if nothing matches.",
    category: "Arrays & Objects",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-arrays-08",
    courseSlug: "javascript-fundamentals",
    question: "How do you check whether a value is an array in JavaScript?",
    answer:
      '`Array.isArray(value)` -- using `typeof value === "object"` is not sufficient since arrays and plain objects both report `typeof "object"`.',
    category: "Arrays & Objects",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-arrays-09",
    courseSlug: "javascript-fundamentals",
    question: "What is optional chaining (`?.`) and what problem does it solve?",
    answer:
      "`obj?.prop` accesses a property only if `obj` is not `null`/`undefined`, otherwise short-circuits to `undefined` -- it replaces verbose manual chains of `&&` guards when reading nested, possibly-missing properties.",
    category: "Arrays & Objects",
    difficulty: "intermediate",
    codeExample: "const city = user?.address?.city; // no error even if address is undefined",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-arrays-10",
    courseSlug: "javascript-fundamentals",
    question: "What is the nullish coalescing operator (`??`) and how does it differ from `||`?",
    answer:
      '`a ?? b` returns `b` only if `a` is `null` or `undefined`; `a || b` returns `b` for any falsy `a` (including `0` or `""`), which can incorrectly override intentional falsy values.',
    category: "Arrays & Objects",
    difficulty: "advanced",
    commonMistake:
      "Using `count || 10` as a default, which incorrectly falls back to 10 even when `count` is legitimately `0`.",
    lastReviewed: "2026-08-07",
  },

  // --- DOM & Events (10) ---
  {
    id: "js-interview-dom-01",
    courseSlug: "javascript-fundamentals",
    question:
      "What is the difference between `document.querySelector` and `document.getElementById`?",
    answer:
      "`getElementById` only matches by exact `id` and is slightly faster; `querySelector` accepts any CSS selector (class, attribute, descendant combinators) and returns the first match.",
    category: "DOM & Events",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-dom-02",
    courseSlug: "javascript-fundamentals",
    question: "What is event bubbling?",
    answer:
      "When an event fires on an element, it also propagates upward and fires on that element's ancestors, in order, unless `stopPropagation()` is called.",
    category: "DOM & Events",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-dom-03",
    courseSlug: "javascript-fundamentals",
    question: "What is event delegation, and why is it useful?",
    answer:
      "Attaching a single event listener to a common parent element instead of separate listeners on many children, relying on event bubbling and checking `event.target` -- efficient for large or dynamically-added lists of elements.",
    category: "DOM & Events",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-dom-04",
    courseSlug: "javascript-fundamentals",
    question: "What does `event.preventDefault()` do?",
    answer:
      "It stops the browser's default action for that event, e.g. preventing a form submission from reloading the page, or preventing a clicked link from navigating.",
    category: "DOM & Events",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-dom-05",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between `textContent` and `innerHTML`?",
    answer:
      "`textContent` sets/reads plain text and is always safe from injecting markup; `innerHTML` parses its string as HTML, which can execute injected scripts/markup if the string comes from untrusted user input.",
    category: "DOM & Events",
    difficulty: "intermediate",
    commonMistake:
      "Setting `innerHTML` directly from unsanitized user input, opening an XSS vulnerability.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-dom-06",
    courseSlug: "javascript-fundamentals",
    question:
      "Why is it generally recommended to place `<script>` tags at the end of `<body>`, or use `defer`?",
    answer:
      "The DOM hasn't finished parsing until the whole HTML document loads, so a script running earlier can't reliably find elements defined later in the markup; deferring the script (or placing it at the end) ensures the DOM is ready first.",
    category: "DOM & Events",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-dom-07",
    courseSlug: "javascript-fundamentals",
    question:
      "What is the difference between the `DOMContentLoaded` and `load` events on `window`?",
    answer:
      "`DOMContentLoaded` fires once the HTML is fully parsed, without waiting for stylesheets/images/subframes; `load` fires only after every resource on the page has finished loading.",
    category: "DOM & Events",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-dom-08",
    courseSlug: "javascript-fundamentals",
    question: "How do you read the value a user typed into a form's text input?",
    answer:
      "Select the input element and read its `.value` property, typically inside a `change` or `input` event listener, or by reading it at submit time within a `submit` event handler.",
    category: "DOM & Events",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-dom-09",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between the `input` and `change` events on a text field?",
    answer:
      "`input` fires on every keystroke/value change immediately; `change` fires only once the field loses focus after its value has changed, making it less noisy for validation that shouldn't run on every keystroke.",
    category: "DOM & Events",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-dom-10",
    courseSlug: "javascript-fundamentals",
    question:
      "Why can directly manipulating the DOM in a tight loop (e.g. appending 1,000 elements one at a time) be slow?",
    answer:
      "Each DOM mutation can trigger the browser to recalculate layout/style ('reflow'), so many small mutations in a loop can each pay that cost -- batching changes (e.g. building a `DocumentFragment` first, then appending once) avoids repeated reflows.",
    category: "DOM & Events",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Async & Promises (10) ---
  {
    id: "js-interview-async-01",
    courseSlug: "javascript-fundamentals",
    question: "What is a Promise?",
    answer:
      "An object representing the eventual result (or failure) of an asynchronous operation, with three states: pending, fulfilled, or rejected.",
    category: "Async & Promises",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-async-02",
    courseSlug: "javascript-fundamentals",
    question: "What is the difference between `async`/`await` and raw Promise `.then()` chains?",
    answer:
      "`async`/`await` is syntax that lets asynchronous code read like synchronous code (with `try`/`catch` for errors); under the hood it's built entirely on Promises, so both approaches are interoperable, not competing mechanisms.",
    category: "Async & Promises",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-async-03",
    courseSlug: "javascript-fundamentals",
    question: "How do you handle an error from an `await`ed call?",
    answer:
      "Wrap the `await` in a `try`/`catch` block -- a rejected Promise thrown into `await` behaves like a synchronous `throw`, catchable the same way.",
    category: "Async & Promises",
    difficulty: "intermediate",
    codeExample:
      'async function loadUser(id) {\n  try {\n    const res = await fetch(`/users/${id}`);\n    return await res.json();\n  } catch (err) {\n    console.error("Failed to load user", err);\n    throw err;\n  }\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-async-04",
    courseSlug: "javascript-fundamentals",
    question:
      "What does `Promise.all` do, and how does it handle a single rejected promise among several?",
    answer:
      "It takes an array of promises and resolves with an array of all their results once every one has fulfilled -- but if any single promise rejects, `Promise.all` immediately rejects with that error, without waiting for the others.",
    category: "Async & Promises",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-async-05",
    courseSlug: "javascript-fundamentals",
    question: "What is `Promise.allSettled`, and when would you prefer it over `Promise.all`?",
    answer:
      "It waits for every promise to settle (fulfill or reject) and returns a result for each, rather than short-circuiting on the first rejection -- useful when you want to run independent requests and see which succeeded even if some failed.",
    category: "Async & Promises",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-async-06",
    courseSlug: "javascript-fundamentals",
    question: "What is the event loop, at a conceptual level?",
    answer:
      "JavaScript runs on a single thread; the event loop continuously checks whether the call stack is empty, and if so, pulls the next queued callback (from the microtask queue, then the macrotask/callback queue) to run -- this is how async operations like `fetch` or `setTimeout` don't block the main thread.",
    category: "Async & Promises",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-async-07",
    courseSlug: "javascript-fundamentals",
    question:
      "Why does a resolved Promise's `.then()` callback run before a `setTimeout(fn, 0)` callback?",
    answer:
      "Promise callbacks are 'microtasks,' which the event loop drains completely before moving to the next 'macrotask' (like a `setTimeout` callback), regardless of the requested delay.",
    category: "Async & Promises",
    difficulty: "advanced",
    codeExample:
      'console.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");\n// logs: 1, 4, 3, 2',
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-async-08",
    courseSlug: "javascript-fundamentals",
    question:
      "What does `fetch()` return, and what's a common mistake when checking whether a request 'succeeded'?",
    answer:
      "`fetch()` returns a Promise that resolves once headers arrive -- it does NOT reject for HTTP error statuses like 404 or 500, only for network failures. A common mistake is skipping the `response.ok` check and treating any resolved fetch as success.",
    category: "Async & Promises",
    difficulty: "advanced",
    commonMistake:
      "Not checking `response.ok` and assuming a resolved `fetch()` call means the server returned a successful status.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-async-09",
    courseSlug: "javascript-fundamentals",
    question: "What is 'callback hell,' and how do Promises help address it?",
    answer:
      "Deeply nested callbacks (each starting a new async step inside the previous one's callback) that become hard to read and reason about; Promises let those steps be chained flatly with `.then()` (or written sequentially with `async`/`await`) instead of nesting.",
    category: "Async & Promises",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "js-interview-async-10",
    courseSlug: "javascript-fundamentals",
    question:
      "What is an ES module, and how does `import`/`export` differ from older script-tag-based code sharing?",
    answer:
      "ES modules let a file explicitly declare what it exports and what it imports from other files, with each module's top-level scope kept private by default -- unlike plain `<script>` tags, which all share one global scope unless manually namespaced.",
    category: "Async & Promises",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
