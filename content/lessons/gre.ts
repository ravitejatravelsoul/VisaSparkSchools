import type { LessonInput } from "@/lib/content/types";

/**
 * GRE General Test Preparation lessons. Every passage and short argument here
 * is original -- none are copied from real GRE material, and none claim
 * affiliation with ETS (Educational Testing Service), the organization that
 * administers the GRE (see components/exam-prep/trademark-notice.tsx,
 * rendered on the course page). Reading/critical-reasoning lessons place the
 * original passage or argument directly in `explanation`, then ask genuine
 * comprehension/reasoning questions about it in `quiz` -- reusing the
 * existing explanation+quiz architecture, matching content/lessons/ielts.ts.
 * The GRE General Test has no speaking section at all (Verbal Reasoning,
 * Quantitative Reasoning, and Analytical Writing only), so unlike the IELTS
 * course there is no Speaking module here.
 *
 * These lessons have no `example`/`guidedExercise`/`independentExercise`
 * (see lib/content/types.ts's Phase 6 note) since there is no honest code
 * exercise for verbal reasoning, quantitative reasoning strategy, or essay
 * writing that would faithfully model the real GRE skill being taught.
 */
export const greLessons: LessonInput[] = [
  {
    id: "gre-test-overview-and-format",
    slug: "gre-test-overview-and-format",
    title: "GRE General Test Overview and Format",
    description:
      "What the GRE measures, its five sections, and how the exam is structured overall.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "List the GRE General Test's five sections in order and their general purpose",
      "Describe the overall test length and computer-delivered format",
      "Explain the test's no-negative-marking policy and its implication for guessing",
    ],
    skills: ["gre-format", "gre-overview"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE General Test", url: "https://www.ets.org/gre/" }],
    keywords: ["gre", "gre format", "gre general test", "analytical writing verbal quantitative"],
    explanation: `The GRE (Graduate Record Examinations) General Test is administered by ETS (Educational Testing Service) and used by many graduate and business school programs as one piece of an admissions file among several -- transcripts, recommendations, and personal statements typically all matter alongside it, and no single score is ever the whole story. The test measures three skill areas: Verbal Reasoning, Quantitative Reasoning, and Analytical Writing.

The computer-delivered GRE takes approximately **1 hour 58 minutes** in total and consists of **five sections**: one Analytical Writing section, two Verbal Reasoning sections, and two Quantitative Reasoning sections. Unlike IELTS or TOEFL, there is **no Listening or Speaking section at all** -- the GRE is not primarily an English-proficiency test, though Verbal Reasoning does draw on advanced academic vocabulary and reading skill.

Two rules shape how you should approach the test. First, there is **no negative marking**: incorrect answers are never subtracted from your score, so leaving a question blank is strictly worse than guessing. Second, **you cannot return to a previous section** once you've moved on to the next one, but within your current section you generally can move freely between its questions and use "mark and review" to flag a question and revisit it later, as long as time remains in that section.

This course teaches the test's structure and practical strategy for each question type. It never claims, and cannot claim, to predict, simulate, or guarantee any specific official GRE score -- only ETS administers and scores the real exam.`,
    commonMistakes: [
      "Assuming a wrong answer costs points and becoming overly cautious with pacing, when in fact there is no negative marking on the GRE.",
      "Believing you can return to an earlier section after choosing to move on -- once you leave a section, it is final.",
      "Not realizing that you can generally move between questions within your current section using mark-and-review before time runs out.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many total sections make up the computer-delivered GRE General Test?",
        choices: ["Four", "Five", "Six", "Three"],
        correctIndex: 1,
        explanation:
          "The GRE has five sections: one Analytical Writing, two Verbal Reasoning, and two Quantitative Reasoning.",
      },
      {
        id: "q2",
        prompt: "What is the approximate total testing time for the GRE General Test?",
        choices: ["45 minutes", "1 hour 58 minutes", "3 hours", "4 hours 30 minutes"],
        correctIndex: 1,
        explanation: "The full computer-delivered test runs approximately 1 hour 58 minutes.",
      },
      {
        id: "q3",
        prompt: "Does the GRE subtract points for incorrect answers?",
        choices: [
          "Yes, one point per wrong answer",
          "No -- there is no negative marking, so guessing is never penalized",
          "Only in the Quantitative Reasoning sections",
          "Only on the final section of the test",
        ],
        correctIndex: 1,
        explanation:
          "The GRE has no negative marking anywhere on the test, so an incorrect guess never costs points.",
      },
      {
        id: "q4",
        prompt: "Once you move on from a section, can you return to it later in the test?",
        choices: [
          "Yes, at any point before the whole test ends",
          "No -- you cannot return to a previous section once you've moved on from it",
          "Only if you finish the rest of the test early",
          "Only for the Analytical Writing section",
        ],
        correctIndex: 1,
        explanation:
          "Section order is one-directional: once you leave a section, you cannot go back to it, though you can move within your current section.",
      },
    ],
    takeaway:
      "The GRE has five sections in about two hours, no penalty for wrong answers, and section order that only moves forward -- know these rules before you build any deeper strategy.",
    summary:
      "The GRE General Test (ETS) measures Verbal Reasoning, Quantitative Reasoning, and Analytical Writing across five sections in roughly 1h58m, with no negative marking and no return to a completed section.",
    nextLessonSlug: "gre-scoring-and-adaptive-testing",
  },
  {
    id: "gre-scoring-and-adaptive-testing",
    slug: "gre-scoring-and-adaptive-testing",
    title: "GRE Scoring and Section-Level Adaptive Testing",
    description:
      "The 130-170 and 0-6 scoring scales, and how the GRE adapts difficulty at the section level.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "State the GRE scoring scales for Verbal Reasoning, Quantitative Reasoning, and Analytical Writing",
      "Explain what section-level adaptive testing means on the GRE",
      "Describe why performance on the first Verbal or Quantitative section affects the second",
    ],
    skills: ["gre-scoring", "gre-adaptive-testing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Scores", url: "https://www.ets.org/gre/" }],
    keywords: ["gre scoring", "gre adaptive test", "130-170 scale", "section-level adaptive"],
    explanation: `Verbal Reasoning and Quantitative Reasoning are each scored on a **130-170 scale**, in 1-point increments, and reported as two separate scores rather than combined into one number. Analytical Writing is scored separately on a **0-6 scale**, in half-point increments, by trained human raters (typically alongside an automated scoring check). There is no single combined "total" score the way some older testing formats produced -- programs generally look at your Verbal, Quantitative, and Writing scores individually.

The GRE uses **section-level adaptive testing**: the difficulty of your *second* Verbal Reasoning section depends on how you performed on your *first* Verbal Reasoning section, and the same relationship holds between your two Quantitative Reasoning sections. This is different from item-level (question-by-question) adaptive testing, where every single question's difficulty shifts based on your immediately preceding answer -- the GRE only adjusts difficulty once, between the two sections of the same type.

The practical implication is significant: because the difficulty pool of your second section is set by your first-section performance, and harder questions generally contribute more to a higher scaled score, your effort and care on the *first* Verbal (or Quantitative) section has an outsized effect on your overall score ceiling for that skill area -- not just because of the raw number of questions you get right, but because it determines what range of difficulty, and therefore what range of possible scores, is even reachable in your second section.

VisaSparkSchools does not have access to ETS's proprietary scoring conversion tables and does not claim to predict, simulate, or guarantee any specific official GRE score -- this course teaches the mechanics and strategy, not a scoring shortcut.`,
    commonMistakes: [
      "Treating the GRE as item-by-item adaptive (adjusting after every single question), when it is actually adaptive only at the section level.",
      "Rushing carelessly through the first Verbal or Quantitative section without realizing it shapes the difficulty of the second section of that type.",
      "Confusing the Verbal/Quantitative 130-170 scale with the separate Analytical Writing 0-6 scale.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the score range for GRE Verbal Reasoning?",
        choices: ["0 to 6", "130 to 170", "200 to 800", "1 to 100"],
        correctIndex: 1,
        explanation: "Verbal Reasoning (like Quantitative Reasoning) is scored on a 130-170 scale.",
      },
      {
        id: "q2",
        prompt: "What is the score range and increment used for Analytical Writing?",
        choices: [
          "130 to 170 in 1-point increments",
          "0 to 6 in half-point increments",
          "0 to 100 in 5-point increments",
          "1 to 10 in whole-point increments",
        ],
        correctIndex: 1,
        explanation:
          "Analytical Writing uses a separate 0-6 scale, scored in half-point increments.",
      },
      {
        id: "q3",
        prompt: "What does 'section-level adaptive' mean on the GRE?",
        choices: [
          "Each individual question's difficulty adapts based on the previous question you answered",
          "The difficulty of your second Verbal (or Quantitative) section depends on your performance in the first section of that same type",
          "The whole test adapts based on your intended graduate program",
          "There is no adaptivity anywhere on the test",
        ],
        correctIndex: 1,
        explanation:
          "Adaptivity on the GRE happens once, between the two sections of the same skill area -- not question by question.",
      },
      {
        id: "q4",
        prompt:
          "Beyond its own raw score, why does performance on the first Quantitative Reasoning section matter?",
        choices: [
          "It has no effect on anything beyond its own score",
          "It determines the difficulty pool -- and therefore the score ceiling -- available in the second Quantitative Reasoning section",
          "It determines which Analytical Writing prompt you receive",
          "It changes the total number of sections in the test",
        ],
        correctIndex: 1,
        explanation:
          "Because the second section's difficulty (and thus its scoring potential) is set by first-section performance, the first section carries outsized weight.",
      },
    ],
    takeaway:
      "Verbal and Quantitative are each scored 130-170, Analytical Writing is scored 0-6, and every question in your first Verbal or Quantitative section matters more than it might seem, since it shapes the difficulty of your second section of that type.",
    summary:
      "GRE scoring uses a 130-170 scale for Verbal and Quantitative Reasoning and a 0-6 scale for Analytical Writing. Section-level adaptivity means the first section of each reasoning type sets the difficulty range for the second.",
    nextLessonSlug: "gre-verbal-text-completion",
  },
  {
    id: "gre-verbal-text-completion",
    slug: "gre-verbal-text-completion",
    title: "Verbal Reasoning: Text Completion Strategy",
    description:
      "How Text Completion questions work and how to predict the missing word before looking at choices.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 2,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Describe the Text Completion format, including its one-to-three-blank structure and all-or-nothing scoring",
      "Apply a strategy of predicting your own word for each blank before evaluating the answer choices",
      "Recognize how signal words like 'however' or 'therefore' indicate the logical relationship around a blank",
    ],
    skills: ["gre-verbal", "gre-text-completion"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Verbal Reasoning", url: "https://www.ets.org/gre/" }],
    keywords: ["gre text completion", "gre verbal reasoning", "vocabulary in context"],
    explanation: `Text Completion questions present a sentence or short passage with one, two, or three blanks. Each blank has its own set of answer choices (typically three per blank, or five when there is only one blank), and you must fill every blank correctly to receive credit -- there is **no partial credit** for getting some but not all blanks right on a multi-blank question.

The most reliable strategy is to read the entire sentence first and **predict your own word or idea** for each blank based purely on the surrounding context, before you even look at the answer choices. Then scan the choices for the one that most closely matches your prediction. This order matters: looking at the choices first often causes test-takers to be pulled toward a tempting-sounding word that doesn't actually fit the sentence's logic.

Pay close attention to **signal words**, since they tell you the logical relationship the blank must complete. Contrast words -- "however," "although," "despite," "yet" -- signal that the blank should oppose or contrast with an idea stated elsewhere in the sentence. Continuation words -- "therefore," "moreover," "similarly," "since" -- signal that the blank should align with or reinforce that idea instead. Spotting these words quickly narrows your prediction considerably.

Consider this original practice sentence: "Although the committee had initially seemed ________ to the proposal, its members grew increasingly receptive after hearing the revised budget figures." The word "Although" signals a contrast with "receptive," so the blank needs a word meaning something like *resistant* or *opposed* -- the opposite of how the committee later became.`,
    commonMistakes: [
      "Reading only the words immediately next to the blank instead of the whole sentence's logic and signal words.",
      "Choosing an answer that sounds sophisticated or unfamiliar rather than one that actually matches the logic signaled by words like 'although' or 'therefore'.",
      "On multi-blank questions, filling in blanks independently without checking that the whole sentence still makes coherent sense once all blanks are filled together.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "In the sentence 'Although the committee had initially seemed ________ to the proposal, its members grew increasingly receptive after hearing the revised budget figures,' what kind of word best fits the blank?",
        choices: [
          "A word meaning enthusiastic",
          "A word meaning resistant or opposed, since 'although' signals a contrast with 'receptive'",
          "A word meaning irrelevant to the topic",
          "A word describing an early meeting time",
        ],
        correctIndex: 1,
        explanation:
          "'Although' signals contrast with 'receptive,' so the blank needs a word meaning roughly the opposite -- resistant or opposed.",
      },
      {
        id: "q2",
        prompt:
          "For a Text Completion question with two blanks, how much credit do you earn if you fill in only one of the two blanks correctly?",
        choices: [
          "Half credit for the one correct blank",
          "No credit -- every blank in the question must be correct together",
          "Full credit, since one correct answer is enough",
          "It depends on which of the two blanks you got right",
        ],
        correctIndex: 1,
        explanation:
          "Text Completion questions are scored all-or-nothing: every blank in the question must be filled correctly to receive credit.",
      },
      {
        id: "q3",
        prompt:
          "Which type of signal word indicates that a blank should reinforce or continue an idea stated earlier in the sentence, rather than oppose it?",
        choices: [
          "Contrast words like 'however' or 'despite'",
          "Continuation words like 'therefore' or 'moreover'",
          "Question words like 'why' or 'how'",
          "Time markers like 'yesterday' or 'soon'",
        ],
        correctIndex: 1,
        explanation:
          "Continuation words such as 'therefore,' 'moreover,' and 'similarly' signal that the blank should align with, not oppose, the earlier idea.",
      },
    ],
    takeaway:
      "Predict your own word for each blank from context and signal words before looking at the answer choices, and remember multi-blank questions require every blank correct for credit.",
    summary:
      "Text Completion tests vocabulary-in-context across one to three blanks, scored all-or-nothing. Predicting your own answer first and reading signal words like 'although' or 'therefore' are the two highest-leverage habits.",
    nextLessonSlug: "gre-verbal-sentence-equivalence",
  },
  {
    id: "gre-verbal-sentence-equivalence",
    slug: "gre-verbal-sentence-equivalence",
    title: "Verbal Reasoning: Sentence Equivalence Strategy",
    description:
      "Selecting the two answer choices that both complete a sentence with the same overall meaning.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Describe the Sentence Equivalence format: a single blank, six choices, exactly two correct answers",
      "Apply the strategy of finding a pair of near-synonyms that both fit the sentence's context",
      "Avoid selecting a plausible-sounding word that has no synonym partner among the other choices",
    ],
    skills: ["gre-verbal", "gre-sentence-equivalence"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Verbal Reasoning", url: "https://www.ets.org/gre/" }],
    keywords: ["gre sentence equivalence", "synonym pairs", "gre verbal strategy"],
    explanation: `Sentence Equivalence questions give a single sentence with one blank and six answer choices. You must select **exactly two** choices, each of which independently completes the sentence in a logically sensible way, such that the two resulting sentences end up meaning essentially the same thing. As with Text Completion, there is no partial credit -- both correct choices must be selected.

The most reliable strategy is the same first step as Text Completion: predict the meaning the blank needs from context before looking at the choices. Then scan the six choices for a **pair of near-synonyms** that both match that predicted meaning. This is the key difference from Text Completion -- a choice that fits the blank in isolation but has no synonym partner among the other five choices is almost never correct, because Sentence Equivalence specifically rewards recognizing that matching pair, not just finding one plausible word.

Be careful with near-miss traps: two words can be loose synonyms in a dictionary sense without both fitting this specific sentence's tone or context equally well. Always verify that both candidate words, substituted into the sentence, genuinely produce the same overall meaning -- not just that they appear in the same general topic area.

Consider this original practice sentence: "Despite the harsh reviews, the novel's sales remained ________, showing little change from the previous month." The blank needs a word meaning something like *steady* or *largely unchanged* -- and among six choices, you would look for the two words closest to that specific meaning, not simply any two words that could describe sales in general.`,
    commonMistakes: [
      "Picking a word that fits the blank in isolation but has no genuine synonym partner among the other five choices.",
      "Choosing two words that are loosely related in general but don't both produce a sentence with the same overall meaning in this specific context.",
      "Forgetting that Sentence Equivalence requires selecting exactly two answers, not one.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many answer choices must you select for a Sentence Equivalence question?",
        choices: ["Exactly one", "Exactly two", "As many as seem plausible", "At least three"],
        correctIndex: 1,
        explanation:
          "Sentence Equivalence always requires selecting exactly two choices that both complete the sentence with equivalent meaning.",
      },
      {
        id: "q2",
        prompt:
          "Why is a word with no synonym partner among the other five choices almost never the correct answer, even if it fits the blank on its own?",
        choices: [
          "Because such words are always misspelled",
          "Because Sentence Equivalence specifically requires two choices that produce sentences with the same overall meaning",
          "Because six-choice questions never include a correct answer without a partner",
          "Because ETS avoids using real English words as distractors",
        ],
        correctIndex: 1,
        explanation:
          "The format rewards finding the matching pair of near-synonyms, so an isolated word without a partner is structurally very unlikely to be correct.",
      },
      {
        id: "q3",
        prompt:
          "In the sentence 'Despite the harsh reviews, the novel's sales remained ________, showing little change from the previous month,' what meaning does the blank require?",
        choices: [
          "A word meaning declining sharply",
          "A word meaning steady or largely unchanged",
          "A word meaning wildly unpredictable",
          "A word meaning extremely popular",
        ],
        correctIndex: 1,
        explanation:
          "'Showing little change from the previous month' directly signals the blank needs a word meaning steady or stable.",
      },
    ],
    takeaway:
      "Predict the blank's meaning first, then look for the pair of near-synonyms among the six choices that both produce that meaning -- an unpartnered word is rarely correct.",
    summary:
      "Sentence Equivalence requires selecting exactly two choices that both fit the blank and produce equivalent overall meaning. Predicting the needed meaning first, then finding a genuine synonym pair, is the reliable approach.",
    nextLessonSlug: "gre-verbal-reading-comprehension",
  },
  {
    id: "gre-verbal-reading-comprehension",
    slug: "gre-verbal-reading-comprehension",
    title: "Verbal Reasoning: Reading Comprehension Strategy",
    description:
      "Practicing main idea, detail, and inference questions against an original short passage.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    objectives: [
      "Distinguish a passage's main idea from a single supporting detail",
      "Distinguish an inference question (what the passage implies) from an explicit detail question (what it states directly)",
      "Apply active reading to answer comprehension questions about an original passage",
    ],
    skills: ["gre-verbal", "gre-reading-comprehension"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Verbal Reasoning", url: "https://www.ets.org/gre/" }],
    keywords: ["gre reading comprehension", "main idea", "inference questions"],
    explanation: `GRE Reading Comprehension passages range from one paragraph to several, drawn from a wide variety of academic and general-interest subjects, and ask a mix of question types: **main idea** (what is the passage's overall point), **explicit detail** (what does the passage directly state), and **inference** (what does the passage logically imply without stating outright). Confusing these types is one of the most common sources of lost points -- an inference question requires a conclusion that follows necessarily from the passage, not just a conclusion that seems plausible in general.

A useful habit is **active reading**: as you read, briefly note (mentally or in the test interface) what each paragraph is doing -- introducing a claim, presenting evidence, raising a counterpoint -- rather than reading passively for surface content. This makes it much faster to locate the right part of the passage when a question asks about a specific detail or argument structure.

Below is an original short passage. Read it, then apply main idea, detail, and inference reasoning to the questions that follow.

---

**Passage (original -- coral reef restoration):**

Coral reef restoration projects increasingly rely on a technique called fragment propagation, in which small pieces of healthy coral are grown in controlled nurseries before being transplanted onto damaged reef sections. Early trials suggested the approach could accelerate recovery considerably compared with leaving a reef to regenerate unaided, and several pilot programs reported visible increases in coral cover within just a few years. More recent analyses, however, have complicated this optimistic picture: transplanted fragments appear notably more vulnerable to the same stressors, particularly rising water temperatures, that damaged the original reef in the first place, and survival rates vary enormously between sites. Some marine biologists now argue that fragment propagation should be treated as one tool among several, useful for jump-starting recovery under relatively stable conditions, rather than a general solution capable of restoring reefs facing ongoing environmental stress. Others counter that even partial, temporary recovery has value, both ecologically and for maintaining public support for conservation funding, regardless of whether the restored coral ultimately proves as resilient as reef structures that developed without intervention.`,
    commonMistakes: [
      "Answering an inference question with an extreme claim ('always,' 'never,' 'proven') that the passage doesn't actually support that strongly.",
      "Confusing the passage's main idea with a single supporting detail, such as the specific statistic about survival rates.",
      "Assuming a passage takes one single, unified position when it actually presents a genuine disagreement between two viewpoints.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the main idea of the passage about fragment propagation?",
        choices: [
          "Fragment propagation is a proven, universal solution to reef damage",
          "Fragment propagation shows promise but its effectiveness is more limited and context-dependent than early trials suggested",
          "Fragment propagation has been abandoned entirely by marine biologists",
          "Fragment propagation is used primarily for public relations rather than ecological benefit",
        ],
        correctIndex: 1,
        explanation:
          "The passage presents an initially optimistic view later complicated by evidence of variable, context-dependent effectiveness -- a nuanced, not extreme, overall picture.",
      },
      {
        id: "q2",
        prompt:
          "According to the passage, why might transplanted coral fragments be especially vulnerable?",
        choices: [
          "They are genetically different from the original reef",
          "They remain vulnerable to the same stressors, such as rising water temperatures, that damaged the original reef",
          "They are transplanted only at night",
          "They are transplanted without any nursery stage at all",
        ],
        correctIndex: 1,
        explanation:
          "The passage explicitly states transplanted fragments are notably more vulnerable to the same stressors, particularly rising water temperatures, that caused the original damage.",
      },
      {
        id: "q3",
        prompt: "What can be reasonably inferred about marine biologists' views from the passage?",
        choices: [
          "All marine biologists agree the technique should be abandoned entirely",
          "There is a genuine disagreement: some see it as one limited tool, others value even partial, temporary recovery",
          "All marine biologists agree the technique works universally well in any conditions",
          "The passage states biologists have reached unanimous consensus on the issue",
        ],
        correctIndex: 1,
        explanation:
          "The passage explicitly describes two differing positions ('some... others counter...'), so a genuine disagreement, not consensus, is the supported inference.",
      },
      {
        id: "q4",
        prompt: "What idea does the passage's final sentence primarily address?",
        choices: [
          "The financial cost of building coral nurseries",
          "A counterargument that partial, temporary recovery still has value even if the coral proves less resilient long-term",
          "A description of how nurseries are physically constructed",
          "A criticism of how public conservation funding is spent",
        ],
        correctIndex: 1,
        explanation:
          "The final sentence presents the counterargument that partial recovery has ecological and public-support value regardless of long-term resilience.",
      },
    ],
    takeaway:
      "Keep main idea, explicit detail, and inference questions distinct -- an inference must follow necessarily from the passage, not just seem generally plausible.",
    summary:
      "Reading Comprehension mixes main idea, detail, and inference questions. Active reading and carefully distinguishing what a passage states from what it merely implies are the core skills this lesson builds.",
    nextLessonSlug: "gre-verbal-critical-reasoning",
  },
  {
    id: "gre-verbal-critical-reasoning",
    slug: "gre-verbal-critical-reasoning",
    title: "Verbal Reasoning: Critical Reasoning and Argument Structure",
    description: "Identifying conclusions, premises, and assumptions in a short original argument.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Identify the conclusion, premises, and any unstated assumption in a short argument",
      "Distinguish an answer that genuinely weakens an argument from one that only sounds negative without engaging its logic",
      "Apply argument-structure analysis to an original short passage",
    ],
    skills: ["gre-verbal", "gre-critical-reasoning"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Verbal Reasoning", url: "https://www.ets.org/gre/" }],
    keywords: ["gre critical reasoning", "argument analysis", "assumption weaken strengthen"],
    explanation: `Some Reading Comprehension questions are built around a short argument -- often just a sentence or two -- rather than a longer descriptive passage. The core skill is breaking the argument into its parts: the **conclusion** (the claim the author is ultimately trying to establish), the **premises** (the evidence or reasons offered), and, very often, an **unstated assumption** that quietly bridges the premises to the conclusion without ever being written down explicitly.

Common question types built on this structure ask you to identify the underlying assumption, identify what would most **weaken** or **strengthen** the argument, or identify a flaw in the reasoning itself. For weaken/strengthen questions, the correct answer must engage directly with the argument's specific logical link -- typically by attacking or supporting the unstated assumption -- rather than simply introducing information that sounds generally negative or positive about the topic.

Consider this original short argument: "A city council member argues: 'Since the number of bicycle commuters in our city has doubled over the past five years, we should reallocate a significant portion of the road-repair budget toward new bike lanes, because doing so will most effectively reduce traffic congestion.'" The conclusion is the recommendation to reallocate the budget toward bike lanes; the premise is that bicycle commuting has doubled; the unstated assumption is that bike lanes would be *the most effective* way to reduce congestion specifically, not merely *a* way that would help cyclists.

A weaken answer must attack that specific assumption. Information showing congestion has a different primary cause entirely would directly undercut the argument's logic; information that is merely tangentially related to cycling, without addressing the "most effective" claim, would not.`,
    commonMistakes: [
      "Selecting a 'weaken' answer that sounds negative about the general topic without actually attacking the argument's specific logical link.",
      "Confusing a premise (the evidence given) with the conclusion (the claim the argument is ultimately trying to establish).",
      "Assuming an argument's key assumption must be stated somewhere in the text, when by definition an assumption is left unstated.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "In the argument about bicycle commuters and the road-repair budget, what is the conclusion?",
        choices: [
          "The number of bicycle commuters has doubled over five years",
          "The city should reallocate the road-repair budget toward new bike lanes because that would most effectively reduce congestion",
          "Traffic congestion has generally increased citywide",
          "Cyclists should be required to pay a special registration fee",
        ],
        correctIndex: 1,
        explanation:
          "The conclusion is the recommendation itself -- reallocating the budget toward bike lanes as the most effective congestion fix -- not the supporting statistic.",
      },
      {
        id: "q2",
        prompt: "Which of the following, if true, would most weaken the argument?",
        choices: [
          "The city's overall population has grown by 5% over the same period",
          "A separate study found that congestion in this city is caused primarily by delivery-truck and freight traffic, not a lack of bike lanes",
          "Some bicycle commuters also occasionally drive a car",
          "New bike lanes are generally less expensive to build than new roads",
        ],
        correctIndex: 1,
        explanation:
          "This directly attacks the argument's key assumption that bike lanes would be the *most effective* fix, by pointing to a different, larger cause of congestion.",
      },
      {
        id: "q3",
        prompt: "What unstated assumption does the argument rely on?",
        choices: [
          "Bicycle commuting is an enjoyable activity",
          "Building bike lanes is the most effective way to reduce traffic congestion, more so than other possible interventions",
          "The current road-repair budget is too large already",
          "Every city council member personally supports cycling",
        ],
        correctIndex: 1,
        explanation:
          "The argument leaps from 'more cyclists' to 'bike lanes are the most effective congestion fix' without stating why bike lanes would outperform other interventions -- that's the unstated assumption.",
      },
    ],
    takeaway:
      "Break a short argument into conclusion, premises, and unstated assumption, and remember that a genuine weaken answer must attack that specific assumption, not just sound negative in general.",
    summary:
      "Critical-reasoning-style questions test whether you can identify an argument's conclusion, premises, and unstated assumption, and whether a proposed answer genuinely weakens or strengthens that specific logical link.",
    nextLessonSlug: "gre-quant-arithmetic-and-algebra",
  },
  {
    id: "gre-quant-arithmetic-and-algebra",
    slug: "gre-quant-arithmetic-and-algebra",
    title: "Quantitative Reasoning: Arithmetic and Algebra",
    description:
      "Percentages, ratios, and translating word problems into algebraic equations without common traps.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    objectives: [
      "Apply core arithmetic operations -- percentages, ratios, exponents -- accurately under time pressure",
      "Translate a word problem into an algebraic equation carefully",
      "Recognize common algebra traps, including sign errors when distributing a negative across parentheses",
    ],
    skills: ["gre-quant", "gre-arithmetic", "gre-algebra"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Quantitative Reasoning", url: "https://www.ets.org/gre/" }],
    keywords: ["gre quantitative reasoning", "gre arithmetic", "gre algebra word problems"],
    explanation: `Quantitative Reasoning content spans four broad areas across its two sections: arithmetic, algebra, geometry, and data analysis. Arithmetic and algebra together are the most frequently tested combination, covering percentages, ratios and proportions, exponents and roots, and translating word problems into solvable equations.

One of the most common error sources is confusing **percentage points** with **percent change**. Going from 40% to 50% is a **10 percentage-point** increase, but it is a **25% relative increase**, because the change (10) is measured against the original value (40): 10/40 = 0.25. Treating these two ideas as interchangeable produces a wrong answer even when every arithmetic step is otherwise correct.

Consider this original worked example: a store raises an item's price by 20%, then later lowers the *new* price by 20%. Is the final price higher, lower, or the same as the original? Multiplying the original price by 1.20 (the increase) and then by 0.80 (the decrease) gives 1.20 x 0.80 = 0.96 -- the final price is **4% lower** than the original, not the same, because the second 20% is taken from a larger number than the first 20% was.

A separate, purely algebraic trap is failing to distribute a negative sign correctly across every term inside parentheses: \`-(x - 5)\` correctly simplifies to \`-x + 5\`, not \`-x - 5\`. Under time pressure, this sign error is easy to make and easy to avoid once you know to watch for it specifically.`,
    commonMistakes: [
      "Confusing 'percentage points' with 'percent change' -- for example, treating a rise from 40% to 50% as a 50% increase instead of a 10-percentage-point (25% relative) increase.",
      "Forgetting to distribute a negative sign across every term inside parentheses, writing -(x - 5) as -x - 5 instead of the correct -x + 5.",
      "Solving only part of a multi-step word problem, such as an intermediate value, and reporting it instead of the specific quantity the question actually asks for.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "A value rises from 40% to 50%. Which statement correctly distinguishes percentage points from percent change?",
        choices: [
          "This is both a 50% increase and a 50 percentage-point increase",
          "This is a 10 percentage-point increase, which corresponds to a 25% relative increase",
          "This is a 10% increase and a 40 percentage-point increase",
          "Percentage points and percent change always describe the exact same quantity",
        ],
        correctIndex: 1,
        explanation:
          "The absolute change is 10 percentage points (50 - 40); the relative percent change is 10/40 = 25%.",
      },
      {
        id: "q2",
        prompt:
          "An item's price increases by 20%, and the new price then decreases by 20%. Compared with the original price, the final price is:",
        choices: [
          "Exactly the same as the original price",
          "4% lower than the original price",
          "4% higher than the original price",
          "40% lower than the original price",
        ],
        correctIndex: 1,
        explanation:
          "1.20 x 0.80 = 0.96 of the original price, a net 4% decrease, since the second percentage is taken from a larger base.",
      },
      {
        id: "q3",
        prompt: "What is the correct simplification of -(x - 5)?",
        choices: ["-x - 5", "-x + 5", "x - 5", "x + 5"],
        correctIndex: 1,
        explanation: "Distributing the negative sign across both terms gives -x + 5, not -x - 5.",
      },
      {
        id: "q4",
        prompt: "When finishing a multi-step word problem, what is the most reliable final check?",
        choices: [
          "Confirm that your final answer is the specific quantity the question actually asks for, not just an intermediate value you computed along the way",
          "Confirm your final answer is a whole number",
          "Confirm your final answer is positive",
          "Confirm you used every number given anywhere in the problem",
        ],
        correctIndex: 0,
        explanation:
          "Multi-step problems commonly ask for a value derived from, not equal to, an intermediate result -- always re-check what the question specifically asks for.",
      },
    ],
    takeaway:
      "Separate percentage points from percent change, watch for sign-distribution errors, and always confirm your final answer is the exact quantity the question asks for.",
    summary:
      "Arithmetic and algebra questions reward careful translation of word problems into equations and awareness of common traps: percentage-point versus percent-change confusion, and negative-sign distribution errors.",
    nextLessonSlug: "gre-quant-geometry",
  },
  {
    id: "gre-quant-geometry",
    slug: "gre-quant-geometry",
    title: "Quantitative Reasoning: Geometry",
    description:
      "Applying core geometry formulas correctly, and why GRE figures are usually not drawn to scale.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Apply core geometry formulas -- area, perimeter, volume, and the Pythagorean theorem -- accurately",
      "Recognize that GRE figures are generally not drawn to scale and must not be estimated visually",
      "Apply triangle and circle properties to original practice problems",
    ],
    skills: ["gre-quant", "gre-geometry"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Quantitative Reasoning", url: "https://www.ets.org/gre/" }],
    keywords: ["gre geometry", "pythagorean theorem", "not drawn to scale"],
    explanation: `Geometry questions cover lines and angles, triangles (including the Pythagorean theorem and special right triangles), circles, quadrilaterals, three-dimensional figures (surface area and volume), and coordinate geometry. Formal proofs are not required -- the skill being tested is correctly applying known formulas and relationships to the specific figure or values given.

The single most important GRE-specific habit is remembering that geometric figures are **generally not drawn to scale** unless a question explicitly states otherwise. You cannot estimate a length or angle by how it visually appears in the figure -- every measurement must come from the values, relationships, or labels explicitly given in the problem. This trips up test-takers who are used to trusting diagrams at face value in other contexts.

Worked original example: a right triangle has legs of length 6 and 8. Using the Pythagorean theorem, \`a^2 + b^2 = c^2\`, the hypotenuse is \`sqrt(6^2 + 8^2) = sqrt(36 + 64) = sqrt(100) = 10\`. This is a scaled-up version of the well-known 3-4-5 right triangle (multiplied by 2), which is worth recognizing on sight to save calculation time.

A second worked example: a circle has a radius of 5. Its area is \`pi * r^2 = pi * 25 = 25*pi\`, and its circumference is \`2 * pi * r = 10*pi\`. Mixing up area and circumference formulas under time pressure is a common, avoidable error -- area uses the radius squared, circumference does not.`,
    commonMistakes: [
      "Estimating a length or angle by how a figure visually looks, instead of remembering that GRE figures are generally not drawn to scale unless stated.",
      "Mixing up the formulas for a circle's area (pi r^2) and its circumference (2 pi r) under time pressure.",
      "Assuming the Pythagorean theorem applies to any triangle, when it only applies directly to right triangles.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "On the GRE, if a geometric figure is not explicitly labeled as drawn to scale, what should you assume?",
        choices: [
          "The figure's proportions are exactly accurate and can be trusted visually",
          "The figure's proportions may not be accurate, so you must calculate from given values rather than estimate visually",
          "The figure is always drawn to scale regardless of any label",
          "There is no reliable way to answer geometry questions at all",
        ],
        correctIndex: 1,
        explanation:
          "Unless explicitly stated as drawn to scale, GRE figures may not be proportionally accurate -- always calculate from given values.",
      },
      {
        id: "q2",
        prompt:
          "A right triangle has legs of length 6 and 8. What is the length of its hypotenuse?",
        choices: ["10", "14", "48", "7"],
        correctIndex: 0,
        explanation:
          "sqrt(6^2 + 8^2) = sqrt(36 + 64) = sqrt(100) = 10, a scaled 3-4-5 right triangle.",
      },
      {
        id: "q3",
        prompt: "A circle has a radius of 5. What is its area, in terms of pi?",
        choices: ["10*pi", "25*pi", "5*pi", "100*pi"],
        correctIndex: 1,
        explanation: "Area = pi * r^2 = pi * 5^2 = 25*pi.",
      },
      {
        id: "q4",
        prompt: "The Pythagorean theorem, a^2 + b^2 = c^2, applies directly to:",
        choices: [
          "Any triangle whatsoever",
          "Only right triangles",
          "Only equilateral triangles",
          "Only circles",
        ],
        correctIndex: 1,
        explanation:
          "The Pythagorean theorem relates the legs and hypotenuse of a right triangle specifically.",
      },
    ],
    takeaway:
      "Never estimate a length or angle from how a GRE figure looks -- calculate strictly from given values, since figures are generally not drawn to scale.",
    summary:
      "Geometry questions test correct application of standard formulas (Pythagorean theorem, area, circumference) to given values, with the GRE-specific caution that figures are usually not drawn to scale.",
    nextLessonSlug: "gre-quant-data-analysis",
  },
  {
    id: "gre-quant-data-analysis",
    slug: "gre-quant-data-analysis",
    title: "Quantitative Reasoning: Data Analysis",
    description:
      "Computing mean, median, and range from a described data set, and avoiding unsupported extrapolation.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Extract specific values accurately from a described data table",
      "Calculate mean, median, and range from a small original data set",
      "Distinguish a conclusion the data actually supports from an unsupported extrapolation beyond it",
    ],
    skills: ["gre-quant", "gre-data-analysis"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Quantitative Reasoning", url: "https://www.ets.org/gre/" }],
    keywords: ["gre data analysis", "mean median range", "data interpretation"],
    explanation: `Data Analysis questions describe data using tables, bar or line graphs, or other summaries, and ask you to extract specific values or compute statistical measures: mean, median, mode, range, standard deviation (usually conceptually), percentiles, and basic probability. Since this practice lesson has no chart-rendering component, the data below is presented as a described table directly in text -- a format the real exam also uses for some Data Analysis questions.

Consider this original data set: a small bakery recorded the number of loaves of bread sold each day for one week: Monday 42, Tuesday 55, Wednesday 38, Thursday 61, Friday 47, Saturday 70, Sunday 35.

To find the **mean**, sum all seven values (42 + 55 + 38 + 61 + 47 + 70 + 35 = 348) and divide by 7, giving approximately 49.7. To find the **median**, sort the values first -- 35, 38, 42, 47, 55, 61, 70 -- and take the middle (fourth) value, which is 47; skipping the sort step is a common source of error. The **range** is the maximum minus the minimum: 70 - 35 = 35.

A separate but equally important skill is recognizing the limits of what a data set actually supports. If a question asks only about the seven days of data given, a conclusion like "sales will follow this exact same pattern next month" is an **unsupported extrapolation** -- the data describes one specific week, and nothing in it establishes a future trend. Distinguishing a computed fact about the given data from a speculative claim beyond it is exactly what many Data Analysis questions are testing.`,
    commonMistakes: [
      "Computing the mean correctly but reporting the median (or vice versa) when the question specifically asked for the other one.",
      "Forgetting to sort the values in order before identifying the median, leading to the wrong middle value.",
      "Treating a conclusion about a future trend as supported by the data, when the question only asked about the specific data set actually given.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Using the bakery's weekly data (42, 55, 38, 61, 47, 70, 35 loaves sold Monday through Sunday), what is the mean number of loaves sold per day, rounded to one decimal place?",
        choices: ["47.0", "49.7", "55.0", "35.0"],
        correctIndex: 1,
        explanation: "The sum is 348; 348 / 7 is approximately 49.7.",
      },
      {
        id: "q2",
        prompt: "What is the median of the same weekly data set?",
        choices: ["42", "47", "55", "49.7"],
        correctIndex: 1,
        explanation: "Sorted (35, 38, 42, 47, 55, 61, 70), the fourth (middle) value is 47.",
      },
      {
        id: "q3",
        prompt: "What is the range of the same weekly data set?",
        choices: ["25", "35", "70", "42"],
        correctIndex: 1,
        explanation: "The maximum (70) minus the minimum (35) is 35.",
      },
      {
        id: "q4",
        prompt:
          "If a question asks only about the seven days of bakery data given, which of the following would be an unsupported conclusion?",
        choices: [
          "Stating the mean of the given week's sales",
          "Stating the range of the given week's sales",
          "Assuming next month's sales will follow the exact same daily pattern as this one week",
          "Stating the median of the given week's sales",
        ],
        correctIndex: 2,
        explanation:
          "One week of data does not establish a future trend -- assuming next month repeats it is an unsupported extrapolation beyond what the data shows.",
      },
    ],
    takeaway:
      "Sort values before finding the median, keep mean/median/range clearly separate in your mind, and never treat a small data set as proof of a future trend it wasn't asked to establish.",
    summary:
      "Data Analysis rewards careful extraction and calculation (mean, median, range) from a given data set, plus recognizing when a conclusion goes beyond what the data actually supports.",
    nextLessonSlug: "gre-quant-comparison-strategy",
  },
  {
    id: "gre-quant-comparison-strategy",
    slug: "gre-quant-comparison-strategy",
    title: "Quantitative Reasoning: Quantitative Comparison Strategy",
    description:
      "The GRE-specific 'Quantity A vs. Quantity B' format and how to test values systematically.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 20,
    objectives: [
      "Describe the Quantitative Comparison format and its four fixed answer choices",
      "Apply the strategy of testing multiple values -- including negatives, fractions, and zero -- before concluding a relationship holds",
      "Recognize when a relationship genuinely cannot be determined from the given information",
    ],
    skills: ["gre-quant", "gre-quantitative-comparison"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Quantitative Reasoning", url: "https://www.ets.org/gre/" }],
    keywords: ["gre quantitative comparison", "quantity a quantity b", "cannot be determined"],
    explanation: `Quantitative Comparison (QC) is a format found only in the GRE's Quantitative Reasoning sections. You're given **Quantity A** and **Quantity B** -- numbers, expressions, or values described in a short scenario -- and must choose one of four **fixed** answer choices: Quantity A is greater; Quantity B is greater; the two quantities are equal; or the relationship cannot be determined from the information given. These same four options appear, in the same order, on every QC question.

When variables are involved, the reliable strategy is to test **multiple different values**, not just one convenient one -- try a positive integer, a negative number, a fraction between 0 and 1, and zero where it's permitted by the problem. If different test values produce different relationships between Quantity A and Quantity B, the correct answer is "cannot be determined," regardless of how confident a single test might have made you feel.

Worked original example: "Quantity A: x^2. Quantity B: x," with no constraint given on x. Testing x = 2 gives Quantity A = 4 and Quantity B = 2, so A is greater. Testing x = 0.5 gives Quantity A = 0.25 and Quantity B = 0.5, so B is greater instead. Since the relationship changes depending on which value of x is used, the correct answer is "cannot be determined" -- not a sign of an error, but the intended correct choice for a question built exactly this way.

If a question instead adds an explicit constraint (for example, "x > 1"), you must retest using only values consistent with that constraint, since it narrows the possibilities and can change which answer is correct -- never carry over an answer from an unconstrained version of a similar-looking question.`,
    commonMistakes: [
      "Testing only one convenient value, such as a positive integer, and concluding a relationship holds universally without checking a fraction, zero, or a negative value.",
      "Forgetting that 'cannot be determined' is a fully valid, and sometimes the intended correct, answer -- not a sign that you've made an error.",
      "Ignoring an explicitly given constraint on a variable, such as 'x > 1', which narrows which test values are actually allowed and can change the correct answer.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "In Quantitative Comparison questions, which four answer choices are always available?",
        choices: [
          "True, False, Not Given, Cannot be determined",
          "Quantity A is greater; Quantity B is greater; the two quantities are equal; the relationship cannot be determined from the information given",
          "Yes, No, Maybe, Not applicable",
          "Only two choices: Quantity A or Quantity B",
        ],
        correctIndex: 1,
        explanation:
          "Every Quantitative Comparison question offers the same four fixed choices in the same order.",
      },
      {
        id: "q2",
        prompt:
          "For 'Quantity A: x^2, Quantity B: x' with no constraint on x, why is 'cannot be determined' the correct answer?",
        choices: [
          "Because x^2 is always greater than x for every real number",
          "Because testing different values of x, such as 2 versus 0.5, produces different relationships between the two quantities",
          "Because x is undefined in this scenario",
          "Because Quantitative Comparison questions never have a determinable answer",
        ],
        correctIndex: 1,
        explanation:
          "x = 2 makes A greater, while x = 0.5 makes B greater -- since the relationship isn't consistent, it cannot be determined without more constraints.",
      },
      {
        id: "q3",
        prompt:
          "If a Quantitative Comparison question adds the constraint 'x > 1' to the same two quantities from above, what should you do?",
        choices: [
          "Ignore the new constraint and reuse your original answer",
          "Retest using only values consistent with the new constraint, since it may change which answer is correct",
          "Automatically select 'cannot be determined' whenever any constraint is added",
          "Assume constraints never affect Quantitative Comparison answers",
        ],
        correctIndex: 1,
        explanation:
          "A constraint like x > 1 narrows the possible test values -- here it would make Quantity A consistently greater -- so you must retest rather than reuse a prior answer.",
      },
    ],
    takeaway:
      "Test several different values -- positive, negative, fractional, and zero where allowed -- before concluding a Quantitative Comparison relationship holds, and treat 'cannot be determined' as a fully valid answer.",
    summary:
      "Quantitative Comparison always offers the same four fixed choices. Testing multiple values systematically, and respecting any given constraints, is the reliable way to reach the correct answer.",
    nextLessonSlug: "gre-writing-analyze-an-issue",
  },
  {
    id: "gre-writing-analyze-an-issue",
    slug: "gre-writing-analyze-an-issue",
    title: "Analytical Writing: The Analyze an Issue Task",
    description:
      "Structuring a clear, well-supported response to the GRE's single Analytical Writing task.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 10,
    difficulty: "advanced",
    estimatedMinutes: 25,
    objectives: [
      "Describe the Analyze an Issue task format and its 30-minute time limit",
      "Structure a clear, well-supported essay that takes and defends a position on an issue prompt",
      "Support claims with specific reasons and examples rather than vague generalities",
    ],
    skills: ["gre-writing", "gre-analytical-writing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE Analytical Writing", url: "https://www.ets.org/gre/" }],
    keywords: ["gre analytical writing", "analyze an issue", "gre essay structure"],
    explanation: `Analytical Writing on the current GRE General Test consists of a single task: **Analyze an Issue**. An earlier second essay, "Analyze an Argument," was removed from the test some years ago and no longer appears -- if you encounter older prep material describing two Analytical Writing essays, it is describing an outdated version of the test. You have **30 minutes** to respond to a general statement about a topic of broad interest, evaluating it critically and developing your own position with reasons and examples. Responses are scored 0-6 in half-point increments by trained human raters, typically alongside an automated scoring check.

A reliable structure has four parts: an **introduction** that clearly states your position on the issue, several **body paragraphs** each developing one distinct reason with specific support -- a concrete example, a plausible hypothetical scenario, or a clear logical explanation -- and a **conclusion** that reinforces your stated position without introducing brand-new claims. Strong responses often go a step further and briefly acknowledge a limitation or reasonable counterpoint before explaining why the overall position still holds -- this shows genuine critical evaluation rather than a one-sided restatement of an opinion.

Avoid three common weaknesses: simply restating the prompt's statement without ever clearly committing to your own position; relying on vague generalities ("this is important for society") instead of a specific example or concrete reasoning; and treating the task as a request to summarize both sides evenly with no thesis of your own -- Analyze an Issue explicitly wants your own evaluation and position, not a neutral summary.

Practice a full response using the Writing self-review tool on this course's exam-practice page, which includes rubric-based self-scoring you complete yourself -- VisaSparkSchools does not offer automated or AI grading and does not claim to predict any official GRE score.`,
    commonMistakes: [
      "Restating the prompt's statement without ever clearly committing to your own position on it.",
      "Supporting claims with only vague generalities instead of a specific example, scenario, or clear logical explanation.",
      "Confusing the current single-task Analytical Writing format with the older two-task format that included a separate 'Analyze an Argument' essay, which no longer exists on the test.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many tasks currently make up GRE Analytical Writing?",
        choices: [
          "Two: Analyze an Issue and Analyze an Argument",
          "One: Analyze an Issue only",
          "Three separate essays covering different topics",
          "None -- Analytical Writing was removed from the test entirely",
        ],
        correctIndex: 1,
        explanation:
          "The current GRE Analytical Writing section has a single task, Analyze an Issue -- Analyze an Argument was removed in an earlier test revision.",
      },
      {
        id: "q2",
        prompt: "How much time is given for the Analyze an Issue task?",
        choices: ["10 minutes", "30 minutes", "60 minutes", "90 minutes"],
        correctIndex: 1,
        explanation: "Analyze an Issue has a 30-minute time limit.",
      },
      {
        id: "q3",
        prompt:
          "What is a weakness of supporting a claim with only a vague generality like 'this is important for society'?",
        choices: [
          "It is grammatically incorrect by definition",
          "It lacks the specific example or clear reasoning that raters look for to support a claim",
          "It makes the essay too short to be read",
          "It automatically contradicts the prompt's statement",
        ],
        correctIndex: 1,
        explanation:
          "Raters look for concrete support -- a vague generality doesn't demonstrate the developed reasoning the task is scored on.",
      },
      {
        id: "q4",
        prompt: "What should a strong Analyze an Issue conclusion do?",
        choices: [
          "Introduce a completely new argument that wasn't discussed earlier in the essay",
          "Reinforce your stated position without introducing brand-new claims",
          "Simply repeat the prompt's statement word for word",
          "Apologize for any weaknesses in the essay's reasoning",
        ],
        correctIndex: 1,
        explanation:
          "A strong conclusion reinforces the position already argued in the body paragraphs, rather than introducing new, undeveloped claims.",
      },
    ],
    takeaway:
      "Take and clearly state your own position on the issue, support it with specific reasons and examples rather than generalities, and remember the current GRE has only one Analytical Writing task.",
    summary:
      "Analyze an Issue is the GRE's single 30-minute Analytical Writing task, evaluated on how clearly you state and support a position with specific reasoning -- not on producing a neutral, two-sided summary.",
    nextLessonSlug: "gre-test-day-strategy-and-pacing",
  },
  {
    id: "gre-test-day-strategy-and-pacing",
    slug: "gre-test-day-strategy-and-pacing",
    title: "Test-Day Strategy: Pacing and Section-Level Adaptivity",
    description:
      "Building a realistic pacing plan across Verbal, Quantitative, and Analytical Writing sections.",
    trackSlug: "exam-preparation",
    courseSlug: "gre-general-test-preparation",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Apply section-specific pacing targets across Verbal Reasoning, Quantitative Reasoning, and Analytical Writing",
      "Explain why every question in a first Verbal or Quantitative section deserves full effort, given section-level adaptivity",
      "Build a realistic test-day plan that uses mark-and-review deliberately rather than as an afterthought",
    ],
    skills: ["gre-test-strategy", "gre-pacing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [{ label: "ETS GRE General Test", url: "https://www.ets.org/gre/" }],
    keywords: ["gre pacing", "gre test day", "section-level adaptive testing", "mark and review"],
    explanation: `With 27 Verbal Reasoning questions split across two sections and 27 Quantitative Reasoning questions split across two sections, all inside a roughly 1h58m test, pacing is a skill in its own right, separate from content knowledge. A reasonable rough target for a Verbal section is to average under two minutes per question, budgeting less time for shorter Text Completion and Sentence Equivalence items so that Reading Comprehension passages -- which naturally take longer to read -- don't run you short on time. A similar principle applies to Quantitative sections: budget less time for straightforward Quantitative Comparison items and more for multi-step Data Analysis questions.

Recall section-level adaptivity from earlier in this course: because the difficulty -- and therefore the score ceiling -- of your second Verbal and second Quantitative sections depends on your performance in the first section of each type, treating every question in that first section with genuine care, not just speed, matters more on the GRE than it would on a test where every section were scored purely independently of the others.

Use **mark-and-review** deliberately rather than as a last resort: if a question is consuming far more time than it's worth, flag it, make your best guess -- remember, there's no penalty for guessing since the GRE has no negative marking -- and move on, so you don't run out of time for several easier questions later in the same section. Return to flagged questions only if time remains once you've attempted everything else.

Beyond section-by-section pacing, plan realistically for sustained concentration: the test runs close to two hours, and fatigue itself becomes a real factor in later sections, so a general test-day plan (rest, timing, and any breaks) matters alongside content mastery. Exact break length and timing can change, so always confirm current details on the official ETS site rather than relying on any fixed number memorized from a course. Finally, no amount of pacing or strategy coaching can guarantee a specific official score -- these are decision-making habits meant to support genuine content knowledge from the Verbal, Quantitative, and Writing lessons in this course, not a shortcut around learning that content.`,
    commonMistakes: [
      "Spending so long on one difficult early question that there's no time left for several easier questions later in the same section.",
      "Treating the first Verbal or Quantitative section casually, without realizing it affects the difficulty -- and score ceiling -- of the second section of that same type.",
      "Skipping mark-and-review entirely instead of flagging a tough question, making a guess, and returning to it later if time allows.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Roughly how many Verbal Reasoning questions appear across the GRE's two Verbal sections combined?",
        choices: ["10", "27", "40", "60"],
        correctIndex: 1,
        explanation:
          "Verbal Reasoning totals 27 questions across its two sections combined (the same is true for Quantitative Reasoning).",
      },
      {
        id: "q2",
        prompt:
          "Why does the first Quantitative Reasoning section deserve genuine care, not just fast completion?",
        choices: [
          "It is worth double the points of the second section",
          "Performance in it affects the difficulty -- and therefore the score ceiling -- of the second Quantitative Reasoning section",
          "It is the only section of the test that is scored at all",
          "It has no meaningful effect on anything beyond its own score",
        ],
        correctIndex: 1,
        explanation:
          "Because of section-level adaptivity, the first section's performance sets the difficulty range, and thus the score ceiling, of the second section of the same type.",
      },
      {
        id: "q3",
        prompt:
          "What is the recommended action when a single question is taking far longer than it should?",
        choices: [
          "Keep working on it indefinitely no matter how long it takes",
          "Flag it with mark-and-review, make your best guess, and move on, returning later if time allows",
          "Leave it blank and skip immediately to the next section",
          "Restart the entire section from the beginning",
        ],
        correctIndex: 1,
        explanation:
          "Flagging, guessing (there's no penalty), and moving on protects your time for the rest of the section, with the option to return if time remains.",
      },
      {
        id: "q4",
        prompt:
          "Can pacing and strategy coaching, on their own, guarantee a specific official GRE score?",
        choices: [
          "Yes, if the pacing plan is followed exactly",
          "No -- pacing and strategy support genuine content knowledge, but neither this course nor anyone outside ETS can guarantee any official score",
          "Yes, but only for the Quantitative Reasoning sections",
          "No score guarantee is possible for Verbal, but Quantitative scores can be guaranteed",
        ],
        correctIndex: 1,
        explanation:
          "Pacing strategy is a decision-making skill that supports real content knowledge -- it cannot substitute for it, and no official score can be guaranteed by any test-prep provider.",
      },
    ],
    takeaway:
      "Budget time per question type deliberately, treat your first Verbal and Quantitative sections with full care because of section-level adaptivity, and use mark-and-review as an active strategy rather than a last resort.",
    summary:
      "Realistic GRE pacing accounts for roughly 27 questions per Verbal or Quantitative pairing inside a two-hour test, the outsized importance of first-section performance under section-level adaptivity, and deliberate use of mark-and-review.",
  },
];
