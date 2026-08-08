import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * C++ Programming interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (what C++ adds
 * over C, references/auto/overloading, classes/constructors/destructors/
 * encapsulation, RAII/smart pointers/references-vs-pointers, templates/
 * STL, inheritance/polymorphism).
 */
export const cppInterviewQuestions: InterviewQuestionInput[] = [
  // --- C++ Fundamentals: What C++ Adds Over C (10) ---
  {
    id: "cpp-interview-fundamentals-01",
    courseSlug: "cpp-programming",
    question: "At a high level, what does C++ add on top of plain C?",
    answer:
      "Object-oriented features (classes, inheritance, polymorphism), references, function/operator overloading, templates for generic programming, RAII-based resource management, exceptions, and the Standard Template Library -- while remaining largely (though not perfectly) backward-compatible with C.",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-fundamentals-02",
    courseSlug: "cpp-programming",
    question: "What is a reference in C++, and how does it differ from a pointer?",
    answer:
      "A reference (`int &r = x;`) is an alias for an existing variable -- unlike a pointer, it must be initialized when declared, can never be reassigned to refer to something else, and can never be `null`, making it generally safer (and syntactically simpler, no `*`/`&` dereferencing needed) for cases where those constraints are acceptable.",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "intermediate",
    codeExample: "int x = 5;\nint &r = x;\nr = 10;  // x is now 10",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-fundamentals-03",
    courseSlug: "cpp-programming",
    question: "What does the `auto` keyword do in modern C++?",
    answer:
      "It lets the compiler infer a variable's type from its initializer, rather than the developer writing it out explicitly -- useful for reducing verbosity, especially with complex template-derived types (like iterator types), while still keeping full static type safety since the type is determined at compile time.",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "intermediate",
    codeExample:
      "auto count = 5;         // inferred as int\nauto it = vec.begin();  // inferred as the iterator type",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-fundamentals-04",
    courseSlug: "cpp-programming",
    question:
      "What is function overloading, and how does the compiler decide which overload to call?",
    answer:
      "Defining multiple functions with the same name but different parameter lists (different types, count, or order) -- the compiler resolves which specific overload to invoke at COMPILE time, based on the number and static types of the arguments in each specific call.",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-fundamentals-05",
    courseSlug: "cpp-programming",
    question:
      "What is operator overloading, and give an example of when it's genuinely useful (versus when it can hurt readability)?",
    answer:
      "Defining custom behavior for an operator (`+`, `==`) when applied to a user-defined type -- genuinely useful for types with a natural mathematical/comparison meaning (like a `Vector2D` class supporting `+`); can hurt readability when overloaded in a way that doesn't match the operator's normal intuitive meaning (e.g. `+` doing something unrelated to addition).",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-fundamentals-06",
    courseSlug: "cpp-programming",
    question:
      "Why is C++ generally described as 'a superset of C, mostly,' rather than a strictly compatible extension?",
    answer:
      "Most valid C code compiles as valid C++, but there are real, if uncommon, differences (like C's implicit `void*` to other pointer type conversion not being allowed without a cast in C++) -- 'mostly compatible' is more accurate than 'perfectly compatible.'",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-fundamentals-07",
    courseSlug: "cpp-programming",
    question:
      "What does C++'s exception handling (`try`/`catch`/`throw`) let you do that plain C's error-code-return convention cannot as cleanly?",
    answer:
      "Exceptions let error handling be separated from the normal control-flow path, propagating automatically up the call stack until caught, rather than requiring every intermediate function to explicitly check and propagate an error code -- a tradeoff between control-flow clarity and the explicitness of C-style error codes, with real performance/design implications either way.",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-fundamentals-08",
    courseSlug: "cpp-programming",
    question: "What is the C++ Standard Template Library (STL), broadly?",
    answer:
      "A collection of generic, reusable containers (vector, map, set), algorithms (sort, find), and iterators built using templates -- provides battle-tested, efficient implementations of common data structures/algorithms so developers rarely need to hand-write them from scratch.",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-fundamentals-09",
    courseSlug: "cpp-programming",
    question:
      "Why does C++ remain foundational for games, finance, and high-performance systems specifically, despite the availability of higher-level languages?",
    answer:
      "It offers fine-grained control over memory and performance (comparable to C) while also providing higher-level abstractions (classes, templates, RAII) that make large, complex systems more manageable -- a combination of raw performance and structured abstraction that domains with strict latency/throughput requirements specifically value.",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-fundamentals-10",
    courseSlug: "cpp-programming",
    question:
      "Why might reading and predicting the output of a small C++ program (involving constructors/destructors/references) be a genuinely useful interview exercise?",
    answer:
      "It tests whether you understand exactly WHEN constructors/destructors run (especially with temporaries, copies, and scope exits) and how references alias variables -- C++'s object lifecycle has enough subtlety that accurately tracing through code is a stronger signal of understanding than reciting definitions.",
    category: "C++ Fundamentals: What C++ Adds Over C",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Classes, Constructors & Encapsulation (10) ---
  {
    id: "cpp-interview-classes-01",
    courseSlug: "cpp-programming",
    question: "What is the difference between `struct` and `class` in C++?",
    answer:
      "Functionally nearly identical -- the only real difference is the DEFAULT access level: `struct` members are `public` by default, `class` members are `private` by default. Convention typically uses `struct` for simple data-holding types and `class` for types with real encapsulated behavior/invariants.",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-classes-02",
    courseSlug: "cpp-programming",
    question: "What is a constructor, and what does it guarantee about a newly-created object?",
    answer:
      "A special member function automatically called when an object is created, responsible for initializing its state -- it guarantees an object is never left in a truly uninitialized state after construction, as long as the constructor itself correctly initializes every member.",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-classes-03",
    courseSlug: "cpp-programming",
    question: "What is a destructor, and when does it get called?",
    answer:
      "A special member function (`~ClassName()`) automatically called when an object's lifetime ends -- for a stack-allocated object, when it goes out of scope; for a heap-allocated object via `new`, when explicitly `delete`d (or, with a smart pointer, automatically when the last owning reference is destroyed).",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-classes-04",
    courseSlug: "cpp-programming",
    question:
      "What is the difference between the `public`, `private`, and `protected` access specifiers?",
    answer:
      "`public` members are accessible from anywhere; `private` members are accessible only within the class itself; `protected` members are accessible within the class and by its derived (subclass) classes but not from outside -- these control encapsulation, deciding what's part of a class's exposed interface versus internal implementation.",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-classes-05",
    courseSlug: "cpp-programming",
    question: "What is a copy constructor, and when is it automatically invoked?",
    answer:
      "A constructor that initializes a new object as a copy of an EXISTING object of the same type -- automatically invoked when an object is passed by value, returned by value (in some cases), or explicitly copy-initialized (`ClassName b(a);` or `ClassName b = a;`).",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-classes-06",
    courseSlug: "cpp-programming",
    question:
      "Why is the compiler-generated default copy constructor dangerous for a class that manages a raw pointer/resource internally?",
    answer:
      "The default copy constructor performs a SHALLOW copy (copying the pointer value itself, not what it points to) -- two objects end up pointing at the SAME underlying resource, so when one is destroyed and frees it, the other is left with a dangling pointer, and if both are destroyed, the resource gets double-freed.",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "advanced",
    commonMistake:
      "Relying on the compiler-generated default copy constructor for a class managing a raw resource, causing a shallow copy and a later double-free or dangling pointer.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-classes-07",
    courseSlug: "cpp-programming",
    question:
      "What is member initializer list syntax (`Point(int x, int y) : x_(x), y_(y) {}`), and why is it generally preferred over assigning members inside the constructor body?",
    answer:
      "It initializes members directly at construction time, rather than default-constructing them first and then reassigning inside the body -- more efficient (avoids a redundant default-construct-then-assign step) and REQUIRED for `const` members and reference members, which can't be assigned after initialization at all.",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-classes-08",
    courseSlug: "cpp-programming",
    question:
      "What does it mean for a class to have multiple constructors (constructor overloading)?",
    answer:
      "A class can define several constructors with different parameter lists, letting objects be constructed different ways (e.g. a default constructor with no arguments, and another taking initial values) -- the compiler selects the appropriate one based on the arguments provided at the object's creation.",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-classes-09",
    courseSlug: "cpp-programming",
    question: "What does declaring a member function `const` (e.g. `int getValue() const;`) mean?",
    answer:
      "It promises the method will NOT modify the object's state -- lets that method be called on a `const` instance of the class (which would otherwise be forbidden), and the compiler enforces the promise by rejecting any attempt inside the method body to modify a non-`mutable` member.",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-classes-10",
    courseSlug: "cpp-programming",
    question:
      "Why does encapsulation (keeping data `private` and exposing controlled access via methods) matter for maintaining a class's internal invariants?",
    answer:
      "If internal data is directly `public`, any external code can put the object into an inconsistent state that violates assumptions the class's own methods rely on -- encapsulation lets the class guarantee its invariants (e.g. 'balance is never negative') hold at all times, since every state change must go through methods that can enforce that rule.",
    category: "Classes, Constructors & Encapsulation",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- RAII, Smart Pointers & References vs. Pointers (10) ---
  {
    id: "cpp-interview-raii-01",
    courseSlug: "cpp-programming",
    question:
      "What does RAII (Resource Acquisition Is Initialization) mean, and what problem does it solve?",
    answer:
      "A pattern where a resource (memory, a file handle, a lock) is acquired in a constructor and automatically released in the destructor -- since C++ guarantees destructors run when an object goes out of scope (even during exception unwinding), RAII ties resource cleanup to object lifetime, making leaks far less likely than manual, error-prone acquire/release calls.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-raii-02",
    courseSlug: "cpp-programming",
    question: "What is `std::unique_ptr`, and what ownership model does it enforce?",
    answer:
      "A smart pointer representing SOLE ownership of a dynamically-allocated object -- it can't be copied (only moved), and automatically deletes the owned object when the `unique_ptr` itself is destroyed, ensuring exactly one owner and automatic cleanup with no manual `delete` needed.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "advanced",
    codeExample:
      "std::unique_ptr<Widget> w = std::make_unique<Widget>();\n// automatically deleted when w goes out of scope",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-raii-03",
    courseSlug: "cpp-programming",
    question:
      "What is `std::shared_ptr`, and how does it decide when to actually delete the owned object?",
    answer:
      "A smart pointer allowing MULTIPLE owners of the same object, tracked via a reference count -- the object is automatically deleted only once the LAST owning `shared_ptr` is destroyed (reference count reaches zero), letting ownership be genuinely shared across multiple parts of a program.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-raii-04",
    courseSlug: "cpp-programming",
    question: "Why are smart pointers strongly preferred over raw `new`/`delete` in modern C++?",
    answer:
      "Manual `new`/`delete` requires the developer to correctly match every allocation with exactly one deallocation, on every code path (including exception paths) -- easy to get wrong, leading to leaks or double-frees; smart pointers automate this via RAII, making resource management far more reliable by default.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "intermediate",
    commonMistake:
      "Reaching for raw new/delete in modern C++ instead of an appropriate smart pointer, reintroducing manual memory-management risk unnecessarily.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-raii-05",
    courseSlug: "cpp-programming",
    question:
      "What is `std::weak_ptr`, and what problem does it solve that `shared_ptr` alone cannot?",
    answer:
      "A non-owning reference to an object managed by a `shared_ptr`, which doesn't affect the reference count -- specifically solves the reference-cycle problem (two `shared_ptr`s pointing at each other, each keeping the other's reference count above zero forever, leaking both) by letting one side hold a non-owning `weak_ptr` instead.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-raii-06",
    courseSlug: "cpp-programming",
    question:
      "Why is `std::make_unique<T>()` generally preferred over `std::unique_ptr<T>(new T())`?",
    answer:
      "`make_unique` avoids a subtle exception-safety pitfall in some expressions where a raw `new` and its wrapping in a smart pointer aren't guaranteed to happen in a single, uninterruptible step -- it's also more concise and avoids writing the type name twice.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-raii-07",
    courseSlug: "cpp-programming",
    question:
      "When would you choose a reference parameter (`void process(Widget &w)`) over a pointer parameter (`void process(Widget *w)`)?",
    answer:
      "Use a reference when the parameter is guaranteed to always refer to a valid, existing object (references can't be null and can't be reassigned) -- use a pointer when the parameter might legitimately be absent (`nullptr`) or when you need to represent 'no object' as a distinct, valid state.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-raii-08",
    courseSlug: "cpp-programming",
    question:
      "What is the 'Rule of Three' (or its modern extension, the 'Rule of Five'), and why does it matter for a class managing a resource manually?",
    answer:
      "If a class needs a custom destructor, it almost certainly also needs a custom copy constructor and copy assignment operator (Rule of Three) -- extended to five in modern C++ to also cover move constructor and move assignment -- because the compiler's default versions of these likely do the wrong (shallow-copy) thing for a class managing a resource.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-raii-09",
    courseSlug: "cpp-programming",
    question:
      "What is move semantics (`std::move`), and what problem does it solve compared to always copying?",
    answer:
      "Move semantics let a resource (like a large `vector`'s internal buffer) be TRANSFERRED from one object to another, cheaply (just repointing internal pointers), instead of expensively deep-copying its entire contents -- especially valuable when a temporary/about-to-be-destroyed object's resources can simply be 'stolen' rather than copied.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-raii-10",
    courseSlug: "cpp-programming",
    question:
      "Why does using smart pointers and RAII generally still require SOME care, even though they eliminate most manual memory-management bugs?",
    answer:
      "Smart pointers eliminate manual new/delete mismatches, but you can still create logical errors (like a reference cycle with two `shared_ptr`s, or storing a raw pointer/reference to data whose owning smart pointer has already been destroyed) -- RAII/smart pointers reduce the RISK surface significantly but don't make correct resource management entirely automatic.",
    category: "RAII, Smart Pointers & References vs. Pointers",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Templates & STL (10) ---
  {
    id: "cpp-interview-templates-01",
    courseSlug: "cpp-programming",
    question: "What is a C++ template, and what problem does it solve?",
    answer:
      "A way to write generic code (a function or class) that works with any type, with the actual type filled in at COMPILE time -- solves the problem of needing to duplicate near-identical logic for every different type (e.g. a `max` function that works for `int`, `double`, or any comparable type) without sacrificing static type safety.",
    category: "Templates & STL",
    difficulty: "intermediate",
    codeExample: "template <typename T>\nT max(T a, T b) { return a > b ? a : b; }",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-templates-02",
    courseSlug: "cpp-programming",
    question:
      "How does template instantiation work -- does the compiler generate separate code for each type a template is used with?",
    answer:
      "Yes -- the compiler generates a distinct, fully-typed version of the template's code for each unique combination of types it's actually instantiated with, at compile time -- this is why template code errors sometimes only surface when the template is actually used with a specific type, not when the template itself is defined.",
    category: "Templates & STL",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-templates-03",
    courseSlug: "cpp-programming",
    question:
      "What is `std::vector`, and why is it usually the default choice for a dynamic array/list in C++?",
    answer:
      "A resizable, contiguous-memory array container from the STL -- it's usually the default choice because contiguous memory gives good cache locality/performance for most access patterns, and it provides safe, well-tested resizing, indexing, and iteration compared to hand-managing a raw dynamic array.",
    category: "Templates & STL",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-templates-04",
    courseSlug: "cpp-programming",
    question:
      "What is an iterator in the STL, and what abstraction does it provide over different container types?",
    answer:
      "An object providing a uniform way to traverse a container's elements (similar in spirit to a generalized pointer) -- the same STL algorithms (`sort`, `find`) can work across very different underlying container types (vector, list, set) because they operate through this common iterator interface rather than each container's specific internal structure.",
    category: "Templates & STL",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-templates-05",
    courseSlug: "cpp-programming",
    question:
      "What does `std::sort` from the STL algorithms library let you do, and why is it generally preferred over hand-writing a sort function?",
    answer:
      "It sorts a range (given by begin/end iterators) using a highly-optimized, well-tested implementation -- reaching for it instead of hand-writing a sort avoids re-implementing (and likely introducing bugs into) something the standard library already provides efficiently and correctly.",
    category: "Templates & STL",
    difficulty: "intermediate",
    codeExample: "std::sort(numbers.begin(), numbers.end());",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-templates-06",
    courseSlug: "cpp-programming",
    question:
      "What is the difference between `std::vector`, `std::list`, and `std::map` in terms of their underlying structure and access patterns?",
    answer:
      "`vector` is a contiguous dynamic array (fast random access, slower middle insertion); `list` is a doubly-linked list (fast insertion/removal anywhere given an iterator, slow random access); `map` is typically a balanced binary search tree keeping keys sorted (O(log n) lookup, insertion, ordered iteration).",
    category: "Templates & STL",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-templates-07",
    courseSlug: "cpp-programming",
    question:
      "What is a lambda expression in C++, and how is it commonly used with STL algorithms?",
    answer:
      "An inline, anonymous function definition (`[](int x) { return x > 0; }`) -- commonly passed directly as a predicate/comparator to STL algorithms (`std::sort`, `std::find_if`) without needing to separately define a named function elsewhere just for that one-off use.",
    category: "Templates & STL",
    difficulty: "advanced",
    codeExample:
      "std::sort(items.begin(), items.end(), [](const Item &a, const Item &b) {\n  return a.price < b.price;\n});",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-templates-08",
    courseSlug: "cpp-programming",
    question:
      "What does capturing a variable by reference (`[&x]`) versus by value (`[x]`) mean in a C++ lambda?",
    answer:
      "Capturing by value copies the variable's value at the time the lambda is created, unaffected by later changes to the original; capturing by reference lets the lambda see (and potentially modify) the actual original variable, reflecting whatever its value is when the lambda is eventually called.",
    category: "Templates & STL",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-templates-09",
    courseSlug: "cpp-programming",
    question:
      "Why might overusing deeply-nested or highly generic templates hurt a codebase's readability and compile times?",
    answer:
      "Heavy template metaprogramming can produce genuinely difficult-to-read compiler error messages and significantly slower compilation (since each instantiation generates new code) -- templates are a powerful tool, but excessive or unnecessarily generic use trades real readability/build-speed costs for flexibility that may not actually be needed.",
    category: "Templates & STL",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-templates-10",
    courseSlug: "cpp-programming",
    question:
      "Why is reaching for the STL's existing containers/algorithms usually preferred over hand-rolling your own data structures in application-level C++ code?",
    answer:
      "STL implementations are extensively tested, optimized, and well-understood by other C++ developers reading the code -- hand-rolled equivalents duplicate this effort, are more likely to contain subtle bugs, and are less immediately recognizable to someone else reading the codebase, unless there's a genuinely specific reason the STL's options don't fit.",
    category: "Templates & STL",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Inheritance & Polymorphism (10) ---
  {
    id: "cpp-interview-inheritance-01",
    courseSlug: "cpp-programming",
    question: "What is inheritance in C++, and what does `class Dog : public Animal` establish?",
    answer:
      "It establishes that `Dog` derives from `Animal`, inheriting its public/protected members -- `Dog` is considered a specialization ('is-a') of `Animal`, gaining its base class's interface/implementation while being able to add its own additional members or override behavior.",
    category: "Inheritance & Polymorphism",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-inheritance-02",
    courseSlug: "cpp-programming",
    question:
      "What is a virtual function, and what does it enable that a plain (non-virtual) member function does not?",
    answer:
      "A `virtual` function enables runtime polymorphism -- calling it through a BASE class pointer/reference actually invokes the DERIVED class's overridden version (if one exists), determined at runtime based on the object's real type, rather than the compile-time static type of the pointer/reference.",
    category: "Inheritance & Polymorphism",
    difficulty: "advanced",
    codeExample:
      'class Animal {\npublic:\n  virtual std::string sound() { return "..."; }\n};\nclass Dog : public Animal {\npublic:\n  std::string sound() override { return "Woof"; }\n};',
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-inheritance-03",
    courseSlug: "cpp-programming",
    question:
      "Why must a base class's destructor be declared `virtual` if the class is meant to be used polymorphically (deleted through a base class pointer)?",
    answer:
      "Without a virtual destructor, deleting a derived object through a BASE class pointer only calls the base class's destructor, not the derived class's -- this can leave derived-class-specific resources leaked/improperly cleaned up, a genuinely common and serious C++ bug.",
    category: "Inheritance & Polymorphism",
    difficulty: "advanced",
    commonMistake:
      "Omitting virtual on a base class destructor when the class is used polymorphically, causing derived-class cleanup to be silently skipped.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-inheritance-04",
    courseSlug: "cpp-programming",
    question:
      "What is a pure virtual function (`virtual void draw() = 0;`), and what does it make the containing class?",
    answer:
      "A virtual function with no implementation in the base class, declared with `= 0` -- a class containing at least one pure virtual function becomes an ABSTRACT class, which cannot be instantiated directly; derived classes must provide an implementation to become instantiable.",
    category: "Inheritance & Polymorphism",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-inheritance-05",
    courseSlug: "cpp-programming",
    question:
      "What does the `override` keyword do when placed after an overriding method's declaration?",
    answer:
      "It's a compile-time check confirming the method actually overrides a virtual function from a base class -- if you mistype the signature (wrong parameters, missing `const`), `override` causes a compile error instead of silently defining a new, unrelated method that never actually overrides anything.",
    category: "Inheritance & Polymorphism",
    difficulty: "advanced",
    commonMistake:
      "Slightly mistyping an overriding method's signature without the override keyword, silently creating an unrelated new method instead of a real override.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-inheritance-06",
    courseSlug: "cpp-programming",
    question: "What is the difference between public, protected, and private inheritance in C++?",
    answer:
      "Public inheritance (by far the most common) preserves the base class's access levels as-is in the derived class ('is-a' relationship); protected and private inheritance downgrade the base class's public/protected members to protected or private respectively in the derived class, generally used for more specialized implementation-inheritance scenarios rather than a genuine is-a relationship.",
    category: "Inheritance & Polymorphism",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-inheritance-07",
    courseSlug: "cpp-programming",
    question: "What is 'slicing' in C++ inheritance, and how does it happen?",
    answer:
      "Assigning a derived-class object to a BASE-class object BY VALUE (not by pointer/reference) copies only the base-class portion, discarding the derived-class-specific data -- a subtle bug where polymorphic behavior is unintentionally lost because the object was passed/stored by value instead of by pointer or reference.",
    category: "Inheritance & Polymorphism",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-inheritance-08",
    courseSlug: "cpp-programming",
    question:
      "What is multiple inheritance, and what classic problem (the 'diamond problem') can it introduce?",
    answer:
      "A class inheriting from more than one base class -- the diamond problem occurs when two base classes both inherit from a common ancestor, and a further-derived class inheriting from both ends up with two separate copies of that ancestor's data unless `virtual` inheritance is explicitly used to share a single instance.",
    category: "Inheritance & Polymorphism",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-inheritance-09",
    courseSlug: "cpp-programming",
    question:
      "Why might composition ('has-a,' holding another object as a member) be preferred over inheritance ('is-a') in many real designs?",
    answer:
      "Composition creates a looser coupling than inheritance -- a composed object's implementation details don't leak into or constrain the containing class the way a base class's implementation can constrain its subclasses -- inheritance should generally be reserved for genuine is-a relationships, not just reused for convenient code sharing.",
    category: "Inheritance & Polymorphism",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "cpp-interview-inheritance-10",
    courseSlug: "cpp-programming",
    question:
      "How does runtime polymorphism (via virtual functions) differ from compile-time polymorphism (via templates/function overloading)?",
    answer:
      "Runtime polymorphism resolves WHICH function implementation actually runs at runtime, based on the object's real type (via a virtual function table lookup); compile-time polymorphism (templates, overloading) resolves everything at COMPILE time, with no runtime dispatch cost -- both achieve a form of 'same interface, different behavior,' via genuinely different mechanisms with different performance tradeoffs.",
    category: "Inheritance & Polymorphism",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
