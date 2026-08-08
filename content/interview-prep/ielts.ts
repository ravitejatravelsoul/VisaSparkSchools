import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * IELTS Preparation Questions -- 50 frequently-asked questions about the
 * exam's format, scoring, and strategy (not job-interview questions; see
 * app/(site)/courses/[courseSlug]/preparation-questions/page.tsx). Every
 * answer is written from this course's own content and IELTS's published,
 * stable format facts -- none claim an official score prediction or imply
 * affiliation with IELTS/British Council/IDP/Cambridge Assessment English.
 */
export const ieltsInterviewQuestions: InterviewQuestionInput[] = [
  // --- Format & Scoring (12) ---
  {
    id: "ielts-prep-format-01",
    courseSlug: "ielts-preparation",
    question: "What are the two versions of IELTS, and who is each one for?",
    answer:
      "Academic is for university admission and professional registration; General Training is for immigration, work, and secondary education. Listening and Speaking are identical in both versions -- only Reading and Writing differ.",
    category: "Format & Scoring",
    difficulty: "beginner",
    followUp: "Which Reading/Writing tasks differ between the two versions?",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-02",
    courseSlug: "ielts-preparation",
    question: "How is the overall IELTS band score calculated?",
    answer:
      "It's the average of the four section bands (Listening, Reading, Writing, Speaking), rounded to the nearest half or whole band.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-03",
    courseSlug: "ielts-preparation",
    question: "In what order are the four IELTS sections taken?",
    answer:
      "Listening, then Reading, then Writing, normally back-to-back with no break, followed by Speaking (often on a different day or later the same day).",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-04",
    courseSlug: "ielts-preparation",
    question: "Are Listening and Reading scored the same way as Writing and Speaking?",
    answer:
      "No. Listening and Reading are scored objectively by counting correct answers and converting via a published table. Writing and Speaking are scored against four published subjective criteria each.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-05",
    courseSlug: "ielts-preparation",
    question: "What are the four IELTS Writing band criteria?",
    answer:
      "Task Achievement/Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-06",
    courseSlug: "ielts-preparation",
    question: "What are the four IELTS Speaking band criteria?",
    answer: "Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-07",
    courseSlug: "ielts-preparation",
    question: "Does IELTS require a minimum score in every individual section, or only an overall band?",
    answer:
      "It depends entirely on the institution or authority requiring the score -- many only require an overall band, but some also set individual section minimums. Always check your specific requirement rather than assuming.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    commonMistake: "Assuming an overall band requirement automatically means there's no section-level minimum, without checking the specific requirement.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-08",
    courseSlug: "ielts-preparation",
    question: "How long is IELTS Speaking, and can it be on a different day from the other sections?",
    answer:
      "Speaking lasts 11-14 minutes and is often scheduled on a different day or later the same day than Listening/Reading/Writing, depending on the test center.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-09",
    courseSlug: "ielts-preparation",
    question: "Roughly how should you divide your time when studying for IELTS if you don't know your weakest section?",
    answer:
      "Run a diagnostic across all four sections first, then spend more time on the section that's honestly weakest, while still touching every section regularly.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-10",
    courseSlug: "ielts-preparation",
    question: "Why might a fixed timeline like 'band 5 to band 8 in two weeks' be unrealistic?",
    answer:
      "Preparation timelines vary enormously by starting point, native language, and hours available per week -- test-prep researchers give only rough estimates, not guarantees, and IELTS itself sets no official timeline.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-11",
    courseSlug: "ielts-preparation",
    question: "Can this platform predict what IELTS band score you would actually achieve?",
    answer:
      "No. This platform provides self-paced practice and self-review, not an official or AI-predicted score -- only the real exam, taken through IELTS's official channels, produces a genuine band score.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-format-12",
    courseSlug: "ielts-preparation",
    question: "Where should you go to confirm current IELTS fees, test dates, and registration details?",
    answer:
      "The official IELTS website (ielts.org) -- this course's content is reviewed periodically but never states fees or dates as permanent facts, since they change.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Listening (10) ---
  {
    id: "ielts-prep-listening-01",
    courseSlug: "ielts-preparation",
    question: "How many sections does IELTS Listening have, and how does their difficulty change?",
    answer: "Four sections, generally increasing in difficulty from Section 1 through Section 4.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-listening-02",
    courseSlug: "ielts-preparation",
    question: "What kind of audio is IELTS Listening Section 1 typically?",
    answer: "An everyday two-person conversation, such as booking a service.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-listening-03",
    courseSlug: "ielts-preparation",
    question: "Which Listening section is typically the most challenging, and why?",
    answer:
      "Section 4, an academic monologue such as part of a lecture -- it comes last in the increasing-difficulty sequence and uses more academic vocabulary than the earlier sections.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-listening-04",
    courseSlug: "ielts-preparation",
    question: "How many times is the Listening audio played?",
    answer: "Once. There is no replay, which is why previewing questions before the audio starts matters so much.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-listening-05",
    courseSlug: "ielts-preparation",
    question: "Why is previewing the questions before the audio starts a high-value strategy?",
    answer:
      "It tells you what to listen for (a name, a number, a reason) and roughly where in the audio each answer will appear, since answers usually come in the same order as the questions.",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-listening-06",
    courseSlug: "ielts-preparation",
    question: "If a completion question says 'no more than two words,' and you write three words with correct content, do you get the mark?",
    answer:
      "No. Word-limit instructions are graded strictly -- exceeding the stated limit loses the mark even if the content itself is correct.",
    category: "Listening",
    difficulty: "intermediate",
    commonMistake: "Treating word-limit instructions as a soft suggestion rather than a strict rule.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-listening-07",
    courseSlug: "ielts-preparation",
    question: "A speaker says 'the workshop starts at 9... actually, we moved it to 9:30.' Which time is the correct answer?",
    answer:
      "9:30. Self-corrections are a common distractor pattern -- always trust the speaker's corrected/final statement over their first one.",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-listening-08",
    courseSlug: "ielts-preparation",
    question: "A multiple choice question says 'Choose TWO letters.' What happens if you only select one correct answer?",
    answer:
      "You lose marks -- both required answers must be selected correctly to get credit for that question, even if one of your two selections was right.",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-listening-09",
    courseSlug: "ielts-preparation",
    question: "Why is it important to recognize paraphrase in IELTS Listening?",
    answer:
      "The audio rarely uses the exact same words as the answer options -- e.g. 'a scheduling clash' in the audio might appear as 'a booking conflict' in an option. Listening only for exact word matches will cause you to miss correct answers.",
    category: "Listening",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-listening-10",
    courseSlug: "ielts-preparation",
    question: "What is a reliable strategy for matching questions where you must assign speakers or topics to categories?",
    answer:
      "Work through the items in the order given, listening for which category applies to each one, rather than trying to hold every category in mind simultaneously.",
    category: "Listening",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Reading (10) ---
  {
    id: "ielts-prep-reading-01",
    courseSlug: "ielts-preparation",
    question: "How does IELTS Academic Reading differ from General Training Reading?",
    answer:
      "Academic Reading has three long passages (academic books/journals/magazines). General Training uses several shorter everyday texts in the first two sections, plus one longer, more complex text in the third.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-reading-02",
    courseSlug: "ielts-preparation",
    question: "How much time is given for IELTS Reading, and is there extra transfer time like Listening has?",
    answer: "60 minutes total, with no extra transfer time -- unlike Listening, which has additional transfer time.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-reading-03",
    courseSlug: "ielts-preparation",
    question: "What does 'Not Given' mean in a True/False/Not Given question, and how does it differ from 'False'?",
    answer:
      "'Not Given' means the passage doesn't address the claim at all. 'False' means the passage directly contradicts the claim. Confusing these is the single most common mistake with this question type.",
    category: "Reading",
    difficulty: "intermediate",
    commonMistake: "Treating 'Not Given' as equivalent to 'False' instead of recognizing it means the passage never addresses the claim.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-reading-04",
    courseSlug: "ielts-preparation",
    question: "What is a reasonable time budget per passage in Academic Reading?",
    answer: "Roughly 20 minutes per passage, given 60 minutes total across three passages.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-reading-05",
    courseSlug: "ielts-preparation",
    question: "What is the difference between skimming and scanning?",
    answer:
      "Skimming means reading quickly for the general idea (useful for getting an overview or matching headings). Scanning means searching quickly for a specific detail (a date, name, or number) without reading every word.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-reading-06",
    courseSlug: "ielts-preparation",
    question: "What is the most common trap when matching headings to paragraphs?",
    answer:
      "Choosing a heading because it repeats a keyword also found in the paragraph, even though the heading describes a different overall idea -- headings test whether you understood the point of a paragraph, not just its vocabulary.",
    category: "Reading",
    difficulty: "advanced",
    followUp: "What should you read first in each paragraph to identify its main idea quickly?",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-reading-07",
    courseSlug: "ielts-preparation",
    question: "If you can't answer a difficult Reading question after a reasonable attempt, what should you do?",
    answer:
      "Make your best guess, flag it if you have time to return, and move on -- every question is worth the same one mark, so spending excessive time on one question at the cost of a whole later passage is a poor tradeoff.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-reading-08",
    courseSlug: "ielts-preparation",
    question: "Is the first sentence of a paragraph always its topic sentence?",
    answer: "Not always -- sometimes it's a transition sentence instead. Read enough of the paragraph to be sure of its main idea before deciding.",
    category: "Reading",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-reading-09",
    courseSlug: "ielts-preparation",
    question: "What kind of texts appear in General Training Reading's first two sections?",
    answer: "Everyday sources like notices, advertisements, and workplace documents, rather than academic material.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-reading-10",
    courseSlug: "ielts-preparation",
    question: "Should you answer a Reading question based on your own outside knowledge of the topic?",
    answer: "No -- answer strictly based on what the passage itself states, not on general knowledge you may already have about the subject.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Writing (10) ---
  {
    id: "ielts-prep-writing-01",
    courseSlug: "ielts-preparation",
    question: "What is the minimum word count for Academic Writing Task 1, and roughly how long should you spend on it?",
    answer: "At least 150 words, in about 20 minutes.",
    category: "Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-writing-02",
    courseSlug: "ielts-preparation",
    question: "What is the single most commonly missed element in a strong Academic Task 1 response?",
    answer:
      "An explicit overview sentence, stated before the details, summarizing the two or three most significant overall trends or features shown in the data.",
    category: "Writing",
    difficulty: "intermediate",
    commonMistake: "Listing every number in the chart without ever stepping back to state the data's main story.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-writing-03",
    courseSlug: "ielts-preparation",
    question: "Should Academic Writing Task 1 include your opinion about the data?",
    answer: "No -- Task 1 is purely objective description. You never argue for or against anything in this task.",
    category: "Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-writing-04",
    courseSlug: "ielts-preparation",
    question: "What must every General Training Task 1 letter cover?",
    answer:
      "All three bullet points given in the prompt -- missing even one noticeably limits the Task Achievement score, regardless of how well the rest is written.",
    category: "Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-writing-05",
    courseSlug: "ielts-preparation",
    question: "How should the tone of a General Training letter change based on the recipient?",
    answer:
      "Formal (a stranger in an official role: 'Dear Sir/Madam', no contractions), semi-formal (a professional but personal relationship), or informal (a friend or family member: 'Dear [First name]', natural contractions) -- matched to who you're writing to.",
    category: "Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-writing-06",
    courseSlug: "ielts-preparation",
    question: "What is the minimum word count and time allowance for Writing Task 2?",
    answer: "At least 250 words, in about 40 minutes -- roughly twice the weight of Task 1 toward your overall Writing band.",
    category: "Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-writing-07",
    courseSlug: "ielts-preparation",
    question: "What is the most common Task Response mistake in Writing Task 2 essays?",
    answer:
      "Not directly answering the actual question asked -- e.g. writing a 'discuss both views' essay that only argues one side, or an opinion essay that never states a clear personal position when explicitly asked to.",
    category: "Writing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-writing-08",
    courseSlug: "ielts-preparation",
    question: "What is a reliable four-paragraph structure for Writing Task 2?",
    answer:
      "Introduction (paraphrase the prompt, state your position), Body paragraph 1 (one main idea with an example), Body paragraph 2 (a second main idea, similarly developed), and a Conclusion (summarize your position, no new ideas).",
    category: "Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-writing-09",
    courseSlug: "ielts-preparation",
    question: "Is it better to cover many shallow points in a Task 2 body paragraph, or fewer ideas developed thoroughly?",
    answer: "Fewer ideas developed thoroughly with a specific example, rather than listing many shallow points.",
    category: "Writing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-writing-10",
    courseSlug: "ielts-preparation",
    question: "Can VisaSparkSchools's self-review Writing tool give you an official Writing band score?",
    answer: "No -- it's a self-assessment tool scored against a rubric checklist, never a claimed AI or official score.",
    category: "Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Speaking (8) ---
  {
    id: "ielts-prep-speaking-01",
    courseSlug: "ielts-preparation",
    question: "What topics does IELTS Speaking Part 1 cover, and how long does it last?",
    answer: "Familiar, everyday topics (home, work/study, hobbies, hometown), lasting about 4-5 minutes -- essentially a warm-up.",
    category: "Speaking",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-speaking-02",
    courseSlug: "ielts-preparation",
    question: "What length of answer is recommended for Speaking Part 1 questions?",
    answer:
      "1-2 developed sentences -- long enough to give the examiner real material to assess, but not a rehearsed-sounding paragraph.",
    category: "Speaking",
    difficulty: "beginner",
    commonMistake: "Answering with a single word, or reciting an obviously memorized, generic response.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-speaking-03",
    courseSlug: "ielts-preparation",
    question: "How much preparation time do you get before Speaking Part 2, and what should you do with it?",
    answer:
      "One minute, best used to jot brief notes (not full sentences) covering every bullet point on the cue card and roughly planning an order.",
    category: "Speaking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-speaking-04",
    courseSlug: "ielts-preparation",
    question: "How long should you speak for in Speaking Part 2?",
    answer: "1-2 minutes, ideally close to the full time -- addressing every bullet point with a concrete example usually provides enough material.",
    category: "Speaking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-speaking-05",
    courseSlug: "ielts-preparation",
    question: "How does Speaking Part 3 typically differ from Part 1?",
    answer:
      "Part 3 asks more abstract, general questions connected to Part 2's topic, and expects longer, more developed answers with reasons and examples, not short factual answers.",
    category: "Speaking",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-speaking-06",
    courseSlug: "ielts-preparation",
    question: "Why can an obviously memorized answer hurt your Speaking score?",
    answer:
      "It can work against Fluency and Coherence if it doesn't naturally connect to the specific question asked -- examiners are trained to notice rehearsed-sounding responses.",
    category: "Speaking",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-speaking-07",
    courseSlug: "ielts-preparation",
    question: "Which two of the four Speaking criteria tend to matter most in Part 1's simpler topics?",
    answer: "Fluency and Coherence, and Lexical Resource -- since Part 1's topics and required grammar are relatively simple.",
    category: "Speaking",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "ielts-prep-speaking-08",
    courseSlug: "ielts-preparation",
    question: "Does VisaSparkSchools's Speaking self-review tool record and upload your voice for grading?",
    answer:
      "No -- recording (where your browser supports it) stays entirely local for your own playback and self-review; there's no automated speech scoring and nothing is uploaded.",
    category: "Speaking",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
];
