import type { LessonInput } from "@/lib/content/types";

/**
 * Quantitative Aptitude (Placement Prep track).
 *
 * Twelve lessons covering the core quantitative-aptitude topics learners
 * meet in placement tests and competitive-exam screening rounds: number
 * systems, LCM/HCF, percentages, profit/loss, interest, ratios and
 * mixtures, time-speed-distance, time-and-work, averages, permutations &
 * combinations, probability, and data interpretation, closing with a
 * mixed-practice capstone. Every exercise models the underlying arithmetic
 * or word-problem logic as a small, deterministic JavaScript function the
 * learner implements and the browser actually runs and checks -- the same
 * pattern used for non-JS subjects elsewhere on this platform (see the
 * PostgreSQL course's data-types lesson). This content is self-paced
 * practice: it never claims to proctor, secure, or officially certify
 * anything.
 */
export const quantitativeAptitudeLessons: LessonInput[] = [
  {
    id: "qa-number-systems-divisibility",
    slug: "number-systems-divisibility",
    title: "Number Systems and Divisibility Rules",
    description:
      "How place value works and how to tell whether a number divides evenly by 2 through 11 without doing long division.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Explain how place value determines a digit's contribution to a number's value",
      "Apply the divisibility rules for 2, 3, 4, 5, 6, 8, 9, 10, and 11 to a given number",
      "Classify a whole number as prime, composite, or neither",
    ],
    skills: ["quantitative-aptitude", "divisibility-rules"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: [
      "place value",
      "divisibility rules",
      "prime numbers",
      "composite numbers",
      "factors",
    ],
    explanation: `Almost every shortcut in quantitative aptitude rests on one idea: a number is really just a sum of digits multiplied by **place value** (powers of ten). The number 4536 means 4×1000 + 5×100 + 3×10 + 6×1. Divisibility rules exist because, once you expand a number that way, you can prove which digits actually matter for a given divisor and ignore the rest — that's what turns "divide 4536 by 11 the long way" into a ten-second mental check.

Here are the rules worth memorizing, from simplest to least obvious:

- **Divisible by 2:** last digit is even (0, 2, 4, 6, 8).
- **Divisible by 5:** last digit is 0 or 5.
- **Divisible by 10:** last digit is 0.
- **Divisible by 4:** the last **two** digits, read as a two-digit number, are divisible by 4.
- **Divisible by 8:** the last **three** digits, read as a number, are divisible by 8.
- **Divisible by 3:** the sum of all digits is divisible by 3.
- **Divisible by 9:** the sum of all digits is divisible by 9.
- **Divisible by 6:** the number is divisible by both 2 and 3.
- **Divisible by 11:** starting from the rightmost digit, alternately add and subtract digits; if that alternating sum is divisible by 11 (including 0), so is the original number.

**Worked example.** Take 4536. Last digit is 6 (even), so it's divisible by 2. Digit sum is 4+5+3+6 = 18, which is divisible by both 3 and 9, so 4536 is divisible by 3, 9, and (since it's also divisible by 2) by 6. Last two digits are "36", and 36 ÷ 4 = 9 exactly, so 4536 is divisible by 4. For 11: reading from the right with alternating signs gives 6 − 3 + 5 − 4 = 4, which is *not* divisible by 11, so 4536 is not divisible by 11. One number, five divisibility facts, no long division.

Two more definitions matter here. A **factor** of a number divides it with no remainder; a **multiple** of a number is what you get multiplying it by a whole number. A **prime** number has exactly two distinct factors — 1 and itself — so 2, 3, 5, 7, 11, and 13 are prime, but 1 is not prime (it has only one factor) and neither is it composite. A **composite** number has more than two factors, like 12 (factors 1, 2, 3, 4, 6, 12). The fastest way to test whether n is prime by hand is trial division only up to √n: if nothing from 2 up to √n divides n evenly, nothing larger can either, because any factor pair (a, b) with a×b = n must have at least one of a, b no bigger than √n.

These rules aren't just party tricks — they're the fastest way to simplify fractions, spot common factors under time pressure, and sanity-check a long-division answer before you trust it.`,
    visual: {
      kind: "table",
      title: "Divisibility rules quick reference",
      description:
        "Divisor 2: last digit even. Divisor 3: digit sum divisible by 3. Divisor 4: last two digits divisible by 4. Divisor 5: last digit 0 or 5. Divisor 6: divisible by both 2 and 3. Divisor 8: last three digits divisible by 8. Divisor 9: digit sum divisible by 9. Divisor 10: last digit 0. Divisor 11: alternating digit sum (from the right) divisible by 11.",
    },
    example: {
      language: "javascript",
      editable: false,
      description:
        "Computing a digit sum is the shared basis of the divisibility rules for 3 and 9.",
      code: `function digitSum(n) {
  return String(Math.abs(n))
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
}
// Example: digitSum(4536) -> 18 (4+5+3+6), and 18 is divisible by 9, so 4536 is divisible by 9.`,
    },
    guidedExercise: {
      id: "qa-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write divisibilityRuleCheck(n, divisor) where n is a non-negative integer and divisor is one of 2, 3, 4, 5, 6, 8, 9, 10, or 11. Implement the actual shortcut rule for that divisor from this lesson (last digit, digit sum, last two/three digits, or alternating sum) and return true or false for whether n is evenly divisible by divisor.",
      starterCode: `function divisibilityRuleCheck(n, divisor) {
  // TODO: implement the shortcut rule for the given divisor (2, 3, 4, 5, 6, 8, 9, 10, or 11)
  // Hint: convert n to a string of digits and work with digits, not n % divisor directly.
}
`,
      solutionCode: `function divisibilityRuleCheck(n, divisor) {
  const digits = String(Math.abs(n)).split("").map(Number);
  const digitSum = digits.reduce((a, b) => a + b, 0);

  switch (divisor) {
    case 2:
      return digits[digits.length - 1] % 2 === 0;
    case 5:
      return digits[digits.length - 1] === 0 || digits[digits.length - 1] === 5;
    case 10:
      return digits[digits.length - 1] === 0;
    case 4:
      return Number(digits.slice(-2).join("")) % 4 === 0;
    case 8:
      return Number(digits.slice(-3).join("")) % 8 === 0;
    case 3:
      return digitSum % 3 === 0;
    case 9:
      return digitSum % 9 === 0;
    case 6:
      return divisibilityRuleCheck(n, 2) && divisibilityRuleCheck(n, 3);
    case 11: {
      let altSum = 0;
      let sign = 1;
      for (let i = digits.length - 1; i >= 0; i--) {
        altSum += sign * digits[i];
        sign *= -1;
      }
      return altSum % 11 === 0;
    }
    default:
      return n % divisor === 0;
  }
}`,
      harness: `
        try { window.__report('t1', divisibilityRuleCheck(4536, 9) === true, 'digit sum of 4536 is 18, which is divisible by 9'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', divisibilityRuleCheck(4536, 11) === false, 'the alternating sum for 4536 is 4, not divisible by 11'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', divisibilityRuleCheck(1024, 8) === true, 'last three digits of 1024 are 024 = 24, and 24 is divisible by 8'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Correctly applies the digit-sum rule for 9", hidden: false },
        {
          id: "t2",
          description: "Correctly applies the alternating-sum rule for 11",
          hidden: false,
        },
        {
          id: "t3",
          description: "Correctly reads a leading-zero last-three-digits case for 8",
          hidden: true,
        },
      ],
      hints: [
        "Start by turning n into an array of its individual digits with String(n).split('').",
        "For 3 and 9, sum every digit and check that sum against the divisor.",
        "For 4 and 8, take the last two or three digits (digits.slice(-2) or slice(-3)), join them back into a number, and check that against the divisor.",
        "For 11, walk the digits from the right, alternating between adding and subtracting each one, and check whether that running total is divisible by 11.",
      ],
    },
    independentExercise: {
      id: "qa-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write classifyNumber(n) where n is an integer. Return the string 'prime' if n is a prime number, 'composite' if n is a composite number, or 'neither' if n is less than 2 (this covers 0, 1, and negative numbers). Use trial division only up to the square root of n for efficiency.",
      starterCode: `function classifyNumber(n) {
  // TODO: return 'prime', 'composite', or 'neither'
}
`,
      solutionCode: `function classifyNumber(n) {
  if (!Number.isInteger(n) || n < 2) return "neither";
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return "composite";
  }
  return "prime";
}`,
      harness: `
        try { window.__report('t1', classifyNumber(97) === 'prime', '97 has no factors other than 1 and itself'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', classifyNumber(91) === 'composite', '91 = 7 x 13, so it has more than two factors'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', classifyNumber(1) === 'neither', '1 has only one factor, so it is defined as neither prime nor composite'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Correctly identifies a prime number", hidden: false },
        { id: "t2", description: "Correctly identifies a composite number", hidden: false },
        { id: "t3", description: "Correctly handles the special case of 1", hidden: true },
      ],
      hints: [
        "A number less than 2 should immediately return 'neither', before any division checks.",
        "Loop a trial divisor i starting at 2, and stop once i * i exceeds n -- you never need to check past the square root.",
        "If any i in that range divides n evenly, you can return 'composite' immediately.",
        "If the loop finishes with no divisor found, n must be prime.",
      ],
    },
    commonMistakes: [
      "Applying the divisibility-by-3 digit-sum rule to check divisibility by 4 or 8 — those two rules depend on the last two or three digits, not the sum of all digits.",
      "Treating 1 as a prime number — by definition a prime has exactly two distinct factors, and 1 only has one.",
      "Checking every possible divisor up to n when testing primality instead of stopping at the square root of n, which wastes time without finding anything new.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Using the digit-sum rule, which of these numbers is divisible by 9?",
        choices: ["4531", "6237", "8102", "5544"],
        correctIndex: 1,
        explanation:
          "6237 has digit sum 6+2+3+7 = 18, which is divisible by 9, so 6237 is divisible by 9. None of the other digit sums (13, 11, 18... check each) work out to a multiple of 9.",
      },
      {
        id: "q2",
        prompt: "Which statement correctly defines a prime number?",
        choices: [
          "A number divisible by 2",
          "A number with exactly two distinct factors: 1 and itself",
          "Any number greater than 10",
          "A number that cannot be written as a product of two smaller numbers other than 1",
        ],
        correctIndex: 1,
        explanation:
          "The precise definition of a prime is a number with exactly two distinct positive factors, 1 and itself — this is why 1 is excluded (it has only one factor) even though it can't be split into two smaller factors either.",
      },
      {
        id: "q3",
        prompt:
          "A cashier wants to quickly check whether 3,824 forms can be split evenly into groups of 4 without doing full long division. Which shortcut should they use?",
        choices: [
          "Check whether the last digit is even",
          "Sum all the digits and check if that sum is divisible by 4",
          "Check whether the last two digits, read as their own number, are divisible by 4",
          "Check whether the number is divisible by 8 first",
        ],
        correctIndex: 2,
        explanation:
          "The divisibility rule for 4 only depends on the number formed by the last two digits — for 3,824 that's '24', and 24 is divisible by 4, so 3,824 is too.",
      },
    ],
    takeaway:
      "Every divisibility rule is a shortcut derived from place value, so you never need long division just to know whether a number splits evenly.",
    summary:
      "Numbers are built from digits weighted by place value, and that structure produces fast divisibility tests for 2 through 11 based on the last digit, last two or three digits, or a digit sum. Primes have exactly two factors, composites have more, and trial division up to the square root is enough to tell them apart.",
    nextLessonSlug: "lcm-hcf",
  },
  {
    id: "qa-lcm-hcf",
    slug: "lcm-hcf",
    title: "LCM and HCF",
    description:
      "Finding the largest shared factor and the smallest shared multiple of two or more numbers, and using them to solve real grouping and timing problems.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["qa-number-systems-divisibility"],
    objectives: [
      "Find the HCF of two numbers using prime factorization or the Euclidean algorithm",
      "Find the LCM of two or more numbers and verify it using LCM x HCF = product of the two numbers",
      "Apply LCM to word problems about events recurring together and HCF to word problems about splitting quantities evenly",
    ],
    skills: ["quantitative-aptitude", "lcm-hcf"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["lcm", "hcf", "gcd", "prime factorization", "euclidean algorithm"],
    explanation: `The **HCF** (Highest Common Factor, also called GCD) of two numbers is the largest number that divides both of them with no remainder. The **LCM** (Least Common Multiple) is the smallest number that both of them divide into evenly. They answer opposite questions: HCF asks "what's the biggest thing I can split both quantities into evenly?" and LCM asks "what's the smallest quantity both of these fit into evenly?"

**Prime factorization method.** Break each number into prime factors, then:
- HCF = product of the **lowest** power of every prime that appears in *both* factorizations.
- LCM = product of the **highest** power of every prime that appears in *either* factorization.

**Worked example.** Take 18 and 24. 18 = 2¹ × 3², and 24 = 2³ × 3¹. For HCF, take the lower power of each shared prime: 2¹ × 3¹ = 6. For LCM, take the higher power of each prime that appears anywhere: 2³ × 3² = 8 × 9 = 72. A useful check exists precisely because of this structure: for any two numbers, **LCM × HCF = the product of the two numbers**. Here, 6 × 72 = 432, and 18 × 24 = 432 — they match, confirming the arithmetic. (This shortcut only holds for exactly two numbers, not three or more.)

For larger or less obviously-factored numbers, the **Euclidean algorithm** finds HCF without factoring anything: repeatedly replace the larger number with the remainder of dividing it by the smaller one, until the remainder is 0 — whatever's left is the HCF. For 18 and 24: 24 ÷ 18 leaves remainder 6; 18 ÷ 6 leaves remainder 0; so HCF = 6, matching the factorization method. Once you have HCF this way, LCM = (a × b) ÷ HCF.

**Word problems** tend to fall into two shapes:
- **"When do they align again?" → LCM.** Three temple bells ring every 12, 18, and 30 minutes respectively, all starting together. They'll next ring together after LCM(12, 18, 30) minutes — the smallest time that's a multiple of all three intervals.
- **"What's the biggest even split?" → HCF.** You have 48 pencils and 60 notebooks and want to pack them into identical gift bags with no items left over, using the fewest bags possible (so, the largest possible bag size). The largest number of *sets* you can make is HCF(48, 60) = 12, meaning each bag gets 4 pencils and 5 notebooks.

The pattern to remember: LCM problems involve things happening *repeatedly* and asking when they *coincide*; HCF problems involve splitting things into *identical groups* with nothing left over.`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "The Euclidean algorithm finds HCF quickly; LCM follows from LCM x HCF = product of the two numbers.",
      code: `function hcf(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / hcf(a, b);
}
// Example: hcf(18, 24) -> 6, and lcm(18, 24) -> 72.`,
    },
    guidedExercise: {
      id: "qa-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write hcf(a, b) that returns the highest common factor of two non-negative integers a and b using the Euclidean algorithm (repeated remainder division). hcf(0, n) should return n, matching the standard convention.",
      starterCode: `function hcf(a, b) {
  // TODO: implement the Euclidean algorithm
}
`,
      solutionCode: `function hcf(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}`,
      harness: `
        try { window.__report('t1', hcf(18, 24) === 6, 'hcf(18, 24) should be 6'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', hcf(101, 103) === 1, 'two distinct primes share no common factor other than 1'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', hcf(0, 5) === 5, 'by convention, hcf(0, n) is n'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Finds the HCF of two composite numbers", hidden: false },
        { id: "t2", description: "Finds the HCF of two coprime numbers is 1", hidden: false },
        { id: "t3", description: "Handles the edge case where one input is 0", hidden: true },
      ],
      hints: [
        "The Euclidean algorithm repeatedly replaces the pair (a, b) with (b, a % b) until b becomes 0.",
        "A while loop with a destructuring swap, [a, b] = [b, a % b], captures this in one line.",
        "Once b is 0, a holds the HCF -- return it.",
        "Trace it by hand on (18, 24): (18,24) -> (24,18%24=18)... swap so the larger goes first each time, or just trust that a % b works correctly regardless of which is larger.",
      ],
    },
    independentExercise: {
      id: "qa-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write ringTogetherAfter(intervals) modeling several bells that all ring together at time 0, where intervals is an array of positive integers giving each bell's ringing interval in minutes. Return the number of minutes until all the bells ring together again -- the LCM of every number in the array.",
      starterCode: `function ringTogetherAfter(intervals) {
  // TODO: return the LCM of all numbers in the intervals array
}
`,
      solutionCode: `function ringTogetherAfter(intervals) {
  function hcfPair(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }
  function lcmPair(a, b) {
    return (a * b) / hcfPair(a, b);
  }
  return intervals.reduce((acc, n) => lcmPair(acc, n));
}`,
      harness: `
        try { window.__report('t1', ringTogetherAfter([12, 18, 30]) === 180, 'three bells at 12, 18, 30 minutes next align at 180 minutes'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', ringTogetherAfter([4, 6]) === 12, 'two bells at 4 and 6 minutes next align at 12 minutes'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', ringTogetherAfter([7]) === 7, 'a single bell "aligns with itself" at its own interval'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Finds the LCM of three intervals", hidden: false },
        { id: "t2", description: "Finds the LCM of two intervals", hidden: false },
        { id: "t3", description: "Handles a single-element array", hidden: true },
      ],
      hints: [
        "You can find the LCM of a whole array by repeatedly combining two numbers at a time: LCM(a, b, c) = LCM(LCM(a, b), c).",
        "Array.prototype.reduce without an initial value starts with the first element as the accumulator, which is exactly the 'combine two at a time' pattern.",
        "Reuse the HCF-based formula for a pair: lcm(a, b) = (a * b) / hcf(a, b).",
        "For a single-element array, reduce never calls your combining function and just returns that one element -- which is the correct answer here.",
      ],
    },
    commonMistakes: [
      "Applying LCM x HCF = product of the numbers to three or more numbers at once — that identity only holds for exactly two numbers.",
      "Mixing up which problem type needs LCM versus HCF — 'when do repeating events coincide' needs LCM, 'largest even split with nothing left over' needs HCF.",
      "Forgetting to take the lowest shared power of each prime for HCF (using the highest power instead, which is how LCM is computed).",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "For any two positive integers a and b, which relationship always holds?",
        choices: [
          "LCM(a, b) + HCF(a, b) = a + b",
          "LCM(a, b) x HCF(a, b) = a x b",
          "LCM(a, b) = HCF(a, b) x 2",
          "LCM(a, b) - HCF(a, b) = a - b",
        ],
        correctIndex: 1,
        explanation:
          "The product of a pair's LCM and HCF always equals the product of the two numbers themselves -- a useful way to compute one once you know the other.",
      },
      {
        id: "q2",
        prompt:
          "Two ribbons measuring 48 cm and 72 cm need to be cut into equal-length pieces with nothing left over, using the longest possible pieces. How long should each piece be?",
        choices: ["24 cm", "12 cm", "8 cm", "6 cm"],
        correctIndex: 0,
        explanation:
          "The longest piece length that divides both 48 and 72 evenly is their HCF. 48 = 2^4 x 3, 72 = 2^3 x 3^2, so HCF = 2^3 x 3 = 24 cm.",
      },
      {
        id: "q3",
        prompt: "Using prime factorization, what is the LCM of 15 and 20?",
        choices: ["60", "300", "5", "10"],
        correctIndex: 0,
        explanation:
          "15 = 3 x 5 and 20 = 2^2 x 5. Taking the highest power of each prime present gives LCM = 2^2 x 3 x 5 = 60.",
      },
    ],
    takeaway:
      "HCF finds the biggest thing two quantities share; LCM finds the smallest thing they both fit into -- and for exactly two numbers, their product ties both together.",
    summary:
      "Prime factorization gives HCF from the lowest shared prime powers and LCM from the highest prime powers present anywhere, while the Euclidean algorithm finds HCF directly by repeated remainder division. LCM answers 'when do repeating events coincide,' and HCF answers 'what's the largest even split with nothing left over.'",
    nextLessonSlug: "percentages",
  },
  {
    id: "qa-percentages",
    slug: "percentages",
    title: "Percentages and Percentage Change",
    description:
      "Converting between fractions, decimals, and percentages, and correctly combining successive percentage increases and decreases.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["qa-lcm-hcf"],
    objectives: [
      "Convert a value between fraction, decimal, and percentage form",
      "Compute the result of a single percentage increase or decrease applied to a value",
      "Combine two successive percentage changes into one equivalent net percentage change",
    ],
    skills: ["quantitative-aptitude", "percentages"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: [
      "percentage",
      "percent change",
      "successive percentage change",
      "fraction to percent",
    ],
    explanation: `A **percentage** is just a fraction with a fixed denominator of 100 — "20%" literally means 20/100, or 0.2 as a decimal. Converting between the three forms is mechanical: fraction → decimal by dividing, decimal → percentage by multiplying by 100, percentage → decimal by dividing by 100. The fraction 3/8, for instance, is 0.375 as a decimal, which is 37.5% — three-eighths of anything is just over a third of it.

**Applying a percentage change** to a value means multiplying by (1 + percent/100) for an increase, or (1 − percent/100) for a decrease. A price of ₹250 increased by 20% becomes 250 × 1.20 = ₹300. A price of ₹250 decreased by 15% becomes 250 × 0.85 = ₹212.50. This single multiplying-factor trick is worth internalizing because it's also exactly how **successive** percentage changes work.

**Successive percentage changes do not simply add.** This is the single most common percentage mistake in aptitude tests. If a value increases by 20% and then decreases by 10%, the *net* change is **not** +10%. Instead, you multiply the two factors: 1.20 × 0.90 = 1.08, meaning a net increase of 8%, not 10%. The general formula for combining two successive percentage changes p1 and p2 into one net percentage change is:

**net% = p1 + p2 + (p1 × p2)/100**

Check it against the example above: 20 + (−10) + (20 × −10)/100 = 20 − 10 − 2 = 8. Matches. The correction term (p1 × p2)/100 is exactly what people forget when they just add the two percentages.

**Worked example.** A shop increases the price of an item by 25%, then later decreases the new price by 20%. What's the net change? Using the formula: 25 + (−20) + (25 × −20)/100 = 25 − 20 − 5 = 0%. Despite the numbers looking like they should roughly cancel *and give a small net change*, they cancel **exactly** here — the 25% increase and 20% decrease exactly offset each other, because 1.25 × 0.80 = 1.00 precisely. That's not a coincidence for these particular numbers; it's a useful pattern to recognize: an increase of x% is exactly undone by a *subsequent* decrease of x/(100+x) × 100%, not by a decrease of x% (25/(125)×100 = 20, which is exactly the 20% used here).

The habit to build: whenever a problem says "increased by A% then decreased by B%" (or vice versa), reach for multiplying factors — (1 + A/100)(1 − B/100) — rather than adding or subtracting the raw percentages.`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "Applying a percent increase or decrease multiplies the original value by (1 + percent/100).",
      code: `function percentChange(value, percent) {
  return Math.round(value * (1 + percent / 100) * 100) / 100;
}
// Example: percentChange(200, 20) -> 240`,
    },
    guidedExercise: {
      id: "qa-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write applyPercentChange(value, percent) that returns value after a single percentage change is applied (a positive percent means increase, a negative percent means decrease), rounded to 2 decimal places.",
      starterCode: `function applyPercentChange(value, percent) {
  // TODO: apply the percentage change and round to 2 decimal places
}
`,
      solutionCode: `function applyPercentChange(value, percent) {
  const result = value * (1 + percent / 100);
  return Math.round(result * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', applyPercentChange(250, 20) === 300, '250 increased by 20% is 300'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', applyPercentChange(250, -15) === 212.5, '250 decreased by 15% is 212.5'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', applyPercentChange(0, 50) === 0, 'a 50% increase applied to 0 is still 0'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Correctly applies a percentage increase", hidden: false },
        { id: "t2", description: "Correctly applies a percentage decrease", hidden: false },
        { id: "t3", description: "Handles a starting value of 0", hidden: true },
      ],
      hints: [
        "A percentage increase multiplies the value by (1 + percent/100); a decrease is the same formula with a negative percent.",
        "You don't need an if/else for increase vs decrease -- a negative percent already produces the right multiplying factor.",
        "Round only at the very end: Math.round(result * 100) / 100 rounds to 2 decimal places.",
      ],
    },
    independentExercise: {
      id: "qa-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write successivePercentChange(p1, p2) that returns the single equivalent net percentage change (rounded to 2 decimal places) that results from applying percentage change p1 followed by percentage change p2 to some value. Use the formula net% = p1 + p2 + (p1 * p2) / 100.",
      starterCode: `function successivePercentChange(p1, p2) {
  // TODO: return the net equivalent percentage change, rounded to 2 decimal places
}
`,
      solutionCode: `function successivePercentChange(p1, p2) {
  const net = p1 + p2 + (p1 * p2) / 100;
  return Math.round(net * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', successivePercentChange(20, -10) === 8, 'a 20% increase then a 10% decrease nets an 8% increase, not 10%'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', successivePercentChange(10, 10) === 21, 'two successive 10% increases net a 21% increase, not 20%'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', successivePercentChange(-50, -50) === -75, 'two successive 50% decreases net a 75% decrease, not 100%'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Correctly nets a mixed increase and decrease", hidden: false },
        { id: "t2", description: "Correctly nets two successive increases", hidden: false },
        { id: "t3", description: "Correctly nets two successive decreases", hidden: true },
      ],
      hints: [
        "Resist the urge to just add p1 + p2 -- that ignores the compounding effect between the two changes.",
        "The correction term is (p1 * p2) / 100 -- add this to the simple sum p1 + p2.",
        "You can double check your formula against multiplying factors directly: (1 + p1/100) * (1 + p2/100) - 1, then convert back to a percentage.",
      ],
    },
    commonMistakes: [
      "Adding successive percentage changes directly (treating +20% then -10% as a net +10%) instead of using multiplying factors, which gives the correct +8%.",
      "Confusing a 'percentage point' change with a 'percent' change — moving from 40% to 44% is a 4 percentage-point change, which happens to also be a 10% relative increase, but these describe different things.",
      "Using the wrong base (original) value when computing a percentage increase or decrease, especially after the value has already changed once in a multi-step problem.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the fraction 3/8 expressed as a percentage?",
        choices: ["37.5%", "38%", "3.8%", "42.5%"],
        correctIndex: 0,
        explanation: "3/8 = 0.375 as a decimal, and multiplying by 100 gives 37.5%.",
      },
      {
        id: "q2",
        prompt:
          "A quantity increases by 25% and is then decreased by 20%. What is the net percentage change overall?",
        choices: ["0% (no net change)", "5% increase", "5% decrease", "45% increase"],
        correctIndex: 0,
        explanation:
          "Using net% = 25 + (-20) + (25 x -20)/100 = 25 - 20 - 5 = 0. The 25% increase and 20% decrease exactly cancel here, since 1.25 x 0.80 = 1.00 precisely.",
      },
      {
        id: "q3",
        prompt:
          "A retailer sets the selling price of an item by marking up the cost price by 40%. What percentage of the selling price does the cost price represent?",
        choices: ["71.43%", "60%", "40%", "28.57%"],
        correctIndex: 0,
        explanation:
          "If CP x 1.40 = SP, then CP/SP = 1/1.40, which works out to approximately 71.43%. It's a different (and smaller) number than the 40% markup because the base of the ratio has switched from CP to SP.",
      },
    ],
    takeaway:
      "Percentages are fractions of 100 in disguise, and successive percentage changes must be multiplied together as factors, never simply added.",
    summary:
      "A percentage converts freely between fraction, decimal, and percent form by scaling with 100. Applying a percentage change means multiplying by (1 + percent/100), and combining two successive changes requires multiplying their factors together (or the equivalent net% = p1 + p2 + p1*p2/100 formula), not adding the raw percentages.",
    nextLessonSlug: "profit-loss-discount",
  },
  {
    id: "qa-profit-loss-discount",
    slug: "profit-loss-discount",
    title: "Profit, Loss, and Discount",
    description:
      "Computing profit and loss percentages from cost and selling price, and working out selling prices after single or successive discounts.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["qa-percentages"],
    objectives: [
      "Compute profit percentage or loss percentage given cost price and selling price",
      "Compute the selling price given a marked price and one or more successive discounts",
      "Explain why successive discounts don't add up to their simple sum",
    ],
    skills: ["quantitative-aptitude", "profit-loss-discount"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["cost price", "selling price", "marked price", "profit percent", "discount"],
    explanation: `Three prices matter in every buying-and-selling problem: **cost price (CP)**, what the seller paid to acquire the item; **selling price (SP)**, what the buyer actually pays; and **marked price (MP)**, the "sticker" price before any discount is applied. A **profit** happens when SP > CP, a **loss** when SP < CP, and a **discount** is the gap between MP and SP.

**Profit and loss percentages are always calculated on the cost price**, never on the selling price — this is the single most important rule in this lesson, because it's the opposite of how discount percentage is calculated (that one uses marked price as the base). The formulas:

- **Profit% = ((SP − CP) / CP) × 100**, when SP > CP.
- **Loss% = ((CP − SP) / CP) × 100**, when CP > SP.

**Worked example.** A trader buys a fan for ₹1200 and sells it for ₹1500. Profit = 1500 − 1200 = ₹300. Profit% = (300 / 1200) × 100 = 25%. Notice the denominator is 1200 (the cost price), not 1500.

**Discount percentage, by contrast, is calculated on the marked price**: Discount% = ((MP − SP) / MP) × 100. If a shirt marked at ₹800 sells for ₹680 after a discount, the discount is (800 − 680)/800 × 100 = 15%.

**Successive discounts** behave exactly like successive percentage changes from the previous lesson: they multiply, they don't add. A shirt marked at ₹800 given a 20% discount and then a further 10% discount off the already-discounted price is *not* a flat 30% off. The actual selling price is 800 × 0.80 × 0.90 = ₹576, which is a combined discount of (800 − 576)/800 × 100 = 28%, one percentage point less than the naive 30% sum. This gap grows as either discount grows, so a shopper mentally adding "20% + 10% = 30% off" will always slightly overestimate their savings on successive discounts (equivalently, underestimate the final price).

The general pattern for n successive discounts d₁, d₂, …, dₙ applied to a marked price MP:

**SP = MP × (1 − d₁/100) × (1 − d₂/100) × … × (1 − dₙ/100)**

Whenever a problem gives you a marked price with more than one discount applied in sequence, apply each discount's multiplying factor one at a time to the *running* price, not the original marked price twice over — each discount is a percentage of whatever price it's currently being subtracted from.`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "Successive discounts multiply as factors against the running price, not the original marked price.",
      code: `function sellingPriceAfterDiscounts(markedPrice, discounts) {
  const sp = discounts.reduce((price, d) => price * (1 - d / 100), markedPrice);
  return Math.round(sp * 100) / 100;
}
// Example: sellingPriceAfterDiscounts(1000, [10, 5]) -> 855`,
    },
    guidedExercise: {
      id: "qa-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write profitPercent(costPrice, sellingPrice) that returns the profit percentage as a positive number if sellingPrice > costPrice, or the loss percentage as a negative number if sellingPrice < costPrice, always calculated as a percentage of costPrice, rounded to 2 decimal places.",
      starterCode: `function profitPercent(costPrice, sellingPrice) {
  // TODO: return profit% (positive) or loss% (negative), based on cost price, rounded to 2 decimal places
}
`,
      solutionCode: `function profitPercent(costPrice, sellingPrice) {
  const percent = ((sellingPrice - costPrice) / costPrice) * 100;
  return Math.round(percent * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', profitPercent(200, 250) === 25, 'selling for 250 what cost 200 is a 25% profit'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', profitPercent(500, 400) === -20, 'selling for 400 what cost 500 is a 20% loss, shown as -20'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', profitPercent(300, 300) === 0, 'selling at exactly cost price is 0% profit or loss'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Correctly computes a profit percentage", hidden: false },
        {
          id: "t2",
          description: "Correctly computes a loss percentage as negative",
          hidden: false,
        },
        { id: "t3", description: "Handles selling at exactly cost price", hidden: true },
      ],
      hints: [
        "Both profit% and loss% share one formula if you don't force the sign: ((sellingPrice - costPrice) / costPrice) * 100.",
        "That formula is naturally negative when sellingPrice < costPrice -- you don't need a separate loss branch.",
        "Remember the denominator is always costPrice, never sellingPrice.",
      ],
    },
    independentExercise: {
      id: "qa-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write finalSellingPrice(markedPrice, discounts) where discounts is an array of successive percentage discounts (possibly empty) applied one after another to the running price. Return the final selling price rounded to 2 decimal places.",
      starterCode: `function finalSellingPrice(markedPrice, discounts) {
  // TODO: apply each discount in sequence to the running price, rounded to 2 decimal places
}
`,
      solutionCode: `function finalSellingPrice(markedPrice, discounts) {
  const sp = discounts.reduce((price, d) => price * (1 - d / 100), markedPrice);
  return Math.round(sp * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', finalSellingPrice(1000, [10, 5]) === 855, 'a 10% then 5% successive discount on 1000 gives 855'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', finalSellingPrice(2000, [25]) === 1500, 'a single 25% discount on 2000 gives 1500'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', finalSellingPrice(500, []) === 500, 'no discounts at all leaves the marked price unchanged'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Applies two successive discounts correctly", hidden: false },
        { id: "t2", description: "Applies a single discount correctly", hidden: false },
        { id: "t3", description: "Handles an empty discounts array", hidden: true },
      ],
      hints: [
        "Array.prototype.reduce lets you apply each discount to a running price, carrying the result into the next step.",
        "Each discount's multiplying factor is (1 - discount/100), applied to whatever the price currently is, not the original marked price.",
        "With reduce and an initial value of markedPrice, an empty discounts array will correctly just return markedPrice unchanged.",
      ],
    },
    commonMistakes: [
      "Calculating profit or loss percentage using selling price as the denominator instead of cost price.",
      "Adding successive discount percentages together (assuming 20% then 10% off equals a flat 30% off) instead of multiplying the discount factors.",
      "Assuming the marked price and cost price are the same number when a problem only states one of them explicitly.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "A shopkeeper buys a fan for ₹1200 and sells it for ₹1500. What is the profit percentage?",
        choices: ["25%", "20%", "15%", "30%"],
        correctIndex: 0,
        explanation:
          "Profit = 1500 - 1200 = 300. Profit% = (300/1200) x 100 = 25%, using cost price as the base.",
      },
      {
        id: "q2",
        prompt:
          "A shirt marked at ₹800 receives two successive discounts of 20% and then 10%. Is the total discount equal to 30% of the marked price?",
        choices: [
          "No, the effective discount works out to 28%, less than the sum of 30%",
          "Yes, successive percentage discounts always add directly",
          "No, the effective discount works out to 32%, more than the sum",
          "Yes, but only because both discounts are round numbers",
        ],
        correctIndex: 0,
        explanation:
          "The final price is 800 x 0.80 x 0.90 = 576, a combined discount of (800-576)/800 x 100 = 28%, one percentage point less than simply adding 20% + 10%.",
      },
      {
        id: "q3",
        prompt:
          "An item's marked price is ₹1500, and after a single discount it sells for ₹1200. What discount percentage was applied?",
        choices: ["20%", "25%", "15%", "10%"],
        correctIndex: 0,
        explanation:
          "Discount% = ((MP - SP)/MP) x 100 = ((1500-1200)/1500) x 100 = 20%, using marked price as the base.",
      },
    ],
    takeaway:
      "Profit and loss percentages are always taken on cost price, discount percentages are always taken on marked price, and successive discounts multiply rather than add.",
    summary:
      "Cost price, selling price, and marked price play distinct roles: profit/loss percentages use cost price as the base, discount percentages use marked price as the base, and multiple successive discounts must be applied as multiplying factors to the running price rather than summed.",
    nextLessonSlug: "simple-compound-interest",
  },
  {
    id: "qa-simple-compound-interest",
    slug: "simple-compound-interest",
    title: "Simple and Compound Interest",
    description:
      "Calculating simple interest and compound interest under different compounding frequencies, and understanding why compound interest grows faster.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["qa-profit-loss-discount"],
    objectives: [
      "Compute simple interest given principal, rate, and time",
      "Compute compound interest given principal, rate, time, and compounding frequency",
      "Explain why compound interest exceeds simple interest over the same period and rate",
    ],
    skills: ["quantitative-aptitude", "simple-compound-interest"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: [
      "simple interest",
      "compound interest",
      "principal",
      "rate",
      "compounding frequency",
    ],
    explanation: `**Simple interest (SI)** is calculated only on the original principal, every period, for the entire duration: **SI = (P × R × T) / 100**, where P is principal, R is the annual rate as a percentage, and T is time in years. It grows in a straight line — the same amount of interest is earned every year.

**Compound interest (CI)**, by contrast, is calculated on the principal *plus all interest already earned* — interest earns interest. The total amount after T years, compounded annually, is **A = P × (1 + R/100)^T**, and CI = A − P.

**Worked example.** Take P = ₹10,000, R = 10% per annum, T = 2 years. SI = (10000 × 10 × 2)/100 = ₹2,000. For CI: A = 10000 × (1.10)² = 10000 × 1.21 = ₹12,100, so CI = ₹2,100. CI exceeds SI by exactly ₹100 here — and that ₹100 is precisely the *interest earned on the first year's interest*: year one's interest of ₹1,000 itself earns 10% in year two, contributing 1000 × 0.10 = ₹100 extra. That's the entire intuition behind why CI grows faster: **every period, the "principal" being paid interest on grows**, while under SI it never does.

**General compounding periods.** Interest doesn't have to compound once a year — banks often compound semi-annually, quarterly, or monthly. If interest compounds n times per year for t years at annual rate R%, the amount is:

**A = P × (1 + R/(100n))^(n×t)**

Each compounding period earns R/n percent (a fraction of the annual rate), but there are n×t total periods instead of just t. Compounding more frequently at the same *annual* rate always produces a slightly larger final amount, because interest starts earning interest sooner.

**Worked example (general compounding).** ₹10,000 at 10% annual rate, compounded semi-annually (n = 2), for 1 year: each half-year earns 10/2 = 5%, over 2 periods. A = 10000 × (1.05)² = 10000 × 1.1025 = ₹11,025, giving CI = ₹1,025 — slightly more than the ₹1,000 you'd get from a single annual compounding over the same 1 year (10000 × 1.10 − 10000 = ₹1,000).

**Comparing SI and CI over time:** for year 1, SI and CI are identical, because there's no prior interest yet to compound. From year 2 onward, CI pulls ahead, and the gap widens every additional year — this is why "compounding" is treated as a powerful long-term force in savings and loans alike: the *rate* of divergence between CI and SI itself accelerates over time, it isn't constant.`,
    visual: {
      kind: "table",
      title: "SI vs CI growth on ₹10,000 at 10% per annum",
      description:
        "Year 1: SI amount 11,000, CI amount 11,000 (identical, since no interest has compounded yet). Year 2: SI amount 12,000, CI amount 12,100. Year 3: SI amount 13,000, CI amount 13,310. The gap between CI and SI widens every year because CI compounds on a growing base.",
    },
    example: {
      language: "javascript",
      editable: false,
      description:
        "Annual compound interest, computed as the amount after T years minus the original principal.",
      code: `function compoundInterest(principal, ratePercent, years) {
  const amount = principal * Math.pow(1 + ratePercent / 100, years);
  return Math.round((amount - principal) * 100) / 100;
}
// Example: compoundInterest(10000, 10, 2) -> 2100`,
    },
    guidedExercise: {
      id: "qa-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write simpleInterest(principal, ratePercent, years) that returns the simple interest earned, rounded to 2 decimal places, using SI = (principal * ratePercent * years) / 100.",
      starterCode: `function simpleInterest(principal, ratePercent, years) {
  // TODO: compute and return simple interest, rounded to 2 decimal places
}
`,
      solutionCode: `function simpleInterest(principal, ratePercent, years) {
  const si = (principal * ratePercent * years) / 100;
  return Math.round(si * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', simpleInterest(10000, 10, 2) === 2000, 'SI on 10000 at 10% for 2 years is 2000'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', simpleInterest(5000, 8, 3) === 1200, 'SI on 5000 at 8% for 3 years is 1200'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', simpleInterest(1000, 0, 5) === 0, 'a 0% rate always earns 0 interest, regardless of time'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Computes simple interest for typical values", hidden: false },
        {
          id: "t2",
          description: "Computes simple interest for a different rate and time",
          hidden: false,
        },
        { id: "t3", description: "Handles a 0% interest rate", hidden: true },
      ],
      hints: [
        "The simple interest formula is entirely captured by (principal * ratePercent * years) / 100 -- no loop or exponent needed.",
        "Simple interest is the same for every year, unlike compound interest.",
        "Round only the final result to 2 decimal places.",
      ],
    },
    independentExercise: {
      id: "qa-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write compoundInterestGeneral(principal, ratePercent, years, timesCompoundedPerYear) that returns the compound interest earned, rounded to 2 decimal places, using A = principal * (1 + ratePercent / (100 * timesCompoundedPerYear)) ^ (timesCompoundedPerYear * years), then CI = A - principal.",
      starterCode: `function compoundInterestGeneral(principal, ratePercent, years, timesCompoundedPerYear) {
  // TODO: compute compound interest for the given compounding frequency, rounded to 2 decimal places
}
`,
      solutionCode: `function compoundInterestGeneral(principal, ratePercent, years, timesCompoundedPerYear) {
  const amount =
    principal *
    Math.pow(1 + ratePercent / (100 * timesCompoundedPerYear), timesCompoundedPerYear * years);
  return Math.round((amount - principal) * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', compoundInterestGeneral(10000, 10, 2, 1) === 2100, 'annual compounding on 10000 at 10% for 2 years gives CI 2100'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', compoundInterestGeneral(10000, 10, 1, 2) === 1025, 'semi-annual compounding on 10000 at 10% for 1 year gives CI 1025'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', compoundInterestGeneral(1000, 5, 0, 1) === 0, 'zero years means no interest has accrued yet'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Matches annual compounding for a typical case", hidden: false },
        {
          id: "t2",
          description: "Correctly handles more frequent (semi-annual) compounding",
          hidden: false,
        },
        { id: "t3", description: "Handles a time period of 0 years", hidden: true },
      ],
      hints: [
        "The per-period rate is ratePercent / timesCompoundedPerYear, divided by 100 to become a decimal factor.",
        "The total number of compounding periods is timesCompoundedPerYear * years, which is the exponent.",
        "Math.pow(base, exponent) raises base to that exponent -- use it for the (1 + rate) ^ periods part.",
        "CI is always the final amount minus the original principal, exactly like the annual-only example.",
      ],
    },
    commonMistakes: [
      "Using the simple interest formula on a multi-year compound interest problem, which underestimates the true amount because it ignores interest-on-interest.",
      "Forgetting to divide the annual rate by the number of compounding periods per year (and to multiply years by that same number of periods) when compounding is not annual.",
      "Reporting the total amount A as the answer when the question asks specifically for the interest earned, which is A minus the original principal.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Why does compound interest eventually overtake simple interest at the same principal, rate, and time, once more than one period has passed?",
        choices: [
          "Compound interest uses a higher rate automatically",
          "Compound interest is calculated on a growing base each period, since earlier interest itself starts earning interest",
          "Simple interest is only used for loans, not savings",
          "There is no real difference between them over any period",
        ],
        correctIndex: 1,
        explanation:
          "Simple interest is always computed on the fixed original principal, while compound interest is computed on principal plus all interest accrued so far, so the base it's calculated on keeps growing.",
      },
      {
        id: "q2",
        prompt: "What is the simple interest on ₹8,000 at 12% per annum for 2.5 years?",
        choices: ["₹2,400", "₹2,000", "₹2,880", "₹1,920"],
        correctIndex: 0,
        explanation: "SI = (8000 x 12 x 2.5) / 100 = 2400.",
      },
      {
        id: "q3",
        prompt:
          "What is the difference between the compound interest and simple interest earned on ₹5,000 at 10% per annum over 2 years, with annual compounding?",
        choices: ["₹50", "₹100", "₹150", "₹25"],
        correctIndex: 0,
        explanation:
          "SI = 5000 x 10 x 2 / 100 = 1000. CI = 5000 x (1.10^2 - 1) = 5000 x 0.21 = 1050. The difference, 1050 - 1000 = 50, equals principal x (rate/100)^2 for exactly a 2-year period.",
      },
    ],
    takeaway:
      "Compound interest grows faster than simple interest purely because each period's interest is calculated on a base that includes all previously earned interest.",
    summary:
      "Simple interest grows linearly from a fixed principal (SI = PRT/100), while compound interest grows on an expanding base that includes previously earned interest (A = P(1+R/100)^T for annual compounding, or A = P(1+R/(100n))^(nt) for n compounding periods per year). The CI-SI gap starts at zero and widens every additional period.",
    nextLessonSlug: "ratio-proportion-mixtures",
  },
  {
    id: "qa-ratio-proportion-mixtures",
    slug: "ratio-proportion-mixtures",
    title: "Ratio, Proportion, and Mixtures",
    description:
      "Simplifying ratios, telling direct proportion apart from inverse proportion, and using alligation to work out mixing ratios.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["qa-simple-compound-interest"],
    objectives: [
      "Simplify a ratio of two quantities to its lowest terms",
      "Distinguish a direct-proportion relationship from an inverse-proportion relationship in a word problem",
      "Apply the alligation method to find the ratio in which two quantities should be mixed to reach a target average rate",
    ],
    skills: ["quantitative-aptitude", "ratio-proportion-mixtures"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: [
      "ratio",
      "proportion",
      "direct proportion",
      "inverse proportion",
      "alligation",
      "mixtures",
    ],
    explanation: `A **ratio** compares two quantities of the same kind by division rather than subtraction. The ratio 18:24 simplifies by dividing both sides by their HCF (from an earlier lesson): HCF(18, 24) = 6, so 18:24 simplifies to 3:4. A ratio is only meaningful in its simplest form when you're comparing it against another ratio or reading off a "parts" breakdown.

**Direct proportion** means two quantities increase or decrease together, at a fixed rate: double one, and the other doubles too (think: cost of apples is directly proportional to the number of apples bought). **Inverse proportion** means one quantity increases exactly as fast as the other decreases, so their *product* stays fixed (think: if a fixed amount of work needs doing, more workers means proportionally fewer days needed — workers × days = constant work). Mixing these up is a frequent test mistake: more workers doesn't take *more* time, it takes *less*, because "number of workers" and "days needed" are inversely, not directly, proportional.

**Worked example (inverse proportion).** If 6 workers can build a wall in 10 days, how long would 15 workers take, assuming the same total work and everyone works at the same steady rate? Total work = 6 × 10 = 60 "worker-days." With 15 workers: 60 ÷ 15 = 4 days. More workers, fewer days — an inverse relationship.

**Alligation** is a shortcut for mixture problems: when you blend a "cheap" quantity (rate c) and a "dear" (more expensive) quantity (rate d) to reach some target mean rate m, the ratio in which they must be mixed is:

**cheap parts : dear parts = (d − m) : (m − c)**

**Worked example.** A trader mixes milk worth ₹40/L with milk worth ₹60/L to produce a mixture worth ₹52/L. Using alligation: cheap parts = 60 − 52 = 8, dear parts = 52 − 40 = 12. Ratio 8:12 simplifies (divide by their HCF, 4) to **2:3** — for every 2 parts of the ₹40/L milk, use 3 parts of the ₹60/L milt. Sanity check: (2×40 + 3×60)/5 = (80+180)/5 = 260/5 = ₹52/L exactly, matching the target.

The alligation formula makes intuitive sense once you see why it works: the mean rate m must sit *between* c and d, and the ratio is inversely related to each price's "distance" from the mean — the closer a price is to the target mean, the *more* of it you need, because it contributes less "pull" away from the mean per unit. That's precisely why the cheap quantity's ratio number comes from (d − m) — the dearer price's distance — and not the other way around.`,
    visual: {
      kind: "diagram",
      title: "Alligation cross-diagram",
      description:
        "Cheap rate (c) and dear rate (d) are written at the two ends of a cross, with the mean rate (m) at the center. The cheap quantity's ratio number is (d - m); the dear quantity's ratio number is (m - c) -- read diagonally across the cross from the opposite price.",
    },
    example: {
      language: "javascript",
      editable: false,
      description:
        "Alligation finds the mixing ratio of a cheaper and a dearer quantity to reach a target mean rate.",
      code: `function hcfPair(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}
function alligationRatio(cheapRate, dearRate, meanRate) {
  const cheapParts = dearRate - meanRate;
  const dearParts = meanRate - cheapRate;
  const divisor = hcfPair(cheapParts, dearParts);
  return [cheapParts / divisor, dearParts / divisor];
}
// Example: alligationRatio(40, 60, 52) -> [2, 3]`,
    },
    guidedExercise: {
      id: "qa-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write simplifyRatio(a, b) that returns a two-element array [a divided by their HCF, b divided by their HCF] -- the ratio a:b reduced to its lowest terms. Assume a and b are non-negative integers, not both zero.",
      starterCode: `function simplifyRatio(a, b) {
  // TODO: reduce the ratio a:b to lowest terms using their HCF
}
`,
      solutionCode: `function simplifyRatio(a, b) {
  function hcfPair(x, y) {
    while (y !== 0) {
      [x, y] = [y, x % y];
    }
    return x;
  }
  const divisor = hcfPair(a, b);
  return [a / divisor, b / divisor];
}`,
      harness: `
        try { const r = simplifyRatio(18, 24); window.__report('t1', r[0] === 3 && r[1] === 4, '18:24 should simplify to 3:4'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = simplifyRatio(15, 45); window.__report('t2', r[0] === 1 && r[1] === 3, '15:45 should simplify to 1:3'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = simplifyRatio(7, 13); window.__report('t3', r[0] === 7 && r[1] === 13, 'two coprime numbers cannot simplify further'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Simplifies a ratio with a common factor of 6", hidden: false },
        { id: "t2", description: "Simplifies a ratio with a common factor of 15", hidden: false },
        {
          id: "t3",
          description: "Leaves an already-simplest (coprime) ratio unchanged",
          hidden: true,
        },
      ],
      hints: [
        "Reuse the Euclidean algorithm idea from the LCM/HCF lesson to find the HCF of a and b.",
        "Once you have the HCF, divide both a and b by it and return them as a two-element array.",
        "If a and b share no common factor other than 1 (they're coprime), the ratio should come back unchanged.",
      ],
    },
    independentExercise: {
      id: "qa-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write alligationRatio(cheapRate, dearRate, meanRate) that returns the simplified [cheapParts, dearParts] mixing ratio using cheapParts = dearRate - meanRate, dearParts = meanRate - cheapRate, then reduced to lowest terms by their HCF.",
      starterCode: `function alligationRatio(cheapRate, dearRate, meanRate) {
  // TODO: compute and simplify the alligation mixing ratio
}
`,
      solutionCode: `function alligationRatio(cheapRate, dearRate, meanRate) {
  function hcfPair(x, y) {
    while (y !== 0) {
      [x, y] = [y, x % y];
    }
    return x;
  }
  const cheapParts = dearRate - meanRate;
  const dearParts = meanRate - cheapRate;
  const divisor = hcfPair(cheapParts, dearParts);
  return [cheapParts / divisor, dearParts / divisor];
}`,
      harness: `
        try { const r = alligationRatio(40, 60, 52); window.__report('t1', r[0] === 2 && r[1] === 3, 'milk at 40 and 60 per liter mixed to 52 per liter should give a 2:3 ratio'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { const r = alligationRatio(20, 30, 25); window.__report('t2', r[0] === 1 && r[1] === 1, 'a mean exactly halfway between two rates gives a 1:1 ratio'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { const r = alligationRatio(50, 80, 50); window.__report('t3', r[0] === 1 && r[1] === 0, 'a mean rate equal to the cheap rate means none of the dearer quantity is needed'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Computes a typical alligation ratio", hidden: false },
        { id: "t2", description: "Handles a mean exactly between the two rates", hidden: false },
        {
          id: "t3",
          description: "Handles a mean equal to the cheap rate (edge case)",
          hidden: true,
        },
      ],
      hints: [
        "cheapParts comes from the dearer rate's distance from the mean, and dearParts comes from the cheaper rate's distance -- it's a criss-cross, not a direct subtraction.",
        "Reuse the HCF idea to reduce [cheapParts, dearParts] to lowest terms, exactly like simplifyRatio.",
        "If the mean rate equals the cheap rate exactly, dearParts becomes 0 -- HCF(x, 0) is x by convention, which still simplifies correctly to [1, 0].",
      ],
    },
    commonMistakes: [
      "Simplifying a ratio by subtracting the same amount from both sides instead of dividing both sides by their HCF, which does not preserve the ratio.",
      "Assuming a word problem is direct proportion by default, even when the underlying quantities (like workers and days for fixed total work) are actually inversely related.",
      "Mixing up the alligation cross and computing cheapParts as (meanRate - cheapRate) instead of (dearRate - meanRate) -- the subtraction is criss-crossed, not matched to the same quantity's own rate.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "The ratio 24:36 is expressed in its simplest form by dividing both terms by which number?",
        choices: [
          "12 (their HCF), giving 2:3",
          "6, giving 4:6",
          "2, giving 12:18",
          "36, giving less than 1:1",
        ],
        correctIndex: 0,
        explanation:
          "HCF(24, 36) = 12. Dividing both terms by 12 gives the simplest form, 2:3 -- dividing by any smaller common factor leaves it not fully reduced.",
      },
      {
        id: "q2",
        prompt:
          "A trader mixes rice costing ₹30/kg with rice costing ₹45/kg to produce a blend costing ₹35/kg. In what ratio should the two be mixed?",
        choices: ["2:1", "1:2", "3:2", "1:1"],
        correctIndex: 0,
        explanation:
          "cheapParts = 45 - 35 = 10, dearParts = 35 - 30 = 5. The ratio 10:5 simplifies to 2:1.",
      },
      {
        id: "q3",
        prompt:
          "6 workers can build a wall in 10 days. Assuming the number of workers and the days needed are inversely proportional, how many days will 15 workers take to build the same wall?",
        choices: ["4 days", "15 days", "25 days", "9 days"],
        correctIndex: 0,
        explanation:
          "Total work is 6 x 10 = 60 worker-days, a fixed quantity. With 15 workers, days needed = 60 / 15 = 4.",
      },
    ],
    takeaway:
      "Ratios simplify by dividing out the HCF, inverse proportion means one quantity's increase causes another's decrease at a fixed product, and alligation's criss-cross gives the mixing ratio for any target average rate.",
    summary:
      "A ratio reduces to lowest terms via HCF. Direct proportion keeps a ratio between two quantities fixed as both grow together; inverse proportion keeps their product fixed as one grows while the other shrinks. Alligation finds a mixing ratio from cheapParts = dearRate - meanRate and dearParts = meanRate - cheapRate, then simplified like any other ratio.",
    nextLessonSlug: "time-speed-distance",
  },
  {
    id: "qa-time-speed-distance",
    slug: "time-speed-distance",
    title: "Time, Speed, and Distance",
    description:
      "Converting speed units, combining speeds for objects moving toward or away from each other, and finding average speed on a round trip.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["qa-ratio-proportion-mixtures"],
    objectives: [
      "Convert speed between km/h and m/s",
      "Compute relative speed for two objects moving in the same direction or in opposite directions",
      "Compute the average speed for a round trip covering equal distances at two different speeds",
    ],
    skills: ["quantitative-aptitude", "time-speed-distance"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["speed", "distance", "time", "relative speed", "average speed", "unit conversion"],
    explanation: `The core relationship is **speed = distance / time**, which rearranges to distance = speed × time, or time = distance / speed depending on what a problem asks for. The one habit that prevents the most careless errors here is **keeping units consistent** before doing any arithmetic.

**Unit conversion.** Speed is usually given in km/h but distances or times in a problem sometimes use meters and seconds. Since 1 km = 1000 m and 1 hour = 3600 s, converting km/h to m/s means multiplying by 1000/3600, which simplifies to **5/18**. Converting back, m/s to km/h, multiplies by **18/5**. So 90 km/h = 90 × 5/18 = 25 m/s, and 25 m/s = 25 × 18/5 = 90 km/h — a quick sanity check both ways.

**Relative speed** describes how fast the gap between two moving objects changes:
- **Same direction:** relative speed = |speed₁ − speed₂| (the faster one only gains on the slower one at the *difference* between their speeds).
- **Opposite directions:** relative speed = speed₁ + speed₂ (they close the gap at the *combined* rate of both speeds).

**Worked example.** Two cyclists start from the same point, riding in opposite directions at 15 km/h and 20 km/h. After 3 hours, how far apart are they? Relative speed = 15 + 20 = 35 km/h (opposite directions add). Distance apart = 35 × 3 = 105 km.

**Average speed for a round trip.** A very common trap: if you travel a distance at speed s₁ and return the *same* distance at speed s₂, the average speed for the whole trip is **not** the simple average (s₁+s₂)/2. Because you spend *more time* traveling at the slower speed, that slower speed should — and does — pull the average down more than a straight average would suggest. The correct formula, when the two distances are equal, is the **harmonic mean**:

**Average speed = 2 × s₁ × s₂ / (s₁ + s₂)**

**Worked example.** A car travels from City A to City B at 60 km/h and returns at 40 km/h. Naive average: (60+40)/2 = 50 km/h — but that's wrong. Correct average speed = 2×60×40/(60+40) = 4800/100 = **48 km/h**, noticeably lower than 50, because the return leg at 40 km/h simply takes more time and therefore weighs more heavily in the overall average. The harmonic-mean formula only applies when the two distances covered are *equal* — if the problem instead gives equal *times* at each speed, the simple arithmetic average is correct instead.`,
    visual: {
      kind: "diagram",
      title: "Same-direction vs opposite-direction relative speed",
      description:
        "Same direction: two objects moving the same way close or open their gap at the difference of their speeds (subtract). Opposite directions: two objects moving toward or away from each other close or open their gap at the sum of their speeds (add).",
    },
    example: {
      language: "javascript",
      editable: false,
      description:
        "Converting km/h to m/s uses the factor 5/18 (equivalently, 1000 meters per 3600 seconds).",
      code: `function kmphToMps(speedKmph) {
  return Math.round(speedKmph * (5 / 18) * 100) / 100;
}
// Example: kmphToMps(90) -> 25`,
    },
    guidedExercise: {
      id: "qa-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write relativeSpeed(speed1, speed2, direction) where direction is either 'same' or 'opposite'. Return the relative speed: the absolute difference of the two speeds for 'same' direction, or their sum for 'opposite' directions.",
      starterCode: `function relativeSpeed(speed1, speed2, direction) {
  // TODO: return the relative speed based on direction ('same' or 'opposite')
}
`,
      solutionCode: `function relativeSpeed(speed1, speed2, direction) {
  if (direction === "same") return Math.abs(speed1 - speed2);
  if (direction === "opposite") return speed1 + speed2;
  return null;
}`,
      harness: `
        try { window.__report('t1', relativeSpeed(60, 40, 'same') === 20, 'same-direction relative speed is the difference'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', relativeSpeed(60, 40, 'opposite') === 100, 'opposite-direction relative speed is the sum'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', relativeSpeed(50, 50, 'same') === 0, 'two objects at equal speed in the same direction never separate'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Computes same-direction relative speed", hidden: false },
        { id: "t2", description: "Computes opposite-direction relative speed", hidden: false },
        { id: "t3", description: "Handles two equal speeds in the same direction", hidden: true },
      ],
      hints: [
        "For the same direction, only the gap between the two speeds matters -- use Math.abs so the order of the arguments doesn't matter.",
        "For opposite directions, both speeds contribute to closing (or opening) the gap, so they add.",
        "Two identical speeds moving the same direction never get closer or farther apart -- their relative speed is 0.",
      ],
    },
    independentExercise: {
      id: "qa-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write averageRoundTripSpeed(speed1, speed2) that returns the average speed, rounded to 2 decimal places, for a round trip covering equal distance at speed1 one way and speed2 the return way, using the harmonic mean formula 2 * speed1 * speed2 / (speed1 + speed2).",
      starterCode: `function averageRoundTripSpeed(speed1, speed2) {
  // TODO: return the harmonic-mean average speed, rounded to 2 decimal places
}
`,
      solutionCode: `function averageRoundTripSpeed(speed1, speed2) {
  const average = (2 * speed1 * speed2) / (speed1 + speed2);
  return Math.round(average * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', averageRoundTripSpeed(40, 60) === 48, 'the harmonic mean of 40 and 60 is 48, not the simple average of 50'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', averageRoundTripSpeed(50, 75) === 60, 'the harmonic mean of 50 and 75 is 60'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', averageRoundTripSpeed(30, 30) === 30, 'equal speeds both ways should average to that same speed'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Computes the harmonic mean for two different speeds",
          hidden: false,
        },
        {
          id: "t2",
          description: "Computes the harmonic mean for another pair of speeds",
          hidden: false,
        },
        {
          id: "t3",
          description: "Handles two equal speeds (should just return that speed)",
          hidden: true,
        },
      ],
      hints: [
        "Do NOT compute (speed1 + speed2) / 2 -- that's the simple average, which is only correct when the two legs take equal time, not equal distance.",
        "The harmonic mean formula is 2 * speed1 * speed2 / (speed1 + speed2).",
        "As a sanity check, if speed1 equals speed2, the formula should simplify to exactly that speed.",
      ],
    },
    commonMistakes: [
      "Mixing km/h and m/s in the same calculation without converting one of them first, using the 5/18 or 18/5 conversion factor.",
      "Assuming average speed for a round trip is the simple arithmetic mean of the two speeds, when distances (not times) are equal -- the correct average is the harmonic mean and is always somewhat lower.",
      "Adding two speeds for objects moving in the same direction instead of subtracting -- addition is only correct for objects moving toward or away from each other.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is 108 km/h converted to meters per second?",
        choices: ["30 m/s", "18 m/s", "25 m/s", "36 m/s"],
        correctIndex: 0,
        explanation: "108 x (5/18) = 30 m/s.",
      },
      {
        id: "q2",
        prompt:
          "Two cyclists start from the same point and ride in opposite directions at 15 km/h and 20 km/h. How far apart are they after 3 hours?",
        choices: ["105 km", "45 km", "15 km", "60 km"],
        correctIndex: 0,
        explanation:
          "Opposite-direction relative speed is 15 + 20 = 35 km/h. Distance apart after 3 hours = 35 x 3 = 105 km.",
      },
      {
        id: "q3",
        prompt:
          "A car travels from City A to City B at 60 km/h and returns the same distance at 40 km/h. Is the average speed for the whole round trip exactly 50 km/h?",
        choices: [
          "No, it's 48 km/h, because average speed over equal distances is the harmonic mean of the two speeds",
          "Yes, exactly 50 km/h",
          "No, it's 52 km/h",
          "No, it's 100 km/h",
        ],
        correctIndex: 0,
        explanation:
          "The correct average speed is 2 x 60 x 40 / (60+40) = 4800/100 = 48 km/h, lower than the naive 50 km/h average because more time is spent at the slower 40 km/h speed.",
      },
    ],
    takeaway:
      "Speed problems demand consistent units and the right combining rule -- subtract for same-direction relative speed, add for opposite directions, and use the harmonic mean for equal-distance average speed.",
    summary:
      "Speed equals distance divided by time, with km/h and m/s converted via the 5/18 factor. Relative speed subtracts for objects moving the same direction and adds for opposite directions. Average speed over a round trip of equal distances uses the harmonic mean, 2s1s2/(s1+s2), which is always less than the simple average of the two speeds.",
    nextLessonSlug: "time-and-work",
  },
  {
    id: "qa-time-and-work",
    slug: "time-and-work",
    title: "Time and Work",
    description:
      "Modeling work as a daily rate, combining multiple workers' rates, and applying the same idea to pipes filling and draining a tank.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["qa-time-speed-distance"],
    objectives: [
      "Express a worker's output as a fraction of the job completed per day",
      "Compute the time needed for multiple workers to complete a job together by combining their rates",
      "Solve a pipes-and-cisterns problem by treating an outlet as a negative rate",
    ],
    skills: ["quantitative-aptitude", "time-and-work"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["time and work", "work rate", "combined work", "pipes and cisterns"],
    explanation: `The single idea underlying every time-and-work problem: if a worker can finish a job alone in n days, they complete **1/n of the job per day** — that's their **work rate**. Everything else follows from combining rates, exactly the way you'd combine speeds.

**Combining workers.** When multiple people work together, their rates simply add, because in one day they collectively produce the sum of what each produces alone: combined rate = 1/d₁ + 1/d₂ + … Once you have the combined rate, the time to finish the whole job together is the reciprocal: **time = 1 / combined rate**.

**Worked example.** Worker A can finish a job alone in 10 days, worker B in 15 days. A's rate is 1/10 of the job per day, B's rate is 1/15. Combined rate = 1/10 + 1/15. Using a common denominator of 30: 3/30 + 2/30 = 5/30 = 1/6. So together they finish 1/6 of the job per day, meaning the whole job takes **6 days** — noticeably faster than either alone, but not simply the average of 10 and 15 (which would incorrectly suggest 12.5 days).

**Pipes and cisterns** are the same rate-combining idea, with one twist: an **inlet pipe** fills the tank (a positive rate, like a worker), while an **outlet pipe** or a **leak** empties it (a negative rate, subtracting from the combined rate). If a tank has both open at once, net rate = (sum of inlet rates) − (sum of outlet rates).

**Worked example.** A tap can fill a tank alone in 6 hours; a drain can empty a full tank alone in 8 hours. If both are open together, net rate = 1/6 − 1/8. Common denominator 24: 4/24 − 3/24 = 1/24. So the tank fills at a net rate of 1/24 per hour, taking **24 hours** to fill — much slower than the tap alone, because the drain is constantly working against it. If the outlet's rate were ever *larger* than the inlet's rate, the net rate would be zero or negative, and the tank would never fill at all (or would stay empty/draining forever) — a case worth checking for before trusting a "time to fill" answer.

The pattern to hold onto: **never average "days to finish alone" directly.** Always convert to rates (1/days), combine the rates (add for teammates and inlets, subtract for outlets/leaks), and only convert back to time — as a reciprocal — at the very last step.`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "Combined work rates add; the time to finish together is the reciprocal of the combined rate.",
      code: `function timeToFinish(daysList) {
  const combinedRate = daysList.reduce((sum, d) => sum + 1 / d, 0);
  return Math.round((1 / combinedRate) * 100) / 100;
}
// Example: timeToFinish([10, 15]) -> 6`,
    },
    guidedExercise: {
      id: "qa-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write combinedWorkDays(daysList) where daysList is an array of the number of days each worker would take to finish the job alone. Return the number of days for all of them working together to finish the job, rounded to 2 decimal places, by summing their rates (1/days each) and taking the reciprocal.",
      starterCode: `function combinedWorkDays(daysList) {
  // TODO: sum the individual rates (1/days) and return the reciprocal, rounded to 2 decimal places
}
`,
      solutionCode: `function combinedWorkDays(daysList) {
  const combinedRate = daysList.reduce((sum, d) => sum + 1 / d, 0);
  return Math.round((1 / combinedRate) * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', combinedWorkDays([10, 15]) === 6, 'workers taking 10 and 15 days alone finish together in 6 days'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', combinedWorkDays([4, 4, 4]) === 1.33, 'three equally-paced workers at 4 days each finish together in 4/3, rounded to 1.33 days'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', combinedWorkDays([5]) === 5, 'a single worker alone just takes their own number of days'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Combines two workers' rates correctly", hidden: false },
        {
          id: "t2",
          description: "Combines three workers' rates, with a non-integer result",
          hidden: false,
        },
        { id: "t3", description: "Handles a single-worker array", hidden: true },
      ],
      hints: [
        "Convert every entry in daysList to a rate (1 divided by that number of days) before combining anything.",
        "Array.prototype.reduce is a clean way to sum up 1/d for every d in the array.",
        "The combined time is the reciprocal of the combined rate: 1 / combinedRate.",
        "Round only the final time value, not the intermediate rate.",
      ],
    },
    independentExercise: {
      id: "qa-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write pipeFillTime(inletHours, outletHours) modeling a tank with one inlet pipe (fills it alone in inletHours) and one outlet pipe (empties it alone in outletHours), both open together. Return the hours to fill the tank, rounded to 2 decimal places, using net rate = 1/inletHours - 1/outletHours. If the net rate is zero or negative, return null (the tank never fills).",
      starterCode: `function pipeFillTime(inletHours, outletHours) {
  // TODO: compute the net fill rate and return time to fill, or null if it never fills
}
`,
      solutionCode: `function pipeFillTime(inletHours, outletHours) {
  const netRate = 1 / inletHours - 1 / outletHours;
  if (netRate <= 0) return null;
  return Math.round((1 / netRate) * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', pipeFillTime(6, 8) === 24, 'an inlet at 6 hours and outlet at 8 hours together fill the tank in 24 hours'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', pipeFillTime(3, 6) === 6, 'an inlet at 3 hours and outlet at 6 hours together fill the tank in 6 hours'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', pipeFillTime(4, 4) === null, 'an inlet and outlet at exactly equal rates cancel out and never fill the tank'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Computes fill time for a slower outlet than inlet",
          hidden: false,
        },
        {
          id: "t2",
          description: "Computes fill time for a different inlet/outlet pair",
          hidden: false,
        },
        {
          id: "t3",
          description: "Returns null when inlet and outlet rates exactly cancel",
          hidden: true,
        },
      ],
      hints: [
        "The outlet's rate should be subtracted from the inlet's rate, not added -- it works against filling the tank.",
        "Check the net rate against zero before inverting it, or you'll divide by zero or return a nonsensical negative time.",
        "If netRate is 0 or negative, the tank never fills (or is draining), so return null instead of a number.",
      ],
    },
    commonMistakes: [
      "Averaging the number of days each worker takes alone (like (10+15)/2) instead of combining their rates and taking the reciprocal of the sum.",
      "Adding an outlet or leak's rate instead of subtracting it, which overstates how fast the tank fills.",
      "Confusing 'days to finish the job alone' with 'fraction of the job completed per day' -- these are reciprocals of each other, not the same number.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "If a worker can complete a task alone in 8 days, what fraction of the task does she complete in one day?",
        choices: ["1/8", "8", "1/4", "2"],
        correctIndex: 0,
        explanation:
          "A worker who finishes a job alone in n days completes 1/n of it per day -- here, 1/8.",
      },
      {
        id: "q2",
        prompt:
          "Machine X can pack a batch of orders alone in 12 hours, and Machine Y can pack the same batch alone in 6 hours. Working together, how long will they take?",
        choices: ["4 hours", "9 hours", "18 hours", "3 hours"],
        correctIndex: 0,
        explanation:
          "Combined rate = 1/12 + 1/6 = 1/12 + 2/12 = 3/12 = 1/4 of the batch per hour, so together they finish in 4 hours.",
      },
      {
        id: "q3",
        prompt:
          "A tap can fill a tank alone in 5 hours, while a leak can empty the full tank alone in 20 hours. If both act together on an empty tank, how long does it take to fill?",
        choices: ["20/3 hours (about 6.67 hours)", "5 hours", "15 hours", "4 hours"],
        correctIndex: 0,
        explanation:
          "Net rate = 1/5 - 1/20 = 4/20 - 1/20 = 3/20 of the tank per hour. Time to fill = 20/3 hours, roughly 6.67 hours.",
      },
    ],
    takeaway:
      "Time-and-work problems always convert to rates (1/days) before combining anything, adding rates for teammates and inlets and subtracting for outlets, only converting back to time at the very end.",
    summary:
      "A worker's daily output is 1 divided by the days they'd take alone, and combined work is found by adding individual rates, then taking the reciprocal for the combined time. Pipes and cisterns follow the identical logic, with an outlet or leak's rate subtracted rather than added -- and if the net rate is zero or negative, the tank never actually fills.",
    nextLessonSlug: "averages",
  },
  {
    id: "qa-averages",
    slug: "averages",
    title: "Averages and Weighted Averages",
    description:
      "Computing simple averages, tracking how an average shifts when a value is added or removed, and computing weighted averages.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["qa-time-and-work"],
    objectives: [
      "Compute a simple average from a list of values, and the total from a known average and count",
      "Determine a group's new average after a value is added to it",
      "Compute a weighted average when different values carry different weights",
    ],
    skills: ["quantitative-aptitude", "averages"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["average", "mean", "weighted average", "arithmetic mean"],
    explanation: `A **simple average (arithmetic mean)** of a set of values is their total divided by how many values there are: average = sum / count. This also runs backward usefully — if you know the average and the count, the sum is just average × count. If a problem tells you "the average of 4 numbers is 18," you immediately know their total is 4 × 18 = 72, even without knowing any individual number.

**Effect of adding or removing a value.** A common question type gives you a group's current average and asks what happens when one more value joins (or one leaves). The trick is always to work through the *sum*, never try to average the averages directly:

**Worked example.** The average weight of 9 students is 45 kg. A tenth student weighing 55 kg joins the group. What's the new average? First recover the old total: 9 × 45 = 405 kg. Add the new student: 405 + 55 = 460 kg. Divide by the new count: 460 / 10 = **46 kg**. Notice the new average moved *up* from 45 toward 55 — because the joining student is heavier than the existing average, they pull the average up, but only by a fraction of the gap (not all the way to 55), since they're just one value among ten.

**Weighted averages** apply when different values don't contribute equally — some values represent bigger groups or matter more, and need to be weighted accordingly. The formula: **weighted average = (Σ value × weight) / (Σ weight)**, where Σ means "sum of."

**Worked example.** A class of 30 students averages 70 marks, and a second class of 20 students averages 80 marks. What's the combined average across both classes? It is **not** simply (70+80)/2 = 75, because the two classes have different sizes. Correctly weighting by class size: (30×70 + 20×80) / (30+20) = (2100 + 1600) / 50 = 3700/50 = **74**. That's closer to 70 than to 80, correctly reflecting that the larger, lower-scoring class of 30 pulls the combined average down more than the smaller class of 20 pulls it up.

A closely related, easy-to-miss weighted average shows up in **time-weighted average speed**: if you drive part of a trip at one speed for a certain *time* and the rest at another speed for a different *time*, the average speed for the whole trip is the total distance covered divided by the total time taken — which is mathematically a weighted average of the two speeds, weighted by time spent at each. (This is a different formula from the equal-*distance* harmonic-mean case from the time-speed-distance lesson — the correct approach depends on whether time or distance is what's held equal.)`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "A weighted average multiplies each value by its weight before dividing by the total weight.",
      code: `function weightedAverage(values, weights) {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const weightedSum = values.reduce((sum, v, i) => sum + v * weights[i], 0);
  return Math.round((weightedSum / totalWeight) * 100) / 100;
}
// Example: weightedAverage([70, 80], [30, 20]) -> 74`,
    },
    guidedExercise: {
      id: "qa-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write newAverageAfterAdding(oldAverage, oldCount, newValue) that returns the new average, rounded to 2 decimal places, after one additional value newValue is added to a group that previously had oldCount values averaging oldAverage.",
      starterCode: `function newAverageAfterAdding(oldAverage, oldCount, newValue) {
  // TODO: recover the old total, add newValue, and divide by the new count, rounded to 2 decimal places
}
`,
      solutionCode: `function newAverageAfterAdding(oldAverage, oldCount, newValue) {
  const oldSum = oldAverage * oldCount;
  const newSum = oldSum + newValue;
  return Math.round((newSum / (oldCount + 1)) * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', newAverageAfterAdding(20, 5, 32) === 22, 'adding 32 to a group of 5 averaging 20 gives a new average of 22'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', newAverageAfterAdding(0, 3, 12) === 3, 'adding 12 to a group of 3 averaging 0 gives a new average of 3'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', newAverageAfterAdding(50, 10, 50) === 50, 'adding a value equal to the current average never changes the average'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Computes the new average after adding a higher value",
          hidden: false,
        },
        {
          id: "t2",
          description: "Computes the new average starting from a zero average",
          hidden: false,
        },
        {
          id: "t3",
          description: "Handles adding a value exactly equal to the current average",
          hidden: true,
        },
      ],
      hints: [
        "You cannot average an average directly -- first recover the original total by multiplying oldAverage by oldCount.",
        "Add newValue to that recovered total to get the new total.",
        "Divide the new total by the new count, which is oldCount + 1.",
      ],
    },
    independentExercise: {
      id: "qa-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write weightedAverage(values, weights) where values and weights are same-length arrays. Return the weighted average, rounded to 2 decimal places, as (sum of value*weight for each pair) divided by (sum of weights).",
      starterCode: `function weightedAverage(values, weights) {
  // TODO: compute the weighted average, rounded to 2 decimal places
}
`,
      solutionCode: `function weightedAverage(values, weights) {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const weightedSum = values.reduce((sum, v, i) => sum + v * weights[i], 0);
  return Math.round((weightedSum / totalWeight) * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', weightedAverage([70, 80], [30, 20]) === 74, 'a class of 30 averaging 70 combined with a class of 20 averaging 80 gives 74'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', weightedAverage([90, 60, 75], [1, 1, 2]) === 75, 'weights of 1, 1, 2 on values 90, 60, 75 give a weighted average of 75'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', weightedAverage([100, 50], [1, 0]) === 100, 'a value with zero weight should not affect the average at all'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Computes a two-group weighted average", hidden: false },
        {
          id: "t2",
          description: "Computes a three-value weighted average with uneven weights",
          hidden: false,
        },
        { id: "t3", description: "Handles a value with zero weight", hidden: true },
      ],
      hints: [
        "Multiply each value by its corresponding weight before summing -- values.reduce with access to the matching index in weights works well here.",
        "Divide the weighted sum by the total of all weights, not by the count of values.",
        "A weight of 0 should make that value contribute nothing to either the numerator or denominator's effective influence, other than adding 0.",
      ],
    },
    commonMistakes: [
      "Averaging group averages directly (like (70+80)/2) instead of weighting by each group's size, which only gives the right answer when the groups happen to be equal size.",
      "Forgetting to recover the total (average x count) before adding or removing a value, and instead trying to adjust the average number directly.",
      "Treating 'average speed over time' and 'average speed over distance' as the same calculation -- they use different weighting and generally give different answers.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "The average of 4 numbers is 18. What is their total sum?",
        choices: ["72", "18", "22", "90"],
        correctIndex: 0,
        explanation: "Sum = average x count = 18 x 4 = 72.",
      },
      {
        id: "q2",
        prompt:
          "The average weight of 9 students is 45 kg. A tenth student weighing 55 kg joins the group. What is the new average weight?",
        choices: ["46 kg", "50 kg", "45.5 kg", "47 kg"],
        correctIndex: 0,
        explanation:
          "Old total = 9 x 45 = 405 kg. New total = 405 + 55 = 460 kg. New average = 460 / 10 = 46 kg.",
      },
      {
        id: "q3",
        prompt:
          "A driver spends 3 hours driving at 60 km/h and 2 hours driving at 90 km/h. What is the average speed for the entire trip?",
        choices: ["72 km/h", "75 km/h", "70 km/h", "80 km/h"],
        correctIndex: 0,
        explanation:
          "Total distance = 3x60 + 2x90 = 180+180 = 360 km. Total time = 5 hours. Average speed = 360/5 = 72 km/h -- a time-weighted average of the two speeds.",
      },
    ],
    takeaway:
      "Never average averages directly -- recover the underlying totals (or use explicit weights) first, then divide once at the end.",
    summary:
      "A simple average is sum divided by count, and this reverses cleanly to recover a sum from a known average and count. Adding or removing a value requires working through the total, not the average number itself. Weighted averages multiply each value by its own weight before dividing by total weight, which correctly reflects that not every value should count equally.",
    nextLessonSlug: "permutations-combinations-probability",
  },
  {
    id: "qa-permutations-combinations-probability",
    slug: "permutations-combinations-probability",
    title: "Permutations, Combinations, and Basic Probability",
    description:
      "Telling arrangement problems apart from selection problems, applying the nPr and nCr formulas, and computing basic probability.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["qa-averages"],
    objectives: [
      "Determine whether a counting problem requires a permutation (order matters) or a combination (order doesn't matter)",
      "Apply the nPr and nCr formulas to count arrangements or selections",
      "Compute basic probability as favorable outcomes divided by total outcomes",
    ],
    skills: ["quantitative-aptitude", "permutations-combinations-probability"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["permutation", "combination", "factorial", "probability", "npr", "ncr"],
    explanation: `**Factorial notation** (n!) means multiply every whole number from n down to 1: 5! = 5×4×3×2×1 = 120. By convention, 0! = 1 (there's exactly one way to arrange zero items — do nothing). Factorials show up everywhere in counting because they represent "the number of ways to arrange n distinct items in a row."

The single question that decides which formula to use: **does order matter?**

- If order matters (who's first, second, third — different orders count as different outcomes), it's a **permutation**: **nPr = n! / (n − r)!**, the number of ways to arrange r items chosen from n, in order.
- If order doesn't matter (just *which* items are chosen, not their sequence), it's a **combination**: **nCr = n! / (r! × (n − r)!)**, the number of ways to choose r items from n, ignoring order.

**Worked example (permutation).** From 5 finalists, how many ways can 1st, 2nd, and 3rd place be awarded? Order clearly matters here — being 1st is different from being 2nd. nPr = 5P3 = 5!/(5−3)! = 5×4×3 = 60.

**Worked example (combination).** From the same 5 finalists, how many ways can a 3-person committee be chosen (no distinct roles, just membership)? Order doesn't matter now — the committee {A, B, C} is the same committee no matter which order they were picked in. nCr = 5C3 = 5!/(3!×2!) = (5×4×3)/(3×2×1) = 60/6 = 10. Notice nCr is always nPr divided by r! — because for every unordered group of r items, there are r! different orderings of that same group, all of which nPr would have counted separately.

**Basic probability** measures how likely a specific outcome is: **P(event) = (number of favorable outcomes) / (total number of possible outcomes)**, assuming every outcome is equally likely. Rolling a standard fair six-sided die, P(rolling an even number) = 3 favorable outcomes (2, 4, 6) / 6 total outcomes = 1/2 = 0.5.

**Worked example (probability using combinations).** A bag contains 5 red and 3 blue marbles (8 total). Two marbles are drawn together at random. What's the probability both are red? Total ways to choose any 2 marbles from 8 is 8C2 = 28. Favorable ways to choose 2 red marbles from the 5 available is 5C2 = 10. So P(both red) = 10/28 ≈ 0.3571. This is a common pattern: whenever a probability problem involves choosing a *group* of items at once (not one at a time with replacement), combinations are usually how you count both the favorable and total outcomes.`,
    visual: {
      kind: "table",
      title: "Permutation vs combination at a glance",
      description:
        "Permutation (nPr): order matters, formula n!/(n-r)!, example -- assigning 1st/2nd/3rd place among finalists. Combination (nCr): order does not matter, formula n!/(r!(n-r)!), example -- choosing an unranked committee of members.",
    },
    example: {
      language: "javascript",
      editable: false,
      description:
        "This iterative form of nCr keeps every intermediate result an exact integer, avoiding rounding drift.",
      code: `function nCr(n, r) {
  let result = 1;
  for (let i = 0; i < r; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}
// Example: nCr(5, 3) -> 10`,
    },
    guidedExercise: {
      id: "qa-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write nPr(n, r) that returns the number of ways to arrange r items chosen from n distinct items, in order, using the formula n! / (n - r)! (computed as a product of r descending terms starting from n, to avoid computing large factorials directly).",
      starterCode: `function nPr(n, r) {
  // TODO: return the number of ordered arrangements of r items chosen from n
}
`,
      solutionCode: `function nPr(n, r) {
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= n - i;
  }
  return result;
}`,
      harness: `
        try { window.__report('t1', nPr(5, 3) === 60, '5P3 should be 5 x 4 x 3 = 60'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', nPr(4, 4) === 24, '4P4 should be 4! = 24'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', nPr(6, 0) === 1, 'arranging 0 items chosen from 6 has exactly 1 way -- do nothing'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Computes a typical permutation count", hidden: false },
        { id: "t2", description: "Computes a permutation where r equals n", hidden: false },
        { id: "t3", description: "Handles r = 0 as an edge case", hidden: true },
      ],
      hints: [
        "nPr multiplies r consecutive descending integers starting at n: n, n-1, n-2, ... down to n-r+1.",
        "A simple for loop from i = 0 to r - 1, multiplying by (n - i) each time, builds this product without ever computing a full factorial.",
        "When r is 0, the loop body never runs, and the starting result of 1 is correctly returned unchanged.",
      ],
    },
    independentExercise: {
      id: "qa-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write probabilityBothSameColor(redCount, blueCount, wantColor) modeling drawing 2 marbles together at random from a bag of redCount red and blueCount blue marbles. wantColor is either 'red' or 'blue'. Return the probability both drawn marbles are wantColor, rounded to 4 decimal places, using combinations: (ways to choose 2 of wantColor) / (ways to choose 2 from the total).",
      starterCode: `function probabilityBothSameColor(redCount, blueCount, wantColor) {
  // TODO: compute the probability using combinations of 2, rounded to 4 decimal places
}
`,
      solutionCode: `function probabilityBothSameColor(redCount, blueCount, wantColor) {
  function combinations2(n) {
    return (n * (n - 1)) / 2;
  }
  const total = redCount + blueCount;
  const wantCount = wantColor === "red" ? redCount : blueCount;
  const probability = combinations2(wantCount) / combinations2(total);
  return Math.round(probability * 10000) / 10000;
}`,
      harness: `
        try { window.__report('t1', probabilityBothSameColor(5, 3, 'red') === 0.3571, '5 red and 3 blue: probability both drawn are red is about 0.3571'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', probabilityBothSameColor(5, 3, 'blue') === 0.1071, '5 red and 3 blue: probability both drawn are blue is about 0.1071'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', probabilityBothSameColor(2, 0, 'red') === 1, 'if every marble is red, drawing 2 of them is certain'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Computes probability for the majority color", hidden: false },
        { id: "t2", description: "Computes probability for the minority color", hidden: false },
        { id: "t3", description: "Handles a bag with only one color present", hidden: true },
      ],
      hints: [
        "The number of ways to choose 2 items from n (order doesn't matter) is n * (n - 1) / 2 -- this is nCr with r fixed at 2.",
        "The favorable count uses only the marbles of wantColor; the total count uses every marble in the bag.",
        "Divide favorable combinations by total combinations, then round to 4 decimal places since the result is rarely a clean number.",
      ],
    },
    commonMistakes: [
      "Using the permutation formula (nPr) for a problem where order genuinely doesn't matter, such as choosing an unranked committee, which overcounts every group r! times.",
      "Treating 0! as 0 instead of 1, which breaks combination and permutation formulas whenever r equals n or r equals 0.",
      "Computing 'at least one' probability by directly counting favorable outcomes instead of using 1 minus the probability of the complementary ('none') event, which is usually far simpler.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "A class needs to choose 3 students from 8 to represent it at an event, with no distinct roles assigned to any of the three. Should this be counted using a permutation or a combination?",
        choices: [
          "A combination, since the order in which the 3 are chosen doesn't matter",
          "A permutation, since 8 students are involved",
          "Neither -- factorials don't apply to selecting groups",
          "A permutation, since exactly 3 students are chosen",
        ],
        correctIndex: 0,
        explanation:
          "Because no roles distinguish the 3 chosen students from one another, different orders of picking the same 3 students represent the same outcome -- that's the definition of a combination problem.",
      },
      {
        id: "q2",
        prompt:
          "In how many ways can 1st, 2nd, and 3rd prize be awarded to 3 different people chosen from a group of 6 entrants?",
        choices: ["120", "20", "216", "60"],
        correctIndex: 0,
        explanation:
          "Order matters here (1st is different from 2nd), so this is 6P3 = 6 x 5 x 4 = 120.",
      },
      {
        id: "q3",
        prompt:
          "A bag contains 4 green balls and 6 yellow balls. If one ball is drawn at random, what is the probability that it is green?",
        choices: ["2/5", "1/4", "3/10", "6/10"],
        correctIndex: 0,
        explanation: "There are 4 favorable outcomes out of 10 total, and 4/10 simplifies to 2/5.",
      },
    ],
    takeaway:
      "Whether order matters decides everything -- permutations count ordered arrangements, combinations count unordered selections, and basic probability is just favorable outcomes over total outcomes once you've counted correctly.",
    summary:
      "Factorial notation underlies both permutations (nPr = n!/(n-r)!, order matters) and combinations (nCr = n!/(r!(n-r)!), order doesn't matter), with nCr always equal to nPr divided by r! since each unordered group corresponds to r! orderings. Basic probability divides favorable outcomes by total outcomes, and combinations often provide the correct way to count both when a problem involves selecting a group at once.",
    nextLessonSlug: "data-interpretation",
  },
  {
    id: "qa-data-interpretation",
    slug: "data-interpretation",
    title: "Data Interpretation",
    description:
      "Reading structured data given as arrays of labeled values, computing percentages, ratios, and differences from it, and spotting misleading presentations.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["qa-permutations-combinations-probability"],
    objectives: [
      "Compute totals, averages, and percentage shares from a table of labeled values",
      "Identify the value with the largest share of a total from a labeled dataset",
      "Recognize at least two common ways data can be presented misleadingly",
    ],
    skills: ["quantitative-aptitude", "data-interpretation"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["data interpretation", "tables", "percentage share", "misleading charts"],
    explanation: `Data interpretation questions present numbers in a table or chart and ask you to compute something from them: a total, an average, a percentage change, a share, or a comparison. This lesson represents chart-like data the same way a spreadsheet or a simple bar chart would internally: as an array of objects, each with a **label** and a **value**, like [{ label: "Q1", value: 200 }, { label: "Q2", value: 250 }]. Reading data this way is exactly the same skill as reading it off an actual bar or line chart — you're just looking directly at the numbers a chart would otherwise draw as bar heights or line positions.

**Computing basics.** Total is the sum of every value; average is that total divided by the number of entries; a value's **percentage share** of the whole is (that value / total) × 100.

**Worked example.** Suppose quarterly revenue is Q1 = ₹200, Q2 = ₹250, Q3 = ₹300, Q4 = ₹250 (in some currency unit). Total = 200+250+300+250 = 1000. Average = 1000/4 = 250. Q3's share of the annual total = (300/1000) × 100 = 30%. Percentage growth from Q1 to Q2 = ((250−200)/200) × 100 = 25% — note this uses Q1 as the base, the *earlier* value, since "growth from X to Y" always measures relative to the starting point X.

**Spotting misleading presentations** matters just as much as the arithmetic, because real charts are sometimes constructed (deliberately or carelessly) to exaggerate or understate a difference:

- **Truncated (non-zero) axes.** If a bar chart's vertical axis starts at 90 instead of 0, a change from 92 to 94 units — a genuinely small 2.2% increase — can visually look like the bar nearly tripled in height, because the visible portion of the bars is being compared, not their true proportional heights from zero.
- **Percentage points vs. percent change.** If approval moves from 40% to 44%, that's correctly described as a **4 percentage-point increase**. It's *also* correctly describable as a **10% relative increase**, because 4 is 10% of the original 40 (4/40 = 0.10). Both phrasings can be simultaneously true — they're describing the same jump two different ways — but they are *not generally* the same number, and conflating them (assuming "percentage point" and "percent" are always interchangeable, or that they must always give the same figure) is a frequent source of confusion.
- **Wrong denominator for a share.** Computing a percentage share using a subgroup's total instead of the full dataset's grand total silently changes what the percentage actually means, even though the arithmetic itself is done correctly.

The reliable habit: before trusting any single number pulled from a chart or table, identify exactly what the *denominator* is (the whole that a percentage is a share of) and whether the axis or scale you're reading actually starts at zero.`,
    visual: {
      kind: "table",
      title: "Representing chart data as labeled values",
      description:
        "A bar chart showing quarterly revenue is represented here as an array of {label, value} pairs: Q1=200, Q2=250, Q3=300, Q4=250. Reading a percentage share or a percentage change from this array is the same computation as reading it from the chart's bar heights directly.",
    },
    example: {
      language: "javascript",
      editable: false,
      description:
        "Percentage growth between two labeled entries uses the earlier value as the base.",
      code: `function percentGrowth(data, fromLabel, toLabel) {
  const from = data.find((d) => d.label === fromLabel).value;
  const to = data.find((d) => d.label === toLabel).value;
  return Math.round(((to - from) / from) * 100 * 100) / 100;
}
// Example: percentGrowth([{ label: "Q1", value: 200 }, { label: "Q2", value: 250 }], "Q1", "Q2") -> 25`,
    },
    guidedExercise: {
      id: "qa-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write totalAndAverage(data) where data is an array of { label, value } objects. Return an object { total, average } where total is the sum of all values and average is that total divided by the number of entries, rounded to 2 decimal places.",
      starterCode: `function totalAndAverage(data) {
  // TODO: return { total, average } computed from data, with average rounded to 2 decimal places
}
`,
      solutionCode: `function totalAndAverage(data) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const average = Math.round((total / data.length) * 100) / 100;
  return { total, average };
}`,
      harness: `
        try {
          const r = totalAndAverage([{ label: 'A', value: 10 }, { label: 'B', value: 20 }, { label: 'C', value: 30 }]);
          window.__report('t1', r.total === 60 && r.average === 20, 'three entries of 10, 20, 30 should total 60 with average 20');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r = totalAndAverage([{ label: 'A', value: 5 }, { label: 'B', value: 8 }]);
          window.__report('t2', r.total === 13 && r.average === 6.5, 'two entries of 5 and 8 should total 13 with average 6.5');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const r = totalAndAverage([{ label: 'Solo', value: 42 }]);
          window.__report('t3', r.total === 42 && r.average === 42, 'a single entry should have its own value as both total and average');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Computes total and average for three entries", hidden: false },
        {
          id: "t2",
          description: "Computes total and average with a non-integer average",
          hidden: false,
        },
        { id: "t3", description: "Handles a single-entry array", hidden: true },
      ],
      hints: [
        "Array.prototype.reduce over data, adding up each entry's value field, gives the total.",
        "Divide the total by data.length to get the average, then round only the average.",
        "Return an object literal with exactly the keys total and average.",
      ],
    },
    independentExercise: {
      id: "qa-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write findLargestShare(data) where data is an array of { label, value } objects. Return an object { label, percent } identifying the entry with the largest value, where percent is that entry's percentage share of the total across all entries, rounded to 2 decimal places.",
      starterCode: `function findLargestShare(data) {
  // TODO: find the entry with the largest value and its percentage share of the total
}
`,
      solutionCode: `function findLargestShare(data) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const largest = data.reduce((max, d) => (d.value > max.value ? d : max), data[0]);
  const percent = Math.round((largest.value / total) * 100 * 100) / 100;
  return { label: largest.label, percent };
}`,
      harness: `
        try {
          const r = findLargestShare([{ label: 'North', value: 150 }, { label: 'South', value: 100 }, { label: 'East', value: 250 }]);
          window.__report('t1', r.label === 'East' && r.percent === 50, 'East has the largest value, 250 out of a total of 500, which is 50%');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r = findLargestShare([{ label: 'X', value: 30 }, { label: 'Y', value: 70 }]);
          window.__report('t2', r.label === 'Y' && r.percent === 70, 'Y has the largest value, 70 out of a total of 100, which is 70%');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const r = findLargestShare([{ label: 'Only', value: 20 }]);
          window.__report('t3', r.label === 'Only' && r.percent === 100, 'a single entry always represents 100% of the total');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Finds the largest of three entries and its share",
          hidden: false,
        },
        { id: "t2", description: "Finds the largest of two entries and its share", hidden: false },
        { id: "t3", description: "Handles a single-entry array (100% share)", hidden: true },
      ],
      hints: [
        "Compute the grand total first, exactly as in totalAndAverage.",
        "Use reduce to track the entry with the highest value seen so far, starting from the first entry.",
        "The percentage share always uses the grand total as its denominator, never a subgroup.",
      ],
    },
    commonMistakes: [
      "Reading a bar's apparent height directly off a chart whose axis doesn't start at zero, which exaggerates how large the difference between bars really is.",
      "Treating a 'percentage point' change and a 'percent' change as always numerically identical, when they generally describe different quantities that only happen to coincide in specific cases.",
      "Computing a percentage share using a subgroup's total as the denominator instead of the full dataset's grand total.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "A table shows a company's revenue: Year 1 = ₹40 lakh, Year 2 = ₹50 lakh. What is the percentage increase in revenue from Year 1 to Year 2?",
        choices: ["25%", "20%", "10%", "50%"],
        correctIndex: 0,
        explanation:
          "Percentage increase = ((50-40)/40) x 100 = 25%, using the earlier value (Year 1) as the base.",
      },
      {
        id: "q2",
        prompt:
          "A bar chart's vertical axis starts at 90 instead of 0, making a change from 92 units to 94 units appear to be a huge jump in bar height. What data-presentation issue does this illustrate?",
        choices: [
          "A truncated (non-zero-origin) axis exaggerating the visual size of a small difference",
          "The data itself is mathematically incorrect",
          "The chart is using a percentage scale instead of an absolute one",
          "The chart has too many data points to read clearly",
        ],
        correctIndex: 0,
        explanation:
          "Starting the axis well above zero makes small absolute differences occupy a large fraction of the visible bar height, visually exaggerating a genuinely small (about 2.2%) change.",
      },
      {
        id: "q3",
        prompt:
          "A survey shows an approval rating moved from 40% to 44%. Which description is correct?",
        choices: [
          "Both are correct: it's a 4 percentage-point increase, which also happens to equal a 10% relative increase here",
          "Only 'a 4 percentage-point increase' is ever a valid way to describe any change in percentages",
          "Only 'a 10% increase' is ever a valid way to describe any change in percentages",
          "The two phrases always describe exactly the same numerical change in every situation",
        ],
        correctIndex: 0,
        explanation:
          "The rating moved 4 percentage points (44-40), and separately, 4 is 10% of the original 40 (4/40 = 0.10), so both descriptions are accurate here -- but percentage points and percent change are generally different measurements that don't always coincide numerically like this.",
      },
    ],
    takeaway:
      "Before trusting any percentage or comparison pulled from a table or chart, check what the denominator actually is and whether the scale you're reading truly starts at zero.",
    summary:
      "Reading structured data as an array of labeled values makes totals, averages, and percentage shares straightforward to compute, always using the grand total as the denominator for a share. Misleading presentations commonly come from truncated axes that exaggerate visual differences, or from conflating percentage-point changes with percent changes, which are related but generally distinct measurements.",
    nextLessonSlug: "mixed-aptitude-practice",
  },
  {
    id: "qa-mixed-aptitude-practice",
    slug: "mixed-aptitude-practice",
    title: "Mixed Aptitude Problem Solving",
    description:
      "Combining techniques from earlier lessons into realistic multi-step problems, plus honest, general advice for practicing under time pressure.",
    trackSlug: "placement-prep",
    courseSlug: "quantitative-aptitude",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 25,
    prerequisites: ["qa-data-interpretation"],
    objectives: [
      "Solve a multi-step word problem that combines a discount calculation with compound interest",
      "Solve a multi-step word problem that combines time-and-work rates with a ratio-based split",
      "Apply general estimation, elimination, and time-budgeting strategies when practicing timed problem sets",
    ],
    skills: ["quantitative-aptitude", "mixed-aptitude-practice"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["mixed practice", "multi-step word problems", "exam strategy", "estimation"],
    explanation: `Real placement-test questions rarely test one technique in isolation — they string two or three together, and the biggest source of errors isn't any single calculation but **losing track of which result feeds into which next step**. This lesson is entirely about that skill: chaining earlier lessons' techniques correctly, in order.

**Worked example (discount → compound interest).** You buy furniture marked at ₹20,000. The store gives a 15% discount at checkout, and you pay the discounted price today by taking a loan at 10% annual compound interest for 2 years. How much do you owe at the end? Step one (discount lesson): selling price = 20,000 × (1 − 15/100) = 20,000 × 0.85 = ₹17,000. Step two (compound interest lesson): amount after 2 years = 17,000 × (1.10)² = 17,000 × 1.21 = **₹20,570**. The key discipline here: the *discounted* price, not the marked price, is what earns interest — using the wrong intermediate value is the single most common way multi-step problems go wrong.

**Worked example (time-and-work → ratio).** Worker A can finish a job alone in 10 days, worker B in 15 days. They work together and split a ₹500 payment in proportion to how much work each contributed. How much does each receive? Step one (time-and-work lesson): their rates are 1/10 and 1/15. Step two (ratio lesson): simplify the rate ratio — common denominator 30 gives 3/30 : 2/30, i.e. a **3:2** ratio. Step three: split ₹500 in a 3:2 ratio (5 total parts, ₹100 each): A gets 3×100 = ₹300, B gets 2×100 = ₹200. The insight worth keeping: **payment should be split by rate (work contributed), not by time taken** — the faster worker did proportionally more of the job and fairly earns proportionally more.

**On exam strategy.** This platform is self-paced practice — it does not proctor, time-limit, or certify any official assessment, and nothing here is a substitute for whatever specific format a real placement test or exam actually uses. That said, a few honest, general habits tend to help whenever you *do* practice under a self-imposed time limit:

- **Estimate before you calculate precisely.** A rough mental estimate (is the answer closer to 50 or 500?) instantly rules out wildly wrong multiple-choice options before you've done any real arithmetic.
- **Eliminate implausible choices first.** If a discount problem's answer choices include a number *larger* than the original price, that choice can't be right — cross it out immediately.
- **Budget your time and move on if stuck.** If you're well past what a question should reasonably take, mark it and continue — a skipped question costs you nothing you couldn't have lost by staring at it forever, and you can always come back, since this is untimed self-paced practice, not a proctored exam with a hard cutoff.

These are general, honest study habits — not claims about what any particular real exam allows or how it's graded.`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "Combining a discount with compound interest requires feeding the discounted price forward as the new principal.",
      code: `function loanRepaymentAfterDiscount(markedPrice, discountPercent, ratePercent, years) {
  const sellingPrice = markedPrice * (1 - discountPercent / 100);
  const amount = sellingPrice * Math.pow(1 + ratePercent / 100, years);
  return Math.round(amount * 100) / 100;
}
// Example: loanRepaymentAfterDiscount(20000, 15, 10, 2) -> 20570`,
    },
    guidedExercise: {
      id: "qa-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write discountThenCompoundAmount(markedPrice, discountPercent, ratePercent, years) that first applies a single percentage discount to markedPrice to get a selling price, then grows that selling price using annual compound interest at ratePercent for the given years. Return the final amount rounded to 2 decimal places.",
      starterCode: `function discountThenCompoundAmount(markedPrice, discountPercent, ratePercent, years) {
  // TODO: apply the discount first, then compound the discounted price, rounded to 2 decimal places
}
`,
      solutionCode: `function discountThenCompoundAmount(markedPrice, discountPercent, ratePercent, years) {
  const sellingPrice = markedPrice * (1 - discountPercent / 100);
  const amount = sellingPrice * Math.pow(1 + ratePercent / 100, years);
  return Math.round(amount * 100) / 100;
}`,
      harness: `
        try { window.__report('t1', discountThenCompoundAmount(20000, 15, 10, 2) === 20570, 'a 20000 item at 15% discount, then 10% CI for 2 years, ends at 20570'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', discountThenCompoundAmount(10000, 10, 5, 1) === 9450, 'a 10000 item at 10% discount, then 5% CI for 1 year, ends at 9450'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', discountThenCompoundAmount(5000, 0, 10, 1) === 5500, 'with no discount at all, the full marked price simply compounds'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Combines a discount with two years of compounding",
          hidden: false,
        },
        {
          id: "t2",
          description: "Combines a discount with one year of compounding",
          hidden: false,
        },
        { id: "t3", description: "Handles a discount of 0% (no discount applied)", hidden: true },
      ],
      hints: [
        "Solve this exactly like the worked example: first find the discounted selling price, exactly as in the profit/loss/discount lesson.",
        "Feed that discounted price -- not the original marked price -- into the compound interest formula as the principal.",
        "The compound interest formula here is the same annual one from the simple/compound interest lesson: principal * (1 + rate/100) ^ years.",
      ],
    },
    independentExercise: {
      id: "qa-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write shareOfPaymentByWorkRatio(daysList, totalPayment) where daysList gives the number of days each of several workers would take to finish a job alone. The workers complete the job together and split totalPayment in proportion to their individual work rates (1/days). Return an array of each worker's share, in the same order as daysList, each rounded to 2 decimal places.",
      starterCode: `function shareOfPaymentByWorkRatio(daysList, totalPayment) {
  // TODO: split totalPayment among workers in proportion to their work rates (1/days), rounded to 2 decimal places each
}
`,
      solutionCode: `function shareOfPaymentByWorkRatio(daysList, totalPayment) {
  const rates = daysList.map((d) => 1 / d);
  const totalRate = rates.reduce((a, b) => a + b, 0);
  return rates.map((r) => Math.round((r / totalRate) * totalPayment * 100) / 100);
}`,
      harness: `
        try {
          const r = shareOfPaymentByWorkRatio([10, 15], 500);
          window.__report('t1', r[0] === 300 && r[1] === 200, 'workers taking 10 and 15 days split 500 as 300 and 200, matching their 3:2 rate ratio');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r = shareOfPaymentByWorkRatio([4, 4], 600);
          window.__report('t2', r[0] === 300 && r[1] === 300, 'two equally-paced workers should split payment evenly');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const r = shareOfPaymentByWorkRatio([5], 200);
          window.__report('t3', r.length === 1 && r[0] === 200, 'a single worker receives the entire payment');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Splits payment between two workers with different rates",
          hidden: false,
        },
        {
          id: "t2",
          description: "Splits payment evenly between two equally-paced workers",
          hidden: false,
        },
        { id: "t3", description: "Handles a single-worker array", hidden: true },
      ],
      hints: [
        "First convert every entry in daysList to a rate (1/days), exactly like the time-and-work lesson.",
        "Each worker's share of the payment equals their own rate divided by the sum of all rates, multiplied by totalPayment -- this is the same idea as the alligation/ratio lessons applied to money instead of ingredients.",
        "Use Array.prototype.map twice: once to compute rates, once to compute each worker's rounded share from those rates.",
      ],
    },
    commonMistakes: [
      "Applying a later step's formula to the original starting value instead of the previous step's result (for example, compounding the marked price instead of the discounted price).",
      "Spending disproportionate time on one difficult multi-step question during timed practice instead of budgeting time and returning to it later.",
      "Mistaking self-paced practice on this platform for an official, proctored, or certifying assessment -- it isn't, and no score here should be treated as equivalent to a real exam result.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "A retailer buys a gadget for ₹4,000, marks it up by 25% to set the marked price, then offers a 10% discount at checkout. What is the retailer's actual profit percentage, based on the original cost price?",
        choices: ["12.5%", "15%", "10%", "25%"],
        correctIndex: 0,
        explanation:
          "Marked price = 4000 x 1.25 = 5000. Selling price after discount = 5000 x 0.90 = 4500. Profit = 4500 - 4000 = 500. Profit% on cost price = 500/4000 x 100 = 12.5%.",
      },
      {
        id: "q2",
        prompt:
          "When practicing timed problem sets on this platform and you get stuck on one question, which approach is most reasonable?",
        choices: [
          "Estimate a plausible range, eliminate clearly wrong choices, and move on if still stuck, since this is self-paced practice and you can always revisit the question",
          "Always guess completely at random immediately, without reading the question again",
          "Assume the platform is tracking and certifying your performance for an official credential",
          "Never skip any question under any circumstances, no matter how long it takes",
        ],
        correctIndex: 0,
        explanation:
          "This platform is honest about being self-paced practice, not a proctored or certifying exam, so estimating, eliminating implausible answers, and returning later to a stuck question is a reasonable, low-cost strategy here.",
      },
      {
        id: "q3",
        prompt:
          "Worker A can complete a task alone in 20 days. Worker B is 25% more efficient than A. How many days will B alone take to complete the same task?",
        choices: ["16 days", "15 days", "25 days", "24 days"],
        correctIndex: 0,
        explanation:
          "Being 25% more efficient means B's work rate is 1.25 times A's rate, so B's time is A's time divided by 1.25: 20 / 1.25 = 16 days. Multiplying 20 by 1.25 to get 25 would be the direction-reversed mistake.",
      },
    ],
    takeaway:
      "Multi-step problems reward carefully tracking which result feeds into the next step far more than they reward speed on any single formula.",
    summary:
      "Combining techniques -- like discount feeding into compound interest, or work rates feeding into a ratio-based payment split -- is mostly about correctly chaining intermediate results rather than learning any new formula. Practicing on this platform is self-paced and untimed by design, so honest general strategies like estimating, eliminating implausible choices, and budgeting time across questions are worth building as habits, understanding that this is practice, not a proctored or certifying exam.",
  },
];
