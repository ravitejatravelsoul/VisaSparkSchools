import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * PTE Academic Preparation Questions -- 50 frequently-asked questions
 * about the exam's format, scoring, and strategy (not job-interview
 * questions). PTE Academic is fully computer-delivered and AI-scored
 * across three parts covering all four skills in an integrated format.
 * No affiliation with Pearson is claimed anywhere.
 */
export const pteInterviewQuestions: InterviewQuestionInput[] = [
  // --- Format & Scoring (13) ---
  {
    id: "pte-prep-format-01",
    courseSlug: "pte-academic-preparation",
    question: "How many parts does the PTE Academic test have?",
    answer:
      "Three parts, taken in one sitting: Speaking & Writing (combined), Reading, and Listening.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-02",
    courseSlug: "pte-academic-preparation",
    question: "What is the overall PTE Academic score range?",
    answer:
      "10-90, reported as an overall score plus four communicative skill scores (Speaking, Writing, Reading, Listening).",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-03",
    courseSlug: "pte-academic-preparation",
    question: "Is PTE Academic scored by human raters or by an automated system?",
    answer:
      "It is primarily scored by an automated scoring engine, which is a defining difference from exams like IELTS that rely on human examiners.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-04",
    courseSlug: "pte-academic-preparation",
    question: "Why are many PTE task types described as 'integrated skills' tasks?",
    answer:
      "Because a single task often scores more than one skill at once -- e.g. Read Aloud contributes to both Speaking and Reading scores, and Summarize Spoken Text contributes to both Listening and Writing.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-05",
    courseSlug: "pte-academic-preparation",
    question: "Roughly how long is the total PTE Academic test?",
    answer: "Approximately 2 hours.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-06",
    courseSlug: "pte-academic-preparation",
    question: "Is PTE Academic taken on paper or on a computer?",
    answer:
      "PTE Academic is entirely computer-delivered, including the Speaking section, which is recorded via microphone rather than spoken to a human examiner.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-07",
    courseSlug: "pte-academic-preparation",
    question:
      "How quickly are official PTE Academic results typically available compared to paper-based exams?",
    answer:
      "Typically much faster -- often within a couple of days -- since scoring is largely automated rather than dependent on human examiner turnaround.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-08",
    courseSlug: "pte-academic-preparation",
    question: "Does PTE Academic test grammar and vocabulary as standalone scores?",
    answer:
      "Grammar, vocabulary, oral fluency, and pronunciation are scored as 'enabling skills' that feed into the four communicative skill scores, rather than being reported as fully separate top-level scores.",
    category: "Format & Scoring",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-09",
    courseSlug: "pte-academic-preparation",
    question: "Can this platform predict what PTE score you would actually achieve?",
    answer:
      "No -- this platform provides self-paced practice and self-review, never a claimed or predicted official PTE score.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-10",
    courseSlug: "pte-academic-preparation",
    question:
      "Why is speaking clearly and steadily important for automated PTE scoring, beyond just being understandable to a person?",
    answer:
      "The automated scoring engine evaluates fluency and pronunciation algorithmically, so unnatural pauses, mumbling, or excessive hesitation can affect the score even if a human listener would still understand the meaning.",
    category: "Format & Scoring",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-11",
    courseSlug: "pte-academic-preparation",
    question:
      "Does PTE Academic have a fixed set of test dates like some other exams, or more flexible scheduling?",
    answer:
      "PTE Academic is generally offered with flexible, frequent scheduling at test centers -- always confirm exact current availability on the official Pearson PTE website.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-12",
    courseSlug: "pte-academic-preparation",
    question:
      "Where should you confirm current PTE Academic registration fees and score validity periods?",
    answer:
      "The official Pearson PTE website -- this course's content is periodically reviewed but never states fees or validity periods as permanent facts.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-format-13",
    courseSlug: "pte-academic-preparation",
    question:
      "Why might arriving early and being comfortable with the on-screen interface matter more for PTE than for a paper-based test?",
    answer:
      "Because every task type is interacted with via mouse, keyboard, and microphone on a fixed on-screen layout -- unfamiliarity with the interface itself can cost time that has nothing to do with your actual English proficiency.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },

  // --- Speaking & Writing (13) ---
  {
    id: "pte-prep-sw-01",
    courseSlug: "pte-academic-preparation",
    question: "What does the Read Aloud task require you to do?",
    answer:
      "Read a short written text aloud clearly within a limited preparation and speaking time, which is scored for pronunciation, fluency, and reading accuracy.",
    category: "Speaking & Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-02",
    courseSlug: "pte-academic-preparation",
    question: "What does the Repeat Sentence task test?",
    answer:
      "Your ability to listen to a short sentence and repeat it back exactly, testing listening memory alongside pronunciation and fluency.",
    category: "Speaking & Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-03",
    courseSlug: "pte-academic-preparation",
    question: "What is the Describe Image task, and what is a common mistake test-takers make?",
    answer:
      "You describe a chart, graph, or image aloud within a time limit. A common mistake is simply listing visible data points without stating an overall trend or summary conclusion, which the scoring model weighs heavily.",
    category: "Speaking & Writing",
    difficulty: "intermediate",
    commonMistake:
      "Reading off individual numbers from a chart instead of stating the overall trend the image is illustrating.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-04",
    courseSlug: "pte-academic-preparation",
    question: "What does Retell Lecture ask you to do?",
    answer:
      "Listen to a short academic lecture and then speak a summary of it in your own words within a limited time.",
    category: "Speaking & Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-05",
    courseSlug: "pte-academic-preparation",
    question:
      "What is the Summarize Written Text task, and how many sentences should the response be?",
    answer:
      "You read a passage and write a one-sentence summary of it within a word limit -- exceeding the specified sentence count or word limit typically results in a lower or zero score for that response.",
    category: "Speaking & Writing",
    difficulty: "advanced",
    commonMistake:
      "Writing a summary as multiple sentences when the task explicitly requires a single sentence.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-06",
    courseSlug: "pte-academic-preparation",
    question: "What does the Write Essay task assess, and roughly how long is it?",
    answer:
      "It assesses your ability to write a structured, well-argued essay on a given topic within a time limit, typically around 20 minutes.",
    category: "Speaking & Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-07",
    courseSlug: "pte-academic-preparation",
    question: "What is Answer Short Question, and why is preparation time minimal?",
    answer:
      "You hear a short question and respond with typically just one or a few words -- preparation time is minimal because the answer itself is meant to be brief and immediate, testing quick listening comprehension.",
    category: "Speaking & Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-08",
    courseSlug: "pte-academic-preparation",
    question:
      "Why is it risky to stay completely silent during the Read Aloud or Repeat Sentence tasks?",
    answer:
      "The automated scoring system may register prolonged silence as a lack of response, so attempting the task -- even imperfectly -- generally scores better than not responding at all.",
    category: "Speaking & Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-09",
    courseSlug: "pte-academic-preparation",
    question:
      "What is a practical strategy for the limited preparation time before Read Aloud begins recording?",
    answer:
      "Use the brief preparation window to skim the text for difficult words or unfamiliar phrasing, so you're not seeing them for the first time while the recording is already running.",
    category: "Speaking & Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-10",
    courseSlug: "pte-academic-preparation",
    question: "Should a Write Essay response strictly stay within the stated word count range?",
    answer:
      "Yes -- responses significantly under or over the specified word count range are typically penalized, regardless of the content quality.",
    category: "Speaking & Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-11",
    courseSlug: "pte-academic-preparation",
    question:
      "Why does maintaining a steady pace matter in Describe Image, given the strict time limit?",
    answer:
      "The response window is short and fixed, so speaking too slowly at the start risks running out of time before reaching the overall-trend conclusion, which is often the most heavily weighted part of the response.",
    category: "Speaking & Writing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-12",
    courseSlug: "pte-academic-preparation",
    question:
      "Does the automated scoring engine evaluate content accuracy in Repeat Sentence, or only pronunciation?",
    answer:
      "It evaluates whether you reproduced the exact words of the original sentence, not just pronunciation and fluency -- changing or omitting a word lowers your content score for that item.",
    category: "Speaking & Writing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-sw-13",
    courseSlug: "pte-academic-preparation",
    question:
      "Does this platform's self-review tool for Speaking or Writing tasks provide an actual PTE score?",
    answer:
      "No -- it's a self-assessment rubric and, where offered, an optional local audio recording for your own review, never a claimed AI or official score.",
    category: "Speaking & Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Reading (12) ---
  {
    id: "pte-prep-reading-01",
    courseSlug: "pte-academic-preparation",
    question: "What does the Reorder Paragraphs task require you to do?",
    answer:
      "Arrange several jumbled text boxes into their original, logical paragraph order by dragging and dropping them.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-02",
    courseSlug: "pte-academic-preparation",
    question: "What clue often helps identify the first sentence in a Reorder Paragraphs task?",
    answer:
      "The opening sentence typically introduces the topic generally, without pronouns like 'it' or 'this' that would require a preceding sentence for context -- later sentences often reference something introduced earlier.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-03",
    courseSlug: "pte-academic-preparation",
    question: "What is 'Fill in the Blanks (Reading)' and what does it test beyond vocabulary?",
    answer:
      "You select words from a dropdown to fill blanks in a passage, testing grammar and contextual understanding as well as vocabulary knowledge.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-04",
    courseSlug: "pte-academic-preparation",
    question:
      "In Multiple Choice, Choose Single Answer (Reading), how many correct answers are there?",
    answer:
      "Exactly one -- distinguishing it from the multiple-answer variant of the same task type, which requires selecting all correct choices.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-05",
    courseSlug: "pte-academic-preparation",
    question:
      "In Multiple Choice, Choose Multiple Answers (Reading), is partial credit given for selecting some but not all correct choices?",
    answer:
      "Scoring for this task type generally uses partial-credit scoring, unlike some other exams' all-or-nothing multiple-answer formats -- but incorrect selections can also reduce the score, so guessing extra choices isn't free.",
    category: "Reading",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-06",
    courseSlug: "pte-academic-preparation",
    question: "What is a practical strategy for the Reorder Paragraphs task?",
    answer:
      "Look for logical connectors (pronouns, transition words, cause-effect phrasing) linking one paragraph to another, and build the sequence from clearly-linked pairs rather than guessing the full order at once.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-07",
    courseSlug: "pte-academic-preparation",
    question:
      "Why is reading the full sentence context important in Fill in the Blanks, rather than reading each blank in isolation?",
    answer:
      "The correct word often depends on grammar or meaning clues elsewhere in the same sentence or paragraph, not just the words immediately next to the blank.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-08",
    courseSlug: "pte-academic-preparation",
    question: "Do Reading section tasks contribute to any score besides the Reading skill score?",
    answer:
      "Yes -- some Reading tasks also feed into enabling-skill scores like vocabulary and grammar, since PTE's integrated-skills design means a single task can contribute to more than one reported score.",
    category: "Reading",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-09",
    courseSlug: "pte-academic-preparation",
    question:
      "Is there a fixed time limit displayed for each individual Reading question, or an overall section timer?",
    answer:
      "Reading tasks generally run under an overall section timer rather than a strict per-question countdown, so time management across the whole section matters more than rushing any single item.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-10",
    courseSlug: "pte-academic-preparation",
    question: "What is a common mistake in Multiple Choice, Choose Multiple Answers (Reading)?",
    answer:
      "Selecting too many options 'to be safe' -- since incorrect selections can reduce the score, only choices you're reasonably confident about should be selected.",
    category: "Reading",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-11",
    courseSlug: "pte-academic-preparation",
    question:
      "Should you assume prior subject-matter knowledge will help you answer a Reading passage's questions?",
    answer:
      "No -- passages are meant to be answerable purely from the text given, even on unfamiliar academic topics, so answers should be grounded in what the passage states rather than outside knowledge.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-reading-12",
    courseSlug: "pte-academic-preparation",
    question: "Are this platform's PTE Reading passages copied from real retired exams?",
    answer:
      "No -- every practice passage and question is original, written to reflect real PTE Academic question types and difficulty.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Listening (12) ---
  {
    id: "pte-prep-listening-01",
    courseSlug: "pte-academic-preparation",
    question:
      "What does the Summarize Spoken Text task require, and how does it feed into two skill scores?",
    answer:
      "You listen to a short lecture and write a summary within a time and word limit -- this contributes to both your Listening score (comprehension) and your Writing score (written expression).",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-02",
    courseSlug: "pte-academic-preparation",
    question: "What is Highlight Correct Summary, and what makes distractor options tricky?",
    answer:
      "You listen to a recording and choose which of several written summaries best matches it -- incorrect options are often plausible-sounding but subtly misrepresent the recording's actual main point or emphasis.",
    category: "Listening",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-03",
    courseSlug: "pte-academic-preparation",
    question: "In Select Missing Word, what are you asked to identify?",
    answer:
      "You hear a recording that cuts off before its final word or short phrase, and select from options which one logically completes it.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-04",
    courseSlug: "pte-academic-preparation",
    question: "What does the Highlight Incorrect Words task ask you to do?",
    answer:
      "You read along with a transcript while listening to audio, and click on words in the transcript that differ from what was actually spoken.",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-05",
    courseSlug: "pte-academic-preparation",
    question: "What is 'Write from Dictation,' and why is exact spelling important?",
    answer:
      "You hear a short sentence once and must type it exactly -- scoring is typically based on correctly reproducing every word, so spelling and word order both matter, not just overall meaning.",
    category: "Listening",
    difficulty: "intermediate",
    commonMistake:
      "Typing a paraphrase of the sentence's meaning instead of the exact words spoken.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-06",
    courseSlug: "pte-academic-preparation",
    question: "Can you replay Listening section audio in PTE Academic?",
    answer:
      "Generally no -- most Listening tasks play the audio only once, which is a meaningful difference from exams that allow replaying or provide extended pauses between sections.",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-07",
    courseSlug: "pte-academic-preparation",
    question:
      "Why is note-taking during longer Listening audio (like Summarize Spoken Text) a recommended strategy?",
    answer:
      "Since the audio typically plays only once and covers several minutes of content, jotting key points as you listen helps you reconstruct an accurate summary afterward rather than relying purely on memory.",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-08",
    courseSlug: "pte-academic-preparation",
    question: "What is a common mistake in Highlight Incorrect Words?",
    answer:
      "Losing your place in the transcript after missing one discrepancy, which can cause you to miss subsequent ones -- staying calm and continuing to track the transcript line-by-line matters more than dwelling on an earlier miss.",
    category: "Listening",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-09",
    courseSlug: "pte-academic-preparation",
    question: "Do PTE Listening tasks include a variety of accents?",
    answer:
      "Yes -- audio recordings typically include a range of native English accents, so practicing with varied accents (not just one) better reflects the actual test experience.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-10",
    courseSlug: "pte-academic-preparation",
    question:
      "Why does 'Write from Dictation' also indirectly support Reading and Writing enabling-skill scores?",
    answer:
      "Because it tests correct spelling, grammar, and word order alongside listening comprehension -- reflecting PTE's integrated-skills scoring design where several component scores can be informed by a single task.",
    category: "Listening",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-11",
    courseSlug: "pte-academic-preparation",
    question:
      "What is a practical strategy if you miss part of the audio in Highlight Correct Summary?",
    answer:
      "Focus on capturing the recording's main idea and overall structure rather than every individual detail, since the task asks which summary best represents the whole recording, not which one reproduces every specific fact.",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "pte-prep-listening-12",
    courseSlug: "pte-academic-preparation",
    question:
      "Are this platform's Listening practice audio scripts based on real retired PTE recordings?",
    answer:
      "No -- all practice scripts are original, written to reflect real PTE Academic Listening task types and difficulty, never copied from actual Pearson material.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
];
