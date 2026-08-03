import type { LessonInput } from "@/lib/content/types";

/**
 * Data Structures and Algorithms.
 *
 * Every exercise in this course is genuine, browser-executable JavaScript —
 * unlike Java or Node.js/Express, DSA needs no local runtime at all: arrays,
 * linked lists, trees, graphs, and every algorithm here are equally real
 * whether implemented in JS or any other language, so this course has no
 * guidedLocalLab lessons. Three lessons carry a substantially larger,
 * "lab-scale" exercise (a reusable structure with edge-case tests, a
 * traversal with edge-case tests, and a constrained algorithm comparison)
 * to satisfy this course's lab requirement inside the existing exercise
 * schema. Complexity claims in this course describe standard, well-known
 * average/worst-case behavior; empirical timing is explicitly distinguished
 * from formal asymptotic analysis (see the complexity lesson).
 */
export const dsaLessons: LessonInput[] = [
  {
    id: "dsa-problem-solving-and-correctness",
    slug: "dsa-problem-solving-and-correctness",
    title: "Problem Decomposition, Correctness, and Testing Algorithms",
    description:
      "How to break an unfamiliar problem into solvable pieces, what it actually means for an algorithm to be correct, and why edge cases decide whether it really is.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Break a stated problem into smaller, independently solvable subproblems",
      "Distinguish an algorithm that 'usually works' from one that is provably correct",
      "Identify the edge cases a solution must handle before writing any code",
    ],
    skills: ["algorithms", "problem-solving"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Array — a foundation for most exercises in this course",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      },
    ],
    keywords: ["algorithms", "problem decomposition", "correctness", "edge cases"],
    explanation: `Every algorithm problem gets more tractable once you separate three questions that are easy to blur together: **what** is being asked (the precise input/output contract), **how** you'll compute it (the algorithm), and **why** it's correct (an argument, not a hope). Skipping straight to code without pinning down the first question is the single most common reason a solution "mostly works" but fails on inputs the author never considered.

**Decomposition** means breaking an unfamiliar problem into smaller pieces you already know how to solve, then combining those pieces. "Find the two numbers in a list that sum to a target" decomposes into "for each number, can I quickly check whether (target - number) has already been seen?" — which reduces the original problem to a lookup problem, a piece you already have tools for (the collections you'll cover throughout this course). Recognizing that a new problem is really a disguised version of one you already know how to solve is a skill that improves specifically with deliberate practice across many problems, not a fixed talent.

An algorithm is **correct** if it produces the right output for *every* valid input, not just the ones you happened to try. A convincing correctness argument usually walks through: the general case (does the core logic actually do what's claimed?), the **boundary cases** (an empty input, a single-element input, the first/last position), and any input shape the problem statement allows but that's easy to forget (duplicate values, negative numbers, already-sorted input, all-identical values). **Testing** an algorithm means deliberately constructing inputs that exercise each of those categories — a test suite that only checks one "normal-looking" input tells you almost nothing about whether the algorithm is actually correct, only that it isn't obviously broken on that one case.`,
    example: {
      language: "javascript",
      description:
        "A solution that looks correct at a glance but has an untested edge case -- and the fix.",
      code: `// BROKEN for one important edge case -- can you spot it before running?
function firstAndLast(arr) {
  return [arr[0], arr[arr.length - 1]];
}

console.log(firstAndLast([1, 2, 3])); // [1, 3] -- looks right
console.log(firstAndLast([]));         // [undefined, undefined] -- is that the right answer, or a bug?
// The FIX starts with deciding, explicitly, what should happen for an empty array --
// before writing more code. There is no "obviously correct" default; it depends on the spec.`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Decide what firstAndLast([]) SHOULD do (throw? return null? return [undefined, undefined]?), then implement your decision.",
      code: `function firstAndLast(arr) {
  return [arr[0], arr[arr.length - 1]];
}
console.log(firstAndLast([42]));`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isPalindrome(str) that returns true if str reads the same forwards and backwards, case-sensitively, with NO special-casing beyond the general algorithm -- it must handle the empty string and single-character strings correctly using the same logic as everything else (no early-return special case needed if your general algorithm is right).",
      starterCode: `function isPalindrome(str) {
  // TODO: compare str to its own reverse
}
`,
      solutionCode: `function isPalindrome(str) {
  const reversed = str.split("").reverse().join("");
  return str === reversed;
}`,
      harness: `
        try { window.__report('t1', isPalindrome("racecar") === true, '"racecar" should be a palindrome'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isPalindrome("hello") === false, '"hello" should not be a palindrome'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isPalindrome("") === true, 'an empty string is trivially a palindrome'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', isPalindrome("a") === true, 'a single character is trivially a palindrome'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a palindrome" },
        { id: "t2", description: "correctly rejects a non-palindrome" },
        { id: "t3", description: "handles the empty string edge case" },
        { id: "t4", description: "handles the single-character edge case" },
      ],
      hints: [
        "A general algorithm (compare to its own reverse) naturally handles the empty and single-character cases without any special-casing -- that's a sign it's genuinely correct, not just patched to pass known cases.",
        "str.split('').reverse().join('') is a concise way to reverse a string in JS.",
      ],
    },
    independentExercise: {
      id: "dsa-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write findPairSummingTo(numbers, target) that returns true if any TWO DISTINCT positions in numbers sum to target, false otherwise. A single element cannot pair with itself unless it appears twice in the array. Handle an empty array and a single-element array correctly (both should return false).",
      starterCode: `function findPairSummingTo(numbers, target) {
  // TODO
}
`,
      solutionCode: `function findPairSummingTo(numbers, target) {
  const seen = new Set();
  for (const n of numbers) {
    if (seen.has(target - n)) return true;
    seen.add(n);
  }
  return false;
}`,
      harness: `
        try { window.__report('t1', findPairSummingTo([2,7,11,15], 9) === true, '2+7=9 should be found'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', findPairSummingTo([1,2,3], 100) === false, 'no pair sums to 100'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', findPairSummingTo([], 5) === false, 'empty array should be false'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', findPairSummingTo([5], 10) === false, 'a single element cannot pair with itself'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try { window.__report('t5', findPairSummingTo([5,5], 10) === true, 'two occurrences of 5 CAN pair to sum 10'); } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds a valid pair" },
        { id: "t2", description: "correctly reports no pair exists" },
        { id: "t3", description: "handles an empty array" },
        { id: "t4", description: "a single element never pairs with itself" },
        { id: "t5", description: "two equal values at different positions can form a valid pair" },
      ],
      hints: [
        "Check seen.has(target - n) BEFORE adding n to seen -- this is exactly what prevents a single element from pairing with itself.",
        "This is the same 'reduce to a lookup problem' decomposition described in this lesson's explanation.",
      ],
    },
    commonMistakes: [
      "Writing code before deciding what the answer should be for empty input, a single element, or duplicate values -- guessing an answer for these AFTER a bug report is far more error-prone than deciding upfront.",
      "Testing only one 'normal-looking' input and treating a passing result as proof of correctness -- a single passing test proves the algorithm isn't obviously broken, nothing more.",
      "Confusing 'I can't think of a case where this fails' with 'I have checked this is correct' -- a genuine correctness argument walks through the boundary and edge cases explicitly, rather than relying on not having thought of a counterexample yet.",
    ],
    quiz: [
      {
        id: "dsa-q1-1",
        prompt: "What does it mean for an algorithm to be 'correct'?",
        choices: [
          "It runs without throwing an error",
          "It produces the right output for every valid input, not just the ones tested so far",
          "It passes at least one test case",
          "It is the fastest known solution to the problem",
        ],
        correctIndex: 1,
        explanation:
          "Correctness is about the full range of valid inputs, not any specific sample. An algorithm that runs without error and passes a handful of tests can still be wrong on inputs nobody tried — speed is a completely separate concern from correctness.",
      },
      {
        id: "dsa-q1-2",
        prompt:
          "Why is 'find the two numbers that sum to a target' often reframed as a lookup problem?",
        choices: [
          "Because lookups are always faster than any other operation",
          "Because for each number, checking whether (target - number) has already been seen reduces the problem to something a hash-based lookup structure solves directly",
          "Because the numbers must be sorted first",
          "It cannot be reframed; it requires checking every pair",
        ],
        correctIndex: 1,
        explanation:
          "This is a classic example of decomposition: recognizing that 'does a complementary value exist' is exactly what a fast membership check (like a Set) answers, turning an apparently pairwise problem into a single pass with lookups.",
      },
      {
        id: "dsa-q1-3",
        prompt:
          "A solution passes every test the author wrote. What's the most accurate conclusion?",
        choices: [
          "The solution is proven correct",
          "The solution isn't obviously broken on the cases tested -- it says nothing about untested inputs, including edge cases",
          "The solution is optimal",
          "No further testing is useful",
        ],
        correctIndex: 1,
        explanation:
          "Passing tests only tells you the algorithm behaves correctly on the specific inputs those tests cover. Genuine confidence requires deliberately testing the boundary and edge cases (empty input, duplicates, single elements) most likely to expose a flawed general algorithm.",
      },
    ],
    takeaway:
      "Pin down exactly what's being asked before writing code, look for a way to reduce the problem to one you already know how to solve, and treat boundary/edge cases as required test inputs, not optional afterthoughts.",
    summary:
      "Decomposition breaks a problem into pieces you already know how to solve. Correctness means right output for every valid input, argued through the general case plus boundary and edge cases. A test suite only tells you what it actually tested — untested inputs remain unknown.",
    nextLessonSlug: "dsa-complexity-and-big-o",
  },
  {
    id: "dsa-complexity-and-big-o",
    slug: "dsa-complexity-and-big-o",
    title: "Time and Space Complexity: Big O, Ω, and Θ",
    description:
      "How to describe an algorithm's growth rate independent of any specific machine, why worst-case matters most, and the difference between measuring and reasoning about performance.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["dsa-problem-solving-and-correctness"],
    objectives: [
      "Determine the Big O time complexity of a piece of code by counting operations relative to input size",
      "Explain the difference between best, average, and worst case, and why worst case is usually the headline number",
      "Distinguish empirical timing from formal asymptotic analysis, and explain why neither alone proves a growth-rate claim",
    ],
    skills: ["algorithms", "complexity", "big-o"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Big O notation primer (Web Performance glossary)",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Big_O_notation",
      },
    ],
    keywords: ["big o", "time complexity", "space complexity", "asymptotic analysis"],
    explanation: `**Big O notation** describes how an algorithm's running time (or memory use) grows as the input size \`n\` grows, ignoring constant factors and lower-order terms — it answers "if I double the input, roughly how much more work happens?" rather than "how many milliseconds does this take on my laptop." \`O(1)\` (constant) means the work doesn't grow with \`n\` at all (accessing \`arr[0]\`). \`O(log n)\` (logarithmic) means the work barely grows as \`n\` grows — doubling \`n\` adds only one more step (binary search, covered later in this course). \`O(n)\` (linear) means work grows proportionally to \`n\` (a single loop over the input). \`O(n log n)\` is the complexity of the best comparison-based sorts (merge sort, covered later). \`O(n²)\` (quadratic) means work grows with the *square* of \`n\` — typically a loop nested inside another loop, each running roughly \`n\` times.

Big O specifically describes an **upper bound** on growth — technically, Big O is one member of a family: **Big Ω (Omega)** describes a *lower* bound (the algorithm takes *at least* this long), and **Big Θ (Theta)** describes a *tight* bound (both upper and lower — the algorithm's growth rate genuinely *is* this, not merely "at most" this). In casual practice, "Big O" is often used loosely to mean "the tight bound," but the distinction matters in precise contexts: an algorithm that's \`O(n²)\` in the worst case might be \`Θ(n)\` in a specific favorable case, and both statements can be true about the same algorithm without contradicting each other.

**Best, average, and worst case** describe how an algorithm's complexity varies across different inputs of the same size — a linear search's *best* case (the target is the first element) is \`O(1)\`, but its *worst* case (the target is last, or absent) is \`O(n)\`; the *average* case, over many random inputs, is also \`O(n)\` (roughly half the array, on average). Worst case is usually the headline number precisely because it's a guarantee — "this will never take longer than X for input size n" — which matters far more for a real system's reliability than a favorable average that could still, on an unlucky input, be slow. **Amortized analysis** describes the *average* cost per operation across a whole *sequence* of operations, even when individual operations vary wildly — an \`ArrayList\`'s \`.add()\` is \`O(1)\` amortized even though any individual call that triggers a resize is genuinely \`O(n)\`, because those expensive resizes happen rarely enough that their cost, spread proportionally across all the \`O(1)\` calls between them, averages out to \`O(1)\` per call.

Crucially, **empirical timing is not the same thing as complexity analysis**. Running two algorithms on a small input and timing which one finishes first tells you almost nothing reliable about their asymptotic growth rate — a technically-\`O(n²)\` algorithm can easily outrun a technically-\`O(n log n)\` one on small \`n\`, because Big O deliberately ignores constant factors that dominate at small sizes. Real complexity analysis comes from counting operations symbolically as a function of \`n\` and reasoning about how that function grows, not from a stopwatch — timing is useful for real-world performance work, but it's a different kind of evidence than an asymptotic growth-rate claim, and one browser-run test on a handful of inputs proves neither.`,
    example: {
      language: "javascript",
      description:
        "Counting operations symbolically, not timing -- this is what actually establishes a complexity claim.",
      code: `// O(n): one pass, work grows linearly with input size.
function sumArray(arr) {
  let total = 0;
  for (const x of arr) total += x; // runs exactly arr.length times
  return total;
}

// O(n^2): a loop nested inside a loop, each running up to n times.
function hasDuplicatePair(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true; // up to ~n*(n-1)/2 comparisons
    }
  }
  return false;
}

// The claim "sumArray scales better than hasDuplicatePair for large inputs" comes from
// counting these loop structures -- NOT from timing them on one specific array size.`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Count the operations in this function by hand before running -- is it O(n) or O(n^2)?",
      code: `function everyOtherElement(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr[i]);
  }
  return result;
}
console.log(everyOtherElement([1,2,3,4,5,6]));`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write classifyComplexity(codeShape) that returns the Big O class for a simplified description of a loop structure. Input is one of: 'single-loop', 'nested-loop', 'no-loop', 'halving-loop' (a loop that divides its range by 2 each iteration, like binary search). Return exactly: 'O(1)', 'O(n)', 'O(n^2)', or 'O(log n)' respectively.",
      starterCode: `function classifyComplexity(codeShape) {
  // TODO: map each shape to its Big O class
}
`,
      solutionCode: `function classifyComplexity(codeShape) {
  const mapping = {
    "no-loop": "O(1)",
    "single-loop": "O(n)",
    "nested-loop": "O(n^2)",
    "halving-loop": "O(log n)",
  };
  return mapping[codeShape];
}`,
      harness: `
        try { window.__report('t1', classifyComplexity("no-loop") === "O(1)", 'no-loop should be O(1)'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', classifyComplexity("single-loop") === "O(n)", 'single-loop should be O(n)'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', classifyComplexity("nested-loop") === "O(n^2)", 'nested-loop should be O(n^2)'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', classifyComplexity("halving-loop") === "O(log n)", 'halving-loop should be O(log n)'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "no-loop maps to O(1)" },
        { id: "t2", description: "single-loop maps to O(n)" },
        { id: "t3", description: "nested-loop maps to O(n^2)" },
        { id: "t4", description: "halving-loop maps to O(log n)" },
      ],
      hints: [
        "A lookup object/map is the cleanest way to express this fixed mapping.",
        "Each loop shape corresponds to one of the four most common complexity classes covered in the explanation.",
      ],
    },
    independentExercise: {
      id: "dsa-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write worstCaseLinearSearchSteps(n) returning the worst-case number of comparisons a linear search over n elements requires (n, since the target might be last or absent), and bestCaseLinearSearchSteps(n) returning the best case (1, if n > 0; 0 if n === 0, since there's nothing to search).",
      starterCode: `function worstCaseLinearSearchSteps(n) {
  // TODO
}
function bestCaseLinearSearchSteps(n) {
  // TODO
}
`,
      solutionCode: `function worstCaseLinearSearchSteps(n) {
  return n;
}
function bestCaseLinearSearchSteps(n) {
  return n === 0 ? 0 : 1;
}`,
      harness: `
        try { window.__report('t1', worstCaseLinearSearchSteps(10) === 10, 'worst case for n=10 should be 10'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', worstCaseLinearSearchSteps(0) === 0, 'worst case for n=0 should be 0'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', bestCaseLinearSearchSteps(10) === 1, 'best case for n=10 should be 1'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', bestCaseLinearSearchSteps(0) === 0, 'best case for n=0 should be 0 (nothing to search)'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "worst case scales linearly with n" },
        { id: "t2", description: "worst case for an empty input is 0" },
        { id: "t3", description: "best case is a constant 1 step for non-empty input" },
        { id: "t4", description: "best case for an empty input is 0, not 1" },
      ],
      hints: [
        "The empty-input edge case (n=0) applies to both functions -- there's nothing to search either way.",
        "This models exactly the best/worst-case distinction from the explanation, applied to the simplest possible algorithm.",
      ],
    },
    commonMistakes: [
      "Timing two algorithms on a small input in a browser console and concluding one 'is' faster asymptotically -- constant factors dominate at small n, so this proves nothing about growth rate at scale.",
      "Reporting only the average case and ignoring worst case for something used in a reliability-sensitive path -- an average that's fine but a worst case that's catastrophic is a real, common source of production incidents.",
      "Treating O(n) and O(n) + O(n) as different complexity classes -- Big O drops constant factors and lower-order terms; O(2n) and O(n) describe the same growth rate.",
    ],
    quiz: [
      {
        id: "dsa-q2-1",
        prompt:
          "A function has one loop that runs exactly arr.length times, doing constant work per iteration. What is its time complexity?",
        choices: ["O(1)", "O(n)", "O(n^2)", "O(log n)"],
        correctIndex: 1,
        explanation:
          "A single pass over the input, with constant work per element, is the definition of O(n) — the total work grows directly, proportionally with the input size.",
      },
      {
        id: "dsa-q2-2",
        prompt:
          "Why is worst-case complexity usually reported as 'the' complexity of an algorithm, rather than average case?",
        choices: [
          "Worst case is always mathematically simpler to compute",
          "Worst case is a guarantee -- 'this will never take longer than X' -- which matters more for reliability than a typical-case number that could still be slow on an unlucky input",
          "Average case is never used in practice",
          "Worst case and average case are always identical",
        ],
        correctIndex: 1,
        explanation:
          "A guaranteed upper bound is far more useful for reasoning about a system's reliability than a number describing 'typical' behavior — a system whose worst case is catastrophic can still fail badly even if its average case looks fine.",
      },
      {
        id: "dsa-q2-3",
        prompt:
          "Running two algorithms once each on a 10-element array and timing them with a stopwatch -- what does this actually prove about their asymptotic complexity?",
        choices: [
          "It definitively proves which algorithm has the better Big O complexity",
          "Very little on its own -- constant factors dominate at small n, and a single run says nothing about how growth compares at scale",
          "It proves both algorithms have the same complexity",
          "It's equivalent to a formal complexity analysis as long as the timing is precise",
        ],
        correctIndex: 1,
        explanation:
          "Empirical timing on a small, single input is a fundamentally different kind of evidence than symbolic operation-counting across all input sizes. Asymptotic claims require reasoning about how the work scales as n grows, which a single timed run at one small size cannot establish.",
      },
    ],
    takeaway:
      "Big O describes how work grows with input size, not how fast something runs on a specific machine or input — establish it by counting operations symbolically, and prefer worst-case guarantees over average-case optimism for anything reliability-sensitive.",
    summary:
      "O(1), O(log n), O(n), O(n log n), and O(n^2) are the growth-rate classes you'll see constantly. Big Θ is a tight bound; Big Ω is a lower bound; Big O is technically an upper bound, though it's often used loosely for the tight bound. Amortized analysis averages cost across a sequence of operations. Empirical timing and asymptotic analysis are different kinds of evidence.",
    nextLessonSlug: "dsa-arrays-and-dynamic-arrays",
  },
  {
    id: "dsa-arrays-and-dynamic-arrays",
    slug: "dsa-arrays-and-dynamic-arrays",
    title: "Arrays, Dynamic Arrays, and Strings as Sequential Data",
    description:
      "Why fixed-size arrays give O(1) index access, how a dynamic array grows without becoming O(n) per insert, and strings as a special case of the same sequential-access tradeoffs.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["dsa-complexity-and-big-o"],
    objectives: [
      "Explain why array index access is O(1) but insertion in the middle is O(n)",
      "Explain how a dynamic array achieves O(1) amortized append despite occasional resizing",
      "Choose between an array-backed structure and alternatives based on the operations a problem actually needs",
    ],
    skills: ["algorithms", "arrays", "data-structures"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Array — push, splice, and indexing complexity",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      },
    ],
    keywords: ["arrays", "dynamic arrays", "strings", "complexity"],
    explanation: `A fixed-size array stores its elements in one contiguous block of memory, which is exactly what makes \`arr[i]\` an \`O(1)\` operation: the address of element \`i\` is computed directly (\`baseAddress + i * elementSize\`), with no searching required, regardless of how large the array is. That same contiguous layout is what makes **insertion in the middle expensive**: inserting at index \`k\` requires shifting every element from \`k\` onward one position to make room — an \`O(n)\` operation in the worst case (inserting at the front), because up to \`n\` elements might need to move. Removing from the middle has the same \`O(n)\` cost, for the same reason: closing the gap means shifting everything after it back by one.

A **dynamic array** (JavaScript's \`Array\`, Java's \`ArrayList\`, Python's \`list\`) is a fixed-size array under the hood, plus logic to transparently replace it with a larger one when it fills up. When \`.push()\` is called on a full backing array, the implementation allocates a new array — typically **double** the previous capacity, not just one element more — copies every existing element across, and only then adds the new one. That doubling strategy is the entire trick behind the earlier lesson's amortized-analysis claim: resizes become exponentially rarer as the array grows (you double from 4 to 8, 8 to 16, 16 to 32...), so the total cost of all the copying, spread proportionally across every \`.push()\` call in between, averages out to \`O(1)\` per call — even though any single call that happens to trigger a resize is genuinely \`O(n)\` for that one call.

**Strings**, in most languages including JavaScript, behave like a specialized, immutable array of characters: indexing a character is \`O(1)\`, but because strings are immutable, any "modification" (concatenation, replacing a substring) must allocate an entirely new string, copying the unchanged parts — which is why building a large string by repeatedly concatenating in a loop is \`O(n²)\` overall (each of the \`n\` concatenations copies an ever-growing string), while collecting pieces in an array and joining once at the end is \`O(n)\` overall. This is the exact same underlying tradeoff — contiguous, fixed-size storage traded against fast random access — showing up in a second, extremely common context.`,
    example: {
      language: "javascript",
      description:
        "Amortized O(1) append vs. the O(n) cost of a middle insertion, made visible by counting shifted elements.",
      code: `function insertAt(arr, index, value) {
  let shifts = 0;
  arr.push(undefined); // make room at the end
  for (let i = arr.length - 1; i > index; i--) {
    arr[i] = arr[i - 1]; // shift each element right by one
    shifts++;
  }
  arr[index] = value;
  return shifts;
}

const data = [1, 2, 3, 4, 5];
console.log(insertAt(data, 4, 99)); // inserting near the END: few shifts
console.log(insertAt([1, 2, 3, 4, 5], 0, 99)); // inserting at the FRONT: shifts every element -- O(n)`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Try inserting at the middle index (2) of a 6-element array and compare the shift count to front and back insertion.",
      code: `function insertAt(arr, index, value) {
  let shifts = 0;
  arr.push(undefined);
  for (let i = arr.length - 1; i > index; i--) {
    arr[i] = arr[i - 1];
    shifts++;
  }
  arr[index] = value;
  return shifts;
}
console.log(insertAt([1,2,3,4,5,6], 2, 99));`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write buildStringWithArray(parts) that joins an array of string parts efficiently (O(n) total): use array push/join, NOT string += concatenation in a loop. Then write buildStringNaively(parts) using += concatenation, to compare -- both must produce the identical final string.",
      starterCode: `function buildStringWithArray(parts) {
  // TODO: use an array and .join('') -- O(n) total
}
function buildStringNaively(parts) {
  // TODO: use += in a loop -- O(n^2) total, but must produce the same result
}
`,
      solutionCode: `function buildStringWithArray(parts) {
  const buffer = [];
  for (const p of parts) buffer.push(p);
  return buffer.join("");
}
function buildStringNaively(parts) {
  let result = "";
  for (const p of parts) result += p;
  return result;
}`,
      harness: `
        try { window.__report('t1', buildStringWithArray(["a","b","c"]) === "abc", 'array-join should build the string correctly'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', buildStringNaively(["a","b","c"]) === "abc", 'naive concatenation should build the same string'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', buildStringWithArray([]) === "", 'empty parts should give an empty string'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "array-based building produces the correct string" },
        { id: "t2", description: "naive concatenation produces the same, correct string" },
        { id: "t3", description: "handles an empty parts array" },
      ],
      hints: [
        "Array.prototype.join('') concatenates all elements in one O(n) pass, unlike repeated += which reallocates on every iteration.",
        "Both functions should produce identical output -- only their complexity differs.",
      ],
    },
    independentExercise: {
      id: "dsa-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write countShiftsForFrontInsert(n) returning the number of element shifts required to insert one element at the FRONT of an n-element array (should equal n), and countShiftsForBackInsert(n) returning the shifts required to append at the back (should always be 0, regardless of n).",
      starterCode: `function countShiftsForFrontInsert(n) {
  // TODO
}
function countShiftsForBackInsert(n) {
  // TODO
}
`,
      solutionCode: `function countShiftsForFrontInsert(n) {
  return n;
}
function countShiftsForBackInsert(n) {
  return 0;
}`,
      harness: `
        try { window.__report('t1', countShiftsForFrontInsert(10) === 10, 'front insert into 10 elements should need 10 shifts'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', countShiftsForFrontInsert(0) === 0, 'front insert into an empty array needs 0 shifts'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', countShiftsForBackInsert(1000) === 0, 'back insert never needs any shifts, regardless of size'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "front insertion shift count scales with n" },
        { id: "t2", description: "front insertion into an empty array needs 0 shifts" },
        { id: "t3", description: "back insertion never needs shifts, regardless of array size" },
      ],
      hints: [
        "This directly encodes the O(n) vs O(1) contrast between front and back insertion into an array.",
        "Back insertion (push/append) never needs to move existing elements -- that's exactly why it's O(1) amortized.",
      ],
    },
    commonMistakes: [
      "Repeatedly inserting at the front of a large array in a loop, not realizing each insertion is O(n) -- this silently turns an intended O(n) algorithm into O(n^2) overall.",
      "Building a large string with += inside a loop -- each concatenation allocates a new string and copies everything so far, making the total cost O(n^2), not O(n).",
      "Assuming .push() is always instantaneous -- it's O(1) AMORTIZED, meaning most calls are cheap but an occasional call (when the backing array must grow) is genuinely O(n) for that one call.",
    ],
    quiz: [
      {
        id: "dsa-q3-1",
        prompt: "Why is arr[i] an O(1) operation regardless of array size?",
        choices: [
          "Because JavaScript caches recently accessed indices",
          "Because the address of element i can be computed directly from the array's base address, with no searching required",
          "Because arrays are always small in practice",
          "It's actually O(n) in most languages, including JavaScript",
        ],
        correctIndex: 1,
        explanation:
          "Contiguous storage means index i's location is a direct arithmetic calculation (base + i * element size) — no traversal or search is needed, which is exactly what makes indexed access O(1) no matter how large the array is.",
      },
      {
        id: "dsa-q3-2",
        prompt:
          "A dynamic array doubles its capacity every time it needs to grow. Why does this make .push() O(1) amortized rather than O(n)?",
        choices: [
          "Doubling makes each individual push faster",
          "Resizes (the expensive O(n) copies) become exponentially less frequent as the array grows, so their total cost spreads thin across many cheap pushes, averaging to O(1) per push",
          "JavaScript engines special-case push() to always be O(1) regardless of implementation",
          "It doesn't -- push() really is O(n) every time",
        ],
        correctIndex: 1,
        explanation:
          "Amortized analysis considers the average over a sequence, not any single call. Because doubling makes resizes rarer and rarer relative to the number of elements added since the last resize, the total copying cost divided across all pushes comes out to a constant amount per push, even though any individual resizing push is genuinely O(n) on its own.",
      },
      {
        id: "dsa-q3-3",
        prompt:
          "Why does building a large string with repeated += in a loop end up O(n^2) instead of O(n)?",
        choices: [
          "Because += is disabled for large strings",
          "Because strings are immutable, so every += allocates an entirely new string and copies everything accumulated so far, and this happens on every one of the n iterations",
          "Because JavaScript strings have a maximum length that triggers extra work",
          "It's actually O(n); this is a common misconception",
        ],
        correctIndex: 1,
        explanation:
          "Each += on an immutable string creates a new string containing all previous characters plus the new addition — copying grows with the string's current length, and doing that on every one of n iterations sums to O(n^2) total work, not O(n).",
      },
    ],
    takeaway:
      "Contiguous storage gives arrays O(1) index access at the cost of O(n) middle insertion/removal; a dynamic array's doubling strategy makes .push() O(1) amortized even though any individual resize is O(n); strings share the exact same tradeoffs because they're effectively immutable character arrays.",
    summary:
      "Array index access is O(1); inserting or removing in the middle is O(n) due to shifting. Dynamic arrays double their capacity to keep .push() O(1) amortized. Strings are immutable arrays of characters — build large strings by collecting pieces and joining once, not by repeated concatenation.",
    nextLessonSlug: "dsa-linked-lists",
  },
  {
    id: "dsa-linked-lists",
    slug: "dsa-linked-lists",
    title: "Linked Lists: Nodes, Pointers, and When They Beat Arrays",
    description:
      "Building a singly linked list from individual nodes, and the specific, narrow situation where it genuinely outperforms a dynamic array.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 22,
    prerequisites: ["dsa-arrays-and-dynamic-arrays"],
    objectives: [
      "Implement a singly linked list's core operations: append, prepend, and delete",
      "Explain why linked-list traversal is O(n) while arrays offer O(1) index access",
      "Identify the specific situation where a linked list's O(1) front-insertion genuinely matters",
    ],
    skills: ["algorithms", "linked-lists", "data-structures"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Working with objects — the basis for a node-based structure",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
      },
    ],
    keywords: ["linked lists", "nodes", "pointers", "data-structures"],
    explanation: `A **singly linked list** stores its elements as separate **nodes**, each holding a value and a reference (\`next\`) to the following node — there is no contiguous block of memory the way an array has, only a chain of individually-allocated nodes connected by references, starting from a \`head\` reference the list keeps track of. \`{ value: 10, next: { value: 20, next: { value: 30, next: null } } }\` is a three-node list; the last node's \`next\` is \`null\`, marking the end.

This structure inverts the array's tradeoffs almost exactly. **Prepending** (adding a new node at the front) is \`O(1)\`: create a new node whose \`next\` points at the current head, then update \`head\` to point at the new node — no existing node moves or is copied, unlike an array's O(n) front-insertion. But **indexed access** (\`get(i)\`) becomes \`O(n)\`: there's no way to jump directly to the \`i\`th node, since nodes aren't stored at predictable, computable addresses — you must walk the chain from \`head\`, following \`next\` references one at a time, exactly \`i\` times. **Appending** to the end is also \`O(n)\` for a plain singly linked list unless you separately maintain a \`tail\` reference (a common, worthwhile optimization) — without one, reaching the last node still requires walking the whole chain.

The practical decision rule follows directly from this: a linked list wins specifically when a program does **frequent insertions/removals at the front (or at an already-known node)** and rarely needs indexed access by position — a genuinely narrow use case in practice, which is exactly why dynamic arrays (with their O(1) amortized append and O(1) index access) are the default choice for most real code, and linked lists are reached for deliberately, not by default. Doubly linked lists (each node also holding a \`prev\` reference) make removal of an already-known node O(1) in both directions and are what underlies structures like a deque, covered in the next module.`,
    example: {
      language: "javascript",
      description:
        "A minimal singly linked list built from plain objects -- no class needed to see the node/pointer structure clearly.",
      code: `function makeNode(value, next = null) {
  return { value, next };
}

// Build the list 10 -> 20 -> 30 by hand, back to front:
const list = makeNode(10, makeNode(20, makeNode(30)));

function toArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.value);
    current = current.next; // walk the chain one node at a time -- O(n) traversal
  }
  return result;
}

console.log(toArray(list)); // [10, 20, 30]

function prepend(head, value) {
  return makeNode(value, head); // O(1) -- no existing node touched
}
console.log(toArray(prepend(list, 5))); // [5, 10, 20, 30]`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a fourth node (value 40) to the end of the chain by hand, then print the list with toArray.",
      code: `function makeNode(value, next = null) {
  return { value, next };
}
function toArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}
const list = makeNode(10, makeNode(20, makeNode(30)));
console.log(toArray(list));`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write getAt(head, index) that returns the value at the given index by walking the chain (0-indexed), or null if the index is out of range (including a negative index or an index >= the list's length).",
      starterCode: `function getAt(head, index) {
  // TODO: walk the chain 'index' times; return null if you run off the end or index < 0
}
`,
      solutionCode: `function getAt(head, index) {
  if (index < 0) return null;
  let current = head;
  let i = 0;
  while (current !== null) {
    if (i === index) return current.value;
    current = current.next;
    i++;
  }
  return null;
}`,
      harness: `
        function makeNode(value, next = null) { return { value, next }; }
        const list = makeNode(10, makeNode(20, makeNode(30)));
        try { window.__report('t1', getAt(list, 0) === 10, 'index 0 should be 10'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', getAt(list, 2) === 30, 'index 2 should be 30'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', getAt(list, 3) === null, 'out-of-range index should return null'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', getAt(list, -1) === null, 'negative index should return null'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try { window.__report('t5', getAt(null, 0) === null, 'an empty list should return null for any index'); } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds the value at index 0" },
        { id: "t2", description: "finds the value at the last index" },
        { id: "t3", description: "returns null for an out-of-range index" },
        { id: "t4", description: "returns null for a negative index" },
        { id: "t5", description: "handles an empty list (head is null)" },
      ],
      hints: [
        "This is genuinely O(n) -- there's no shortcut to 'jump' to an index in a linked list.",
        "Guard the negative-index case explicitly before starting the walk.",
      ],
    },
    independentExercise: {
      id: "dsa-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write removeValue(head, target) that returns a NEW head reference for the list with the first node matching target's value removed (the list is otherwise unchanged in order). If target isn't found, return the original head unchanged. Handle removing the head node itself as a special, necessary case -- unlike removing from the middle, updating head is the ONLY way to remove the first node, since there's no 'previous' node's next to update.",
      starterCode: `function makeNode(value, next = null) {
  return { value, next };
}
function removeValue(head, target) {
  // TODO: if head itself matches, return head.next (skip it)
  // TODO: otherwise walk the chain, and when found, splice it out via previous.next = current.next
  return head;
}
`,
      solutionCode: `function makeNode(value, next = null) {
  return { value, next };
}
function removeValue(head, target) {
  if (head === null) return null;
  if (head.value === target) return head.next;
  let previous = head;
  let current = head.next;
  while (current !== null) {
    if (current.value === target) {
      previous.next = current.next;
      return head;
    }
    previous = current;
    current = current.next;
  }
  return head;
}`,
      harness: `
        function toArray(head) {
          const result = [];
          let current = head;
          while (current !== null) { result.push(current.value); current = current.next; }
          return result;
        }
        try {
          const list = makeNode(10, makeNode(20, makeNode(30)));
          const result = removeValue(list, 20);
          window.__report('t1', JSON.stringify(toArray(result)) === JSON.stringify([10,30]), 'should remove a middle node');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const list = makeNode(10, makeNode(20, makeNode(30)));
          const result = removeValue(list, 10);
          window.__report('t2', JSON.stringify(toArray(result)) === JSON.stringify([20,30]), 'should remove the head node correctly');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const list = makeNode(10, makeNode(20));
          const result = removeValue(list, 999);
          window.__report('t3', JSON.stringify(toArray(result)) === JSON.stringify([10,20]), 'a missing value should leave the list unchanged');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', removeValue(null, 5) === null, 'removing from an empty list should return null'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "removes a node from the middle of the list" },
        { id: "t2", description: "removes the head node (the special case)" },
        { id: "t3", description: "leaves the list unchanged when the target isn't found" },
        { id: "t4", description: "handles removing from an empty list" },
      ],
      hints: [
        "Removing the head is genuinely special: there's no 'previous' node whose .next you can update, so you must return head.next directly as the new head.",
        "For every other node, splicing out means previous.next = current.next -- the removed node is simply no longer referenced by anything.",
      ],
    },
    commonMistakes: [
      "Using a linked list by default for a general-purpose collection -- for most real workloads (frequent indexed access, appending at the end), a dynamic array is both simpler and faster; linked lists solve a specific, narrower problem.",
      "Forgetting to handle removing the head node as a special case -- every other removal updates some node's .next, but removing the head requires updating the head reference itself, since no node points to it.",
      "Losing the reference to the rest of the list while reassigning .next during an operation -- always capture current.next in a local variable BEFORE overwriting current.next, if you still need to continue traversing afterward.",
    ],
    quiz: [
      {
        id: "dsa-q4-1",
        prompt:
          "Why is prepending to a singly linked list O(1), while prepending to a dynamic array is O(n)?",
        choices: [
          "Linked lists don't actually support prepending",
          "A new node just points its .next at the old head and becomes the new head -- no existing node is touched, unlike an array where every element must shift right",
          "Arrays never support O(1) operations of any kind",
          "It depends entirely on the programming language",
        ],
        correctIndex: 0,
        explanation:
          "Creating a new node and repointing head requires touching exactly one new node and one reference — nothing else in the list moves. An array's contiguous layout, by contrast, requires shifting every existing element to make room at index 0.",
      },
      {
        id: "dsa-q4-2",
        prompt:
          "Why is getAt(head, i) on a singly linked list O(n), even for a small index like i=2?",
        choices: [
          "Because linked lists always allocate memory inefficiently",
          "Because there's no way to compute a node's location directly -- reaching node i requires following .next references one at a time, starting from head",
          "It's actually O(1), just like an array",
          "Because JavaScript objects are slow to read",
        ],
        correctIndex: 1,
        explanation:
          "Unlike an array's directly-computable address, a linked list's nodes are scattered wherever they were individually allocated, connected only by references — the only way to reach the i-th node is to walk the chain from the head, i steps, regardless of how small or large i is.",
      },
      {
        id: "dsa-q4-3",
        prompt:
          "In what situation does a linked list's tradeoffs genuinely beat a dynamic array's?",
        choices: [
          "Whenever indexed access by position is the dominant operation",
          "Frequent insertions or removals at the front (or at an already-known node), with little need for indexed access by position",
          "Linked lists are always faster for every operation",
          "Never -- dynamic arrays dominate every use case",
        ],
        correctIndex: 1,
        explanation:
          "This is the narrow, specific case where a linked list's O(1) front-insertion genuinely pays off, and it's precisely why dynamic arrays -- not linked lists -- are the default general-purpose choice in most real code, since indexed access and end-appending are far more common needs.",
      },
    ],
    takeaway:
      "A linked list trades an array's O(1) indexed access for O(1) front-insertion — a narrow, specific tradeoff that only pays off when frequent front-insertion (or removal at an already-known node) genuinely dominates a program's workload, which is uncommon enough that dynamic arrays remain the default choice.",
    summary:
      "A linked list is a chain of individually allocated nodes connected by next references. Prepending is O(1); indexed access and (without a tail pointer) appending are O(n), since reaching any node requires walking the chain from head. Removing the head node requires special handling, since no other node's .next points to it.",
    nextLessonSlug: "dsa-stacks-queues-deques",
  },
  {
    id: "dsa-stacks-queues-deques",
    slug: "dsa-stacks-queues-deques",
    title: "Stacks, Queues, and Deques",
    description:
      "Three restricted-access structures — last-in-first-out, first-in-first-out, and both ends at once — and the real problems each one solves cleanly.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 4,
    difficulty: "beginner",
    estimatedMinutes: 19,
    prerequisites: ["dsa-linked-lists"],
    objectives: [
      "Implement a stack and a queue using an array, with correct O(1) operations",
      "Choose stack vs. queue vs. deque based on the access pattern a problem requires",
      "Use a stack to solve a classic matching/nesting problem (balanced parentheses)",
    ],
    skills: ["algorithms", "stacks", "queues", "deques"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Array.prototype.push/pop/shift/unshift",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
      },
    ],
    keywords: ["stacks", "queues", "deques", "lifo", "fifo"],
    explanation: `A **stack** is a **LIFO** structure — last in, first out — supporting exactly two core operations: \`push\` (add to the top) and \`pop\` (remove from the top), both \`O(1)\` when backed by a dynamic array's *end* (never its front, which would be \`O(n)\` per the arrays lesson). The mental model is a physical stack of plates: you can only add or remove from the top. Stacks are the natural fit whenever "undo the most recent thing" or "match the most recently opened thing" is the actual requirement — function call stacks, undo history, and balanced-parentheses checking (this lesson's independent exercise) all reduce to exactly that pattern.

A **queue** is **FIFO** — first in, first out — supporting \`enqueue\` (add to the back) and \`dequeue\` (remove from the front). This is the natural fit for "process things in the order they arrived" — a print queue, a task queue, or breadth-first search (covered in a later module) all need this ordering specifically. A naive queue backed by a plain array is a trap: \`Array.prototype.shift()\` (remove from the front) is \`O(n)\`, because removing the first element requires shifting every remaining element left by one — exactly the array-insertion cost from two lessons ago, mirrored for removal. A queue with genuinely \`O(1)\` operations needs either a linked list (front removal is \`O(1)\`, as covered last lesson) or a circular buffer (an array with wrap-around head/tail indices, avoiding any shifting).

A **deque** (double-ended queue) generalizes both: it supports \`O(1)\` insertion and removal at *both* ends. It subsumes a stack (use only one end) and a queue (add at one end, remove at the other) as special cases, which is why a deque is often the practical default when you're not sure yet whether you'll need stack-like or queue-like access — implemented well (a doubly linked list, or a circular buffer with growth), it gives you both without commitment.`,
    example: {
      language: "javascript",
      description:
        "A stack (LIFO, via array push/pop) and a naive queue (FIFO, via array push/shift) -- with a note on the queue's real cost.",
      code: `// Stack: push/pop on the END of an array -- both O(1).
const stack = [];
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3 -- last in, first out

// Queue: push on the end, shift from the FRONT.
const queue = [];
queue.push("a");
queue.push("b");
queue.push("c");
console.log(queue.shift()); // "a" -- first in, first out
// BUT: shift() is O(n) on a plain array -- every remaining element shifts left by one.
// A genuinely O(1) queue needs a linked list or circular buffer, not a plain array's front.`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Use the stack to reverse the order of ['a','b','c'] by pushing all three then popping them one at a time.",
      code: `const stack = [];
stack.push('a');
stack.push('b');
stack.push('c');
const reversed = [];
// TODO: pop everything off stack into reversed
console.log(reversed);`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write reverseWithStack(items) that reverses an array using ONLY push/pop (model a real stack -- no Array.prototype.reverse()).",
      starterCode: `function reverseWithStack(items) {
  const stack = [];
  // TODO: push everything onto the stack, then pop it all off into a result array
  return [];
}
`,
      solutionCode: `function reverseWithStack(items) {
  const stack = [];
  for (const item of items) stack.push(item);
  const result = [];
  while (stack.length > 0) {
    result.push(stack.pop());
  }
  return result;
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(reverseWithStack([1,2,3])) === JSON.stringify([3,2,1]), 'should reverse [1,2,3] to [3,2,1]'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', JSON.stringify(reverseWithStack([])) === JSON.stringify([]), 'empty input should give empty output'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', JSON.stringify(reverseWithStack([1])) === JSON.stringify([1]), 'single element is its own reverse'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "reverses a multi-element array correctly" },
        { id: "t2", description: "handles an empty array" },
        { id: "t3", description: "handles a single-element array" },
      ],
      hints: [
        "Pushing everything then popping everything naturally reverses order -- that's the whole point of LIFO.",
        "The while loop should continue exactly until the stack is empty (length === 0).",
      ],
    },
    independentExercise: {
      id: "dsa-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isBalanced(expression) using a stack to check whether every (), [], and {} in the string is properly matched and nested (e.g. '([{}])' is balanced, '([)]' is NOT -- brackets close in the wrong order). Ignore all other characters. An empty string is balanced.",
      starterCode: `function isBalanced(expression) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };
  // TODO: for each opening bracket, push it; for each closing bracket,
  // pop and check it matches the expected opener (fail if stack is empty or mismatched)
  // TODO: at the end, the stack must be empty for the expression to be balanced
  return true;
}
`,
      solutionCode: `function isBalanced(expression) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const openers = new Set(["(", "[", "{"]);
  for (const ch of expression) {
    if (openers.has(ch)) {
      stack.push(ch);
    } else if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}`,
      harness: `
        try { window.__report('t1', isBalanced("([{}])") === true, '([{}]) should be balanced'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isBalanced("([)]") === false, '([)] should NOT be balanced -- wrong close order'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isBalanced("") === true, 'empty string should be balanced'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', isBalanced("(") === false, 'an unclosed opener should not be balanced'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try { window.__report('t5', isBalanced(")") === false, 'an unmatched closer with no opener should not be balanced'); } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
        try { window.__report('t6', isBalanced("a(b)c[d]") === true, 'non-bracket characters should be ignored'); } catch (e) { window.__report('t6', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly identifies a properly nested, balanced expression" },
        { id: "t2", description: "correctly rejects out-of-order closing brackets" },
        { id: "t3", description: "an empty string is balanced" },
        { id: "t4", description: "rejects an unclosed opening bracket" },
        { id: "t5", description: "rejects a closing bracket with no matching opener" },
        { id: "t6", description: "ignores non-bracket characters entirely" },
      ],
      hints: [
        "The stack should hold only opening brackets -- when you see a closer, pop and compare to what it should match.",
        "Popping from an empty stack (a closer with nothing open) must be treated as a failure, not a crash -- check stack.length before or handle undefined from pop().",
        "The final check (stack.length === 0) catches an unclosed opener that was never matched by a closer.",
      ],
    },
    commonMistakes: [
      "Implementing a queue with Array.prototype.shift() for dequeue and assuming it's O(1) -- it's O(n), since every remaining element must shift left; a real O(1) queue needs a linked list or circular buffer.",
      "Forgetting to check whether the stack is empty before popping when validating balanced brackets -- popping an empty stack (an unexpected closer) must be treated as invalid input, not ignored or crashed on.",
      "Forgetting the final 'stack must be empty' check in a balanced-brackets solution -- without it, an unclosed opener like '(' incorrectly reports as balanced, since nothing ever failed during the scan.",
    ],
    quiz: [
      {
        id: "dsa-q5-1",
        prompt: "Which structure is the natural fit for 'undo the most recently performed action'?",
        choices: [
          "Queue (FIFO)",
          "Stack (LIFO)",
          "Deque, but only if used as a queue",
          "Neither; this needs a tree",
        ],
        correctIndex: 1,
        explanation:
          "Undo semantics are inherently last-in-first-out: the most recent action is the first one to be undone. That's exactly a stack's access pattern — push each action as it happens, pop to undo.",
      },
      {
        id: "dsa-q5-2",
        prompt:
          "Why is Array.prototype.shift() a poor choice for a queue's dequeue operation at scale?",
        choices: [
          "shift() doesn't exist in JavaScript",
          "shift() is O(n): removing the first element requires shifting every remaining element one position to the left",
          "shift() only works on sorted arrays",
          "shift() is actually the correct, O(1) choice",
        ],
        correctIndex: 1,
        explanation:
          "Just like array insertion at the front, removal from the front requires closing the resulting gap by shifting every subsequent element — an O(n) cost per dequeue call, which becomes a real performance problem for a queue processing many items.",
      },
      {
        id: "dsa-q5-3",
        prompt:
          "In a balanced-brackets check using a stack, why must you verify the stack is EMPTY at the very end, not just that no mismatch occurred during the scan?",
        choices: [
          "You don't need to -- a mismatch check alone is sufficient",
          "Because an unclosed opening bracket (like a lone '(') never causes a mismatch during the scan -- it just sits on the stack forever, so only a final empty-stack check catches it",
          "Because the stack might contain duplicate brackets",
          "This check is only needed for expressions longer than 100 characters",
        ],
        correctIndex: 1,
        explanation:
          "An unclosed opener is never popped, so it never triggers a mismatch — the scan finishes 'without incident' but the bracket was genuinely never closed. Only checking that the stack ends empty catches this specific failure mode.",
      },
    ],
    takeaway:
      "A stack's push/pop on one end and a queue's add-one-end/remove-other-end are both O(1) when implemented correctly (a queue needs a linked list or circular buffer, not a plain array's front) — pick the structure whose access order actually matches the problem, rather than defaulting to whichever is more familiar.",
    summary:
      "Stacks are LIFO (push/pop, O(1) on an array's end). Queues are FIFO (O(1) only with a linked list or circular buffer, since array shift() is O(n)). Deques support O(1) at both ends and subsume both. A stack is the standard tool for matching/nesting problems like balanced brackets.",
    nextLessonSlug: "dsa-hash-tables-sets-maps",
  },
  {
    id: "dsa-hash-tables-sets-maps",
    slug: "dsa-hash-tables-sets-maps",
    title: "Hash Tables, Sets, and Maps: Average O(1) Lookup",
    description:
      "How hashing turns 'is this present' into an average-O(1) operation, what a collision is, and why worst-case behavior can still degrade to O(n).",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["dsa-stacks-queues-deques"],
    objectives: [
      "Explain how a hash function turns a key into a bucket index",
      "Explain what a hash collision is and how chaining resolves it",
      "State honestly that hash table lookup is average-case O(1), not guaranteed O(1)",
    ],
    skills: ["algorithms", "hash-tables", "sets", "maps"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Map — the standard JS hash-table-backed structure",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
      },
      {
        label: "MDN: Set",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
      },
    ],
    keywords: ["hash tables", "hashing", "collisions", "sets", "maps"],
    explanation: `A **hash table** stores key-value pairs by feeding each key through a **hash function** that produces a number, which is then reduced (typically via modulo) to an index into a fixed-size backing array of **buckets**. \`hash("alice") -> 8492 -> 8492 % 16 -> bucket 12\`. Looking up \`"alice"\` recomputes the same hash, jumps directly to bucket 12, and checks what's there — no scanning of every entry required, which is the entire mechanism behind hash tables' headline \`O(1)\` **average-case** lookup, insertion, and deletion.

Two different keys can hash to the same bucket — a **collision** — which is a normal, expected occurrence, not a bug or a failure of the hash function. The standard resolution is **chaining**: each bucket holds a small list of every key-value pair that hashed there, and a lookup that lands in a bucket then does a short linear scan of that bucket's list to find the exact matching key. As long as the hash function distributes keys roughly evenly and the table resizes (like a dynamic array) to keep the average bucket short, that scan stays small — genuinely constant on average, hence "average-case O(1)."

This is precisely why the honest, complete statement is **"average-case O(1)," not "O(1)"** full stop: the **worst case** for a hash table is \`O(n)\` — if every key happened to hash to the same bucket (a pathological hash function, or, in adversarial contexts, deliberately crafted colliding input), every single lookup degrades to a full linear scan of one giant bucket. A well-designed hash function makes this vanishingly unlikely for typical, non-adversarial data, but it's a real possibility the "O(1)" shorthand glosses over — repeating "hash lookup is O(1)" without the "average case" qualifier is a genuinely common, genuinely incorrect claim worth avoiding precisely because it's so common. A **Set** is a hash table storing only keys (no associated value) — its entire purpose is the same average-\`O(1)\` "is this present" check; a **Map** is the general key-to-value version.`,
    example: {
      language: "javascript",
      description:
        "A simplified hash table with explicit bucket chaining, showing collisions being handled correctly.",
      code: `function simpleHash(key, bucketCount) {
  let sum = 0;
  for (const ch of String(key)) sum += ch.charCodeAt(0);
  return sum % bucketCount;
}

function makeHashTable(bucketCount) {
  return Array.from({ length: bucketCount }, () => []); // each bucket starts as an empty chain
}

function put(table, key, value) {
  const bucket = table[simpleHash(key, table.length)];
  const existing = bucket.find(pair => pair[0] === key);
  if (existing) existing[1] = value;
  else bucket.push([key, value]);
}

function get(table, key) {
  const bucket = table[simpleHash(key, table.length)];
  const found = bucket.find(pair => pair[0] === key);
  return found ? found[1] : undefined;
}

const table = makeHashTable(4);
put(table, "alice", 30);
put(table, "bob", 25);
console.log(get(table, "alice")); // 30 -- direct bucket jump, then a short scan within it`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Try put/get with a key that wasn't inserted, and confirm get returns undefined rather than throwing.",
      code: `function simpleHash(key, bucketCount) {
  let sum = 0;
  for (const ch of String(key)) sum += ch.charCodeAt(0);
  return sum % bucketCount;
}
function makeHashTable(n) { return Array.from({ length: n }, () => []); }
function get(table, key) {
  const bucket = table[simpleHash(key, table.length)];
  const found = bucket.find(p => p[0] === key);
  return found ? found[1] : undefined;
}
console.log(get(makeHashTable(4), "missing"));`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write hasDuplicates(items) using a Set to check (in one pass, average O(n) overall) whether items contains any duplicate value. Do NOT use nested loops or Array.prototype.includes inside a loop -- use the Set's average-O(1) membership check.",
      starterCode: `function hasDuplicates(items) {
  const seen = new Set();
  // TODO: for each item, if seen already has it, return true; otherwise add it
  return false;
}
`,
      solutionCode: `function hasDuplicates(items) {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item)) return true;
    seen.add(item);
  }
  return false;
}`,
      harness: `
        try { window.__report('t1', hasDuplicates([1,2,3,2]) === true, 'should detect a duplicate'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', hasDuplicates([1,2,3]) === false, 'no duplicates should return false'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', hasDuplicates([]) === false, 'empty array has no duplicates'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "detects a duplicate correctly" },
        { id: "t2", description: "correctly reports no duplicates" },
        { id: "t3", description: "handles an empty array" },
      ],
      hints: [
        "Check seen.has(item) BEFORE seen.add(item) -- otherwise every item would trivially 'already be seen' by itself.",
        "This achieves average O(n) total, versus O(n^2) for a nested-loop approach.",
      ],
    },
    independentExercise: {
      id: "dsa-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write groupAnagrams(words) that groups words which are anagrams of each other (same letters, any order) using a Map keyed by each word's SORTED letters. Return an array of groups (arrays), in the order each group was first encountered.",
      starterCode: `function groupAnagrams(words) {
  const groups = new Map(); // key: sorted letters, value: array of original words
  // TODO: for each word, compute its sorted-letters key, and push it into the right group
  // TODO: return Array.from(groups.values())
  return [];
}
`,
      solutionCode: `function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = word.split("").sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return Array.from(groups.values());
}`,
      harness: `
        try {
          const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
          const sortedGroups = result.map(g => [...g].sort()).sort((a,b) => a[0].localeCompare(b[0]));
          const expected = [["ate","eat","tea"], ["bat"], ["nat","tan"]];
          window.__report('t1', JSON.stringify(sortedGroups) === JSON.stringify(expected), 'should correctly group all anagrams');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', JSON.stringify(groupAnagrams([])) === JSON.stringify([]), 'empty input should give an empty result'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = groupAnagrams(["x"]); window.__report('t3', r.length === 1 && r[0].length === 1 && r[0][0] === "x", 'a single word is its own group'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "correctly groups multiple sets of anagrams" },
        { id: "t2", description: "handles an empty input array" },
        { id: "t3", description: "handles a single word with no anagram partners" },
      ],
      hints: [
        "Sorting a word's letters gives a canonical key: any anagram of it sorts to the exact same string.",
        "groups.get(key).push(word) requires the key to already exist -- initialize it to an empty array with groups.set(key, []) the first time you see it.",
      ],
    },
    commonMistakes: [
      "Saying 'hash table lookup is O(1)' without the 'average case' qualifier -- the honest, complete claim is average-case O(1); worst case is O(n) when many keys collide into the same bucket.",
      "Using an object with mutable keys, or a poorly-distributed custom hash function, that causes most entries to collide into a small number of buckets -- this silently degrades every operation toward the O(n) worst case.",
      "Reaching for a nested loop or repeated Array.includes() to check for duplicates/membership across a large array, when a Set gives the same answer in average O(n) total instead of O(n^2).",
    ],
    quiz: [
      {
        id: "dsa-q6-1",
        prompt: "What is a hash collision?",
        choices: [
          "A bug in the hash function that must be fixed before the table can be used",
          "Two different keys producing the same bucket index -- a normal, expected occurrence that a hash table's design must account for, not a failure",
          "An attempt to insert a duplicate key",
          "An error thrown when the table is full",
        ],
        correctIndex: 1,
        explanation:
          "With a fixed number of buckets and a potentially unlimited number of possible keys, some keys are guaranteed to eventually share a bucket — this is expected and handled (commonly via chaining), not treated as an error condition.",
      },
      {
        id: "dsa-q6-2",
        prompt: "What is the most accurate, complete statement about hash table lookup complexity?",
        choices: [
          "O(1), full stop, in all cases",
          "O(n), always",
          "Average-case O(1); worst-case O(n) when many keys collide into the same bucket",
          "O(log n), since hash tables use a tree internally",
        ],
        correctIndex: 2,
        explanation:
          "The complete, honest statement includes both halves: a well-distributed hash function makes O(1) the typical, expected case, but the worst case — many or all keys colliding — genuinely degrades to O(n), since lookup then requires scanning one long bucket chain.",
      },
      {
        id: "dsa-q6-3",
        prompt:
          "Why does chaining (each bucket holding a small list) correctly resolve a collision, rather than causing data loss?",
        choices: [
          "It doesn't -- one of the colliding keys is discarded",
          "Each bucket can hold multiple key-value pairs; a lookup jumps to the right bucket via hashing, then does a short linear scan within that bucket to find the exact key",
          "Chaining only works for numeric keys",
          "Colliding keys are automatically renamed to avoid the collision",
        ],
        correctIndex: 1,
        explanation:
          "Chaining doesn't try to prevent collisions — it accepts that they'll happen and handles them by letting each bucket hold a short list of every entry that landed there, with a final equality check distinguishing between entries that share a bucket.",
      },
    ],
    takeaway:
      "A hash table's O(1) is an average-case claim, not a guarantee — it depends on a hash function that distributes keys well enough that no bucket's chain grows long; the honest worst case, when that assumption breaks, is O(n).",
    summary:
      "A hash function maps a key to a bucket index; collisions (different keys, same bucket) are resolved via chaining, a short list per bucket. Hash table/Set/Map operations are average-case O(1), worst-case O(n). Use a Set for membership checks and a Map for key-to-value lookup instead of scanning an array.",
    nextLessonSlug: "dsa-binary-trees-and-traversals",
  },
  {
    id: "dsa-binary-trees-and-traversals",
    slug: "dsa-binary-trees-and-traversals",
    title: "Binary Trees and the Three Depth-First Traversals",
    description:
      "How a hierarchical structure differs from every linear one you've covered so far, and the three classic ways to visit every node in a specific, meaningful order.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["dsa-hash-tables-sets-maps"],
    objectives: [
      "Build a binary tree from individual nodes with left/right children",
      "Implement inorder, preorder, and postorder traversal, recursively",
      "Correctly handle the empty-tree and single-node edge cases in every traversal",
    ],
    skills: ["algorithms", "trees", "traversal", "recursion"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Recursion and stack — the mechanism recursive traversal relies on",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion",
      },
    ],
    keywords: ["binary trees", "traversal", "recursion", "inorder", "preorder", "postorder"],
    explanation: `A **binary tree** is a hierarchical structure where each node holds a value and up to two children, conventionally called \`left\` and \`right\` — the first genuinely non-linear structure in this course, since a node doesn't have one "next," it can branch into two independent subtrees. \`{ value: 8, left: { value: 3, left: null, right: null }, right: { value: 10, left: null, right: null } }\` is a three-node tree with \`8\` at the root.

**Traversal** means visiting every node exactly once, in some defined order — and unlike a linear structure's single obvious order, a tree has several genuinely useful ones. **Preorder** (root, then left subtree, then right subtree) visits a node *before* its children — useful for copying a tree, since you need a node's own data before you can build its children. **Inorder** (left subtree, then root, then right subtree) visits a node *between* its children — for a specific kind of tree (a binary *search* tree, covered next lesson), this produces values in **sorted order**, which is the main reason inorder traversal matters as much as it does. **Postorder** (left subtree, then right subtree, then root) visits a node *after* both its children — useful whenever you need to process children before their parent, such as computing each node's size from its children's sizes, or safely deleting a tree from the leaves inward.

All three are naturally, elegantly expressed with **recursion**: each traversal function's base case is "if the node is null, do nothing" (this is exactly what makes an empty subtree — and by extension, an empty tree, and a leaf node's null children — handle themselves correctly with zero special-casing), and its recursive case just calls itself on \`left\` and \`right\` in the order that traversal defines, visiting the current node's own value at the appropriate point relative to those two calls. Getting the *position* of that one line — "visit this node's value" — relative to the two recursive calls is the entire difference between preorder, inorder, and postorder; the recursive structure itself is otherwise identical across all three.`,
    example: {
      language: "javascript",
      description:
        "The same tree, traversed three ways -- notice how the ONLY difference between the three functions is where 'visit the node' happens relative to the two recursive calls.",
      code: `function makeNode(value, left = null, right = null) {
  return { value, left, right };
}

//         8
//        / \\
//       3   10
const tree = makeNode(8, makeNode(3), makeNode(10));

function preorder(node, result = []) {
  if (node === null) return result;       // base case: empty subtree does nothing
  result.push(node.value);                // visit BEFORE children
  preorder(node.left, result);
  preorder(node.right, result);
  return result;
}

function inorder(node, result = []) {
  if (node === null) return result;
  inorder(node.left, result);
  result.push(node.value);                // visit BETWEEN children
  inorder(node.right, result);
  return result;
}

function postorder(node, result = []) {
  if (node === null) return result;
  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.value);                // visit AFTER children
  return result;
}

console.log(preorder(tree));  // [8, 3, 10]
console.log(inorder(tree));   // [3, 8, 10] -- sorted, because this happens to be a BST
console.log(postorder(tree)); // [3, 10, 8]`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a left child (value 1) to the node holding 3, then re-run inorder and see where 1 lands.",
      code: `function makeNode(value, left = null, right = null) {
  return { value, left, right };
}
const tree = makeNode(8, makeNode(3), makeNode(10));
function inorder(node, result = []) {
  if (node === null) return result;
  inorder(node.left, result);
  result.push(node.value);
  inorder(node.right, result);
  return result;
}
console.log(inorder(tree));`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write treeHeight(node) that returns a tree's height (the number of edges on the longest path from the node to a leaf; an empty tree has height -1, a single node has height 0), using postorder-style recursion (compute children's heights first, then combine).",
      starterCode: `function treeHeight(node) {
  // TODO: base case for null -- return -1
  // TODO: recursive case -- 1 + the max of the left and right subtree heights
}
`,
      solutionCode: `function treeHeight(node) {
  if (node === null) return -1;
  return 1 + Math.max(treeHeight(node.left), treeHeight(node.right));
}`,
      harness: `
        function makeNode(value, left = null, right = null) { return { value, left, right }; }
        try { window.__report('t1', treeHeight(null) === -1, 'an empty tree should have height -1'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', treeHeight(makeNode(1)) === 0, 'a single node should have height 0'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const t = makeNode(1, makeNode(2, makeNode(3))); window.__report('t3', treeHeight(t) === 2, 'a 3-level chain should have height 2'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { const t = makeNode(1, makeNode(2), makeNode(3)); window.__report('t4', treeHeight(t) === 1, 'a balanced 3-node tree should have height 1'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "empty tree has height -1" },
        { id: "t2", description: "single node has height 0" },
        { id: "t3", description: "an unbalanced chain reports the correct, longer height" },
        { id: "t4", description: "a balanced tree reports the correct, shorter height" },
      ],
      hints: [
        "This is postorder in spirit: you need both children's answers before you can compute the current node's answer.",
        "The -1 base case is what makes a single leaf node correctly compute to height 0: 1 + max(-1, -1) = 0.",
      ],
    },
    independentExercise: {
      id: "dsa-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write countNodes(node) (total number of nodes, 0 for an empty tree) and isSameTree(a, b) (true if both trees have identical structure AND identical values at every position -- not just the same values in some order). Test against several shapes including empty trees, single nodes, and structurally different trees with the same values.",
      starterCode: `function countNodes(node) {
  // TODO
}
function isSameTree(a, b) {
  // TODO: both null -> true; exactly one null -> false; otherwise compare values AND recurse into both children
}
`,
      solutionCode: `function countNodes(node) {
  if (node === null) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}
function isSameTree(a, b) {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return a.value === b.value && isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}`,
      harness: `
        function makeNode(value, left = null, right = null) { return { value, left, right }; }
        try { window.__report('t1', countNodes(null) === 0, 'empty tree has 0 nodes'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', countNodes(makeNode(1, makeNode(2), makeNode(3))) === 3, 'a 3-node tree should count 3'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isSameTree(null, null) === true, 'two empty trees are the same'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', isSameTree(makeNode(1), null) === false, 'a tree and an empty tree are never the same'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try { window.__report('t5', isSameTree(makeNode(1, makeNode(2)), makeNode(1, null, makeNode(2))) === false, 'same values in DIFFERENT positions must not count as the same tree'); } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
        try { window.__report('t6', isSameTree(makeNode(1, makeNode(2)), makeNode(1, makeNode(2))) === true, 'identical structure and values should match'); } catch (e) { window.__report('t6', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "counts an empty tree as 0 nodes" },
        { id: "t2", description: "counts a multi-node tree correctly" },
        { id: "t3", description: "two empty trees are considered the same" },
        { id: "t4", description: "a real tree and an empty tree are never the same" },
        {
          id: "t5",
          description: "identical values in different structural positions are NOT the same tree",
        },
        { id: "t6", description: "identical structure and values ARE the same tree" },
      ],
      hints: [
        "isSameTree needs three distinct null-handling cases: both null, exactly one null, and neither null -- get all three right, in that order, before comparing values.",
        "Structural difference (a value on the left in one tree vs. the right in another) must be caught -- comparing only the SET of values in each tree would miss this.",
      ],
    },
    commonMistakes: [
      "Forgetting the null base case in a recursive tree function -- without it, recursion never terminates and either crashes with a stack overflow or throws on node.left of a null node.",
      "Confusing preorder and postorder when a specific order matters (e.g. needing children processed before their parent) -- the position of 'visit this node' relative to the two recursive calls is the entire difference, and getting it backwards silently produces a differently-ordered, wrong result rather than an error.",
      "Comparing two trees by collecting all values into a Set/array and comparing THAT, instead of comparing structure -- this misses cases where the same values appear in a different arrangement, which is a structurally different tree.",
    ],
    quiz: [
      {
        id: "dsa-q7-1",
        prompt:
          "What makes a binary tree fundamentally different from the linear structures (arrays, linked lists, stacks, queues) covered earlier in this course?",
        choices: [
          "Trees can only store numbers",
          "A tree node can branch into two independent subtrees, rather than having a single 'next' -- there is no one obvious order to visit every element",
          "Trees don't support recursion",
          "There is no real difference; a tree is just a linked list with extra steps",
        ],
        correctIndex: 1,
        explanation:
          "Every structure before this lesson had one clear, single path through its elements. A tree's branching means there are multiple genuinely different, useful visiting orders (preorder, inorder, postorder), which is a fundamentally new kind of structure, not a variation on a linear one.",
      },
      {
        id: "dsa-q7-2",
        prompt:
          "Which traversal visits a node's value strictly between visiting its left and right subtrees?",
        choices: [
          "Preorder",
          "Inorder",
          "Postorder",
          "None of them -- all three visit the node first",
        ],
        correctIndex: 1,
        explanation:
          "Inorder is left-subtree, then the node itself, then right-subtree — the node's visit happens 'in between' its two children's subtrees, which is exactly what produces sorted order for a binary search tree.",
      },
      {
        id: "dsa-q7-3",
        prompt:
          "Why does the null base case (`if (node === null) return ...`) correctly handle both an empty tree AND a leaf node's missing children, with no extra special-casing?",
        choices: [
          "It doesn't -- leaf nodes need a separate, explicit check",
          "Because a leaf node's left and right are themselves null, so recursing into them hits the exact same base case that handles a fully empty tree",
          "Leaf nodes are a different data type in this model",
          "JavaScript automatically skips null values in recursive calls",
        ],
        correctIndex: 1,
        explanation:
          "A leaf node's children are represented as null, exactly like a genuinely empty tree — so the same single base case naturally covers both situations without any additional logic distinguishing 'this is a leaf' from 'this is empty,' which is what makes the recursive traversal so compact.",
      },
    ],
    takeaway:
      "A tree's branching structure means there's no single natural traversal order — preorder, inorder, and postorder each visit a node at a different point relative to its children, and all three are naturally expressed as recursion whose only real difference is where the 'visit' line sits.",
    summary:
      "A binary tree node has up to two children (left, right). Preorder visits root-left-right, inorder visits left-root-right (sorted order for a BST), postorder visits left-right-root. All three are recursive with a null base case, which correctly and automatically handles both empty trees and leaf nodes.",
    nextLessonSlug: "dsa-binary-search-trees",
  },
  {
    id: "dsa-binary-search-trees",
    slug: "dsa-binary-search-trees",
    title: "Binary Search Trees: Ordered Structure, O(log n) When Balanced",
    description:
      "The ordering invariant that makes search, insertion, and deletion O(log n) on average — and the honest reason that guarantee can quietly collapse to O(n).",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["dsa-binary-trees-and-traversals"],
    objectives: [
      "State and apply the binary search tree ordering invariant",
      "Implement search and insertion into a BST recursively",
      "Explain why an unbalanced BST degrades from O(log n) toward O(n)",
    ],
    skills: ["algorithms", "binary-search-trees", "trees"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Recursion and stack",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion",
      },
    ],
    keywords: ["binary search trees", "bst", "trees", "ordering invariant"],
    explanation: `A **binary search tree (BST)** is a binary tree with one additional rule, the **ordering invariant**: for every node, every value in its **left** subtree is smaller, and every value in its **right** subtree is larger (this course assumes no duplicate values, to keep the invariant unambiguous). This single rule is what turns a tree from "a shape" into "a shape you can search efficiently" — at every node during a search, comparing the target to the current node's value tells you which entire subtree to discard, exactly the way binary search over a sorted array works (covered in the next module), except the tree's shape *is* the sorted structure, rather than a separate sorted array you search over.

**Search** starts at the root and, at each node, compares the target to the current value: equal means found; smaller means recurse left (everything in the right subtree is provably too large to bother checking); larger means recurse right. **Insertion** follows the identical comparison logic down to where the value *would* be found, then attaches a new leaf node there instead of finding a match. Both operations, in a **balanced** tree — one whose height stays proportional to \`log n\` rather than growing toward \`n\` — take \`O(\text{height}) = O(\log n)\`, because each comparison eliminates roughly half the remaining nodes from consideration, mirroring binary search's halving.

The honest caveat, worth stating precisely rather than glossing over: **a BST's height is only \`O(\log n)\` if the tree stays reasonably balanced** — and a plain BST, as taught in this lesson, does **not** guarantee that on its own. Inserting already-sorted data (\`1, 2, 3, 4, 5\`, in that order) into a plain BST produces a tree that's really just a linked list in disguise — every node has only a right child, height \`n - 1\`, and search degrades to genuinely \`O(n)\`, the exact same worst case as a linear scan. **Self-balancing trees** (AVL trees, red-black trees) solve this by actively restructuring themselves during insertion/deletion to guarantee \`O(\log n)\` height regardless of insertion order — a real, important technique, but implementing one is beyond this foundational lesson's scope; the key, honest takeaway here is knowing *that* the problem exists and *why*, which is what lets you recognize when a plain BST's average-case guarantee doesn't actually apply to your data's insertion order.`,
    example: {
      language: "javascript",
      description:
        "BST search and insertion, both O(height) via the ordering invariant -- plus the pathological case that breaks the O(log n) assumption.",
      code: `function makeNode(value, left = null, right = null) {
  return { value, left, right };
}

function bstInsert(node, value) {
  if (node === null) return makeNode(value);
  if (value < node.value) node.left = bstInsert(node.left, value);
  else if (value > node.value) node.right = bstInsert(node.right, value);
  return node; // value === node.value: no duplicates, tree unchanged
}

function bstSearch(node, target) {
  if (node === null) return false;
  if (target === node.value) return true;
  return target < node.value ? bstSearch(node.left, target) : bstSearch(node.right, target);
}

let balanced = null;
for (const v of [8, 3, 10, 1, 6]) balanced = bstInsert(balanced, v);
console.log(bstSearch(balanced, 6)); // true -- found in a couple of hops, height stays small

let degenerate = null;
for (const v of [1, 2, 3, 4, 5]) degenerate = bstInsert(degenerate, v); // already-sorted input!
// degenerate is now effectively a linked list: 1 -> 2 -> 3 -> 4 -> 5, all right children.
// bstSearch(degenerate, 5) must walk all 5 nodes -- O(n), not O(log n).`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Insert [5,3,8,1,4,7,9] (a better-balanced order) and compare how many comparisons bstSearch needs for the same target value.",
      code: `function makeNode(value, left = null, right = null) { return { value, left, right }; }
function bstInsert(node, value) {
  if (node === null) return makeNode(value);
  if (value < node.value) node.left = bstInsert(node.left, value);
  else if (value > node.value) node.right = bstInsert(node.right, value);
  return node;
}
let tree = null;
for (const v of [5,3,8,1,4,7,9]) tree = bstInsert(tree, v);
console.log(tree);`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write findMin(node) that returns the smallest value in a BST (throw an Error if the tree is empty). Use the ordering invariant directly: the minimum is always the leftmost node -- no comparisons against other values needed.",
      starterCode: `function findMin(node) {
  // TODO: throw if node is null; otherwise walk left as far as possible, return that value
}
`,
      solutionCode: `function findMin(node) {
  if (node === null) throw new Error("tree is empty");
  let current = node;
  while (current.left !== null) {
    current = current.left;
  }
  return current.value;
}`,
      harness: `
        function makeNode(value, left = null, right = null) { return { value, left, right }; }
        try { const t = makeNode(8, makeNode(3, makeNode(1)), makeNode(10)); window.__report('t1', findMin(t) === 1, 'should find the leftmost value'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', findMin(makeNode(5)) === 5, 'a single node is its own minimum'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { let threw = false; try { findMin(null); } catch (e) { threw = true; } window.__report('t3', threw, 'an empty tree should throw'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds the minimum in a multi-level tree" },
        { id: "t2", description: "a single-node tree's minimum is itself" },
        { id: "t3", description: "throws on an empty tree" },
      ],
      hints: [
        "The ordering invariant guarantees the minimum has no left child -- once current.left is null, you've found it.",
        "This can be done iteratively (a while loop) just as naturally as recursively.",
      ],
    },
    independentExercise: {
      id: "dsa-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isValidBst(node) that checks whether a binary tree actually satisfies the BST ordering invariant EVERYWHERE, not just locally between immediate parent/child (a tree can look locally fine at every single node and still violate the invariant globally -- construct a counterexample to test this if you're unsure). Use a min/max bound that narrows as you recurse.",
      starterCode: `function isValidBst(node, min = -Infinity, max = Infinity) {
  // TODO: base case -- null is always valid
  // TODO: current node's value must be strictly between min and max
  // TODO: recurse left with an updated max (node.value), recurse right with an updated min (node.value)
  return true;
}
`,
      solutionCode: `function isValidBst(node, min = -Infinity, max = Infinity) {
  if (node === null) return true;
  if (node.value <= min || node.value >= max) return false;
  return isValidBst(node.left, min, node.value) && isValidBst(node.right, node.value, max);
}`,
      harness: `
        function makeNode(value, left = null, right = null) { return { value, left, right }; }
        try { const t = makeNode(8, makeNode(3), makeNode(10)); window.__report('t1', isValidBst(t) === true, 'a genuinely valid small BST should pass'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isValidBst(null) === true, 'an empty tree is trivially valid'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          // Looks locally fine (5 > 3, 5 < 8 relative to its immediate parent 4... but globally invalid):
          //        5
          //       / \\
          //      3   8
          //         /
          //        4     <- 4 is in 5's right subtree, so it must be > 5, but 4 < 5 -- INVALID
          const invalid = makeNode(5, makeNode(3), makeNode(8, makeNode(4)));
          window.__report('t3', isValidBst(invalid) === false, 'a tree violating the invariant GLOBALLY (not just locally) should be rejected');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { const t = makeNode(5); window.__report('t4', isValidBst(t) === true, 'a single node is trivially valid'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "accepts a genuinely valid BST" },
        { id: "t2", description: "an empty tree is valid" },
        {
          id: "t3",
          description:
            "rejects a tree that's locally plausible but globally violates the invariant",
        },
        { id: "t4", description: "a single node is trivially valid" },
      ],
      hints: [
        "Comparing only a node to its immediate parent misses violations further up the tree -- the min/max bounds must be threaded through every recursive call, narrowing each time.",
        "When recursing left, the max bound becomes the current node's value (everything left must be smaller); when recursing right, the min bound becomes the current node's value.",
      ],
    },
    commonMistakes: [
      "Validating a BST by only comparing each node to its immediate parent -- this misses violations where a deeper descendant breaks the invariant relative to an ANCESTOR further up, not just its direct parent.",
      "Assuming any BST automatically gives O(log n) operations -- this only holds for a reasonably balanced tree; inserting already-sorted data into a plain BST produces a degenerate, linked-list-shaped tree with O(n) operations.",
      "Forgetting the strict inequality in the ordering invariant when duplicates are disallowed -- using <= / >= instead of < / > for the bounds check can silently accept an invalid tree containing an equal value in the wrong position.",
    ],
    quiz: [
      {
        id: "dsa-q8-1",
        prompt: "What is the BST ordering invariant?",
        choices: [
          "Every node has exactly two children",
          "For every node, its entire left subtree holds smaller values and its entire right subtree holds larger values",
          "The tree must always be perfectly balanced",
          "Values must be inserted in sorted order",
        ],
        correctIndex: 1,
        explanation:
          "This is the defining rule of a BST: not just 'left child is smaller,' but the entire left SUBTREE, and the entire right subtree is entirely larger — which is exactly why comparing at any single node can safely discard one whole subtree from further consideration.",
      },
      {
        id: "dsa-q8-2",
        prompt:
          "Why does inserting already-sorted values (1, 2, 3, 4, 5) into a plain BST produce a bad-case structure?",
        choices: [
          "It doesn't -- sorted input always produces the most balanced tree",
          "Each new value is larger than everything already inserted, so it always becomes a right child, producing a tree that's really a linked list with height n-1",
          "Plain BSTs reject sorted input",
          "This only happens with duplicate values",
        ],
        correctIndex: 1,
        explanation:
          "Since a plain BST has no rebalancing logic, strictly increasing input always attaches each new node as the rightmost node's right child — the resulting shape has no branching at all, exactly matching a linked list's O(n) worst-case search.",
      },
      {
        id: "dsa-q8-3",
        prompt:
          "Why is checking only 'is this node's value greater than its immediate left child and less than its immediate right child' insufficient to validate a BST?",
        choices: [
          "It is sufficient; no further checking is needed",
          "A node deep in a subtree can violate the invariant relative to an ANCESTOR further up the tree, even while satisfying every immediate parent/child comparison",
          "This check is too strict and rejects valid trees",
          "BSTs cannot be validated after construction",
        ],
        correctIndex: 1,
        explanation:
          "The ordering invariant applies to entire subtrees, not just adjacent parent/child pairs — a node several levels down can be locally 'in between' its immediate parent and grandparent while still being on the wrong side of an ancestor further up, which only a threaded min/max bound (not a local comparison) can catch.",
      },
    ],
    takeaway:
      "A BST's O(log n) search and insertion come from the ordering invariant letting each comparison discard an entire subtree — but that guarantee depends entirely on the tree staying balanced, which a plain BST does not enforce on its own; sorted-order insertion is the classic case that silently degrades it to O(n).",
    summary:
      "A BST requires every left subtree to hold smaller values and every right subtree larger values. Search and insertion are O(height), which is O(log n) only when the tree is reasonably balanced. A plain BST does not self-balance — self-balancing variants (AVL, red-black trees) exist specifically to guarantee O(log n) regardless of insertion order.",
    nextLessonSlug: "dsa-heaps-and-priority-queues",
  },
  {
    id: "dsa-heaps-and-priority-queues",
    slug: "dsa-heaps-and-priority-queues",
    title: "Heaps and Priority Queues",
    description:
      "The array-backed tree that always gives you the smallest (or largest) element in O(1), and how it stays that way in O(log n) per update.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 21,
    prerequisites: ["dsa-binary-search-trees"],
    objectives: [
      "Explain the heap ordering property and how it differs from a BST's ordering invariant",
      "Implement a min-heap's insert and extract-min operations",
      "Explain why a priority queue is the right structure for 'always process the most urgent item next'",
    ],
    skills: ["algorithms", "heaps", "priority-queues"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Array — the backing structure for an array-based heap",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      },
    ],
    keywords: ["heaps", "priority queues", "min-heap", "max-heap"],
    explanation: `A **min-heap** is a binary tree with a weaker, cheaper-to-maintain rule than a BST: **every parent is less than or equal to both its children** — unlike a BST, there's no ordering requirement *between* siblings or across subtrees, only along each parent-child edge. That relaxed rule is precisely why a heap doesn't need BST-style rebalancing to stay efficient: a heap is additionally always kept **complete** (every level fully filled, except possibly the last, which fills left to right with no gaps), a shape constraint strong enough to guarantee \`O(\log n)\` height on its own, with no separate balancing step required.

Because a heap is always complete, it can be stored directly in a **plain array**, with no explicit node/pointer objects at all: for a node at index \`i\`, its children live at indices \`2i + 1\` and \`2i + 2\`, and its parent lives at index \`Math.floor((i - 1) / 2)\` — pure arithmetic, no traversal needed to find a relative. This is a genuinely different, more compact representation than every tree structure covered so far in this course.

The two core operations are **insert** (add the new value at the end of the array, then repeatedly swap it with its parent — "bubble up" — as long as it's smaller than that parent, restoring the heap property in \`O(\log n)\`, proportional to the tree's height) and **extract-min** (the minimum is always the root, index \`0\` — remove it, move the *last* array element into the now-empty root position, then repeatedly swap it with its smaller child — "bubble down" — until the heap property holds again, also \`O(\log n)\`). Reading the minimum without removing it (\`peek\`) is \`O(1)\`, since it's always sitting at index \`0\` — this combination (instant access to the smallest element, logarithmic update) is exactly what makes a heap the standard implementation behind a **priority queue**: a queue where "next" doesn't mean "oldest," it means "highest priority" (lowest value, for a min-heap), which is the structure behind task schedulers, and — in a later lesson — Dijkstra-style shortest-path algorithms that always need to process the currently-closest unvisited node next.`,
    example: {
      language: "javascript",
      description:
        "A min-heap backed by a plain array, with insert (bubble up) and extractMin (bubble down).",
      code: `function insert(heap, value) {
  heap.push(value);
  let i = heap.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (heap[parent] <= heap[i]) break; // heap property already holds
    [heap[parent], heap[i]] = [heap[i], heap[parent]]; // swap up
    i = parent;
  }
}

function extractMin(heap) {
  if (heap.length === 0) throw new Error("heap is empty");
  const min = heap[0];
  const last = heap.pop();
  if (heap.length > 0) {
    heap[0] = last;
    let i = 0;
    while (true) {
      const left = 2 * i + 1, right = 2 * i + 2;
      let smallest = i;
      if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
      if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  }
  return min;
}

const heap = [];
for (const v of [5, 2, 8, 1, 9]) insert(heap, v);
console.log(extractMin(heap)); // 1 -- the current minimum, in O(log n)
console.log(extractMin(heap)); // 2 -- the next minimum`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Insert the values [10, 4, 15, 2] one at a time and print the heap array after each insertion to see it stay valid.",
      code: `function insert(heap, value) {
  heap.push(value);
  let i = heap.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (heap[parent] <= heap[i]) break;
    [heap[parent], heap[i]] = [heap[i], heap[parent]];
    i = parent;
  }
}
const heap = [];
insert(heap, 10);
console.log([...heap]);`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write parentIndex(i), leftChildIndex(i), rightChildIndex(i) -- the three pure arithmetic functions that locate relatives in an array-backed heap, with no traversal.",
      starterCode: `function parentIndex(i) {
  // TODO
}
function leftChildIndex(i) {
  // TODO
}
function rightChildIndex(i) {
  // TODO
}
`,
      solutionCode: `function parentIndex(i) {
  return Math.floor((i - 1) / 2);
}
function leftChildIndex(i) {
  return 2 * i + 1;
}
function rightChildIndex(i) {
  return 2 * i + 2;
}`,
      harness: `
        try { window.__report('t1', parentIndex(1) === 0 && parentIndex(2) === 0, 'indices 1 and 2 should both have parent 0'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', leftChildIndex(0) === 1 && rightChildIndex(0) === 2, 'root (0) children should be at 1 and 2'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', parentIndex(leftChildIndex(5)) === 5, 'parentIndex should invert leftChildIndex'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "computes the correct parent index for both children of the root",
        },
        { id: "t2", description: "computes the correct child indices for the root" },
        { id: "t3", description: "parentIndex correctly inverts leftChildIndex" },
      ],
      hints: [
        "These three formulas are exactly what makes an array a valid, pointer-free way to represent a complete binary tree.",
        "Math.floor is essential for parentIndex -- integer division, not floating point.",
      ],
    },
    independentExercise: {
      id: "dsa-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isValidMinHeap(heap) that checks whether an array satisfies the min-heap property EVERYWHERE (every parent <= both its children, for every node that has children) -- not just at the root.",
      starterCode: `function isValidMinHeap(heap) {
  // TODO: for every index i with a left child, heap[i] <= heap[leftChild]; same for right child if it exists
  return true;
}
`,
      solutionCode: `function isValidMinHeap(heap) {
  for (let i = 0; i < heap.length; i++) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < heap.length && heap[i] > heap[left]) return false;
    if (right < heap.length && heap[i] > heap[right]) return false;
  }
  return true;
}`,
      harness: `
        try { window.__report('t1', isValidMinHeap([1,3,2,5,4]) === true, 'a genuinely valid heap array should pass'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isValidMinHeap([1,5,2,3,4]) === false, 'a parent (5) larger than its child (3) should fail'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isValidMinHeap([]) === true, 'an empty array is trivially a valid heap'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', isValidMinHeap([5]) === true, 'a single element is trivially a valid heap'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "accepts a genuinely valid min-heap array" },
        {
          id: "t2",
          description: "rejects an array violating the heap property at some parent/child pair",
        },
        { id: "t3", description: "an empty array is trivially valid" },
        { id: "t4", description: "a single-element array is trivially valid" },
      ],
      hints: [
        "Check every index that HAS at least one child -- indices past heap.length/2 (roughly) have no children and trivially satisfy the property.",
        "Both left and right children (when they exist) must individually be >= their parent -- checking only one side would miss half of possible violations.",
      ],
    },
    commonMistakes: [
      "Confusing a heap's ordering property with a BST's -- a heap only guarantees parent <= children, with NO relationship between siblings or across subtrees; you cannot do a BST-style search in a heap.",
      "Forgetting that extractMin must move the LAST element to the root before bubbling down -- simply removing the root and promoting one of its children directly breaks the heap's completeness property.",
      "Assuming a heap's array representation is sorted -- it is not; only the root (index 0) is guaranteed to be the minimum. heap[1] is not necessarily smaller than heap[2] in any fixed relationship beyond both being >= heap[0].",
    ],
    quiz: [
      {
        id: "dsa-q9-1",
        prompt: "How does a min-heap's ordering property differ from a BST's ordering invariant?",
        choices: [
          "They are identical rules",
          "A heap only requires each parent <= its children; a BST requires the entire left subtree smaller and entire right subtree larger, with no such heap-wide relationship required between siblings",
          "A heap requires the tree to be sorted left to right",
          "A BST has no ordering rule at all",
        ],
        correctIndex: 1,
        explanation:
          "A heap's rule is strictly local (parent vs. its own children) and says nothing about how two sibling subtrees compare to each other, which is exactly why a heap can't be searched the way a BST can — but that weaker rule is also what makes a heap cheap to keep valid without any rebalancing logic.",
      },
      {
        id: "dsa-q9-2",
        prompt:
          "Why can a complete binary tree (like a heap) be stored in a plain array with no explicit pointers?",
        choices: [
          "It can't; heaps always require linked node objects",
          "Because completeness guarantees no gaps, so a node's children and parent can be located by pure index arithmetic (2i+1, 2i+2, floor((i-1)/2)) instead of following stored references",
          "Arrays are always faster than objects in JavaScript",
          "Heaps only ever contain a small, fixed number of elements",
        ],
        correctIndex: 1,
        explanation:
          "A complete tree has a completely predictable shape — every level full except possibly the last, filled left to right — which is precisely what makes each node's position, and therefore its relatives' positions, computable directly from its index, with no pointers needed at all.",
      },
      {
        id: "dsa-q9-3",
        prompt:
          "What is the time complexity of peek() (reading, not removing, the minimum) on a min-heap?",
        choices: ["O(log n)", "O(n)", "O(1) -- the minimum is always at index 0", "O(n log n)"],
        correctIndex: 2,
        explanation:
          "The heap property guarantees the smallest element is always the root, stored at index 0 in the array representation — reading it requires no search or comparison at all, making peek() a true O(1) operation, unlike insert or extractMin which are O(log n).",
      },
    ],
    takeaway:
      "A heap trades a BST's strong, whole-subtree ordering for a weaker, purely local parent-child rule plus a completeness guarantee — that combination is what lets it live in a plain array with O(1) peek and O(log n) insert/extract, making it the standard backing structure for a priority queue.",
    summary:
      "A min-heap requires every parent <= its children, and stays complete, which lets it be stored in an array using pure index arithmetic for parent/child relationships. insert bubbles a new value up; extractMin removes the root, promotes the last element, and bubbles it down. Both are O(log n); peek is O(1).",
    nextLessonSlug: "dsa-recursion-and-divide-and-conquer",
  },
  {
    id: "dsa-recursion-and-divide-and-conquer",
    slug: "dsa-recursion-and-divide-and-conquer",
    title: "Recursion and Divide-and-Conquer",
    description:
      "Writing a function in terms of a smaller version of itself, and the specific strategy — split, solve, combine — behind some of the most important algorithms in this course.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["dsa-heaps-and-priority-queues"],
    objectives: [
      "Write a correct recursive function with a proper base case",
      "Explain the divide-and-conquer pattern: divide, conquer, combine",
      "Trace a recursive call's execution using the call stack model",
    ],
    skills: ["algorithms", "recursion", "divide-and-conquer"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Recursion",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion",
      },
    ],
    keywords: ["recursion", "divide and conquer", "base case", "call stack"],
    explanation: `A **recursive function** solves a problem by calling itself on a *smaller* version of the same problem, combined with a **base case** — the smallest version of the problem, solved directly, with no further recursive call — that guarantees the recursion eventually stops. \`factorial(n) = n * factorial(n - 1)\`, with base case \`factorial(0) = 1\`, is the canonical example: every call either hits the base case or makes progress toward it by calling itself on a strictly smaller \`n\`. A recursive function missing a base case, or one whose recursive call doesn't actually get closer to it, recurses forever — in practice, this crashes with a stack overflow, since each pending call consumes a frame on the **call stack**, and that stack has a finite size.

The call stack model is the key to understanding *why* recursion works at all: each call to \`factorial(n)\` pushes a new stack frame that waits, paused, at the line \`n * factorial(n - 1)\`, until the recursive call returns a value — \`factorial(3)\` pushes a frame, which calls \`factorial(2)\`, which pushes another frame, and so on down to \`factorial(0)\`'s base case, at which point the stack unwinds: each paused frame resumes exactly where it left off, multiplying by its own \`n\`, popping off the stack as it returns. This is genuinely the *same* stack mechanism the tree-traversal lessons already relied on — a recursive traversal is simply a recursive function whose "smaller problem" happens to be "one of my children's subtrees" instead of "n - 1."

**Divide-and-conquer** is a specific, powerful recursive strategy with three named steps: **divide** the problem into smaller subproblems of the *same* kind, **conquer** each subproblem recursively (down to a base case simple enough to solve directly), then **combine** the subproblems' results into the answer for the original problem. Merge sort (next lesson) is the textbook example: divide the array in half, recursively sort each half, then combine by merging the two sorted halves back together — and it's precisely this repeated halving that gives divide-and-conquer algorithms their characteristic \`O(n \log n)\` complexity, the same halving-and-recombining shape you'll see repeat across several of the algorithms still ahead in this course.`,
    example: {
      language: "javascript",
      description:
        "A traced recursive call, with console.log calls showing exactly when each frame is pushed and resumed.",
      code: `function factorial(n, depth = 0) {
  const indent = "  ".repeat(depth);
  console.log(indent + "call factorial(" + n + ")");
  if (n === 0) {
    console.log(indent + "base case: return 1");
    return 1;
  }
  const result = n * factorial(n - 1, depth + 1);
  console.log(indent + "factorial(" + n + ") returns " + result);
  return result;
}

console.log("Final result:", factorial(4));
// Watch the console output: calls go all the way down to the base case
// BEFORE any multiplication happens -- the stack unwinds from the bottom up.`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Change factorial(4) to factorial(6) and observe how much deeper the call stack grows before it starts unwinding.",
      code: `function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(4));`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write fibonacci(n) recursively (fibonacci(0) = 0, fibonacci(1) = 1, fibonacci(n) = fibonacci(n-1) + fibonacci(n-2) for n >= 2). This is intentionally the simple, unoptimized version -- correctness first, not efficiency.",
      starterCode: `function fibonacci(n) {
  // TODO: two base cases (0 and 1), one recursive case
}
`,
      solutionCode: `function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      harness: `
        try { window.__report('t1', fibonacci(0) === 0, 'fibonacci(0) should be 0'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', fibonacci(1) === 1, 'fibonacci(1) should be 1'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', fibonacci(6) === 8, 'fibonacci(6) should be 8'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "handles the first base case (n=0)" },
        { id: "t2", description: "handles the second base case (n=1)" },
        { id: "t3", description: "computes a larger value correctly via recursion" },
      ],
      hints: [
        "Fibonacci needs TWO base cases, not one -- both 0 and 1 must be handled directly.",
        "This naive version recomputes the same values repeatedly and is exponential time -- a later lesson's dynamic-programming technique fixes that, but correctness comes first.",
      ],
    },
    independentExercise: {
      id: "dsa-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write sumDigits(n) recursively (n is a non-negative integer) that returns the sum of its decimal digits (e.g. sumDigits(123) = 6). Base case: a single-digit number (n < 10) sums to itself. Recursive case: the last digit (n % 10) plus the sum of the remaining digits (Math.floor(n / 10)).",
      starterCode: `function sumDigits(n) {
  // TODO
}
`,
      solutionCode: `function sumDigits(n) {
  if (n < 10) return n;
  return (n % 10) + sumDigits(Math.floor(n / 10));
}`,
      harness: `
        try { window.__report('t1', sumDigits(123) === 6, 'sumDigits(123) should be 6'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', sumDigits(0) === 0, 'sumDigits(0) should be 0 (base case)'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', sumDigits(9) === 9, 'a single-digit number is its own sum'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', sumDigits(9999) === 36, 'sumDigits(9999) should be 36'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "sums the digits of a multi-digit number" },
        { id: "t2", description: "handles 0 correctly" },
        { id: "t3", description: "a single digit is its own sum (base case)" },
        { id: "t4", description: "handles a larger multi-digit number" },
      ],
      hints: [
        "n % 10 peels off the last digit; Math.floor(n / 10) is 'everything else,' strictly smaller -- exactly the recursive-progress requirement.",
        "n < 10 correctly covers both 0 and any single positive digit as the base case.",
      ],
    },
    commonMistakes: [
      "Writing a recursive call that doesn't actually shrink toward the base case (e.g. calling factorial(n) instead of factorial(n - 1) by mistake) -- this recurses forever and crashes with a stack overflow.",
      "Forgetting a base case entirely, or writing one that's unreachable for some valid input (e.g. only handling n === 0 for a function that might be called with a negative number).",
      "Assuming recursion is always the most efficient choice -- naive recursive Fibonacci is exponential time due to massive redundant recomputation; recursion's clarity and efficiency are separate concerns, and sometimes an iterative or memoized approach is meaningfully better.",
    ],
    quiz: [
      {
        id: "dsa-q10-1",
        prompt: "What is the role of a base case in a recursive function?",
        choices: [
          "It makes the function run faster",
          "It's the smallest version of the problem, solved directly with no further recursive call -- without one, the recursion never terminates",
          "It's an optional optimization",
          "It only matters for tree-related recursion, not general recursion",
        ],
        correctIndex: 1,
        explanation:
          "The base case is what stops the recursion. Every recursive call must either be the base case itself or move strictly closer to it — without a reachable base case, calls keep stacking until the call stack overflows.",
      },
      {
        id: "dsa-q10-2",
        prompt: "What are the three named steps of the divide-and-conquer strategy, in order?",
        choices: [
          "Sort, search, combine",
          "Divide, conquer, combine",
          "Split, merge, sort",
          "Recurse, iterate, return",
        ],
        correctIndex: 1,
        explanation:
          "Divide-and-conquer's three steps are: divide the problem into smaller subproblems of the same kind, conquer each recursively down to a base case, then combine the subproblems' results back into the original problem's answer.",
      },
      {
        id: "dsa-q10-3",
        prompt:
          "In factorial(3), why does the multiplication 3 * factorial(2) only happen AFTER factorial(2) fully returns, rather than before?",
        choices: [
          "JavaScript evaluates multiplication before function calls",
          "The call stack pauses factorial(3)'s frame at that line until factorial(2)'s call (and everything it in turn calls) fully resolves and returns a value",
          "This is actually incorrect -- multiplication happens immediately",
          "It depends on the specific JavaScript engine",
        ],
        correctIndex: 1,
        explanation:
          "A function can't use a value that hasn't been computed yet — factorial(3)'s frame is genuinely paused at that expression, waiting, while factorial(2)'s frame (and every frame below it) runs to completion and returns, at which point factorial(3)'s frame resumes and finally performs its multiplication.",
      },
    ],
    takeaway:
      "A correct recursive function needs a base case that's actually reachable from every valid input, and each recursive call must make genuine progress toward it; divide-and-conquer is the specific, powerful pattern of splitting a problem, solving the pieces recursively, and combining their results.",
    summary:
      "Recursion solves a problem via a smaller instance of itself plus a base case, using the call stack to pause and resume each pending call. Divide-and-conquer divides a problem into same-kind subproblems, conquers them recursively, and combines the results — the pattern behind merge sort and several algorithms later in this course.",
    nextLessonSlug: "dsa-searching",
  },
  {
    id: "dsa-searching",
    slug: "dsa-searching",
    title: "Linear Search and Binary Search",
    description:
      "The two fundamental searching strategies — check everything, or repeatedly halve — and the one precondition binary search absolutely requires.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 19,
    prerequisites: ["dsa-recursion-and-divide-and-conquer"],
    objectives: [
      "Implement linear search and state its O(n) worst-case complexity",
      "Implement binary search correctly, including the midpoint and bounds updates",
      "State precisely why binary search requires sorted input, and what happens if that precondition is violated",
    ],
    skills: ["algorithms", "searching", "binary-search"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Array.prototype.indexOf — a linear search under the hood",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf",
      },
    ],
    keywords: ["linear search", "binary search", "algorithms"],
    explanation: `**Linear search** checks every element in order until it finds the target or exhausts the input — simple, requires no precondition on the data at all (unsorted input is fine), and \`O(n)\` in the worst case (the target is last, or absent), \`O(1)\` in the best case (the target is first). It's the correct, sometimes only, choice when data isn't sorted and sorting it first (an \`O(n log n)\` cost, covered next lesson) wouldn't be worth it for a single search.

**Binary search** is the divide-and-conquer strategy from the previous lesson, applied to searching: check the middle element; if it's the target, done; if the target is smaller, discard the entire right half and repeat on the left half; if larger, discard the left half and repeat on the right. Each comparison eliminates *half* the remaining candidates, giving \`O(\log n)\` — for a million elements, roughly 20 comparisons worst case, versus linear search's up to a million.

The **one absolute precondition** binary search requires, and the reason it isn't simply "always better" than linear search: **the data must already be sorted**. The entire algorithm's correctness depends on being able to conclude "the target isn't in the discarded half" purely from one comparison against the midpoint — a conclusion that's only valid if every element on one side is guaranteed smaller (or larger) than the midpoint, which unsorted data does not guarantee at all. Running binary search on unsorted data doesn't throw an error or clearly fail — it can silently return the wrong answer, or report "not found" for a target that's actually present, because the halves it's discarding aren't actually guaranteed empty of the target. This is exactly why "is this data sorted?" is the first question to ask before reaching for binary search, and why sorting once (\`O(n \log n)\`) to enable many subsequent binary searches (\`O(\log n)\` each) is a common, worthwhile tradeoff, while sorting purely to do one single search usually isn't (linear search's \`O(n)\` on unsorted data beats \`O(n \log n)\` sort + \`O(\log n)\` search for exactly one lookup).`,
    example: {
      language: "javascript",
      description: "Binary search's midpoint-and-halve pattern, with explicit bounds tracking.",
      code: `function binarySearch(sortedArr, target) {
  let low = 0, high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) low = mid + 1;   // target must be in the right half, if anywhere
    else high = mid - 1;                          // target must be in the left half, if anywhere
  }
  return -1; // exhausted the search space -- not present
}

const sorted = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(sorted, 7));  // 3 -- found in a couple of comparisons
console.log(binarySearch(sorted, 4));  // -1 -- correctly reports absence

// On UNSORTED data, the same algorithm can silently give a wrong answer:
const unsorted = [7, 1, 13, 3, 9, 5, 11];
console.log(binarySearch(unsorted, 5)); // NOT reliable -- the sortedness assumption is violated`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Run binarySearch on the unsorted array for a target you KNOW is present, and see it incorrectly report -1.",
      code: `function binarySearch(sortedArr, target) {
  let low = 0, high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
const unsorted = [7, 1, 13, 3, 9, 5, 11];
console.log(binarySearch(unsorted, 5)); // 5 IS in the array -- watch what happens`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write linearSearch(arr, target) returning the index of target's first occurrence, or -1 if absent. Works on any array, sorted or not.",
      starterCode: `function linearSearch(arr, target) {
  // TODO
}
`,
      solutionCode: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      harness: `
        try { window.__report('t1', linearSearch([3,1,4,1,5], 4) === 2, 'should find 4 at index 2'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', linearSearch([3,1,4,1,5], 1) === 1, 'should find the FIRST occurrence of a repeated value'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', linearSearch([1,2,3], 99) === -1, 'a missing target should return -1'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', linearSearch([], 1) === -1, 'an empty array should return -1'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds a target in the middle" },
        { id: "t2", description: "finds the first occurrence when the value repeats" },
        { id: "t3", description: "returns -1 for a missing target" },
        { id: "t4", description: "handles an empty array" },
      ],
      hints: [
        "Return immediately upon the first match -- don't keep scanning past it.",
        "linearSearch needs no assumption about the input's order, unlike binary search.",
      ],
    },
    independentExercise: {
      id: "dsa-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write binarySearch(sortedArr, target) returning the target's index, or -1 if absent. Must work correctly on an empty array, a single-element array, and when the target is smaller than every element or larger than every element.",
      starterCode: `function binarySearch(sortedArr, target) {
  // TODO
}
`,
      solutionCode: `function binarySearch(sortedArr, target) {
  let low = 0, high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      harness: `
        try { window.__report('t1', binarySearch([1,3,5,7,9], 7) === 3, 'should find 7 at index 3'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', binarySearch([], 5) === -1, 'an empty array should return -1'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', binarySearch([5], 5) === 0, 'a single matching element should return index 0'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', binarySearch([5], 9) === -1, 'a single non-matching element should return -1'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try { window.__report('t5', binarySearch([10,20,30], 1) === -1, 'a target smaller than everything should return -1'); } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
        try { window.__report('t6', binarySearch([10,20,30], 99) === -1, 'a target larger than everything should return -1'); } catch (e) { window.__report('t6', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds a target in a normal sorted array" },
        { id: "t2", description: "handles an empty array" },
        { id: "t3", description: "handles a single matching element" },
        { id: "t4", description: "handles a single non-matching element" },
        { id: "t5", description: "handles a target smaller than the entire array" },
        { id: "t6", description: "handles a target larger than the entire array" },
      ],
      hints: [
        "The loop condition low <= high (not <) is essential -- using < would incorrectly skip checking the final remaining candidate in some cases.",
        "high starts at sortedArr.length - 1, which correctly becomes -1 for an empty array, making the loop never execute -- exactly the desired 'not found' behavior.",
      ],
    },
    commonMistakes: [
      "Running binary search on unsorted data -- it doesn't error, it silently returns wrong results, since the entire algorithm's correctness depends on the sortedness precondition holding.",
      "Using low < high instead of low <= high as the loop condition -- this off-by-one can cause binary search to miss the correct answer when the search space narrows to exactly one remaining candidate.",
      "Sorting an array purely to enable a single binary search -- the O(n log n) sort cost dominates, making it slower overall than a single O(n) linear search on the original unsorted data.",
    ],
    quiz: [
      {
        id: "dsa-q11-1",
        prompt: "What is the one precondition binary search absolutely requires to be correct?",
        choices: [
          "The array must contain only numbers",
          "The array must already be sorted",
          "The array must have an odd number of elements",
          "The target must be present in the array",
        ],
        correctIndex: 1,
        explanation:
          "Binary search's core logic — discarding half the remaining candidates based on one comparison — is only valid because sorted order guarantees everything on one side of the midpoint is uniformly smaller or larger. Without that guarantee, discarding a half can silently discard the actual target.",
      },
      {
        id: "dsa-q11-2",
        prompt:
          "What happens when binary search is run on unsorted data that actually contains the target?",
        choices: [
          "It always still finds the target correctly, just slower",
          "It throws a runtime error immediately",
          "It can silently return -1 (not found) or an incorrect index, with no error at all",
          "JavaScript automatically sorts the array first",
        ],
        correctIndex: 2,
        explanation:
          "There's no built-in check for sortedness — the algorithm proceeds exactly as if the precondition held, discarding halves based on comparisons that are no longer valid, which can lead it to discard the half actually containing the target with no indication anything went wrong.",
      },
      {
        id: "dsa-q11-3",
        prompt:
          "When is a single O(n) linear search preferable to sorting first (O(n log n)) and then binary searching (O(log n))?",
        choices: [
          "Never -- binary search is always better",
          "When you only need to perform one search and the data isn't already sorted, since the sort's cost dominates and isn't amortized across multiple searches",
          "Only when the array has fewer than 10 elements",
          "Linear search is never preferable in any situation",
        ],
        correctIndex: 1,
        explanation:
          "Sorting is only a worthwhile investment if its O(n log n) cost gets amortized across many subsequent O(log n) searches. For exactly one search on unsorted data, a single O(n) linear search is cheaper overall than paying to sort first.",
      },
    ],
    takeaway:
      "Linear search needs no precondition and costs O(n); binary search needs sorted input and costs O(log n) — but violating that precondition doesn't produce an error, it silently produces wrong answers, which is what makes checking it before reaching for binary search non-negotiable.",
    summary:
      "Linear search checks every element, O(n) worst case, works on any input order. Binary search repeatedly halves the search space, O(log n), but strictly requires sorted input — an unmet precondition causes silent incorrect results, not a visible failure. Sort-then-search only pays off when amortized across multiple searches.",
    nextLessonSlug: "dsa-sorting",
  },
  {
    id: "dsa-sorting",
    slug: "dsa-sorting",
    title: "Sorting: Insertion Sort, Merge Sort, and Choosing Between Them",
    description:
      "A simple O(n²) sort you can trace by hand, a divide-and-conquer O(n log n) sort, and how to justify choosing one over the other under real, stated constraints.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 23,
    prerequisites: ["dsa-searching"],
    objectives: [
      "Implement insertion sort and explain why it's O(n^2) worst case but O(n) on nearly-sorted data",
      "Implement merge sort and explain how its divide-and-conquer structure gives O(n log n)",
      "Compare two valid sorting algorithms and justify the better choice under stated constraints, not just 'the one with the better Big O'",
    ],
    skills: ["algorithms", "sorting"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Array.prototype.sort",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
      },
    ],
    keywords: ["sorting", "insertion sort", "merge sort", "algorithms"],
    explanation: `**Insertion sort** builds a sorted portion of the array one element at a time: for each new element, shift it leftward past every already-sorted element larger than it, until it lands in its correct position. It's genuinely simple to trace by hand, requires no extra memory beyond the input array (**in-place**), and — the detail that matters most for choosing when to actually use it — is \`O(n)\`, not \`O(n²)\`, when the input is **already nearly sorted**: each element only needs to shift past the few elements actually out of place, which can be very few. Its worst case (reverse-sorted input) is \`O(n²)\`, since every new element might need to shift past everything already placed.

**Merge sort** applies divide-and-conquer directly: divide the array into two halves, recursively sort each half, then **merge** the two sorted halves into one sorted whole by repeatedly comparing their fronts and taking the smaller. This gives a **guaranteed** \`O(n \log n)\` in every case — best, average, and worst — because the divide step always halves regardless of the data's existing order, unlike insertion sort's data-dependent behavior. The cost is memory: a standard merge sort implementation is **not** in-place, needing \`O(n)\` additional space for the merge step's temporary arrays.

**Choosing between them is a genuine tradeoff, not a simple "smaller Big O wins" decision** — this is the point this lesson's independent exercise asks you to argue explicitly, not just assert: for a small array (where constant factors dominate and \`n²\` vs. \`n \log n\` barely differs numerically), insertion sort's simplicity and lack of extra memory allocation can make it the genuinely better real-world choice, and production sort implementations commonly switch to an insertion-sort-like strategy for small sub-arrays for exactly this reason. For data that's already mostly sorted (a common real-world case — appending a few new records to an already-sorted log), insertion sort's near-linear behavior can beat merge sort's guaranteed-but-fixed \`O(n \log n)\`. For a large, unpredictably-ordered array where a worst-case \`O(n²)\` would be unacceptable, merge sort's guarantee is the right call despite the extra memory. **"Which one is better" has no single correct answer independent of the actual constraints** — array size, existing order, and memory budget all genuinely change which choice is justified.`,
    example: {
      language: "javascript",
      description:
        "Both algorithms implemented in full, so their structural difference (shift-in-place vs. divide-merge) is directly visible.",
      code: `function insertionSort(arr) {
  const result = [...arr];
  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j]; // shift larger elements right
      j--;
    }
    result[j + 1] = current;
  }
  return result;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr; // base case
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));   // conquer
  const right = mergeSort(arr.slice(mid));      // conquer
  return merge(left, right);                    // combine
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

console.log(insertionSort([5, 2, 8, 1, 9]));
console.log(mergeSort([5, 2, 8, 1, 9]));`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Try both sorts on an already-sorted array [1,2,3,4,5] -- insertion sort's while loop should barely execute at all.",
      code: `function insertionSort(arr) {
  const result = [...arr];
  let totalShifts = 0;
  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
      totalShifts++;
    }
    result[j + 1] = current;
  }
  console.log("total shifts:", totalShifts);
  return result;
}
insertionSort([1, 2, 3, 4, 5]);`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write insertionSort(arr) (return a NEW sorted array, do not mutate the input) and countShifts(arr) that returns how many shift operations insertionSort would perform on arr (a direct measure of how far from sorted the input already is).",
      starterCode: `function insertionSort(arr) {
  // TODO
}
function countShifts(arr) {
  const result = [...arr];
  let shifts = 0;
  // TODO: same algorithm as insertionSort, but counting each shift instead of just performing it
  return shifts;
}
`,
      solutionCode: `function insertionSort(arr) {
  const result = [...arr];
  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = current;
  }
  return result;
}
function countShifts(arr) {
  const result = [...arr];
  let shifts = 0;
  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
      shifts++;
    }
    result[j + 1] = current;
  }
  return shifts;
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(insertionSort([5,2,8,1,9])) === JSON.stringify([1,2,5,8,9]), 'should sort correctly'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const input = [3,1,2]; insertionSort(input); window.__report('t2', JSON.stringify(input) === JSON.stringify([3,1,2]), 'the ORIGINAL array must not be mutated'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', countShifts([1,2,3,4,5]) === 0, 'already-sorted input should need 0 shifts'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', countShifts([5,4,3,2,1]) > countShifts([1,2,3,5,4]), 'reverse-sorted input should need far more shifts than nearly-sorted input'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "sorts an unordered array correctly" },
        { id: "t2", description: "does not mutate the original input array" },
        { id: "t3", description: "already-sorted input requires zero shifts" },
        {
          id: "t4",
          description:
            "reverse-sorted input requires substantially more shifts than nearly-sorted input",
        },
      ],
      hints: [
        "Start from a copy ([...arr]) so the original is never touched.",
        "countShifts is literally the same algorithm as insertionSort, with a counter incremented inside the while loop's body.",
      ],
    },
    independentExercise: {
      id: "dsa-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write mergeSort(arr) and a helper merge(left, right), fully implementing merge sort (return a new array; do not mutate the input). Then write recommendSort(arraySize, isNearlySorted) that returns 'insertion' or 'merge', justifying the choice per this lesson's tradeoffs: recommend 'insertion' when arraySize <= 20 (constant factors dominate) OR isNearlySorted is true (insertion sort's near-linear behavior applies); otherwise recommend 'merge' (guaranteed O(n log n) matters more once neither condition holds).",
      starterCode: `function merge(left, right) {
  // TODO
}
function mergeSort(arr) {
  // TODO: base case (length <= 1), divide, recurse, combine via merge()
}
function recommendSort(arraySize, isNearlySorted) {
  // TODO: implement the decision rule described in the prompt
}
`,
      solutionCode: `function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}
function mergeSort(arr) {
  if (arr.length <= 1) return [...arr];
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function recommendSort(arraySize, isNearlySorted) {
  if (arraySize <= 20 || isNearlySorted) return "insertion";
  return "merge";
}`,
      harness: `
        try { window.__report('t1', JSON.stringify(mergeSort([5,2,8,1,9])) === JSON.stringify([1,2,5,8,9]), 'mergeSort should sort correctly'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const input = [3,1,2]; mergeSort(input); window.__report('t2', JSON.stringify(input) === JSON.stringify([3,1,2]), 'mergeSort must not mutate the original array'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', JSON.stringify(mergeSort([])) === JSON.stringify([]), 'mergeSort should handle an empty array'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', recommendSort(10, false) === 'insertion', 'a small array should recommend insertion sort regardless of order'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try { window.__report('t5', recommendSort(10000, true) === 'insertion', 'a large but nearly-sorted array should recommend insertion sort'); } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
        try { window.__report('t6', recommendSort(10000, false) === 'merge', 'a large, unpredictably-ordered array should recommend merge sort'); } catch (e) { window.__report('t6', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "mergeSort sorts correctly" },
        { id: "t2", description: "mergeSort does not mutate its input" },
        { id: "t3", description: "mergeSort handles an empty array" },
        { id: "t4", description: "recommends insertion sort for a small array" },
        { id: "t5", description: "recommends insertion sort for a large but nearly-sorted array" },
        { id: "t6", description: "recommends merge sort for a large, unpredictably-ordered array" },
      ],
      hints: [
        "mergeSort's base case must return a COPY, not the same array reference, to avoid accidentally aliasing part of the original input.",
        "recommendSort directly encodes this lesson's central point: the 'better' algorithm depends on stated constraints (size, existing order), not a single Big-O comparison in isolation.",
      ],
    },
    commonMistakes: [
      "Assuming O(n log n) is 'always better' than O(n^2) without considering the actual constraints -- for small arrays or nearly-sorted data, insertion sort can genuinely be the better real-world choice despite its worse worst-case complexity class.",
      "Implementing merge sort's base case to return the SAME array reference for length <= 1, instead of a copy -- this can cause subtle aliasing bugs where the 'sorted' result shares memory with part of the original input.",
      "Forgetting that a standard merge sort needs O(n) extra memory for the merge step -- in a genuinely memory-constrained environment, insertion sort's in-place property can matter more than its worse time complexity.",
    ],
    quiz: [
      {
        id: "dsa-q12-1",
        prompt: "Why is insertion sort O(n), not O(n^2), on already nearly-sorted input?",
        choices: [
          "Insertion sort detects sorted input and skips it entirely",
          "Each element only needs to shift past the few elements actually out of place, which is small when the input is nearly sorted",
          "This is incorrect -- insertion sort is always O(n^2) regardless of input order",
          "It depends on the JavaScript engine's optimizer",
        ],
        correctIndex: 1,
        explanation:
          "Insertion sort's cost is directly tied to how far out of place each element is. Nearly-sorted input means very few elements need to shift at all, so the total work stays close to linear — a genuine, data-dependent best case, not a special-cased shortcut.",
      },
      {
        id: "dsa-q12-2",
        prompt:
          "Why does merge sort guarantee O(n log n) in every case, unlike insertion sort's variable behavior?",
        choices: [
          "Merge sort secretly checks if the input is sorted first",
          "The divide step always splits the array exactly in half regardless of the data's existing order, so the algorithm's structure doesn't depend on how sorted the input already is",
          "Merge sort is actually not guaranteed O(n log n)",
          "Because merge sort never compares any elements",
        ],
        correctIndex: 1,
        explanation:
          "Merge sort's recursive division is purely based on array length, not on the values or their order — it always halves, conquers, and merges the same way regardless of input, which is exactly what makes its complexity a guarantee rather than a best/average/worst-case range.",
      },
      {
        id: "dsa-q12-3",
        prompt:
          "A team needs to sort a 15-element array once. Which factor makes insertion sort a defensible choice here, despite merge sort's better asymptotic complexity?",
        choices: [
          "Insertion sort is always faster than merge sort, at any size",
          "For a small n, constant factors and implementation simplicity can matter more than asymptotic growth rate, since the difference between n^2 and n log n is numerically small at small n",
          "Merge sort cannot handle arrays smaller than 100 elements",
          "There is no valid justification; merge sort is always the better choice",
        ],
        correctIndex: 1,
        explanation:
          "Asymptotic complexity describes behavior as n grows large — at small, fixed sizes, the actual numeric difference between n^2 and n log n can be tiny, and simpler algorithms with lower constant overhead (and no extra memory allocation) can be the genuinely better real-world choice, which is exactly why many real sort implementations switch to insertion sort for small sub-arrays.",
      },
    ],
    takeaway:
      "Insertion sort is simple, in-place, and O(n) on nearly-sorted data but O(n^2) worst case; merge sort guarantees O(n log n) in every case at the cost of O(n) extra memory — choosing between them requires weighing actual array size, existing order, and memory constraints, not just comparing Big O classes in isolation.",
    summary:
      "Insertion sort shifts each new element into its correct position among already-sorted elements — O(n^2) worst case, O(n) on nearly-sorted input, in-place. Merge sort divides, recursively sorts, and merges — guaranteed O(n log n), but needs O(n) extra memory. The better choice depends on the actual constraints of the situation, not a single Big-O comparison.",
    nextLessonSlug: "dsa-graphs-and-traversal",
  },
  {
    id: "dsa-graphs-and-traversal",
    slug: "dsa-graphs-and-traversal",
    title: "Graphs: Representations, BFS, and DFS",
    description:
      "Modeling relationships that don't fit a tree's strict hierarchy, and the two fundamental ways to systematically visit every reachable node.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 12,
    difficulty: "advanced",
    estimatedMinutes: 23,
    prerequisites: ["dsa-sorting"],
    objectives: [
      "Represent a graph using an adjacency list",
      "Implement breadth-first search and explain why it's the right tool for shortest-path-in-hops problems",
      "Implement depth-first search, including cycle detection using a visited set",
    ],
    skills: ["algorithms", "graphs", "bfs", "dfs"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Map — a natural fit for an adjacency list",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
      },
    ],
    keywords: ["graphs", "bfs", "dfs", "adjacency list", "cycle detection"],
    explanation: `A **graph** generalizes a tree by dropping its strict hierarchy: nodes (**vertices**) connect via **edges** with no required parent/child structure, no "root," and — critically — **cycles are allowed** (a path that leads back to a node already visited), something a tree, by definition, can never have. A graph models any relationship that isn't naturally hierarchical: course prerequisites (which can have multiple valid paths converging), a social network, a road map, or a dependency graph between packages.

The standard, memory-efficient representation is an **adjacency list**: a map from each node to the list of nodes it directly connects to. \`{ A: ["B", "C"], B: ["D"], C: ["D"], D: [] }\` represents a graph where A connects to B and C, both of which connect to D. This is dramatically more space-efficient than an adjacency *matrix* (an n×n grid marking every possible pair) for the **sparse** graphs — relatively few edges compared to the maximum possible — that most real-world graphs actually are.

**Breadth-first search (BFS)** explores level by level, using a **queue**: visit the start node, then every node one edge away, then every node two edges away, and so on. This level-by-level order is exactly what makes BFS the right tool whenever you need the **shortest path measured in number of edges** — the first time BFS reaches a target node is guaranteed to be via a shortest such path, because it's provably impossible for a node reached later, in a later "level," to be closer.

**Depth-first search (DFS)** explores as far as possible down one path before backtracking, using a **stack** (either explicit, or implicit via recursion — DFS is naturally recursive, in the same style as the tree traversals from two modules ago, since a tree is really just a graph with no cycles and exactly one path to every node). Both BFS and DFS require tracking a **visited set** — without one, a graph containing a cycle causes infinite re-visiting of the same nodes, which never happens in tree traversal precisely because trees can't have cycles; this is the one genuinely new bookkeeping requirement graphs introduce that trees never needed. The visited set doubles as straightforward **cycle detection**: encountering an already-visited node via an edge that isn't simply "back to where you immediately came from" (in an undirected graph) reveals a cycle.`,
    example: {
      language: "javascript",
      description:
        "BFS (queue, level-by-level) and DFS (stack/recursion, depth-first) over the same adjacency-list graph, both tracking a visited set to handle cycles safely.",
      code: `const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C", "E"],
  E: ["D"],
};

function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor); // mark visited when ENQUEUED, not when dequeued -- avoids duplicate enqueues
        queue.push(neighbor);
      }
    }
  }
  return order;
}

function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, order); // recursive call = implicit stack
    }
  }
  return order;
}

console.log(bfs(graph, "A")); // ["A", "B", "C", "D", "E"] -- level by level
console.log(dfs(graph, "A")); // ["A", "B", "D", "C", "E"] -- as deep as possible first`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Add a new node F connected only to E, and confirm both bfs and dfs from A eventually reach it.",
      code: `const graph = {
  A: ["B"],
  B: ["A", "C"],
  C: ["B"],
};
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
    }
  }
  return order;
}
console.log(bfs(graph, "A"));`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-13-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write bfs(graph, start) returning the visit order (an array), correctly handling a graph with a cycle using a visited set (mark a node visited when it's ENQUEUED, not when dequeued, to avoid enqueuing the same node twice).",
      starterCode: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  // TODO: standard BFS loop -- dequeue, record, enqueue unvisited neighbors (marking them visited immediately)
  return order;
}
`,
      solutionCode: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
      harness: `
        try {
          const graph = { A: ["B","C"], B: ["A"], C: ["A"] };
          window.__report('t1', JSON.stringify(bfs(graph, "A")) === JSON.stringify(["A","B","C"]), 'should visit A then its two direct neighbors');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const cyclic = { A: ["B"], B: ["C"], C: ["A"] }; // a cycle: A -> B -> C -> A
          const result = bfs(cyclic, "A");
          window.__report('t2', result.length === 3 && new Set(result).size === 3, 'a cyclic graph should still terminate and visit each node exactly once');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const single = { A: [] };
          window.__report('t3', JSON.stringify(bfs(single, "A")) === JSON.stringify(["A"]), 'a single isolated node should just visit itself');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "visits nodes in correct level order" },
        {
          id: "t2",
          description: "terminates correctly and visits each node exactly once even with a cycle",
        },
        { id: "t3", description: "handles a single isolated node with no edges" },
      ],
      hints: [
        "Without the visited set, a cycle causes the queue to grow forever -- this is the one genuinely new failure mode graphs introduce that tree traversal never had.",
        "Marking a node visited at ENQUEUE time (not dequeue time) prevents it from being added to the queue multiple times by different neighbors.",
      ],
    },
    independentExercise: {
      id: "dsa-13-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write hasPath(graph, start, end) using DFS (recursive, with a visited set) to determine whether ANY path exists from start to end (return true if start === end trivially). Then write hasCycle(graph) for an UNDIRECTED graph (every edge appears in both directions in the adjacency list) that detects whether any cycle exists, using DFS and tracking each node's parent to correctly ignore the trivial 'came right back the way I arrived' case.",
      starterCode: `function hasPath(graph, start, end, visited = new Set()) {
  // TODO: base case start === end; mark visited; recurse into unvisited neighbors
  return false;
}
function hasCycle(graph) {
  const visited = new Set();
  function dfsCycleCheck(node, parent) {
    // TODO: mark node visited; for each neighbor, if unvisited recurse (return true if it finds a cycle);
    // if the neighbor IS visited and is NOT the parent we just came from, a cycle exists -- return true
    return false;
  }
  for (const node in graph) {
    if (!visited.has(node) && dfsCycleCheck(node, null)) return true;
  }
  return false;
}
`,
      solutionCode: `function hasPath(graph, start, end, visited = new Set()) {
  if (start === end) return true;
  visited.add(start);
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor) && hasPath(graph, neighbor, end, visited)) return true;
  }
  return false;
}
function hasCycle(graph) {
  const visited = new Set();
  function dfsCycleCheck(node, parent) {
    visited.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfsCycleCheck(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true;
      }
    }
    return false;
  }
  for (const node in graph) {
    if (!visited.has(node) && dfsCycleCheck(node, null)) return true;
  }
  return false;
}`,
      harness: `
        try {
          const graph = { A: ["B"], B: ["A","C"], C: ["B"], D: [] };
          window.__report('t1', hasPath(graph, "A", "C") === true, 'A to C should be reachable through B');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const graph = { A: ["B"], B: ["A"], D: [] };
          window.__report('t2', hasPath(graph, "A", "D") === false, 'D is disconnected -- should be unreachable');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const graph = { A: [] };
          window.__report('t3', hasPath(graph, "A", "A") === true, 'a node has a trivial path to itself');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try {
          const acyclic = { A: ["B"], B: ["A","C"], C: ["B"] }; // a simple chain, no cycle
          window.__report('t4', hasCycle(acyclic) === false, 'a simple chain should have no cycle');
        } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try {
          const cyclic = { A: ["B","C"], B: ["A","C"], C: ["A","B"] }; // a triangle -- a real cycle
          window.__report('t5', hasCycle(cyclic) === true, 'a triangle graph should be detected as having a cycle');
        } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "finds a path that exists through an intermediate node" },
        { id: "t2", description: "correctly reports no path to a disconnected node" },
        { id: "t3", description: "a node trivially has a path to itself" },
        { id: "t4", description: "correctly reports no cycle in a simple chain" },
        { id: "t5", description: "correctly detects a genuine cycle (a triangle)" },
      ],
      hints: [
        "hasCycle's parent-tracking is essential: in an undirected graph, every edge is stored both ways (A->B and B->A), so without ignoring the immediate parent, every single edge would look like a false cycle.",
        "hasPath and hasCycle are both DFS variations -- the traversal shape is the same as the guided exercise's BFS, just using recursion (an implicit stack) instead of an explicit queue.",
      ],
    },
    commonMistakes: [
      "Forgetting the visited set entirely on a graph (unlike tree traversal, where it was never needed) -- a cycle then causes infinite re-visiting, which either hangs or eventually crashes with a stack overflow (for recursive DFS) or an ever-growing queue (for BFS).",
      "Using DFS when the actual requirement is 'shortest path in number of edges' -- DFS finds A path, not necessarily the shortest one; only BFS's level-by-level order guarantees shortest-in-edges.",
      "Detecting a cycle in an undirected graph without tracking the parent node -- since every edge is stored in both directions, the edge you just traversed always looks like 'a visited neighbor,' producing false positives unless the immediate parent is explicitly excluded from the check.",
    ],
    quiz: [
      {
        id: "dsa-q13-1",
        prompt:
          "What genuinely new bookkeeping requirement do graphs introduce that tree traversal never needed?",
        choices: [
          "Graphs require sorting nodes first",
          "A visited set, because graphs can contain cycles, which trees by definition cannot -- without tracking visited nodes, a cycle causes infinite re-traversal",
          "Graphs cannot be traversed recursively",
          "Graphs require a database to store",
        ],
        correctIndex: 1,
        explanation:
          "A tree's structure guarantees exactly one path to every node and no cycles, so traversal naturally terminates via the null base case alone. A graph offers no such guarantee — a cycle would cause infinite re-visiting without an explicit visited set to prevent revisiting nodes already seen.",
      },
      {
        id: "dsa-q13-2",
        prompt:
          "Why does BFS, specifically, guarantee finding the shortest path measured in number of edges?",
        choices: [
          "It doesn't -- DFS also guarantees this",
          "BFS explores strictly level by level, so the first time it reaches any node is necessarily via the fewest possible edges -- no node in a later level can represent a shorter path",
          "BFS always explores nodes in alphabetical order",
          "Shortest path requires a completely different algorithm from both BFS and DFS",
        ],
        correctIndex: 1,
        explanation:
          "Because BFS fully explores every node at distance k before touching any node at distance k+1, the very first time it reaches a given node is provably via the minimum possible number of edges — a node discovered in a later 'wave' cannot represent a shorter path, by construction.",
      },
      {
        id: "dsa-q13-3",
        prompt:
          "In cycle detection for an undirected graph, why must the DFS check exclude the immediate parent node when deciding whether a visited neighbor indicates a cycle?",
        choices: [
          "It doesn't need to; parent tracking is unnecessary",
          "Because in an undirected graph, every edge is stored in both directions, so the edge just traversed always points back to an already-visited node (the parent) -- without excluding it, every single edge would incorrectly look like a cycle",
          "Parent tracking is only needed for directed graphs",
          "Because undirected graphs never actually contain real cycles",
        ],
        correctIndex: 1,
        explanation:
          "An undirected edge A-B appears as both 'B is a neighbor of A' and 'A is a neighbor of B.' When DFS is at B, having arrived from A, B's neighbor list includes A again — which is already visited, but is not a real cycle, just the edge you just came in on. Excluding the immediate parent is what correctly distinguishes that from an actual cycle.",
      },
    ],
    takeaway:
      "Graphs generalize trees by allowing cycles and arbitrary connections, which makes a visited set mandatory bookkeeping BFS and DFS both need; BFS's level-by-level order specifically guarantees shortest-path-in-edges, while DFS explores depth-first and is the natural tool for reachability and cycle detection.",
    summary:
      "A graph is nodes connected by edges, with cycles allowed, typically represented as an adjacency list. BFS uses a queue and explores level by level, guaranteeing shortest path in edges. DFS uses a stack (or recursion) and explores depth-first. Both require a visited set to handle cycles safely, which trees never needed.",
    nextLessonSlug: "dsa-backtracking-greedy-dynamic-programming",
  },
  {
    id: "dsa-backtracking-greedy-dynamic-programming",
    slug: "dsa-backtracking-greedy-dynamic-programming",
    title: "Backtracking, Greedy Reasoning, and Dynamic Programming",
    description:
      "Three algorithmic strategies for problems too large to brute-force honestly — when each one applies, and, just as important, when each one gives a wrong answer if misapplied.",
    trackSlug: "algorithms",
    courseSlug: "data-structures-and-algorithms",
    order: 13,
    difficulty: "advanced",
    estimatedMinutes: 24,
    prerequisites: ["dsa-graphs-and-traversal"],
    objectives: [
      "Implement a backtracking solution that explores and correctly abandons invalid partial solutions",
      "Explain why a greedy algorithm's local-best choice does not always produce a globally optimal answer",
      "Implement a memoized (top-down dynamic programming) solution and explain what problem property justifies the approach",
    ],
    skills: ["algorithms", "backtracking", "greedy", "dynamic-programming"],
    tech: [{ name: "JavaScript", version: "ES2022+" }],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-03",
    references: [
      {
        label: "MDN: Map — used here as a memoization cache",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
      },
    ],
    keywords: ["backtracking", "greedy algorithms", "dynamic programming", "memoization"],
    explanation: `**Backtracking** systematically explores every candidate solution by building one piece at a time, **abandoning a partial solution the moment it's provably invalid** (rather than continuing to build on top of it) — that early abandonment is the entire point: it's what keeps backtracking from degenerating into a brute-force exploration of every possible full solution. A classic example: placing values one position at a time and, immediately after each placement, checking whether the constraints so far are still satisfiable — if not, "backtrack" (undo the last placement) and try the next candidate value instead, rather than continuing to fill in more positions on top of an already-broken partial solution.

**Greedy algorithms** make the locally-best choice at each step, never reconsidering it — genuinely simple and fast, but **only correct for problems that actually have the "greedy-choice property"**: making the best immediate choice must be provably compatible with reaching a globally optimal overall solution. Coin-making-change with denominations \`{1, 5, 10, 25}\` (always take the largest coin that fits) works correctly with a greedy approach, but the *exact same greedy strategy* applied to a hypothetical denomination set like \`{1, 3, 4}\` for a target of \`6\` gives a **wrong** answer: greedy picks \`4\`, then \`1\`, then \`1\` (three coins), while the actual optimal answer is \`3 + 3\` (two coins) — the greedy choice property simply doesn't hold for this denomination set. This is precisely why "greedy" is a strategy that requires justifying *why* it applies to the specific problem at hand, not a default first choice, and a wrong-but-plausible-looking greedy answer is a genuinely common, hard-to-notice class of bug.

**Dynamic programming (DP)** applies when a problem has **overlapping subproblems** (the same smaller computation gets needed repeatedly, as naive recursive Fibonacci does — \`fibonacci(5)\` calls \`fibonacci(3)\` multiple times, redundantly, through different paths) *and* **optimal substructure** (an optimal solution to the whole problem is built from optimal solutions to its subproblems). **Memoization** — caching each subproblem's result the first time it's computed, and returning the cached value on every subsequent request for that exact subproblem, instead of recomputing it — is the direct fix for the overlapping-subproblems case: it turns naive recursive Fibonacci's exponential \`O(2^n)\` into a linear \`O(n)\`, without changing the recursive structure itself at all, just by refusing to redo work already done.`,
    example: {
      language: "javascript",
      description:
        "Greedy giving a wrong answer for a denomination set it doesn't actually work for -- and memoized Fibonacci fixing naive recursion's redundant recomputation.",
      code: `// GREEDY -- correct for {1,5,10,25}, WRONG for {1,3,4}:
function greedyChange(amount, coins) {
  const sorted = [...coins].sort((a, b) => b - a);
  const used = [];
  for (const coin of sorted) {
    while (amount >= coin) {
      used.push(coin);
      amount -= coin;
    }
  }
  return used;
}
console.log(greedyChange(6, [1, 3, 4])); // [4, 1, 1] -- 3 coins, but 2 coins (3+3) is actually optimal!

// MEMOIZED (top-down DP): the SAME recursive structure as naive Fibonacci, but caching results.
function fibMemo(n, cache = new Map()) {
  if (n <= 1) return n;
  if (cache.has(n)) return cache.get(n); // overlapping subproblem -- reuse, don't recompute
  const result = fibMemo(n - 1, cache) + fibMemo(n - 2, cache);
  cache.set(n, result);
  return result;
}
console.log(fibMemo(40)); // instant -- naive recursion would take a very long time at n=40`,
      editable: false,
    },
    editableExample: {
      language: "javascript",
      description:
        "Try greedyChange with target 6 and denominations [1,3,4] -- confirm it uses 3 coins, not the optimal 2.",
      code: `function greedyChange(amount, coins) {
  const sorted = [...coins].sort((a, b) => b - a);
  const used = [];
  for (const coin of sorted) {
    while (amount >= coin) {
      used.push(coin);
      amount -= coin;
    }
  }
  return used;
}
console.log(greedyChange(6, [1, 3, 4]));`,
      editable: true,
    },
    guidedExercise: {
      id: "dsa-14-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write climbStairsMemo(n, cache = new Map()) computing the number of distinct ways to climb n stairs, taking 1 or 2 steps at a time (climbStairsMemo(1) = 1, climbStairsMemo(2) = 2, climbStairsMemo(n) = climbStairsMemo(n-1) + climbStairsMemo(n-2)). Use memoization -- this has the exact same overlapping-subproblem shape as Fibonacci.",
      starterCode: `function climbStairsMemo(n, cache = new Map()) {
  // TODO: base cases n===1 (1 way) and n===2 (2 ways)
  // TODO: check cache first; if not cached, compute recursively and store in cache before returning
}
`,
      solutionCode: `function climbStairsMemo(n, cache = new Map()) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (cache.has(n)) return cache.get(n);
  const result = climbStairsMemo(n - 1, cache) + climbStairsMemo(n - 2, cache);
  cache.set(n, result);
  return result;
}`,
      harness: `
        try { window.__report('t1', climbStairsMemo(1) === 1, 'climbStairsMemo(1) should be 1'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', climbStairsMemo(2) === 2, 'climbStairsMemo(2) should be 2'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', climbStairsMemo(5) === 8, 'climbStairsMemo(5) should be 8'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try {
          const start = Date.now();
          climbStairsMemo(35);
          window.__report('t4', Date.now() - start < 1000, 'climbStairsMemo(35) should return quickly -- proof memoization is actually working');
        } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "base case n=1" },
        { id: "t2", description: "base case n=2" },
        { id: "t3", description: "computes a larger value correctly" },
        {
          id: "t4",
          description:
            "runs fast even for a larger n, proving memoization prevents exponential blowup",
        },
      ],
      hints: [
        "This is structurally identical to fibMemo from the example -- same cache-check-then-store pattern.",
        "Without the cache, n=35 would take a very long time; with it, the answer is near-instant.",
      ],
    },
    independentExercise: {
      id: "dsa-14-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write generateSubsets(items) using BACKTRACKING to return every possible subset of items (including the empty set and the full set) as an array of arrays -- build each subset one decision at a time (include or exclude the current item), and 'backtrack' (undo the last inclusion) before trying the next branch. Then write isGreedyChangeSafe(coins) that returns true only for the two SPECIFIC denomination sets [1,5,10,25] and [1,2,5] (return false for any other input, including [1,3,4]) -- modeling that greedy correctness must be verified per denomination set, not assumed.",
      starterCode: `function generateSubsets(items) {
  const result = [];
  const current = [];
  function backtrack(index) {
    if (index === items.length) {
      result.push([...current]); // record a complete subset
      return;
    }
    // TODO: branch 1 -- exclude items[index], recurse
    // TODO: branch 2 -- include items[index] (push, recurse, then POP to backtrack)
  }
  backtrack(0);
  return result;
}
function isGreedyChangeSafe(coins) {
  // TODO: return true only for the two exact denomination sets described above
}
`,
      solutionCode: `function generateSubsets(items) {
  const result = [];
  const current = [];
  function backtrack(index) {
    if (index === items.length) {
      result.push([...current]);
      return;
    }
    backtrack(index + 1); // exclude
    current.push(items[index]);
    backtrack(index + 1); // include
    current.pop(); // backtrack: undo the inclusion before returning
  }
  backtrack(0);
  return result;
}
function isGreedyChangeSafe(coins) {
  const known = [JSON.stringify([1,5,10,25]), JSON.stringify([1,2,5])];
  return known.includes(JSON.stringify([...coins].sort((a,b) => a-b)));
}`,
      harness: `
        try {
          const result = generateSubsets([1,2]);
          const normalized = result.map(s => [...s].sort()).sort((a,b) => a.length - b.length || JSON.stringify(a).localeCompare(JSON.stringify(b)));
          const expected = [[], [1], [2], [1,2]].map(s => s).sort((a,b) => a.length - b.length || JSON.stringify(a).localeCompare(JSON.stringify(b)));
          window.__report('t1', JSON.stringify(normalized) === JSON.stringify(expected), 'should generate exactly the 4 subsets of a 2-element array');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', generateSubsets([]).length === 1, 'an empty input should still produce exactly one subset -- the empty set itself'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', generateSubsets([1,2,3]).length === 8, 'a 3-element array should produce 2^3 = 8 subsets'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', isGreedyChangeSafe([1,5,10,25]) === true, 'the standard US coin denominations should be considered greedy-safe'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
        try { window.__report('t5', isGreedyChangeSafe([1,3,4]) === false, 'the {1,3,4} denomination set is NOT greedy-safe and must be rejected'); } catch (e) { window.__report('t5', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "generates the correct 4 subsets for a 2-element input" },
        { id: "t2", description: "an empty input still yields one subset (the empty set)" },
        { id: "t3", description: "a 3-element input yields exactly 2^3 = 8 subsets" },
        { id: "t4", description: "correctly identifies a genuinely greedy-safe denomination set" },
        { id: "t5", description: "correctly rejects a denomination set where greedy fails" },
      ],
      hints: [
        "current.pop() after the 'include' recursive call is the actual backtracking step -- without it, the array would keep growing incorrectly across sibling branches.",
        "isGreedyChangeSafe is a deliberately narrow, explicit model: real greedy-choice-property verification requires a mathematical proof specific to the problem, not a lookup table -- this exercise only asks you to encode the conclusion for two known cases.",
      ],
    },
    commonMistakes: [
      "Assuming a greedy 'take the biggest/closest/cheapest option first' strategy is automatically correct for a new problem, without verifying the greedy-choice property actually holds -- the {1,3,4}-denomination counterexample in this lesson shows how a locally reasonable choice can produce a demonstrably suboptimal final answer.",
      "Forgetting the 'undo' step in backtracking (e.g. current.pop() after an included branch) -- without it, state built up in one branch incorrectly leaks into sibling branches that should have started fresh.",
      "Reaching for dynamic programming when subproblems DON'T actually overlap -- memoizing a computation that's never repeated adds bookkeeping overhead for no benefit; DP specifically pays off when the same subproblem is genuinely needed more than once.",
    ],
    quiz: [
      {
        id: "dsa-q14-1",
        prompt:
          "What specifically makes backtracking more efficient than exhaustively generating every full candidate solution and checking each one afterward?",
        choices: [
          "Backtracking uses less memory in all cases",
          "Backtracking abandons a partial solution the moment it's provably invalid, avoiding the wasted work of continuing to build on top of an already-broken partial solution",
          "Backtracking only works on sorted input",
          "There's no real efficiency difference between the two approaches",
        ],
        correctIndex: 1,
        explanation:
          "The early-abandonment step is backtracking's defining efficiency gain: entire branches of the search space that are provably doomed get pruned immediately, rather than being explored all the way to a complete (and ultimately invalid) candidate solution.",
      },
      {
        id: "dsa-q14-2",
        prompt:
          "Why does a greedy 'always take the largest coin that fits' strategy give the WRONG answer for making 6 cents from denominations {1, 3, 4}?",
        choices: [
          "Greedy algorithms never work for coin problems",
          "The greedy-choice property doesn't hold for this specific denomination set -- the locally best choice (take 4) leads to a 3-coin answer, while an optimal 2-coin answer (3+3) exists",
          "6 is not a valid amount to make change for",
          "This is actually the optimal answer, and the lesson's claim is incorrect",
        ],
        correctIndex: 1,
        explanation:
          "Greedy correctness is not automatic — it requires the specific problem to have the greedy-choice property (each locally optimal choice being provably compatible with a global optimum). {1,3,4} for target 6 is a genuine, standard counterexample: greedy takes 4+1+1 (3 coins) while 3+3 (2 coins) is strictly better.",
      },
      {
        id: "dsa-q14-3",
        prompt:
          "What two properties does a problem need for dynamic programming (specifically, memoization) to be an appropriate technique?",
        choices: [
          "The input must be sorted, and the output must be a single number",
          "Overlapping subproblems (the same smaller computation is needed repeatedly) and optimal substructure (an optimal overall solution is built from optimal subproblem solutions)",
          "The problem must involve a graph",
          "The problem must have exactly one valid solution",
        ],
        correctIndex: 1,
        explanation:
          "These two properties are what justify DP specifically: overlapping subproblems mean memoization avoids genuine redundant work (as in naive recursive Fibonacci), while optimal substructure means the cached subproblem answers actually combine correctly into the overall answer -- without both, memoization either has nothing to cache or caches values that don't compose correctly.",
      },
    ],
    takeaway:
      "Backtracking prunes invalid partial solutions early instead of exhaustively checking every complete one; greedy algorithms are fast but only correct for problems that genuinely have the greedy-choice property, which must be verified, not assumed; dynamic programming pays off specifically when subproblems overlap and combine via optimal substructure.",
    summary:
      "Backtracking builds a solution incrementally, abandoning and undoing invalid partial choices immediately. Greedy algorithms commit to the locally-best choice at each step and are only correct when the greedy-choice property genuinely holds for that specific problem. Dynamic programming (via memoization) caches overlapping subproblems' results to avoid redundant recomputation, turning exponential naive recursion into polynomial time.",
  },
];
