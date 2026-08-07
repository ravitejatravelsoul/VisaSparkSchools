import type { LessonInput } from "@/lib/content/types";

/**
 * Go Programming lessons. Go has no safe, small in-browser execution option
 * (see docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md), so every lesson
 * uses a `guidedOutputLab` (read/predict/fill-in-blank/guided-editing against
 * a precomputed "Expected output") instead of `example`/`guidedExercise`/
 * `independentExercise` -- see lib/content/types.ts's Phase 6/8 note and
 * components/runners/guided-output-panel.tsx. Every code sample and its
 * expected output were verified by hand against real Go semantics.
 */
export const goLessons: LessonInput[] = [
  {
    id: "go-introduction-and-toolchain",
    slug: "go-introduction-and-toolchain",
    title: "Introduction to Go and the Toolchain",
    description: "What Go is, why it exists, and the shape of a minimal Go program.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain what kind of language Go is and what it's commonly used for",
      "Identify the parts of a minimal Go program: package, import, func main",
      "Describe what `go run` and `go build` each do",
    ],
    skills: ["go-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "The Go Programming Language", url: "https://go.dev/" },
      { label: "A Tour of Go", url: "https://go.dev/tour/" },
    ],
    keywords: ["go", "golang", "go toolchain", "go run", "go build"],
    explanation: `Go (often called Golang) is a statically-typed, compiled language created at Google, designed for simplicity, fast compilation, and built-in support for concurrency. It compiles to a single, standalone binary with no external runtime to install -- a major reason it's popular for backend services, command-line tools, and cloud infrastructure (Docker and Kubernetes are both written in Go).

Every Go program starts with a **package** declaration. An executable program's entry-point file declares \`package main\`, and Go looks for a function named \`main\` inside it to run first. Anything the program needs from outside itself -- including Go's own standard library -- comes in through an \`import\` statement.

Go ships with two everyday commands: \`go run file.go\` compiles and immediately runs a program without leaving a binary behind (convenient while developing), and \`go build\` compiles it into a standalone executable file you can distribute and run later without Go installed.

This platform can't safely compile or execute real Go code in your browser (see this course's guided-lab notice on every lesson), so instead of a live runner, each lesson gives you real Go source code and asks you to work out what it does -- exactly the skill of reading code you'll need constantly as a working Go developer.`,
    commonMistakes: [
      "Forgetting that Go requires every imported package to actually be used -- an unused import is a compile error, not just a warning.",
      "Confusing `go run` (compile + run, no binary kept) with `go build` (compile to a binary, don't run it).",
      "Assuming Go needs a separate runtime installed on the machine running the compiled binary -- it doesn't; the binary is standalone.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What must every executable Go program's entry file declare?",
        choices: ["package main", "package app", "module main", "class Main"],
        correctIndex: 0,
        explanation: "An executable Go program's entry file must declare `package main`.",
      },
      {
        id: "q2",
        prompt: "What does `go run file.go` do that `go build file.go` does not?",
        choices: [
          "It leaves a compiled binary on disk without running it",
          "It compiles and immediately executes the program without leaving a binary behind",
          "It only checks syntax without compiling",
          "It installs Go itself",
        ],
        correctIndex: 1,
        explanation:
          "`go run` compiles and runs immediately; `go build` compiles to a standalone binary instead.",
      },
      {
        id: "q3",
        prompt: "Which function does Go look for as the entry point of an executable program?",
        choices: ["start()", "main()", "run()", "init()"],
        correctIndex: 1,
        explanation: "Go runs the `main` function in `package main` as the program's entry point.",
      },
    ],
    takeaway:
      "A Go program's entry point is `func main` inside `package main`; `go run` compiles and runs immediately, `go build` produces a standalone binary.",
    summary:
      "Go is a compiled, statically-typed language built for simplicity and concurrency, distributed as standalone binaries with no external runtime required.",
    guidedOutputLab: {
      id: "go-lab-hello-world",
      title: "Predict: A minimal Go program",
      language: "Go",
      mode: "predict",
      prompt:
        "Read this program and predict exactly what it prints when run with `go run main.go`.",
      steps: [
        {
          code: `package main

import "fmt"

func main() {
	fmt.Println("Hello, Go!")
	fmt.Printf("2 + 2 = %d\\n", 2+2)
}`,
          expectedOutput: "Hello, Go!\n2 + 2 = 4",
        },
      ],
      hints: [
        "`fmt.Println` adds a newline automatically; `fmt.Printf` needs an explicit `\\n` if you want one.",
        "`%d` is the format verb for a base-10 integer in `Printf`.",
      ],
    },
    nextLessonSlug: "go-variables-types-and-constants",
  },
  {
    id: "go-variables-types-and-constants",
    slug: "go-variables-types-and-constants",
    title: "Variables, Types, and Constants",
    description: "Declaring variables with `var` and `:=`, Go's basic types, and constants.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Declare variables with both `var` and the `:=` short form",
      "Identify Go's basic types: int, float64, string, bool",
      "Explain the difference between a variable and a `const`",
    ],
    skills: ["go-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "A Tour of Go: Basics", url: "https://go.dev/tour/basics" }],
    keywords: ["go variables", "go types", "go constants", ":= operator"],
    explanation: `Go is statically typed: every variable has a fixed type, checked at compile time. You can declare one explicitly with \`var name Type = value\`, or let Go infer the type from the value using the short declaration \`name := value\` -- \`:=\` can only be used inside a function, never at package level.

Go's basic types include \`int\` (platform-sized integer), \`float64\` (double-precision decimal), \`string\`, and \`bool\`. Unlike some languages, Go does not automatically convert between numeric types -- adding an \`int\` and a \`float64\` directly is a compile error; you must convert explicitly with something like \`float64(someInt)\`.

A \`const\` is a compile-time constant -- its value must be knowable at compile time and can never change. Constants are declared with \`const name = value\` (no \`:=\` form exists for constants).

Every declared variable in Go must be used somewhere, just like imports -- an unused local variable is a compile error, not a warning, which is a deliberate design choice to keep code free of dead declarations.`,
    commonMistakes: [
      "Trying to use `:=` at package level (outside any function) -- it only works for local variables inside a function body.",
      "Adding an `int` and a `float64` directly without an explicit conversion, expecting automatic promotion like in some other languages.",
      "Declaring a local variable and never using it, forgetting Go treats this as a compile error.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Where can the `:=` short variable declaration be used?",
        choices: [
          "Anywhere, including package level",
          "Only inside a function body",
          "Only for constants",
          "Only for string types",
        ],
        correctIndex: 1,
        explanation: "`:=` is only valid inside a function; package-level variables need `var`.",
      },
      {
        id: "q2",
        prompt: "What happens if you declare a local variable in Go and never use it?",
        choices: [
          "Nothing, it's silently ignored",
          "A runtime warning is printed",
          "A compile error occurs",
          "Go automatically removes the declaration",
        ],
        correctIndex: 2,
        explanation:
          "Go treats an unused local variable as a compile error, not just a lint warning.",
      },
      {
        id: "q3",
        prompt: "Can you add an `int` and a `float64` directly in Go without conversion?",
        choices: [
          "Yes, Go promotes int to float64 automatically",
          "No, it's a compile error without an explicit conversion",
          "Yes, but only in a const expression",
          "No, Go has no way to mix these types at all",
        ],
        correctIndex: 1,
        explanation:
          "Go requires explicit conversion between numeric types; there is no automatic promotion.",
      },
    ],
    takeaway:
      "Use `:=` for local variables when the type is obvious from the value, `var` when you need an explicit type or are at package level, and remember Go never auto-converts between numeric types.",
    summary:
      "Go variables are statically typed, declared with `var` or `:=`; constants use `const`; unused local variables and cross-type arithmetic without conversion are both compile errors.",
    guidedOutputLab: {
      id: "go-lab-variables",
      title: "Predict: Variables and type conversion",
      language: "Go",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `package main

import "fmt"

func main() {
	name := "Ada"
	var age int = 30
	const pi = 3.14159

	height := 5.5
	heightCm := height * 30.48

	fmt.Printf("%s is %d years old.\\n", name, age)
	fmt.Printf("Height in cm: %.1f\\n", heightCm)
	fmt.Println("Pi is approximately", pi)
}`,
          expectedOutput: "Ada is 30 years old.\nHeight in cm: 167.6\nPi is approximately 3.14159",
        },
      ],
      hints: [
        "`%.1f` formats a float with exactly one digit after the decimal point.",
        "5.5 * 30.48 = 167.64, which rounds to 167.6 at one decimal place.",
      ],
    },
    nextLessonSlug: "go-control-flow",
  },
  {
    id: "go-control-flow",
    slug: "go-control-flow",
    title: "Control Flow: if, for, and switch",
    description: "Go's single looping construct, condition-only if statements, and switch.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Write a `for` loop in Go's three common forms (counting, condition-only, infinite)",
      "Write `if`/`else if`/`else` without requiring parentheses around the condition",
      "Use `switch` without needing an explicit `break` in each case",
    ],
    skills: ["go-basics", "go-control-flow"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "A Tour of Go: Flow control", url: "https://go.dev/tour/flowcontrol" }],
    keywords: ["go for loop", "go if", "go switch"],
    explanation: `Go has exactly **one** looping keyword: \`for\`. It covers every loop shape other languages split across \`for\`/\`while\`/\`do-while\`: a counting loop (\`for i := 0; i < n; i++\`), a condition-only loop (\`for condition\`, like a \`while\`), and an infinite loop (\`for {}\`, exited with \`break\`).

\`if\` conditions never need parentheses (\`if x > 0 { ... }\`, not \`if (x > 0)\`), and the opening brace must be on the same line as the condition -- Go's formatting rules aren't just style preference here, they're enforced by the compiler's parsing rules.

Go's \`switch\` does **not** fall through to the next case by default (unlike C, Java, or JavaScript) -- each case automatically breaks after its own block, so you don't need an explicit \`break\` statement. If you genuinely want fallthrough behavior, you opt in explicitly with the \`fallthrough\` keyword.`,
    commonMistakes: [
      "Adding parentheses around an `if`/`for` condition out of habit from another language -- Go allows this to compile in some forms but it's not idiomatic and can cause confusion with more complex conditions.",
      "Expecting a `switch` case to fall through to the next case by default, forgetting Go breaks automatically after each case.",
      "Forgetting Go has no `while` keyword -- a condition-only `for` is how you write what other languages call a while loop.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many looping keywords does Go have?",
        choices: [
          "One (`for`, covering all loop shapes)",
          "Two (`for` and `while`)",
          "Three (`for`, `while`, `do`)",
          "Four",
        ],
        correctIndex: 0,
        explanation:
          "Go has only `for`, used for counting loops, while-style loops, and infinite loops.",
      },
      {
        id: "q2",
        prompt: "Does a Go `switch` case fall through to the next case by default?",
        choices: [
          "Yes, like C or JavaScript",
          "No, each case breaks automatically unless you use `fallthrough`",
          "Only for numeric cases",
          "Only if no `default` case exists",
        ],
        correctIndex: 1,
        explanation:
          "Go's switch cases do not fall through by default -- you must opt in with `fallthrough`.",
      },
      {
        id: "q3",
        prompt: "Which is valid Go syntax for an `if` condition?",
        choices: ["if (x > 0) {", "if x > 0 {", "if x > 0 then", "if x > 0:"],
        correctIndex: 1,
        explanation: "Go if-conditions don't use parentheses, and the brace goes on the same line.",
      },
    ],
    takeaway:
      "Go has one loop keyword (`for`, in three forms) and a `switch` that never falls through unless you explicitly ask for it with `fallthrough`.",
    summary:
      "`for` covers every loop shape Go needs; `if`/`else` needs no parentheses; `switch` cases break automatically after each case.",
    guidedOutputLab: {
      id: "go-lab-control-flow",
      title: "Fill in the blank: FizzBuzz-style loop",
      language: "Go",
      mode: "fill-in-blank",
      prompt: "Fill in the missing loop keyword, then predict the output.",
      steps: [
        {
          code: `package main

import "fmt"

func main() {
	____ i := 1; i <= 5; i++ {
		if i%2 == 0 {
			fmt.Println(i, "even")
		} else {
			fmt.Println(i, "odd")
		}
	}
}`,
          expectedOutput: "1 odd\n2 even\n3 odd\n4 even\n5 odd",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "for",
      hints: [
        "Go's only loop keyword covers this counting-loop form too.",
        "`%` is the modulo operator, checking whether `i` divides evenly by 2.",
      ],
    },
    nextLessonSlug: "go-functions-and-multiple-returns",
  },
  {
    id: "go-functions-and-multiple-returns",
    slug: "go-functions-and-multiple-returns",
    title: "Functions and Multiple Return Values",
    description:
      "Declaring functions, and Go's distinctive support for returning more than one value.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Declare a function with typed parameters and a return type",
      "Return and receive multiple values from a single function call",
      "Explain why Go's error-handling idiom depends on multiple return values",
    ],
    skills: ["go-functions"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "A Tour of Go: Functions", url: "https://go.dev/tour/basics/4" }],
    keywords: ["go functions", "multiple return values", "named returns"],
    explanation: `A Go function declares its parameter types and return type explicitly: \`func add(a int, b int) int { return a + b }\`. Consecutive parameters sharing a type can drop the repeated type name: \`func add(a, b int) int\`.

Go functions can return **more than one value** -- a feature many other mainstream languages don't have built in. This is written as \`func divide(a, b int) (int, int) { return a / b, a % b }\`, and callers receive both values: \`quotient, remainder := divide(17, 5)\`.

This isn't just a convenience -- it's the foundation of Go's core error-handling idiom, which you'll see properly in a later lesson: a function that might fail returns its normal result *and* an \`error\` value, e.g. \`func parse(s string) (int, error)\`, and the caller checks the error before trusting the result.

If you don't need one of the returned values, you can discard it with the blank identifier \`_\`, e.g. \`quotient, _ := divide(17, 5)\` if you only care about the quotient.`,
    commonMistakes: [
      "Forgetting to receive all values a multi-return function produces -- Go requires you to either use or explicitly discard (`_`) every returned value at the call site.",
      "Mismatching the number of variables on the left of `:=` with the number of values a function actually returns.",
      "Assuming multiple return values are a special struct or tuple type -- they aren't; they're just multiple plain values in the function signature.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the blank identifier `_` used for with a multi-return function?",
        choices: [
          "It renames the function",
          "It discards a return value you don't need",
          "It marks a function as private",
          "It declares a constant",
        ],
        correctIndex: 1,
        explanation: "`_` discards a value at the call site when you don't need to use it.",
      },
      {
        id: "q2",
        prompt: "What Go idiom does multiple return values make possible?",
        choices: [
          "Function overloading",
          "Returning a result plus an error value together",
          "Automatic memoization",
          "Operator overloading",
        ],
        correctIndex: 1,
        explanation:
          "Go's `(result, error)` return pattern is built directly on multiple return values.",
      },
      {
        id: "q3",
        prompt:
          "Given `func add(a, b int) int`, what does the shared `int` before the parameter list mean?",
        choices: [
          "a and b are both declared as int, sharing the repeated type name",
          "The function itself has type int",
          "Only b is an int",
          "This is invalid Go syntax",
        ],
        correctIndex: 0,
        explanation: "Consecutive parameters of the same type can share one type name at the end.",
      },
    ],
    takeaway:
      "Go functions can return multiple values directly, which is the foundation of its `(result, error)` error-handling idiom.",
    summary:
      "Functions declare typed parameters and return types; Go's multi-value returns let a function hand back more than one result, discardable with `_`.",
    guidedOutputLab: {
      id: "go-lab-multi-return",
      title: "Predict: A function with two return values",
      language: "Go",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `package main

import "fmt"

func divide(a, b int) (int, int) {
	return a / b, a % b
}

func main() {
	q, r := divide(17, 5)
	fmt.Printf("17 / 5 = %d remainder %d\\n", q, r)
}`,
          expectedOutput: "17 / 5 = 3 remainder 2",
        },
      ],
      hints: [
        "17 / 5 with integer division truncates toward zero: 3.",
        "17 % 5 is the remainder after that division: 2.",
      ],
    },
    nextLessonSlug: "go-slices-and-arrays",
  },
  {
    id: "go-slices-and-arrays",
    slug: "go-slices-and-arrays",
    title: "Arrays and Slices",
    description: "Go's fixed-size arrays, and the far more commonly used, resizable slice.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Distinguish a fixed-size array from a slice",
      "Grow a slice with `append` and understand it returns a (possibly new) slice",
      "Use `len()` to get a slice's current length",
    ],
    skills: ["go-collections"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "A Tour of Go: Slices", url: "https://go.dev/tour/moretypes/7" }],
    keywords: ["go slices", "go arrays", "append", "len"],
    explanation: `A Go **array** has a fixed size baked into its type: \`[3]int\` is a completely different type from \`[5]int\`. Arrays exist, but in everyday Go code you'll almost always use a **slice** instead -- a resizable, flexible view over an underlying array, declared as \`[]int\` (no size in the brackets).

You grow a slice with the built-in \`append\` function: \`nums = append(nums, 4)\`. Note that \`append\` **returns** a slice, which you must assign back -- \`append\` may need to allocate a new, larger underlying array if the current one is full, so the original slice variable might not reflect the change unless you capture the return value.

\`len(slice)\` gives you the current number of elements. An empty (\`nil\`) slice or an empty slice literal both have \`len\` 0, and appending to a \`nil\` slice works fine -- you don't need to explicitly initialize it first.`,
    commonMistakes: [
      "Calling `append(nums, x)` without assigning the result back to `nums`, then being surprised the original variable is unchanged.",
      "Confusing a fixed-size array (`[3]int`) with a slice (`[]int`) -- they're different types with different capabilities.",
      "Assuming you must initialize a slice with `make` before appending -- appending to a `nil` slice works fine.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What must you do with the result of `append(slice, value)`?",
        choices: [
          "Nothing, it modifies the slice in place",
          "Assign it back to a variable, since append may return a different underlying slice",
          "Call len() on it first",
          "Convert it to an array",
        ],
        correctIndex: 1,
        explanation:
          "append returns a slice that must be assigned back, since it may allocate a new underlying array.",
      },
      {
        id: "q2",
        prompt: "What is the key difference between a Go array and a slice?",
        choices: [
          "Arrays can hold strings, slices cannot",
          "An array's size is fixed and part of its type; a slice is resizable",
          "Slices are always faster than arrays",
          "There is no real difference",
        ],
        correctIndex: 1,
        explanation:
          "An array's size is fixed and encoded in its type ([3]int vs [5]int); a slice is a resizable view.",
      },
      {
        id: "q3",
        prompt: "Can you append to a `nil` slice without initializing it first?",
        choices: [
          "No, it panics",
          "Yes, appending to nil works fine",
          "Only with make()",
          "Only for slices of int",
        ],
        correctIndex: 1,
        explanation: "Appending to a nil slice is valid Go and works as expected.",
      },
    ],
    takeaway:
      "Prefer slices over arrays in everyday Go code, and always assign `append`'s return value back to your variable.",
    summary:
      "Arrays have a fixed, type-level size; slices are resizable views grown with `append` (whose result must be reassigned) and measured with `len`.",
    guidedOutputLab: {
      id: "go-lab-slices",
      title: "Predict: Growing a slice",
      language: "Go",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `package main

import "fmt"

func main() {
	var names []string
	names = append(names, "Ada")
	names = append(names, "Grace", "Linus")

	fmt.Println("names:", names)
	fmt.Println("count:", len(names))
}`,
          expectedOutput: "names: [Ada Grace Linus]\ncount: 3",
        },
      ],
      hints: [
        "append can take multiple values at once, appending them all in order.",
        "Println formats a slice as its elements in square brackets, space-separated.",
      ],
    },
    nextLessonSlug: "go-maps",
  },
  {
    id: "go-maps",
    slug: "go-maps",
    title: "Maps",
    description: "Go's built-in hash map type, and the comma-ok idiom for checking key existence.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Declare and populate a map with `map[KeyType]ValueType`",
      "Use the 'comma-ok' idiom to distinguish a missing key from a zero-value entry",
      "Delete a key from a map with the built-in `delete` function",
    ],
    skills: ["go-collections"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "A Tour of Go: Maps", url: "https://go.dev/tour/moretypes/19" }],
    keywords: ["go maps", "comma ok idiom", "delete"],
    explanation: `A Go **map** is a built-in hash map, declared as \`map[KeyType]ValueType\`, e.g. \`map[string]int\` maps strings to ints. You create one with \`make(map[string]int)\` or a map literal: \`ages := map[string]int{"Ada": 30, "Grace": 45}\`.

Reading a key that doesn't exist doesn't panic -- it returns the **zero value** for the value type (0 for int, "" for string, and so on). This creates ambiguity: is a value of 0 a real stored value, or a missing key? The **comma-ok idiom** resolves it: \`value, ok := ages["Unknown"]\` -- \`ok\` is \`true\` only if the key genuinely exists, letting you tell "missing" apart from "present with a zero value."

You remove a key with the built-in \`delete(map, key)\` function -- deleting a key that doesn't exist is a safe no-op, not an error.

Iteration order over a map with \`range\` is **not guaranteed** to be consistent between runs -- if you need a predictable order, sort the keys yourself first.`,
    commonMistakes: [
      "Reading a missing map key and assuming a returned zero value means the key exists with that value, instead of checking with the comma-ok idiom.",
      "Relying on a consistent iteration order when ranging over a map -- Go deliberately does not guarantee one.",
      "Assuming `delete` on a nonexistent key causes an error -- it's actually a safe no-op.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What does reading a missing key from a Go map return, if you don't use the comma-ok form?",
        choices: [
          "A panic",
          "nil, always",
          "The zero value for the map's value type",
          "An error value",
        ],
        correctIndex: 2,
        explanation:
          "Reading a missing key returns the zero value for the value type, e.g. 0 for int.",
      },
      {
        id: "q2",
        prompt: "What does the second value in `value, ok := myMap[key]` tell you?",
        choices: [
          "The map's total length",
          "Whether the key genuinely exists in the map",
          "Whether the value is zero",
          "Whether the map is nil",
        ],
        correctIndex: 1,
        explanation:
          "`ok` is true only if the key genuinely exists, distinguishing 'missing' from 'present with a zero value.'",
      },
      {
        id: "q3",
        prompt: "Is Go map iteration order guaranteed to be consistent?",
        choices: [
          "Yes, always insertion order",
          "Yes, always alphabetical",
          "No, it's not guaranteed",
          "Only for maps with int keys",
        ],
        correctIndex: 2,
        explanation: "Go deliberately does not guarantee a consistent map iteration order.",
      },
    ],
    takeaway:
      "Use the comma-ok idiom (`value, ok := myMap[key]`) whenever you need to distinguish a missing key from a stored zero value.",
    summary:
      "Maps are declared as `map[KeyType]ValueType`; missing keys return a zero value, so use comma-ok to check real existence; `delete` is always safe.",
    guidedOutputLab: {
      id: "go-lab-maps",
      title: "Fill in the blank: comma-ok idiom",
      language: "Go",
      mode: "fill-in-blank",
      prompt:
        "Fill in the missing second variable name for the comma-ok pattern, then predict the output.",
      steps: [
        {
          code: `package main

import "fmt"

func main() {
	scores := map[string]int{"Ada": 90, "Grace": 85}

	value, ____ := scores["Ada"]
	fmt.Println(value, ____)

	value2, ____2 := scores["Linus"]
	fmt.Println(value2, ____2)
}`,
          expectedOutput: "90 true\n0 false",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "ok",
      hints: [
        "The conventional name for the second value in this idiom is `ok`, a boolean.",
        "'Linus' isn't in the map, so value2 is int's zero value (0) and ok2 is false.",
      ],
    },
    nextLessonSlug: "go-structs-and-methods",
  },
  {
    id: "go-structs-and-methods",
    slug: "go-structs-and-methods",
    title: "Structs and Methods",
    description:
      "Defining custom types with struct, and attaching behavior with methods and receivers.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Define a custom type with `struct` and create instances of it",
      "Attach a method to a struct type using a receiver",
      "Explain when a pointer receiver is needed instead of a value receiver",
    ],
    skills: ["go-structs"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "A Tour of Go: Structs", url: "https://go.dev/tour/moretypes/2" }],
    keywords: ["go structs", "go methods", "pointer receiver", "value receiver"],
    explanation: `Go doesn't have classes -- instead, you define a custom data shape with \`struct\`: \`type Point struct { X, Y int }\`, then create instances with \`Point{X: 3, Y: 4}\`.

You attach behavior to a struct with a **method**: a function with a special **receiver** parameter before its name, e.g. \`func (p Point) String() string { return fmt.Sprintf("(%d, %d)", p.X, p.Y) }\`. Here \`(p Point)\` is the receiver -- inside the method, \`p\` refers to the specific instance the method was called on.

A receiver can be a **value receiver** (\`(p Point)\`, gets a copy) or a **pointer receiver** (\`(p *Point)\`, gets a reference to the original). Use a pointer receiver whenever the method needs to **modify** the struct -- a value receiver's changes only affect its local copy and are lost once the method returns.

Go automatically takes the address of a variable when calling a pointer-receiver method on it, so you can usually call \`myPoint.Scale(2)\` directly even if \`Scale\` has a pointer receiver, without writing \`(&myPoint).Scale(2)\` yourself.`,
    commonMistakes: [
      "Using a value receiver on a method meant to modify the struct, then being confused when the change doesn't persist outside the method.",
      "Assuming Go structs work exactly like classes with inheritance -- Go has no inheritance; behavior is attached via methods and composition instead.",
      "Forgetting that a value receiver method gets a full copy of the struct, which can matter for large structs and performance, not just mutability.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "When must you use a pointer receiver instead of a value receiver?",
        choices: [
          "Never, they're interchangeable",
          "When the method needs to modify the struct's fields persistently",
          "Only for structs with string fields",
          "Only in package main",
        ],
        correctIndex: 1,
        explanation:
          "A pointer receiver is required when a method needs its changes to persist outside the method.",
      },
      {
        id: "q2",
        prompt: "What does a value receiver method operate on?",
        choices: [
          "The original struct directly",
          "A copy of the struct",
          "A pointer to the struct",
          "Nothing -- value receivers are invalid",
        ],
        correctIndex: 1,
        explanation: "A value receiver method receives and operates on a copy of the struct.",
      },
      {
        id: "q3",
        prompt: "Does Go support class-style inheritance for structs?",
        choices: [
          "Yes, exactly like Java",
          "No -- Go has no inheritance",
          "Only for structs with pointer receivers",
          "Yes, via the `extends` keyword",
        ],
        correctIndex: 1,
        explanation: "Go has no inheritance; it favors composition and interfaces instead.",
      },
    ],
    takeaway:
      "Use a pointer receiver whenever a method needs to modify the struct persistently -- a value receiver only ever changes its own local copy.",
    summary:
      "Structs define custom data shapes; methods attach behavior via a receiver, which must be a pointer receiver for changes to persist outside the method.",
    guidedOutputLab: {
      id: "go-lab-structs",
      title: "Predict: A struct with value vs pointer receivers",
      language: "Go",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `package main

import "fmt"

type Counter struct {
	value int
}

func (c Counter) IncrementCopy() {
	c.value++
}

func (c *Counter) IncrementReal() {
	c.value++
}

func main() {
	c := Counter{value: 0}
	c.IncrementCopy()
	fmt.Println("After IncrementCopy:", c.value)

	c.IncrementReal()
	fmt.Println("After IncrementReal:", c.value)
}`,
          expectedOutput: "After IncrementCopy: 0\nAfter IncrementReal: 1",
        },
      ],
      hints: [
        "IncrementCopy uses a value receiver, so it only modifies a local copy that's discarded when the method returns.",
        "IncrementReal uses a pointer receiver, so its change persists on the original struct.",
      ],
    },
    nextLessonSlug: "go-interfaces",
  },
  {
    id: "go-interfaces",
    slug: "go-interfaces",
    title: "Interfaces",
    description:
      "How Go's implicit, structural interfaces differ from interfaces in most other languages.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 7,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Define an interface as a set of method signatures",
      "Explain that Go interfaces are satisfied implicitly, with no `implements` keyword",
      "Recognize the empty interface `interface{}` (or `any`) as accepting any type",
    ],
    skills: ["go-interfaces"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "A Tour of Go: Interfaces", url: "https://go.dev/tour/methods/9" }],
    keywords: ["go interfaces", "structural typing", "implicit implementation"],
    explanation: `A Go **interface** defines a set of method signatures a type must have: \`type Shaper interface { Area() float64 }\`. Any type with an \`Area() float64\` method automatically satisfies \`Shaper\` -- there's no \`implements\` keyword, and the type doesn't need to reference the interface anywhere. This is called **structural typing** (or "duck typing" at compile time): if it has the right methods, it satisfies the interface.

This is a real, deliberate design difference from Java or C#, where a class must explicitly declare \`implements InterfaceName\`. In Go, you can define a new interface *after* a type already exists, and old types automatically satisfy it if their methods happen to match -- useful for writing flexible code against libraries you don't control.

The **empty interface**, written \`interface{}\` (or its modern alias \`any\`), has zero required methods, so *every* type satisfies it. It's Go's escape hatch for "accept a value of any type," though idiomatic Go code use it sparingly, preferring specific interfaces where practical since \`any\` gives up compile-time type safety.`,
    commonMistakes: [
      "Looking for an `implements` keyword in Go -- it doesn't exist; interface satisfaction is entirely implicit and structural.",
      "Overusing `any`/`interface{}` where a specific interface would give better compile-time safety.",
      "Assuming a type must be declared with the interface in mind -- Go interfaces can be satisfied by types written with no knowledge of that interface.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How does a Go type declare that it implements an interface?",
        choices: [
          "With an `implements` keyword",
          "It doesn't declare anything -- having the right methods is enough",
          "By embedding the interface name in its struct definition",
          "By importing the interface's package",
        ],
        correctIndex: 1,
        explanation:
          "Go interfaces are satisfied implicitly/structurally -- no explicit declaration is needed.",
      },
      {
        id: "q2",
        prompt: "What does the empty interface `interface{}` (or `any`) accept?",
        choices: [
          "Only structs",
          "Only pointer types",
          "A value of any type",
          "Nothing -- it's invalid syntax",
        ],
        correctIndex: 2,
        explanation: "The empty interface has no required methods, so every type satisfies it.",
      },
      {
        id: "q3",
        prompt: "Can a type satisfy a Go interface defined after the type itself already exists?",
        choices: [
          "No, the type must be written with the interface in mind",
          "Yes, since satisfaction is purely structural, based on matching methods",
          "Only for built-in types",
          "Only if the type is in the same package as the interface",
        ],
        correctIndex: 1,
        explanation:
          "Because satisfaction is structural, a pre-existing type can satisfy a brand-new interface automatically.",
      },
    ],
    takeaway:
      "Go interfaces are satisfied implicitly by having the right methods -- there is no `implements` keyword, and types don't need to know about an interface to satisfy it.",
    summary:
      "Interfaces are sets of method signatures satisfied structurally/implicitly; the empty interface (`any`) accepts every type but should be used sparingly.",
    guidedOutputLab: {
      id: "go-lab-interfaces",
      title: "Predict: Implicit interface satisfaction",
      language: "Go",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `package main

import "fmt"

type Shaper interface {
	Area() float64
}

type Rectangle struct {
	Width, Height float64
}

func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

func describe(s Shaper) {
	fmt.Printf("Area: %.1f\\n", s.Area())
}

func main() {
	rect := Rectangle{Width: 3, Height: 4}
	describe(rect)
}`,
          expectedOutput: "Area: 12.0",
        },
      ],
      hints: [
        "Rectangle never mentions Shaper anywhere -- it satisfies the interface purely by having a matching Area() method.",
        "3 * 4 = 12, formatted with one decimal place.",
      ],
    },
    nextLessonSlug: "go-error-handling",
  },
  {
    id: "go-error-handling",
    slug: "go-error-handling",
    title: "Error Handling",
    description:
      "Go's explicit `if err != nil` idiom, and why Go has no exceptions for ordinary errors.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Explain why Go functions return an `error` value instead of throwing exceptions",
      "Write the standard `if err != nil` error-check idiom",
      "Create a simple error with `errors.New` or `fmt.Errorf`",
    ],
    skills: ["go-error-handling"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Go Blog: Error handling and Go", url: "https://go.dev/blog/error-handling-and-go" },
    ],
    keywords: ["go error handling", "err != nil", "errors.New"],
    explanation: `Go deliberately has no exceptions for ordinary error conditions (it does have \`panic\`/\`recover\`, reserved for truly exceptional, unrecoverable situations, not everyday errors). Instead, a function that can fail returns an \`error\` as its last return value: \`func readConfig() (Config, error)\`.

The standard idiom is immediate, explicit checking: \`result, err := doSomething(); if err != nil { /* handle it */ }\`. This makes every possible failure point visible directly in the code, rather than hidden in an invisible exception path that could be thrown from almost anywhere -- a deliberate tradeoff favoring explicitness over brevity.

\`error\` is itself just an interface with one method, \`Error() string\`. You create a simple one with \`errors.New("something went wrong")\`, or a formatted one with \`fmt.Errorf("failed to load %s: %w", filename, underlyingErr)\` -- the \`%w\` verb specifically "wraps" an existing error so callers can later unwrap and inspect the original cause.

A function returning \`(result, nil)\` means success; the convention is that if \`err\` is non-nil, the \`result\` value should not be trusted or used.`,
    commonMistakes: [
      "Ignoring a returned error entirely (assigning it to `_` or not checking `err != nil`) and using the result anyway.",
      "Reaching for `panic` for ordinary, expected error conditions instead of returning a normal `error` value.",
      "Checking `if err == nil` and using it as if the *error* case, forgetting `nil` means success, not failure.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does Go use instead of exceptions for ordinary, expected error conditions?",
        choices: [
          "try/catch blocks",
          "A returned `error` value, checked explicitly by the caller",
          "Global error flags",
          "panic/recover for every error",
        ],
        correctIndex: 1,
        explanation:
          "Go's convention is an explicit error return value, checked with `if err != nil`.",
      },
      {
        id: "q2",
        prompt: "What does a `nil` error returned from a function mean?",
        choices: [
          "The function failed",
          "The function succeeded",
          "The function is still running",
          "Nothing -- nil is invalid for error",
        ],
        correctIndex: 1,
        explanation:
          "A nil error conventionally means the function succeeded and the result can be trusted.",
      },
      {
        id: "q3",
        prompt: "What does the `%w` verb in `fmt.Errorf` do?",
        choices: [
          "Formats a number in hexadecimal",
          "Wraps an existing error so it can later be unwrapped and inspected",
          "Suppresses the error entirely",
          "Converts the error to a string permanently, losing the original",
        ],
        correctIndex: 1,
        explanation:
          "%w wraps an underlying error, preserving it for later inspection via errors.Unwrap/errors.Is.",
      },
    ],
    takeaway:
      "Check every returned `error` immediately with `if err != nil` -- Go has no exceptions for ordinary error conditions, so an unchecked error is easy to silently ignore.",
    summary:
      "Go functions return errors as normal values, checked explicitly; `errors.New`/`fmt.Errorf` create them, and `%w` wraps an underlying error for later inspection.",
    guidedOutputLab: {
      id: "go-lab-errors",
      title: "Fill in the blank: the if err != nil idiom",
      language: "Go",
      mode: "fill-in-blank",
      prompt: "Fill in the missing error-check condition, then predict the output.",
      steps: [
        {
          code: `package main

import (
	"errors"
	"fmt"
)

func safeDivide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

func main() {
	result, err := safeDivide(10, 0)
	if ____ {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Result:", result)
	}
}`,
          expectedOutput: "Error: division by zero",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "err != nil",
      hints: [
        "The standard Go error-check idiom compares err against nil.",
        "safeDivide(10, 0) hits the b == 0 branch, returning a non-nil error.",
      ],
    },
    nextLessonSlug: "go-goroutines-and-channels",
  },
  {
    id: "go-goroutines-and-channels",
    slug: "go-goroutines-and-channels",
    title: "Goroutines and Channels",
    description:
      "Go's lightweight concurrency primitives, and how channels coordinate them safely.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 25,
    objectives: [
      "Start a concurrent goroutine with the `go` keyword",
      "Use a channel to safely communicate a value between goroutines",
      "Explain why Go's motto is 'share memory by communicating' rather than locking shared memory directly",
    ],
    skills: ["go-concurrency"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "A Tour of Go: Concurrency", url: "https://go.dev/tour/concurrency/1" }],
    keywords: ["goroutines", "channels", "go concurrency"],
    explanation: `A **goroutine** is a lightweight, independently-scheduled function execution -- you start one just by prefixing a function call with \`go\`: \`go doWork()\`. Goroutines are far cheaper than OS threads (a Go program can comfortably run tens of thousands of them), managed by Go's own runtime scheduler.

Goroutines alone are dangerous without coordination -- reading and writing the same variable from multiple goroutines at once is a data race. Go's answer is the **channel**: a typed conduit for sending values between goroutines safely, created with \`make(chan int)\`. One goroutine sends with \`ch <- value\`, another receives with \`value := <-ch\` -- both operations block until the other side is ready, which naturally synchronizes the two goroutines.

This reflects Go's concurrency motto: **"Don't communicate by sharing memory; share memory by communicating."** Instead of multiple goroutines directly touching the same variable behind a lock, they pass values to each other through channels, so only one goroutine ever "owns" a piece of data at a time.

This walkthrough starts from a plain sequential version, then adds a goroutine and a channel step by step so you can see exactly what each addition changes.`,
    commonMistakes: [
      "Starting a goroutine and letting `main` return before it finishes -- when `main` returns, the whole program exits immediately, goroutines and all.",
      "Reading/writing a shared variable from multiple goroutines directly without a channel or lock, causing a data race.",
      "Forgetting that both a channel send and receive block until the other side is ready (for an unbuffered channel), which can deadlock a program with no one else to receive/send.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What keyword starts a new goroutine?",
        choices: ["async", "go", "spawn", "thread"],
        correctIndex: 1,
        explanation: "Prefixing a function call with `go` starts it as a new goroutine.",
      },
      {
        id: "q2",
        prompt: "What is Go's concurrency motto?",
        choices: [
          "Lock everything, always",
          "Don't communicate by sharing memory; share memory by communicating",
          "Avoid concurrency whenever possible",
          "Use global variables for shared state",
        ],
        correctIndex: 1,
        explanation:
          "Go favors passing values through channels over goroutines directly sharing memory.",
      },
      {
        id: "q3",
        prompt: "What happens to running goroutines when `main` returns?",
        choices: [
          "They keep running until they finish naturally",
          "The whole program exits immediately, goroutines and all",
          "They're automatically converted to background processes",
          "Go throws a compile error if any goroutine is still running",
        ],
        correctIndex: 1,
        explanation:
          "The program exits the instant main returns, regardless of any goroutines still in progress.",
      },
    ],
    takeaway:
      "Use a channel to hand a value from one goroutine to another safely -- and remember that `main` returning ends the whole program, unfinished goroutines included.",
    summary:
      "Goroutines are lightweight concurrent function calls started with `go`; channels safely pass values between them, embodying Go's 'share memory by communicating' philosophy.",
    guidedOutputLab: {
      id: "go-lab-goroutines",
      title: "Guided edit: From sequential to a goroutine with a channel",
      language: "Go",
      mode: "guided-editing",
      prompt: "Follow each step to see how adding a goroutine and a channel changes this program.",
      steps: [
        {
          description: "Start with a plain sequential function call -- no concurrency yet.",
          code: `package main

import "fmt"

func square(n int) int {
	return n * n
}

func main() {
	result := square(6)
	fmt.Println("Result:", result)
}`,
          expectedOutput: "Result: 36",
        },
        {
          description:
            "Move the work into a goroutine and a channel, so main waits to receive the result instead of calling the function directly.",
          code: `package main

import "fmt"

func square(n int, ch chan int) {
	ch <- n * n
}

func main() {
	ch := make(chan int)
	go square(6, ch)
	result := <-ch
	fmt.Println("Result:", result)
}`,
          expectedOutput: "Result: 36",
        },
      ],
      hints: [
        "The output is identical in both versions -- the goroutine version just computes the same result concurrently instead of directly.",
        "`<-ch` blocks main until the goroutine sends a value, which is what keeps the program from exiting before the result is ready.",
      ],
    },
    nextLessonSlug: "go-packages-and-visibility",
  },
  {
    id: "go-packages-and-visibility",
    slug: "go-packages-and-visibility",
    title: "Packages and Exported Identifiers",
    description:
      "How Go organizes code into packages, and its capitalization-based visibility rule.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Explain how Go groups files into packages",
      "State Go's rule for exported (public) vs unexported (private) identifiers",
      "Read a Go import path and identify the package it refers to",
    ],
    skills: ["go-packages"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "How to Write Go Code", url: "https://go.dev/doc/code" }],
    keywords: ["go packages", "exported identifiers", "go modules"],
    explanation: `Every Go source file belongs to exactly one **package**, declared at the top of the file (\`package main\`, \`package util\`, and so on). Every \`.go\` file in the same directory must declare the same package name -- a package is really a directory's worth of files sharing one namespace.

Go's visibility rule is refreshingly simple and has no dedicated keyword: an identifier (a function, type, variable, or struct field) whose name starts with an **uppercase letter is exported** (visible outside its package); one starting **lowercase is unexported** (package-private). \`func Add(...)\` is callable from other packages; \`func add(...)\` is not.

A Go **module** (declared in a \`go.mod\` file) is a collection of related packages versioned and distributed together -- when you \`import "github.com/someuser/somemodule/somepackage"\`, you're pulling in one package from someone else's module.

This capitalization convention means you can often tell a lot about a package's public API just by scanning for capitalized names, without needing separate \`public\`/\`private\` keywords cluttering every declaration.`,
    commonMistakes: [
      "Trying to call a lowercase (unexported) function from a different package and being confused by the compile error.",
      "Putting files with different `package` declarations in the same directory -- every file in one directory must share the same package name.",
      "Confusing a Go module (versioned collection of packages, from go.mod) with a single package (one directory's worth of files).",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "In Go, what makes an identifier exported (visible outside its package)?",
        choices: [
          "A `public` keyword before it",
          "Starting its name with an uppercase letter",
          "Declaring it at the top of the file",
          "Adding an `export` comment",
        ],
        correctIndex: 1,
        explanation: "Go uses capitalization, not a keyword, to determine export visibility.",
      },
      {
        id: "q2",
        prompt: "Can two files in the same directory declare different package names?",
        choices: [
          "Yes, freely",
          "No -- every file in one directory must share the same package name",
          "Only in package main",
          "Only for test files",
        ],
        correctIndex: 1,
        explanation: "All .go files in the same directory must declare the same package.",
      },
      {
        id: "q3",
        prompt: "What is a Go module?",
        choices: [
          "A single function",
          "A single .go file",
          "A versioned collection of related packages, declared in go.mod",
          "A synonym for goroutine",
        ],
        correctIndex: 2,
        explanation:
          "A module (go.mod) is a versioned collection of packages distributed together.",
      },
    ],
    takeaway:
      "Capitalize a name to export it outside its package; lowercase keeps it package-private -- no separate keyword needed.",
    summary:
      "Files sharing a directory form one package; capitalization alone determines export visibility; a module (go.mod) versions a collection of packages.",
    guidedOutputLab: {
      id: "go-lab-visibility",
      title: "Predict: Exported vs unexported identifiers",
      language: "Go",
      mode: "predict",
      prompt:
        "This shows two files from the same package (comments mark the file boundary). Predict what main.go prints, and note the one line that would NOT compile if uncommented.",
      steps: [
        {
          code: `// file: util/util.go
package util

func Double(n int) int {
	return double(n) * 2
}

func double(n int) int {
	return n * 2
}

// file: main.go
package main

import (
	"fmt"
	"example.com/app/util"
)

func main() {
	fmt.Println(util.Double(3))
	// fmt.Println(util.double(3)) // would NOT compile: double is unexported
}`,
          expectedOutput: "12",
        },
      ],
      hints: [
        "Double (capital D) is exported and callable from main; double (lowercase) is not.",
        "util.Double(3) computes double(3)*2 = 6*2 = 12.",
      ],
    },
    nextLessonSlug: "go-testing-with-go-test",
  },
  {
    id: "go-testing-with-go-test",
    slug: "go-testing-with-go-test",
    title: "Testing with go test",
    description: "Writing a Go test file and reading `go test` output.",
    trackSlug: "go",
    courseSlug: "go-programming",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Write a test function following Go's `TestXxx(t *testing.T)` naming convention",
      "Use `t.Errorf` to report a failing assertion without stopping the whole test run",
      "Read and interpret `go test` command-line output",
    ],
    skills: ["go-testing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Go Testing package docs", url: "https://pkg.go.dev/testing" }],
    keywords: ["go test", "go testing package", "TestXxx"],
    explanation: `Go has testing support built directly into its standard toolchain -- no separate framework is required to get started. A test file is named \`something_test.go\` and lives alongside the code it tests. Each test is a function named \`TestXxx\` (must start with \`Test\`, followed by a capitalized word) taking one parameter, \`t *testing.T\`.

Inside a test, you check conditions yourself and report failures with \`t.Errorf(...)\` -- unlike some other languages' \`assert\` that stops execution immediately, \`t.Errorf\` records the failure and lets the rest of the test function keep running, so you can see multiple failures from one run instead of only the first.

You run tests with \`go test\` from the command line. A fully passing run prints something like \`PASS\` followed by \`ok  	package/path	0.002s\`; a failing test prints \`--- FAIL: TestName\` with your \`Errorf\` message, followed by an overall \`FAIL\` summary line.

Table-driven tests -- a slice of input/expected-output pairs looped over in one test function -- are the idiomatic Go way to test many cases without writing a separate function for each one, though that pattern is worth its own dedicated study once you're comfortable with a single basic test.`,
    commonMistakes: [
      "Naming a test function without the required `Test` prefix (or without capitalizing the word after it) -- `go test` silently won't run it.",
      "Using `t.Fatalf` instead of `t.Errorf` when you actually want the rest of the test to keep checking other conditions after a failure.",
      "Forgetting the test file must be named `..._test.go` -- `go test` only looks at files matching that suffix.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What must a Go test function's name start with?",
        choices: [
          "A lowercase `test` prefix",
          "A capitalized `Test` prefix",
          "A `check` prefix",
          "No required prefix",
        ],
        correctIndex: 1,
        explanation: "Go test functions must be named starting with capital-T `Test`.",
      },
      {
        id: "q2",
        prompt: "What does `t.Errorf` do differently from stopping execution immediately?",
        choices: [
          "It records a failure but lets the rest of the test function keep running",
          "It immediately halts the entire test suite",
          "It only prints a warning, never counted as a failure",
          "It retries the failing assertion automatically",
        ],
        correctIndex: 0,
        explanation:
          "t.Errorf records the failure and continues, unlike t.Fatalf which stops the current test function.",
      },
      {
        id: "q3",
        prompt: "What must a Go test file's filename end with for `go test` to find it?",
        choices: ["_spec.go", "_test.go", ".test.go", "Test.go"],
        correctIndex: 1,
        explanation: "Go test files must be named with a `_test.go` suffix.",
      },
    ],
    takeaway:
      "Name test functions `TestXxx(t *testing.T)` in a `_test.go` file, and prefer `t.Errorf` over `t.Fatalf` so one run can surface every failure, not just the first.",
    summary:
      "Go's built-in testing package needs no separate framework: `_test.go` files, `TestXxx` functions, and `t.Errorf` for non-halting failure reporting, run via `go test`.",
    guidedOutputLab: {
      id: "go-lab-testing",
      title: "Predict: Reading go test output",
      language: "Go",
      mode: "predict",
      prompt:
        "Given this test file for a small `Add` function (with a deliberately wrong test case), predict what `go test` prints to the terminal.",
      steps: [
        {
          code: `// file: math.go
package mathutil

func Add(a, b int) int {
	return a + b
}

// file: math_test.go
package mathutil

import "testing"

func TestAdd(t *testing.T) {
	got := Add(2, 3)
	want := 6 // deliberately wrong -- 2 + 3 is actually 5
	if got != want {
		t.Errorf("Add(2, 3) = %d; want %d", got, want)
	}
}`,
          expectedOutput: "--- FAIL: TestAdd\n    math_test.go: Add(2, 3) = 5; want 6\nFAIL",
        },
      ],
      hints: [
        "Add(2, 3) genuinely returns 5, but the test's `want` was deliberately written as 6.",
        "A failing test prints '--- FAIL: TestName' with the Errorf message, then an overall 'FAIL' summary.",
      ],
    },
  },
];
