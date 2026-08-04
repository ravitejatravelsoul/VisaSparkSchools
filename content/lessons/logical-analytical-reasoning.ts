import type { LessonInput } from "@/lib/content/types";

/**
 * Logical and Analytical Reasoning.
 *
 * Every exercise models the underlying reasoning technique as a genuine,
 * deterministic, browser-executable JavaScript function (matching the
 * platform's honesty policy: no exercise here pretends to parse free-form
 * English arguments -- each one checks a concrete, rule-based structural
 * criterion, exactly the technique the lesson teaches by hand).
 */
export const logicalAnalyticalReasoningLessons: LessonInput[] = [
  {
    id: "lr-number-letter-series",
    slug: "number-letter-series",
    title: "Number and Letter Series",
    description:
      "Spot arithmetic, geometric, and alternating patterns in number and letter series.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Identify whether a number series has a constant difference (arithmetic) or a constant ratio (geometric)",
      "Continue a letter series by converting letters to alphabet positions and back",
      "Recognize an alternating series made of two interleaved patterns",
    ],
    skills: ["logical-reasoning", "number-letter-series"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["number series", "letter series", "pattern recognition", "arithmetic series"],
    explanation: `A series is a sequence of items that follow a rule. Placement tests use series questions to check whether you can find that rule from a handful of examples and apply it one step further.

**Arithmetic series** have a constant difference between consecutive terms. In \`3, 7, 11, 15, ?\`, each term is 4 more than the last, so the next term is \`15 + 4 = 19\`. **Geometric series** have a constant ratio instead: in \`2, 6, 18, 54, ?\`, each term is 3 times the last, so the next term is \`54 * 3 = 162\`.

**Letter series** work the same way once you convert letters to numbers. Map A=1, B=2, ..., Z=26. The series \`B, D, F, H, ?\` becomes positions \`2, 4, 6, 8\`, an arithmetic series with a constant difference of 2, so the next position is 10, which is \`J\`.

Not every series is that simple. Some are **alternating series** built from two separate patterns interleaved together. In \`1, 3, 8, 10, 15, ?\`, look at every other term: the odd positions (1, 8, 15) increase by 7 each time is wrong at a glance -- instead notice the actual step pattern alternates \`+2, +5, +2, +5, ...\`: \`1 +2= 3\`, \`3 +5= 8\`, \`8 +2= 10\`, \`10 +5= 15\`, so the next step is \`+2\`, giving \`17\`.

The reliable method is always the same three steps: compute the difference (or ratio) between each consecutive pair, check whether that difference is constant, and if it isn't, check whether it alternates between two constant values before assuming the series is random. Never commit to a rule from just two terms -- always verify it against a third.`,
    example: {
      language: "javascript",
      editable: false,
      description: "Finding the next term in a constant-difference series.",
      code: "function nextInArithmeticSeries(series) {\n  const step = series[1] - series[0];\n  return series[series.length - 1] + step;\n}\n// nextInArithmeticSeries([3, 7, 11, 15]) -> 19",
    },
    guidedExercise: {
      id: "lr-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isArithmeticSeries(series) that returns true if every consecutive pair of terms in the array has the same difference (length is always >= 2), and false otherwise.",
      starterCode:
        "function isArithmeticSeries(series) {\n  // TODO: check that every consecutive difference equals the first difference\n}\n",
      solutionCode:
        "function isArithmeticSeries(series) {\n  const step = series[1] - series[0];\n  for (let i = 2; i < series.length; i++) {\n    if (series[i] - series[i - 1] !== step) return false;\n  }\n  return true;\n}",
      harness:
        "window.__report('t1', isArithmeticSeries([3, 7, 11, 15]) === true, 'A constant-difference series should return true.');\nwindow.__report('t2', isArithmeticSeries([2, 4, 8, 16]) === false, 'A geometric (non-arithmetic) series should return false.');\nwindow.__report('t3', isArithmeticSeries([5, 5, 5]) === true, 'A constant series (difference 0) still counts as arithmetic.');",
      tests: [
        { id: "t1", description: "Detects a genuine arithmetic series", hidden: false },
        { id: "t2", description: "Rejects a geometric series", hidden: false },
        {
          id: "t3",
          description: "A zero-difference series still counts as arithmetic",
          hidden: true,
        },
      ],
      hints: [
        "Compute the difference between the first two terms first -- that's your candidate step.",
        "Then walk through the rest of the array checking every consecutive pair against that same step.",
        "The moment one pair doesn't match the step, you can return false immediately.",
      ],
    },
    independentExercise: {
      id: "lr-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write nextLetterInSeries(letters) where letters is an array of uppercase single-character strings whose alphabet positions (A=1 ... Z=26) form an arithmetic series. Return the next letter as a single uppercase character. Assume the result never exceeds 'Z'.",
      starterCode:
        "function nextLetterInSeries(letters) {\n  // TODO: convert letters to alphabet positions, find the next position, convert back\n}\n",
      solutionCode:
        "function nextLetterInSeries(letters) {\n  const codes = letters.map((l) => l.charCodeAt(0) - 64);\n  const step = codes[1] - codes[0];\n  const nextCode = codes[codes.length - 1] + step;\n  return String.fromCharCode(64 + nextCode);\n}",
      harness:
        "window.__report('t1', nextLetterInSeries(['B', 'D', 'F', 'H']) === 'J', 'B, D, F, H should continue with J (step of 2 alphabet positions).');\nwindow.__report('t2', nextLetterInSeries(['A', 'C', 'E']) === 'G', 'A, C, E should continue with G.');\nwindow.__report('t3', nextLetterInSeries(['A', 'B']) === 'C', 'A step of 1 should give the very next letter.');",
      tests: [
        { id: "t1", description: "Continues a 4-letter series with step 2", hidden: false },
        { id: "t2", description: "Continues a 3-letter series with step 2", hidden: false },
        { id: "t3", description: "Handles the smallest possible step of 1", hidden: true },
      ],
      hints: [
        "charCodeAt(0) gives you a character's Unicode code point -- subtract 64 from an uppercase letter's code to get its 1-26 alphabet position.",
        "Find the step the same way you did for numbers, using the first two positions.",
        "String.fromCharCode(64 + position) converts a position back to its uppercase letter.",
      ],
    },
    commonMistakes: [
      "Assuming a series is arithmetic after checking only the first two terms, without verifying a third.",
      "Off-by-one errors when converting letters to positions -- remember A is position 1, not 0.",
      "Missing that a series alternates between two interleaved patterns instead of following one constant rule.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the next term in the series 5, 9, 13, 17, ?",
        choices: ["19", "21", "23", "25"],
        correctIndex: 1,
        explanation: "The constant difference is 4, so the next term is 17 + 4 = 21.",
      },
      {
        id: "q2",
        prompt: "Which letter continues the series C, F, I, L, ?",
        choices: ["N", "O", "P", "M"],
        correctIndex: 1,
        explanation:
          "C, F, I, L are positions 3, 6, 9, 12 -- a constant step of 3, so the next position is 15, which is O.",
      },
      {
        id: "q3",
        prompt:
          "A series alternates between adding 2 and adding 5: 1, 3, 8, 10, 15, ?. What is the next term?",
        choices: ["17", "20", "18", "22"],
        correctIndex: 0,
        explanation:
          "The last step applied was +5 (10 to 15), so the next step is +2, giving 15 + 2 = 17.",
      },
    ],
    takeaway:
      "Every series question comes down to finding the rule between consecutive terms and verifying it against at least three terms before trusting it.",
    summary:
      "Number series are arithmetic (constant difference), geometric (constant ratio), or alternating (two interleaved patterns). Letter series follow the same logic once converted to alphabet positions.",
    nextLessonSlug: "coding-decoding",
  },
  {
    id: "lr-coding-decoding",
    slug: "coding-decoding",
    title: "Coding and Decoding",
    description: "Decode fixed-shift letter ciphers and apply the same rule to encode new words.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["lr-number-letter-series"],
    objectives: [
      "Explain how a fixed alphabet-shift cipher encodes and decodes text",
      "Encode a word given a shift value, including wrapping past Z back to A",
      "Decode a word by reversing the same shift",
    ],
    skills: ["logical-reasoning", "coding-decoding"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["coding decoding", "cipher", "shift cipher", "pattern decoding"],
    explanation: `Coding-decoding questions give you a small number of coded examples and ask you to find the rule, then apply it to a new word. The simplest and most common rule in placement tests is a **fixed alphabet shift**: every letter moves forward (or backward) by the same number of positions.

If \`CAT\` is coded as \`FDW\`, look at each letter: C (position 3) becomes F (position 6), A (1) becomes D (4), T (20) becomes W (23). Every letter moved forward by exactly 3 positions -- that's the rule. Once you know the shift, you can encode any new word the same way, or decode a coded word by shifting backward by the same amount.

The one detail that trips people up is **wrapping**: what happens when a shift pushes a letter past Z? The alphabet wraps back to A. Shifting \`X\` by 3 doesn't go past Z into nothing -- it wraps: X (24) -> Y (25) -> Z (26) -> A (1). So \`XYZ\` shifted by 3 becomes \`ABC\`, not an error or an out-of-range letter. The same wrapping applies going backward: decoding \`A\` with a shift of 3 wraps back to \`X\`.

A second thing to watch for: don't assume every coding scheme is a simple shift. Some use position-based substitution, reversal, or a different rule per letter position. The safe habit is to verify your hypothesis against a *second* coded example before applying it to a brand-new word -- one matching example could be a coincidence, but two confirms the rule.`,
    example: {
      language: "javascript",
      editable: false,
      description: "Shifting a single letter forward by a fixed amount, wrapping past Z.",
      code: "function shiftChar(ch, shift) {\n  const code = (((ch.charCodeAt(0) - 65 + shift) % 26) + 26) % 26;\n  return String.fromCharCode(65 + code);\n}\n// shiftChar('A', 3) -> 'D'\n// shiftChar('X', 3) -> 'A' (wraps)",
    },
    guidedExercise: {
      id: "lr-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Using the provided shiftChar helper, write encodeShift(word, shift) that shifts every uppercase letter in word forward by shift positions, wrapping past Z, and returns the resulting word.",
      starterCode:
        "function shiftChar(ch, shift) {\n  const code = (((ch.charCodeAt(0) - 65 + shift) % 26) + 26) % 26;\n  return String.fromCharCode(65 + code);\n}\n\nfunction encodeShift(word, shift) {\n  // TODO: shift every character in word by `shift` positions using shiftChar\n}\n",
      solutionCode:
        "function shiftChar(ch, shift) {\n  const code = (((ch.charCodeAt(0) - 65 + shift) % 26) + 26) % 26;\n  return String.fromCharCode(65 + code);\n}\n\nfunction encodeShift(word, shift) {\n  return word\n    .split('')\n    .map((ch) => shiftChar(ch, shift))\n    .join('');\n}",
      harness:
        "window.__report('t1', encodeShift('CAT', 3) === 'FDW', \"Shifting 'CAT' by 3 should give 'FDW'.\");\nwindow.__report('t2', encodeShift('HELLO', 1) === 'IFMMP', \"Shifting 'HELLO' by 1 should give 'IFMMP'.\");\nwindow.__report('t3', encodeShift('XYZ', 3) === 'ABC', 'Shifting must wrap around past Z back to A.');",
      tests: [
        { id: "t1", description: "Encodes a short word with shift 3", hidden: false },
        { id: "t2", description: "Encodes a longer word with shift 1", hidden: false },
        { id: "t3", description: "Wraps correctly past Z", hidden: true },
      ],
      hints: [
        "split('') turns a word into an array of single characters you can map over.",
        "Call the provided shiftChar on every character, then join the results back into a string.",
        "You don't need to handle wrapping yourself -- shiftChar already does it.",
      ],
    },
    independentExercise: {
      id: "lr-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Using the provided shiftChar helper, write decodeShift(word, shift) that reverses a shift-cipher encoding by shifting every letter backward by shift positions.",
      starterCode:
        "function shiftChar(ch, shift) {\n  const code = (((ch.charCodeAt(0) - 65 + shift) % 26) + 26) % 26;\n  return String.fromCharCode(65 + code);\n}\n\nfunction decodeShift(word, shift) {\n  // TODO: shift every character backward by `shift` positions\n}\n",
      solutionCode:
        "function shiftChar(ch, shift) {\n  const code = (((ch.charCodeAt(0) - 65 + shift) % 26) + 26) % 26;\n  return String.fromCharCode(65 + code);\n}\n\nfunction decodeShift(word, shift) {\n  return word\n    .split('')\n    .map((ch) => shiftChar(ch, -shift))\n    .join('');\n}",
      harness:
        "window.__report('t1', decodeShift('FDW', 3) === 'CAT', \"Decoding 'FDW' with shift 3 should give 'CAT'.\");\nwindow.__report('t2', decodeShift('IFMMP', 1) === 'HELLO', \"Decoding 'IFMMP' with shift 1 should give 'HELLO'.\");\nwindow.__report('t3', decodeShift('ABC', 3) === 'XYZ', 'Decoding must also wrap correctly going backward past A.');",
      tests: [
        { id: "t1", description: "Decodes a short word with shift 3", hidden: false },
        { id: "t2", description: "Decodes a longer word with shift 1", hidden: false },
        { id: "t3", description: "Wraps correctly going backward past A", hidden: true },
      ],
      hints: [
        "Decoding is the same operation as encoding, just with the shift negated.",
        "shiftChar already accepts a negative shift and handles wrapping correctly either direction.",
        "Reuse the same map-and-join structure as encodeShift.",
      ],
    },
    commonMistakes: [
      "Assuming a shift cipher never wraps, and getting confused when a letter near Z or A is involved.",
      "Applying the shift in the wrong direction when decoding instead of encoding.",
      "Committing to 'it's a shift cipher' from one example without checking a second coded word.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "If CAT is coded as FDW using a fixed forward alphabet shift, what shift value was used?",
        choices: ["2", "3", "4", "1"],
        correctIndex: 1,
        explanation: "C to F, A to D, and T to W are each a forward shift of exactly 3 positions.",
      },
      {
        id: "q2",
        prompt: "Using a shift of 5, what does the letter V encode to (wrapping past Z if needed)?",
        choices: ["A", "Z", "B", "U"],
        correctIndex: 0,
        explanation: "V is position 22; 22 + 5 = 27, which wraps to position 1, the letter A.",
      },
      {
        id: "q3",
        prompt: "Why is it risky to assume a coding scheme always uses a simple fixed shift?",
        choices: [
          "Because some schemes use a different rule, like reversal or position-based substitution, that a single matching example can't distinguish from a shift",
          "Because fixed shifts never wrap around the alphabet",
          "Because coding-decoding questions never appear in placement tests",
          "Because letters cannot be converted to numbers",
        ],
        correctIndex: 0,
        explanation:
          "One matching example could coincidentally fit a shift rule even if the real scheme is different -- a second example is needed to confirm it.",
      },
    ],
    takeaway:
      "A coding scheme's rule is only confirmed once it correctly predicts a second example, not just the first one you were given.",
    summary:
      "Fixed-shift ciphers move every letter forward or backward by a constant amount, wrapping past Z or A as needed. Decoding reverses the same shift applied during encoding.",
    nextLessonSlug: "analogies-classification",
  },
  {
    id: "lr-analogies-classification",
    slug: "analogies-classification",
    title: "Analogies and Classification",
    description: "Complete word and number analogies, and identify the odd one out in a group.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["lr-coding-decoding"],
    objectives: [
      "Identify the relationship between a pair of words or numbers in an analogy",
      "Apply that relationship to complete a second pair",
      "Find the item in a group whose category differs from the rest",
    ],
    skills: ["logical-reasoning", "analogies-classification"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["analogies", "classification", "odd one out", "verbal reasoning"],
    explanation: `An **analogy** asks you to find the relationship in one pair (A is to B) and apply that same relationship to complete a second pair (C is to ?). Relationships come in recognizable types: part-to-whole (\`Page : Book\`), function (\`Hammer : Carpenter\`, a tool and who uses it), cause-effect, opposites, or a numeric rule (multiply, add, square).

Take \`2 : 4 :: 3 : ?\`. The relationship between 2 and 4 could be "multiply by 2" (giving 6) -- and since 4 is exactly 2 times 2, that's the simplest consistent rule, so the answer is 6. Compare that with \`2 : 5 :: 10 : ?\`: here 5 is not a clean multiple of 2, so the relationship is more likely additive ("add 3"), giving \`10 + 3 = 13\`. The key skill is testing whether the first pair's relationship is multiplicative or additive *before* assuming which one applies.

**Classification** (also called "odd one out") gives you a group of items and asks which one doesn't share the category the others do. \`Triangle, Square, Pentagon, Circle\` -- three are polygons with straight sides and vertices; a circle has neither, so it's the odd one out. The trick is identifying *what specific property* the majority shares, not just guessing which one "feels" different.

Both skills share a common discipline: state the rule explicitly before applying it. "These three are all fruits, this one is a vegetable" is a testable claim; "this one just seems different" is not, and it's exactly the kind of vague reasoning that leads to a wrong answer under time pressure.`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "Completing a numeric analogy by detecting a multiplicative or additive relationship.",
      code: "function completeAnalogy(a, b, c) {\n  if (b % a === 0) return c * (b / a);\n  return c + (b - a);\n}\n// completeAnalogy(2, 4, 3) -> 6 (relationship: multiply by 2)",
    },
    guidedExercise: {
      id: "lr-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write findOddOneOut(words, groupOf) where groupOf maps each word to its category. Return the word belonging to the minority category, or null if every word shares one category.",
      starterCode:
        "function findOddOneOut(words, groupOf) {\n  // TODO: count how many words fall into each category, then return the word\n  // in the smallest category (or null if there's only one category)\n}\n",
      solutionCode:
        "function findOddOneOut(words, groupOf) {\n  const counts = {};\n  for (const w of words) {\n    const g = groupOf[w];\n    counts[g] = (counts[g] || 0) + 1;\n  }\n  const groups = Object.keys(counts);\n  if (groups.length <= 1) return null;\n  const minorityGroup = groups.reduce((a, b) => (counts[a] < counts[b] ? a : b));\n  return words.find((w) => groupOf[w] === minorityGroup);\n}",
      harness:
        "const groupOf1 = { Apple: 'fruit', Banana: 'fruit', Carrot: 'vegetable', Mango: 'fruit' };\nwindow.__report('t1', findOddOneOut(['Apple', 'Banana', 'Carrot', 'Mango'], groupOf1) === 'Carrot', 'Carrot is the vegetable among fruits.');\nconst groupOf2 = { Cat: 'animal', Dog: 'animal', Bird: 'animal' };\nwindow.__report('t2', findOddOneOut(['Cat', 'Dog', 'Bird'], groupOf2) === null, 'When every item shares one group, there is no odd one out.');\nconst groupOf3 = { Red: 'color', Blue: 'color', Green: 'color', Circle: 'shape' };\nwindow.__report('t3', findOddOneOut(['Red', 'Blue', 'Green', 'Circle'], groupOf3) === 'Circle', 'Circle is a shape among colors.');",
      tests: [
        { id: "t1", description: "Finds the minority-category word", hidden: false },
        { id: "t2", description: "Returns null when every word shares one category", hidden: true },
        { id: "t3", description: "Works with a different category pairing", hidden: false },
      ],
      hints: [
        "Build a count of how many words fall into each category first.",
        "If there's only one distinct category among all the words, there's no odd one out.",
        "The odd one out belongs to whichever category has the fewest words.",
      ],
    },
    independentExercise: {
      id: "lr-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write completeAnalogy(a, b, c) that detects whether b relates to a by multiplication (when b is an exact multiple of a) or by addition, and applies that same relationship to c, returning the result.",
      starterCode:
        "function completeAnalogy(a, b, c) {\n  // TODO: if b is an exact multiple of a, apply the same multiplier to c;\n  // otherwise apply the same additive difference to c\n}\n",
      solutionCode:
        "function completeAnalogy(a, b, c) {\n  if (b % a === 0) {\n    const ratio = b / a;\n    return c * ratio;\n  }\n  const diff = b - a;\n  return c + diff;\n}",
      harness:
        "window.__report('t1', completeAnalogy(2, 4, 3) === 6, '2 is to 4 (x2) as 3 is to 6.');\nwindow.__report('t2', completeAnalogy(2, 5, 10) === 13, '2 is to 5 (+3) as 10 is to 13.');\nwindow.__report('t3', completeAnalogy(5, 10, 7) === 14, '5 is to 10 (x2) as 7 is to 14.');",
      tests: [
        { id: "t1", description: "Applies a multiplicative relationship", hidden: false },
        { id: "t2", description: "Applies an additive relationship", hidden: false },
        {
          id: "t3",
          description: "Applies a multiplicative relationship with different numbers",
          hidden: true,
        },
      ],
      hints: [
        "Use the remainder operator (%) to check whether b divides evenly by a.",
        "If it does, the relationship is likely 'multiply by (b / a)'.",
        "Otherwise, fall back to the additive difference (b - a).",
      ],
    },
    commonMistakes: [
      "Assuming a numeric analogy is always additive, or always multiplicative, without testing which fits the first pair.",
      "Picking an odd one out based on a vague feeling instead of naming the shared category explicitly.",
      "Overlooking that a word analogy can be based on function or cause-effect, not just simple similarity.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Hammer is to Carpenter as Scalpel is to ?",
        choices: ["Patient", "Surgeon", "Hospital", "Knife"],
        correctIndex: 1,
        explanation:
          "The relationship is tool-to-user: a carpenter uses a hammer, a surgeon uses a scalpel.",
      },
      {
        id: "q2",
        prompt: "Which word does not belong: Triangle, Square, Pentagon, Circle?",
        choices: ["Triangle", "Square", "Pentagon", "Circle"],
        correctIndex: 3,
        explanation:
          "Triangle, Square, and Pentagon are all polygons with straight sides and vertices; a circle has neither.",
      },
      {
        id: "q3",
        prompt:
          "Why is it risky to complete an analogy using only the first pair's relationship, without checking whether it's additive or multiplicative first?",
        choices: [
          "Because the same numeric jump can fit either an additive or a multiplicative rule, and only testing tells you which one the puzzle intends",
          "Because analogies never involve numbers",
          "Because every analogy uses the same fixed relationship",
          "Because classification and analogy questions are identical",
        ],
        correctIndex: 0,
        explanation:
          "Without checking, you might apply 'add 2' when the intended rule was 'multiply by 2', producing a wrong answer that happened to look plausible.",
      },
    ],
    takeaway:
      "Name the relationship explicitly before applying it -- both analogies and classification puzzles reward a stated rule over a guess.",
    summary:
      "Analogies require identifying whether a pair's relationship is additive, multiplicative, functional, or categorical, then applying it consistently. Classification asks you to find the shared property of a majority and the one item that breaks it.",
    nextLessonSlug: "blood-relations",
  },
  {
    id: "lr-blood-relations",
    slug: "blood-relations",
    title: "Blood Relations",
    description:
      "Translate a written family description into a relationship chain and answer correctly.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["lr-analogies-classification"],
    objectives: [
      "Translate a sentence like 'X is Y's father' into a directional parent-child relationship",
      "Determine whether two people are siblings from a shared-parent structure",
      "Determine a grandparent relationship by chaining two parent-child links",
    ],
    skills: ["logical-reasoning", "blood-relations"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["blood relations", "family tree", "relationship puzzles"],
    explanation: `Blood relation questions describe a family in a sentence or two and ask how two people are related. The entire skill is translating each sentence into a **directional** link and then chaining links together correctly.

"X is Y's father" means X is a parent of Y -- the relationship points from X down to Y. A common error is drawing it backward, as if Y were X's parent. Once every sentence is converted into a small directed diagram (an arrow from parent to child), the rest is just following arrows.

**Siblings** share at least one parent. If A and B both have M as a parent, A and B are siblings (or half-siblings, if only one parent is shared) -- the puzzle usually doesn't distinguish full from half unless it says so explicitly.

**Grandparent** relationships are two hops: if A is a parent of B, and B is a parent of C, then A is a grandparent of C. This is where most errors creep in on longer chains -- "my mother's only son" is not automatically "me" (unless you are that only son); it depends on how many sons your mother has and who's asking.

A classic trap: "Pointing to a photo, Rita said, 'He is the son of my mother's only son.'" Work it step by step. Rita's mother's only son is Rita's brother (assuming Rita is not that son -- the puzzle context makes clear a male relative is being described). The brother's son is Rita's nephew. Each step is a single, unambiguous hop; the puzzle only gets hard when you try to skip steps instead of writing each one down.`,
    visual: {
      kind: "diagram",
      title: "Two-generation family chain",
      description:
        "A (parent) -> B (parent, child of A) -> C (child of B). A is B's parent and C's grandparent. B and any of A's other children are C's aunt/uncle or siblings of B, depending on the level.",
    },
    example: {
      language: "javascript",
      editable: false,
      description: "Checking whether two people share a parent in a small family record.",
      code: "function isSiblingOf(p1, p2, family) {\n  if (p1 === p2) return false;\n  const parents1 = family[p1]?.parents || [];\n  const parents2 = family[p2]?.parents || [];\n  return parents1.some((p) => parents2.includes(p));\n}\n// isSiblingOf('A', 'B', { A: { parents: ['M'] }, B: { parents: ['M'] } }) -> true",
    },
    guidedExercise: {
      id: "lr-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isSiblingOf(p1, p2, family) where family maps each person's name to { parents: [...] }. Return true if p1 and p2 share at least one parent and are not the same person, false otherwise.",
      starterCode:
        "function isSiblingOf(p1, p2, family) {\n  // TODO: return true only if p1 and p2 are different people who share a parent\n}\n",
      solutionCode:
        "function isSiblingOf(p1, p2, family) {\n  if (p1 === p2) return false;\n  const parents1 = family[p1]?.parents || [];\n  const parents2 = family[p2]?.parents || [];\n  return parents1.some((p) => parents2.includes(p));\n}",
      harness:
        "const family1 = { A: { parents: ['M'] }, B: { parents: ['M'] }, C: { parents: ['N'] } };\nwindow.__report('t1', isSiblingOf('A', 'B', family1) === true, 'A and B share a parent, so they are siblings.');\nwindow.__report('t2', isSiblingOf('A', 'C', family1) === false, 'A and C do not share a parent.');\nwindow.__report('t3', isSiblingOf('A', 'A', family1) === false, 'A person is never their own sibling.');",
      tests: [
        { id: "t1", description: "Recognizes a shared parent as siblings", hidden: false },
        { id: "t2", description: "Rejects two people with different parents", hidden: false },
        { id: "t3", description: "A person is never their own sibling", hidden: true },
      ],
      hints: [
        "Look up each person's parents array from the family object.",
        "Two people are siblings if their parents arrays share at least one name.",
        "Guard against comparing a person to themselves before checking shared parents.",
      ],
    },
    independentExercise: {
      id: "lr-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isGrandparentOf(p1, p2, family) where family maps each person to { parents: [...] }. Return true if p1 is a parent of one of p2's parents.",
      starterCode:
        "function isGrandparentOf(p1, p2, family) {\n  // TODO: check p2's parents, then check whether any of THEIR parents is p1\n}\n",
      solutionCode:
        "function isGrandparentOf(p1, p2, family) {\n  const parents = family[p2]?.parents || [];\n  return parents.some((parent) => (family[parent]?.parents || []).includes(p1));\n}",
      harness:
        "const family2 = { A: { parents: [] }, B: { parents: ['A'] }, C: { parents: ['B'] } };\nwindow.__report('t1', isGrandparentOf('A', 'C', family2) === true, \"A is B's parent, and B is C's parent, so A is C's grandparent.\");\nwindow.__report('t2', isGrandparentOf('A', 'B', family2) === false, \"A is B's parent, not grandparent.\");\nwindow.__report('t3', isGrandparentOf('B', 'A', family2) === false, 'A has no recorded parents, so nobody is a grandparent through A here.');",
      tests: [
        { id: "t1", description: "Recognizes a genuine two-hop grandparent chain", hidden: false },
        {
          id: "t2",
          description: "Does not confuse a direct parent with a grandparent",
          hidden: false,
        },
        { id: "t3", description: "Handles a person with no recorded parents", hidden: true },
      ],
      hints: [
        "First find p2's parents.",
        "For each of p2's parents, look up THEIR parents (that's the second hop).",
        "p1 is a grandparent of p2 if p1 appears among any of p2's parents' own parents.",
      ],
    },
    commonMistakes: [
      "Drawing 'X is Y's father' backward, as if Y were the parent of X.",
      "Skipping intermediate steps in a multi-hop chain instead of resolving one relationship at a time.",
      "Assuming a shared surname or a vague description implies a specific relationship without a stated link.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Pointing to a photo, Rita said, 'He is the son of my mother's only son.' How is the boy in the photo related to Rita?",
        choices: ["Nephew", "Son", "Brother", "Cousin"],
        correctIndex: 0,
        explanation:
          "Rita's mother's only son is Rita's brother; her brother's son is Rita's nephew.",
      },
      {
        id: "q2",
        prompt: "If A is B's father and C is A's mother, how is C related to B?",
        choices: ["Grandmother", "Mother", "Aunt", "Sister"],
        correctIndex: 0,
        explanation:
          "C is A's parent, and A is B's parent, so C is B's grandmother -- a two-hop chain.",
      },
      {
        id: "q3",
        prompt: "What is the most common error when translating 'X is Y's father' into a diagram?",
        choices: [
          "Drawing Y as the parent of X, reversing the actual direction of the relationship",
          "Forgetting that fathers are male",
          "Assuming X and Y must have the same surname",
          "Assuming there is only one correct diagram for every sentence",
        ],
        correctIndex: 0,
        explanation:
          "The relationship is directional -- X being Y's father means X is above Y in the family tree, not the reverse.",
      },
    ],
    takeaway:
      "Convert every relationship sentence into a directional parent-child link before combining them -- the direction is where most errors happen.",
    summary:
      "Blood relation puzzles are solved by translating each sentence into a directed parent-child link, then chaining links to answer sibling, grandparent, or more distant relationship questions.",
    nextLessonSlug: "direction-sense",
  },
  {
    id: "lr-direction-sense",
    slug: "direction-sense",
    title: "Direction Sense",
    description:
      "Track position after a sequence of cardinal moves and find the straight-line distance.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["lr-blood-relations"],
    objectives: [
      "Track a position as (x, y) coordinates after a sequence of North/South/East/West moves",
      "Compute the straight-line distance from the starting point using the Pythagorean theorem",
      "Determine facing direction after a 90 or 180 degree turn",
    ],
    skills: ["logical-reasoning", "direction-sense"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["direction sense", "compass directions", "distance calculation"],
    explanation: `Direction sense questions describe someone walking in a sequence of directions and ask either their final facing direction or their straight-line distance from the start. The reliable method is to track position as coordinates, not to try to picture the whole path in your head.

Treat North as +y, South as -y, East as +x, West as -x, starting at (0, 0). Walking 4 km north then 3 km east moves you to (3, 4) -- 3 east, 4 north. The **straight-line distance** from the start is not the total distance walked (7 km); it's the direct distance, found with the Pythagorean theorem: \`sqrt(x^2 + y^2) = sqrt(3^2 + 4^2) = sqrt(25) = 5\` km. This "3-4-5 triangle" pattern shows up constantly in direction problems because the numbers are chosen to come out clean.

**Turns** change which direction "forward" means, without necessarily changing position by themselves. Facing East and turning 180 degrees puts you facing West. Facing North and turning right (clockwise) puts you facing East. The trap is tracking turns cumulatively in your head across a long sequence -- it's far more reliable to update a single "current facing" variable one turn at a time than to try to reason about the net effect of several turns at once.

Two moves in opposite directions cancel out. Walking 5 km north then 5 km south returns you to a net y-displacement of 0 -- you're back where you started on that axis, even though you walked 10 km in total. Always compute *net* displacement per axis before reaching for the distance formula.`,
    visual: {
      kind: "diagram",
      title: "Coordinate tracking",
      description:
        "Start at (0,0). North increases y, South decreases y, East increases x, West decreases x. Straight-line distance from the start is sqrt(x^2 + y^2), regardless of the path taken to get there.",
    },
    example: {
      language: "javascript",
      editable: false,
      description: "Tracking net position after a sequence of cardinal-direction moves.",
      code: "function finalPosition(moves) {\n  let x = 0, y = 0;\n  for (const m of moves) {\n    if (m.direction === 'N') y += m.distance;\n    else if (m.direction === 'S') y -= m.distance;\n    else if (m.direction === 'E') x += m.distance;\n    else if (m.direction === 'W') x -= m.distance;\n  }\n  return { x, y };\n}\n// finalPosition([{ direction: 'N', distance: 4 }, { direction: 'E', distance: 3 }]) -> { x: 3, y: 4 }",
    },
    guidedExercise: {
      id: "lr-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write finalPosition(moves) where moves is an array of { direction: 'N'|'S'|'E'|'W', distance }. Track and return the final { x, y } position starting from (0, 0).",
      starterCode:
        "function finalPosition(moves) {\n  // TODO: track x and y as you apply each move, then return { x, y }\n}\n",
      solutionCode:
        "function finalPosition(moves) {\n  let x = 0;\n  let y = 0;\n  for (const m of moves) {\n    if (m.direction === 'N') y += m.distance;\n    else if (m.direction === 'S') y -= m.distance;\n    else if (m.direction === 'E') x += m.distance;\n    else if (m.direction === 'W') x -= m.distance;\n  }\n  return { x, y };\n}",
      harness:
        "window.__report('t1', JSON.stringify(finalPosition([{ direction: 'N', distance: 5 }, { direction: 'E', distance: 3 }])) === JSON.stringify({ x: 3, y: 5 }), 'Moving 5 north then 3 east should end at (3, 5).');\nwindow.__report('t2', JSON.stringify(finalPosition([{ direction: 'N', distance: 4 }, { direction: 'S', distance: 1 }])) === JSON.stringify({ x: 0, y: 3 }), 'Net movement of 4 north and 1 south is 3 north.');\nwindow.__report('t3', JSON.stringify(finalPosition([])) === JSON.stringify({ x: 0, y: 0 }), 'No moves should leave the position at the origin.');",
      tests: [
        { id: "t1", description: "Tracks a simple two-move path", hidden: false },
        { id: "t2", description: "Nets out two moves on the same axis", hidden: false },
        { id: "t3", description: "Handles an empty move list", hidden: true },
      ],
      hints: [
        "Start both x and y at 0 before the loop.",
        "North and South only ever change y; East and West only ever change x.",
        "Return an object with both final coordinates once every move is applied.",
      ],
    },
    independentExercise: {
      id: "lr-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write straightLineDistanceFromStart(moves) that reuses the provided finalPosition helper to find the net (x, y), then returns the straight-line distance from the origin, rounded to 2 decimal places.",
      starterCode:
        "function finalPosition(moves) {\n  let x = 0;\n  let y = 0;\n  for (const m of moves) {\n    if (m.direction === 'N') y += m.distance;\n    else if (m.direction === 'S') y -= m.distance;\n    else if (m.direction === 'E') x += m.distance;\n    else if (m.direction === 'W') x -= m.distance;\n  }\n  return { x, y };\n}\n\nfunction straightLineDistanceFromStart(moves) {\n  // TODO: use finalPosition, then apply the Pythagorean theorem\n}\n",
      solutionCode:
        "function finalPosition(moves) {\n  let x = 0;\n  let y = 0;\n  for (const m of moves) {\n    if (m.direction === 'N') y += m.distance;\n    else if (m.direction === 'S') y -= m.distance;\n    else if (m.direction === 'E') x += m.distance;\n    else if (m.direction === 'W') x -= m.distance;\n  }\n  return { x, y };\n}\n\nfunction straightLineDistanceFromStart(moves) {\n  const { x, y } = finalPosition(moves);\n  return Math.round(Math.sqrt(x * x + y * y) * 100) / 100;\n}",
      harness:
        "window.__report('t1', straightLineDistanceFromStart([{ direction: 'N', distance: 3 }, { direction: 'E', distance: 4 }]) === 5, 'A 3-4-5 triangle gives a straight-line distance of 5.');\nwindow.__report('t2', straightLineDistanceFromStart([{ direction: 'N', distance: 5 }, { direction: 'S', distance: 5 }]) === 0, 'Moving north then the same distance south returns to the start.');\nwindow.__report('t3', straightLineDistanceFromStart([{ direction: 'E', distance: 6 }, { direction: 'N', distance: 8 }]) === 10, 'A 6-8-10 triangle gives a straight-line distance of 10.');",
      tests: [
        { id: "t1", description: "Computes a classic 3-4-5 triangle distance", hidden: false },
        { id: "t2", description: "Returns 0 when moves fully cancel out", hidden: false },
        { id: "t3", description: "Computes a 6-8-10 triangle distance", hidden: true },
      ],
      hints: [
        "Get the net (x, y) from finalPosition first -- don't try to track distance directly during the moves.",
        "The straight-line distance is sqrt(x^2 + y^2), not the sum of all individual move distances.",
        "Round the final result to 2 decimal places using Math.round(value * 100) / 100.",
      ],
    },
    commonMistakes: [
      "Confusing total distance walked with straight-line distance from the starting point.",
      "Tracking cumulative turns mentally across a long sequence instead of one step at a time.",
      "Forgetting that opposite-direction moves on the same axis partially or fully cancel out.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Starting at the origin facing North, a person walks 4 km, turns right (now facing East), and walks 3 km. How far is the person from the start (straight-line distance)?",
        choices: ["5 km", "7 km", "6 km", "4 km"],
        correctIndex: 0,
        explanation:
          "The net displacement is 4 km north and 3 km east, a 3-4-5 triangle, giving a distance of 5 km.",
      },
      {
        id: "q2",
        prompt: "If you are facing East and turn 180 degrees, which direction do you now face?",
        choices: ["West", "North", "South", "East"],
        correctIndex: 0,
        explanation:
          "A 180-degree turn always reverses your facing direction; East reverses to West.",
      },
      {
        id: "q3",
        prompt:
          "What is the safest way to handle a long sequence of turns in a direction-sense question?",
        choices: [
          "Update one 'current facing' value one turn at a time, rather than reasoning about the combined effect of several turns at once",
          "Always assume the person ends up facing the same direction they started",
          "Ignore turns and only track straight-line moves",
          "Add up the degrees of every turn and divide by the number of moves",
        ],
        correctIndex: 0,
        explanation:
          "Tracking a single current-facing value and updating it one turn at a time avoids the errors that come from trying to combine several turns mentally.",
      },
    ],
    takeaway:
      "Track net (x, y) position per axis rather than trying to picture the whole path -- the Pythagorean theorem does the rest.",
    summary:
      "Direction-sense problems are solved by treating each cardinal move as a coordinate change, netting out moves on the same axis, and applying the Pythagorean theorem for straight-line distance.",
    nextLessonSlug: "syllogisms",
  },
  {
    id: "lr-syllogisms",
    slug: "syllogisms",
    title: "Syllogisms and Logical Deduction",
    description: "Determine whether a conclusion validly follows from two categorical statements.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["lr-direction-sense"],
    objectives: [
      "Represent categorical statements (All/Some/No) using set membership",
      "Determine whether two 'All' statements validly chain into an 'All' conclusion",
      "Recognize when a 'Some' premise cannot support a universal ('All' or 'No') conclusion",
    ],
    skills: ["logical-reasoning", "syllogisms"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["syllogisms", "logical deduction", "categorical statements"],
    explanation: `A syllogism gives you two statements (premises) and asks whether a conclusion **necessarily** follows -- not whether it sounds plausible, but whether it's logically guaranteed by the premises alone.

Categorical statements come in a few forms: **All A are B** (every member of A is also in B), **No A are B** (A and B share no members), and **Some A are B** (at least one member is in both). Thinking of A and B as sets makes the rules concrete: "All roses are flowers" means the set of roses is entirely contained within the set of flowers.

The classic valid chain is two "All" statements sharing a **middle term**: "All roses are flowers" + "All flowers need water" -> "All roses need water" is valid, because the middle term (flowers) links them: roses are a subset of flowers, flowers are a subset of things-that-need-water, so roses are a subset of things-that-need-water too.

Two traps show up constantly. First, **the converse is not implied**: "All A are B" does *not* mean "All B are A" -- all roses are flowers, but not all flowers are roses. Second, **"Some" premises can never yield a universal conclusion**. "Some dolphins are mammals" only tells you about *some* dolphins, not all of them -- so a conclusion like "No dolphins are fish" (a universal claim) overreaches what the premise actually supports, even if it happens to be true in the real world. The premises given, not outside knowledge, are what determine validity.

The reliable check for a two-"All"-premises chain: do the premises share a middle term, with the first premise's predicate matching the second premise's subject? If yes, the chain is valid. If either premise is "Some" instead of "All," a universal conclusion never validly follows.`,
    example: {
      language: "javascript",
      editable: false,
      description: "Checking whether one group is entirely contained within another.",
      code: "function allAreSubsetOf(groupA, groupB) {\n  return groupA.every((member) => groupB.includes(member));\n}\n// allAreSubsetOf(['cat', 'dog'], ['cat', 'dog', 'bird']) -> true",
    },
    guidedExercise: {
      id: "lr-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write allAreSubsetOf(groupA, groupB) that returns true if every member of groupA also appears in groupB.",
      starterCode:
        "function allAreSubsetOf(groupA, groupB) {\n  // TODO: check that every member of groupA is also in groupB\n}\n",
      solutionCode:
        "function allAreSubsetOf(groupA, groupB) {\n  return groupA.every((member) => groupB.includes(member));\n}",
      harness:
        "window.__report('t1', allAreSubsetOf(['cat', 'dog'], ['cat', 'dog', 'bird']) === true, 'Every member of the first group appears in the second.');\nwindow.__report('t2', allAreSubsetOf(['cat', 'fish'], ['cat', 'dog']) === false, 'fish is not in the second group, so this is false.');\nwindow.__report('t3', allAreSubsetOf([], ['x']) === true, 'An empty group is vacuously a subset of any group -- a classic logic subtlety.');",
      tests: [
        { id: "t1", description: "Confirms a genuine subset relationship", hidden: false },
        {
          id: "t2",
          description: "Rejects a group with a member missing from the second",
          hidden: false,
        },
        { id: "t3", description: "An empty group is vacuously a subset of anything", hidden: true },
      ],
      hints: [
        "Array.prototype.every checks that a condition holds for every element.",
        "For each member of groupA, check whether groupB includes it.",
        "An empty array's every() call returns true automatically -- that's not a bug, it matches the logical definition.",
      ],
    },
    independentExercise: {
      id: "lr-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write followsAllAAreC(premise1, premise2) where each premise is { type: 'all'|'some', subject, predicate }. Return true only if both premises have type 'all' AND premise1's predicate matches premise2's subject (a valid middle-term chain).",
      starterCode:
        "function followsAllAAreC(premise1, premise2) {\n  // TODO: both premises must be type 'all', and the middle term must match\n}\n",
      solutionCode:
        "function followsAllAAreC(premise1, premise2) {\n  if (premise1.type !== 'all' || premise2.type !== 'all') return false;\n  return premise1.predicate === premise2.subject;\n}",
      harness:
        "window.__report('t1', followsAllAAreC({ type: 'all', subject: 'Cats', predicate: 'Mammals' }, { type: 'all', subject: 'Mammals', predicate: 'Animals' }) === true, 'All Cats are Mammals and All Mammals are Animals validly gives All Cats are Animals.');\nwindow.__report('t2', followsAllAAreC({ type: 'all', subject: 'Cats', predicate: 'Mammals' }, { type: 'all', subject: 'Birds', predicate: 'Animals' }) === false, 'The middle terms (Mammals vs Birds) do not match, so no conclusion follows.');\nwindow.__report('t3', followsAllAAreC({ type: 'some', subject: 'Cats', predicate: 'Mammals' }, { type: 'all', subject: 'Mammals', predicate: 'Animals' }) === false, 'A Some premise can never validly produce an All conclusion.');",
      tests: [
        { id: "t1", description: "Confirms a valid two-'All'-premise chain", hidden: false },
        { id: "t2", description: "Rejects premises with mismatched middle terms", hidden: false },
        { id: "t3", description: "Rejects a chain starting from a 'Some' premise", hidden: true },
      ],
      hints: [
        "Both premises must be the 'all' type -- reject immediately otherwise.",
        "The middle term is premise1's predicate, which must equal premise2's subject.",
        "If the middle terms don't line up, no conclusion validly follows, regardless of what the statements say individually.",
      ],
    },
    commonMistakes: [
      "Assuming the converse of 'All A are B' (that 'All B are A') is also true.",
      "Treating a 'Some' premise as if it supported a universal ('All' or 'No') conclusion.",
      "Judging a conclusion by whether it sounds true in real life instead of whether it's guaranteed by the given premises.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Statement: All roses are flowers. All flowers need water. Conclusion: All roses need water. Is this conclusion valid?",
        choices: ["Valid", "Invalid", "Cannot be determined", "Only some roses need water"],
        correctIndex: 0,
        explanation:
          "Both premises are 'All' statements sharing the middle term 'flowers', so the chain validly concludes all roses need water.",
      },
      {
        id: "q2",
        prompt:
          "Statement: No fish are mammals. Some dolphins are mammals. Conclusion: No dolphins are fish. Is this valid?",
        choices: [
          "Valid",
          "Invalid -- it overreaches to a universal conclusion from a 'Some' premise",
          "Cannot be determined",
          "Both statements are false",
        ],
        correctIndex: 1,
        explanation:
          "The premises only establish that some dolphins are mammals, which supports 'some dolphins are not fish' -- not the universal claim that no dolphins are fish.",
      },
      {
        id: "q3",
        prompt:
          "Why can't a 'Some A are B' premise ever validly support an 'All' or 'No' conclusion?",
        choices: [
          "Because 'Some' only guarantees at least one member overlaps, saying nothing about the rest of the group",
          "Because 'Some' statements are always false",
          "Because 'Some' and 'All' mean the same thing in formal logic",
          "Because a syllogism can never have a 'Some' premise",
        ],
        correctIndex: 0,
        explanation:
          "'Some' is an existence claim about at least one member -- it says nothing about whether the rest of the group behaves the same way.",
      },
    ],
    takeaway:
      "A syllogism's conclusion is only as strong as its weakest premise -- a single 'Some' premise caps the conclusion at 'Some' too.",
    summary:
      "Categorical statements can be reasoned about as set membership. Two 'All' premises sharing a middle term validly chain together, but a 'Some' premise can never support a universal conclusion, and a statement's converse is never automatically implied.",
    nextLessonSlug: "seating-arrangements",
  },
  {
    id: "lr-seating-arrangements",
    slug: "seating-arrangements",
    title: "Seating Arrangements",
    description:
      "Solve linear and circular seating puzzles by systematically checking clues, not guessing.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["lr-syllogisms"],
    objectives: [
      "Check whether a proposed seating order satisfies every given clue",
      "Systematically search possible orders instead of guessing at a single arrangement",
      "Reason about relative position (opposite, adjacent, left-of) in circular arrangements",
    ],
    skills: ["logical-reasoning", "seating-arrangements"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: [
      "seating arrangements",
      "linear arrangement",
      "circular arrangement",
      "elimination method",
    ],
    explanation: `Seating arrangement puzzles give you a set of people and a list of clues ("Priya sits immediately to the left of Raj", "Sam does not sit next to Ben"), then ask you to determine positions. The reliable method is **elimination**: instead of guessing one arrangement and hoping, systematically check candidate arrangements against every clue and discard the ones that fail.

In a **linear arrangement**, position is just an index in a row. "Immediately to the left of" means one position lower; "immediately to the right" means one position higher. If Raj is in seat 3, and Priya sits immediately to his left, Priya is in seat 2 -- not "somewhere before him," a specific, adjacent seat.

**Circular arrangements** add a wraparound: the last seat is adjacent to the first. "Directly opposite" in a circle of *n* evenly-spaced seats means exactly *n/2* seats away in either direction. In a 6-seat circle, if A sits directly opposite D, there are 3 seats between them going either way around the circle.

The discipline that separates a correct answer from a guess: write every clue as a checkable rule, then test candidate orders against **all** of them at once, not one clue at a time in isolation. A candidate that satisfies clue 1 but fails clue 2 is not "half right" -- it's eliminated. With a small number of people, checking every possible order (a brute-force search) is fast and completely reliable; it's exactly what a computer does well, and exactly the discipline this lesson's exercises practice.`,
    visual: {
      kind: "diagram",
      title: "Linear vs. circular seating",
      description:
        "Linear: seat positions 1, 2, 3, 4 in a row, with 'left of' and 'right of' meaning lower or higher index. Circular: seats arranged in a ring where the last seat is adjacent to the first, and 'opposite' means halfway around.",
    },
    example: {
      language: "javascript",
      editable: false,
      description: "Checking a proposed seating order against a list of clue functions.",
      code: "function satisfiesClues(order, clues) {\n  return clues.every((clue) => clue(order));\n}\n// satisfiesClues(['A', 'B', 'C'], [(o) => o.indexOf('A') < o.indexOf('B')]) -> true",
    },
    guidedExercise: {
      id: "lr-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write satisfiesClues(order, clues) where order is an array of names and clues is an array of functions, each taking order and returning a boolean. Return true only if every clue function returns true for this order.",
      starterCode:
        "function satisfiesClues(order, clues) {\n  // TODO: return true only if every clue passes for this order\n}\n",
      solutionCode:
        "function satisfiesClues(order, clues) {\n  return clues.every((clue) => clue(order));\n}",
      harness:
        "const order1 = ['A', 'B', 'C'];\nwindow.__report('t1', satisfiesClues(order1, [(o) => o.indexOf('A') < o.indexOf('B')]) === true, 'A sits before B in this order, so the clue is satisfied.');\nwindow.__report('t2', satisfiesClues(order1, [(o) => o.indexOf('A') > o.indexOf('B')]) === false, 'A does not sit after B, so this clue fails.');\nwindow.__report('t3', satisfiesClues(order1, []) === true, 'With no clues at all, every arrangement trivially satisfies them.');",
      tests: [
        { id: "t1", description: "Confirms a satisfied clue", hidden: false },
        { id: "t2", description: "Detects a failed clue", hidden: false },
        { id: "t3", description: "An empty clue list is trivially satisfied", hidden: true },
      ],
      hints: [
        "Array.prototype.every runs a check against every element and stops early on the first failure.",
        "Each clue is itself a function -- call it with order and check its boolean result.",
        "An empty clues array should return true, matching the definition of 'every'.",
      ],
    },
    independentExercise: {
      id: "lr-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write findValidArrangement(people, clues) that tries every possible ordering of people (assume 4 or fewer people) and returns the first order that satisfies every clue, or null if none do.",
      starterCode:
        "function permutations(arr) {\n  if (arr.length <= 1) return [arr];\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];\n    for (const perm of permutations(rest)) {\n      result.push([arr[i], ...perm]);\n    }\n  }\n  return result;\n}\n\nfunction satisfiesClues(order, clues) {\n  return clues.every((clue) => clue(order));\n}\n\nfunction findValidArrangement(people, clues) {\n  // TODO: try every permutation of people, returning the first that satisfies every clue\n}\n",
      solutionCode:
        "function permutations(arr) {\n  if (arr.length <= 1) return [arr];\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];\n    for (const perm of permutations(rest)) {\n      result.push([arr[i], ...perm]);\n    }\n  }\n  return result;\n}\n\nfunction satisfiesClues(order, clues) {\n  return clues.every((clue) => clue(order));\n}\n\nfunction findValidArrangement(people, clues) {\n  for (const order of permutations(people)) {\n    if (satisfiesClues(order, clues)) return order;\n  }\n  return null;\n}",
      harness:
        "window.__report('t1', JSON.stringify(findValidArrangement(['A', 'B'], [(o) => o.indexOf('A') < o.indexOf('B')])) === JSON.stringify(['A', 'B']), 'A before B is satisfied by the order [A, B].');\nwindow.__report('t2', JSON.stringify(findValidArrangement(['A', 'B'], [(o) => o.indexOf('A') > o.indexOf('B')])) === JSON.stringify(['B', 'A']), 'A after B is satisfied by the order [B, A].');\nwindow.__report('t3', findValidArrangement(['A', 'B'], [(o) => false]) === null, 'An impossible clue should return null, not a wrong guess.');",
      tests: [
        { id: "t1", description: "Finds the correct order for a simple clue", hidden: false },
        { id: "t2", description: "Finds the correct order for the reversed clue", hidden: false },
        { id: "t3", description: "Returns null for an impossible clue set", hidden: true },
      ],
      hints: [
        "The provided permutations helper generates every possible ordering of the input array.",
        "Test each permutation against satisfiesClues until one passes.",
        "If no permutation ever satisfies every clue, the clues are contradictory -- return null rather than guessing.",
      ],
    },
    commonMistakes: [
      "Checking clues one at a time against different candidate arrangements instead of all clues against the same candidate.",
      "Forgetting that circular arrangements wrap around, so the first and last positions are adjacent.",
      "Confusing 'opposite' with 'adjacent' in a circular arrangement.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Five people sit in a row. Priya sits immediately to the left of Raj. If Raj is in seat 3, which seat is Priya in?",
        choices: ["Seat 1", "Seat 2", "Seat 3", "Seat 4"],
        correctIndex: 1,
        explanation:
          "'Immediately to the left of' means exactly one seat before -- seat 2, since Raj is in seat 3.",
      },
      {
        id: "q2",
        prompt:
          "In a circular arrangement of 6 evenly-spaced people, A sits directly opposite D. How many seats separate A and D going either way around?",
        choices: ["2", "3", "4", "1"],
        correctIndex: 1,
        explanation:
          "In a 6-seat circle, 'directly opposite' means exactly half the seats away, which is 3.",
      },
      {
        id: "q3",
        prompt:
          "What makes the elimination method more reliable than guessing a single arrangement?",
        choices: [
          "It systematically checks every candidate against all clues at once, so a valid answer is guaranteed to be found if one exists",
          "It only requires checking the first clue",
          "It works only for circular arrangements",
          "It avoids needing to read every clue",
        ],
        correctIndex: 0,
        explanation:
          "Testing every possible order against the complete set of clues guarantees finding a valid arrangement if one exists, unlike guessing.",
      },
    ],
    takeaway:
      "Test every clue against the same candidate arrangement at once -- a candidate is either fully valid or eliminated, never 'half right'.",
    summary:
      "Seating arrangement puzzles are solved by systematically checking candidate orders against every clue simultaneously. Linear arrangements use simple left/right positions; circular arrangements wrap around and require reasoning about opposite and adjacent seats.",
    nextLessonSlug: "puzzles-grouping",
  },
  {
    id: "lr-puzzles-grouping",
    slug: "puzzles-grouping",
    title: "Puzzles and Grouping",
    description: "Assign people to groups or a schedule while satisfying every stated constraint.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["lr-seating-arrangements"],
    objectives: [
      "Check whether a proposed group or schedule assignment satisfies every constraint",
      "Systematically generate candidate assignments instead of guessing",
      "Recognize the difference between an arrangement puzzle (unique positions) and a grouping puzzle (repeatable assignments)",
    ],
    skills: ["logical-reasoning", "puzzles-grouping"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["grouping puzzles", "scheduling puzzles", "constraint satisfaction"],
    explanation: `Grouping and scheduling puzzles assign people to categories -- teams, days, committees -- subject to constraints like "Sam does not work the same day as Priya" or "exactly one person is on the Red team." They look like seating arrangements, but there's a key structural difference: in a seating arrangement, each position is used by exactly one person (it's a strict ordering); in a grouping puzzle, **multiple people can share the same group or day**, since a group isn't a single seat.

That difference changes how you generate candidates. Seating arrangements use *permutations* (every person gets a distinct position). Grouping puzzles use every possible combination of assignments -- each person independently picks one of the available groups, so with *p* people and *g* groups, there are *g^p* possible assignments to check, not *p!* orderings.

The constraint-checking discipline is identical to seating arrangements: write each clue as a function that inspects a full assignment and returns true or false, then only accept an assignment that passes every clue. "Sam does not work the same day as Priya" becomes a function checking that assignment.Sam is different from assignment.Priya.

A common shortcut: if a constraint fixes one person's group directly ("Priya is assigned Monday"), you don't need to search at all for that person -- just narrow the remaining options for whoever is constrained relative to them. But when constraints interact (several people all constrained relative to each other), a systematic search across all combinations is the only way to guarantee you haven't missed a case or accepted an invalid one.`,
    example: {
      language: "javascript",
      editable: false,
      description: "Checking whether a proposed assignment satisfies every constraint function.",
      code: "function isValidGrouping(assignment, constraints) {\n  return constraints.every((c) => c(assignment));\n}\n// isValidGrouping({ Amy: 'Mon', Ben: 'Tue' }, [(a) => a.Amy !== a.Ben]) -> true",
    },
    guidedExercise: {
      id: "lr-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isValidGrouping(assignment, constraints) where assignment maps each person's name to their assigned group/day, and constraints is an array of functions taking assignment and returning a boolean. Return true only if every constraint passes.",
      starterCode:
        "function isValidGrouping(assignment, constraints) {\n  // TODO: return true only if every constraint function passes for this assignment\n}\n",
      solutionCode:
        "function isValidGrouping(assignment, constraints) {\n  return constraints.every((c) => c(assignment));\n}",
      harness:
        "window.__report('t1', isValidGrouping({ Amy: 'Mon', Ben: 'Tue' }, [(a) => a.Amy !== a.Ben]) === true, 'Amy and Ben are on different days, satisfying the constraint.');\nwindow.__report('t2', isValidGrouping({ Amy: 'Mon', Ben: 'Mon' }, [(a) => a.Amy !== a.Ben]) === false, 'Amy and Ben share the same day, violating the constraint.');\nwindow.__report('t3', isValidGrouping({ Amy: 'Mon', Ben: 'Tue' }, []) === true, 'With no constraints, every assignment is trivially valid.');",
      tests: [
        { id: "t1", description: "Confirms a satisfied constraint", hidden: false },
        { id: "t2", description: "Detects a violated constraint", hidden: false },
        { id: "t3", description: "An empty constraint list is trivially satisfied", hidden: true },
      ],
      hints: [
        "This is structurally the same check as satisfiesClues from the seating lesson, just applied to an assignment object instead of an order array.",
        "Each constraint function receives the whole assignment object and returns true or false.",
        "every() naturally returns true for an empty array.",
      ],
    },
    independentExercise: {
      id: "lr-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write solveGrouping(people, options, constraints) that tries every possible assignment of each person to one of options (people can share options) and returns the first assignment that satisfies every constraint, or null if none do.",
      starterCode:
        "function cartesianAssignments(people, options) {\n  if (people.length === 0) return [{}];\n  const [first, ...rest] = people;\n  const restAssignments = cartesianAssignments(rest, options);\n  const result = [];\n  for (const opt of options) {\n    for (const partial of restAssignments) {\n      result.push({ [first]: opt, ...partial });\n    }\n  }\n  return result;\n}\n\nfunction solveGrouping(people, options, constraints) {\n  // TODO: try every generated assignment, returning the first that satisfies every constraint\n}\n",
      solutionCode:
        "function cartesianAssignments(people, options) {\n  if (people.length === 0) return [{}];\n  const [first, ...rest] = people;\n  const restAssignments = cartesianAssignments(rest, options);\n  const result = [];\n  for (const opt of options) {\n    for (const partial of restAssignments) {\n      result.push({ [first]: opt, ...partial });\n    }\n  }\n  return result;\n}\n\nfunction solveGrouping(people, options, constraints) {\n  for (const assignment of cartesianAssignments(people, options)) {\n    if (constraints.every((c) => c(assignment))) return assignment;\n  }\n  return null;\n}",
      harness:
        "window.__report('t1', JSON.stringify(solveGrouping(['Amy', 'Ben'], ['Mon', 'Tue'], [(a) => a.Amy !== a.Ben])) === JSON.stringify({ Amy: 'Mon', Ben: 'Tue' }), 'The first assignment where Amy and Ben differ should be Mon/Tue.');\nwindow.__report('t2', solveGrouping(['Amy', 'Ben'], ['Mon', 'Tue'], [(a) => false]) === null, 'An impossible constraint set should return null.');\nwindow.__report('t3', JSON.stringify(solveGrouping(['Amy'], ['Mon', 'Tue'], [(a) => a.Amy === 'Tue'])) === JSON.stringify({ Amy: 'Tue' }), 'A single-person case should also resolve correctly.');",
      tests: [
        { id: "t1", description: "Finds a valid two-person assignment", hidden: false },
        { id: "t2", description: "Returns null for an impossible constraint set", hidden: true },
        { id: "t3", description: "Handles a single-person case", hidden: false },
      ],
      hints: [
        "cartesianAssignments generates every way to assign each person to one of the options, allowing repeats.",
        "Test each generated assignment against every constraint before accepting it.",
        "If nothing satisfies every constraint, the constraints are contradictory -- return null.",
      ],
    },
    commonMistakes: [
      "Using permutations (like seating arrangements) instead of allowing repeated group assignments.",
      "Checking constraints against a partial assignment before every person has been placed.",
      "Assuming a constraint that fixes one person's group automatically resolves everyone else's.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Four friends are each assigned to exactly one of two teams, Red or Blue. If exactly one friend must be on Red, how many valid team assignments are possible?",
        choices: ["4", "6", "8", "2"],
        correctIndex: 0,
        explanation:
          "Choosing which 1 of the 4 friends is the Red team member gives 4 possible assignments.",
      },
      {
        id: "q2",
        prompt:
          "A scheduling puzzle states 'Sam does not work on the same day as Priya.' If there are 3 available days and Priya is assigned Monday, how many valid day options remain for Sam?",
        choices: ["1", "2", "3", "0"],
        correctIndex: 1,
        explanation: "Sam can take any day except Monday, leaving 2 of the 3 available days.",
      },
      {
        id: "q3",
        prompt:
          "Why do grouping puzzles use combinations of assignments rather than permutations, unlike seating puzzles?",
        choices: [
          "Because multiple people can share the same group, unlike a seat which only one person can occupy",
          "Because grouping puzzles never have more than two people",
          "Because grouping puzzles and seating puzzles are solved identically",
          "Because groups always have exactly as many slots as people",
        ],
        correctIndex: 0,
        explanation:
          "A seat is unique to one person, but a group or day can be shared, so the candidate-generation method has to allow repeats.",
      },
    ],
    takeaway:
      "Grouping puzzles allow shared assignments, so generate candidates by combination (each person picks independently), not by permutation.",
    summary:
      "Grouping and scheduling puzzles are solved the same way as seating arrangements -- systematically checking candidates against every constraint -- but candidates are generated differently, since people can share a group or day rather than occupying a unique position.",
    nextLessonSlug: "statement-conclusions",
  },
  {
    id: "lr-statement-conclusions",
    slug: "statement-conclusions",
    title: "Statements, Assumptions, and Conclusions",
    description:
      "Distinguish a stated fact from an unstated assumption an argument actually depends on.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["lr-puzzles-grouping"],
    objectives: [
      "Distinguish a stated premise from an unstated assumption an argument depends on",
      "Apply the negation test to check whether a candidate assumption is truly necessary",
      "Identify which of several candidate assumptions an argument actually requires",
    ],
    skills: ["logical-reasoning", "statement-conclusions"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["assumptions", "conclusions", "critical thinking", "negation test"],
    explanation: `Every argument rests on more than what's written down. A **stated premise** is explicit ("sales increased after the launch"). An **assumption** is a claim the argument needs to be true for its conclusion to follow, but never says out loud. A **conclusion** is the claim the argument is trying to establish.

Take: "Sales increased after we launched the new fitness program, so the program is working." The stated premise is the sales increase. The conclusion is "the program is working." The unstated assumption is that **nothing else caused the increase** -- no seasonal effect, no unrelated marketing push, no coincidence. If that assumption is false, the argument falls apart even though the premise is true.

The standard technique for testing whether a candidate assumption is genuinely *necessary* (not just plausible or related) is the **negation test**: assume the candidate assumption is false, and ask whether the argument still holds up. If negating the assumption destroys the argument's support for its conclusion, the assumption was necessary. If the argument still basically holds even when the candidate is false, that candidate wasn't actually required -- it might be a nice detail, but it's not load-bearing.

This is different from finding *any* true-sounding statement related to the topic. Placement tests often offer several plausible-sounding assumption choices, and only one survives the negation test. The discipline is mechanical: for each candidate, ask "if this were false, would the argument still make sense?" -- not "does this sound reasonable?"`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "The negation test, encoded as a boolean check: does the argument hold with the assumption, but fail without it?",
      code: "function isNecessaryAssumption(holdsWithAssumption, holdsWithoutAssumption) {\n  return holdsWithAssumption === true && holdsWithoutAssumption === false;\n}\n// isNecessaryAssumption(true, false) -> true (passes the negation test)",
    },
    guidedExercise: {
      id: "lr-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isNecessaryAssumption(holdsWithAssumption, holdsWithoutAssumption), two booleans representing whether the argument holds under each scenario. Return true only if the argument holds with the assumption AND fails without it.",
      starterCode:
        "function isNecessaryAssumption(holdsWithAssumption, holdsWithoutAssumption) {\n  // TODO: apply the negation test\n}\n",
      solutionCode:
        "function isNecessaryAssumption(holdsWithAssumption, holdsWithoutAssumption) {\n  return holdsWithAssumption === true && holdsWithoutAssumption === false;\n}",
      harness:
        "window.__report('t1', isNecessaryAssumption(true, false) === true, 'The argument holds with the assumption but fails without it -- exactly the negation test for necessity.');\nwindow.__report('t2', isNecessaryAssumption(true, true) === false, 'If the argument holds even without the assumption, the assumption is not necessary.');\nwindow.__report('t3', isNecessaryAssumption(false, false) === false, 'If the argument does not even hold with the assumption, it cannot be the necessary assumption.');",
      tests: [
        { id: "t1", description: "Confirms a genuinely necessary assumption", hidden: false },
        {
          id: "t2",
          description: "Rejects an assumption the argument doesn't actually need",
          hidden: false,
        },
        {
          id: "t3",
          description: "Rejects an assumption that doesn't even support the argument",
          hidden: true,
        },
      ],
      hints: [
        "The negation test has two parts: the argument must hold WITH the assumption.",
        "...and it must FAIL without it -- both conditions are required, not just one.",
        "If the argument holds either way, the assumption was never load-bearing.",
      ],
    },
    independentExercise: {
      id: "lr-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write findNecessaryAssumptions(candidates), where candidates is an array of { holdsWith, holdsWithout } booleans. Return an array of the indices of every candidate that passes the negation test.",
      starterCode:
        "function isNecessaryAssumption(holdsWithAssumption, holdsWithoutAssumption) {\n  return holdsWithAssumption === true && holdsWithoutAssumption === false;\n}\n\nfunction findNecessaryAssumptions(candidates) {\n  // TODO: return the indices of every candidate that passes the negation test\n}\n",
      solutionCode:
        "function isNecessaryAssumption(holdsWithAssumption, holdsWithoutAssumption) {\n  return holdsWithAssumption === true && holdsWithoutAssumption === false;\n}\n\nfunction findNecessaryAssumptions(candidates) {\n  const indices = [];\n  candidates.forEach((c, i) => {\n    if (isNecessaryAssumption(c.holdsWith, c.holdsWithout)) indices.push(i);\n  });\n  return indices;\n}",
      harness:
        "window.__report('t1', JSON.stringify(findNecessaryAssumptions([{ holdsWith: true, holdsWithout: false }, { holdsWith: true, holdsWithout: true }, { holdsWith: false, holdsWithout: false }])) === JSON.stringify([0]), 'Only the first candidate passes the negation test.');\nwindow.__report('t2', JSON.stringify(findNecessaryAssumptions([{ holdsWith: true, holdsWithout: false }, { holdsWith: true, holdsWithout: false }])) === JSON.stringify([0, 1]), 'Both candidates independently pass the negation test.');\nwindow.__report('t3', JSON.stringify(findNecessaryAssumptions([])) === JSON.stringify([]), 'An empty candidate list has no necessary assumptions.');",
      tests: [
        { id: "t1", description: "Finds exactly the one passing candidate", hidden: false },
        { id: "t2", description: "Finds multiple passing candidates", hidden: false },
        { id: "t3", description: "Handles an empty candidate list", hidden: true },
      ],
      hints: [
        "Reuse the negation test on each candidate individually.",
        "forEach with an index parameter lets you collect the indices of the candidates that pass.",
        "An empty input should naturally produce an empty output, with no special-casing needed.",
      ],
    },
    commonMistakes: [
      "Picking an assumption because it sounds true in general, rather than testing whether the argument needs it specifically.",
      "Confusing a stated premise with an unstated assumption.",
      "Assuming a conclusion follows from a premise without checking what unstated claim actually bridges them.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "An argument concludes a new fitness program works because sales increased after its launch. What is the unstated assumption necessary for this argument?",
        choices: [
          "No other factor caused the sales increase",
          "The fitness program is popular with customers",
          "Sales figures are always accurate",
          "The company has launched programs before",
        ],
        correctIndex: 0,
        explanation:
          "If some other factor (season, unrelated promotion) actually caused the increase, the argument's conclusion no longer follows -- that's the necessary, unstated assumption.",
      },
      {
        id: "q2",
        prompt: "Which best distinguishes an assumption from a stated premise in an argument?",
        choices: [
          "An assumption is required for the argument to hold but is never explicitly written down",
          "An assumption is always false",
          "A premise is never written down either",
          "There is no meaningful difference between the two",
        ],
        correctIndex: 0,
        explanation:
          "A premise is stated explicitly; an assumption is an unstated claim the argument's logic still depends on.",
      },
      {
        id: "q3",
        prompt: "What does the negation test check for a candidate assumption?",
        choices: [
          "Whether the argument holds when the assumption is true, and fails when it's false",
          "Whether the assumption is grammatically correct",
          "Whether the assumption is stated in the passage",
          "Whether the conclusion is popular",
        ],
        correctIndex: 0,
        explanation:
          "The negation test specifically checks that flipping the assumption to false breaks the argument -- proving it was load-bearing.",
      },
    ],
    takeaway:
      "Test a candidate assumption by imagining it's false -- if the argument survives anyway, it wasn't the necessary assumption.",
    summary:
      "Arguments rest on unstated assumptions in addition to their explicit premises. The negation test -- checking whether an argument holds with a candidate assumption but fails without it -- is the reliable way to identify which assumption is truly necessary.",
    nextLessonSlug: "non-verbal-reasoning",
  },
  {
    id: "lr-non-verbal-reasoning",
    slug: "non-verbal-reasoning",
    title: "Non-Verbal and Pattern Reasoning",
    description:
      "Continue rotation patterns and apply mirror transformations to structured figure data.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    prerequisites: ["lr-statement-conclusions"],
    objectives: [
      "Continue a constant-step rotation series, wrapping correctly past 360 degrees",
      "Apply a horizontal mirror transformation to a grid-based figure",
      "Distinguish rotation from mirroring as two different transformations",
    ],
    skills: ["logical-reasoning", "non-verbal-reasoning"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["non-verbal reasoning", "pattern reasoning", "mirror image", "rotation series"],
    explanation: `Non-verbal reasoning questions show a sequence of figures instead of words or numbers, and ask you to continue the pattern or identify a transformation. Since a figure can't be typed into a formula directly, the actual skill is describing the figure's properties as data -- angle, count, fill, orientation -- and then reasoning about how that data changes step to step, exactly the same way you'd reason about a number series.

A **rotation series** shows a shape rotating by a constant angle each step: 0 degrees, 90 degrees, 180 degrees, and so on. The same "find the constant step" method from number series applies directly, with one addition: angles wrap at 360 degrees. A step of 90 degrees from 300 degrees doesn't reach 390 degrees; it wraps to 30 degrees.

A **mirror transformation** flips a figure left-to-right (or top-to-bottom), reversing its horizontal (or vertical) orientation without rotating it. This is a completely different operation from rotation, and the two are easy to confuse: a shape rotated 180 degrees can look similar to its mirror image for symmetric shapes, but for an asymmetric shape (like a letter "F" or an arrow), rotation and mirroring produce visibly different results. Representing a row of a figure as an array (say, \`[1, 1, 0]\` for filled-filled-empty) makes a horizontal mirror concrete: reverse the array to get \`[0, 1, 1]\`.

The general lesson: whenever a figure can't be typed directly, describe it with the smallest set of numbers that captures what's changing (an angle, a fill pattern, a count), and the reasoning collapses back to the same series and transformation logic you already know.`,
    example: {
      language: "javascript",
      editable: false,
      description: "Continuing a constant-step rotation series, wrapping past 360 degrees.",
      code: "function nextInRotationSeries(degrees) {\n  const step = degrees[1] - degrees[0];\n  const next = (degrees[degrees.length - 1] + step) % 360;\n  return next < 0 ? next + 360 : next;\n}\n// nextInRotationSeries([300, 330]) -> 0 (wraps past 360)",
    },
    guidedExercise: {
      id: "lr-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write nextInRotationSeries(degrees), an array of angles with a constant step between them. Return the next angle, wrapping correctly if it would reach or exceed 360.",
      starterCode:
        "function nextInRotationSeries(degrees) {\n  // TODO: find the constant step, apply it once more, and wrap at 360\n}\n",
      solutionCode:
        "function nextInRotationSeries(degrees) {\n  const step = degrees[1] - degrees[0];\n  const next = (degrees[degrees.length - 1] + step) % 360;\n  return next < 0 ? next + 360 : next;\n}",
      harness:
        "window.__report('t1', nextInRotationSeries([0, 90, 180]) === 270, 'A constant 90-degree rotation continues to 270.');\nwindow.__report('t2', nextInRotationSeries([300, 330]) === 0, 'A 30-degree step from 330 wraps around to 0.');\nwindow.__report('t3', nextInRotationSeries([0, 45, 90, 135]) === 180, 'A constant 45-degree rotation continues to 180.');",
      tests: [
        { id: "t1", description: "Continues a simple rotation series", hidden: false },
        { id: "t2", description: "Wraps correctly past 360 degrees", hidden: false },
        { id: "t3", description: "Continues a series with a smaller step", hidden: true },
      ],
      hints: [
        "Find the step the same way you would for a number series, using the first two angles.",
        "Apply the step to the last angle in the array, then take the result modulo 360.",
        "JavaScript's % operator can return a value that still needs adjusting if the step were negative -- but for this exercise, angles only increase.",
      ],
    },
    independentExercise: {
      id: "lr-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write mirrorGrid(grid), a 2D array of 0/1 values representing rows of a figure. Return a new grid where every row is reversed (a horizontal mirror), leaving the row order unchanged.",
      starterCode:
        "function mirrorGrid(grid) {\n  // TODO: reverse every row, without changing the order of the rows themselves\n}\n",
      solutionCode:
        "function mirrorGrid(grid) {\n  return grid.map((row) => [...row].reverse());\n}",
      harness:
        "window.__report('t1', JSON.stringify(mirrorGrid([[1, 0, 0]])) === JSON.stringify([[0, 0, 1]]), 'Mirroring a single row reverses its cells.');\nwindow.__report('t2', JSON.stringify(mirrorGrid([[1, 1, 0], [0, 1, 1]])) === JSON.stringify([[0, 1, 1], [1, 1, 0]]), 'Each row mirrors independently.');\nwindow.__report('t3', JSON.stringify(mirrorGrid([])) === JSON.stringify([]), 'An empty grid mirrors to an empty grid.');",
      tests: [
        { id: "t1", description: "Mirrors a single-row figure", hidden: false },
        { id: "t2", description: "Mirrors a multi-row figure, row order preserved", hidden: false },
        { id: "t3", description: "Handles an empty grid", hidden: true },
      ],
      hints: [
        "map() lets you transform every row independently while preserving the overall row order.",
        "Spreading a row into a new array before reversing avoids mutating the original.",
        "A horizontal mirror only reverses each row's contents -- it never changes which row comes first.",
      ],
    },
    commonMistakes: [
      "Confusing a mirror transformation with a 180-degree rotation -- they only look the same for symmetric figures.",
      "Forgetting that rotation angles wrap at 360 degrees.",
      "Trying to reason about a whole figure at once instead of breaking it into the specific properties (angle, fill, count) that are actually changing.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "A shape rotates 60 degrees clockwise at each step: 0 degrees, 60 degrees, 120 degrees, ?",
        choices: ["150 degrees", "180 degrees", "240 degrees", "200 degrees"],
        correctIndex: 1,
        explanation:
          "The constant step is 60 degrees, so the next angle is 120 + 60 = 180 degrees.",
      },
      {
        id: "q2",
        prompt:
          "When a figure is mirrored horizontally, what happens to its left-right orientation?",
        choices: [
          "It reverses, while the figure's vertical position and rotation stay unchanged",
          "It rotates 90 degrees",
          "It stays exactly the same",
          "It becomes a different shape entirely",
        ],
        correctIndex: 0,
        explanation:
          "A horizontal mirror only reverses left-right orientation -- it is a distinct operation from rotation.",
      },
      {
        id: "q3",
        prompt: "Why do learners commonly confuse a mirror image with a 180-degree rotation?",
        choices: [
          "Because for symmetric figures the two operations can produce a visually similar result, even though they are different transformations",
          "Because mirroring and rotating always produce identical results for every figure",
          "Because rotation only applies to circles",
          "Because mirroring changes a figure's angle, not its orientation",
        ],
        correctIndex: 0,
        explanation:
          "Symmetric shapes can look the same after either operation, but for an asymmetric figure the two transformations clearly diverge.",
      },
    ],
    takeaway:
      "Describe a figure with the smallest set of numbers that captures what's actually changing -- the reasoning then works exactly like a series or transformation you already know.",
    summary:
      "Non-verbal reasoning reduces to the same series and transformation logic used elsewhere, once a figure is described as data: rotation series follow a constant angular step (wrapping past 360), while mirroring reverses orientation without rotating.",
    nextLessonSlug: "critical-reasoning",
  },
  {
    id: "lr-critical-reasoning",
    slug: "critical-reasoning",
    title: "Critical Reasoning and Argument Evaluation",
    description:
      "Spot correlation-causation and hasty-generalization fallacies, and evaluate what strengthens an argument.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["lr-non-verbal-reasoning"],
    objectives: [
      "Identify a correlation-causation fallacy in an argument",
      "Identify a hasty generalization from an unreasonably small sample",
      "Determine what kind of new evidence would genuinely strengthen a causal claim",
    ],
    skills: ["logical-reasoning", "critical-reasoning"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: [
      "critical reasoning",
      "logical fallacies",
      "correlation causation",
      "argument evaluation",
    ],
    explanation: `Critical reasoning questions present a short argument and ask you to evaluate it -- find its flaw, or judge what would strengthen or weaken it. Two fallacies show up constantly enough to learn by name.

**Correlation-causation** is claiming that because two things happened together (or one followed the other), one must have caused the other. "Ice cream sales and drowning incidents both rise in summer -- so ice cream causes drowning" is the classic example: both are actually caused by a third factor (warmer weather, more swimming), not by each other. The fix is always the same question: is there a plausible alternative explanation for the correlation that the argument hasn't ruled out?

**Hasty generalization** is drawing a broad conclusion from a sample that's too small or unrepresentative to support it. "I surveyed 4 people and 90% prefer online classes" is a generalization built on a sample of 4 -- nowhere near enough to represent a larger population, even though the percentage sounds precise and authoritative.

Evaluating what **strengthens** or **weakens** an argument follows directly from identifying its gap. If an argument claims causation from correlation, evidence that **rules out the plausible alternative causes**, from a reliable source, genuinely strengthens it -- vague supporting evidence that doesn't address the alternative explanation does not, no matter how relevant it sounds. Evidence that actively points to an alternative cause weakens the argument. The discipline is always the same: name the argument's actual logical gap first, then judge each piece of evidence by whether it closes that specific gap.`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "Flagging the two most common critical-reasoning fallacies from structured argument data.",
      code: "function detectFallacy(argument) {\n  if (argument.claimsCausationFromCorrelation) return 'correlation-causation';\n  if (argument.generalizesFromSample && argument.sampleSize < 5) return 'hasty-generalization';\n  return 'none';\n}\n// detectFallacy({ claimsCausationFromCorrelation: true, sampleSize: 100, generalizesFromSample: false }) -> 'correlation-causation'",
    },
    guidedExercise: {
      id: "lr-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write detectFallacy(argument), where argument is { claimsCausationFromCorrelation, sampleSize, generalizesFromSample }. Return 'correlation-causation' if it claims causation from correlation, else 'hasty-generalization' if it generalizes from a sample smaller than 5, else 'none'.",
      starterCode:
        "function detectFallacy(argument) {\n  // TODO: check for correlation-causation first, then hasty generalization, else 'none'\n}\n",
      solutionCode:
        "function detectFallacy(argument) {\n  if (argument.claimsCausationFromCorrelation) return 'correlation-causation';\n  if (argument.generalizesFromSample && argument.sampleSize < 5) return 'hasty-generalization';\n  return 'none';\n}",
      harness:
        "window.__report('t1', detectFallacy({ claimsCausationFromCorrelation: true, sampleSize: 100, generalizesFromSample: false }) === 'correlation-causation', 'Claiming causation from mere correlation is flagged first.');\nwindow.__report('t2', detectFallacy({ claimsCausationFromCorrelation: false, sampleSize: 3, generalizesFromSample: true }) === 'hasty-generalization', 'Generalizing from a sample of 3 is a hasty generalization.');\nwindow.__report('t3', detectFallacy({ claimsCausationFromCorrelation: false, sampleSize: 500, generalizesFromSample: true }) === 'none', 'Generalizing from a large sample of 500 is not flagged as fallacious here.');",
      tests: [
        { id: "t1", description: "Flags a correlation-causation claim", hidden: false },
        { id: "t2", description: "Flags a hasty generalization from a tiny sample", hidden: false },
        {
          id: "t3",
          description: "Does not flag a generalization from a large sample",
          hidden: true,
        },
      ],
      hints: [
        "Check for the correlation-causation claim first, since it's the more serious flaw.",
        "Only flag hasty generalization if the argument is actually generalizing AND the sample is small.",
        "If neither condition is met, return 'none' -- not every argument is fallacious.",
      ],
    },
    independentExercise: {
      id: "lr-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write strengthensArgument(argument, evidence) where argument is { claimsCausationFromCorrelation } and evidence is { rulesOutAlternativeCause, isFromReliableSource }. Return true only if the argument makes a causal claim AND the evidence both rules out an alternative cause and comes from a reliable source.",
      starterCode:
        "function strengthensArgument(argument, evidence) {\n  // TODO: only a causal claim can be strengthened, and only by evidence that is both reliable and rules out alternatives\n}\n",
      solutionCode:
        "function strengthensArgument(argument, evidence) {\n  if (!argument.claimsCausationFromCorrelation) return false;\n  return evidence.rulesOutAlternativeCause === true && evidence.isFromReliableSource === true;\n}",
      harness:
        "window.__report('t1', strengthensArgument({ claimsCausationFromCorrelation: true }, { rulesOutAlternativeCause: true, isFromReliableSource: true }) === true, 'Ruling out alternative causes from a reliable source genuinely strengthens a causal claim.');\nwindow.__report('t2', strengthensArgument({ claimsCausationFromCorrelation: true }, { rulesOutAlternativeCause: true, isFromReliableSource: false }) === false, 'An unreliable source does not strengthen the claim, even if it rules out alternatives.');\nwindow.__report('t3', strengthensArgument({ claimsCausationFromCorrelation: false }, { rulesOutAlternativeCause: true, isFromReliableSource: true }) === false, 'There is no causal claim here for the evidence to strengthen.');",
      tests: [
        { id: "t1", description: "Confirms genuinely strengthening evidence", hidden: false },
        { id: "t2", description: "Rejects evidence from an unreliable source", hidden: false },
        { id: "t3", description: "Rejects strengthening a non-causal argument", hidden: true },
      ],
      hints: [
        "There has to be a causal claim in the first place for anything to strengthen it.",
        "Both conditions on the evidence matter -- ruling out alternatives from an unreliable source isn't enough.",
        "Use && to require both evidence conditions simultaneously.",
      ],
    },
    commonMistakes: [
      "Assuming correlation implies causation without considering a plausible alternative explanation.",
      "Trusting a percentage or statistic without checking the sample size behind it.",
      "Judging evidence as 'strengthening' just because it's related to the topic, rather than checking whether it actually closes the argument's specific logical gap.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Ice cream sales and drowning incidents both rise in summer. Concluding ice cream causes drowning is an example of which fallacy?",
        choices: [
          "Correlation-causation",
          "Hasty generalization",
          "Circular reasoning",
          "False dilemma",
        ],
        correctIndex: 0,
        explanation:
          "Both are actually caused by a third factor (warm weather), not by each other -- a classic correlation-causation error.",
      },
      {
        id: "q2",
        prompt:
          "A survey of 4 people is used to claim '90% of all students prefer online classes.' What is the primary flaw?",
        choices: [
          "The sample size is far too small to support a conclusion about all students",
          "The percentage math is incorrect",
          "Online classes are not a valid survey topic",
          "The survey should have asked teachers instead",
        ],
        correctIndex: 0,
        explanation:
          "A sample of 4 people cannot reliably represent the preferences of a much larger student population.",
      },
      {
        id: "q3",
        prompt:
          "What kind of evidence would genuinely strengthen a claim that a fitness program caused higher sales?",
        choices: [
          "Evidence that rules out other plausible causes (like a seasonal trend), from a reliable source",
          "Any evidence that is related to fitness programs in general",
          "A larger number of unrelated anecdotes",
          "Restating the original sales figures more emphatically",
        ],
        correctIndex: 0,
        explanation:
          "Only evidence that actually closes the argument's gap -- ruling out alternative causes -- genuinely strengthens a causal claim.",
      },
    ],
    takeaway:
      "Name an argument's specific logical gap before judging any evidence -- only evidence that closes that exact gap actually strengthens it.",
    summary:
      "Correlation-causation fallacies mistake co-occurrence for cause; hasty generalizations draw broad conclusions from too-small samples. Evidence only strengthens an argument when it closes the argument's specific gap, such as ruling out an alternative cause from a reliable source.",
    nextLessonSlug: "mixed-reasoning-practice",
  },
  {
    id: "lr-mixed-reasoning-practice",
    slug: "mixed-reasoning-practice",
    title: "Mixed Reasoning Practice",
    description:
      "Combine seating-arrangement, series, and syllogism techniques in one integrated puzzle.",
    trackSlug: "placement-prep",
    courseSlug: "logical-analytical-reasoning",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["lr-critical-reasoning"],
    objectives: [
      "Combine a seating-arrangement clue check with a series continuation in one integrated solution",
      "Combine a seating-arrangement search with a syllogism validity check",
      "Apply general exam-strategy habits (estimation, elimination, time budgeting) built across this course",
    ],
    skills: ["logical-reasoning", "mixed-reasoning-practice"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["mixed reasoning", "reasoning practice", "exam strategy"],
    explanation: `Real placement tests rarely isolate one technique per question -- a single problem might combine a seating arrangement with a numeric pattern, or a puzzle with a logical deduction. This capstone lesson combines techniques from earlier lessons into single integrated exercises, the same way a real test does.

The good news: combining techniques doesn't require a new method, just applying the *same* checks side by side and keeping their results separate. A clue-satisfaction check (from seating arrangements) and a series continuation (from number series) don't interact with each other -- you compute each independently and report both results together. The discipline that matters is not mixing up which technique answers which part of the question.

A few general strategy habits, built from everything in this course, are worth stating explicitly:

- **Estimate before computing exactly.** If a calculation looks like it should land near a round number, a wildly different answer choice signals an arithmetic slip worth double-checking.
- **Eliminate systematically**, the same way the seating and grouping exercises did -- discard answer choices that violate any stated clue rather than trying to reason your way to the "right-feeling" one.
- **Budget time per question.** A puzzle that seems to need an exhaustive search is a signal to move faster through the technique (as the brute-force exercises did) rather than getting stuck reasoning by hand.

None of this is a claim that finishing this course makes you "certified" or "guaranteed" to succeed on a real test -- it's self-paced practice. What it does build is the specific, transferable habit of translating a described problem into a checkable rule and testing it systematically, which is the actual skill every reasoning question is really measuring.`,
    example: {
      language: "javascript",
      editable: false,
      description:
        "Combining a seating-arrangement clue check with a series continuation in one function.",
      code: "function evaluateMixedPuzzle(order, clues, series) {\n  const arrangementValid = clues.every((clue) => clue(order));\n  const step = series[1] - series[0];\n  const nextInSeries = series[series.length - 1] + step;\n  return { arrangementValid, nextInSeries };\n}",
    },
    guidedExercise: {
      id: "lr-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write evaluateMixedPuzzle(order, clues, series) that returns { arrangementValid, nextInSeries }: arrangementValid is true only if every clue passes for order, and nextInSeries continues the constant-difference series.",
      starterCode:
        "function evaluateMixedPuzzle(order, clues, series) {\n  // TODO: check every clue against order, AND find the next term in series, returning both\n}\n",
      solutionCode:
        "function evaluateMixedPuzzle(order, clues, series) {\n  const arrangementValid = clues.every((clue) => clue(order));\n  const step = series[1] - series[0];\n  const nextInSeries = series[series.length - 1] + step;\n  return { arrangementValid, nextInSeries };\n}",
      harness:
        "const order = ['A', 'B', 'C'];\nwindow.__report('t1', JSON.stringify(evaluateMixedPuzzle(order, [(o) => o.indexOf('A') < o.indexOf('C')], [2, 4, 6, 8])) === JSON.stringify({ arrangementValid: true, nextInSeries: 10 }), 'A before C is satisfied, and the series continues to 10.');\nwindow.__report('t2', JSON.stringify(evaluateMixedPuzzle(order, [(o) => o.indexOf('A') > o.indexOf('C')], [2, 4, 6, 8])) === JSON.stringify({ arrangementValid: false, nextInSeries: 10 }), 'The clue fails even though the series calculation is unaffected.');\nwindow.__report('t3', JSON.stringify(evaluateMixedPuzzle(order, [], [5, 5, 5])) === JSON.stringify({ arrangementValid: true, nextInSeries: 5 }), 'No clues is vacuously valid, and a constant series continues at the same value.');",
      tests: [
        {
          id: "t1",
          description: "Combines a passing clue with a series continuation",
          hidden: false,
        },
        {
          id: "t2",
          description: "Combines a failing clue with an unaffected series result",
          hidden: false,
        },
        { id: "t3", description: "Handles an empty clue list and a constant series", hidden: true },
      ],
      hints: [
        "The two checks (clues and series) are independent -- compute each on its own.",
        "Reuse the exact same clue-checking logic from the seating-arrangements lesson.",
        "Reuse the exact same series-continuation logic from the number-series lesson.",
      ],
    },
    independentExercise: {
      id: "lr-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write solveMixedPuzzle(people, clues, premise1, premise2) that returns { arrangement, syllogismValid }: arrangement is the first permutation of people satisfying every clue (or null), and syllogismValid checks whether premise1 and premise2 (each { type, subject, predicate }) validly chain into an 'All' conclusion.",
      starterCode:
        "function permutations(arr) {\n  if (arr.length <= 1) return [arr];\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];\n    for (const perm of permutations(rest)) result.push([arr[i], ...perm]);\n  }\n  return result;\n}\n\nfunction followsAllAAreC(premise1, premise2) {\n  if (premise1.type !== 'all' || premise2.type !== 'all') return false;\n  return premise1.predicate === premise2.subject;\n}\n\nfunction solveMixedPuzzle(people, clues, premise1, premise2) {\n  // TODO: find the first valid permutation AND check the syllogism, returning both results\n}\n",
      solutionCode:
        "function permutations(arr) {\n  if (arr.length <= 1) return [arr];\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];\n    for (const perm of permutations(rest)) result.push([arr[i], ...perm]);\n  }\n  return result;\n}\n\nfunction followsAllAAreC(premise1, premise2) {\n  if (premise1.type !== 'all' || premise2.type !== 'all') return false;\n  return premise1.predicate === premise2.subject;\n}\n\nfunction solveMixedPuzzle(people, clues, premise1, premise2) {\n  const validOrders = permutations(people).filter((order) => clues.every((c) => c(order)));\n  return {\n    arrangement: validOrders.length > 0 ? validOrders[0] : null,\n    syllogismValid: followsAllAAreC(premise1, premise2),\n  };\n}",
      harness:
        "const people = ['A', 'B'];\nwindow.__report('t1', JSON.stringify(solveMixedPuzzle(people, [(o) => o.indexOf('A') < o.indexOf('B')], { type: 'all', subject: 'X', predicate: 'Y' }, { type: 'all', subject: 'Y', predicate: 'Z' })) === JSON.stringify({ arrangement: ['A', 'B'], syllogismValid: true }), 'Both the seating clue and the syllogism chain resolve correctly together.');\nwindow.__report('t2', JSON.stringify(solveMixedPuzzle(people, [(o) => o.indexOf('A') < o.indexOf('B')], { type: 'all', subject: 'X', predicate: 'Y' }, { type: 'all', subject: 'W', predicate: 'Z' })) === JSON.stringify({ arrangement: ['A', 'B'], syllogismValid: false }), 'The arrangement still resolves even though the syllogism chain is broken.');\nwindow.__report('t3', JSON.stringify(solveMixedPuzzle(people, [(o) => false], { type: 'some', subject: 'X', predicate: 'Y' }, { type: 'all', subject: 'Y', predicate: 'Z' })) === JSON.stringify({ arrangement: null, syllogismValid: false }), 'An impossible clue and an invalid syllogism both correctly fail together.');",
      tests: [
        {
          id: "t1",
          description: "Combines a valid arrangement with a valid syllogism",
          hidden: false,
        },
        {
          id: "t2",
          description: "Combines a valid arrangement with an invalid syllogism",
          hidden: false,
        },
        {
          id: "t3",
          description: "Combines an impossible arrangement with an invalid syllogism",
          hidden: true,
        },
      ],
      hints: [
        "Reuse the permutations and clue-filtering logic from the seating-arrangements lesson for the arrangement part.",
        "Reuse the middle-term check from the syllogisms lesson for the syllogismValid part.",
        "The two results are independent of each other -- compute and return them both, even if one fails.",
      ],
    },
    commonMistakes: [
      "Letting one technique's result influence the other when they are actually independent.",
      "Spending too long on an exhaustive search instead of recognizing when a brute-force check is the fastest path.",
      "Treating a passing structural check as proof of exam-readiness rather than as one data point in ongoing practice.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "A puzzle gives a seating clue and a number series in the same question. Should solving the series ever change which seating arrangement is valid?",
        choices: [
          "No -- the two checks are independent and should be computed separately",
          "Yes -- the series always determines the correct seat numbers",
          "Only if the series has more than 3 terms",
          "Only in circular arrangements",
        ],
        correctIndex: 0,
        explanation:
          "Combined puzzles typically bundle independent techniques together -- solving one does not change the other's answer.",
      },
      {
        id: "q2",
        prompt:
          "A syllogism chain and a seating arrangement appear in the same question, sharing no data between them. What is the safest approach?",
        choices: [
          "Solve each with its own established method and report both results",
          "Assume the syllogism's conclusion determines the seating order",
          "Skip the syllogism since seating is more important",
          "Only solve whichever one appears first in the question",
        ],
        correctIndex: 0,
        explanation:
          "Independent sub-problems inside one question should be solved with their own methods, not merged together.",
      },
      {
        id: "q3",
        prompt:
          "According to this lesson, what should a learner do after passing every check in this capstone?",
        choices: [
          "Consider themselves certified as fully reasoning-ready with nothing left to practice",
          "Continue practicing regularly, since passing structural checks here is one data point, not a guarantee of real-test performance",
          "Stop practicing entirely, since the checks are a complete substitute for real preparation",
          "Assume the platform has officially certified their reasoning ability",
        ],
        correctIndex: 1,
        explanation:
          "This is self-paced practice, not an official or certified assessment -- passing these checks is useful evidence of progress, not a finish line.",
      },
    ],
    takeaway:
      "Combined puzzles are just independent techniques applied side by side -- solve each with its own established method and never let one influence the other.",
    summary:
      "This capstone combines seating-arrangement, series, and syllogism techniques from earlier lessons into single integrated exercises, mirroring how real placement tests mix techniques. It closes with honest framing: these checks demonstrate technique, not certified readiness, and further self-directed practice still matters.",
  },
];
