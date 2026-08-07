import type { ExamPrepMetaInput } from "@/lib/exam-prep/types";

/**
 * PTE Academic exam-prep meta: writing/speaking self-review tasks and the
 * independence/trademark notice data. Lesson content (the 12+ lessons
 * covering Speaking/Writing/Reading/Listening strategy and objective
 * practice questions) lives in content/lessons/pte.ts as ordinary Lesson
 * records, reusing the existing course/lesson/quiz/practice infrastructure --
 * see docs/product-expansion/DECISIONS.md. As with content/exam-prep/ielts.ts,
 * there is no automated grading anywhere here -- `rubric` on each task is a
 * self-review checklist, never a claimed AI or official PTE score.
 */
export const pteExamPrepMeta: ExamPrepMetaInput = {
  courseSlug: "pte-academic-preparation",
  officialFullName: "Pearson Test of English Academic",
  officialAbbreviation: "PTE Academic",
  administeringBodies: ["Pearson"],
  lastReviewed: "2026-08-07",
  officialSources: [
    { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
    {
      label: "PTE Academic test format",
      url: "https://www.pearsonpte.com/pte-academic/test-format/",
    },
  ],
  writingTasks: [
    {
      id: "pte-writing-summarize-written-text",
      taskName: "Summarize Written Text",
      instructions:
        "You have 10 minutes for this task. Read the passage, then write a single sentence, between 5 and 75 words, summarizing its main idea. Do not write more than one sentence -- a response with more than one sentence is scored as zero for content regardless of quality.",
      prompt:
        "In recent years, researchers studying cognitive science have examined whether widespread social media use is measurably changing how people process information over short periods of time. Several small-scale studies have reported that participants who use short-form video platforms heavily show reduced performance on laboratory tasks that require sustained, uninterrupted focus, compared to participants who report lower usage. However, the researchers involved in this work are careful to note important limitations: most of these studies are correlational rather than experimental, meaning they cannot establish that social media use directly causes reduced attention span rather than simply being associated with it, and it remains entirely possible that people who already struggle with sustained attention are simply drawn to shorter-form content in the first place. Some researchers have also pointed out that measured attention on a narrow laboratory task may not generalize well to attention in everyday life, where people naturally switch between tasks for practical reasons. Despite these open questions, a number of psychologists have begun recommending that heavy users of short-form content deliberately practice longer, uninterrupted reading or focus sessions, as a precaution, while more rigorous long-term research is conducted to clarify the relationship. Summarize the passage in one sentence of 5-75 words.",
      timeLimitMinutes: 10,
      minWords: 5,
      maxWords: 75,
      rubric: [
        {
          criterion: "Content",
          guidance:
            "Does your one sentence capture the passage's actual main idea, not just a supporting detail or example?",
        },
        {
          criterion: "Form",
          guidance:
            "Is your response exactly one sentence, and does it fall between 5 and 75 words?",
        },
        {
          criterion: "Grammar",
          guidance:
            "Is the sentence grammatically correct, including how you've combined multiple ideas with subordinate clauses or connectors?",
        },
        {
          criterion: "Vocabulary",
          guidance:
            "Have you paraphrased the passage's ideas in your own words rather than copying long strings of exact wording?",
        },
      ],
    },
    {
      id: "pte-writing-write-essay",
      taskName: "Write Essay",
      instructions:
        "You have 20 minutes for this task. Write a clear, well-structured essay of 200-300 words with an introduction stating your position, developed body paragraphs, and a conclusion.",
      prompt:
        "Some people believe that universities should focus primarily on preparing students for specific careers, while others believe a university education should prioritize broad, general knowledge instead. Discuss both views and give your own opinion. Write at least 200 words.",
      timeLimitMinutes: 20,
      minWords: 200,
      maxWords: 300,
      rubric: [
        {
          criterion: "Content",
          guidance:
            "Did you clearly address the prompt, cover both views, and state your own opinion with relevant reasoning?",
        },
        {
          criterion: "Form",
          guidance:
            "Does your response fall within the 200-300 word range, structured in clear paragraphs?",
        },
        {
          criterion: "Development, structure and coherence",
          guidance:
            "Does each body paragraph develop one main idea with a specific example or piece of reasoning, with logical progression between paragraphs?",
        },
        {
          criterion: "Grammar and vocabulary",
          guidance:
            "Did you use a range of accurate sentence structures and precise, varied vocabulary appropriate for an academic essay?",
        },
        {
          criterion: "Spelling",
          guidance:
            "Did you proofread for spelling errors in the final minutes before time runs out?",
        },
      ],
    },
  ],
  speakingTasks: [
    {
      id: "pte-speaking-read-aloud",
      taskName: "Read Aloud",
      instructions:
        "Use the short preparation time to preview the text once for meaning and plan natural phrase breaks and stress. When the response window begins, read the text aloud at a steady, natural pace -- if you make a small error, keep going rather than restarting.",
      prompt:
        "Many astronomers now believe that studying exoplanet atmospheres will be essential to understanding whether life could exist beyond our solar system. By analyzing the light that passes through a distant planet's atmosphere as it crosses in front of its star, researchers can identify chemical signatures that might indicate biological activity.",
      prepSeconds: 35,
      speakSeconds: 40,
      rubric: [
        {
          criterion: "Content",
          guidance:
            "Did you read the full text accurately, without skipping or substituting words?",
        },
        {
          criterion: "Oral fluency",
          guidance:
            "Did you read in natural phrase groups at a steady pace, without long pauses or an unnecessary restart?",
        },
        {
          criterion: "Pronunciation",
          guidance:
            "Was each word, including less common or multisyllable words, pronounced clearly?",
        },
      ],
    },
    {
      id: "pte-speaking-describe-image",
      taskName: "Describe Image",
      instructions:
        "This self-review task doesn't display an image directly. Choose any bar chart, line graph, map, or diagram from a real source (a textbook, a news article, or public data), then use your preparation time to identify its overall trend before describing it aloud for the response window.",
      prompt:
        "Find a chart, graph, map, or diagram from a real source. Describe it aloud in about 40 seconds: state its type and general subject first, then the single most significant overall trend or feature, then two or three specific supporting details.",
      prepSeconds: 25,
      speakSeconds: 40,
      rubric: [
        {
          criterion: "Content",
          guidance:
            "Did you state the overall trend or main feature before listing supporting details?",
        },
        {
          criterion: "Oral fluency",
          guidance:
            "Did you speak for close to the full response window without long hesitant pauses at the start?",
        },
        {
          criterion: "Pronunciation",
          guidance: "Was your description clear and easy to follow throughout?",
        },
      ],
    },
    {
      id: "pte-speaking-retell-lecture",
      taskName: "Retell Lecture",
      instructions:
        "Silently read the passage below once, as if it were a lecture you heard (since this self-review tool doesn't play audio), taking brief structural notes. Then retell its main idea and key supporting points aloud, in your own words, within the response window.",
      prompt:
        "When a honeybee scout finds a strong source of nectar, she returns to the hive and performs what researchers call a waggle dance -- a figure-eight movement repeated on the vertical surface of the honeycomb. The angle of the straight, waggling portion of the dance relative to vertical indicates the direction of the food source relative to the sun, while the duration of the waggling portion indicates roughly how far away it is. Other worker bees crowd around, follow the dance closely, and then fly out directly toward the indicated location. Researchers still debate exactly how much additional information, such as scent cues carried on the dancing bee's body, supplements the dance itself in guiding other foragers accurately.",
      prepSeconds: 10,
      speakSeconds: 40,
      rubric: [
        {
          criterion: "Content",
          guidance:
            "Did you lead with the passage's main idea, then cover its key supporting points in your own words?",
        },
        {
          criterion: "Oral fluency",
          guidance:
            "Did you speak at a natural pace using your notes as structure, rather than reading a memorized version?",
        },
        {
          criterion: "Pronunciation",
          guidance: "Did you stay clear and easy to understand throughout the retelling?",
        },
      ],
    },
  ],
};
