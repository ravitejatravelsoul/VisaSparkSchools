import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Go Programming interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (Go fundamentals,
 * functions/multiple-returns/slices/maps, structs/interfaces/error
 * handling, goroutines/channels/concurrency, project structure/tooling).
 */
export const goInterviewQuestions: InterviewQuestionInput[] = [
  // --- Go Fundamentals (10) ---
  {
    id: "go-interview-fundamentals-01",
    courseSlug: "go-programming",
    question: "Is Go a compiled or interpreted language, and what does that mean for deployment?",
    answer:
      "Go is compiled -- `go build` produces a single, statically-linked native executable with no external runtime dependency required on the target machine, which makes deployment simple (copy one binary) compared to languages requiring a separate installed runtime/interpreter.",
    category: "Go Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-fundamentals-02",
    courseSlug: "go-programming",
    question: "What is the difference between `:=` and `var` for declaring a variable in Go?",
    answer:
      "`:=` (short variable declaration) declares and infers the type from the assigned value in one step, only usable inside a function body; `var name Type = value` explicitly declares the type (or lets it be inferred) and is usable at package level too -- `:=` is the more common shorthand inside functions.",
    category: "Go Fundamentals",
    difficulty: "beginner",
    codeExample: "count := 5          // short declaration\nvar count int = 5   // explicit var",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-fundamentals-03",
    courseSlug: "go-programming",
    question: "Why does Go not have exceptions, and how does it handle errors instead?",
    answer:
      "Go deliberately omits exception-based error handling in favor of returning an explicit `error` value as an additional return value from any function that can fail -- callers must explicitly check `if err != nil` rather than errors silently propagating up an invisible exception path.",
    category: "Go Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-fundamentals-04",
    courseSlug: "go-programming",
    question:
      "What does Go's `gofmt` tool do, and why is Go's tooling-enforced formatting notable compared to most languages?",
    answer:
      "`gofmt` automatically reformats Go source code to the language's one canonical style -- Go treats formatting as essentially non-negotiable and tool-enforced, eliminating the code-style debates and inconsistency common in languages with multiple accepted formatting conventions.",
    category: "Go Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-fundamentals-05",
    courseSlug: "go-programming",
    question:
      "Why does Go treat an unused imported package or an unused local variable as a compile ERROR, not just a warning?",
    answer:
      "Go's designers deliberately chose to enforce this strictly to prevent dead code and accidental leftover imports/variables from accumulating silently -- forcing developers to either use or explicitly remove them keeps the codebase clean by construction, at the cost of occasionally being annoying during quick prototyping.",
    category: "Go Fundamentals",
    difficulty: "intermediate",
    commonMistake:
      "Leaving an unused variable or import in Go code and expecting it to just be a warning, when it actually fails compilation.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-fundamentals-06",
    courseSlug: "go-programming",
    question:
      "What is Go's zero-value concept, and why does it matter for variables you declare without an explicit initial value?",
    answer:
      "Every type has a well-defined default 'zero value' (0 for numbers, \"\" for strings, `false` for booleans, `nil` for pointers/slices/maps/interfaces) -- a variable declared with `var x int` is never left as truly uninitialized/garbage memory, it's immediately usable as 0, which eliminates a whole class of uninitialized-variable bugs common in some other languages.",
    category: "Go Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-fundamentals-07",
    courseSlug: "go-programming",
    question:
      "What does it mean that Go is a statically-typed language, and how does that differ from JavaScript/Python's dynamic typing?",
    answer:
      "In Go, every variable's type is fixed at compile time and checked by the compiler before the program ever runs -- a type mismatch is caught immediately as a compile error, rather than potentially surfacing only at runtime the way it would in a dynamically-typed language.",
    category: "Go Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-fundamentals-08",
    courseSlug: "go-programming",
    question:
      "What is Go's naming convention for controlling whether a function, type, or variable is exported (public) from a package?",
    answer:
      "Capitalization determines visibility -- an identifier starting with an uppercase letter (`ProcessOrder`) is exported and accessible from other packages; a lowercase-starting identifier (`processOrder`) is package-private, only accessible within the same package. No separate `public`/`private` keyword exists.",
    category: "Go Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-fundamentals-09",
    courseSlug: "go-programming",
    question:
      "What does Go's `const` keyword let you declare, and how does it differ from a `var`?",
    answer:
      "`const` declares a compile-time constant value that can never be reassigned and (for numeric/string constants) is evaluated at compile time -- unlike `var`, which declares a normal, mutable runtime variable, even if you never actually reassign it.",
    category: "Go Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-fundamentals-10",
    courseSlug: "go-programming",
    question:
      "Why is Go often described as favoring simplicity and explicitness over language feature richness, compared to languages like C++ or Scala?",
    answer:
      "Go deliberately omits many features other languages have (classical inheritance, exceptions, generics were notably absent for years, operator overloading) in favor of a small, easy-to-learn core language -- a deliberate design tradeoff favoring readability and consistency across a large codebase/team over expressive power for any individual piece of code.",
    category: "Go Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Functions, Slices & Maps (10) ---
  {
    id: "go-interview-functions-01",
    courseSlug: "go-programming",
    question:
      "What does it mean that Go functions can return multiple values, and how is this commonly used for error handling?",
    answer:
      "A Go function can declare more than one return type (`func divide(a, b int) (int, error)`), most commonly used to return both a result and an error value together -- the idiomatic pattern is `result, err := divide(a, b); if err != nil { ... }`.",
    category: "Functions, Slices & Maps",
    difficulty: "beginner",
    codeExample:
      'func divide(a, b int) (int, error) {\n  if b == 0 {\n    return 0, errors.New("division by zero")\n  }\n  return a / b, nil\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-functions-02",
    courseSlug: "go-programming",
    question: "What is a Go slice, and how does it differ from a plain array?",
    answer:
      "An array has a fixed size baked into its type (`[5]int`); a slice is a flexible, resizable view over an underlying array, with its own length and capacity that can grow -- slices are what's actually used in idiomatic Go code for nearly all list-like data, with arrays used only rarely for fixed-size cases.",
    category: "Functions, Slices & Maps",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-functions-03",
    courseSlug: "go-programming",
    question: "What is the difference between a slice's length and its capacity?",
    answer:
      "Length is how many elements the slice currently contains; capacity is how many elements the underlying array CAN hold before a new, larger array must be allocated -- appending beyond current capacity triggers Go to allocate a new, larger underlying array and copy the existing elements over.",
    category: "Functions, Slices & Maps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-functions-04",
    courseSlug: "go-programming",
    question:
      "Why can appending to a slice that's a 'view' into a larger array sometimes produce surprising shared-mutation behavior?",
    answer:
      "Two slices can share the same underlying array if one was created by slicing another (`s2 := s1[1:3]`) -- modifying an element through one slice can be visible through the other, since they point at the same backing storage, until an append operation forces a new, separately-allocated array.",
    category: "Functions, Slices & Maps",
    difficulty: "advanced",
    commonMistake:
      "Assuming two slices derived from the same underlying array are fully independent, then being surprised when mutating one affects the other.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-functions-05",
    courseSlug: "go-programming",
    question: "What is a Go map, and what happens if you read a key that doesn't exist?",
    answer:
      "A map is Go's built-in hash-table-backed key-value collection -- reading a nonexistent key returns the value type's zero value (not an error/exception), so `m[\"missing\"]` on a `map[string]int` returns `0`, not a crash. The two-value form (`v, ok := m[\"key\"]`) is used to distinguish 'key missing' from 'key present with a zero value.'",
    category: "Functions, Slices & Maps",
    difficulty: "intermediate",
    codeExample: 'v, ok := m["missing"]\nif !ok {\n  fmt.Println("key not found")\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-functions-06",
    courseSlug: "go-programming",
    question:
      "Why is map iteration order in Go explicitly randomized/unspecified, unlike some other languages' insertion-ordered maps?",
    answer:
      "Go deliberately randomizes map iteration order specifically to prevent developers from accidentally relying on an order that was never actually guaranteed -- code that needs a specific order must sort keys explicitly rather than depending on incidental map iteration behavior.",
    category: "Functions, Slices & Maps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-functions-07",
    courseSlug: "go-programming",
    question:
      "What is a variadic function parameter in Go (`func sum(nums ...int) int`), and how do you call it with an existing slice?",
    answer:
      "A variadic parameter lets the function accept any number of arguments of that type, collected into a slice inside the function -- to pass an EXISTING slice's elements as variadic arguments, you must spread it explicitly with `...` (`sum(myNums...)`), rather than passing the slice directly.",
    category: "Functions, Slices & Maps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-functions-08",
    courseSlug: "go-programming",
    question:
      "What is a closure in Go, and how does it capture variables from its enclosing scope?",
    answer:
      "A closure is a function value that references variables from outside its own body -- Go closures capture those variables BY REFERENCE, meaning if the enclosing variable changes after the closure is created, the closure sees the updated value, not a snapshot from creation time.",
    category: "Functions, Slices & Maps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-functions-09",
    courseSlug: "go-programming",
    question:
      "Why does Go pass function arguments strictly by value, even for structs, and what does that mean for a large struct passed to a function?",
    answer:
      "Every argument is copied when passed -- for a large struct, this means copying its entire contents, which can be a real performance cost; passing a POINTER to the struct instead avoids the copy and also lets the function actually mutate the caller's original struct if needed.",
    category: "Functions, Slices & Maps",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-functions-10",
    courseSlug: "go-programming",
    question: "What does `defer` do in a Go function, and what is a very common use case?",
    answer:
      "`defer` schedules a function call to run right before the enclosing function returns, regardless of how it returns (normal return or panic) -- extremely commonly used for guaranteed cleanup, like `defer file.Close()` immediately after successfully opening a file.",
    category: "Functions, Slices & Maps",
    difficulty: "intermediate",
    codeExample: "f, err := os.Open(path)\nif err != nil {\n  return err\n}\ndefer f.Close()",
    lastReviewed: "2026-08-07",
  },

  // --- Structs, Interfaces & Error Handling (10) ---
  {
    id: "go-interview-structs-01",
    courseSlug: "go-programming",
    question:
      "What is a Go struct, and how does it compare conceptually to a class in an object-oriented language?",
    answer:
      "A struct is a composite type grouping named fields together -- Go has no classes at all; behavior is attached to structs via separately-defined methods (functions with a receiver), and there's no inheritance, only composition (embedding one struct inside another).",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-structs-02",
    courseSlug: "go-programming",
    question:
      "What is the difference between a value receiver and a pointer receiver on a Go method?",
    answer:
      "A value receiver (`func (u User) Greet()`) operates on a COPY of the struct, so it can't modify the original; a pointer receiver (`func (u *User) SetName(name string)`) operates on the original struct via its address, letting the method actually mutate the caller's struct.",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "advanced",
    commonMistake:
      "Using a value receiver for a method meant to mutate the struct, silently modifying only a local copy that the caller never sees.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-structs-03",
    courseSlug: "go-programming",
    question:
      "How does Go's interface satisfaction work, and how does it differ from explicit `implements` declarations in Java?",
    answer:
      "Go uses structural (implicit) interface satisfaction -- any type that happens to implement all the methods an interface requires automatically satisfies that interface, with no explicit `implements` keyword or declaration needed -- a type can satisfy an interface without even knowing that interface exists.",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-structs-04",
    courseSlug: "go-programming",
    question: "What is the significance of the empty interface `interface{}` (or its alias `any`)?",
    answer:
      "Since it requires zero methods, EVERY type automatically satisfies it -- it's Go's way of representing 'a value of any type,' historically used before generics for things like a generic container, though modern Go generics now offer a more type-safe alternative for many such cases.",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-structs-05",
    courseSlug: "go-programming",
    question:
      "What is the idiomatic Go error-handling pattern, and why does it look repetitive compared to try/catch-based languages?",
    answer:
      "`if err != nil { return err }` (or wrapped with more context) repeated after every fallible call -- it looks repetitive because errors are explicit, ordinary values checked at each step, a deliberate design choice trading conciseness for making every possible failure point visible directly in the code's control flow.",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-structs-06",
    courseSlug: "go-programming",
    question:
      'What is error wrapping in Go (`fmt.Errorf("failed to load config: %w", err)`), and what does the `%w` verb specifically enable?',
    answer:
      "`%w` wraps the original error inside a new one while preserving a reference to it, letting callers later use `errors.Is`/`errors.As` to check whether a specific underlying error occurred, even through several layers of wrapping -- preserves diagnostic context without losing the ability to programmatically inspect the root cause.",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-structs-07",
    courseSlug: "go-programming",
    question:
      "What is the difference between a `panic` and a regular returned `error` in Go, and when is `panic` actually appropriate?",
    answer:
      "A returned `error` represents an expected, recoverable failure mode that calling code is meant to handle; `panic` represents an unrecoverable programmer error or truly exceptional condition, unwinding the call stack -- idiomatic Go reserves `panic` for genuinely exceptional situations, not routine error handling, which should use returned errors instead.",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "advanced",
    commonMistake:
      "Using panic for routine, expected error conditions instead of returning an error value, going against Go's idiomatic error-handling convention.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-structs-08",
    courseSlug: "go-programming",
    question: "What does `recover()` do, and in what context must it be called to actually work?",
    answer:
      "`recover()` stops a panicking goroutine's unwinding and returns the value passed to `panic` -- it only has an effect when called directly inside a `deferred` function; calling it anywhere else does nothing.",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-structs-09",
    courseSlug: "go-programming",
    question:
      "What is struct embedding, and how does it let one struct 'inherit' another's fields/methods without classical inheritance?",
    answer:
      "Embedding a struct (or interface) inside another struct with no field name promotes its fields and methods to be accessible directly on the outer struct -- a form of composition that achieves some of what inheritance provides in other languages, without an actual is-a inheritance relationship or method-overriding polymorphism.",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-structs-10",
    courseSlug: "go-programming",
    question:
      "Why might a small, focused interface (like Go's standard `io.Reader` with just one method) be preferred over a large interface with many methods?",
    answer:
      "Small interfaces are easier for many different concrete types to satisfy naturally, and easier to mock/fake in tests -- Go's standard library convention favors small, composable interfaces ('accept interfaces, return structs') over large ones that force implementers to provide many methods they may not all need.",
    category: "Structs, Interfaces & Error Handling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Goroutines, Channels & Concurrency (10) ---
  {
    id: "go-interview-concurrency-01",
    courseSlug: "go-programming",
    question: "What is a goroutine, and how is it different from an OS thread?",
    answer:
      "A goroutine is a lightweight, Go-runtime-managed concurrent function execution -- much cheaper to create than an OS thread (goroutines start with a small, growable stack and the Go runtime multiplexes many goroutines onto a smaller number of actual OS threads), so a program can comfortably run thousands of goroutines.",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "intermediate",
    codeExample: "go doSomething()  // starts a new goroutine",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-concurrency-02",
    courseSlug: "go-programming",
    question: "What is a channel in Go, and what is it used for?",
    answer:
      "A typed conduit for goroutines to send and receive values safely, providing built-in synchronization -- the idiomatic Go concurrency philosophy is often summarized as 'don't communicate by sharing memory; share memory by communicating,' with channels being the primary mechanism for that communication.",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "intermediate",
    codeExample: "ch := make(chan int)\ngo func() { ch <- 42 }()\nvalue := <-ch",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-concurrency-03",
    courseSlug: "go-programming",
    question: "What is the difference between an unbuffered and a buffered channel?",
    answer:
      "An unbuffered channel (`make(chan int)`) blocks the sender until a receiver is ready to receive (synchronous handoff); a buffered channel (`make(chan int, 5)`) lets the sender proceed without blocking until the buffer is full, decoupling the timing of sends and receives somewhat.",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-concurrency-04",
    courseSlug: "go-programming",
    question:
      "What happens if you send on a channel that no goroutine will ever receive from, and no buffer capacity remains?",
    answer:
      "The sending goroutine blocks forever, waiting for a receiver that never comes -- if this is the ONLY thing keeping the program running, Go's runtime can detect this specific 'all goroutines are asleep, deadlock' situation and crash the program with a deadlock error rather than hanging silently forever.",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "advanced",
    commonMistake:
      "Sending on an unbuffered channel with no corresponding receiver ready, causing the goroutine (and potentially the whole program) to deadlock.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-concurrency-05",
    courseSlug: "go-programming",
    question:
      "What does `sync.WaitGroup` let you do, and why is it commonly used alongside goroutines?",
    answer:
      "It lets a goroutine wait for a collection of OTHER goroutines to finish before proceeding -- `Add(n)` registers how many to wait for, each goroutine calls `Done()` when finished, and `Wait()` blocks until the count reaches zero, a common pattern for 'launch N concurrent tasks, then wait for all of them.'",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "advanced",
    codeExample:
      "var wg sync.WaitGroup\nfor _, url := range urls {\n  wg.Add(1)\n  go func(u string) {\n    defer wg.Done()\n    fetch(u)\n  }(url)\n}\nwg.Wait()",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-concurrency-06",
    courseSlug: "go-programming",
    question:
      "What is a race condition, and what tool does Go provide specifically to help detect one?",
    answer:
      "A race condition occurs when multiple goroutines access shared memory concurrently, with at least one write, without proper synchronization -- Go's built-in `-race` flag (`go test -race`, `go run -race`) instruments the program to detect and report actual data races encountered during execution.",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-concurrency-07",
    courseSlug: "go-programming",
    question:
      "Why does a classic 'launching goroutines in a loop that each capture the loop variable' pattern historically produce a bug in Go?",
    answer:
      "In older Go versions, the loop variable was reused across iterations (one shared variable), so a closure capturing it by reference could see the FINAL value once the loop finished, not the value at the time the goroutine was launched -- Go 1.22 changed loop variable semantics to give each iteration its own variable, fixing this specific footgun, but it remains an important thing to understand for reading older code.",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-concurrency-08",
    courseSlug: "go-programming",
    question: "What is a `select` statement in Go used for?",
    answer:
      "It lets a goroutine wait on multiple channel operations simultaneously, proceeding with whichever one becomes ready first -- useful for patterns like waiting on either a result channel or a timeout/cancellation channel, whichever happens first.",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-concurrency-09",
    courseSlug: "go-programming",
    question:
      "What is `context.Context` commonly used for in concurrent Go code, especially in server applications?",
    answer:
      "It carries cancellation signals, deadlines, and request-scoped values across API boundaries and between goroutines -- e.g. a canceled HTTP request's context propagates down through every downstream operation started on its behalf, letting them stop work early instead of continuing pointlessly after the client has already disconnected.",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-concurrency-10",
    courseSlug: "go-programming",
    question:
      "Why is 'just launching a goroutine for everything' not automatically a performance win?",
    answer:
      "Goroutines are cheap but not free -- excessive, unbounded goroutine creation (e.g. one per item in an unbounded input stream) can still exhaust memory or overwhelm downstream resources (like a database connection pool); a worker-pool pattern with a bounded number of goroutines is often more appropriate than unlimited concurrent goroutines.",
    category: "Goroutines, Channels & Concurrency",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Project Structure, Testing & Tooling (10) ---
  {
    id: "go-interview-tooling-01",
    courseSlug: "go-programming",
    question: "What is a Go module (`go.mod`), and what does it manage?",
    answer:
      "A module defines a project's root import path and tracks its external dependencies and their exact versions -- `go.mod` is the manifest file (similar in role to `package.json`), and `go.sum` records cryptographic checksums of dependencies for reproducible, verifiable builds.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-tooling-02",
    courseSlug: "go-programming",
    question:
      "What does the Go testing convention `func TestXxx(t *testing.T)` in a `_test.go` file establish?",
    answer:
      "Go's built-in testing framework auto-discovers any function matching that naming pattern in a file ending `_test.go` as a test case -- no separate test framework installation is required; `go test` runs them directly using the standard library's `testing` package.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "intermediate",
    codeExample:
      'func TestAdd(t *testing.T) {\n  if Add(2, 3) != 5 {\n    t.Errorf("expected 5")\n  }\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-tooling-03",
    courseSlug: "go-programming",
    question: "What is table-driven testing, a very common Go testing pattern?",
    answer:
      "Defining a slice/table of input-and-expected-output test cases, then looping over them within a single test function -- a Go-idiomatic way to cover many similar cases without duplicating near-identical test function bodies for each one.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-tooling-04",
    courseSlug: "go-programming",
    question:
      "What does `go vet` do, and how does it differ from the compiler's own type checking?",
    answer:
      "`go vet` performs additional static analysis beyond basic type checking, catching suspicious constructs that compile fine but are very likely bugs (like a `Printf` format string that doesn't match its arguments) -- a complementary safety net the compiler itself doesn't provide.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-tooling-05",
    courseSlug: "go-programming",
    question:
      "What is the conventional Go project layout for the entry point of an executable command?",
    answer:
      "A `main` package with a `func main()`, commonly placed under a `cmd/<binary-name>/main.go` path for projects with multiple executables, or directly at the repo root for a single-binary project -- `package main` is what tells `go build` this package produces a runnable executable rather than an importable library.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-tooling-06",
    courseSlug: "go-programming",
    question:
      "Why does Go's standard library include a built-in HTTP server/client, and what does that mean for how many Go web projects avoid heavy external frameworks?",
    answer:
      "The `net/http` package provides a genuinely capable, production-usable HTTP server and client out of the box -- many Go web services are built directly on it (or a thin routing layer over it) rather than requiring a large external framework, reflecting Go's broader philosophy of a capable standard library reducing dependency needs.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-tooling-07",
    courseSlug: "go-programming",
    question:
      "What does Go's built-in benchmarking support (`func BenchmarkXxx(b *testing.B)`) let you measure?",
    answer:
      "It measures a function's performance (time per operation) directly using the standard toolchain (`go test -bench=.`), without needing an external benchmarking library -- consistent with Go's philosophy of batteries-included tooling for common development needs.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-tooling-08",
    courseSlug: "go-programming",
    question:
      "Why might a Go project deliberately avoid adding many small, single-purpose external dependencies compared to the norm in some other language ecosystems?",
    answer:
      "Go's cultural norm (and a capable standard library) tends to favor fewer, more deliberate dependencies -- each added dependency is a piece of code you don't control that could introduce a vulnerability, a breaking change, or added attack surface, so many idiomatic Go projects lean on the standard library and a small number of well-vetted packages rather than many small ones.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-tooling-09",
    courseSlug: "go-programming",
    question: "What does `go mod tidy` do, and why is running it periodically good practice?",
    answer:
      "It adds any missing dependencies actually used in the code and removes unused ones from `go.mod`/`go.sum` -- keeps the module's declared dependencies accurate and minimal, catching the case where a dependency was removed from code but its entry was never cleaned up.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "go-interview-tooling-10",
    courseSlug: "go-programming",
    question:
      "Why is fast compilation often cited as one of Go's practical strengths for large codebases and CI pipelines?",
    answer:
      "Go's compiler was specifically designed for speed, and Go's package dependency model avoids some of the compilation-time costs (like C++'s header-inclusion model) that slow down large builds in other languages -- fast, reliable builds directly translate to faster CI feedback loops and a better day-to-day developer experience on large projects.",
    category: "Project Structure, Testing & Tooling",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
];
