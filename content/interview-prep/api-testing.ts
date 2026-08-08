import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * API Testing and Automation interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics (HTTP/
 * REST foundations, auth vs. authentication, JSON schema validation,
 * positive/negative and boundary testing, chained workflows and error
 * validation, idempotency/rate limits, API security basics, automation
 * structure and CI reporting).
 */
export const apiTestingInterviewQuestions: InterviewQuestionInput[] = [
  // --- HTTP & REST Foundations (10) ---
  {
    id: "api-testing-interview-http-01",
    courseSlug: "api-testing-and-automation",
    question:
      "What HTTP status code range indicates a client error, and what does that mean for who's at fault?",
    answer:
      "4xx codes indicate the client made a request the server considers invalid (bad input, missing auth, requesting a resource that doesn't exist) -- as opposed to 5xx, which indicates the server itself failed to handle an otherwise-valid request. Distinguishing them matters for deciding whether the bug is in the request being sent or in the server's handling.",
    category: "HTTP & REST Foundations",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-http-02",
    courseSlug: "api-testing-and-automation",
    question: "What is the difference between 401 Unauthorized and 403 Forbidden?",
    answer:
      "401 means the request lacks valid authentication credentials at all (or they're invalid/expired); 403 means the request IS authenticated, but that identity doesn't have permission for the requested action -- a subtle but important distinction for testing auth flows correctly.",
    category: "HTTP & REST Foundations",
    difficulty: "intermediate",
    commonMistake:
      "Testing an authorization failure by removing credentials entirely (triggering 401) instead of using valid-but-insufficient credentials (which should trigger 403).",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-http-03",
    courseSlug: "api-testing-and-automation",
    question:
      "Why should a REST API test suite verify the exact response status code, not just that a response was received?",
    answer:
      "A server can return a '200 OK' response body containing an error message, or an error status code with a misleading body -- checking only that SOME response came back misses these mismatches; the test needs to assert the status code matches what the operation's actual outcome should be.",
    category: "HTTP & REST Foundations",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-http-04",
    courseSlug: "api-testing-and-automation",
    question:
      "What is a REST resource, and why does testing tend to organize test cases around resources rather than around endpoints?",
    answer:
      "A resource is the noun the API models (e.g. a user, an order); organizing tests by resource (all the CRUD operations for 'orders' together) tends to mirror how the API itself is designed and makes it easier to spot a missing operation (e.g. no DELETE test for a resource that supports deletion).",
    category: "HTTP & REST Foundations",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-http-05",
    courseSlug: "api-testing-and-automation",
    question:
      "What should a well-tested API do when a client requests a resource by an id that doesn't exist?",
    answer:
      "Return a 404 Not Found with a clear (but not overly revealing) error message -- not a 200 with an empty/null body, and not a 500 server error, both of which would be genuine defects worth flagging.",
    category: "HTTP & REST Foundations",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-http-06",
    courseSlug: "api-testing-and-automation",
    question: "Why is testing an API's response headers (not just the body) sometimes necessary?",
    answer:
      "Headers can carry meaningful information the body doesn't -- rate-limit counters, caching directives, a `Location` header after a resource is created, or content-type -- a test verifying only the body could miss a real defect in how the API communicates this metadata.",
    category: "HTTP & REST Foundations",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-http-07",
    courseSlug: "api-testing-and-automation",
    question:
      "What does REST's convention of using plural nouns for collection endpoints (e.g. `/users` not `/user`) signal, and why does consistency matter for testability?",
    answer:
      "It signals the endpoint represents a collection of resources, with `/users/42` addressing one specific member of that collection -- consistent naming conventions across an API make it predictable to write and generalize test cases across many similar endpoints, rather than needing bespoke logic per inconsistently-named route.",
    category: "HTTP & REST Foundations",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-http-08",
    courseSlug: "api-testing-and-automation",
    question:
      "Why might an API return 204 No Content for a successful DELETE request instead of 200 with a body?",
    answer:
      "204 explicitly communicates 'the request succeeded, and there is deliberately no content to return' -- appropriate for a delete operation where there's nothing meaningful left to send back about the now-removed resource, distinct from 200 which implies a response body is present.",
    category: "HTTP & REST Foundations",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-http-09",
    courseSlug: "api-testing-and-automation",
    question:
      "What is the difference between a query parameter and a path parameter in a REST URL, and when is each conventionally used?",
    answer:
      "A path parameter (`/users/42`) identifies a specific resource as part of the URL structure itself; a query parameter (`/users?role=admin`) filters, sorts, or modifies a request without changing which resource/collection is being addressed -- conventionally, path parameters identify, query parameters refine.",
    category: "HTTP & REST Foundations",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-http-10",
    courseSlug: "api-testing-and-automation",
    question:
      "Why is understanding REST conventions important even when testing an API that doesn't perfectly follow them?",
    answer:
      "Knowing the conventions gives you a baseline to compare against and articulate specifically how/where an API deviates (e.g. 'this uses 200 for a failed validation instead of 400') -- without that baseline, an inconsistency might be missed entirely as 'just how this API works,' when it's actually a real design flaw worth flagging.",
    category: "HTTP & REST Foundations",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Auth & Schema Validation (10) ---
  {
    id: "api-testing-interview-auth-01",
    courseSlug: "api-testing-and-automation",
    question:
      "What does JSON schema validation let you verify about an API response, beyond just checking a few specific field values?",
    answer:
      "It verifies the response's overall structure -- required fields are present, field types match expectations (a `price` is genuinely a number, not a string), and no unexpected shape changes have occurred -- catching structural regressions that spot-checking individual values alone would miss.",
    category: "Auth & Schema Validation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-auth-02",
    courseSlug: "api-testing-and-automation",
    question:
      "Why is verifying a response's schema especially valuable as a regression check, run on every CI build?",
    answer:
      "An API's response shape can silently change (a field renamed, a type changed from string to number, a field removed) without any obvious error -- schema validation catches these structural regressions automatically and immediately, before they reach and break real client applications depending on that exact shape.",
    category: "Auth & Schema Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-auth-03",
    courseSlug: "api-testing-and-automation",
    question: "What is a Bearer token, and how is it typically sent in an API request?",
    answer:
      "A credential (often a JWT or opaque access token) proving the caller's authenticated identity, typically sent in the `Authorization: Bearer <token>` request header -- the server validates the token to identify who's making the request before deciding whether to authorize the action.",
    category: "Auth & Schema Validation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-auth-04",
    courseSlug: "api-testing-and-automation",
    question:
      "Why should a test suite include a case for an expired or invalid authentication token, not just valid and missing tokens?",
    answer:
      "An expired/malformed token is a genuinely different scenario from a missing one -- a system might correctly reject a request with NO token but incorrectly accept (or crash on) one with a corrupted or expired token, which is a distinct code path worth its own explicit test.",
    category: "Auth & Schema Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-auth-05",
    courseSlug: "api-testing-and-automation",
    question:
      "What does it mean to test that a `required` field in the schema is actually enforced by the API?",
    answer:
      "Sending a request that omits that field and confirming the API rejects it (typically 400 Bad Request) rather than silently accepting it with a null/default value that wasn't actually intended -- a schema documenting a field as required is only meaningful if the API actually enforces it.",
    category: "Auth & Schema Validation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-auth-06",
    courseSlug: "api-testing-and-automation",
    question:
      "Why might an API test suite need separate test users/accounts with different roles (e.g. admin vs. regular user)?",
    answer:
      "Many authorization rules only surface when comparing behavior across roles -- verifying an admin CAN perform an action and a regular user CANNOT (getting a 403) both require actual accounts with those distinct permission levels, not just one generic authenticated test user.",
    category: "Auth & Schema Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-auth-07",
    courseSlug: "api-testing-and-automation",
    question:
      "What does 'additionalProperties: false' (or an equivalent strict-schema setting) enforce in JSON schema validation, and why might a test intentionally check for its absence?",
    answer:
      "It rejects any response fields not explicitly defined in the schema -- useful for catching unintended fields the API might be leaking (e.g. an internal field accidentally included in a public response). A test might also intentionally check that a sensitive field is NEVER present in a given response's schema.",
    category: "Auth & Schema Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-auth-08",
    courseSlug: "api-testing-and-automation",
    question:
      "Why is testing that a password field is never returned in an API's user-profile response an important, specific check?",
    answer:
      "It's a real, common class of accidental data exposure -- a schema/response check explicitly asserting a sensitive field's absence catches this class of bug directly, rather than hoping general testing happens to notice a password hash leaking in a JSON response.",
    category: "Auth & Schema Validation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-auth-09",
    courseSlug: "api-testing-and-automation",
    question:
      "What is the difference between validating a response's schema and validating its actual business-logic correctness?",
    answer:
      "Schema validation confirms the SHAPE is right (correct fields, correct types); business-logic validation confirms the VALUES are actually correct for the given scenario (e.g. the calculated total genuinely reflects the items and discount applied) -- a response can pass schema validation while still being functionally wrong.",
    category: "Auth & Schema Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-auth-10",
    courseSlug: "api-testing-and-automation",
    question:
      "Why should schema definitions used for testing be kept in a shared, version-controlled location rather than duplicated inline in every test file?",
    answer:
      "A shared schema definition means an intentional API shape change only needs updating in one place, and every test using it stays consistent -- duplicated inline schemas risk drifting out of sync with each other and with the real API shape over time.",
    category: "Auth & Schema Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Positive/Negative & Boundary Testing (10) ---
  {
    id: "api-testing-interview-boundary-01",
    courseSlug: "api-testing-and-automation",
    question:
      "What is the difference between positive testing and negative testing for an API endpoint?",
    answer:
      "Positive testing verifies the API behaves correctly with valid, expected input (the happy path); negative testing verifies it correctly REJECTS or gracefully handles invalid input (missing fields, wrong types, out-of-range values) -- a thorough suite needs both, since an API that only ever receives valid input in testing may fail unpredictably on real-world bad input.",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-boundary-02",
    courseSlug: "api-testing-and-automation",
    question:
      "How does boundary-value analysis apply to an API's numeric field with a documented valid range?",
    answer:
      "The same principle as any boundary testing -- test values just inside, at, and just outside the documented range (e.g. a `quantity` field with max 100: test 99, 100, and 101) to catch off-by-one validation bugs at the API's actual enforced limits.",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-boundary-03",
    courseSlug: "api-testing-and-automation",
    question:
      "Why should an API test suite include a case for an empty collection response (e.g. a user with zero orders), not just collections with data?",
    answer:
      "Empty-collection handling is a distinct code path that's easy to get wrong -- returning `null` instead of an empty array, or a malformed pagination object when there's nothing to paginate -- and is a genuinely common real-world scenario (a brand-new user), not an obscure edge case.",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "intermediate",
    commonMistake:
      "Only testing endpoints with collections that already contain data, missing bugs specific to the empty-collection response shape.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-boundary-04",
    courseSlug: "api-testing-and-automation",
    question: "What API-specific edge cases should be tested around pagination?",
    answer:
      "The first page, the last page, a page number beyond the available data, a page size of zero or negative, and a page size larger than the total available results -- pagination logic has several distinct boundary conditions beyond just 'does page 2 return different results than page 1.'",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-boundary-05",
    courseSlug: "api-testing-and-automation",
    question:
      "Why is sending a request with the wrong data TYPE (e.g. a string where a number is expected) an important negative test case, distinct from sending an out-of-range value?",
    answer:
      "Type mismatches can trigger different code paths (or crashes) than valid-type-but-invalid-value input -- a field expecting a number might handle 'too large a number' gracefully via range validation, but crash entirely if given a string, revealing a gap in input-type handling specifically.",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-boundary-06",
    courseSlug: "api-testing-and-automation",
    question:
      "What is contract testing, and what problem does it solve between a frontend and a backend team developed independently?",
    answer:
      "Contract testing verifies that a service's actual behavior matches an agreed-upon contract (schema/interface) that consumers depend on -- it catches a backend team's change that breaks the agreed contract before it reaches production, without needing the frontend and backend to be tested together in a full integration environment every time.",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-boundary-07",
    courseSlug: "api-testing-and-automation",
    question:
      "Why might sending an unexpected, extra field in a request body be a worthwhile test case, even if that field isn't documented in the API?",
    answer:
      "It verifies the API's actual handling of unknown input -- ideally ignoring the extra field safely, but a poorly-built API might error unpredictably, or worse, silently accept and misuse it in a way that reveals unintended behavior.",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-boundary-08",
    courseSlug: "api-testing-and-automation",
    question:
      "What is data-driven testing, and how does it help scale API test coverage efficiently?",
    answer:
      "Running the same test logic repeatedly against a table/list of different input-and-expected-output pairs, rather than writing a near-duplicate test function for each case -- this scales boundary/negative test coverage (many similar-shaped cases) without duplicating the actual test code for each one.",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-boundary-09",
    courseSlug: "api-testing-and-automation",
    question:
      "Why should negative test cases still assert on the SPECIFIC error response (status code, error message/code), not just that the request failed somehow?",
    answer:
      "A vague assertion like 'the request was not successful' could pass even if the API failed for the WRONG reason (e.g. a 500 server error instead of the expected 400 validation error) -- asserting the specific expected error confirms the API is failing for the right, intended reason.",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-boundary-10",
    courseSlug: "api-testing-and-automation",
    question: "What is a common mistake when writing negative test cases for input validation?",
    answer:
      "Testing only one invalid value per field in isolation and never testing multiple invalid fields at once -- some real bugs only surface when several validation rules interact (e.g. the error-message-building logic breaking when trying to report two simultaneous validation failures).",
    category: "Positive/Negative & Boundary Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Chained Workflows & Error Validation (10) ---
  {
    id: "api-testing-interview-workflow-01",
    courseSlug: "api-testing-and-automation",
    question:
      "What is a chained (multi-step) API test, and why is it needed beyond testing each endpoint independently?",
    answer:
      "A test that calls multiple related endpoints in sequence, using data returned from an earlier step (like a created resource's id) in a later request -- some real bugs only appear across this kind of realistic multi-step flow (e.g. creating an order, then adding an item, then checking out), not visible when each endpoint is tested fully in isolation.",
    category: "Chained Workflows & Error Validation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-workflow-02",
    courseSlug: "api-testing-and-automation",
    question:
      "Why does a chained test need robust setup/teardown, more so than a single-endpoint test?",
    answer:
      "A multi-step workflow test typically creates real data across several steps (an order, its items, a payment) -- teardown needs to clean all of that up reliably, even if an earlier assertion in the chain fails partway through, or test data accumulates and pollutes the environment over repeated runs.",
    category: "Chained Workflows & Error Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-workflow-03",
    courseSlug: "api-testing-and-automation",
    question:
      "What should you test if step 3 of a 5-step workflow fails partway through -- what does 'rigorous error validation' mean here?",
    answer:
      "Verify the system reaches a genuinely consistent state, not a partially-completed one that looks successful -- e.g. if payment processing fails after inventory was already reserved, does the reservation get correctly released, or does it leak inventory that's now stuck unavailable with no completed order to show for it?",
    category: "Chained Workflows & Error Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-workflow-04",
    courseSlug: "api-testing-and-automation",
    question:
      "Why is testing what happens when a later step in a chained workflow references data that was already deleted by an earlier or concurrent step a valuable test case?",
    answer:
      "It tests for a real-world race condition/stale-reference scenario (e.g. deleting a product while it's still in someone's cart) -- the API should handle this gracefully (a clear error) rather than crashing or silently proceeding with now-invalid data.",
    category: "Chained Workflows & Error Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-workflow-05",
    courseSlug: "api-testing-and-automation",
    question:
      "What does it mean to validate an error response 'rigorously,' beyond just checking the status code?",
    answer:
      "Verifying the error response body itself has a consistent, well-formed shape (an error code, a human-readable message, possibly field-specific validation details) matching the API's own documented error schema -- an API that returns inconsistent error shapes across different failure types is much harder for client applications to handle reliably.",
    category: "Chained Workflows & Error Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-workflow-06",
    courseSlug: "api-testing-and-automation",
    question:
      "Why should a chained-workflow test use freshly-created, unique test data for each run rather than relying on pre-existing shared data?",
    answer:
      "Shared or hardcoded test data can be modified or deleted by a previous test run (or a concurrently-running test), causing failures unrelated to the actual code being tested -- fresh, unique data per run keeps each test genuinely independent and repeatable.",
    category: "Chained Workflows & Error Validation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-workflow-07",
    courseSlug: "api-testing-and-automation",
    question:
      "How would you design a test verifying an API correctly enforces an ordering dependency (e.g. you can't ship an order that hasn't been paid)?",
    answer:
      "Attempt the out-of-order action directly (call the ship endpoint on a freshly-created, unpaid order) and assert the API rejects it with an appropriate error -- rather than only testing the correct order of operations, which wouldn't reveal whether the dependency is actually enforced.",
    category: "Chained Workflows & Error Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-workflow-08",
    courseSlug: "api-testing-and-automation",
    question:
      "Why might a chained test intentionally introduce a delay or retry, rather than assuming every step completes instantly?",
    answer:
      "Some workflows involve asynchronous processing (e.g. an order confirmation triggering a background email job or inventory sync) -- a test that checks the result immediately after triggering it may observe a not-yet-complete state; polling with a reasonable timeout better reflects how the system actually behaves.",
    category: "Chained Workflows & Error Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-workflow-09",
    courseSlug: "api-testing-and-automation",
    question:
      "What is a common mistake when writing a chained test that makes it fragile/flaky over time?",
    answer:
      "Hardcoding an intermediate value (like an id) returned from an earlier step instead of capturing and reusing it dynamically -- ids and other generated values typically differ on every test run, so hardcoding one from a single observed run breaks the test as soon as that specific value no longer exists.",
    category: "Chained Workflows & Error Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-workflow-10",
    courseSlug: "api-testing-and-automation",
    question:
      "Why is a failed chained-workflow test sometimes harder to diagnose than a single-endpoint test failure?",
    answer:
      "The failure could originate at any step in the chain, and later steps' failures can be a downstream symptom of an earlier step's subtly wrong (but not test-failing) response -- good chained tests include assertions at each intermediate step, not just a final check, to localize exactly where things actually went wrong.",
    category: "Chained Workflows & Error Validation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Security, Reliability & Automation Structure (10) ---
  {
    id: "api-testing-interview-security-01",
    courseSlug: "api-testing-and-automation",
    question: "What is Broken Object-Level Authorization (BOLA), and how would you test for it?",
    answer:
      "A vulnerability where an authenticated user can access or modify another user's resource just by changing an id in the request (e.g. `GET /orders/123` returns someone else's order) because the server checks authentication but not whether THIS user actually owns THAT specific resource. Testing it: authenticate as user A, then try to access user B's resource by id, and confirm it's rejected.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "advanced",
    commonMistake:
      "Testing authorization only by checking whether a request is authenticated at all, without checking whether the authenticated user actually owns the specific resource being accessed.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-security-02",
    courseSlug: "api-testing-and-automation",
    question:
      "What does API idempotency mean, and why might a test specifically verify that retrying the same request doesn't duplicate an action?",
    answer:
      "An idempotent operation produces the same end state no matter how many times it's repeated with the same input -- testing this matters because real clients (and network conditions) sometimes retry requests automatically; a non-idempotent 'create' endpoint that isn't designed to handle retries safely could create duplicate resources from a single logical user action.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-security-03",
    courseSlug: "api-testing-and-automation",
    question: "How would you test that an API's rate limiting actually works as documented?",
    answer:
      "Send requests exceeding the documented limit within the specified time window and confirm the API responds with the expected rate-limit status (typically 429 Too Many Requests) and appropriate headers (like `Retry-After`), rather than silently continuing to process every request without limit.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-security-04",
    courseSlug: "api-testing-and-automation",
    question:
      "What basic input-handling security check can a functional API tester perform without deep security expertise?",
    answer:
      "Sending obviously malicious-looking input (script tags, SQL-like syntax, extremely long strings) into text fields and confirming the API handles it safely (rejecting or safely storing it as inert data) rather than erroring unexpectedly or reflecting it back unescaped in a way that could enable an injection attack.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-security-05",
    courseSlug: "api-testing-and-automation",
    question:
      "Why should an automated API test suite isolate its own test data from production or shared staging data?",
    answer:
      "Tests that read, create, or modify shared data risk both corrupting real/shared data and being affected by other processes changing that same data concurrently -- an isolated test environment (or carefully-scoped, uniquely-tagged test data) keeps the suite's results reliable and prevents accidental damage.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-security-06",
    courseSlug: "api-testing-and-automation",
    question:
      "What makes an API test automation suite 'maintainable' in a way that pays off over time?",
    answer:
      "Reusable request-building helpers, a shared/versioned schema definitions layer, centralized auth-token setup, and consistent structure across test files -- so a real API change only requires updating shared logic in one place, rather than hunting through dozens of near-duplicated test files.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-security-07",
    courseSlug: "api-testing-and-automation",
    question:
      "Why does a CI pipeline's test-failure report need to be genuinely 'actionable,' and what does that concretely mean for API test output?",
    answer:
      "A CI failure that just says '3 tests failed' with no further detail forces whoever's investigating to manually re-run everything locally to understand what broke -- actionable output includes the specific request sent, the expected vs. actual response, and enough context to start diagnosing directly from the CI log itself.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-security-08",
    courseSlug: "api-testing-and-automation",
    question:
      "Why should API test credentials/tokens be sourced from environment variables or a secrets manager in CI, rather than hardcoded in the test files?",
    answer:
      "Hardcoded credentials in test files end up committed to version control (a real leak risk) and can't easily differ between environments (a staging test token shouldn't accidentally be the same as a production one) -- environment-provided secrets keep credentials both secure and environment-appropriate.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-security-09",
    courseSlug: "api-testing-and-automation",
    question:
      "Why might API tests be run in parallel in CI, and what does that require of how each test manages its own data?",
    answer:
      "Parallel execution speeds up an otherwise slow suite significantly -- but it requires every test to use independent, uniquely-generated data so concurrently-running tests never read or write the same underlying resource, which would otherwise cause intermittent, hard-to-reproduce failures.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "api-testing-interview-security-10",
    courseSlug: "api-testing-and-automation",
    question:
      "Why is 'this API test suite passed' not, by itself, sufficient evidence that the API is secure?",
    answer:
      "A functional test suite (even a thorough one covering positive/negative/boundary cases) is generally not designed to catch deeper security concerns like authentication bypass techniques, timing attacks, or subtle authorization logic flaws -- baseline security checks integrated into functional testing catch some real issues, but don't replace a dedicated security review/penetration test for anything handling sensitive data.",
    category: "Security, Reliability & Automation Structure",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
