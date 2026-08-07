import type { TechnologyInput } from "@/lib/directory/types";

export const languageTechnologies: TechnologyInput[] = [
  {
    id: "javascript",
    slug: "javascript",
    name: "JavaScript",
    category: "programming-languages",
    description: "The only language browsers natively execute -- also runs on servers via Node.js.",
    overview:
      "JavaScript started as a browser scripting language and is now used for frontend UIs, backend servers (Node.js), mobile apps, and more. Its defining traits are dynamic typing, first-class functions, and an event-driven, single-threaded concurrency model built around the event loop.",
    whatItIs: "A dynamically-typed, interpreted language, the only one browsers run natively.",
    whyItsUsed:
      "It's required for any browser interactivity, and Node.js extended it to servers -- one language across the whole stack.",
    whereItFits:
      "After general programming basics; before any frontend framework (React/Vue/Angular) or Node.js.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["typescript", "react", "nodejs", "html"],
    coreConcepts: [
      "Variables and types",
      "Functions and closures",
      "Arrays and objects",
      "The DOM",
      "Async/await and promises",
    ],
    example: {
      language: "javascript",
      code: `async function getUser(id) {\n  const res = await fetch(\`/api/users/\${id}\`);\n  return res.json();\n}`,
      explanation:
        "async/await lets asynchronous code (a network request) read top-to-bottom instead of nesting callbacks -- fetch itself returns a Promise, which await unwraps.",
    },
    useCases: ["Interactive web pages", "Backend servers (Node.js)", "Browser extensions"],
    practiceOptions: [
      "Take the JavaScript Fundamentals course",
      "Try the Playground's JavaScript-only tab",
    ],
    projectIdeas: ["An interactive quiz app", "A small API client that fetches and renders data"],
    references: [
      { label: "MDN: JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    ],
    searchKeywords: ["js", "ecmascript", "programming language", "web scripting"],
    status: "current",
    versionPolicy: "evergreen",
    versionNotes:
      "JavaScript (ECMAScript) adds new features yearly via TC39; there's no single 'version number' to pin the way Python or Java has.",
    lastReviewed: "2026-08-01",
    courseId: "javascript-fundamentals",
    runnerSupport: "javascript",
    projectIds: ["interactive-quiz-app"],
    publicVisibility: true,
  },
  {
    id: "typescript",
    slug: "typescript",
    name: "TypeScript",
    category: "programming-languages",
    description: "JavaScript with an added static type system, compiled down to plain JS.",
    overview:
      "TypeScript is a superset of JavaScript that adds static types, catching a category of bugs (wrong argument types, typos in property names) at compile time instead of runtime. It compiles to plain JavaScript, so it runs anywhere JavaScript does.",
    whatItIs: "JavaScript plus an optional, gradually-adoptable static type system.",
    whyItsUsed:
      "Types catch mistakes before code runs and make large codebases easier to navigate and refactor safely.",
    whereItFits:
      "After JavaScript fundamentals -- TypeScript adds types on top, it doesn't replace JS concepts.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["javascript"],
    relatedIds: ["javascript", "react", "angular", "nextjs"],
    coreConcepts: [
      "Type annotations",
      "Interfaces and type aliases",
      "Generics",
      "Type inference",
      "Compiling to JavaScript",
    ],
    example: {
      language: "javascript",
      code: `function add(a: number, b: number): number {\n  return a + b;\n}\nadd(2, "3"); // compile error: caught before running`,
      explanation:
        "The type annotations (: number) tell the compiler what's allowed -- passing a string where a number is expected fails at compile time, not in production.",
    },
    useCases: [
      "Large frontend codebases",
      "Any Node.js backend that benefits from compile-time safety",
      "Public library APIs",
    ],
    practiceOptions: [],
    projectIdeas: [
      "Add type annotations to an existing small JavaScript project and fix the errors TypeScript surfaces",
    ],
    references: [
      { label: "TypeScript official documentation", url: "https://www.typescriptlang.org/docs/" },
    ],
    searchKeywords: ["ts", "static typing", "typed javascript"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "5.x",
    lastReviewed: "2026-08-02",
    courseId: "typescript-foundations",
    runnerSupport: "typescript",
    projectIds: ["typed-study-tracker"],
    publicVisibility: true,
  },
  {
    id: "python",
    slug: "python",
    name: "Python",
    category: "programming-languages",
    description: "A readable, general-purpose language used across scripting, data, and AI.",
    overview:
      "Python emphasizes readable syntax and a large standard library, making it a common first language and the dominant choice for data science, machine learning, and scripting/automation. It runs on the server side (unlike JavaScript's browser origins) via a standard interpreter.",
    whatItIs:
      "A dynamically-typed, interpreted, general-purpose language known for readable syntax.",
    whyItsUsed:
      "It reads close to plain English, has a huge ecosystem (especially for data/AI), and is a strong general-purpose backend language.",
    whereItFits:
      "After general programming basics; a common entry point into data science, automation, or backend development.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["numpy", "pandas", "django", "data-science-field"],
    coreConcepts: [
      "Variables and types",
      "Functions",
      "Lists, tuples, dicts, sets",
      "Classes and objects",
      "Exception handling",
    ],
    example: {
      language: "python",
      code: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("world"))`,
      explanation:
        'f-strings (f"...") embed expressions directly in string literals -- one of several syntax choices that make Python read close to plain English.',
    },
    useCases: [
      "Scripting and automation",
      "Data science and machine learning",
      "Backend web services (Django, Flask)",
    ],
    practiceOptions: [
      "Take the Python Fundamentals course",
      "Try the Playground's Python tab (runs via Pyodide, in-browser)",
    ],
    projectIdeas: [
      "An expense tracker with file persistence",
      "A script that processes a CSV file and prints a summary",
    ],
    references: [{ label: "Python official documentation", url: "https://docs.python.org/3/" }],
    searchKeywords: ["py", "scripting", "programming language"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "3.x",
    versionNotes:
      "Python 2 reached end-of-life in 2020 -- all current learning and production code should target Python 3.",
    lastReviewed: "2026-08-01",
    courseId: "python-fundamentals",
    runnerSupport: "python",
    projectIds: ["expense-tracker-cli"],
    publicVisibility: true,
  },
  {
    id: "java",
    slug: "java",
    name: "Java",
    category: "programming-languages",
    description: "A statically-typed, object-oriented language dominant in enterprise backends.",
    overview:
      "Java is a statically-typed, compiled (to bytecode, run on the JVM) language built around object-oriented programming. It remains foundational in large enterprise systems, Android development (historically), and any environment prioritizing long-term stability and strong tooling.",
    whatItIs: "A statically-typed, object-oriented language that compiles to JVM bytecode.",
    whyItsUsed:
      "For its strong typing, mature tooling, backward compatibility, and the JVM's performance and portability ('write once, run anywhere').",
    whereItFits:
      "A common choice for large backend systems (often via Spring Boot) and historically for native Android development. This platform's Java Programming Foundations course teaches the language itself, from the JVM execution model through generics, streams, and JUnit testing.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["spring-boot", "kotlin", "csharp"],
    coreConcepts: [
      "Classes and objects",
      "Interfaces",
      "Static typing",
      "Exceptions",
      "Collections (List, Map, Set)",
    ],
    example: {
      language: "javascript",
      code: `public class Greeter {\n    public static String greet(String name) {\n        return "Hello, " + name + "!";\n    }\n}`,
      explanation:
        "Every Java program lives inside a class, and types are declared explicitly (String name) -- the compiler checks them before the program ever runs.",
    },
    useCases: [
      "Enterprise backend systems",
      "Android apps (alongside Kotlin)",
      "Large-scale distributed systems",
    ],
    practiceOptions: ["Take the Java Programming Foundations course"],
    projectIdeas: [
      "A simple class hierarchy modeling a real-world domain (e.g. shapes, employees) using interfaces",
    ],
    references: [
      { label: "Java official documentation (Oracle)", url: "https://docs.oracle.com/en/java/" },
    ],
    searchKeywords: ["jvm", "object-oriented programming", "enterprise", "oop", "jdk"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "21 LTS",
    versionNotes:
      "Java uses Long-Term Support (LTS) releases (e.g. 17, 21) for production stability, with faster non-LTS releases in between.",
    lastReviewed: "2026-08-03",
    courseId: "java-programming-foundations",
    projectIds: ["course-enrollment-progress-manager"],
    publicVisibility: true,
  },
  {
    id: "php",
    slug: "php",
    name: "PHP",
    category: "programming-languages",
    description: "A server-side scripting language powering a large share of the web.",
    overview:
      "PHP is a server-side scripting language designed for web development, embedded directly in HTML output. It powers a very large share of the web (including WordPress) and has modernized substantially since its early reputation, with strong typing options and a mature framework ecosystem (Laravel) in current versions.",
    whatItIs:
      "A server-side scripting language that generates HTML output dynamically per request.",
    whyItsUsed:
      "It's simple to deploy (nearly every host supports it), powers WordPress and Laravel, and has a huge existing codebase to maintain.",
    whereItFits: "Server-side, generating pages or APIs; commonly paired with MySQL.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["mysql", "html"],
    coreConcepts: [
      "Embedding PHP in HTML",
      "Variables and functions",
      "Arrays",
      "Superglobals ($_GET, $_POST)",
      "Working with a database",
    ],
    example: {
      language: "html",
      code: `<?php\n  $name = $_GET["name"] ?? "world";\n?>\n<h1>Hello, <?= htmlspecialchars($name) ?>!</h1>`,
      explanation:
        "PHP executes on the server and outputs plain HTML to the browser -- htmlspecialchars() here escapes user input before it's rendered, a basic XSS defense.",
    },
    useCases: [
      "WordPress sites and plugins",
      "Laravel-based web applications",
      "Legacy and modern server-rendered sites alike",
    ],
    practiceOptions: [],
    projectIdeas: ["A simple contact form that validates input and writes to a file or database"],
    references: [{ label: "PHP official manual", url: "https://www.php.net/manual/en/" }],
    searchKeywords: ["server-side scripting", "wordpress", "laravel"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "8.x",
    versionNotes:
      "PHP 8 added a JIT compiler and stronger typing options; avoid learning from PHP 5-era material, which reflects outdated practices.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "c",
    slug: "c",
    name: "C",
    category: "programming-languages",
    description: "A low-level systems language that underpins most other languages.",
    overview:
      "C gives direct control over memory and hardware with minimal abstraction. Operating systems, language runtimes, and embedded systems are commonly written in C -- understanding it demystifies what higher-level languages (Python, JavaScript) are doing underneath.",
    whatItIs: "A statically-typed, compiled, low-level language with manual memory management.",
    whyItsUsed:
      "For systems programming, performance-critical code, and embedded devices where you need direct memory/hardware control.",
    whereItFits:
      "After general programming basics, ideally alongside a data structures course -- C makes memory layout and pointers concrete.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["cpp", "dsa-field"],
    coreConcepts: [
      "Pointers and memory addresses",
      "Manual memory management (malloc/free)",
      "Arrays and structs",
      "Compilation to machine code",
    ],
    example: {
      language: "javascript",
      code: `int add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = add(2, 3);\n    return 0;\n}`,
      explanation:
        "Every variable has an explicit type and a fixed memory size -- there's no garbage collector; the programmer is responsible for memory C dynamically allocates.",
    },
    useCases: [
      "Operating systems and drivers",
      "Embedded systems",
      "Performance-critical libraries",
    ],
    practiceOptions: [],
    projectIdeas: ["A simple linked-list implementation, managing memory manually"],
    references: [{ label: "cppreference: C", url: "https://en.cppreference.com/w/c" }],
    searchKeywords: ["systems programming", "pointers", "low-level"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "C17/C23 (ISO standard)",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "cpp",
    slug: "cpp",
    name: "C++",
    category: "programming-languages",
    description: "C with object-oriented and generic programming layered on top.",
    overview:
      "C++ extends C with classes, templates (generic programming), and a large standard library, while retaining low-level control and performance. It's the backbone of game engines, high-performance applications, and much system-level infrastructure.",
    whatItIs:
      "A statically-typed, compiled language combining low-level control with object-oriented and generic programming.",
    whyItsUsed:
      "For performance-critical applications (games, trading systems, real-time systems) that also want higher-level abstractions than plain C.",
    whereItFits:
      "After C or general programming basics; commonly paired with a data structures & algorithms course.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["c"],
    relatedIds: ["c", "dsa-field"],
    coreConcepts: [
      "Classes and objects",
      "Templates (generics)",
      "The Standard Template Library (STL)",
      "RAII and memory management",
      "References",
    ],
    example: {
      language: "javascript",
      code: `#include <vector>\n#include <iostream>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3};\n    for (int n : nums) std::cout << n << " ";\n}`,
      explanation:
        "std::vector is part of the STL, a generic, type-safe container -- a much safer alternative to C's raw arrays and manual memory management.",
    },
    useCases: [
      "Game engines",
      "High-frequency trading systems",
      "Performance-critical libraries and infrastructure",
    ],
    practiceOptions: [],
    projectIdeas: ["A generic stack or queue implemented with templates"],
    references: [{ label: "cppreference: C++", url: "https://en.cppreference.com/w/cpp" }],
    searchKeywords: ["object-oriented", "stl", "templates", "performance"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "C++20/C++23 (ISO standard)",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "csharp",
    slug: "csharp",
    name: "C#",
    category: "programming-languages",
    description: "A modern, statically-typed language central to the .NET ecosystem.",
    overview:
      "C# is Microsoft's statically-typed, object-oriented language for the .NET platform, used for web backends (ASP.NET), desktop apps, and game development (Unity). It has evolved substantially, adding functional-style features (LINQ, pattern matching) on an object-oriented core.",
    whatItIs: "A statically-typed, object-oriented language running on the .NET runtime.",
    whyItsUsed: "For .NET web backends, Windows desktop applications, and Unity game development.",
    whereItFits: "After general programming basics; typically alongside ASP.NET or .NET.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["dotnet", "aspnet", "java"],
    coreConcepts: [
      "Classes and interfaces",
      "Properties",
      "LINQ (query syntax over collections)",
      "Async/await",
      "Nullable reference types",
    ],
    example: {
      language: "javascript",
      code: `var numbers = new List<int> { 1, 2, 3, 4 };\nvar evens = numbers.Where(n => n % 2 == 0).ToList();`,
      explanation:
        "LINQ (Where here) lets you query collections declaratively, similar in spirit to JavaScript's array .filter() -- a hallmark of C#'s functional-influenced style.",
    },
    useCases: ["ASP.NET web APIs", "Windows desktop applications", "Unity game development"],
    practiceOptions: [],
    projectIdeas: [
      "A small console app modeling a domain with classes and LINQ queries over a collection",
    ],
    references: [
      {
        label: "C# official documentation (Microsoft Learn)",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    searchKeywords: [".net language", "object-oriented", "unity"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "C# 12 (.NET 8)",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "go",
    slug: "go",
    name: "Go",
    category: "programming-languages",
    description: "A simple, statically-typed language built for concurrent network services.",
    overview:
      "Go (Golang) was designed at Google for simplicity, fast compilation, and built-in concurrency (goroutines and channels), making it a common choice for cloud infrastructure, CLIs, and networked backend services. Its standard library and tooling are unusually complete out of the box.",
    whatItIs:
      "A statically-typed, compiled language with a small feature set and built-in concurrency primitives.",
    whyItsUsed:
      "For fast compilation, simple deployment (a single static binary), and straightforward concurrent programming.",
    whereItFits:
      "A common choice for backend services and infrastructure tooling; many cloud-native tools (Docker, Kubernetes) are themselves written in Go.",
    beginnerFriendly: false,
    difficulty: "intermediate",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["docker", "kubernetes"],
    coreConcepts: [
      "Goroutines and channels",
      "Structs and interfaces",
      "Error handling (explicit, not exceptions)",
      "Packages and modules",
    ],
    example: {
      // No "go" option exists in runnerLanguageSchema (Go has no safe
      // in-browser execution -- see RUNNER_CAPABILITY_MATRIX.md), and this
      // is real Go syntax, not JavaScript -- "none" is the honest label
      // rather than mislabeling it for syntax highlighting purposes.
      language: "none",
      code: `func greet(name string) string {\n    return "Hello, " + name + "!"\n}\n\nfunc main() {\n    fmt.Println(greet("world"))\n}`,
      explanation:
        "Go has no exceptions for ordinary error handling -- functions typically return an explicit error value the caller must check, a deliberate design choice for predictability.",
    },
    useCases: [
      "Cloud infrastructure and networked services",
      "Command-line tools",
      "Concurrent backend systems",
    ],
    practiceOptions: ["Take the Go Programming course"],
    courseId: "go-programming",
    projectIdeas: ["A concurrent web scraper using goroutines and channels"],
    references: [{ label: "Go official documentation", url: "https://go.dev/doc/" }],
    searchKeywords: ["golang", "concurrency", "goroutines"],
    status: "current",
    versionPolicy: "pinned",
    currentVersion: "1.2x",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "rust",
    slug: "rust",
    name: "Rust",
    category: "programming-languages",
    description: "A systems language guaranteeing memory safety without a garbage collector.",
    overview:
      "Rust achieves C/C++-level performance while eliminating whole classes of memory bugs (use-after-free, data races) at compile time through its ownership and borrowing system, enforced by the compiler rather than a garbage collector at runtime.",
    whatItIs:
      "A statically-typed, compiled systems language whose compiler enforces memory safety via ownership rules.",
    whyItsUsed:
      "For performance-critical software that also needs strong memory-safety guarantees -- browser engines, CLI tools, and increasingly parts of operating systems.",
    whereItFits:
      "After some experience with a statically-typed language (C/C++ helps, but isn't required) -- the ownership model is Rust's steepest learning curve.",
    beginnerFriendly: false,
    difficulty: "advanced",
    prerequisiteIds: ["intro-to-programming"],
    relatedIds: ["c", "cpp"],
    coreConcepts: [
      "Ownership and borrowing",
      "Lifetimes",
      "The Result/Option types (no null, no exceptions)",
      "Traits",
    ],
    example: {
      language: "javascript",
      code: `fn greet(name: &str) -> String {\n    format!("Hello, {}!", name)\n}\n\nfn main() {\n    println!("{}", greet("world"));\n}`,
      explanation:
        "&str is a borrowed reference, not an owned value -- Rust's compiler tracks who owns which data and for how long, catching memory bugs before the program ever runs.",
    },
    useCases: [
      "Systems programming with safety guarantees",
      "CLI tools",
      "WebAssembly modules",
      "Performance-critical services",
    ],
    practiceOptions: [],
    projectIdeas: ["A small CLI tool that reads and processes a text file"],
    references: [
      {
        label: "The Rust Programming Language (official book)",
        url: "https://doc.rust-lang.org/book/",
      },
    ],
    searchKeywords: ["memory safety", "systems programming", "ownership"],
    status: "current",
    versionPolicy: "evergreen",
    versionNotes:
      "Rust ships a new stable release every six weeks with strong backward compatibility -- 'editions' (2018, 2021) mark larger, opt-in language changes.",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
  },
];
