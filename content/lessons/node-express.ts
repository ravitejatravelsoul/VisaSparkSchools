import type { LessonInput } from "@/lib/content/types";

/**
 * Node.js and Express Backend Development.
 *
 * This platform has no Node runtime, no filesystem, no ports, and no
 * server-side code execution in the browser sandbox -- and Phase 5A.2
 * deliberately did not add any of those (see docs/SECURITY.md and
 * docs/ARCHITECTURE.md). Every lesson's guidedExercise/independentExercise
 * is therefore a genuine, browser-executable PLAIN JavaScript/TypeScript
 * exercise that models the underlying algorithm or data shape behind a
 * Node/Express concept (a route-matching function, a middleware pipeline
 * runner, a config validator, a log-redaction function) without depending on
 * any Node or Express API. Three lessons additionally carry a
 * `guidedLocalLab` for the real server work, which only makes sense running
 * on the learner's own machine with a real Node install -- never simulated
 * or faked in this browser sandbox.
 */
export const nodeExpressLessons: LessonInput[] = [
  {
    id: "node-runtime-model",
    slug: "node-runtime-model",
    title: "The Node.js Runtime Model: Event Loop and Non-Blocking I/O",
    description:
      "Why Node can handle thousands of concurrent connections on one thread — and the one mistake (blocking that thread) that defeats the entire model.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: [],
    objectives: [
      "Explain why Node's single-threaded event loop can still handle many concurrent connections",
      "Distinguish I/O-bound waiting from CPU-bound blocking work",
      "Predict the relative execution order of synchronous code, microtasks, and macrotasks",
    ],
    skills: ["nodejs", "event-loop"],
    tech: [{ name: "Node.js", version: "20.x or 22.x LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Node.js docs: The Node.js Event Loop",
        url: "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick",
      },
    ],
    keywords: ["nodejs", "event loop", "non-blocking io", "single-threaded"],
    explanation: `Node.js runs your JavaScript on a single thread — yet a Node server routinely handles thousands of simultaneous connections without spawning a thread per connection the way some older server models did. The resolution to that apparent contradiction is the **event loop combined with non-blocking I/O**: when Node needs to do something slow — read a file, query a database, wait for a network response — it hands that work off to the underlying system (which manages it outside your JavaScript thread) and immediately moves on to other work, registering a callback to run once the slow operation finishes. Your single thread is never sitting idle waiting; it's processing whatever else is ready while I/O happens in the background.

This model has one sharp edge, and understanding it is the single most important practical consequence of "single-threaded": **I/O-bound waiting is cheap; CPU-bound computation is not.** Waiting on a database query costs nothing on your thread — it's handled elsewhere, and your thread serves other requests meanwhile. But a genuinely expensive synchronous computation (parsing a huge file synchronously, a slow nested loop, an unoptimized regular expression) runs *on* that one thread, and **while it runs, nothing else can — every other request, every other connection, is completely stalled** until that computation finishes. This is why a single slow, CPU-heavy synchronous operation in a Node server is a much more serious problem than the "just a bit slow" it would be in a language that gives each request its own thread — it doesn't just slow down that one request, it freezes every concurrent request the server is handling.

The event loop also processes work in a specific, predictable order worth knowing precisely: **all synchronous code in the current call runs first**, then **microtasks** (Promise \`.then()\` callbacks, \`queueMicrotask\`) drain completely before anything else runs, and only then does the loop move on to **macrotasks** (\`setTimeout\`, I/O callbacks). A \`setTimeout(fn, 0)\` does not run "immediately" — it runs only after all synchronous code and all pending microtasks have already completed, however many of those there are.`,
    example: {
      language: "javascript",
      description:
        "The real execution order of synchronous code, a microtask, and a macrotask -- the exact ordering a Node server relies on.",
      code: `console.log("1: synchronous");

setTimeout(() => console.log("4: macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3: microtask (Promise.then)"));

console.log("2: synchronous");

// Output order: 1, 2, 3, 4 -- sync code first, then ALL microtasks, then macrotasks`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a second Promise.then() microtask and predict where it lands in the output order before running.",
      code: `console.log("1: synchronous");
setTimeout(() => console.log("macrotask"), 0);
Promise.resolve().then(() => console.log("microtask A"));
console.log("2: synchronous");`,
      editable: true,
    },
    guidedExercise: {
      id: "node-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write predictOrder() that returns an array of the labels in the ACTUAL order they would log, given: sync code logs 'sync', a setTimeout(fn, 0) logs 'timeout', and a Promise.resolve().then() logs 'microtask'. Do not use setTimeout/Promise yourself -- just return the array in the correct order based on the rule from this lesson.",
      starterCode: `function predictOrder() {
  // TODO: return ['sync', 'microtask', 'timeout'] in the CORRECT actual order
}
`,
      solutionCode: `function predictOrder() {
  return ["sync", "microtask", "timeout"];
}`,
      harness: `
        try {
          const result = predictOrder();
          window.__report('t1', JSON.stringify(result) === JSON.stringify(['sync', 'microtask', 'timeout']), 'Synchronous code runs first, then all microtasks drain, then macrotasks like setTimeout run.');
        } catch (e) { window.__report('t1', false, 'predictOrder is not defined: ' + e.message); }
      `,
      tests: [{ id: "t1", description: "returns the correct execution order", hidden: false }],
      hints: [
        "Synchronous code always runs to completion first, before anything asynchronous.",
        "Microtasks (Promise callbacks) always drain completely before the next macrotask (setTimeout) runs.",
      ],
    },
    independentExercise: {
      id: "node-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write classifyWork(description) that returns 'io-bound' for descriptions containing 'database', 'file', 'network', or 'query' (case-insensitive), and 'cpu-bound' for anything else (like 'sorting', 'parsing', 'computing') -- modeling the practical distinction from this lesson.",
      starterCode: `function classifyWork(description) {
  // TODO
}
`,
      solutionCode: `function classifyWork(description) {
  const lower = description.toLowerCase();
  const ioKeywords = ["database", "file", "network", "query"];
  return ioKeywords.some((k) => lower.includes(k)) ? "io-bound" : "cpu-bound";
}`,
      harness: `
        try { window.__report('t1', classifyWork("Query the database for users") === 'io-bound', 'A database query is I/O-bound work.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', classifyWork("Sorting a large array") === 'cpu-bound', 'Sorting is CPU-bound computation.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', classifyWork("Reading a file from disk") === 'io-bound', 'A file read is I/O-bound work.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "classifies a database query as I/O-bound", hidden: false },
        { id: "t2", description: "classifies sorting as CPU-bound", hidden: false },
        { id: "t3", description: "classifies a file read as I/O-bound", hidden: false },
      ],
      hints: [
        "Check the description for keywords associated with I/O operations.",
        "Anything not matching an I/O keyword is treated as CPU-bound in this simplified model.",
      ],
    },
    commonMistakes: [
      "Assuming Node's single-threaded model means it can only handle one request at a time — it handles many concurrent I/O-bound requests efficiently, as long as none of them block the thread with heavy computation.",
      "Running an expensive synchronous computation directly in a request handler, unknowingly freezing every other concurrent request on the same server.",
      "Assuming `setTimeout(fn, 0)` runs immediately, when it actually waits for all synchronous code and all pending microtasks to finish first.",
    ],
    quiz: [
      {
        id: "node-1-q1",
        prompt: "How can a single-threaded Node server handle thousands of concurrent connections?",
        choices: [
          "It secretly spawns a thread per connection",
          "Slow I/O operations are handed off to the system, letting the thread serve other work while waiting instead of blocking",
          "It processes requests one at a time with no concurrency",
          "Node is not actually single-threaded",
        ],
        correctIndex: 1,
        explanation:
          "Non-blocking I/O means the JavaScript thread is never stuck waiting on a slow operation — it's freed to handle other work while the system manages the wait.",
      },
      {
        id: "node-1-q2",
        prompt:
          "Why is a CPU-heavy synchronous computation more dangerous in Node than an I/O wait of the same duration?",
        choices: [
          "It isn't more dangerous — they're equivalent",
          "It runs on the one shared thread, blocking every other concurrent request until it finishes, unlike I/O which doesn't occupy that thread",
          "CPU work always takes longer than I/O",
          "This only matters for very old Node versions",
        ],
        correctIndex: 1,
        explanation:
          "I/O waiting doesn't occupy the JavaScript thread; CPU-bound synchronous work does, freezing every other concurrent request for its entire duration.",
      },
      {
        id: "node-1-q3",
        prompt:
          "What is the correct execution order for synchronous code, a microtask, and a macrotask (setTimeout) started together?",
        choices: [
          "Macrotask, microtask, synchronous",
          "Synchronous code, then all pending microtasks, then macrotasks",
          "They always run in the order they appear, with no distinction",
          "Microtask, then synchronous, then macrotask",
        ],
        correctIndex: 1,
        explanation:
          "This is a strict, predictable order: synchronous code completes first, then every pending microtask drains, and only then do macrotasks like setTimeout run.",
      },
    ],
    takeaway:
      "Node's single thread stays responsive because I/O waiting is handed off elsewhere — but CPU-bound synchronous work runs on that same thread and blocks everything else while it does, which is the model's one sharp edge.",
    summary:
      "This lesson covered why non-blocking I/O lets a single thread serve many concurrent connections, the real danger of CPU-bound blocking work, and the precise execution order of synchronous code, microtasks, and macrotasks.",
    nextLessonSlug: "node-modules-npm",
  },
  {
    id: "node-modules-npm",
    slug: "node-modules-npm",
    title: "CommonJS vs ES Modules, npm, and Dependency Management",
    description:
      "Node's two module systems, why they don't mix carelessly, and what npm actually manages beyond just downloading packages.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 17,
    prerequisites: ["node-runtime-model"],
    objectives: [
      "Distinguish CommonJS (require/module.exports) from ES modules (import/export) in Node",
      "Explain what package.json and package-lock.json each guarantee",
      "Identify the difference between a dependency and a devDependency",
    ],
    skills: ["nodejs", "npm", "modules"],
    tech: [
      { name: "Node.js", version: "20.x or 22.x LTS" },
      { name: "npm", version: "10.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Node.js docs: Modules — CommonJS modules",
        url: "https://nodejs.org/api/modules.html",
      },
      {
        label: "Node.js docs: Modules — ECMAScript modules",
        url: "https://nodejs.org/api/esm.html",
      },
    ],
    keywords: ["nodejs", "commonjs", "esm", "npm", "package.json"],
    explanation: `Node supports two module systems, and mixing them carelessly is a common source of confusing errors for anyone coming from a browser-only JavaScript background. **CommonJS** (\`require("./thing")\`, \`module.exports = ...\`) is Node's original, synchronous module system — a \`require\` call resolves and loads a module immediately, blocking until it's ready, which works because it's reading from the local filesystem, not the network. **ES modules** (\`import thing from "./thing.js"\`, \`export default ...\`) are the same import/export syntax used in browser JavaScript and modern bundlers, and Node supports them too — but a project has to declare which system it's using, either via \`"type": "module"\` in \`package.json\` (opts the whole project into ES modules) or by using the \`.mjs\`/\`.cjs\` file extensions explicitly. A file written with \`import\` syntax in a project still configured for CommonJS throws a syntax error — this is a configuration mismatch, not a bug in the import statement itself.

\`package.json\` is a project's manifest: its name, version, scripts, and — critically — its **dependencies**, declared with a version *range* (like \`^4.18.0\`, meaning "4.18.0 or a later compatible minor/patch version"). \`package-lock.json\` records the **exact, specific version** of every dependency (and every dependency of every dependency) that was actually installed, so a fresh \`npm install\` on a different machine, or a different day, reproduces the identical dependency tree — not just something "compatible enough." Committing \`package-lock.json\` to version control is what makes a team's (or a CI server's) installs reproducible; relying on version ranges alone means "works on my machine" can genuinely mean something different from "works on yours," installed on a different day.

**Dependencies versus devDependencies** is a distinction about *when* code is needed: a **dependency** (\`express\`, a database driver) is required for the application to actually run in production. A **devDependency** (a test runner, a linter, a local dev-only tool) is needed only while developing — \`npm install --production\` (or an equivalent in a deployment pipeline) skips devDependencies entirely, since a production server never runs your test suite or linter as part of serving requests.`,
    example: {
      language: "javascript",
      description:
        "The two module syntaxes side by side -- functionally equivalent, but requiring different project configuration to use correctly.",
      code: `// CommonJS (the historical Node default)
// const express = require("express");
// module.exports = { start };

// ES modules (requires "type": "module" in package.json, or a .mjs file)
// import express from "express";
// export { start };

function describeModuleSystem(usesTypeModule) {
  return usesTypeModule ? "ES modules (import/export)" : "CommonJS (require/module.exports)";
}

console.log(describeModuleSystem(true));
console.log(describeModuleSystem(false));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Change the argument and re-run to see the module system description flip.",
      code: `function describeModuleSystem(usesTypeModule) {
  return usesTypeModule ? "ES modules (import/export)" : "CommonJS (require/module.exports)";
}

console.log(describeModuleSystem(true));`,
      editable: true,
    },
    guidedExercise: {
      id: "node-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write satisfiesRange(version, rangePrefix) that returns true if `version` (a string like '4.18.2') starts with the same major version number as `rangePrefix` (a string like '^4.18.0' -- extract the leading number after the caret). This is a simplified model of what npm's caret-range matching checks.",
      starterCode: `function satisfiesRange(version, rangePrefix) {
  // TODO: extract the major version number from both and compare
}
`,
      solutionCode: `function satisfiesRange(version, rangePrefix) {
  const versionMajor = version.split(".")[0];
  const rangeMajor = rangePrefix.replace("^", "").split(".")[0];
  return versionMajor === rangeMajor;
}`,
      harness: `
        try { window.__report('t1', satisfiesRange('4.18.2', '^4.18.0') === true, 'Same major version (4) should satisfy the range.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', satisfiesRange('5.0.0', '^4.18.0') === false, 'A different major version (5 vs 4) should not satisfy a caret range.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly matches a compatible version", hidden: false },
        { id: "t2", description: "correctly rejects an incompatible major version", hidden: false },
      ],
      hints: [
        "Split each version string on '.' and compare just the first (major) segment.",
        "Remember to strip the leading caret from rangePrefix before comparing.",
      ],
    },
    independentExercise: {
      id: "node-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write categorizeDependency(name, isNeededInProduction) that returns 'dependency' if isNeededInProduction is true, 'devDependency' otherwise. Then write listProductionDependencies(packages) where packages is an array of { name, isNeededInProduction }, returning just the names of the ones needed in production.",
      starterCode: `function categorizeDependency(name, isNeededInProduction) {
  // TODO
}
function listProductionDependencies(packages) {
  // TODO
}
`,
      solutionCode: `function categorizeDependency(name, isNeededInProduction) {
  return isNeededInProduction ? "dependency" : "devDependency";
}
function listProductionDependencies(packages) {
  return packages.filter((p) => p.isNeededInProduction).map((p) => p.name);
}`,
      harness: `
        try { window.__report('t1', categorizeDependency('express', true) === 'dependency', 'express is needed at runtime -- a real dependency.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', categorizeDependency('vitest', false) === 'devDependency', 'A test runner is only needed during development.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try {
          const result = listProductionDependencies([
            { name: 'express', isNeededInProduction: true },
            { name: 'vitest', isNeededInProduction: false },
            { name: 'dotenv', isNeededInProduction: true },
          ]);
          window.__report('t3', JSON.stringify(result) === JSON.stringify(['express', 'dotenv']), 'Should list only the production dependencies, in order.');
        } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly categorizes a production dependency", hidden: false },
        { id: "t2", description: "correctly categorizes a devDependency", hidden: false },
        {
          id: "t3",
          description: "correctly filters to only production dependencies",
          hidden: false,
        },
      ],
      hints: [
        "The categorization is a direct one-to-one mapping from the boolean flag.",
        "Filter first, then map to just the names.",
      ],
    },
    commonMistakes: [
      'Using `import` syntax in a project not configured for ES modules (no "type": "module" and no .mjs extension), producing a confusing syntax error.',
      "Not committing package-lock.json, so different machines or CI runs can install subtly different dependency versions within the same declared range.",
      "Installing a tool only needed for development (a linter, a test runner) as a regular dependency instead of a devDependency, bloating what a production install pulls in.",
    ],
    quiz: [
      {
        id: "node-2-q1",
        prompt:
          "Why does an `import` statement fail in a Node project that isn't configured for ES modules?",
        choices: [
          "import is invalid JavaScript syntax",
          "Node defaults to CommonJS unless the project explicitly opts into ES modules via package.json or a file extension",
          "This never happens — import always works",
          "Only browsers support import statements",
        ],
        correctIndex: 1,
        explanation:
          "Node supports both module systems but needs to know which one a given file is using — using import syntax without the right configuration is a mismatch, not a language error.",
      },
      {
        id: "node-2-q2",
        prompt:
          "What does package-lock.json guarantee that package.json's version ranges alone do not?",
        choices: [
          "Nothing — they serve the same purpose",
          "The exact, specific version of every dependency actually installed, making installs reproducible across machines and time",
          "That the code has no bugs",
          "Faster npm installs only",
        ],
        correctIndex: 1,
        explanation:
          "Version ranges in package.json allow flexibility; package-lock.json pins the exact resolved tree so every install reproduces identically.",
      },
      {
        id: "node-2-q3",
        prompt: "What distinguishes a devDependency from a regular dependency?",
        choices: [
          "devDependencies are optional and can be deleted at any time",
          "A devDependency is only needed during development (testing, linting), not for the application to actually run in production",
          "There is no real difference",
          "devDependencies are always larger packages",
        ],
        correctIndex: 1,
        explanation:
          "The distinction is about when the code is needed — production installs can skip devDependencies entirely since they're irrelevant to serving real requests.",
      },
    ],
    takeaway:
      "Node supports both CommonJS and ES modules, but a project must be configured for one consistently; package-lock.json (not just package.json's version ranges) is what makes installs truly reproducible across machines.",
    summary:
      "This lesson covered the two Node module systems and why mismatched configuration causes errors, plus what package.json and package-lock.json each guarantee and the practical difference between dependencies and devDependencies.",
    nextLessonSlug: "node-async-programming",
  },
  {
    id: "node-async-programming",
    slug: "node-async-programming",
    title: "Asynchronous Programming: Callbacks, Promises, and Async/Await",
    description:
      "Three syntaxes for the same underlying idea — and the one mistake (an unawaited or unhandled promise) that silently swallows errors in a real server.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 2,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["node-modules-npm"],
    objectives: [
      "Convert a callback-style function into a Promise-returning one",
      "Explain what async/await actually is underneath — sugar over Promises, not a separate mechanism",
      "Identify an unhandled promise rejection and how to prevent it",
    ],
    skills: ["nodejs", "promises", "async-await"],
    tech: [{ name: "Node.js", version: "20.x or 22.x LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Using Promises",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
      },
      {
        label: "Node.js docs: util.promisify",
        url: "https://nodejs.org/api/util.html#utilpromisifyoriginal",
      },
    ],
    keywords: ["nodejs", "promises", "async await", "callbacks", "error handling"],
    explanation: `Node's original async style was **callbacks**: a function takes a function as its last argument, and calls it once the async work finishes, conventionally as \`callback(error, result)\` — error first, by convention, so it can never be silently ignored by accident the way a thrown exception in async code once could be. This works, but nesting several callback-dependent steps produces the infamous "callback hell": deeply nested, hard-to-read, hard-to-error-handle pyramids of code.

**Promises** wrap that same "eventually finishes, successfully or with an error" idea in an object with a cleaner API: \`.then()\` for success, \`.catch()\` for failure, and — crucially — they **chain flatly** instead of nesting, since each \`.then()\` returns a new promise. **\`async\`/\`await\` is not a third, separate mechanism** — it's syntax sugar over Promises, letting asynchronous code *read* like synchronous code (no \`.then()\` chains) while still being genuinely non-blocking underneath. \`await somePromise\` pauses that \`async\` function (not the whole thread — everything else keeps running) until the promise settles, then resumes with its value, or throws if it rejected.

That "or throws if it rejected" is the single most important operational fact for a real server: **an \`await\`ed promise that rejects becomes a genuine thrown exception, catchable with an ordinary \`try\`/\`catch\`.** A promise that's created but never awaited, chained, or explicitly handled — and later rejects — becomes an **unhandled promise rejection**, which in a real Node process can crash the entire server (depending on configuration) or, worse, silently vanish, leaving a request hanging forever with no response and no error logged anywhere. In an Express route handler specifically, this is exactly why every \`async\` route needs its errors properly caught and forwarded — a topic the error-handling lesson covers directly.`,
    example: {
      language: "javascript",
      description:
        "The same asynchronous operation in three styles: callback, Promise, and async/await -- functionally equivalent, syntactically progressive.",
      code: `function getUserCallback(id, callback) {
  setTimeout(() => callback(null, { id, name: "Ada" }), 50);
}

function getUserPromise(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "Ada" }), 50);
  });
}

async function getUserAsync(id) {
  const user = await getUserPromise(id);
  return user;
}

getUserCallback(1, (err, user) => console.log("callback style:", user));
getUserPromise(1).then((user) => console.log("promise style:", user));
getUserAsync(1).then((user) => console.log("async/await style:", user));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Make getUserPromise reject instead of resolve, then observe what happens to each style's error handling (or lack of it).",
      code: `function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id, name: "Ada" }), 50);
  });
}

async function getUserAsync(id) {
  const user = await getUserPromise(id);
  return user;
}

getUserAsync(1).then((user) => console.log("got:", user));`,
      editable: true,
    },
    guidedExercise: {
      id: "node-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write promisify(callbackStyleFn) that converts a Node-style callback function (last argument is callback(error, result)) into a function returning a Promise. It should take the same arguments MINUS the callback, and return a new Promise that resolves with result or rejects with error.",
      starterCode: `function promisify(callbackStyleFn) {
  // TODO: return a new function that returns a Promise
}

function readFileCallback(path, callback) {
  if (path === "missing.txt") callback(new Error("File not found"));
  else callback(null, "file contents for " + path);
}
`,
      solutionCode: `function promisify(callbackStyleFn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackStyleFn(...args, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}

function readFileCallback(path, callback) {
  if (path === "missing.txt") callback(new Error("File not found"));
  else callback(null, "file contents for " + path);
}`,
      harness: `
        (async () => {
          try {
            const readFilePromise = promisify(readFileCallback);
            const result = await readFilePromise("notes.txt");
            window.__report('t1', result === 'file contents for notes.txt', 'The promisified function should resolve with the callback\\'s result.');
          } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
          try {
            const readFilePromise = promisify(readFileCallback);
            await readFilePromise("missing.txt");
            window.__report('t2', false, 'Should have rejected for a missing file.');
          } catch (e) {
            window.__report('t2', e.message === 'File not found', 'The promisified function should reject with the callback\\'s error.');
          }
        })();
      `,
      tests: [
        { id: "t1", description: "resolves correctly for a successful callback", hidden: false },
        { id: "t2", description: "rejects correctly for a callback error", hidden: false },
      ],
      hints: [
        "Return a new function that wraps the original in a `new Promise((resolve, reject) => ...)`.",
        "Call the original function with all the given arguments plus a new callback that resolves or rejects based on the error argument.",
      ],
    },
    independentExercise: {
      id: "node-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write safeAsyncCall(asyncFn) that wraps an async function so it NEVER throws or rejects unhandled -- instead it returns a Promise that resolves to { ok: true, value } on success or { ok: false, error: message } on failure, modeling how a real route handler should defensively wrap async work.",
      starterCode: `async function safeAsyncCall(asyncFn) {
  // TODO
}
`,
      solutionCode: `async function safeAsyncCall(asyncFn) {
  try {
    const value = await asyncFn();
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}`,
      harness: `
        (async () => {
          try {
            const result = await safeAsyncCall(async () => 42);
            window.__report('t1', result.ok === true && result.value === 42, 'A successful async function should produce { ok: true, value }.');
          } catch (e) { window.__report('t1', false, 'safeAsyncCall itself threw, which defeats its purpose: ' + e.message); }
          try {
            const result = await safeAsyncCall(async () => { throw new Error("boom"); });
            window.__report('t2', result.ok === false && result.error === 'boom', 'A failing async function should produce { ok: false, error } instead of throwing.');
          } catch (e) { window.__report('t2', false, 'safeAsyncCall itself threw, which defeats its purpose: ' + e.message); }
        })();
      `,
      tests: [
        { id: "t1", description: "wraps a successful call correctly", hidden: false },
        {
          id: "t2",
          description: "wraps a failing call correctly, without itself throwing",
          hidden: false,
        },
      ],
      hints: [
        "Use try/catch around the await, converting a caught error into a normal return value instead of letting it propagate.",
        "The whole point is that safeAsyncCall itself must never throw or produce an unhandled rejection.",
      ],
    },
    commonMistakes: [
      "Creating a Promise (calling an async function, for instance) without awaiting, chaining, or otherwise handling it, risking an unhandled rejection if it fails.",
      "Nesting several callback-dependent async steps instead of converting to Promises or async/await, producing hard-to-read, hard-to-error-handle code.",
      "Forgetting that `await` only pauses the current async function, not the entire thread or process — other work keeps running concurrently.",
    ],
    quiz: [
      {
        id: "node-3-q1",
        prompt: "What is async/await, mechanically?",
        choices: [
          "A completely separate concurrency mechanism from Promises",
          "Syntax sugar over Promises, letting asynchronous code read sequentially while remaining genuinely non-blocking",
          "A way to make asynchronous code synchronous",
          "A Node-specific feature not related to JavaScript Promises",
        ],
        correctIndex: 1,
        explanation:
          "async/await is built entirely on top of Promises — `await` unwraps a promise's eventual value (or throws its rejection) without blocking the thread.",
      },
      {
        id: "node-3-q2",
        prompt:
          "What happens to a Promise that rejects but is never awaited, chained with .catch(), or otherwise handled?",
        choices: [
          "Nothing — it is automatically ignored safely",
          "It becomes an unhandled promise rejection, which can crash the process or silently leave a request hanging with no logged error",
          "It automatically retries",
          "JavaScript prevents this from ever happening",
        ],
        correctIndex: 1,
        explanation:
          "An unhandled rejection is a real operational risk in Node — it's not silently and safely ignored, and can crash the server or leave failures completely invisible.",
      },
      {
        id: "node-3-q3",
        prompt:
          "Why do callback-style Node APIs conventionally put the error as the FIRST argument (`callback(error, result)`)?",
        choices: [
          "It's an arbitrary stylistic choice with no real reason",
          "So the error can never be silently skipped by accident — a caller has to at least look at the first argument before reaching the result",
          "JavaScript requires errors to be the first argument",
          "It makes the code run faster",
        ],
        correctIndex: 1,
        explanation:
          "The error-first convention makes it structurally awkward to ignore an error, since you'd have to explicitly skip past it to reach the result argument.",
      },
    ],
    takeaway:
      "Callbacks, Promises, and async/await are three syntaxes for the same underlying asynchronous idea — and an unhandled promise rejection is a real operational hazard in a server, not a harmless edge case.",
    summary:
      "This lesson covered converting between callback and Promise styles, what async/await actually does underneath, and the real risk of unhandled promise rejections in a running Node process.",
    nextLessonSlug: "express-app-structure",
  },
  {
    id: "express-app-structure",
    slug: "express-app-structure",
    title: "Express Application Structure and Routing",
    description:
      "How Express matches an incoming request to the right handler, and setting up a real, modularly-routed Express server on your own machine.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 28,
    prerequisites: ["node-async-programming"],
    objectives: [
      "Explain how Express matches an incoming request's method and path to a registered route",
      "Organize routes into modular, feature-based files rather than one large file",
      "Set up and run a real local Express server with modular routing",
    ],
    skills: ["nodejs", "express", "routing"],
    tech: [
      { name: "Node.js", version: "20.x or 22.x LTS" },
      { name: "Express", version: "4.x or 5.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Express docs: Routing", url: "https://expressjs.com/en/guide/routing.html" },
      { label: "Express docs: Router", url: "https://expressjs.com/en/4x/api.html#router" },
    ],
    keywords: ["express", "routing", "nodejs", "rest api"],
    explanation: `Express matches an incoming request to a handler by checking its registered routes, in the order they were registered, for the first one whose **method and path pattern both match**. \`app.get("/courses/:id", handler)\` matches a GET request whose path looks like \`/courses/anything\`, capturing \`anything\` as \`req.params.id\`. Route matching is not "smartest match wins" — it's "first registered match wins," which is exactly why route *order* matters: a more specific route (\`/courses/featured\`) registered *after* a more general one with a parameter (\`/courses/:id\`) will never actually be reached, because \`/courses/:id\` matches \`/courses/featured\` first, treating "featured" as an id.

A real application's routes should not all live in one growing file. Express's \`Router\` lets you group related routes into their own module — a \`courses.routes.js\` file exporting a Router with all course-related endpoints, mounted onto the main app with \`app.use("/courses", coursesRouter)\`. This is the same "organize by feature" principle from earlier in this curriculum, applied to a backend: a project with users, courses, and enrollments as separate concerns should have separate route modules for each, not one file where all three are tangled together.

This lesson's guided local lab is where you set up a genuinely running Express server for the first time — nothing about routing, request matching, or server startup can be simulated honestly in this browser sandbox; it needs a real Node process listening on a real local port.`,
    example: {
      language: "javascript",
      description:
        "A simplified route-matching function -- the same core algorithm (method + path pattern matching, first-match-wins, order-dependent) that Express itself implements.",
      code: `function matchRoute(routes, method, path) {
  for (const route of routes) {
    if (route.method !== method) continue;
    const pattern = route.path.replace(/:[^/]+/g, "([^/]+)");
    const match = path.match(new RegExp("^" + pattern + "$"));
    if (match) return { handler: route.handler, params: match.slice(1) };
  }
  return null;
}

const routes = [
  { method: "GET", path: "/courses/featured", handler: "getFeatured" },
  { method: "GET", path: "/courses/:id", handler: "getById" },
];

console.log(matchRoute(routes, "GET", "/courses/featured")); // matches getFeatured -- registered first
console.log(matchRoute(routes, "GET", "/courses/42"));       // matches getById, params: ["42"]`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Swap the order of the two routes in the array and re-run -- notice /courses/featured no longer reaches its intended handler.",
      code: `function matchRoute(routes, method, path) {
  for (const route of routes) {
    if (route.method !== method) continue;
    const pattern = route.path.replace(/:[^/]+/g, "([^/]+)");
    const match = path.match(new RegExp("^" + pattern + "$"));
    if (match) return { handler: route.handler, params: match.slice(1) };
  }
  return null;
}

const routes = [
  { method: "GET", path: "/courses/:id", handler: "getById" },
  { method: "GET", path: "/courses/featured", handler: "getFeatured" },
];

console.log(matchRoute(routes, "GET", "/courses/featured"));`,
      editable: true,
    },
    guidedExercise: {
      id: "node-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using matchRoute already defined, register routes in the CORRECT order so that both '/users/me' (a specific route) and '/users/:id' (a parameterized route) both work correctly, then confirm by matching '/users/me' and '/users/42'.",
      starterCode: `function matchRoute(routes, method, path) {
  for (const route of routes) {
    if (route.method !== method) continue;
    const pattern = route.path.replace(/:[^/]+/g, "([^/]+)");
    const match = path.match(new RegExp("^" + pattern + "$"));
    if (match) return { handler: route.handler, params: match.slice(1) };
  }
  return null;
}

// TODO: order these two routes correctly
const routes = [
  { method: "GET", path: "/users/:id", handler: "getUserById" },
  { method: "GET", path: "/users/me", handler: "getCurrentUser" },
];

let meResult = matchRoute(routes, "GET", "/users/me");
let idResult = matchRoute(routes, "GET", "/users/42");
`,
      solutionCode: `function matchRoute(routes, method, path) {
  for (const route of routes) {
    if (route.method !== method) continue;
    const pattern = route.path.replace(/:[^/]+/g, "([^/]+)");
    const match = path.match(new RegExp("^" + pattern + "$"));
    if (match) return { handler: route.handler, params: match.slice(1) };
  }
  return null;
}

const routes = [
  { method: "GET", path: "/users/me", handler: "getCurrentUser" },
  { method: "GET", path: "/users/:id", handler: "getUserById" },
];

let meResult = matchRoute(routes, "GET", "/users/me");
let idResult = matchRoute(routes, "GET", "/users/42");`,
      harness: `
        try { window.__report('t1', meResult.handler === 'getCurrentUser', '/users/me should reach getCurrentUser, not be captured by the :id parameter route.'); } catch (e) { window.__report('t1', false, 'meResult is not defined: ' + e.message); }
        try { window.__report('t2', idResult.handler === 'getUserById', '/users/42 should reach getUserById.'); } catch (e) { window.__report('t2', false, 'idResult is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "the specific route wins for /users/me", hidden: false },
        {
          id: "t2",
          description: "the parameterized route still works for a real id",
          hidden: false,
        },
      ],
      hints: [
        "The more specific route ('/users/me') must be registered BEFORE the more general parameterized one ('/users/:id').",
        "First-match-wins means order determines which route actually handles a given request.",
      ],
    },
    independentExercise: {
      id: "node-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write groupRoutesByFeature(routes) where routes is an array of { path, handler }. Group them by the first path segment (e.g. '/courses/featured' and '/courses/:id' both belong to 'courses'), returning an object mapping each feature name to its array of routes.",
      starterCode: `function groupRoutesByFeature(routes) {
  // TODO
}
`,
      solutionCode: `function groupRoutesByFeature(routes) {
  const groups = {};
  for (const route of routes) {
    const feature = route.path.split("/")[1];
    if (!groups[feature]) groups[feature] = [];
    groups[feature].push(route);
  }
  return groups;
}`,
      harness: `
        try {
          const routes = [
            { path: '/courses/featured', handler: 'a' },
            { path: '/courses/:id', handler: 'b' },
            { path: '/users/:id', handler: 'c' },
          ];
          const result = groupRoutesByFeature(routes);
          window.__report('t1', Array.isArray(result.courses) && result.courses.length === 2, 'Both course routes should be grouped under "courses".');
          window.__report('t2', Array.isArray(result.users) && result.users.length === 1, 'The user route should be grouped under "users".');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly groups multiple routes under one feature",
          hidden: false,
        },
        {
          id: "t2",
          description: "correctly groups a single route under its own feature",
          hidden: false,
        },
      ],
      hints: [
        "Split each path on '/' — the second element (index 1) is the first real segment.",
        "This models exactly how you'd decide which routes belong in courses.routes.js versus users.routes.js.",
      ],
    },
    guidedLocalLab: {
      id: "express-setup-lab",
      title: "Set Up a Real Express Server with Modular Routes",
      scenario:
        "Create a real Express server on your own machine for a learning-progress API, with courses and enrollments organized into separate route modules, mounted onto the main app.",
      requiredTools: [
        { name: "Node.js", version: "20.x or 22.x LTS" },
        { name: "npm", version: "10.x (bundled with Node.js)" },
      ],
      setupSteps: [
        "Create a new folder `learning-api` and run `npm init -y` inside it.",
        "Run `npm install express`.",
        'Add `"type": "module"` to the generated package.json so `import`/`export` syntax works.',
        "Create the files below in the structure shown, then run `node src/server.js`.",
      ],
      projectStructure:
        "learning-api/\n  src/\n    server.js\n    routes/\n      courses.routes.js\n      enrollments.routes.js\n  package.json",
      starterFiles: [
        {
          path: "src/routes/courses.routes.js",
          content: `import { Router } from "express";

const router = Router();

const COURSES = [
  { id: 1, title: "HTML & CSS Fundamentals" },
  { id: 2, title: "JavaScript Fundamentals" },
];

router.get("/", (req, res) => {
  res.json(COURSES);
});

router.get("/:id", (req, res) => {
  // TODO: find the course by id (req.params.id) and respond with it,
  // or respond with a 404 if no course matches.
});

export default router;`,
        },
        {
          path: "src/routes/enrollments.routes.js",
          content: `import { Router } from "express";

const router = Router();
const ENROLLMENTS = [];

router.get("/", (req, res) => {
  res.json(ENROLLMENTS);
});

router.post("/", (req, res) => {
  // TODO: push a new enrollment (req.body) onto ENROLLMENTS and
  // respond with 201 and the created enrollment.
});

export default router;`,
        },
        {
          path: "src/server.js",
          content: `import express from "express";
import coursesRouter from "./routes/courses.routes.js";
import enrollmentsRouter from "./routes/enrollments.routes.js";

const app = express();
app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/enrollments", enrollmentsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Learning API listening on port " + PORT);
});`,
        },
      ],
      requirements: [
        "Course and enrollment routes live in their own separate router modules, not all in server.js",
        "GET /courses/:id returns the matching course, or a 404 status if no course has that id",
        "POST /enrollments accepts a JSON body and adds a new enrollment, responding with 201 and the created record",
        "The server starts without errors and logs the port it's listening on",
      ],
      commands: [
        { description: "Start the server", command: "node src/server.js" },
        {
          description: "Test a GET request (in a second terminal)",
          command: "curl http://localhost:3001/courses",
        },
        {
          description: "Test a POST request (in a second terminal)",
          command:
            'curl -X POST http://localhost:3001/enrollments -H "Content-Type: application/json" -d "{\\"courseId\\":1}"',
        },
      ],
      expectedBehavior:
        "GET /courses returns the two seed courses as JSON. GET /courses/1 returns that specific course; GET /courses/999 returns a 404. POST /enrollments with a JSON body creates and returns a new enrollment with status 201.",
      verificationSteps: [
        {
          command: "curl http://localhost:3001/courses/1",
          expectedResult: "A JSON object for the HTML & CSS Fundamentals course",
        },
        {
          command: "curl -i http://localhost:3001/courses/999",
          expectedResult: "HTTP status 404, since no course has that id",
        },
        {
          command:
            'curl -i -X POST http://localhost:3001/enrollments -H "Content-Type: application/json" -d "{\\"courseId\\":1}"',
          expectedResult:
            "HTTP status 201 with the newly created enrollment echoed back in the response body",
        },
      ],
      troubleshooting: [
        {
          issue: '"Cannot use import statement outside a module" error on startup',
          fix: 'Confirm "type": "module" is present in package.json — without it, Node expects CommonJS require() syntax instead of import.',
        },
        {
          issue: "req.body is undefined inside the POST handler",
          fix: "Confirm `app.use(express.json())` is registered in server.js before the routes that need to read a JSON body — without it, Express never parses the incoming body.",
        },
        {
          issue: "GET /courses/999 returns a generic error page instead of a clean 404",
          fix: "Make sure the route handler explicitly checks whether a matching course was found and calls res.status(404).json(...) rather than letting an undefined value flow into res.json().",
        },
      ],
      hints: [
        "Use COURSES.find(c => c.id === Number(req.params.id)) to find a course, since req.params values are always strings.",
        "res.status(201).json(newEnrollment) sets both the status code and the JSON body in one call.",
      ],
      referenceSolution: {
        summary:
          "The courses route finds a course by numeric id and responds with 404 if none matches; the enrollments route pushes the parsed request body onto the in-memory array (with a generated id) and responds 201 with the created record.",
        files: [
          {
            path: "src/routes/courses.routes.js (relevant excerpt)",
            content: `router.get("/:id", (req, res) => {
  const course = COURSES.find((c) => c.id === Number(req.params.id));
  if (!course) {
    return res.status(404).json({ error: { message: "Course not found" } });
  }
  res.json(course);
});`,
          },
          {
            path: "src/routes/enrollments.routes.js (relevant excerpt)",
            content: `router.post("/", (req, res) => {
  const enrollment = { id: ENROLLMENTS.length + 1, courseId: req.body.courseId, status: "active" };
  ENROLLMENTS.push(enrollment);
  res.status(201).json(enrollment);
});`,
          },
        ],
      },
      extensionChallenge:
        "Add a GET /enrollments/:id route, and a DELETE /enrollments/:id route that removes an enrollment, responding 404 if the id doesn't exist.",
    },
    commonMistakes: [
      "Registering a general parameterized route (`/courses/:id`) before a more specific one (`/courses/featured`), so the specific route is never actually reached.",
      "Putting every route directly on the main `app` object in one growing file instead of organizing them into feature-based Router modules.",
      "Forgetting `express.json()` middleware, then being confused why `req.body` is undefined in a POST handler.",
    ],
    quiz: [
      {
        id: "node-4-q1",
        prompt: "How does Express decide which registered route handles an incoming request?",
        choices: [
          "It always picks the most specific matching route, regardless of order",
          "It checks routes in registration order and uses the first one whose method and path pattern both match",
          "It randomly selects among matching routes",
          "Route order has no effect on matching",
        ],
        correctIndex: 1,
        explanation:
          "Express uses first-match-wins in registration order — this is exactly why a general parameterized route registered before a specific one can accidentally intercept requests meant for the specific one.",
      },
      {
        id: "node-4-q2",
        prompt: "Why organize routes into separate Router modules instead of one large file?",
        choices: [
          "Express requires multiple files",
          "It keeps related routes (and the code that changes together) physically grouped by feature, the same organizing principle from earlier in this curriculum",
          "It makes the server start faster",
          "Router modules are mandatory for any POST route",
        ],
        correctIndex: 1,
        explanation:
          "This is the same feature-based organization principle applied to a backend — grouping courses' routes together and enrollments' routes together, rather than tangling unrelated concerns in one file.",
      },
      {
        id: "node-4-q3",
        prompt:
          "Why is this lesson's real server-setup work in a guided local lab rather than a browser Run button?",
        choices: [
          "The site can run Express but chooses not to",
          "A real Express server needs an actual Node process, a real port, and a real filesystem — none of which the browser sandbox provides or should fake",
          "Express is too complex to explain",
          "Guided local labs are simply a stylistic preference",
        ],
        correctIndex: 1,
        explanation:
          "Running a real server requires real operating-system resources this platform's browser sandbox deliberately does not provide — a guided local lab is the honest way to have learners do this work for real.",
      },
    ],
    takeaway:
      "Express matches routes in registration order, first-match-wins — specific routes must be registered before general parameterized ones — and real routes belong in feature-organized Router modules, set up and run on your own machine.",
    summary:
      "This lesson covered Express's route-matching algorithm and route-ordering pitfalls through browser exercises, then set up a real, modularly-routed Express server with working GET and POST endpoints via the guided local lab.",
    nextLessonSlug: "express-middleware",
  },
  {
    id: "express-middleware",
    slug: "express-middleware",
    title: "Middleware: The Request Pipeline",
    description:
      "Every Express request flows through a pipeline of functions, each deciding whether to pass control forward. Understanding next() is the entire mental model.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["express-app-structure"],
    objectives: [
      "Explain what middleware is and how next() controls the request pipeline",
      "Implement a simple middleware pipeline runner to make the mental model concrete",
      "Identify why middleware order matters, the same way route order does",
    ],
    skills: ["nodejs", "express", "middleware"],
    tech: [{ name: "Express", version: "4.x or 5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Express docs: Using middleware",
        url: "https://expressjs.com/en/guide/using-middleware.html",
      },
    ],
    keywords: ["express", "middleware", "next", "request pipeline"],
    explanation: `Every Express request handler you've written so far — \`(req, res) => {...}\` — is actually a special case of something more general: **middleware**, a function of the shape \`(req, res, next) => {...}\`. A route handler is middleware that (usually) ends the pipeline by sending a response. Ordinary middleware — logging, authentication checks, request parsing — does some work and then calls \`next()\` to pass control to whatever comes after it in the pipeline, or doesn't call it at all if it needs to stop the request there (sending an error response instead, for instance).

This is the entire mental model: **a request flows through an ordered sequence of functions, each of which can inspect or modify \`req\`/\`res\`, and each of which decides whether to call \`next()\` and let the request continue, or handle it and stop.** \`express.json()\` (used in the previous lesson) is middleware: it parses the request body and calls \`next()\` so the route handler after it can read \`req.body\`. A logging middleware might log the request and immediately call \`next()\`. An authentication-check middleware might call \`next()\` if the request is authenticated, or respond with a 401 and *not* call \`next()\` if it isn't — stopping the pipeline right there, before the route handler that expected an authenticated user ever runs.

**Order matters here for exactly the same reason it mattered for routes**: middleware registered with \`app.use(...)\` applies, in order, to every request that reaches it. Registering a body-parsing middleware *after* a route that reads \`req.body\` means that route sees \`undefined\`, because its own middleware never ran before it. Registering an authentication check after the routes it's meant to protect means it protects nothing — the routes already ran and responded before the check ever executed.

Forgetting to call \`next()\` in a middleware that isn't itself ending the request (not sending a response) is one of the most common real bugs — the request simply hangs forever, with no response and no error, because nothing downstream in the pipeline ever runs.`,
    example: {
      language: "javascript",
      description:
        "A real, working middleware-pipeline runner -- the exact 'chain of functions calling next()' mechanism Express itself implements.",
      code: `function runPipeline(middlewares, req, res) {
  let index = 0;
  function next() {
    const middleware = middlewares[index];
    index += 1;
    if (middleware) middleware(req, res, next);
  }
  next();
}

const logger = (req, res, next) => {
  console.log("Request to:", req.path);
  next();
};
const respond = (req, res) => {
  res.body = "Hello from " + req.path;
};

runPipeline([logger, respond], { path: "/courses" }, {});`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a third middleware BEFORE respond that stops the pipeline early (doesn't call next()) -- notice respond never runs.",
      code: `function runPipeline(middlewares, req, res) {
  let index = 0;
  function next() {
    const middleware = middlewares[index];
    index += 1;
    if (middleware) middleware(req, res, next);
  }
  next();
}

const logger = (req, res, next) => {
  console.log("Request to:", req.path);
  next();
};
const respond = (req, res) => {
  res.body = "Hello from " + req.path;
  console.log("responded:", res.body);
};

runPipeline([logger, respond], { path: "/courses" }, {});`,
      editable: true,
    },
    guidedExercise: {
      id: "node-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using runPipeline already defined, write an authCheck middleware that calls next() only if req.isAuthenticated is true; otherwise it should set res.status = 401 and NOT call next(). Then run the pipeline [authCheck, respond] with an unauthenticated request and confirm respond never ran.",
      starterCode: `function runPipeline(middlewares, req, res) {
  let index = 0;
  function next() {
    const middleware = middlewares[index];
    index += 1;
    if (middleware) middleware(req, res, next);
  }
  next();
}

function authCheck(req, res, next) {
  // TODO: call next() only if req.isAuthenticated, otherwise set res.status = 401
}

let respondWasCalled = false;
function respond(req, res) {
  respondWasCalled = true;
}

const req = { isAuthenticated: false };
const res = {};
runPipeline([authCheck, respond], req, res);
`,
      solutionCode: `function runPipeline(middlewares, req, res) {
  let index = 0;
  function next() {
    const middleware = middlewares[index];
    index += 1;
    if (middleware) middleware(req, res, next);
  }
  next();
}

function authCheck(req, res, next) {
  if (req.isAuthenticated) {
    next();
  } else {
    res.status = 401;
  }
}

let respondWasCalled = false;
function respond(req, res) {
  respondWasCalled = true;
}

const req = { isAuthenticated: false };
const res = {};
runPipeline([authCheck, respond], req, res);`,
      harness: `
        try { window.__report('t1', res.status === 401, 'An unauthenticated request should get a 401 status set on it.'); } catch (e) { window.__report('t1', false, 'res is not defined: ' + e.message); }
        try { window.__report('t2', respondWasCalled === false, 'respond should never run, since authCheck did not call next() for an unauthenticated request.'); } catch (e) { window.__report('t2', false, 'respondWasCalled is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "sets the 401 status for an unauthenticated request",
          hidden: false,
        },
        { id: "t2", description: "stops the pipeline, never reaching respond", hidden: false },
      ],
      hints: [
        "Only call next() inside the true branch of the authentication check.",
        "Not calling next() is exactly how a middleware stops a request from reaching what comes after it.",
      ],
    },
    independentExercise: {
      id: "node-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write buildRequestLog(middlewareNames) that returns the array of middleware names IN THE ORDER they would actually execute, given that middleware runs strictly in the order provided -- this models why registration order determines execution order.",
      starterCode: `function buildRequestLog(middlewareNames) {
  // TODO
}
`,
      solutionCode: `function buildRequestLog(middlewareNames) {
  return [...middlewareNames];
}`,
      harness: `
        try {
          const order = ['logger', 'authCheck', 'bodyParser', 'routeHandler'];
          const result = buildRequestLog(order);
          window.__report('t1', JSON.stringify(result) === JSON.stringify(order), 'Middleware executes in exactly the order it was registered.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "preserves registration order as execution order", hidden: false },
      ],
      hints: [
        "This exercise is deliberately simple: execution order IS registration order, with no reordering.",
        "The point is recognizing that fact, not writing complex logic.",
      ],
    },
    commonMistakes: [
      "Forgetting to call next() in a middleware that isn't meant to end the request, causing the request to hang forever with no response.",
      "Registering an authentication-check middleware AFTER the routes it's supposed to protect, so it never actually runs before those routes respond.",
      "Calling next() AND also sending a response in the same middleware, which can cause 'headers already sent' errors when the pipeline continues to another handler that also tries to respond.",
    ],
    quiz: [
      {
        id: "node-5-q1",
        prompt:
          "What determines whether a request continues past a piece of middleware to whatever comes next?",
        choices: [
          "Express automatically continues after every middleware",
          "Whether that middleware calls next() — if it doesn't, the pipeline stops there",
          "The order routes were defined in a separate file",
          "Middleware cannot stop a request under any circumstances",
        ],
        correctIndex: 1,
        explanation:
          "next() is the entire control mechanism — calling it continues the pipeline; not calling it (e.g. after sending an error response) stops it.",
      },
      {
        id: "node-5-q2",
        prompt: "What happens if a middleware neither calls next() nor sends a response?",
        choices: [
          "Express automatically sends a default response",
          "The request hangs indefinitely, since nothing downstream ever runs and no response is ever sent",
          "The next middleware runs anyway",
          "This throws an immediate error",
        ],
        correctIndex: 1,
        explanation:
          "A middleware that does neither leaves the client waiting forever, with no response and no visible error — one of the most common real Express bugs.",
      },
      {
        id: "node-5-q3",
        prompt:
          "Why must an authentication-check middleware be registered BEFORE the routes it protects?",
        choices: [
          "It doesn't matter where it's registered",
          "Middleware and routes both execute in registration order — registering the check after the routes means the routes already ran and responded first",
          "Authentication middleware is a special case exempt from ordering rules",
          "Express automatically reorders middleware for security",
        ],
        correctIndex: 1,
        explanation:
          "The same order-dependence that applies to routes applies to middleware — a protective check registered too late simply never runs before the thing it was meant to protect.",
      },
    ],
    takeaway:
      "Middleware is a pipeline of functions each deciding whether to call next() and continue, or stop the request there — and middleware order matters for exactly the same reason route order does: everything executes in registration order.",
    summary:
      "This lesson built a real middleware-pipeline runner to make the next()-based mental model concrete, and covered the common bugs from forgetting next() or misordering middleware relative to the routes it should protect.",
    nextLessonSlug: "express-request-data",
  },
  {
    id: "express-request-data",
    slug: "express-request-data",
    title: "Request Parameters, Query Strings, and Bodies",
    description:
      "Three different places data arrives from in a request, each meaning something different — mixing them up is a common source of confusing bugs.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["express-middleware"],
    objectives: [
      "Distinguish route parameters, query strings, and the request body by purpose",
      "Parse a query string into a plain object",
      "Explain why every value from req.params and req.query arrives as a string",
    ],
    skills: ["nodejs", "express", "request-data"],
    tech: [{ name: "Express", version: "4.x or 5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Express docs: req.params", url: "https://expressjs.com/en/4x/api.html#req.params" },
      { label: "Express docs: req.query", url: "https://expressjs.com/en/4x/api.html#req.query" },
    ],
    keywords: ["express", "req.params", "req.query", "req.body"],
    explanation: `A single request can carry data in three genuinely different places, and each has a different intended purpose that its name reflects. **Route parameters** (\`req.params\`, from a path pattern like \`/courses/:id\`) identify *which specific resource* the request is about — a required part of the URL's structure. **Query strings** (\`req.query\`, from \`?difficulty=beginner&sort=title\` after a \`?\`) express *optional* filtering, sorting, or pagination — the resource collection stays the same regardless, but the query narrows or orders it. **The request body** (\`req.body\`, present on POST/PUT/PATCH, parsed by \`express.json()\`) carries the actual *data being sent* — the content of a new resource being created, or the fields being updated.

A concrete request makes this click: \`GET /courses/42?fields=title,progress\` — \`42\` (a route parameter) says *which* course; \`fields=title,progress\` (a query string) says which fields of that course to include in the response. Using the wrong one for the wrong purpose produces awkward, non-RESTful APIs — putting a resource's identity in a query string (\`/courses?id=42\`) instead of the URL path itself works technically but breaks the REST convention every other endpoint follows.

**Every value in \`req.params\` and \`req.query\` arrives as a string, always** — even if the URL looks like it contains a number (\`/courses/42\`), \`req.params.id\` is the *string* \`"42"\`, not the number \`42\`. This is a real, common bug source: comparing \`req.params.id === 42\` (strict equality against a number) silently and always fails, since a string can never strictly equal a number in JavaScript. Explicit conversion (\`Number(req.params.id)\`) is required before any numeric comparison, exactly the pattern used in this course's earlier route-matching exercises.`,
    example: {
      language: "javascript",
      description:
        "A real query-string parser -- the same fundamental parsing req.query does, made explicit and inspectable.",
      code: `function parseQueryString(queryString) {
  const result = {};
  const pairs = queryString.replace(/^\\?/, "").split("&");
  for (const pair of pairs) {
    if (!pair) continue;
    const [key, value] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(value || "");
  }
  return result;
}

console.log(parseQueryString("?difficulty=beginner&sort=title"));
// { difficulty: "beginner", sort: "title" }`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Parse a query string with three parameters, including one with a URL-encoded space (%20 or +).",
      code: `function parseQueryString(queryString) {
  const result = {};
  const pairs = queryString.replace(/^\\?/, "").split("&");
  for (const pair of pairs) {
    if (!pair) continue;
    const [key, value] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(value || "");
  }
  return result;
}

console.log(parseQueryString("?q=web%20development&page=2"));`,
      editable: true,
    },
    guidedExercise: {
      id: "node-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A route is defined as '/courses/:id'. Given the string paramValue = '42' (exactly what req.params.id would actually be), write isMatchingCourseId(paramValue, targetId) that correctly compares it against a real number targetId, converting types correctly.",
      starterCode: `function isMatchingCourseId(paramValue, targetId) {
  // TODO: paramValue is always a STRING -- convert before comparing
}

const paramValue = "42";
let matches = isMatchingCourseId(paramValue, 42);
`,
      solutionCode: `function isMatchingCourseId(paramValue, targetId) {
  return Number(paramValue) === targetId;
}

const paramValue = "42";
let matches = isMatchingCourseId(paramValue, 42);`,
      harness: `
        try { window.__report('t1', matches === true, 'Number("42") === 42 should correctly match after proper conversion.'); } catch (e) { window.__report('t1', false, 'matches is not defined: ' + e.message); }
        try { window.__report('t2', isMatchingCourseId("42", 42) === true && isMatchingCourseId("7", 42) === false, 'The function should correctly distinguish matching and non-matching ids.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly matches after string-to-number conversion",
          hidden: false,
        },
        { id: "t2", description: "correctly distinguishes match from non-match", hidden: false },
      ],
      hints: [
        "req.params values are always strings — direct strict equality against a number always fails without conversion.",
        "Number(paramValue) converts the string to a real number before comparing.",
      ],
    },
    independentExercise: {
      id: "node-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write classifyRequestData(source) that returns 'identity' for 'route-parameter', 'filtering' for 'query-string', and 'payload' for 'request-body' -- modeling the distinct PURPOSE of each of the three data sources from this lesson.",
      starterCode: `function classifyRequestData(source) {
  // TODO
}
`,
      solutionCode: `function classifyRequestData(source) {
  const map = {
    "route-parameter": "identity",
    "query-string": "filtering",
    "request-body": "payload",
  };
  return map[source];
}`,
      harness: `
        try { window.__report('t1', classifyRequestData('route-parameter') === 'identity', 'A route parameter identifies which specific resource.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', classifyRequestData('query-string') === 'filtering', 'A query string expresses optional filtering/sorting.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', classifyRequestData('request-body') === 'payload', 'The request body carries the actual data being sent.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "classifies route parameters correctly", hidden: false },
        { id: "t2", description: "classifies query strings correctly", hidden: false },
        { id: "t3", description: "classifies the request body correctly", hidden: false },
      ],
      hints: [
        "Each of the three sources maps to exactly one distinct purpose from this lesson's explanation.",
        "A simple lookup object handles all three cases directly.",
      ],
    },
    commonMistakes: [
      "Comparing req.params.id directly against a number with strict equality, forgetting that route parameters always arrive as strings.",
      "Putting a resource's identity in a query string (`/courses?id=42`) instead of the URL path (`/courses/42`), breaking REST convention.",
      "Using the request body for data that should be a query parameter (like pagination on a GET request, which conventionally has no body at all).",
    ],
    quiz: [
      {
        id: "node-6-q1",
        prompt: "What is the conventional purpose of a route parameter versus a query string?",
        choices: [
          "They are interchangeable with no real difference",
          "A route parameter identifies which specific resource; a query string expresses optional filtering, sorting, or pagination",
          "Route parameters are for POST requests only",
          "Query strings can only contain numbers",
        ],
        correctIndex: 1,
        explanation:
          "Route parameters are a required part of identifying the resource; query strings are optional modifiers to a request that don't change which resource collection is being addressed.",
      },
      {
        id: "node-6-q2",
        prompt:
          "Why does `req.params.id === 42` (strict equality against a number) always fail for a route like `/courses/:id`?",
        choices: [
          "It doesn't fail — this always works correctly",
          "req.params values are always strings, and a string can never strictly equal a number in JavaScript",
          "Express requires === to be avoided entirely",
          "This only fails for ids larger than 100",
        ],
        correctIndex: 1,
        explanation:
          'req.params.id is the string "42", not the number 42 — strict equality against a number requires an explicit conversion first.',
      },
      {
        id: "node-6-q3",
        prompt:
          "What data source is appropriate for the content of a new resource being created via POST?",
        choices: ["req.params", "req.query", "req.body", "None of these"],
        correctIndex: 2,
        explanation:
          "The request body is specifically for the data payload being sent — the actual content of what's being created or updated.",
      },
    ],
    takeaway:
      "Route parameters identify which resource, query strings express optional filtering, and the request body carries the actual data — and every params/query value arrives as a string, requiring explicit conversion before numeric comparisons.",
    summary:
      "This lesson distinguished the three sources of request data by purpose and built a real query-string parser, then covered the common string-vs-number bug that comes from forgetting req.params values are always strings.",
    nextLessonSlug: "express-input-validation",
  },
  {
    id: "express-input-validation",
    slug: "express-input-validation",
    title: "Input Validation and Rejecting Bad Requests",
    description:
      "Never trust a request body. Add real validation and a centralized error-handling middleware to your local Express API, so bad input is rejected consistently and safely everywhere.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 6,
    difficulty: "advanced",
    estimatedMinutes: 30,
    prerequisites: ["express-request-data"],
    objectives: [
      "Write a validation function that checks required fields, types, and value constraints",
      "Explain what a centralized error-handling middleware is and why it's better than repeating error logic in every route",
      "Add real request validation and centralized error handling to a local Express server",
    ],
    skills: ["nodejs", "express", "validation", "error-handling"],
    tech: [{ name: "Express", version: "4.x or 5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Express docs: Error Handling",
        url: "https://expressjs.com/en/guide/error-handling.html",
      },
    ],
    keywords: ["express", "validation", "error handling middleware", "input validation"],
    explanation: `A request body is data from outside your program's control — it can be malformed, missing required fields, the wrong types, or actively malicious, regardless of what your frontend intends to send. **Every field a route handler reads from \`req.body\` should be validated before it's trusted**, the same discipline from this curriculum's testing courses (negative testing, schema validation) applied from the server's own implementation side rather than as an external test.

A real validation function checks each field against its actual requirements — required-ness, type, and value constraints — and collects every problem found, not just the first one, so a client fixing one issue doesn't have to resubmit repeatedly just to discover the next: \`{ email: "email is required", progressPercent: "must be between 0 and 100" }\`, both reported together.

**Centralized error handling** solves a real duplication problem: without it, every route handler needs its own try/catch and its own logic for turning an error into a proper status code and response body — repeated dozens of times, drifting slightly out of sync with itself over time. Express supports a special error-handling middleware signature with **four** parameters, \`(err, req, res, next)\` — Express recognizes this specific arity and only invokes such middleware when something calls \`next(err)\` (passing an error) instead of \`next()\`. One centralized error handler, registered last, converts any error passed to it into a consistent, structured response — the same status/body shape from this course's API-testing-adjacent concepts, applied here on the server that produces those responses rather than the client testing them.

This lesson's guided local lab adds both pieces — real request validation and a centralized error-handling middleware — to the Express server from earlier in this course.`,
    example: {
      language: "javascript",
      description:
        "A real validation function collecting ALL errors found, not just the first -- the exact shape the guided local lab's Express route will use.",
      code: `function validateEnrollment(body) {
  const errors = {};
  if (typeof body.courseId !== "number") errors.courseId = "courseId must be a number";
  if (typeof body.status !== "string" || !["active", "completed"].includes(body.status)) {
    errors.status = "status must be 'active' or 'completed'";
  }
  return errors;
}

const errors = validateEnrollment({ courseId: "not-a-number", status: "unknown" });
console.log(errors);
console.log(Object.keys(errors).length === 0 ? "valid" : "invalid");`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Fix the body below so it passes validation, then re-run to confirm errors is empty.",
      code: `function validateEnrollment(body) {
  const errors = {};
  if (typeof body.courseId !== "number") errors.courseId = "courseId must be a number";
  if (typeof body.status !== "string" || !["active", "completed"].includes(body.status)) {
    errors.status = "status must be 'active' or 'completed'";
  }
  return errors;
}

const errors = validateEnrollment({ courseId: "not-a-number", status: "unknown" });
console.log(errors);`,
      editable: true,
    },
    guidedExercise: {
      id: "node-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using validateEnrollment already defined, run it on THREE bodies and store each result: resultAllInvalid (both fields wrong), resultAllValid (both fields correct: courseId 1, status 'active'), resultOneInvalid (courseId correct, status wrong).",
      starterCode: `function validateEnrollment(body) {
  const errors = {};
  if (typeof body.courseId !== "number") errors.courseId = "courseId must be a number";
  if (typeof body.status !== "string" || !["active", "completed"].includes(body.status)) {
    errors.status = "status must be 'active' or 'completed'";
  }
  return errors;
}

let resultAllInvalid = null; // TODO
let resultAllValid = null; // TODO
let resultOneInvalid = null; // TODO
`,
      solutionCode: `function validateEnrollment(body) {
  const errors = {};
  if (typeof body.courseId !== "number") errors.courseId = "courseId must be a number";
  if (typeof body.status !== "string" || !["active", "completed"].includes(body.status)) {
    errors.status = "status must be 'active' or 'completed'";
  }
  return errors;
}

let resultAllInvalid = validateEnrollment({ courseId: "x", status: "bogus" });
let resultAllValid = validateEnrollment({ courseId: 1, status: "active" });
let resultOneInvalid = validateEnrollment({ courseId: 1, status: "bogus" });`,
      harness: `
        try { window.__report('t1', Object.keys(resultAllInvalid).length === 2, 'Both fields invalid should report both errors.'); } catch (e) { window.__report('t1', false, 'resultAllInvalid is not defined: ' + e.message); }
        try { window.__report('t2', Object.keys(resultAllValid).length === 0, 'Both fields valid should report zero errors.'); } catch (e) { window.__report('t2', false, 'resultAllValid is not defined: ' + e.message); }
        try { window.__report('t3', Object.keys(resultOneInvalid).length === 1 && 'status' in resultOneInvalid, 'Only the status field should be reported as invalid.'); } catch (e) { window.__report('t3', false, 'resultOneInvalid is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "reports both errors when both fields are invalid",
          hidden: false,
        },
        { id: "t2", description: "reports zero errors for a fully valid body", hidden: false },
        { id: "t3", description: "reports only the one genuinely invalid field", hidden: false },
      ],
      hints: [
        "Call validateEnrollment with each described body and store the returned errors object.",
        "An empty object (zero keys) means the body is fully valid.",
      ],
    },
    independentExercise: {
      id: "node-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write buildErrorResponse(errors) that takes a validation errors object (like { courseId: 'msg' }) and returns { status: 400, body: { error: { code: 'VALIDATION_ERROR', fields: errors } } } if errors has any keys, or null if errors is empty (meaning no error response is needed).",
      starterCode: `function buildErrorResponse(errors) {
  // TODO
}
`,
      solutionCode: `function buildErrorResponse(errors) {
  if (Object.keys(errors).length === 0) return null;
  return { status: 400, body: { error: { code: "VALIDATION_ERROR", fields: errors } } };
}`,
      harness: `
        try {
          const result = buildErrorResponse({ courseId: "required" });
          window.__report('t1', result.status === 400 && result.body.error.code === 'VALIDATION_ERROR', 'A non-empty errors object should produce a structured 400 response.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const result = buildErrorResponse({});
          window.__report('t2', result === null, 'An empty errors object should produce no error response (null).');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "builds a structured 400 response for real errors",
          hidden: false,
        },
        { id: "t2", description: "returns null when there are no errors", hidden: false },
      ],
      hints: [
        "Check Object.keys(errors).length to decide which branch to take.",
        "The structured response shape here matches the consistent error-body pattern from earlier lessons.",
      ],
    },
    guidedLocalLab: {
      id: "express-validation-lab",
      title: "Add Validation and Centralized Error Handling",
      scenario:
        "Extend the local Express server from earlier in this course with real request validation on POST /enrollments and a single centralized error-handling middleware that every route can rely on.",
      requiredTools: [
        { name: "Node.js", version: "20.x or 22.x LTS" },
        { name: "npm", version: "10.x (bundled with Node.js)" },
      ],
      setupSteps: [
        "Reuse the `learning-api` project from the Express setup lab earlier in this course.",
        "Add a new file `src/errors.js` with the AppError class below.",
        "Update `src/routes/enrollments.routes.js` and `src/server.js` per the starter files below.",
        "Restart the server with `node src/server.js`.",
      ],
      projectStructure:
        "learning-api/\n  src/\n    server.js (updated: registers the error handler last)\n    errors.js (new)\n    routes/\n      courses.routes.js\n      enrollments.routes.js (updated: validates input)",
      starterFiles: [
        {
          path: "src/errors.js",
          content: `export class AppError extends Error {
  constructor(status, code, message, fields) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}`,
        },
        {
          path: "src/routes/enrollments.routes.js",
          content: `import { Router } from "express";
import { AppError } from "../errors.js";

const router = Router();
const ENROLLMENTS = [];

function validateEnrollment(body) {
  const errors = {};
  if (typeof body.courseId !== "number") errors.courseId = "courseId must be a number";
  if (typeof body.status !== "string" || !["active", "completed"].includes(body.status)) {
    errors.status = "status must be 'active' or 'completed'";
  }
  return errors;
}

router.get("/", (req, res) => {
  res.json(ENROLLMENTS);
});

router.post("/", (req, res, next) => {
  // TODO: validate req.body with validateEnrollment. If there are errors,
  // call next(new AppError(400, "VALIDATION_ERROR", "Invalid enrollment", errors))
  // instead of responding directly. Otherwise create and respond 201 as before.
  const enrollment = { id: ENROLLMENTS.length + 1, ...req.body };
  ENROLLMENTS.push(enrollment);
  res.status(201).json(enrollment);
});

export default router;`,
        },
        {
          path: "src/server.js",
          content: `import express from "express";
import coursesRouter from "./routes/courses.routes.js";
import enrollmentsRouter from "./routes/enrollments.routes.js";

const app = express();
app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/enrollments", enrollmentsRouter);

// TODO: add a centralized error-handling middleware HERE, after all routes.
// It must have exactly 4 parameters: (err, req, res, next).

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Learning API listening on port " + PORT);
});`,
        },
      ],
      requirements: [
        "POST /enrollments rejects an invalid body with status 400 and a structured error body naming the invalid fields",
        "The error-handling middleware is registered ONCE, after all routes, with exactly 4 parameters",
        "A valid POST /enrollments request still succeeds with 201, unaffected by the new validation",
        "No route handler contains its own ad hoc try/catch that duplicates the centralized error response shape",
      ],
      commands: [
        { description: "Start the server", command: "node src/server.js" },
        {
          description: "Test invalid input",
          command:
            'curl -i -X POST http://localhost:3001/enrollments -H "Content-Type: application/json" -d "{}"',
        },
      ],
      expectedBehavior:
        "POST /enrollments with an empty or malformed body responds 400 with { error: { code: 'VALIDATION_ERROR', fields: {...} } } naming every invalid field. A well-formed body still responds 201 as before.",
      verificationSteps: [
        {
          command:
            'curl -i -X POST http://localhost:3001/enrollments -H "Content-Type: application/json" -d "{}"',
          expectedResult: "HTTP 400 with a body naming both courseId and status as invalid",
        },
        {
          command:
            'curl -i -X POST http://localhost:3001/enrollments -H "Content-Type: application/json" -d "{\\"courseId\\":1,\\"status\\":\\"active\\"}"',
          expectedResult:
            "HTTP 201 with the created enrollment, exactly as before adding validation",
        },
      ],
      troubleshooting: [
        {
          issue:
            "The error-handling middleware never runs, even after calling next(new AppError(...))",
          fix: "Confirm the error-handling middleware is registered with app.use() AFTER every route, and that it has exactly 4 parameters (err, req, res, next) — Express identifies error handlers by that specific arity.",
        },
        {
          issue:
            "Calling next(err) causes the default Express error page to appear instead of the JSON response",
          fix: "This means the centralized handler either isn't registered, or is registered before some routes — move it to the very end of server.js, after all app.use() route registrations.",
        },
      ],
      hints: [
        "The centralized handler reads err.status, err.code, err.fields (all present on AppError) and calls res.status(err.status).json({ error: { code: err.code, message: err.message, fields: err.fields } }).",
        "Give AppError a sensible default status (like 500) for errors that aren't validation-related, so the same handler works for any thrown error, not just AppError instances.",
      ],
      referenceSolution: {
        summary:
          "The enrollments route validates the body and calls next(new AppError(...)) on failure instead of responding directly; server.js registers one centralized error-handling middleware last, which reads the error's status/code/fields (falling back to 500/INTERNAL_ERROR for non-AppError errors) and sends one consistent JSON shape.",
        files: [
          {
            path: "src/routes/enrollments.routes.js (relevant excerpt)",
            content: `router.post("/", (req, res, next) => {
  const errors = validateEnrollment(req.body);
  if (Object.keys(errors).length > 0) {
    return next(new AppError(400, "VALIDATION_ERROR", "Invalid enrollment", errors));
  }
  const enrollment = { id: ENROLLMENTS.length + 1, ...req.body };
  ENROLLMENTS.push(enrollment);
  res.status(201).json(enrollment);
});`,
          },
          {
            path: "src/server.js (relevant excerpt)",
            content: `app.use((err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  res.status(status).json({
    error: { code, message: err.message, fields: err.fields },
  });
});`,
          },
        ],
      },
      extensionChallenge:
        "Add validation to the courses route's (hypothetical) POST endpoint too, reusing the same AppError and centralized handler, to confirm the error handling genuinely works across more than one route without duplication.",
    },
    commonMistakes: [
      "Validating a request body's presence but not its types, letting a string silently pass through where a number was expected.",
      "Writing a custom try/catch and error response in every single route handler instead of a single centralized error-handling middleware.",
      "Registering the error-handling middleware before some routes, or giving it fewer than 4 parameters, so Express never recognizes it as an error handler.",
    ],
    quiz: [
      {
        id: "node-7-q1",
        prompt:
          "Why should a validation function collect ALL errors found instead of stopping at the first one?",
        choices: [
          "It shouldn't — stopping at the first error is always better",
          "So a client fixing one issue doesn't have to resubmit repeatedly just to discover the next problem",
          "Collecting multiple errors is a security risk",
          "This has no practical benefit",
        ],
        correctIndex: 1,
        explanation:
          "Reporting every problem at once gives the client everything needed to fix the request in a single pass, rather than an unnecessary trial-and-error loop.",
      },
      {
        id: "node-7-q2",
        prompt:
          "How does Express recognize a middleware function as an error handler specifically?",
        choices: [
          "By its function name",
          "By its exact arity — a function with exactly 4 parameters, (err, req, res, next)",
          "By where the file is located",
          "Error handlers must be registered first, not last",
        ],
        correctIndex: 1,
        explanation:
          "Express distinguishes error-handling middleware purely by parameter count — exactly 4 parameters signals it should only be invoked when next(err) is called.",
      },
      {
        id: "node-7-q3",
        prompt:
          "What problem does a single centralized error-handling middleware solve compared to per-route try/catch blocks?",
        choices: [
          "It makes the server start faster",
          "It avoids duplicating error-to-response logic across every route, where it could drift out of sync with itself over time",
          "It removes the need for any validation at all",
          "It automatically fixes invalid requests",
        ],
        correctIndex: 1,
        explanation:
          "Centralizing error handling means one place converts any error into a consistent response shape, instead of that logic being repeated (and potentially inconsistent) in every route.",
      },
    ],
    takeaway:
      "Validate every field of untrusted input, collecting every error found — and a single centralized error-handling middleware (registered last, with exactly 4 parameters) avoids repeating error-response logic across every route.",
    summary:
      "This lesson covered writing a real multi-field validation function and the mechanics of Express's error-handling middleware, then added both real validation and centralized error handling to a local Express server via the guided local lab.",
    nextLessonSlug: "rest-resource-design",
  },
  {
    id: "rest-resource-design",
    slug: "rest-resource-design",
    title: "REST Resource Design and HTTP Status Behavior",
    description:
      "Designing an API's resources and status codes from the implementer's side — the same conventions this curriculum's testing courses teach testers to verify.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["express-input-validation"],
    objectives: [
      "Design a resource's URL and method structure following REST conventions",
      "Choose the correct status code for a given outcome, from the server-implementer's side",
      "Explain why response shape should stay consistent across every endpoint in an API",
    ],
    skills: ["nodejs", "express", "rest-design", "http-status"],
    tech: [{ name: "Express", version: "4.x or 5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: HTTP response status codes",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
      },
    ],
    keywords: ["rest", "api design", "http status codes", "express"],
    explanation: `Designing an API's resources is the same REST convention this curriculum's API Testing and Automation course teaches testers to *verify* — now from the side that has to decide it in the first place. A resource (\`enrollments\`) gets a predictable set of endpoints: \`GET /enrollments\` (list), \`GET /enrollments/:id\` (one), \`POST /enrollments\` (create), \`PATCH /enrollments/:id\` (partial update), \`DELETE /enrollments/:id\` (remove) — the same mapping from earlier in this course's Express-structure lesson, now applied deliberately as a design decision rather than encountered as a given.

**Choosing the right status code is part of the API's actual contract, not an afterthought.** A newly created resource should return \`201 Created\`, not a generic \`200\` — the distinction tells a well-behaved client something concrete happened, distinct from merely reading data that already existed. A successful \`DELETE\` conventionally returns \`204 No Content\` (there's nothing left to describe) rather than \`200\` with an empty body. A resource that doesn't exist returns \`404\`; a malformed request returns \`400\`; a request whose data conflicts with the resource's current state (an enrollment for a course that no longer exists) returns \`409 Conflict\`. Each of these is a deliberate signal to the client about *what kind* of situation occurred — collapsing everything into a generic "it failed" (or worse, always returning \`200\` with an \`error\` field in the body, the exact anti-pattern this curriculum's testing courses teach as a real defect) throws away information a well-built client could otherwise act on correctly.

**Response shape consistency matters as much as any individual status code.** Every success response in a well-designed API follows the same envelope; every error response follows the same envelope (the \`{ error: { code, message, fields } }\` shape from the previous lesson, used everywhere, not just on the one route where it was first written). A client integrating with the API writes error-handling code *once*, generically, instead of special-casing each endpoint's slightly different error shape.`,
    example: {
      language: "javascript",
      description:
        "A status-code decision function -- the exact judgment call a route handler makes, made explicit and testable on its own.",
      code: `function statusForOutcome(outcome) {
  switch (outcome) {
    case "created": return 201;
    case "deleted": return 204;
    case "not-found": return 404;
    case "validation-failed": return 400;
    case "conflict": return 409;
    default: return 200;
  }
}

console.log(statusForOutcome("created"));          // 201
console.log(statusForOutcome("deleted"));           // 204
console.log(statusForOutcome("not-found"));         // 404`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Add a case for 'read' (a normal successful GET) mapping to 200, then test it.",
      code: `function statusForOutcome(outcome) {
  switch (outcome) {
    case "created": return 201;
    case "deleted": return 204;
    case "not-found": return 404;
    case "validation-failed": return 400;
    case "conflict": return 409;
    default: return 200;
  }
}

console.log(statusForOutcome("read"));`,
      editable: true,
    },
    guidedExercise: {
      id: "node-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using statusForOutcome already defined, determine the correct status for three server actions and store each: statusForNewEnrollment (a successful create), statusForDeletedEnrollment (a successful delete), statusForMissingCourse (the referenced course does not exist).",
      starterCode: `function statusForOutcome(outcome) {
  switch (outcome) {
    case "created": return 201;
    case "deleted": return 204;
    case "not-found": return 404;
    default: return 200;
  }
}

let statusForNewEnrollment = 0; // TODO
let statusForDeletedEnrollment = 0; // TODO
let statusForMissingCourse = 0; // TODO
`,
      solutionCode: `function statusForOutcome(outcome) {
  switch (outcome) {
    case "created": return 201;
    case "deleted": return 204;
    case "not-found": return 404;
    default: return 200;
  }
}

let statusForNewEnrollment = statusForOutcome("created");
let statusForDeletedEnrollment = statusForOutcome("deleted");
let statusForMissingCourse = statusForOutcome("not-found");`,
      harness: `
        try { window.__report('t1', statusForNewEnrollment === 201, 'A successful create should map to 201.'); } catch (e) { window.__report('t1', false, 'statusForNewEnrollment is not defined: ' + e.message); }
        try { window.__report('t2', statusForDeletedEnrollment === 204, 'A successful delete should map to 204.'); } catch (e) { window.__report('t2', false, 'statusForDeletedEnrollment is not defined: ' + e.message); }
        try { window.__report('t3', statusForMissingCourse === 404, 'A missing resource should map to 404.'); } catch (e) { window.__report('t3', false, 'statusForMissingCourse is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly maps a create outcome", hidden: false },
        { id: "t2", description: "correctly maps a delete outcome", hidden: false },
        { id: "t3", description: "correctly maps a not-found outcome", hidden: false },
      ],
      hints: [
        "Call statusForOutcome with the string matching each described scenario.",
        "Each of the three scenarios maps to exactly one of the switch cases already defined.",
      ],
    },
    independentExercise: {
      id: "node-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write buildSuccessEnvelope(data) returning { data } (a consistent success wrapper), and buildErrorEnvelope(code, message) returning { error: { code, message } } (a consistent error wrapper) -- modeling response-shape consistency across an entire API.",
      starterCode: `function buildSuccessEnvelope(data) {
  // TODO
}
function buildErrorEnvelope(code, message) {
  // TODO
}
`,
      solutionCode: `function buildSuccessEnvelope(data) {
  return { data };
}
function buildErrorEnvelope(code, message) {
  return { error: { code, message } };
}`,
      harness: `
        try {
          const result = buildSuccessEnvelope({ id: 1, title: "Course" });
          window.__report('t1', result.data && result.data.id === 1, 'A success envelope should wrap the data under a consistent "data" key.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const result = buildErrorEnvelope("NOT_FOUND", "Course not found");
          window.__report('t2', result.error.code === 'NOT_FOUND' && result.error.message === 'Course not found', 'An error envelope should wrap code and message under a consistent "error" key.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "wraps success data consistently", hidden: false },
        { id: "t2", description: "wraps error data consistently", hidden: false },
      ],
      hints: [
        "Both functions just wrap their input in a fixed, predictable object shape.",
        "Consistency, not cleverness, is the entire point of these two functions.",
      ],
    },
    commonMistakes: [
      "Returning 200 for a newly created resource instead of 201, losing the distinction between reading existing data and creating something new.",
      "Returning 200 with an `error` field in the body instead of a real 4xx/5xx status — the exact status/body mismatch defect from this curriculum's API testing course, now viewed from the side that would introduce it.",
      "Using a different response shape (sometimes a bare array, sometimes a wrapped object, sometimes a differently-named error field) across different endpoints of the same API.",
    ],
    quiz: [
      {
        id: "node-8-q1",
        prompt: "What does returning 201 instead of 200 for a successful POST communicate?",
        choices: [
          "Nothing — they are interchangeable",
          "That a new resource was genuinely created, distinct from merely reading existing data",
          "That the request took longer than usual",
          "That the client should retry the request",
        ],
        correctIndex: 1,
        explanation:
          "201 is a specific, meaningful signal that creation happened — collapsing it into a generic 200 discards that information from the response.",
      },
      {
        id: "node-8-q2",
        prompt:
          "Why is returning 200 with an error field in the body considered a real defect, not just a style choice?",
        choices: [
          "It isn't a defect — it's a valid design pattern",
          "A client checking only the status code would incorrectly treat the response as successful, exactly the status/body mismatch this curriculum's testing courses teach to catch",
          "This only matters for GET requests",
          "200 always means the request failed",
        ],
        correctIndex: 1,
        explanation:
          "This is the same status/body consistency defect from the API testing course, now considered from the implementation side that would introduce it in the first place.",
      },
      {
        id: "node-8-q3",
        prompt: "Why does consistent response shape across every endpoint matter?",
        choices: [
          "It doesn't matter as long as each endpoint documents its own shape",
          "A client can write generic success/error handling once, instead of special-casing each endpoint's differently-shaped response",
          "Consistent shapes are required by the HTTP specification",
          "It only matters for endpoints returning arrays",
        ],
        correctIndex: 1,
        explanation:
          "Consistency lets client code handle responses generically — inconsistent shapes force special-case handling for every single endpoint.",
      },
    ],
    takeaway:
      "REST resource and status-code design is a real, deliberate contract with the client — the correct status code and a consistent response envelope communicate real information a well-built client can act on.",
    summary:
      "This lesson covered designing resource endpoints and choosing the correct status code for a given outcome, plus why consistent success/error response shapes matter across an entire API, from the implementer's side of the same conventions taught in this curriculum's testing courses.",
    nextLessonSlug: "express-error-handling",
  },
  {
    id: "express-error-handling",
    slug: "express-error-handling",
    title: "Structured Errors: Operational vs. Programmer Errors",
    description:
      "Not every thrown error deserves the same response. Distinguishing an expected, handleable failure from a genuine bug changes what's safe to tell the client.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 8,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["rest-resource-design"],
    objectives: [
      "Distinguish an operational error from a programmer error",
      "Explain why a programmer error's real details should never reach the client directly",
      "Design an error taxonomy with stable, machine-readable codes",
    ],
    skills: ["nodejs", "express", "structured-errors"],
    tech: [{ name: "Express", version: "4.x or 5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Node.js docs: Errors — general strategies",
        url: "https://nodejs.org/api/errors.html",
      },
    ],
    keywords: ["nodejs", "structured errors", "operational errors", "error taxonomy"],
    explanation: `Not every error a server encounters means the same thing, and treating them all identically is itself a real design mistake. An **operational error** is an expected, anticipated failure mode of a correctly-functioning program: a course that doesn't exist, a validation failure, a database connection that's temporarily unavailable. These are *known* possible outcomes, worth designing for explicitly — the \`AppError\` class from earlier in this course, with its stable \`code\` and appropriate \`status\`, exists specifically to represent these.

A **programmer error** is a genuine bug: a \`TypeError\` from calling a method on \`undefined\`, a reference to a variable that doesn't exist, a logic error nobody anticipated. This is fundamentally different from an operational error — it's not a known, designed-for case; it's proof something in the code itself is wrong. The distinction has a direct, practical consequence for what's safe to expose: **an operational error's message is often safe and even helpful to send to the client** ("course not found," "email is required"). **A programmer error's real message and stack trace should never reach the client directly** — beyond being confusing and unhelpful to a legitimate caller, it can leak internal implementation details (file paths, variable names, library internals) that are exactly the kind of information this curriculum's security-awareness lessons teach testers to look for as a vulnerability.

A well-designed centralized error handler treats these differently: for a recognized \`AppError\` (operational), it sends the specific status/code/message the error itself carries. For anything else — an unrecognized error, almost certainly a programmer error — it logs the *real* details internally (for developers to actually fix the bug) but sends the client a deliberately generic message ("An unexpected error occurred") with a generic 500 status, never the raw error text.

An **error taxonomy** — a small, stable, documented set of machine-readable codes (\`VALIDATION_ERROR\`, \`NOT_FOUND\`, \`CONFLICT\`, \`UNAUTHORIZED\`) — lets client code branch on *what kind* of error occurred programmatically, without parsing a human-readable message string that might change wording at any time without warning.`,
    example: {
      language: "javascript",
      description:
        "Distinguishing an operational error (safe details) from a programmer error (details hidden, generic message shown) -- the real decision a centralized error handler makes.",
      code: `class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
    this.isOperational = true;
  }
}

function buildClientResponse(err) {
  if (err.isOperational) {
    return { status: err.status, body: { error: { code: err.code, message: err.message } } };
  }
  // Programmer error: hide the real details, log them internally instead.
  console.error("UNEXPECTED ERROR (needs a fix):", err);
  return { status: 500, body: { error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" } } };
}

console.log(buildClientResponse(new AppError(404, "NOT_FOUND", "Course not found")));
console.log(buildClientResponse(new TypeError("Cannot read properties of undefined")));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Throw a ReferenceError instead of a TypeError and confirm it's still treated as a hidden programmer error.",
      code: `class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
    this.isOperational = true;
  }
}

function buildClientResponse(err) {
  if (err.isOperational) {
    return { status: err.status, body: { error: { code: err.code, message: err.message } } };
  }
  return { status: 500, body: { error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" } } };
}

console.log(buildClientResponse(new ReferenceError("x is not defined")));`,
      editable: true,
    },
    guidedExercise: {
      id: "node-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using AppError and buildClientResponse already defined, confirm the response for an operational error includes the real message, and the response for a non-operational error does NOT include the real message anywhere in its body.",
      starterCode: `class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
    this.isOperational = true;
  }
}

function buildClientResponse(err) {
  if (err.isOperational) {
    return { status: err.status, body: { error: { code: err.code, message: err.message } } };
  }
  return { status: 500, body: { error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" } } };
}

const operationalResponse = buildClientResponse(new AppError(404, "NOT_FOUND", "Course 999 not found"));
const bugResponse = buildClientResponse(new Error("secret internal file path: /etc/config.json"));

let operationalMessageShown = false; // TODO
let bugDetailsHidden = false; // TODO
`,
      solutionCode: `class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
    this.isOperational = true;
  }
}

function buildClientResponse(err) {
  if (err.isOperational) {
    return { status: err.status, body: { error: { code: err.code, message: err.message } } };
  }
  return { status: 500, body: { error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" } } };
}

const operationalResponse = buildClientResponse(new AppError(404, "NOT_FOUND", "Course 999 not found"));
const bugResponse = buildClientResponse(new Error("secret internal file path: /etc/config.json"));

let operationalMessageShown = operationalResponse.body.error.message === "Course 999 not found";
let bugDetailsHidden = !JSON.stringify(bugResponse).includes("/etc/config.json");`,
      harness: `
        try { window.__report('t1', operationalMessageShown === true, 'An operational error\\'s real, safe message should be shown to the client.'); } catch (e) { window.__report('t1', false, 'operationalMessageShown is not defined: ' + e.message); }
        try { window.__report('t2', bugDetailsHidden === true, 'A programmer error\\'s real details must NEVER appear anywhere in the client-facing response.'); } catch (e) { window.__report('t2', false, 'bugDetailsHidden is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "operational error message reaches the client", hidden: false },
        { id: "t2", description: "programmer error details never reach the client", hidden: false },
      ],
      hints: [
        "Check that operationalResponse.body.error.message equals the real message from the AppError.",
        "Stringify bugResponse and confirm the sensitive path never appears anywhere in it.",
      ],
    },
    independentExercise: {
      id: "node-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isValidErrorCode(code) that returns true only for codes matching the taxonomy convention: all uppercase letters and underscores only (like 'VALIDATION_ERROR', 'NOT_FOUND'), false for anything else (lowercase, spaces, mixed case).",
      starterCode: `function isValidErrorCode(code) {
  // TODO
}
`,
      solutionCode: `function isValidErrorCode(code) {
  return /^[A-Z_]+$/.test(code);
}`,
      harness: `
        try { window.__report('t1', isValidErrorCode('VALIDATION_ERROR') === true, 'VALIDATION_ERROR follows the taxonomy convention.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', isValidErrorCode('not_found') === false, 'Lowercase codes do not follow the convention.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', isValidErrorCode('Course not found') === false, 'A human-readable sentence is not a valid machine-readable code.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "accepts a correctly-formatted code", hidden: false },
        { id: "t2", description: "rejects a lowercase code", hidden: false },
        { id: "t3", description: "rejects a human-readable sentence", hidden: false },
      ],
      hints: [
        "A regular expression anchored at both ends, matching only uppercase letters and underscores, checks this directly.",
        "The whole point of a code (versus a message) is that it's stable and machine-parseable, never a sentence.",
      ],
    },
    commonMistakes: [
      "Sending a raw error's message and stack trace directly to the client for any error, including genuine bugs, leaking internal implementation details.",
      "Treating every error identically instead of distinguishing operational (expected, safe to describe) errors from programmer errors (bugs, details hidden).",
      "Using inconsistent, free-text error codes instead of a small, stable, documented taxonomy a client can reliably branch on.",
    ],
    quiz: [
      {
        id: "node-9-q1",
        prompt: "What is the key difference between an operational error and a programmer error?",
        choices: [
          "There is no meaningful difference — all errors should be handled identically",
          "An operational error is an expected, designed-for failure mode; a programmer error indicates an actual bug in the code",
          "Operational errors only happen in production",
          "Programmer errors are always more severe",
        ],
        correctIndex: 1,
        explanation:
          "Operational errors are anticipated, normal outcomes (a missing resource, bad input); programmer errors are evidence something in the code itself is broken.",
      },
      {
        id: "node-9-q2",
        prompt: "Why should a programmer error's real message never reach the client directly?",
        choices: [
          "It's fine to send it — more detail always helps",
          "It can leak internal implementation details (file paths, internals) and is confusing/unhelpful to a legitimate caller",
          "Programmer errors are always shorter than operational errors",
          "This is only a concern for banking applications",
        ],
        correctIndex: 1,
        explanation:
          "An unexpected error's real details are exactly the kind of information this curriculum's security lessons teach testers to check isn't leaked to callers.",
      },
      {
        id: "node-9-q3",
        prompt:
          "Why use a small, stable set of machine-readable error codes instead of relying on the human-readable message?",
        choices: [
          "Codes are required by HTTP",
          "A client can reliably branch on a stable code programmatically, without parsing a message string that could change wording without warning",
          "Messages are always identical to codes",
          "This has no practical benefit",
        ],
        correctIndex: 1,
        explanation:
          "A documented, stable code is safe for client code to depend on programmatically — a human-readable message is not, since its exact wording isn't a contract.",
      },
    ],
    takeaway:
      "Operational errors (expected, safe to describe) and programmer errors (bugs, details hidden) deserve genuinely different treatment — and a stable, documented error-code taxonomy lets clients branch on error type reliably.",
    summary:
      "This lesson distinguished operational errors from programmer errors and covered why only the former's real details are safe to expose to a client, plus the value of a stable, machine-readable error-code taxonomy.",
    nextLessonSlug: "node-config-logging",
  },
  {
    id: "node-config-logging",
    slug: "node-config-logging",
    title: "Environment Configuration and Safe Logging",
    description:
      "Configuration belongs outside your code, not hardcoded inside it — and logs are a real, common place secrets accidentally leak.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["express-error-handling"],
    objectives: [
      "Explain why configuration values belong in environment variables, not hardcoded in source",
      "Write a function that redacts sensitive fields before logging",
      "Identify which fields are sensitive and should never appear in a log",
    ],
    skills: ["nodejs", "configuration", "logging", "security"],
    tech: [{ name: "Node.js", version: "20.x or 22.x LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "The Twelve-Factor App: Config", url: "https://12factor.net/config" },
      {
        label: "OWASP: Logging Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
      },
    ],
    keywords: ["nodejs", "environment variables", "configuration", "safe logging", "redaction"],
    explanation: `A database connection string, an API key, a port number — none of these belong hardcoded directly in source code. **Configuration should come from the environment** (\`process.env.DATABASE_URL\`, conventionally loaded from a \`.env\` file in local development, and from the real hosting platform's environment variable settings in production) for two concrete reasons: it lets the *same code* run correctly against different databases/settings in development, testing, and production without any code change, and it keeps genuine secrets (API keys, database passwords) out of version control entirely — a secret hardcoded in source code is a secret that's now in the project's Git history forever, even if it's later removed from the current file.

**Logging is a real, common, easy-to-overlook place secrets leak.** A request-logging middleware that logs "the full request body, for debugging" will happily log a user's password field on every failed login attempt, or a credit card number, straight into a log file or logging service — often one with broader access than the database itself, and frequently retained far longer. **Safe logging means explicitly redacting known-sensitive fields before anything is written** — \`password\`, \`token\`, \`apiKey\`, \`ssn\`, \`creditCard\`, and any project-specific sensitive field — replacing their value with a fixed placeholder like \`"[REDACTED]"\` rather than logging them verbatim, and doing this centrally (one logging utility every part of the codebase uses) rather than hoping every individual log statement remembers to do it correctly.

This connects directly to the error-handling lesson: a caught error object sometimes contains the very request data that triggered it, including sensitive fields — logging \`console.error(err)\` naively, where \`err\` happens to carry the original request body, can leak exactly the same sensitive data a careless request logger would. The discipline is the same everywhere data might be written to a log: redact known-sensitive fields first, always, centrally.`,
    example: {
      language: "javascript",
      description:
        "A real redaction function, applied before logging -- the exact utility a safe logging setup uses everywhere data is written out.",
      code: `const SENSITIVE_FIELDS = ["password", "token", "apiKey", "creditCard", "ssn"];

function redact(obj) {
  const copy = { ...obj };
  for (const field of SENSITIVE_FIELDS) {
    if (field in copy) copy[field] = "[REDACTED]";
  }
  return copy;
}

const loginAttempt = { email: "ada@example.com", password: "hunter2" };
console.log("Raw (never log this):", loginAttempt);
console.log("Safe to log:", redact(loginAttempt));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Add 'apiKey' to a new test object and confirm redact() masks it correctly.",
      code: `const SENSITIVE_FIELDS = ["password", "token", "apiKey", "creditCard", "ssn"];

function redact(obj) {
  const copy = { ...obj };
  for (const field of SENSITIVE_FIELDS) {
    if (field in copy) copy[field] = "[REDACTED]";
  }
  return copy;
}

console.log(redact({ userId: 42, apiKey: "sk-123456" }));`,
      editable: true,
    },
    guidedExercise: {
      id: "node-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using redact and SENSITIVE_FIELDS already defined, redact a request body containing email, password, AND a nested field 'note' that mentions a password in plain text (this exercise only requires redacting top-level fields, not the note text itself). Confirm password is redacted but email and note pass through unchanged.",
      starterCode: `const SENSITIVE_FIELDS = ["password", "token", "apiKey"];
function redact(obj) {
  const copy = { ...obj };
  for (const field of SENSITIVE_FIELDS) {
    if (field in copy) copy[field] = "[REDACTED]";
  }
  return copy;
}

const body = { email: "ada@example.com", password: "hunter2", note: "forgot my password" };
let result = null; // TODO: call redact(body)
`,
      solutionCode: `const SENSITIVE_FIELDS = ["password", "token", "apiKey"];
function redact(obj) {
  const copy = { ...obj };
  for (const field of SENSITIVE_FIELDS) {
    if (field in copy) copy[field] = "[REDACTED]";
  }
  return copy;
}

const body = { email: "ada@example.com", password: "hunter2", note: "forgot my password" };
let result = redact(body);`,
      harness: `
        try { window.__report('t1', result.password === '[REDACTED]', 'The password field should be redacted.'); } catch (e) { window.__report('t1', false, 'result is not defined: ' + e.message); }
        try { window.__report('t2', result.email === 'ada@example.com', 'email is not a sensitive field and should pass through unchanged.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "redacts the password field", hidden: false },
        { id: "t2", description: "leaves a non-sensitive field unchanged", hidden: false },
      ],
      hints: [
        "Call redact(body) and check the result's fields.",
        "Only fields explicitly listed in SENSITIVE_FIELDS get replaced.",
      ],
    },
    independentExercise: {
      id: "node-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write readConfig(env, key, required) that reads env[key] (simulating process.env). If the value is missing and required is true, throw an Error naming the missing key. If missing and required is false, return undefined. Otherwise return the value.",
      starterCode: `function readConfig(env, key, required) {
  // TODO
}
`,
      solutionCode: `function readConfig(env, key, required) {
  const value = env[key];
  if (value === undefined) {
    if (required) throw new Error("Missing required environment variable: " + key);
    return undefined;
  }
  return value;
}`,
      harness: `
        try {
          const env = { PORT: "3001" };
          window.__report('t1', readConfig(env, 'PORT', true) === '3001', 'A present required variable should be returned.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const env = {};
          readConfig(env, 'DATABASE_URL', true);
          window.__report('t2', false, 'Should have thrown for a missing required variable.');
        } catch (e) {
          window.__report('t2', e.message.includes('DATABASE_URL'), 'The error should name the specific missing variable.');
        }
        try {
          const env = {};
          window.__report('t3', readConfig(env, 'OPTIONAL_FLAG', false) === undefined, 'A missing optional variable should return undefined, not throw.');
        } catch (e) { window.__report('t3', false, 'Should not have thrown for an optional missing variable: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "returns a present required value", hidden: false },
        {
          id: "t2",
          description: "throws a clear error for a missing required value",
          hidden: false,
        },
        { id: "t3", description: "returns undefined for a missing optional value", hidden: false },
      ],
      hints: [
        "Check env[key] for undefined first, then branch on the required flag.",
        "The error message should name the specific missing key, not a generic message.",
      ],
    },
    commonMistakes: [
      "Hardcoding a database URL, API key, or other configuration value directly in source code instead of reading it from an environment variable.",
      "Logging an entire request body or error object verbatim without redacting known-sensitive fields first.",
      "Committing a real .env file (with actual secret values) to version control instead of only a `.env.example` template with blank or placeholder values.",
    ],
    quiz: [
      {
        id: "node-10-q1",
        prompt:
          "Why should configuration values like a database URL come from environment variables instead of being hardcoded?",
        choices: [
          "It makes the code run faster",
          "It lets the same code run correctly across different environments without changes, and keeps secrets out of version control",
          "Environment variables are required by Node.js syntax",
          "There is no real benefit — it's just convention",
        ],
        correctIndex: 1,
        explanation:
          "Environment-based configuration separates code from environment-specific values, and keeps genuine secrets out of the Git history entirely.",
      },
      {
        id: "node-10-q2",
        prompt: "Why is logging a request body without redaction a real security concern?",
        choices: [
          "It isn't — logs are always private and safe",
          "A field like a password can end up written to a log file or service that may have broader access and longer retention than the actual database",
          "This only matters for financial applications",
          "Logging is always disabled in production",
        ],
        correctIndex: 1,
        explanation:
          "Logs are a genuinely common, easy-to-overlook place sensitive data leaks — a naive logger can expose exactly the data a database's access controls were meant to protect.",
      },
      {
        id: "node-10-q3",
        prompt:
          "What is a hardcoded secret's fate once committed to version control, even if later removed from the current file?",
        choices: [
          "It's safely gone once removed",
          "It remains in the project's Git history indefinitely unless that history is specifically rewritten",
          "Git automatically encrypts old secrets",
          "This only applies to public repositories",
        ],
        correctIndex: 1,
        explanation:
          "Removing a secret from the current version of a file does not remove it from history — anyone with repository access can still find it in an earlier commit.",
      },
    ],
    takeaway:
      "Configuration belongs in environment variables, not hardcoded in source, and logging must redact known-sensitive fields centrally — logs are a real, common, easy-to-overlook place secrets leak.",
    summary:
      "This lesson covered why configuration should be environment-driven rather than hardcoded, and built a real redaction function for safely logging data that might contain sensitive fields.",
    nextLessonSlug: "node-config-validation-startup",
  },
  {
    id: "node-config-validation-startup",
    slug: "node-config-validation-startup",
    title: "Configuration Validation and Startup Failures",
    description:
      "A server that starts successfully with broken configuration is worse than one that refuses to start at all — failing fast, loudly, at startup is a deliberate design choice.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["node-config-logging"],
    objectives: [
      "Explain why validating configuration at startup is better than discovering a problem mid-request",
      "Write a startup validation function that checks every required configuration value at once",
      "Design a clear, actionable startup failure message",
    ],
    skills: ["nodejs", "configuration-validation", "startup"],
    tech: [{ name: "Node.js", version: "20.x or 22.x LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [{ label: "The Twelve-Factor App: Config", url: "https://12factor.net/config" }],
    keywords: ["nodejs", "startup validation", "fail fast", "configuration"],
    explanation: `A server missing its \`DATABASE_URL\` environment variable has two very different ways to fail. It can start up successfully, appear healthy, accept traffic — and then throw a confusing error the first time some unlucky request actually tries to touch the database, minutes or hours after the deployment that broke it. Or it can **refuse to start at all**, immediately, with a clear message naming exactly what's missing. The second option is deliberately better engineering, even though it "fails" — a fast, loud, obvious failure at startup is far cheaper to diagnose and fix than a slow, confusing, intermittent one discovered by a real user hitting a broken code path in production.

This is the **fail-fast principle** applied to configuration specifically: **validate every required configuration value once, at startup, before the server ever calls \`listen()\` and starts accepting real traffic.** A startup validator checks that every required environment variable is present, and ideally that its *shape* is sane too (a port that's actually a valid number, a URL that's actually parseable) — collecting every problem found, the same "report everything, not just the first issue" principle from the request-validation lesson, so a developer fixing a broken deployment doesn't have to restart the server repeatedly just to discover each missing variable one at a time.

A good startup failure message is **actionable**, not just descriptive: "Missing required environment variables: DATABASE_URL, JWT_SECRET" tells you exactly what to add to your \`.env\` file. "Configuration error" tells you nothing you can act on. The same specificity principle from the validation and error-handling lessons applies here — a startup failure is a message aimed at whoever's about to fix the deployment, and it should give them everything they need in that one message.`,
    example: {
      language: "javascript",
      description:
        "A real startup validator collecting every missing required variable at once, with an actionable failure message.",
      code: `function validateStartupConfig(env, requiredKeys) {
  const missing = requiredKeys.filter((key) => env[key] === undefined);
  if (missing.length > 0) {
    throw new Error("Missing required environment variables: " + missing.join(", "));
  }
  return true;
}

try {
  validateStartupConfig({ PORT: "3001" }, ["PORT", "DATABASE_URL", "JWT_SECRET"]);
} catch (e) {
  console.log("Startup failed:", e.message);
  // "Startup failed: Missing required environment variables: DATABASE_URL, JWT_SECRET"
}`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add all three required variables to the env object and re-run -- the server should now 'start' successfully.",
      code: `function validateStartupConfig(env, requiredKeys) {
  const missing = requiredKeys.filter((key) => env[key] === undefined);
  if (missing.length > 0) {
    throw new Error("Missing required environment variables: " + missing.join(", "));
  }
  return true;
}

try {
  const started = validateStartupConfig({ PORT: "3001" }, ["PORT", "DATABASE_URL", "JWT_SECRET"]);
  console.log("Started:", started);
} catch (e) {
  console.log("Startup failed:", e.message);
}`,
      editable: true,
    },
    guidedExercise: {
      id: "node-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using validateStartupConfig already defined, confirm it throws for a config missing TWO of three required variables, and that the error message names BOTH missing variables (not just one).",
      starterCode: `function validateStartupConfig(env, requiredKeys) {
  const missing = requiredKeys.filter((key) => env[key] === undefined);
  if (missing.length > 0) {
    throw new Error("Missing required environment variables: " + missing.join(", "));
  }
  return true;
}

const env = { PORT: "3001" };
const required = ["PORT", "DATABASE_URL", "JWT_SECRET"];

let errorMessage = ""; // TODO: catch the thrown error and store its message
`,
      solutionCode: `function validateStartupConfig(env, requiredKeys) {
  const missing = requiredKeys.filter((key) => env[key] === undefined);
  if (missing.length > 0) {
    throw new Error("Missing required environment variables: " + missing.join(", "));
  }
  return true;
}

const env = { PORT: "3001" };
const required = ["PORT", "DATABASE_URL", "JWT_SECRET"];

let errorMessage = "";
try {
  validateStartupConfig(env, required);
} catch (e) {
  errorMessage = e.message;
}`,
      harness: `
        try {
          window.__report('t1', errorMessage.includes('DATABASE_URL'), 'The error message should name DATABASE_URL as missing.');
          window.__report('t2', errorMessage.includes('JWT_SECRET'), 'The error message should ALSO name JWT_SECRET as missing, not just one of the two.');
        } catch (e) { window.__report('t1', false, 'errorMessage is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "names the first missing variable", hidden: false },
        { id: "t2", description: "names the second missing variable too", hidden: false },
      ],
      hints: [
        "Wrap the call in try/catch and store e.message in errorMessage.",
        "The function collects every missing key, not just the first one found.",
      ],
    },
    independentExercise: {
      id: "node-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write validatePort(value) that returns true only if value (a string, as env vars always are) represents a valid port number: parses as an integer, and is between 1 and 65535 inclusive.",
      starterCode: `function validatePort(value) {
  // TODO
}
`,
      solutionCode: `function validatePort(value) {
  const num = Number(value);
  return Number.isInteger(num) && num >= 1 && num <= 65535;
}`,
      harness: `
        try { window.__report('t1', validatePort('3001') === true, 'A normal valid port should pass.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', validatePort('0') === false, 'Port 0 is out of the valid range.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', validatePort('99999') === false, 'A port above 65535 is invalid.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', validatePort('not-a-port') === false, 'A non-numeric string is not a valid port.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "accepts a valid port", hidden: false },
        { id: "t2", description: "rejects a below-range port", hidden: false },
        { id: "t3", description: "rejects an above-range port", hidden: false },
        { id: "t4", description: "rejects a non-numeric value", hidden: false },
      ],
      hints: [
        "Convert to a number first, then check it's a genuine integer within the valid TCP port range.",
        "Number('not-a-port') is NaN, and Number.isInteger(NaN) is false — that case is handled automatically by the integer check.",
      ],
    },
    commonMistakes: [
      "Letting a server start successfully with missing or invalid configuration, only to fail confusingly on the first real request that needs it.",
      "Validating and reporting only the first missing configuration value instead of all of them at once.",
      "Writing a generic 'Configuration error' message instead of naming exactly which value is missing or invalid.",
    ],
    quiz: [
      {
        id: "node-11-q1",
        prompt:
          "Why is a server that refuses to start with broken configuration better than one that starts and fails later?",
        choices: [
          "It isn't better — a running server is always preferable",
          "A fast, loud, obvious failure at startup is far cheaper to diagnose than a confusing, intermittent failure discovered later by a real request",
          "This has no practical difference",
          "Startup failures are always automatically fixed",
        ],
        correctIndex: 1,
        explanation:
          "The fail-fast principle trades an immediately obvious problem for what would otherwise be a much more expensive, confusing failure discovered in production later.",
      },
      {
        id: "node-11-q2",
        prompt:
          "Why should startup validation collect ALL missing configuration values instead of stopping at the first one?",
        choices: [
          "It shouldn't — stopping early is always better",
          "So a developer fixing a broken deployment doesn't have to restart the server repeatedly to discover each missing variable one at a time",
          "Collecting multiple errors is not possible in Node.js",
          "This has no practical benefit",
        ],
        correctIndex: 1,
        explanation:
          "This mirrors the request-validation lesson's principle — reporting everything at once saves repeated fix-and-retry cycles.",
      },
      {
        id: "node-11-q3",
        prompt: "What makes a startup failure message actionable rather than merely descriptive?",
        choices: [
          "Using technical jargon",
          "Naming exactly which value is missing or invalid, so the person fixing it knows precisely what to add or correct",
          "Keeping the message as short as possible, even if vague",
          "Actionable messages are not possible for configuration errors",
        ],
        correctIndex: 1,
        explanation:
          'A message like "Missing DATABASE_URL, JWT_SECRET" tells you exactly what to fix — a generic "configuration error" gives no actionable next step.',
      },
    ],
    takeaway:
      "Validating configuration once at startup — failing fast and loudly with a specific, actionable message naming every problem — is deliberately better engineering than discovering a broken configuration mid-request in production.",
    summary:
      "This lesson covered the fail-fast principle for configuration, built a startup validator that reports every missing variable at once, and covered what makes a startup failure message genuinely actionable.",
    nextLessonSlug: "express-security-auth-boundaries",
  },
  {
    id: "express-security-auth-boundaries",
    slug: "express-security-auth-boundaries",
    title: "Security Fundamentals and Authentication Boundaries",
    description:
      "Baseline server-side security every API needs, and where authentication responsibility genuinely ends — without building an unsafe, from-scratch auth system.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 22,
    prerequisites: ["node-config-validation-startup"],
    objectives: [
      "Implement an authorization-check middleware distinguishing 401 from 403",
      "Explain why this course does not implement a from-scratch password/session system",
      "Identify baseline security headers and practices a real Express API needs",
    ],
    skills: ["nodejs", "express", "security", "authentication"],
    tech: [{ name: "Express", version: "4.x or 5.x" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/" },
      {
        label: "OWASP Cheat Sheet: Authentication",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
      },
    ],
    keywords: ["express", "security", "authentication", "authorization", "owasp"],
    explanation: `**This lesson deliberately does not walk through building a password-hashing or session system from scratch.** Real authentication — securely storing credentials, issuing and validating sessions or tokens, handling password resets safely — has decades of accumulated, hard-won security research behind it, and a hand-rolled version built for a lesson is a genuinely unsafe thing to present as a real pattern; the honest, responsible content here is *how to use* a maintained authentication library or service correctly, and precisely where an API's own responsibility begins once a request arrives already claiming to be authenticated — not how to build the credential-storage layer yourself.

**Authorization middleware, from the server's implementing side, is the direct counterpart to the 401-vs-403 distinction this curriculum's testing courses teach from the outside.** A real authorization-check middleware reads whatever identifies the caller (a verified token, a session), and decides: is there no valid identity at all (401 — authentication failed), or is there a valid identity that simply isn't permitted to do this specific thing (403 — authorization failed)? Getting this distinction right in the actual middleware is what makes it correctly testable from the outside, closing the loop with the API-testing course's own lesson on the same topic.

Beyond authentication specifically, a handful of baseline practices apply to any real Express API: **never trust client-supplied data for authorization decisions** (a \`role\` field sent in the request body, rather than read from a verified, server-issued token, can be set to anything by the client); **set basic security-related HTTP headers** (a library like \`helmet\` handles the well-known baseline set in one line, rather than hand-rolling each one); and **rate-limit** authentication-adjacent endpoints specifically, since a login endpoint with no rate limit is a direct invitation to credential-stuffing attempts.`,
    example: {
      language: "javascript",
      description:
        "A real authorization-check middleware distinguishing 401 from 403 -- the implementation side of the same distinction the API-testing course teaches from the outside.",
      code: `function requireOwnership(req, res, next) {
  if (!req.user) {
    res.status = 401; // no valid identity at all
    return;
  }
  const resourceOwnerId = req.resource?.ownerId;
  if (req.user.id !== resourceOwnerId) {
    res.status = 403; // valid identity, but not permitted for THIS resource
    return;
  }
  next();
}

const req1 = { user: null, resource: { ownerId: 7 } };
const res1 = {};
requireOwnership(req1, res1, () => console.log("allowed"));
console.log(res1.status); // 401

const req2 = { user: { id: 5 }, resource: { ownerId: 7 } };
const res2 = {};
requireOwnership(req2, res2, () => console.log("allowed"));
console.log(res2.status); // 403`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change req2's user.id to match resource.ownerId (both 7) and re-run -- confirm next() is called and no status is set.",
      code: `function requireOwnership(req, res, next) {
  if (!req.user) {
    res.status = 401;
    return;
  }
  const resourceOwnerId = req.resource?.ownerId;
  if (req.user.id !== resourceOwnerId) {
    res.status = 403;
    return;
  }
  next();
}

const req2 = { user: { id: 5 }, resource: { ownerId: 7 } };
const res2 = {};
requireOwnership(req2, res2, () => console.log("allowed"));
console.log(res2.status);`,
      editable: true,
    },
    guidedExercise: {
      id: "node-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using requireOwnership already defined, run it for a request where req.user is a valid user (id: 3) but req.resource.ownerId is a DIFFERENT user (id: 9). Store the resulting res.status.",
      starterCode: `function requireOwnership(req, res, next) {
  if (!req.user) { res.status = 401; return; }
  const resourceOwnerId = req.resource?.ownerId;
  if (req.user.id !== resourceOwnerId) { res.status = 403; return; }
  next();
}

const req = { user: { id: 3 }, resource: { ownerId: 9 } };
const res = {};
requireOwnership(req, res, () => {});

let resultStatus = null; // TODO: read res.status
`,
      solutionCode: `function requireOwnership(req, res, next) {
  if (!req.user) { res.status = 401; return; }
  const resourceOwnerId = req.resource?.ownerId;
  if (req.user.id !== resourceOwnerId) { res.status = 403; return; }
  next();
}

const req = { user: { id: 3 }, resource: { ownerId: 9 } };
const res = {};
requireOwnership(req, res, () => {});

let resultStatus = res.status;`,
      harness: `
        try { window.__report('t1', resultStatus === 403, 'An authenticated user (id 3) trying to access a resource owned by someone else (id 9) should get 403, not 401.'); } catch (e) { window.__report('t1', false, 'resultStatus is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly returns 403 for a real but unauthorized user",
          hidden: false,
        },
      ],
      hints: [
        "req.user IS present here (id 3), so the 401 branch doesn't apply.",
        "The mismatch between req.user.id (3) and resource.ownerId (9) is exactly the authorization failure that maps to 403.",
      ],
    },
    independentExercise: {
      id: "node-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isTrustworthySource(fieldSource) that returns true only for 'verified-token' (server-verified data), false for 'request-body' or 'query-string' (client-supplied data that should never be trusted for an authorization decision).",
      starterCode: `function isTrustworthySource(fieldSource) {
  // TODO
}
`,
      solutionCode: `function isTrustworthySource(fieldSource) {
  return fieldSource === "verified-token";
}`,
      harness: `
        try { window.__report('t1', isTrustworthySource('verified-token') === true, 'Data from a server-verified token is trustworthy for authorization decisions.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', isTrustworthySource('request-body') === false, 'A role field sent in the request body is client-supplied and must not be trusted for authorization.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "trusts verified-token data", hidden: false },
        { id: "t2", description: "does not trust request-body data", hidden: false },
      ],
      hints: [
        "Only data verified server-side (from a real, validated token) should ever influence an authorization decision.",
        "Anything the client sent directly, unverified, is not a safe basis for deciding what that client is allowed to do.",
      ],
    },
    commonMistakes: [
      "Reading a 'role' or 'isAdmin' field directly from the client-supplied request body to make an authorization decision, when a client can set that field to anything.",
      "Returning 401 for an authorization failure (valid user, wrong permission) instead of the correct 403, or vice versa.",
      "Building a from-scratch password storage or session system for a real project instead of using a maintained, audited authentication library or service.",
    ],
    quiz: [
      {
        id: "node-12-q1",
        prompt:
          "Why is a 'role' field sent directly in a request body unsafe to use for an authorization decision?",
        choices: [
          "It's perfectly safe as long as the field name is unusual",
          "A client can set any value it wants in its own request body, so it can't be trusted as proof of a real permission",
          "Request bodies cannot contain role information",
          "This only matters for GET requests",
        ],
        correctIndex: 1,
        explanation:
          "Only data verified server-side (from a validated token or session) is trustworthy for authorization — client-supplied data is, by definition, whatever the client chose to send.",
      },
      {
        id: "node-12-q2",
        prompt:
          "Why does this lesson explicitly not walk through building a password/session system from scratch?",
        choices: [
          "It's too easy to be worth teaching",
          "Real credential storage and session handling require deep, specialized security expertise, and a hand-rolled version presented as a real pattern would be genuinely unsafe",
          "Node.js does not support authentication",
          "This topic is out of scope for backend development entirely",
        ],
        correctIndex: 1,
        explanation:
          "Presenting a simplified, hand-rolled auth system as a real-world pattern would be actively harmful — the responsible content is how to use a maintained solution correctly and where an API's own authorization logic begins.",
      },
      {
        id: "node-12-q3",
        prompt:
          "What is the correct status code for a valid, authenticated user attempting an action they don't have permission for?",
        choices: ["401", "403", "404", "500"],
        correctIndex: 1,
        explanation:
          "This is an authorization failure, not an authentication failure — the identity is known and valid, but the permission is denied, which is exactly what 403 communicates.",
      },
    ],
    takeaway:
      "Authorization decisions must rely only on server-verified data, never client-supplied fields — and the 401-vs-403 distinction from this curriculum's testing courses has a direct, correct implementation on the server side, without needing a hand-rolled credential system.",
    summary:
      "This lesson covered implementing a real authorization-check middleware that correctly distinguishes 401 from 403, why this course doesn't teach building auth from scratch, and baseline security practices every real Express API needs.",
    nextLessonSlug: "express-automated-testing",
  },
  {
    id: "express-automated-testing",
    slug: "express-automated-testing",
    title: "Automated Testing for Routes and Services",
    description:
      "Test the pieces of a real Express API the way this curriculum's testing courses teach — separating logic from routing so most of it never needs a running server at all.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 12,
    difficulty: "advanced",
    estimatedMinutes: 30,
    prerequisites: ["express-security-auth-boundaries"],
    objectives: [
      "Separate business logic (services) from routing so logic is testable without an HTTP layer",
      "Write an isolated test for a service function using the setup/act/assert/teardown structure",
      "Add a real automated test suite to a local Express project and run it",
    ],
    skills: ["nodejs", "express", "testing"],
    tech: [
      { name: "Node.js", version: "20.x or 22.x LTS" },
      { name: "Express", version: "4.x or 5.x" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      { label: "Node.js docs: Test runner", url: "https://nodejs.org/api/test.html" },
      {
        label: "supertest (HTTP assertions for Express)",
        url: "https://github.com/ladjs/supertest",
      },
    ],
    keywords: ["nodejs", "express", "automated testing", "unit testing", "integration testing"],
    explanation: `A route handler that mixes HTTP concerns (\`req\`, \`res\`, status codes) directly with business logic (validating an enrollment, computing a total) forces every test of that logic through the HTTP layer, even for logic that has nothing to do with HTTP at all. **Separating logic into plain functions — a "service" layer — that route handlers call, but that don't themselves know about \`req\`/\`res\`, makes the actual business logic testable in complete isolation**, the same "extract the reusable, independently-testable piece" instinct from this curriculum's React course, applied to a backend.

A service function like \`createEnrollment(courseRepository, courseId, learnerId)\` can be tested directly — call it, assert on what it returns or what it did to its dependencies — with no server running, no port bound, no real HTTP request involved at all. This is dramatically faster and more reliable than spinning up the whole server for every test, and it's exactly the **setup/act/assert/teardown** structure and test-isolation discipline from this curriculum's API Testing and Automation course: each test creates its own fresh state, doesn't depend on another test's leftover data, and can run alone or in any order.

Testing the **HTTP layer itself** — does \`POST /enrollments\` actually return 201 with the right body, does an invalid request actually get a 400 — is still valuable and necessary, but it's a genuinely different, smaller layer of testing sitting on top of well-tested service logic, typically using a library like \`supertest\` to make real requests against the Express app without needing a separately-running server process.

This lesson's guided local lab adds a real, running automated test suite to the Express project built throughout this course — testing both the service logic in isolation and a couple of the actual HTTP routes.`,
    example: {
      language: "javascript",
      description:
        "Business logic extracted as a plain, testable function -- no req/res, no HTTP layer, directly testable the way the guided local lab's real service tests will be.",
      code: `function createEnrollment(existingEnrollments, courseId, learnerId) {
  const alreadyEnrolled = existingEnrollments.some(
    (e) => e.courseId === courseId && e.learnerId === learnerId,
  );
  if (alreadyEnrolled) {
    throw new Error("Already enrolled in this course");
  }
  return { id: existingEnrollments.length + 1, courseId, learnerId, status: "active" };
}

// No req, no res, no server -- just a function, testable directly.
const enrollments = [];
const newEnrollment = createEnrollment(enrollments, 1, 42);
console.log(newEnrollment);`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call createEnrollment a second time with the SAME courseId and learnerId, wrapped in try/catch, to see the duplicate-enrollment guard fire.",
      code: `function createEnrollment(existingEnrollments, courseId, learnerId) {
  const alreadyEnrolled = existingEnrollments.some(
    (e) => e.courseId === courseId && e.learnerId === learnerId,
  );
  if (alreadyEnrolled) {
    throw new Error("Already enrolled in this course");
  }
  return { id: existingEnrollments.length + 1, courseId, learnerId, status: "active" };
}

const enrollments = [{ id: 1, courseId: 1, learnerId: 42, status: "active" }];
try {
  createEnrollment(enrollments, 1, 42);
} catch (e) {
  console.log("Correctly rejected:", e.message);
}`,
      editable: true,
    },
    guidedExercise: {
      id: "node-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using createEnrollment already defined, write an isolated test: setup a fresh empty enrollments array, act by creating one enrollment, assert its shape is correct. Store the assertion result in isCorrect.",
      starterCode: `function createEnrollment(existingEnrollments, courseId, learnerId) {
  const alreadyEnrolled = existingEnrollments.some(
    (e) => e.courseId === courseId && e.learnerId === learnerId,
  );
  if (alreadyEnrolled) throw new Error("Already enrolled in this course");
  return { id: existingEnrollments.length + 1, courseId, learnerId, status: "active" };
}

// setup
const freshEnrollments = [];
// act
const result = createEnrollment(freshEnrollments, 3, 99);
// assert
let isCorrect = false; // TODO: check result.courseId === 3, result.learnerId === 99, result.status === "active"
`,
      solutionCode: `function createEnrollment(existingEnrollments, courseId, learnerId) {
  const alreadyEnrolled = existingEnrollments.some(
    (e) => e.courseId === courseId && e.learnerId === learnerId,
  );
  if (alreadyEnrolled) throw new Error("Already enrolled in this course");
  return { id: existingEnrollments.length + 1, courseId, learnerId, status: "active" };
}

const freshEnrollments = [];
const result = createEnrollment(freshEnrollments, 3, 99);
let isCorrect = result.courseId === 3 && result.learnerId === 99 && result.status === "active";`,
      harness: `
        try { window.__report('t1', isCorrect === true, 'The new enrollment should have the correct courseId, learnerId, and a default active status.'); } catch (e) { window.__report('t1', false, 'isCorrect is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly asserts the created enrollment's shape",
          hidden: false,
        },
      ],
      hints: [
        "This is exactly the setup/act/assert structure: fresh state, one action, one check.",
        "Check all three fields together with &&.",
      ],
    },
    independentExercise: {
      id: "node-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a test function testDuplicateEnrollmentRejected() using createEnrollment (already defined below): it should set up an enrollments array that ALREADY contains an enrollment for courseId 1 / learnerId 42, then assert that calling createEnrollment again with the same courseId/learnerId throws an error containing the word 'enrolled'. Return true if the test passes (correctly throws), false otherwise.",
      starterCode: `function createEnrollment(existingEnrollments, courseId, learnerId) {
  const alreadyEnrolled = existingEnrollments.some(
    (e) => e.courseId === courseId && e.learnerId === learnerId,
  );
  if (alreadyEnrolled) throw new Error("Already enrolled in this course");
  return { id: existingEnrollments.length + 1, courseId, learnerId, status: "active" };
}

function testDuplicateEnrollmentRejected() {
  // TODO
}
`,
      solutionCode: `function createEnrollment(existingEnrollments, courseId, learnerId) {
  const alreadyEnrolled = existingEnrollments.some(
    (e) => e.courseId === courseId && e.learnerId === learnerId,
  );
  if (alreadyEnrolled) throw new Error("Already enrolled in this course");
  return { id: existingEnrollments.length + 1, courseId, learnerId, status: "active" };
}

function testDuplicateEnrollmentRejected() {
  const existing = [{ id: 1, courseId: 1, learnerId: 42, status: "active" }];
  try {
    createEnrollment(existing, 1, 42);
    return false; // should have thrown
  } catch (e) {
    return e.message.toLowerCase().includes("enrolled");
  }
}`,
      harness: `
        try { window.__report('t1', testDuplicateEnrollmentRejected() === true, 'The test should confirm createEnrollment throws a relevant error for a duplicate enrollment.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "the test correctly verifies duplicate rejection", hidden: false },
      ],
      hints: [
        "Set up existing state that already has the duplicate, then wrap the act step in try/catch.",
        "If no error is thrown, the test should report failure (false), since a duplicate should have been rejected.",
      ],
    },
    guidedLocalLab: {
      id: "express-testing-lab",
      title: "Add Automated Tests and Graceful Shutdown",
      scenario:
        "Extract the enrollment logic from your local Express project into a testable service layer, add a real automated test suite covering both the service and the HTTP routes, and implement graceful shutdown.",
      requiredTools: [
        { name: "Node.js", version: "20.x or 22.x LTS" },
        { name: "npm", version: "10.x (bundled with Node.js)" },
      ],
      setupSteps: [
        "Reuse the `learning-api` project from earlier in this course.",
        "Run `npm install --save-dev vitest supertest`.",
        'Add `"test": "vitest run"` to the `scripts` section of package.json.',
        "Add the files below, then run `npm test`.",
      ],
      projectStructure:
        "learning-api/\n  src/\n    server.js\n    errors.js\n    services/\n      enrollments.service.js (new)\n    routes/\n      courses.routes.js\n      enrollments.routes.js (updated: uses the service)\n  tests/\n    enrollments.service.test.js (new)\n    enrollments.routes.test.js (new)",
      starterFiles: [
        {
          path: "src/services/enrollments.service.js",
          content: `export function createEnrollment(existingEnrollments, courseId, learnerId) {
  const alreadyEnrolled = existingEnrollments.some(
    (e) => e.courseId === courseId && e.learnerId === learnerId,
  );
  if (alreadyEnrolled) {
    throw new Error("Already enrolled in this course");
  }
  return { id: existingEnrollments.length + 1, courseId, learnerId, status: "active" };
}`,
        },
        {
          path: "tests/enrollments.service.test.js",
          content: `import { describe, it, expect } from "vitest";
import { createEnrollment } from "../src/services/enrollments.service.js";

describe("createEnrollment", () => {
  it("creates a new enrollment with active status", () => {
    // TODO: setup fresh state, act, assert -- following this lesson's pattern
  });

  it("rejects a duplicate enrollment for the same course and learner", () => {
    // TODO
  });
});`,
        },
        {
          path: "tests/enrollments.routes.test.js",
          content: `import { describe, it, expect } from "vitest";
// TODO: import supertest and your Express app (you may need to export
// "app" from server.js separately from the app.listen() call so tests
// can import it without actually starting a real server).

describe("POST /enrollments", () => {
  it("returns 201 and the created enrollment for a valid request", async () => {
    // TODO
  });

  it("returns 400 for an invalid request", async () => {
    // TODO
  });
});`,
        },
      ],
      requirements: [
        "The enrollment-creation logic lives in a plain, testable service function with no req/res dependency",
        "At least two isolated service-level tests exist: one for successful creation, one for the duplicate-rejection case",
        "At least two HTTP-level tests exist using supertest: one for a valid POST (expects 201), one for an invalid POST (expects 400)",
        "`npm test` runs the full suite successfully with zero failures",
        "The server implements graceful shutdown: on SIGTERM, it stops accepting new connections and exits cleanly rather than terminating abruptly",
      ],
      commands: [{ description: "Run the test suite", command: "npm test" }],
      expectedBehavior:
        "Running npm test executes all four tests (two service-level, two HTTP-level) and reports them all passing, with no server left running afterward and no port conflicts on repeated runs.",
      verificationSteps: [
        {
          command: "npm test",
          expectedResult: "All tests pass; the test process exits cleanly (does not hang)",
        },
        {
          command:
            "Run the server, then send it a SIGTERM (Ctrl+C in most terminals sends SIGINT, which behaves similarly for this purpose)",
          expectedResult:
            "The server logs a shutdown message and exits, rather than terminating instantly mid-request",
        },
      ],
      troubleshooting: [
        {
          issue: "supertest tests hang and never complete",
          fix: "Confirm server.js exports the Express `app` object separately from calling app.listen() — tests should import and use the app directly with supertest, which manages its own ephemeral server, rather than connecting to a real running instance.",
        },
        {
          issue: "npm test fails with 'vitest: command not found'",
          fix: "Confirm vitest was installed as a devDependency (npm install --save-dev vitest) and that the test script in package.json matches exactly.",
        },
      ],
      hints: [
        "A service-level test needs no HTTP library at all — just call the function directly with plain JavaScript values.",
        "supertest lets you write `await request(app).post('/enrollments').send({...}).expect(201)` directly against the Express app object, no running server required.",
      ],
      referenceSolution: {
        summary:
          "The service tests directly call createEnrollment with fresh in-memory arrays for setup/act/assert; the route tests use supertest against the exported app to make real HTTP-shaped requests and assert on status codes and response bodies, without a separately-running server process.",
        files: [
          {
            path: "tests/enrollments.service.test.js (relevant excerpt)",
            content: `it("creates a new enrollment with active status", () => {
  const fresh = [];
  const result = createEnrollment(fresh, 1, 42);
  expect(result.status).toBe("active");
  expect(result.courseId).toBe(1);
});

it("rejects a duplicate enrollment for the same course and learner", () => {
  const existing = [{ id: 1, courseId: 1, learnerId: 42, status: "active" }];
  expect(() => createEnrollment(existing, 1, 42)).toThrow(/enrolled/i);
});`,
          },
        ],
      },
      extensionChallenge:
        "Add a test confirming that two DIFFERENT learners can both enroll in the SAME course without triggering the duplicate-rejection guard, exercising the boundary of what counts as a 'duplicate.'",
    },
    commonMistakes: [
      "Mixing business logic directly into route handlers, forcing every test of that logic through a full HTTP request/response cycle even when it isn't necessary.",
      "Writing tests that depend on a real, separately-running server process instead of testing the exported Express app object directly.",
      "Never testing the duplicate/rejection/error paths, only the happy path where everything succeeds.",
    ],
    quiz: [
      {
        id: "node-13-q1",
        prompt: "Why does extracting business logic into a service layer make it easier to test?",
        choices: [
          "It doesn't — testing is equally easy either way",
          "A plain function with no req/res dependency can be called and asserted on directly, with no HTTP layer or running server involved at all",
          "Service layers are required by Express",
          "This only matters for very large applications",
        ],
        correctIndex: 1,
        explanation:
          "Logic decoupled from req/res can be tested in complete isolation — faster, simpler, and without needing to simulate an HTTP request at all.",
      },
      {
        id: "node-13-q2",
        prompt:
          "What does supertest let you test without a real, separately-running server process?",
        choices: [
          "Nothing — a real server is always required",
          "The actual HTTP behavior of an Express app (status codes, response bodies) by making requests directly against the exported app object",
          "Only database queries",
          "Only middleware, not routes",
        ],
        correctIndex: 1,
        explanation:
          "supertest works directly against the Express app object, managing its own ephemeral connection, so tests don't need a real listening server on a real port.",
      },
      {
        id: "node-13-q3",
        prompt:
          "Why does this lesson's guided local lab include both service-level and route-level tests?",
        choices: [
          "Redundancy for no real reason",
          "They test genuinely different layers — service tests verify business logic in isolation, route tests verify the actual HTTP contract (status codes, response shape) built on top of it",
          "Only one type of test is actually necessary",
          "Route-level tests replace the need for service-level tests entirely",
        ],
        correctIndex: 1,
        explanation:
          "Each layer can have its own bugs — logic bugs live in the service layer, while HTTP-contract bugs (wrong status code, wrong response shape) live specifically in the routing layer.",
      },
    ],
    takeaway:
      "Extracting business logic into plain, testable service functions makes most of an API's real behavior verifiable without any HTTP layer at all — with a smaller set of route-level tests confirming the actual HTTP contract on top.",
    summary:
      "This lesson covered separating logic from routing for testability and the setup/act/assert structure from browser exercises, then added a real service-level and HTTP-level automated test suite (plus graceful shutdown) to a local Express project via the guided local lab.",
    nextLessonSlug: "node-operational-readiness",
  },
  {
    id: "node-operational-readiness",
    slug: "node-operational-readiness",
    title: "Graceful Shutdown and Operational Readiness",
    description:
      "What actually happens when a real server needs to stop — and why an abrupt, ungraceful shutdown can silently drop in-flight work that a slightly more careful one wouldn't.",
    trackSlug: "node-express",
    courseSlug: "nodejs-express-backend-development",
    order: 13,
    difficulty: "advanced",
    estimatedMinutes: 20,
    prerequisites: ["express-automated-testing"],
    objectives: [
      "Explain what SIGTERM is and why a production process receives it during a normal deployment",
      "Implement a graceful shutdown sequence as an explicit state machine",
      "Design a basic health-check endpoint and explain what it should and shouldn't check",
    ],
    skills: ["nodejs", "graceful-shutdown", "operational-readiness"],
    tech: [{ name: "Node.js", version: "20.x or 22.x LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Node.js docs: Signal Events",
        url: "https://nodejs.org/api/process.html#signal-events",
      },
    ],
    keywords: ["nodejs", "graceful shutdown", "sigterm", "health check", "operational readiness"],
    explanation: `Every deployment eventually needs to stop an old, running server process to replace it with a new one. The hosting platform doesn't do this violently by default — it sends the process a **\`SIGTERM\`** signal, a polite, standard request meaning "please finish up and exit," giving the process a window of time (commonly around 10-30 seconds, platform-dependent) before it escalates to a forceful, unstoppable \`SIGKILL\` that terminates the process immediately with zero opportunity to clean up anything.

**An abrupt shutdown with no handling at all can silently drop in-flight work**: a request that was halfway through being processed when the process dies gets no response at all — not an error, nothing, just a connection that goes dead from the client's perspective. A database write that was mid-transaction can leave data in an inconsistent state. **A graceful shutdown sequence, listening explicitly for \`SIGTERM\`, does three things in order**: stop accepting *new* incoming connections (so nothing new starts that won't have time to finish), wait for requests already in progress to actually complete, and only then close remaining resources (database connections, file handles) and exit cleanly. Node's own \`http.Server\` provides exactly the primitive for the first two steps: calling \`server.close()\` stops accepting new connections immediately while letting existing ones finish naturally, and its callback fires only once every existing connection has actually closed.

**A health-check endpoint** (\`GET /health\`, conventionally) exists so a load balancer or orchestration platform can ask "is this instance actually ready to receive traffic?" before routing real requests to it, and can detect an instance that's become unhealthy after running for a while. A good health check verifies the specific things that would make the server unable to genuinely serve requests (a database connection is actually reachable, not just that the process is running) — but it should stay fast and lightweight, not itself perform expensive work or depend on things unrelated to whether *this* server can serve *its own* requests correctly.`,
    example: {
      language: "javascript",
      description:
        "A real graceful-shutdown state machine, modeling the exact sequence a production Node server follows on SIGTERM.",
      code: `function createShutdownManager() {
  let state = "running";
  let inFlightRequests = 0;

  return {
    getState() { return state; },
    startRequest() { inFlightRequests += 1; },
    finishRequest() { inFlightRequests -= 1; },
    beginShutdown() {
      state = "draining"; // stop accepting NEW work, but let existing work finish
    },
    isReadyToExit() {
      return state === "draining" && inFlightRequests === 0;
    },
  };
}

const manager = createShutdownManager();
manager.startRequest();
manager.beginShutdown();
console.log("Ready to exit while a request is in flight?", manager.isReadyToExit()); // false
manager.finishRequest();
console.log("Ready to exit now?", manager.isReadyToExit()); // true`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Start TWO requests before beginning shutdown, finish only one, and check isReadyToExit() -- should still be false.",
      code: `function createShutdownManager() {
  let state = "running";
  let inFlightRequests = 0;
  return {
    getState() { return state; },
    startRequest() { inFlightRequests += 1; },
    finishRequest() { inFlightRequests -= 1; },
    beginShutdown() { state = "draining"; },
    isReadyToExit() { return state === "draining" && inFlightRequests === 0; },
  };
}

const manager = createShutdownManager();
manager.startRequest();
manager.startRequest();
manager.beginShutdown();
manager.finishRequest();
console.log(manager.isReadyToExit());`,
      editable: true,
    },
    guidedExercise: {
      id: "node-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using createShutdownManager already defined, simulate three in-flight requests, begin shutdown, finish all three, then confirm isReadyToExit() is true. Also confirm it was false partway through (after finishing only two of three).",
      starterCode: `function createShutdownManager() {
  let state = "running";
  let inFlightRequests = 0;
  return {
    startRequest() { inFlightRequests += 1; },
    finishRequest() { inFlightRequests -= 1; },
    beginShutdown() { state = "draining"; },
    isReadyToExit() { return state === "draining" && inFlightRequests === 0; },
  };
}

const manager = createShutdownManager();
manager.startRequest();
manager.startRequest();
manager.startRequest();
manager.beginShutdown();
manager.finishRequest();
manager.finishRequest();

let partwayReady = null; // TODO: read isReadyToExit() here (after 2 of 3 finished)

manager.finishRequest();

let fullyReady = null; // TODO: read isReadyToExit() here (after all 3 finished)
`,
      solutionCode: `function createShutdownManager() {
  let state = "running";
  let inFlightRequests = 0;
  return {
    startRequest() { inFlightRequests += 1; },
    finishRequest() { inFlightRequests -= 1; },
    beginShutdown() { state = "draining"; },
    isReadyToExit() { return state === "draining" && inFlightRequests === 0; },
  };
}

const manager = createShutdownManager();
manager.startRequest();
manager.startRequest();
manager.startRequest();
manager.beginShutdown();
manager.finishRequest();
manager.finishRequest();

let partwayReady = manager.isReadyToExit();

manager.finishRequest();

let fullyReady = manager.isReadyToExit();`,
      harness: `
        try { window.__report('t1', partwayReady === false, 'With one request still in flight, the manager should not be ready to exit yet.'); } catch (e) { window.__report('t1', false, 'partwayReady is not defined: ' + e.message); }
        try { window.__report('t2', fullyReady === true, 'Once every in-flight request has finished, the manager should be ready to exit.'); } catch (e) { window.__report('t2', false, 'fullyReady is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "not ready while a request is still in flight", hidden: false },
        { id: "t2", description: "ready once every request has finished", hidden: false },
      ],
      hints: [
        "Call isReadyToExit() at both points and store its result before continuing.",
        "Readiness requires BOTH the draining state AND zero in-flight requests.",
      ],
    },
    independentExercise: {
      id: "node-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a simplified health check: isHealthy(databaseReachable, startupComplete) that returns true only if BOTH databaseReachable and startupComplete are true. Then write healthCheckResponse(isHealthyValue) returning { status: 200, body: { status: 'ok' } } if healthy, or { status: 503, body: { status: 'unavailable' } } if not.",
      starterCode: `function isHealthy(databaseReachable, startupComplete) {
  // TODO
}
function healthCheckResponse(isHealthyValue) {
  // TODO
}
`,
      solutionCode: `function isHealthy(databaseReachable, startupComplete) {
  return databaseReachable && startupComplete;
}
function healthCheckResponse(isHealthyValue) {
  return isHealthyValue
    ? { status: 200, body: { status: "ok" } }
    : { status: 503, body: { status: "unavailable" } };
}`,
      harness: `
        try { window.__report('t1', isHealthy(true, true) === true, 'Both conditions true should be healthy.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', isHealthy(false, true) === false, 'An unreachable database should make the service unhealthy.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try {
          const response = healthCheckResponse(false);
          window.__report('t3', response.status === 503, 'An unhealthy response should use status 503, not 200.');
        } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "healthy when both conditions are true", hidden: false },
        { id: "t2", description: "unhealthy when the database is unreachable", hidden: false },
        { id: "t3", description: "returns 503 for an unhealthy result", hidden: false },
      ],
      hints: [
        "Both conditions must be true for a genuinely healthy service — a partial success is still not ready.",
        "503 Service Unavailable is the conventional status for a health check reporting the service isn't ready.",
      ],
    },
    commonMistakes: [
      "Terminating a process immediately on shutdown with no handling at all, silently dropping requests that were still in progress.",
      "A health check that only confirms the process is running, without checking whether it can actually reach the dependencies (like a database) it needs to genuinely serve requests.",
      "A health check that itself performs slow, expensive work, becoming a performance problem for whatever's calling it frequently.",
    ],
    quiz: [
      {
        id: "node-14-q1",
        prompt:
          "What does SIGTERM represent, and why does a production process typically receive it during a deployment?",
        choices: [
          "An immediate, forceful termination with no chance to clean up",
          "A polite request to finish up and exit, giving the process a window of time before a forceful SIGKILL follows",
          "A signal that means the process crashed",
          "A signal only relevant to Windows systems",
        ],
        correctIndex: 1,
        explanation:
          "SIGTERM is specifically the graceful stop signal — it gives a process the opportunity to finish in-flight work and exit cleanly before an unstoppable SIGKILL would follow.",
      },
      {
        id: "node-14-q2",
        prompt: "What are the three ordered steps of a graceful shutdown sequence?",
        choices: [
          "Exit immediately, then log, then clean up",
          "Stop accepting new connections, wait for in-flight requests to finish, then close remaining resources and exit",
          "Close the database, then stop the server, then log",
          "There is no meaningful order — all steps happen simultaneously",
        ],
        correctIndex: 1,
        explanation:
          "This order specifically prevents new work from starting that won't have time to finish, while letting already-accepted work complete naturally before anything closes.",
      },
      {
        id: "node-14-q3",
        prompt: "What should a good health-check endpoint verify?",
        choices: [
          "Only that the process is running, nothing else",
          "The specific things that would make the server genuinely unable to serve requests, like whether a required database is actually reachable",
          "Every possible feature of the entire application, however slow",
          "Health checks are unnecessary for real APIs",
        ],
        correctIndex: 1,
        explanation:
          "A meaningful health check verifies real readiness to serve requests (like dependency connectivity), while staying fast and avoiding unrelated or expensive work.",
      },
    ],
    takeaway:
      "A production process receives SIGTERM as a polite request to finish up — a graceful shutdown stops new connections, waits for in-flight work to complete, then exits cleanly, and a health check should verify genuine readiness, not just that the process exists.",
    summary:
      "This final lesson covered the graceful shutdown sequence as an explicit state machine and what a meaningful health-check endpoint should and shouldn't verify, completing the operational-readiness picture for a real backend service.",
  },
];
