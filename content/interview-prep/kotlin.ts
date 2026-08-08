import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Kotlin Fundamentals interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (the JVM
 * relationship, val/var, control flow, null safety, functions/lambdas,
 * classes/data classes, interfaces/inheritance, collections, coroutines
 * basics, Java interop).
 */
export const kotlinInterviewQuestions: InterviewQuestionInput[] = [
  // --- The JVM Relationship, val/var & Control Flow (10) ---
  {
    id: "kotlin-interview-jvm-01",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is Kotlin's relationship to the JVM, and why does that matter for interoperability with Java?",
    answer:
      "Kotlin compiles to the same JVM bytecode Java does, running on the same Java Virtual Machine -- this means Kotlin code can call Java libraries directly, and Java code can call Kotlin code, making Kotlin adoptable incrementally inside an existing Java codebase rather than requiring a full rewrite.",
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-jvm-02",
    courseSlug: "kotlin-fundamentals",
    question: "What is the difference between `val` and `var` in Kotlin?",
    answer:
      "`val` declares a read-only reference that can only be assigned once (similar to Java's `final`); `var` declares a mutable reference that can be reassigned -- Kotlin's convention strongly encourages defaulting to `val` unless mutation is genuinely needed.",
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "beginner",
    codeExample:
      'val name = "Asha"  // cannot be reassigned\nvar count = 0      // can be reassigned',
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-jvm-03",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why does Kotlin's convention of defaulting to `val` over `var` matter for code quality?",
    answer:
      "Immutable-by-default variables eliminate a whole class of bugs where a value is unexpectedly changed somewhere unrelated in the code -- defaulting to `val` and only reaching for `var` when mutation is genuinely required makes data flow easier to reason about.",
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-jvm-04",
    courseSlug: "kotlin-fundamentals",
    question:
      "What does Kotlin's `if` expression let you do that Java's `if` statement (before Java's own ternary/switch expressions) traditionally could not?",
    answer:
      "In Kotlin, `if`/`else` is an EXPRESSION that evaluates to a value directly (`val max = if (a > b) a else b`), eliminating the need for a separate ternary operator -- the same construct serves both branching control flow and value selection.",
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-jvm-05",
    courseSlug: "kotlin-fundamentals",
    question: "What is Kotlin's `when` expression, and how does it compare to Java's `switch`?",
    answer:
      "`when` is Kotlin's more powerful, expression-based alternative to `switch` -- it can match on ranges, types, and arbitrary boolean conditions (not just exact value equality), has no fall-through by default, and can be used as an expression returning a value directly.",
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "intermediate",
    codeExample:
      'val description = when {\n  score >= 90 -> "excellent"\n  score >= 70 -> "good"\n  else -> "needs improvement"\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-jvm-06",
    courseSlug: "kotlin-fundamentals",
    question:
      "Does Kotlin require explicit type declarations for every variable, given it's statically typed?",
    answer:
      "No -- Kotlin has strong type inference, letting you write `val count = 5` without an explicit type annotation while the compiler still fully checks and enforces `count`'s type (`Int`) at compile time -- explicit type annotations remain useful/required in some cases (like function parameters, or when the inferred type would be ambiguous).",
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-jvm-07",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is a range expression in Kotlin (`1..10`), and how is it commonly used in loops?",
    answer:
      "It represents an inclusive sequence of values from a start to an end -- commonly used in `for (i in 1..10)` loops, or with `downTo`/`step` for more specific iteration patterns, providing more readable loop syntax than manually managing an index variable.",
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-jvm-08",
    courseSlug: "kotlin-fundamentals",
    question: "Where is Kotlin used today beyond Android development?",
    answer:
      "It's Google's officially preferred language for Android development, but also used for backend development (via frameworks like Ktor or Spring, which has first-class Kotlin support), and even multiplatform projects sharing code between mobile/backend/web via Kotlin Multiplatform.",
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-jvm-09",
    courseSlug: "kotlin-fundamentals",
    question:
      'What is string templating in Kotlin (`"Hello, $name!"`), and how does it differ from Java\'s string concatenation?',
    answer:
      'It embeds variable/expression values directly inside a string literal, evaluated at runtime -- `"Total: ${price * quantity}"` can even embed a full expression using `${}` -- more concise and readable than Java\'s `+`-based string concatenation for building formatted strings.',
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-jvm-10",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why is Kotlin often described as designed to reduce Java's 'boilerplate,' and give one concrete example?",
    answer:
      "Kotlin eliminates or shortens many patterns Java requires explicit code for -- e.g. Kotlin infers types instead of requiring them everywhere, and (as covered later) data classes auto-generate `equals`/`hashCode`/`toString`/copy methods that would need to be manually written (or generated by an IDE) in plain Java.",
    category: "The JVM Relationship, val/var & Control Flow",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Null Safety, Functions & Lambdas (10) ---
  {
    id: "kotlin-interview-null-01",
    courseSlug: "kotlin-fundamentals",
    question:
      "How does Kotlin's type system distinguish a type that can hold `null` from one that cannot?",
    answer:
      "A plain type (`String`) cannot hold `null` -- assigning `null` to it is a compile error; appending `?` to the type (`String?`) explicitly marks it as nullable, and the compiler then requires you to handle the null case before accessing members on it.",
    category: "Null Safety, Functions & Lambdas",
    difficulty: "beginner",
    codeExample:
      'var name: String = "Asha"   // cannot be null\nvar nickname: String? = null // can be null',
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-null-02",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why is Kotlin's null-safety system considered to eliminate a whole class of runtime errors that plague Java?",
    answer:
      "Java's `NullPointerException` is a notoriously common runtime crash, since any reference type can silently be `null`; Kotlin's compiler enforces at COMPILE time that a non-nullable type can never actually be `null`, converting what would be a Java runtime crash into a Kotlin compile error caught before the code ever runs.",
    category: "Null Safety, Functions & Lambdas",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-null-03",
    courseSlug: "kotlin-fundamentals",
    question: "What does the safe call operator (`?.`) do?",
    answer:
      "`user?.name` accesses `name` only if `user` is not `null`; if `user` IS `null`, the whole expression short-circuits to `null` instead of throwing -- replaces verbose manual null-checking with a single, concise expression.",
    category: "Null Safety, Functions & Lambdas",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-null-04",
    courseSlug: "kotlin-fundamentals",
    question:
      "What does the Elvis operator (`?:`) do, and how is it commonly used with the safe call operator?",
    answer:
      '`value ?: fallback` evaluates to `value` if it\'s not `null`, otherwise `fallback` -- commonly chained with `?.` (`user?.name ?: "Unknown"`) to provide a default when a chain of safe calls resolves to `null` at any point.',
    category: "Null Safety, Functions & Lambdas",
    difficulty: "intermediate",
    codeExample: 'val displayName = user?.name ?: "Unknown"',
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-null-05",
    courseSlug: "kotlin-fundamentals",
    question:
      "What does the non-null assertion operator (`!!`) do, and why is it considered risky?",
    answer:
      "`value!!` tells the compiler 'I'm certain this isn't null, don't make me handle the null case' -- if the value actually IS `null` at runtime, it throws a `NullPointerException` immediately, reintroducing exactly the runtime crash risk Kotlin's null safety is designed to prevent, so it should be used sparingly and only when genuinely certain.",
    category: "Null Safety, Functions & Lambdas",
    difficulty: "advanced",
    commonMistake:
      "Reaching for !! to silence a nullable-type compiler error instead of actually handling the null case, reintroducing the exact NullPointerException risk Kotlin's null safety was designed to prevent.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-null-06",
    courseSlug: "kotlin-fundamentals",
    question:
      'What is a default argument value in a Kotlin function (`fun greet(name: String = "friend")`), and how does it reduce the need for function overloading?',
    answer:
      "It provides a fallback value used when the caller omits that argument -- Kotlin's default arguments let one function signature cover cases Java would need several overloaded methods for, since callers can omit any parameter that has a sensible default.",
    category: "Null Safety, Functions & Lambdas",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-null-07",
    courseSlug: "kotlin-fundamentals",
    question: "What are named arguments in Kotlin, and when are they especially useful?",
    answer:
      'Calling a function by explicitly naming which parameter each argument corresponds to (`createUser(name = "Asha", age = 30)`), rather than relying purely on positional order -- especially useful for functions with many parameters or several of the same type, where positional-only calls could be ambiguous or error-prone to read.',
    category: "Null Safety, Functions & Lambdas",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-null-08",
    courseSlug: "kotlin-fundamentals",
    question: "What is a lambda expression in Kotlin, and how does trailing lambda syntax work?",
    answer:
      "A lambda is an anonymous function value (`{ x -> x * 2 }`) -- if a function's LAST parameter is a lambda, Kotlin lets you write it outside the parentheses (`items.forEach { println(it) }`), a common, idiomatic Kotlin syntax pattern for functions taking a trailing callback.",
    category: "Null Safety, Functions & Lambdas",
    difficulty: "advanced",
    codeExample: "items.filter { it > 0 }.map { it * 2 }",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-null-09",
    courseSlug: "kotlin-fundamentals",
    question:
      "What does the implicit `it` parameter name refer to inside a single-parameter Kotlin lambda?",
    answer:
      "When a lambda has exactly one parameter and you don't explicitly name it, Kotlin lets you refer to it as `it` implicitly -- a concise shorthand that avoids needing to write `{ x -> x > 0 }` when `{ it > 0 }` is equally clear for simple, single-parameter lambdas.",
    category: "Null Safety, Functions & Lambdas",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-null-10",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is an extension function in Kotlin, and what does it let you do without modifying a class's original source code?",
    answer:
      "An extension function (`fun String.isPalindrome(): Boolean { ... }`) lets you add new callable methods to an EXISTING type (even one you don't own, like `String`), called with normal method syntax (`\"racecar\".isPalindrome()`), without actually modifying that type's original class definition.",
    category: "Null Safety, Functions & Lambdas",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Classes & Data Classes (10) ---
  {
    id: "kotlin-interview-classes-01",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why does Kotlin make classes `final` (non-inheritable) by default, unlike Java's default of allowing inheritance?",
    answer:
      "Kotlin's designers made `final`-by-default a deliberate choice to encourage composition over inheritance and to prevent accidental, unintended subclassing of a class that wasn't actually designed to be extended -- a class must be explicitly marked `open` to allow inheritance, making extensibility an intentional decision rather than an accidental default.",
    category: "Classes & Data Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-classes-02",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is a Kotlin primary constructor, and how does its concise syntax compare to Java's typical constructor boilerplate?",
    answer:
      "`class User(val name: String, val age: Int)` declares the constructor parameters directly in the class header, simultaneously declaring them as properties -- avoids the separate field declaration + constructor parameter + `this.field = field` assignment boilerplate a Java class would typically need.",
    category: "Classes & Data Classes",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-classes-03",
    courseSlug: "kotlin-fundamentals",
    question: "What is a data class in Kotlin, and what does it automatically generate for you?",
    answer:
      "A class marked `data class` automatically generates `equals()`/`hashCode()` (structural, value-based equality), a readable `toString()`, and a `copy()` method for creating a modified copy -- eliminates substantial boilerplate that would need to be manually written (or IDE-generated) for a simple data-holding class in plain Java.",
    category: "Classes & Data Classes",
    difficulty: "intermediate",
    codeExample:
      "data class User(val name: String, val age: Int)\nval updated = user.copy(age = 31)",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-classes-04",
    courseSlug: "kotlin-fundamentals",
    question: "What does the `copy()` method generated on a data class let you do?",
    answer:
      "It creates a new instance with the SAME property values as the original, except for any properties you explicitly override -- `user.copy(age = 31)` creates a new `User` with the same `name` but a different `age`, useful for working with immutable data classes without manually reconstructing every field.",
    category: "Classes & Data Classes",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-classes-05",
    courseSlug: "kotlin-fundamentals",
    question: "Why is a data class typically built with `val` properties rather than `var`?",
    answer:
      "Immutable (`val`) data classes are safer to share and reason about, especially combined with `copy()` for creating modified versions rather than mutating in place -- mutable data classes also break the guarantee that `hashCode()` stays stable if used as a key in a hash-based collection, which is a real correctness risk if the object is mutated after insertion.",
    category: "Classes & Data Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-classes-06",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is a Kotlin `object` declaration, and what problem does it solve compared to Java's singleton pattern?",
    answer:
      "`object MyObject { ... }` declares a singleton directly in the language, with the compiler guaranteeing exactly one instance exists -- avoids manually implementing Java's classic singleton pattern (private constructor, static instance field, thread-safe lazy initialization) by hand.",
    category: "Classes & Data Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-classes-07",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is a sealed class in Kotlin, and how does it help with exhaustive `when` expression checking?",
    answer:
      "A sealed class restricts which classes can extend/implement it to a known, closed set defined in the same file/module -- when using a `when` expression over a sealed class's subtypes, the compiler can verify EVERY possible subtype is handled, flagging a compile error if a new subtype is added later and left unhandled somewhere.",
    category: "Classes & Data Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-classes-08",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is the difference between a primary constructor and a secondary constructor in Kotlin?",
    answer:
      "The primary constructor is declared in the class header itself; secondary constructors (`constructor(...) : this(...) { ... }`) provide alternative ways to construct the class, typically delegating to the primary constructor -- most Kotlin classes only need a primary constructor, with secondary constructors reserved for genuinely distinct construction paths.",
    category: "Classes & Data Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-classes-09",
    courseSlug: "kotlin-fundamentals",
    question:
      "What does an `init` block in a Kotlin class do, and when does it run relative to the primary constructor's parameters?",
    answer:
      "An `init` block contains initialization logic executed as part of the primary constructor's execution, in the order it appears relative to property declarations -- useful for validation or setup logic that goes beyond simple property assignment.",
    category: "Classes & Data Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-classes-10",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why might a data class be the wrong choice for a class that represents genuine behavior/identity (like a database connection or a service class), rather than pure data?",
    answer:
      "Data classes' generated `equals`/`hashCode`/`copy` are designed around structural, value-based semantics -- a class representing something with real identity or side-effecting behavior (not just a bundle of values) generally shouldn't rely on value-equality semantics or a naive `copy()`, which wouldn't meaningfully make sense for that kind of object.",
    category: "Classes & Data Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Interfaces, Inheritance & Collections (10) ---
  {
    id: "kotlin-interview-interfaces-01",
    courseSlug: "kotlin-fundamentals",
    question:
      "Can a Kotlin interface provide a default method implementation, unlike a traditional Java interface (pre-Java 8)?",
    answer:
      "Yes -- Kotlin interfaces can include default implementations for their methods, similar to Java 8+'s default methods -- a class implementing the interface can use the default implementation as-is or override it with its own.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-interfaces-02",
    courseSlug: "kotlin-fundamentals",
    question:
      "How does a Kotlin class explicitly opt in to being inheritable, and how does that differ from a method that's overridable?",
    answer:
      "A class must be marked `open` to allow being subclassed at all; individually, a method within an `open` class must ALSO be separately marked `open` to be overridable -- both class-level and method-level extensibility are opt-in, distinct decisions, unlike Java's default-open behavior.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "advanced",
    codeExample:
      'open class Animal {\n  open fun makeSound() = "..."\n}\nclass Dog : Animal() {\n  override fun makeSound() = "Woof"\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-interfaces-03",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is the difference between `List`, `MutableList`, and how does Kotlin's collection type hierarchy encourage immutability by default?",
    answer:
      "`List` exposes only read operations (no add/remove methods available on that reference type); `MutableList` extends it with mutating operations -- functions accepting a plain `List` parameter make it impossible for that function to accidentally modify the caller's collection, since the mutating methods simply aren't in that type's interface.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-interfaces-04",
    courseSlug: "kotlin-fundamentals",
    question:
      "What do Kotlin's `filter`, `map`, and `reduce` collection functions do, similar to their equivalents in other languages?",
    answer:
      "`filter` keeps only elements matching a predicate; `map` transforms each element via a function, producing a new list; `reduce` folds the collection down into a single accumulated value -- a familiar functional-style toolkit for transforming collections declaratively rather than with manual loops.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "intermediate",
    codeExample: "val total = items.filter { it.inStock }.map { it.price }.sum()",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-interfaces-05",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is the difference between `Map` and `MutableMap` in Kotlin, and when would you choose the read-only `Map` type for a function parameter?",
    answer:
      "`Map` exposes only read operations; `MutableMap` adds put/remove operations -- accepting a plain `Map` as a function parameter documents (and enforces at compile time) that the function only reads from it and never mutates the caller's original map.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-interfaces-06",
    courseSlug: "kotlin-fundamentals",
    question: "What does Kotlin's smart casting let you do after a type check (`if (obj is Dog)`)?",
    answer:
      "Inside the branch where the type check succeeded, the compiler automatically treats `obj` as the checked type (`Dog`) without needing an explicit manual cast -- Kotlin's compiler tracks the type check and narrows the variable's type for that scope automatically.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-interfaces-07",
    courseSlug: "kotlin-fundamentals",
    question:
      "How would you handle a scenario where a class needs to implement two interfaces that both provide a default implementation for a method with the same name?",
    answer:
      "The class MUST explicitly override that method itself, resolving the ambiguity -- inside the override, it can still call a specific interface's default implementation using `super<InterfaceName>.methodName()` syntax if it wants to delegate to (or combine) one or both of the original default implementations.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-interfaces-08",
    courseSlug: "kotlin-fundamentals",
    question:
      "What does Kotlin's `Sequence` type offer over a regular `List` for chained operations like `filter().map()`?",
    answer:
      "`Sequence` operations are LAZY, processing elements one at a time through the whole chain rather than fully materializing an intermediate list after each step -- for a long chain of operations over a large collection, this can avoid creating several unnecessary intermediate lists that a chained `List` operation would produce.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-interfaces-09",
    courseSlug: "kotlin-fundamentals",
    question: "What is the difference between `==` and `===` in Kotlin for comparing two objects?",
    answer:
      "`==` calls `.equals()` (structural/value equality, the same as Kotlin's default `==` behavior for most types, including auto-generated data class equality); `===` compares reference identity (are these literally the same object in memory) -- the inverse convention from Java, where `==` is reference comparison by default.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "advanced",
    commonMistake:
      "Assuming Kotlin's == behaves like Java's reference-comparison == by default, when it actually calls .equals() for structural comparison.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-interfaces-10",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why might you choose composition (implementing an interface and delegating via `by`) over inheritance in Kotlin, given classes are final by default?",
    answer:
      "Kotlin's `by` delegation syntax (`class Cache(private val map: MutableMap<String, String>) : MutableMap<String, String> by map`) lets a class reuse another object's implementation of an interface without needing inheritance at all -- combined with `final`-by-default classes, this reinforces Kotlin's general design preference for composition over inheritance where either would work.",
    category: "Interfaces, Inheritance & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Coroutines & Java Interop (10) ---
  {
    id: "kotlin-interview-coroutines-01",
    courseSlug: "kotlin-fundamentals",
    question: "What is a Kotlin coroutine, at a conceptual level?",
    answer:
      "A lightweight, suspendable unit of concurrent execution -- coroutines can be paused ('suspended') and resumed without blocking the underlying OS thread, letting a program run many concurrent operations (especially I/O-bound ones) far more cheaply than spawning a full OS thread per operation.",
    category: "Coroutines & Java Interop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-coroutines-02",
    courseSlug: "kotlin-fundamentals",
    question: "What does the `suspend` keyword on a function mean?",
    answer:
      "It marks a function as being able to pause its execution (suspend) without blocking the underlying thread, and resume later -- a `suspend` function can only be called from within a coroutine (or another `suspend` function), since suspension requires that surrounding coroutine machinery.",
    category: "Coroutines & Java Interop",
    difficulty: "advanced",
    codeExample:
      'suspend fun fetchUser(id: String): User {\n  return apiClient.get("/users/$id")\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-coroutines-03",
    courseSlug: "kotlin-fundamentals",
    question:
      "What does `launch` do when starting a coroutine, and how does it differ from `async`?",
    answer:
      "`launch` starts a coroutine that doesn't return a usable result value (fire-and-forget within the coroutine scope); `async` starts a coroutine that DOES produce a result, returned as a `Deferred<T>` that you later `.await()` to get the actual value -- choose based on whether you need the coroutine's result back.",
    category: "Coroutines & Java Interop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-coroutines-04",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why are coroutines described as much cheaper than threads, in terms of how many you can run concurrently?",
    answer:
      "Threads carry real OS-level overhead (memory for their stack, OS scheduling cost) that limits how many you can practically run concurrently (typically thousands at most); coroutines are managed by the Kotlin runtime itself and don't require a dedicated OS thread each, letting a program run many thousands (or more) concurrent coroutines efficiently.",
    category: "Coroutines & Java Interop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-coroutines-05",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is a `CoroutineScope`, and why does every coroutine need to be launched within one?",
    answer:
      "A scope defines the lifecycle boundary for coroutines launched within it -- when the scope is cancelled (e.g. an Android screen is closed), every coroutine launched in that scope is automatically cancelled too, preventing coroutines from continuing to run pointlessly (or leaking) after their logical context no longer exists.",
    category: "Coroutines & Java Interop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-coroutines-06",
    courseSlug: "kotlin-fundamentals",
    question:
      "What is Kotlin's Java interoperability, and what does it mean that Kotlin classes/functions can be called from Java code (mostly) seamlessly?",
    answer:
      "Since both compile to the same JVM bytecode, a Kotlin class can generally be used from Java code (and vice versa) without special wrapper code -- some Kotlin-specific features (like default arguments, or top-level functions) require Kotlin-aware annotations (`@JvmStatic`, `@JvmOverloads`) to feel fully natural from the Java side, but the two languages fundamentally interoperate.",
    category: "Coroutines & Java Interop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-coroutines-07",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why might calling Kotlin's nullable types from Java code be a place where Kotlin's null-safety guarantees can break down?",
    answer:
      "Java has no equivalent compile-time null-safety enforcement -- Java code calling into Kotlin can still pass `null` to a Kotlin function expecting a non-nullable parameter, since Java doesn't respect or check Kotlin's nullability annotations at compile time, potentially causing a runtime crash Kotlin's own type system was specifically designed to prevent within pure Kotlin code.",
    category: "Coroutines & Java Interop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-coroutines-08",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why might a team choose to adopt Kotlin incrementally in an existing large Java codebase, rather than requiring a full rewrite?",
    answer:
      "Because Kotlin and Java interoperate on the same JVM, new code can be written in Kotlin while existing Java code remains untouched and fully functional, letting a team gain Kotlin's benefits gradually without the risk/cost of a full, all-at-once rewrite of a large, working codebase.",
    category: "Coroutines & Java Interop",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-coroutines-09",
    courseSlug: "kotlin-fundamentals",
    question: "What is structured concurrency, as embodied by Kotlin's coroutine scoping model?",
    answer:
      "The principle that a coroutine's lifetime is bound to (and cannot outlive) its parent scope -- if a parent coroutine/scope is cancelled or fails, all its child coroutines are automatically cancelled too, preventing orphaned, uncontrolled background work that structured concurrency specifically designs against.",
    category: "Coroutines & Java Interop",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "kotlin-interview-coroutines-10",
    courseSlug: "kotlin-fundamentals",
    question:
      "Why is understanding coroutines considered essential for modern Android development specifically, beyond general Kotlin knowledge?",
    answer:
      "Android applications need to perform I/O-bound work (network calls, database access) without blocking the UI thread, which would freeze the app -- coroutines are the officially recommended, idiomatic way to manage this async work in modern Android development, replacing older, more cumbersome patterns like nested callbacks or nested AsyncTask usage.",
    category: "Coroutines & Java Interop",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
