import type { LessonInput } from "@/lib/content/types";

/**
 * PHP Web Development lessons. PHP has no safe, small in-browser execution
 * option (see docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md), so every
 * lesson uses a `guidedOutputLab` (read/predict/fill-in-blank/guided-editing
 * against a precomputed "Expected output") instead of `example`/
 * `guidedExercise`/`independentExercise` -- see lib/content/types.ts's
 * Phase 6/8 note and components/runners/guided-output-panel.tsx. Every code
 * sample and its expected output were verified by hand against real PHP 8
 * semantics.
 */
export const phpLessons: LessonInput[] = [
  {
    id: "php-introduction-and-request-response",
    slug: "php-introduction-and-request-response",
    title: "Introduction to PHP and the Request-Response Model",
    description: "What PHP is, how a .php file handles a web request, and embedding PHP in HTML.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain what kind of language PHP is and how it fits into the request-response cycle",
      "Identify the `<?php ?>` tags that switch a file between HTML and PHP",
      "Predict the output of a small PHP script that mixes `echo` statements",
    ],
    skills: ["php-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: Introduction", url: "https://www.php.net/manual/en/" }],
    keywords: ["php", "request-response", "php tags", "server-side scripting"],
    explanation: `PHP is a server-side scripting language: code runs on the *server*, per request, and the result (typically HTML) is what actually reaches the browser -- the browser never sees your PHP source. A visitor's request for \`page.php\` causes the server to run \`page.php\` from top to bottom, and whatever it \`echo\`s (or otherwise outputs) becomes the HTTP response body. This is different from a language like JavaScript running in the browser: PHP's whole job happens before the response is ever sent.

A \`.php\` file can freely mix literal HTML with PHP logic. Anything outside \`<?php ... ?>\` tags is sent to the browser exactly as written; anything inside those tags is executed as PHP code. This lets a single file open in plain HTML, drop into \`<?php ?>\` to compute something dynamic, and drop back out to HTML -- a pattern that predates (and still coexists with) more structured templating approaches.

Inside PHP tags, \`echo\` is the workhorse statement for producing output: \`echo "Hello!";\` sends the literal text \`Hello!\` to the response. Unlike some languages' print functions, \`echo\` does **not** add a trailing newline automatically -- if you want one, you write \`"\\n"\` explicitly in the string.

There's no separate "build" step a developer runs before a request can be served -- the PHP engine parses and executes the file directly (internally compiling to an intermediate bytecode for the request, but that's invisible to you as a developer; you just save the file and reload the page).`,
    commonMistakes: [
      "Forgetting to open `<?php` before writing PHP code in a file that also contains HTML -- code outside the tags is sent to the browser as literal text, not executed.",
      "Assuming `echo` adds a newline automatically the way some other languages' print functions do -- PHP requires an explicit `\\n` in the string if you want one.",
      "Thinking a `.php` file needs an explicit compile/build command before it can serve a request -- the PHP engine parses and runs it directly when requested.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "When a browser requests a `.php` file, where does the PHP code actually run?",
        choices: [
          "In the visitor's browser, like JavaScript",
          "On the server, before the response is sent to the browser",
          "It doesn't run at all -- PHP files are static",
          "Half on the server, half in the browser",
        ],
        correctIndex: 1,
        explanation:
          "PHP is server-side: the server executes the file and sends only the resulting output (usually HTML) to the browser.",
      },
      {
        id: "q2",
        prompt: "What happens to text written outside `<?php ... ?>` tags in a .php file?",
        choices: [
          "It causes a syntax error",
          "It's sent to the browser exactly as written, like plain HTML",
          "It's silently discarded",
          "It's treated as a PHP comment",
        ],
        correctIndex: 1,
        explanation:
          "Anything outside PHP tags passes through untouched, which is how a file mixes literal HTML with PHP logic.",
      },
      {
        id: "q3",
        prompt:
          "Does a PHP developer need to run a separate build/compile command before a request can be served?",
        choices: [
          "Yes, always, using a dedicated PHP compiler tool",
          "No -- the PHP engine parses and executes the file directly per request",
          "Only if the file contains a class",
          "Only in production, never in development",
        ],
        correctIndex: 1,
        explanation:
          "There's no developer-facing build step -- you save the .php file and the engine runs it on the next request.",
      },
    ],
    takeaway:
      "PHP code runs on the server per request, freely mixed with HTML via `<?php ?>` tags; `echo` sends output but never adds a newline for you.",
    summary:
      "PHP is a server-side scripting language executed per request; `<?php ?>` tags switch between literal HTML and executed code, and `echo` produces output with no automatic newline.",
    guidedOutputLab: {
      id: "php-lab-hello-world",
      title: "Predict: A minimal PHP script",
      language: "PHP",
      mode: "predict",
      prompt: "Read this script and predict exactly what it sends to the browser.",
      steps: [
        {
          code: `<?php
$name = "World";
echo "Hello, $name!\\n";
echo "2 + 2 = " . (2 + 2) . "\\n";`,
          expectedOutput: "Hello, World!\n2 + 2 = 4",
        },
      ],
      hints: [
        'Double-quoted PHP strings interpolate variables directly, so `$name` inside `"Hello, $name!"` is replaced with its value.',
        "`echo` adds no newline on its own -- each `\\n` you see is written explicitly.",
      ],
    },
    nextLessonSlug: "php-variables-types-and-string-interpolation",
  },
  {
    id: "php-variables-types-and-string-interpolation",
    slug: "php-variables-types-and-string-interpolation",
    title: "Variables, Types, and String Interpolation",
    description: "PHP's `$variable` syntax, loose typing, and interpolating values into strings.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Declare a variable using PHP's `$` sigil",
      "Distinguish single-quoted (literal) strings from double-quoted (interpolating) strings",
      "Predict how PHP's loose typing handles arithmetic and concatenation involving numeric strings",
    ],
    skills: ["php-basics"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: Types", url: "https://www.php.net/manual/en/" }],
    keywords: ["php variables", "php types", "string interpolation", "loose typing"],
    explanation: `Every PHP variable name starts with a \`$\` sigil: \`$age = 30;\`. Unlike some languages, you never declare a variable's type up front -- PHP figures it out from the assigned value, and a variable can hold a different type later if you reassign it (this is PHP's **loose typing**; you can opt into stricter behavior per-file with \`declare(strict_types=1);\`, which mainly affects function argument/return type coercion rather than variable assignment itself).

PHP has two everyday string quoting styles that behave differently: a **single-quoted** string (\`'Hello, $name'\`) is almost entirely literal -- \`$name\` stays as the literal text \`$name\`, not the variable's value. A **double-quoted** string (\`"Hello, $name"\`) *interpolates* -- it substitutes the variable's actual value directly into the string, and also recognizes escape sequences like \`\\n\`.

PHP's loose typing extends to **numeric strings**: a string that looks like a number, such as \`"85"\`, can be used directly in arithmetic -- \`"85" + 10\` evaluates to the integer \`95\`, with PHP converting the string to a number first. This is different from the \`.\` (dot) **concatenation operator**, which always converts its operands to strings and joins them -- \`"85" . 10\` produces the string \`"8510"\`, not a sum.

Getting \`+\` (arithmetic, numeric coercion) and \`.\` (concatenation, string coercion) confused is one of the most common early PHP mistakes, especially coming from a language like JavaScript where \`+\` does both jobs depending on the operand types.`,
    commonMistakes: [
      "Forgetting the `$` sigil and writing a bare identifier where PHP expects a variable name.",
      "Using a single-quoted string when interpolation was intended, then being confused why `'Hello, $name'` prints the literal text `$name` instead of its value.",
      "Confusing `+` (numeric addition, converting operands to numbers) with `.` (string concatenation, converting operands to strings) -- they are not interchangeable the way JavaScript's `+` can be.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What sigil must precede every PHP variable name?",
        choices: ["@", "$", "%", "&"],
        correctIndex: 1,
        explanation: "PHP variable names always begin with `$`, e.g. `$age`.",
      },
      {
        id: "q2",
        prompt: "In `'Hello, $name'` (single quotes), what does PHP do with `$name`?",
        choices: [
          "Substitutes the variable's current value",
          "Leaves it as the literal text `$name`, unevaluated",
          "Throws a parse error",
          "Converts it to an empty string",
        ],
        correctIndex: 1,
        explanation:
          "Single-quoted strings are almost entirely literal -- only double-quoted strings interpolate variables.",
      },
      {
        id: "q3",
        prompt: 'What does the expression `"85" + 10` evaluate to in PHP?',
        choices: ['The string "8510"', "The integer 95", "A parse error", "The boolean true"],
        correctIndex: 1,
        explanation:
          '`+` performs numeric addition, converting the well-formed numeric string "85" to a number first, giving 95.',
      },
    ],
    takeaway:
      "Use double-quoted strings when you want variable interpolation, and remember `+` coerces to numbers while `.` coerces to strings for concatenation.",
    summary:
      "PHP variables use a `$` sigil and are loosely typed; double-quoted strings interpolate values and escape sequences, single-quoted strings don't; `+` and `.` coerce operands differently.",
    guidedOutputLab: {
      id: "php-lab-variables",
      title: "Predict: Loose typing with numeric strings",
      language: "PHP",
      mode: "predict",
      prompt: "Read this script and predict exactly what it sends to the browser.",
      steps: [
        {
          code: `<?php
$name = "Ada";
$age = 30;
$score = "85";
$bonus = 10;

echo "$name is $age years old.\\n";
echo "Total score: " . ($score + $bonus) . "\\n";
echo "Score as string: " . $score . $bonus . "\\n";`,
          expectedOutput: "Ada is 30 years old.\nTotal score: 95\nScore as string: 8510",
        },
      ],
      hints: [
        '`$score + $bonus` performs numeric addition: the numeric string "85" is converted to the integer 85 first, so 85 + 10 = 95.',
        '`$score . $bonus` performs string concatenation instead: "85" joined with "10" (the string form of 10) gives "8510".',
      ],
    },
    nextLessonSlug: "php-control-flow",
  },
  {
    id: "php-control-flow",
    slug: "php-control-flow",
    title: "Control Flow: if, foreach, while, and match",
    description: "PHP's conditionals and loops, plus PHP 8's more precise `match` expression.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Write `if`/`elseif`/`else` and iterate an array with `foreach`",
      "Explain how `match` differs from PHP's older `switch` statement",
      "Predict the output of a `foreach` loop combined with a `match` expression",
    ],
    skills: ["php-basics", "php-control-flow"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PHP Manual: Control Structures", url: "https://www.php.net/manual/en/" },
    ],
    keywords: ["php if", "php foreach", "php while", "php match"],
    explanation: `PHP's \`if\`/\`elseif\`/\`else\` looks familiar from most C-family languages: \`if ($age >= 18) { ... } elseif ($age >= 13) { ... } else { ... }\`. \`while\` covers a condition-checked loop, and \`foreach\` is PHP's idiomatic way to iterate an array: \`foreach ($items as $item) { ... }\`, or \`foreach ($map as $key => $value) { ... }\` when you need both the key and value.

PHP has long had a \`switch\` statement, but PHP 8 added \`match\`, a more precise **expression** (it produces a value, unlike \`switch\`) with two important differences: \`match\` compares using strict equality (\`===\`, no type coercion), and it never falls through between arms -- each arm is a single \`condition => result\` pair, with no \`break\` needed and no risk of accidentally falling into the next case.

A common idiom is \`match (true) { condition1 => result1, condition2 => result2, default => fallback }\` -- since each arm's left side is compared against \`true\` with \`===\`, this lets you write arbitrary boolean conditions per arm rather than being limited to matching a single value, which is what most people actually want from a "smarter switch."

Because \`match\` has no fallthrough and uses strict comparison, it tends to produce fewer of the subtle bugs \`switch\` was historically known for -- though \`switch\` still shows up often in existing PHP code, so recognizing both is worthwhile.`,
    commonMistakes: [
      "Expecting `match` arms to fall through to the next arm the way un-`break`-ed `switch` cases can in some languages -- `match` never falls through.",
      "Forgetting `match` compares with strict equality (`===`), so a numeric string arm won't match an int value the way a loose `switch` case might.",
      "Writing `foreach ($item as $items)` (reversed) instead of `foreach ($items as $item)`, mixing up which side is the array being iterated.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How does PHP's `match` compare its arms against the subject value?",
        choices: [
          "Loosely, with type coercion (like `==`)",
          "Strictly, with no type coercion (like `===`)",
          "By calling a custom `equals()` method",
          "Alphabetically",
        ],
        correctIndex: 1,
        explanation: "`match` uses strict (`===`) comparison, unlike PHP's older, looser `switch`.",
      },
      {
        id: "q2",
        prompt: "Does a `match` expression need an explicit `break` after each arm?",
        choices: [
          "Yes, or it falls through to the next arm",
          "No -- `match` never falls through between arms",
          "Only for the last arm",
          "Only when the arm returns a string",
        ],
        correctIndex: 1,
        explanation:
          "Unlike `switch`, `match` arms never fall through, so no `break` is needed or valid.",
      },
      {
        id: "q3",
        prompt: "In `foreach ($numbers as $n) { ... }`, what does `$n` refer to on each iteration?",
        choices: [
          "The array's total length",
          "The current element's value",
          "The current element's index only, never its value",
          "A copy of the entire array",
        ],
        correctIndex: 1,
        explanation: "`foreach ($array as $value)` binds `$value` to each element in turn.",
      },
    ],
    takeaway:
      "Prefer `match` over `switch` when you want strict comparison and no fallthrough risk, and use `foreach ($items as $item)` as PHP's idiomatic array-iteration loop.",
    summary:
      "`if`/`elseif`/`else` and `while` behave as expected; `foreach` iterates arrays; `match` is a strict, fallthrough-free expression, often combined with `match (true)` for arbitrary conditions.",
    guidedOutputLab: {
      id: "php-lab-control-flow",
      title: "Fill in the blank: foreach with a match expression",
      language: "PHP",
      mode: "fill-in-blank",
      prompt: "Fill in the missing loop keyword, then predict the output.",
      steps: [
        {
          code: `<?php
$numbers = [1, 2, 3, 4, 5];

____ ($numbers as $n) {
    $label = match (true) {
        $n % 2 === 0 => "even",
        default => "odd",
    };
    echo "$n $label\\n";
}`,
          expectedOutput: "1 odd\n2 even\n3 odd\n4 even\n5 odd",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "foreach",
      hints: [
        "PHP's array-iteration keyword goes here, in the form `keyword ($array as $item)`.",
        "`match (true)` checks each arm's condition in order until one evaluates strictly equal to `true`.",
      ],
    },
    nextLessonSlug: "php-functions-and-arguments",
  },
  {
    id: "php-functions-and-arguments",
    slug: "php-functions-and-arguments",
    title: "Functions, Default Arguments, and Named Arguments",
    description:
      "Declaring functions with typed parameters, default values, and PHP 8 named arguments.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Declare a function with typed parameters, a default value, and a return type",
      "Call a function using PHP 8's named-argument syntax",
      "Predict the output of functions called with a mix of positional, default, and named arguments",
    ],
    skills: ["php-functions"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: Functions", url: "https://www.php.net/manual/en/" }],
    keywords: ["php functions", "default arguments", "named arguments"],
    explanation: `A PHP function is declared with \`function\`, optional type hints on each parameter, and an optional return type: \`function greet(string $name, string $greeting = "Hello"): string { return "$greeting, $name!"; }\`. A parameter with \`= value\` after its type is a **default argument** -- callers may omit it entirely, in which case the default is used.

PHP 8 added **named arguments**: instead of matching parameters purely by position, you can call \`greet(name: "Linus", greeting: "Hey")\`, naming each parameter explicitly. This is especially useful for functions with several optional parameters -- you can supply just the ones you care about, by name, in any order, without needing placeholder values for the ones in between.

Named and positional arguments can be mixed in one call, as long as every positional argument comes before any named one: \`greet("Ada", greeting: "Hi")\` is valid; \`greet(greeting: "Hi", "Ada")\` is not.

Type hints on parameters are checked at call time (and coerced for scalar types, unless the file starts with \`declare(strict_types=1);\`) -- passing an incompatible type that can't be coerced raises a \`TypeError\`, which is one of several places modern PHP uses real exceptions instead of a silent warning.`,
    commonMistakes: [
      "Putting a named argument before a positional one in the same call -- PHP requires all positional arguments to come first.",
      "Assuming a default-argument parameter can be skipped by leaving a gap (like an empty comma) -- you either omit trailing optional arguments entirely or use named arguments to skip to a later one.",
      "Forgetting that scalar type hints are coerced by default (an int passed to a `string` parameter becomes a string) unless `declare(strict_types=1);` is active.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What happens when a caller omits an argument that has a default value?",
        choices: [
          "A fatal error occurs",
          "The parameter's declared default value is used",
          "The parameter becomes `null` regardless of its declared default",
          "PHP infers a value from context",
        ],
        correctIndex: 1,
        explanation: "Omitting an argument with a declared default simply uses that default value.",
      },
      {
        id: "q2",
        prompt: "Which call is valid PHP 8 syntax, mixing positional and named arguments?",
        choices: [
          'greet(greeting: "Hi", "Ada")',
          'greet("Ada", greeting: "Hi")',
          'greet("Ada", "Hi", greeting:)',
          "Named and positional arguments can never be mixed",
        ],
        correctIndex: 1,
        explanation: "Positional arguments must come before any named arguments in the same call.",
      },
      {
        id: "q3",
        prompt:
          "What does PHP 8's named-argument syntax let you do that plain positional calls don't?",
        choices: [
          "Call a function without ever declaring it",
          "Supply only the specific optional parameters you care about, by name, regardless of their declared order",
          "Skip type checking entirely",
          "Define a function with no parameters",
        ],
        correctIndex: 1,
        explanation:
          "Named arguments let you target specific optional parameters directly instead of filling in every earlier one.",
      },
    ],
    takeaway:
      "Use default arguments to make parameters optional, and named arguments when you want to target a specific optional parameter without supplying every one before it.",
    summary:
      "Functions declare typed parameters and return types; default arguments make parameters optional; PHP 8 named arguments let callers target parameters by name instead of position.",
    guidedOutputLab: {
      id: "php-lab-functions",
      title: "Predict: Default and named arguments",
      language: "PHP",
      mode: "predict",
      prompt: "Read this script and predict exactly what it sends to the browser.",
      steps: [
        {
          code: `<?php
function greet(string $name, string $greeting = "Hello"): string {
    return "$greeting, $name!";
}

echo greet("Ada") . "\\n";
echo greet("Grace", "Hi") . "\\n";
echo greet(name: "Linus", greeting: "Hey") . "\\n";`,
          expectedOutput: "Hello, Ada!\nHi, Grace!\nHey, Linus!",
        },
      ],
      hints: [
        '`greet("Ada")` supplies no second argument, so the declared default `"Hello"` is used.',
        "Named arguments can be supplied in any order once you name them, as the third call shows.",
      ],
    },
    nextLessonSlug: "php-arrays",
  },
  {
    id: "php-arrays",
    slug: "php-arrays",
    title: "PHP Arrays: List and Map in One",
    description:
      "PHP's single array type, which doubles as both an ordered list and a string-keyed map.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Build an indexed array (a list) and an associative array (a map) using PHP's one array type",
      "Append to an indexed array with the `[]` syntax",
      "Predict the output of code that reads, counts, and joins array elements",
    ],
    skills: ["php-arrays"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: Arrays", url: "https://www.php.net/manual/en/" }],
    keywords: ["php arrays", "associative array", "indexed array"],
    explanation: `PHP has exactly **one** array type, and it genuinely serves two roles other languages split across separate structures: an **indexed (ordered) list**, where PHP auto-assigns integer keys starting at 0 (\`$fruits = ["apple", "banana", "cherry"];\`), and an **associative array (a map/dictionary)**, where you supply your own keys, usually strings (\`$ages = ["Ada" => 30, "Grace" => 45];\`). Both are the *same underlying type* -- there's no separate "list" or "dict" class to choose between.

You append to an indexed array with the \`[]\` syntax: \`$fruits[] = "date";\` adds a new element at the next available integer index. For an associative array, you assign directly to a new key: \`$ages["Linus"] = 55;\`.

Because both shapes are the same type, the same functions work on either: \`count($array)\` returns the number of elements regardless of whether the keys are integers or strings, and \`foreach\` iterates either shape (with \`as $key => $value\` when you need the keys). \`implode(", ", $array)\` joins an array's *values* into a string with a separator, commonly used with indexed arrays.

This dual nature is genuinely distinctive to PHP -- it's convenient (one mental model covers both use cases), but it also means "is this array a list or a map?" is a question you answer by looking at how it's being *used*, not by its declared type.`,
    commonMistakes: [
      "Assuming PHP has separate list and dictionary types the way Python does -- it has one array type that covers both roles.",
      "Forgetting that `$array[] = $value` appends at the next integer index, and using it by mistake on an array you intended to keep purely associative.",
      "Calling `implode` on an associative array expecting the keys to appear -- `implode` joins the *values* only.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many distinct array types does PHP have for lists versus string-keyed maps?",
        choices: [
          "Two -- a List type and a Map type",
          "One type that serves both roles",
          "Three, depending on key type",
          "None -- PHP has no built-in array type",
        ],
        correctIndex: 1,
        explanation:
          "PHP's single array type can hold either auto-indexed integer keys or explicit string keys.",
      },
      {
        id: "q2",
        prompt: 'What does `$fruits[] = "date";` do?',
        choices: [
          "Replaces the entire array with a single element",
          'Appends "date" at the next available integer index',
          "Throws an error unless the key is specified",
          "Removes the last element",
        ],
        correctIndex: 1,
        explanation:
          "`[]` without a key appends a new element at the next auto-assigned integer index.",
      },
      {
        id: "q3",
        prompt:
          "Does `count($array)` behave differently for an indexed array versus an associative array?",
        choices: [
          "Yes, it only works on indexed arrays",
          "No, it returns the number of elements either way, since both are the same underlying type",
          "Yes, associative arrays require `count_assoc()` instead",
          "No, but it always returns 0 for associative arrays",
        ],
        correctIndex: 1,
        explanation:
          "`count()` works identically on both shapes, since PHP has only one array type.",
      },
    ],
    takeaway:
      "PHP's one array type covers both ordered lists (auto-indexed, appended with `[]`) and associative maps (explicit string keys) -- the same functions like `count()` and `foreach` work on either.",
    summary:
      "Indexed arrays get auto-assigned integer keys and grow with `[]`; associative arrays use explicit keys; both are the same array type, so `count`, `foreach`, and `implode` (values only) work on either.",
    guidedOutputLab: {
      id: "php-lab-arrays",
      title: "Fill in the blank: counting an associative array",
      language: "PHP",
      mode: "fill-in-blank",
      prompt: "Fill in the missing function name, then predict the output.",
      steps: [
        {
          code: `<?php
$fruits = ["apple", "banana", "cherry"];
$fruits[] = "date";

$ages = ["Ada" => 30, "Grace" => 45];
$ages["Linus"] = 55;

echo "Fruits: " . implode(", ", $fruits) . "\\n";
echo "Ada's age: " . $ages["Ada"] . "\\n";
echo "Count of ages: " . ____($ages) . "\\n";`,
          expectedOutput: "Fruits: apple, banana, cherry, date\nAda's age: 30\nCount of ages: 3",
        },
      ],
      blankPlaceholder: "____",
      blankAnswer: "count",
      hints: [
        "The built-in function that returns the number of elements in any PHP array goes here.",
        '$ages has three entries after the assignment: "Ada", "Grace", and "Linus".',
      ],
    },
    nextLessonSlug: "php-superglobals",
  },
  {
    id: "php-superglobals",
    slug: "php-superglobals",
    title: "Superglobals: $_GET, $_POST, and $_SERVER",
    description: "How PHP exposes incoming request data through built-in superglobal arrays.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Explain what `$_GET`, `$_POST`, and `$_SERVER` represent for an incoming request",
      "Safely read a possibly-missing key from a superglobal array using `??`",
      "Predict the output of code reading request data with fallback defaults",
    ],
    skills: ["php-web"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: Superglobals", url: "https://www.php.net/manual/en/" }],
    keywords: ["php superglobals", "$_GET", "$_POST", "$_SERVER"],
    explanation: `PHP automatically populates several special, always-available arrays -- called **superglobals** -- from the incoming HTTP request, before your script's first line even runs. \`$_GET\` holds query-string parameters (from a URL like \`page.php?name=Ada&lang=en\`, PHP fills \`$_GET["name"]\` and \`$_GET["lang"]\` for you). \`$_POST\` holds form-body data submitted via an HTTP POST request. \`$_SERVER\` holds metadata about the request and server environment, like \`$_SERVER["REQUEST_METHOD"]\` (\`"GET"\` or \`"POST"\`, among others).

Because request data is fundamentally untrusted input, reading a key that a visitor simply didn't supply is common and expected -- it does **not** throw an error, but accessing a genuinely undefined array key directly does raise a warning in modern PHP. The idiomatic guard is the **null coalescing operator** \`??\`: \`$_GET["name"] ?? "Guest"\` evaluates to the query parameter's value if it's set, or \`"Guest"\` otherwise, with no warning either way.

The lab below assigns directly into \`$_GET\` purely to illustrate what *reading* it looks like -- in a real request, PHP populates \`$_GET\` for you automatically from the URL's query string; you never assign to it yourself in ordinary request-handling code.

Reading superglobals safely is the first half of handling user input responsibly; the second half -- never trusting that data blindly when it reaches a database query or HTML output -- is covered in this course's security lesson.`,
    commonMistakes: [
      "Reading `$_GET[\"key\"]` directly without `??` or `isset()`, and getting a warning (or an unintended `null`) when a visitor's request simply doesn't include that parameter.",
      "Assuming form data submitted via POST shows up in `$_GET` -- it doesn't; POST body data lands in `$_POST`, query-string data lands in `$_GET`.",
      "Trusting `$_GET`/`$_POST` values as already safe to use in a database query or HTML output -- superglobals hold raw, untrusted visitor input.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Where does data from a URL like `page.php?name=Ada` land?",
        choices: ["$_POST", "$_GET", "$_SERVER", "$_SESSION"],
        correctIndex: 1,
        explanation: "Query-string parameters are populated into `$_GET` automatically by PHP.",
      },
      {
        id: "q2",
        prompt:
          'What does `$_GET["theme"] ?? "light"` evaluate to if "theme" was not included in the request?',
        choices: [
          "A warning is thrown and execution halts",
          '"light", the fallback after `??`',
          "`null`, always, regardless of the fallback",
          "An empty array",
        ],
        correctIndex: 1,
        explanation:
          "`??` returns its right-hand side when the left-hand expression is null/unset, avoiding a warning.",
      },
      {
        id: "q3",
        prompt: "What kind of information does `$_SERVER` hold?",
        choices: [
          "Only database connection details",
          "Metadata about the request and server environment, like the HTTP method",
          "The visitor's submitted form fields",
          "Session data that persists across requests",
        ],
        correctIndex: 1,
        explanation:
          '`$_SERVER` exposes request/server metadata such as `$_SERVER["REQUEST_METHOD"]`.',
      },
    ],
    takeaway:
      "Read superglobals with `??` (or `isset()`) rather than directly, since request data a visitor didn't supply is the normal case, not an error.",
    summary:
      "`$_GET`, `$_POST`, and `$_SERVER` are automatically populated from the incoming request; missing keys are expected and should be guarded with `??` rather than accessed directly.",
    guidedOutputLab: {
      id: "php-lab-superglobals",
      title: "Predict: Reading request data safely",
      language: "PHP",
      mode: "predict",
      prompt:
        "This illustrates reading request data as PHP would populate it for a request to greet.php?name=Ada&lang=en (the assignments below simulate what PHP fills in automatically). Predict the output.",
      steps: [
        {
          code: `<?php
// Simulating what PHP populates automatically for a request to
// greet.php?name=Ada&lang=en -- you would not assign these yourself.
$_GET["name"] = "Ada";
$_GET["lang"] = "en";

$name = $_GET["name"] ?? "Guest";
$lang = $_GET["lang"] ?? "en";
$theme = $_GET["theme"] ?? "light";

echo "Hello, $name! (lang=$lang, theme=$theme)\\n";
echo "Request method: " . ($_SERVER["REQUEST_METHOD"] ?? "GET") . "\\n";`,
          expectedOutput: "Hello, Ada! (lang=en, theme=light)\nRequest method: GET",
        },
      ],
      hints: [
        '"theme" was never set in $_GET, so `?? "light"` supplies the fallback instead of a warning.',
        '$_SERVER["REQUEST_METHOD"] wasn\'t set in this simulation either, so its `??` fallback ("GET") is used.',
      ],
    },
    nextLessonSlug: "php-classes-and-objects",
  },
  {
    id: "php-classes-and-objects",
    slug: "php-classes-and-objects",
    title: "Classes and Objects",
    description: "Defining a PHP class with typed properties and methods, and creating instances.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Define a class with typed properties, a constructor, and methods",
      "Explain what `$this` refers to inside a method",
      "Predict the output of code that creates and mutates an object",
    ],
    skills: ["php-oop"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PHP Manual: Classes and Objects", url: "https://www.php.net/manual/en/" },
    ],
    keywords: ["php classes", "php objects", "constructor", "$this"],
    explanation: `A PHP class bundles typed properties and methods together: \`class BankAccount { private float $balance; }\` declares a property, and \`public function __construct(float $startingBalance) { $this->balance = $startingBalance; }\` is the special **constructor** method, automatically called when you create an instance with \`new BankAccount(100)\`.

Inside any method, \`$this\` refers to the specific object the method was called on -- \`$this->balance\` reads or writes *that instance's* \`balance\` property, using \`->\` (not \`.\`) to access properties and methods on an object.

Visibility keywords (\`public\`, \`private\`, \`protected\`) control where a property or method can be accessed from: \`private\` means only code inside the same class can touch it directly, which is why \`BankAccount\` exposes a \`getBalance()\` method rather than letting outside code read \`$balance\` directly.

Methods, like standalone functions, can declare parameter and return types: \`public function deposit(float $amount): void\` takes a float and returns nothing meaningful (\`void\`), while \`public function getBalance(): float\` returns the current balance as a float.`,
    commonMistakes: [
      "Using `.` instead of `->` to access a property or call a method on an object -- `.` is PHP's string concatenation operator, not member access.",
      "Trying to read a `private` property directly from outside the class (`$account->balance`) instead of through a public method like `getBalance()`.",
      "Forgetting the constructor runs automatically on `new ClassName(...)` -- you never call `__construct()` yourself.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What operator does PHP use to access a property or method on an object?",
        choices: [".", "->", "::", "@"],
        correctIndex: 1,
        explanation:
          "`->` accesses properties and methods on an object instance, e.g. `$account->getBalance()`.",
      },
      {
        id: "q2",
        prompt: "What does `$this` refer to inside an instance method?",
        choices: [
          "The class definition itself",
          "The specific object the method was called on",
          "A copy of the constructor's arguments",
          "Nothing -- `$this` is not valid PHP",
        ],
        correctIndex: 1,
        explanation: "`$this` is bound to whichever object instance the method call was made on.",
      },
      {
        id: "q3",
        prompt:
          "Why does `BankAccount` provide a `getBalance()` method instead of a public `$balance` property?",
        choices: [
          "PHP doesn't allow public properties at all",
          "`$balance` is declared `private`, so outside code can't read it directly",
          "Methods are always faster than property access",
          "There is no reason -- both would work identically",
        ],
        correctIndex: 1,
        explanation:
          "A `private` property is only accessible from inside the class, so a public method is needed to expose it.",
      },
    ],
    takeaway:
      "Use `->` to access properties/methods on an object, and keep mutable state `private`, exposing it only through methods you control.",
    summary:
      "A class bundles typed properties and methods; `new ClassName(...)` calls the constructor automatically; `$this` refers to the current instance, accessed via `->`.",
    guidedOutputLab: {
      id: "php-lab-classes",
      title: "Predict: A class with a constructor and methods",
      language: "PHP",
      mode: "predict",
      prompt: "Read this script and predict exactly what it sends to the browser.",
      steps: [
        {
          code: `<?php
class BankAccount {
    private float $balance;

    public function __construct(float $startingBalance) {
        $this->balance = $startingBalance;
    }

    public function deposit(float $amount): void {
        $this->balance += $amount;
    }

    public function getBalance(): float {
        return $this->balance;
    }
}

$account = new BankAccount(100);
$account->deposit(50);
echo "Balance: " . $account->getBalance() . "\\n";`,
          expectedOutput: "Balance: 150",
        },
      ],
      hints: [
        "The constructor sets the starting balance to 100 (coerced to float), then deposit(50) adds 50 more.",
        'PHP prints a whole-number float like 150.0 as "150", without a trailing ".0".',
      ],
    },
    nextLessonSlug: "php-interfaces-and-traits",
  },
  {
    id: "php-interfaces-and-traits",
    slug: "php-interfaces-and-traits",
    title: "Interfaces and Traits",
    description:
      "Defining a contract with an interface, and sharing behavior across classes with traits.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 7,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Define an interface as a contract of method signatures a class must implement",
      "Use a trait to share method implementations across otherwise unrelated classes",
      "Predict the output of a class that both implements an interface and uses a trait",
    ],
    skills: ["php-oop", "php-traits"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: Traits", url: "https://www.php.net/manual/en/" }],
    keywords: ["php interfaces", "php traits", "horizontal code reuse"],
    explanation: `A PHP **interface** declares a set of method signatures a class promises to implement: \`interface Nameable { public function getName(): string; }\`. A class opts in explicitly with \`implements\`: \`class Person implements Nameable { ... }\` -- unlike Go's implicit interfaces, PHP requires this explicit declaration, and PHP will refuse to run if a class claims to implement an interface but is missing a required method.

PHP classes support only **single inheritance** (\`extends\` one parent class at most), which raises a real question: how do you share a chunk of reusable behavior across classes that aren't related by inheritance? PHP's answer is the **trait**: \`trait Greetable { public function greet(): string { return "Hello, I'm " . $this->name . "!"; } }\`, brought into a class with \`use Greetable;\` inside the class body. This copies the trait's methods directly into the class, as if you'd written them there yourself -- a form of **horizontal code reuse** that doesn't participate in the class hierarchy at all.

A trait's methods can reference \`$this\` and expect properties (like \`$name\` above) to exist on whatever class ultimately uses the trait -- the trait doesn't declare that property itself; it assumes the consuming class provides it, similar to how a mixin works in other languages.

A single class can implement multiple interfaces and use multiple traits at once, which is exactly the flexibility single inheritance alone can't offer -- interfaces describe *what* a class can do, traits provide *how*, reusably.`,
    commonMistakes: [
      "Forgetting the explicit `implements` keyword -- unlike Go's structural interfaces, PHP requires a class to explicitly declare which interfaces it implements.",
      "Assuming a trait works like a base class you `extends` -- traits are brought in with `use` inside the class body and don't affect the class hierarchy or `instanceof` checks.",
      "Writing a trait method that assumes a property exists on the consuming class, without documenting that expectation, leading to confusing errors when a class uses the trait without that property.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How does a PHP class declare that it implements an interface?",
        choices: [
          "Implicitly, just by having matching methods, like Go",
          "Explicitly, with the `implements` keyword",
          "By using a trait with the same name",
          "PHP has no interface concept",
        ],
        correctIndex: 1,
        explanation:
          "PHP requires the explicit `implements` keyword, unlike languages with structural interfaces.",
      },
      {
        id: "q2",
        prompt: "What problem do traits solve that single inheritance alone cannot?",
        choices: [
          "Sharing reusable method implementations across classes that aren't related by inheritance",
          "Declaring a class's public API",
          "Enforcing that a method must be implemented",
          "Preventing a class from being instantiated",
        ],
        correctIndex: 0,
        explanation:
          "Traits provide horizontal code reuse, letting unrelated classes share behavior outside the class hierarchy.",
      },
      {
        id: "q3",
        prompt: "How is a trait brought into a class?",
        choices: [
          "With `extends TraitName`",
          "With `implements TraitName`",
          "With `use TraitName;` inside the class body",
          "Traits are imported automatically, with no keyword",
        ],
        correctIndex: 2,
        explanation:
          "`use TraitName;` inside a class body copies the trait's methods into that class.",
      },
    ],
    takeaway:
      "Use `implements` to declare a contract a class fulfills, and `use` (with a trait) to share reusable method implementations across classes that don't share a common parent.",
    summary:
      "Interfaces declare method contracts a class must explicitly `implement`; traits (`use TraitName;`) copy reusable methods into a class as horizontal code reuse, independent of inheritance.",
    guidedOutputLab: {
      id: "php-lab-traits",
      title: "Predict: A trait and an interface together",
      language: "PHP",
      mode: "predict",
      prompt: "Read this script and predict exactly what it sends to the browser.",
      steps: [
        {
          code: `<?php
trait Greetable {
    public function greet(): string {
        return "Hello, I'm " . $this->name . "!";
    }
}

interface Nameable {
    public function getName(): string;
}

class Person implements Nameable {
    use Greetable;

    public function __construct(public string $name) {}

    public function getName(): string {
        return $this->name;
    }
}

$person = new Person("Grace");
echo $person->greet() . "\\n";
echo $person->getName() . "\\n";`,
          expectedOutput: "Hello, I'm Grace!\nGrace",
        },
      ],
      hints: [
        "`public function __construct(public string $name) {}` is constructor property promotion -- it declares and sets `$this->name` in one step.",
        "The `Greetable` trait's `greet()` method reads `$this->name`, which exists because `Person` (the class using the trait) declares it.",
      ],
    },
    nextLessonSlug: "php-namespaces-and-autoloading",
  },
  {
    id: "php-namespaces-and-autoloading",
    slug: "php-namespaces-and-autoloading",
    title: "Namespaces and Autoloading",
    description:
      "Organizing classes with namespaces, and the PSR-4 convention that autoloads them.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Declare a namespace and reference a class in another namespace by its fully-qualified name",
      "Use a `use` statement to import a class under its short name",
      "Explain, conceptually, what PSR-4 autoloading maps a namespace to",
    ],
    skills: ["php-namespaces"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: Namespaces", url: "https://www.php.net/manual/en/" }],
    keywords: ["php namespaces", "psr-4", "autoloading", "use statement"],
    explanation: `A **namespace** groups related classes under a shared prefix, avoiding name collisions between, say, your own \`Calculator\` class and a third-party library's class of the same name: \`namespace App; class Calculator { ... }\` puts \`Calculator\` under the \`App\` namespace.

From outside that namespace, you can reference the class by its **fully-qualified name**, starting with a leading backslash: \`\\App\\Calculator::add(3, 4)\`. Typing that out repeatedly is tedious, so a \`use\` statement imports the class under its short name for the rest of the file: \`use App\\Calculator;\` lets you write just \`Calculator::add(3, 4)\` afterward.

In a real, multi-file PHP project, you don't manually \`require\` every class file you need -- **PSR-4 autoloading** (a widely-adopted PHP community convention, almost always set up via Composer, covered next lesson) maps a namespace prefix to a directory on disk, so referencing \`App\\Calculator\` automatically loads the file that defines it, without an explicit \`require\` anywhere in your code.

This walkthrough shows two files (marked by comments) as PHP would see them once loaded -- in a real project, autoloading (or an explicit \`require\`) is what gets the second file's code access to the first file's class in the first place.`,
    commonMistakes: [
      "Forgetting the leading backslash when writing a fully-qualified class name from outside its namespace, e.g. `App\\Calculator` instead of `\\App\\Calculator`.",
      "Assuming a `use` statement executes code or loads a file -- it only creates a short-name alias for something that must already be loadable (typically via autoloading).",
      "Thinking PSR-4 autoloading is a PHP language feature -- it's a community convention, implemented by tooling like Composer's generated autoloader, not by the PHP engine itself.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does a `use App\\Calculator;` statement do?",
        choices: [
          "Loads the Calculator.php file from disk",
          "Creates a short-name alias so `Calculator` can be used instead of the full `\\App\\Calculator`",
          "Declares a new namespace",
          "Runs the class's constructor immediately",
        ],
        correctIndex: 1,
        explanation:
          "`use` only aliases a fully-qualified name to a shorter one within the current file.",
      },
      {
        id: "q2",
        prompt: "What does PSR-4 autoloading map?",
        choices: [
          "A namespace prefix to a directory on disk",
          "A function name to its return type",
          "A database table to a class",
          "An HTTP route to a controller method",
        ],
        correctIndex: 0,
        explanation:
          "PSR-4 is a convention mapping namespace prefixes to filesystem directories so classes load automatically.",
      },
      {
        id: "q3",
        prompt: "Is PSR-4 autoloading a built-in PHP language feature?",
        choices: [
          "Yes, the PHP engine implements it natively with no tooling",
          "No -- it's a community convention, typically implemented by tooling like Composer",
          "Yes, but only for interfaces, not classes",
          "No such convention exists in PHP",
        ],
        correctIndex: 1,
        explanation:
          "PSR-4 is a convention; Composer (or similar tooling) generates the actual autoloader that implements it.",
      },
    ],
    takeaway:
      "A fully-qualified name (`\\App\\Calculator`) always works; `use` just creates a shorter alias for it, and PSR-4 autoloading (via tooling like Composer) is what makes referencing a class actually load its file.",
    summary:
      "Namespaces group classes to avoid name collisions; `use` imports a short alias; PSR-4 autoloading conventionally maps a namespace prefix to a directory so classes load without manual `require` calls.",
    guidedOutputLab: {
      id: "php-lab-namespaces",
      title: "Guided edit: From a fully-qualified name to a use statement",
      language: "PHP",
      mode: "guided-editing",
      prompt: "Follow each step to see two ways of referencing a class in another namespace.",
      steps: [
        {
          description:
            "Reference the class by its fully-qualified name, starting with a leading backslash -- no `use` statement needed.",
          code: `<?php
// file: src/Calculator.php
namespace App;

class Calculator {
    public static function add(int $a, int $b): int {
        return $a + $b;
    }
}

// file: index.php

echo \\App\\Calculator::add(3, 4) . "\\n";`,
          expectedOutput: "7",
        },
        {
          description:
            "Add a `use` statement so the class can be referenced by its short name for the rest of the file.",
          code: `<?php
// file: src/Calculator.php
namespace App;

class Calculator {
    public static function add(int $a, int $b): int {
        return $a + $b;
    }
}

// file: index.php
use App\\Calculator;

echo Calculator::add(3, 4) . "\\n";`,
          expectedOutput: "7",
        },
      ],
      hints: [
        "Both versions call the exact same method, so the output is identical -- only how the class is referenced changes.",
        "A `use` statement doesn't load anything by itself; it's autoloading (or a `require`) that makes the class available in the first place.",
      ],
    },
    nextLessonSlug: "php-composer-and-package-management",
  },
  {
    id: "php-composer-and-package-management",
    slug: "php-composer-and-package-management",
    title: "Composer and Package Management",
    description: "How composer.json declares dependencies and autoloading rules for a PHP project.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Explain what `composer.json` declares for a PHP project",
      "Describe what `composer install` does with the `vendor/` directory",
      "Read a parsed composer.json-shaped structure and identify its key sections",
    ],
    skills: ["php-composer"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: PHP and Composer", url: "https://www.php.net/manual/en/" }],
    keywords: ["composer", "composer.json", "vendor directory", "package management"],
    explanation: `**Composer** is PHP's standard dependency and package manager. A project declares what it needs in a \`composer.json\` file: a \`"require"\` section lists other packages (and version constraints, like \`"^3.0"\`) your code depends on, and an \`"autoload"\` section typically declares PSR-4 mappings -- which namespace prefixes correspond to which directories in *your own* code.

Running \`composer install\` reads \`composer.json\`, resolves compatible versions of every dependency (and their own dependencies), downloads them into a \`vendor/\` directory, and generates \`vendor/autoload.php\` -- a single file that, once required with \`require "vendor/autoload.php";\`, makes every dependency's classes (and your own PSR-4-mapped classes) available to autoload automatically, with no manual \`require\` per class.

\`vendor/\` is generated content, not something you hand-edit or typically commit to version control -- \`composer.json\` (what you depend on) and \`composer.lock\` (the exact resolved versions, for reproducible installs) are the files that matter for collaboration; anyone can regenerate \`vendor/\` from those with \`composer install\`.

The structure below mirrors what a real \`composer.json\` file conceptually contains once read -- in an actual project this is a JSON file on disk, parsed by Composer's own tooling, not something your application code manually walks like this.`,
    commonMistakes: [
      "Committing the `vendor/` directory to version control instead of just `composer.json` and `composer.lock` -- `vendor/` is regenerable, and committing it bloats the repository.",
      'Editing files inside `vendor/` directly to "fix" a dependency -- any change is wiped out the next time `composer install` runs.',
      "Confusing `composer.json` (what you depend on, with flexible version constraints) with `composer.lock` (the exact versions actually installed, for reproducibility).",
    ],
    quiz: [
      {
        id: "q1",
        prompt: 'What does `composer.json`\'s `"require"` section declare?',
        choices: [
          "Which PHP version to use for syntax highlighting",
          "The packages (and version constraints) a project depends on",
          "The project's database schema",
          "A list of test files to run",
        ],
        correctIndex: 1,
        explanation:
          '`"require"` lists dependency packages and the version ranges the project accepts.',
      },
      {
        id: "q2",
        prompt:
          "What does `composer install` generate that lets classes autoload without manual `require` calls?",
        choices: [
          "composer.json itself",
          "vendor/autoload.php",
          "A .env file",
          "A compiled binary",
        ],
        correctIndex: 1,
        explanation:
          "`vendor/autoload.php`, once required once, wires up autoloading for all installed dependencies and your own PSR-4 classes.",
      },
      {
        id: "q3",
        prompt: "Should the `vendor/` directory typically be committed to version control?",
        choices: [
          "Yes, always, so it can never go missing",
          "No -- it's regenerable from composer.json/composer.lock via `composer install`",
          "Only in production, never in development",
          "Only if the project has no dependencies",
        ],
        correctIndex: 1,
        explanation:
          "`vendor/` is generated content; committing `composer.json` and `composer.lock` is what matters for collaboration.",
      },
    ],
    takeaway:
      "`composer.json` declares dependencies and PSR-4 autoload mappings; `composer install` resolves and downloads them into `vendor/` and generates the autoloader -- commit the former, not the latter.",
    summary:
      "Composer manages PHP dependencies via composer.json (declared requirements and autoload rules) and composer.lock (exact resolved versions); `composer install` populates the regenerable vendor/ directory.",
    guidedOutputLab: {
      id: "php-lab-composer",
      title: "Predict: Reading a composer.json-shaped structure",
      language: "PHP",
      mode: "predict",
      prompt:
        "This mirrors the parsed shape of a composer.json file's key sections. Predict the output.",
      steps: [
        {
          code: `<?php
// This mirrors the parsed shape of a composer.json file after
// \`composer install\` reads it (real PSR-4 keys end in a namespace
// separator backslash; simplified to "App" here for clarity).
$composerConfig = [
    "name" => "visasparkschools/demo-app",
    "require" => [
        "monolog/monolog" => "^3.0",
    ],
    "autoload" => [
        "psr-4" => [
            "App" => "src/",
        ],
    ],
];

echo "Package: " . $composerConfig["name"] . "\\n";
echo "Dependency: monolog/monolog " . $composerConfig["require"]["monolog/monolog"] . "\\n";
foreach ($composerConfig["autoload"]["psr-4"] as $namespace => $dir) {
    echo "Namespace " . $namespace . " maps to " . $dir . "\\n";
}`,
          expectedOutput:
            "Package: visasparkschools/demo-app\nDependency: monolog/monolog ^3.0\nNamespace App maps to src/",
        },
      ],
      hints: [
        "This is plain array/foreach reading -- no JSON parsing function is involved, since the structure is already a PHP array here.",
        'The `"autoload" -> "psr-4"` section has exactly one entry to loop over: "App" mapping to "src/".',
      ],
    },
    nextLessonSlug: "php-error-and-exception-handling",
  },
  {
    id: "php-error-and-exception-handling",
    slug: "php-error-and-exception-handling",
    title: "Error and Exception Handling",
    description:
      "PHP's try/catch/finally, throwing exceptions, and how PHP's error model has evolved.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Throw an exception with a descriptive message and catch it with `try`/`catch`",
      "Explain what `finally` guarantees, regardless of whether an exception was thrown",
      "Predict the output of a script combining a thrown exception with a `finally` block",
    ],
    skills: ["php-errors"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: Exceptions", url: "https://www.php.net/manual/en/" }],
    keywords: ["php exceptions", "try catch finally", "error handling"],
    explanation: `PHP handles error conditions with exceptions: \`throw new InvalidArgumentException("Cannot divide by zero");\` raises an exception carrying a message, and \`try { ... } catch (InvalidArgumentException $e) { ... }\` catches it -- \`$e->getMessage()\` retrieves the message you threw it with. If an exception is thrown but nothing catches it, PHP halts the script with a fatal error.

An optional \`finally\` block runs **every time**, whether or not an exception was thrown or caught -- it's the right place for cleanup code that must happen regardless of outcome (closing a file handle, for example), and it still runs even if the exception was caught and handled successfully.

PHP's error model has genuinely modernized: many conditions that used to be silent warnings or notices in older PHP are now real, catchable exceptions in PHP 8 -- for example, dividing by zero with \`intdiv()\` or the \`%\` operator throws \`DivisionByZeroError\`, and calling a method on \`null\` throws an \`Error\`. This makes failure modes far more visible and testable than PHP's historically loose reputation suggests.

Exceptions and \`Error\`s both implement the \`Throwable\` interface, but they're conventionally treated differently: exceptions typically represent conditions your own code anticipates and can recover from (like this lesson's custom \`InvalidArgumentException\`), while \`Error\`s (like \`TypeError\`, \`DivisionByZeroError\`) more often indicate a programming mistake.`,
    commonMistakes: [
      "Catching a broader or unrelated exception class than the one actually thrown, so the real exception goes uncaught and halts the script.",
      "Forgetting `finally` runs even when the exception was successfully caught and handled -- it's not just for the unhandled case.",
      "Assuming every PHP runtime problem still produces a silent warning like in much older PHP -- many now throw real, catchable exceptions/errors in PHP 8.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does `$e->getMessage()` return inside a `catch` block?",
        choices: [
          "The full stack trace",
          "The message the exception was constructed with",
          "The line number where it was thrown",
          "Nothing -- getMessage() doesn't exist in PHP",
        ],
        correctIndex: 1,
        explanation:
          "`getMessage()` returns the descriptive string passed to the exception's constructor.",
      },
      {
        id: "q2",
        prompt: "When does a `finally` block run?",
        choices: [
          "Only if no exception was thrown",
          "Only if an exception was thrown but not caught",
          "Every time, whether or not an exception was thrown or caught",
          "Only if the try block completes in under one second",
        ],
        correctIndex: 2,
        explanation:
          "`finally` is guaranteed to run in every case, making it suited for unconditional cleanup.",
      },
      {
        id: "q3",
        prompt: "In modern PHP 8, what happens when you divide by zero with `intdiv()`?",
        choices: [
          "It silently returns 0",
          "It throws a catchable `DivisionByZeroError`",
          "It always halts the entire server process",
          "It returns `INF`, like some floating-point operations",
        ],
        correctIndex: 1,
        explanation:
          "PHP 8 raises a real, catchable `DivisionByZeroError` rather than a silent warning.",
      },
    ],
    takeaway:
      "Catch the specific exception type you expect, and use `finally` for cleanup that must run regardless of whether an exception occurred.",
    summary:
      "`throw` raises an exception carrying a message; `try`/`catch` handles it by type; `finally` always runs; PHP 8 converted many former silent warnings into real, catchable exceptions/errors.",
    guidedOutputLab: {
      id: "php-lab-errors",
      title: "Predict: try/catch/finally with a custom exception",
      language: "PHP",
      mode: "predict",
      prompt: "Read this script and predict exactly what it sends to the browser.",
      steps: [
        {
          code: `<?php
function safeDivide(int $a, int $b): int {
    if ($b === 0) {
        throw new InvalidArgumentException("Cannot divide by zero");
    }
    return intdiv($a, $b);
}

try {
    echo safeDivide(10, 2) . "\\n";
    echo safeDivide(10, 0) . "\\n";
} catch (InvalidArgumentException $e) {
    echo "Error: " . $e->getMessage() . "\\n";
} finally {
    echo "Done.\\n";
}`,
          expectedOutput: "5\nError: Cannot divide by zero\nDone.",
        },
      ],
      hints: [
        "safeDivide(10, 2) succeeds and prints its result before the second call ever runs.",
        "safeDivide(10, 0) throws before returning anything, so control jumps straight to the catch block -- and `finally` still runs after that.",
      ],
    },
    nextLessonSlug: "php-security-basics",
  },
  {
    id: "php-security-basics",
    slug: "php-security-basics",
    title: "Security Basics: SQL Injection and XSS",
    description: "Preventing SQL injection with prepared statements, and XSS with output escaping.",
    trackSlug: "php",
    courseSlug: "php-web-development",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Explain why string-concatenated SQL queries are vulnerable to SQL injection",
      "Describe how prepared statements with bound parameters prevent that vulnerability",
      "Predict the output of escaping untrusted content with `htmlspecialchars()` before displaying it",
    ],
    skills: ["php-security"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "PHP Manual: Security", url: "https://www.php.net/manual/en/" }],
    keywords: ["sql injection", "prepared statements", "xss", "htmlspecialchars"],
    explanation: `**SQL injection** happens when untrusted input is concatenated directly into a SQL query string: \`"SELECT * FROM users WHERE name = '" . $_GET["name"] . "'"\`. A visitor supplying a crafted \`name\` value can inject their own SQL, changing the query's meaning entirely -- a well-known, serious vulnerability class.

The fix is **prepared statements with bound parameters**, supported by PHP's PDO extension: you write the query with placeholders (\`"SELECT * FROM users WHERE name = ?"\`, or a named placeholder like \`:name\`), then bind the actual value separately. The database driver keeps the query structure and the data strictly separate, so a malicious value can never be interpreted as part of the SQL itself -- it's treated purely as data, no matter what it contains.

**Cross-site scripting (XSS)** is the same category of problem in a different place: if you \`echo\` untrusted input directly into an HTML page, a visitor who submits \`<script>...\`\` as their input gets that script tag rendered -- and executed -- in every other visitor's browser who views that page. The fix is **output escaping**: \`htmlspecialchars($value, ENT_QUOTES)\` converts HTML-special characters (\`<\`, \`>\`, \`"\`, \`'\`, \`&\`) into their safe HTML-entity equivalents before they're ever placed into an HTML response, so the browser displays them as literal text instead of interpreting them as markup.

Both fixes share the same underlying principle: never let untrusted input be interpreted as *code* (SQL syntax, HTML markup) -- always treat it strictly as *data*, using the tool built for that boundary (parameter binding for SQL, escaping for HTML) rather than trying to manually filter dangerous-looking substrings yourself.`,
    commonMistakes: [
      "Building a SQL query by directly concatenating `$_GET`/`$_POST` values into the query string instead of using prepared statements with bound parameters.",
      "Trying to prevent SQL injection by manually stripping or escaping specific characters yourself instead of using parameter binding, which the database driver guarantees handles it correctly.",
      "Echoing untrusted input directly into HTML output without `htmlspecialchars()`, opening the page to cross-site scripting.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What makes string-concatenated SQL queries vulnerable to SQL injection?",
        choices: [
          "PHP's database extension is inherently broken",
          "Untrusted input becomes part of the query's own syntax instead of being treated as pure data",
          "SQL injection only affects NoSQL databases",
          "The query runs twice by mistake",
        ],
        correctIndex: 1,
        explanation:
          "Concatenation lets crafted input change the query's actual structure, not just its data values.",
      },
      {
        id: "q2",
        prompt: "How do prepared statements with bound parameters prevent SQL injection?",
        choices: [
          "They run the query twice to double-check it",
          "They keep the query structure and the supplied data strictly separate, so data can never alter the query's syntax",
          "They automatically delete any suspicious-looking input",
          "They only work for SELECT queries",
        ],
        correctIndex: 1,
        explanation:
          "Binding separates data from query syntax entirely, regardless of what the data contains.",
      },
      {
        id: "q3",
        prompt: "What does `htmlspecialchars()` protect against when used on output?",
        choices: [
          "SQL injection",
          "Cross-site scripting (XSS), by converting HTML-special characters to safe entities",
          "Denial-of-service attacks",
          "Password brute-forcing",
        ],
        correctIndex: 1,
        explanation:
          "Escaping HTML-special characters before output prevents untrusted input from being interpreted as markup/script.",
      },
    ],
    takeaway:
      "Never let untrusted input be interpreted as code -- use prepared statements with bound parameters for SQL, and `htmlspecialchars()` on any untrusted value before it reaches HTML output.",
    summary:
      "SQL injection and XSS are both about untrusted data being misinterpreted as code; prepared statements (SQL) and htmlspecialchars() (HTML output) enforce the data/code boundary correctly.",
    guidedOutputLab: {
      id: "php-lab-security",
      title: "Predict: Escaping untrusted output",
      language: "PHP",
      mode: "predict",
      prompt: "Read this script and predict exactly what it sends to the browser.",
      steps: [
        {
          code: `<?php
$userInput = '<script>alert("hi")</script>';

$unsafeOutput = "Comment: " . $userInput;
$safeOutput = "Comment: " . htmlspecialchars($userInput, ENT_QUOTES);

echo $unsafeOutput . "\\n";
echo $safeOutput . "\\n";`,
          expectedOutput:
            'Comment: <script>alert("hi")</script>\nComment: &lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;',
        },
      ],
      hints: [
        "$unsafeOutput contains the raw, unescaped input -- exactly what makes untrusted output dangerous to render as HTML.",
        "htmlspecialchars() with ENT_QUOTES converts `<`, `>`, and both quote characters into their HTML-entity forms.",
      ],
    },
  },
];
