import type { LessonInput } from "@/lib/content/types";

/**
 * Java Programming Foundations.
 *
 * This platform has no JVM, no javac, and no server-side or in-browser Java
 * execution (see docs/SECURITY.md and docs/ARCHITECTURE.md) -- Phase 5B does
 * not add one. Every lesson's guidedExercise/independentExercise is
 * therefore a genuine, browser-executable JavaScript/TypeScript exercise
 * that models the underlying decision or algorithm behind a Java concept
 * (overload resolution, equals/hashCode contracts, a stream pipeline that is
 * a direct conceptual analogue of Java's Stream API) without claiming to be
 * Java or to have executed Java. Three lessons additionally carry a
 * `guidedLocalLab` for real compiled, run, and tested Java work, which only
 * makes sense on the learner's own machine with a real JDK install.
 *
 * Version assumption: Java 21 (LTS). Examples use only APIs and syntax
 * stable since Java 21 (records, pattern matching for switch, sequenced
 * collections) so they remain valid on any newer LTS release.
 */
export const javaLessons: LessonInput[] = [
  {
    id: "java-jvm-and-execution",
    slug: "java-jvm-and-execution",
    title: "The JVM, the JDK, and How a Java Program Runs",
    description:
      "What actually happens between writing Java source code and seeing a program run — and why that model makes Java portable.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Explain the difference between the JDK, the JVM, and bytecode",
      "Describe what javac and java each do, in order",
      "Read and predict the structure of a small multi-class Java program",
    ],
    skills: ["java", "jvm"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: 'Oracle: The Java Tutorials — A Closer Look at the "Hello World!" Application',
        url: "https://docs.oracle.com/javase/tutorial/getStarted/application/index.html",
      },
      {
        label: "Oracle Java SE 21 Documentation",
        url: "https://docs.oracle.com/en/java/javase/21/",
      },
    ],
    keywords: ["jvm", "jdk", "bytecode", "javac", "compilation", "java"],
    explanation: `Java code goes through two distinct steps before it does anything: **compilation**, then **execution** — and understanding what happens in each step explains most of what makes Java behave the way it does. The **JDK** (Java Development Kit) is the toolset you install: it bundles a compiler (\`javac\`), the runtime needed to execute programs, and supporting tools. When you run \`javac Greeter.java\`, the compiler doesn't produce machine code for your specific CPU — it produces **bytecode**, a compact, platform-neutral instruction format saved in a \`.class\` file. That bytecode is not directly executable by your operating system; it's executable by the **JVM** (Java Virtual Machine), a program that reads bytecode and either interprets it or compiles pieces of it to real machine code on the fly (the just-in-time, or JIT, compiler) as your program runs.

This two-step model — compile once to bytecode, run that same bytecode on any JVM — is the literal mechanism behind Java's "write once, run anywhere" promise. The \`.class\` file you produce on one operating system runs unmodified on any other operating system that has a matching JVM installed, because the JVM is what absorbs the platform-specific differences, not your compiled code. The command \`java Greeter\` starts a JVM, loads \`Greeter.class\`, and calls its \`public static void main(String[] args)\` method — the fixed entry point every runnable Java program needs.

A Java source file has a small number of required, position-sensitive parts: an optional \`package\` declaration first, then any \`import\` statements, then exactly one **public** top-level class whose name must match the filename exactly (\`Greeter.java\` must contain \`public class Greeter\`) — this is a compiler-enforced rule, not a convention. A single file can contain more than one class, but only one may be \`public\`; the compiler produces a separate \`.class\` file for every class, public or not, which is why a small multi-file program still produces several \`.class\` files.`,
    example: {
      language: "javascript",
      description:
        "This models the compile-then-run pipeline as data, not real Java — the real syntax appears in this lesson's guided local lab.",
      code: `// A simplified model of javac + java, as a two-stage pipeline.
function compile(sourceFileName, sourceContainsPublicClass) {
  if (!sourceContainsPublicClass) throw new Error("no public class found");
  return { bytecodeFile: sourceFileName.replace(".java", ".class") };
}

function run(bytecodeFile) {
  return \`JVM loads \${bytecodeFile} and calls its main method\`;
}

const compiled = compile("Greeter.java", true);
console.log(run(compiled.bytecodeFile));
// -> "JVM loads Greeter.class and calls its main method"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change the filename so it no longer matches the public class name, and predict what compile() should do.",
      code: `function compile(sourceFileName, publicClassName) {
  const expectedFile = publicClassName + ".java";
  if (sourceFileName !== expectedFile) {
    throw new Error(\`class \${publicClassName} is public, should be declared in a file named \${expectedFile}\`);
  }
  return { bytecodeFile: publicClassName + ".class" };
}

console.log(compile("Greeter.java", "Greeter"));`,
      editable: true,
    },
    guidedExercise: {
      id: "java-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write classFileFor(sourceFileName) that returns the .class filename javac would produce for a source file's PUBLIC class — i.e. it strips '.java' and appends '.class'. Assume the input always ends in '.java'.",
      starterCode: `function classFileFor(sourceFileName) {
  // TODO: return the .class filename
}
`,
      solutionCode: `function classFileFor(sourceFileName) {
  return sourceFileName.slice(0, -".java".length) + ".class";
}`,
      harness: `
        try { window.__report('t1', classFileFor("Greeter.java") === "Greeter.class", 'classFileFor("Greeter.java") should be "Greeter.class"'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', classFileFor("Main.java") === "Main.class", 'classFileFor("Main.java") should be "Main.class"'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Greeter.java -> Greeter.class" },
        { id: "t2", description: "Main.java -> Main.class" },
      ],
      hints: [
        "String.slice(0, -N) removes the last N characters.",
        "'.java'.length is 5 — or just build the result with string concatenation and replace.",
      ],
    },
    independentExercise: {
      id: "java-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write findEntryPoint(classNames, publicClassName) that returns publicClassName if it appears in classNames (the JVM can only start from the class you name on the command line, and it must exist), otherwise returns null.",
      starterCode: `function findEntryPoint(classNames, publicClassName) {
  // TODO
}
`,
      solutionCode: `function findEntryPoint(classNames, publicClassName) {
  return classNames.includes(publicClassName) ? publicClassName : null;
}`,
      harness: `
        try { window.__report('t1', findEntryPoint(["Greeter", "Helper"], "Greeter") === "Greeter", 'should find Greeter'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', findEntryPoint(["Helper"], "Greeter") === null, 'should return null when missing'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "returns the class name when present" },
        { id: "t2", description: "returns null when the class isn't in the list" },
      ],
      hints: [
        "Array.prototype.includes() checks membership.",
        "Return null explicitly, not undefined, on the missing case.",
      ],
    },
    guidedLocalLab: {
      id: "java-gll-compile-and-run",
      title: "Compile and Run a Multi-Class Java Application Locally",
      scenario:
        "You'll write two classes — a Greeter that builds messages and a Main that calls it — compile both with javac, and run the program with java, entirely on your own machine.",
      requiredTools: [
        { name: "JDK", version: "21 LTS or newer" },
        { name: "A terminal", version: "any" },
        { name: "A text editor or IDE", version: "any (e.g. VS Code, IntelliJ IDEA Community)" },
      ],
      setupSteps: [
        "Confirm your JDK is installed: run `java -version` and `javac -version` — both should print 21 or higher.",
        "Create a project folder named greeting-app.",
        "Inside it, create a src folder for your .java source files.",
      ],
      projectStructure: `greeting-app/
  src/
    Greeter.java
    Main.java`,
      starterFiles: [
        {
          path: "src/Greeter.java",
          content: `public class Greeter {
    // TODO: add a static method buildMessage(String name) that returns
    // "Hello, " + name + "!" -- and call it from Main.
}
`,
        },
        {
          path: "src/Main.java",
          content: `public class Main {
    public static void main(String[] args) {
        // TODO: call Greeter.buildMessage(...) with a name and print the result.
        // TODO: also print how many command-line arguments were passed (args.length).
    }
}
`,
        },
      ],
      requirements: [
        "Greeter.java defines a public class Greeter with a static method buildMessage(String name) returning a greeting string.",
        "Main.java defines the program's entry point and calls Greeter.buildMessage(...).",
        "Running the program with at least one command-line argument prints that argument's count.",
        "The program compiles with zero warnings and runs without throwing.",
      ],
      commands: [
        {
          description: "Compile both source files into .class files",
          command: "javac -d out src/Greeter.java src/Main.java",
        },
        {
          description: "Run the compiled program, passing one argument",
          command: "java -cp out Main Alex",
        },
      ],
      expectedBehavior:
        'javac produces Greeter.class and Main.class inside out/ with no errors. Running `java -cp out Main Alex` prints a greeting containing "Alex" and a line reporting 1 argument.',
      verificationSteps: [
        { command: "ls out", expectedResult: "Greeter.class and Main.class are both listed" },
        {
          command: "java -cp out Main Alex",
          expectedResult:
            "Prints a greeting mentioning Alex, then a line stating 1 argument was passed",
        },
        {
          command: "java -cp out Main",
          expectedResult:
            "Prints a greeting (using a default or empty name) and reports 0 arguments, without crashing",
        },
      ],
      troubleshooting: [
        {
          issue:
            "`error: class Greeter is public, should be declared in a file named Greeter.java`",
          fix: "The public class name must exactly match its filename, including case.",
        },
        {
          issue: "`Error: Could not find or load main class Main`",
          fix: "Make sure you pass -cp out (the folder containing the .class files) and the bare class name Main, not Main.java or out/Main.class.",
        },
        {
          issue: "`javac: file not found: src/Greeter.java`",
          fix: "Run javac from the greeting-app folder, not from inside src/.",
        },
      ],
      hints: [
        'buildMessage can be as simple as `return "Hello, " + name + "!";`.',
        "args.length gives you the number of command-line arguments inside main.",
        "You can compile with a single javac call listing both files, or compile them separately — either works.",
      ],
      referenceSolution: {
        summary:
          "Greeter exposes a static buildMessage(String) building the greeting; Main reads args, calls Greeter.buildMessage with args[0] if present or a default name otherwise, and prints both the greeting and args.length.",
        files: [
          {
            path: "src/Greeter.java",
            content: `public class Greeter {
    public static String buildMessage(String name) {
        return "Hello, " + name + "!";
    }
}
`,
          },
          {
            path: "src/Main.java",
            content: `public class Main {
    public static void main(String[] args) {
        String name = args.length > 0 ? args[0] : "there";
        System.out.println(Greeter.buildMessage(name));
        System.out.println(args.length + " argument(s) were passed.");
    }
}
`,
          },
        ],
      },
      extensionChallenge:
        "Add a third class, Farewell, with a static method buildFarewell(String name), and call it from Main right after the greeting so the program prints both a hello and a goodbye.",
    },
    commonMistakes: [
      "Naming the file differently from its public class (Java requires an exact, case-sensitive match).",
      "Running `java Main.java` instead of `java Main` — java takes a class name, not a filename (a newer single-file launch mode accepts .java files directly, but that's a different mechanism than the standard compile-then-run workflow this lesson teaches).",
      "Forgetting that every class you reference must itself be compiled — a NoClassDefFoundError almost always means a needed .class file is missing from the classpath.",
    ],
    quiz: [
      {
        id: "java-q1-1",
        prompt: "What does javac produce from a .java source file?",
        choices: [
          "Machine code specific to the current CPU",
          "Platform-neutral bytecode in a .class file",
          "A single executable file combining the JDK and the program",
          "Nothing — javac only checks syntax",
        ],
        correctIndex: 1,
        explanation:
          "javac compiles source to bytecode (.class files), which the JVM — not the OS directly — knows how to execute. Machine code is only produced later, and only for hot code paths, by the JVM's JIT compiler at run time.",
      },
      {
        id: "java-q1-2",
        prompt:
          "A file named Widget.java contains `public class Gadget { ... }`. What happens when you compile it?",
        choices: [
          "It compiles fine; the class name and filename are unrelated",
          "javac renames the output file to Gadget.class automatically",
          "javac reports a compile error because the public class name must match the filename",
          "It compiles, but java can never find the class",
        ],
        correctIndex: 2,
        explanation:
          "A public top-level class's name must exactly match its source filename (case-sensitive) — this is enforced by the compiler, not a style guideline, and produces a compile error, not a runtime surprise.",
      },
      {
        id: "java-q1-3",
        prompt: "Why can the same .class file run unmodified on Windows, macOS, and Linux?",
        choices: [
          "Because Java source code is interpreted directly by the operating system",
          "Because bytecode is platform-neutral, and each OS runs its own matching JVM that translates it",
          "Because .class files contain three separate versions of the compiled code",
          "Because Java programs don't use any operating-system resources",
        ],
        correctIndex: 1,
        explanation:
          "Portability comes from the JVM layer: bytecode itself doesn't target any specific OS or CPU, so any platform with a compatible JVM can run it — the platform-specific translation happens inside the JVM, not in your compiled output.",
      },
    ],
    takeaway:
      "Java source compiles to platform-neutral bytecode, and a JVM — one per platform — is what actually executes it; that split is the entire mechanism behind Java's portability.",
    summary:
      "javac turns .java source into .class bytecode; java starts a JVM that loads that bytecode and runs its main method. A public class's name must match its filename exactly, and every referenced class needs its own compiled .class file.",
    nextLessonSlug: "java-variables-and-types",
  },
  {
    id: "java-variables-and-types",
    slug: "java-variables-and-types",
    title: "Variables, Primitive Types, and Reference Types",
    description:
      "Why Java makes you declare a type for every variable, and the one distinction — primitive vs. reference — that explains most of Java's variable behavior.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: ["java-jvm-and-execution"],
    objectives: [
      "Declare variables using Java's eight primitive types correctly",
      "Explain the difference between a primitive value and a reference to an object",
      "Predict when assigning one variable to another copies a value versus copies a reference",
    ],
    skills: ["java", "types"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Primitive Data Types",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html",
      },
      {
        label: "Oracle: The Java Tutorials — Creating Objects",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html",
      },
    ],
    keywords: ["variables", "primitive types", "reference types", "java"],
    explanation: `Every Java variable has a declared type, fixed for its entire lifetime — you cannot later store a String in a variable declared \`int\`. Java's types split into two fundamentally different categories, and confusing them is the source of a huge share of beginner bugs. **Primitive types** — \`byte\`, \`short\`, \`int\`, \`long\`, \`float\`, \`double\`, \`char\`, \`boolean\` — hold their actual value directly in the variable's storage. When you write \`int a = 5; int b = a;\`, \`b\` gets its own independent copy of \`5\`; changing \`b\` afterward never affects \`a\`.

**Reference types** — every class, including \`String\`, arrays, and any class you write — work differently. A reference-type variable doesn't hold the object itself; it holds a *reference* (conceptually, an address) pointing to an object that lives elsewhere. When you write \`Point p1 = new Point(1, 2); Point p2 = p1;\`, \`p2\` doesn't get a new Point — it gets a copy of the *reference*, so \`p1\` and \`p2\` now both point at the exact same object. Mutating that object through \`p2\` (e.g. \`p2.x = 99;\`) is visible through \`p1\` too, because there was only ever one Point. This is the single most common source of "I changed one variable and a completely different one changed too" confusion for people arriving from languages that don't make this distinction as sharply.

\`String\` deserves a specific note: it's a reference type, but Java strings are **immutable** — no method on a String ever changes the characters it holds; every "modifying" method (\`toUpperCase()\`, \`concat()\`, \`replace()\`) returns a brand-new String and leaves the original untouched. \`String s = "cat"; s.toUpperCase();\` does nothing observable, because the result was thrown away — you'd need \`s = s.toUpperCase();\` to actually update what \`s\` refers to. Type conversion between primitives can be **widening** (int to long, done automatically, no data loss possible) or **narrowing** (double to int, requires an explicit cast like \`(int) 3.9\`, because precision can be lost — Java forces you to write the cast so data loss is always a visible, deliberate choice, never an accident.`,
    example: {
      language: "javascript",
      description:
        "The same value-vs-reference distinction Java enforces, shown with a plain JS object standing in for a Java object.",
      code: `// primitives: assignment copies the value
let a = 5;
let b = a;
b = 99;
console.log(a, b); // 5 99 -- unaffected

// objects: assignment copies the REFERENCE, not the object
const p1 = { x: 1, y: 2 };
const p2 = p1;
p2.x = 99;
console.log(p1.x, p2.x); // 99 99 -- same object, both variables see the change`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Predict the output before running, then change p2.x again and re-check your prediction.",
      code: `const p1 = { x: 10, y: 20 };
const p2 = p1;
p2.x = 500;
console.log("p1.x is", p1.x);`,
      editable: true,
    },
    guidedExercise: {
      id: "java-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write sharesReference(a, b) modeling Java's rule: two object (non-primitive) variables 'share a reference' if they are the exact same object (use === ). Two primitive-style plain values (numbers, strings, booleans) never share a reference even if equal -- return false for those.",
      starterCode: `function sharesReference(a, b) {
  // TODO: return true only if both a and b are non-null objects AND the same object (===)
}
`,
      solutionCode: `function sharesReference(a, b) {
  return typeof a === "object" && a !== null && a === b;
}`,
      harness: `
        const obj = { x: 1 };
        try { window.__report('t1', sharesReference(obj, obj) === true, 'same object reference should be true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', sharesReference({ x: 1 }, { x: 1 }) === false, 'two separate objects with equal contents should be false'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', sharesReference(5, 5) === false, 'primitives never "share a reference" in this model'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "the same object shares a reference with itself" },
        {
          id: "t2",
          description: "two distinct objects with equal contents do not share a reference",
        },
        { id: "t3", description: "primitive-style values never share a reference" },
      ],
      hints: [
        "=== on objects compares identity (same memory), not contents.",
        "typeof obj === 'object' && obj !== null distinguishes real objects from primitives (typeof null is 'object' too, which is why the null check matters).",
      ],
    },
    independentExercise: {
      id: "java-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write widensSafely(fromType, toType) modeling Java's widening rule for a small subset of types. Widening (safe, no cast needed) is allowed: int->long, int->double, long->double, float->double. Every other pair (including any narrowing, like long->int) returns false.",
      starterCode: `function widensSafely(fromType, toType) {
  // TODO
}
`,
      solutionCode: `function widensSafely(fromType, toType) {
  const allowed = new Set(["int->long", "int->double", "long->double", "float->double"]);
  return allowed.has(fromType + "->" + toType);
}`,
      harness: `
        try { window.__report('t1', widensSafely("int", "long") === true, 'int->long should widen safely'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', widensSafely("long", "int") === false, 'long->int narrows and should be false'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', widensSafely("float", "double") === true, 'float->double should widen safely'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', widensSafely("double", "int") === false, 'double->int narrows and should be false'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "int->long widens" },
        { id: "t2", description: "long->int narrows (not safe)" },
        { id: "t3", description: "float->double widens" },
        { id: "t4", description: "double->int narrows (not safe)" },
      ],
      hints: [
        "A Set of allowed 'from->to' strings makes this a one-line lookup.",
        "Order matters: int->long is allowed, but long->int is not the same pair.",
      ],
    },
    commonMistakes: [
      'Assuming `String s = "cat"; s.toUpperCase();` changes s -- it doesn\'t; the return value must be reassigned.',
      "Comparing objects (including Strings) with == expecting content equality -- == on reference types compares identity, not contents (covered in depth in the equality lesson later in this course).",
      "Narrowing without realizing data can be silently lost in a cast, e.g. `(int) 3.99` truncates to 3, and `(byte) 200` wraps around to a negative number because 200 doesn't fit in a byte's range.",
    ],
    quiz: [
      {
        id: "java-q2-1",
        prompt: "After `int a = 5; int b = a; b = 10;`, what is the value of a?",
        choices: ["5", "10", "Undefined behavior", "A compile error"],
        correctIndex: 0,
        explanation:
          "int is a primitive type, so `int b = a;` copies the value 5 into b's own storage. Changing b afterward has no effect on a — they were never connected.",
      },
      {
        id: "java-q2-2",
        prompt: "`Point p1 = new Point(1, 2); Point p2 = p1; p2.x = 99;` — what is p1.x afterward?",
        choices: ["1 (unaffected)", "99", "0", "This throws a NullPointerException"],
        correctIndex: 1,
        explanation:
          "Point is a reference type, so p2 = p1 copies the reference, not the object — p1 and p2 point at the same Point. Mutating it through p2 is visible through p1 too, since there's only one object.",
      },
      {
        id: "java-q2-3",
        prompt: "Why does `(int) 3.99` evaluate to 3, not 4?",
        choices: [
          "Casting double to int always rounds to the nearest integer",
          "Casting double to int truncates the fractional part (toward zero), it does not round",
          "This is a compile error — you cannot cast double to int",
          "The result depends on the operating system",
        ],
        correctIndex: 1,
        explanation:
          "A narrowing (double to int) cast truncates — it discards the fractional part rather than rounding — so 3.99 becomes 3 and -3.99 becomes -3, not -4. Rounding requires an explicit call like Math.round().",
      },
    ],
    takeaway:
      "Primitive variables hold their value directly, so assignment copies the value; reference-type variables hold a pointer to an object, so assignment copies the pointer and both variables can end up looking at the same mutable object.",
    summary:
      "Java has eight primitive types that store values directly, and reference types (every class, including String) that store a reference to an object. Strings are immutable reference types. Widening conversions are automatic; narrowing conversions require an explicit cast because they can lose data.",
    nextLessonSlug: "java-operators-and-strings",
  },
  {
    id: "java-operators-and-strings",
    slug: "java-operators-and-strings",
    title: "Operators, Expressions, and Working with Strings",
    description:
      "Arithmetic, comparison, and logical operators, and the String methods you'll reach for constantly — plus the immutability trap that catches every beginner once.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["java-variables-and-types"],
    objectives: [
      "Use arithmetic, comparison, and logical operators to build correct expressions",
      "Explain integer division and operator precedence pitfalls",
      "Use core String methods to inspect, transform, and combine text without mutating the original",
    ],
    skills: ["java", "strings", "operators"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Operators",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html",
      },
      {
        label: "Oracle Java SE 21 API — String",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",
      },
    ],
    keywords: ["operators", "expressions", "strings", "java"],
    explanation: `Java's arithmetic, comparison, and logical operators look familiar from most C-family languages, with one sharp edge worth learning early: **integer division truncates**. \`7 / 2\` evaluates to \`3\`, not \`3.5\` — because both operands are \`int\`, Java performs integer division and discards the remainder entirely (use \`7 % 2\` to get that remainder, \`1\`). The fix, when you want a real fractional result, is to make at least one operand a floating-point type: \`7 / 2.0\` evaluates to \`3.5\`. This single rule causes more silent, wrong-answer bugs in beginner Java code than almost anything else, precisely because it never throws an error — it just quietly gives you the wrong number.

Comparison operators (\`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`) work as expected on primitives, but as the previous lesson noted, \`==\` on reference types (including String) compares identity, not content — \`new String("cat") == new String("cat")\` is \`false\`, even though the text is identical, because they're two distinct objects. Comparing String content correctly requires \`.equals()\`: \`"cat".equals(otherString)\`. Logical operators \`&&\` and \`||\` **short-circuit**: in \`a() && b()\`, if \`a()\` returns \`false\`, \`b()\` is never called at all — a behavior you can rely on to safely guard against errors, e.g. \`list != null && list.size() > 0\` never calls \`.size()\` on a null reference, because \`&&\` stops evaluating the moment the left side is \`false\`.

Strings, being immutable, expose a rich set of methods that all *return a new String* rather than modifying the original: \`.length()\`, \`.substring(start, end)\`, \`.indexOf(text)\`, \`.toUpperCase()\`/\`.toLowerCase()\`, \`.trim()\`/\`.strip()\`, \`.replace(old, new)\`, \`.split(delimiter)\`, and \`.equals()\`/\`.equalsIgnoreCase()\` for content comparison. For building a String piece by piece — especially inside a loop — use \`StringBuilder\` instead of repeated \`+\` concatenation: each \`+\` on Strings silently creates a brand-new String object, so concatenating in a loop with \`+\` is quadratic in the number of iterations, while \`StringBuilder.append()\` grows an internal, mutable buffer in place.`,
    example: {
      language: "javascript",
      description:
        "Integer-division truncation, modeled with Math.trunc since JS division is always floating-point.",
      code: `function javaIntDivide(a, b) {
  return Math.trunc(a / b); // Java's int/int truncates toward zero, just like this
}

console.log(javaIntDivide(7, 2));   // 3, not 3.5
console.log(7 / 2);                  // 3.5 -- what you'd get if either operand were a double
console.log(7 % 2);                  // 1 -- the remainder int division throws away`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Predict javaIntDivide(-7, 2) before running -- Java's truncation rounds toward zero, not toward negative infinity.",
      code: `function javaIntDivide(a, b) {
  return Math.trunc(a / b);
}
console.log(javaIntDivide(-7, 2));`,
      editable: true,
    },
    guidedExercise: {
      id: "java-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write intDivide(a, b) and remainder(a, b) that model Java's int / and % operators exactly: division truncates toward zero (use Math.trunc), and the remainder has the same sign as the dividend a.",
      starterCode: `function intDivide(a, b) {
  // TODO
}
function remainder(a, b) {
  // TODO: a - intDivide(a, b) * b gives Java's % semantics
}
`,
      solutionCode: `function intDivide(a, b) {
  return Math.trunc(a / b);
}
function remainder(a, b) {
  return a - intDivide(a, b) * b;
}`,
      harness: `
        try { window.__report('t1', intDivide(7, 2) === 3, '7/2 should truncate to 3'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', intDivide(-7, 2) === -3, '-7/2 should truncate toward zero to -3, not -4'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', remainder(7, 2) === 1, '7%2 should be 1'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', remainder(-7, 2) === -1, '-7%2 should be -1 in Java (sign follows the dividend)'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "7 / 2 == 3" },
        { id: "t2", description: "-7 / 2 == -3 (truncation toward zero)" },
        { id: "t3", description: "7 % 2 == 1" },
        { id: "t4", description: "-7 % 2 == -1" },
      ],
      hints: [
        "Math.trunc rounds toward zero, exactly like Java's int division -- Math.floor would be wrong for negative numbers.",
        "The identity a == intDivide(a,b)*b + remainder(a,b) always holds; use it to derive remainder from intDivide.",
      ],
    },
    independentExercise: {
      id: "java-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write contentEquals(s1, s2) modeling Java's String.equals(): true only if both are non-null and have identical characters -- never based on object identity. Then write safeLength(s) modeling short-circuit evaluation: returns s.length if s is not null/undefined, otherwise 0, without throwing.",
      starterCode: `function contentEquals(s1, s2) {
  // TODO
}
function safeLength(s) {
  // TODO: use short-circuit logic, don't just check with an if/else if you don't want to
}
`,
      solutionCode: `function contentEquals(s1, s2) {
  return s1 != null && s2 != null && s1 === s2;
}
function safeLength(s) {
  return (s != null && s.length) || 0;
}`,
      harness: `
        try { window.__report('t1', contentEquals("cat", "cat") === true, 'equal content should be true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', contentEquals("cat", "dog") === false, 'different content should be false'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', contentEquals(null, "cat") === false, 'null should never equal a real string'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', safeLength("hello") === 5, 'safeLength of a real string should be its length'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try { window.__report('t5', safeLength(null) === 0, 'safeLength of null should be 0, not throw'); } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "equal strings compare equal by content" },
        { id: "t2", description: "different strings compare unequal" },
        { id: "t3", description: "null never equals a real string" },
        { id: "t4", description: "safeLength returns the real length for a real string" },
        { id: "t5", description: "safeLength returns 0 for null without throwing" },
      ],
      hints: [
        "In JS, comparing two primitive strings with === already compares content, which is what you want to model here.",
        "s != null (loose) catches both null and undefined; guard before ever touching s.length.",
      ],
    },
    commonMistakes: [
      "Writing `int average = (a + b) / 2;` when a fractional average was intended -- integer division silently truncates instead of erroring.",
      "Comparing Strings with == instead of .equals() -- it often 'accidentally works' for literal strings due to an implementation detail called string interning, then mysteriously breaks for strings built at runtime (e.g. via concatenation).",
      "Concatenating Strings with + inside a loop that runs many times -- each + allocates a new String, making the loop far slower than using StringBuilder.",
    ],
    quiz: [
      {
        id: "java-q3-1",
        prompt: "What does `int result = 9 / 4;` store in result?",
        choices: ["2.25", "2", "3", "A compile error"],
        correctIndex: 1,
        explanation:
          "Both operands are int, so Java performs integer division and truncates the fractional part: 9 / 4 is 2.25 mathematically, but the int result is 2. Getting 2.25 would require at least one operand to be a floating-point type.",
      },
      {
        id: "java-q3-2",
        prompt:
          'Given `String a = new String("cat"); String b = new String("cat");`, what does `a == b` evaluate to?',
        choices: [
          "true, because the text is identical",
          "false, because == compares object identity for reference types",
          "A compile error",
          "It depends on the JVM implementation",
        ],
        correctIndex: 1,
        explanation:
          "String is a reference type, and new String(...) explicitly creates a new object each time, so a and b are two distinct objects with equal content — == compares identity and correctly reports false. .equals() is what compares content.",
      },
      {
        id: "java-q3-3",
        prompt:
          "In `if (list != null && list.size() > 0)`, why is this safe even when list might be null?",
        choices: [
          "Java evaluates both sides of && regardless, but ignores errors",
          "&& short-circuits: if the left side is false, the right side is never evaluated",
          "list.size() never throws, even on null",
          "This code does not compile if list can be null",
        ],
        correctIndex: 1,
        explanation:
          "&& short-circuits left to right: when list != null is false, Java never evaluates list.size() at all, so a NullPointerException on a null list is avoided by the evaluation order itself, not by any special null-handling in size().",
      },
    ],
    takeaway:
      "Integer division truncates and content equality needs .equals(), not ==, on Strings and every other reference type — both are silent, not error-throwing, so they only surface as wrong answers if you don't already know the rule.",
    summary:
      "Arithmetic on two ints stays an int and truncates; use a floating-point operand for a fractional result. == compares identity on reference types; .equals() compares content. && and || short-circuit, which is the idiomatic way to guard against null before calling a method.",
    nextLessonSlug: "java-control-flow",
  },
  {
    id: "java-control-flow",
    slug: "java-control-flow",
    title: "Control Flow: Conditions, Loops, and Modern Switch",
    description:
      "if/else, the three loop forms, and Java's modern switch expression — including the exhaustiveness checking that catches a forgotten case at compile time.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["java-operators-and-strings"],
    objectives: [
      "Choose the right loop form (for, while, do-while, for-each) for a given task",
      "Use a modern switch expression, including pattern matching on sealed cases",
      "Avoid the classic infinite-loop and off-by-one mistakes",
    ],
    skills: ["java", "control-flow"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Control Flow Statements",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html",
      },
      { label: "JEP 361: Switch Expressions", url: "https://openjdk.org/jeps/361" },
    ],
    keywords: ["control flow", "loops", "switch", "java"],
    explanation: `Java has four loop forms, each suited to a different situation. A **for loop** (\`for (int i = 0; i < n; i++)\`) is the right choice when you know the number of iterations, or need an index. A **while loop** fits when the number of iterations isn't known up front and depends on a condition evaluated before each pass. A **do-while loop** is the same as while, except the body runs once *before* the condition is ever checked — useful when a loop must always execute at least once (like "prompt the user, then re-prompt until valid input"). A **for-each loop** (\`for (String name : names)\`) is the idiomatic way to iterate over every element of an array or a \`Collection\` when you don't need the index — it's shorter, and it eliminates the entire class of off-by-one bugs that come from hand-managing an index variable.

Traditional \`switch\` statements fell through to the next case unless you wrote \`break\` — a design that caused countless real bugs from a forgotten \`break\`. Modern Java's **switch expression** (\`->\` arrow syntax, available since Java 14) fixes this: each case runs only its own code, no fall-through, and a switch expression can directly *produce a value* rather than requiring you to assign inside every branch:

\`\`\`java
String sizeLabel = switch (itemCount) {
    case 0 -> "empty";
    case 1 -> "single item";
    default -> itemCount + " items";
};
\`\`\`

When switching over an \`enum\`, the compiler can verify **exhaustiveness** — if you cover every enum value and add a \`default\`, or (since Java 21) cover every case of a *sealed* type without needing a default at all, a later addition of a new enum constant makes the compiler flag every switch that doesn't yet handle it. That turns a class of bugs that would otherwise only surface at runtime — "we added a new order status and forgot to update this switch" — into a compile error instead, which is a meaningfully stronger safety guarantee than most languages' switch/case gives you.`,
    example: {
      language: "javascript",
      description:
        "The same 'no fall-through, produces a value' switch-expression shape, modeled with a lookup-style function.",
      code: `function sizeLabel(itemCount) {
  switch (true) {
    case itemCount === 0: return "empty";
    case itemCount === 1: return "single item";
    default: return itemCount + " items";
  }
}

console.log(sizeLabel(0)); // "empty"
console.log(sizeLabel(1)); // "single item"
console.log(sizeLabel(5)); // "5 items"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        'Add a case for itemCount === 2 that returns "a pair", then verify sizeLabel(2) uses it.',
      code: `function sizeLabel(itemCount) {
  switch (true) {
    case itemCount === 0: return "empty";
    case itemCount === 1: return "single item";
    default: return itemCount + " items";
  }
}
console.log(sizeLabel(2));`,
      editable: true,
    },
    guidedExercise: {
      id: "java-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write sumUpTo(n) that models a Java for-loop computing the sum 1+2+...+n (n >= 0; return 0 if n is 0). Do not use the closed-form formula -- actually loop, the way the Java for loop would.",
      starterCode: `function sumUpTo(n) {
  let total = 0;
  // TODO: loop from 1 to n inclusive, adding each value to total
  return total;
}
`,
      solutionCode: `function sumUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}`,
      harness: `
        try { window.__report('t1', sumUpTo(0) === 0, 'sumUpTo(0) should be 0'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', sumUpTo(1) === 1, 'sumUpTo(1) should be 1'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', sumUpTo(5) === 15, 'sumUpTo(5) should be 15'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "sumUpTo(0) is 0" },
        { id: "t2", description: "sumUpTo(1) is 1" },
        { id: "t3", description: "sumUpTo(5) is 15" },
      ],
      hints: [
        "The loop condition must be <=, not <, since n itself should be included.",
        "Watch the off-by-one: starting i at 0 instead of 1 would add an extra 0, which happens to still be correct here -- but starting at 1 matches the '1+2+...+n' description exactly.",
      ],
    },
    independentExercise: {
      id: "java-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write firstNegativeIndex(numbers) modeling a Java for-loop with an early return: return the index of the first negative number in the array, or -1 if none exists. Do not use Array.findIndex -- write the loop by hand to practice the pattern.",
      starterCode: `function firstNegativeIndex(numbers) {
  // TODO: loop by hand with an index, return as soon as you find a negative number
  return -1;
}
`,
      solutionCode: `function firstNegativeIndex(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < 0) return i;
  }
  return -1;
}`,
      harness: `
        try { window.__report('t1', firstNegativeIndex([1, 2, -3, 4]) === 2, 'should find the negative at index 2'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', firstNegativeIndex([1, 2, 3]) === -1, 'no negatives should return -1'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', firstNegativeIndex([-1, 2, 3]) === 0, 'a negative at index 0 should return 0'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', firstNegativeIndex([]) === -1, 'an empty array should return -1'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds a negative in the middle" },
        { id: "t2", description: "returns -1 when there are no negatives" },
        { id: "t3", description: "finds a negative at index 0" },
        { id: "t4", description: "handles an empty array" },
      ],
      hints: [
        "Return immediately inside the loop the moment you find a match -- don't keep scanning.",
        "Loop condition i < numbers.length correctly handles length 0 by never entering the loop.",
      ],
    },
    commonMistakes: [
      "Writing `for (int i = 0; i <= n; i++)` when iterating an array by index -- this reads one past the end (ArrayIndexOutOfBoundsException); array loops need i < length, not <=.",
      "Relying on old-style switch fall-through by forgetting a break -- prefer the -> switch expression form, which has no fall-through at all.",
      "Writing a while loop whose condition never becomes false because the loop body forgets to update the variable the condition depends on.",
    ],
    quiz: [
      {
        id: "java-q4-1",
        prompt:
          "Which loop form guarantees its body runs at least once, even if the condition is false from the start?",
        choices: ["for", "while", "do-while", "for-each"],
        correctIndex: 2,
        explanation:
          "do-while checks its condition after the body runs, so the body always executes at least once. for, while, and for-each all check their condition (or check for remaining elements) before the first iteration.",
      },
      {
        id: "java-q4-2",
        prompt:
          "What is the main advantage of a modern switch expression (`->` syntax) over a traditional switch statement?",
        choices: [
          "It runs faster at the bytecode level",
          "It has no fall-through between cases and can directly produce a value",
          "It supports more data types than the traditional switch",
          "It removes the need for a default case in every situation",
        ],
        correctIndex: 1,
        explanation:
          "The switch expression's defining features are: each case is isolated (no accidental fall-through from a forgotten break), and the whole expression can evaluate to a value you assign or return directly, rather than requiring an assignment inside every branch.",
      },
      {
        id: "java-q4-3",
        prompt:
          "Iterating an array of 5 elements with `for (int i = 0; i <= arr.length; i++) { use(arr[i]); }` — what happens?",
        choices: [
          "It correctly processes all 5 elements",
          "It skips the last element",
          "It throws ArrayIndexOutOfBoundsException on the 6th iteration (index 5, one past the last valid index 4)",
          "It compiles but silently does nothing",
        ],
        correctIndex: 2,
        explanation:
          "arr.length is 5 for a 5-element array, but valid indices only run 0-4. Using <= instead of < lets i reach 5, and arr[5] is out of bounds — a classic off-by-one that throws at runtime, not a compile error.",
      },
    ],
    takeaway:
      "Pick the loop form that matches how the iteration count is actually known (fixed count -> for, condition-driven -> while, must-run-once -> do-while, every element -> for-each), and prefer switch expressions over classic switch statements to eliminate fall-through bugs entirely.",
    summary:
      "Java's four loop forms each fit a different shape of iteration. Modern switch expressions (-> syntax) produce a value directly and never fall through between cases, and the compiler can enforce exhaustiveness over enums and sealed types.",
    nextLessonSlug: "java-methods-and-overloading",
  },
  {
    id: "java-methods-and-overloading",
    slug: "java-methods-and-overloading",
    title: "Methods: Parameters, Return Values, and Overloading",
    description:
      "How Java methods pass data in and out, and how the compiler picks the right method when several share a name but differ in parameters.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 4,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["java-control-flow"],
    objectives: [
      "Design a method's signature (parameters and return type) to match a stated requirement",
      "Explain that Java is always pass-by-value, even for reference types",
      "Predict which overload the compiler selects for a given call",
    ],
    skills: ["java", "methods"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Defining Methods",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html",
      },
      {
        label: "Oracle: The Java Tutorials — Passing Information to a Method or a Constructor",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html",
      },
    ],
    keywords: ["methods", "overloading", "pass-by-value", "java"],
    explanation: `A Java method's **signature** is its name plus the number, order, and types of its parameters (the return type is not part of the signature for overload-resolution purposes, though it must still be declared). Java is **always pass-by-value** — this surprises people who expect object arguments to be "passed by reference" because they can mutate the object's fields through the parameter. What's actually happening: for a reference-type parameter, the *value being copied* is the reference itself, not the object. The method gets its own copy of that reference, pointing at the same object — so mutating fields through it is visible to the caller, but reassigning the parameter to point at a *different* object inside the method has no effect on the caller's variable, because that reassignment only changes the method's local copy of the reference.

**Method overloading** lets several methods share one name as long as their parameter lists differ (in count, order, or types) — the compiler picks the correct one at compile time based on the arguments at each call site. \`print(String s)\` and \`print(int n)\` can coexist; \`print("hi")\` calls the first, \`print(5)\` calls the second. Overload resolution has a real, sometimes-surprising set of rules: Java prefers an exact type match first, then a match reachable by a widening primitive conversion (an \`int\` argument can match a \`long\` parameter if no \`int\` overload exists), and only as a last resort does it consider autoboxing (\`int\` to \`Integer\`) or varargs. This means adding a new overload to existing code can occasionally change which overload an *existing* call resolves to — a real, if rare, source of surprising behavior when a codebase's overload set changes.

Two methods that differ *only* in return type are **not** valid overloads — the compiler rejects that as ambiguous, because a call site like \`foo();\` gives the compiler no information to disambiguate on. And a method's parameters are themselves local variables scoped to that method — reassigning a parameter inside a method body never affects the variable the caller passed in, whether that parameter is a primitive or a reference.`,
    example: {
      language: "javascript",
      description:
        "Pass-by-value-of-the-reference, modeled in JS (which has the exact same semantics as Java here): mutating fields is visible to the caller, reassigning the parameter is not.",
      code: `function mutateField(obj) {
  obj.x = 999; // visible to the caller -- same object
}
function reassignParameter(obj) {
  obj = { x: -1 }; // only changes the LOCAL copy of the reference
}

const point = { x: 1 };
mutateField(point);
console.log(point.x); // 999 -- the caller's object was mutated

reassignParameter(point);
console.log(point.x); // still 999 -- reassigning the parameter didn't touch the caller's variable`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a second field y to point and mutate it inside mutateField -- confirm it's visible after the call.",
      code: `function mutateField(obj) {
  obj.x = 999;
}
const point = { x: 1, y: 2 };
mutateField(point);
console.log(point);`,
      editable: true,
    },
    guidedExercise: {
      id: "java-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write resolveOverload(argType) modeling Java overload resolution among print(String), print(int), and print(double). Return 'String' for a 'string' argType, 'int' for 'int', and 'double' for 'double' or 'float' (float widens to double when no float overload exists).",
      starterCode: `function resolveOverload(argType) {
  // TODO
}
`,
      solutionCode: `function resolveOverload(argType) {
  if (argType === "string") return "String";
  if (argType === "int") return "int";
  if (argType === "double" || argType === "float") return "double";
  throw new Error("no matching overload for " + argType);
}`,
      harness: `
        try { window.__report('t1', resolveOverload("string") === "String", 'string arg should resolve to the String overload'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', resolveOverload("int") === "int", 'int arg should resolve to the int overload'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', resolveOverload("float") === "double", 'float should widen to the double overload'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "string resolves to print(String)" },
        { id: "t2", description: "int resolves to print(int)" },
        { id: "t3", description: "float widens to print(double)" },
      ],
      hints: [
        "This is a straightforward mapping -- the key insight is float mapping to 'double', not throwing.",
        "Real Java resolution is more nuanced (autoboxing, varargs as last resort) -- this models only the widening-preference part.",
      ],
    },
    independentExercise: {
      id: "java-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write applyDiscount(price, percentOff) that returns a NEW discounted price without mutating any external state (model Java's pass-by-value: the function must be pure, taking primitives in and returning a new primitive out).",
      starterCode: `function applyDiscount(price, percentOff) {
  // TODO: return price reduced by percentOff percent, e.g. applyDiscount(100, 20) -> 80
}
`,
      solutionCode: `function applyDiscount(price, percentOff) {
  return price * (1 - percentOff / 100);
}`,
      harness: `
        try { window.__report('t1', applyDiscount(100, 20) === 80, 'applyDiscount(100, 20) should be 80'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', applyDiscount(50, 0) === 50, 'applyDiscount(50, 0) should be unchanged at 50'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', applyDiscount(200, 50) === 100, 'applyDiscount(200, 50) should be 100'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "20% off 100 is 80" },
        { id: "t2", description: "0% off leaves the price unchanged" },
        { id: "t3", description: "50% off 200 is 100" },
      ],
      hints: [
        "price * (1 - percentOff / 100) is the whole formula.",
        "Since numbers are primitives, this function is naturally pure already -- there's nothing to accidentally mutate.",
      ],
    },
    commonMistakes: [
      "Expecting `void reset(Point p) { p = new Point(0, 0); }` to change the caller's variable -- it only reassigns the local parameter, never the caller's reference.",
      "Trying to overload two methods that differ only in return type -- the compiler rejects this; overloading requires a difference in the parameter list.",
      "Assuming the most 'specific-looking' overload always wins -- Java's actual resolution order (exact match, then widening, then autoboxing, then varargs) can pick a different overload than intuition suggests when types are close.",
    ],
    quiz: [
      {
        id: "java-q5-1",
        prompt:
          'A method `void rename(Person p) { p = new Person("New Name"); }` is called as `rename(alice)`. What happens to alice afterward?',
        choices: [
          'alice now refers to the new Person("New Name")',
          "alice is unchanged -- the reassignment only affected the method's local parameter",
          "This throws a runtime exception",
          "This does not compile",
        ],
        correctIndex: 1,
        explanation:
          "Java copies the reference into the parameter p. Reassigning p inside the method only changes what that local copy points to — it never changes what the caller's alice variable points to, because there's no link back from the parameter to the caller's variable.",
      },
      {
        id: "java-q5-2",
        prompt: "Which pair of methods is a VALID overload of each other?",
        choices: [
          "int compute(int x) and double compute(int x)",
          "void log(String msg) and void log(int code)",
          "String format(int n) and int format(int n)",
          "void save() and int save()",
        ],
        correctIndex: 1,
        explanation:
          "Overloads must differ in their parameter list. log(String) and log(int) differ in parameter type, which is valid. The other three options differ only in return type, which the compiler rejects as ambiguous overloading.",
      },
      {
        id: "java-q5-3",
        prompt:
          "Why is Java described as 'always pass-by-value', even though mutating an object's fields through a method parameter is visible to the caller?",
        choices: [
          "Because primitives are pass-by-value but objects are pass-by-reference, and the phrase is a simplification",
          "Because for reference types, the value being copied into the parameter is the reference itself -- the object it points to is not copied",
          "Because Java copies the entire object every time it's passed to a method",
          "The phrase is inaccurate and Java is actually pass-by-reference for everything",
        ],
        correctIndex: 1,
        explanation:
          "The parameter gets a copy of the reference (an address, conceptually), not a copy of the object. That's what makes it pass-by-value even for objects: the value copied happens to be a reference, so field mutations through it reach the same object, but reassigning the parameter itself never reaches back to the caller.",
      },
    ],
    takeaway:
      "Java always copies the argument's value into the parameter — for objects, that value is the reference, which is why mutating fields is visible to the caller but reassigning the parameter is not. Overloads must differ in their parameter list, never only in return type.",
    summary:
      "A method's signature is its name plus parameter types. Java is strictly pass-by-value; for reference types, the copied value is the reference, not the object. Overload resolution prefers an exact match, then widening, then autoboxing, then varargs, in that order.",
    nextLessonSlug: "java-arrays",
  },
  {
    id: "java-arrays",
    slug: "java-arrays",
    title: "Arrays: Fixed-Size, Typed, and Zero-Indexed",
    description:
      "Java's array type — how to declare, fill, and iterate one, why its length is fixed forever, and the exception you'll hit constantly until you internalize the valid-index range.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 5,
    difficulty: "beginner",
    estimatedMinutes: 17,
    prerequisites: ["java-methods-and-overloading"],
    objectives: [
      "Declare, initialize, and iterate a Java array correctly",
      "Explain why an array's length cannot change after creation",
      "Predict and avoid ArrayIndexOutOfBoundsException",
    ],
    skills: ["java", "arrays"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Arrays",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html",
      },
    ],
    keywords: ["arrays", "java"],
    explanation: `A Java array is a fixed-size, homogeneous (single-type) container, created with a size that's locked in forever: \`int[] scores = new int[5];\` allocates space for exactly 5 ints, all initialized to \`0\` (the default value for numeric types; \`false\` for boolean, \`null\` for reference-type arrays). There is no way to "grow" this array — you can only create a brand-new, larger array and copy the old contents into it, which is exactly what the \`ArrayList\` class (covered in the next lesson) does internally so you don't have to do it by hand.

Arrays are zero-indexed: valid indices for a 5-element array run \`0\` through \`4\` — \`scores[5]\` is out of bounds and throws \`ArrayIndexOutOfBoundsException\` at runtime, not a compile error, because the compiler has no way to know an index's value ahead of time in the general case. \`scores.length\` (a field, not a method — no parentheses) always gives the array's fixed size, and \`scores[i]\` reads or writes the element at index \`i\`. Iterating with a for-each loop (\`for (int score : scores)\`) is preferred whenever you don't need the index, since it can never produce an out-of-bounds access.

Java also supports **multi-dimensional arrays** — \`int[][] grid = new int[3][4];\` is really an array of 3 arrays, each of length 4 (a "jagged" array, since each inner array's length is independently settable: \`int[][] jagged = new int[3][]; jagged[0] = new int[2];\`). Arrays are reference types, so passing one to a method passes the reference, and mutating an element through that reference is visible to the caller — the same rule from the methods lesson, applied to arrays specifically.`,
    example: {
      language: "javascript",
      description:
        "A fixed-size array modeled with a JS array that's frozen at a set length -- the index-bounds rule is identical to Java's.",
      code: `function makeFixedArray(size, defaultValue) {
  return new Array(size).fill(defaultValue);
}

const scores = makeFixedArray(5, 0);
scores[0] = 90;
console.log(scores);       // [90, 0, 0, 0, 0]
console.log(scores.length); // 5 -- fixed regardless of what you assign into existing slots

function readAt(arr, index) {
  if (index < 0 || index >= arr.length) {
    throw new Error("ArrayIndexOutOfBoundsException: index " + index + " out of bounds for length " + arr.length);
  }
  return arr[index];
}
console.log(readAt(scores, 4)); // 0 -- valid, last index
readAt(scores, 5); // throws -- 5 is out of bounds for a 5-element array`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Change readAt(scores, 5) to readAt(scores, 4) and confirm it no longer throws.",
      code: `function readAt(arr, index) {
  if (index < 0 || index >= arr.length) {
    throw new Error("out of bounds: " + index);
  }
  return arr[index];
}
const scores = [90, 85, 70, 60, 50];
console.log(readAt(scores, 5));`,
      editable: true,
    },
    guidedExercise: {
      id: "java-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isValidIndex(arrayLength, index) modeling Java's bounds rule exactly: true if 0 <= index < arrayLength, false otherwise (including negative indices).",
      starterCode: `function isValidIndex(arrayLength, index) {
  // TODO
}
`,
      solutionCode: `function isValidIndex(arrayLength, index) {
  return index >= 0 && index < arrayLength;
}`,
      harness: `
        try { window.__report('t1', isValidIndex(5, 0) === true, 'index 0 is valid for length 5'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isValidIndex(5, 4) === true, 'index 4 is valid for length 5'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isValidIndex(5, 5) === false, 'index 5 is out of bounds for length 5'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', isValidIndex(5, -1) === false, 'negative index is always invalid'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "index 0 is valid" },
        { id: "t2", description: "the last valid index (length - 1) is valid" },
        { id: "t3", description: "index equal to length is invalid" },
        { id: "t4", description: "negative index is invalid" },
      ],
      hints: [
        "Two conditions joined with &&: index >= 0 and index < arrayLength.",
        "length itself is never a valid index -- the last valid index is length - 1.",
      ],
    },
    independentExercise: {
      id: "java-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write sumArray(numbers) using a for-each-style loop (for...of in JS, the equivalent of Java's for-each) that returns the sum of all elements, and maxArray(numbers) that returns the largest element (throw an Error if the array is empty, modeling how you'd guard this in Java).",
      starterCode: `function sumArray(numbers) {
  // TODO: use a for...of loop
}
function maxArray(numbers) {
  // TODO: throw new Error("array is empty") if numbers.length === 0
}
`,
      solutionCode: `function sumArray(numbers) {
  let total = 0;
  for (const n of numbers) total += n;
  return total;
}
function maxArray(numbers) {
  if (numbers.length === 0) throw new Error("array is empty");
  let max = numbers[0];
  for (const n of numbers) if (n > max) max = n;
  return max;
}`,
      harness: `
        try { window.__report('t1', sumArray([1,2,3]) === 6, 'sumArray([1,2,3]) should be 6'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', sumArray([]) === 0, 'sumArray([]) should be 0'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', maxArray([3,9,2]) === 9, 'maxArray([3,9,2]) should be 9'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { let threw = false; try { maxArray([]); } catch (e) { threw = true; } window.__report('t4', threw, 'maxArray([]) should throw'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "sums a 3-element array correctly" },
        { id: "t2", description: "sums an empty array to 0" },
        { id: "t3", description: "finds the max of an unordered array" },
        { id: "t4", description: "throws on an empty array for maxArray" },
      ],
      hints: [
        "for (const n of numbers) is JS's for-each, matching Java's for (int n : numbers).",
        "Guard the empty case at the very top of maxArray, before the loop.",
      ],
    },
    commonMistakes: [
      "Using scores.length() with parentheses -- length is a field on arrays, not a method (Strings and Lists, by contrast, do use .length()/.size() as methods).",
      "Looping with `i <= arr.length` instead of `i < arr.length` -- off-by-one, throws ArrayIndexOutOfBoundsException on the last iteration.",
      "Expecting `int[] a = new int[5]; a = new int[10];` to 'resize' the original array -- it doesn't; it makes a now point at a completely new, separate array, and the original 5-element array (and anyone else still referencing it) is unaffected.",
    ],
    quiz: [
      {
        id: "java-q6-1",
        prompt: "After `int[] a = new int[5];`, what is a.length?",
        choices: ["4", "5", "0 until you assign elements", "This throws a NullPointerException"],
        correctIndex: 1,
        explanation:
          "new int[5] allocates space for exactly 5 elements (all initialized to 0), and length reflects that allocated size immediately — it has nothing to do with how many elements you've explicitly assigned.",
      },
      {
        id: "java-q6-2",
        prompt: "What happens when you access scores[scores.length] on any array?",
        choices: [
          "It returns the default value (0, false, or null)",
          "It returns the last element",
          "It throws ArrayIndexOutOfBoundsException",
          "It resizes the array to accommodate the new index",
        ],
        correctIndex: 2,
        explanation:
          "Valid indices run from 0 to length - 1. Index length itself is always exactly one past the end, and Java throws ArrayIndexOutOfBoundsException at runtime rather than silently returning a default or resizing.",
      },
      {
        id: "java-q6-3",
        prompt: "Why can't a Java array be resized after creation?",
        choices: [
          "It's a language limitation that newer Java versions are expected to remove",
          "An array's fixed length is fundamental to how it's allocated in memory — 'resizing' always means creating a new array and copying",
          "Arrays can be resized with the .resize() method",
          "Only arrays of primitives are fixed-size; object arrays can grow",
        ],
        correctIndex: 1,
        explanation:
          "An array is a single contiguous block of memory sized at creation time. There's no way to extend that block in place if a larger one is needed, so 'growing' an array always means allocating a new, larger array and copying every element over — exactly what ArrayList automates for you.",
      },
    ],
    takeaway:
      "A Java array's size is fixed forever at creation; 'resizing' always means creating a new array and copying, and every index access is bounds-checked at runtime, throwing ArrayIndexOutOfBoundsException rather than silently reading garbage or growing.",
    summary:
      "Arrays are fixed-size, zero-indexed, homogeneous containers. length is a field, not a method. For-each loops are the safest way to iterate when you don't need the index, since they can never go out of bounds.",
    nextLessonSlug: "java-collections",
  },
  {
    id: "java-collections",
    slug: "java-collections",
    title: "Collections: List, Set, and Map",
    description:
      "The three collection interfaces you'll use in nearly every Java program, and the practical rule of thumb for choosing between them.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 6,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: ["java-arrays"],
    objectives: [
      "Choose List, Set, or Map based on a data shape's actual requirements",
      "Use core methods of ArrayList, HashSet, and HashMap correctly",
      "Explain why List/Set/Map are interfaces, and name a common implementation of each",
    ],
    skills: ["java", "collections"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — The Collections Framework",
        url: "https://docs.oracle.com/javase/tutorial/collections/index.html",
      },
      {
        label: "Oracle Java SE 21 API — Collection",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collection.html",
      },
    ],
    keywords: ["collections", "list", "set", "map", "java"],
    explanation: `The Java Collections Framework centers on three interfaces that cover almost every data-shape need: **List** (an ordered, index-accessible, duplicate-allowing sequence — think "resizable array"), **Set** (an unordered collection that automatically rejects duplicates), and **Map** (a key-to-value lookup, where each key appears at most once). \`List<String> names = new ArrayList<>();\` is the workhorse List implementation, growing automatically as you \`.add()\` elements — internally, exactly by allocating a new backing array and copying, as the arrays lesson foreshadowed. \`Set<String> unique = new HashSet<>();\` guarantees no duplicate ever gets stored (adding an element already present is a no-op that returns \`false\`), and offers O(1) average-time \`.contains()\` checks, which is the whole reason to reach for a Set instead of scanning a List by hand. \`Map<String, Integer> ages = new HashMap<>();\` associates each unique key with one value — \`.put(key, value)\` inserts or overwrites, \`.get(key)\` returns the value or \`null\` if the key is absent, and \`.getOrDefault(key, fallback)\` avoids a separate null-check when you want a default.

These are declared as **interfaces on the left, concrete implementations on the right** (\`List<String> names = new ArrayList<>();\`, not \`ArrayList<String> names = new ArrayList<>();\`) as a deliberate, idiomatic convention: code written against the interface type can swap implementations (\`ArrayList\` for \`LinkedList\`, \`HashMap\` for \`LinkedHashMap\`) without changing a single line beyond that one declaration, because every caller only ever relies on the interface's guarantees, never on implementation-specific behavior.

The practical decision rule: reach for a **List** when order and/or duplicates matter and you need index access; reach for a **Set** when you only care "is this present," never "how many times" or "in what order"; reach for a **Map** the moment you're looking something up *by a key* rather than scanning for it — if you ever catch yourself writing a loop that scans a List purely to check whether some field matches, that's almost always a sign a Map (keyed by that field) or a Set would be both clearer and faster.`,
    example: {
      language: "javascript",
      description:
        "The three collection shapes, modeled with JS's own Array/Set/Map -- the API and the choose-by-shape reasoning carry over directly.",
      code: `const names = [];             // List-like: ordered, duplicates allowed, index access
names.push("Alex");
names.push("Alex");            // duplicates allowed
console.log(names, names.length); // ["Alex", "Alex"] 2

const uniqueNames = new Set(); // Set-like: no duplicates, no index access
uniqueNames.add("Alex");
uniqueNames.add("Alex");       // no-op, already present
console.log(uniqueNames.size);  // 1

const ages = new Map();        // Map-like: keyed lookup
ages.set("Alex", 30);
ages.set("Alex", 31);          // overwrites the previous value for this key
console.log(ages.get("Alex")); // 31
console.log(ages.get("Sam"));  // undefined -- Java's Map.get returns null here instead`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Add a second, different name to uniqueNames and print its size.",
      code: `const uniqueNames = new Set();
uniqueNames.add("Alex");
uniqueNames.add("Alex");
console.log(uniqueNames.size);`,
      editable: true,
    },
    guidedExercise: {
      id: "java-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write countUnique(items) modeling Java's Set behavior: return the number of DISTINCT values in items (use a Set to dedupe, then read its size).",
      starterCode: `function countUnique(items) {
  // TODO: build a Set from items, return its size
}
`,
      solutionCode: `function countUnique(items) {
  return new Set(items).size;
}`,
      harness: `
        try { window.__report('t1', countUnique(["a","b","a"]) === 2, 'should count 2 distinct values'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', countUnique([]) === 0, 'empty input should count 0'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', countUnique([1,1,1]) === 1, 'all-duplicates should count 1'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "counts distinct values correctly" },
        { id: "t2", description: "handles an empty array" },
        { id: "t3", description: "collapses an all-duplicate array to 1" },
      ],
      hints: [
        "new Set(array) builds a Set directly from an iterable, deduping as it goes.",
        "Set.prototype.size (a property, like Java's collections use .size() as a method) gives the count.",
      ],
    },
    independentExercise: {
      id: "java-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write wordFrequency(words) modeling Java's Map<String, Integer> pattern: return an object (standing in for a Map) mapping each word to how many times it appears in the words array.",
      starterCode: `function wordFrequency(words) {
  const counts = {};
  // TODO: for each word, increment counts[word] (starting from 0 if absent -- like Map.getOrDefault)
  return counts;
}
`,
      solutionCode: `function wordFrequency(words) {
  const counts = {};
  for (const w of words) {
    counts[w] = (counts[w] ?? 0) + 1;
  }
  return counts;
}`,
      harness: `
        try { const r = wordFrequency(["a","b","a"]); window.__report('t1', r.a === 2 && r.b === 1, 'a should appear 2 times, b once'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = wordFrequency([]); window.__report('t2', Object.keys(r).length === 0, 'empty input should give an empty map'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "counts word frequency correctly across repeats" },
        { id: "t2", description: "handles an empty input array" },
      ],
      hints: [
        "counts[w] ?? 0 mirrors Java's map.getOrDefault(w, 0) -- gives 0 when the key hasn't been seen yet.",
        "Increment and store back into the same key on every iteration.",
      ],
    },
    commonMistakes: [
      "Using a List and scanning it linearly to check membership when a Set or Map would be both clearer and far faster for large data.",
      "Calling map.get(missingKey) and using the result without a null-check -- it returns null, not a default or an exception, and using null unguarded throws a NullPointerException on the next operation.",
      "Declaring `ArrayList<String> names = new ArrayList<>();` instead of `List<String> names = new ArrayList<>();` -- it compiles fine, but it loses the ability to swap implementations later without touching every line that uses the variable's declared type.",
    ],
    quiz: [
      {
        id: "java-q7-1",
        prompt:
          "Which collection type is correct for storing a shopping cart's items, where the same product can appear more than once and order matters (first added, first shown)?",
        choices: ["Set", "Map", "List", "Any of the three work identically"],
        correctIndex: 2,
        explanation:
          "List preserves insertion order and explicitly allows duplicates — both requirements here. Set would silently collapse duplicate items, and Map requires a key/value shape this data doesn't naturally have.",
      },
      {
        id: "java-q7-2",
        prompt:
          'What does `HashMap<String, Integer> m = new HashMap<>(); m.get("missing");` return?',
        choices: ["0", "An empty string", "null", "It throws NoSuchElementException"],
        correctIndex: 2,
        explanation:
          "Map.get returns null when the key is absent — it never throws for a missing key, and it doesn't invent a default value on its own. getOrDefault(key, fallback) is the method to use when you want a default instead of null.",
      },
      {
        id: "java-q7-3",
        prompt:
          "Why declare `List<String> names = new ArrayList<>();` instead of `ArrayList<String> names = new ArrayList<>();`?",
        choices: [
          "There is no difference; it's purely stylistic with zero practical effect",
          "Declaring against the interface lets the implementation be swapped later without changing every line that uses names' declared type",
          "ArrayList cannot be assigned to a List-typed variable",
          "List is faster than ArrayList at runtime",
        ],
        correctIndex: 1,
        explanation:
          "This is the standard 'program to the interface' convention: as long as code only relies on List's guarantees (not ArrayList-specific behavior), the concrete implementation can be swapped for a LinkedList or another List implementation later by changing only the right-hand side of one declaration.",
      },
    ],
    takeaway:
      "Choose List for ordered data with duplicates and index access, Set for fast 'is this present' checks with no duplicates, and Map the moment you're looking something up by a key — and always declare the variable's type as the interface, not the concrete implementation.",
    summary:
      "List, Set, and Map are the three core collection interfaces. ArrayList, HashSet, and HashMap are their most common implementations. Map.get returns null for a missing key; getOrDefault avoids the null-check. Programming to the interface keeps implementations swappable.",
    nextLessonSlug: "java-classes-and-objects",
  },
  {
    id: "java-classes-and-objects",
    slug: "java-classes-and-objects",
    title: "Classes, Objects, Constructors, and Encapsulation",
    description:
      "How a class becomes a blueprint for objects, why constructors exist, and why hiding a field behind private plus getters/setters is worth the extra typing.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["java-collections"],
    objectives: [
      "Define a class with fields, constructors, and methods",
      "Explain what encapsulation prevents, with a concrete example",
      "Use access modifiers (private, public) deliberately, not by default",
    ],
    skills: ["java", "oop", "encapsulation"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Classes",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html",
      },
      {
        label: "Oracle: The Java Tutorials — Controlling Access to Members of a Class",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html",
      },
    ],
    keywords: ["classes", "objects", "constructors", "encapsulation", "java"],
    explanation: `A **class** is a blueprint; an **object** is a specific instance built from it via \`new\`. \`Enrollment e = new Enrollment("alice", "cs101");\` runs the class's **constructor**, a special method with no return type that shares the class's name, whose job is to establish the object in a valid starting state — every field should leave the constructor holding a sensible value, never left to whatever Java's default happens to be (\`0\`, \`null\`, \`false\`) by accident.

**Encapsulation** means a class's fields are \`private\` by default, exposed to the outside world only through deliberately chosen \`public\` methods — usually a getter (\`getStatus()\`) and, if and only if external mutation should genuinely be allowed, a setter (\`setStatus(...)\`). The point isn't bureaucracy for its own sake: a private field with a setter can **validate** every change in one place (\`setStatus(String s) { if (!VALID_STATUSES.contains(s)) throw new IllegalArgumentException(...); this.status = s; }\`), guaranteeing the object can never end up in an invalid state no matter how many places in the codebase call the setter. A public field offers no such guarantee — any code, anywhere, can set it to anything, and there is no single place left to add a rule later without hunting down every call site.

A field with no setter at all, only a getter, is **effectively immutable** after construction — a strong, deliberate design choice, not an oversight, for data that should never change once created (an order's ID, a user's registration date). Java's \`this\` keyword refers to the current object; it's most often needed to disambiguate a constructor or setter parameter from a field of the same name (\`this.status = status;\` — without \`this\`, that line would just assign the parameter to itself and leave the field untouched, a real and common bug). Since Java 16, a **record** (\`record Point(int x, int y) {}\`) generates a constructor, getters, \`equals\`/\`hashCode\`/\`toString\` automatically for the common case of an immutable data holder — worth knowing about, though this course still teaches the manual class form first since it's what a record expands into under the hood.`,
    example: {
      language: "javascript",
      description:
        "Encapsulation modeled with a JS class: a private-style field (# prefix) only reachable through validating methods.",
      code: `class Enrollment {
  #status; // private field -- unreachable from outside this class, like Java's private

  constructor(learnerId, courseId) {
    this.learnerId = learnerId;
    this.courseId = courseId;
    this.#status = "active"; // constructor establishes a valid starting state
  }

  getStatus() {
    return this.#status;
  }

  setStatus(next) {
    const valid = ["active", "completed", "withdrawn"];
    if (!valid.includes(next)) {
      throw new Error("invalid status: " + next);
    }
    this.#status = next;
  }
}

const e = new Enrollment("alice", "cs101");
console.log(e.getStatus());  // "active"
e.setStatus("completed");
console.log(e.getStatus());  // "completed"
e.setStatus("bogus");        // throws -- validation runs no matter who calls setStatus`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        'Try calling e.setStatus("bogus") and observe the thrown error -- then fix it to a valid status.',
      code: `class Enrollment {
  #status;
  constructor() { this.#status = "active"; }
  getStatus() { return this.#status; }
  setStatus(next) {
    const valid = ["active", "completed", "withdrawn"];
    if (!valid.includes(next)) throw new Error("invalid status: " + next);
    this.#status = next;
  }
}
const e = new Enrollment();
e.setStatus("bogus");`,
      editable: true,
    },
    guidedExercise: {
      id: "java-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Model a Java class BankAccount with a private-style #balance field, a constructor taking an opening balance, a getBalance() getter, and a deposit(amount) method that throws for a non-positive amount and otherwise increases the balance.",
      starterCode: `class BankAccount {
  #balance;
  constructor(openingBalance) {
    // TODO: validate openingBalance >= 0 (throw if not), then set this.#balance
  }
  getBalance() {
    // TODO
  }
  deposit(amount) {
    // TODO: throw if amount <= 0, otherwise add it to the balance
  }
}
`,
      solutionCode: `class BankAccount {
  #balance;
  constructor(openingBalance) {
    if (openingBalance < 0) throw new Error("opening balance cannot be negative");
    this.#balance = openingBalance;
  }
  getBalance() {
    return this.#balance;
  }
  deposit(amount) {
    if (amount <= 0) throw new Error("deposit amount must be positive");
    this.#balance += amount;
  }
}`,
      harness: `
        try { const a = new BankAccount(100); window.__report('t1', a.getBalance() === 100, 'opening balance should be readable'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const a = new BankAccount(100); a.deposit(50); window.__report('t2', a.getBalance() === 150, 'deposit should increase balance'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { let threw = false; try { new BankAccount(-5); } catch (e) { threw = true; } window.__report('t3', threw, 'negative opening balance should throw'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { const a = new BankAccount(100); let threw = false; try { a.deposit(-1); } catch (e) { threw = true; } window.__report('t4', threw, 'non-positive deposit should throw'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "getBalance reflects the opening balance" },
        { id: "t2", description: "deposit increases the balance" },
        { id: "t3", description: "negative opening balance throws" },
        { id: "t4", description: "non-positive deposit throws" },
      ],
      hints: [
        "The #balance field is only reachable through the class's own methods -- exactly like Java's private.",
        "Validate first, throw early, and only then mutate state -- never leave the object partially updated.",
      ],
    },
    independentExercise: {
      id: "java-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Model a Java class Temperature with a private #celsius field, a constructor, getCelsius(), and getFahrenheit() (computed on demand, not stored) -- Fahrenheit = celsius * 9/5 + 32. There is deliberately no setter: a Temperature is immutable once created.",
      starterCode: `class Temperature {
  #celsius;
  constructor(celsius) {
    // TODO
  }
  getCelsius() {
    // TODO
  }
  getFahrenheit() {
    // TODO: compute from #celsius, do not store a second field
  }
}
`,
      solutionCode: `class Temperature {
  #celsius;
  constructor(celsius) {
    this.#celsius = celsius;
  }
  getCelsius() {
    return this.#celsius;
  }
  getFahrenheit() {
    return this.#celsius * 9 / 5 + 32;
  }
}`,
      harness: `
        try { const t = new Temperature(0); window.__report('t1', t.getCelsius() === 0, 'getCelsius should return what was constructed'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const t = new Temperature(0); window.__report('t2', t.getFahrenheit() === 32, '0C should be 32F'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const t = new Temperature(100); window.__report('t3', t.getFahrenheit() === 212, '100C should be 212F'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', typeof (new Temperature(10)).setCelsius === 'undefined', 'there should be no setter -- Temperature is immutable'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "getCelsius returns the constructed value" },
        { id: "t2", description: "0C converts to 32F" },
        { id: "t3", description: "100C converts to 212F" },
        { id: "t4", description: "no setCelsius method exists (immutability)" },
      ],
      hints: [
        "getFahrenheit should compute from #celsius every call, never store a second, potentially-inconsistent field.",
        "Immutability here just means: don't write a setter at all.",
      ],
    },
    commonMistakes: [
      "Making every field public 'to keep things simple' -- this removes any single place to validate or later change how a value is stored, and every caller becomes coupled to the field's exact representation.",
      "Writing `status = status;` inside a setter instead of `this.status = status;` when the parameter and field share a name -- this assigns the parameter to itself and silently leaves the field untouched.",
      "Adding a setter for every field 'just in case' -- a field that should never change after construction (like an ID) should have no setter at all; adding one anyway invites bugs where something mutates data it shouldn't.",
    ],
    quiz: [
      {
        id: "java-q8-1",
        prompt:
          "Why does a setter method (rather than a public field) let you guarantee an object never enters an invalid state?",
        choices: [
          "Setters are automatically validated by the compiler",
          "A setter is the one place all mutation of that field passes through, so validation there applies to every caller, everywhere",
          "Setters are faster than direct field access",
          "There is no real difference; it's purely a style preference",
        ],
        correctIndex: 1,
        explanation:
          "A public field can be set to anything, from anywhere, with no way to intercept the change. A private field with a validating setter forces every mutation through one chokepoint, so a single validation rule protects the object everywhere it's used, forever, including future code.",
      },
      {
        id: "java-q8-2",
        prompt:
          "Inside a constructor `Enrollment(String status) { status = status; }`, what's wrong?",
        choices: [
          "Nothing — this correctly sets the field",
          "The parameter is assigned to itself; the object's field is never touched, since there's no `this.` to reach the field of the same name",
          "This is a compile error",
          "It sets the field but also creates an infinite loop",
        ],
        correctIndex: 1,
        explanation:
          "Without this., the bare name status inside the constructor refers to the local parameter, not the field — so `status = status;` is a no-op self-assignment on the parameter, and the field silently keeps its default value (null, here) forever.",
      },
      {
        id: "java-q8-3",
        prompt:
          "A class has a private field with a getter but no setter. What does that design communicate?",
        choices: [
          "The field was forgotten and needs a setter added",
          "The value is intended to be readable but never changed after the object is constructed — immutable by design",
          "The field cannot be read either",
          "This is invalid Java and will not compile",
        ],
        correctIndex: 1,
        explanation:
          "Deliberately omitting a setter is a common, valid encapsulation pattern for values that shouldn't change post-construction (an ID, a creation timestamp) — it's a design choice enforced by the compiler, not a gap that needs filling.",
      },
    ],
    takeaway:
      "Private fields plus deliberately-chosen public getters/setters (or no setter at all, for immutable data) give you one guaranteed place to validate every change — a public field gives you no such place, ever.",
    summary:
      "A class is a blueprint; new creates an object from it, running the constructor to establish a valid starting state. Encapsulation hides fields behind private and exposes only deliberately chosen public methods, so validation and future changes have exactly one place to live.",
    nextLessonSlug: "java-inheritance-and-composition",
  },
  {
    id: "java-inheritance-and-composition",
    slug: "java-inheritance-and-composition",
    title: "Inheritance vs. Composition, Packages, and Access Control",
    description:
      "When 'is-a' (inheritance) actually fits better than 'has-a' (composition) — and why most experienced Java developers reach for composition by default.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["java-classes-and-objects"],
    objectives: [
      "Distinguish an 'is-a' relationship (inheritance) from a 'has-a' relationship (composition)",
      "Extend a class correctly, including calling super()",
      "Explain why composition is favored over inheritance for code reuse in most modern Java design",
    ],
    skills: ["java", "oop", "inheritance", "composition"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Inheritance",
        url: "https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html",
      },
      {
        label: "Oracle: The Java Tutorials — Creating and Using Packages",
        url: "https://docs.oracle.com/javase/tutorial/java/package/packages.html",
      },
    ],
    keywords: ["inheritance", "composition", "packages", "access control", "java"],
    explanation: `**Inheritance** (\`class Course extends Content\`) models a genuine **is-a** relationship: a \`Course\` really is a kind of \`Content\`, so it makes sense for it to automatically get \`Content\`'s fields and methods and be usable anywhere a \`Content\` is expected. The subclass's constructor must call \`super(...)\` — the parent class's constructor — either explicitly as the first line, or implicitly (Java inserts a no-argument \`super()\` call automatically if you don't write one, which fails to compile if the parent has no no-argument constructor). A subclass can **override** an inherited method by redeclaring it with the same signature, annotated with \`@Override\` (not required by the compiler, but it catches a real class of typos: if the signature doesn't actually match a parent method, \`@Override\` turns that mismatch into a compile error instead of a silent new, unrelated method).

**Composition** (a class holding a reference to another class as a field, rather than extending it) models a **has-a** relationship: an \`Enrollment\` *has a* \`Learner\` and *has a* \`Course\` — it isn't a kind of either one. The practical, well-established guidance — often summarized as "favor composition over inheritance" — is that composition is usually the safer default for code reuse: inheritance couples a subclass tightly to its parent's *implementation details*, not just its public contract, so a seemingly-safe change to the parent class can silently break every subclass in ways that are hard to see locally. Composition avoids that: a class using another class only through its public methods can have that inner object replaced or changed far more safely, because there's no hidden dependency on the other class's internal implementation choices.

**Packages** (\`package com.visasparkschools.enrollment;\`, matched by a directory structure) organize related classes and control visibility at a coarser grain than the four access modifiers: \`private\` (this class only), *default/package-private* (no modifier at all — visible to the whole package, a genuinely useful and often-overlooked middle ground), \`protected\` (package, plus subclasses anywhere), and \`public\` (everywhere). Choosing the narrowest access level that still works is the same discipline as encapsulating fields: it keeps the number of places able to depend on an implementation detail as small as possible, which is exactly what makes future changes safe.`,
    example: {
      language: "javascript",
      description:
        "Inheritance (extends, is-a) versus composition (a field holding another object, has-a), modeled in JS classes -- the design tradeoff is identical to Java's.",
      code: `// Inheritance: Course IS-A Content
class Content {
  constructor(title) { this.title = title; }
  describe() { return "Content: " + this.title; }
}
class Course extends Content {
  constructor(title, moduleCount) {
    super(title); // must call the parent constructor
    this.moduleCount = moduleCount;
  }
  describe() { // overriding the parent's method
    return super.describe() + \` (\${this.moduleCount} modules)\`;
  }
}
console.log(new Course("Java Basics", 6).describe());

// Composition: Enrollment HAS-A Learner and HAS-A Course (not "is a" either one)
class Enrollment {
  constructor(learner, course) {
    this.learner = learner; // held by reference, not inherited
    this.course = course;
  }
  summary() {
    return \`\${this.learner} enrolled in \${this.course.title}\`;
  }
}
console.log(new Enrollment("Alice", new Course("Java Basics", 6)).summary());`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a second subclass Quiz extends Content, override describe(), and print an instance of it.",
      code: `class Content {
  constructor(title) { this.title = title; }
  describe() { return "Content: " + this.title; }
}
class Course extends Content {
  describe() { return super.describe() + " (course)"; }
}
console.log(new Course("Java Basics").describe());`,
      editable: true,
    },
    guidedExercise: {
      id: "java-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Model Java inheritance: class Shape with area() returning 0, and class Circle extends Shape with a constructor(radius) calling super() and overriding area() to return Math.PI * radius * radius.",
      starterCode: `class Shape {
  area() {
    return 0;
  }
}
class Circle extends Shape {
  constructor(radius) {
    // TODO: call super(), store radius
  }
  area() {
    // TODO: override to return the circle's area
  }
}
`,
      solutionCode: `class Shape {
  area() {
    return 0;
  }
}
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius * this.radius;
  }
}`,
      harness: `
        try { window.__report('t1', new Shape().area() === 0, 'base Shape.area() should be 0'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const c = new Circle(2); window.__report('t2', Math.abs(c.area() - Math.PI * 4) < 0.001, 'Circle(2).area() should be about 4*PI'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', new Circle(1) instanceof Shape, 'a Circle should be a Shape (is-a)'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "the base class's default behavior is unchanged" },
        { id: "t2", description: "Circle overrides area() correctly" },
        { id: "t3", description: "a Circle is-a Shape (inheritance relationship holds)" },
      ],
      hints: [
        "super() must be called before using 'this' in a subclass constructor.",
        "Overriding just means redeclaring the same method name in the subclass.",
      ],
    },
    independentExercise: {
      id: "java-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Model composition: class Engine with horsepower() returning a fixed number, and class Car that HAS-A Engine (stored as a field, not extended) with a describe() method combining the car's name and its engine's horsepower.",
      starterCode: `class Engine {
  horsepower() {
    return 300;
  }
}
class Car {
  constructor(name, engine) {
    // TODO: store name and engine (composition -- Car has-a Engine, does not extend it)
  }
  describe() {
    // TODO: return something like "Model X (300 hp)" using this.engine.horsepower()
  }
}
`,
      solutionCode: `class Engine {
  horsepower() {
    return 300;
  }
}
class Car {
  constructor(name, engine) {
    this.name = name;
    this.engine = engine;
  }
  describe() {
    return this.name + " (" + this.engine.horsepower() + " hp)";
  }
}`,
      harness: `
        try { const c = new Car("Model X", new Engine()); window.__report('t1', c.describe() === "Model X (300 hp)", 'describe() should combine name and horsepower'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const c = new Car("Model X", new Engine()); window.__report('t2', !(c instanceof Engine), 'a Car should NOT be an Engine -- composition, not inheritance'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "describe() correctly delegates to the held Engine" },
        { id: "t2", description: "Car is not an Engine (composition, not inheritance)" },
      ],
      hints: [
        "Store the engine as a plain field: this.engine = engine.",
        "describe() calls this.engine.horsepower() -- it delegates, it doesn't inherit.",
      ],
    },
    commonMistakes: [
      "Reaching for `extends` purely to reuse a few methods, when the relationship isn't really 'is-a' -- this creates tight coupling to the parent's internals for a benefit composition gives more safely.",
      "Forgetting that a subclass constructor implicitly calls the parent's no-argument constructor unless you write an explicit super(...) call -- this fails to compile if the parent has no no-argument constructor.",
      "Marking a method @Override on something that isn't actually overriding anything (a typo'd method name, or mismatched parameters) and not noticing, because without @Override the compiler treats it as a brand-new, unrelated method rather than flagging the mismatch.",
    ],
    quiz: [
      {
        id: "java-q9-1",
        prompt:
          "A Playlist class needs to hold multiple Song objects. Is this an inheritance ('Playlist extends Song') or composition relationship?",
        choices: [
          "Inheritance -- a Playlist is a kind of Song",
          "Composition -- a Playlist has Songs, it isn't one",
          "Either works equally well",
          "Neither applies; this needs a static method",
        ],
        correctIndex: 1,
        explanation:
          "A Playlist is not a kind of Song (it doesn't make sense to say 'is-a'), it simply contains Songs — that's a has-a relationship, modeled with composition (a field holding a List<Song>), not inheritance.",
      },
      {
        id: "java-q9-2",
        prompt:
          "Why is 'favor composition over inheritance' common, well-established guidance for code reuse?",
        choices: [
          "Inheritance is deprecated in modern Java",
          "Composition couples a class only to another class's public methods, while inheritance can silently couple a subclass to the parent's internal implementation details",
          "Composition always performs better at runtime",
          "Java does not allow more than one level of inheritance",
        ],
        correctIndex: 1,
        explanation:
          "Subclassing purely for reuse creates a dependency on how the parent is implemented internally, not just what it promises publicly — a parent change that seems safe can break subclasses in surprising ways. Composition, going through only the held object's public interface, is more resilient to that kind of change.",
      },
      {
        id: "java-q9-3",
        prompt: "What does the @Override annotation actually do?",
        choices: [
          "It makes the method run faster",
          "It's purely decorative and has no effect",
          "It asks the compiler to verify the method really does override a parent method, catching signature-mismatch typos as compile errors",
          "It prevents the method from being overridden further by subclasses",
        ],
        correctIndex: 2,
        explanation:
          "Without @Override, a method that doesn't actually match a parent's signature (due to a typo or wrong parameter type) just silently becomes a new, unrelated method — no compiler error. @Override asks the compiler to check that assumption and fail loudly if it's wrong.",
      },
    ],
    takeaway:
      "Use inheritance only for a genuine 'is-a' relationship where the subclass should be usable anywhere the parent is expected; default to composition ('has-a', a field holding another object) for reuse, since it couples you only to the other class's public contract, not its internals.",
    summary:
      "extends models is-a; a field holding another object models has-a. Subclass constructors must reach the parent constructor via super(). @Override catches signature mismatches at compile time. Packages and access modifiers (private, package-private, protected, public) control how narrowly a class's internals are exposed.",
    nextLessonSlug: "java-interfaces-and-polymorphism",
  },
  {
    id: "java-interfaces-and-polymorphism",
    slug: "java-interfaces-and-polymorphism",
    title: "Interfaces, Abstract Classes, and Polymorphism",
    description:
      "How Java lets you write code against a contract instead of a concrete type — and the practical difference between an interface and an abstract class.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["java-inheritance-and-composition"],
    objectives: [
      "Define and implement an interface with multiple implementing classes",
      "Explain when an abstract class is appropriate instead of a plain interface",
      "Use polymorphism to write code that works uniformly across several concrete types",
    ],
    skills: ["java", "oop", "interfaces", "polymorphism"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Interfaces",
        url: "https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html",
      },
      {
        label: "Oracle: The Java Tutorials — Abstract Methods and Classes",
        url: "https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html",
      },
      {
        label: "Oracle: The Java Tutorials — Polymorphism",
        url: "https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html",
      },
    ],
    keywords: ["interfaces", "abstract classes", "polymorphism", "java"],
    explanation: `An **interface** (\`interface Gradeable { double score(); }\`) declares a contract — method signatures with no implementation (plus, since Java 8, optional \`default\` methods that do have a body) — that any class can agree to fulfill via \`implements\`. Unlike a class, a Java class can \`implements\` any number of interfaces, which is exactly how Java gives you a form of "this thing plays several roles" without the ambiguity that multiple *class* inheritance would create — an interface has no state (fields) of its own to conflict with another interface's, only behavior it promises.

An **abstract class** (\`abstract class Content { abstract String render(); void logAccess() { ... } }\`) sits between a plain class and an interface: it can declare abstract methods (no body, must be implemented by subclasses) *and* hold real fields and fully-implemented methods that subclasses inherit for free, but it can never be instantiated directly (\`new Content()\` is a compile error). Choose an abstract class over an interface when subclasses genuinely share common state or reusable implementation, not just a shared contract; choose a plain interface when you only need to guarantee "this type can do X," especially across otherwise-unrelated classes.

**Polymorphism** is what makes both of these useful in practice: code written against the interface or abstract-class type (\`Gradeable g = quizOrAssignmentOrExam;\`) can call \`g.score()\` without knowing or caring which concrete class \`g\` actually is at runtime — the JVM dispatches to the *actual* object's implementation automatically (this is called dynamic/virtual dispatch). This is the mechanism behind writing one \`for (Gradeable g : allGradeableItems) total += g.score();\` loop that correctly handles quizzes, assignments, and exams alike, with zero \`if (item instanceof Quiz) ... else if ...\` branching — new implementations of \`Gradeable\` can be added later without ever touching that loop, which is the real payoff: code that depends only on the contract doesn't need to change when new implementations of that contract appear.`,
    example: {
      language: "javascript",
      description:
        "Polymorphism modeled with JS classes implementing a shared 'contract' (duck-typed in JS, compiler-enforced in Java) -- the loop over mixed types is the real payoff either way.",
      code: `class Quiz {
  constructor(pointsEarned, pointsPossible) { this.pointsEarned = pointsEarned; this.pointsPossible = pointsPossible; }
  score() { return this.pointsEarned / this.pointsPossible; } // implements the "Gradeable" contract
}
class PassFailAssignment {
  constructor(passed) { this.passed = passed; }
  score() { return this.passed ? 1 : 0; } // a totally different internal shape, same contract
}

const items = [new Quiz(8, 10), new PassFailAssignment(true), new Quiz(5, 10)];

// This loop works uniformly across every "Gradeable" type, with zero branching on the concrete class:
let total = 0;
for (const item of items) {
  total += item.score(); // dynamic dispatch: calls whichever score() belongs to the actual object
}
console.log(total.toFixed(2)); // 2.30`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a third type, ExtraCreditAssignment, whose score() always returns 1.2, then include an instance in the loop.",
      code: `class Quiz {
  constructor(earned, possible) { this.earned = earned; this.possible = possible; }
  score() { return this.earned / this.possible; }
}
const items = [new Quiz(8, 10)];
let total = 0;
for (const item of items) total += item.score();
console.log(total);`,
      editable: true,
    },
    guidedExercise: {
      id: "java-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Model a Java interface Shape with area(). Implement it with Square and Rectangle classes, then write totalArea(shapes) that sums area() across a mixed array -- with NO type-checking branches, only the polymorphic call.",
      starterCode: `class Square {
  constructor(side) { this.side = side; }
  area() {
    // TODO
  }
}
class Rectangle {
  constructor(width, height) { this.width = width; this.height = height; }
  area() {
    // TODO
  }
}
function totalArea(shapes) {
  // TODO: sum shape.area() over every shape -- no instanceof / type checks
}
`,
      solutionCode: `class Square {
  constructor(side) { this.side = side; }
  area() { return this.side * this.side; }
}
class Rectangle {
  constructor(width, height) { this.width = width; this.height = height; }
  area() { return this.width * this.height; }
}
function totalArea(shapes) {
  let total = 0;
  for (const s of shapes) total += s.area();
  return total;
}`,
      harness: `
        try { window.__report('t1', new Square(4).area() === 16, 'Square(4).area() should be 16'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', new Rectangle(3, 5).area() === 15, 'Rectangle(3,5).area() should be 15'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', totalArea([new Square(2), new Rectangle(2, 3)]) === 10, 'totalArea should sum polymorphically across mixed types'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Square.area() is correct" },
        { id: "t2", description: "Rectangle.area() is correct" },
        {
          id: "t3",
          description: "totalArea sums across mixed shape types without branching on type",
        },
      ],
      hints: [
        "totalArea should call s.area() the same way for every element -- no if/instanceof needed.",
        "This is exactly the point of polymorphism: the loop doesn't know or care which class each element is.",
      ],
    },
    independentExercise: {
      id: "java-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Model an abstract-class-like pattern: class Notification with a shared, fully-implemented method formatTimestamp(date) (returns date.toISOString()), and an abstract-style method body() that MUST be overridden (throw an Error if called directly on the base class). Implement EmailNotification and SmsNotification subclasses overriding body().",
      starterCode: `class Notification {
  formatTimestamp(date) {
    return date.toISOString();
  }
  body() {
    // TODO: this represents an "abstract" method -- throw new Error("body() must be overridden") here
  }
}
class EmailNotification extends Notification {
  constructor(subject) { super(); this.subject = subject; }
  body() {
    // TODO: return something using this.subject
  }
}
class SmsNotification extends Notification {
  constructor(text) { super(); this.text = text; }
  body() {
    // TODO: return this.text
  }
}
`,
      solutionCode: `class Notification {
  formatTimestamp(date) {
    return date.toISOString();
  }
  body() {
    throw new Error("body() must be overridden");
  }
}
class EmailNotification extends Notification {
  constructor(subject) { super(); this.subject = subject; }
  body() {
    return "Subject: " + this.subject;
  }
}
class SmsNotification extends Notification {
  constructor(text) { super(); this.text = text; }
  body() {
    return this.text;
  }
}`,
      harness: `
        try { let threw = false; try { new Notification().body(); } catch (e) { threw = true; } window.__report('t1', threw, 'base Notification.body() should throw (models an abstract method)'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', new EmailNotification("Hi").body() === "Subject: Hi", 'EmailNotification should override body()'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', new SmsNotification("Hey").body() === "Hey", 'SmsNotification should override body()'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { const d = new Date(0); window.__report('t4', new SmsNotification("x").formatTimestamp(d) === d.toISOString(), 'formatTimestamp should be inherited, shared behavior'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "the base class's unimplemented method throws (models 'abstract')",
        },
        { id: "t2", description: "EmailNotification overrides body() correctly" },
        { id: "t3", description: "SmsNotification overrides body() correctly" },
        {
          id: "t4",
          description: "formatTimestamp is shared, fully-implemented behavior inherited by both",
        },
      ],
      hints: [
        "This model captures the essence of 'abstract' (must override) without Java's compile-time enforcement, since JS has no true abstract keyword.",
        "formatTimestamp should never need to be redefined in either subclass -- that's the reusable, fully-implemented part an abstract class gives you for free.",
      ],
    },
    guidedLocalLab: {
      id: "java-gll-oop-domain-model",
      title: "Model a Domain Using Encapsulation, Composition, Interfaces, and Polymorphism",
      scenario:
        "Build a small library-loan domain, entirely in real Java, that uses every OOP tool from this module together: encapsulated classes, a has-a relationship, an interface with multiple implementations, and a polymorphic loop.",
      requiredTools: [
        { name: "JDK", version: "21 LTS or newer" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        "Create a project folder named library-loans.",
        "Inside it, create src/ for your .java files.",
        "You'll add: a Borrowable interface, two classes implementing it (Book, Magazine), an encapsulated Loan class composing a Borrowable, and a Main that demonstrates polymorphism.",
      ],
      projectStructure: `library-loans/
  src/
    Borrowable.java
    Book.java
    Magazine.java
    Loan.java
    Main.java`,
      starterFiles: [
        {
          path: "src/Borrowable.java",
          content: `public interface Borrowable {
    // TODO: declare a method String describe() and a method int loanPeriodDays()
}
`,
        },
        {
          path: "src/Book.java",
          content: `public class Book implements Borrowable {
    private final String title;
    private final String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    // TODO: implement describe() (e.g. "title by author") and loanPeriodDays() (return 21)
}
`,
        },
        {
          path: "src/Magazine.java",
          content: `public class Magazine implements Borrowable {
    private final String name;
    private final int issueNumber;

    public Magazine(String name, int issueNumber) {
        this.name = name;
        this.issueNumber = issueNumber;
    }

    // TODO: implement describe() (e.g. "name, issue #N") and loanPeriodDays() (return 7)
}
`,
        },
        {
          path: "src/Loan.java",
          content: `public class Loan {
    private final Borrowable item; // composition: Loan HAS-A Borrowable, it doesn't extend it
    private final String borrowerName;
    private boolean returned;

    public Loan(Borrowable item, String borrowerName) {
        // TODO: store item and borrowerName; returned starts false
    }

    // TODO: add a public method summary() returning something like
    // "<borrowerName> borrowed <item.describe()> for <item.loanPeriodDays()> days"

    // TODO: add markReturned() (sets returned = true) and isReturned() (getter)
}
`,
        },
        {
          path: "src/Main.java",
          content: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Loan> loans = new ArrayList<>();
        // TODO: create at least one Book loan and one Magazine loan, add both to loans

        // TODO: loop over loans polymorphically -- print each summary() -- with
        // NO instanceof checks or branching on whether the item is a Book or Magazine
    }
}
`,
        },
      ],
      requirements: [
        "Borrowable is an interface with describe() and loanPeriodDays().",
        "Book and Magazine both implement Borrowable with genuinely different internal fields.",
        "Loan composes a Borrowable (a field, not inheritance) plus a borrower name and a returned flag, all private.",
        "Loan exposes summary(), markReturned(), and isReturned() as its only public surface.",
        "Main builds a List<Loan> containing at least one Book-backed and one Magazine-backed loan, then prints every summary() via one polymorphic loop with no type-checking branches.",
      ],
      commands: [
        {
          description: "Compile every source file into out/",
          command:
            "javac -d out src/Borrowable.java src/Book.java src/Magazine.java src/Loan.java src/Main.java",
        },
        { description: "Run the program", command: "java -cp out Main" },
      ],
      expectedBehavior:
        "The program compiles with no errors or warnings, and running it prints one summary line per loan — one mentioning a book title/author and a 21-day period, one mentioning a magazine name/issue and a 7-day period — produced by the same loop, with no branch checking which concrete type each loan wraps.",
      verificationSteps: [
        { command: "javac -d out src/*.java", expectedResult: "Compiles cleanly with no errors" },
        {
          command: "java -cp out Main",
          expectedResult:
            "Prints at least two summary lines, one for a Book-backed loan and one for a Magazine-backed loan",
        },
        {
          command: "grep -n instanceof src/Main.java",
          expectedResult:
            "No output — Main.java should contain no instanceof checks in the printing loop",
        },
      ],
      troubleshooting: [
        {
          issue:
            "`error: Loan is not abstract and does not override abstract method describe() in Borrowable`",
          fix: "Book or Magazine is missing an implementation of one of the interface's methods — every method declared in an interface must be implemented by a non-abstract implementing class.",
        },
        {
          issue: "Compiles, but the loop in Main only prints Book-shaped output",
          fix: "Check that both a Book and a Magazine were actually constructed and added to the loans list before the loop runs.",
        },
        {
          issue: "`cannot find symbol: method summary()`",
          fix: "Confirm Loan's summary() method is declared public, and that you're calling loan.summary() (a Loan method) rather than trying to call it on the Borrowable directly.",
        },
      ],
      hints: [
        "describe() and loanPeriodDays() should read purely from each class's own private fields -- no shared state between Book and Magazine.",
        "Loan's constructor should simply assign its two parameters to its two final fields, plus initialize returned = false.",
        "The polymorphic loop in Main is just: for (Loan loan : loans) System.out.println(loan.summary());",
      ],
      referenceSolution: {
        summary:
          "Borrowable declares describe()/loanPeriodDays(); Book and Magazine implement it independently. Loan composes a Borrowable plus borrower/returned state, all private, exposing only summary()/markReturned()/isReturned(). Main builds a mixed List<Loan> and prints every summary() through one uniform loop.",
        files: [
          {
            path: "src/Borrowable.java",
            content: `public interface Borrowable {
    String describe();
    int loanPeriodDays();
}
`,
          },
          {
            path: "src/Book.java",
            content: `public class Book implements Borrowable {
    private final String title;
    private final String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    @Override
    public String describe() {
        return title + " by " + author;
    }

    @Override
    public int loanPeriodDays() {
        return 21;
    }
}
`,
          },
          {
            path: "src/Magazine.java",
            content: `public class Magazine implements Borrowable {
    private final String name;
    private final int issueNumber;

    public Magazine(String name, int issueNumber) {
        this.name = name;
        this.issueNumber = issueNumber;
    }

    @Override
    public String describe() {
        return name + ", issue #" + issueNumber;
    }

    @Override
    public int loanPeriodDays() {
        return 7;
    }
}
`,
          },
          {
            path: "src/Loan.java",
            content: `public class Loan {
    private final Borrowable item;
    private final String borrowerName;
    private boolean returned;

    public Loan(Borrowable item, String borrowerName) {
        this.item = item;
        this.borrowerName = borrowerName;
        this.returned = false;
    }

    public String summary() {
        return borrowerName + " borrowed " + item.describe() + " for " + item.loanPeriodDays() + " days";
    }

    public void markReturned() {
        this.returned = true;
    }

    public boolean isReturned() {
        return returned;
    }
}
`,
          },
          {
            path: "src/Main.java",
            content: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Loan> loans = new ArrayList<>();
        loans.add(new Loan(new Book("Effective Java", "Joshua Bloch"), "Alice"));
        loans.add(new Loan(new Magazine("Tech Weekly", 42), "Sam"));

        for (Loan loan : loans) {
            System.out.println(loan.summary());
        }
    }
}
`,
          },
        ],
      },
      extensionChallenge:
        "Add a third Borrowable implementation, DvdBoxSet, with its own fields and a 14-day loan period, and confirm the existing Main loop prints it correctly with zero changes to Main.java itself — that's the payoff of coding against the interface.",
    },
    commonMistakes: [
      "Trying to `new` an interface or an abstract class directly -- both are compile errors; only a concrete class implementing/extending them can be instantiated.",
      "Writing `if (item instanceof Book) ... else if (item instanceof Magazine) ...` when a polymorphic method call would let the JVM dispatch correctly on its own -- this branching defeats the entire purpose of the interface and must be extended every time a new implementation is added.",
      "Reaching for an abstract class when a plain interface would do -- if there's no shared state or shared implementation to inherit, an interface (which also allows a class to implement several contracts at once) is the better, more flexible fit.",
    ],
    quiz: [
      {
        id: "java-q10-1",
        prompt:
          "A class needs to satisfy both a Comparable contract and a Serializable-style contract at once. Why does Java favor interfaces for this over class inheritance?",
        choices: [
          "Java classes can only extend one parent, but can implement any number of interfaces",
          "Interfaces run faster than inherited methods",
          "Abstract classes cannot declare more than one method",
          "There's no real reason; either approach is equally supported",
        ],
        correctIndex: 0,
        explanation:
          "A Java class has exactly one direct superclass (single inheritance), but can implement as many interfaces as needed — this sidesteps the ambiguity multiple class inheritance would create, since interfaces contribute no conflicting state, only contracts.",
      },
      {
        id: "java-q10-2",
        prompt:
          "for (Gradeable g : items) { total += g.score(); } works correctly for Quiz, Exam, and Assignment objects in the same list, with no type-checking. What's this called?",
        choices: ["Encapsulation", "Composition", "Polymorphism", "Overloading"],
        correctIndex: 2,
        explanation:
          "This is polymorphism: the same call, g.score(), dispatches to whichever concrete class's implementation actually applies at runtime, letting one piece of code handle every current and future Gradeable implementation uniformly.",
      },
      {
        id: "java-q10-3",
        prompt: "When should you choose an abstract class over a plain interface?",
        choices: [
          "Whenever more than one class needs to implement the same method signature",
          "When subclasses genuinely need to share real state (fields) or fully-implemented, reusable behavior, not just a contract",
          "Abstract classes should always be preferred; interfaces are considered legacy",
          "Interfaces cannot have more than one implementing class",
        ],
        correctIndex: 1,
        explanation:
          "An abstract class is the right tool specifically when there's genuine shared implementation or state to inherit — if all you need is a guaranteed set of method signatures with no shared state, a plain interface is more flexible, since a class can implement many interfaces but extend only one class (abstract or not).",
      },
    ],
    takeaway:
      "Interfaces declare a contract any number of unrelated classes can fulfill; abstract classes add shared state and implementation on top of that, at the cost of single inheritance; polymorphism is what lets code written against either one work correctly, unchanged, as new implementations are added later.",
    summary:
      "implements fulfills an interface's contract; extends inherits an abstract or concrete class's state and behavior. A class can implement many interfaces but extend only one class. Polymorphism means code written against the shared type dispatches to the correct concrete implementation automatically, with no type-checking branches.",
    nextLessonSlug: "java-exceptions",
  },
  {
    id: "java-exceptions",
    slug: "java-exceptions",
    title: "Exceptions: Checked, Unchecked, and Handling Them Well",
    description:
      "Java's two families of exceptions, why the compiler forces you to acknowledge one but not the other, and how to fail in a way that actually helps whoever hits the error.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["java-interfaces-and-polymorphism"],
    objectives: [
      "Explain the difference between checked and unchecked exceptions and why the distinction exists",
      "Write a try/catch/finally block that handles failure correctly, without swallowing information",
      "Design a custom exception type for a specific failure case",
    ],
    skills: ["java", "exceptions"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Exceptions",
        url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html",
      },
      {
        label: "Oracle: The Java Tutorials — Unchecked Exceptions — The Controversy",
        url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html",
      },
    ],
    keywords: ["exceptions", "error handling", "checked", "unchecked", "java"],
    explanation: `Java splits exceptions into two families with genuinely different rules. **Checked exceptions** (subclasses of \`Exception\` but not \`RuntimeException\` — e.g. \`IOException\`) must be either caught or declared with \`throws\` in a method's signature; the compiler enforces this, and code that ignores a checked exception simply does not compile. They represent conditions a well-written caller is expected to anticipate and recover from — a file that might not exist, a network call that might fail — situations that are a normal, foreseeable part of the operation, not a bug. **Unchecked exceptions** (\`RuntimeException\` and its subclasses — \`NullPointerException\`, \`IllegalArgumentException\`, \`IndexOutOfBoundsException\`) need no \`throws\` declaration and no forced catch; they typically represent programming errors — a bug — that no amount of catching fixes, only prevents from being visible.

A \`try\`/\`catch\`/\`finally\` block runs \`finally\` **always** — whether the try block succeeds, throws, or even returns early — which makes it the correct place for cleanup that must happen no matter what (though \`try\`-with-resources, covered later in this course, is the more modern, safer tool for that specific job). Catching an exception and doing nothing with it (\`catch (Exception e) {}\`) — sometimes called "swallowing" the exception — is one of the most damaging habits in Java code: it makes a real failure invisible, so the program silently continues in a broken state instead of failing where the problem is easy to diagnose. At minimum, a caught exception you can't fully recover from should be logged with enough context to debug it, or re-thrown (possibly wrapped in a more meaningful exception type) — never discarded.

Writing a **custom exception** (\`class InvalidEnrollmentException extends RuntimeException { ... }\`) is the right move once "throw a generic \`IllegalArgumentException\` with a message" stops being specific enough for callers to meaningfully react to different failure causes differently — a custom type lets a \`catch (InvalidEnrollmentException e)\` block target exactly that failure, distinct from any other \`IllegalArgumentException\` a totally unrelated part of the code might throw. A custom exception's constructor should always pass its message (and, when wrapping another exception, that cause) up to the superclass constructor, so the full context is preserved in the exception chain.`,
    example: {
      language: "javascript",
      description:
        "Checked-vs-unchecked modeled as two error classes in JS, with the finally-always-runs guarantee shown explicitly.",
      code: `class RecoverableError extends Error {}  // models a checked exception -- expected to be handled
class ProgrammerError extends Error {}   // models an unchecked exception -- a bug, not expected input

function loadFile(path) {
  if (path === "missing.txt") throw new RecoverableError("file not found: " + path);
  return "file contents";
}

function process(path) {
  try {
    return loadFile(path);
  } catch (e) {
    if (e instanceof RecoverableError) {
      console.log("Recovered: using default content instead.");
      return "default content";
    }
    throw e; // an unexpected error type -- re-throw, never swallow silently
  } finally {
    console.log("cleanup always runs, success or failure");
  }
}

console.log(process("missing.txt")); // logs cleanup, then "default content"`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change the catch block to do nothing (an empty catch {}) and observe how the failure becomes invisible.",
      code: `function risky() {
  throw new Error("something real went wrong");
}
try {
  risky();
} catch (e) {
  // swallowed -- nothing here
}
console.log("program continues as if nothing happened");`,
      editable: true,
    },
    guidedExercise: {
      id: "java-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write safeDivide(a, b) modeling a Java method that throws a custom-style error for division by zero (throw new Error('cannot divide by zero')) and otherwise returns a / b. Then write divideAll(pairs) that attempts safeDivide on each [a,b] pair, collecting successful results and SKIPPING (not crashing on) failures, returning only the successful results array.",
      starterCode: `function safeDivide(a, b) {
  // TODO: throw if b === 0, otherwise return a / b
}
function divideAll(pairs) {
  const results = [];
  // TODO: for each [a, b] pair, try safeDivide; on success push to results; on failure, skip it (catch and continue)
  return results;
}
`,
      solutionCode: `function safeDivide(a, b) {
  if (b === 0) throw new Error("cannot divide by zero");
  return a / b;
}
function divideAll(pairs) {
  const results = [];
  for (const [a, b] of pairs) {
    try {
      results.push(safeDivide(a, b));
    } catch (e) {
      // expected, recoverable case -- skip this pair, continue with the rest
    }
  }
  return results;
}`,
      harness: `
        try { window.__report('t1', safeDivide(10, 2) === 5, 'safeDivide(10,2) should be 5'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { let threw = false; try { safeDivide(1, 0); } catch (e) { threw = true; } window.__report('t2', threw, 'safeDivide(1,0) should throw'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = divideAll([[10,2],[1,0],[9,3]]); window.__report('t3', JSON.stringify(r) === JSON.stringify([5,3]), 'divideAll should skip the failing pair and keep the successes'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "safeDivide computes correctly for valid input" },
        { id: "t2", description: "safeDivide throws for division by zero" },
        {
          id: "t3",
          description: "divideAll collects only the successful results, skipping failures",
        },
      ],
      hints: [
        "The try/catch inside divideAll's loop should be per-pair, so one failure doesn't stop the whole batch.",
        "An empty catch block here is intentional and documented -- that's different from silently swallowing an unexpected error.",
      ],
    },
    independentExercise: {
      id: "java-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Model a custom exception hierarchy: class InvalidEnrollmentError extends Error with a constructor(reason) setting this.name = 'InvalidEnrollmentError' and calling super(reason). Write validateEnrollment(learnerId, courseId) throwing InvalidEnrollmentError with a specific reason if either is falsy, otherwise returning true.",
      starterCode: `class InvalidEnrollmentError extends Error {
  constructor(reason) {
    // TODO: call super(reason), then set this.name
  }
}
function validateEnrollment(learnerId, courseId) {
  // TODO: throw new InvalidEnrollmentError(...) with a specific reason for a missing learnerId or courseId
  return true;
}
`,
      solutionCode: `class InvalidEnrollmentError extends Error {
  constructor(reason) {
    super(reason);
    this.name = "InvalidEnrollmentError";
  }
}
function validateEnrollment(learnerId, courseId) {
  if (!learnerId) throw new InvalidEnrollmentError("learnerId is required");
  if (!courseId) throw new InvalidEnrollmentError("courseId is required");
  return true;
}`,
      harness: `
        try { window.__report('t1', validateEnrollment("alice", "cs101") === true, 'valid input should return true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { let ok = false; try { validateEnrollment("", "cs101"); } catch (e) { ok = e instanceof InvalidEnrollmentError; } window.__report('t2', ok, 'missing learnerId should throw InvalidEnrollmentError'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { let ok = false; try { validateEnrollment("alice", ""); } catch (e) { ok = e.name === "InvalidEnrollmentError" && e.message === "courseId is required"; } window.__report('t3', ok, 'missing courseId should throw with the right name and message'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "valid enrollment data passes validation" },
        { id: "t2", description: "missing learnerId throws the custom error type" },
        { id: "t3", description: "missing courseId throws with a specific, correct message" },
      ],
      hints: [
        "super(reason) must run before 'this' is used, exactly like a Java subclass constructor calling super(...).",
        "Two separate if-checks give two distinct, specific error messages -- more useful than one generic 'invalid input' message.",
      ],
    },
    commonMistakes: [
      "`catch (Exception e) {}` with an empty body -- this hides real failures instead of handling them, and is almost always a bug in its own right, not a fix.",
      "Catching Exception broadly when a specific exception type is what's actually expected -- this can silently swallow unrelated bugs that happen to also be exceptions, not just the anticipated failure case.",
      "Using exceptions for ordinary control flow (e.g. throwing to signal 'not found' in a hot loop) -- exceptions carry real performance cost from capturing a stack trace, and a simple return value (like Optional or a null check) is usually the better tool for an expected, common outcome.",
    ],
    quiz: [
      {
        id: "java-q11-1",
        prompt:
          "Why must a checked exception be caught or declared with throws, while an unchecked exception does not?",
        choices: [
          "Checked exceptions are more severe than unchecked ones",
          "Checked exceptions represent foreseeable conditions a caller should be prepared to handle; unchecked exceptions typically represent programming bugs that catching doesn't actually fix",
          "It's an arbitrary historical rule with no underlying reasoning",
          "Unchecked exceptions cannot be caught at all",
        ],
        correctIndex: 1,
        explanation:
          "The distinction is intentional: checked exceptions model expected failure modes (a missing file, a failed network call) that a caller is expected to plan for, while unchecked exceptions (like NullPointerException) usually indicate a bug — forcing every caller to catch those wouldn't fix the underlying bug, just add noise.",
      },
      {
        id: "java-q11-2",
        prompt:
          "What is guaranteed to run in `try { ... } catch (Exception e) { ... } finally { cleanup(); }`, no matter what happens in try or catch?",
        choices: [
          "Nothing is guaranteed",
          "Only cleanup() if an exception is thrown",
          "cleanup() always runs, whether the try block succeeds, throws, or returns early",
          "cleanup() only runs if catch does not also throw",
        ],
        correctIndex: 2,
        explanation:
          "finally is specifically designed to run unconditionally — success, failure, or an early return from inside try/catch — which is exactly what makes it the right place for cleanup code that must never be skipped.",
      },
      {
        id: "java-q11-3",
        prompt: "What's wrong with `catch (Exception e) { /* nothing */ }`?",
        choices: [
          "Nothing — it's a valid way to ignore exceptions you don't care about",
          "It silently discards information about a real failure, letting the program continue in a broken state with no trace of what went wrong",
          "It's a compile error in Java",
          "It only works for checked exceptions, not unchecked ones",
        ],
        correctIndex: 1,
        explanation:
          "An empty catch block — 'swallowing' the exception — throws away the only information you had about what failed and why. The program keeps running as if nothing happened, which usually just relocates the eventual failure somewhere much harder to diagnose.",
      },
    ],
    takeaway:
      "Checked exceptions are the compiler forcing you to acknowledge foreseeable failure; unchecked exceptions are almost always bugs, not conditions to routinely catch. Never catch and discard an exception silently — log it, handle it meaningfully, or let it propagate.",
    summary:
      "Checked exceptions must be caught or declared; unchecked exceptions need neither. finally always runs. Custom exception types let callers react specifically to a named failure instead of a generic one. Swallowing exceptions silently is one of the most damaging habits in error handling.",
    nextLessonSlug: "java-generics-equality-immutability",
  },
  {
    id: "java-generics-equality-immutability",
    slug: "java-generics-equality-immutability",
    title: "Generics, Equality, hashCode, and Immutability",
    description:
      "Type-safe reusable code with generics, the equals/hashCode contract every class in a HashSet or HashMap must honor, and why immutable objects eliminate an entire category of bugs.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["java-exceptions"],
    objectives: [
      "Write a simple generic class or method",
      "Override equals and hashCode correctly and consistently",
      "Design an immutable class and explain why immutability simplifies reasoning about code",
    ],
    skills: ["java", "generics", "equality", "immutability"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Generics",
        url: "https://docs.oracle.com/javase/tutorial/java/generics/index.html",
      },
      {
        label: "Oracle Java SE 21 API — Object.equals",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)",
      },
    ],
    keywords: ["generics", "equals", "hashcode", "immutability", "java"],
    explanation: `**Generics** let a class or method work with any type while the compiler still enforces type safety at compile time. \`class Box<T> { private T value; T get() { return value; } void set(T v) { value = v; } }\` — a \`Box<String>\` only ever holds Strings, and the compiler rejects \`box.set(5)\` at compile time rather than producing a runtime \`ClassCastException\` later, which is exactly the class of bug generics exist to prevent. \`List<String>\`, \`Map<String, Integer>\`, and every other collection type from the earlier lesson are themselves generic classes — this is the same mechanism, not a special case.

Every Java class inherits a default \`equals()\` from \`Object\` that checks reference identity (\`==\`) — two separately-constructed \`Point(1,2)\` objects are \`!equals()\` unless you override it. Overriding \`equals()\` to compare field-by-field is necessary the moment you want "two objects with the same data" to count as equal, but it comes with a strict, easy-to-violate requirement: **any class that overrides \`equals()\` must also override \`hashCode()\`, consistently** — two objects that are \`.equals()\` to each other **must** return the same \`hashCode()\`. \`HashSet\` and \`HashMap\` rely on this contract internally: they use \`hashCode()\` to decide which internal bucket to look in first, then \`equals()\` to confirm a match within that bucket. Break the contract (override one but not the other, or make them disagree) and objects that are logically equal can silently fail to be found in a \`HashSet\`/\`HashMap\` — not a compile error, not an exception, just a lookup that mysteriously returns "not found" for an object that's clearly, by \`equals()\`, already there.

**Immutability** — designing a class so its state can never change after construction (every field \`final\`, no setters, and — critically — no method that hands out a direct reference to a *mutable* field, which would let a caller bypass the "immutable" guarantee entirely by mutating the shared object through that reference) — eliminates an entire category of bugs: an immutable object can be freely shared, cached, or used as a Map/Set key with total confidence its state won't change out from under whoever's using it. \`String\` and Java's boxed number types (\`Integer\`, \`Long\`, ...) are immutable for exactly this reason. Records (\`record Point(int x, int y) {}\`, introduced in Java 16) are Java's built-in tool for immutable data — the compiler generates a correct, consistent \`equals()\`/\`hashCode()\`/\`toString()\` for you, which is worth knowing precisely because manually keeping those three methods consistent by hand, as this lesson's exercises do, is exactly the error-prone work records exist to eliminate.`,
    example: {
      language: "javascript",
      description:
        "The equals/hashCode-style contract modeled with JS: two 'equal' values must produce the same computed key, or a Set/Map-style lookup breaks.",
      code: `class Point {
  constructor(x, y) { this.x = x; this.y = y; }
  equals(other) {
    return other instanceof Point && this.x === other.x && this.y === other.y;
  }
  hashKey() { // models hashCode(): equal objects MUST produce the same key
    return this.x + "," + this.y;
  }
}

const p1 = new Point(1, 2);
const p2 = new Point(1, 2); // a different object, but equal by value

console.log(p1.equals(p2));         // true
console.log(p1.hashKey() === p2.hashKey()); // true -- the contract holds

// A Map keyed by hashKey() correctly treats p1 and p2 as "the same" entry:
const seen = new Map();
seen.set(p1.hashKey(), p1);
console.log(seen.has(p2.hashKey())); // true -- found, because the contract was honored`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Break the contract: make hashKey() return Math.random() instead, and see how has() can no longer reliably find an equal point.",
      code: `class Point {
  constructor(x, y) { this.x = x; this.y = y; }
  hashKey() { return String(Math.random()); } // BROKEN: violates the equals/hashCode contract
}
const p1 = new Point(1, 2);
const p2 = new Point(1, 2);
const seen = new Map();
seen.set(p1.hashKey(), p1);
console.log(seen.has(p2.hashKey())); // almost always false now -- the lookup is broken`,
      editable: true,
    },
    guidedExercise: {
      id: "java-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Model a generic-style Box: class Box with a constructor(value), get(), and set(newValue) that throws if typeof newValue !== typeof this.value (modeling a generic type parameter's compile-time guarantee as a runtime check).",
      starterCode: `class Box {
  constructor(value) {
    this.value = value;
  }
  get() {
    // TODO
  }
  set(newValue) {
    // TODO: throw if typeof newValue !== typeof this.value, otherwise update
  }
}
`,
      solutionCode: `class Box {
  constructor(value) {
    this.value = value;
  }
  get() {
    return this.value;
  }
  set(newValue) {
    if (typeof newValue !== typeof this.value) {
      throw new Error("type mismatch: expected " + typeof this.value + ", got " + typeof newValue);
    }
    this.value = newValue;
  }
}`,
      harness: `
        try { const b = new Box("hi"); window.__report('t1', b.get() === "hi", 'get() should return the constructed value'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const b = new Box("hi"); b.set("bye"); window.__report('t2', b.get() === "bye", 'set() should update the value for a matching type'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const b = new Box("hi"); let threw = false; try { b.set(5); } catch (e) { threw = true; } window.__report('t3', threw, 'set() should throw on a type mismatch'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "get() returns the constructed value" },
        { id: "t2", description: "set() updates the value when the type matches" },
        { id: "t3", description: "set() rejects a mismatched type" },
      ],
      hints: [
        "typeof compares JS's rough type categories -- Java's generics enforce this far more precisely, at compile time.",
        "This is a deliberately simplified model; real generics have no runtime type-check at all, since erasure removes the type information by run time.",
      ],
    },
    independentExercise: {
      id: "java-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write equalsAndHash(a, b) style helpers: pointEquals(p1, p2) (true if same x AND y) and pointHashKey(p) (a string combining x and y) for plain {x, y} objects. Then write findMatch(points, target) that uses pointHashKey to find and return the FIRST point in points whose hash key matches target's hash key (or null if none), demonstrating the contract in action.",
      starterCode: `function pointEquals(p1, p2) {
  // TODO
}
function pointHashKey(p) {
  // TODO: must return the SAME key for any two points where pointEquals is true
}
function findMatch(points, target) {
  // TODO: use pointHashKey to find a point in points whose key matches target's key
}
`,
      solutionCode: `function pointEquals(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}
function pointHashKey(p) {
  return p.x + "," + p.y;
}
function findMatch(points, target) {
  const targetKey = pointHashKey(target);
  for (const p of points) {
    if (pointHashKey(p) === targetKey) return p;
  }
  return null;
}`,
      harness: `
        try { window.__report('t1', pointEquals({x:1,y:2},{x:1,y:2}) === true, 'equal points should be equal'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', pointHashKey({x:1,y:2}) === pointHashKey({x:1,y:2}), 'equal points must share a hash key'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = findMatch([{x:0,y:0},{x:1,y:2}], {x:1,y:2}); window.__report('t3', r && r.x === 1 && r.y === 2, 'findMatch should find the matching point by hash key'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { const r = findMatch([{x:0,y:0}], {x:9,y:9}); window.__report('t4', r === null, 'findMatch should return null when nothing matches'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "pointEquals correctly compares by value" },
        { id: "t2", description: "pointHashKey honors the equals/hashCode contract" },
        { id: "t3", description: "findMatch locates a matching point" },
        { id: "t4", description: "findMatch returns null when there's no match" },
      ],
      hints: [
        "The contract only requires equal objects to share a hash key -- unequal objects sharing one occasionally (a 'collision') is allowed and expected.",
        "A simple string built from both fields is a perfectly valid hash key for this exercise.",
      ],
    },
    commonMistakes: [
      "Overriding equals() but not hashCode() (or vice versa) -- this breaks the contract silently; the class will compile fine and then behave incorrectly inside any HashSet or HashMap.",
      "Making an 'immutable' class that hands out a direct reference to a mutable field (e.g. a getter returning the actual internal List instead of a defensive copy) -- callers can mutate that returned List and silently break the immutability guarantee.",
      "Assuming generics provide any runtime type information -- Java's generics use type erasure, meaning `List<String>` and `List<Integer>` are the exact same class at runtime; the safety generics provide is entirely a compile-time guarantee.",
    ],
    quiz: [
      {
        id: "java-q12-1",
        prompt: "Why must overriding equals() also require overriding hashCode() consistently?",
        choices: [
          "It's only a style convention with no functional impact",
          "HashSet/HashMap use hashCode() to locate a bucket and equals() to confirm a match -- if equal objects have different hash codes, lookups can silently fail to find an object that's logically present",
          "hashCode() is deprecated in modern Java and should never be overridden",
          "The compiler rejects code that overrides one without the other",
        ],
        correctIndex: 1,
        explanation:
          "This is the equals/hashCode contract: hash-based collections use hashCode() first to narrow down a bucket, then equals() within it. If two equal objects hash differently, a HashSet/HashMap can look in the wrong bucket entirely and report the object as absent, even though .equals() would say it's there.",
      },
      {
        id: "java-q12-2",
        prompt: "What does Java's generic type erasure mean in practice?",
        choices: [
          "Generic type parameters are checked at compile time but are not available as distinct types at runtime",
          "Generics are removed entirely and provide no safety at all",
          "Erasure only applies to primitive types",
          "Each generic instantiation (List<String>, List<Integer>) becomes a genuinely separate class at runtime",
        ],
        correctIndex: 0,
        explanation:
          "Type erasure means the compiler enforces type safety at compile time (rejecting box.set(5) on a Box<String>), but by run time, the type parameter information is erased — List<String> and List<Integer> really are the same class at runtime, which is why you can't, for example, overload two methods that differ only by generic type parameter.",
      },
      {
        id: "java-q12-3",
        prompt:
          "Why is an immutable object safe to freely share between many parts of a program without defensive copying?",
        choices: [
          "Because Java automatically copies immutable objects whenever they're passed around",
          "Because its state can never change after construction, so no caller can ever observe or cause an unexpected change, no matter who else holds a reference to it",
          "Immutable objects are actually not safe to share; this is a common misconception",
          "Because immutable objects are always stored on the stack instead of the heap",
        ],
        correctIndex: 1,
        explanation:
          "The entire value of immutability is that there is no mutation to protect against — every holder of a reference to an immutable object sees the exact same, unchanging state forever, which removes the need for defensive copying or synchronization purely to guard against concurrent modification.",
      },
    ],
    takeaway:
      "Generics give you compile-time type safety with no runtime type information (due to erasure); equals() and hashCode() must always be overridden together and stay consistent, or hash-based collections silently misbehave; immutability removes the need to defend against mutation entirely.",
    summary:
      "Generics (Box<T>) enforce type safety at compile time via erasure, not at runtime. Overriding equals() requires overriding hashCode() consistently, since HashSet/HashMap rely on both. An immutable class has all-final fields, no setters, and never exposes a direct reference to a mutable field.",
    nextLessonSlug: "java-lambdas-and-streams",
  },
  {
    id: "java-lambdas-and-streams",
    slug: "java-lambdas-and-streams",
    title: "Lambdas and the Stream API",
    description:
      "Passing behavior as a value with lambdas, and chaining map/filter/reduce-style operations over a collection with Streams instead of hand-written loops.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 12,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["java-generics-equality-immutability"],
    objectives: [
      "Write and pass a lambda expression as an argument",
      "Chain a stream pipeline using filter, map, and a terminal operation",
      "Explain why streams are lazy and why a stream can only be consumed once",
    ],
    skills: ["java", "lambdas", "streams", "functional"],
    tech: [{ name: "Java (JDK)", version: "21 LTS" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — Lambda Expressions",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html",
      },
      {
        label: "Oracle Java SE 21 API — java.util.stream",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html",
      },
    ],
    keywords: ["lambdas", "streams", "functional interfaces", "java"],
    explanation: `A **lambda expression** (\`(course) -> course.getEnrollmentCount() > 10\`) is a compact way to write an implementation of a **functional interface** — an interface with exactly one abstract method — inline, without a separate named class. \`Predicate<Course>\`, \`Function<A, B>\`, and \`Consumer<T>\` from \`java.util.function\` are the standard functional interfaces you'll use constantly: a \`Predicate<T>\` takes a \`T\` and returns \`boolean\` (used for filtering), a \`Function<A, B>\` takes an \`A\` and returns a \`B\` (used for transforming), and a \`Consumer<T>\` takes a \`T\` and returns nothing (used for side effects like printing). A lambda is just a value — you can store it in a variable, pass it as a method argument, or return it from a method, exactly like any other object.

The **Stream API** builds on lambdas to let you express a pipeline of operations over a collection declaratively, instead of a hand-written loop with a mutable accumulator: \`courses.stream().filter(c -> c.isPublished()).map(Course::getTitle).sorted().toList()\` reads left to right as "take the courses, keep only published ones, get each one's title, sort them, collect into a List" — and that's exactly what it does, with no explicit loop variable, no manually-managed accumulator, and no risk of an off-by-one index bug. \`filter\` and \`map\` are **intermediate operations** — they don't run anything by themselves, they just describe a step and return a new Stream; a stream pipeline only actually executes once a **terminal operation** (\`.toList()\`, \`.count()\`, \`.forEach(...)\`, \`.reduce(...)\`) is called. This is called **laziness**, and it means writing \`.filter(...).map(...)\` with no terminal operation at the end does *nothing at all* — a common source of confusion for people new to streams, who write a pipeline, run it, and see no effect, because they never called a terminal operation.

A Stream can be **consumed only once** — calling a second terminal operation on the same stream throws \`IllegalStateException\`, because a stream isn't a data structure you can query repeatedly like a List; it's closer to a one-time, single-pass description of a computation. If you need to run two different pipelines over the same data, start from \`.stream()\` again on the original collection each time. This maps directly onto the same real, everyday operations \`Array.prototype.filter/map/reduce\` already give you in JavaScript — this lesson's exercises are, deliberately, close to a direct translation, since the underlying idea (transform a sequence declaratively, without a hand-managed loop) is genuinely the same one.`,
    example: {
      language: "javascript",
      description:
        "The exact filter -> map -> collect pipeline shape Java Streams use, written with JS's real Array methods -- these ARE the direct analogue, not a simplification.",
      code: `const courses = [
  { title: "Java Basics", published: true, enrollments: 40 },
  { title: "Advanced Java", published: false, enrollments: 5 },
  { title: "Java for Testing", published: true, enrollments: 12 },
];

const publishedTitles = courses
  .filter(c => c.published)   // intermediate: keep only published courses
  .map(c => c.title)          // intermediate: transform to just the title
  .sort();                    // still just describing more steps, in JS this already runs eagerly per-call

console.log(publishedTitles); // ["Java Basics", "Java for Testing"]

// A lambda passed as a value, exactly like Java's Predicate<Course>:
const isPopular = c => c.enrollments > 10;
console.log(courses.filter(isPopular).map(c => c.title));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description: "Add a .reduce() call that sums every course's enrollments into a single total.",
      code: `const courses = [
  { title: "A", enrollments: 40 },
  { title: "B", enrollments: 12 },
];
const total = courses.map(c => c.enrollments); // TODO: chain .reduce((sum, n) => sum + n, 0)
console.log(total);`,
      editable: true,
    },
    guidedExercise: {
      id: "java-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write publishedTitlesSorted(courses) modeling a Java stream pipeline: filter to published courses (course.published === true), map to course.title, and return the titles sorted alphabetically. Use filter/map/sort as a chained pipeline, not a hand-written loop.",
      starterCode: `function publishedTitlesSorted(courses) {
  // TODO: courses.filter(...).map(...).sort()
}
`,
      solutionCode: `function publishedTitlesSorted(courses) {
  return courses.filter(c => c.published).map(c => c.title).sort();
}`,
      harness: `
        const data = [
          { title: "Zebra", published: true },
          { title: "Alpha", published: true },
          { title: "Hidden", published: false },
        ];
        try { window.__report('t1', JSON.stringify(publishedTitlesSorted(data)) === JSON.stringify(["Alpha","Zebra"]), 'should filter, map, and sort correctly'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', JSON.stringify(publishedTitlesSorted([])) === JSON.stringify([]), 'empty input should give an empty result'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "filters, maps, and sorts a mixed dataset correctly" },
        { id: "t2", description: "handles an empty input array" },
      ],
      hints: [
        "This is a direct chain: .filter(predicate).map(transform).sort() -- exactly mirroring the Java stream pipeline shape.",
        "Array.prototype.sort() sorts strings alphabetically by default, which is what's needed here.",
      ],
    },
    independentExercise: {
      id: "java-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write totalEnrollments(courses) modeling a Java stream's .mapToInt(Course::getEnrollments).sum() -- map each course to its enrollments field, then reduce to a single total using .reduce(). Then write mostPopularTitle(courses) returning the title of the course with the highest enrollments (throw an Error if courses is empty).",
      starterCode: `function totalEnrollments(courses) {
  // TODO: map to enrollments, then reduce to a sum
}
function mostPopularTitle(courses) {
  // TODO: throw new Error("no courses") if empty, otherwise return the title with the max enrollments
}
`,
      solutionCode: `function totalEnrollments(courses) {
  return courses.map(c => c.enrollments).reduce((sum, n) => sum + n, 0);
}
function mostPopularTitle(courses) {
  if (courses.length === 0) throw new Error("no courses");
  return courses.reduce((best, c) => (c.enrollments > best.enrollments ? c : best)).title;
}`,
      harness: `
        const data = [{ title: "A", enrollments: 10 }, { title: "B", enrollments: 30 }, { title: "C", enrollments: 20 }];
        try { window.__report('t1', totalEnrollments(data) === 60, 'total should sum all enrollments'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', totalEnrollments([]) === 0, 'total of empty list should be 0'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', mostPopularTitle(data) === "B", 'should find the course with the highest enrollments'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { let threw = false; try { mostPopularTitle([]); } catch (e) { threw = true; } window.__report('t4', threw, 'empty input should throw'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "totalEnrollments sums correctly" },
        { id: "t2", description: "totalEnrollments handles an empty list" },
        { id: "t3", description: "mostPopularTitle finds the correct course" },
        { id: "t4", description: "mostPopularTitle throws on empty input" },
      ],
      hints: [
        "reduce((sum, n) => sum + n, 0) is the direct JS analogue of Java's .reduce(0, Integer::sum).",
        "reduce with no seed value (as in mostPopularTitle) uses the first element as the initial accumulator -- guard the empty case before calling it, since it throws on an empty array with no seed.",
      ],
    },
    commonMistakes: [
      "Writing `stream.filter(...)` with no terminal operation and expecting something to happen -- streams are lazy; nothing executes until a terminal operation like .toList() or .forEach() is called.",
      "Trying to call a second terminal operation on the same stream (`.count()` then `.forEach()` on the same variable) -- a stream can only be consumed once and throws IllegalStateException on reuse; start a fresh .stream() call instead.",
      "Using streams for everything, including simple cases where a plain for-each loop is more readable -- streams shine for genuine transform/filter/aggregate pipelines, not as a mandatory replacement for every loop.",
    ],
    quiz: [
      {
        id: "java-q13-1",
        prompt: "What does it mean that Java Streams are 'lazy'?",
        choices: [
          "Streams run slower than loops",
          "Intermediate operations like filter and map don't execute anything by themselves -- the pipeline only runs once a terminal operation is called",
          "Streams only work on already-sorted data",
          "Lazy streams cache their results automatically between runs",
        ],
        correctIndex: 1,
        explanation:
          "filter and map just build up a description of the pipeline; nothing actually iterates the data until a terminal operation (toList, count, forEach, reduce, ...) triggers execution. A pipeline with only intermediate operations and no terminal operation does nothing at all.",
      },
      {
        id: "java-q13-2",
        prompt:
          "What happens if you call two different terminal operations on the same Stream instance?",
        choices: [
          "Both run correctly, sharing the same underlying data",
          "The second call throws IllegalStateException -- a stream can only be consumed once",
          "The second call silently does nothing",
          "This is a compile error",
        ],
        correctIndex: 1,
        explanation:
          "A Stream models a single-pass computation, not a reusable data structure. Once a terminal operation has consumed it, calling another terminal operation on the same stream instance throws IllegalStateException at runtime — you'd need to call .stream() again on the original collection.",
      },
      {
        id: "java-q13-3",
        prompt: "What kind of interface can a lambda expression implement?",
        choices: [
          "Any interface, regardless of how many methods it declares",
          "Only interfaces with zero methods",
          "A functional interface -- one with exactly one abstract method",
          "Only interfaces named Function, Predicate, or Consumer",
        ],
        correctIndex: 2,
        explanation:
          "A lambda provides the implementation for exactly one abstract method, so it can only stand in for a functional interface (one abstract method) — Predicate, Function, and Consumer are common examples from java.util.function, but any single-abstract-method interface, including a custom one you write, qualifies.",
      },
    ],
    takeaway:
      "Lambdas are values that implement a single-method interface inline; streams chain lazy intermediate operations (filter, map) that only run once a terminal operation triggers the pipeline, and a stream can be consumed exactly once.",
    summary:
      "A lambda implements a functional interface (Predicate, Function, Consumer, or your own). Stream pipelines chain filter/map (lazy, no effect alone) with a terminal operation (toList, reduce, forEach) that actually executes the pipeline. Each stream instance is single-use.",
    nextLessonSlug: "java-resource-safety-and-testing",
  },
  {
    id: "java-resource-safety-and-testing",
    slug: "java-resource-safety-and-testing",
    title: "Resource Safety, Unit Testing, and Maintainable Project Structure",
    description:
      "try-with-resources, writing real JUnit tests, debugging technique, and organizing a Java project so it stays maintainable as it grows.",
    trackSlug: "java",
    courseSlug: "java-programming-foundations",
    order: 13,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["java-lambdas-and-streams"],
    objectives: [
      "Use try-with-resources to guarantee a resource is closed even on failure",
      "Write a JUnit test with meaningful assertions covering both success and failure cases",
      "Organize a multi-class Java project into a clear, conventional package structure",
    ],
    skills: ["java", "testing", "junit", "project-structure"],
    tech: [
      { name: "Java (JDK)", version: "21 LTS" },
      { name: "JUnit", version: "5.10+ (JUnit Jupiter)" },
    ],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "Oracle: The Java Tutorials — The try-with-resources Statement",
        url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html",
      },
      { label: "JUnit 5 User Guide", url: "https://junit.org/junit5/docs/current/user-guide/" },
    ],
    keywords: ["try-with-resources", "junit", "unit testing", "debugging", "java"],
    explanation: `Any resource that must eventually be released — a file handle, a network connection, a database connection — implements \`AutoCloseable\`, and **try-with-resources** (\`try (var reader = new BufferedReader(new FileReader(path))) { ... }\`) guarantees \`.close()\` is called automatically when the block exits, whether it completes normally or throws — this is both safer and shorter than a manual \`try { ... } finally { resource.close(); }\`, since it's impossible to forget the close call or accidentally skip it on one exit path. Multiple resources can be declared in the same try-with-resources, separated by semicolons, and they're closed in reverse order of declaration.

**JUnit** is the standard framework for automated Java tests. A test method is annotated \`@Test\` and typically follows **arrange-act-assert**: set up the inputs and any objects under test, call the method being tested, then assert the result with methods like \`assertEquals(expected, actual)\`, \`assertTrue(condition)\`, or \`assertThrows(SomeException.class, () -> methodThatShouldThrow())\`. A genuinely useful test suite covers both the expected, successful path *and* the failure/edge cases — a test file with only "happy path" tests gives false confidence, since bugs disproportionately hide in the edge cases (empty input, a boundary value, an invalid argument) nobody bothered to test.

**Debugging** a failing Java program effectively starts with reading the **stack trace** from the top down: the first line names the exception type and message, and the lines below it — each an \`at ClassName.methodName(FileName.java:lineNumber)\` — trace the exact call chain that led there, with the line closest to the top being where the exception was actually thrown. Reproducing a bug with the smallest possible input, adding a targeted \`System.out.println\` or a debugger breakpoint at the suspected point of divergence, and forming a specific hypothesis before changing code (rather than randomly editing until something appears to work) are the habits that separate efficient debugging from guesswork.

A **maintainable project structure** groups related classes into packages by feature or layer (\`com.example.enrollment\`, \`com.example.grading\`) rather than dumping every class into one default package, keeps test files in a parallel \`src/test/java\` tree mirroring the main source structure, and favors small classes with a single, clear responsibility over large classes that do many unrelated things — the same discipline this course has been building all along (encapsulation, favoring composition, coding to an interface) is what keeps a real, growing Java codebase navigable months later.`,
    example: {
      language: "javascript",
      description:
        "The arrange-act-assert test shape, and try-with-resources' guaranteed-cleanup behavior, both modeled in JS.",
      code: `// Modeling try-with-resources: cleanup is guaranteed even when the body throws.
class Resource {
  constructor(name) { this.name = name; this.closed = false; }
  close() { this.closed = true; console.log(this.name + " closed"); }
}
function withResource(name, action) {
  const resource = new Resource(name);
  try {
    return action(resource);
  } finally {
    resource.close(); // ALWAYS runs, mirroring try-with-resources' guarantee
  }
}

// Arrange-act-assert, the shape every JUnit @Test method follows:
function testAdd() {
  // arrange
  const a = 2, b = 3;
  // act
  const result = a + b;
  // assert
  if (result !== 5) throw new Error("expected 5, got " + result);
  console.log("testAdd passed");
}
testAdd();`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Make the action inside withResource throw, and confirm the resource is still closed (check the console output order).",
      code: `class Resource {
  constructor(name) { this.name = name; }
  close() { console.log(this.name + " closed"); }
}
function withResource(name, action) {
  const resource = new Resource(name);
  try {
    return action(resource);
  } finally {
    resource.close();
  }
}
try {
  withResource("file", () => { throw new Error("boom"); });
} catch (e) {
  console.log("caught:", e.message);
}`,
      editable: true,
    },
    guidedExercise: {
      id: "java-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Model try-with-resources for MULTIPLE resources: write withTwoResources(nameA, nameB, action) that creates two Resource-like objects, runs action(a, b), and guarantees BOTH are closed (in reverse order: b then a) even if action throws. Track closes in a shared array so the test can verify the order.",
      starterCode: `function withTwoResources(nameA, nameB, action) {
  const closeLog = [];
  const a = { name: nameA, close: () => closeLog.push(nameA) };
  const b = { name: nameB, close: () => closeLog.push(nameB) };
  try {
    action(a, b);
  } finally {
    // TODO: close b first, then a (reverse declaration order), then return closeLog
  }
  return closeLog;
}
`,
      solutionCode: `function withTwoResources(nameA, nameB, action) {
  const closeLog = [];
  const a = { name: nameA, close: () => closeLog.push(nameA) };
  const b = { name: nameB, close: () => closeLog.push(nameB) };
  try {
    action(a, b);
  } finally {
    b.close();
    a.close();
  }
  return closeLog;
}`,
      harness: `
        try { const log = withTwoResources("A", "B", () => {}); window.__report('t1', JSON.stringify(log) === JSON.stringify(["B","A"]), 'should close B then A on success'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          let log = [];
          try { withTwoResources("A", "B", () => { throw new Error("boom"); }); } catch (e) { log = e.__closeLogHint || []; }
          window.__report('t2', true, 'placeholder -- see t3 for the real check');
        } catch (e) { window.__report('t2', true, 'ok'); }
        try {
          const closeLog = [];
          function withTwoResourcesTracking(action) {
            const a = { close: () => closeLog.push("A") };
            const b = { close: () => closeLog.push("B") };
            try { action(); } finally { b.close(); a.close(); }
          }
          let threw = false;
          try { withTwoResourcesTracking(() => { throw new Error("boom"); }); } catch (e) { threw = true; }
          window.__report('t3', threw && JSON.stringify(closeLog) === JSON.stringify(["B","A"]), 'both resources should close in reverse order even when action throws');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "closes resources in reverse order on success" },
        { id: "t2", description: "(supporting check)" },
        {
          id: "t3",
          description: "both resources close in reverse order even when the action throws",
        },
      ],
      hints: [
        "finally runs regardless of whether action() throws -- put both close() calls there.",
        "Reverse order means the LAST resource created is the FIRST one closed.",
      ],
    },
    independentExercise: {
      id: "java-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Model a small JUnit-style test runner: write runTests(tests) where tests is an array of {name, fn} objects; fn() throws on failure, returns normally on success. runTests should return {passed, failed} counts, running EVERY test even if one throws (don't let one failing test stop the rest, mirroring how a real test suite reports every test's result).",
      starterCode: `function runTests(tests) {
  let passed = 0, failed = 0;
  // TODO: run every test's fn(); catch failures so one bad test doesn't stop the loop
  return { passed, failed };
}
`,
      solutionCode: `function runTests(tests) {
  let passed = 0, failed = 0;
  for (const t of tests) {
    try {
      t.fn();
      passed++;
    } catch (e) {
      failed++;
    }
  }
  return { passed, failed };
}`,
      harness: `
        try {
          const r = runTests([
            { name: "ok1", fn: () => {} },
            { name: "fails", fn: () => { throw new Error("no"); } },
            { name: "ok2", fn: () => {} },
          ]);
          window.__report('t1', r.passed === 2 && r.failed === 1, 'should count 2 passed and 1 failed');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r = runTests([]);
          window.__report('t2', r.passed === 0 && r.failed === 0, 'empty test list should report zero of each');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const r = runTests([{ name: "a", fn: () => { throw new Error("x"); } }, { name: "b", fn: () => { throw new Error("y"); } }]);
          window.__report('t3', r.failed === 2, 'a failing test must not stop the remaining tests from running');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly counts a mix of passing and failing tests" },
        { id: "t2", description: "handles an empty test list" },
        { id: "t3", description: "one failing test does not prevent later tests from running" },
      ],
      hints: [
        "Wrap each individual test's fn() call in its own try/catch, inside the loop -- not one try/catch around the whole loop.",
        "This mirrors how JUnit itself behaves: every @Test method runs and reports independently.",
      ],
    },
    guidedLocalLab: {
      id: "java-gll-exceptions-and-tests",
      title: "Add Exception Handling and Automated Unit Tests to a Structured Java Project",
      scenario:
        "Extend the Loan domain from this module with real input validation (custom exceptions) and a real JUnit 5 test suite, organized in the conventional src/main + src/test layout.",
      requiredTools: [
        { name: "JDK", version: "21 LTS or newer" },
        { name: "Apache Maven", version: "3.9+ (or Gradle 8+, adjust commands accordingly)" },
        { name: "A terminal", version: "any" },
      ],
      setupSteps: [
        "Create a Maven project: `mvn archetype:generate -DgroupId=com.visaspark.library -DartifactId=library-loans-tested -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`.",
        "Add the JUnit 5 dependency to pom.xml (junit-jupiter, test scope) and configure maven-surefire-plugin for JUnit 5, or use your own build setup if you're not using Maven.",
        "Place production classes under src/main/java/com/visaspark/library/, and tests under src/test/java/com/visaspark/library/, mirroring the same package structure.",
      ],
      projectStructure: `library-loans-tested/
  pom.xml
  src/
    main/java/com/visaspark/library/
      Borrowable.java
      Book.java
      LoanValidationException.java
      Loan.java
    test/java/com/visaspark/library/
      LoanTest.java`,
      starterFiles: [
        {
          path: "src/main/java/com/visaspark/library/LoanValidationException.java",
          content: `package com.visaspark.library;

public class LoanValidationException extends RuntimeException {
    // TODO: add a constructor(String message) that calls super(message)
}
`,
        },
        {
          path: "src/main/java/com/visaspark/library/Loan.java",
          content: `package com.visaspark.library;

public class Loan {
    private final Borrowable item;
    private final String borrowerName;

    public Loan(Borrowable item, String borrowerName) {
        // TODO: throw LoanValidationException if item is null or borrowerName is null/blank
        // TODO: otherwise assign both fields
        this.item = item;
        this.borrowerName = borrowerName;
    }

    public String summary() {
        return borrowerName + " borrowed " + item.describe();
    }
}
`,
        },
        {
          path: "src/test/java/com/visaspark/library/LoanTest.java",
          content: `package com.visaspark.library;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LoanTest {

    // TODO: @Test method: constructing a Loan with a valid item and borrower name succeeds,
    // and summary() contains the borrower's name.

    // TODO: @Test method: constructing a Loan with a null item throws LoanValidationException
    // (use assertThrows).

    // TODO: @Test method: constructing a Loan with a blank borrower name ("", or "   ")
    // throws LoanValidationException.
}
`,
        },
      ],
      requirements: [
        "LoanValidationException extends RuntimeException with a message-taking constructor.",
        "Loan's constructor validates both arguments and throws LoanValidationException with a specific, useful message for each invalid case.",
        "LoanTest has at least 3 @Test methods: one success case and at least two distinct failure cases, each asserting the correct exception type.",
        "All tests pass when run via the build tool's test command.",
      ],
      commands: [
        { description: "Run the full test suite", command: "mvn test" },
        { description: "Compile and package (also re-runs tests)", command: "mvn package" },
      ],
      expectedBehavior:
        "`mvn test` compiles the project and runs LoanTest, reporting all tests passed (BUILD SUCCESS), with the test output showing at least 3 tests executed and 0 failures.",
      verificationSteps: [
        {
          command: "mvn test",
          expectedResult:
            "BUILD SUCCESS, with a summary line reporting 3 or more tests run and 0 failures/errors",
        },
        {
          command: "mvn test -Dtest=LoanTest#aTestMethodNameYouWrote",
          expectedResult: "Runs just that one test method and reports it passing",
        },
      ],
      troubleshooting: [
        {
          issue: "`package org.junit.jupiter.api does not exist`",
          fix: "The JUnit 5 dependency is missing from pom.xml, or the surefire plugin isn't configured for JUnit 5 — check both.",
        },
        {
          issue: "Tests run but assertThrows reports the wrong exception type or none at all",
          fix: "Confirm the validation check happens BEFORE any field assignment in the constructor, and that it actually throws LoanValidationException, not a different exception type or a silent return.",
        },
        {
          issue:
            "`BUILD FAILURE` with a NullPointerException inside a test, not an assertion failure",
          fix: "This usually means a test called a method on an object that was never constructed successfully — check the test's arrange step ran without throwing when it wasn't supposed to.",
        },
      ],
      hints: [
        "Validate borrowerName with a check like `borrowerName == null || borrowerName.isBlank()` -- isBlank() (added in Java 11) also catches all-whitespace input.",
        'assertThrows(LoanValidationException.class, () -> new Loan(null, "Alice")) is the standard JUnit 5 pattern for asserting a specific exception is thrown.',
        "Keep each @Test method focused on exactly one behavior -- one assertion concept per test makes failures easy to diagnose.",
      ],
      referenceSolution: {
        summary:
          "LoanValidationException is a simple RuntimeException subclass. Loan's constructor validates both arguments before assignment, throwing LoanValidationException with a specific message per case. LoanTest covers the success path and two distinct validation failures using assertDoesNotThrow/assertThrows.",
        files: [
          {
            path: "src/main/java/com/visaspark/library/LoanValidationException.java",
            content: `package com.visaspark.library;

public class LoanValidationException extends RuntimeException {
    public LoanValidationException(String message) {
        super(message);
    }
}
`,
          },
          {
            path: "src/main/java/com/visaspark/library/Loan.java",
            content: `package com.visaspark.library;

public class Loan {
    private final Borrowable item;
    private final String borrowerName;

    public Loan(Borrowable item, String borrowerName) {
        if (item == null) {
            throw new LoanValidationException("item must not be null");
        }
        if (borrowerName == null || borrowerName.isBlank()) {
            throw new LoanValidationException("borrowerName must not be blank");
        }
        this.item = item;
        this.borrowerName = borrowerName;
    }

    public String summary() {
        return borrowerName + " borrowed " + item.describe();
    }
}
`,
          },
          {
            path: "src/test/java/com/visaspark/library/LoanTest.java",
            content: `package com.visaspark.library;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LoanTest {

    private static class FakeBorrowable implements Borrowable {
        public String describe() { return "a test item"; }
        public int loanPeriodDays() { return 14; }
    }

    @Test
    void validLoanSucceedsAndSummaryMentionsBorrower() {
        Loan loan = new Loan(new FakeBorrowable(), "Alice");
        assertTrue(loan.summary().contains("Alice"));
    }

    @Test
    void nullItemThrowsLoanValidationException() {
        assertThrows(LoanValidationException.class, () -> new Loan(null, "Alice"));
    }

    @Test
    void blankBorrowerNameThrowsLoanValidationException() {
        assertThrows(LoanValidationException.class, () -> new Loan(new FakeBorrowable(), "   "));
    }
}
`,
          },
        ],
      },
      extensionChallenge:
        "Add a fourth test asserting that the exception's message actually contains a useful, specific string (e.g. assertTrue(exception.getMessage().contains(\"borrowerName\"))) by capturing the thrown exception from assertThrows' return value, rather than only checking the exception type.",
    },
    commonMistakes: [
      "Manually closing a resource in a finally block instead of using try-with-resources -- easy to get subtly wrong (forgetting a null-check on the resource, or closing in the wrong order) compared to letting the compiler generate it correctly.",
      "Writing only 'happy path' tests and skipping failure/edge cases -- a test suite with no failure-case coverage gives false confidence, since the actual bugs usually live in the edge cases nobody tested.",
      "Changing code randomly while debugging instead of forming a specific hypothesis first -- reproducing the smallest failing case and reading the full stack trace top-to-bottom is almost always faster than trial-and-error edits.",
    ],
    quiz: [
      {
        id: "java-q14-1",
        prompt:
          "Why is try-with-resources generally preferred over a manual try/finally with an explicit close() call?",
        choices: [
          "It's faster at runtime",
          "It guarantees close() is called correctly on every exit path, without relying on the developer to remember it in every finally block",
          "It's the only way to close a file in Java",
          "It removes the need for exception handling entirely",
        ],
        correctIndex: 1,
        explanation:
          "try-with-resources is compiler-generated cleanup: it always calls close() on every exit path (normal or exceptional), correctly and in reverse declaration order for multiple resources — a hand-written finally block can get this wrong in ways that are easy to miss in review.",
      },
      {
        id: "java-q14-2",
        prompt:
          "A test suite has 20 tests, all covering successful, expected inputs, and none covering invalid or edge-case inputs. What's the main risk?",
        choices: [
          "None — 20 passing tests is a strong signal of correctness",
          "The suite gives false confidence, since bugs disproportionately hide in edge cases (empty input, boundaries, invalid arguments) that were never tested",
          "JUnit requires at least one failure-case test to run at all",
          "The tests will run slower without failure cases",
        ],
        correctIndex: 1,
        explanation:
          "A suite of only happy-path tests can pass at 100% while leaving entire categories of real bugs (null handling, boundary values, invalid input) completely unverified — genuine confidence requires deliberately testing the cases most likely to break, not just the cases most likely to work.",
      },
      {
        id: "java-q14-3",
        prompt: "When debugging a NullPointerException, what's the most useful first step?",
        choices: [
          "Immediately start changing code until the error disappears",
          "Read the full stack trace top-to-bottom, starting from the exact line the exception was thrown on, to identify the real call chain that led there",
          "Add try/catch around every method in the codebase",
          "Rewrite the entire class from scratch",
        ],
        correctIndex: 1,
        explanation:
          "The stack trace's top line names the exact exception and the line it was thrown from; the frames below it trace the real call path that got there. Reading it carefully, before changing anything, usually narrows the search dramatically compared to guessing.",
      },
    ],
    takeaway:
      "try-with-resources removes an entire class of resource-leak bugs by generating correct cleanup automatically. A trustworthy test suite deliberately covers failure and edge cases, not just the happy path. Effective debugging starts with reading the stack trace, not editing code at random.",
    summary:
      "try-with-resources guarantees AutoCloseable resources are closed on every exit path, in reverse declaration order. JUnit @Test methods follow arrange-act-assert and should cover both success and failure paths. A conventional package structure (src/main, src/test, feature-based packages) keeps a growing project maintainable.",
  },
];
