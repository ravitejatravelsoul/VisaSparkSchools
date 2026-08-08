import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Angular Application Development interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics
 * (components/templates/directives, inputs-outputs/change detection/DI,
 * RxJS/HttpClient/reactive forms, routing/pipes/project structure).
 */
export const angularInterviewQuestions: InterviewQuestionInput[] = [
  // --- Angular Fundamentals: Components, Templates & Directives (10) ---
  {
    id: "angular-interview-fundamentals-01",
    courseSlug: "angular-application-development",
    question: "What is an Angular component, and what three pieces typically make it up?",
    answer:
      "A component is a TypeScript class decorated with `@Component`, paired with an HTML template and (usually) a CSS/SCSS stylesheet -- the class holds the component's logic and state, the template defines its view, and the decorator's metadata (selector, templateUrl, styleUrls) wires the three together.",
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-fundamentals-02",
    courseSlug: "angular-application-development",
    question:
      "What does Angular's `{{ }}` interpolation syntax do, and what kind of expressions can it contain?",
    answer:
      "Interpolation embeds a component property's value directly into the rendered template text (`<p>{{ user.name }}</p>`); it can contain simple property access and expressions, but is intentionally limited (no assignment, no multi-statement logic) to keep templates declarative and easy to reason about.",
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-fundamentals-03",
    courseSlug: "angular-application-development",
    question:
      'What is property binding (`[property]="expression"`) and how does it differ from interpolation?',
    answer:
      'Property binding sets a DOM element or component property directly from a component-class expression (`<img [src]="imageUrl">`), useful for non-string values or attributes that aren\'t purely textual; interpolation is really syntactic sugar over property binding for the common text-content case.',
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "intermediate",
    codeExample: '<img [src]="user.avatarUrl" [alt]="user.name">',
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-fundamentals-04",
    courseSlug: "angular-application-development",
    question: 'What is event binding (`(event)="handler()"`) in an Angular template?',
    answer:
      'It wires a DOM event (click, input, submit) to a method on the component class, so user interaction in the view invokes logic in the component (`<button (click)="save()">Save</button>`) -- the parentheses syntax distinguishes it visually from property binding\'s square brackets.',
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-fundamentals-05",
    courseSlug: "angular-application-development",
    question: "What is the Angular CLI, and what are two common tasks it automates?",
    answer:
      "The `ng` command-line tool that scaffolds and manages an Angular project -- commonly used to generate new components/services/modules with consistent boilerplate (`ng generate component`) and to run the dev server, build, lint, and test tasks (`ng serve`, `ng build`, `ng test`) with sensible project-wide defaults.",
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-fundamentals-06",
    courseSlug: "angular-application-development",
    question:
      "What are Angular's built-in structural control-flow directives (or newer `@if`/`@for` syntax), and what do they do?",
    answer:
      "Structural constructs conditionally include or repeat DOM content based on component data -- `*ngIf`/`@if` conditionally renders a block, `*ngFor`/`@for` repeats a block once per item in a collection -- the newer `@if`/`@for` block syntax (introduced in recent Angular versions) is now the recommended approach over the older `*ngIf`/`*ngFor` structural-directive syntax.",
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "intermediate",
    codeExample: "@for (item of items; track item.id) {\n  <li>{{ item.name }}</li>\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-fundamentals-07",
    courseSlug: "angular-application-development",
    question:
      "Why does Angular's `@for` block require a `track` expression, and what happens if items are tracked incorrectly (e.g. by array index)?",
    answer:
      "`track` tells Angular how to identify which DOM nodes correspond to which data items across re-renders, so it can update/reorder/remove the minimum necessary DOM instead of re-rendering everything; tracking by array index instead of a stable identity (like an item's `id`) can cause Angular to reuse the wrong DOM node when the underlying list is reordered or filtered, leading to stale rendered state or lost component-level input focus.",
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "advanced",
    commonMistake:
      "Tracking a @for loop by array index instead of a stable item id, causing Angular to misattribute DOM state (like focused inputs) when the list is reordered or filtered.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-fundamentals-08",
    courseSlug: "angular-application-development",
    question:
      "What is an Angular attribute directive, and how does it differ from a structural directive?",
    answer:
      "An attribute directive changes the appearance or behavior of an existing element without adding or removing elements from the DOM (e.g. `ngClass`/`ngStyle`, or a custom directive that changes an element's style on hover); a structural directive (`*ngIf`, `*ngFor`) actually adds, removes, or repeats elements in the DOM structure itself.",
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-fundamentals-09",
    courseSlug: "angular-application-development",
    question: "What is Angular's component selector, and how is it used in a parent template?",
    answer:
      "The `selector` metadata property (e.g. `selector: 'app-user-card'`) defines the custom HTML tag name a component is invoked by in another template (`<app-user-card></app-user-card>`) -- lets a component be reused anywhere in the application simply by referencing its tag name.",
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-fundamentals-10",
    courseSlug: "angular-application-development",
    question:
      "Why is Angular described as a full, opinionated framework rather than just a library, relative to something like plain React?",
    answer:
      "Angular ships with its own built-in solutions for routing, forms, HTTP client, dependency injection, and a mandated project structure/CLI, all designed to work together as a cohesive whole -- teams generally don't need to separately choose and wire together a router, state-management library, and HTTP client the way they often must in a leaner library-first approach.",
    category: "Angular Fundamentals: Components, Templates & Directives",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Inputs/Outputs, Change Detection & Dependency Injection (10) ---
  {
    id: "angular-interview-data-01",
    courseSlug: "angular-application-development",
    question: "What does the `@Input()` decorator do, and how does data flow with it?",
    answer:
      'It marks a component property as bindable from a parent template, letting a parent pass data DOWN into a child component (`<app-user-card [user]="selectedUser">`) -- data flows one direction, from parent to child, via `@Input()`.',
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-data-02",
    courseSlug: "angular-application-development",
    question:
      "What does the `@Output()` decorator do, and how does it typically pair with an `EventEmitter`?",
    answer:
      'It marks a component property (typically an `EventEmitter`) as an event a parent can listen to, letting a child component send data or notifications UP to its parent (`<app-user-card (userSelected)="onUserSelected($event)">`) -- `@Input()`/`@Output()` together form Angular\'s standard parent-child communication pattern.',
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "intermediate",
    codeExample:
      "@Output() userSelected = new EventEmitter<User>();\nselect(user: User) {\n  this.userSelected.emit(user);\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-data-03",
    courseSlug: "angular-application-development",
    question: "What is Angular's change detection, at a conceptual level?",
    answer:
      "The mechanism Angular uses to detect when component data has changed and re-render the affected parts of the DOM to match -- triggered by events like user interaction, HTTP responses, or timers, Angular walks the component tree checking for changes and updates bindings accordingly.",
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-data-04",
    courseSlug: "angular-application-development",
    question:
      "What is the difference between Angular's default change detection strategy and `OnPush`, and why might `OnPush` improve performance in a large app?",
    answer:
      "Default strategy checks a component (and potentially its whole subtree) on every change-detection cycle regardless of whether its actual inputs changed; `OnPush` tells Angular to only re-check a component when its `@Input()` REFERENCE changes (or an event originates from within it) -- in a large component tree, this can meaningfully reduce unnecessary re-render checks, but requires treating input data as immutable so reference changes reliably signal real updates.",
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-data-05",
    courseSlug: "angular-application-development",
    question:
      "What is dependency injection (DI), and what problem does it solve for a component that needs a service?",
    answer:
      "DI is a pattern where a class declares the dependencies it needs (e.g. via constructor parameters) and an external system (Angular's injector) supplies (injects) those dependencies at runtime, rather than the class creating them itself -- this decouples a component from the concrete implementation details of its dependencies, making the component easier to test (by injecting a mock/fake) and the dependency easier to reuse/reconfigure app-wide.",
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-data-06",
    courseSlug: "angular-application-development",
    question:
      "What does the `@Injectable()` decorator do, and what does `providedIn: 'root'` mean?",
    answer:
      "`@Injectable()` marks a class as available for Angular's DI system to construct and inject; `providedIn: 'root'` registers it as a singleton available application-wide, meaning Angular creates exactly one shared instance for the whole app rather than a new instance per component that requests it.",
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "intermediate",
    codeExample: "@Injectable({ providedIn: 'root' })\nexport class UserService { }",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-data-07",
    courseSlug: "angular-application-development",
    question:
      "Why might a component receive different instances of the same injected service, depending on where that service is 'provided'?",
    answer:
      "Angular's DI is hierarchical -- a service can be provided at the root/application level (one shared instance), or at a specific component/module level (creating a new instance scoped just to that component and its children) -- registering a provider in a component's own `providers` array creates a fresh instance for that component's subtree, distinct from any root-level instance.",
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-data-08",
    courseSlug: "angular-application-development",
    question:
      "How would you test a component that depends on an injected service, without hitting the service's real implementation (e.g. a real HTTP call)?",
    answer:
      "Use Angular's `TestBed` to configure a testing module where the real service is swapped out for a mock/stub via the `providers` array, so the component under test receives the fake implementation through the same DI mechanism it would use in production -- verifies the component's own logic without depending on the real service's actual behavior.",
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-data-09",
    courseSlug: "angular-application-development",
    question:
      "What is two-way data binding via `[(ngModel)]`, and what two individual bindings does it combine?",
    answer:
      "`[(ngModel)]` combines property binding (setting an input's value FROM a component property) and event binding (updating that component property WHEN the input changes) into a single, concise syntax -- commonly called 'banana in a box' for its `[( )]` shape -- primarily used for simple form input binding, with Angular's reactive forms generally preferred for more complex forms.",
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-data-10",
    courseSlug: "angular-application-development",
    question:
      "What is a common mistake when mutating an `@Input()`-bound array or object directly, and how does it interact badly with `OnPush` change detection?",
    answer:
      "Mutating an array/object in place (e.g. `this.items.push(newItem)`) keeps the same object REFERENCE, so an `OnPush` child component watching that input for reference changes won't detect the update and won't re-render -- the fix is to create a new reference on change (e.g. `this.items = [...this.items, newItem]`), which reliably signals the change to `OnPush` components.",
    category: "Inputs/Outputs, Change Detection & Dependency Injection",
    difficulty: "advanced",
    commonMistake:
      "Mutating an @Input()-bound array/object in place instead of creating a new reference, silently breaking change detection for any OnPush child relying on that input.",
    lastReviewed: "2026-08-07",
  },

  // --- RxJS Observables & HttpClient (10) ---
  {
    id: "angular-interview-rxjs-01",
    courseSlug: "angular-application-development",
    question:
      "What is an RxJS Observable, at a conceptual level, and how does it differ from a Promise?",
    answer:
      "An Observable represents a stream of values delivered over time (zero, one, or many), which can be subscribed to and later unsubscribed from; a Promise resolves exactly once and cannot be cancelled once started -- Observables are more general-purpose for ongoing streams (like user input events or WebSocket messages), while Promises fit a single async result.",
    category: "RxJS Observables & HttpClient",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-rxjs-02",
    courseSlug: "angular-application-development",
    question:
      "Why does Angular's `HttpClient` return an Observable rather than a Promise for HTTP requests?",
    answer:
      "Returning an Observable lets a request be cancelled (unsubscribed) before it completes -- useful e.g. if a user navigates away or triggers a new search before the previous one resolves -- and lets RxJS operators (retry, debounce, combine with other streams) compose naturally with the request, which a plain Promise-based API wouldn't support as cleanly.",
    category: "RxJS Observables & HttpClient",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-rxjs-03",
    courseSlug: "angular-application-development",
    question:
      "Why is failing to unsubscribe from a manually-subscribed Observable considered a common source of memory leaks in Angular apps?",
    answer:
      "A subscription that's never unsubscribed keeps its callback (and everything it references, including the component instance) alive even after the component is destroyed, since the Observable's producer still holds a reference to the subscriber -- over time, repeatedly navigating to and away from a component with leaked subscriptions can accumulate memory and continue firing logic against a component that should no longer be active.",
    category: "RxJS Observables & HttpClient",
    difficulty: "advanced",
    commonMistake:
      "Manually subscribing to a long-lived Observable in ngOnInit without ever unsubscribing in ngOnDestroy, leaking the component and its subscription callback after the component is destroyed.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-rxjs-04",
    courseSlug: "angular-application-development",
    question:
      "What does Angular's `async` pipe do in a template (`{{ data$ | async }}`), and how does it help avoid subscription-management bugs?",
    answer:
      "The `async` pipe subscribes to an Observable (or Promise) directly in the template and automatically unsubscribes when the component is destroyed, and triggers change detection when a new value arrives -- eliminates the need to manually subscribe/unsubscribe in the component class, removing a common source of memory-leak bugs entirely.",
    category: "RxJS Observables & HttpClient",
    difficulty: "intermediate",
    codeExample: '<div *ngIf="user$ | async as user">{{ user.name }}</div>',
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-rxjs-05",
    courseSlug: "angular-application-development",
    question:
      "What does the RxJS `map` operator do when applied to an HttpClient response Observable?",
    answer:
      "`map` transforms each emitted value through a function, producing a new Observable of transformed values -- e.g. `this.http.get<ApiUser[]>(url).pipe(map(users => users.map(u => u.name)))` transforms the raw API response into just a list of names, without needing a separate subscription/assignment step.",
    category: "RxJS Observables & HttpClient",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-rxjs-06",
    courseSlug: "angular-application-development",
    question:
      "What does the RxJS `switchMap` operator do, and why is it commonly used for a search-as-you-type feature backed by an HTTP call?",
    answer:
      "`switchMap` maps each emitted value to a new inner Observable (like an HTTP request), automatically CANCELLING the previous inner Observable if a new outer value arrives before it completes -- for search-as-you-type, this ensures only the response for the MOST RECENT keystroke's request is used, discarding stale in-flight responses from earlier, now-outdated searches.",
    category: "RxJS Observables & HttpClient",
    difficulty: "advanced",
    codeExample:
      "searchTerm$.pipe(\n  debounceTime(300),\n  switchMap(term => this.http.get(`/api/search?q=${term}`))\n)",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-rxjs-07",
    courseSlug: "angular-application-development",
    question:
      "What does `debounceTime` do in an RxJS pipeline, and why is it commonly paired with `switchMap` for search inputs?",
    answer:
      "`debounceTime(300)` waits for a pause of the given duration in emitted values before letting one through, suppressing rapid intermediate emissions -- paired with `switchMap` for a search box, it prevents firing an HTTP request on every single keystroke, instead waiting until the user briefly pauses typing.",
    category: "RxJS Observables & HttpClient",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-rxjs-08",
    courseSlug: "angular-application-development",
    question:
      "How would you handle an HTTP request error using RxJS's `catchError` operator, rather than letting it propagate unhandled to the subscriber?",
    answer:
      "`catchError` intercepts an error emitted by the source Observable and lets you return a fallback Observable (e.g. an empty result or a default value) instead of letting the error terminate the stream unhandled -- commonly combined with logging the error for diagnostics before returning a graceful fallback.",
    category: "RxJS Observables & HttpClient",
    difficulty: "advanced",
    codeExample:
      "this.http.get(url).pipe(\n  catchError(err => {\n    console.error(err);\n    return of([]);\n  })\n)",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-rxjs-09",
    courseSlug: "angular-application-development",
    question: "What is the difference between a 'cold' and a 'hot' Observable in RxJS?",
    answer:
      "A cold Observable starts producing values fresh for EACH new subscriber (like a typical `HttpClient` request, which fires a new request per subscription); a hot Observable produces values independent of subscribers and shares the same stream across everyone currently subscribed (like a `Subject` broadcasting UI events) -- understanding this distinction matters for whether subscribing twice means 'run twice' or 'listen to the same ongoing stream.'",
    category: "RxJS Observables & HttpClient",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-rxjs-10",
    courseSlug: "angular-application-development",
    question:
      "How would you use RxJS's `forkJoin` (or `combineLatest`) to wait for multiple independent HTTP requests to complete before proceeding?",
    answer:
      "`forkJoin({ user: this.http.get(...), orders: this.http.get(...) })` waits for ALL provided Observables to complete and then emits a single combined result once, useful for a screen that needs several independent pieces of data loaded before it can render meaningfully -- `combineLatest` is the related choice when you want the combined value updated every time ANY one of the source Observables emits again, not just once.",
    category: "RxJS Observables & HttpClient",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Reactive Forms, Routing & Pipes (10) ---
  {
    id: "angular-interview-forms-01",
    courseSlug: "angular-application-development",
    question: "What is the difference between Angular's template-driven forms and reactive forms?",
    answer:
      "Template-driven forms build the form model implicitly from directives in the template (using `ngModel`), suiting simple forms; reactive forms build the form model explicitly in the component class (using `FormGroup`/`FormControl`), giving more direct, testable, and predictable control over validation and value changes -- generally the recommended approach for anything beyond a trivial form.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-forms-02",
    courseSlug: "angular-application-development",
    question:
      "What are `FormGroup` and `FormControl` in Angular's reactive forms, and how do they relate to each other?",
    answer:
      "`FormControl` represents a single form field's value and validation state; `FormGroup` aggregates multiple `FormControl`s (or nested `FormGroup`s) into a single form model, exposing the combined validity and value of the whole group -- this composable structure lets a complex, nested form be modeled as a tree of controls and groups.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "intermediate",
    codeExample:
      "form = new FormGroup({\n  name: new FormControl('', Validators.required),\n  email: new FormControl('', [Validators.required, Validators.email]),\n});",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-forms-03",
    courseSlug: "angular-application-development",
    question:
      "How do Angular's built-in validators (like `Validators.required`) work, and how would you display a validation error in the template?",
    answer:
      "Validators are attached to a `FormControl` and update its status (`valid`/`invalid`) and `errors` object as the value changes; a template checks `form.get('email')?.hasError('required')` (typically combined with a `touched`/`dirty` check, so errors don't show before the user has interacted with the field) to conditionally render an error message.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-forms-04",
    courseSlug: "angular-application-development",
    question:
      "What is a custom validator function in Angular's reactive forms, and what shape must it have?",
    answer:
      "A function taking an `AbstractControl` and returning either `null` (valid) or a `ValidationErrors` object (invalid, with a key describing the failure) -- lets you express business-specific validation logic (like 'password must contain a digit') beyond Angular's built-in validators, attached to a control the same way built-in validators are.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-forms-05",
    courseSlug: "angular-application-development",
    question: "What is the Angular Router, and what does a route configuration typically map?",
    answer:
      "The Router maps URL paths to components, letting an Angular single-page application render different views without a full page reload -- a route configuration is an array of objects each pairing a `path` string with a `component` (or lazy-loaded module/component) to render when that path matches.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "beginner",
    codeExample:
      "const routes: Routes = [\n  { path: 'users/:id', component: UserDetailComponent },\n];",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-forms-06",
    courseSlug: "angular-application-development",
    question:
      "What is a route parameter (`:id` in `users/:id`), and how would a component read its value?",
    answer:
      "A route parameter is a dynamic segment of a URL path captured as a named value -- a component reads it by injecting `ActivatedRoute` and subscribing to `route.paramMap` (or reading a snapshot for a component that won't be reused across parameter changes), giving access to the matched value (e.g. the specific user ID) for that navigation.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-forms-07",
    courseSlug: "angular-application-development",
    question: "What is a route guard in Angular, and give an example of when you'd use one?",
    answer:
      "A route guard is a function that runs before a route is activated (or deactivated) and can allow, block, or redirect the navigation -- a common example is an authentication guard (`CanActivate`) that checks whether a user is logged in and redirects to a login page if not, preventing access to a protected route.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-forms-08",
    courseSlug: "angular-application-development",
    question: "What is an Angular pipe, and what does the built-in `date` pipe do as an example?",
    answer:
      "A pipe transforms a value for display directly in a template using `|` syntax, without altering the underlying component data -- `{{ order.createdAt | date:'mediumDate' }}` formats a raw Date/timestamp into a human-readable date string, keeping formatting logic out of the component class.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-forms-09",
    courseSlug: "angular-application-development",
    question:
      "What is the difference between a 'pure' and an 'impure' pipe in Angular, and why does purity matter for performance?",
    answer:
      "A pure pipe (the default) only re-executes when its input reference changes, which Angular can check cheaply; an impure pipe re-executes on EVERY change-detection cycle regardless of whether the input actually changed, which is far more expensive -- impure pipes should be used sparingly and only when genuinely needed (e.g. transforming a mutated-in-place array), since overusing them can noticeably hurt performance in a large app.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-forms-10",
    courseSlug: "angular-application-development",
    question:
      "What is lazy loading in the context of Angular routing, and why does it matter for a large application's initial load time?",
    answer:
      "Lazy loading configures a route to load its component/module code only when that route is actually navigated to, rather than bundling it into the app's initial JavaScript payload -- for a large application with many feature areas, this can significantly reduce the amount of code a user must download before the app becomes interactive, since features they never visit are never downloaded at all.",
    category: "Reactive Forms, Routing & Pipes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Architecture, Performance & Testing (10) ---
  {
    id: "angular-interview-architecture-01",
    courseSlug: "angular-application-development",
    question:
      "What is Angular's standalone component API, and how does it change (or remove the need for) the older `NgModule`-based project structure?",
    answer:
      "Standalone components declare their own dependencies (imports) directly rather than being declared inside an `NgModule`, letting a project be structured around components/directives/pipes without the older mandatory `NgModule` wiring -- newer Angular applications increasingly default to a standalone-first structure, though `NgModule`s remain supported for existing codebases and specific use cases.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-architecture-02",
    courseSlug: "angular-application-development",
    question:
      "How would you decide whether Angular's full, opinionated framework is a good fit for a given project, versus a leaner library-first approach?",
    answer:
      "Angular's built-in DI, routing, forms, and enforced project structure tend to pay off most on larger, longer-lived applications built by bigger teams, where consistency and built-in conventions reduce architectural decision fatigue; for a small, short-lived project, or a small team wanting maximum flexibility over their own tooling choices, a leaner library-first approach may add less upfront overhead.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-architecture-03",
    courseSlug: "angular-application-development",
    question:
      "What is a 'smart' (container) versus 'dumb' (presentational) component pattern in Angular, and what does separating them help with?",
    answer:
      "A smart/container component manages state and business logic (often injecting services, subscribing to data), while a dumb/presentational component receives data purely via `@Input()`/`@Output()` and focuses only on rendering -- separating the two makes presentational components easier to reuse and test in isolation, since they have no dependency on services or app-wide state.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-architecture-04",
    courseSlug: "angular-application-development",
    question:
      "How would you write a unit test for an Angular component using `TestBed` and `ComponentFixture`?",
    answer:
      "`TestBed.configureTestingModule` sets up a testing module declaring/importing the component (and any dependencies, often mocked); `TestBed.createComponent` returns a `ComponentFixture` giving access to the component instance and its rendered DOM (`fixture.nativeElement`), letting a test assert on both the component's internal state and what it actually renders after calling `fixture.detectChanges()`.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-architecture-05",
    courseSlug: "angular-application-development",
    question:
      "Why is calling `fixture.detectChanges()` necessary in an Angular component test after changing a component property?",
    answer:
      "Angular's change detection doesn't run automatically inside a test the way it does during real app execution -- `fixture.detectChanges()` explicitly triggers a change-detection cycle, updating the rendered DOM to reflect the component's current state, so an assertion checking the DOM after a property change needs this call first or it will see stale, pre-update markup.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    commonMistake:
      "Asserting on rendered DOM content immediately after changing a component property without calling fixture.detectChanges() first, and getting a false failure from stale markup.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-architecture-06",
    courseSlug: "angular-application-development",
    question:
      "What is Ahead-of-Time (AOT) compilation in Angular, and how does it differ from Just-in-Time (JIT) compilation?",
    answer:
      "AOT compiles Angular templates into efficient JavaScript at BUILD time (before the app is shipped to the browser), producing smaller bundles and faster startup since no compiler needs to ship to (or run in) the browser; JIT compiles templates in the browser at RUNTIME -- AOT is the default and recommended approach for production builds.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-architecture-07",
    courseSlug: "angular-application-development",
    question:
      "What is `trackBy` (or the `track` expression in the newer `@for` syntax) used for beyond correctness -- what performance problem does it solve?",
    answer:
      "Without a stable tracking identity, Angular may treat a re-rendered list as entirely new items on each update, destroying and recreating every DOM node even if most items are unchanged -- providing a stable `track`/`trackBy` identity lets Angular recognize which items persisted, only updating/moving/removing the DOM nodes that actually need it, which is significantly cheaper for large or frequently-updated lists.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-architecture-08",
    courseSlug: "angular-application-development",
    question:
      "How would you debug an Angular component that appears to not be receiving an updated `@Input()` value from its parent?",
    answer:
      "Check whether the parent is passing a NEW reference for reference/object-type inputs (especially if the child uses `OnPush`), verify the binding syntax in the parent template is actually correct (a typo'd property name binds silently to nothing rather than erroring in some cases), and use Angular DevTools or a temporary log inside `ngOnChanges` to confirm whether and when the input actually changes from the child's perspective.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-architecture-09",
    courseSlug: "angular-application-development",
    question:
      "What is the `ngOnChanges` lifecycle hook, and what does its `SimpleChanges` parameter provide?",
    answer:
      "`ngOnChanges` runs whenever one or more `@Input()`-bound properties change (before the updated values are rendered), receiving a `SimpleChanges` object describing each changed input's previous and current value -- useful for reacting to a specific input's change (e.g. re-fetching data) rather than relying only on the updated property value itself.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "angular-interview-architecture-10",
    courseSlug: "angular-application-development",
    question:
      "Why is 'when Angular fits' considered a genuine architectural decision rather than a purely technical one, and what factors typically drive it?",
    answer:
      "The choice trades off team size/experience (Angular's conventions can onboard new team members faster on a large existing codebase), project longevity (upfront structure pays off more over a multi-year lifespan), and how much the team values built-in, opinionated tooling versus assembling their own stack -- there's no universally 'correct' framework choice, only a better or worse fit for a specific project's constraints and team.",
    category: "Architecture, Performance & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
