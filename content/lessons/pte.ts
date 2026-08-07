import type { LessonInput } from "@/lib/content/types";

/**
 * PTE Academic Preparation lessons. Every passage, transcript, and question
 * here is original -- none are copied from real PTE Academic material, and
 * none claim affiliation with Pearson (see
 * components/exam-prep/trademark-notice.tsx, rendered on the course page).
 * Reading/Listening lessons place the original passage/transcript directly
 * in `explanation`, then ask genuine comprehension questions about it in
 * `quiz` -- reusing the existing explanation+quiz architecture rather than
 * inventing a parallel one (see docs/product-expansion/DECISIONS.md), same
 * pattern as content/lessons/ielts.ts. These lessons have no
 * `example`/`guidedExercise`/`independentExercise` (see lib/content/types.ts's
 * Phase 6 note) since there is no honest code exercise for reading
 * comprehension, listening comprehension, or essay writing.
 */
export const pteLessons: LessonInput[] = [
  {
    id: "pte-test-format-overview",
    slug: "pte-test-format-overview",
    title: "PTE Academic Test Format Overview",
    description:
      "What PTE Academic tests, its three parts, and the integrated scoring concept that sets it apart.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Describe the three parts of PTE Academic and their approximate timing within the single test sitting",
      "Explain what an 'integrated' task is and how this differs from IELTS/TOEFL's cleanly separated sections",
      "List the four communicative skill scores PTE Academic reports, alongside the unscored Personal Introduction",
    ],
    skills: ["pte-format", "pte-overview"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte academic", "pte format", "pte test structure", "integrated scoring"],
    explanation: `PTE Academic (Pearson Test of English Academic) is a fully computer-delivered English proficiency test administered by Pearson, taken in a single sitting of roughly two hours at a test center. Unlike IELTS or TOEFL, which often spread spoken and written responses across a longer day or a separate speaking appointment, every part of PTE Academic -- speaking into a microphone, typing an essay, reading passages, and listening to short audio clips -- happens back-to-back on the same computer, with headphones and a microphone provided at the test center.

The test has three parts, taken in this fixed order. **Speaking & Writing** is a single combined part lasting about 76-84 minutes and containing nine task types, plus an unscored warm-up described below. **Reading** follows, lasting about 22-30 minutes across five task types. **Listening** comes last, lasting about 31-39 minutes across eight task types; each audio clip in Listening is played only once, though note-taking is allowed throughout the test using an erasable booklet provided at the center.

Before the scored Speaking & Writing tasks begin, every candidate completes a short **Personal Introduction**: a recorded response, of about 25 seconds, to a simple prompt that typically asks you to introduce yourself. This recording is not scored -- it exists mainly so institutions receiving your score report can optionally listen to it, and so you get a low-stakes chance to test your microphone and settle in before anything that actually counts.

A feature that genuinely distinguishes PTE Academic from IELTS or TOEFL is that many of its tasks are **integrated**: a single task type can contribute to more than one communicative skill score at once. Read Aloud, for example, asks you to read a short displayed text aloud -- because it requires both reading comprehension and spoken output, it contributes to both your Speaking score and your Reading score. This is different from IELTS or TOEFL, where each of the four skills (Listening, Reading, Writing, Speaking) is assessed almost entirely within its own separated section. Recognizing which tasks are integrated is genuinely useful for planning your practice, since strengthening one task type can move more than one score at a time.

PTE Academic reports one overall score and four individual communicative skill scores -- Speaking, Writing, Reading, and Listening -- each on a scale of 10 to 90, covered in more detail in the next lesson. The real exam's scoring process combines AI-based scoring with human verification, but this course's own self-review practice tools do not replicate, predict, or simulate that scoring -- they exist only to help you structure and evaluate your own practice honestly.`,
    commonMistakes: [
      "Assuming PTE Academic has four separately timed sections like IELTS, when Speaking and Writing are actually combined into a single continuous part.",
      "Treating the unscored Personal Introduction as a high-stakes task, when its real purpose is a low-stakes microphone check and warm-up.",
      "Assuming each task type only affects one skill score -- integrated tasks like Read Aloud genuinely contribute to more than one communicative skill score at once.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many main parts does PTE Academic have, and in what order are they taken?",
        choices: [
          "Four parts: Listening, Reading, Writing, Speaking",
          "Three parts: Speaking & Writing, then Reading, then Listening",
          "Two parts: a written test and a separate spoken interview appointment",
          "Three parts: Reading, Listening, then Speaking & Writing",
        ],
        correctIndex: 1,
        explanation:
          "PTE Academic runs Speaking & Writing first, then Reading, then Listening, all in one sitting.",
      },
      {
        id: "q2",
        prompt:
          "What is the purpose of the unscored Personal Introduction at the start of the test?",
        choices: [
          "It sets your final overall score",
          "It replaces the Speaking part entirely",
          "It lets you test your microphone and settle in, and institutions may optionally listen to it",
          "It determines which task types you will see later in the test",
        ],
        correctIndex: 2,
        explanation:
          "The Personal Introduction is unscored -- it's a low-stakes warm-up and mic check, not a graded task.",
      },
      {
        id: "q3",
        prompt: "What does it mean for a PTE Academic task to be 'integrated'?",
        choices: [
          "It is graded by two separate human examiners",
          "It contributes to more than one communicative skill score at once",
          "It combines multiple languages in a single task",
          "It is optional and does not count toward any score",
        ],
        correctIndex: 1,
        explanation:
          "Integrated tasks like Read Aloud draw on more than one skill (e.g. reading and speaking), so they affect more than one score.",
      },
      {
        id: "q4",
        prompt: "How is PTE Academic administered?",
        choices: [
          "Entirely on paper, hand-graded",
          "Fully computer-delivered in a single sitting at a test center",
          "Over a live video call only, with no test center visit",
          "Split across two separate days",
        ],
        correctIndex: 1,
        explanation:
          "PTE Academic is computer-delivered and completed in one sitting of roughly two hours.",
      },
    ],
    takeaway:
      "PTE Academic combines Speaking and Writing into one part, and several of its tasks are integrated across skills -- a structurally different shape from IELTS or TOEFL's four separated sections.",
    summary:
      "PTE Academic has three parts (Speaking & Writing, Reading, Listening) taken in one roughly two-hour sitting, preceded by an unscored Personal Introduction. Many tasks are integrated, contributing to more than one of the four 10-90 communicative skill scores.",
    nextLessonSlug: "pte-scoring-and-study-plan",
  },
  {
    id: "pte-scoring-and-study-plan",
    slug: "pte-scoring-and-study-plan",
    title: "PTE Academic Scoring and Building a Study Plan",
    description:
      "How the 10-90 scoring scale and enabling skill sub-scores work, and how to build a realistic study plan.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain the 10-90 overall and communicative skill scoring scale, and what enabling skill sub-scores add",
      "Build a realistic multi-week study plan using a diagnostic across task types, not just parts",
      "Identify why integrated tasks make certain practice choices unusually high-leverage",
    ],
    skills: ["pte-format", "pte-study-planning"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte scoring", "pte study plan", "enabling skills", "10-90 scale"],
    explanation: `PTE Academic reports an overall score, and four communicative skill scores -- Speaking, Writing, Reading, and Listening -- all on the same 10-90 scale. A score report also includes several **enabling skill** sub-scores (things like grammar, oral fluency, pronunciation, spelling, and vocabulary), also reported on a 10-90 scale. These give a far more specific diagnostic picture than a single section number alone: two candidates can share the same overall Speaking score for very different reasons, one held back by pronunciation and the other by grammar, and each needs different practice to actually improve.

Knowing that many tasks are integrated (see the previous lesson) matters directly for study planning. Because Read Aloud, for instance, feeds into both Reading and Speaking, and Summarize Spoken Text feeds into both Listening and Writing, deliberately practicing these specific task types is unusually high-leverage -- improvement there can move more than one communicative skill score at once, rather than only the one part it superficially "belongs" to.

A realistic study plan scales with your score gap and starting level. Test-prep researchers (not Pearson, which sets no official universal timeline) commonly estimate that a meaningful jump in overall score takes somewhere in the range of several weeks of consistent, varied practice, though this depends enormously on your starting proficiency, native language, and hours available per week -- treat any such estimate as a rough planning tool, not a promise, and never assume a specific test date or fee without checking current, official information directly.

Start with a **diagnostic**: attempt a short sample of each task type -- not just each of the three parts -- under realistic time pressure, and honestly note which specific task types felt weakest. Because PTE Academic has more distinct task types than IELTS or TOEFL, a plan organized around individual task types (Read Aloud, Summarize Written Text, Re-order Paragraphs, and so on) tends to produce more useful, specific practice than a plan organized only around "Speaking week" or "Reading week."`,
    commonMistakes: [
      "Treating the overall score as the only relevant number and ignoring the four individual communicative skill scores when a specific program sets its own per-skill minimum.",
      "Ignoring enabling skill sub-scores (e.g. pronunciation, oral fluency) that reveal a much more specific weakness than a communicative skill score alone.",
      "Setting an unrealistic timeline that treats any published estimate as a guarantee rather than a rough planning tool.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What is the score range used for PTE Academic's overall score and each communicative skill score?",
        choices: ["0-9 in half-band increments", "10-90", "1-100", "A-F letter grades"],
        correctIndex: 1,
        explanation: "Both the overall score and each communicative skill score use a 10-90 scale.",
      },
      {
        id: "q2",
        prompt:
          "Besides the four communicative skill scores, what else does a PTE Academic score report include?",
        choices: [
          "A recording of your Personal Introduction shared with every institution automatically",
          "Enabling skill sub-scores such as grammar, pronunciation, and vocabulary",
          "A ranking comparing you against every other test-taker globally",
          "A predicted university admission decision",
        ],
        correctIndex: 1,
        explanation:
          "The report includes enabling skill sub-scores, giving a more specific diagnostic than the communicative skill scores alone.",
      },
      {
        id: "q3",
        prompt:
          "Why might practicing an integrated task type like Summarize Spoken Text be a high-leverage study choice?",
        choices: [
          "It is the only task type on the whole test",
          "As an integrated task, improvement there can influence more than one communicative skill score at once",
          "It is unscored, so mistakes carry no risk",
          "It only ever affects the Reading score",
        ],
        correctIndex: 1,
        explanation:
          "Summarize Spoken Text is integrated -- it contributes to both Listening and Writing scores.",
      },
      {
        id: "q4",
        prompt: "What is the recommended first step before setting a study timeline?",
        choices: [
          "Immediately book the test date",
          "Run a diagnostic across individual task types to find genuinely weak areas",
          "Only study Speaking, since it feels hardest",
          "Skip structured practice entirely and rely on general English fluency alone",
        ],
        correctIndex: 1,
        explanation:
          "A diagnostic across task types (not just parts) tells you honestly and specifically where to focus.",
      },
    ],
    takeaway:
      "Use enabling skill sub-scores and a task-type-level diagnostic to target practice precisely, and remember integrated tasks can move more than one score at once.",
    summary:
      "PTE Academic's 10-90 scores include four communicative skills plus enabling skill sub-scores for specific diagnosis. Build a study plan from a diagnostic across individual task types, prioritizing integrated tasks for efficiency.",
    nextLessonSlug: "pte-speaking-read-aloud-repeat-sentence",
  },
  {
    id: "pte-speaking-read-aloud-repeat-sentence",
    slug: "pte-speaking-read-aloud-repeat-sentence",
    title: "PTE Speaking: Read Aloud and Repeat Sentence",
    description: "The two shortest integrated speaking task types, and how to approach each.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    objectives: [
      "Describe the Read Aloud task and use preparation time to plan phrasing and stress, not just re-read silently",
      "Describe the Repeat Sentence task and focus listening on overall meaning rather than isolated words",
      "Avoid restarting a response after a small error, since restarting hurts fluency more than the original slip",
    ],
    skills: ["pte-speaking"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte read aloud", "pte repeat sentence", "pte speaking tasks"],
    explanation: `**Read Aloud** shows you a short text, typically 30-60 words, on screen. You get a brief silent preparation time before a beep signals you to start reading it aloud into the microphone. Because the task requires reading comprehension to prepare and spoken output to respond, it is integrated -- it contributes to both your Reading and your Speaking scores.

The preparation time is best spent previewing the whole text once for meaning, then marking, mentally or by eye, where natural phrase breaks and stress should fall -- especially on any unfamiliar or multisyllable words. Reading in a flat, word-by-word rhythm scores worse than reading in natural phrase groups with appropriate stress, even if every individual word is pronounced correctly. Keep a steady pace once you start: rushing to finish before time runs out tends to hurt pronunciation and fluency more than speaking at a measured, natural rate.

**Repeat Sentence** plays a single sentence once, usually 3-9 seconds long. After a short beep, you repeat exactly what you heard. Because it requires listening comprehension of audio input followed by spoken output, it is also integrated -- contributing to both Listening and Speaking. The key skill is different from Read Aloud: instead of reading a visible text, you must reconstruct a sentence you only heard once, so focus on capturing its overall meaning and grammatical structure as you listen, rather than trying to memorize isolated individual words. If you're confident of the meaning and structure, you can usually reconstruct a close, natural-sounding version even if you missed one exact word.

A shared habit that matters for both tasks: if you make a small error partway through your response -- a mispronunciation, a stumble -- keep going naturally rather than stopping and restarting from the beginning. Restarting creates an unnatural pause and disrupted rhythm that affects fluency scoring more than the original small error would have on its own.`,
    commonMistakes: [
      "Restarting a Read Aloud response after a small mispronunciation, which hurts fluency more than the original error would have.",
      "Reading in a flat, word-by-word rhythm instead of natural phrase grouping and stress.",
      "In Repeat Sentence, trying to memorize exact words instead of capturing overall sentence meaning and structure, causing you to freeze if you miss one word.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does the Read Aloud task require you to do?",
        choices: [
          "Answer a question about a passage you read silently",
          "Read a short displayed text aloud after a brief preparation time",
          "Write a summary of a passage",
          "Listen to a lecture and answer questions about it",
        ],
        correctIndex: 1,
        explanation:
          "Read Aloud shows a short text on screen for you to read aloud after preparing.",
      },
      {
        id: "q2",
        prompt:
          "Which two communicative skill scores does Read Aloud contribute to, given it is an integrated task?",
        choices: [
          "Listening and Writing",
          "Reading and Speaking",
          "Speaking and Writing",
          "Reading and Listening",
        ],
        correctIndex: 1,
        explanation:
          "Read Aloud requires reading comprehension and spoken output, so it feeds both scores.",
      },
      {
        id: "q3",
        prompt: "In Repeat Sentence, what should you focus on most while listening to the audio?",
        choices: [
          "Memorizing each word in complete isolation",
          "Capturing the sentence's overall meaning and grammatical structure",
          "Counting exactly how many words are spoken",
          "Guessing the speaker's regional accent",
        ],
        correctIndex: 1,
        explanation:
          "Grasping overall meaning and structure lets you reconstruct a close, natural response even after a single listen.",
      },
      {
        id: "q4",
        prompt:
          "If you mispronounce a word partway through a Read Aloud response, what is the better strategy?",
        choices: [
          "Stop and restart the entire response from the beginning",
          "Keep going naturally rather than restarting",
          "Remain silent until the recording time runs out",
          "Ask to have the text shown again from the start",
        ],
        correctIndex: 1,
        explanation:
          "Continuing naturally preserves fluency better than an abrupt stop-and-restart.",
      },
    ],
    takeaway:
      "Use preparation time to plan phrasing and stress (Read Aloud) or to focus on meaning over exact words (Repeat Sentence), and never restart a response over a small error.",
    summary:
      "Read Aloud and Repeat Sentence are short, integrated speaking tasks. Natural phrasing and stress, focusing on meaning over memorization, and never restarting after a small slip are the highest-leverage habits for both.",
    nextLessonSlug: "pte-speaking-describe-image-retell-lecture",
  },
  {
    id: "pte-speaking-describe-image-retell-lecture",
    slug: "pte-speaking-describe-image-retell-lecture",
    title: "PTE Speaking: Describe Image and Retell Lecture",
    description: "Structuring longer spoken responses to a visual and to an audio lecture.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Structure a Describe Image response with the overall trend or feature stated first, then supporting detail",
      "Take brief, structure-focused notes during a Retell Lecture audio instead of writing full sentences",
      "Avoid long initial silence at the start of a response, since fluency is judged across the whole response",
    ],
    skills: ["pte-speaking"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte describe image", "pte retell lecture", "pte speaking structure"],
    explanation: `**Describe Image** shows you a graph, chart, map, table, or picture, gives you a short silent preparation time, then asks you to describe it aloud within a fixed response window. Unlike Read Aloud or Repeat Sentence, this task doesn't have an external input to reproduce -- your own structuring of the response matters heavily. A reliable approach mirrors an academic data-description structure: identify the type of image and its general subject first, state the single most significant overall trend or feature, then add two or three specific supporting details, closing with a brief final observation if time allows.

**Retell Lecture** plays an audio lecture, sometimes with an accompanying slide, lasting up to about 90 seconds, followed by a short preparation time and then a response window in which you retell it in your own words. Because it requires listening to audio input and producing a spoken response, it is integrated -- contributing to both Listening and Speaking. The note-taking skill here matters enormously: during the audio, jot brief key nouns, numbers, and structural signal words ("first," "however," "as a result") rather than attempting full sentences, since there's no time to write and read from complete notes. When retelling, lead with the lecture's main idea, then cover supporting points roughly in the order presented, rather than trying to reproduce it word for word from memory.

Both tasks reward the same underlying discipline: state the overall point first, then support it -- the same "overview before detail" structure used in describing visual data in the Writing part of this course, and in IELTS-style Task 1 writing. Reusing one mental structure across multiple task types is more efficient than inventing a new structure for each.

A common trap in both tasks is spending so much of the preparation time deciding exactly what to say that the response itself starts with several seconds of silence, or begins hesitantly. Because fluency is assessed across the entire response, a strong middle section can't fully compensate for a weak, hesitant opening -- it's better to begin speaking promptly, even with an imperfect first sentence, than to wait for a "perfect" opening line.`,
    commonMistakes: [
      "Spending the entire Describe Image preparation time deciding exactly what to say instead of jotting two or three key words to structure a response.",
      "Staying almost silent for the first several seconds of the response window, which hurts fluency scoring even if the content that follows is accurate.",
      "Retelling a lecture almost verbatim from memory instead of summarizing the main idea and key supporting points in your own words.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the recommended first thing to state when describing an image?",
        choices: [
          "A minor supporting detail",
          "The overall trend or main feature of the image",
          "Your personal opinion about the image's design",
          "The image's file format",
        ],
        correctIndex: 1,
        explanation:
          "Stating the overall trend or main feature first mirrors the 'overview before detail' structure used elsewhere in this course.",
      },
      {
        id: "q2",
        prompt: "Why is Retell Lecture considered an integrated task?",
        choices: [
          "It requires only speaking, with no other skill involved",
          "It requires listening to audio input and then producing a spoken response",
          "It requires reading a passage silently before responding",
          "It requires writing a short essay about the lecture",
        ],
        correctIndex: 1,
        explanation:
          "Retell Lecture draws on both listening comprehension and spoken output, so it contributes to both scores.",
      },
      {
        id: "q3",
        prompt: "What note-taking approach works best during the Retell Lecture audio?",
        choices: [
          "Writing full sentences for every point made",
          "Jotting brief key words, numbers, and structure cues rather than full sentences",
          "Not taking notes at all, relying purely on memory",
          "Writing only the speaker's exact opening sentence",
        ],
        correctIndex: 1,
        explanation:
          "Brief structural notes are realistic to capture in real time and support a fluent retelling afterward.",
      },
      {
        id: "q4",
        prompt:
          "Why can staying almost silent for several seconds at the start of a Describe Image response hurt your score?",
        choices: [
          "It has no effect on scoring at all",
          "Fluency is assessed across the whole response, so a hesitant opening isn't fully offset by a strong middle",
          "It automatically ends the task early",
          "Silence is a required part of every response's opening",
        ],
        correctIndex: 1,
        explanation:
          "Because fluency is judged over the entire response, beginning promptly matters even if the first sentence isn't perfectly planned.",
      },
    ],
    takeaway:
      "Structure both tasks as overview-first, detail-second, take brief structural notes during Retell Lecture's audio, and begin speaking promptly rather than waiting for a perfect opening line.",
    summary:
      "Describe Image rewards a clear overview-then-detail structure; Retell Lecture is integrated and rewards brief structural note-taking. Both are hurt by a hesitant, silent opening.",
    nextLessonSlug: "pte-speaking-answer-short-question-personal-intro",
  },
  {
    id: "pte-speaking-answer-short-question-personal-intro",
    slug: "pte-speaking-answer-short-question-personal-intro",
    title: "PTE Speaking: Answer Short Question and the Personal Introduction",
    description:
      "The two briefest speaking tasks, and why brevity is genuinely the right approach for one of them.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    objectives: [
      "Recognize that Answer Short Question expects a single word or short phrase, not a full explanation",
      "Respond quickly given Answer Short Question's short response window",
      "Prepare a natural, brief Personal Introduction despite it being unscored",
    ],
    skills: ["pte-speaking"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte answer short question", "pte personal introduction", "pte speaking vocabulary"],
    explanation: `**Answer Short Question** plays a brief audio question testing everyday or general-knowledge vocabulary -- something like asking what a particular category of object or person is called -- and expects a response of one word or a short phrase within a short response window. Unlike every other speaking task covered so far, elaboration is not the goal here: a single correct word answered promptly and clearly is a complete, strong response. Adding an unnecessary full sentence of explanation doesn't earn extra credit and risks running past the short window before you finish.

The practical strategy follows directly from that: listen carefully for the specific thing being asked, then answer immediately with the word or short phrase, without overthinking or padding it into a longer sentence. Hesitating for several seconds while deciding how to phrase a fuller answer is the most common way candidates lose time on this task unnecessarily.

The **Personal Introduction**, introduced in the first lesson of this course, is worth revisiting here alongside Answer Short Question because both are notably brief compared to Describe Image or Retell Lecture. Recall that the Personal Introduction is entirely unscored -- it exists as a microphone check and a low-stakes warm-up, and some institutions receiving your score report may optionally choose to listen to it. Even though it doesn't count toward any of your four communicative skill scores, it's still worth rehearsing a natural, roughly 20-25 second self-introduction -- covering your name, background, and purpose for taking the test -- both for your own confidence heading into the scored tasks, and because a fluent recording still reflects reasonably on you if an institution does listen to it.

Together, these two tasks are a useful reminder that PTE Academic doesn't reward length or elaboration uniformly across every task type -- reading each task's actual expectation correctly, whether that calls for one word or ninety seconds of structured explanation, is itself part of the skill being tested.`,
    commonMistakes: [
      "Giving a full explanatory sentence in Answer Short Question when a single word or short phrase is both expected and sufficient.",
      "Hesitating too long before answering, since the response window for Answer Short Question is very short.",
      "Treating the Personal Introduction as unimportant and skipping practice entirely, even though a fluent recording still reflects well if an institution chooses to listen to it.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What kind of response does Answer Short Question expect?",
        choices: [
          "A full paragraph explanation",
          "A single word or short phrase",
          "A written essay response",
          "A detailed comparison of two ideas",
        ],
        correctIndex: 1,
        explanation: "A brief, direct answer is both expected and sufficient for this task type.",
      },
      {
        id: "q2",
        prompt:
          "Is the Personal Introduction scored as part of your PTE Academic communicative skill scores?",
        choices: [
          "Yes, it heavily affects your Speaking score",
          "No, it is unscored, though institutions may optionally listen to it",
          "Yes, it affects your Listening score",
          "It replaces the Answer Short Question task entirely",
        ],
        correctIndex: 1,
        explanation:
          "The Personal Introduction is not scored -- it's a warm-up and optional institutional listen.",
      },
      {
        id: "q3",
        prompt: "Why is over-elaborating in Answer Short Question a poor strategy?",
        choices: [
          "It is required for a passing score",
          "The task expects brevity, and the response window is short",
          "Longer answers always score higher regardless of the task",
          "It removes points from other candidates' scores",
        ],
        correctIndex: 1,
        explanation:
          "The task expects a brief, direct answer, and a longer response risks running past the short window.",
      },
      {
        id: "q4",
        prompt:
          "Why is it still worth rehearsing a natural Personal Introduction, even though it isn't scored?",
        choices: [
          "It secretly counts toward your overall score",
          "It builds confidence and gives you a low-stakes microphone check, and some institutions may listen to it",
          "It is the longest task on the entire test",
          "It determines the difficulty of later tasks",
        ],
        correctIndex: 1,
        explanation:
          "Even unscored, it's a useful warm-up, and a fluent recording still reflects reasonably on you if listened to.",
      },
    ],
    takeaway:
      "Answer Short Question rewards brevity and speed, not elaboration; the Personal Introduction is unscored but still worth rehearsing for confidence and as a genuine mic check.",
    summary:
      "Answer Short Question expects one word or a short phrase, answered promptly. The Personal Introduction is unscored but worth a natural, rehearsed 20-25 second response.",
    nextLessonSlug: "pte-writing-summarize-written-text",
  },
  {
    id: "pte-writing-summarize-written-text",
    slug: "pte-writing-summarize-written-text",
    title: "PTE Writing: Summarize Written Text",
    description: "Compressing a full passage into exactly one grammatically correct sentence.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Identify a passage's main idea rather than listing every detail it contains",
      "Write exactly one grammatically correct sentence between 5 and 75 words",
      "Practice extracting a main idea from an original academic-style passage",
    ],
    skills: ["pte-writing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte summarize written text", "one sentence summary", "pte writing tasks"],
    explanation: `Summarize Written Text gives you an academic-style passage, around 300 words, and asks you to summarize it in **exactly one sentence**, between 5 and 75 words, within about 10 minutes. Because it requires reading comprehension of the passage and written output in response, it is integrated -- contributing to both your Reading and your Writing scores.

The single-sentence constraint is enforced strictly: a response containing more than one sentence, or falling outside the 5-75 word range, is scored as zero for content regardless of how well it captures the passage's meaning. This makes sentence construction itself part of the skill -- you'll typically need to combine two or more ideas using subordinate clauses or connecting words (for example, "although," "which," "because") rather than writing several short, separate sentences.

The other core skill is identifying the passage's actual **main idea**, as opposed to its supporting details. A strong summary captures the overall point the passage is making, not just one interesting fact mentioned along the way; copying long strings of exact wording directly from the passage, rather than paraphrasing it, also limits how well the response can be assessed on vocabulary and grammar.

Below is an original practice passage. Read it, then think about what a single, well-constructed sentence capturing its main idea would need to include -- the questions that follow test whether you've identified the passage's real point and key supporting relationship, not just isolated facts.

---

**Passage (original, academic style -- vertical farming):**

Vertical farming -- growing crops in stacked layers within controlled indoor environments -- has expanded rapidly in the past decade, driven by advances in LED lighting efficiency and hydroponic nutrient delivery. Proponents argue that indoor vertical farms use dramatically less water than traditional field agriculture, since water is recirculated in closed systems rather than lost to evaporation or runoff, and that year-round production close to urban centers can reduce the distance food travels before reaching consumers. Critics counter that the energy required to power artificial lighting and climate control is substantial, and that this energy cost can offset some of the environmental benefits unless the facility is powered by renewable sources. Economic viability remains a further open question: initial construction costs for a vertical farm are considerably higher than for an equivalent-output field farm, and profitability so far has been strongest for high-value, fast-growing crops such as leafy greens and herbs rather than staple grains. Researchers generally agree that vertical farming is unlikely to replace conventional agriculture entirely, but may play a growing role as one part of a more diversified food production system.`,
    commonMistakes: [
      "Writing more than one sentence, even using punctuation tricks to disguise it, which is scored as zero regardless of content quality.",
      "Copying long strings of exact words directly from the passage rather than paraphrasing, which limits the vocabulary and grammar scoring.",
      "Including minor supporting details from the passage while leaving out its actual main idea, producing a technically single-sentence but unfocused summary.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many sentences must a Summarize Written Text response contain?",
        choices: [
          "As many as needed to cover every detail",
          "Exactly one",
          "At least three",
          "Exactly five",
        ],
        correctIndex: 1,
        explanation:
          "Exactly one sentence is required -- more than one is scored as zero for content.",
      },
      {
        id: "q2",
        prompt: "What is the approximate word range allowed for a Summarize Written Text response?",
        choices: ["5-75 words", "150-250 words", "1-10 words", "300-350 words"],
        correctIndex: 0,
        explanation: "Responses must fall between 5 and 75 words.",
      },
      {
        id: "q3",
        prompt:
          "According to the practice passage, what is one advantage proponents claim for vertical farming?",
        choices: [
          "It requires no electricity at all",
          "It uses substantially less water than traditional field agriculture",
          "It has lower construction costs than field farms",
          "It works best for staple grains like wheat",
        ],
        correctIndex: 1,
        explanation:
          "The passage states proponents highlight dramatically reduced water use from closed, recirculating systems.",
      },
      {
        id: "q4",
        prompt:
          "According to the passage, what do critics say offsets some of vertical farming's environmental benefits?",
        choices: [
          "The cost of seeds",
          "The energy required for lighting and climate control",
          "The price of hydroponic nutrients",
          "The distance food travels to market",
        ],
        correctIndex: 1,
        explanation:
          "Critics point to the substantial energy cost of artificial lighting and climate control.",
      },
    ],
    takeaway:
      "Identify the passage's real main idea, then compress it into exactly one grammatically correct sentence between 5 and 75 words -- never more than one sentence.",
    summary:
      "Summarize Written Text is an integrated Reading-Writing task requiring exactly one sentence capturing a passage's main idea, strictly within a 5-75 word limit.",
    nextLessonSlug: "pte-writing-write-essay",
  },
  {
    id: "pte-writing-write-essay",
    slug: "pte-writing-write-essay",
    title: "PTE Writing: Write Essay",
    description: "Structuring a 200-300 word argumentative essay within a 20-minute limit.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 6,
    difficulty: "advanced",
    estimatedMinutes: 25,
    objectives: [
      "Structure a Write Essay response with a clear position, developed body paragraphs, and a conclusion",
      "Manage the 20-minute time limit across planning, writing, and proofreading",
      "Explain why spelling and grammar proofreading time is worthwhile given how enabling skills are scored",
    ],
    skills: ["pte-writing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte write essay", "pte essay structure", "enabling skills writing"],
    explanation: `Write Essay gives you an argumentative prompt and 20 minutes to produce a response of 200-300 words. Unlike Summarize Written Text, this task isn't integrated with reading input -- it's assessed purely on your writing -- but it's still scored across multiple dimensions, including content, structure and coherence, grammar, vocabulary, and spelling, since these enabling skills are reported as separate sub-scores that roll up into your overall Writing score.

A reliable structure closely resembles a standard academic argumentative essay: an **introduction** that paraphrases the prompt and states your position or the essay's scope, two **body paragraphs** each developing one main idea with a specific example or piece of reasoning, and a **conclusion** that restates your position without introducing new ideas. Developing two or three ideas thoroughly, with concrete reasoning, scores better than listing many loosely related points shallowly.

The word count is enforced as part of the "Form" dimension of scoring: falling noticeably under 200 words or going over 300 words costs marks regardless of the essay's quality otherwise. A practical way to manage the 20 minutes is roughly 3-4 minutes planning your position and structure, about 14 minutes writing, and the final 2-3 minutes proofreading specifically for spelling and grammar -- both of which, again, are scored as distinct enabling skills, so a quick proofreading pass has a real, separate payoff beyond just "looking neater."

The most common content-level mistake is failing to state a clear position when the prompt calls for one, or drifting away from the actual question asked partway through the essay -- an essay that reads fluently but never directly answers the specific question posed will still lose marks on content.`,
    commonMistakes: [
      "Writing well under 200 words or over 300 words, which is penalized as part of the Form scoring regardless of the essay's quality.",
      "Never using the last few minutes to proofread for spelling and basic grammar errors, both of which are scored explicitly as enabling skills.",
      "Presenting a list of loosely related points instead of two or three ideas developed with specific reasoning or examples.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the recommended word count range for Write Essay?",
        choices: ["50-100 words", "200-300 words", "500-600 words", "There is no word limit"],
        correctIndex: 1,
        explanation: "Write Essay responses should fall between 200 and 300 words.",
      },
      {
        id: "q2",
        prompt:
          "Which enabling skill specifically checks for correct spelling in a Write Essay response?",
        choices: ["Oral fluency", "Spelling", "Pronunciation", "Repeat accuracy"],
        correctIndex: 1,
        explanation:
          "Spelling is scored as its own distinct enabling skill, separate from grammar or vocabulary.",
      },
      {
        id: "q3",
        prompt: "Why is proofreading in the final minutes of the 20-minute time limit worthwhile?",
        choices: [
          "It has no real effect on scoring",
          "Spelling and grammar are scored explicitly as separate enabling skills",
          "It replaces the need to plan the essay beforehand",
          "It only matters for Speaking tasks, not Writing",
        ],
        correctIndex: 1,
        explanation:
          "Because spelling and grammar each have their own enabling-skill sub-score, a proofreading pass has a real, separate payoff.",
      },
      {
        id: "q4",
        prompt: "What structural approach is recommended for a Write Essay response?",
        choices: [
          "A single unstructured paragraph",
          "An introduction with a clear position, developed body paragraphs, and a conclusion",
          "Bullet points only, with no full sentences",
          "A list of unrelated facts about the topic",
        ],
        correctIndex: 1,
        explanation:
          "A clear introduction-body-conclusion structure, with a stated position, is the reliable approach.",
      },
    ],
    takeaway:
      "Budget the 20 minutes across planning, writing, and proofreading, and remember spelling and grammar are scored as distinct enabling skills worth checking deliberately.",
    summary:
      "Write Essay requires a 200-300 word argumentative response with a clear structure and position. Content, structure, grammar, vocabulary, and spelling are all scored separately, so proofreading has a genuine, distinct payoff.",
    nextLessonSlug: "pte-reading-multiple-choice-reorder-paragraphs",
  },
  {
    id: "pte-reading-multiple-choice-reorder-paragraphs",
    slug: "pte-reading-multiple-choice-reorder-paragraphs",
    title: "PTE Reading: Multiple Choice and Re-order Paragraphs",
    description:
      "Reading Multiple Choice question variants, and reconstructing a passage's logical order.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 7,
    difficulty: "beginner",
    estimatedMinutes: 20,
    objectives: [
      "Distinguish single-answer from multiple-answer Multiple Choice questions before selecting a response",
      "Identify the correct opening paragraph of a scrambled passage using general-statement and pronoun clues",
      "Practice Re-order Paragraphs and Multiple Choice comprehension against an original passage",
    ],
    skills: ["pte-reading"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte reading multiple choice", "pte re-order paragraphs", "pte reading strategy"],
    explanation: `The Reading part of PTE Academic has five task types in total. This lesson covers two of them: Multiple Choice, and Re-order Paragraphs. Reading's remaining Fill in the Blanks task types are covered in the next lesson.

**Multiple Choice** questions in Reading come in two variants, and the instructions always state which one you're facing: **single answer** questions ask you to choose the one correct option, while **multiple answer** questions ask you to select every option that applies, with no indication given of how many correct options exist. Reading the instruction line carefully before answering matters, since applying single-answer habits (picking just one option) to a multiple-answer question loses marks even if the one option you picked was correct.

**Re-order Paragraphs** presents several short text boxes, shown out of their original order, that you must rearrange into a logical sequence. The most reliable strategy is to first identify the paragraph most likely to be the **opening**: it typically makes a general statement and introduces a topic without referring back to something not yet mentioned (no "this," "these," or "as a result" pointing at prior content). From there, track connecting words and pronoun references -- "this," "however," "as a result," "these changes" -- that reveal which paragraph must logically follow another, working outward from the opening rather than guessing the ending first.

Below is an original passage, presented as three scrambled paragraphs. Practice identifying the correct logical order, then answer the comprehension questions.

---

**Passage (original, scrambled -- the rise of container shipping):**

**Paragraph A.** As a result, port turnaround times fell sharply and shipping costs per ton dropped so significantly that some economists consider the shipping container one of the most influential inventions in the growth of global trade during the twentieth century.

**Paragraph B.** Before the 1950s, cargo was loaded onto ships piece by piece, a labor-intensive process known as break-bulk shipping that could keep a vessel in port for over a week while dockworkers manually handled thousands of individual items.

**Paragraph C.** This inefficiency changed dramatically with the introduction of standardized steel shipping containers, first used commercially in 1956, which allowed goods to be packed once and moved between ship, train, and truck without being unpacked at each stage.`,
    commonMistakes: [
      "In Multiple Choice Multiple Answer questions, selecting only one option out of habit from Single Answer questions, when several options may need to be selected.",
      "In Re-order Paragraphs, starting by guessing the last paragraph instead of first identifying the paragraph most likely to be the general opening statement.",
      "Ignoring pronoun and connector clues ('this,' 'as a result,' 'however') that reveal which paragraph must logically follow another.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "In PTE Reading Multiple Choice questions, what should you always check first?",
        choices: [
          "The passage's total word count",
          "Whether the question requires one answer or multiple answers",
          "The font size used for the passage",
          "The name of the passage's author",
        ],
        correctIndex: 1,
        explanation:
          "Single-answer and multiple-answer questions require different selection strategies, so checking which applies matters first.",
      },
      {
        id: "q2",
        prompt: "Which paragraph should come first in the correct chronological order?",
        choices: ["Paragraph A", "Paragraph B", "Paragraph C"],
        correctIndex: 1,
        explanation:
          "Paragraph B makes the general opening statement about break-bulk shipping before the container era began.",
      },
      {
        id: "q3",
        prompt: "Which paragraph should come last in the correct chronological order?",
        choices: ["Paragraph A", "Paragraph B", "Paragraph C"],
        correctIndex: 0,
        explanation:
          "Paragraph A describes the resulting outcome ('as a result'), which logically follows the container's introduction in Paragraph C.",
      },
      {
        id: "q4",
        prompt:
          "According to the passage, what allowed container contents to move between ship, train, and truck without unpacking?",
        choices: [
          "Faster ships",
          "Standardized steel shipping containers",
          "Larger dockworker crews",
          "Lower shipping taxes",
        ],
        correctIndex: 1,
        explanation:
          "Standardized containers, introduced in 1956, enabled goods to move between transport modes unpacked.",
      },
    ],
    takeaway:
      "Always confirm whether a Multiple Choice question needs one or several answers, and reconstruct paragraph order by finding the general opening statement first, then following connector and pronoun clues outward.",
    summary:
      "Multiple Choice questions come in single-answer and multiple-answer forms; check which applies before answering. Re-order Paragraphs rewards finding the opening paragraph first and tracking logical connectors between the rest.",
    nextLessonSlug: "pte-reading-fill-in-the-blanks",
  },
  {
    id: "pte-reading-fill-in-the-blanks",
    slug: "pte-reading-fill-in-the-blanks",
    title: "PTE Reading: Fill in the Blanks",
    description:
      "Using grammar and context clues, not just topic relevance, to choose the right word for a blank.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Read a full passage once for overall meaning before attempting to fill any blanks",
      "Use grammatical clues (tense, prepositions, singular/plural) to narrow word choices rather than topic alone",
      "Recognize that a shared word bank contains deliberate distractor words that fit no blank correctly",
    ],
    skills: ["pte-reading"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte fill in the blanks", "pte reading vocabulary", "pte word bank"],
    explanation: `PTE Academic's Reading part includes a "Fill in the Blanks" task where a passage has several blanks, and you drag words from a shared word bank below it into the correct positions. The word bank always contains more words than there are blanks, so some listed words are deliberate distractors that don't correctly fit any blank. Because this task draws on reading comprehension, grammar, and vocabulary together, it contributes meaningfully to your Reading score.

The most effective approach is to read the entire passage once, ignoring the blanks, to understand its overall meaning before selecting any words. Then, for each blank, use grammatical clues from the surrounding sentence -- the preposition that follows, the verb tense being used, whether a singular or plural form is needed -- together with collocation (words that commonly and naturally pair together) to narrow down which word bank option actually fits, rather than picking a word just because it feels topically related.

A related but distinct Reading task type, sometimes just called Fill in the Blanks (Reading), uses a dropdown menu of a few options for each individual blank instead of one shared word bank for the whole passage -- the same grammar-and-context strategy applies to that variant too.

Below is an original passage with three blanks, followed by a word bank. Practice applying the strategy above, then check your reasoning against the questions that follow.

---

**Passage (original, academic style -- deep-sea vent ecosystems):**

When researchers first explored hydrothermal vents on the ocean floor in the late 1970s, they were surprised to find dense communities of life clustered around the scalding, mineral-rich water. Unlike almost every other ecosystem on Earth, these communities do not ___(1)___ on sunlight as their primary energy source. Instead, specialized bacteria convert chemical compounds released from the vents into usable energy through a process called chemosynthesis, and larger organisms such as tube worms ___(2)___ on these bacteria, either by consuming them directly or by hosting them internally in a symbiotic relationship. Because vent ecosystems can appear and disappear as geological activity shifts over time, scientists still debate how quickly a newly formed vent is ___(3)___ by organisms traveling from other, sometimes distant, vent sites.

**Word bank:** rely, generate, escape, illuminate, depend, colonized, discovered, abandoned`,
    commonMistakes: [
      "Selecting a word based on general topic relevance alone, without checking that it grammatically fits the surrounding sentence (tense, preposition, singular or plural).",
      "Failing to notice that the word bank contains more words than blanks, so some listed words are deliberate distractors that fit no blank correctly.",
      "Filling in each blank in isolation without first reading the whole passage, missing context clues that appear later in the text.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "In the passage, which word correctly completes the first blank, describing what these ecosystems do not depend on for energy?",
        choices: ["rely", "generate", "escape", "illuminate"],
        correctIndex: 0,
        explanation:
          "'Rely on sunlight' correctly completes the sentence about the ecosystem's energy source.",
      },
      {
        id: "q2",
        prompt:
          "Which word correctly completes the second blank, describing how tube worms relate to the bacteria?",
        choices: ["discovered", "abandoned", "depend", "illuminate"],
        correctIndex: 2,
        explanation:
          "'Depend on these bacteria' correctly describes the tube worms' reliance on the bacteria.",
      },
      {
        id: "q3",
        prompt:
          "Which word correctly completes the third blank, describing how new vents gain inhabitants over time?",
        choices: ["colonized", "generate", "escape", "rely"],
        correctIndex: 0,
        explanation:
          "'Colonized' correctly describes organisms establishing themselves at a newly formed vent.",
      },
      {
        id: "q4",
        prompt:
          "What is the most effective first step when tackling a Reading Fill in the Blanks task?",
        choices: [
          "Immediately guess based on the first word listed in the word bank",
          "Read the entire passage once for overall meaning before selecting words",
          "Only look at each blank in isolation without reading the surrounding text",
          "Fill blanks in reverse order, starting from the last one",
        ],
        correctIndex: 1,
        explanation:
          "Reading the whole passage first provides context that makes individual blank choices far more reliable.",
      },
    ],
    takeaway:
      "Read the full passage before filling any blank, and use grammar and collocation clues -- not just topic relevance -- to eliminate the word bank's deliberate distractors.",
    summary:
      "Fill in the Blanks tests reading, grammar, and vocabulary together using a word bank with built-in distractors. Reading for overall meaning first, then applying grammatical clues per blank, is the reliable approach.",
    nextLessonSlug: "pte-listening-summarize-spoken-text",
  },
  {
    id: "pte-listening-summarize-spoken-text",
    slug: "pte-listening-summarize-spoken-text",
    title: "PTE Listening: Summarize Spoken Text",
    description: "Turning a short lecture into a coherent 50-70 word written summary.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 9,
    difficulty: "beginner",
    estimatedMinutes: 20,
    objectives: [
      "Take structure-focused notes (intro, main points, conclusion) while listening to a short lecture",
      "Write a 50-70 word summary in complete, grammatically correct sentences rather than bullet points",
      "Practice extracting the main idea and key supporting points from an original transcript",
    ],
    skills: ["pte-listening"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: ["pte summarize spoken text", "pte listening notes", "pte listening writing"],
    explanation: `Summarize Spoken Text plays an academic-style talk lasting roughly 60-90 seconds, played once, and then gives you about 10 minutes to write a summary of 50-70 words. Because it requires listening comprehension of audio input and written output in response, it is integrated -- contributing to both your Listening and your Writing scores. Unlike Summarize Written Text, which compresses a passage into a single sentence, this task allows -- and generally needs -- more than one sentence to reach the 50-70 word target.

The key skill is structured note-taking during the single playback: rather than trying to write down everything said, focus notes on the talk's overall topic, its two or three main points, and any stated conclusion or implication. Since the audio plays only once, notes that capture structure (not every word) give you enough material afterward to compose a coherent summary, rather than a disconnected list of half-remembered fragments.

When writing the summary itself, use complete, grammatically correct sentences rather than bullet points or sentence fragments -- like Write Essay, this task is also assessed partly on grammar and form, so the writing itself needs to hold together as prose, not just contain the right content.

Below is an original practice transcript. Read it once as if you were hearing it, take brief notes mentally, then answer the comprehension questions -- this simulates the note-taking and content-selection skill even though you're reading rather than hearing it, since this platform does not host real exam-style audio.

---

**Transcript (original -- lecture excerpt on urban heat islands):**

Today I want to talk about what's known as the urban heat island effect. Cities tend to be measurably warmer than the rural areas that surround them, sometimes by several degrees, especially at night. There are a few main reasons for this. First, materials commonly used in cities -- asphalt, concrete, dark rooftops -- absorb and retain heat far more effectively than natural surfaces like grass or soil. Second, the reduction of vegetation in urban areas means less shade and less of the natural cooling effect that comes from plants releasing moisture into the air. Third, human activity itself generates heat directly, through vehicles, air conditioning units, and industrial processes. Researchers have found that simple interventions -- planting more urban trees, and using lighter-colored or reflective roofing materials -- can measurably reduce local temperatures, though implementing these changes citywide is often slow and costly.`,
    commonMistakes: [
      "Writing the summary as disconnected bullet points instead of complete, grammatically correct sentences.",
      "Focusing notes on minor examples mentioned in passing rather than the lecture's main structure and key points.",
      "Running out of time because notes weren't organized during listening, leaving too little time to compose a coherent written summary.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "According to the lecture, which materials are described as absorbing and retaining heat more than natural surfaces?",
        choices: [
          "Grass and soil",
          "Asphalt, concrete, and dark rooftops",
          "Water and sand",
          "Wood and glass",
        ],
        correctIndex: 1,
        explanation:
          "The lecture names asphalt, concrete, and dark rooftops as absorbing and retaining heat effectively.",
      },
      {
        id: "q2",
        prompt:
          "Besides building materials, what other cause of urban heat does the lecture mention?",
        choices: [
          "Ocean currents",
          "Human activity itself, such as vehicles and air conditioning",
          "Increased rainfall",
          "Higher altitude",
        ],
        correctIndex: 1,
        explanation:
          "The lecture lists human activity -- vehicles, air conditioning, and industrial processes -- as a third cause.",
      },
      {
        id: "q3",
        prompt: "What interventions does the lecture suggest can reduce local temperatures?",
        choices: [
          "Banning all vehicles immediately",
          "Planting more urban trees and using lighter, reflective roofing",
          "Removing all buildings from city centers",
          "Increasing the number of parking lots",
        ],
        correctIndex: 1,
        explanation:
          "The lecture mentions urban trees and lighter, reflective roofing as measurable interventions.",
      },
      {
        id: "q4",
        prompt: "What is the recommended word count range for a Summarize Spoken Text response?",
        choices: ["5-75 words", "50-70 words", "150-200 words", "300-350 words"],
        correctIndex: 1,
        explanation: "Summarize Spoken Text responses should fall between 50 and 70 words.",
      },
    ],
    takeaway:
      "Take structure-focused notes during the single playback, then compose the 50-70 word summary as coherent, grammatically correct sentences, not a list of fragments.",
    summary:
      "Summarize Spoken Text is an integrated Listening-Writing task requiring a 50-70 word summary in complete sentences. Structured note-taking during the single playback is the highest-leverage skill.",
    nextLessonSlug: "pte-listening-fill-in-blanks-highlight-summary",
  },
  {
    id: "pte-listening-fill-in-blanks-highlight-summary",
    slug: "pte-listening-fill-in-blanks-highlight-summary",
    title: "PTE Listening: Fill in the Blanks and Highlight Correct Summary",
    description:
      "Typing exact words while listening, and choosing the summary that doesn't misrepresent the audio.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Type words into a visible on-screen transcript while listening, since the audio plays only once",
      "Recognize that Listening Fill in the Blanks also requires correct spelling to receive credit",
      "Eliminate Highlight Correct Summary options that contradict or oversimplify specific details from the audio",
    ],
    skills: ["pte-listening"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: [
      "pte listening fill in the blanks",
      "pte highlight correct summary",
      "pte listening spelling",
    ],
    explanation: `Listening Fill in the Blanks shows you a transcript with several blanks on screen while the corresponding audio plays simultaneously, and you type the missing words as you hear them. Because the audio plays only once and you're typing while listening, this task rewards a different rhythm than the Reading version: since the surrounding text is already visible, you can use it to predict grammatically what kind of word is needed -- a noun, a particular verb form -- before the word is even spoken, narrowing what you're listening for in advance. Correct spelling is required to receive credit, since this task also feeds into the spelling enabling skill.

**Highlight Correct Summary** is a different task type entirely: you listen to a talk, then choose which of several written paragraph summaries best matches what was actually said, from a set that includes plausible-sounding but inaccurate distractor summaries. The reasoning skill closely resembles eliminating False or Not Given claims against a passage: rule out any summary that contradicts a specific detail from the audio, or that oversimplifies the talk by omitting its actual main point, even if that summary reads fluently and confidently.

Below is an original transcript, followed by a fill-in-the-blanks-style excerpt and a Highlight Correct Summary-style question, so you can practice both skills against the same source material.

---

**Transcript (original -- talk on why leaves change color in autumn):**

During spring and summer, leaves appear green because of chlorophyll, the pigment plants use to capture sunlight for photosynthesis. Chlorophyll is produced continuously through the warmer months, which is why it masks other pigments that are present in the leaf the whole time. As days shorten and temperatures drop in autumn, trees gradually stop producing chlorophyll, and the green pigment breaks down faster than it's replaced. This allows other pigments -- carotenoids, which produce yellow and orange colors, and anthocyanins, which produce red colors -- to become visible. Interestingly, anthocyanins aren't present in the leaf all year; some trees actively produce them in autumn, and researchers believe this may help protect the leaf from sun damage during the period just before it falls.

**Excerpt with blanks, as it might appear on screen while the audio plays:** "...trees gradually stop producing ___(1)___, and the green pigment breaks down faster than it's replaced... carotenoids, which produce ___(2)___ colors... anthocyanins, which produce ___(3)___ colors..."`,
    commonMistakes: [
      "Typing a plausible-sounding word into a Listening Fill in the Blanks answer without matching the exact word actually spoken, including its correct spelling.",
      "In Highlight Correct Summary, selecting a summary that sounds fluent and general but actually omits or contradicts a specific detail from the audio.",
      "Waiting until the audio finishes to start typing Fill in the Blanks answers, since the audio plays only once and there is no way to relisten.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Which word correctly fills the blank describing what trees gradually stop producing in autumn?",
        choices: ["chlorophyll", "anthocyanin", "carotenoid", "sunlight"],
        correctIndex: 0,
        explanation:
          "The transcript states trees gradually stop producing chlorophyll as autumn progresses.",
      },
      {
        id: "q2",
        prompt: "Which colors does the passage associate with carotenoids?",
        choices: ["Yellow and orange", "Red and purple", "Blue and green", "Black and brown"],
        correctIndex: 0,
        explanation: "The transcript states carotenoids produce yellow and orange colors.",
      },
      {
        id: "q3",
        prompt: "Which color does the passage associate with anthocyanins?",
        choices: ["Green", "Red", "Blue", "White"],
        correctIndex: 1,
        explanation: "The transcript states anthocyanins produce red colors.",
      },
      {
        id: "q4",
        prompt:
          "Which of the following best summarizes the talk, without contradicting or oversimplifying what was said?",
        choices: [
          "Leaves are green in summer and stay exactly the same color all year",
          "Chlorophyll masks other pigments during warmer months; as it breaks down in autumn, carotenoids and anthocyanins become visible, with anthocyanins possibly offering sun protection",
          "Autumn leaf color change is caused solely by falling temperatures, with no role for pigments",
          "Anthocyanins are present in leaves year-round and never change",
        ],
        correctIndex: 1,
        explanation:
          "This summary accurately reflects the chlorophyll-masking mechanism, the pigments revealed, and the sun-protection theory -- without contradicting or oversimplifying the talk.",
      },
    ],
    takeaway:
      "Use the visible on-screen text to predict what type of word is needed before it's spoken, spell answers correctly, and eliminate summaries that contradict or oversimplify specific details from the audio.",
    summary:
      "Listening Fill in the Blanks requires typing exact, correctly spelled words while listening. Highlight Correct Summary requires eliminating summaries that misrepresent or oversimplify the audio's actual content.",
    nextLessonSlug: "pte-listening-multiple-choice-select-missing-word",
  },
  {
    id: "pte-listening-multiple-choice-select-missing-word",
    slug: "pte-listening-multiple-choice-select-missing-word",
    title: "PTE Listening: Multiple Choice and Select Missing Word",
    description:
      "Handling audio-based Multiple Choice questions and predicting a talk's logical final word.",
    trackSlug: "exam-preparation",
    courseSlug: "pte-academic-preparation",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Recognize distractor options in Listening Multiple Choice that misrepresent a detail's cause, effect, or timing",
      "Predict a Select Missing Word answer using the whole talk's logical direction, not just the final few words",
      "Identify Highlight Incorrect Words and Write from Dictation as further listening task types worth separate practice",
    ],
    skills: ["pte-listening"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "PTE Academic official website", url: "https://www.pearsonpte.com/pte-academic/" },
      {
        label: "PTE Academic test format",
        url: "https://www.pearsonpte.com/pte-academic/test-format/",
      },
    ],
    keywords: [
      "pte listening multiple choice",
      "pte select missing word",
      "pte listening task types",
    ],
    explanation: `Listening Multiple Choice questions, in both single-answer and multiple-answer forms, work much like their Reading counterparts but are based on audio rather than a written passage. The same core skill applies: listen for the overall message and specific stated details, and watch carefully for distractor options that mention something genuinely discussed in the audio but misrepresent its relationship to the rest of the talk -- for instance, reversing a stated cause and effect, or getting the sequence of events wrong.

**Select Missing Word** plays a talk that is cut off abruptly at the very end, with the final word or short phrase replaced by a tone, and asks you to choose, from several options, the word or phrase that logically completes the final sentence. This task tests overall comprehension and the ability to predict a logical continuation, not simply memory of the last few words heard -- the correct option must fit both grammatically and logically with everything said earlier in the talk, so it's worth listening for the talk's overall direction throughout, not only its ending.

Below is an original transcript, deliberately cut off, followed by comprehension and prediction questions.

---

**Transcript (original, cut off -- talk on the domestication of rice):**

Archaeologists studying early agriculture in East Asia have found evidence that wild rice was first cultivated deliberately several thousand years ago, gradually shifting from a foraged wild grain to a managed crop. Early farmers appear to have selected seeds from plants with traits useful for farming, such as seeds that stayed attached to the plant longer instead of scattering naturally, making harvesting far more... [audio cut off by a tone]

---

Two further Listening task types are worth knowing about, even though this course doesn't dedicate a full separate lesson to either. **Highlight Incorrect Words** shows a transcript on screen while the audio plays, and you click any displayed word that differs from what's actually spoken. **Write from Dictation** plays a short sentence, once, which you then type out exactly as heard -- testing spelling and listening together, similarly to the Fill in the Blanks task covered in the previous lesson. Both are genuine task types you may encounter on the real test and are worth practicing independently, even without a dedicated lesson walking through each here.`,
    commonMistakes: [
      "In Multiple Choice listening questions, selecting an option that mentions a detail from the audio but misrepresents its cause-and-effect relationship or timing.",
      "In Select Missing Word, focusing only on the last few words spoken instead of the overall logical direction of the entire talk.",
      "Assuming Highlight Incorrect Words and Write from Dictation aren't worth practicing just because this course doesn't dedicate a full lesson to each.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which option best completes the cut-off talk about early rice domestication?",
        choices: ["efficient", "difficult", "expensive", "random"],
        correctIndex: 0,
        explanation:
          "Seeds staying attached longer made harvesting easier and faster, so 'efficient' logically completes the sentence.",
      },
      {
        id: "q2",
        prompt:
          "What trait did early farmers reportedly select for in wild rice plants, according to the talk?",
        choices: [
          "Seeds that scattered quickly",
          "Seeds that stayed attached to the plant longer",
          "Taller stalks only",
          "Resistance to cold weather",
        ],
        correctIndex: 1,
        explanation:
          "The talk states farmers selected for seeds that stayed attached longer instead of scattering naturally.",
      },
      {
        id: "q3",
        prompt:
          "In Select Missing Word, what should you primarily rely on to choose the correct ending?",
        choices: [
          "Only the final two words spoken before the tone",
          "The overall topic and logical direction of the entire talk",
          "The speaker's tone of voice alone",
          "Random guessing, since it can't be predicted",
        ],
        correctIndex: 1,
        explanation:
          "The correct option must fit the whole talk's logic, not just its final few words.",
      },
      {
        id: "q4",
        prompt:
          "Which two listening task types, though not covered in a dedicated lesson here, involve identifying differences between displayed text and spoken audio, or typing a sentence exactly as heard?",
        choices: [
          "Highlight Incorrect Words and Write from Dictation",
          "Describe Image and Retell Lecture",
          "Read Aloud and Repeat Sentence",
          "Summarize Written Text and Write Essay",
        ],
        correctIndex: 0,
        explanation:
          "Highlight Incorrect Words compares displayed text to audio, and Write from Dictation requires typing a heard sentence exactly.",
      },
    ],
    takeaway:
      "Watch for distractors that misrepresent a detail's relationship to the rest of the audio in Multiple Choice, and use the whole talk's logic -- not just its final words -- to predict a Select Missing Word answer.",
    summary:
      "Listening Multiple Choice rewards catching misrepresented relationships between details; Select Missing Word rewards predicting a logical ending from the whole talk. Highlight Incorrect Words and Write from Dictation are further listening task types worth practicing on your own.",
  },
];
