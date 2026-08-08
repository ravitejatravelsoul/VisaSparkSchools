import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * GRE General Test Preparation Questions -- 50 frequently-asked questions
 * about the exam's format, scoring, and strategy (not job-interview
 * questions). Every answer reflects the current (post-2023 shortened)
 * format: five sections, section-level adaptive Verbal/Quant, a single
 * Analytical Writing task. No affiliation with ETS is claimed anywhere.
 */
export const greInterviewQuestions: InterviewQuestionInput[] = [
  // --- Format & Scoring (14) ---
  {
    id: "gre-prep-format-01",
    courseSlug: "gre-general-test-preparation",
    question: "How many sections does the GRE General Test have, and what are they?",
    answer:
      "Five sections: one Analytical Writing section, two Verbal Reasoning sections, and two Quantitative Reasoning sections.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-02",
    courseSlug: "gre-general-test-preparation",
    question: "Roughly how long is the current GRE General Test?",
    answer: "Approximately 1 hour 58 minutes total.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-03",
    courseSlug: "gre-general-test-preparation",
    question: "How many Analytical Writing tasks does the current GRE have?",
    answer:
      "One -- 'Analyze an Issue.' The older 'Analyze an Argument' task was removed from the test and no longer appears; material describing two tasks is describing an outdated format.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    commonMistake:
      "Studying for two Analytical Writing tasks based on older prep material describing a format the current GRE no longer uses.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-04",
    courseSlug: "gre-general-test-preparation",
    question: "What is the score range for Verbal Reasoning and Quantitative Reasoning?",
    answer: "Each is scored 130-170, in 1-point increments.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-05",
    courseSlug: "gre-general-test-preparation",
    question: "What is the score range for Analytical Writing?",
    answer: "0-6, in half-point increments.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-06",
    courseSlug: "gre-general-test-preparation",
    question: "What does 'section-level adaptive' mean for GRE Verbal and Quant?",
    answer:
      "The difficulty of the second Verbal section depends on your performance in the first Verbal section (and the same for Quant) -- this is adaptivity at the section level, not question-by-question within a section.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-07",
    courseSlug: "gre-general-test-preparation",
    question: "Is there negative marking on the GRE for wrong answers?",
    answer: "No -- there is no negative marking, so guessing is never penalized.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-08",
    courseSlug: "gre-general-test-preparation",
    question: "Can you return to a previous section once you've moved on in the GRE?",
    answer:
      "No -- you cannot return to a previous section, though you generally can move between questions within the current section (mark and review).",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-09",
    courseSlug: "gre-general-test-preparation",
    question: "Roughly how many questions total appear across the two Verbal sections combined?",
    answer: "27 questions total, across both Verbal Reasoning sections combined.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-10",
    courseSlug: "gre-general-test-preparation",
    question:
      "Roughly how many questions total appear across the two Quantitative sections combined?",
    answer: "27 questions total, across both Quantitative Reasoning sections combined.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-11",
    courseSlug: "gre-general-test-preparation",
    question: "Why does every question in the first Verbal section matter more than it might seem?",
    answer:
      "Because performance in the first Verbal section determines the difficulty (and therefore the scoring potential) of the second Verbal section -- the same logic applies to the first Quant section.",
    category: "Format & Scoring",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-12",
    courseSlug: "gre-general-test-preparation",
    question: "What is the total possible GRE score range if you add Verbal and Quant together?",
    answer: "260-340 (130-170 for Verbal plus 130-170 for Quant).",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-13",
    courseSlug: "gre-general-test-preparation",
    question: "Can this platform predict what GRE score you would actually achieve?",
    answer:
      "No -- this platform provides self-paced practice and self-review, never a claimed or predicted official GRE score.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-format-14",
    courseSlug: "gre-general-test-preparation",
    question: "Where should you confirm current GRE registration fees and test dates?",
    answer:
      "The official ETS GRE website -- this course's content is periodically reviewed but never states fees or dates as permanent facts.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Verbal Reasoning (12) ---
  {
    id: "gre-prep-verbal-01",
    courseSlug: "gre-general-test-preparation",
    question:
      "What GRE Verbal question type asks you to fill in one, two, or three blanks in a passage?",
    answer:
      "Text Completion -- you select a word for each blank from a separate answer-choice column, and every blank must be filled correctly to earn credit for the question.",
    category: "Verbal Reasoning",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-02",
    courseSlug: "gre-general-test-preparation",
    question:
      "In Sentence Equivalence, how many answer choices must you select, and why does that matter?",
    answer:
      "Exactly two, and both must produce sentences with the same overall meaning -- selecting only one correct answer, even if it's right, earns no credit for that question.",
    category: "Verbal Reasoning",
    difficulty: "intermediate",
    commonMistake:
      "Selecting only one confident answer for Sentence Equivalence instead of finding the matching pair.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-03",
    courseSlug: "gre-general-test-preparation",
    question:
      "What does Reading Comprehension test beyond simply understanding a passage's content?",
    answer:
      "It also tests inference, the author's tone/purpose, and how supporting details relate to the passage's main argument -- not just literal recall of facts stated in the text.",
    category: "Verbal Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-04",
    courseSlug: "gre-general-test-preparation",
    question:
      "For a Text Completion question with multiple blanks, should you solve the blanks in the order they appear?",
    answer:
      "Not necessarily -- it's often more effective to start with whichever blank has the clearest contextual clues, then use that word's meaning to help resolve the remaining blanks.",
    category: "Verbal Reasoning",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-05",
    courseSlug: "gre-general-test-preparation",
    question: "What is a critical-reasoning-style question typically asking you to evaluate?",
    answer:
      "The logical structure of a short argument -- e.g. an assumption it depends on, a way to strengthen/weaken it, or a flaw in its reasoning -- rather than simply summarizing what it says.",
    category: "Verbal Reasoning",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-06",
    courseSlug: "gre-general-test-preparation",
    question: "Why is vocabulary alone not sufficient to do well on GRE Verbal?",
    answer:
      "Verbal also tests reasoning about how ideas relate within a sentence or passage (contrast, cause, support) -- knowing a word's definition doesn't automatically tell you which blank or argument-evaluation choice fits the passage's logic.",
    category: "Verbal Reasoning",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-07",
    courseSlug: "gre-general-test-preparation",
    question: "In Text Completion, what should you do before looking at the answer choices?",
    answer:
      "Try to predict, in your own words, what kind of word would logically fill the blank based on the sentence's context -- then match that prediction against the choices.",
    category: "Verbal Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-08",
    courseSlug: "gre-general-test-preparation",
    question:
      "What signals in a sentence often indicate a contrast relationship relevant to a Text Completion blank?",
    answer:
      "Words like 'however,' 'although,' 'yet,' or 'despite' -- these typically signal the blank needs a word contrasting with an idea elsewhere in the sentence.",
    category: "Verbal Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-09",
    courseSlug: "gre-general-test-preparation",
    question:
      "Should you use outside knowledge of a Reading Comprehension passage's topic to answer questions about it?",
    answer:
      "No -- answer strictly based on what the passage itself states or implies, not on prior knowledge you may have about the subject.",
    category: "Verbal Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-10",
    courseSlug: "gre-general-test-preparation",
    question:
      "Why might two Sentence Equivalence choices that are synonyms of each other NOT both be correct?",
    answer:
      "The pair must both produce sentences with equivalent overall meaning -- a synonym pair that doesn't logically fit the sentence's context is not automatically the right answer just because the two words are synonyms.",
    category: "Verbal Reasoning",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-11",
    courseSlug: "gre-general-test-preparation",
    question: "What is a common mistake when identifying an argument's underlying assumption?",
    answer:
      "Confusing an assumption (an unstated premise the argument depends on) with a conclusion or a restated fact already given in the passage.",
    category: "Verbal Reasoning",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-verbal-12",
    courseSlug: "gre-general-test-preparation",
    question: "Does this platform provide real GRE Verbal passages, or original ones?",
    answer:
      "All practice passages and questions are original -- never copied from real GRE material.",
    category: "Verbal Reasoning",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Quantitative Reasoning (14) ---
  {
    id: "gre-prep-quant-01",
    courseSlug: "gre-general-test-preparation",
    question:
      "What is Quantitative Comparison, and what makes it different from standard multiple choice?",
    answer:
      "You're given two quantities (A and B) and must determine their relationship (A is greater, B is greater, they're equal, or it can't be determined from the given information) -- a distinct GRE-specific format, not a typical multiple-choice question.",
    category: "Quantitative Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-02",
    courseSlug: "gre-general-test-preparation",
    question:
      "In a Quantitative Comparison question, when is 'cannot be determined' the correct answer?",
    answer:
      "When the relationship between the two quantities genuinely depends on a variable's value that isn't fixed by the given information -- e.g. if a variable could be positive or negative.",
    category: "Quantitative Reasoning",
    difficulty: "advanced",
    commonMistake:
      "Assuming a variable is positive by default when the problem never actually states that constraint.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-03",
    courseSlug: "gre-general-test-preparation",
    question: "What broad topic areas does GRE Quantitative Reasoning cover?",
    answer:
      "Arithmetic, algebra, geometry, and data analysis (interpreting charts/tables and basic statistics).",
    category: "Quantitative Reasoning",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-04",
    courseSlug: "gre-general-test-preparation",
    question: "Does GRE Quant have both multiple-choice and numeric-entry question types?",
    answer:
      "Yes -- multiple choice (single and multiple answer) and numeric entry (typing in your own numeric answer, with no choices given).",
    category: "Quantitative Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-05",
    courseSlug: "gre-general-test-preparation",
    question:
      "Why might picking simple numbers to test be a useful strategy on some Quant problems?",
    answer:
      "For problems involving variables without specific values, substituting simple numbers (like 2 or 0) that satisfy the given constraints can quickly reveal a relationship or eliminate answer choices, without needing full algebraic manipulation.",
    category: "Quantitative Reasoning",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-06",
    courseSlug: "gre-general-test-preparation",
    question:
      "In a data-analysis question with a table or chart, what should you do before answering?",
    answer:
      "Carefully read the chart's title, axis labels, and units first -- misreading these is a common source of avoidable errors, independent of the actual math involved.",
    category: "Quantitative Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-07",
    courseSlug: "gre-general-test-preparation",
    question: "What is a common mistake with geometry problems that show a figure?",
    answer:
      "Assuming the figure is drawn exactly to scale -- unless the problem explicitly states this, you should rely on the given measurements and stated relationships, not visual appearance.",
    category: "Quantitative Reasoning",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-08",
    courseSlug: "gre-general-test-preparation",
    question: "Is a calculator available during the GRE Quantitative sections?",
    answer:
      "Yes -- an on-screen calculator is provided during the Quant sections, though it doesn't replace understanding the underlying math concepts.",
    category: "Quantitative Reasoning",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-09",
    courseSlug: "gre-general-test-preparation",
    question: "What does 'data analysis' cover on the GRE beyond reading a single chart?",
    answer:
      "Basic statistics concepts like mean, median, mode, range, and standard deviation, plus interpreting distributions and probability in straightforward scenarios.",
    category: "Quantitative Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-10",
    courseSlug: "gre-general-test-preparation",
    question: "Why should you double-check units in a word problem before finalizing an answer?",
    answer:
      "A correctly-solved equation can still produce a wrong final answer if the required units (e.g. minutes vs. hours) don't match what the question actually asks for.",
    category: "Quantitative Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-11",
    courseSlug: "gre-general-test-preparation",
    question:
      "For a multiple-answer multiple-choice Quant question, what happens if you select only some of the correct answers?",
    answer:
      "You typically receive no credit unless you select every correct choice and no incorrect ones -- partial credit is generally not given for this question type.",
    category: "Quantitative Reasoning",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-12",
    courseSlug: "gre-general-test-preparation",
    question:
      "What's a reliable first step for an algebra word problem you're unsure how to start?",
    answer:
      "Translate the problem's sentences into equations one piece at a time, clearly defining what each variable represents before attempting to solve.",
    category: "Quantitative Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-13",
    courseSlug: "gre-general-test-preparation",
    question:
      "Can skipping a difficult Quant question and returning to it later hurt your score, given there's no penalty for guessing?",
    answer:
      "Marking a question and returning later (within the same section) is a legitimate strategy -- since there's no negative marking, always leave a guess rather than skipping entirely if you run out of time.",
    category: "Quantitative Reasoning",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-quant-14",
    courseSlug: "gre-general-test-preparation",
    question: "Are this platform's Quant practice questions taken from real retired GRE exams?",
    answer:
      "No -- every practice question is original, written to reflect real GRE question types and difficulty, never copied from actual ETS material.",
    category: "Quantitative Reasoning",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Analytical Writing (10) ---
  {
    id: "gre-prep-awa-01",
    courseSlug: "gre-general-test-preparation",
    question: "What is the current GRE Analytical Writing task called?",
    answer:
      "Analyze an Issue -- responding critically to a general statement about a topic of broad interest.",
    category: "Analytical Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-awa-02",
    courseSlug: "gre-general-test-preparation",
    question: "How much time do you have for the Analyze an Issue task?",
    answer:
      "30 minutes -- the same fixed window whether you spend it planning, writing, or both, so budgeting a few minutes for an outline still needs to leave enough time to fully develop the response.",
    category: "Analytical Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-awa-03",
    courseSlug: "gre-general-test-preparation",
    question: "Who scores GRE Analytical Writing responses?",
    answer:
      "Trained human raters score the response, typically alongside an automated scoring check.",
    category: "Analytical Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-awa-04",
    courseSlug: "gre-general-test-preparation",
    question:
      "Does Analyze an Issue expect you to simply agree or simply disagree with the statement?",
    answer:
      "It expects you to evaluate the statement critically and develop your own position with reasons and examples -- a nuanced, qualified position (e.g. 'true under some conditions but not others') is often stronger than a simple, unqualified agree/disagree.",
    category: "Analytical Writing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-awa-05",
    courseSlug: "gre-general-test-preparation",
    question:
      "Does this platform's self-review tool provide an actual GRE Analytical Writing score?",
    answer: "No -- it's a self-assessment rubric checklist, never a claimed AI or official score.",
    category: "Analytical Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-awa-06",
    courseSlug: "gre-general-test-preparation",
    question: "Does the current GRE still include a separate 'Analyze an Argument' essay?",
    answer:
      "No -- that task was removed in an earlier revision. Only 'Analyze an Issue' remains on the current test.",
    category: "Analytical Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-awa-07",
    courseSlug: "gre-general-test-preparation",
    question: "What kind of examples strengthen an Analyze an Issue response?",
    answer:
      "Specific, concrete examples (real or clearly hypothetical but well-reasoned) that directly support your stated position, rather than vague generalizations.",
    category: "Analytical Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-awa-08",
    courseSlug: "gre-general-test-preparation",
    question:
      "Should you address potential counterarguments to your position in an Analyze an Issue essay?",
    answer:
      "Generally yes -- acknowledging and responding to a plausible counterargument tends to make your position appear more carefully considered than ignoring it entirely.",
    category: "Analytical Writing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-awa-09",
    courseSlug: "gre-general-test-preparation",
    question:
      "How much time should you spend planning before writing your Analyze an Issue response?",
    answer:
      "A few minutes is generally worthwhile -- briefly outlining your position and 2-3 supporting points before writing tends to produce a more organized response than writing without a plan.",
    category: "Analytical Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "gre-prep-awa-10",
    courseSlug: "gre-general-test-preparation",
    question: "Is there an official minimum or maximum word count for the Analyze an Issue task?",
    answer:
      "The GRE does not set an official minimum or maximum word count for this task -- focus on developing your position clearly and thoroughly rather than hitting a specific length.",
    category: "Analytical Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
