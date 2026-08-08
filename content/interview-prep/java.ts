import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Java Programming Foundations interview-prep questions -- 50 common
 * technical interview questions covering the course's own topics (JVM/
 * bytecode execution model, language fundamentals, control flow/methods/
 * collections, OOP design, exceptions/generics/equality, lambdas/streams,
 * JUnit testing).
 */
export const javaInterviewQuestions: InterviewQuestionInput[] = [
  // --- JVM & Language Fundamentals (10) ---
  {
    id: "java-interview-jvm-01",
    courseSlug: "java-programming-foundations",
    question: "What is the relationship between the JDK, the JVM, and bytecode?",
    answer:
      "The JDK (Java Development Kit) includes the compiler (`javac`) that compiles Java source into platform-independent bytecode; the JVM (Java Virtual Machine) is the runtime that executes that bytecode on a specific platform -- this two-step model is what lets the same compiled bytecode run unmodified on any platform with a compatible JVM ('write once, run anywhere').",
    category: "JVM & Language Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-jvm-02",
    courseSlug: "java-programming-foundations",
    question:
      "What is the difference between a primitive type (like `int`) and a reference type (like `Integer`) in Java?",
    answer:
      "A primitive holds its actual value directly in memory and can never be `null`; a reference type holds a reference to an object on the heap (which could be `null`) and comes with object overhead (methods, potential autoboxing cost) -- `Integer` is the 'boxed' object wrapper around the primitive `int`.",
    category: "JVM & Language Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-jvm-03",
    courseSlug: "java-programming-foundations",
    question:
      "What is autoboxing, and what is a subtle performance/correctness pitfall it can introduce?",
    answer:
      "Automatic conversion between a primitive (`int`) and its wrapper object (`Integer`) -- a pitfall: comparing two boxed `Integer` objects with `==` compares object identity, not value, and can give surprising results for values outside the JVM's small cached-integer range, unlike primitive `int` comparison which always compares value.",
    category: "JVM & Language Fundamentals",
    difficulty: "advanced",
    commonMistake:
      "Comparing two Integer objects with == instead of .equals(), which can silently pass for small cached values but fail for larger ones.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-jvm-04",
    courseSlug: "java-programming-foundations",
    question: "Is Java 'pass by value' or 'pass by reference' for object arguments?",
    answer:
      "Java is strictly pass-by-value -- for object arguments, the VALUE being passed is a copy of the reference (pointer to the object), not the object itself. This means a method can mutate the object the reference points to, but reassigning the parameter itself inside the method does not affect the caller's original variable.",
    category: "JVM & Language Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-jvm-05",
    courseSlug: "java-programming-foundations",
    question:
      "What is the difference between the stack and the heap in Java's memory model, at a basic level?",
    answer:
      "The stack holds method call frames and local primitive variables/references, with automatic cleanup as methods return; the heap holds actual object instances, managed by the garbage collector rather than tied to a specific method call's lifetime.",
    category: "JVM & Language Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-jvm-06",
    courseSlug: "java-programming-foundations",
    question:
      "What is garbage collection, and why doesn't a Java developer typically need to manually free object memory?",
    answer:
      "The JVM automatically identifies objects that are no longer reachable from any active reference and reclaims their memory -- unlike languages requiring manual memory management, Java developers generally don't call anything to 'free' an object; it happens automatically once nothing references it anymore.",
    category: "JVM & Language Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-jvm-07",
    courseSlug: "java-programming-foundations",
    question:
      "What is the difference between `==` and `.equals()` when comparing two `String` objects in Java?",
    answer:
      "`==` compares object reference identity (are these the exact same object in memory); `.equals()` compares actual content/value equality -- two different `String` objects with identical characters are `.equals()` but may not be `==`, which is a very common Java beginner mistake.",
    category: "JVM & Language Fundamentals",
    difficulty: "beginner",
    commonMistake:
      "Comparing two String objects with == instead of .equals(), which can appear to work for string literals due to interning but fails for strings built at runtime.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-jvm-08",
    courseSlug: "java-programming-foundations",
    question: "Why are `String` objects immutable in Java, and what does that mean practically?",
    answer:
      "Once created, a `String`'s content can never be changed -- any operation that appears to 'modify' a string (like concatenation) actually creates and returns a NEW `String` object. This immutability makes strings safe to share across threads and as hash keys without defensive copying.",
    category: "JVM & Language Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-jvm-09",
    courseSlug: "java-programming-foundations",
    question:
      "Why might repeated string concatenation in a loop (`result = result + item;`) be inefficient, and what's the typical fix?",
    answer:
      "Since `String` is immutable, each concatenation creates a brand-new string object, copying all the previous content -- in a loop, this becomes quadratic-time overall; `StringBuilder` (mutable, designed for repeated appends) avoids this by growing an internal buffer instead of creating a new object each time.",
    category: "JVM & Language Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-jvm-10",
    courseSlug: "java-programming-foundations",
    question: "What is method overloading, and how does Java decide which overload to call?",
    answer:
      "Overloading defines multiple methods with the same name but different parameter lists (different type, count, or order) -- the compiler resolves which specific overload to call at compile time, based on the number and static types of the arguments provided in the call.",
    category: "JVM & Language Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Control Flow, Methods & Collections (10) ---
  {
    id: "java-interview-collections-01",
    courseSlug: "java-programming-foundations",
    question: "What is the difference between a Java array and a `List`?",
    answer:
      "An array has a fixed size determined at creation and can hold primitives directly; a `List` (like `ArrayList`) is a resizable collection interface implementation that can grow/shrink dynamically, but can only hold reference types (requiring autoboxing for primitives like `int` -> `Integer`).",
    category: "Control Flow, Methods & Collections",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-collections-02",
    courseSlug: "java-programming-foundations",
    question:
      "What is the difference between `List`, `Set`, and `Map` as core collection types, and when would you reach for each?",
    answer:
      "`List` maintains insertion order and allows duplicates (use when order/duplicates matter, like a queue of tasks); `Set` holds unique elements with no meaningful positional order (use for membership checking without duplicates); `Map` stores key-value pairs (use when you need to look values up by a key).",
    category: "Control Flow, Methods & Collections",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-collections-03",
    courseSlug: "java-programming-foundations",
    question:
      "What is the difference between `ArrayList` and `LinkedList` as `List` implementations, in terms of performance tradeoffs?",
    answer:
      "`ArrayList` is backed by a resizable array -- fast random access by index (O(1)) but slower insertion/removal in the middle (needs shifting elements); `LinkedList` is backed by linked nodes -- fast insertion/removal at known positions (O(1) given a reference to that node) but slower random access (O(n), must traverse from an end).",
    category: "Control Flow, Methods & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-collections-04",
    courseSlug: "java-programming-foundations",
    question: "What is a `for-each` loop, and what kind of objects can you iterate with it?",
    answer:
      "`for (Type item : collection) { ... }` -- a concise loop form for iterating any object implementing `Iterable` (arrays, `List`, `Set`, and more), reading each element in turn without manually managing an index/iterator.",
    category: "Control Flow, Methods & Collections",
    difficulty: "beginner",
    codeExample: "for (String name : names) {\n  System.out.println(name);\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-collections-05",
    courseSlug: "java-programming-foundations",
    question:
      "Why does a `HashMap` require correctly-implemented `hashCode()` and `equals()` on its keys to work correctly?",
    answer:
      "`HashMap` uses a key's `hashCode()` to decide which internal bucket to store it in, then `equals()` to distinguish between different keys that happen to land in the same bucket -- a broken or missing override of either can cause lookups to fail to find an entry that was genuinely stored, or treat two logically-equal keys as different.",
    category: "Control Flow, Methods & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-collections-06",
    courseSlug: "java-programming-foundations",
    question: "What is the difference between method parameters and method arguments?",
    answer:
      'Parameters are the named variables declared in a method\'s signature (`void greet(String name)` -- `name` is the parameter); arguments are the actual values passed when calling that method (`greet("Asha")` -- `"Asha"` is the argument) -- a common but minor terminology distinction.',
    category: "Control Flow, Methods & Collections",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-collections-07",
    courseSlug: "java-programming-foundations",
    question: "What does the `static` keyword mean when applied to a method or field?",
    answer:
      "A `static` member belongs to the class itself, not to any individual instance -- it can be accessed without creating an object (`ClassName.method()`), and all instances share the exact same `static` field rather than each having their own copy.",
    category: "Control Flow, Methods & Collections",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-collections-08",
    courseSlug: "java-programming-foundations",
    question:
      "What is the difference between a `switch` statement and a `switch` expression in modern Java?",
    answer:
      "A `switch` statement executes code per matched case without necessarily returning a value (and traditionally needs explicit `break` to avoid fall-through); a `switch` expression (newer syntax, using `->`) directly evaluates to a value, with no fall-through and more concise arrow-case syntax.",
    category: "Control Flow, Methods & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-collections-09",
    courseSlug: "java-programming-foundations",
    question:
      "Why is forgetting a `break` in a traditional `switch` statement (fall-through) a classic Java bug?",
    answer:
      "Without an explicit `break`, execution continues into the NEXT case's code after a match, rather than stopping -- often unintended, and a well-known source of bugs in traditional `switch` statements (part of why the newer arrow-based `switch` expression syntax removed fall-through by default).",
    category: "Control Flow, Methods & Collections",
    difficulty: "intermediate",
    commonMistake:
      "Forgetting a break statement in a traditional switch, causing execution to unintentionally fall through into the next case.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-collections-10",
    courseSlug: "java-programming-foundations",
    question:
      "Why might you choose a `TreeMap` over a `HashMap`, given `HashMap`'s generally faster average performance?",
    answer:
      "`TreeMap` keeps its keys in sorted order (based on natural ordering or a provided comparator), which `HashMap` does not guarantee at all -- if you need to iterate keys in sorted order, or efficiently find the nearest key above/below a value, `TreeMap`'s extra performance cost is worth the ordering guarantee.",
    category: "Control Flow, Methods & Collections",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Object-Oriented Design (10) ---
  {
    id: "java-interview-oop-01",
    courseSlug: "java-programming-foundations",
    question: "What is encapsulation, and how is it typically implemented in Java?",
    answer:
      "Bundling an object's internal data with the methods that operate on it, and restricting direct external access to that data -- typically implemented with `private` fields plus public getter/setter methods (only where actually needed), so the class controls how its own state can be read or modified.",
    category: "Object-Oriented Design",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-oop-02",
    courseSlug: "java-programming-foundations",
    question:
      "What is the difference between inheritance and composition, and when might 'favor composition over inheritance' apply?",
    answer:
      "Inheritance ('is-a') creates a tight, hierarchical coupling where a subclass inherits and can be affected by its parent's implementation details; composition ('has-a') builds behavior by combining smaller, independent objects as fields -- composition is often preferred when the relationship isn't a genuine specialization, since it's more flexible and avoids fragile deep inheritance hierarchies.",
    category: "Object-Oriented Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-oop-03",
    courseSlug: "java-programming-foundations",
    question: "What is the difference between an abstract class and an interface in Java?",
    answer:
      "An abstract class can have both abstract (unimplemented) and concrete (implemented) methods plus instance state, and a class can extend only ONE abstract class; an interface traditionally declares method signatures a class must implement (with modern Java also allowing default/static method bodies), and a class can implement MULTIPLE interfaces.",
    category: "Object-Oriented Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-oop-04",
    courseSlug: "java-programming-foundations",
    question:
      "What is polymorphism, and how does it show up when calling a method through a supertype reference?",
    answer:
      "The ability for different classes to be treated through a common supertype/interface, with the actual method implementation invoked determined by the object's real runtime type -- calling `shape.area()` on a variable declared as `Shape` but actually holding a `Circle` instance invokes `Circle`'s specific implementation, not a generic `Shape` one.",
    category: "Object-Oriented Design",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-oop-05",
    courseSlug: "java-programming-foundations",
    question:
      "What does the `@Override` annotation do, and why is it good practice to always include it when overriding a method?",
    answer:
      "It's a compile-time check confirming the annotated method actually overrides a method from a superclass/interface -- if you mistype the method signature (wrong parameter types, a typo in the name), `@Override` causes a compile error instead of silently creating an unrelated new method that never actually overrides anything.",
    category: "Object-Oriented Design",
    difficulty: "intermediate",
    commonMistake:
      "Slightly mistyping an overridden method's signature without @Override, silently creating a new, unrelated method instead of a real override.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-oop-06",
    courseSlug: "java-programming-foundations",
    question: "What is a constructor, and what happens if a class defines no constructor at all?",
    answer:
      "A special method that initializes a newly-created object's state, called via `new ClassName(...)` -- if a class defines no constructor, Java provides a default, no-argument constructor automatically (but this disappears the moment you define ANY constructor yourself, requiring an explicit no-arg one if still needed).",
    category: "Object-Oriented Design",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-oop-07",
    courseSlug: "java-programming-foundations",
    question:
      "What does the `final` keyword mean when applied to a class, a method, or a variable, respectively?",
    answer:
      "On a class, it prevents the class from being subclassed at all; on a method, it prevents that method from being overridden by a subclass; on a variable, it prevents reassignment after initial assignment (though for a reference type, the object it points to can still be internally mutated).",
    category: "Object-Oriented Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-oop-08",
    courseSlug: "java-programming-foundations",
    question:
      "Why might designing a class's fields as `private final`, set only in the constructor, be a good default for a simple data-modeling class?",
    answer:
      "It produces an immutable object -- once constructed, its state can never change, which eliminates a whole class of bugs from unexpected mutation and makes the object inherently safe to share across threads without synchronization.",
    category: "Object-Oriented Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-oop-09",
    courseSlug: "java-programming-foundations",
    question:
      "What is the purpose of a `protected` access modifier, and how does it differ from `private` and `public`?",
    answer:
      "`protected` members are accessible within the same class, the same package, and by subclasses (even in different packages) -- more open than `private` (same class only) but more restricted than `public` (accessible from anywhere) -- typically used for members a subclass genuinely needs to access/override but that shouldn't be part of the class's fully public API.",
    category: "Object-Oriented Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-oop-10",
    courseSlug: "java-programming-foundations",
    question:
      "Why is designing a small domain model with clear interfaces (e.g. a `PaymentMethod` interface implemented by `CreditCard` and `PayPal`) valuable for extensibility?",
    answer:
      "New payment method types can be added later by implementing the same interface, without modifying the existing code that already works against `PaymentMethod` generically -- code written against the abstraction stays stable even as concrete implementations are added, a real-world benefit of designing to interfaces.",
    category: "Object-Oriented Design",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Exceptions, Generics & Equality (10) ---
  {
    id: "java-interview-exceptions-01",
    courseSlug: "java-programming-foundations",
    question:
      "What is the difference between a checked exception and an unchecked exception in Java?",
    answer:
      "A checked exception (extending `Exception` but not `RuntimeException`) must be either caught or declared in the method's `throws` clause -- the compiler enforces handling it; an unchecked exception (extending `RuntimeException`) requires no such declaration and typically represents a programming error that could occur almost anywhere.",
    category: "Exceptions, Generics & Equality",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-exceptions-02",
    courseSlug: "java-programming-foundations",
    question:
      "Why is catching a broad `Exception` (or worse, `Throwable`) and doing nothing with it ('swallowing' it) generally a bad practice?",
    answer:
      "It silently discards information about a real failure, making the program appear to succeed when something actually went wrong -- the failure surfaces later, in a confusing, disconnected way (or never surfaces at all), making the root cause far harder to diagnose than if the exception had been logged or allowed to propagate.",
    category: "Exceptions, Generics & Equality",
    difficulty: "intermediate",
    commonMistake:
      "Catching a broad Exception with an empty catch block, silently swallowing a real failure instead of logging or handling it.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-exceptions-03",
    courseSlug: "java-programming-foundations",
    question: "What is try-with-resources, and what problem does it solve?",
    answer:
      "A `try (Resource r = ...) { ... }` syntax that automatically closes any resource implementing `AutoCloseable` (like a file or database connection) once the block exits, even if an exception was thrown -- it solves the resource-leak risk of manually calling `close()` in a `finally` block, which is easy to forget or get wrong.",
    category: "Exceptions, Generics & Equality",
    difficulty: "advanced",
    codeExample:
      "try (BufferedReader reader = new BufferedReader(new FileReader(path))) {\n  return reader.readLine();\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-exceptions-04",
    courseSlug: "java-programming-foundations",
    question:
      "What is a Java generic type, and what problem does it solve compared to using `Object` for a general-purpose container?",
    answer:
      "A generic (like `List<String>`) lets a class/method work with a specified type while the compiler enforces type-correctness at compile time -- using raw `Object` instead loses that safety, requiring manual casts (which can fail at runtime with a `ClassCastException`) that generics catch as compile errors instead.",
    category: "Exceptions, Generics & Equality",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-exceptions-05",
    courseSlug: "java-programming-foundations",
    question:
      "What is the 'equals/hashCode contract,' and why must both be overridden together, never just one?",
    answer:
      "The contract requires that two objects considered `.equals()` MUST have the same `hashCode()` -- overriding only `equals()` (leaving the default identity-based `hashCode()`) breaks hash-based collections like `HashMap`/`HashSet`, since 'equal' objects could land in different buckets and never be found as duplicates.",
    category: "Exceptions, Generics & Equality",
    difficulty: "advanced",
    commonMistake:
      "Overriding equals() without also overriding hashCode(), breaking the contract hash-based collections rely on.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-exceptions-06",
    courseSlug: "java-programming-foundations",
    question:
      "What does it mean for a custom exception class to extend `RuntimeException` versus `Exception` directly?",
    answer:
      "Extending `Exception` directly makes it a checked exception (callers must handle or declare it); extending `RuntimeException` makes it unchecked -- the choice signals whether callers are realistically expected to recover from this specific failure (checked) or whether it typically represents a programming error not meant to be routinely caught (unchecked).",
    category: "Exceptions, Generics & Equality",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-exceptions-07",
    courseSlug: "java-programming-foundations",
    question: "What is a bounded type parameter in generics, e.g. `<T extends Comparable<T>>`?",
    answer:
      "It restricts a generic type parameter to only types that satisfy a given constraint -- here, `T` must implement `Comparable<T>`, letting a generic method safely call `.compareTo()` on values of type `T`, which an unbounded `<T>` wouldn't allow since arbitrary `Object` doesn't have that method.",
    category: "Exceptions, Generics & Equality",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-exceptions-08",
    courseSlug: "java-programming-foundations",
    question:
      "Why might an exception message like 'error' be significantly less useful than 'Failed to parse order ID \"abc\": expected a numeric value'?",
    answer:
      "A vague message gives no actionable information about what actually went wrong or why -- a specific message including the relevant input/context lets whoever reads it (a developer debugging, or a log-monitoring system) understand and act on the failure immediately, without needing to reproduce it from scratch.",
    category: "Exceptions, Generics & Equality",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-exceptions-09",
    courseSlug: "java-programming-foundations",
    question: "What does it mean to 'wrap and rethrow' an exception, and why might you do it?",
    answer:
      "Catching a lower-level exception and throwing a new, higher-level exception that includes the original as its 'cause' -- useful for translating a low-level implementation detail (a database driver's specific exception type) into a more meaningful, application-level exception, while preserving the original stack trace via the cause chain for debugging.",
    category: "Exceptions, Generics & Equality",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-exceptions-10",
    courseSlug: "java-programming-foundations",
    question:
      "Why is immutability (an object whose state can't change after construction) often paired with a carefully-implemented `equals()`/`hashCode()`?",
    answer:
      "If an object used as a `HashMap` key or `HashSet` member is mutated after insertion, its hash code can change, breaking the collection's internal bucket-based lookup (the object effectively becomes 'lost,' unfindable at its original hash location) -- immutability guarantees the hash code stays stable for the object's entire lifetime.",
    category: "Exceptions, Generics & Equality",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Lambdas, Streams & Testing (10) ---
  {
    id: "java-interview-streams-01",
    courseSlug: "java-programming-foundations",
    question:
      "What is a lambda expression in Java, and what problem does it solve compared to an anonymous inner class?",
    answer:
      "A concise syntax for representing a single-method functional interface implementation inline (`x -> x * 2`) -- it solves the verbosity of Java's older anonymous-inner-class syntax for the same purpose, without changing the underlying functional-interface mechanism.",
    category: "Lambdas, Streams & Testing",
    difficulty: "intermediate",
    codeExample: "list.forEach(item -> System.out.println(item));",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-streams-02",
    courseSlug: "java-programming-foundations",
    question:
      "What is the Stream API used for, and how does `stream().filter(...).map(...).collect(...)` express a data pipeline?",
    answer:
      "It provides a functional-style API for processing sequences of elements (filter, transform, aggregate) as a declarative pipeline, rather than manually writing imperative loops -- `filter` keeps only matching elements, `map` transforms each remaining element, `collect` gathers the final results into a concrete collection.",
    category: "Lambdas, Streams & Testing",
    difficulty: "intermediate",
    codeExample:
      "List<String> names = users.stream()\n  .filter(u -> u.isActive())\n  .map(User::getName)\n  .collect(Collectors.toList());",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-streams-03",
    courseSlug: "java-programming-foundations",
    question:
      "Are Java streams lazy or eager, and why does that matter for a pipeline of `filter`/`map` operations?",
    answer:
      "Intermediate operations (`filter`, `map`) are lazy -- they don't actually run until a terminal operation (`collect`, `forEach`, `count`) is invoked, at which point the whole pipeline processes each element through every step in a single pass, rather than each intermediate step fully processing the whole collection before the next.",
    category: "Lambdas, Streams & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-streams-04",
    courseSlug: "java-programming-foundations",
    question:
      "Can a Java `Stream` be consumed (iterated with a terminal operation) more than once?",
    answer:
      "No -- a stream can only be traversed once; calling a terminal operation on an already-consumed stream throws an `IllegalStateException`. If you need to process the same source data multiple times, you must create a fresh stream from the original source each time.",
    category: "Lambdas, Streams & Testing",
    difficulty: "advanced",
    commonMistake:
      "Attempting to reuse the same Stream object for a second terminal operation after it's already been consumed once.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-streams-05",
    courseSlug: "java-programming-foundations",
    question:
      "What is a method reference (like `User::getName`), and how does it relate to a lambda expression?",
    answer:
      "A shorthand syntax for a lambda that just calls an existing method -- `User::getName` is equivalent to writing `u -> u.getName()`, more concise when the lambda's entire body is a single existing method call.",
    category: "Lambdas, Streams & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-streams-06",
    courseSlug: "java-programming-foundations",
    question:
      "What is the difference between `Optional<T>` and simply returning `null` to represent 'no value'?",
    answer:
      "`Optional` makes the possibility of absence explicit in the method's return TYPE, forcing callers to deliberately handle the empty case (via `.isPresent()`, `.orElse()`, etc.) rather than risking an unchecked `NullPointerException` from an easily-overlooked `null` return that the type signature gave no hint about.",
    category: "Lambdas, Streams & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-streams-07",
    courseSlug: "java-programming-foundations",
    question:
      "What does a JUnit test method typically look like, and what annotation marks it as a test?",
    answer:
      "A method annotated `@Test`, containing assertions (like `assertEquals(expected, actual)`) that verify expected behavior -- JUnit's test runner discovers and executes every `@Test`-annotated method, reporting pass/fail for each independently.",
    category: "Lambdas, Streams & Testing",
    difficulty: "beginner",
    codeExample: "@Test\nvoid addsTwoNumbers() {\n  assertEquals(5, Calculator.add(2, 3));\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-streams-08",
    courseSlug: "java-programming-foundations",
    question: "What is the difference between `@BeforeEach` and `@BeforeAll` in JUnit?",
    answer:
      "`@BeforeEach` runs before EVERY individual test method in the class (useful for resetting shared state so tests don't interfere with each other); `@BeforeAll` runs ONCE before all tests in the class (useful for expensive one-time setup, and must be a `static` method).",
    category: "Lambdas, Streams & Testing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-streams-09",
    courseSlug: "java-programming-foundations",
    question:
      "Why might overusing complex, deeply-chained stream pipelines actually hurt code readability compared to a well-named traditional loop?",
    answer:
      "A stream expression packs a lot of logic densely into one line/expression, which can become genuinely harder to read and debug than an equivalent, clearly-named imperative loop once the transformation logic gets complex -- streams are a tool for expressing clear data pipelines, not an automatic readability win in every situation.",
    category: "Lambdas, Streams & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "java-interview-streams-10",
    courseSlug: "java-programming-foundations",
    question:
      "Why should JUnit tests be independent of each other (not relying on execution order or shared mutable state)?",
    answer:
      "Test frameworks don't guarantee a specific execution order by default, and tests may run in parallel -- a test that depends on another test having run first (or on leftover shared state) can pass or fail unpredictably depending on execution order, making failures much harder to diagnose and reproduce reliably.",
    category: "Lambdas, Streams & Testing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
