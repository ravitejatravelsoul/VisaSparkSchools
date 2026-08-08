import type { LessonInput } from "@/lib/content/types";

/**
 * C Programming lessons. C has no safe, small in-browser execution option
 * (see docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md), so every lesson
 * uses a `guidedOutputLab` (read/predict/fill-in-blank/guided-editing against
 * a precomputed "Expected output") instead of `example`/`guidedExercise`/
 * `independentExercise` -- see lib/content/types.ts's Phase 6/8 note and
 * components/runners/guided-output-panel.tsx. Every code sample and its
 * expected output were verified by hand against real C semantics.
 */
export const cLessons: LessonInput[] = [
  {
    id: "c-introduction-and-toolchain",
    slug: "c-introduction-and-toolchain",
    title: "Introduction to C and the Compile-Link-Run Model",
    description: "What C is, why it still matters, and how source becomes a running program.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain what kind of language C is and why it's still widely used",
      "Describe the compile-link-run pipeline: .c source -> object file -> executable",
      "Identify the parts of a minimal C program: #include, main, return",
    ],
    skills: ["c-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "cppreference: C language", url: "https://en.cppreference.com/w/c/language" },
      { label: "cppreference: C", url: "https://en.cppreference.com/w/c" },
    ],
    keywords: ["c programming", "gcc", "clang", "compile link run", "c toolchain"],
    explanation: `C is a statically-typed, compiled language created in the early 1970s that still underpins most of the software world: operating system kernels, language runtimes, embedded firmware, and the C library that higher-level languages like Python and JavaScript are themselves implemented on top of. Learning C makes memory, pointers, and what a compiler actually does far less abstract.

A C program goes through three distinct stages before it runs. First, a **compiler** (commonly \`gcc\` or \`clang\`) translates each \`.c\` source file into an **object file** (\`.o\`), machine code with any references to other files left as placeholders. Second, a **linker** combines one or more object files (plus any libraries they need, like the standard C library) into a single **executable**. Third, you **run** that executable. The common command \`gcc main.c -o main\` actually does all three steps for you in one invocation for a simple program; \`./main\` then runs the result.

Every C program needs a \`main\` function as its entry point: \`int main(void) { ... }\`. The \`int\` return type is a convention the operating system reads as an exit status -- \`return 0;\` conventionally means "success." Anything the program needs from the standard library, like \`printf\`, comes in through an \`#include\` directive, e.g. \`#include <stdio.h>\` for standard input/output functions.

This platform can't safely compile or execute real C code in your browser (see this course's guided-lab notice on every lesson), so instead of a live runner, each lesson gives you real C source code and asks you to work out what it does -- exactly the skill of reading code you'll need constantly as a working C developer, since C gives you very little safety net if you get it wrong.`,
    commonMistakes: [
      "Forgetting the `#include <stdio.h>` directive and then being confused why `printf` fails to compile.",
      "Confusing compiling (translating source to an object file) with linking (combining object files and libraries into one executable) -- they're distinct steps even when one command does both.",
      "Assuming a compiled C executable is portable across operating systems the way a script might be -- a Linux-compiled binary will not run on Windows or macOS without recompiling.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the entry-point function every C program must define?",
        choices: ["start()", "main()", "run()", "init()"],
        correctIndex: 1,
        explanation: "C looks for a function named `main` as the program's entry point.",
      },
      {
        id: "q2",
        prompt: "Which step turns a `.c` source file into an object file?",
        choices: ["Linking", "Compiling", "Running", "Preprocessing alone, with no other step"],
        correctIndex: 1,
        explanation: "Compiling translates source code into an object file of machine code.",
      },
      {
        id: "q3",
        prompt: "What does the linker do that the compiler alone does not?",
        choices: [
          "It combines object files and needed libraries into a single executable",
          "It executes the program",
          "It formats the source code",
          "It checks for spelling mistakes in comments",
        ],
        correctIndex: 0,
        explanation:
          "The linker combines compiled object files (and libraries) into one runnable executable.",
      },
    ],
    takeaway:
      "A C program's entry point is `int main(void)`; getting from source to a running program means compiling to object files, then linking them into an executable.",
    summary:
      "C is a compiled, statically-typed language still foundational to operating systems and other languages' runtimes; source goes through compiling and linking before it can run.",
    guidedOutputLab: {
      id: "c-lab-hello-world",
      title: "Predict: A minimal C program",
      language: "C",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints when compiled and run.",
      steps: [
        {
          code: `#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    printf("2 + 2 = %d\\n", 2 + 2);
    return 0;
}`,
          expectedOutput: "Hello, C!\n2 + 2 = 4",
        },
      ],
      hints: [
        "`printf` never adds a newline automatically -- you must write `\\n` yourself wherever you want one.",
        "`%d` is the format specifier for a base-10 int inside `printf`.",
      ],
    },
    nextLessonSlug: "c-variables-types-and-io",
  },
  {
    id: "c-variables-types-and-io",
    slug: "c-variables-types-and-io",
    title: "Variables, Types, and printf/scanf Format Specifiers",
    description:
      "C's basic types, declaring variables, and the format specifiers printf and scanf both depend on.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Declare variables of C's basic types: int, float, double, char",
      "Match a value's type to the correct printf format specifier (%d, %f, %c, %s)",
      "Explain what scanf's format specifiers and & operator are for when reading input",
    ],
    skills: ["c-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: printf format string",
        url: "https://en.cppreference.com/w/c/io/fprintf",
      },
    ],
    keywords: ["c variables", "c types", "printf format specifiers", "scanf"],
    explanation: `C is statically typed: every variable is declared with an explicit type that never changes, e.g. \`int age = 30;\` or \`float gpa = 3.5f;\`. Unlike some languages, C has no type inference keyword -- you always write the type yourself. Common basic types include \`int\` (whole numbers), \`float\`/\`double\` (single/double-precision decimals), and \`char\` (a single byte, usually one character).

\`printf\` doesn't know the types of its arguments at compile time the way a more modern language's formatter might -- it relies entirely on **format specifiers** in the format string matching the actual argument types you pass. \`%d\` expects an \`int\`, \`%f\` expects a \`float\`/\`double\` (optionally with precision like \`%.2f\` for two decimal places), \`%c\` expects a single \`char\`, and \`%s\` expects a C string (more on those in a later lesson). Passing a mismatched type is a serious bug -- \`printf\` will read whatever bits happen to be there and interpret them as the wrong type, but many compilers will only warn, not error.

\`scanf\` is \`printf\`'s counterpart for reading input, and it needs one more thing: the **address** of the variable to fill in, via the \`&\` operator, e.g. \`scanf("%d", &age);\` -- because \`scanf\` needs to write into your variable's memory location, not just receive a copy of its current value. Forgetting the \`&\` (except for strings, which behave specially, covered later) is one of the most common beginner C bugs, and it can crash the program or corrupt memory rather than just failing cleanly.`,
    commonMistakes: [
      "Using the wrong printf format specifier for a value's actual type, e.g. `%d` for a float -- this silently produces garbage output instead of a compile error in many compilers.",
      "Forgetting the `&` (address-of) operator before a variable name in `scanf`, so scanf has no valid memory location to write into.",
      "Expecting C to infer a variable's type from its initial value the way some other languages do -- C always requires an explicit type in the declaration.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which printf format specifier matches an int argument?",
        choices: ["%f", "%d", "%c", "%s"],
        correctIndex: 1,
        explanation: "%d is the format specifier for a base-10 int.",
      },
      {
        id: "q2",
        prompt: "Why does scanf typically need the `&` operator before a variable name?",
        choices: [
          "It's optional stylistic decoration",
          "scanf needs the variable's memory address to write the input value into",
          "It converts the variable to a string",
          "It marks the variable as a constant",
        ],
        correctIndex: 1,
        explanation:
          "scanf writes directly into memory, so it needs the address of the variable, not a copy of its value.",
      },
      {
        id: "q3",
        prompt: "Does C infer a variable's type automatically from its initial value?",
        choices: [
          "Yes, always",
          "No -- every declaration must state an explicit type",
          "Only for int and float",
          "Only inside function parameters",
        ],
        correctIndex: 1,
        explanation:
          "C has no type-inference keyword; every variable declaration states its type explicitly.",
      },
    ],
    takeaway:
      "Match printf's format specifier to your value's real type exactly, and remember scanf needs `&variable` because it writes directly into memory.",
    summary:
      "C variables are statically typed with explicit declarations; printf/scanf rely entirely on format specifiers matching the real argument types, and scanf additionally needs `&` to know where to write.",
    guidedOutputLab: {
      id: "c-lab-variables-and-printf",
      title: "Predict: Variables and format specifiers",
      language: "C",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `#include <stdio.h>

int main(void) {
    char grade = 'A';
    int age = 30;
    float gpa = 3.5f;

    printf("Grade: %c, Age: %d, GPA: %.2f\\n", grade, age, gpa);

    return 0;
}`,
          expectedOutput: "Grade: A, Age: 30, GPA: 3.50",
        },
      ],
      hints: [
        "`%c` prints a single character, `%d` an int, and `%.2f` a float rounded to exactly two decimal places.",
        "3.5f formatted with `%.2f` becomes 3.50, since %.2f always shows exactly two digits after the decimal point.",
      ],
    },
    nextLessonSlug: "c-control-flow",
  },
  {
    id: "c-control-flow",
    slug: "c-control-flow",
    title: "Control Flow: if, for, while, and switch",
    description:
      "C's four control-flow keywords, and the switch fallthrough behavior to watch for.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Write `if`/`else if`/`else` and both `for` and `while` loops",
      "Explain why C's `switch` requires an explicit `break` to avoid falling through to the next case",
      "Choose between `for` and `while` based on whether the number of iterations is known upfront",
    ],
    skills: ["c-basics", "c-control-flow"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: C statements",
        url: "https://en.cppreference.com/w/c/language/statements",
      },
    ],
    keywords: ["c if", "c for loop", "c while loop", "c switch", "switch fallthrough"],
    explanation: `C has four control-flow keywords covering conditionals and loops: \`if\`/\`else\`, \`for\`, \`while\`, and \`switch\`. Conditions are always wrapped in parentheses -- \`if (x > 0) { ... }\`, unlike languages that dropped the requirement.

A \`for\` loop is typically used when the number of iterations is known upfront: \`for (int i = 0; i < n; i++) { ... }\` bundles initialization, condition, and increment into one line. A \`while\` loop is preferred when the loop should continue based on a condition that isn't a simple counter: \`while (condition) { ... }\`. C also has \`do { ... } while (condition);\`, which always runs its body at least once before checking the condition -- useful when you need "run once, then repeat while true" semantics.

C's \`switch\` statement has a behavior that trips up many newcomers: cases **fall through** to the next case by default unless you explicitly write \`break\`. Without a \`break\` at the end of a matched case's block, execution just continues running the code of the *next* case too, even though its condition was never checked. This is different from languages like Go, which break automatically after each case -- in C, forgetting \`break\` is a classic, genuinely dangerous bug, not a stylistic quirk.`,
    commonMistakes: [
      "Forgetting `break` at the end of a switch case and being surprised execution continues into the next case's code.",
      "Using `=` (assignment) instead of `==` (equality) inside an `if` condition, which compiles fine and silently does the wrong thing.",
      "Reaching for a `for` loop when the true stopping condition isn't a simple counter, making a `while` loop the clearer choice.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What happens if a matched switch case in C has no `break` statement?",
        choices: [
          "The switch exits immediately, same as with break",
          "Execution falls through and runs the next case's code too",
          "It's a compile error",
          "The program restarts the switch from the top",
        ],
        correctIndex: 1,
        explanation:
          "Without break, C's switch falls through into the next case's code, unlike languages that break automatically.",
      },
      {
        id: "q2",
        prompt: "Which loop always executes its body at least once before checking its condition?",
        choices: ["for", "while", "do-while", "switch"],
        correctIndex: 2,
        explanation:
          "do-while checks its condition after running the body, so the body always runs once.",
      },
      {
        id: "q3",
        prompt: "In C, must an `if` condition be wrapped in parentheses?",
        choices: [
          "Yes, always",
          "No, parentheses are optional",
          "Only for the first condition in an if/else chain",
          "Only when comparing two variables",
        ],
        correctIndex: 0,
        explanation:
          "C requires parentheses around an if condition; there's no parenthesis-free form.",
      },
    ],
    takeaway:
      "Always write an explicit `break` at the end of each switch case you don't intend to fall through, and reach for `while` instead of `for` whenever the stopping condition isn't a simple counter.",
    summary:
      "C offers if/else, for, while, do-while, and switch; switch cases fall through without an explicit break, a common and genuinely dangerous beginner bug.",
    guidedOutputLab: {
      id: "c-lab-control-flow",
      title: "Fill in the blank: choosing while over for",
      language: "C",
      mode: "fill-in-blank",
      prompt: "Fill in the missing loop keyword, then predict the output.",
      steps: [
        {
          code: `#include <stdio.h>

int main(void) {
    int i = 1;
    ____ (i <= 5) {
        if (i % 2 == 0) {
            printf("%d even\\n", i);
        } else {
            printf("%d odd\\n", i);
        }
        i++;
    }
    return 0;
}`,
          expectedOutput: "1 odd\n2 even\n3 odd\n4 even\n5 odd",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "while",
      hints: [
        "Unlike Go's single `for` keyword, C spells out `for`, `while`, and `do-while` as separate keywords -- this loop increments `i` itself, so a condition-only loop fits.",
        "`%` is the modulo operator, checking whether `i` divides evenly by 2.",
      ],
    },
    nextLessonSlug: "c-functions-and-the-stack",
  },
  {
    id: "c-functions-and-the-stack",
    slug: "c-functions-and-the-stack",
    title: "Functions and the Stack",
    description: "Declaring functions, and why C always passes arguments by value.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Declare a function with typed parameters and a return type",
      "Explain how local variables and function calls use the call stack",
      "Predict that modifying a plain parameter inside a function never affects the caller's variable",
    ],
    skills: ["c-functions"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Functions",
        url: "https://en.cppreference.com/w/c/language/functions",
      },
    ],
    keywords: ["c functions", "call stack", "pass by value"],
    explanation: `A C function declares its return type, name, and typed parameters: \`int square(int n) { return n * n; }\`. If a function returns nothing, its return type is \`void\`.

Each time a function is called, the program allocates a fresh block of memory on the **call stack** for that call's local variables and parameters -- often called a **stack frame**. When the function returns, its stack frame is discarded, and any local variables inside it cease to exist. This is why a function can't return the address of one of its own local variables and expect it to remain valid -- that memory is gone the instant the function returns.

C is strictly **pass-by-value**: when you call a function with an argument, the function receives its own independent copy of that value in its own stack frame. Modifying a plain parameter inside the function changes only that local copy -- the caller's original variable is completely unaffected. This matters a lot in C specifically because, unlike some higher-level languages, there's no hidden reference-passing happening behind the scenes for ordinary variables; if you want a function to modify the caller's variable, you must explicitly pass a pointer to it (covered in a later lesson).`,
    commonMistakes: [
      "Assuming that modifying a plain (non-pointer) parameter inside a function will change the caller's original variable -- it never does in C.",
      "Returning the address of a local variable from a function, not realizing that variable's stack frame is gone the moment the function returns.",
      "Forgetting to declare a function's return type as `void` when it doesn't return a value, instead accidentally omitting a return type altogether.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How does C pass arguments to a function by default?",
        choices: [
          "By reference, always",
          "By value -- the function gets its own independent copy",
          "By pointer, always, automatically",
          "It depends on the variable's type",
        ],
        correctIndex: 1,
        explanation: "C always passes arguments by value; the function works on its own copy.",
      },
      {
        id: "q2",
        prompt: "What happens to a function's local variables once it returns?",
        choices: [
          "They persist until the program ends",
          "Their stack frame is discarded and they cease to exist",
          "They become global variables",
          "They're automatically saved to disk",
        ],
        correctIndex: 1,
        explanation:
          "A function's stack frame, including its local variables, is discarded on return.",
      },
      {
        id: "q3",
        prompt: "What return type should a function that returns nothing declare?",
        choices: ["int", "void", "null", "None -- the return type can be omitted"],
        correctIndex: 1,
        explanation: "A function returning nothing is declared with the `void` return type.",
      },
    ],
    takeaway:
      "C functions receive independent copies of their arguments (pass-by-value), and a function's local variables vanish the instant it returns, since its stack frame is discarded.",
    summary:
      "Functions declare typed parameters and a return type; each call gets its own stack frame; plain arguments are always passed by value, never by reference.",
    guidedOutputLab: {
      id: "c-lab-functions-pass-by-value",
      title: "Predict: Pass-by-value in action",
      language: "C",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `#include <stdio.h>

int square(int n) {
    return n * n;
}

void tryToModify(int x) {
    x = 100;
}

int main(void) {
    int value = 5;
    printf("Square of 5: %d\\n", square(value));

    tryToModify(value);
    printf("Value after tryToModify: %d\\n", value);

    return 0;
}`,
          expectedOutput: "Square of 5: 25\nValue after tryToModify: 5",
        },
      ],
      hints: [
        "square(5) returns 5 * 5 = 25.",
        "tryToModify receives its own copy of value, so setting x = 100 inside it never touches main's original value variable.",
      ],
    },
    nextLessonSlug: "c-arrays-and-strings",
  },
  {
    id: "c-arrays-and-strings",
    slug: "c-arrays-and-strings",
    title: "Arrays and String Handling",
    description:
      "Fixed-size arrays, and why a C string is really just a null-terminated char array.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Declare and index a fixed-size array",
      "Explain that a C string is a char array ending in a '\\0' null terminator, not a distinct string type",
      "Use strlen from <string.h> to find a string's length up to its null terminator",
    ],
    skills: ["c-arrays"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: C string handling",
        url: "https://en.cppreference.com/w/c/string/byte",
      },
    ],
    keywords: ["c arrays", "c strings", "null terminator", "strlen"],
    explanation: `A C **array** has a fixed size baked in at declaration: \`int numbers[3] = {10, 20, 30};\`. You access elements with zero-based indexing, \`numbers[0]\` through \`numbers[2]\`. Unlike some languages' arrays, a plain C array carries no built-in length -- the program has to track how many elements are valid itself, or rely on a fixed, known size.

C has no dedicated string type. A **C string** is simply a \`char\` array where the end of the meaningful text is marked by a special **null terminator** byte, written \`'\\0'\`, whose value is 0. The string literal \`"Ada"\` is actually stored as 4 bytes: \`'A'\`, \`'d'\`, \`'a'\`, \`'\\0'\` -- the compiler adds the terminator for you automatically for string literals. Every function that works with C strings (like \`printf\`'s \`%s\`) scans forward from the given address until it finds that \`'\\0'\` byte, and stops there.

This has a real consequence: a C string's "length" (the number of real characters, not counting the terminator) is not something the array itself stores -- you compute it by scanning, which is exactly what \`strlen\` from \`<string.h>\` does. \`strlen\` returns a \`size_t\` (an unsigned integer type), printed with the \`%zu\` format specifier. If a char array is never properly null-terminated, \`strlen\` (and \`%s\`) will keep reading past the end of the array into whatever memory happens to follow -- a real and common source of bugs.`,
    commonMistakes: [
      "Forgetting that a C string needs a null terminator to know where it ends -- a char array missing '\\0' isn't a valid string, even if it 'looks' full of the right characters.",
      "Using the wrong printf specifier for strlen's return value -- it's a size_t, matched by %zu, not %d.",
      "Assuming a C array knows its own length at runtime -- you must track the size yourself or rely on a known fixed size.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How does C mark the end of a string's meaningful characters?",
        choices: [
          "With a length field stored alongside the array",
          "With a null terminator byte, '\\0'",
          "Strings in C are automatically padded with spaces",
          "C strings have no defined end -- you must always know the length separately",
        ],
        correctIndex: 1,
        explanation:
          "A C string is a char array whose end is marked by a '\\0' null-terminator byte.",
      },
      {
        id: "q2",
        prompt: 'What does strlen("Ada") return, and what type is it?',
        choices: ["4, an int", "3, a size_t", "3, a char", "4, a size_t, counting the terminator"],
        correctIndex: 1,
        explanation:
          'strlen counts only the real characters (not the terminator), returning a size_t -- so strlen("Ada") is 3.',
      },
      {
        id: "q3",
        prompt: "Does a plain C array store its own length at runtime?",
        choices: [
          "Yes, always automatically",
          "No -- the program must track the size itself",
          "Only arrays of char do",
          "Only arrays declared with `const`",
        ],
        correctIndex: 1,
        explanation:
          "C arrays carry no built-in length; you must know or track the size separately.",
      },
    ],
    takeaway:
      "A C string is just a char array ending in '\\0' -- functions like strlen and printf's %s work by scanning forward until they find that terminator byte.",
    summary:
      "Arrays have a fixed, untracked size; C strings are char arrays terminated by '\\0', and strlen (returning a size_t) computes length by scanning for it.",
    guidedOutputLab: {
      id: "c-lab-arrays-and-strings",
      title: "Predict: Arrays and a null-terminated string",
      language: "C",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char name[20] = "Ada";
    int numbers[3] = {10, 20, 30};

    printf("Name: %s\\n", name);
    printf("Length: %zu\\n", strlen(name));
    printf("First number: %d\\n", numbers[0]);
    printf("Sum: %d\\n", numbers[0] + numbers[1] + numbers[2]);

    return 0;
}`,
          expectedOutput: "Name: Ada\nLength: 3\nFirst number: 10\nSum: 60",
        },
      ],
      hints: [
        "The array is 20 bytes, but strlen only counts up to the '\\0' terminator after 'Ada' -- so the length is 3, not 20.",
        "10 + 20 + 30 = 60.",
      ],
    },
    nextLessonSlug: "c-multidimensional-arrays",
  },
  {
    id: "c-multidimensional-arrays",
    slug: "c-multidimensional-arrays",
    title: "Multi-Dimensional Arrays",
    description: "Declaring and iterating over a two-dimensional array with nested loops.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Declare and initialize a two-dimensional array",
      "Access an element with row/column indexing, e.g. grid[row][col]",
      "Iterate over a 2D array with nested for loops",
    ],
    skills: ["c-arrays"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Array declaration",
        url: "https://en.cppreference.com/w/c/language/array",
      },
    ],
    keywords: ["c 2d array", "multidimensional array", "nested loops"],
    explanation: `A two-dimensional array is declared with two size brackets: \`int grid[2][3];\` creates a grid of 2 rows and 3 columns (6 elements total). You can initialize it with nested braces, one inner brace list per row: \`int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};\`.

You access a single element with two indices, row first: \`grid[row][col]\`. Under the hood, a C 2D array is really laid out as one contiguous block of memory, row by row (this is called **row-major order**) -- \`grid[0][2]\` and \`grid[1][0]\` are actually adjacent in memory, even though they look far apart when you write them out.

Processing every element of a 2D array almost always means a **nested loop**: an outer loop over rows, and an inner loop over columns within that row: \`for (int row = 0; row < 2; row++) { for (int col = 0; col < 3; col++) { ... grid[row][col] ... } }\`. This pattern -- outer loop for rows, inner loop for columns -- comes up constantly whenever you're working with grids, matrices, or tables of data in C.`,
    commonMistakes: [
      "Swapping row and column in the index order, e.g. writing grid[col][row] instead of grid[row][col].",
      "Forgetting that a 2D array's total element count is rows times columns, and mis-sizing a loop bound as a result.",
      "Assuming a 2D array is a true 'array of arrays' pointer structure rather than one contiguous block laid out in row-major order.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many total elements does `int grid[2][3]` hold?",
        choices: ["2", "3", "5", "6"],
        correctIndex: 3,
        explanation: "2 rows times 3 columns is 6 total elements.",
      },
      {
        id: "q2",
        prompt: "What loop structure is typically used to visit every element of a 2D array?",
        choices: [
          "A single loop over the total element count only",
          "A nested loop: an outer loop over rows, an inner loop over columns",
          "A while loop with no counter at all",
          "A switch statement",
        ],
        correctIndex: 1,
        explanation:
          "Processing a 2D array typically uses an outer row loop and an inner column loop.",
      },
      {
        id: "q3",
        prompt:
          "In C's row-major layout, which two elements are adjacent in memory for `grid[2][3]`?",
        choices: [
          "grid[0][0] and grid[1][0]",
          "grid[0][2] and grid[1][0]",
          "grid[0][0] and grid[0][1]",
          "There is no defined adjacency",
        ],
        correctIndex: 2,
        explanation:
          "Row-major order stores each row contiguously, so elements within the same row (like grid[0][0] and grid[0][1]) are adjacent.",
      },
    ],
    takeaway:
      "Index a 2D array as grid[row][col], and process it with a nested loop -- an outer loop over rows and an inner loop over columns.",
    summary:
      "A 2D array is declared with two size brackets and stored contiguously in row-major order; nested loops (rows outside, columns inside) are the standard way to visit every element.",
    guidedOutputLab: {
      id: "c-lab-2d-arrays",
      title: "Predict: Summing a 2D array with nested loops",
      language: "C",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints, including spacing.",
      steps: [
        {
          code: `#include <stdio.h>

int main(void) {
    int grid[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    int total = 0;
    for (int row = 0; row < 2; row++) {
        for (int col = 0; col < 3; col++) {
            total += grid[row][col];
            printf("%d ", grid[row][col]);
        }
        printf("\\n");
    }
    printf("Total: %d\\n", total);

    return 0;
}`,
          expectedOutput: "1 2 3 \n4 5 6 \nTotal: 21",
        },
      ],
      hints: [
        'Each printf("%d ", ...) call adds a trailing space after every number, including the last one in a row, before the row\'s own newline.',
        "1 + 2 + 3 + 4 + 5 + 6 = 21.",
      ],
    },
    nextLessonSlug: "c-pointers-basics",
  },
  {
    id: "c-pointers-basics",
    slug: "c-pointers-basics",
    title: "Pointers and the & and * Operators",
    description:
      "What a pointer actually stores, and how & and * relate a pointer to the variable it points to.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Explain that a pointer variable stores a memory address",
      "Use & to get a variable's address and * to dereference a pointer back to its value",
      "Predict that modifying *pointer changes the original variable it points to",
    ],
    skills: ["c-pointers"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Pointer declaration",
        url: "https://en.cppreference.com/w/c/language/pointer",
      },
    ],
    keywords: ["c pointers", "address-of operator", "dereference operator"],
    explanation: `A **pointer** is a variable whose value is a memory address rather than an ordinary value like an int or a char. You declare one with an asterisk before its name: \`int *agePtr;\` declares \`agePtr\` as "a pointer to an int." The pointer itself takes up a fixed amount of memory (typically 4 or 8 bytes depending on the system) regardless of what type it points to.

Two operators connect a pointer to the variable it refers to. The **address-of operator**, \`&\`, gets a variable's memory address: \`int *agePtr = &age;\` makes \`agePtr\` point to \`age\`. The **dereference operator**, \`*\`, goes the other direction -- given a pointer, \`*agePtr\` accesses (reads or writes) the value stored at that address. Note that \`*\` here means two different things depending on context: in a declaration (\`int *agePtr\`), it marks the variable as a pointer type; in an expression (\`*agePtr = 26;\`), it dereferences an existing pointer.

This is the mechanism C uses to let a function modify a caller's variable: instead of passing the variable itself (which would just copy it, per pass-by-value), you pass its address, and the function dereferences the pointer to reach the real variable. Writing through \`*agePtr = 26;\` genuinely changes \`age\` itself, not a copy -- this is the foundation of everything pointers are used for in C, from function output parameters to dynamic memory to arrays.`,
    commonMistakes: [
      "Confusing the two meanings of `*` -- `int *p` declares a pointer type, while `*p` in an expression dereferences an existing pointer to reach its target's value.",
      "Dereferencing a pointer that was never initialized to point anywhere valid, reading or writing an essentially random memory address.",
      "Forgetting `&` when trying to get a variable's address, and instead accidentally using the variable's value where an address was expected.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does a pointer variable actually store?",
        choices: [
          "A copy of another variable's value",
          "A memory address",
          "A function name",
          "A type name",
        ],
        correctIndex: 1,
        explanation: "A pointer stores a memory address, not the value at that address.",
      },
      {
        id: "q2",
        prompt: "Given `int *agePtr = &age;`, what does `*agePtr = 26;` do?",
        choices: [
          "Nothing -- it's invalid syntax",
          "It changes what agePtr points to, without touching age",
          "It writes 26 into age itself, through the pointer",
          "It creates a new variable called agePtr",
        ],
        correctIndex: 2,
        explanation:
          "Dereferencing with `*agePtr = 26;` writes directly into the memory age occupies.",
      },
      {
        id: "q3",
        prompt: "What does the `&` operator do when applied to a variable?",
        choices: [
          "Doubles its value",
          "Returns the variable's memory address",
          "Declares it as a pointer",
          "Converts it to a different type",
        ],
        correctIndex: 1,
        explanation: "`&variable` produces the memory address where that variable is stored.",
      },
    ],
    takeaway:
      "`&variable` gets an address; `*pointer` reads or writes the value at that address -- writing through a dereferenced pointer changes the original variable, not a copy.",
    summary:
      "A pointer stores a memory address; `&` obtains one from a variable, and `*` dereferences a pointer to reach the value it points to, letting code modify the original variable.",
    guidedOutputLab: {
      id: "c-lab-pointers-basics",
      title: "Fill in the blank: writing through a pointer",
      language: "C",
      mode: "fill-in-blank",
      prompt:
        "Fill in the missing operator so the assignment writes through the pointer, then predict the output.",
      steps: [
        {
          code: `#include <stdio.h>

int main(void) {
    int age = 25;
    int *agePtr = &age;

    printf("Before: %d\\n", age);

    ____agePtr = 26;

    printf("After: %d\\n", age);

    return 0;
}`,
          expectedOutput: "Before: 25\nAfter: 26",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "*",
      hints: [
        "You need the dereference operator to write through agePtr into the memory age occupies.",
        "Without dereferencing, you'd be reassigning what agePtr points to, not changing age's value.",
      ],
    },
    nextLessonSlug: "c-pointer-arithmetic-and-arrays",
  },
  {
    id: "c-pointer-arithmetic-and-arrays",
    slug: "c-pointer-arithmetic-and-arrays",
    title: "Pointer Arithmetic and Arrays as Pointers",
    description:
      "How array indexing and pointer arithmetic are really the same operation underneath.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 7,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Explain that an array name decays to a pointer to its first element in most expressions",
      "Predict the result of pointer arithmetic like *(p + 1)",
      "Recognize that nums[i] and *(nums + i) are equivalent",
    ],
    skills: ["c-pointers", "c-arrays"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Pointer declaration",
        url: "https://en.cppreference.com/w/c/language/pointer",
      },
    ],
    keywords: ["c pointer arithmetic", "array decay", "pointer indexing"],
    explanation: `In most expressions, an array name **decays** into a pointer to its first element. Given \`int nums[4] = {10, 20, 30, 40};\`, writing \`int *p = nums;\` makes \`p\` point to \`nums[0]\`, without needing \`&nums[0]\` explicitly -- the array name alone already behaves like that address in this context.

**Pointer arithmetic** doesn't move by raw bytes; \`p + 1\` moves forward by exactly one element of \`p\`'s pointed-to type, not one byte -- the compiler already knows to scale by \`sizeof(int)\` (or whatever type \`p\` points to) automatically. So \`*(p + 1)\` dereferences the element right after wherever \`p\` currently points, which is why array indexing and pointer arithmetic end up being the same operation underneath: \`nums[i]\` is defined to mean exactly \`*(nums + i)\`, and C actually uses this equivalence directly rather than treating indexing as some separate, special mechanism.

A pointer variable, unlike an array, can be reassigned to point elsewhere: \`p++;\` moves \`p\` forward by one element, so after \`p++\`, \`*p\` now refers to what was \`nums[1]\`, not \`nums[0]\` anymore. This is genuinely useful for walking through an array without needing a separate index variable, but it also means a pointer can be advanced past the end of a valid array with nothing stopping you -- reading or writing through it there is undefined behavior.`,
    commonMistakes: [
      "Assuming `p + 1` advances a pointer by one byte, forgetting the compiler scales the step by the size of the pointed-to type.",
      "Advancing a pointer past the end of its array (or before its start) and dereferencing it there, which reads or writes outside the array's valid memory.",
      "Confusing an array (whose size is fixed and whose name can't be reassigned) with a pointer (which can be reassigned to point anywhere).",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `nums[i]` mean in terms of pointer arithmetic?",
        choices: ["*(nums) + i", "*(nums + i)", "&nums + i", "nums + &i"],
        correctIndex: 1,
        explanation: "C defines array indexing as exactly `*(nums + i)`.",
      },
      {
        id: "q2",
        prompt: "If `p` points to an int, what does `p + 1` actually advance by?",
        choices: [
          "Exactly 1 byte, always",
          "One element of the type p points to (e.g. sizeof(int) bytes for an int pointer)",
          "It depends on the value stored, not the type",
          "It's undefined in all cases",
        ],
        correctIndex: 1,
        explanation: "Pointer arithmetic scales by the size of the pointed-to type, not raw bytes.",
      },
      {
        id: "q3",
        prompt: "What happens to an array name in most expressions?",
        choices: [
          "It stays a fixed-size array type and never changes",
          "It decays into a pointer to its first element",
          "It becomes a string automatically",
          "It's converted to an int representing its length",
        ],
        correctIndex: 1,
        explanation: "In most expressions, an array name decays to a pointer to its first element.",
      },
    ],
    takeaway:
      "nums[i] and *(nums + i) mean exactly the same thing in C -- pointer arithmetic scales automatically by the pointed-to type's size, not raw bytes.",
    summary:
      "An array name decays to a pointer to its first element; pointer arithmetic advances by whole elements, and array indexing is defined directly in terms of it.",
    guidedOutputLab: {
      id: "c-lab-pointer-arithmetic",
      title: "Predict: Pointer arithmetic over an array",
      language: "C",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints, one value per line.",
      steps: [
        {
          code: `#include <stdio.h>

int main(void) {
    int nums[4] = {10, 20, 30, 40};
    int *p = nums;

    printf("%d\\n", *p);
    printf("%d\\n", *(p + 1));
    printf("%d\\n", nums[2]);
    printf("%d\\n", *(nums + 2));

    p++;
    printf("%d\\n", *p);

    return 0;
}`,
          expectedOutput: "10\n20\n30\n30\n20",
        },
      ],
      hints: [
        "p starts pointing at nums[0] (value 10), so *(p + 1) is nums[1] (value 20).",
        "nums[2] and *(nums + 2) are the same element by definition, both 30.",
        "After p++, p points to nums[1], so *p becomes 20.",
      ],
    },
    nextLessonSlug: "c-dynamic-memory-malloc-free",
  },
  {
    id: "c-dynamic-memory-malloc-free",
    slug: "c-dynamic-memory-malloc-free",
    title: "Dynamic Memory with malloc and free",
    description:
      "Allocating heap memory at runtime, and the leak/dangling-pointer risks of managing it yourself.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 8,
    difficulty: "advanced",
    estimatedMinutes: 22,
    objectives: [
      "Allocate heap memory with malloc and check whether it succeeded",
      "Release allocated memory with free once it's no longer needed",
      "Explain what a memory leak and a dangling pointer are, and how to avoid each",
    ],
    skills: ["c-memory"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Dynamic memory management",
        url: "https://en.cppreference.com/w/c/memory",
      },
    ],
    keywords: ["malloc", "free", "memory leak", "dangling pointer", "heap allocation"],
    explanation: `So far, every variable's size has been fixed and known at compile time. \`malloc\` (from \`<stdlib.h>\`) lets a program request a block of memory at **runtime**, from a region called the **heap**: \`int *arr = malloc(3 * sizeof(int));\` requests enough space for 3 ints and returns a pointer to the start of that block. \`malloc\` can fail (e.g. if the system is out of memory), returning \`NULL\` in that case -- production code should always check for this before using the returned pointer.

Memory obtained from \`malloc\` is **not** automatically cleaned up when it goes out of scope, unlike a local variable's stack memory. You must explicitly release it with \`free(arr);\` once you're done with it. Forgetting to call \`free\` on memory you no longer use is a **memory leak** -- the memory stays reserved for the rest of the program's run, unusable by anything else, even though nothing in your program can reach it anymore.

There's a danger on the other side too: a **dangling pointer** is a pointer that still holds the address of memory that has already been freed. Using it after the \`free\` call (reading, writing, or calling \`free\` on it a second time) is undefined behavior -- it might appear to work, corrupt unrelated data, or crash, unpredictably. A common defensive habit is setting a pointer to \`NULL\` immediately after freeing it (\`free(arr); arr = NULL;\`), so any accidental later use fails predictably and safely rather than silently corrupting memory.`,
    commonMistakes: [
      "Forgetting to call free() on heap memory once it's no longer needed, causing a memory leak.",
      "Using a pointer after calling free() on it (a dangling pointer), or calling free() on the same pointer twice.",
      "Not checking whether malloc returned NULL before using the pointer it returned, assuming allocation always succeeds.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does malloc return if it fails to allocate the requested memory?",
        choices: ["0", "-1", "NULL", "It throws an exception"],
        correctIndex: 2,
        explanation: "A failed malloc call returns NULL, which should always be checked for.",
      },
      {
        id: "q2",
        prompt: "What is a memory leak?",
        choices: [
          "Using a pointer after it has been freed",
          "Forgetting to free heap memory that's no longer reachable or used",
          "Declaring too many local variables",
          "A stack overflow from deep recursion",
        ],
        correctIndex: 1,
        explanation:
          "A memory leak is heap memory that's never freed, staying reserved and unusable for the rest of the program's run.",
      },
      {
        id: "q3",
        prompt: "What is a dangling pointer?",
        choices: [
          "A pointer that was never initialized",
          "A pointer still holding the address of memory that has already been freed",
          "A pointer to a stack variable",
          "A pointer with the wrong type",
        ],
        correctIndex: 1,
        explanation:
          "A dangling pointer points to memory that has already been freed; using it is undefined behavior.",
      },
    ],
    takeaway:
      "Every successful malloc needs a matching free once the memory is no longer needed -- and setting a pointer to NULL right after freeing it helps catch accidental reuse.",
    summary:
      "malloc requests heap memory at runtime and can fail (returning NULL); free releases it explicitly, since heap memory isn't cleaned up automatically -- forgetting free leaks memory, and using freed memory creates a dangling pointer.",
    guidedOutputLab: {
      id: "c-lab-malloc-free",
      title: "Guided edit: Adding free() to a heap allocation",
      language: "C",
      mode: "guided-editing",
      prompt: "Follow each step to see how adding free() changes this program's resource hygiene.",
      steps: [
        {
          description:
            "Start with a heap allocation that's used but never freed. This is a memory leak -- a real bug, even though it doesn't change this program's printed output, since the program exits immediately afterward anyway.",
          code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = malloc(3 * sizeof(int));
    if (arr == NULL) {
        printf("Allocation failed\\n");
        return 1;
    }

    for (int i = 0; i < 3; i++) {
        arr[i] = (i + 1) * 10;
    }

    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum += arr[i];
    }
    printf("Sum: %d\\n", sum);

    return 0;
}`,
          expectedOutput: "Sum: 60",
        },
        {
          description:
            "Add free(arr) once the memory is no longer needed, and set arr to NULL right after so any accidental later use is caught safely instead of silently corrupting memory.",
          code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = malloc(3 * sizeof(int));
    if (arr == NULL) {
        printf("Allocation failed\\n");
        return 1;
    }

    for (int i = 0; i < 3; i++) {
        arr[i] = (i + 1) * 10;
    }

    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum += arr[i];
    }
    printf("Sum: %d\\n", sum);

    free(arr);
    arr = NULL;
    printf("Done\\n");

    return 0;
}`,
          expectedOutput: "Sum: 60\nDone",
        },
      ],
      hints: [
        "arr[0], arr[1], arr[2] are set to 10, 20, 30, so sum is 60 in both versions -- the fix doesn't change what's printed here, only whether the memory is properly released.",
        "Setting arr = NULL after free(arr) is a defensive habit: dereferencing NULL fails predictably, while dereferencing a dangling pointer can silently corrupt memory.",
      ],
    },
    nextLessonSlug: "c-structs-and-typedef",
  },
  {
    id: "c-structs-and-typedef",
    slug: "c-structs-and-typedef",
    title: "Structs and typedef",
    description:
      "Grouping related fields with struct, and giving struct types a clean name with typedef.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Define a struct type grouping several related fields",
      "Use typedef to give a struct type a shorter, reusable name",
      "Predict that assigning one struct variable to another copies all its fields by value",
    ],
    skills: ["c-structs"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Struct declaration",
        url: "https://en.cppreference.com/w/c/language/struct",
      },
    ],
    keywords: ["c struct", "typedef", "struct assignment"],
    explanation: `A \`struct\` groups several related fields, possibly of different types, into a single custom type: \`struct Person { char name[20]; int age; };\`. You access a field with the dot operator: \`somePerson.age\`.

Writing \`struct Person\` every time you refer to the type gets verbose, so C offers \`typedef\` to give it a shorter alias. Combining a struct definition with typedef, \`typedef struct { char name[20]; int age; } Person;\`, lets you write just \`Person\` afterward instead of \`struct Person\` everywhere -- this is an extremely common pattern in real C codebases.

Like other C values, a struct is copied by value on assignment: \`Person carol = bob;\` copies every field of \`bob\` into a brand-new, independent \`carol\` -- changing \`carol.age\` afterward has no effect on \`bob.age\` at all. This is the same value semantics you've already seen for plain variables and function parameters, just applied to a type with multiple fields at once. Passing a struct to a function (by value, without a pointer) copies the whole thing the same way, which is worth remembering for larger structs where that copy has a real performance cost.`,
    commonMistakes: [
      "Forgetting to use the dot operator to access a struct field, e.g. writing `person.age` incorrectly or omitting it entirely.",
      "Assuming `Person carol = bob;` makes carol and bob share the same underlying data, instead of realizing it copies every field independently.",
      "Repeating `struct Person` everywhere instead of using typedef to introduce a shorter alias, which is idiomatic in real C code.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `typedef struct { ... } Person;` let you do afterward?",
        choices: [
          "Nothing different -- it's purely a comment",
          "Refer to the type as just `Person` instead of `struct Person`",
          "Automatically initialize every field to zero",
          "Make the struct immutable",
        ],
        correctIndex: 1,
        explanation:
          "typedef gives the struct type a shorter alias, usable without the `struct` keyword.",
      },
      {
        id: "q2",
        prompt:
          "After `Person carol = bob;` followed by `carol.age = 41;`, what happens to bob.age?",
        choices: [
          "It also becomes 41, since carol and bob share the same data",
          "It stays unchanged, since the assignment copied every field independently",
          "It becomes undefined behavior",
          "It's a compile error to assign one struct to another",
        ],
        correctIndex: 1,
        explanation:
          "Struct assignment copies every field by value, so carol and bob are independent afterward.",
      },
      {
        id: "q3",
        prompt: "How do you access a field of a struct variable?",
        choices: [
          "With square brackets",
          "With the dot operator",
          "With the arrow operator only",
          "With parentheses",
        ],
        correctIndex: 1,
        explanation:
          "A struct variable's field is accessed with the dot operator, e.g. `person.age`.",
      },
    ],
    takeaway:
      "typedef gives a struct a shorter, reusable name, and assigning one struct variable to another copies every field independently, just like plain variables.",
    summary:
      "struct groups related fields into one type, accessed with the dot operator; typedef gives it a shorter alias; struct assignment and pass-by-value both copy all fields.",
    guidedOutputLab: {
      id: "c-lab-structs-typedef",
      title: "Predict: A typedef'd struct and value-copy assignment",
      language: "C",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `#include <stdio.h>

typedef struct {
    char name[20];
    int age;
} Person;

void printPerson(Person p) {
    printf("%s is %d years old\\n", p.name, p.age);
}

int main(void) {
    Person bob = {"Bob", 40};
    printPerson(bob);

    Person carol = bob;
    carol.age = 41;

    printf("bob age: %d, carol age: %d\\n", bob.age, carol.age);

    return 0;
}`,
          expectedOutput: "Bob is 40 years old\nbob age: 40, carol age: 41",
        },
      ],
      hints: [
        "printPerson receives its own copy of bob, and prints bob's original name and age.",
        "carol is a full independent copy of bob -- changing carol.age never touches bob.age.",
      ],
    },
    nextLessonSlug: "c-header-files-and-multifile-compilation",
  },
  {
    id: "c-header-files-and-multifile-compilation",
    slug: "c-header-files-and-multifile-compilation",
    title: "Header Files and Multi-File Compilation",
    description: "Splitting a program across .h and .c files, and why #include guards matter.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Explain the difference between a .h header file's declarations and a .c file's definitions",
      "Use #include to bring a header's declarations into another file",
      "Explain why #include guards prevent a header from being processed twice in one compilation",
    ],
    skills: ["c-program-structure"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: #include directive",
        url: "https://en.cppreference.com/w/c/preprocessor/include",
      },
    ],
    keywords: ["c header files", "include guards", "multi-file compilation"],
    explanation: `Real C programs are split across multiple files as they grow. The convention is a **header file** (\`.h\`) holding **declarations** -- what a function's signature is, without its body -- and a **source file** (\`.c\`) holding the actual **definitions**, the real implementation. \`#include "mathutils.h"\` textually pastes the header's contents into whatever file includes it, before compilation proper begins, which is how one file can call a function that's actually implemented in a different \`.c\` file.

Because \`#include\` is a simple text-paste operation, a header accidentally included twice in the same compilation (directly or indirectly, e.g. through two other headers that both include it) would produce duplicate declarations, which some C constructs don't tolerate. The standard fix is an **include guard**: wrapping a header's contents in \`#ifndef HEADER_NAME_H\` / \`#define HEADER_NAME_H\` / \`#endif\`. The first time the header is included, \`HEADER_NAME_H\` isn't defined yet, so its contents are processed and the macro gets defined; any subsequent \`#include\` of the same header in that compilation sees the macro already defined and skips the contents entirely.

To build a multi-file program, you compile each \`.c\` file into its own object file, then link them together -- \`gcc main.c mathutils.c -o main\` compiles both and links them into one executable in a single command. This separation (declarations in a shared header, one real implementation in one \`.c\` file, other files including only the header) is the foundation of how larger C projects stay organized and how libraries expose their public functions without exposing their internal implementation files.`,
    commonMistakes: [
      "Putting a function's full implementation inside a header file instead of just its declaration, which risks duplicate-definition errors when the header is included by more than one .c file.",
      "Forgetting #include guards, risking the header being processed twice in one compilation if it's included both directly and indirectly.",
      "Believing #include is anything more than a literal text-paste of the included file's contents at that point in the source.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does a .h header file conventionally contain?",
        choices: [
          "Full function implementations only",
          "Declarations (like function signatures), not full implementations",
          "Only comments and documentation",
          "Compiled machine code",
        ],
        correctIndex: 1,
        explanation:
          "Headers conventionally hold declarations; the real implementation lives in a .c file.",
      },
      {
        id: "q2",
        prompt: "What problem do #include guards (#ifndef/#define/#endif) solve?",
        choices: [
          "They speed up compilation",
          "They prevent a header's contents from being processed twice in one compilation",
          "They automatically link object files together",
          "They convert a .h file into a .c file",
        ],
        correctIndex: 1,
        explanation:
          "Include guards ensure a header's contents are only processed once per compilation, even if included multiple times.",
      },
      {
        id: "q3",
        prompt: "What does the #include directive actually do?",
        choices: [
          "It links two compiled object files at runtime",
          "It textually pastes the included file's contents at that point in the source",
          "It imports a compiled binary module",
          "It only works for standard library headers, not your own files",
        ],
        correctIndex: 1,
        explanation:
          "#include is a preprocessor directive that textually inserts the named file's contents.",
      },
    ],
    takeaway:
      "Keep declarations in a shared .h header (guarded with #ifndef/#define/#endif) and the real implementation in one .c file -- #include is just a text-paste, which is exactly why guards matter.",
    summary:
      "Multi-file C programs split declarations (headers) from definitions (.c files); #include pastes header text in; include guards stop a header's contents from being processed twice in one compilation.",
    guidedOutputLab: {
      id: "c-lab-header-files",
      title: "Predict: A program split across a header and two source files",
      language: "C",
      mode: "predict",
      prompt:
        "This shows three files that together form one program (comments mark each file's boundary). Predict what main.c prints once all three are compiled and linked together.",
      steps: [
        {
          code: `// file: mathutils.h
#ifndef MATHUTILS_H
#define MATHUTILS_H

int add(int a, int b);

#endif

// file: mathutils.c
#include "mathutils.h"

int add(int a, int b) {
    return a + b;
}

// file: main.c
#include <stdio.h>
#include "mathutils.h"

int main(void) {
    printf("3 + 4 = %d\\n", add(3, 4));
    return 0;
}`,
          expectedOutput: "3 + 4 = 7",
        },
      ],
      hints: [
        "main.c only sees add's declaration from the header, but the linker connects that call to add's real implementation in mathutils.c.",
        "3 + 4 = 7.",
      ],
    },
    nextLessonSlug: "c-undefined-behavior-pitfalls",
  },
  {
    id: "c-undefined-behavior-pitfalls",
    slug: "c-undefined-behavior-pitfalls",
    title: "Common Undefined-Behavior Pitfalls",
    description:
      "Buffer overflows, use-after-free, and uninitialized variables -- and the defensive habits that avoid them.",
    trackSlug: "c",
    courseSlug: "c-programming",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 22,
    objectives: [
      "Explain what a buffer overflow is and how a bounded copy like strncpy helps avoid one",
      "Explain why reading an uninitialized variable is undefined behavior, not just 'probably zero'",
      "Recognize use-after-free as a dangling-pointer bug and describe how to avoid it",
    ],
    skills: ["c-memory", "c-program-structure"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: C string handling",
        url: "https://en.cppreference.com/w/c/string/byte",
      },
    ],
    keywords: ["undefined behavior", "buffer overflow", "use-after-free", "uninitialized variable"],
    explanation: `C's speed and control come from giving the programmer very little built-in safety net. Several categories of mistakes don't produce a clean error -- they produce **undefined behavior**, meaning the C standard places no requirement at all on what happens next. The program might crash, might silently corrupt unrelated data, or might appear to "work" for years until it doesn't. This lesson doesn't execute any undefined behavior (there's no well-defined "expected output" for it to honestly show you) -- instead, it walks through the most common categories and the concrete habits that avoid them.

A **buffer overflow** happens when code writes past the end of an array or char buffer's allocated space, corrupting whatever memory happens to sit next to it. Copying a string with a plain \`strcpy\` into a fixed-size buffer, without checking the source's length against the buffer's size, is a classic way this happens. A bounded function like \`strncpy(buffer, source, sizeof(buffer) - 1)\` limits how many bytes get written, and explicitly setting the last byte to \`'\\0'\` afterward guarantees proper termination even if the source was longer than the buffer.

An **uninitialized variable** holds whatever bits happened to already be in that memory location -- not reliably zero, not reliably anything. Reading it before assigning it a real value is undefined behavior, even though it often "looks like" it just contains garbage. The fix is simple and absolute: always give a local variable an initial value before its first read, e.g. \`int total = 0;\` instead of declaring \`int total;\` and hoping.

**Use-after-free** is the dangling-pointer problem from the previous lesson viewed from the bug's perspective: dereferencing, reading, writing, or re-freeing a pointer after its memory has already been released with \`free\`. The defensive habit from that lesson -- setting a pointer to \`NULL\` immediately after freeing it -- turns an unpredictable use-after-free into a predictable, immediately obvious \`NULL\`-dereference instead.`,
    commonMistakes: [
      "Copying a string into a fixed-size buffer without bounding the copy by the buffer's actual size, risking a buffer overflow.",
      "Reading a local variable before giving it an initial value, assuming it defaults to zero the way some other languages guarantee.",
      "Continuing to use a pointer after calling free() on it, instead of setting it to NULL immediately to make any accidental reuse fail predictably.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What does the C standard guarantee about the value of an uninitialized local variable?",
        choices: [
          "It's always 0",
          "It's always whatever the previous variable in that memory held",
          "Nothing -- reading it before assignment is undefined behavior",
          "It's always a compile error to read it",
        ],
        correctIndex: 2,
        explanation:
          "The standard places no requirement on an uninitialized variable's value; reading it before assignment is undefined behavior.",
      },
      {
        id: "q2",
        prompt: "What is a buffer overflow?",
        choices: [
          "Declaring an array that's too large",
          "Writing past the end of an array or buffer's allocated space",
          "Using a pointer before it's declared",
          "Returning too many values from a function",
        ],
        correctIndex: 1,
        explanation:
          "A buffer overflow is writing past the bounds of the memory actually allocated for a buffer.",
      },
      {
        id: "q3",
        prompt:
          "What defensive habit turns an unpredictable use-after-free into a predictable failure?",
        choices: [
          "Never calling free() at all",
          "Setting a pointer to NULL immediately after freeing it",
          "Doubling the buffer size",
          "Declaring the pointer as const",
        ],
        correctIndex: 1,
        explanation:
          "Setting a freed pointer to NULL makes accidental later use a predictable, immediately visible NULL-dereference instead of silent corruption.",
      },
    ],
    takeaway:
      "Always initialize local variables before reading them, bound every copy into a fixed buffer by that buffer's real size, and null out a pointer right after freeing it.",
    summary:
      "Buffer overflows, uninitialized reads, and use-after-free are all undefined behavior with no guaranteed outcome -- bounded copies, always-initialize, and null-after-free are the standard defenses.",
    guidedOutputLab: {
      id: "c-lab-safe-buffer-and-init",
      title: "Predict: A safely bounded copy and a properly initialized total",
      language: "C",
      mode: "predict",
      prompt:
        "This program applies both defensive habits from this lesson correctly. Read it and predict exactly what it prints.",
      steps: [
        {
          code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buffer[10];
    strncpy(buffer, "hello", sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\\0';

    int total = 0;
    for (int i = 0; i < 5; i++) {
        total += i;
    }

    printf("buffer: %s\\n", buffer);
    printf("total: %d\\n", total);

    return 0;
}`,
          expectedOutput: "buffer: hello\ntotal: 10",
        },
      ],
      hints: [
        '"hello" is 5 characters, well within the 9-byte limit strncpy is given (sizeof(buffer) - 1), so it copies safely.',
        "total starts at 0 (explicitly initialized) and accumulates 0+1+2+3+4 = 10.",
      ],
    },
  },
];
