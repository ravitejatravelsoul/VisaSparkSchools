import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * C#/.NET Fundamentals interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (C#/.NET
 * fundamentals, OOP: classes/interfaces/encapsulation, nullable reference
 * types/LINQ/collections, async/await/exception handling, .NET project
 * structure and the dotnet CLI).
 */
export const csharpInterviewQuestions: InterviewQuestionInput[] = [
  // --- C# & .NET Fundamentals (10) ---
  {
    id: "csharp-interview-fundamentals-01",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is the relationship between C# and .NET?",
    answer:
      "C# is a programming language; .NET is the runtime/platform (including the base class library and the Common Language Runtime) that C# code compiles down to and executes on -- .NET also supports other languages (F#, VB.NET) that all compile to the same intermediate language and run on the same runtime.",
    category: "C# & .NET Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-fundamentals-02",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Is C# compiled or interpreted, and what role does the CLR (Common Language Runtime) play?",
    answer:
      "C# is compiled to an intermediate language (IL), not directly to native machine code -- the CLR then Just-In-Time (JIT) compiles that IL to native code at runtime, similar in spirit to Java's JVM/bytecode model, giving both portability across platforms and near-native runtime performance.",
    category: "C# & .NET Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-fundamentals-03",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      'What is string interpolation in C#, and what does the `$"..."` syntax offer over plain concatenation?',
    answer:
      'String interpolation embeds expressions directly inside a string literal (`$"Hello, {name}!"`), evaluated at runtime -- more readable than manually concatenating strings with `+`, and avoids the positional-argument confusion of older `string.Format`-style indexed slots.',
    category: "C# & .NET Fundamentals",
    difficulty: "beginner",
    codeExample: 'string name = "Asha";\nConsole.WriteLine($"Hello, {name}!");',
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-fundamentals-04",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is the difference between a value type and a reference type in C#, using `int` and a class as examples?",
    answer:
      "A value type (like `int`, `struct`) stores its actual data directly and is copied by value when assigned or passed; a reference type (like a `class` instance) stores a reference to data on the heap, so assignment copies the reference, not the underlying object -- two variables can then refer to the SAME underlying object.",
    category: "C# & .NET Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-fundamentals-05",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Does C# have automatic memory management, and how does that compare to C/C++'s manual approach?",
    answer:
      "Yes -- the CLR includes a garbage collector that automatically reclaims memory for objects no longer reachable, similar to Java's model -- developers generally don't manually free memory, unlike C/C++'s explicit `malloc`/`free` or `new`/`delete`.",
    category: "C# & .NET Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-fundamentals-06",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is the difference between `==` and `.Equals()` for comparing two reference-type objects in C#?",
    answer:
      "By default, `==` on reference types compares REFERENCE identity (are these the same object in memory) unless the type overrides the `==` operator; `.Equals()` is meant for value equality and is commonly overridden by custom types to compare actual content -- built-in types like `string` override both to compare content by default.",
    category: "C# & .NET Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-fundamentals-07",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is the difference between `switch` statement and `switch` expression syntax in modern C#?",
    answer:
      'A `switch` statement executes code per matched case (with `case`/`break` syntax); a `switch` expression (`var result = value switch { 1 => "one", _ => "other" };`) directly evaluates to a value using more concise pattern-matching arrow syntax -- the expression form is more common in modern, idiomatic C# for simple value-mapping logic.',
    category: "C# & .NET Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-fundamentals-08",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What does the `var` keyword do in C#, and is C# still statically typed when you use it?",
    answer:
      "`var` lets the compiler infer a local variable's type from its initializer -- the variable's type is still fixed and checked at COMPILE time, exactly as if you'd written the type explicitly; `var` is purely a syntax convenience, not a move toward dynamic typing.",
    category: "C# & .NET Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-fundamentals-09",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is boxing and unboxing in C#, and why can excessive boxing hurt performance?",
    answer:
      "Boxing converts a value type (like `int`) into a reference-type object (wrapping it on the heap); unboxing converts it back -- each boxing operation allocates new heap memory and adds garbage-collection pressure, so code that boxes value types frequently (e.g. storing many `int`s in a non-generic `ArrayList`) can incur real, avoidable overhead.",
    category: "C# & .NET Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-fundamentals-10",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Why is C# widely used across both enterprise backend systems (via ASP.NET) and game development (via Unity)?",
    answer:
      "It combines strong tooling (Visual Studio, a rich standard library), solid performance via the CLR's JIT compilation, and a large ecosystem -- ASP.NET provides a mature web framework for backend services, while Unity adopted C# as its primary scripting language, giving the language reach across genuinely different domains.",
    category: "C# & .NET Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Object-Oriented C#: Classes, Interfaces & Encapsulation (10) ---
  {
    id: "csharp-interview-oop-01",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is a C# property, and how does it differ from a plain public field?",
    answer:
      "A property (`public string Name { get; set; }`) exposes a controlled accessor/mutator pair while looking like simple field access from the caller's perspective -- unlike a plain public field, a property can later add validation logic in its getter/setter without breaking the calling code's syntax.",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "beginner",
    codeExample: "public class User {\n  public string Name { get; set; }\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-oop-02",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What does an auto-implemented property (`{ get; set; }` with no explicit backing field) actually do behind the scenes?",
    answer:
      "The compiler automatically generates a hidden, private backing field and the standard get/set logic for you -- convenient shorthand for the common case where a property doesn't need any custom validation logic beyond simple storage.",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-oop-03",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is the difference between a class and an interface in C#, and can a class implement multiple interfaces?",
    answer:
      "A class can hold state and provide full implementations; an interface (traditionally) declares a contract of members a class must implement, with no state of its own -- a C# class can implement MULTIPLE interfaces but can only inherit from ONE base class (C# has single class inheritance).",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-oop-04",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What does the `virtual` keyword on a method allow, and how does `override` relate to it in a derived class?",
    answer:
      "`virtual` marks a method as overridable by a derived class; the derived class then uses `override` to provide its own implementation -- calling the method through a base-class-typed reference still dispatches to the derived class's overridden version at runtime, C#'s mechanism for polymorphism.",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-oop-05",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What are the standard C# access modifiers, and what does `internal` specifically restrict access to?",
    answer:
      "`public`, `private`, `protected`, `internal`, and `protected internal` -- `internal` restricts access to code within the SAME assembly (compiled project/DLL), useful for exposing something to other classes in the same project while hiding it from external consumers of that assembly.",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-oop-06",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is the difference between an `abstract` class and an interface in C#?",
    answer:
      "An abstract class can provide both abstract (unimplemented) and concrete (implemented) members plus real instance state, and can only be single-inherited; an interface (traditionally) declares only a contract with no state, and a class can implement many -- choose an abstract class when sharing real implementation/state across related types, an interface when only defining a capability contract.",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-oop-07",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What does a C# constructor do, and how do you chain one constructor to call another in the same class?",
    answer:
      "A constructor initializes a newly-created object's state -- `: this(...)` lets one constructor overload delegate to another in the same class, avoiding duplicated initialization logic across multiple constructor overloads.",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "intermediate",
    codeExample:
      "public User(string name) : this(name, 0) {}\npublic User(string name, int age) { Name = name; Age = age; }",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-oop-08",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is a C# record type, and what problem does it solve compared to a regular class for simple data-holding types?",
    answer:
      "A record provides built-in value-based equality, a readable `ToString()`, and concise immutable-by-default property syntax -- solves the boilerplate of manually implementing `Equals`/`GetHashCode`/`ToString` for a simple data-holding type where structural (not reference) equality is the natural expectation.",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-oop-09",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Why is encapsulation (using properties/private fields rather than exposing everything as public fields) still emphasized in modern C#, even with concise auto-property syntax?",
    answer:
      "Properties let you add validation or computed logic later without changing the class's public interface (callers keep using the same `obj.Name` syntax) -- a plain public field offers no such extension point, so starting with a property (even a trivial auto-property) keeps that flexibility available from the start.",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-oop-10",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is the difference between method overloading and method overriding in C#?",
    answer:
      "Overloading defines multiple methods with the SAME name but different parameter signatures within the same class, resolved at compile time; overriding replaces a base class's `virtual` method implementation in a derived class, resolved at runtime based on the object's actual type -- two genuinely different mechanisms, both sometimes casually called 'polymorphism.'",
    category: "Object-Oriented C#: Classes, Interfaces & Encapsulation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Nullable Reference Types, LINQ & Collections (10) ---
  {
    id: "csharp-interview-modern-01",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What are nullable reference types in modern C#, and what problem do they solve?",
    answer:
      "With nullable reference types enabled, the compiler tracks and warns when a reference-type variable that ISN'T explicitly marked nullable (`string?` vs. plain `string`) might be assigned or passed `null` -- surfaces a real class of `NullReferenceException` risk as a compile-time warning instead of a runtime crash.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "advanced",
    codeExample:
      "string? maybeName = GetName();  // explicitly nullable\nstring name = GetName();        // compiler warns if this could be null",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-modern-02",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What does the null-conditional operator (`?.`) do, and how does it differ from a plain `.` access?",
    answer:
      "`obj?.Property` accesses the property only if `obj` is not `null`, otherwise short-circuits to `null` instead of throwing -- replaces verbose manual null-checking chains (`if (obj != null) { ... }`) with a single, concise expression.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "intermediate",
    codeExample: "string? city = user?.Address?.City;",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-modern-03",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What does the null-coalescing operator (`??`) do, and how does `??=` differ from it?",
    answer:
      "`a ?? b` evaluates to `a` if it's not `null`, otherwise `b` -- a concise default-value expression; `a ??= b` assigns `b` to `a` only if `a` is currently `null`, a combined null-check-and-assign shorthand.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-modern-04",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is LINQ (Language Integrated Query), at a conceptual level?",
    answer:
      "A set of query operators built into C# for filtering, transforming, and aggregating data (collections, and with the right provider, databases/XML) using a consistent, declarative syntax -- e.g. `users.Where(u => u.IsActive).Select(u => u.Name)` reads similarly to a database query but works directly over in-memory C# collections too.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "intermediate",
    codeExample: "var activeNames = users.Where(u => u.IsActive).Select(u => u.Name).ToList();",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-modern-05",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Are LINQ query operations like `.Where()` and `.Select()` executed immediately, or lazily?",
    answer:
      "Lazily (deferred execution) -- the query is only actually evaluated when you enumerate its results (via a `foreach`, or calling `.ToList()`/`.ToArray()`), not at the point the LINQ expression is written -- this means the underlying data source could change between defining and actually enumerating the query, affecting the eventual result.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "advanced",
    commonMistake:
      "Assuming a LINQ query executes immediately when written, rather than being lazily evaluated only once actually enumerated.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-modern-06",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is the difference between `IEnumerable<T>` and `List<T>` in terms of what they guarantee?",
    answer:
      "`IEnumerable<T>` only guarantees the ability to iterate over a sequence, potentially lazily/deferred and possibly only once; `List<T>` is a concrete, fully-realized, indexable, mutable collection -- calling `.ToList()` on an `IEnumerable<T>` forces immediate, full evaluation into a real in-memory list.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-modern-07",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is the difference between `List<T>`, `Dictionary<TKey, TValue>`, and `HashSet<T>` as core .NET collection types?",
    answer:
      "`List<T>` is an ordered, resizable, index-accessible collection allowing duplicates; `Dictionary<TKey, TValue>` maps unique keys to values with fast lookup by key; `HashSet<T>` holds unique elements with fast membership testing but no meaningful positional order.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-modern-08",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What does `.FirstOrDefault()` return if no element in the sequence matches, and how does that differ from `.First()`?",
    answer:
      "`.First()` throws an exception if no matching element exists; `.FirstOrDefault()` returns the type's default value (`null` for reference types, `0` for `int`, etc.) instead of throwing -- choosing between them depends on whether 'no match' is an expected, normal case or a genuine error condition for that specific query.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-modern-09",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is a common performance mistake when chaining multiple LINQ operations inside a loop?",
    answer:
      "Re-executing a lazily-evaluated LINQ query multiple times (e.g. calling `.Count()` and then `.ToList()` separately on the same un-materialized query) re-runs the ENTIRE query pipeline each time -- materializing the result once (`.ToList()`) and reusing that concrete list avoids redundant recomputation.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-modern-10",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Why might overly long, deeply-chained LINQ expressions hurt readability compared to an equivalent explicit loop?",
    answer:
      "A dense chain of `.Where().Select().GroupBy().OrderBy()` packs significant logic into one expression, which can become genuinely hard to read/debug once it grows complex -- LINQ is a readability WIN for straightforward filter/transform operations, but not an automatic win once the logic becomes intricate enough that a clearer imperative loop (or breaking the chain into named intermediate variables) would communicate intent better.",
    category: "Nullable Reference Types, LINQ & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Async/Await & Exception Handling (10) ---
  {
    id: "csharp-interview-async-01",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What does the `async`/`await` pattern let you do in C#, and what does an `async` method typically return?",
    answer:
      "It lets you write asynchronous code (like an I/O-bound network call) that reads like sequential synchronous code -- an `async` method typically returns `Task` (no result value) or `Task<T>` (an eventual result of type `T`), representing the operation's eventual completion.",
    category: "Async/Await & Exception Handling",
    difficulty: "intermediate",
    codeExample:
      "public async Task<string> FetchDataAsync() {\n  var response = await httpClient.GetStringAsync(url);\n  return response;\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-async-02",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Does `await` block the current thread while waiting for the awaited task to complete?",
    answer:
      "No -- `await` releases the current thread back to do other work while the asynchronous operation is in progress, and execution resumes on (typically) a thread-pool thread once the awaited task completes -- this is precisely why `async`/`await` is valuable for scalable I/O-bound work, unlike a blocking synchronous wait.",
    category: "Async/Await & Exception Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-async-03",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is a common mistake when calling an async method without actually awaiting it?",
    answer:
      "The async operation starts but the calling code continues immediately without waiting for it to complete or observing any exception it might throw -- an unhandled exception from a fire-and-forget async call can be silently lost, or surface much later and out of context, making the bug hard to trace back to its source.",
    category: "Async/Await & Exception Handling",
    difficulty: "advanced",
    commonMistake:
      "Calling an async method without awaiting it, letting any exception it throws go unobserved or surface later, disconnected from its actual cause.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-async-04",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "How do you run multiple independent async operations concurrently and wait for all of them to finish?",
    answer:
      "`await Task.WhenAll(task1, task2, task3);` -- starts all the tasks and waits for every one to complete, running them concurrently rather than sequentially awaiting each one in turn (which would needlessly serialize otherwise-independent work).",
    category: "Async/Await & Exception Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-async-05",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is a try/catch/finally block used for, and what is guaranteed about the `finally` block?",
    answer:
      "`try` contains code that might throw; `catch` handles a specific (or general) exception type if one occurs; `finally` runs regardless of whether an exception occurred or was caught -- commonly used for guaranteed cleanup (closing a resource) that must happen either way.",
    category: "Async/Await & Exception Handling",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-async-06",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What does the `using` statement do in C#, and how does it relate to `IDisposable`?",
    answer:
      "`using (var resource = ...) { ... }` guarantees `resource.Dispose()` is called automatically once the block exits, even if an exception is thrown -- works for any type implementing `IDisposable`, C#'s equivalent to a deterministic cleanup pattern for unmanaged resources like file handles or database connections.",
    category: "Async/Await & Exception Handling",
    difficulty: "advanced",
    codeExample: "using (var file = new StreamReader(path)) {\n  return file.ReadToEnd();\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-async-07",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Why is catching a broad `Exception` type and doing nothing with it (an empty catch block) generally considered bad practice?",
    answer:
      "It silently discards information about a real failure, making the program appear to succeed when something actually went wrong -- the underlying problem surfaces later, in a confusing, disconnected way (or never surfaces at all), making the root cause far harder to diagnose than if the exception had been logged or handled meaningfully.",
    category: "Async/Await & Exception Handling",
    difficulty: "intermediate",
    commonMistake:
      "Catching a broad Exception type with an empty catch block, silently swallowing a real failure instead of logging or handling it.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-async-08",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is the difference between checked and unchecked arithmetic overflow behavior in C#?",
    answer:
      "By default (unchecked), an integer arithmetic overflow silently wraps around; wrapping the expression in a `checked` block causes it to throw an `OverflowException` instead -- useful when silent wraparound would be a serious, hard-to-detect bug in a specific calculation.",
    category: "Async/Await & Exception Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-async-09",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is a custom exception class in C#, and why might you define one rather than always throwing a generic `Exception`?",
    answer:
      "A class deriving from `Exception` (e.g. `class InsufficientFundsException : Exception`) represents a specific, meaningful failure mode -- lets calling code catch and handle that SPECIFIC error type distinctly (`catch (InsufficientFundsException ex)`) rather than parsing a generic exception's message string to figure out what actually went wrong.",
    category: "Async/Await & Exception Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-async-10",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Why should exceptions generally be reserved for genuinely exceptional conditions, not routine control flow (e.g. checking whether a key exists in a dictionary)?",
    answer:
      "Throwing and catching exceptions has real runtime overhead compared to a normal conditional check, and using them for routine, expected outcomes (like a missing dictionary key, which `TryGetValue` handles cleanly without an exception) makes the code's control flow harder to follow -- exceptions communicate 'something unexpected happened,' not 'here's one of several normal outcomes.'",
    category: "Async/Await & Exception Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- .NET Project Structure & the dotnet CLI (10) ---
  {
    id: "csharp-interview-cli-01",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What does `dotnet new console` do, and what files does it typically generate?",
    answer:
      "It scaffolds a new console application project, generating a `.csproj` project file (describing the project's target framework and dependencies) and a starter `Program.cs` source file -- the standard starting point for a new .NET console project.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-cli-02",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What does the `.csproj` file define for a .NET project?",
    answer:
      "It's the project's manifest -- defining the target .NET framework version, package (NuGet) dependencies, and build-related settings -- roughly analogous in role to `package.json` in a Node.js project or `go.mod` in a Go project.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-cli-03",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is the difference between `dotnet build` and `dotnet run`?",
    answer:
      "`dotnet build` compiles the project into output binaries without executing it; `dotnet run` builds (if needed) AND immediately executes the resulting application -- `run` is typically used during active development, `build` alone when you just need the compiled output without running it.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-cli-04",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What does `dotnet test` do, and what testing frameworks does it commonly work with?",
    answer:
      "It discovers and runs a project's automated tests -- commonly used with frameworks like xUnit, NUnit, or MSTest, all of which integrate with the standard `dotnet test` command regardless of which specific testing framework a project has chosen.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-cli-05",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is NuGet, and what role does it play in a .NET project?",
    answer:
      ".NET's package manager -- it manages downloading, installing, and tracking versions of external library dependencies referenced in a project's `.csproj` file, similar in role to npm for Node.js or pip for Python.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-cli-06",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What does `dotnet publish` produce, and how does it differ from `dotnet build`?",
    answer:
      "`dotnet publish` produces a self-contained, deployment-ready set of output files (optionally including the .NET runtime itself for a self-contained deployment) intended to actually be deployed to a server -- `dotnet build`'s output is meant more for local development iteration, not necessarily deployment-ready.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-cli-07",
    courseSlug: "csharp-dotnet-fundamentals",
    question: "What is the difference between a .NET SDK and the .NET runtime?",
    answer:
      "The SDK includes everything needed to BUILD and develop .NET applications (compiler, CLI tools, project templates); the runtime alone is only what's needed to RUN an already-built .NET application -- a production server typically only needs the runtime installed, not the full SDK.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-cli-08",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "What is a .NET solution file (`.sln`), and how does it relate to individual project files?",
    answer:
      "A solution file groups multiple related `.csproj` projects together (e.g. a web API project plus its separate test project) so they can be opened, built, and managed together as one unit in an IDE or via the CLI -- a solution can reference several independently-buildable projects.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-cli-09",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Why might a .NET project pin exact NuGet package versions, similar to a lock file in other ecosystems?",
    answer:
      "Pinning exact versions ensures every environment installs the identical dependency code, avoiding a scenario where an unrelated upstream package update silently changes behavior between different developers' machines or between local development and CI/production.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "csharp-interview-cli-10",
    courseSlug: "csharp-dotnet-fundamentals",
    question:
      "Why does .NET's cross-platform support (running on Windows, Linux, and macOS since .NET Core) matter for modern C# development, compared to the older, Windows-only .NET Framework?",
    answer:
      "It lets C#/.NET applications be developed and deployed on the same platforms as most other modern backend stacks (Linux containers, cloud environments) rather than being tied to Windows-only hosting -- a significant shift that broadened where and how .NET applications can realistically be deployed.",
    category: ".NET Project Structure & the dotnet CLI",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
