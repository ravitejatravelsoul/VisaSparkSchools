import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * AngularJS Legacy Maintenance interview-prep questions -- 50 questions
 * about MAINTAINING, READING, and MODERNIZING an existing AngularJS (1.x)
 * codebase. AngularJS reached end of life in 2022 and is not recommended
 * for new projects -- every question here is framed around legacy
 * maintenance/security/modernization/migration, never as if AngularJS were
 * current technology, and never confused with the current Angular
 * (2+, TypeScript-based) framework covered by the separate
 * angular-application-development course.
 */
export const angularjsInterviewQuestions: InterviewQuestionInput[] = [
  // --- Legacy Context, $scope & Two-Way Binding (10) ---
  {
    id: "angularjs-interview-legacy-01",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "AngularJS reached end of life in 2022 -- what does that mean in practice for a team maintaining an existing AngularJS application?",
    answer:
      "No new official security patches, bug fixes, or feature updates are being published by the framework's maintainers -- any security vulnerability discovered in AngularJS itself (as opposed to application code) will not be fixed upstream, which is why a maintenance team must treat unresolved framework-level issues as a standing risk and prioritize planning a migration path rather than assuming the framework will keep receiving fixes indefinitely.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-legacy-02",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why should AngularJS (1.x) never be recommended as a starting point for a brand-new project, even though it's still safe to maintain an existing one?",
    answer:
      "Since it's end-of-life with no ongoing official support, choosing it for a new project means starting behind on security and tooling from day one, with no path to future framework-level fixes -- a new project should use a currently-supported framework (like current Angular 2+, or another actively maintained option) instead; AngularJS maintenance work is exclusively about existing codebases that can't be rewritten immediately.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-legacy-03",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is `$scope` in AngularJS, and how does it differ conceptually from a component class's `this` in current Angular?",
    answer:
      "`$scope` is AngularJS's object representing the data and methods available to a given part of the template, glued together by the framework's own binding system; current Angular replaced this with plain TypeScript component classes where template bindings reference `this`-scoped class properties directly -- the two mechanisms are NOT interchangeable, and this is one of the clearest markers separating legacy AngularJS code from current Angular code.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-legacy-04",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What does two-way data binding via `ng-model` mean in AngularJS, and what is a risk of relying on it heavily in a large legacy codebase?",
    answer:
      "`ng-model` automatically keeps a form input's value and a `$scope` property synchronized in both directions -- convenient for simple forms, but in a large legacy application, heavy reliance on implicit two-way binding across many nested scopes can make it genuinely difficult to trace WHERE a given value actually changed from, which is a common source of confusing bugs a maintainer has to untangle.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-legacy-05",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is `$scope` inheritance in AngularJS, and why can it cause confusing bugs when a nested scope shadows a parent property?",
    answer:
      "Child scopes prototypically inherit from their parent scope, so reading a property that exists on the parent 'just works' from a child -- but WRITING a primitive value (like a string or number) from a child scope creates a new property on the CHILD scope instead of updating the parent's, silently breaking the expected two-way binding; this is a well-known legacy AngularJS pitfall, often worked around with a `.`-containing object property (the 'dot rule') instead of a bare primitive on `$scope`.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "advanced",
    commonMistake:
      "Binding a primitive value directly on a child $scope inside ng-repeat or a nested controller, then being surprised writes to it don't propagate to the parent scope due to prototypal inheritance shadowing.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-legacy-06",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is an AngularJS module (`angular.module(...)`), and how does it relate to organizing a legacy application's code?",
    answer:
      "A module is AngularJS's unit of code organization, bundling controllers, services, directives, and configuration under a named container that other modules can depend on -- when reading an unfamiliar legacy codebase, tracing a feature's module dependencies is often the fastest way to understand which controllers/services/directives are actually wired together for a given screen.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-legacy-07",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is an AngularJS controller, and what is it responsible for in the older Model-View-Controller-flavored architecture AngularJS encouraged?",
    answer:
      "A controller is a constructor function that sets up the initial state and behavior exposed on `$scope` for a specific view -- in a legacy codebase, controllers are often the first place to look to understand what data and actions a given screen/template actually has available to it.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-legacy-08",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is 'controllerAs' syntax, and why might you find it used inconsistently across an older AngularJS codebase compared to raw `$scope` usage?",
    answer:
      "`controllerAs` binds a controller instance to a named alias in the template (`this.user` referenced as `vm.user`) instead of assigning directly to `$scope`, which was introduced as a later best-practice improvement to make the data source in a template more explicit and avoid some `$scope`-inheritance pitfalls -- a legacy codebase built up over years often mixes older raw-`$scope` controllers with newer `controllerAs`-style ones, reflecting how AngularJS best practices themselves evolved during the framework's active years.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-legacy-09",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why is it important to identify which version of AngularJS (1.x) a legacy codebase is actually pinned to before making changes?",
    answer:
      "AngularJS 1.x had meaningful behavioral differences across its own minor versions (and third-party directive libraries were often pinned to a specific compatible version range) -- confirming the exact pinned version before making changes avoids assuming behavior or APIs from a different 1.x version than the one actually deployed, and matters for assessing exactly which known vulnerabilities/CVEs are even applicable to this specific deployment.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-legacy-10",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What should a maintainer's FIRST priority be when picking up an unfamiliar, undocumented AngularJS legacy codebase -- rewriting, or something else?",
    answer:
      "Understanding the existing application's actual behavior and structure well enough to make safe, low-risk changes -- jumping straight to a rewrite without first understanding the current system's real behavior (including undocumented edge cases business logic may depend on) is a common way legacy modernization efforts go wrong; reading/mapping the existing code and its test coverage (or lack thereof) should come before any large-scale rewrite decision.",
    category: "Legacy Context, $scope & Two-Way Binding",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Directives & Services (10) ---
  {
    id: "angularjs-interview-directives-01",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is a built-in AngularJS directive like `ng-repeat`, and what legacy performance concern is commonly associated with it on large lists?",
    answer:
      "`ng-repeat` renders a template once per item in a collection, similar in spirit to a modern framework's list-rendering construct; on large lists, it's commonly associated with digest-cycle performance concerns, since (as covered later) each bound expression in the repeated template becomes a watcher that AngularJS re-checks on every digest cycle, and this can visibly slow down a legacy app with large unpaginated lists.",
    category: "Directives & Services",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-directives-02",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is a custom AngularJS directive, at a high level, and what's one reason a legacy codebase might have accumulated many small custom directives?",
    answer:
      "A custom directive extends HTML with new element/attribute behavior via a directive definition object, similar in spirit to how modern frameworks let you build reusable, encapsulated UI components -- legacy AngularJS codebases often accumulated many small custom directives as the primary way to achieve reusable UI logic, since AngularJS predates today's more standardized component-first patterns.",
    category: "Directives & Services",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-directives-03",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What does a directive's `scope` option (`scope: {}` for an isolate scope) control, and why does understanding it matter when reading unfamiliar custom directive code?",
    answer:
      "It controls whether the directive gets its OWN isolated scope (decoupled from the parent, with explicit `@`/`=`/`&` bindings defining exactly what data flows in) versus inheriting/sharing the parent scope directly -- misreading which scope mode a directive uses is a common source of confusion when tracing how data actually flows into an unfamiliar legacy directive.",
    category: "Directives & Services",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-directives-04",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is an AngularJS service (or factory), and what pattern does it typically serve in a legacy application?",
    answer:
      "A service/factory is AngularJS's mechanism for a singleton object holding shared logic or state, injected into controllers/directives via AngularJS's own dependency injection system -- typically used for concerns like shared business logic, cross-controller state, or wrapping `$http` calls to a backend API, similar in intent (though not implementation) to how current Angular uses injectable services.",
    category: "Directives & Services",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-directives-05",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is the practical difference between AngularJS's `.service()` and `.factory()` registration methods?",
    answer:
      "`.service()` registers a constructor function that AngularJS instantiates with `new`; `.factory()` registers a function whose RETURN VALUE becomes the injectable -- functionally they can achieve the same result, and a legacy codebase often uses both inconsistently depending on which pattern a given contributor preferred at the time it was written.",
    category: "Directives & Services",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-directives-06",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why is AngularJS's dependency injection via minifiable string names (or the array-annotation syntax) a legacy maintenance concern when a build's minifier renames function parameters?",
    answer:
      "AngularJS's DI can infer dependencies from a function's parameter NAMES, but minification renames parameters to short, meaningless names, silently breaking that inference at runtime unless the dependencies are declared explicitly via the array-annotation syntax (`['$http', function($http) {...}]`) or an `ngAnnotate`-style build step -- a legacy codebase missing this annotation on some services can work fine in local development (unminified) but break specifically in a minified production build, a classic legacy AngularJS gotcha.",
    category: "Directives & Services",
    difficulty: "advanced",
    commonMistake:
      "Relying on AngularJS's implicit parameter-name DI inference without array annotations, which works in unminified dev builds but silently breaks once a production build minifies parameter names.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-directives-07",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What does a directive's `link` function do, and why might it appear alongside (or instead of) a `controller` in an older custom directive?",
    answer:
      "The `link` function is where a directive attaches DOM-level behavior (event listeners, direct DOM manipulation) after the template is compiled and linked to the scope -- older directive code often mixed `link`-function DOM manipulation directly with controller logic, a pattern current component-based frameworks discourage in favor of more declarative, DOM-manipulation-free component code.",
    category: "Directives & Services",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-directives-08",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why should direct DOM manipulation inside a legacy AngularJS directive's `link` function be treated cautiously when making changes to it?",
    answer:
      "Direct DOM manipulation bypasses AngularJS's own data-binding and digest-cycle awareness, meaning changes made this way won't automatically trigger AngularJS to notice and re-check bound expressions -- a maintainer changing such code needs to understand whether a manual `$scope.$apply()`/`$digest()` call is needed afterward to keep the rest of the framework's state in sync with the DOM change.",
    category: "Directives & Services",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-directives-09",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "How would you safely add a new feature to an AngularJS service that's injected into many different controllers across a large legacy codebase?",
    answer:
      "Search the codebase for every injection point of that service first, understand which callers might be affected by a behavior change (not just a purely additive one), prefer adding a new method over changing an existing method's signature/behavior where possible, and (if any automated test coverage exists for the service or its consumers) run it before and after the change -- minimizing blast radius matters more in an old, likely under-tested codebase than in a newer, well-tested one.",
    category: "Directives & Services",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-directives-10",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is AngularJS's built-in dependency injection container, and how does injecting a mock service in a unit test work for a legacy controller?",
    answer:
      "AngularJS ships its own DI container (distinct from, and predating, current Angular's DI system) that resolves named dependencies for controllers/services/directives; in a unit test, `angular.mock.module()` and `inject()` (from `ngMock`) let you substitute a real service with a mock/stub before the controller under test is instantiated, similar in spirit to how `TestBed` providers work in current Angular testing.",
    category: "Directives & Services",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- The Digest Cycle & Performance Pitfalls (10) ---
  {
    id: "angularjs-interview-digest-01",
    courseSlug: "angularjs-legacy-maintenance",
    question: "What is the AngularJS digest cycle, at a conceptual level?",
    answer:
      "The digest cycle is AngularJS's dirty-checking loop -- it re-evaluates every registered 'watcher' expression, compares each result to its previous value, and re-runs until no more changes are detected (or a max-iteration safety limit is hit), updating the DOM for anything that changed -- this is architecturally very different from current Angular's more targeted, zone-based change detection.",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-digest-02",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What triggers a digest cycle in AngularJS, and why might a legacy codebase have manual `$scope.$apply()` calls scattered through it?",
    answer:
      "AngularJS's own directives (like `ng-click`) and services (like `$http`, `$timeout`) automatically trigger a digest cycle after they run; code that changes `$scope` data OUTSIDE AngularJS's awareness (e.g. a raw third-party library callback, or plain `setTimeout`) needs a manual `$scope.$apply()` to tell AngularJS a digest is needed -- legacy code integrating older non-Angular-aware libraries often has these manual calls scattered around specifically to bridge that gap.",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-digest-03",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why does a legacy AngularJS application with hundreds or thousands of watchers commonly become noticeably slow?",
    answer:
      "Every watcher's expression is re-evaluated on EVERY digest cycle (potentially multiple times per cycle until stable), so the cost of a single digest scales roughly linearly with the total number of active watchers -- a legacy app that's accumulated many nested `ng-repeat`s, bindings, and custom directives over the years can end up with thousands of watchers, making every user interaction (which triggers a digest) noticeably sluggish.",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-digest-04",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is one-time binding (`::value`) in AngularJS, and how does it help mitigate digest-cycle performance problems?",
    answer:
      "Prefixing an expression with `::` (e.g. `{{::user.name}}`) tells AngularJS to evaluate it once and then stop watching it for further changes, removing that binding from the ongoing digest-cycle cost entirely -- a common, low-risk performance mitigation for legacy data that's genuinely static after initial render (like a page title or a value that never changes post-load).",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "advanced",
    codeExample: "<h1>{{::pageTitle}}</h1>",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-digest-05",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is the `$http` service in AngularJS, and how does it compare conceptually to current Angular's `HttpClient`?",
    answer:
      "`$http` is AngularJS's built-in service for making HTTP requests, returning a promise-like object -- it serves the same conceptual role as current Angular's Observable-based `HttpClient`, but with a different (promise-based) API shape and no built-in RxJS-operator composability; migrating `$http` call sites to `HttpClient` is a common, concrete step in an incremental AngularJS-to-Angular migration.",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-digest-06",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why can a `$watch` on a deeply nested object with `objectEquality: true` (the third `true` argument) be an expensive pattern in a legacy codebase?",
    answer:
      "Deep-equality watching requires AngularJS to recursively compare the ENTIRE object on every digest cycle rather than a cheap reference check, which scales poorly for large or deeply nested objects -- a legacy codebase with several deep `$watch`es on large data structures is a common, identifiable source of a slow digest cycle worth investigating during a performance pass.",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "advanced",
    commonMistake:
      "Adding a deep-equality $watch (objectEquality: true) on a large or deeply nested object without realizing it forces an expensive recursive comparison on every digest cycle.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-digest-07",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What does the error 'digest already in progress' typically indicate in a legacy AngularJS codebase, and what commonly causes it?",
    answer:
      "It means code called `$scope.$apply()` (or `$digest()`) while a digest cycle was already running -- commonly caused by manually calling `$apply()` inside code that AngularJS ALREADY triggers a digest for automatically (like inside an `ng-click` handler), a subtle bug that's worth checking for whenever a maintainer needs to add a manual `$apply()`/`$digest()` call to bridge non-Angular-aware code.",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-digest-08",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "How would you profile which part of a legacy AngularJS application is causing slow digest cycles?",
    answer:
      "Browser DevTools' performance/profiler tab can reveal long-running digest-related function calls; AngularJS also has community tooling (like `ng-stats`) that overlays real-time watcher counts and digest duration -- identifying which specific view or component has an outsized watcher count is usually the first step toward targeted mitigation (like adding one-time bindings or paginating a large `ng-repeat`).",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-digest-09",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why might pagination or virtual scrolling be a practical performance fix for a legacy `ng-repeat` rendering a very large list?",
    answer:
      "`ng-repeat` creates a watcher (or several) per rendered item, so a list of thousands of items directly multiplies the digest cycle's per-cycle cost; rendering only a paginated subset (or only the currently-visible rows, via virtual scrolling) keeps the actual number of live watchers bounded regardless of the underlying dataset's total size, which is often a more practical near-term fix than a full framework migration.",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-digest-10",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why does calling a function directly inside an interpolation binding (`{{ getTotal() }}`) in a legacy AngularJS template raise a performance concern, specifically because of how the digest cycle works?",
    answer:
      "The function is re-invoked on EVERY digest cycle (potentially multiple times per single cycle until stability is reached), so an expensive function called this way runs far more often than a developer might expect from reading the template alone -- a common legacy performance fix is computing the value once in the controller (or using a filter/one-time binding where appropriate) rather than calling an expensive function directly from the template repeatedly.",
    category: "The Digest Cycle & Performance Pitfalls",
    difficulty: "advanced",
    commonMistake:
      "Calling an expensive function directly from a template interpolation, not realizing AngularJS re-invokes it on every single digest cycle rather than once per actual data change.",
    lastReviewed: "2026-08-07",
  },

  // --- Maintaining & Modernizing (10) ---
  {
    id: "angularjs-interview-modernize-01",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is a practical first step for reading and understanding an unfamiliar, undocumented legacy AngularJS feature before changing it?",
    answer:
      "Trace the feature from its route/template entry point down through its controller and injected services, noting which `$scope` properties the template actually binds to and which services those depend on -- building this map before changing anything reduces the risk of missing a non-obvious dependency or side effect that isn't documented anywhere.",
    category: "Maintaining & Modernizing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-modernize-02",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why is writing characterization tests (tests that document the EXISTING behavior, correct or not) often a better first move than immediately fixing a suspected bug in untested legacy AngularJS code?",
    answer:
      "Legacy code frequently has undocumented, business-relied-upon behavior that looks like a bug but isn't -- characterization tests capture what the code ACTUALLY does today, giving a maintainer a safety net to detect any unintended behavior change before deciding whether a given behavior is a genuine bug to fix or a real (if surprising) requirement to preserve.",
    category: "Maintaining & Modernizing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-modernize-03",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What testing tools are commonly used for legacy AngularJS unit and end-to-end tests?",
    answer:
      "Karma with Jasmine (and AngularJS's own `ngMock` module for injecting mocked dependencies) is the traditional AngularJS unit-testing stack; Protractor was AngularJS's original purpose-built end-to-end testing tool, though Protractor itself is also deprecated, so a legacy codebase's e2e suite may need migrating to a currently-maintained tool (like Playwright or Cypress) as part of modernization.",
    category: "Maintaining & Modernizing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-modernize-04",
    courseSlug: "angularjs-legacy-maintenance",
    question: "What is `ngUpgrade`, and what migration strategy does it enable?",
    answer:
      "`ngUpgrade` is a compatibility layer that lets AngularJS and current Angular run SIDE BY SIDE in the same application, letting a team migrate a legacy codebase incrementally -- component by component, route by route -- rather than requiring an all-at-once big-bang rewrite, which is significantly lower-risk for a large, actively-used legacy application.",
    category: "Maintaining & Modernizing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-modernize-05",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What factors would you weigh when deciding between an incremental `ngUpgrade` migration and a full rewrite of a legacy AngularJS application?",
    answer:
      "A full rewrite risks a long period of parallel-maintaining two codebases and the well-known 'second-system' risk of a rewrite quietly dropping undocumented behavior the original handled; an incremental migration lets the app stay shippable and tested throughout, at the cost of running two frameworks side by side (with the associated bundle-size and complexity overhead) for the migration's duration -- the right choice depends on the app's size, how well-tested it is, team capacity, and how urgently full modernization is needed.",
    category: "Maintaining & Modernizing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-modernize-06",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why should a maintainer specifically check a legacy AngularJS application's dependency tree (AngularJS version and any third-party AngularJS directive libraries) for known security vulnerabilities?",
    answer:
      "Since AngularJS itself is end-of-life and receives no further official patches, any known CVE affecting the specific pinned version in use (or an unmaintained third-party AngularJS library it depends on) will remain unresolved unless the team applies an unofficial patch, upgrades to a still-maintained fork, or removes/replaces the vulnerable dependency themselves -- this is a genuine, standing security consideration specific to maintaining EOL framework code, not a hypothetical concern.",
    category: "Maintaining & Modernizing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-modernize-07",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is AngularJS's built-in protection against a specific class of template-injection vulnerability, and why should a maintainer never disable it without a very good, reviewed reason?",
    answer:
      "AngularJS auto-escapes interpolated bindings by default and uses `$sce` (Strict Contextual Escaping) to guard against unsafely rendering untrusted HTML/URLs/resource URLs; bypassing `$sce` (e.g. via `$sce.trustAsHtml()` on user-supplied content) to render raw HTML reopens a real cross-site-scripting risk, so any legacy code doing this deserves careful security review to confirm the content genuinely can't be attacker-controlled.",
    category: "Maintaining & Modernizing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-modernize-08",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "How would you prioritize which parts of a large legacy AngularJS application to modernize first, given limited time and budget?",
    answer:
      "Prioritize by a combination of business risk (which screens are most business-critical or highest-traffic), technical risk (which parts have the worst test coverage, or touch known-vulnerable dependencies), and natural migration boundaries (routes/features that are relatively self-contained migrate more cleanly with `ngUpgrade` than tightly-coupled shared services) -- a full rewrite-everything-at-once plan is rarely the pragmatic answer for a codebase that must keep shipping.",
    category: "Maintaining & Modernizing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-modernize-09",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is a realistic timeline expectation to set with stakeholders for migrating a large, actively-used legacy AngularJS application to current Angular (or another modern framework)?",
    answer:
      "For anything beyond a small application, an incremental migration typically takes months (sometimes longer, depending on team size and how tightly coupled the legacy code is), not weeks -- setting this expectation honestly with stakeholders up front, backed by a concrete phased plan (which routes/features migrate first and why), avoids the common failure mode of an underestimated migration stalling out halfway with the team maintaining two frameworks indefinitely.",
    category: "Maintaining & Modernizing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-modernize-10",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why is it important for a developer maintaining AngularJS code to also understand current Angular concepts, and where do the two frameworks genuinely diverge?",
    answer:
      "Understanding current Angular is essential both for planning a credible migration path and for avoiding accidentally applying current-Angular mental models (like component classes and `HttpClient` Observables) to AngularJS code where they don't apply -- the two frameworks share a name and a general SPA philosophy, but diverge completely in their underlying architecture: `$scope`-based dirty-checking versus component-class-based, more targeted change detection; promise-based `$http` versus Observable-based `HttpClient`; and directive-heavy reuse versus component-based reuse.",
    category: "Maintaining & Modernizing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Promises, Debugging & Legacy Tooling (10) ---
  {
    id: "angularjs-interview-tooling-01",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is `$q` in AngularJS, and how does it differ from a native JavaScript `Promise`?",
    answer:
      "`$q` is AngularJS's own promise implementation, predating native Promises' widespread availability -- functionally similar (`.then()`/`.catch()`/`$q.all()`), but critically, `$q` promises resolve WITHIN AngularJS's digest cycle, automatically triggering change detection when they settle, whereas a native `Promise` resolving outside AngularJS's awareness may require a manual `$scope.$apply()` to update the view.",
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-tooling-02",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why might mixing native Promises (from a modern third-party library) with `$q`-based legacy code cause a subtle bug where the UI doesn't update after an async operation completes?",
    answer:
      "A native Promise resolving doesn't automatically trigger an AngularJS digest cycle the way a `$q` promise does, so `$scope` changes made inside a native `.then()` callback may not be reflected in the view until some LATER, unrelated digest cycle happens to run -- the legacy fix is wrapping the native-Promise callback's scope changes in a manual `$scope.$apply()` (or converting the flow to `$q` for consistency).",
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "advanced",
    commonMistake:
      "Assuming a native Promise resolving inside legacy AngularJS code will update the view immediately, when it actually needs a manual $scope.$apply() to trigger a digest cycle.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-tooling-03",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why is `$timeout` generally preferred over the native `setTimeout` inside AngularJS code?",
    answer:
      "`$timeout` automatically triggers an AngularJS digest cycle after its callback runs, so any `$scope` changes made inside it are reflected in the view immediately; using native `setTimeout` runs the callback entirely outside AngularJS's awareness, requiring a manual `$scope.$apply()` afterward if it touches bound data -- `$timeout` is also easier to flush deterministically in Karma/Jasmine unit tests via `$timeout.flush()`.",
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-tooling-04",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What does the console error 'Unknown provider' typically mean in a legacy AngularJS application, and what's the first thing to check?",
    answer:
      "It means AngularJS's injector couldn't resolve a named dependency requested by a controller/service/directive -- the first checks are confirming the dependency's name is spelled correctly at both the injection point and its registration, and confirming the module that registers it is actually listed as a dependency of the module doing the injecting (a very common cause in a legacy codebase with many interdependent modules).",
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-tooling-05",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What does the AngularJS error `ngRepeat:dupes` mean, and how would you fix it in a legacy template?",
    answer:
      'It means `ng-repeat` was given a collection containing duplicate values (by default, AngularJS tracks `ng-repeat` items by their value, and can\'t distinguish two identical entries) -- the fix is providing an explicit `track by` expression (`ng-repeat="item in items track by item.id"`) using a genuinely unique property, rather than relying on default value-based tracking.',
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-tooling-06",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What is the difference between `$watch`, `$watchGroup`, and `$watchCollection` in AngularJS, and when would a legacy codebase use each?",
    answer:
      "`$watch` observes a single expression's value; `$watchGroup` observes an array of expressions and fires when any one of them changes; `$watchCollection` performs a shallow watch over an array/object's items (detecting additions/removals/reordering) without the expense of a full deep-equality watch -- choosing the right one for a given legacy watcher matters both for correctness and for avoiding the unnecessary performance cost of an overly deep watch.",
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-tooling-07",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "Why can an unremoved `$rootScope.$on` event listener be a subtle memory-leak source in a legacy AngularJS single-page application?",
    answer:
      "`$rootScope` outlives every individual controller/component, so a listener registered on it via `$rootScope.$on` in a controller that's since been destroyed (e.g. the user navigated away) keeps running and keeps a reference to that destroyed controller's closure alive -- the legacy fix is capturing the deregistration function `$on` returns and calling it in the controller's `$destroy` event handler (`$scope.$on('$destroy', deregisterFn)`).",
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "advanced",
    commonMistake:
      "Registering a $rootScope.$on listener in a controller without capturing and calling its deregistration function on $destroy, leaking the controller's closure for the lifetime of the app.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-tooling-08",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What browser-based debugging techniques are useful for inspecting a legacy AngularJS application's live `$scope` state?",
    answer:
      "AngularJS exposes `angular.element(domNode).scope()` in the browser console, letting a developer inspect the live `$scope` object bound to any DOM node selected via DevTools -- along with breakpoints inside controllers/services and the `ng-stats` watcher-count overlay mentioned earlier, this is one of the most direct ways to understand what a legacy view's actual bound data looks like at runtime, especially when the code itself is undocumented.",
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-tooling-09",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "What does AngularJS's `$exceptionHandler` service do, and why might overriding it be useful in a legacy application?",
    answer:
      "By default, `$exceptionHandler` logs uncaught errors from AngularJS expressions/digest-cycle code to the browser console; overriding it (registering a custom implementation) lets a legacy application forward those errors to a centralized error-tracking/monitoring service instead, which is often valuable for a legacy codebase with limited test coverage, where production error monitoring is one of the few reliable ways to learn about real-world edge cases.",
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angularjs-interview-tooling-10",
    courseSlug: "angularjs-legacy-maintenance",
    question:
      "How would you use `$q.all()` to coordinate multiple independent legacy `$http` calls that a controller needs before it can render?",
    answer:
      "`$q.all([this.$http.get(url1), this.$http.get(url2)])` returns a single promise that resolves once ALL the given promises resolve (or rejects as soon as any one rejects), letting a controller wait for several independent legacy API calls to finish before setting up the view's initial `$scope` state -- conceptually the direct `$q`-based counterpart to modern Angular's `forkJoin`.",
    category: "Promises, Debugging & Legacy Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
