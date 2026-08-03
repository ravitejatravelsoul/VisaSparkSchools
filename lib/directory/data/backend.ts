import type { TechnologyInput } from "@/lib/directory/types";

export const backendTechnologies: TechnologyInput[] = [
  {
    id: "nodejs",
    slug: "nodejs",
    name: "Node.js",
    category: "backend",
    description: "A JavaScript runtime for running JS outside the browser, on a server.",
    overview:
      "Node.js runs JavaScript outside a browser using the same V8 engine Chrome uses, adding APIs for the file system, networking, and processes that browsers don't expose. It made JavaScript a viable full backend language, not just a frontend scripting tool.",
    whatItIs:
      "A JavaScript runtime built on Chrome's V8 engine, for running JS on a server or in a CLI.",
    whyItsUsed:
      "It lets a team use one language (JavaScript/TypeScript) across frontend and backend, with a huge package ecosystem (npm).",
    whereItFits:
      "After JavaScript fundamentals -- Node.js is JavaScript plus server-side APIs, not a separate language. The Node.js and Express Backend Development course covers this in depth: the event loop, modules, async patterns, and building a real, tested, operationally-ready API, with guided local labs for the real server work this platform's browser sandbox can't execute.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["javascript"],
    relatedIds: ["javascript", "express"],
    coreConcepts: [
      "The event loop",
      "Modules (require/import)",
      "The file system API",
      "npm and package.json",
      "Building an HTTP server",
    ],
    example: {
      language: "javascript",
      code: `const http = require("node:http");\nhttp.createServer((req, res) => {\n  res.end("Hello from Node.js");\n}).listen(3000);`,
      explanation:
        "http.createServer starts a raw HTTP server -- frameworks like Express build a more convenient API on top of exactly this primitive.",
    },
    useCases: [
      "Backend APIs and servers",
      "Command-line tools",
      "Build tooling (bundlers, task runners)",
    ],
    practiceOptions: [],
    projectIdeas: ["A minimal HTTP server that responds differently based on the request path"],
    references: [{ label: "Node.js official documentation", url: "https://nodejs.org/en/docs" }],
    searchKeywords: ["server-side javascript", "npm", "runtime"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "22.x LTS",
    lastReviewed: "2026-08-03",
    courseId: "nodejs-express-backend-development",
    projectIds: ["validated-learning-progress-api"],
    publicVisibility: true,
  },
  {
    id: "express",
    slug: "express",
    name: "Express",
    category: "backend",
    subcategory: "web-framework",
    description: "A minimal, unopinionated web framework for Node.js.",
    overview:
      "Express is the most widely used Node.js web framework: a thin, unopinionated layer over Node's HTTP module adding routing, middleware, and request/response helpers, without dictating project structure the way a full framework (like Django or Spring Boot) does.",
    whatItIs: "A minimal Node.js web framework for routing HTTP requests and composing middleware.",
    whyItsUsed:
      "For its simplicity, huge middleware ecosystem, and flexibility -- a good fit when you want control over structure rather than a full framework's conventions.",
    whereItFits:
      "Built on top of Node.js; often the first backend framework a JavaScript developer learns. The Node.js and Express Backend Development course covers this in depth: routing, middleware, validation, structured errors, security boundaries, and testing.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["nodejs"],
    relatedIds: ["nodejs", "rest-apis"],
    coreConcepts: [
      "Routing (app.get, app.post)",
      "Middleware functions",
      "Request and response objects",
      "Error handling middleware",
    ],
    example: {
      language: "javascript",
      code: `const express = require("express");\nconst app = express();\napp.get("/users/:id", (req, res) => {\n  res.json({ id: req.params.id });\n});\napp.listen(3000);`,
      explanation:
        "Middleware and route handlers form a pipeline each request passes through -- Express's core abstraction is composing small functions rather than a monolithic request handler.",
    },
    useCases: ["REST APIs", "Server-rendered web applications", "Backend-for-frontend services"],
    practiceOptions: [],
    projectIdeas: ["A small REST API with GET/POST routes backed by an in-memory data store"],
    references: [
      {
        label: "Express official documentation",
        url: "https://expressjs.com/en/guide/routing.html",
      },
    ],
    searchKeywords: ["node framework", "rest api", "middleware"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "5.x",
    lastReviewed: "2026-08-03",
    courseId: "nodejs-express-backend-development",
    projectIds: ["validated-learning-progress-api"],
    publicVisibility: true,
  },
  {
    id: "django",
    slug: "django",
    name: "Django",
    category: "backend",
    subcategory: "web-framework",
    description:
      "A batteries-included Python web framework favoring convention over configuration.",
    overview:
      "Django is a full-featured Python web framework including an ORM, admin interface, authentication, and templating out of the box, following a 'batteries included' philosophy. It's a strong choice when you want a well-trodden, structured path from database model to web page.",
    whatItIs:
      "A full-stack Python web framework with a built-in ORM, admin panel, and authentication.",
    whyItsUsed:
      "For rapid development of database-backed web applications without assembling separate libraries for each concern.",
    whereItFits:
      "After Python fundamentals; a common choice for content-heavy or admin-heavy web applications.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["python"],
    relatedIds: ["python", "postgresql"],
    coreConcepts: [
      "Models (the ORM)",
      "Views and URL routing",
      "Templates",
      "The Django admin",
      "Migrations",
    ],
    example: {
      language: "python",
      code: `class Book(models.Model):\n    title = models.CharField(max_length=200)\n    price = models.DecimalField(max_digits=6, decimal_places=2)`,
      explanation:
        "A Django model is a Python class that maps directly to a database table -- Django's ORM generates SQL from this definition, including migrations to evolve the schema.",
    },
    useCases: [
      "Content management systems",
      "Admin-heavy internal tools",
      "Database-backed web applications",
    ],
    practiceOptions: [],
    projectIdeas: ["A simple blog with a Post model, list view, and detail view"],
    references: [
      { label: "Django official documentation", url: "https://docs.djangoproject.com/en/stable/" },
    ],
    searchKeywords: ["python web framework", "orm", "mvc"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "5.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "aspnet",
    slug: "aspnet",
    name: "ASP.NET",
    category: "backend",
    subcategory: "web-framework",
    description: "Microsoft's web framework for building APIs and web apps on .NET.",
    overview:
      "ASP.NET (specifically ASP.NET Core, the current cross-platform version) is Microsoft's framework for building web APIs and applications in C#, with strong performance, built-in dependency injection, and tight integration with the rest of the .NET ecosystem.",
    whatItIs:
      "A cross-platform web framework for building APIs and web applications with C# and .NET.",
    whyItsUsed:
      "For high-performance, strongly-typed web backends, especially in organizations already invested in the .NET/C# ecosystem.",
    whereItFits:
      "Built on .NET and C#; a common enterprise backend choice alongside SQL Server or PostgreSQL.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["csharp"],
    relatedIds: ["csharp", "dotnet"],
    coreConcepts: [
      "Controllers and routing",
      "Dependency injection",
      "Middleware pipeline",
      "Model binding and validation",
    ],
    example: {
      language: "javascript",
      code: `[ApiController]\n[Route("api/[controller]")]\npublic class UsersController : ControllerBase {\n    [HttpGet("{id}")]\n    public IActionResult Get(int id) => Ok(new { Id = id });\n}`,
      explanation:
        "Attributes ([ApiController], [HttpGet]) declaratively configure routing -- ASP.NET Core wires the HTTP request to this method based on the attributes, not a separate routes file.",
    },
    useCases: ["Enterprise web APIs", ".NET-based microservices", "Internal business applications"],
    practiceOptions: [],
    projectIdeas: ["A REST API with a couple of endpoints backed by an in-memory list"],
    references: [
      {
        label: "ASP.NET Core documentation (Microsoft Learn)",
        url: "https://learn.microsoft.com/en-us/aspnet/core/",
      },
    ],
    searchKeywords: [".net web framework", "c# api", "enterprise backend"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "ASP.NET Core 8",
    versionNotes:
      "ASP.NET Core (cross-platform, current) is distinct from the older, Windows-only ASP.NET Framework -- new projects should always target ASP.NET Core.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "spring-boot",
    slug: "spring-boot",
    name: "Spring Boot",
    category: "backend",
    subcategory: "web-framework",
    description:
      "An opinionated, convention-based framework built on the Spring platform for Java.",
    overview:
      "Spring Boot simplifies building production-ready Java applications on top of the broader Spring framework, providing auto-configuration and sensible defaults so a working web service can start with minimal boilerplate, while still allowing the full power of Spring underneath.",
    whatItIs:
      "An opinionated, auto-configuring layer on top of the Spring framework for building Java applications quickly.",
    whyItsUsed:
      "For Java teams that want Spring's dependency injection and ecosystem without hand-assembling extensive XML/Java configuration.",
    whereItFits: "Built on Java; the dominant choice for new Java-based backend services.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["java"],
    relatedIds: ["java"],
    coreConcepts: [
      "Dependency injection (@Autowired)",
      "REST controllers (@RestController)",
      "Auto-configuration",
      "Spring Data (repositories)",
    ],
    example: {
      language: "javascript",
      code: `@RestController\npublic class UserController {\n    @GetMapping("/users/{id}")\n    public User getUser(@PathVariable int id) {\n        return new User(id);\n    }\n}`,
      explanation:
        "Like ASP.NET, Spring Boot uses annotations (@RestController, @GetMapping) to declaratively wire HTTP routes to methods -- a pattern common across statically-typed backend frameworks.",
    },
    useCases: ["Enterprise Java microservices", "Large-scale backend systems"],
    practiceOptions: [],
    projectIdeas: ["A REST controller exposing CRUD endpoints backed by an in-memory repository"],
    references: [
      {
        label: "Spring Boot official documentation",
        url: "https://docs.spring.io/spring-boot/index.html",
      },
    ],
    searchKeywords: ["java framework", "enterprise backend", "microservices"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "3.x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "dotnet",
    slug: "dotnet",
    name: ".NET",
    category: "backend",
    subcategory: "platform",
    description: "Microsoft's cross-platform runtime and framework ecosystem.",
    overview:
      ".NET is the runtime and standard library underneath C# (and other .NET languages), now fully cross-platform (Windows, Linux, macOS) since the .NET Core rewrite. ASP.NET (web), and various desktop/mobile frameworks all run on top of it.",
    whatItIs:
      "A cross-platform runtime and standard library for running C# (and F#, VB.NET) applications.",
    whyItsUsed:
      "For its performance, mature tooling (Visual Studio), and unification of what used to be separate .NET Framework/.NET Core/Xamarin platforms into one.",
    whereItFits: "The platform underneath C#, ASP.NET, and various desktop/mobile .NET frameworks.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["csharp"],
    relatedIds: ["csharp", "aspnet"],
    coreConcepts: [
      "The .NET SDK and CLI (dotnet new, dotnet run)",
      "NuGet packages",
      "Cross-platform builds",
      "The Common Language Runtime (CLR)",
    ],
    example: {
      language: "javascript",
      code: `// terminal\ndotnet new console -o hello\ncd hello\ndotnet run`,
      explanation:
        "The dotnet CLI scaffolds, builds, and runs .NET projects across platforms -- the same commands work identically on Windows, Linux, or macOS.",
    },
    useCases: [
      "Cross-platform backend services",
      "Desktop applications",
      "Cloud-native applications on Azure",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Scaffold and run a minimal console app, then a minimal web API, to see how the CLI structures each",
    ],
    references: [
      {
        label: ".NET official documentation (Microsoft Learn)",
        url: "https://learn.microsoft.com/en-us/dotnet/",
      },
    ],
    searchKeywords: ["dotnet core", "clr", "cross-platform runtime"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: ".NET 8 LTS",
    versionNotes:
      "Modern .NET (5+) unified the old .NET Framework and .NET Core into one cross-platform product -- material referencing '.NET Framework 4.x' describes the older, Windows-only predecessor.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "rest-apis",
    slug: "rest-apis",
    name: "REST APIs",
    category: "backend",
    subcategory: "architecture",
    description: "An architectural style for designing networked APIs around resources.",
    overview:
      "REST (Representational State Transfer) is a set of architectural conventions -- resources identified by URLs, standard HTTP methods (GET/POST/PUT/DELETE) for actions, and stateless requests -- that most web APIs follow, even if not perfectly 'RESTful' by the original academic definition.",
    whatItIs:
      "A convention for designing HTTP APIs around resources, URLs, and standard HTTP methods.",
    whyItsUsed:
      "It's the most widely understood API convention, backed by HTTP itself, requiring no additional protocol layer.",
    whereItFits:
      "The design layer between a frontend and backend, or between two backend services, regardless of the specific framework implementing it.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["javascript"],
    relatedIds: ["graphql", "express", "postman"],
    coreConcepts: [
      "Resources and URLs",
      "HTTP methods (GET, POST, PUT, DELETE)",
      "Status codes",
      "Statelessness",
      "JSON as the typical payload format",
    ],
    example: {
      language: "javascript",
      code: `GET /api/books/42        -> fetch one book\nPOST /api/books           -> create a book\nPUT /api/books/42         -> replace book 42\nDELETE /api/books/42      -> delete book 42`,
      explanation:
        "The URL identifies the resource (a specific book); the HTTP method identifies the action -- this consistency is what makes REST APIs predictable to use without reading custom documentation for every endpoint.",
    },
    useCases: ["Any client-server communication over HTTP", "Public and internal service APIs"],
    practiceOptions: ["Covered directly in the Git, APIs & SQL course"],
    projectIdeas: [
      "Design (on paper) the REST endpoints for a simple to-do app: list, create, update, delete",
    ],
    references: [
      {
        label: "MDN: An overview of HTTP",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
      },
    ],
    searchKeywords: ["api design", "http methods", "web services"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    courseId: "git-apis-sql",
    projectIds: ["api-powered-weather-app"],
    publicVisibility: true,
  },
  {
    id: "graphql",
    slug: "graphql",
    name: "GraphQL",
    category: "backend",
    subcategory: "architecture",
    description: "A query language for APIs letting clients request exactly the data they need.",
    overview:
      "GraphQL lets a client specify the exact shape of data it wants in a single request, rather than hitting multiple fixed REST endpoints and over- or under-fetching data. It trades REST's simplicity for more precise client-driven queries, at the cost of additional server-side complexity.",
    whatItIs:
      "A query language and runtime for APIs where clients describe exactly what data they need.",
    whyItsUsed:
      "To avoid over-fetching (getting more fields than needed) or under-fetching (needing multiple round trips) common with fixed REST endpoints.",
    whereItFits: "An alternative to REST for APIs with complex, nested, client-varying data needs.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["rest-apis"],
    relatedIds: ["rest-apis", "nodejs"],
    coreConcepts: [
      "Schema and types",
      "Queries and mutations",
      "Resolvers",
      "A single endpoint vs. many REST routes",
    ],
    example: {
      language: "javascript",
      code: `query {\n  book(id: 42) {\n    title\n    author { name }\n  }\n}`,
      explanation:
        "The client specifies exactly which fields it wants (title, author.name) -- the server returns precisely that shape, nothing more.",
    },
    useCases: [
      "APIs with complex, nested data requirements",
      "Mobile apps that need to minimize network round trips",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Design a GraphQL schema (on paper) for the same to-do app used in the REST project idea, and compare the two approaches",
    ],
    references: [{ label: "GraphQL official documentation", url: "https://graphql.org/learn/" }],
    searchKeywords: ["query language", "api", "schema"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "microservices",
    slug: "microservices",
    name: "Microservices",
    category: "backend",
    subcategory: "architecture",
    description:
      "An architectural style splitting an application into small, independently deployable services.",
    overview:
      "Microservices architecture splits an application into small, independently deployable services, each owning its own data and communicating over the network (often via REST or messaging). It trades a monolith's simplicity for independent scaling and deployment, at the cost of distributed-systems complexity.",
    whatItIs:
      "An architectural style where an application is composed of small, independently deployable services rather than one large codebase.",
    whyItsUsed:
      "To let different teams deploy independently, scale services separately, and isolate failures -- at the cost of significant added operational complexity versus a monolith.",
    whereItFits:
      "A system-design decision made after an application (or team) outgrows a single deployable unit -- not a default starting point for a new small project.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["rest-apis", "system-design"],
    relatedIds: ["docker", "kubernetes", "system-design"],
    coreConcepts: [
      "Service boundaries",
      "Inter-service communication (REST, messaging)",
      "Independent deployability",
      "Data ownership per service",
      "Distributed failure handling",
    ],
    example: {
      language: "javascript",
      code: `// Instead of one app handling users + orders + payments,\n// three small services, each with its own database:\n// user-service, order-service, payment-service\n// -- communicating over HTTP or a message queue.`,
      explanation:
        "The key discipline is that each service owns its own data -- order-service never reaches directly into user-service's database, it asks over the network.",
    },
    useCases: [
      "Large systems with multiple independent teams",
      "Systems needing to scale specific components independently",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Sketch a monolithic app's service boundaries: which parts would become separate services, and what would each own?",
    ],
    references: [
      {
        label: "Martin Fowler: Microservices",
        url: "https://martinfowler.com/articles/microservices.html",
      },
    ],
    searchKeywords: ["distributed systems", "service architecture", "system design"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "system-design",
    slug: "system-design",
    name: "System Design",
    category: "backend",
    subcategory: "architecture",
    description: "Designing large systems for scale, reliability, and maintainability.",
    overview:
      "System design is the practice of architecting software systems to meet requirements like scale, availability, and consistency -- covering load balancing, caching, database scaling, and trade-offs between them. It's both a real engineering skill and a common senior technical-interview format.",
    whatItIs:
      "The practice of designing how a system's components fit together to meet scale, reliability, and performance requirements.",
    whyItsUsed:
      "Real systems eventually outgrow a single server and a single database -- system design is the vocabulary for reasoning about what to do next.",
    whereItFits:
      "After backend and database fundamentals; a common focus of mid-to-senior technical interviews.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["rest-apis", "sql"],
    relatedIds: ["microservices", "sql", "aws"],
    coreConcepts: [
      "Load balancing",
      "Caching",
      "Database scaling (replication, sharding)",
      "Consistency vs. availability trade-offs",
      "Rate limiting",
    ],
    example: {
      language: "javascript",
      code: `// A classic trade-off:\n// Cache reads aggressively for speed,\n// but now a write must invalidate (or accept stale) cached data.\n// There is no free lunch -- every choice trades one property for another.`,
      explanation:
        "System design is less about one 'correct' architecture and more about explicitly naming the trade-off you're making and why it fits the requirements.",
    },
    useCases: ["Architecting systems expected to scale", "Senior/staff technical interviews"],
    practiceOptions: [],
    projectIdeas: [
      "Design (on paper) how you'd scale a simple blog from 100 to 1 million daily readers, identifying each bottleneck in order",
    ],
    references: [
      {
        label: "Google Cloud: System design fundamentals",
        url: "https://cloud.google.com/architecture/framework",
      },
    ],
    searchKeywords: ["scalability", "architecture", "interview prep"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
