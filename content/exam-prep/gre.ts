import type { ExamPrepMetaInput } from "@/lib/exam-prep/types";

/**
 * GRE exam-prep meta: writing self-review tasks and the independence/
 * trademark notice data. Lesson content (the 12 lessons covering test
 * format, scoring, Verbal Reasoning, Quantitative Reasoning, and Analytical
 * Writing strategy, plus original practice questions) lives in
 * content/lessons/gre.ts as ordinary Lesson records, reusing the existing
 * course/lesson/quiz/practice infrastructure -- see
 * docs/product-expansion/DECISIONS.md.
 *
 * The GRE General Test has no speaking section at all -- it consists of
 * Verbal Reasoning, Quantitative Reasoning, and Analytical Writing only --
 * so `speakingTasks` is intentionally an empty array. Never fabricate a
 * speaking task for an exam that doesn't have one; the UI hides the
 * Speaking tab entirely when this array is empty (see ExamPracticeHub).
 */
export const greExamPrepMeta: ExamPrepMetaInput = {
  courseSlug: "gre-general-test-preparation",
  officialFullName: "Graduate Record Examinations General Test",
  officialAbbreviation: "GRE",
  administeringBodies: ["ETS (Educational Testing Service)"],
  lastReviewed: "2026-08-07",
  officialSources: [{ label: "ETS GRE General Test", url: "https://www.ets.org/gre/" }],
  writingTasks: [
    {
      id: "gre-analyze-an-issue-prompt-1",
      taskName: "Analytical Writing: Analyze an Issue (Prompt 1)",
      instructions:
        "You have 30 minutes for this task. Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, consider ways in which the statement might or might not hold true, and explain how these considerations shape your position. There is no automated grading here -- self-score your response against the rubric below.",
      prompt:
        '"As societies rely more heavily on automated systems to make everyday decisions, individual judgment becomes less necessary." Write a response discussing the extent to which you agree or disagree with this statement.',
      timeLimitMinutes: 30,
      rubric: [
        {
          criterion: "Clarity and development of position",
          guidance:
            "Did you clearly state your own position on the issue early in the response, rather than only restating the prompt or summarizing both sides with no stance of your own?",
        },
        {
          criterion: "Quality of supporting reasons",
          guidance:
            "Does each body paragraph develop one distinct reason with a specific example, scenario, or clear logical explanation, rather than a vague generality?",
        },
        {
          criterion: "Organization",
          guidance:
            "Does the response follow a clear structure -- introduction stating your position, developed body paragraphs, and a conclusion that reinforces the position without introducing new claims?",
        },
        {
          criterion: "Command of standard written English",
          guidance:
            "Is the response free of major grammar, punctuation, and sentence-structure errors that would interfere with a reader's understanding?",
        },
      ],
    },
    {
      id: "gre-analyze-an-issue-prompt-2",
      taskName: "Analytical Writing: Analyze an Issue (Prompt 2)",
      instructions:
        "You have 30 minutes for this task. Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, consider ways in which the statement might or might not hold true, and explain how these considerations shape your position. There is no automated grading here -- self-score your response against the rubric below.",
      prompt:
        '"Public institutions, such as schools and government agencies, should prioritize short-term, easily measurable outcomes over long-term goals that are harder to evaluate." Write a response discussing the extent to which you agree or disagree with this statement.',
      timeLimitMinutes: 30,
      rubric: [
        {
          criterion: "Clarity and development of position",
          guidance:
            "Did you clearly state your own position on the issue early in the response, rather than only restating the prompt or summarizing both sides with no stance of your own?",
        },
        {
          criterion: "Quality of supporting reasons",
          guidance:
            "Does each body paragraph develop one distinct reason with a specific example, scenario, or clear logical explanation, rather than a vague generality?",
        },
        {
          criterion: "Organization",
          guidance:
            "Does the response follow a clear structure -- introduction stating your position, developed body paragraphs, and a conclusion that reinforces the position without introducing new claims?",
        },
        {
          criterion: "Command of standard written English",
          guidance:
            "Is the response free of major grammar, punctuation, and sentence-structure errors that would interfere with a reader's understanding?",
        },
      ],
    },
  ],
  speakingTasks: [],
};
