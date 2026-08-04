import type { TechnologyInput } from "@/lib/directory/types";

/**
 * Phase 6: one technology-guide entry per placement-prep category, each
 * pointing at its real course via `courseId`. These exist so the
 * `quantitative-aptitude` / `reasoning` / `career-gd` categories can carry
 * `publicVisibility: true` without violating `validateCategories`'s "a
 * public category must have at least one public technology" rule (see
 * lib/directory/validate.ts) -- there is no separate technology stack to
 * document for these subjects, so the guide entry itself just orients a
 * learner and links straight to the real course content.
 */
export const placementPrepTechnologies: TechnologyInput[] = [
  {
    id: "quantitative-aptitude-guide",
    slug: "quantitative-aptitude-guide",
    name: "Quantitative Aptitude",
    category: "quantitative-aptitude",
    description: "Numerical reasoning for placement and entrance aptitude tests.",
    overview:
      "Quantitative aptitude covers the arithmetic and numerical reasoning skills placement tests and entrance exams evaluate: number systems, percentages, interest, ratios, time/speed/distance and time/work, and reading data from tables and charts.",
    whatItIs:
      "A set of numerical problem-solving techniques, not a programming language or piece of software -- the skill of translating a word problem into the right arithmetic or algebraic setup and solving it accurately under time pressure.",
    whyItsUsed:
      "Most campus placement processes and many entrance exams include a quantitative aptitude section, since it is a fast, standardized way to assess numerical reasoning independent of a candidate's specific academic major.",
    whereItFits:
      "Typically the first stage of a placement process, often alongside logical reasoning, before technical and HR interview rounds.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["reasoning-guide"],
    coreConcepts: [
      "Number systems and divisibility",
      "Percentages, profit/loss, and interest",
      "Ratio, proportion, and mixtures",
      "Time, speed, distance, and work",
      "Data interpretation",
    ],
    example: {
      language: "javascript",
      code: "function percentageChange(oldValue, newValue) {\n  return Math.round(((newValue - oldValue) / oldValue) * 100 * 100) / 100;\n}\n// percentageChange(80, 100) -> 25",
      explanation:
        "Quantitative aptitude problems translate directly into small, checkable calculations like this one -- exactly the kind of function each lesson's exercises have you implement and test.",
    },
    useCases: [
      "Campus placement aptitude test preparation",
      "Entrance exam numerical ability sections",
      "General numerical fluency for day-to-day estimation",
    ],
    practiceOptions: ["Lesson exercises and quizzes", "Course-wide practice session"],
    projectIdeas: [
      "Build a small script that generates and checks your own practice problems for a topic you find weak",
    ],
    references: [
      {
        label: "Wikipedia: Quantitative reasoning",
        url: "https://en.wikipedia.org/wiki/Quantitative_reasoning",
      },
    ],
    searchKeywords: ["aptitude", "quant", "placement test", "numerical reasoning"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-04",
    courseId: "quantitative-aptitude",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "reasoning-guide",
    slug: "reasoning-guide",
    name: "Logical and Analytical Reasoning",
    category: "reasoning",
    description: "Pattern recognition and structured logical reasoning for placement tests.",
    overview:
      "Logical and analytical reasoning covers the pattern-recognition and structured-deduction skills placement tests evaluate: series and coding-decoding, blood relations and direction sense, syllogisms, arrangement puzzles, and critical reasoning.",
    whatItIs:
      "A set of structured problem-solving techniques for working through clues, patterns, and logical statements systematically, rather than relying on intuition alone.",
    whyItsUsed:
      "Placement tests use reasoning sections to evaluate how a candidate approaches an unfamiliar structured problem -- a skill that generalizes well beyond any one subject area.",
    whereItFits:
      "Usually paired with quantitative aptitude in the first stage of a placement process.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: ["quantitative-aptitude-guide"],
    coreConcepts: [
      "Series and coding-decoding",
      "Blood relations and direction sense",
      "Syllogisms and logical deduction",
      "Seating arrangements and puzzles",
      "Critical reasoning and argument evaluation",
    ],
    example: {
      language: "javascript",
      code: "function nextInArithmeticSeries(series) {\n  const step = series[1] - series[0];\n  return series[series.length - 1] + step;\n}\n// nextInArithmeticSeries([3, 7, 11, 15]) -> 19",
      explanation:
        "Reasoning problems become small, testable functions like this one -- exactly the pattern every lesson's exercises use.",
    },
    useCases: [
      "Campus placement reasoning test preparation",
      "Entrance exam logical ability sections",
      "General structured problem-solving practice",
    ],
    practiceOptions: ["Lesson exercises and quizzes", "Course-wide practice session"],
    projectIdeas: [
      "Write a small function library that checks a family-relation chain or a seating-arrangement clue set for consistency",
    ],
    references: [
      {
        label: "Wikipedia: Logical reasoning",
        url: "https://en.wikipedia.org/wiki/Logical_reasoning",
      },
    ],
    searchKeywords: ["reasoning", "logical reasoning", "verbal ability", "placement test"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-04",
    courseId: "logical-analytical-reasoning",
    projectIds: [],
    publicVisibility: true,
  },
  {
    id: "career-gd-guide",
    slug: "career-gd-guide",
    name: "Career and Group Discussion Preparation",
    category: "career-gd",
    description: "Group discussion technique and interview preparation for campus placements.",
    overview:
      "Career and group discussion preparation covers professional communication, resume writing, group discussion technique, and interview preparation including the STAR method for behavioral questions.",
    whatItIs:
      "A structured approach to preparing for the communication-focused stages of a placement process -- not a claim that any exercise here judges a person's real communication skill, only that it checks concrete, rule-based structural criteria (e.g. does a STAR answer have all four parts).",
    whyItsUsed:
      "Group discussions and interviews are where most placement processes actually decide between similarly-qualified candidates, and structure/preparation measurably improve performance in both.",
    whereItFits:
      "Typically the later stages of a placement process, after aptitude and reasoning tests, alongside or after technical interviews.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: [],
    coreConcepts: [
      "Professional communication and resume writing",
      "Group discussion structure and etiquette",
      "The STAR method for behavioral interview questions",
      "Handling common and difficult interview questions",
      "Workplace communication and professionalism",
    ],
    example: {
      language: "javascript",
      code: "function isCompleteStarAnswer(answer) {\n  return Boolean(answer.situation && answer.task && answer.action && answer.result);\n}\n// isCompleteStarAnswer({ situation: 'x', task: 'y', action: 'z', result: '' }) -> false",
      explanation:
        "This course's exercises check concrete, rule-based structural criteria like this -- never a subjective judgment of a person's real communication skill.",
    },
    useCases: [
      "Campus placement group discussion preparation",
      "Behavioral interview preparation",
      "General professional communication practice",
    ],
    practiceOptions: ["Lesson exercises and quizzes", "Course-wide practice session"],
    projectIdeas: [
      "Draft and structurally self-check three STAR-format answers for your own real experiences",
    ],
    references: [
      { label: "Wikipedia: Job interview", url: "https://en.wikipedia.org/wiki/Job_interview" },
    ],
    searchKeywords: ["group discussion", "career prep", "interview prep", "resume"],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-04",
    courseId: "career-and-gd-preparation",
    projectIds: [],
    publicVisibility: true,
  },
];
