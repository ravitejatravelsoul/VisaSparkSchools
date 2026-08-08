import type { InterviewQuestionInput } from "@/lib/interview-prep/types";

/**
 * TOEFL iBT Preparation Questions -- 50 frequently-asked questions about
 * the exam's format, scoring, and strategy (not job-interview questions).
 * Reflects the current shortened TOEFL iBT format (Jan 2026 task changes:
 * Listen and Repeat / Take an Interview for Speaking; Build a Sentence /
 * Write an Email / Write for an Academic Discussion for Writing). No
 * affiliation with ETS is claimed anywhere.
 */
export const toeflInterviewQuestions: InterviewQuestionInput[] = [
  // --- Format & Scoring (12) ---
  {
    id: "toefl-prep-format-01",
    courseSlug: "toefl-ibt-preparation",
    question: "How many sections does the current TOEFL iBT have?",
    answer: "Four: Reading, Listening, Speaking, and Writing.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-02",
    courseSlug: "toefl-ibt-preparation",
    question: "What is the total score range for TOEFL iBT?",
    answer: "0-120 total, combining four section scores of 0-30 each.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-03",
    courseSlug: "toefl-ibt-preparation",
    question: "Roughly how long is the current, shortened TOEFL iBT test?",
    answer:
      "Under 2 hours -- the test was shortened from its earlier, longer format by reducing question counts and removing unscored pretest items.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    commonMistake:
      "Preparing based on the older ~3-hour TOEFL iBT format's question counts and timing.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-04",
    courseSlug: "toefl-ibt-preparation",
    question: "Is TOEFL iBT taken on paper or on a computer?",
    answer:
      "It is delivered on a computer at a test center (or via at-home online testing where offered), with Speaking responses recorded via microphone.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-05",
    courseSlug: "toefl-ibt-preparation",
    question: "What kind of English does TOEFL iBT specifically focus on testing?",
    answer:
      "Academic English proficiency as used in university classroom and campus settings, distinguishing it from general-English-focused exams.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-06",
    courseSlug: "toefl-ibt-preparation",
    question: "How is TOEFL Speaking scored -- by a human, an automated system, or both?",
    answer:
      "Responses are typically scored using a combination of AI scoring and human raters, depending on ETS's current scoring process.",
    category: "Format & Scoring",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-07",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Did the Jan 2026 TOEFL changes affect only the scoring scale, or the task types themselves?",
    answer:
      "They affected the actual task types, not just scoring -- both Speaking and Writing introduced new task formats, replacing some of the older task types entirely rather than just adjusting how they're scored.",
    category: "Format & Scoring",
    difficulty: "advanced",
    commonMistake:
      "Assuming the exam still uses the older Speaking/Writing task types described in outdated prep materials.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-08",
    courseSlug: "toefl-ibt-preparation",
    question: "Can this platform predict what TOEFL score you would actually achieve?",
    answer:
      "No -- this platform provides self-paced practice and self-review, never a claimed or predicted official TOEFL score.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-09",
    courseSlug: "toefl-ibt-preparation",
    question: "How quickly are official TOEFL iBT scores typically available?",
    answer:
      "Often within a few days, though exact turnaround should be confirmed on the official ETS TOEFL website.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-10",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Where should you confirm current TOEFL iBT registration fees and score validity periods?",
    answer:
      "The official ETS TOEFL website -- this course's content is periodically reviewed but never states fees or validity periods as permanent facts.",
    category: "Format & Scoring",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-11",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Why might a university accept either TOEFL or IELTS, and does a higher score on one translate directly to the other?",
    answer:
      "Many universities accept both as evidence of English proficiency, but the two exams use different scales and task types -- there is no official, exact conversion, only approximate comparison tables, so a strong TOEFL score doesn't mechanically translate to a specific IELTS band.",
    category: "Format & Scoring",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-format-12",
    courseSlug: "toefl-ibt-preparation",
    question: "Does TOEFL iBT include unscored 'pretest' questions mixed into scored sections?",
    answer:
      "The current shortened format significantly reduced or removed unscored pretest items compared to the older, longer test -- always check current official material, since testing organizations periodically adjust this.",
    category: "Format & Scoring",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Reading (10) ---
  {
    id: "toefl-prep-reading-01",
    courseSlug: "toefl-ibt-preparation",
    question: "What kind of passages does the TOEFL Reading section use?",
    answer:
      "Academic passages similar in style to introductory university textbook material, covering a range of subjects.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-reading-02",
    courseSlug: "toefl-ibt-preparation",
    question: "What is a 'vocabulary-in-context' question type on TOEFL Reading?",
    answer:
      "A question asking you to identify the meaning of a specific word or phrase as it's used within the passage, which can differ from that word's most common general dictionary definition.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-reading-03",
    courseSlug: "toefl-ibt-preparation",
    question: "What does an 'insert text' question ask you to do?",
    answer:
      "Choose the best of several marked locations within the passage to insert a given new sentence, testing your understanding of the passage's logical and grammatical flow.",
    category: "Reading",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-reading-04",
    courseSlug: "toefl-ibt-preparation",
    question:
      "What is a prose-summary question, and how many correct choices does it typically have?",
    answer:
      "You select several statements (typically 3 out of 6 options) that best summarize the passage's main points -- distractor options often state true-but-minor details rather than main ideas.",
    category: "Reading",
    difficulty: "advanced",
    commonMistake:
      "Selecting a minor supporting detail instead of a genuine main-idea statement in a prose-summary question.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-reading-05",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Should you assume prior subject-matter knowledge helps answer TOEFL Reading questions?",
    answer:
      "No -- passages are meant to be answerable purely from the text given, even on unfamiliar academic topics.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-reading-06",
    courseSlug: "toefl-ibt-preparation",
    question: "What is a practical time-management strategy across multiple Reading passages?",
    answer:
      "Since the section has a fixed overall time limit across all passages, pace yourself to leave adequate time for later passages rather than spending disproportionate time perfecting answers on the first one.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-reading-07",
    courseSlug: "toefl-ibt-preparation",
    question:
      "What is a 'factual information' question testing, as opposed to an inference question?",
    answer:
      "It asks about information directly and explicitly stated in the passage, while an inference question asks about something the passage implies but never states outright.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-reading-08",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Why is it useful to identify a passage's overall organizational structure (e.g. compare-contrast, chronological, cause-effect) while reading?",
    answer:
      "Recognizing the structure helps you predict where specific types of information are likely located, making it faster to locate details when answering detail-focused questions.",
    category: "Reading",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-reading-09",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Can you move between questions within the current Reading passage before submitting?",
    answer:
      "Generally yes -- within the current passage's question set, you can typically review and change answers before moving to the next passage, though you cannot return to a previous passage once you've left it.",
    category: "Reading",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-reading-10",
    courseSlug: "toefl-ibt-preparation",
    question: "Are this platform's TOEFL Reading passages copied from real retired exams?",
    answer:
      "No -- every practice passage and question is original, written to reflect real TOEFL iBT question types and difficulty.",
    category: "Reading",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Listening (9) ---
  {
    id: "toefl-prep-listening-01",
    courseSlug: "toefl-ibt-preparation",
    question: "What two general types of audio does the TOEFL Listening section include?",
    answer:
      "Academic lectures (sometimes with classroom discussion) and conversations, typically in a campus-life setting like a professor's office or a student services desk.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-listening-02",
    courseSlug: "toefl-ibt-preparation",
    question: "Can you take notes during TOEFL Listening audio?",
    answer:
      "Yes -- note-taking is allowed and generally encouraged, since the audio plays only once and questions often ask about specific details or the speaker's attitude.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-listening-03",
    courseSlug: "toefl-ibt-preparation",
    question:
      "What does a 'speaker's attitude' or 'speaker's purpose' question ask you to identify?",
    answer:
      "Not just what was literally said, but the speaker's tone, intent, or implied opinion -- often requiring attention to how something was said (emphasis, hesitation) and not only the words themselves.",
    category: "Listening",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-listening-04",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Why might a Listening question replay a short clip of the audio before asking about it?",
    answer:
      "Some questions specifically test understanding of a particular moment or phrase, so the platform replays that exact segment to make sure you're evaluating the correct part of the conversation or lecture.",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-listening-05",
    courseSlug: "toefl-ibt-preparation",
    question: "What is a common mistake when taking notes during a long academic lecture?",
    answer:
      "Trying to write down every word instead of capturing key structure (main topic, major supporting points, examples) -- overly detailed notes can cause you to fall behind and miss what's said next.",
    category: "Listening",
    difficulty: "advanced",
    commonMistake:
      "Attempting verbatim note-taking during a lecture, causing the listener to miss subsequent content.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-listening-06",
    courseSlug: "toefl-ibt-preparation",
    question: "Do TOEFL Listening conversations always take place in a classroom?",
    answer:
      "No -- campus-life conversations often occur in settings like a library, housing office, or professor's office hours, not only in a classroom lecture setting.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-listening-07",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Why is understanding a lecture's organizational pattern (e.g. problem-solution, comparison) useful for Listening questions?",
    answer:
      "Similar to Reading, recognizing structure helps you anticipate what kind of information is coming next and organize your notes accordingly, making detail questions easier to answer afterward.",
    category: "Listening",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-listening-08",
    courseSlug: "toefl-ibt-preparation",
    question: "Does the Listening section allow you to pause or rewind the audio yourself?",
    answer:
      "No -- the audio plays through at its own pace without a manual pause or rewind control, which is why note-taking during first listening is important.",
    category: "Listening",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-listening-09",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Are this platform's Listening practice audio scripts based on real retired TOEFL recordings?",
    answer:
      "No -- all practice scripts are original, written to reflect real TOEFL iBT Listening task types and difficulty, never copied from actual ETS material.",
    category: "Listening",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },

  // --- Speaking (10) ---
  {
    id: "toefl-prep-speaking-01",
    courseSlug: "toefl-ibt-preparation",
    question:
      "What is the 'Listen and Repeat' Speaking task, introduced in the Jan 2026 TOEFL update?",
    answer:
      "You listen to a short spoken sentence or phrase and repeat it back as accurately as possible, testing pronunciation and listening memory in a single integrated task.",
    category: "Speaking",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-speaking-02",
    courseSlug: "toefl-ibt-preparation",
    question: "What is the 'Take an Interview' Speaking task?",
    answer:
      "You respond to a series of short interview-style questions on an everyday or academic topic, speaking naturally as if in a real conversational exchange, within a limited response time per question.",
    category: "Speaking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-speaking-03",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Does the current TOEFL Speaking section still include the older integrated campus-lecture-plus-speaking-response task type?",
    answer:
      "The Jan 2026 format change replaced the older integrated Speaking tasks with 'Listen and Repeat' and 'Take an Interview' -- prep material describing the older campus-lecture-response task is describing a previous format.",
    category: "Speaking",
    difficulty: "advanced",
    commonMistake:
      "Practicing the older integrated lecture-response Speaking task type instead of the current Listen and Repeat / Take an Interview tasks.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-speaking-04",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Why does natural pacing matter in 'Take an Interview' even though it's not literally a live conversation?",
    answer:
      "The scoring evaluates fluency and how conversationally natural your response sounds, so treating it like a live back-and-forth (rather than a rehearsed monologue) tends to produce a stronger, more authentic response.",
    category: "Speaking",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-speaking-05",
    courseSlug: "toefl-ibt-preparation",
    question: "What should you do if you don't fully understand a question in 'Take an Interview'?",
    answer:
      "You cannot ask for clarification since responses are recorded and machine-timed, so it's better to give your best reasonable response based on what you did understand than to stay silent.",
    category: "Speaking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-speaking-06",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Is 'Listen and Repeat' scored purely on accuracy of the words repeated, or also on pronunciation?",
    answer:
      "Both -- it evaluates whether you accurately reproduced the content as well as your pronunciation and fluency while doing so.",
    category: "Speaking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-speaking-07",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Why is practicing with a real microphone setup useful before test day for TOEFL Speaking?",
    answer:
      "Responses are recorded and scored based on audio quality and clarity, so an unfamiliar or poor-quality microphone setup risks weakening the score independent of actual English proficiency.",
    category: "Speaking",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-speaking-08",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Does this platform's self-review tool for TOEFL Speaking tasks provide an actual official score?",
    answer:
      "No -- it's a self-assessment rubric and, where offered, an optional local audio recording for your own review, never a claimed AI or official score.",
    category: "Speaking",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-speaking-09",
    courseSlug: "toefl-ibt-preparation",
    question: "What is a common mistake in 'Take an Interview' responses?",
    answer:
      "Giving overly short, one-word-style answers instead of a developed response with reasons or examples, even though each individual question's response time is limited.",
    category: "Speaking",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-speaking-10",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Why might using varied vocabulary and sentence structures help a Speaking response, even on a simple topic?",
    answer:
      "Scoring considers range of language use, not just correctness, so a response using only very basic repeated sentence patterns may score lower than one demonstrating more varied, natural phrasing -- even if both are grammatically correct.",
    category: "Speaking",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },

  // --- Writing (9) ---
  {
    id: "toefl-prep-writing-01",
    courseSlug: "toefl-ibt-preparation",
    question:
      "What is the 'Build a Sentence' Writing task, introduced in the Jan 2026 TOEFL update?",
    answer:
      "You are given scrambled or partial sentence components and must construct a single grammatically correct, meaningful sentence from them within a short time limit.",
    category: "Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-writing-02",
    courseSlug: "toefl-ibt-preparation",
    question: "What is the 'Write an Email' Writing task?",
    answer:
      "You write a short, appropriately-toned email responding to a given scenario (e.g. a request or an inquiry), testing practical academic/professional written communication.",
    category: "Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-writing-03",
    courseSlug: "toefl-ibt-preparation",
    question: "What is 'Write for an Academic Discussion'?",
    answer:
      "You read a short professor's discussion prompt and classmates' sample responses, then write your own contribution to the discussion, similar in spirit to the older 'Writing for an Academic Discussion' task but reflecting the current task wording and timing.",
    category: "Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-writing-04",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Does the current TOEFL Writing section still include the older integrated reading-plus-lecture essay task?",
    answer:
      "The Jan 2026 format change replaced the older integrated reading-lecture Writing task with 'Build a Sentence,' 'Write an Email,' and 'Write for an Academic Discussion' -- prep material describing the older integrated essay task is describing a previous format.",
    category: "Writing",
    difficulty: "advanced",
    commonMistake:
      "Practicing the older integrated reading-and-lecture essay task instead of the current three Writing tasks.",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-writing-05",
    courseSlug: "toefl-ibt-preparation",
    question:
      "In 'Write for an Academic Discussion,' should your response simply restate a classmate's point in different words?",
    answer:
      "No -- a strong response adds your own distinct idea, reasoning, or example to the discussion rather than merely paraphrasing what a classmate already said.",
    category: "Writing",
    difficulty: "advanced",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-writing-06",
    courseSlug: "toefl-ibt-preparation",
    question: "What tone is generally appropriate for the 'Write an Email' task?",
    answer:
      "A tone appropriate to the given scenario -- often semi-formal or formal, matching how you'd realistically write to a professor, administrator, or professional contact, rather than a casual tone used with friends.",
    category: "Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-writing-07",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Why is grammatical accuracy especially important in the short 'Build a Sentence' task?",
    answer:
      "Since the task is entirely about constructing one correct sentence from given components, a grammar mistake directly affects the core thing being scored, unlike longer tasks where one grammar slip is a smaller fraction of the overall response.",
    category: "Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-writing-08",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Does this platform's self-review tool for TOEFL Writing tasks provide an actual official score?",
    answer: "No -- it's a self-assessment rubric checklist, never a claimed AI or official score.",
    category: "Writing",
    difficulty: "beginner",
    lastReviewed: "2026-08-07",
  },
  {
    id: "toefl-prep-writing-09",
    courseSlug: "toefl-ibt-preparation",
    question:
      "Should you spend your limited time in 'Write for an Academic Discussion' re-reading the professor's full prompt multiple times before writing?",
    answer:
      "A brief careful read is worthwhile, but given the short time limit, most of your time should go toward writing a focused, well-supported response rather than repeatedly re-reading the prompt.",
    category: "Writing",
    difficulty: "intermediate",
    lastReviewed: "2026-08-07",
  },
];
