import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Node.js and Express Backend Development interview-prep questions -- 50
 * common technical interview questions covering the course's own topics
 * (Node's event loop and async models, Express routing/middleware, input
 * validation and REST design, structured errors/config/logging, auth
 * boundaries and testing, operational readiness).
 */
export const nodejsExpressInterviewQuestions: InterviewQuestionInput[] = [
  // --- Node Runtime & Event Loop (10) ---
  {
    id: "node-interview-runtime-01",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What does it mean that Node.js is 'single-threaded' for JavaScript execution, and how does it still handle many concurrent requests?",
    answer:
      "Your JavaScript code runs on a single main thread, but I/O operations (network, file, database calls) are delegated to the underlying system (via libuv's thread pool or OS async APIs) and don't block that main thread -- the event loop picks up completed I/O callbacks and runs them, letting one thread handle many concurrent, I/O-bound requests efficiently.",
    category: "Node Runtime & Event Loop",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-runtime-02",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why is a CPU-intensive synchronous operation (like a huge in-memory sort) dangerous to run directly in a Node.js request handler?",
    answer:
      "Since JavaScript execution is single-threaded, a long-running synchronous computation blocks the event loop entirely -- no other request can be processed until it finishes, meaning one expensive request can stall the entire server for every other concurrent user.",
    category: "Node Runtime & Event Loop",
    difficulty: "advanced",
    commonMistake:
      "Running a CPU-heavy synchronous loop directly in a request handler, blocking the event loop for every other concurrent request.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-runtime-03",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is the difference between CommonJS (`require`/`module.exports`) and ES modules (`import`/`export`) in Node.js?",
    answer:
      "CommonJS is Node's original, synchronous module system; ES modules are the standardized JavaScript module system, loaded asynchronously and statically analyzable -- modern Node supports both, but mixing them in the same file requires understanding their different resolution and interop rules.",
    category: "Node Runtime & Event Loop",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-runtime-04",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What does `npm` manage, and what is the difference between `dependencies` and `devDependencies` in `package.json`?",
    answer:
      "npm manages a project's external code packages and their versions -- `dependencies` are packages required for the application to actually run in production; `devDependencies` are only needed during development/testing (like a test framework or linter), not installed in a production-only install.",
    category: "Node Runtime & Event Loop",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-runtime-05",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is the difference between a callback-based async pattern and using Promises/async-await, from a code-maintainability perspective?",
    answer:
      "Deeply nested callbacks ('callback hell') become hard to read and error-handle correctly as async steps chain together; Promises let you chain steps flatly with `.then()`, and `async`/`await` lets you write async code that reads like sequential synchronous code with normal `try`/`catch` error handling.",
    category: "Node Runtime & Event Loop",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-runtime-06",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What happens if you forget to `await` an async function call inside another async function?",
    answer:
      "The call still starts executing, but your code continues immediately without waiting for it to finish or for its result -- this can cause your function to return or proceed before the async operation completes, and any error it throws becomes an unhandled promise rejection rather than being caught by your surrounding `try`/`catch`.",
    category: "Node Runtime & Event Loop",
    difficulty: "advanced",
    commonMistake:
      "Forgetting to await an async database call, causing the function to proceed as if the operation already completed.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-runtime-07",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is an unhandled promise rejection, and why is it considered a serious issue in a Node.js server?",
    answer:
      "A rejected Promise with no `.catch()` handler (or surrounding `try`/`catch` in an `await` context) attached anywhere -- in modern Node, an unhandled rejection can crash the entire process by default, which for a running server means an unrelated bug in one request's error handling can take down every other in-flight request too.",
    category: "Node Runtime & Event Loop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-runtime-08",
    courseSlug: "nodejs-express-backend-development",
    question: "What is `process.env`, and how is it typically used in a Node.js backend?",
    answer:
      "An object exposing the current process's environment variables -- commonly used to read configuration (database URLs, API keys, feature flags) that should differ between environments (local/staging/production) without hardcoding those values into the source code.",
    category: "Node Runtime & Event Loop",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-runtime-09",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why might converting a legacy callback-style Node API to return a Promise instead (or use `util.promisify`) be worthwhile in a modern codebase?",
    answer:
      "It lets that operation participate cleanly in `async`/`await` code and Promise chains alongside the rest of a modern codebase, avoiding a jarring mix of callback-style and Promise-style code that's harder to read and to handle errors consistently across.",
    category: "Node Runtime & Event Loop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-runtime-10",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is the practical difference between `npm install` and `npm ci`, and why might a CI pipeline specifically use `npm ci`?",
    answer:
      "`npm ci` installs exactly what's specified in `package-lock.json`, deleting `node_modules` first and failing if the lock file and `package.json` are out of sync -- it produces a fully reproducible install, which matters for CI reliability, whereas `npm install` can update the lock file and tolerate minor drift.",
    category: "Node Runtime & Event Loop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Express Routing & Middleware (10) ---
  {
    id: "node-interview-express-01",
    courseSlug: "nodejs-express-backend-development",
    question: "What is Express middleware, at a conceptual level?",
    answer:
      "A function with access to the request, response, and a `next` function, executed in sequence as part of the request-handling pipeline -- each middleware can inspect/modify the request or response, end the request-response cycle, or call `next()` to pass control to the following middleware.",
    category: "Express Routing & Middleware",
    difficulty: "beginner",
    codeExample:
      "app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-express-02",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What happens if a middleware function never calls `next()` and never sends a response?",
    answer:
      "The request hangs indefinitely -- the client never receives a response, and (depending on server/proxy configuration) may eventually time out. This is a common bug when a middleware has an unhandled branch that neither calls `next()` nor sends a response itself.",
    category: "Express Routing & Middleware",
    difficulty: "intermediate",
    commonMistake:
      "Writing a middleware with a conditional branch that neither calls next() nor sends a response, silently hanging the request.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-express-03",
    courseSlug: "nodejs-express-backend-development",
    question: "Why does middleware ORDER matter in an Express application?",
    answer:
      "Middleware executes in the exact order it's registered -- a middleware that needs to run before route handlers (like parsing the request body, or authentication) must be registered before those routes, since a later-registered middleware never sees requests that were already fully handled by an earlier one.",
    category: "Express Routing & Middleware",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-express-04",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is the difference between application-level middleware (`app.use(...)`) and route-specific middleware applied to a single route?",
    answer:
      "Application-level middleware runs for every matching request across the whole app (or a mounted path prefix); route-specific middleware only runs for that one specific route's handler -- useful when only a particular endpoint needs an additional step (like a specific validation rule) that shouldn't apply globally.",
    category: "Express Routing & Middleware",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-express-05",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What are the three main sources of data in an incoming Express request, and how do you access each?",
    answer:
      "Route/path parameters via `req.params` (e.g. `/users/:id`), query string parameters via `req.query` (e.g. `?sort=asc`), and the request body via `req.body` (typically populated by a body-parsing middleware for JSON/form data).",
    category: "Express Routing & Middleware",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-express-06",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why does a JSON-accepting Express app need explicit body-parsing middleware (like `express.json()`) rather than `req.body` working automatically?",
    answer:
      "Express doesn't parse the raw incoming request body by default, since the correct parsing strategy depends on the content type (JSON, form-urlencoded, multipart) -- explicitly registering the appropriate parser middleware tells Express how to interpret and populate `req.body` for that content type.",
    category: "Express Routing & Middleware",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-express-07",
    courseSlug: "nodejs-express-backend-development",
    question:
      "How do you structure routes into separate, modular files in a larger Express application, rather than defining every route in one file?",
    answer:
      "Using `express.Router()` to create a mini, self-contained router instance per resource/feature (e.g. a `users` router, an `orders` router), then mounting each onto the main app with `app.use('/users', usersRouter)` -- keeping related routes together and the main app file focused on composition.",
    category: "Express Routing & Middleware",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-express-08",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is the special role of an Express error-handling middleware, and how does Express recognize one?",
    answer:
      "An error-handling middleware is defined with FOUR parameters (`(err, req, res, next)`) instead of three -- Express recognizes this specific signature and routes errors (passed via `next(err)`, or thrown in an async handler with appropriate wrapping) to it, letting error handling be centralized rather than repeated in every route.",
    category: "Express Routing & Middleware",
    difficulty: "advanced",
    codeExample:
      "app.use((err, req, res, next) => {\n  res.status(err.status || 500).json({ error: err.message });\n});",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-express-09",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why must error-handling middleware be registered LAST, after all other routes and middleware?",
    answer:
      "Express matches middleware/routes in registration order -- an error handler registered too early wouldn't yet have seen the routes defined after it, so errors from those later routes wouldn't correctly reach it; error handlers are conventionally the very last thing registered, after every route.",
    category: "Express Routing & Middleware",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-express-10",
    courseSlug: "nodejs-express-backend-development",
    question:
      "How does route-matching precedence work when two routes could both match the same request path (e.g. `/users/new` and `/users/:id`)?",
    answer:
      "Express matches routes in the order they're registered, using the first match -- if `/users/:id` is registered before `/users/new`, a request to `/users/new` would incorrectly match `/users/:id` with `id` set to the literal string `'new'`. More specific static routes generally need to be registered before more general parameterized ones.",
    category: "Express Routing & Middleware",
    difficulty: "advanced",
    commonMistake:
      "Registering a parameterized route (like /users/:id) before a more specific static route (like /users/new), causing the static route to be unreachable.",
    lastReviewed: "2026-08-07",
  },

  // --- Input Validation & REST Design (10) ---
  {
    id: "node-interview-validation-01",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why must a backend validate incoming request data server-side, even if the frontend already validates it?",
    answer:
      "Any client-side validation can be bypassed by sending a request directly to the API (via a script, curl, or a modified client) -- the server is the only enforcement point that can't be circumvented, so it must independently validate every rule that actually matters for correctness or security.",
    category: "Input Validation & REST Design",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-validation-02",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What should happen when request validation fails, in terms of status code and response body?",
    answer:
      "Return a 400 Bad Request (not a 500, which implies a server-side bug) with a clear, structured error response describing which field(s) failed validation and why -- so the client can correct the request rather than receiving a generic, unhelpful failure.",
    category: "Input Validation & REST Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-validation-03",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why is using a dedicated schema-validation library generally preferred over scattering manual `if` checks throughout route handlers?",
    answer:
      "A schema-based approach declares the expected shape once, in one place, producing consistent error messages and reducing duplicated validation logic -- manual `if` checks tend to drift inconsistent across different routes and are easy to accidentally skip for a new field.",
    category: "Input Validation & REST Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-validation-04",
    courseSlug: "nodejs-express-backend-development",
    question:
      "How would you design REST resource URLs for managing 'orders' and each order's 'items'?",
    answer:
      "`GET /orders`, `POST /orders`, `GET /orders/:id`, and nested `GET /orders/:id/items`, `POST /orders/:id/items` for items scoped to a specific order -- resource nesting in the URL reflects the actual ownership/containment relationship between the two resources.",
    category: "Input Validation & REST Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-validation-05",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What status code should a successful resource-creation POST endpoint return, and what should it include?",
    answer:
      "201 Created, typically including the newly-created resource's data (with its assigned id) in the response body, and often a `Location` header pointing to the new resource's URL -- distinct from 200, which doesn't specifically signal 'something new now exists.'",
    category: "Input Validation & REST Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-validation-06",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why should validation reject unexpected extra fields in a request body, rather than silently ignoring them?",
    answer:
      "Silently ignoring extra fields can mask a client-side bug (the client thinks it sent a field that's actually being dropped) and can be a subtle security concern if a client attempts to set a field it shouldn't control (like `role: \"admin\"`) -- explicit rejection surfaces the mismatch immediately instead of hiding it.",
    category: "Input Validation & REST Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-validation-07",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why is validating that a numeric id parameter (from `req.params`) is actually a valid number before using it in a database query an important defensive step?",
    answer:
      "Route parameters arrive as raw strings -- passing an unvalidated, non-numeric value straight into a query can cause a confusing downstream error (or, without parameterized queries, a security risk) rather than a clear, immediate 400 response explaining the actual problem with the request.",
    category: "Input Validation & REST Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-validation-08",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What does it mean to design an API 'resource-oriented' rather than 'action-oriented,' and why is the former generally preferred in REST?",
    answer:
      "Resource-oriented design models the API around nouns (`/orders/:id/cancel` as a state-changing action on the order resource, via a POST or PATCH) rather than verbs baked into the URL (`/cancelOrder?id=5`) -- resource-oriented design composes more predictably with standard HTTP methods and status codes.",
    category: "Input Validation & REST Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-validation-09",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why should a validation library's schema for creating a resource often differ from its schema for updating one (e.g. a PATCH)?",
    answer:
      "A creation schema typically requires every mandatory field; an update (especially a PATCH, partial update) typically makes every field optional, since the client may only be changing one of several fields -- reusing the exact same 'everything required' schema for both would incorrectly reject a legitimate partial update.",
    category: "Input Validation & REST Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-validation-10",
    courseSlug: "nodejs-express-backend-development",
    question:
      'Why might returning field-level validation error details (e.g. `{ field: "email", message: "invalid format" }`) be preferable to a single generic \'invalid request\' message?',
    answer:
      "It lets the client (especially a form-based frontend) show the error next to the specific field that needs correcting, rather than forcing the user to guess which of several fields was actually wrong -- meaningfully better UX with essentially the same validation logic already being run.",
    category: "Input Validation & REST Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Errors, Config & Logging (10) ---
  {
    id: "node-interview-errors-01",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is centralized error handling in an Express app, and why is it preferred over handling errors inline in every route?",
    answer:
      "A single, dedicated error-handling middleware that every route's errors eventually flow through (via `next(err)` or thrown errors in properly-wrapped async handlers) -- it guarantees consistent error response formatting and logging across the whole app, instead of each route independently (and inconsistently) formatting its own error responses.",
    category: "Errors, Config & Logging",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-errors-02",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why does an async Express route handler that throws need special handling to reach the error middleware, in versions of Express before native async support?",
    answer:
      "A thrown error inside a plain async function becomes a rejected Promise, which Express's synchronous error-catching (from `try`/`catch` around the handler call) doesn't automatically see -- older Express versions require explicitly wrapping async handlers (or catching and calling `next(err)` manually) to route those rejections into the error middleware.",
    category: "Errors, Config & Logging",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-errors-03",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why is including a stack trace in an error response sent to the CLIENT a bad practice in production?",
    answer:
      "A stack trace can reveal internal file paths, library versions, and implementation details useful to an attacker, and is meaningless/unhelpful to a legitimate API consumer -- stack traces belong in server-side logs (for developers to diagnose), not in the response body sent back over the network.",
    category: "Errors, Config & Logging",
    difficulty: "advanced",
    commonMistake:
      "Returning a full stack trace in an API error response in production, leaking internal implementation details to any client.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-errors-04",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What does it mean to 'fail fast' on broken configuration at startup, rather than discovering the problem later during a request?",
    answer:
      "Validating required environment variables/configuration when the server first starts, and refusing to start at all (with a clear error) if something essential is missing or malformed -- far better than starting successfully and only failing confusingly once the first request tries to use that broken configuration.",
    category: "Errors, Config & Logging",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-errors-05",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why should sensitive values (passwords, tokens, API keys) never be included in application logs?",
    answer:
      "Logs are often stored, aggregated, and retained for a long time, sometimes with broader access than the application itself -- logging a sensitive value effectively creates another, less-guarded place that secret now lives, defeating whatever access controls protect it elsewhere.",
    category: "Errors, Config & Logging",
    difficulty: "advanced",
    commonMistake:
      "Logging a full request body that happens to include a password field, leaking the credential into log storage.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-errors-06",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is the difference between an operational error (like a failed database connection) and a programmer error (like calling a method on `undefined`)?",
    answer:
      "An operational error is an expected, recoverable failure mode of a correctly-written program (a network blip, invalid user input); a programmer error indicates an actual bug in the code itself -- they're often handled differently: operational errors are typically caught and responded to gracefully, while a programmer error may warrant crashing/restarting the process to avoid continuing in an unknown-bad state.",
    category: "Errors, Config & Logging",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-errors-07",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why is structured logging (e.g. JSON log lines with consistent fields) preferred over plain unstructured text logs in a production service?",
    answer:
      "Structured logs can be reliably parsed, filtered, and searched by log-aggregation tooling (e.g. finding every log line for a specific request id or user) -- unstructured free-text logs require fragile pattern matching and don't scale well once log volume grows.",
    category: "Errors, Config & Logging",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-errors-08",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why might a custom error class (e.g. `class NotFoundError extends Error`) be more useful than throwing a generic `Error` with a message string?",
    answer:
      "A custom error class lets error-handling code distinguish error TYPES programmatically (`if (err instanceof NotFoundError)`) rather than parsing a message string, and can carry structured metadata (like an intended HTTP status code) directly on the error object.",
    category: "Errors, Config & Logging",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-errors-09",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why should configuration values differ between environments (development, staging, production) rather than using one hardcoded set of values everywhere?",
    answer:
      "Different environments need different database connections, API keys, and behavior flags (e.g. verbose debug logging appropriate for development but noisy/risky in production) -- environment-specific configuration, read at startup, lets the same codebase run correctly and safely across all of them.",
    category: "Errors, Config & Logging",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-errors-10",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is the value of including a unique request id in every log line related to handling a single request?",
    answer:
      "It lets you trace every log entry generated while processing one specific request (across multiple middleware/service calls) by filtering on that one id -- without it, correlating related log lines from a busy server handling many concurrent requests simultaneously becomes very difficult.",
    category: "Errors, Config & Logging",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Security, Testing & Operations (10) ---
  {
    id: "node-interview-security-01",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why is it strongly discouraged to build your own password-hashing/authentication system from scratch for a real application?",
    answer:
      "Authentication security has many subtle failure modes (timing attacks, weak hashing, session-fixation vulnerabilities) that established, audited libraries have already solved -- a custom implementation is highly likely to reproduce a known vulnerability that a well-vetted library has already specifically addressed.",
    category: "Security, Testing & Operations",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-security-02",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is the difference between an authentication middleware and an authorization check within a route handler?",
    answer:
      "Authentication middleware establishes WHO is making the request (verifying a valid token/session, typically applied broadly); an authorization check (often inside the specific route handler) determines whether THIS authenticated user is allowed to perform THIS specific action on THIS specific resource -- both are needed, and conflating them is a common source of access-control bugs.",
    category: "Security, Testing & Operations",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-security-03",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why should you separate business logic into testable 'service' functions, rather than writing all the logic directly inside Express route handlers?",
    answer:
      "Route handlers are tightly coupled to the HTTP layer (req/res objects), making the underlying logic hard to unit test in isolation -- extracting that logic into plain functions/services lets you test the actual business rules directly, with the route handler reduced to a thin layer translating HTTP in and out.",
    category: "Security, Testing & Operations",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-security-04",
    courseSlug: "nodejs-express-backend-development",
    question:
      "How would you test an Express route without needing to actually start a real listening HTTP server?",
    answer:
      "Use a library like `supertest`, which can send simulated HTTP requests directly against the Express app instance in-process -- no real network socket or listening port is needed, making tests faster and avoiding port-conflict issues in CI.",
    category: "Security, Testing & Operations",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-security-05",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why should tests for a backend service run against an isolated test database, not a shared development or production one?",
    answer:
      "Tests that create/modify/delete real data risk corrupting shared data other developers or processes depend on, and can produce flaky results if the shared database's state changes concurrently -- an isolated test database (reset between runs) keeps tests independent and repeatable.",
    category: "Security, Testing & Operations",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-security-06",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What does a health-check endpoint (e.g. `GET /health`) let an operations/deployment system do?",
    answer:
      "It lets infrastructure (a load balancer, a container orchestrator) programmatically check whether the service instance is actually ready to handle traffic -- an unhealthy instance can be automatically taken out of rotation or restarted, without a human needing to notice and intervene manually.",
    category: "Security, Testing & Operations",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-security-07",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is 'graceful shutdown,' and why does a production Node.js service need to implement it?",
    answer:
      "Handling a termination signal (like `SIGTERM`) by finishing in-flight requests and cleanly closing connections (database, etc.) before actually exiting, rather than stopping abruptly -- without it, requests being processed at the exact moment of a deployment/restart get abandoned mid-flight, which a graceful shutdown avoids.",
    category: "Security, Testing & Operations",
    difficulty: "advanced",
    commonMistake:
      "Deploying a new version without graceful shutdown handling, abruptly killing requests that were still in flight during the restart.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-security-08",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why should CORS (Cross-Origin Resource Sharing) configuration for a production API restrict allowed origins explicitly, rather than allowing any origin (`*`)?",
    answer:
      "Allowing any origin lets ANY website's client-side JavaScript make authenticated requests to your API from a user's browser (if credentials are involved) -- explicitly listing your own known frontend origin(s) prevents unrelated, potentially malicious sites from being able to interact with your API on a logged-in user's behalf.",
    category: "Security, Testing & Operations",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-security-09",
    courseSlug: "nodejs-express-backend-development",
    question:
      "Why is rate limiting a meaningful security/reliability measure for a backend API, beyond just preventing accidental overload?",
    answer:
      "It limits the damage of both accidental (a buggy client retrying too aggressively) and deliberate (brute-force login attempts, scraping, denial-of-service attempts) excessive traffic from a single source -- a fundamental defensive layer independent of any specific vulnerability.",
    category: "Security, Testing & Operations",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "node-interview-security-10",
    courseSlug: "nodejs-express-backend-development",
    question:
      "What is the value of an integration test that spins up the full Express app and hits a real (test) database, compared to a unit test that mocks the database?",
    answer:
      "It catches real issues in how the pieces actually connect (a query that's syntactically valid but doesn't match the real schema, a serialization mismatch) that a mocked-database unit test, by construction, cannot -- both levels of testing catch different classes of bugs and are typically used together, not as substitutes for each other.",
    category: "Security, Testing & Operations",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
