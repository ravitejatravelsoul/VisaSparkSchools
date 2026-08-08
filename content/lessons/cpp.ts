import type { LessonInput } from "@/lib/content/types";

/**
 * C++ Programming lessons. C++ has no safe, small in-browser execution
 * option (see docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md) -- worse
 * than plain C, since templates/STL genuinely need a real compiler -- so
 * every lesson uses a `guidedOutputLab` (read/predict/fill-in-blank/guided-
 * editing against a precomputed "Expected output") instead of `example`/
 * `guidedExercise`/`independentExercise` -- see lib/content/types.ts's
 * Phase 6/8 note and components/runners/guided-output-panel.tsx. Every code
 * sample and its expected output were verified by hand against real C++
 * semantics, including default std::cout float formatting (general/%g-style
 * formatting with precision 6, trailing zeros and a bare decimal point
 * dropped).
 */
export const cppLessons: LessonInput[] = [
  {
    id: "cpp-introduction-and-what-cpp-adds",
    slug: "cpp-introduction-and-what-cpp-adds",
    title: "Introduction to C++: What It Adds Over C",
    description: "iostream vs stdio, std::string vs C strings, and why C++ exists alongside C.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain what C++ adds over C: classes, templates, a larger standard library",
      "Contrast iostream's std::cout with C's printf, and std::string with a C char array",
      "Identify the parts of a minimal C++ program: #include <iostream>, main, std::cout",
    ],
    skills: ["cpp-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "cppreference: C++", url: "https://en.cppreference.com/w/cpp" },
      { label: "cppreference: C++ language", url: "https://en.cppreference.com/w/cpp/language" },
    ],
    keywords: ["c++ introduction", "iostream", "std::string", "std::cout"],
    explanation: `C++ began as "C with classes" and grew into a language that keeps C's low-level control and performance while adding object-oriented programming (classes), generic programming (templates), and a much larger standard library -- the Standard Template Library (STL) you'll meet later in this course. Game engines, high-frequency trading systems, and large performance-critical applications commonly use C++ specifically because it lets you write high-level, organized code without giving up direct control over memory and performance when you need it.

Where C uses \`printf\`/\`scanf\` from \`<stdio.h>\` with format-specifier strings, C++ commonly uses \`<iostream>\`'s \`std::cout\` (output) and \`std::cin\` (input) with the \`<<\` and \`>>\` operators instead: \`std::cout << "Hello, C++!" << std::endl;\`. There's no format string to keep in sync with your argument types -- the compiler already knows each value's type and formats it correctly, which removes an entire category of C's format-specifier mismatch bugs.

C++ also adds \`std::string\` (from \`<string>\`) as a real string type, distinct from a raw C char array: it tracks its own length, resizes itself as needed, and supports \`+\` for concatenation directly -- no manual null-terminator bookkeeping or fixed buffer sizing required, though C strings and C-style arrays remain fully valid and sometimes necessary in C++ too, especially at the boundary with C libraries.

Because a real C++ compiler has to handle templates and a large standard library, this platform can't safely compile or execute C++ in your browser (see this course's guided-lab notice on every lesson) -- even more so than for plain C. Every lesson instead gives you real C++ source code to read and predict, exactly the skill you'll rely on constantly when working with someone else's C++ codebase.`,
    commonMistakes: [
      "Assuming std::cout needs a format-specifier string the way printf does -- it doesn't; the compiler already knows each argument's type.",
      "Treating std::string exactly like a C char array, forgetting it manages its own length and resizing automatically.",
      "Forgetting `#include <iostream>` (for std::cout) or `#include <string>` (for std::string) and being confused by the resulting compile error.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does C++ add on top of what C already provides?",
        choices: [
          "Nothing meaningful -- they're the same language",
          "Classes, templates, and a much larger standard library",
          "Only a different file extension",
          "Automatic memory management identical to Python's",
        ],
        correctIndex: 1,
        explanation:
          "C++ adds object-oriented programming, templates (generics), and a large standard library over C.",
      },
      {
        id: "q2",
        prompt: "What operator does std::cout use to output a value?",
        choices: ["%", "<<", "->", "::"],
        correctIndex: 1,
        explanation: "std::cout uses the << (stream insertion) operator to output values.",
      },
      {
        id: "q3",
        prompt: "How does std::string differ from a raw C char array?",
        choices: [
          "It's identical in every way",
          "It manages its own length and resizes itself automatically",
          "It can only ever hold a single character",
          "It requires manual null-terminator management, same as a C string",
        ],
        correctIndex: 1,
        explanation:
          "std::string tracks its own length and grows as needed, unlike a fixed-size C char array.",
      },
    ],
    takeaway:
      "C++ keeps C's performance and control while adding classes, templates, and a real std::string/std::cout-based standard library that removes much of C's manual bookkeeping.",
    summary:
      "C++ extends C with object-oriented and generic programming; std::cout/std::cin replace format-specifier-driven printf/scanf, and std::string replaces manual char-array string handling.",
    guidedOutputLab: {
      id: "cpp-lab-hello-world",
      title: "Predict: A minimal C++ program",
      language: "C++",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints when compiled and run.",
      steps: [
        {
          code: `#include <iostream>
#include <string>

int main() {
    std::string message = "Hello, C++!";
    std::cout << message << std::endl;
    std::cout << "2 + 2 = " << 2 + 2 << std::endl;
    return 0;
}`,
          expectedOutput: "Hello, C++!\n2 + 2 = 4",
        },
      ],
      hints: [
        "std::endl outputs a newline (and flushes the stream), similar in effect to `\\n` in a C printf call.",
        "Chained << calls each output the next value in sequence, left to right.",
      ],
    },
    nextLessonSlug: "cpp-variables-references-and-auto",
  },
  {
    id: "cpp-variables-references-and-auto",
    slug: "cpp-variables-references-and-auto",
    title: "Variables, References, and auto",
    description: "Declaring variables, C++'s reference type, and type inference with auto.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Declare a reference and explain that it's an alias for an existing variable, not a copy",
      "Use auto to let the compiler infer a variable's type from its initializer",
      "Predict that modifying a reference modifies the variable it refers to",
    ],
    skills: ["cpp-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: References",
        url: "https://en.cppreference.com/w/cpp/language/reference",
      },
    ],
    keywords: ["c++ references", "auto keyword", "type inference"],
    explanation: `A C++ **reference**, declared with \`&\` after the type, creates an alias for an existing variable rather than a copy of it: \`int &ageRef = age;\` makes \`ageRef\` refer to the exact same memory as \`age\`. Unlike a pointer, a reference must be initialized at declaration (it can never be "null" or left unset), and it can never be reseated to refer to a different variable afterward -- once bound, \`ageRef\` always means \`age\`, for its entire lifetime. Reading or writing \`ageRef\` reads or writes \`age\` itself, directly, with no dereference operator needed.

C++11 introduced \`auto\`, which lets the compiler infer a variable's type from its initializer instead of you spelling it out: \`auto pi = 3.14159;\` deduces \`pi\` as a \`double\`, exactly as if you'd written \`double pi = 3.14159;\`. This is a genuine convenience for long or awkward-to-spell types (you'll see this matter more once templates and iterators are introduced later in this course), though for simple types like \`int\` or \`double\`, writing the type explicitly is often just as clear.

Together, references and \`auto\` are two of the ways modern C++ reduces boilerplate compared to plain C, while still being fully statically typed underneath -- \`auto\` doesn't make C++ dynamically typed; the type is still fixed once deduced, just inferred rather than written out by hand.`,
    commonMistakes: [
      "Trying to declare a reference without initializing it immediately -- unlike a pointer, a reference must be bound to a real variable at the moment it's declared.",
      "Assuming a reference can be reseated to refer to a different variable later, the way a pointer can be reassigned.",
      "Assuming `auto` makes a variable's type flexible or dynamic -- the type is still fixed at compile time, just inferred rather than written explicitly.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is a C++ reference?",
        choices: [
          "A copy of a variable's current value",
          "An alias for an existing variable, referring to the same memory",
          "A pointer that can be null",
          "A function that returns a variable's address",
        ],
        correctIndex: 1,
        explanation: "A reference is an alias for an existing variable, not a separate copy.",
      },
      {
        id: "q2",
        prompt:
          "Can a C++ reference be reseated to refer to a different variable after it's declared?",
        choices: [
          "Yes, freely, like a pointer",
          "No -- once bound, it always refers to the same variable",
          "Only if declared with auto",
          "Only inside a function body",
        ],
        correctIndex: 1,
        explanation: "A reference is permanently bound to the variable it was initialized with.",
      },
      {
        id: "q3",
        prompt: "What does `auto pi = 3.14159;` do?",
        choices: [
          "Declares pi with a dynamic, changeable type",
          "Lets the compiler infer pi's type (double) from the initializer, fixed from then on",
          "Is a compile error -- auto requires an explicit type too",
          "Declares pi as a string",
        ],
        correctIndex: 1,
        explanation:
          "auto infers a fixed type from the initializer at compile time; it isn't dynamic typing.",
      },
    ],
    takeaway:
      "A reference is a permanent alias for an existing variable (must be initialized immediately, never reseated); auto infers a fixed type from its initializer, reducing boilerplate without sacrificing static typing.",
    summary:
      "References alias an existing variable directly, with no dereference syntax needed; auto lets the compiler infer a variable's type from its initializer, still fully static underneath.",
    guidedOutputLab: {
      id: "cpp-lab-references-and-auto",
      title: "Predict: A reference and auto-deduced variable",
      language: "C++",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `#include <iostream>

int main() {
    int age = 30;
    int &ageRef = age;

    ageRef = 31;
    std::cout << "age: " << age << std::endl;

    auto pi = 3.14159;
    std::cout << "pi: " << pi << std::endl;

    return 0;
}`,
          expectedOutput: "age: 31\npi: 3.14159",
        },
      ],
      hints: [
        "ageRef is an alias for age, so assigning to ageRef changes age itself directly.",
        "auto deduces pi as a double from its initializer 3.14159.",
      ],
    },
    nextLessonSlug: "cpp-control-flow-and-overloading",
  },
  {
    id: "cpp-control-flow-and-overloading",
    slug: "cpp-control-flow-and-overloading",
    title: "Control Flow and Function Overloading",
    description:
      "C++'s familiar control flow, plus function overloading -- something plain C doesn't allow.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Write if/else, for, and while exactly as in C -- C++ keeps the same core syntax",
      "Define two functions with the same name but different parameter types (overloading)",
      "Predict which overload the compiler selects based on an argument's type",
    ],
    skills: ["cpp-basics", "cpp-functions"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Overload resolution",
        url: "https://en.cppreference.com/w/cpp/language/overload_resolution",
      },
    ],
    keywords: ["c++ control flow", "function overloading", "overload resolution"],
    explanation: `C++'s core control-flow keywords -- \`if\`/\`else\`, \`for\`, \`while\`, \`do-while\`, and \`switch\` -- work exactly as they do in C, including switch's fallthrough-by-default behavior. If you're comfortable with C's control flow, there's nothing new to learn here syntactically.

Where C++ genuinely diverges from C is **function overloading**: C++ allows multiple functions to share the same name as long as their parameter types differ, something plain C does not permit at all. \`void printValue(int x)\` and \`void printValue(double x)\` can coexist -- the compiler picks the right one, called **overload resolution**, based on the type of the argument at each call site: \`printValue(5)\` calls the \`int\` version, \`printValue(5.0)\` calls the \`double\` version.

This is possible because C++ compilers use **name mangling** internally -- each overload actually gets a distinct internal symbol name encoding its parameter types, even though your source code refers to both simply as \`printValue\`. It's the same underlying idea that later lets templates generate a distinct function for each type they're used with. Overloading lets you present one clear, conceptual name for an operation ("print this value") while still handling different types with genuinely different code underneath.`,
    commonMistakes: [
      "Assuming plain C allows function overloading the same way -- it doesn't; this is a genuine C++-only feature.",
      "Expecting overload resolution to consider a function's return type -- it's based on argument types, not what the caller does with the result.",
      "Writing two overloads that are ambiguous for a given call (e.g. both requiring the same implicit conversion), which is a compile error, not a runtime choice.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Does plain C allow function overloading (same name, different parameter types)?",
        choices: [
          "Yes, identically to C++",
          "No -- this is a C++-only feature",
          "Only for functions returning void",
          "Only for functions with exactly one parameter",
        ],
        correctIndex: 1,
        explanation: "Function overloading is a genuine C++ addition; plain C does not support it.",
      },
      {
        id: "q2",
        prompt: "What determines which overload of printValue the compiler selects at a call site?",
        choices: [
          "The function's return type",
          "The type(s) of the argument(s) passed at that call site",
          "The order the overloads were declared in",
          "Random selection at runtime",
        ],
        correctIndex: 1,
        explanation:
          "Overload resolution is based on matching the call site's argument types against each overload's parameters.",
      },
      {
        id: "q3",
        prompt: "Do C++'s if/for/while keywords work differently from C's?",
        choices: [
          "Yes, entirely different syntax",
          "No -- C++ keeps the same core control-flow syntax as C",
          "Only for-loops differ",
          "Only switch differs",
        ],
        correctIndex: 1,
        explanation: "C++ inherits C's core control-flow syntax essentially unchanged.",
      },
    ],
    takeaway:
      "C++'s control-flow keywords match C's exactly, but C++ adds function overloading -- multiple same-named functions distinguished by parameter type, resolved by the compiler at each call site.",
    summary:
      "if/for/while/switch work the same as in C; function overloading, resolved by argument type at each call site, is a genuine C++-only addition C lacks entirely.",
    guidedOutputLab: {
      id: "cpp-lab-overloading",
      title: "Predict: Overload resolution inside a loop",
      language: "C++",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `#include <iostream>

void printValue(int x) {
    std::cout << "int: " << x << std::endl;
}

void printValue(double x) {
    std::cout << "double: " << x << std::endl;
}

int main() {
    for (int i = 1; i <= 3; i++) {
        if (i % 2 == 0) {
            printValue(i);
        } else {
            printValue(i * 1.0);
        }
    }
    return 0;
}`,
          expectedOutput: "double: 1\nint: 2\ndouble: 3",
        },
      ],
      hints: [
        "i * 1.0 produces a double, so odd values of i (1 and 3) call the double overload.",
        "Even i (just 2 here) is passed directly as an int, calling the int overload.",
      ],
    },
    nextLessonSlug: "cpp-classes-constructors-destructors",
  },
  {
    id: "cpp-classes-constructors-destructors",
    slug: "cpp-classes-constructors-destructors",
    title: "Classes, Constructors, and Destructors",
    description:
      "Defining a class, and the automatic construction/destruction lifecycle every object gets.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Define a class with a constructor that initializes its member data",
      "Define a destructor and explain when it runs automatically",
      "Predict the exact order constructor, method calls, and destructor run in for a simple scoped object",
    ],
    skills: ["cpp-classes"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Constructors and member initializer lists",
        url: "https://en.cppreference.com/w/cpp/language/constructor",
      },
    ],
    keywords: ["c++ classes", "constructors", "destructors"],
    explanation: `A \`class\` groups data (member variables) and behavior (member functions) together. A **constructor** is a special member function, named exactly the same as the class, that runs automatically whenever an object is created -- it's where you initialize the object's data: \`Greeter(std::string name) : name_(name) { ... }\`. The \`: name_(name)\` part is a **member initializer list**, the preferred way to set a member variable's initial value directly, before the constructor's body even runs.

A **destructor**, named with a \`~\` before the class name (\`~Greeter() { ... }\`), runs automatically when an object's lifetime ends -- for a local (stack) object, that's the moment it goes out of scope, with no explicit call needed anywhere in your code. This automatic, guaranteed cleanup is central to how C++ manages resources safely, and you'll build directly on it in this course's RAII lesson.

Putting these together: creating a \`Greeter g("Ada");\` calls the constructor immediately, calling \`g.greet()\` runs that member function whenever you call it explicitly, and once \`main\` reaches its closing brace, \`g\` goes out of scope and its destructor runs automatically -- in that exact order, deterministically, which is why you can predict a program's full output including cleanup, not just its "main" logic.`,
    commonMistakes: [
      "Forgetting a constructor runs automatically on object creation -- there's no separate 'init' call needed or expected.",
      "Assuming a destructor must be called explicitly, rather than running automatically when a local object goes out of scope.",
      "Confusing the member initializer list (`: name_(name)`) with an assignment inside the constructor's body -- the initializer list runs first, before the body executes.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "When does a class's constructor run?",
        choices: [
          "Only when explicitly called by name",
          "Automatically, whenever an object of that class is created",
          "Only at program startup, regardless of when the object is created",
          "Only if the class has no destructor",
        ],
        correctIndex: 1,
        explanation:
          "A constructor runs automatically at the moment an object of its class is created.",
      },
      {
        id: "q2",
        prompt: "For a local (stack) object, when does its destructor run?",
        choices: [
          "It must be called manually",
          "Automatically, when the object goes out of scope",
          "Only when the program exits",
          "Destructors never run for local objects",
        ],
        correctIndex: 1,
        explanation:
          "A local object's destructor runs automatically the moment it goes out of scope.",
      },
      {
        id: "q3",
        prompt: "How is a destructor named?",
        choices: [
          "destroy_ClassName",
          "~ClassName, with a tilde before the class name",
          "ClassName_end",
          "It has the same name as the constructor, with no distinguishing mark",
        ],
        correctIndex: 1,
        explanation: "A destructor is named with a tilde (~) followed by the class name.",
      },
    ],
    takeaway:
      "A constructor runs automatically on creation and a destructor runs automatically when a local object leaves scope -- both deterministic, with no explicit call needed for either.",
    summary:
      "Classes group data and behavior; constructors initialize objects automatically on creation, and destructors clean up automatically at end of scope, in a predictable, deterministic order.",
    guidedOutputLab: {
      id: "cpp-lab-constructors-destructors",
      title: "Predict: Constructor and destructor order",
      language: "C++",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints, in order.",
      steps: [
        {
          code: `#include <iostream>
#include <string>

class Greeter {
public:
    Greeter(std::string name) : name_(name) {
        std::cout << "Constructing " << name_ << std::endl;
    }
    ~Greeter() {
        std::cout << "Destroying " << name_ << std::endl;
    }
    void greet() {
        std::cout << "Hello, " << name_ << "!" << std::endl;
    }
private:
    std::string name_;
};

int main() {
    Greeter g("Ada");
    g.greet();
    return 0;
}`,
          expectedOutput: "Constructing Ada\nHello, Ada!\nDestroying Ada",
        },
      ],
      hints: [
        'The constructor runs the instant `Greeter g("Ada")` executes, before greet() is ever called.',
        "g's destructor runs automatically right as main's closing brace is reached, after greet() has already printed its line.",
      ],
    },
    nextLessonSlug: "cpp-encapsulation-and-access-specifiers",
  },
  {
    id: "cpp-encapsulation-and-access-specifiers",
    slug: "cpp-encapsulation-and-access-specifiers",
    title: "Encapsulation and Access Specifiers",
    description: "Controlling visibility of a class's members with public, private, and protected.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Explain what public, private, and protected each control on a class member",
      "Use private data with public methods to enforce encapsulation",
      "Predict that outside code can only call a class's public interface, not touch its private data directly",
    ],
    skills: ["cpp-classes"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Access specifiers",
        url: "https://en.cppreference.com/w/cpp/language/access",
      },
    ],
    keywords: ["c++ encapsulation", "access specifiers", "public private protected"],
    explanation: `**Encapsulation** means bundling an object's data together with the methods that operate on it, and restricting direct outside access to that data -- outside code interacts with the object only through a deliberately chosen public interface, never by reaching in and touching its internals directly. C++ enforces this with three **access specifiers**: \`public\` (accessible from anywhere), \`private\` (accessible only from within the class's own member functions), and \`protected\` (like private, but also accessible to derived classes, which matters once you reach inheritance later in this course).

A common pattern is keeping data members \`private\` and exposing controlled access through \`public\` methods: a \`deposit(amount)\` method can validate or adjust an account's balance in a controlled way, while a \`getBalance()\` method exposes a read-only view of it, without ever letting outside code assign directly to the balance field and bypass whatever rules the class wants to enforce. Attempting to access a \`private\` member from outside the class is a compile error, not a warning -- the compiler genuinely enforces the boundary, it isn't just a naming convention like it is in some other languages.

Everything after an access specifier keyword (until the next one, or the closing brace) shares that access level -- you don't need to repeat \`private:\` before every single member, just once when the access level changes.`,
    commonMistakes: [
      "Making all data members public 'to keep things simple,' which defeats the point of encapsulation and lets outside code bypass any validation the class wants to enforce.",
      "Trying to access a private member directly from outside the class, forgetting the compiler enforces this boundary strictly, not just as a convention.",
      "Repeating an access specifier before every single member instead of understanding it applies to everything until the next access specifier or the class's closing brace.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which access specifier makes a class member accessible from outside the class?",
        choices: [
          "private",
          "protected",
          "public",
          "None -- all members are accessible by default",
        ],
        correctIndex: 2,
        explanation: "`public` members are accessible from anywhere, including outside the class.",
      },
      {
        id: "q2",
        prompt: "What happens if outside code tries to access a private member directly?",
        choices: [
          "It works, but is considered bad style",
          "It's a compile error -- the compiler enforces the boundary",
          "It works only in debug builds",
          "It silently returns a default value",
        ],
        correctIndex: 1,
        explanation:
          "Accessing a private member from outside the class is a genuine compile error in C++.",
      },
      {
        id: "q3",
        prompt: "What is encapsulation?",
        choices: [
          "Writing all code in a single file",
          "Bundling data with the methods that operate on it, and restricting direct outside access to that data",
          "A synonym for inheritance",
          "Converting a class into a struct",
        ],
        correctIndex: 1,
        explanation:
          "Encapsulation bundles data with its operating methods and restricts outside access to a controlled interface.",
      },
    ],
    takeaway:
      "Keep data members private and expose a deliberate public interface -- the compiler genuinely enforces private access from outside the class, not just as a naming convention.",
    summary:
      "public/private/protected control member visibility; encapsulation keeps data private behind a controlled public interface, enforced by the compiler as a real boundary, not a convention.",
    guidedOutputLab: {
      id: "cpp-lab-encapsulation",
      title: "Fill in the blank: making balance_ private",
      language: "C++",
      mode: "fill-in-blank",
      prompt: "Fill in the missing access specifier, then predict the output.",
      steps: [
        {
          code: `#include <iostream>

class BankAccount {
public:
    BankAccount(double balance) : balance_(balance) {}

    void deposit(double amount) {
        balance_ += amount;
    }

    double getBalance() const {
        return balance_;
    }

____:
    double balance_;
};

int main() {
    BankAccount account(100.0);
    account.deposit(50.0);
    std::cout << "Balance: " << account.getBalance() << std::endl;
    return 0;
}`,
          expectedOutput: "Balance: 150",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "private",
      hints: [
        "balance_ should only be modifiable through deposit(), not assigned directly from outside -- that means it needs the access specifier that restricts it to the class itself.",
        "100.0 + 50.0 = 150.0, which std::cout prints as 150 (no trailing .0).",
      ],
    },
    nextLessonSlug: "cpp-struct-vs-class",
  },
  {
    id: "cpp-struct-vs-class",
    slug: "cpp-struct-vs-class",
    title: "struct vs class",
    description:
      "The one real difference between C++'s struct and class -- and how to choose between them.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 16,
    objectives: [
      "State the one default-access difference between struct and class in C++",
      "Explain that C++'s struct, unlike C's, can have constructors and methods",
      "Choose struct for simple data bundles and class for types with invariants to protect",
    ],
    skills: ["cpp-classes"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "cppreference: Classes", url: "https://en.cppreference.com/w/cpp/language/classes" },
    ],
    keywords: ["struct vs class", "c++ struct", "default access"],
    explanation: `Unlike C's struct (a plain data bundle with no methods at all), a C++ \`struct\` is, technically, exactly as capable as a \`class\` -- it can have constructors, destructors, methods, and even inheritance. The **only** actual difference between them in C++ is their **default access level**: a \`struct\`'s members are \`public\` by default, while a \`class\`'s members are \`private\` by default. Everything else -- what you can do with either one -- is identical.

Because that's the only technical difference, the choice between \`struct\` and \`class\` in real C++ code is really a matter of **convention and intent**, not capability. \`struct\` is idiomatically used for simple, passive data bundles with no real invariants to protect -- a \`Point\` with public \`x\`/\`y\` fields that's fine for any code to read or write freely. \`class\` is idiomatically used when a type has behavior and rules to enforce -- private data, validated through a deliberate public interface, as you saw with \`BankAccount\` in the previous lesson.

This convention matters for readability: seeing \`struct Point\` signals "plain data, feel free to touch the fields directly," while seeing \`class Vector2D\` signals "there's a real interface here, don't assume you can reach into its internals." Following the convention, even though the compiler would technically let you write either one either way, makes your code's intent legible to anyone else reading it.`,
    commonMistakes: [
      "Assuming C++'s struct is limited to plain data like C's struct is -- in C++, struct can have constructors, methods, and everything class can.",
      "Forgetting the one real difference between struct and class: default member access is public for struct, private for class.",
      "Using struct for a type with real invariants to protect (which signals 'plain data, touch freely' to readers) instead of using class for that case.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the one technical difference between struct and class in C++?",
        choices: [
          "struct cannot have constructors, class can",
          "Default member access: public for struct, private for class",
          "struct cannot have methods at all",
          "class cannot use inheritance",
        ],
        correctIndex: 1,
        explanation:
          "The only real difference is the default access level: public for struct, private for class.",
      },
      {
        id: "q2",
        prompt: "Can a C++ struct have a constructor and methods?",
        choices: [
          "No, only class can",
          "Yes -- C++'s struct is just as capable as class, aside from default access",
          "Only if it inherits from a class",
          "Only in header files",
        ],
        correctIndex: 1,
        explanation:
          "C++'s struct can have constructors, methods, and everything class can, unlike C's struct.",
      },
      {
        id: "q3",
        prompt: "When is struct idiomatically preferred over class?",
        choices: [
          "Never -- class should always be used",
          "For simple, passive data bundles with no real invariants to protect",
          "Only for classes with no methods at all, which is required, not just conventional",
          "Whenever inheritance is involved",
        ],
        correctIndex: 1,
        explanation:
          "struct signals 'plain data' by convention, typically used for simple bundles without behavior to protect.",
      },
    ],
    takeaway:
      "struct and class differ only in default member access (public vs private) -- choosing between them is a readability convention, not a capability difference.",
    summary:
      "C++'s struct is as capable as class, differing only in default access (public vs private); convention uses struct for plain data and class for types with an enforced interface.",
    guidedOutputLab: {
      id: "cpp-lab-struct-vs-class",
      title: "Predict: A plain struct alongside a class with methods",
      language: "C++",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `#include <iostream>

struct Point {
    int x;
    int y;
};

class Vector2D {
public:
    Vector2D(int x, int y) : x_(x), y_(y) {}
    int lengthSquared() const {
        return x_ * x_ + y_ * y_;
    }
private:
    int x_;
    int y_;
};

int main() {
    Point p{3, 4};
    std::cout << "Point: (" << p.x << ", " << p.y << ")" << std::endl;

    Vector2D v(3, 4);
    std::cout << "Length squared: " << v.lengthSquared() << std::endl;

    return 0;
}`,
          expectedOutput: "Point: (3, 4)\nLength squared: 25",
        },
      ],
      hints: [
        "Point's fields are public by default, so p.x and p.y are accessed directly with no methods needed.",
        "lengthSquared() computes 3*3 + 4*4 = 9 + 16 = 25.",
      ],
    },
    nextLessonSlug: "cpp-raii",
  },
  {
    id: "cpp-raii",
    slug: "cpp-raii",
    title: "RAII: Resource Acquisition Is Initialization",
    description:
      "Why tying resource cleanup to a destructor makes cleanup automatic and impossible to forget.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Explain the RAII idiom: acquiring a resource in a constructor, releasing it in a destructor",
      "Predict when cleanup happens for an RAII object as control leaves its scope",
      "Explain why RAII makes cleanup automatic even when a function has multiple exit points",
    ],
    skills: ["cpp-memory"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "cppreference: RAII", url: "https://en.cppreference.com/w/cpp/language/raii" },
    ],
    keywords: ["raii", "resource acquisition is initialization", "c++ scope-based cleanup"],
    explanation: `**RAII** (Resource Acquisition Is Initialization) is C++'s central idiom for managing any resource that needs cleanup -- memory, file handles, locks, network connections. The idea: acquire the resource in a constructor, and release it in the matching destructor. Since you already know a local object's destructor runs automatically and deterministically when it goes out of scope (from this course's classes lesson), tying cleanup to that same mechanism means the cleanup **cannot be forgotten** -- it happens whether the function returns normally, returns early, or (in code that uses exceptions) an exception is thrown partway through.

This is a genuinely different mindset from C, where you (the programmer) are personally responsible for remembering to call \`free\` (or close a file, or unlock a lock) at every single place a function might exit -- miss one path, and you leak the resource. RAII moves that responsibility onto the type system: as long as the resource is owned by an RAII object with a correct destructor, leaving its scope by any path releases it, automatically, with nothing further for you to remember at each call site.

You'll see RAII again immediately in the next lesson, applied specifically to memory: \`std::unique_ptr\` and \`std::shared_ptr\` are RAII wrappers around a raw pointer, calling \`delete\` for you in their destructor -- but RAII itself is a general pattern, not something limited to smart pointers alone.`,
    commonMistakes: [
      "Manually acquiring and releasing a resource with matched calls scattered through a function, instead of wrapping it in an RAII type that releases it automatically via its destructor.",
      "Assuming RAII only applies to memory -- it applies to any resource needing cleanup: files, locks, network connections, and more.",
      "Forgetting that RAII's automatic cleanup happens on every exit path from a scope, which is exactly why it's more reliable than remembering to clean up manually at each one.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does RAII tie a resource's release to?",
        choices: [
          "A manually called cleanup function at the end of main",
          "The destructor of an object that owns the resource, run automatically at end of scope",
          "The garbage collector",
          "A timer that runs periodically",
        ],
        correctIndex: 1,
        explanation:
          "RAII ties resource release to an owning object's destructor, run automatically when it leaves scope.",
      },
      {
        id: "q2",
        prompt:
          "Why is RAII more reliable than manually freeing a resource at every exit point of a function?",
        choices: [
          "It isn't more reliable, just shorter to write",
          "Because the destructor runs automatically on every exit path, so there's nothing to remember at each one",
          "Because it disables all early returns",
          "Because it only works with a single exit point",
        ],
        correctIndex: 1,
        explanation:
          "RAII's destructor-based cleanup runs automatically regardless of which path leaves the scope, unlike manual cleanup that must be duplicated at every exit.",
      },
      {
        id: "q3",
        prompt: "Is RAII limited to managing memory specifically?",
        choices: [
          "Yes, only memory",
          "No -- it applies to any resource needing cleanup, like files or locks",
          "Only to smart pointers specifically",
          "Only to classes with no other methods",
        ],
        correctIndex: 1,
        explanation:
          "RAII is a general pattern for any resource with matched acquire/release semantics, not just memory.",
      },
    ],
    takeaway:
      "Wrap a resource's acquisition and release in a constructor/destructor pair, and cleanup becomes automatic on every exit path -- nothing left to remember at each call site.",
    summary:
      "RAII ties resource release to a destructor's automatic, guaranteed run at end of scope, making cleanup impossible to forget regardless of how a function exits.",
    guidedOutputLab: {
      id: "cpp-lab-raii",
      title: "Predict: RAII-driven cleanup timing",
      language: "C++",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints, in order.",
      steps: [
        {
          code: `#include <iostream>
#include <string>

class ScopedLogger {
public:
    ScopedLogger(std::string task) : task_(task) {
        std::cout << "Starting: " << task_ << std::endl;
    }
    ~ScopedLogger() {
        std::cout << "Finished: " << task_ << std::endl;
    }
private:
    std::string task_;
};

void doWork() {
    ScopedLogger logger("doWork");
    std::cout << "Working..." << std::endl;
}

int main() {
    std::cout << "Before doWork" << std::endl;
    doWork();
    std::cout << "After doWork" << std::endl;
    return 0;
}`,
          expectedOutput:
            "Before doWork\nStarting: doWork\nWorking...\nFinished: doWork\nAfter doWork",
        },
      ],
      hints: [
        "logger's destructor runs the instant doWork's closing brace is reached -- before control returns to main.",
        "That means 'Finished: doWork' prints before 'After doWork', not after.",
      ],
    },
    nextLessonSlug: "cpp-smart-pointers",
  },
  {
    id: "cpp-smart-pointers",
    slug: "cpp-smart-pointers",
    title: "Smart Pointers: unique_ptr and shared_ptr",
    description: "Applying RAII to heap memory, so you never write a raw delete yourself.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 7,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Create heap-allocated objects with std::make_unique instead of raw new",
      "Explain that std::unique_ptr automatically deletes its object when it goes out of scope",
      "Distinguish unique_ptr's single-owner model from shared_ptr's reference-counted, shared-ownership model",
    ],
    skills: ["cpp-memory"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: std::unique_ptr",
        url: "https://en.cppreference.com/w/cpp/memory/unique_ptr",
      },
    ],
    keywords: ["unique_ptr", "shared_ptr", "smart pointers", "make_unique"],
    explanation: `\`std::unique_ptr\` (from \`<memory>\`) is an RAII wrapper around a raw pointer to heap memory: it owns the object it points to, and its destructor calls \`delete\` automatically when the \`unique_ptr\` itself goes out of scope -- you never write a raw \`delete\` for memory owned by a \`unique_ptr\`. The idiomatic way to create one is \`std::make_unique<Widget>(1)\`, which allocates a \`Widget\` and wraps it in a \`unique_ptr<Widget>\`, rather than writing \`std::unique_ptr<Widget>(new Widget(1))\` yourself.

As its name suggests, \`unique_ptr\` models **single ownership**: exactly one \`unique_ptr\` owns a given object at a time. It can't be copied (copying a \`unique_ptr\` is a compile error), only **moved** -- transferring ownership from one \`unique_ptr\` to another, after which the original no longer owns anything. This is deliberately restrictive: it makes "who is responsible for deleting this" unambiguous, at compile time, for every object a \`unique_ptr\` manages.

\`std::shared_ptr\` relaxes that restriction for cases where genuinely shared ownership is needed: multiple \`shared_ptr\`s can point to the same object simultaneously, and it uses **reference counting** internally -- the object is deleted only once the last \`shared_ptr\` owning it is destroyed or reset, not before. This is more flexible than \`unique_ptr\` but has real runtime overhead (maintaining that count) and complexity (a reference cycle between shared_ptrs can leak memory, since the count never reaches zero) that \`unique_ptr\` doesn't have -- the general modern-C++ guidance is to reach for \`unique_ptr\` by default, and only use \`shared_ptr\` when you genuinely need multiple simultaneous owners.`,
    commonMistakes: [
      "Writing a raw `new`/`delete` pair for a resource that could instead be owned by a unique_ptr, losing RAII's automatic cleanup guarantee.",
      "Trying to copy a unique_ptr directly, forgetting it's move-only -- ownership transfers, it never duplicates.",
      "Reaching for shared_ptr by default 'just in case,' instead of using unique_ptr unless multiple simultaneous owners are genuinely needed.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What happens when a std::unique_ptr goes out of scope?",
        choices: [
          "Nothing automatic -- you must still call delete yourself",
          "Its destructor automatically deletes the object it owns",
          "It becomes a shared_ptr",
          "It throws an exception",
        ],
        correctIndex: 1,
        explanation:
          "unique_ptr's destructor automatically deletes the owned object when it goes out of scope.",
      },
      {
        id: "q2",
        prompt: "Can a std::unique_ptr be copied?",
        choices: [
          "Yes, freely",
          "No -- it can only be moved, transferring ownership",
          "Only if it points to a primitive type",
          "Only inside the same function",
        ],
        correctIndex: 1,
        explanation:
          "unique_ptr is move-only; copying it is a compile error, by design, to keep ownership unambiguous.",
      },
      {
        id: "q3",
        prompt: "What does std::shared_ptr use to decide when to delete its managed object?",
        choices: [
          "A fixed timer",
          "Reference counting -- deleted once the last owning shared_ptr is gone",
          "It never deletes automatically",
          "The order objects were created in",
        ],
        correctIndex: 1,
        explanation:
          "shared_ptr reference-counts its owners and deletes the object once the count reaches zero.",
      },
    ],
    takeaway:
      "Prefer std::make_unique for heap allocation by default -- its destructor deletes automatically, and single ownership keeps cleanup unambiguous; reach for shared_ptr only when genuinely shared ownership is needed.",
    summary:
      "unique_ptr applies RAII to heap memory with single, move-only ownership and automatic deletion; shared_ptr allows shared ownership via reference counting, at the cost of runtime overhead and cycle-leak risk.",
    guidedOutputLab: {
      id: "cpp-lab-smart-pointers",
      title: "Predict: A unique_ptr's automatic cleanup",
      language: "C++",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints, in order.",
      steps: [
        {
          code: `#include <iostream>
#include <memory>

class Widget {
public:
    Widget(int id) : id_(id) {
        std::cout << "Widget " << id_ << " created" << std::endl;
    }
    ~Widget() {
        std::cout << "Widget " << id_ << " destroyed" << std::endl;
    }
    int id() const { return id_; }
private:
    int id_;
};

int main() {
    std::unique_ptr<Widget> w = std::make_unique<Widget>(1);
    std::cout << "Using widget " << w->id() << std::endl;
    return 0;
}`,
          expectedOutput: "Widget 1 created\nUsing widget 1\nWidget 1 destroyed",
        },
      ],
      hints: [
        "make_unique<Widget>(1) constructs the Widget immediately, printing 'Widget 1 created' right away.",
        "w's destructor runs automatically as main ends, deleting the Widget and printing 'Widget 1 destroyed' -- with no explicit delete anywhere in the code.",
      ],
    },
    nextLessonSlug: "cpp-references-vs-pointers",
  },
  {
    id: "cpp-references-vs-pointers",
    slug: "cpp-references-vs-pointers",
    title: "References vs Pointers, and When to Use Each",
    description:
      "Comparing C++'s two ways to indirectly access a variable, and choosing between them.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "List the concrete differences between a reference and a pointer: nullability, reseatability, syntax",
      "Choose a reference parameter when a function needs to modify an argument that always exists",
      "Choose a pointer when 'no value' (nullptr) or reassignable indirection is a genuine requirement",
    ],
    skills: ["cpp-memory"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: References",
        url: "https://en.cppreference.com/w/cpp/language/reference",
      },
    ],
    keywords: ["references vs pointers", "c++ function parameters", "nullptr"],
    explanation: `You've now seen both of C++'s indirection mechanisms: references (this course's variables lesson) and pointers (inherited from C, this course's earlier lessons covered their C form, which C++ keeps unchanged). Put side by side, three concrete differences matter most in practice. First, **nullability**: a pointer can be \`nullptr\` (pointing at nothing); a reference can never be null -- it's always bound to a real object from the moment it's declared. Second, **reseatability**: a pointer can be reassigned to point at a different object later; a reference is permanently bound to whatever it was initialized with. Third, **syntax**: using a reference looks exactly like using the underlying value directly (no \`*\` needed to read or write through it), while a pointer requires explicit \`*\` to dereference and \`&\` to obtain an address in the first place.

These differences translate into a practical rule of thumb for function parameters. Use a **reference parameter** (\`int &value\`) when the function needs to read or modify an argument that's guaranteed to exist -- the calling code is slightly cleaner too, since you pass the variable directly rather than writing \`&variable\` at the call site. Use a **pointer parameter** (\`int *value\`) when "no value" is a genuine, meaningful possibility (representing that with \`nullptr\`) or when the function needs to store the address for later, reseatable use, rather than for the duration of just this one call.

Neither is objectively "better" -- they solve different problems. Modern C++ style generally reaches for references first for ordinary in/out parameters, and reserves pointers for cases that specifically need nullability or reseating, rather than defaulting to pointers out of habit from C.`,
    commonMistakes: [
      "Using a pointer parameter where a reference would do, adding unnecessary null-checking and dereference syntax for a value that's guaranteed to exist.",
      "Trying to represent 'no value' with a reference -- references can never be null, so a pointer (or a type built specifically for optional values) is needed instead.",
      "Forgetting a reference must be initialized immediately and can never be reseated, unlike a pointer, and trying to use one as if it could be reassigned later.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which of these can be null, a reference or a pointer?",
        choices: ["A reference", "A pointer", "Both", "Neither"],
        correctIndex: 1,
        explanation: "A pointer can be nullptr; a reference can never be null once bound.",
      },
      {
        id: "q2",
        prompt: "Which can be reassigned to refer to a different object after initialization?",
        choices: ["A reference", "A pointer", "Both, identically", "Neither"],
        correctIndex: 1,
        explanation:
          "A pointer can be reseated to point elsewhere; a reference is permanently bound to its original target.",
      },
      {
        id: "q3",
        prompt: "When is a pointer parameter generally preferred over a reference parameter?",
        choices: [
          "Always, for consistency with C",
          "When 'no value' (nullptr) is a genuine possibility, or reseatable indirection is needed",
          "Only for parameters of type int",
          "Never -- references should always be used instead",
        ],
        correctIndex: 1,
        explanation:
          "Pointers are preferred when nullability or reseating is a real requirement; references suit guaranteed-to-exist values.",
      },
    ],
    takeaway:
      "Reach for a reference parameter by default for a value guaranteed to exist; reach for a pointer specifically when nullability or reseatable indirection is a genuine requirement.",
    summary:
      "References can't be null or reseated and need no dereference syntax; pointers can be null and reassigned but need explicit * and &, making each better suited to different situations.",
    guidedOutputLab: {
      id: "cpp-lab-references-vs-pointers",
      title: "Fill in the blank: declaring a reference parameter",
      language: "C++",
      mode: "fill-in-blank",
      prompt:
        "Fill in the missing symbol so this parameter is a reference, then predict the output.",
      steps: [
        {
          code: `#include <iostream>

void incrementByReference(int ____value) {
    value++;
}

int main() {
    int a = 5;
    incrementByReference(a);
    std::cout << "After increment: " << a << std::endl;
    return 0;
}`,
          expectedOutput: "After increment: 6",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "&",
      hints: [
        "A reference parameter is declared with `&` after the type, e.g. `int &value`.",
        "Because value is a reference to a (a real, guaranteed-to-exist int), incrementing value inside the function increments a directly.",
      ],
    },
    nextLessonSlug: "cpp-templates",
  },
  {
    id: "cpp-templates",
    slug: "cpp-templates",
    title: "Templates: Generic Programming",
    description:
      "Writing one function or class that works across multiple types, without duplicating code.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Write a function template parameterized over a type T",
      "Explain that the compiler generates a separate concrete function for each type a template is used with",
      "Predict a templated function's return type based on the argument types it's called with",
    ],
    skills: ["cpp-templates"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Templates",
        url: "https://en.cppreference.com/w/cpp/language/templates",
      },
    ],
    keywords: ["c++ templates", "generic programming", "function templates"],
    explanation: `A **template** lets you write one function (or class) that works across multiple types, without writing a separate copy for each one. \`template <typename T> T maxValue(T a, T b) { return (a > b) ? a : b; }\` declares \`maxValue\` generically over a placeholder type \`T\` -- \`T\` stands in for whatever real type is used at each call site.

Calling \`maxValue(3, 7)\` with two \`int\`s makes the compiler deduce \`T = int\` from the arguments and generate a real, concrete \`int maxValue(int, int)\` function specifically for that call. Calling \`maxValue(2.5, 1.5)\` with two \`double\`s separately makes the compiler generate an entirely different concrete \`double maxValue(double, double)\` function. This process -- generating a distinct real function per type actually used -- is called **template instantiation**, and it happens automatically at compile time; you never see or write the generated versions yourself.

This is genuinely different from function overloading (this course's earlier control-flow lesson): overloading requires you to write each version by hand, while a template requires writing the logic only **once**, with the compiler doing the repetitive work of generating a version per type. The tradeoff is that template code can only use operations that are genuinely valid for whatever type \`T\` ends up being -- \`maxValue\`'s \`a > b\` comparison requires \`T\` to support \`>\`, so \`maxValue\` would fail to compile for a type that doesn't define that operator.`,
    commonMistakes: [
      "Writing the same function multiple times, once per type, instead of writing one template the compiler can instantiate for each type actually used.",
      "Confusing templates with function overloading -- overloading requires a hand-written version per type; a template requires the logic written once, generated per type by the compiler.",
      "Using an operation inside a template that isn't valid for every type it might be instantiated with, causing a compile error only for those specific types.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What does the compiler do when a template function is called with a specific type?",
        choices: [
          "It runs the generic version directly with no type-specific code",
          "It generates a concrete function for that type, called template instantiation",
          "It throws a runtime error if the type wasn't anticipated",
          "It converts every argument to a common base type first",
        ],
        correctIndex: 1,
        explanation:
          "The compiler instantiates a concrete, type-specific function from the template for each type it's used with.",
      },
      {
        id: "q2",
        prompt: "How does a template differ from writing several overloaded functions by hand?",
        choices: [
          "They're exactly the same thing with different syntax",
          "A template's logic is written once and instantiated per type by the compiler, instead of hand-written per type",
          "Templates can only be used with built-in types",
          "Overloading is always faster at runtime",
        ],
        correctIndex: 1,
        explanation:
          "A template avoids hand-duplicating logic per type; the compiler generates each concrete version automatically.",
      },
      {
        id: "q3",
        prompt: "Why might a template fail to compile for a specific type T?",
        choices: [
          "Templates always compile for every possible type",
          "Because the template body uses an operation (like >) that T doesn't support",
          "Because T is not a built-in type",
          "Templates cannot be used with user-defined types at all",
        ],
        correctIndex: 1,
        explanation:
          "A template only compiles for a given type if every operation it uses is actually valid for that type.",
      },
    ],
    takeaway:
      "Write generic logic once with `template <typename T>`, and let the compiler instantiate a concrete version for each type actually used at a call site.",
    summary:
      "Templates let one function or class body work across multiple types; the compiler generates a distinct concrete version per type actually used, a process called instantiation.",
    guidedOutputLab: {
      id: "cpp-lab-templates",
      title: "Predict: A template instantiated for two different types",
      language: "C++",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints.",
      steps: [
        {
          code: `#include <iostream>

template <typename T>
T maxValue(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << "Max int: " << maxValue(3, 7) << std::endl;
    std::cout << "Max double: " << maxValue(2.5, 1.5) << std::endl;
    return 0;
}`,
          expectedOutput: "Max int: 7\nMax double: 2.5",
        },
      ],
      hints: [
        "maxValue(3, 7) instantiates T = int, comparing 3 > 7 (false), returning 7.",
        "maxValue(2.5, 1.5) instantiates a separate T = double version, returning 2.5.",
      ],
    },
    nextLessonSlug: "cpp-stl-vectors-and-algorithms",
  },
  {
    id: "cpp-stl-vectors-and-algorithms",
    slug: "cpp-stl-vectors-and-algorithms",
    title: "The STL: std::vector and <algorithm>",
    description:
      "C++'s resizable array type, and two everyday functions from the algorithms library.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 10,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Create and iterate over a std::vector, a resizable, type-safe array",
      "Use std::sort from <algorithm> to sort a vector in place",
      "Use std::find from <algorithm> together with an iterator to locate a value",
    ],
    skills: ["cpp-stl"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: std::vector",
        url: "https://en.cppreference.com/w/cpp/container/vector",
      },
    ],
    keywords: ["std::vector", "stl algorithms", "std::sort", "std::find", "iterators"],
    explanation: `\`std::vector<T>\` (from \`<vector>\`) is the STL's resizable, type-safe array -- the modern, memory-safe alternative to a raw C-style array that this course's earlier lessons covered. It manages its own memory, tracks its own size (\`.size()\`), and grows automatically as you add elements, the same way Go's slice does conceptually, though the mechanics differ.

An **iterator** is an object that points to a position within a container, generalizing the idea of "a position you can step through," and it's how most STL algorithms operate on a container without needing to know its exact type. \`vec.begin()\` returns an iterator to the first element, and \`vec.end()\` returns an iterator to one position *past* the last element (never a valid element itself) -- \`begin()\`/\`end()\` together define the range an algorithm should operate over.

\`<algorithm>\` provides many reusable operations that work over that begin/end range. \`std::sort(vec.begin(), vec.end())\` sorts the vector's elements in place, in ascending order by default. \`std::find(vec.begin(), vec.end(), value)\` searches for the first element equal to \`value\`, returning an iterator to it if found, or exactly \`vec.end()\` if not found -- comparing the result against \`vec.end()\` is the standard way to check whether \`find\` actually succeeded. Subtracting one iterator from another (\`it - vec.begin()\`) gives you the numeric index of the position \`it\` refers to.`,
    commonMistakes: [
      "Using a raw C-style array where a std::vector would be safer and more convenient -- vector manages its own memory and resizing automatically.",
      "Forgetting that vec.end() points one position past the last real element, and is never itself a valid element to dereference.",
      "Forgetting to compare std::find's result against vec.end() to check whether the search actually succeeded, and using the iterator as if it were always valid.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does vec.end() refer to for a std::vector?",
        choices: [
          "The last valid element",
          "One position past the last valid element -- never itself dereferenceable",
          "The first element",
          "The vector's total capacity, as a number",
        ],
        correctIndex: 1,
        explanation:
          "end() is a sentinel iterator one position past the last real element, not a valid element itself.",
      },
      {
        id: "q2",
        prompt: "What does std::find return if the value being searched for isn't in the range?",
        choices: [
          "A null pointer",
          "An iterator equal to the range's end iterator",
          "The value -1",
          "It throws an exception",
        ],
        correctIndex: 1,
        explanation: "std::find returns the range's end iterator to signal 'not found.'",
      },
      {
        id: "q3",
        prompt: "What does std::vector offer that a raw C-style array doesn't?",
        choices: [
          "Nothing -- they're identical",
          "Automatic memory management and resizing, plus a tracked size",
          "Faster indexing in every case",
          "Guaranteed sorted order at all times",
        ],
        correctIndex: 1,
        explanation:
          "std::vector manages its own memory, resizes as needed, and tracks its size -- a raw array does none of this.",
      },
    ],
    takeaway:
      "std::vector is a resizable, memory-safe array; std::sort and std::find (both operating over a begin()/end() iterator range) are two of <algorithm>'s everyday tools for working with it.",
    summary:
      "std::vector manages its own resizing and memory; <algorithm> functions like std::sort and std::find operate generically over a container's begin()/end() iterator range.",
    guidedOutputLab: {
      id: "cpp-lab-stl-vector",
      title: "Predict: Sorting and searching a vector",
      language: "C++",
      mode: "predict",
      prompt: "Read this program and predict exactly what it prints, including spacing.",
      steps: [
        {
          code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {5, 2, 8, 1};
    std::sort(nums.begin(), nums.end());

    std::cout << "Sorted: ";
    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;

    auto it = std::find(nums.begin(), nums.end(), 8);
    if (it != nums.end()) {
        std::cout << "Found 8 at index " << (it - nums.begin()) << std::endl;
    }

    return 0;
}`,
          expectedOutput: "Sorted: 1 2 5 8 \nFound 8 at index 3",
        },
      ],
      hints: [
        "std::sort puts {5, 2, 8, 1} into ascending order: {1, 2, 5, 8}.",
        "After sorting, 8 sits at index 3 (0-based: 1 is index 0, 2 is index 1, 5 is index 2, 8 is index 3).",
      ],
    },
    nextLessonSlug: "cpp-inheritance-and-polymorphism",
  },
  {
    id: "cpp-inheritance-and-polymorphism",
    slug: "cpp-inheritance-and-polymorphism",
    title: "Inheritance and Virtual Functions",
    description:
      "Deriving one class from another, and why the virtual keyword is what actually enables polymorphism.",
    trackSlug: "cpp",
    courseSlug: "cpp-programming",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 22,
    objectives: [
      "Derive a class from a base class with public inheritance",
      "Explain why calling a non-virtual method through a base reference uses static (compile-time) binding",
      "Predict how adding the virtual keyword changes a method call to dynamic (runtime) dispatch",
    ],
    skills: ["cpp-classes", "cpp-inheritance"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "cppreference: Virtual function specifier",
        url: "https://en.cppreference.com/w/cpp/language/virtual",
      },
    ],
    keywords: ["c++ inheritance", "virtual functions", "polymorphism", "dynamic dispatch"],
    explanation: `**Inheritance** lets one class derive from another, reusing and extending its interface: \`class Dog : public Animal { ... }\` makes \`Dog\` a kind of \`Animal\`, inheriting whatever \`Animal\` declares. This lets code written to work with an \`Animal\` reference or pointer also work with any specific kind of animal derived from it, like \`Dog\` or \`Cat\`, without knowing about each concrete type in advance.

But inheritance alone doesn't give you **polymorphism** -- calling the *derived* type's version of a method through a *base* reference or pointer. By default, C++ member function calls use **static binding**: which version of \`speak()\` runs is decided at compile time, based on the *declared* (static) type of the reference or pointer you're calling through, not the actual (dynamic) type of the object it refers to. If \`Animal::speak\` isn't marked \`virtual\`, calling \`animal.speak()\` through an \`Animal&\` always calls \`Animal\`'s version, even if the real object underneath is a \`Dog\` with its own \`speak()\`.

Marking the base class's method \`virtual\` (and the derived class's version with \`override\`, which asks the compiler to verify it's genuinely overriding something) changes this to **dynamic dispatch**: the actual call is resolved at runtime, based on the object's real, dynamic type -- so calling \`speak()\` through an \`Animal&\` that actually refers to a \`Dog\` now correctly calls \`Dog::speak()\`. This is the mechanism that makes polymorphism -- "write code against the base type, get the derived type's behavior automatically" -- actually work in C++; without \`virtual\`, you don't get it, even though the inheritance relationship itself is exactly the same either way.`,
    commonMistakes: [
      "Assuming inheritance alone gives you polymorphism -- without the virtual keyword, a base-type call always uses the base class's version, regardless of the object's real type.",
      "Forgetting to mark a base class method virtual when derived classes are meant to override its behavior for calls made through a base reference or pointer.",
      "Omitting a virtual destructor on a base class that's meant to be deleted polymorphically through a base pointer, which is a separate but related pitfall from method dispatch.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "By default (without virtual), how is a C++ member function call resolved?",
        choices: [
          "At runtime, based on the object's actual type",
          "At compile time (static binding), based on the reference/pointer's declared type",
          "Randomly, depending on the compiler",
          "It's always a compile error without virtual",
        ],
        correctIndex: 1,
        explanation:
          "Without virtual, C++ uses static binding: the declared type of the reference/pointer decides which version runs.",
      },
      {
        id: "q2",
        prompt: "What does marking a base class method virtual change?",
        choices: [
          "Nothing observable",
          "It enables dynamic dispatch, so the object's actual (derived) type's version runs",
          "It prevents the method from being overridden",
          "It makes the method private",
        ],
        correctIndex: 1,
        explanation:
          "virtual switches the call to dynamic dispatch, resolved by the object's real type at runtime.",
      },
      {
        id: "q3",
        prompt:
          "Does inheritance by itself (with no virtual keyword anywhere) give you polymorphic method dispatch?",
        choices: [
          "Yes, always automatically",
          "No -- without virtual, calls through a base reference still use the base class's version",
          "Only for constructors",
          "Only if the derived class uses override",
        ],
        correctIndex: 1,
        explanation:
          "Inheritance alone doesn't enable dynamic dispatch; virtual is specifically what makes polymorphism work.",
      },
    ],
    takeaway:
      "Inheritance alone gives you static binding to the base class's version; marking a method virtual is what switches a base-reference call to the derived object's actual, dynamic-dispatched version.",
    summary:
      "A derived class inherits from a base class with `: public Base`; without `virtual`, base-reference calls resolve at compile time to the base version, while `virtual` (with `override` on the derived side) enables true runtime polymorphism.",
    guidedOutputLab: {
      id: "cpp-lab-virtual-dispatch",
      title: "Guided edit: From static binding to virtual dispatch",
      language: "C++",
      mode: "guided-editing",
      prompt:
        "Follow each step to see exactly how adding the virtual keyword changes which speak() this program actually calls.",
      steps: [
        {
          description:
            "Start with a non-virtual speak() method. makeSpeak takes a const Animal& parameter -- even though the actual object passed in is a Dog, the call to animal.speak() is resolved at compile time based on the parameter's declared type, Animal.",
          code: `#include <iostream>

class Animal {
public:
    void speak() const {
        std::cout << "Some generic animal sound" << std::endl;
    }
};

class Dog : public Animal {
public:
    void speak() const {
        std::cout << "Woof!" << std::endl;
    }
};

void makeSpeak(const Animal &animal) {
    animal.speak();
}

int main() {
    Dog dog;
    makeSpeak(dog);
    return 0;
}`,
          expectedOutput: "Some generic animal sound",
        },
        {
          description:
            "Mark Animal::speak virtual (and add a virtual destructor, standard practice for any base class used polymorphically), and mark Dog::speak override. Now the same makeSpeak call resolves at runtime based on the object's real type.",
          code: `#include <iostream>

class Animal {
public:
    virtual void speak() const {
        std::cout << "Some generic animal sound" << std::endl;
    }
    virtual ~Animal() {}
};

class Dog : public Animal {
public:
    void speak() const override {
        std::cout << "Woof!" << std::endl;
    }
};

void makeSpeak(const Animal &animal) {
    animal.speak();
}

int main() {
    Dog dog;
    makeSpeak(dog);
    return 0;
}`,
          expectedOutput: "Woof!",
        },
      ],
      hints: [
        "In the first version, animal's declared type inside makeSpeak is Animal&, and without virtual that's all that matters for which speak() runs -- the fact that dog is really a Dog is irrelevant to a non-virtual call.",
        "In the second version, virtual makes the call check the object's actual dynamic type (Dog) at runtime, so Dog::speak() runs instead.",
      ],
    },
  },
];
