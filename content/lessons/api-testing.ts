import type { LessonInput } from "@/lib/content/types";

/**
 * API Testing and Automation.
 *
 * The sandboxed runner blocks real network calls entirely (see
 * lib/runners/html-js-doc.ts) -- and even without that constraint, a public
 * course can't depend on a live third-party API staying up and stable
 * forever. Every exercise here uses a small, explicitly-labeled "mock API
 * client" -- a plain JS object of canned fixture responses -- so learners
 * practice real API-testing *logic* (status codes, schema checks, chained
 * requests, error handling) deterministically. Every lesson says outright
 * that this is a simulation, never a live HTTP request, consistent with the
 * platform-wide rule against implying execution that didn't happen.
 */
export const apiTestingLessons: LessonInput[] = [
  {
    id: "at-http-fundamentals",
    slug: "at-http-fundamentals",
    title: "HTTP Fundamentals: Requests, Responses, and Status Codes",
    description:
      "The shape of every HTTP request and response, and the status code ranges every API tester needs memorized cold.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Describe the parts of an HTTP request and an HTTP response",
      "Classify a status code by its hundreds-digit range and what that range means",
      "Explain why a 200 status with an error message in the body is a testable defect",
    ],
    skills: ["api-testing", "http"],
    tech: [{ name: "HTTP", version: "1.1" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "MDN: HTTP overview",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
      },
      {
        label: "MDN: HTTP response status codes",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
      },
    ],
    keywords: ["http", "status codes", "request", "response", "api testing"],
    explanation: `Every API interaction is a **request** and a **response**, and both have the same basic shape: a method/status line, a set of headers, and an optional body. A request says: HTTP method (GET, POST, PUT, PATCH, DELETE), a path, headers (metadata like content type or an auth token), and sometimes a body (the data being sent, usually JSON). A response says: a status code, headers, and usually a body (the data being returned, or an error description).

**Status codes are grouped into five ranges, and the hundreds digit tells you the category before you even read the specific number:**

- **2xx — Success.** The request was received, understood, and accepted. 200 (OK) is the general case; 201 (Created) specifically means a new resource was created; 204 (No Content) means success with nothing to return.
- **3xx — Redirection.** The client needs to take additional action, usually following a new URL.
- **4xx — Client error.** Something about *the request itself* was wrong: 400 (Bad Request — malformed data), 401 (Unauthorized — no valid credentials), 403 (Forbidden — credentials valid but not allowed), 404 (Not Found).
- **5xx — Server error.** The request was fine; the *server* failed to handle it correctly. A 5xx is almost always a real bug worth reporting, not a data-entry mistake by the caller.

Here's the check that separates a careful API tester from a careless one: **the status code and the body must agree.** An API that returns status 200 (success) with a body containing \`{ "error": "user not found" }\` is lying about what happened — a client checking only the status code would treat this as success and proceed with broken data. This mismatch is a real, common, and easy-to-miss defect: always verify the status code *and* the body tell the same story, not just one or the other.`,
    example: {
      language: "javascript",
      description:
        "A simulated API response object and a check that catches the classic status/body mismatch bug. No real network request is made — this is fixture data.",
      code: `// Simulated response — not a real network call.
const response = {
  status: 200,
  body: { error: "User not found" },
};

function isConsistent(res) {
  const bodyLooksLikeError = typeof res.body?.error === "string";
  const statusSaysSuccess = res.status >= 200 && res.status < 300;
  return !(bodyLooksLikeError && statusSaysSuccess);
}

console.log(isConsistent(response)); // false -- status says success, body says error`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Fix the response's status to 404 (matching the error in the body) and re-run.",
      code: `const response = {
  status: 200,
  body: { error: "User not found" },
};

function isConsistent(res) {
  const bodyLooksLikeError = typeof res.body?.error === "string";
  const statusSaysSuccess = res.status >= 200 && res.status < 300;
  return !(bodyLooksLikeError && statusSaysSuccess);
}

console.log(isConsistent(response));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write a function statusCategory(code) that returns 'success', 'client-error', or 'server-error' for codes in the 2xx, 4xx, and 5xx ranges respectively.",
      starterCode: `function statusCategory(code) {
  // TODO: return 'success', 'client-error', or 'server-error'
}
`,
      solutionCode: `function statusCategory(code) {
  if (code >= 200 && code < 300) return "success";
  if (code >= 400 && code < 500) return "client-error";
  return "server-error";
}`,
      harness: `
        try { window.__report('t1', statusCategory(200) === 'success', '200 should be success.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', statusCategory(404) === 'client-error', '404 should be client-error.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', statusCategory(500) === 'server-error', '500 should be server-error.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "200 is classified as success", hidden: false },
        { id: "t2", description: "404 is classified as client-error", hidden: false },
        { id: "t3", description: "500 is classified as server-error", hidden: false },
      ],
      hints: [
        "2xx codes are 200-299, 4xx codes are 400-499.",
        "Anything that isn't 2xx or 4xx in this exercise's scope falls to server-error.",
      ],
    },
    independentExercise: {
      id: "at-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function findStatusBodyMismatch(response) that returns true if the response is inconsistent: a status in the 2xx range but a body containing an 'error' string property (the bug pattern from this lesson), false otherwise.",
      starterCode: `function findStatusBodyMismatch(response) {
  // TODO
}
`,
      solutionCode: `function findStatusBodyMismatch(response) {
  const isSuccessStatus = response.status >= 200 && response.status < 300;
  const bodyHasError = typeof response.body?.error === "string";
  return isSuccessStatus && bodyHasError;
}`,
      harness: `
        try { window.__report('t1', findStatusBodyMismatch({ status: 200, body: { error: "not found" } }) === true, 'A 2xx status with an error body should be flagged as a mismatch.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', findStatusBodyMismatch({ status: 200, body: { name: "Ada" } }) === false, 'A 2xx status with a normal, error-free body should not be flagged.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', findStatusBodyMismatch({ status: 404, body: { error: "not found" } }) === false, 'A 4xx status with an error body is consistent, not a mismatch.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "detects a real mismatch", hidden: false },
        { id: "t2", description: "does not flag a normal success response", hidden: false },
        {
          id: "t3",
          description: "does not flag a correctly-matched error response",
          hidden: false,
        },
      ],
      hints: [
        "The bug pattern is specifically: success status AND an error field in the body, together.",
        "A 4xx status with an error body is doing the right thing — that's not a mismatch.",
      ],
    },
    commonMistakes: [
      "Checking only the status code and assuming the body must be consistent with it — the two can and do disagree in real APIs.",
      "Treating all 4xx codes as the same, when 400, 401, 403, and 404 mean meaningfully different things a tester should distinguish.",
      "Assuming a 5xx response is the caller's fault — a server error means the request reached the server but the server failed to handle it correctly.",
    ],
    quiz: [
      {
        id: "at-1-q1",
        prompt: "What does a status code in the 4xx range generally indicate?",
        choices: [
          "A server-side failure",
          "A problem with the request itself, on the client's side",
          "The request succeeded",
          "The server is redirecting the client",
        ],
        correctIndex: 1,
        explanation:
          "4xx codes indicate the request itself had a problem — bad data, missing authentication, or a resource that doesn't exist.",
      },
      {
        id: "at-1-q2",
        prompt:
          'An API returns status 200 with body `{ "error": "insufficient funds" }`. What should a careful tester conclude?',
        choices: [
          "Everything is fine — the status is 200",
          "This is likely a real defect: the status and body disagree about whether the request succeeded",
          "This is normal API design",
          "The body should be ignored if the status is 2xx",
        ],
        correctIndex: 1,
        explanation:
          "A success status paired with an error in the body is a common, real defect pattern — clients checking only the status code would incorrectly treat this as success.",
      },
      {
        id: "at-1-q3",
        prompt:
          "Which status range indicates the server received a valid request but failed to handle it correctly?",
        choices: ["2xx", "3xx", "4xx", "5xx"],
        correctIndex: 3,
        explanation:
          "5xx codes specifically mean the server, not the client, is where the failure occurred.",
      },
    ],
    takeaway:
      "HTTP status codes group into meaningful ranges, and a careful API tester always verifies the status code and the response body tell the same story — not just one of them.",
    summary:
      "This lesson covered the shape of HTTP requests/responses, the meaning of the five status code ranges, and the classic status/body mismatch defect pattern.",
    nextLessonSlug: "at-rest-conventions",
  },
  {
    id: "at-rest-conventions",
    slug: "at-rest-conventions",
    title: "REST Conventions and Resource Design",
    description:
      "The conventions real REST APIs follow for URLs and HTTP methods, and how to spot when an API breaks its own conventions.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 17,
    prerequisites: ["at-http-fundamentals"],
    objectives: [
      "Map CRUD operations to conventional REST HTTP methods and URL patterns",
      "Identify a URL or method choice that breaks REST convention",
      "Explain why consistent conventions make an API easier to test",
    ],
    skills: ["api-testing", "rest"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      { label: "MDN: REST", url: "https://developer.mozilla.org/en-US/docs/Glossary/REST" },
    ],
    keywords: ["rest", "crud", "resource design", "api conventions"],
    explanation: `A REST API models data as **resources**, addressed by URLs, manipulated with standard HTTP methods. Once you know the convention, you can often predict an unfamiliar API's shape correctly before reading its documentation — and just as usefully, you can immediately spot when an API violates its own conventions, which is itself worth testing for.

The standard mapping, using a "tasks" resource as an example:

- **GET /tasks** — list all tasks
- **GET /tasks/42** — retrieve one specific task
- **POST /tasks** — create a new task (the server usually assigns the id and returns it)
- **PUT /tasks/42** — replace task 42 entirely with the given data
- **PATCH /tasks/42** — partially update task 42 (only the fields provided)
- **DELETE /tasks/42** — delete task 42

Two distinctions matter for testing specifically. **PUT vs. PATCH**: PUT should replace the *entire* resource — send a PUT with only one field and, done correctly, every other field should revert to its default or be required; PATCH updates only what's provided, leaving everything else untouched. A tester who doesn't know this distinction can't tell whether "the other fields got wiped out" is a bug (if it was a PATCH) or correct behavior (if it was a PUT).

**Nesting reveals relationships**: \`GET /users/7/orders\` conventionally means "the orders belonging to user 7" — a resource nested under its parent. If an API instead exposes this same data at a completely unrelated-looking URL like \`/getUserOrderData?uid=7\`, that's a convention break worth flagging, not because it won't work, but because it makes the API harder to predict, harder to document consistently, and more error-prone for every client that integrates with it.

Conventions aren't a rule enforced by the HTTP protocol itself — nothing stops an API from using GET to delete something. That's exactly why testing for convention violations matters: they're not caught by "does it technically work," only by someone deliberately checking whether the API behaves the way its own shape implies it should.`,
    example: {
      language: "javascript",
      description:
        "A simulated REST-style router mapping methods and paths to actions — a compact way to reason about (and test) an API's conventions before touching a real server.",
      code: `const routes = {
  "GET /tasks": "list all tasks",
  "GET /tasks/:id": "get one task",
  "POST /tasks": "create a task",
  "PUT /tasks/:id": "replace a task",
  "PATCH /tasks/:id": "partially update a task",
  "DELETE /tasks/:id": "delete a task",
};

console.log(routes["GET /tasks/:id"]);
console.log(routes["PATCH /tasks/:id"]);`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a route for listing a specific user's tasks nested under that user, then log it.",
      code: `const routes = {
  "GET /tasks": "list all tasks",
  "GET /tasks/:id": "get one task",
};

// Add: "GET /users/:userId/tasks" -> "list a user's tasks"
console.log(routes);`,
      editable: true,
    },
    guidedExercise: {
      id: "at-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write a function conventionalMethod(action) that maps 'list', 'create', 'replace', 'partial-update', 'delete' to the correct HTTP method string ('GET', 'POST', 'PUT', 'PATCH', 'DELETE').",
      starterCode: `function conventionalMethod(action) {
  // TODO: map each action string to its conventional HTTP method
}
`,
      solutionCode: `function conventionalMethod(action) {
  const map = {
    list: "GET",
    create: "POST",
    replace: "PUT",
    "partial-update": "PATCH",
    delete: "DELETE",
  };
  return map[action];
}`,
      harness: `
        try { window.__report('t1', conventionalMethod('list') === 'GET', 'Listing resources conventionally uses GET.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', conventionalMethod('create') === 'POST', 'Creating a resource conventionally uses POST.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', conventionalMethod('partial-update') === 'PATCH', 'A partial update conventionally uses PATCH, not PUT.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', conventionalMethod('delete') === 'DELETE', 'Deleting a resource conventionally uses DELETE.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "list maps to GET", hidden: false },
        { id: "t2", description: "create maps to POST", hidden: false },
        { id: "t3", description: "partial-update maps to PATCH", hidden: false },
        { id: "t4", description: "delete maps to DELETE", hidden: false },
      ],
      hints: [
        "PUT and PATCH are the pair most people mix up: PUT replaces the whole resource, PATCH updates part of it.",
        "There are exactly five actions to map to five methods, one each.",
      ],
    },
    independentExercise: {
      id: "at-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function isConventionalUrl(method, url) that returns true for these conventional patterns and false otherwise: GET /resources, GET /resources/123 (any numeric id), POST /resources, DELETE /resources/123. Anything else (e.g. a verb in the URL like /getResource) is false.",
      starterCode: `function isConventionalUrl(method, url) {
  // TODO
}
`,
      solutionCode: `function isConventionalUrl(method, url) {
  const collection = /^\\/[a-z]+$/;
  const item = /^\\/[a-z]+\\/\\d+$/;
  if (method === "GET" && (collection.test(url) || item.test(url))) return true;
  if (method === "POST" && collection.test(url)) return true;
  if (method === "DELETE" && item.test(url)) return true;
  return false;
}`,
      harness: `
        try { window.__report('t1', isConventionalUrl('GET', '/tasks') === true, 'GET /tasks is a conventional collection URL.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', isConventionalUrl('GET', '/tasks/42') === true, 'GET /tasks/42 is a conventional single-item URL.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', isConventionalUrl('GET', '/getTaskById?id=42') === false, 'A verb-in-the-URL pattern like /getTaskById breaks REST convention.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', isConventionalUrl('DELETE', '/tasks/42') === true, 'DELETE /tasks/42 is conventional.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "GET on a collection URL is conventional", hidden: false },
        { id: "t2", description: "GET on an item URL is conventional", hidden: false },
        {
          id: "t3",
          description: "a verb-based URL is correctly flagged as unconventional",
          hidden: false,
        },
        { id: "t4", description: "DELETE on an item URL is conventional", hidden: false },
      ],
      hints: [
        "A conventional collection URL looks like /something with no id. A conventional item URL adds /123.",
        'A URL containing a verb like "get" or a query string like ?id=42 is the unconventional pattern to catch.',
      ],
    },
    commonMistakes: [
      "Assuming PUT and PATCH are interchangeable — sending a PUT with a partial payload can silently wipe out fields that weren't included.",
      "Not testing whether an API's actual behavior matches what its URL/method combination implies (does DELETE really only delete the one specified resource?).",
      "Missing that resource nesting (like /users/7/orders) implies an ownership/scoping relationship worth specifically testing (does it only return that user's orders, never another user's?).",
    ],
    quiz: [
      {
        id: "at-2-q1",
        prompt: "What is the conventional difference between PUT and PATCH?",
        choices: [
          "There is no difference — they are the same",
          "PUT replaces the entire resource; PATCH updates only the fields provided",
          "PUT is for creating; PATCH is for deleting",
          "PATCH always requires more fields than PUT",
        ],
        correctIndex: 1,
        explanation:
          "PUT is a full replacement of the resource; PATCH is a partial update — sending a partial payload to PUT can unintentionally clear out omitted fields.",
      },
      {
        id: "at-2-q2",
        prompt:
          "An API exposes 'GET /getUserData?uid=7' instead of 'GET /users/7'. What does this suggest to a tester?",
        choices: [
          "Nothing — this is standard REST design",
          "This breaks REST convention, which is worth flagging even if the endpoint technically works",
          "This means the API is more secure",
          "This is required for all query-based endpoints",
        ],
        correctIndex: 1,
        explanation:
          "A verb embedded in the URL rather than a resource-oriented path breaks the predictable resource/method convention REST relies on, even if the endpoint itself functions.",
      },
      {
        id: "at-2-q3",
        prompt: "What does the nested URL 'GET /users/7/orders' conventionally imply?",
        choices: [
          "It returns all orders in the system",
          "It returns the orders belonging specifically to user 7",
          "It creates a new order for user 7",
          "It has no particular meaning",
        ],
        correctIndex: 1,
        explanation:
          'Nesting a resource under a parent in the URL conventionally means "this resource, scoped to that parent" — testing that the scoping is actually enforced is an important check.',
      },
    ],
    takeaway:
      "REST conventions map CRUD operations to predictable HTTP methods and URL patterns — knowing them lets you predict an API's shape and, just as importantly, spot when it breaks its own rules.",
    summary:
      "This lesson covered the conventional REST mapping of list/create/replace/partial-update/delete to HTTP methods and URLs, and why convention violations are worth testing for even when the endpoint technically works.",
    nextLessonSlug: "at-headers-auth",
  },
  {
    id: "at-headers-auth",
    slug: "at-headers-auth",
    title: "Headers and Authentication Concepts",
    description:
      "What headers actually do, and the difference between authentication and authorization — two failures that look identical to an untrained eye.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 17,
    prerequisites: ["at-rest-conventions"],
    objectives: [
      "Explain the purpose of common request/response headers relevant to testing",
      "Distinguish authentication (who you are) from authorization (what you're allowed to do)",
      "Choose the correct status code (401 vs 403) for an authentication vs. authorization failure",
    ],
    skills: ["api-testing", "authentication", "authorization"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "MDN: HTTP headers",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers",
      },
    ],
    keywords: ["http headers", "authentication", "authorization", "401", "403"],
    explanation: `**Headers** carry metadata about a request or response, separate from the actual data in the body. A tester doesn't need to memorize every possible header, but a handful come up constantly: \`Content-Type\` declares the format of the body (\`application/json\` means "parse this as JSON"); \`Authorization\` carries credentials, typically as \`Bearer <token>\`; \`Accept\` tells the server what response format the client can handle. Testing headers matters because a server that ignores a malformed \`Content-Type\` or silently accepts a request with no \`Authorization\` header at all is often a real security gap, not a cosmetic one.

The single most commonly confused pair of concepts in this space: **authentication** answers "who are you?" — proving identity, usually via a token, password, or API key. **Authorization** answers a completely different question: "given that I know who you are, are you *allowed* to do this specific thing?" A logged-in user is authenticated; whether that specific user can delete a specific resource is a separate, later, authorization decision.

This distinction has a direct, testable consequence: **401 Unauthorized means authentication failed** — no valid credentials were presented at all (despite the confusing name, it's really about identity, not permission). **403 Forbidden means authentication succeeded but authorization failed** — the server knows exactly who you are, and the answer is still no. A tester who doesn't verify which of these two the API actually returns can miss a real bug: an API that returns 401 for "user B tried to access user A's private data" is technically wrong — user B *is* authenticated, just not authorized for that specific resource, so the correct code is 403. Getting this wrong in real systems sometimes reveals more than intended (a 404 vs. 403 distinction can leak whether a resource exists at all to someone who shouldn't know).`,
    example: {
      language: "javascript",
      description:
        "A simulated authorization check that correctly distinguishes 'not logged in' from 'logged in but not allowed' — no real network request is made.",
      code: `function accessDecision(isAuthenticated, isAuthorizedForResource) {
  if (!isAuthenticated) return 401; // we don't know who this is
  if (!isAuthorizedForResource) return 403; // we know who it is, but no
  return 200;
}

console.log(accessDecision(false, false)); // 401
console.log(accessDecision(true, false));  // 403 -- authenticated, but not allowed
console.log(accessDecision(true, true));   // 200`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Try each combination and predict the status code before running.",
      code: `function accessDecision(isAuthenticated, isAuthorizedForResource) {
  if (!isAuthenticated) return 401;
  if (!isAuthorizedForResource) return 403;
  return 200;
}

console.log(accessDecision(true, false));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A request to view another user's private profile is made with a valid, logged-in session token, but that user isn't the profile's owner or an admin. Set expectedStatus to the correct code (401 or 403).",
      starterCode: `let expectedStatus = 0; // TODO: 401 or 403
`,
      solutionCode: `let expectedStatus = 403;`,
      harness: `
        try { window.__report('t1', expectedStatus === 403, 'The user IS authenticated (valid session token) but is not authorized for this specific resource -- that is 403, not 401.'); } catch (e) { window.__report('t1', false, 'expectedStatus is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies 403 as the right code", hidden: false },
      ],
      hints: [
        "Ask: does the server know who this user is? Yes, there's a valid token.",
        "The failure is about permission for this specific resource, not identity — that's authorization, which maps to 403.",
      ],
    },
    independentExercise: {
      id: "at-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function classifyAuthFailure(hasValidToken, hasPermission) that returns 401 if there's no valid token at all, 403 if there's a valid token but no permission, and 200 if both are fine.",
      starterCode: `function classifyAuthFailure(hasValidToken, hasPermission) {
  // TODO
}
`,
      solutionCode: `function classifyAuthFailure(hasValidToken, hasPermission) {
  if (!hasValidToken) return 401;
  if (!hasPermission) return 403;
  return 200;
}`,
      harness: `
        try { window.__report('t1', classifyAuthFailure(false, false) === 401, 'No valid token at all should be 401, regardless of permission.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', classifyAuthFailure(false, true) === 401, 'No valid token should still be 401 even if permission would otherwise be granted.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', classifyAuthFailure(true, false) === 403, 'A valid token but no permission is 403.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', classifyAuthFailure(true, true) === 200, 'Valid token and permission is success.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "no token, no permission -> 401", hidden: false },
        { id: "t2", description: "no token, would-be permission -> still 401", hidden: false },
        { id: "t3", description: "valid token, no permission -> 403", hidden: false },
        { id: "t4", description: "valid token and permission -> 200", hidden: false },
      ],
      hints: [
        "Check the token first — if there's no valid identity at all, permission is irrelevant.",
        "Only check permission once identity is established.",
      ],
    },
    commonMistakes: [
      'Treating 401 and 403 as interchangeable "access denied" codes instead of testing that the API returns the specific, correct one for each situation.',
      "Never testing what happens with a missing Authorization header at all, only testing with valid and clearly-invalid tokens.",
      "Confusing authentication (who you are) with authorization (what you're allowed to do) when writing test case descriptions, making them harder for others to act on.",
    ],
    quiz: [
      {
        id: "at-3-q1",
        prompt: "What question does authentication answer?",
        choices: [
          "What am I allowed to do?",
          "Who am I?",
          "How fast is the server?",
          "What format is the data in?",
        ],
        correctIndex: 1,
        explanation:
          "Authentication is specifically about proving identity — who is making the request.",
      },
      {
        id: "at-3-q2",
        prompt:
          "A user is logged in with a valid token but tries to access a resource they don't own and aren't permitted to see. What's the correct status code?",
        choices: ["200", "401", "403", "500"],
        correctIndex: 2,
        explanation:
          "The user's identity is known (authenticated) but they lack permission for this specific resource (not authorized) — that's exactly what 403 means.",
      },
      {
        id: "at-3-q3",
        prompt: "Why does the distinction between 401 and 403 matter for a tester?",
        choices: [
          "It doesn't — they mean the same thing",
          "Returning the wrong one is a real, testable defect, and can even leak information about whether a resource exists",
          "401 only applies to POST requests",
          "403 only applies to admin users",
        ],
        correctIndex: 1,
        explanation:
          "Confusing identity failures with permission failures is a genuine bug pattern worth specifically testing for — and mismatches can inadvertently leak details to an attacker.",
      },
    ],
    takeaway:
      "Authentication (who you are) and authorization (what you're allowed to do) are different questions with different correct status codes — 401 for the former failing, 403 for the latter.",
    summary:
      "This lesson covered the purpose of common headers and the critical distinction between authentication and authorization, including which status code each failure should produce.",
    nextLessonSlug: "at-json-schema-validation",
  },
  {
    id: "at-json-schema-validation",
    slug: "at-json-schema-validation",
    title: "Validating JSON Responses Against a Schema (Lab)",
    description:
      "A hands-on lab: check a response's actual shape against what it's supposed to be — field presence, correct types, and nothing extra or missing.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 24,
    prerequisites: ["at-headers-auth"],
    objectives: [
      "Write a schema check that verifies required fields and their types",
      "Distinguish a missing field from a field with the wrong type",
      "Explain why schema validation catches defects a single hand-picked example wouldn't",
    ],
    skills: ["api-testing", "json-schema-validation"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      { label: "JSON Schema", url: "https://json-schema.org/understanding-json-schema/" },
    ],
    keywords: ["json schema", "schema validation", "api testing", "contract"],
    explanation: `Checking one specific field's value ("does \`body.name\` equal 'Ada'?") proves that one field is right in that one response. It says nothing about whether the response's overall *shape* is reliable: is \`id\` always a number, or does it sometimes come back as a string? Is \`email\` always present, or does it silently disappear for some users? **Schema validation** checks the whole shape at once: which fields must be present, what type each one must be, and — often overlooked — whether unexpected extra fields show up that nobody documented.

A minimal schema for a user resource might specify: \`id\` is a required number, \`name\` is a required string, \`email\` is a required string, \`isActive\` is a required boolean. A schema-validating test doesn't hand-pick one example response and eyeball it — it runs the *same* structural check against every response the API returns, catching a defect like "sometimes \`id\` comes back as the string \`"42"\` instead of the number \`42\`" that a single spot-check would likely never happen to catch, because the buggy case might only occur for some accounts, some load conditions, or some code paths.

Two distinct failure categories matter here, and a good schema check reports them separately rather than lumping them into one vague "invalid" result: a **missing field** (the key isn't present at all) is a different defect from a **wrong type** (the key is present, but holds a string where a number was expected) — they often point to different root causes in the server code, so conflating them in a bug report makes the report less useful.

Real-world API testing tools (like AJV for JSON Schema, or Pact for contract testing) automate exactly this kind of check against a formal specification. The version practiced here — a small, explicit function checking required fields and types — is the same underlying idea, simplified enough to reason about and write by hand.`,
    example: {
      language: "javascript",
      description:
        "A small schema-validation function distinguishing missing fields from wrong-type fields, run against a simulated (fixture) API response.",
      code: `const schema = {
  id: "number",
  name: "string",
  isActive: "boolean",
};

function validateSchema(obj, schema) {
  const errors = [];
  for (const [field, expectedType] of Object.entries(schema)) {
    if (!(field in obj)) {
      errors.push(\`missing field: \${field}\`);
    } else if (typeof obj[field] !== expectedType) {
      errors.push(\`\${field} should be \${expectedType}, got \${typeof obj[field]}\`);
    }
  }
  return errors;
}

// Simulated response -- not a real network call.
const response = { id: "42", name: "Ada" };
console.log(validateSchema(response, schema));
// ["id should be number, got string", "missing field: isActive"]`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Fix the simulated response so it matches the schema exactly, then re-run — the errors array should become empty.",
      code: `const schema = { id: "number", name: "string", isActive: "boolean" };

function validateSchema(obj, schema) {
  const errors = [];
  for (const [field, expectedType] of Object.entries(schema)) {
    if (!(field in obj)) errors.push(\`missing field: \${field}\`);
    else if (typeof obj[field] !== expectedType) errors.push(\`\${field} wrong type\`);
  }
  return errors;
}

const response = { id: "42", name: "Ada" };
console.log(validateSchema(response, schema));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using the schema and validateSchema function already defined, run it against simulatedResponse and store the result in errors. simulatedResponse is missing the 'price' field and has 'inStock' as a string instead of a boolean.",
      starterCode: `const schema = { name: "string", price: "number", inStock: "boolean" };
function validateSchema(obj, s) {
  const errors = [];
  for (const [field, type] of Object.entries(s)) {
    if (!(field in obj)) errors.push('missing field: ' + field);
    else if (typeof obj[field] !== type) errors.push(field + ' has wrong type');
  }
  return errors;
}

const simulatedResponse = { name: "Widget", inStock: "yes" };
let errors = []; // TODO: call validateSchema
`,
      solutionCode: `const schema = { name: "string", price: "number", inStock: "boolean" };
function validateSchema(obj, s) {
  const errors = [];
  for (const [field, type] of Object.entries(s)) {
    if (!(field in obj)) errors.push('missing field: ' + field);
    else if (typeof obj[field] !== type) errors.push(field + ' has wrong type');
  }
  return errors;
}

const simulatedResponse = { name: "Widget", inStock: "yes" };
let errors = validateSchema(simulatedResponse, schema);`,
      harness: `
        try {
          const hasMissingPrice = errors.some((e) => e.includes('price'));
          const hasWrongTypeInStock = errors.some((e) => e.includes('inStock'));
          window.__report('t1', hasMissingPrice, 'errors should report that "price" is missing.');
          window.__report('t2', hasWrongTypeInStock, 'errors should report that "inStock" has the wrong type.');
          window.__report('t3', errors.length === 2, 'errors should have exactly 2 entries -- name is present and correctly typed, so it should not appear.');
        } catch (e) { window.__report('t1', false, 'errors is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "reports the missing price field", hidden: false },
        { id: "t2", description: "reports inStock's wrong type", hidden: false },
        { id: "t3", description: "does not report name, which is correct", hidden: false },
      ],
      hints: [
        "Call validateSchema(simulatedResponse, schema) and assign the result to errors.",
        "name is present and is a string, matching the schema — it should not appear in the errors.",
      ],
    },
    independentExercise: {
      id: "at-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function countErrorsByType(errors) that takes the array of error strings produced by validateSchema-style checks (each either starts with 'missing field' or contains 'wrong type') and returns { missing: N, wrongType: N }.",
      starterCode: `function countErrorsByType(errors) {
  // TODO
}
`,
      solutionCode: `function countErrorsByType(errors) {
  let missing = 0;
  let wrongType = 0;
  for (const e of errors) {
    if (e.startsWith("missing field")) missing++;
    else if (e.includes("wrong type") || e.includes("has wrong type")) wrongType++;
  }
  return { missing, wrongType };
}`,
      harness: `
        try {
          const result = countErrorsByType(['missing field: price', 'inStock has wrong type', 'missing field: id']);
          window.__report('t1', result.missing === 2, 'Should count 2 missing-field errors.');
          window.__report('t2', result.wrongType === 1, 'Should count 1 wrong-type error.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const result2 = countErrorsByType([]);
          window.__report('t3', result2.missing === 0 && result2.wrongType === 0, 'An empty errors array should produce zero counts of both kinds.');
        } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly counts missing-field errors", hidden: false },
        { id: "t2", description: "correctly counts wrong-type errors", hidden: false },
        { id: "t3", description: "handles an empty errors array", hidden: false },
      ],
      hints: [
        "Check each string's content to decide which category it belongs to.",
        "An empty input array should just return zero for both counts, not throw an error.",
      ],
    },
    commonMistakes: [
      "Spot-checking one field's value in one example response and calling the API's response shape \"tested,\" instead of validating the whole structure systematically.",
      'Lumping a missing field and a wrong-type field into one generic "invalid" result, losing information that would help diagnose the actual bug.',
      "Never checking for unexpected extra fields, which can quietly leak internal data that was never meant to be exposed.",
    ],
    quiz: [
      {
        id: "at-4-q1",
        prompt: "What does schema validation check that a single hand-picked field check does not?",
        choices: [
          "The response's overall structure — every required field's presence and type, systematically",
          "The server's CPU usage",
          "Only whether the status code is 200",
          "The response time",
        ],
        correctIndex: 0,
        explanation:
          "Schema validation systematically checks the entire response shape, not just one field's value in one example.",
      },
      {
        id: "at-4-q2",
        prompt:
          "Why should a missing field and a wrong-type field be reported as distinct kinds of errors?",
        choices: [
          "They shouldn't be — they're the same kind of problem",
          "They often point to different root causes in the server code, so distinguishing them makes bug reports more useful",
          "Missing fields are never a real bug",
          "Wrong-type fields cannot be detected automatically",
        ],
        correctIndex: 1,
        explanation:
          "A field that's entirely absent and a field that's present with the wrong type usually indicate different problems in the underlying implementation.",
      },
      {
        id: "at-4-q3",
        prompt: "Why might checking for unexpected extra fields in a response matter?",
        choices: [
          "It never matters",
          "Extra, undocumented fields can accidentally leak internal data that was never meant to be exposed",
          "Extra fields always improve API usability",
          "Only missing fields are worth checking",
        ],
        correctIndex: 1,
        explanation:
          "An API accidentally including internal fields in its response is a real, sometimes security-relevant defect that schema validation can also catch.",
      },
    ],
    takeaway:
      "Schema validation checks a response's entire shape systematically — required fields, correct types, and unexpected extras — catching structural defects that spot-checking a single example would likely miss.",
    summary:
      "This lab practiced writing a schema-validation check that distinguishes missing fields from wrong-type fields, and explained why systematic shape validation beats one-off field checks.",
    nextLessonSlug: "at-positive-negative-testing",
  },
  {
    id: "at-positive-negative-testing",
    slug: "at-positive-negative-testing",
    title: "Positive and Negative API Testing",
    description:
      "Confirming an API does what it should is only half the job. Negative testing confirms it correctly refuses what it shouldn't allow.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["at-json-schema-validation"],
    objectives: [
      "Distinguish positive test cases from negative test cases for a given endpoint",
      "Design negative test cases covering missing fields, wrong types, and invalid values",
      "Explain why a negative test that receives a 200 response indicates a real defect",
    ],
    skills: ["api-testing", "negative-testing"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Negative Testing",
        url: "https://glossary.istqb.org/en_US/term/negative-testing",
      },
    ],
    keywords: ["positive testing", "negative testing", "input validation", "api testing"],
    explanation: `**Positive testing** confirms the API does the right thing with valid input: create a user with a well-formed request, and it should succeed with a 201 and the expected data back. This is the testing most people write first, and it's necessary — but it only proves the API works when everything is done correctly, which is not how real usage looks. **Negative testing** confirms the API correctly *rejects* invalid input, and it's just as necessary, arguably more so: a broken create-user endpoint that silently accepts a request missing the required \`email\` field will store bad data that breaks something else later, somewhere far from where the mistake happened.

A thorough set of negative test cases for a single endpoint typically covers: a **missing required field** (send the request without \`email\` — expect a 400, not a 200 with a null email silently stored); a **wrong type** (send \`age: "twenty-five"\` instead of a number — expect a 400, not the string silently accepted or coerced unpredictably); an **invalid value within the right type** (send \`age: -5\`, a number, but not a sensible one — expect a 400, since type-correctness alone isn't validity); and **malformed input entirely** (send a request body that isn't valid JSON at all — expect a clean 400, not a 500 crash).

Here's the sharpest, most important idea in this lesson: **when a negative test case receives a success response, that is not a passing test — it's the discovery of a real defect.** A tester who runs \`POST /users\` with no \`email\` field and gets back \`201 Created\` has not confirmed the API is lenient; they've found proof the API accepts genuinely broken data into the system, which will eventually cause failures somewhere downstream, at a much less convenient time and place to diagnose.`,
    example: {
      language: "javascript",
      description:
        "A simulated user-creation validator, tested with one positive and three distinct negative cases — all deterministic, no real network call.",
      code: `function validateNewUser(payload) {
  if (typeof payload.email !== "string" || payload.email.length === 0) {
    return { status: 400, error: "email is required and must be a non-empty string" };
  }
  if (typeof payload.age !== "number" || payload.age < 0) {
    return { status: 400, error: "age must be a non-negative number" };
  }
  return { status: 201, body: { id: 1, ...payload } };
}

console.log(validateNewUser({ email: "a@b.com", age: 25 }));  // positive: 201
console.log(validateNewUser({ age: 25 }));                     // negative: missing email
console.log(validateNewUser({ email: "a@b.com", age: -5 }));   // negative: invalid value`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        'Add a fourth call testing a wrong-type age (a string like "25") and predict the result.',
      code: `function validateNewUser(payload) {
  if (typeof payload.email !== "string" || payload.email.length === 0) {
    return { status: 400, error: "email is required" };
  }
  if (typeof payload.age !== "number" || payload.age < 0) {
    return { status: 400, error: "age must be a non-negative number" };
  }
  return { status: 201, body: { id: 1, ...payload } };
}

console.log(validateNewUser({ email: "a@b.com", age: 25 }));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using the validateNewUser function already defined, run three cases and store their status codes: statusPositive (valid input), statusMissingEmail (no email field), statusNegativeAge (age is -1).",
      starterCode: `function validateNewUser(payload) {
  if (typeof payload.email !== "string" || payload.email.length === 0) return { status: 400 };
  if (typeof payload.age !== "number" || payload.age < 0) return { status: 400 };
  return { status: 201 };
}

let statusPositive = 0; // TODO
let statusMissingEmail = 0; // TODO
let statusNegativeAge = 0; // TODO
`,
      solutionCode: `function validateNewUser(payload) {
  if (typeof payload.email !== "string" || payload.email.length === 0) return { status: 400 };
  if (typeof payload.age !== "number" || payload.age < 0) return { status: 400 };
  return { status: 201 };
}

let statusPositive = validateNewUser({ email: "a@b.com", age: 30 }).status;
let statusMissingEmail = validateNewUser({ age: 30 }).status;
let statusNegativeAge = validateNewUser({ email: "a@b.com", age: -1 }).status;`,
      harness: `
        try { window.__report('t1', statusPositive === 201, 'Valid input should produce a 201.'); } catch (e) { window.__report('t1', false, 'statusPositive is not defined: ' + e.message); }
        try { window.__report('t2', statusMissingEmail === 400, 'Missing email should be rejected with a 400.'); } catch (e) { window.__report('t2', false, 'statusMissingEmail is not defined: ' + e.message); }
        try { window.__report('t3', statusNegativeAge === 400, 'A negative age should be rejected with a 400.'); } catch (e) { window.__report('t3', false, 'statusNegativeAge is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "positive case returns 201", hidden: false },
        { id: "t2", description: "missing-email negative case returns 400", hidden: false },
        { id: "t3", description: "negative-age negative case returns 400", hidden: false },
      ],
      hints: [
        "Call validateNewUser with an object literal for each case and read .status off the result.",
        "Two of the three cases are deliberately invalid input, expecting 400.",
      ],
    },
    independentExercise: {
      id: "at-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function flagFalsePositive(testCaseIsNegative, actualStatus) that returns true if a negative test case (testCaseIsNegative is true) unexpectedly received a success status (2xx) — meaning the API wrongly accepted invalid input. Return false in every other combination.",
      starterCode: `function flagFalsePositive(testCaseIsNegative, actualStatus) {
  // TODO
}
`,
      solutionCode: `function flagFalsePositive(testCaseIsNegative, actualStatus) {
  const wasSuccess = actualStatus >= 200 && actualStatus < 300;
  return testCaseIsNegative && wasSuccess;
}`,
      harness: `
        try { window.__report('t1', flagFalsePositive(true, 201) === true, 'A negative test case that got a 201 has found a real defect -- flag it.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', flagFalsePositive(true, 400) === false, 'A negative test case correctly rejected with 400 is not a defect.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', flagFalsePositive(false, 200) === false, 'A positive test case correctly succeeding is not a defect.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "flags a negative test case that wrongly succeeded",
          hidden: false,
        },
        {
          id: "t2",
          description: "does not flag a correctly-rejected negative case",
          hidden: false,
        },
        {
          id: "t3",
          description: "does not flag a correctly-succeeding positive case",
          hidden: false,
        },
      ],
      hints: [
        "The defect pattern is specifically: this was supposed to be invalid input, AND it got a success status anyway.",
        "A negative case that correctly gets rejected (400/422/etc.) is a passing test, not a defect.",
      ],
    },
    commonMistakes: [
      'Writing only positive test cases and treating "it works with good data" as complete coverage.',
      "Treating a negative test case that unexpectedly returns 200 as a passing test instead of a discovered defect.",
      "Testing only one kind of invalid input (e.g. only missing fields) and skipping wrong types and invalid-but-correctly-typed values.",
    ],
    quiz: [
      {
        id: "at-5-q1",
        prompt: "What does negative testing verify that positive testing does not?",
        choices: [
          "That the API is fast",
          "That the API correctly rejects invalid input, rather than only confirming it accepts valid input",
          "That the documentation is accurate",
          "Negative testing and positive testing check the same thing",
        ],
        correctIndex: 1,
        explanation:
          "Negative testing specifically targets whether invalid input is correctly refused, which positive testing never exercises.",
      },
      {
        id: "at-5-q2",
        prompt:
          "A negative test case sends a request missing a required field and receives a 201 Created. What does this mean?",
        choices: [
          "The test passed — the API is being lenient",
          "This is a real, discovered defect: invalid data was accepted when it should have been rejected",
          "This is expected behavior for all APIs",
          "The test result should be ignored",
        ],
        correctIndex: 1,
        explanation:
          "A negative test case receiving a success response is exactly the situation where the test has done its job: it found a real defect, not a passing result.",
      },
      {
        id: "at-5-q3",
        prompt:
          "Which of these is NOT a distinct category of negative test case for an input field?",
        choices: [
          "A missing required field",
          "A value of the wrong type",
          "A value of the correct type but an invalid value (like a negative age)",
          "A value that happens to be identical to a previous test's value",
        ],
        correctIndex: 3,
        explanation:
          "Reusing the same value isn't a meaningful negative-testing category — missing fields, wrong types, and invalid-but-correctly-typed values are the real, distinct categories.",
      },
    ],
    takeaway:
      "Negative testing is not optional polish — it verifies the API correctly rejects invalid input, and a negative test case that unexpectedly succeeds has found a real defect, not passed.",
    summary:
      "This lesson covered the categories of negative test cases (missing fields, wrong types, invalid values) and the key insight that a negative case receiving a success response is a discovered defect.",
    nextLessonSlug: "at-boundary-cases-apis",
  },
  {
    id: "at-boundary-cases-apis",
    slug: "at-boundary-cases-apis",
    title: "Boundary Cases for API Inputs (Lab)",
    description:
      "A hands-on lab: apply boundary-value analysis specifically to API payloads — numeric limits, string lengths, array sizes, and pagination edges.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["at-positive-negative-testing"],
    objectives: [
      "Identify boundary values for a documented numeric or length limit in an API",
      "Design test cases for empty, minimum, and maximum-sized collections",
      "Explain pagination edge cases specific to API testing",
    ],
    skills: ["api-testing", "boundary-value-analysis"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Boundary Value Analysis",
        url: "https://glossary.istqb.org/en_US/term/boundary-value-analysis",
      },
    ],
    keywords: ["boundary value analysis", "pagination", "api testing"],
    explanation: `Boundary-value analysis (from Software Testing Foundations) applies directly to API payloads, with a few API-specific shapes worth calling out explicitly. A documented limit like "a product name must be 1 to 100 characters" produces the familiar six boundary values (0, 1, 2, 99, 100, 101 characters) — nothing new there. What's specific to APIs is testing the **edges of collections and pagination**, which have no equivalent in a single-field form.

An **empty collection** (a user with zero orders) is a boundary case its own right — does \`GET /users/7/orders\` return an empty array \`[]\`, or does it error, or return \`null\`? All three are plausible implementations and only one is usually correct per the API's contract; a test suite that only ever tests users *with* orders will never notice this.

A collection at the **documented maximum size** (if an API states "returns up to 100 items per page") needs a request that returns exactly 100, one that returns 101 (does it truncate, error, or silently return everyone?), and a request for page 2 to confirm pagination actually advances rather than repeating page 1.

**Pagination-specific edges** deserve their own checklist: requesting a page number of 0 or negative (should this be rejected or clamped to page 1?); requesting a page far beyond the last page of real data (should this return an empty array, or error?); requesting a page size of 0 (division-by-zero-shaped bugs love this exact input). None of these are exotic hacker inputs — they're the kind of value a legitimate client can produce accidentally from a bug in its own pagination logic, which makes handling them gracefully, not just theoretically, a real production concern.`,
    example: {
      language: "javascript",
      description:
        "A simulated paginated response, with a boundary check for a page number beyond the available data.",
      code: `function paginate(items, page, pageSize) {
  if (page < 1 || pageSize < 1) return { status: 400, error: "invalid pagination parameters" };
  const start = (page - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);
  return { status: 200, body: pageItems, totalItems: items.length };
}

const items = ["a", "b", "c"]; // simulated dataset -- not a real API call
console.log(paginate(items, 1, 2));  // page 1: ["a", "b"]
console.log(paginate(items, 5, 2));  // page 5: past the end -- what should this return?`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Try page 0 and a negative pageSize below and predict what should happen before running.",
      code: `function paginate(items, page, pageSize) {
  if (page < 1 || pageSize < 1) return { status: 400, error: "invalid pagination parameters" };
  const start = (page - 1) * pageSize;
  return { status: 200, body: items.slice(start, start + pageSize) };
}

const items = ["a", "b", "c"];
console.log(paginate(items, 0, 2));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A product name field allows 1 to 50 characters. List the six boundary-value lengths as an array in ascending order named boundaryLengths.",
      starterCode: `let boundaryLengths = []; // TODO: [0, 1, 2, 49, 50, 51]
`,
      solutionCode: `let boundaryLengths = [0, 1, 2, 49, 50, 51];`,
      harness: `
        try {
          const expected = [0, 1, 2, 49, 50, 51];
          const matches = Array.isArray(boundaryLengths) && boundaryLengths.length === 6 && expected.every((v, i) => boundaryLengths[i] === v);
          window.__report('t1', matches, 'boundaryLengths should be [0, 1, 2, 49, 50, 51] in ascending order.');
        } catch (e) { window.__report('t1', false, 'boundaryLengths is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "returns the correct six boundary lengths in order",
          hidden: false,
        },
      ],
      hints: [
        "The lower boundary is 1 (0, 1, 2 surround it); the upper boundary is 50 (49, 50, 51 surround it).",
        "Each boundary contributes exactly three consecutive values to the array, in ascending order overall.",
      ],
    },
    independentExercise: {
      id: "at-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function paginationEdgeCase(page, pageSize, totalItems) that returns 'invalid' if page < 1 or pageSize < 1, 'empty-page' if the page is beyond the last page of real data, or 'normal' otherwise.",
      starterCode: `function paginationEdgeCase(page, pageSize, totalItems) {
  // TODO
}
`,
      solutionCode: `function paginationEdgeCase(page, pageSize, totalItems) {
  if (page < 1 || pageSize < 1) return "invalid";
  const start = (page - 1) * pageSize;
  if (start >= totalItems) return "empty-page";
  return "normal";
}`,
      harness: `
        try { window.__report('t1', paginationEdgeCase(0, 10, 30) === 'invalid', 'Page 0 should be invalid.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', paginationEdgeCase(1, 10, 30) === 'normal', 'Page 1 of 3 pages of real data is normal.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', paginationEdgeCase(10, 10, 30) === 'empty-page', 'Page 10 (start index 90) is far past 30 total items -- an empty page.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', paginationEdgeCase(2, -5, 30) === 'invalid', 'A negative pageSize should be invalid.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "page 0 is invalid", hidden: false },
        { id: "t2", description: "an in-range page is normal", hidden: false },
        { id: "t3", description: "a far-beyond-range page is empty-page", hidden: false },
        { id: "t4", description: "a negative pageSize is invalid", hidden: false },
      ],
      hints: [
        "Invalid parameters (page or pageSize below 1) should be checked first.",
        "Compare the page's starting index against totalItems to detect a page beyond the real data.",
      ],
    },
    commonMistakes: [
      "Only testing pagination with realistic, in-range page numbers and never testing page 0, negative pages, or pages far beyond the data.",
      "Assuming an empty collection will be handled the same way as a populated one without actually testing the empty case.",
      "Not testing the exact boundary of a documented maximum page size (e.g. exactly 100 vs. 101 items requested).",
    ],
    quiz: [
      {
        id: "at-6-q1",
        prompt: "Why is an empty collection (zero items) considered a boundary case worth testing?",
        choices: [
          "It isn't — empty collections never cause bugs",
          "Whether an API returns an empty array, null, or an error for zero results is a real, implementation-specific decision worth verifying",
          "Empty collections are always rejected with a 400",
          "This only matters for POST requests",
        ],
        correctIndex: 1,
        explanation:
          "An empty result is a distinct, plausible edge in how an API might respond, and different implementations handle it differently — it needs its own test.",
      },
      {
        id: "at-6-q2",
        prompt:
          "A client requests page 999 of a resource that only has 3 pages of real data. What should a test verify?",
        choices: [
          "That the server crashes",
          "That the API handles this gracefully in a defined, documented way (e.g. empty array), not with an unhandled error",
          "This case never needs testing",
          "That the API always returns page 1 instead",
        ],
        correctIndex: 1,
        explanation:
          "A page number beyond the real data is a realistic edge case (easy for a legitimate client to hit through its own bug) and should be handled predictably, not crash.",
      },
      {
        id: "at-6-q3",
        prompt:
          "Which pagination-specific input is especially likely to trigger a division-by-zero-shaped bug?",
        choices: [
          "A page size of 0",
          "A page number of 1",
          "A large but valid page size",
          "An empty string as a filter",
        ],
        correctIndex: 0,
        explanation:
          "A page size of 0 is exactly the kind of degenerate input that can trigger division-by-zero or infinite-loop-shaped bugs in pagination math.",
      },
    ],
    takeaway:
      "Boundary-value analysis for APIs extends beyond single-field limits to collection edges — empty results, maximum page sizes, and pagination parameters a legitimate client can accidentally send.",
    summary:
      "This lab practiced applying boundary-value analysis to API-specific shapes: field length limits, empty collections, maximum page sizes, and pagination edge cases like page 0 or a far-out-of-range page.",
    nextLessonSlug: "at-contract-testing",
  },
  {
    id: "at-contract-testing",
    slug: "at-contract-testing",
    title: "Contract Testing Concepts",
    description:
      "How teams keep an API's consumers and provider in sync without one giant end-to-end test suite for every possible combination.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["at-boundary-cases-apis"],
    objectives: [
      "Explain what a contract is in the context of API testing",
      "Distinguish contract testing from full end-to-end integration testing",
      "Identify a contract-breaking change to an API response",
    ],
    skills: ["api-testing", "contract-testing"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [{ label: "Pact: Contract Testing", url: "https://docs.pact.io/" }],
    keywords: ["contract testing", "consumer-driven contracts", "api compatibility"],
    explanation: `A frontend team and a backend team both work on the same product, but on separate schedules. The frontend expects an API response shaped a certain way; the backend, refactoring internally, changes a field name without realizing three different consumers depend on the old one. Nobody notices until the frontend breaks in production. **Contract testing** exists to catch exactly this class of problem early, without requiring the frontend and backend to be deployed together and fully end-to-end tested on every single change.

A **contract** is an explicit, agreed-upon description of what a consumer expects from a provider: which endpoints exist, what request shape they accept, and what response shape they return. Once written down, the contract becomes something both sides can test against independently: the provider verifies its actual API still satisfies the contract every time it changes; the consumer verifies its code correctly handles data shaped according to the contract, without needing a live version of the real backend running at all.

This is meaningfully different from full end-to-end integration testing, which spins up real, connected versions of both systems and exercises them together — thorough, but slow, and it only tests the *specific* combination of versions that happen to be running at that moment. Contract testing is faster (each side tests independently against a shared, explicit specification) and catches breaking changes earlier, often before the two services are ever deployed together at all.

Common contract-breaking changes worth specifically watching for: renaming a field the consumer reads, changing a field's type (a number becoming a string), removing a field a consumer depended on, or making a previously-optional field required in the request. Not every response change breaks a contract — *adding* a new, additional field that no existing consumer reads yet is usually safe (this is why consumers are conventionally expected to ignore fields they don't recognize, rather than rejecting anything unfamiliar).`,
    example: {
      language: "javascript",
      description:
        "A tiny contract check: does an actual (simulated) response still satisfy what a consumer explicitly depends on?",
      code: `const contract = { requiredFields: ["id", "email"], fieldTypes: { id: "number", email: "string" } };

// Simulated provider response -- not a real network call.
const actualResponse = { id: 42, email: "ada@example.com", newInternalFlag: true };

function satisfiesContract(response, contract) {
  return contract.requiredFields.every(
    (field) => field in response && typeof response[field] === contract.fieldTypes[field],
  );
}

console.log(satisfiesContract(actualResponse, contract)); // true -- the extra field is fine, ignored`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Rename 'email' to 'emailAddress' in actualResponse (a breaking change) and re-run.",
      code: `const contract = { requiredFields: ["id", "email"], fieldTypes: { id: "number", email: "string" } };
const actualResponse = { id: 42, email: "ada@example.com" };

function satisfiesContract(response, contract) {
  return contract.requiredFields.every(
    (field) => field in response && typeof response[field] === contract.fieldTypes[field],
  );
}

console.log(satisfiesContract(actualResponse, contract));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A consumer's contract requires a 'total' field of type number. Two provider changes are proposed. Set isBreakingA and isBreakingB: changeA renames 'total' to 'totalAmount'. changeB adds a brand-new optional 'currency' field alongside the existing 'total' field.",
      starterCode: `let isBreakingA = null; // TODO
let isBreakingB = null; // TODO
`,
      solutionCode: `let isBreakingA = true;
let isBreakingB = false;`,
      harness: `
        try { window.__report('t1', isBreakingA === true, 'Renaming a field the consumer depends on breaks the contract.'); } catch (e) { window.__report('t1', false, 'isBreakingA is not defined: ' + e.message); }
        try { window.__report('t2', isBreakingB === false, 'Adding a new field that no consumer reads yet does not break the contract.'); } catch (e) { window.__report('t2', false, 'isBreakingB is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies the rename as breaking", hidden: false },
        {
          id: "t2",
          description: "correctly identifies the additive change as non-breaking",
          hidden: false,
        },
      ],
      hints: [
        "Ask: does the consumer's existing code stop working if this change ships?",
        "Removing or renaming a depended-on field breaks consumers; adding a new, unused field does not.",
      ],
    },
    independentExercise: {
      id: "at-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function isBreakingChange(oldContract, newResponse) that returns true if any field listed in oldContract.requiredFields is either missing from newResponse or has a different typeof than oldContract.fieldTypes says.",
      starterCode: `function isBreakingChange(oldContract, newResponse) {
  // TODO
}
`,
      solutionCode: `function isBreakingChange(oldContract, newResponse) {
  return oldContract.requiredFields.some((field) => {
    if (!(field in newResponse)) return true;
    return typeof newResponse[field] !== oldContract.fieldTypes[field];
  });
}`,
      harness: `
        const contract = { requiredFields: ['id', 'total'], fieldTypes: { id: 'number', total: 'number' } };
        try { window.__report('t1', isBreakingChange(contract, { id: 1, total: 100 }) === false, 'A response satisfying the contract should not be flagged as breaking.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', isBreakingChange(contract, { id: 1, total: "100" }) === true, 'A type change (number to string) should be flagged as breaking.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', isBreakingChange(contract, { id: 1 }) === true, 'A missing required field should be flagged as breaking.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
        try { window.__report('t4', isBreakingChange(contract, { id: 1, total: 100, extra: true }) === false, 'An added extra field should not be flagged as breaking.'); } catch (e) { window.__report('t4', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a conforming response is not flagged", hidden: false },
        { id: "t2", description: "a type change is flagged as breaking", hidden: false },
        { id: "t3", description: "a missing field is flagged as breaking", hidden: false },
        { id: "t4", description: "an extra field is not flagged as breaking", hidden: false },
      ],
      hints: [
        "Check every required field for both presence and correct type.",
        "An extra, unrequired field in the response should never cause a false positive.",
      ],
    },
    commonMistakes: [
      "Relying only on full end-to-end tests to catch breaking API changes, which is slower and only tests the exact version combination currently deployed.",
      "Treating every response change as equally risky, when adding a new unused field is usually safe and removing or retyping an existing one usually isn't.",
      "Writing a contract once and never updating it as the consumer's real needs change, letting it drift from reality.",
    ],
    quiz: [
      {
        id: "at-7-q1",
        prompt: "What is a 'contract' in the context of contract testing?",
        choices: [
          "A legal document between companies",
          "An explicit, agreed-upon description of what a consumer expects from a provider's API",
          "A type of load test",
          "A synonym for the OpenAPI specification format specifically",
        ],
        correctIndex: 1,
        explanation:
          "A contract is a concrete, testable description of the expected request/response shape both the consumer and provider can independently verify against.",
      },
      {
        id: "at-7-q2",
        prompt: "How does contract testing differ from full end-to-end integration testing?",
        choices: [
          "They are identical",
          "Contract testing lets each side test independently against a shared specification, faster and earlier than deploying both systems together",
          "Contract testing requires both systems to be live and connected",
          "Contract testing only applies to databases",
        ],
        correctIndex: 1,
        explanation:
          "Contract testing avoids the need for both services to be deployed together to catch a compatibility break, unlike full end-to-end testing.",
      },
      {
        id: "at-7-q3",
        prompt: "Which change is generally considered non-breaking to an existing contract?",
        choices: [
          "Renaming a field an existing consumer reads",
          "Removing a field an existing consumer reads",
          "Adding a new, additional field that no existing consumer reads yet",
          "Changing a field's type from number to string",
        ],
        correctIndex: 2,
        explanation:
          "Adding an unused field is conventionally safe because well-behaved consumers ignore fields they don't recognize — renaming, removing, or retyping a depended-on field are the breaking changes.",
      },
    ],
    takeaway:
      "Contract testing lets consumers and providers verify compatibility independently against an explicit, shared specification, catching breaking changes earlier and faster than full end-to-end testing alone.",
    summary:
      "This lesson introduced contract testing as a way to catch API compatibility breaks early, and distinguished breaking changes (renames, removals, type changes) from safe additive changes.",
    nextLessonSlug: "at-data-driven-testing",
  },
  {
    id: "at-data-driven-testing",
    slug: "at-data-driven-testing",
    title: "Data-Driven API Testing",
    description:
      "Separate the test logic from the test data, so adding a new case is a one-line data change instead of writing a whole new test.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["at-contract-testing"],
    objectives: [
      "Refactor several near-duplicate test cases into one data-driven test",
      "Explain the maintenance benefit of separating test data from test logic",
      "Design a data table covering several of this course's earlier test-design techniques at once",
    ],
    skills: ["api-testing", "data-driven-testing"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Data-Driven Testing",
        url: "https://glossary.istqb.org/en_US/term/data-driven-testing",
      },
    ],
    keywords: ["data-driven testing", "parameterized tests", "test maintenance"],
    explanation: `Five near-identical test functions, each hard-coding one input and one expected output, are five places to update every time the validation rule changes even slightly — and five places a future edit can accidentally update four of and forget the fifth. **Data-driven testing** separates the *data* (which specific inputs and expected outputs) from the *logic* (how to run the check), so the logic is written exactly once and the data lives in one clearly readable table.

The shape is simple: a list of cases, each with an input and an expected result, run through a single loop that applies the same check to every row. Adding a new test case becomes adding one row to the table — no new function, no copy-pasted boilerplate, no risk of the copy silently diverging from the original.

This connects directly to the test design techniques from earlier in this course and Software Testing Foundations: equivalence partitioning and boundary-value analysis are exactly how you decide *which* rows belong in the data table in the first place. A data-driven test for an age-validation endpoint might have rows for: a negative age (invalid), age 0 (boundary), age 17 (equivalence class: under minimum), age 18 (boundary), age 65 (comfortably valid), age 150 (equivalence class: implausibly high). The technique from earlier lessons decides the *content*; data-driven testing decides the *structure* that makes maintaining many such cases sustainable.

The maintenance payoff compounds as an API grows: a validation rule that starts with 3 test cases and grows to 30 over a project's life is either 30 separate near-duplicate functions (each one a small maintenance liability) or one function and a 30-row table (one place to fix a bug in the check itself, however many rows the table eventually holds).`,
    example: {
      language: "javascript",
      description:
        "Five separate near-duplicate test functions collapsed into one data-driven check — same coverage, one place to fix the logic.",
      code: `function isValidAge(age) {
  return Number.isInteger(age) && age >= 18 && age <= 120;
}

const cases = [
  { input: -1, expected: false },
  { input: 0, expected: false },
  { input: 17, expected: false },
  { input: 18, expected: true },
  { input: 65, expected: true },
  { input: 150, expected: false },
];

const results = cases.map((c) => ({ ...c, actual: isValidAge(c.input), pass: isValidAge(c.input) === c.expected }));
console.log(results.every((r) => r.pass)); // true -- every row passes`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add one more row to the cases array for age 120 (the upper boundary) and re-run.",
      code: `function isValidAge(age) {
  return Number.isInteger(age) && age >= 18 && age <= 120;
}

const cases = [
  { input: -1, expected: false },
  { input: 18, expected: true },
];

const results = cases.map((c) => ({ ...c, pass: isValidAge(c.input) === c.expected }));
console.log(results.every((r) => r.pass));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using isValidAge and cases already defined, count how many rows fail by setting failCount.",
      starterCode: `function isValidAge(age) {
  return Number.isInteger(age) && age >= 18 && age <= 120;
}

const cases = [
  { input: 10, expected: true },  // intentionally wrong expectation, to produce a failure
  { input: 18, expected: true },
  { input: 200, expected: false },
];

let failCount = 0; // TODO: count rows where isValidAge(input) !== expected
`,
      solutionCode: `function isValidAge(age) {
  return Number.isInteger(age) && age >= 18 && age <= 120;
}

const cases = [
  { input: 10, expected: true },
  { input: 18, expected: true },
  { input: 200, expected: false },
];

let failCount = cases.filter((c) => isValidAge(c.input) !== c.expected).length;`,
      harness: `
        try { window.__report('t1', failCount === 1, 'Exactly one row (age 10, wrongly expected true) should fail.'); } catch (e) { window.__report('t1', false, 'failCount is not defined: ' + e.message); }
      `,
      tests: [{ id: "t1", description: "correctly counts the one failing row", hidden: false }],
      hints: [
        "Filter the cases array to rows where isValidAge(input) does not equal expected.",
        "Only the first row has an incorrect expectation baked in.",
      ],
    },
    independentExercise: {
      id: "at-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function runDataDrivenTest(fn, cases) that takes a function and an array of { input, expected } rows, and returns an array of the input values that FAILED (where fn(input) !== expected).",
      starterCode: `function runDataDrivenTest(fn, cases) {
  // TODO
}
`,
      solutionCode: `function runDataDrivenTest(fn, cases) {
  return cases.filter((c) => fn(c.input) !== c.expected).map((c) => c.input);
}`,
      harness: `
        function isEven(n) { return n % 2 === 0; }
        try {
          const cases = [{ input: 2, expected: true }, { input: 3, expected: true }, { input: 4, expected: true }];
          const failures = runDataDrivenTest(isEven, cases);
          window.__report('t1', Array.isArray(failures) && failures.length === 1 && failures[0] === 3, 'Should return [3], the only input whose actual result did not match its expected value.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const allPass = [{ input: 2, expected: true }, { input: 4, expected: true }];
          window.__report('t2', runDataDrivenTest(isEven, allPass).length === 0, 'When every row passes, the failures array should be empty.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies the one failing input", hidden: false },
        { id: "t2", description: "returns an empty array when all rows pass", hidden: false },
      ],
      hints: [
        "Filter the cases to ones where calling fn on the input doesn't match expected, then map to just the input values.",
        "An all-passing data table should produce an empty failures array, not undefined or null.",
      ],
    },
    commonMistakes: [
      "Copy-pasting a test function for each new case instead of adding a row to a shared data table, multiplying the places a future bug fix needs to be applied.",
      'Building a data table with only "obviously valid" rows, skipping the equivalence-class and boundary-value thinking that decides which rows actually matter.',
      "Making the data-driven runner itself so complex that it becomes harder to trust than the simple duplicated functions it replaced.",
    ],
    quiz: [
      {
        id: "at-8-q1",
        prompt: "What is the core idea behind data-driven testing?",
        choices: [
          "Running tests only on production data",
          "Separating test data (inputs and expected results) from test logic (how the check runs), so logic is written once",
          "Testing only with randomly generated data",
          "Avoiding the use of any test data at all",
        ],
        correctIndex: 1,
        explanation:
          "The defining idea is decoupling the data from the logic, so the check itself lives in exactly one place regardless of how many cases exist.",
      },
      {
        id: "at-8-q2",
        prompt:
          "How do equivalence partitioning and boundary-value analysis relate to data-driven testing?",
        choices: [
          "They are unrelated",
          "They decide which rows belong in the data table in the first place; data-driven testing decides how to structure running them",
          "Data-driven testing replaces the need for those techniques",
          "They can only be used with data-driven testing, never separately",
        ],
        correctIndex: 1,
        explanation:
          "The design techniques decide the content of the test cases; data-driven testing is a structural pattern for maintaining many such cases sustainably.",
      },
      {
        id: "at-8-q3",
        prompt:
          "What is the main maintenance risk of five separate, near-duplicate test functions instead of one data-driven test?",
        choices: [
          "There is no risk — they are equivalent",
          "A future change to the validation logic might get applied to some duplicates and accidentally missed in others",
          "Duplicate functions run faster",
          "Duplicate functions are easier to read",
        ],
        correctIndex: 1,
        explanation:
          "Duplicated logic across several near-identical functions creates multiple places that can silently drift out of sync when only some of them get updated.",
      },
    ],
    takeaway:
      'Data-driven testing separates test data from test logic, turning "add a new test case" into "add one row to a table" instead of writing and maintaining a new near-duplicate function.',
    summary:
      "This lesson covered collapsing near-duplicate test cases into one data-driven test, and how earlier test-design techniques decide which rows the data table should contain.",
    nextLessonSlug: "at-chained-requests",
  },
  {
    id: "at-chained-requests",
    slug: "at-chained-requests",
    title: "Chained Requests and Stateful Workflows (Lab)",
    description:
      "A hands-on lab: test a realistic multi-step workflow where each request depends on data returned by the one before it.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 24,
    prerequisites: ["at-data-driven-testing"],
    objectives: [
      "Design a test that carries data extracted from one response into a later request",
      "Identify where a chained workflow can fail even when each individual step works alone",
      "Explain why testing steps only in isolation misses real workflow defects",
    ],
    skills: ["api-testing", "chained-requests", "stateful-testing"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "MDN: HTTP overview",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
      },
    ],
    keywords: ["chained requests", "workflow testing", "stateful testing"],
    explanation: `Real usage rarely stops at one request. Create an order, then fetch its id from the response, then use that id to add an item, then use the order's total from *that* response to apply a payment. Each step depends on data extracted from the step before it — this is a **chained request workflow**, and it's a genuinely different testing problem from testing any single endpoint in isolation.

Testing each endpoint separately, with hand-picked hardcoded ids, proves each endpoint works when given a plausible id. It does *not* prove the endpoints work correctly *together* — that the id returned by "create order" is actually accepted by "add item," in the exact format it's returned in (a number vs. a string masquerading as a number is a classic mismatch here, echoing the integration-level defects from Software Testing Foundations).

A chained-request test carries state explicitly between steps: extract the value you need from each response, and pass it into the next request rather than hardcoding a fixed id. This mirrors real client code, which never knows an order's id in advance — it only learns it from the create response.

Two failure categories are specific to chains and worth testing deliberately: **a failure partway through** (step 2 succeeds, step 3 fails — what state is the system left in? Is the order now stuck half-created, or does it clean up?), and **using stale data from an earlier step after something has changed** (fetch an order's total, then apply a discount that changes it, then try to charge the *original*, now-stale total — does the payment step correctly reject or recompute, or does it silently charge the wrong amount?). Both failure modes are invisible to tests that only ever exercise one endpoint at a time.`,
    example: {
      language: "javascript",
      description:
        "A simulated three-step chained workflow: create an order, add an item using the id from step 1, then read the total. No real network calls — deterministic in-memory fixtures.",
      code: `const db = { orders: {} };

function createOrder() {
  const id = Object.keys(db.orders).length + 1;
  db.orders[id] = { id, items: [], total: 0 };
  return { status: 201, body: db.orders[id] };
}

function addItem(orderId, priceCents) {
  const order = db.orders[orderId];
  if (!order) return { status: 404 };
  order.items.push(priceCents);
  order.total = order.items.reduce((sum, p) => sum + p, 0);
  return { status: 200, body: order };
}

const createResponse = createOrder();
const orderId = createResponse.body.id; // chained: extracted from step 1
const addResponse = addItem(orderId, 500);
console.log(addResponse.body); // { id: 1, items: [500], total: 500 }`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Chain a second addItem call using the same orderId and confirm the total accumulates correctly.",
      code: `const db = { orders: {} };
function createOrder() {
  const id = Object.keys(db.orders).length + 1;
  db.orders[id] = { id, items: [], total: 0 };
  return { status: 201, body: db.orders[id] };
}
function addItem(orderId, priceCents) {
  const order = db.orders[orderId];
  order.items.push(priceCents);
  order.total = order.items.reduce((sum, p) => sum + p, 0);
  return { status: 200, body: order };
}

const orderId = createOrder().body.id;
console.log(addItem(orderId, 500));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using the createOrder/addItem functions already defined, chain three calls: create an order, add a 300-cent item, add a 700-cent item, then store the final total in finalTotal (should be 1000).",
      starterCode: `const db = { orders: {} };
function createOrder() {
  const id = Object.keys(db.orders).length + 1;
  db.orders[id] = { id, items: [], total: 0 };
  return { status: 201, body: db.orders[id] };
}
function addItem(orderId, priceCents) {
  const order = db.orders[orderId];
  order.items.push(priceCents);
  order.total = order.items.reduce((sum, p) => sum + p, 0);
  return { status: 200, body: order };
}

let finalTotal = 0; // TODO: chain createOrder then two addItem calls, using the id from createOrder
`,
      solutionCode: `const db = { orders: {} };
function createOrder() {
  const id = Object.keys(db.orders).length + 1;
  db.orders[id] = { id, items: [], total: 0 };
  return { status: 201, body: db.orders[id] };
}
function addItem(orderId, priceCents) {
  const order = db.orders[orderId];
  order.items.push(priceCents);
  order.total = order.items.reduce((sum, p) => sum + p, 0);
  return { status: 200, body: order };
}

const newOrderId = createOrder().body.id;
addItem(newOrderId, 300);
let finalTotal = addItem(newOrderId, 700).body.total;`,
      harness: `
        try { window.__report('t1', finalTotal === 1000, 'finalTotal should be 1000 (300 + 700) after chaining both addItem calls onto the same order id.'); } catch (e) { window.__report('t1', false, 'finalTotal is not defined: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "correctly chains three calls to reach the right total",
          hidden: false,
        },
      ],
      hints: [
        "Extract the order id from createOrder()'s response before calling addItem.",
        "Reuse the same extracted id for both addItem calls, don't hardcode a fixed id.",
      ],
    },
    independentExercise: {
      id: "at-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function chargeOrder(order, expectedTotal) that simulates a payment step: it should return { status: 409, error: 'stale total' } if expectedTotal does not match order.total (the client's data is stale), or { status: 200, charged: order.total } if it matches.",
      starterCode: `function chargeOrder(order, expectedTotal) {
  // TODO
}
`,
      solutionCode: `function chargeOrder(order, expectedTotal) {
  if (order.total !== expectedTotal) {
    return { status: 409, error: "stale total" };
  }
  return { status: 200, charged: order.total };
}`,
      harness: `
        try {
          const order = { total: 500 };
          const r = chargeOrder(order, 500);
          window.__report('t1', r.status === 200 && r.charged === 500, 'A matching expectedTotal should succeed and charge the correct amount.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const order = { total: 700 };
          const r = chargeOrder(order, 500);
          window.__report('t2', r.status === 409, 'A stale expectedTotal (500) against the real total (700) should be rejected with 409, not silently charge the wrong amount.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a fresh, matching total succeeds", hidden: false },
        {
          id: "t2",
          description: "a stale total is correctly rejected, not silently charged",
          hidden: false,
        },
      ],
      hints: [
        "The whole point of this check is refusing to charge an amount that no longer matches the real, current total.",
        "Compare expectedTotal against order.total exactly.",
      ],
    },
    commonMistakes: [
      "Testing each endpoint only with hardcoded, hand-picked ids instead of chaining real data extracted from a prior response.",
      "Never testing what happens when a chain fails partway through, leaving the system's actual state unverified.",
      "Assuming data fetched earlier in a chain is still valid later, without testing what happens when it's gone stale.",
    ],
    quiz: [
      {
        id: "at-9-q1",
        prompt:
          "Why is testing endpoints only in isolation insufficient for a multi-step workflow?",
        choices: [
          "It isn't insufficient — isolated testing is always enough",
          "It doesn't verify that data returned by one endpoint is actually usable, in the format given, by the next endpoint in the real workflow",
          "Isolated testing is slower than chained testing",
          "Chained requests cannot be tested at all",
        ],
        correctIndex: 1,
        explanation:
          "Isolated tests with hardcoded ids never verify the real hand-off between steps, which is exactly where format mismatches and workflow-specific bugs live.",
      },
      {
        id: "at-9-q2",
        prompt:
          "A payment step is asked to charge an order using a total fetched several steps earlier, which has since changed. What should a well-designed API do?",
        choices: [
          "Silently charge the old, stale total",
          "Detect the mismatch and reject or recompute, rather than silently using outdated data",
          "Ignore the total entirely",
          "This scenario can't happen in practice",
        ],
        correctIndex: 1,
        explanation:
          "Using stale data from an earlier step without validation is a real defect pattern — the correct behavior is to detect and handle the mismatch explicitly.",
      },
      {
        id: "at-9-q3",
        prompt: "What does 'chaining' mean in the context of chained-request testing?",
        choices: [
          "Running tests in alphabetical order",
          "Extracting data from one response and passing it into a subsequent request, mirroring how real client code works",
          "Running the same test multiple times",
          "Testing only the first request in a sequence",
        ],
        correctIndex: 1,
        explanation:
          "Chaining means using the actual data returned by one step as input to the next, rather than hardcoding values — exactly how real client code has to behave.",
      },
    ],
    takeaway:
      "Chained-request testing carries real data between steps rather than hardcoding ids, and deliberately tests partial-failure and stale-data scenarios that isolated single-endpoint tests can never reach.",
    summary:
      "This lab practiced chaining requests by extracting data from one response into the next, and covered the partial-failure and stale-data failure modes specific to multi-step workflows.",
    nextLessonSlug: "at-error-validation",
  },
  {
    id: "at-error-validation",
    slug: "at-error-validation",
    title: "Validating Error Responses",
    description:
      "An error response deserves the same careful scrutiny as a success response — the right status code, a genuinely useful body, and no leaked internals.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 17,
    prerequisites: ["at-chained-requests"],
    objectives: [
      "Design assertions for an error response's status, structure, and message content",
      "Identify when an error response leaks internal implementation details",
      "Explain why consistent error shape across endpoints matters for API consumers",
    ],
    skills: ["api-testing", "error-validation"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "RFC 7807: Problem Details for HTTP APIs",
        url: "https://www.rfc-editor.org/rfc/rfc7807",
      },
    ],
    keywords: ["error handling", "error validation", "api testing"],
    explanation: `A success response gets carefully checked against a schema, exact field values, and status code. An error response, in far too many test suites, gets a single lazy check: "is the status not 200?" That's a real gap — error responses are exactly as testable, and exactly as capable of hiding real defects, as success responses are.

A well-designed error response deserves three specific checks. **The status code** should be the correct, specific one for the situation (from earlier lessons: 400 for bad input, 401 for missing authentication, 403 for missing authorization, 404 for a resource that doesn't exist, 409 for a conflict like the stale-data case from the previous lesson) — not a generic 400 or 500 for every possible failure. **The body's structure** should be consistent and machine-readable: does every endpoint's error response use the same shape (say, \`{ "error": { "code": "...", "message": "..." } }\`), or does one endpoint return a plain string while another returns a nested object? Inconsistency here quietly breaks any client code trying to handle errors generically across the whole API. **The message content** should be genuinely useful to whoever's debugging — specific enough to act on ("email is required") rather than generic to the point of uselessness ("an error occurred").

There's a security dimension too, echoing the defect-reporting lesson from Software Testing Foundations: an error response should never leak internal details a real attacker could use — a full stack trace, an internal file path, a raw database error message, or (subtly) confirmation of whether a specific username or email exists in the system just from how the error is worded differently for "wrong password" versus "no such account." A tester validating error responses is doing double duty: confirming the API is genuinely useful to legitimate callers, and confirming it isn't accidentally useful to attackers.`,
    example: {
      language: "javascript",
      description:
        "A simulated error response checked for status, structure, message quality, and the absence of leaked internals.",
      code: `const errorResponse = {
  status: 400,
  body: { error: { code: "MISSING_FIELD", message: "email is required" } },
};

function isWellFormedError(res) {
  const hasCorrectStatus = res.status >= 400 && res.status < 500;
  const hasStructuredBody = typeof res.body?.error?.code === "string" && typeof res.body?.error?.message === "string";
  const leaksInternals = /stack|trace|\\/usr\\/|select /i.test(JSON.stringify(res.body));
  return hasCorrectStatus && hasStructuredBody && !leaksInternals;
}

console.log(isWellFormedError(errorResponse)); // true`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change the message to something that leaks a stack trace and re-run to see the check fail.",
      code: `const errorResponse = {
  status: 400,
  body: { error: { code: "MISSING_FIELD", message: "email is required" } },
};

function isWellFormedError(res) {
  const hasCorrectStatus = res.status >= 400 && res.status < 500;
  const hasStructuredBody = typeof res.body?.error?.code === "string" && typeof res.body?.error?.message === "string";
  const leaksInternals = /stack|trace|\\/usr\\/|select /i.test(JSON.stringify(res.body));
  return hasCorrectStatus && hasStructuredBody && !leaksInternals;
}

console.log(isWellFormedError(errorResponse));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Two endpoints return errors in different shapes: endpointA returns { error: { code, message } }, endpointB returns just a plain string. Set isConsistentShape to reflect whether these two endpoints use a consistent error structure.",
      starterCode: `const endpointA = { status: 400, body: { error: { code: "BAD", message: "bad input" } } };
const endpointB = { status: 400, body: "bad input" };

let isConsistentShape = null; // TODO
`,
      solutionCode: `const endpointA = { status: 400, body: { error: { code: "BAD", message: "bad input" } } };
const endpointB = { status: 400, body: "bad input" };

let isConsistentShape = false;`,
      harness: `
        try { window.__report('t1', isConsistentShape === false, 'endpointA returns a structured object; endpointB returns a plain string -- these are inconsistent shapes.'); } catch (e) { window.__report('t1', false, 'isConsistentShape is not defined: ' + e.message); }
      `,
      tests: [{ id: "t1", description: "correctly identifies the inconsistency", hidden: false }],
      hints: [
        "Compare the actual JS type of each response's body: object vs. string.",
        "A client trying to handle errors generically across both endpoints would need different code for each — that's the inconsistency.",
      ],
    },
    independentExercise: {
      id: "at-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function leaksInternalDetails(errorBody) that returns true if JSON.stringify(errorBody) case-insensitively contains any of: 'stack trace', a file path pattern like '/usr/' or 'c:\\\\', or 'select ' (a leaked SQL query fragment).",
      starterCode: `function leaksInternalDetails(errorBody) {
  // TODO
}
`,
      solutionCode: `function leaksInternalDetails(errorBody) {
  const text = JSON.stringify(errorBody).toLowerCase();
  return text.includes("stack trace") || text.includes("/usr/") || text.includes("c:\\\\") || text.includes("select ");
}`,
      harness: `
        try { window.__report('t1', leaksInternalDetails({ message: "email is required" }) === false, 'A clean, generic error message should not be flagged.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', leaksInternalDetails({ message: "Error at /usr/app/server.js, stack trace: ..." }) === true, 'A leaked file path and stack trace should be flagged.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', leaksInternalDetails({ message: "query failed: select * from users" }) === true, 'A leaked raw SQL query should be flagged.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a clean error message is not flagged", hidden: false },
        { id: "t2", description: "a leaked stack trace and path are flagged", hidden: false },
        { id: "t3", description: "a leaked SQL query is flagged", hidden: false },
      ],
      hints: [
        "Stringify the whole object first so nested fields are checked too, then lowercase it for a case-insensitive match.",
        "Check for any of the three telltale patterns, not all three at once.",
      ],
    },
    commonMistakes: [
      "Checking only that an error response's status code is \"not 200,\" without verifying it's the specific, correct error code for the situation.",
      "Using a different error body shape on different endpoints, breaking any client code that tries to handle errors generically.",
      "Never testing error responses for leaked internal details, treating that concern as security-team-only rather than something any API tester can check.",
    ],
    quiz: [
      {
        id: "at-10-q1",
        prompt:
          'Why is checking only "the status code is not 200" an insufficient test for an error response?',
        choices: [
          "It isn't insufficient — that's a complete test",
          "It misses whether the status is the specific correct code, the body is well-structured, and no internal details are leaked",
          "Status codes don't matter for error responses",
          "This check only applies to success responses",
        ],
        correctIndex: 1,
        explanation:
          'A thorough error-response test checks the specific correct status, a consistent structured body, useful message content, and the absence of leaked details — not just "not success."',
      },
      {
        id: "at-10-q2",
        prompt:
          "Why does consistent error shape across different endpoints of the same API matter?",
        choices: [
          "It doesn't matter at all",
          "Client code that tries to handle errors generically across the API breaks if different endpoints use different shapes",
          "Only successful responses need consistent shape",
          "Consistent shape is only a cosmetic preference",
        ],
        correctIndex: 1,
        explanation:
          "Inconsistent error shapes force every piece of client code to handle each endpoint's errors specially, which is exactly the kind of fragility a consistent contract prevents.",
      },
      {
        id: "at-10-q3",
        prompt: "What security-relevant check should a tester apply to error messages?",
        choices: [
          "None — security is not a tester's concern",
          "Verify the error message doesn't leak internal details like stack traces, file paths, or raw database errors",
          "Verify the error message is always in English",
          "Verify the error message is under 10 characters",
        ],
        correctIndex: 1,
        explanation:
          "Leaked internal details in error messages are a real, testable security concern that any tester, not just a security specialist, should check for.",
      },
    ],
    takeaway:
      "Error responses deserve the same rigor as success responses: the specific correct status code, a consistent structured body, a genuinely useful message, and no leaked internal details.",
    summary:
      "This lesson covered validating error responses for correct status codes, consistent structure across endpoints, and the absence of leaked internal implementation details.",
    nextLessonSlug: "at-idempotency-rate-limits",
  },
  {
    id: "at-idempotency-rate-limits",
    slug: "at-idempotency-rate-limits",
    title: "Idempotency and Rate-Limit Behavior",
    description:
      "Why sending the same request twice should sometimes be perfectly safe, and how to test an API's rate limiting without a real load-testing tool.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["at-error-validation"],
    objectives: [
      "Classify HTTP methods as idempotent or non-idempotent and explain what that guarantees",
      "Design a test that verifies (or disproves) a claimed idempotency guarantee",
      "Explain what a well-designed 429 rate-limit response should include",
    ],
    skills: ["api-testing", "idempotency", "rate-limiting"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "MDN: Idempotent",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Idempotent",
      },
    ],
    keywords: ["idempotency", "rate limiting", "retry safety", "api testing"],
    explanation: `A mobile app sends a "charge this card" request, but the network drops before the response arrives. Does the app retry? If it does, and the first request actually succeeded on the server before the connection dropped, a naive retry charges the customer twice. **Idempotency** is the property that makes safe retrying possible: an idempotent operation produces the same end result no matter how many times it's repeated with the same input.

By HTTP convention, GET, PUT, and DELETE are supposed to be idempotent: fetching a resource repeatedly doesn't change it; replacing a resource with the same data repeatedly leaves it in the same final state; deleting an already-deleted resource is still "deleted" (whether it returns 204 or 404 the second time is an implementation choice, but the *result* — the resource being gone — doesn't change). POST is conventionally NOT idempotent, because it typically means "create a new thing" — sending the same POST twice conventionally creates two things, unless the API deliberately adds its own extra safety mechanism on top (commonly an "idempotency key" the client generates once and sends with every retry, letting the server recognize and safely ignore a duplicate).

Testing idempotency directly is refreshingly literal: send the same request twice (or three times) and verify the *end state* — not just the response — genuinely matches what one successful call alone would produce. A DELETE that's supposed to be idempotent but throws an unhandled 500 on the second call has broken its own contract, even if the first call worked perfectly.

**Rate limiting** is a related but distinct reliability concern: an API that allows unlimited requests per second from one client is vulnerable to being overwhelmed, accidentally or deliberately. A well-designed rate limit responds with status 429 (Too Many Requests) once a client exceeds its allowance, and a genuinely useful 429 response tells the caller *when* they can retry — typically via a Retry-After header or a field in the body — rather than leaving the client to guess and hammer the API blindly. A tester doesn't need a real load-testing tool to verify this logic exists and behaves correctly; the counting and threshold logic itself can be tested directly, the same way any other piece of business logic can.`,
    example: {
      language: "javascript",
      description:
        "A simulated idempotent DELETE and a non-idempotent POST, tested by calling each twice and comparing end states.",
      code: `const resources = { 1: "widget" };

function deleteResource(id) {
  const existed = id in resources;
  delete resources[id];
  return { status: existed ? 204 : 404 };
}

function createResource(name) {
  const id = Object.keys(resources).length + 1;
  resources[id] = name;
  return { status: 201, id };
}

console.log(deleteResource(1)); // 204 -- deleted
console.log(deleteResource(1)); // 404 this time, but the RESULT (gone) is unchanged -- idempotent
console.log(Object.keys(resources).length); // still reflects one delete, not two`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Call createResource twice with the same name and observe that (unlike delete) it creates two separate entries.",
      code: `const resources = {};
function createResource(name) {
  const id = Object.keys(resources).length + 1;
  resources[id] = name;
  return { status: 201, id };
}

console.log(createResource("widget"));
console.log(createResource("widget"));
console.log(Object.keys(resources).length);`,
      editable: true,
    },
    guidedExercise: {
      id: "at-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Classify each HTTP method's conventional idempotency using the strings 'idempotent' or 'not-idempotent': methodGet, methodPost, methodDelete.",
      starterCode: `let methodGet = ""; // TODO
let methodPost = ""; // TODO
let methodDelete = ""; // TODO
`,
      solutionCode: `let methodGet = "idempotent";
let methodPost = "not-idempotent";
let methodDelete = "idempotent";`,
      harness: `
        try { window.__report('t1', methodGet === 'idempotent', 'GET is conventionally idempotent.'); } catch (e) { window.__report('t1', false, 'methodGet is not defined: ' + e.message); }
        try { window.__report('t2', methodPost === 'not-idempotent', 'POST is conventionally NOT idempotent -- repeating it typically creates duplicates.'); } catch (e) { window.__report('t2', false, 'methodPost is not defined: ' + e.message); }
        try { window.__report('t3', methodDelete === 'idempotent', 'DELETE is conventionally idempotent -- the end result (gone) does not change on repetition.'); } catch (e) { window.__report('t3', false, 'methodDelete is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "GET correctly classified", hidden: false },
        { id: "t2", description: "POST correctly classified", hidden: false },
        { id: "t3", description: "DELETE correctly classified", hidden: false },
      ],
      hints: [
        "Ask: does repeating this operation with the same input change the end result compared to doing it once?",
        "Creating something new (POST) is the one that typically isn't idempotent.",
      ],
    },
    independentExercise: {
      id: "at-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function checkRateLimit(requestCountInWindow, limit) that returns { status: 429, retryAfterSeconds: 60 } if requestCountInWindow >= limit, or { status: 200 } otherwise.",
      starterCode: `function checkRateLimit(requestCountInWindow, limit) {
  // TODO
}
`,
      solutionCode: `function checkRateLimit(requestCountInWindow, limit) {
  if (requestCountInWindow >= limit) {
    return { status: 429, retryAfterSeconds: 60 };
  }
  return { status: 200 };
}`,
      harness: `
        try { window.__report('t1', checkRateLimit(5, 10).status === 200, 'Below the limit should succeed.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const r = checkRateLimit(10, 10);
          window.__report('t2', r.status === 429 && typeof r.retryAfterSeconds === 'number', 'At or above the limit should return 429 with a usable retryAfterSeconds.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', checkRateLimit(15, 10).status === 429, 'Above the limit should also return 429.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "under the limit succeeds", hidden: false },
        {
          id: "t2",
          description: "exactly at the limit returns 429 with retry guidance",
          hidden: false,
        },
        { id: "t3", description: "over the limit returns 429", hidden: false },
      ],
      hints: [
        "This is a boundary case from earlier lessons: test exactly at the limit, not just comfortably under or over it.",
        "A useful 429 response tells the caller when to retry, not just that they were blocked.",
      ],
    },
    commonMistakes: [
      "Assuming POST is always safe to retry without checking whether the API actually implements idempotency-key support.",
      "Testing idempotency by checking only the response of a repeated call, without verifying the underlying end state actually stayed consistent.",
      "Treating a 429 response with no retry guidance as acceptable, leaving clients to guess and potentially hammer the API blindly.",
    ],
    quiz: [
      {
        id: "at-11-q1",
        prompt: "What does it mean for an HTTP operation to be idempotent?",
        choices: [
          "It always returns the same response body",
          "Repeating it with the same input produces the same end result as doing it once",
          "It can only be called once ever",
          "It never returns an error",
        ],
        correctIndex: 1,
        explanation:
          "Idempotency is about the end result staying the same across repetitions, not about the exact response being identical every time.",
      },
      {
        id: "at-11-q2",
        prompt: "Why is POST conventionally not idempotent?",
        choices: [
          "POST requests are always rejected the second time",
          "POST typically creates a new resource, so repeating it typically creates duplicate resources",
          "POST is the same as GET",
          "This is a made-up distinction with no real consequence",
        ],
        correctIndex: 1,
        explanation:
          'Because POST conventionally means "create," repeating it without an idempotency-key mechanism produces multiple created resources instead of one.',
      },
      {
        id: "at-11-q3",
        prompt: "What should a well-designed 429 Too Many Requests response include?",
        choices: [
          "Nothing beyond the status code",
          "Guidance on when the caller can retry, such as a Retry-After value",
          "A full stack trace",
          "The rate limit should never be communicated to the client",
        ],
        correctIndex: 1,
        explanation:
          "A useful rate-limit response tells the client when to retry, rather than leaving them to guess — this is directly testable business logic.",
      },
    ],
    takeaway:
      "Idempotency is what makes safe retrying possible, and it's directly testable by calling an operation twice and checking the end state; rate limiting is testable business logic, not something that requires a real load test.",
    summary:
      "This lesson covered classifying HTTP methods by conventional idempotency, testing idempotency by verifying end state across repeated calls, and what a well-designed rate-limit response should provide.",
    nextLessonSlug: "at-security-basics",
  },
  {
    id: "at-security-basics",
    slug: "at-security-basics",
    title: "API Security Basics for Testers",
    description:
      "Concrete, non-specialist security checks every API tester should reflexively perform, without needing to be a penetration tester.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["at-idempotency-rate-limits"],
    objectives: [
      "Identify a broken object-level authorization defect in a simulated API",
      "Design an input-sanitization check for an injection-style attempt",
      "Explain why security testing is a shared responsibility, not only a specialist's job",
    ],
    skills: ["api-testing", "security-basics"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      { label: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/" },
    ],
    keywords: ["api security", "broken object level authorization", "injection", "owasp"],
    explanation: `This lesson isn't a substitute for a dedicated security review — it's the baseline every API tester can and should check, the same way every tester checks basic accessibility without being an accessibility specialist.

The single most common real-world API vulnerability, consistently topping industry vulnerability lists, has a plain-language description: **an authenticated user can access or modify data belonging to someone else, just by changing an id in the request.** A user logged in as account 42 requests \`GET /orders/42\` — fine, that's their own data. If they then request \`GET /orders/43\` (someone else's order) and the server happily returns it because it only checked "is this user logged in," not "does this user own order 43," that's a broken authorization check, not a broken authentication check — the user was correctly identified, just incorrectly permitted. Testing for this is refreshingly direct: as user A, deliberately request user B's resource by id, and confirm you get a 403 or 404, never user B's real data.

**Input sanitization** is the other baseline check: does the API safely handle input containing characters or patterns that could be interpreted as code rather than data? A search field that receives a value containing SQL-like syntax (\`' OR '1'='1\`) should be treated as a literal search string, never executed as part of a database query. A field that receives HTML/script tags should never have that content echoed back and executed by a browser reading the response. A tester doesn't need to construct a real working exploit to test this — sending the suspicious-looking input and confirming it's treated as inert data, not executed or reflected unsafely, is a meaningful, non-specialist check.

Security testing is not exclusively a specialist's job for the same reason accessibility testing isn't: waiting for a dedicated security review at the very end of a project finds these issues far later and far more expensively than a tester who reflexively checks "can I access someone else's data by changing an id" on every new endpoint they touch.`,
    example: {
      language: "javascript",
      description:
        "A simulated authorization check for broken object-level authorization: does the API verify ownership, not just identity?",
      code: `const orders = { 42: { owner: "userA", total: 100 }, 43: { owner: "userB", total: 250 } };

// Buggy: only checks that SOMEONE is logged in, not that they own the resource.
function getOrderBuggy(orderId, requestingUser) {
  return orders[orderId] ? { status: 200, body: orders[orderId] } : { status: 404 };
}

// Fixed: checks ownership too.
function getOrderFixed(orderId, requestingUser) {
  const order = orders[orderId];
  if (!order) return { status: 404 };
  if (order.owner !== requestingUser) return { status: 403 };
  return { status: 200, body: order };
}

console.log(getOrderBuggy(43, "userA"));  // leaks userB's order to userA!
console.log(getOrderFixed(43, "userA"));  // correctly 403`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Try getOrderFixed with the correct owner (userB requesting order 43) and confirm it succeeds.",
      code: `const orders = { 42: { owner: "userA", total: 100 }, 43: { owner: "userB", total: 250 } };

function getOrderFixed(orderId, requestingUser) {
  const order = orders[orderId];
  if (!order) return { status: 404 };
  if (order.owner !== requestingUser) return { status: 403 };
  return { status: 200, body: order };
}

console.log(getOrderFixed(43, "userA"));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using getOrderFixed already defined, verify it correctly blocks cross-user access by setting resultStatus to the status code returned when userA (not the owner) requests order 43 (owned by userB).",
      starterCode: `const orders = { 43: { owner: "userB", total: 250 } };
function getOrderFixed(orderId, requestingUser) {
  const order = orders[orderId];
  if (!order) return { status: 404 };
  if (order.owner !== requestingUser) return { status: 403 };
  return { status: 200, body: order };
}

let resultStatus = 0; // TODO: call getOrderFixed(43, "userA") and read .status
`,
      solutionCode: `const orders = { 43: { owner: "userB", total: 250 } };
function getOrderFixed(orderId, requestingUser) {
  const order = orders[orderId];
  if (!order) return { status: 404 };
  if (order.owner !== requestingUser) return { status: 403 };
  return { status: 200, body: order };
}

let resultStatus = getOrderFixed(43, "userA").status;`,
      harness: `
        try { window.__report('t1', resultStatus === 403, 'userA requesting userB\\'s order should be blocked with 403.'); } catch (e) { window.__report('t1', false, 'resultStatus is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly confirms cross-user access is blocked", hidden: false },
      ],
      hints: [
        'Call getOrderFixed(43, "userA") and read the .status field from the result.',
        "Order 43 belongs to userB, so userA requesting it should be forbidden.",
      ],
    },
    independentExercise: {
      id: "at-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function isSuspiciousInput(value) that returns true if the string value contains a SQL-injection-style pattern (a single quote followed by OR, case-insensitive, like \"' OR '1'='1\") or an HTML script tag ('<script'), false otherwise.",
      starterCode: `function isSuspiciousInput(value) {
  // TODO
}
`,
      solutionCode: `function isSuspiciousInput(value) {
  const lower = value.toLowerCase();
  const hasSqlPattern = /'\\s*or\\s*'/.test(lower);
  const hasScriptTag = lower.includes("<script");
  return hasSqlPattern || hasScriptTag;
}`,
      harness: `
        try { window.__report('t1', isSuspiciousInput("wireless mouse") === false, 'A normal search term should not be flagged.'); } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try { window.__report('t2', isSuspiciousInput("x' OR '1'='1") === true, 'A SQL-injection-style pattern should be flagged.'); } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
        try { window.__report('t3', isSuspiciousInput("<script>alert(1)<" + "/script>") === true, 'An embedded script tag should be flagged.'); } catch (e) { window.__report('t3', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "normal input is not flagged", hidden: false },
        { id: "t2", description: "SQL-injection-style input is flagged", hidden: false },
        { id: "t3", description: "a script tag is flagged", hidden: false },
      ],
      hints: [
        "This exercise is about recognizing the pattern, not building a real security scanner — a simple case-insensitive check is enough.",
        "Check for both patterns independently; either one alone should trigger a flag.",
      ],
    },
    commonMistakes: [
      "Testing authorization only with the resource owner's own data, never deliberately requesting another user's resource by id.",
      "Assuming input sanitization is entirely the framework's job and never explicitly testing it with suspicious-looking input.",
      "Waiting for a dedicated security review at the end of a project instead of checking basic authorization and input handling on every new endpoint as it's built.",
    ],
    quiz: [
      {
        id: "at-12-q1",
        prompt:
          "A logged-in user can view another user's private order just by changing the order id in the URL. What kind of defect is this?",
        choices: [
          "A performance defect",
          "A broken object-level authorization defect — the user is correctly authenticated but incorrectly authorized",
          "A cosmetic UI defect",
          "This is expected, normal behavior",
        ],
        correctIndex: 1,
        explanation:
          "This is one of the most common real-world API vulnerabilities: the user's identity is verified correctly, but ownership of the specific resource is never checked.",
      },
      {
        id: "at-12-q2",
        prompt:
          "Why might a tester send input like an embedded script tag or a SQL-like string to a search field?",
        choices: [
          "To try to break the site maliciously for fun",
          "To verify the API treats it as inert, literal data rather than executing or reflecting it unsafely",
          "This is never a reasonable thing to test",
          "Only security specialists are allowed to test this",
        ],
        correctIndex: 1,
        explanation:
          "This is a baseline, non-specialist check confirming the API safely handles input that could otherwise be interpreted as code rather than data.",
      },
      {
        id: "at-12-q3",
        prompt:
          "Why is checking for broken object-level authorization something every API tester should do, not just security specialists?",
        choices: [
          "It isn't — this should be left entirely to specialists",
          "It's a simple, direct check (request another user's resource by id) that catches one of the most common and damaging real-world API vulnerabilities early",
          "This vulnerability is extremely rare in practice",
          "This only matters for banking applications",
        ],
        correctIndex: 1,
        explanation:
          "The check itself is straightforward and doesn't require specialist tools, and catching it early (as features are built) is far cheaper than a dedicated review finding it later.",
      },
    ],
    takeaway:
      "Broken object-level authorization (accessing another user's data by changing an id) and unsafe handling of suspicious input are baseline, non-specialist checks every API tester can and should perform on every endpoint.",
    summary:
      "This lesson covered testing for broken object-level authorization by deliberately requesting another user's resource, and checking that suspicious input is safely treated as inert data.",
    nextLessonSlug: "at-automation-structure",
  },
  {
    id: "at-automation-structure",
    slug: "at-automation-structure",
    title: "Structuring an API Test Automation Suite",
    description:
      "Organize test code the way real automation frameworks do: setup and teardown, isolated test data, and no test that depends on another test running first.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 12,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["at-security-basics"],
    objectives: [
      "Explain why test isolation matters and identify a test that violates it",
      "Design setup and teardown steps for a test that creates data",
      "Organize a small set of related tests into a coherent suite structure",
    ],
    skills: ["api-testing", "test-automation", "test-structure"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "ISTQB Glossary: Test Automation",
        url: "https://glossary.istqb.org/en_US/term/test-automation",
      },
    ],
    keywords: ["test automation", "test isolation", "setup teardown", "api testing"],
    explanation: `A test suite where "test 12 only passes if test 7 ran first and left behind a specific order" is fragile in a very specific, very common way: run test 12 alone (to debug a failure, say), and it fails for a completely unrelated reason — no order exists yet — wasting real debugging time chasing a phantom problem. **Test isolation** means every test creates whatever data it needs and cleans up after itself, so it passes or fails purely on its own merits, runnable alone, in any order, alongside any other tests, without caring what ran before it.

The standard structure that achieves this is **setup, act, assert, teardown**: setup creates whatever data or state this specific test needs (a fresh order, a fresh user); act performs the actual operation being tested; assert checks the result; teardown removes whatever setup created, leaving the environment exactly as clean as it was found. A test that creates an order during setup and never deletes it during teardown will, after a thousand test runs, have littered the system with a thousand leftover orders — at best clutter, at worst something that starts silently affecting *other* tests' results as data volume grows.

A well-structured suite also organizes related tests together — grouping all the tests for one endpoint or feature, so a related failure is easy to locate and a new related test case has an obvious home. And it names tests descriptively enough that a failure message alone tells you roughly what broke, without needing to open the test file: "creating a user with a duplicate email returns 409" tells you far more at a glance than "test_3".

None of this is unique to API testing — it's the same discipline behind any maintainable automated test suite — but it matters especially here because API tests often create real server-side state (orders, users, resources), which makes isolation failures both easy to introduce and expensive to leave unfixed.`,
    example: {
      language: "javascript",
      description:
        "A minimal setup/act/assert/teardown structure for one isolated test, using an in-memory simulated store — no real network calls or leftover state.",
      code: `const db = { users: {} };

function setupTestUser() {
  const id = "test-" + Math.random().toString(36).slice(2, 8);
  db.users[id] = { id, email: id + "@example.com" };
  return id;
}

function teardownTestUser(id) {
  delete db.users[id];
}

// setup
const userId = setupTestUser();
// act
const found = db.users[userId];
// assert
console.log(Boolean(found)); // true
// teardown
teardownTestUser(userId);
console.log(db.users[userId]); // undefined -- fully cleaned up`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Remove the teardown call and re-run — notice the leftover test user remains in db.users.",
      code: `const db = { users: {} };
function setupTestUser() {
  const id = "test-" + Math.random().toString(36).slice(2, 8);
  db.users[id] = { id };
  return id;
}

const userId = setupTestUser();
console.log(Object.keys(db.users).length);`,
      editable: true,
    },
    guidedExercise: {
      id: "at-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Given testA and testB below, decide isIsolated: testA always creates its own fresh order before checking it. testB assumes order id 1 already exists from a previous test. Set isIsolated to whether testB follows proper test isolation.",
      starterCode: `let isIsolated = null; // TODO: does testB properly isolate itself?
`,
      solutionCode: `let isIsolated = false;`,
      harness: `
        try { window.__report('t1', isIsolated === false, 'testB depends on another test having run first -- that is a test isolation violation, not proper isolation.'); } catch (e) { window.__report('t1', false, 'isIsolated is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies the isolation violation", hidden: false },
      ],
      hints: [
        "A properly isolated test creates whatever data it needs itself, rather than assuming another test already created it.",
        'testB assuming order 1 exists from "a previous test" is exactly the fragile pattern this lesson warns about.',
      ],
    },
    independentExercise: {
      id: "at-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function runIsolatedTest(setupFn, actFn, assertFn, teardownFn) that calls them in order (setup, then act with the setup result, then assert with the act result, then teardown with the setup result), and returns the assert result. This models the setup/act/assert/teardown structure.",
      starterCode: `function runIsolatedTest(setupFn, actFn, assertFn, teardownFn) {
  // TODO: call setupFn, actFn, assertFn, teardownFn in the right order with the right arguments
}
`,
      solutionCode: `function runIsolatedTest(setupFn, actFn, assertFn, teardownFn) {
  const setupResult = setupFn();
  const actResult = actFn(setupResult);
  const assertResult = assertFn(actResult);
  teardownFn(setupResult);
  return assertResult;
}`,
      harness: `
        try {
          let torndown = false;
          const result = runIsolatedTest(
            () => ({ id: 1 }),
            (setup) => setup.id * 2,
            (actResult) => actResult === 2,
            () => { torndown = true; },
          );
          window.__report('t1', result === true, 'The function should return the result of calling assertFn.');
          window.__report('t2', torndown === true, 'teardownFn should be called after assertFn.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "returns the assert function's result", hidden: false },
        { id: "t2", description: "calls teardown after asserting", hidden: false },
      ],
      hints: [
        "Each function's output feeds into the next: setup's result goes into act, act's result goes into assert.",
        "Teardown should run last, after the assertion, using the original setup result (not the act result).",
      ],
    },
    commonMistakes: [
      "Writing a test that depends on data created by a previous test, breaking the moment tests are run individually or in a different order.",
      "Creating test data in setup but forgetting teardown, leaving the system cluttered with leftover data after every run.",
      'Giving tests generic names like "test1" that provide no information about what actually broke when a failure occurs.',
    ],
    quiz: [
      {
        id: "at-13-q1",
        prompt: "What problem does test isolation solve?",
        choices: [
          "It makes tests run faster",
          "It ensures a test passes or fails on its own merits, regardless of what ran before it or in what order",
          "It removes the need for assertions",
          "It only applies to unit tests, not API tests",
        ],
        correctIndex: 1,
        explanation:
          "Isolation is specifically about tests not depending on shared state left behind by other tests, so any test can run alone or in any order.",
      },
      {
        id: "at-13-q2",
        prompt: "What is the purpose of a teardown step?",
        choices: [
          "To slow down the test suite intentionally",
          "To remove whatever data or state the test's setup created, leaving the environment clean for future tests",
          "To create the test data",
          "To report the test's final result",
        ],
        correctIndex: 1,
        explanation:
          "Teardown cleans up after a test so leftover data doesn't accumulate and doesn't affect other tests running later.",
      },
      {
        id: "at-13-q3",
        prompt:
          "A test named 'test_3' fails. What is the practical downside of this naming compared to a descriptive name?",
        choices: [
          "There is no downside",
          "The failure message alone gives no information about what actually broke, requiring extra time to open the test file",
          "Generic names make tests run faster",
          "This only matters for very large test suites",
        ],
        correctIndex: 1,
        explanation:
          "A descriptive test name lets a failure be understood at a glance from the test report alone, without needing to dig into the test's source code first.",
      },
    ],
    takeaway:
      "A maintainable test automation suite isolates every test with its own setup and teardown, so tests can run alone or in any order, and names tests descriptively enough that a failure is understandable at a glance.",
    summary:
      "This lesson covered the setup/act/assert/teardown structure, why test isolation matters specifically for API tests that create real server-side state, and organizing tests for discoverability.",
    nextLessonSlug: "at-ci-reporting",
  },
  {
    id: "at-ci-reporting",
    slug: "at-ci-reporting",
    title: "Reporting and CI Concepts",
    description:
      "Automated tests only pay off if a failure is visible and actionable — how continuous integration runs them automatically, and what a genuinely useful test report looks like.",
    trackSlug: "software-testing",
    courseSlug: "api-testing-and-automation",
    order: 13,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["at-automation-structure"],
    objectives: [
      "Explain what continuous integration adds beyond simply having automated tests",
      "Identify the essential elements of a useful automated test report",
      "Design a rule for when a CI pipeline should block a change from merging",
    ],
    skills: ["api-testing", "continuous-integration", "test-reporting"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-02",
    references: [
      {
        label: "MDN: Continuous Integration overview",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Continuous_Integration",
      },
    ],
    keywords: ["continuous integration", "ci/cd", "test reporting"],
    explanation: `A test suite that exists but only runs when someone remembers to run it manually provides much weaker protection than the same suite run automatically on every single change. **Continuous integration (CI)** is the practice of automatically building and testing every change — typically every pull request and every merge — on a shared server, rather than relying on individual developers to remember to run tests locally before pushing. The value isn't the tests themselves (those already existed); it's the *automatic, consistent, cannot-be-forgotten* execution of them.

A CI pipeline for an API typically: installs dependencies, starts the API (or a test version of it), runs the automated test suite covering everything from this course (schema validation, positive/negative cases, boundary values, chained workflows), and reports a clear pass/fail result directly on the change being reviewed — visible to everyone, before it merges. Many teams configure CI to **block a merge** if the test suite fails, turning "please remember to test this" into "this cannot be merged until it demonstrably passes," which is a fundamentally more reliable guarantee.

A test report's job is to make a failure immediately actionable, ideally without needing to re-run anything locally first. A genuinely useful report includes: **which specific test failed** (not just "3 of 50 failed"); **what was expected versus what actually happened**; **how long the run took** (a sudden, unexplained slowdown is itself often a signal worth investigating); and ideally a way to **re-run just the failing test** in isolation, without re-running the entire suite, once the tests are properly isolated (from the previous lesson) — since isolation is exactly what makes running one test alone meaningful and reliable.

A subtlety worth understanding: a **flaky test** — one that sometimes passes and sometimes fails with no code change in between — is worse than a test that reliably fails, because it erodes trust in the entire suite. A team that gets used to re-running a flaky test "until it goes green" has quietly stopped treating a red result as meaningful, which defeats the entire purpose of automated testing. Investigating and fixing (or deliberately removing) a flaky test is a real priority, not a nuisance to route around.`,
    example: {
      language: "javascript",
      description:
        "A simulated CI pipeline result and the merge-blocking decision it should produce — deterministic, no real CI service involved.",
      code: `const testRunResult = {
  total: 42,
  passed: 41,
  failed: 1,
  failingTests: ["POST /users rejects a duplicate email with 409"],
  durationMs: 3200,
};

function shouldBlockMerge(result) {
  return result.failed > 0;
}

console.log(shouldBlockMerge(testRunResult)); // true -- one failure is enough to block
console.log(testRunResult.failingTests);      // tells you exactly what to look at, not just "1 failed"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change failed to 0 and failingTests to an empty array, then re-run to see the merge decision flip.",
      code: `const testRunResult = { total: 42, passed: 41, failed: 1, failingTests: ["one test name"] };

function shouldBlockMerge(result) {
  return result.failed > 0;
}

console.log(shouldBlockMerge(testRunResult));`,
      editable: true,
    },
    guidedExercise: {
      id: "at-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "A test named 'checkout total calculation' passed 8 out of 10 times across recent runs with no code changes in between. Set isFlaky and explain briefly why this matters more than a test that always fails.",
      starterCode: `let isFlaky = null; // TODO
let whyItMatters = ""; // TODO: a short explanation
`,
      solutionCode: `let isFlaky = true;
let whyItMatters = "A flaky test erodes trust in the whole suite, since a red result stops reliably meaning something is actually broken.";`,
      harness: `
        try { window.__report('t1', isFlaky === true, 'Passing sometimes and failing sometimes with no code changes is the definition of a flaky test.'); } catch (e) { window.__report('t1', false, 'isFlaky is not defined: ' + e.message); }
        try { window.__report('t2', typeof whyItMatters === 'string' && whyItMatters.length > 15, 'Give a real, substantive explanation, not an empty string.'); } catch (e) { window.__report('t2', false, 'whyItMatters is not defined: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies the test as flaky", hidden: false },
        {
          id: "t2",
          description: "gives a real explanation of why flakiness matters",
          hidden: false,
        },
      ],
      hints: [
        'Inconsistent results with no underlying code change is exactly what "flaky" means.',
        "Think about what happens to a team's trust in the whole suite once they start ignoring red results.",
      ],
    },
    independentExercise: {
      id: "at-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write a function summarizeRun(result) that returns a short string report: if result.failed === 0, return 'All N tests passed in Xms' (using result.total and result.durationMs); otherwise return 'N test(s) failed: ' followed by the failing test names joined with ', '.",
      starterCode: `function summarizeRun(result) {
  // TODO
}
`,
      solutionCode: `function summarizeRun(result) {
  if (result.failed === 0) {
    return \`All \${result.total} tests passed in \${result.durationMs}ms\`;
  }
  return \`\${result.failed} test(s) failed: \${result.failingTests.join(", ")}\`;
}`,
      harness: `
        try {
          const r1 = summarizeRun({ total: 10, passed: 10, failed: 0, durationMs: 500, failingTests: [] });
          window.__report('t1', r1.includes('10') && r1.includes('500') && r1.toLowerCase().includes('passed'), 'A fully passing run should mention the total count, duration, and say it passed.');
        } catch (e) { window.__report('t1', false, 'Error: ' + e.message); }
        try {
          const r2 = summarizeRun({ total: 10, passed: 9, failed: 1, durationMs: 500, failingTests: ['login test'] });
          window.__report('t2', r2.includes('1') && r2.includes('login test'), 'A failing run should mention the failure count and the specific failing test name.');
        } catch (e) { window.__report('t2', false, 'Error: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "a fully passing run is summarized clearly", hidden: false },
        { id: "t2", description: "a failing run names the specific failing test", hidden: false },
      ],
      hints: [
        "Branch on result.failed === 0 to decide which message format to build.",
        "The failing case should name the specific test(s), not just a count.",
      ],
    },
    commonMistakes: [
      "Relying on developers to remember to run tests locally instead of having CI run them automatically and consistently on every change.",
      'Writing a test report that says only "3 of 50 failed" without naming which three, forcing someone to dig for the actual failure.',
      "Re-running a flaky test until it passes instead of investigating and fixing why it's inconsistent, which quietly erodes trust in every future red result.",
    ],
    quiz: [
      {
        id: "at-14-q1",
        prompt:
          "What does continuous integration add beyond simply having an automated test suite?",
        choices: [
          "Nothing — CI and having tests are the same thing",
          "Automatic, consistent execution of the suite on every change, rather than relying on developers to remember to run it",
          "CI makes tests run without ever needing maintenance",
          "CI replaces the need to write test cases",
        ],
        correctIndex: 1,
        explanation:
          "CI's value is turning test execution from an easily-forgotten manual step into an automatic, unskippable part of every change.",
      },
      {
        id: "at-14-q2",
        prompt: "What makes a test report genuinely useful when a failure occurs?",
        choices: [
          "Just a pass/fail count with no other detail",
          "Naming the specific failing test(s) and what was expected versus what actually happened",
          "A report is never necessary",
          "Only the total run duration matters",
        ],
        correctIndex: 1,
        explanation:
          "A useful report makes the failure immediately actionable — knowing exactly which test failed and why, not just an aggregate count.",
      },
      {
        id: "at-14-q3",
        prompt:
          "Why is a flaky test (inconsistent pass/fail with no code change) considered worse than a test that reliably fails?",
        choices: [
          "It isn't worse — they're equivalent problems",
          "It erodes trust in the whole suite, since a red result stops reliably indicating something is actually broken",
          "Flaky tests run faster than reliable ones",
          "Flaky tests are always caused by the same bug",
        ],
        correctIndex: 1,
        explanation:
          "A team that learns to ignore or re-run a flaky test until it's green has effectively stopped trusting red results at all, undermining the entire point of automated testing.",
      },
    ],
    takeaway:
      "Continuous integration turns test execution from an easily-skipped manual step into an automatic, consistent gate on every change, and a genuinely useful report names exactly what failed — while a flaky test is a priority to fix, not a nuisance to route around.",
    summary:
      "This final lesson covered what CI adds beyond having tests, the essential elements of an actionable test report, and why flaky tests specifically undermine trust in an entire automated suite.",
  },
];
