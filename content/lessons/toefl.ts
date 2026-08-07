import type { LessonInput } from "@/lib/content/types";

/**
 * TOEFL iBT Preparation lessons. Every passage, transcript, and question here
 * is original -- none are copied from real TOEFL material, and none claim
 * affiliation with ETS (Educational Testing Service), which owns the TOEFL
 * trademark (see components/exam-prep/trademark-notice.tsx, rendered on the
 * course page). Reading/Listening lessons place the original passage/
 * transcript directly in `explanation`, then ask genuine comprehension
 * questions about it in `quiz` -- reusing the existing explanation+quiz
 * architecture rather than inventing a parallel one, matching the pattern in
 * content/lessons/ielts.ts. These lessons have no `example`/`guidedExercise`/
 * `independentExercise` (see lib/content/types.ts's Phase 6 note) since there
 * is no honest code exercise for reading comprehension, listening
 * comprehension, or essay/email writing.
 *
 * IMPORTANT format note: TOEFL iBT changed materially on January 21, 2026.
 * These lessons describe the *current* (post-January-2026) test: four
 * sections (Reading, Listening, Speaking, Writing) in that fixed order,
 * roughly 90 minutes total with no scheduled break; multistage-adaptive
 * Reading and Listening; a Speaking section reduced to two spontaneous,
 * no-prep-time tasks (Listen and Repeat, Take an Interview); a Writing
 * section of three short tasks (Build a Sentence, Write an Email, Write for
 * an Academic Discussion) that replaced the old Integrated/Independent essay
 * pair; and a primary 1-6 CEFR-aligned score scale, with a transitional
 * 0-120 comparable score shown for two years. Every fact was verified
 * against ets.org pages during this authoring session (see each lesson's
 * `references`) rather than relied on from pre-2026 training knowledge.
 */
export const toeflLessons: LessonInput[] = [
  {
    id: "toefl-test-format-overview",
    slug: "toefl-test-format-overview",
    title: "TOEFL iBT Test Format Overview",
    description:
      "The four TOEFL iBT sections, their fixed order and timing, and what 'multistage adaptive' means.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Describe the four TOEFL iBT sections, their fixed order, and their approximate timing",
      "Explain what 'multistage adaptive' means for the Reading and Listening sections",
      "State the total test length and confirm there is no scheduled break",
    ],
    skills: ["toefl-format", "toefl-overview"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT test content and section breakdown (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content.html",
      },
      {
        label: "TOEFL Transformation Announcement (ETS press release)",
        url: "https://www.ets.org/news/press-releases/toefl-transformation-announcement.html",
      },
    ],
    keywords: [
      "toefl ibt",
      "toefl format",
      "toefl sections",
      "multistage adaptive",
      "toefl test length",
    ],
    explanation: `TOEFL iBT (Test of English as a Foreign Language, Internet-Based Test) is administered by ETS (Educational Testing Service) and is widely used by universities, and accepted by some immigration and professional bodies, as evidence of academic English proficiency. Since **January 21, 2026**, ETS has run a substantially redesigned version of the test -- shorter, more adaptive, and restructured around more tightly-focused task types than the pre-2026 format most older study guides still describe.

The current test has four sections in a **fixed order**: **Reading** (about 30 minutes), **Listening** (about 29 minutes), **Speaking** (about 8 minutes), and **Writing** (about 23 minutes) -- totaling roughly **90 minutes**, about half the length of the pre-2026 test. There is **no scheduled break** anywhere in the sitting; all four sections run back-to-back in one continuous session.

A genuinely new feature is that the **Reading and Listening sections are now multistage adaptive**: each section is delivered in two modules. Your performance on the first module determines the difficulty of the second module -- test-takers who perform well early on receive a harder second module, while those who struggle receive an easier one. Your final section score is calculated from performance across both modules using a statistical equating method (item response theory), so the scoring accounts fairly for the fact that different test-takers may have seen questions of different difficulty. Speaking and Writing are not modular in this same two-stage sense, but they too were restructured into shorter, more tightly-scoped task types, covered in later modules of this course.

Across the whole test, that's roughly 50 Reading items across three task types, 47 Listening items across four task types, 11 Speaking items across two tasks, and 12 Writing items across three tasks -- all covered section by section later in this course. Because everything happens in one uninterrupted ~90-minute sitting, plan food, water, and restroom needs *before* you start, not during -- there's no built-in pause to rely on. As with every course on this platform, nothing here can predict, simulate, or guarantee an official TOEFL iBT score; this course teaches format and strategy and provides original, self-reviewed practice material.`,
    commonMistakes: [
      "Assuming TOEFL iBT still takes about two hours, and therefore misjudging how much sustained focus the real test now requires in its shorter, unbroken ~90-minute format.",
      "Expecting a scheduled break like the pre-2026 format had, and being caught off guard when Speaking and Writing continue immediately after Listening ends.",
      "Treating the adaptive Reading and Listening modules as irrelevant to strategy, when performance on the first module actually determines the difficulty of the second.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the fixed order of the four TOEFL iBT sections?",
        choices: [
          "Listening, Reading, Writing, Speaking",
          "Reading, Listening, Speaking, Writing",
          "Speaking, Writing, Reading, Listening",
          "Writing, Reading, Listening, Speaking",
        ],
        correctIndex: 1,
        explanation:
          "The current test runs Reading, then Listening, then Speaking, then Writing, in that fixed order.",
      },
      {
        id: "q2",
        prompt: "Approximately how long is the entire TOEFL iBT test, start to finish?",
        choices: ["About 2 hours", "About 3 hours", "About 90 minutes", "About 45 minutes"],
        correctIndex: 2,
        explanation:
          "The redesigned test totals roughly 90 minutes across all four sections combined.",
      },
      {
        id: "q3",
        prompt:
          "What does it mean for the Reading and Listening sections to be 'multistage adaptive'?",
        choices: [
          "Every test-taker sees exactly the same fixed-difficulty questions",
          "A second module's difficulty is adjusted based on performance in the first module",
          "The test length changes randomly with no connection to performance",
          "Only the Listening section adapts; Reading does not",
        ],
        correctIndex: 1,
        explanation:
          "Both Reading and Listening use two modules; the second module's difficulty depends on how the test-taker performed on the first.",
      },
      {
        id: "q4",
        prompt: "Is there a scheduled break during the TOEFL iBT test?",
        choices: [
          "Yes, a 10-minute break after Listening",
          "Yes, but only before the Speaking section",
          "No, there is no scheduled break",
          "Yes, but only for test-takers over a certain age",
        ],
        correctIndex: 2,
        explanation:
          "The current TOEFL iBT runs as one continuous ~90-minute sitting with no scheduled break.",
      },
    ],
    takeaway:
      "TOEFL iBT is now a single, unbroken ~90-minute sitting with adaptive Reading and Listening -- plan your pre-test routine (food, water, restroom) accordingly, since there's no built-in pause once you start.",
    summary:
      "TOEFL iBT runs Reading, Listening, Speaking, then Writing in about 90 minutes total with no scheduled break. Reading and Listening are multistage adaptive, delivered in two modules where the second module's difficulty depends on first-module performance.",
    nextLessonSlug: "toefl-scoring-scale-and-score-reports",
  },
  {
    id: "toefl-scoring-scale-and-score-reports",
    slug: "toefl-scoring-scale-and-score-reports",
    title: "TOEFL iBT Scoring: The 1-6 CEFR-Aligned Scale and Score Reports",
    description:
      "How the current 1-6 scoring scale works, the transitional 0-120 comparable score, and score delivery timing.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain the 1-6 CEFR-aligned scoring scale and how the four section scores combine into an overall score",
      "Describe the transitional 0-120 comparable score and why it currently appears alongside the 1-6 scale",
      "State roughly how quickly official score results are now delivered",
    ],
    skills: ["toefl-format", "toefl-scoring"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT score breakdown -- what your scores mean (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html",
      },
      {
        label: "TOEFL iBT 1-6 score scale update and CEFR alignment (ETS)",
        url: "https://www.ets.org/toefl/institutions/ibt/score-scale-update.html",
      },
    ],
    keywords: [
      "toefl scoring",
      "toefl 1-6 scale",
      "cefr",
      "toefl score report",
      "transitional score",
    ],
    explanation: `As of January 21, 2026, TOEFL iBT score reports use a **1-6 scale, in half-point increments** (1, 1.5, 2, 2.5 ... up to 6), applied to each of the four sections -- Reading, Listening, Speaking, Writing -- and to an overall score. This scale is explicitly aligned to **CEFR** (the Common European Framework of Reference for Languages), the six-level framework (A1, A2, B1, B2, C1, C2) widely used internationally to describe language proficiency. According to ETS's published alignment, roughly: **1-1.5 corresponds to A1, 2-2.5 to A2, 3-3.5 to B1, 4-4.5 to B2, 5-5.5 to C1, and 6 to C2**, applied consistently across every section and the overall score -- unlike the old 0-120 scale, where the numeric range associated with a given CEFR level varied by section, which made cross-section comparison less intuitive.

Your **overall score is the average of your four section scores, rounded to the nearest half band**. For example, if your four section scores average to 5.25, your overall score rounds to 5.5. This works the same way IELTS's overall band rounding does, though the underlying scales differ.

Because so many institutions and immigration systems still reference score requirements written against the old 0-120 scale, ETS is providing a **transitional dual-scale report for two years after January 2026**: alongside your primary 1-6 score, your report will also show a **comparable score on the 0-120 scale**, representing the midpoint of the numeric range that corresponds to your 1-6 result. Treat this 0-120 figure as a temporary reference for institutions still updating their stated requirements, not as your "real" score -- the 1-6 CEFR-aligned scale is the current primary scoring system, and this course frames it that way throughout.

Score delivery is now much faster than the pre-2026 test's 4-8 day wait: **official scores appear in your ETS account approximately three days (about 72 hours) after your test date**, with unofficial Reading and Listening scores shown immediately at the end of the test itself. A downloadable PDF score report typically follows about a day after your official scores post, and a mailed paper copy can take 11-15 days if you request one. As with every course on this platform, no tool here can predict, simulate, or guarantee what your official score will be -- this course's self-review rubrics support honest practice, not score prediction.`,
    commonMistakes: [
      "Treating the transitional 0-120 number as the 'real' score and the 1-6 scale as secondary, when it's the reverse -- the 1-6 scale is now the primary score, and 0-120 is only a temporary comparable figure.",
      "Forgetting that the overall score is a rounded average of all four sections, and assuming one weak section score won't meaningfully affect the overall result.",
      "Assuming score delivery still takes about a week, and therefore not checking your ETS account within the new, much shorter turnaround time.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "On the current TOEFL iBT 1-6 scale, how is the overall score calculated?",
        choices: [
          "The highest of the four section scores",
          "The average of the four section scores, rounded to the nearest half band",
          "The Writing and Speaking scores only",
          "A fixed pass/fail cutoff of 4.0",
        ],
        correctIndex: 1,
        explanation:
          "The overall score is the average of Reading, Listening, Speaking, and Writing scores, rounded to the nearest half band.",
      },
      {
        id: "q2",
        prompt:
          "If a test-taker's four section scores average to 5.25, what overall score appears on their report?",
        choices: ["5.0", "5.25", "5.5", "6.0"],
        correctIndex: 2,
        explanation: "5.25 rounds to the nearest half band, which is 5.5.",
      },
      {
        id: "q3",
        prompt:
          "What is the purpose of the transitional 0-120 comparable score shown for two years after January 2026?",
        choices: [
          "It replaces the 1-6 scale as the primary score",
          "It gives institutions still using old 0-120 cutoffs a comparable reference figure while they update their requirements",
          "It is a bonus score with no real meaning",
          "It only applies to test-takers who score below a 3 on the 1-6 scale",
        ],
        correctIndex: 1,
        explanation:
          "The 0-120 figure is a temporary comparable reference for institutions still transitioning their stated requirements -- the 1-6 scale is primary.",
      },
      {
        id: "q4",
        prompt:
          "Roughly how long after test day are official TOEFL iBT scores now available in a test-taker's ETS account?",
        choices: [
          "About 72 hours (three days)",
          "Immediately, for all four sections",
          "4-8 days",
          "Around one month",
        ],
        correctIndex: 0,
        explanation:
          "Official scores now typically post to the test-taker's ETS account roughly three days after the test date.",
      },
    ],
    takeaway:
      "The 1-6 CEFR-aligned scale is now the primary TOEFL iBT score; treat any 0-120 comparable figure as a temporary transitional reference, and expect official results roughly three days after your test date.",
    summary:
      "TOEFL iBT now reports a primary 1-6 CEFR-aligned score per section plus an overall average, rounded to the nearest half band. A transitional 0-120 comparable score appears for two years for institutions still using the old scale, and official results now arrive in about 72 hours.",
    nextLessonSlug: "toefl-reading-format-and-strategy",
  },
  {
    id: "toefl-reading-format-and-strategy",
    slug: "toefl-reading-format-and-strategy",
    title: "TOEFL iBT Reading: Task Types and Strategy",
    description:
      "The three TOEFL iBT Reading task types, how adaptive difficulty applies, and how to budget your time.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 20,
    objectives: [
      "Describe the three TOEFL iBT Reading task types and what each one measures",
      "Explain how multistage adaptive difficulty applies specifically to Reading",
      "Apply a basic time-budgeting approach across roughly 50 items in about 30 minutes",
    ],
    skills: ["toefl-reading"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Reading section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/reading.html",
      },
    ],
    keywords: [
      "toefl reading",
      "complete the words",
      "read in daily life",
      "read an academic passage",
      "adaptive reading",
    ],
    explanation: `TOEFL iBT Reading now uses three distinct task types within one roughly 30-minute, roughly 50-item section: **Complete the Words** (fill in partially missing letters in a short text, testing vocabulary knowledge and the ability to infer meaning from surrounding context), **Read in Daily Life** (short everyday texts -- notices, schedules, messages -- testing understanding of main ideas, key details, and implied meaning), and **Read an Academic Passage** (university-level material testing main ideas, supporting details, and important vocabulary). This is a real departure from the pre-2026 format's three long, uninterrupted academic passages -- Reading is now intentionally more varied and shorter per item, closer to a mix of real-world and academic reading tasks than one long comprehension exercise.

The section is **multistage adaptive**: you complete an initial module of items, and your performance on that module determines whether your second module leans harder or easier. There's no way to "game" this deliberately -- the best approach is simply answering every item as accurately as you can, regardless of whether early items feel easy or hard, since the adaptive engine is designed to place every test-taker at an appropriately challenging level either way.

For time budgeting: about 30 minutes for roughly 50 items works out to well under a minute per item on average, but items vary hugely in length and demand. A Complete the Words item is short and vocabulary-focused; a Read an Academic Passage item involves a longer text and more analytical questions. Don't let a short item eat time meant for a longer one, and if you're genuinely stuck on a single item, make your best answer and move on rather than losing time you'll need later in the section.

Below is a short original passage in the Read an Academic Passage style. Practice applying main-idea and detail comprehension to it, alongside two format-recall questions.

---

**Passage (original, academic style -- bioluminescence in deep-sea organisms):**

Bioluminescence -- the production of light by a living organism through a chemical reaction -- is remarkably common among deep-sea species, appearing in an estimated three-quarters of animals living below 500 meters. Unlike terrestrial fireflies, which use bioluminescence primarily for mate attraction, many deep-sea organisms rely on it for a wider range of purposes: luring prey with a glowing lure, startling a predator with a sudden flash, or even communicating with members of their own species in near-total darkness. The chemical basis of the light -- a reaction between a light-emitting molecule called luciferin and an enzyme called luciferase -- is broadly similar across many unrelated species, a pattern that has intrigued biologists because bioluminescence appears to have evolved independently, multiple separate times, rather than descending from a single common ancestor. Researchers studying this convergent evolution argue that the deep sea's near-total absence of sunlight created unusually strong, repeated pressure toward the same basic biochemical solution, even in lineages with no close evolutionary relationship to one another.`,
    commonMistakes: [
      "Treating all three Reading task types as equally long, and spending as much time on a short Complete the Words item as on a full Read an Academic Passage item.",
      "Assuming an early 'easy-feeling' item means you're doing poorly, when multistage adaptive Reading simply presents a first module before adjusting difficulty for the second.",
      "Answering Complete the Words items purely from a memorized vocabulary list, without using the surrounding sentence context the task is specifically designed to test.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "According to the passage, deep-sea organisms use bioluminescence for which purpose, unlike most terrestrial fireflies?",
        choices: [
          "Only mate attraction",
          "A wider range of purposes, such as luring prey or startling predators",
          "Warming their bodies in cold water",
          "Camouflage against predators",
        ],
        correctIndex: 1,
        explanation:
          "The passage contrasts fireflies (mainly mate attraction) with deep-sea organisms, which use bioluminescence for luring prey, startling predators, and communication.",
      },
      {
        id: "q2",
        prompt:
          "What do researchers find notable about bioluminescence's chemical basis across many unrelated deep-sea species?",
        choices: [
          "It differs completely from species to species",
          "It's broadly similar despite evolving independently multiple times, rather than from a shared ancestor",
          "It only exists in a single species",
          "It has never been chemically analyzed",
        ],
        correctIndex: 1,
        explanation:
          "The passage highlights convergent evolution: a similar chemical solution arose independently, multiple times, in unrelated lineages.",
      },
      {
        id: "q3",
        prompt:
          "Which TOEFL iBT Reading task type asks you to fill in partially missing letters in a short text?",
        choices: [
          "Read an Academic Passage",
          "Read in Daily Life",
          "Complete the Words",
          "Listen and Repeat",
        ],
        correctIndex: 2,
        explanation:
          "Complete the Words tests vocabulary knowledge and context inference by having you fill in partially missing letters.",
      },
      {
        id: "q4",
        prompt:
          "Approximately how many items appear in the TOEFL iBT Reading section, in about 30 minutes?",
        choices: ["12", "50", "90", "150"],
        correctIndex: 1,
        explanation: "The current Reading section is roughly 50 items across its three task types.",
      },
    ],
    takeaway:
      "Recognize which of the three Reading task types you're facing and budget your time accordingly, since Complete the Words, Read in Daily Life, and Read an Academic Passage items differ significantly in length and demands.",
    summary:
      "TOEFL iBT Reading now uses three task types (Complete the Words, Read in Daily Life, Read an Academic Passage) in one multistage adaptive, roughly 30-minute, roughly 50-item section, requiring different time budgets per item type.",
    nextLessonSlug: "toefl-reading-practice-academic-passage",
  },
  {
    id: "toefl-reading-practice-academic-passage",
    slug: "toefl-reading-practice-academic-passage",
    title: "TOEFL iBT Reading Practice: Main Idea, Detail, and Inference",
    description:
      "A deeper practice set on Read an Academic Passage-style comprehension using an original passage.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Apply main idea, supporting detail, and inference comprehension skills to an original academic-style passage",
      "Use surrounding context to determine the meaning of a word as tested by vocabulary-in-context questions",
      "Practice distinguishing a passage's central claim from a supporting example",
    ],
    skills: ["toefl-reading"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Reading section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/reading.html",
      },
    ],
    keywords: ["toefl reading practice", "main idea", "inference", "vocabulary in context"],
    explanation: `Read an Academic Passage items test more than surface-level recall: they ask you to identify a passage's **main idea** (its central claim), distinguish that claim from the **supporting details** and examples used to back it up, infer meaning you weren't told directly, and determine a word's meaning from how it's actually **used in context** rather than its most common dictionary definition. A common trap is treating one vivid supporting example as if it were the passage's whole point, when it's really just one piece of evidence for a broader claim.

Below is an original academic-style passage. Practice all four skills against it.

---

**Passage (original, academic style -- genetic evidence and the domestication of maize):**

Maize, known outside North America as corn, presents one of the most thoroughly documented case studies in plant domestication. Genetic and archaeological evidence now converges on a single origin: a wild grass called teosinte, native to the Balsas River valley in what is now southern Mexico, domesticated roughly nine thousand years ago. This convergence was not always so clear. Through much of the twentieth century, teosinte's candidacy was widely doubted, largely because its physical appearance differs dramatically from modern maize -- teosinte produces a handful of small, hard kernels enclosed in a tough casing, while maize produces hundreds of soft, exposed kernels packed onto a single large cob. Some researchers instead proposed that maize descended from an unidentified, now-extinct wild ancestor, reasoning that the anatomical gap between teosinte and maize was too large to have been closed by early farmers selecting among naturally occurring variants.

Genetic research beginning in the 1930s, and expanded dramatically by DNA sequencing techniques from the 1990s onward, eventually settled the debate. Researchers identified a small number of genes -- particularly one now called teosinte branched1 -- where a handful of mutations produce outsized effects on plant architecture, including the number and arrangement of kernels. This finding mattered because it demonstrated that the dramatic visual difference between teosinte and maize did not require thousands of small genetic changes; a comparatively small number of mutations, each with a large effect, could plausibly have been selected by early farmers over a few hundred generations, well within the timeframe archaeological evidence suggests domestication took.

This case is now frequently cited in introductory genetics courses specifically because it illustrates how a small number of genes with disproportionately large effects can produce rapid, dramatic change under selection -- a pattern that runs counter to an older assumption that major anatomical shifts must always accumulate gradually through many genes of small effect.`,
    commonMistakes: [
      "Confusing a passage's central claim with one of its supporting examples, such as treating the teosinte branched1 gene detail as the main idea rather than as evidence for it.",
      "Guessing a vocabulary-in-context meaning from the word's most common everyday definition, instead of how the passage actually uses it in that specific sentence.",
      "Skipping a passage's final paragraph, which is often where TOEFL academic passages state the broader significance or implication of the specific case discussed.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the main idea of the passage as a whole?",
        choices: [
          "Teosinte is now extinct in the wild",
          "Genetic evidence resolved a long-standing debate about maize's origin and revealed how a few high-impact gene mutations enabled rapid domestication",
          "Maize is more nutritious than teosinte",
          "DNA sequencing was invented specifically to study maize",
        ],
        correctIndex: 1,
        explanation:
          "The passage's overall point is that genetics settled the origin debate and explained how domestication happened so quickly, via a few large-effect genes.",
      },
      {
        id: "q2",
        prompt:
          "According to the passage, why did many twentieth-century researchers doubt that teosinte was maize's ancestor?",
        choices: [
          "Teosinte had never been found growing in Mexico",
          "Teosinte's appearance differs dramatically from maize's, seeming too large a gap to close through selection alone",
          "Teosinte and maize are the same species",
          "No genetic testing methods existed at the time",
        ],
        correctIndex: 1,
        explanation:
          "The passage states doubt stemmed from teosinte's very different kernel structure and appearance compared with maize.",
      },
      {
        id: "q3",
        prompt: "As used in the passage, the phrase 'outsized effects' most nearly means:",
        choices: [
          "No effect at all",
          "Effects far larger than would be expected from such a small genetic change",
          "Effects limited only to kernel color",
          "Effects that only appear after thousands of years",
        ],
        correctIndex: 1,
        explanation:
          "In context, 'outsized effects' describes mutations whose impact on plant architecture is disproportionately large relative to how few genes were involved.",
      },
      {
        id: "q4",
        prompt:
          "What does the passage suggest about an older assumption in genetics that this case challenges?",
        choices: [
          "That major anatomical change always requires many genes of small effect, accumulating gradually",
          "That plant domestication never involves genetic change",
          "That teosinte and maize are genetically identical",
          "That archaeological evidence is more reliable than genetic evidence",
        ],
        correctIndex: 0,
        explanation:
          "The final paragraph states the case runs counter to the older assumption that big anatomical shifts must accumulate through many small-effect genes.",
      },
    ],
    takeaway:
      "Separate a passage's central claim from its supporting evidence, and always verify a vocabulary-in-context answer against how the word is used in that specific sentence, not its most common dictionary meaning.",
    summary:
      "Read an Academic Passage items test main idea, supporting detail, inference, and vocabulary in context together. Distinguishing a central claim from its supporting examples, and checking context rather than a word's default meaning, are the two highest-leverage skills.",
    nextLessonSlug: "toefl-listening-format-and-strategy",
  },
  {
    id: "toefl-listening-format-and-strategy",
    slug: "toefl-listening-format-and-strategy",
    title: "TOEFL iBT Listening: Task Types and Note-Taking Strategy",
    description:
      "The four TOEFL iBT Listening task types, adaptive difficulty, and a note-taking approach for short audio clips.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 4,
    difficulty: "beginner",
    estimatedMinutes: 20,
    objectives: [
      "Describe the four TOEFL iBT Listening task types and what each one involves",
      "Explain how multistage adaptive difficulty applies to Listening",
      "Apply a note-taking strategy suited to short, focused audio clips rather than long lecture-style recordings",
    ],
    skills: ["toefl-listening"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Listening section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/listening.html",
      },
    ],
    keywords: [
      "toefl listening",
      "listen to an academic talk",
      "listen to a conversation",
      "adaptive listening",
      "note-taking",
    ],
    explanation: `TOEFL iBT Listening now uses four task types within one roughly 29-minute, roughly 47-item section: **Listen and Choose a Response** (hear a spoken prompt and choose the most appropriate response), **Listen to a Conversation** (a conversation primarily related to campus life), **Listen to an Announcement** (an announcement in an academic or campus setting), and **Listen to an Academic Talk** (a short talk given by a professor or expert). The section uses short, focused audio clips rather than the long, multi-minute lecture recordings the pre-2026 format relied on. You may hear native-speaker accents from North America, the UK, New Zealand, or Australia, and note-taking is permitted throughout.

Like Reading, the section is **multistage adaptive**: you complete an initial module, and your performance on it determines whether your second module leans harder or easier, with your final score reflecting both modules together.

Because clips are now shorter and more tightly focused than the older format, an elaborate note-taking system built for a five-minute lecture is often more trouble than it's worth. Instead, jot key nouns, numbers, and relationships as you listen, quickly note the setting and who's speaking (a student and an advisor? a professor giving an announcement?), and be ready to answer immediately once a clip ends -- there's little to no dead time built in to reorganize your notes before questions appear.

Below is a short original transcript in the Listen to an Announcement style. Practice comprehension alongside two format-recall questions.

---

**Transcript (original -- library study room closure announcement):**

Attention students: due to a scheduling conflict with the facilities team, the North Library's study rooms will be unavailable this Thursday and Friday for routine maintenance. Students who already reserved a room during that window will automatically be moved to the West Library, which has agreed to open two additional rooms to cover the extra demand. If your original reservation time doesn't work with the West Library's current hours, you can rebook online, though we'd recommend doing so soon, since availability is expected to fill quickly. One more note: this closure does not affect the North Library's main reading area or the reference desk, both of which remain open on their usual schedule throughout the week.`,
    commonMistakes: [
      "Using an elaborate note-taking system built for long lecture-style recordings, when TOEFL iBT Listening now uses shorter, more focused audio clips.",
      "Assuming strong performance on early Listening items has no effect on later item difficulty, when multistage adaptive Listening adjusts the second module based on first-module performance.",
      "Missing a specific detail a question asks about because notes weren't organized by speaker or topic as the clip played.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "According to the announcement, which part of the North Library remains open during the closure?",
        choices: [
          "Nothing -- the entire library closes",
          "The main reading area and the reference desk",
          "Only the study rooms",
          "Only the West Library's rooms",
        ],
        correctIndex: 1,
        explanation:
          "The announcement specifies the closure affects only the study rooms, while the main reading area and reference desk stay open as usual.",
      },
      {
        id: "q2",
        prompt:
          "What should a student do if their original study room reservation time doesn't work at the West Library?",
        choices: [
          "Nothing can be done",
          "Rebook online soon, since availability is expected to fill quickly",
          "Wait until Thursday to resolve it in person",
          "Cancel their reservation permanently",
        ],
        correctIndex: 1,
        explanation:
          "The announcement recommends rebooking online soon, since West Library availability is expected to fill quickly.",
      },
      {
        id: "q3",
        prompt:
          "Which TOEFL iBT Listening task type involves a short talk given by a professor or expert?",
        choices: [
          "Listen and Choose a Response",
          "Listen to a Conversation",
          "Listen to an Academic Talk",
          "Listen to an Announcement",
        ],
        correctIndex: 2,
        explanation:
          "Listen to an Academic Talk is specifically a short talk from a professor or expert.",
      },
      {
        id: "q4",
        prompt:
          "Roughly how many items appear in the TOEFL iBT Listening section, in about 29 minutes?",
        choices: ["11", "47", "90", "150"],
        correctIndex: 1,
        explanation:
          "The current Listening section is roughly 47 items across its four task types.",
      },
    ],
    takeaway:
      "Match your note-taking approach to the actual format -- short, focused clips reward quick, targeted notes on key facts and relationships, not an elaborate outline built for a long lecture.",
    summary:
      "TOEFL iBT Listening now uses four task types across one multistage adaptive, roughly 29-minute, roughly 47-item section, built from short audio clips that reward quick, targeted note-taking over elaborate lecture-style systems.",
    nextLessonSlug: "toefl-listening-practice-academic-talk",
  },
  {
    id: "toefl-listening-practice-academic-talk",
    slug: "toefl-listening-practice-academic-talk",
    title: "TOEFL iBT Listening Practice: Following an Academic Talk",
    description:
      "A deeper practice set on Listen to an Academic Talk-style comprehension using an original transcript.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Apply comprehension skills to an original Listen to an Academic Talk-style transcript",
      "Distinguish a speaker's main point from illustrative supporting examples",
      "Identify what a specific piece of evidence is functioning to support within a longer talk",
    ],
    skills: ["toefl-listening"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Listening section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/listening.html",
      },
    ],
    keywords: ["toefl listening practice", "academic talk", "main point vs example"],
    explanation: `A longer academic talk usually makes one overall argument, developed through several pieces of supporting evidence. The most common comprehension mistake is treating one memorable example as if it *were* the speaker's whole point, rather than recognizing it as one piece of support for a broader claim. Practicing this distinction on a longer transcript builds the same skill the real Listen to an Academic Talk task requires.

Below is an original transcript. Practice identifying the speaker's overall argument, distinguishing it from supporting examples, and following how the talk develops.

---

**Transcript (original -- academic talk on migratory bird navigation):**

Professor: Today I want to talk briefly about how migratory birds manage to navigate over thousands of kilometers, often returning to the very same nesting site year after year. For a long time, researchers assumed birds relied mainly on visual landmarks -- coastlines, mountain ranges, that sort of thing. And landmarks clearly do matter, especially for shorter trips. But landmark-based navigation alone can't explain how birds cross open ocean at night, or how young birds manage their very first migration without ever having seen the route before.

So what else is going on? One well-supported idea involves the Earth's magnetic field. Experiments have shown that certain birds can detect small variations in magnetic field strength and angle, essentially giving them an internal compass. There's also strong evidence for celestial cues -- some species appear to calibrate their sense of direction using the position of stars around sunset, before it's fully dark. And a third factor, often underappreciated, is smell: some species, particularly certain seabirds, seem to build something like an odor map of their home region, which helps guide them back to a very specific nesting location once they're already in the general area.

The current consensus isn't that birds rely on just one of these systems, but that different species -- and possibly even the same individual bird at different stages of a journey -- combine several of these cues, cross-checking one against another. A bird might use the magnetic field for the broad direction of travel, celestial cues to fine-tune that heading at dusk, and smell only in the final approach to a precise, familiar location.`,
    commonMistakes: [
      "Treating one supporting example -- such as the magnetic field experiments -- as the professor's entire point, rather than one piece of a larger, combined-cues argument.",
      "Missing a shift in the talk's focus (from 'why landmarks alone are insufficient' to 'what else birds might use') because it wasn't marked by an obvious transition word.",
      "Relying on memory alone for a longer academic talk, instead of jotting a few key nouns per new idea as the speaker introduces it.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the professor's main point about how migratory birds navigate?",
        choices: [
          "Birds rely entirely on visual landmarks",
          "Birds likely combine multiple navigational cues -- magnetic, celestial, and olfactory -- rather than relying on just one",
          "Only seabirds are capable of long-distance migration",
          "Bird navigation remains completely unexplained by science",
        ],
        correctIndex: 1,
        explanation:
          "The talk's overall argument, stated most clearly in the final paragraph, is that birds combine several navigational cues rather than depending on one.",
      },
      {
        id: "q2",
        prompt:
          "Why does the professor say landmark-based navigation alone can't fully explain migration?",
        choices: [
          "Because landmarks don't exist over open ocean",
          "It can't account for crossing open ocean at night or a young bird's first-ever migration",
          "Because landmarks change too quickly year to year",
          "Because only mammals can perceive landmarks",
        ],
        correctIndex: 1,
        explanation:
          "The professor gives these two specific limitations of landmark-only navigation early in the talk.",
      },
      {
        id: "q3",
        prompt: "According to the talk, when does smell seem to matter most for navigation?",
        choices: [
          "For the entire journey, from start to finish",
          "Only for very short trips",
          "In the final approach to a specific, familiar nesting location",
          "Only before sunset, alongside celestial cues",
        ],
        correctIndex: 2,
        explanation:
          "The professor describes smell as most useful in the final approach to a precise, familiar location.",
      },
      {
        id: "q4",
        prompt:
          "The professor's mention of magnetic field detection experiments functions mainly as:",
        choices: [
          "The professor's single, complete explanation for all bird navigation",
          "Supporting evidence for one of several combined navigational cues, not the professor's only claim",
          "A counterexample the professor ultimately rejects",
          "An unrelated aside with no connection to the main argument",
        ],
        correctIndex: 1,
        explanation:
          "The magnetic field experiments support one piece of the broader combined-cues argument, not a standalone conclusion.",
      },
    ],
    takeaway:
      "Identify a speaker's overall argument first, then treat individual examples and pieces of evidence as support for that argument rather than as separate main points.",
    summary:
      "Following a longer academic talk means tracking the overall argument as it develops through multiple supporting examples, and recognizing when a specific piece of evidence is illustrating a broader claim rather than standing alone.",
    nextLessonSlug: "toefl-speaking-listen-and-repeat",
  },
  {
    id: "toefl-speaking-listen-and-repeat",
    slug: "toefl-speaking-listen-and-repeat",
    title: "TOEFL iBT Speaking: Listen and Repeat",
    description:
      "The Listen and Repeat task format, what it measures, and how to handle it with zero prep time.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 6,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Describe the Listen and Repeat task format and what it's designed to measure",
      "Apply a strategy for accurately repeating a sentence heard only once, with no preparation time",
      "Understand the general scoring focus (fluency and intelligibility) behind this task",
    ],
    skills: ["toefl-speaking"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Speaking section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/speaking.html",
      },
    ],
    keywords: ["toefl speaking", "listen and repeat", "toefl speaking task 1"],
    explanation: `TOEFL iBT Speaking was substantially redesigned alongside the rest of the test: it's now just two tasks totaling about 8 minutes and 11 items, a significant reduction from the pre-2026 format's four tasks and roughly 17-20 minutes. The first task, **Listen and Repeat**, plays a short sentence tied to an on-screen picture (often a campus or community location) that you must repeat exactly, after hearing it only once, with no preparation time. Reporting on the current format describes the task as presenting several sentences that grow progressively more complex, contributing to the section's 11-item total alongside the second task. ETS describes this task as measuring your ability to process spoken English and produce speech that is accurate and clearly intelligible.

Because there's no prep time and the sentence plays only once, the most effective strategy is to **listen for the sentence's overall meaning and structure**, rather than trying to mentally transcribe it word-for-word as it plays -- there simply isn't time to do both. Once it ends, reproduce it as a complete, natural-sounding sentence. If you mishear or forget one word, it's generally better to produce a complete sentence that stays as close as possible to what you heard than to freeze or repeat only a fragment, since the task rewards fluent, intelligible speech, not a frozen attempt at word-perfect recall.

Scoring for TOEFL iBT Speaking generally covers constructs like fluency, intelligibility, language use, and organization. As with every self-review tool on this platform, nothing here claims to replicate ETS's own scoring -- the Speaking self-review tool on this course's exam-practice page gives you a rubric to honestly assess your own recorded response against, not an automated score.

Practice this task using the Speaking self-review tool on this course's exam-practice page.`,
    commonMistakes: [
      "Trying to write down the sentence word-for-word as it plays, instead of listening for its overall meaning and structure, since there's no time to both write and process it.",
      "Freezing or giving up entirely after mishearing one word, rather than producing a complete, natural sentence that stays as close as possible to what was heard.",
      "Practicing only with slow, simple sentences and never with more complex ones, given the task is described as growing progressively more difficult.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What must a test-taker do in the Listen and Repeat task?",
        choices: [
          "Summarize a sentence in their own words",
          "Listen to a short sentence and repeat it exactly, after hearing it only once",
          "Translate a sentence into another language",
          "Write the sentence down instead of speaking it",
        ],
        correctIndex: 1,
        explanation:
          "The task requires an exact spoken repetition of a sentence heard a single time.",
      },
      {
        id: "q2",
        prompt: "How much preparation time is given before responding in Listen and Repeat?",
        choices: [
          "30 seconds",
          "1 minute",
          "None -- the response must be spontaneous",
          "It varies based on sentence length",
        ],
        correctIndex: 2,
        explanation: "Listen and Repeat gives no preparation time; the response must be immediate.",
      },
      {
        id: "q3",
        prompt:
          "If a test-taker mishears one word mid-sentence, what is generally the better strategy?",
        choices: [
          "Stay silent until the next task begins",
          "Produce a complete, natural-sounding sentence as close as possible to what was heard, rather than freezing",
          "Repeat only the words that were heard clearly and stop there",
          "Ask for the sentence to be replayed",
        ],
        correctIndex: 1,
        explanation:
          "A complete, fluent attempt close to the original is generally better than freezing or stopping early.",
      },
      {
        id: "q4",
        prompt:
          "What does the Listen and Repeat task primarily measure, according to ETS's description?",
        choices: [
          "Creative storytelling ability",
          "Processing spoken English and producing accurate, intelligible speech",
          "Formal essay-writing skill",
          "Reading comprehension speed",
        ],
        correctIndex: 1,
        explanation:
          "ETS describes the task as measuring the ability to process spoken English and produce accurate, clearly intelligible speech.",
      },
    ],
    takeaway:
      "Listen for a sentence's overall meaning and structure rather than trying to transcribe it mentally word-for-word, then reproduce it as a complete, natural sentence.",
    summary:
      "Listen and Repeat requires reproducing a sentence heard once, with zero preparation time. Listening for overall meaning rather than exact wording, and completing a natural sentence rather than freezing, are the two most useful habits.",
    nextLessonSlug: "toefl-speaking-take-an-interview",
  },
  {
    id: "toefl-speaking-take-an-interview",
    slug: "toefl-speaking-take-an-interview",
    title: "TOEFL iBT Speaking: Take an Interview",
    description:
      "The Take an Interview task format and how to give a complete, relevant 45-second spontaneous answer.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Describe the Take an Interview task format and its typical topic types",
      "Apply a strategy for giving a complete, relevant 45-second spontaneous answer with no preparation time",
      "Avoid the most common content and delivery mistakes in this task",
    ],
    skills: ["toefl-speaking"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Speaking section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/speaking.html",
      },
    ],
    keywords: ["toefl speaking", "take an interview", "toefl speaking task 2"],
    explanation: `The second Speaking task, **Take an Interview**, is described by ETS as a simulated interview related to academic or campus situations. You're asked a series of questions about a given topic and given about 45 seconds to answer each one, with no specialized background knowledge required and, like Listen and Repeat, no preparation time. This is a real departure from the pre-2026 format's scripted independent-opinion monologue -- it's framed as a genuine, real-time conversational exchange rather than a prepared speech.

Because there's no separate prep time, a strong approach is to **begin speaking almost immediately with a direct answer to the actual question**, then use the rest of the 45 seconds to add one or two supporting reasons, details, or examples. Pausing to silently plan a "perfect" answer wastes seconds you can't get back, since the clock runs through any silence. Treat the exchange as a real, natural conversation -- a slightly informal, conversational register fits better than a rehearsed, essay-like tone -- and make sure you're actually answering the specific question asked, not pivoting to an unrelated topic you'd rather talk about.

Scoring dimensions for TOEFL iBT Speaking generally include fluency, intelligibility, language use, and organization -- and organization specifically includes **relevancy**: whether your answer actually addresses the question asked. A fluent, grammatically clean answer to the wrong question still loses ground here, so staying on-topic matters as much as speaking smoothly.

Practice this task using the Speaking self-review tool on this course's exam-practice page.`,
    commonMistakes: [
      "Pausing silently to mentally plan a 'perfect' answer, which wastes seconds off the fixed 45-second response window since there is no separate prep time.",
      "Giving a technically fluent answer that doesn't actually address the specific interview question asked, which costs points on the relevancy component of organization.",
      "Treating the task like a formal prepared speech instead of a natural, conversational interview response.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How much time does a test-taker have to answer each Take an Interview question?",
        choices: ["15 seconds", "45 seconds", "2 minutes", "There is no time limit"],
        correctIndex: 1,
        explanation: "Each Take an Interview question allows about 45 seconds for a response.",
      },
      {
        id: "q2",
        prompt:
          "Why is it usually a mistake to pause silently before answering in Take an Interview?",
        choices: [
          "Silence is against the rules and ends the task early",
          "There's no separate prep time, so silent planning uses up the fixed 45-second response window",
          "The microphone turns off after 5 seconds of silence",
          "It has no negative effect at all",
        ],
        correctIndex: 1,
        explanation:
          "Because there's no separate prep time, any silent planning eats directly into the 45-second response window.",
      },
      {
        id: "q3",
        prompt:
          "What does the organization scoring component specifically include, making direct relevance important?",
        choices: [
          "Handwriting neatness",
          "Relevancy -- whether the answer actually addresses the question asked",
          "The total number of words spoken",
          "Whether the response uses a formal, essay-like register",
        ],
        correctIndex: 1,
        explanation:
          "Relevancy -- directly addressing the question -- is part of the organization dimension.",
      },
      {
        id: "q4",
        prompt: "What kind of topics does Take an Interview typically use?",
        choices: [
          "Highly technical, specialist subjects",
          "Familiar academic or campus-life situations that require no specialized background knowledge",
          "Only current international news events",
          "Personal financial information",
        ],
        correctIndex: 1,
        explanation:
          "ETS describes the task's topics as familiar academic/campus situations requiring no specialized background knowledge.",
      },
    ],
    takeaway:
      "Start answering immediately with a direct response to the actual question, then use the rest of the 45 seconds to add supporting detail -- don't spend response time on silent planning.",
    summary:
      "Take an Interview asks for a spontaneous, relevant 45-second answer to an interview-style question, with no prep time -- direct, on-topic answers with supporting detail outperform pauses or off-topic responses.",
    nextLessonSlug: "toefl-speaking-delivery-and-pronunciation",
  },
  {
    id: "toefl-speaking-delivery-and-pronunciation",
    slug: "toefl-speaking-delivery-and-pronunciation",
    title: "Speaking Delivery: Pacing, Stress, and Practicing for Zero Prep Time",
    description:
      "Pronunciation, pacing, and a realistic practice routine for a Speaking section with no preparation time at all.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Apply techniques for clear pronunciation, natural pacing, and sentence-level stress under a no-prep-time format",
      "Explain why both tasks reward genuinely spontaneous, unscripted speech rather than rehearsed answers",
      "Build a realistic practice routine for a section that never gives preparation time",
    ],
    skills: ["toefl-speaking"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Speaking section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/speaking.html",
      },
    ],
    keywords: ["toefl speaking strategy", "pronunciation", "pacing", "spontaneous speech"],
    explanation: `Both current TOEFL iBT Speaking tasks share a defining trait: **zero preparation time**. Responses are meant to be spontaneous and natural, not planned or rehearsed in advance. This is a deliberate design choice, and it shifts the core skill you need away from carefully pre-structuring a response (a habit built for the pre-2026 format's prep-time tasks) and toward genuine real-time spoken fluency -- producing clear, natural-sounding English on demand, immediately.

A few delivery habits make a real difference under this format. **Clear articulation of word endings** matters -- many learners drop final consonants under time pressure, which reduces intelligibility even when vocabulary and grammar are otherwise strong. **Natural sentence stress** -- emphasizing content words (nouns, verbs, key adjectives) rather than every syllable equally -- makes speech easier to follow and sounds more natural than flat, evenly-stressed delivery. A **steady pace** beats rushing: speaking faster under time pressure usually reduces clarity rather than making a response sound more fluent. And **thinking in phrases** -- grouping a few words into a natural spoken chunk rather than producing them one word at a time -- tends to improve both fluency and intonation simultaneously, since it mirrors how natural speech is actually organized.

Because TOEFL iBT Speaking scoring generally covers fluency, intelligibility, language use, and organization across both tasks, the most realistic preparation is practicing genuinely spontaneous, unscripted speech regularly -- not reading a prepared script aloud, which builds a skill the actual no-prep-time format doesn't test. A useful routine: pick a random, unplanned prompt, give yourself zero preparation time (matching the real task), and record your response with a phone to notice recurring pronunciation or pacing habits you might not otherwise catch.

Use the Speaking self-review tool on this course's exam-practice page for structured, rubric-based self-assessment of your recorded responses. As with every tool on this platform, this is a self-review checklist, not an automated or predictive score.`,
    commonMistakes: [
      "Practicing exclusively with scripts memorized in advance, which builds a skill the actual no-prep-time Speaking format doesn't test.",
      "Speaking too quickly under time pressure, which usually reduces clarity and intelligibility rather than making the response sound more fluent.",
      "Focusing only on individual word pronunciation while ignoring natural sentence-level stress and phrasing, which affects intelligibility just as much.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What do both current TOEFL iBT Speaking tasks have in common regarding preparation time?",
        choices: [
          "Both give one minute of prep time",
          "Neither gives any preparation time -- responses must be spontaneous",
          "Only Take an Interview gives prep time",
          "Prep time varies randomly by test session",
        ],
        correctIndex: 1,
        explanation:
          "Both Listen and Repeat and Take an Interview require an immediate, unplanned response.",
      },
      {
        id: "q2",
        prompt: "What effect does speaking too quickly under time pressure usually have?",
        choices: [
          "It always improves the fluency score",
          "It usually reduces clarity and intelligibility rather than improving fluency",
          "It has no measurable effect on scoring",
          "It shortens the required response length appropriately",
        ],
        correctIndex: 1,
        explanation:
          "Rushing typically hurts clarity and intelligibility more than it helps perceived fluency.",
      },
      {
        id: "q3",
        prompt:
          "What is a more realistic way to practice for a no-prep-time speaking format than reading memorized scripts aloud?",
        choices: [
          "Practicing genuinely spontaneous, unscripted responses to timed prompts",
          "Memorizing longer and longer scripts",
          "Only practicing written essays instead",
          "Avoiding speaking practice until test day",
        ],
        correctIndex: 0,
        explanation:
          "Spontaneous, unscripted practice matches the real task's demands far better than reciting memorized material.",
      },
      {
        id: "q4",
        prompt:
          "Which of these is part of natural spoken delivery that affects intelligibility beyond individual word pronunciation?",
        choices: [
          "Sentence-level stress and phrasing",
          "The color of the on-screen picture during Listen and Repeat",
          "Typing speed",
          "The total number of words memorized in advance",
        ],
        correctIndex: 0,
        explanation:
          "Natural sentence-level stress and phrasing meaningfully affect how clear and intelligible speech sounds, beyond individual word pronunciation.",
      },
    ],
    takeaway:
      "Since both Speaking tasks require an immediate, unscripted response, the most useful practice is genuinely spontaneous timed practice, not memorized scripts -- and steady, clearly-stressed delivery beats rushing.",
    summary:
      "Both current Speaking tasks give zero preparation time, rewarding genuine real-time fluency over rehearsed delivery. Clear word endings, natural sentence stress, steady pacing, and phrase-level thinking all support intelligibility, and practice should mirror the real no-prep-time format.",
    nextLessonSlug: "toefl-writing-build-a-sentence-and-email",
  },
  {
    id: "toefl-writing-build-a-sentence-and-email",
    slug: "toefl-writing-build-a-sentence-and-email",
    title: "TOEFL iBT Writing: Build a Sentence and Write an Email",
    description:
      "The Build a Sentence grammar task and the Write an Email practical-communication task, and how to approach each.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Describe the Build a Sentence task and the grammar skills it tests",
      "Describe the Write an Email task's purpose, structure, and general timing",
      "Apply appropriate tone and completeness to a short, practical email response",
    ],
    skills: ["toefl-writing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Writing section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html",
      },
    ],
    keywords: ["toefl writing", "build a sentence", "write an email", "toefl writing tasks"],
    explanation: `TOEFL iBT Writing now totals about 23 minutes and 12 items across three tasks: **Build a Sentence**, **Write an Email**, and **Write for an Academic Discussion** (covered in the next lesson). This replaced the pre-2026 format's two long essays (an integrated reading-listening-writing task and an independent essay) with a set of shorter, more tightly-focused tasks.

**Build a Sentence** shows you words or phrases in scrambled order and asks you to arrange them into a single, complete, grammatically correct sentence or question. Unlike the other two Writing tasks, this one tests grammar and sentence structure directly rather than broader written composition -- there's no argument to build or opinion to express, just correct sentence construction from the pieces given.

**Write an Email** gives you an academic or social situation -- making a request, giving information, proposing a solution to a problem -- and asks you to write a real, practical email response. Reporting on the current format commonly describes this task as taking around 7 minutes with an expected length in the neighborhood of 80-120 words, though exact figures can vary by specific prompt. Structure matters here: state your purpose in the first sentence or two rather than working up to it gradually the way an essay might, include every piece of information the situation actually requires, and match your tone to the relationship (a request to a professor differs from a note to a classmate).

For **Build a Sentence**, a reliable strategy is to identify the sentence's main verb first, then arrange the subject, object, and modifiers around it -- watch for words that only fit one grammatical role (a word that functions only as an adverb, for instance) since these can anchor the rest of the sentence. For **Write an Email**, state your purpose immediately, and treat any missing required detail (a date, a reason, a specific requested action) as an incomplete response, since leaving out something the situation calls for is a common way otherwise well-written emails fall short.

Practice Write an Email using the Writing self-review tool on this course's exam-practice page.`,
    commonMistakes: [
      "Treating Build a Sentence like a puzzle with only one possible word order, when more than one grammatically valid arrangement may exist -- the goal is producing a correct sentence, not guessing a single 'intended' order.",
      "Writing an email that's overly long or essay-like, when the task calls for a short, practical, purpose-driven message.",
      "Forgetting to include a specific piece of information the prompt's situation requires (such as a date, reason, or requested action), leaving the email's purpose unclear or incomplete.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does the Build a Sentence task ask a test-taker to do?",
        choices: [
          "Write a full paragraph from scratch",
          "Rearrange scrambled words or phrases into a single grammatically correct sentence or question",
          "Correct spelling errors in a passage",
          "Translate a sentence into another language",
        ],
        correctIndex: 1,
        explanation:
          "Build a Sentence tests grammar and sentence structure by having you reorder given words/phrases into one correct sentence.",
      },
      {
        id: "q2",
        prompt: "What kind of situations does the Write an Email task use as prompts?",
        choices: [
          "Purely fictional creative-writing scenarios",
          "Academic or social situations, such as making a request or proposing a solution",
          "Only formal business contracts",
          "Personal diary entries",
        ],
        correctIndex: 1,
        explanation:
          "ETS describes Write an Email prompts as academic or social situations like requests or proposals.",
      },
      {
        id: "q3",
        prompt: "Which of these is generally a better strategy for the Write an Email task?",
        choices: [
          "Building up to your purpose gradually across several paragraphs",
          "Stating your purpose immediately rather than building up to it gradually",
          "Omitting the greeting and closing entirely",
          "Writing as long a response as possible regardless of the prompt's needs",
        ],
        correctIndex: 1,
        explanation:
          "Since the task is short and practical, stating the purpose early works better than an essay-style gradual build-up.",
      },
      {
        id: "q4",
        prompt: "What does Build a Sentence primarily measure, compared with Write an Email?",
        choices: [
          "Grammar and sentence structure specifically, rather than broader written communication",
          "Creative storytelling ability",
          "Reading comprehension speed",
          "Spoken pronunciation",
        ],
        correctIndex: 0,
        explanation:
          "Build a Sentence isolates grammar/structure, while Write an Email tests broader practical written communication.",
      },
    ],
    takeaway:
      "Build a Sentence rewards grammatical accuracy in a single sentence; Write an Email rewards a short, complete, purpose-driven practical message -- don't treat the email like a mini-essay.",
    summary:
      "TOEFL iBT Writing now includes Build a Sentence (grammar/structure) and Write an Email (short, practical, purpose-driven communication) among its three tasks, each rewarding a distinct and different writing skill.",
    nextLessonSlug: "toefl-writing-for-academic-discussion",
  },
  {
    id: "toefl-writing-for-academic-discussion",
    slug: "toefl-writing-for-academic-discussion",
    title: "TOEFL iBT Writing: Write for an Academic Discussion",
    description:
      "Structuring a Write for an Academic Discussion post that clearly states and supports an opinion.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Describe the Write for an Academic Discussion task and its online-classroom-discussion format",
      "Structure a response that clearly states and supports an opinion within a short time limit",
      "Apply a strategy for briefly engaging with a classmate's post where relevant",
    ],
    skills: ["toefl-writing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Writing section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html",
      },
    ],
    keywords: [
      "toefl writing",
      "write for an academic discussion",
      "discussion board task",
      "opinion writing",
    ],
    explanation: `The third Writing task, **Write for an Academic Discussion**, asks you -- in ETS's own words -- to "contribute to an online classroom discussion by stating and supporting your opinion." You're shown a professor's discussion prompt, typically along with a brief post from a classmate, and asked to write your own post continuing the discussion, commonly within around 10 minutes. Notably, this task actually predates the January 2026 redesign: ETS introduced it in July 2023 to replace the older standalone independent essay, and it's the one Writing task carried forward unchanged into the current format -- which also makes it the most-documented and most-studied of the three current Writing tasks.

A strong response **states a clear position early** -- agree, disagree, or a specific stance on the discussion question -- and **supports it with at least one concrete reason or example**, rather than a vague generalization. Because this is genuinely framed as a discussion rather than an isolated essay, it also helps to briefly engage with what the classmate's post said: agreeing with it, disagreeing with it, or adding a distinct angle it didn't cover. A response that reads as though it never noticed the other post can undersell the organization and relevance side of how these responses are assessed.

Given the short time limit, aim for a **tight, well-organized paragraph or two**: one clear stance with one or two well-developed supporting points beats several shallow, underdeveloped ones. This is a genuinely different goal from Writing Task 2 in courses built around older essay-based English tests -- there's no room, and no expectation, for a full multi-paragraph essay here.

Below is an original practice prompt in this style.

---

**Discussion prompt (original):**

*Professor's post:* Our topic this week is the role of social media in local civic engagement. Some argue social media makes it easier than ever for community members to organize around local issues -- petitions, local town-hall reminders, neighborhood safety alerts. Others argue it mostly amplifies outrage and misinformation rather than genuine civic participation. What's your view: does social media, on balance, strengthen or weaken civic engagement at the local level? Post your response.

*Classmate (Priya):* I think it strengthens engagement -- our neighborhood's community garden project only got enough volunteers because someone posted about it in a local group chat that reached people who'd never have heard about it otherwise.

Practice writing your own response using the Writing self-review tool on this course's exam-practice page, which includes this task with its own rubric.`,
    commonMistakes: [
      "Writing a well-organized post that never actually states a clear personal position on the discussion question, leaving your stance ambiguous.",
      "Ignoring the classmate's post entirely, when briefly engaging with it (agreeing, disagreeing, or adding a distinct angle) reflects that this is genuinely a discussion, not an isolated essay.",
      "Attempting to develop three or four separate points in a roughly 10-minute task, resulting in several shallow points instead of one or two well-supported ones.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What must a Write for an Academic Discussion response do, according to ETS's own task description?",
        choices: [
          "Summarize the professor's post without adding an opinion",
          "Contribute to an online classroom discussion by stating and supporting an opinion",
          "List every possible viewpoint on the topic",
          "Correct grammar errors in the classmate's post",
        ],
        correctIndex: 1,
        explanation:
          "ETS's own description frames the task as contributing an opinion, stated and supported, to an online discussion.",
      },
      {
        id: "q2",
        prompt: "Since when has the Write for an Academic Discussion task existed on TOEFL iBT?",
        choices: [
          "It's entirely new as of January 2026",
          "Since July 2023, when it replaced the old independent essay, and it carried forward into the 2026 redesign",
          "Since the test's original launch decades ago",
          "It was removed in the January 2026 redesign",
        ],
        correctIndex: 1,
        explanation:
          "The task was introduced in July 2023 and is the one Writing task retained unchanged in the 2026 update.",
      },
      {
        id: "q3",
        prompt:
          "Why does briefly engaging with a classmate's post (agreeing, disagreeing, or adding an angle) generally strengthen a response?",
        choices: [
          "It's required for the response to count as any length at all",
          "It reflects that the task is genuinely a discussion, supporting the organization and relevance side of the response",
          "It replaces the need to state your own opinion",
          "It has no effect either way",
        ],
        correctIndex: 1,
        explanation:
          "Engaging with the discussion context, not just the prompt in isolation, reflects the task's genuinely discussion-based framing.",
      },
      {
        id: "q4",
        prompt: "Given the task's short time limit, which structure works best?",
        choices: [
          "A full five-paragraph essay with an introduction and conclusion",
          "A clear stance with one or two well-developed supporting points, not several shallow ones",
          "A list of unrelated facts about the topic",
          "No stated position, only a summary of both sides",
        ],
        correctIndex: 1,
        explanation:
          "A short, focused response with one or two well-developed points fits the task's time limit far better than a longer essay structure.",
      },
    ],
    takeaway:
      "State a clear position early, support it with at least one concrete reason, and briefly acknowledge the discussion context -- depth on one or two points beats a scattered list.",
    summary:
      "Write for an Academic Discussion asks for a short, opinion-based post responding to a professor's prompt and a classmate's post. A clear stance, concrete support, and brief engagement with the discussion context outperform a longer, unfocused response.",
    nextLessonSlug: "toefl-writing-strategy-and-time-management",
  },
  {
    id: "toefl-writing-strategy-and-time-management",
    slug: "toefl-writing-strategy-and-time-management",
    title: "TOEFL iBT Writing: Time Management Across All Three Tasks",
    description:
      "Building a realistic time budget across Build a Sentence, Write an Email, and Write for an Academic Discussion.",
    trackSlug: "exam-preparation",
    courseSlug: "toefl-ibt-preparation",
    order: 11,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Build a realistic time budget across all three Writing tasks within the roughly 23-minute section",
      "Apply a targeted proofreading routine that fits within tight per-task time limits",
      "Identify which Writing task rewards which specific skill, to focus practice time efficiently",
    ],
    skills: ["toefl-writing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      {
        label: "TOEFL iBT Writing section (ETS)",
        url: "https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html",
      },
    ],
    keywords: ["toefl writing strategy", "time management", "proofreading"],
    explanation: `TOEFL iBT Writing now spans roughly 23 minutes and 12 items across three distinct tasks: Build a Sentence (grammar/sentence structure), Write an Email (short, practical, purpose-driven communication, roughly 7 minutes), and Write for an Academic Discussion (a focused opinion post, roughly 10 minutes). Unlike the pre-2026 format's two long essays, which gave you roughly 50 minutes of largely self-managed composition time, the current section is built from three separate tasks, each with its own tighter time allowance -- there's no long, uninterrupted drafting period anywhere in the current Writing section.

The most important time-management principle follows directly from that structure: **treat the three tasks as separate sprints, not one flexible 23-minute pool you manage yourself**. Don't over-invest time or mental energy in Build a Sentence items at the expense of the two written-response tasks -- individual grammar-reordering items are unlikely to carry the same scoring weight as a full written response, so protecting your time and focus for Write an Email and Write for an Academic Discussion is generally the higher-value choice when something has to give.

Within Write an Email and Write for an Academic Discussion specifically, a **narrow, targeted proofreading pass** fits the time limits far better than an open-ended full re-edit. With roughly the last 60-90 seconds of each task, check three specific things only: (1) does the response actually answer or address the prompt, (2) is your purpose or stance clear within the first sentence or two, and (3) is there any obvious grammar slip that changes the meaning of a sentence. A focused check like this is realistic under time pressure in a way that an unstructured "read it all again" pass usually isn't.

For ongoing practice, match your study time to what each task actually rewards: Build a Sentence rewards grammar automaticity, best built through regular general grammar practice rather than last-minute cramming; Write an Email rewards concise, practical real-world writing, practiced by regularly writing short, purpose-driven messages; and Write for an Academic Discussion rewards quickly forming and defending a clear position, practiced through timed short-opinion drills. As with every course on this platform, none of this predicts or guarantees an official score -- use the Writing self-review tool on this course's exam-practice page to keep practicing honestly against a real rubric.`,
    commonMistakes: [
      "Managing all roughly 23 minutes as one flexible pool, when each Writing task actually has its own fixed, separate time allowance to budget within.",
      "Attempting a full, open-ended proofread of a short written response, when time realistically only allows a narrow, targeted check of a few specific things.",
      "Practicing only one Writing task type repeatedly (often Write for an Academic Discussion, since it's the most essay-like) while neglecting Build a Sentence grammar practice and Write an Email's practical tone.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "How does the current roughly 23-minute Writing section's time structure differ from the pre-2026 format?",
        choices: [
          "It's identical -- one long, self-managed block of time",
          "Each task has its own separate, tighter time allowance, rather than one long block for extended essay drafting",
          "The current format has more total time than before",
          "There is no time limit in the current format",
        ],
        correctIndex: 1,
        explanation:
          "The current section splits time across three separate tasks rather than one long self-managed drafting period.",
      },
      {
        id: "q2",
        prompt:
          "What is a realistic final proofreading check for Write an Email or Write for an Academic Discussion, given the time limit?",
        choices: [
          "A full, open-ended re-edit of the entire response",
          "A narrow check of a few specific things -- relevance, clear purpose/stance, and obvious grammar slips -- not a full re-edit",
          "Skipping proofreading entirely to save time",
          "Rewriting the response from scratch",
        ],
        correctIndex: 1,
        explanation:
          "A short, targeted check of a few key things fits realistically within the tight per-task time limits.",
      },
      {
        id: "q3",
        prompt:
          "Which skill does Build a Sentence most directly reward, and how is it best built over time?",
        choices: [
          "Persuasive essay structure, best built through essay drafting",
          "Grammar automaticity, best built through ongoing general grammar practice rather than last-minute cramming",
          "Vocabulary memorization, best built through flashcards the night before the test",
          "Pronunciation, best built through recorded speaking practice",
        ],
        correctIndex: 1,
        explanation:
          "Build a Sentence tests grammar/structure specifically, which is best developed through consistent practice over time.",
      },
      {
        id: "q4",
        prompt: "What is a common preparation mistake across the three Writing tasks?",
        choices: [
          "Practicing all three tasks equally",
          "Practicing only the most essay-like task (Write for an Academic Discussion) while neglecting Build a Sentence and Write an Email",
          "Using the self-review rubric too often",
          "Writing responses that are too short for Write an Email",
        ],
        correctIndex: 1,
        explanation:
          "Focusing preparation only on the most essay-like task leaves the other two tasks' distinct skills underdeveloped.",
      },
    ],
    takeaway:
      "Budget each Writing task's time separately rather than as one flexible pool, and reserve a short, targeted proofreading pass -- not a full re-edit -- for the two written-response tasks.",
    summary:
      "TOEFL iBT Writing's roughly 23 minutes split across three tasks, each needing its own time budget rather than shared, flexible time. Targeted proofreading and practice matched to each task's specific skill (grammar, practical writing, or opinion-building) make preparation time count.",
  },
];
