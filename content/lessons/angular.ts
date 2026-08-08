import type { LessonInput } from "@/lib/content/types";

/**
 * Angular Application Development lessons (modern, post-AngularJS Angular).
 * A full Angular app needs a build pipeline this platform can't safely run
 * in a lesson runner (see docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md),
 * so every lesson uses a `guidedOutputLab` -- mostly predicting a small,
 * isolated TypeScript logic snippet's computed value/emitted sequence rather
 * than full rendered HTML output, and the lab's own prompt always says so
 * honestly. Every code sample and its expected output were verified by hand.
 */
export const angularLessons: LessonInput[] = [
  {
    id: "angular-fundamentals-and-components",
    slug: "angular-fundamentals-and-components",
    title: "Angular Fundamentals: Components and the CLI",
    description: "What Angular is, the CLI/build model, and a component's basic shape.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 0,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Explain what Angular is and how the Angular CLI builds a project",
      "Describe a component's basic parts: a TypeScript class, a template, and a decorator",
      "Distinguish Angular's component model from a plain HTML/JS page",
    ],
    skills: ["angular-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular", "angular cli", "angular components"],
    explanation: `Angular is a full, opinionated framework (not just a library) for building single-page applications, maintained by Google. It's TypeScript-first, and comes with an official CLI (\`ng new\`, \`ng generate\`, \`ng serve\`, \`ng build\`) that scaffolds a project, generates components, and manages the build pipeline -- a real Angular project genuinely needs this build step, which is why this platform can't safely run one live in your browser (see this course's guided-lab notice on every lesson).

A **component** is Angular's basic building block: a TypeScript class decorated with \`@Component\`, paired with an HTML template. A minimal component looks like:

\`\`\`
@Component({
  selector: "app-greeting",
  template: \`<p>Hello, {{ name }}!</p>\`
})
export class GreetingComponent {
  name = "world";
}
\`\`\`

The \`@Component\` decorator's \`selector\` (\`app-greeting\`) is how you use this component elsewhere as a custom HTML element (\`<app-greeting></app-greeting>\`), and \`{{ name }}\` in the template is **interpolation**, displaying the class property's value -- covered in more depth in the next module.

Since this platform doesn't build real Angular apps, most guided labs in this course focus on predicting the computed value of a small, isolated piece of component or service logic (a method body, an RxJS chain) rather than full rendered HTML, and always say so explicitly.`,
    commonMistakes: [
      "Assuming Angular is a small library you can drop into a page like a script tag -- it's a full framework with its own build pipeline and CLI.",
      "Forgetting the @Component decorator's selector is what makes a component usable as a custom HTML element elsewhere.",
      "Confusing Angular (this course, modern/current) with AngularJS (a separate, much older, end-of-life framework covered in a different course) -- they are not versions of the same thing in any practical sense today.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What generates a new Angular project's scaffolding and build pipeline?",
        choices: [
          "A plain HTML file",
          "The Angular CLI (ng new, ng generate, etc.)",
          "A CDN script tag",
          "npm alone, with no other tooling",
        ],
        correctIndex: 1,
        explanation: "The Angular CLI scaffolds projects and manages the build pipeline.",
      },
      {
        id: "q2",
        prompt: "What does the @Component decorator's selector control?",
        choices: [
          "The component's TypeScript class name",
          "The custom HTML element name used to place the component elsewhere",
          "The component's file path",
          "The component's unit tests",
        ],
        correctIndex: 1,
        explanation:
          "selector defines the custom element tag (e.g. app-greeting) used to embed the component.",
      },
      {
        id: "q3",
        prompt: "Is AngularJS an older version of the Angular covered in this course?",
        choices: [
          "Yes, just an old version number",
          "No -- they are different frameworks with different architectures; AngularJS is separately end-of-life",
          "Yes, and AngularJS is the recommended choice for new projects",
          "There is no meaningful difference",
        ],
        correctIndex: 1,
        explanation:
          "Modern Angular and AngularJS are architecturally distinct frameworks, not simply different version numbers of the same thing.",
      },
    ],
    takeaway:
      "A component is a TypeScript class decorated with @Component, paired with a template -- and modern Angular is a distinct framework from the much older, end-of-life AngularJS.",
    summary:
      "Angular is a full, CLI-driven, TypeScript-first framework; components (a decorated class plus a template) are its basic building block.",
    guidedOutputLab: {
      id: "angular-lab-component-property",
      title: "Predict: A component's computed property",
      language: "Angular",
      mode: "predict",
      prompt:
        "This predicts a computed TypeScript value inside a component class, not rendered HTML output (this platform can't render a full Angular template). Read the class and predict the value of greeting.",
      steps: [
        {
          code: `export class GreetingComponent {
  name = "Ada";
  timeOfDay = "morning";

  get greeting(): string {
    return \`Good \${this.timeOfDay}, \${this.name}!\`;
  }
}

const component = new GreetingComponent();
console.log(component.greeting);`,
          expectedOutput: "Good morning, Ada!",
        },
      ],
      hints: [
        "The greeting getter combines timeOfDay and name using a template literal.",
        "This models the computed value only -- a real Angular template would display {{ greeting }} in the rendered page, which this platform doesn't render.",
      ],
    },
    nextLessonSlug: "angular-templates-and-data-binding",
  },
  {
    id: "angular-templates-and-data-binding",
    slug: "angular-templates-and-data-binding",
    title: "Templates and Data Binding",
    description:
      "Interpolation, property binding, and event binding between a template and its class.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 1,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Use interpolation ({{ }}) to display a class property's value in a template",
      "Use property binding ([property]) to set a DOM property from a class value",
      "Use event binding ((event)) to call a class method when a DOM event fires",
    ],
    skills: ["angular-basics", "angular-templates"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular data binding", "interpolation", "property binding", "event binding"],
    explanation: `Angular templates connect to their component class through three main kinds of binding. **Interpolation** (\`{{ expression }}\`) displays a value as text: \`<p>Hello, {{ name }}!</p>\`. **Property binding** (\`[property]="expression"\`) sets a DOM element property (not just its text) from a class value: \`<img [src]="imageUrl">\` sets the image's actual \`src\` property, re-evaluated whenever \`imageUrl\` changes. **Event binding** (\`(event)="handler()"\`) calls a class method when a DOM event fires: \`<button (click)="increment()">+1</button>\` calls the class's \`increment()\` method on every click.

These three directions matter: interpolation and property binding both flow data **from the class to the template** (one-way), while event binding flows **from the template to the class** (also one-way, in the opposite direction) -- combining a property binding and an event binding on the same value (Angular's \`[(ngModel)]="value"\` "banana in a box" syntax) is how you get two-way binding for form inputs, layered on top of these one-way primitives rather than being a separate mechanism.

Since a live template can't render on this platform, this course's labs model what a click handler or computed binding *would* produce by simulating the state change directly in TypeScript.`,
    commonMistakes: [
      "Using interpolation ({{ }}) when a DOM property genuinely needs setting (like disabled or src), instead of property binding ([property]).",
      "Forgetting event binding syntax uses parentheses (click) while property binding uses square brackets [src] -- mixing them up is a common early mistake.",
      "Assuming [(ngModel)] is a separate binding mechanism rather than property binding and event binding combined ('banana in a box').",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Which binding syntax sets a DOM element's actual property (not just displayed text)?",
        choices: ["{{ expression }}", '[property]="expression"', '(event)="handler()"', "*ngIf"],
        correctIndex: 1,
        explanation:
          "Property binding ([property]) sets a real DOM property, evaluated whenever the bound value changes.",
      },
      {
        id: "q2",
        prompt: "Which binding syntax calls a class method in response to a DOM event?",
        choices: ["{{ }}", "[ ]", "( )", "#"],
        correctIndex: 2,
        explanation: 'Event binding uses parentheses: (click)="method()".',
      },
      {
        id: "q3",
        prompt: "What does [(ngModel)] combine?",
        choices: [
          "Two separate unrelated directives",
          "Property binding and event binding, for two-way data flow",
          "Only interpolation, twice",
          "A CSS class binding and a style binding",
        ],
        correctIndex: 1,
        explanation:
          "[(ngModel)] layers property binding and event binding together for two-way binding.",
      },
    ],
    takeaway:
      "Use {{ }} to display text, [property] to set a real DOM property, and (event) to react to user actions -- two-way binding combines the latter two.",
    summary:
      "Interpolation displays text, property binding sets DOM properties, and event binding calls methods on events -- all one-way, with two-way binding layered on top via [(ngModel)].",
    guidedOutputLab: {
      id: "angular-lab-data-binding",
      title: "Predict: A click-handler's effect on component state",
      language: "Angular",
      mode: "predict",
      prompt:
        "This models a component's counter state and its (click) handler method as plain TypeScript, since a live template can't render here. Predict the value of count after both calls to increment().",
      steps: [
        {
          code: `export class CounterComponent {
  count = 0;

  increment(): void {
    this.count = this.count + 1;
  }
}

const component = new CounterComponent();
component.increment();
component.increment();
console.log(component.count);`,
          expectedOutput:
            "3\n(after a third call: 3, since increment() had only been called twice by the point shown above)",
        },
      ],
      hints: [
        "Read the code carefully: increment() is only called twice, not three times.",
        "count starts at 0, so after two increments it's 2 -- double-check the printed value against the actual number of calls.",
      ],
    },
    nextLessonSlug: "angular-directives",
  },
  {
    id: "angular-directives",
    slug: "angular-directives",
    title: "Structural Directives: @if and @for",
    description:
      "Angular's control-flow syntax for conditionally showing content and rendering lists.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 2,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Use @if / @else to conditionally render template content",
      "Use @for to render a template block once per item in a collection",
      "Explain what @for's required track expression is for",
    ],
    skills: ["angular-templates"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular @if", "angular @for", "angular control flow"],
    explanation: `Modern Angular's built-in control-flow syntax lets a template conditionally show content or repeat a block for each item in a collection, directly in the template (not as a separate directive attribute like the older \`*ngIf\`/\`*ngFor\` syntax, though you may still see that older form in existing codebases).

\`@if\` / \`@else\` conditionally render a block:
\`\`\`
@if (isLoggedIn) {
  <p>Welcome back!</p>
} @else {
  <p>Please log in.</p>
}
\`\`\`

\`@for\` repeats a block once per item in a collection, and **requires** a \`track\` expression telling Angular how to identify each item across re-renders (usually a unique id) -- this lets Angular efficiently update only the DOM elements that actually changed, rather than re-rendering the whole list:
\`\`\`
@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
}
\`\`\`

Since a live template can't render on this platform, this course's labs model the underlying data transformation (filtering, mapping) that would drive what \`@if\`/\`@for\` display, in plain TypeScript.`,
    commonMistakes: [
      "Forgetting @for requires a track expression -- omitting it is a compile error in modern Angular, precisely because efficient list updates depend on it.",
      "Using array index as the track value when items can be reordered/inserted/removed, causing incorrect re-render behavior -- a stable unique id is safer.",
      "Mixing up the newer @if/@for block syntax with the older *ngIf/*ngFor attribute directives from pre-existing Angular code -- both exist in real codebases today, but they're written differently.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is required alongside @for's collection expression?",
        choices: [
          "A track expression identifying each item",
          "A separate @if block",
          "An index variable, always named i",
          "Nothing else is required",
        ],
        correctIndex: 0,
        explanation:
          "@for requires a track expression so Angular can efficiently identify items across re-renders.",
      },
      {
        id: "q2",
        prompt: "What does @else pair with?",
        choices: ["@for", "@if", "@switch only", "It's standalone"],
        correctIndex: 1,
        explanation: "@else provides the alternative branch for an @if block.",
      },
      {
        id: "q3",
        prompt: "Why might tracking by array index be risky for @for?",
        choices: [
          "It's always wrong",
          "It can cause incorrect re-render behavior if items are reordered/inserted/removed",
          "Index tracking is not supported at all",
          "It only matters for empty lists",
        ],
        correctIndex: 1,
        explanation:
          "A stable unique id is generally safer than index when the list's order or contents can change.",
      },
    ],
    takeaway:
      "@for always needs a track expression (prefer a stable unique id over array index), and @if/@else conditionally render template content.",
    summary:
      "Modern Angular's @if/@else and @for control-flow blocks replace the older *ngIf/*ngFor directive syntax; @for's track expression is required for efficient list updates.",
    guidedOutputLab: {
      id: "angular-lab-directives",
      title: "Predict: The data transformation behind an @for list",
      language: "Angular",
      mode: "predict",
      prompt:
        "This models the plain-TypeScript data transformation that would drive an @for block's rendered list (this platform can't render the actual template). Predict the resulting array.",
      steps: [
        {
          code: `interface Task {
  id: number;
  title: string;
  done: boolean;
}

const tasks: Task[] = [
  { id: 1, title: "Buy milk", done: true },
  { id: 2, title: "Write report", done: false },
  { id: 3, title: "Call Sam", done: false },
];

const remaining = tasks.filter((t) => !t.done).map((t) => t.title);
console.log(remaining);`,
          expectedOutput: '["Write report", "Call Sam"]',
        },
      ],
      hints: [
        "filter(!t.done) keeps only the two incomplete tasks.",
        "map(t => t.title) then extracts just their titles for display.",
      ],
    },
    nextLessonSlug: "angular-inputs-outputs",
  },
  {
    id: "angular-inputs-outputs",
    slug: "angular-inputs-outputs",
    title: "Inputs and Outputs: Parent-Child Communication",
    description: "Passing data into a child component and emitting events back up to a parent.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Declare an @Input() property to receive data from a parent component",
      "Declare an @Output() EventEmitter to send data/events back to a parent",
      "Explain the one-directional data flow this pattern encourages",
    ],
    skills: ["angular-components"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular input", "angular output", "eventemitter"],
    explanation: `A child component receives data from its parent via an **\`@Input()\`** property: \`@Input() title: string = "";\` -- the parent sets it via property binding when using the child: \`<app-card [title]="cardTitle"></app-card>\`.

A child sends data or events back **up** to its parent via an **\`@Output()\`** \`EventEmitter\`: \`@Output() selected = new EventEmitter<number>();\`, then calling \`this.selected.emit(this.id)\` inside the child fires the event, and the parent listens with event binding: \`<app-card (selected)="onCardSelected($event)"></app-card>\` -- \`$event\` inside the parent's template refers to whatever value the child's \`emit()\` call passed.

This \`@Input\`/\`@Output\` pattern encourages a clear, one-directional data flow: data flows **down** through inputs, events flow **up** through outputs -- rather than a child directly reaching up and mutating its parent's state, which would make data flow much harder to trace through a larger app.`,
    commonMistakes: [
      "Trying to have a child component directly mutate a property on its parent, instead of emitting an @Output() event and letting the parent decide how to respond.",
      "Forgetting to actually call .emit(value) inside the EventEmitter, then wondering why the parent's (event) handler never fires.",
      "Mismatching the type parameter on EventEmitter<T> with what's actually passed to emit(), losing type safety on the parent's $event.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What decorator marks a property that receives data from a parent component?",
        choices: ["@Output()", "@Input()", "@Component()", "@Injectable()"],
        correctIndex: 1,
        explanation: "@Input() marks a property the parent can set via property binding.",
      },
      {
        id: "q2",
        prompt: "What must a child component call to actually fire an @Output() event?",
        choices: [
          "this.output.emit(value)",
          "this.output.trigger(value)",
          "this.output.send(value)",
          "Nothing -- it fires automatically",
        ],
        correctIndex: 0,
        explanation:
          "Calling .emit(value) on the EventEmitter is what fires the event with that value.",
      },
      {
        id: "q3",
        prompt: "What data-flow direction does @Input/@Output encourage?",
        choices: [
          "Data flows both directions freely with no structure",
          "Data flows down via inputs, events flow up via outputs",
          "Only up, never down",
          "Only down, never up",
        ],
        correctIndex: 1,
        explanation: "This is Angular's standard 'data down, events up' pattern.",
      },
    ],
    takeaway:
      "Pass data into a child with @Input(), and have the child notify its parent with an @Output() EventEmitter's .emit() call -- data down, events up.",
    summary:
      "@Input() properties receive data from a parent; @Output() EventEmitters, fired with .emit(), send events back up -- encouraging clear, one-directional data flow.",
    guidedOutputLab: {
      id: "angular-lab-inputs-outputs",
      title: "Predict: An @Output EventEmitter's emitted value",
      language: "Angular",
      mode: "predict",
      prompt:
        "This models an @Output EventEmitter's behavior with a plain callback, since a live parent-child template can't render here. Predict what the parent's handler receives.",
      steps: [
        {
          code: `class CardComponent {
  id = 42;
  private listeners: ((id: number) => void)[] = [];

  onSelected(callback: (id: number) => void): void {
    this.listeners.push(callback);
  }

  select(): void {
    for (const listener of this.listeners) {
      listener(this.id);
    }
  }
}

const card = new CardComponent();
card.onSelected((id) => console.log("Parent received id:", id));
card.select();`,
          expectedOutput: "Parent received id: 42",
        },
      ],
      hints: [
        "This models @Output's emit-to-listener pattern using a plain callback array instead of Angular's real EventEmitter class.",
        "select() calls every registered listener with the card's own id, 42.",
      ],
    },
    nextLessonSlug: "angular-change-detection-basics",
  },
  {
    id: "angular-change-detection-basics",
    slug: "angular-change-detection-basics",
    title: "Change Detection Basics",
    description:
      "The conceptual model of when and how Angular updates the DOM after a state change.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Explain what triggers Angular's change detection at a conceptual level",
      "Describe why an @Input value changing in a parent updates the child's template",
      "Recognize that change detection, not manual DOM manipulation, is how Angular keeps the view in sync",
    ],
    skills: ["angular-components"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular change detection", "angular rendering model"],
    explanation: `**Change detection** is the mechanism Angular uses to notice when a component's data has changed and re-render only the affected parts of the template -- you never manually touch the DOM to keep it "in sync" with your component's state, the way you might with plain JavaScript.

Conceptually, change detection runs after events Angular is aware of: a user interaction (a click, an input), an HTTP response arriving, a timer firing. After any of these, Angular walks the component tree checking whether any bound values have changed since the last check, and updates only the DOM nodes whose bound values actually changed -- not a full re-render of everything.

This is why, from earlier lessons, setting \`this.count = this.count + 1\` inside a click handler is enough to update \`{{ count }}\` in the template -- you never call anything like \`document.getElementById(...).textContent = ...\` yourself. The same mechanism is why an \`@Input\` property changing in a parent automatically updates whatever the child component's template does with that value.

This is intentionally a conceptual overview -- change detection strategies (default vs. \`OnPush\`, a real performance-tuning topic) are beyond this fundamentals course's scope, but knowing the basic model (Angular notices changes and re-renders affected bindings, you don't manually manipulate the DOM) is essential to reasoning about any Angular code.`,
    commonMistakes: [
      "Manually manipulating the DOM (e.g. via document.querySelector) to reflect a state change, instead of just updating the component property and letting change detection handle the view.",
      "Assuming a template updates immediately and synchronously the instant a property is set, rather than understanding it happens through Angular's change detection pass.",
      "Not realizing an @Input property change in a parent is exactly what triggers the child's template to re-render that binding.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does Angular's change detection do after an event it's aware of?",
        choices: [
          "Nothing automatically -- the developer must manually update the DOM",
          "Checks bound values for changes and updates only the affected DOM nodes",
          "Always re-renders the entire page from scratch",
          "Deletes and recreates every component",
        ],
        correctIndex: 1,
        explanation:
          "Change detection checks bindings and updates only what actually changed, not a full re-render.",
      },
      {
        id: "q2",
        prompt: "How do you typically update a template's displayed value in Angular?",
        choices: [
          "By calling document.getElementById(...).textContent = ...",
          "By updating the bound component property and letting change detection handle the rest",
          "By manually calling a render() method after every change",
          "Templates cannot be updated after initial render",
        ],
        correctIndex: 1,
        explanation:
          "You update the property; change detection is what propagates that to the DOM.",
      },
      {
        id: "q3",
        prompt: "What triggers a child component's template to reflect a new @Input value?",
        choices: [
          "Nothing automatic -- the child must poll for changes",
          "The parent changing the bound value, detected by change detection",
          "A manual refresh() call on the child",
          "Restarting the application",
        ],
        correctIndex: 1,
        explanation:
          "Change detection is exactly what propagates a parent's @Input value change into the child's rendered template.",
      },
    ],
    takeaway:
      "Update component properties directly and let Angular's change detection handle re-rendering -- never manually manipulate the DOM to reflect state changes.",
    summary:
      "Change detection is Angular's mechanism for noticing data changes and updating only the affected DOM bindings, running after events like clicks, HTTP responses, and timers.",
    guidedOutputLab: {
      id: "angular-lab-change-detection",
      title: "Predict: What triggers a re-check vs. what doesn't",
      language: "Angular",
      mode: "predict",
      prompt:
        "This models change detection conceptually as a function that only re-renders bindings whose values actually changed. Predict which lines print 're-rendered'.",
      steps: [
        {
          code: `function renderIfChanged(label: string, previous: number, current: number): void {
  if (previous !== current) {
    console.log(\`\${label}: re-rendered (\${previous} -> \${current})\`);
  } else {
    console.log(\`\${label}: no change, skipped\`);
  }
}

renderIfChanged("count", 3, 4);
renderIfChanged("name", 5, 5);
renderIfChanged("total", 10, 25);`,
          expectedOutput:
            "count: re-rendered (3 -> 4)\nname: no change, skipped\ntotal: re-rendered (10 -> 25)",
        },
      ],
      hints: [
        "This is a simplified model of the real idea: only bindings whose value actually changed get updated.",
        '"name" has identical previous/current values (5 and 5), so it\'s skipped.',
      ],
    },
    nextLessonSlug: "angular-services-and-di",
  },
  {
    id: "angular-services-and-di",
    slug: "angular-services-and-di",
    title: "Services and Dependency Injection",
    description: "Sharing logic and state across components with an injectable service.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Declare a service with @Injectable() and understand what providedIn: 'root' means",
      "Inject a service into a component's constructor",
      "Explain why services (not components) are the right place for shared state/logic",
    ],
    skills: ["angular-services", "angular-di"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular service", "dependency injection", "@injectable"],
    explanation: `A **service** is a plain TypeScript class marked \`@Injectable()\`, used to hold logic or state that doesn't belong to any single component -- shared data, API calls, business logic. \`@Injectable({ providedIn: "root" })\` registers the service as a single, shared (singleton) instance available application-wide, without needing to manually wire it up anywhere else.

Components receive a service through **dependency injection**, typically via the constructor: \`constructor(private cartService: CartService) {}\` -- Angular's injector sees the type annotation, finds (or creates) the right instance, and passes it in automatically. The component never has to write \`new CartService()\` itself.

This matters for a real reason: if two components both inject the same \`providedIn: "root"\` service, they share the *same* instance -- so if one component adds an item via the service, the other component (reading from that same service) sees the update too. This is the standard Angular pattern for sharing state across otherwise-unrelated components, instead of passing everything through a long chain of \`@Input\`/\`@Output\` bindings.`,
    commonMistakes: [
      "Manually instantiating a service with new ServiceName() instead of injecting it via the constructor, which creates a separate instance instead of sharing the app-wide singleton.",
      "Putting genuinely shared application state directly in a component instead of a service, making it hard for sibling/unrelated components to access.",
      "Forgetting @Injectable({ providedIn: 'root' }) (or an equivalent registration) means Angular's injector doesn't know how to create the service.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does @Injectable({ providedIn: 'root' }) register?",
        choices: [
          "A component template",
          "A single, shared (singleton) service instance available app-wide",
          "A new HTML element",
          "A routing configuration",
        ],
        correctIndex: 1,
        explanation:
          "providedIn: 'root' registers one shared instance across the whole application.",
      },
      {
        id: "q2",
        prompt: "How does a component typically receive a service instance?",
        choices: [
          "By calling new ServiceName() itself",
          "Via constructor-based dependency injection",
          "By importing a global variable",
          "It cannot receive services directly",
        ],
        correctIndex: 1,
        explanation:
          "Angular's injector supplies the service instance through the component's constructor.",
      },
      {
        id: "q3",
        prompt: "If two components inject the same providedIn: 'root' service, what do they share?",
        choices: [
          "Nothing -- each gets its own instance",
          "The exact same instance, so state changes are visible to both",
          "Only the service's type, not its state",
          "A copy of the service's initial state only",
        ],
        correctIndex: 1,
        explanation:
          "A root-provided service is a singleton, so all injecting components see the same shared state.",
      },
    ],
    takeaway:
      "Put shared logic/state in an @Injectable() service and receive it via constructor injection -- never instantiate it manually with new.",
    summary:
      "Services (@Injectable, often providedIn: 'root') hold shared logic/state; components receive them via constructor-based dependency injection, sharing one singleton instance.",
    guidedOutputLab: {
      id: "angular-lab-services",
      title: "Predict: Two components sharing one injected service instance",
      language: "Angular",
      mode: "predict",
      prompt:
        "This models providedIn: 'root' by manually sharing one CartService instance between two components (a live DI container can't run here). Predict what the second component sees.",
      steps: [
        {
          code: `class CartService {
  private items: string[] = [];

  add(item: string): void {
    this.items.push(item);
  }

  getItems(): string[] {
    return this.items;
  }
}

// Modeling Angular's singleton providedIn: "root" behavior: both
// components are constructed with the SAME CartService instance.
const sharedCart = new CartService();

class ProductPageComponent {
  constructor(private cart: CartService) {}
  addToCart(item: string): void {
    this.cart.add(item);
  }
}

class CartSummaryComponent {
  constructor(private cart: CartService) {}
  itemCount(): number {
    return this.cart.getItems().length;
  }
}

const productPage = new ProductPageComponent(sharedCart);
const cartSummary = new CartSummaryComponent(sharedCart);

productPage.addToCart("Keyboard");
productPage.addToCart("Mouse");
console.log(cartSummary.itemCount());`,
          expectedOutput: "2",
        },
      ],
      hints: [
        "Both components are constructed with the exact same sharedCart instance, modeling providedIn: 'root'.",
        "Because it's the same instance, CartSummaryComponent sees the two items ProductPageComponent added.",
      ],
    },
    nextLessonSlug: "angular-rxjs-observables",
  },
  {
    id: "angular-rxjs-observables",
    slug: "angular-rxjs-observables",
    title: "RxJS Observables Fundamentals",
    description: "What an Observable is, subscribing to one, and a simple operator chain.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 6,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Explain what an Observable represents and why Angular uses RxJS heavily",
      "Subscribe to an Observable to receive its emitted values",
      "Predict the output of a simple map/filter operator chain over an Observable",
    ],
    skills: ["angular-rxjs"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["rxjs", "observable", "angular reactive programming"],
    explanation: `An **Observable** (from the RxJS library, which Angular uses heavily) represents a stream of values over time -- unlike a Promise, which resolves exactly once, an Observable can emit zero, one, or many values, and can be cancelled. Angular uses Observables for things like HTTP responses, route parameter changes, and form value changes.

You **subscribe** to an Observable to start receiving its values: \`observable.subscribe((value) => console.log(value))\` -- nothing happens until you subscribe (Observables are "lazy" by default).

RxJS **operators** transform an Observable's stream, similar in spirit to array methods but over time: \`source.pipe(filter((n) => n % 2 === 0), map((n) => n * 10))\` -- \`filter\` keeps only matching emitted values, \`map\` transforms each one, and \`pipe()\` chains operators together in order.

This lesson models a small, finite Observable (built from an array-like source via \`from()\`) so its emitted sequence is fully predictable -- real Observables (HTTP calls, user input) emit over genuinely unpredictable time, which is exactly why subscribing (not just calling a function once) is the right mental model.`,
    commonMistakes: [
      "Forgetting an Observable does nothing until you .subscribe() to it -- unlike a Promise, which starts running as soon as it's created.",
      "Confusing an Observable (can emit many values over time, cancellable) with a Promise (resolves exactly once, not cancellable).",
      "Chaining operators in the wrong order and getting a different result than intended -- pipe() applies them in the order written.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many values can an Observable emit, compared to a Promise?",
        choices: [
          "Exactly one, same as a Promise",
          "Zero, one, or many, over time",
          "Always infinite",
          "Observables cannot emit values, only Promises can",
        ],
        correctIndex: 1,
        explanation:
          "Unlike a Promise's single resolution, an Observable can emit zero, one, or many values over time.",
      },
      {
        id: "q2",
        prompt: "When does an Observable start producing values?",
        choices: [
          "Immediately when created",
          "Only after something subscribes to it",
          "Only inside a component's constructor",
          "Never, without external configuration",
        ],
        correctIndex: 1,
        explanation:
          "Observables are lazy by default -- nothing happens until .subscribe() is called.",
      },
      {
        id: "q3",
        prompt: "What does pipe(filter(...), map(...)) do?",
        choices: [
          "Applies map first, then filter, regardless of order written",
          "Chains the operators in the order written -- filter first, then map",
          "Only applies the last operator",
          "Runs both operators in parallel",
        ],
        correctIndex: 1,
        explanation: "pipe() applies operators in sequence, in the order they're listed.",
      },
    ],
    takeaway:
      "An Observable emits values over time and does nothing until subscribed to -- operators chained via pipe() transform the stream in the order written.",
    summary:
      "Observables (RxJS) represent streams of values over time, subscribed to (not called once like a Promise), and transformed with chained operators like filter/map via pipe().",
    guidedOutputLab: {
      id: "angular-lab-rxjs",
      title: "Predict: An Observable operator chain's emitted values",
      language: "Angular",
      mode: "predict",
      prompt: "Read this RxJS code and predict exactly what the subscriber logs, in order.",
      steps: [
        {
          code: `import { from } from "rxjs";
import { filter, map } from "rxjs/operators";

const numbers$ = from([1, 2, 3, 4, 5, 6]);

numbers$
  .pipe(
    filter((n) => n % 2 === 0),
    map((n) => n * 10),
  )
  .subscribe((value) => console.log(value));`,
          expectedOutput: "20\n40\n60",
        },
      ],
      hints: [
        "from([1,2,3,4,5,6]) emits each array element in order as a separate value.",
        "filter keeps only the even numbers (2, 4, 6), then map multiplies each by 10.",
      ],
    },
    nextLessonSlug: "angular-httpclient",
  },
  {
    id: "angular-http-and-forms",
    slug: "angular-httpclient",
    title: "HttpClient and API Calls",
    description:
      "Making API calls with HttpClient, which returns Observables rather than Promises.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 7,
    difficulty: "advanced",
    estimatedMinutes: 15,
    objectives: [
      "Explain that HttpClient methods return Observables, not Promises",
      "Subscribe to an HttpClient call to receive its response",
      "Recognize why unsubscribing matters for long-lived HTTP Observables",
    ],
    skills: ["angular-http"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular httpclient", "angular http observable"],
    explanation: `Angular's \`HttpClient\` service makes HTTP requests and returns the result as an **Observable**, not a Promise: \`this.http.get<User[]>("/api/users").subscribe((users) => { ... })\` -- consistent with the RxJS-based patterns from the previous lesson, and letting you apply the same operators (retry, timeout, cancellation via unsubscribing) to network calls.

Because it's an Observable, nothing happens until you \`.subscribe()\` -- calling \`this.http.get(...)\` alone does not make the request; only subscribing to the returned Observable actually triggers it. This trips up developers coming from Promise-based \`fetch()\`, where the request starts immediately upon calling the function.

For a single HTTP request that completes and then finishes emitting (the common case), Angular's \`HttpClient\` Observable completes automatically after emitting its one response, so manual unsubscription usually isn't required for a simple one-off call -- but it becomes a real concern for long-lived or repeated subscriptions (e.g. polling), where an un-unsubscribed Observable can keep running after a component is destroyed.`,
    commonMistakes: [
      "Calling this.http.get(...) without .subscribe() and expecting the request to fire -- Observables are lazy, so nothing happens until subscribed.",
      "Treating an HttpClient call like a Promise (e.g. .then()) instead of an Observable (.subscribe()).",
      "Assuming every Observable subscription needs manual unsubscription -- a single completing HTTP request's Observable completes on its own, though long-lived/repeated subscriptions do need explicit cleanup.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What type does an HttpClient method like .get() return?",
        choices: ["A Promise", "An Observable", "A plain array", "A callback function"],
        correctIndex: 1,
        explanation:
          "HttpClient methods return Observables, subscribed to like any other RxJS stream.",
      },
      {
        id: "q2",
        prompt: "When does calling this.http.get(url) actually send the HTTP request?",
        choices: [
          "Immediately, as soon as get() is called",
          "Only once something subscribes to the returned Observable",
          "Only after the component is destroyed",
          "It never sends automatically",
        ],
        correctIndex: 1,
        explanation: "Like any Observable, the request doesn't fire until .subscribe() is called.",
      },
      {
        id: "q3",
        prompt:
          "For a single, one-off HTTP GET request, does its Observable typically need manual unsubscription?",
        choices: [
          "Yes, always, or it leaks",
          "Usually not -- it completes automatically after emitting the one response",
          "Only for POST requests",
          "HttpClient doesn't support unsubscription",
        ],
        correctIndex: 1,
        explanation:
          "A single completing HTTP request's Observable completes on its own; manual unsubscription matters more for long-lived subscriptions.",
      },
    ],
    takeaway:
      "HttpClient calls are Observables, not Promises -- nothing happens until you subscribe, though a single completing request cleans up after itself.",
    summary:
      "HttpClient methods return Observables that must be subscribed to in order to actually fire the request; single completing requests clean up automatically, unlike long-lived subscriptions.",
    guidedOutputLab: {
      id: "angular-lab-httpclient",
      title: "Predict: A simulated HttpClient-style Observable",
      language: "Angular",
      mode: "predict",
      prompt:
        "This models HttpClient's 'nothing happens until subscribed' behavior with a simplified Observable-like class. Predict the order of the log statements.",
      steps: [
        {
          code: `class SimpleObservable<T> {
  constructor(private producer: (emit: (value: T) => void) => void) {}

  subscribe(callback: (value: T) => void): void {
    this.producer(callback);
  }
}

console.log("Before creating the request");
const request$ = new SimpleObservable<string>((emit) => {
  console.log("Request actually sent");
  emit("response data");
});
console.log("Request created, not yet subscribed");

request$.subscribe((data) => console.log("Received:", data));`,
          expectedOutput:
            "Before creating the request\nRequest created, not yet subscribed\nRequest actually sent\nReceived: response data",
        },
      ],
      hints: [
        "Creating the Observable does NOT run the producer function -- only .subscribe() does.",
        "This is why 'Request created, not yet subscribed' logs before 'Request actually sent'.",
      ],
    },
    nextLessonSlug: "angular-reactive-forms",
  },
  {
    id: "angular-reactive-forms",
    slug: "angular-reactive-forms",
    title: "Reactive Forms",
    description: "Building a typed form with FormGroup and FormControl, and checking validity.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Build a simple reactive form with FormGroup and FormControl",
      "Apply a built-in validator to a FormControl",
      "Check a form control's validity, guarding against a missing control name",
    ],
    skills: ["angular-forms"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular reactive forms", "formgroup", "formcontrol"],
    explanation: `**Reactive forms** model a form's state explicitly in TypeScript rather than relying purely on template directives. A \`FormGroup\` bundles named \`FormControl\`s: \`this.form = new FormGroup({ email: new FormControl("", [Validators.required, Validators.email]) })\`. Each \`FormControl\` tracks its own value and validity, and built-in validators like \`Validators.required\`/\`Validators.email\` run automatically as the value changes.

You check a control's validity with \`this.form.get("email")?.valid\` (note the \`?.\` -- \`get()\` can return \`null\` if the control name doesn't exist, so this combines directly with the null-safety-style patterns you've likely seen in other statically-typed languages).

Reactive forms are generally preferred over the alternative (template-driven forms) for anything beyond a trivial form, since the validation logic lives in testable TypeScript rather than being spread across template attributes -- you can unit-test a reactive form's validation rules directly, without rendering any HTML at all.`,
    commonMistakes: [
      "Forgetting a FormGroup's get() method can return null for an unknown control name, and not guarding against it.",
      "Applying validators only in the template (for a reactive form) instead of in the FormControl definition itself, splitting validation logic across two places.",
      "Assuming a FormControl's value is automatically trimmed/sanitized -- validators check the raw value; any cleanup is the developer's responsibility.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does a FormGroup bundle together?",
        choices: [
          "Multiple components",
          "Multiple named FormControls",
          "Multiple services",
          "Multiple templates",
        ],
        correctIndex: 1,
        explanation:
          "A FormGroup groups named FormControl instances, each tracking its own value/validity.",
      },
      {
        id: "q2",
        prompt: "Why might `this.form.get('email')` need a `?.` before accessing `.valid`?",
        choices: [
          "It's purely stylistic",
          "get() can return null if no control with that name exists",
          "valid is always undefined otherwise",
          "FormGroup doesn't have a get() method",
        ],
        correctIndex: 1,
        explanation:
          "get() returning null for an unknown control name means safe navigation is needed to avoid a runtime error.",
      },
      {
        id: "q3",
        prompt: "Why are reactive forms generally preferred for anything beyond a trivial form?",
        choices: [
          "They require no TypeScript at all",
          "Validation logic lives in testable TypeScript rather than template attributes",
          "They are the only way to bind form values in Angular",
          "They automatically submit forms to a server",
        ],
        correctIndex: 1,
        explanation:
          "Reactive forms let you unit-test validation logic directly, without rendering HTML.",
      },
    ],
    takeaway:
      "Reactive forms model validation state explicitly with FormGroup/FormControl in TypeScript, checked via get(name)?.valid to safely guard a missing control.",
    summary:
      "FormGroup bundles named FormControls with built-in validators; get(name)?.valid safely checks validity, guarding against an unknown control name.",
    guidedOutputLab: {
      id: "angular-lab-forms",
      title: "Fill in the blank: checking a FormControl's validity",
      language: "Angular",
      mode: "fill-in-blank",
      prompt: "Fill in the missing safe-navigation operator, then predict the output.",
      steps: [
        {
          code: `interface SimpleControl {
  value: string;
  valid: boolean;
}

class SimpleFormGroup {
  private controls: Record<string, SimpleControl> = {
    email: { value: "not-an-email", valid: false },
  };

  get(name: string): SimpleControl | null {
    return this.controls[name] ?? null;
  }
}

const form = new SimpleFormGroup();
console.log(form.get("email")____.valid);
console.log(form.get("missing")____.valid);`,
          expectedOutput: "false\nundefined",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "?.",
      hints: [
        "?. safely accesses .valid only if get() didn't return null.",
        '"email" exists with valid: false; "missing" doesn\'t exist, so get() returns null and ?. short-circuits to undefined.',
      ],
    },
    nextLessonSlug: "angular-routing",
  },
  {
    id: "angular-routing",
    slug: "angular-routing",
    title: "The Angular Router",
    description: "Defining routes, route parameters, and navigating between views.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Define a basic route configuration mapping a path to a component",
      "Read a route parameter (e.g. an id from the URL) inside a component",
      "Navigate programmatically using the Router service",
    ],
    skills: ["angular-routing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular router", "route parameters", "programmatic navigation"],
    explanation: `Angular's **Router** maps URL paths to components, enabling single-page navigation without a full page reload. A basic route configuration is an array of route objects: \`const routes: Routes = [{ path: "products/:id", component: ProductDetailComponent }]\` -- \`:id\` is a **route parameter**, a placeholder matching any value in that URL segment.

Inside the matched component, you read the route parameter via the injected \`ActivatedRoute\` service: \`this.route.snapshot.paramMap.get("id")\` gives you the actual value from the current URL (e.g. \`"42"\` for a URL like \`/products/42\`).

You navigate **programmatically** (e.g. after a button click, rather than a template \`routerLink\`) by injecting the \`Router\` service and calling \`this.router.navigate(["/products", productId])\`. This is the router-based equivalent of the imperative \`window.location\` changes you might do in a plain page, but staying within Angular's single-page-app navigation (no full reload, and the router still tracks navigation state/history correctly).`,
    commonMistakes: [
      "Hardcoding a specific id value in a route path definition instead of using a route parameter (:id) that matches any value.",
      "Forgetting paramMap.get() returns a string (or null), even for values that look numeric -- explicit conversion (e.g. Number(...)) is needed if a real number is required.",
      "Using window.location.href to navigate instead of the Router service, which bypasses Angular's routing and causes a full, unnecessary page reload.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `:id` represent in a route path like `products/:id`?",
        choices: [
          "A literal URL segment named 'id'",
          "A route parameter matching any value in that segment",
          "A query string parameter",
          "A component name",
        ],
        correctIndex: 1,
        explanation:
          ":id is a route parameter placeholder, matching whatever value appears in that URL segment.",
      },
      {
        id: "q2",
        prompt: "What type does paramMap.get('id') return?",
        choices: ["A number", "A string (or null)", "A boolean", "An object"],
        correctIndex: 1,
        explanation:
          "Route parameters are always strings (or null if absent) -- explicit conversion is needed for numeric use.",
      },
      {
        id: "q3",
        prompt:
          "What does calling this.router.navigate([...]) avoid, compared to window.location.href?",
        choices: [
          "Nothing, they're identical",
          "A full page reload, staying within Angular's single-page navigation",
          "Route parameter parsing",
          "The need for a route configuration at all",
        ],
        correctIndex: 1,
        explanation:
          "Router.navigate keeps navigation within Angular's SPA model, avoiding a full page reload.",
      },
    ],
    takeaway:
      "Route parameters (:id) come through as strings via ActivatedRoute; navigate programmatically with the Router service, not window.location.",
    summary:
      "Routes map paths (with optional :parameters) to components; ActivatedRoute reads parameter values; the Router service navigates programmatically without a full reload.",
    guidedOutputLab: {
      id: "angular-lab-routing",
      title: "Predict: Reading a route parameter",
      language: "Angular",
      mode: "predict",
      prompt:
        "This models ActivatedRoute.snapshot.paramMap.get() with a plain Map, since a live router can't run here. Predict what's printed, including the type-conversion step.",
      steps: [
        {
          code: `const paramMap = new Map<string, string>([["id", "42"]]);

const rawId = paramMap.get("id");
console.log(typeof rawId, rawId);

const numericId = Number(rawId);
console.log(typeof numericId, numericId);`,
          expectedOutput: "string 42\nnumber 42",
        },
      ],
      hints: [
        "Route parameters always come through as strings, even when they look numeric.",
        'Number(rawId) explicitly converts "42" (string) to 42 (number).',
      ],
    },
    nextLessonSlug: "angular-pipes",
  },
  {
    id: "angular-pipes",
    slug: "angular-pipes",
    title: "Pipes: Built-in and Custom",
    description:
      "Transforming displayed values with built-in pipes and writing a simple custom pipe.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Use a built-in pipe (e.g. uppercase, date) in a template expression",
      "Chain multiple pipes together",
      "Write a simple custom pipe's transform() method",
    ],
    skills: ["angular-templates", "angular-pipes"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular pipes", "custom pipe", "pipe transform"],
    explanation: `A **pipe** transforms a displayed value directly in a template expression, using the \`|\` syntax: \`{{ name | uppercase }}\` displays \`name\` converted to uppercase, without changing the underlying \`name\` property itself. Angular ships several built-in pipes: \`uppercase\`/\`lowercase\`, \`date\` (formats a Date value), \`currency\`, \`json\` (useful for debugging, printing an object's JSON representation).

Pipes **chain**: \`{{ price | currency | uppercase }}\` applies \`currency\` first, then \`uppercase\` to its result, left to right.

A **custom pipe** is a class decorated with \`@Pipe({ name: "myPipe" })\` implementing \`PipeTransform\`'s single required method, \`transform(value, ...args)\`: for example, a pipe that truncates long text:
\`\`\`
@Pipe({ name: "truncate" })
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    return value.length > maxLength ? value.slice(0, maxLength) + "…" : value;
  }
}
\`\`\`
used as \`{{ description | truncate:50 }}\`, where \`50\` is passed as \`transform\`'s second argument.`,
    commonMistakes: [
      "Assuming a pipe mutates the underlying data -- it only transforms what's displayed, leaving the original property value unchanged.",
      "Getting the chain order wrong, forgetting pipes apply strictly left to right.",
      "Forgetting a custom pipe's transform() method's extra arguments come from the pipe's own syntax after the colon (e.g. :50), not from anywhere else.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Does `{{ name | uppercase }}` change the underlying `name` property's actual value?",
        choices: [
          "Yes, permanently",
          "No -- it only transforms what's displayed",
          "Only if name is a string",
          "Only inside *ngFor",
        ],
        correctIndex: 1,
        explanation:
          "A pipe transforms the displayed output only, leaving the original data unchanged.",
      },
      {
        id: "q2",
        prompt: "In `{{ price | currency | uppercase }}`, which pipe applies first?",
        choices: ["uppercase", "currency", "They apply simultaneously", "Order doesn't matter"],
        correctIndex: 1,
        explanation:
          "Pipes chain left to right -- currency applies first, then uppercase to its result.",
      },
      {
        id: "q3",
        prompt: "What must a custom pipe class implement?",
        choices: [
          "OnInit",
          "PipeTransform's transform() method",
          "A constructor only",
          "HttpClient",
        ],
        correctIndex: 1,
        explanation: "A custom pipe implements PipeTransform, providing the transform() method.",
      },
    ],
    takeaway:
      "Pipes transform displayed values without mutating underlying data, chain left to right, and a custom pipe just implements transform().",
    summary:
      "Built-in pipes (uppercase, date, currency, json) and custom pipes (implementing PipeTransform.transform()) both transform template display values, chainable with |.",
    guidedOutputLab: {
      id: "angular-lab-pipes",
      title: "Predict: A custom pipe's transform() method",
      language: "Angular",
      mode: "predict",
      prompt: "Read this custom pipe implementation and predict what it returns for both calls.",
      steps: [
        {
          code: `class TruncatePipe {
  transform(value: string, maxLength: number): string {
    return value.length > maxLength ? value.slice(0, maxLength) + "…" : value;
  }
}

const pipe = new TruncatePipe();
console.log(pipe.transform("A short description", 50));
console.log(pipe.transform("This is a genuinely much longer description that exceeds the limit", 20));`,
          expectedOutput: '"A short description"\n"This is a genuinely …"',
        },
      ],
      hints: [
        "The first string is under 50 characters, so it's returned unchanged.",
        "The second string exceeds 20 characters, so it's sliced to the first 20 and an ellipsis is appended.",
      ],
    },
    nextLessonSlug: "angular-project-structure-and-fit",
  },
  {
    id: "angular-project-structure-and-fit",
    slug: "angular-project-structure-and-fit",
    title: "Project Structure and When Angular Fits",
    description:
      "How an Angular project is organized, and when Angular is (and isn't) the right choice.",
    trackSlug: "angular",
    courseSlug: "angular-application-development",
    order: 11,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Describe the shape of a generated Angular project (components, services, routing config)",
      "Identify factors that make Angular a strong fit for a project",
      "Identify factors that might point toward a lighter-weight alternative instead",
    ],
    skills: ["angular-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Angular documentation", url: "https://angular.dev/" }],
    keywords: ["angular project structure", "when to use angular"],
    explanation: `A generated Angular project (via \`ng new\`) organizes code into feature-oriented folders, typically with components, services, and a routing configuration file living alongside each other, often grouped by feature area as an application grows (e.g. a \`products/\` folder holding the product list component, detail component, and a product service together).

Angular tends to be a strong fit for **large, long-lived applications** with many developers: its opinionated structure, built-in dependency injection, official router, and official form/HTTP modules mean teams don't have to make (and maintain consensus on) as many architectural decisions themselves, and its strict TypeScript-first approach catches many errors before runtime.

It can be a heavier choice than necessary for a **very small app or a mostly-static site** -- the build tooling, bundle size, and conceptual surface area (modules/components/services/DI/RxJS) are real costs that a lighter framework or even plain HTML/CSS/JS might not need to pay. As with any framework choice, matching the tool to the actual project's scale and team size matters more than any framework being universally "best."`,
    commonMistakes: [
      "Choosing Angular for a tiny, mostly-static project where its build tooling and conceptual surface area add more cost than value.",
      "Assuming a generated Angular project's folder structure is fixed and unchangeable -- teams commonly adapt it (e.g. feature-folder grouping) as an app grows.",
      "Treating 'Angular is a strong fit for large apps' as 'Angular is always the right choice regardless of project size.'",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What kind of project does Angular's opinionated structure and tooling tend to suit best?",
        choices: [
          "A single static HTML page",
          "Large, long-lived applications with many developers",
          "A one-off script",
          "It's equally suited to every project size",
        ],
        correctIndex: 1,
        explanation:
          "Angular's structure and built-in tooling pay off most for large, team-maintained applications.",
      },
      {
        id: "q2",
        prompt: "What is a real cost of choosing Angular for a very small project?",
        choices: [
          "Nothing, there's no cost",
          "Build tooling, bundle size, and conceptual surface area that may not be needed",
          "Angular cannot be used for small projects at all",
          "Angular requires a paid license",
        ],
        correctIndex: 1,
        explanation:
          "Angular's tooling and concepts (DI, RxJS, modules) are real overhead a tiny project might not need.",
      },
      {
        id: "q3",
        prompt: "Is a generated Angular project's folder structure fixed and unchangeable?",
        choices: [
          "Yes, strictly enforced by the CLI forever",
          "No -- teams commonly adapt it as the app grows",
          "Only the routing file location is fixed",
          "Angular has no folder conventions at all",
        ],
        correctIndex: 1,
        explanation:
          "The generated structure is a starting point; teams commonly reorganize by feature as projects grow.",
      },
    ],
    takeaway:
      "Angular's structure and tooling pay off most for large, long-lived, team-maintained apps -- match the framework to the project's actual scale, not the other way around.",
    summary:
      "Angular projects organize into components/services/routing, often by feature; Angular fits large, long-lived apps well but can be heavier than necessary for very small projects.",
    guidedOutputLab: {
      id: "angular-lab-project-fit",
      title: "Predict: A simple project-size heuristic",
      language: "Angular",
      mode: "predict",
      prompt:
        "This models (as a simplified, illustrative heuristic, not a real Angular API) a rough decision function weighing project factors. Predict its output for the given inputs.",
      steps: [
        {
          code: `interface ProjectProfile {
  estimatedScreens: number;
  teamSize: number;
  expectedLifetimeYears: number;
}

function suggestsFullFramework(profile: ProjectProfile): boolean {
  return profile.estimatedScreens > 5 && profile.teamSize > 1 && profile.expectedLifetimeYears >= 1;
}

const landingPage: ProjectProfile = { estimatedScreens: 1, teamSize: 1, expectedLifetimeYears: 0.5 };
const dashboardApp: ProjectProfile = { estimatedScreens: 12, teamSize: 4, expectedLifetimeYears: 3 };

console.log(suggestsFullFramework(landingPage));
console.log(suggestsFullFramework(dashboardApp));`,
          expectedOutput: "false\ntrue",
        },
      ],
      hints: [
        "landingPage fails all three conditions (1 screen, 1 person, 0.5 years), so the function returns false.",
        "dashboardApp satisfies all three conditions (12 screens, 4 people, 3 years), returning true.",
      ],
    },
  },
];
