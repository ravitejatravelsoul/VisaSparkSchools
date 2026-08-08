import type { LessonInput } from "@/lib/content/types";

/**
 * C#/.NET Fundamentals lessons. Like Go, C# has no safe, small in-browser
 * execution option (see docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md),
 * so every lesson uses a `guidedOutputLab` (read/predict/fill-in-blank/
 * guided-editing against a precomputed "Expected output") instead of
 * `example`/`guidedExercise`/`independentExercise` -- see
 * lib/content/types.ts's Phase 6/8 note and
 * components/runners/guided-output-panel.tsx. Every code sample and its
 * expected output were verified by hand against real C#/.NET semantics.
 */
export const csharpLessons: LessonInput[] = [
  {
    id: "csharp-introduction-and-dotnet",
    slug: "csharp-introduction-and-dotnet",
    title: "Introduction to C# and .NET",
    description:
      "What .NET is, how C# compiles to IL and runs on the CLR, and the shape of a minimal C# program.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain what .NET is (the runtime and base class library) and how C# relates to it",
      "Describe the compile path from C# source to IL to native code run by the CLR",
      "Identify the parts of a minimal C# program and what `dotnet run` does",
    ],
    skills: ["csharp-basics", "dotnet-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
      { label: ".NET documentation", url: "https://learn.microsoft.com/en-us/dotnet/" },
    ],
    keywords: ["c#", "csharp", ".net", "clr", "dotnet run", "IL"],
    explanation: `**.NET** is a free, cross-platform runtime and standard library (the "Base Class Library," or BCL) maintained by Microsoft. It's the platform C# code actually runs on -- much like the JVM is the platform Java runs on. .NET today runs identically on Windows, Linux, and macOS.

**C#** is one of several languages that target .NET (others include F# and Visual Basic .NET). When you compile a C# program, the compiler doesn't produce native machine code directly -- it produces **Intermediate Language (IL)**, a CPU-independent bytecode. At run time, the **Common Language Runtime (CLR)** loads that IL and just-in-time (JIT) compiles it to native machine code for the machine it's actually running on. This is why the exact same compiled program can run unmodified on Windows, Linux, or macOS, as long as .NET is installed.

A minimal modern C# program can be as short as a few lines of top-level statements in a file conventionally named \`Program.cs\` -- no explicit \`class Program { static void Main() { ... } }\` boilerplate required (the compiler generates that scaffolding for you behind the scenes). \`Console.WriteLine(...)\` prints a line of text to standard output, and string interpolation (\`$"...{expression}..."\`) lets you embed expressions directly inside a string literal.

You'll use the \`dotnet\` command-line tool constantly: \`dotnet run\` compiles and immediately runs a project in one step, convenient while developing (you'll see the full picture of the \`dotnet\` CLI in this course's final lesson).`,
    commonMistakes: [
      "Thinking C# compiles straight to native machine code the way C does -- it compiles to IL first, which the CLR JIT-compiles at run time.",
      "Assuming .NET is a Windows-only technology -- modern .NET is fully cross-platform (Windows, Linux, macOS).",
      "Expecting to need a `class Program { static void Main() }` wrapper in every file -- modern C# top-level statements let a file's code run directly without that boilerplate.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does the C# compiler produce before the CLR JIT-compiles it to native code?",
        choices: [
          "Native machine code directly",
          "Intermediate Language (IL)",
          "Assembly language",
          "Bytecode for the JVM",
        ],
        correctIndex: 1,
        explanation:
          "C# compiles to IL, a CPU-independent bytecode the CLR JIT-compiles to native code at run time.",
      },
      {
        id: "q2",
        prompt: "Which best describes modern .NET's platform support?",
        choices: [
          "Windows only",
          "Windows and macOS only",
          "Cross-platform: Windows, Linux, and macOS",
          "Linux only",
        ],
        correctIndex: 2,
        explanation: "Modern .NET runs identically on Windows, Linux, and macOS.",
      },
      {
        id: "q3",
        prompt: "What does `dotnet run` do?",
        choices: [
          "Only checks syntax without compiling",
          "Compiles and immediately runs a project in one step",
          "Installs the .NET SDK",
          "Publishes a project for deployment",
        ],
        correctIndex: 1,
        explanation: "`dotnet run` compiles (if needed) and immediately executes the project.",
      },
    ],
    takeaway:
      "C# compiles to IL, which the CLR JIT-compiles to native code at run time -- this is what makes the same compiled .NET code run unmodified across Windows, Linux, and macOS.",
    summary:
      ".NET is the cross-platform runtime and library C# targets; C# source compiles to IL, the CLR JIT-compiles IL to native code, and `dotnet run` builds and runs a project in one step.",
    guidedOutputLab: {
      id: "csharp-lab-hello-dotnet",
      title: "Predict: A minimal C# program",
      language: "C#",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `using System;

Console.WriteLine("Hello, .NET!");
int sum = 2 + 2;
Console.WriteLine($"2 + 2 = {sum}");`,
          expectedOutput: "Hello, .NET!\n2 + 2 = 4",
        },
      ],
      hints: [
        "`Console.WriteLine` adds a newline after each call.",
        'String interpolation (`$"...{sum}..."`) inserts the value of `sum` directly into the string.',
      ],
    },
    nextLessonSlug: "csharp-variables-types-and-interpolation",
  },
  {
    id: "csharp-variables-types-and-interpolation",
    slug: "csharp-variables-types-and-interpolation",
    title: "Variables, Types, and String Interpolation",
    description:
      "Declaring variables with explicit types and `var`, C#'s basic types, and string interpolation.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Declare variables with an explicit type and with `var` type inference",
      "Identify C#'s basic types: int, double, string, bool, and const",
      "Format interpolated string expressions, including numeric format specifiers like `:F1`",
    ],
    skills: ["csharp-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: ["csharp variables", "var", "string interpolation", "const"],
    explanation: `C# is statically typed: every variable has a fixed type, checked at compile time. You can declare one with an explicit type (\`int age = 30;\`) or let the compiler infer the type from the value using \`var\` (\`var age = 30;\`) -- \`var\` is purely a compile-time convenience; the variable is still strongly typed as \`int\`, it's just that you didn't have to spell it out. \`var\` only works for local variables inside a method body, never for a class-level field.

C#'s common basic types include \`int\` (32-bit integer), \`double\` (64-bit floating point), \`string\`, \`bool\`, and \`decimal\` (a higher-precision type built for money and other values where floating-point rounding error is unacceptable). C# does not implicitly convert between most numeric types where precision could silently be lost -- assigning a \`double\` to an \`int\` variable requires an explicit cast (\`(int)someDouble\`), though C# does allow some implicit *widening* conversions (an \`int\` can be assigned directly to a \`double\` variable, since no information is lost).

A \`const\` is a compile-time constant, declared with \`const Type name = value;\` -- its value must be knowable at compile time and can never change.

String interpolation (\`$"..."\`) embeds expressions directly inside a string literal using \`{expression}\`, optionally with a format specifier after a colon -- \`{heightCm:F1}\` formats a floating-point value with exactly one digit after the decimal point.`,
    commonMistakes: [
      "Assigning a `double` to an `int` variable without an explicit cast, expecting C# to truncate it automatically -- narrowing conversions require an explicit `(int)` cast.",
      "Forgetting that `var` still produces a strongly-typed variable -- it's compile-time type inference, not a dynamic/untyped variable.",
      "Omitting the format specifier (e.g. `:F1`) and being surprised interpolation prints a `double`'s full default precision instead of a rounded value.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `var age = 30;` produce in C#?",
        choices: [
          "A dynamically-typed variable that can later hold a string",
          "A strongly-typed `int` variable, with the type inferred at compile time",
          "A compile error, since `var` requires an explicit type",
          "A boxed `object`",
        ],
        correctIndex: 1,
        explanation:
          "`var` infers the type at compile time; the variable remains fully statically typed.",
      },
      {
        id: "q2",
        prompt: "What must you do to assign a `double` value to an `int` variable in C#?",
        choices: [
          "Nothing, it converts automatically",
          "Use an explicit cast like `(int)someDouble`",
          "Use the `var` keyword instead",
          "It's not possible in C#",
        ],
        correctIndex: 1,
        explanation: "Narrowing numeric conversions like double-to-int require an explicit cast.",
      },
      {
        id: "q3",
        prompt: 'What does the format specifier in `$"{heightCm:F1}"` control?',
        choices: [
          "The variable's declared type",
          "Rounding the value to one digit after the decimal point when formatted",
          "Whether the value is nullable",
          "The variable's scope",
        ],
        correctIndex: 1,
        explanation:
          "`:F1` formats a floating-point value with exactly one digit after the decimal point.",
      },
    ],
    takeaway:
      "Use `var` freely for local variables when the type is obvious from the value -- it's still fully statically typed -- and remember narrowing numeric conversions (like `double` to `int`) need an explicit cast.",
    summary:
      "C# variables are statically typed, declared with an explicit type or inferred with `var`; `const` fixes a compile-time value; string interpolation embeds expressions and optional format specifiers directly in a string literal.",
    guidedOutputLab: {
      id: "csharp-lab-variables",
      title: "Predict: Variables, const, and formatted interpolation",
      language: "C#",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `using System;

string name = "Ada";
int age = 30;
const double pi = 3.14159;

double height = 5.5;
double heightCm = height * 30.48;

Console.WriteLine($"{name} is {age} years old.");
Console.WriteLine($"Height in cm: {heightCm:F1}");
Console.WriteLine($"Pi is approximately {pi}");`,
          expectedOutput: "Ada is 30 years old.\nHeight in cm: 167.6\nPi is approximately 3.14159",
        },
      ],
      hints: [
        "`:F1` formats a floating-point value with exactly one digit after the decimal point.",
        "5.5 * 30.48 = 167.64, which rounds to 167.6 at one decimal place.",
      ],
    },
    nextLessonSlug: "csharp-control-flow",
  },
  {
    id: "csharp-control-flow",
    slug: "csharp-control-flow",
    title: "Control Flow: if, for, foreach, and switch Expressions",
    description: "C#'s if/else, for and foreach loops, and modern switch expressions.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Write `if`/`else if`/`else` and a counting `for` loop",
      "Iterate a collection with `foreach`",
      "Use a modern switch expression to return a value based on a matched pattern",
    ],
    skills: ["csharp-basics", "csharp-control-flow"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: ["csharp if", "for loop", "foreach", "switch expression"],
    explanation: `C#'s \`if\`/\`else if\`/\`else\` looks close to many C-family languages: the condition is inside parentheses, e.g. \`if (x > 0) { ... }\`.

A counting \`for\` loop looks like \`for (int i = 0; i < n; i++) { ... }\`. To iterate over a collection's elements directly (a \`List<T>\`, an array, a dictionary's entries, or anything else enumerable) C# has a dedicated \`foreach\` loop: \`foreach (var item in collection) { ... }\` -- no manual index bookkeeping required.

C#'s traditional \`switch\` **statement** does fall through if a case has no \`break\` -- so each case still needs its own \`break\` (or another jump statement) to avoid running into the next one. Modern C# (8.0+) added a **switch expression**, a more compact form that evaluates to a value directly: \`string category = score switch { >= 90 => "A", >= 80 => "B", _ => "C" };\` -- each arm is \`pattern => result\`, \`_\` is the catch-all default, and there is no fallthrough concept at all in this form since it produces exactly one value.

Both \`for\` and \`foreach\` loops can be exited early with \`break\`, and \`continue\` skips to the next iteration, same as in most C-family languages.`,
    commonMistakes: [
      "Forgetting a traditional C# `switch` statement falls through to the next case without an explicit `break` in each case.",
      "Reaching for a `for` loop with manual indexing when a `foreach` loop would iterate the collection more directly and safely.",
      "Confusing the modern switch expression's `pattern => result` arms with the older switch statement's `case pattern: ... break;` syntax -- they look similar but are different constructs.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Does a traditional C# `switch` statement fall through to the next case without an explicit `break`?",
        choices: [
          "No, C# switch statements never fall through",
          "Yes, a C# switch statement falls through without an explicit break",
          "Only for string cases",
          "Only if no default case exists",
        ],
        correctIndex: 1,
        explanation:
          "Unlike some languages, a C# switch statement case falls through unless you add `break`.",
      },
      {
        id: "q2",
        prompt:
          "Which loop is best suited to iterating every element of a `List<string>` without manual indexing?",
        choices: ["A counting `for` loop", "`foreach`", "`switch`", "`goto`"],
        correctIndex: 1,
        explanation:
          "`foreach` iterates a collection's elements directly, with no index bookkeeping needed.",
      },
      {
        id: "q3",
        prompt: "What does a modern C# switch expression evaluate to?",
        choices: [
          "Nothing -- it must always be a statement",
          "A single value, chosen by matching the first satisfied arm",
          "A boolean only",
          "A new type declaration",
        ],
        correctIndex: 1,
        explanation:
          "A switch expression evaluates to one matched value, unlike the older switch statement.",
      },
    ],
    takeaway:
      "Use `foreach` to iterate a collection directly, remember traditional `switch` statements fall through without `break`, and reach for a switch expression when you want one matched value back, not a block of statements.",
    summary:
      "`if`/`for` look like other C-family languages; `foreach` iterates collections directly; traditional `switch` falls through without `break`, while the modern switch expression evaluates to a single matched value.",
    guidedOutputLab: {
      id: "csharp-lab-control-flow",
      title: "Fill in the blank: a counting loop with odd/even output",
      language: "C#",
      mode: "fill-in-blank",
      prompt: "Fill in the missing loop keyword, then predict the output.",
      steps: [
        {
          code: `using System;

____ (int i = 1; i <= 5; i++)
{
    if (i % 2 == 0)
    {
        Console.WriteLine($"{i} even");
    }
    else
    {
        Console.WriteLine($"{i} odd");
    }
}`,
          expectedOutput: "1 odd\n2 even\n3 odd\n4 even\n5 odd",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "for",
      hints: [
        "This is a standard counting loop with an initializer, condition, and increment.",
        "`%` is the modulo operator, checking whether `i` divides evenly by 2.",
      ],
    },
    nextLessonSlug: "csharp-classes-properties-and-constructors",
  },
  {
    id: "csharp-classes-properties-and-constructors",
    slug: "csharp-classes-properties-and-constructors",
    title: "Classes, Properties, and Constructors",
    description: "Defining classes, auto-implemented properties, and constructors.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Define a class with fields, auto-implemented properties, and methods",
      "Write a constructor that initializes an object's properties",
      "Explain what an auto-implemented property (`{ get; set; }`) generates behind the scenes",
    ],
    skills: ["csharp-oop"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: ["csharp classes", "properties", "auto-property", "constructors"],
    explanation: `C# is built around **classes**: \`public class Person { ... }\` defines a custom type combining data and behavior. You create an instance with \`new\`: \`var ada = new Person("Ada", 30);\`.

A **property** looks like a field from the outside (\`ada.Name\`) but is backed by get/set accessor logic. The shorthand \`public string Name { get; set; }\` is an **auto-implemented property** -- the compiler generates a hidden private backing field and trivial get/set accessors for you. You can also write a full property with custom logic in the accessors when you need validation or computed values, e.g. rejecting a negative age in the \`set\` accessor.

A **constructor** is a special method matching the class name with no return type, run automatically when you create an instance with \`new\`: \`public Person(string name, int age) { Name = name; Age = age; }\`. If you don't declare any constructor, C# generates a public parameterless one for you automatically -- but as soon as you declare any constructor yourself, that automatic one disappears unless you also declare a parameterless one explicitly.

Methods are declared inside the class body much like top-level functions, but implicitly operate on the specific instance they were called on (accessible explicitly via the \`this\` keyword, though it's often omitted when there's no ambiguity).`,
    commonMistakes: [
      "Assuming a class automatically gets a public parameterless constructor even after you've declared a different constructor yourself -- once you declare any constructor, the automatic parameterless one is gone unless you add it explicitly.",
      "Confusing an auto-implemented property (`{ get; set; }`) with a plain public field -- a property can later add validation logic without breaking calling code, while a field cannot.",
      "Forgetting that a constructor has no return type at all -- not even `void` -- unlike an ordinary method.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `public string Name { get; set; }` generate behind the scenes?",
        choices: [
          "Nothing extra -- it's identical to a public field",
          "A hidden private backing field plus simple get/set accessor methods",
          "A static field shared by all instances",
          "A compile error, since properties need explicit bodies",
        ],
        correctIndex: 1,
        explanation:
          "An auto-implemented property generates a hidden backing field with default accessors.",
      },
      {
        id: "q2",
        prompt:
          "What happens to a class's automatic parameterless constructor once you declare your own constructor?",
        choices: [
          "Nothing changes, both still exist",
          "It disappears, unless you also declare a parameterless one explicitly",
          "It becomes private",
          "It's renamed automatically",
        ],
        correctIndex: 1,
        explanation: "Declaring any constructor removes the compiler-generated parameterless one.",
      },
      {
        id: "q3",
        prompt: "What return type does a C# constructor declare?",
        choices: ["The class's own type", "void", "None at all -- not even void", "object"],
        correctIndex: 2,
        explanation: "A constructor declares no return type whatsoever, not even `void`.",
      },
    ],
    takeaway:
      "Prefer auto-implemented properties (`{ get; set; }`) over plain public fields, since they let you add validation logic later without breaking any calling code -- and remember declaring any constructor removes the automatic parameterless one.",
    summary:
      "Classes combine data and behavior; auto-implemented properties generate a hidden backing field and simple accessors; a constructor (no return type) initializes a new instance created with `new`.",
    guidedOutputLab: {
      id: "csharp-lab-classes",
      title: "Predict: A class with properties and a constructor",
      language: "C#",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `using System;

public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public string Greet()
    {
        return $"Hi, I'm {Name} and I'm {Age} years old.";
    }
}

Person ada = new Person("Ada", 30);
Console.WriteLine(ada.Greet());
ada.Age = 31;
Console.WriteLine($"{ada.Name} is now {ada.Age}.");`,
          expectedOutput: "Hi, I'm Ada and I'm 30 years old.\nAda is now 31.",
        },
      ],
      hints: [
        "The constructor runs once, when `new Person(...)` creates the instance.",
        "Setting `ada.Age = 31` uses the auto-implemented property's generated setter directly.",
      ],
    },
    nextLessonSlug: "csharp-interfaces-and-inheritance",
  },
  {
    id: "csharp-interfaces-and-inheritance",
    slug: "csharp-interfaces-and-inheritance",
    title: "Interfaces and Inheritance",
    description: "Explicit interface implementation with `:`, and single-class inheritance.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Define an interface and implement it explicitly with `: IInterfaceName`",
      "Derive one class from another with single inheritance",
      "Contrast C#'s explicit interface implementation with an implicit, structural-typing approach",
    ],
    skills: ["csharp-oop"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: ["csharp interfaces", "inheritance", "implements", "base class"],
    explanation: `A C# **interface** (conventionally prefixed \`I\`, e.g. \`IShape\`) declares a set of members a type must provide: \`public interface IShape { double Area(); }\`. C# requires a class to **explicitly declare** that it implements an interface: \`public class Rectangle : IShape { ... }\` -- unlike languages with implicit, structural interfaces (where having the right methods is enough), C#'s interface satisfaction is nominal: the class must name the interface.

C# also supports single-class **inheritance**: \`public class Square : Rectangle { ... }\` makes \`Square\` a specialized \`Rectangle\`, inheriting its public and protected members. A class can inherit from at most one base class (unlike interfaces, where a class can implement several at once: \`class Foo : IBar, IBaz\`).

A method meant to be overridden in a derived class must be marked \`virtual\` in the base class, and the derived class marks its version \`override\` -- without both keywords, the derived class's method simply hides the base one instead of genuinely overriding it (a common source of confusing bugs).

Because \`Square\` derives from \`Rectangle\`, and \`Rectangle\` implements \`IShape\`, a \`Square\` instance also satisfies \`IShape\` -- interface satisfaction flows down through the inheritance chain.`,
    commonMistakes: [
      "Expecting a class to satisfy an interface just by having matching methods -- C# requires the explicit `: IInterfaceName` declaration.",
      "Trying to inherit from two classes at once (`class Foo : Bar, Baz`) -- C# allows only one base class, though a class can implement multiple interfaces.",
      "Overriding a base method without marking the base version `virtual` and the derived version `override` -- without both keywords, the derived method just hides the base one rather than truly overriding it.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How does a C# class declare that it implements an interface?",
        choices: [
          "It doesn't need to -- matching methods are automatically enough",
          "Explicitly, with `: IInterfaceName` in the class declaration",
          "By importing the interface's namespace only",
          "With a `satisfies` keyword",
        ],
        correctIndex: 1,
        explanation:
          "C# interface implementation must be explicitly declared with `: IInterfaceName`.",
      },
      {
        id: "q2",
        prompt: "How many classes can a single C# class directly inherit from?",
        choices: [
          "As many as needed",
          "At most one",
          "Exactly two",
          "None -- inheritance doesn't exist in C#",
        ],
        correctIndex: 1,
        explanation: "C# supports single inheritance: at most one base class.",
      },
      {
        id: "q3",
        prompt:
          "What two keywords are both required for a derived class to genuinely override a base class method?",
        choices: [
          "`override` on the base, `virtual` on the derived class",
          "`virtual` on the base method, `override` on the derived method",
          "`abstract` on both",
          "Neither keyword is required",
        ],
        correctIndex: 1,
        explanation:
          "The base method needs `virtual` and the derived method needs `override` for a true override.",
      },
    ],
    takeaway:
      "C# interface implementation is explicit (`: IInterfaceName`) -- and a derived class only truly overrides a base method when the base marks it `virtual` and the derived class marks it `override`.",
    summary:
      "Interfaces declare required members, implemented explicitly with `: IInterfaceName`; single inheritance lets a class specialize one base class; `virtual`/`override` together enable genuine method overriding.",
    guidedOutputLab: {
      id: "csharp-lab-interfaces",
      title: "Predict: Interface implementation through an inheritance chain",
      language: "C#",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `using System;

public interface IShape
{
    double Area();
}

public class Rectangle : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public double Area()
    {
        return Width * Height;
    }
}

public class Square : Rectangle
{
    public Square(double side)
    {
        Width = side;
        Height = side;
    }
}

void Describe(IShape shape)
{
    Console.WriteLine($"Area: {shape.Area():F1}");
}

Rectangle rect = new Rectangle { Width = 3, Height = 4 };
Describe(rect);

Square square = new Square(5);
Describe(square);`,
          expectedOutput: "Area: 12.0\nArea: 25.0",
        },
      ],
      hints: [
        "Rectangle explicitly declares `: IShape`; Square inherits Area() from Rectangle without redeclaring it.",
        "3 * 4 = 12, and 5 * 5 = 25, each formatted with one decimal place.",
      ],
    },
    nextLessonSlug: "csharp-encapsulation-and-access-modifiers",
  },
  {
    id: "csharp-encapsulation-and-access-modifiers",
    slug: "csharp-encapsulation-and-access-modifiers",
    title: "Encapsulation and Access Modifiers",
    description: "Controlling visibility with public, private, protected, and internal.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Explain what each of public, private, protected, and internal controls",
      "Use a private backing field with a public property to enforce an invariant",
      "Explain why encapsulation matters for keeping an object's internal state valid",
    ],
    skills: ["csharp-oop"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: ["access modifiers", "public private protected internal", "encapsulation"],
    explanation: `C# has four everyday access modifiers controlling where a member (field, property, method, or the type itself) can be seen from:

- **\`public\`** -- accessible from anywhere.
- **\`private\`** -- accessible only from inside the same class (the default if you omit a modifier on a class member).
- **\`protected\`** -- accessible from the declaring class and any class that derives from it, but not from unrelated code.
- **\`internal\`** -- accessible from anywhere in the same assembly (roughly, the same compiled project), but not from other projects that reference it.

**Encapsulation** is the practice of keeping a type's internal data \`private\` and exposing controlled access through \`public\` members (properties and methods) that can enforce rules. A private field with a public read-only property (\`public decimal Balance => balance;\`, an *expression-bodied* property) lets outside code read a value freely while making it impossible to set that value except through methods you control, like a \`Deposit\` method that can reject a negative or zero amount.

Encapsulation is about hiding implementation details behind a controlled, stable public surface -- so a type's internal storage can change later without breaking any code that depends on it, as long as the public members keep their meaning.`,
    commonMistakes: [
      "Making every field `public` for convenience, losing the ability to validate or change how a value is stored later without breaking every caller.",
      "Confusing `protected` (visible to derived classes) with `internal` (visible anywhere in the same assembly) -- they control very different audiences.",
      "Forgetting that a class member with no access modifier at all defaults to `private`, not `public`.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which access modifier makes a member visible only inside its own declaring class?",
        choices: ["public", "internal", "private", "protected"],
        correctIndex: 2,
        explanation: "`private` restricts visibility to the declaring class itself.",
      },
      {
        id: "q2",
        prompt: "Which access modifier is visible to a derived class but not to unrelated code?",
        choices: ["private", "protected", "internal", "public"],
        correctIndex: 1,
        explanation: "`protected` extends visibility to derived classes specifically.",
      },
      {
        id: "q3",
        prompt:
          "Why is it useful to keep a field `private` and expose it through a public property or method instead?",
        choices: [
          "It makes the code run faster",
          "It lets you enforce rules (like rejecting an invalid value) without breaking calling code later",
          "Private fields are required by the compiler",
          "It's only a naming convention with no real effect",
        ],
        correctIndex: 1,
        explanation:
          "Encapsulation lets you validate or change internal storage without breaking callers.",
      },
    ],
    takeaway:
      "Default to `private` fields with controlled `public` access through properties and methods -- it lets you enforce invariants and change internal storage later without breaking any code that depends on the type.",
    summary:
      "public/private/protected/internal control member visibility at increasing scope; encapsulation keeps internal state private and exposes only a controlled, validated public surface.",
    guidedOutputLab: {
      id: "csharp-lab-encapsulation",
      title: "Fill in the blank: a private backing field",
      language: "C#",
      mode: "fill-in-blank",
      prompt: "Fill in the missing access modifier, then predict the output.",
      steps: [
        {
          code: `using System;

public class BankAccount
{
    ____ decimal balance;

    public BankAccount(decimal initialBalance)
    {
        balance = initialBalance;
    }

    public decimal Balance => balance;

    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
        }
    }
}

BankAccount account = new BankAccount(100m);
account.Deposit(50m);
Console.WriteLine($"Balance: {account.Balance}");`,
          expectedOutput: "Balance: 150",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "private",
      hints: [
        "The field should only be modifiable from inside BankAccount itself, through Deposit.",
        '100m + 50m = 150m; a whole-number decimal like 150m prints as "150".',
      ],
    },
    nextLessonSlug: "csharp-nullable-reference-types-and-null-operators",
  },
  {
    id: "csharp-nullable-reference-types-and-null-operators",
    slug: "csharp-nullable-reference-types-and-null-operators",
    title: "Nullable Reference Types and Null-Conditional/Coalescing Operators",
    description:
      "C#'s null-safety feature, plus the `?.` and `??` operators for working with possibly-null values.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 6,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Distinguish a nullable reference type (`string?`) from a non-nullable one (`string`)",
      "Use `?.` to safely access a member that might be null",
      "Use `??` to supply a fallback value when an expression is null",
    ],
    skills: ["csharp-modern-features"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: [
      "nullable reference types",
      "null-conditional operator",
      "null-coalescing operator",
      "?.",
      "??",
    ],
    explanation: `In a modern C# project (with nullable reference types enabled, the default for new projects), the compiler tracks nullability as part of a reference type's type: \`string\` means "the compiler expects this is never null," while \`string?\` means "this may legitimately be null, and code that dereferences it without checking should get a compiler warning." This is purely a compile-time analysis to catch a common class of bug earlier -- it does not add runtime null checks by itself.

The **null-conditional operator** \`?.\` accesses a member only if the value on its left isn't null, short-circuiting to \`null\` instead of throwing if it is: \`middleName?.Length\` is \`null\` if \`middleName\` is \`null\`, or the actual length otherwise -- without it, \`middleName.Length\` on a null \`middleName\` throws a \`NullReferenceException\` at run time.

The **null-coalescing operator** \`??\` supplies a fallback when the left side is \`null\`: \`nickname ?? "Unknown"\` evaluates to \`nickname\` if it isn't null, or the literal \`"Unknown"\` if it is. The two operators combine naturally: \`person?.Nickname ?? "Unknown"\` safely navigates a possibly-null \`person\` and still gives you a real value either way.

Inside a composite/interpolated string, a genuinely \`null\` value formats as an **empty string**, not the text "null" -- a subtlety worth knowing before you're surprised by a blank spot in printed output instead of an exception or the word "null".`,
    commonMistakes: [
      "Dereferencing a `string?` directly without `?.` or a null check, risking a `NullReferenceException` at run time that the compiler had already warned about.",
      "Assuming `??` and `?.` do the same thing -- `?.` safely navigates a member access, while `??` supplies a fallback value for an already-evaluated possibly-null expression.",
      'Expecting a null value inside an interpolated string to print the word "null" -- it actually formats as an empty string.',
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `string?` (with a question mark) signal, compared to plain `string`?",
        choices: [
          "That the variable is read-only",
          "That the compiler should track this reference as possibly null, warning on unchecked dereferences",
          "That the variable is a value type instead of a reference type",
          "Nothing -- it's purely stylistic",
        ],
        correctIndex: 1,
        explanation:
          "`string?` opts a reference into compile-time nullability tracking and warnings.",
      },
      {
        id: "q2",
        prompt: "What does `middleName?.Length` evaluate to when `middleName` is null?",
        choices: [
          "It throws a NullReferenceException",
          "null, without throwing",
          "0",
          "An empty string",
        ],
        correctIndex: 1,
        explanation: "The null-conditional operator short-circuits to null instead of throwing.",
      },
      {
        id: "q3",
        prompt:
          'What does a genuinely null value print as inside an interpolated string like `$"{value}"`?',
        choices: [
          'The text "null"',
          "An empty string",
          'The text "undefined"',
          "It throws an exception",
        ],
        correctIndex: 1,
        explanation:
          "A null value formats as an empty string in interpolated/composite formatting.",
      },
    ],
    takeaway:
      'Use `?.` to safely navigate a possibly-null reference and `??` to supply a fallback value -- and remember a null value inside an interpolated string formats as an empty string, not the word "null".',
    summary:
      "Nullable reference types (`string?`) let the compiler warn about unchecked null dereferences at compile time; `?.` safely navigates possibly-null members, `??` supplies a fallback, and null formats as an empty string in interpolation.",
    guidedOutputLab: {
      id: "csharp-lab-nullable",
      title: "Predict: Null-conditional and null-coalescing operators",
      language: "C#",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `using System;

string? middleName = null;
string? nickname = "Ace";

int? middleLength = middleName?.Length;
int? nicknameLength = nickname?.Length;

Console.WriteLine($"middleLength: {middleLength}");
Console.WriteLine($"nicknameLength: {nicknameLength}");

string displayName = nickname ?? "Unknown";
string displayMiddle = middleName ?? "(none)";

Console.WriteLine($"displayName: {displayName}");
Console.WriteLine($"displayMiddle: {displayMiddle}");`,
          expectedOutput:
            "middleLength: \nnicknameLength: 3\ndisplayName: Ace\ndisplayMiddle: (none)",
        },
      ],
      hints: [
        '`middleName?.Length` is null because middleName itself is null -- and a null value in an interpolated string prints as nothing, not the word "null".',
        '`??` only kicks in when the left side is null: nickname already has a value, so displayName is just "Ace".',
      ],
    },
    nextLessonSlug: "csharp-linq",
  },
  {
    id: "csharp-linq",
    slug: "csharp-linq",
    title: "LINQ: Where and Select",
    description: "Querying a collection declaratively with LINQ's Where and Select methods.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Filter a collection with `Where` and a lambda expression",
      "Transform a collection's elements with `Select`",
      "Chain LINQ methods together and materialize the result with `ToList()`",
    ],
    skills: ["csharp-modern-features", "csharp-linq"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: ["linq", "where", "select", "lambda expression", "IEnumerable"],
    explanation: `**LINQ** (Language Integrated Query) is one of C#'s signature features: a set of methods, available on any \`IEnumerable<T>\` (which includes \`List<T>\`, arrays, and more), that let you filter, transform, and aggregate data declaratively instead of writing manual loops. LINQ lives in the \`System.Linq\` namespace.

\`Where\` filters a sequence, keeping only elements matching a condition expressed as a **lambda expression** -- a compact, inline function: \`numbers.Where(n => n % 2 == 0)\` keeps only even numbers. The \`n =>\` part means "given a parameter \`n\`, evaluate the expression that follows."

\`Select\` transforms each element into something else: \`.Select(n => n * n)\` replaces each number with its square. LINQ methods are commonly **chained** together in a pipeline: \`numbers.Where(...).Select(...)\`.

LINQ queries are **lazily evaluated** by default -- \`Where\`/\`Select\` don't actually run through the data until something forces it to, like a \`foreach\` loop or a call to \`.ToList()\`, \`.Count()\`, or similar. Calling \`.ToList()\` at the end of a chain both forces evaluation and gives you back a concrete \`List<T>\` you can index into and reuse.

\`string.Join(", ", someList)\` is a handy way to turn any collection into a single readable string for display, joining each element's string representation with the given separator.`,
    commonMistakes: [
      "Assuming a LINQ query like `numbers.Where(...)` runs immediately -- it's lazily evaluated and only actually iterates when something consumes it, such as `foreach` or `.ToList()`.",
      "Forgetting `using System.Linq;` is required for `Where`/`Select` and the other LINQ extension methods to be available.",
      "Writing a manual `foreach` loop with a temporary list to filter and transform data, when `Where(...).Select(...)` expresses the same intent more directly.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `numbers.Where(n => n % 2 == 0)` do?",
        choices: [
          "Transforms every number by doubling it",
          "Keeps only the elements matching the given condition",
          "Sorts the numbers",
          "Counts how many numbers are even",
        ],
        correctIndex: 1,
        explanation: "`Where` filters a sequence down to elements matching the given condition.",
      },
      {
        id: "q2",
        prompt:
          "When does a LINQ query built from `Where`/`Select` actually iterate through the underlying data?",
        choices: [
          "Immediately, as soon as `Where` is called",
          "Only when something consumes it, like `foreach` or `.ToList()`",
          "Only after the program exits",
          "Never automatically -- you must call `.Run()`",
        ],
        correctIndex: 1,
        explanation:
          "LINQ queries are lazily evaluated until something actually consumes the results.",
      },
      {
        id: "q3",
        prompt: "What does `n => n * n` represent in a LINQ `Select` call?",
        choices: [
          "A class definition",
          "A lambda expression: given `n`, evaluate `n * n`",
          "A LINQ keyword with no parameters",
          "An error -- LINQ doesn't accept inline functions",
        ],
        correctIndex: 1,
        explanation: "`n => n * n` is a lambda expression mapping an input to `n * n`.",
      },
    ],
    takeaway:
      "Chain `Where` (filter) and `Select` (transform) to express data-processing pipelines declaratively -- remember they're lazily evaluated until something like `.ToList()` or `foreach` actually consumes the result.",
    summary:
      "LINQ's `Where` and `Select` filter and transform any `IEnumerable<T>` using lambda expressions, chainable into a pipeline that's lazily evaluated until consumed.",
    guidedOutputLab: {
      id: "csharp-lab-linq",
      title: "Predict: Filtering and transforming with LINQ",
      language: "C#",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `using System;
using System.Linq;
using System.Collections.Generic;

List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6 };

var evenSquares = numbers
    .Where(n => n % 2 == 0)
    .Select(n => n * n)
    .ToList();

Console.WriteLine(string.Join(", ", evenSquares));
Console.WriteLine($"Count: {evenSquares.Count}");`,
          expectedOutput: "4, 16, 36\nCount: 3",
        },
      ],
      hints: [
        "Where keeps only 2, 4, and 6 -- the even numbers.",
        "Select then squares each of those: 4, 16, 36.",
      ],
    },
    nextLessonSlug: "csharp-collections",
  },
  {
    id: "csharp-collections",
    slug: "csharp-collections",
    title: "Collections: List<T> and Dictionary<TKey, TValue>",
    description: "C#'s most commonly used generic collections, and the TryGetValue lookup pattern.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Create and grow a `List<T>` with `Add`",
      "Create a `Dictionary<TKey, TValue>` and look up a value safely with `TryGetValue`",
      "Explain why `TryGetValue` is preferred over indexing directly when a key might not exist",
    ],
    skills: ["csharp-collections"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: ["List<T>", "Dictionary", "TryGetValue", "generics"],
    explanation: `\`List<T>\` is C#'s everyday resizable, ordered collection. It's always backed by its own internal array that it manages and resizes for you, so growing it never requires reassigning anything yourself. You create one with \`new List<string> { "Ada", "Grace" }\` and grow it with \`.Add(...)\`. \`.Count\` gives you the current number of elements.

\`Dictionary<TKey, TValue>\` is C#'s hash map. You can create one with a collection initializer using index syntax: \`new Dictionary<string, int> { ["Ada"] = 90 }\`.

Indexing a dictionary directly with \`someDict["missingKey"]\` **throws a \`KeyNotFoundException\`** if the key doesn't exist. C#'s safe lookup is \`TryGetValue\`: \`if (scores.TryGetValue("Ada", out int adaScore)) { ... }\` -- it returns \`true\` and sets \`adaScore\` if the key exists, or \`false\` (with \`adaScore\` set to the type's default) if it doesn't, letting you branch on success without risking an exception.

\`<T>\` (and \`<TKey, TValue>\`) mark \`List\` and \`Dictionary\` as **generic types** -- the same \`List<T>\` code works for \`List<int>\`, \`List<string>\`, or a list of any other type, with the compiler enforcing that every element really is that type.`,
    commonMistakes: [
      "Indexing a `Dictionary` directly with `dict[key]` for a key that might not exist, risking an unhandled `KeyNotFoundException` -- use `TryGetValue` instead when the key's presence isn't guaranteed.",
      "Forgetting `.Add` on a `List<T>` mutates the list in place -- there's nothing to reassign, unlike appending in some other languages.",
      "Forgetting the `out` keyword is required on `TryGetValue`'s second parameter -- it's how the method hands back the found value alongside its `true`/`false` result.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What happens when you index a `Dictionary<TKey, TValue>` directly with a key that doesn't exist?",
        choices: [
          "It returns the value type's default",
          "It returns null",
          "It throws a KeyNotFoundException",
          "It silently adds the key with a default value",
        ],
        correctIndex: 2,
        explanation: "Direct indexing on a missing key throws KeyNotFoundException.",
      },
      {
        id: "q2",
        prompt: "What does `TryGetValue` return when the key does exist?",
        choices: [
          "false, with the out parameter set to default",
          "true, with the out parameter set to the found value",
          "The value directly, with no boolean",
          "It throws if the key exists",
        ],
        correctIndex: 1,
        explanation: "TryGetValue returns true and sets the out parameter when the key is found.",
      },
      {
        id: "q3",
        prompt: "What does the `<T>` in `List<T>` indicate?",
        choices: [
          "That the list is read-only",
          "That List is a generic type, usable with any element type",
          "That the list has a fixed maximum size",
          "That T is a required method name",
        ],
        correctIndex: 1,
        explanation: "`<T>` marks List as a generic type parameterized over its element type.",
      },
    ],
    takeaway:
      "Prefer `TryGetValue` over direct dictionary indexing whenever a key's presence isn't guaranteed -- it lets you branch on success safely instead of risking an unhandled exception.",
    summary:
      "`List<T>` is C#'s resizable, generic collection; `Dictionary<TKey, TValue>` is its hash map, whose safe lookup pattern is `TryGetValue(key, out value)` rather than direct indexing.",
    guidedOutputLab: {
      id: "csharp-lab-collections",
      title: "Fill in the blank: the TryGetValue lookup pattern",
      language: "C#",
      mode: "fill-in-blank",
      prompt:
        "Fill in the missing keyword required by TryGetValue's second parameter, then predict the output.",
      steps: [
        {
          code: `using System;
using System.Collections.Generic;

List<string> names = new List<string> { "Ada", "Grace" };
names.Add("Linus");

Dictionary<string, int> scores = new Dictionary<string, int>
{
    ["Ada"] = 90,
    ["Grace"] = 85,
};

Console.WriteLine($"names: {string.Join(", ", names)}");
Console.WriteLine($"count: {names.Count}");

if (scores.TryGetValue("Ada", ____ int adaScore))
{
    Console.WriteLine($"Ada's score: {adaScore}");
}

if (!scores.TryGetValue("Linus", ____ int linusScore))
{
    Console.WriteLine("Linus not found");
}`,
          expectedOutput: "names: Ada, Grace, Linus\ncount: 3\nAda's score: 90\nLinus not found",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "out",
      hints: [
        "TryGetValue hands the found value back through an `out` parameter alongside its true/false return.",
        '"Linus" isn\'t in the dictionary, so the second TryGetValue call returns false, and the ! negation makes that branch run.',
      ],
    },
    nextLessonSlug: "csharp-async-await-and-tasks",
  },
  {
    id: "csharp-async-await-and-tasks",
    slug: "csharp-async-await-and-tasks",
    title: "Async and Await with Task",
    description: "C#'s asynchronous programming model, and why it exists.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 25,
    objectives: [
      "Explain why async/await exists: not blocking a thread while waiting on slow I/O",
      "Mark a method `async` and return `Task`/`Task<T>` instead of `void`/a plain type",
      "Use `await` to receive a Task's result once it completes",
    ],
    skills: ["csharp-async"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: ["async", "await", "Task", "asynchronous programming"],
    explanation: `Many real operations a C# program performs -- reading a file, calling a web API, querying a database -- take time and mostly involve *waiting*, not computing. Doing that waiting **synchronously** ties up an entire thread for the whole wait, which doesn't scale: a server handling many requests would need one thread sitting idle per in-flight request. C#'s **\`async\`/\`await\`** model lets a method start a slow operation, give its thread back for other work while waiting, and resume exactly where it left off once the result is ready -- without you manually managing callbacks or threads yourself.

A **\`Task\`** represents an operation that may not have finished yet -- roughly, a "future result." A method that returns a value asynchronously is declared \`async Task<T>\` instead of a plain \`T\` (or just \`async Task\` for an asynchronous method with no return value, instead of \`void\`). Inside an \`async\` method, the \`await\` keyword pauses that method (without blocking its thread) until the awaited \`Task\` completes, then resumes with its result: \`int result = await SomeAsyncMethod();\`.

Calling an \`async\` method from the top level of a modern C# program (top-level statements) can use \`await\` directly -- the compiler wraps the whole file's top-level code in an async entry point automatically when it detects \`await\` used there.

A method's asynchrony is genuinely part of its signature and tends to be **contagious** in a good way: once a method awaits something, it should itself be \`async\`, and its callers who need its result generally need to \`await\` it too, all the way up the call chain -- this is a real, deliberate design tradeoff, trading a bit of verbosity for a program that never silently blocks a thread it didn't mean to.`,
    commonMistakes: [
      "Blocking on a Task synchronously (calling `.Result` or `.Wait()` instead of `await`) -- this defeats the purpose of async and can even deadlock certain application types.",
      "Marking a method `async` but forgetting it must return `Task`, `Task<T>`, or `void` (only for event handlers) -- an `async` method can't just return a plain type like `int` directly.",
      "Assuming `async`/`await` always creates a new OS thread -- it doesn't; it's fundamentally about not blocking the current thread while waiting, not about running work in parallel.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What problem does async/await primarily solve?",
        choices: [
          "Making CPU-bound math run faster",
          "Avoiding blocking a thread for the entire duration of a slow operation like I/O",
          "Automatically parallelizing loops",
          "Preventing all possible exceptions",
        ],
        correctIndex: 1,
        explanation: "async/await avoids tying up a thread for the full duration of a slow wait.",
      },
      {
        id: "q2",
        prompt:
          "What does an `async` method that returns an `int` asynchronously actually declare as its return type?",
        choices: ["int", "void", "Task<int>", "async int"],
        correctIndex: 2,
        explanation:
          "An async method returning a value asynchronously declares `Task<T>`, e.g. `Task<int>`.",
      },
      {
        id: "q3",
        prompt: "What does `await` do inside an `async` method?",
        choices: [
          "Blocks the current thread until the Task finishes",
          "Pauses that method without blocking its thread, resuming once the awaited Task completes",
          "Starts a new OS thread for the awaited call",
          "Cancels the Task immediately",
        ],
        correctIndex: 1,
        explanation:
          "`await` suspends the method without blocking its thread, resuming on completion.",
      },
    ],
    takeaway:
      "Use `async`/`await` (with `Task`/`Task<T>` return types) to avoid blocking a thread during a slow operation -- and let asynchrony propagate up the call chain via `await` rather than blocking on `.Result` or `.Wait()`.",
    summary:
      "async/await lets a method give up its thread while waiting on a Task instead of blocking it; async methods return Task or Task<T>, and await resumes with the result once the awaited Task completes.",
    guidedOutputLab: {
      id: "csharp-lab-async",
      title: "Guided edit: From a synchronous call to async/await",
      language: "C#",
      mode: "guided-editing",
      prompt:
        "Follow each step to see how making this function asynchronous changes (or doesn't change) its output.",
      steps: [
        {
          description: "Start with a plain synchronous function call -- no async yet.",
          code: `using System;

int Square(int n)
{
    return n * n;
}

int result = Square(6);
Console.WriteLine($"Result: {result}");`,
          expectedOutput: "Result: 36",
        },
        {
          description:
            "Make the function asynchronous with async/await and Task<int>, so it can await other async work (simulated here with Task.Delay) without blocking a thread.",
          code: `using System;
using System.Threading.Tasks;

async Task<int> SquareAsync(int n)
{
    await Task.Delay(10);
    return n * n;
}

int result = await SquareAsync(6);
Console.WriteLine($"Result: {result}");`,
          expectedOutput: "Result: 36",
        },
      ],
      hints: [
        "The output is identical in both versions -- async/await changes how the wait happens, not what value is ultimately computed.",
        "`await Task.Delay(10)` simulates a slow operation without blocking the thread during the wait.",
      ],
    },
    nextLessonSlug: "csharp-exception-handling",
  },
  {
    id: "csharp-exception-handling",
    slug: "csharp-exception-handling",
    title: "Exception Handling: try, catch, and finally",
    description:
      "C#'s exception-based error model, and how it contrasts with returning explicit error values.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Write a try/catch/finally block to handle a thrown exception",
      "Throw a specific exception type with `throw new SomeException(...)`",
      "Contrast C#'s exception-based error handling with an explicit (result, error) return convention",
    ],
    skills: ["csharp-error-handling"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "C# language reference and guide",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
    ],
    keywords: ["try catch finally", "exceptions", "throw", "DivideByZeroException"],
    explanation: `C# handles errors with **exceptions**, a fundamentally different model from languages that use an explicit \`(result, error)\` return convention. Instead of returning an error value the caller must remember to check, a C# method that encounters a problem **throws** an exception object: \`throw new DivideByZeroException("division by zero");\` -- this immediately stops normal execution and unwinds the call stack, looking for a matching \`catch\` block.

A **\`try\`** block wraps code that might throw; one or more **\`catch\`** blocks handle specific exception types that might come out of it: \`catch (DivideByZeroException ex) { ... }\` only catches that exception type (or one derived from it) -- an unmatched exception keeps propagating up the call stack, potentially crashing the program if nothing ever catches it. \`ex.Message\` gives you the human-readable string passed to the exception's constructor.

A **\`finally\`** block, if present, always runs after the try/catch, whether an exception was thrown and caught, thrown and not caught, or never thrown at all -- it's the right place for cleanup code (closing a file, releasing a resource) that must happen no matter what.

This is a genuine, worthwhile design tradeoff to understand: an explicit \`(result, error)\` return makes every failure point visible directly in the code, at the cost of some repetition; C#'s exceptions keep the "happy path" free of error-checking clutter, at the cost of failure points being less visible at a glance -- an exception can, in principle, come from almost any line. Neither approach is strictly better; they're different, deliberate tradeoffs.`,
    commonMistakes: [
      "Writing a `catch` block for a base exception type like the general `Exception` everywhere, hiding bugs that a more specific `catch (SpecificException ex)` would have surfaced clearly instead.",
      "Assuming code after a `finally` block's cleanup won't run if an exception is still propagating -- `finally` runs, but an uncaught exception still continues propagating afterward.",
      "Using exceptions for ordinary, expected outcomes (like a user typing invalid input) instead of reserving them for genuinely exceptional situations -- throwing/catching has real performance cost and can make normal control flow harder to follow.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What happens when a thrown exception has no matching `catch` block anywhere up the call stack?",
        choices: [
          "It's silently ignored",
          "The program can crash, since nothing handled it",
          "It automatically becomes a `finally` block",
          "C# converts it to a return value",
        ],
        correctIndex: 1,
        explanation: "An unhandled exception propagates until it can crash the program.",
      },
      {
        id: "q2",
        prompt: "When does a `finally` block run?",
        choices: [
          "Only if an exception was thrown and caught",
          "Only if no exception was thrown",
          "Always, regardless of whether an exception was thrown, caught, or never occurred",
          "Only if the try block completes successfully",
        ],
        correctIndex: 2,
        explanation:
          "`finally` always runs, independent of whether an exception occurred or was caught.",
      },
      {
        id: "q3",
        prompt:
          "What is the main tradeoff between an explicit `(result, error)` return convention and C#'s exceptions?",
        choices: [
          "Explicit returns make every failure point visible in the code at the cost of repetition; exceptions keep the happy path clean at the cost of less-visible failure points",
          "There is no real difference between the two approaches",
          "C# exceptions are always faster than an explicit error return",
          "An explicit error return has no way to represent failure at all",
        ],
        correctIndex: 0,
        explanation:
          "Explicit error returns trade repetition for visibility; exceptions trade a cleaner happy path for less-visible failure points.",
      },
    ],
    takeaway:
      "Catch the most specific exception type you can meaningfully handle, use `finally` for cleanup that must run no matter what, and remember exceptions trade explicit-but-repetitive error visibility for a cleaner happy path with less-visible failure points.",
    summary:
      "C# uses try/throw/catch/finally for error handling: catch blocks handle specific exception types, finally always runs for cleanup, and this is a genuine design tradeoff against an explicit (result, error) convention.",
    guidedOutputLab: {
      id: "csharp-lab-exceptions",
      title: "Fill in the blank: catching a thrown exception",
      language: "C#",
      mode: "fill-in-blank",
      prompt:
        "Fill in the missing keyword that introduces an exception handler, then predict the output.",
      steps: [
        {
          code: `using System;

int SafeDivide(int a, int b)
{
    if (b == 0)
    {
        throw new DivideByZeroException("division by zero");
    }
    return a / b;
}

try
{
    int result = SafeDivide(10, 0);
    Console.WriteLine($"Result: {result}");
}
____ (DivideByZeroException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
finally
{
    Console.WriteLine("Done.");
}`,
          expectedOutput: "Error: division by zero\nDone.",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "catch",
      hints: [
        "SafeDivide(10, 0) throws before ever returning, so the `Result:` line inside the try block never runs.",
        "`finally` always runs last, after the exception has been handled.",
      ],
    },
    nextLessonSlug: "csharp-dotnet-project-structure-and-cli",
  },
  {
    id: "csharp-dotnet-project-structure-and-cli",
    slug: "csharp-dotnet-project-structure-and-cli",
    title: ".NET Project Structure and the dotnet CLI",
    description: "The .csproj file, NuGet packages, and the everyday dotnet CLI commands.",
    trackSlug: "csharp",
    courseSlug: "csharp-dotnet-fundamentals",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Explain what a `.csproj` file declares for a project",
      "Describe what a NuGet package is and how a project references one",
      "Use `dotnet new`, `dotnet build`, `dotnet run`, and `dotnet test` appropriately",
    ],
    skills: ["dotnet-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: ".NET documentation", url: "https://learn.microsoft.com/en-us/dotnet/" }],
    keywords: ["csproj", "nuget", "dotnet cli", "dotnet build", "dotnet test"],
    explanation: `A .NET project is defined by a **\`.csproj\`** file -- an XML file naming the target framework (e.g. \`net8.0\`), the output type (an executable \`Exe\` or a reusable \`Library\`), and any package references. Modern SDK-style \`.csproj\` files are deliberately short: unlike some older project formats, they do **not** need to individually list every \`.cs\` source file -- any \`.cs\` file anywhere in the project's folder (and subfolders, by default) is automatically included in the build. This means adding a second source file alongside \`Program.cs\` (like a small helper class) just works, with nothing to edit in the \`.csproj\` itself.

A **NuGet package** is a versioned, shareable unit of .NET code that you add to a project as a \`<PackageReference>\` -- the \`.csproj\` records which packages and versions a project depends on, and the \`dotnet\` CLI restores them before building.

The everyday \`dotnet\` CLI commands: \`dotnet new console -o myapp\` scaffolds a new console project into a folder; \`dotnet build\` compiles the project without running it; \`dotnet run\` compiles (if needed) and immediately runs it; \`dotnet test\` runs a project's automated tests (typically written with a framework like xUnit or MSTest, referenced as NuGet packages in a separate test project).

A single \`.csproj\` can build together as many \`.cs\` files as you put in its folder tree -- a project's identity comes entirely from its one \`.csproj\` file, not from any declaration inside the \`.cs\` files themselves.`,
    commonMistakes: [
      "Expecting to manually list every `.cs` file inside the `.csproj`, like some older project formats required -- modern SDK-style projects include source files automatically.",
      "Confusing `dotnet build` (compiles only) with `dotnet run` (compiles, if needed, and immediately executes).",
      "Assuming a NuGet package reference is optional metadata -- without it correctly declared in the `.csproj`, `dotnet restore`/`dotnet build` can't resolve that dependency at all.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Do modern SDK-style `.csproj` files need to individually list every `.cs` source file?",
        choices: [
          "Yes, every file must be listed explicitly",
          "No, `.cs` files in the project folder are included automatically",
          "Only test files need to be listed",
          "Only if the project has more than one file",
        ],
        correctIndex: 1,
        explanation: "SDK-style projects auto-include .cs files in the project folder tree.",
      },
      {
        id: "q2",
        prompt:
          "What does `dotnet build` do that `dotnet run` also does, but `dotnet run` does one additional thing?",
        choices: [
          "dotnet build compiles the project; dotnet run compiles (if needed) and then executes it",
          "They are identical commands",
          "dotnet build runs tests; dotnet run does not",
          "dotnet run only checks syntax",
        ],
        correctIndex: 0,
        explanation: "dotnet run compiles (if needed) and then runs the project in one step.",
      },
      {
        id: "q3",
        prompt: "What is a NuGet package?",
        choices: [
          "A single .cs file",
          "A versioned, shareable unit of .NET code that a project references in its .csproj",
          "A compiled .csproj file",
          "A type of exception",
        ],
        correctIndex: 1,
        explanation:
          "A NuGet package is a versioned, shareable unit of .NET code referenced via .csproj.",
      },
    ],
    takeaway:
      "A `.csproj` names a project's target framework, output type, and package references -- modern SDK-style projects auto-include source files, so there's rarely anything to edit there when you just add another `.cs` file; `dotnet run` builds and executes in one step.",
    summary:
      ".csproj declares a project's framework, output type, and NuGet package references (with source files included automatically); the dotnet CLI's new/build/run/test commands scaffold, compile, execute, and test a project.",
    guidedOutputLab: {
      id: "csharp-lab-project-structure",
      title: "Predict: A two-file console project",
      language: "C#",
      mode: "predict",
      prompt:
        "This shows two .cs files from the same project (comments mark the file boundary) -- both are compiled together automatically since SDK-style projects include every .cs file in the folder. Predict what `dotnet run` prints.",
      steps: [
        {
          code: `// file: MathUtil.cs
public static class MathUtil
{
    public static int Add(int a, int b)
    {
        return a + b;
    }
}

// file: Program.cs
using System;

Console.WriteLine($"2 + 3 = {MathUtil.Add(2, 3)}");
Console.WriteLine("Run with: dotnet run");`,
          expectedOutput: "2 + 3 = 5\nRun with: dotnet run",
        },
      ],
      hints: [
        "MathUtil.cs never needs to be listed anywhere in the .csproj -- SDK-style projects include every .cs file in the folder automatically.",
        "MathUtil.Add(2, 3) computes 2 + 3 = 5.",
      ],
    },
  },
];
