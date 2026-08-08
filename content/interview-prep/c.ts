import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * C Programming interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (compile-link-run
 * model, variables/control flow, functions/arrays/strings, pointers and
 * pointer arithmetic, dynamic memory with malloc/free, structs/multi-file
 * compilation, undefined-behavior pitfalls).
 */
export const cInterviewQuestions: InterviewQuestionInput[] = [
  // --- Compile-Link-Run & Fundamentals (10) ---
  {
    id: "c-interview-compile-01",
    courseSlug: "c-programming",
    question: "What are the distinct stages between C source code and a running program?",
    answer:
      "Preprocessing (expanding `#include`/`#define` directives), compilation (translating preprocessed source into machine-code object files), and linking (combining object files and libraries into a single executable) -- understanding these separate stages helps diagnose which stage a given build error actually comes from.",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-compile-02",
    courseSlug: "c-programming",
    question: "What is the difference between a compile-time error and a linker error?",
    answer:
      "A compile-time error (syntax error, type mismatch) occurs while translating a single source file; a linker error (like 'undefined reference') occurs afterward, when combining compiled object files, typically meaning a function/variable was declared and used but its actual implementation was never compiled/linked in.",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-compile-03",
    courseSlug: "c-programming",
    question:
      "Why does C require an explicit function prototype/declaration before a function is used, if that function is defined later in the file (or in another file)?",
    answer:
      "The compiler processes a file top to bottom and needs to know a function's signature (return type, parameter types) BEFORE it can correctly compile a call to it -- without a prior declaration, the compiler either errors or (in older, looser C standards) makes a risky implicit assumption about the function's signature.",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-compile-04",
    courseSlug: "c-programming",
    question:
      "What does `printf`'s format specifier (`%d`, `%s`, `%f`) tell the function, and why is a mismatched format specifier dangerous rather than just wrong?",
    answer:
      "It tells `printf` how to interpret and format the corresponding argument's bytes -- unlike a type-checked language, a mismatched specifier (e.g. `%d` for a value that's actually a `double`) can produce garbage output or, in the worst case, undefined behavior, since C doesn't verify at compile time (without extra tooling) that the format string matches the actual argument types.",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "advanced",
    commonMistake:
      "Using a mismatched printf format specifier for the actual argument type, producing garbage output or undefined behavior instead of a compile error.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-compile-05",
    courseSlug: "c-programming",
    question:
      "What is the difference between `int`, `float`, and `double` in terms of what they represent?",
    answer:
      "`int` represents whole numbers; `float` and `double` represent floating-point (fractional) numbers, with `double` offering roughly twice the precision of `float` on most platforms -- the choice between `float` and `double` is a tradeoff between memory/performance and numeric precision.",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-compile-06",
    courseSlug: "c-programming",
    question:
      "Why must every local variable in classic C be declared before it's used, and what does an UNINITIALIZED local variable actually contain?",
    answer:
      "C doesn't automatically initialize local variables to a default/zero value the way some other languages do -- an uninitialized local variable contains whatever garbage bits happened to already be at that memory location, meaning reading it before assignment produces genuinely unpredictable behavior, not a safe default.",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "advanced",
    commonMistake:
      "Reading a local variable before ever assigning it a value, assuming it defaults to zero the way some other languages do.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-compile-07",
    courseSlug: "c-programming",
    question:
      "What is the difference between `==` for comparison and `=` for assignment, and why is confusing them in an `if` condition a classic C bug?",
    answer:
      "`=` assigns a value and evaluates to that assigned value (which C treats as truthy if nonzero); `==` compares for equality -- writing `if (x = 5)` instead of `if (x == 5)` compiles fine (often with just a warning) but ASSIGNS 5 to x and then evaluates as always-true, a classic, hard-to-spot C bug.",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "advanced",
    commonMistake:
      "Writing if (x = 5) instead of if (x == 5), accidentally assigning instead of comparing, which still compiles.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-compile-08",
    courseSlug: "c-programming",
    question:
      "What does the C preprocessor's `#define` directive do, and how does a macro differ from a real function?",
    answer:
      "`#define` performs a purely textual substitution before actual compilation begins -- a macro has no real type checking or scoping the way a function does, and can produce subtle bugs from careless argument substitution (e.g. an unparenthesized macro expression breaking operator precedence when substituted).",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-compile-09",
    courseSlug: "c-programming",
    question: "What is the difference between `while` and `do...while` loops in C?",
    answer:
      "`while` checks its condition BEFORE the first iteration, so the loop body might run zero times; `do...while` checks its condition AFTER each iteration, guaranteeing the loop body runs at least once even if the condition is initially false.",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-compile-10",
    courseSlug: "c-programming",
    question:
      "Why does understanding C's fundamentals (the compile-link-run model, manual memory) remain valuable even for developers who mostly work in higher-level languages?",
    answer:
      "Most higher-level languages' runtimes are themselves implemented in C (or a C-adjacent systems language) -- understanding what's actually happening 'underneath' (memory layout, pointer semantics) builds a more accurate mental model for reasoning about performance and certain classes of bugs, even when not writing C day to day.",
    category: "Compile-Link-Run & Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Functions, Arrays & Strings (10) ---
  {
    id: "c-interview-functions-01",
    courseSlug: "c-programming",
    question:
      "What is 'the stack' in the context of a running C program, and what does it hold during a function call?",
    answer:
      "A region of memory holding each active function call's local variables and return address, growing with each nested call and shrinking as functions return -- when a function returns, its stack frame's memory becomes invalid, which is why returning a pointer to a LOCAL variable from a function is a serious bug.",
    category: "Functions, Arrays & Strings",
    difficulty: "advanced",
    commonMistake:
      "Returning a pointer to a local (stack-allocated) variable from a function, producing a dangling pointer once the function returns.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-functions-02",
    courseSlug: "c-programming",
    question:
      "How does C handle array bounds -- does accessing `arr[10]` on a 5-element array cause an error?",
    answer:
      "C performs NO automatic bounds checking -- accessing an out-of-bounds index reads or writes whatever memory happens to be at that computed address, which is undefined behavior. It may appear to 'work' sometimes, corrupt unrelated data other times, or crash, depending entirely on what's actually at that memory location.",
    category: "Functions, Arrays & Strings",
    difficulty: "advanced",
    commonMistake:
      "Assuming C automatically prevents out-of-bounds array access the way some higher-level languages do.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-functions-03",
    courseSlug: "c-programming",
    question:
      "How does C represent a string, and what is the significance of the null terminator (`\\0`)?",
    answer:
      'A C string is just an array of `char` with a special `\\0` byte marking its logical end -- string functions like `strlen`/`printf("%s", ...)` rely on scanning until they find that null terminator, so a string missing its null terminator causes those functions to keep reading past the intended data into unrelated memory.',
    category: "Functions, Arrays & Strings",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-functions-04",
    courseSlug: "c-programming",
    question: "Why is `gets()` considered dangerous and removed from modern C standards?",
    answer:
      "It reads input into a buffer with NO bounds checking whatsoever, meaning input longer than the buffer overflows into adjacent memory -- a classic, historically-exploited security vulnerability, which is why it was formally removed from the C11 standard in favor of bounds-aware alternatives like `fgets`.",
    category: "Functions, Arrays & Strings",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-functions-05",
    courseSlug: "c-programming",
    question: "What does it mean that C arrays 'decay' to a pointer when passed to a function?",
    answer:
      "When you pass an array as a function argument, C actually passes a pointer to its first element, NOT a copy of the whole array -- this is why a function receiving an array parameter can't determine the array's original size from the parameter alone (it must be passed separately).",
    category: "Functions, Arrays & Strings",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-functions-06",
    courseSlug: "c-programming",
    question:
      "Why must a function that returns a fixed-size array of results in C typically use a different approach, since C doesn't allow returning a plain local array?",
    answer:
      "A local array's memory belongs to the function's stack frame, which becomes invalid on return -- common workarounds include having the caller pass in a pre-allocated buffer for the function to fill, or having the function dynamically allocate memory (with `malloc`) that the caller is responsible for eventually freeing.",
    category: "Functions, Arrays & Strings",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-functions-07",
    courseSlug: "c-programming",
    question:
      "What is the difference between `strcpy` and `strncpy`, and why might `strncpy` still be risky despite taking a length argument?",
    answer:
      "`strcpy` copies until it hits the source's null terminator, with no bound on the destination's size (a common overflow risk); `strncpy` takes a maximum length, but if the source is exactly that length or longer, it may NOT null-terminate the destination, silently producing a non-null-terminated string unless you explicitly guard against that.",
    category: "Functions, Arrays & Strings",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-functions-08",
    courseSlug: "c-programming",
    question:
      "What is a multi-dimensional array in C, and how is `int grid[3][4]` actually laid out in memory?",
    answer:
      "It's stored as one contiguous block of memory in row-major order (all of row 0's elements, then all of row 1's, etc.) -- understanding this layout matters for correctly calculating manual offsets or when interfacing with code expecting a specific memory layout.",
    category: "Functions, Arrays & Strings",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-functions-09",
    courseSlug: "c-programming",
    question:
      "Why does C pass function arguments strictly by value (copying), and how do you achieve 'pass by reference'-like behavior?",
    answer:
      "Every argument is copied when passed to a function -- to let a function modify the CALLER's original variable, you must explicitly pass a POINTER to it, and the function dereferences that pointer to read/write the original value, since passing the plain value alone only lets the function modify its own local copy.",
    category: "Functions, Arrays & Strings",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-functions-10",
    courseSlug: "c-programming",
    question:
      "What is the difference between `strlen()` and `sizeof()` when applied to a C string?",
    answer:
      "`strlen()` returns the number of characters BEFORE the null terminator (computed at runtime by scanning); `sizeof()` on an array returns the TOTAL allocated size in bytes (including the null terminator and any unused space), computed at compile time for a fixed-size array -- confusing the two is a common source of off-by-one bugs.",
    category: "Functions, Arrays & Strings",
    difficulty: "advanced",
    commonMistake:
      "Confusing sizeof() (total allocated bytes) with strlen() (characters before the null terminator) for a C string.",
    lastReviewed: "2026-08-07",
  },

  // --- Pointers & Pointer Arithmetic (10) ---
  {
    id: "c-interview-pointers-01",
    courseSlug: "c-programming",
    question:
      "What is a pointer, and what does the `*` operator do when declaring one versus using one?",
    answer:
      "A pointer is a variable that stores a memory address -- in a DECLARATION (`int *p`), `*` marks the variable as a pointer type; in an EXPRESSION (`*p`), `*` dereferences the pointer, accessing the value stored at the address it points to.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "beginner",
    codeExample: 'int x = 5;\nint *p = &x;\nprintf("%d", *p);  // dereference: prints 5',
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-pointers-02",
    courseSlug: "c-programming",
    question: "What does the `&` operator do, and how does it relate to `*`?",
    answer:
      "`&` (address-of) produces a pointer to a variable's memory location -- `&x` and `*p` are complementary operations: `&` goes from a value to its address, `*` goes from an address (pointer) back to the value stored there.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-pointers-03",
    courseSlug: "c-programming",
    question: "What is a NULL pointer, and what happens if you dereference one?",
    answer:
      "A pointer explicitly set to point at 'nothing' (address 0, conventionally), often used to represent an absent/invalid reference -- dereferencing a NULL pointer is undefined behavior, typically crashing the program (a segmentation fault) on most systems.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "intermediate",
    commonMistake:
      "Dereferencing a pointer without first checking whether it's NULL, causing a segmentation fault.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-pointers-04",
    courseSlug: "c-programming",
    question:
      "What does `p + 1` mean for a pointer `p`, and why is it different from simple integer addition?",
    answer:
      "Pointer arithmetic is scaled by the SIZE of the pointed-to type -- `p + 1` for an `int*` advances the address by `sizeof(int)` bytes (typically 4), not by literally 1 byte, so that incrementing correctly moves to the next element of that type in an array.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-pointers-05",
    courseSlug: "c-programming",
    question:
      "What is the relationship between array indexing (`arr[i]`) and pointer arithmetic (`*(arr + i)`) in C?",
    answer:
      "They're equivalent -- `arr[i]` is literally defined as syntactic sugar for `*(arr + i)`, which is why C array indexing and pointer arithmetic are so closely related, and why understanding one deepens understanding of the other.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-pointers-06",
    courseSlug: "c-programming",
    question: "What is a pointer to a pointer (`int **pp`), and give a real use case for one?",
    answer:
      "A pointer whose stored value is itself the address of another pointer -- a common use case is a function that needs to modify a CALLER's pointer variable itself (not just what it points to), which requires passing a pointer to that pointer, since C's pass-by-value applies to pointers too.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-pointers-07",
    courseSlug: "c-programming",
    question:
      "What is the difference between a pointer and an array in C, given that array names often 'act like' pointers?",
    answer:
      "An array's name decays to a pointer to its first element in most expressions, but the array ITSELF still has a fixed, known size that `sizeof(arr)` correctly reports; a genuine pointer variable has no inherent knowledge of how many elements it points to -- `sizeof(ptr)` just gives the pointer's own size (e.g. 8 bytes on a 64-bit system), not the pointed-to data's size.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "advanced",
    commonMistake:
      "Using sizeof() on a pointer parameter expecting it to report the original array's size, when it actually just reports the pointer's own fixed size.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-pointers-08",
    courseSlug: "c-programming",
    question:
      "What does `const` mean when applied to a pointer, and what is the difference between `const int *p` and `int * const p`?",
    answer:
      "`const int *p` means the VALUE pointed to can't be modified through `p` (but `p` itself can be reassigned to point elsewhere); `int * const p` means `p` itself can't be reassigned (but the value it points to CAN be modified through it) -- the position of `const` relative to `*` determines which is being protected.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-pointers-09",
    courseSlug: "c-programming",
    question:
      "Why is passing a large struct by pointer generally more efficient than passing it by value?",
    answer:
      "Passing by value copies the ENTIRE struct's contents onto the stack for every function call; passing by pointer only copies a small, fixed-size address (typically 8 bytes) regardless of the struct's actual size -- a meaningful performance difference for large structs called frequently.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-pointers-10",
    courseSlug: "c-programming",
    question:
      "What is a function pointer, and what does it let you do that a plain function call cannot?",
    answer:
      "A pointer that stores the address of a FUNCTION rather than a data value, allowing you to store, pass, and call different functions dynamically through a common variable/parameter -- enables patterns like callbacks or a dispatch table, choosing which function to call based on runtime logic.",
    category: "Pointers & Pointer Arithmetic",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Dynamic Memory: malloc/free ---
  {
    id: "c-interview-memory-01",
    courseSlug: "c-programming",
    question: "What does `malloc` do, and why must its return value always be checked?",
    answer:
      "`malloc(size)` requests `size` bytes of dynamically-allocated heap memory, returning a pointer to it (or `NULL` if the allocation fails, e.g. the system is out of memory) -- failing to check for `NULL` before using the returned pointer risks dereferencing a NULL pointer if the allocation genuinely failed.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "intermediate",
    codeExample:
      "int *arr = malloc(10 * sizeof(int));\nif (arr == NULL) {\n  // handle allocation failure\n}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-memory-02",
    courseSlug: "c-programming",
    question:
      "What is a memory leak, and why does C require the programmer to explicitly prevent one?",
    answer:
      "A memory leak occurs when dynamically-allocated memory is never freed and becomes unreachable (no remaining pointer to it), permanently wasting that memory for the program's lifetime -- C has no automatic garbage collector, so every `malloc` must be matched with an eventual `free` by the programmer, or the memory is never reclaimed.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "intermediate",
    commonMistake:
      "Allocating memory with malloc and losing the only reference to it (e.g. by reassigning the pointer) before ever calling free.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-memory-03",
    courseSlug: "c-programming",
    question:
      "What is a 'use-after-free' bug, and why is it a serious security concern, not just a correctness bug?",
    answer:
      "Continuing to use a pointer after calling `free()` on it -- the memory may be reused for something else entirely by that point, so reading/writing through the stale pointer can corrupt unrelated data or be exploited by an attacker who can influence what gets allocated into that now-freed memory region.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "advanced",
    commonMistake:
      "Continuing to use a pointer after calling free() on it, reading or writing memory that may have already been reused elsewhere.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-memory-04",
    courseSlug: "c-programming",
    question:
      "What is a 'dangling pointer,' and how does setting a pointer to `NULL` immediately after `free()` help defend against use-after-free bugs?",
    answer:
      "A dangling pointer still holds the address of memory that's no longer valid (freed, or out-of-scope stack memory) -- setting it to `NULL` right after freeing means any accidental subsequent dereference crashes immediately and obviously (dereferencing NULL), rather than silently corrupting reused memory unpredictably.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-memory-05",
    courseSlug: "c-programming",
    question: "What is a double-free bug, and why is it dangerous?",
    answer:
      "Calling `free()` twice on the same pointer -- the memory allocator's internal bookkeeping structures can become corrupted, leading to unpredictable behavior (including, in some cases, exploitable security vulnerabilities) rather than a clean, obvious error.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-memory-06",
    courseSlug: "c-programming",
    question: "What is the difference between `malloc` and `calloc`?",
    answer:
      "`malloc` allocates memory without initializing its contents (garbage bytes until written); `calloc` allocates memory AND zero-initializes it -- `calloc` is safer by default when you need a clean starting state, at a small performance cost for the zeroing step.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-memory-07",
    courseSlug: "c-programming",
    question:
      "What does `realloc` do, and why must you always assign its return value to a NEW variable rather than overwriting the original pointer directly?",
    answer:
      "`realloc` resizes a previously-allocated block, potentially moving it to a new memory location and returning the new address -- if `realloc` fails, it returns `NULL` but leaves the ORIGINAL pointer/memory untouched; overwriting the original pointer directly with `realloc`'s result would lose the only reference to the still-valid original memory on failure, leaking it.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "advanced",
    commonMistake:
      "Writing ptr = realloc(ptr, newSize) directly, losing the original allocation (a memory leak) if realloc fails and returns NULL.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-memory-08",
    courseSlug: "c-programming",
    question:
      "Why does C require manual memory management at all, rather than an automatic garbage collector like many higher-level languages?",
    answer:
      "C is a systems language designed for predictable, minimal-overhead performance and fine-grained control over memory -- a garbage collector introduces runtime overhead and less predictable pause timing, tradeoffs C's design goals (used for operating systems, embedded systems, performance-critical code) deliberately avoid.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-memory-09",
    courseSlug: "c-programming",
    question:
      "What tool is commonly used to detect memory leaks and invalid memory access in C programs during development?",
    answer:
      "Valgrind (or a compiler-integrated sanitizer like AddressSanitizer) runs the program under instrumentation that detects memory errors (leaks, use-after-free, buffer overflows) that wouldn't necessarily crash the program outright but represent real bugs -- essential tooling for catching this class of C bug before it reaches production.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-memory-10",
    courseSlug: "c-programming",
    question:
      "Why is it good practice to free dynamically-allocated memory in the REVERSE order it was allocated, when there are dependencies between allocations?",
    answer:
      "If one allocated structure holds pointers into another allocated structure, freeing the referenced-into one FIRST would leave dangling pointers in the still-active structure -- freeing in reverse dependency order (or otherwise carefully tracking dependencies) avoids creating dangling references mid-cleanup.",
    category: "Dynamic Memory: malloc/free",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Structs, Multi-file Compilation & Undefined Behavior ---
  {
    id: "c-interview-structs-01",
    courseSlug: "c-programming",
    question:
      "What is a C struct, and how do you access its members through a pointer versus a direct variable?",
    answer:
      "A struct groups related fields under one type -- for a direct struct variable, use `.` (`user.name`); for a pointer to a struct, use `->` (`userPtr->name`), which is shorthand for `(*userPtr).name`.",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "beginner",
    codeExample:
      "struct User { char name[20]; int age; };\nstruct User *u = malloc(sizeof(struct User));\nu->age = 30;",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-structs-02",
    courseSlug: "c-programming",
    question:
      "What does `typedef` let you do with a struct, and why is `typedef struct { ... } User;` a common pattern?",
    answer:
      "`typedef` creates an alias for a type -- combined with an anonymous struct, it lets you write `User user;` instead of the more verbose `struct User user;` every time, a very common convention for reducing boilerplate when using structs throughout a C codebase.",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-structs-03",
    courseSlug: "c-programming",
    question:
      "What is the difference between a header file (`.h`) and a source file (`.c`) in a multi-file C project?",
    answer:
      "A header file typically contains declarations (function prototypes, struct definitions, macros) meant to be shared/included across multiple source files; a source file contains actual implementations -- this separation lets multiple `.c` files reference the same declarations consistently without duplicating them.",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-structs-04",
    courseSlug: "c-programming",
    question:
      "What is an include guard (`#ifndef HEADER_H / #define HEADER_H / ... / #endif`), and what problem does it solve?",
    answer:
      "It prevents a header file's contents from being processed more than once if it's (directly or indirectly) `#include`d multiple times in the same compilation unit -- without it, a header included twice would cause duplicate-definition compile errors.",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-structs-05",
    courseSlug: "c-programming",
    question:
      "What is undefined behavior in C, and why is it a more serious concept than simply 'the program does something wrong'?",
    answer:
      "Undefined behavior means the C standard places NO requirements at all on what happens -- the compiler is free to do literally anything (crash, produce seemingly correct output, or something else entirely), and this behavior can even change between compiler versions or optimization levels for the exact same code, making it fundamentally unpredictable rather than just 'buggy but consistent.'",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-structs-06",
    courseSlug: "c-programming",
    question:
      "What is a buffer overflow, and why does it remain one of the most historically significant classes of security vulnerability?",
    answer:
      "Writing past the end of an allocated buffer's bounds -- since C performs no automatic bounds checking, this can overwrite adjacent memory (including, in stack-based cases, a function's return address), which attackers have historically exploited to hijack a program's control flow entirely.",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-structs-07",
    courseSlug: "c-programming",
    question: "What is integer overflow in C, and does it always trigger an error?",
    answer:
      "When an arithmetic result exceeds the range representable by its integer type -- for UNSIGNED integers, overflow wraps around silently (well-defined, if surprising, behavior); for SIGNED integers, overflow is actually undefined behavior in C, not just a silent wraparound, which is a common misconception.",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "advanced",
    commonMistake:
      "Assuming signed integer overflow behaves like a predictable wraparound, when it's actually undefined behavior in C.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-structs-08",
    courseSlug: "c-programming",
    question:
      "Why might enabling compiler warnings (`-Wall -Wextra`) and treating them seriously catch real bugs before they ever manifest as undefined behavior at runtime?",
    answer:
      "Many undefined-behavior pitfalls (uninitialized variables, format-string mismatches, comparison-vs-assignment confusion) can be flagged by the compiler's static analysis as warnings, even though the code still technically compiles -- ignoring warnings routinely means routinely shipping exactly the class of bug this course specifically teaches you to identify.",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-structs-09",
    courseSlug: "c-programming",
    question:
      "What does struct padding/alignment mean, and why might `sizeof(struct)` be larger than the sum of its individual members' sizes?",
    answer:
      "The compiler often inserts extra padding bytes between struct members to satisfy the target architecture's memory alignment requirements (e.g. a 4-byte `int` typically needs to start at a 4-byte-aligned address) -- this padding is invisible in the source code but real in memory, which is why `sizeof` can exceed the naive sum of member sizes.",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "c-interview-structs-10",
    courseSlug: "c-programming",
    question:
      "Why is carefully reading and predicting the output of small C programs (rather than only writing new code) a valuable interview and learning exercise?",
    answer:
      "It directly tests whether you understand pointer semantics, memory layout, and evaluation order precisely enough to trace through code correctly -- C's behavior in edge cases (pointer arithmetic, undefined behavior, operator precedence) is subtle enough that being able to accurately predict a snippet's output is a strong signal of real understanding, not just familiarity with syntax.",
    category: "Structs, Multi-file Compilation & Undefined Behavior",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
