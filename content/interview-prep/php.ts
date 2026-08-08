import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * PHP Web Development interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (the request-
 * response model, variables/arrays/control flow, functions/superglobals,
 * OOP: classes/interfaces/traits/namespaces, Composer/error handling,
 * web-security basics).
 */
export const phpInterviewQuestions: InterviewQuestionInput[] = [
  // --- Request-Response Model & Fundamentals (10) ---
  {
    id: "php-interview-request-01",
    courseSlug: "php-web-development",
    question:
      "What is PHP's basic request-response model for a traditional (non-framework) PHP script?",
    answer:
      "A web server receives an HTTP request for a `.php` file, the PHP interpreter executes that script fresh for THIS request (reading data from superglobals like `$_GET`/`$_POST`), and whatever the script outputs (via `echo`, or plain HTML mixed with PHP) becomes the HTTP response body -- each request runs the script from scratch, with no persistent in-memory state carried between requests by default.",
    category: "Request-Response Model & Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-request-02",
    courseSlug: "php-web-development",
    question: "What is the difference between `==` and `===` in PHP?",
    answer:
      '`==` compares values with type coercion (so `"5" == 5` is `true`); `===` compares both value and type without coercion (`"5" === 5` is `false`) -- PHP\'s loose `==` comparison has historically produced some genuinely surprising results (like certain string-to-number comparisons), which is why `===` is generally recommended by default.',
    category: "Request-Response Model & Fundamentals",
    difficulty: "intermediate",
    commonMistake:
      "Using == for comparison in PHP and being surprised by type-coercion results, instead of defaulting to === .",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-request-03",
    courseSlug: "php-web-development",
    question:
      "What does PHP variable interpolation inside a double-quoted string do, and how does it differ from a single-quoted string?",
    answer:
      "Inside double quotes, `\"Hello, $name!\"` embeds and evaluates the `$name` variable directly; single-quoted strings (`'Hello, $name!'`) treat the text literally, with no variable interpolation or most escape sequences processed -- a common source of confusion for beginners expecting interpolation to work in single quotes too.",
    category: "Request-Response Model & Fundamentals",
    difficulty: "beginner",
    codeExample:
      '$name = "Asha";\necho "Hello, $name!";  // Hello, Asha!\necho \'Hello, $name!\';  // Hello, $name! (literal)',
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-request-04",
    courseSlug: "php-web-development",
    question:
      "Is PHP a dynamically or statically typed language, and what does that mean for a variable's type over its lifetime?",
    answer:
      "PHP is dynamically typed -- a variable's type is determined by its current value at runtime and can change as different values are assigned to it over the variable's lifetime, unlike a statically-typed language where a variable's type is fixed and checked at compile time.",
    category: "Request-Response Model & Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-request-05",
    courseSlug: "php-web-development",
    question:
      "What does PHP's `??` (null coalescing) operator do, and why is it commonly used with `$_GET`/`$_POST` values?",
    answer:
      "`$value = $_GET['name'] ?? 'default';` returns the array value if it's set and not `null`, otherwise falls back to `'default'` -- commonly used because request data (query params, form fields) is often optional/missing, and accessing a truly nonexistent array key directly would trigger a warning.",
    category: "Request-Response Model & Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-request-06",
    courseSlug: "php-web-development",
    question:
      "What is the difference between PHP's `include`/`require` and `include_once`/`require_once`?",
    answer:
      "`include`/`require` insert and evaluate another file's contents each time they're called, even if the file was already included earlier; the `_once` variants only include a given file's contents ONE time per request, regardless of how many times that statement is reached -- important for avoiding duplicate function/class declaration errors.",
    category: "Request-Response Model & Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-request-07",
    courseSlug: "php-web-development",
    question:
      "What is the difference between `include` and `require` specifically, when the target file is missing?",
    answer:
      "`include` emits a warning but allows script execution to continue; `require` emits a fatal error and stops script execution entirely -- `require` is typically used for files the script genuinely cannot function without.",
    category: "Request-Response Model & Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-request-08",
    courseSlug: "php-web-development",
    question:
      "Why might PHP still be considered a practical, widely-relevant language to learn, despite sometimes being characterized as outdated?",
    answer:
      "It powers a genuinely large share of the web's backends (including major platforms like WordPress), has evolved substantially in modern versions (strong typing options, performance improvements, modern OOP features), and remains in wide production use -- 'widely used' and 'the newest trend' are independent properties, and PHP is squarely the former.",
    category: "Request-Response Model & Fundamentals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-request-09",
    courseSlug: "php-web-development",
    question: "What is the difference between `echo` and `print` in PHP?",
    answer:
      "They're nearly functionally identical for outputting a string -- `print` is technically an expression that always returns `1`, letting it be used in contexts requiring an expression, while `echo` is a language construct that can accept multiple comma-separated arguments and cannot be used as an expression -- in practice, `echo` is more commonly used.",
    category: "Request-Response Model & Fundamentals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-request-10",
    courseSlug: "php-web-development",
    question:
      "What does PHP's `strict_types` declaration do, and why might a modern PHP codebase enable it?",
    answer:
      "`declare(strict_types=1);` at the top of a file disables PHP's default automatic type coercion for function arguments/return types with type declarations, requiring exact type matches instead -- helps catch a real class of type-mismatch bugs that PHP's normally-loose typing would otherwise silently coerce and hide.",
    category: "Request-Response Model & Fundamentals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Functions, Arrays & Superglobals (10) ---
  {
    id: "php-interview-arrays-01",
    courseSlug: "php-web-development",
    question: "What makes PHP arrays unusual compared to arrays in many other languages?",
    answer:
      "A PHP array is simultaneously an ordered list AND an associative map -- the same `array()`/`[]` type can be used as a numerically-indexed list (`[1, 2, 3]`) or as a string-keyed dictionary (`['name' => 'Asha']`), unlike languages that have genuinely separate list and map/dictionary types.",
    category: "Functions, Arrays & Superglobals",
    difficulty: "intermediate",
    codeExample: '$list = [1, 2, 3];\n$map = ["name" => "Asha", "age" => 30];',
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-arrays-02",
    courseSlug: "php-web-development",
    question: "What do `array_map`, `array_filter`, and `array_reduce` each do?",
    answer:
      "`array_map` transforms every element via a callback, returning a new array of the same length; `array_filter` keeps only elements for which a callback returns true; `array_reduce` folds the array down into a single accumulated value -- PHP's equivalents to the map/filter/reduce pattern common across many languages.",
    category: "Functions, Arrays & Superglobals",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-arrays-03",
    courseSlug: "php-web-development",
    question: "What are PHP superglobals, and give two examples?",
    answer:
      "Built-in global arrays automatically populated by PHP with request/environment data, accessible from anywhere without needing to be explicitly passed or declared `global` -- `$_GET` (query string parameters), `$_POST` (form body data), `$_SERVER` (server/request metadata), and `$_SESSION` (session data) are common examples.",
    category: "Functions, Arrays & Superglobals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-arrays-04",
    courseSlug: "php-web-development",
    question:
      "Why is directly trusting and using `$_GET`/`$_POST` values without validation a security risk?",
    answer:
      "These superglobals contain raw, completely untrusted data submitted by the client -- using them directly in a database query, in output rendered as HTML, or in a file path without validation/escaping opens the door to SQL injection, XSS, or path traversal vulnerabilities respectively.",
    category: "Functions, Arrays & Superglobals",
    difficulty: "advanced",
    commonMistake:
      "Using raw $_GET/$_POST values directly in a query or HTML output without validating or escaping them first.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-arrays-05",
    courseSlug: "php-web-development",
    question:
      'What does a default parameter value in a PHP function definition do (`function greet($name = "friend")`)?',
    answer:
      'It provides a fallback value used when the caller omits that argument -- `greet()` uses `"friend"`, while `greet("Asha")` uses the explicitly-passed value, reducing the need for the caller to always specify every parameter.',
    category: "Functions, Arrays & Superglobals",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-arrays-06",
    courseSlug: "php-web-development",
    question:
      "What does passing a function argument 'by reference' (`function increment(&$value)`) let you do that passing by value does not?",
    answer:
      "By-reference parameters let the function directly modify the CALLER's original variable, since the parameter refers to the same underlying storage rather than a copy -- by-value (PHP's default) means changes inside the function don't affect the caller's variable at all.",
    category: "Functions, Arrays & Superglobals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-arrays-07",
    courseSlug: "php-web-development",
    question:
      "What is variadic argument syntax in PHP (`function sum(...$numbers)`), and how does it relate to arrays?",
    answer:
      "`...$numbers` collects any number of extra arguments passed to the function into a single array parameter -- lets a function accept a flexible number of arguments without the caller needing to explicitly build an array themselves.",
    category: "Functions, Arrays & Superglobals",
    difficulty: "advanced",
    codeExample:
      "function sum(...$numbers) {\n  return array_sum($numbers);\n}\nsum(1, 2, 3); // 6",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-arrays-08",
    courseSlug: "php-web-development",
    question:
      "What does `array_key_exists()` check for, and how does that differ from just checking `isset($array['key'])`?",
    answer:
      "`array_key_exists()` confirms the key exists in the array regardless of its value (including if the value is `null`); `isset()` returns `false` if the key exists but its value is `null` -- a subtle but real difference that matters when `null` is a meaningful, intentionally-stored value.",
    category: "Functions, Arrays & Superglobals",
    difficulty: "advanced",
    commonMistake:
      "Using isset() to check for a key's existence when the value could legitimately be null, silently treating a present null value as if the key were missing.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-arrays-09",
    courseSlug: "php-web-development",
    question: "What is a closure in PHP, and what does the `use` keyword do when defining one?",
    answer:
      "A closure is an anonymous function value; `use ($variable)` explicitly captures a variable from the enclosing scope into the closure -- unlike some languages where closures automatically capture everything referenced, PHP requires explicitly listing which outer variables a closure should have access to.",
    category: "Functions, Arrays & Superglobals",
    difficulty: "advanced",
    codeExample:
      "$multiplier = 3;\n$triple = function ($x) use ($multiplier) {\n  return $x * $multiplier;\n};",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-arrays-10",
    courseSlug: "php-web-development",
    question:
      "Why does PHP's `$_SERVER` superglobal require caution when its values (like `$_SERVER['HTTP_REFERER']`) are used in application logic?",
    answer:
      "Several `$_SERVER` entries reflect client-supplied HTTP headers, which a client can set to arbitrary values -- treating them as trustworthy server-controlled data (rather than client-influenced, potentially spoofed input) can introduce the same class of validation risk as trusting raw `$_GET`/`$_POST` directly.",
    category: "Functions, Arrays & Superglobals",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- OOP: Classes, Interfaces, Traits & Namespaces (10) ---
  {
    id: "php-interview-oop-01",
    courseSlug: "php-web-development",
    question:
      "What does the `->` operator do when working with a PHP object, and how does it differ from `::`?",
    answer:
      "`->` accesses an INSTANCE's properties/methods (`$user->getName()`); `::` (the scope resolution operator) accesses STATIC members or class constants without needing an instance (`User::create()`, `MyClass::MAX_SIZE`).",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-oop-02",
    courseSlug: "php-web-development",
    question: "What is a PHP interface, and can a class implement multiple interfaces?",
    answer:
      "An interface declares a contract of method signatures a class must implement, with no implementation of its own -- a PHP class CAN implement multiple interfaces (unlike single class inheritance, which only allows one `extends`), giving flexibility to satisfy several distinct capability contracts.",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-oop-03",
    courseSlug: "php-web-development",
    question:
      "What is a PHP trait, and what problem does it solve that plain single-inheritance classes cannot?",
    answer:
      "A trait is a reusable block of method implementations that can be 'mixed into' multiple, otherwise-unrelated classes via `use TraitName;` -- solves the code-reuse problem where two classes need to share the same implemented behavior but don't have a genuine 'is-a' relationship that would justify sharing a common base class.",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "advanced",
    codeExample:
      'trait Loggable {\n  public function log($message) {\n    echo "[LOG] $message";\n  }\n}\nclass Order {\n  use Loggable;\n}',
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-oop-04",
    courseSlug: "php-web-development",
    question: "What is a PHP namespace, and what problem does it solve?",
    answer:
      "A namespace (`namespace App\\Models;`) groups related classes/functions/constants under a distinct name, preventing naming collisions between similarly-named classes defined in different parts of a codebase or in third-party libraries -- essential once a project or its dependencies grow large enough that name collisions become likely.",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-oop-05",
    courseSlug: "php-web-development",
    question:
      "What is autoloading in PHP, and why is it preferred over manually `require`-ing every class file?",
    answer:
      "Autoloading (typically configured via Composer's PSR-4 autoloading standard) automatically locates and loads a class's file the first time that class is actually referenced, based on a naming/directory convention -- avoids manually writing and maintaining a `require` statement for every single class file as the project grows.",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-oop-06",
    courseSlug: "php-web-development",
    question:
      "What is the difference between `public`, `protected`, and `private` visibility for a PHP class property/method?",
    answer:
      "`public` is accessible from anywhere; `protected` is accessible within the class and its subclasses; `private` is accessible only within the exact class it's defined in, not even by subclasses -- standard encapsulation controls shared conceptually with most other object-oriented languages.",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-oop-07",
    courseSlug: "php-web-development",
    question:
      "What does an abstract class in PHP let you define, and why can't it be instantiated directly?",
    answer:
      "An abstract class can declare abstract methods (signature only, no implementation) alongside real, implemented methods and state -- it can't be instantiated directly because it's intentionally incomplete; a concrete subclass must provide implementations for its abstract methods before it can be instantiated.",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-oop-08",
    courseSlug: "php-web-development",
    question:
      "What does PHP's constructor property promotion syntax (`public function __construct(private string $name) {}`) let you avoid writing?",
    answer:
      "It combines declaring a property and assigning it from a constructor parameter into one line, avoiding the older, more verbose pattern of separately declaring the property AND writing `$this->name = $name;` inside the constructor body for every promoted property.",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-oop-09",
    courseSlug: "php-web-development",
    question:
      "What is the significance of the `__construct` and `__destruct` magic methods in a PHP class?",
    answer:
      "`__construct` runs automatically when a new object is created, used for initialization; `__destruct` runs automatically when an object is about to be destroyed (garbage collected or the script ends), used for cleanup -- both are examples of PHP's broader 'magic method' convention (double-underscore-prefixed methods with special automatic behavior).",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-oop-10",
    courseSlug: "php-web-development",
    question:
      "Why might a class implement multiple small, focused interfaces rather than one large interface with many methods?",
    answer:
      "Small, focused interfaces let a class opt into only the specific capabilities it genuinely supports, and let calling code depend on the narrowest interface it actually needs -- a large interface forces every implementer to provide every method, even ones that don't naturally apply to that specific class.",
    category: "OOP: Classes, Interfaces, Traits & Namespaces",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Composer, Error Handling & Modern Practices (10) ---
  {
    id: "php-interview-composer-01",
    courseSlug: "php-web-development",
    question: "What is Composer, and what does `composer.json` define for a PHP project?",
    answer:
      "Composer is PHP's standard dependency/package manager -- `composer.json` declares a project's dependencies and their version constraints, similar in role to `package.json` for Node.js, and Composer generates `composer.lock` to pin exact installed versions for reproducible installs.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-composer-02",
    courseSlug: "php-web-development",
    question: "What is the difference between `composer install` and `composer update`?",
    answer:
      "`composer install` installs exactly the versions recorded in `composer.lock` (reproducible, respects the lock file); `composer update` re-resolves dependencies against the version constraints in `composer.json`, potentially installing newer versions and updating the lock file itself.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-composer-03",
    courseSlug: "php-web-development",
    question:
      "What is a try/catch block used for in modern PHP, and how does exception handling compare to older PHP error-reporting conventions?",
    answer:
      "`try`/`catch` catches thrown exceptions, letting code handle specific failure types gracefully -- modern PHP encourages exceptions for genuine error conditions, a shift from older conventions that relied more heavily on functions returning `false`/error codes that callers had to remember to check.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-composer-04",
    courseSlug: "php-web-development",
    question:
      "What is the difference between an `Error` and an `Exception` in modern PHP (since PHP 7)?",
    answer:
      "Both implement a common `Throwable` interface and can be caught with `try`/`catch` -- `Exception` (and its subclasses) typically represents recoverable application-level failures a developer anticipated; `Error` (and its subclasses) typically represents more fundamental issues (like calling a method on `null`) that PHP itself raises, which historically weren't catchable at all before PHP 7.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-composer-05",
    courseSlug: "php-web-development",
    question:
      "Why should a production PHP application generally avoid displaying raw error messages/stack traces directly to end users?",
    answer:
      "Detailed error output can reveal internal file paths, database structure, or other implementation details useful to an attacker -- production configuration should log full error details server-side while showing users a generic, safe error message instead.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "advanced",
    commonMistake:
      "Leaving detailed error display enabled in a production PHP environment, exposing internal implementation details to any visitor who triggers an error.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-composer-06",
    courseSlug: "php-web-development",
    question:
      "What does a custom exception class in PHP let you do that catching a generic `Exception` cannot?",
    answer:
      "A custom exception class (`class ValidationException extends Exception {}`) lets calling code catch and react to that SPECIFIC failure type distinctly (`catch (ValidationException $e)`), rather than needing to inspect a generic exception's message string to figure out what kind of failure actually occurred.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-composer-07",
    courseSlug: "php-web-development",
    question:
      "Why do modern PHP frameworks (Laravel, Symfony) typically use Composer's autoloading and PSR standards heavily, rather than each defining its own conventions?",
    answer:
      "Shared, standardized conventions (like PSR-4 autoloading, PSR-12 coding style) let libraries and frameworks interoperate cleanly regardless of which specific framework a project uses -- a library written against these shared standards works consistently across the broader PHP ecosystem, not just one framework's specific conventions.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-composer-08",
    courseSlug: "php-web-development",
    question:
      "What does `composer require vendor/package` do, and how does it modify `composer.json`?",
    answer:
      "It downloads and installs the specified package (and its own dependencies), then automatically adds an entry for it to the project's `composer.json` dependency list -- a single command handling both the installation and the manifest update together.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-composer-09",
    courseSlug: "php-web-development",
    question:
      "Why should the `vendor/` directory (Composer's installed-dependencies folder) generally be excluded from version control?",
    answer:
      "It contains the full, downloaded contents of every dependency, which can be regenerated deterministically from `composer.json`/`composer.lock` via `composer install` -- committing it bloats the repository with derived, regenerable content rather than the actual source-of-truth manifest.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-composer-10",
    courseSlug: "php-web-development",
    question:
      "Why does keeping `composer.lock` committed to version control matter for a team, even though `vendor/` itself typically isn't committed?",
    answer:
      "`composer.lock` pins the EXACT resolved versions of every dependency (including nested sub-dependencies) that were installed -- committing it ensures every team member's `composer install` reproduces the identical dependency tree, rather than each person potentially getting slightly different versions based on when they last ran `composer update`.",
    category: "Composer, Error Handling & Modern Practices",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Web Security Basics (10) ---
  {
    id: "php-interview-security-01",
    courseSlug: "php-web-development",
    question:
      "What is SQL injection, and how do prepared statements (parameterized queries) prevent it?",
    answer:
      "SQL injection occurs when untrusted user input is directly concatenated into a SQL query string, letting crafted input alter the query's actual logic -- prepared statements separate the query's fixed structure from user-supplied values, which are bound as DATA rather than executable SQL syntax, making injection through them structurally impossible.",
    category: "Web Security Basics",
    difficulty: "advanced",
    codeExample:
      '$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");\n$stmt->execute([$email]);',
    commonMistake:
      "Building a SQL query by directly concatenating user input into the query string instead of using a prepared statement.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-security-02",
    courseSlug: "php-web-development",
    question:
      "What is Cross-Site Scripting (XSS), and how does output escaping (e.g. `htmlspecialchars()`) help prevent it?",
    answer:
      "XSS occurs when untrusted user input is rendered directly into an HTML page without escaping, letting crafted input include executable `<script>` content that runs in another user's browser -- `htmlspecialchars()` converts special HTML characters into their safe entity equivalents, so injected markup renders as inert visible text instead of being executed.",
    category: "Web Security Basics",
    difficulty: "advanced",
    codeExample: 'echo htmlspecialchars($userComment, ENT_QUOTES, "UTF-8");',
    commonMistake:
      "Echoing user-submitted content directly into an HTML page without escaping it first, opening an XSS vulnerability.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-security-03",
    courseSlug: "php-web-development",
    question:
      "Why should passwords never be stored in plain text, and what does `password_hash()` do?",
    answer:
      "Storing plain-text passwords means a database breach immediately exposes every user's actual password; `password_hash()` uses a strong, salted hashing algorithm (bcrypt by default) to store an irreversible hash instead -- even with database access, an attacker can't directly recover the original password from the stored hash.",
    category: "Web Security Basics",
    difficulty: "advanced",
    codeExample:
      "$hash = password_hash($plainPassword, PASSWORD_DEFAULT);\n// later:\nif (password_verify($submittedPassword, $hash)) { /* correct */ }",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-security-04",
    courseSlug: "php-web-development",
    question: "What is Cross-Site Request Forgery (CSRF), and what is a common defense against it?",
    answer:
      "An attack tricking a logged-in user's browser into submitting an unwanted request to a site they're authenticated with, exploiting the browser's automatic cookie-sending behavior -- a common defense is including a unique, unpredictable CSRF token in each form, verified server-side, so a request forged from another site can't include the correct token.",
    category: "Web Security Basics",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-security-05",
    courseSlug: "php-web-development",
    question:
      "Why is validating an uploaded file's actual content type (not just trusting its filename extension or client-supplied MIME type) important for file-upload security?",
    answer:
      "A client can rename any file to have a `.jpg` extension or spoof the `Content-Type` header, so trusting either alone doesn't guarantee the file's real content -- validating the actual file content (e.g. checking real image dimensions/headers) is necessary to prevent uploading a disguised malicious file.",
    category: "Web Security Basics",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-security-06",
    courseSlug: "php-web-development",
    question:
      "What is directory/path traversal, and how might unsanitized user input in a file path enable it?",
    answer:
      "An attack where crafted input (like `../../etc/passwd`) manipulates a file path to access files outside the intended directory -- if user input is used directly to build a file path without validating/sanitizing it, an attacker could read or write files far outside what the application intended to expose.",
    category: "Web Security Basics",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-security-07",
    courseSlug: "php-web-development",
    question:
      "Why should session cookies typically be configured with the `HttpOnly` and `Secure` flags?",
    answer:
      "`HttpOnly` prevents client-side JavaScript from reading the cookie (mitigating session-token theft via an XSS vulnerability); `Secure` ensures the cookie is only ever sent over HTTPS, not accidentally over an unencrypted connection -- both reduce the ways a session token could leak to an attacker.",
    category: "Web Security Basics",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-security-08",
    courseSlug: "php-web-development",
    question:
      "Why is it risky to rely purely on client-side (JavaScript) form validation for security-relevant checks in a PHP application?",
    answer:
      "Client-side validation can always be bypassed by sending a crafted request directly (via a script or modified client), so it's a UX convenience, not a security boundary -- the PHP backend must independently re-validate every security-relevant rule, since it's the only enforcement point that can't be circumvented by the client.",
    category: "Web Security Basics",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-security-09",
    courseSlug: "php-web-development",
    question:
      "Why should a PHP application avoid displaying detailed database error messages directly to users when a query fails?",
    answer:
      "Detailed database errors can reveal table/column names, query structure, or even database version information that helps an attacker craft a more targeted attack (like refining a SQL injection attempt) -- a generic user-facing error message, with details logged server-side instead, avoids handing an attacker this reconnaissance information.",
    category: "Web Security Basics",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "php-interview-security-10",
    courseSlug: "php-web-development",
    question:
      "Why is 'validate and sanitize all input, escape all output' considered a foundational security mantra for PHP (and web) development generally?",
    answer:
      "Most classic web vulnerabilities (SQL injection, XSS, path traversal) share the same root cause: untrusted input being treated as trusted, either used directly in a sensitive operation (a query, a file path) or rendered directly without escaping -- consistently validating input at the boundary and escaping output at the point of use addresses this entire class of vulnerability systematically, rather than patching each specific instance reactively.",
    category: "Web Security Basics",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
