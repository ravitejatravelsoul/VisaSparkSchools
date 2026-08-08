import type { LessonInput } from "@/lib/content/types";

/**
 * Kotlin Fundamentals lessons. Kotlin has no safe, small in-browser
 * execution option (see docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md),
 * so every lesson uses a `guidedOutputLab` instead of `example`/
 * `guidedExercise`/`independentExercise` -- see lib/content/types.ts's
 * Phase 6/8 note. Every code sample and its expected output were verified by
 * hand against real Kotlin semantics.
 */
export const kotlinLessons: LessonInput[] = [
  {
    id: "kotlin-introduction-and-jvm",
    slug: "kotlin-introduction-and-jvm",
    title: "Introduction to Kotlin and the JVM",
    description: "What Kotlin is, its relationship to Java and the JVM, and where it's used.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain what Kotlin is and how it relates to Java and the JVM",
      "Identify the two major contexts Kotlin is used in today: Android and backend services",
      "Describe what makes a minimal Kotlin program (fun main())",
    ],
    skills: ["kotlin-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Kotlin documentation", url: "https://kotlinlang.org/docs/home.html" }],
    keywords: ["kotlin", "jvm", "kotlin android", "kotlin backend"],
    explanation: `Kotlin is a statically-typed language that runs primarily on the Java Virtual Machine (JVM), fully interoperable with existing Java code and libraries -- a Kotlin file can call Java classes directly, and vice versa. It was created by JetBrains and is now Google's preferred language for Android development, while also seeing growing use for backend services (with frameworks like Ktor and Spring).

Kotlin's main pitch over Java is conciseness and safety: less boilerplate for common patterns, and a type system that catches null-pointer errors at compile time rather than runtime (covered in detail in the next module). Because it compiles to the same JVM bytecode as Java, a Kotlin program has access to the entire mature Java ecosystem of libraries and tools.

A minimal Kotlin program is just a top-level function: \`fun main() { println("Hello, Kotlin!") }\` -- no enclosing class is required, unlike Java's mandatory \`public static void main\`. This is a small but telling example of Kotlin's general philosophy: keep the ceremony out of the way of the actual logic.

This platform can't safely compile or execute real Kotlin code in your browser, so instead of a live runner, each lesson gives you real Kotlin source code and asks you to work out what it does.`,
    commonMistakes: [
      "Assuming Kotlin code must be wrapped in a class like Java's `public static void main` -- a top-level `fun main()` is valid and idiomatic Kotlin.",
      "Thinking Kotlin and Java can't interoperate directly -- they compile to the same bytecode and can call each other freely.",
      "Assuming Kotlin is Android-only -- it's increasingly used for backend services too (Ktor, Spring).",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What virtual machine does Kotlin primarily run on?",
        choices: [
          "The .NET CLR",
          "The JVM (Java Virtual Machine)",
          "A custom Kotlin runtime",
          "V8",
        ],
        correctIndex: 1,
        explanation: "Kotlin compiles to JVM bytecode, the same target as Java.",
      },
      {
        id: "q2",
        prompt: "What must a minimal Kotlin program's entry point be wrapped in?",
        choices: [
          "A class implementing Runnable",
          "Nothing -- a top-level fun main() is valid",
          "A public static void main method inside a class",
          "An object declaration",
        ],
        correctIndex: 1,
        explanation: "Kotlin allows a top-level main() function with no enclosing class required.",
      },
      {
        id: "q3",
        prompt: "Which of these is a real, current context Kotlin is used in?",
        choices: [
          "Only Android development",
          "Only iOS development",
          "Android development and backend services",
          "Only embedded systems",
        ],
        correctIndex: 2,
        explanation:
          "Kotlin is used for Android (its primary original use case) and increasingly for backend services.",
      },
    ],
    takeaway:
      "Kotlin runs on the JVM, interoperates directly with Java, and needs no enclosing class for a program's entry point.",
    summary:
      "Kotlin is a concise, null-safety-focused JVM language used for Android and increasingly backend development, fully interoperable with Java.",
    guidedOutputLab: {
      id: "kotlin-lab-hello-world",
      title: "Predict: A minimal Kotlin program",
      language: "Kotlin",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `fun main() {
    println("Hello, Kotlin!")
    val sum = 2 + 2
    println("2 + 2 = $sum")
}`,
          expectedOutput: "Hello, Kotlin!\n2 + 2 = 4",
        },
      ],
      hints: [
        "println adds a newline automatically, like Go's fmt.Println.",
        "$sum inside a string is Kotlin's string-template interpolation syntax.",
      ],
    },
    nextLessonSlug: "kotlin-val-var-and-types",
  },
  {
    id: "kotlin-val-var-and-types",
    slug: "kotlin-val-var-and-types",
    title: "val vs var and Basic Types",
    description: "Kotlin's read-only val, mutable var, and basic types with type inference.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Distinguish val (read-only) from var (mutable) and choose val by default",
      "Identify Kotlin's basic types (Int, Double, String, Boolean) and how type inference works",
      "Use string templates ($variable and ${expression}) instead of concatenation",
    ],
    skills: ["kotlin-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Kotlin documentation: Basic types", url: "https://kotlinlang.org/docs/home.html" },
    ],
    keywords: ["kotlin val var", "kotlin types", "string templates"],
    explanation: `Kotlin has two ways to declare a variable: \`val\` (read-only, assigned exactly once, like a constant reference) and \`var\` (mutable, can be reassigned). Idiomatic Kotlin strongly prefers \`val\` by default, switching to \`var\` only when reassignment is genuinely needed -- this preference for immutability reduces a whole category of bugs where a value changes unexpectedly.

Kotlin infers types from the initializer, so \`val name = "Ada"\` is inferred as \`String\` without writing it explicitly -- though you can write \`val name: String = "Ada"\` when you want to be explicit or when there's no initializer to infer from. Basic types include \`Int\`, \`Double\`, \`String\`, and \`Boolean\`.

**String templates** let you embed a variable directly in a string with \`$variableName\`, or a full expression with \`\${expression}\`: \`"Total: \${price * quantity}"\` -- avoiding manual string concatenation with \`+\`.

Note that reassigning a \`val\` is a compile error, not a runtime warning -- Kotlin catches this mistake before your code ever runs.`,
    commonMistakes: [
      "Declaring everything with `var` out of habit, when `val` should be the default choice unless reassignment is genuinely needed.",
      "Trying to reassign a `val`, forgetting it's a compile error, not just a convention.",
      "Concatenating strings with `+` when a string template ($variable or ${expression}) would be clearer.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What happens if you try to reassign a val after its initial assignment?",
        choices: [
          "It's allowed silently",
          "A compile error occurs",
          "A runtime warning is printed",
          "The old value is kept and the new one ignored",
        ],
        correctIndex: 1,
        explanation: "Reassigning a val is a compile-time error in Kotlin.",
      },
      {
        id: "q2",
        prompt: "What does idiomatic Kotlin recommend as the default variable declaration?",
        choices: [
          "var, always",
          "val, switching to var only when reassignment is needed",
          "Neither -- always specify an explicit type",
          "It doesn't matter",
        ],
        correctIndex: 1,
        explanation: "val is preferred by default for its immutability guarantees.",
      },
      {
        id: "q3",
        prompt: 'What does `"Total: ${price * quantity}"` demonstrate?',
        choices: [
          "String concatenation with +",
          "A string template embedding an expression",
          "A regular expression",
          "A function call",
        ],
        correctIndex: 1,
        explanation:
          "${expression} inside a string is Kotlin's string-template syntax for embedding computed values.",
      },
    ],
    takeaway:
      "Prefer val over var by default, and use string templates ($x / ${expr}) instead of manual concatenation.",
    summary:
      "val is read-only, var is mutable; Kotlin infers types from initializers; string templates embed variables/expressions directly in strings.",
    guidedOutputLab: {
      id: "kotlin-lab-val-var",
      title: "Fill in the blank: choosing val vs var",
      language: "Kotlin",
      mode: "fill-in-blank",
      prompt:
        "Fill in the missing keyword for a variable that will be reassigned, then predict the output.",
      steps: [
        {
          code: `fun main() {
    val name = "Ada"
    ____ score = 10
    score = score + 5
    println("$name scored $score")
}`,
          expectedOutput: "Ada scored 15",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "var",
      hints: ["score is reassigned on the next line, so it can't be a val.", "10 + 5 = 15."],
    },
    nextLessonSlug: "kotlin-control-flow",
  },
  {
    id: "kotlin-control-flow",
    slug: "kotlin-control-flow",
    title: "Control Flow: if as an Expression, when, and for",
    description: "Kotlin's if-as-expression, the powerful when construct, and for loops.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Use if as an expression that produces a value, not just a statement",
      "Use when as Kotlin's more powerful replacement for a traditional switch",
      "Write a for loop over a range or collection",
    ],
    skills: ["kotlin-basics", "kotlin-control-flow"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Kotlin documentation: Control flow", url: "https://kotlinlang.org/docs/home.html" },
    ],
    keywords: ["kotlin if expression", "kotlin when", "kotlin for loop"],
    explanation: `In Kotlin, \`if\` can be used as an **expression** that produces a value: \`val max = if (a > b) a else b\` -- there's no separate ternary operator because \`if\`-as-expression already covers that need.

\`when\` is Kotlin's replacement for a traditional switch statement, but more powerful: it can match exact values, ranges, types, or arbitrary boolean conditions, and (like \`if\`) can be used as an expression: \`val description = when (score) { in 90..100 -> "A"; in 80..89 -> "B"; else -> "C or below" }\`. An \`else\` branch is required when \`when\` is used as an expression, to guarantee it always produces a value.

\`for\` loops commonly iterate over a **range** (\`for (i in 1..5)\`, inclusive of 5) or a collection (\`for (item in list)\`). Kotlin has no traditional C-style \`for (int i = 0; i < n; i++)\` loop -- ranges and collection iteration cover that need more safely and readably.`,
    commonMistakes: [
      "Looking for a separate ternary operator (`a ? b : c`) -- Kotlin uses if-as-expression instead.",
      "Forgetting the `else` branch when using `when` as an expression, which is required so it always produces a value.",
      "Using `0 until n` (exclusive) when `1..n` (inclusive) was intended, or vice versa, and getting an off-by-one range.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How does Kotlin implement what other languages call a ternary operator?",
        choices: [
          "A dedicated ?: ternary syntax",
          "if used as an expression",
          "A special ternary() function",
          "Kotlin has no equivalent",
        ],
        correctIndex: 1,
        explanation:
          "if is an expression in Kotlin and can be used exactly where a ternary would be used elsewhere.",
      },
      {
        id: "q2",
        prompt: "What is required when `when` is used as an expression (to produce a value)?",
        choices: [
          "A default case is optional",
          "An else branch, so it always produces a value",
          "At least three branches",
          "A break statement in each branch",
        ],
        correctIndex: 1,
        explanation: "when-as-expression requires an else branch to guarantee exhaustiveness.",
      },
      {
        id: "q3",
        prompt: "What does `1..5` represent as a range in a for loop?",
        choices: [
          "1, 2, 3, 4 (exclusive of 5)",
          "1, 2, 3, 4, 5 (inclusive of 5)",
          "Just 1 and 5",
          "An error -- ranges need until",
        ],
        correctIndex: 1,
        explanation: "1..5 is an inclusive range, including both 1 and 5.",
      },
    ],
    takeaway:
      "Use if and when as expressions that produce values, and remember 1..5 is inclusive while 0 until n is exclusive.",
    summary:
      "if and when can both be used as value-producing expressions; when is a more powerful switch; for iterates ranges/collections, with inclusive .. and exclusive until.",
    guidedOutputLab: {
      id: "kotlin-lab-control-flow",
      title: "Predict: when as an expression",
      language: "Kotlin",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `fun main() {
    val score = 85
    val grade = when {
        score >= 90 -> "A"
        score >= 80 -> "B"
        score >= 70 -> "C"
        else -> "F"
    }
    println("Grade: $grade")

    for (i in 1..3) {
        println("Attempt $i")
    }
}`,
          expectedOutput: "Grade: B\nAttempt 1\nAttempt 2\nAttempt 3",
        },
      ],
      hints: [
        "85 is not >= 90, but is >= 80, so the second branch matches.",
        "1..3 is inclusive, producing 1, 2, and 3.",
      ],
    },
    nextLessonSlug: "kotlin-null-safety",
  },
  {
    id: "kotlin-null-safety",
    slug: "kotlin-null-safety",
    title: "Null Safety",
    description: "Kotlin's signature feature: nullable types, safe calls, and the Elvis operator.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Explain why Kotlin distinguishes nullable (String?) from non-nullable (String) types at compile time",
      "Use the safe-call operator (?.) and the Elvis operator (?:)",
      "Recognize what the non-null assertion (!!) does and why it should be used sparingly",
    ],
    skills: ["kotlin-null-safety"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Kotlin documentation: Null safety", url: "https://kotlinlang.org/docs/home.html" },
    ],
    keywords: ["kotlin null safety", "safe call operator", "elvis operator", "non-null assertion"],
    explanation: `Kotlin's most distinctive feature is built-in **null safety**. A regular type like \`String\` cannot hold \`null\` -- the compiler rejects it. To allow null, you must explicitly mark the type nullable with a \`?\`: \`String?\`. This turns "forgot to check for null" from a runtime crash (a NullPointerException, notoriously common in Java) into a compile-time error you must address before the code even runs.

The **safe-call operator** \`?.\` accesses a property or calls a method only if the receiver isn't null, otherwise the whole expression evaluates to \`null\`: \`val length = name?.length\` -- if \`name\` is null, \`length\` is null too, with no exception thrown.

The **Elvis operator** \`?:\` provides a default value when the left side is null: \`val length = name?.length ?: 0\` -- "use name's length, or 0 if name is null."

The **non-null assertion** \`!!\` forces a nullable value to be treated as non-null, throwing a \`NullPointerException\` immediately if it actually is null. It exists for cases where you're certain a value can't be null, but using it defeats the purpose of null safety and should be rare -- prefer \`?.\` and \`?:\` wherever possible.`,
    commonMistakes: [
      "Overusing `!!` to silence a compiler error instead of genuinely handling the null case with `?.`/`?:` -- this just moves the crash to runtime, defeating the point of null safety.",
      "Forgetting that a plain `String` (no `?`) genuinely cannot hold null -- the compiler will reject an attempt to assign null to it.",
      "Assuming `?.` throws on null -- it doesn't; it safely evaluates to null instead.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Can a variable declared with type `String` (no `?`) hold null?",
        choices: [
          "Yes, always",
          "No -- only String? can hold null",
          "Only if uninitialized",
          "Only inside a function",
        ],
        correctIndex: 1,
        explanation:
          "Non-nullable types like String cannot hold null; String? is required to allow it.",
      },
      {
        id: "q2",
        prompt: "What does `name?.length` evaluate to if `name` is null?",
        choices: ["It throws an exception", "null", "0", "An empty string"],
        correctIndex: 1,
        explanation:
          "The safe-call operator evaluates to null rather than throwing when the receiver is null.",
      },
      {
        id: "q3",
        prompt: "What does the `!!` non-null assertion do if the value actually is null?",
        choices: [
          "Silently returns null",
          "Silently returns a default value",
          "Throws a NullPointerException immediately",
          "Converts null to an empty string",
        ],
        correctIndex: 2,
        explanation:
          "!! throws immediately if the value is null, which is why it should be used sparingly.",
      },
    ],
    takeaway:
      "Prefer ?. and ?: to safely handle nullable values -- reach for !! only when you're truly certain a value can't be null.",
    summary:
      "Kotlin distinguishes nullable (String?) from non-nullable (String) types at compile time; ?. safely accesses, ?: provides a default, and !! asserts non-null (throwing if wrong).",
    guidedOutputLab: {
      id: "kotlin-lab-null-safety",
      title: "Predict: Safe call and Elvis operator",
      language: "Kotlin",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `fun main() {
    val name: String? = null
    val otherName: String? = "Grace"

    println(name?.length ?: 0)
    println(otherName?.length ?: 0)
}`,
          expectedOutput: "0\n5",
        },
      ],
      hints: [
        "name is null, so name?.length is null, and ?: 0 provides the fallback.",
        'otherName is "Grace" (5 characters), so otherName?.length is 5, and the Elvis fallback is never used.',
      ],
    },
    nextLessonSlug: "kotlin-functions-and-lambdas",
  },
  {
    id: "kotlin-functions-and-lambdas",
    slug: "kotlin-functions-and-lambdas",
    title: "Functions, Default Arguments, and Lambdas",
    description:
      "Function declarations, default/named arguments, and higher-order functions with lambdas.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Declare a function with default argument values and call it with named arguments",
      "Write a single-expression function using = instead of a block body",
      "Pass a lambda to a higher-order function like a collection's map or filter",
    ],
    skills: ["kotlin-functions"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Kotlin documentation: Functions", url: "https://kotlinlang.org/docs/home.html" },
    ],
    keywords: ["kotlin functions", "default arguments", "named arguments", "kotlin lambdas"],
    explanation: `Kotlin functions can declare **default argument values**: \`fun greet(name: String, greeting: String = "Hello") { println("$greeting, $name!") }\` -- calling \`greet("Ada")\` uses the default greeting, while \`greet("Ada", "Hi")\` overrides it. Combined with **named arguments** (\`greet(name = "Ada", greeting = "Hi")\`), this often eliminates the need for function overloading that other languages rely on default values or overloads for.

A function whose body is a single expression can use \`=\` instead of a block with \`return\`: \`fun square(n: Int) = n * n\` is equivalent to \`fun square(n: Int): Int { return n * n }\`, but more concise.

Kotlin treats functions as values, enabling **higher-order functions** -- functions that take other functions (often written as lambdas) as arguments. A lambda is written in curly braces: \`{ x -> x * 2 }\`. Collection functions like \`map\` and \`filter\` take a lambda: \`listOf(1, 2, 3).map { it * 2 }\` produces \`[2, 4, 6]\` -- note \`it\` is the implicit name for a lambda's single parameter when you don't name one explicitly.`,
    commonMistakes: [
      "Forgetting that named arguments let you skip earlier default-valued parameters and only override a later one.",
      "Writing an unnecessarily verbose block-body function when a single-expression function (using =) would be clearer.",
      "Confusing `it` (the implicit lambda parameter) with a named variable when a lambda genuinely needs an explicit parameter name for clarity.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does a default argument value let you avoid at the call site?",
        choices: [
          "Nothing, defaults are purely decorative",
          "Always having to pass that argument explicitly",
          "Declaring the function's return type",
          "Using named arguments at all",
        ],
        correctIndex: 1,
        explanation: "A default value means the caller can omit that argument entirely.",
      },
      {
        id: "q2",
        prompt: "What does `it` refer to inside a lambda like `{ it * 2 }`?",
        choices: [
          "The lambda's return value",
          "The implicit name for the lambda's single parameter",
          "A global variable",
          "The enclosing function's name",
        ],
        correctIndex: 1,
        explanation: "`it` is Kotlin's implicit parameter name for a single-parameter lambda.",
      },
      {
        id: "q3",
        prompt: "What does `fun square(n: Int) = n * n` demonstrate?",
        choices: [
          "A lambda expression",
          "A single-expression function body",
          "A default argument",
          "A named argument",
        ],
        correctIndex: 1,
        explanation:
          "Using = instead of a block body defines a concise single-expression function.",
      },
    ],
    takeaway:
      "Default and named arguments reduce the need for overloads; single-expression functions (=) and lambdas (with implicit `it`) keep code concise.",
    summary:
      "Functions can have default/named arguments and single-expression bodies; higher-order functions accept lambdas, with `it` as the implicit single-parameter name.",
    guidedOutputLab: {
      id: "kotlin-lab-functions-lambdas",
      title: "Predict: Default arguments and a map lambda",
      language: "Kotlin",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `fun greet(name: String, greeting: String = "Hello") = "$greeting, $name!"

fun main() {
    println(greet("Ada"))
    println(greet("Grace", "Hi"))

    val doubled = listOf(1, 2, 3).map { it * 2 }
    println(doubled)
}`,
          expectedOutput: "Hello, Ada!\nHi, Grace!\n[2, 4, 6]",
        },
      ],
      hints: [
        'greet("Ada") uses the default greeting "Hello" since no second argument was given.',
        "map applies the lambda to every element, doubling each: 1*2, 2*2, 3*2 -> [2, 4, 6].",
      ],
    },
    nextLessonSlug: "kotlin-classes-and-constructors",
  },
  {
    id: "kotlin-classes-and-constructors",
    slug: "kotlin-classes-and-constructors",
    title: "Classes and Primary Constructors",
    description: "Kotlin's concise primary constructor syntax and class property declarations.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Declare a class with a primary constructor directly in the class header",
      "Distinguish val and var properties declared in a primary constructor",
      "Add a method to a class and call it on an instance",
    ],
    skills: ["kotlin-classes"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Kotlin documentation: Classes", url: "https://kotlinlang.org/docs/home.html" },
    ],
    keywords: ["kotlin classes", "primary constructor", "kotlin properties"],
    explanation: `Kotlin classes can declare their **primary constructor** directly in the class header, dramatically reducing boilerplate compared to languages requiring a separate constructor body just to assign fields: \`class Person(val name: String, var age: Int)\` declares a class with two properties, a constructor accepting both, and no additional code needed.

The \`val\`/\`var\` before each constructor parameter is what makes it a **property** (accessible as \`person.name\`) rather than just a local constructor parameter -- \`val\` for a read-only property, \`var\` for a mutable one, exactly like the standalone variable rules from earlier in this course.

You create an instance without a \`new\` keyword (unlike Java or C#): \`val ada = Person("Ada", 30)\`. Methods are declared inside the class body: \`class Person(val name: String, var age: Int) { fun greet() = "Hi, I'm $name" }\`, called as \`ada.greet()\`.`,
    commonMistakes: [
      "Writing `new Person(...)` out of habit from Java/C# -- Kotlin doesn't use a `new` keyword for object creation.",
      "Forgetting `val`/`var` before a primary-constructor parameter, which makes it a plain constructor parameter (not accessible afterward) instead of a property.",
      "Declaring a property as `val` when the design actually needs to mutate it later, causing a compile error at the point of reassignment.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What keyword does Kotlin require to create a new class instance?",
        choices: [
          "new",
          "create",
          "No keyword -- just call the constructor like a function",
          "init",
        ],
        correctIndex: 2,
        explanation:
          'Kotlin has no `new` keyword; you call the class name like a function: Person("Ada", 30).',
      },
      {
        id: "q2",
        prompt:
          "In `class Person(val name: String, var age: Int)`, what does the `val` before `name` do?",
        choices: [
          "Nothing, it's optional decoration",
          "Makes name a read-only property accessible outside the class",
          "Makes name a private field",
          "Declares name as a companion object member",
        ],
        correctIndex: 1,
        explanation:
          "val/var before a primary-constructor parameter turns it into an accessible property.",
      },
      {
        id: "q3",
        prompt: "Where are a Kotlin class's methods declared?",
        choices: [
          "Only in the primary constructor",
          "In the class body, inside curly braces",
          "In a separate file only",
          "Kotlin classes cannot have methods",
        ],
        correctIndex: 1,
        explanation:
          "Methods are declared in the class body, just like properties without val/var in the constructor.",
      },
    ],
    takeaway:
      "A primary constructor with val/var parameters declares both the constructor and the properties in one line -- no `new` keyword is needed to instantiate.",
    summary:
      "Kotlin classes declare a primary constructor directly in the header; val/var parameters become properties; instances are created without `new`.",
    guidedOutputLab: {
      id: "kotlin-lab-classes",
      title: "Predict: A class with a primary constructor and a method",
      language: "Kotlin",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `class Person(val name: String, var age: Int) {
    fun haveBirthday(): String {
        age += 1
        return "$name is now $age"
    }
}

fun main() {
    val ada = Person("Ada", 30)
    println(ada.haveBirthday())
    println(ada.age)
}`,
          expectedOutput: "Ada is now 31\n31",
        },
      ],
      hints: [
        "age is a var, so haveBirthday() can increment it and the change persists.",
        "After calling haveBirthday(), ada.age reflects the updated value, 31.",
      ],
    },
    nextLessonSlug: "kotlin-data-classes",
  },
  {
    id: "kotlin-data-classes",
    slug: "kotlin-data-classes",
    title: "Data Classes",
    description: "Kotlin's data class: automatic equals, hashCode, toString, and copy.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Declare a data class and explain what it automatically generates",
      "Use the automatically-generated toString() and equals() to compare and print instances",
      "Use copy() to create a modified copy of a data class instance",
    ],
    skills: ["kotlin-classes", "kotlin-data-classes"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Kotlin documentation: Data classes", url: "https://kotlinlang.org/docs/home.html" },
    ],
    keywords: ["kotlin data class", "equals hashCode toString", "copy function"],
    explanation: `A **data class** is Kotlin's concise way to declare a class whose primary purpose is holding data: \`data class Point(val x: Int, val y: Int)\`. Adding the \`data\` keyword automatically generates several useful methods that you'd otherwise have to write by hand: a meaningful \`toString()\` (e.g. \`Point(x=3, y=4)\` instead of a memory address), \`equals()\`/\`hashCode()\` based on the properties (so two \`Point\` instances with the same \`x\`/\`y\` are considered equal), and \`copy()\`.

\`copy()\` creates a new instance with some properties changed and the rest kept: \`val moved = point.copy(x = 10)\` creates a new \`Point\` with \`x = 10\` and the original \`y\` unchanged -- especially useful alongside \`val\` properties, since you can't mutate the original but can cheaply produce a modified copy.

Data classes are commonly used for simple value-holding types: API response models, coordinates, configuration objects -- anywhere the main job of the class is "hold these values and compare/print them sensibly."`,
    commonMistakes: [
      "Writing a regular class and manually implementing equals()/hashCode()/toString() when a data class would generate all three automatically.",
      "Trying to mutate a data class's val properties directly instead of using copy() to produce a new instance with changes.",
      "Assuming two data class instances with identical property values are the same object reference -- equals() compares values, not identity (though it also makes such comparisons return true, which is the intended behavior).",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does adding `data` before `class Point(...)` automatically generate?",
        choices: [
          "Only a constructor",
          "toString(), equals()/hashCode(), and copy(), among others",
          "A database table mapping",
          "Nothing extra -- data is purely documentation",
        ],
        correctIndex: 1,
        explanation:
          "The data keyword generates toString, equals/hashCode, copy, and a few other useful methods.",
      },
      {
        id: "q2",
        prompt: "What does `point.copy(x = 10)` do?",
        choices: [
          "Mutates point's x property directly",
          "Creates a new instance with x changed to 10 and other properties kept",
          "Deletes point and creates a new one with only x set",
          "Throws an error since point's properties are val",
        ],
        correctIndex: 1,
        explanation: "copy() produces a new instance, changing only the specified properties.",
      },
      {
        id: "q3",
        prompt: "How does a data class's generated equals() compare two instances?",
        choices: [
          "By object reference/identity only",
          "By comparing their property values",
          "It always returns true",
          "Data classes cannot be compared",
        ],
        correctIndex: 1,
        explanation:
          "The generated equals() compares property values, so two instances with the same values are equal.",
      },
    ],
    takeaway:
      "Use `data class` for value-holding types to get toString/equals/hashCode/copy for free, and use copy() instead of trying to mutate val properties.",
    summary:
      "Data classes automatically generate toString, value-based equals/hashCode, and copy -- ideal for simple value-holding types like API models or coordinates.",
    guidedOutputLab: {
      id: "kotlin-lab-data-classes",
      title: "Predict: A data class's generated toString, equals, and copy",
      language: "Kotlin",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `data class Point(val x: Int, val y: Int)

fun main() {
    val a = Point(3, 4)
    val b = Point(3, 4)
    val c = a.copy(x = 10)

    println(a)
    println(a == b)
    println(c)
}`,
          expectedOutput: "Point(x=3, y=4)\ntrue\nPoint(x=10, y=4)",
        },
      ],
      hints: [
        "The generated toString() prints properties in the form ClassName(prop=value, ...).",
        "a and b have identical property values, so the generated equals() (via ==) returns true.",
        "c.copy(x = 10) keeps y at 4 (from a) while changing only x.",
      ],
    },
    nextLessonSlug: "kotlin-interfaces-and-inheritance",
  },
  {
    id: "kotlin-interfaces-and-inheritance",
    slug: "kotlin-interfaces-and-inheritance",
    title: "Interfaces and Inheritance",
    description: "Kotlin's interfaces, and why classes are final unless marked open.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Declare and implement an interface",
      "Explain why Kotlin classes are final by default, and how open/override change that",
      "Distinguish an interface from an abstract concept a class inherits from",
    ],
    skills: ["kotlin-classes", "kotlin-inheritance"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Kotlin documentation: Interfaces", url: "https://kotlinlang.org/docs/home.html" },
    ],
    keywords: ["kotlin interfaces", "open class", "override"],
    explanation: `A Kotlin \`interface\` declares a contract of methods (and optionally properties) a class must implement: \`interface Greeter { fun greet(): String }\`, then \`class EnglishGreeter : Greeter { override fun greet() = "Hello!" }\` -- note the \`:\` for "implements/extends" (Kotlin uses one syntax for both) and the required \`override\` keyword, which makes it explicit and searchable which methods override something.

A genuinely distinctive Kotlin design choice: **classes are final by default** -- you cannot subclass a regular Kotlin class unless it's explicitly marked \`open\`. This is the opposite default from Java (where classes are open unless marked \`final\`), reflecting Kotlin's philosophy that inheritance should be a deliberate design decision, not an accident of forgetting to seal a class.

To allow subclassing, mark the class \`open class Animal { open fun speak() = "..." }\`, then a subclass can extend it and override the method: \`class Dog : Animal() { override fun speak() = "Woof!" }\` -- note the parentheses after \`Animal\` (calling its constructor) and the required \`override\` keyword again.`,
    commonMistakes: [
      "Trying to subclass a regular Kotlin class and being surprised by a compile error -- classes are final by default; the base class must be marked `open`.",
      "Forgetting the `override` keyword when implementing an interface method or overriding an open method -- Kotlin requires it explicitly, unlike some languages where it's optional.",
      "Confusing interface implementation with class inheritance -- both use `:` in Kotlin, but a class can implement multiple interfaces while extending only one base class.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Are Kotlin classes subclassable by default?",
        choices: [
          "Yes, always",
          "No -- they're final by default unless marked open",
          "Only interfaces are subclassable",
          "Only if they have a data class",
        ],
        correctIndex: 1,
        explanation:
          "Kotlin classes are final by default, the opposite of Java's default -- open is required to allow subclassing.",
      },
      {
        id: "q2",
        prompt:
          "What keyword must you use when implementing an interface method or overriding an open method?",
        choices: ["implement", "override", "extends", "virtual"],
        correctIndex: 1,
        explanation:
          "override is required and explicit in Kotlin, making overriding intent clear and searchable.",
      },
      {
        id: "q3",
        prompt: "Can a Kotlin class implement more than one interface?",
        choices: [
          "No, only one",
          "Yes, multiple interfaces, but extend only one base class",
          "Yes, unlimited interfaces and base classes",
          "Interfaces can't be implemented by classes",
        ],
        correctIndex: 1,
        explanation:
          "Kotlin allows implementing multiple interfaces but only single class inheritance.",
      },
    ],
    takeaway:
      "Kotlin classes are final by default -- mark a base class `open` (and its methods `open`) deliberately to allow subclassing, and always use `override` explicitly.",
    summary:
      "Interfaces declare a contract implemented with `:` and `override`; classes are final unless marked `open`, reflecting Kotlin's deliberate-inheritance philosophy.",
    guidedOutputLab: {
      id: "kotlin-lab-interfaces",
      title: "Predict: Interface implementation and open-class inheritance",
      language: "Kotlin",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `interface Greeter {
    fun greet(): String
}

open class Animal(val name: String) {
    open fun speak() = "..."
}

class Dog(name: String) : Animal(name), Greeter {
    override fun speak() = "Woof!"
    override fun greet() = "$name says hi"
}

fun main() {
    val dog = Dog("Rex")
    println(dog.speak())
    println(dog.greet())
}`,
          expectedOutput: "Woof!\nRex says hi",
        },
      ],
      hints: [
        'Dog overrides speak() from the open Animal class, so "Woof!" is printed instead of "...".',
        "Dog also implements the Greeter interface's greet() method.",
      ],
    },
    nextLessonSlug: "kotlin-collections",
  },
  {
    id: "kotlin-collections",
    slug: "kotlin-collections",
    title: "Collections: List, Map, and Functional Operations",
    description: "Kotlin's List and Map, plus common functional operations like filter and map.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Create a read-only List and a mutable MutableList",
      "Create and read from a Map",
      "Chain functional operations like filter and map over a collection",
    ],
    skills: ["kotlin-collections"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Kotlin documentation: Collections", url: "https://kotlinlang.org/docs/home.html" },
    ],
    keywords: ["kotlin list", "kotlin map", "kotlin filter map"],
    explanation: `Kotlin distinguishes **read-only** and **mutable** collection interfaces. \`listOf(1, 2, 3)\` creates a read-only \`List\` (no \`add\`/\`remove\` methods available); \`mutableListOf(1, 2, 3)\` creates a \`MutableList\` that supports them. This mirrors the \`val\`/\`var\` immutability preference at the collection-interface level -- prefer read-only collections unless mutation is genuinely needed.

A \`Map\` associates keys with values: \`mapOf("a" to 1, "b" to 2)\` creates a read-only map (note the \`to\` infix function building a key-value pair), read with \`map["a"]\` (returns the value or \`null\` if the key is missing, since Kotlin's map access is nullable-aware).

Kotlin collections support rich **functional operations**: \`filter\` keeps elements matching a condition, \`map\` transforms each element, and they chain naturally: \`listOf(1, 2, 3, 4).filter { it % 2 == 0 }.map { it * 10 }\` first keeps even numbers (\`[2, 4]\`) then multiplies each by 10 (\`[20, 40]\`).`,
    commonMistakes: [
      "Trying to call add()/remove() on a List created with listOf(), forgetting it's read-only -- mutableListOf() is needed for that.",
      'Assuming map["missingKey"] throws an exception -- it returns null instead, since Kotlin\'s map access is nullable-aware.',
      "Chaining filter and map in the wrong order and getting a different (though sometimes still valid-looking) result than intended.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `listOf(1, 2, 3)` create?",
        choices: [
          "A mutable list",
          "A read-only List with no add/remove methods",
          "An array",
          "A Map",
        ],
        correctIndex: 1,
        explanation: "listOf creates a read-only List; mutableListOf is needed for a mutable one.",
      },
      {
        id: "q2",
        prompt: 'What does `map["missingKey"]` return if the key isn\'t present?',
        choices: ["Throws an exception", "null", "An empty string", "0"],
        correctIndex: 1,
        explanation:
          "Map access in Kotlin is nullable-aware, returning null for a missing key rather than throwing.",
      },
      {
        id: "q3",
        prompt: "What does `listOf(1, 2, 3, 4).filter { it % 2 == 0 }` produce?",
        choices: ["[1, 3]", "[2, 4]", "[1, 2, 3, 4]", "[]"],
        correctIndex: 1,
        explanation:
          "filter keeps only elements matching the condition -- the even numbers 2 and 4.",
      },
    ],
    takeaway:
      "Prefer read-only List/Map (listOf/mapOf) by default, and chain filter/map for concise, readable data transformations.",
    summary:
      "Kotlin distinguishes read-only from mutable collections; Map access is nullable-aware; filter and map chain to transform collections concisely.",
    guidedOutputLab: {
      id: "kotlin-lab-collections",
      title: "Predict: Chaining filter and map over a list",
      language: "Kotlin",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6)
    val result = numbers.filter { it % 2 == 0 }.map { it * 10 }
    println(result)

    val ages = mapOf("Ada" to 30, "Grace" to 45)
    println(ages["Ada"])
    println(ages["Linus"])
}`,
          expectedOutput: "[20, 40, 60]\n30\nnull",
        },
      ],
      hints: [
        "filter keeps 2, 4, 6 (the even numbers), then map multiplies each by 10.",
        '"Linus" isn\'t a key in the map, so ages["Linus"] returns null.',
      ],
    },
    nextLessonSlug: "kotlin-coroutines-basics",
  },
  {
    id: "kotlin-coroutines-basics",
    slug: "kotlin-coroutines-basics",
    title: "Coroutines Fundamentals",
    description:
      "An introduction to Kotlin's suspend functions and coroutines for asynchronous code.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Explain what a suspend function is and why it's needed for asynchronous code",
      "Describe conceptually how a coroutine differs from a traditional thread",
      "Recognize launch and runBlocking as ways to start coroutine execution",
    ],
    skills: ["kotlin-coroutines"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "Kotlin documentation: Coroutines", url: "https://kotlinlang.org/docs/home.html" },
    ],
    keywords: ["kotlin coroutines", "suspend function", "kotlin async"],
    explanation: `Kotlin's concurrency model is built on **coroutines** -- lightweight units of concurrent execution that can be paused and resumed without blocking the underlying thread. A function that can pause is marked \`suspend\`: \`suspend fun fetchData(): String { ... }\` -- this marks it as a function that may suspend execution (e.g. while waiting for network I/O) without blocking the thread it's running on.

A key conceptual difference from a traditional OS thread: a single thread can run many coroutines, switching between them at suspension points, which is far cheaper than creating a new thread per concurrent task -- similar in spirit (though technically different in implementation) to Go's goroutines from earlier language comparisons if you've seen those.

You start a coroutine with a **coroutine builder** like \`launch\` (fire-and-forget, inside a \`CoroutineScope\`) or, in simple example/test code, \`runBlocking\` (which blocks the current thread until the coroutine inside it completes -- mainly used to bridge into coroutine code from regular, non-suspending code, like a program's \`main\` function).

This is an introductory conceptual overview -- production coroutine code (structured concurrency, dispatchers, cancellation) is a deeper topic beyond this fundamentals course's scope.`,
    commonMistakes: [
      "Calling a suspend function directly from regular (non-suspend) code without a coroutine builder like launch or runBlocking -- it won't compile.",
      "Assuming a coroutine is the same as an OS thread -- many coroutines can run on one thread, switching at suspension points.",
      "Using runBlocking in production code paths instead of just examples/tests/bridging code -- it blocks the calling thread, defeating the point of coroutines' non-blocking nature.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does the `suspend` keyword on a function indicate?",
        choices: [
          "The function is deprecated",
          "The function may pause execution without blocking its thread",
          "The function always throws an exception",
          "The function runs on a background thread automatically",
        ],
        correctIndex: 1,
        explanation:
          "suspend marks a function as potentially pausable without blocking the underlying thread.",
      },
      {
        id: "q2",
        prompt: "How do coroutines relate to OS threads?",
        choices: [
          "One coroutine always requires one dedicated thread",
          "Many coroutines can run on a single thread, switching at suspension points",
          "Coroutines and threads are unrelated concepts",
          "A coroutine is a heavier-weight version of a thread",
        ],
        correctIndex: 1,
        explanation:
          "Coroutines are lightweight and many can share a single thread, unlike a one-to-one thread model.",
      },
      {
        id: "q3",
        prompt: "What is `runBlocking` typically used for?",
        choices: [
          "The primary way to start coroutines in production code",
          "Bridging into coroutine code from regular non-suspending code, e.g. a main function or test",
          "Cancelling a running coroutine",
          "Declaring a suspend function",
        ],
        correctIndex: 1,
        explanation:
          "runBlocking blocks the calling thread until its coroutine completes -- mainly for bridging/examples/tests, not production hot paths.",
      },
    ],
    takeaway:
      "suspend functions can pause without blocking their thread; many coroutines can share one thread; use runBlocking mainly to bridge into coroutine code from regular code.",
    summary:
      "Coroutines are lightweight, pausable units of concurrency built on suspend functions, started via builders like launch or runBlocking -- introductory concepts only in this course.",
    guidedOutputLab: {
      id: "kotlin-lab-coroutines",
      title: "Predict: A suspend function bridged via runBlocking",
      language: "Kotlin",
      mode: "predict",
      prompt:
        "Read this program (using kotlinx.coroutines' runBlocking and delay) and predict exactly what it prints, in order.",
      steps: [
        {
          code: `import kotlinx.coroutines.*

suspend fun fetchGreeting(): String {
    delay(100) // simulates a non-blocking wait, e.g. for network I/O
    return "Hello from a coroutine!"
}

fun main() = runBlocking {
    println("Before fetch")
    val greeting = fetchGreeting()
    println(greeting)
    println("After fetch")
}`,
          expectedOutput: "Before fetch\nHello from a coroutine!\nAfter fetch",
        },
      ],
      hints: [
        "runBlocking waits for the coroutine inside it to fully complete before main() returns.",
        "Even though fetchGreeting() suspends (delay), the three println statements still execute in the order written, since each waits for the previous line to finish.",
      ],
    },
    nextLessonSlug: "kotlin-java-interop-and-usage",
  },
  {
    id: "kotlin-java-interop-and-usage",
    slug: "kotlin-java-interop-and-usage",
    title: "Java Interop and Where Kotlin Is Used Today",
    description: "How Kotlin and Java code call each other, and Kotlin's real-world usage today.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 10,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain how Kotlin code can call Java libraries and vice versa",
      "Describe Kotlin's role in modern Android development",
      "Identify backend frameworks (Ktor, Spring) that support Kotlin",
    ],
    skills: ["kotlin-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Kotlin documentation", url: "https://kotlinlang.org/docs/home.html" }],
    keywords: ["kotlin java interop", "kotlin android", "ktor", "spring kotlin"],
    explanation: `Because Kotlin compiles to the same JVM bytecode as Java, **interop is seamless in both directions**: a Kotlin file can call any Java class or library directly with no wrapper needed, and Java code can call Kotlin classes and (top-level) functions almost as naturally (Kotlin generates the necessary JVM-compatible signatures automatically). This is a major reason Kotlin was adoptable incrementally -- an existing Java codebase can introduce Kotlin file-by-file without a disruptive rewrite.

**Android**: Google announced Kotlin as a first-class language for Android development in 2017 and now recommends it as the preferred language for new Android apps, with Jetpack Compose (Android's modern UI toolkit) built Kotlin-first.

**Backend**: Kotlin is increasingly used server-side too, with frameworks like **Ktor** (a lightweight framework built specifically for Kotlin, using coroutines for async request handling) and **Spring** (the long-established Java framework, which added first-class Kotlin support).

One practical consequence of interop: when calling into Java code from Kotlin, a Java type without Kotlin's null-safety annotations is treated as a "platform type" -- Kotlin can't guarantee whether it's nullable, so you're responsible for handling it carefully (the null-safety guarantees from earlier in this course apply fully within Kotlin code, but are less automatic right at a Java interop boundary).`,
    commonMistakes: [
      "Assuming Kotlin requires rewriting an entire existing Java codebase before it can be introduced -- interop allows adopting it file-by-file.",
      "Assuming Kotlin's null-safety guarantees automatically extend to values coming from Java code -- Java types crossing into Kotlin are 'platform types' needing careful handling.",
      "Thinking Kotlin is Android-only in practice today -- Ktor and Spring both support real backend development in Kotlin.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Can a Kotlin file call a Java library directly, with no wrapper code?",
        choices: [
          "No, a wrapper is always required",
          "Yes -- interop is seamless since both compile to JVM bytecode",
          "Only for standard library classes",
          "Only in Android projects",
        ],
        correctIndex: 1,
        explanation: "Kotlin and Java interop directly since both target the same JVM bytecode.",
      },
      {
        id: "q2",
        prompt: "Which of these is a Kotlin-first backend web framework?",
        choices: ["Django", "Express", "Ktor", "Rails"],
        correctIndex: 2,
        explanation:
          "Ktor is a lightweight framework built specifically for Kotlin using coroutines.",
      },
      {
        id: "q3",
        prompt: "What is a 'platform type' in Kotlin?",
        choices: [
          "A type only usable on Android",
          "A type from Java whose nullability Kotlin can't guarantee, requiring careful handling",
          "A type that only exists at compile time",
          "A synonym for a data class",
        ],
        correctIndex: 1,
        explanation:
          "Platform types come from Java interop, where Kotlin can't verify nullability the way it can for native Kotlin types.",
      },
    ],
    takeaway:
      "Kotlin interoperates directly with Java (enabling incremental adoption), and is used today for both Android (its original strength) and backend services (via Ktor/Spring).",
    summary:
      "Kotlin/Java interop is bidirectional and seamless; Kotlin is Android's preferred language and is increasingly used for backend services via Ktor and Spring.",
    guidedOutputLab: {
      id: "kotlin-lab-interop",
      title: "Predict: Calling a Java-style utility from Kotlin",
      language: "Kotlin",
      mode: "predict",
      prompt:
        "This models a Kotlin file calling a method on a Java-style utility class (java.time.LocalDate is a real JDK class). Predict what it prints.",
      steps: [
        {
          code: `import java.time.LocalDate

fun main() {
    val today = LocalDate.of(2026, 8, 7)
    val nextWeek = today.plusDays(7)
    println("Today: $today")
    println("Next week: $nextWeek")
}`,
          expectedOutput: "Today: 2026-08-07\nNext week: 2026-08-14",
        },
      ],
      hints: [
        "LocalDate is a standard Java class (java.time), called directly from Kotlin with no wrapper.",
        "plusDays(7) on August 7th produces August 14th.",
      ],
    },
    nextLessonSlug: "kotlin-project-wrap-up",
  },
  {
    id: "kotlin-project-wrap-up",
    slug: "kotlin-project-wrap-up",
    title: "Putting It Together: Designing a Small Kotlin Data Model",
    description:
      "A wrap-up lesson combining data classes, null safety, and collections into one design.",
    trackSlug: "kotlin",
    courseSlug: "kotlin-fundamentals",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Combine data classes, null safety, and collection operations into a single small design",
      "Recognize how the features from this course compose together in realistic code",
      "Prepare to apply these concepts in this course's capstone project",
    ],
    skills: ["kotlin-classes", "kotlin-collections", "kotlin-null-safety"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "Kotlin documentation", url: "https://kotlinlang.org/docs/home.html" }],
    keywords: ["kotlin data model", "kotlin wrap-up"],
    explanation: `This final lesson combines several features from across the course into one small, realistic design: a simple note-taking data model, the same domain you'll extend in this course's capstone project.

A \`Note\` is naturally a \`data class\` (value-holding, benefits from generated \`equals\`/\`toString\`/\`copy\`): \`data class Note(val id: Int, val title: String, val body: String, val completed: Boolean = false)\` -- note the default value for \`completed\`, so callers creating a new note don't need to specify it.

A collection of notes is a \`List<Note>\` (or \`MutableList<Note>\` if notes are added/removed at runtime), and finding one by id naturally returns a nullable result, since the id might not exist: \`fun findNote(notes: List<Note>, id: Int): Note? = notes.find { it.id == id }\` -- the \`find\` function itself already returns \`null\` if nothing matches, so the function's return type must honestly be \`Note?\`, and callers must handle that with \`?.\`/\`?:\` rather than assuming a note is always found.

Marking a note complete without mutating the original (since \`Note\`'s fields could be \`val\`) uses \`copy\`: \`val completed = note.copy(completed = true)\`.`,
    commonMistakes: [
      "Declaring a find-by-id function's return type as non-nullable Note when the underlying search can genuinely fail to find a match.",
      "Using a regular class instead of a data class for a simple value-holding type like Note, missing out on generated equals/toString/copy for free.",
      "Mutating a note in place with var fields when copy() (with val fields) would better express 'this produces a new state, not an in-place edit'.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Why should `findNote(notes, id)` return `Note?` rather than `Note`?",
        choices: [
          "Because Kotlin requires all functions to return nullable types",
          "Because the search can genuinely fail to find a matching id",
          "Because Note is a data class",
          "It shouldn't -- Note is correct",
        ],
        correctIndex: 1,
        explanation:
          "Since no note might match the given id, the return type must honestly allow null.",
      },
      {
        id: "q2",
        prompt: "Why is `data class` a good fit for `Note`?",
        choices: [
          "Because it needs coroutines",
          "Because it's a simple value-holding type that benefits from generated equals/toString/copy",
          "Because it must implement an interface",
          "Data classes are required for all Kotlin classes",
        ],
        correctIndex: 1,
        explanation:
          "Note is a straightforward value-holding type, exactly what data classes are designed for.",
      },
      {
        id: "q3",
        prompt: "What does `note.copy(completed = true)` produce?",
        choices: [
          "Mutates note's completed field directly",
          "A new Note instance with completed set to true and other fields unchanged",
          "An error, since Note has val fields",
          "A boolean value",
        ],
        correctIndex: 1,
        explanation:
          "copy() produces a new instance with the specified change, leaving the original untouched.",
      },
    ],
    takeaway:
      "A realistic small Kotlin design naturally combines data classes, honestly-nullable search results, and copy()-based updates rather than in-place mutation.",
    summary:
      "This wrap-up combines data classes, null-safe search, and copy-based updates into one design pattern, directly preparing for the course capstone project.",
    guidedOutputLab: {
      id: "kotlin-lab-wrap-up",
      title: "Guided edit: From an unsafe find to a null-safe one",
      language: "Kotlin",
      mode: "guided-editing",
      prompt: "Follow each step to see how the design becomes null-safe and immutable-friendly.",
      steps: [
        {
          description:
            "Start with a data class and a naive find function that assumes a match always exists (unsafe -- would crash if not found).",
          code: `data class Note(val id: Int, val title: String, val completed: Boolean = false)

fun main() {
    val notes = listOf(Note(1, "Buy milk"), Note(2, "Write report"))
    val found = notes.find { it.id == 1 }!!
    println(found.title)
}`,
          expectedOutput: "Buy milk",
        },
        {
          description:
            "Make the lookup honestly nullable and handle the missing case with the Elvis operator instead of the risky !! assertion.",
          code: `data class Note(val id: Int, val title: String, val completed: Boolean = false)

fun main() {
    val notes = listOf(Note(1, "Buy milk"), Note(2, "Write report"))
    val found = notes.find { it.id == 99 }
    println(found?.title ?: "No note found")
}`,
          expectedOutput: "No note found",
        },
      ],
      hints: [
        "The first version's !! would crash the program if id 1 didn't exist -- it happens to work here because it does exist.",
        "The second version searches for id 99, which doesn't exist, so found is null and the Elvis fallback text is used instead of crashing.",
      ],
    },
  },
];
