import type { LessonInput } from "@/lib/content/types";

export const pythonLessons: LessonInput[] = [
  {
    id: "py-syntax-types",
    slug: "py-syntax-types",
    title: "Python Syntax and Basic Types",
    description:
      "Write your first Python statements and learn the four building-block types: int, float, str, and bool.",
    trackSlug: "python",
    courseSlug: "python-fundamentals",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: [],
    objectives: [
      "Run simple Python statements using print()",
      "Distinguish int, float, str, and bool values from one another",
      "Explain how indentation defines a block of code in Python",
    ],
    skills: ["python-syntax", "python-types"],
    tech: [{ name: "Python", version: "3.12" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "Python Tutorial: An Informal Introduction to Python",
        url: "https://docs.python.org/3/tutorial/introduction.html",
      },
    ],
    keywords: ["python", "syntax", "int", "float", "str", "bool", "print", "indentation"],
    explanation: `Python was built around a simple idea: code is read far more often than it is written, so it should look close to plain language. Before building anything real, it helps to know the small set of pieces every Python program is made from.

**Statements and print().** A Python program is a list of statements, usually one per line, executed from top to bottom. The first one worth knowing is a call to \`print()\`, which sends whatever is inside its parentheses to the screen. It is how you "see" what a program is doing while you're learning.

**Variables hold values.** Writing \`age = 29\` creates a variable named \`age\` and stores the value \`29\` in it. Python figures out the type of a value automatically from what you assign — you never have to declare it up front the way some languages require.

**Four types you'll use constantly:**

- **int** — a whole number with no decimal point, like \`29\` or \`-4\`.
- **float** — a number with a decimal point, like \`1.68\` or \`3.0\`, used whenever a fractional value is possible.
- **str** — text, wrapped in either single quotes (\`'hi'\`) or double quotes (\`"hi"\`); both work the same way. An **f-string**, written \`f"Hello, {name}!"\`, lets you drop a variable's value directly inside text.
- **bool** — exactly one of two values, \`True\` or \`False\`, almost always produced by a comparison like \`age > 18\`.

You can always check what type a value is with the built-in \`type()\` function — very useful while you're still building intuition for which type is which.

**Indentation is not decoration — it's syntax.** Many languages group statements into blocks with curly braces \`{ }\`. Python instead uses **consistent indentation** (a fixed number of spaces, conventionally four) to mark which statements belong together, such as the body of a function or the branch of an \`if\`. A line ending in a colon \`:\` announces "an indented block follows." Get the indentation wrong — mix tabs and spaces, or indent by an inconsistent amount — and Python raises an \`IndentationError\` before your program even starts running. This feels strict at first, but it also means Python code you read always visually matches its actual structure; there's no way for the visible indentation and the real logic to silently drift apart the way they sometimes can in brace-based languages.

**Comments** start with \`#\` and are ignored entirely when the program runs — they exist purely so humans (including future you) can leave notes.

None of this requires memorization through repetition alone; it becomes automatic the moment you start typing real code and let the interpreter's error messages guide you. The example and exercises below are designed to get that feedback loop started immediately.`,
    example: {
      language: "python",
      description:
        "Four variables covering all four basic types, plus print() and type() used to inspect them.",
      code: `name = "Ava"
age = 29
height = 1.68
is_learning = True

print("Name:", name)
print("Age in 5 years:", age + 5)
print("Height (m):", height)
print("Still learning?", is_learning)
print(type(age), type(height), type(is_learning))`,
      editable: false,
    },
    editableExample: {
      language: "python",
      description: "Change the name, age, and height values below, then press Run.",
      code: `name = "Ava"
age = 29
height = 1.68
is_learning = True

print(f"{name} is {age} years old and {height} m tall.")`,
      editable: true,
    },
    guidedExercise: {
      id: "py-syntax-types-guided",
      kind: "guided",
      language: "python",
      prompt:
        "The variable price_text holds a price as text. Convert it into a float named price, then create a bool named on_sale that is True when price is less than 30.",
      starterCode: `# A small shop record
item_name = "Wireless Mouse"
price_text = "24.99"  # price arrives as text, like from a web form

# TODO: convert price_text into a float named price
price = 0.0

# TODO: create a bool named on_sale that is True when price is less than 30
on_sale = False

print(item_name, price, on_sale)`,
      solutionCode: `item_name = "Wireless Mouse"
price_text = "24.99"

price = float(price_text)

on_sale = price < 30

print(item_name, price, on_sale)`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    __check("t1", "price is a float", isinstance(price, float), f"price is {type(price).__name__}, expected float")
except Exception as e:
    __check("t1", "price is a float", False, str(e))

try:
    __check("t2", "price equals 24.99", abs(price - 24.99) < 1e-9, f"price was {price}")
except Exception as e:
    __check("t2", "price equals 24.99", False, str(e))

try:
    __check("t3", "on_sale is a bool", isinstance(on_sale, bool), f"on_sale is {type(on_sale).__name__}")
except Exception as e:
    __check("t3", "on_sale is a bool", False, str(e))

try:
    __check("t4", "on_sale is True because 24.99 is less than 30", on_sale is True)
except Exception as e:
    __check("t4", "on_sale is True because 24.99 is less than 30", False, str(e))`,
      tests: [
        { id: "t1", description: "price is a float", hidden: false },
        { id: "t2", description: "price equals 24.99", hidden: false },
        { id: "t3", description: "on_sale is a bool", hidden: false },
        { id: "t4", description: "on_sale is True", hidden: true },
      ],
      hints: [
        "You need a function that converts text into a float, and a comparison that produces True or False.",
        "Python has a built-in function whose name is the type you're converting into.",
        "Use float(price_text) to convert, and price < 30 to compare — comparisons evaluate to a bool automatically.",
        "Example shape: price = float(price_text) then on_sale = price < 30.",
      ],
    },
    independentExercise: {
      id: "py-syntax-types-independent",
      kind: "independent",
      language: "python",
      prompt:
        "Describe a book using Python's basic types: title (str), pages (int), rating (float, 0.0-5.0), is_finished (bool). Then build summary as a single f-string sentence containing the title and the rating.",
      starterCode: `# Describe a book using Python's basic types.
# Define: title (str), pages (int), rating (float), is_finished (bool)
# Then build \`summary\` as an f-string sentence containing title and rating.

title = ""
pages = 0
rating = 0.0
is_finished = False
summary = ""`,
      solutionCode: `title = "Dune"
pages = 412
rating = 4.5
is_finished = True
summary = f"{title} is {rating} out of 5 stars."`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    __check("t1", "title is a non-empty str", isinstance(title, str) and len(title) > 0)
except Exception as e:
    __check("t1", "title is a non-empty str", False, str(e))

try:
    __check("t2", "pages is a positive int", isinstance(pages, int) and not isinstance(pages, bool) and pages > 0)
except Exception as e:
    __check("t2", "pages is a positive int", False, str(e))

try:
    __check("t3", "rating is a float between 0.0 and 5.0", isinstance(rating, float) and 0.0 <= rating <= 5.0)
except Exception as e:
    __check("t3", "rating is a float between 0.0 and 5.0", False, str(e))

try:
    __check("t4", "is_finished is a bool", isinstance(is_finished, bool))
except Exception as e:
    __check("t4", "is_finished is a bool", False, str(e))

try:
    __check("t5", "summary mentions the title and the rating", title in summary and str(rating) in summary, f"summary was {summary!r}")
except Exception as e:
    __check("t5", "summary mentions the title and the rating", False, str(e))`,
      tests: [
        { id: "t1", description: "title is a non-empty str", hidden: false },
        { id: "t2", description: "pages is a positive int", hidden: false },
        { id: "t3", description: "rating is a float between 0.0 and 5.0", hidden: false },
        { id: "t4", description: "is_finished is a bool", hidden: false },
        { id: "t5", description: "summary contains title and rating", hidden: true },
      ],
      hints: [
        "Each variable's type is determined by how you write its value: quotes for str, a decimal point for float, True/False for bool.",
        "Make sure rating has a decimal point (like 4.5) so Python treats it as a float rather than an int.",
        'Build summary with an f-string so you can drop variables directly into the text: f"...{title}...{rating}..."',
        'Example shape: summary = f"{title} is {rating} out of 5 stars."',
      ],
    },
    commonMistakes: [
      "Writing a whole number with a decimal point by accident (or vice versa), which silently changes int to float or float to int.",
      "Mixing tabs and spaces for indentation, which causes an IndentationError even though the code may look aligned in an editor.",
      "Forgetting that comparisons like price < 30 produce a bool value themselves — you don't need an if statement just to get True or False.",
      'Confusing the string "24.99" (text) with the number 24.99 (float) — they look similar but only one supports arithmetic.',
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What type is the value produced by 3 / 2 == 1?",
        choices: ["int", "float", "str", "bool"],
        correctIndex: 3,
        explanation:
          "A comparison using == always produces a bool: either True or False, regardless of the types being compared.",
      },
      {
        id: "q2",
        prompt: "Which of these is a valid way to define a float in Python?",
        choices: ['height = "1.68"', "height = 1.68", "height = 1,68", "height = 1.68f"],
        correctIndex: 1,
        explanation:
          "A float literal is written with a decimal point and no surrounding quotes, such as 1.68. Quotes would make it a str instead.",
      },
      {
        id: "q3",
        prompt: "What determines which statements belong to the same block in Python?",
        choices: [
          "Curly braces { }",
          "Semicolons at the end of each line",
          "Consistent indentation after a line ending in a colon",
          "The order the variables were created in",
        ],
        correctIndex: 2,
        explanation:
          "Python uses indentation, not braces, to group statements into blocks. A colon signals that an indented block follows.",
      },
      {
        id: "q4",
        prompt: "What does type(29) return?",
        choices: ["<class 'str'>", "<class 'int'>", "<class 'float'>", "<class 'bool'>"],
        correctIndex: 1,
        explanation: "29 has no decimal point and isn't True/False, so Python treats it as an int.",
      },
    ],
    takeaway:
      "Every Python value has one of a small set of basic types, and indentation — not punctuation — is what defines a block of code.",
    summary:
      "Python programs are statements executed top to bottom, built from four basic types (int, float, str, bool) and grouped into blocks purely through consistent indentation after a colon. print() and type() are the two functions you'll lean on constantly while learning.",
    nextLessonSlug: "py-conditions-loops",
  },
  {
    id: "py-conditions-loops",
    slug: "py-conditions-loops",
    title: "Conditionals and Loops",
    description: "Make decisions with if/elif/else and repeat work with for and while loops.",
    trackSlug: "python",
    courseSlug: "python-fundamentals",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["py-syntax-types"],
    objectives: [
      "Branch program logic using if, elif, and else",
      "Iterate over sequences and ranges with a for loop",
      "Repeat work conditionally with a while loop, avoiding infinite loops",
    ],
    skills: ["python-control-flow"],
    tech: [{ name: "Python", version: "3.12" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "Python Tutorial: More Control Flow Tools",
        url: "https://docs.python.org/3/tutorial/controlflow.html",
      },
    ],
    keywords: ["if", "elif", "else", "for", "while", "range", "control flow", "python"],
    explanation: `Programs become useful the moment they can make decisions and repeat work. Python gives you two tools for that: conditionals and loops — both built on the indentation rules from the previous lesson.

**if / elif / else.** An \`if\` statement runs its indented block only when a condition is \`True\`. You can chain additional checks with \`elif\` ("else if"), and catch everything else with a final \`else\`. Python checks each condition in order and runs the block for the *first* one that's true, then skips the rest — so order matters when conditions overlap.

\`\`\`
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "F"
\`\`\`

**for loops.** A \`for\` loop repeats its block once for each item in something iterable — a string, a list, or a range of numbers. \`range(5)\` produces the numbers \`0, 1, 2, 3, 4\` — five values starting at zero, *not* including 5. \`range(2, 6)\` gives \`2, 3, 4, 5\`, and \`range(0, 10, 2)\` steps by 2. This "stop value excluded" rule trips up almost everyone at first, so it's worth committing to memory early: \`range(n)\` always produces exactly \`n\` numbers.

**while loops.** A \`while\` loop keeps running its block as long as a condition stays \`True\`, checked fresh before every repetition. Unlike a \`for\` loop, nothing automatically moves you toward the end — *you* are responsible for changing something inside the loop body so the condition eventually becomes false. Forget that step, and you've written an infinite loop that never returns control to the rest of your program.

**Choosing between them.** Reach for \`for\` when you know in advance what you're iterating over (a list of items, a fixed count). Reach for \`while\` when you're repeating "until some condition changes," and you don't know ahead of time how many repetitions that will take — for example, reading input until a sentinel value appears, or accumulating a total until it crosses a threshold.

**Boolean operators.** Conditions can be combined with \`and\`, \`or\`, and \`not\` to express more nuanced logic, such as \`age >= 13 and age < 20\` for "is a teenager."

Together, conditionals and loops are the two ingredients behind almost every algorithm you'll ever write: branch on data, repeat over data. Everything from validating a form to processing a spreadsheet builds on exactly these two patterns.`,
    example: {
      language: "python",
      description:
        "A for loop assigns a letter grade to each score, then a while loop computes the average.",
      code: `scores = [55, 82, 91, 40, 76]

for score in scores:
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    elif score >= 60:
        grade = "D"
    else:
        grade = "F"
    print(f"Score {score} -> Grade {grade}")

total = 0
count = 0
while count < len(scores):
    total += scores[count]
    count += 1

print("Average:", total / len(scores))`,
      editable: false,
    },
    editableExample: {
      language: "python",
      description: "Change the range to go from 1 to 30 (inclusive) and press Run.",
      code: `for n in range(1, 16):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)`,
      editable: true,
    },
    guidedExercise: {
      id: "py-conditions-loops-guided",
      kind: "guided",
      language: "python",
      prompt:
        "Complete the for loop so that even_count ends up holding the number of even values in numbers.",
      starterCode: `numbers = [4, 7, 12, 9, 10, 3, 8]

even_count = 0
for n in numbers:
    # TODO: if n is even, add 1 to even_count
    pass

print("Even numbers found:", even_count)`,
      solutionCode: `numbers = [4, 7, 12, 9, 10, 3, 8]

even_count = 0
for n in numbers:
    if n % 2 == 0:
        even_count += 1

print("Even numbers found:", even_count)`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    __check("t1", "even_count is an int", isinstance(even_count, int) and not isinstance(even_count, bool))
except Exception as e:
    __check("t1", "even_count is an int", False, str(e))

try:
    __check("t2", "even_count equals 4", even_count == 4, f"even_count was {even_count}")
except Exception as e:
    __check("t2", "even_count equals 4", False, str(e))

try:
    __check("t3", "numbers list was not modified", numbers == [4, 7, 12, 9, 10, 3, 8])
except Exception as e:
    __check("t3", "numbers list was not modified", False, str(e))`,
      tests: [
        { id: "t1", description: "even_count is an int", hidden: false },
        { id: "t2", description: "even_count equals 4", hidden: false },
        { id: "t3", description: "numbers list left unchanged", hidden: true },
      ],
      hints: [
        "You need a way to test whether a number is even, and a way to increase a counter.",
        "The remainder operator % tells you what's left over after division — an even number leaves remainder 0 when divided by 2.",
        "Use an if statement with n % 2 == 0, and increase even_count with even_count += 1.",
        "Example shape: if n % 2 == 0:\\n    even_count += 1",
      ],
    },
    independentExercise: {
      id: "py-conditions-loops-independent",
      kind: "independent",
      language: "python",
      prompt:
        "Using a while loop, find how many counting numbers (1, 2, 3, ...) must be added together before the running total reaches at least target = 500. Store the count in terms_needed and the final total in total.",
      starterCode: `target = 500

total = 0
terms_needed = 0

# TODO: use a while loop to keep adding the next counting number (1, 2, 3, ...)
# to total, incrementing terms_needed each time, until total >= target.`,
      solutionCode: `target = 500

total = 0
terms_needed = 0
current = 1

while total < target:
    total += current
    terms_needed += 1
    current += 1`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    __check("t1", "total reaches at least the target", total >= target, f"total was {total}")
except Exception as e:
    __check("t1", "total reaches at least the target", False, str(e))

try:
    __check("t2", "terms_needed equals 32", terms_needed == 32, f"terms_needed was {terms_needed}")
except Exception as e:
    __check("t2", "terms_needed equals 32", False, str(e))

try:
    __check("t3", "total equals 528", total == 528, f"total was {total}")
except Exception as e:
    __check("t3", "total equals 528", False, str(e))

try:
    stopped_early = (total - terms_needed) < target
    __check("t4", "loop stopped as soon as the target was reached, not later", stopped_early)
except Exception as e:
    __check("t4", "loop stopped as soon as the target was reached, not later", False, str(e))`,
      tests: [
        { id: "t1", description: "total reaches at least the target", hidden: false },
        { id: "t2", description: "terms_needed equals 32", hidden: false },
        { id: "t3", description: "total equals 528", hidden: true },
        { id: "t4", description: "loop stops at the first qualifying total", hidden: true },
      ],
      hints: [
        "You'll need a variable to track the next number to add, separate from total and terms_needed.",
        "The while loop's condition should keep the loop running exactly while total is still below target.",
        "Inside the loop, add the current number to total, increase terms_needed by 1, and then move current to the next number.",
        "Example shape: current = 1\\nwhile total < target:\\n    total += current\\n    terms_needed += 1\\n    current += 1",
      ],
    },
    commonMistakes: [
      "Forgetting the colon (:) at the end of an if, elif, else, for, or while line.",
      "Assuming range(1, 5) includes 5 — the stop value is always excluded, so it produces 1, 2, 3, 4.",
      "Writing a while loop whose condition variable never changes inside the loop body, causing an infinite loop.",
      "Using = (assignment) where == (comparison) was intended inside a condition.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does range(5) produce when looped over?",
        choices: ["0, 1, 2, 3, 4", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5", "5 only"],
        correctIndex: 0,
        explanation:
          "range(5) starts at 0 by default and stops before 5, producing exactly 5 values: 0 through 4.",
      },
      {
        id: "q2",
        prompt:
          "Which keyword lets you check an additional condition only if a previous if failed?",
        choices: ["else", "elif", "while", "for"],
        correctIndex: 1,
        explanation:
          "elif ('else if') is checked only when the preceding if (or elif) condition was False.",
      },
      {
        id: "q3",
        prompt:
          "What is most likely to happen if a while loop's condition variable is never updated inside the loop?",
        choices: [
          "Python automatically stops the loop after 100 iterations",
          "The loop runs forever (an infinite loop)",
          "Python raises a SyntaxError immediately",
          "The loop runs exactly once",
        ],
        correctIndex: 1,
        explanation:
          "A while loop re-checks its condition every iteration; if nothing inside the loop changes the values that condition depends on, it never becomes False.",
      },
      {
        id: "q4",
        prompt: "What determines which lines belong to the body of a for loop?",
        choices: [
          "Parentheses around the lines",
          "Consistent indentation under the for line",
          "A semicolon after each line",
          "The word 'end' after the last line",
        ],
        correctIndex: 1,
        explanation:
          "Just like if statements, loop bodies in Python are defined by consistent indentation after the colon.",
      },
    ],
    takeaway:
      "if/elif/else branches your logic, for loops repeat over known sequences, and while loops repeat until a condition you control becomes false.",
    summary:
      "Conditionals (if/elif/else) let a program branch based on data, while for and while loops let it repeat work — for when you know what you're iterating over, while when you're repeating until a condition changes. range() is the most common way to loop a fixed number of times, always excluding its stop value.",
    nextLessonSlug: "py-functions",
  },
  {
    id: "py-functions",
    slug: "py-functions",
    title: "Functions: Reusable Blocks of Logic",
    description:
      "Package logic into reusable functions using def, parameters, defaults, and return.",
    trackSlug: "python",
    courseSlug: "python-fundamentals",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["py-syntax-types", "py-conditions-loops"],
    objectives: [
      "Define functions with def, parameters, and a return value",
      "Use default argument values and keyword arguments",
      "Write a docstring describing what a function does",
    ],
    skills: ["python-functions"],
    tech: [{ name: "Python", version: "3.12" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "Python Tutorial: Defining Functions",
        url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
      },
    ],
    keywords: ["def", "function", "parameter", "argument", "default value", "return", "docstring"],
    explanation: `As programs grow, copying and pasting the same logic in multiple places becomes a liability — fix a bug in one copy and forget the other three, and you have inconsistent behavior. **Functions** solve this by giving a block of logic a name you can call whenever you need it.

**Defining a function.** The \`def\` keyword starts a function definition, followed by a name, parentheses containing zero or more **parameters**, and a colon. Everything indented underneath is the function's body:

\`\`\`
def greet(name):
    return f"Hello, {name}!"
\`\`\`

Calling \`greet("Maya")\` runs that body with \`name\` bound to \`"Maya"\`, and produces the value after \`return\`. The value passed in when calling — \`"Maya"\` — is technically called an **argument**; the placeholder \`name\` inside the definition is the **parameter**. The distinction rarely matters day to day, but the vocabulary shows up in error messages.

**return vs. print.** A common early confusion is treating \`print()\` and \`return\` as the same thing. \`print()\` only displays a value — it doesn't hand anything back to whatever called the function. \`return\` is what actually produces a usable result: it hands a value back to the caller, ends the function immediately, and that value can be stored in a variable, passed to another function, or used in a calculation. A function with no \`return\` statement implicitly returns \`None\`.

**Default arguments.** Writing \`def greet(name, greeting="Hello")\` gives \`greeting\` a fallback value used whenever the caller doesn't supply one. \`greet("Sam")\` uses the default; \`greet("Sam", greeting="Welcome")\` overrides it. Arguments supplied by name like this (\`greeting="Welcome"\`) are called **keyword arguments**, and they can appear in any order as long as they come after any purely positional ones.

**Docstrings.** Immediately after the \`def\` line, a triple-quoted string (\`"""like this"""\`) documents what the function does, its parameters, and what it returns. This isn't just a comment — tools, editors, and the built-in \`help()\` function can read it directly, so it's worth writing one for anything beyond a throwaway script.

**Why this matters for everything that follows.** Functions are the unit almost every other Python feature builds on: modules are collections of functions (and classes), tests call functions and check what they return, and classes attach functions ("methods") to objects. Getting comfortable with parameters, defaults, and \`return\` now pays off in every lesson from here forward.`,
    example: {
      language: "python",
      description:
        "Two functions: one with a default parameter and a docstring, one computing a rectangle's area.",
      code: `def greet(name, greeting="Hello"):
    """Return a friendly greeting for the given name."""
    return f"{greeting}, {name}!"

print(greet("Maya"))
print(greet("Sam", greeting="Welcome"))


def area_of_rectangle(width, height):
    """Return the area of a rectangle given its width and height."""
    return width * height

print(area_of_rectangle(3, 4))`,
      editable: false,
    },
    editableExample: {
      language: "python",
      description:
        "Change the default greeting, or call greet() with a third name, then press Run.",
      code: `def greet(name, greeting="Hello"):
    """Return a friendly greeting for the given name."""
    return f"{greeting}, {name}!"

print(greet("Maya"))
print(greet("Sam", greeting="Welcome"))`,
      editable: true,
    },
    guidedExercise: {
      id: "py-functions-guided",
      kind: "guided",
      language: "python",
      prompt: "Complete calculate_total so it returns subtotal minus discount.",
      starterCode: `def calculate_total(price, quantity, discount=0):
    """Return the total cost after applying a flat discount amount."""
    subtotal = price * quantity
    # TODO: subtract discount from subtotal and return the result
    pass

print(calculate_total(10, 3))
print(calculate_total(10, 3, discount=5))`,
      solutionCode: `def calculate_total(price, quantity, discount=0):
    """Return the total cost after applying a flat discount amount."""
    subtotal = price * quantity
    return subtotal - discount

print(calculate_total(10, 3))
print(calculate_total(10, 3, discount=5))`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    r = calculate_total(10, 3)
    __check("t1", "calculate_total(10, 3) returns 30", r == 30, f"got {r}")
except Exception as e:
    __check("t1", "calculate_total(10, 3) returns 30", False, str(e))

try:
    r = calculate_total(10, 3, discount=5)
    __check("t2", "calculate_total(10, 3, discount=5) returns 25", r == 25, f"got {r}")
except Exception as e:
    __check("t2", "calculate_total(10, 3, discount=5) returns 25", False, str(e))

try:
    r = calculate_total(0, 5)
    __check("t3", "calculate_total(0, 5) returns 0", r == 0, f"got {r}")
except Exception as e:
    __check("t3", "calculate_total(0, 5) returns 0", False, str(e))`,
      tests: [
        { id: "t1", description: "calculate_total(10, 3) returns 30", hidden: false },
        { id: "t2", description: "calculate_total(10, 3, discount=5) returns 25", hidden: false },
        { id: "t3", description: "calculate_total(0, 5) returns 0", hidden: true },
      ],
      hints: [
        "The function needs to send a value back to whoever called it — that's what return is for.",
        "subtotal has already been computed for you; you just need one more expression built from it.",
        "Subtract discount from subtotal, and return that expression directly.",
        "Example shape: return subtotal - discount",
      ],
    },
    independentExercise: {
      id: "py-functions-independent",
      kind: "independent",
      language: "python",
      prompt:
        "Write bmi_category(weight_kg, height_m) that computes BMI = weight_kg / (height_m ** 2) and returns 'underweight' (bmi < 18.5), 'normal' (18.5-24.9), 'overweight' (25-29.9), or 'obese' (30+).",
      starterCode: `def bmi_category(weight_kg, height_m):
    """Return 'underweight', 'normal', 'overweight', or 'obese' based on BMI."""
    # TODO: compute bmi = weight_kg / (height_m ** 2)
    # then return the correct category string based on these thresholds:
    #   bmi < 18.5       -> "underweight"
    #   18.5 <= bmi < 25 -> "normal"
    #   25 <= bmi < 30   -> "overweight"
    #   bmi >= 30        -> "obese"
    pass`,
      solutionCode: `def bmi_category(weight_kg, height_m):
    """Return 'underweight', 'normal', 'overweight', or 'obese' based on BMI."""
    bmi = weight_kg / (height_m ** 2)
    if bmi < 18.5:
        return "underweight"
    elif bmi < 25:
        return "normal"
    elif bmi < 30:
        return "overweight"
    else:
        return "obese"`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    r = bmi_category(50, 1.8)
    __check("t1", "bmi_category(50, 1.8) returns 'underweight'", r == "underweight", f"got {r!r}")
except Exception as e:
    __check("t1", "bmi_category(50, 1.8) returns 'underweight'", False, str(e))

try:
    r = bmi_category(70, 1.75)
    __check("t2", "bmi_category(70, 1.75) returns 'normal'", r == "normal", f"got {r!r}")
except Exception as e:
    __check("t2", "bmi_category(70, 1.75) returns 'normal'", False, str(e))

try:
    r = bmi_category(85, 1.7)
    __check("t3", "bmi_category(85, 1.7) returns 'overweight'", r == "overweight", f"got {r!r}")
except Exception as e:
    __check("t3", "bmi_category(85, 1.7) returns 'overweight'", False, str(e))

try:
    r = bmi_category(100, 1.6)
    __check("t4", "bmi_category(100, 1.6) returns 'obese'", r == "obese", f"got {r!r}")
except Exception as e:
    __check("t4", "bmi_category(100, 1.6) returns 'obese'", False, str(e))`,
      tests: [
        { id: "t1", description: "bmi_category(50, 1.8) returns 'underweight'", hidden: false },
        { id: "t2", description: "bmi_category(70, 1.75) returns 'normal'", hidden: false },
        { id: "t3", description: "bmi_category(85, 1.7) returns 'overweight'", hidden: false },
        { id: "t4", description: "bmi_category(100, 1.6) returns 'obese'", hidden: true },
      ],
      hints: [
        "Start by computing the BMI itself as a single expression using the formula given in the prompt.",
        "You'll need an if/elif/elif/else chain, checked in increasing order of the threshold.",
        "Remember ** is Python's exponent operator, so height_m ** 2 squares the height.",
        'Example shape: bmi = weight_kg / (height_m ** 2)\\nif bmi < 18.5:\\n    return "underweight"',
      ],
    },
    commonMistakes: [
      "Using print() inside a function instead of return, then being surprised the result can't be stored in a variable.",
      "Forgetting that a function without an explicit return statement returns None.",
      "Placing a parameter with a default value before a parameter without one, which Python rejects as a SyntaxError.",
      "Assuming a docstring is just a comment — it's a real string, retrievable via help(function_name) or function_name.__doc__.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does a function return if it has no return statement at all?",
        choices: ["0", '""', "None", "It raises an error"],
        correctIndex: 2,
        explanation:
          "Every Python function returns something; without an explicit return, that something is the special value None.",
      },
      {
        id: "q2",
        prompt: 'Given def greet(name, greeting="Hello"), what does greet("Sam") use for greeting?',
        choices: ['"Hello"', "An error, because greeting is required", "None", "An empty string"],
        correctIndex: 0,
        explanation:
          'Since the caller didn\'t supply greeting, Python falls back to its default value, "Hello".',
      },
      {
        id: "q3",
        prompt: "What is a docstring used for?",
        choices: [
          "It's required for the function to run at all",
          "It documents what a function does and can be read via help() or __doc__",
          "It automatically tests the function's behavior",
          "It sets default values for parameters",
        ],
        correctIndex: 1,
        explanation:
          "A docstring is a triple-quoted string right after def that documents the function; tools and help() can display it.",
      },
      {
        id: "q4",
        prompt: "In calculate_total(10, 3, discount=5), what is discount=5 called?",
        choices: [
          "A positional argument",
          "A keyword argument",
          "A docstring",
          "A default parameter definition",
        ],
        correctIndex: 1,
        explanation:
          "Supplying an argument by name at the call site — discount=5 — is called a keyword argument.",
      },
    ],
    takeaway:
      "Functions turn a block of logic into a reusable, named tool: define it once with def and return, then call it wherever you need that result.",
    summary:
      "Functions are defined with def, take parameters (which may have default values), and hand a result back to the caller via return — distinct from print(), which only displays output. Docstrings document a function's purpose and are readable through help(). Functions are the foundational unit that modules, tests, and classes all build on.",
    nextLessonSlug: "py-collections",
  },
  {
    id: "py-collections",
    slug: "py-collections",
    title: "Lists, Tuples, Sets, and Dictionaries",
    description: "Store and organize groups of data with Python's four core built-in collections.",
    trackSlug: "python",
    courseSlug: "python-fundamentals",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 25,
    prerequisites: ["py-syntax-types", "py-conditions-loops", "py-functions"],
    objectives: [
      "Create and modify lists, and explain why they are mutable",
      "Contrast tuples (immutable) with lists (mutable)",
      "Use a set for uniqueness and fast membership checks",
      "Store and update key-value data with a dictionary",
    ],
    skills: ["python-collections"],
    tech: [{ name: "Python", version: "3.12" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "Python Tutorial: Data Structures",
        url: "https://docs.python.org/3/tutorial/datastructures.html",
      },
    ],
    keywords: ["list", "tuple", "set", "dict", "dictionary", "mutable", "immutable", "collections"],
    explanation: `Real programs rarely deal with just one value at a time — they deal with groups of values: a shopping list, a set of user IDs, a lookup table of settings. Python gives you four built-in collections, each suited to a different shape of problem.

**Lists** — \`["apple", "banana", "cherry"]\` — are ordered, hold items in the order you put them, allow duplicates, and are **mutable**: you can add, remove, or change items after creation with methods like \`.append()\`. Reach for a list whenever order matters and the contents might change over time.

**Tuples** — \`(10, 20)\` — look similar to lists but are **immutable**: once created, their contents cannot change. That immutability is a feature, not a limitation — it signals "this data is fixed" (like coordinates, or a return value bundling two related results), and it lets tuples be used in places lists can't, such as dictionary keys.

**Sets** — \`{101, 102, 103}\` — are unordered collections of **unique** values. Adding a duplicate to a set has no effect; it silently stays out. Sets are ideal for deduplicating data and for checking "is this value present?" extremely quickly, but they don't preserve the order you inserted items in, and they can't hold duplicates by definition.

**Dictionaries** — \`{"name": "Priya", "age": 21}\` — store **key-value pairs**. Instead of looking items up by position (like a list), you look them up by a key: \`student["name"]\`. Keys must be unique and (in practice) immutable — strings, numbers, and tuples all work as keys; lists do not. Dictionaries are how you model anything that looks like a record: a user profile, a JSON API response, configuration settings.

**Mutable vs. immutable, concretely.** Lists, sets, and dictionaries can be changed in place after creation — appending to a list doesn't create a new list, it modifies the existing one. Tuples and strings cannot: any operation that looks like it "changes" a string or tuple actually builds a brand new one. This distinction matters most when you pass a collection into a function, or assign it to a second variable — with a mutable collection, both variables point at the *same* underlying data, so a change through one name is visible through the other.

**Choosing one.** Ask: does order matter and might items repeat? Use a **list**. Is this fixed data that shouldn't change? Use a **tuple**. Do I only care about uniqueness or "is X present"? Use a **set**. Am I looking things up by a meaningful name rather than a position? Use a **dict**. Most real programs end up combining several of these — a list of dictionaries is an extremely common shape for representing a table of records.`,
    visual: {
      kind: "table",
      title: "Mutable vs. Immutable Collections",
      description:
        "List [] — ordered, mutable, allows duplicates, add with .append(). Tuple () — ordered, immutable, allows duplicates, fixed after creation. Set {} — unordered, mutable, unique items only, no indexing by position. Dict {key: value} — unordered by key, mutable, unique keys map to values, looked up by key not position.",
    },
    example: {
      language: "python",
      description:
        "One example of each collection: a mutable list, an immutable tuple, a deduplicating set, and a dictionary being updated.",
      code: `fruits = ["apple", "banana", "cherry"]
fruits.append("date")
print(fruits)

coordinates = (10, 20)
print(coordinates[0])

unique_ids = {101, 102, 102, 103}
print(unique_ids)

student = {"name": "Priya", "age": 21, "major": "Physics"}
student["age"] = 22
print(student["name"], "is", student["age"])`,
      editable: false,
    },
    editableExample: {
      language: "python",
      description: "Add a new key to student, or another fruit to the list, then press Run.",
      code: `fruits = ["apple", "banana", "cherry"]
fruits.append("date")
print(fruits)

student = {"name": "Priya", "age": 21, "major": "Physics"}
student["age"] = 22
print(student)`,
      editable: true,
    },
    guidedExercise: {
      id: "py-collections-guided",
      kind: "guided",
      language: "python",
      prompt:
        "Add a new key 'dates' with value 8 to inventory, and increase the 'bananas' count by 3.",
      starterCode: `inventory = {"apples": 10, "bananas": 5, "cherries": 20}

# TODO: add a new key "dates" with value 8 to inventory
# TODO: increase "bananas" count by 3

print(inventory)`,
      solutionCode: `inventory = {"apples": 10, "bananas": 5, "cherries": 20}

inventory["dates"] = 8
inventory["bananas"] += 3

print(inventory)`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    __check("t1", "inventory has a 'dates' key equal to 8", inventory.get("dates") == 8, f"got {inventory.get('dates')!r}")
except Exception as e:
    __check("t1", "inventory has a 'dates' key equal to 8", False, str(e))

try:
    __check("t2", "'bananas' count is now 8", inventory.get("bananas") == 8, f"got {inventory.get('bananas')!r}")
except Exception as e:
    __check("t2", "'bananas' count is now 8", False, str(e))

try:
    __check("t3", "inventory has exactly 4 keys", len(inventory) == 4, f"got {len(inventory)} keys")
except Exception as e:
    __check("t3", "inventory has exactly 4 keys", False, str(e))`,
      tests: [
        { id: "t1", description: "'dates' key equals 8", hidden: false },
        { id: "t2", description: "'bananas' count equals 8", hidden: false },
        { id: "t3", description: "inventory has exactly 4 keys", hidden: true },
      ],
      hints: [
        "Dictionaries support assigning to a new key exactly like updating an existing one: dict_name[key] = value.",
        "To increase an existing value, read it, add to it, and store it back — Python has a shorthand operator for this.",
        'Use inventory["dates"] = 8 for the new key, and += for the increase.',
        'Example shape: inventory["dates"] = 8\\ninventory["bananas"] += 3',
      ],
    },
    independentExercise: {
      id: "py-collections-independent",
      kind: "independent",
      language: "python",
      prompt:
        "From the words list, build unique_sorted (a sorted list of the unique words) and word_lengths (a dict mapping each unique word to its length).",
      starterCode: `words = ["kiwi", "mango", "kiwi", "fig", "mango", "apple"]

# TODO: build unique_sorted, a sorted list of the unique words
unique_sorted = []

# TODO: build word_lengths, a dict mapping each unique word to its length
word_lengths = {}`,
      solutionCode: `words = ["kiwi", "mango", "kiwi", "fig", "mango", "apple"]

unique_sorted = sorted(set(words))

word_lengths = {word: len(word) for word in set(words)}`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    __check("t1", "unique_sorted is ['apple', 'fig', 'kiwi', 'mango']", unique_sorted == ["apple", "fig", "kiwi", "mango"], f"got {unique_sorted!r}")
except Exception as e:
    __check("t1", "unique_sorted is ['apple', 'fig', 'kiwi', 'mango']", False, str(e))

try:
    expected = {"apple": 5, "fig": 3, "kiwi": 4, "mango": 5}
    __check("t2", "word_lengths maps each unique word to its length", word_lengths == expected, f"got {word_lengths!r}")
except Exception as e:
    __check("t2", "word_lengths maps each unique word to its length", False, str(e))

try:
    __check("t3", "word_lengths is a dict", isinstance(word_lengths, dict))
except Exception as e:
    __check("t3", "word_lengths is a dict", False, str(e))`,
      tests: [
        {
          id: "t1",
          description: "unique_sorted matches expected sorted unique words",
          hidden: false,
        },
        { id: "t2", description: "word_lengths maps words to lengths correctly", hidden: false },
        { id: "t3", description: "word_lengths is a dict", hidden: true },
      ],
      hints: [
        "You need a way to remove duplicates before sorting, and a way to build a dict from an iterable.",
        "set() removes duplicates; sorted() takes any iterable and returns a sorted list from it.",
        "A dict comprehension {key_expr: value_expr for item in iterable} can build word_lengths in one line.",
        "Example shape: unique_sorted = sorted(set(words))\\nword_lengths = {w: len(w) for w in set(words)}",
      ],
    },
    commonMistakes: [
      "Trying to change a tuple's contents (e.g. coordinates[0] = 5), which raises a TypeError since tuples are immutable.",
      "Assuming a set preserves the order items were added in — it doesn't, and printing it may show a different order each time.",
      'Accessing a missing dictionary key with square brackets (student["email"]) and getting a KeyError, instead of using .get("email") to get None safely.',
      'Confusing list indexing (by position, like fruits[0]) with dictionary lookup (by key, like student["name"]) — they use the same square-bracket syntax but mean different things.',
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which collection type is immutable once created?",
        choices: ["list", "dict", "tuple", "set"],
        correctIndex: 2,
        explanation:
          "Tuples cannot be changed after creation; lists, dicts, and sets can all be modified in place.",
      },
      {
        id: "q2",
        prompt: "What happens when you add a value that's already present to a set?",
        choices: [
          "It raises an error",
          "The set stores it twice",
          "Nothing changes — the set still contains only one copy",
          "It replaces every other item in the set",
        ],
        correctIndex: 2,
        explanation:
          "Sets guarantee uniqueness: adding a duplicate value is a no-op because it's already a member.",
      },
      {
        id: "q3",
        prompt:
          "What happens when you access a dictionary key that doesn't exist using square brackets, like student['email']?",
        choices: [
          "It returns None",
          "It raises a KeyError",
          "It creates the key automatically with a value of None",
          "It returns an empty string",
        ],
        correctIndex: 1,
        explanation:
          "Square-bracket access raises a KeyError for a missing key; .get('email') is the safe alternative that returns None instead.",
      },
      {
        id: "q4",
        prompt: "Which method adds a new item to the end of a list?",
        choices: [".add()", ".append()", ".insert()", ".push()"],
        correctIndex: 1,
        explanation:
          ".append() adds one item to the end of a list. .add() is used for sets instead, and Python lists have no .push().",
      },
    ],
    takeaway:
      "Pick the collection that matches your data's shape: list for ordered and changeable, tuple for fixed, set for uniqueness, dict for lookups by key.",
    summary:
      "Python's four core collections cover distinct needs: lists are ordered and mutable, tuples are ordered but immutable, sets guarantee uniqueness with no order, and dictionaries map unique keys to values for lookup by name rather than position. Recognizing which shape your data has is the first step toward choosing the right one.",
    nextLessonSlug: "py-modules-packages",
  },
  {
    id: "py-modules-packages",
    slug: "py-modules-packages",
    title: "Modules, Packages, and Virtual Environments",
    description:
      "Understand how import works, what pip and virtual environments are for, and how Python code is organized beyond a single file.",
    trackSlug: "python",
    courseSlug: "python-fundamentals",
    order: 4,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["py-syntax-types", "py-functions", "py-collections"],
    objectives: [
      "Explain what a module is and how import makes its code available",
      "Describe what a virtual environment is and why projects use one each",
      "Explain the role of pip and a requirements file for installing packages",
      "Use a built-in module (math or random) inside a program",
    ],
    skills: ["python-modules", "python-tooling"],
    tech: [{ name: "Python", version: "3.12" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      { label: "Python Tutorial: Modules", url: "https://docs.python.org/3/tutorial/modules.html" },
      {
        label: "Python Tutorial: Virtual Environments and Packages",
        url: "https://docs.python.org/3/tutorial/venv.html",
      },
    ],
    keywords: [
      "module",
      "import",
      "package",
      "pip",
      "virtual environment",
      "venv",
      "math",
      "random",
    ],
    explanation: `Every program you've written so far has lived in a single file. Real projects quickly outgrow that — logic gets split across many files so it stays organized and reusable. Python's mechanism for this is the **module**.

**Modules.** A module is just a \`.py\` file containing Python code — functions, variables, classes. Any file can use another module's code with \`import module_name\`, which runs that file once and makes everything it defines available as \`module_name.something\`. Python ships with a large standard library of built-in modules you can import without installing anything, including \`math\` (mathematical functions and constants), \`random\` (pseudo-random number generation), \`datetime\`, and many more.

Writing \`import math\` then calling \`math.sqrt(81)\` keeps things organized: you always know \`sqrt\` came from \`math\` rather than colliding with some other function of the same name. You can also write \`from math import sqrt\` to pull a name in directly, at the cost of that clarity — this is why \`from module import *\` (importing everything) is generally discouraged, since it makes it unclear where a given name came from and risks silently overwriting names you already have.

**Packages.** A package is a folder of related modules, distributed and installed as one unit. When you install someone else's package, you're bringing in code you didn't write, so it can immediately provide capabilities — talking to a web API, working with images, running a machine learning model — that would take far longer to build from scratch.

**pip.** Python's standard package installer, \`pip\`, downloads packages from the Python Package Index (PyPI) and installs them into your current Python environment. Running \`pip install requests\`, for example, fetches the popular \`requests\` package so any script in that environment can then \`import requests\`. Projects commonly list their dependencies in a \`requirements.txt\` file so anyone (including a teammate, or a deployment server) can recreate the exact same set of installed packages with one command.

**Virtual environments.** Different projects on the same machine often need *different, sometimes conflicting* versions of the same package. A **virtual environment** (created with \`python -m venv\`) is an isolated, self-contained copy of Python plus its own separate folder of installed packages, so installing something for one project never affects another. You "activate" a virtual environment before working on a project, install what that project needs inside it, and everything stays contained. This is standard practice in essentially every real Python project, from small scripts to production backends.

Because this course runs in a browser-based sandbox with no ability to install external packages, the exercises below use only modules already built into Python — but the \`import\`, \`pip\`, and \`venv\` concepts here are exactly what you'll use the moment you set up Python on your own machine.`,
    visual: {
      kind: "diagram",
      title: "How a project's dependencies stay organized",
      description:
        "Project folder → virtual environment (its own isolated copy of Python + installed packages) → requirements.txt lists what pip should install → import brings a module's code into your script, whether it's a built-in standard-library module or an installed third-party package.",
    },
    example: {
      language: "python",
      description: "Using the built-in math module to compute a circle's area and circumference.",
      code: `import math

radius = 4
area = math.pi * radius ** 2
circumference = 2 * math.pi * radius

print(f"Area: {area:.2f}")
print(f"Circumference: {circumference:.2f}")
print("Square root of 81:", math.sqrt(81))`,
      editable: false,
    },
    editableExample: {
      language: "python",
      description: "Change radius to a different value, then press Run.",
      code: `import math

radius = 4
area = math.pi * radius ** 2
circumference = 2 * math.pi * radius

print(f"Area: {area:.2f}")
print(f"Circumference: {circumference:.2f}")`,
      editable: true,
    },
    guidedExercise: {
      id: "py-modules-packages-guided",
      kind: "guided",
      language: "python",
      prompt:
        "Use random.randint(1, 100) to roll a number and store it in roll. The seed is fixed so the result is reproducible.",
      starterCode: `import random

random.seed(42)

# TODO: use random.randint(1, 100) to generate a number, store it in roll
roll = 0

print("You rolled:", roll)`,
      solutionCode: `import random

random.seed(42)

roll = random.randint(1, 100)

print("You rolled:", roll)`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

import random

try:
    random.seed(42)
    expected_roll = random.randint(1, 100)
    __check("t1", "roll matches random.randint(1, 100) after seeding with 42", roll == expected_roll, f"roll was {roll}, expected {expected_roll}")
except Exception as e:
    __check("t1", "roll matches random.randint(1, 100) after seeding with 42", False, str(e))

try:
    __check("t2", "roll is an int between 1 and 100", isinstance(roll, int) and 1 <= roll <= 100, f"roll was {roll!r}")
except Exception as e:
    __check("t2", "roll is an int between 1 and 100", False, str(e))`,
      tests: [
        {
          id: "t1",
          description: "roll matches the seeded random.randint(1, 100) call",
          hidden: false,
        },
        { id: "t2", description: "roll is an int between 1 and 100", hidden: true },
      ],
      hints: [
        "The random module needs to be imported before you can use it — it already is, at the top of the file.",
        "Look for a function in the random module meant specifically for whole numbers within a range.",
        "random.randint(a, b) returns a random int n such that a <= n <= b, inclusive on both ends.",
        "Example shape: roll = random.randint(1, 100)",
      ],
    },
    independentExercise: {
      id: "py-modules-packages-independent",
      kind: "independent",
      language: "python",
      prompt:
        "Write average(numbers) using sum() and len(), and std_dev(numbers) which uses average() and math.sqrt() to compute the population standard deviation.",
      starterCode: `import math

def average(numbers):
    """Return the arithmetic mean of a list of numbers."""
    # TODO: implement using sum() and len()
    pass

def std_dev(numbers):
    """Return the population standard deviation of a list of numbers."""
    # TODO: use average() and math.sqrt() to implement this
    pass`,
      solutionCode: `import math

def average(numbers):
    """Return the arithmetic mean of a list of numbers."""
    return sum(numbers) / len(numbers)

def std_dev(numbers):
    """Return the population standard deviation of a list of numbers."""
    mean = average(numbers)
    variance = sum((x - mean) ** 2 for x in numbers) / len(numbers)
    return math.sqrt(variance)`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    r = average([2, 4, 4, 4, 5, 5, 7, 9])
    __check("t1", "average of the sample dataset is 5.0", abs(r - 5.0) < 1e-9, f"got {r}")
except Exception as e:
    __check("t1", "average of the sample dataset is 5.0", False, str(e))

try:
    r = std_dev([2, 4, 4, 4, 5, 5, 7, 9])
    __check("t2", "std_dev of the sample dataset is 2.0", abs(r - 2.0) < 1e-9, f"got {r}")
except Exception as e:
    __check("t2", "std_dev of the sample dataset is 2.0", False, str(e))

try:
    r = average([10])
    __check("t3", "average([10]) is 10.0", abs(r - 10.0) < 1e-9, f"got {r}")
except Exception as e:
    __check("t3", "average([10]) is 10.0", False, str(e))

try:
    r = std_dev([10])
    __check("t4", "std_dev([10]) is 0.0", abs(r - 0.0) < 1e-9, f"got {r}")
except Exception as e:
    __check("t4", "std_dev([10]) is 0.0", False, str(e))`,
      tests: [
        { id: "t1", description: "average of the sample dataset is 5.0", hidden: false },
        { id: "t2", description: "std_dev of the sample dataset is 2.0", hidden: false },
        { id: "t3", description: "average([10]) is 10.0", hidden: false },
        { id: "t4", description: "std_dev([10]) is 0.0", hidden: true },
      ],
      hints: [
        "average() is just the sum of the numbers divided by how many there are.",
        "std_dev() needs the average first, then the average of each value's squared distance from that average, then a square root.",
        "math.sqrt() takes the square root; you can call your own average() function from inside std_dev().",
        "Example shape: variance = sum((x - mean) ** 2 for x in numbers) / len(numbers)\\nreturn math.sqrt(variance)",
      ],
    },
    commonMistakes: [
      "Confusing 'import' (loading code that's already available) with 'installing a package' (pip fetching new code from the internet) — import alone can't get you code you never installed.",
      "Using from module import * and then being unable to tell which module a name actually came from once bugs appear.",
      "Skipping virtual environments and installing everything globally, which eventually causes version conflicts between unrelated projects.",
      "Forgetting to activate a project's virtual environment before installing packages, so they end up installed somewhere else entirely.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does running pip install requests actually do?",
        choices: [
          "It imports the requests module into your current script",
          "It downloads the requests package from PyPI and installs it into the current Python environment",
          "It creates a new virtual environment named requests",
          "It writes a requirements.txt file automatically",
        ],
        correctIndex: 1,
        explanation:
          "pip is the installer: it fetches a package from the Python Package Index and installs it so it can then be imported.",
      },
      {
        id: "q2",
        prompt: "What problem do virtual environments primarily solve?",
        choices: [
          "They make Python code run faster",
          "They isolate each project's installed packages so different projects can use different, even conflicting, versions",
          "They automatically write your code's tests",
          "They replace the need for import statements",
        ],
        correctIndex: 1,
        explanation:
          "A virtual environment is a self-contained copy of Python and its installed packages, keeping one project's dependencies from interfering with another's.",
      },
      {
        id: "q3",
        prompt: "What is the difference between import math and from math import sqrt?",
        choices: [
          "There is no difference",
          "import math requires calling math.sqrt(...); from math import sqrt lets you call sqrt(...) directly",
          "from math import sqrt installs the math package; import math does not",
          "import math only works with built-in modules",
        ],
        correctIndex: 1,
        explanation:
          "import math brings in the whole module under its own name, so you access members through it; from math import sqrt pulls just that one name into your file directly.",
      },
      {
        id: "q4",
        prompt: "What is a requirements.txt file conventionally used for?",
        choices: [
          "Listing a project's pip-installable dependencies so they can be reinstalled consistently",
          "Storing a project's test results",
          "Defining a virtual environment's name",
          "Listing which functions a module exports",
        ],
        correctIndex: 0,
        explanation:
          "requirements.txt records which packages (and often which versions) a project depends on, so anyone can recreate the same environment.",
      },
    ],
    takeaway:
      "import loads code that's already available, pip installs new packages from PyPI into your environment, and a virtual environment keeps each project's dependencies isolated from every other project's.",
    summary:
      "Modules are .py files whose code becomes available via import, and packages bundle related modules for distribution. pip installs packages from PyPI, typically tracked in a requirements.txt file, while virtual environments give each project its own isolated set of installed packages so versions never collide across projects.",
    nextLessonSlug: "py-files-exceptions",
  },
  {
    id: "py-files-exceptions",
    slug: "py-files-exceptions",
    title: "Files and Exceptions",
    description:
      "Handle errors gracefully with try/except/finally and raise, and understand how reading and writing files works.",
    trackSlug: "python",
    courseSlug: "python-fundamentals",
    order: 5,
    difficulty: "beginner",
    estimatedMinutes: 25,
    prerequisites: ["py-functions", "py-collections", "py-modules-packages"],
    objectives: [
      "Describe conceptually how open(), read, and write work with files",
      "Handle errors with try/except/finally",
      "Raise an exception deliberately with raise",
    ],
    skills: ["python-error-handling", "python-io"],
    tech: [{ name: "Python", version: "3.12" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "Python Tutorial: Errors and Exceptions",
        url: "https://docs.python.org/3/tutorial/errors.html",
      },
      {
        label: "Python Tutorial: Reading and Writing Files",
        url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files",
      },
    ],
    keywords: ["try", "except", "finally", "raise", "exception", "file", "open", "io.StringIO"],
    explanation: `Two things every real program eventually needs: reading and writing data that outlives the program itself, and handling the moments when something goes wrong.

**Reading and writing files.** On a normal computer, \`open("data.txt", "w")\` opens a file for writing (creating it if needed), and calling \`.write(text)\` on the result sends text into it; \`open("data.txt", "r")\` opens it for reading, and \`.read()\` or looping over the file line by line pulls the text back out. Files should generally be closed once you're done — usually with a \`with open(...) as f:\` block, which closes the file automatically even if an error happens inside it.

**Simulating files in this sandbox.** This lesson's runner executes Python in a sandboxed environment with no persistent disk, so it can't open real files on your computer. To still practice the *behavior* of file I/O, the examples below use \`io.StringIO\`, a built-in class that behaves like an open file but stores its contents in memory instead of on disk. Everything you do with it — \`.write()\`, reading lines, \`.seek(0)\` to "rewind" back to the start before reading — mirrors what you'd do with a real file object; only the storage location differs.

**Exceptions.** When something goes wrong at runtime — converting text that isn't a number, dividing by zero, looking up a key that doesn't exist — Python raises an **exception**, which stops the program unless something catches it. A \`try\`/\`except\` block lets you catch a specific exception type and recover instead of crashing:

\`\`\`
try:
    value = int(user_input)
except ValueError as error:
    print("That wasn't a number:", error)
\`\`\`

Catching a *specific* exception type (like \`ValueError\`) rather than a bare \`except:\` is important — a bare except silently swallows every kind of error, including ones you never anticipated and would rather see fail loudly.

**finally.** An optional \`finally\` block runs no matter what happened in the \`try\` — whether it succeeded, raised a handled exception, or even raised one that wasn't caught. It's the natural place for cleanup that must always happen, such as closing a file or a network connection.

**raise.** You can trigger your own exception with \`raise\`, typically to reject invalid input to a function before it causes confusing behavior further down the line: \`raise ValueError("age cannot be negative")\`. Combined with a descriptive message, this makes bugs far easier to track down than letting invalid data silently propagate and fail somewhere unrelated.

Together, file I/O and exception handling are what let a program interact with the messy outside world — user input, other systems, files — without falling over the first time something isn't exactly as expected.`,
    example: {
      language: "python",
      description:
        "io.StringIO stands in for a real file since this sandbox has no persistent disk; try/except/finally handles a bad conversion.",
      code: `import io

# io.StringIO acts like an in-memory file, standing in for a real file on disk.
fake_file = io.StringIO()
fake_file.write("apple,3\\n")
fake_file.write("banana,5\\n")

fake_file.seek(0)  # rewind to the beginning, like reopening a file for reading

for line in fake_file:
    name, count = line.strip().split(",")
    print(f"{name}: {count} units")

try:
    value = int("not-a-number")
except ValueError as error:
    print("Could not convert:", error)
finally:
    fake_file.close()
    print("Cleanup complete.")`,
      editable: false,
    },
    editableExample: {
      language: "python",
      description: "Add a third line to fake_file before it's rewound, then press Run.",
      code: `import io

fake_file = io.StringIO()
fake_file.write("apple,3\\n")
fake_file.write("banana,5\\n")

fake_file.seek(0)

for line in fake_file:
    name, count = line.strip().split(",")
    print(f"{name}: {count} units")

fake_file.close()`,
      editable: true,
    },
    guidedExercise: {
      id: "py-files-exceptions-guided",
      kind: "guided",
      language: "python",
      prompt:
        "Complete safe_divide so it raises ValueError('Cannot divide by zero') when b is 0, and otherwise returns a / b.",
      starterCode: `def safe_divide(a, b):
    """Return a / b, raising ValueError if b is 0."""
    # TODO: if b == 0, raise ValueError("Cannot divide by zero")
    # otherwise return a / b
    pass

results = []
for a, b in [(10, 2), (5, 0), (9, 3)]:
    try:
        results.append(safe_divide(a, b))
    except ValueError as error:
        results.append(str(error))

print(results)`,
      solutionCode: `def safe_divide(a, b):
    """Return a / b, raising ValueError if b is 0."""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

results = []
for a, b in [(10, 2), (5, 0), (9, 3)]:
    try:
        results.append(safe_divide(a, b))
    except ValueError as error:
        results.append(str(error))

print(results)`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    r = safe_divide(10, 2)
    __check("t1", "safe_divide(10, 2) returns 5.0", r == 5.0, f"got {r}")
except Exception as e:
    __check("t1", "safe_divide(10, 2) returns 5.0", False, str(e))

try:
    raised = False
    try:
        safe_divide(5, 0)
    except ValueError:
        raised = True
    __check("t2", "safe_divide(5, 0) raises ValueError", raised)
except Exception as e:
    __check("t2", "safe_divide(5, 0) raises ValueError", False, str(e))

try:
    __check("t3", "results matches the expected list", results == [5.0, "Cannot divide by zero", 3.0], f"got {results!r}")
except Exception as e:
    __check("t3", "results matches the expected list", False, str(e))`,
      tests: [
        { id: "t1", description: "safe_divide(10, 2) returns 5.0", hidden: false },
        { id: "t2", description: "safe_divide(5, 0) raises ValueError", hidden: false },
        { id: "t3", description: "results list matches the expected values", hidden: true },
      ],
      hints: [
        "You need one branch that deliberately raises an error, and one that returns a normal value.",
        "The keyword for deliberately triggering an exception is raise, followed by an exception type and a message.",
        'Use if b == 0: raise ValueError("Cannot divide by zero"), otherwise return a / b.',
        'Example shape: if b == 0:\\n    raise ValueError("Cannot divide by zero")\\nreturn a / b',
      ],
    },
    independentExercise: {
      id: "py-files-exceptions-independent",
      kind: "independent",
      language: "python",
      prompt:
        "Write parse_scores(text), which parses newline-separated 'name,score' lines (as if read from a file) into a dict, skipping any malformed line using try/except instead of crashing.",
      starterCode: `def parse_scores(text):
    """Parse 'name,score' lines into a dict, skipping malformed lines."""
    scores = {}
    for line in text.splitlines():
        # TODO: split line on ',' expecting exactly 2 parts: name and score
        # TODO: convert score to int; if splitting or conversion fails, skip this line
        pass
    return scores`,
      solutionCode: `def parse_scores(text):
    """Parse 'name,score' lines into a dict, skipping malformed lines."""
    scores = {}
    for line in text.splitlines():
        try:
            name, score_text = line.split(",")
            scores[name] = int(score_text)
        except ValueError:
            continue
    return scores`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    text = "alice,90\\nbob,notanumber\\ncarol,78\\nbadline\\ndave,85"
    r = parse_scores(text)
    __check("t1", "malformed lines are skipped, valid ones kept", r == {"alice": 90, "carol": 78, "dave": 85}, f"got {r!r}")
except Exception as e:
    __check("t1", "malformed lines are skipped, valid ones kept", False, str(e))

try:
    r = parse_scores("x,1\\ny,2")
    __check("t2", "all-valid input parses completely", r == {"x": 1, "y": 2}, f"got {r!r}")
except Exception as e:
    __check("t2", "all-valid input parses completely", False, str(e))

try:
    r = parse_scores("")
    __check("t3", "empty text returns an empty dict", r == {}, f"got {r!r}")
except Exception as e:
    __check("t3", "empty text returns an empty dict", False, str(e))`,
      tests: [
        {
          id: "t1",
          description: "malformed lines are skipped while valid ones are kept",
          hidden: false,
        },
        { id: "t2", description: "fully valid input parses completely", hidden: false },
        { id: "t3", description: "empty text returns an empty dict", hidden: true },
      ],
      hints: [
        "Wrap the parsing of a single line in a try/except so one bad line doesn't stop the whole function.",
        "Splitting a line without a comma into exactly two names raises a ValueError when Python tries to unpack it — that's convenient here.",
        "Use line.split(',') to get name and score_text, then int(score_text); catch ValueError around both.",
        'Example shape: try:\\n    name, score_text = line.split(",")\\n    scores[name] = int(score_text)\\nexcept ValueError:\\n    continue',
      ],
    },
    commonMistakes: [
      "Catching a bare except: (every possible error), which can hide real bugs that have nothing to do with the case you meant to handle.",
      "Assuming a file opened for writing with 'w' will be automatically closed without a with block or an explicit .close() call.",
      "Forgetting that finally runs even when the try block returns or raises an exception that isn't caught — it's not just for the 'happy path'.",
      "Expecting normal filesystem access to work in every Python environment; sandboxed and browser-based runtimes often have no real disk at all.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is guaranteed about code inside a finally block?",
        choices: [
          "It only runs if no exception occurred",
          "It only runs if an exception occurred",
          "It runs whether or not an exception occurred in the try block",
          "It never runs if the try block succeeds",
        ],
        correctIndex: 2,
        explanation:
          "finally always executes, regardless of whether the try block succeeded, raised a handled exception, or an unhandled one.",
      },
      {
        id: "q2",
        prompt: "What does the raise statement do?",
        choices: [
          "Catches an exception",
          "Deliberately triggers an exception",
          "Suppresses all future exceptions",
          "Closes an open file",
        ],
        correctIndex: 1,
        explanation:
          "raise deliberately signals that an error condition has occurred, optionally with a specific exception type and message.",
      },
      {
        id: "q3",
        prompt: "Why is except ValueError: usually preferred over a bare except::",
        choices: [
          "Bare except: is a SyntaxError in modern Python",
          "It runs faster",
          "It only catches the specific error you anticipated, letting unrelated bugs surface instead of being hidden",
          "It automatically retries the operation",
        ],
        correctIndex: 2,
        explanation:
          "Catching a specific exception type avoids accidentally hiding unrelated bugs that a bare except would silently swallow.",
      },
      {
        id: "q4",
        prompt: "Why does this lesson use io.StringIO instead of opening a real file?",
        choices: [
          "io.StringIO is faster than real files",
          "The sandboxed runtime this course runs in has no persistent disk, so io.StringIO models file-like behavior in memory instead",
          "Real files don't support .write()",
          "io.StringIO is required before using open()",
        ],
        correctIndex: 1,
        explanation:
          "Since the browser-based sandbox can't access a real filesystem, io.StringIO provides an in-memory object that behaves like an open file for practice purposes.",
      },
    ],
    takeaway:
      "try/except lets you recover from anticipated errors, finally guarantees cleanup code always runs, and raise lets your own functions reject bad input clearly.",
    summary:
      "Files are opened, read, and written with open() and methods like .read()/.write(), ideally inside a with block; this sandbox simulates that behavior with io.StringIO since it has no real disk. try/except catches specific exception types so programs can recover gracefully, finally guarantees cleanup runs regardless of outcome, and raise lets you deliberately signal that something has gone wrong.",
    nextLessonSlug: "py-classes",
  },
  {
    id: "py-classes",
    slug: "py-classes",
    title: "Classes and Objects",
    description:
      "Model real-world things as objects using class, __init__, methods, and attributes.",
    trackSlug: "python",
    courseSlug: "python-fundamentals",
    order: 6,
    difficulty: "beginner",
    estimatedMinutes: 26,
    prerequisites: ["py-functions", "py-collections", "py-files-exceptions"],
    objectives: [
      "Define a class with an __init__ method and instance attributes",
      "Create instances of a class and call their methods",
      "Explain what self refers to inside an instance method",
    ],
    skills: ["python-oop"],
    tech: [{ name: "Python", version: "3.12" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      { label: "Python Tutorial: Classes", url: "https://docs.python.org/3/tutorial/classes.html" },
    ],
    keywords: ["class", "object", "__init__", "self", "method", "instance", "attribute"],
    explanation: `So far, data (variables, lists, dicts) and behavior (functions) have been separate. A **class** lets you bundle both together into a single reusable blueprint for creating **objects** — Python's word for instances of a class.

**Defining a class.** The \`class\` keyword introduces a class, conventionally named in \`CapitalizedWords\`:

\`\`\`
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
\`\`\`

**__init__ and self.** \`__init__\` is a special method Python calls automatically whenever you create a new instance, such as \`BankAccount("Riya", balance=100)\`. Its job is to set up that instance's starting state. Every method you define inside a class — \`__init__\` included — takes \`self\` as its first parameter. \`self\` refers to *this particular instance*: the one the method was actually called on. Writing \`self.owner = owner\` stores \`owner\` as an **attribute** *on this instance specifically*, so two different \`BankAccount\` objects can hold two completely different owners and balances without interfering with each other.

**Creating instances.** Calling a class like a function — \`BankAccount("Riya", balance=100)\` — runs \`__init__\` and hands back a new object. That object is an **instance** of the class; you can create as many independent instances as you like from one class definition.

**Methods.** Functions defined inside a class (besides \`__init__\`) are called **methods**, and they operate on a particular instance's data through \`self\`. Calling \`account.deposit(50)\` is Python's shorthand for "run the \`deposit\` method with \`self\` bound to \`account\`" — you never pass \`self\` explicitly; Python fills it in for you based on which object you called the method on.

**Why bother?** Once you have more than a couple of related pieces of data plus operations on them, passing everything around as separate loose variables and functions gets unwieldy fast. A class keeps an object's data and the operations that make sense on that data living in one place, and every instance you create automatically gets its own independent copy of that data. This is the same idea behind almost every library and framework you'll use later — a database connection, a web request, an AI chat session are all commonly represented as objects with methods, exactly like the small examples here.

**A note on mutable defaults.** Just as with regular functions, avoid using a mutable value like \`[]\` or \`{}\` as a default argument to \`__init__\` — because default argument values are created only once, all instances that rely on the default would end up silently sharing the exact same list or dict, rather than each getting their own.`,
    example: {
      language: "python",
      description:
        "A BankAccount class with __init__, deposit, and withdraw methods, used to create and update one instance.",
      code: `class BankAccount:
    """A simple bank account with a balance and an owner name."""

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        return self.balance


account = BankAccount("Riya", balance=100)
account.deposit(50)
account.withdraw(30)
print(f"{account.owner}'s balance: {account.balance}")`,
      editable: false,
    },
    editableExample: {
      language: "python",
      description:
        "Create a second account for a different owner, then deposit and withdraw different amounts.",
      code: `class BankAccount:
    """A simple bank account with a balance and an owner name."""

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance


account = BankAccount("Riya", balance=100)
account.deposit(50)
print(f"{account.owner}'s balance: {account.balance}")`,
      editable: true,
    },
    guidedExercise: {
      id: "py-classes-guided",
      kind: "guided",
      language: "python",
      prompt: "Complete the perimeter method so it returns 2 * (width + height).",
      starterCode: `class Rectangle:
    """A rectangle defined by width and height."""

    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        # TODO: return 2 * (width + height)
        pass


box = Rectangle(4, 6)
print(box.area(), box.perimeter())`,
      solutionCode: `class Rectangle:
    """A rectangle defined by width and height."""

    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)


box = Rectangle(4, 6)
print(box.area(), box.perimeter())`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    __check("t1", "box.area() returns 24", box.area() == 24, f"got {box.area()}")
except Exception as e:
    __check("t1", "box.area() returns 24", False, str(e))

try:
    __check("t2", "box.perimeter() returns 20", box.perimeter() == 20, f"got {box.perimeter()}")
except Exception as e:
    __check("t2", "box.perimeter() returns 20", False, str(e))

try:
    other = Rectangle(3, 3)
    __check("t3", "a second Rectangle(3, 3) has perimeter 12", other.perimeter() == 12, f"got {other.perimeter()}")
except Exception as e:
    __check("t3", "a second Rectangle(3, 3) has perimeter 12", False, str(e))`,
      tests: [
        { id: "t1", description: "box.area() returns 24", hidden: false },
        { id: "t2", description: "box.perimeter() returns 20", hidden: false },
        { id: "t3", description: "a fresh Rectangle(3, 3) has perimeter 12", hidden: true },
      ],
      hints: [
        "Inside a method, an instance's own attributes are accessed through self, not the bare parameter names from __init__.",
        "The perimeter of a rectangle is twice the sum of its width and height.",
        "Use self.width and self.height, since those are where the values were stored in __init__.",
        "Example shape: return 2 * (self.width + self.height)",
      ],
    },
    independentExercise: {
      id: "py-classes-independent",
      kind: "independent",
      language: "python",
      prompt:
        "Define a Counter class: __init__(self, start=0) stores start as self.value; increment(self, amount=1) adds amount to self.value and returns it; reset(self) sets self.value to 0 and returns it.",
      starterCode: `class Counter:
    """Tracks a running numeric value that can be incremented or reset."""

    def __init__(self, start=0):
        # TODO: store start as self.value
        pass

    def increment(self, amount=1):
        # TODO: add amount to self.value and return the new value
        pass

    def reset(self):
        # TODO: set self.value back to 0 and return it
        pass`,
      solutionCode: `class Counter:
    """Tracks a running numeric value that can be incremented or reset."""

    def __init__(self, start=0):
        self.value = start

    def increment(self, amount=1):
        self.value += amount
        return self.value

    def reset(self):
        self.value = 0
        return self.value`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    c = Counter()
    __check("t1", "Counter() starts at value 0", c.value == 0, f"got {c.value}")
except Exception as e:
    __check("t1", "Counter() starts at value 0", False, str(e))

try:
    c = Counter()
    r = c.increment()
    __check("t2", "increment() with no argument adds 1 and returns 1", r == 1 and c.value == 1, f"got {r}")
except Exception as e:
    __check("t2", "increment() with no argument adds 1 and returns 1", False, str(e))

try:
    c = Counter()
    c.increment()
    r = c.increment(5)
    __check("t3", "increment(5) adds 5, reaching 6", r == 6 and c.value == 6, f"got {r}")
except Exception as e:
    __check("t3", "increment(5) adds 5, reaching 6", False, str(e))

try:
    c = Counter()
    c.increment(9)
    r = c.reset()
    __check("t4", "reset() sets value back to 0 and returns 0", r == 0 and c.value == 0, f"got {r}")
except Exception as e:
    __check("t4", "reset() sets value back to 0 and returns 0", False, str(e))

try:
    c = Counter(10)
    __check("t5", "Counter(10) starts at value 10", c.value == 10, f"got {c.value}")
except Exception as e:
    __check("t5", "Counter(10) starts at value 10", False, str(e))`,
      tests: [
        { id: "t1", description: "Counter() starts at value 0", hidden: false },
        { id: "t2", description: "increment() with no argument adds 1", hidden: false },
        { id: "t3", description: "increment(5) adds 5", hidden: false },
        { id: "t4", description: "reset() returns value to 0", hidden: true },
        { id: "t5", description: "Counter(10) starts at value 10", hidden: true },
      ],
      hints: [
        "Every attribute you want to persist on an instance needs to be assigned through self inside __init__ or another method.",
        "increment and reset both need to change self.value and hand that new value back to whoever called the method.",
        "Use self.value = start in __init__, self.value += amount in increment, and self.value = 0 in reset — each followed by returning self.value.",
        "Example shape: def increment(self, amount=1):\\n    self.value += amount\\n    return self.value",
      ],
    },
    commonMistakes: [
      "Forgetting self as the first parameter of an instance method, which causes a TypeError when the method is called.",
      "Referring to width or height directly inside a method instead of self.width or self.height, causing a NameError.",
      "Confusing the class itself (Rectangle) with an instance of it (box = Rectangle(4, 6)) — only instances have their own attribute values.",
      "Using a mutable default argument in __init__ (like def __init__(self, items=[])), which is shared across every instance that relies on the default.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does self refer to inside an instance method?",
        choices: [
          "The class itself, shared by every instance",
          "The specific instance the method was called on",
          "A global variable",
          "The method's return value",
        ],
        correctIndex: 1,
        explanation:
          "self is how a method accesses the particular instance's own attributes, distinct from any other instance of the same class.",
      },
      {
        id: "q2",
        prompt: "When is __init__ called?",
        choices: [
          "Every time any method on the object is called",
          "Automatically, when a new instance of the class is created",
          "Only if you call it manually",
          "When the program ends",
        ],
        correctIndex: 1,
        explanation:
          "__init__ runs automatically as part of creating a new instance, such as Rectangle(4, 6), to set up its starting attributes.",
      },
      {
        id: "q3",
        prompt: "How do you create an instance of a class named Rectangle?",
        choices: [
          "new Rectangle(4, 6)",
          "Rectangle.create(4, 6)",
          "Rectangle(4, 6)",
          "Rectangle->init(4, 6)",
        ],
        correctIndex: 2,
        explanation:
          "Calling the class like a function, Rectangle(4, 6), creates a new instance and runs __init__ with those arguments.",
      },
      {
        id: "q4",
        prompt: "What's the main risk of def __init__(self, items=[]):?",
        choices: [
          "It causes a SyntaxError",
          "Every instance that uses the default ends up sharing the exact same list",
          "items can never be reassigned",
          "It prevents the class from being instantiated more than once",
        ],
        correctIndex: 1,
        explanation:
          "Default argument values are created once, at function definition time — a mutable default like [] is shared across every call that relies on it.",
      },
    ],
    takeaway:
      "A class bundles data and behavior into a reusable blueprint; each instance you create gets its own independent copy of that data, accessed through self.",
    summary:
      "Classes group related data and behavior together. __init__ runs automatically when a new instance is created and sets up that instance's attributes via self; other methods defined in the class operate on a specific instance's data the same way. Each instance is independent, and avoiding mutable default arguments keeps that independence intact.",
    nextLessonSlug: "py-testing",
  },
  {
    id: "py-testing",
    slug: "py-testing",
    title: "Testing Fundamentals",
    description:
      "Learn why automated tests matter and write simple assert-based tests for your own functions.",
    trackSlug: "python",
    courseSlug: "python-fundamentals",
    order: 7,
    difficulty: "beginner",
    estimatedMinutes: 24,
    prerequisites: ["py-functions", "py-files-exceptions", "py-classes"],
    objectives: [
      "Explain why automated tests catch problems manual checking misses",
      "Write simple test functions using Python's assert statement",
      "Describe what frameworks like unittest and pytest add beyond plain assert statements",
    ],
    skills: ["python-testing"],
    tech: [{ name: "Python", version: "3.12" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-06-01",
    references: [
      {
        label: "Python docs: unittest — Unit testing framework",
        url: "https://docs.python.org/3/library/unittest.html",
      },
    ],
    keywords: ["testing", "assert", "unittest", "pytest", "test case", "regression"],
    explanation: `Every exercise in this course so far has been checked by a program, automatically, the moment you ran it — that's testing, and it's exactly the same idea professional developers rely on to keep large codebases trustworthy as they grow.

**Why manual checking isn't enough.** Running a function once and eyeballing its output feels sufficient in the moment, but it doesn't scale: the moment you change *anything* elsewhere in a program, you'd have to remember every place that might now behave differently and re-check each one by hand. Automated tests do that re-checking for you, instantly, every single time — catching a **regression** (something that used to work but now doesn't) the moment it's introduced, rather than after it ships.

**assert.** Python's built-in \`assert\` statement is the simplest possible test: \`assert condition\` does nothing at all if \`condition\` is \`True\`, and raises an \`AssertionError\` immediately if it's \`False\`. Wrapping a few assertions in an ordinary function turns them into a reusable, repeatable test:

\`\`\`
def test_add():
    assert add(2, 3) == 5
\`\`\`

Calling \`test_add()\` either completes silently (the test passed) or raises an error pointing at the exact failing line (the test failed) — no separate "checking" step required.

**Testing the unhappy path.** Good tests don't just confirm the expected, common case works — they also confirm your code behaves sensibly on edge cases: an empty list, a zero, a negative number, or input that should be rejected outright. If a function is supposed to raise an exception for bad input, you test that by calling it inside a \`try\`/\`except\` and failing the test (\`assert False\`) if the expected exception never showed up — proving the guard actually works, not just that the normal case does.

**Where unittest and pytest come in.** Plain \`assert\` functions work, but as a project grows to hundreds of tests, you want more: automatically discovering and running every test file without listing them by hand, a clear pass/fail report instead of a stack trace, shared setup/teardown logic that runs before and after each test, and the ability to run just one failing test in isolation. Python's built-in \`unittest\` module and the very popular third-party \`pytest\` package both provide exactly that — they are built *around* the same \`assert\` idea you just used, adding structure and tooling on top rather than replacing the core concept.

**The mindset, more than the tool.** The valuable habit isn't memorizing a testing framework's API — it's the instinct to ask "how would I know if this broke?" for every function you write, and to write that check down as code instead of a mental note you'll forget to make next week.`,
    example: {
      language: "python",
      description: "Two simple assert-based tests for an add() function, run directly.",
      code: `def add(a, b):
    return a + b


def test_add_positive_numbers():
    assert add(2, 3) == 5


def test_add_negative_numbers():
    assert add(-1, -1) == -2


test_add_positive_numbers()
test_add_negative_numbers()
print("All tests passed!")`,
      editable: false,
    },
    editableExample: {
      language: "python",
      description:
        "Change one assert to an incorrect expected value and press Run to see what an AssertionError looks like.",
      code: `def add(a, b):
    return a + b


def test_add_positive_numbers():
    assert add(2, 3) == 5


test_add_positive_numbers()
print("All tests passed!")`,
      editable: true,
    },
    guidedExercise: {
      id: "py-testing-guided",
      kind: "guided",
      language: "python",
      prompt:
        "Complete test_is_palindrome with two assert statements checking is_palindrome('Racecar') is True and is_palindrome('Hello') is False.",
      starterCode: `def is_palindrome(text):
    """Return True if text reads the same forwards and backwards (case-insensitive)."""
    cleaned = text.lower()
    return cleaned == cleaned[::-1]


def test_is_palindrome():
    # TODO: assert that is_palindrome("Racecar") is True
    # TODO: assert that is_palindrome("Hello") is False
    pass


test_is_palindrome()
print("Tests finished.")`,
      solutionCode: `def is_palindrome(text):
    """Return True if text reads the same forwards and backwards (case-insensitive)."""
    cleaned = text.lower()
    return cleaned == cleaned[::-1]


def test_is_palindrome():
    assert is_palindrome("Racecar") is True
    assert is_palindrome("Hello") is False


test_is_palindrome()
print("Tests finished.")`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    r = is_palindrome("Level")
    __check("t1", "is_palindrome('Level') is True", r is True, f"got {r!r}")
except Exception as e:
    __check("t1", "is_palindrome('Level') is True", False, str(e))

try:
    r = is_palindrome("Python")
    __check("t2", "is_palindrome('Python') is False", r is False, f"got {r!r}")
except Exception as e:
    __check("t2", "is_palindrome('Python') is False", False, str(e))

try:
    test_is_palindrome()
    __check("t3", "test_is_palindrome() runs without raising an AssertionError", True)
except AssertionError as e:
    __check("t3", "test_is_palindrome() runs without raising an AssertionError", False, str(e))
except Exception as e:
    __check("t3", "test_is_palindrome() runs without raising an AssertionError", False, str(e))

try:
    r = is_palindrome("A")
    __check("t4", "a single character counts as a palindrome", r is True, f"got {r!r}")
except Exception as e:
    __check("t4", "a single character counts as a palindrome", False, str(e))`,
      tests: [
        { id: "t1", description: "is_palindrome('Level') is True", hidden: false },
        { id: "t2", description: "is_palindrome('Python') is False", hidden: false },
        { id: "t3", description: "test_is_palindrome() runs without raising", hidden: true },
        { id: "t4", description: "a single character is a palindrome", hidden: true },
      ],
      hints: [
        "An assert statement takes a condition that should be True; use == or is to compare against the expected value.",
        "You need exactly two assert lines: one expecting True, one expecting False.",
        'is_palindrome("Racecar") should be True; is_palindrome("Hello") should be False.',
        'Example shape: assert is_palindrome("Racecar") is True\\nassert is_palindrome("Hello") is False',
      ],
    },
    independentExercise: {
      id: "py-testing-independent",
      kind: "independent",
      language: "python",
      prompt:
        "Write average(numbers) (raising ValueError for an empty list) plus three assert-based test functions: a typical case, a single-element case, and one confirming the empty-list case raises ValueError.",
      starterCode: `def average(numbers):
    """Return the mean of a non-empty list of numbers; raise ValueError if empty."""
    # TODO: raise ValueError("numbers must not be empty") if the list is empty
    # TODO: otherwise return the sum divided by the count
    pass


def test_average_typical_case():
    # TODO: assert average([2, 4, 6]) == 4.0
    pass


def test_average_single_element():
    # TODO: assert average([10]) == 10.0
    pass


def test_average_empty_raises():
    # TODO: call average([]) inside a try/except that fails the test
    # (via assert False) if ValueError is NOT raised
    pass


test_average_typical_case()
test_average_single_element()
test_average_empty_raises()
print("All tests passed!")`,
      solutionCode: `def average(numbers):
    """Return the mean of a non-empty list of numbers; raise ValueError if empty."""
    if not numbers:
        raise ValueError("numbers must not be empty")
    return sum(numbers) / len(numbers)


def test_average_typical_case():
    assert average([2, 4, 6]) == 4.0


def test_average_single_element():
    assert average([10]) == 10.0


def test_average_empty_raises():
    try:
        average([])
        assert False, "Expected ValueError for empty list"
    except ValueError:
        pass


test_average_typical_case()
test_average_single_element()
test_average_empty_raises()
print("All tests passed!")`,
      harness: `__test_results = []
def __check(id, description, passed, message=""):
    __test_results.append({"id": id, "description": description, "passed": bool(passed), "message": message})

try:
    r = average([2, 4, 6])
    __check("t1", "average([2, 4, 6]) == 4.0", r == 4.0, f"got {r}")
except Exception as e:
    __check("t1", "average([2, 4, 6]) == 4.0", False, str(e))

try:
    r = average([10])
    __check("t2", "average([10]) == 10.0", r == 10.0, f"got {r}")
except Exception as e:
    __check("t2", "average([10]) == 10.0", False, str(e))

try:
    raised = False
    try:
        average([])
    except ValueError:
        raised = True
    __check("t3", "average([]) raises ValueError", raised)
except Exception as e:
    __check("t3", "average([]) raises ValueError", False, str(e))

try:
    test_average_empty_raises()
    __check("t4", "test_average_empty_raises() runs without raising an AssertionError", True)
except AssertionError as e:
    __check("t4", "test_average_empty_raises() runs without raising an AssertionError", False, str(e))
except Exception as e:
    __check("t4", "test_average_empty_raises() runs without raising an AssertionError", False, str(e))

try:
    r = average([1, 2, 3, 4])
    __check("t5", "average([1, 2, 3, 4]) == 2.5", r == 2.5, f"got {r}")
except Exception as e:
    __check("t5", "average([1, 2, 3, 4]) == 2.5", False, str(e))`,
      tests: [
        { id: "t1", description: "average([2, 4, 6]) == 4.0", hidden: false },
        { id: "t2", description: "average([10]) == 10.0", hidden: false },
        { id: "t3", description: "average([]) raises ValueError", hidden: false },
        {
          id: "t4",
          description: "test_average_empty_raises() passes without raising",
          hidden: true,
        },
        { id: "t5", description: "average([1, 2, 3, 4]) == 2.5", hidden: true },
      ],
      hints: [
        "average() needs an early check for the empty-list case before it tries to divide by the count.",
        "The two straightforward test functions are single assert statements comparing average(...) to the expected number.",
        "For the empty-list test, call average([]) inside a try, and if no exception happens, fail deliberately with assert False; catch ValueError to let the expected case pass silently.",
        'Example shape: if not numbers:\\n    raise ValueError("numbers must not be empty")\\nreturn sum(numbers) / len(numbers)',
      ],
    },
    commonMistakes: [
      "Only testing the happy path and never checking edge cases like empty input, zero, or values that should be rejected.",
      "Writing tests that depend on leftover state from a previous test, so they only pass when run in a specific order.",
      "Treating 'the code ran without crashing' as proof it's correct, instead of asserting the actual expected result.",
      "Forgetting to actually call a test function after defining it — a test that's never run can never fail, but it also never catches anything.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What happens when assert condition runs and condition is False?",
        choices: [
          "Nothing — assert only checks True conditions",
          "It raises an AssertionError",
          "It prints a warning but continues",
          "It automatically fixes the condition",
        ],
        correctIndex: 1,
        explanation:
          "assert raises an AssertionError the moment its condition evaluates to False; if the condition is True, it does nothing.",
      },
      {
        id: "q2",
        prompt: "What is a 'regression' in the context of testing?",
        choices: [
          "A new feature that was never implemented",
          "Something that used to work correctly but now behaves incorrectly after a change",
          "A test that takes too long to run",
          "A function with too many parameters",
        ],
        correctIndex: 1,
        explanation:
          "A regression is a previously-working behavior that broke, usually as a side effect of an unrelated change elsewhere in the code.",
      },
      {
        id: "q3",
        prompt:
          "What do frameworks like unittest and pytest add on top of plain assert statements?",
        choices: [
          "A completely different way to check conditions that has nothing to do with assert",
          "Automatic test discovery, structured pass/fail reporting, and shared setup/teardown, built around the same assert idea",
          "The ability to run Python code without an interpreter",
          "Automatic bug fixing",
        ],
        correctIndex: 1,
        explanation:
          "unittest and pytest are built around assert-style checks, adding tooling like discovery, reporting, and fixtures rather than replacing the core idea.",
      },
      {
        id: "q4",
        prompt:
          "How can you test that calling a function with invalid input correctly raises an exception, using plain assert-based testing?",
        choices: [
          "You can't — exceptions can't be tested this way",
          "Call the function directly with assert in front of it",
          "Wrap the call in a try/except, and fail the test (e.g. assert False) if the expected exception was not raised",
          "Add a print statement instead of an assert",
        ],
        correctIndex: 2,
        explanation:
          "Wrapping the call in a try/except lets you confirm the expected exception type actually occurs; failing deliberately if it doesn't makes the test meaningful.",
      },
    ],
    takeaway:
      "Automated tests are just code that checks other code: assert catches problems the moment they're introduced, instead of leaving you to notice them by chance later.",
    summary:
      "Automated tests replace manual, easy-to-forget re-checking with code that verifies behavior every time, catching regressions immediately. Python's assert statement is the simplest building block — it raises an AssertionError on a False condition — and frameworks like unittest and pytest add discovery, reporting, and shared setup on top of that same core idea. Good tests deliberately cover edge cases and expected failures, not just the common case.",
    nextLessonSlug: "git-basics",
  },
];
