import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * Python Fundamentals interview-prep questions -- 50 common technical
 * interview questions covering the course's own topics (syntax/types,
 * control flow, functions, collections, modules, files/exceptions,
 * classes, testing) plus Python staples that regularly come up in real
 * interviews (mutability, list comprehensions, `*args`/`**kwargs`, GIL).
 */
export const pythonInterviewQuestions: InterviewQuestionInput[] = [
  // --- Syntax, Types & Control Flow (10) ---
  {
    id: "py-interview-basics-01",
    courseSlug: "python-fundamentals",
    question: "What is the difference between a list and a tuple in Python?",
    answer:
      "Both are ordered sequences, but a list (`[]`) is mutable -- you can add, remove, or change elements -- while a tuple (`()`) is immutable once created.",
    category: "Syntax, Types & Control Flow",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-basics-02",
    courseSlug: "python-fundamentals",
    question: "What is the difference between `is` and `==` in Python?",
    answer:
      "`==` compares whether two objects have equal values; `is` compares whether two names refer to the exact same object in memory. Two equal-valued objects can still be `is not` each other.",
    category: "Syntax, Types & Control Flow",
    difficulty: "intermediate",
    commonMistake:
      "Using `is` to compare values (e.g. `x is 5`) instead of `==`, which can behave inconsistently depending on Python's internal integer caching.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-basics-03",
    courseSlug: "python-fundamentals",
    question: "What are Python's main built-in mutable and immutable types?",
    answer:
      "Mutable: `list`, `dict`, `set`. Immutable: `int`, `float`, `str`, `tuple`, `frozenset`, `bool`.",
    category: "Syntax, Types & Control Flow",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-basics-04",
    courseSlug: "python-fundamentals",
    question: "How does Python decide code block boundaries, compared to languages using `{}`?",
    answer:
      "Python uses consistent indentation (whitespace) to delimit blocks, rather than braces -- inconsistent indentation within the same block is a syntax error, not just a style issue.",
    category: "Syntax, Types & Control Flow",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-basics-05",
    courseSlug: "python-fundamentals",
    question:
      "What is a list comprehension, and why is it often preferred over an equivalent `for` loop?",
    answer:
      "A concise expression for building a new list -- `[x * 2 for x in nums if x > 0]` -- that's typically more readable and often faster than the equivalent explicit loop with repeated `.append()` calls.",
    category: "Syntax, Types & Control Flow",
    difficulty: "intermediate",
    codeExample: "squares = [n ** 2 for n in range(5)]\n# [0, 1, 4, 9, 16]",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-basics-06",
    courseSlug: "python-fundamentals",
    question: "What is the difference between `range(5)` and a list like `[0, 1, 2, 3, 4]`?",
    answer:
      "`range(5)` is a lazy, memory-efficient sequence object that generates values on demand as you iterate; it doesn't store all values in memory up front the way a real list does.",
    category: "Syntax, Types & Control Flow",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-basics-07",
    courseSlug: "python-fundamentals",
    question:
      "What does Python's `and`/`or` return, as opposed to a strict boolean `True`/`False`?",
    answer:
      '`and`/`or` return one of the actual operand values (short-circuiting), not necessarily a boolean -- `"" or "default"` returns `"default"`, and `5 and 10` returns `10`.',
    category: "Syntax, Types & Control Flow",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-basics-08",
    courseSlug: "python-fundamentals",
    question: "What is string slicing, and how does `text[::-1]` reverse a string?",
    answer:
      "Slicing (`text[start:stop:step]`) extracts a substring/subsequence; `text[::-1]` uses a step of `-1` with default start/stop, walking the string backward from end to start.",
    category: "Syntax, Types & Control Flow",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-basics-09",
    courseSlug: "python-fundamentals",
    question:
      "What is an f-string, and what advantage does it offer over `.format()` or `%` formatting?",
    answer:
      'An f-string (`f"Hello, {name}!"`) embeds expressions directly inside string literals, evaluated at runtime -- generally more readable and slightly faster than older `.format()` or `%`-style formatting.',
    category: "Syntax, Types & Control Flow",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-basics-10",
    courseSlug: "python-fundamentals",
    question: "What does the walrus operator (`:=`) do?",
    answer:
      "It assigns a value to a name as part of a larger expression, letting you both compute and reuse a value inline -- e.g. `if (n := len(data)) > 10:` assigns `n` and checks it in one line.",
    category: "Syntax, Types & Control Flow",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Functions & Scope (10) ---
  {
    id: "py-interview-functions-01",
    courseSlug: "python-fundamentals",
    question: "What is the difference between `*args` and `**kwargs` in a function signature?",
    answer:
      "`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dictionary -- both let a function accept a flexible number of arguments.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    codeExample:
      "def greet(*args, **kwargs):\n    print(args, kwargs)\n\ngreet(1, 2, name=\"Asha\")\n# (1, 2) {'name': 'Asha'}",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-functions-02",
    courseSlug: "python-fundamentals",
    question:
      "Why is using a mutable default argument (like `def f(items=[]):`) considered a common bug?",
    answer:
      "Default argument values are evaluated once, when the function is defined, not on every call -- so a mutable default is shared and accumulates state across every call that doesn't pass its own value.",
    category: "Functions & Scope",
    difficulty: "advanced",
    commonMistake:
      "Using `def add_item(item, bucket=[]):` and being surprised the same list keeps growing across unrelated calls.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-functions-03",
    courseSlug: "python-fundamentals",
    question: "What is a lambda function, and when is it appropriate to use one?",
    answer:
      "An anonymous, single-expression function (`lambda x: x * 2`), appropriate for short throwaway logic like a `sorted()` key function -- generally not used for anything requiring multiple statements or a meaningful name.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-functions-04",
    courseSlug: "python-fundamentals",
    question: "What is a decorator in Python?",
    answer:
      "A function that wraps another function to add behavior (logging, timing, access control) without modifying the wrapped function's own code, applied with `@decorator_name` syntax above a function definition.",
    category: "Functions & Scope",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-functions-05",
    courseSlug: "python-fundamentals",
    question: "What does `return` without a value give back from a function?",
    answer:
      "`None` -- a Python function that runs to completion without an explicit `return value` (or with a bare `return`) implicitly returns `None`.",
    category: "Functions & Scope",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-functions-06",
    courseSlug: "python-fundamentals",
    question: "What is variable scope in the context of Python's LEGB rule?",
    answer:
      "Python resolves a name by checking, in order: Local (current function), Enclosing (any outer function), Global (module level), then Built-in -- the first scope where the name is found wins.",
    category: "Functions & Scope",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-functions-07",
    courseSlug: "python-fundamentals",
    question: "What does the `global` keyword do inside a function?",
    answer:
      "It tells Python that an assignment inside the function should modify the module-level variable of that name, rather than creating a new local variable that shadows it.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-functions-08",
    courseSlug: "python-fundamentals",
    question: "What is a generator function, and how does `yield` differ from `return`?",
    answer:
      "A generator function uses `yield` to produce a sequence of values lazily, pausing its state between each value instead of computing them all up front and exiting like `return` does -- useful for large or infinite sequences.",
    category: "Functions & Scope",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-functions-09",
    courseSlug: "python-fundamentals",
    question: "What is a docstring, and how is it different from a `#` comment?",
    answer:
      'A string literal placed as the first statement in a module, function, class, or method (`"""Explains what this does."""`), accessible at runtime via `.__doc__` and used by documentation/help tools -- unlike `#` comments, which are stripped entirely and unavailable at runtime.',
    category: "Functions & Scope",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-functions-10",
    courseSlug: "python-fundamentals",
    question: "What is type hinting in Python, and does it enforce types at runtime?",
    answer:
      "Type hints (`def add(a: int, b: int) -> int:`) document expected types for readability and static-analysis tools like `mypy`, but Python itself does not enforce or check them at runtime by default.",
    category: "Functions & Scope",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Collections & Data (10) ---
  {
    id: "py-interview-collections-01",
    courseSlug: "python-fundamentals",
    question: "What is the difference between a `list` and a `dict`?",
    answer:
      "A `list` is an ordered sequence indexed by position (`0, 1, 2, ...`); a `dict` is an unordered-by-default (though insertion-order-preserving since Python 3.7) collection of key-value pairs indexed by arbitrary hashable keys.",
    category: "Collections & Data",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-collections-02",
    courseSlug: "python-fundamentals",
    question: "What is a `set`, and what is it useful for?",
    answer:
      "An unordered collection of unique, hashable elements -- useful for removing duplicates from a sequence and for fast membership testing (`x in my_set` is roughly O(1) versus O(n) for a list).",
    category: "Collections & Data",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-collections-03",
    courseSlug: "python-fundamentals",
    question: "How do you safely get a value from a dictionary that might not have the given key?",
    answer:
      "Use `d.get(key, default)`, which returns the default instead of raising a `KeyError` -- as opposed to `d[key]`, which raises if the key is missing.",
    category: "Collections & Data",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-collections-04",
    courseSlug: "python-fundamentals",
    question: "What is a dictionary comprehension?",
    answer:
      "A concise syntax for building a dict from an iterable -- `{k: v * 2 for k, v in prices.items()}` -- analogous to list comprehensions but producing key-value pairs.",
    category: "Collections & Data",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-collections-05",
    courseSlug: "python-fundamentals",
    question: "Why can a tuple be used as a dictionary key, but a list cannot?",
    answer:
      "Dictionary keys must be hashable, and hashability generally requires immutability -- tuples are immutable (and hashable, if their elements are too), while lists are mutable and therefore unhashable.",
    category: "Collections & Data",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-collections-06",
    courseSlug: "python-fundamentals",
    question: "What does `enumerate()` provide when looping over a list?",
    answer:
      "It yields `(index, value)` pairs, letting you access both the position and the value in a `for` loop without manually tracking a counter -- `for i, item in enumerate(items):`.",
    category: "Collections & Data",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-collections-07",
    courseSlug: "python-fundamentals",
    question: "What does `zip()` do with two lists?",
    answer:
      'It pairs up corresponding elements from multiple iterables into tuples, stopping at the shortest input -- `zip([1, 2], ["a", "b"])` produces `(1, "a"), (2, "b")`.',
    category: "Collections & Data",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-collections-08",
    courseSlug: "python-fundamentals",
    question:
      "What is the time complexity of checking `x in my_list` versus `x in my_set` for membership?",
    answer:
      "List membership is O(n) (it may scan every element); set membership is average-case O(1), because sets are backed by a hash table -- this matters for performance on large collections checked repeatedly.",
    category: "Collections & Data",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-collections-09",
    courseSlug: "python-fundamentals",
    question:
      "What is unpacking, and how does `a, b = b, a` swap two variables without a temporary variable?",
    answer:
      "Python evaluates the right-hand side tuple `(b, a)` fully before assigning, then unpacks it into `a, b` in order -- so the swap happens in one step without needing an explicit temp variable.",
    category: "Collections & Data",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-collections-10",
    courseSlug: "python-fundamentals",
    question:
      "What module organization concept do Python 'packages' add on top of individual modules?",
    answer:
      "A package is a directory containing an `__init__.py` (or, in modern Python, optionally just a namespace package) that groups related modules together under a shared importable name, e.g. `import mypackage.submodule`.",
    category: "Collections & Data",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Files, Exceptions & Classes (10) ---
  {
    id: "py-interview-oop-01",
    courseSlug: "python-fundamentals",
    question:
      "Why is using a `with` block recommended when opening a file, instead of manually calling `open()`/`close()`?",
    answer:
      "`with open(path) as f:` guarantees the file is closed automatically once the block exits, even if an exception is raised inside it -- manual `open()`/`close()` risks leaking the file handle if an error occurs before `close()` runs.",
    category: "Files, Exceptions & Classes",
    difficulty: "intermediate",
    commonMistake:
      "Manually calling open()/close() without a try/finally, leaking a file handle when an exception occurs between them.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-oop-02",
    courseSlug: "python-fundamentals",
    question: "What is the difference between `except Exception:` and a bare `except:`?",
    answer:
      "`except Exception:` catches standard runtime errors but lets low-level system-exit signals (like `KeyboardInterrupt` or `SystemExit`) propagate; a bare `except:` catches literally everything, including those, which can make a program impossible to interrupt cleanly.",
    category: "Files, Exceptions & Classes",
    difficulty: "advanced",
    commonMistake:
      "Using a bare except: that silently swallows KeyboardInterrupt, making the running script impossible to Ctrl+C out of.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-oop-03",
    courseSlug: "python-fundamentals",
    question: "What is the purpose of the `finally` block in a `try`/`except`/`finally` statement?",
    answer:
      "Code inside `finally` always runs, whether or not an exception occurred (and even if the `try` or `except` block returns) -- typically used for cleanup like closing a resource.",
    category: "Files, Exceptions & Classes",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-oop-04",
    courseSlug: "python-fundamentals",
    question: "What is the difference between `__init__` and `__new__` in a Python class?",
    answer:
      "`__new__` actually creates and returns a new instance (rarely overridden); `__init__` receives that already-created instance (`self`) and initializes its attributes -- `__init__` doesn't create the object, it configures it.",
    category: "Files, Exceptions & Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-oop-05",
    courseSlug: "python-fundamentals",
    question:
      "What is inheritance, and how do you call a parent class's `__init__` from a subclass?",
    answer:
      "Inheritance lets a class (subclass) reuse and extend another class's (parent's) behavior. You typically call the parent's constructor with `super().__init__(...)` inside the subclass's own `__init__`.",
    category: "Files, Exceptions & Classes",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-oop-06",
    courseSlug: "python-fundamentals",
    question: "What is a class attribute versus an instance attribute?",
    answer:
      "A class attribute is defined directly on the class body and shared across all instances (unless overridden); an instance attribute is set per-object, typically inside `__init__` via `self.attr = value`.",
    category: "Files, Exceptions & Classes",
    difficulty: "intermediate",
    commonMistake:
      "Using a mutable class attribute (like a list) expecting each instance to have its own copy, when all instances actually share the same object.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-oop-07",
    courseSlug: "python-fundamentals",
    question: "What does defining `__str__` and `__repr__` on a class control?",
    answer:
      "`__str__` controls the readable, user-facing string returned by `str(obj)`/`print(obj)`; `__repr__` controls the unambiguous, developer-facing representation shown in a REPL or by `repr(obj)`, ideally detailed enough to help debugging.",
    category: "Files, Exceptions & Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-oop-08",
    courseSlug: "python-fundamentals",
    question:
      "Why might you write automated tests with `pytest` (or `unittest`) rather than manually running a script and checking output by eye?",
    answer:
      "Automated tests are repeatable, fast to re-run after every change, and catch regressions immediately -- manual eyeballing doesn't scale as a codebase grows and doesn't leave a record that a given behavior was verified.",
    category: "Files, Exceptions & Classes",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-oop-09",
    courseSlug: "python-fundamentals",
    question: "What is the purpose of a custom exception class in Python?",
    answer:
      "Subclassing `Exception` (e.g. `class InsufficientFundsError(Exception): pass`) lets calling code catch and handle a specific, meaningful failure mode distinctly from generic errors, rather than parsing a generic exception's message string.",
    category: "Files, Exceptions & Classes",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-oop-10",
    courseSlug: "python-fundamentals",
    question: "What is the difference between a unit test and an integration test?",
    answer:
      "A unit test verifies one small piece of code (a function or method) in isolation, often with dependencies mocked; an integration test verifies that multiple real pieces (e.g. a function and a real database) work correctly together.",
    category: "Files, Exceptions & Classes",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Tooling & Environment (10) ---
  {
    id: "py-interview-tooling-01",
    courseSlug: "python-fundamentals",
    question: "What is a Python virtual environment, and why is it recommended for every project?",
    answer:
      "An isolated, project-specific installation of Python packages (created with `python -m venv .venv`), keeping one project's dependencies from conflicting with another's or with system-wide packages.",
    category: "Tooling & Environment",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-tooling-02",
    courseSlug: "python-fundamentals",
    question: "What is `pip`, and what does a `requirements.txt` file do?",
    answer:
      "`pip` is Python's standard package installer; a `requirements.txt` file lists a project's dependencies (often pinned to specific versions) so `pip install -r requirements.txt` can reproduce the same environment elsewhere.",
    category: "Tooling & Environment",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-tooling-03",
    courseSlug: "python-fundamentals",
    question: "What is PEP 8, and why does it matter for readability in shared codebases?",
    answer:
      "Python's official style guide, covering conventions like naming (`snake_case` for functions/variables), indentation, and line length -- following it makes code more consistent and easier for other contributors to read.",
    category: "Tooling & Environment",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-tooling-04",
    courseSlug: "python-fundamentals",
    question: 'What does `if __name__ == "__main__":` do at the bottom of a Python script?',
    answer:
      "It guards code so it only runs when the file is executed directly, not when it's imported as a module into another file -- letting a file be both a reusable module and a runnable script.",
    category: "Tooling & Environment",
    difficulty: "intermediate",
    commonMistake:
      "Omitting the __name__ guard, causing top-level script code to run unexpectedly whenever the file is imported elsewhere.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-tooling-05",
    courseSlug: "python-fundamentals",
    question:
      "What is the Global Interpreter Lock (GIL), and what does it mean for CPU-bound multi-threaded Python code?",
    answer:
      "The GIL is a lock in CPython ensuring only one thread executes Python bytecode at a time, meaning CPU-bound work doesn't get true parallelism from multiple threads -- CPU-bound parallelism typically requires multiprocessing instead.",
    category: "Tooling & Environment",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-tooling-06",
    courseSlug: "python-fundamentals",
    question: "What is the difference between CPython and 'Python' as a language specification?",
    answer:
      "Python is a language specification; CPython is the most common implementation of it (written in C) -- other implementations exist (PyPy, Jython), and details like the GIL are specific to CPython, not the language itself.",
    category: "Tooling & Environment",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-tooling-07",
    courseSlug: "python-fundamentals",
    question: "What is the difference between a syntax error and a runtime exception in Python?",
    answer:
      "A syntax error is caught before the program runs at all, while parsing the code; a runtime exception (like `ZeroDivisionError` or `KeyError`) occurs while the program is executing, only if that specific line is actually reached.",
    category: "Tooling & Environment",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-tooling-08",
    courseSlug: "python-fundamentals",
    question:
      "Why might a project pin exact dependency versions in `requirements.txt` rather than leaving them unbounded?",
    answer:
      "Pinning versions (e.g. `requests==2.31.0`) ensures every environment installs the exact same dependency code, avoiding bugs caused by an unrelated upstream package update silently changing behavior between installs.",
    category: "Tooling & Environment",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-tooling-09",
    courseSlug: "python-fundamentals",
    question:
      "What is the Python standard library, and why might you check it before adding a third-party package?",
    answer:
      "The set of modules bundled with every Python installation (e.g. `os`, `json`, `datetime`, `re`) -- checking it first avoids adding an unnecessary external dependency when built-in functionality already covers the need.",
    category: "Tooling & Environment",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "py-interview-tooling-10",
    courseSlug: "python-fundamentals",
    question:
      "What does `assert` do in Python, and why shouldn't it be relied on for validating untrusted user input in production?",
    answer:
      "`assert condition` raises an `AssertionError` if the condition is false, but assertions can be globally stripped out when Python runs with optimizations enabled (`-O`), so they're meant for internal invariant checks during development, not for enforcing security-relevant validation.",
    category: "Tooling & Environment",
    difficulty: "advanced",
    commonMistake:
      "Using assert to validate untrusted user input in production code, which can be silently disabled when Python runs with optimizations enabled.",
    lastReviewed: "2026-08-07",
  },
];
