import type { ExamPrepMetaInput } from "@/lib/exam-prep/types";

/**
 * TOEFL iBT exam-prep meta: writing/speaking self-review tasks and the
 * independence/trademark notice data. Lesson content (the 12 lessons
 * covering Reading/Listening/Speaking/Writing strategy and objective
 * practice questions) lives in content/lessons/toefl.ts as ordinary Lesson
 * records, reusing the existing course/lesson/quiz/practice infrastructure --
 * see docs/product-expansion/DECISIONS.md and content/lessons/toefl.ts's
 * header comment for the format-verification notes.
 *
 * Task set reflects the TOEFL iBT format as redesigned January 21, 2026:
 * Writing is Build a Sentence, Write an Email, and Write for an Academic
 * Discussion (the old integrated reading-listening-writing essay and
 * standalone independent essay were both replaced). Speaking is Listen and
 * Repeat and Take an Interview (the old independent + three integrated
 * speaking tasks were replaced). Verified against ets.org during this
 * authoring session -- see `officialSources`.
 */
export const toeflExamPrepMeta: ExamPrepMetaInput = {
  courseSlug: "toefl-ibt-preparation",
  officialFullName: "Test of English as a Foreign Language, Internet-Based Test",
  officialAbbreviation: "TOEFL iBT",
  administeringBodies: ["ETS (Educational Testing Service)"],
  lastReviewed: "2026-08-07",
  officialSources: [
    { label: "TOEFL iBT official site", url: "https://www.ets.org/toefl/" },
    {
      label: "TOEFL iBT score breakdown -- what your scores mean",
      url: "https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html",
    },
    {
      label: "TOEFL iBT 1-6 score scale update and CEFR alignment",
      url: "https://www.ets.org/toefl/institutions/ibt/score-scale-update.html",
    },
    {
      label: "TOEFL iBT test content and section breakdown",
      url: "https://www.ets.org/toefl/test-takers/ibt/about/content.html",
    },
    {
      label: "TOEFL iBT Writing section",
      url: "https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html",
    },
    {
      label: "TOEFL iBT Speaking section",
      url: "https://www.ets.org/toefl/test-takers/ibt/about/content/speaking.html",
    },
  ],
  writingTasks: [
    {
      id: "toefl-writing-build-a-sentence",
      taskName: "Build a Sentence: Sentence reordering",
      instructions:
        "In the real TOEFL iBT Writing section, this task shows scrambled words and phrases on screen for you to reorder using clicks -- there is no free-typing involved there. This self-review version adapts it to a typed response: type out one grammatically correct sentence (or question) using every given word/phrase exactly once, in an order that makes sense.",
      prompt:
        "Rearrange the following into a single grammatically correct sentence, using every word/phrase exactly once: 'the results / were reviewed / by two independent researchers / before publication / carefully'.",
      timeLimitMinutes: 2,
      rubric: [
        {
          criterion: "Grammatical correctness",
          guidance:
            "Is the sentence grammatically complete and correct -- proper subject-verb agreement and word order?",
        },
        {
          criterion: "Sentence completeness",
          guidance:
            "Did you use all of the given words/phrases exactly once, without adding extra words or omitting any?",
        },
        {
          criterion: "Meaning clarity",
          guidance:
            "Does the resulting sentence express a clear, sensible meaning, not just a grammatically valid but oddly-ordered string of words?",
        },
      ],
    },
    {
      id: "toefl-writing-email",
      taskName: "Write an Email: Practical email response",
      instructions:
        "You have about 7 minutes for this task. Write a real, purpose-driven email responding to the situation described. State your purpose early, include every piece of information the situation requires, and use a tone appropriate to the recipient.",
      prompt:
        "You ordered a textbook online for a course that starts next week, but the tracking information shows it has not shipped yet. Write an email to the bookstore's customer service team. In your email: explain the situation, ask when the book is expected to ship, and request a solution if it will not arrive in time for your first class. Write approximately 80-120 words.",
      timeLimitMinutes: 7,
      minWords: 80,
      maxWords: 120,
      rubric: [
        {
          criterion: "Task completion",
          guidance:
            "Did you cover all three required points (the situation, the shipping question, and the requested solution) concisely?",
        },
        {
          criterion: "Tone and register",
          guidance:
            "Is the tone appropriate for a customer-service email -- polite, clear, and purposeful?",
        },
        {
          criterion: "Organization and clarity",
          guidance: "Is your purpose stated early, with ideas clearly and logically ordered?",
        },
        {
          criterion: "Grammar and vocabulary",
          guidance:
            "Is the grammar generally accurate, with vocabulary appropriate for practical written communication?",
        },
      ],
    },
    {
      id: "toefl-writing-academic-discussion",
      taskName: "Write for an Academic Discussion: Online class discussion post",
      instructions:
        "You have about 10 minutes for this task. Read the professor's discussion prompt and a classmate's post, then write your own post stating and supporting your opinion. Briefly engage with the classmate's point if relevant.",
      prompt:
        "Professor's post: This week we're discussing whether university students should be required to complete an internship before graduating. Some argue it provides valuable real-world experience; others argue it adds financial and scheduling burden, especially for students who already work part-time. What is your view? Classmate (Marcus): I think it should be required -- my internship taught me more about my field in three months than two years of lectures did. Write your own response post. Write at least 100 words.",
      timeLimitMinutes: 10,
      minWords: 100,
      rubric: [
        {
          criterion: "Position clarity",
          guidance:
            "Did you clearly state your own opinion on the discussion question, not just summarize both sides?",
        },
        {
          criterion: "Development and support",
          guidance:
            "Did you support your position with at least one concrete reason or example, developed rather than vague?",
        },
        {
          criterion: "Engagement with discussion context",
          guidance:
            "Did you briefly acknowledge the classmate's post -- agreeing, disagreeing, or adding a distinct angle?",
        },
        {
          criterion: "Language use",
          guidance:
            "Is the grammar and vocabulary generally accurate and appropriate for an academic discussion post?",
        },
      ],
    },
  ],
  speakingTasks: [
    {
      id: "toefl-speaking-listen-and-repeat",
      taskName: "Listen and Repeat: Sentence repetition",
      instructions:
        "In the real test, you hear a short sentence once and must repeat it immediately, with no preparation time. This self-review version asks you to read the sentence once silently, then look away and record yourself saying it aloud from memory, exactly as written.",
      prompt:
        "Read the following sentence once, then look away and repeat it aloud exactly as written, from memory: 'The community center's new evening classes fill up quickly, so early registration is strongly recommended.'",
      prepSeconds: 0,
      speakSeconds: 15,
      rubric: [
        {
          criterion: "Accuracy",
          guidance:
            "Did you reproduce the sentence's exact words and structure, as closely as possible?",
        },
        {
          criterion: "Fluency",
          guidance: "Did you speak at a natural pace without long pauses or restarts?",
        },
        {
          criterion: "Intelligibility",
          guidance: "Was your speech clear and easy to understand throughout?",
        },
        {
          criterion: "Pronunciation and stress",
          guidance:
            "Did you use natural sentence stress on key words, rather than flat, even emphasis?",
        },
      ],
    },
    {
      id: "toefl-speaking-take-an-interview",
      taskName: "Take an Interview: Spontaneous Q&A",
      instructions:
        "In the real test, you answer several interview-style questions about a familiar academic or campus topic, about 45 seconds each, with no preparation time. Answer the prompt below immediately and directly, without pausing to plan.",
      prompt:
        "Interview topic: Study habits. Question: What is one habit that helps you study or work more effectively, and why does it help you specifically?",
      prepSeconds: 0,
      speakSeconds: 45,
      rubric: [
        {
          criterion: "Relevance and organization",
          guidance: "Did your answer directly and clearly address the actual question asked?",
        },
        {
          criterion: "Fluency",
          guidance:
            "Did you speak at a natural pace with minimal hesitation, given there was no prep time?",
        },
        {
          criterion: "Language use",
          guidance:
            "Did you use appropriate vocabulary and grammar for natural, spontaneous speech?",
        },
        {
          criterion: "Intelligibility",
          guidance: "Was your speech clear and understandable throughout the full response?",
        },
      ],
    },
  ],
};
