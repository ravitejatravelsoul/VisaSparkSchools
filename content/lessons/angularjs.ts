import type { LessonInput } from "@/lib/content/types";

/**
 * AngularJS Legacy Maintenance lessons. AngularJS (1.x) reached end-of-life
 * in January 2022 and is NOT recommended for new projects -- every lesson in
 * this course frames it as "how to read/maintain/modernize an EXISTING
 * AngularJS codebase," never as a recommended starting point (matching
 * lib/directory/data/frontend.ts's existing "angularjs" entry's legacyNote).
 * AngularJS has no safe in-browser execution on this platform either (its
 * digest-cycle behaved inconsistently in the sandboxed iframe used for
 * plain HTML/JS -- see docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md),
 * so every lesson uses a `guidedOutputLab` instead of a live runner.
 */
export const angularjsLessons: LessonInput[] = [
  {
    id: "angularjs-legacy-context",
    slug: "angularjs-legacy-context",
    title: "AngularJS: Legacy Context and Why You're Learning It",
    description:
      "AngularJS's end-of-life status, and why this course exists for maintenance, not new projects.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 0,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "State AngularJS's end-of-life status accurately",
      "Explain why this course exists to maintain existing codebases, not to recommend AngularJS for new work",
      "Distinguish AngularJS (1.x) from modern Angular (2+) as genuinely different frameworks",
    ],
    skills: ["angularjs-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["angularjs", "angularjs end of life", "legacy framework"],
    explanation: `**AngularJS (versions 1.x) reached end-of-life in January 2022 and no longer receives official updates or security patches.** It is not recommended for any new project. This course exists for one specific, legitimate reason: many real, still-operating applications were built with AngularJS years ago and haven't been rewritten -- someone needs to be able to read, safely modify, and eventually help modernize that existing code. If you're choosing a framework for a new project, use current Angular, React, Vue, or another actively-maintained option instead.

A common and important point of confusion: **AngularJS (1.x) and modern Angular (2+) are different frameworks**, not sequential versions of the same thing. Modern Angular was a ground-up rewrite in TypeScript with an entirely different architecture (components instead of controllers/\`$scope\`, a different templating philosophy, no digest cycle -- covered later in this course). There is no automatic upgrade path from AngularJS to Angular; migrating means a genuine rewrite (sometimes incremental, via tools like \`ngUpgrade\`, covered in this course's final module) rather than a version bump.

AngularJS apps are built around a global \`ng-app\` directive marking the app's root, and \`ng-controller\` associating a section of the page with a JavaScript controller function -- this "directives living directly in HTML attributes" style is one of the clearest visual differences from later frameworks, which generally moved templating logic elsewhere.

This platform can't safely execute AngularJS code either (its two-way \`$scope\` digest cycle behaved inconsistently in the sandboxed environment used for other browser-run code here), so like the rest of this course, you'll read real AngularJS code and predict its behavior rather than running it live.`,
    commonMistakes: [
      "Recommending AngularJS for a new project -- it's end-of-life and unmaintained; use a current framework instead.",
      "Assuming AngularJS and Angular (2+) are the same framework at different version numbers -- they're architecturally distinct, with no automatic upgrade path.",
      "Assuming this course teaches AngularJS as a skill to build new things with, rather than to read/maintain/modernize what already exists.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is AngularJS's current maintenance status?",
        choices: [
          "Actively maintained with regular updates",
          "End-of-life since January 2022, no longer officially updated",
          "Still the recommended default for new projects",
          "Merged into modern Angular",
        ],
        correctIndex: 1,
        explanation:
          "AngularJS reached end-of-life in January 2022 and receives no further official updates.",
      },
      {
        id: "q2",
        prompt: "Is there an automatic version-upgrade path from AngularJS to modern Angular?",
        choices: [
          "Yes, a single command upgrades it",
          "No -- they're different frameworks; migration means a genuine rewrite (sometimes incremental)",
          "Yes, but only for small apps",
          "AngularJS and Angular are literally identical",
        ],
        correctIndex: 1,
        explanation:
          "AngularJS and modern Angular are architecturally distinct; there's no automatic upgrade, only a rewrite (potentially incremental via tools like ngUpgrade).",
      },
      {
        id: "q3",
        prompt: "Why does this course exist, given AngularJS's status?",
        choices: [
          "To recommend AngularJS for new projects",
          "To help learners read, maintain, and plan modernization of existing AngularJS codebases",
          "AngularJS is actually still recommended and this course teaches new development",
          "There is no legitimate reason to learn AngularJS today",
        ],
        correctIndex: 1,
        explanation:
          "The course's explicit purpose is maintaining/modernizing existing code, not recommending AngularJS for anything new.",
      },
    ],
    takeaway:
      "AngularJS is end-of-life and not for new projects -- this course exists solely to help you read, maintain, and modernize an existing AngularJS codebase.",
    summary:
      "AngularJS (1.x) reached end-of-life in 2022 and is architecturally distinct from modern Angular; this course's sole purpose is legacy maintenance and modernization planning.",
    guidedOutputLab: {
      id: "angularjs-lab-basics",
      title: "Predict: A minimal AngularJS app's rendered value",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models AngularJS's ng-init/ng-click/interpolation behavior conceptually (this platform doesn't execute AngularJS's digest cycle). Given the initial state and one click, predict the displayed count.",
      steps: [
        {
          code: `<!-- Real AngularJS markup (not executed here): -->
<div ng-app ng-init="count = 0">
  <button ng-click="count = count + 1">{{count}}</button>
</div>

<!-- Modeling the equivalent scope state change as plain JS: -->
const scope = { count: 0 };
function ngClickHandler() {
  scope.count = scope.count + 1;
}
ngClickHandler(); // simulates one click
console.log(scope.count);`,
          expectedOutput: "1",
        },
      ],
      hints: [
        "ng-init sets count to 0; each click's ng-click expression increments it by 1.",
        "One simulated click takes count from 0 to 1.",
      ],
    },
    nextLessonSlug: "angularjs-scope-and-two-way-binding",
  },
  {
    id: "angularjs-scope-and-two-way-binding",
    slug: "angularjs-scope-and-two-way-binding",
    title: "$scope and Two-Way Data Binding",
    description: "AngularJS's $scope object and how ng-model creates two-way binding.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 1,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Explain what $scope represents in an AngularJS controller",
      "Describe how ng-model creates two-way binding between an input and $scope",
      "Contrast AngularJS's two-way binding with the one-way-plus-events pattern common in later frameworks",
    ],
    skills: ["angularjs-basics", "angularjs-scope"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["angularjs scope", "two-way data binding", "ng-model"],
    explanation: `\`$scope\` is the object AngularJS uses to connect a controller's JavaScript data to its HTML template -- properties set on \`$scope\` inside a controller function become available for interpolation and directives in that controller's section of the page: \`$scope.name = "Ada";\` makes \`{{name}}\` in the template display "Ada".

\`ng-model\` creates **two-way binding** on a form input: \`<input ng-model="name">\` means typing in the input immediately updates \`$scope.name\`, *and* if \`$scope.name\` changes elsewhere in the code, the input's displayed value updates too -- data flows both directions automatically, with no explicit event handler needed on either side.

This is a genuinely distinctive AngularJS design choice worth contrasting with later frameworks (including modern Angular, from your other course if you've taken it): most later frameworks default to **one-way data flow plus explicit events** (data down, events up, as in Angular's \`@Input\`/\`@Output\`) rather than automatic two-way binding, partly because automatic two-way binding at scale made it harder to trace exactly *what* changed *which* value *when* in a large application -- one of the real, legitimate criticisms that shaped later framework design.`,
    commonMistakes: [
      "Assuming $scope properties are automatically shared between unrelated controllers -- each controller typically has its own scope, connected only where the DOM hierarchy nests them.",
      "Forgetting ng-model's binding is genuinely bidirectional -- a programmatic change to $scope.name updates the input's displayed value too, not just the reverse.",
      "Assuming modern frameworks' one-way-plus-events pattern is strictly 'better' in every case -- it's a deliberate tradeoff (more explicit, more traceable) versus AngularJS's more automatic but harder-to-trace-at-scale two-way binding.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: 'What does setting `$scope.name = "Ada"` inside a controller do?',
        choices: [
          "Nothing without additional configuration",
          "Makes 'name' available to that controller's template for interpolation/directives",
          "Immediately submits a form",
          "Creates a new controller",
        ],
        correctIndex: 1,
        explanation: "$scope properties become available to the corresponding template section.",
      },
      {
        id: "q2",
        prompt: "What does ng-model provide?",
        choices: [
          "One-way binding only, input to scope",
          "One-way binding only, scope to input",
          "Two-way binding: input changes update scope, and scope changes update the input",
          "No binding at all",
        ],
        correctIndex: 2,
        explanation: "ng-model is AngularJS's signature two-way binding directive.",
      },
      {
        id: "q3",
        prompt:
          "What pattern do most later frameworks (including modern Angular) default to instead of automatic two-way binding?",
        choices: [
          "The exact same automatic two-way binding",
          "One-way data flow plus explicit events",
          "No data binding of any kind",
          "Only server-side rendering",
        ],
        correctIndex: 1,
        explanation:
          "Later frameworks generally favor one-way flow plus explicit events for better traceability at scale.",
      },
    ],
    takeaway:
      "ng-model gives genuinely bidirectional binding between an input and $scope -- a deliberate AngularJS design choice that later frameworks moved away from for traceability at scale.",
    summary:
      "$scope connects controller data to templates; ng-model creates true two-way binding, contrasted with later frameworks' one-way-plus-events default.",
    guidedOutputLab: {
      id: "angularjs-lab-two-way-binding",
      title: "Predict: Two-way binding reflecting a programmatic scope change",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models ng-model's two-way binding: a programmatic scope change should be reflected back in the 'input's displayed value' too. Predict the final displayed value.",
      steps: [
        {
          code: `// Modeling $scope and an ng-model-bound input as a simple two-way link:
const scope = { name: "" };

function simulateUserTyping(value) {
  scope.name = value; // input -> scope direction
}

function programmaticUpdate(value) {
  scope.name = value; // scope -> input direction (the input would visually update too)
}

simulateUserTyping("Ad");
simulateUserTyping("Ada");
programmaticUpdate("Ada Lovelace");

console.log(scope.name);`,
          expectedOutput: "Ada Lovelace",
        },
      ],
      hints: [
        "Both simulateUserTyping and programmaticUpdate write to the same scope.name -- that's the essence of two-way binding.",
        'The last write wins: programmaticUpdate("Ada Lovelace") is the final call.',
      ],
    },
    nextLessonSlug: "angularjs-modules-and-controllers",
  },
  {
    id: "angularjs-modules-and-controllers",
    slug: "angularjs-modules-and-controllers",
    title: "Modules and Controllers",
    description:
      "Organizing AngularJS code with angular.module and connecting controllers to the DOM.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 2,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Declare an AngularJS module with angular.module",
      "Register a controller on a module and connect it to the DOM with ng-controller",
      "Read an existing AngularJS file and identify its module/controller structure",
    ],
    skills: ["angularjs-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["angular.module", "angularjs controller", "ng-controller"],
    explanation: `An AngularJS application is organized into **modules**, declared with \`angular.module("appName", [dependencies])\` -- the array lists other modules this one depends on (empty \`[]\` for a module with no dependencies). This is how AngularJS composed larger applications from smaller, independently-testable pieces.

A **controller** is a JavaScript function registered on a module, responsible for setting up a section of \`$scope\`: \`app.controller("MainController", function($scope) { $scope.greeting = "Hello!"; })\`. It's connected to a specific part of the DOM with the \`ng-controller\` directive: \`<div ng-controller="MainController">{{greeting}}</div>\` -- everything inside that \`div\` has access to \`MainController\`'s \`$scope\`.

When reading an existing AngularJS file, a reliable first step is identifying its module declaration (usually near the top of a file, or in a dedicated \`app.js\`) and then finding each \`.controller(...)\` (and later, \`.service(...)\`/\`.factory(...)\`) registration -- this quickly maps out the application's overall shape before you dig into any one piece's logic.`,
    commonMistakes: [
      'Confusing angular.module("name", [...]) (declaring a NEW module, note the array argument) with angular.module("name") (retrieving an EXISTING module, no array) -- using the wrong form in the wrong place is a common real bug when editing legacy AngularJS code.',
      "Forgetting ng-controller scopes a controller to a specific DOM subtree -- code outside that subtree doesn't have access to its $scope.",
      "Not checking a file's module/controller registrations first when getting oriented in an unfamiliar AngularJS codebase, and instead diving straight into unfamiliar logic.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          'What does the array argument in `angular.module("app", ["otherModule"])` represent?',
        choices: [
          "A list of controllers",
          "A list of module dependencies",
          "A list of DOM elements",
          "A list of $scope properties",
        ],
        correctIndex: 1,
        explanation: "The array lists other modules this module depends on.",
      },
      {
        id: "q2",
        prompt: "What does ng-controller do?",
        choices: [
          "Registers a new module",
          "Connects a controller function's $scope to a specific section of the DOM",
          "Creates a two-way binding directly",
          "Declares a new AngularJS application entirely",
        ],
        correctIndex: 1,
        explanation:
          "ng-controller scopes a controller's $scope to the DOM subtree it's applied to.",
      },
      {
        id: "q3",
        prompt:
          "What's a reliable first step when getting oriented in an unfamiliar AngularJS file?",
        choices: [
          "Immediately start rewriting it",
          "Find its module declaration and controller/service registrations to map the app's shape",
          "Ignore $scope entirely",
          "Search only for CSS classes",
        ],
        correctIndex: 1,
        explanation:
          "Identifying modules and controllers first gives you a map before diving into specific logic.",
      },
    ],
    takeaway:
      "angular.module declares/retrieves modules (array argument vs. none is the key distinction), and ng-controller scopes a controller's $scope to a DOM subtree.",
    summary:
      "Modules organize AngularJS apps; controllers set up $scope and connect to the DOM via ng-controller; mapping module/controller registrations is a reliable way to get oriented in legacy code.",
    guidedOutputLab: {
      id: "angularjs-lab-modules",
      title: "Fill in the blank: declaring vs. retrieving a module",
      language: "AngularJS",
      mode: "fill-in-blank",
      prompt:
        "Fill in the missing array argument that DECLARES a new module (vs. retrieving an existing one), then predict the output.",
      steps: [
        {
          code: `// This line must DECLARE a new module named "app" (not retrieve an existing one):
const app = angular.module("app", ____);

app.controller("MainController", function () {
  return { greeting: "Hello from MainController" };
});

const controllerFactory = app._controllers = app._controllers || {};
console.log(app.name);`,
          expectedOutput: "app",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "[]",
      hints: [
        "An empty array [] declares a new module with no dependencies -- omitting the array entirely would instead retrieve an existing module (and throw if 'app' didn't already exist).",
        "This lab models module.name as a simple property for illustration; a real AngularJS Module object works similarly.",
      ],
    },
    nextLessonSlug: "angularjs-built-in-directives",
  },
  {
    id: "angularjs-built-in-directives",
    slug: "angularjs-built-in-directives",
    title: "Built-in Directives: ng-if, ng-repeat, ng-model",
    description:
      "Reading the most common AngularJS directives you'll encounter in existing templates.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Read and predict the effect of ng-if on whether an element renders",
      "Read and predict the output of ng-repeat over a collection",
      "Recognize ng-model as covered in an earlier lesson, in a fuller template context",
    ],
    skills: ["angularjs-directives"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["ng-if", "ng-repeat", "angularjs directives"],
    explanation: `\`ng-if="expression"\` conditionally includes an element in the DOM entirely (not just hides it visually) based on whether the expression is truthy: \`<p ng-if="user.isAdmin">Admin panel</p>\` -- if \`user.isAdmin\` is falsy, this \`<p>\` doesn't exist in the DOM at all, not just visually hidden.

\`ng-repeat="item in items"\` renders a copy of its element once per item in a collection, similar in spirit to a modern framework's list-rendering directive (like Angular's \`@for\`, if you've taken that course): \`<li ng-repeat="task in tasks">{{task.title}}</li>\` renders one \`<li>\` per entry in \`tasks\`, with \`task\` bound to the current item inside each iteration.

Reading real legacy AngularJS templates, you'll typically see \`ng-model\` (from an earlier lesson), \`ng-if\`, and \`ng-repeat\` used together constantly -- a form bound with \`ng-model\`, inside a conditionally-shown section (\`ng-if\`), listing repeated items (\`ng-repeat\`) is an extremely common real-world pattern worth being able to read fluently.`,
    commonMistakes: [
      "Confusing ng-if (removes the element from the DOM entirely when false) with a CSS-based visibility toggle (which keeps the element in the DOM, just visually hidden) -- they have different performance and state-preservation implications.",
      "Forgetting ng-repeat creates a new child scope for each iteration, which can cause confusing behavior if you're not aware of it when the loop body also uses two-way binding.",
      "Misreading `item in items` order -- item is the per-iteration loop variable, items is the source collection, not the reverse.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: 'What does ng-if="false" do to its element?',
        choices: [
          "Visually hides it with CSS but keeps it in the DOM",
          "Removes it from the DOM entirely",
          "Disables its click handlers only",
          "Nothing, ng-if requires a function",
        ],
        correctIndex: 1,
        explanation:
          "ng-if removes/adds the element from the DOM based on the expression's truthiness, unlike a CSS visibility toggle.",
      },
      {
        id: "q2",
        prompt: 'In `ng-repeat="task in tasks"`, what does `task` refer to?',
        choices: [
          "The whole tasks array",
          "The current item in each iteration",
          "A global variable",
          "The DOM element itself",
        ],
        correctIndex: 1,
        explanation:
          "task is the per-iteration loop variable, bound to the current item from the tasks collection.",
      },
      {
        id: "q3",
        prompt: "Does ng-repeat create a new scope for each iteration?",
        choices: [
          "No, they all share one scope",
          "Yes, each iteration gets its own child scope",
          "Only if ng-model is also used",
          "Only for the first iteration",
        ],
        correctIndex: 1,
        explanation:
          "Each ng-repeat iteration gets its own child scope, which matters when reasoning about binding inside the loop.",
      },
    ],
    takeaway:
      "ng-if removes elements from the DOM entirely (not just visually), and ng-repeat creates a new child scope per iteration -- both matter when reading or debugging existing templates.",
    summary:
      "ng-if conditionally includes/excludes elements from the DOM; ng-repeat renders one element per collection item, each with its own child scope.",
    guidedOutputLab: {
      id: "angularjs-lab-directives",
      title: "Predict: ng-if and ng-repeat's combined effect",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models what ng-if and ng-repeat would render, as plain JS producing an array of rendered items (this platform doesn't render the real template). Predict the resulting list.",
      steps: [
        {
          code: `const tasks = [
  { title: "Buy milk", visible: true },
  { title: "Secret admin task", visible: false },
  { title: "Write report", visible: true },
];

// Models: <li ng-repeat="task in tasks" ng-if="task.visible">{{task.title}}</li>
const rendered = tasks.filter((task) => task.visible).map((task) => task.title);
console.log(rendered);`,
          expectedOutput: '["Buy milk", "Write report"]',
        },
      ],
      hints: [
        "ng-if removes non-visible items from the DOM entirely, modeled here by filter().",
        "ng-repeat then renders the remaining items, modeled by map() extracting each title.",
      ],
    },
    nextLessonSlug: "angularjs-custom-directives",
  },
  {
    id: "angularjs-custom-directives",
    slug: "angularjs-custom-directives",
    title: "Custom Directives",
    description: "How a custom AngularJS directive is defined, and reading one in existing code.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 4,
    difficulty: "advanced",
    estimatedMinutes: 18,
    objectives: [
      "Explain what a directive definition object's restrict and link properties control",
      "Read an existing custom directive and identify its element scope and DOM-manipulation logic",
      "Recognize why custom directives are one of the harder parts of legacy AngularJS code to read",
    ],
    skills: ["angularjs-directives"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["angularjs custom directive", "directive definition object", "link function"],
    explanation: `Beyond the built-in directives (\`ng-if\`, \`ng-repeat\`, \`ng-model\`), AngularJS lets you define **custom directives** for reusable DOM behavior: \`app.directive("myHighlight", function() { return { restrict: "A", link: function(scope, element, attrs) { element.css("background", "yellow"); } }; });\`, used as \`<p my-highlight>Text</p>\`.

The returned **directive definition object**'s \`restrict\` property controls how the directive can be used in markup: \`"A"\` (attribute, e.g. \`my-highlight\`), \`"E"\` (element, e.g. \`<my-highlight>\`), \`"C"\` (class), or a combination like \`"AE"\`. The \`link\` function is where the actual DOM manipulation/event-wiring happens, given the directive's own isolated (or inherited) \`scope\`, the jqLite/jQuery-wrapped \`element\`, and the element's \`attrs\`.

Custom directives are genuinely one of the harder parts of legacy AngularJS code to read, because they mix template-declarative usage (\`<p my-highlight>\`) with imperative DOM manipulation inside \`link\` -- when investigating unfamiliar behavior on a page, checking whether an unusual HTML attribute maps to a custom directive (not a built-in one) is a common, useful step before assuming a bug is somewhere else entirely.`,
    commonMistakes: [
      "Not recognizing an unfamiliar HTML attribute as a reference to a custom directive, and searching for the bug in the wrong place entirely.",
      "Confusing restrict: 'A' (attribute usage) with restrict: 'E' (element usage) when reading or writing a directive's markup usage.",
      "Assuming all DOM manipulation in an AngularJS app happens through ng-* built-ins -- custom directives' link functions often do direct DOM manipulation too.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: 'What does a directive definition object\'s `restrict: "A"` mean?',
        choices: [
          "The directive can only be used as an element (<my-thing>)",
          "The directive can only be used as an attribute (my-thing)",
          "The directive is disabled",
          "The directive requires a controller",
        ],
        correctIndex: 1,
        explanation: 'restrict: "A" means the directive is used as an HTML attribute.',
      },
      {
        id: "q2",
        prompt: "Where does a custom directive's DOM manipulation typically happen?",
        choices: [
          "In the module declaration",
          "In the link function",
          "In $http",
          "In ng-repeat only",
        ],
        correctIndex: 1,
        explanation:
          "The link function is where a directive wires up DOM manipulation and event handling.",
      },
      {
        id: "q3",
        prompt: "Why are custom directives often harder to read than built-in ones in legacy code?",
        choices: [
          "They're never documented at all",
          "They mix declarative template usage with imperative DOM manipulation inside link",
          "They can't be used with $scope",
          "They are identical to controllers",
        ],
        correctIndex: 1,
        explanation:
          "The combination of declarative markup and imperative link-function logic makes tracing behavior harder.",
      },
    ],
    takeaway:
      "When investigating unfamiliar page behavior, check whether an unusual HTML attribute maps to a custom directive before assuming the bug is elsewhere.",
    summary:
      "Custom directives extend AngularJS's template vocabulary; restrict controls usage form (attribute/element/class), and link performs the actual DOM manipulation.",
    guidedOutputLab: {
      id: "angularjs-lab-custom-directives",
      title: "Predict: A custom directive's link function effect",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models a custom directive's link function as a plain function applied to an element's style object (this platform doesn't render real AngularJS directives). Predict the element's background after linking.",
      steps: [
        {
          code: `// Modeling: app.directive("myHighlight", () => ({ restrict: "A", link: (scope, element) => {...} }))
const element = { style: { background: "white" } };

function myHighlightLink(scope, element) {
  element.style.background = "yellow";
}

myHighlightLink(null, element);
console.log(element.style.background);`,
          expectedOutput: "yellow",
        },
      ],
      hints: [
        "The link function directly mutates the element's style, modeling real DOM manipulation.",
        "This models restrict: 'A' usage (an attribute directive) applied to one element.",
      ],
    },
    nextLessonSlug: "angularjs-services-and-factories",
  },
  {
    id: "angularjs-services-and-factories",
    slug: "angularjs-services-and-factories",
    title: "Services and Factories",
    description:
      "AngularJS's .service() and .factory() for sharing logic, and its dependency injection.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Distinguish .service() and .factory() as two ways to register shared logic",
      "Explain how AngularJS's dependency injection identifies which service to inject by argument name",
      "Read an existing service/factory registration and identify what it provides",
    ],
    skills: ["angularjs-services"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["angularjs service", "angularjs factory", "angularjs dependency injection"],
    explanation: `AngularJS offers two common ways to register shared, injectable logic. \`.service("name", function() { this.doSomething = () => {...}; })\` registers a **constructor function** -- AngularJS creates one instance with \`new\`, and whatever you attach to \`this\` becomes the service's public interface. \`.factory("name", function() { return { doSomething: () => {...} }; })\` registers a **factory function** -- AngularJS calls it once and uses whatever it \`return\`s as the service's value, giving you more flexibility (e.g. returning a plain object, a function, or anything else) than \`.service()\`'s "always a \`new\`-constructed instance" model.

AngularJS's dependency injection identifies what to inject **by matching a function parameter's name** to a registered service/factory name: \`app.controller("MainController", function(myDataService) { ... })\` automatically receives the registered \`myDataService\`. This name-matching approach is convenient but has a real, well-known downside: **minifying JavaScript typically renames function parameters**, which breaks this name-based injection unless you use one of AngularJS's explicit-annotation workarounds (an array syntax listing dependency names as strings, or an \`$inject\` property) -- a genuine, historically significant gotcha when deploying minified AngularJS code, and something you may well encounter explained (or, worse, NOT explained and silently broken) in existing production code.`,
    commonMistakes: [
      "Assuming .service() and .factory() are interchangeable with identical behavior -- .service() always constructs with new, .factory() returns whatever value you explicitly return.",
      "Not recognizing that AngularJS's name-based dependency injection breaks under minification unless explicitly annotated (array syntax or $inject) -- a classic, real production bug.",
      "Registering a service/factory but forgetting it must actually be listed as a parameter (by matching name) wherever it's meant to be injected.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How does .service() determine the service's public value?",
        choices: [
          "Whatever the function returns",
          "AngularJS constructs an instance with new, and whatever's attached to 'this' becomes the interface",
          "It's always a plain string",
          "It has no public value",
        ],
        correctIndex: 1,
        explanation:
          ".service() is called with `new`, so `this` inside it defines the resulting instance's shape.",
      },
      {
        id: "q2",
        prompt: "How does AngularJS's dependency injection decide what to inject into a function?",
        choices: [
          "By the order arguments are listed, regardless of name",
          "By matching the function parameter's name to a registered service/factory name",
          "Only via explicit configuration, never automatically",
          "Randomly",
        ],
        correctIndex: 1,
        explanation: "AngularJS's default DI mechanism matches by parameter name.",
      },
      {
        id: "q3",
        prompt: "Why can minification break AngularJS's default dependency injection?",
        choices: [
          "Minification is unrelated to DI",
          "Minifiers typically rename function parameters, breaking name-based matching",
          "Minification removes all services entirely",
          "It only affects .factory(), never .service()",
        ],
        correctIndex: 1,
        explanation:
          "Parameter renaming during minification breaks name-based injection unless explicitly annotated.",
      },
    ],
    takeaway:
      "Name-based dependency injection is convenient but breaks under minification without explicit annotation -- a real, historically significant AngularJS gotcha to watch for in production code.",
    summary:
      ".service() constructs an instance via new; .factory() returns an explicit value; DI matches by parameter name, which requires explicit annotation to survive minification.",
    guidedOutputLab: {
      id: "angularjs-lab-services",
      title: "Predict: .service() vs .factory()'s resulting shape",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models the difference between AngularJS's .service() (constructed with new) and .factory() (returns an explicit value). Predict what each produces.",
      steps: [
        {
          code: `// Modeling .service(): AngularJS calls "new ServiceFn()"
function GreeterService() {
  this.greet = (name) => \`Hello, \${name}! (from service)\`;
}
const serviceInstance = new GreeterService();

// Modeling .factory(): AngularJS calls "FactoryFn()" and uses its return value
function greeterFactory() {
  return {
    greet: (name) => \`Hello, \${name}! (from factory)\`,
  };
}
const factoryInstance = greeterFactory();

console.log(serviceInstance.greet("Ada"));
console.log(factoryInstance.greet("Grace"));`,
          expectedOutput: "Hello, Ada! (from service)\nHello, Grace! (from factory)",
        },
      ],
      hints: [
        "The service instance comes from `new GreeterService()`, using `this.greet`.",
        "The factory instance comes from calling greeterFactory() directly and using its returned object.",
      ],
    },
    nextLessonSlug: "angularjs-digest-cycle",
  },
  {
    id: "angularjs-digest-cycle",
    slug: "angularjs-digest-cycle",
    title: "The Digest Cycle",
    description: "What $digest and $apply do, and why later frameworks moved away from this model.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 6,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Explain what the digest cycle checks for and why it exists",
      "Describe when $apply is needed to trigger a digest manually",
      "Explain why later frameworks moved away from AngularJS's digest-cycle model",
    ],
    skills: ["angularjs-digest-cycle"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["digest cycle", "$apply", "$digest", "dirty checking"],
    explanation: `The **digest cycle** is AngularJS's mechanism for detecting changes and updating the DOM -- conceptually similar in purpose to change detection in modern Angular (if you've taken that course), but implemented very differently. AngularJS registers a **watcher** for every binding/expression it needs to track, and \`$digest\` repeatedly re-checks every registered watcher's current value against its previously-recorded value ("dirty checking"), updating the DOM for anything that changed -- and re-running the whole check again if anything *did* change, until nothing changes anymore or a maximum iteration count is hit.

AngularJS automatically triggers \`$digest\` after things it's aware of (an \`ng-click\` handler, an \`ng-model\`-bound input event, an AngularJS-provided \`$http\` response). The trouble comes when your code changes \`$scope\` data from **outside** something AngularJS is watching for -- a raw \`setTimeout\`, a third-party library's callback, a native (non-AngularJS) event listener. In those cases, AngularJS has no idea a change happened, and the view silently doesn't update until something else happens to trigger a digest. The fix is calling \`$scope.$apply(() => { /* your change */ })\` explicitly, which makes the change and then manually triggers a digest.

This dirty-checking-every-watcher approach is exactly the kind of implementation detail that becomes a real performance concern as an application's watcher count grows (a large \`ng-repeat\`-heavy page can register thousands of watchers), and it's one of the concrete, well-documented reasons later frameworks (modern Angular, React, Vue) moved to different change-detection/reactivity models entirely.`,
    commonMistakes: [
      "Changing $scope data inside a raw setTimeout or third-party callback and being confused why the view doesn't update -- AngularJS doesn't know to run a digest unless you call $scope.$apply().",
      "Calling $scope.$apply() when already inside a digest cycle (e.g. inside an ng-click handler, which already triggers one), causing a 'digest already in progress' error.",
      "Assuming digest-cycle performance issues are rare -- a large ng-repeat list can register enough watchers to make this a real, measurable problem.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does the digest cycle do, at its core?",
        choices: [
          "Compiles AngularJS to native code",
          "Repeatedly checks every registered watcher's value against its previous value, updating the DOM for changes",
          "Sends data to a server",
          "Deletes unused controllers",
        ],
        correctIndex: 1,
        explanation:
          "The digest cycle is AngularJS's dirty-checking mechanism across all registered watchers.",
      },
      {
        id: "q2",
        prompt: "When is $scope.$apply() typically needed?",
        choices: [
          "Never, digests happen automatically for everything",
          "When $scope changes outside something AngularJS is already watching for (e.g. a raw setTimeout)",
          "Only when using ng-repeat",
          "Only on the very first page load",
        ],
        correctIndex: 1,
        explanation:
          "$apply is needed to manually trigger a digest when a change happens outside AngularJS's awareness.",
      },
      {
        id: "q3",
        prompt:
          "What is a well-documented real-world consequence of the digest-cycle model at scale?",
        choices: [
          "It has no performance implications",
          "A large watcher count (e.g. from a big ng-repeat) can become a real performance concern",
          "It only affects AngularJS's build time, never runtime",
          "It automatically optimizes itself with no limit",
        ],
        correctIndex: 1,
        explanation:
          "Every registered watcher adds digest-cycle overhead, a genuine and well-known AngularJS performance concern at scale.",
      },
    ],
    takeaway:
      "The digest cycle dirty-checks every registered watcher -- call $scope.$apply() when changing $scope from outside AngularJS's awareness, and expect real performance costs from large watcher counts.",
    summary:
      "The digest cycle repeatedly dirty-checks watchers to detect changes; $apply manually triggers it for changes AngularJS wouldn't otherwise notice; watcher count is a genuine performance concern at scale.",
    guidedOutputLab: {
      id: "angularjs-lab-digest",
      title: "Predict: Dirty checking detecting a changed watcher",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models one digest pass: check every watcher's current value against its last-recorded value, and report which ones changed. Predict the output.",
      steps: [
        {
          code: `const watchers = [
  { name: "username", lastValue: "ada", getCurrentValue: () => "ada" },
  { name: "count", lastValue: 3, getCurrentValue: () => 5 },
  { name: "isValid", lastValue: false, getCurrentValue: () => false },
];

for (const watcher of watchers) {
  const current = watcher.getCurrentValue();
  if (current !== watcher.lastValue) {
    console.log(\`\${watcher.name} changed: \${watcher.lastValue} -> \${current}\`);
  }
}`,
          expectedOutput: "count changed: 3 -> 5",
        },
      ],
      hints: [
        "username and isValid have identical current and last values, so they're skipped.",
        "Only count's current value (5) differs from its last recorded value (3).",
      ],
    },
    nextLessonSlug: "angularjs-http-service",
  },
  {
    id: "angularjs-http-service",
    slug: "angularjs-http-service",
    title: "The $http Service",
    description:
      "AngularJS's built-in $http service for API calls, and how it compares to modern fetch.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Read an $http call and identify its method, URL, and response handling",
      "Explain that $http returns a promise-like object with .then()",
      "Contrast $http with the modern fetch API conceptually",
    ],
    skills: ["angularjs-http"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["angularjs $http", "angularjs api calls"],
    explanation: `\`$http\` is AngularJS's built-in service for making HTTP requests: \`$http.get("/api/users").then((response) => { $scope.users = response.data; })\` -- it returns a promise-like object with \`.then()\`/\`.catch()\`, predating (and inspiring some conventions found in) the standardized JavaScript \`Promise\`, which AngularJS's promise implementation (\`$q\`) is closely related to under the hood.

Unlike a modern \`fetch()\` call, \`$http\`'s response object already has the parsed body available as \`response.data\` -- no separate \`.json()\` call is needed, since \`$http\` handles that parsing step itself for a JSON response.

A genuinely important detail for reading legacy code correctly: because \`$http\` calls happen through AngularJS's own machinery, its \`.then()\` callback runs **inside** an AngularJS digest cycle automatically -- unlike a raw \`fetch()\` or a third-party library's callback, you generally don't need to manually call \`$scope.$apply()\` after an \`$http\` response, since AngularJS already knows about it.`,
    commonMistakes: [
      "Calling response.json() on an $http response like you would with fetch -- $http already provides the parsed body as response.data.",
      "Manually calling $scope.$apply() inside an $http .then() callback, which is usually unnecessary since $http already runs inside AngularJS's digest cycle.",
      "Assuming $http and modern fetch have identical error-handling shapes -- always check the specific method/property names in the actual code being read, not assumptions from a different API.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How do you access an $http response's parsed body?",
        choices: ["response.json()", "response.data", "response.body.parse()", "response.text()"],
        correctIndex: 1,
        explanation:
          "$http already parses the response and exposes it as response.data, unlike fetch's separate .json() call.",
      },
      {
        id: "q2",
        prompt:
          "Do you generally need to manually call $scope.$apply() inside an $http .then() callback?",
        choices: [
          "Yes, always",
          "Usually not -- $http already runs its callback inside AngularJS's digest cycle",
          "Only for GET requests",
          "$http doesn't support .then() at all",
        ],
        correctIndex: 1,
        explanation:
          "$http integrates with AngularJS's digest cycle automatically, unlike raw callbacks from outside AngularJS.",
      },
      {
        id: "q3",
        prompt: "What does $http return?",
        choices: [
          "A plain callback function",
          "A promise-like object with .then()/.catch()",
          "A synchronous value",
          "An XMLHttpRequest object directly",
        ],
        correctIndex: 1,
        explanation:
          "$http returns a promise-like object, closely related to AngularJS's own $q promise implementation.",
      },
    ],
    takeaway:
      "$http exposes the parsed response body as response.data (no separate .json() call), and its .then() callback already runs inside AngularJS's digest cycle.",
    summary:
      "$http makes HTTP requests, returning a promise-like object; response.data is already parsed; its callbacks integrate automatically with the digest cycle.",
    guidedOutputLab: {
      id: "angularjs-lab-http",
      title: "Predict: An $http-style response handler",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models $http.get(...).then(...) with a simple promise, since a live HTTP call can't run here. Predict what's logged.",
      steps: [
        {
          code: `function simulateHttpGet(url) {
  return Promise.resolve({
    status: 200,
    data: { users: ["Ada", "Grace"] },
  });
}

simulateHttpGet("/api/users").then((response) => {
  console.log("Status:", response.status);
  console.log("Users:", response.data.users);
});`,
          expectedOutput: 'Status: 200\nUsers: ["Ada","Grace"]',
        },
      ],
      hints: [
        "response.data is already the parsed object -- no separate .json() call, matching real $http behavior.",
        'response.data.users is the array ["Ada", "Grace"] as provided by the simulated response.',
      ],
    },
    nextLessonSlug: "angularjs-performance-pitfalls",
  },
  {
    id: "angularjs-performance-pitfalls",
    slug: "angularjs-performance-pitfalls",
    title: "Common Performance Pitfalls",
    description:
      "Watcher-count explosion and other real, well-documented AngularJS performance issues.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 8,
    difficulty: "advanced",
    estimatedMinutes: 15,
    objectives: [
      "Explain how a large ng-repeat list can cause watcher-count-related slowdowns",
      "Identify one-time binding (::) as a real mitigation for data that never changes after initial render",
      "Recognize other common causes of digest-cycle slowness in legacy code",
    ],
    skills: ["angularjs-performance"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["angularjs performance", "watcher count", "one-time binding"],
    explanation: `Following on from the digest-cycle lesson, the single most common real-world AngularJS performance complaint is **watcher-count explosion**: every binding (\`{{ }}\`), every \`ng-model\`, and every iteration of an \`ng-repeat\` registers its own watcher, and every digest cycle re-checks *all* of them. A page rendering a list of a few hundred items, each with several bindings, can easily register thousands of watchers -- and every user interaction re-runs the whole dirty-checking pass across every one of them.

One real, commonly-used mitigation for data that's set once and never changes afterward is **one-time binding**, written with a double-colon prefix: \`{{::user.name}}\` -- AngularJS evaluates this expression, and once it gets a non-\`undefined\` value, it **stops watching it entirely**, removing that watcher from future digest cycles. This is a genuine, meaningful optimization for template sections that display static or rarely-changing data (a page title, a user's name that won't change during the page's lifetime) without needing continuous two-way binding.

Other common causes of digest-cycle slowness in real legacy code: complex, expensive expressions directly inside a template binding (better computed once in the controller and exposed as a simple property instead), and unnecessarily broad \`$watch\` calls that fire far more often than the code actually needs.`,
    commonMistakes: [
      "Using regular two-way binding for data that's genuinely set once and never changes, missing the one-time binding (::) optimization.",
      "Putting an expensive computation directly inline in a template expression, causing it to re-run on every single digest cycle rather than being computed once and cached.",
      "Assuming watcher count is never a real concern -- for a small page it usually isn't, but a large ng-repeat-heavy page is a well-documented case where it genuinely matters.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does one-time binding (`{{::value}}`) do once it gets a non-undefined value?",
        choices: [
          "Nothing different from regular binding",
          "Stops watching that expression entirely, removing it from future digest cycles",
          "Doubles the watcher's priority",
          "Converts the binding to two-way",
        ],
        correctIndex: 1,
        explanation:
          "One-time binding removes the watcher after its first non-undefined evaluation, reducing digest-cycle overhead.",
      },
      {
        id: "q2",
        prompt: "What commonly causes watcher-count explosion in real AngularJS apps?",
        choices: [
          "A single static paragraph of text",
          "A large ng-repeat list, where every binding in every iteration registers its own watcher",
          "Using $http exactly once",
          "Declaring a module",
        ],
        correctIndex: 1,
        explanation:
          "Every iteration's bindings each add watchers, so large repeated lists scale watcher count quickly.",
      },
      {
        id: "q3",
        prompt:
          "Why is an expensive expression directly inside a template binding a performance concern?",
        choices: [
          "It isn't a concern",
          "It re-runs on every digest cycle rather than being computed once and cached",
          "Template expressions can't be expensive",
          "It only affects the first page load",
        ],
        correctIndex: 1,
        explanation:
          "A digest cycle re-evaluates every watched expression, so an expensive one pays its cost repeatedly.",
      },
    ],
    takeaway:
      "Use one-time binding (::) for data that never changes after initial render, and avoid expensive inline template expressions -- both are real, well-documented performance fixes.",
    summary:
      "Watcher-count explosion (especially from large ng-repeat lists) is a genuine AngularJS performance concern; one-time binding (::) and avoiding expensive inline expressions are real mitigations.",
    guidedOutputLab: {
      id: "angularjs-lab-performance",
      title: "Predict: One-time binding stops future re-checks",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models one-time binding's 'stop watching after first real value' behavior. Predict which digest passes still report a value for the one-time-bound watcher.",
      steps: [
        {
          code: `let oneTimeWatcherActive = true;
let oneTimeValue;

function digestPass(passNumber, sourceValue) {
  if (oneTimeWatcherActive) {
    oneTimeValue = sourceValue;
    console.log(\`Pass \${passNumber}: watched, value = \${oneTimeValue}\`);
    if (oneTimeValue !== undefined) {
      oneTimeWatcherActive = false; // one-time binding deregisters itself
    }
  } else {
    console.log(\`Pass \${passNumber}: not watched anymore (value stays \${oneTimeValue})\`);
  }
}

digestPass(1, undefined);
digestPass(2, "Ada");
digestPass(3, "changed later, but ignored");`,
          expectedOutput:
            "Pass 1: watched, value = undefined\nPass 2: watched, value = Ada\nPass 3: not watched anymore (value stays Ada)",
        },
      ],
      hints: [
        "Pass 1 gets undefined, so the watcher stays active (one-time binding waits for a real value).",
        'Pass 2 gets "Ada" (non-undefined), so the watcher deregisters itself right after this pass.',
        "Pass 3's new value is never picked up, since the watcher already stopped after pass 2.",
      ],
    },
    nextLessonSlug: "angularjs-reading-existing-code",
  },
  {
    id: "angularjs-reading-existing-code",
    slug: "angularjs-reading-existing-code",
    title: "Reading and Safely Modifying Existing AngularJS Code",
    description:
      "A practical approach to understanding and safely changing an unfamiliar AngularJS codebase.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Apply a systematic approach to getting oriented in an unfamiliar AngularJS file",
      "Identify where a specific piece of displayed data or behavior originates",
      "Make a small, safe, well-scoped change without breaking unrelated functionality",
    ],
    skills: ["angularjs-maintenance"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["legacy code maintenance", "angularjs debugging"],
    explanation: `Maintaining an unfamiliar AngularJS codebase benefits from a systematic approach, building on everything covered so far in this course:

1. **Find the module and controller/service registrations** (from the modules/controllers lesson) to map the app's overall shape.
2. **Trace a specific piece of displayed data back to its \`$scope\` assignment** -- if a value shown on the page is wrong, search for where that property is set on \`$scope\`, not just where it's displayed.
3. **Check whether the data flows through \`ng-model\` (two-way), a one-time binding (\`::\`), or a plain one-way interpolation**, since that materially affects whether a fix belongs in the controller, the template, or both.
4. **Watch for \$http/\$apply patterns** discussed earlier -- a bug where the view doesn't update after some async operation often traces back to a missing \`\$apply\` around a change AngularJS didn't know about.

When making a change, keep it **narrowly scoped**: legacy AngularJS code frequently has \$scope properties and functions used in more places than a first read suggests (shared services, nested \`ng-controller\`s, \`ng-include\`d templates), so a change that looks locally correct can have surprising side effects elsewhere. Before changing a shared service or a widely-used \$scope property, search the codebase for every place it's referenced, not just the one you're currently looking at.`,
    commonMistakes: [
      "Changing a shared service or widely-referenced $scope property without first searching the codebase for every place it's used.",
      "Fixing a symptom in the template (e.g. hardcoding a displayed value) instead of tracing the bug back to its actual source in the controller/service logic.",
      "Assuming a bug is in the obvious file without checking whether the actual data originates from a service, a parent controller's scope, or an async $http response.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What's a recommended first step when getting oriented in an unfamiliar AngularJS file?",
        choices: [
          "Immediately rewrite it in a modern framework",
          "Find its module and controller/service registrations to map the app's shape",
          "Delete unused CSS classes",
          "Only read the HTML, ignore the JavaScript",
        ],
        correctIndex: 1,
        explanation:
          "Mapping modules/controllers/services first gives you the overall shape before diving into specifics.",
      },
      {
        id: "q2",
        prompt:
          "Why should you search the whole codebase before changing a shared service or widely-used $scope property?",
        choices: [
          "You shouldn't -- local changes are always safe",
          "Because legacy AngularJS code often uses shared state in more places than a first read suggests",
          "Search is only needed for CSS changes",
          "AngularJS automatically prevents unintended side effects",
        ],
        correctIndex: 1,
        explanation:
          "Shared services/scope properties can have far-reaching usage that isn't obvious from one file alone.",
      },
      {
        id: "q3",
        prompt:
          "If the view isn't updating after an async operation, what's a good first thing to check?",
        choices: [
          "CSS specificity",
          "Whether a $scope change happened outside AngularJS's awareness, needing $apply",
          "The module's dependency array",
          "Browser cache settings",
        ],
        correctIndex: 1,
        explanation:
          "A missing $apply around an externally-triggered $scope change is a very common cause of this exact symptom.",
      },
    ],
    takeaway:
      "Trace displayed data back to its real source, search for every usage before changing shared state, and check for missing $apply calls when the view doesn't update as expected.",
    summary:
      "A systematic approach (map modules/controllers, trace data to its source, check binding type, watch for missing $apply) makes maintaining unfamiliar AngularJS code far safer than guessing.",
    guidedOutputLab: {
      id: "angularjs-lab-reading-code",
      title: "Guided edit: Fixing a missing $apply after an external callback",
      language: "AngularJS",
      mode: "guided-editing",
      prompt:
        "Follow each step to see how a real 'view doesn't update' bug traces back to a missing $apply.",
      steps: [
        {
          description:
            "Start with the buggy version: a third-party library's callback updates $scope, but AngularJS doesn't know a digest is needed.",
          code: `// Simplified model of the bug: an "external" callback (like a
// third-party library, outside AngularJS's awareness) updates scope
// directly, with no way for a digest to know about it.
const scope = { status: "idle" };

function thirdPartyLibraryCallback(newStatus) {
  scope.status = newStatus; // AngularJS has no idea this happened
}

thirdPartyLibraryCallback("connected");
console.log("Scope value after external callback:", scope.status);
console.log("(In a real app, the TEMPLATE would still show 'idle' here, since no digest ran)");`,
          expectedOutput:
            "Scope value after external callback: connected\n(In a real app, the TEMPLATE would still show 'idle' here, since no digest ran)",
        },
        {
          description:
            "Fix it by wrapping the external callback's scope change in $apply, which both makes the change and triggers a digest.",
          code: `const scope = { status: "idle" };
let renderedTemplateValue = scope.status;

function digest() {
  renderedTemplateValue = scope.status; // models the template picking up the new value
}

function applyModel(fn) {
  fn();
  digest(); // $apply both runs the change AND triggers a digest
}

function thirdPartyLibraryCallback(newStatus) {
  applyModel(() => {
    scope.status = newStatus;
  });
}

thirdPartyLibraryCallback("connected");
console.log("Rendered template value:", renderedTemplateValue);`,
          expectedOutput: "Rendered template value: connected",
        },
      ],
      hints: [
        "The first version shows the real bug: the underlying value changes, but nothing tells AngularJS's template to re-check it.",
        "The second version's applyModel (modeling $scope.$apply) both makes the change and triggers the equivalent of a digest, so the 'rendered' value actually updates.",
      ],
    },
    nextLessonSlug: "angularjs-testing-legacy-code",
  },
  {
    id: "angularjs-testing-legacy-code",
    slug: "angularjs-testing-legacy-code",
    title: "Testing Legacy AngularJS Code",
    description: "The classic Karma/Jasmine testing setup used by AngularJS-era applications.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Recognize Jasmine's describe/it/expect testing structure in existing AngularJS test files",
      "Explain what AngularJS's $httpBackend mock is used for in tests",
      "Describe why an existing test suite is valuable context before modifying legacy behavior",
    ],
    skills: ["angularjs-testing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["angularjs testing", "karma jasmine", "$httpbackend"],
    explanation: `AngularJS-era applications were typically tested with **Karma** (a test runner that launches real browsers to execute tests) and **Jasmine** (the testing framework providing \`describe\`/\`it\`/\`expect\`). A typical test file structure: \`describe("MainController", () => { it("sets a default greeting", () => { /* ... */ expect(scope.greeting).toBe("Hello!"); }); });\` -- \`describe\` groups related tests, each \`it\` is one test case, and \`expect(...).toBe(...)\` (or similar matchers) makes the actual assertion.

AngularJS's built-in testing utilities include **\`$httpBackend\`**, a mock for \`$http\`/\`$resource\` calls in tests -- it lets a test declare an expected request (\`\$httpBackend.expectGET("/api/users").respond(200, [...])\`) without making a real network call, then verify the expected requests actually happened (\`\$httpBackend.flush()\`/\`\$httpBackend.verifyNoOutstandingRequest()\`).

Before modifying legacy AngularJS behavior, checking whether an **existing test file** already covers the code you're about to touch is genuinely valuable: passing tests give you a safety net for confirming your change didn't break existing behavior, and a test's \`describe\`/\`it\` names alone can clarify what a piece of legacy code was *originally intended* to do, which isn't always obvious from the implementation alone.`,
    commonMistakes: [
      "Skipping a check for existing tests before modifying legacy behavior, missing a ready-made safety net for the change.",
      "Confusing $httpBackend (a testing mock) with $http (the real service used in application code) -- they're related but serve different purposes.",
      "Assuming Jasmine's describe/it structure is unique to AngularJS -- it's a general JavaScript testing framework, also used well beyond AngularJS specifically.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does Jasmine's `describe` do?",
        choices: [
          "Runs a single assertion",
          "Groups related test cases together",
          "Mocks an HTTP request",
          "Declares an AngularJS module",
        ],
        correctIndex: 1,
        explanation: "describe groups related it() test cases under a shared label.",
      },
      {
        id: "q2",
        prompt: "What is $httpBackend used for?",
        choices: [
          "Making real network requests faster",
          "Mocking $http/$resource calls in tests, without real network calls",
          "Replacing $scope entirely",
          "Compiling AngularJS to a smaller bundle",
        ],
        correctIndex: 1,
        explanation: "$httpBackend is AngularJS's test-time mock for HTTP calls.",
      },
      {
        id: "q3",
        prompt: "Why is checking for existing tests valuable before modifying legacy code?",
        choices: [
          "It isn't valuable",
          "Passing tests give a safety net, and test names can clarify original intent",
          "Tests must always be deleted before any change",
          "Only for code with zero existing tests",
        ],
        correctIndex: 1,
        explanation:
          "Existing tests both protect against regressions and document original intent via their descriptions.",
      },
    ],
    takeaway:
      "Check for existing Jasmine tests (and $httpBackend-mocked HTTP expectations) before modifying legacy behavior -- they're a safety net and a source of intent.",
    summary:
      "AngularJS-era apps typically use Karma+Jasmine (describe/it/expect) for tests, with $httpBackend mocking HTTP calls; existing tests are valuable context before making changes.",
    guidedOutputLab: {
      id: "angularjs-lab-testing",
      title: "Predict: A Jasmine-style test's pass/fail result",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models Jasmine's describe/it/expect structure with plain functions, since a real test runner can't execute here. Predict which test passes and which fails.",
      steps: [
        {
          code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

function it(description, testFn) {
  try {
    testFn();
    console.log(\`PASS: \${description}\`);
  } catch (e) {
    console.log(\`FAIL: \${description} -- \${e.message}\`);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(\`expected \${expected} but got \${actual}\`);
      }
    },
  };
}

it("greets with the given name", () => {
  expect(greet("Ada")).toBe("Hello, Ada!");
});

it("greets with a different name (deliberately wrong expectation)", () => {
  expect(greet("Grace")).toBe("Hi, Grace!");
});`,
          expectedOutput:
            "PASS: greets with the given name\nFAIL: greets with a different name (deliberately wrong expectation) -- expected Hi, Grace! but got Hello, Grace!",
        },
      ],
      hints: [
        'The first test\'s expectation ("Hello, Ada!") matches what greet("Ada") actually returns.',
        'The second test\'s expectation ("Hi, Grace!") was deliberately written wrong -- greet() actually returns "Hello, Grace!", so the assertion throws and the test fails.',
      ],
    },
    nextLessonSlug: "angularjs-modernization-strategy",
  },
  {
    id: "angularjs-modernization-strategy",
    slug: "angularjs-modernization-strategy",
    title: "Modernization Strategy: Incremental Migration or Rewrite",
    description:
      "Weighing incremental migration (ngUpgrade) against a full rewrite, and how to decide.",
    trackSlug: "angularjs",
    courseSlug: "angularjs-legacy-maintenance",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Describe what ngUpgrade enables for incremental migration",
      "List factors that favor incremental migration versus a full rewrite",
      "Explain why 'stay on AngularJS indefinitely' is not a viable long-term option",
    ],
    skills: ["angularjs-migration"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "AngularJS official documentation (legacy)", url: "https://angularjs.org/" },
    ],
    keywords: ["ngupgrade", "angularjs migration", "legacy app modernization"],
    explanation: `Given AngularJS's end-of-life status (from this course's first lesson), every AngularJS application eventually needs a modernization plan. There are two broad strategies.

**Incremental migration**, historically enabled by tools like **\`ngUpgrade\`**, lets AngularJS and modern Angular run side-by-side in the same application during a transition period -- you migrate one feature/section at a time to the new framework while the rest of the app keeps running on AngularJS, rather than needing a single big-bang rewrite. This reduces risk (smaller, independently-testable changes) and lets a team keep shipping other features during the migration, at the cost of running two frameworks' overhead simultaneously for a while and needing genuine expertise in both to bridge them correctly.

A **full rewrite** starts fresh (in modern Angular, React, Vue, or another current framework), often becoming the more practical choice when the existing AngularJS codebase is small, when its architecture has degraded significantly over years of maintenance, or when the team wants to also change frameworks entirely (not just AngularJS-to-Angular) as part of the same effort.

Factors that typically favor **incremental migration**: a large, actively-used application where a full rewrite's multi-month/multi-year timeline is too risky; a team that needs to keep shipping features throughout. Factors that typically favor a **full rewrite**: a smaller application; a codebase whose AngularJS-era architecture itself needs fundamental rethinking, not just a framework swap; or a decision to move to a framework other than modern Angular, where ngUpgrade-style interop doesn't apply at all.

What's not a viable long-term option: staying on unmaintained, end-of-life AngularJS indefinitely -- security patches have stopped, and the ecosystem (browser compatibility, hiring developers familiar with it, third-party library maintenance) only gets harder over time.`,
    commonMistakes: [
      "Treating 'do nothing, stay on AngularJS' as a viable long-term strategy -- it isn't, given the end-of-life status covered at the start of this course.",
      "Assuming a full rewrite is always the right choice, without weighing the real risk/cost of a long rewrite for a large, actively-used application.",
      "Assuming ngUpgrade-style incremental migration applies when moving to a framework other than modern Angular -- that specific tool is Angular-to-Angular-specific interop.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does ngUpgrade enable?",
        choices: [
          "Automatically converting AngularJS code to Angular with no manual work",
          "Running AngularJS and modern Angular side-by-side during an incremental migration",
          "Upgrading AngularJS's own version number",
          "Nothing -- it's unrelated to migration",
        ],
        correctIndex: 1,
        explanation:
          "ngUpgrade lets both frameworks run together, enabling a gradual, section-by-section migration.",
      },
      {
        id: "q2",
        prompt: "Which factor typically favors a full rewrite over incremental migration?",
        choices: [
          "A very large, actively-used application",
          "A small application, or one whose architecture needs fundamental rethinking anyway",
          "A team that can't afford any downtime",
          "Needing to stay on AngularJS forever",
        ],
        correctIndex: 1,
        explanation:
          "Smaller apps or ones needing deeper architectural change often favor starting fresh.",
      },
      {
        id: "q3",
        prompt: "Is staying on AngularJS indefinitely a viable long-term strategy?",
        choices: [
          "Yes, if the app works today",
          "No -- it's end-of-life with no security patches and a shrinking ecosystem",
          "Yes, as long as no bugs are found",
          "AngularJS receives extended long-term support",
        ],
        correctIndex: 1,
        explanation:
          "AngularJS's end-of-life status makes 'do nothing indefinitely' an increasingly risky non-strategy, not a real option.",
      },
    ],
    takeaway:
      "Weigh incremental migration (ngUpgrade, lower risk for large active apps) against a full rewrite (often better for small or architecturally-troubled apps) -- but 'stay on AngularJS forever' isn't a real option.",
    summary:
      "ngUpgrade enables incremental AngularJS-to-Angular migration; a full rewrite often suits smaller or architecturally-troubled codebases; staying on end-of-life AngularJS indefinitely isn't viable.",
    guidedOutputLab: {
      id: "angularjs-lab-modernization",
      title: "Predict: A simple migration-strategy heuristic",
      language: "AngularJS",
      mode: "predict",
      prompt:
        "This models (as a simplified, illustrative heuristic, not a real formula) a rough decision function weighing app size and target framework. Predict its output for both inputs.",
      steps: [
        {
          code: `interface AppProfile {
  linesOfCode: number;
  targetIsModernAngular: boolean;
}

function suggestsIncrementalMigration(profile: AppProfile): boolean {
  return profile.linesOfCode > 50000 && profile.targetIsModernAngular;
}

const smallApp: AppProfile = { linesOfCode: 8000, targetIsModernAngular: true };
const largeAngularApp: AppProfile = { linesOfCode: 120000, targetIsModernAngular: true };
const largeReactTarget: AppProfile = { linesOfCode: 120000, targetIsModernAngular: false };

console.log(suggestsIncrementalMigration(smallApp));
console.log(suggestsIncrementalMigration(largeAngularApp));
console.log(suggestsIncrementalMigration(largeReactTarget));`,
          expectedOutput: "false\ntrue\nfalse",
        },
      ],
      hints: [
        "smallApp fails the size condition (8000 lines), so it returns false.",
        "largeAngularApp satisfies both conditions (large, and targeting modern Angular where ngUpgrade applies), returning true.",
        "largeReactTarget is large but not targeting modern Angular, so ngUpgrade-style migration doesn't apply -- false.",
      ],
    },
  },
];
