import type { ExamPrepMetaInput } from "@/lib/exam-prep/types";

/**
 * IELTS exam-prep meta: writing/speaking self-review tasks and the
 * independence/trademark notice data. Lesson content (the 12+ lessons
 * covering Listening/Reading/Writing/Speaking strategy and objective
 * practice questions) lives in content/lessons/ielts.ts as ordinary Lesson
 * records, reusing the existing course/lesson/quiz/practice infrastructure --
 * see docs/product-expansion/DECISIONS.md.
 */
export const ieltsExamPrepMeta: ExamPrepMetaInput = {
  courseSlug: "ielts-preparation",
  officialFullName: "International English Language Testing System",
  officialAbbreviation: "IELTS",
  administeringBodies: ["British Council", "IDP: IELTS Australia", "Cambridge Assessment English"],
  lastReviewed: "2026-08-07",
  officialSources: [
    { label: "IELTS official website", url: "https://www.ielts.org/" },
    {
      label: "IELTS test format",
      url: "https://www.ielts.org/for-test-takers/test-format",
    },
  ],
  writingTasks: [
    {
      id: "ielts-writing-task-1-academic",
      taskName: "Academic Writing Task 1: Describe visual data",
      instructions:
        "You have 20 minutes for this task. Describe the chart in your own words: summarize the main trends and make comparisons where relevant. Do not give opinions -- this task is objective description, not argument.",
      prompt:
        "The chart below shows the percentage of households with internet access in four countries between 2000 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
      timeLimitMinutes: 20,
      minWords: 150,
      rubric: [
        {
          criterion: "Task achievement",
          guidance:
            "Did you cover the main trends and overall pattern, not just list every number? Did you write at least 150 words?",
        },
        {
          criterion: "Coherence and cohesion",
          guidance:
            "Is the response organized into clear paragraphs with an overview and logically grouped details, using linking words appropriately?",
        },
        {
          criterion: "Lexical resource",
          guidance:
            'Did you use a range of vocabulary for describing change and comparison (e.g. "rose steadily", "in contrast") rather than repeating the same few words?',
        },
        {
          criterion: "Grammatical range and accuracy",
          guidance:
            "Did you use a mix of sentence structures and tenses correctly, with only occasional errors that don't affect meaning?",
        },
      ],
    },
    {
      id: "ielts-writing-task-2",
      taskName: "Writing Task 2: Opinion essay",
      instructions:
        "You have 40 minutes for this task. Write a clear, well-structured essay with an introduction, body paragraphs, and a conclusion. Support your position with reasons and examples.",
      prompt:
        "Some people believe that unpaid community service should be a compulsory part of high school education. To what extent do you agree or disagree? Write at least 250 words.",
      timeLimitMinutes: 40,
      minWords: 250,
      rubric: [
        {
          criterion: "Task response",
          guidance:
            "Did you clearly address the question, present a clear position, and support it with relevant ideas and examples? Did you write at least 250 words?",
        },
        {
          criterion: "Coherence and cohesion",
          guidance:
            "Does each paragraph have one main idea, with clear progression between paragraphs and appropriate linking words?",
        },
        {
          criterion: "Lexical resource",
          guidance:
            "Did you use precise, varied vocabulary appropriate for an academic essay, avoiding repetition and informal language?",
        },
        {
          criterion: "Grammatical range and accuracy",
          guidance:
            "Did you use a mix of simple and complex sentences with generally accurate grammar and punctuation?",
        },
      ],
    },
    {
      id: "ielts-writing-task-1-general",
      taskName: "General Training Writing Task 1: Letter",
      instructions:
        "You have 20 minutes for this task. Write a letter in an appropriate tone (formal, semi-formal, or informal depending on the situation) covering all three bullet points.",
      prompt:
        "You recently bought a piece of equipment for your kitchen, but it did not work properly. Write a letter to the shop manager. In your letter: describe the problem with the equipment, explain what happened when you spoke to a shop assistant, and say what you would like the manager to do. Write at least 150 words.",
      timeLimitMinutes: 20,
      minWords: 150,
      rubric: [
        {
          criterion: "Task achievement",
          guidance:
            "Did you cover all three bullet points and use a tone appropriate to the situation?",
        },
        {
          criterion: "Coherence and cohesion",
          guidance:
            "Does the letter have a clear opening, body, and closing, with ideas logically ordered?",
        },
        {
          criterion: "Lexical resource",
          guidance:
            "Did you use appropriate everyday/functional vocabulary for a letter of complaint?",
        },
        {
          criterion: "Grammatical range and accuracy",
          guidance:
            "Is the grammar generally accurate, with sentence structures suited to a letter?",
        },
      ],
    },
  ],
  speakingTasks: [
    {
      id: "ielts-speaking-part-1",
      taskName: "Speaking Part 1: Introduction and interview",
      instructions:
        "The examiner asks general questions about yourself and familiar topics. Answer naturally in 1-2 sentences per question -- this part is a warm-up, not a test of long answers.",
      prompt:
        "Let's talk about your hometown. Where is it? What do you like most about living there? Has it changed much in recent years?",
      prepSeconds: 0,
      speakSeconds: 60,
      rubric: [
        {
          criterion: "Fluency and coherence",
          guidance:
            "Did you speak at a natural pace without long pauses or excessive self-correction?",
        },
        {
          criterion: "Lexical resource",
          guidance:
            "Did you use everyday vocabulary accurately and naturally, without searching for words?",
        },
        {
          criterion: "Grammatical range and accuracy",
          guidance:
            "Did you use a mix of simple and more complex sentences with reasonable accuracy?",
        },
        {
          criterion: "Pronunciation",
          guidance: "Was your speech clear and easy to understand throughout?",
        },
      ],
    },
    {
      id: "ielts-speaking-part-2",
      taskName: "Speaking Part 2: Individual long turn (cue card)",
      instructions:
        "You get 1 minute to prepare using the prompts on the cue card, then speak for 1-2 minutes without interruption.",
      prompt:
        "Describe a skill you would like to learn. You should say: what the skill is, why you want to learn it, how you would learn it, and explain how learning it would benefit you.",
      prepSeconds: 60,
      speakSeconds: 120,
      rubric: [
        {
          criterion: "Fluency and coherence",
          guidance:
            "Did you speak for close to the full 2 minutes with logical development and minimal hesitation?",
        },
        {
          criterion: "Lexical resource",
          guidance: "Did you use topic-specific vocabulary and some less common words or phrases?",
        },
        {
          criterion: "Grammatical range and accuracy",
          guidance: "Did you use a range of tenses and sentence structures accurately?",
        },
        {
          criterion: "Pronunciation",
          guidance:
            "Did you use natural stress, rhythm, and intonation, staying easy to understand?",
        },
      ],
    },
    {
      id: "ielts-speaking-part-3",
      taskName: "Speaking Part 3: Two-way discussion",
      instructions:
        "The examiner asks more abstract follow-up questions related to Part 2's topic. Give developed answers with reasons and examples, not one-word responses.",
      prompt:
        "Let's talk more generally about skills and learning. Do you think it's more important to learn practical skills or academic knowledge in school? Why? How has technology changed the way people learn new skills?",
      prepSeconds: 0,
      speakSeconds: 90,
      rubric: [
        {
          criterion: "Fluency and coherence",
          guidance: "Did you give extended, developed answers rather than very short responses?",
        },
        {
          criterion: "Lexical resource",
          guidance:
            "Did you use more abstract/topic-specific vocabulary appropriate for a discussion?",
        },
        {
          criterion: "Grammatical range and accuracy",
          guidance:
            "Did you use complex sentences (e.g. conditionals, comparisons) with reasonable control?",
        },
        {
          criterion: "Pronunciation",
          guidance: "Did your pronunciation stay clear even in longer, more complex answers?",
        },
      ],
    },
  ],
};
