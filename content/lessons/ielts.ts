import type { LessonInput } from "@/lib/content/types";

/**
 * IELTS Preparation lessons. Every passage, transcript, and question here is
 * original -- none are copied from real IELTS material, and none claim
 * affiliation with IELTS/British Council/IDP/Cambridge Assessment English
 * (see components/exam-prep/trademark-notice.tsx, rendered on the course
 * page). Reading/Listening lessons place the original passage/transcript
 * directly in `explanation`, then ask genuine comprehension questions about
 * it in `quiz` -- reusing the existing explanation+quiz architecture rather
 * than inventing a parallel one (see docs/product-expansion/DECISIONS.md).
 * These lessons have no `example`/`guidedExercise`/`independentExercise`
 * (see lib/content/types.ts's Phase 6 note) since there is no honest code
 * exercise for reading comprehension or essay writing.
 */
export const ieltsLessons: LessonInput[] = [
  {
    id: "ielts-test-format-overview",
    slug: "ielts-test-format-overview",
    title: "IELTS Test Format Overview",
    description: "What IELTS tests, the two test versions, and how the four sections fit together.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Distinguish IELTS Academic from IELTS General Training and know which one your goal requires",
      "List the four IELTS sections in order and their approximate timing",
      "Describe what a 'band score' is and how the four sections combine into an overall band",
    ],
    skills: ["ielts-format", "ielts-overview"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS official website", url: "https://www.ielts.org/" },
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: ["ielts", "ielts format", "academic vs general training", "band score"],
    explanation: `IELTS (International English Language Testing System) has two versions. **Academic** is for university admission and professional registration -- its Reading and Writing sections use academic-style texts and tasks. **General Training** is for immigration, work, and secondary education -- its Reading and Writing sections use everyday, workplace-style texts and letter writing instead of an essay-only format. Listening and Speaking are identical in both versions.

Every candidate sits four sections in this order: **Listening** (about 30 minutes plus transfer time), **Reading** (60 minutes), **Writing** (60 minutes), and **Speaking** (11-14 minutes, often on a different day or later the same day). Listening, Reading, and Writing are normally taken back-to-back with no break.

Each section is scored on a **band scale from 0 to 9**, in half-band increments (e.g. 6.5). Your overall band score is the average of the four section bands, rounded to the nearest half or whole band. A university or immigration authority typically sets a minimum overall band *and* sometimes a minimum band in each individual section -- always check your specific requirement rather than assuming the overall score alone is enough.

Unlike some other English tests, IELTS Listening and Speaking are unavoidably tied to real-time pacing: you hear the Listening recording only once, and Speaking is a live conversation with an examiner (in person or by video call). This makes pacing and staying calm under time pressure a core skill this course builds deliberately, not just vocabulary and grammar.`,
    commonMistakes: [
      "Preparing for Academic Writing Task 1 (a data-description task) when the real goal requires General Training (a letter-writing task) -- confirm your version before you start practicing.",
      "Assuming the four section scores must each individually meet the overall band requirement, when many institutions only require the overall band (though some do set section minimums -- always check).",
      "Treating Listening as 'easier' than Reading because it feels more passive, then losing marks by not tracking the answer sheet transfer time carefully.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Which two IELTS sections differ between the Academic and General Training versions?",
        choices: [
          "Listening and Speaking",
          "Reading and Writing",
          "Listening and Writing",
          "Reading and Speaking",
        ],
        correctIndex: 1,
        explanation:
          "Reading and Writing use different texts/tasks in Academic vs. General Training; Listening and Speaking are identical in both.",
      },
      {
        id: "q2",
        prompt: "How is your overall IELTS band score calculated?",
        choices: [
          "The highest of the four section scores",
          "The average of the four section scores, rounded to the nearest half or whole band",
          "The Writing and Speaking scores only",
          "A pass/fail based on a fixed cutoff",
        ],
        correctIndex: 1,
        explanation:
          "The overall band is the average of Listening, Reading, Writing, and Speaking, rounded.",
      },
      {
        id: "q3",
        prompt: "Which version of IELTS is typically required for university admission?",
        choices: [
          "General Training",
          "Academic",
          "Either, they are identical",
          "Neither -- universities use TOEFL only",
        ],
        correctIndex: 1,
        explanation:
          "IELTS Academic is the version typically required for university/professional admission.",
      },
    ],
    takeaway:
      "Confirm which IELTS version your goal actually requires before you start preparing, since Reading and Writing differ meaningfully between them.",
    summary:
      "IELTS has an Academic and a General Training version, differing in Reading/Writing content. All four sections (Listening, Reading, Writing, Speaking) are scored 0-9, and the overall band is their average.",
    nextLessonSlug: "ielts-study-plan-and-band-descriptors",
  },
  {
    id: "ielts-study-plan-and-band-descriptors",
    slug: "ielts-study-plan-and-band-descriptors",
    title: "Building a Study Plan and Reading Band Descriptors",
    description:
      "How IELTS band descriptors work, and how to build a realistic preparation timeline.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Explain in plain language what the four IELTS Writing/Speaking band criteria assess",
      "Build a realistic multi-week study plan proportional to a target band gap",
      "Identify which section(s) most need attention using a diagnostic",
    ],
    skills: ["ielts-format", "ielts-study-planning"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: [
      "ielts study plan",
      "band descriptors",
      "ielts writing criteria",
      "ielts speaking criteria",
    ],
    explanation: `IELTS Writing and Speaking are scored against four published criteria each. For **Writing**: Task Achievement/Response (did you actually answer the task fully), Coherence and Cohesion (is it organized and logically linked), Lexical Resource (vocabulary range and precision), and Grammatical Range and Accuracy. For **Speaking**: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. Listening and Reading are scored objectively by counting correct answers out of 40 and converting to a band using a published conversion table -- there's no subjective judgment involved in those two sections.

Knowing the criteria matters because it tells you *what to practice*, not just *how much*. A learner stuck at band 6 in Writing because of narrow vocabulary needs different practice than one stuck at band 6 because of poor paragraph organization -- both might get the same overall number but need entirely different fixes.

A realistic study plan scales with your band gap. Moving from roughly band 5.5 to 6.5 across all sections is commonly estimated (by test-prep researchers, not by IELTS itself, which sets no official timeline) to take somewhere in the range of 6-12 weeks of consistent practice, though this varies enormously by individual starting point, native language, and hours per week available -- treat any timeline estimate as a rough planning tool, not a promise.

Start with a **diagnostic**: attempt a short sample from each section under realistic time pressure, and honestly note which section felt weakest. Spend more of your weekly practice time on your genuinely weakest section rather than splitting time evenly, while still touching every section regularly so skills don't decay.`,
    commonMistakes: [
      "Spending all preparation time on vocabulary lists while ignoring Coherence and Cohesion, which often has a bigger effect on the Writing band for many learners.",
      "Setting an unrealistic timeline (e.g. 'band 5 to band 8 in two weeks') that leads to discouragement rather than steady progress.",
      "Skipping a diagnostic and guessing which section is weakest, then spending weeks practicing a section that was already strong.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How are IELTS Listening and Reading band scores determined?",
        choices: [
          "By the same four subjective criteria as Writing",
          "By an examiner's live judgment",
          "Objectively, by counting correct answers and converting via a published table",
          "By comparing you to other test-takers that day",
        ],
        correctIndex: 2,
        explanation:
          "Listening and Reading are objectively scored: raw correct-answer counts convert to a band via a published table.",
      },
      {
        id: "q2",
        prompt: "Which of these is one of the four IELTS Writing band criteria?",
        choices: [
          "Handwriting neatness",
          "Task Achievement/Response",
          "Typing speed",
          "Word count only",
        ],
        correctIndex: 1,
        explanation:
          "The four Writing criteria are Task Achievement/Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy.",
      },
      {
        id: "q3",
        prompt: "What is the recommended first step before building a study plan?",
        choices: [
          "Buy the most expensive prep book available",
          "Run a diagnostic across all four sections to find your genuinely weakest area",
          "Only practice Speaking, since it feels hardest",
          "Memorize a list of 'high-scoring' essay templates",
        ],
        correctIndex: 1,
        explanation:
          "A diagnostic across all sections tells you honestly where to focus, rather than guessing.",
      },
    ],
    takeaway:
      "Study time is most effective when it targets your actual weakest criterion, identified through a real diagnostic, not a guess.",
    summary:
      "Writing and Speaking use four published criteria each; Listening and Reading are scored objectively. Build a study plan proportional to your band gap, starting from a diagnostic across all sections.",
    nextLessonSlug: "ielts-listening-format-and-question-types",
  },
  {
    id: "ielts-listening-format-and-question-types",
    slug: "ielts-listening-format-and-question-types",
    title: "IELTS Listening: Format and Question Types",
    description:
      "The four Listening sections and the main question types you'll encounter in each.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 20,
    objectives: [
      "Describe the four IELTS Listening sections and how their difficulty typically increases",
      "Recognize the main Listening question types: multiple choice, matching, form/note/table completion",
      "Apply a 'read ahead' strategy before the audio starts",
    ],
    skills: ["ielts-listening"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: ["ielts listening", "listening question types", "ielts listening strategy"],
    explanation: `IELTS Listening has four sections, played once, generally increasing in difficulty. **Section 1** is a everyday conversation between two people (e.g. booking a service). **Section 2** is a monologue in an everyday social context (e.g. a talk about a local facility). **Section 3** is a conversation between up to four people in an academic/training context (e.g. students discussing an assignment). **Section 4** is an academic monologue (e.g. part of a lecture).

Common question types include: **multiple choice** (choose one or more correct options), **matching** (match items from a list to categories), and **form/note/table completion** (fill gaps using words you hear, usually with a strict word limit like "no more than two words"). Word-limit instructions are graded strictly -- writing three words when the limit is two loses the mark even if the content is otherwise correct.

The most effective strategy is to **read the questions before the audio starts** -- you're normally given time to preview each section. This tells you what to listen for (a name, a number, a reason) and roughly where in the audio each answer will appear, since answers usually come in the same order as the questions.

Below is an original practice transcript for a Section 1-style conversation. Read it, then answer the comprehension questions -- this simulates the reading/note-taking skill even though you're reading rather than hearing it, since this platform does not host real exam-style audio.

---

**Transcript (Section 1 style -- booking a community class):**

*Receptionist:* Good morning, Riverside Community Centre, how can I help?
*Caller:* Hi, I'd like to book a place on one of your evening classes -- I saw pottery and also watercolour painting listed.
*Receptionist:* Sure, let me check availability. The pottery class runs on Tuesdays from 6 to 8 pm, and it's currently full, but there's a waiting list. Watercolour painting is on Thursdays, 7 to 9 pm, and there are two spaces left.
*Caller:* I'll go with the watercolour class then. What's the cost?
*Receptionist:* It's thirty-two pounds for the six-week term, and that includes all materials except your own brushes -- you'll need to bring those yourself.
*Caller:* Great. And is there parking at the centre?
*Receptionist:* There's a small car park, but it fills up quickly, so we'd recommend arriving at least fifteen minutes early, or using the public car park on Mill Street, a five-minute walk away.
*Caller:* That's helpful, thank you. Can I pay online?
*Receptionist:* Yes, I'll email you a payment link -- can I take your email address?
*Caller:* It's r dot chen at mailbox dot example.
*Receptionist:* Got it. You're booked in for Thursdays, 7 to 9 pm, starting next week.`,
    commonMistakes: [
      "Ignoring word-limit instructions (e.g. writing 'a five minute walk' when the limit is 'no more than two words').",
      "Losing your place after missing one answer and failing to move on to the next question in time.",
      "Not previewing the questions before the audio starts, so you don't know what to listen for.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "In the practice transcript, which class did the caller book?",
        choices: ["Pottery", "Watercolour painting", "Both classes", "Neither -- both were full"],
        correctIndex: 1,
        explanation:
          "The pottery class was full; the caller booked the Thursday watercolour painting class.",
      },
      {
        id: "q2",
        prompt:
          "According to the transcript, what should the caller bring that isn't included in the fee?",
        choices: ["Paint", "Paper", "Brushes", "A chair"],
        correctIndex: 2,
        explanation:
          "The receptionist says materials are included except brushes, which the caller must bring.",
      },
      {
        id: "q3",
        prompt: "IELTS Listening Section 4 is typically:",
        choices: [
          "A two-person everyday conversation",
          "An academic monologue, such as part of a lecture",
          "A social monologue about a local facility",
          "A conversation between up to four people in a training context",
        ],
        correctIndex: 1,
        explanation: "Section 4 is an academic monologue, usually the most challenging section.",
      },
      {
        id: "q4",
        prompt: "Why does previewing questions before the audio starts help?",
        choices: [
          "It lets you skip the audio entirely",
          "It tells you what to listen for and roughly where answers will appear",
          "It replaces the need to listen at all",
          "It guarantees a higher band regardless of listening skill",
        ],
        correctIndex: 1,
        explanation:
          "Previewing focuses your listening on specific expected information, in roughly the question order.",
      },
    ],
    takeaway:
      "Preview questions before the audio starts, and treat word-limit instructions as strict rules, not suggestions.",
    summary:
      "IELTS Listening has four increasingly difficult sections and several question types (multiple choice, matching, completion). Previewing questions and respecting word limits are the two highest-leverage habits.",
    nextLessonSlug: "ielts-listening-completion-strategies",
  },
  {
    id: "ielts-listening-completion-strategies",
    slug: "ielts-listening-completion-strategies",
    title: "IELTS Listening: Note, Form, and Table Completion",
    description:
      "A deeper practice set on completion-style Listening questions using an original transcript.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 3,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Predict the type of word needed (number, name, place) before hearing it",
      "Recognize common distractor patterns, like a speaker correcting themselves mid-sentence",
      "Practice completion questions against a longer original transcript",
    ],
    skills: ["ielts-listening"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: ["ielts listening completion", "note completion", "form completion"],
    explanation: `Completion questions (notes, forms, tables, or a summary with gaps) test whether you can extract specific facts, not whether you understand every word. Before listening, look at each gap and predict the *type* of answer needed: a number, a proper name, a date, a place, a duration. This narrows what you're listening for.

A common distractor pattern is a speaker **correcting themselves**: "The workshop starts at 9... actually, sorry, we moved it to 9:30." The first-mentioned answer is often wrong -- always take the corrected/final version. Another pattern is **giving then ruling out an option**: "You could take the express bus, but actually the ordinary bus is cheaper and only ten minutes slower" -- the "actually" signals the real answer.

Below is an original practice transcript (Section 2 style -- a monologue about a local museum), followed by comprehension questions that model the completion-question skill.

---

**Transcript (Section 2 style -- museum information talk):**

Welcome to Fairview Museum. Before you head off to explore, let me give you a few practical details. The museum is open Tuesday to Sunday, 10 am to 5 pm -- we're closed on Mondays for maintenance. Entry is free for the permanent collection, but the current special exhibition, "Coastal Life," has a small charge: four pounds for adults, and it's free for anyone under sixteen.

The café is on the ground floor, next to the gift shop, and it closes thirty minutes before the museum itself. If you'd like a guided tour, these run three times a day -- at 11 am, 1 pm, and... let me check... it was 3 pm, but we've actually just changed it to 3:30 pm to allow a bit more time between tours. Tours last approximately forty-five minutes and meet at the main entrance desk.

One more thing: photography is allowed throughout the museum, but flash photography is not permitted in the "Coastal Life" exhibition specifically, to protect some of the more light-sensitive items on display.`,
    commonMistakes: [
      "Writing the first time mentioned (3 pm) instead of the corrected time (3:30 pm).",
      "Guessing a word type mismatch, like writing a name where a number was expected.",
      "Missing that a rule (like the flash photography restriction) applies only to one specific area, not the whole museum.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What time do the guided tours actually run at in the afternoon, according to the transcript?",
        choices: ["1 pm", "3 pm", "3:30 pm", "4 pm"],
        correctIndex: 2,
        explanation:
          "The speaker corrects themselves from 3 pm to 3:30 pm -- the corrected time is the real answer.",
      },
      {
        id: "q2",
        prompt: "Which day is the museum closed?",
        choices: ["Sunday", "Saturday", "Tuesday", "Monday"],
        correctIndex: 3,
        explanation: "The museum is open Tuesday to Sunday, meaning it's closed on Monday.",
      },
      {
        id: "q3",
        prompt: "Where specifically is flash photography not allowed?",
        choices: [
          "Nowhere in the museum",
          "Only in the 'Coastal Life' exhibition",
          "Everywhere in the museum",
          "Only near the café",
        ],
        correctIndex: 1,
        explanation:
          "The restriction applies specifically to the 'Coastal Life' exhibition, not the whole museum.",
      },
    ],
    takeaway:
      "Predict the word type before listening, and always trust a speaker's self-correction over their first statement.",
    summary:
      "Completion questions test specific-fact extraction. Predicting word type in advance and catching self-corrections are the two most valuable habits for this question type.",
    nextLessonSlug: "ielts-listening-multiple-choice-matching",
  },
  {
    id: "ielts-listening-multiple-choice-matching",
    slug: "ielts-listening-multiple-choice-matching",
    title: "IELTS Listening: Multiple Choice and Matching",
    description: "Handling multiple-answer multiple choice and matching-to-category questions.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    objectives: [
      "Handle multiple choice questions that require more than one correct answer",
      "Apply a matching strategy: match items to categories, not categories to items",
      "Recognize paraphrase between the audio and the answer options",
    ],
    skills: ["ielts-listening"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: ["ielts listening multiple choice", "ielts listening matching", "paraphrase"],
    explanation: `Some IELTS Listening multiple choice questions ask for **more than one correct answer** (e.g. "Choose TWO letters"), clearly stated in the instructions -- missing that instruction and choosing only one answer loses marks even if that one answer is correct. Always read exactly how many answers are required before listening.

**Matching** questions give a list of items (e.g. speakers, or topics) and a list of categories, asking you to match each item to a category. It's usually easier to work through the items in the order they're given and listen for which category applies to each, rather than trying to hold every category in mind simultaneously.

A key listening skill for both types is recognizing **paraphrase**: the audio rarely uses the exact same words as the answer options. If the audio says "the venue was moved because of a scheduling clash with another event," and an option says "the location changed due to a booking conflict," these describe the same thing in different words -- learning to hear paraphrase, not just exact word matches, is essential.

Below is an original short practice transcript. Practice applying multiple choice with paraphrase recognition.

---

**Transcript (original -- university orientation announcement):**

Welcome, everyone, to today's orientation. Before we start the campus tour, I want to flag a few changes. First, the originally scheduled library workshop has been moved from the main library to the Student Centre, room 204 -- there was a double-booking with another faculty event. Second, if you haven't yet collected your student ID card, the ID office closes early today, at 3 pm instead of the usual 5 pm, so please prioritize that if you haven't been already. Finally, lunch will be provided in the courtyard, but if it rains, we'll move indoors to the main hall instead.`,
    commonMistakes: [
      "Selecting only one answer for a 'choose TWO' question, missing marks even with one correct choice.",
      "Matching by exact wording instead of recognizing that the audio paraphrases the answer options.",
      "Losing track of which item you're currently matching when multiple items are discussed close together.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Why was the library workshop moved, according to the transcript?",
        choices: [
          "Low attendance",
          "A double-booking with another faculty event",
          "Renovation work",
          "It was cancelled entirely",
        ],
        correctIndex: 1,
        explanation:
          "The speaker says the move was due to a double-booking (a scheduling conflict) with another event.",
      },
      {
        id: "q2",
        prompt:
          "An answer option describing the workshop move as 'due to a booking conflict' is an example of:",
        choices: [
          "An exact word match",
          "A paraphrase of the audio",
          "An incorrect distractor",
          "Unrelated information",
        ],
        correctIndex: 1,
        explanation:
          "'Booking conflict' paraphrases the audio's 'double-booking' -- same meaning, different wording.",
      },
      {
        id: "q3",
        prompt:
          "If a question says 'Choose TWO answers' and you only select one correct one, what happens?",
        choices: [
          "You get full marks anyway",
          "You lose marks, even though one answer was correct",
          "The question is voided",
          "You get half marks automatically",
        ],
        correctIndex: 1,
        explanation:
          "Both required answers must be selected correctly to get credit -- selecting only one loses marks.",
      },
    ],
    takeaway:
      "Always check exactly how many answers a question requires, and train yourself to recognize paraphrase rather than listening for exact word matches.",
    summary:
      "Multiple choice may require more than one answer -- read the instructions carefully. Matching and multiple choice both rely heavily on recognizing paraphrase between audio and answer options.",
    nextLessonSlug: "ielts-reading-format-and-question-types",
  },
  {
    id: "ielts-reading-format-and-question-types",
    slug: "ielts-reading-format-and-question-types",
    title: "IELTS Reading: Format and Question Types",
    description:
      "How Academic and General Training Reading differ, and the main question types in both.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 5,
    difficulty: "beginner",
    estimatedMinutes: 20,
    objectives: [
      "Describe how Academic Reading (three long passages) differs from General Training Reading (multiple shorter texts)",
      "List common Reading question types beyond True/False/Not Given",
      "Apply basic time-budgeting across a 60-minute Reading section",
    ],
    skills: ["ielts-reading"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: [
      "ielts reading",
      "true false not given",
      "matching headings",
      "reading question types",
    ],
    explanation: `**IELTS Academic Reading** has three passages (around 2,150-2,750 words total), typically taken from academic books, journals, or magazines, increasing in difficulty. **General Training Reading** instead uses several shorter texts drawn from everyday sources like notices, advertisements, and workplace documents in the first two sections, with one longer, more complex text in the third section. Both versions have 40 questions and a 60-minute time limit -- there is no extra transfer time in Reading, unlike Listening.

Question types include: **True/False/Not Given** or **Yes/No/Not Given** (does a statement agree with, contradict, or go beyond what the passage says), **matching headings** (match a heading to each paragraph), **matching information** (which paragraph contains a specific detail), **sentence completion**, and **multiple choice**. "Not Given" is the type learners most often get wrong -- it means the passage simply doesn't address the claim at all, which is different from the passage contradicting it (False/No).

A reasonable time budget is roughly 20 minutes per passage, leaving no time for lingering on one hard question -- if you're stuck, make your best guess, flag it, and move on, since every question is worth the same one mark.

Below is an original short passage. Practice applying True/False/Not Given to it.

---

**Passage (original, academic style -- urban green spaces):**

Urban parks have long been valued for their recreational role, but recent research has drawn attention to their measurable effect on local air quality. Trees and other vegetation can filter certain airborne pollutants, and studies conducted in several mid-sized cities found modest reductions in particulate matter concentrations near well-established parks compared to surrounding streets. However, researchers caution that this effect varies considerably depending on park size, tree density, and prevailing wind patterns, and that no study to date has shown urban parks alone can substitute for reducing pollution at its source, such as vehicle emissions. Some city planners have nonetheless begun incorporating "green corridors" -- continuous strips of vegetation connecting parks -- into new development plans, partly on the basis of this air-quality research and partly for its established benefits to biodiversity and resident wellbeing.`,
    commonMistakes: [
      "Treating 'Not Given' as if it means the same as 'False' -- Not Given means the passage doesn't address the claim at all.",
      "Spending too long on one difficult question and running out of time for an entire later passage.",
      "Answering based on general knowledge of the topic instead of only what the passage actually states.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Passage claim: 'Urban parks can fully replace the need to reduce vehicle emissions.' Is this True, False, or Not Given?",
        choices: ["True", "False", "Not Given"],
        correctIndex: 1,
        explanation:
          "The passage explicitly states parks cannot substitute for reducing pollution at its source -- this directly contradicts the claim, so it's False.",
      },
      {
        id: "q2",
        prompt:
          "Passage claim: 'Green corridors have been shown to increase local property values.' Is this True, False, or Not Given?",
        choices: ["True", "False", "Not Given"],
        correctIndex: 2,
        explanation:
          "Property values are never mentioned in the passage, so this is Not Given -- not addressed at all.",
      },
      {
        id: "q3",
        prompt: "How many passages does IELTS Academic Reading contain?",
        choices: ["One", "Two", "Three", "Four"],
        correctIndex: 2,
        explanation: "Academic Reading has three passages, increasing in difficulty.",
      },
      {
        id: "q4",
        prompt: "A reasonable time budget per Academic Reading passage is approximately:",
        choices: ["5 minutes", "20 minutes", "40 minutes", "There is no time limit per passage"],
        correctIndex: 1,
        explanation:
          "With 60 minutes and three passages, roughly 20 minutes each is a reasonable starting budget.",
      },
    ],
    takeaway:
      "'Not Given' means the passage never addresses the claim -- don't confuse it with 'False', which means the passage contradicts the claim.",
    summary:
      "Academic Reading uses three long passages; General Training uses several shorter texts plus one longer one. True/False/Not Given, matching headings, and sentence completion are core question types across both.",
    nextLessonSlug: "ielts-reading-skimming-scanning",
  },
  {
    id: "ielts-reading-skimming-scanning",
    slug: "ielts-reading-skimming-scanning",
    title: "IELTS Reading: Skimming, Scanning, and Matching Headings",
    description: "Practicing paragraph-matching and heading-matching with an original passage.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 6,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Distinguish skimming (getting the gist) from scanning (finding a specific detail)",
      "Practice matching headings to paragraphs using topic sentences",
      "Avoid the common trap of matching by repeated keywords rather than actual meaning",
    ],
    skills: ["ielts-reading"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: ["ielts skimming scanning", "matching headings", "topic sentences"],
    explanation: `**Skimming** means reading quickly for the general idea of a paragraph or passage -- useful for getting an overview before answering questions, or for matching headings. **Scanning** means searching quickly for a specific piece of information (a date, a name, a number) without reading every word -- useful for detail questions once you know roughly where to look.

For **matching headings**, read each paragraph's first one or two sentences (often, though not always, the topic sentence) to get its main idea, then compare against the heading list. A common trap is choosing a heading because it repeats a word that also appears in the paragraph, even though the heading describes a different overall idea -- headings are deliberately written to test whether you understood the *point* of a paragraph, not just its vocabulary.

Below is an original three-paragraph passage. Practice matching headings to paragraphs.

---

**Passage (original -- remote work trends):**

**Paragraph A.** Since the shift toward remote and hybrid work arrangements accelerated in the early 2020s, many organizations have reported changes in how employees collaborate. Video conferencing and shared document platforms became default tools almost overnight, and teams that had never worked outside a shared office had to rapidly establish new norms for communication, from response-time expectations to how meetings were structured.

**Paragraph B.** Beyond communication habits, remote work has prompted a reassessment of physical office space itself. Some companies have reduced their office footprint significantly, converting former desk areas into meeting rooms or collaborative spaces used only on the days when staff come in. Others have kept their full office space but redesigned it, betting that employees will eventually return to more traditional in-person patterns.

**Paragraph C.** Perhaps the most debated consequence has been the effect on career development, particularly for newer employees. Some researchers argue that spontaneous, informal interactions -- the kind that happen naturally in a shared office -- play an outsized role in mentorship and networking, and that remote-first employees may need deliberate substitutes for these opportunities to avoid being at a disadvantage.

**List of headings:**
(i) The debate over career growth in a remote setting
(ii) How office design has adapted to new work patterns
(iii) Early changes to team communication norms
(iv) The financial cost of maintaining office buildings`,
    commonMistakes: [
      "Matching a heading because it shares a keyword with the paragraph, without checking the heading's overall meaning matches.",
      "Reading every word of every paragraph in full detail instead of skimming for the main idea first.",
      "Assuming the first sentence of a paragraph is always the topic sentence -- sometimes it's a transition instead.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which heading best matches Paragraph A?",
        choices: [
          "The debate over career growth in a remote setting",
          "How office design has adapted to new work patterns",
          "Early changes to team communication norms",
          "The financial cost of maintaining office buildings",
        ],
        correctIndex: 2,
        explanation:
          "Paragraph A is about new communication norms adopted rapidly when remote work began.",
      },
      {
        id: "q2",
        prompt:
          "Paragraph C raises a concern about junior employees missing out on something. According to the passage, what is it?",
        choices: [
          "Spontaneous informal interactions that support mentorship and networking",
          "Access to video conferencing software",
          "The chance to redesign office layouts",
          "Formal training budgets",
        ],
        correctIndex: 0,
        explanation:
          "Paragraph C says researchers argue informal, spontaneous office interactions play an outsized role in mentorship, which remote-first employees may lack.",
      },
      {
        id: "q3",
        prompt: "Scanning is best described as:",
        choices: [
          "Reading every word carefully for full comprehension",
          "Searching quickly for a specific piece of information",
          "Memorizing the passage before answering",
          "Reading only the last paragraph",
        ],
        correctIndex: 1,
        explanation:
          "Scanning targets a specific detail quickly, rather than reading for overall comprehension.",
      },
    ],
    takeaway:
      "Match headings by overall meaning, not by repeated keywords -- headings are written to test real comprehension.",
    summary:
      "Skimming gets the gist; scanning finds specific details. Matching headings requires understanding each paragraph's main point, resisting the keyword-repetition trap.",
    nextLessonSlug: "ielts-writing-task-1-academic",
  },
  {
    id: "ielts-writing-task-1-academic",
    slug: "ielts-writing-task-1-academic",
    title: "IELTS Writing Task 1 (Academic): Describing Visual Data",
    description:
      "How to structure an Academic Task 1 response describing a chart, graph, or diagram.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 25,
    objectives: [
      "Structure a Task 1 response with an overview and grouped supporting detail",
      "Select and report only the main features of visual data, not every number",
      "Use accurate vocabulary for describing trends and comparisons",
    ],
    skills: ["ielts-writing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: [
      "ielts writing task 1",
      "academic writing",
      "describing charts",
      "overview paragraph",
    ],
    explanation: `Academic Writing Task 1 asks you to describe a chart, graph, table, or diagram objectively in at least 150 words, in about 20 minutes. This is **not** an opinion task -- you never argue for or against anything here, you only report what the visual shows.

A strong structure has four parts: (1) an **introduction** that paraphrases the task prompt in your own words, (2) an **overview** -- one or two sentences stating the two or three most significant overall trends or features, written *before* the details, (3) **body paragraph(s)** grouping related data together with specific figures and comparisons, and (4) no separate conclusion is needed for Task 1.

The overview is the single most commonly missed element by lower-scoring responses -- many candidates jump straight into listing every number without ever stepping back to say what the data's main story actually is. Examiners specifically look for it.

Useful language for trends: *rose/increased steadily*, *fell sharply*, *fluctuated*, *remained stable*, *peaked at*, *reached a low of*. For comparisons: *in contrast*, *whereas*, *similarly*, *by comparison*. Vary your vocabulary rather than repeating "increased" in every sentence.

Practice this yourself using the Writing self-review tool linked from this course's exam-practice page -- write a response to a sample Task 1 prompt, then score yourself honestly against the four criteria.`,
    commonMistakes: [
      "Writing a list of every single number in the chart instead of grouping related data and highlighting the main trends.",
      "Omitting the overview sentence entirely, which examiners specifically look for.",
      "Giving opinions or explanations for *why* a trend happened, which Task 1 never asks for.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is the main purpose of the overview in Task 1?",
        choices: [
          "To give your personal opinion on the data",
          "To state the two or three most significant overall trends before the details",
          "To repeat the task prompt word for word",
          "To predict future trends beyond the data shown",
        ],
        correctIndex: 1,
        explanation:
          "The overview highlights the main story of the data before diving into supporting detail.",
      },
      {
        id: "q2",
        prompt: "Which is a mistake many lower-scoring Task 1 responses make?",
        choices: [
          "Including an overview",
          "Grouping related data together",
          "Listing every single number with no overview or grouping",
          "Using varied trend vocabulary",
        ],
        correctIndex: 2,
        explanation:
          "Listing every number without an overview or grouping is a very common lower-scoring pattern.",
      },
      {
        id: "q3",
        prompt: "Does Academic Writing Task 1 require your personal opinion?",
        choices: [
          "Yes, always",
          "No -- it's an objective description task",
          "Only for diagrams, not charts",
          "Only if the prompt asks 'do you agree'",
        ],
        correctIndex: 1,
        explanation:
          "Task 1 is a purely objective description task -- opinions are never appropriate here.",
      },
    ],
    takeaway:
      "Always include an explicit overview sentence stating the main trends before diving into supporting detail.",
    summary:
      "Task 1 is objective data description with a required overview, grouped detail, and varied trend/comparison vocabulary -- never an opinion piece.",
    nextLessonSlug: "ielts-writing-task-1-general",
  },
  {
    id: "ielts-writing-task-1-general",
    slug: "ielts-writing-task-1-general",
    title: "General Training Writing Task 1: Letter Writing",
    description:
      "Structuring a formal, semi-formal, or informal letter for General Training Task 1.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Choose the correct tone (formal, semi-formal, informal) based on the letter's recipient",
      "Cover all bullet points required by the prompt",
      "Structure a letter with an appropriate opening, body, and closing",
    ],
    skills: ["ielts-writing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: [
      "ielts general training writing",
      "letter writing",
      "formal letter",
      "informal letter",
    ],
    explanation: `General Training Writing Task 1 asks you to write a letter of at least 150 words in about 20 minutes, always covering **three bullet points** given in the prompt. Missing even one bullet point noticeably limits your Task Achievement score, regardless of how well-written the rest of the letter is.

Tone depends on the recipient: **formal** (a stranger in an official role, e.g. a company manager, a landlord you've never met) uses "Dear Sir/Madam" or "Dear Mr/Ms [Surname]" and no contractions; **semi-formal** (someone you have a professional but personal relationship with) is a middle ground; **informal** (a friend or family member) uses "Dear [First name]" and natural, conversational language including contractions.

Structure: an opening line stating your purpose for writing, then one paragraph per bullet point (roughly), then an appropriate closing (e.g. "Yours faithfully" for formal when you don't know the person's name, "Yours sincerely" when you do, "Best wishes" for informal).

Practice this using the Writing self-review tool on this course's exam-practice page, which includes a General Training letter-writing task with its own rubric.`,
    commonMistakes: [
      "Using an informal tone ('Hi there!') when writing to someone in an official role who deserves a formal register.",
      "Missing one of the three required bullet points, which limits Task Achievement regardless of writing quality elsewhere.",
      "Using 'Yours faithfully' when you know the recipient's name (should be 'Yours sincerely' in that case) or vice versa.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How many bullet points must a General Training Task 1 letter cover?",
        choices: ["One", "Two", "Three", "As many as you choose"],
        correctIndex: 2,
        explanation:
          "The prompt always gives exactly three bullet points, and all three must be addressed.",
      },
      {
        id: "q2",
        prompt:
          "Which closing is appropriate for a formal letter where you don't know the recipient's name?",
        choices: ["Best wishes", "Yours sincerely", "Yours faithfully", "See you soon"],
        correctIndex: 2,
        explanation:
          "'Yours faithfully' pairs with 'Dear Sir/Madam' when the recipient's name is unknown.",
      },
      {
        id: "q3",
        prompt: "What effect does missing one required bullet point have on your score?",
        choices: [
          "None, as long as the writing is fluent",
          "It noticeably limits Task Achievement regardless of writing quality",
          "It only affects Grammatical Range",
          "It automatically results in the lowest possible band",
        ],
        correctIndex: 1,
        explanation:
          "Task Achievement specifically assesses whether all required content was covered.",
      },
    ],
    takeaway:
      "Cover all three bullet points and match your tone to the recipient -- these two factors matter more than sentence-level polish alone.",
    summary:
      "General Training Task 1 is a letter covering three required bullet points, in a tone (formal/semi-formal/informal) matched to the recipient.",
    nextLessonSlug: "ielts-writing-task-2-essay",
  },
  {
    id: "ielts-writing-task-2-essay",
    slug: "ielts-writing-task-2-essay",
    title: "Writing Task 2: Essay Structure and Argumentation",
    description: "Structuring a clear opinion, discussion, or problem-solution essay for Task 2.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 9,
    difficulty: "advanced",
    estimatedMinutes: 25,
    objectives: [
      "Identify the essay type a prompt is asking for (opinion, discussion, problem-solution, advantages/disadvantages)",
      "Structure a four-paragraph essay with a clear position and supporting examples",
      "Avoid the most common Task 2 mistake: not directly answering the actual question asked",
    ],
    skills: ["ielts-writing"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: ["ielts writing task 2", "essay structure", "opinion essay", "discussion essay"],
    explanation: `Writing Task 2 is a 250-word (minimum), 40-minute essay, worth roughly twice as much as Task 1 toward your Writing band. Prompts generally fall into a few types: **opinion** ("to what extent do you agree"), **discussion** ("discuss both views"), **problem-solution**, and **advantages/disadvantages**. Correctly identifying the type matters, because a discussion essay that only argues one side, or an opinion essay that never states a clear position, both lose marks on Task Response even with excellent grammar.

A reliable four-paragraph structure: **Introduction** (paraphrase the prompt, state your position/the essay's scope), **Body paragraph 1** (one main idea with a specific example or explanation), **Body paragraph 2** (a second main idea, similarly developed), **Conclusion** (summarize your position, no new ideas). Each body paragraph should develop *one* idea thoroughly with a concrete example, rather than listing many shallow points.

The single most common Task Response mistake is **not directly answering the question asked**. If the prompt asks "to what extent do you agree," a response that only lists pros and cons without ever stating a personal position doesn't fully answer the task -- Task 2 usually expects your actual stance, argued with reasons.

Practice a full opinion-essay prompt using the Writing self-review tool on this course's exam-practice page.`,
    commonMistakes: [
      "Writing a discussion essay ('discuss both views') that only argues one side, when both views need genuine coverage.",
      "Never stating a clear personal position when the prompt explicitly asks 'to what extent do you agree'.",
      "Listing many shallow points instead of developing two or three ideas thoroughly with specific examples.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "A prompt asks 'discuss both views and give your opinion.' What must the essay include?",
        choices: [
          "Only your own opinion, no discussion of views",
          "Genuine coverage of both views, plus your own opinion",
          "A list of every possible view on the topic",
          "Only a summary with no personal position",
        ],
        correctIndex: 1,
        explanation:
          "A 'discuss both views' prompt requires genuinely covering both sides, then adding your own opinion.",
      },
      {
        id: "q2",
        prompt: "What is the most common Task Response mistake in Task 2 essays?",
        choices: [
          "Using too many linking words",
          "Not directly answering the actual question asked",
          "Writing more than 250 words",
          "Using an introduction paragraph",
        ],
        correctIndex: 1,
        explanation:
          "Not directly answering the question -- e.g. never stating a position when asked to -- is the most common Task Response issue.",
      },
      {
        id: "q3",
        prompt: "What is the recommended minimum word count for Task 2?",
        choices: ["150 words", "200 words", "250 words", "350 words"],
        correctIndex: 2,
        explanation: "Task 2 requires a minimum of 250 words, more than Task 1's 150.",
      },
    ],
    takeaway:
      "Identify the exact essay type the prompt asks for, and make sure your essay directly and explicitly answers that specific question.",
    summary:
      "Task 2 essays need a clear four-paragraph structure, correctly matched to the prompt type (opinion/discussion/problem-solution), with thoroughly developed ideas rather than shallow lists.",
    nextLessonSlug: "ielts-speaking-part-1-introduction",
  },
  {
    id: "ielts-speaking-part-1-introduction",
    slug: "ielts-speaking-part-1-introduction",
    title: "Speaking Part 1: Introduction and Interview",
    description: "What to expect in Speaking Part 1 and how to give natural, developed answers.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 10,
    difficulty: "beginner",
    estimatedMinutes: 15,
    objectives: [
      "Describe the format and typical topics of Speaking Part 1",
      "Give answers that are developed beyond a single word, without over-rehearsing",
      "Understand how Speaking is scored across its four criteria",
    ],
    skills: ["ielts-speaking"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: ["ielts speaking part 1", "speaking interview", "speaking criteria"],
    explanation: `Speaking Part 1 lasts 4-5 minutes and covers familiar, everyday topics -- your home, work or study, hobbies, hometown -- through short questions from the examiner. This part is essentially a warm-up: it introduces you to the examiner and eases you into speaking English in a test setting.

The goal is answers of **1-2 developed sentences**, not one word and not a memorized paragraph. A question like "Do you like your job?" answered with just "Yes" gives the examiner almost nothing to assess; answered with "Yes, I do -- I especially enjoy the variety, since no two days look the same" gives real material for Fluency, Lexical Resource, and Grammar to be judged against.

Avoid obviously memorized, generic answers -- examiners are trained to notice when a response sounds rehearsed rather than natural, and it can actually work against your Fluency and Coherence score if the response doesn't naturally connect to the specific question asked.

Recall the four Speaking criteria from earlier in this course: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. In Part 1 specifically, natural pacing (Fluency and Coherence) and accurate everyday vocabulary (Lexical Resource) tend to matter most, since the topics and grammar required are relatively simple.

Practice a real Part 1 question using the Speaking self-review tool on this course's exam-practice page.`,
    commonMistakes: [
      "Answering with a single word or very short phrase, giving the examiner little to assess.",
      "Reciting an obviously memorized, generic answer that doesn't actually respond to the specific question asked.",
      "Speaking so quietly or hesitantly that Fluency is affected, even when vocabulary and grammar are strong.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Approximately how long does IELTS Speaking Part 1 last?",
        choices: ["1-2 minutes", "4-5 minutes", "8-10 minutes", "15 minutes"],
        correctIndex: 1,
        explanation: "Part 1 lasts about 4-5 minutes, covering familiar everyday topics.",
      },
      {
        id: "q2",
        prompt: "What length of answer is generally recommended for Part 1 questions?",
        choices: [
          "A single word",
          "1-2 developed sentences",
          "A full memorized paragraph",
          "As long as possible, regardless of relevance",
        ],
        correctIndex: 1,
        explanation:
          "1-2 developed sentences give the examiner enough material to assess without over-rehearsing.",
      },
      {
        id: "q3",
        prompt: "Why can an obviously memorized answer hurt your score?",
        choices: [
          "Memorized answers are always grammatically perfect",
          "It can work against Fluency and Coherence if it doesn't naturally fit the question asked",
          "Examiners are required to fail memorized answers",
          "It has no effect on scoring either way",
        ],
        correctIndex: 1,
        explanation:
          "A rehearsed-sounding answer that doesn't naturally connect to the question can hurt Fluency and Coherence.",
      },
    ],
    takeaway:
      "Give natural, developed 1-2 sentence answers in Part 1 -- avoid both one-word answers and obviously memorized paragraphs.",
    summary:
      "Part 1 is a 4-5 minute warm-up on familiar topics. Natural, developed answers work best; memorized or single-word answers both limit your score.",
    nextLessonSlug: "ielts-speaking-parts-2-3",
  },
  {
    id: "ielts-speaking-parts-2-3",
    slug: "ielts-speaking-parts-2-3",
    title: "Speaking Parts 2 and 3: The Long Turn and Discussion",
    description:
      "How to use your one-minute prep time for the cue card, and handle Part 3's abstract questions.",
    trackSlug: "exam-preparation",
    courseSlug: "ielts-preparation",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    objectives: [
      "Use the one-minute Part 2 preparation time effectively to plan a structured long turn",
      "Speak for close to the full 1-2 minutes in Part 2 without running out of material",
      "Give developed, reasoned answers to Part 3's more abstract discussion questions",
    ],
    skills: ["ielts-speaking"],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-07",
    references: [
      { label: "IELTS test format", url: "https://www.ielts.org/for-test-takers/test-format" },
    ],
    keywords: ["ielts speaking part 2", "ielts speaking part 3", "cue card", "long turn"],
    explanation: `**Part 2** ("the long turn") gives you a cue card with a topic and 3-4 prompts to cover, one minute to prepare notes, then 1-2 minutes to speak with no interruption. Use the full minute: jot down one or two words per bullet point (not full sentences -- you don't have time to write and you shouldn't read from notes), and briefly plan a rough order so you don't backtrack mid-answer.

A common problem is running out of things to say after only 30-40 seconds. Planning to briefly address *every* bullet point on the card, and adding a short concrete example or personal detail to each, is usually enough material to fill the full time naturally.

**Part 3** is a 4-5 minute discussion connected to Part 2's topic, but with more abstract, general questions (e.g. moving from "describe a skill you learned" to "how has technology changed the way people learn skills in general?"). Part 3 expects more developed answers than Part 1 -- give reasons, examples, and sometimes compare different perspectives, rather than a short factual answer.

Across Parts 2 and 3, Pronunciation (clarity, natural stress and intonation) and Lexical Resource (topic-appropriate vocabulary, including some less common words used accurately) become increasingly important alongside Fluency and Grammar.

Practice both a cue card and a follow-up discussion question using the Speaking self-review tool on this course's exam-practice page.`,
    commonMistakes: [
      "Writing full sentences during the one-minute Part 2 prep time instead of brief notes, running out of planning time.",
      "Running out of things to say in Part 2 after 30-40 seconds by not planning to cover every bullet point.",
      "Giving short, Part-1-style answers in Part 3 when longer, more developed responses with reasoning are expected.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "How much preparation time do you get before Speaking Part 2?",
        choices: ["30 seconds", "1 minute", "2 minutes", "5 minutes"],
        correctIndex: 1,
        explanation: "You get exactly one minute to prepare notes before speaking in Part 2.",
      },
      {
        id: "q2",
        prompt: "What is a reliable way to avoid running out of things to say in Part 2?",
        choices: [
          "Speak as fast as possible",
          "Plan to briefly address every bullet point with a concrete example or detail",
          "Only answer the first bullet point in depth",
          "Ask the examiner for more time",
        ],
        correctIndex: 1,
        explanation:
          "Covering every bullet point with a specific example usually provides enough material for the full time.",
      },
      {
        id: "q3",
        prompt: "How does Part 3 typically differ from Part 1?",
        choices: [
          "Part 3 uses only yes/no questions",
          "Part 3 expects more developed, reasoned answers to more abstract questions",
          "Part 3 is shorter than Part 1",
          "Part 3 doesn't relate to Part 2's topic at all",
        ],
        correctIndex: 1,
        explanation:
          "Part 3 connects to Part 2's topic but asks more abstract questions expecting developed, reasoned responses.",
      },
    ],
    takeaway:
      "Use the full Part 2 prep minute for brief notes covering every bullet point, and give more developed, reasoned answers in Part 3 than in Part 1.",
    summary:
      "Part 2 is a prepared 1-2 minute long turn from a cue card; Part 3 is a related but more abstract discussion expecting developed answers.",
  },
];
